# Retail sector rules — Kaleva Retail Group

## Rules

**R-SR-1 — GDPR: customer data off-limits to agents.** Customer-level
PII (email, phone, order history linked to a person) may not appear in
agent memory, sources, or outputs. Aggregate, anonymised data is fine.

**R-SR-2 — PCI-DSS scope.** Cardholder data is Restricted. No agent
touches the PCI systems. Attempting to read from a PCI-adjacent system
is a policy violation even if nothing is returned.

**R-SR-3 — Supplier contract confidentiality.** Active supplier contract
text is Confidential. May appear in memory only as summarised terms
(price bands, contract length, renewal windows), never verbatim.

**R-SR-4 — Store-ops field data.** Store-level operational data
(inventory, waste, labour hours) is internal-general. Fine for agent use.
Store-level data linked to named store managers becomes Confidential
when joined with personnel.

**R-SR-5 — Recommended AI-free domains.** HR actions (hiring decisions,
performance reviews, disciplinary matters) are excluded from agent
autonomy. Agents may research or summarise but never draft HR actions
without human authorship. Aligns with NIS2 human-oversight patterns.
