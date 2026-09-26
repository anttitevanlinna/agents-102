#!/usr/bin/env bash
# turn_landed — the non-blocking busy-aware check for runners that poll
# sentinels themselves instead of calling wait_for_turn. run-m3.sh's phase-B
# race loop drives two sessions and so cannot block on one; it tested
# `-f turn-N.done` directly, which skipped the busy-pane hold entirely — while
# threat-model-with-stride-1 tells the agent to run stride in a subagent.
# A landed turn = sentinel present AND pane idle; surplus Stops trimmed.
#
# Run: bash tests/turn-landed.test.sh   (exits nonzero on any failure)
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/tmux.sh"
source "$HERE/../lib/sync.sh"

pass=0 fail=0
ok()   { pass=$((pass+1)); echo "  ok   - $1"; }
bad()  { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
check(){ if [[ "$2" == "$3" ]]; then ok "$1"; else bad "$1 (want [$3] got [$2])"; fi; }
rc_of(){ "$@" >/dev/null 2>&1; echo $?; }

if ! command -v tmux >/dev/null 2>&1; then
  echo "[test] (skipping — tmux not on PATH)"; exit 0
fi
export RUNNER_TMUX_SOCKET="landed-$$"
d="$(mktemp -d)"

idle="land-idle-$$"; busy="land-busy-$$"
pane_start "$idle" "/tmp" "bash -c 'printf \"✻ Cooked for 5s · done\\n\"; sleep 600'"
pane_start "$busy" "/tmp" "bash -c 'printf \"✻ Waiting for 1 background agent to finish\\n\"; sleep 600'"
sleep 1

echo "[test] turn_landed"
mkdir "$d/a"
check "no sentinel -> not landed" "$(rc_of turn_landed "$d/a" 1 "$idle")" "1"
touch "$d/a/turn-1.done"
check "sentinel + busy pane -> not landed" "$(rc_of turn_landed "$d/a" 1 "$busy")" "1"
check "sentinel + idle pane -> landed" "$(rc_of turn_landed "$d/a" 1 "$idle")" "0"
touch "$d/a/turn-2.done"                       # follow-up Stop from a re-invocation
check "landed with surplus -> still landed" "$(rc_of turn_landed "$d/a" 1 "$idle")" "0"
check "surplus trimmed to seq" "$(count_sentinels "$d/a")" "1"

pane_kill "$idle"; pane_kill "$busy"
tmux -L "$RUNNER_TMUX_SOCKET" kill-server 2>/dev/null || true
rm -rf "$d"

echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]
