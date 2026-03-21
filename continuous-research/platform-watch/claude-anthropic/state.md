# Anthropic — Claude / Claude Code — Platform State

Last updated: 2026-03-21
OODA cycles: 2

## Focus

Anthropic's ecosystem for **business users**. Initially developer-heavy, but Cowork + plugins signal a real business user surface is emerging.

## Key Verdict (as of 2026-03-21)

**Three-layer platform play, not just "Intel Inside."** Anthropic is simultaneously: (1) setting open standards that competitors adopt (MCP + Agent Skills), (2) powering partner platforms (Microsoft Copilot Cowork), and (3) building its own business surface (Claude Cowork + plugins + marketplace). Most ambitious dual-channel strategy of any vendor. But infrastructure fragility, no managed hosting, and zero enterprise deployment evidence are real gaps.

## The Three-Layer Platform Strategy

### Layer 1: Open Standards as Infrastructure
**MCP** — 6,400+ servers, 97M monthly SDK downloads, Linux Foundation. Adopted by OpenAI, Google, Microsoft. ([Roadmap](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/), Mar 2026)

**Agent Skills** — Open standard (Dec 2025). Folders with SKILL.md + scripts. Adopted by Microsoft, OpenAI, Cursor, Atlassian, Figma. Partner skills from Canva, Stripe, Notion, Zapier. "MCP provides connectivity, Skills provide procedural knowledge." ([Anthropic engineering](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills); [The New Stack](https://thenewstack.io/agent-skills-anthropics-next-bid-to-define-ai-standards/), Feb 2026; [Simon Willison](https://simonwillison.net/2025/Dec/19/agent-skills/), Dec 2025)

**Strategic position:** Anthropic owns TWO foundational open standards. OpenAI adopted both. If every platform uses MCP + Skills, Claude's tools work everywhere.

### Layer 2: Model + Runtime Engine
**Claude models** — Opus 4.6 (14.5h METR horizon, 1M context), Sonnet 4.6. Best reasoning.
**Agent SDK** — Same engine as Claude Code, exposed as library. Python/TypeScript. Self-host only — no managed hosting. ([Docs](https://platform.claude.com/docs/en/agent-sdk/overview); [Production challenges](https://medium.com/@hugolu87/how-to-run-claude-agents-in-production-using-the-claude-sdk-756f9d3c93d8), Mar 2026)

### Layer 3: Business User Surface (NEW — emerging fast)
**Claude Cowork** — "Claude Code for the rest of your work." Desktop agent across computer environment. (Jan 2026 launch)
**Plugins** — "Mini apps" — skill+connector bundles for domain-specific work. Finance, HR, legal templates. Private enterprise marketplaces. Connectors: Google Workspace, DocuSign, FactSet, MSCI, LegalZoom. ([Blog](https://claude.com/blog/cowork-plugins-across-enterprise); [TechCrunch](https://techcrunch.com/2026/02/24/anthropic-launches-new-push-for-enterprise-agents-with-plugins-for-finance-engineering-and-design/), Feb 24, 2026)
**B2B Marketplace** — Apps from Snowflake, GitLab, Harvey AI, Replit, Rogo, Lovable. ([Digital Commerce 360](https://www.digitalcommerce360.com/2026/03/16/anthropic-launches-claude-b2b-marketplace-enterprise-ai-applications/), Mar 16, 2026)
**Certifications** — "Claude Certified Architect" launched Mar 12. AWS/Kubernetes playbook. ([IntuitionLabs](https://intuitionlabs.ai/articles/claude-enterprise-deployment-training-guide-2026), 2026)
**$100M Partner Network** — Accenture (30K), Deloitte (350K), PwC, Infosys. ([Anthropic](https://www.anthropic.com/news/claude-partner-network), 2026)

## Distribution Strategy: Own Platform + Power Others

### Microsoft Copilot Cowork (the big deal)
Claude model + same agentic harness as Claude Cowork, running in M365 tenants. Part of E7 ($99/user/mo). Despite Microsoft's $13B in OpenAI, they built their newest M365 flagship on Claude. $30B Azure compute deal (Nov 2025). Research Preview, broader access late March 2026. ([Microsoft blog](https://www.microsoft.com/en-us/microsoft-365/blog/2026/03/09/copilot-cowork-a-new-way-of-getting-work-done/); [Fortune](https://fortune.com/2026/03/09/microsoft-copilot-cowork-ai-agents-anthropic-e7-m365-saas/); [GeekWire](https://www.geekwire.com/2026/microsofts-new-copilot-cowork-integrates-anthropics-claude-in-rollout-of-new-e7-licensing-tier/), Mar 2026)

### Also available via:
- Google Vertex AI
- Amazon Bedrock
- Direct (claude.ai / API)

**Channel tension:** Anthropic building Cowork while also powering Copilot Cowork. Long-term, this creates conflict with Microsoft.

## Computer Use — The Legacy Integration Sleeper

61.4% on OSWorld vs competitors' 7.8%. 94% on Pace Insurance Benchmark. Turns the desktop into an integration layer for systems with no API — mainframes, Citrix, legacy ERPs. Claude Sonnet 4.5 available in Copilot Studio for Computer Use agents (beta). ([Brainroad](https://brainroad.com/claude-computer-use-what-it-means-for-ai-agents-in-2026/), 2026)

**For enterprise reality:** This solves the "no API" problem. Your agent can interact with ANY software the human can see — including legacy systems none of the connector-based platforms can reach.

## Personal → Team → Company Progression

| Level | Anthropic product | Maturity | Evidence |
|-------|------------------|----------|----------|
| Personal | Claude Cowork + plugins | Shipping (Jan 2026) | Business user surface exists. Plugin ecosystem growing. No independent deployment reports. |
| Personal (via Microsoft) | Copilot Cowork | Research Preview (Mar 2026) | Claude in M365. No user reports yet. |
| Team | Claude Team/Enterprise + private plugin marketplaces | Shipping/Announced | Plugin sharing via private marketplaces. No evidence of team agent workflows. |
| Company | Agent SDK + enterprise plug-ins + B2B marketplace | Emerging | Self-host only. No managed hosting. Certifications launched. |
| Promotion path | Plugin → marketplace → ? | Emerging | Plugin architecture could enable promotion (personal plugin → team marketplace → company standard). Not documented as designed workflow. |

## Risks and Weaknesses

### Infrastructure fragility
14 incidents between Feb 27–Mar 5 when ChatGPT users flooded Claude. API spiked 300%. Enterprise tiers got timeout errors. Major global outage Mar 2. Enterprise architect: "raised red flags about single-provider risk." Plans: $5B compute spend in 2026. ([WebProNews](https://www.webpronews.com/claudes-infrastructure-crisis-what-the-chatgpt-exodus-really-means-for-anthropic/); [TechCrunch](https://techcrunch.com/2026/03/02/anthropics-claude-reports-widespread-outage/), Mar 2026)

### Security vulnerabilities
CVE-2026-21852 (5.3 severity) — repo config manipulation to steal API keys. Shell command execution in untrusted repos. ([DevOps.com](https://devops.com/security-flaws-in-anthropics-claude-code-risk-stolen-data-system-takeover/), 2026)

### Political risk
Pentagon dispute over AI safeguards. Potential "supply-chain threat" designation. Federal agencies told to stop using Anthropic products. ([CNBC](https://www.cnbc.com/2026/02/26/anthropic-pentagon-ai-amodei.html), Feb 26, 2026)

### Token efficiency
3-4x overhead vs Codex. No evidence of Anthropic addressing this. $5B compute addresses capacity, not per-token cost.

### Scale gap
~40-50M monthly actives vs OpenAI ~200M weekly actives. Consumer brand awareness much lower.

## MCP Enterprise Roadmap (Gap)

Four priorities: transport scalability, agent communication, governance, enterprise readiness. Enterprise items: SSO-integrated auth, gateway patterns, config portability. **NOT shipped yet.** No enterprise working group. Community building stopgaps ([mcp-gateway-registry](https://github.com/agentic-community/mcp-gateway-registry)). ([Roadmap](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/); [New Stack](https://thenewstack.io/model-context-protocol-roadmap-2026/), Mar 2026)

## What We Need To Learn (next cycles)

- [ ] Cowork plugin adoption — who's building plugins? What for? Any business user reports?
- [ ] Copilot Cowork Frontier rollout — real user experiences?
- [ ] Agent Teams (forthcoming) — when? What does multi-agent collaboration look like?
- [ ] B2B marketplace traction — which apps getting used?
- [ ] MCP enterprise governance — when does SSO/audit ship?
- [ ] Computer Use in enterprise — anyone using it for legacy system integration?
- [ ] Infrastructure reliability — improving or still fragile?
- [ ] Political risk resolution — Pentagon situation outcome?

## Sources

See `runs/` for detailed research logs:
- `runs/2026-03-21-run03.md` — Developer-focused initial research
- `runs/2026-03-21-trajectory.md` — Platform trajectory deep dive
