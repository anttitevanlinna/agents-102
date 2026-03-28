---
type: finding
domain: cross-domain
evidence_level: 4
platforms: [multiple]
practitioners: [Goldman Sachs, Pilot, Basis, Accrual, Spotify, Zendesk, Salesforce, Harvey]
nordic: true
updated: 2026-03-28
answers:
  - "which domains will agents cross the chasm in next?"
  - "why do CS, coding, and finance work?"
  - "what structural pattern predicts agentic success?"
  - "is there a Level 4 meta-pattern?"
  - "where should CTOs invest first?"
---

# Rules, Verification, Scarcity — The L4 Meta-Pattern

**Evidence level:** Level 4 (cross-domain meta-pattern candidate) | **Last updated:** 2026-03-28

**Thesis:** Three domains have reached Level 3 convergence — customer service, coding, and finance/accounting. The structural pattern across all three predicts which domains follow.

## The Three Converged Domains

### 1. Customer Service — 3+ platforms, 40-80% resolution
Zendesk/SeatGeek (51.5%), Salesforce/Finnair (80%), Intercom Fin (66% avg across 6K customers), Sierra/SoFi (61%), Hertz/Decagon (70%+). Independent platforms, independent companies, same resolution range. This is convergence.

### 2. Coding — 12+ independent signals, compound engineering
Spotify (1,500+ PRs/month), Karpathy (80% agent, 20% human), Dan Shipper (1 dev = 5 devs), Lovable ($300M ARR, 8M users). December 2025 phase shift confirmed by multiple practitioners. Global: 85% of developers use AI tools, 62% use coding agents.

### 3. Finance/Accounting — 8+ independent companies
Goldman Sachs, HPE, HighRadius (90% touchless), KPMG (50 agents, ISO 42001), Lifetime Products/D365 (60% cycle time cut), Basware, Deloitte Zora, JPMorgan. Counter-evidence exists (86% hallucination encounters, 40% rework) but the mature pattern is "autonomous with human oversight for material decisions."

## The Structural Pattern (L4 Candidate)

All three converged domains share three structural ingredients:

| Ingredient | Customer Service | Coding | Finance |
|-----------|-----------------|--------|---------|
| **(a) Rules are codified** | Support playbooks, escalation protocols, policy manuals | Test suites, linting rules, type systems, CI/CD policies | GAAP, IFRS, tax code, reconciliation rules |
| **(b) Correctness is verifiable** | Resolved tickets, CSAT scores, containment rates | Tests pass/fail, compilers accept/reject, code runs | Numbers balance, audits pass, ledgers reconcile |
| **(c) Talent supply is constrained** | CS agent churn, seasonal demand spikes | Developer shortage (global) | CPA shortage, accountant pipeline declining |

This is a **Level 4 meta-pattern candidate** — the same structural ingredients explain convergence across three independent domains.

## The Predictive Power

If the pattern holds, it predicts the **next domains to cross**:

| Domain | Rules Codified? | Verifiable? | Talent Constrained? | Prediction |
|--------|----------------|-------------|---------------------|------------|
| **Legal/compliance** | Yes (statutes, regulations, case law) | Partially (compliance = binary, litigation = subjective) | Yes (lawyer shortage, BigLaw burnout) | **Next to cross** — Harvey $11B, Legora $5.55B already approaching convergence |
| **HR/recruitment** | Partially (policies exist but judgment-heavy) | Weakly (bias, cultural fit are subjective) | Moderately (recruiter churn) | **Second wave** — EU AI Act high-risk classification slows adoption |
| **Operations/SCM** | Mixed (procurement rules codified, operational decisions less so) | Partially (delivery times, costs verifiable; strategy isn't) | Moderately (logistics, procurement specialists) | **Already converging** in narrow sub-domains (procurement negotiation, route optimization) |
| **Sales/marketing** | Weakly (playbooks exist but success is subjective) | Weakly (pipeline metrics delayed, attribution fuzzy) | Moderately (SDR churn) | **Slow crossing** — 85% AI SDR failure rate shows structural mismatch |
| **Product/strategy** | No (judgment-intensive, context-dependent) | No (success takes months/years) | Not really | **Last to cross** — least mature, pre-chasm |

## The CTO Implication

Don't ask "when will agents work in my domain?" Ask: **"Are our processes rules-based, verifiable, and talent-constrained?"**

If yes across all three → convergence is already happening. Invest now.
If two of three → second wave. Prepare infrastructure.
If one or zero → third wave. Learn from other domains first.

## Counter-Evidence

- **Finance convergence comes with 86% hallucination rate and 40% rework tax.** The pattern is "autonomous with oversight," not "autonomous without limits."
- **Legal is approaching convergence but trust barriers are higher** — legal decisions create liability. Harvey and Legora both use human-in-the-loop checkpoints.
- **Coding convergence is strongest but METR study shows experienced developers on familiar codebases may be slower with AI.** Context matters more than tools.
- **The three ingredients may not be sufficient.** Customer service also benefits from bounded scope (2-3 steps) and escalation tolerance. Longer processes with the same ingredients may still fail on compound reliability.

## Connection to Other Patterns

- **Hybrid beats autonomous** applies within each domain — even converged domains use human oversight for material decisions
- **Governance as prerequisite** is what makes rules-based domains deployable — the rules pre-exist as governance infrastructure
- **Promotion path gap** explains why verifiable domains cross first — personal agents prove value quickly when verification is instant
