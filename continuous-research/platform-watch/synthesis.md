# Agent Platform Watch — Cross-Platform Synthesis

Last updated: 2026-03-21 (cycle 8)
Total OODA cycles: 4 (initial developer-focused sweep) + 4 business agent cycles

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

## The Enterprise Integration Reality Test

A real enterprise agent must pass three tests that no platform currently addresses:

### 1. Multi-Tool (10-15+ systems simultaneously)
A real business environment looks like this:
**Salesforce, Snowflake, Redshift, Slack, Office 365, SharePoint, Jira, Confluence, Canva, Braze, Hightouch, ...**

An agent that can only talk to one or two systems is a toy. A sales meeting prep agent needs CRM (Salesforce) + data warehouse (Snowflake) + communication history (Slack) + documents (SharePoint/Confluence) + campaign data (Braze). That's 5 systems for ONE task.

| Platform | Native connectors | Cross-system orchestration | Verdict |
|----------|------------------|---------------------------|---------|
| **Microsoft** | 1,400+ connectors (Copilot Studio) | Power Automate (separate product, developer skill) | Broadest connector count but orchestration requires developers |
| **Google** | ~10 integrations (Workspace Studio) | Apps Script + Vertex AI (developer) | Far behind on integrations |
| **OpenAI** | Google/Microsoft write actions + Jira via Rovo MCP. 8+ new MCP connectors (March 2026). Still limited vs M365 1,400+ | None — single-player architecture | Evolving from read-only to write-capable. Still cannot orchestrate across 5+ systems. |
| **Anthropic/MCP** | 6,400+ MCP servers | Developer setup required | Richest ecosystem but zero business-user accessibility |

**The gap:** Connectors exist but orchestration across systems doesn't. Connecting to Salesforce AND Snowflake AND Slack in one agentic workflow requires custom development on every platform.

### 2. Multi-Turn (persistent memory, learning across sessions)
A business agent that forgets everything between sessions is a chatbot. A real agent:
- Remembers what it learned about a customer across meetings
- Builds knowledge over time (which proposals worked, which objections arose)
- Improves its outputs based on user corrections

| Platform | Session memory | Cross-session learning | Verdict |
|----------|---------------|----------------------|---------|
| **Microsoft** | Copilot has conversation memory | No persistent learning across sessions | Forgets between conversations. Crashes after 15-20 interactions. |
| **Google** | Workspace Studio: no state between runs | NotebookLM retains sources but not learning | No learning capability |
| **OpenAI** | Custom GPT instructions persist | Memory feature exists but no structured learning | Closest to persistent memory but no real learning loop |
| **Anthropic** | Claude Projects retain context | No cross-session learning | Context window, not memory |

**The gap:** No platform has agent memory that compounds over time. Every interaction starts from near-zero. This is the most fundamental missing capability for business agents.

### 3. Multi-Turn Learning (the agent gets better at YOUR job)
Beyond memory — the agent should learn patterns:
- "When Antti prepares for a CTO meeting, he always wants competitive positioning, not just product features"
- "This team's proposals that include ROI data close 2x more often"
- "The Finnish compliance team needs EU-specific citations, not US ones"

**No platform offers this.** This is the gap between current "agents" and what enterprises actually need. It's also the hardest technical problem — requiring persistent state, user-specific fine-tuning or retrieval, and feedback loops.

### 4. Enterprise Security (RBAC, access controls, audit trails)
An agent connecting to Salesforce + Snowflake + Slack must respect:
- **Role-based access control (RBAC):** The agent sees only what the USER is authorized to see. A sales rep's agent cannot access finance data. A regional manager's agent sees their region, not all regions.
- **Agent identity:** The agent acts AS the user, with the user's permissions — not as a superuser. Who is the agent when it writes to Jira?
- **Credential management:** How does the agent authenticate to 10 systems? OAuth per system? Delegated credentials? Stored secrets?
- **Audit trails:** Every action the agent takes must be traceable — who asked, what was accessed, what was changed, when.
- **Data residency:** When the agent pulls data from Snowflake and sends it to Slack, where does that data transit? Is PII exposed in the LLM context?
- **Skill-based permissions:** Different agent capabilities (read vs write vs delete) per system, per role, per task.

| Platform | Agent identity | RBAC | Credential mgmt | Audit | Verdict |
|----------|---------------|------|-----------------|-------|---------|
| **Microsoft** | Entra Agent ID (Foundry) | Entra-based for M365 | Azure Key Vault | Azure audit logs | Best infrastructure — but only for Microsoft ecosystem. Cross-system RBAC (SF + Snowflake) requires custom. |
| **Google** | Workspace identity | Workspace roles | Secret Manager | Cloud Audit Logs | Within Google ecosystem only. No cross-system RBAC. |
| **OpenAI** | None — agents have no identity | Enterprise SSO only | No credential management | No agent-level audit | **Biggest gap.** No concept of agent identity or RBAC. |
| **Anthropic/MCP** | None built-in | None built-in | Per-MCP-server | None built-in | MCP servers handle auth individually. No unified RBAC layer. |

**The gap:** Every platform handles security within its own ecosystem. None handles security ACROSS systems. When your agent connects to Salesforce AND Snowflake AND Jira, who governs what it can see in each? This is custom development on every platform today.

**Skills as a security concept:** Agents need skill-based permissions — "this agent CAN read Salesforce contacts but CANNOT modify pipeline data" or "this agent CAN draft Jira tickets but CANNOT close them." No platform offers granular skill-level permissions. It's all-or-nothing access per connector.

### What This Means for Platform Selection

The honest assessment: **no platform passes the enterprise integration reality test.** The question isn't "which platform is best" — it's "which platform gets closest, and how much custom development bridges the gap?"

For an environment with SF + Snowflake + Redshift + Slack + O365 + SharePoint + Jira + Confluence + Canva + Braze + Hightouch:
- **Microsoft** gets you O365 + SharePoint + Slack natively, and maybe Jira/Confluence via connectors. Everything else requires Power Automate or custom dev.
- **MCP ecosystem** (via Claude/Anthropic) has servers for most of these, but requires developer setup and has no business-user surface.
- **Custom build** (Agent SDK + MCP + custom state management) is likely the only path that actually works. Which means: you need engineering capability first, then the agent capability follows.

This is why the training journey matters: Bootstrap builds understanding, then platform advisory helps navigate this reality.

## Cross-Platform Patterns

**Pattern 1: No enterprise chasm-crossing signal — anywhere.** Zero named enterprises report production business agent deployments with measurable outcomes on any platform. **OpenAI's own COO confirmed this Feb 24, 2026:** "We have not yet really seen enterprise AI penetrate enterprise business process" ([TechCrunch](https://techcrunch.com/2026/02/24/openai-coo-says-we-have-not-yet-really-seen-ai-penetrate-enterprise-business-processes/)). MIT's GenAI Divide study: 95% of organizations report no measurable ROI from AI, only 5% of custom AI solutions reached production with sustained value ([Legal.io/MIT](https://www.legal.io/articles/5719519/MIT-Report-Finds-95-of-AI-Pilots-Fail-to-Deliver-ROI-Exposing-GenAI-Divide)).

**Pattern 2: The promotion path doesn't exist.** Every platform has personal, team, and enterprise tiers — but they're different products. Promoting an agent from personal to team to company means rebuilding, not upgrading.

**Pattern 3: Reliability is the bottleneck, not capability.** Microsoft: unreliable grounding. Google: model stability. OpenAI: usage limits. Anthropic: token efficiency. No platform is reliable enough for business-critical workflows.

**Pattern 4: MCP as cross-platform plumbing.** 6,400+ tool integrations, adopted by all four. Reduces lock-in. But requires developers to set up — not accessible to business users yet.

**Pattern 5: Framework > Platform for developers, but business users need Platform.** Developers prefer code-first frameworks (ADK, Agents SDK). Business users need visual builders with governance. These are different markets with different winners.

**Pattern 6: The real competition is M365 vs Workspace, not model vs model.** For business agents, the question isn't "which LLM is best" — it's "where do my employees already work?" That's Microsoft or Google for most enterprises.

## CTO Answer: Which Platform For What? (March 2026)

| Business Use Case | Best Platform Today | Why | Caveat |
|-------------------|-------------------|-----|--------|
| Sales meeting prep | ChatGPT / Claude | Best at research + synthesis from unstructured data. ChatGPT now has FactSet/MSCI/Moody's integrations for financial data. | Personal only. ChatGPT connectors improving but still no Salesforce write-back. |
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

1. **Enterprise integration reality** — who is actually connecting 5+ business systems in one agentic workflow? Look for practitioners, not vendor demos.
2. **Agent memory / learning** — any platform or framework offering persistent cross-session learning? This is the key missing capability.
3. **MCP in enterprise** — is anyone deploying MCP servers at scale to connect business systems for non-developer users?
4. **The custom-build path** — are enterprises building their own agent orchestration (SDK + MCP + custom state)? What does it take?
5. **The promotion path** — has anyone written about personal→team→company agent lifecycle?
6. **Vertical SaaS agents** — Zendesk, ServiceNow, HubSpot may be ahead of horizontal platforms for specific domains.

## Run Log

| Run | Time | Focus | Key Finding |
|-----|------|-------|-------------|
| 0 | 2026-03-21 | OpenAI (dev focus) | Codex 85-90% on routine coding. No enterprise evidence. |
| 1 | 2026-03-21 | Microsoft (dev focus) | Foundry GA. Broadest surface but unreliable. No enterprise evidence. |
| 2 | 2026-03-21 | Google (dev focus) | ADK strong framework. Model stability problems. No enterprise evidence. |
| 3 | 2026-03-21 | Anthropic (dev focus) | Best reasoning. MCP strategic moat. Token cost problems. No enterprise evidence. |
| 8 | 2026-03-21 | OpenAI (business) | Connectors evolve from read-only to write-capable. Enterprise controls improving. Still zero named deployments. |
