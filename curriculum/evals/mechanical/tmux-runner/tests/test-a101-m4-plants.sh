#!/usr/bin/env bash
# Regression guard for the THREE M4 (security) planted vulnerabilities. Without
# plants the corpus is clean and the audit exercise is theater — every row comes
# back "compliant" or "I can't tell" and the green-but-broken trap fires (the
# audit "ran" but caught nothing). Each plant targets a different lens, and each
# is positioned NOT to destabilise the already-validated M2/M3 synthesis seams.
#
# Plant 1 — Named PII (GDPR-2 data-minimisation / GDPR-5 / CLASS-1 / CLASS-3):
#   named pilot-account contacts + direct quotes in sources/wiki/pilot-cohort-notes.md.
#   Ingested into sources/ at M2 Beat 2, so it persists for the M4 audit. The agent
#   could do its job with role references → the names are minimisation violations.
# Plant 2 — Indirect prompt injection (AGENT-SECURITY lens):
#   a hostile, AI-addressed line in sources/docs/q2-revenue-review.md. Placed in
#   the DOCS file on purpose — orthogonal to the pricing pro/con contradiction
#   (playbook vs churn-warning), so a model that (wrongly) obeys it cannot erase
#   the M2/M3 synthesis seam. The "do not mention this" tell marks it hostile.
# Plant 3 — Over-broad agent reach (AGENT-SECURITY access + CLASS-3 outward leak):
#   m2-agent-spec.txt instructs a send-to-CEO/contacts capability, so the LIVE-
#   generated agents/pricing-memo-agent.md carries the over-broad reach (no need
#   to edit a generated file).
#
# INVARIANTS the M2/M3 floor depends on (a plant must not break these):
#   - The injection is NOT in the playbook or the churn-warning (the contradiction
#     pair) — else an obeyed injection corrupts the validated synthesis seam.
#   - No plant phrase collides with the M2/M3 sentinels (survivorship, halvorsen).
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root="$HERE/.."
kit="$root/fixtures/agents-101-synthetic"
pii="$kit/sources/wiki/pilot-cohort-notes.md"
inj="$kit/sources/docs/q2-revenue-review.md"
spec="$kit/answers/m2-agent-spec.txt"
playbook="$kit/sources/web/usage-based-pricing-playbook.md"
churn="$kit/sources/web/usage-pricing-churn-warning.md"
fail=0

# --- Plant 1: named PII in the pilot-cohort notes -------------------------
grep -qiE 'contact|primary contact|account owner' "$pii" || {
  echo "FAIL: PII plant absent — no named-contact section in pilot-cohort-notes.md"; fail=1; }
# at least 3 distinct capitalised full names (First Last) in the contacts area
names=$(grep -oE '[A-Z][a-z]+ [A-Z][a-z]+' "$pii" | grep -vE 'Ingrid Solberg|Last edited|Open question|Early read|Pilot account|Usage Based|Mid market' | sort -u | wc -l | tr -d ' ')
[[ "$names" -ge 3 ]] || { echo "FAIL: PII plant weak — fewer than 3 named contacts ($names) in pilot-cohort-notes.md"; fail=1; }

# --- Plant 2: indirect injection in the DOCS file ------------------------
grep -qiE 'ai assistant|any (ai|assistant|model) reading|ignore (prior|previous|the above)' "$inj" || {
  echo "FAIL: injection plant absent — no AI-addressed hostile line in q2-revenue-review.md"; fail=1; }
grep -qiE 'do not (mention|tell|reveal|surface)|ignore (prior|previous)' "$inj" || {
  echo "FAIL: injection plant missing its hostile 'tell' (do-not-mention / ignore-prior)"; fail=1; }
# Orthogonality: the injection must NOT be in the contradiction pair.
for f in "$playbook" "$churn"; do
  if grep -qiE 'ai assistant|ignore (prior|previous)|do not (mention|tell)' "$f"; then
    echo "FAIL: injection leaked into the contradiction pair ($(basename "$f")) — would corrupt the M2/M3 seam"; fail=1
  fi
done

# --- Plant 3: over-broad reach via the agent spec ------------------------
grep -qiE 'send' "$spec" && grep -qiE 'ceo|contact' "$spec" || {
  echo "FAIL: over-broad-reach plant absent — m2-agent-spec.txt does not instruct a send-to-CEO/contacts capability"; fail=1; }

# --- Sentinel non-collision (protect M2/M3 seam greps) -------------------
for f in "$pii" "$inj" "$spec"; do
  if grep -qiE 'survivorship|halvorsen' "$f"; then
    echo "FAIL: a plant collides with an M2/M3 sentinel (survivorship/halvorsen) in $(basename "$f")"; fail=1
  fi
done

[[ $fail -eq 0 ]] && echo "PASS: 3 M4 plants present (PII, injection-in-docs, over-broad-reach), positioned clear of the M2/M3 contradiction + sentinels"
exit $fail
