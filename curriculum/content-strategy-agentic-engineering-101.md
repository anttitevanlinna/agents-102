# Content Strategy — Agentic Engineering 101

Third training in the portfolio. Skeleton → storyline. Updated 2026-04-21.

Paired with Engineering Management; the two pincer the transformation (manager creates conditions, engineers run at capacity).

## Positioning

**You become the Claude wizard.**

The engineer who walks in is already shipping real work with Claude Code. They've earned tricks nobody taught them. The training's job isn't to correct them — it's to take competence to mastery, the kind of mastery colleagues call magic. Wizards have tricks, wizards share tricks, wizards never stop finding new ones. The status marker, the practice posture, and the curriculum's promise compress into one word.

**What changes at Day 1:** the instructor opens with a wizard-level move on the student's own codebase — a demonstration of what's *possible*, not an exposure of what's missing — then invites the student to show the trick they brought. Cohort harvests each other's self-taught moves alongside the curriculum's. Gift first, then climb.

*Rory version: every competitor sells "learn Claude Code." We sell "become the Claude wizard." Engineers don't buy remediation; they buy status. Rename the thing you're selling and you change who shows up.*

**Never sold as a gap-fix.** The self-taught engineer often IS using Claude Code in clever ways nobody taught them. The training harvests those tricks, it doesn't dismiss them. Engineers have pride, and they are frequently also right. The positioning respects both.

## Buyer — the builder CTO

Technical. Directionally right. Reads Simon Willison on weekends. Already uses Claude Code daily and is frustrated his team isn't. His own velocity is 3× his best engineer's and he can't scale himself.

**Why he buys:**
- Wants more wizards on the team — engineers colleagues go to when stuck, engineers who ship at his velocity
- Wants them to still own what they build — not hand the codebase to a tool that'll lock them in
- Wants someone on his team running experiments at the frontier other than him (currently a single point of failure + retention risk)
- Wizards stay — the engineers who develop rare practice stay longer than the ones who develop commodity skills
- Budget exists; sales cycle is short because the destination isn't in dispute

**What he won't buy:**
- "Why agents" setup — skip it; he knows
- Vendor comparison slides
- Certification theatre
- Anything that smells like a consultant retelling what he already read on X

Different buyer from Bootstrap (SVP HR / CEO / SVP Strategy) and Engineering Management (VP Eng / Director of Engineering who may not code anymore). Sales motion differs accordingly.

## Audience — the self-taught mid-layer

Software engineers, individual contributors, 1–8 years. Adjacent fits: platform / data / ML engineers in the same world.

**Baseline (assume):**
- Chatted with LLMs for years
- Copilot in IDE for 12–18 months — accepts completions
- Has opened Claude Code at least once; maybe uses it weekly
- Terminal-comfortable
- "Agents write code" is obvious

**Territory not yet explored (not deficits):**
- Plan mode as a real instrument — most engineers use it lightly; few have developed a feel for when to lean on it
- CLAUDE.md as a living contract — usually written once, rarely grown
- Memory, skills, MCP, subagents, orchestration — words in the air, systems not yet built
- Scheduled agents — unfamiliar primitive
- Evals as infrastructure — a different thing than unit tests, and worth the distinction

**Self-taught means uneven practice, not uneven ability.** Two engineers on the same team have wildly different repertoires. Some carry Discord-level tricks nobody else knows; others have their own clever hacks earned by trial. The training's job is to pool the tricks, level the floor, and raise the ceiling — without ever signalling that anyone's current practice is wrong. It isn't wrong. It's partial. So is ours. So is everyone's in a field that updates monthly.

**Why narrow to software engineers:** the L3 path is most legible and most validated here. Intercom and Ramp published evidence from software-engineering teams specifically. Coding agents are the meta-platform; software ICs are the population already touching the substrate. Start where the ladder is cleanest; adjacent variants later.

## The correlation at the heart of the training

**Theory × codebase-knowledge = durable leverage.** We supply the theory and the agents. The engineer supplies the codebase knowledge — *"here's what my system is really like, what's brittle, what pattern nobody's documented, what convention this team actually follows."* Agents amplify the multiplication.

Generic Claude Code usage without codebase knowledge = generic output that gets reviewed harshly. Codebase knowledge without structured agent practice = expertise that doesn't compound. Both + agents = L3 velocity.

Dorsey's question at IC scale: *what does your understanding of this codebase gain every day?* The memory is where it compounds.

## The rule that governs everything

**The learning and good process happen as side-product of making good stuff. Only that scales.**

Good stuff is great for customers. Good stuff is nice to make. That's what motivates the engineer — customer value plus intrinsic satisfaction with the work. A training that asks engineers to add "improvement practice" on top of real work will fail: the practice gets dropped when the sprint is on fire, and the habit never forms.

**Compounding is the side-product of smart process.** Chase compounding directly and you get improvement theatre. Frame every session around making good stuff smartly and compounding emerges without being chased. *"If you just try to make a sprint to improve, you will not make this into habit."*

**This is habit for you AND your agents.** The engineer's practice compounds. The agents' memory compounds. Both emerge from doing the work well, not from dedicated practice slots.

**What this means for every module:**
- **M1's trivial bug fix is the vehicle.** The retro emerges because the student wants the next fix to go better, not because the schedule says *"now reflect."*
- **M2's memory grows** because the engineer wants their agent to handle the next non-trivial task, not because *"populate memory structures"* is on the lesson plan.
- **M3/M4's long-running send-off and return is real work the student had to do anyway.** The learning is what happens in the middle, naturally. The gap between modules isn't a pedagogical trick — it's the time the work takes.
- **M5's agents-meet-agents produces a real technical decision the CTO asked for.** The live-deliberation experience is side-product of producing the decision document.
- **M6's plain discussion is grounded in having made good stuff** across the prior modules. The open question isn't a contrived prompt; it's what's actually on the student's mind after two days of real work.

**Rory:** every competitor frames training as *"practice the practice."* We frame it as *"make good stuff, and the practice follows."* Engineers already know how to pretend to do improvement theatre — performance review season teaches that. What they rarely learn is how to let the habit form naturally out of good work. That's what this training teaches, and why it scales where improvement-sprint framings don't.

## Load-bearing assumptions

The training rests on three bets. If any turns out wrong, the training's shape would need a rethink, not a polish pass.

**1. Compounding and personal habit are the durable unit.** The lasting capability an engineer leaves with isn't tool knowledge or model-version fluency — it's a daily practice that compounds. Memory maintenance, session retros, plan-mode discipline, the Klaassen loop. Tool versions decay in months; the practice holds.
*What would falsify it:* day-91 self-assessment shows students falling off the practice within weeks, confidence dropping back to pre-training levels. Or: practitioners with strong habits but older tool stacks outperform practitioners with newest tools but no habit — we'd expect the opposite.
*Current evidence:* practitioner convergence on the pattern (Klaassen, Huryn, Ronacher, Cherny); no independent longitudinal data yet. Medium-high confidence as a design bet.

**2. Agents can self-learn.** With the right scaffolding — file-based memory, session retros, three-block structure — Claude genuinely gets better at serving *this* student on *this* codebase over time. The Compound step in Klaassen's loop works: what the agent writes in session N is read and applied in session N+1.
*What would falsify it:* sessions stay effectively fresh despite populated memory; students experience no qualitative change in agent behaviour over weeks of use; the memory becomes a write-only log.
*Current evidence:* strong single-practitioner reports (Huryn's three-block practice, Cherny's file-based RAG). Counter-note: session freshness is real (Willison + Józefiak) — no cross-session *model* memory, only cross-session *file* memory. Compounding works if the file-based practice holds; the bet is that the files reliably do the work the model doesn't.

**3. Everything is scaling of learning.** M1 through M6 isn't six different skills stacked — it's the same compounding loop applied at successively larger scopes. *Loop on a trivial bug (M1) → loop on memory scope (M2) → loop on mid-long task (M3/M4) → loop at room scale, agents learning from each other (M5) → loop on the open question itself, humans learning from the question (M6).* Unity of mechanism beneath variety of surface.
*What would falsify it:* students experience the modules as disconnected — each feels like a different training, nothing carries through. Practitioners reject the framing when tested, saying *"my multi-hour work doesn't feel like my bug fix at scale."*
*Current evidence:* design thesis more than empirical finding. The deepest of the three bets; the hardest to verify externally. Tested primarily by whether the M1 → M6 arc lands as one coherent practice in delivery.

**Why naming these matters.** A training that hides its assumptions makes design decisions on inherited authority. Surfaced, each module becomes testable — *is this module exercising the assumption or merely assuming it?* If M3's long-running exercise doesn't actually produce the compounding feeling of M1 at larger scale, assumption 3 is off for that module and we reshape. The assumptions are the spine; the modules are bones hanging off them.

## Curation principle — we don't invent, we curate the best

**The training doesn't manufacture its own wisdom.** It brings in specific skills and actionable insights from the best practitioners — Klaassen's compound engineering, Paweł Huryn's three-block memory, Ronacher's long-running patterns, Willison's daily-practice notes, Cherny's file-based practice — and slots each one into the module where it handles a student's actual issue or blocker.

**Skill, not theory.** We import what's *doable on Tuesday*, not what sounds good in a deck. Klaassen's four-step loop lands in M1 because it resolves the "I don't know where to compound starts" blocker on day one. Huryn's three blocks land in M1 because they solve "my CLAUDE.md is six lines and I never look at it." Ronacher's plan.md pattern lands in M3 because it's what keeps a multi-hour agent from drifting. The test for import: can the student apply it in the session, on their own work, without more lectures?

**Student-blocker-specific deployment.** Skills and insights don't arrive as generic catalogs. They arrive when the student hits the blocker the skill resolves. We build around blockers, not around concepts.

**The research system is the content pipeline.** Per the repo's own standing goal (*Curate → Connect → Advise*), the continuous-research system is what surfaces which practitioners to import and keeps the list current as the frontier moves. When Opus 4.8 changes the long-running picture in six months, M3's anchor skill gets re-sourced from whichever practitioner handles the new blocker best. Module content is mutable; the curation posture is the durable part.

**Rory:** every other training is a curriculum author writing their own wisdom. Ours is a curation layer over practitioners who've already figured it out. Students trust practitioners more than curriculum authors. We make that trust the pedagogy.

## Facilitation model — the Agentic Nerd, in both modes

**Each student has an *Agentic Nerd* running alongside them throughout the training — classroom mode as well as self-study.** The nerd is the all-knowing companion you can ask anything, not a teacher. The student is the wizard; the nerd is the resource. Different authority gradient than "Teacher Claude" in earlier drafts — the student leads, the nerd supports.

**What the Agentic Nerd does:** answers anything in-session (you can ask without pausing the work), surfaces the right practitioner skill at the moment of the blocker (Klaassen's loop, Ronacher's plan.md, Huryn's three blocks — whichever fits *this* student's *this* blocker), catches rubber-stamping ("find me one row the judge got wrong"), runs the per-student Debrief. It's the delivery mechanism for the curation principle above.

**Why the two-layer room is the whole point.** A human facilitator with 10 students naturally runs at 1:10 — one conversation at a time, rubber-stamps go uncaught, Debriefs stay generic. With an Agentic Nerd per student, the room becomes 10 parallel 1:1 sessions with a human layer above handling the beats only humans can do: wizard-level demos on a volunteer's codebase, cross-room show-and-tells, sponsor moments, escalations the nerd flagged. The human moves up to orchestration and room-level coaching; the nerd handles the individual ask.

**Content-design implication.** Each module ships with its Agentic Nerd logic — which skills to surface for which blockers, which push-back moves to run on rubber-stamps, the module-specific Debrief prompt. The nerd logic is part of the module artifact, not a delivery afterthought.

**Skill architecture — two skills, different jobs:**

| Skill | Job | Where it runs |
|---|---|---|
| `self-study` (exists, `.claude/skills/self-study/SKILL.md`) | Mode-specific facilitation: manages 4 Cs cadence, progress.md, folder switches at pedagogical seams, deliverss cohort-only beats when there's no room | Self-study mode only |
| `agentic-nerd` (to create — see prep notes in Open Questions) | Resource role: answer anything, surface the right practitioner skill at the blocker, catch rubber-stamping, run the per-student Debrief | **Both** self-study and classroom modes |

Current Bootstrap "Teacher Claude" conflates these two jobs. The split clarifies: `self-study` owns the mode-delivery scaffolding; `agentic-nerd` owns the student-facing nerd role and runs in both modes.

**Open for Pass 1 to decide:**
- Does classroom-mode Agentic Nerd share state across students (dashboard for the human trainer) or stay fully private per student?
- When the nerd and the human trainer say different things about the same moment, whose read wins?
- Runtime requirement per student: licensed Claude Code + Agentic Nerd session open. Sales/cost implication per cohort.
- **Bootstrap rename sweep** — Bootstrap materials + `self-study/SKILL.md` + `content-creation/SKILL.md` all reference "Teacher Claude." Decide whether Bootstrap migrates to the Nerd terminology (consistency across portfolio) or keeps "Teacher Claude" (Bootstrap audience is non-technical builder leaders, where "teacher" may read better than "nerd"). Defer until the `agentic-nerd` skill is written.

### Prep notes — the `agentic-nerd` skill (not yet created)

Captured here so the scope is visible while the strategy grows. **No skill file shipped until Antti says go.**

**Target path** (when created): `.claude/skills/agentic-nerd/SKILL.md`

**One-line purpose:** *"The all-knowing companion that runs alongside every student throughout the training — answers anything, surfaces the right practitioner skill at the moment of the blocker, catches rubber-stamps, runs the per-student Debrief."*

**When it fires:**
- Student opens a session at the start of a module (nerd greets with module context, surfaces the relevant practitioner skill at the pedagogically right moment — not up front)
- Student asks a question (of any kind — codebase, tool, concept, "what should I do next")
- Student completes an exercise artifact (nerd checks for rubber-stamps, pushes back, offers "find me one row the judge got wrong"-style moves)
- Module ends (nerd runs the Debrief — reviews the session, rewrites the rules file in place, reports in 3–5 lines what changed, student pushes back)

**Core behaviours:**
1. **Answer anything** — ask-don't-type mode. No narrow facilitator script; the nerd is genuinely consultable.
2. **Skill surfacing at the blocker** — when the student hits the specific blocker that a curated practitioner skill resolves, the nerd surfaces it at that moment with a short primer and a link to the source practitioner. Not a catalog dumped up front.
3. **Rubber-stamp catches** — when the student accepts an artifact too fast, the nerd offers push-back moves from the content-creation SKILL.md "Known Claude-behavior patterns" list (default-acceptance-on-offered-defaults, plan-mode approval inflation, self-audit charity, etc.).
4. **Per-student Debrief** — canonical M2+ shape: review session → rewrite rules file in place → report in 3–5 lines. Module-specific Debrief prompt arrives with the module.
5. **Mode-aware** — knows whether it's running in self-study (the `self-study` skill is orchestrating) or classroom (human facilitator is in the room) and adjusts (e.g., don't deliver cohort-only beats in classroom; do deliver them in self-study).

**What it does NOT do:**
- Teach (it's not a teacher — the curriculum teaches)
- Act as narrow 4 Cs facilitator (that's `self-study` skill's job in self-study mode; in classroom, the human handles 4 Cs)
- Decide curriculum content (content is authored; the nerd delivers it)

**Relationship to existing skills:**
- `self-study` skill (exists): orchestrates mode-specific delivery — 4 Cs cadence, progress.md, folder switches, cohort-only beats. In self-study mode, `self-study` calls/delegates to `agentic-nerd` for the nerd role. In classroom, `agentic-nerd` runs standalone alongside the human facilitator.
- `content-creation` skill (exists): defines module/exercise/lecture design rules, including Teacher Claude simulation patterns. Those patterns transfer to Agentic Nerd — rename in a later sweep.

**Per-module logic that will live in the skill (or beside it):**
Each module ships with a block that the Agentic Nerd reads — the practitioner skills to surface for this module's expected blockers, the push-back moves for this module's likely rubber-stamps, the Debrief prompt template. Structure TBD. Candidates: module-embedded YAML block, a separate `module-N/nerd.md` per module, or a single curated registry the nerd consults by module slug. Pick during Pass 1.

**Content that will feed the skill's skill-surfacing logic:**
- Klaassen's compound-engineering four-step loop → M1, surfaced at the "I fixed the bug, now what?" blocker
- Huryn's three blocks → M1 at the "my CLAUDE.md is six lines" blocker
- Ronacher's plan.md pattern → M3 at the "my agent is drifting after 90 minutes" blocker
- Cherny's file-based practice → M2 at the "my memory is all in scrollback" blocker
- Full list grows as the continuous-research system surfaces new practitioner skills worth curating

**Not yet decided** (Antti's calls to make before the skill gets written):
- Is the nerd a single skill, or a thin shell that dispatches to per-module sub-skills?
- Does it maintain any persistent state between sessions (beyond what the student's own memory files hold) — e.g., nerd-side notes on "this student rubber-stamps a lot, push harder"?
- Is the nerd uniform across cohorts, or does it tune voice per customer (sharper for technical cohorts, gentler for transitioning ones)?

## Four learning areas — two axes (how × technical)

Not a flat list. Two dimensions, two areas on each.

|  | **How (practice)** | **Technical (capability)** |
|---|---|---|
|  | **1. Compounding engineering** — personal flywheel. Memory grows with the codebase; skills accumulate; agents run while you sleep. The daily practice that stays current as the frontier moves. | **2. Long-running tasks** — Opus 4.7's sustained-execution capability made real. Hand the agent a multi-hour job, close the laptop, come back to a finished PR. The specific capability behind the L1→L2 leap. |
|  | **4. Team integration** — the engineer's work reaches colleagues. Factory components ship. Agents meet agents on real problems. The practice that turns personal leverage into team velocity. | **3. Software factory pattern** — the team industrialises production. Evals as quality-control infrastructure. Shared skills, orchestrators, MCP servers, meta-agents. The Intercom/Ramp endpoint. |

**Why two axes, not four line items.** Every module advances several dimensions at once — one-area-per-module would teach demos, not capability. You can't wield long-running tasks without the compounding practice to feed them context. You can't ship factory components without the team-integration practice to make them land. The training binds the axes so engineers leave with capabilities they can actually hold, not tricks they can't reproduce.

**The Rory:** every competitor sells one axis. Anthropic docs teach capabilities — pure technical, no practice. Leadership books teach engineering practice — pure how, no technical. We bind them, because engineers who get either alone stall. Wizards need both the spell AND the discipline to know when to cast it.

All four areas survive the next model release, the next tool, the next pivot. Syntax decays; compounding practice + long-running fluency + factory infrastructure + team integration don't.

## Beliefs the training forms

- *Wizards have tricks. I carry mine, and I pool with others who carry theirs.*
- *My memory is my edge — not my keystrokes.*
- *Mastery isn't knowledge; it's structural practice that stays current as the frontier moves.*
- *Quality is infrastructure, not craft heroics.*
- *Half my agentic bets will miss. That's the curriculum.*
- *The factory is a direction, not a destination.*
- *My agent is strongest when it meets other people's agents on a real problem.*

## The backbone — memory (three blocks + swarm), IC-scope

Same Bootstrap / Engineering Management backbone, ported to IC scale.

**At IC scale:**

- **Block 1 — Codebase Knowledge Architecture.** Tiered store of what the engineer knows about THIS codebase. Observations (raw — "the queue handler retries silently on deploy") → hypotheses ("deploy coincides with retry storms; worth measuring") → rules ("the queue handler requires a drain step before deploys"). Promoted when confirmed, demoted when contradicted. Domain folders: subsystems, failure modes, team conventions, personal patterns.
- **Block 2 — Decision Journal.** Every meaningful technical decision logged with forced alternatives. Architecture picks, library choices, pattern selections, refactor scope. Claude searches prior decisions before proposing new ones — no re-debating settled choices.
- **Block 3 — Quality Gate.** Project-specific testable criteria for code the engineer ships. Evolves weekly: catches promote to automatic gates, never-triggered checks get pruned. Sharpens around actual failure modes, not theoretical ones.
- **Swarm.** Diagnostic agent (reads codebase, surfaces patterns); gate-watcher (monitors PR quality); skills-builder (packages workflows as reusable skills for the team); orchestrator (drives multi-agent tasks). All scheduled, all compounding.

## Six modules — the arc

Shape, not settled detail. Exercises designed case-by-case. Agentic throughout; chat-and-save banned.

| # | Title | Lead dimension | Mood | Artifact |
|---|---|---|---|---|
| M1 | **Ship with agents** | Compounding (how) | Joyful creation — *"it works, on my repo"* | Trivial bug from the student's own backlog shipped via Plan → Work → Review → Compound + first pass at Paweł Huryn's three-block memory + rules file seeded by session retro |
| M2 | **Build your memory for your codebase** | Compounding (how) deepens | Satisfied compounding — *"it reads my system now"* | Single-repo memory → multi-repo memory → memory connected to business rules and company info; agents wired to each layer; compounding loop carried from M1 |
| M3 | **Long-running tasks — send-off** *(working title)* | Long-running (technical) — setup + launch | Unleashed leverage — *"I just sent an agent off with real work"* | Concept taught + challenge named + verifier built on student's real work + verifier checked lightly on a small example + mid-long task launched, running between M3 and M4 |
| M4 | **Long-running tasks — return** *(working title)* | Long-running (technical) — retrospective + next-run prep | Grounded rescue — *"the return isn't a grind, it's a system"* | Return to the scene: diff read, drift named, failures caught + learnings integrated into memory + verifier sharpened for next run + one judge promoted to reusable artifact for M5 |
| M5 | **When agents meet agents** | Team integration (how) peak; every dimension plugs in | Awe + ownership — *"the team's agents just decided it together"* | A technical decision document produced BY the room's agents on the CTO's real open question, grounded in every participant's codebase knowledge, with ranked assumptions and named experiments |
| M6 | **Where is this all going?** *(working title)* | Outside the four areas — the human close | *"Where is this all going?"* — the question itself is what the student carries home, not the answer | Each student speaks from opinion, fear, and hope. Room discussion follows. Trainer closes with a lecture on where this is going, including what they don't know. No artifact beyond what each student carries out — not all answers to team work happen in training |

**Agentic walk-away test:** by M3 onward, the student closes the laptop and finds the agents still working. If every artifact requires typing, the exercise failed the rule.

**Real-work requirement (universal across modules):** examples, cases, bugs, PRs, and references come from the student's own company and codebase. Not toy data. Not case studies of other firms dressed up as exercises. The training lands only when the artifacts are the student's.

## Mood arc

**joyful creation → satisfied compounding → unleashed leverage → grounded rescue → awe + ownership → *"where is this all going?"***

Closer to Bootstrap's arc than Engineering Management's. This is personal discovery — the engineer experiencing their own capability multiplication (M1–M2), then the send-off and return on mid-long work (M3–M4), then the room's collective agency (M5), then an plain human close (M6). Leadership drama is absent here; the drama is in the engineer's own interior (am I still keeping up?) and the team's infrastructure (is our floor rising?), met at peer scale in M5 and left deliberately open at M6. The training refuses to close the big question — *where is this all going?* — because plainly nobody knows. The question itself is what the student carries home.

## M1 in detail — fix a trivial bug, prime repo-level compounding

**The exercise has two jobs at once.** Headline job: fix a trivial bug the student picks from their own backlog — small enough to ship in-session, visible enough to feel like a win. Below the headline, the exercise installs the **compounding substrate** that M2–M6 will ride on.

**Paweł Huryn's three-block memory gets its first entries during the bug fix:**
- Block 1 (Knowledge Architecture): at least one observation the student made about the codebase during the fix, promoted where appropriate from raw note toward hypothesis
- Block 2 (Decision Journal): the trade-off the student made in the fix, logged with the alternative considered
- Block 3 (Quality Gate): at least one testable criterion for "did this fix really land" — a check the student can re-run

**Klaassen's four-step loop (compound engineering) is the exercise shape.** Plan (plan mode used deliberately — not skipped on "it's a trivial bug") → Work (agent does the edit + tests) → Review (student reads diff, pushes back) → **Compound** (the session retro — the loop's fourth step is where learnings travel forward).

**The retro is the first compounding move.** Claude reviews the session, rewrites the student's rules file in place, reports in 3–5 lines what changed. Student pushes back where it's off. The rules file is what the next session reads first — which is how M1's trivial bug makes M2 faster.

**Why this shape:** a trivial bug is a low-stakes vehicle for a high-stakes teaching moment. If the student leaves M1 having only fixed a bug, M1 failed. If they leave with a memory that starts learning and a retro habit they can run on Tuesday, M1 worked.

*Naming: canonical term is "compound engineering" per Klaassen (Every Inc.) — our learning-area name "compounding engineering" remains our framing; "compound" reserved for the Klaassen-specific four-step loop.*

## M2 in detail — repo memory → multi-repo memory → business layer

**Three memory layers, built in order, compounding all the way:**

1. **Repo memory.** The single-repo memory seeded in M1 grows — more observations promoted, more decisions journaled, more quality criteria earning their keep.
2. **Multi-repo memory.** Engineers often work across services. The memory extends across repos — patterns seen in one service that apply to another, conventions shared at the team level, cross-repo dependencies and failure modes. Memory isn't a single file tied to one repo; it's a structured store the engineer carries.
3. **Business rules and company info.** Memory connects to the layer above code — the business rules the code serves, the company context an agent needs to make non-trivial decisions (what this customer segment actually needs, which policies apply here, which commitments the team has already made). Agents wire to this layer alongside the code layer.

**Make that compound.** The four-step loop from M1 carries through M2 — every session retro promotes what's been learned across all three layers. The student leaves M2 with a memory that reads code, reads business context, and gets sharper every session.

**Plan mode, as it should be done.** M1 used plan mode deliberately on a trivial bug. M2 is where plan mode gets taught at depth — what a good plan looks like when the task is non-trivial, how the plan interacts with the multi-layer memory, what the student pushes back on before approval (plan-mode approval inflation is a known failure pattern — plans that *look* structured get rubber-stamped without reading). The "what should a real plan contain" teaching moment lives here, not in M1.

## M3 in detail — the send-off

**M3 and M4 are a coupled pair.** M3 sets up and launches; M4 returns and processes. **The gap between the two modules is the walk-away** — the agent runs during that gap. This is why the module boundary matters: students cannot skip the walk-away because the schedule *is* the walk-away.

**The five moves in M3:**
1. **Teach the concept.** What makes a task "long-running" (multi-hour, sustained coherence needed, walk-away possible). How it's different from the quick edits of M1–M2.
2. **Explain the challenge.** Why this doesn't "just work" — failure modes from the OODA: argue-loops, hallucinated commit hashes, context rot, goal drift, plausible-but-wrong. Named up front so students don't blame themselves when they surface.
3. **Build the verifier** on the student's real work. The external verifier component of the three-pattern (reference artifact + plan.md + external verifier). Shape depends on the task; candidates: tests-as-verifier, lint/compile check, bash hook, minimal judge.
4. **Check it lightly** on a small example. Proof that the verifier catches a failure it should catch before we trust it on the real run.
5. **Send off a mid-long task.** Not a simulated 8-hour run. A real mid-long task (2–4 hours depending on format) that will actually complete between M3 and M4.

**Format dependency.** 2-day intensive: M3 ends day 1, agent runs overnight, M4 opens day 2. 6-week format: M3 at week N, M4 at week N+1, agent runs for a week between. Both shapes preserve the structural walk-away.

**Real-work requirement lands naturally here** — the mid-long task is drawn from the student's own backlog, running on the student's own codebase. No toy task would survive the inter-module gap.

## M4 in detail — the return

**M4 opens with the student returning to the scene** of M3's send-off. The artifact the agent produced during the gap is waiting. The retrospective is the module.

**The three moves in M4:**
1. **Return to the scene.** Read what actually happened. Where did the agent drift? Where did the verifier catch something (or fail to)? Where was the output plausible-but-wrong? First-hand encounter with the failure modes M3 named.
2. **Process results and learnings.** Structured Debrief: what traveled into memory about this codebase / this task shape / this verifier's blind spots. Judge agent built to triage what the verifier missed — not abstract evals infrastructure, judgment specifically tuned to what just failed.
3. **Prepare for better the next time — including the team's next time.** Memory updated (Block 1 observations promoted, Block 2 decisions logged, Block 3 quality criteria sharpened). Verifier rewritten to catch what it missed. One judge promoted to reusable artifact and shipped to the team repo — this is the factory-component move (formerly carved out as a separate M5; it lives here because it belongs to the return, not to its own session).

**Evals arrive when they're necessary, not when the curriculum says.** Students don't learn "evals as infrastructure" abstractly. They build the specific judges their specific task drift demanded. Abstract eval theory is what M4 avoids; situated judge-building is what M4 delivers.

**The compound loop threads through both modules.** M1 taught the four-step loop on a trivial bug. M2 scaled memory. M3 applied it at mid-long scale. M4 closes the loop at mid-long scale — the Compound step on a run that took hours, not minutes. What memory gains from a multi-hour run is qualitatively different from what it gains from a ten-minute one.

**Anchor cases worth citing** (to be audited before Pass 1):
- Intercom R&D's 93.6% agent-driven PRs with 19.2% auto-approved — evidence that the tiered-review shape is real and shipping.
- Ramp's Glass + Dojo — evidence that quality infrastructure is a factory component, not a separate craft.

## M5 in detail — ported from Bootstrap M8

The peak. Each participant's M1–M5 stack — codebase memory, factory components, skills, judges, orchestrator — arrives at M6 as a **first-class agent on a shared runtime**. The room's agents deliberate live on a real engineering problem fed in by the CTO at the start of the cohort.

**The fuel — a real engineering problem.** The CTO picks one the company is genuinely sitting on:
- A migration plan (monorepo ↔ polyrepo; on-prem → cloud; language / framework migration)
- An architecture decision with cross-service blast radius
- A platform choice with codebase realities the vendors' sales decks don't know about
- A performance or reliability pathology spanning teams
- A refactor too big for one engineer to hold in their head

**The heterogeneity is the insight.** No individual holds the whole picture. The queue handler's quirks live in one engineer's memory, the auth layer's debt lives in another's, the deploy pipeline's scars live in a third. The deliberation assembles it.

**The three thinking-discipline skills re-invoke here on the engineering substrate.** `crux` finds the load-bearing technical obstacle. `assumption-test` surfaces what would have to be true for the proposed architecture to work. `pre-mortem` names what breaks at scale. Same disciplines as Bootstrap M8, code-and-systems substrate. (These arrive installed somewhere earlier in the arc — Module 5 scaffold is the likely carrier; to be settled in Pass 1.)

**The mechanism is visible.** Students read every message and `@mention` in the transcript. Nothing hides behind orchestration magic. Humans contribute by talking in the room AND by steering their agents at decision beats — they don't run the plumbing.

**Artifact:** a technical decision document — engineering equivalent of Rumelt's kernel. Diagnosis of the crux, guiding policy, ranked assumptions, named experiments to run on Monday. Signed by the room, not one author.

**Open questions inherited from Bootstrap M8** (tracked, not resolved):
- Runtime dependency — Cowork trajectory at delivery time; bridge design if capability still landing
- Self-study variant — solo student uses persona-stand-ins drawn from their own agent stack
- Human intervention beats without breaking deliberation flow
- Whether orchestrator-agent ships as scaffold or is generated on-the-fly (the flywheel thesis)
- F-Secure copyright fence (they deliver their own versions of this training family)

Detailed notes: `memory/project_m8_joint_panel.md` (Bootstrap M8's equivalent work applies).

## M6 in detail — the human close

**M6 is human.** No live deliberation. No agent fireworks. No new artifact to ship. After M5's peak, the training slows down deliberately and hands the room back to the people in it.

**Sourced from three registers — opinion, fear, hope.** Each student speaks from inside:

- **Opinion** — what they actually think about where agentic engineering is going, including the half-formed intuitions they haven't said out loud yet
- **Fear** — what they're quietly worried about: their own obsolescence, their team's readiness, their company's pace, what happens to junior engineers, what happens to craft, what this does to how they identify as an engineer
- **Hope** — what they want to happen: for their work, their team, their practice, the craft itself, their own next three years

The three registers aren't pick-one. Each student speaks from each, briefly, in the room. The vulnerability of naming fear and hope alongside opinion is part of the pedagogy — the training closes on directness, not triumph.

**Discussion follows.** Unstructured, room-scale, human-led. No agents moderating. No Nerd summarizing mid-flow (though one may help capture themes post-hoc). Patterns will emerge — probably convergences on specific fears (job security, craft erosion), specific hopes (leverage, autonomy, interesting work), specific unresolved opinions (where is the ceiling, what breaks first, what this does to teams). The facilitator holds space, doesn't redirect.

**The closing beat — a lecture of the future.** The trainer (Antti in the canonical delivery) delivers a 15–20 minute lecture on where this is going. Not a prediction deck. Risto-style directness: *here's how I see it, including what I don't know, including what I've been wrong about before.* Names directions, names uncertainties, names what they're watching for, names what they're betting on. The Rory discipline applies: counterintuitive reframes over obvious takes. The Seth discipline applies: warmth and generosity, not posturing.

**What M6 refuses to do:**
- Close the big question. *Where is this all going?* is left open, on purpose.
- Package the training into a 90-day commitment plan. Students leave with the question, not with a worksheet.
- Confer an identity ("you are now an agent builder"). This isn't Bootstrap's M8 — different audience, different closing move. Engineers are already engineers; the training sharpens, it doesn't re-name.
- Pretend the team-work answers arrived in the training. They didn't. Not all answers to team work happen in training — and saying so out loud is part of the directness.

**Self-study variant.** The opinion/fear/hope round can be structured as written reflection in the Agentic Nerd (student speaks each register, nerd records, themes surface over a structured sequence). The lecture-of-the-future beat is the harder piece to port — a pre-recorded or written version by Antti stands in, acknowledging the compromise. Live-room version is always richer than self-study here; this is the module where the in-room cohort has the biggest advantage.

**Why the training ends this way.** Engineers are pattern-matchers trained to seek closure. Closing on an explicitly-open question is deliberate counterprogramming. It trusts students to carry the question without needing it answered. It also matches the research reality — nobody plain knows where this is going, and a training that pretends otherwise is lying. The Risto frame: naming uncertainty is the source of trust. A trainer who closes on "here's how I see it, but I could be wrong" is more trustworthy than one who closes on "here's the plan."

## Self-assessment metric

> **Rate 1–10: your confidence operating as an L3 agentic engineer — someone who builds infrastructure that levels up the team.**

Same structure as Engineering Management: M1 start, M6 end, day-91.

**Target movement:**
- **Start avg:** ~2–4 (they chat, maybe dabble; don't build infrastructure)
- **End avg:** ~5–7 (shipped real work via orchestration, contributed a component to the team, operated in M6's live deliberation)
- **Day-91 avg:** should hold or climb; L3 durability is the bet

Delta target ~+3. Bigger than Engineering Management's +2 because the ladder has more rungs to climb. Aggregate delta across single-company cohort = sponsor's finding.

## Pair with Engineering Management

These two trainings are designed to pincer the transformation:

- **Manager takes Engineering Management** → leads with conditions-creator practice, memory + swarm at team scale, Intercom/Ramp playbook.
- **Team takes Agentic Engineering 101** → engineers level up on the ladder the manager is creating conditions for.
- **Together, in a single-company cohort:** M6's live deliberation is where the pincer lands. Manager's M1–M5 stack (team-2x infrastructure, review policy, onboarding patterns) meets engineers' M1–M5 stack (codebase memory, factory components, orchestrators, judges) in one room, on one real problem. The manager's agent proposes conditions; the engineers' agents pressure-test on actual code. The aggregate L0→L2/L3 movement across the cohort is the sponsor's finding.

**Design assumption (to verify):** 101 works best when the manager has done EM first or is doing it in parallel. M1 of 101 includes a "does your manager know what you're about to build?" moment — if the team has the team-2x infrastructure already, ride it; if not, M5 includes bootstrapping it.

## Hard exclusions

- Chatting basics (baseline, not content)
- Plan mode as central content (it's M1's first 15 minutes)
- Basic context management as the training's main subject (M1/M2 move past it fast)
- ML engineering (model training, fine-tuning) — out of scope
- Non-software-engineering domains — future variants
- Leading change at team scale — that's Engineering Management
- Vendor/platform comparison — Claude Code is the substrate
- Certification, certificates, graduation ceremonies — builder CTO's allergy

## Anchor cases (research-grounded)

- **Intercom R&D 2x** (`observations/intercom.md` Side A) — M4 (93.6% Agent-driven PRs, 19.2% auto-approved), M5 (team-2x plugin repo: 267 skills, 31% R&D contributing as the factory-pattern anchor).
- **Ramp AI-pilled** (`observations/ramp.md`) — M1 (L0–L3 ladder as internal diagnostic; we borrow the posture, not the label), M5 (Glass + Dojo as factory-component contribution targets), cost-posture (leverage over tokens) as cultural frame.
- **Block Hierarchy→Intelligence** (`observations/block.md`) — pressure-test throughout (what does an L3 engineer's role become when the hierarchy thins?).
- **Huryn three blocks** (`insights.md`) — memory structure, direct import from Bootstrap M2 lineage.
- **Cross-cutting:** `coding-agent-as-general-platform`, `absorption-bottleneck` (M4 names it), `conditions-creator` (M5 lives it from IC side), `rules-verification-scarcity` (M4 meta-pattern).

## Delivery architecture

**The compounding lives in the student's real repo. The curriculum lives in a content folder next to it.**

Two artifacts per student:

1. **Content folder** — `agents-102-content-agentic-engineering-101/` (zip shipped at training start). Contains `lectures/`, `exercises/`, `prework/`, `reference/`. All markdown. Claude reads from this folder at the Nerd's direction; the student skims when they want to. Same markdown renders via the cohort site for projection and human browsing — the file-on-disk is the source of truth for agentic reading.

2. **The student's real repo** — where compounding actually happens. The student picks this repo in prework. The repo's root `CLAUDE.md` (or `.claude/CLAUDE.md`) grows each module. Decision-journal entries land as ADRs in the repo's existing convention (or `docs/adr/NNNN-slug.md` if none). Three-block memory (M2+) lands in `.claude/memory/`. No separate training directory, no `module-N/` folders, no file-ceremony. Work happens where work belongs.

**Repo choice matters but isn't a blood oath.** Criteria: one the student owns or co-owns, one they'll still work in six months, one dense enough that compounding has somewhere to land. If a student switches repos mid-training (team change, project end, wrong choice in prework), replay M1 → M(current) on the new repo in an evening.

**Replay is first-class, not remedial.** The Nerd fast-paths replay — *"you've done this shape; let's regenerate the artifacts for this repo"* — because the pedagogy already landed. Replay is artifact regeneration, not re-learning. **Design constraint on every module:** exercises must produce artifacts deterministically enough to replay. Modules with a room-scale moment (M5 deliberation) or multi-day wait (M3 send-off) carry an explicit replay-variant path.

**Prework is agentic end-to-end.** No "create this file, paste this content, commit these lines." The student unzips the content folder, points Claude at it, asks Claude to walk them through prework. Claude runs the repo-choice conversation, the bug-finding conversation, the install check. Pre-fabricating state the student could generate in conversation violates the *ask-the-agent-don't-type-in-a-terminal* pedagogy.

**The Nerd reads the content folder.** It doesn't carry Klaassen / Huryn / Ronacher in its head — it reads `lectures/the-wizard-move.md` and `exercises/ship-trivial-bug.md` and surfaces what's there at blockers. Curriculum becomes Claude-readable reference, not human-only reading material.

**No persistent training-dir state.** Everything the student needs after M1 lives in either their repo (compounding artifacts) or their head (the pedagogy). If the student can't reconstruct the prior module from `git log` + the repo's current `CLAUDE.md`, the module didn't land.

## Format

- **Length:** likely 2 days or 6 weeks (consistent with Engineering Management)
- **Cohort:** single-company
- **Session runtime per module:** revisit — Bootstrap's 1h45 canonical may not hold for an audience further up the ladder; candidate is 2h for M3 / M5 / M6 given orchestration and deliberation runtime
- **Belief > correctness, 50%-wrong-is-curriculum** (ports from Engineering Management)
- **Calibration question** (*did you make progress? did you lay ground?*) applies to every module

## State of play (2026-04-21)

**Settled this session:**
- Positioning ("you already think you're using Claude Code")
- Buyer (builder CTO, technical, Willison-reader)
- Audience (self-taught mid-layer, uneven floor, plan-mode-wrong, CLAUDE.md-under-used)
- Four learning areas on two axes — how (compounding engineering, team integration) × technical (long-running tasks, software factory pattern). Replaces the earlier "three outcomes" frame — cleaner, capability-oriented, and every module advances multiple dimensions
- Six module titles and moods, each module's lead dimension named
- L1→L2 gap problem resolved — "long-running tasks" now gets its own module (M3), anchored to Opus 4.7's sustained-execution capability rather than hand-wavy "trust"
- M6 as peak, ported from Bootstrap M8 mechanic — multi-user + multi-agent deliberation on CTO's real open question
- M5 sharpened — its artifact is the component the engineer's agent brings to M6
- Pair with Engineering Management lands live in M6

**First long-running-gen cycle landed 2026-04-21 (evening) — M1 dependencies built:**
- `curriculum/trainings/agentic-engineering-101/ship-with-agents.md` (Pass 1 module spine)
- `curriculum/trainings/agentic-engineering-101/prework.md`
- `curriculum/lectures/the-wizard-move.md` (Pass 2 skeleton)
- `curriculum/exercises/ship-trivial-bug.md` (Pass 3, the M1 target)
- `curriculum/evals/instances/agentic-engineering-101--ship-with-agents.md`
- `site/curriculum.html` TRAININGS entry added
- Klaassen + Huryn (Paweł, name corrected) practitioner sources verified — both `[practitioner direct]`, within 6 months
- Bootstrap reuse audit: `context-is-king.md` reused as prework reading; plan-mode primer confirmed missing but NOT built — exercise teaches plan mode in-flight, named retrospectively per exercise-first-head-on pedagogy. Compound/compounding lecture deferred to M2 per strategy doc.
- Pedagogy sharpened: **exercise-first head-on, "why it worked" names the shape retrospectively.** Klaassen + Huryn attributed at P5 as peer recognition, not curriculum authority.

**Open — decide before Pass 1:**

1. ~~**Training name.**~~ **Settled 2026-04-21: *Agentic Engineering 101*.** Matches the sales-site program tile; strategy doc and site name are now aligned.
2. **First cohort posture — revenue event or evidence-gathering event?** Intercom and Ramp are going to be every competitor's anchor cases within 6 months. Our third case (a Nordic single-company cohort we observe directly) is a durable advantage. Worth running the first delivery at cost to own that case.
3. **M3 title.** Working title *Long-running tasks* names the capability plainly but lacks the spice of *Ship with agents* / *Toward the factory pattern*. Candidates: *Close the laptop*, *Hours, not minutes*, *The long run*, *Walk away*. Builder CTO taste test worth running; *Close the laptop* leads for evocativeness. (Old question about splitting M3 into two modules is now moot — long-running tasks earned its own module via the four-area frame.)
4. **M4 — which job is it doing?** Three different teaching moments currently live in M4: build judges (craft), tiered PR review (process), auto-approval policy (organisational). An IC can't unilaterally set policy. Resolution: M4 teaches judge-building + tiered-review proposal; organisation-level auto-approval is the *question* an engineer brings back to their manager (who took EM). Clean seam between trainings.
5. ~~**M1 install mechanic.**~~ **Settled 2026-04-21 and built.** Instructor demonstrates a wizard-level move on a volunteer's actual codebase → each student shares one trick they brought → one real PR shipped through Claude Code with plan mode used deliberately → `module-1/CLAUDE.md` seeded with session's rules. No "diagnose the gap" posture anywhere. (TODO before first delivery: menu of 3–5 wizard-move demo options per cohort's volunteer-codebase shape.)
6. **M5 factory component — single track or branch?** Opening bid: branch. Engineer picks the component their team actually needs (skill / orchestration pattern / MCP server / judge / meta-agent). Primary: MCP server (generalises). Reach: meta-agent. Same pattern as Bootstrap M7's two branches.
7. **Skill-scaffold question — where do `crux`, `assumption-test`, `pre-mortem` arrive?** Bootstrap delivers them in M7 scaffold, invokes in M8. Likely analogue: M5 scaffold ships them (for the factory-component design move), M6 re-invokes at room scale on the engineering problem.
8. **Prerequisite — Bootstrap hard-required, assumed-but-not-enforced, or irrelevant?** Leaning irrelevant. Engineers arrive with chatting fluency; Bootstrap is aimed at non-technical builder leaders. Different baselines.

**TODOs for Pass 1:**

- Write research-grounded-moves companion file (Engineering Management has one; 101 doesn't)
- **Capability check on Opus 4.7 long-running behaviour** — before M3 drafts, pin down what specifically improves over 4.6 for sustained agentic work (context budget behaviour, tool-call coherence at N-hours, recovery-from-error patterns, session longevity). Run via `claude-code-guide`. M3 anchors to real capability, not marketing.
- M1 opening bid — flesh out the wizard-demo-plus-student-trick move (no "diagnose the gap" posture)
- M3 long-running case — canonical multi-hour task that requires agentic persistence but finishes in-session; monitoring + recovery patterns as the secondary artifact
- M6 problem-selection protocol — how the CTO picks the right engineering problem before the cohort starts; what makes a problem suitable for live multi-agent deliberation
- Self-study variant for M6 — persona-stand-ins drawn from the student's own agent stack
- Frontier reading list — named practitioners (Karpathy, Willison, Huryn, Cherny, Sottiaux et al.); curated list refreshed per cohort; where it lives in the training (likely M2 compounding-practice reading or M5 factory-anchor reading, now that "see the future" has dissolved into doing)

**Bootstrap reuse candidates (audit for fit):**
- Plan mode primer → M1 opening
- Context is King → M1 framing
- Compounding lecture → M2 framing
- When to split an agent → M3
- Hallucination bake-off pattern → M4 judge design
- Orchestrator + eval loop → M3 orchestration exercise
- `crux` / `assumption-test` / `pre-mortem` skills → M5 scaffold, M6 re-invocation
- M8 joint-deliberation pattern → M6 (substrate: engineering problem instead of business strategy)

---

*Last updated: 2026-04-21 late. M1 dependencies built in first long-running-gen cycle (ship-with-agents spine + ship-trivial-bug exercise Pass 3 + the-wizard-move lecture + prework + eval instance + site registration). Pedagogy sharpened to exercise-first head-on with retrospective naming. Huryn first-name corrected to Paweł. Next: Antti reshape pass on drafts, then simulation + LLM-judge eval runs, then Compound step on long-running strategy.*
