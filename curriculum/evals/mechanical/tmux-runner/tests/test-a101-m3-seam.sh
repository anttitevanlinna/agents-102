#!/usr/bin/env bash
# Regression guard for the M3 synthesis seam. The M3 internet-retriever fetches a
# fresh practitioner postmortem (author Halvorsen) whose claim — a graduated cap
# fixes SMB churn (pricing-design problem) — contradicts the standing
# "structurally wrong for volatile SMB" reading (segment problem). The synthesizer
# (m3:6) must integrate it and name the contradiction; the three-minds Answer
# (m3:7) must adjudicate it. The whole seam rests on TWO invariants:
#
#   A. The sentinel 'Halvorsen' is UNIQUE to the new-m3 source — it appears
#      nowhere in the M2-ingested corpus (sources/{wiki,docs,web}). If it leaked
#      into the M2 corpus, the seam would pre-fire and m3:5/m3:6 would be invalid.
#   B. The net-retriever answer must NOT name the sentinel literally, so a
#      confabulating retriever cannot echo 'Halvorsen' without actually opening
#      the file (the m3:5 guard would then pass on confabulation).
#
# Plus the usual wiring checks: the source is staged, and the runner carries the
# absent-until-synthesis / present-after guards keyed on the sentinel.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root="$HERE/.."
kit="$root/fixtures/agents-101-synthetic"
m3src="$kit/sources-m3/usage-pricing-postmortems-2026.md"
netans="$kit/answers/m3-net-answer.txt"
scenario="$root/scenarios/a101-m3.txt"
runner="$root/run-a101.sh"
arrange="$root/arrange-agents-101.sh"
fail=0

# Source exists and carries the sentinel.
[[ -f "$m3src" ]] || { echo "FAIL: M3 seam source missing ($m3src)"; fail=1; }
grep -qiE 'halvorsen|graduated cap' "$m3src" || {
  echo "FAIL: M3 seam source missing sentinel (Halvorsen / graduated cap)"; fail=1; }

# Invariant A: sentinel is absent from the M2-ingested corpus.
if grep -rilE 'halvorsen|graduated cap' "$kit/sources" 2>/dev/null | grep -q .; then
  echo "FAIL: M3 sentinel leaked into the M2 corpus (sources/) — seam would pre-fire"; fail=1
fi

# Invariant B: the net answer redirects the retriever at the new source but does
# NOT name the sentinel literally (else confabulation passes the m3:5 guard).
grep -q 'new-m3\|<NEW_SOURCE_M3>' "$netans" || {
  echo "FAIL: net answer does not point the retriever at the new-m3 source"; fail=1; }
if grep -qiE 'halvorsen|graduated cap' "$netans"; then
  echo "FAIL: net answer names the sentinel literally — a confabulating retriever could echo it"; fail=1
fi

# Invariant C (regression guard, added after the first M3 run): the opposing
# churn-warning essay is NOT under <MATERIAL_DIR>/web/ in M3 — it was the M2
# held-back source, ingested at compound, so by M3 it lives only in the training
# dir's curated sources/usage-pricing-churn-warning.md. The net answer must point
# the retriever at that curated copy for the opposing arm, NOT send it hunting
# under /web/ (which produced a spurious "[NOT FOUND]" in the first run).
grep -q 'sources/usage-pricing-churn-warning' "$netans" || {
  echo "FAIL: net answer does not point at the curated churn-warning (sources/usage-pricing-churn-warning.md) — would misdirect the retriever to /web/ and spuriously flag NOT FOUND"; fail=1; }

# Wiring: arrange stages the seam into new-m3/; runner + scenario reference it.
grep -q 'new-m3' "$arrange" || { echo "FAIL: arrange does not stage new-m3/"; fail=1; }
grep -q 'NEW_SOURCE_M3' "$runner" || { echo "FAIL: runner missing NEW_SOURCE_M3 token"; fail=1; }
grep -q 'halvorsen' "$runner" || {
  echo "FAIL: run-a101.sh missing M3 seam guard (sentinel 'halvorsen')"; fail=1; }

[[ $fail -eq 0 ]] && echo "PASS: M3 seam sentinel unique to new-m3, not named in the prompt, staged + guarded"
exit $fail
