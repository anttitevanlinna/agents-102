#!/usr/bin/env bash
# Unit tests for should_auto_resend — the predicate that decides whether
# wait_for_turn should auto-fire a paste-buffer recovery on a persistent
# API-stall. Codifies the manual recipe verified twice in production
# (codesearch M6 T9 first-run, M5 PB-T4 re-run, both 2026-06-01).
#
# Predicate signature: should_auto_resend $stall_match_count $threshold \
#   $resends_done $max_resends $waited_now $last_resend_at $cooldown_s \
#   $prompt_file
#
# Returns 0 ("yes resend") iff:
#   - stall_match_count >= threshold      (stall is persistent)
#   - prompt_file is set AND exists       (something to paste)
#   - resends_done < max_resends          (budget remains)
#   - waited_now - last_resend_at >= cooldown_s   (not hammering)
#
# Run: bash tests/auto-resend.test.sh
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$HERE/../lib/sync.sh"

pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }

# A real prompt file we can point at (mimics out/$run_id/<phase>/turn-N.prompt.txt)
PROMPT="$(mktemp)"
echo "imaginary prompt body" > "$PROMPT"
trap 'rm -f "$PROMPT"' EXIT

echo "[test] all conditions met → resend"
if should_auto_resend 2 2 0 3 60 -1000000 90 "$PROMPT"; then
  ok "match>=threshold, prompt exists, budget open, cooldown elapsed → 0"
else
  bad "should authorize resend"
fi

echo "[test] match below threshold → no resend"
if should_auto_resend 1 2 0 3 60 -1000000 90 "$PROMPT"; then
  bad "match<threshold should NOT resend"
else
  ok "match=1 (threshold=2) → 1"
fi

echo "[test] missing prompt path → no resend"
if should_auto_resend 2 2 0 3 60 -1000000 90 ""; then
  bad "empty prompt_file should NOT resend"
else
  ok "no prompt_file → 1"
fi

echo "[test] nonexistent prompt file → no resend"
if should_auto_resend 2 2 0 3 60 -1000000 90 "/tmp/does-not-exist-$$-resend"; then
  bad "missing file should NOT resend"
else
  ok "prompt_file absent on disk → 1"
fi

echo "[test] resend budget spent → no resend"
if should_auto_resend 2 2 3 3 600 510 90 "$PROMPT"; then
  bad "resends==max should NOT resend"
else
  ok "resends=3 of max=3 → 1"
fi

echo "[test] still within cooldown → no resend"
# Last resend was at t=100, now at t=150, cooldown 90 → 50<90, not yet.
if should_auto_resend 2 2 1 3 150 100 90 "$PROMPT"; then
  bad "within cooldown should NOT resend"
else
  ok "elapsed=50s, cooldown=90s → 1"
fi

echo "[test] cooldown exactly elapsed → resend"
# Elapsed=90, cooldown=90 → ">=" so should fire.
if should_auto_resend 2 2 1 3 190 100 90 "$PROMPT"; then
  ok "elapsed==cooldown → 0 (boundary inclusive)"
else
  bad "elapsed equal to cooldown should resend"
fi

echo "[test] match well above threshold still gated by budget"
if should_auto_resend 99 2 3 3 9999 -1 90 "$PROMPT"; then
  bad "large match count should not bypass budget cap"
else
  ok "budget cap dominates → 1"
fi

echo ""
echo "passed: $pass  failed: $fail"
exit $(( fail > 0 ? 1 : 0 ))
