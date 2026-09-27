# The model call is not the data flow

## Follow every copy
<!--tier:1-->

A support ticket enters once and can reappear in an ingestion store, prompt context, tool argument, draft, internal note, trace, review queue, backup, and analytics record.

Draw a new row whenever location, access, recipient, purpose, retention clock, or deletion path changes. “Sent to the model” is one row, not the map.

## Inferences are part of the system
<!--tier:1-->

A recommendation system turns clicks, purchases, session history, and location into scores and preferences. The derived data can affect what a person sees even though they never typed it.

Map each inference through creation, use, feedback, review, retention, and deletion. Continuous learning is a mechanism, not a purpose.

## Purpose changes authority
<!--tier:1-->

Classifying a ticket, drafting a reply, sending it, adding a CRM note, and learning from the exchange are different actions. Ranking products, adapting the ranking, and reusing the same profile for marketing are different actions too.

One platform can host them only if its authorization and data controls preserve those differences.

## Minimize the observation layer too
<!--tier:1-->

Observability does not sit outside the data boundary. Store raw payload only when the reconstruction need defeats a safer reference, classification, mask, or bounded excerpt.

The useful question is not “can we log it?” It is “what is the least data that still proves what happened?”

<!-- maintainer -->

**Time:** 7 minutes.

**Role:** M8 opener. Gives the mapping unit before students meet the ticket and recommendation cases.

**Mood:** investigative restraint.

<!-- backing -->

Claims
- `copy-is-unit` · vision · "Draw a new row whenever location, access, recipient, purpose, retention clock, or deletion path changes." ← none-owed
- `derived-data-matters` · detail · "The derived data can affect what a person sees even though they never typed it." ← gdpr-profiling
- `continuous-learning-not-purpose` · vision · "Continuous learning is a mechanism, not a purpose." ← none-owed
- `minimize-observability` · detail · "Observability does not sit outside the data boundary." ← gdpr-principles, langfuse-masking

Sources
- gdpr-profiling `[checked:2026-09-27 result:OK due:none]` https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679 — [primary law] GDPR definitions and provisions concerning profiling and personal data. fallback: describe derived preferences as system data and leave the legal classification to counsel.
- gdpr-principles `[checked:2026-09-27 result:OK due:none]` https://www.edpb.europa.eu/topics/key-gdpr-concepts/basic-principles_en — [regulator guidance] Purpose limitation, data minimization, storage limitation, integrity, and accountability principles. fallback: teach the engineering minimization questions without a legal conclusion.
- langfuse-masking `[checked:2026-09-27 result:OK due:cohort]` https://langfuse.com/docs/observability/features/masking — [vendor primary documentation] Masking of trace inputs, outputs, and metadata. fallback: teach trace-field exclusion and masking without product detail.

Frameworks
- Every copy · [borrow:privacy engineering] · law:none · ← gdpr-principles
- Purpose changes authority · [borrow:none] · law:none · ← none

Stance `[stance:2026-09-27 level:L2]`
- holds: agent data reviews must include derived data, tool payloads, traces, review systems, backups, and deletion paths.
- contested: the minimum data needed for useful incident reconstruction and model-quality learning is workload-specific.
- would-move-it: evidence that a named copy is technically impossible, or that a lower-data design cannot meet a documented safety or reconstruction need.

OODA
- question: which hidden copies and derived fields most often escape agent-system data inventories?
- roster: European Data Protection Board, EU legislators, Langfuse documentation, privacy-engineering practitioners
- last-run: 2026-09-27

<!-- /backing -->
