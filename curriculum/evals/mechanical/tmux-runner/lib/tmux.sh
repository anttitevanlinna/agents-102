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

pane_start() {
  # $1=session name, $2=cwd, $3=command to launch
  local name="$1" cwd="$2" cmd="$3"
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
