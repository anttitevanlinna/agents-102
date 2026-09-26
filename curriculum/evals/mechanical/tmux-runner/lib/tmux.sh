#!/usr/bin/env bash
# Tmux primitives: detached session, send-keys, capture-pane, kill.
# One session per scenario run. Pane 0 holds the SUT (Claude Code).
#
# Per-runner socket: every tmux call goes through `-L $RUNNER_TMUX_SOCKET`.
# Each run-mN.sh exports RUNNER_TMUX_SOCKET="runner-$run_id" before sourcing
# this lib, so concurrent runners (or any tmux activity on the host) can't
# kill-server each other off the user-default `/tmp/tmux-501/default` socket.
# Falls back to `default` if unset, preserving v0 behavior for ad-hoc use.
set -euo pipefail

_tmux() {
  tmux -L "${RUNNER_TMUX_SOCKET:-default}" "$@"
}

# Lowest Claude Code the runners are verified on (2.1.281, Acme run 2026-09-26;
# 1.0.67 rejected `--permission-mode auto` and died before turn 1).
CLAUDE_CLI_FLOOR="${CLAUDE_CLI_FLOOR:-2.1.281}"

# claude_cli_preflight <launch command>: refuse a claude launch whose binary is
# missing, below the floor, or lacks the requested --permission-mode. Any other
# command passes untouched. Leading `env` and VAR=value words are skipped.
claude_cli_preflight() {
  local -a w; read -ra w <<< "$1"
  local i=0 bin mode="" path ver
  while [[ $i -lt ${#w[@]} ]] && [[ "${w[$i]}" == env || "${w[$i]}" =~ ^[A-Za-z_][A-Za-z0-9_]*= ]]; do i=$((i+1)); done
  bin="${w[$i]:-}"
  [[ "$(basename "$bin")" == claude ]] || return 0
  for ((j=i+1; j<${#w[@]}; j++)); do [[ "${w[$j]}" == --permission-mode ]] && mode="${w[$((j+1))]:-}"; done
  local fix="Put a current Claude Code first on PATH (\`claude update\`; remove or shadow a stale Homebrew copy) or set CLAUDE_CMD to its full path."
  if [[ "$bin" == */* ]]; then path="$bin"; else path="$(command -v "$bin" || true)"; fi
  if [[ -z "$path" || ! -x "$path" ]]; then
    echo "[preflight] Claude Code not found: $bin. $fix" >&2; return 1
  fi
  ver="$("$path" --version 2>/dev/null | awk '{print $1; exit}')"
  if ! awk -v a="$ver" -v b="$CLAUDE_CLI_FLOOR" 'BEGIN { n=split(a,x,"."); split(b,y,".")
      for (k=1;k<=3;k++) { if (x[k]+0 > y[k]+0) exit 0; if (x[k]+0 < y[k]+0) exit 1 } exit (n ? 0 : 1) }'; then
    echo "[preflight] Claude Code ${ver:-unknown} at $path is below the runner floor $CLAUDE_CLI_FLOOR. $fix" >&2; return 1
  fi
  if [[ -n "$mode" ]] && ! "$path" --help 2>/dev/null | grep -q "\"$mode\""; then
    echo "[preflight] Claude Code $ver at $path does not offer --permission-mode $mode. $fix" >&2; return 1
  fi
}

pane_start() {
  # $1=session name, $2=cwd, $3=command to launch
  local name="$1" cwd="$2" cmd="$3"
  claude_cli_preflight "$cmd" || return 1
  _tmux new-session -d -s "$name" -x 220 -y 50 -c "$cwd" "$cmd"
}

pane_send_text() {
  # Send a text payload into the pane, then submit with Enter.
  # Single-line goes via send-keys -l (literal). Multi-line uses bracketed
  # paste so TUIs like Claude Code treat the newlines as pasted content
  # rather than per-line submits. A brief sleep between payload and Enter
  # gives the TUI time to process the paste before we submit.
  local name="$1" text="$2"
  if [[ "$text" != *$'\n'* ]]; then
    _tmux send-keys -t "$name" -l "$text"
    sleep 0.3
    _tmux send-keys -t "$name" Enter
  else
    local buf
    buf="$(mktemp)"
    printf '%s' "$text" > "$buf"
    _tmux load-buffer -b runner -t "$name" "$buf"
    _tmux paste-buffer -b runner -t "$name" -p
    rm -f "$buf"
    sleep 0.5
    _tmux send-keys -t "$name" Enter
  fi
}

pane_capture() {
  # $1=session name, $2=output file. Captures the full scrollback.
  local name="$1" out="$2"
  _tmux capture-pane -t "$name" -p -S - -E - > "$out"
}

pane_capture_safe() {
  # Like pane_capture, but with a hard wall-clock timeout (default 10s).
  # Use on FAIL paths where capturing from an actively-rendering pane
  # would block the bash trap indefinitely (claude at high effort can
  # render for an hour past the runner's sentinel timeout).
  # Falls back to perl-alarm wrapper since macOS lacks GNU timeout.
  local name="$1" out="$2" wall="${3:-10}"
  local socket="${RUNNER_TMUX_SOCKET:-default}"
  if command -v gtimeout >/dev/null 2>&1; then
    gtimeout "$wall" tmux -L "$socket" capture-pane -t "$name" -p -S - -E - > "$out" 2>/dev/null || true
  elif command -v timeout >/dev/null 2>&1; then
    timeout "$wall" tmux -L "$socket" capture-pane -t "$name" -p -S - -E - > "$out" 2>/dev/null || true
  else
    perl -e 'alarm shift; exec @ARGV' "$wall" \
      tmux -L "$socket" capture-pane -t "$name" -p -S - -E - > "$out" 2>/dev/null || true
  fi
}

pane_kill() {
  local name="$1"
  _tmux kill-session -t "$name" 2>/dev/null || true
}

pane_alive() {
  local name="$1"
  _tmux has-session -t "$name" 2>/dev/null
}
