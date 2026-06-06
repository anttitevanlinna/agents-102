#!/usr/bin/env bash
# Regression guard for H1: the M2 "held-back counter-case" source must stay out
# of curate+ingest and only enter at the compound turn — otherwise the planted
# contradiction is ingested early, the compound turn integrates a duplicate, and
# the synthesis seam (the whole reason for the held-back source) silently never
# fires while every assertion still passes. Caught 2026-06-06, first M2 run.
#
# Provenance scheme (finding C3, 2026-06-06): ingest is wiki/ (Confluence) +
# docs/ (OneDrive) + a LIVE a16z open-web crawl + a by-path local board-paper.
# Held back (UNNAMED in curate/scenario so they are not swept in): the counter-
# case staged at new/usage-pricing-churn-warning.md (sentinel 'survivorship',
# enters at the M2 compound turn) and the M3 seam at new-m3/ (sentinel
# 'Halvorsen'). An unreachable O365 email is named but marked NOT REACHABLE.
# NOTE: hold-back is enforced by OMISSION + an explicit "only these" clause, not
# by naming the held folder. The scenario may mention new/ in COMMENTS (it does,
# to document the design) — so the scenario is checked by positive scoping, and
# the comment-free curate answer carries the negative held-back exclusion.
#
# Static checks (fast; the live enforcement is the runtime guard in run-a101.sh):
#   1. The synthetic curate answer enumerates the named provenances, bounds
#      scope, and does NOT expose the held-back counter-case (web/ churn-warning
#      / 'survivorship') or any unnamed sibling.
#   2. The ingest scenario scopes to wiki/ + docs/ + the live a16z crawl and does
#      NOT ingest the held-back web/ counter-case folder.
#   3. run-a101.sh carries the absent-until-compound / present-after guards keyed
#      on the counter-case sentinel ('survivorship').
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root="$HERE/.."
curate="$root/fixtures/agents-101-synthetic/answers/m2-curation-where.txt"
scenario="$root/scenarios/a101-m2.txt"
runner="$root/run-a101.sh"
fail=0

# 1. curate answer must name the real provenances and must NOT expose the
#    held-back counter-case.
for prov in Confluence OneDrive a16z; do
  /usr/bin/grep -qi "$prov" "$curate" || { echo "FAIL: curate answer missing provenance '$prov'"; fail=1; }
done
if /usr/bin/grep -qiE 'survivorship|churn-warning|new/|new-m3' "$curate"; then
  echo "FAIL: curate answer exposes the held-back counter-case (new/ churn-warning / survivorship / new-m3 seam)"; fail=1
fi
# It must explicitly bound scope (not a bare 'everything under MATERIAL_DIR').
/usr/bin/grep -qiE 'only these|just these|do not ingest|nothing else' "$curate" || {
  echo "FAIL: curate answer does not bound ingest scope (needs an explicit 'only these')"; fail=1; }

# 2. ingest scenario must scope to wiki/ + docs/ + the live a16z crawl, and must
#    NOT ingest the held-back web/ counter-case folder.
/usr/bin/grep -qiE 'wiki/' "$scenario" && /usr/bin/grep -qiE 'docs/' "$scenario" && /usr/bin/grep -qiE 'a16z' "$scenario" || {
  echo "FAIL: ingest scenario does not scope to wiki/ + docs/ + live a16z crawl"; fail=1; }
# Held-back folders may appear in comments (documenting the design) but must NOT
# be named in an instruction (non-comment) line — that would sweep them in.
if /usr/bin/grep -vE '^[[:space:]]*#' "$scenario" | /usr/bin/grep -qE 'new/|new-m3'; then
  echo "FAIL: ingest scenario names a held-back folder (new/ or new-m3/) in an instruction line"; fail=1
fi

# 3. runner must carry the held-back guards (sentinel from churn-warning.md).
/usr/bin/grep -q 'survivorship' "$runner" || {
  echo "FAIL: run-a101.sh missing held-back-source guard (sentinel 'survivorship')"; fail=1; }

[[ $fail -eq 0 ]] && echo "PASS: held-back counter-case is scoped out of curate/ingest and guarded in the runner"
exit $fail
