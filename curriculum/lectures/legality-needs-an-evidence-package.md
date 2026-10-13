# Legality needs an evidence package

## Engineering does not issue the verdict
<!--tier:1-->

An engineer can show what data enters, why the product asks for it, where it moves, who can access it, which controls exist, how long copies live, and how deletion propagates.

A named privacy or legal owner decides context-specific legal questions. Product and operations owners decide the intended purpose, acceptable automation, and operating boundary.

## Give the owner a decidable question
<!--tier:1-->

“Is this GDPR compliant?” folds a dozen decisions into one yes or no.

A useful packet names the purpose and the lawful-basis question, people affected, data and inferences, action and significance, processors and transfers, retention, rights path, security controls, necessity and less-intrusive alternatives, residual risks, and missing facts. Other EU rules can apply alongside GDPR, such as tracking consent, recommender transparency, and telling people they are talking to an AI.

The same packet carries a data protection impact assessment (DPIA) screen. A DPIA is the formal risk assessment GDPR requires before processing that is likely to be high risk, and the owner decides whether one is due. The packet then asks one bounded question and names who owns the answer.

## Human review is a designed control
<!--tier:1-->

A person in the loop is not automatically meaningful. Review needs enough information, time, authority, and a real way to change or stop the outcome.

Place review before the consequential action. Record what the reviewer saw, decided, and changed without turning the review queue into an uncontrolled copy of the source data.

## A launch state is provisional
<!--tier:1-->

`pilot`, `hold`, and `allow within boundary` describe an engineering recommendation under stated assumptions.

Each state needs a boundary, an owner for unresolved decisions, and evidence that would change it. A state that touches real personal data takes effect only after the named owner has decided the open lawful-basis and DPIA questions. Until then, `pilot` means synthetic data or data already approved for this purpose.

<!-- maintainer -->

**Review status:** static review only (2026-10-13 PR review), real audit pending. No judge run has scored this file.

**Time:** 5 minutes.

**Role:** M8 mid-module vocabulary beat, placed after the opener and before the exercise. Teaches the decision packet, the DPIA screen, designed human review, and the launch-state gate that the map and compare prompts already ask Claude to apply. The meta-frame closer is `the-transition-carries-its-data`.

**Mood:** accountable humility.

<!-- backing -->

Claims
- `engineering-prepares-evidence` · vision · "An engineer can show what data enters, why the product asks for it, where it moves" ← none-owed
- `legal-owner-decides` · vision · "A named privacy or legal owner decides context-specific legal questions." ← none-owed
- `dpia-is-decision-process` · detail · "A useful packet names the purpose and the lawful-basis question, people affected, data and inferences" ← edpb-dpia, edpb-design, gdpr-prior-assessment
- `non-gdpr-rules` · detail · "Other EU rules can apply alongside GDPR, such as tracking consent, recommender transparency, and telling people they are talking to an AI." ← eprivacy-terminal, dsa-recommenders, ai-act-transparency
- `dpia-before-processing` · detail · "A DPIA is the formal risk assessment GDPR requires before processing that is likely to be high risk" ← gdpr-prior-assessment, edpb-dpia
- `meaningful-human-review` · detail · "Review needs enough information, time, authority, and a real way to change or stop the outcome." ← edpb-automated-decisions, cjeu-schufa
- `launch-state-not-verdict` · vision · "describe an engineering recommendation under stated assumptions" ← none-owed
- `launch-state-gate` · detail · "A state that touches real personal data takes effect only after the named owner has decided the open lawful-basis and DPIA questions." ← gdpr-prior-assessment

Sources
- edpb-dpia `[checked:2026-09-27 result:OK due:cohort]` https://www.edpb.europa.eu/topics/accountability-and-compliance-tools/data-protection-impact-assessment_en — [regulator guidance] DPIA purpose and decision context. fallback: call it a structured risk and owner-decision packet without naming the legal process.
- edpb-design `[checked:2026-09-27 result:OK due:cohort]` https://www.edpb.europa.eu/documents/guideline/guidelines-42019-on-article-25-data-protection-by-design-and-by-default_en — [regulator guidance] Data protection by design and default. fallback: retain the control-design questions without a compliance claim.
- edpb-automated-decisions `[checked:2026-09-27 result:OK due:cohort]` https://www.edpb.europa.eu/documents/guideline/automated-decision-making-and-profiling_en — [regulator guidance] WP29 2017/2018 guidance, endorsed by the EDPB: automated decision-making, profiling, safeguards, and human intervention. fallback: teach review as a control with information, time, authority, and outcome-changing ability.
- gdpr-prior-assessment `[checked:2026-10-13 result:OK due:cohort]` https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679 — [primary law] GDPR Art 6 (a lawful basis must exist for processing) and Art 35(1) (the controller carries out the DPIA "prior to the processing" where processing is likely to result in a high risk). Digital Omnibus proposal (Nov 2025) would amend the DPIA lists; re-check at each cohort. fallback: say the owner decides lawful basis and assessment before real data is used, without citing articles.
- cjeu-schufa `[checked:2026-10-13 result:OK due:cohort]` https://curia.europa.eu/juris/liste.jsf?num=C-634/21 — [primary law] CJEU C-634/21 OQ v Land Hessen (SCHUFA), judgment 7 Dec 2023: an automated probability value is an Art 22(1) automated individual decision where a third party "draws strongly" on it to establish, implement or terminate a contract. Widens Art 22 to scores with a determining role, which bears on the recommender's ranking scores. Curia URL redirects to InfoCuria; operative text verified on EUR-Lex CELEX 62021CJ0634. fallback: treat a score that determines an outcome as a decision the legal owner must classify.
- eprivacy-terminal `[checked:2026-10-13 result:OK due:cohort]` https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02002L0058-20091219 — [primary law] ePrivacy Directive 2002/58/EC Art 5(3): storing or accessing information on a user's terminal equipment needs consent after clear information, which governs click and session tracking that feeds the recommender. Digital Omnibus proposal COM(2025) 837 (19 Nov 2025) would move cookie and tracker rules into GDPR as a new Art 88a; re-check at each cohort. fallback: list tracking consent as an owner question without naming the directive.
- dsa-recommenders `[checked:2026-10-13 result:CAVEAT due:cohort]` https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R2065 — [primary law] DSA Art 27(1): online platforms using recommender systems set out the main parameters and any user options to modify them in their terms; Art 38: very large platforms add at least one option not based on profiling. CAVEAT: the EUR-Lex fetch truncated before the articles; wording verified against the OJ L 277 reproduction at springlex.eu. Re-open on EUR-Lex. fallback: list recommender transparency and a non-personalised option as owner questions without article numbers.
- ai-act-transparency `[checked:2026-10-13 result:CAVEAT due:cohort]` https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689 — [primary law] AI Act Art 50(1): providers design AI systems that interact directly with people so those people are told they are interacting with an AI system, unless obvious. CAVEAT: EUR-Lex fetch truncated before the articles; wording checked on artificialintelligenceact.eu. Application date deliberately not stated in body or prompts: Art 113 general date not verified on the official text, and the Digital Omnibus moved other AI Act dates. fallback: list AI disclosure for customer-visible replies as an owner question without a date.

Frameworks
- Evidence package · [borrow:privacy engineering] · law:none · ← edpb-dpia
- Provisional launch state · [borrow:none] · law:none · ← none

Stance `[stance:2026-10-13 level:L2]`
- holds: legal and privacy decisions improve when engineering provides a complete data-flow and control record with explicit unknowns, and no state that touches real personal data runs before the owner decides.
- contested: which workloads require which formal assessment or legal basis is context-specific and outside the module's authority.
- would-move-it: regulator guidance, CJEU case law, or an adopted GDPR amendment (Digital Omnibus) that materially changes the facts, controls, or owner decisions expected for either simulated case.

OODA
- question: what evidence makes agent-system privacy and automated-decision questions decidable without engineers pretending to answer them?
- roster: European Data Protection Board, EU legislators, national data-protection authorities, CJEU, European Commission DSA and AI Act services
- last-run: 2026-09-27

<!-- /backing -->
