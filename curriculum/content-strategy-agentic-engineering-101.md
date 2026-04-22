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

## Woven design rules — apply to every module and exercise

Two ambient rules that thread through every exercise and module. Not standalone LOs. Not strategic choices. Design defaults that, if honoured, surface naturally as the student does the work — and if neglected, leave the student doing chat-shaped work that doesn't compound.

**1. The Compound step is visible in every module.** Plan → Work → Review → **Compound** (Klaassen). The fourth step is what makes the loop a loop. M1's Debrief is the canonical instance — Claude reviews the session and rewrites the rules file in place. M2-M6 each have their own Compound move sitting in the same structural place: memory promotion at M2's session close (observation → hypothesis → rule, decision logged, quality criterion added); learnings-into-memory at M4's return (verifier sharpened, judge promoted to team kit); gate spec and constraint shipped to team kit at M5's close; technical decision document signed and team kit fed at M6's close. **Test on draft:** if a module's exercise produces an artifact and ends without a Compound move that updates rules / memory / team kit / verifier in place, the module is missing its fourth step.

**2. Specs over chats.** When the student needs the agent to do something non-trivial, the move is *write the spec, point the agent at it* — not type the request in chat (Klaassen). Markdown specs are the lingua franca: plan.md (M3 long-running), ADRs (M1 onward), judges (M4), gate specs (M5 Q), blast-radius constraints (M5 S), team kit contributions (M4-M6), the technical decision document (M6). Chat is for the quick stuff and for steering at decision beats. **Test on draft:** if an exercise asks the student to type a paragraph of intent into chat where a markdown spec would have served — and the spec would have been re-readable by a teammate — the exercise is teaching the wrong move. Convert to spec.

**Rory:** every competitor will teach prompt engineering. We teach spec engineering — because specs compound and chats don't. Specs are the artifact you point your next agent at, the artifact your teammate can read, the artifact that lives past the session. Chats die at session close.

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
| M4 | **Long-running tasks — return** *(working title)* | Long-running (technical) — retrospective + next-run prep + first contribution to **the team kit** | Grounded rescue — *"the return isn't a grind, it's a system"* | Return to the scene: diff read, drift named, failures caught + learnings integrated into memory + verifier sharpened for next run + one judge shipped to the team kit (the side-story births here) |
| M5 | **Earn the trust** *(Q+S)* | Quality + Security as veto-stakeholder discipline; team-axis ramp | Earned trust — *"my agent practice just became something my staff engineer and my CISO can sign off on"* | Two ~20-min exercises: (1) promote one M4 judge into a tiered-review **gate spec**; (2) audit the M3 agent's tool surface and install one **blast-radius constraint**. Both ship to the team kit. |
| M6 | **Agents meet agents** *(+ closing human beat)* | Team integration (how) peak; every dimension plugs in; Risto closing folded in | Awe + ownership → *"where is this all going?"* | Live deliberation on the CTO's real engineering problem, grounded in every participant's codebase knowledge AND the cohort's accreted team kit. Closes on opinion/fear/hope round + Antti's lecture of the future (~30 min compressed close). |

**Agentic walk-away test:** by M3 onward, the student closes the laptop and finds the agents still working. If every artifact requires typing, the exercise failed the rule.

**Real-work requirement (universal across modules):** examples, cases, bugs, PRs, and references come from the student's own company and codebase. Not toy data. Not case studies of other firms dressed up as exercises. The training lands only when the artifacts are the student's.

## Mood arc

**joyful creation → satisfied compounding → unleashed leverage → grounded rescue → earned trust → awe + ownership → *"where is this all going?"***

Closer to Bootstrap's arc than Engineering Management's. Personal discovery first — the engineer experiencing their own capability multiplication (M1–M2), then the send-off and return on mid-long work (M3–M4), then the discipline that earns veto-stakeholder signoff (M5), then the room's collective agency culminating in the open question (M6). Leadership drama is absent; the drama is in the engineer's own interior (*am I still keeping up?*), in the team's infrastructure (*is our floor rising?* — the team kit makes this visible), and in M6's deliberate refusal to close the big question. *Where is this all going?* — nobody plain knows. The question is what the student carries home.

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

**Team kit side-story — seed only.** At M3's close, a one-line nudge: *"if your verifier shape would help another task or another teammate, name it in your CLAUDE.md."* No shared file yet. The noticing precedes the contribution. Birth happens in M4.

## M4 in detail — the return

**M4 opens with the student returning to the scene** of M3's send-off. The artifact the agent produced during the gap is waiting. The retrospective is the module.

**The three moves in M4:**
1. **Return to the scene.** Read what actually happened. Where did the agent drift? Where did the verifier catch something (or fail to)? Where was the output plausible-but-wrong? First-hand encounter with the failure modes M3 named.
2. **Process results and learnings.** Structured Debrief: what traveled into memory about this codebase / this task shape / this verifier's blind spots. Judge agent built to triage what the verifier missed — not abstract evals infrastructure, judgment specifically tuned to what just failed.
3. **Prepare for better the next time — including the team's next time.** Memory updated (Block 1 observations promoted, Block 2 decisions logged, Block 3 quality criteria sharpened). Verifier rewritten to catch what it missed. **One judge shipped to the team kit — the side-story births here.** First file in the cohort-shared substrate (real Git repo when the cohort has one, e.g. `agents-102-team-kit`; named folder otherwise). Tiny: one judge, no manifesto. The student's first contribution to a thing that will compound across M5 and M6 by accretion, not by design. Klaassen-true: the Intercom 267-skill plugin repo started with one skill, not a charter.

**Evals arrive when they're necessary, not when the curriculum says.** Students don't learn "evals as infrastructure" abstractly. They build the specific judges their specific task drift demanded. Abstract eval theory is what M4 avoids; situated judge-building is what M4 delivers.

**The compound loop threads through both modules.** M1 taught the four-step loop on a trivial bug. M2 scaled memory. M3 applied it at mid-long scale. M4 closes the loop at mid-long scale — the Compound step on a run that took hours, not minutes. What memory gains from a multi-hour run is qualitatively different from what it gains from a ten-minute one.

**Anchor cases worth citing** (to be audited before Pass 1):
- Intercom R&D's 93.6% agent-driven PRs with 19.2% auto-approved — evidence that the tiered-review shape is real and shipping.
- Ramp's Glass + Dojo — evidence that quality infrastructure is a factory component, not a separate craft.

## M5 in detail — earn the trust (Quality + Security)

**The veto-stakeholder module.** After M3+M4's long-running pair has produced something that ran for hours and shipped autonomously, Quality and Security become real, not theoretical. Two ~20-minute exercises, neither dominant — Q first, S second. Compact module by design.

**Mood (deliberate):** earned trust — *"my agent practice just became something my staff engineer and my CISO can sign off on."* Not anxiety. Not theatre. Earned, because the long-running output is the evidence that needed gating.

**Why here in the arc.** Q+S between long-running and team peak. Long-running creates the visceral *"what just shipped while I was at lunch?"* moment that Q+S answers; the team peak (M6) then multiplies blast radius, which Q+S has just bounded. Putting Q+S after the team peak would close the training on hygiene, killing the room.

**Exercise 1 — Promote the gate (Q, ~20 min).** Student takes one judge they shipped to the team kit at M4, designs the smallest possible gate around it: auto-approve threshold, what it checks, what it sends back to human review. Writes the policy as a markdown spec the agent reads. Tests it on one PR. Ships the gate spec to the team kit. Foreshadows the tiered-review system the engineer brings back to their manager (who took Engineering Management — this is where the EM/AE101 pincer lands organisationally).

**Exercise 2 — Bound the blast radius (S, ~20 min).** Student opens their M3 agent's tool/connector/action surface, names the worst thing it could ship, picks one constraint to install. Menu (student picks one): least-privilege scope reduction · prompt-injection guard on input the agent reads · audit-trail hook on tool calls · secrets-handling check. Implements. Verifies the agent still works. Ships the constraint to the team kit.

**Both exercises produce contributions to the team kit.** The gate spec becomes a team-shared judge-policy. The constraint becomes a team-shared guard. The side-story compounds — by end of M5, the cohort's collective infrastructure is non-trivial.

**Real-work requirement holds.** Both exercises operate on the student's actual M4 judges and M3 agent, on the student's real codebase. No abstract Q/S frameworks; specific gates and specific constraints on specific systems.

**What M5 refuses to do:**
- Frame Q+S as compliance. They're infrastructure that earns trust, not paperwork that submits to it.
- Cover all of Q or all of S. Two ~20-min exercises pick one move each. The breadth is the team kit's job over time, not one module's job.
- Carry the closing human beat. M5 ends on earned trust. The *"where is this all going?"* shift belongs to M6.

**Anchor cases:** Intercom Tier 1/2/3 review structure (the gating system Q exercise foreshadows; 19.2% auto-approved at the lowest tier); Ramp Glass + Dojo (judges as quality infrastructure, the team kit's destination shape).

## M6 in detail — agents meet agents + closing human beat

**One module, two jobs.** The peak deliberation (the +3 cognitive climb) and the closing human beat (the Risto bookend, compressed but alive). The mood inside M6 downshifts deliberately: awe + ownership during the deliberation → *"where is this all going?"* in the closing 30 minutes. Closing on awe alone is salesy; closing on the open question is honest.

### The deliberation (~70 min)

Each participant's M1–M5 stack — codebase memory, factory components, judges, gates, constraints, contributions to the team kit — arrives at M6 as a **first-class agent on a shared runtime**. The room's agents deliberate live on a real engineering problem fed in by the CTO at the start of the cohort.

**The fuel — a real engineering problem.** The CTO picks one the company is genuinely sitting on:
- A migration plan (monorepo ↔ polyrepo; on-prem → cloud; language/framework migration)
- An architecture decision with cross-service blast radius
- A platform choice with codebase realities the vendors' sales decks don't know about
- A performance or reliability pathology spanning teams
- A refactor too big for one engineer to hold in their head

**The heterogeneity is the insight.** No individual holds the whole picture. The queue handler's quirks live in one engineer's memory, the auth layer's debt lives in another's, the deploy pipeline's scars live in a third. The deliberation assembles it.

**The team kit is what the deliberation reads first.** Each agent loads the cohort's accreted contributions (judges, gates, constraints, skills) before joining the deliberation. The infrastructure the room raised over M4–M5 is what makes M6 possible. *That's* the visible compounding — by M6 the student sees the floor they collectively raised over five modules.

**The three thinking-discipline skills re-invoke here on the engineering substrate.** `crux` finds the load-bearing technical obstacle. `assumption-test` surfaces what would have to be true for the proposed architecture to work. `pre-mortem` names what breaks at scale. Same disciplines as Bootstrap M8, code-and-systems substrate. (These arrive installed somewhere earlier in the arc — likely M4 or M5 scaffold; to be settled in Pass 1.)

**The mechanism is visible.** Students read every message and `@mention` in the transcript. Nothing hides behind orchestration magic. Humans contribute by talking in the room AND by steering their agents at decision beats — they don't run the plumbing.

**Artifact:** a technical decision document — engineering equivalent of Rumelt's kernel. Diagnosis of the crux, guiding policy, ranked assumptions, named experiments to run on Monday. Signed by the room.

### The closing human beat (~30 min)

The training closes on directness, not triumph. Folded into M6 because the 6-module cap forced the choice; survives because the lecture-of-the-future was never about runtime, it was about the trainer's standing to close on uncertainty.

- **15 min — opinion / fear / hope round.** Each student speaks briefly from each register:
  - *Opinion:* what they actually think about where agentic engineering is going
  - *Fear:* what they're quietly worried about (own obsolescence, team readiness, craft erosion, what happens to junior engineers)
  - *Hope:* what they want to happen for their work, their team, their practice, their next three years

  The vulnerability of naming fear and hope alongside opinion is part of the pedagogy. The room scale is shorter than a standalone module would have made it; the briefness is the price the 6-cap charged.

- **15–20 min — Antti's lecture of the future.** Risto-style directness: *here's how I see it, including what I don't know, including what I've been wrong about before.* Names directions, names uncertainties, names what they're betting on. The Rory discipline: counterintuitive reframes over obvious takes. The Seth discipline: warmth and generosity, not posturing.

**What M6 refuses to do:**
- Close the big question. *Where is this all going?* is left open, on purpose.
- Confer an identity ("you are now an agent builder"). Engineers are already engineers; the training sharpens, doesn't re-name.
- Pretend the team-work answers arrived in the training. They didn't. Saying so out loud is part of the directness.
- Package into a 90-day commitment plan. Students leave with the question, not with a worksheet.

**Open questions inherited from Bootstrap M8** (tracked, not resolved): runtime dependency on Cowork trajectory at delivery time; bridge design if capability still landing; whether orchestrator-agent ships as scaffold or is generated on-the-fly; F-Secure copyright fence. See `memory/project_m8_joint_panel.md`.

**Self-study variant.** Solo student opinion/fear/hope round happens in writing with the Agentic Nerd as listener; the lecture-of-the-future is a pre-recorded or written version by Antti; deliberation uses persona-stand-ins drawn from the student's own agent stack.

**Why the training ends this way.** Engineers are pattern-matchers trained to seek closure. Closing on an explicitly-open question is deliberate counterprogramming. Risto: naming uncertainty is the source of trust. A trainer who closes on *"here's how I see it, but I could be wrong"* is more trustworthy than one who closes on *"here's the plan."*

## Team kit — the side-story that compounds (cross-module)

Not its own module. A side-story that accretes from M4 onward, mirroring how Intercom's 267-skill plugin repo (31% R&D contributing) was actually born — by accretion, not by design.

**The design rule:** team infra is born from one student noticing *"this would help my teammate too"* and shipping one file. Then it grows by accretion, one contribution per module from M4 onward. Never charter-first. The opposite — *"let's design the team plugin architecture in M5"* — produces exactly the corporate-platform-team thing Klaassen ridicules. We refuse it.

**Per-module accretion:**

| Module | Move | Cumulative state |
|---|---|---|
| M1 | None. Student is solo on their repo. | empty |
| M2 | Seed the noticing — *"if a rule starts feeling like 'this is what good engineers on this team do' rather than 'this is what I do,' jot the name in your CLAUDE.md."* | one note in personal CLAUDE.md |
| M3 | One-line nudge at close — *"if your verifier shape would help another task, name it."* | one more note |
| M4 | **The birth.** Return-and-integrate ends with: *ship one judge to the team kit.* Tiny. One judge. No manifesto. | 1 file/student × cohort = ~10 contributions |
| M5 (Q+S) | Q exercise: *if your gate generalizes, add it.* S exercise: *if your constraint generalizes, add it.* Two more potential contributions per student. | ~30 files, real shape forming |
| M6 | Each student's agent reads the team kit at start of deliberation. **Cohort's collective infrastructure is what makes deliberation possible.** | ~30+ files plus everything generated in deliberation |

**Substrate.** Default: a real shared Git repo (e.g. `agents-102-team-kit`) — single-company cohort can spin one up at training start. Survives past the training. Fallback: a folder on the cohort's training site (read-write, scoped). Last resort only: mocked shared folder for the training (works during, dies after).

**Naming.** Student-facing: **the team kit**. Plain, builderly, no platform-team energy. Klaassen attribution as **plugin repo** when introduced (M4's birth move).

**Self-study variant.** Solo student's "team kit" is artifacts they could ship to their team Monday — the contribution lives in their actual team's repo, named-and-deployable. Same move, real teammates instead of cohort peers. Lands harder than mocking a fake cohort.

**What this closes:** the team-axis cliff (no longer "three solo modules then a room" — team-shape work seeded at M2's noticing, grown across M4–M5, peaks at M6). Klaassen's shared-team-infrastructure principle. CTO's *"raises the team floor"* checkbox — visible artifact, not vibes. Quality's *"infrastructure not heroics"* — quality lives in team kit's judges, not in one engineer's vigilance.

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
- **Together, in a single-company cohort:** M6's live deliberation is where the pincer lands. Manager's stack (team-2x infrastructure, review policy, onboarding patterns) meets engineers' stack (codebase memory, judges, gates, blast-radius constraints, team kit contributions) in one room, on one real problem. The manager's agent proposes conditions; the engineers' agents pressure-test on actual code. The aggregate L0→L2/L3 movement across the cohort is the sponsor's finding.
- **The M5 Q+S handoff is organisational.** M5's Q exercise produces a tiered-review gate spec; the question of whether that gate is *organisationally* approved for auto-shipping crosses into the manager's territory (taught in EM). Clean seam between trainings — IC builds the gate, manager owns the approval policy.

**Design assumption (to verify):** 101 works best when the manager has done EM first or is doing it in parallel. M1 of 101 includes a "does your manager know what you're about to build?" moment — if the team has the team-2x infrastructure already, ride it; if not, M5/M6 include bootstrapping it.

## Supplementary material (planned)

Bootstrap pattern (`curriculum/supplementary/`): multi-section reference documents that build progressively, too dense to absorb in a single session, NOT inlined into modules. Referenced as prework, homework, or post-training reference. Stand as reference after training. AE101 uses the same pattern to handle breadth concerns the 6-module canonical curriculum can't carry without bloat.

**Why supplementary, not module material.** The 6-module cap is canonical — every cohort runs it. Breadth concerns (Quality at scale, Security for regulated environments, complete tool catalog) are real but cohort-dependent. A regulated-industry cohort needs the GDPR/PCI/HIPAA reference; a startup cohort doesn't. Putting either in the canonical curriculum makes one cohort suffer for the other's needs. Supplementary lets each cohort pull what they need.

**Planned supplementaries (none built yet — created when first cohort needs them):**

1. **`quality-at-scale.md`** — beyond the M5 Q gate spec: test discipline as agent velocity rises, regression detection patterns, codebase entropy monitoring, observability for agent work, loop reproducibility. Reference for staff engineers who own the floor at organisations with > 50 engineers shipping agent-driven PRs. Pulls in CTO #4 (test discipline holds), Quality items #1-2, #4-5, #8.

2. **`security-for-regulated-environments.md`** — beyond the M5 S blast-radius constraint: data egress control, regulated-data scope boundaries (GDPR, PCI, HIPAA, IP-sensitive code), incident response patterns when an agent ships something bad. Reference for cohorts in finance, healthcare, public sector, or anywhere AppSec needs more than M5's single constraint. Pulls in Security items #5, #7, #9.

3. **`what-engineers-actually-use-daily.md`** — reference catalog of the daily-use surface a Willison-reader CTO expects covered: plan mode (depth + when), CLAUDE.md patterns, MCP servers (when worth the setup, when not), scheduled agents (Claude Code's `/schedule`, when to reach for it), subagents (when one earns its keep over the main session), judge patterns (the M5 menu expanded). Reference, not curriculum — students dip in when they hit a blocker the canonical exercises don't cover.

4. **`multi-repo-working-patterns.md`** — beyond M2's three-layer memory: cross-service memory patterns, monorepo vs. polyrepo trade-offs at agent scale, when to spin up a dedicated agent per service vs. one orchestrator across services, how the team kit lives across multiple repos. Reference for engineers whose reality is 6+ services. Likely pulls in CTO #5 and Klaassen #7.

**When to build them.** Don't build ahead. Build the supplementary the first cohort actually asks for. The supplementary doc is justified by a real cohort question, not by a curriculum-author intuition. (Same posture as Bootstrap — the supplementaries that exist were the ones cohorts needed, not the ones the author predicted.)

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

- **Intercom R&D 2x** (`observations/intercom.md` Side A) — M4 (93.6% Agent-driven PRs), M5 (Tier 1/2/3 review structure with 19.2% auto-approved at lowest tier — the gate Q exercise foreshadows), team kit side-story (267-skill plugin repo with 31% R&D contributing — the accretion pattern we mirror).
- **Ramp AI-pilled** (`observations/ramp.md`) — M1 (L0–L3 ladder as internal diagnostic; we borrow the posture, not the label), M5 (Glass + Dojo as judges-as-quality-infrastructure, the team kit's destination shape), cost-posture (leverage over tokens) as cultural frame.
- **Block Hierarchy→Intelligence** (`observations/block.md`) — pressure-test throughout (what does an L3 engineer's role become when the hierarchy thins?).
- **Huryn three blocks** (`insights.md`) — memory structure, direct import from Bootstrap M2 lineage.
- **Cross-cutting:** `coding-agent-as-general-platform`, `absorption-bottleneck` (M4 names it), `conditions-creator` (M6 lives it from IC side), `rules-verification-scarcity` (M4–M5 meta-pattern).

## Pre-engagement contract — the buyer states the knowledge home

**Before any student touches Module 1, the buyer (sponsor CTO) takes a position on one question: *where does durable engineering knowledge live in this company so an agent can read it next time?***

This is a pre-engagement artifact, not an in-room debate. The trainer does not arrive at M1 ready to settle an ADR-vs-CLAUDE.md debate — that debate already happened, weeks earlier, with the sponsor.

**What the buyer commits to (one sentence per artifact):**

| Artifact | The buyer names where it lives |
|---|---|
| Decision records (M1 onward) | e.g., `docs/adr/NNNN-slug.md`, repo wiki, Linear + linkback, team Notion |
| Rules for the next session (M1 onward) | e.g., root `CLAUDE.md`, `.claude/CLAUDE.md`, `AGENTS.md` |
| Memory / knowledge architecture (M2 onward) | e.g., `.claude/memory/`, external wiki with pointer file, shared team repo |
| Team kit — judges, gate specs, constraints (M4 onward) | e.g., shared plugin repo, monorepo `.claude/` directory, team-kit Git repo |

**Student moves, two legitimate paths, one forbidden.** In the exercise, the student either (a) accepts the company default — the sponsor's call, fine, most will — or (b) proposes a better home *with a reason the team can argue with*. Both are learning. "I don't want to pick one" is not on the list. Refusing to leave durable knowledge anywhere violates the compounding premise the whole training runs on.

**Why the pre-engagement contract is load-bearing:**

- **The trainer doesn't settle a repo-convention debate in the room.** That debate is a sponsor responsibility, not a Module 1 tangent. The trainer arrives with the sponsor's answer already in hand.
- **The forcing function runs upstream.** Same pattern as [training-as-forcing-function](../memory/project_training_as_forcing_function.md) — the buyer has to take a position on a question their engineering org has often deferred. "Where does engineering knowledge live so an agent can read it?" is a valuable artifact in itself. Half the CTOs will discover their org doesn't have an answer. That discovery IS sales output.
- **The best part isn't the answer. It's that they had to pick.** *Rory.*
- **Override is legitimate, not rebellion.** Engineers often have a better sense of their own repo than a sponsor picking top-down. The exercise honours that — a reasoned override feeds back to the sponsor as a signal worth hearing. A passive acceptance is not failure either; the sponsor has real authority here.

**Where this shows up in content:**

- **Sales/pre-engagement materials** name the contract and include a one-page worksheet the sponsor fills before the cohort starts. (TODO before first cohort — belongs with the buyer sales pack.)
- **Module 1's exercise (`ship-trivial-bug.md`)** references the sponsor-stated ADR home as the default. Override path is explicit.
- **Module 2's memory exercise** references the sponsor-stated memory home.
- **Module 4 onward** references the sponsor-stated team-kit substrate.
- **The Agentic Nerd skill** reads the contract (a simple markdown file in the content folder, populated per cohort) and surfaces the sponsor-stated default at the right blocker in each module.

**Rory:** every competitor sells training and assumes the repo conventions will sort themselves out. We sell training and make the buyer answer a question their CTO hasn't wanted to answer — *where does our engineering knowledge live?* Half of them discover they don't have one. That's the most valuable thing the training does all week, and it happens before Day 1.

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
- **Modules:** 6 (cap, non-negotiable as of 2026-04-22)
- **Session runtime per module:** Bootstrap's 1h45 canonical likely doesn't hold uniformly here. Working bid: M1 / M2 ~ 1h45; M3 / M4 ~ 2h (long-running send-off and return need orchestration headroom); **M5 ~ 1h30 (compact: 2 × 20-min exercises)**; M6 ~ 2h15 (deliberation 70 min + closing human beat 30 min + frame/transition 35 min). Total facilitated: ~11h30 across 2 days, comfortably inside two 7-hour days with breaks.
- **Belief > correctness, 50%-wrong-is-curriculum** (ports from Engineering Management)
- **Calibration question** (*did you make progress? did you lay ground?*) applies to every module

## State of play (rolling)

**Settled 2026-04-22 (strategy-tuning session):**
- **6-module cap, non-negotiable.** Old M6 (standalone human close) dropped; closing human beat folded into new M6.
- **New M5 = Earn the trust (Q+S).** Two ~20-min exercises (gate spec + blast-radius constraint), both shipped to the team kit. Veto-stakeholder discipline as its own module, not woven hygiene.
- **New M6 = Agents meet agents + closing human beat.** Old M5's deliberation + compressed Risto closing in one module. Cost: lecture-of-the-future shrinks from full module to 15–20 min closing beat.
- **Team kit as side-story that compounds.** Born at M4 (one judge), grows by accretion across M5 (gate + constraint), peaks at M6 (each agent reads team kit before deliberation). Substrate: real shared Git repo when cohort has one. Naming: "the team kit" student-facing, "plugin repo" Klaassen attribution.
- **Mood arc updated:** joyful creation → satisfied compounding → unleashed leverage → grounded rescue → **earned trust** → awe + ownership → *"where is this all going?"*
- **Format update:** runtime per module no longer uniform — M5 compact (~1h30), M6 longest (~2h15), others 1h45–2h.

**Settled 2026-04-21:**
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

*Last updated: 2026-04-22 (strategy-tuning session). 6-module cap committed. Old M6 (standalone human close) dropped; closing beat folded into new M6. New M5 = Earn the trust (Q+S), 2 × 20-min exercises. New M6 = agents meet agents + closing human beat. Team kit side-story (M4 birth → M5 accretion → M6 substrate) replaces factory-component-as-branch. Overflow checklist: 35 of 40 absorbed (canonical modules + Woven design rules + planned supplementaries), 5 still open. **Supplementary tier added** (`quality-at-scale.md`, `security-for-regulated-environments.md`, `what-engineers-actually-use-daily.md`, `multi-repo-working-patterns.md`) — built on first cohort demand, not in advance. Next: write LOs for M2–M6 spines; keep overflow alive as personas surface new items.*

---

## Overflow — outside-in checklist

Living target state. Four personas read the curriculum top-to-bottom; each ticks the boxes their role cares about. Items leave this list as they get absorbed into module LOs or strategy decisions; new items enter as personas surface them. **The goal is not to empty the list — the goal is to keep current state and need state visible side by side.** A box stays open as long as no module's LO addresses it.

Captured 2026-04-22. Items checked (✅) name the module/move that absorbed them. Strikethrough means cut as out-of-scope.

### Builder CTO (the buyer)

- [ ] Output delta per engineer-month — measurable, not vibes
- [x] Works on our codebase — lands in the warts, not a sandbox ✅ *real-work requirement universal across modules*
- [ ] Survives the next model release — capability-shape, not version-shape ⚠ *needs LO craft when M2–M6 spines drafted*
- [x] Covers what I actually use daily — plan mode, CLAUDE.md, MCP, scheduled agents, subagents, judges ✅ *canonical: plan mode + CLAUDE.md + judges in M1–M5; supplementary: `what-engineers-actually-use-daily.md` for MCP + scheduled agents + subagents reference*
- [x] Cross-service reality — 6+ repos is normal ✅ *canonical: M2 multi-repo memory + team kit across repos in M4–M6; supplementary: `multi-repo-working-patterns.md` for breadth*
- [x] Trust calibration / tiered review — when does autonomous shipping become safe ✅ *M5 Q exercise (gate spec) + organisational handoff to EM*
- [x] Raises the team floor — not "we made one new wizard" ✅ *team kit side-story compounds across M4–M6*
- [x] Evals as infrastructure — the line between ships and ships-safely-at-scale ✅ *M4 judge-building + M5 Q gate*
- [ ] Habit on Monday — sticky practice, not theatre *(load-bearing for day-91 +3; needs LO somewhere)*
- [x] Honest about what nobody knows — Risto detector ✅ *M6 closing human beat (lecture-of-the-future)*

### Kieran Klaassen (the practitioner)

- [x] Plan → Work → Review → Compound is the unit, visible everywhere ✅ *M1 establishes; codified as Woven design rule #1*
- [x] The Compound step is the discipline — explicit move in every module ✅ *Woven design rule #1 — applied as design test on every module draft*
- [x] Specs over chats — stop typing in chat; write the spec, point the agent at it ✅ *Woven design rule #2 — applied as design test on every exercise draft*
- [ ] Background agents are everyday, not advanced — multiple agents concurrent by mid-training *(M3 has one mid-long task; default-everywhere is a real choice)*
- [x] Agents review agents — second agent reading first's PR is daily practice ✅ *M5 Q exercise IS this*
- [x] Evals are the unlock — judges that read intent, not unit tests ✅ *M4 + M5 Q*
- [x] Whole codebase is context — search-then-edit, multi-file refactors, repo-aware as default ✅ *canonical: M2 plan-mode-at-depth on multi-layer memory; supplementary: `multi-repo-working-patterns.md` for breadth*
- [x] Trust calibration is a designed system — auto-approve / tier-2 / tier-3 is a decision ✅ *M5 Q gate spec*
- [x] Shared team infrastructure compounds the team — Intercom 267-skill pattern ✅ *team kit side-story*
- [x] Don't waste the loop on toy problems — real backlog from day one ✅ *real-work requirement universal*

### Quality (staff/platform engineer who owns the floor)

- [x] Test discipline holds when agents ship ✅ *supplementary: `quality-at-scale.md`*
- [x] Regression detection ✅ *supplementary: `quality-at-scale.md`*
- [ ] Definition of "done" for agent work — explicit, not implicit *(natural fit M5 Q gate spec; settle when M5 spine drafted)*
- [x] Codebase entropy is monitored ✅ *supplementary: `quality-at-scale.md`*
- [x] Observability — you can tell what an agent did, why, against what spec ✅ *partial via M5 S audit-trail; breadth in supplementary `quality-at-scale.md`*
- [x] Verification gates before trust ✅ *M5 Q gate spec*
- [x] Failure mode catalog — named, not vibes ✅ *M3 names them up front*
- [x] Reproducibility — loop run twice produces equivalent-quality output ✅ *supplementary: `quality-at-scale.md`*
- [x] Judge calibration — judges themselves are tested ✅ *M5 Q gate design forces calibration*
- [x] Quality is infrastructure, not heroics ✅ *team kit + M5 Q*

### Security (CISO / AppSec / security-eng lead)

- [x] Secrets handling — agent doesn't leak credentials ✅ *M5 S blast-radius menu option*
- [x] Least-privilege tooling — narrowest-possible scope per task ✅ *M5 S blast-radius menu option*
- [x] Prompt injection resistance ✅ *M5 S blast-radius menu option*
- [x] Audit trail — who did what, when, with what authority ✅ *M5 S blast-radius menu option*
- [x] Data egress control — what leaves the perimeter, to which model provider ✅ *supplementary: `security-for-regulated-environments.md`*
- [x] Supply chain hygiene — skills, MCP servers, shared agent files have known provenance ✅ *team kit substrate (real Git repo, signed commits)*
- [x] Regulated data scope — GDPR/PCI/HIPAA/IP-sensitive code bounded ✅ *supplementary: `security-for-regulated-environments.md`*
- [x] Auto-approval blast radius — bounded, named, recoverable ✅ *M5 S exercise IS this*
- [x] Incident response — agent does something bad, can trace and revoke ✅ *supplementary: `security-for-regulated-environments.md`*
- [x] Trust boundaries between agents — no agent inherits another's authority by accident ✅ *M6 deliberation inherits constraints set in M5 S*
