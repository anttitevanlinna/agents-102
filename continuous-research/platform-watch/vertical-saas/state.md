---
type: state
domain: platform
evidence_level: 3
platforms: [salesforce, zendesk, servicenow, sap, workday]
nordic: true
updated: 2026-04-03
cycle: 87
answers:
  - "which vertical SaaS platforms have real agent deployments?"
  - "is customer service crossing the chasm?"
  - "what are the limits of vertical SaaS agents?"
---

# Vertical SaaS Agent Platforms — Platform State

Last updated: 2026-04-07 (cycle 92)
OODA cycles: 12

## Focus

Vertical SaaS platforms that have shipped agent capabilities for business users. These platforms have a structural advantage over horizontal platforms (Microsoft/Google/OpenAI): they already own the data, workflows, and enterprise trust relationships.

**The key question:** Are vertical SaaS platforms ahead of horizontal platforms for domain-specific agent use cases?

**Answer (March 2026):** Yes, for constrained domain-specific tasks. Customer service has convergence-level evidence (Level 3). Other domains are earlier. But the advantage is narrow — each platform is strong only in its lane.

## Platform Summary

### Salesforce Agentforce — CRM / Sales / Service
- **Scale (FY2026 full year):** Q4 revenue $11.2B (+12%). 29,000 deals, 12,000 deployed customers, $800M ARR (up 169% YoY). Agentforce + Data 360 ARR exceeded $2.9B (up 200%+ YoY). 60%+ of Q4 bookings from existing customer expansion. Fastest-growing Salesforce product ever. ([Subscription Insider](https://www.subscriptioninsider.com/article-type/news/salesforce-fy2026-results-show-subscription-led-revenue-base-as-agentforce-becomes-a-fast-growing-layer); [CX Today](https://www.cxtoday.com/crm/agentforce-becomes-salesforces-fastest-growing-product-ever/); [Silicon Review](https://thesiliconreview.com/2026/03/salesforce-record-q4-fiscal-2026-results-agentforce), FY2026 results)
- **Named deployments:**
  - Reddit: 46% case deflection, 84% faster resolution (8.9 min → 1.4 min) — new Mar 2026
  - Finnair (Nordic): 80% chat resolution, 30% faster onboarding — first airline adopter ([Diginomica](https://diginomica.com/how-finnair-aims-fly-high-agentforce), [TechInformed](https://techinformed.com/agentforce-finnair-deployment/))
  - Wiley: 40%+ case resolution improvement, $213K saved ([TechInformed](https://techinformed.com/salesforce-launches-agentforce-saks-wiley-and-wyndham-spearhead-no-code-ai-for-enterprise/))
  - reMarkable (Nordic): 50% autonomous case handling + internal agents via Slack ([vendor case study — Level 0](https://www.salesforce.com/agentforce/metrics/))
  - 1-800Accountant: 70% repetitive inquiry automation during tax season ([Ksolves](https://www.ksolves.com/blog/salesforce/top-companies-using-agentforce))
  - Engine (travel): $2M projected savings (forward-looking, not yet realized), CSAT 3.7→4.3, deployed in 12 days ([TechHQ](https://techhq.com/news/salesforce-agentforce-enterprise-agentic-ai/), Apr 2026) — [domain trade publication]
  - **Falabella (cycle 92, Apr 2026):** Grupo Falabella (major LatAm retailer — Sodimac, Mall Plaza brands) deployed Agentforce on WhatsApp CS in Colombia. 60% autonomous resolution of WhatsApp service requests. Usage jumped from <50% to >70% of CS interactions within 3 weeks. 25% of conversations outside business hours (always-on coverage without staffing). ~2-month deployment timeline. Plans to expand to order cancellations, additional brands, sales/marketing/commerce. ([Salesforce Ben](https://www.salesforceben.com/whatsapp-first-strategies-with-agentforce/), Q1 2026 — [domain trade publication]; [Salesforce customer story](https://www.salesforce.com/customer-stories/grupo-falabella/) — Level 0)
  - Nexo: 62% case resolution as early adopter despite "technical debt" challenges ([CX Today](https://www.cxtoday.com/crm/agentforce-case-studies/))
  - Engie: 83% user assistance rate ([CX Today](https://www.cxtoday.com/crm/agentforce-case-studies/))
  - Safari365: turned 15% efficiency goals into 30%+ reality, 35 employees ([CX Today](https://www.cxtoday.com/crm/agentforce-case-studies/))
- **Limitations:** 15 topics max, 15 actions per topic per agent, 20-agent limit per org. Pricing shifted from $2/conversation to usage-based credits ($0.10/action) after "whiplash-inducing" backlash ([Monetizely](https://www.getmonetizely.com/blogs/the-doomed-evolution-of-salesforces-agentforce-pricing)). Atlas Reasoning Engine: session-to-session variance in production — identical scenarios triggering different paths. Salesforce added Agent Script (deterministic control layer), walking back autonomy promise. BYOM unsupported — locked into Salesforce's AI ecosystem. Token burn problem: agent retries approaches, consuming Flex Credits per turn. Topic conflicts: overlapping keywords cause Atlas Reasoning Engine to pause. External data latency compounds inference speed. 86% of IT leaders concerned agents add complexity without integration. ([Salesforce Ben](https://www.salesforceben.com/why-agentforce-adoption-is-slower-than-expected-and-what-salesforce-needs-to-do/); [CIO.com](https://www.cio.com/article/4113617/salesforces-agentforce-recalibration-raises-costs-and-complexity-for-cios.html); [Apex Hours](https://www.apexhours.com/agentforce-limitations-and-workarounds/); [SPTech](https://sptechusa.com/blog/salesforce-agentforce-adoption-challenges-and-fixes/))
- **FY2026 revenue arc (cycle 45):** Started with Feb 2025 revenue miss (forecast below estimates, citing slower Agentforce adoption). Recovered through FY2026: Q3 guidance raised to $41.45-41.55B. Final: $800M ARR, 29K deals. Salesforce internal ("Customer Zero"): 1.5M+ support requests handled (majority without humans), SDR agent generated $1.7M pipeline from dormant leads, 500K hours via Slack agents. ([US News](https://www.usnews.com/news/top-news/articles/2025-02-26/salesforce-forecasts-annual-revenue-below-estimates); [Salesforce IR](https://investor.salesforce.com/news/news-details/2025/Salesforce-Delivers-Record-Third-Quarter-Fiscal-2026-Results-Driven-by-Agentforce--Data-360/default.aspx))
- **Practitioner verdict (strengthened cycle 52):** Convergent criticism now approaching Level 3: adoption slower than marketed, autonomy walked back, pricing unstable. Sub-20% workflow adoption rates vs. 90%+ in natively integrated platforms. Healthcare: 23% inaccuracies in automated inventory orders. Manufacturing: 40% longer lead times when agents couldn't adapt. Architectural limits constrain multi-department scaling: 15 topics/15 actions per agent, 20-agent limit per org, Data Cloud subscription mandatory, $50-150K typical implementation. **Cycle 52 — Technical debt inheritance (3+ independent practitioner sources):** Agentforce inherits all org technical debt. Governor limit failures (CPU 10s budget, 150 DML limit), Agent User permission model works in test/fails in production, data quality as hard prerequisite. NexGen Architects: "Agentforce fails when deployed on fragmented CRM architecture. The issue isn't AI capability — it's data readiness." Sweep: five recurring errors all trace to org complexity, not AI limitations. ([NexGen Architects](https://www.nexgenarchitects.com/blog-posts/salesforce-agentforce-implementation-fails); [Sweep](https://www.sweep.io/blog/the-5-salesforce-errors-that-break-agentforce); [Salesforce Ben](https://www.salesforceben.com/4-critical-features-for-agentforce-architecture-in-2026/), Q1 2026). Greyhound Research CEO: "CIOs budgeted based on autonomy vision. What Salesforce is now saying is that autonomy without guardrails is unscalable." Compounding error problem: 85% per-step accuracy = 20% success on 10-step workflows. ([Salesforce Ben](https://www.salesforceben.com/why-agentforce-adoption-is-slower-than-expected-and-what-salesforce-needs-to-do/); [CIO.com](https://www.cio.com/article/4113617/salesforces-agentforce-recalibration-raises-costs-and-complexity-for-cios.html), Mar 2026)
- **New deployment: UK police department "Bobby"** — non-emergency calls, 90+ topics, 20% reduction in human agent demand. ([Codleo](https://www.codleo.com/blog/salesforce-spring-26-release), Mar 2026)
- **Expanding beyond customer service (cycle 40):**
  - **Williams-Sonoma "Olive":** Deployed across all 9 brands (WSM, West Elm, Pottery Barn, etc.). Handles ~60% of website conversations. Salesforce Ben independent review: "probably the most effective" Agentforce deployment, but "still in early stages" with struggles on specific questions. Data 360 (hyperscale data engine) underpins it. ([CX Dive](https://www.customerexperiencedive.com/news/williams-sonoma-ai-agents-portfolio/802914/); [Salesforce Ben](https://www.salesforceben.com/are-agentforce-agents-as-powerful-as-salesforce-claims/), Mar 2026)
  - **IRS:** Deployed across Office of Chief Counsel, Taxpayer Advocate Services, Office of Appeals after 25% workforce reduction (100K → 75K). Case openings 10 days → 30 minutes. 98% manual activity reduction in Chief Counsel. Built with guardrails — no final decisions, no fund dispersal. Independently confirmed. ([Axios](https://www.axios.com/2025/11/21/irs-deploys-ai-agents); [CX Today](https://www.cxtoday.com/contact-center/irs-adopts-salesforces-agentforce-as-staffing-cuts-strain-tax-agency-service-quality/))
  - **RBC Wealth Management:** 4,500 financial advisors. Meeting prep from >1 hour to <1 minute. [ecosystem-sourced, not independently verified]
  - **Note:** Deployment evidence quality decreases outside customer service. IRS and Williams-Sonoma have independent confirmation. RBC is ecosystem-sourced only. Sales operations/finance deployments still thinner than CS.
- **Salesforce's own Help Portal: 62% case resolution rate (target 80%).** This is Salesforce eating its own cooking and falling short. Initially only 2 of 6 test use cases worked well. ([Salesforce Ben 6-month review](https://www.salesforceben.com/agentforce-for-salesforce-help-6-month-review-and-whats-improved/), Mar 2026)
- **Spring 2026 release:** Agentforce Contact Center (voice + digital + CRM), Agentforce Builder (no-code to pro-code). Acquisitions: Qualified (marketing agents), Cimulate (product discovery/commerce). Partners leading 70% of implementations. ([Salesforce](https://www.salesforce.com/news/stories/spring-2026-product-release-announcement/) — Level 0)
- **93% accuracy claim insufficient for enterprise** — Six Sigma = 99.999%. Gap between claimed and observed accuracy is the story. ([Salesforce Ben adoption reality](https://www.salesforceben.com/where-are-we-really-at-with-agentforce-adoption/), Mar 2026)
- **Nordic signal:** Strong. Finnair + reMarkable. Salesforce opened Stockholm office Dec 2025 for Nordic Agentforce adoption. World Tour events: Copenhagen (Apr 23), Oslo (May 20), Stockholm (May 27). Hiring Forward Deployed Engineers across Nordic capitals. Majblomman (Swedish nonprofit) won hackathon concept — not production.
- **Evidence level:** Level 2-3 (customer service convergence; counter-evidence also at Level 2-3)

### Zendesk AI Agents — Customer Service
- **Scale:** ~20,000 enterprise customers, 4.6B tickets/year.
- **Forethought acquisition — CLOSED March 26, 2026 (cycle 92):** Announced March 11, closed March 26. All-cash, largest in Zendesk history. Adds: self-improving AI with "Resolution Learning Loop" (detects workflow gaps, generates procedures, tests before deployment), "computer use" for legacy systems without APIs, native voice automation. Forethought was handling 1B+ interactions/month pre-acquisition; $115M total funding. Vendor claim: roadmap acceleration "over a year." Integration timeline for customer-facing capabilities unknown — key watch item. ([TechCrunch](https://techcrunch.com/2026/03/11/zendesk-acquires-agentic-customer-service-startup-forethought/); [CMSWire](https://www.cmswire.com/customer-experience/zendesk-acquires-forethought-for-self-learning-ai-agents/); [Morningstar/PR Newswire](https://www.morningstar.com/news/pr-newswire/20260326sf19710/zendesk-completes-acquisition-of-forethought), Mar 26 2026)
- **Named deployment:**
  - SeatGeek: 51% auto-resolution in 4 months, 57,000 queries autonomous during peak events ([TechBuzz.ai](https://www.techbuzz.ai/articles/zendesk-s-ai-agent-claims-80-issue-resolution-rate))
  - **NEW (cycle 69): Hack'celeration independent review** — 3-month test across 3 deployments (15, 30, 80 agents). 200 real tickets: 68% fully autonomous resolution, 22% useful drafts, 10% correctly escalated. E-commerce client: first-response time 4 hours → 18 minutes. 30-agent team: AI handled 112 tickets/day autonomously. ([Hackceleration](https://hackceleration.com/zendesk-review/) — [practitioner analysis], Nov 2025)
- **Architecture:** Multi-step: understand query → search KB → execute actions (refunds, cancellations) → LLM verification. Genuinely agentic within bounded domain.
- **Pricing:** $1.50-$2.00 per automated resolution (outcome-based) ([eesel.ai](https://www.eesel.ai/blog/zendesk-automated-resolutions))
- **Revenue projection:** $200M AI ARR for 2026, $500M by year-end, targeting $1B agentic by 2028. Level 0.
- **Evidence level:** Level 2-3 (independently reported results)
- **Nordic signal:** None found

### ServiceNow (Now Assist / AI Agents) — IT Ops / Employee Service
- **Scale:** $600M+ ACV (doubled YoY), tracking to $1B+ in 2026. 244 deals >$1M in Q4 (~40% YoY growth). 35 deals >$1M for Now Assist in Q4 alone. Deals with 5+ Now Assist products grew 10x YoY. AI Control Tower volume 4x targets. Total revenue $3.6B Q4 (+20.5% YoY). 603 customers >$5M ACV. ([Futurum](https://futurumgroup.com/insights/servicenow-q4-fy-2025-earnings-highlight-ai-platform-momentum/); [ServiceNow IR](https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-Reports-Fourth-Quarter-and-Full-Year-2025-Financial-Results-Board-of-Directors-Authorizes-Additional-5B-for-Share-Repurchase-Program/default.aspx))
- **Named customers:** ExxonMobil, Standard Chartered, Merck — no detailed metrics from any. CVS Health and City of Raleigh as beta customers for Autonomous Workforce.
- **Moveworks acquisition ($2.85B, Dec 2025):** 250 mutual customers. "Autonomous Workforce" launched Feb 26, 2026. L1 Service Desk AI Specialist in controlled availability, GA expected Q2 2026. "EmployeeWorks" combines Moveworks conversational AI + ServiceNow workflows. ([ServiceNow newsroom](https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-launches-Autonomous-Workforce-that-thinks-and-acts-adds-Moveworks-to-the-ServiceNow-AI-Platform/default.aspx) — vendor Level 0)
- **Autonomous Workforce (cycle 40 update):** Launched Feb 26, 2026. L1 Service Desk AI Specialist in controlled release, GA Q2 2026. Genuinely agentic per independent analysis (Derek du Preez, Diginomica): "diagnoses, executes, documents, notifies the affected employee, and updates the knowledge base. Start to finish." End-to-end workflow execution, not chatbot. AI Control Tower for governance: hub-and-spokes architecture, agents tied to existing enterprise permissions, no self-escalation. NVIDIA partnership for AI-Q blueprint. Roadmap: L1 Service Desk → Employee Service Agent → Security Operations Analyst → Project Coordinator. ([Diginomica](https://diginomica.com/servicenows-autonomous-workforce-here-and-its-impressive-are-enterprises-ready-it); [No Jitter](https://www.nojitter.com/ai-automation/servicenow-launches-autonomous-workforce); [TechTarget](https://www.techtarget.com/searchitoperations/news/366639250/ServiceNow-touts-AI-governance-for-its-Autonomous-Workforce), Feb-Mar 2026)
- **Internal deployment:** 90%+ of employee IT requests handled autonomously, 99% faster than human agents. ([VentureBeat](https://venturebeat.com/orchestration/servicenow-resolves-90-of-its-own-it-requests-autonomously-now-it-wants-to))
- **Beta customers:** CVS Health (300K colleagues, healthcare compliance — Alan Rosa CISO: "boring is beautiful, focus on value not novelty") and City of Raleigh (98% initial touchpoint routing via Now Assist). CVS was pre-existing ServiceNow + Moveworks customer; has not committed publicly to Autonomous Workforce deployment. **Cycle 42 update:** CVS Health CISO Alan Rosa confirmed (TechTarget interview) that every AI use case runs through clinical, legal, privacy, and security review. Cited reduced referral processing times and faster claim handling — first independent practitioner-level detail from a beta customer. ([Diginomica](https://diginomica.com/servicenows-autonomous-workforce-here-and-its-impressive-are-enterprises-ready-it), Feb 2026; [TechTarget](https://www.techtarget.com/searchitoperations/news/366639250/ServiceNow-touts-AI-governance-for-its-Autonomous-Workforce), Mar 2026)
- **Independent skepticism (deepened cycle 52):** Only 21.4% of CIOs report AI success rates >80%. Gap between ServiceNow's disciplined implementation requirements and actual enterprise maturity. "Whether customers can actually get there" is the critical question. ([Diginomica](https://diginomica.com/servicenows-autonomous-workforce-here-and-its-impressive-are-enterprises-ready-it)). **CIO.com analyst roundup (Mar 2026):** Scott Bickley (Info-Tech): "considerable groundwork required" — not turnkey. Sanchit Vir Gogia (Greyhound Research): "correctness of direction does not guarantee maturity of execution." **No accountability framework disclosed** — ServiceNow "didn't say who would be accountable if one of its AI specialists went off the rails." CFO risk: "CFOs will not tolerate a variable pricing model that destroys budget predictability." Pricing still undisclosed. ([CIO.com](https://www.cio.com/article/4138035/servicenow-plans-automation-of-l1-service-desk-roles-promises-more-ai-specialists-to-come.html), Mar 2026). **Revenue signal: AI-related offerings expected >$1B this year.** ([VentureBeat](https://venturebeat.com/orchestration/servicenow-resolves-90-of-its-own-it-requests-autonomously-now-it-wants-to), Feb 2026)
- **G2 reviews:** Top positives — Efficiency (22), Ease of Use (17). Top negatives — Inaccuracy (10), Poor Understanding (8), Limited AI (8), Complex Configuration (8). ([G2](https://www.g2.com/products/servicenow-ai-agents/reviews) — Level 2 aggregate)
- **Security:** AppOmni found Now Assist agents vulnerable to prompt injection when misconfigured.
- **Practitioner reality check:** Mark Orsborn: most orgs claiming Phase 3 maturity are actually Phase 2. CMDB accuracy below 90% threshold needed for agents. Realistic Phase 1→4: 18-33 months. ([Medium](https://medium.com/@markorsborn/the-four-phases-of-servicenow-ai-evolution-7733cf0d6efa))
- **Cycle 45 updates:**
  - **Paul Fipps confirmation (Diginomica interview, Mar 2026):** "We no longer have a level one Help Desk at ServiceNow. All of that level one help desk activity is now handled autonomously using agentic AI." Displaced L1 workers moved to cloud ops, L2, or data centers. Strongest practitioner-level statement yet — but vendor-internal only. ([Diginomica](https://diginomica.com/servicenows-paul-fipps-enterprise-ai-llm-reasons-its-platform-executes))
  - **AI Gateway enforcement live (March 2026 release):** Governance layer now active. AI Stewards control agent connections across platforms (Microsoft Copilot Studio, AWS Bedrock, Google Vertex AI) via MCP. Automated client registration via CIMD. ServiceNow positioning as cross-platform governance hub. ([ServiceNow Community](https://www.servicenow.com/community/now-assist-articles/ai-gateway-what-s-new-in-the-march-2026-release/ta-p/3501670) — Level 0)
  - **A.G.E.N.T. Method:** Practitioner-developed five-phase framework for designing AI Agent use cases on ServiceNow. Pattern from customer engagements — indicates accumulating real-world experience. ([ServiceNow Community](https://www.servicenow.com/community/ceg-ai-coe-articles/the-a-g-e-n-t-method-a-practical-framework-for-designing-ai/ta-p/3509219))
  - **Implementation pain (counter-evidence):** AIx components are "very release-sensitive" — wrong patch level = missing UI, skills failing silently. Heavy dependency on AI Search quality. ([ServiceNow Spectaculars](https://servicenowspectaculars.com/servicenow-ai-experience-implementation-issues-2026/) — practitioner analysis)
  - **Knowledge 2026 (Las Vegas, imminent):** Banking-focused roadmap talk signals financial services vertical push. ([ServiceNow Community](https://www.servicenow.com/community/financial-services-special/servicenow-knowledge-2026-roadmap-for-banking-leaders-from/ta-p/3508192))
- **Nordic signal:** Acquired Advania's Quality 360 (Nordic company). No Nordic AI agent deployments found.
- **Evidence level:** Level 2 (strong revenue signal, weak deployment evidence — unchanged despite Fipps confirmation, which is vendor-internal)

### SAP Joule — ERP / Finance / Supply Chain / HR
- **Scale:** 400+ AI use cases planned by EOY 2026, 2,100+ Joule skills. Joule Studio Agent Builder GA January 2026 (free trial for SAP Build customers Q1 2026).
- **Domain-specific agents launching Q1-Q2 2026 (cycle 42 update):** Cash Management Agent (bank statement analysis/reconciliation, claims 80% time reduction), Production Planning Agent (validates/releases production orders), Bid Analysis Agent (evaluates supplier bids). Order Reliability Agent expected Q2. All vendor claims — zero independent deployment reports. ([AIMultiple](https://research.aimultiple.com/sap-ai-agents/), Q1 2026)
- **Unique position:** Only platform targeting core ERP processes — cash management, procurement, production planning, expense management. Deepest business process agents across any platform.
- **Expert assessment:** Josh Bersin: "SAP really has its AI act together" — ahead of Workday. Multi-functional agents (recruiting + training) = where big ROI comes. ([Josh Bersin](https://joshbersin.com/2025/10/sap-jumps-ahead-in-ai-agents-with-joule-hcm-features-and-more/))
- **Deployment evidence:** Bosch (Florian Haustein, Director Digital CX): "AI-powered case classification agent in SAP Service Cloud has been a game-changer" — no metrics, vendor-sourced. Accenture (Optisell, 3 weeks) and Western Sugar Cooperative (25% invoice processing reduction) — both vendor-sourced only. Production Planning Agent planned GA Q1 2026, Order Reliability Agent Q2 2026. ([SAP News Center](https://news.sap.com/2025/10/sap-connect-business-ai-new-joule-agents-embedded-intelligence/); [AIMultiple](https://research.aimultiple.com/sap-ai-agents/))
- **Limitation:** Heavily customized SAP environments limit native AI agent effectiveness — many enterprises need third-party solutions.
- **Cycle 45 updates:**
  - **Structural adoption barrier identified (Horváth study, Jan 2026):** Survey of 200 SAP-using companies (>€200M revenue): 60% still in S/4HANA transformation phase. Joule adoption is "early bird stage" — most experience based on tests and proof-of-value. This explains the evidence vacuum: not that Joule doesn't work, but most SAP customers can't try it yet. ([E3 Magazine](https://e3mag.com/en/companies-are-still-wary-of-sap-joule/) — [domain trade publication])
  - **Joule with SAP Signavio GA (Feb 2026):** Process analysis via natural language now generally available. ([SAP News](https://news.sap.com/2026/02/process-conversation-joule-sap-signavio-solutions-generally-available/) — Level 0)
  - **Techzine independent assessment:** "The next 12 to 18 months will be crucial — then we will see whether SAP's vision of agentic AI will work in practice, or whether we will drown in a sea of specialized agents." ([Techzine](https://www.techzine.eu/blogs/applications/135190/sap-presents-15-joule-agents-for-finance-hr-and-supply-chain/) — [domain trade publication])
  - **Josh Bersin update:** Joule "now becoming a standard front-end for business people" with A2A and MCP interoperability. ([Josh Bersin](https://joshbersin.com/2025/10/sap-jumps-ahead-in-ai-agents-with-joule-hcm-features-and-more/) — [practitioner analysis])
  - **Production Planning Agent:** Was supposed to be GA Q1 2026 — no customer reports found. Evidence gap continues.
  - **Still zero independent production deployment evidence.**
- **Cycle 52 updates:**
  - **Agent Builder GA confirmed Q1 2026.** Cash Management Agent reportedly GA. Supplier Onboarding Agent planned Q2.
  - **Bosch results are projections, not measurements:** "projected to reduce case routing time by 10%, increase first-contact resolution by 10%." Wieland Group described but no specific metrics. All evidence remains vendor-sourced.
  - **Free promotional tier for SAP Build customers Q1 2026** — suggests struggling to drive adoption beyond early adopters.
  - **Oxford Economics survey (SAP-commissioned, 1,600 execs):** "16% return on AI investments" — aggregate, not Joule-specific. Level 0.
  - **Hack2Build partner event:** Partners built functional prototypes in <7 days. Ecosystem activation signal, not enterprise deployment.
  - **Third-party observation (AIMultiple):** Heavily customized SAP environments limit native AI agent effectiveness, creating demand for third-party solutions.
  - **After 6 months post-announcement: zero independent practitioner has published about deploying Joule agents. Zero independent analyst has reviewed Joule agent deployments.** Evidence vacuum is now a Level 3 absence finding.
- **Evidence level:** Level 0-1 (downgraded from 1-2; prolonged absence of any independent evidence despite Agent Builder GA)
- **Nordic signal:** None found

### HubSpot Breeze — Marketing / Sales (SMB)
- **Scale:** 15+ Breeze Agents. Defaults to GPT-5 since Jan 2026.
- **Named deployment:** Zeffy: 84% support ticket deflection ([MyAskAI](https://myaskai.com/blog/hubspot-breeze-ai-agent-complete-guide-2026))
- **Practitioner assessment:** 8/10 for day-to-day, but 40% failure rate without proper config. No custom instructions. Credits expire monthly ($470/month for 500 extra conversations). Limited integrations outside HubSpot (5/10). ([Simple Machines](https://www.simplemachinesmarketing.com/blog/hubspot-ai-whats-actually-useful-and-what-to-skip/), [Resolve247](https://resolve247.ai/blog/hubspot-breeze/))
- **Cycle 45 update:** Agicap claims 750 hours/week saved (150 reps, 1 hr/day each) and 20% deal velocity increase — but this is a vendor case study on HubSpot's website (Level 0). Features used are copilot-level (call summaries, CRM automation, content drafting), not agentic. ([HubSpot](https://www.hubspot.com/case-studies/agicap-1) — [vendor case study])
- **Cycle 59 update:** New "Run Agent" workflow action (Feb 2026 beta) lets agents trigger inside automated HubSpot workflows — first step from copilot to agentic execution. 4 core agents now operational (Customer, Prospecting, Content, Data). Customer Agent supports 9 channels including voice (beta). Breeze Marketplace for pre-built agent configurations. ([Stream Creative](https://www.streamcreative.com/hubspot-ai-agents); [OnTheFuze](https://www.onthefuze.com/hubspot-insights-blog/hubspot-breeze-ai-agents-2026) — [practitioner analysis], Feb-Mar 2026)
- **Truly agentic?** Mostly copilot-level. Prospecting Agent in "fully autonomous" mode and "Run Agent" workflow trigger are the exceptions. Moving toward agentic.
- **Evidence level:** Level 2 (unchanged — Agicap is Level 0)
- **Nordic signal:** None found

### Sierra AI — Customer Service (Pure-Play) *(new cycle 45)*
- **Scale:** ~$150M ARR (Jan 2026 est., Sacra), up from $26M (end 2024) — nearly 6x growth. $10B valuation (Sep 2025, $350M round led by Greenoaks).
- **Platform:** Agent OS 2.0 with Agent Data Platform. Constellation model (multiple specialized AI models, not single foundation model). Voice agents surpassed text as primary channel by Sep 2025.
- **Customers:** WeightWatchers, SiriusXM, Sonos, ADT. Fortune 1000 focus.
- **Pricing:** Usage/outcome-based (per conversation or per resolution).
- **Deployment channels:** Chat, SMS, WhatsApp, email, voice, ChatGPT — single agent across all.
- **Concerns:** Valuation has grown faster than published track record. No specific deployment metrics found (resolution rates, CSAT, cost savings) despite $150M ARR. Expensive and non-transparent pricing. Onboarding requires considerable development work.
- **Evidence level:** Level 2 (revenue confirmed via Sacra; deployment metrics absent)
- **Nordic signal:** None found
- ([Sacra](https://sacra.com/c/sierra/); [CMSWire](https://www.cmswire.com/customer-experience/sierra-ais-10b-valuation-marks-a-turning-point-for-conversational-ai/))

### Emerging Competitors *(new cycle 45)*
- **Oliv.ai:** B2B sales agents, $19/user/month flat-rate, 1-2 day deployment. Explicitly positioned against Salesforce Agentforce. ([Apex Hours](https://www.apexhours.com/agentforce-limitations-and-workarounds/))
- **Suki AI:** Clinical documentation, healthcare vertical. Named in vertical AI landscape but no deployment evidence found.
- **Writer:** Enterprise AI platform, $200M+ raised. Positioned as vertical AI agent builder.
- **Lindy:** Sales and operations automation. Named in vertical AI landscape.
- **Investment thesis (Level 1):** Bessemer says vertical AI "fundamentally larger opportunity than vertical SaaS" — competing for labor budgets, not software budgets. Y Combinator says 10x larger than SaaS companies they replace. ([GeekWire](https://www.geekwire.com/2026/the-rise-of-vertical-ai-agents-and-the-startups-racing-to-build-them/); [VC Cafe](https://www.vccafe.com/2026/01/07/vertical-ai-in-2026-the-good-the-bad-and-the-ugly/))

## Cross-Platform Patterns (updated cycle 15)

### Pattern 5: Reasoning model hallucination paradox (Level 2-3)
Reasoning models (GPT-5 thinking, Claude extended thinking, DeepSeek-R1) are WORSE at factual accuracy despite better logic. OpenAI o3: 33% hallucination on PersonQA (vs 16% o1). DeepSeek R1: 14.3% (vs V3 base: 3.9%) — 4x worse. The "smartest" models are least reliable on facts. For customer-facing agents, factual reliability must be tested separately from reasoning. ([Suprmind](https://suprmind.ai/hub/ai-hallucination-rates-and-benchmarks/), 2025-2026)

### Pattern 6: Supervision architecture > model quality (Level 2)
Vertical Insure achieved "zero customer-facing hallucinations" via supervision layer catching fabrications before reaching customers — not by eliminating model hallucinations. Industry standard emerging: source-attributed answers, 95%+ accuracy test suites, observability layers. ([Yuma AI](https://yuma.ai/blogs/ai-hallucinations-in-customer-service-why-quality-control-architecture-matters), 2026)

### Pattern 7: Consolidation wave accelerating
ServiceNow + Moveworks ($2.85B), Zendesk + Forethought (undisclosed), Salesforce + Convergence.ai + Cimulate, NICE + Cognigy (~$955M). 50+ agentic AI acquisitions in past 2 years. Platform landscape will look different in 6 months.

### Pattern 8: Governance-as-platform is the emerging battleground (Level 2, cycle 45)
ServiceNow AI Gateway now enforces governance across heterogeneous agent platforms (Microsoft Copilot Studio, AWS Bedrock, Google Vertex AI) via MCP. Salesforce added Agent Script as a deterministic control layer. SAP emphasizes process mining + Signavio as governance context. The competitive differentiation is shifting from "who has the smartest agents" to "who controls the governance layer." This echoes the cloud era's shift from compute power to management planes.



### Pattern 1: Customer service is the breakthrough domain (Level 3 convergence)
3+ platforms independently showing 40-80% autonomous resolution: Zendesk (51% SeatGeek), Salesforce (80% Finnair chat, 40%+ Wiley), HubSpot (84% Zeffy). Clear success criteria + bounded scope + human escalation tolerance = why this domain leads.

### Pattern 2: Most deployed "agents" are still copilots
Despite marketing language, majority do: summarization, search, content generation, single-step completion. Orsborn (ServiceNow): "Most organisations claiming Phase 3 are Phase 2 with aspirations." Truly autonomous multi-step workflows are just reaching GA (SAP Q1 2026, ServiceNow Zurich Mar 2025).

### Pattern 3: Pricing shifting to outcome-based
Zendesk $1.50-$2.00/resolution, Salesforce $2/conversation, HubSpot credit model. Aligns incentives with effectiveness but creates budget unpredictability enterprises struggle with.

### Pattern 4: The vertical advantage is data context
Vertical platforms win because they already own the data. Zendesk has the ticket history + KB + customer context. Salesforce has the CRM. SAP has the ERP. A horizontal platform needs extensive integration to match.

## Personal → Team → Company Progression

| Level | Platform | Maturity | Evidence |
|-------|----------|----------|----------|
| Team | Salesforce Agentforce | Production | Finnair, Wiley — independently verified |
| Team | Zendesk AI Agents | Production | SeatGeek — independently reported |
| Team | HubSpot Breeze | Production | Zeffy — single report |
| Team | Sierra AI | Production | $150M ARR, no published metrics |
| Team→Company | ServiceNow | Foundation | Strong revenue, internal deployment, no external customer results |
| Team→Company | SAP Joule | Early GA | Expert endorsement, S/4HANA migration blocks most customers |
| Company | All platforms | Aspirational | No cross-function autonomous agent evidence anywhere |

## What We Need To Learn

- [x] Nordic companies on Zendesk, SAP, ServiceNow, or HubSpot agent platforms — **Answer: None found on vertical SaaS agents. Only Finnair + reMarkable (Salesforce). Nordea (largest Nordic bank) explicitly chose to build internally on AWS Bedrock rather than adopt vertical SaaS agents — 10K employees on internal platform, 91-95% resolution via Boost.ai chatbots. ([Hyperight](https://hyperight.com/banking-on-ai-nordea-poc-to-10000-users/))**
- [x] Head-to-head practitioner comparison (someone who deployed 2+ platforms) — **Answer: Does not exist. All comparisons are vendor marketing or consultant opinion.**
- [ ] Cost-effectiveness: vertical SaaS agents vs building on horizontal platforms
- [ ] Multi-agent orchestration in production at any vertical vendor
- [ ] Failure case studies (specific companies, not analyst predictions)
- [~] Customer service agent accuracy/hallucination rates in production — **Partial: Best models 0.7-1.5% on grounded tasks. Reasoning models paradoxically worse (o3: 33%, R1: 14.3%). Supervision architecture matters more than model quality. Salesforce own portal: 62% vs 80% target.**
- [x] SAP Joule production deployment results (beyond vendor case studies) — **Answer: Zero independent evidence. Agents just reaching GA Q1 2026. Partner feedback (Accenture, Capgemini) all vendor-sourced.**
- [~] Zendesk-Forethought integration: when do combined capabilities ship? **Partial (cycle 68): Acquisition announced March 11, expected to close end of March. Zendesk's largest acquisition in two decades. Forethought: self-improving AI agents, 1B+ monthly interactions. Follows Finnish Ultimate acquisition (2024). No integration details yet.**
- [~] ServiceNow Autonomous Workforce: GA Q2 2026 — watch for early customer reports. **Cycle 45: Paul Fipps confirmed L1 elimination internally. No external customer results yet. GA still expected Q2 2026.**
- [ ] Nordic signal at Salesforce World Tour events (Copenhagen Apr 23, Oslo May 20, Stockholm May 27)
- [ ] Sierra AI: find specific deployment metrics (resolution rates, CSAT) to match revenue claims
- [ ] SAP Joule Production Planning Agent: customer reports post-GA

## Next Cycle Priorities

1. **ServiceNow Knowledge 2026 (Las Vegas, imminent).** Watch for customer deployment announcements, especially banking/financial services. First external Autonomous Workforce results?
2. **Zendesk-Forethought integration.** Deal expected to close end of March 2026. When do combined capabilities ship?
3. **Sierra AI deployment metrics.** $150M ARR with no published outcomes is a yellow flag. Find practitioner reports.
4. **SAP Joule Production Planning Agent.** Was supposed to be GA Q1 2026 — any customer reports? Order Reliability Agent expected Q2.
5. **Nordic signals at Salesforce World Tour Copenhagen (Apr 23).**
6. **Agentforce beyond customer service.** New named deployments (Engine, Nexo, Engie, Safari365) are all still customer service. Any sales/marketing/operations evidence?
7. **Governance-as-platform competition.** ServiceNow AI Gateway vs. Salesforce Agent Script vs. SAP Signavio. Which approach is winning practitioner trust?
8. **Oliv.ai and pure-play challengers.** Are low-cost, fast-deploy alternatives gaining traction vs. incumbent platforms?

### Cycle 68 Updates (March 24)

**Salesforce Agentforce updated metrics (SalesforceBen, [practitioner analysis]):**
- 18,500 total customers, 9,500 paid, ~$540M ARR (up 330% YoY)
- 50%+ of bookings from existing customer expansion — strongest value-delivery signal
- CEO Benioff: "93% agent accuracy" — SalesforceBen notes falls far short of Six Sigma for regulated industries
- Salesforce acknowledges: "as processes become more complex, their ability to reason consistently can start to waver"
- Persistent barriers: Data Cloud dependency, $550/user/month pricing, setup complexity
- Source: [SalesforceBen](https://www.salesforceben.com/revisiting-the-bullish-case-for-agentforce-in-2026/)

**SAP Concur Joule agents announced (March 17, [Skift — domain trade publication]):**
- Expense Automation Agent (virtual delegate creating expense reports automatically)
- Expense Pre-Submit Audit Agent
- Microsoft 365 Copilot integration (available now)
- SAP Sales Cloud Booking Agent GA planned Q2 2026
- First concrete, domain-specific Joule agents with clear functionality. Still zero customer deployment evidence.
- Source: [Skift](https://skift.com/2026/03/17/sap-concur-adds-ai-agents-for-expense-automation-expands-amexgbt-partnership/)

**ServiceNow AI Gateway — enforced MCP governance (March 2026 release):**
- Enforced MCP server approvals — unapproved servers hidden from AI Agent Studio (previously advisory only)
- CIMD auto-registration — 10+ platforms auto-configure
- PII detection with payload blocking — single-toggle hard stop
- First major enterprise platform making MCP governance mandatory
- Beta customers named: City of Raleigh, CVS Health
- Source: [ServiceNow Community](https://www.servicenow.com/community/now-assist-articles/ai-gateway-what-s-new-in-the-march-2026-release/ta-p/3501670)

## Sources

See `runs/` for detailed research logs:
- `runs/2026-03-21-initial.md` — Initial survey of all five platforms
- `runs/2026-03-21-cycle15.md` — Agentforce 62% reality, ServiceNow Moveworks, SAP zero evidence, Forethought deal, hallucination paradox, Nordic gap
- `runs/2026-03-21-cycle25.md` — Reddit deployment, Agentforce counter-evidence convergence, ServiceNow Q4 details, Zendesk-Forethought acquisition details, SAP Bosch, Nordea build-vs-buy, compounding error insight
- `runs/2026-03-22-cycle45.md` — ServiceNow Autonomous Workforce (Fipps L1 elimination, AI Gateway enforcement, implementation pain), SAP Joule (Horváth study: S/4HANA blocks adoption), Agentforce new deployments (Engine, Nexo, Engie, Safari365) + FY2026 arc, Sierra AI ($150M ARR), vertical AI new entrants
