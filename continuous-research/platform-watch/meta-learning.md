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

*(New cycle observations go here, newest first)*
