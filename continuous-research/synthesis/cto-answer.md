---
type: synthesis
domain: cross-domain
updated: 2026-03-28
answers: ["which platform", "what to do", "CTO advice", "platform recommendation", "the bottom line"]
---

# CTO Answer: Which Platform For What? (March 2026)

## The Bottom Line

**Nobody should be making non-two-way-door decisions on the agent landscape right now.** The entire business agent space is pre-chasm -- OpenAI's own COO confirmed it. Every platform is immature. Every vendor story is 12-18 months ahead of reality. Betting small while making progress is what a smart CTO does.

**The hardest problem isn't choosing a platform -- it's knowing what questions to ask.** A CTO facing 4 horizontal platforms, 5+ vertical SaaS vendors, open-source frameworks, and 200 internal processes can't even formulate the right question without agent competence. Every evaluation is shaped by whichever vendor presented last.

**The sequence that works: Competence -> discovery -> context -> platform.**
- Build competence (people who can build agents)
- Discovery happens organically (people find their own high-value processes)
- Three infrastructure enablers emerge predictably (data access, runtime, discoverability)
- Platform questions become lightweight, reversible, two-way-door decisions

**Field evidence (F-Secure, March 2026):** After 2 modules of agent training, pretty much everyone started building unprompted. They then hit three walls: (1) data access, (2) where do apps run, (3) how do others find and use what was built. These are the real questions -- scoped, practical, answerable.

## Platform Recommendations by Use Case

| Business Use Case | Best Platform Today | Why | Caveat |
|-------------------|-------------------|-----|--------|
| Sales meeting prep (personal) | Claude Cowork / ChatGPT | Best reasoning (Claude) or broadest integrations (ChatGPT) | Personal only. Neither connects to CRM without dev work. |
| Team sales playbook agent | Copilot Studio | M365 + CRM connectors, shareable in Teams | PVA heritage, ceiling at Q&A bots. Zero production evidence. |
| Finance reconciliation | Foundry (Workflow Agents) | Durable orchestration, Cosmos DB state, audit trails | Workflow Agents are Preview. Unreliable grounding. Requires developer. |
| HR onboarding workflow | Copilot Studio + Power Automate | M365 integration (SharePoint, Teams, Outlook) | Power Automate = rigid trigger-action. No conversational exception handling. |
| Compliance monitoring | **No clear leader** | None has proven cross-system monitoring | Entirely pre-chasm. |
| Legacy system integration | GPT-5.4 / Claude Computer Use | Both work with ANY software -- no API needed | "Impressive but unreliable." Hybrid architectures outperform vanilla. |
| Multi-system orchestration (5+ tools) | **Custom build** (Agent SDK + MCP) | Only path connecting SF + Snowflake + Slack + Jira + SharePoint | Requires engineering team. Watch Antspace BYOC. |
| Enterprise agent governance | Agent 365 / AgentCore / Frontier | Agent 365: shadow detection. AgentCore: Cedar-based policy. Frontier: multi-vendor. | All untested externally. Agent 365 GA May 1. |
| Agent reliability at scale | **No platform solves this** | 85% per step x 10 steps = ~20% success | Design for short chains (2-3 steps), not 20-step autonomy. |
| Customer service | Zendesk or Salesforce Agentforce | Zendesk: 51% auto-resolution. Salesforce: 80% at Finnair. | Level 3 convergence. Bounded to CS domain. |
| IT operations | ServiceNow | $600M+ ACV, strongest IT ops context | Most orgs at Phase 2 despite Phase 3 aspirations. |
| ERP / finance / supply chain | SAP Joule | Deepest business process agents | NEGATIVE evidence: VW "not sufficiently mature," 60% skip Joule. |
| Sales/marketing (SMB) | HubSpot Breeze | Most accessible for SMBs. 84% deflection at Zeffy. | Mostly copilot-level. 40% failure rate without config. |

## What To Do Instead of Choosing a Platform

1. **Build agent competence first** -- without hands-on experience, every evaluation is shaped by whichever vendor presented last.
2. **Start with coding agents** -- Claude Code or Codex. $20/mo, low risk. The meta-platform that builds everything else.
3. **Let the coding agent solve your 199 processes** -- vertical SaaS handles #1 (customer service). The coding agent builds agents for #2 through #200. Each builds on the last.
4. **Identify YOUR 5 high-value candidates** -- bounded scope, clear success criteria, escalation tolerance, data mostly in one system.
5. **Then evaluate platforms against YOUR use cases** -- not against vendor marketing. Infrastructure matters: AWS shop != Azure shop.
6. **Plan for custom development** -- multi-system orchestration requires engineering on every platform. Build on standards (MCP, Agent Skills), not lock-in.

**The sequence matters:** Coding agent competence -> agents build your tools -> agents build your agents -> agents build your evals -> compounding. Skip to platform selection and you're choosing between marketing stories.

## What We Did Not Find

- **Business user building an agent without developer help** -- on any platform
- **Personal->team agent promotion** -- on any platform (Antspace BYOC is the only candidate, still staging)
- **Named enterprise with business agents in production** -- on any horizontal platform. Exception: finance/accounting at Level 3 convergence with 8+ companies, but these are vertical/startup-built, not horizontal platform agents.
- **Nordic companies using business agents on horizontal platforms** -- only 4 signals across 50+ cycles, 1 independently verified (Finnair on Agentforce)
- **Platform-first adoption success stories** -- across 63 cycles and 18,500 Agentforce customers, zero named companies succeeded with "buy platform first, train later"
- **EU AI Office agent-specific guidance** -- confirmed absent as of March 2026

See [platform-trajectories.md](platform-trajectories.md) for where each platform is headed. See [enterprise-reality.md](enterprise-reality.md) for why no platform passes the enterprise test. See [nordic-landscape.md](nordic-landscape.md) for the Nordic situation. See [patterns.md](patterns.md) for all established patterns.
