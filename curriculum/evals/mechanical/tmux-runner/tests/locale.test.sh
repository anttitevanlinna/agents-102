#!/usr/bin/env bash
# The runner must not depend on the caller's locale. Under LC_ALL=C (Codex's
# default shell) a bracket expression of multibyte status glyphs — `[·✢✳✶✻✽]`
# — matches ONE byte, the glyphs are three, so pane_busy never saw a spinner
# or a pending background agent and turns advanced early (8 failures in
# background-agent-wait.test.sh, 2026-09-26). Two guards: the glyph match
# is byte-safe, and sourcing lib/sync.sh leaves a UTF-8 locale behind for
# everything the runner launches.
#
# Run: bash tests/locale.test.sh   (exits nonzero on any failure)
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }

echo "[test] sourcing lib/sync.sh under LC_ALL=C pins a UTF-8 locale"
got="$(LC_ALL=C LANG=C bash -c "source '$HERE/../lib/tmux.sh'; source '$HERE/../lib/sync.sh'; locale charmap" 2>/dev/null)"
if [[ "$got" == "UTF-8" ]]; then ok "charmap is UTF-8"; else bad "charmap is [$got], want UTF-8"; fi

echo "[test] pane_busy is byte-safe even where the locale is not pinned"
r="$(LC_ALL=C bash -c "
  source '$HERE/../lib/tmux.sh'; source '$HERE/../lib/sync.sh'; export LC_ALL=C
  pane_busy '✳ Noodling… (running Stop hooks… 1/3)' && echo busy || echo idle
  pane_busy '✻ Waiting for 1 background agent to finish' && echo busy || echo idle
  pane_busy '✻ Cooked for 5s · done' && echo busy || echo idle
" 2>/dev/null | tr '\n' ' ')"
if [[ "$r" == "busy busy idle " ]]; then ok "spinner/pending/done read right under C"; else bad "got [$r], want [busy busy idle ]"; fi

echo "[test] background-agent-wait suite passes from a C-locale caller"
if LC_ALL=C LANG=C bash "$HERE/background-agent-wait.test.sh" >/dev/null 2>&1; then
  ok "suite green under LC_ALL=C"
else
  bad "suite fails under LC_ALL=C"
fi

echo
echo "[test] $pass passed, $fail failed"
[[ "$fail" -eq 0 ]]
