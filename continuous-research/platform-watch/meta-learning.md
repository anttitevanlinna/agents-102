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

*(empty — will fill as cycles run)*

### Query Strategies

*(empty — will fill as cycles run)*

### Signal Detection

*(empty — will fill as cycles run)*

### Anti-Patterns

*(empty — will fill as cycles run)*

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

*(New cycle observations go here, newest first)*
