#!/usr/bin/env bash
# runner/run.sh — drive a Claude Code session in tmux through a scenario.
#
# Usage:
#   runner/run.sh scenarios/smoke.txt [--cwd /path/to/sut]
#
# Scenario file format: one prompt per non-blank, non-# line.
#   # comments allowed
#   a101-m1-debrief-cold-critic                    # key only
#   map-the-access-surface-2 The feature lives at /tmp/spec.md   # key + tail
#   * Yep. Just give it to me and save like you want it.         # literal
#
# Line shapes:
#   <prompt-key> [tail...]   — resolve key from registry; append tail on a new line
#   * <literal text>         — send the literal text as the turn (no resolve)
#
# Literal lines are for student-shaped interjections that aren't curriculum
# prompts: "yes save it" approvals, lazy-student answers, quick redirects.
# Keys resolve against $PROMPT_REGISTRY (default: ~/Projects/agents-102/curriculum/prompts).
# Bodies are inflated at send-time. Scenarios never duplicate prompt text.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/resolve-prompt.sh
source "$HERE/lib/resolve-prompt.sh"
# shellcheck source=lib/tmux.sh
source "$HERE/lib/tmux.sh"
# shellcheck source=lib/sync.sh
source "$HERE/lib/sync.sh"

scenario="${1:-}"
sut_cwd="$PWD"
shift || true
while [[ $# -gt 0 ]]; do
  case "$1" in
    --cwd) sut_cwd="$2"; shift 2 ;;
    *)     echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

if [[ -z "$scenario" || ! -f "$scenario" ]]; then
  echo "usage: $0 <scenario-file> [--cwd <path>]" >&2
  exit 2
fi

run_id="$(date +%Y%m%d-%H%M%S)-$$"
run_dir="$HERE/out/$run_id"
mkdir -p "$run_dir"
sentinel_dir="$run_dir/sentinels"
mkdir -p "$sentinel_dir"

session="runner-$run_id"
launch_cmd="env CLAUDE_RUNNER_SENTINEL_DIR=$sentinel_dir ${CLAUDE_CMD:-claude}"

echo "[runner] scenario=$scenario cwd=$sut_cwd run=$run_id"
echo "[runner] launching: $launch_cmd"

pane_start "$session" "$sut_cwd" "$launch_cmd"
sleep "${CLAUDE_RUNNER_WARMUP:-5}"  # let Claude Code paint its first prompt

seq=0
trap 'pane_capture "$session" "$run_dir/transcript.txt" || true; pane_kill "$session"' EXIT

while IFS= read -r line || [[ -n "$line" ]]; do
  [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
  seq=$((seq + 1))

  if [[ "$line" == \** ]]; then
    body="${line#\*}"
    body="${body# }"
    echo "[runner] turn=$seq literal=${body:0:60}..."
  else
    key="${line%%[[:space:]]*}"
    tail=""
    if [[ "$line" == *[[:space:]]* ]]; then
      tail="${line#*[[:space:]]}"
      tail="${tail#"${tail%%[![:space:]]*}"}"
    fi
    echo "[runner] turn=$seq key=$key${tail:+ tail=${tail:0:60}...}"
    body="$(resolve_prompt "$key")"
    if [[ -n "$tail" ]]; then
      body="${body}"$'\n'"${tail}"
    fi
  fi

  pane_send_text "$session" "$body"
  echo "$body" > "$run_dir/turn-$seq.prompt.txt"

  # TODO: if a scenario adds a pure slash command (`/context`, `/clear`,
  # `/memory`), wire `is_slash_only` + `fake_sentinel_after_render` from
  # lib/sync.sh here — slash commands don't fire the Stop hook so the
  # sentinel wait below will hang. See run-m1.sh for the pattern.
  if ! wait_for_turn "$sentinel_dir" "$seq" 600; then
    pane_capture "$session" "$run_dir/transcript.txt"
    echo "[runner] FAIL turn=$seq (sentinel timeout) — see $run_dir/transcript.txt" >&2
    exit 1
  fi

  pane_capture "$session" "$run_dir/turn-$seq.transcript.txt"
done < "$scenario"

pane_capture "$session" "$run_dir/transcript.txt"
echo "[runner] PASS turns=$seq — out: $run_dir"
