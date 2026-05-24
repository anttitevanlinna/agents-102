#!/usr/bin/env bash
# run-m2.sh — drive AE101 M2 (Plan mode, done right) end-to-end.
#
# Single session in the main lemmings repo. Walks scenarios/m2.txt:
# plan → push-back/walk-down → lock-it-in → name-the-pattern →
# extract-task-shaping-rules → save → automation-shapes → auto-load
# question → opportunistic CLAUDE.local.md integrate.
#
# Per-turn artifact assertions (check_platform_and_boundaries.md § 16a):
# the M2 turns produce a plan file in ~/.claude/plans/<slug>.md, a
# task-shaping-rules file at a student-picked path, and possibly an
# updated ./CLAUDE.local.md. Each gated here.
#
# Usage: run-m2.sh --cwd /path/to/repo [--task-slug <slug>]
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

scenario="${SCENARIO:-$HERE/scenarios/m2.txt}"
[[ -f "$scenario" ]] || { echo "missing scenario: $scenario" >&2; exit 2; }

run_id="$(date +%Y%m%d-%H%M%S)-$$"
run_dir="$HERE/out/$run_id"
sentinel_dir="$run_dir/sentinels"
mkdir -p "$sentinel_dir"

session="runner-$run_id"
launch_cmd="env CLAUDE_RUNNER_SENTINEL_DIR=$sentinel_dir ${CLAUDE_CMD:-claude}"
warmup="${CLAUDE_RUNNER_WARMUP:-10}"
standard_timeout="${CLAUDE_RUNNER_TIMEOUT:-3600}"
# T2 (push-back-on-the-plan-2 walk-down) can run long on real codebases —
# pre-cohort-todos notes a 13m15s walk-down on a real codebase. Give it
# more headroom than the standard turn budget.
walkdown_timeout="${CLAUDE_RUNNER_M2_WALKDOWN_TIMEOUT:-3600}"

# Snapshot transcripts dir + git baseline + plan-dir snapshot.
encoded_cwd="$(echo "$sut_cwd" | sed 's|/|-|g')"
transcripts_dir="$HOME/.claude/projects/$encoded_cwd"
mkdir -p "$transcripts_dir"
pre_transcripts="$(ls "$transcripts_dir" 2>/dev/null | sort | tr '\n' ' ')"
baseline_sha="$(cd "$sut_cwd" && git rev-parse --short HEAD)"
baseline_branch="$(cd "$sut_cwd" && git rev-parse --abbrev-ref HEAD)"
plans_dir="$HOME/.claude/plans"
mkdir -p "$plans_dir"
pre_plans="$(ls "$plans_dir" 2>/dev/null | sort | tr '\n' ' ')"
claude_local_md="$sut_cwd/CLAUDE.local.md"
claude_local_mtime_baseline="$(mtime_of "$claude_local_md")"
run_start_epoch="$(date +%s)"

echo "[m2] cwd=$sut_cwd run=$run_id"
echo "[m2] baseline sha=$baseline_sha branch=$baseline_branch"
echo "[m2] launching: $launch_cmd"

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
echo "[m2] turns=$total"

# Locate the M2 plan file once it lands. Caches in $plan_file_global.
plan_file_global=""
locate_plan_file() {
  local f newest
  newest=""
  for f in "$plans_dir"/*.md; do
    [[ -f "$f" ]] || continue
    local base; base="$(basename "$f")"
    if ! echo " $pre_plans " | grep -qF " $base "; then
      if [[ -z "$newest" || "$f" -nt "$newest" ]]; then
        newest="$f"
      fi
    fi
  done
  plan_file_global="$newest"
}

# Cached plan file mtime after lock-it-in baseline.
plan_mtime_pre_lock=0

# Assertion dispatch — one case per prompt-key turn. Dispatched on
# key_seq (prompt-key-only counter), NOT on total seq. Literal turns
# (lines starting with `*`) are skipped entirely — sentinel-wait +
# transcript capture only, no assertion. This lets the same script
# drive both scenarios/m2.txt (no canned student replies — just the
# `* lock it in` literal between push-back-2 and push-back-3) and
# scenarios/m2-codesearch.txt (canned reply literals after the four
# ask-and-wait prompts). The prompt-key sequence is identical across
# both variants, so key_seq aligns case numbers cleanly.
assert_turn() {
  local seq="$1" transcript="$2"
  case "$seq" in
    1)  # push-back-on-the-plan-1 — plan file written under ~/.claude/plans/.
        locate_plan_file
        if [[ -n "$plan_file_global" && -f "$plan_file_global" ]]; then
          echo "[assert] PASS T1 plan-file: $plan_file_global"
          plan_mtime_pre_lock="$(mtime_of "$plan_file_global")"
          return 0
        fi
        echo "[assert] FAIL T1 plan-file: no new file in $plans_dir since baseline" >&2
        return 1
        ;;
    2)  # push-back-on-the-plan-2 — explicit "don't touch the plan yet".
        # Two checks: scrollback contains branch-walk language (soft),
        # AND plan file mtime is UNCHANGED since T1 (catches silent
        # plan-file violation — the "Don't touch until lock it in"
        # contract). Refresh the baseline at end of T2 so T3's check
        # asserts only the T2→T3 delta. The "lock it in" literal (and,
        # in m2-codesearch.txt, the canned student-voice reply that
        # precedes it) fires BETWEEN this turn and T3 — both are skipped
        # by the dispatcher, so the plan edit lands before key_seq=3.
        assert_or_warn assert_scrollback_grep "T2 branch-walk" "$transcript" "branch|dependenc|side.effect|assumption|recommend"
        local plan_mtime_now
        plan_mtime_now="$(mtime_of "$plan_file_global")"
        if [[ "$plan_mtime_now" -gt "$plan_mtime_pre_lock" ]]; then
          echo "[assert] FAIL T2 plan-file touched before 'lock it in' (mtime $plan_mtime_pre_lock -> $plan_mtime_now)" >&2
          return 1
        fi
        echo "[assert] PASS T2 plan-file untouched (mtime stable at $plan_mtime_now)"
        # Refresh baseline: T3 asserts only the post-T2 delta (i.e. the
        # edit triggered by the intervening 'lock it in' literal).
        plan_mtime_pre_lock="$plan_mtime_now"
        ;;
    3)  # push-back-on-the-plan-3 — design pattern named in scrollback,
        # AND plan file mtime advanced past T2 baseline (the 'lock it in'
        # literal that fired between T2 and T3 should have triggered the
        # in-place plan edit by now).
        locate_plan_file
        if [[ -z "$plan_file_global" ]]; then
          echo "[assert] FAIL T3 plan-locked: plan file not located" >&2
          return 1
        fi
        if ! assert_file_mtime_advanced "T3 plan locked-in" "$plan_file_global" "$plan_mtime_pre_lock"; then
          return 1
        fi
        assert_scrollback_grep "T3 pattern-named" "$transcript" "push.back|second.pass|walk.down|pair|design pattern|pattern"
        ;;
    4)  # extract-the-task-shaping-rule-1 — 3-5 rules proposed in scrollback.
        # Loose match: scrollback contains numbered or bulleted rules.
        assert_scrollback_grep "T4 rules-proposed" "$transcript" "rule|^[[:space:]]*[0-9]\.|^[[:space:]]*\*|^[[:space:]]*-"
        ;;
    5)  # extract-the-task-shaping-rule-2 — rules saved to picked path.
        # Tail asks Claude to echo `SAVED-PATH: <abs path>`; grep the LAST
        # match (the prompt-instruction echo of `SAVED-PATH: <abs path>` is
        # an earlier match, so head -1 catches the placeholder text).
        local saved
        saved="$(grep -oE 'SAVED-PATH:[[:space:]]*[^[:space:]]+' "$transcript" | grep -vE 'SAVED-PATH:[[:space:]]*<' | tail -1 | sed -E 's/SAVED-PATH:[[:space:]]*//')"
        if [[ -n "$saved" ]]; then
          # Tilde expansion.
          saved="${saved/#\~/$HOME}"
          if [[ -f "$saved" && "$(stat -f %m "$saved" 2>/dev/null || stat -c %Y "$saved")" -ge "$run_start_epoch" ]]; then
            echo "[assert] PASS T5 rules-file at $saved"
            echo "$saved" > "$run_dir/m2-rules-file.path"
            return 0
          fi
          echo "[assert] FAIL T5 rules-file: SAVED-PATH=$saved not found or stale" >&2
          return 1
        fi
        echo "[assert] FAIL T5 rules-file: no SAVED-PATH marker in transcript" >&2
        return 1
        ;;
    6)  # extract-the-task-shaping-rule-3 — automation shapes named.
        assert_scrollback_grep "T6 shapes-named" "$transcript" "slack|webhook|schedul|cron|queue|trigger|automation"
        ;;
    7)  # push-back-on-the-plan-4 — answers the auto-load question.
        assert_scrollback_grep "T7 auto-load-answer" "$transcript" "auto.?load|CLAUDE\.md|CLAUDE\.local|@import|loaded|context"
        ;;
    8)  # ae101-m2-integrate-branch — conditional integrate into CLAUDE.local.md.
        # Pass if either: file mtime advanced OR scrollback says nothing earned.
        if assert_file_mtime_advanced "T8 CLAUDE.local.md mtime" "$claude_local_md" "$claude_local_mtime_baseline" 2>/dev/null; then
          return 0
        fi
        assert_scrollback_grep "T8 nothing-earned fallback" "$transcript" "nothing earned|didn't earn|no branch|did not earn|stop"
        ;;
    *)
        echo "[m2] no assertion configured for prompt-key turn $seq" >&2
        return 1
        ;;
  esac
}

seq=0
key_seq=0
for line in "${lines[@]}"; do
  seq=$((seq + 1))
  is_literal=0

  if [[ "$line" == \** ]]; then
    body="${line#\*}"; body="${body# }"
    is_literal=1
    echo "[m2] turn=$seq literal=${body:0:60}..."
  else
    key_seq=$((key_seq + 1))
    key="${line%%[[:space:]]*}"
    tail=""
    if [[ "$line" == *[[:space:]]* ]]; then
      tail="${line#*[[:space:]]}"
      tail="${tail#"${tail%%[![:space:]]*}"}"
    fi
    echo "[m2] turn=$seq key_seq=$key_seq key=$key${tail:+ tail=${tail:0:60}...}"
    body="$(resolve_prompt "$key")"
    [[ -n "$tail" ]] && body="${body}"$'\n'"${tail}"
  fi

  # Pre-send baseline refresh for case 2's "plan untouched" check.
  # push-back-on-the-plan-2 is the prompt that establishes the
  # "Don't touch the plan until 'lock it in'" contract. The baseline
  # must be snapshotted JUST BEFORE push-back-2 is sent, otherwise any
  # plan refinement Claude does in the prior turn (e.g. integrating
  # canned-reply answers in m2-codesearch.txt) bleeds into the baseline
  # set at end-of-T1 and fails case 2 through no fault of push-back-2.
  if [[ "$is_literal" -eq 0 && "$key_seq" -eq 2 ]]; then
    locate_plan_file
    if [[ -n "$plan_file_global" ]]; then
      plan_mtime_pre_lock="$(mtime_of "$plan_file_global")"
      echo "[m2] turn=$seq pre-T2 plan mtime baseline refreshed to $plan_mtime_pre_lock"
    fi
  fi

  pane_send_text "$session" "$body"
  printf '%s' "$body" > "$run_dir/turn-$seq.prompt.txt"

  # Per-turn timeout: T2 (push-back-on-the-plan-2 walk-down) gets the
  # long budget; others use the standard turn timeout. Dispatched on
  # key_seq so canned-reply literals in m2-codesearch.txt don't shift
  # which prompt-key earns the walkdown budget.
  if [[ "$is_literal" -eq 0 && "$key_seq" -eq 2 ]]; then
    turn_timeout="$walkdown_timeout"
    echo "[m2] turn=$seq is walk-down; timeout=${turn_timeout}s"
  else
    turn_timeout="$standard_timeout"
  fi

  # Slash commands (body is a pure slash command with no args) are
  # client-side renders — no LLM call, no Stop hook fires, no sentinel.
  if is_slash_only "$body"; then
    echo "[m2] turn=$seq slash-command (no sentinel) — bridging via lib"
    fake_sentinel_after_render "$sentinel_dir" "$seq" "${CLAUDE_RUNNER_SLASH_SLEEP:-3}"
  elif ! wait_for_turn "$sentinel_dir" "$seq" "$turn_timeout"; then
    pane_capture "$session" "$run_dir/transcript.txt"
    echo "[m2] FAIL turn=$seq (sentinel timeout after ${turn_timeout}s) — see $run_dir/transcript.txt" >&2
    exit 1
  fi
  pane_capture "$session" "$run_dir/turn-$seq.transcript.txt"

  # Literal turns (canned student replies, 'lock it in') don't carry
  # assertions — the next prompt-key turn's assertion picks up the
  # downstream state effect (e.g. plan mtime advance after 'lock it
  # in' is asserted at key_seq=3 / push-back-on-the-plan-3).
  if [[ "$is_literal" -eq 1 ]]; then
    echo "[m2] turn=$seq literal — no assertion (downstream key-turn will gate)"
    continue
  fi

  if ! assert_turn "$key_seq" "$run_dir/turn-$seq.transcript.txt"; then
    pane_capture "$session" "$run_dir/transcript.txt"
    echo "[m2] FAIL turn=$seq key_seq=$key_seq assertion miss — see $run_dir/turn-$seq.transcript.txt" >&2
    exit 1
  fi
done

pane_capture "$session" "$run_dir/transcript.txt"

# Post-run: identify new session UUID + capture M2 end state for M3 handoff.
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
locate_plan_file
m2_rules_file=""
[[ -f "$run_dir/m2-rules-file.path" ]] && m2_rules_file="$(cat "$run_dir/m2-rules-file.path")"

state_file="$run_dir/m2-state.json"
cat > "$state_file" <<EOF
{
  "run_id": "$run_id",
  "m2_cwd": "$sut_cwd",
  "m2_starting_sha": "$baseline_sha",
  "m2_ending_sha": "$ending_sha",
  "m2_branch": "$ending_branch",
  "m2_session_uuid": "$new_uuid",
  "m2_transcript_path": "$transcripts_dir/$new_uuid.jsonl",
  "m2_plan_file": "${plan_file_global:-}",
  "m2_rules_file": "$m2_rules_file",
  "m2_claude_local_md": "$claude_local_md",
  "task_slug": "$task_slug"
}
EOF

echo "[m2] PASS turns=$seq key_turns=$key_seq — out: $run_dir"
echo "[m2] state.json: $state_file"
cat "$state_file"
