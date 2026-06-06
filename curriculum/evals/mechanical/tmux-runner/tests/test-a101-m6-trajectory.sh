#!/usr/bin/env bash
# Guard for the m6 eval-loop trajectory classifier (eval_trajectory_verdict).
#
# THE BUG this captures (found in the first M6 run, b svnqfa5p): the original
# m6:2 inference was "round-1 flagged 0 ⟹ theater". That is FALSE. M5 crowns the
# single winning detector; when it's source-triangulation (fabrication-only, with
# a documented "can't see overreach" limit) and M6's generator works from the
# already-grounded corpus, round-1 countable flags are legitimately 0 while the
# real improvement lands in the uncounted overreach dimension. A loop that rewrote
# its prompt every round is the OPPOSITE of theater. Theater is a loop that did no
# work — round-1 zero AND no prompt evolution, or a flat count WITH flags to fix.
#
# The classifier is pure (counts + real-work flag in, verdict out) so it's unit-
# testable here AND exercised against the real on-disk M6 run at the bottom.
set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root="$HERE/.."
source "$root/lib/assertions.sh"
set +e  # assertions.sh may enable -e; our checks intentionally call a helper that returns 1
fail=0
check() { # <desc> <expected-verdict-prefix> <expected-exit> <args...>
  local desc="$1" exp="$2" exprc="$3"; shift 3
  local out rc
  out="$(eval_trajectory_verdict "$@")"; rc=$?
  if [[ "$out" == "$exp"* && "$rc" -eq "$exprc" ]]; then
    echo "ok   — $desc ($out, rc=$rc)"
  else
    echo "FAIL — $desc: got '$out' rc=$rc, wanted '$exp'* rc=$exprc"; fail=1
  fi
}

# Classic improvement: flags fell. Not theater.
check "classic improve 7->2"        IMPROVED        0  7 2 1
# Flat WITH flags still to fix = theater (loop didn't move a movable metric).
check "flat-with-flags 5->5"        THEATER         1  5 5 1
# THE bug case: round-1 zero BUT real work done = legit floor, not theater.
check "floor + real work 0->0"      FLOOR-UNCOUNTED 0  0 0 1
# True theater: round-1 zero AND no work.
check "zero + no work 0->0"         THEATER         1  0 0 0
# Worse trajectory with flags = theater.
check "worse 3->5"                  THEATER         1  3 5 1
# Unparseable counts → defer, don't hard-fail.
check "unparsed"                    UNPARSED        0  x y 1

# Integration: the REAL on-disk M6 run must classify as FLOOR-UNCOUNTED (the false
# FAIL the original logic produced), not THEATER.
notes="$HOME/Documents/agents-101-runner/module-6/eval-notes.md"
runs="$HOME/Documents/agents-101-runner/module-6/runs"
if [[ -f "$notes" && -d "$runs" ]]; then
  r1=$(grep -i 'flag' "$runs/round-1/judgment.md" 2>/dev/null | grep -oE '[0-9]+' | head -1)
  last_dir=$(ls -d "$runs"/round-*/ 2>/dev/null | sort -V | tail -1)
  ln=$(grep -i 'flag' "$last_dir/judgment.md" 2>/dev/null | grep -oE '[0-9]+' | head -1)
  work=0; grep -qiE 'after round|trajector|overreach|failure class|sharpen|prompt change' "$notes" && work=1
  out="$(eval_trajectory_verdict "$r1" "$ln" "$work")"; rc=$?
  if [[ "$out" == FLOOR-UNCOUNTED* || "$out" == IMPROVED* ]]; then
    echo "ok   — real M6 run classifies as '$out' (not a false THEATER fail)"
  else
    echo "FAIL — real M6 run classified '$out' rc=$rc (r1=$r1 last=$ln work=$work) — expected FLOOR-UNCOUNTED/IMPROVED"; fail=1
  fi
else
  echo "skip — no on-disk M6 run to integration-check (ok in CI)"
fi

[[ $fail -eq 0 ]] && echo "PASS: eval_trajectory_verdict distinguishes theater from a narrow-judge floor"
exit $fail
