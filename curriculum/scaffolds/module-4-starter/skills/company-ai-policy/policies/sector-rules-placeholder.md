# Sector rules — placeholder

This file is a **placeholder** in the Nordic-baseline version of the `company-ai-policy` skill. In-company deliveries replace this file with actual sector rules from the buying organisation, co-created as a separate deliverable outside this repository.

The baseline version does NOT enforce sector rules as audit checks. It lists common Nordic regulated-sector rule sets below as **context** — the auditor mentions them in the report's summary section as known rules that would apply if the system were deployed in that sector, but doesn't score the agent system against them.

## Common Nordic regulated-sector rule sets

### Financial services

- **MIFID II** — investor protection, best execution, record-keeping for investment advice and transactions.
- **DORA** (Digital Operational Resilience Act) — operational resilience for financial entities, including ICT risk management, incident reporting, third-party ICT risk.
- **PSD2** — payment services, strong customer authentication, open banking APIs.
- **MNB / FIN-FSA / Finansinspektionen** (Finnish / Swedish financial supervisory authorities) — national-level rules on top of EU.
- **AML / KYC** — anti-money-laundering and know-your-customer checks, personal data handling with specific retention rules.

### Healthcare

- **MDR** (Medical Device Regulation) — any AI system influencing clinical decisions may qualify as a medical device.
- **EHR rules** — national rules on electronic health records (Kanta in Finland, Sundhed.dk in Denmark, etc.).
- **Special-category personal data** — GDPR Art. 9, with sector-specific national implementations.

### Public sector

- **National data residency rules** — most Nordic countries require certain categories of public-sector data to be processed within country borders.
- **Accessibility rules** — WCAG compliance for public-facing systems.
- **Freedom of information** — public records may include agent-produced content; transparency rules apply.

### Telecommunications

- **NIS2** — network and information security; applies to sector-designated entities.
- **ePrivacy** — communications confidentiality, metadata handling.

### Energy / critical infrastructure

- **NIS2** — extended scope includes energy, water, transport.
- **National cyber-security laws** — sector-specific incident reporting requirements.

### Legal sector

- **Legal privilege** — client communications subject to privilege; AI handling must preserve it.
- **National bar rules** — on AI use in legal work, including disclosure to clients.

## For the audit

In the baseline version, include a one-paragraph note in the report's summary section:

> *Note: this audit uses the Nordic-baseline AI-use policy. For regulated sectors (financial services, healthcare, public, telco, energy, legal), sector-specific rules would add further checks — [list the most likely ones for the user's sector based on the system content]. Those rules are not scored in this baseline audit. In-company deliveries replace this placeholder with the customer's actual sector rule set.*

Don't invent sector-specific verdicts. If the user's system contains obviously sector-adjacent material (trading data, health records, public-sector documents), flag the relevant rule set as applicable without scoring against it.
