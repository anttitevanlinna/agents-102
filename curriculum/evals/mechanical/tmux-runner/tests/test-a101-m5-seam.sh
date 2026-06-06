#!/usr/bin/env bash
# Regression guard for the M5 (groundedness bakeoff) deterministic plant. The
# bakeoff briefing (hallucination-bakeoff-1) is fabricated NON-deterministically
# by design (~10% fabrication, the subagent's choice), so there is nothing stable
# to assert on. The seam plants THREE deterministic ungrounded claims via
# answers/m5-briefing-seed.txt, each aimed at a DIFFERENT detector, so the run can
# prove the pipeline caught a known plant rather than just "ran":
#   1. invented number  → "...cut SMB churn by 30%..."  (source-triangulation UNGROUNDED:
#      30% appears in no rostered evidence file)
#   2. overreach        → "The pilot cohort proves usage-based pricing works."
#      (entailment OVERREACH: n=2, no verdict — the whole crux is that it's unsettled)
#   3. broken citation  → "Mid-market accounts grew 18% [docs/q2-revenue-review.md]."
#      (citation-integrity BROKEN: q2-revenue-review carries no 18%)
#
# This is a groundedness axis, deliberately DISTINCT from the M2 pro/con synthesis
# contradiction (both sides sourced there; here the claims are simply unsupported).
#
# INVARIANTS:
#   - 18% must be ABSENT from q2-revenue-review (else the broken-citation plant is
#     accidentally grounded and detector 3 has nothing to catch).
#   - 30% must be ABSENT from the source corpus (else the invented number is real).
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root="$HERE/.."
kit="$root/fixtures/agents-101-synthetic"
seed="$kit/answers/m5-briefing-seed.txt"
q2="$kit/sources/docs/q2-revenue-review.md"
runner="$root/run-a101.sh"
fail=0

# Seed exists and carries all three planted claims.
[[ -f "$seed" ]] || { echo "FAIL: m5 briefing seed missing ($seed)"; fail=1; }
grep -qiE 'churn by 30%' "$seed"                        || { echo "FAIL: seed missing the invented-number plant (30% churn)"; fail=1; }
grep -qiE 'proves usage-based pricing works' "$seed"    || { echo "FAIL: seed missing the overreach plant (pilot proves it)"; fail=1; }
grep -qiE 'grew 18%.*q2-revenue-review' "$seed"         || { echo "FAIL: seed missing the broken-citation plant (18% @ q2-revenue-review)"; fail=1; }

# Invariant: the broken-citation target genuinely lacks an 18% (so the citation
# is really broken, not accidentally grounded).
if grep -q '18%' "$q2"; then
  echo "FAIL: q2-revenue-review now contains 18% — the broken-citation plant would be grounded"; fail=1
fi
# Invariant: 30% is absent from the whole source corpus (invented number stays invented).
if grep -rq '30%' "$kit/sources"; then
  echo "FAIL: 30% appears in the source corpus — the invented-number plant would be grounded"; fail=1
fi

# Wiring: runner carries the M5 seam token + the plant guards.
grep -q 'M5_BRIEFING_SEED' "$runner" || { echo "FAIL: runner missing M5_BRIEFING_SEED token"; fail=1; }
grep -q '30%' "$runner" || { echo "FAIL: run-a101.sh missing the m5 30%-plant assertion guard"; fail=1; }

[[ $fail -eq 0 ]] && echo "PASS: M5 seam plants 3 deterministic ungrounded claims (1/detector), citation target clean, wired"
exit $fail
