# Content Strategy — Agentic Engineering 101

Third training in the portfolio. Skeleton → storyline. Updated 2026-04-21.

Paired with Engineering Management; the two pincer the transformation (manager creates conditions, engineers run at capacity).

## Positioning

**You become the Claude wizard.** The engineer who walks in is already shipping real work with Claude Code. Training takes competence to mastery — the kind colleagues call magic. Wizards have tricks, share tricks, never stop finding new ones.

**Day 1:** instructor opens with a wizard-level move on your own codebase — a demonstration of what's *possible*, not an exposure of what's missing — then invites you to show the trick you brought. Cohort harvests each other's self-taught moves alongside the curriculum's. Gift first, then climb. **Never sold as a gap-fix.** Engineers have pride and are often right; the training respects that.

*Rory: every competitor sells "learn Claude Code." We sell "become the Claude wizard." Engineers don't buy remediation; they buy status. Rename the thing you're selling and you change who shows up.*

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

**Self-taught means uneven practice, not uneven ability.** Two engineers on the same team have wildly different repertoires. Training pools tricks, levels the floor, raises the ceiling — never signals that anyone's current practice is wrong. It's partial. So is ours.

**Why narrow to software engineers:** the L3 path is most legible here (Intercom, Ramp). Coding agents are the meta-platform; software ICs already live in the tools. Adjacent variants later.

## The correlation at the heart of the training

**Theory × codebase-knowledge = durable leverage.** We supply the theory and the agents. You supply the codebase knowledge — *"here's what my system is really like, what's brittle, what pattern nobody's documented, what convention this team actually follows."* Agents amplify the multiplication.

Generic Claude Code usage without codebase knowledge = generic output that gets reviewed harshly. Codebase knowledge without a structured way of working with agents = expertise that doesn't compound. Both + agents = L3 velocity.

Dorsey's question at IC scale: *what does your understanding of this codebase gain every day?* The memory is where it compounds.

## The rule that governs everything

**Learning and good process happen as side-product of making good stuff. Only that scales.**

What motivates you is customer value + intrinsic satisfaction with the work. A training that bolts "improvement practice" onto real work fails — practice gets dropped when the sprint is on fire. **Compounding is the side-product of smart process.** Chase it directly and you get improvement theatre. *"If you just try to make a sprint to improve, you will not make this into habit."* Habit for you AND your agents — both compound from doing the work well.

## Recurring themes — the practitioner reality the curriculum lives inside

Six themes surface across modules. Not rules — rules tell you what to do. Themes tell you why the rules make sense. Each module hits multiple themes; each theme shows up in multiple modules. Named here once; compounded module by module.

**1. Claude is 90% correct.** Rule of thumb, not a benchmark. Ten percent of instructions don't get followed. Ten percent of requirements don't get woven in. Ten percent of what should have been read doesn't get read. The training's job isn't to eliminate the 10% — you can't — it's to teach the steering that catches it and the system that works regardless. Every module is an instance: M2's plan-mode push-back catches instructions-not-followed; M4's memory catches requirements-not-woven; M3's gate + M6's verifier catch what nobody read.

**2. The system is built by compounding. You can't imagine it a priori.** There is no reference architecture for agentic engineering. There is a loop — plan, work, review, compound — and each pass teaches what was missing. Next pass is better. Same shape at every scope: the bug fix (M1), the multi-file task (M2), the memory (M4), the long-running job (M5/M6). *"Give me the complete blueprint"* is the wrong question; *"run the loop"* is the answer. This is the epistemology, too: big-design-up-front fails precisely because the designer can't predict what the agent will get 90% right.

**3. The LLM is a mirror. Quality of practice reflects.** The operator is the ceiling — not the model, not the tools. An engineer who approaches the work with a learning stance makes their LLM learn. An engineer who types requests into chat gets chat-shaped output back. Also the answer to *"my colleague tried Claude and it sucked"* — their practice sucked. The mirror is diagnostic, not motivational: it shows parts of your practice you hadn't noticed yet. Uncomfortable, useful.

**4. The LLM is mechanically self-aware — ask it. (Grain of salt.)** Claude can introspect: what it thinks it can do, why it did what it did, what was missing in your prompt. That's the interface you use to run the other three themes — the compounding loop's Review step is a conversation with the model about its own output. The caveat is load-bearing: self-report is the least trustworthy channel. Claude confabulates reasons. Move: *ask, then verify against the artifact* — the file, the scrollback, the actual behavior. Introspection generates hypotheses; the artifact rules.

**5. The agent is trying — hard — to capture your world.** You are making a system that does its level best to capture your input in a smart way. It gets 90% right because it is guessing at your domain from partial context; your corrections are how it stops guessing. Every pushback, every rules-file rewrite, every *"no, like this"* is one more thing the system now knows about your world that no vendor could ship. Corrections are not error-handling; they are the curriculum. Steering is not the cost of using agents — steering is what makes the agents yours. This is the stance that turns theme 2's compounding loop from mechanics into teaching: you are the domain expert, the agent is the eager student, and the loop is the class. Engineers arrive worried the agent is replacing their judgment; the training inverts the frame — the agent is hungry for your judgment, and your steering is how it learns.

**6. Claude Code isn't agentic out of the box. Agenticness is made, not found.** The baseline you start from is non-agentic. Claude is trained on the internet, and the internet is not agentic — most code out there is copy-paste-and-tweak, most dialogue is one-shot Q&A, most writing is chat-shaped. That's the prior Claude inherits, and without steering, that's what it gives back. The best practitioners (Klaassen, Huryn, Cherny, Ronacher, Willison) don't buy an agent — they keep making their systems learn, over months, by writing rules, by updating memory, by noticing the non-agentic defaults leaking through and correcting them. Agenticness is an accumulation, not a setting. This theme is the sober counterweight to vendor narratives that claim *"install X and you're agentic."* You are not. You are a chat-shaped user of a non-agentic system until you invest the steering work — which is exactly what themes 2 and 5 describe.

**How the six sit together.** 90% names the problem. Compounding names the method. Mirror names the operator. Self-awareness names the interface — the channel you use to run the other three. Capture names the purpose — the reason running the loop matters at all. Non-agentic-default names the starting condition — why the loop is needed, why steering isn't optional, why the out-of-the-box experience is not yet the experience you're building toward. Miss any one and the training's mechanics look arbitrary; hold all six and every module's shape follows.

## Load-bearing assumptions

Three bets. If any is wrong, the training's shape needs a rethink, not a polish.

1. **Compounding and personal habit are the durable unit.** Tool versions decay; daily practice holds. *Falsifier:* day-91 self-assessment shows students falling off; confidence drops to pre-training.
2. **Agents can self-learn.** File-based memory + session retros + three-block structure = Claude gets better at serving *you* on *this* codebase. *Falsifier:* sessions stay fresh despite populated memory; memory becomes write-only.
3. **Everything is scaling of learning.** M1→M6 isn't six skills stacked — same compounding loop at successively larger scopes. *Falsifier:* students experience modules as disconnected; "my multi-hour work doesn't feel like my bug fix at scale."

Current evidence for all three: practitioner convergence (Klaassen, Huryn, Ronacher, Cherny); no longitudinal data yet. Each module is testable against its underlying bet — the assumptions are the spine, modules are bones hanging off them.

## Woven design rules — apply to every module and exercise

Two ambient rules threading every exercise. Design defaults — honoured, they surface naturally; neglected, leave you doing chat-shaped work that doesn't compound.

**1. The Compound step is visible in every module.** Plan → Work → Review → **Compound** (Klaassen). The fourth step is what makes the loop a loop. M1's Debrief is canonical — Claude reviews the session, rewrites the rules file in place. Every subsequent module has its Compound move, though not always in the same structural place: M2–M5 run it in the Debrief (Claude rewrites `CLAUDE.local.md` from session evidence); **M6 is the deliberate exception — the second-skill authoring in the exercise body IS the compound, so the Debrief opens room for a human round instead.** M3 also ships gate spec + constraint to team kit; M4 promotes observation → hypothesis → rule; M7 signs the technical decision document and feeds team kit. **Test on draft:** if a module produces an artifact without a Compound move that updates rules / memory / team kit / verifier / skill in place, the module is missing its fourth step.

**2. Specs over chats.** When the agent needs to do something non-trivial, *write the spec, point the agent at it* — don't type the request in chat (Klaassen). Markdown specs are the lingua franca: ADRs (M1+), judges + gate specs (M3 Q), blast-radius constraints (M3 S), plan.md (M5 long-running), verifiers (M5/M6), team kit contributions (M3+), technical decision document (M7). Chat is for the quick stuff and steering at decision beats. **Test on draft:** if an exercise has you type a paragraph of intent into chat where a spec would have served — and the spec would have been re-readable by a teammate — convert to spec.

**Rory:** every competitor teaches prompt engineering. We teach spec engineering — specs compound, chats don't.

## Terminology — memory vs context (load-bearing)

**Memory compounds; context feeds it.** Two terms, not interchangeable.

- **Memory** = persistent. Files that survive session close — `CLAUDE.md`, `.claude/memory/`, rules file, team kit, Huryn's three blocks. What the training teaches you to build.
- **Context** = ambient runtime state. Memory loaded in + files read + MCP-fed data + user input + tool results. Dies at session close. After Karpathy / Willison: *"context engineering, not prompt engineering."*

Software engineers fluent in Claude Code discriminate cleanly — *context* is the 200k-token window; *memory* is what the agent re-reads at session start. Blurring reads imprecise. MCP and connectors feed **context**, not memory. Don't say *"your context compounds"* or *"seed your context"* (you mean memory). The team kit is memory.

**One line:** *memory compounds, context feeds it.*

## Curation principle — we don't invent, we curate the best

**The training doesn't manufacture its own wisdom.** Specific skills and insights from the best practitioners — Klaassen's compound engineering, Paweł Huryn's three-block memory, Ronacher's long-running patterns, Willison's daily-practice notes, Cherny's file-based practice — each slotted into the module where it handles your actual blocker.

**Skill, not theory.** We import what's *doable on Tuesday*. Klaassen's four-step loop at M1 resolves "I don't know where compounding starts." Huryn's three blocks at M1 solve "my CLAUDE.md is six lines." Ronacher's plan.md at M5 keeps a multi-hour agent from drifting. Test for import: can you apply it in-session, on your own work, without more lectures?

**Student-blocker-specific deployment.** Skills don't arrive as catalogs. They arrive when you hit the blocker. Build around blockers, not concepts.

**Research system is the content pipeline.** Continuous-research surfaces practitioners and keeps the list current. When Opus 4.8 changes the long-running picture, M5's anchor skill gets re-sourced. Module content is mutable; curation posture is the durable part.

## Facilitation model — the Agentic Nerd, in both modes

**You have an *Agentic Nerd* running alongside you — classroom as well as self-study.** All-knowing companion you can ask anything, not a teacher. You are the wizard; nerd is the resource. Different authority gradient than "Teacher Claude" — you lead, nerd supports.

**What it does:** answers anything in-session; surfaces the right practitioner skill at the blocker (Klaassen's loop, Ronacher's plan.md, Huryn's three blocks — whichever fits); catches rubber-stamping (*"find me one row the judge got wrong"*); runs your Debrief. Delivery mechanism for the curation principle.

**Two-layer room is the whole point.** Human facilitator at 1:10 means rubber-stamps go uncaught, Debriefs stay generic. With an Agentic Nerd per student, the room becomes 10 parallel 1:1 sessions; human moves up to orchestration — wizard-demos, cross-room show-and-tells, sponsor moments, nerd-flagged escalations.

**Module-design implication.** Each module ships its Agentic Nerd logic — which skills to surface for which blockers, push-back moves for likely rubber-stamps, the module-specific Debrief prompt. Not a delivery afterthought.

**Skill architecture:**
- `self-study` (exists) — mode-specific facilitation: 4 Cs cadence, progress.md, folder switches, cohort-only beats. Self-study mode only.
- `agentic-nerd` (to create) — resource role: answer anything, surface skills at blockers, catch rubber-stamps, run Debrief. Both modes.

Current Bootstrap "Teacher Claude" conflates these jobs. Split clarifies: `self-study` owns mode delivery; `agentic-nerd` owns the student-facing role.

**Open for Pass 1:** classroom-mode Nerd share state across students (dashboard) or private? Tie-break when nerd and human trainer disagree? Runtime requirement per student (licensed Claude Code + Nerd session). Bootstrap rename sweep — migrate to Nerd terminology for portfolio consistency or keep "Teacher" for non-technical audience? Defer until the skill is written.

**Prep notes for the `agentic-nerd` skill** — fire triggers, core behaviours, relationships to existing skills, per-cohort contract handling — live in [`strategy/agentic-nerd-skill-prep.md`](../strategy/agentic-nerd-skill-prep.md). No skill file shipped until Antti says go.

## Four learning areas — two axes (how × technical)

Not a flat list. Two dimensions, two areas on each.

|  | **How (practice)** | **Technical (capability)** |
|---|---|---|
|  | **1. Compounding engineering** — personal flywheel. Memory grows with the codebase; skills accumulate; agents run while you sleep. The daily practice that stays current as the frontier moves. | **2. Long-running tasks** — Opus 4.7's sustained-execution capability made real. Hand the agent a multi-hour job, leave it running overnight, come back to a finished PR. The specific capability behind the L1→L2 leap. |
|  | **4. Team integration** — your work reaches colleagues. Factory components ship. Agents meet agents on real problems. The practice that turns personal leverage into team velocity. | **3. Software factory pattern** — the team industrialises production. Evals as quality-control infrastructure. Shared skills, orchestrators, MCP servers, meta-agents. The Intercom/Ramp endpoint. |

**Why two axes, not four line items.** Every module advances several dimensions at once — one-area-per-module would teach demos, not capability. You can't wield long-running tasks without the compounding practice to feed them context. You can't ship factory components without the team-integration practice to make them land. The training binds the axes so engineers leave with capabilities they can actually hold, not tricks they can't reproduce.

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

- **Block 1 — Codebase Knowledge Architecture.** Tiered store of what you know about THIS codebase. Observations (raw) → hypotheses → rules. Promoted when confirmed, demoted when contradicted. Domain folders: subsystems, failure modes, team conventions, personal patterns.
- **Block 2 — Decision Journal.** Every meaningful technical decision logged with forced alternatives — architecture, library, pattern, refactor scope. Claude searches priors before proposing new — no re-debating settled choices.
- **Block 3 — Quality Gate.** Project-specific testable criteria for shipped code. Catches promote to automatic gates; never-triggered checks get pruned. Sharpens around actual failure modes.
- **Swarm.** Diagnostic agent (reads codebase, surfaces patterns); gate-watcher (monitors PR quality); skills-builder (packages workflows for the team); orchestrator (drives multi-agent tasks). Scheduled, compounding.

## Six core modules + two optional extensions — the arc

Shape, not settled detail. Exercises designed case-by-case. Agentic throughout; chat-and-save banned. Six modules carry the cohort end-to-end. Two optional extensions sit on top when the cohort wants the team peak — same pattern as Bootstrap's public-site curriculum (Modules 7–8 · optional).

| # | Title | Lead dimension | Mood | Artifact |
|---|---|---|---|---|
| M1 | **Getting going + context** *(+ MCP)* | Compounding (how) | Joyful creation — *"it works, on my repo"* | Three-phase loop on a trivial bug from your own backlog: P1 orient + introspect (`/context` shows the unread slice); P2 fix tests-first, no plan mode, seed `CLAUDE.md` mid-exercise; P3 retro extends `CLAUDE.md` + wire one connector + close the bug's ticket outside the repo. No Skill use at M1 — first Skill use, first subagent, first authoring all land together at M3. |
| M2 | **Plan mode, done right** | Compounding (how) deepens | Grounded competence — *"I can feel when a plan is good before approving it"* | A well-designed plan on multi-file work you actually have to do, pushed back on before approval, executed, and retrospectively named as plan-mode-at-depth. Plan-mode approval inflation catches as the key teaching moment. |
| M3 | **Earn the trust — quality + security** | Software factory (tech) + team integration (how) via team-kit seed + **first authored skill** | Earned trust — *"the way I work with agents is something my staff engineer and my CISO can sign off on, before I even try anything big"* | Three exercises on a small feature you're shipping: (1) invoke curated access-control analysis skill, name surface delta; (2) invoke curated STRIDE skill, pick one hardening decision → ADR; (3) author a test-strategy skill through conversation with Claude, ask it to disclose its weakest part, invoke on the security-tested feature, ship personally first. Two curated skills used, one authored skill shipped. The test-strategy skill is team-shaped by nature (encodes codebase conventions); the team PR is a strong follow-up that starts with a human conversation, not an agent commit. Team kit is SEEDED here and grows by accretion as students promote skills that earned their keep. |
| M4 | **Accumulate + run the first experiment** | Compounding (how) + long-running (tech) | Curious readiness — *"I've built enough to try; let's see what the agent does"* | Pick the multi-hour task → walk what you've built against it → fill the worst gaps → see Huryn's three-block frame in your own material → **send off un-packaged** (no plan.md, no verifier, no reference artifact). The result will be "not great" by design — that's the data M5 reads. |
| M5 | **Learn from the test, re-send packaged** | Long-running (tech) + compounding (how) | Learning through contrast — *"I can feel what packaging adds now; I couldn't have read it as a lecture"* | Return to the un-packaged run → name what went wrong → teach Ronacher's three-pattern (reference artifact + plan.md + external verifier) through diagnosis of the M4 failures → build the verifier (first eval, named) → assemble reference + plan → **re-send the same task, packaged**. Second experiment: same task, changed variable. |
| M6 | **Spot gaps, build the loop** | Long-running (tech) + compounding (how) + team integration (how) + **second authored skill** | Practitioner fluency — *"I know how to test, I know how to learn, I know how to encode"* | Return to the packaged run. Diff against the un-packaged baseline. Subtler gaps now — drift, verifier blind spots, rules that would have prevented the subtler miss. Author the second skill — the learning loop packaged (verifier / judge / gap-finder — shape follows what the two runs taught). Ship to team kit. |
| M7 *(optional)* | **When agents meet agents** | Team integration (how) peak + software factory peak | Awe + ownership | Live deliberation on the CTO's real engineering problem, grounded in every participant's codebase knowledge AND the cohort's accreted team kit. Technical decision document produced by the room. |
| M8 *(optional)* | **Where is this all going?** | Human close | Open question — *"nobody plain knows"* | Opinion / fear / hope round + Antti's lecture of the future. Closes on directness, not triumph. Optional because a cohort that stops at M6 still lands a complete training; a cohort that wants the full arc takes both M7 and M8. |

**Agentic walk-away test:** by M3 onward, you walk away from the desk and find the agents still working. If every artifact requires typing, the exercise failed the rule.

**Real-work requirement (universal across modules):** examples, cases, bugs, PRs, and references come from your own company and codebase. Not toy data. Not case studies of other firms dressed up as exercises. The training lands only when the artifacts are yours.

## Mood arc

**joyful creation → grounded competence → earned trust → curious readiness → learning through contrast → practitioner fluency → *(optional: awe + ownership → "where is this all going?")***

**M4–M6 spirit: you are testing, and you are learning.** The arc is **test → learn → encode.** M4 runs the first experiment (un-packaged send-off); M5 reads the result, teaches packaging through the contrast you just felt, and runs the second experiment (same task, packaged); M6 reads that result, encodes what two runs taught into a skill for the team kit. Every send-off is an experiment, not a production run you need to get right first time. This is the operator's posture at L3 — and the frame that makes evals, verifiers, and plan.md earn their names through felt need, not prescription.

Core (M1–M6) runs through personal discovery, instrument mastery, discipline-earned-before-you-need-it, and then a three-module experimental cycle — curious readiness, learning through contrast, practitioner fluency — that turns a long-running task into a sequence you run on yourself. Less dramatic stew than Bootstrap; deliberate linear ramp that suits the wider audience band (novice → mid-level) without dropping anyone. Discipline installed early (M3 Q+S before M5 send-off) means you *feel* covered when you push the agent off for hours, not retrofitted after.

**Optional (M7–M8)** carry the peak the core can't fit in six. M7 is the room's collective agency — cohort agents on a shared runtime, real engineering problem, technical decision document live. M8 is the human close — opinion/fear/hope + Antti's lecture of the future.

Leadership drama is absent; drama is in your interior (*am I still keeping up?*), the team's infrastructure (*is our floor rising?* — team kit makes this visible), and M8's deliberate refusal to close the big question. *Where is this all going?* — nobody plain knows. The question is what you carry home.

## M1 in detail — getting going + context

**Three exercises, one loop** (reshape 2026-04-23 late: split from one mega-exercise to three shared-library exercises; connective tissue is the same repo + same bug carried across):

1. **`orient-and-introspect`.** Claude reads the repo; you interrogate Claude's own read via an introspection prompt + `/context`. The bounded window and the unread slice become visible.
2. **`fix-tests-first`.** No plan mode. Tests-first, root-cause-driven. Ship the PR. Stop there; the compound step lives in Ex3.
3. **`compound-and-close`.** Claude reviews the full session (Ex1 + Ex2) and writes `./CLAUDE.local.md` from evidence — no Q1/Q2/Q3 interview, no pre-existing rule being extended; the rule is born here. Short MCP framing (connector / action / tool); wire one connector and close the bug's ticket outside the repo. MCP install specifics live in `curriculum/reference/mcp-and-connectors.md`, not in the exercise body.

**Why three exercises, not three phases.** Each move is a distinct skill with its own artifact: Ex1 produces the delta between Claude's self-report and `/context`; Ex2 produces a shipped PR; Ex3 produces `./CLAUDE.local.md` (born from session evidence) + the closed ticket. Three natural pause points where the Nerd can catch rubber-stamping. Matches M3's three-exercises-on-one-feature shape. The compound loop end-to-end survives because artifacts chain: Ex1's read scopes Ex2's fix; Ex2's session is what Ex3 compounds.

**Orientation is short, not a setup ramp.** Prework has done Claude Code install + repo-choice + bug-surfacing. M1 starts in the chat with the repo open; Ex1 is a read-and-introspect move, not a connector-wiring step. MCP lands at Ex3 against a real job (ticket close-out) you just earned.

**Themes plant experientially** (§ "Recurring themes"): mirror (Ex1's repo read reflects your prompt); self-aware + grain of salt (Ex1's introspection prompt; Ex3's compound summary; verify-against-artifact in both); 90% correct (`/context` makes the unread slice visible); compounding (Ex3's rule-write is the first compound step; every module after M1 extends it).

**No plan mode in M1.** Restraint is deliberate — M2 owns plan-mode-at-depth on multi-file work. Running plan mode on a trivial bug is overhead. M1 teaches where plan mode *doesn't* earn its keep, by contrast.

**Huryn's three-block memory is seeded, not named.** Materials land through the phases (observation at P1 → Block 1 candidate; TDD rule + diff push-back → Block 2 candidate; the failing test → Block 3 candidate). The three-block *frame* earns its name at M4 when materials get rearranged. Don't teach three-block at M1 — that's pre-explanation.

**Klaassen attribution** happens inside Claude's Ex3 retro summary — the retro prompt asks Claude to name the shape and cite the practitioner if one fits. Peer recognition, not a lecture.

If you leave with only a bug fix, M1 failed. If you leave with a `./CLAUDE.local.md` written from session evidence, a PR shipped, a ticket closed via a connector, and mirror / grain-of-salt / 90% experienced (not lectured), M1 worked.

*Naming: canonical "compound engineering" per Klaassen; our learning-area name "compounding engineering" is our framing; "compound" reserved for the Klaassen loop step.*

**No Skill use at M1 — resolved 2026-04-23.** Prior strategy had *"1–2 pre-installed skills invoked during the bug fix."* Dropped: Ex1 uses `/context` (slash command, not a Skill), Ex3 uses MCP (connector, not a Skill), and M3 now carries the first Skill use + first subagent + first authoring together — which is the right concentration. One primitive introduced per module, earned at the moment you need it.

## M2 in detail — plan mode, done right

**Plan mode at depth.** M1 used it on a trivial bug; M2 is the subject — what a good plan looks like, what two reads (human + agent) catch that one doesn't, where plan-mode approval inflation bites. Mood: **grounded competence** — *"I can feel when a plan is good before approving it, and I know the move is two reads, not one."*

**Core exercise — pair the reads, stop at approval:**
1. Student picks a multi-file task from backlog (~30–60 min of agent work).
2. Enter plan mode, read the plan carefully before touching approval.
3. **First read — two push-backs via *keep planning with feedback*.** One soft item (the step that reads clean but skips something) + one of (assumption OR committed change). What YOU can see. Claude regenerates. Watch for softening-on-regeneration (RLHF-niceness tell inside plan mode).
4. **Second read — walk-down-branches prompt, inlined.** Claude walks down unresolved branches of the decision tree one question at a time, recommending an answer per branch. Student confirms or corrects each. Claude incorporates into a sharpened plan. The move is Matt Pocock's Socratic-elicitation pattern (his `grill-me` skill, MIT, forked to `curriculum/skills/external/pocock-skills/grill-me/`) inlined as a plain prompt so M2 doesn't front-run M3's first-Skill-use moment. The skill reveal — *"that second-pass read was a skill all along; here's how you author one"* — lands in M3 as authoring material.
5. **Approve. Stop. No execution.** You do not run the code. The exercise is about reading a plan well; execution is M3's concern.
6. **Retrospective names the pattern.** What did grill surface that push-back didn't? Would it have mattered? The design pattern: *human read → push-back → agent read → grill → approve.* One kind of scrutiny catches one kind of miss; paired, they give the complete read.

**What M2 refuses:** plan mode as a feature tour (it's a discipline, not a toggle); three-push-back-quota (n=3 produces a performative third one, killed in v3 reshape); plan-execution (the work of making a plan good IS the exercise; running the code is different-skill territory).

## M3 in detail — earn the trust (Quality + Security), before you need it

**Veto-stakeholder module, moved earlier.** Three exercises on a small feature you're shipping — **S-first, then Q.** Lifted from the earlier 1h30 compact to match the rhythm of the other modules; three exercises + richer Debrief warrant it. Runtime lives in the module file. **Team kit born here.** Discipline installed before M5's long-running send-off, so you never feel exposed.

**Why curated-then-authored.** Students USE two curated skills for security, AUTHOR one of their own for quality. STRIDE authored by a novice = Wikipedia copy-paste; test strategy authored by an engineer on their own codebase = *theory × codebase-knowledge* — the correlation at the heart of the training. The proportion shown:authored matches the claim: we curate; you build.

**Why S-first.** The test-strategy skill (Ex3) invokes on the feature that's already been access-mapped and threat-modeled. Abuse cases STRIDE surfaced become test cases. Q consuming S's output is denser pedagogy than two standalone beats.

**Feature rule — pedagogy, not prescription.** Student brings a small feature they're shipping this week. Too small: Claude crunches it in thirty seconds with nothing interesting to surface. Too large: still waiting when the bell rings. Students have already seen how quickly Claude works across M1–M2; trust their calibration. Connections framing, not a checklist.

**Subagents introduced, deliberately.** Ex1 and Ex2 invoke the curated skills **as subagents** — fresh context, black-box run, structured output lands back in the main thread without polluting scrollback. Long, breadth-first skills belong in subagents; the primitive earns its first visible use at exactly the module where curated skills make their first visible use. Ex3 (test-strategy authoring) stays in the main thread — one-question-at-a-time conversation is *not* a subagent job, and the contrast is half the pedagogy. You leave M3 knowing which jobs belong in which thread, not just that subagents exist.

**Exercise 1 — Map the access surface (S primer).** Invoke the curated access-control analysis skill on the feature **as a subagent**. Read what it surfaces. Decide: which surface did it flag that you'd underweighted? What did it miss that you know matters? Name the delta — this is the access-mapping that STRIDE will consume.

**Exercise 2 — Threat-model with STRIDE (S main).** Invoke the curated STRIDE skill **as a subagent** on the mapped access surface. The skill does the breadth (six categories against every surface); you make one call — pick the threat worth hardening against, write the decision as an ADR in the repo's convention (sponsor-stated home; default `docs/adr/NNNN-slug.md`). The framework picks the threat if you've named the worst case right. No menu-shopping.

**Exercise 3 — Author your test-strategy skill (Q).** Author through conversation, not a markdown editor. You prompt Claude to ask the questions needed to encode a test-strategy skill for THIS codebase — framework, mocking policy, integration boundary, what "flaky" means here, what regression scope looks like. One question at a time (prompt says so — otherwise Claude dumps all five). Claude writes SKILL.md at `~/.claude/skills/test-strategy/SKILL.md` (personal, auto-discovered in every session); you push back on codebase specifics. **Force-push-back move:** ask the skill to disclose its own weakest part before shipping. You push back on the self-critique — which is the reflection move; this IS theme #4 (mechanically self-aware) used as designed. **Invocation closes the loop:** run the skill on the security-tested feature, prompt Claude *"go check the test strategy related to the feature — is it good?"* Ship personally first. **Team PR is the natural follow-up, mediated by human conversation** — the skill encodes codebase conventions teammates share, so it's a strong PR candidate, but agents don't unilaterally change shared team infrastructure. The move is: show it to teammates, get their read, PR if they agree.

**Curated skills ship with the training, installed as personal skills at prework.** Source files live in the content folder (`content/skills/access-control-analysis/SKILL.md`, `content/skills/stride/SKILL.md`). **Prework installs them to the user-level Claude Code skills directory** (`~/.claude/skills/access-control-analysis/SKILL.md`, `~/.claude/skills/stride/SKILL.md`) so Claude Code auto-discovers them in every session you run during the training, regardless of which repo the session is open in. The install is agentic — you ask Claude to install the training's curated skills from the content folder; Claude writes the files to the user-level location; no shell command you type yourself. Once installed, you invoke by name (*"invoke the access-control-analysis skill on the feature I'm shipping"*) — no path, no content-folder leak into prompts. Training IP — Bosser-curated, lecture attributes sources (Kohnfelder & Garg for STRIDE origins; Shostack for sharpening; Saltzer & Schroeder for least-privilege lineage). Not team-kit contributions — curated-for-you stays in your personal skills directory; authored-by-us (the test-strategy skill) goes to the team kit. Clean separation. **Removable after training** in one instruction (`rm -rf ~/.claude/skills/access-control-analysis ~/.claude/skills/stride`) — personal, not permanent.

**Team-kit accretion from M3 onward.** Every student ships personally; some fraction will promote to the team kit via human conversation with teammates (days or weeks after the authoring session, not the same hour). By M6's second authoring and M7's deliberation, the team kit has accreted the skills that earned their keep through real use. The visible artifact by M7 is smaller than "every skill every student authored" but more honest — it's the skills teammates actually said yes to.

**What M3 refuses:** frame Q+S as compliance (they're infrastructure); ask you to author STRIDE or access-control from scratch (novice-authoring = Wikipedia copy-paste); ask you to spot-check Claude's skill output manually (the self-critique move puts Claude in the critic seat, where it belongs — check_student_facing #9); skill-authoring by opening a markdown editor (the authoring move is conversation, not keyboard-crafting).

**Anchor cases:** Intercom Tier 1/2/3 review (19.2% auto-approved at lowest tier — tiered-review is shippable); Intercom's 267-skill plugin repo with 31% R&D contributing (team-kit accretion pattern). STRIDE lineage: Kohnfelder & Garg (1999 Microsoft memo) + Shostack (*Threat Modeling: Designing for Security*, 2014).

## M4 in detail — accumulate + run the first experiment

**Spirit: testing and learning.** M4 doesn't prepare, it tests. You walk what you've built against a task you care about, fill the obvious gaps, and send off — un-packaged — to see what the agent does with your system as it stands. The result will be instructive: not catastrophic, not polished, somewhere in the middle. That middle IS the lesson M5 reads.

**M4 is the first experiment of a two-run arc.** Same task runs twice across M4 → M5, with packaging as the changed variable between runs. The contrast teaches what no lecture could — what Ronacher's three-pattern (reference artifact + plan.md + external verifier) actually adds. M5 teaches packaging by diagnosing M4's failures; M6 encodes what two runs taught.

**Four exercise moves + module-level close:**

Exercise (Phases 1–3, inside the exercise file `walk-and-send-off.md`):
1. **Pick the task.** You arrive with **one or two candidates** you've surfaced yourself (Connections prompts this). Claude **screens** — reads each candidate against three criteria (sustained coherence, requirement-weaving, multi-file reasoning), returns fit / marginal / wrong-shape with reasons. The picking is your judgement; the screening is the agent's. **Claude CAN read a wired tracker (Linear / Jira / GitHub Issues via MCP) when asked** — but sending Claude off to hunt without rules for what fits produces noise. If you want tracker-assisted surfacing, give Claude the criteria first (size, sustained-coherence shape, what's been sitting) and treat its output as a shortlist to judge, not a pick. The task stays the same through M4 and M5's re-send — we're changing prep, not goal. Scoped task lives in scrollback (or a short repo note if you prefer).
2. **Walk what you've built.** Claude audits (as a subagent) the root `CLAUDE.md` + memory files + ADRs + the M3 test-strategy skill + wired connectors against the task. Returns a ranked top 5: what's thin, missing, or wrong *given this task*. Framework named: **gap analysis** — walk the system you have against the system the task needs. Student picks the ones that will hurt the agent most — usually two or three, not all five (the sponge-not-rock rule applies: M5 teaches what the others were for).
3. **Fill the worst gaps.** New observation written, rule articulated, business-rules pointer wired at the sponsor-stated home (or gap named — *"we don't have this; the gap IS the finding"*). Additional connectors the task will need get wired now, while your mind is on the task.
4. **See the three-block frame.** Claude rearranges the now-thicker memory into **Huryn's three blocks** — Block 1 (observation → hypothesis → rule), Block 2 (decisions with alternatives — ADRs already live here), Block 3 (quality criteria — the M3 test-strategy skill contributes). Frame earns its name through recognition: Claude quotes one of your own ADRs as the Block 2 example before naming the frame.

Module-level close (owned by the module file's Debrief + Bridge):
5. **Debrief — compound CLAUDE.local.md.** You nudge the compound step: Claude rewrites your personal rules file from session evidence and reports a 3–5 line summary; you push back where it misread. The rules file is going into the test with you.
6. **Send off, un-packaged.** You pass the final prompt to the **same Claude Code session** (no new session, no `/schedule`, no cloud runner). No plan.md, no verifier, no reference artifact — just *"here's my system, go do X."* Laptop stays awake overnight, or you watch and stop mid-run when you've seen enough. **Traces are data either way.** You never owe the experiment a completed artifact — you owe it a result you can read.

**Mood: curious readiness** — *"I've built enough to try something; let's see what the agent does with it."* Stakes back in the room; no compliance framing.

**Themes earned**: compounding (four modules of practice now visible and rearrangeable); mirror (the un-packaged run will reflect your actual prompting + memory quality straight back — the mirror is about to show you something); 90% correct (the send-off sets up the felt experience of the 10% that M5 will diagnose).

**Task-design requirement — load-bearing.** The task must be hard enough that an un-packaged run will be "not great." Sustained coherence, requirement-weaving, multi-file reasoning. Otherwise the contrast M5 teaches on doesn't land. If the task is simple enough to succeed un-packaged, it's the wrong task. The Nerd helps calibrate at pick-time — sponge, not rock. The un-packaged run has to underdeliver visibly, not fail catastrophically.

**Why here, not before.** Accumulation without M3's Q+S discipline grows without quality criteria that mean anything; Block 3 stays abstract. With M3's judge + gate + authored skill in hand, quality criteria are real. What M4 thickens is grounded in actually-shipped work.

**Cancel mid-run is legitimate — not a fallback.** Real practitioners stop long-running agents when early traces reveal the failure mode; no need to burn hours to know it wobbled. M4 names this at Debrief so students don't confuse *experiment completion* with *module completion*. The module completes when you have read a result — any result the traces contain.

## M5 in detail — learn from the test, re-send packaged

**Spirit: testing and learning.** M5 opens with the return. Student reads what the un-packaged M4 agent produced. Not great, as the task design guaranteed — drift, missed requirements, plausible-but-wrong. That result IS the teaching material. *What would have caught this at hour 2, not at hour 6?* The question drives everything M5 does.

**The pedagogy is contrast, not prescription.** Ronacher's three-pattern lands here — but not as a best-practices lecture. Each piece (reference artifact + plan.md + external verifier) earns its name as the thing that would have caught a specific failure you just read in the M4 artifact. Engineers respond to diagnosis, not prescription.

**Delivery shape (three lectures plus exercise plus Debrief).** M5 is the only module in the arc that earns a closing meta-lecture (compounded rule: meta-frame lectures are closers, not openers — they land AFTER the student lives the pattern). The three lectures sit in semantic positions on the page, not all under one heading.

- **Pre-read** (`lectures/reading-the-return.md`) — lands at the close of M4 Debrief while the un-packaged run is going. Plants the M5 question and the three failure-mode vocabulary. Deliberately does not name the three-pattern.
- **In-room opener** (`lectures/learning-through-contrast.md`) — lands at M5 session start, after the room has gathered. Names the M5 spirit (*read first, fix later*) and the diagnostic stance. Restates the three lenses in one breath each for anyone who didn't pre-read. Names one operational primitive (manual `/compact` at ~60%) for the active diagnosis session, then carries an FAQ ("what if I'm not there to compact?") that bridges to what packaging actually does for hands-off runs (descriptive only — the Ronacher names earn in the closer). Both lectures included in the module's `## Lectures (before the exercise)` section.
- **Exercise** (`exercises/diagnose-and-resend.md`) — four phases. Phase 1 read the return through the three failure-mode lenses; Phase 2 align-then-run-in-reverse to earn the three-pattern; Phase 3 build the verifier shaped against the dominant failure using Cherny's three-shape menu; Phase 4 assemble the reference artefact + plan.md in conversation.
- **Debrief + re-send** (owned by the module file) — self-compound `CLAUDE.local.md`, then re-send the same task packaged. Mirrors M4's send-off-in-Debrief shape.
- **Closing lecture** (`lectures/what-packaging-is.md`) — included in the module's `## Closing` section after Debrief. Names Ronacher's three-pattern from felt evidence, attributes Cherny's three stop-hook shapes, anchors at org scale with Intercom 2x numbers, names two extension primitives the student didn't build (subagents-for-isolation, /compact at ~60%), names the Sourcegraph Amp counter-camp, and bridges to M6 (your verifier IS your first eval).

All three lecture files carry a maintainer-block source-verification list — every URL must be opened and confirmed against the original before first cohort.

**Five moves:**
1. **Return to the un-packaged run.** Read the artifact together — you + Claude. Name what went wrong: drift, hallucination, goal confusion, missing context, requirement-skipping. Claude points out patterns you miss. This is the first time the 10% has shown up at scale — direct experience of *"Claude is 90% correct"* (theme #1) at multi-hour scope.
2. **Teach the three-pattern through contrast.** For each failure: *what would have caught this?* A reference artifact with success criteria would have pinned X. A plan.md the agent could re-read would have stopped Y's drift at hour 2. A mid-run verifier would have surfaced Z before it compounded. The three pieces earn their names from the M4 evidence, not a whiteboard.
3. **Build the verifier.** **First eval, named.** The verifier isn't testing-adjacent or eval-ish; it *is* an eval — an automated check that decides whether agent-produced work meets a quality bar. Anchor cases: Ronacher's MiniJinja validation loop (reference artifact + align-then-run), Cherny's three stop-hook shapes (background-agent / shell-hook / Ralph re-feed), Intercom Tier 1/2/3 (gate in CI, 19.2% auto-approved at lowest tier). Your verifier is shaped against the specific failures M4's run surfaced — tests, lint, compile, bash hook, or a minimal judge. Practitioners call these judges when they're LLM-based, verifiers when deterministic, gates when placed in CI; all three are evals.
4. **Assemble reference artifact + plan.md.** Package what M4 walked-and-filled into the agent-readable spec: scope + success criteria, pointing at the relevant memory pages and skills, plus a task-local plan.md the agent re-reads when it drifts. Built in conversation with Claude, not typed into a markdown editor.
5. **Re-send the same task, packaged.** Second experiment. Same variables except the packaging. Agent runs again — overnight (2-day intensive) or a few hours in-session with the verifier firing as it works (gives the room something to watch), or a week (6-week format). Student closes the laptop the second time.

**Mood: learning through contrast** — *"I can feel what packaging adds now; I couldn't have read it as a lecture."* You know *why* the three-pattern matters because you just read the failure modes it exists to catch.

**Themes earned**: 90% correct (the move that catches the 10%, felt directly this time); evals as infrastructure (the word earns its full weight through diagnosed contrast); mechanically self-aware + grain of salt (Claude's read of its own M4 run verified against the artifact).

**Format dependency.** 2-day intensive: M4 ends day 1, un-packaged run overnight, M5 morning of day 2 teaches from the return + re-sends packaged, re-run happens day-2 afternoon while the room covers transitions + M6 prep, M6 opens with the second return. 6-week format: one extra week vs. the old single-run shape — M4 wk N send, M5 wk N+1 re-send, M6 wk N+2 return.

**Open — Pass 2 dependencies:** canonical task shape + execution target for overnight/week runs (laptop vs. scheduled) pending capability check on Opus 4.7 long-running behaviour.

## M6 in detail — spot gaps, build the loop

**Spirit: testing and learning.** Two runs in the pocket now. The un-packaged M4 run (baseline) and the packaged M5 re-run (second experiment). M6 returns to the packaged run — subtler misses this time, subtler drift. You read for gaps the verifier didn't catch, for rules that would have prevented the subtler mistake, for the next turn of the learning wheel. **Encoding is the third phase of test → learn → encode**: what two runs taught, packaged so future runs inherit it.

**What you walk away with:**
- *I know how to test.* Every long-running send-off is an experiment — hypothesis about the prep, data from the run, lesson for the next one. Not a production run you have to get right first time.
- *I know how to learn.* Reading an agent's artifact for gaps — drift, thin memory, missing rules, verifier blind spots — is a trained eye, not a protocol. Two runs gave the eye its first reps.
- *I know how to encode.* The loop that turns a lesson into rules the next run inherits — memory update, verifier sharpening, skill packaging — each a turn of the same wheel. The loop is the shippable thing; artifacts are downstream.

**Three moves:**
1. **Diff against the baseline.** Read the packaged run alongside the un-packaged one. Where did the packaging catch what it was meant to catch? Where did it not? What new failure modes surfaced that the three-pattern didn't anticipate? The contrast across two runs teaches what one run couldn't.
2. **Name the gaps, name the loop.** Claude as co-reader, not quizmaster. What rule would have caught this upstream? What check, if it had fired mid-run, would have surfaced the drift earlier? What belongs in memory? What belongs in the verifier? What belongs in a new skill? Each answer is one turn of the learning wheel.
3. **Package the learning system.** **Second authored skill**, written through conversation (mirrors M3's authoring move — not by opening a markdown editor). The skill IS the loop: *"here's how to spot a gap of this shape next time; here's the check that catches it."* Shape follows what the two runs taught — often a sharpened verifier, often a judge, often a gap-finder. Shipped to the team kit.

**Opener — Story of Module 6.** M6 opens with a short first-person lecture from the trainer about how this module itself was generated, run as the M5 move on its own work. Plain stats from the generation session — turns, nudges, banned-word slips, reframes reversed — then the concrete things that went sideways, then the generalisation (*everyone struggles; surprises happen; the LLM is not a deterministic machine*), then a short beat on what the trainer did with the misses (*"then I continued to make the compounding from the run"* — skills authored, rules amended, forcing functions landed), then the landing that hands off to the student's own loop. Permission-giving, not credibility-performance. Goes first because permission works before the work, not after. The module's earning moment (practitioner fluency) lives at the closer, not here.

**Forward-looking beat — arc-named retrospective.** Between exercise and Debrief, you ask an agent to read your M1–M6 artefacts — root `CLAUDE.md` / `CLAUDE.local.md`, memory, ADRs, both authored skills, the M4 un-packaged run, the M5 packaged re-run — and write a one-page note on what changed across the six modules. The agent names the arc retrospectively from your own evidence, not a trainer's monologue. Lands the *"everything is scaling of learning"* throughline. For core-only cohorts (no M7/M8), this is the visible compounding moment the deliberation module would otherwise carry. Runs as a second standalone exercise alongside the main three-move exercise; shared-library file so EM and other variants can adopt the shape.

**Debrief — simple round, trainer and group leeway.** M6 closes the core. Default shape: each person speaks briefly on one key learning and one personal thought about the future. Human-voiced, not agent-mediated. Trainer and group choose the exact form — pair exchange, whole-room round, silent write-then-share — and the Agentic Nerd stays out of it. The canonical M2+ self-compound pattern doesn't run here; the encode step already happened in the second-skill authoring, and the round makes room for the human close that practitioner fluency warrants. Self-study variant: Teacher Claude invites the same two-part articulation in conversation; scrollback carries it; optional keepsake note if the student wants one.

**Mood: practitioner fluency** — *"I know how to test, I know how to learn, I know how to encode."* Not confidence-as-performance; competence-as-posture. You close the laptop at M6 holding the move, not just the file.

**Evals, named and explained.** M5 gave you your first eval (the external verifier at M5's diagnosis-driven build); M6 is where the word earns its full weight. Quick framing — not a lecture in disguise — *"your verifier is an eval; your judge is an eval; your gate is an eval. An eval is the automated check that says *this agent-produced thing meets our bar*. Practitioners call them judges when LLM-based, verifiers when deterministic, gates when placed in CI. All three are evals."* Anchor cases: Ramp Dojo (350-skill marketplace), Intercom Tier 1/2/3 (19.2% auto-approved, 14.6 min vs 75.8 min org median). The loop-shaped skill authored at M6 IS an eval — that's not incidental, that's the move.

**Scheduled agents — callout, not an exercise.** The two-run send-off pattern generalises to a scheduled agent running on cadence — `/schedule`, `/loop`, cron-triggered runs. A competent engineer leaves knowing the primitive exists, when it fits (standing verifier runs, nightly codebase sweeps, rule-drift monitoring), and how it composes with the loop they just built (their skill becomes the thing the scheduled agent invokes). Not an authoring exercise in core — lands naturally post-training or in a followup module.

**Themes earned**: self-aware + grain of salt (the whole module is conversation with Claude about Claude's output across two runs; the artifacts rule, the self-reports don't); compounding (Klaassen's Review + Compound step made explicit across two runs of the same task — true iterative encoding, not a single-pass retrospective).

For a core-only cohort, M6 lands on practitioner fluency — *"I know how to test, I know how to learn, I know how to encode."* For M7+M8 cohorts, that fluency is what makes M7's deliberation feel earned — you arrive at M7 knowing you can steer a learning system, not just attend a panel.

## M7 in detail (optional) — when agents meet agents

**The peak deliberation module** — the +3 cognitive climb. Awe + ownership as mood. The module exists when the cohort has appetite; the core runs cleanly without it.

### The deliberation

Each participant's M1–M5 stack — codebase memory, factory components, judges, gates, constraints, contributions to the team kit — arrives at M6 as a **first-class agent on a shared runtime**. The room's agents deliberate live on a real engineering problem fed in by the CTO at the start of the cohort.

**The fuel — a real engineering problem.** The CTO picks one the company is genuinely sitting on:
- A migration plan (monorepo ↔ polyrepo; on-prem → cloud; language/framework migration)
- An architecture decision with cross-service blast radius
- A platform choice with codebase realities the vendors' sales decks don't know about
- A performance or reliability pathology spanning teams
- A refactor too big for one engineer to hold in their head

**The heterogeneity is the insight.** No individual holds the whole picture. The queue handler's quirks live in one engineer's memory, the auth layer's debt lives in another's, the deploy pipeline's scars live in a third. The deliberation assembles it.

**The team kit is what the deliberation reads first.** Each agent loads the cohort's accreted contributions (skill-shaped judges, gates, constraints, verifiers) before joining the deliberation. The infrastructure the room raised across M3's birth → M6's accretion is what makes M7 possible. *That's* the visible compounding — by M7 you see the floor you collectively raised over six modules.

**The mechanism is visible.** Students read every message and `@mention` in the transcript. Humans contribute by talking in the room AND by steering their agents at decision beats — they don't run the plumbing.

**Artifact:** a technical decision document — engineering equivalent of Rumelt's kernel. Diagnosis of the load-bearing obstacle, guiding policy, ranked assumptions, named experiments to run Monday. Signed by the room.

## M8 in detail (optional) — where is this all going?

The training closes on directness, not triumph. As an optional module (up from the closing beat of the previous 6-module shape), it gets room to breathe — the lecture-of-the-future can run longer, the opinion/fear/hope round can go deeper, the room can sit with uncertainty instead of rushing to a next beat.

**The shape (optional module length — runtime in the module file):**

- **Opinion / fear / hope round.** Each student speaks briefly from each register:
  - *Opinion:* what they actually think about where agentic engineering is going
  - *Fear:* what they're quietly worried about (own obsolescence, team readiness, craft erosion, what happens to junior engineers)
  - *Hope:* what they want to happen for their work, their team, their practice, their next three years

  The vulnerability of naming fear and hope alongside opinion is part of the pedagogy. With a full module of runtime (vs. the compressed version's brief round), each register gets real air, and the room can sit with what was said instead of moving on.

- **Antti's lecture of the future.** Risto-style directness: *here's how I see it, including what I don't know, including what I've been wrong about before.* Names directions, names uncertainties, names what they're betting on. The Rory discipline: counterintuitive reframes over obvious takes. The Seth discipline: warmth and generosity, not posturing.

- **Open-question close.** No worksheet. No 90-day plan. What's left is the question each student carries home.

**What M8 refuses to do:**
- Close the big question. *Where is this all going?* is left open, on purpose.
- Confer an identity ("you are now an agent builder"). Engineers are already engineers; the training sharpens, doesn't re-name.
- Pretend the team-work answers arrived in the training. They didn't. Saying so out loud is part of the directness.
- Package into a 90-day commitment plan. Students leave with the question, not with a worksheet.

**Why optional.** Core (M1–M6) with grounded rescue at M6 is a legitimate close. M8 exists for cohorts whose sponsor wants the full arc. **If opted-in, M7 and M8 run as a pair** — M7's team deliberation primes M8's *"where is this going?"* with real artifacts, not abstract speculation.

**Open questions inherited from Bootstrap M8** (tracked): runtime dependency on Cowork trajectory; bridge if capability still landing; whether orchestrator-agent ships as scaffold or generated on-the-fly; F-Secure copyright fence. See `memory/project_m8_joint_panel.md`.

**Self-study variant.** Opinion/fear/hope round happens in writing with the Agentic Nerd as listener; lecture-of-the-future is pre-recorded or written; M7 uses persona-stand-ins from your own agent stack.

## Skills — using and authoring, threaded across modules

Skills are a first-class capability in Claude Code (scoped, named, reusable moves the agent can invoke). The training makes skills visible from hour one, treats authoring as a standard move by M3, and uses the team kit as a literal skill repository (not a metaphoric "shared folder").

**Per-module skill activity:**

| Module | Using | Authoring |
|---|---|---|
| M1 | None — `/context` is a slash command, MCP is a connector. First Skill use lands at M3, concentrated with first subagent + first authoring. | none |
| M2 | None — the Socratic walk-down-branches move is inlined as a plain prompt, not invoked as a skill. M3 owns first-Skill-use; M2 pre-installing a skill would front-run the teaching moment. Pocock's `grill-me` skill remains forked at `curriculum/skills/external/pocock-skills/grill-me/` for M3 to reveal as authoring material. | none |
| M3 | **Invokes two curated skills as subagents** — `access-control-analysis` + `stride` (Bosser-curated, ship in content folder, installed to `~/.claude/skills/` at prework so Claude Code auto-discovers them by name) — on a feature you're shipping. Subagent primitive introduced deliberately here: breadth-first skills belong in subagents, interactive authoring stays in main thread. | **Authors first skill** — test-strategy skill, written through conversation with Claude in the main thread (not by typing markdown, not as a subagent), self-critique pre-ship, invoked on the security-tested feature, shipped personally to `~/.claude/skills/`. Strong candidate for a team PR via human conversation; team kit seeded, not auto-born. |
| M4 | Uses M3's authored test-strategy skill and the curated S skills during accumulation, if they earn their keep for the coming task. No new authoring. | none |
| M5 | Bake-in reads the team kit for any skill the task needs (verifier-shaped or otherwise); reference artifact names the invocations | none |
| M6 | Uses team-kit skills during return-and-diff | **Authors second skill** — the learning loop packaged (often a sharpened verifier, often a judge, often a gap-finder). Shape follows what the run demanded. Shipped to team kit. |
| M7 *(optional)* | Deliberation agents load the cohort's accreted skills as their first read; peak use-case | Spontaneous — skills may emerge from deliberation and get added to the team kit mid-module |
| M8 *(optional)* | none (human close) | none |

**The woven design rule.** Every module after M3 produces or uses at least one skill. Skills compound the team kit alongside gates, constraints, and memory-navigation helpers.

**Curation principle applies.** We don't teach "how to author skills" as an abstract topic. We teach the artifact move — *"your judge is a skill; here's where it lives."* By M6 you have authored two. Abstraction arrives retroactively, as naming for a move already performed. Same Klaassen-true pedagogy the rest of the training honours.

## Team kit — the side-story that compounds (cross-module)

Not its own module. Side-story that accretes from M3 onward, mirroring how Intercom's 267-skill plugin repo (31% R&D contributing) was actually born — by accretion, not by design.

**Design rule:** team infra is born from one of you packaging your first judge/constraint as a skill and shipping it. Grows by accretion, one contribution at each authoring or use moment from M3 onward. **Never charter-first** — *"let's design the team plugin architecture in M5"* produces exactly the corporate-platform-team thing Klaassen ridicules.

**Per-module accretion:**

| Module | Move | Cumulative state |
|---|---|---|
| M1 | None — solo on own repo | empty |
| M2 | Seed the noticing — *"if a rule your agent just followed would serve a teammate, jot the name"* | one note in personal CLAUDE.md |
| M3 | **The seeding.** Q exercise ends with *author + self-critique + invoke + ship personally*. Each student ships test-strategy to `~/.claude/skills/`. Team PR is a strong follow-up, mediated by human conversation with teammates — not auto-promoted. | 0 on authoring day; a fraction promote over the days that follow |
| M4 | Accumulation reads and invokes team-kit skills where the coming task needs them. No new authoring. | team-kit holds whatever subset of M3 promotions came through by now |
| M5 | Bake-in names the skill invocations the task will use. Reference artifact points at team-kit entries. No new authoring | unchanged from M4 |
| M6 | **Second authoring** — learning loop packaged as skill (verifier / judge / gap-finder — shape follows run), shipped personally; same human-conversation rule for team promotion | each student's personal kit grows; team kit accretes the subset that earned their keep |
| M7 *(optional)* | Deliberation agents load each student's personal skills + whatever made it to the team kit; new skills may emerge mid-deliberation | honest picture of what the cohort actually agreed on |
| M8 *(optional)* | None — human close | unchanged |

**Substrate.** Default: real shared Git repo (e.g. `agents-102-team-kit`) — single-company cohort spins one up at training start, survives past. Fallback: folder on the cohort site. Last resort: mocked shared folder (dies after training).

**Naming.** Student-facing: **the team kit** (plain, no platform-team energy). Klaassen attribution as **plugin repo** at M3's birth.

**Self-study variant.** Your "team kit" as a solo is artifacts shipped to your actual team's repo — real teammates, not cohort peers. Lands harder than mocking a fake cohort.

**What this closes:** team-axis cliff (team-shape work born at M3, grown M4–M6, peaks at M7); Klaassen's shared-team-infra principle; CTO's *"raises the team floor"* checkbox — visible artifact; Quality's *"infrastructure not heroics."*

## Self-assessment metric

> **Rate 1–10: your confidence operating as an L3 agentic engineer — someone who builds infrastructure that levels up the team.**

Same structure as EM: M1 start, end-of-core (M6), day-91. Cohorts running M7/M8 carry forward; confidence taken at M6 regardless.

- **Start avg:** ~2–4 (chats, maybe dabbles; doesn't build infrastructure)
- **End avg:** ~5–7 (shipped real work, installed Q+S discipline, contributed team-kit skills, handled mid-long send-off/return)
- **Day-91 avg:** hold or climb; L3 durability is the bet

Delta ~+3. Bigger than EM's +2 — more rungs to climb. Aggregate delta across single-company cohort = sponsor's finding.

## Pair with Engineering Management

Pincer the transformation — manager creates conditions, engineers run at capacity.

- **EM → manager:** conditions-creator practice, memory + swarm at team scale, Intercom/Ramp playbook.
- **AE101 → team:** engineers level up on the ladder the manager is creating conditions for.
- **Single-company cohort:** M7's live deliberation is where the pincer lands — manager's stack (team-2x infra, review policy, onboarding) meets engineers' stack (codebase memory, M3 judges + gates + constraints, M6 verifier, team kit). Manager's agent proposes conditions; engineers' agents pressure-test on real code. Core-only cohorts (no M7) still land the pincer asynchronously via the team kit.
- **M3 Q+S handoff is organisational.** M3 Q produces a tiered-review gate spec; whether that gate is *organisationally* approved crosses into the manager's territory (taught in EM). IC builds the gate; manager owns the approval policy.

**Design assumption (to verify):** 101 works best when the manager has done EM first or in parallel. M1 of 101 includes a "does your manager know what you're about to build?" moment.

## Supplementary material (planned)

Bootstrap pattern (`curriculum/supplementary/`): multi-section reference docs, too dense for one session, NOT inlined. Handle breadth concerns the core can't carry without bloat — cohort-dependent (regulated industry vs. startup). **Build the supplementary the first cohort actually asks for; don't build ahead.**

Planned (none built yet):

1. **`quality-at-scale.md`** — beyond M3 Q: test discipline as agent velocity rises, regression detection, codebase entropy, observability, loop reproducibility. For >50-engineer orgs shipping agent-driven PRs.
2. **`security-for-regulated-environments.md`** — beyond M3 S: data egress, regulated-data scope (GDPR/PCI/HIPAA/IP-sensitive), incident response. For finance, healthcare, public sector.
3. **`what-engineers-actually-use-daily.md`** — reference catalog for the Willison-reader CTO: plan mode depth, CLAUDE.md patterns, MCP servers, scheduled agents, subagents, judge patterns.
4. **`multi-repo-working-patterns.md`** — beyond M4: cross-service memory, monorepo vs. polyrepo at agent scale, one-agent-per-service vs. orchestrator, team kit across repos.

## Hard exclusions

- Chatting basics (baseline, not content)
- Basic context management as the training's main subject (M1 moves past it fast)
- ML engineering (model training, fine-tuning) — out of scope
- Non-software-engineering domains — future variants
- Leading change at team scale — that's Engineering Management
- Vendor/platform comparison — Claude Code is the platform we teach on
- Certification, certificates, graduation ceremonies — builder CTO's allergy

## Anchor cases (research-grounded)

- **Intercom R&D 2x** (`observations/intercom.md` Side A) — M4 (93.6% Agent-driven PRs), M5 (Tier 1/2/3 review structure with 19.2% auto-approved at lowest tier — the gate Q exercise foreshadows), team kit side-story (267-skill plugin repo with 31% R&D contributing — the accretion pattern we mirror).
- **Ramp AI-pilled** (`observations/ramp.md`) — M1 (L0–L3 ladder as internal diagnostic; we borrow the posture, not the label), M6 (Dojo's 350-skill marketplace as the team kit's destination shape; Glass framed as the "harness was the bottleneck" insight, not as a judge), cost-posture (leverage over tokens) as cultural frame.
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
| **Team rules for the next session** — rules every engineer shipping this codebase should inherit (M1 onward) | e.g., `./CLAUDE.md`, `./.claude/CLAUDE.md`, `AGENTS.md`. Changes to this file go through normal PR review. |
| **Personal rules for this codebase** — rules you need but don't want in team review every session (M1 onward) | Default: `./CLAUDE.local.md` (gitignored, loads alongside `CLAUDE.md` — see [reference/claude-code-for-engineers.md § 1](../curriculum/reference/claude-code-for-engineers.md). Cross-repo-portable personal rules → `~/.claude/CLAUDE.md`. |
| **Team-rule review cadence** (M1 onward) | Who reviews team-rule PRs, how fast. Sponsor names this so it doesn't become the compound-loop bottleneck. |
| Team kit — skills, gate specs, constraints (M3 onward) | e.g., shared plugin repo, monorepo `.claude/` directory, team-kit Git repo |
| Memory / knowledge architecture (M4 onward) | e.g., `.claude/memory/`, external wiki with pointer file, shared team repo |
| **Ticket tracker** — where bugs, epics, and tasks live so M1 can close a ticket via MCP (M1 onward) | e.g., Jira, Linear, GitHub Issues, Shortcut, Azure DevOps. Named here so M1 P3 MCP wire-up runs against a real target, not a guess. |

**Student moves, two legitimate paths, one forbidden.** In the exercise, you either (a) accept the company default — the sponsor's call, fine, most will — or (b) propose a better home *with a reason the team can argue with*. Both are learning. "I don't want to pick one" is not on the list. Refusing to leave durable knowledge anywhere violates the compounding premise the whole training runs on.

**Why load-bearing.** The trainer doesn't settle a repo-convention debate in the room — that's sponsor responsibility. The forcing function runs upstream: see [training-as-forcing-function](../memory/project_training_as_forcing_function.md). Half the CTOs will discover their org doesn't have an answer. That discovery IS sales output. **Override is legitimate, not rebellion** — engineers often have a better sense of their repo than a top-down pick.

**Where it shows up:**
- **Sponsor-facing worksheet** — [`strategy/ae101-sponsor-prework.md`](../strategy/ae101-sponsor-prework.md). Sent to sponsor weeks before Day 1 (one question, four answers, 15 min). Ops converts answers into `content/pre-engagement-contract.md` in the cohort's content bundle.
- **M1 exercises** (`orient-and-introspect.md` / `fix-tests-first.md` / `compound-and-close.md`) reference sponsor-stated ADR + rules-file + ticket-tracker homes as defaults; override path explicit.
- **M3 Q+S exercise** references sponsor-stated team-kit home; first skill-shaped contributions land there.
- **M4 memory exercise** references sponsor-stated memory home.
- **The Agentic Nerd** reads `content/pre-engagement-contract.md` at module blockers and substitutes the sponsor's actual answer. When a student overrides, the Nerd logs it to `content/overrides.md` for the trainer's cohort-close memo: *"Your six engineers agreed on decisions, split 3/3 on memory, proposed a team-kit repo by 4/6."* That's a Q3 planning artifact.

## Delivery architecture

**The compounding lives in your real repo. The curriculum lives in a content folder next to it.**

Two artifacts per student:

1. **Content folder** — `agents-102-content-agentic-engineering-101/` (zip shipped at training start). Contains `lectures/`, `exercises/`, `prework/`, `reference/`, and `skills/` (source files for the curated skills M3 uses). All markdown. Claude reads the lectures/exercises/prework/reference files from this folder at the Nerd's direction; you skim when you want to. Same markdown renders via the cohort site for projection and human browsing — the file-on-disk is the source of truth for agentic reading. **Skills are the exception** — the source files in `content/skills/` don't get read in-place; prework copies them to your personal Claude Code skills directory (`~/.claude/skills/<name>/SKILL.md`) so they become invocable by name in every session. Content folder = read-in-place curriculum + source files for installable skills. See § M3 for the install mechanic.

2. **Your real repo** — where compounding actually happens. You pick this repo in prework. **Session-compounded rules default to `CLAUDE.local.md`** (gitignored, personal, no PR friction) — this is where session Debriefs write. The team-shared `CLAUDE.md` changes only when a rule is team-worthy enough to earn review — rare by design. Decision-journal entries land as ADRs in the repo's existing convention (or `docs/adr/NNNN-slug.md` if none). Three-block memory (M4+) lands at `.claude/memory/` — gitignored-by-default, personal, parallel to `CLAUDE.local.md`. If your team kit already pins a different home, keep it; the training respects existing conventions. Skills authored at M3 and M6 live in the team-kit home (per the pre-engagement contract). The personal/team split is part of the training — every Debrief teaches the judgement *"does this belong in my local file or in the shared one?"* See [reference/claude-code-for-engineers.md § 1](../curriculum/reference/claude-code-for-engineers.md) for the four-layer hierarchy the training leans on. No separate training directory, no `module-N/` folders, no file-ceremony. Work happens where work belongs.

**Repo choice matters but isn't a blood oath.** Criteria: one you own or co-own, one you'll still work in six months, one dense enough that compounding has somewhere to land, one with real work ahead at both sizes (a trivial bug to open with, plus an epic or refactor or unknown-shaped feature coming up). M1 ships a one-liner; M4 onward runs test-and-learn on bigger things — the repo needs both. If you switch repos mid-training (team change, project end, wrong choice in prework), replay M1 → M(current) on the new repo in an evening.

**Replay is first-class, not remedial.** The Nerd fast-paths replay — *"you've done this shape; let's regenerate the artifacts for this repo"* — because the pedagogy already landed. Replay is artifact regeneration, not re-learning. **Design constraint on every module:** exercises must produce artifacts deterministically enough to replay. Modules with a room-scale moment (M7 deliberation, optional) or multi-day wait (M5 send-off) carry an explicit replay-variant path.

**Prework is agentic end-to-end.** No "create this file, paste this content, commit these lines." You unzip the content folder, point Claude at it, ask Claude to walk you through prework. Claude runs the repo-choice conversation, the bug-finding conversation, the install check. Pre-fabricating state you could generate in conversation violates the *ask-the-agent-don't-type-in-a-terminal* pedagogy.

**The Nerd reads the content folder.** It doesn't carry Klaassen / Huryn / Ronacher in its head — it reads `lectures/the-wizard-move.md` and the three M1 exercise files (`orient-and-introspect.md` / `fix-tests-first.md` / `compound-and-close.md`) and surfaces what's there at blockers. Curriculum becomes Claude-readable reference, not human-only reading material.

**No persistent training-dir state.** Everything you need after M1 lives in either your repo (compounding artifacts) or your head (the pedagogy). If you can't reconstruct the prior module from `git log` + the repo's current `CLAUDE.md`, the module didn't land.

## Format

- **Length:** likely 2 days or 6 weeks for the 6-module core. Cohorts opting into M7+M8 add ~1 day (or two additional weeks in the 6-week format).
- **Cohort:** single-company
- **Modules:** 6 core + 2 optional extensions. Core is canonical — every cohort runs it. Optional extensions run when the sponsor has appetite for the team peak and the closing beat.
- **Session runtime per module (working bid):**
  - M1 Getting going + context ~2h (the orientation ramp + the bug fix + the connector wire; slightly longer than M2 because of MCP setup)
  - M2 Plan mode ~1h45
  - M3 Earn the trust ~1h45 (3 exercises: 2 × invoke curated skill + 1 × author-your-own)
  - M4 Accumulate + run the first experiment ~2h (walk + fill + frame + send-off)
  - M5 Learn from the test, re-send packaged ~2h (return-and-diagnose + verifier build + assemble + re-send)
  - M6 Spot gaps, build the loop ~2h (two-run diff + loop skill authoring)
  - M7 *(optional)* ~2h (deliberation 70 min + frame 50 min)
  - M8 *(optional)* ~1h30 (opinion/fear/hope 30 min + lecture 40 min + close 20 min)
  - Total core: ~11h. Total with optional: ~14h30.
- **Belief > correctness, 50%-wrong-is-curriculum** (ports from Engineering Management)
- **Calibration question** (*did you make progress? did you lay ground?*) applies to every module

## State of play (rolling)

**Current shape (M4–M6 reframed 2026-04-23; structure settled 2026-04-22):** 6 core + 2 optional. M1 Getting going + context + MCP · M2 Plan mode, done right · M3 Earn the trust (Q+S, team kit BIRTH) · **M4 Accumulate + run the first experiment (un-packaged send-off)** · **M5 Learn from the test, re-send packaged** · **M6 Spot gaps, build the loop** · M7 *(optional)* Agents meet agents · M8 *(optional)* Where is this all going? Skills thread: using from M1, authoring at M3 + M6. Core runtime ~11h over 2 days; +M7/M8 adds ~3h30. Pre-engagement contract: rules home referenced at M1, team kit home at M3, memory home at M4.

**Also settled:** first cohort runs at full price (revenue event, not discount-for-evidence); Bootstrap is irrelevant as prerequisite; `crux` / `assumption-test` / `pre-mortem` NOT ported (engineers already have those instincts; M7 runs on the cohort's own authored engineering skills).

**Recurring themes named (2026-04-23):** the four practitioner-truths the curriculum lives inside — 90% correct (problem), compounding builds the system (method), LLM as mirror (operator), mechanically self-aware (interface). See new § "Recurring themes." Frame for every subsequent module spine; modules earn themes, not recite them.

**Gap-closers landed (2026-04-23):**
- **Subagents as primitive — lands at M3.** Ex1 + Ex2 invoke curated skills as subagents; Ex3 stays main-thread. Contrast is the pedagogy: you leave M3 knowing which jobs belong in which thread, not just that subagents exist. LO row added to `earn-the-trust.md`; strategy § M3 paragraph added.
- **Evals explained + called out — M5 + M6.** M5: the verifier IS your first eval; word lands with the move. M6: the word earns full weight — judges / verifiers / gates are all evals, with Ramp Dojo (350-skill marketplace) + Intercom Tier 1/2/3 as anchors. Situated judge-building stays, but the vocabulary is no longer absent.
- **Scheduled agents — callout at M6, not an exercise.** `/schedule`, `/loop`, cron-triggered runs named as the generalisation of the M5 send-off pattern. Lecture callout + Debrief naming; authoring-a-scheduled-agent lands post-training or in a followup, not inside core runtime.

**M6 shipped (2026-04-24):** full module file + main exercise + arc-retrospective forward-looking beat + closing lecture (*the loop has a name*) + scheduled-agents reference page + eval instance stub. Session generated live via the M5 move on its own work — diagnose un-packaged proposal, assemble reference/plan/verifier, dispatch three parallel subagents, run `/loop` for continuous re-verification. Opener lecture (*Story of Module 6*) authored main-thread from generation-session notes. AE101 MODULES array in `site/curriculum.html` synced. Pre-first-cohort TODOs: Ramp Dojo and Intercom 2x source verification on the closing lecture; three-persona sim on all three new student-facing files; eval instance full population.

**M4–M6 reframe (2026-04-23, Antti-driven, two-pass):**
- **Pass 1 — accumulate → bake in → spot gaps.** Named the arc. Fixed M4's "three layers built in sequence" + "memory-nav helpers from M3" (M3 ships a test-strategy skill, not nav helpers); M6's verifier-vs-judge terminology drift; located the meta-capability the training claims ("can build learning systems").
- **Pass 2 — two-run arc, spirit "you are testing and you are learning."** M4 runs the first experiment (un-packaged send-off); M5 reads the result, teaches packaging through diagnosed contrast, re-sends same task packaged (second experiment); M6 reads the packaged run, encodes what two runs taught into a skill. The contrast is the pedagogy — Ronacher's three-pattern earns its name from M4's felt failure modes, not a lecture. Mood arc: curious readiness → learning through contrast → practitioner fluency. Replaces Pass 1's deliberate-preparation / unleashed-leverage / forward-looking-confidence. Task-design requirement is load-bearing: M4's un-packaged run has to be "not great" for M5's contrast to land — sponge, not rock.
- Strategy doc § M4 / M5 / M6 rewritten for the two-run arc; module table + mood arc + format runtime synced; scheduled-agents callout and evals-named callouts absorbed into the new M5 + M6 shape.

**M1 dependencies built (2026-04-21 long-running-gen cycle):**
- `curriculum/trainings/agentic-engineering-101/getting-going.md` (Pass 1 spine; needs MCP/first-skill ramp grown at front)
- `curriculum/trainings/agentic-engineering-101/prework.md`
- `curriculum/lectures/the-wizard-move.md` (Pass 2 skeleton)
- `curriculum/exercises/orient-and-introspect.md` / `fix-tests-first.md` / `compound-and-close.md` (Pass 3; split 2026-04-23 late from original `ship-trivial-bug.md` mega-exercise)
- `curriculum/evals/instances/agentic-engineering-101--getting-going.md`
- Klaassen + Huryn practitioner sources verified — `[practitioner direct]`, within 6 months
- Pedagogy: **exercise-first head-on; "why it worked" names the shape retrospectively.** Practitioners attributed as peer recognition, not curriculum authority.

**M2 dependencies built (2026-04-22 long-running-gen cycle, v3 reshape 2026-04-23):**
- `curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md` (module spine)
- `curriculum/exercises/push-back-on-the-plan.md` (Pass 3; v3 shape — two push-backs + grill + stop, no execution)
- `curriculum/lectures/when-a-plan-is-good.md` (Pass 2 skeleton, 10–12 min)
- `curriculum/evals/instances/agentic-engineering-101--plan-mode-done-right.md` (filled eval, reshape log at top)
- `curriculum/skills/external/pocock-skills/grill-me/` — Pocock's grill-me skill forked with MIT LICENSE + attribution at commit `a6bdfd9` (2026-04-22)
- Site renderer: AE101 registered in `TRAININGS` with M1 + M2
- v3 shape emerged from Antti-driven reshape: *"the exercise is about reading a plan well; execution is M3's concern"* — stopping at approval and naming the design pattern (human read → push-back → agent read → grill → approve) replaces the original execute-and-retro shape
- Three-persona sims (Maija mid-competent / Greg opinionated senior / Jin fast operator) + LLM-as-judge all APPROVE WITH TODOs on v3; polish layer applied 2026-04-23

**M1 compounding-story lecture added (2026-04-23 late):** `curriculum/lectures/how-this-training-was-built.md` — 5–7 min **closer** (not opener) that tells the story of how this training was compounded (bulletpoints → wrong prototypes → human steering → codified rules → longer sessions → agents checking agents → sweeping changes). The meta-frame only lands once you have lived through the loop on your own repo. Sits after `compound-and-close` (Ex3) and before the Bridge to M2. Opener slot stays with `the-wizard-move.md`: demo the ceiling before the exercises, name the pattern after.

**M1 reconstruction (2026-04-23, Antti-driven; split into three exercises 2026-04-23 late):**
- **Three shared-library exercises** (split from `ship-trivial-bug.md` mega-exercise): `curriculum/exercises/orient-and-introspect.md` (Ex1); `curriculum/exercises/fix-tests-first.md` (Ex2); `curriculum/exercises/compound-and-close.md` (Ex3). Same repo + same bug carried across all three. Ex1: orient + introspect (`/context`); Ex2: fix tests-first, no plan mode, seed `./CLAUDE.local.md` mid-exercise; Ex3: retro extends `./CLAUDE.local.md` + short MCP framing + close the ticket via connector. Themes (mirror / grain-of-salt / 90% / compounding) plant experientially across Ex1–Ex2, no lecture. `ship-trivial-bug.md` deleted as superseded.
- **NEW file** `curriculum/reference/mcp-and-connectors.md` — first entry in `curriculum/reference/`. Per-tracker install (`gh` CLI for GitHub Issues / Atlassian Rovo MCP for Jira / Composio or Merge for Linear), tenant-admin fallbacks, "Last verified" date to track freshness. Exercise points at it; specifics stay out of the exercise body so they don't drift when Claude Code's install surface changes.
- Capability check via `claude-code-guide` confirmed MCP is CLI-first in Claude Code today (2026-Q2). No GUI marketplace. Informed P3 design + the reference file.
- Strategy-doc § "M1 in detail" rewritten to the three-phase shape; module-table artifact column updated.
- **Still outstanding:** module file `getting-going.md` LO + runtime + Debrief block update (divergence now resolved — no Skill use at M1; update pending next editing pass). Three-persona sim on the new shape. Antti reviewing opener (Connections + wizard-move lecture) after this pass.

**Skill-invocation divergence — resolved 2026-04-23.** Option (a) picked: no Skill use at M1. First Skill use + first subagent + first authoring all land at M3, concentrated. Rationale: one primitive per module, earned at the moment you need it. Strategy doc § M1 + module table + skills table synced.

**Open — decide before Pass 1:**

1. ~~**M1 MCP selection.**~~ **Resolved 2026-04-23** — capability check completed; findings codified in `curriculum/reference/mcp-and-connectors.md`. GitHub Issues via `gh` CLI is the cleanest default; Jira via Atlassian Rovo MCP; Linear via Composio or Merge. Tenant-admin fallbacks per tracker.
2. ~~**M3 Q+S exercise artifacts.**~~ **Resolved 2026-04-23** — reshaped to three exercises on a small feature you're shipping: (1) invoke curated access-control analysis skill; (2) invoke curated STRIDE skill + ADR hardening decision; (3) author test-strategy skill via conversation, self-critique, invoke on security-tested feature, ship. Module spine drafted at `curriculum/trainings/agentic-engineering-101/earn-the-trust.md`. See § "M3 in detail" for shape.
3. **Site renderer.** Add an `optionalModules` field to the TRAININGS schema (parallel to Bootstrap's `supplementaries`) or use title-prefix workaround? Recommendation: add the field.
4. **Optional-module sell line.** AE101 equivalent of Bootstrap's *"Plus two optional extensions…"*: A/B *"Plus two optional modules when the cohort wants the team peak."*
5. **Red-team-me skill.** Pocock's grill-me is Socratic-elicitation, not adversarial. A genuinely adversarial *"imagine the worst way this plan fails, argue for it"* skill is a real authoring opportunity — likely M3 (judge-building) or the skill-authoring arc. Not M2.

**M3 dependencies built (2026-04-23, Antti-driven strategy-session reshape):**
- `curriculum/trainings/agentic-engineering-101/earn-the-trust.md` — Pass 1 spine, three-exercise shape (S-first), runtime 1h45, feature-size framing as pedagogy (small/large tradeoff, trust your Claude-speed calibration).
- Strategy-doc § "M3 in detail" rewritten; module-table artifact column updated; Skills table + Team-kit table + Format runtime synced.
- Shape pinned in-session: *curated S skills (access-control-analysis + STRIDE) + authored Q skill (test-strategy)*; self-critique move via *"disclose the weakest part"*; invocation-closes-loop via *"go check the test strategy — is it good?"*; skill authored through conversation, not markdown editor.
- **Still outstanding:** three-persona sim. Feature-size Connections framing needs simulation to verify it lands without prescription.

**TODOs for Pass 1:**
- Write M5–M8 module spines (4 files). Next long-running-gen sessions per `module-design-long-running-strategy.md`.
- Write research-grounded-moves companion file (EM has one; 101 doesn't).
- **Capability check:** Opus 4.7 long-running behaviour before M5 drafts (via `claude-code-guide`).
- M5: canonical multi-hour task that requires agentic persistence but finishes in-session; monitoring + recovery patterns.
- M7: problem-selection protocol (how the CTO picks the right engineering problem); self-study variant with persona-stand-ins.
- Frontier reading list — named practitioners (Karpathy, Willison, Huryn, Cherny, Sottiaux et al.); refreshed per cohort.
- **Git + `gh` CLI through Claude Code — likely optional lecture or supplementary.** Most engineers have CLI muscles; some don't, and a non-trivial fraction run Git only through the IDE. Short module showing how Claude Code drives Git (commit, branch, PR-open via `gh`) closes the gap without burning a core slot. Candidate homes: optional supplementary, or a 5-min callout inside M2. Confirm audience need during pre-engagement.

**Parking lot — lecture ideas (captured, not yet placed):**
- **"AI-native vs. AI-first vs. AI-driven: who cares?"** — short lecture, reframe move. Key idea: nobody should care about the label; it's all about the learning rate. Candidate slot: M4 or M8. Rory-flavour; dismisses the category-war with one line and redirects to the real axis (organisational learning). Keep short.

*(Placed 2026-04-23 late: "How this training was built" — originally parked for M8 as a closer; Antti redirected to M1 as the **closer** (not opener). Meta-frame lands after you have run the compound loop on your own repo. File: `curriculum/lectures/how-this-training-was-built.md`. Opener stays with `the-wizard-move.md` (demo the ceiling before; name the pattern after).)*

**Bootstrap reuse candidates:** Plan mode primer → M2 **NOT PORTED** (v3 authored fresh; Bootstrap's primer is builder-leader voiced and has no forced-push-back mechanic) · Context is King → M1 · Compounding lecture → M4 · When to split an agent → M5 · Hallucination bake-off → M3 Q · Orchestrator + eval loop → M5 · M8 joint-deliberation → M7 (engineering-problem focus). `crux` / `assumption-test` / `pre-mortem` NOT ported.

*Decision history is in `git log`. Last updated 2026-04-23 (themes + M1 three-phase reconstruction + `reference/mcp-and-connectors.md` created + M3 reshape: three exercises, S-first, curated-S-authored-Q, runtime 1h45, `earn-the-trust.md` spine drafted).*

---

## Overflow — outside-in checklist

Living target state. Four personas read the curriculum top-to-bottom; each ticks boxes their role cares about. **Goal isn't to empty the list — keep current state and need state visible side by side.** A box stays open as long as no module's LO addresses it. Absorbed items live in the module that absorbed them; only open items + `⚠`-flagged items stay on this list.

> **Module-number caveat:** old annotations use pre-restructure numbering. *"M5 Q exercise"* → now M3. *"M4 judge-building"* → now M6. *"M2 multi-repo memory"* → now M4. *"M6 closing human beat"* → now M8. Re-audit is a TODO before Pass 1 of the new-shape spines.

### Builder CTO (the buyer)
- [ ] Output delta per engineer-month — measurable, not vibes
- [ ] Survives the next model release — capability-shape, not version-shape ⚠ *needs LO craft when M2–M6 spines drafted*
- [ ] Habit on Monday — sticky practice, not theatre *(load-bearing for day-91 +3; needs LO somewhere)*

### Kieran Klaassen (the practitioner)
- [ ] Background agents are everyday, not advanced — multiple agents concurrent by mid-training *(M3 has one mid-long task; default-everywhere is a real choice)*

### Quality (staff/platform engineer who owns the floor)
- [ ] Definition of "done" for agent work — explicit, not implicit *(natural fit M5 Q gate spec; settle when M5 spine drafted)*

### Security (CISO / AppSec / security-eng lead)
*All items absorbed at M3 S or in `security-for-regulated-environments.md` supplementary.*
