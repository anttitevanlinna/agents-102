# Agent Platform Watch — Cross-Platform Synthesis

Last updated: 2026-03-21
Total OODA cycles: 4 (initial developer-focused sweep) + business agent research starting

## Purpose

Answer the CTO question: **Which platform can do which use cases for business users? Who is leading? Why?**

Not coding agents. Business agents — sales, finance, HR, compliance, operations, customer service. People who use SharePoint, not Git.

## The Framework: Personal → Team → Company Agents

| Level | What it means | Governance | Data access | Who builds it |
|-------|--------------|------------|-------------|---------------|
| **Personal** | Works for me, knows my context | None — I own it | Only what I can access | The user themselves |
| **Team** | Works for us, knows our processes | Who maintains? Who's accountable? | Team-level shared data | Power user or developer |
| **Company** | Works across boundaries, knows the org | Full — audit, access control, change mgmt | Cross-department, enterprise governance | IT/developers + business owners |

**The natural lifecycle:**
```
Personal agent works → "my team should have this" → Team agent → "this should be standard" → Company agent
```

**The gap nobody has filled:** No platform has designed the promotion path. You can't take a personal ChatGPT workflow and turn it into a governed team agent. You can't promote a Copilot Studio prototype into a Foundry-hosted production agent. Every transition means rebuilding.

## Platform Comparison: Business Agent Capabilities (March 2026)

Per-platform details in each platform's `state.md`. This is the cross-platform view.

### Where Business Users Actually Enter

| Platform | Personal agent | Team agent | Company agent | Promotion path |
|----------|---------------|------------|---------------|----------------|
| **Microsoft** | Copilot in M365 | Copilot Studio | Azure Foundry | Three different products, no designed path |
| **Google** | Gemini in Workspace | Gemini Enterprise ($25/user) | Vertex Agent Builder | Disconnected layers |
| **OpenAI** | ChatGPT + Custom GPTs | ChatGPT Team/Enterprise | Agents SDK + Responses API | GPT → enterprise = rebuild |
| **Anthropic** | Claude Projects | Claude Team/Enterprise | Agent SDK + Enterprise plug-ins | No team agent layer at all |

### Who Leads for Business Users? (Honest Assessment)

**Microsoft is the only serious contender for business agents today.** Not because their technology is best — it isn't. Because business users already live in M365. Copilot is embedded where they work. Copilot Studio lets power users build without developers. The distribution advantage is overwhelming.

**Google is second** — Workspace penetration is real, Gemini Enterprise ($25/user) is GA. But model stability issues undermine trust.

**OpenAI has the widest consumer reach** (ChatGPT) but weakest enterprise/team tooling for business users. Custom GPTs are the closest to "business person builds an agent" but governance is primitive.

**Anthropic is developer-first.** Strongest reasoning but no business user surface. Copilot Cowork (Claude inside M365) is the interesting play — Claude's brain, Microsoft's body.

## Cross-Platform Patterns

**Pattern 1: No enterprise chasm-crossing signal — anywhere.** Zero named enterprises report production business agent deployments with measurable outcomes on any platform.

**Pattern 2: The promotion path doesn't exist.** Every platform has personal, team, and enterprise tiers — but they're different products. Promoting an agent from personal to team to company means rebuilding, not upgrading.

**Pattern 3: Reliability is the bottleneck, not capability.** Microsoft: unreliable grounding. Google: model stability. OpenAI: usage limits. Anthropic: token efficiency. No platform is reliable enough for business-critical workflows.

**Pattern 4: MCP as cross-platform plumbing.** 6,400+ tool integrations, adopted by all four. Reduces lock-in. But requires developers to set up — not accessible to business users yet.

**Pattern 5: Framework > Platform for developers, but business users need Platform.** Developers prefer code-first frameworks (ADK, Agents SDK). Business users need visual builders with governance. These are different markets with different winners.

**Pattern 6: The real competition is M365 vs Workspace, not model vs model.** For business agents, the question isn't "which LLM is best" — it's "where do my employees already work?" That's Microsoft or Google for most enterprises.

## CTO Answer: Which Platform For What? (March 2026)

| Business Use Case | Best Platform Today | Why | Caveat |
|-------------------|-------------------|-----|--------|
| Sales meeting prep | ChatGPT / Claude | Best at research + synthesis from unstructured data | Personal only, no CRM integration without developer |
| Team sales playbook agent | Copilot Studio | M365 + CRM connectors, shareable | No evidence of real deployments |
| Finance reconciliation | Azure Foundry | Durable orchestration, audit trails | Requires developer, unreliable grounding reported |
| HR onboarding workflow | Copilot Studio | M365 integration (SharePoint, Teams, Outlook) | No evidence of agentic HR workflows |
| Compliance monitoring | **No clear leader** | None has proven cross-system monitoring | Entirely pre-chasm |
| Customer service agent | **See vertical SaaS** | Zendesk, Intercom, Freshdesk agents may be ahead of the big four | Different research track needed |

**The honest answer:** For business agents, nobody is ahead. Microsoft has the best distribution but unproven technology. The "which platform" question is premature — the "what agent" question comes first. Build capability with personal agents (cheap, low risk), discover what creates team value, then worry about platforms.

## What We Did Not Find

- **Business user building an agent without developer help** — on any platform. The zero-code promise is unfulfilled.
- **Personal→team agent promotion** — on any platform. The lifecycle doesn't exist as a designed feature.
- **Named enterprise with business agents in production** — on any platform. The entire space is pre-chasm.
- **Nordic companies using business agents** — zero findings.
- **Vertical SaaS agent capabilities** (Zendesk, ServiceNow, HubSpot, SAP) — not yet researched. May be ahead of the horizontal platforms for specific use cases.

## Research Priorities (Next Cycles)

1. **Microsoft Copilot Studio for business users** — what can non-developers actually build? Real experiences, not demos.
2. **Google Gemini Enterprise** — what does $25/user/mo buy for business teams?
3. **ChatGPT in enterprise** — are business teams building Custom GPTs for real work?
4. **The promotion path** — has anyone written about personal→team→company agent lifecycle?

## Run Log

| Run | Time | Focus | Key Finding |
|-----|------|-------|-------------|
| 0 | 2026-03-21 | OpenAI (dev focus) | Codex 85-90% on routine coding. No enterprise evidence. |
| 1 | 2026-03-21 | Microsoft (dev focus) | Foundry GA. Broadest surface but unreliable. No enterprise evidence. |
| 2 | 2026-03-21 | Google (dev focus) | ADK strong framework. Model stability problems. No enterprise evidence. |
| 3 | 2026-03-21 | Anthropic (dev focus) | Best reasoning. MCP strategic moat. Token cost problems. No enterprise evidence. |
