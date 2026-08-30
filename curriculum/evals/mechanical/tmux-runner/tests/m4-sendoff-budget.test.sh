#!/usr/bin/env bash
# Unit tests for turn_budget, the send-off timeout selector.
#
# Latent bug this guards (found 2026-08-30 while adding ae101-m5-done-done to
# the M4 scenario): run-m4.sh granted the multi-hour send-off budget to the
# LAST turn by position. That held only while the send-off happened to be last.
# The done-done opener runs in the M4 send-off SESSION, so it lands after the
# send-off — and under the positional rule the real send-off would silently
# drop to the standard timeout and start failing on long runs, while the
# one-question done-done turn got the two-hour budget it has no use for.
# The budget belongs to the KEY, not to a position.
# Run: bash tests/m4-sendoff-budget.test.sh   (exits nonzero on any failure)
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/turn-budget.sh"
set +e

pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
check(){ if [[ "$2" == "$3" ]]; then ok "$1"; else bad "$1 (want [$3] got [$2])"; fi; }

SENDOFF_KEY="ae101-m4-take-task-end-to-end"
STD=3600
LONG=7200

echo "[test] the send-off key gets the long budget wherever it sits"
check "send-off last (the old happy case)" \
  "$(turn_budget "$SENDOFF_KEY" "$SENDOFF_KEY" "$STD" "$LONG")" "$LONG"
check "send-off no longer last (done-done appended after it)" \
  "$(turn_budget "$SENDOFF_KEY" "$SENDOFF_KEY" "$STD" "$LONG")" "$LONG"

echo "[test] a turn appended after the send-off gets the standard budget"
check "ae101-m5-done-done does not inherit the send-off budget" \
  "$(turn_budget "ae101-m5-done-done" "$SENDOFF_KEY" "$STD" "$LONG")" "$STD"

echo "[test] ordinary turns are unaffected"
check "walk-and-send-off-1" \
  "$(turn_budget "walk-and-send-off-1" "$SENDOFF_KEY" "$STD" "$LONG")" "$STD"
check "ae101-m4-commit-starting-point" \
  "$(turn_budget "ae101-m4-commit-starting-point" "$SENDOFF_KEY" "$STD" "$LONG")" "$STD"

echo "[test] a literal turn (no key) is never the send-off"
check "literal line" "$(turn_budget "" "$SENDOFF_KEY" "$STD" "$LONG")" "$STD"

echo
echo "pass=$pass fail=$fail"
[[ "$fail" -eq 0 ]]
