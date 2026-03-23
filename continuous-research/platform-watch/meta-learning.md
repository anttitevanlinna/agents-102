# Research Meta-Learning Log

The system learns about the domain. This file is where the system learns about **how to research the domain.** After each cycle, the researcher reflects: what worked, what didn't, what to try differently. Over time, this becomes a compounding advantage — the system gets better at researching, not just better at knowing.

## How to Use This File

1. **Read at the start of each cycle** — before choosing focus, check what previous cycles learned about research methods
2. **Write at the end of each cycle** — add 2-3 sentences about what you learned about researching (not about the domain itself)
3. **Patterns accumulate** — when the same observation appears 3+ times, promote it to a Research Heuristic

---

## Research Heuristics

Proven patterns for how to research effectively. Promoted from observations when they recur 3+ times.

### Source Reliability

1. **Vendor press releases create false convergence.** The same claim republished in 5+ outlets looks like convergence but traces to one source. Google's "80% automation" is the textbook case. Always trace to the original source. *(Observed: retrospective, C40, C42, C46)*
2. **Practitioner X.com threads and blog posts are highest-signal per unit of research time.** One thread from someone who deployed reveals more than 10 vendor posts. *(Observed: retrospective, C38, C39, C41, C43)*
3. **GitHub stars/commits are reliable adoption proxies.** Can't be faked like press coverage. Compound engineering plugin 5K→10.8K stars confirmed real adoption velocity. *(Observed: retrospective, C44)*
4. **Domain trade press beats vendor announcements.** Chain Store Age, CX Dive, Axios, Diginomica cover the company, not the vendor. Best source for verifying vertical SaaS claims. *(Observed: C40, C42, C44, C45)*
5. **Revenue is the most reliable adoption indicator.** Can't game revenue like press releases. Agentforce $800M ARR, ServiceNow $600M ACV are trustworthy. *(Observed: retrospective, C40, C45)*
6. **Law firm analysis blogs are best for regulatory interpretation.** Baker McKenzie, Orrick, Bird & Bird explain what law means for deployers — better than EU pages or vendor blogs. *(Observed: C44)*
7. **Transformation research has higher signal-to-noise.** Evidence is academic/practitioner-direct, not vendor-driven. Mollick, MIT, Quintero are all substantive and verifiable — unlike platform research where 80%+ is Level 0. *(Observed: C41)*

### Query Strategies

1. **Counter-evidence queries are the most productive.** "[Platform] limitations," "[platform] not ready," "failure rate," "problems" produce higher-value findings than success queries. Practitioners who hit walls write about walls. *(Observed: retrospective, C42, C43, C44, C45, C46)*
2. **Person-specific searches always beat topic searches.** "Corey Haines marketing agent" finds signal immediately. "AI marketing agent 2026" finds noise. *(Observed: retrospective, C38, C39, C43)*
3. **Business-domain practitioners publish on Substack/newsletters, not X.com.** Lenny's Newsletter, Every.to, SaaStr are better sources than Twitter for business-domain agent practitioners. *(Observed: C38, C43)*
4. **For vendor-driven domains, search vendor announcement pages naming customer practitioners.** Berner/Honka came from Workday Sana announcement. When practitioners don't publish, vendors naming them is the discovery path. *(Observed: C43, C46)*
5. **Searching for counter-evidence to our thesis strengthens or corrects it.** Either the counter-evidence is weak (thesis confirmed) or it reveals blind spots. Always worth running. *(Observed: retrospective, C41, C42)*

### Signal Detection

1. **Absence after repeated checking is evidence.** One cycle of absence means nothing. Six consecutive zeros = confirmed finding. Google Studio, Cowork, Antspace all confirmed via sustained absence. *(Observed: retrospective, C39, C46)*
2. **Vendor feature walkback is stronger signal than original announcement.** Salesforce adding Agent Script = pulling back autonomy. Corrections reveal reality. *(Observed: retrospective, C42, C43)*
3. **Practitioner sentiment shift predicts consensus 3-6 months ahead.** Karpathy on coding agents, Salesforce Ben on Agentforce limits. Leading indicator. *(Observed: retrospective, C42)*
4. **The gap between announcement and deployment IS the finding.** "Oracle announced 40+ agents" + zero deployment stories = the gap is the story. Report the gap, not the announcement. *(Observed: retrospective, C40, C46)*
5. **When nobody complains about a limit change, nobody is hitting the limits.** Google credit cliff silence confirms low adoption. Absence of user pain = absence of users. *(Observed: C46)*

### Anti-Patterns

1. **Broad topic searches surface Level 0 first.** "AI agent enterprise 2026" always finds Gartner before practitioners. Google ranks analysts above builders. *(Observed: retrospective, C38, C43)*
2. **Searching for "Nordic" as primary query finds consultancies, not practitioners.** Nordic signal comes from global searches where a Nordic company appears. *(Observed: retrospective, C43)*
3. **Trying to verify vendor claims usually fails.** Independent evidence doesn't exist. Note "vendor claim, unverified" and move on rather than burning cycles searching for confirmation. *(Observed: retrospective, C42)*
4. **Practitioner-publishing gap in vendor-driven domains is structural.** HR/compliance/operations practitioners are inside enterprises and don't blog. Our "follow people who publish" method has an inherent blind spot here. Requires alternative discovery: trade press interviews, conference presentations, vendor pages naming customers. *(Observed: C43, C45, C46)*

---

## Cycle Observations

Each entry: cycle number, date, what the researcher learned about researching.

### Retrospective: Cycles 1-25 (seeded from pattern analysis)

**Source reliability patterns observed across 25 cycles:**
- Vendor press releases republished as news create false confidence — the same claim appears in 5+ outlets and looks like convergence but traces to one source. Google's evidence ecosystem is the textbook case (Danfoss "80% automation" = one vendor source, 10 republications).
- Practitioner X.com threads are the highest-signal source per unit of research time. A single thread from a practitioner who deployed something reveals more than 10 vendor blog posts.
- GitHub stars and commit activity are reliable proxies for real adoption — they can't be faked the way press coverage can.
- Absence after repeated checking is evidence. Google Studio: 6 consecutive cycles with zero new enterprise deployments. That absence became a Level 3 finding. One cycle of absence means nothing.
- Conference talks and meetup presentations surface practitioners who don't blog. Worth checking event pages and YouTube recordings.

**Query strategy patterns:**
- "[platform] limitations" and "[platform] not ready" produce better signal than "[platform] enterprise success." Practitioners who hit walls write about walls. Vendors write about successes.
- Searching for a specific person's output (name + topic) beats topic-level searches every time. "Corey Haines marketing agent" finds signal immediately. "AI marketing agent 2026" finds noise.
- Searching for counter-evidence to our thesis is more productive than searching for confirmation. The counter-evidence either strengthens the thesis (by being weak) or reveals blind spots.
- PDF whitepapers from BCG/McKinsey are useful for knowing what CTOs hear, but never contain deployment evidence. Read them for framing language, not for findings.

**Signal detection patterns:**
- Revenue numbers are the most reliable indicator of real adoption (Agentforce $800M ARR, ServiceNow $600M ACV). You can game press releases but not revenue.
- The gap between announcement and deployment IS the finding. "Oracle announced 40+ agents" + zero deployment stories = the gap is the story.
- When a vendor walks back a feature (Salesforce adding Agent Script = pulling back autonomy), that's stronger signal than the original announcement. Corrections reveal reality.
- Practitioner sentiment shift (Karpathy on coding agents, Salesforce Ben on Agentforce limits) is leading indicator — it predicts what becomes consensus 3-6 months later.

**Anti-patterns:**
- Broad topic searches ("AI agent enterprise 2026") always surface Level 0 content first. Google ranks Gartner above practitioners.
- Searching for "Nordic" as primary query finds consultancies selling readiness, not practitioners deploying. The Nordic signal comes from global searches where a Nordic company happens to appear.
- Fetching the same vendor blog post in multiple cycles doesn't add information. Track which URLs have already been read.
- Trying to verify vendor claims usually fails — the independent evidence doesn't exist. Better to note "vendor claim, unverified" and move on than spend cycles searching for confirmation that isn't there.

---

### Cycle 38 — 2026-03-22
Business-domain practitioner discovery is far more productive when searching for specific people + their deployment stories than searching for "AI agent [domain] 2026." The SaaStr/Lemkin finding came from person-specific searches. Lenny's Newsletter and Every.to are better sources for business-domain agent practitioners than X.com — business people publish on Substack/newsletters, not Twitter. EU AI Act agent governance research revealed that the *absence* of guidance (15 months, zero AI Office documents on agents) is a stronger finding than any guidance document would be — absence at regulatory level is a positioning signal for our advisory.

### Cycle 39 — 2026-03-22
Cross-platform Tier 1 scans are most efficient when run in parallel via 3 subagents split by platform cluster (Microsoft, OpenAI+Anthropic, Google+Vertical SaaS) — each returns in ~7-8 minutes, covering ground that would take 30+ minutes sequentially. The most valuable finding this cycle (Mollick's Copilot skepticism) came from a person-specific search, not a topic search — reinforcing the heuristic that practitioner-name queries always outperform topic queries. When a finding is "continued absence," the cycle's value is in updating the count and noting any new signals that make the absence more meaningful (Mollick's voice adds credibility weight to the Cowork silence pattern).

### Cycle 40 — 2026-03-22
Vertical SaaS deep-dives produce higher-quality findings than cross-platform scans because the deployment evidence is real and independently verifiable. Searching for specific company deployments by name (e.g., "Williams-Sonoma Agentforce Olive") yields independent retail/trade press that confirms or denies vendor claims — much more productive than broad "AI agent deployment 2026" queries which surface generic statistics and vendor content. The independent trade press layer (Chain Store Age, CX Dive for retail; Axios, Fox Business for government; Diginomica for enterprise IT) is the best source for verifying vertical SaaS claims — they cover the company, not the AI vendor. ServiceNow's Autonomous Workforce is the first time an independent analyst (Derek du Preez) explicitly confirmed a platform is "genuinely agentic" rather than just a chatbot — that distinction is rare and valuable.

### Cycle 41 — 2026-03-22
Transformation methods research is fundamentally different from platform research — the evidence is academic/practitioner-direct, not vendor-driven, so the signal-to-noise ratio is much higher. Mollick's frameworks, MIT's failure data, and Quintero's practitioner observations are all substantive and independently verifiable — unlike platform research where 80%+ of results are Level 0 vendor content. The meta-insight: when researching "how" (adoption methods), follow academics and consultants-who-build (Mollick, Quintero). When researching "what" (platform capabilities), follow practitioners-who-deploy. Different questions, different source types, different search strategies. Also: searching for counter-evidence ("platform-first success") is now a strong heuristic — the absence of counter-evidence after a targeted search is itself a finding that strengthens the thesis.

### Cycle 42 — 2026-03-22
Counter-evidence searches ("Agentforce limitations," "adoption slower") produce the highest-value findings per cycle — practitioner communities (Salesforce Ben, Apex Hours) document friction that vendor press releases hide. The Agentforce architectural limits finding (15 topics/20 agents) came from a practitioner-direct source and explains why beyond-CS adoption is thinner. Domain trade press interviewing named CISOs/practitioners (TechTarget → CVS Health CISO) is more valuable than vendor launch coverage — it adds governance process detail that vendor announcements never include. Running Tier 1 checks alongside a vertical SaaS deep-dive is efficient: the Tier 1 items are quick (confirmed absence), leaving most cycle time for the substantive vertical SaaS work.

### Cycle 43 — 2026-03-22
The practitioner-publishing gap across domains is itself a research finding: Sales/GTM practitioners publish actively (Lemkin, Norton, GTM AI Podcast), but HR/compliance/operations deployers are silent — they're inside enterprises and don't blog. This means our research method (follow practitioners who publish) has a structural blind spot for domains where deployment happens behind closed doors. For those domains, vendor case studies with named practitioners (like Ramp's Richard Gobea) are the closest we get to signal. Counter-evidence searches on Agentforce ("limitations," "problems") continue to produce the highest-value practitioner-level findings per query — the Salesforce Ben community is the most productive single source for vertical SaaS reality checks.

### Cycle 44 — 2026-03-22
Regulatory research produces a different kind of value than platform or practitioner research — the finding is often "what doesn't exist yet" (no agent guidance, no Nordic compliance programs) rather than "what's new." Law firm analysis blogs (Baker McKenzie, Orrick, Pearl Cohen, Bird & Bird) are the best source for interpreting regulatory frameworks — they explain what the law means for deployers, which vendor blogs and even the EU's own pages don't do well. GitHub stars as a growth proxy is reliable for tracking methodology adoption velocity — the compound engineering plugin doubling from 5K to 10.8K in a short period is a clearer signal than any blog post about "growing adoption." When three regulatory jurisdictions converge on the same themes independently, that's a Pattern-level finding even though regulatory frameworks are Level 0 (government, not practitioner). The exception: regulatory facts are facts, not vendor claims.

### Cycle 45 — 2026-03-22
The triple-gap finding (HR/compliance/operations = zero practitioners) is now a confirmed structural limitation of our research method: these domain practitioners are inside enterprises and don't publish on public channels (blogs, X.com, GitHub). For these domains, we need alternative discovery methods — industry conferences (SHRM, GRC World Forum), LinkedIn deep-dives, or domain trade publications interviewing deployers. Running three parallel subagents (practitioner + Tier 1 + vertical SaaS) is the most efficient cycle structure — each returns in ~4-10 minutes, total coverage would take 30+ minutes sequentially. Counter-evidence queries ("failure rate," "problems," "limitations") continue to produce the highest-value findings: Lemkin's 90% failure rate and Horváth's S/4HANA barrier are both stronger signals than any success story.

### Cycle 46 — 2026-03-22
The structural insight about vendor-driven vs practitioner-driven domains (Pattern 46) explains 46 cycles of failed practitioner searches in HR/compliance/operations — these domains get agentic capability embedded in vendor platforms, not built by practitioners with coding tools. This means our research method (follow people who publish) has an inherent blind spot for vendor-driven domains. For these, domain trade press (SHRM, Artificial Lawyer, Supply Chain Dive) interviewing named deployers is the closest available signal. The Berner/Honka finding came from searching for specific vendor announcements (Workday Sana) rather than searching for "HR AI agent deployment" — vendor announcement pages that name customer practitioners are a productive search pattern for vendor-driven domains. The Google credit cliff silence is itself a finding about adoption level: when nobody complains about a limit change, nobody is hitting the limits.

### Cycle 47 — 2026-03-22
Multi-focus cycles (practitioner deep-dive + framework evolution + security incidents) produce the highest-value findings when the subagents are split by research type rather than by platform. The Meta rogue agent finding came from a security-focused search, not a platform search — domain-specific queries ("AI agent security incident enterprise") surface incidents that platform-focused searches miss entirely. For open-source frameworks, GitHub star counts are verifiable but adoption claims are not — Ruflo at 21.6K stars with zero independent enterprise mentions is the clearest example. The most honest practitioner report this cycle (Ngoc Doan on ADK failure at scale) was found by searching for "[framework] practitioner experience" rather than "[framework] enterprise adoption" — the word "experience" surfaces failure reports that "adoption" queries filter out.

### Cycle 48 — 2026-03-22
Convergence validation cycles (checking if a pattern has crossed the threshold) are most productive when they use person-specific searches rather than topic searches — searching "Dan Shipper compound engineering" and following the citation chain (who cited them, who they cited) surfaced 9 additional signals that topic-level searches for "AI coding methodology 2026" would never have found. Security survey data is best found by searching for the vendor/publisher name directly ("HiddenLayer 2026 report," "Saviynt CISO AI risk") rather than broad security queries — survey publishers optimize for branded searches. The March 31 triple-deadline check confirms the meta-heuristic: when repeated absence checks (14 cycles for Cowork, 16 for Antspace) keep returning zeros, the cycle's value is in updating counts and noting context changes (Mollick LinkedIn post) rather than expecting new findings.

### Cycle 49 — 2026-03-22
AI-native team research has a different source landscape from platform research — the best findings come from practitioner blogs describing their own transformation (AMPECO, Sachdeva) rather than from topic searches. Searching for specific company names + "AI-native engineering" produces detailed practitioner accounts, while broad "AI-native team" queries surface mostly consultancy content and vendor marketing. The DORA report is a rare example of high-quality quantitative research that directly addresses our questions — academic/research sources should be checked first for established topics like developer productivity. The most valuable negative finding: "non-engineering AI-native teams" returns ZERO practitioner accounts across 6+ specific searches (marketing, finance, operations, HR) — this absence after systematic searching is itself a reportable finding.

### Cycle 50 — 2026-03-22
The most valuable Nordic finding this cycle (Equinor $130M) came from verifying what initially looked like an agentic deployment — the general press article said "companies like Equinor are moving from assistants to agents" but fetching the actual Equinor press release revealed it's all predictive ML. The gap between press narrative ("agentic") and company's own description ("predictive maintenance, well planning, seismic interpretation") is itself a research finding. For supply chain, vendor CEO bylines on trade publication sites create a false impression of independence — the Logistics Viewpoints/FourKites article looked independent until verifying the author was FourKites CEO. Always check bylines on trade publications before classifying as independent.

### Cycle 51 — 2026-03-22
Non-engineering AI-native team research requires different search strategies than engineering research. Person-specific searches for named CS leaders (Declan Ivory/Intercom) produced the strongest signal, while broad "AI-native marketing team" queries returned only vendor content and predictions. The Klarna reversal finding came from searching for specific counter-evidence ("Klarna AI workforce reduction") — confirming the heuristic that counter-evidence queries are the most productive. The P&G "Cybernetic Teammate" study was found by following Mollick's citation chain, not by topic search. The structural insight: non-engineering domains have different source landscapes — the signal is in domain trade publications (FinTech Weekly, American Banker, HR Executive) not in tech blogs. For domains where practitioners don't blog (HR, compliance, operations), the proxy is trade press interviewing named people at named companies.

### Cycle 52 — 2026-03-22
Vertical SaaS counter-evidence queries ("ServiceNow AI agent limitations," "Agentforce limitations problems") continue to produce the highest-value findings — the CIO.com article surfacing analyst skepticism was found via a limitations-focused query, not via "ServiceNow deployment results." The SAP Joule evidence void (zero independent evidence after Agent Builder GA) confirms a heuristic: when a vendor offers a free promotional tier, it often signals adoption difficulty, not generosity. For future Joule cycles, search for SAP community forum complaints rather than deployment success stories — forum frustration is the first signal that practitioners are actually trying to use the product.

### Cycle 53 — 2026-03-22
Transformation methods research produced the highest-value cycle in weeks — Moderna (HBS case study) surfaced from following Mollick's citation chain, confirming that person-specific searches and academic case study databases are the best sources for organizational adoption evidence. The MIT 95% methodological critique was found by explicitly searching for counter-evidence to our own cited statistics — a productive new habit. The Klarna course correction becoming Level 3 (5+ independent analyses) illustrates how convergence evidence accumulates: you don't find convergence in one search — you find it by collecting the same finding from different source types over multiple cycles. For business-domain practitioner discovery, domain trade publications (Supply Chain Dive → Walmart/Uppuluri) and practitioner Medium posts (Rocher/HR) were more productive than LinkedIn searches or conference page searches. The structural insight deepens: business-domain practitioners who DO publish choose Medium or domain trade press interviews, not X.com or GitHub.

### Cycle 54 — 2026-03-23
Regulatory research produces high-value findings when law firm analysis blogs are the primary search targets — Clark Hill, Shook Hardy & Bacon, and Venable all published substantive analyses of the Colorado rework and EU Digital Omnibus within days, while general press only reported the headline. For vertical SaaS counter-evidence, Bloomberg reporting on named customer (VW) disappointment was the highest-signal find — general press becomes useful when it names specific companies expressing specific dissatisfaction. Finance/accounting domain trade publications (Accounting Today, CPA Practice Advisor) are the discovery path for business-domain agents — they cover the company and the product, not the AI vendor. Three independent autonomous accounting companies (Pilot, Basis, Accrual) were all surfaced via domain trade press, not via AI topic searches.

### Cycle 55 — 2026-03-23
Domain trade publications (Accounting Today, CPA Practice Advisor, CFO Dive, American Banker, Journal of Accountancy) are the definitive discovery path for finance/accounting agents — a single domain trade search surfaced 5 new companies that topic-level "AI agent finance 2026" searches would have buried under vendor content. The finance/accounting convergence upgrade from Level 2→3 happened by systematically checking domain-specific trade press rather than broad topic searches. Counter-evidence searches in finance ("AI accounting problems," "hallucination") produced equally valuable findings — the 86% CFO hallucination rate and 40% rework losses CHARACTERIZE the deployment pattern without negating convergence. This is a research method insight: counter-evidence that describes HOW something is adopted (with oversight) is more valuable than counter-evidence that says it's not adopted.

*(New cycle observations go here, newest first)*
