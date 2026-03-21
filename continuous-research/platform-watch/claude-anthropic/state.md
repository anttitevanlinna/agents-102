# Anthropic — Claude / Claude Code — Platform State

Last updated: 2026-03-21 (cycle 24)
OODA cycles: 4

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

### Infrastructure fragility — LEVEL 3 CONVERGENCE (CRITICAL)
**109 incidents in the last 90 days** (28 major outages, 81 minor), median duration 1h 8m. ([StatusGator](https://statusgator.com/services/claude), Mar 2026)

Timeline of recent failures:
- Feb 27–Mar 5: 14 incidents when ChatGPT users flooded Claude. API spiked 300%. Enterprise timeout errors. ([WebProNews](https://www.webpronews.com/claudes-infrastructure-crisis-what-the-chatgpt-exodus-really-means-for-anthropic/); [TechCrunch](https://techcrunch.com/2026/03/02/anthropics-claude-reports-widespread-outage/), Mar 2026)
- March 11: Stalled chats, auth errors, "service unavailable." ([Medium](https://medium.com/@manzonjj/why-claude-keeps-crashing-unprecedented-demand-fragile-infrastructure-and-a-second-outage-in-24-50a64469e869), Mar 2026)
- March 17: 6,800+ Downdetector reports, surging to 10,000+. ([GV Wire](https://gvwire.com/2026/03/17/claude-goes-down-for-thousands-downdetector-reports/))
- March 18: Elevated errors on Claude.ai, Claude Code login affected.
- March 21: Elevated error rates on Opus and Sonnet 4.6.

**Anthropic SRE at QCon London (March 19):** Alex Palcuie (ex-Google Cloud SRE): "Claude goes down more often than any of us would like. Earlier today, I was involved in an incident, even if I'm at a conference." Has been using Claude for incident response since January — excels at log analysis ("reads at the speed of I/O") but "consistently confuses correlation with causation." Produces "80% story that's pretty and convincing" but misses root causes. NYE fraud detection success: Claude found 4,000 suspicious accounts that a human SRE would have missed. But: "It would be hypocritical to say Claude fixes everything. My team exists, we're hiring." Skills atrophy concern: AI use could degrade SRE skills over time. ([The Register](https://www.theregister.com/2026/03/19/anthropic_claude_sre/), domain trade publication, Mar 2026)

**Uptime metrics (90 days):** API 99.34%, Claude Code 99.57%, Claude for Government 99.85%.

Claude Code now accounts for 4% of all GitHub commits — demand outstripping infrastructure. Enterprise architect quoted: "raised red flags about single-provider risk." Plans: $5B compute spend in 2026.

### Security vulnerabilities
CVE-2026-21852 (5.3 severity) — repo config manipulation to steal API keys. Shell command execution in untrusted repos. ([DevOps.com](https://devops.com/security-flaws-in-anthropics-claude-code-risk-stolen-data-system-takeover/), 2026)

### Political risk
Pentagon dispute over AI safeguards. Potential "supply-chain threat" designation. Federal agencies told to stop using Anthropic products. ([CNBC](https://www.cnbc.com/2026/02/26/anthropic-pentagon-ai-amodei.html), Feb 26, 2026)

### Token efficiency
3-4x overhead vs Codex. No evidence of Anthropic addressing this. $5B compute addresses capacity, not per-token cost.

### Scale gap
~40-50M monthly actives vs OpenAI ~200M weekly actives. Consumer brand awareness much lower.

## MCP Enterprise Roadmap — Third-Party Gateways Filling the Gap (Level 2-3)

Four priorities: transport scalability, agent communication, governance, enterprise readiness. Enterprise items will ship as **extensions, not core spec changes.** ([Roadmap](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/); [New Stack](https://thenewstack.io/model-context-protocol-roadmap-2026/), Mar 2026)

**Third-party MCP gateways converging on the governance gap (4+ independent solutions):**
- **MintMCP:** SOC 2 Type II, SSO/OAuth, real-time tracing, HIPAA/GDPR export. ([Help Net Security](https://www.helpnetsecurity.com/2026/02/06/mintmcp-ai-agents-platform/), Feb 2026)
- **Stacklok (ToolHive):** Identity, policy enforcement, OTel telemetry in Kubernetes. ([Stacklok blog](https://stacklok.com/blog/best-mcp-platforms-for-teams-that-need-access-control-and-audit-logs-2026/), 2026)
- **Lunar.dev MCPX:** Immutable audit trail for compliance.
- **Itential:** RBAC, SSO, audit for infrastructure automation.
- **Scalekit:** Detailed analysis of SSO and scoped auth in enterprise MCP. ([Scalekit](https://www.scalekit.com/blog/enterprise-mcp-how-identity-sso-and-scoped-auth-actually-work), 2026)

**Key insight:** MCP governance is an **ecosystem play**, not an Anthropic-provided solution. Enterprises must select and deploy a gateway layer themselves. This is a training module implication.

## What We Need To Learn (next cycles)

- [~] Cowork plugin adoption — who's building plugins? What for? Any business user reports? **Partial: One PM plugin review found (Medium, Mohit Aggarwal — [link](https://medium.com/@mohit15856/i-used-claude-coworks-product-management-plugin-for-a-month-honest-review-d38f25348a6d)). No enterprise deployment reports.**
- [ ] Copilot Cowork Frontier rollout — real user experiences?
- [x] Agent Teams — when? What does multi-agent collaboration look like? **Answer: Released Feb 5, 2026 with Opus 4.6. Coding only (Claude Code). No business user capabilities. ([TechCrunch](https://techcrunch.com/2026/02/05/anthropic-releases-opus-4-6-with-new-agent-teams/))**
- [~] B2B marketplace traction — which apps getting used? **Partial: Launched Mar 6, enterprise-only limited preview. Six partners (GitLab, Harvey, Lovable, Replit, Rogo, Snowflake). Zero customer reviews found. $200M Snowflake partnership. ([SiliconANGLE](https://siliconangle.com/2026/03/06/anthropic-launches-claude-marketplace-third-party-cloud-services/))**
- [x] MCP enterprise governance — when does SSO/audit ship? **Answer: Not from Anthropic directly. Third-party gateways filling the gap (MintMCP, Stacklok, Lunar.dev, Itential). MCP spec ships enterprise features as extensions.**
- [~] Computer Use in enterprise — anyone using it for legacy system integration? **Partial: NYSE uses Claude Code for legacy code refactoring + internal AI agents. This is Claude Code, not Computer Use for screen automation. Zero practitioner reports of Computer Use for mainframe/Citrix/legacy ERP automation.**
- [x] Infrastructure reliability — improving or still fragile? **Answer: WORSE. 109 incidents in 90 days. Level 3 convergence. Own SRE admits "Claude goes down more often than any of us would like" at QCon London (Mar 19). Team hiring, not shrinking. 5+ incidents in March 2026 alone. 99.34% API uptime = ~6 hours downtime per month.**
- [ ] Political risk resolution — Pentagon situation outcome?
- [ ] Cowork plugin enterprise deployment with measurable outcomes
- [ ] B2B marketplace customer reviews — re-check in 4 weeks
- [ ] Agent Teams for business users — any roadmap signal?

## Sources

See `runs/` for detailed research logs:
- `runs/2026-03-21-run03.md` — Developer-focused initial research
- `runs/2026-03-21-trajectory.md` — Platform trajectory deep dive
- `runs/2026-03-21-cycle15.md` — Infrastructure fragility (Level 3), MCP gateways, plugin adoption, marketplace, Agent Teams
- `../cross-platform/runs/2026-03-21-cycle24.md` — SRE QCon London talk (Palcuie), 5+ March incidents, 99.34% API uptime, correlation/causation weakness
