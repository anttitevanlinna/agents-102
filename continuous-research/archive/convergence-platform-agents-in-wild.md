# Platform Agents in the Wild: What Practitioners Actually Report

**Research date:** 2026-02-21
**Methodology:** Systematic search for practitioner evidence across web forums, community sites, independent analyst publications, and conference reports. Vendor press releases and curated case studies deprioritized; practitioner voices and independent analysis prioritized.
**Confidence:** Medium-high on convergence patterns (multiple independent sources), low on individual metrics (vendor-curated numbers likely cherry-picked)

---

## 1. What Practitioners Are Actually Saying (by Platform)

### Salesforce Agentforce

**The most-discussed platform agent in the wild. Highest signal volume, sharpest divide between believers and skeptics.**

**Adoption reality:**
- 18,500 total deals, 9,500 paid — but only ~6% of Salesforce's 150,000 customers on paid plans (as of early 2026)
- LinkedIn poll: 50% said Agentforce has NOT moved past hype. Only 11% said their team uses it. ([Salesforce Ben](https://www.salesforceben.com/has-agentforce-moved-from-hype-to-reality/))
- Admin survey: only 12.6% of Salesforce admins actually use Agentforce ([Salesforce Ben](https://www.salesforceben.com/why-agentforce-adoption-is-slower-than-expected-and-what-salesforce-needs-to-do/))
- Marc Benioff was publicly asked about "low adoption" at Dreamforce 2025 (12,000 out of 150,000 = ~8% at that time) ([Salesforce Ben](https://www.salesforceben.com/marc-benioff-addresses-low-agentforce-adoption-at-dreamforce-25/))

**What actually works (practitioner-reported):**
- Customer service deflection in narrow, well-scoped domains: 1-800Accountant resolved 70% of chat engagements autonomously during tax week. Fisher & Paykel increased self-service from 40% to 70%. Wiley onboarded seasonal agents 50% faster, 213% ROI. ([Salesforce case studies](https://www.salesforce.com/news/stories/agentforce-customer-success-stories/))
- Fast deployment when scope is narrow: Engine deployed in 12 days, Safari365 in 6 weeks
- Salesforce's own help system: 380,000+ interactions, 84% self-resolution rate (internally)

**What does NOT work (practitioner-reported):**
- **77% of B2B deployments fail** due to data quality issues and chat-based UX that adds workflow complexity ([Oliv.ai analysis](https://www.oliv.ai/blog/salesforce-agentforce-reviews-analyzed))
- **Steep learning curve:** "Getting consistent and accurate results isn't as simple as just 'telling' the agent what to do" — verified Salesforce admin ([Salesforce Ben](https://www.salesforceben.com/why-agentforce-adoption-is-slower-than-expected-and-what-salesforce-needs-to-do/))
- **Architectural ceiling:** 15 topics max per agent, 15 actions per topic — blocks complex multi-departmental use cases ([Apex Hours](https://www.apexhours.com/agentforce-limitations-and-workarounds/))
- **Workflow disruption:** Sales teams must leave CRM tasks to engage in separate chats with agents — adding steps, not removing them
- **Pricing chaos:** Three pricing models in 18 months ($2/conversation, then $0.10/action Flex Credits, then $125/user/month). Community reaction ranged from excitement to "feelings of betrayal" ([Monetizely](https://www.getmonetizely.com/blogs/the-doomed-evolution-of-salesforces-agentforce-pricing), [Concret.io](https://www.concret.io/blog/new-agentforce-pricing-model))
- **Accuracy concerns:** Benioff claimed 93% accuracy — but even 1% hallucination rate is "very off-putting" for regulated industries. Anything less than 99.999% (Six Sigma) prevents desired growth ([Salesforce Ben](https://www.salesforceben.com/revisiting-the-bullish-case-for-agentforce-in-2026/))
- **Technical debt tax:** Companies using Salesforce for 10+ years must clean up legacy configs before Agentforce adds value
- **Help system backlash:** When Salesforce forced Agentforce on its own help portal, users found it "slow, cumbersome, and less accurate" ([Techzine](https://www.techzine.eu/news/applications/135073/criticism-of-mandatory-agentforce-ai-in-salesforce-help/))

**Implementation consultant's view (Agilcon):** "The biggest implementation gap in 2025 wasn't technical; it was organizational. An agent is a micro-department — it needs an owner, KPIs, inputs, outputs, and a P&L. Teams that treated agents this way created durable value; others watched pilots die once costs hit reality." ([Agilcon](https://library.agilcon.com/what-implementing-agentforce-in-2025-taught-us/))

---

### Microsoft Copilot / Dynamics 365 Agents

**The most criticized platform agent. CEO-level admission of failure. Massive gap between announcement volume and user satisfaction.**

**Adoption reality:**
- 33 million active Copilot users as of November 2025 — but only 2.5% of all Windows 10/11 users ([Business of Apps data](https://www.windowslatest.com/2025/11/28/you-heard-wrong-users-brutually-reject-microsofts-copilot-for-work-in-edge-and-windows-11/))
- D365-specific agents (Sales Close Agent, Quality Evaluation Agent) only entered preview/GA in October 2025 — very early days

**The CEO confession:**
- Satya Nadella told managers that Copilot integrations "don't really work" and are "not smart" (December 2025) ([PPC Land](https://ppc.land/microsoft-ceo-admits-copilot-integrations-dont-really-work-as-adoption-falters/))

**What practitioners report:**
- M365 Copilot widely described as a "frustrating flop" on Microsoft's own community hub ([Microsoft Tech Community](https://techcommunity.microsoft.com/discussions/microsoft365copilot/microsofts-copilot-a-frustrating-flop-in-ai-powered-productivity/4221190))
- Users report: "When you ask Copilot to alter a document, modify an Excel file, or adjust a PowerPoint presentation, it's practically useless"
- TechRadar called it "a mistake" after almost 3 years ([TechRadar](https://www.techradar.com/computing/windows/almost-3-years-later-its-time-to-admit-that-microsoft-copilot-was-a-mistake))
- Common complaint: Copilot responds with instructions on how to do things manually instead of doing them
- Performance lag: users wait up to 30 seconds for responses
- Context loss: forgets previous discussions mid-conversation

**D365-specific agents:**
- Copilot for Customer Service (email drafting, case summarization) getting positive early reviews for narrow tasks
- Sales Close Agent, Quality Evaluation Agent, Finance agents are too new (Q4 2025 release) for meaningful practitioner feedback
- Pricing model shift: 1,000 Copilot Credits per user per month included in Premium plans — an admission that per-use pricing was blocking adoption

**The pattern:** Microsoft shipped "Copilot everywhere" and diluted the concept. D365-specific agents are a different (and newer) product category than M365 Copilot, but they carry the brand damage of the broader Copilot frustration.

---

### SAP Joule

**The quietest platform agent. Near-zero independent practitioner evidence. Still in the "companies are skipping it" phase.**

**Adoption reality:**
- 60% of companies transitioning to S/4HANA consider themselves "not agile enough" to add Joule to the mix (Horvath survey of 200 companies) ([CIO.com](https://www.cio.com/article/4086426/companies-still-unfamiliar-with-sap-joule.html))
- Companies are actively skipping Joule during S/4HANA migrations because project teams need more time and budget for the core transition
- Agent Builder in Joule Studio reached GA in late 2025

**What practitioners report (limited):**
- Mostly technical setup issues: blank screens, authentication problems with Azure AD/OKTA, 3rd-party cookie blocking, SSO misconfigurations ([SAP Community](https://community.sap.com/t5/technology-blog-posts-by-sap/joule-successfactors-setup-challenges-and-resolutions/ba-p/14105722))
- Data leakage concern: users could see Joule chat history from other colleagues' systems
- A consultant noted Joule "is not yet the really big hit" — a diplomatic understatement
- 350 AI features and 2,400+ Joule skills announced — but almost all evidence is vendor-authored, not practitioner-reported

**The pattern:** SAP customers are drowning in S/4HANA migration complexity. Joule is a "nice to have later" — not a priority. The SAP Community is dominated by SAP employees posting about Joule; independent practitioner voices are almost entirely absent.

---

### ServiceNow AI Agents / Now Assist

**The most quietly credible platform agent. Less hype, more enterprise IT focus, but still limited independent evidence.**

**Adoption reality:**
- Now Assist surpassed $600M in annual contract value (ACV)
- Q4 net-new ACV more than doubled YoY; 35 deals above $1M in quarter ([Futurum Group](https://futurumgroup.com/insights/servicenow-q4-fy-2025-earnings-highlight-ai-platform-momentum/))
- AI Agent Orchestrator GA since March 2025

**What practitioners report:**
- Up to 60% faster incident resolution, 40% reduction in service desk volume — these numbers come from vendor-side reporting but are described as "real-world" rather than lab results
- Internal case: 88% of ServiceNow's own Virtual Agent chats were successful
- Honest practitioner assessment: "Most organizations claiming Phase 3 maturity are actually in Phase 2 with aspirations" ([Medium - Mark Orsborn](https://medium.com/@markorsborn/the-four-phases-of-servicenow-ai-evolution-7733cf0d6efa))
- Realistic progression from Phase 1 to Phase 4 takes 18-33 months
- "Walled garden" problem: Now Assist works best with data already in ServiceNow; struggles to pull from external tools (Google Docs, Slack, Notion, Confluence) ([eesel.ai](https://www.eesel.ai/blog/servicenow-now-assist))
- Requires dedicated ServiceNow development teams or external partners for effective implementation

**The pattern:** ServiceNow has the tightest domain focus (IT service management) which makes agents easier to scope. Less ambitious = fewer failures. But still heavily dependent on existing ServiceNow data quality.

---

### Workday Illuminate

**The newest entrant. Almost zero practitioner evidence. All announcement, no deployment feedback.**

**Announced agents (2025-2026):**
- Contract Intelligence Agent (GA), Self-Service Agent (GA end of 2025), Contingent Sourcing Agent, Document-Driven Accounting Agent, Frontline Agent, Financial Audit Agent
- Vendor claims: Contract execution time reduced 65%, staffing change management time reduced 90%, audit evidence collection saves 900 hours/year ([Workday PR](https://www.prnewswire.com/news-releases/workday-illuminate-expands-with-new-ai-agents-for-hr-finance-and-industry-302557725.html))

**What practitioners report:**
- Effectively nothing. All evidence is from Workday's own announcements or analyst reports based on Workday briefings.
- No independent forum threads, no honest assessments, no community discussions found.

**The pattern:** Too early. Workday's agents are shipping but have not yet reached the volume where independent practitioner voices emerge.

---

### Oracle Fusion AI Agents

**600+ agents announced. Very limited independent evidence. Strong enterprise DNA but quiet on practitioner feedback.**

**Announced:**
- 400 agents in Fusion Cloud Apps + 200 in Industry Apps
- AI Agent Studio for building custom agents
- AI agents at no additional cost (embedded in Fusion)
- 32,000 certified Oracle Fusion AI agent experts trained

**What practitioners report:**
- BHE Renewables using embedded agents in procurement and HR; Milwaukee Tool rolling out AI assistants
- PeerSpot reviews mention loading issues and longer response times with complex workflows ([PeerSpot](https://www.peerspot.com/products/oracle-fusion-service-reviews))
- "Steep learning curve" is a recurring theme

**The pattern:** Oracle is shipping aggressively but its customer base is notoriously slow to adopt new features. The "no additional cost" model removes a pricing barrier but doesn't solve the implementation complexity barrier.

---

## 2. Convergence Patterns (What 10+ Sources Independently Agree On)

### Pattern 1: DATA QUALITY IS THE #1 KILLER
Every single platform. Every single source. Gartner: 60% of AI projects will be abandoned by 2026 due to lack of AI-ready data. Agentforce: 77% of B2B deployments fail due to data quality. The models work; the data doesn't.

> **Training insight:** This is the single most important thing to teach enterprise buyers. The bottleneck is not the agent technology — it is the data foundation it sits on.

### Pattern 2: NARROW SCOPE = SUCCESS; AMBITIOUS SCOPE = FAILURE
The winners are customer service chatbots handling FAQ deflection, IT ticket routing, document processing, and invoice handling. The losers are "transform our entire sales process" or "build a multi-departmental agent." Every success story is a narrow, well-scoped use case.

> **Training insight:** The first lesson should be "pick the smallest, most boring process you can find." Not the strategic one — the tedious one.

### Pattern 3: ORGANIZATIONAL CHANGE > TECHNICAL IMPLEMENTATION
The Agilcon insight resonates across all platforms: "An agent is a micro-department — it needs an owner, KPIs, inputs, outputs, and a P&L." Multiple sources confirm the biggest gap is organizational, not technical. Who owns the agent? Who measures its performance? Who decides when to expand scope?

> **Training insight:** Agent deployment is a change management problem, not a technology problem. This is where our training differentiates from vendor training.

### Pattern 4: THE PILOT GRAVEYARD IS ENORMOUS
- Gartner: 80% of enterprise AI projects don't go past pilot
- Gartner: 40%+ of agentic AI projects will be scrapped by 2027
- Capgemini: only 2% of organizations have deployed AI agents at scale
- 95% of organizations see no measurable return from AI projects (McKinsey) [SOURCE NEEDED -- verify against McKinsey "Superagency in the Workplace" report (Jan 2025); add URL or reframe]

> **Training insight:** Knowing HOW to move from pilot to production is the scarce competence. Not knowing how to start a pilot — everyone can do that.

### Pattern 5: PRICING MODELS ARE STILL UNSTABLE
Salesforce changed pricing 3 times in 18 months. Microsoft shifted to bundled credits. ServiceNow uses consumption-based pricing. None of the vendors have found the pricing model that enterprises will accept. This creates budget unpredictability that blocks adoption.

> **Training insight:** Teach buyers to negotiate pilot terms with cost caps before scaling. Budget unpredictability is a valid reason to start small.

### Pattern 6: VENDOR HYPE EXCEEDS REALITY BY 12-24 MONTHS
Vendor announcements run 12-24 months ahead of actual production deployments. SAP announces Joule agents while 60% of customers skip it during migration. Microsoft announces Copilot agents while the CEO admits they "don't really work." Salesforce announces 380,000 interactions while only 12.6% of admins have used Agentforce.

> **Training insight:** Read vendor roadmaps as "what will be possible in 18 months" not "what you can deploy today."

---

## 3. Divergence (Where Experiences Differ)

### Customer service vs. sales vs. back-office
Customer service agents (FAQ deflection, ticket routing) have the strongest practitioner evidence. Sales agents (lead prioritization, pipeline management) have mixed results — sales teams resist chat-based UX. Back-office agents (finance, HR, compliance) are mostly announcements with very little deployment evidence.

### Large vs. mid-market vs. SMB
Large enterprises with clean data and dedicated implementation teams are seeing results (PepsiCo, Dell, Fisher & Paykel). Mid-market companies struggle with data quality and implementation resources. SMBs are effectively priced out or lack the Salesforce/SAP maturity to benefit.

### Industry matters enormously
Regulated industries (finance, healthcare, government) face compliance frameworks (HIPAA, GDPR, FedRAMP) that "significantly extend project timelines" and create additional barriers. Retail and e-commerce have the fastest deployments and most positive results. B2B enterprises have the worst outcomes (77% failure rate on Agentforce B2B deployments).

### Practitioner enthusiasm vs. admin frustration
Executives and transformation leaders are enthusiastic. The people actually implementing (Salesforce admins, ServiceNow developers, SAP consultants) are more frustrated — they bear the complexity while leadership sees the demos.

---

## 4. The Honest Assessment: Real vs. Vaporware

### REAL (deployed, working in production, independent evidence)
- **Salesforce Agentforce for customer service deflection** — Multiple independent case studies with specific metrics. The 70% deflection rate for well-scoped FAQ scenarios is credible. BUT only for narrow, well-defined use cases with clean data.
- **ServiceNow AI agents for IT service management** — $600M ACV and doubling growth suggests real traction. Domain focus (ITSM) makes agents easier to scope. Most credible for ticket routing and incident resolution.
- **Document processing / invoice handling agents across platforms** — The "boring work" category has the most credible deployment evidence across all vendors.

### PROMISING BUT UNPROVEN (shipped, some evidence, needs more time)
- **Salesforce Agentforce for sales** — PepsiCo and Dell deployments are real but vendor-curated. Independent sales practitioner evidence is thin. Chat-based UX is a real problem for sales workflows.
- **Microsoft D365 agents** — Too new (Q4 2025 GA) for meaningful assessment. The M365 Copilot reputation damage is a headwind. D365 customer service Copilot (case summarization, email drafting) has cautiously positive early signals.
- **Oracle Fusion agents** — 600+ agents shipped and "no additional cost" removes pricing barrier, but practically zero independent practitioner feedback. Oracle's customer base moves slowly.

### STILL VAPORWARE (announced, minimal to no deployment evidence)
- **SAP Joule agents** — 60% of customers actively skipping Joule during S/4HANA migration. Agent Builder just reached GA. The SAP Community is an echo chamber of SAP employees writing about Joule. Near-zero independent practitioner voices.
- **Workday Illuminate agents** — All evidence is vendor announcements. Zero independent deployment feedback found. Too new and too niche for practitioner signal to exist yet.
- **Any "multi-agent orchestration" or "agentic enterprise" vision** — No vendor has demonstrated this working in production at enterprise scale. It remains a conference slide.

### THE UNCOMFORTABLE TRUTH
The Carnegie Mellon finding is the most honest data point: **AI agents fail to complete real-world office tasks 70% of the time** [SOURCE NEEDED -- no URL for this specific CMU study; note that `real-vs-fake-agents.md` cites a different CMU figure (30-35% completion rate on multi-step tasks) with arXiv source arxiv.org/html/2602.16666 -- these may be inconsistent; reconcile or remove]. Platform agents don't escape this. They work for narrow, repetitive, well-structured tasks with clean data. They fail for anything requiring judgment, context-switching, or multi-system integration.

---

## 5. "Possible in 6 Months" — What Nordic Enterprises Can Realistically Do by Q3 2026

Based on practitioner evidence (not vendor roadmaps), here is what a large Nordic enterprise could realistically deploy by Q3 2026:

### HIGH CONFIDENCE (multiple success patterns, technology is proven)
- **Customer service deflection bot** on Salesforce or ServiceNow — handling 40-70% of tier-1 inquiries (FAQ, order status, password reset, basic troubleshooting). Requires: clean knowledge base, well-defined escalation paths, 4-8 weeks implementation.
- **IT ticket routing and resolution** on ServiceNow — automated classification, routing, and resolution of L1 tickets. Requires: mature ServiceNow instance, clean CMDB, 3-6 months including data cleanup.
- **Document processing agents** (invoice handling, contract review) — available across multiple platforms. Most boring, most proven. Requires: standardized document formats, clear validation rules.

### MEDIUM CONFIDENCE (some success patterns, organizational readiness is the variable)
- **HR self-service agent** on Workday or SAP SuccessFactors — answering employee policy questions, guiding through benefits enrollment, leave requests. Requires: up-to-date policy documents, integration with HRIS data.
- **Sales email drafting and meeting prep** on D365 or Salesforce — summarizing account history, suggesting talking points. Helpful but not transformative. Requires: clean CRM data (the perennial problem).
- **Financial close assistance** — automating reconciliation checks, flagging discrepancies. Workday and Oracle have announced this; ServiceNow too. Requires: clean financial data (often the cleanest data in the enterprise).

### LOW CONFIDENCE (announced but insufficient evidence)
- **Multi-agent orchestration** across platforms — the "agentic enterprise" vision where agents coordinate across SAP, Salesforce, ServiceNow. No evidence this works in production anywhere.
- **Autonomous sales agents** that independently manage pipeline — despite vendor demos, no credible deployment evidence. Sales teams actively resist.
- **Compliance/audit agents** that make regulatory judgments — announced by multiple vendors but regulatory risk means very slow adoption.

### NORDIC-SPECIFIC CONSIDERATIONS
- **No Nordic-specific deployment evidence found.** All practitioner signals are from US, UK, or APAC companies.
- Nordic enterprises tend to have higher data quality standards (GDPR culture) — this could be an advantage for agent deployment readiness.
- Nordic companies are typically SAP and Microsoft shops. The SAP Joule immaturity and Microsoft Copilot reputation are headwinds.
- The "co-determination" culture (worker consultation requirements) in Nordics adds a change management layer that US case studies don't address.
- Finnish/Nordic companies like Neste, Kone, Wartsila, Fortum are large SAP customers — they are likely in the "skipping Joule during S/4HANA migration" category.

---

## Summary for Agents 102 Training

### The Sentence That Matters Most
**Platform agents work for boring, narrow, well-data'd tasks. They fail for everything else. The gap is not the AI — it is the data, the organizational ownership, and the scope discipline.**

### What This Means for Our Buyers
1. **Don't wait for "the agent" — start with data readiness.** The companies deploying agents successfully in 2025-2026 invested in data quality first.
2. **The pilot-to-production gap is the #1 competence need.** Everyone can start a pilot. Almost nobody can scale it. This is where training creates value.
3. **Vendor roadmaps are 12-24 months ahead of reality.** Teach buyers to read them accordingly.
4. **"An agent is a micro-department"** — the best frame for organizational readiness. Give it an owner, KPIs, inputs, outputs, and a P&L.
5. **The pricing landscape is unstable.** Negotiate pilot terms with cost caps. Don't commit to consumption-based pricing at scale until you've measured actual usage.
6. **Customer service is the proven beachhead.** Start there, prove value, then expand. Not sales. Not "enterprise-wide agentic transformation."

### Evidence Quality Assessment
- **Salesforce Agentforce:** Highest signal volume. Both positive and negative evidence is abundant. Most trustworthy picture.
- **ServiceNow:** Moderate signal. Revenue data suggests real traction. Independent practitioner voices are limited but credible.
- **Microsoft Copilot/D365:** Abundant negative signal for M365 Copilot. D365-specific agents too new for assessment.
- **SAP Joule:** Near-zero independent signal. Effectively still pre-market for agents.
- **Workday Illuminate:** Zero independent signal. All vendor-sourced.
- **Oracle Fusion:** Minimal independent signal. A few named customers but no detailed experience reports.

---

*Tagged: Global (no Nordic-specific practitioner evidence found). Applicable to Nordic early majority buyers as market context for what their global peers are experiencing.*
