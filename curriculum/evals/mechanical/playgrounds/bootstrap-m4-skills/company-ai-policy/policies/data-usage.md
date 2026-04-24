# Data-usage policy — Kaleva Retail Group

## Rules

**R-DU-1 — Confidential data in memory.** The agent's `memory/` may cite
Confidential-class data only via reference (title + source pointer), not
by including the content inline. Exception: memory explicitly scoped to a
Confidential domain AND gitignored.

**R-DU-2 — Restricted data in LLM.** No Restricted-class data (cardholder,
health, M&A material, legal hold) may be sent through any LLM. No
exceptions without CISO sign-off.

**R-DU-3 — Source traceability.** Every memory-page claim must cite the
`sources/` file it came from. Claims without a `[sources/...]` citation
are policy-violating regardless of their truth.

**R-DU-4 — Agent outputs as internal-general.** Any file an agent writes
without explicit human review is classified internal-general by default.
May not leave the enterprise boundary (email out, public repo, customer-
facing system) without a human review step.

**R-DU-5 — Cross-challenge bleed.** An agent built for one challenge may
not be reused for another challenge without re-curating sources. The
memory from one challenge becomes context for another only through
explicit human re-curation.

**R-DU-6 — Personal notes in agent context.** An agent MAY read
personal-scratch notes (like `maija-prep-notes-*.md`) as context, but
MUST NOT reveal their content in outputs that might be shared. A hard
line in the agent file is required for any such personal source.
