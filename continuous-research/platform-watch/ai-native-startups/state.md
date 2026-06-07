# AI-Native Startups — Platform State

Last updated: 2026-06-06 (cycle 125)
OODA cycles: 5

## Focus

AI-native startups building agent-first products that compete directly with traditional enterprise SaaS incumbents. Not horizontal AI platforms (OpenAI, Anthropic) — these are vertical AI companies attacking specific enterprise functions: legal, finance, customer service, HR, sales. Tracked because the "build vs. buy" question for CTOs now includes a third option: buy from an AI-native vendor that may outperform the legacy incumbent.

## Key Verdict (as of 2026-06-06)

**Legal AI quantified hard ceiling: Harvey LAB results show frontier models complete 7.1% of legal tasks end-to-end (Claude Opus 4.7), 5.4% (Sonnet 4.6), with GPT-5.5 at 2.1% and Gemini 3.5 Flash at 0.8% under strict all-pass criteria (May 2026). Two caveats verified cycle 126: (1) LAB covers common-law jurisdictions only — direct applicability to civil-law markets (Nordics, continental Europe, ~150 countries) is unestablished; HAQQ-LAB launched in May 2026 to fill this gap; (2) market-participant bias: Harvey defines "good legal work" in a benchmark evaluating Harvey's competitors (Bob Ambrogi/LawNext, May 2026). Different models lead different practice areas — no single dominant model.** The $190M ARR and 100K lawyers coexist with this ceiling — lawyers use legal AI for task portions where partial completion + review delivers time savings. The "jagged intelligence" ceiling is now quantified, not speculated. **Enterprise AI rollback rate: 74% of enterprises that deploy AI customer communications agents (chatbots, automated CS — NOT coding agents) roll them back post-launch (Sinch "AI Production Paradox," N=2,527, 10 countries, Jan–Feb 2026, published May 2026) — governance maturity paradox: organizations with most mature governance frameworks roll back at 81%.** Domain constraint: this stat applies to customer communications agents only — not to enterprise AI broadly. **Intercom Fin floor extended:** independent 60-day test (500 tickets) found 38% average resolution rate — pushed by KB quality, not model quality. Documentation pre-work delivers 12pp lift. Decagon ARR confirmed at ~$35M ($4.5B valuation = 128x multiple, Sacra April 2026).

## Key Verdict (as of 2026-05-27)

**Legal AI has bifurcated into a genuine two-horse race with a Nordic third player: Harvey ($11B, 100K lawyers) vs. Legora ($5.55B, >$100M ARR, Baker McKenzie + BCLP firmwide) + Newcode.ai (Norway, $6.5M seed, DLA Piper Nordic deployment). Harvey launched LAB benchmark (May 2026) — a strategic move to own the evaluation standard before Legora can. First Harvey-commissioned-but-independent study (RSGI, Nov 2025) produced Level 2 productivity evidence (36.9 hrs/month for power users) but no outcome data. Sierra raised at $15B valuation. Salesforce Agentforce is scaling deals (29,000 closed, $800M ARR) but only 31% of deployments remain active after 6 months (Valoir — independent analyst). Intercom Fin verified resolution gap: claims 80%, customer cases run 42-70%. AI accounting (Basis, Pilot) remains zero independent evidence. Klarna CEO confirmed AI overreach and is rehiring humans. The 50-70% AI SDR churn pattern is approaching Level 3 convergence; Clay (enrichment-only) remains the anomaly with 0 enterprise churn and >200% NRR.**

**Previous verdict (2026-04-17): Sana acquired by Workday. Harvey Spectre is internal only. Sierra $150M ARR. Finance pre-proof. Decagon black-box friction.**

**Previous verdict (2026-04-02): Real disruption in legal and CS. Finance/accounting hot but pre-proof. HR and sales lagging or cautionary.** The strongest AI-native startups (Harvey, Sierra, Decagon) have crossed $100M ARR and serve Fortune 500 customers — this is not hype. But the 11x implosion shows that funding and ARR claims in this space need hard scrutiny. The answer to the CTO question: AI-native startups are eating the bottom of the stack (document processing, ticket resolution, bookkeeping) while incumbents retain the top (workflow orchestration, compliance, ecosystem integration). The question is whether the bottom eats upward before the top eats downward.

---

## Legal — The Most Advanced Domain

### Harvey AI

- **ARR:** $190M as of January 2026 (up from $100M in August 2025 — nearly doubled in 5 months) ([Artificial Lawyer](https://www.artificiallawyer.com/2026/01/08/harvey-hits-190m-arr-building-memory-personalisation/), Jan 2026 — [domain trade publication])
- **Valuation:** $11B (March 2026, $200M round led by Sequoia + GIC) ([CNBC](https://www.cnbc.com/2026/03/25/legal-ai-startup-harvey-raises-200-million-at-11-billion-valuation.html), Mar 2026 — [general press])
- **Scale:** 100,000+ lawyers across 1,300+ organizations. >70% of Am Law 10 firms. New HSBC deployment announced April 2026. Axiom partnership (April 8, 2026) brings Harvey to in-house legal teams via Axiom's T&T portfolio. ([Artificial Lawyer](https://www.artificiallawyer.com/2026/04/14/harveys-gabe-pereyra-on-legal-agents-world-models/), Apr 2026 — [domain trade publication])
- **Spectre agent (April 2026 update):** Harvey's "Spectre" is an internal agent infrastructure for Harvey's own operations (~800 employees), NOT a deployed law firm product. It handles engineering tasks and some non-engineering work triggered by system monitoring. Co-founder Gabe Pereyra presents it as a model for what a "law firm world model" could look like — but explicitly acknowledges "agents still make mistakes and those mistakes can be unintuitive." No external law firm deployment of Spectre was found. ([Artificial Lawyer](https://www.artificiallawyer.com/2026/04/03/harveys-spectre-agent-points-to-law-firm-world-model/), Apr 3, 2026 — [domain trade publication]; [Artificial Lawyer](https://www.artificiallawyer.com/2026/04/14/harveys-gabe-pereyra-on-legal-agents-world-models/), Apr 14, 2026 — [domain trade publication])
- **Known limitations (April 2026):** (1) Document attachment drops prompt limit from 100,000 to 4,000 characters — forces manual query fragmentation. (2) Hallucination risk with legal citations — requires verification. (3) Ethical wall problem: Harvey calls this "the most important unsolved problem" — autonomous agents risk breaching information barriers between client matters. (4) Pricing opacity: enterprise quotes have been cut 60% after pushback, suggesting rack rates are not real. ([fahimai review](https://www.fahimai.com/harvey-ai), Apr 2026 — [domain trade publication])
- **Evidence level:** Level 2-3. ARR from independent trade publication. Spectre is internal, not client-facing — that's important for CTOs evaluating "Harvey agents." The ethical wall problem is a genuine deployment blocker for multi-matter firms, not a marketing claim.
- **Threat to incumbents:** Thomson Reuters (Westlaw), LexisNexis. Harvey doesn't replace these — yet. It sits alongside them. But if "Memory" works, Harvey accumulates firm-specific knowledge that becomes switching-cost moat.

### EvenUp

- **Focus:** Personal injury litigation — AI-generated demand letters, case analysis
- **Valuation:** $2B+ (October 2025, $150M Series E led by Bessemer) ([Fortune](https://fortune.com/2025/10/07/exclusive-evenup-raises-150-million-series-e-at-2-billion-valuation-as-ai-reshapes-personal-injury-law/), Oct 2025 — [general press])
- **Scale:** 10,000 cases/week on platform, 200,000+ total cases resolved, $10B+ in damages secured ([EvenUp blog](https://www.evenuplaw.com/blog/evenup-2b-valuation/), Oct 2025 — [vendor press release])
- **Total funding:** $385M since 2019. 716 employees as of Jan 2026.
- **Evidence level:** Level 2. Single-company metrics, vendor-sourced. The $10B damages figure is impressive but unverifiable externally.

### Clio AI (Manage AI / Clio Draft)

- **Position:** Established legal practice management platform (not a startup — founded 2008) adding AI agent layer
- **Product:** Manage AI — extracts deadlines from court documents, drafts invoices, routes approvals. Clio Draft launched in Canada April 2026 for AI-powered document automation ([Clio blog](https://www.clio.com/blog/manage-ai/), 2026 — [vendor press release])
- **Significance:** Clio represents the **incumbent response** pattern — existing SaaS adding AI, not AI-native disruption. Useful comparison point.
- **Evidence level:** Level 1. Product announcements only, no independent outcome data.

### Legora (Stockholm-born, now global)

- **Valuation:** $5.55B (April 2026, $550M Series D) ([TechCrunch](https://techcrunch.com/2026/04/30/legal-ai-startup-legora-hits-5-6-valuation-and-its-battle-with-harvey-just-got-hotter/), Apr 2026 — [general press])
- **ARR:** >$100M (vendor-disclosed, Apr 2026) ([Legora newsroom](https://legora.com/newsroom/legal-teams-adoption-of-ai-propels-legora-past-100-million-in-annual-recurring-revenue))
- **Scale:** >1,000 law firm and in-house customers in 50 markets, 18 months post-general-launch. Firmwide deployments: Baker McKenzie (May 2026), BCLP (after 100+-lawyer multi-practice pilot), Deloitte Legal UK.
- **BCLP pilot detail:** 100+ lawyers across multiple practice areas and jurisdictions tested document review, due diligence, drafting. User feedback "overwhelmingly positive." BCLP quotes: "no comparable tool capable of reading and analysing documents with that level of sophistication." ([Legora newsroom](https://legora.com/newsroom/legora-selected-by-bclp-as-firmwide-ai-platform-provider) — [vendor press release / firm announcement])
- **Independent analysis:** Irys.ai independent legal research benchmark (April 2026) found Legora underperformed Irys on multi-step reasoning tasks requiring synthesis across multiple sources. ([Irys.ai](https://www.irys.ai/blog/real-decision-harvey-legora-claude-irys) — [practitioner analysis])
- **Legora vs. Harvey differentiator:** Multi-model approach (vs. Harvey's custom model); European-origin with GDPR positioning; slightly younger (18 months) vs. Harvey's deeper Am Law 100 entrenchment.
- **Nordic angle:** Swedish-origin but has explicitly pivoted US-first for expansion. Nvidia invested in the Series D. ([Mezha/Nvidia report](https://mezha.net/eng/bukvy/2ae8bc48_nvidia_invests_in/) — [general press])
- **Evidence level:** Level 2. BCLP pilot is named with specific methodology, but all outcome language ("overwhelmingly positive," "significant improvements") is qualitative and vendor-sourced. No time savings metrics published.

### Harvey LAB Benchmark (May 2026) — Strategic Move + Damaging Results

- **What:** Harvey released LAB (Legal Agent Benchmark) — open-source evaluation framework, 1,200+ tasks, 24 practice areas, 75,000+ expert-written rubric criteria. ([Artificial Lawyer](https://www.artificiallawyer.com/2026/05/06/harvey-launches-legal-agent-bench/), May 2026 — [domain trade publication])
- **Strategic significance:** Harvey is attempting to own the evaluation standard before competitors can define it. If law firms use LAB for procurement, Legora and Luminance must optimize to Harvey's rubric. Contributors include Anthropic, OpenAI, Google DeepMind, Nvidia, Stanford LIFTLab — credibility anchoring.
- **Independent commentary:** LawNext (Bob Ambrogi) notes this is a standard-setting move. ([LawNext](https://www.lawnext.com/2026/05/some-thoughts-on-harveys-launch-of-lab-an-open-source-long-horizon-benchmark-for-legal-ai-agents.html), May 2026 — [practitioner analysis])
- **CYCLE 125 UPDATE — Actual LAB results (May 2026): <10% end-to-end completion.** Best performer: Claude Opus 4.7 at **7.1%** end-to-end completion under strict all-pass criteria. GPT-5.5: 2.1%. Gemini 3.5 Flash: 0.8%. Cost at top performer: $50.90/task, 22 minutes. Harvey explicitly states: "no single model is a silver bullet for legal work today." Source: ([Harvey blog](https://www.harvey.ai/blog/legal-agent-benchmark-initial-results) — [vendor press release, methodology open-source and verifiable via https://github.com/harveyai/harvey-labs]); ([LawNext](https://www.lawnext.com/2026/05/some-thoughts-on-harveys-launch-of-lab-an-open-source-long-horizon-benchmark-for-legal-ai-agents.html) — [domain trade publication])
- **Evidence level:** Level 2 — single-company methodology, open-source but not independently replicated yet. Harvey's $190M ARR and 100K+ lawyers coexist with 7.1% autonomous completion — they are not contradictory. Lawyers use Harvey for portions of tasks, not full autonomous completion. "Jagged intelligence" confirmed across 24 practice areas.
- **CTO implication:** The hard ceiling is now quantified. Use Harvey/legal AI for task-portions where even partial completion + human review delivers time savings. Do not expect autonomous end-to-end legal work from any current model.

### RSGI/Harvey Independent Outcome Study (Nov 2025) — First Credible Level 2 Evidence

- **What:** RSGI (FT Innovative Lawyers research firm) surveyed 40 Harvey customers — 29 law firms, 11 corporate legal teams — across 5 regions. Commissioned by Harvey but structured for editorial independence. ([Legal IT Insider](https://legaltechnology.com/2025/12/02/the-impact-of-legal-ai-a-deeper-dive-into-the-rsgi-harvey-adoption-report/), Dec 2025 — [domain trade publication])
- **Findings:** Law firm power users save 36.9 hrs/month; standard users 15.7 hrs/month. In-house power users 28.3 hrs/month; standard users 11.8 hrs/month.
- **Named participants:** A&O Shearman, Ashurst, Orrick, Paul Weiss, Mayer Brown, King & Wood Mallesons, Rajah & Tann, and others.
- **Caveat:** "Commissioned by Harvey but entirely independent" is self-report, not verified independence. No billing data, client satisfaction metrics, or error rates. These are time-input productivity claims, not outcome claims.
- **Evidence level:** Level 2. Best Harvey evidence available; still not Level 3 (no convergence across independent studies).

### Newcode.ai — Nordic-Origin Legal AI OS (cycle 118)

- **What:** Norway-based startup building "AI operating system for legal work" — outcome delegation model: lawyers define the desired outcome; AI returns the complete deliverable. Not just document processing — auditable, context-aware multi-step workflows. Use cases: contract analysis, clause extraction, regulatory research, policy alignment. ([Artificial Lawyer](https://www.artificiallawyer.com/2026/03/17/newcode-raises-6-5m-maged-helmy-interview/) — [domain trade publication], Mar 17, 2026)
- **Funding:** $6.5M seed, March 2026. Investors: The LegalTech Fund, Alliance VC, law firm investors. ([LegalTechTalk](https://www.legaltech-talk.com/newcode-ai-lands-6-5m-to-build-ai-operating-system-for-legal-work/) — [domain trade publication])
- **Deployment:** DLA Piper partnership across Sweden, Norway, Finland (announced July 2025 — outside 6-month window, but embedded implementation is ongoing). DLA Piper Finland MD: "We've evaluated several AI tools and challenged ourselves to think beyond the obvious. This is a true partnership, technical, cultural and strategic."
- **Nordic angle:** First Nordic-origin legal AI-native startup with named enterprise deployment + external funding. Harvey and Legora are both US/global-first. Newcode differentiates on: Nordic legal system familiarity, embedded implementation model, smaller-scale deep integration vs. broad rollout.
- **Evidence level:** Level 2 (named enterprise client, funding round from law firm investors as adoption proxy, domain trade press)
- **CTO relevance:** For Nordic CTOs — a third option beyond Harvey/Legora. For global CTOs — confirmation that legal AI-native is now multi-vendor, with regional players emerging.

### Legal Domain Summary

Legal is the most advanced AI-native vertical. Harvey's growth rate ($100M → $190M in 5 months) is the single strongest signal that AI-native can outgrow incumbents. **New this cycle:** Legora at $5.55B and >$100M ARR is a credible second horse — this is now a two-vendor race, not a Harvey monopoly. Harvey's LAB benchmark launch is a strategic attempt to lock the evaluation standard before Legora gains more ground. But: law firms are famously sticky with vendors, and the real question is whether Harvey displaces Thomson Reuters/LexisNexis or supplements them. First Level 2 outcome data exists (RSGI study) but is productivity-input only — no independent billing or client outcome evidence yet.

---

## Finance / Accounting — Hot Funding, Pre-Proof

### Basis

- **Valuation:** $1.15B unicorn (February 2026, $100M round from Accel, GV) ([TechFundingNews](https://techfundingnews.com/basis-ai-accounting-100m-1-15b-unicorn/), Feb 2026 — [general press])
- **Claim:** "First AI agent to complete an end-to-end 1065 tax return autonomously" ([vendor announcement](https://techfundingnews.com/basis-ai-accounting-100m-1-15b-unicorn/), Feb 2026 — [vendor press release])
- **Adoption:** Used by 30% of top 25 US accounting firms ([vendor claim — unverified])
- **Evidence level:** Level 1-2. Unicorn valuation and firm adoption are notable, but the autonomous tax return claim is vendor-only. No independent verification of accuracy or time savings.

### Pilot

- **Product:** "AI Accountant" — launched February 4, 2026. Claimed fully autonomous bookkeeper: onboards businesses, configures accounting systems, closes historical books, produces financial statements (P&L, cash flow, balance sheet) with zero human involvement. ([CPA Practice Advisor](https://www.cpapracticeadvisor.com/2026/02/04/pilot-rolls-out-fully-autonomous-ai-accountant/177453/), Feb 2026 — [domain trade publication])
- **Founded by:** Jessica McKellar (former Dropbox VP Engineering). 7,000+ startup clients over 10 years.
- **Caveat Pilot themselves state:** "If there is a judgment call that could have a real material impact, it will signal that it needs a human response before moving on." — meaning the "zero human intervention" claim applies only to non-judgment tasks.
- **Independent evidence gap (April 2026):** No independent accountant or customer accounts of production deployment found. Trade coverage (Accounting Today, CPA Practice Advisor, Insightful Accountant) is entirely based on CEO quotes with zero outside voices. One anecdotal case (2.5 years of books in one month) is unnamed and unverified. Reviews on SoftwareAdvice note that "much of the real work still needs people" in existing Pilot service — the AI Accountant is an extension of this model.
- **Evidence level:** Level 1. Strong vendor narrative, domain trade coverage, but no independent outcome data 2+ months after launch. "Zero human intervention" is an extraordinary claim that remains unverified.

### Accrual

- **Funding:** $75M launch round led by General Catalyst (February 2026) ([CPA Practice Advisor](https://www.cpapracticeadvisor.com/2026/02/05/startup-accrual-officially-launches-with-75m-in-funding-to-bring-ai-native-automation-to-accounting/177600/), Feb 2026 — [domain trade publication])
- **Focus:** Tax preparation and review for Top 100 accounting firms
- **Claim:** Preparation time down 85%, review time down 60% ([vendor claim via trade publication])
- **Evidence level:** Level 1. Launch-stage. Impressive funding, but zero independent deployment evidence.

### Digits

- **Position:** "Autonomous General Ledger" — AI agents replacing bookkeepers entirely
- **Philosophy:** AI autonomy over human collaboration (different from Pilot/Basis which still frame around augmentation)
- **Evidence level:** Level 0-1. Philosophy statements, no deployment evidence found.

### Numeric

- **Focus:** Close management and reconciliation automation
- **Funding:** $38M+ raised
- **Evidence level:** Level 1. Product exists, customers exist, but no outcome data found.

### Finance Domain Summary

More money than proof. Five well-funded AI-native accounting startups launched or scaled in early 2026. The talent is real (McKellar at Pilot, top VCs backing all of them). But the "fully autonomous" claims are vendor-sourced and unverified. **This is the domain to watch for convergence** — if even two of these five report independent outcome data in H1 2026, it becomes Level 3. Until then, Level 1-2 across the board.

**May 2026 update:** No independent outcome data found for either Basis or Pilot despite 3 months post-launch. The cycle-over-cycle null finding is itself informative — if 30% of top-25 accounting firms are using Basis, at least one accountant would be writing about it if outcomes were exceptional. Silence is a weak negative signal.

---

## Customer Service — Clear Winner Category

### Sierra

- **ARR:** $150M as of January 2026 (up from $100M in November 2025) ([Sacra](https://sacra.com/c/sierra/), Apr 2026 — [domain trade publication / independent financial analysis])
- **Valuation:** $10B ([CMSWire](https://www.cmswire.com/customer-experience/sierra-ais-10b-valuation-marks-a-turning-point-for-conversational-ai/), 2026 — [tech press])
- **Founders:** Bret Taylor (ex-Salesforce co-CEO, ex-Facebook CTO) + Clay Bavor (ex-Google VP)
- **New deployment (April 2026):** Blue Shield of California deployed Sierra-powered AI voice agent through Stellarus partnership for a large national employer, reporting 4.4/5 CSAT across thousands of member interactions. Healthcare, highly regulated. ([thecscafe.com](https://www.thecscafe.com/p/sierra-350m-10b-ai-agents-customer-success), Apr 2026 — [domain trade publication])
- **New product (April 2026):** First Level 1 PCI-compliant conversational AI platform — agents can collect card and ACH payments across chat and voice. Expands into regulated financial transaction handling. ([myaskai.com](https://myaskai.com/blog/sierra-ai-complete-guide-2026), Apr 2026 — [tech press])
- **Known limitations (April 2026):** (1) Inconsistent support response during technical issues — operational risk for live deployments. (2) Pricing unpredictability: per-conversation model means quarterly costs hard to forecast; channel/language expansion triggers non-visible price jumps. (3) Despite strong demo metrics, enterprise leaders cite gaps in workforce management, agent collaboration, and operational visibility for long-term ROI. ([aiagentslist.com review](https://aiagentslist.com/agents/sierra), Apr 2026 — [practitioner analysis])
- **Evidence level:** Level 2-3. ARR from independent financial analysis (Sacra). Blue Shield deployment is the first named healthcare customer with a specific outcome metric (CSAT score). Vendor claims still dominate — we know firms are buying but limited on what resolution rates look like independently.
- **Threat to incumbents:** Direct competitor to Salesforce Service Cloud, Zendesk, Freshdesk. Bret Taylor literally ran Salesforce — he knows exactly what enterprise CX buyers want. This is the most credible threat to an incumbent.

### Intercom Fin

- **Resolution rates:** 60-67% average across platform, up from 27% at launch. Individual customers report 50-70% ([Intercom](https://fin.ai/), 2026; [GTMnow](https://gtmnow.com/how-intercom-built-the-highest-performing-ai-agent-on-the-market-using-outcome-based-pricing-with-archana-agrawal-president-at-intercom/), 2026 — mix of [vendor press release] and [practitioner analysis])
- **Scale:** 36M+ conversations resolved
- **Pricing innovation:** Outcome-based pricing — pay per resolution, not per seat. This is structurally disruptive to seat-based SaaS.
- **Case studies:** Lightspeed 65%, Sharesies 70% in 12 weeks, Fundrise 50%+ in 3 months ([Intercom customer pages](https://fin.ai/customers/lightspeed) — [vendor case study, Level 0])
- **Evidence level:** Level 2. Intercom is not a startup (founded 2011), but Fin is an AI-native product rebuild. Resolution rate claims need independent verification — the 99.9% accuracy claim for Fin 2 is vendor marketing until proven otherwise.
- **Note:** Intercom restructured team roles around AI — human agents shifted to complex cases, AI handles volume. This organizational pattern matters more than the resolution rate.

### Decagon

- **Valuation:** $4.5B (January 2026, first tender offer completed March 4, 2026) ([TechCrunch](https://techcrunch.com/2026/03/04/decagon-completes-first-tender-offer-at-4-5b-valuation/), Mar 2026 — [general press])
- **ARR (CYCLE 125 UPDATE):** ~$35M annualized as of late 2025 = **~128x revenue multiple** (Sacra independent equity research, April 13, 2026 — [practitioner analysis]). This is among the highest revenue multiples in the category. ([Sacra](https://sacra-pdfs.s3.us-east-2.amazonaws.com/decagon.pdf), Apr 2026)
- **Funding:** ~$481M across five rounds. 300+ employees.
- **Named customer metrics (vendor-sourced, Level 0):** Chime 70% resolution (chat + voice), Duolingo 80% deflection, Substack 90% resolution, Hunter Douglas $1M revenue from fully AI-handled conversations. Dual pricing: per-conversation + per-resolution. Substack 90% needs independent verification.
- **Customers:** Notion, Rippling, Duolingo, Chime, Hertz, Eventbrite, Substack, Riot Games, Avis Budget Group, Oura Health. 100+ large customers.
- **Known limitations (April 2026):** (1) Black box problem — users cannot see why the AI did what it did; difficult to diagnose errors during live customer interactions. (2) Contract minimums $95K–$590K+/year — prohibitive for non-enterprise. (3) 6-week minimum onboarding — not a self-serve product; requires Agent Engineers. (4) G2 Ticket Resolution score 7.9/10 — lowest of its category metrics — suggests real-world resolution quality below marketing claims. (5) Heavy data quality dependency — poor internal documentation degrades performance significantly. ([Decagon review aggregation](https://www.g2.com/products/decagon/reviews), [pagergpt.ai](https://pagergpt.ai/alternative/decagon-reviews), Apr 2026 — [practitioner analysis])
- **Vendor ROI claim:** $800K savings per $250K spent ([vendor claim — unverified])
- **Innovation:** Agent Operating Procedures (AOPs) — natural language workflows that "compile into code." Spring 2026: outbound voice (proactive AI calls).
- **Evidence level:** Level 1-2. Impressive customer list but metrics are vendor-sourced. The black box complaint and 7.9/10 G2 resolution score are the first independent friction signals visible in practitioner review aggregation. Decagon grew from stealth (June 2024) to $4.5B in 18 months — velocity is real, but production quality evidence is still thin.

### Intercom Fin — Resolution Rate Gap Verified

- **The headline vs. reality gap:** Intercom claims 67-80% resolution rates. Named customer case studies run 42-70% (Linktree 42%, Robin 50%, Anthropic-as-customer 50.8%, Sharesies 70%). Independent 500-ticket test found actual rates run 10-20 points below Intercom benchmarks. ([Builts AI](https://builts.ai/blog/intercom-fin-ai-review/), 2026 — [practitioner analysis])
- **CYCLE 125 UPDATE — floor lower than KB had:** Updated Builts.ai test (60-day, 4 small-business clients, 500 tickets) found **38% average resolution** — below Intercom's marketed 67% and below even their conservative "up to 50%" framing. Clients with comprehensive documentation: 47–52%. Sparse-FAQ clients: 28–31%. 12-percentage-point lift from 2–4 weeks of documentation pre-work. **Key driver: knowledge base quality, not model quality.** Source: ([Builts.ai](https://builts.ai/blog/intercom-fin-ai-review/), updated April 10, 2026 — [practitioner analysis])
- **Practical calibration from independent testing:** Below 30% resolution → invest in KB cleanup before deploying. Above 40% with solid CSAT → clear ROI case. This is the honest operating range.
- **Evidence level:** Level 2. 500-ticket independent test with disclosed methodology; named customer cases corroborate. KB quality driver is new finding — actionable for deployers.

### Salesforce Agentforce — Scaling Deals, 31% Six-Month Active Rate

- **Scale:** 29,000 closed Agentforce deals, $800M ARR (+169% YoY), 12% penetration of 150,000-customer base (Stifel estimate). ([Salesforce Q4 FY2026 earnings](https://futurumgroup.com/insights/salesforce-q4-fy-2026-earnings-show-agentic-ai-scaling-guidance-steadies/), 2026 — [general press])
- **The real number:** Only 31% of Agentforce deployments remain active after 6 months (Valoir Research — independent analyst). ([Salesforce Ben](https://www.salesforceben.com/salesforce-says-agentforce-is-booming-the-community-isnt-so-sure/) — [practitioner analysis])
- **Community skepticism vs. official narrative:** Salesforce Ben (independent Salesforce analyst community) documents gap between CEO bullishness and practitioner experience. Deal counts and ARR are real; sustained production activation is the bottleneck.
- **Evidence level:** Level 2. The 31% active rate is from a named independent analyst firm (Valoir), not vendor data. This is the most important incumbent data point this cycle.
- **Implication for AI-native competition:** If the best-resourced incumbent (Salesforce) with existing CRM relationships and 150K customers can only sustain 31% active rates at 6 months, AI-native CS startups face the same or worse activation challenge with no ecosystem advantage.

### Sierra — $15B Valuation (May 2026)

- **Valuation:** $950M raise at $15B valuation announced May 2026. ([The AI Insider](https://theaiinsider.tech/2026/05/05/sierra-secures-950m-at-15b-valuation-to-become-global-standard-for-ai-customer-agents/), May 2026 — [general press])
- **Resolution rate range (independent synthesis):** Published case studies cluster at 65-77%, with range 64-94% depending on knowledge base quality and conversation complexity. CSAT consistently 4.5-4.8/5. Not a single independent third-party study — all from review aggregator synthesis of vendor cases.
- **Known gap (May 2026):** Sierra markets autonomous agents but lacks agent-assist (human-in-loop) capabilities. No workforce management integration. Pricing: per-conversation model with non-transparent channel/language expansion costs. ([Assembled.com analysis](https://www.assembled.com/page/sierra-ai) — [practitioner analysis])
- **Evidence level:** Level 2. ARR from Sacra (independent financial analysis). Resolution rates remain vendor case study only — no practitioner-direct independent account found this cycle.

### 74% Enterprise AI Rollback Rate — Governance Maturity Paradox (Cycle 125, May 2026)

- **Finding:** Sinch "AI Production Paradox" survey — 2,527 AI decision-makers, 10 countries. 74% of enterprises that deploy customer-facing AI agents roll them back or shut them down after going live. Governance maturity paradox: organizations with the most mature governance frameworks had an **81% rollback rate** — higher discipline = more failures detected, not fewer. ([The Register](https://www.theregister.com/ai-ml/2026/05/13/ai-customer-service-bots-get-rolled-back-at-74-of-firms/5239800), May 13, 2026 — [domain trade publication])
- **Definition:** "Shutting down or significantly reversing a deployed, customer-facing AI agent after going live" — Sinch's definition.
- **Zombie stat guard:** 74% passes — N=2,527 disclosed, methodology is named survey, multi-country, independent vendor (Sinch is not a CX agent competitor).
- **Evidence level:** Level 2 — large N, named methodology, independent vendor. "Rollback" definition is Sinch's own; comparison across organizations depends on consistent application.
- **CTO implication:** Governance doesn't prevent deployment failures — it surfaces them faster. Organizations with weak governance show lower rollback rates because they never measure whether their deployment works. The "governance maturity paradox" should change how organizations interpret their own rollback data.

### Customer Service Domain Summary

**This is where AI-native startups have the strongest case.** Sierra, Intercom Fin, and Decagon are all scaling with real enterprise customers. The pattern: AI handles 50-70% of ticket volume, humans handle complex cases, total cost drops 50-65%. The incumbents (Salesforce, Zendesk) are responding with their own AI, but the AI-natives moved first and moved faster. Convergence level: **Level 3** — multiple independent companies, multiple independent customers, same outcome pattern.

**Cycle 125 updates:** 74% rollback rate (Sinch, N=2,527) is the largest-N failure dataset in this research program — it sits alongside the deployment evidence as necessary counter-context. The governance maturity paradox (81% rollback for most mature orgs) means the "get governance right first" advice doesn't prevent failure; it changes what you learn from it. The Salesforce Agentforce 31% six-month active rate (Valoir, independent) is the most important incumbent data point. Klarna CEO admission of AI overreach adds a named enterprise cautionary case. The Intercom Fin floor extended to 38% in independent testing — KB quality, not model quality, is the driver.

---

## HR — Early and Fragmented

### Sana (formerly Sana.ai — Stockholm, Sweden)

- **Status (April 2026): No longer independent.** Workday acquired Sana on November 4, 2025 for $1.1B. Sana is now Workday's AI knowledge layer. ([ArcticStartup](https://arcticstartup.com/sana-acquired-by-workday/), 2025 — [domain trade publication])
- **Product post-acquisition:** "Sana for Workday" — gives Workday customers a new interface to query Workday data, run reports, invoke transactions, analyze data via Sana Agent. Integrates with Salesforce, Teams, Slack, SharePoint. Bundled with 750+ HR/leadership/management courses. Rollout began in 2026. ([reworked.co](https://www.reworked.co/digital-workplace/workday-finalizes-sana-acquisition-to-build-front-door-for-work/), Nov 2025 — [domain trade publication])
- **Nordic signal:** Swedish AI Reform initiative — backed by Sana/Workday foundation — providing free access to AI tools for 2.3 million Swedes across public sector, education, and civil society. Announced at AI Summit with PM Ulf Kristersson. ([Scandinavian MIND](https://scandinavianmind.com/swedish-ai-reform-launches-to-give-2-3-million-swedes-free-access-to-advanced-ai-tools/), 2026 — [domain trade publication]) — NOTE: This is free access, not enterprise deployment. A large-scale public sector initiative, but not evidence of agentic HR deployment.
- **Scale before acquisition:** 1M+ users, hundreds of enterprises.
- **Evidence level:** Level 2. The Workday integration is shipping but no independent outcome data from "Sana for Workday" has emerged yet. The Josh Bersin analysis (March 2026) is vendor-aligned (Bersin became a Workday partner simultaneously) — treat with skepticism.
- **CTO relevance:** If you're a Nordic company evaluating knowledge/HR AI, Sana is now a Workday bet, not an independent AI-native startup. The "third option" (buy from AI-native) in this category has effectively collapsed into the incumbent.

### Lattice AI

- **Position:** Established HR platform (not AI-native) adding AI agent layer
- **Product:** AI Agent for HR — answers employee questions, coaches managers, flags burnout risk ([Lattice](https://lattice.com/ai), 2026 — [vendor press release])
- **Evidence level:** Level 1. Product announcements, no deployment outcome data.

### Leena AI

- **Position:** HR automation — employee queries, onboarding, benefits administration
- **Claims:** "Significant" reduction in manual HR support volume ([vendor claim])
- **Evidence level:** Level 0-1. No specific metrics, no named customers in search results.

### Origin

- **Focus:** Enterprise Benefits Intelligence — AI for managing global employee benefits spend
- **Funding:** $30M Series A+ (March 2026, led by Notion Capital), total $50M+ ([Fortune](https://fortune.com/2026/03/25/exclusive-ai-powered-benefits-platform-origin-raises-30-million-in-fresh-funding-to-bring-chros-visibility-into-benefits-usage-and-spend/), Mar 2026 — [general press])
- **Customers:** Pfizer, Comcast, BP ([vendor press release via BusinessWire](https://www.businesswire.com/news/home/20260326028470/en/), Mar 2026 — [vendor press release])
- **Product:** Cuido AI engine — ingests fragmented benefits data (policies, contracts, renewals, broker reports) into single queryable system
- **Evidence level:** Level 1-2. Fortune 500 customer names add credibility, but no outcome metrics.

### HR Domain Summary

HR is the weakest domain for AI-native disruption right now. No company has crossed the $100M ARR threshold. The products are mostly augmentation (chatbots answering questions) rather than autonomous agents doing multi-step work. Lattice and Leena are adding AI to existing platforms — the classic incumbent response. Origin is genuinely AI-native but early-stage. **Not yet a threat to Workday or SAP SuccessFactors.**

---

## Sales — Cautionary Territory

### Clay

- **Position:** Data enrichment and workflow automation for GTM teams
- **Scale:** 300,000+ GTM teams using the platform ([Clay](https://www.clay.com/), 2026 — [vendor press release])
- **Data model:** Waterfall enrichment across 50+ data sources, 150+ premium data sources
- **2026 pricing shift:** Split credits into Data Credits and Actions, cut data costs up to 90%. Company acknowledged expecting a 10% revenue hit — signals long-term strategy over extraction ([various review sites](https://www.salesforge.ai/blog/clay-pricing), 2026 — [practitioner analysis])
- **Evidence level:** Level 2. Real product with real users, but Clay is more "AI-augmented tooling" than "autonomous agent." It enriches data — the human still runs the process.

### 11x — The Cautionary Tale

- **What happened:** Raised $74M (a16z, Benchmark), claimed to be building "Alice" — an AI SDR replacing human sales development reps
- **The reality:**
  - 70-80% customer churn — "losing 70-80% of customers that came through the door" ([Sifted](https://sifted.eu/articles/11x-toxic-culture-ceo-working-nights-a16z), 2025 — [general press])
  - Claimed customers that weren't customers (ZoomInfo, Airtable named on website despite not being active customers) ([TechCrunch](https://techcrunch.com/2025/03/24/a16z-and-benchmark-backed-11x-has-been-claiming-customers-it-doesnt-have/), Mar 2025 — [general press])
  - ZoomInfo trialed the product, found it "performed significantly worse than our SDR employees" ([TechCrunch](https://techcrunch.com/2025/03/24/a16z-and-benchmark-backed-11x-has-been-claiming-customers-it-doesnt-have/), Mar 2025 — [general press])
  - Questionable ARR calculations — counting full-year contracts after customers terminated at 3-month break clauses
  - Toxic workplace culture — 60+ hour weeks expected, 34+ departures in 2.5 years ([Sifted](https://sifted.eu/articles/11x-toxic-culture-ceo-working-nights-a16z), 2025 — [general press])
  - Potential legal action from former customers ([Salesmotion](https://salesmotion.io/blog/turns-out-ai-sdrs-are-too-good-to-be-true-11x-might-face-legal-action), 2025 — [domain trade publication])
- **Evidence level:** Level 3 — for failure. Multiple independent sources confirm the same pattern.
- **Broader AI SDR market:** 50-70% of companies churn off their AI SDR platform before first renewal. The #1 reason: deploying AI before validating outbound with humans. ([ProductGrowth](https://www.productgrowth.blog/p/the-ai-sdr-playbook-what-actually-works), 2026 — [practitioner analysis])

### Clay — $100M ARR, Zero Enterprise Churn

- **Scale:** $100M ARR, 100,000+ users reached in ~2 years. ([Clay blog](https://www.clay.com/blog/100m-arr), 2026 — [vendor press release])
- **Enterprise retention anomaly:** 0 enterprise customer churn, >200% net revenue retention (vendor-disclosed, specific and verifiable). ([OpenAI case study](https://openai.com/index/clay/) — [vendor press release])
- **Why it survives:** Clay is enrichment + data (waterfall across 50+ sources), not autonomous outreach. The distinction is critical — enrichment creates proprietary data context the human then acts on. Autonomous outreach removes the human. The category churn data confirms: enrichment works, autonomous outreach doesn't at scale.
- **2026 pricing shift:** Cut data costs up to 90% (split Credits into Data + Action Credits). Took expected 10% revenue hit deliberately — long-term strategy signal. ([MarketBetter review](https://marketbetter.ai/blog/clay-review-2026/) — [practitioner analysis])
- **Evidence level:** Level 2. NRR and ARR are vendor-disclosed; the pattern is consistent with all other evidence.

### AI SDR Churn Pattern — Approaching Level 3

- **50-70% annual churn** documented across multiple independent sources. The SaaStr analysis (practitioner publication) identifies structural cause: buyers rationally refuse multi-year contracts because models improve quarterly, making today's state-of-the-art commodity in 6 months. ([SaaStr](https://www.saastr.com/the-wave-of-ai-agent-churn-to-come-prompts-are-portable/), 2026 — [practitioner analysis])
- **"Only 2% survive past year 1"** — cited in one source but no traceable methodology found. [UNVERIFIED — NO URL] — excluded from findings, flagged here as zombie-stat candidate.
- **Counter-evidence search result:** No named company found publicly reporting sustained AI SDR performance >12 months (other than Clay, which is enrichment not outreach). The absence of counter-evidence after active search strengthens the pattern.
- **Evidence level:** Level 2-3 converging. Multiple independent sources, same pattern. Missing: a single named enterprise with >12-month AI SDR success.

### Sales Domain Summary

**Sales is where the AI-native hype most outpaces reality.** 11x is the poster child, but the 50-70% churn across all AI SDR platforms suggests a structural problem: outbound sales requires nuance, relationship-building, and context that current agents can't reliably deliver. Clay is the bright spot — but Clay is a data tool, not an autonomous agent. Don't confuse the two.

**May 2026 update:** The enrichment/outreach distinction is now the clearest pattern in the category. Clay (enrichment) → 0 churn, >200% NRR. All AI SDR (autonomous outreach) → 50-70% churn. This is a durable finding, not a temporary market condition.

---

## The "Startup vs. Incumbent" Question

### What the data actually says

The SaaS disruption narrative in 2026 is real but nuanced:

- **AI-native startups growing at 100%+** while traditional SaaS top performers stall at ~25% ([TechCrunch](https://techcrunch.com/2026/03/01/saas-in-saas-out-heres-whats-driving-the-saaspocalypse/), Mar 2026 — [general press])
- **$285B market correction** in SaaS valuations reflecting investor recognition of AI threat ([TechCrunch](https://techcrunch.com/2026/03/01/saas-in-saas-out-heres-whats-driving-the-saaspocalypse/), Mar 2026 — [general press])
- **Publicis Sapient reducing SaaS licenses by ~50%** — replacing with AI tools ([The Reservist](https://thereservist.substack.com/p/a-framework-to-evaluate-the-saas), 2026 — [practitioner analysis])
- **Bifurcation thesis:** Some SaaS categories will get demolished (deterministic task execution), others will emerge stronger (workflow orchestration, compliance, ecosystem) ([Janus Henderson](https://www.janushenderson.com/corporate/article/quick-view-saas-isnt-dead-but-the-ai-transition-is-forcing-a-hard-reset/), 2026 — [general press / analyst])

### Incumbent advantages that AI-natives haven't cracked

1. **Data gravity** — Salesforce has your CRM data, SAP has your ERP data. Switching costs are real.
2. **Compliance and audit trails** — regulated industries need 10+ years of vendor stability.
3. **Ecosystem integration** — incumbents connect to everything. AI-natives connect to what they've built so far.
4. **Procurement and legal** — enterprise procurement prefers known vendors. AI-natives require new risk assessments.

### Where AI-natives have structural advantage

1. **Speed of iteration** — no legacy code, no backward compatibility constraints
2. **Outcome-based pricing** — Intercom's per-resolution pricing fundamentally disrupts seat-based models
3. **Clean architecture** — AI-first data models vs. AI bolted onto 20-year-old schemas
4. **Talent magnet** — top AI engineers want to work at AI-native companies, not bolt AI onto SAP

---

## Failure Modes & Red Flags

### The 11x Pattern (hype-to-implosion)

- Raise massive funding on demo-driven vision
- Claim customers that are actually trial users
- Count ARR on contracts with early termination clauses
- Product underperforms humans on real-world tasks
- 70-80% churn reveals the truth
- **Red flag signals:** Round-number customer counts, Fortune 500 logos without deployment details, "replacing" humans rather than augmenting them

### The Funding-to-Delivery Gap

- AI accounting space: 5 startups, ~$300M+ combined funding, zero independent outcome verification
- Pattern: "Fully autonomous" claims at launch, no post-deployment case studies 6 months later
- **The test:** Does the startup publish customer outcome data that can be independently verified? Harvey does (via Artificial Lawyer). Most don't.

### The AI SDR Market Structural Problem

- 50-70% churn across all AI SDR platforms, not just 11x
- Suggests the problem is the use case, not the company
- Outbound sales may be structurally resistant to full automation
- SaaStr analysis adds structural explanation: buyers rationally refuse multi-year contracts because models improve quarterly — rational churn, not product failure
- Counter-evidence search (May 2026): No company found with sustainable AI SDR retention >12 months. Pattern may be universal for autonomous outreach.

### The "AI Wrapper" Risk — Google VP Warning + Observable Consolidation Pattern

- Google VP publicly named two doomed models (Feb 2026): pure LLM wrappers and AI aggregators. ([TechCrunch](https://techcrunch.com/2026/02/21/google-vp-warns-that-two-types-of-ai-startups-may-not-survive/), Feb 2026 — [general press])
- Observable pattern (May 2026): four AI lab acquisitions in five days. OpenAI closed six acquisitions. Consolidation structured as talent deals and technology licenses — most invisible in press. ([StartupHub.ai](https://www.startuphub.ai/ai-news/ai-news/2026/four-labs-four-acquisitions-ai-consolidation-may-2026), May 2026 — [general press])
- Survival indicators (from pattern analysis): (a) proprietary training data, (b) deep workflow integration creating switching costs, (c) network effects. Harvey (legal-specific data + workflow depth), Clay (data moat), Decagon/Sierra (enterprise workflow depth) pass the test. Pure-prompt-layer players do not.
- Sana ($1.1B acquisition by Workday) is the most prominent AI-native-to-incumbent consolidation example in this tracked set.

---

## Nordic AI-Native Startups

### Lovable (Stockholm)

- **Focus:** AI-native app building ("vibe coding") — not enterprise SaaS disruption, but relevant as the largest Nordic AI-native startup
- **Valuation:** $1.8B (record-breaking $200M Series A) ([TechCrunch](https://techcrunch.com/2025/02/25/swedens-lovable-an-app-building-ai-platform-rakes-in-16m-after-spectacular-growth/), 2025; [Medium](https://medium.com/@tarifabeach/lovables-meteoric-rise-why-a-swedish-ai-startup-hit-1-8-billion-in-just-eight-months-e67fcd524738), 2025 — [general press])
- **Total funding:** $653M — highest among Nordic agentic AI companies
- **Evidence level:** Level 2. Real product, real growth, but coding tools — not the business-process AI-native category we're tracking.

### Sana Labs / Sana.ai (Stockholm) — ACQUIRED BY WORKDAY

- **Focus:** Enterprise knowledge and learning platform with AI agents. Automates knowledge retrieval, onboarding, and internal training. The closest Nordic AI-native to enterprise SaaS disruption.
- **Acquisition:** Acquired by Workday (undisclosed terms). Key signal: enterprise incumbents buying AI-native capability they can't build fast enough. Sana's tech now powers Workday's AI learning and knowledge agent features.
- **Pre-acquisition:** Swedish unicorn. Enterprise customers included banks and Nordic enterprises.
- **Nordic deployers surfaced via Sana/Workday:** Berner (Finnish retail/industrial conglomerate) and Honka (Finnish log home manufacturer) — both named in Workday press materials as Sana deployers. Zero independent verification of their experiences (cycle 64 verification attempt failed — all searches returned the same press release republished 10+ times).
- **Why it matters for our research:** (1) The acquisition-as-strategy pattern — incumbents buying what they can't build. (2) Nordic-origin signal — rare. (3) The Berner/Honka trail is our best lead for Nordic enterprise AI deployment stories, even if currently unverified.
- **Evidence level:** Level 2 (acquisition fact confirmed; deployment evidence vendor-sourced only)
- **WATCH:** Do Berner or Honka ever publish independently about their Sana/Workday experience? Do other Nordic companies adopt Sana-via-Workday? Does Workday's Sana integration produce genuine agentic capabilities or just chatbot Q&A?

### Nordic Agentic AI Landscape

- **18 agentic AI startups** in Nordics, 9 funded, 2 unicorns ([Tracxn](https://tracxn.com/d/explore/agentic-ai-startups-in-nordics/__NqYXQKSwbGhafqBWMcpVnhQNookbWaEIAvN4bPlb72Y), Jan 2026 — [general press / data platform])
- **Total sector funding:** $1.13B over 10 years, $899M in 2025 alone
- **Key names:** Lovable (coding), Sana Labs (enterprise knowledge), Legora (legal), Go Autonomous, Superblocks
- **Enterprise adoption:** 54% of Nordic companies experimenting with agents, 24% observing/planning ([BCG](https://www.bcg.com/publications/2026/nordic-ai-value-creation-or-bubble), 2026 — [analyst, Level 0 but useful for context])
- **Nordic gap:** No Nordic AI-native startup attacking the same enterprise verticals as Harvey, Sierra, or Decagon at comparable scale. Sana Labs is closest in enterprise knowledge but a different category. **This is a notable absence.**

---

## The CTO Question

**"Are AI-native startups about to eat my enterprise vendors' lunch? Should I bet on them instead of Salesforce/ServiceNow/SAP?"**

### The real answer (as of April 2026):

**Not yet for your core systems. Yes for specific functions. Maybe in 18 months for more.**

1. **Customer service:** Yes, seriously evaluate Sierra or Decagon alongside Salesforce Service Cloud. The AI-natives are genuinely better at the AI part. But: Salesforce has your CRM data, your workflows, your integrations. The AI-native wins on resolution quality; the incumbent wins on ecosystem. **Decision depends on your integration complexity.**

2. **Legal:** If you have a law firm, Harvey is mandatory to evaluate. If you have an in-house legal team, watch but don't switch from your document management system yet. Harvey supplements — it doesn't replace — the legal stack.

3. **Finance/accounting:** Too early. Monitor Basis and Pilot. Don't switch from your ERP's accounting module based on launch-stage claims. If independent outcome data emerges in H1 2026, revisit.

4. **HR:** No. The AI-native HR startups are not yet competitive with Workday, SAP SuccessFactors, or even mid-market players. Add AI features to your existing HR platform instead.

5. **Sales:** Extreme caution. Use Clay for data enrichment (it works). Do not bet on fully autonomous AI SDRs — the 50-70% churn tells you the category isn't ready.

### The meta-pattern:

The sequence is: **document processing → ticket resolution → workflow automation → system of record.** AI-natives have conquered step 1-2. They're attempting step 3. Nobody has taken step 4 from an incumbent yet. The CTO's real risk isn't choosing the wrong AI-native — it's waiting so long that the AI-native that wins step 3-4 has already locked in your competitors.

---

## What We Need To Learn

- [ ] Harvey independent deployment outcomes — RSGI study is Level 2 productivity (hrs/month), not Level 3. Need billing impact, error rate, or client satisfaction data from non-vendor source.
- [ ] Legora outcome data — Baker McKenzie and BCLP firmwide deployments are in progress. Will either publish practitioner-direct accounts of outcomes? Watch Artificial Lawyer + LawNext.
- [ ] Harvey LAB adoption — do law firms actually use LAB for vendor procurement decisions? Or is it vendor theater? Signal: if Legora publishes LAB scores independently, the benchmark is real.
- [ ] Sierra and Decagon practitioner-direct accounts — still zero. The activation question (31% Agentforce active rate) applies here too. What % of Sierra/Decagon deployments are actively used at 12 months?
- [ ] Salesforce Agentforce 31% active rate — can this be triangulated? Valoir is credible but one study. If another analyst independently confirms, this becomes Level 3.
- [ ] AI accounting outcome data — H1 2026 null finding means watch H2. If Basis or Pilot still show no independent data by October 2026, the silence becomes strong negative evidence.
- [ ] AI SDR counter-evidence — the "only 2% survive year 1" claim needs a URL and methodology. Either verify or permanently flag as zombie stat.
- [ ] Decagon vs. Sierra head-to-head enterprise evaluation — how do buyers choose? No comparative practitioner account found yet.
- [ ] ServiceNow and SAP Joule incumbent catch-up — did not surface in this cycle. Deliberate search next cycle.
- [ ] Nordic AI-native in business process verticals — Legora is the strongest Nordic-origin play in enterprise (legal). Any others in CS, finance, HR? Gap persists.
- [ ] Klarna's blended model outcomes — the Uber-style flex human model is being piloted. Any data on whether it outperforms pure-AI or pure-human on cost+CSAT?

---

## Sources

All sources cited inline with URLs and source type labels per research quality protocol.

Key source types used:
- [domain trade publication]: Artificial Lawyer, CPA Practice Advisor, Accounting Today, GTMnow
- [general press]: TechCrunch, CNBC, Fortune, Sifted, Bloomberg
- [vendor press release]: Company blogs, BusinessWire announcements
- [practitioner analysis]: The Reservist (SaaS disruption framework), ProductGrowth (AI SDR analysis)
- [analyst]: BCG Nordic report (Level 0, context only)

**Note:** This domain has a higher proportion of [general press] and [vendor press release] sources than ideal. AI-native startups are covered primarily by tech press and their own announcements — practitioner-direct sources (actual users writing about their experience) are scarce. This is itself a signal: the adoption is real enough for revenue but too early for widespread practitioner writing about outcomes.
