# Legality needs an evidence package

## Engineering does not issue the verdict
<!--tier:1-->

An engineer can show what data enters, why the product asks for it, where it moves, who can access it, which controls exist, how long copies live, and how deletion propagates.

A named privacy or legal owner decides context-specific legal questions. Product and operations owners decide the intended purpose, acceptable automation, and operating boundary.

## Give the owner a decidable question
<!--tier:1-->

“Is this GDPR compliant?” hides every decision.

A useful packet names the purpose, people affected, data and inferences, action and significance, processors and transfers, retention, rights path, security controls, alternatives, residual risks, and missing facts.

Then it asks one bounded question and names who owns the answer.

## Human review is a designed control
<!--tier:1-->

A person in the loop is not automatically meaningful. Review needs enough information, time, authority, and a real way to change or stop the outcome.

Place review before the consequential action. Record what the reviewer saw, decided, and changed without turning the review queue into an uncontrolled copy of the source data.

## A launch state is provisional
<!--tier:2-->

`pilot`, `hold`, and `allow within boundary` describe an engineering recommendation under stated assumptions.

Each state needs a boundary, an owner for unresolved decisions, and evidence that would change it. That is more useful than a compliance badge and more honest than an architecture that waits for certainty before naming risk.

<!-- maintainer -->

**Time:** 7 minutes.

**Role:** M8 closer. Separates the evidence engineers own from decisions that require named privacy, legal, product, and operations owners.

**Mood:** accountable humility.

<!-- backing -->

Claims
- `engineering-prepares-evidence` · vision · "An engineer can show what data enters, why the product asks for it, where it moves" ← none-owed
- `legal-owner-decides` · vision · "A named privacy or legal owner decides context-specific legal questions." ← none-owed
- `dpia-is-decision-process` · detail · "A useful packet names the purpose, people affected, data and inferences, action and significance, processors and transfers, retention, rights path, security controls, alternatives, residual risks, and missing facts." ← edpb-dpia, edpb-design
- `meaningful-human-review` · detail · "Review needs enough information, time, authority, and a real way to change or stop the outcome." ← edpb-automated-decisions
- `launch-state-not-verdict` · vision · "describe an engineering recommendation under stated assumptions" ← none-owed

Sources
- edpb-dpia `[checked:2026-09-27 result:OK due:cohort]` https://www.edpb.europa.eu/topics/accountability-and-compliance-tools/data-protection-impact-assessment_en — [regulator guidance] DPIA purpose and decision context. fallback: call it a structured risk and owner-decision packet without naming the legal process.
- edpb-design `[checked:2026-09-27 result:OK due:cohort]` https://www.edpb.europa.eu/documents/guideline/guidelines-42019-on-article-25-data-protection-by-design-and-by-default_en — [regulator guidance] Data protection by design and default. fallback: retain the control-design questions without a compliance claim.
- edpb-automated-decisions `[checked:2026-09-27 result:OK due:cohort]` https://www.edpb.europa.eu/documents/guideline/automated-decision-making-and-profiling_en — [regulator guidance] Automated decision-making, profiling, safeguards, and human intervention. fallback: teach review as a control with information, time, authority, and outcome-changing ability.

Frameworks
- Evidence package · [borrow:privacy engineering] · law:none · ← edpb-dpia
- Provisional launch state · [borrow:none] · law:none · ← none

Stance `[stance:2026-09-27 level:L2]`
- holds: legal and privacy decisions improve when engineering provides a complete data-flow and control record with explicit unknowns.
- contested: which workloads require which formal assessment or legal basis is context-specific and outside the module's authority.
- would-move-it: regulator guidance that materially changes the facts, controls, or owner decisions expected for either simulated case.

OODA
- question: what evidence makes agent-system privacy and automated-decision questions decidable without engineers pretending to answer them?
- roster: European Data Protection Board, EU legislators, national data-protection authorities
- last-run: 2026-09-27

<!-- /backing -->
