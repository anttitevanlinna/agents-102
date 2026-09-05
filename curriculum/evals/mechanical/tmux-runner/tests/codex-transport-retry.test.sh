#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNNER="$(cd "$HERE/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

source "$RUNNER/transports/codex-tmux.sh"

attempts="$TMP/attempts"
printf '0\n' > "$attempts"
printf 'test prompt\n' > "$TMP/prompt.txt"
mkdir -p "$TMP/run"

CODEX_RUN_DIR="$TMP/run"
CODEX_SESSION="fake-codex"
CODEX_HOME="$TMP/home"
CODEX_RUNNER_MAX_RESENDS=3

_codex_tui_completed_turns() {
  sed -n '1p' "$attempts"
}

_codex_tui_state() {
  local sent
  sent="$(sed -n '1p' "$attempts")"
  case "$sent" in
    0) printf '{"completedTurns":0,"lastCompletion":null}\n' ;;
    1) printf '{"completedTurns":1,"lastCompletion":{"ok":false,"error":"stream disconnected before completion"}}\n' ;;
    *) printf '{"completedTurns":2,"lastCompletion":{"ok":true,"error":null}}\n' ;;
  esac
}

pane_alive() { return 0; }
pane_send_text() {
  local sent
  sent="$(sed -n '1p' "$attempts")"
  printf '%s\n' "$((sent + 1))" > "$attempts"
}
pane_capture() { printf 'captured\n' > "$2"; }
pane_capture_safe() { printf 'failed attempt\n' > "$2"; }
codex_capture_sessions() { return 0; }

codex_turn "$TMP/prompt.txt" 4 5

[[ "$(sed -n '1p' "$attempts")" == 2 ]]
[[ -f "$TMP/run/turn-4-attempt-1.failed.txt" ]]
grep -q 'failed attempt' "$TMP/run/turn-4-attempt-1.failed.txt"

echo 'PASS: Codex transport retries an errored task completion'
