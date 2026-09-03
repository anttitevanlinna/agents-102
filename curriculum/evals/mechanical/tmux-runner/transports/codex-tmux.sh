#!/usr/bin/env bash
set -euo pipefail

CODEX_TRANSPORT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CODEX_RUNNER_DIR="$(cd "$CODEX_TRANSPORT_DIR/.." && pwd)"
source "$CODEX_RUNNER_DIR/lib/tmux.sh"
source "$CODEX_RUNNER_DIR/lib/codex-home.sh"

_codex_tui_completed_turns() {
  node "$CODEX_RUNNER_DIR/lib/codex-tui-events.js" "$CODEX_HOME" \
    | node -e 'let s=""; process.stdin.on("data",d=>s+=d); process.stdin.on("end",()=>process.stdout.write(String(JSON.parse(s).completedTurns)));'
}

_codex_tui_wait_ready() {
  local timeout="${1:-30}" started snap trusted=0
  started="$(date +%s)"
  while pane_alive "$CODEX_SESSION"; do
    snap="$(_tmux capture-pane -t "$CODEX_SESSION" -p -S -80 -E - 2>/dev/null || true)"
    if [[ $trusted -eq 0 ]] && grep -q 'Do you trust the contents of this directory' <<< "$snap"; then
      _tmux send-keys -t "$CODEX_SESSION" Enter
      trusted=1
    fi
    if grep -q 'OpenAI Codex' <<< "$snap" && grep -q '› Explain this codebase' <<< "$snap"; then
      return 0
    fi
    if (( $(date +%s) - started >= timeout )); then
      echo "codex_open: TUI did not become ready within ${timeout}s" >&2
      return 1
    fi
    sleep 0.5
  done
  echo 'codex_open: TUI exited before becoming ready' >&2
  return 1
}

codex_open() {
  local cwd="$1" run_dir="$2"
  [[ -d "$cwd" ]] || { echo "codex_open: cwd not found: $cwd" >&2; return 2; }
  mkdir -p "$run_dir"
  if [[ -n "${CODEX_HOME+x}" ]]; then
    CODEX_PREVIOUS_HOME_WAS_SET=1
    CODEX_PREVIOUS_HOME="$CODEX_HOME"
  else
    CODEX_PREVIOUS_HOME_WAS_SET=0
    CODEX_PREVIOUS_HOME=''
  fi
  CODEX_CWD="$cwd"
  CODEX_RUN_DIR="$run_dir"
  CODEX_OPERATOR_HOME="${CODEX_PREVIOUS_HOME:-$HOME/.codex}"
  CODEX_SESSION="runner-$(basename "$run_dir")"
  export CODEX_CWD CODEX_RUN_DIR CODEX_OPERATOR_HOME CODEX_SESSION
  export CODEX_PREVIOUS_HOME_WAS_SET CODEX_PREVIOUS_HOME
  export RUNNER_TMUX_SOCKET="runner-$(basename "$run_dir")"
  codex_prepare_home "$run_dir"

  local codex_bin="${CODEX_BIN:-codex}" launch_cmd
  printf -v launch_cmd 'env CODEX_HOME=%q %q --no-alt-screen --enable multi_agent_v2 --dangerously-bypass-approvals-and-sandbox -C %q' \
    "$CODEX_HOME" "$codex_bin" "$CODEX_CWD"
  pane_start "$CODEX_SESSION" "$CODEX_CWD" "$launch_cmd"
  _codex_tui_wait_ready "${CODEX_RUNNER_WARMUP:-30}"
}

codex_turn() {
  local prompt_file="$1" seq="$2" timeout="$3"
  local before now started
  before="$(_codex_tui_completed_turns)"
  pane_send_text "$CODEX_SESSION" "$(cat "$prompt_file")"
  started="$(date +%s)"
  while pane_alive "$CODEX_SESSION"; do
    now="$(_codex_tui_completed_turns)"
    if (( now > before )); then
      pane_capture "$CODEX_SESSION" "$CODEX_RUN_DIR/turn-$seq.transcript.txt"
      codex_capture_sessions
      return 0
    fi
    if (( $(date +%s) - started >= timeout )); then
      pane_capture_safe "$CODEX_SESSION" "$CODEX_RUN_DIR/turn-$seq.transcript.txt" 10
      echo "codex_turn: timeout after ${timeout}s waiting for root task_complete" >&2
      return 1
    fi
    sleep 1
  done
  pane_capture_safe "$CODEX_SESSION" "$CODEX_RUN_DIR/turn-$seq.transcript.txt" 10
  echo 'codex_turn: TUI exited before root task_complete' >&2
  return 2
}

codex_close() {
  if [[ -n "${CODEX_SESSION:-}" ]]; then
    pane_capture_safe "$CODEX_SESSION" "$CODEX_RUN_DIR/transcript.txt" 10 || true
    pane_kill "$CODEX_SESSION"
    CODEX_SESSION=''
    export CODEX_SESSION
  fi
  codex_cleanup_home
  if [[ "${CODEX_PREVIOUS_HOME_WAS_SET:-0}" == 1 ]]; then
    CODEX_HOME="$CODEX_PREVIOUS_HOME"
    export CODEX_HOME
  else
    unset CODEX_HOME
  fi
}
