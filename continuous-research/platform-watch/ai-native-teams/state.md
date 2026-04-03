---
type: state
domain: cross-domain
evidence_level: 3
platforms: [claude-code, cursor, codex, honk, intercom-fin]
nordic: true
updated: 2026-03-30
cycle: 74
answers:
  - "what does an AI-native team actually look like?"
  - "how do teams divide work between humans and agents?"
  - "what practices emerge in AI-native teams?"
  - "what does leadership look like for AI-native teams?"
---

# AI-Native Teams — Research Track

**Last updated:** 2026-04-03 (cycle 88)
**OODA cycles:** 6
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

### Leadership Models (added cycle 74)
- What does the leader/manager of an AI-native team actually do daily?
- Does the manager become a "spec writer"? What does the spec look like?
- How are the four leadership functions (direction, people, project, technical) distributed?
- Does the team need fewer managers or different managers?
- What happens to middle management when individual output 5x's?
- How do you evaluate performance when AI does the implementation work?
- Is the "player-coach" model the pattern, or does it split as teams grow?
- What's the hiring criteria for AI-native team members and leaders?

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
AI dramatically boosts individual productivity but organizational metrics stay flat. AI amplifies what's already there — strong teams thrive, weak teams fail faster. This explains both the AI-native success stories AND the high failure rates (42% abandonment per S&P Global; the oft-cited "95% fail" from MIT NANDA applies only to custom/task-specific GenAI tools with a narrow P&L-impact success definition, N=52 interviews — see cycle 80 audit).
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
| **Intercom CS (Declan Ivory)** | Unknown (avoided ~100 hires) | **Customer support** | 81% AI resolution, new roles (AI Ops Lead, Knowledge Manager, Conversation Designer), restructured job families, dedicated AI improvement time | Level 2 | [Intercom blog](https://www.intercom.com/blog/automate-customer-service-while-improving-customer-experience/) |
| **Klarna CS (Siemiatkowski)** | Was ~700 CS agents replaced | **Customer support** | AI replaced 75% of CS volume, then REVERSED — quality dropped, now rehiring with hybrid "Uber-style" model | Level 3 (counter-signal) | [FinTech Weekly](https://www.fintechweekly.com/magazine/articles/klarna-hires-customer-service-after-ai-pivot) |
| **Goldman Sachs (Argenti)** | Unknown | **Finance/Compliance** | Claude agents for trade accounting, KYC, reconciliation — tool deployment, not yet team restructuring | Level 2 | [American Banker](https://www.americanbanker.com/news/goldman-equips-ai-agents-do-trade-accounting-onboarding) |
| **OpenAI Codex team (Rasmussen)** | Core <3, full team ~40 | **AI product development** | Full ownership per engineer, no standups/retros, weekly work-practice reinvention, mission-led not coordination-led | Level 2 | [Eng Leadership Newsletter](https://newsletter.eng-leadership.com/p/how-to-build-ai-native-engineering) (paywalled, Feb 2026) |
| **Nordic software co. (finance, anonymized)** | 1 person | **Finance** | Non-coder with consulting background + just enough technical education. 9 months coding with Claude: bookkeeping automation → in-house tooling → AI features. Trajectory: automation → AI features → production tooling. | Level 2 | [direct observation, Mar 2026] — Nordic, first non-engineering coding-agent practitioner |
| **Nordic software co. (tech director, anonymized)** | 1 person | **Technology/Management** | Non-coder with technical background. Was: slides and docs. Now: dashboards → hosting platform for AI apps. Trajectory: consumption → creation → infrastructure. | Level 2 | [direct observation, Mar 2026] — Nordic, second non-engineering coding-agent practitioner |
| **Scania/TRATON AI-Enablement** | 4 | **Developer enablement** | MobAI: daily mob 09:00-12:00, rotating Driver/Navigator/Advisor, LLM as participant. Built DevEx Interview Agent deployed across TRATON Group. Inspired by Joe Justice workshop at Crisp. | Level 2 | [Crisp blog](https://blog.crisp.se/2025/06/02/michaelgothe/mob-programming-with-ai-inside-a-high-performing-teams-journey) + [Scania blog](https://www.scania.com/group/en/home/career/life-at-scania/software-developers-at-scania/blog-posts/blog-how-we-use-ai-to-build-a-developer-first-culture.html) — Nordic (Swedish) |
| **Solita/ISS (Twin Project)** | Unknown | **Software development** | CollabAI: 15-min role rotation, one screen, AI generates prototypes/tests/models live. Controlled comparison vs. traditional agile. Vendor claims 100x prototyping, 500x decisions, 90% fewer meetings. | Level 0 (vendor case study) | [Solita case study](https://www.solita.fi/work/breaking-new-ground-in-software-development-with-ai-powered-collaboration/) — Nordic (Finnish), UNVERIFIED metrics |

## Convergence Patterns

*Track emerging patterns across teams. A pattern becomes reportable at Level 3 (10-20 independent signals).*

### Emerging Pattern D: Customer Service as Leading Edge for Non-Engineering AI-Nativeness
Customer service is the first non-engineering function showing real team restructuring around AI. Two reasons: (1) high volume of routine queries creates a clear "AI handles volume, humans handle complexity" split, and (2) resolution rates provide clean verification metrics. Intercom (81% automated, new roles created) is the positive signal. Klarna (reversed after quality dropped) is the cautionary tale. Both confirm CS is where non-engineering AI-nativeness will emerge first — but the Klarna reversal shows it's harder than it looks.
- Intercom: 81% automation, new roles, team restructuring — [practitioner direct]
- Klarna: Reversed after replacing 700 agents — [multiple independent sources, Level 3]
- Forrester/Orgvue: 55% of companies regret AI-driven layoffs — [academic/research survey]
- Intercom customers (Anthropic, Sharesies, Lightspeed, WHOOP) achieving 50-84% resolution rates — [vendor case study]

### Emerging Pattern F: "Just Enough Technical Background" — Domain Experts Who Can Steer Agents
**Level 2, emerging (2 signals from same Nordic software company, watch for convergence)**

A specific profile is emerging: people with just enough technical education (not engineers, not CS majors) who use coding agents to transform their non-engineering roles. Two cases from the same organization:

1. **Finance practitioner** — consulting background + enough technical literacy to steer agents. 9 months with Claude Code. Trajectory: automation → AI features → production tooling.
2. **Technology director** — enough technical background to direct agents. Trajectory: consumption artifacts (slides/docs) → creation (dashboards) → infrastructure (hosting platform).

**The profile:** Not coders. But just enough technical vocabulary to steer a coding agent effectively. Domain expertise provides judgment about what to build. Claude provides implementation.

**Why this matters:** The AI-native transformation outside engineering may not require engineers. It may require domain experts with *just enough* technical literacy to direct coding agents. Lower bar than "learn to code," higher than "use ChatGPT."

**The output trajectory is significant.** Both moved from consumption artifacts (slides, docs, spreadsheets) to creation artifacts (tools, dashboards, apps). Coding agents didn't make them better at their old job. They made the old job obsolete.

**Hypothesis:** Organizations will find their AI-native pioneers among people with: domain expertise + technical curiosity + structured thinking + high agency. Not engineers. Not pure business people. The gap between.

**WATCH:** Is this pattern visible at other organizations? Does it replicate after agent training?

### Emerging Pattern I: Codex Team Model — Minimal Overhead, Full Ownership, Weekly Reinvention
**Level 2 (single practitioner source — OpenAI Codex team, Feb 2026)**

Specific operating model from the Codex team at OpenAI:
- Core contributors fewer than 3; full team ~40
- Engineers own full projects start-to-finish (no handoffs)
- Rituals eliminated: daily standups, retrospectives, sprint planning
- "Align on things" is the only meeting purpose
- New discipline: **weekly reinvention of work practices** to eliminate productivity bottlenecks
- Pair work encouraged for idea exchange, not execution
- Leadership act: people selection + mission setting → then get out of the way

This extends Pattern G (spec = leadership act) with operational detail. When ownership is fully distributed and agents handle execution, the leadership act shrinks to: (1) select the right people, (2) set the mission clearly, (3) continuously remove friction. Coordination overhead collapses.

Source: Rasmussen, Eng Leadership Newsletter, Feb 2026 — [practitioner direct, paywalled]. https://newsletter.eng-leadership.com/p/how-to-build-ai-native-engineering

### Emerging Pattern G: "The Spec Is the Leadership Act" — How AI-Native Teams Are Led
**Level 3 (convergence — 7+ independent signals, cycle 88 update)**

The leader of an AI-native team writes specifications that direct agents, then reviews whether output meets the spec. The management artifact shifts from verbal direction, Gantt charts, or sprint backlogs to written specifications in markdown. This is not a new skill — it's the same intent-communication skill good managers always had, expressed in a different medium.

**Six independent signals:**
1. **Karpathy** — program.md as the management artifact. "The human programs the organization. The agent programs the model." ([GitHub/autoresearch](https://github.com/karpathy/autoresearch), 2026) — [practitioner direct]
2. **StrongDM (McCarthy)** — "attractor" repository contains zero code, just three markdown spec files. Humans write specs, agents implement, holdout scenarios validate. ([Simon Willison blog](https://simonwillison.net/), Feb 2026) — [practitioner direct]
3. **Spotify** — Senior engineers define tasks in natural language, agents implement via Honk/Claude Code, engineers review async. "Developers act more as system architects and quality gatekeepers than direct authors." ([TechCrunch](https://techcrunch.com/2026/02/12/spotify-says-its-best-developers-havent-written-a-line-of-code-since-december-thanks-to-ai/), Feb 2026; [InfoQ/QCon London](https://www.infoq.com/news/2026/03/spotify-honk-rewrite/), Mar 2026) — [general press] + [practitioner analysis]
4. **Mollick** — MBA managers outperformed coders in 4-day startup experiment because PRDs, design intent docs, and Five Paragraph Orders transfer directly as AI prompts. "The skills dismissed as 'soft' turned out to be the hard ones." ([One Useful Thing](https://www.oneusefulthing.org/p/management-as-ai-superpower), Jan 2026) — [practitioner direct / academic]
5. **Osmani (Google Chrome)** — Published detailed spec-writing guide as the new core engineering skill. ([addyosmani.com](https://addyosmani.com/blog/good-spec/), 2026; also on [O'Reilly](https://www.oreilly.com/radar/how-to-write-a-good-spec-for-ai-agents/)) — [practitioner direct]
6. **30+ agentic coding frameworks** — Spec-driven development mapped as dominant pattern. "Specifications may become the primary interface between humans and software systems." ([Vishal Mysore/Medium](https://medium.com/@visrow/spec-driven-development-is-eating-software-engineering-a-map-of-30-agentic-coding-frameworks-6ac0b5e2b484), Mar 2026) — [practitioner analysis]

**What the daily leadership act looks like:**
- Write the specification (what to build, acceptance criteria, constraints)
- Review AI output against the spec
- Redirect when agents drift (active monitoring, not post-hoc review — per Sachdeva finding)
- Capture learnings into persistent context (compound engineering step — per Shipper/Every)
- Architectural decisions about decomposition and scope

**Three sub-models observed for how leadership functions redistribute:**

| Model | Example | How it works | Scale |
|-------|---------|-------------|-------|
| **Distributed functions** | Anthropic (Ben Kuhn) | 4 leadership functions (direction, people, project, technical) split across different ICs. Management = coaching/hiring, not directing. "Member of Technical Staff" as anti-hierarchy title. | ~1,100 |
| **Player-coach** | Intercom (Declan Ivory) | Leader is "part strategist, part operator" — analyzes AI system performance AND coaches the team. Named by Ivory as the model for AI-first support. | Mid-size |
| **Data-as-manager** | Tesla (Joe Justice) | "Your manager is data." Information symmetry replaces information brokering. KPIs replace direction-setting. Employees choose projects daily. | ~70,000 |

**What disappears:** Management-as-information-brokering (all three models eliminate it through transparency and tooling). Status meetings. Cascade briefings. The manager who exists to relay information up and down.

**What remains human:** People development/coaching. Hiring judgment. Quality taste ("knowing what good looks like" — Mollick). Architectural decomposition decisions.

**What transforms:** Direction-setting becomes spec-writing. Performance evaluation becomes output review. Coordination becomes context management (CLAUDE.md, shared specs, information symmetry).

**The unsolved problem — performance evaluation:** DORA 2025 (n=5,000) confirms traditional engineering metrics can't separate AI-generated from human-authored work. Shopify's blunt approach: add AI usage to performance reviews (measuring input, not output quality). StrongDM's approach: holdout scenarios evaluate system output. Intercom's approach: resolution rate, CSAT, automation coverage evaluate system output. **Nobody has published a framework for evaluating the human spec-writer's quality.** This is the biggest open question for AI-native leadership.

**Counter-evidence and failure modes:**
- Mollick's "jagged frontier" — you don't reliably know what AI will handle well, making spec-scoping difficult
- Sachdeva's finding — "let AI run, review later" fails; active monitoring essential (the spec alone is insufficient)
- Wong (Fortune) — leaders instinctively tighten control when they should enable coherence; over-specification may be as damaging as under-specification
- Mollick's "secret cyborg" data — 50%+ using AI secretly, official tools max at 20% usage; leadership trust failures are endemic
- HBR survey — 93% of AI/data leaders identify human factors as primary barrier to AI adoption (TODO: verify critically)

**Connection to existing patterns:**
- Pattern A (role dissolution) explains WHY spec-writing becomes the leadership act — when roles blur into "product engineer," the remaining distinct act is specifying intent
- Pattern C (amplification paradox) explains WHY good spec-writers thrive and bad ones fail faster — AI amplifies spec quality
- Pattern E (verification gap) explains WHY this works in engineering first — specs can be verified against tests. In domains without verification, the spec-to-output feedback loop is broken
- Pattern F (domain experts steering agents) suggests the spec-writer doesn't need to be an engineer — they need domain expertise + structured thinking + "just enough" technical vocabulary
- Enterprise Case observation 5 ("conditions creator") is the organizational analog: someone sets up the conditions (tools, training, methodology) for spec-writing to happen, then gets out of the way
- Enterprise Case observation 7 ("leader's practice level determines team trajectory") now connects directly: the leader who can write good specs and model the practice sets the team's ceiling

### Emerging Pattern H: Synchronous Co-Creation with AI (MobAI / CollabAI) — Opposite of Compound Engineering
**Level 1-2, pre-convergence (added cycle 75)**

A distinct AI-native team pattern: synchronous mob/ensemble work with AI as an active participant, rotating roles every 7-15 minutes. The opposite of compound engineering's "1 person + AI = 5 people" model.

**Two methodology variants:**
1. **MobAI** (Joe Justice, coined 2023) — mob programming + AI. Three roles: Driver, Navigator, Contributor. AI researches, suggests, automates. Applied beyond software (hardware, business, marketing). Trademarked. Delivered through JoeDX workshops and conference keynotes.
2. **CollabAI** (Marko Taipale/Solita, Finland, book Jan 2026) — similar core: one goal, one screen, 15-min rotation, AI in the loop. Foreword by Joe Justice. Emerged from Solita/ISS "Twin Project" in Finland.

**Practitioner evidence:**
- Scania/TRATON AI-Enablement team (4 people, Swedish): daily mob 09:00-12:00, qualitative benefits reported, zero quantitative metrics. When they split up, "reintegration was painful." ([Crisp blog](https://blog.crisp.se/2025/06/02/michaelgothe/mob-programming-with-ai-inside-a-high-performing-teams-journey), Jun 2025) — [practitioner analysis]
- Solita/ISS Twin Project (Finnish): controlled comparison claims 100x prototyping speed — but VENDOR CASE STUDY, unverified. ([Solita](https://www.solita.fi/work/breaking-new-ground-in-software-development-with-ai-powered-collaboration/)) — [vendor case study, Level 0]
- Virpi Rowe/Sofigate (Finnish): 5-person workshop, 7-min timeboxes. Key finding: "humans aren't naturally inclined to leverage AI tools effectively." (LinkedIn, Sep 2023, historical)
- WikiAgile robot build: completed faster than expected, AI suggestions sometimes inaccurate. (Summer 2024, historical)

**The thesis:** Mob + AI maintains shared context and prevents architectural divergence that solo + AI creates. Collective prompt refinement > individual prompting. Learning velocity > output velocity.

**Counter-evidence:**
- METR study: AI increased completion time 19% for experienced developers — the baseline assumption that AI helps is itself questionable. ([METR](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), Jul 2025) — [academic/research]
- Compound engineering (Every Inc): 1 person + AI = 5 products. Adding humans adds coordination overhead.
- Saarland University: human-AI pairs have fewer "broad" conversations than human-human pairs — developers accept AI suggestions too readily.
- Zero head-to-head comparison exists: mob + AI vs. solo + AI.

**Independent convergence signal (added cycle 75 update):**
- **PALO IT × Singapore Airlines** (Gen-e2, early 2026): Independent consultancy arrived at "AI mob programming" without Joe Justice connection. Cross-functional mob + AI using GitHub Copilot. Metrics: 60%+ effort reduction, 5 weeks vs 9 weeks, 95% AI-generated code. Scaling to ~700 people. ([LinkedIn](https://www.linkedin.com/posts/palo-it_gene2-aiengineering-generativeai-activity-7414485967807369216-ph6v), [FutureCIO](https://futurecio.tech/palo-it-and-singapore-airlines-accelerate-the-adoption-of-genai-driven-digital-product-development/)) — [vendor case study + domain trade publication]
- **DNA Finland** (CollabAI, 2026): Second named Finnish enterprise customer for Solita's CollabAI after ISS. Presented at Deep Dive event. ([Solita](https://www.solita.fi/events/deep-dive-into-solita-collabai/)) — [vendor case study]

**AI under-utilization pattern:** Two independent MobAI sessions (Virpi Rowe 2023, WikiAgile automotive undated) report humans default to own expertise, don't actually leverage AI during mob sessions. If common, the "AI as team participant" thesis has a behavioral adoption barrier.

**Learning angle (Anthropic study, Jan 2026):** AI assistance impairs learning by 17% — but mob programming's shared discussion could mitigate this by steering toward conceptual inquiry rather than delegation. Untested hypothesis. ([Anthropic](https://www.anthropic.com/research/AI-assistance-coding-skills)) — [academic/research]

**Critical assessment (updated):** Nordic evidence still traces to Joe Justice's consulting network. But PALO IT/Singapore Airlines provides the first genuinely independent convergence signal — different geography (Asia), different methodology name (Gen-e2), different tools (GitHub Copilot), same conclusion (cross-functional mob + AI). Two ecosystems, not 10-20. Pre-convergence, not convergence. Confirmation bias risk downgraded from HIGH to MEDIUM.

**WATCH for:** Singapore Airlines 700-person rollout results. More independent teams. Solution to AI under-utilization pattern. Academic mob + AI vs solo + AI comparison. Woody Zuill's opinion.

### Emerging Pattern E: The Verification Gap Blocks Non-Engineering AI-Nativeness
Engineering AI-nativeness works because code verification is clean (tests pass or fail). Non-engineering functions lack this. Marketing copy, legal analysis, financial judgment, HR decisions have no equivalent of `pytest`. This structural gap explains why non-engineering teams adopt AI as tool (high adoption rates) but don't reorganize around it (zero AI-native teams). Mollick's "management as AI superpower" framework suggests the solution is building explicit evaluation/feedback loops — but no team has published evidence of doing this successfully at scale.
- Mollick: "Management skills = AI skills" — [practitioner direct, Jan 2026]
- P&G Cybernetic Teammate: 37% individual improvement in one-day experiment, but no sustained team practice — [academic/research]
- Legal domain explicitly designs for "structured workflows with human oversight" — resists full AI-nativeness by design

## What We Did Not Find

0. **A working framework for evaluating spec-writer quality in AI-native teams** (added cycle 74, hardened cycle 88). Shopify measures AI usage (input metric). DORA 2025 (n=5,000) explicitly confirms traditional metrics cannot separate AI-generated from human work. StrongDM and Intercom evaluate system output, not the human's contribution. **Nobody has published "here's how we evaluate whether a person is good at directing AI."** DORA's independent confirmation upgrades this from KB gap to field-wide gap. **Level 3 absence finding** after 88 cycles: this is not a market timing problem, it's a fundamentally unsolved problem. Every CTO will need this within 12 months.

1. **Non-engineering AI-native teams — first signal from F-Secure finance** (updated March 2026). One partial exception previously: Intercom's CS team (but Intercom is the vendor). NOW: **F-Secure has a finance person who has been coding with Claude for 9 months** — automating quarterly bookkeeping chores, now adding AI features via Claude Code, building an in-house tool to replace Excel spreadsheets. This is significant because: (a) finance, not engineering, (b) self-directed, not mandated, (c) 9-month trajectory shows sustained adoption not a one-off experiment, (d) "replacing Excel" = building production tooling, not prompting a chatbot, (e) the progression from automation → AI features mirrors the compound engineering pattern. Level 2 (single practitioner, direct observation). **This is the first named non-engineering person we've found building with coding agents for their own domain work at sustained pace.** The verification gap (Pattern E) may be less blocking in finance than other domains — bookkeeping has verifiable correctness (the books must balance), which is exactly the structural precondition our domain-crossing pattern predicts.

2. **Honest failure retrospectives from AI-native teams.** UPDATED: Klarna is now a documented failure case — CEO admitted "too much efficiency, not enough quality." Forrester/Orgvue data (55% of companies regret AI layoffs) provides macro confirmation. Still need: team-level post-mortems with specific "what broke" detail beyond the Klarna narrative.

3. **Team size economics with specific numbers.** "1 person = 5 people" claims widespread but poorly sourced. AMPECO doesn't report headcount changes. Every Inc is the most specific data point. Amodei predicts $1B one-person company by 2026 (70-80% odds) — prediction, not evidence. NEW: Intercom's "avoided ~100 hires" is the most concrete non-engineering data point.

4. **AI-native team practices beyond engineering and customer service.** Marketing (91% using AI) (TODO: verify critically), finance (47% deployed agents) (TODO: verify critically), legal (52% in-house adoption) (TODO: verify critically), HR (predictions of 30% headcount reduction) (TODO: verify critically) — high tool adoption, near-zero team transformation evidence. The entire practitioner literature remains about software teams. CS is the only non-engineering function with partial evidence of team-level restructuring. **NEW: F-Secure finance person (9 months with Claude, building in-house tools to replace Excel) is the first individual-level signal of non-engineering AI-nativeness from direct observation. Not team-level yet — but the trajectory (automation → AI features → in-house tooling) is the same pattern that compound engineering follows in software teams.**

## Sources

*All findings must include clickable URLs and source type labels per project research quality protocol.*
