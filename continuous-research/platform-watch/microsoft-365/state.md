# Microsoft 365 / Azure AI Foundry — Platform State

Last updated: 2026-03-21 (cycle 27)
OODA cycles: 8

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
- **Multi-model (March 2026):** Claude Sonnet 4 and Opus 4.1 now available for ALL agent types (not just CUA). Per-agent model selection via dropdown. Can mix Claude and OpenAI models across multi-agent systems. EU/EFTA requires admin opt-in. ([MS Copilot Blog](https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/anthropic-joins-the-multi-model-lineup-in-microsoft-copilot-studio/), vendor announcement)

### Microsoft Copilot (personal assistant layer)
- Embedded in M365 apps — summarize, draft, analyze
- Copilot Cowork (Research Preview, March 2026) — Claude-powered, multi-step tasks across M365 apps
- **Personal agent** tier — works for one user, in their apps
- **Reliability problems:** crashes after 15-20 interactions, memory loss, document modification described as "practically useless" by users. Nadella reportedly called some integrations "almost unusable"
- **Adoption decline:** Copilot market share among paid AI subscribers: 11.5%, down from 18.8% in Jul 2025 — 39% contraction ([Stackmatix](https://www.stackmatix.com/blog/copilot-market-adoption-trends)). Accuracy NPS: -19.8 (Jan 2026) [SOURCE NEEDED for direct URL]. 44.2% of lapsed users cite distrust of answers [SOURCE NEEDED]. One enterprise: 4,000 seats at $1.4M/year, 47 opened it, 12 used it more than once after 3 months ([Peter Girnus, X.com](https://x.com/gothburz/status/1999124665801880032), practitioner direct, Level 2)
- **Copilot Memory** (GA for personal Copilot): persists preferences, working styles, recurring topics across sessions. Stored in Exchange Online hidden folders. AES-256 encrypted, GDPR/EU Data Boundary compliant. **Does NOT extend to custom agents in Copilot Studio.** ([European Collaboration Summit guide](https://collabsummit.eu/blog/microsoft-365-copilot-memory-enterprise-guide-european-organizations))

### Copilot Cowork (the personal agent play)
- Built with Anthropic's Claude, runs in Microsoft's cloud within M365 tenants
- Multi-step: assembles presentations, pulls financials, emails teams, schedules prep — from a single request
- Plan-based execution with checkpoints, human approval before changes applied
- **Status: Research Preview only.** Limited customer testing. "Late March" broader Frontier access has not materialized as of March 21. Charles Lamanna (Microsoft President) says he's personally using it; LinkedIn commenters enthusiastic but zero independent deployment reports. Some Cowork usage may be included in $30/user plan (not E7-exclusive). ([LinkedIn](https://www.linkedin.com/posts/charleslamanna_its-been-great-to-see-the-excitement-around-activity-7436809874933587968-jyuB), Mar 2026)
- This is the strongest personal agent concept in M365 but is NOT shipping broadly
- **Cycle 27 update:** Silence is becoming the signal. 12+ days after announcement, zero independent reviews on any platform. Frontier rollout not confirmed as live. Ethan Mollick skeptical: Microsoft "has a tendency to launch a leading product and then let it sit for awhile." ([GeekWire](https://www.geekwire.com/2026/microsofts-new-copilot-cowork-integrates-anthropics-claude-in-rollout-of-new-e7-licensing-tier/), Mar 2026). Next meaningful check: April 1-7.

### Azure AI Foundry Agent Service (GA March 16, 2026)
- Enterprise infrastructure — durable orchestration, human-in-the-loop, multi-model
- **Now GA** with private networking (BYO VNet, no public egress), MCP auth (key/Entra/OAuth), production evaluations
- Three agent types: Prompt (GA, no-code), Workflow (GA, visual/YAML), Hosted (Preview, containers)
- Built on OpenAI Responses API — wire-compatible, minimal migration from existing Responses API code
- Multi-model: Claude Opus 4.6, Sonnet 4.6, GPT-Realtime-1.5, Grok 4.0, NVIDIA Nemotron
- Named customer: Corvus Energy (marine batteries, 1,500 vessels) — replacing manual inspection workflows. No metrics. ([Foundry GA blog](https://devblogs.microsoft.com/foundry/foundry-agent-service-ga/); [Redmondmag](https://redmondmag.com/articles/2026/03/17/microsoft-brings-production-ready-ai-agents-at-gtc.aspx), Mar 2026)
- Hosted agent billing starts no earlier than April 1, 2026
- Voice Live API (preview) — real-time speech-to-speech for customer service/field ops
- **Company-wide agent** tier — requires developer involvement
- **Post-GA reliability issues (cycle 27):** Multiple practitioners report intermittent JSON parsing failures — agents return empty responses for "several hours per week." Code Interpreter containers failing in EastUS2 from Feb 21. Multi-region availability degradation March 9-10. One user evaluating Anthropic Claude as fallback. ([MS Q&A](https://learn.microsoft.com/en-us/answers/questions/5789805/azure-ai-foundry-agents-intermittently-failing-wit), Feb-Mar 2026, practitioner direct)
- **Pre-GA technical limitations (status unknown post-GA):** Hidden system prompts consuming tokens invisibly, RAG grounding NOT enforced (agents hallucinate instead of using knowledge sources), portal-defined agents not accessible via API. ([Julian Smiles on Medium](https://medium.com/@juliansmiles_40140/azure-ai-foundry-agent-service-technical-limitations-6b0f00ff4adc), Jan 2026, practitioner direct)
- **Private networking + Workflow agents bug:** Workflow agents fail with private networking enabled ("400 Cannot create a new response"). Individual agents work fine. Published agents use project identity instead of distinct agent identity, contradicting docs. ([GitHub issue](https://github.com/azure/azure-sdk-for-js/issues/37036), Feb 2026, practitioner direct)
- **Named customers (GA announcement, all Level 0):** Corvus Energy, KPMG, NTT DATA, Fujitsu, YoungWilliams, Aon, Twilio. All partnership quotes — zero deployment metrics. NTT DATA claims "50% faster time to market" (vendor page only, unverified). ([Foundry GA blog](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/building-production-ready-secure-observable-ai-agents-with-real-time-voice-with-/4501074), Mar 2026)

### Microsoft Agent 365 (launches May 1, 2026)
- Dedicated control plane for IT/security to observe, secure, and govern agents
- Unified view across M365 Copilot and Copilot Studio agents
- Part of E7 bundle or standalone add-on ($15/user/month)
- **Three pillars:** observability (Agent Registry), security (Agent ID in Entra), governance (Defender/Purview)
- **Shadow agent detection:** can find and quarantine unsanctioned agents across the environment
- **Microsoft's own deployment:** 500K+ agents found internally, 65K+ responses/day over 28 days ([Microsoft Official Blog](https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/), Mar 2026)
- In 2 months of preview, "tens of millions of agents" appeared in customer registries — unverifiable, likely includes any automated process
- **Agent sprawl stats:** 29% of agents operate without IT/security approval; only 47% of orgs use any security tools for AI (Microsoft Cyber Pulse report, Feb 2026). CoreView: 53% of admin teams say AI is outpacing governance ([CoreView](https://www.coreview.com/blog/least-privilege-for-ai-in-microsoft-365-why-shadow-ai-is-a-real-risk); [VentureBeat](https://venturebeat.com/technology/microsoft-says-ungoverned-ai-agents-could-become-corporate-double-agents-its), Mar 2026)
- **Governance for agents that don't yet exist in production** — but the shadow agent problem IS real and independently confirmed
- **Licensing ambiguity confirmed by MVP analysis:** Agents don't map 1:1 to users — unclear whether orgs license builders or users. "The commercial model is still catching up with the technology." Pricing "fluid" during preview. 25 free licenses for Frontier program orgs through Dec 2026. ([Rob Quickenden](https://robquickenden.blog/2026/03/agent-365-nears-ga/), practitioner direct, Mar 2026)
- **"Tens of thousands" of customers in preview** (vendor claim, Mar 2026). "Tens of millions of agents" in registry in 2 months — likely includes any automated process, not just agentic.
- **March 2026 governance controls shipping:** Granular AI policy at department/group/individual level. Audit logs include prompts, model IDs, data accessed. GDPR-relevant. AI+security features become standard in M365 subscriptions July 1, 2026. ([Windows News](https://windowsnews.ai/article/power-platform-march-2026-update-agentic-apps-enhanced-governance-and-ai-development-acceleration.405823), Mar 2026)
- **Ecosystem lock-in limitation (independently confirmed):** Entro Security analysis: "fundamentally anchored to the Microsoft ecosystem... enterprise agents don't confine themselves to one identity plane or one cloud runtime." Agent 365 governs M365/Azure/Entra agents — blind to Salesforce, Snowflake, Slack agents. ([Entro Security](https://entro.security/blog/microsoft-agent-365-pushes-ai-identity-forward-but-enterprise-agents-still-need-cross-environment-governance/), practitioner analysis, Mar 2026)

## Personal → Team → Company Progression

| Level | Microsoft product | Maturity | Evidence |
|-------|------------------|----------|----------|
| Personal | Copilot in M365 (lite agents) | Shipping | Business users can build Q&A bots. Reliability issues (crashes, memory loss). No agentic use evidence. |
| Personal (memory) | Copilot Memory | Shipping | Persists user prefs across sessions. Personal Copilot only — does NOT work with Copilot Studio agents. |
| Personal (agentic) | Copilot Cowork | Research Preview | Claude-powered multi-step. No independent user reports. Not broadly available. |
| Team | Copilot Studio (full) | Shipping | Requires developer skills (Power Automate). One practitioner demo (edison365). No production deployment evidence. |
| Team (pre-built) | Dynamics 365 agents | Shipping | HR, Sales, Finance agents exist but only for Dynamics 365 customers. Dow mentioned in vendor marketing (no specifics). |
| Company | Azure Foundry Agent Service | **GA March 16, 2026** | Private networking, multi-model, evaluations GA. Prompt + Workflow agents GA; Hosted Preview. Corvus Energy named (no metrics). |
| Company (security) | Entra Agent ID | Preview → Agent 365 | Dedicated agent identity type. Least-privilege by default. Part of Agent 365 governance. |
| Company (CUA) | Copilot Studio CUA | Preview | Multi-model (OpenAI + Claude Sonnet 4.5). Windows 365 for Agents. Session replay/audit. US-only. Zero deployments. Academic benchmark (UI-CUBE): complex workflows 9-19% success vs. 97.9% human ([arXiv](https://arxiv.org/html/2511.17131)). |
| Governance | Agent 365 | Launches May 1, 2026 | 500K agents found at Microsoft. Shadow agent detection. Registry + Agent ID + Defender/Purview. $15/user or E7 ($99/user). |
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
| DLP bypass bug (Jan-Feb 2026)? | **Level 3 convergence.** CW1226324: Copilot work tab read/summarized confidential-labeled emails from Sent Items/Drafts despite DLP blocks. Detected Jan 21, fixed late Feb. UK NHS flagged internally (INC46740412). Root cause: code defect skipping sensitivity label checks. | [The Register](https://www.theregister.com/2026/02/18/microsoft_copilot_data_loss_prevention/), Feb 2026 |
| Copilot Studio attack vectors? | **Tenable validated.** Microsoft Defender published top 10 misconfigurations: unauthenticated agents, maker-credential auth (agent uses builder's access), orphaned agents, prompt injection via email. Tenable independently validated SSRF via HttpRequestAction and "CoPhish" token-harvesting. | [MS Security Blog](https://www.microsoft.com/en-us/security/blog/2026/02/12/copilot-studio-agent-security-top-10-risks-detect-prevent/); [Derk van der Woude](https://derkvanderwoude.medium.com/copilot-studio-agent-security-baseline-6df35608ec07), Feb 2026 |
| Entra Shadow AI Detection? | **GA March 31.** Network-layer detection of unknown AI apps. Surfaces unmanaged AI usage. Part of Agent 365 + E7 positioning. | [MS Security Blog](https://www.microsoft.com/en-us/security/blog/2026/03/20/secure-agentic-ai-end-to-end/), Mar 2026 |

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
| Foundry Agent Service | **GA (March 16)** | Private networking, multi-model, evals. Corvus Energy named (no metrics). Zero case studies with outcomes. |
| Entra Agent ID (agent security) | Part of Agent 365 | Dedicated agent identity. Conditional access, least-privilege. Launches May 1. |
| CUA multi-model | Preview | OpenAI + Claude Sonnet 4.5. Windows 365 for Agents. Zero deployments. US-only. |
| Multi-agent orchestration | GA (architecture) | Patterns documented. Zero production deployments found. |
| 1,400+ connectors | Shipping | Mostly point-to-point. No evidence of 5+ connector agent workflows. |
| Agent 365 (governance) | Preview → May 1 GA | 500K agents found at Microsoft. Shadow detection works. No external enterprise reports. |
| E7 bundle ($99/user) | May 1, 2026 | Public preview April. Cowork NOT Day 1 GA — "directional, not deliverable." |
| "90% Fortune 500" using Copilot | Claimed | Seat count, not agent adoption. 3.3% of M365 seats are paid Copilot. |

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
| Cloud Platform | Microsoft Foundry (Agent Service) | PaaS: 3 agent types (Prompt/Workflow/Hosted) | Azure cognitive services + Cosmos DB + Responses API | Prompt: GA. Workflow: GA. Hosted: Preview. Private networking: GA. |
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

### From Wave 3 / GTC deep dive (cycle 18):
- **Foundry Agent Service GA (March 16):** Private networking, multi-model, evaluations all GA. Built on OpenAI Responses API (wire-compatible). Corvus Energy (marine batteries, 1,500 vessels) is first named customer — replacing manual inspections with agent-driven intelligence. But: no metrics, no independent verification. Foundry GA blog contains zero customer case studies with measurable outcomes. ([Foundry GA blog](https://devblogs.microsoft.com/foundry/foundry-agent-service-ga/), Mar 2026)
- **CUA multi-model:** Copilot Studio CUA now supports OpenAI CUA + Anthropic Claude Sonnet 4.5. New: credential management (Key Vault integration, never exposed to model), session replay with screenshots (Purview), Windows 365 for Agents (managed Cloud PC pools, auto-scale, Entra/Intune). Free tier: 2 pools, 50 hours. US-only. Zero named deployments. ([MS Copilot Blog](https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/computer-using-agents-now-deliver-more-secure-ui-automation-at-scale/), Mar 2026)
- **Agent 365 at scale:** Microsoft found 500K+ agents in own environment. Shadow agent detection is the killer feature — 29% of agents operate without IT approval (Cyber Pulse). CoreView confirms: 53% of admin teams say AI outpaces governance. The governance gap is real. ([VentureBeat](https://venturebeat.com/technology/microsoft-says-ungoverned-ai-agents-could-become-corporate-double-agents-its); [CoreView](https://www.coreview.com/blog/least-privilege-for-ai-in-microsoft-365-why-shadow-ai-is-a-real-risk), Mar 2026)
- **Copilot Cowork: still no independent reviews.** "Broader Frontier access in late March" promised but 12 days later, zero practitioner reviews. Cowork is NOT a Day 1 GA feature of E7. Analyst caution: "directional, not deliverable at launch."
- **E7 bundle math improves:** E3 ($36→$39) and E5 ($57→$60) price increases July 1 make E7's $99 bundle more attractive. Components individually: ~$117/user. But: frontline/task workers don't need it — segment carefully. ([CNBC](https://www.cnbc.com/2026/03/09/microsoft-office-365-e7-copilot-ai.html); [Fortune](https://fortune.com/2026/03/09/microsoft-copilot-cowork-ai-agents-anthropic-e7-m365-saas/), Mar 2026)
- **Nordic: fifth consecutive zero.** No Nordic M365 agent deployments. Consulting ecosystem (EY Norway, Capgemini Norway, Arribatec, Sofigate) focused on readiness, not deployment.

### From status check (cycle 21):
- **Copilot Cowork: 21+ days past "late March" promise, still zero reviews.** Either rollout hasn't happened, NDAs are tight, or early testers have nothing notable to report. The absence itself is evidence — this is Microsoft's flagship personal agent product. (source: runs/2026-03-21-cycle21.md)
- **Foundry Agent Service: 5 days post-GA, zero new customers.** No new named customers beyond Corvus Energy. Corvus still has no metrics. Capgemini/KPMG still vendor-blog-only. No practitioner has blogged about deploying Foundry Agent Service. (source: runs/2026-03-21-cycle21.md)
- **CUA, Voice Live API, Workflow Agents: triple zero.** No practitioner reviews of CUA multi-model. Voice Live API still Preview, no GA date. No practitioner building Workflow Agents for business processes. Academic benchmark (UI-CUBE): CUA complex workflows 9-19% success vs. 97.9% human ([arXiv](https://arxiv.org/html/2511.17131)). (source: runs/2026-03-21-cycle21.md)
- **Claude now available for ALL Copilot Studio agent types** (not just CUA). Sonnet 4 + Opus 4.1. Per-agent model selection. EU/EFTA requires admin opt-in. ([MS Copilot Blog](https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/anthropic-joins-the-multi-model-lineup-in-microsoft-copilot-studio/), vendor announcement)
- **Five Level 3 convergence patterns from practitioner community** (3-5 independent sources each):
  1. **Agent 365 governance incomplete at launch** — Quickenden, SAMexpert ("incomplete on day one"), Entro Security, Ragnar Heil (third-party Rencore filling gaps)
  2. **Agent sprawl already real** — Ragnar Heil: one org created 20,000 agents in 6 months; Microsoft: 500K+ internally; Redmond: proliferating across Teams/Planner/SharePoint
  3. **Copilot adoption ~3%** — 15M/450M seats despite heavy discounting. SAMexpert: "$85 needed for adoption"
  4. **DLP/security gaps real** — Redmond: DLP bug exposed confidential email Jan-Feb 2026 ([office365itpros](https://office365itpros.com/2026/02/13/dlp-policy-for-copilot-bug/)); CVE-2026-26144 Excel Copilot data exfiltration ([The Register](https://www.theregister.com/2026/03/10/zeroclick_microsoft_info_disclosure_bug/)); SAMexpert: security features preview at GA
  5. **Licensing model unclear and shifting** — Quickenden: per-user doesn't fit agents; SAMexpert: shift to ARPAA, nobody agrees what "agent" means ([SAMexpert](https://samexpert.com/microsoft-agent-licensing-shift/)); Ragnar Heil: credit system changing ([ragnarheil](https://ragnarheil.de/ai-builder-credits-are-out-copilot-credits-are-in-your-guide-to-microsofts-license-revolution/))
- **Copilot Studio multi-agent broken** — Ragnar Heil: MCP tool invocation fails on child agents, must proxy through parent. "Clunky, unintuitive, feels like a hack." No practitioner contradicts this. ([ragnarheil](https://ragnarheil.de/the-good-the-bad-and-the-ugly-of-copilot-studio-a-brutally-honest-review-going-into-late-2025/), practitioner direct, updated Jan 2026)
- **Nordic: first signal — Corvus Energy (Norwegian).** Corvus Energy (Bergen/Porsgrunn, Norway) is the only named Foundry Agent Service customer — maritime battery inspection across 1,500+ vessels. Evidence is vendor-sourced only (no independent verification, no metrics). But it IS the first Nordic-origin deployment signal after six cycles of absence. For business-user M365 agents (Copilot Studio, M365 Copilot): still zero Nordic deployments. (source: runs/2026-03-21-cycle21.md)

### From cycle 24 (Cowork/Agent 365 status check):
- **Copilot Cowork: "late March" broader access still not shipped.** 21+ days past promise. First practitioner impressions are LinkedIn enthusiasm only — zero user reports with specific outcomes. Vendor exec (Lamanna) using it personally. Level 1 at best.
- **Agent 365 licensing ambiguity will be adoption friction.** MVP Rob Quickenden's analysis: $15/user/month but agent-user mapping undefined. "Commercial model catching up with technology." Pricing "fluid." This licensing confusion pattern is convergent — 5+ practitioners have flagged it across cycles 15-24.
- **Governance controls maturing faster than agents.** March 2026 shipped granular policy controls (per-department/group AI restrictions, prompt audit logs). Governance infrastructure arriving before the agents it governs — consistent pattern.
- **Still zero production business agent deployments.** Seven research cycles, zero independent deployment evidence for M365 business agents. The announcement-to-deployment gap is now the defining feature.

### From cycle 27 (post-GA Foundry reliability, security surface, Cowork status):
- **Foundry Agent Service: post-GA reliability is a real question.** Intermittent JSON parsing failures, Code Interpreter container failures (EastUS2 from Feb 21), multi-region degradation March 9-10. One practitioner evaluating Claude as fallback. Pre-GA limitations (broken RAG grounding, hidden system prompts) unconfirmed as fixed. Private networking breaks Workflow agents (headline GA feature). At day 5 post-GA, the only practitioner signals are bug reports, not success stories. ([MS Q&A](https://learn.microsoft.com/en-us/answers/questions/5789805/azure-ai-foundry-agents-intermittently-failing-wit); [Medium](https://medium.com/@juliansmiles_40140/azure-ai-foundry-agent-service-technical-limitations-6b0f00ff4adc); [GitHub](https://github.com/azure/azure-sdk-for-js/issues/37036), Feb-Mar 2026)
- **Security surface expanding faster than governance.** DLP bypass = Level 3 convergence (Jan-Feb 2026, NHS + Microsoft + multiple security pubs). Copilot Studio top-10 misconfigurations: Tenable independently validated SSRF and CoPhish token-harvesting. Shadow agents at 29%. Governance product (Agent 365) doesn't ship until May 1. Microsoft simultaneously creating the problem and selling the solution. ([The Register](https://www.theregister.com/2026/02/18/microsoft_copilot_data_loss_prevention/); [MS Security Blog](https://www.microsoft.com/en-us/security/blog/2026/02/12/copilot-studio-agent-security-top-10-risks-detect-prevent/), Feb 2026)
- **Copilot Cowork silence is becoming the signal.** 12+ days post-announcement, zero independent reviews. Frontier rollout not confirmed as live. Ethan Mollick skeptical about Microsoft's tendency to "launch and let sit." If zero reviews persist through April, this becomes a structural finding about the product.
- **SemiAnalysis frames the existential threat.** "Claude for Excel effectively is what Copilot for Excel should have been." Azure revenue depends on renting GPUs to companies disrupting Office. ([SemiAnalysis](https://newsletter.semianalysis.com/p/claude-code-is-the-inflection-point), Feb 2026)
- **Entra Shadow AI Detection GA March 31.** Network-layer identification of unknown AI apps. Part of the Agent 365 + E7 sell. ([MS Security Blog](https://www.microsoft.com/en-us/security/blog/2026/03/20/secure-agentic-ai-end-to-end/), Mar 2026)
- **Nordic: seventh consecutive zero** for M365 business agent deployments. Corvus Energy (Foundry) remains the only Nordic signal, vendor-sourced.

### Open questions for next cycles:
- [ ] Hosted Agents: when do they get private networking? This blocks production enterprise use.
- [x] Workflow Agents: any practitioner building multi-step business workflows? **Answer: No independent evidence across 6 cycles.**
- [x] A2A in practice: has anyone connected a Copilot Studio agent to a Foundry agent via A2A? **Answer: No. Preview works, zero real-world connections.**
- [x] Claude in Copilot Studio: expanding beyond Computer Use beta? **Answer: YES — Claude Sonnet 4 and Opus 4.1 now available for ALL Copilot Studio agent types. Per-agent model selection. Also in M365 Copilot, Word, Excel, PowerPoint. EU/EFTA requires admin opt-in.** ([MS Copilot Blog](https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/anthropic-joins-the-multi-model-lineup-in-microsoft-copilot-studio/), vendor press release)
- [x] Copilot Cowork Frontier rollout: early user reports? **Answer: No. 21+ days past "late March" broader access promise. Zero reviews.**
- [x] E7 launch (May 2026): adoption signals? **Answer: No adoption signals. Convergent pricing skepticism from practitioners.**
- [x] Nordic companies: any M365 agent adoption? **Answer: No. Complete absence across 6 cycles.**
- [ ] Copilot Cowork independent reviews — re-check early April. If zero reviews persist through April, this becomes a structural finding.
- [ ] E7 early adoption data — public preview April, GA May 1. Watch May-June 2026.
- [ ] Rob Quickenden, Office365itpros, Cloudpartner.fi — track as independent M365 agent analysts. No new agent content since cycle 18.
- [ ] Foundry Agent Service production deployments — still only Corvus Energy (no metrics). Day 5 post-GA. Named partners (KPMG, NTT DATA, Twilio) are partnership quotes only. Watch 30-90 day window for first independent reports.
- [ ] Foundry reliability: do intermittent failures (JSON parsing, Code Interpreter) persist? Do pre-GA limitations (broken RAG, hidden prompts) get fixed?
- [ ] CUA enterprise adoption — zero practitioner reviews after multi-model + Windows 365 for Agents shipped.
- [ ] Agent 365 external enterprise reports — zero external evidence. Watch post-May 1 GA.
- [ ] Copilot market share: next data point expected from analyst surveys in Q2 2026. 11.5% → where?
- [ ] Voice Live API — Preview, no GA date, zero deployments.
- [ ] **INFLECTION POINT: May 1, 2026** — E7 + Agent 365 GA. If the deployment gap persists through May, it transitions from "early" to "structural."

## Sources

See `runs/` for detailed research logs:
- `2026-03-21-run01.md` — Developer/infrastructure focus
- `2026-03-21-biz01.md` — Business user focus
- `2026-03-21-integ01.md` — Enterprise integration, security, multi-tool
- `2026-03-21-architecture.md` — Architecture deep dive (Foundry vs Copilot Studio)
- `2026-03-21-cycle15.md` — E7 pricing skepticism, Cowork status, A2A, Foundry Workflows, Nordic gap
- `2026-03-21-cycle18.md` — Wave 3/GTC: Foundry GA, Agent 365 at scale, CUA multi-model, Cowork still no reviews, E7 bundle math
- `2026-03-21-cycle21.md` — Status check: Cowork 21+ days no reviews, Foundry 5 days post-GA zero new customers, CUA/Voice/Workflow triple zero, Nordic sixth zero, practitioners waiting not deploying
- `2026-03-21-cycle24.md` — Cowork still Research Preview ("late March" not delivered), Agent 365 licensing ambiguity (Quickenden MVP analysis), governance controls shipping ahead of agents, seventh consecutive zero for production deployments
