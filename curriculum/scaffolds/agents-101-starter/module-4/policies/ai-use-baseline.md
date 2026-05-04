# AI-use — Nordic baseline policy

A conservative default AI-use policy for organisations that haven't yet published their own. Nordic organisations typically converge on these rules within 6–18 months of serious AI adoption; this file encodes the endpoint.

**Important:** if the buying organisation has published its own AI-use policy, this baseline is replaced by customer-specific policy reference material. The student runs those files raw, then packages the useful checks into their own reusable security expertise during Module 4.

## Rules to check

### AI-1 — Approved use cases

**Rule:** AI / agent systems should be used for clearly-defined purposes — support work, research, drafting, analysis. Novel uses should be approved before deployment, not discovered in production.

**Audit check:** Look at what the agent system does today (the prompts in `agents/`, the module outputs, the memory). Is the purpose clear and bounded? Or has the agent drifted into uses beyond what the user originally scoped?

**Common violation pattern:** An agent started as a "research helper" but over modules has been used for drafting customer-facing content, making hiring judgments, or producing content the user hasn't reviewed carefully. Scope creep.

### AI-2 — Human-in-the-loop for consequential decisions

**Rule:** AI systems must not make consequential decisions autonomously. Consequential = affects a named person's employment, compensation, customer relationship, legal standing, credit, or significant commercial outcome. Humans review and approve before the action.

**Audit check:** Does the agent produce output that gets acted on without human review? If the agent drafts customer emails that get sent automatically, performance reviews that get filed, pricing proposals that go to customers — that's autonomous consequential action without a gate.

**Common violation pattern:** A scheduled agent that produces output and the user then copies-and-pastes without reading. Technical HITL ("you could have reviewed") without practical HITL ("you actually did"). Flag as violating if the workflow doesn't force a review.

### AI-3 — Output review for external-facing content

**Rule:** Any AI-generated content that will be sent to customers, prospects, regulators, the public, or other external audiences must be reviewed by a human before it leaves. The review is not a formality — the reviewer must be accountable for the content as if they had written it.

**Audit check:** Does the agent produce external-facing drafts? Where do those drafts go? Is there evidence of a review step before they leave? Often "I can't tell" unless the workflow is visible in the files.

**Common violation pattern:** An agent produces marketing copy, proposal language, or customer communications; the user pastes it into an outbound channel without reading beyond the first paragraph. Rubber-stamp review.

### AI-4 — Prohibited uses

**Rule:** The following uses are prohibited until an explicit, documented approval (in most Nordic organisations):
- **Automated decisions about individuals** — hiring, firing, promotion, credit, criminal justice, employment terms, access to services.
- **Surveillance / behavioural profiling** — analysing employee productivity, customer-service agent performance, or customer behaviour without explicit disclosure and consent.
- **Generation of content intended to deceive** — synthetic content presented as human-created in contexts where that matters (journalism, testimony, reference letters).
- **Processing of special-category personal data** without specific legal basis (health, religion, political views, sexual orientation, trade union membership, genetic/biometric data).
- **Weapons, surveillance tech, or uses that violate human rights** — hard line.

**Audit check:** Is the agent system doing any of these? Mostly the answer is "no" for training-context systems, but the check is worth running — especially on automated decisions about individuals (performance reviews, candidate screening, customer-complaint handling) and behavioural profiling (team-productivity analysis, customer-behaviour prediction).

**Common violation pattern:** An agent helping with performance-review drafting where the agent is making first-pass judgments about named individuals based on review material. This crosses into "automated decisions about individuals" territory even if a human signs off.

### AI-5 — Transparency

**Rule:** When AI output is provided to a human audience, they should be able to know it was AI-generated (or substantially AI-assisted) if they reasonably need to. This doesn't mean every email needs a watermark — it means organisations shouldn't actively hide AI use from the people affected.

**Audit check:** Does the agent produce output that's passed off as human-written when the audience would want to know? Is there any convention in the files about disclosing AI involvement?

**Common violation pattern:** An agent drafts customer-service responses that go out under a human agent's name, with no indication of AI involvement — and no documented policy saying that's OK. Usually "I can't tell" from files alone; flag as a question for the user.

### AI-6 — Data governance for AI inputs

**Rule:** Data fed to AI systems inherits the organisation's data governance rules — classification, retention, lawful basis, purpose limitation. If the data couldn't be put into a shared wiki, it can't be put into an agent's memory or sources.

**Audit check:** Does the agent read data that wouldn't pass a shared-wiki test? A personal email, a contract with an NDA, a customer conversation marked privileged, a regulator communication — all inherit their governance requirements.

**Common violation pattern:** Sources folder mixing content the user would share internally with content that's tightly restricted, with no separation.

### AI-7 — Logging and auditability

**Rule:** AI systems used for work affecting the business should produce enough trace to reconstruct what happened. Not full logs of every token — but enough that someone asking "what did the agent do in March?" can get an answer.

**Audit check:** Is there any audit trail in the system? Module outputs with timestamps? Prompts that recorded which sources were read? A log file?

**Common violation pattern:** No trail at all. Agent outputs exist but no record of what generated them. "I can't tell" is usually the verdict; note what evidence would be needed.

## How to score

- Compliant: evidence clearly shows the rule is honoured (approved scope, visible HITL, review before external, logged trail).
- Violating: evidence clearly shows the rule is broken (scope creep into external drafts without review, autonomous consequential action, processing prohibited categories).
- "I can't tell": common for AI-3, AI-5, AI-7 — governance rules depend on workflow context that files alone don't capture.

## Note for the auditor

This baseline is conservative by design. Customer-specific policies are often less restrictive on some rules and more restrictive on others — sector-specific rules (financial services, healthcare, public sector) usually add more constraints. When delivering in-company, this file is replaced with the customer's actual policy.
