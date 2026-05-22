#!/usr/bin/env bash
# Tmux primitives: detached session, send-keys, capture-pane, kill.
# One session per scenario run. Pane 0 holds the SUT (Claude Code).
set -euo pipefail

pane_start() {
  # $1=session name, $2=cwd, $3=command to launch
  local name="$1" cwd="$2" cmd="$3"
  tmux new-session -d -s "$name" -x 220 -y 50 -c "$cwd" "$cmd"
}

pane_send_text() {
  # Send a text payload into the pane, then submit with Enter.
  # Single-line goes via send-keys -l (literal). Multi-line uses bracketed
  # paste so TUIs like Claude Code treat the newlines as pasted content
  # rather than per-line submits. A brief sleep between payload and Enter
  # gives the TUI time to process the paste before we submit.
  local name="$1" text="$2"
  if [[ "$text" != *$'\n'* ]]; then
    tmux send-keys -t "$name" -l "$text"
    sleep 0.3
    tmux send-keys -t "$name" Enter
  else
    local buf
    buf="$(mktemp)"
    printf '%s' "$text" > "$buf"
    tmux load-buffer -b runner -t "$name" "$buf"
    tmux paste-buffer -b runner -t "$name" -p
    rm -f "$buf"
    sleep 0.5
    tmux send-keys -t "$name" Enter
  fi
}

pane_capture() {
  # $1=session name, $2=output file. Captures the full scrollback.
  local name="$1" out="$2"
  tmux capture-pane -t "$name" -p -S - -E - > "$out"
}

pane_kill() {
  local name="$1"
  tmux kill-session -t "$name" 2>/dev/null || true
}

pane_alive() {
  local name="$1"
  tmux has-session -t "$name" 2>/dev/null
}
