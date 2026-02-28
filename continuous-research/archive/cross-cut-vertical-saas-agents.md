# Cross-Cut: Vertical SaaS Platforms Embedding AI Agents

**Research date:** 2026-02-21
**Focus:** Which enterprise software platforms are shipping agentic capabilities as standard features?
**Why this matters:** This is the biggest chasm-crossing mechanism. Agents arrive inside tools companies already use, not as standalone AI projects. When SAP ships a finance agent, every S/4HANA customer gets agent capability without building anything.

---

## Summary Matrix

| Platform | Domain(s) | GA Status | Customer Base | No-Code Creation | Nordic Relevance |
|----------|-----------|-----------|---------------|------------------|------------------|
| **Salesforce Agentforce** | CRM, Service, Sales, Commerce | GA (Spring '26) | 18,500 deals (9,500 paid); 150K total Salesforce customers | Yes (Agentforce Builder) | High — offices in all Nordic capitals |
| **HubSpot Breeze** | CRM, Marketing, Sales, Service | GA | ~228K customers globally | Yes (Breeze Studio) | Medium — strong in Nordic SMB/mid-market |
| **Zendesk AI Agents** | Customer Service | GA | 100K+ Zendesk customers | Yes (Admin tools) | Medium — widely used in Nordic tech companies |
| **SAP Joule** | ERP, Finance, SCM, HR | Mixed (Joule Studio GA Q1 2026; HR agents GA May 2026) | 400K+ SAP customers globally | Yes (Joule Studio) | Very High — ~800 employees in Nordic & Baltic unit |
| **Microsoft Dynamics 365** | ERP, CRM, Finance, Commerce | GA / Preview (rolling) | Massive (24% global ERP share) | Yes (Copilot Studio) | Very High — dominant in Nordic enterprise |
| **Oracle Fusion Cloud** | ERP, Finance, HCM, SCM, CX | GA (40+ agents in Release 26A) | 10K+ Fusion Cloud customers | Yes (AI Agent Studio) | Medium — present but SAP/Microsoft dominate |
| **Workday Illuminate** | HR, Finance, Workforce Mgmt | Early GA / Rolling (early 2026) | 10,500+ customers globally | Yes (AgentBuilder) | Medium — growing; 55+ Nordic clients via partners |
| **SAP SuccessFactors** | HR, Talent, Payroll | Preview (GA May 2026) | Part of 400K+ SAP base | Via Joule Studio | Very High — SAP's Nordic dominance extends to HCM |
| **ServiceNow** | ITSM, HRSD, CSM, Security | GA (Now Assist + AI Agents) | 8,100+ customers globally | Yes (AI Experience tools) | High — Sofigate alone has 250+ Nordic clients |
| **Microsoft Copilot Studio** | Cross-domain agent builder | GA | 400M+ Microsoft 365 users | Yes (core purpose) | Very High — near-universal in Nordic enterprise |
| **Thomson Reuters CoCounsel** | Legal, Compliance | GA (US); UK expanding | Thomson Reuters legal customer base | Limited (workflow customization) | Medium — used by Nordic law firms on Westlaw |
| **Relativity aiR** | Legal, eDiscovery | GA (included in base RelativityOne) | RelativityOne customer base | No (AI-assisted, not agent builder) | Low-Medium — niche legal/compliance |

---

## Individual Platform Profiles

### 1. Salesforce Agentforce

**Domain:** CRM, Customer Service, Sales, Commerce
**GA Status:** GA. Spring '26 release (Feb 23, 2026) adds Agentforce Builder, Voice agents, Agentic Order Routing, Agentic Enterprise Search.
**Customer reach:** 18,500 implementations at various stages; 9,500 paid deals. Growing ~50% quarter-over-quarter. ~$540M ARR from Agentforce alone.

**What agents can do:**
- Agentforce Builder: build, test, refine agents in a single conversational workspace with AI guidance, low-code canvas, or pro-code
- Voice agents (Financial Services GA): resolve banking/collections inquiries at scale
- Agentic Order Routing: detect unfulfillable orders, auto-reroute based on logic
- Agentic Enterprise Search: search, collaborate, act across 200+ external sources, coordinate multiple agents
- Contact Center (H1 2026 GA): end-to-end with Google telephony + Service Cloud

**No-code creation:** Yes. Agentforce Builder is explicitly designed for business users — conversation-based agent creation with autocomplete and low-code canvas.
**Nordic relevance:** High. Offices in Stockholm, Oslo, Copenhagen, Espoo. Active partner ecosystem (Axenon, TTMS, Capgemini). Norway Post is a notable enterprise customer (500+ agents on Service Cloud).

**Sources:**
- https://www.salesforce.com/news/stories/spring-2026-product-release-announcement/
- https://venturebeat.com/technology/while-everyone-talks-about-an-ai-bubble-salesforce-quietly-added-6-000
- https://diginomica.com/agentforce-users-now-number-18500-salesforce-turns-109-billlon-quarter

---

### 2. HubSpot Breeze

**Domain:** CRM, Marketing, Sales, Customer Service
**GA Status:** GA. Four core agents fully supported. GPT-5 migration underway for Breeze Studio agents.

**What agents can do:**
- Customer Agent: answers support questions, resolves tickets, supports 9 channels (WhatsApp, SMS, Voice/Calling in beta)
- Prospecting Agent: research and engagement for sales
- Data Agent: data enrichment and prompt-based queries
- Content Agent: multi-channel content creation
- Run Agent workflow action: trigger AI agents directly within HubSpot workflows
- Additional marketplace agents: Deal Loss, Customer Health, Customer Handoff, Social Post

**No-code creation:** Yes. Breeze Studio lets business users create and configure agents.
**Pricing:** Usage-based credits (100 credits per Customer Agent conversation, 100 per monitored Prospecting contact/month, 10 per Data Agent prompt).
**Nordic relevance:** Medium. HubSpot is popular with Nordic SMBs and mid-market companies, less dominant in large enterprise.

**Sources:**
- https://www.hubspot.com/products/artificial-intelligence/breeze-ai-agents
- https://www.onthefuze.com/hubspot-insights-blog/hubspot-breeze-ai-agents-2026

---

### 3. Zendesk AI Agents

**Domain:** Customer Service, Support
**GA Status:** GA. Post-Ultimate.ai acquisition (2024), fully integrated.

**What agents can do:**
- Automate up to 80% of support requests using GPT-5 (OpenAI collaboration)
- Voice AI Agents: fully autonomous, understand natural speech, verify identity, track orders, update deliveries, multilingual
- Knowledge Builder: AI creates knowledge base from past tickets
- Knowledge Connectors: integrate Confluence, Google Drive, SharePoint
- Action Builder and App Builder for custom workflows
- Admin Copilot for agent management

**No-code creation:** Yes. Admin tools, Knowledge Builder, Action Builder enable configuration without coding.
**Nordic relevance:** Medium. Widely used by Nordic tech companies and SaaS businesses. Ultimate.ai was Berlin-based with strong European multilingual capabilities — relevant for Nordic language support.

**Sources:**
- https://www.zendesk.com/newsroom/press-releases/zendesk-unveils-powerful-new-ai-capabilities-within-the-resolution-platform-to-accelerate-service-at-scale/
- https://venturebeat.com/ai/zendesk-launches-new-ai-capabilities-for-the-resolution-platform-creating

---

### 4. SAP Joule

**Domain:** ERP, Finance, Supply Chain, HR (via SuccessFactors), Procurement
**GA Status:** Mixed. Joule Studio (agent builder) GA Q1 2026. Individual agents rolling out through 2026.

**What agents can do:**
- **Finance:** Cash management agent (reconciliation, surplus/shortage detection — GA Q1 2026), International trade classification agent (tariff codes, compliance — beta)
- **Supply Chain:** Production Planning agent (validate/release orders — GA Q1 2026), Order reliability agent (detect fulfillment risks, initiate corrective actions — Q2 2026)
- **HR (SuccessFactors):** Career & Talent Development agent, HR Service agent, People Intelligence agent, Payroll agent (all GA May 2026)
- **Process:** Joule with SAP Signavio (process mining conversation) — GA Feb 2026
- **Deep Research:** multi-domain complex questions synthesizing internal SAP data + external intelligence

**No-code creation:** Yes. Joule Studio enables custom AI agent and skill creation using SAP's built-in business knowledge.
**Customer base:** 400,000+ SAP customers globally. Joule is being embedded across the entire SAP portfolio.
**Nordic relevance:** Very High. SAP has ~800 employees in the Nordic & Baltic Market Unit covering Denmark, Estonia, Finland, Iceland, Latvia, Lithuania, Norway, Sweden. SAP is a dominant ERP provider in large Nordic enterprises. Active Norwegian SAP User Group (SBN). Many large Nordic industrials and retailers run SAP.

**Sources:**
- https://aimultiple.com/sap-ai-agents
- https://news.sap.com/2025/10/sap-connect-business-ai-new-joule-agents-embedded-intelligence/
- https://sapinsider.org/articles/new-joule-agents-coming-to-bolster-ai-in-sap-successfactors/
- https://news.sap.com/2026/02/process-conversation-joule-sap-signavio-solutions-generally-available/

---

### 5. Microsoft Dynamics 365 + Copilot Studio

**Domain:** ERP, CRM, Finance, Commerce, Field Service, Project Operations
**GA Status:** GA and rolling. Copilot and AI agents available across Sales, Customer Service, Customer Insights, Finance, Project Operations, Field Service. Commerce MCP Server in preview Feb 2026.

**What agents can do:**
- **Dynamics 365 agents:** Copilot experiences embedded across all modules — Sales, Customer Service, Finance, Supply Chain, Project Ops, Field Service
- **Commerce:** Dynamics 365 Commerce MCP Server allows AI agents to discover, decide, execute retail workflows across digital/physical/conversational channels
- **Copilot Studio (separate but tightly linked):** Conversation-based agent creation for business users. Agent Store with pre-built agents (e.g., Employee Self-Service Agent). Full governance via Agent 365 control plane — lifecycle management, evaluations, enterprise controls.
- **Agent 365:** Unified view of all agents across Microsoft 365 Copilot and Copilot Studio

**No-code creation:** Yes. Copilot Studio is purpose-built for business users — "conversation became the agent-making interface." Low barrier to entry.
**Customer base:** Massive. Microsoft Dynamics has ~24% global ERP market share. Microsoft 365 has 400M+ users.
**Nordic relevance:** Very High. Microsoft is near-universal in Nordic enterprise IT. Dynamics 365 is widely deployed, especially in mid-to-large enterprises. Nordomatic (Scandinavia-wide) is a customer story. Pre-certified for Swedish public sector procurement. Strong partner ecosystem.

**Sources:**
- https://learn.microsoft.com/en-us/dynamics365/copilot/ai-get-started
- https://www.microsoft.com/en-us/microsoft-copilot/blog/copilot-studio/6-core-capabilities-to-scale-agent-adoption-in-2026/
- https://www.microsoft.com/en-us/microsoft-365/blog/2025/11/18/microsoft-ignite-2025-copilot-and-agents-built-to-power-the-frontier-firm/

---

### 6. Oracle Fusion Cloud

**Domain:** ERP, Finance, HCM, Supply Chain, CX
**GA Status:** GA. 40+ agents added in Release 26A (Feb 2026). AI Agent Studio GA.

**What agents can do:**
- **Finance:** Payables Agent (inbound invoices), Ledger Agent (financial management/visibility), Planning Agent (planning processes), Payments Agent (outbound payment optimization)
- **New in 26A:** Source-to-Settle Assurance Advisor, Record-to-Report Assurance Advisor, Access Request Assistant
- **CX:** Marketing, Sales, Service agents (Feb 2026)
- **AI Agent Studio:** Customers and partners create custom agents. AI Agent Marketplace for validated partner-built agents.
- All pre-built agents integrate natively with Fusion Cloud ERP and EPM **at no extra cost**.

**No-code creation:** Yes. AI Agent Studio for Fusion Applications.
**Nordic relevance:** Medium. Oracle has presence in Nordic enterprise but SAP and Microsoft dominate the ERP space. More common in very large multinationals.

**Sources:**
- https://siliconangle.com/2026/02/10/oracle-adds-40-agents-fusion-cloud-suite/
- https://www.oracle.com/news/announcement/ai-world-oracle-advances-enterprise-ai-with-new-agents-across-fusion-applications-2025-10-15/
- https://blogs.oracle.com/fusioninsider/roadmaps

---

### 7. Workday Illuminate

**Domain:** HR, Finance, Workforce Management, Industry-specific (Higher Education)
**GA Status:** Early GA / Rolling. Several agents available to early adopters end-2025, generally available early 2026. Flex Credits pricing model active.

**What agents can do:**
- **Finance:** Cost & Profitability Agent (natural language allocation rules), Financial Close Agent (automates close steps, real-time status)
- **HR:** Business Process Copilot Agent (automate HR process setup), Case Agent (routine case resolution), Employee Sentiment Agent (analyze feedback at scale)
- **Workforce:** Contingent Sourcing Agent (temporary hiring, screening), Frontline Agent (text-based absence reporting, find replacements, compliance), Document Intelligence for Contingent Labor
- **Industry:** Academic Requirements Agent, Student Administration Agent (higher education)
- **Planning Agent:** Early access customers report 30% reduction in data exploration, ~100 hours/month saved
- **Financial Audit Agent:** Saves up to 900 hours/year automating audit evidence collection

**No-code creation:** Yes. AgentBuilder for custom agents.
**Pricing:** Flex Credits — included in every subscription, applied across agents and platform innovations.
**Nordic relevance:** Medium and growing. 55+ Nordic clients through partners (Kainos Copenhagen). Vivicta operates as Nordic Workday services partner. Workday acquired Danish HR tech startup Peakon for $700M, indicating Nordic investment. More common in progressive Nordic organizations with cloud-first HR strategy.

**Sources:**
- https://www.prnewswire.com/news-releases/workday-illuminate-expands-with-new-ai-agents-for-hr-finance-and-industry-302557725.html
- https://www.techtarget.com/searchhrsoftware/news/366625056/Workday-adds-seven-agents-to-Illuminate-platform
- https://futurumgroup.com/insights/workday-rising-2025-ai-agents-data-cloud-and-flex-credits-unveiled/

---

### 8. ServiceNow (Now Assist + AI Agents)

**Domain:** ITSM, HRSD, CSM, Security Operations, cross-enterprise workflows
**GA Status:** GA. AI Experience (AIx) platform with five agentic capability types. Moveworks acquisition completed Dec 2025 ($2.85B).

**What agents can do:**
- **AI Experience (AIx):** Five capability types — AI Web Agents, AI Voice Agents, Build Agents, AI Data Explorer, AI Lens
- **AI Web Agents:** Learn from humans to complete tasks across third-party apps (click buttons, fill forms, navigate internal sources) — no APIs required
- **AI Voice Agents:** Hands-free support, information retrieval, record updates, troubleshooting
- **Autonomous workflow execution:** Diagnose, plan, execute multi-step workflows autonomously
- **Pre-defined AI Agents:** Aligned to common business use cases, activatable
- **Moveworks integration:** Front-end AI assistant + enterprise search. 90% autonomous IT resolution, 89% autonomous customer support resolution. Targets 40% reduction in resolution times across IT, HR, service desk.

**No-code creation:** Yes. Build Agents capability. Pre-defined agents for activation.
**Nordic relevance:** High. Sofigate (Finland-founded, leading Nordic ServiceNow partner) has 250+ clients, 800 employees, EUR 145M revenue. Active Finland SNUG (user group). Advania (1,500 employees across Sweden, Iceland, Norway, Denmark). Deeply embedded in Nordic enterprise IT operations.

**Sources:**
- https://www.servicenow.com/products/ai-agents.html
- https://www.kellton.com/kellton-tech-blog/servicenow-agentic-ai-2026-guide
- https://www.moveworks.com/us/en/resources/blog/servicenow-moveworks-acquisition-closed

---

### 9. Thomson Reuters CoCounsel Legal

**Domain:** Legal research, compliance, document review
**GA Status:** GA in US (early 2026). UK expansion announced Jan 2026. Agentic workflows in beta.

**What agents can do:**
- Agentic workflows: independently execute complex legal tasks from a single prompt
- Interpret request, determine optimal approach, execute complete workflow using Westlaw + Practical Law content + firm's institutional knowledge
- Customizable workflow plans shareable across practice groups
- Bulk document review (up to 10,000 documents)
- Deep Research capabilities on Practical Law
- Noetica acquisition: AI-powered transactional analytics and benchmarking integrated

**No-code creation:** Limited. Workflow customization via prompt, not full agent builder.
**Nordic relevance:** Medium. Thomson Reuters Westlaw and Practical Law are used by Nordic law firms, but legal AI adoption in the Nordics is still early. More relevant for large international firms with Nordic operations.

**Sources:**
- https://www.prnewswire.com/news-releases/thomson-reuters-advances-ai-market-leadership-with-new-agentic-ai-solutions-302603228.html
- https://www.legalreader.com/thomson-reuters-expands-cocounsel-legal-to-uk-continuing-its-transformation-of-legal-work-with-agentic-ai-innovation/

---

### 10. Relativity aiR for Review

**Domain:** Legal eDiscovery, document review, privilege review
**GA Status:** GA. Included in base RelativityOne offering (no extra cost) as of 2026.

**What agents can do:**
- Simulate and accelerate human reviewer actions using LLMs
- Find and describe relevant documents according to review instructions
- Provide transparent rationale with citations from documents
- Review up to 85% faster than linear/TAR alternatives
- Uncover 10-20% more relevant documents
- aiR for Review + aiR for Privilege both included in standard offering

**No-code creation:** No. AI-assisted review tool, not an agent builder. Users configure review instructions.
**Nordic relevance:** Low-Medium. Relativity is a niche tool used primarily by law firms and corporations for eDiscovery. Some Nordic adoption in cross-border litigation contexts.

**Sources:**
- https://www.relativity.com/data-solutions/air/review/
- https://www.prnewswire.com/news-releases/relativity-fest-2025-relativity-announces-generative-ai-solutions-for-legal-review-to-be-standard-in-cloud-offering-302578299.html

---

## Key Insights

### 1. Which platforms are furthest along?

**Tier 1 — Shipping at scale (GA, large customer base, multiple agents):**
- **Salesforce Agentforce** — 18,500 implementations, $540M ARR, full agent builder, broadest CRM agent suite
- **Microsoft (Dynamics 365 + Copilot Studio)** — Largest reach by far (400M+ Microsoft 365 users), agents embedded in every Dynamics module, Copilot Studio as universal no-code agent builder
- **ServiceNow** — GA across ITSM/HRSD/CSM, $2.85B Moveworks acquisition for front-end AI, 90% autonomous IT resolution claimed

**Tier 2 — Shipping rapidly, agents rolling GA (Q1-Q2 2026):**
- **SAP Joule** — Joule Studio GA, individual domain agents rolling out Q1-Q2 2026, 400K customer base makes every GA release a massive chasm-crossing event
- **Oracle Fusion Cloud** — 40+ agents in Release 26A, AI Agent Studio + Marketplace, at no extra cost
- **Workday Illuminate** — 10+ agents across HR/Finance/Workforce, Flex Credits pricing reducing adoption friction

**Tier 3 — Domain-specific, narrower scope:**
- **HubSpot Breeze** — GA but focused on SMB CRM/marketing segment
- **Zendesk** — GA for customer service only, strong multilingual
- **Thomson Reuters CoCounsel** — Legal-specific, early global expansion
- **Relativity aiR** — Legal eDiscovery niche, included in base offering

### 2. Where is the concentration?

The agent concentration is heaviest in three domains:
1. **Customer Service / CRM** — Every major CRM vendor (Salesforce, HubSpot, Zendesk, Dynamics 365, Oracle CX, ServiceNow CSM) ships agents. This is the most mature domain.
2. **IT Operations** — ServiceNow + Microsoft dominate. Near-autonomous incident resolution is production-ready.
3. **Finance / ERP** — SAP, Oracle, Microsoft Dynamics, Workday all shipping finance agents. Cash management, close automation, audit, and planning are the beachhead use cases.

The **least served** domains by embedded agents are:
- **Compliance** (Thomson Reuters and Relativity are niche; no broad enterprise compliance agent platform yet)
- **HR** beyond service desk (SAP SuccessFactors and Workday HR agents are still GA May 2026 or later)
- **Sales** (beyond CRM Copilot — autonomous prospecting/deal agents are mostly preview)

### 3. The pricing shift is critical

Three pricing patterns are emerging that accelerate chasm-crossing:
- **Included in base subscription:** Oracle (no extra cost), Relativity (included in RelativityOne), Microsoft (Copilot in Dynamics 365 licenses)
- **Credit-based / consumption:** Workday Flex Credits, HubSpot Breeze credits, Salesforce (per-conversation pricing)
- **Add-on / premium:** Thomson Reuters CoCounsel, some Salesforce advanced agents

The "included in base" model is the most powerful chasm-crossing mechanism — customers get agents without making a separate purchase decision.

### 4. No-code agent creation is now table stakes

Every major platform except Relativity offers some form of no-code or low-code agent creation:
- **Copilot Studio** (Microsoft) — conversation-based
- **Agentforce Builder** (Salesforce) — conversational + low-code canvas
- **Joule Studio** (SAP) — custom agents with SAP business knowledge
- **AI Agent Studio** (Oracle) — build, test, deploy
- **AgentBuilder** (Workday) — custom agent creation
- **Build Agents** (ServiceNow) — within AIx platform

This means business users can extend platform-shipped agents with custom ones. The barrier between "platform-provided agent" and "custom agent" is dissolving.

---

## Nordic Implications

### Which platforms dominate in Nordic enterprises?

**Tier 1 — Near-universal in large Nordic enterprise:**
- **Microsoft 365 / Copilot Studio** — Every Nordic enterprise uses Microsoft. Copilot Studio is the default agent-building platform. This is the single most important chasm-crossing vector for Nordic companies.
- **SAP** — Dominant ERP in large Nordic industrials, retailers, energy companies. 800 employees in Nordic & Baltic unit. When Joule agents go GA, this reaches deep into Nordic enterprise operations. Large Finnish, Swedish, Norwegian companies running S/4HANA will get finance and supply chain agents automatically.

**Tier 2 — Widely deployed:**
- **Salesforce** — Strong in Nordic enterprise CRM. Offices in all four Nordic capitals. Norway Post (500+ agents on Service Cloud) is an enterprise reference.
- **ServiceNow** — Deep penetration in Nordic enterprise IT. Sofigate (Finland-born, 250+ clients, EUR 145M revenue) is a leading partner. Finnish user group (SNUG) is active.
- **Microsoft Dynamics 365** — Strong in Nordic mid-to-large enterprise, especially in segments where full SAP is too heavy. Pre-certified for Swedish public sector.

**Tier 3 — Present but not dominant:**
- **Workday** — Growing, 55+ Nordic clients, Peakon (Danish) acquisition shows Nordic commitment. More common in cloud-first HR organizations.
- **HubSpot** — Strong in Nordic SMB and growth companies, less in large enterprise.
- **Oracle** — Present in very large multinationals with Nordic operations, but secondary to SAP/Microsoft.
- **Zendesk** — Common in Nordic tech/SaaS companies for customer support.
- **Thomson Reuters** — Used by Nordic law firms, niche.

### What this means for Nordic buyers

1. **The agents are coming whether you plan for them or not.** If your organization runs SAP, Microsoft 365, Salesforce, or ServiceNow — and most large Nordic enterprises run at least two of these — AI agents will appear in your tools through normal platform updates in 2026.

2. **Microsoft is the universal vector.** Every Nordic enterprise employee will have access to Copilot and potentially Copilot Studio. This is the single largest agent deployment mechanism in the region.

3. **SAP is the operations vector.** For large Nordic industrials, SAP Joule agents in finance and supply chain are the most impactful because they touch core business processes, not just productivity tools.

4. **The competence gap is real and imminent.** These agents are shipping Q1-Q2 2026. Most Nordic enterprises have not trained their people on what agents are, how they work, or how to govern them. The gap between "agents available" and "organization ready" is the exact gap our training addresses.

5. **No-code agent creation means everyone is an agent builder.** With Copilot Studio, Agentforce Builder, and Joule Studio all offering no-code creation, the question shifts from "can we build agents?" to "should we, and how do we govern them?" This is a training and governance challenge, not a technology challenge.

---

*Tagged: Global + Nordic. Sources: Web research Feb 2026. All platforms verified against official announcements and press releases.*
