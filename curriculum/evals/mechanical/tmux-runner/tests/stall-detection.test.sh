#!/usr/bin/env bash
# Unit tests for stall_pattern_in_recent_window — the helper that fixes the
# 2026-06-01 codesearch M6 T9 false-WARN-storm: API socket dropped, runner
# logged stalled-TUI WARN correctly, operator manually re-fired via
# paste-buffer, agent recovered and produced output, BUT the original API
# Error text was still in scrollback so the grep kept matching it and WARN
# kept firing every 5 min through the rest of the turn (matches=26 by the
# time the assertion fired).
#
# Run: bash tests/stall-detection.test.sh   (exits nonzero on any failure)
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/sync.sh"

pass=0 fail=0
ok()   { pass=$((pass+1)); echo "  ok   - $1"; }
bad()  { fail=$((fail+1)); echo "  FAIL - $1" >&2; }

PATTERN='API Error|socket closed unexpectedly|Connection.*refused|rate.?limit'

echo "[test] live API Error near pane bottom → recent (would WARN)"
snap=$'⎿ tool result\n⎿ tool result\nAPI Error: socket closed unexpectedly\n> '
if stall_pattern_in_recent_window "$snap" "$PATTERN" 20; then
  ok "error within last 20 lines → recent"
else
  bad "should detect live error at bottom"
fi

echo "[test] old API Error scrolled past recent window → not recent (no WARN)"
{
  echo "API Error: socket closed unexpectedly"
  for i in $(seq 1 30); do echo "later output line $i"; done
  echo "> "
} > /tmp/_stall_snap_$$.txt
snap="$(cat /tmp/_stall_snap_$$.txt)"
if stall_pattern_in_recent_window "$snap" "$PATTERN" 20; then
  bad "old error >20 lines deep should NOT count as recent"
else
  ok "old error scrolled past → not recent"
fi
rm -f /tmp/_stall_snap_$$.txt

echo "[test] no pattern present → not recent"
snap=$'normal output\nmore output\nstill working\n> '
if stall_pattern_in_recent_window "$snap" "$PATTERN" 20; then
  bad "no pattern should not register as recent"
else
  ok "no pattern → no stall"
fi

echo "[test] empty snap → not recent"
if stall_pattern_in_recent_window "" "$PATTERN" 20; then
  bad "empty snap should not register"
else
  ok "empty snap → no stall"
fi

echo "[test] error exactly at recent_window boundary"
# Error at line 1, then exactly 20 lines below it. below = total - match_lineno
# = 21 - 1 = 20. Boundary check uses '<', so 20 is NOT recent.
{
  echo "API Error: socket closed unexpectedly"
  for i in $(seq 1 20); do echo "line $i"; done
} > /tmp/_stall_boundary_$$.txt
snap="$(cat /tmp/_stall_boundary_$$.txt)"
if stall_pattern_in_recent_window "$snap" "$PATTERN" 20; then
  bad "exactly 20 lines below should NOT count (strict '<')"
else
  ok "boundary: 20 lines below = not recent"
fi
rm -f /tmp/_stall_boundary_$$.txt

echo ""
echo "passed: $pass  failed: $fail"
exit $(( fail > 0 ? 1 : 0 ))
