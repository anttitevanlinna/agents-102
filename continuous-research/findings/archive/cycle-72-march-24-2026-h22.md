# Research Cycle 72 — March 24, 2026 (Hour 22)

*Platform expansion scan: Shadow AI governance, HR agent platforms, SAP/ServiceNow practitioner evidence, MCP roadmap, OpenAI-AWS infrastructure split.*

---

## HEADLINE FINDINGS

### 1. Shadow AI Agent Governance — First Dedicated Product (Nudge Security)

Nudge Security launched AI Agent Discovery (March 24, 2026) — the first product specifically designed to find and govern "shadow AI agents" employees create across enterprise platforms. Covers: Microsoft Copilot Studio, Salesforce Agentforce, ServiceNow, n8n, Tines, Workato, Abacus, ChatGPT, Gemini for Google Workspace.

**What it discovers:** Publicly accessible agents, hardcoded credentials, unauthenticated MCP connections, high-risk integrations, and agents that have outlived their creators.

**Why this matters:** When a security vendor builds a dedicated product for agent discovery and governance, the problem has crossed from theoretical to operational. The specific risk categories — hardcoded credentials in agents, unauthenticated MCP connections, orphaned agents — are exactly the attack surfaces Module 4 (Security) should cover.

**The stat:** "80% of organizations say they've encountered agentic AI risks related to improper data exposure and access" (cited from SailPoint survey — needs primary source).

- Source: https://www.nudgesecurity.com/post/ai-agent-discovery-with-nudge-security [vendor blog — Level 0]
- Source: https://www.prnewswire.com/news-releases/nudge-security-extends-its-ai-security-leadership-with-ai-agent-discovery-302719975.html [vendor press release — Level 0]
- Evidence level: Level 0 (vendor announcement). But the product itself is evidence that shadow AI agents are a real enough problem to build products around. Strengthens agent security convergence pattern.

**Finding category:** Platform Announcement — agent governance infrastructure

---

### 2. SAP Joule Reality Check — Horvath Survey (200 Companies)

A Horvath consulting survey of 200 companies (€200M+ revenue) provides the first systematic practitioner-level assessment of SAP Joule readiness:

- **60% say they are "not agile enough"** to couple S/4HANA with Joule
- **46% would retrospectively allocate more time/budget** to ERP transition
- Stefan Maus (Horvath): "Comprehensive practical experience is not yet available across a broad range of companies" — most Joule experience limited to **tests and proof-of-value projects**

**Nestle** — world's largest S/4HANA deployment (50K users, 112 countries): Running "several proof-of-concepts" with Joule in finance and supply chain. 100K+ employees using AI daily (Copilot + NestGPT combined, not Joule-specific). Ralf Huebenthal (Head of IT Platforms) says they intend to "embed it in everyday work" — but Joule is **not yet in production**.

- Source: https://www.cio.com/article/4086426/companies-still-unfamiliar-with-sap-joule.html [domain trade publication]
- Source: https://e3mag.com/en/companies-are-still-wary-of-sap-joule/ [domain trade publication]
- Source: https://www.computing.co.uk/interview/2026/inside-nestle-s-near-zero-downtime-sap-cutover [domain trade publication — practitioner interview]
- Evidence level: Level 2 (survey data from named consultancy, practitioner interview). The Horvath survey is the first systematic assessment beyond vendor claims and community friction.

**Assessment update:** SAP Joule moves from "Level 0-1 with community friction" to **Level 1-2 with systematic survey data confirming the gap between GA and practical readiness.** The 60% "not agile enough" finding is the most specific data point we have on ERP+agent deployment friction.

**Finding category:** Context — deployment readiness assessment, not production deployment

---

### 3. ServiceNow: Implementation Friction Documented, Zero Deployment Outcomes

**New practitioner signal (Level 2):** ServiceNow implementation specialists are documenting specific AI integration issues:
- AI calls add latency to workflows
- Release-sensitive components break across upgrades
- Diluted answers from noisy knowledge base data
- L1 Service Desk AI Specialist in **controlled release** (Feb 26) — GA targeted Q2 2026

**ServiceNow's own deployment (Level 0):** Claims 90%+ IT requests handled autonomously, 99% faster than human agents. This is vendor eating own dogfood — not independent evidence.

**CVS Health CISO Alan Rosa:** Quoted praising the concept but **has not committed to deploying Autonomous Workforce.**

- Source: https://servicenowspectaculars.com/servicenow-ai-experience-implementation-issues-2026/ [practitioner analysis]
- Source: https://diginomica.com/servicenows-autonomous-workforce-here-and-its-impressive-are-enterprises-ready-it [domain trade publication]
- Source: https://venturebeat.com/orchestration/servicenow-resolves-90-of-its-own-it-requests-autonomously-now-it-wants-to [tech press — reporting vendor claims]
- Evidence level: Level 1-2 (practitioner friction documented; zero independent deployment outcomes)

**Assessment update:** ServiceNow Autonomous Workforce remains at zero independent deployment evidence (5 weeks post-launch). The new signal is implementation friction being documented by specialists — the same pattern SAP Joule showed in previous cycles.

**Finding category:** Context — implementation friction documented, no production deployments

---

### 4. OpenAI-AWS Frontier Deal — Agent Infrastructure Architecture Split

The $110B OpenAI funding round (March 2026) created a significant architectural split for enterprise agent deployment:

- **Azure:** Retains exclusivity for **stateless API calls** — traditional model queries without session persistence
- **AWS:** Gains distribution rights for **stateful runtime environments** — models that maintain memory, context, and identity across ongoing workflows

AWS CEO Matt Garman: "Co-creating a next-generation stateful runtime, available on Amazon Bedrock, so developers can build AI agents that maintain context, memory, and continuity at production scale."

**Why this matters for platform advisory:** The stateless/stateful split maps directly to the chatbot-vs-agent distinction. Chatbots are stateless (Azure). Agents need state (AWS). The infrastructure layer is encoding the architectural difference between what most companies have today (chatbots on Azure) and what they want (agents on AWS).

- Source: https://www.infoq.com/news/2026/03/openai-aws-frontier-stateful/ [domain trade publication]
- Evidence level: Level 2 (deal confirmed, architectural design published, no deployment evidence yet)

**Finding category:** Platform Announcement — infrastructure architecture

---

### 5. MCP 2026 Roadmap — Enterprise Scaling Friction Documented

MCP lead maintainer David Soria Parra published the 2026 roadmap, making enterprise readiness one of four top priorities.

**Current scale:** 5,800+ servers, 97M+ monthly SDK downloads. Adopted by OpenAI, Google, Microsoft.

**Documented scaling friction (Level 2 — practitioner-reported):**
- Stateful sessions vs. load balancers — multi-tenant sharing breaks with current architecture
- No standardized audit trails
- Authentication tied to static secrets
- Undefined gateway behavior

**The gap:** MCP is a production reality for development tooling (10K servers) and one financial services deployment (Morgan Stanley, 100+ APIs). But enterprise business process deployment is blocked by the gaps above.

- Source: https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/ [practitioner direct]
- Source: https://thenewstack.io/model-context-protocol-roadmap-2026/ [domain trade publication]
- Evidence level: Level 2 (roadmap from lead maintainer, friction documented)

**Finding category:** Platform development — enterprise readiness gaps documented

---

## NEW PLATFORM ANNOUNCEMENTS (Level 0)

### 6. Confirm — First HR-Specific AI Agent Platform (March 23)

Launched at Transform 2026 (Las Vegas). AI-native platform replacing "sprawl of single-purpose HR AI tools" with unified agent system:

- **AI HRBP Agent:** Retention risks, hidden high performers via Organizational Network Analysis
- **AI Onboarding Agent:** Personalized 90-day journeys with automated check-ins
- **AI Manager Coaching Agent:** Real-time coaching nudges at scale
- **AI Service Desk Agent:** Employee Q&A in Slack/Teams

Built on ONA + real work signals from Slack, Jira, Asana. $8/person/month. SOC 2 Type II certified.

**HR domain significance:** Previous research found ZERO autonomous HR agent deployments globally (Track 4). Confirm doesn't change this finding — it's a new vendor, not a deployment. But it's the first HR-specific platform positioning around "agents" rather than "copilots." Watch for practitioner evidence in Q2.

- Source: https://techrseries.com/hrtechnology/confirm-launches-ai-agents-platform-for-performance-management-at-transform-2026/ [republished PR — Level 0]
- Evidence level: Level 0 (vendor announcement). No deployment evidence.

---

### 7. Board — Office of Finance AI Agents (March 18)

FP&A Agent and Controller Agent for financial planning and consolidation. Built on Microsoft Foundry. GA March 31.

- FP&A Agent: three-statement modeling, variance validation, adaptive forecasting
- Controller Agent: financial close, consolidation, reporting

Merchandiser and Supply Chain agents planned for later.

- Source: https://www.prnewswire.com/news-releases/board-unveils-office-of-finance-ai-agents-to-transform-finance-into-a-strategic-powerhouse-302717676.html [vendor press release — Level 0]
- Evidence level: Level 0 (vendor announcement)

---

## NORDIC SIGNALS

### 8. Equinor Agentic Drilling — First Named "Agentic AI" Use

Equinor leadership publicly named "agentic AI" for the first time. EVP Hege Skryseth confirmed employees use "copilots, chatbots and agentic AI."

**Specific agentic deployment:** SLB and Equinor achieved 60% increase in rate of penetration on Brazil's Peregrino C platform with autonomous drilling. North Sea field deployments of agentic controllers (closed-loop AI) report 3-10% production uplift.

$130M AI savings in 2025 ($330M+ cumulative since 2020). 100+ additional AI use cases identified.

- Source: https://www.equinor.com/news/20260107-artificial-intelligence-saved-equinor-usd-130-million [vendor press release — Level 0 for numbers]
- Source: https://www.offshore-mag.com/business-briefs/equipment-engineering/article/55328931/autonomous-systems-and-agentic-ai-transforming-offshore-logistics-and-production [domain trade publication]
- Source: https://jpt.spe.org/equinor-says-ai-saved-it-130m-in-2025 [domain trade publication]
- Evidence level: Level 2 (single company, independently reported by trade press). Agentic drilling is the most specific agentic deployment in the Nordic operations domain.

---

### 9. AI Finland Declares "Agentic AI" as 2026 Theme

AI Finland (national network) shifted from chatbot/assistant focus to agentic AI as its primary theme for 2026. Positioning signal, not deployment evidence.

"AI in Finnish Business 2026" report launching April 15 — may contain concrete deployment data.

- Source: https://aifinland.fi/en/ai-finland-raises-the-bar-with-its-2026-services/ [industry association]
- Evidence level: Level 1 (direction signal)

---

### 10. Nordic Enterprise AI Gap Persists

**Major companies scouting, not deploying:** A Nordcloud hackathon featured executives from IKEA, Volvo Cars, Ericsson, H&M, Swedbank, Handelsbanken, SKF, SEB, Nordea, Electrolux, Scania as jury members. Active interest, zero deployment evidence.

**BCG Nordic data (confirmed):** Only 4% of Nordic companies achieve strong AI returns. The infrastructure-deployment gap is a recurring theme: billions invested in data centers, zero agent deployments documented.

**Sana/Workday Nordic verification attempt:** Joona Honka (Berner) is independently confirmed — nominated for "Most Visionary AI Leader" at AI Finland 2025 Gala, role confirmed on berner.fi. But the specific "90% adoption / 400 ChatGPT licenses retired" claim appears ONLY in Workday's press release. Cheffelo and Telavox claims also vendor-sourced only. Worth monitoring for independent confirmation (Honka speaking at events, Berner publishing own results).

**IMF Denmark labor study (counter-evidence):** ~20% of Danish workforce at risk of displacement, 6% of jobs have >50% of activities exposed to AI automation. But a separate study found AI tools had "no significant impact on earnings or recorded hours" so far — displacement fears outpacing actual impact.

- Source: https://www.imf.org/en/publications/selected-issues-papers/issues/2025/08/25/the-impact-of-artificial-intelligence-on-denmarks-labor-market-569930 [academic/research]
- Source: https://www.berner.fi/2025/11/joona-honka-ehdolla-ai-2025-gaalassa-vuoden-visionaarisin-tekoalyjohtaja-kategoriassa/ [practitioner direct — confirms person, not Sana claim]
- Source: https://2hero.dev/hackathons/nordcloud-agentic-ai-software-systems-modernization-hackathon [vendor event page]
- Evidence level: Level 0-1 (event participation, not deployment); Level 2 for IMF study

---

## PERSISTENT GAPS (Updated)

| Watch Item | Consecutive Zeros | Window | Assessment |
|---|---|---|---|
| Copilot Cowork independent reviews | **37 cycles** | "Late March" — 7 DAYS LEFT | All content remains vendor announcements and partner explainers. Zero hands-on reviews anywhere. |
| ServiceNow Autonomous Workforce deployments | 5 weeks post-launch | Q2 2026 for L1 GA | Implementation friction documented, zero outcome evidence |
| SAP Joule production deployments | Ongoing | Horvath: "not yet available" | 60% of companies say they're not agile enough. Nestle at PoC stage. |
| Oracle Fusion agent deployments | Ongoing | 26A launched | Zero evidence |
| A2A independent production deployments | Ongoing | Google Agent Engine GA | Zero independent evidence despite 150+ orgs committed |
| Nordic enterprise agent deployments (non-NBIM/Equinor) | 37+ cycles | April 15 Finnish report | Hackathon interest, zero deployments |

---

## CONVERGENCE PATTERN UPDATES

### Agent Security/Governance — Approaching L3

New signal this cycle: Nudge Security's shadow AI agent discovery product. Added to existing signals:
- Meta rogue agent incident (March 2026)
- Okta for AI Agents (Early Access)
- New Relic AI agent observability with MCP monitoring
- Nudge Security AI agent discovery (March 24) — NEW
- OpenShell (NVIDIA, deny-by-default agent policy enforcement)
- Anthropic Computer Use permission-first model
- "80% of organizations encountered agentic AI risks" (SailPoint survey, needs primary source)

Signal count: 7-9 independent signals. Approaching L3 threshold. The shift from "agent security as concern" to "agent security as product category" happened this month.

### AI Paywall Anti-Pattern — Upgraded to L2

Additional evidence this cycle: Board's GA on March 31 via Microsoft Marketplace + Confirm's $8/user pricing model (deliberately low to avoid the paywall). Two strategies emerging:
1. **Embed and include** (Salesforce SMB, Sana from Workday Flex Credits, Confirm $8/user)
2. **Premium governance tier** (Microsoft E7 $99/user, Agent 365 $15/user)

The split between "embed to drive adoption" and "premium tier for governance" is itself a convergence signal.

### Stateless-to-Stateful Infrastructure Split — NEW L1

The OpenAI-AWS deal encodes at the infrastructure level what we've been tracking at the application level: the chatbot→agent transition requires fundamentally different runtime architecture. Azure=chatbot infrastructure, AWS=agent infrastructure (simplified but directionally correct). This is the first time a $110B deal has been structured around this distinction.

---

## What We Did Not Find

1. **No Copilot Cowork hands-on reviews** — 37th consecutive cycle
2. **No ServiceNow Autonomous Workforce customer outcomes** — 5 weeks post-launch
3. **No SAP Joule production deployment** — Horvath survey confirms the gap systematically
4. **No new Nordic agent deployments** beyond NBIM and Equinor (both previously documented)
5. **No A2A production deployment** despite GA billing infrastructure
6. **No HR agent deployment** anywhere globally — Confirm's platform launch is promising but zero customers reported
7. **No Agentforce Sales practitioner deployments** — still too early (GA March 16/31)
8. **No Claude Computer Use enterprise deployment** — launched today, consumer preview only

---

## Next Cycle Priorities

1. **March 31 verdict cycle:** Definitive assessment on Copilot Cowork, Board Finance Agents GA, D365 Wave 1 GA
2. **April 15:** AI in Finnish Business 2026 report — potential Nordic deployment data
3. **Sana from Workday Nordic verification:** Search LinkedIn for Joona Honka (Berner), Anton Nytorp (Cheffelo), Alexander Bergström (Telavox)
4. **Agent security convergence:** One more cycle of signals and it crosses L3 threshold
