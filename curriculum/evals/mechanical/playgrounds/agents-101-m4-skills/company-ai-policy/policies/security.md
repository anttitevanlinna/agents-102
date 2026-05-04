# Security policy — Kaleva Retail Group

## Rules

**R-SEC-1 — Secret handling.** No secrets in `memory/`, `sources/`, agent
files, or `CLAUDE.md`. If a source file contains a secret (even commented
out), the secret is treated as leaked.

**R-SEC-2 — Audit-traceable writes.** Any agent that writes to shared
team infrastructure (wikis, tracker, shared drives) must name itself as
the author in the output. Silent agent authorship violates.

**R-SEC-3 — Transitive trust.** An agent that invokes another agent
carries explicit scope — the second agent's permissions must be spelled
out in the first agent's file, not inherited implicitly.

**R-SEC-4 — Connector least-privilege.** An agent's connector access
list must match what the agent actually does. Unused connector scopes
violate (even if dormant).

**R-SEC-5 — Output destinations in rules file.** The root `CLAUDE.md`
or agent file must name where the agent writes. A write to an
un-documented path violates.
