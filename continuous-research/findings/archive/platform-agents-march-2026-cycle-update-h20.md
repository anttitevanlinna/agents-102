# Platform Agents — March 2026 Cycle Update (Hour 20)

*Cycle update building on platform-agents-march-2026-cycle-update.md. Research date: March 23, 2026, 20:00 UTC.*

---

## Summary of New Signals This Cycle

**Six significant developments found:**
1. **Workday acquired Sana Labs ($1.1B) → "Sana from Workday" launched March 17.** Three Nordic early adopters named (Berner Finland, Cheffelo Sweden, Telavox Sweden). This is the most significant platform development this cycle.
2. **Morgan Stanley MCP in production (Level 2).** First major bank demonstrating MCP in production API infrastructure (100+ APIs). Presented at QCon London. Non-coding business process.
3. **Spotify multi-agent advertising system in production (Level 2).** Media plan creation 15-30 min → 5-10 seconds. Built on Google ADK + Gemini. Non-coding domain.
4. **Salesforce Agentforce Sales — first non-customer-service GA use case.** Six specialized sales agents, Salesforce's own deployment: 130K untouched leads → 3,200 opportunities in 4 months.
5. **Microsoft Agent 365 — governance separated from building.** New $15/user SKU for agent fleet governance, GA May 1. D365 Business Central Payables Agent named as concrete agentic ERP example.
6. **ACP absorbed into A2A under Linux Foundation.** Protocol landscape simplified to two families: MCP (agent-to-tool) and A2A (agent-to-agent).

**Persistent gaps confirmed:**
- Copilot Cowork: still zero practitioner reviews (26th consecutive cycle)
- ServiceNow Autonomous Workforce: still zero practitioner reviews (4 weeks post-launch)
- Oracle Fusion agents: still zero deployment evidence despite 26A roster expansion
- A2A: still zero independent production deployments despite 150+ orgs committed

---

## Platform Updates

### 1. Workday + Sana Labs Acquisition — MAJOR PLATFORM SHIFT

**Previous assessment:** "Workday Illuminate — zero practitioner evidence."

**Updated assessment:** Workday acquired Sana Labs for $1.1B (closed November 2025). On March 17, 2026, launched **"Sana from Workday"** — three products:

1. **Sana for Workday** — replaces traditional Workday navigation with conversational AI interface. 300+ skills covering HR and finance. Available to all Workday customers via Flex Credits.
2. **Sana Self-Service Agent** — automates HR and finance workflows. 400+ customers in early access.
3. **Sana Enterprise** — extends beyond Workday. 18 connectors (Gmail, Google Drive, Jira, Notion, Outlook, Slack, Salesforce, SharePoint, ServiceNow).

- Source: https://newsroom.workday.com/2026-03-17-Introducing-Sana-from-Workday-Superintelligence-for-Work-That-Finds-Answers,-Takes-Action,-and-Automates-Workflows [vendor press release — Level 0]
- Source: https://siliconangle.com/2026/03/17/workday-introduces-ai-knowledge-discovery-work-automation-platform-sana/ [general press — bare facts]
- Source: https://www.hr-brew.com/stories/2026/03/17/workday-announces-new-ai-powered-capabilities-powered-by-sana-acquisition [domain trade publication]

#### Nordic Customer Evidence — Named Individuals (Level 0 source, Level 2 potential)

Three Nordic companies cited as early adopters with named individuals:

**Berner (Finland)** — Finnish B2B distribution company
- Named: Joona Honka, Head of AI and Analytics
- Claim: 90% adoption within 40 days; retired 400 ChatGPT licenses
- Nordic label: Nordic-origin deployment (Finnish company)

**Cheffelo (Sweden)** — Nordic meal-kit company
- Named: Anton Nytorp, CTO
- Claim: "Sana is our AI backbone — the place where work starts, knowledge lives, and agentic workflows run in the background"
- Nordic label: Nordic-origin deployment (Swedish company)

**Telavox (Sweden)** — B2B communications company
- Named: Alexander Bergström, GTM Lead
- Claim: "We've gone from 'Can we automate this one task?' to 'How should this entire process work if we assume Sana can handle 80% of the execution?'"
- Nordic label: Nordic-origin deployment (Swedish company)

**Evidence level:** Level 0 (vendor press release) but with named individuals making specific claims. Berner's "90% adoption / 400 ChatGPT licenses retired" is concrete enough to warrant independent verification. Upgrade path: search LinkedIn activity for Joona Honka, Anton Nytorp, Alexander Bergström.

**Assessment:** Sana from Workday is the most significant Nordic-relevant platform development this cycle. Three named Nordic companies with named individuals is more specificity than any other platform has produced for the Nordic market. The Sana Labs acquisition means the most promising Nordic AI company in the HR/knowledge space is now part of Workday's platform — a loss for Nordic independence but a gain for Workday's enterprise story.

**Finding category:** Platform Announcement with Nordic customer signals. Not yet independently verified as Production Agentic.

---

### 2. Salesforce Agentforce Sales — First Non-CS Use Case (March 16)

**Previous assessment:** "No Agentforce beyond customer service."

**Updated assessment:** Six specialized sales agents announced, most GA now:
- Prospecting Agent — identifies and ranks leads (GA March 31)
- Engagement Agent — nurtures leads and schedules meetings autonomously
- Account Research & Meeting Prep Agent — generates briefings
- Pipeline Management Agent — updates CRM, recommends next actions
- Quoting Agent — generates compliant quotes within governed workflows
- Partner Success Agent — 24/7 channel partner guidance

**Salesforce's own deployment (vendor claim, Level 0):** Contacted 130,000 untouched leads, created 3,200 opportunities in four months (2.5% conversion rate).

Named customers (vendor-curated): Equinox, Equipter, HackerOne — no measurable outcomes beyond quotes.

- Source: https://www.salesforce.com/news/stories/agentforce-sales-announcement/ [vendor press release — Level 0]

**Evidence level:** Level 0 (vendor announcement). The 130K/3,200 ratio is specific enough to be a meaningful signal if independently verified. Watch for practitioner confirmation.

**Finding category:** Platform Announcement — first Agentforce expansion beyond customer service.

---

### 3. Agentforce SMB — Free Tier + Practitioner First Impressions (March 18)

**Previous assessment:** No SMB-specific Agentforce coverage.

**Practitioner review (Level 2):** Christine Marshall (12x Salesforce MVP) tested free Agentforce for Small Business:
- Setup in under 30 seconds, no configuration required
- AI Record Summaries work across Accounts, Contacts, Opportunities, Cases, Leads
- Email drafting with tone adjustment: "more natural, more human, and much closer to something I'd actually send"
- **Hard constraint:** No access to Agent Builder or Prompt Builder
- Locked to 4 predefined actions only (QueryRecords, GetActivitiesTimeline, ExtractFieldsAndValuesFromUserInput, plus one more)

**Anti-pattern identified (Level 2):** "Metered AI pricing as experimentation tax" — consumption billing kills adoption before learning curve develops. Salesforce corrected this for SMB by embedding AI without metering.

- Source: https://www.salesforceben.com/free-agentforce-for-small-business-an-admins-first-impressions/ [practitioner direct]
- Source: https://salesforcedevops.net/index.php/2026/03/18/agentforce-smb-suites-ai-paywall-breaking/ [practitioner analysis]

**Evidence level:** Level 2 (practitioner direct). Marshall is a credible independent voice.

**Finding category:** Production Agentic (limited scope — 4 actions only).

---

### 4. Agentforce Healthcare — MIMIT Health + 6 New Agents (March 5)

Six new Healthcare agents announced:
1. Referrals & Assessments Agent
2. EHR Read-Write Agent (bidirectional via MuleSoft)
3. Claims & Coverage Agent (self-service)
4. Rural Health Agent (video visits, provider recruitment)
5. Epidemiology Analysis Agent
6. Hospital Operations Agent (beds, equipment, nursing staffing)

**MIMIT Health outcome (vendor claim):** 459% ROI, $1.5M savings. No independent verification.

Named healthcare organizations: CVS, HammondCare, Northwell, NYU Langone, RUSH, UChicago Medicine.

- Source: https://www.salesforce.com/news/stories/agentforce-health-agents-for-harmonizing-medical-information/ [vendor press release — Level 0]

**Evidence level:** Level 0 (vendor announcement).

---

### 5. Salesforce + NVIDIA — Regulated Industries (March 16)

NVIDIA Nemotron 3 Nano: 1M token context window. On-premises deployment option for data residency. Target: financial services, healthcare compliance agents.

- Source: https://www.salesforce.com/news/stories/nvidia-nemotron-regulated-industries-announcement/ [vendor press release — Level 0]

**Nordic relevance:** On-premises option addresses Nordic data residency requirements (GDPR, financial regulations). Capability signal, not deployment evidence.

---

### 6. Microsoft — Agent 365 Governance SKU + Frontier Suite (March 9)

**New developments:**

**Agent 365 ($15/user, GA May 1):** Standalone governance control plane — observe, govern, manage, secure agents across organization. First time Microsoft separates "build" (Copilot Studio) from "govern" (Agent 365) in pricing. Internal claim: 500,000+ agents, 65,000+ agent responses/day.

**Frontier Suite (M365 E7, $99/user, GA May 1):** = E5 + Copilot + Agent 365. **Work IQ** named as intelligence layer enabling organizational context.

**Copilot Notebooks GA (March 12):** Persistent project workspace within M365 Copilot. Distinct from Cowork (Notebooks = organized knowledge; Cowork = long-running execution).

**Copilot leadership reorganization:** Jacob Andreou appointed EVP of Copilot (March 17), unifying consumer and commercial. Mustafa Suleyman narrows to frontier models. Signal: execution accountability response to adoption gap.

- Source: https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/ [vendor press release — Level 0]
- Source: https://blogs.microsoft.com/blog/2026/03/17/announcing-copilot-leadership-update/ [vendor press release — bare fact]

**Evidence level:** Level 0 (vendor announcements). Leadership change is a bare fact.

---

### 7. D365 Wave 1 — Specific Agent Details (April 1 GA)

**D365 Business Central Payables Agent:** "Automates accounts payable end-to-end, reading invoices, matching vendors and accounts, preparing invoices for approval with human oversight." Most operationally concrete D365 agent description found.

**D365 Finance/Operations MCP servers:** Wave 1 explicitly names MCP as the integration architecture for Copilot-to-ERP data access. Microsoft standardizing on Anthropic's protocol for ERP integration.

**D365 Customer Service:** Four agents (Case Management, Customer Intent, Quality Evaluation, Knowledge Management) **reached GA in October 2025** — Wave 1 deepens them, not new launches.

**D365 Contact Center:** "Agentic automation for higher containment" — positioning against traditional IVR containment benchmark.

- Source: https://learn.microsoft.com/en-us/dynamics365/release-plan/2026wave1/ [vendor documentation — Level 0]

**Evidence level:** Level 0. No deployment stories yet — GA April 1 means too early for practitioner reports.

---

### 8. Copilot Cowork — Still No Practitioner Reviews (CONFIRMED, Cycle 26)

After searching Tech Community, Medium, InfoQ, Diginomica, and general press: **zero independent practitioner reviews**. Research Preview since January 2026. The absence after 2+ months of preview is the signal.

---

### 9. ServiceNow — "Go Live" Events + Mobile Voice Agents

**ServiceNow Exchange: Go Live with Agentic AI** — sessions across APAC, EMEA, AMS in late March. The "go live" framing (not "explore" or "pilot") suggests deployment enablement within 30 days of Autonomous Workforce launch.

**Mobile Voice Agents announced:** Natural voice conversations for ServiceNow Mobile App. Extends autonomous workflows to voice-activated mobile interfaces.

**Autonomous Workforce: still zero independent reviews (4 weeks post-launch).** CVS Health and City of Raleigh remain the only named beta customers.

- Source: ServiceNow Community listings [vendor — Level 0]

**Evidence level:** Level 0. April is the window to watch for first deployment stories.

---

### 10. SAP Joule — New Concur Agents + Community Friction Signals

**New agents (Early Adopter Care, March 17):**
- Expense Automation Agent — creates expense reports automatically
- Expense Audit Agent — reviews receipts, flags discrepancies
- Joule + M365 Copilot integration deepened (expense/travel from within Microsoft apps)

**SAP + NVIDIA via Joule Studio (March 16):** NeMo integration for custom agent design on BTP.

**Community friction signals (Level 1-2):**
- Joule Booster configuration failures ("Tenant Administration errors")
- Post-deployment performance described as "disappointing" — multiple OSS tickets
- Navigation failures: "Fiori App to create PO" fails; "App to create PO" works
- Skill overlap: two skills with similar descriptions → unpredictable triggering
- March 2026 Developer Challenge: multiple participants blocked by "Template LIBRARY doesn't exist" error

- Source: https://news.sap.com/2026/03/sap-concur-fusion-2026-ai-capabilities-integrated-travel-expense-enhancements-global-partnerships/ [vendor press release — Level 0]
- Source: https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/common-configuration-issues-joule-for-sap-s-4hana-cloud-private-edition/ba-p/14125996 [vendor-authored troubleshooting — reveals real failure modes]

**Assessment update:** Joule remains Level 0-1 overall, but the friction surface is now documented. The gap between "GA" and "works reliably" is visible in community forums.

---

### 11. Oracle 26A — Full Agent Roster Expansion (March 2026)

New agents across all modules (no additional charge):

**HCM:** Employee Concierge Agent (compensation, benefits, leave, payroll sub-agents), Manager Concierge Agent (team analytics, pay equity gaps), Plan Fit Agent (conversational enrollment).

**ERP:** Source-to-Settle Assurance Advisor, Record-to-Report Assurance Advisor, Access Request Assistant.

**SCM:** Contract negotiation, cycle count analysis, order configuration and fulfillment agents.

**CX:** Audience Analysis Agent (campaign prioritization), Quote Generation Agent (assembles from emails/drawings/specs).

**Community friction (Level 1):** Missing privileges when enabling HCM Agents in 24D. Unable to edit out-of-the-box tools. Errors saving Agents in Release 25D.

- Source: https://docs.oracle.com/en/cloud/saas/readiness/hcm/26a/hcom-26a/index.html [vendor documentation — Level 0]
- Source: https://community.oracle.com/customerconnect/categories/fusion-ai [practitioner community — Level 1]

**Evidence level:** Level 0 (vendor roadmap). Still zero independent deployment evidence. Community friction confirms same pattern as SAP: vendor says GA, community reveals configuration errors on release day.

---

## New Anti-Pattern: "The AI Paywall" (Level 2 Convergence Emerging)

Consumption/metered pricing as experimentation tax is emerging as a cross-platform anti-pattern:
- **Salesforce:** Corrected for SMB by embedding AI without metering
- **Atlassian:** Rovo agent stalled until pricing barriers removed
- **Microsoft:** E7 at $99/user creates new budget line that delays deployment
- **Workday:** Flex Credits model attempts to solve this

The pattern: metered AI billing prevents the learning curve required for deployment. Organizations throttle usage during evaluation precisely when they need to build intuition.

- Source: https://salesforcedevops.net/index.php/2026/03/18/agentforce-smb-suites-ai-paywall-breaking/ [practitioner analysis]

**Evidence level:** Level 2 (multiple platforms showing same dynamic, but only one practitioner articulating it explicitly).

---

## What We Did Not Find

1. **No independent Copilot Cowork practitioner reviews** — 26th consecutive cycle
2. **No ServiceNow Autonomous Workforce deployment stories** — 4 weeks post-launch, zero practitioner voices
3. **No Oracle Fusion agent customer deployments** despite 26A roster expansion
4. **No SAP Joule independent deployment case studies** — community friction signals but no success stories
5. **No A2A production deployment evidence** — despite ACP merging into A2A under Linux Foundation
6. **No Nordic Microsoft/ServiceNow agent deployments**
7. **No Agentforce Sales practitioner deployments** — too early (GA March 16/31)
8. **No MCP enterprise business process deployment outside financial services** — Morgan Stanley is the sole confirmed case

---

## Protocols and Infrastructure Updates

### 12. Morgan Stanley MCP Production Deployment — MAJOR (Level 2)

First named major bank publicly demonstrating MCP in production API infrastructure. Jim Gough and Andreea Niculcea presented at QCon London (March 16-19, 2026): after five years building their API program, Morgan Stanley spent the last year rethinking it because MCP "went from obscurity to industry standard in roughly eighteen months."

**Demo:** MCP alongside FINOS CALM (Common Architecture Language Model), compliance guardrails, zero-downtime rollouts across 100+ APIs. Claimed efficiency: first API deployment "shrank from two years to two weeks."

- Source: https://www.infoq.com/news/2026/03/morgan-stanley-apis-mcp-calm/ [domain trade publication covering practitioner conference talk]

**Evidence level:** Level 2 (named company, conference demo, 100+ APIs). The "2 years to 2 weeks" claim is a conference statement, not independently audited.

**Significance:** This is the first MCP-in-production signal for a core business process (financial services API management), not coding. Passes all three gates.

---

### 13. Spotify Multi-Agent Advertising System — Production (Level 2)

Spotify published a practitioner engineering blog (February 19, 2026) describing production deployment of "Ads AI" — a multi-agent advertising system.

**Architecture:** RouterAgent → GoalResolverAgent, AudienceResolverAgent, BudgetAgent, ScheduleAgent → MediaPlannerAgent. Built on Google ADK 0.2.0 + Vertex AI (Gemini 2.5 Pro).

**Production outcomes:**
- Media plan creation: 15-30 minutes → 5-10 seconds
- User inputs: 20+ form fields → 1-3 natural language messages
- Agent response latency: 3-5 seconds with parallel execution
- Processes real campaign data from thousands of campaigns

- Source: https://engineering.atspotify.com/2026/02/our-multi-agent-architecture-for-smarter-advertising/ [practitioner direct]

**Evidence level:** Level 2 (named company, specific measurable outcomes, practitioner engineering blog). Passes all three gates. This is sales/advertising operations — a non-coding business process domain.

---

### 14. ACP Absorbed into A2A — Protocol Landscape Simplified

ACP (IBM/BeeAI Agent Communication Protocol) has been absorbed into A2A under the Linux Foundation. Two main protocol families remain:
- **MCP** (agent-to-tool) — 10,000+ servers, entering D365, Morgan Stanley production
- **A2A** (agent-to-agent coordination) — 150+ orgs committed, zero independent deployments

- Source: https://agentcommunicationprotocol.dev [protocol documentation]

---

### 15. Google ADK Reaches GA (March 23, 2026)

Google Agent Development Kit reached General Availability on March 23. Google also published "Developer's Guide to AI Agent Protocols" (March 18) describing a "suite of six protocols" alongside ADK. Spotify's production use of ADK 0.2.0 is the strongest independent validation.

- Source: https://cloud.google.com/blog/products/ai-machine-learning/agent-development-kit-ga [vendor documentation]
- Source: https://developers.googleblog.com/en/ [vendor blog — March 18 post]

---

### 16. Okta for AI Agents — Identity Layer (Early Access, March 16)

Okta launched "Okta for AI Agents" in Early Access. Addresses machine identity, access controls, and credential management for agentic systems. References "Cross App Access Protocol" — Okta building its own agent authorization layer.

When the IAM market leader builds agent identity as a dedicated product, enterprise adoption has reached the point where identity management is a blocking requirement.

- Source: https://www.okta.com/blog/ [vendor announcements — Level 0]

---

### 17. New Relic AI Agent Observability — MCP-Specific Monitoring

New Relic launched AI agent platform with explicit MCP observability: "see details of every MCP server call" and "monitor the entire Model Context Protocol request lifecycle automatically." When observability vendors build native MCP support, it signals enterprise adoption crossing the monitoring threshold.

- Source: https://newrelic.com/platform/ai-monitoring [vendor product page — Level 0]

---

### 18. Counter-Signal: Enterprise AI Agent Skepticism at Level 3 Convergence

Multiple independent sources converge on enterprise production challenges:
- The Register (Jan 28): "AI agent hype cools as enterprises struggle to get into production"
- The Register (Mar 17): "AI still doesn't work very well, businesses are faking it, reckoning coming"
- Palo Alto CEO (Feb 18): "AI isn't great for business, yet"
- Diginomica survey: 40% negative CIO sentiment, only 21.4% report >80% AI success rates
- Anthropic Economic Index: API success rates drop to 50% on tasks >3.5 hours

**Evidence level:** Level 3 (convergence). Validates the "fabrication is the teaching moment" thesis and the training program's market positioning.

---

### 19. NVIDIA GTC 2026 Agent Infrastructure (March 17-20)

Three new pieces:
- **OpenShell:** Open-source deny-by-default policy enforcement for coding agents (Apache 2.0)
- **AI-Q Blueprint:** Enterprise search agent blueprint with explicit MCP for tool orchestration. Partners: Dell, ServiceNow, IBM, HPE, LangChain.
- **AI Grid:** Distributed inference for telco/CDN. Comcast validated: 76.1% lower cost-per-token at burst loads.

- Source: https://developer.nvidia.com/blog/ [vendor blog — Level 0, Comcast validation Level 1]

---

## Platform Assessment Update (Hour 20)

| Platform | Previous (Cycle Update) | This Cycle | Direction |
|----------|------------------------|------------|-----------|
| Salesforce Agentforce | Real, maturing, polarizing | Expanding beyond CS (sales agents GA). SMB free tier. Healthcare agents. NVIDIA on-prem option. | ↑ (breadth expanding) |
| Workday/Sana | "Launched March 2026" | **MAJOR:** Sana from Workday launched March 17. 3 Nordic early adopters named. 400+ customers in early access. | ↑↑ (most significant shift) |
| Microsoft D365/Copilot | Features up, adoption down | Agent 365 governance SKU. Payables Agent named. MCP in D365. Leadership reorg. Cowork still silent. | ↑ (governance maturing) |
| ServiceNow | Bold framing, no evidence | "Go Live" events started. Mobile Voice Agents. Still zero deployment evidence. | → (events up, evidence flat) |
| SAP Joule | L0-1 (GA but unverified) | New Concur agents (EAC). Community friction documented. Still no independent success stories. | → (friction visible) |
| Oracle Fusion | Zero deployment evidence | 26A roster expansion (HCM, ERP, SCM, CX agents). Community friction. Still zero deployment evidence. | → (roster growing, evidence absent) |
| MCP Protocol | 10K servers, coding-only | Morgan Stanley production (100+ APIs, QCon demo). New Relic monitoring. D365 integration. First non-coding deployment. | ↑↑ (crossing into business processes) |
| A2A Protocol | Zero deployments, 150+ orgs | ACP absorbed. Google ADK GA. Still zero independent deployments. | → (governance up, adoption flat) |
| Google ADK | Spotify ADK 0.2.0 | ADK GA (March 23). Spotify production validation. Six-protocol framework published. | ↑ (production-validated) |

**The headline this cycle:** Workday's Sana acquisition and March 17 launch is the most significant platform development — it brings three named Nordic companies into the picture (Berner, Cheffelo, Telavox) and transforms Workday from "zero practitioner evidence" to "named Nordic early adopters with specific claims." Meanwhile, Salesforce continues expanding beyond customer service into sales and healthcare, and Microsoft is building governance infrastructure (Agent 365) faster than deployment evidence. The cross-platform "AI paywall" anti-pattern — metered pricing killing experimentation — is emerging as a Level 2 convergence pattern.
