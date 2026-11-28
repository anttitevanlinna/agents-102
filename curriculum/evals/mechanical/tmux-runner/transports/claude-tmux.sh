#!/usr/bin/env bash
set -euo pipefail

CLAUDE_TRANSPORT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_RUNNER_DIR="$(cd "$CLAUDE_TRANSPORT_DIR/.." && pwd)"
source "$CLAUDE_RUNNER_DIR/lib/tmux.sh"
source "$CLAUDE_RUNNER_DIR/lib/sync.sh"

# The SUT must not read the operator's user memory: a student has none of it.
# claudeMdExcludes hides it without moving auth (a scratch HOME would).
claude_launch_cmd() {
  local run_dir="$1" settings="$1/runner-settings.json"
  local command="${CLAUDE_CMD:-claude --model sonnet --permission-mode auto}"
  mkdir -p "$run_dir"
  printf '{"claudeMdExcludes":["%s/.claude/CLAUDE.md","%s/.claude/rules/**"]}\n' "$HOME" "$HOME" > "$settings"
  [[ "$command" == *--settings* ]] || command="$command --settings $settings"
  printf '%s\n' "$command"
}

# A cloud session hands its own project memory and effort level to any child
# CLI through the environment: the SUT then starts with the operator's memory
# index in its system prompt and recalls notes about the course under test
# (A101 M1, 2026-11-28: the SUT recalled the note describing the M1 redesign).
# A student has neither. The launch drops those variables; auth stays put.
CLAUDE_OPERATOR_ENV=(CLAUDE_COWORK_MEMORY_PATH_OVERRIDE CLAUDE_MEMORY_STORES CLAUDE_EFFORT)
claude_launch_env() {
  local sentinel_dir="$1" name out="env"
  for name in "${CLAUDE_OPERATOR_ENV[@]}"; do out+=" -u $name"; done
  printf '%s CLAUDE_RUNNER_SENTINEL_DIR=%s\n' "$out" "$sentinel_dir"
}

claude_open() {
  local cwd="$1" run_dir="$2"
  CLAUDE_RUN_DIR="$run_dir"
  CLAUDE_SENTINEL_DIR="$run_dir/sentinels"
  CLAUDE_SESSION="runner-$(basename "$run_dir")"
  mkdir -p "$CLAUDE_SENTINEL_DIR"
  export RUNNER_TMUX_SOCKET="runner-$(basename "$run_dir")"
  local command; command="$(claude_launch_cmd "$run_dir")"
  local launch_cmd="$(claude_launch_env "$CLAUDE_SENTINEL_DIR") $command"
  pane_start "$CLAUDE_SESSION" "$cwd" "$launch_cmd"
  pane_accept_folder_trust "$CLAUDE_SESSION" "${CLAUDE_RUNNER_WARMUP:-10}"
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
