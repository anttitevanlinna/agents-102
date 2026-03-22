# AI-Native Teams — Research Track

**Last updated:** 2026-03-22 (cycle 49)
**OODA cycles:** 1
**Focus:** How teams that deeply integrate AI into their daily work actually operate — their characteristics, practices, working style, tools, and structure.

## Why This Track Exists

The platform watch asks "which platform?" The domain research asks "which processes?" This track asks a different question: **"What does the team that's already good at this actually look like?"**

AI-native teams are the existence proof. They're not experimenting with agents — they're building with them daily. Their practices, rhythms, tool choices, and org structures are the leading indicators of what every team will eventually look like. Understanding them answers questions that platform analysis can't:

- What does the daily workflow actually look like?
- How do they divide work between humans and agents?
- What practices emerge naturally vs. what requires deliberate design?
- How do they handle quality, review, and trust?
- What tools do they actually use (not what vendors claim they use)?
- How does the team structure change?

## Scope and Expansion Path

**Phase 1 (current): AI-native teams.** Individual teams that have crossed from "using AI tools" to "AI is how we work." Characteristics, practices, daily rhythms, tool stacks, coordination patterns, failure modes.

**Phase 2: AI-native product programs.** How do multiple AI-native teams coordinate? What does program management look like when the teams are AI-native? How do roadmaps, sprints, and releases change?

**Phase 3: AI-native companies.** Company-level structure, culture, hiring, economics. What does the org chart look like? How does headcount relate to output? What's the management layer?

Each phase builds on the previous — team practices are the atom, programs are the molecule, companies are the organism.

## What Makes a Team "AI-Native"

Not every team using Copilot is AI-native. The distinction:

| Dimension | AI-assisted | AI-native |
|-----------|-------------|-----------|
| AI role | Tool (used when needed) | Co-worker (involved in most work) |
| Workflow | Human workflow + AI acceleration | Workflow designed around AI capabilities |
| Output ratio | Human produces, AI helps | AI produces, human steers/reviews |
| Skill premium | Domain expertise | Context creation + judgment |
| Team size | Traditional | Smaller teams, higher output |
| Practices | Standard + some prompting | New practices (e.g., compound engineering, eval-driven, prompt-as-spec) |

## Research Questions

### Team Characteristics
- What size are AI-native teams? How does output scale vs. traditional?
- What roles exist? What roles disappeared?
- What's the skill profile of members?
- How do they hire? What do they screen for?

### Daily Practices
- What does a typical day/week look like?
- How is work divided between human and AI?
- What are the review/QA practices?
- How do they handle context management?
- What rituals exist (standups, retros, demos)?

### Tool Stack
- Which AI tools do they actually use daily?
- How do tools compose? (e.g., Claude Code + MCP + custom tools)
- What's the infrastructure layer?
- What did they try and abandon?

### Working Style
- Synchronous vs. asynchronous?
- How do they communicate (with each other, with AI, with stakeholders)?
- How do they handle knowledge management?
- What's the pace? Sprint cadence?

### Failure Modes and Lessons
- What went wrong early?
- What practices did they abandon?
- What surprised them?
- What would they tell a team starting the journey?

### Platform Signals
- People mention tools when describing how they work — capture every tool mention
- Track which platforms enable AI-native practices vs. which constrain them
- Note when teams switch tools and why

## Findings

### Emerging Pattern A: Role Dissolution → "Product Engineer"
AI-native teams dissolve traditional role boundaries. When AI handles implementation, the remaining human work blurs PM + UX + Engineering into a generalist "Product Engineer" role focused on architecture, intent, and review.
- Sachdeva/Microsoft: 73% of time on strategic work, code implementation in single digits. "PM, UX, Engineer blurred into a broader 'Product Engineer'" ([Applied Context](https://www.appliedcontext.ai/p/ai-native-engineering-flow), Dec 2025) — [practitioner direct]
- AMPECO: Cancelled grooming sessions, replaced with alignment syncs (one engineer + one PO define intent, AI handles technical analysis) ([AMPECO blog](https://www.ampeco.com/blog/how-we-built-an-ai-native-engineering-system/), Feb 2026) — [practitioner direct]
- Every Inc: "5 products each run by ~1 person" — compound engineering enables one person to cover all roles ([Dan Shipper/X.com](https://x.com/danshipper/), 2026) — [practitioner direct]

### Emerging Pattern B: Ritual Elimination — Daily Shipping Makes Ceremonies Obsolete
When teams ship daily, biweekly sprint ceremonies lose their purpose. AI-native teams are cancelling established agile rituals and replacing them with lighter-weight practices.
- AMPECO: Discontinued iteration demos (daily shipping), moved from weekly sprints to continuous daily releases, cancelled grooming sessions. 20,000+ automated tests as quality gate. ([AMPECO blog](https://www.ampeco.com/blog/how-we-built-an-ai-native-engineering-system/), Feb 2026) — [practitioner direct]
- Every Inc: Plugin and compound engineering enable continuous deployment without coordination overhead. ([compound engineering plugin](https://github.com/nicholasgriffintn/compound-engineering-plugin), Mar 2026)

### Emerging Pattern C: The Amplification Paradox
AI dramatically boosts individual productivity but organizational metrics stay flat. AI amplifies what's already there — strong teams thrive, weak teams fail faster. This explains both the AI-native success stories AND the 42-95% failure rates.
- DORA 2025 (n=5,000): 21% more tasks, 98% more PRs merged individually, but org delivery metrics flat. AI adoption improves throughput but has NEGATIVE relationship with stability. ([DORA report](https://dora.dev/research/2025/dora-report/), Sep 2025) — [academic/research]
- S&P Global: 42% of companies abandon majority of AI initiatives pre-production, up from 17% one year prior. ([Derosiaux/Medium](https://sderosiaux.medium.com/what-changed-in-q4-2025-and-why-enterprises-are-afraid-of-2026-2027-ccd4e632baae), Dec 2025) — [practitioner analysis]
- Mollick/P&G: Individual + AI ≈ team without AI for average work, but teams + AI produce significantly more top-10% exceptional solutions. ([One Useful Thing](https://www.oneusefulthing.org/p/the-cybernetic-teammate), 2026) — [practitioner direct / academic]

### Finding: "Let AI Run, Review Later" Fails — Active Monitoring Essential
- Sachdeva's initial assumption that agents could work independently with post-hoc review proved ineffective. Active monitoring throughout development was essential for catching issues and enabling better design decisions. Foundational engineering skills became MORE critical, not less. ([Applied Context](https://www.appliedcontext.ai/p/ai-native-engineering-flow), Dec 2025) — [practitioner direct]

### Finding: Tool Stack Reality (Pragmatic Engineer Survey, n≈1,000)
- Claude Code = #1 AI coding tool (zero → #1 in 8 months, launched May 2025)
- 95% weekly AI usage, 75% use AI for ≥50% of engineering work
- 70% use 2-4 tools simultaneously, 15% use 5+
- 55% regularly use AI agents
- Cursor growing 35% despite Claude Code's rise
- ([Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/ai-tooling-2026), Mar 2026) — [practitioner analysis]

## Named Teams and Companies

*Populate as research surfaces them.*

| Team/Company | Size | Domain | Key practice | Evidence level | Source |
|-------------|------|--------|-------------|----------------|--------|
| Every (Dan Shipper) | ~10 | Media/SaaS | Compound engineering, 5 products each ~1 person | Level 2 | [practitioner direct] |
| Imprint (Will Larson) | Small | Publishing | Compound engineering adoption | Level 2 | [practitioner direct] |
| Autodesk (Spletzer's team) | Unknown | CAD/Engineering | Compound engineering + plugin | Level 2 | [practitioner direct] |
| AMPECO | ~100 (company) | EV charging | CODA orchestrator, cancelled sprints/grooming/demos, daily shipping, 20K tests | Level 2 | [AMPECO blog](https://www.ampeco.com/blog/how-we-built-an-ai-native-engineering-system/) |
| Microsoft ISE (Sachdeva) | 1 human + 6 AI agents (experiment) | Financial services (loan processing) | AI-native engineering flow, 73% strategic work, "Hypervelocity Engineering" | Level 2 | [Applied Context](https://www.appliedcontext.ai/p/ai-native-engineering-flow) |

## Convergence Patterns

*Track emerging patterns across teams. A pattern becomes reportable at Level 3 (10-20 independent signals).*

## What We Did Not Find

1. **Non-engineering AI-native teams — ZERO.** Searched specifically for marketing, finance, operations, HR teams operating AI-natively. Found adoption statistics (91% marketers, 67% finance use AI) but zero practitioner accounts of a specific non-engineering team that reorganized around AI as co-worker. The gap between "using AI tools" and "AI-native team" is enormous outside engineering. Only 10% of finance teams have AI embedded in core processes.

2. **Honest failure retrospectives from AI-native teams.** Macro statistics exist (42% abandon, 95% fail) but no specific team-level post-mortem. Sachdeva's "let AI run, review later failed" is the closest. Need: a team that tried to go AI-native and documented what broke.

3. **Team size economics with specific numbers.** "1 person = 5 people" claims widespread but poorly sourced. AMPECO doesn't report headcount changes. Every Inc is the most specific data point. Amodei predicts $1B one-person company by 2026 (70-80% odds) — prediction, not evidence.

4. **AI-native team practices beyond engineering.** The entire published literature is about software teams. Not a single blog post, talk, or thread about a marketing/finance/operations team that restructured around AI as co-worker rather than tool. This is either pre-chasm, happening silently, or structurally different from engineering AI-nativeness.

## Sources

*All findings must include clickable URLs and source type labels per project research quality protocol.*
