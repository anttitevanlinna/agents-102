---
type: finding
domain: cross-domain
evidence_level: 3
platforms: [microsoft, google, openai, anthropic, salesforce]
practitioners: [F-Secure, ConductorOne, Microsoft Agent 365]
nordic: true
updated: 2026-03-28
answers:
  - "can I take a personal agent and promote it to team/company?"
  - "what's the promotion path gap?"
  - "why does every platform have three disconnected tiers?"
  - "what's agent sprawl?"
  - "how should CTOs think about the personal→team→company transition?"
---

# The Promotion Path Gap — Personal → Team → Company

**Evidence level:** Level 3 (convergence across all platforms) | **Last updated:** 2026-03-28

**Thesis:** Every platform has personal, team, and company agent tiers — but they're different products. Promotion means rebuilding, not upgrading. This gap is universal and nobody talks about it because every vendor wants you to start on their platform.

## The Gap Across Platforms

| Platform | Personal | Team | Company | Same runtime? |
|----------|----------|------|---------|---------------|
| **Microsoft** | Copilot | Copilot Studio | Foundry | No — three different runtimes |
| **Google** | Gemini | Workspace Studio | Vertex | No — disconnected layers |
| **OpenAI** | ChatGPT | Enterprise | Agents SDK | No — rebuild required |
| **Anthropic** | Claude | Antspace (staging) | BYOC (K8s) | **Possible exception** — same artifact, same deploy protocol. Still staging. |
| **Salesforce** | Copilot | Agentforce (Studio) | Agentforce (Enterprise) | Partially — but 15 topics/agent, 15 actions/topic architectural limits |

You cannot take a personal agent that works and "promote" it to a governed team agent. You start over.

**Anthropic's Antspace + BYOC is the first possible exception** — same artifact from personal hosting to enterprise K8s. But still staging, not production.

## The F-Secure Evidence

After 2 modules of agent training (March 2026), builders hit exactly this gap:
1. People build personal agents that work
2. Then ask: "Where does this live? How do I share it? Can it run when I'm not running it?"
3. No platform answers all three questions

This confirms the gap isn't theoretical — organizations building competence discover it organically within weeks.

Source: F-Secure deployment experience, Antti direct [practitioner direct — first party]

## Agent Sprawl Is the Consequence

When the promotion path doesn't exist, agents proliferate without governance:

- **Microsoft discovered 500K agents** inside their own organization. 29% operate without IT approval. Source: [Microsoft Security Blog](https://www.microsoft.com/en-us/security/blog/2026/02/10/80-of-fortune-500-use-active-ai-agents-observability-governance-and-security-shape-the-new-frontier/)
- **Gravitee:** 3M+ agents across customer base, only 47% monitored
- **Non-human identities** already outnumber human identities 50:1 (projected 80:1)
- **82% of executives think they're protected.** Only 24% have actual visibility.
- **"Agents of Chaos" academic study** independently confirmed the governance gap

## The Governance Product Layer Is Just Emerging

Six months ago, none of these existed:
- **ConductorOne:** MCP access management (March 19, 2026)
- **Microsoft Agent 365:** $15/user/month, GA May 1, 2026 — governance dashboard for agent fleet
- **Geordie AI:** Agent security governance
- **AWS Bedrock AgentCore Policy:** Cedar-based formal verification

Adoption evidence for all: zero. All just shipped or are shipping. The four-layer enterprise agent stack is crystallizing: Models → Protocols (MCP + A2A + Agent Skills) → **Governance** → Applications. The gap between protocols and governance is where the 95% failure rate originates.

## The Platform Strategy Implication

**Microsoft = Azure upsell.** Entra ID, Cosmos DB, Key Vault, Power Automate, Foundry — every layer is Azure-locked. AWS-native companies see a migration pitch, not an agent platform. Most large enterprises run hybrid (M365 for productivity, AWS for infrastructure).

**OpenAI = most ambitious but nothing deployed.** Frontier is deliberately vendor-neutral (manages agents from any provider) and MCP servers run anywhere. Enterprise share declining.

**Anthropic = standards + best engine + quietly building full stack.** Antspace/BYOC is the first architecture that might solve the promotion path.

**Google = strong architecture, weak execution.** Circular evidence ecosystem — all deployment claims trace back to Google's own materials. Workspace Studio: 63 user-reported outages in 24 hours around GA.

**"Which platform" depends on "where does your infrastructure live."** The M365/Azure-native company has a different answer than the AWS-native company. The question is premature for most organizations.

## The CTO Advice

1. **Plan for rebuilding at each tier transition.** Or build on standards (MCP, Agent Skills) from the start so tool integrations transfer.
2. **Start with coding agents ($20/month).** They're the meta-platform that builds everything else. The coding agent IS the platform.
3. **Audit what agents already exist.** You probably have shadow agents. Before deploying more, understand what's there.
4. **Budget for the governance layer.** It's just starting to ship. The gap between "agents deployed" and "agents governed" is where failures originate.
5. **Don't make non-two-way-door decisions.** The entire space is pre-chasm. Every platform is immature. Every vendor story is 12-18 months ahead of reality. Bet small while making progress.

## The Announcement-to-Deployment Gap — STILL ENORMOUS

Every major platform vendor announced agents in Q1 2026. NONE have independently verified customer deployments with named companies and measurable outcomes. No practitioner blog posts, X.com threads, or conference talks describing real deployment results. The gap between what vendors announce and what practitioners actually use is the defining characteristic of the current market.
