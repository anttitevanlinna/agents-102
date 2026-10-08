#!/usr/bin/env bash
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNNER="$(cd "$HERE/.." && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

export COPILOT_BIN="$RUNNER/fixtures/fake-copilot"
export COPILOT_GITHUB_TOKEN=synthetic
export FAKE_COPILOT_LOG="$TMP/args.log"
export FAKE_COPILOT_SESSION_LOG="$TMP/sessions.log"
source "$RUNNER/transports/copilot-prompt.sh"

field() {
  node -e 'const v=require(process.argv[1]); process.stdout.write(String(v[process.argv[2]]));' "$1" "$2"
}

mkdir -p "$TMP/work" "$TMP/run"
copilot_open "$TMP/work" "$TMP/run"
[[ -s "$TMP/run/session-id.txt" ]]
[[ "$(stat -f '%Lp' "$TMP/run/copilot-home")" == 700 ]]

printf '%s' first > "$TMP/first.prompt"
copilot_turn "$TMP/first.prompt" 1 3
printf '%s' second > "$TMP/second.prompt"
copilot_turn "$TMP/second.prompt" 2 3
[[ "$(cat "$TMP/run/turn-1.transcript.txt")" == 'first response' ]]
[[ "$(cat "$TMP/run/turn-2.transcript.txt")" == 'second response' ]]
[[ "$(field "$TMP/run/turn-2.status.json" ok)" == true ]]
[[ "$(sort -u "$TMP/sessions.log" | wc -l | tr -d ' ')" == 1 ]]
grep -q -- '--no-ask-user' "$FAKE_COPILOT_LOG"
grep -q -- '--allow-all' "$FAKE_COPILOT_LOG"
grep -q -- '--disable-builtin-mcps' "$FAKE_COPILOT_LOG"
grep -q -- '--output-format text' "$FAKE_COPILOT_LOG"

export FAKE_COPILOT_CASE=exit-seven
printf '%s' fail > "$TMP/fail.prompt"
set +e
copilot_turn "$TMP/fail.prompt" 3 3
rc=$?
set -e
[[ $rc -ne 0 ]]
[[ "$(field "$TMP/run/turn-3.status.json" failureClass)" == process-exit-7 ]]

export FAKE_COPILOT_CASE=empty
printf '%s' empty > "$TMP/empty.prompt"
set +e
copilot_turn "$TMP/empty.prompt" 4 3
rc=$?
set -e
[[ $rc -ne 0 ]]

export FAKE_COPILOT_CASE=timeout
printf '%s' wait > "$TMP/timeout.prompt"
set +e
copilot_turn "$TMP/timeout.prompt" 5 1
rc=$?
set -e
[[ $rc -ne 0 ]]
[[ "$(field "$TMP/run/turn-5.status.json" failureClass)" == timeout ]]

copilot_close
echo 'PASS: GitHub Copilot prompt transport is isolated, resumable, and bounded'
