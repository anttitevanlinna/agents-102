#!/usr/bin/env bash
# run-m4.sh — drive AE101 M4 (Run the First Experiment) end-to-end.
#
# Single session in the main repo. Walks scenarios/m4.txt: scope → audit →
# gap-fill → commit starting point → send-off (walk away).
#
# What's different from run.sh:
#   - Per-turn timeout: last turn (send-off) gets a long timeout (default 1h);
#     other turns get the standard 10-min timeout.
#   - Pre/post snapshot of ~/.claude/projects/<encoded-cwd>/ so we can identify
#     the new session UUID that M5 will need to find the M4 transcript.
#   - Post-run: greps the M4 starting-point SHA from the commit turn's
#     transcript and writes everything M5 needs into `out/<run-id>/m4-state.json`.
#
# Usage: run-m4.sh --cwd /path/to/repo [--task-slug <slug>]
#
# state.json shape:
#   {
#     "m4_cwd": "/Users/.../lemmings",
#     "m4_sha": "abc1234",
#     "m4_branch": "m4/fix-blocker-deadlock",
#     "m4_session_uuid": "0123abcd-...",
#     "m4_transcript_path": "/Users/.../.claude/projects/-Users-...-lemmings/0123abcd-....jsonl"
#   }
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

scenario="${SCENARIO:-$HERE/scenarios/m4.txt}"
[[ -f "$scenario" ]] || { echo "missing scenario: $scenario" >&2; exit 2; }

run_id="$(date +%Y%m%d-%H%M%S)-$$"
export RUNNER_TMUX_SOCKET="runner-$run_id"
run_dir="$HERE/out/$run_id"
sentinel_dir="$run_dir/sentinels"
mkdir -p "$sentinel_dir"

session="runner-$run_id"
launch_cmd="env CLAUDE_RUNNER_SENTINEL_DIR=$sentinel_dir ${CLAUDE_CMD:-claude}"
warmup="${CLAUDE_RUNNER_WARMUP:-10}"

# Encoded transcript dir for this cwd — Claude Code stores sessions at
# ~/.claude/projects/<encoded-cwd>/<uuid>.jsonl where <encoded-cwd> is the
# absolute cwd with `/` replaced by `-`. Snapshot before launch.
encoded_cwd="$(echo "$sut_cwd" | sed 's|/|-|g')"
transcripts_dir="$HOME/.claude/projects/$encoded_cwd"
mkdir -p "$transcripts_dir"
pre_transcripts="$(ls "$transcripts_dir" 2>/dev/null | sort | tr '\n' ' ')"

# In-repo-memory assertion baselines (walk-and-send-off-3 memory-path fix,
# 2026-05-25). The bug routed memory writes to the USER-LEVEL auto-memory
# home; the fix sends them to the in-repo ./observations/ convention dir.
# Snapshot the user-level memory dir before the run + stamp a marker so we
# can tell, post-run, which home received the write. See classify_memory_write.
user_mem_dir="$HOME/.claude/projects/$encoded_cwd/memory"
# mkdir defensively — on a fresh SUT this dir doesn't exist yet, and the
# ls-pipe-pipefail-set-e combo silently aborts the script at this assignment
# (no output, no error message, just exit 1). Caught on the picoshare port
# 2026-05-25: M1-M3 had populated $transcripts_dir but never created the
# memory subdir, so M4 exited before launching claude.
mkdir -p "$user_mem_dir"
pre_user_mem="$(ls "$user_mem_dir" 2>/dev/null | sort | tr '\n' ' ')"
proj_mem_dir="$sut_cwd/observations"
run_start_marker="$run_dir/.run-start"
touch "$run_start_marker"

echo "[m4] cwd=$sut_cwd run=$run_id"
echo "[m4] transcripts dir=$transcripts_dir"
echo "[m4] launching: $launch_cmd"

pane_start "$session" "$sut_cwd" "$launch_cmd"
sleep "$warmup"

cleanup() {
  # Bounded-time capture so the trap can't be held hostage by an
  # actively-rendering pane (see run-m1.sh for the high-effort case).
  pane_capture_safe "$session" "$run_dir/transcript.txt" 10
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
echo "[m4] turns=$total"

# Per-turn timeout: standard 3600s (high-effort claude takes long; see
# run-m1.sh history). Last turn (send-off) gets the multi-hour budget.
standard_timeout="${CLAUDE_RUNNER_TIMEOUT:-3600}"
sendoff_timeout="${CLAUDE_RUNNER_M4_SENDOFF_TIMEOUT:-7200}"

seq=0
for line in "${lines[@]}"; do
  seq=$((seq + 1))

  if [[ "$line" == \** ]]; then
    body="${line#\*}"; body="${body# }"
    echo "[m4] turn=$seq literal=${body:0:60}..."
  else
    key="${line%%[[:space:]]*}"
    tail=""
    if [[ "$line" == *[[:space:]]* ]]; then
      tail="${line#*[[:space:]]}"
      tail="${tail#"${tail%%[![:space:]]*}"}"
    fi
    echo "[m4] turn=$seq key=$key${tail:+ tail=${tail:0:60}...}"
    body="$(resolve_prompt "$key")"
    [[ -n "$tail" ]] && body="${body}"$'\n'"${tail}"
  fi

  pane_send_text "$session" "$body"
  printf '%s' "$body" > "$run_dir/turn-$seq.prompt.txt"

  # Last turn is the send-off; everything else uses the standard timeout.
  if [[ "$seq" -eq "$total" ]]; then
    turn_timeout="$sendoff_timeout"
    echo "[m4] turn=$seq is send-off; timeout=${turn_timeout}s"
  else
    turn_timeout="$standard_timeout"
  fi

  # TODO: if a scenario adds a pure slash command, wire `is_slash_only` +
  # `fake_sentinel_after_render` from lib/sync.sh here. See run-m1.sh.
  if ! wait_for_turn "$sentinel_dir" "$seq" "$turn_timeout" "$session"; then
    pane_capture_safe "$session" "$run_dir/transcript.txt" 10
    echo "[m4] FAIL turn=$seq — see $run_dir/transcript.txt" >&2
    exit 1
  fi
  pane_capture "$session" "$run_dir/turn-$seq.transcript.txt"
done

pane_capture "$session" "$run_dir/transcript.txt"

# In-repo-memory assertion (walk-and-send-off-3 fix). Did the memory write
# land in the in-repo ./observations/ (PASS) or leak to the user-level
# auto-memory home (BUG)? NONE = the run only sharpened rules
# (./CLAUDE.local.md), so the memory path wasn't exercised — not a failure.
post_user_mem="$(ls "$user_mem_dir" 2>/dev/null | sort | tr '\n' ' ')"
new_user_mem=""
for f in $post_user_mem; do
  echo " $pre_user_mem " | grep -qF " $f " || new_user_mem="$new_user_mem $f"
done
# `|| true`: when the agent sharpened rules (./CLAUDE.local.md) instead of
# writing an observations file, ./observations/ never gets created — find then exits
# non-zero and `set -euo pipefail` would kill the run AFTER the send-off already
# committed (silent exit 1, no message). Absent dir = no in-repo memory = NONE.
# Sibling of the user_mem_dir mkdir guard above.
new_proj_mem="$(find "$proj_mem_dir" -type f -newer "$run_start_marker" 2>/dev/null | tr '\n' ' ' || true)"
case "$(classify_memory_write "$new_user_mem" "$new_proj_mem")" in
  BUG)
    echo "[assert] FAIL M4 in-repo-memory: write landed USER-LEVEL ($user_mem_dir:$new_user_mem) — the in-repo-path fix did not take; walk-and-send-off-3 still routes to the auto-memory home" >&2
    exit 1 ;;
  PASS)
    echo "[assert] PASS M4 in-repo-memory: write landed in-repo ($proj_mem_dir):$new_proj_mem" ;;
  NONE)
    echo "[assert] WARN M4 in-repo-memory: no memory file written this run (gaps were rule-sharpening → ./CLAUDE.local.md); in-repo memory path not exercised" >&2 ;;
esac

# Post-run: identify new session UUID by diffing transcripts dir.
post_transcripts="$(ls "$transcripts_dir" 2>/dev/null | sort | tr '\n' ' ')"
new_uuid=""
for f in $post_transcripts; do
  if ! echo " $pre_transcripts " | grep -qF " $f "; then
    new_uuid="${f%.jsonl}"
    break
  fi
done

# Resolve the M4 starting-point SHA. Earlier versions greped the first
# 7+hex from the commit-turn transcript — that catches the prior commit
# reference (often the M1/M3 endpoint Claude cited while explaining
# context) rather than the new commit. Authoritative source is git
# itself: the "M4 starting point" commit is the most recent commit
# matching that exact message on the current branch.
commit_turn_transcript="$run_dir/turn-4.transcript.txt"
m4_sha=""
m4_sha="$(cd "$sut_cwd" && git log --format='%h' --grep='^M4 starting point$' -1 2>/dev/null || true)"
# Fallback to transcript grep only if the git lookup found nothing.
if [[ -z "$m4_sha" && -f "$commit_turn_transcript" ]]; then
  m4_sha="$(grep -oE '[0-9a-f]{7,12}' "$commit_turn_transcript" | head -1)"
fi

# Branch is m4/<task-slug>. Default to whatever the SHA-bearing commit's branch is.
m4_branch=""
if [[ -n "$m4_sha" ]]; then
  m4_branch="$(cd "$sut_cwd" && git branch -a --contains "$m4_sha" 2>/dev/null | grep -oE 'm4/[a-z0-9-]+' | head -1 || true)"
fi

state_file="$run_dir/m4-state.json"
cat > "$state_file" <<EOF
{
  "run_id": "$run_id",
  "m4_cwd": "$sut_cwd",
  "m4_sha": "$m4_sha",
  "m4_branch": "$m4_branch",
  "m4_session_uuid": "$new_uuid",
  "m4_transcript_path": "$transcripts_dir/$new_uuid.jsonl",
  "task_slug": "$task_slug"
}
EOF

echo "[m4] PASS turns=$seq — out: $run_dir"
echo "[m4] state.json: $state_file"
cat "$state_file"
