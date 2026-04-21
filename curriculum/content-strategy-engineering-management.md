# Content Strategy — Agents 102 Engineering Management *(working name)*

Skeleton. Second training in the portfolio. Outline-level — the backbone is settled; module detail is next.

## Positioning

**Lead agentic change by building with AI.**

*"Learns while I lead. Learns even when I learn."*

The offer compressed: leadership (your actual job) × agentic (the specific wave, not AI-in-general) × building (hands-on, you go first, the demonstration IS the leadership). CTO hears "the scaling move." Engineering manager hears "I don't have to become an IC builder again — I lead by building alongside my team, on our own real work, and leave with a running system that keeps learning after the training ends."

## The correlation at the heart of the training

**Theory × people-knowledge = actionable insight.** We supply the first. Only you supply the second. Agents amplify the multiplication — they can't substitute for either variable.

- **We bring:** Kotter, ADKAR, Crossing the Chasm, PDCA, Toyota Kata, Rumelt's crux, Huryn's three blocks, Intercom's 2x playbook, Ramp's 8 moves, Block's thesis, Intent Taktik, the L0–L3 ladder, the absorption-bottleneck framing. And agents pre-built and ready to orchestrate.
- **You bring:** your people. What makes them tick. Who trusts whom. Who's carrying what resentment from the last transformation. Who'll step up when nobody's looking. Who's quietly the best teacher on your team. What your team has tried before and what it left them believing. Nobody else in the room — including us — has this, and nothing in the research KB replaces it.
- **Together:** agents figure out *with you* what's likely to work for your specific team, help you run it, and read the signal honestly afterward. Theory without people-knowledge = generic advice. People-knowledge without theory = stuck where you are. Both + agents = actionable, compounding insight.

**Dorsey's question at team scale:** *what does your team understand that is genuinely hard to understand, and is that understanding getting deeper every day?* The memory is where that understanding compounds. Agents without it are generic; agents with it actually do the job.

**M1 gets disproportionate weight.** A shallow diagnostic at M1 means shallow insight everywhere downstream. An honest M1 makes the whole rest of the training work. This is the load-bearing module.

**Training value prop in one line:** *We supply the theory and the agents. You supply the people. Together, you build agents that actually do the job.*

**Why it can't be pirated:** the most valuable input comes from the student. There's no shortcut around knowing your people — and our job is only to give you the frame and the agents that make that knowledge pay.

## The student's journey — belief-update, not subject-matter mastery

The student takes a journey. What matters at the end is not what they can *recite* — it's what they now *believe*, and how those beliefs will shape the next move they make on Monday.

Subject matter is the vehicle. Belief-update is the product.

**Beliefs the training is trying to form** (not exhaustive, not fixed):

- *Strategies emerge from action, not analysis.* (Bosser-native)
- *My knowledge of my people is my irreducible edge; agents amplify it, they don't substitute for it.*
- *Belief in a move beats picking the "right" move. Half my bets will miss. That's the curriculum.*
- *Vision is earned, not painted. Intent is declared and revised.*
- *The coalition self-selects by engagement. I don't draft it.*
- *I'm a conditions-creator, not an information-router.*
- *Learning rate is the winning metric, not throughput.*
- *The memory + swarm compounds. The plan doesn't.*

**What this means for facilitation:**

- Teacher Claude's job is **belief-formation**, not content-delivery. Ask questions that surface current beliefs; challenge them gently with the student's own data; help them articulate the updated position and commit it to the journal.
- Evaluation (the calibration question) partly means *"have your beliefs shifted in useful directions?"*, not *"can you recall the framework?"*
- Facilitator premium (in-cohort vs self-study) is about **belief-work under load** — pushing on beliefs when the student's interior flinches from updating them.
- Reading assignments serve belief-formation. Intercom's 2x memo isn't assigned to extract facts; it's assigned to shift the student's belief about what's possible at an established mid-size eng org.
- Exercises test belief under load: the student runs a move they believe in; reality pushes back; beliefs update. That's the loop.

**The Rory twist:** most management training delivers subject matter and hopes beliefs come along. Ours targets beliefs and uses subject matter as the vehicle. Nobody gets paid for knowing Kotter. They get paid for acting on what they believe.

## Audience

Engineering managers — primarily software engineering managers, with adjacent fits for data / platform / ML engineering management. 5–50 reports. The team they lead already builds software for a living; the question isn't *can they code* but *can they shift their team's practice from chatting to compounding engineering*.

**Assumption:** top management has done Bootstrap. Buyer has agent competence. Training doesn't re-teach it.

**Why narrow here first:** software engineering is the front-line domain for compounding engineering — the practices we want teams to cross to (agentic workflows, agents-building-agents) are most legible and most validated here. Engineering managers are also the population most exposed to the gap between top-management AI vision and team reality. Other functions (marketing, ops, HR, finance) are out of scope for this variant; they get their own variants later or a function-agnostic v2.

## Problem

Top management gets it. The team doesn't. Bottleneck = absorption at team scale. Some members shipped ten agents; some are still on ChatGPT weekly; some are sceptical. AI stays personal when the point was for it to become collective.

## Deliverable

The student leaves with **a running memory + swarm and the 90-day plan that lives inside it.**

The **memory** is a CLAUDE.md-anchored folder the manager has been building since M1 — Bootstrap's M2 aesthetic ported to leadership. It holds their team's diagnostic, their decisions, the criteria they're watching, the interventions they've run or rehearsed, and the rules Claude has promoted on its own. The **swarm** is the set of scheduled agents that feed the memory while the manager leads: diagnostic scans, gate-watchers, coalition check-ins, cadence agents, the maintenance agent.

The 90-day plan is a printout of the memory's current state, not a separately authored document. When the student gets back to work on Monday, they don't pick up a plan — they pick up an instrument that keeps running and keeps learning. The memory compounds from day one through day 91 and beyond.

## The Backbone — The Brain (Three Blocks + Swarm)

*"The manager's instrument."*

The memory is the folder the manager builds from M1 onward. Three structural blocks inside it (Knowledge Architecture, Decision Journal, Quality Gate) are the spine; the swarm of scheduled agents is what keeps the memory alive between sessions and beyond training. Same Bootstrap M2 aesthetic — *"It runs while I sleep"* → here as *"It learns while I lead."*

The three-blocks structure is borrowed and adapted from Paweł Huryn's *"Three Blocks That Make Claude Get Smarter Every Session"* (see `continuous-research/insights.md` → "CLAUDE.md That Learns"). Port: from personal IC use to engineering-management practice. The swarm is Bootstrap-M2-scale agent orchestration, applied to leadership work rather than to writing.

### Block 1 — Team Knowledge Architecture
*ADKAR diagnostic made continuous.*

A tiered store of what the manager knows about their team's transformation. Observations (raw, this-week) → hypotheses (seen twice, want more evidence) → rules (confirmed across multiple weeks, apply by default). Demoted when contradicted. The promotion cycle is the learning; the tier label IS the epistemic stance.

Domain folders: per-person ADKAR state, team-level practice tier (Chasm ladder), coalition status, intervention history, what worked / what didn't.

Force active retrieval: before any intervention, Claude reads what's already known. No re-debating what the system already decided.

### Block 2 — Decision Journal
*Reviewable reasoning. Every leadership decision Claude-enforced.*

Before any significant decision — first move, coalition pick, vision phrasing, exercise choice, 90-day commitment — Claude searches the journal for prior decisions in that area. Follow unless new information invalidates. If new, log context + what else was on the table + why this option won + trade-offs accepted.

Over 90 days the journal produces a **traceable chain of reasoning**. The manager can see their own frame update. Huryn's observation holds: decisions made with forced-alternatives review have disproportionately better outcomes than confident gut calls.

### Block 3 — Quality Gate
*Leadership criteria that sharpen with use.*

Project-specific testable criteria for "is this leadership move working?" Not vague aspirations. Specific checks — *"coalition member shipped agent to own team this week," "visibility exercise run without manager prompting," "first-move metric visible to >50% of team"*. Criteria evolve: catches get promoted to automatic gates; never-triggered checks get pruned; recurring misses get new gates.

Replaces the "I think it's going well" confidence trap. Anthropic's own finding ports: *agents confidently praise work they produced.* Managers do the same. The Quality Gate makes praise earn its place.

### Plus a maintenance schedule
*Claude suggests, manager decides.*

Periodic system review: prune stale rules, check hypothesis evidence, review whether trade-offs played out, flag dead criteria. Runs as the **day-91 review** (first full pass post-training — see below), then monthly.

### The calibration question (Block 3's top-level gate)

Every move the student makes — every exercise, every decision, every intervention — gets asked one question at the close:

> **Did you make progress? Did you lay ground for progress in the future?**

It's the top-level Quality Gate criterion. All the specific checks (coalition member shipped, exercise run without prompting, first-move metric visible) are instantiations. If the specific criteria pass but the answer to the calibration question is "no," the specific criteria were the wrong criteria — rewrite them.

**Why this question is load-bearing:**

- **It resolves the force-action / free-will tension.** The training forces the move; the student brings the judgment; progress is how we know it worked. A student who decides M5's scripted exercise is wrong for their team and invents a variant isn't violating the curriculum — they're exercising it. The calibration question sorts it: progress = curriculum; no progress = evasion.
- **It's calibrated, not comparative.** A manager with three eager L3s has different progress potential than one with fifteen L0 sceptics. Both can make progress. The bar is honest self-assessment, not cohort ranking.
- **It's witnessed.** In-cohort: peers call progress-or-not on each other. Self-study: Teacher Claude runs the calibration. Same question, different facilitator.
- **It pairs with Block 2.** Every journaled decision gets retrospective checks at weekly cadence (during training) and at day-91 (first full review). If the answer is "stirred, not advanced," the rule gets demoted and the hypothesis rewritten.

**Operating stance for the training:** *We give you the instrument and the moves. You bring the judgment. Progress is how we know it worked.*

### Why this backbone

- **Compounds with very little.** Three paste blocks into one file. Day 1 instrument; day 365 knowledge base. No overhead.
- **The student builds at chatting-level fluency.** Solves the M1 mechanism question: they paste. Every module extends the same file.
- **It learns while the manager leads, and learns while the manager learns.** Every frame update — reading Dorsey, changing your mind, talking to a peer CTO — lands in the journal alongside team observations. The manager is a data source, not just a user.
- **It honors both bets (see "Tension" below).** Run the Bet A playbook while building a Bet B world-model at team scale. No choosing.
- **It matches Bootstrap M2's aesthetic ported to leadership.** *"It runs while I sleep"* → *"It learns while I lead."* Same emotional contract.

## The Tension We Hold (do not collapse)

Two bets are being made by credible CEOs/CTOs in early 2026:

- **Bet A (Intercom, Ramp, and most shipped playbooks):** Run the AI transformation on the existing hierarchy. Measure the multiplier. The manager becomes a conditions-creator and platform leader. Has deployment numbers.
- **Bet B (Block, Jack Dorsey's "Hierarchy to Intelligence"):** The hierarchy itself is a legacy information-routing protocol. AI replaces it. Normalize to three roles (IC, DRI, player-coach). No permanent middle management. Has thesis + early execution; no deployment numbers yet.

**Training stance:** run Bet A well. Read Bet B. The three-blocks backbone is the bridge — Bet A practice producing a Bet B instrument at team scale. See `continuous-research/insights.md` → "The Hierarchy-vs-Playbook Tension."

## Three heroes (now machinery, not decor)

- **Kotter — the story arc.** Six modules ARE Kotter's 8 steps, compressed. M1 = urgency. M2 = urgency + short-term win setup. M3 = guiding coalition. M4 = vision + communicate. M5 = enable action + first win. M6 = sustain + institute.
- **ADKAR — the lens on people.** Lives in Block 1 (Knowledge Architecture). Where is each person on Awareness / Desire / Knowledge / Ability / Reinforcement, what do they need next, what have we tried, what worked.
- **Crossing the Chasm — the lens on practices.** Also lives in Block 1. *Chatting = late majority. Custom GPTs = early majority. Agentic workflows = early adopters. Compounding engineering = innovators / early adopters.* Match what you push to where the team is. Ramp's L0–L3 ladder is the canonical operationalization (see `observations/ramp.md`).

All three heroes feed the same instrument. Kotter is the arc Block 2's decisions are plotted against. ADKAR is a tier in Block 1. The Chasm is both a Block 1 tier and a Block 3 criterion.

## Two tracks running in parallel

The training runs two tracks simultaneously — not sequentially, not optionally. Both live in the memory.

**Track 1 — Team transformation.** The M1–M6 arc: see → believe → distill → declare → examine → name. The memory populates with your team's specifics. You run moves with conviction; half miss; you learn what works with *these* people. This is the visible track.

**Track 2 — Frontier muscle.** Parallel, running through every week: reading practitioners (Darragh Curran, Geoff Charles, Jack Dorsey, Paweł Huryn, Andrej Karpathy, Simon Willison, and others surfaced by the research KB), cohort cross-share-backs, a **frontier-scanner agent in the swarm** that surfaces relevant signal weekly, the memory's Block 1 carrying a "what the frontier just did" tier alongside "what my team just did." The training's *AI-first is not static* commitment lived as practice, not slogan.

Track 2 is why the memory doesn't decay after day 91. The frontier keeps moving; the memory keeps ingesting; the manager keeps crossing the next chasm forming upstream. *The future is already here, just not evenly distributed.* Track 2 is how you stay in the distribution.

## Pair-training — Agentic Engineering 101

The Engineering Management training has a designed pair: **Agentic Engineering 101** (strategy in `content-strategy-agentic-engineering-101.md`). Same backbone (memory + swarm), same agentic rule, same single-company-cohort assumption, same calibration question — scoped to individual software engineers climbing from L0 to L3.

The pair pincers the transformation: manager creates conditions (EM), engineers run at capacity (101). Together, the single-company cohort generates aggregate L0→L2/L3 movement as the sponsor's finding. Manager's conditions × engineers' capability = compounding velocity.

Delivery assumption (to validate): EM first or in parallel with 101. 101 runs best when manager has a memory populated and infrastructure growing. Possible sequences: (a) EM then 101 a cohort later, (b) EM and 101 in parallel cohorts, (c) combined program where manager and team run on intersecting weeks.

## Coalition as companions, not instruments

The relational qualifier that reframes the whole training. Coalition isn't a resource to extract from — they're companions whose progress matters. The calibration question applies to them too:

> *Did they make progress? Did they come with you on the ride?*

If yes, the transformation compounds. If no, you did a solo move dressed as a team move — and the memory should catch that honestly, demote the rule, and update the hypothesis. A training whose star student moved their crux but left their coalition behind has not succeeded, by our definition.

## Self-assessment — confidence as the baseline metric

Every student answers one question at three moments:

> **Rate 1–10: your confidence in leading your organization to an AI-first and agentic world.**

- **Start of M1** — baseline. Honest, private to the memory, shared with cohort in aggregate only.
- **End of M6** — immediate delta. Did confidence shift? In which direction? Why?
- **Day-91 review** — sustained delta. A spike in M6 that collapses by day 91 is a *finding*, not a success — the training created temporary confidence rather than durable muscle. We want to know.

Why a confidence rating and not a knowledge test:

- **It's a belief metric, not a recall metric.** Aligns with the training's premise — beliefs are the product, subject matter is the vehicle.
- **It's calibrated, not comparative.** Each student rates themselves against their own prior; cohort ranking is off-limits.
- **It's honest enough to be useful.** The memory is where it lives; the manager's own Decision Journal reviews it. Not a performance-eval substitute.
- **Aggregate delta is the sponsor's finding.** Single-company cohort: aggregate start → end → day-91 is a real measurement of transformation velocity. Worth as much as any training KPI the buyer currently uses.

**Target movement (indicative, to be validated with cohort data):**

- **Start avg:** ~4–5 (baseline — an engineering manager in an org that has declared AI transformation but hasn't equipped them to lead it; they feel the pressure, they don't feel the ground under their feet)
- **End avg:** ~6–7 (earned, not inflated; they have the memory + swarm running, they've run moves with conviction, they've seen what worked and what didn't at their team's specifics, they know what the real gap is now)
- **Day-91 avg:** should hold or climb — if it regresses, the training created momentum not muscle, and that's feedback we act on

Delta target is ~+2. Not a 10/10 finish. Realistic. Matches the 50%-wrong principle: we're not promising transformed certainty, we're promising earned belief-shift grounded in real reps.

## AI-first is not static

The frontier keeps moving. *The future is already here, just not evenly distributed.* Today's compounding engineering is tomorrow's baseline. A team that crosses one chasm and stops has fallen behind the next one forming upstream. Goal is a team that **keeps crossing**, not one that arrives. The memory (three blocks + swarm, Track 1 + Track 2) is what keeps crossing possible — it learns at the rate the frontier moves.

## Starting assumption for students

Chatting-level fluency. Not Bootstrap-level. Build a working system fast — like Bootstrap's early rhythm, but scoped to leadership work. Agent-making basics get sprinkled through M1–M3 as a tool, not the subject. **Evals stay out.** Depth comes from the leadership frameworks and the three-blocks practice, not from agent craft.

## Six modules (shape, not settled exercise detail)

M1–M3 = **set up.** M4–M6 = **let's lead** — student makes first moves WITH the guiding coalition during the training itself, not just designs them for later. Each module produces a rehearsed or executed leadership move plus a sharpening of the memory.

**Exercises are designed case-by-case** through iterative content-creation passes (per `.claude/skills/content-creation/SKILL.md`), not fixed in this doc. The table below is the starting shape — *what the module is for*, not *what the exercise will be verbatim*. Hard rule: **every exercise is agentic** — student orchestrates agents that do the leadership work. Chat-and-save is banned.

| # | Move | Blocks sharpened | Mood | Artifact (direction) |
|---|---|---|---|---|
| M1 | Install the memory + stand up the starting swarm. Diagnose team + per-person ADKAR. First entries populate Block 1. | All three blocks installed + Block 1 populated + first scheduled agents running | diagnostic honesty | Brain in place; intervention backlog auto-promoted; weekly diagnostic agent scheduled |
| M2 | **Search with starter questions — coalition self-selects.** Agents draft ~5–10 starter questions grounded in Block 1 + KB; student poses them through the week; response-analysis agent surfaces two shortlists simultaneously — candidate first moves AND coalition candidates (those who engaged with agency). | Block 1 (coalition tier seeded) + Block 2 (decision alternatives seeded from team voice) + Block 3 (first gates) | earned clarity after unease — *"I've searched honestly; this is the one I'll run"* | Two shortlists (move candidates + coalition candidates) + first-move picked + journaled decision + gate-watcher agent scheduled |
| M3 | **Return + cross-pollinate + distill 2 crux + share.** Student returns with M2 data; synthesis agent reads own-team data + KB patterns + cohort cross-shared data (single-company cohort, frictionless). **Crux-finder agent** (invokes Bootstrap `crux` skill; cite Rumelt) distills to exactly 2 crux for this team with forced alternatives. Cohort share-back. Coalition formalizes around the 2 crux. | Block 1 (crux as top-tier rules) + Block 2 (crux-selection as major decision) + Block 3 (outside-view criteria) | co-creation through cross-pollination | 2 crux (terse, quotable) + named coalition + cohort share done + weekly check-in agent scheduled |
| M4 | **Intent (toward action).** Not a painted vision — an intent-based direction bound by the 2 crux. *"We're betting that moving these crux toward direction X will reshape the team's week. We don't know the full shape yet; we'll learn by running it."* Multi-agent deliberation across Bet-A / Bet-B / hybrid postures, constrained by the crux. Reaction-rehearsal agents role-play team archetypes. Vision is what the student *earns* over 90+ days — not what they write in week 4. | Block 2 (intent as crux-bound decision) + Block 3 (communication criteria) | let's lead — clarity of aim | `intent.md` (coalition-owned, crux-constrained) + first communication move rehearsed or done |
| M5 | **PDCA honest reckoning — so what really happened as we tried to do as intended? Why?** Retrospective agent reads Block 2 decisions + Block 3 gate outcomes + Block 1 observations; root-cause agent (5 Whys) interrogates each deviation from intent; promotion/demotion agent sweeps Block 1. Student interrogates *with* the agents. Deming + Toyota Kata lineage. The 50%-wrong principle becomes visible here. | Block 1 (promotions/demotions) + Block 2 (decisions' retrospectives) + Block 3 (gates' performance) — all three reviewed | reflective honesty — *"some worked, some didn't, and naming it is the move"* | PDCA retrospective + all three blocks updated + surfaced learnings that shape M6 |
| M6 | **Name the true shape of the challenge ahead.** After M1–M5, NOW the student can honestly name what the challenge actually is — usually different from the one they named at M1. Strategy earned, not assumed. Shape-finder agent reads 6 weeks of memory + PDCA + cohort share-backs, proposes candidate shape with evidence; alternative-shapes agent offers 2–3 contrasting framings; student picks, commits to Block 2 as top-level strategic decision. 90-day-plan agent synthesizes true shape + revised intent + Block 3 criteria. Day-91 agent scheduled. Full swarm handoff. Cohort share generates convergent company-wide signal back to sponsor. | Block 2 (true shape as earned strategy) + swarm committed to autonomous run | clear-eyed commitment — earned, not tidy | Named true shape + 90-day plan as printout + day-91 agent scheduled + swarm running autonomously + cohort finding back to sponsor |

The agentic rule: **by M3 onward, the student should be able to close their laptop for a day and find the agents still working.** Diagnostic scans, check-ins, gate-watchers, cadence agents — all running. If every artifact requires the student typing, the exercise failed the rule.

## Mood arc

**diagnostic honesty → earned clarity after unease → co-creation through cross-pollination → let's lead (clarity of aim) → reflective honesty (PDCA) → clear-eyed commitment (earned, not tidy)**

Flatter volatility than Bootstrap. Leadership work, not personal discovery. The drama is in the team's reaction, not the student's interior. The memory (three blocks + swarm) is what lets the manager hold the drama without freezing — accumulated context, not real-time heroics.

**Arc shape (one-line):** See → Believe → Distill → Declare → Examine → Name. From seeing the team to naming the real challenge — earned across six modules of action and review.

## What works — grounded moves (companion reference)

Full synthesis lives in `curriculum/research-grounded-moves-engineering-management.md` — structured as This week / This month / This quarter / This year, with citations to the KB. Keep it in sync with `observations/`, `findings/by-pattern/`, `insights.md` as the research evolves.

Each of the six modules draws moves from this file. M2's first-move exercise picks from This week + This month. M3's coalition work picks from This week #4 (influencers) + This month #6 (skills marketplace). M5's exercise picks from This month #7 (tiered verification) + This quarter #11 (conditions-creator role). M6's 90-day plan commits to a subset of This quarter + This year.

## Three things NOT to do — surface as M1 warnings

The research names three common manager moves that backfire. These land in M1's diagnostic session, not M4's vision — the student needs to avoid them *before* they pick a first move.

1. **Don't select a horizontal platform before running competence-first.** Intercom spent 9 months on this and still isn't done. Competence creates pull; platform selection without competence is choosing between vendor narratives. [source: `research-grounded-moves-engineering-management.md` → Don'ts #1]
2. **Don't mandate tool usage or put AI in performance reviews.** Amazon Kiro: mandates → protest → tool deleted production (6.3M lost orders). Microsoft/HBR: mandates have ZERO direct effect; peer influence is +8.9pp. Mandates without competence create compliance, not capability. [source: Don'ts #2]
3. **Don't treat full autonomy as the target state.** 15 independent failure signals (Klarna, McDonald's, Zillow, Air Canada). Compound reliability math: 85% per step × 10 steps = 20% end-to-end. Hybrid from day one. [source: Don'ts #3]

## Two things the research honestly doesn't know yet

These land in M4 (vision) and M6 (90-day plan) as honesty moments — refuse to pretend there's an answer where there isn't.

1. **How this transfers to non-velocity-biased organizations** (Nordic manufacturing/retail/logistics). The playbook evidence comes from velocity cultures. Material gap.
2. **What competence-first looks like 18 months post-chasm.** Research is pre-chasm. We don't know if the sequence shifts once competence is widespread.

## Anchor cases (research-grounded)

- **Intercom R&D 2x memo (Darragh Curran, CTO).** Deep case, practitioner-direct, 2026-04-16. 3x in 16 months. Dedicated platform team (team-2x), plugin marketplace (267 skills, 153 contributors, 31% of R&D), auto-approval system, top-5%-vs-median distribution made visible. Source: `observations/intercom.md` Side A.
- **Ramp whole-company playbook (Geoff Charles, CPO).** Deep case, practitioner-direct, 2026-04-09. 6,300% YoY AI usage. Glass (internal Cowork on Claude Agent SDK, built by 4 in <3 months). Dojo skills marketplace. L0–L3 ladder. 8 cultural moves named. Source: `observations/ramp.md`.
- **Intercom + Ramp = Level 3 convergence** on the "how to run the agentic transformation playbook on an existing engineering org" pattern. Published within a week of each other; matching playbook shape. Source: `insights.md` → "Mid-Size Established Companies Can 2×–3× in 9–16 Months."
- **Block thesis (Jack Dorsey, CEO).** Signal-level thesis, practitioner-direct, 2026-03-31. Three-roles model, world-model architecture, historical arc from Roman Army to now. Use as pressure-test for vision (M4) and reflection (M6), not as evidence of what works. Source: `observations/block.md`.
- **Supporting research patterns:** `absorption-bottleneck` (M1 + M6), `conditions-creator` (M3–M5), `rules-verification-scarcity` (L4 meta — M5 backbone), `coding-agent-as-general-platform` (M3 + M6), `experience-first-adoption` (M1 + M3).
- **Intent Taktik insight** (`insights.md`) — leaders freed from the 80% that isn't leadership. Three-blocks practice operationalizes this for engineering managers at team scale.
- **Moltke's Agent Army article** (`strategy/drafts/moltkes-agent-army.md`) — shares the spine; cite as philosophical companion.

## Hard exclusions

- Personal agent craft (that's Bootstrap)
- Enterprise AI governance (that's a CIO conversation)
- Vendor/platform comparison
- How to "sell AI" to the team (wrong frame)
- Evals as a taught module (out of scope for this training; the Quality Gate block gets the student 80% of the value without the machinery)

## Preferences for next sessions (captured for continuity)

**Settled (don't re-open unless explicitly asked):**
- Three heroes: Kotter (arc), ADKAR (people lens), Crossing the Chasm (practice lens).
- Positioning line: *"Lead agentic change by building with AI."* Catchphrase: *"Learns while I lead. Learns even when I learn."*
- Six modules. M1–M3 set up; M4–M6 are let's lead.
- AI-first is not static.
- Chatting-level fluency assumed. Agent basics sprinkled M1–M3 only where needed. No evals.
- Build a working system fast (Bootstrap rhythm, scoped to leadership work).
- Visioning in M4 (Kotter step 3).
- **Three-blocks backbone (Knowledge Architecture / Decision Journal / Quality Gate + maintenance schedule).** The training's spine. Every module sharpens the same `team-leadership.md`.
- Deliverable reframed: **running system + plan as printout of system state**, not plan-as-document.
- Intercom + Ramp as anchor case pair (like F-Secure anchors Bootstrap). Block as pressure-test.
- Hold Bet A / Bet B tension in M4 vision module; do not collapse.

**Settled with customer:**
- **Format is either 2 days (intensive) or 6 modules over 6 weeks (distributed).** Customer-negotiated. The 6-week format lets real team reactions feed the memory between sessions — stronger fit for the backbone, but 2-day intensive is viable if the customer needs speed.
- **Cohort is always single-company.** Cross-pollination between students' memorys (especially in M3) is frictionless — no anonymization, no opt-in friction. Agents can read across the cohort's memorys within the ground rules the company sets.
- **The "agentic" rule:** every exercise has the student orchestrating agents that do the work. Chat-and-save is banned. Taste from Bootstrap M2 (memory), M5 (bake-off), M6 (orchestrator + eval loop), M8 (deliberation).
- **The memory is built from M1** — the learn-and-compound pattern starts day one, not module three.
- **M2 = search, not pick.** Starter questions to the team; coalition self-selects by engagement. No abstract coalition-guessing.
- **M3 = return + cross-pollinate + 2 crux.** Rumelt's crux skill imported from Bootstrap M8 scaffold. Two crux, not a backlog. Intent in M4 is crux-bound.
- **M4 = Intent, not Vision.** Kotter step 3 reframed for 2026's epistemic reality: leaders *declare intent and let vision emerge over time.* Vision is earned across 90+ days of action and retrospection, not painted in week 4. Moltke lineage; matches Intent Taktik insight.
- **Belief > correctness. 50% wrong is the curriculum.** Any action will do as long as the student believes in it enough to run with conviction. Expect half to miss. Progress = learning rate, not pick-rightness. Teacher Claude helps the student *run clean and read honest* — not second-guess the pick. Ancestry: Bosser's "best strategies emerge from action, not analysis."
- **M5 = PDCA honest reckoning.** Deming + Toyota Kata. Not "run another exercise" — examine what happened against what was intended, and why. The 50%-wrong principle becomes visible; the learning is the output.
- **M6 = name the true shape of the challenge ahead.** Strategy earned from 6 weeks of action and review. Often different from the challenge named at M1. Only at M6 does the student commit the 90-day plan — grounded in the real challenge, not the week-1 guess. Cohort share generates a convergent company-wide signal back to the sponsor.
- **Arc shape:** See → Believe → Distill → Declare → Examine → Name.
- **Two tracks running in parallel:** Track 1 = team transformation (M1–M6 visible arc); Track 2 = frontier muscle (practitioners, cohort share, frontier-scanner agent, memory's frontier tier). Track 2 is why the memory doesn't decay after day 91.
- **Coalition as companions, not instruments.** The relational qualifier. Calibration question applies to them too: *did they come with you on the ride?*
- **Self-assessment metric:** 1–10 confidence rating ("Rate your confidence in leading your organization to an AI-first and agentic world") at start of M1, end of M6, day-91. Target delta ~+2 (baseline 4–5, end 6–7). Aggregate across single-company cohort = sponsor's finding.
- **Training in six beats (plain-language):** take a shot at it → learn what people really feel → what's the real gap → build your muscle to see the future to come → take along the coalition on the ride → did you make progress?
- **The calibration question** — *did you make progress? did you lay ground for progress in the future?* — is Block 3's top-level gate and every module's closing exercise.

**Open, awaiting decision:**
- Training name.
- Session runtime per module in 6-week format (Bootstrap canonical is 1h45; may want to test shorter sessions + more between-session work since the real work IS between sessions).
- 2-day format runtime shape (intensive sessions + homework? one day of install + one day of review?).
- Bootstrap as hard prerequisite vs. assumed-but-not-enforced.
- Scaffolds: Day-1 paste blocks (Huryn's originals, adapted for manager use) shipped as the M1 scaffold zip. Customer-tailored block content is separate advisory.

**TODOs sharper than the skeleton:**
- **M1 install mechanics.** Three blocks pasted, populated by a guided diagnostic. Specify the exact prompts Claude runs to elicit first-pass ADKAR per person and first-pass Chasm tier per team. Lowest-risk now that the mechanism is settled; design sprint next.
- **M4 vision exercise.** Kotter step 3. How does the coalition co-draft a vision in the room, in 45–60 min, that holds up against a team? Hold Bet A / Bet B tension honestly.
- **"Let's lead" first-moves — what can realistically be DONE during training.** The coalition is not physically present for most of the training. Which moves can be rehearsed with partners in the room? Which require the student to break out mid-module and call/message a coalition member? Format decision is entangled with this.
- **Block-sharpening exercises per module.** Each of M2–M6 must have a named 5–10 min exercise that moves material into the right block. Design these as a set, not one at a time.

**Bootstrap reuse candidates:**
- Context is King (M1 Bootstrap lecture) → M3 co-build framing.
- Compounding (M2 Bootstrap lecture) → M6 compounding-signals framing.
- When to split an agent (M3 Bootstrap lecture) → M3 extension.
- **Bootstrap M2 learning-CLAUDE.md scaffold** (once built) → direct ancestor of this training's three-blocks scaffold. Worth co-designing.
