#!/usr/bin/env bash
set -euo pipefail

CLAUDE_TRANSPORT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_RUNNER_DIR="$(cd "$CLAUDE_TRANSPORT_DIR/.." && pwd)"
source "$CLAUDE_RUNNER_DIR/lib/tmux.sh"
source "$CLAUDE_RUNNER_DIR/lib/sync.sh"

claude_open() {
  local cwd="$1" run_dir="$2"
  CLAUDE_RUN_DIR="$run_dir"
  CLAUDE_SENTINEL_DIR="$run_dir/sentinels"
  CLAUDE_SESSION="runner-$(basename "$run_dir")"
  mkdir -p "$CLAUDE_SENTINEL_DIR"
  export RUNNER_TMUX_SOCKET="runner-$(basename "$run_dir")"
  local command="${CLAUDE_CMD:-claude --permission-mode auto}"
  local launch_cmd="env CLAUDE_RUNNER_SENTINEL_DIR=$CLAUDE_SENTINEL_DIR $command"
  pane_start "$CLAUDE_SESSION" "$cwd" "$launch_cmd"
  sleep "${CLAUDE_RUNNER_WARMUP:-10}"
}

claude_turn() {
  local prompt_file="$1" seq="$2" timeout="$3"
  pane_send_text "$CLAUDE_SESSION" "$(cat "$prompt_file")"
  if ! wait_for_turn "$CLAUDE_SENTINEL_DIR" "$seq" "$timeout" "$CLAUDE_SESSION" "$prompt_file"; then
    pane_capture_safe "$CLAUDE_SESSION" "$CLAUDE_RUN_DIR/turn-$seq.transcript.txt" 10
    return 1
  fi
  pane_capture "$CLAUDE_SESSION" "$CLAUDE_RUN_DIR/turn-$seq.transcript.txt"
}

claude_close() {
  [[ -n "${CLAUDE_SESSION:-}" ]] || return 0
  pane_capture_safe "$CLAUDE_SESSION" "$CLAUDE_RUN_DIR/transcript.txt" 10 || true
  pane_kill "$CLAUDE_SESSION"
  CLAUDE_SESSION=''
}
