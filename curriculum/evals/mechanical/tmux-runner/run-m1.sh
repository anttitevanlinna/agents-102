#!/usr/bin/env bash
# run-m1.sh — drive AE101 M1 (Getting going + context + MCP) end-to-end.
#
# Single session in the main lemmings repo. Walks scenarios/m1.txt:
# orient → introspect → /context → fix-tests-first (3 turns) → compound
# (2 turns, second is the second-pass closer). MCP turns 2/3 are scoped
# out of the headless run — see scenarios/m1.txt header.
#
# Per-turn artifact assertions (check_platform_and_boundaries.md § 16a):
# sentinel completion proves the turn finished, not that the prompt's
# promised artifact landed. Each turn is gated by a contract here.
#
# Usage: run-m1.sh --cwd /path/to/repo [--task-slug <slug>]
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/lib/resolve-prompt.sh"
source "$HERE/lib/tmux.sh"
source "$HERE/lib/sync.sh"
source "$HERE/lib/assertions.sh"

sut_cwd=""
task_slug=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --cwd)        sut_cwd="$2"; shift 2 ;;
    --task-slug)  task_slug="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

if [[ -z "$sut_cwd" || ! -d "$sut_cwd" ]]; then
  echo "usage: $0 --cwd <repo> [--task-slug <slug>]" >&2
  exit 2
fi

scenario="${SCENARIO:-$HERE/scenarios/m1.txt}"
[[ -f "$scenario" ]] || { echo "missing scenario: $scenario" >&2; exit 2; }

run_id="$(date +%Y%m%d-%H%M%S)-$$"
run_dir="$HERE/out/$run_id"
sentinel_dir="$run_dir/sentinels"
mkdir -p "$sentinel_dir"

session="runner-$run_id"
launch_cmd="env CLAUDE_RUNNER_SENTINEL_DIR=$sentinel_dir ${CLAUDE_CMD:-claude}"
warmup="${CLAUDE_RUNNER_WARMUP:-10}"
standard_timeout="${CLAUDE_RUNNER_TIMEOUT:-600}"

# Snapshot transcripts dir + git baseline before launch.
encoded_cwd="$(echo "$sut_cwd" | sed 's|/|-|g')"
transcripts_dir="$HOME/.claude/projects/$encoded_cwd"
mkdir -p "$transcripts_dir"
pre_transcripts="$(ls "$transcripts_dir" 2>/dev/null | sort | tr '\n' ' ')"
baseline_sha="$(cd "$sut_cwd" && git rev-parse --short HEAD)"
baseline_branch="$(cd "$sut_cwd" && git rev-parse --abbrev-ref HEAD)"
claude_local_md="$sut_cwd/CLAUDE.local.md"
claude_local_mtime_baseline="$(mtime_of "$claude_local_md")"

echo "[m1] cwd=$sut_cwd run=$run_id"
echo "[m1] baseline sha=$baseline_sha branch=$baseline_branch"
echo "[m1] launching: $launch_cmd"

pane_start "$session" "$sut_cwd" "$launch_cmd"
sleep "$warmup"

cleanup() {
  pane_capture "$session" "$run_dir/transcript.txt" 2>/dev/null || true
  pane_kill "$session"
}
trap cleanup EXIT

# Read scenario into array.
lines=()
while IFS= read -r line || [[ -n "$line" ]]; do
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
  lines+=("$line")
done < "$scenario"

total=${#lines[@]}
echo "[m1] turns=$total"

# Working-tree porcelain snapshot at end of T4, used by T6 to detect
# that the deeper TDD pass actually added something beyond T4's diff
# (rather than the prompt being a no-op).
porcelain_after_t4=""

# Assertion dispatch — one case per turn. See scenarios/m1.txt for
# the prompt order. Each case must set FAIL=1 on miss.
assert_turn() {
  local seq="$1" transcript="$2"
  case "$seq" in
    1)  # orient-and-introspect-1 — repo shape narrative in scrollback.
        # SUT-agnostic: any file-shape signal (extension or path-with-slash).
        # The bet: a real orientation names files; a bluff doesn't.
        assert_scrollback_grep "T1 orient" "$transcript" '\.(go|js|ts|jsx|tsx|py|rs|java|rb|c|cpp|h|md|sh|toml|yaml|yml|json|html|css)\b|[a-z]+/[a-z]'
        ;;
    2)  # orient-and-introspect-2 — read-self-report names skipped files.
        assert_scrollback_grep "T2 introspect" "$transcript" "didn't|skipped|did not read|chose not"
        ;;
    3)  # /context — slash command should render context utilization.
        assert_scrollback_grep "T3 /context" "$transcript" "context|tokens|window|free space|used"
        ;;
    4)  # fix-tests-first-1 — first-pass TDD diff: working tree must be dirty.
        if assert_git_dirty "T4 first-pass dirty" "$sut_cwd"; then
          porcelain_after_t4="$(cd "$sut_cwd" && git status --porcelain)"
          return 0
        fi
        return 1
        ;;
    5)  # fix-tests-first-2 — explicit "Don't change anything yet."
        # Soft observation only: scrollback names a deeper layer.
        assert_or_warn assert_scrollback_grep "T5 deeper-named" "$transcript" "root|deeper|layer|surface|still"
        ;;
    6)  # fix-tests-first-3 — TDD properly. Save-gate: prompt says
        # "Show me the diff before you commit"; Claude shows + asks for
        # one-or-two-commits / PR-or-hold. Commit lands at T7 (literal
        # approval), not here. Two checks: working tree dirty AND
        # porcelain advanced past T4 (deeper pass added something —
        # catches the "Claude did nothing new in T6" failure mode).
        if ! assert_git_dirty "T6 second-pass dirty (commit pending approval)" "$sut_cwd"; then
          return 1
        fi
        local porcelain_now
        porcelain_now="$(cd "$sut_cwd" && git status --porcelain)"
        if [[ "$porcelain_now" == "$porcelain_after_t4" ]]; then
          echo "[assert] FAIL T6 porcelain unchanged from T4 — deeper TDD pass produced nothing new" >&2
          return 1
        fi
        echo "[assert] PASS T6 porcelain advanced past T4"
        ;;
    7)  # literal "One commit, no PR" — save-gate approval. New commit.
        assert_new_commit "T7 commit after approval" "$sut_cwd" "$baseline_sha"
        ;;
    8)  # compound-and-close-1 — ./CLAUDE.local.md exists.
        assert_file_exists "T8 CLAUDE.local.md" "$claude_local_md"
        ;;
    9)  # compound-and-close-4 — file mtime advanced OR "nothing new".
        if assert_file_mtime_advanced "T9 second compound mtime" "$claude_local_md" "$claude_local_mtime_baseline" 2>/dev/null; then
          return 0
        fi
        assert_scrollback_grep "T9 nothing-new fallback" "$transcript" "nothing new|no new|did not add|nothing to add"
        ;;
    *)
        echo "[m1] no assertion configured for turn $seq" >&2
        return 1
        ;;
  esac
}

seq=0
for line in "${lines[@]}"; do
  seq=$((seq + 1))

  if [[ "$line" == \** ]]; then
    body="${line#\*}"; body="${body# }"
    echo "[m1] turn=$seq literal=${body:0:60}..."
  else
    key="${line%%[[:space:]]*}"
    tail=""
    if [[ "$line" == *[[:space:]]* ]]; then
      tail="${line#*[[:space:]]}"
      tail="${tail#"${tail%%[![:space:]]*}"}"
    fi
    echo "[m1] turn=$seq key=$key${tail:+ tail=${tail:0:60}...}"
    body="$(resolve_prompt "$key")"
    [[ -n "$tail" ]] && body="${body}"$'\n'"${tail}"
  fi

  pane_send_text "$session" "$body"
  printf '%s' "$body" > "$run_dir/turn-$seq.prompt.txt"

  # Slash commands (body is a pure slash command with no args) are
  # client-side renders — no LLM call, no Stop hook fires, no sentinel.
  # The lib helper sleeps for render then fabricates the sentinel so
  # downstream counts stay consistent.
  if is_slash_only "$body"; then
    echo "[m1] turn=$seq slash-command (no sentinel) — bridging via lib"
    fake_sentinel_after_render "$sentinel_dir" "$seq" "${CLAUDE_RUNNER_SLASH_SLEEP:-3}"
  elif ! wait_for_turn "$sentinel_dir" "$seq" "$standard_timeout"; then
    pane_capture "$session" "$run_dir/transcript.txt"
    echo "[m1] FAIL turn=$seq (sentinel timeout after ${standard_timeout}s) — see $run_dir/transcript.txt" >&2
    exit 1
  fi
  pane_capture "$session" "$run_dir/turn-$seq.transcript.txt"

  if ! assert_turn "$seq" "$run_dir/turn-$seq.transcript.txt"; then
    pane_capture "$session" "$run_dir/transcript.txt"
    echo "[m1] FAIL turn=$seq assertion miss — see $run_dir/turn-$seq.transcript.txt" >&2
    exit 1
  fi
done

pane_capture "$session" "$run_dir/transcript.txt"

# Post-run: identify new session UUID + capture M1 end state for M2 handoff.
post_transcripts="$(ls "$transcripts_dir" 2>/dev/null | sort | tr '\n' ' ')"
new_uuid=""
for f in $post_transcripts; do
  if ! echo " $pre_transcripts " | grep -qF " $f "; then
    new_uuid="${f%.jsonl}"
    break
  fi
done

ending_sha="$(cd "$sut_cwd" && git rev-parse --short HEAD)"
ending_branch="$(cd "$sut_cwd" && git rev-parse --abbrev-ref HEAD)"

state_file="$run_dir/m1-state.json"
cat > "$state_file" <<EOF
{
  "run_id": "$run_id",
  "m1_cwd": "$sut_cwd",
  "m1_starting_sha": "$baseline_sha",
  "m1_ending_sha": "$ending_sha",
  "m1_branch": "$ending_branch",
  "m1_session_uuid": "$new_uuid",
  "m1_transcript_path": "$transcripts_dir/$new_uuid.jsonl",
  "m1_claude_local_md": "$claude_local_md",
  "task_slug": "$task_slug"
}
EOF

echo "[m1] PASS turns=$seq — out: $run_dir"
echo "[m1] state.json: $state_file"
cat "$state_file"
