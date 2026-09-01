#!/usr/bin/env bash
# Unit tests for wait_expired — the deadline that survives a machine sleep.
#
# The incident (2026-08-31 → 09-01): the M5 re-run hung for 22.5 HOURS against
# a 3600s cap. wait_for_turn counted its own `sleep 1` iterations, and a
# suspended process does not iterate, so after 22 hours of wall clock the
# counter read waited=2490s of 3600s. The cap could never fire. The pane said
# it plainly: "API Error: Your computer went to sleep mid-response." caffeinate
# -is defends idle sleep, not a closed lid.
#
# So the poll counter cannot be the only authority. Wall clock is.
# Run: bash tests/wall-clock-deadline.test.sh   (exits nonzero on any failure)
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/turn-budget.sh"
set +e

pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }
check(){ if [[ "$2" == "$3" ]]; then ok "$1"; else bad "$1 (want [$3] got [$2])"; fi; }

T=3600

echo "[test] the ordinary case: neither clock has run out"
check "fresh wait"            "$(wait_expired 10 10 $T)"     ""
check "most of the budget"    "$(wait_expired 3599 3599 $T)" ""

echo "[test] the ordinary timeout: both clocks agree the turn is over"
check "poll counter reaches the cap" "$(wait_expired 3600 3600 $T)" "poll"

echo "[test] the 2026-08-31 hang: wall clock blew past while the counter crawled"
check "22h wall, counter at 2490s" "$(wait_expired 2490 81000 $T)" "wall"
check "8h wall, counter mid-budget (the 2026-08-17 hole)" "$(wait_expired 1200 28800 $T)" "wall"

echo "[test] wall clock is the authority when both are spent"
check "both over -> reported as wall" "$(wait_expired 4000 90000 $T)" "wall"

echo "[test] a slow poll loop is not a sleep: small drift must not trip it"
check "drift of a few seconds under budget" "$(wait_expired 3500 3560 $T)" ""

echo
echo "pass=$pass fail=$fail"
[[ "$fail" -eq 0 ]]
