# Platform Agents Update — March 2026

*Incremental research update. Previous assessment: February 2026. Research date: March 23, 2026.*

---

## Key Change Since February: SAP Joule Upgraded from "Vaporware" to "Early GA"

Our February 2026 assessment labeled SAP Joule as "vaporware." This needs revision. SAP Joule Studio agent builder reached General Availability in Q1 2026. The shift is from copilot to agentic coordinator — Joule now claims to find errors autonomously, manage cross-department tasks, and request human approval only when necessary.

**However:** Independent practitioner evidence remains thin. Gartner Peer Insights reviews describe it as "efficient and user friendly" but note it "sometimes struggles with complex and highly specific queries." No independent deployment case studies with measurable outcomes found outside SAP's own materials.

**Revised assessment:** SAP Joule moves from Level 0 (vaporware) to **Level 0-1** (GA but unverified by independent practitioners). The announcement-to-deployment gap is narrowing but not closed.

- Source: https://research.aimultiple.com/sap-ai-agents/ [domain trade publication]
- Source: https://www.gartner.com/reviews/product/joule [practitioner reviews — limited sample]
- Source: https://www.cpapracticeadvisor.com/2026/03/17/sap-launches-new-ai-integrated-travel-and-expense-enhancements/179875/ [domain trade publication]

**New SAP agents announced (Q1 2026):**
- Cash Management Agent — claims 80% time reduction in reconciliation (vendor claim, Level 0)
- Bid Analysis Agent — procurement automation (vendor claim, Level 0)
- Travel & Expense enhancements with AI (March 17, 2026)

**Finding category:** Platform Announcement → early Context. Not yet Production Agentic.

---

## Salesforce Agentforce: Real, Maturing, Still Polarizing — With Genuine Scale

Agentforce is the most deployed enterprise agent platform. Updated March 2026 data shows genuine commercial traction: 18,500 customers, 9,500 on paid plans, $540M ARR (up 330% YoY).

### Production Agentic (Level 2) — New Deployments

**Finnair (NORDIC — Finland)** — Production deployment on finnair.com.
- 80% first-contact resolution (up from traditional chatbot levels)
- Reduces new agent onboarding time by 30%
- Handles loyalty, baggage, generic travel queries via Service Cloud + Data Cloud + Amadeus booking data
- Cannot yet handle disruption-specific routing (Amadeus ERP integration is next step)
- Source: https://techinformed.com/agentforce-finnair-deployment/ [domain trade publication]
- Source: https://diginomica.com/how-finnair-aims-fly-high-agentforce [domain trade publication]
- **Nordic label:** Nordic-origin deployment (Finnair is Finnish)

**Williams-Sonoma** deployed Agentforce 360, renamed internally to "Olive" — handles ~60% of customer conversations as a "sous-chef agent."
- Source: [SOURCE NEEDED — referenced in search results but primary URL not verified]

**Reddit (the company)** — Automated 46% of customer support cases, reduced response times by 84%.
- Source: https://www.salesforceben.com/revisiting-the-bullish-case-for-agentforce-in-2026/ [domain trade publication]

**OpenTable** — AI agents handle 70% of restaurant/diner inquiries without human intervention.
- Source: https://www.salesforceben.com/are-agentforce-agents-as-powerful-as-salesforce-claims/ [domain trade publication]

**Falabella** — Deployed Agentforce on WhatsApp in ~2 months. WhatsApp usage jumped from <50% to >70% within three weeks.
- Source: https://martech.org/salesforce-agentforce-what-you-need-to-know/ [domain trade publication]

**1-800Accountant** — 90% case deflection rate during tax season.
- Source: https://www.salesforceben.com/revisiting-the-bullish-case-for-agentforce-in-2026/ [domain trade publication]

**Salesforce's own deployment:** Over 1 million support requests handled, ~130K conversations/month, only 5-7% escalation to humans.
- Source: https://www.salesforceben.com/agentforce-for-salesforce-help-6-month-review-and-whats-improved/ [domain trade publication]

### New Capabilities Shipped

**Agentforce Contact Center (GA Feb 23, launched at Enterprise Connect March 10, 2026):**
- Native CCaaS built on Hyperforce — voice, digital, CRM, AI agents unified
- Native telephony stack (not Amazon/Genesys)
- "Agentforce Contact Center 100" initiative — intensive support for first 100 deployers
- Early voice containment rates: 40-60%
- Source: https://www.nojitter.com/ai-automation/salesforce-launches-agentforce-contact-center [domain trade publication]
- Source: https://salesforcedevops.net/index.php/2026/03/10/agentforce-contact-center-salesforce-ccaas-competition/ [practitioner analysis]

### Anti-Patterns Deepening to Level 3 Convergence

| Anti-Pattern | Evidence Level | Sources |
|---|---|---|
| Policy conflict loops | Level 3 | Sweep, SalesforceKing, Damco, NexGenArchitects |
| Instruction bloat / over-customization | Level 3 | Multiple: "1,000+ pre-defined actions" leads to bloat |
| Governor limit inheritance | Level 3 | Sweep, Apex Hours, SalesforceDevops.net |
| Data quality as universal blocker | Level 3 | Every practitioner source confirms |
| Silent validation rule failures | Level 2 | Sweep (detailed technical description) |
| Post-launch optimization neglect | Level 2 | NexGenArchitects: "15-20 hours/month first 6 months" |

- Source: https://www.sweep.io/blog/the-5-salesforce-errors-that-break-agentforce [practitioner analysis]
- Source: https://www.nexgenarchitects.com/blog-posts/salesforce-agentforce-implementation-fails [practitioner analysis]
- Source: https://www.apexhours.com/agentforce-limitations-and-workarounds/ [practitioner direct]

### Critical Practitioner Feedback (Level 1-2)

**Salesforce Ben 6-month review:** Early iterations "left a lot to be desired — unpredictable, fragile." 8 months on: "substantial strides in basic stability." Key insight: "Early success comes from well-scoped use cases with clear boundaries and oversight."
- Source: https://www.salesforceben.com/agentforce-for-salesforce-help-6-month-review-and-whats-improved/ [domain trade publication]

**Oliv.ai review (competitor, discount accordingly):** 77% of B2B implementations fail, only 31% maintain beyond 6 months, true TCO $13,600/user annually including Data Cloud.
- Source: https://www.oliv.ai/blog/salesforce-agentforce-reviews-analyzed [practitioner analysis — competitor bias noted]

Reddit feedback remains skeptical:
- "Have anybody tried Agentforce? Is it even working for you guys? Are you seeing any ROI?"
- Data Cloud dependency putting many customers off — additional cost barrier
- Source: https://www.salesforceben.com/has-agentforce-moved-from-hype-to-reality/ [domain trade publication]

### Data Cloud Dependency — Confirmed and Growing

Data Cloud technically not required but "operations run much smoother" with it. Credit-based consumption ($0.10/action) creates budget unpredictability. Salesforce responding with new pricing: Agentic Enterprise License Agreements (AELAs) and seat-based SKUs.
- Source: https://titandxp.com/article/agentforce/require-data-cloud/ [practitioner analysis]
- Source: https://futurumgroup.com/insights/salesforce-q3-fy-2026-ai-agents-data-360-lift-bookings-and-fy26-outlook/ [domain trade publication]

### What We Did Not Find (Agentforce-specific)

1. **No practitioner-direct evidence from actual deployers** — no blog posts from Finnair engineers, no X.com threads from deployment teams
2. **No Nordic deployments beyond Finnair** — reMarkable mentioned but unverified
3. **No Agentforce beyond customer service** — sales, operations, HR use cases remain vendor claims only

**Revised assessment:** "Real, maturing, still polarizing — but with genuine scale." $540M ARR and Finnair Nordic deployment are significant. Anti-patterns now at Level 3 convergence. Success requires narrow scope, clean data, experienced admin.

---

## ServiceNow: Autonomous Workforce — Bold Framing, Still No Customer Evidence

**Biggest development since February:** ServiceNow launched **Autonomous Workforce** on February 26, 2026 — the most ambitious enterprise agent platform move so far.

Key claims:
- Not individual task agents but "AI specialists" with roles (Level 1 Service Desk AI Specialist, Employee Service Agent, Security Operations Analyst)
- Orchestrates teams of AI specialists to execute work "from start to finish"
- ServiceNow claims 90% autonomous IT resolution internally
- Built on Moveworks technology (acquired for $2.85B, closed December 2025)

- Source: https://venturebeat.com/orchestration/servicenow-resolves-90-of-its-own-it-requests-autonomously-now-it-wants-to [domain trade publication]
- Source: https://siliconangle.com/2026/02/26/servicenow-debuts-autonomous-workforce-employeeworks-automation-tools/ [domain trade publication]
- Source: https://diginomica.com/servicenows-autonomous-workforce-here-and-its-impressive-are-enterprises-ready-it [domain trade publication]
- Source: https://www.businesswire.com/news/home/20260226739690/en/ [vendor press release — Level 0]

### Customer Evidence Update (March 2026)

**No production customer deployments confirmed.** Two named beta customers identified, neither reporting results:

**CVS Health** — Named as beta customer. Alan Rosa (CVS) said the ServiceNow + Moveworks combination is "coming to life" but CVS has **not committed publicly to deploying Autonomous Workforce.** Aspirational, not a deployment report.
- Source: https://venturebeat.com/orchestration/servicenow-resolves-90-of-its-own-it-requests-autonomously-now-it-wants-to [general press — bare facts only]

**City of Raleigh, NC** — Named as beta customer. CIO Mark Wittenburg said Now Assist (a different product) is "resolving 98% of initial touchpoints." This is about **Now Assist routing**, not Autonomous Workforce's L1 AI Specialist.
- Source: https://www.techtarget.com/searchitoperations/news/366639250/ServiceNow-touts-AI-governance-for-its-Autonomous-Workforce [domain trade publication]

**Siemens Healthineers** — Nicole Hulst quoted about existing Moveworks assistant "Ada" (5,000 hours/month saved, 91% satisfaction among 74,000 employees). This is **pre-acquisition Moveworks**, not Autonomous Workforce.
- Source: https://www.businesswire.com/news/home/20260226739690/en/ [vendor press release — Level 0]

**Hitachi (via Accenture)** — Scheduled to present at Knowledge 2026 (May 5-7) about "Hitachi's Agentic AI journey — delivering 50+ agentic workflows and 100k+ hours of productivity gains." **Not yet presented — future event.** Broader ServiceNow agentic work, not specifically Autonomous Workforce.

### Independent Analysis

**Diginomica** raised enterprise readiness concerns: 40% negative CIO sentiment on AI projects (Jan 2026 survey, n=124), only 21.4% of CIOs report >80% AI success rates.
- Source: https://diginomica.com/servicenows-autonomous-workforce-here-and-its-impressive-are-enterprises-ready-it [domain trade publication]

**TechTarget** warned: "Organizations must ensure data management, organization and access are clean. This is an enterprise issue, not a ServiceNow issue."
- Source: https://www.techtarget.com/searchitoperations/news/366639250/ServiceNow-touts-AI-governance-for-its-Autonomous-Workforce [domain trade publication]

### Practitioner Voice: Absent

- **Zero Reddit discussions** about Autonomous Workforce found
- **Zero practitioner blog posts** or X.com threads from hands-on users
- **Zero G2 reviews** specific to Autonomous Workforce (pre-acquisition Moveworks reviews exist)
- Complete silence from the practitioner layer

### What We Did Not Find (ServiceNow-specific)

1. No customer reporting production results — zero measurable outcomes from any organization other than ServiceNow itself
2. No practitioner voice — no blogs, threads, talks from anyone with hands-on experience
3. No independent benchmarks of the "90% autonomous / 99% faster" claims
4. No pricing information (noted by multiple analysts as a gap)
5. No Nordic deployments or Nordic-relevant customer activity

**Assessment:** The "Autonomous Workforce" framing is the most aggressive of any platform. Aligns with convergence pattern #3 (narrow specialization). But naming ("replaces people") risks Klarna-style backlash. L1 Specialist still in controlled availability, GA expected Q2 2026.

**Evidence level:** Level 0 (vendor claims only). Does not meet Level 2 threshold. **Next watch point: Knowledge 2026 (May 5-7)** — most likely venue for first customer deployment stories.

**Finding category:** Platform Announcement with strong vendor evidence. Not yet independently verified as Production Agentic.

---

## Microsoft Dynamics 365 / Copilot: Release Wave 1 Deep Dive (March 2026)

**Research date:** March 23, 2026. Deep dive into Release Wave 1, Copilot Agent Mode, Copilot Studio, Cowork, and adoption reality.

### What Has Actually Shipped (Pre-Wave 1)

Agent Mode in Office apps rolled out ahead of Wave 1:
- **Word Agent Mode:** GA since November 2025
- **Excel Agent Mode:** GA on Web (December 2025), Desktop/Mac (January 2026)
- **PowerPoint Agent Mode:** Rolling out on Web since February 2026
- **Copilot Cowork:** Research Preview with limited customers, broader Frontier rollout late March 2026

- Source: https://learn.microsoft.com/en-us/copilot/microsoft-365/release-notes [vendor documentation]
- Source: https://techcommunity.microsoft.com/blog/microsoft365copilotblog/what%E2%80%99s-new-in-microsoft-365-copilot--february-2026/4496489 [vendor documentation]

### 2026 Release Wave 1 (Published March 18, Rolling Out April-September)

New capabilities across Dynamics 365, rolling out April–September 2026:
- **Customer Service:** Enhanced agentic capabilities across case management, email, customer intent, quality evaluation
- **Sales:** Autonomous AI agents for lead research, engagement, deal risk identification, escalation workflows
- **Field Service:** Scheduling Operations Agent for intelligent resource scheduling
- **Business Central:** AI-powered agents automating sales and purchase scenarios (agentic ERP)
- **Contact Center:** Agentic contact center with deeper automation and higher containment
- **Commerce:** Multi-outlet B2B ordering, credit management
- No Early Access stage — features go straight to GA from April 1
- Copilot Studio for building custom agents with MCP support, GPT-4.1 default, GPT-5 GA in US/EU

- Source: https://learn.microsoft.com/en-us/dynamics365/release-plan/2026wave1/ [vendor documentation]
- Source: https://www.microsoft.com/en-us/dynamics-365/blog/business-leader/2026/03/18/2026-release-wave-1-plans-for-microsoft-dynamics-365-microsoft-power-platform-and-copilot-studio-offerings/ [vendor press release — Level 0]
- Source: https://www.serversys.com/insights/dynamics-365-2026-release-wave-1/ [domain trade publication]
- Source: https://www.pragmatiq.co.uk/whats-new-in-dynamics-365-and-power-platform-2026-release-wave-1-highlights/ [domain trade publication]

### Copilot Cowork: Built with Anthropic

Copilot Cowork is the most significant architectural shift — built in close collaboration with Anthropic, using Claude's agentic harness for long-running, multi-step work. Delegates tasks that run minutes or hours, coordinating actions across apps with visible checkpoints and human steering.

- Source: https://www.microsoft.com/en-us/microsoft-365/blog/2026/03/09/copilot-cowork-a-new-way-of-getting-work-done/ [vendor press release — Level 0]
- Source: https://fortune.com/2026/03/09/microsoft-copilot-cowork-ai-agents-anthropic-e7-m365-saas/ [general press — bare fact: Anthropic partnership confirmed]
- Source: https://redmondmag.com/articles/2026/03/11/microsoft-pushes-copilot-into-action-mode-with-cowork.aspx [tech press]

**Assessment:** Cowork is genuinely agentic (multi-step, autonomous, with tool use across apps). Still in Research Preview — zero independent practitioner reviews found. Fortune notes the Anthropic collaboration, which some read as an indirect admission that GPT-based Copilot was underperforming.

### Excel Agent Mode: The Only Independently Benchmarked Feature

Microsoft published SpreadsheetBench results: **57.2% accuracy** across 912 challenges vs. 71.3% human accuracy. Beats Shortcut.ai and Claude Files, but 14 points below human level. Copilot in Excel WITHOUT Agent Mode scored only 20%.

Microsoft's own framing: "a first-year consultant — fast, structured, but always in need of senior review."

- Source: https://techcommunity.microsoft.com/blog/excelblog/building-agent-mode-in-excel/4457320 [vendor documentation — but unusually transparent with benchmark data]
- Source: https://futurumgroup.com/insights/is-microsoft-365-copilot-agent-mode-ready-to-rival-human-accuracy/ [analyst — Level 0 for predictions, but Level 1 for benchmark analysis]
- Source: https://www.spacebar.news/excel-ai-twenty-percent-of-the-time-it-works-every-time/ [practitioner analysis]

**Assessment:** This is the most honest self-assessment from any platform vendor. The 57% vs 71% gap is real data. Useful for our training: demonstrates "useful AND unreliable" — exactly the insight Module 1 teaches.

### CRITICAL COUNTER-EVIDENCE: Copilot Adoption Is Struggling

The most important finding is the gap between Microsoft's agent ambitions and Copilot's actual adoption:

- **15M paid users** after 2 years = 3.3% of 450M M365 base. Forrester's Gownder called this "disappointing."
- **Market share declining:** Copilot lost 7.3 percentage points of paid subscriber share in 7 months (18.8% → 11.5%). ChatGPT holds 55.2%, Gemini 15.7%.
- **User preference gap:** When users had access to all three platforms, only 8% chose Copilot as preferred tool.
- **Accuracy perception:** Copilot's accuracy NPS remained persistently negative throughout measurement period.
- **Internal signal:** Microsoft employees reportedly favor competitors' tools.
- **The Anthropic pivot:** Microsoft building Cowork on Claude is read by multiple analysts as acknowledgment that GPT-based Copilot experience was insufficient.

- Source: https://www.reconanalytics.com/ai-choice-2026-why-licenses-dont-equal-adoption/ [practitioner analysis — Recon Analytics, survey of 150K+ respondents]
- Source: https://www.perspectives.plus/p/microsoft-365-copilot-commercial-failure [practitioner analysis — independent analyst]
- Source: https://www.nojitter.com/ai-automation/4-obstacles-impede-paid-microsoft-365-adoption [domain trade publication]
- Source: https://www.webpronews.com/microsofts-copilot-struggles-adoption-lags-amid-costs-and-competition/ [tech press]

**Evidence level:** Level 3 (convergence). Multiple independent sources — Forrester analyst, Recon Analytics survey (150K+ respondents), independent analysts, tech press — all converge on the same finding: licenses do not equal adoption, and users who have choice prefer competitors.

### Copilot Studio Practitioner Feedback

G2 rating: 4.5/5 from 101 reviews. Strengths: low-code, Microsoft ecosystem integration. Weaknesses:

- **Knowledge retrieval underperforms** — keyword-based search vs. semantic index creates false confidence (agent returns confident but incorrect answers)
- **Hard quotas** on message volumes, connector payloads disrupt enterprise workflows
- **Low-code wall** — simple agents easy, complex error handling requires code
- **Inconsistent orchestration** in multi-agent scenarios
- **Developer subscription cannot build SharePoint-grounded agents** — "feels like a luxury only few could afford"

- Source: https://www.g2.com/products/microsoft-microsoft-copilot-studio/reviews [practitioner reviews]
- Source: https://lanternstudios.com/insights/blog/why-your-copilot-studio-knowledge-agent-might-be-struggling-to-deliver/ [practitioner analysis]
- Source: https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/known-issues [vendor documentation — known issues]

**Evidence level:** Level 2 (multiple practitioners, consistent patterns — knowledge retrieval issues + quota limits + low-code wall).

### Enterprise Deployment Stories

Named deployments found are all **vendor-sourced** (Microsoft case studies):
- **Vodafone:** 3 hours/week saved per employee (vendor case study — Level 0)
- **Lumen Technologies:** $50M annual savings claimed (vendor case study — Level 0)
- **Estée Lauder:** ConsumerIQ agent via Copilot Studio for trend analysis (vendor case study — Level 0)
- **Microsoft internal:** Maturity model deployment in cohorts, 500+ users at Sofigate (Finland)

No independent enterprise deployment stories with measurable agent outcomes found. All quantified results trace back to Microsoft's own materials or Forrester TEI studies (commissioned by Microsoft = Level 0).

### Nordic Signal

- **Sofigate (Finland):** 500+ internal Copilot users, leveraging daily for customer assignments. Partner Atea Finland supported rollout. High adoption reported. But this is Copilot (assistant), NOT agents. No evidence of agentic deployment.
- **Microsoft Copilot & AI Agents Summit** events held across all Nordics (Sept-Oct 2025) — awareness-building, not deployment evidence.
- **In-country data processing** expanding to Sweden in 2026. Finland, Norway, Denmark NOT yet on the list — potential data sovereignty concern for Nordic enterprise agent deployments.
- **AI Finland** declared Agentic AI as primary 2026 theme; free AI Agent Fundamentals course launched (consortium includes Gofore, Microsoft, EY).

- Source: https://news.microsoft.com/source/emea/2024/10/sofigate-innovates-with-microsoft-copilot-in-readiness-for-a-digital-revolution/ [vendor press release — Level 0, but names a real Nordic company]
- Source: https://learn.cloudpartner.fi/posts/security-copilot-scu-allocation-in-microsoft-365-e5-the-nordic-reality-check [practitioner direct — Finnish cloud partner]

**Nordic label:** Nordic-available platform (M365 is ubiquitous). No Nordic-origin agentic deployments found.

### Licensing & Pricing Changes

- **M365 E7:** $99/user/month, GA May 1, 2026 — bundles E5 + Copilot + Entra Suite + Agent 365
- **Agent 365:** New control plane for IT/security to govern custom AI agents, GA May 1, 2026
- **Price increases:** E3 $36→$39, E5 $57→$60, effective July 1, 2026
- **Agent Academy:** Free training launched by Microsoft for Copilot Studio practitioners

- Source: https://learn.microsoft.com/en-us/partner-center/announcements/2026-march [vendor documentation]
- Source: https://microsoft.github.io/agent-academy/ [vendor documentation]

### Overall Assessment

**Microsoft's approach is the most pervasive** — agents embedded in tools everyone already uses (Office, Excel, Dynamics). The "straight to GA, no Early Access" approach means Nordic enterprises running M365 will get agent capabilities in April 2026 whether they're ready or not. This reinforces finding #4 from our map: "Agents arriving in your software whether you plan for it or not."

**But the adoption crisis is real.** The gap between Microsoft's agent ambitions and actual user adoption is the widest of any platform. Only 3.3% penetration after 2 years. Users who have choice prefer competitors. The Anthropic pivot (Cowork built on Claude) signals Microsoft knows GPT-based Copilot was not enough.

**The pattern for our buyers:** Microsoft will push agents into every enterprise M365 tenant starting April 2026. This creates an urgency signal: your people WILL encounter agents in their daily tools. The question is whether they're prepared. But the adoption data shows that having the technology deployed ≠ having it used effectively. This is exactly the competence gap our training addresses.

**Evidence level:** Level 1-2 overall. Strong vendor announcements (Level 0) with some independent practitioner evidence (Copilot Studio reviews, adoption surveys, SpreadsheetBench data). No independent Dynamics 365 agent deployment stories found.

**Finding category:** Mixed — Platform Announcement (Wave 1 features) + Context (adoption struggles, Copilot Studio feedback). NOT Production Agentic (no independently verified deployment outcomes).

### What We Did Not Find (Microsoft-specific)

1. **No independent Dynamics 365 agent deployment case studies** — all quantified results are vendor-sourced
2. **No Copilot Cowork practitioner reviews** — still in Research Preview, zero independent feedback (25th consecutive cycle tracking this)
3. **No Nordic enterprise Copilot agent deployments** — Sofigate uses Copilot (assistant), not agents
4. **No evidence that Agent Mode in Office apps is changing work patterns** — shipped since Nov 2025 but no practitioner blog posts describing sustained use
5. **No Dynamics 365 Contact Center agent deployment stories** — "agentic contact center" is announced, not deployed
6. **No comparison of Copilot Studio agents vs. purpose-built alternatives** in real enterprise settings

---

## Oracle Fusion Cloud: 29 New Agents (February 2026)

Oracle unveiled 29 new prebuilt AI agents at Oracle AI World (Mumbai, February 10, 2026):
- 13 agents for supply chain management
- 16 for customer experience
- Built using Oracle AI Agent Studio
- Available at no additional cost to existing customers

- Source: https://siliconangle.com/2026/02/10/oracle-adds-40-agents-fusion-cloud-suite/ [domain trade publication]
- Source: https://cloudwars.com/ai/oracle-expands-fusion-cloud-with-29-prebuilt-ai-agents-for-scm-and-cx/ [domain trade publication]

**Assessment:** "No additional cost" is significant — removes the pricing objection. But zero independent deployment evidence found. No practitioner reviews. No customer testimonials outside Oracle's own materials.

**Evidence level:** Level 0 (vendor announcement only).
**Finding category:** Platform Announcement.

---

## Workday Illuminate: Still Mostly Vapor

Workday claims from vendor materials:
- Financial Audit Agent: "saved early access customers up to 900 hours per year"
- Contract Intelligence Agent: "cuts contract execution time by 65%"
- Frontline Agent: "reduces time on staffing changes by up to 90%"
- Payroll Agent: unnamed outcomes

- Source: https://www.techtarget.com/searchhrsoftware/news/366625056/Workday-adds-seven-agents-to-Illuminate-platform [domain trade publication]
- Source: https://joshbersin.com/2024/09/what-is-workday-illuminate/ [practitioner analysis — but from Sept 2024, stale]

**Assessment:** All metrics are vendor-sourced ("early access customers"). No independent verification. No Reddit discussions. No practitioner blog posts. February assessment of "zero practitioner evidence" stands. The numbers (900 hours, 65%, 90%) are suspiciously round and not attributed to named customers.

**Evidence level:** Level 0 (vendor claims only).
**Finding category:** Platform Announcement.

---

## What We Did Not Find

1. **No independent SAP Joule deployment case studies** with named customers and measurable outcomes from non-SAP sources. Reddit discussions about Joule are absent.
2. **No Workday Illuminate practitioner evidence** — the gap between Workday's claims and practitioner reality remains the widest of any platform.
3. **No Oracle Fusion agent customer deployments** — 29+ agents announced, zero customer stories found.
4. **No ServiceNow Autonomous Workforce customer deployments** — only ServiceNow's own internal use cited.
5. **No A2A (Agent-to-Agent) protocol adoption evidence** in enterprise platforms — all platforms operate within their own walled gardens.
6. **No independent Microsoft Copilot Cowork reviews** — Research Preview only, 25th consecutive cycle with zero practitioner feedback.
7. **No independent Dynamics 365 agent deployment case studies** — all quantified outcomes are vendor-sourced or Forrester TEI (commissioned).
8. **No evidence Agent Mode in Office apps is changing sustained work patterns** — GA since Nov 2025, but no practitioner blogs describing ongoing use beyond initial impressions.

---

## Updated Platform Assessment (March 2026)

| Platform | Feb 2026 Assessment | March 2026 Update | Direction |
|----------|-------------------|-------------------|-----------|
| Salesforce Agentforce | Real but narrow | Real, maturing, still polarizing. $540M ARR. Finnair (Nordic). Anti-patterns at L3 convergence. | ↑ (genuine scale) |
| SAP Joule | Vaporware | GA but unverified. Upgraded from L0 to L0-1. | ↑ (slight) |
| ServiceNow | Moveworks acquired | Autonomous Workforce launched. 2 beta customers named, zero results reported. | ↑ (announcement only) |
| Microsoft D365/Copilot | Account Reconciliation Agent | Release Wave 1 shipping April 2026. Agent Mode GA in Office. Cowork (Anthropic) in preview. Adoption crisis: 3.3% penetration, declining share. | ↑↓ (features up, adoption down) |
| Oracle Fusion | 40+ agents announced | 29 new agents (Feb), no additional cost. Zero deployment evidence. | → (unchanged) |
| Workday Illuminate | Zero practitioner evidence | Still zero. Vendor claims only. | → (unchanged) |

**The headline:** The platform agent wave is accelerating (ServiceNow Autonomous Workforce, Microsoft Release Wave 1, SAP Joule GA). But the announcement-to-deployment gap remains wide for all platforms except Salesforce Agentforce, which has real but polarizing deployment evidence. **Microsoft's paradox:** the most pervasive agent rollout (M365 is everywhere) paired with the most visible adoption crisis (3.3% penetration, declining share, users preferring competitors). The Anthropic pivot (Cowork built on Claude) is the most significant architectural signal — Microsoft is hedging away from GPT-only.

---

## Cycle 59 Incremental Update (March 23, 2026)

### New Platform Entrants

**Snowflake Project SnowWork (March 18, 2026):** Autonomous enterprise AI for business users. Plans and executes multi-step workflows across governed Snowflake data. Research preview stage only. No deployment evidence.
- Source: [Snowflake press release](https://www.snowflake.com/en/news/press-releases/snowflake-launches-project-snowwork-bringing-outcome-driven-ai-to-every-business-user/) [vendor press release — Level 0]

**HubSpot Breeze "Run Agent" workflow action (Feb 2026 beta):** First step from copilot to agentic execution within HubSpot. Agents can now trigger inside automated workflows. 4 core agents operational (Customer, Prospecting, Content, Data). Customer Agent supports 9 channels including voice (beta).
- Source: [Stream Creative](https://www.streamcreative.com/hubspot-ai-agents) [practitioner analysis], [OnTheFuze](https://www.onthefuze.com/hubspot-insights-blog/hubspot-breeze-ai-agents-2026) [practitioner analysis]
- **Evidence level:** Level 1-2 (product descriptions, no deployment results)

### Nordic Signal: Cognite (Norway) Industrial Operations Agents

**Cognite Atlas AI** — industrial agent workbench for heavy-asset industries. $170M+ annual revenue. Named customer Aker BP (Norwegian offshore oil) uses agents to automate data extraction/normalization from supplier PDFs and root-cause analysis (weeks → hours). Yggdrasil asset designed for 2-person agent-assisted operations. Other clients: TotalEnergies, NOVA Chemicals, Cosmo Energy, SBM Offshore.
- Source: [Cognite blog](https://www.cognite.com/en/resources/blog/cognite-march-2026-release-accelerates-value-realization-across-industrial-workflows) [vendor press release], [Techzine](https://www.techzine.eu/blogs/data-management/135432/cognite-impact-2025-fusing-new-metal-inside-the-industrial-ai-furnace/) [tech press]
- **Evidence level:** Level 2 (multiple named customers, vendor-reported results)
- **Nordic label:** Nordic-origin deployment (Cognite is Norwegian, Aker BP is Norwegian)
- **Caveat:** Cognite is a platform vendor. Aker BP results are vendor-sourced. No independent practitioner reports.

### Agentforce Anti-Pattern Convergence Deepening

New patterns surfacing from multiple independent practitioners:
- **Instruction bloat:** Customers add excessive guardrails, causing agents to fail. Straight path works; branching/judgment fails.
- **Policy conflict loops:** Overlapping topic keywords cause Atlas Reasoning Engine to pause or loop.
- **Data quality as universal blocker:** Agentforce exposes all data quality problems humans previously compensated for.
- Sources: [Apex Hours](https://www.apexhours.com/agentforce-limitations-and-workarounds/) [practitioner direct], [Salesforce King](https://www.salesforceking.com/agentforce-deployment-problems-solutions) [practitioner direct]
- **Evidence level:** Level 3 (convergence across multiple independent practitioners — instruction bloat + data quality + policy conflicts all independently reported)

### Nordic Ecosystem Signals

AI Finland declared Agentic AI as primary 2026 theme. Free AI Agent Fundamentals course (1 ECTS) launched by consortium including Gofore, Microsoft, EY. Gofore founded new AI subsidiary. Nordic firms reportedly deploy AI solutions 20% faster than European average.
- **Evidence level:** Level 1 (ecosystem signals, no deployment evidence) [SOURCE NEEDED for primary URLs]

### Tier 1 Item Status (unchanged)

| Item | Status | Cycle Count |
|------|--------|------------|
| Copilot Cowork independent reviews | Zero | 25th consecutive |
| Antspace official announcement | Silence | 26th consecutive |
| Zendesk-Forethought close | Still pending | Within expected window (end of March) |

### Greenlite → Bretton AI Update

Previously tracked as Greenlite AI (Lawrence & Jin). Rebranded to Bretton AI after $75M Series B. Client base expanded: now includes Ramp, Mercury, Betterment, Gusto, RSM UK. OCC-regulated bank cut Enhanced Due Diligence review time by 70%.
- Source: [FinTech Global](https://fintech.global/2025/05/22/regtech-innovator-greenlite-ai-secures-15m-to-scale-trusted-ai-compliance-agents/) [general press]
