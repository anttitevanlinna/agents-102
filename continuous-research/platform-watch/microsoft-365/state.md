# Microsoft 365 / Azure AI Foundry — Platform State

Last updated: 2026-03-21 (cycle 15)
OODA cycles: 4

## Focus

Microsoft's agent ecosystem as it serves **business users** — not developers. The question: what can a sales rep, HR manager, finance analyst, or compliance officer actually do with agents today in the M365 world?

## Business Agent Surface

### Copilot Studio (Low-code agent builder for M365)
- Visual builder for agents that work in Teams, SharePoint, Outlook
- 1,400+ connectors to enterprise systems
- **This is where business agents live** — not Azure Foundry
- **Two tiers:** "Lite" (built inside M365 Copilot, business-user accessible, limited to Q&A bots grounded in M365 data) and "Full" (requires developer/power-user skills for connectors, Power Automate, APIs)
- One-click upgrade from Lite to Full, but the **skill gap is not one-click** — business users hit a ceiling fast
- Pre-built agents for HR (Employee Self-Service, Leave Management), Sales (Sales Order Agent), Finance (Reconciliation, Time & Expense) — but **embedded in Dynamics 365**, not available to general M365 customers

### Microsoft Copilot (personal assistant layer)
- Embedded in M365 apps — summarize, draft, analyze
- Copilot Cowork (Research Preview, March 2026) — Claude-powered, multi-step tasks across M365 apps
- **Personal agent** tier — works for one user, in their apps
- **Reliability problems:** crashes after 15-20 interactions, memory loss, document modification described as "practically useless" by users. Nadella reportedly called some integrations "almost unusable"
- **Copilot Memory** (GA for personal Copilot): persists preferences, working styles, recurring topics across sessions. Stored in Exchange Online hidden folders. AES-256 encrypted, GDPR/EU Data Boundary compliant. **Does NOT extend to custom agents in Copilot Studio.** ([European Collaboration Summit guide](https://collabsummit.eu/blog/microsoft-365-copilot-memory-enterprise-guide-european-organizations))

### Copilot Cowork (the personal agent play)
- Built with Anthropic's Claude, runs in Microsoft's cloud within M365 tenants
- Multi-step: assembles presentations, pulls financials, emails teams, schedules prep — from a single request
- Plan-based execution with checkpoints, human approval before changes applied
- **Status: Research Preview only.** Limited customer testing. No independent user reports exist. Broader Frontier access late March 2026.
- This is the strongest personal agent concept in M365 but is NOT shipping broadly

### Azure AI Foundry Agent Service (GA March 2026)
- Enterprise infrastructure — durable orchestration, human-in-the-loop, multi-model
- Private networking, Entra Agent ID
- **Company-wide agent** tier — but requires developer involvement

### Microsoft Agent 365 (launches May 1, 2026)
- Dedicated control plane for IT/security to observe, secure, and govern agents
- Unified view across M365 Copilot and Copilot Studio agents
- Part of E7 bundle or standalone add-on ($15/user/month)
- **Governance for agents that don't yet exist in production** — infrastructure ahead of adoption

## Personal → Team → Company Progression

| Level | Microsoft product | Maturity | Evidence |
|-------|------------------|----------|----------|
| Personal | Copilot in M365 (lite agents) | Shipping | Business users can build Q&A bots. Reliability issues (crashes, memory loss). No agentic use evidence. |
| Personal (memory) | Copilot Memory | Shipping | Persists user prefs across sessions. Personal Copilot only — does NOT work with Copilot Studio agents. |
| Personal (agentic) | Copilot Cowork | Research Preview | Claude-powered multi-step. No independent user reports. Not broadly available. |
| Team | Copilot Studio (full) | Shipping | Requires developer skills (Power Automate). One practitioner demo (edison365). No production deployment evidence. |
| Team (pre-built) | Dynamics 365 agents | Shipping | HR, Sales, Finance agents exist but only for Dynamics 365 customers. Dow mentioned in vendor marketing (no specifics). |
| Company | Azure Foundry Agent Service | GA March 2026 | Practitioners report hidden prompts, unreliable grounding. No named deployments. |
| Company (security) | Entra Agent ID | Preview (Frontier) | Dedicated agent identity type. Least-privilege by default. High-privilege roles blocked. Preview only — requires Frontier access. |
| Governance | Agent 365 | Launches May 2026 | Unified agent visibility. Part of E7 ($99/user). Not yet available. |
| Promotion path | Lite → Studio → Teams publish → Agent 365 | **Not a designed workflow** | One-click upgrade exists but no practitioner has documented end-to-end promotion. Concept in marketing, not in tooling. |

## Enterprise Integration Reality (NEW — cycle 3)

### Multi-System Connector Orchestration

| Question | Answer | Source |
|----------|--------|--------|
| Can Copilot Studio chain 5+ connectors in one agent? | Architecturally yes (multi-agent + connected agents + MCP). No production evidence of anyone doing it. | [MS Learn: multi-agent patterns](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/multi-agent-patterns) |
| What does "1,400 connectors" mean? | Power Platform connectors — API wrappers. Standard (included) vs. Premium (paid). Each exposes specific actions. Most designed for point-to-point flows, not multi-step orchestration. | [MS Learn: connectors](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-connectors) |
| Read vs. write control per connector? | **No per-connector read/write toggle.** Permissions follow connected user's identity. Design-time control only: choose which actions to expose. No runtime enforcement layer. | [MS Learn: connectors](https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-connectors) |
| Power Automate as orchestration layer? | Required for complex cross-system workflows. Limitations: rigid trigger-action logic, no conversational exception handling, non-Microsoft connectors have limited depth. Agent Flows (new) add AI capability but licensing complexity. | [MS Learn: PA limits](https://learn.microsoft.com/en-us/power-automate/limits-and-config) |
| Snowflake integration? | 4 patterns: Native Connector (read-only, no-code), MCP Server, Cortex REST APIs, Custom MCP. Knowledge source = read-only grounding. Tool mode = flexible delegation. | [Snowflake guide](https://medium.com/snowflake/the-ultimate-guide-for-connecting-snowflake-to-copilot-studio-which-pattern-fits-53157e790f43) |
| Salesforce integration? | Connector exists. No production multi-step agent workflow documented. Write-back not documented in agent context. | [Holger Imbery blog](https://holgerimbery.blog/transform-your-sales-operations-integrate-salesforce-with-copilot-for-microsoft-365) |

### Security & Identity

| Question | Answer | Source |
|----------|--------|--------|
| What does Entra Agent ID do? | Dedicated identity type for AI agents. Least-privilege defaults. High-privilege roles (Global Admin, User Admin, etc.) BLOCKED. Azure RBAC scoped per-resource. Two auth modes: delegated (user scope) and unattended (autonomous). Preview only. | [MS Learn: Entra Agent ID auth](https://learn.microsoft.com/en-us/entra/agent-id/identity-professional/authorization-agent-id) |
| Does agent respect Salesforce RBAC? | **No.** Entra Agent ID governs Microsoft resources only. External RBAC depends on connector OAuth credentials. Each system manages its own permissions independently. | [MS Learn: Entra Agent ID auth](https://learn.microsoft.com/en-us/entra/agent-id/identity-professional/authorization-agent-id) |
| Connector SSO? | Works within Entra ID ecosystem. Non-Entra SSO planned (2025 Wave 2) but GA status unclear. Tokens ephemeral — not persisted. Long-running workflows need re-auth logic. SSO breaks with custom AD auth + Teams. | [MS Learn: SSO for connectors](https://learn.microsoft.com/en-us/power-platform/release-plan/2025wave1/microsoft-copilot-studio/use-sso-connectors-agents) |
| Unified cross-system audit? | **Does not exist.** Purview UAL covers M365 Copilot + Copilot Studio interactions. External system actions (Salesforce, Snowflake, Slack) logged in their own systems. SIEM integration (Sentinel/Splunk) required for consolidation. | [MS Learn: Purview audit](https://learn.microsoft.com/en-us/purview/audit-copilot) |

### Memory & Learning

| Question | Answer | Source |
|----------|--------|--------|
| Persistent memory across sessions? | **Personal Copilot only.** Copilot Memory stores user prefs in Exchange Online. Does NOT extend to Copilot Studio custom agents. | [CollabSummit EU guide](https://collabsummit.eu/blog/microsoft-365-copilot-memory-enterprise-guide-european-organizations) |
| Can agents learn from corrections? | **No.** No correction-based learning mechanism for custom agents. Agents are stateless between sessions. | [CollabSummit EU guide](https://collabsummit.eu/blog/microsoft-365-copilot-memory-enterprise-guide-european-organizations) |

## Pricing (2026)

| SKU | Price | What you get for agents |
|-----|-------|------------------------|
| M365 Copilot add-on | $30/user/month | Copilot in apps + lite agent builder + Copilot Studio for internal agents |
| M365 Copilot Business (SMB <300) | $21/user/month ($18 promo through June 2026) | Same as above, smaller org tier |
| Copilot Studio standalone | $200/month per 25K credits (or pay-as-you-go) | Advanced agent building without M365 Copilot |
| Agent 365 | $15/user/month | Governance control plane for agents |
| E7 Frontier Worker Suite | $99/user/month | E5 + Copilot + Agent 365 + security (launches May 2026) |

**Key insight:** Per-seat pricing means costs scale with headcount, not agent value. Licensing confusion is significant enough that multiple consultancies have built businesses around explaining it.

## What We Know (cumulative from all research cycles)

### From developer-focused research (cycle 1):
- Broadest surface area but practitioners confused about which product to use
- Hidden system prompts, unreliable knowledge grounding, random tool failures
- 80% Fortune 500 on Azure (broad) — not evidence of agent adoption
- Foundry Agent Service free through April 2026
- No named enterprise deploying agents for a specific business process

### From business-user research (cycle 2):
- **Lite agent ceiling:** Business users can build Q&A bots easily. Anything requiring external data, approval workflows, or multi-step automation needs developer skills (Power Automate, connectors)
- **Zero production business agent deployments found** across two research cycles. Dow is mentioned once in vendor marketing with no specifics. No independent evidence.
- **Copilot Cowork** is the strongest personal agent concept but in Research Preview only. No user reports.
- **Pre-built agents** for HR/Sales/Finance exist but are Dynamics 365-only — not accessible to general M365 customers
- **Reliability is a trust blocker.** Crashes, memory loss, document tasks "practically useless." This prevents business users from trusting agents for real work.
- **Personal→team promotion** is not a designed workflow. The pieces exist (lite → Studio → Teams publish → governance) but nobody has documented doing it end-to-end.
- **Licensing confusion** is itself a barrier to adoption — multiple explainer articles exist because the tiers are not self-evident.
- **Agent 365 governance** (May 2026) is infrastructure ahead of adoption — governing agents that don't exist in production yet.

### From integration/security research (cycle 3):
- **"1,400 connectors" is misleading for agent workflows.** Connectors are API wrappers designed for Power Automate point-to-point flows. Having a connector ≠ having orchestration capability. The gap between "connect" and "orchestrate" is the enterprise reality.
- **No cross-system identity.** Entra Agent ID governs Microsoft resources. External systems manage their own auth/RBAC independently. No unified agent identity across Salesforce + SharePoint + Snowflake.
- **No cross-system audit.** Purview covers M365. External actions logged separately. SIEM required for consolidation.
- **No agent memory for custom agents.** Copilot Memory = personal Copilot only. Copilot Studio agents are stateless between sessions. Cannot learn from corrections.
- **No per-connector permission granularity.** Can't set "read Salesforce but don't write." Permissions follow user's identity in target system. Design-time action selection is the only control.
- **Power Automate orchestration ceiling.** Rigid trigger-action logic, no conversational exception handling, non-Microsoft system depth limited. Agent Flows add AI but introduce licensing complexity.
- **Zero production multi-system agent workflows found** across three cycles. Architecture docs exist. Conference demos exist. Named enterprises running multi-connector agent workflows: zero.

## The Announcement-to-Deployment Gap

This is the defining feature of Microsoft's business agent story. The gap is the largest of any vendor we've researched:

| Announced | Status | Evidence |
|-----------|--------|----------|
| Copilot Studio for citizen developers | Shipping | Lite agents limited to Q&A; full Studio needs developers |
| Copilot Cowork (personal agent) | Research Preview | Zero user reports |
| Pre-built business agents | Shipping (Dynamics 365 only) | No independent production reports |
| Entra Agent ID (agent security) | Preview (Frontier) | Thoughtful framework, blocked high-privilege roles. Preview only. |
| Multi-agent orchestration | GA (architecture) | Patterns documented. Zero production deployments found. |
| 1,400+ connectors | Shipping | Mostly point-to-point. No evidence of 5+ connector agent workflows. |
| Agent 365 (governance) | May 2026 | Not yet available |
| E7 bundle ($99/user) | May 2026 | Not yet available |
| "80,000 enterprises" using AI | Claimed | Azure-broad, not agent-specific |

## What We Need To Learn (updated)

### Answered in previous cycles:
- [x] What can a business user actually build in Copilot Studio without developers? **Answer: Q&A bots grounded in M365 data. Ceiling hit fast for anything requiring external systems or workflows.**
- [x] Are there real Copilot Studio agents running business processes? **Answer: No. Zero found across three research cycles.**
- [x] What does the personal→team promotion look like? **Answer: Not a designed workflow. Pieces exist but no one has documented doing it.**
- [x] What are business users saying about M365 Copilot for agentic work? **Answer: Reliability complaints (crashes, memory loss). No agentic-use reports — only chatbot-use complaints.**
- [x] Copilot Cowork — is this the personal agent play? **Answer: Yes, and it's the most promising piece. But Research Preview only, no user data.**
- [x] Pricing for business users? **Answer: $30/user/month (Copilot) + potential credits. E7 at $99/user (May 2026). Per-seat not per-value.**

### Answered this cycle:
- [x] Can Copilot Studio chain multiple connectors in one agent workflow? **Answer: Architecturally yes (multi-agent patterns, connected agents, MCP). Zero production evidence.**
- [x] What does "1,400 connectors" actually mean for agents? **Answer: Power Platform API wrappers. Most for point-to-point flows. No read/write granularity. Orchestration ≠ connection.**
- [x] Entra Agent ID — what does it do for agent security? **Answer: Dedicated agent identity, least-privilege defaults, blocked high-privilege roles. Microsoft resources only — doesn't extend to Salesforce/Snowflake RBAC. Preview.**
- [x] Cross-system audit trail? **Answer: Does not exist. Purview covers M365 perimeter. External systems log independently. SIEM required.**
- [x] Agent memory for custom agents? **Answer: No. Memory = personal Copilot only. Custom agents stateless. No correction learning.**
- [x] Per-connector read/write permissions? **Answer: No toggle. Permissions follow user identity. Design-time action selection only.**

### Architecture deep dive (cycle 4):
- [x] What is Foundry REALLY? **Answer: PaaS layer on Azure cognitive services. Three agent types: Prompt (no-code), Workflow (Preview, declarative), Hosted (Preview, containers). State in Cosmos DB. Not a new runtime — extension of existing Azure AI.** ([Docs](https://learn.microsoft.com/en-us/azure/foundry/concepts/architecture), [Agent Service](https://learn.microsoft.com/en-us/azure/foundry/agents/overview))
- [x] What is Copilot Studio REALLY? **Answer: Descended from Power Virtual Agents. Runs on Power Platform/Dataverse runtime. Knowledge degrades >500 docs. Child agents can't run MCP servers. English-only generative. Legacy PVA constraints.** ([MVP review](https://ragnarheil.de/the-good-the-bad-and-the-ugly-of-copilot-studio-a-brutally-honest-review-going-into-late-2025/), [Enterprise guide](https://www.epcgroup.net/blog/microsoft-copilot-studio-enterprise-guide))
- [x] How do they relate? **Answer: Separate platforms, separate runtimes. SaaS (Studio) vs PaaS (Foundry). NO promotion path. Interop via A2A only. "Any Studio agent can be built in Foundry, not reverse."** ([Comparison](https://techcommunity.microsoft.com/blog/microsoft-security-blog/microsoft-copilot-studio-vs-microsoft-foundry-building-ai-agents-and-apps/4483160))
- [x] Multi-model routing? **Answer: Azure OpenAI models only for dynamic routing. 11,000+ catalog for selection but not routing. Claude Sonnet 4.5 in Copilot Studio beta (Computer Use only).** ([Foundry blog](https://devblogs.microsoft.com/foundry/whats-new-in-microsoft-foundry-dec-2025-jan-2026/))
- [x] Semantic Kernel / AutoGen status? **Answer: Merged into Microsoft Agent Framework. Both in maintenance mode.** ([Visual Studio Mag, Oct 2025](https://visualstudiomagazine.com/articles/2025/10/01/semantic-kernel-autogen--open-source-microsoft-agent-framework.aspx))

## Architecture Map (as of March 2026)

| Layer | Product | What it is | Runtime | Status |
|-------|---------|-----------|---------|--------|
| Open-source SDK | Microsoft Agent Framework | Merged SK + AutoGen | Any | GA |
| Cloud Platform | Microsoft Foundry (Agent Service) | PaaS: 3 agent types (Prompt/Workflow/Hosted) | Azure cognitive services + Cosmos DB | Prompt: GA. Workflow/Hosted: Preview |
| Low-Code Builder | Copilot Studio | Visual agent builder on PVA heritage | Power Platform / Dataverse | GA (with significant limits) |
| Consumption | M365 Copilot | Built-in copilots in Office apps | M365 | GA |
| Enterprise Suite | Agent 365 | Governance + autonomous business agents | M365 | May 2026 |
| Interop | MCP, A2A, OpenAPI | Cross-runtime communication | Protocol layer | MCP: GA. A2A: Preview |

**Key: Copilot Studio ≠ Foundry.** Different runtimes, different capabilities, no promotion path. Business users start in Studio (ceiling: Q&A bots). Developers build in Foundry (ceiling: Preview features). The gap between them is A2A protocol, not agent portability.

## Nadella's Strategic Bet

"SaaS will dissolve into a bunch of agents sitting on top of CRUD databases." ([SiliconANGLE, Feb 2026](https://siliconangle.com/2026/02/28/satyas-sacrifice-agents-threaten-office-microsoft-responds/))

March 2026 reorg: Copilot split into 4 divisions. Suleyman shifted to frontier models (reducing OpenAI dependence). The existential threat: Claude/agents can operate on Office file formats via open-source libraries — no Microsoft apps needed. Response: own governance/identity/security layer, not the apps.

15M paid Copilot seats (160% YoY) but low conversion from 440M M365 users. Some enterprises downgrading. ([Windows News](https://windowsnews.ai/article/microsofts-2026-copilot-reorganization-four-pillars-one-ai-strategy.405446))

### From E7/Cowork/A2A research (cycle 15):
- **E7 pricing skepticism is convergent (Level 1).** 5+ independent practitioners skeptical of $99/user/month value: Office Watch ("65% price jump"), SAMexpert ("too high for broad adoption"), Office365itpros ("worth $99?"), US Cloud (hidden consumption could push >$200/user/month), Rob Quickenden (per-user-per-agent licensing confusion). ([Office Watch](https://office-watch.com/2026/microsoft-365-e7-a-99-frontier-suite-the-future-or-an-expensive-bundle/), [SAMexpert](https://samexpert.com/microsoft-365-e7-licensing-guide/), [Office365itpros](https://office365itpros.com/2026/03/17/is-the-new-agent-365-worth-99/), [US Cloud](https://www.uscloud.com/blog/microsoft-e7-and-the-new-economics-of-enterprise-ai/), [Rob Quickenden](https://robquickenden.blog/2026/03/agent-365-nears-ga/), Mar 2026)
- **Copilot adoption baseline: 3.3%.** Only 15M paid seats out of 450M+ M365 commercial seats (Nadella, Q2 FY26 earnings, Jan 2026). E7 faces same distribution-vs-conversion challenge.
- **Copilot Cowork: still zero independent reviews.** Frontier program opening late March — first practitioner reports expected within weeks.
- **Foundry Workflow Agents: vendor-only evidence.** Capgemini ContractGPT and KPMG governance cited only in Microsoft's own blog ([Foundry blog](https://devblogs.microsoft.com/foundry/introducing-multi-agent-workflows-in-foundry-agent-service/), Mar 2026). No independent confirmation.
- **Microsoft Agent Framework: Release Candidate.** Successor to Semantic Kernel + AutoGen. ([Foundry blog](https://devblogs.microsoft.com/foundry/microsoft-agent-framework-reaches-release-candidate/), Mar 2026)
- **A2A: preview works, zero real connections.** Public preview in Copilot Studio ([MS Learn](https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-agent-to-agent)). Only real A2A production deployment found: Tyson Foods/Gordon Food Service — on Google's platform, not Microsoft's. A2A ecosystem: 150+ orgs, Linux Foundation, v0.3.
- **Nordic M365 agents: complete absence.** Zero named Nordic companies with M365 agent deployments across 4 research cycles. Cloudpartner.fi analyzing Security Copilot licensing for Finnish orgs — analysis, not deployment ([Cloudpartner.fi](https://learn.cloudpartner.fi/posts/security-copilot-scu-allocation-in-microsoft-365-e5-the-nordic-reality-check), Mar 2026).

### Open questions for next cycles:
- [ ] Hosted Agents: when do they get private networking? This blocks production enterprise use.
- [x] Workflow Agents: any practitioner building multi-step business workflows? **Answer: No independent evidence. Capgemini/KPMG cited only in vendor blog.**
- [x] A2A in practice: has anyone connected a Copilot Studio agent to a Foundry agent via A2A? **Answer: No. Preview works, zero real-world connections. Only A2A production case is on Google's platform.**
- [ ] Claude in Copilot Studio: expanding beyond Computer Use beta?
- [x] Copilot Cowork Frontier rollout: early user reports? **Answer: Not yet — still Research Preview. Frontier opening late March.**
- [x] E7 launch (May 2026): adoption signals? **Answer: Convergent skepticism from practitioners. Not GA yet. Zero adoption announcements.**
- [x] Nordic companies: any M365 agent adoption? **Answer: No. Complete absence across 4 cycles.**
- [ ] Copilot Cowork independent reviews — re-check in 2-3 weeks after Frontier opens
- [ ] E7 early adoption data — watch May-June 2026
- [ ] Rob Quickenden, Office365itpros, Cloudpartner.fi — track as independent M365 agent analysts

## Sources

See `runs/` for detailed research logs:
- `2026-03-21-run01.md` — Developer/infrastructure focus
- `2026-03-21-biz01.md` — Business user focus
- `2026-03-21-integ01.md` — Enterprise integration, security, multi-tool
- `2026-03-21-architecture.md` — Architecture deep dive (Foundry vs Copilot Studio)
- `2026-03-21-cycle15.md` — E7 pricing skepticism, Cowork status, A2A, Foundry Workflows, Nordic gap
