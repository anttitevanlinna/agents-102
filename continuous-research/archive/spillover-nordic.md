# Nordic Spillover: Coding Agent Patterns to Business Functions

**Research date:** 2026-02-21
**Freshness window:** Aug 2025 - Feb 2026
**Method:** OODA loops, 4 rounds. Deep-dive on named practitioners, Nordic enterprise AI teams, community/event mapping, gap analysis.
**Evidence ladder:** L4 (cross-domain meta-pattern) > L3 (convergence) > L2 (single experiment) > L1 (opinion) > L0 (commercial/analyst -- outside ladder)
**Tags:** Nordic, Cross-cut, Spillover

---

## The Question

Are Nordic enterprises applying coding-agent-level autonomy to non-coding business functions? Is this real multi-turn autonomous execution, or rebranded pipelines and chatbots?

## The Short Answer

**The spillover is real but narrow.** Five Nordic companies have shipped agents that autonomously execute multi-step business tasks in non-coding domains (Vic.ai, Legora, Gjensidige, Klarna, Basware). Another five have funded products that claim to (Optivian, Spektr, Fortiv, Riff, Skene). But the vast majority of "agent" deployments at large Nordic enterprises (Equinor, Nordea, Maersk, H&M, Kone, etc.) remain copilots, chatbots, or ML pipelines with "agentic" marketing. The gap between startup products and enterprise internal deployment is the story.

---

## Named Practitioners -- Deep Dive

### 1. Alexander Hagerup (NO) -- Vic.ai -- Finance Agents
**Verdict: REAL SPILLOVER. The strongest Nordic evidence.**

- **What VicAgents actually do:** VicInbox is live across customers, autonomously categorizing vendor emails, managing payment inquiries, validating account changes, and writing replies using real-time ERP data. The Contract Agent extracts contract terms, monitors spend vs. obligations, flags compliance risks. The Analytics Agent answers natural-language finance questions with visual insights from live AP data. [1]
- **Verification mechanism:** Invoice matching (2-, 3-, 4-way PO matching), 99% accuracy claimed on 500M+ invoices, $188M customer cost savings. Verification is structural: invoices either balance or they do not. [2]
- **Multi-turn?** Yes. VicInbox reads email, cross-references ERP, decides routing, drafts reply -- multiple reasoning steps without human intervention.
- **Evidence level:** L3 -- 10,000+ customers, $52M raised, quantified impact, product live.
- **Source:** Hagerup stated "With this launch, we're moving from automation to execution" (Jun 2025).
- **URL:** https://www.vic.ai/blog/vic-agents-future-of-autonomous-finance

### 2. Anssi Ruokonen (FI) -- Basware -- Finance Agents
**Verdict: REAL SPILLOVER, but earlier stage than Vic.ai.**

- **What Basware does:** InvoiceAI processes non-PO invoices with agentic capabilities. Trained on 2+ billion invoices. Organizations see 70-85% autonomous processing rates, with 15-30% requiring human involvement. [3]
- **Verification mechanism:** Invoice accuracy against purchase orders and delivery receipts. Basware reports >97% accuracy on machine-readable PDF conversion. Anomaly detection distinguishes legitimate anomalies from errors.
- **Multi-turn?** Partially. The AP automation is multi-step (extract > match > route > approve/flag) but Ruokonen himself advises treating agents "like junior colleagues" -- trust slowly, test thoroughly, keep human in loop. This is direct framing, not a fully autonomous claim. [4]
- **Evidence level:** L2-3 -- 2.5B invoice dataset gives real scale, but "agentic finance" vision is ahead of current autonomy.
- **Source:** AI Intelligence News, Feb 2026, quoting Ruokonen on trust calibration.
- **URL:** https://www.artificialintelligence-news.com/news/agentic-ai-drives-finance-roi-in-accounts-payable-automation/

### 3. Max Junestrand (SE) -- Legora -- Legal Agents
**Verdict: REAL SPILLOVER. Strongest evidence of multi-turn reasoning in non-coding domain.**

- **What Legora Workflows do:** Lawyers enter a high-level goal in natural language, provide documents, and the agentic system plans and completes the entire task. A single workflow can invoke Tabular Review for complex extraction, run web searches for case law, and verify citations via legal databases -- multiple tools in one autonomous execution. [5]
- **Verification mechanism:** Legal citation verification (does the cited case exist and say what the agent claims?), cross-referencing against legal databases. ISO 42001 certified for AI governance.
- **Multi-turn?** Yes, explicitly. Legora announced "Market-First Agentic Workflows" (Jun 2025) -- multiple tools, multiple reasoning steps, goal-directed planning.
- **Evidence level:** L3 -- 250+ law firms, $675M valuation, $120M+ raised, ISO certified, referenced in Anthropic's 2026 report.
- **URL:** https://www.businesswire.com/news/home/20250625950992/en/Legora-Launches-Market-First-Agentic-Workflows-to-Orchestrate-Legal-Tasks

### 4. Roope Heinila (FI) -- Optivian -- Sales Agents
**Verdict: PLAUSIBLE BUT UNVERIFIED. Too early to confirm spillover.**

- **What Optivian claims:** Autonomous AI agents that build business cases, create mutual action plans, enable internal champions, drive next-best actions in B2B enterprise sales. "The AI doesn't just alert you; it does the work." [6]
- **Verification mechanism:** Claims 20% increase in win rates, 50% reduction in admin time in "early deployments." But: the company launched Feb 3, 2026. These are pre-seed metrics from beta.
- **Multi-turn?** Claimed but not verified. The product description says agents research, summarize, draft content, provide strategic coaching "based on deal context." This could be multi-turn or could be a well-designed pipeline. No independent verification exists.
- **Evidence level:** L2 (funded, credible team) but VERY early. The team is strong (Heinila scaled Smarp/Haiilo to $40M+ ARR, CTO had Feedtrail exit, COO is ex-McKinsey), and Tero Ojanpera (Silo AI co-founder) led the round. But the product just launched.
- **Assessment:** Wait 6 months for customer evidence before counting this as confirmed spillover.
- **URL:** https://optivian.ai/product/

### 5. Mikkel Skarnager (DK) -- Spektr -- Compliance Agents
**Verdict: REAL PRODUCT, EVOLVING TOWARD SPILLOVER.**

- **What Spektr does:** Compliance platform spanning client onboarding, continuous compliance, case management. The Agent Builder lets compliance teams design AI agents that execute due diligence tasks. Has explored an "Autonomous Regulatory Agent" (ARA) concept with limited executive authority over specific compliance metrics. [7]
- **Verification mechanism:** Regulatory rule matching -- compliance checks either pass or fail against defined regulatory criteria.
- **Multi-turn?** Emerging. The Agent Builder suggests configurable multi-step compliance workflows, but the ARA concept (limited executive authority) is forward-looking, not necessarily deployed at scale.
- **Evidence level:** L2 -- EUR 5M funded, previous exit (HelloFlow to Trulioo >EUR 40M), real customers.
- **URL:** https://ffnews.com/newsarticle/fintech/spektr-2-0-launches-unveiling-ai-agent-builder-to-transform-compliance-for-fintechs/

### 6. Erja Ylajarvi (FI) -- Helsingin Sanomat -- Media Agents
**Verdict: REAL DEPLOYMENT, NOT FULL SPILLOVER.**

- **What Watchdog does:** Internal AI tool that monitors vast information sources for news leads. Used in the largest Finnish newsroom.
- **Verification mechanism:** Unclear. A news lead either pans out or it does not, but this is editorial judgment, not automated verification.
- **Multi-turn?** Unknown. Limited public detail on architecture. Ylajarvi has spoken at NAMS 2025 about AI transformation in media, comparing it to the data journalism shift, saying "if your editor-in-chief doesn't know what automating the news is about, you're in trouble." [8]
- **Evidence level:** L2 -- real deployment in production newsroom, but more like an alerting/monitoring tool than an autonomous agent.
- **Assessment:** This is closer to an AI-powered monitoring pipeline than a multi-turn autonomous agent. Still significant as a non-coding business function adoption, but not coding-agent-level autonomy.
- **URL:** https://lottaholmstrom.se/2025/04/25/keeping-the-audience-in-the-loop-my-nams-takeaways/

### 7. Joel Hellermark (SE) -- Sana Labs / Workday -- Enterprise Work Agents
**Verdict: REAL PRODUCT, SPILLOVER ENABLER.**

- **What Sana Agents do:** No-code agent builder for enterprise users. Agents grounded in organizational data automate repetitive workflows, analyze data, act proactively. 1M+ users across hundreds of enterprises pre-acquisition. [9]
- **Acquisition:** Workday completed the $1.1B acquisition Nov 2025. Integration into Workday expected to roll out 2026. Hellermark continues leading the team.
- **Verification mechanism:** Grounding in organizational data means agents can be tested against known enterprise knowledge bases. But specific verification architecture is not public.
- **Multi-turn?** Sana Agents are described as autonomous workflow executors, not just Q&A chatbots. The no-code builder suggests configurable multi-step flows.
- **Evidence level:** L3 -- $1.1B acquisition validates product-market fit at scale.
- **URL:** https://www.prnewswire.com/news-releases/workday-completes-acquisition-of-sana-302603954.html

### 8. Anton Osika (SE) -- Lovable -- Non-Coders Building Software
**Verdict: NOT SPILLOVER. Adjacent enabler.**

- **What Lovable does:** Vibe coding platform -- non-coders describe what they want in natural language, agents generate production-ready software. 8M users, 100,000 new products built daily, more than half of Fortune 500 using it. [10]
- **Why it's NOT spillover:** Lovable is still a coding agent -- it generates code. The spillover thesis is about agents in non-coding business functions. Lovable enables non-coders to USE coding agents, but the agent itself is still writing code.
- **Adjacent relevance:** High. If a sales manager uses Lovable to build an internal tool, that is a form of spillover in practice even if the agent mechanism is code generation.
- **Evidence level:** L3 -- undeniable traction ($200M Series A, $1.8B valuation).
- **URL:** https://techcrunch.com/2025/11/10/lovable-says-its-nearing-8-million-users-as-the-year-old-ai-coding-startup-eyes-more-corporate-employees/

### 9. Teemu Linna (FI) -- Sitra -- Organizational Transformation
**Verdict: TRANSFORMATION LEADER, NOT AGENT BUILDER.**

- **What he does:** CAIO/CIO at Sitra, leading transformation into an "AI-native organization." Integrates AI into decision-making across business units. Co-organizes Agentics Finland meetups. [11]
- **Evidence of specific agents:** Limited. Role is strategic/organizational, not product-level. No specific agent deployments are publicly documented.
- **Evidence level:** L2 for organizational transformation, L1 for specific agents.
- **Relevance:** Very high as a buyer persona. He represents exactly the kind of leader Agents 102 targets.
- **URL:** https://www.sitra.fi/en/people/teemu-linna/

### 10. Mikko Alasaarela (FI) -- Agion / Agentics Finland -- Governance
**Verdict: INFRASTRUCTURE BUILDER, NOT AGENT DEPLOYER.**

- **What Agion does:** AI-native venture studio. Building "a credible European AI Cloud giant" from the Nordics. Governance models for agentic organizations. [12]
- **Evidence of specific agents:** Thin. Agion.dev is positioned as an "Agentic OS for the Sovereign Enterprise" but is early-stage (stealth until recently).
- **Community role:** Significant. Co-founded Agentics Finland chapter of Agentics Foundation. Organizes Helsinki meetups.
- **Evidence level:** L2 for community/governance work, L1 for deployed agents.
- **URL:** https://agion.dev

### 11. Trygve Karper (NO) -- Riff -- Enterprise Vibe Coding
**Verdict: SPILLOVER ENABLER, LIKE LOVABLE.**

- **What Riff does:** Enterprise vibe coding platform for business users in manufacturing, financial services, logistics, healthcare. 150,000+ users, enterprise clients include Twilio, Cognite. [13]
- **Same classification as Lovable:** Still a coding agent that enables non-coders. The spillover is in who uses it, not in what the agent does.
- **Evidence level:** L2-3 -- $16M Series A, real enterprise customers.
- **URL:** https://arcticstartup.com/riff-formerly-databutton-raises-16m-series-a/

---

## New Practitioners Found

### 12. Gjensidige Insurance -- Eva, Sofie, Frank (NO) -- Insurance Claims Agents
**NEW FIND. Strongest enterprise spillover evidence in the Nordics.**

- **Company:** Gjensidige, Norway's largest general insurance company (200+ years old)
- **Named agents:** Eva (customer-facing claims handler), Sofie (internal department coordination), Frank (external partner communication -- surveyors, builders, trades) [14]
- **What Eva does:** Handles claims from clients directly, 24/7. Ambition: 70% of individual customer claims handled by Eva.
- **What Sofie does:** Manages internal casework communication across departments. Target: 70% cost reduction.
- **What Frank does:** Coordinates with external partners (surveyors, builders) needed for claim resolution.
- **Verification mechanism:** Insurance claims have natural verification: damage assessment matches policy terms, repair costs match estimates, partner invoices reconcile. This is structurally similar to invoice matching in finance.
- **Multi-turn?** Yes. A claims journey is inherently multi-step: intake > categorize > assess > coordinate partners > settle. Eva, Sofie, and Frank divide this across customer, internal, and external flows.
- **AI Risk Officer:** Gjensidige appointed a dedicated AI risk officer -- first in its industry. This signals they take the autonomy seriously enough to govern it separately. [15]
- **Evidence level:** L2-3 -- real deployment at a major enterprise, NHH research partnership, specific agent names and targets published.
- **Why this matters:** This is NOT a startup selling agent software. This is a 200-year-old Norwegian insurance company deploying named autonomous agents across its core business function. This is enterprise spillover.
- **URLs:** https://www.nhh.no/en/nhh-bulletin/article-archive/2025/april/claim-the-future/ and https://www.nhh.no/en/research-centres/digital-innovation-for-growth/dig-news-and-blogs/2025/we-have-just-begun-using-ai/

### 13. Hege Skryseth -- Equinor (NO) -- Industrial AI
**NEW NAMED PERSON.**

- **Role:** EVP Technology, Digital, and Innovation at Equinor
- **What she said:** At NHO's annual conference (Jan 7, 2026), spoke about how "AI agents will change the way we work." Equinor employees now use copilots, chatbots, and agentic AI tools. $130M saved by AI in 2025 ($330M cumulative since 2020). [16]
- **Assessment:** Equinor's AI is overwhelmingly operations/industrial (predictive maintenance, seismic interpretation, well planning). The "agentic AI tools for employees" is mentioned but not detailed. This is the ASPIRATION of spillover, not yet the evidence.
- **Evidence level:** L2 for industrial AI, L1 for agentic tools in non-ops functions.
- **URL:** https://www.equinor.com/news/20260107-artificial-intelligence-saved-equinor-usd-130-million

### 14. Mattias Fras -- Nordea (FI/SE) -- Banking AI
**NEW NAMED PERSON.**

- **Role:** Group Head of AI Strategy & Acceleration (also referred to as Head of AI Adoption, Head of AI Hub)
- **What he built:** Modular, model-agnostic AI platform on AWS Bedrock. 12 AI agents in production (boost.ai). Enterprise Agent (ChatGPT-like tool) for all employees. 10,000+ internal users. [17]
- **Assessment:** Nordea's "agents" are primarily conversational AI (virtual assistants for customer service and internal support). The Enterprise Agent is a copilot, not an autonomous executor. Nordea is hiring a Conversational AI & Agentic Solutions product manager (Dec 2025/Jan 2026), suggesting agentic capabilities are PLANNED, not yet deployed. [18]
- **Evidence level:** L2-3 for conversational AI at scale, L1 for true agentic deployment.
- **URL:** https://hyperight.com/banking-on-ai-nordea-poc-to-10000-users/

### 15. Rebecca Filis -- Swedish Tax Agency (SE) -- Public Sector AI
**NEW NAMED PERSON.**

- **Role:** Chief of Strategy, Innovation and AI (Chef for strategi, innovation och AI) at Skatteverket (Swedish Tax Agency)
- **What she does:** Drives strategic and operational adoption of AI. Expert in implementing EU AI Act into Swedish law. [19]
- **Assessment:** The Swedish Tax Agency has chatbot "Skatti" for population registration and tax queries, and uses AI for email sorting and data analysis. But no evidence of autonomous agents in tax administration.
- **Evidence level:** L1 for agent deployment (no specific agents found), but relevant as public sector transformation leader.
- **URL:** https://www.linkedin.com/in/rebecca-filis-16b29a3/

---

## Nordic Enterprise AI Teams

### Who is leading AI at large Nordic enterprises?

| Company | Country | Named AI Leader | Role | Agent Status |
|---------|---------|-----------------|------|-------------|
| Equinor | NO | Hege Skryseth | EVP Technology, Digital & Innovation | Ops AI at scale, agentic tools mentioned |
| Nordea | FI/SE | Mattias Fras | Group Head of AI Strategy & Acceleration | 12 virtual agents, Enterprise Agent copilot |
| Klarna | SE | (CEO-led) Sebastian Siemiatkowski | CEO driving AI-first strategy | Most advanced spillover -- 5+ domains |
| Gjensidige | NO | [AI Risk Officer appointed, name not public] | Dedicated AI governance | Eva/Sofie/Frank claims agents |
| Danske Bank | DK | [CAIO appointed, name not public from search] | Chief AI Officer | 12 GenAI solutions, 16K monthly users |
| Sitra | FI | Teemu Linna | CAIO/CIO | AI-native org transformation |
| Swedish Tax Agency | SE | Rebecca Filis | Chief Strategy, Innovation & AI | Chatbot + data analysis, no agents |

**Pattern:** The large enterprises with NAMED AI leaders are primarily banks, insurers, and energy companies. The manufacturing and retail companies (H&M, IKEA, Volvo, Scania) do not have publicly visible AI leadership teams driving agent deployment in non-ops functions.

---

## Spillover Evidence by Domain (Nordic-Specific)

### Finance (Vic.ai, Basware, Nordea, Danske Bank, DNB)
**STRONGEST DOMAIN. Real spillover confirmed.**

- Vic.ai: VicInbox live, autonomously processing AP emails with ERP cross-reference. Contract Agent and Analytics Agent in beta. 500M+ invoices at 99% accuracy. **Multi-turn autonomous execution.** [1]
- Basware: InvoiceAI with agentic capabilities. 70-85% autonomous processing. 2B+ invoice training set. Ruokonen's "junior colleague" framing is direct about current limits. [3]
- Nordea/Danske/DNB: Conversational AI at scale but NOT autonomous agents. These are chatbots/copilots, not multi-turn executors. Nordea is hiring for agentic solutions (Dec 2025), suggesting it is coming but not here yet. [18]
- **Verification mechanism:** Invoice matching, PO reconciliation, payment accuracy. Finance has the clearest verification: numbers either balance or they do not.
- **Assessment:** Finance is the most advanced spillover domain in the Nordics. Vic.ai and Basware are genuine examples of coding-agent patterns (multi-step autonomous execution with verification) applied to a non-coding function. The banks lag behind the fintech/SaaS providers.

### Legal/Compliance (Legora, Spektr, Fortiv)
**STRONG SPILLOVER. Second most advanced domain.**

- Legora: Agentic Workflows (Jun 2025) -- multi-tool, multi-step, goal-directed legal task execution. ISO 42001 certified. 250+ law firms. **Genuine multi-turn agent.** [5]
- Spektr: Agent Builder for compliance workflows. ARA concept for autonomous regulatory authority. EUR 5M funded, previous exit validates team. [7]
- Fortiv: EUR 3M funded, AI for business continuity and regulatory compliance. Early stage. [SOURCE NEEDED -- no detailed product information found beyond funding announcement]
- **Verification mechanism:** Legal citation verification, regulatory rule matching, contract clause comparison. Like code tests, legal rules are relatively binary: a citation exists or it does not, a clause matches or it does not.
- **Assessment:** Legal AI is the closest structural analog to coding agents. Both domains have formal rule systems (law / code), verification mechanisms (citation check / test pass), and multi-step reasoning (legal research / code architecture). This is not coincidence -- it is why the spillover is happening here first.

### Insurance Claims (Gjensidige)
**REAL SPILLOVER. Single company but high quality.**

- Gjensidige: Three named agents (Eva, Sofie, Frank) dividing the claims lifecycle across customer, internal, and external flows. 70% automation target. Dedicated AI risk officer. [14]
- **Verification mechanism:** Claims assessment (damage matches policy), cost reconciliation (repair estimates match invoices), partner coordination (external assessors confirm findings).
- **Assessment:** This is the most impressive enterprise spillover in the Nordics because it is a traditional company (not a tech startup) deploying autonomous agents across its core business function. The three-agent architecture (customer/internal/external) is sophisticated.

### Sales (Optivian)
**CLAIMED BUT UNVERIFIED.**

- Optivian: Just launched (Feb 2026). Claims autonomous deal execution. Strong team, credible investor (Tero Ojanpera). But zero independent customer evidence yet. [6]
- **Verification mechanism:** Win rate is the ultimate test, but this is a lagging indicator. No published verification architecture.
- **Assessment:** Sales is the hardest domain for autonomous agents because the "test" (did we win the deal?) has massive latency and confounding variables. Optivian's claims are plausible given the team but unproven. This is the domain where marketing most easily outpaces reality.

### Customer Service (Klarna, Nordea, DNB, Danske Bank, Telia)
**SCALED BUT NOT TRUE SPILLOVER.**

- Klarna: AI handles 2/3 of customer inquiries, equivalent to 850 agents. This is the most scaled "agent" deployment in the Nordics. [20]
- Nordea: 12 AI agents via boost.ai, 91-95% resolution rates. [17]
- DNB: Juno virtual agent across 7 business units, 3,400 topics. [21]
- **BUT:** These are overwhelmingly conversational AI / chatbots with escalation paths, NOT autonomous multi-turn agents in the coding-agent sense. They follow decision trees with NLP, not goal-directed reasoning with tool use. The "agent" label in customer service predates the agentic AI wave by years.
- **Assessment:** Customer service is where Nordic enterprises are most advanced in AI deployment, but it is NOT the spillover from coding agents. The patterns are different: customer service agents follow scripts with NLP; coding agents pursue goals with tool use. The exception is Klarna's cross-functional deployment, where AI is used for marketing, product, and operations beyond just customer conversations.

### Media (Helsingin Sanomat)
**MONITORING TOOL, NOT AGENT.**

- Watchdog monitors information sources for news leads. [8]
- **Assessment:** More like an alerting system than an autonomous agent. Journalists still make the editorial decisions. This is AI-assisted journalism, not agentic journalism.

### Operations (Equinor, Maersk, Wartsila, Kone, LKAB)
**MASSIVE AI DEPLOYMENT, BUT NOT THE SPILLOVER WE'RE LOOKING FOR.**

- Nordic industrial companies have the most mature AI deployments by dollar impact (Equinor $130M, Maersk $300M+, Kone 70% more fault detection). [16]
- But these are overwhelmingly ML/predictive models, not multi-turn agents. Predictive maintenance predicts; it does not plan, decide, and execute a repair autonomously.
- **Assessment:** Operations AI is the foundation. The spillover question is whether these companies can extend their AI capability from ops (where verification is physical: did the equipment fail?) to business functions (where verification is informational: is the invoice correct? is the legal analysis sound?).

### HR
**NO EVIDENCE OF SPILLOVER IN THE NORDICS.**

- Zero named Nordic practitioners building HR agents.
- Nordic HR trends report (2026): 46% of Nordic orgs exploring/piloting AI, 14% using operationally. But "AI in HR" means CV screening and scheduling automation, not autonomous agents.
- GDPR sensitivity may be a factor -- autonomous agents making HR decisions is a regulatory minefield in the Nordics.
- **Assessment:** HR remains a gap. The closest is Sana Labs (now Workday) for enterprise learning, but that is learning delivery, not HR decision-making.

---

## The Nordic Spillover Gap

### Where spillover IS happening:
1. **Finance/AP** -- Vic.ai and Basware have genuine multi-step autonomous agents processing invoices, matching contracts, flagging anomalies. Verification = numbers balance.
2. **Legal** -- Legora has goal-directed, multi-tool agentic workflows for legal tasks. Verification = citation exists, clause matches.
3. **Insurance claims** -- Gjensidige has three named agents splitting the claims lifecycle. Verification = damage matches policy, costs reconcile.
4. **Compliance** -- Spektr has agent builder for regulatory workflows. Verification = rule matching.

### Where spillover is NOT happening:
1. **HR** -- Zero evidence. GDPR concerns likely suppress autonomous agent deployment in people decisions.
2. **Procurement/Supply Chain** -- No Nordic agents making procurement decisions autonomously. IKEA's Locus is logistics optimization, not agentic procurement.
3. **Strategic Planning** -- No evidence. This is the hardest domain -- verification is impossible in real-time.
4. **Marketing** -- Klarna uses AI for marketing (25% agency spend cut) but no autonomous marketing agents reported elsewhere in the Nordics.
5. **Product Management** -- No agents making product decisions. Skene (FI) automates onboarding, which is closer to growth engineering than product management.

### The structural pattern:
**Spillover follows verification.** The domains where agents work have clear, fast feedback loops:
- Finance: Invoice balances Y/N
- Legal: Citation correct Y/N
- Compliance: Rule met Y/N
- Insurance: Claim valid Y/N
- Code: Test passes Y/N

The domains where agents DON'T work lack fast verification:
- HR: Was this the right hire? (Months to verify)
- Sales: Did we win the deal? (Weeks to months)
- Strategy: Was this the right decision? (Years to verify)
- Marketing: Did the campaign work? (Weeks, confounded)

**This is the same pattern as coding agents.** Coding agents work because tests provide instant verification. Business agents work where business rules provide instant verification. The spillover is NOT about the agent pattern crossing domains -- it is about the VERIFICATION pattern enabling autonomy wherever it exists.

---

## What We Did Not Find

### Blunt assessment:

1. **The "spillover" framing may be misleading.** Finance AI (Vic.ai, Basware) and legal AI (Legora) did not arise from coding agents spilling over. They arose independently from domain-specific problems. The common pattern is multi-step autonomous execution with verification, but the practitioners did not learn this from coding agents -- they converged on it because it works.

2. **Large Nordic enterprises are NOT deploying autonomous agents in non-coding business functions.** Equinor, Maersk, IKEA, Volvo, Scania, H&M -- none of these have publicly documented autonomous agents in HR, finance, sales, or marketing. Their AI is ops/product-focused ML. The enterprise spillover is happening in STARTUPS that sell to enterprises, not inside enterprises themselves.

3. **The "agent" label is aggressively marketed.** At least half of what Nordic companies call "AI agents" are conversational chatbots (Nordea's Nova, DNB's Juno, Telia's bots). These are not multi-turn autonomous executors. The terminology inflation makes it hard to assess real spillover.

4. **Nordic consultancies (Reaktor, Futurice, Solita, Gofore) are invisible at the agent level.** We searched specifically and found zero named individuals building or deploying agents at any of these companies. They talk about AI on their websites but produce no public evidence of agent work. [SOURCE NEEDED for any consultancy agent work -- nothing found]

5. **Norway's Gjensidige is the best enterprise evidence, and we almost missed it.** It was not in our original practitioner list. An NHH research partnership surfaced it. This suggests there may be more enterprise agent deployments happening behind closed doors that are only visible through academic/research partnerships, not through tech media.

6. **No cross-company patterns found.** We found zero evidence of Nordic companies sharing agent practices with each other, learning from each other's deployments, or participating in any cross-company agentic practice network. This validates the Agents 102 network hypothesis: the peer learning infrastructure does not exist yet.

7. **Denmark is the thinnest market.** Beyond Spektr, Fortiv, Danske Bank, and Novo Nordisk, we found very few Danish agent practitioners. The Danish ecosystem appears smaller than Finland, Sweden, or Norway for agent-specific work.

---

## Verification Mechanisms: The Key Finding

In coding, tests pass or fail. What is the equivalent in business functions?

| Domain | Verification Mechanism | Speed | Nordic Example |
|--------|----------------------|-------|----------------|
| Code | Test suite passes | Seconds | Lovable, Riff |
| Finance/AP | Invoice balances, PO matches | Minutes | Vic.ai (99% accuracy), Basware (>97%) |
| Legal | Citation exists, clause matches | Minutes | Legora (ISO 42001) |
| Compliance | Regulatory rule met | Minutes | Spektr (rule matching) |
| Insurance Claims | Damage matches policy, costs reconcile | Hours-days | Gjensidige (Eva/Sofie/Frank) |
| Customer Service | Query resolved, no escalation | Minutes | Klarna, Nordea |
| Sales | Deal won/lost | Weeks-months | Optivian (unverified) |
| HR | Hire successful | Months | None in Nordics |
| Strategy | Decision correct | Years | None anywhere |

**The speed of verification determines the speed of agent adoption.** This is the cross-domain meta-pattern (L4) emerging from the Nordic evidence.

---

## Implications for Agents 102

1. **Teach verification design, not just agent design.** The biggest insight from this research: autonomous agents require fast verification loops. Training should teach people to DESIGN verification mechanisms for their domain before building agents.

2. **Finance and legal are the showcase domains.** When demonstrating that coding-agent patterns apply to business functions, use AP automation (Vic.ai/Basware) and legal workflows (Legora) as evidence. These are the strongest Nordic examples.

3. **Gjensidige is the enterprise case study.** A 200-year-old Norwegian insurer deploying named autonomous agents is more compelling for our buyer persona (large Nordic companies) than any startup example.

4. **The peer network gap is confirmed.** Zero evidence of cross-company agent practice sharing in the Nordics. This is the exact gap Agents 102's Step 5 (Drive into Value Chains) fills.

5. **HR is the opportunity and the risk.** Every enterprise needs HR agents, but GDPR makes autonomous HR decisions a minefield. Training should address this tension explicitly.

---

## Sources

1. Vic.ai VicAgents launch -- https://www.vic.ai/blog/vic-agents-future-of-autonomous-finance
2. Vic.ai how it works -- https://www.vic.ai/how-it-works
3. Basware agentic AI in AP -- https://www.artificialintelligence-news.com/news/agentic-ai-drives-finance-roi-in-accounts-payable-automation/
4. Basware AI Hub -- https://www.basware.com/en/ai-hub
5. Legora Workflows launch -- https://www.businesswire.com/news/home/20250625950992/en/Legora-Launches-Market-First-Agentic-Workflows-to-Orchestrate-Legal-Tasks
6. Optivian product page -- https://optivian.ai/product/
7. Spektr Agent Builder launch -- https://ffnews.com/newsarticle/fintech/spektr-2-0-launches-unveiling-ai-agent-builder-to-transform-compliance-for-fintechs/
8. NAMS 2025 takeaways (Erja Ylajarvi) -- https://lottaholmstrom.se/2025/04/25/keeping-the-audience-in-the-loop-my-nams-takeaways/
9. Workday completes Sana acquisition -- https://www.prnewswire.com/news-releases/workday-completes-acquisition-of-sana-302603954.html
10. Lovable nearing 8M users -- https://techcrunch.com/2025/11/10/lovable-says-its-nearing-8-million-users-as-the-year-old-ai-coding-startup-eyes-more-corporate-employees/
11. Teemu Linna at Sitra -- https://www.sitra.fi/en/people/teemu-linna/
12. Agion.dev -- https://agion.dev
13. Riff Series A -- https://arcticstartup.com/riff-formerly-databutton-raises-16m-series-a/
14. Gjensidige AI agents (NHH) -- https://www.nhh.no/en/nhh-bulletin/article-archive/2025/april/claim-the-future/
15. Gjensidige AI (NHH DIG) -- https://www.nhh.no/en/research-centres/digital-innovation-for-growth/dig-news-and-blogs/2025/we-have-just-begun-using-ai/
16. Equinor AI savings -- https://www.equinor.com/news/20260107-artificial-intelligence-saved-equinor-usd-130-million
17. Nordea AI scaling -- https://hyperight.com/banking-on-ai-nordea-poc-to-10000-users/
18. Nordea hiring agentic PM -- https://www.conversationalainews.com/nordea-is-hiring-for-a-conversational-ai-product-manager/
19. Rebecca Filis LinkedIn -- https://www.linkedin.com/in/rebecca-filis-16b29a3/
20. Klarna AI workforce -- https://finance.yahoo.com/news/klarna-says-ai-agent-doing-070000869.html
21. DNB Juno case study -- https://boost.ai/case-studies/how-dnb-transformed-customer-service-operations-and-enhanced-human-agent-efficiency-with-conversational-ai/
22. Vic.ai GlobeNewswire launch -- https://www.globenewswire.com/news-release/2025/06/03/3092555/0/en/Vic-ai-Launches-VicPay-Vendor-Portal-and-VicAgents-Introducing-Agentic-AI-Partners-for-Enterprise-Finance.html
23. Legora Microsoft case study -- https://www.microsoft.com/en/customers/story/23171-legora-azure-openai
24. Optivian launch (OpenPR) -- https://www.openpr.com/news/4375048/optivian-launches-autonomous-ai-sales-agents-to-decouple
25. Spektr about page -- https://www.spektr.com/about
26. Basware InvoiceAI -- https://www.basware.com/en/solutions/ap-automation/revolutionize-your-ap-with-invoiceai
27. Basware AI agents value -- https://www.basware.com/en/ai-to-roi-unlock-value-with-ai-agents
28. Gjensidige PYMNTS -- https://www.pymnts.com/artificial-intelligence-2/2026/ai-agents-are-now-running-the-back-office-at-insurance-giants/
29. Klarna Agentic Product Protocol -- https://investors.klarna.com/News--Events/news/news-details/2025/Klarna-Launches-Agentic-Product-Protocol-The-Open-Standard-That-Makes-100M-Products-Instantly-Discoverable-by-AI-Agents/default.aspx
30. AgentCon Stockholm -- https://globalai.community/chapters/stockholm/events/agentcon-stockholm/
31. EY Nordic insurance claims -- https://www.ey.com/en_gl/insights/financial-services/emeia/how-a-nordic-insurance-company-automated-claims-processing
32. Nordic HR trends 2026 -- https://www.catalystone.com/blog/ceo-outlook-2026-why-nordic-hr-can-no-longer-stand-still
33. Hege Skryseth LinkedIn -- https://www.linkedin.com/in/hegeskryseth/
34. Mattias Fras at Nordea -- https://theorg.com/org/nordea/org-chart/mattias-fras
35. Nordea three ways AI -- https://www.nordea.com/en/news/three-ways-we-use-ai-to-accelerate-efficiency-and-growth
