#!/usr/bin/env bash
# run-m3.sh — orchestrate AE101 M3's two-window flow as the student does it.
#
# Phases:
#   A. Main session: fork the worktree (single prompt, sequential)
#   B. Two tmux sessions, race-based: main (security) + quality (side-quest)
#      both progress in parallel; whichever sentinel fires next, the
#      orchestrator sends that side's next turn. Natural turn-taking.
#   C. Main session: sharpen-skill closer (single prompt, sequential).
#
# Usage: run-m3.sh --main-cwd /path/to/repo --quality-cwd /path/to/worktree
#
# The --quality-cwd path doesn't need to exist at start; it's created in
# phase A. The orchestrator waits for it before starting the quality session.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/lib/resolve-prompt.sh"
source "$HERE/lib/tmux.sh"
source "$HERE/lib/sync.sh"

main_cwd=""
quality_cwd=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --main-cwd)    main_cwd="$2"; shift 2 ;;
    --quality-cwd) quality_cwd="$2"; shift 2 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

if [[ -z "$main_cwd" || -z "$quality_cwd" ]]; then
  echo "usage: $0 --main-cwd <path> --quality-cwd <path>" >&2
  exit 2
fi

main_scenario="${SCENARIO_MAIN:-$HERE/scenarios/m3-main.txt}"
quality_scenario="${SCENARIO_QUALITY:-$HERE/scenarios/m3-quality.txt}"
[[ -f "$main_scenario" ]] || { echo "missing main scenario: $main_scenario" >&2; exit 2; }
[[ -f "$quality_scenario" ]] || { echo "missing quality scenario: $quality_scenario" >&2; exit 2; }
closer_key="ae101-m3-sharpen-skill"

run_id="$(date +%Y%m%d-%H%M%S)-$$"
export RUNNER_TMUX_SOCKET="runner-$run_id"
run_dir="$HERE/out/$run_id"
main_dir="$run_dir/main"
quality_dir="$run_dir/quality"
mkdir -p "$main_dir/sentinels" "$quality_dir/sentinels"

main_session="runner-$run_id-main"
quality_session="runner-$run_id-quality"
warmup="${CLAUDE_RUNNER_WARMUP:-10}"
launch_cmd_template="${CLAUDE_CMD:-claude}"

echo "[m3] run=$run_id"
echo "[m3] main: $main_cwd → session=$main_session scenario=$main_scenario"
echo "[m3] quality: $quality_cwd → session=$quality_session scenario=$quality_scenario"

# Parse a scenario file: echo non-blank, non-comment lines one per stdout line.
# Caller reads them into an array (bash 3.2-compatible: no `local -n`).
parse_scenario() {
  local file="$1"
  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
    echo "$line"
  done < "$file"
}

# Given a raw scenario line, return the body to send.
render_line() {
  local line="$1"
  if [[ "$line" == \** ]]; then
    local body="${line#\*}"
    body="${body# }"
    printf '%s' "$body"
  else
    local key="${line%%[[:space:]]*}"
    local tail=""
    if [[ "$line" == *[[:space:]]* ]]; then
      tail="${line#*[[:space:]]}"
      tail="${tail#"${tail%%[![:space:]]*}"}"
    fi
    local body
    body="$(resolve_prompt "$key")"
    if [[ -n "$tail" ]]; then
      body="${body}"$'\n'"${tail}"
    fi
    printf '%s' "$body"
  fi
}

label_line() {
  local line="$1"
  if [[ "$line" == \** ]]; then
    echo "literal=${line:0:50}..."
  else
    local key="${line%%[[:space:]]*}"
    echo "key=$key"
  fi
}

main_lines=()
while IFS= read -r line; do main_lines+=("$line"); done < <(parse_scenario "$main_scenario")
quality_lines=()
while IFS= read -r line; do quality_lines+=("$line"); done < <(parse_scenario "$quality_scenario")

# TODO: if a scenario adds a pure slash command (`/clear` etc), gate the
# race-loop sentinel waits with `is_slash_only` from lib/sync.sh and
# call `fake_sentinel_after_render` so the loop advances. Today's m3
# scenarios contain no slash commands, so the race loop is safe; but
# `ae101-m3-clear-session.md` would need this wiring if added.

main_total=${#main_lines[@]}
quality_total=${#quality_lines[@]}
echo "[m3] main turns=$main_total quality turns=$quality_total"

cleanup() {
  # Bounded-time captures so the trap can't be held hostage by an
  # actively-rendering pane — claude at high effort can render past
  # the runner's sentinel timeout. Two sessions doubles the hang risk.
  pane_capture_safe "$main_session" "$main_dir/transcript.txt" 10
  pane_capture_safe "$quality_session" "$quality_dir/transcript.txt" 10
  pane_kill "$main_session"
  pane_kill "$quality_session"
}
trap cleanup EXIT

# ============================================================
# Phase A: start main, fire fork prompt, wait for worktree.
# ============================================================
echo "[m3] phase A: starting main session, sending fork prompt"
launch_main="env CLAUDE_RUNNER_SENTINEL_DIR=$main_dir/sentinels $launch_cmd_template"
pane_start "$main_session" "$main_cwd" "$launch_main"
sleep "$warmup"

main_seq=0
send_main_turn() {
  local line="${main_lines[$main_seq]}"
  main_seq=$((main_seq + 1))
  echo "[m3] main turn=$main_seq $(label_line "$line")"
  local body
  body="$(render_line "$line")"
  printf '%s' "$body" > "$main_dir/turn-$main_seq.prompt.txt"
  pane_send_text "$main_session" "$body"
}

send_main_turn  # phase A: fork
echo "[m3] phase A: waiting for fork sentinel"
wait_for_turn "$main_dir/sentinels" 1 300 "$main_session"
pane_capture "$main_session" "$main_dir/turn-1.transcript.txt"

# Quality cwd should now exist. Verify.
if [[ ! -d "$quality_cwd" ]]; then
  echo "[m3] FAIL: quality cwd $quality_cwd not created by fork prompt" >&2
  exit 1
fi
echo "[m3] phase A done: worktree at $quality_cwd"

# ============================================================
# Phase B: parallel main (turns 2..N) + quality (1..M).
# ============================================================
# Install the Stop hook into the new worktree. Without this the quality
# session won't write sentinels and the race loop hangs. Hooks live in
# .claude/settings.local.json which is per-cwd and NOT copied across by
# `git worktree add` — fork prompt copies CLAUDE.local.md + memory/ only.
echo "[m3] phase B: installing Stop hook in worktree"
"$HERE/install-sut.sh" "$quality_cwd"

echo "[m3] phase B: starting quality session"
launch_quality="env CLAUDE_RUNNER_SENTINEL_DIR=$quality_dir/sentinels $launch_cmd_template"
pane_start "$quality_session" "$quality_cwd" "$launch_quality"
sleep "$warmup"

quality_seq=0
send_quality_turn() {
  local line="${quality_lines[$quality_seq]}"
  quality_seq=$((quality_seq + 1))
  echo "[m3] quality turn=$quality_seq $(label_line "$line")"
  local body
  body="$(render_line "$line")"
  printf '%s' "$body" > "$quality_dir/turn-$quality_seq.prompt.txt"
  pane_send_text "$quality_session" "$body"
}

# Fire first turn for both sides.
[[ "$main_seq" -lt "$main_total" ]] && send_main_turn
send_quality_turn

# Race loop: poll both sentinel dirs; whichever's next sentinel lands first,
# send that side's next turn. Continue until both queues empty.
main_acked=1     # turn-1 already acked in phase A
quality_acked=0
poll_interval=2
elapsed=0
# M3's race loop drives BOTH sessions through ~10 prompts total at
# high effort. Wall-clock budget must accommodate the sum of two
# parallel-but-not-fully-overlapping pipelines plus API retries.
timeout_s="${CLAUDE_RUNNER_M3_TIMEOUT:-7200}"

while true; do
  main_pending=$((main_seq - main_acked))
  quality_pending=$((quality_seq - quality_acked))
  main_left=$((main_total - main_seq))
  quality_left=$((quality_total - quality_seq))

  if [[ "$main_pending" -eq 0 && "$quality_pending" -eq 0 && "$main_left" -eq 0 && "$quality_left" -eq 0 ]]; then
    echo "[m3] phase B done: both scenarios complete"
    break
  fi

  # Check if next sentinel for either side has landed.
  if [[ "$main_pending" -gt 0 ]]; then
    next=$((main_acked + 1))
    if [[ -f "$main_dir/sentinels/turn-$next.done" ]]; then
      main_acked=$next
      pane_capture "$main_session" "$main_dir/turn-$next.transcript.txt"
      [[ "$main_seq" -lt "$main_total" ]] && send_main_turn
      continue
    fi
  fi

  if [[ "$quality_pending" -gt 0 ]]; then
    next=$((quality_acked + 1))
    if [[ -f "$quality_dir/sentinels/turn-$next.done" ]]; then
      quality_acked=$next
      pane_capture "$quality_session" "$quality_dir/turn-$next.transcript.txt"
      [[ "$quality_seq" -lt "$quality_total" ]] && send_quality_turn
      continue
    fi
  fi

  # Liveness check — if either tmux session died externally (claude
  # OOM, API kill, system reboot), polling for sentinels is futile.
  # Earlier M3 runs polled for 90+ min after the session was gone
  # before someone noticed. Fail fast on first dead-session detection.
  if ! tmux -L "$RUNNER_TMUX_SOCKET" has-session -t "$main_session" 2>/dev/null; then
    echo "[m3] FAIL: main session $main_session died externally. main_acked=$main_acked/$main_total quality_acked=$quality_acked/$quality_total" >&2
    exit 1
  fi
  if ! tmux -L "$RUNNER_TMUX_SOCKET" has-session -t "$quality_session" 2>/dev/null; then
    echo "[m3] FAIL: quality session $quality_session died externally. main_acked=$main_acked/$main_total quality_acked=$quality_acked/$quality_total" >&2
    exit 1
  fi

  sleep "$poll_interval"
  elapsed=$((elapsed + poll_interval))
  if [[ "$elapsed" -ge "$timeout_s" ]]; then
    echo "[m3] FAIL: phase B timeout after ${timeout_s}s. main_acked=$main_acked/$main_total quality_acked=$quality_acked/$quality_total" >&2
    exit 1
  fi
done

# ============================================================
# Phase C: sharpen-skill closer in main session.
# ============================================================
echo "[m3] phase C: sending closer ($closer_key) to main session"
main_seq=$((main_seq + 1))
closer_body="$(resolve_prompt "$closer_key")"
printf '%s' "$closer_body" > "$main_dir/turn-$main_seq.prompt.txt"
echo "[m3] main turn=$main_seq key=$closer_key (closer)"
pane_send_text "$main_session" "$closer_body"

closer_timeout="${CLAUDE_RUNNER_TIMEOUT:-3600}"
if ! wait_for_turn "$main_dir/sentinels" "$main_seq" "$closer_timeout" "$main_session"; then
  echo "[m3] FAIL: closer — see $main_dir/transcript.txt" >&2
  exit 1
fi
pane_capture "$main_session" "$main_dir/turn-$main_seq.transcript.txt"

echo "[m3] PASS: all phases complete"
echo "[m3] out: $run_dir"
