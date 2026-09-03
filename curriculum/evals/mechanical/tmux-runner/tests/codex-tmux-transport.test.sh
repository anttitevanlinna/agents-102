#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNNER="$(cd "$HERE/.." && pwd)"
TMP="$(mktemp -d)"
cleanup() {
  if declare -F codex_close >/dev/null; then codex_close 2>/dev/null || true; fi
  rm -rf "$TMP"
}
trap cleanup EXIT

mkdir -p "$TMP/operator" "$TMP/work" "$TMP/run"
printf '%s' '{"token":"synthetic"}' > "$TMP/operator/auth.json"
export CODEX_HOME="$TMP/operator"
export CODEX_AUTH_SOURCE="$TMP/operator/auth.json"
export CODEX_BIN="$RUNNER/fixtures/fake-codex-tui"
export FAKE_CODEX_TUI_LOG="$TMP/args.log"
export CODEX_RUNNER_WARMUP=1

source "$RUNNER/transports/codex-tmux.sh"

printf '%s' 'do the turn' > "$TMP/prompt.txt"
codex_open "$TMP/work" "$TMP/run"
adapter_home="$CODEX_HOME"
codex_turn "$TMP/prompt.txt" 1 10

grep -q -- '--no-alt-screen' "$FAKE_CODEX_TUI_LOG"
grep -q -- '--enable multi_agent_v2' "$FAKE_CODEX_TUI_LOG"
grep -q -- '--dangerously-bypass-approvals-and-sandbox' "$FAKE_CODEX_TUI_LOG"
grep -q 'response: do the turn' "$TMP/run/turn-1.transcript.txt"

codex_close
[[ ! -e "$adapter_home" ]]
[[ -f "$TMP/run/codex-sessions/2026/09/03/root.jsonl" ]]
[[ "$CODEX_HOME" == "$TMP/operator" ]]

echo 'PASS: Codex tmux transport drives the full TUI and retains native evidence'
