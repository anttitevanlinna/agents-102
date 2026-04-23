# Content Strategy — Agentic Engineering 101

Third training in the portfolio. Skeleton → storyline. Updated 2026-04-21.

Paired with Engineering Management; the two pincer the transformation (manager creates conditions, engineers run at capacity).

## Positioning

**You become the Claude wizard.** The engineer who walks in is already shipping real work with Claude Code. Training takes competence to mastery — the kind colleagues call magic. Wizards have tricks, share tricks, never stop finding new ones.

**Day 1:** instructor opens with a wizard-level move on the student's own codebase — a demonstration of what's *possible*, not an exposure of what's missing — then invites the student to show the trick they brought. Cohort harvests each other's self-taught moves alongside the curriculum's. Gift first, then climb. **Never sold as a gap-fix.** Engineers have pride and are often right; the training respects that.

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

**Why narrow to software engineers:** the L3 path is most legible here (Intercom, Ramp). Coding agents are the meta-platform; software ICs already touch the substrate. Adjacent variants later.

## The correlation at the heart of the training

**Theory × codebase-knowledge = durable leverage.** We supply the theory and the agents. The engineer supplies the codebase knowledge — *"here's what my system is really like, what's brittle, what pattern nobody's documented, what convention this team actually follows."* Agents amplify the multiplication.

Generic Claude Code usage without codebase knowledge = generic output that gets reviewed harshly. Codebase knowledge without structured agent practice = expertise that doesn't compound. Both + agents = L3 velocity.

Dorsey's question at IC scale: *what does your understanding of this codebase gain every day?* The memory is where it compounds.

## The rule that governs everything

**Learning and good process happen as side-product of making good stuff. Only that scales.**

What motivates the engineer is customer value + intrinsic satisfaction with the work. A training that bolts "improvement practice" onto real work fails — practice gets dropped when the sprint is on fire. **Compounding is the side-product of smart process.** Chase it directly and you get improvement theatre. *"If you just try to make a sprint to improve, you will not make this into habit."* Habit for you AND your agents — both compound from doing the work well.

## Recurring themes — the practitioner reality the curriculum lives inside

Four themes surface across modules. Not rules — rules tell you what to do. Themes tell you why the rules make sense. Each module hits multiple themes; each theme shows up in multiple modules. Named here once; compounded module by module.

**1. Claude is 90% correct.** Rule of thumb, not a benchmark. Ten percent of instructions don't get followed. Ten percent of requirements don't get woven in. Ten percent of what should have been read doesn't get read. The training's job isn't to eliminate the 10% — you can't — it's to teach the steering that catches it and the system that works regardless. Every module is an instance: M2's plan-mode push-back catches instructions-not-followed; M4's memory catches requirements-not-woven; M3's gate + M6's verifier catch what nobody read.

**2. The system is built by compounding. You can't imagine it a priori.** There is no reference architecture for agentic engineering. There is a loop — plan, work, review, compound — and each pass teaches what was missing. Next pass is better. Same shape at every scope: the bug fix (M1), the multi-file task (M2), the memory (M4), the long-running job (M5/M6). *"Give me the complete blueprint"* is the wrong question; *"run the loop"* is the answer. This is the epistemology, too: big-design-up-front fails precisely because the designer can't predict what the agent will get 90% right.

**3. The LLM is a mirror. Quality of practice reflects.** The operator is the ceiling — not the model, not the tools. An engineer who approaches the work with a learning stance makes their LLM learn. An engineer who types requests into chat gets chat-shaped output back. Also the answer to *"my colleague tried Claude and it sucked"* — their practice sucked. The mirror is diagnostic, not motivational: it shows parts of your practice you hadn't noticed yet. Uncomfortable, useful.

**4. The LLM is mechanically self-aware — ask it. (Grain of salt.)** Claude can introspect: what it thinks it can do, why it did what it did, what was missing in your prompt. That's the interface you use to run the other three themes — the compounding loop's Review step is a conversation with the model about its own output. The caveat is load-bearing: self-report is the least trustworthy channel. Claude confabulates reasons. Move: *ask, then verify against the artifact* — the file, the scrollback, the actual behavior. Introspection generates hypotheses; the artifact rules.

**How the four sit together.** 90% names the problem. Compounding names the method. Mirror names the operator. Self-awareness names the interface — the channel you use to run the other three. Miss any one and the training's mechanics look arbitrary; hold all four and every module's shape follows.

## Load-bearing assumptions

Three bets. If any is wrong, the training's shape needs a rethink, not a polish.

1. **Compounding and personal habit are the durable unit.** Tool versions decay; daily practice holds. *Falsifier:* day-91 self-assessment shows students falling off; confidence drops to pre-training.
2. **Agents can self-learn.** File-based memory + session retros + three-block structure = Claude gets better at serving *this* student on *this* codebase. *Falsifier:* sessions stay fresh despite populated memory; memory becomes write-only.
3. **Everything is scaling of learning.** M1→M6 isn't six skills stacked — same compounding loop at successively larger scopes. *Falsifier:* students experience modules as disconnected; "my multi-hour work doesn't feel like my bug fix at scale."

Current evidence for all three: practitioner convergence (Klaassen, Huryn, Ronacher, Cherny); no longitudinal data yet. Each module is testable against its underlying bet — the assumptions are the spine, modules are bones hanging off them.

## Woven design rules — apply to every module and exercise

Two ambient rules threading every exercise. Design defaults — honoured, they surface naturally; neglected, leave the student doing chat-shaped work that doesn't compound.

**1. The Compound step is visible in every module.** Plan → Work → Review → **Compound** (Klaassen). The fourth step is what makes the loop a loop. M1's Debrief is canonical — Claude reviews the session, rewrites the rules file in place. Every subsequent module has its Compound move in the same structural place: M3 ships gate spec + constraint to team kit; M4 promotes observation → hypothesis → rule; M6 sharpens verifier and ships as skill; M7 signs the technical decision document and feeds team kit. **Test on draft:** if a module produces an artifact without a Compound move that updates rules / memory / team kit / verifier in place, the module is missing its fourth step.

**2. Specs over chats.** When the agent needs to do something non-trivial, *write the spec, point the agent at it* — don't type the request in chat (Klaassen). Markdown specs are the lingua franca: ADRs (M1+), judges + gate specs (M3 Q), blast-radius constraints (M3 S), plan.md (M5 long-running), verifiers (M5/M6), team kit contributions (M3+), technical decision document (M7). Chat is for the quick stuff and steering at decision beats. **Test on draft:** if an exercise has the student type a paragraph of intent into chat where a spec would have served — and the spec would have been re-readable by a teammate — convert to spec.

**Rory:** every competitor teaches prompt engineering. We teach spec engineering — specs compound, chats don't.

## Terminology — memory vs context (load-bearing)

**Memory compounds; context feeds it.** Two terms, not interchangeable.

- **Memory** = persistent. Files that survive session close — `CLAUDE.md`, `.claude/memory/`, rules file, team kit, Huryn's three blocks. What the training teaches you to build.
- **Context** = ambient runtime state. Memory loaded in + files read + MCP-fed data + user input + tool results. Dies at session close. After Karpathy / Willison: *"context engineering, not prompt engineering."*

Software engineers fluent in Claude Code discriminate cleanly — *context* is the 200k-token window; *memory* is what the agent re-reads at session start. Blurring reads imprecise. MCP and connectors feed **context**, not memory. Don't say *"your context compounds"* or *"seed your context"* (you mean memory). The team kit is memory.

**One line:** *memory compounds, context feeds it.*

## Curation principle — we don't invent, we curate the best

**The training doesn't manufacture its own wisdom.** Specific skills and insights from the best practitioners — Klaassen's compound engineering, Paweł Huryn's three-block memory, Ronacher's long-running patterns, Willison's daily-practice notes, Cherny's file-based practice — each slotted into the module where it handles a student's actual blocker.

**Skill, not theory.** We import what's *doable on Tuesday*. Klaassen's four-step loop at M1 resolves "I don't know where compounding starts." Huryn's three blocks at M1 solve "my CLAUDE.md is six lines." Ronacher's plan.md at M5 keeps a multi-hour agent from drifting. Test for import: can the student apply it in-session, on their own work, without more lectures?

**Student-blocker-specific deployment.** Skills don't arrive as catalogs. They arrive when the student hits the blocker. Build around blockers, not concepts.

**Research system is the content pipeline.** Continuous-research surfaces practitioners and keeps the list current. When Opus 4.8 changes the long-running picture, M5's anchor skill gets re-sourced. Module content is mutable; curation posture is the durable part.

## Facilitation model — the Agentic Nerd, in both modes

**Each student has an *Agentic Nerd* running alongside them — classroom as well as self-study.** All-knowing companion you can ask anything, not a teacher. Student is the wizard; nerd is the resource. Different authority gradient than "Teacher Claude" — student leads, nerd supports.

**What it does:** answers anything in-session; surfaces the right practitioner skill at the blocker (Klaassen's loop, Ronacher's plan.md, Huryn's three blocks — whichever fits); catches rubber-stamping (*"find me one row the judge got wrong"*); runs the per-student Debrief. Delivery mechanism for the curation principle.

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
|  | **1. Compounding engineering** — personal flywheel. Memory grows with the codebase; skills accumulate; agents run while you sleep. The daily practice that stays current as the frontier moves. | **2. Long-running tasks** — Opus 4.7's sustained-execution capability made real. Hand the agent a multi-hour job, close the laptop, come back to a finished PR. The specific capability behind the L1→L2 leap. |
|  | **4. Team integration** — the engineer's work reaches colleagues. Factory components ship. Agents meet agents on real problems. The practice that turns personal leverage into team velocity. | **3. Software factory pattern** — the team industrialises production. Evals as quality-control infrastructure. Shared skills, orchestrators, MCP servers, meta-agents. The Intercom/Ramp endpoint. |

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

- **Block 1 — Codebase Knowledge Architecture.** Tiered store of what the engineer knows about THIS codebase. Observations (raw) → hypotheses → rules. Promoted when confirmed, demoted when contradicted. Domain folders: subsystems, failure modes, team conventions, personal patterns.
- **Block 2 — Decision Journal.** Every meaningful technical decision logged with forced alternatives — architecture, library, pattern, refactor scope. Claude searches priors before proposing new — no re-debating settled choices.
- **Block 3 — Quality Gate.** Project-specific testable criteria for shipped code. Catches promote to automatic gates; never-triggered checks get pruned. Sharpens around actual failure modes.
- **Swarm.** Diagnostic agent (reads codebase, surfaces patterns); gate-watcher (monitors PR quality); skills-builder (packages workflows for the team); orchestrator (drives multi-agent tasks). Scheduled, compounding.

## Six core modules + two optional extensions — the arc

Shape, not settled detail. Exercises designed case-by-case. Agentic throughout; chat-and-save banned. Six modules carry the cohort end-to-end. Two optional extensions sit on top when the cohort wants the team peak — same pattern as Bootstrap's public-site curriculum (Modules 7–8 · optional).

| # | Title | Lead dimension | Mood | Artifact |
|---|---|---|---|---|
| M1 | **Getting going + context** *(+ MCP)* | Compounding (how) | Joyful creation — *"it works, on my repo"* | Three-phase loop on a trivial bug from the student's own backlog: P1 orient + introspect (`/context` shows the unread slice); P2 fix tests-first, no plan mode, seed `CLAUDE.md` mid-exercise; P3 retro extends `CLAUDE.md` + wire one connector + close the bug's ticket outside the repo. Skill-invocation deferred to M3 pending adjudication. |
| M2 | **Plan mode, done right** | Compounding (how) deepens | Grounded competence — *"I can feel when a plan is good before approving it"* | A well-designed plan on multi-file work the student actually has to do, pushed back on before approval, executed, and retrospectively named as plan-mode-at-depth. Plan-mode approval inflation catches as the key teaching moment. |
| M3 | **Earn the trust — quality + security** | Software factory (tech) + team integration (how) via team-kit seed + **first authored skill** | Earned trust — *"my agent practice is something my staff engineer and my CISO can sign off on, before I even try anything big"* | Three exercises on a small feature the student is shipping: (1) invoke curated access-control analysis skill, name surface delta; (2) invoke curated STRIDE skill, pick one hardening decision → ADR; (3) author a test-strategy skill through conversation with Claude, ask it to disclose its weakest part, invoke on the security-tested feature, ship to team kit. Two curated skills used, one authored skill shipped. Team kit is BORN here. |
| M4 | **Memory that reads your system** | Compounding (how) | Satisfied compounding — *"it reads my system now"* | Single-repo memory → multi-repo memory → memory connected to business rules and company info; agents wired to each layer; compounding loop from M1/M2 carried forward; team-kit-authored memory-navigation skills used. |
| M5 | **Long-running tasks — send-off** | Long-running (tech) — setup + launch | Unleashed leverage — *"I just sent an agent off with real work"* | Concept taught + challenge named + verifier built on student's real work + verifier checked lightly on a small example + mid-long task launched, running between M5 and M6 |
| M6 | **Long-running tasks — return** | Long-running (tech) — retrospective + next-run prep + **second authored skill** | Grounded rescue — *"the return isn't a grind, it's a system"* | Return to the scene: diff read, drift named, failures caught + learnings integrated into memory + **verifier sharpened and packaged as a skill**, shipped to the team kit. |
| M7 *(optional)* | **When agents meet agents** | Team integration (how) peak + software factory peak | Awe + ownership | Live deliberation on the CTO's real engineering problem, grounded in every participant's codebase knowledge AND the cohort's accreted team kit. Technical decision document produced by the room. |
| M8 *(optional)* | **Where is this all going?** | Human close | Open question — *"nobody plain knows"* | Opinion / fear / hope round + Antti's lecture of the future. Closes on directness, not triumph. Optional because a cohort that stops at M6 still lands a complete training; a cohort that wants the full arc takes both M7 and M8. |

**Agentic walk-away test:** by M3 onward, the student closes the laptop and finds the agents still working. If every artifact requires typing, the exercise failed the rule.

**Real-work requirement (universal across modules):** examples, cases, bugs, PRs, and references come from the student's own company and codebase. Not toy data. Not case studies of other firms dressed up as exercises. The training lands only when the artifacts are the student's.

## Mood arc

**joyful creation → grounded competence → earned trust → satisfied compounding → unleashed leverage → grounded rescue → *(optional: awe + ownership → "where is this all going?")***

Core (M1–M6) runs through personal discovery, instrument mastery, discipline-earned-before-you-need-it, memory that compounds, and the long-running pair that stretches the flywheel at mid-hour scale. Less dramatic stew than Bootstrap; deliberate linear ramp that suits the wider audience band (novice → mid-level) without dropping anyone. Discipline installed early (M3 Q+S before M5 send-off) means the student *feels* covered when they push the agent off for hours, not retrofitted after.

**Optional (M7–M8)** carry the peak the core can't fit in six. M7 is the room's collective agency — cohort agents on a shared runtime, real engineering problem, technical decision document live. M8 is the human close — opinion/fear/hope + Antti's lecture of the future.

Leadership drama is absent; drama is in the engineer's interior (*am I still keeping up?*), the team's infrastructure (*is our floor rising?* — team kit makes this visible), and M8's deliberate refusal to close the big question. *Where is this all going?* — nobody plain knows. The question is what the student carries home.

## M1 in detail — getting going + context

**Three phases, one loop** (reshape 2026-04-23 per Antti):
1. **Orient + introspect (~15–20 min).** Claude reads the repo; the student interrogates Claude's own read via an introspection prompt + `/context`. The bounded window and the unread slice become visible.
2. **Fix it right (~40–45 min).** No plan mode. Tests-first, root-cause-driven. Ship the PR. Seed a short rule into `CLAUDE.md` mid-exercise — while the move is warm, before the retro.
3. **Retro + MCP + close the ticket (~30 min).** Claude extends `CLAUDE.md` in place from session evidence (no Q1/Q2/Q3 interview); short MCP framing (connector / action / tool); wire one connector and close the bug's ticket outside the repo. MCP install specifics live in `curriculum/reference/mcp-and-connectors.md`, not in the exercise body.

**Orientation is short, not a setup ramp.** Prework has done Claude Code install + repo-choice + bug-surfacing. M1 starts in the chat with the repo open; Phase 1 is a read-and-introspect move, not a connector-wiring step. MCP lands at P3 against a real job (ticket close-out) the student just earned.

**Themes plant experientially** (§ "Recurring themes"): mirror (P1's repo read reflects the student's prompt); self-aware + grain of salt (P1's introspection prompt; P3's retro summary; verify-against-artifact in both); 90% correct (`/context` makes the unread slice visible); compounding (P2's rule-write IS the first compound step; P3 extends it).

**No plan mode in M1.** Restraint is deliberate — M2 owns plan-mode-at-depth on multi-file work. Running plan mode on a trivial bug is overhead. M1 teaches where plan mode *doesn't* earn its keep, by contrast.

**Huryn's three-block memory is seeded, not named.** Materials land through the phases (observation at P1 → Block 1 candidate; TDD rule + diff push-back → Block 2 candidate; the failing test → Block 3 candidate). The three-block *frame* earns its name at M4 when materials get rearranged. Don't teach three-block at M1 — that's pre-explanation.

**Klaassen attribution** happens inside Claude's P3 retro summary — the retro prompt asks Claude to name the shape and cite the practitioner if one fits. Peer recognition, not a lecture.

If the student leaves with only a bug fix, M1 failed. If they leave with a `CLAUDE.md` written from session evidence, a PR shipped, a ticket closed via a connector, and mirror / grain-of-salt / 90% experienced (not lectured), M1 worked.

*Naming: canonical "compound engineering" per Klaassen; our learning-area name "compounding engineering" is our framing; "compound" reserved for the Klaassen loop step.*

**Skill-invocation divergence — open for Antti:** prior strategy had *"1–2 pre-installed skills invoked during the bug fix."* The reconstructed three-phase shape drops explicit Skill-invocation — P1 uses `/context` (slash command, not a Skill), P3 uses MCP (connector, not a Skill). Options: (a) leave M1 without explicit Skill-use; first authoring + first use both land at M3; (b) reinstate a Skill-invocation beat inside one of the three phases. Deferred for Antti.

## M2 in detail — plan mode, done right

**Plan mode at depth.** M1 used it on a trivial bug; M2 is the subject — what a good plan looks like, what two reads (human + agent) catch that one doesn't, where plan-mode approval inflation bites. Mood: **grounded competence** — *"I can feel when a plan is good before approving it, and I know the move is two reads, not one."*

**Core exercise — pair the reads, stop at approval:**
1. Student picks a multi-file task from backlog (~30–60 min of agent work).
2. Enter plan mode, read the plan carefully before touching approval.
3. **First read — two push-backs via *keep planning with feedback*.** One soft item (the step that reads clean but skips something) + one of (assumption OR committed change). What YOU can see. Claude regenerates. Watch for softening-on-regeneration (RLHF-niceness tell inside plan mode).
4. **Second read — grill-me (Matt Pocock's MIT-licensed skill, forked to `curriculum/skills/external/pocock-skills/grill-me/`).** Walks down unresolved branches of the decision tree one question at a time, recommending an answer per branch. Student confirms or corrects each. Claude incorporates into a sharpened plan.
5. **Approve. Stop. No execution.** The student does not run the code. The exercise is about reading a plan well; execution is M3's concern.
6. **Retrospective names the pattern.** What did grill surface that push-back didn't? Would it have mattered? The design pattern: *human read → push-back → agent read → grill → approve.* One kind of scrutiny catches one kind of miss; paired, they give the complete read.

**What M2 refuses:** plan mode as a feature tour (it's a discipline, not a toggle); three-push-back-quota (n=3 produces a performative third one, killed in v3 reshape); plan-execution (the work of making a plan good IS the exercise; running the code is different-skill territory).

## M3 in detail — earn the trust (Quality + Security), before you need it

**Veto-stakeholder module, moved earlier.** Three exercises on a small feature the student is shipping — **S-first, then Q.** Runtime 1h45 (lifted from the earlier 1h30 compact; three exercises + richer Debrief warrant the rhythm of the other modules). **Team kit born here.** Discipline installed before M5's long-running send-off, so the student never feels exposed.

**Why curated-then-authored.** Students USE two curated skills for security, AUTHOR one of their own for quality. STRIDE authored by a novice = Wikipedia copy-paste; test strategy authored by an engineer on their own codebase = *theory × codebase-knowledge* — the correlation at the heart of the training. The proportion shown:authored matches the claim: we curate; you build.

**Why S-first.** The test-strategy skill (Ex3) invokes on the feature that's already been access-mapped and threat-modeled. Abuse cases STRIDE surfaced become test cases. Q consuming S's output is denser pedagogy than two standalone beats.

**Feature rule — pedagogy, not prescription.** Student brings a small feature they're shipping this week. Too small: Claude crunches it in thirty seconds with nothing interesting to surface. Too large: still waiting when the bell rings. Students have already seen how quickly Claude works across M1–M2; trust their calibration. Connections framing, not a checklist.

**Exercise 1 — Map the access surface (S primer, ~20 min).** Invoke the curated access-control analysis skill on the feature. Read what it surfaces. Decide: which surface did it flag that you'd underweighted? What did it miss that you know matters? Name the delta — this is the access-mapping that STRIDE will consume.

**Exercise 2 — Threat-model with STRIDE (S main, ~20 min).** Invoke the curated STRIDE skill on the mapped access surface. The skill does the breadth (six categories against every surface); you make one call — pick the threat worth hardening against, write the decision as an ADR in the repo's convention (sponsor-stated home; default `docs/adr/NNNN-slug.md`). The framework picks the threat if you've named the worst case right. No menu-shopping.

**Exercise 3 — Author your test-strategy skill (Q, ~25–30 min).** Author through conversation, not a markdown editor. Student prompts Claude to ask the questions needed to encode a test-strategy skill for THIS codebase — framework, mocking policy, integration boundary, what "flaky" means here, what regression scope looks like. One question at a time (prompt says so — otherwise Claude dumps all five). Claude writes SKILL.md; student pushes back on codebase specifics. **Force-push-back move:** ask the skill to disclose its own weakest part before shipping. Student pushes back on the self-critique — which is the reflection move; this IS theme #4 (mechanically self-aware) used as designed. **Invocation closes the loop:** run the skill on the security-tested feature, prompt Claude *"go check the test strategy related to the feature — is it good?"* Ship to the team-kit substrate.

**Curated skills ship with the training.** Both S skills live in the content folder (`content/skills/access-control-analysis/`, `content/skills/stride/`). Training IP — Bosser-curated, lecture attributes sources (Kohnfelder & Garg for STRIDE origins; Shostack for sharpening; Saltzer & Schroeder for least-privilege lineage). Not team-kit contributions — curated-for-you stays in content; authored-by-us goes to the team kit. Clean separation.

**Team-kit accretion at end-of-M3.** One authored skill per student shipped = ~10 contributions (cohort of 10). Readable at a glance, cohort-pattern-matchable. Substrate for M4's memory-navigation helpers, M6's second authoring, M7's deliberation.

**What M3 refuses:** frame Q+S as compliance (they're infrastructure); ask the student to author STRIDE or access-control from scratch (novice-authoring = Wikipedia copy-paste); ask the student to spot-check Claude's skill output manually (the self-critique move puts Claude in the critic seat, where it belongs — check_student_facing #9); skill-authoring by opening a markdown editor (the authoring move is conversation, not keyboard-crafting).

**Anchor cases:** Intercom Tier 1/2/3 review (19.2% auto-approved at lowest tier — tiered-review is shippable); Ramp Glass + Dojo (judges as quality infrastructure); Intercom's 267-skill plugin repo with 31% R&D contributing (team-kit accretion pattern). STRIDE lineage: Kohnfelder & Garg (1999 Microsoft memo) + Shostack (*Threat Modeling: Designing for Security*, 2014).

## M4 in detail — memory that reads your system

**Three memory layers, built in order:**
1. **Repo memory.** M1's single-repo memory grows — M2 plan-mode feeds observations; M3 judge/gate feeds quality criteria.
2. **Multi-repo memory.** Cross-service patterns, team conventions, cross-repo dependencies and failure modes.
3. **Business rules and company info.** Agents wire to the layer above code — business rules, customer segments, team commitments.

**Make it compound.** M1's four-step loop carries through — every retro promotes across all three layers.

**Why here, not before.** Memory without M3's Q+S discipline grows without quality criteria that mean anything; Block 3 stays abstract. With M3's judge + gate in hand, quality criteria are real. Memory compounds around actual practice, not prospective practice.

## M5 in detail — long-running tasks, send-off

**M5 and M6 are a coupled pair.** M5 sets up and launches; M6 returns and processes. **The gap between modules is the walk-away** — the schedule *is* the walk-away.

**Five moves:**
1. **Teach the concept.** What makes a task long-running (multi-hour, sustained coherence, walk-away possible).
2. **Explain the challenge.** Failure modes named up front: argue-loops, hallucinated commit hashes, context rot, goal drift, plausible-but-wrong.
3. **Build the verifier** on the student's real work. External verifier component of the three-pattern (reference artifact + plan.md + external verifier). Candidates: tests-as-verifier, lint/compile, bash hook, minimal judge.
4. **Check it lightly** on a small example. Proof it catches a failure before we trust the real run.
5. **Send off a mid-long task** (2–4 hours) that actually completes between M5 and M6.

**Format dependency.** 2-day intensive: M5 ends day 1, agent runs overnight, M6 opens day 2. 6-week format: M5 week N, M6 week N+1, agent runs a week between. Both preserve the structural walk-away.

**Real-work requirement lands naturally** — no toy task would survive the inter-module gap.

## M6 in detail — long-running tasks, return

Student returns to the scene of M5's send-off. The artifact the agent produced during the gap is waiting. The retrospective is the module.

**Three moves:**
1. **Return to the scene.** Read what happened. Where did the agent drift? Where did the verifier catch (or miss)? First-hand encounter with the failure modes M5 named.
2. **Process results and learnings.** Structured Debrief: what traveled into memory about this codebase / this task shape / this verifier's blind spots. Judge agent sharpened to triage what the verifier missed.
3. **Prepare for better — including the team's next time.** Memory updated (Block 1/2/3). **Verifier rewritten and packaged as a skill file** — second authoring move, mirroring M3. Shipped to team kit.

**Evals arrive when they're necessary, not when the curriculum says.** Students build the specific judges their specific task drift demanded. Situated judge-building, not abstract eval theory.

For a core-only cohort, M6 ends on grounded rescue — *"the return isn't a grind, it's a system."* For M7+M8 cohorts, the rescue-feeling is what makes M7's deliberation feel earned.

## M7 in detail (optional) — when agents meet agents

**The peak deliberation module** — the +3 cognitive climb. Awe + ownership as mood. The module exists when the cohort has appetite; the core runs cleanly without it.

### The deliberation (~70 min)

Each participant's M1–M5 stack — codebase memory, factory components, judges, gates, constraints, contributions to the team kit — arrives at M6 as a **first-class agent on a shared runtime**. The room's agents deliberate live on a real engineering problem fed in by the CTO at the start of the cohort.

**The fuel — a real engineering problem.** The CTO picks one the company is genuinely sitting on:
- A migration plan (monorepo ↔ polyrepo; on-prem → cloud; language/framework migration)
- An architecture decision with cross-service blast radius
- A platform choice with codebase realities the vendors' sales decks don't know about
- A performance or reliability pathology spanning teams
- A refactor too big for one engineer to hold in their head

**The heterogeneity is the insight.** No individual holds the whole picture. The queue handler's quirks live in one engineer's memory, the auth layer's debt lives in another's, the deploy pipeline's scars live in a third. The deliberation assembles it.

**The team kit is what the deliberation reads first.** Each agent loads the cohort's accreted contributions (skill-shaped judges, gates, constraints, verifiers) before joining the deliberation. The infrastructure the room raised across M3's birth → M6's accretion is what makes M7 possible. *That's* the visible compounding — by M7 the student sees the floor they collectively raised over six modules.

**The mechanism is visible.** Students read every message and `@mention` in the transcript. Humans contribute by talking in the room AND by steering their agents at decision beats — they don't run the plumbing.

**Artifact:** a technical decision document — engineering equivalent of Rumelt's kernel. Diagnosis of the load-bearing obstacle, guiding policy, ranked assumptions, named experiments to run Monday. Signed by the room.

## M8 in detail (optional) — where is this all going?

The training closes on directness, not triumph. As an optional module (up from the 30-min closing beat of the previous 6-module shape), it gets room to breathe — the lecture-of-the-future can run longer, the opinion/fear/hope round can go deeper, the room can sit with uncertainty instead of rushing to a next beat.

**The ~90 min shape (optional module length):**

- **~30 min — opinion / fear / hope round.** Each student speaks briefly from each register:
  - *Opinion:* what they actually think about where agentic engineering is going
  - *Fear:* what they're quietly worried about (own obsolescence, team readiness, craft erosion, what happens to junior engineers)
  - *Hope:* what they want to happen for their work, their team, their practice, their next three years

  The vulnerability of naming fear and hope alongside opinion is part of the pedagogy. With a full module of runtime (vs. 15 min in the compressed version), each register gets real air, and the room can sit with what was said instead of moving on.

- **~40 min — Antti's lecture of the future.** Risto-style directness: *here's how I see it, including what I don't know, including what I've been wrong about before.* Names directions, names uncertainties, names what they're betting on. The Rory discipline: counterintuitive reframes over obvious takes. The Seth discipline: warmth and generosity, not posturing.

- **~20 min — open-question close.** No worksheet. No 90-day plan. What's left is the question each student carries home.

**What M8 refuses to do:**
- Close the big question. *Where is this all going?* is left open, on purpose.
- Confer an identity ("you are now an agent builder"). Engineers are already engineers; the training sharpens, doesn't re-name.
- Pretend the team-work answers arrived in the training. They didn't. Saying so out loud is part of the directness.
- Package into a 90-day commitment plan. Students leave with the question, not with a worksheet.

**Why optional.** Core (M1–M6) with grounded rescue at M6 is a legitimate close. M8 exists for cohorts whose sponsor wants the full arc. **If opted-in, M7 and M8 run as a pair** — M7's team deliberation primes M8's *"where is this going?"* with real artifacts, not abstract speculation.

**Open questions inherited from Bootstrap M8** (tracked): runtime dependency on Cowork trajectory; bridge if capability still landing; whether orchestrator-agent ships as scaffold or generated on-the-fly; F-Secure copyright fence. See `memory/project_m8_joint_panel.md`.

**Self-study variant.** Opinion/fear/hope round happens in writing with the Agentic Nerd as listener; lecture-of-the-future is pre-recorded or written; M7 uses persona-stand-ins from the student's own agent stack.

## Skills — using and authoring, threaded across modules

Skills are a first-class capability in Claude Code (scoped, named, reusable moves the agent can invoke). The training makes skills visible from hour one, treats authoring as a standard move by M3, and uses the team kit as a literal skill repository (not a metaphoric "shared folder").

**Per-module skill activity:**

| Module | Using | Authoring |
|---|---|---|
| M1 | 1–2 pre-installed skills invoked during bug fix; vocabulary arrives at the moment of invocation | none |
| M2 | **grill-me** (Matt Pocock, MIT, forked to `curriculum/skills/external/pocock-skills/grill-me/` at commit `a6bdfd9`, 2026-04-22) — Socratic requirement elicitation, walks down unresolved branches of the plan's decision tree. Invoked at P4 as the second-pass read after student's own push-back. | none |
| M3 | **Invokes two curated skills** — `access-control-analysis` + `stride` (Bosser-curated, ship in content folder) — on a feature the student is shipping | **Authors first skill** — test-strategy skill, written through conversation with Claude (not by typing markdown), self-critique pre-ship, invoked on the security-tested feature, shipped to team kit (team kit born) |
| M4 | Uses team-kit authored skills from M3 as memory-navigation helpers | none |
| M5 | Uses team-kit skills during send-off (verifier-shaped skills from M3 apply) | none |
| M6 | Uses team-kit skills during return-and-diff | **Authors second skill** — sharpened verifier packaged as skill, shipped to team kit |
| M7 *(optional)* | Deliberation agents load the cohort's accreted skills as their first read; peak use-case | Spontaneous — skills may emerge from deliberation and get added to the team kit mid-module |
| M8 *(optional)* | none (human close) | none |

**The woven design rule.** Every module after M3 produces or uses at least one skill. Skills compound the team kit alongside gates, constraints, and memory-navigation helpers.

**Curation principle applies.** We don't teach "how to author skills" as an abstract topic. We teach the artifact move — *"your judge is a skill; here's where it lives."* By M6 the student has authored two. Abstraction arrives retroactively, as naming for a move already performed. Same Klaassen-true pedagogy the rest of the training honours.

## Team kit — the side-story that compounds (cross-module)

Not its own module. Side-story that accretes from M3 onward, mirroring how Intercom's 267-skill plugin repo (31% R&D contributing) was actually born — by accretion, not by design.

**Design rule:** team infra is born from one student packaging their first judge/constraint as a skill and shipping it. Grows by accretion, one contribution at each authoring or use moment from M3 onward. **Never charter-first** — *"let's design the team plugin architecture in M5"* produces exactly the corporate-platform-team thing Klaassen ridicules.

**Per-module accretion:**

| Module | Move | Cumulative state |
|---|---|---|
| M1 | None — solo on own repo | empty |
| M2 | Seed the noticing — *"if a rule your agent just followed would serve a teammate, jot the name"* | one note in personal CLAUDE.md |
| M3 | **The birth.** Q exercise ends with *author + self-critique + invoke + ship*. One authored skill per student (test-strategy); two curated S skills stay in content folder | ~10 contributions (cohort of 10) |
| M4 | Students use team-kit skills as memory-navigation helpers; cohort adds a few memory-helper skills | ~15 files |
| M5 | Pre-send-off reads the team kit for verifier + constraints. No new authoring | ~15 files |
| M6 | **Second authoring** — sharpened verifier packaged as skill, shipped | ~25 files |
| M7 *(optional)* | Deliberation agents load accreted skills as first read; new skills may emerge mid-deliberation | ~35+ plus generated |
| M8 *(optional)* | None — human close | unchanged |

**Substrate.** Default: real shared Git repo (e.g. `agents-102-team-kit`) — single-company cohort spins one up at training start, survives past. Fallback: folder on the cohort site. Last resort: mocked shared folder (dies after training).

**Naming.** Student-facing: **the team kit** (plain, no platform-team energy). Klaassen attribution as **plugin repo** at M3's birth.

**Self-study variant.** Solo student's "team kit" is artifacts shipped to their actual team's repo — real teammates, not cohort peers. Lands harder than mocking a fake cohort.

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
| Team kit — skills, gate specs, constraints (M3 onward) | e.g., shared plugin repo, monorepo `.claude/` directory, team-kit Git repo |
| Memory / knowledge architecture (M4 onward) | e.g., `.claude/memory/`, external wiki with pointer file, shared team repo |

**Student moves, two legitimate paths, one forbidden.** In the exercise, the student either (a) accepts the company default — the sponsor's call, fine, most will — or (b) proposes a better home *with a reason the team can argue with*. Both are learning. "I don't want to pick one" is not on the list. Refusing to leave durable knowledge anywhere violates the compounding premise the whole training runs on.

**Why load-bearing.** The trainer doesn't settle a repo-convention debate in the room — that's sponsor responsibility. The forcing function runs upstream: see [training-as-forcing-function](../memory/project_training_as_forcing_function.md). Half the CTOs will discover their org doesn't have an answer. That discovery IS sales output. **Override is legitimate, not rebellion** — engineers often have a better sense of their repo than a top-down pick.

**Where it shows up:**
- **Sponsor-facing worksheet** — [`strategy/ae101-sponsor-prework.md`](../strategy/ae101-sponsor-prework.md). Sent to sponsor weeks before Day 1 (one question, four answers, 15 min). Ops converts answers into `content/pre-engagement-contract.md` in the cohort's content bundle.
- **M1 exercise** (`ship-trivial-bug.md`) references sponsor-stated ADR + rules-file homes as defaults; override path explicit.
- **M3 Q+S exercise** references sponsor-stated team-kit substrate; first skill-shaped contributions land there.
- **M4 memory exercise** references sponsor-stated memory home.
- **The Agentic Nerd** reads `content/pre-engagement-contract.md` at module blockers and substitutes the sponsor's actual answer. When a student overrides, the Nerd logs it to `content/overrides.md` for the trainer's cohort-close memo: *"Your six engineers agreed on decisions, split 3/3 on memory, proposed a team-kit repo by 4/6."* That's a Q3 planning artifact.

## Delivery architecture

**The compounding lives in the student's real repo. The curriculum lives in a content folder next to it.**

Two artifacts per student:

1. **Content folder** — `agents-102-content-agentic-engineering-101/` (zip shipped at training start). Contains `lectures/`, `exercises/`, `prework/`, `reference/`. All markdown. Claude reads from this folder at the Nerd's direction; the student skims when they want to. Same markdown renders via the cohort site for projection and human browsing — the file-on-disk is the source of truth for agentic reading.

2. **The student's real repo** — where compounding actually happens. The student picks this repo in prework. The repo's root `CLAUDE.md` (or `.claude/CLAUDE.md`) grows each module. Decision-journal entries land as ADRs in the repo's existing convention (or `docs/adr/NNNN-slug.md` if none). Three-block memory (M4+) lands in `.claude/memory/`. Skills authored at M3 and M6 live in the team-kit substrate (per the pre-engagement contract). No separate training directory, no `module-N/` folders, no file-ceremony. Work happens where work belongs.

**Repo choice matters but isn't a blood oath.** Criteria: one the student owns or co-owns, one they'll still work in six months, one dense enough that compounding has somewhere to land. If a student switches repos mid-training (team change, project end, wrong choice in prework), replay M1 → M(current) on the new repo in an evening.

**Replay is first-class, not remedial.** The Nerd fast-paths replay — *"you've done this shape; let's regenerate the artifacts for this repo"* — because the pedagogy already landed. Replay is artifact regeneration, not re-learning. **Design constraint on every module:** exercises must produce artifacts deterministically enough to replay. Modules with a room-scale moment (M7 deliberation, optional) or multi-day wait (M5 send-off) carry an explicit replay-variant path.

**Prework is agentic end-to-end.** No "create this file, paste this content, commit these lines." The student unzips the content folder, points Claude at it, asks Claude to walk them through prework. Claude runs the repo-choice conversation, the bug-finding conversation, the install check. Pre-fabricating state the student could generate in conversation violates the *ask-the-agent-don't-type-in-a-terminal* pedagogy.

**The Nerd reads the content folder.** It doesn't carry Klaassen / Huryn / Ronacher in its head — it reads `lectures/the-wizard-move.md` and `exercises/ship-trivial-bug.md` and surfaces what's there at blockers. Curriculum becomes Claude-readable reference, not human-only reading material.

**No persistent training-dir state.** Everything the student needs after M1 lives in either their repo (compounding artifacts) or their head (the pedagogy). If the student can't reconstruct the prior module from `git log` + the repo's current `CLAUDE.md`, the module didn't land.

## Format

- **Length:** likely 2 days or 6 weeks for the 6-module core. Cohorts opting into M7+M8 add ~1 day (or two additional weeks in the 6-week format).
- **Cohort:** single-company
- **Modules:** 6 core + 2 optional extensions. Core is canonical — every cohort runs it. Optional extensions run when the sponsor has appetite for the team peak and the closing beat.
- **Session runtime per module (working bid):**
  - M1 Getting going + context ~2h (the orientation ramp + the bug fix; slightly longer than M2 because of MCP/skill setup)
  - M2 Plan mode ~1h45
  - M3 Earn the trust ~1h45 (3 exercises: 2 × invoke curated skill + 1 × author-your-own)
  - M4 Memory ~1h45
  - M5 Send-off ~2h (orchestration headroom)
  - M6 Return ~2h (retrospective + skill authoring)
  - M7 *(optional)* ~2h (deliberation 70 min + frame 50 min)
  - M8 *(optional)* ~1h30 (opinion/fear/hope 30 min + lecture 40 min + close 20 min)
  - Total core: ~11h. Total with optional: ~14h30.
- **Belief > correctness, 50%-wrong-is-curriculum** (ports from Engineering Management)
- **Calibration question** (*did you make progress? did you lay ground?*) applies to every module

## State of play (rolling)

**Current shape (settled 2026-04-22 restructure):** 6 core + 2 optional. M1 Getting going + context + MCP · M2 Plan mode, done right · M3 Earn the trust (Q+S, team kit BIRTH) · M4 Memory · M5 Long-running send-off · M6 Long-running return · M7 *(optional)* Agents meet agents · M8 *(optional)* Where is this all going? Skills thread: using from M1, authoring at M3 + M6. Core runtime ~11h over 2 days; +M7/M8 adds ~3h30. Pre-engagement contract: rules home referenced at M1, team kit home at M3, memory home at M4.

**Also settled:** first cohort runs at full price (revenue event, not discount-for-evidence); Bootstrap is irrelevant as prerequisite; `crux` / `assumption-test` / `pre-mortem` NOT ported (engineers already have those instincts; M7 runs on the cohort's own authored engineering skills).

**Recurring themes named (2026-04-23):** the four practitioner-truths the curriculum lives inside — 90% correct (problem), compounding builds the system (method), LLM as mirror (operator), mechanically self-aware (interface). See new § "Recurring themes." Frame for every subsequent module spine; modules earn themes, not recite them.

**M1 dependencies built (2026-04-21 long-running-gen cycle):**
- `curriculum/trainings/agentic-engineering-101/getting-going.md` (Pass 1 spine; needs MCP/first-skill ramp grown at front)
- `curriculum/trainings/agentic-engineering-101/prework.md`
- `curriculum/lectures/the-wizard-move.md` (Pass 2 skeleton)
- `curriculum/exercises/ship-trivial-bug.md` (Pass 3)
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

**M1 reconstruction (2026-04-23, Antti-driven):**
- `curriculum/exercises/ship-trivial-bug.md` — reshaped to three phases: P1 orient + introspect (`/context`); P2 fix tests-first, no plan mode, seed `CLAUDE.md` mid-exercise; P3 retro extends `CLAUDE.md` + short MCP framing + close the ticket via connector. Themes (mirror / grain-of-salt / 90% / compounding) plant experientially in P1–P2, no lecture.
- **NEW file** `curriculum/reference/mcp-and-connectors.md` — first entry in `curriculum/reference/`. Per-tracker install (`gh` CLI for GitHub Issues / Atlassian Rovo MCP for Jira / Composio or Merge for Linear), tenant-admin fallbacks, "Last verified" date to track freshness. Exercise points at it; specifics stay out of the exercise body so they don't drift when Claude Code's install surface changes.
- Capability check via `claude-code-guide` confirmed MCP is CLI-first in Claude Code today (2026-Q2). No GUI marketplace. Informed P3 design + the reference file.
- Strategy-doc § "M1 in detail" rewritten to the three-phase shape; module-table artifact column updated.
- **Still outstanding:** module file `getting-going.md` LO + runtime + Debrief block update (deferred until Skill-invocation divergence resolves). Three-persona sim on the new shape. Antti reviewing opener (Connections + wizard-move lecture) after this pass.

**Skill-invocation divergence (open for Antti):** prior strategy had M1 invoking 1–2 pre-installed Skills. The reconstructed three-phase shape drops explicit Skill use — P1 uses `/context` (slash command, not a Skill), P3 uses MCP (connector, not a Skill). Options: (a) no Skill use in M1; first authoring + first use both land at M3; (b) reinstate a Skill beat inside one of the three phases. Resolving either way is a small edit; deferring for Antti.

**Open — decide before Pass 1:**

1. ~~**M1 MCP selection.**~~ **Resolved 2026-04-23** — capability check completed; findings codified in `curriculum/reference/mcp-and-connectors.md`. GitHub Issues via `gh` CLI is the cleanest default; Jira via Atlassian Rovo MCP; Linear via Composio or Merge. Tenant-admin fallbacks per tracker.
2. ~~**M3 Q+S exercise artifacts.**~~ **Resolved 2026-04-23** — reshaped to three exercises on a small feature the student is shipping: (1) invoke curated access-control analysis skill; (2) invoke curated STRIDE skill + ADR hardening decision; (3) author test-strategy skill via conversation, self-critique, invoke on security-tested feature, ship. Module spine drafted at `curriculum/trainings/agentic-engineering-101/earn-the-trust.md`. See § "M3 in detail" for shape.
3. **Site renderer.** Add an `optionalModules` field to the TRAININGS schema (parallel to Bootstrap's `supplementaries`) or use title-prefix workaround? Recommendation: add the field.
4. **Optional-module sell line.** AE101 equivalent of Bootstrap's *"Plus two optional extensions…"*: A/B *"Plus two optional modules when the cohort wants the team peak."*
5. **Red-team-me skill.** Pocock's grill-me is Socratic-elicitation, not adversarial. A genuinely adversarial *"imagine the worst way this plan fails, argue for it"* skill is a real authoring opportunity — likely M3 (judge-building) or the skill-authoring arc. Not M2.

**M3 dependencies built (2026-04-23, Antti-driven strategy-session reshape):**
- `curriculum/trainings/agentic-engineering-101/earn-the-trust.md` — Pass 1 spine, three-exercise shape (S-first), runtime 1h45, feature-size framing as pedagogy (small/large tradeoff, trust student's Claude-speed calibration).
- Strategy-doc § "M3 in detail" rewritten; module-table artifact column updated; Skills table + Team-kit table + Format runtime synced.
- Shape pinned in-session: *curated S skills (access-control-analysis + STRIDE) + authored Q skill (test-strategy)*; self-critique move via *"disclose the weakest part"*; invocation-closes-loop via *"go check the test strategy — is it good?"*; skill authored through conversation, not markdown editor.
- **Still outstanding:** Pass 2 exercise files (3), Pass 2 lecture, curated skill files (access-control-analysis + STRIDE), eval instance, three-persona sim. Feature-size Connections framing needs simulation to verify it lands without prescription.

**TODOs for Pass 1:**
- Write M4–M8 module spines (5 files). Next long-running-gen sessions per `module-design-long-running-strategy.md`.
- Grow `getting-going.md` M1 file with MCP + first-skill ramp at the front.
- Write research-grounded-moves companion file (EM has one; 101 doesn't).
- **Capability checks:** Opus 4.7 long-running behaviour (before M5 drafts); MCP setup (before M1 drafts). Both via `claude-code-guide`.
- M1: flesh out wizard-demo + student-trick + MCP wire + first skill invocation.
- M5: canonical multi-hour task that requires agentic persistence but finishes in-session; monitoring + recovery patterns.
- M7: problem-selection protocol (how the CTO picks the right engineering problem); self-study variant with persona-stand-ins.
- Frontier reading list — named practitioners (Karpathy, Willison, Huryn, Cherny, Sottiaux et al.); refreshed per cohort.

**Bootstrap reuse candidates:** Plan mode primer → M2 **NOT PORTED** (v3 authored fresh; Bootstrap's primer is builder-leader voiced and has no forced-push-back mechanic) · Context is King → M1 · Compounding lecture → M4 · When to split an agent → M5 · Hallucination bake-off → M3 Q · Orchestrator + eval loop → M5 · M8 joint-deliberation → M7 (engineering-problem substrate). `crux` / `assumption-test` / `pre-mortem` NOT ported.

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
