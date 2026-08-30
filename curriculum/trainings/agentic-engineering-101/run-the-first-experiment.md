# Run the first experiment

## Big Idea
Prep your first long session. The session is how you find out what's missing.

## Prework

The scoped task you picked as homework.

**A real slice you'd send off rather than nudge bit by bit. Bigger than a typo-fix, smaller than a big epic.**

Optional forward-look: [The agentic engineering progression](trainings/agentic-engineering-101/supplementary/agentic-engineering-progression.md). And when your sessions start running heavy, [The context ceiling and token efficiency](trainings/agentic-engineering-101/supplementary/the-context-ceiling.md) on keeping the context window lean.

If Lucas F. da Costa's [Backpressure Is All You Need](https://www.lucasfcosta.com/blog/backpressure-is-all-you-need) is still on your list, read it before the send-off: today's session produces changes faster than you can read them, which is the condition the essay is about.

If you read Horthy's [Why Software Factories Fail](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md) in the gap after Module 1, this module's un-watched session may look like exactly what that essay warns against.

## What You'll Learn
After this module, you will be able to:
- **Scope** a real send-off task in conversation with Claude, multi-file reasoning, not step-by-step nudging
- **Walk** what you've built (`CLAUDE.md` + `CLAUDE.local.md` + memory + ADRs + any skills you've authored + connectors) against the task as a subagent audit, then push back on the audit
- **Fill** the worst gaps in conversation: new observations written, rules sharpened, business-rules pointer wired wherever your team keeps shared rules (or the gap named explicitly)
- **Send off** the task un-packaged in the same Claude Code session, no plan.md, no verifier, no reference artifact, and let it run

## Start here

Short loops sit behind you so far: a bug fix, a plan read. This is the first long one. Multi-hour, sustained, running without you watching.

**The question, to you:** which task have you been putting off because it needs hours of babysitting? The room's answers will differ: migration, gnarly refactor, test-coverage expansion, performance chase, API cutover. That's the point.

The map has a far side. Before the first long session, see the country you are entering.

[Lecture: The far half of the map](lectures/the-far-half.md)

[Lecture: The agent loop](lectures/the-agent-loop.md)

[Lecture: Test and learn](lectures/test-and-learn.md)

[Exercise: Prep the session, fill the gaps](exercises/walk-and-send-off.md)

[Exercise: Set the markers, send it off](exercises/set-the-markers-send-it-off.md)

[Lecture: What keeps a long-running session going?](lectures/what-keeps-a-long-running-session-going.md)

[Lecture: The ironies of automation](lectures/ironies-of-automation.md)

## Key Concepts
<!--tier:2-->

- The audit ranked the thin spots in your setup against one real task. You corrected the ranking, then filled the worst two or three.
- The task went out un-packaged: no plan file, no verifier, no reference artefact. Nothing but what you already had.
- Traces are data. Stopping a session that has gone off the rails is reading, not failing.
- The session started from a pinned commit on a throwaway branch. This was an experiment, not production work.

## Optional challenges
<!--tier:3-->

Pick one when a normal send-off no longer feels strange enough.

- Run Matt Shumer's [Gauntlet Loop](https://somethingbig.ai/gauntlet-loop) against an inspectable artifact and a real external quality bar.
- Try Matt Pocock's [Wayfinder skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/wayfinder/SKILL.md) on a project too foggy for one session. See whether its decision map clears the route.
- Build a personal brain that reads your specs, ADRs, and postmortems, then helps you frame a feature by asking the questions your team usually discovers late.
- On a disposable branch, use [`/goal`](https://code.claude.com/docs/en/goal) to make the codebase 10% smaller while every test stays green. Stop if behavior changes.

## Bring to Module 5

A session that produced something. Read the agent's scrollback or commits from the send-off; check the agent didn't just stall in the first minute. A stopped session counts; the trace is the artefact.

Come to Module 5 without a session that got some way into the task and you'll be scrambling for material while the read is already underway. Your call.

## Pre-reads before Module 5
<!--tier:3-->

Optional. Start with the first.

**Read,** Ethan Mollick, [The Bitter Lesson versus The Garbage Can](https://www.oneusefulthing.org/p/the-bitter-lesson-versus-the-garbage) (July 2025). Two ways to bet on getting an agent through a messy organisation. Either you map the mess and hand over the map, or you define the outcome, supply examples and feedback, and let the model find its own way through. Mollick does not call the winner. Neither does this training. Carry the open question into Module 5, where you start adding checks around a session: each one is a claim that this is a place the model still needs you, and claims like that expire.

The rest point at the same surprise: the effort in agent work sits in the framing and the checking.

**Read,** [Clean Code Is Steering: Reading Uncle Bob's Agent Experiments](trainings/agentic-engineering-101/supplementary/clean-code-is-steering.md). Uncle Bob's public learning journey with AI coding: early speed, mercury-like unpredictability, then tests, architecture visibility, and formal constraints as steering. It moves the question from "the agent ran" to "what would have constrained the drift?", the question you'll put to your own session next.

**Watch,** Laura Entis on Kieran Klaassen, [You're the Bread in the AI Sandwich](https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich). Interview video and write-up. The identity metaphor that names your job as framing and taste-checking; the model is the filling. You'll find the same split in your own session.

**Read,** [Verification asymmetry](trainings/agentic-engineering-101/supplementary/verification-asymmetry.md). Some tasks are far cheaper to check than to do, and delegation pays exactly there. The verifier built next is often worth more than the task it checks.

**Read (longer),** Kieran Klaassen, [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide). The term and the philosophy, and the 80/20 that follows from it: the weight sits on planning and review, and that is where the next hour goes.

## Next
<!--tier:2-->

The next module opens with what came back, or what you caught before it went further. You pinned the starting point and recorded where this session lives, so a fresh session reads it straight from `task.md`.

<!-- maintainer -->

**`## Prework`'s pre-read callback names da Costa unconditionally, no flag.** Willison's *Designing agentic loops* is the M3 access-surface read only (`plan-mode-done-right.md`); it does not belong at M4 in any cut. `plan-mode-done-right.md` assigns da Costa directly in its own `no-module:earn-the-trust` `## Pre-reads before Module 4` block, so the pre-M4 read is the same essay across every cut. Do not reintroduce a Willison branch here.

**The Big Idea leads on prep by design; the mood is carried by its second sentence.** *"Prep your first long session. The session is how you find out what's missing."* A `strategy` judge scoring `check_strategy_tie_in.md` §1 reads the first clause as prep-register against this module's curious-readiness mood and files a blocking finding; the `story` judge scores the same file PASS on persona traces. The experiment framing lives in the second sentence, and the compliance drift the judge fears already has its trainer reframe in § Meta (*"enough is a question for M5. The experiment is the point"*). Accepted for the first cohort and tracked as a watch in `pre-cohort-todos.md`, with the firing condition named there: a room whose Phase 2 mood reads below 7 and whose *"is this enough?"* pattern traces to this slide rather than to task selection. Do not rewrite the Big Idea to resolve the judge; if the watch fires, lead on the experiment and demote the prep clause.

**The tracker-hunt aside is cut from `## Start here` (2026-08-14, Antti).** It read *"The agent can read your tracker if you've wired one up. Give it your criteria first … or the hunt returns noise. Finding the task is still your judgement about what's been sitting. Bring one or two candidates to the exercise's first step and the agent screens them for fit."* Wrong slide: the task was picked as homework at the previous module's close, so by this slide the student is in the room holding candidates and the hunting advice has expired. The rest was either obvious to a working engineer (give an agent your criteria or get noise) or already said by the beat it points at (`walk-and-send-off` Phase 1 screens the candidates). The Connections blocker in the trainer notes keeps the recovery for the student who arrives empty-handed, which is where a room-time answer belongs.

**Mollick leads `## Pre-reads before Module 5`, and the block runs five entries (2026-08-21, Antti-directed).** *The Bitter Lesson versus The Garbage Can* is the stance-setter for a module that spends its hour adding checks: each check is a claim that this is a place the model still needs you, and the essay is the argument against making too many such claims. It sits first because the other four all argue the opposite direction (the effort is in framing and checking), and a student who meets those four cold builds gates for their own sake. The block's own lede splits accordingly: *"Start with the first"*, then the shared thread for the rest.

**Slide size accepted:** Pre-reads before Module 5 — same argument as `getting-going.md`'s reading list: a between-module reading list read at the student's pace, not a slide a trainer stands next to, and the annotations are what make an optional read get taken. Do not cut an entry to reach the word cap, and do not demote Mollick to keep the original single-thread lede.

**The factory pre-read now ends on the provocation, unanswered (2026-08-14, Antti: "gives too much away").** It used to continue *"It isn't. The task leaves from a pinned commit on a throwaway branch, sized as an experiment, and the planning and checks the essay says are missing are what Module 5 builds. You are not running the factory; you are collecting your own copy of its evidence, on purpose."* That answered the module's own tension in prework: it named the pinned-commit / throwaway-branch design before the student meets it, and it pre-announced M5's job. The line now stops at *may look like exactly what that essay warns against* and the module resolves it by being run. Do not restore the reassurance; if a judge reads the pre-read as leaving the student uneasy, that is the intended state.

**The nudge-count accept-note lives with the line, in `exercises/set-the-markers-send-it-off.md`** (2026-08-12, send-off extraction): the §16 boundary argument defending *"Past ten or so, you've become the agent"* is stated there once. Do not re-add a copy here (`check_pedagogy.md` §64: maintainer blocks point, they do not restate); a judge auditing this file never reads the exercise body, so it cannot flag the line from here.

**Quality:** compendium-audited 2026-08-30 (writing@43e6cae1 story@85515fa0 technical@8cc00874 behavior@17446703 pedagogy@85515fa0 strategy@43e6cae1 slides@43e6cae1)
- judges @85515fa0: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @d47fb5af: PASS — set=[run-the-first-experiment,learn-from-the-test,spot-gaps-build-the-loop]; 2 pairs, 0 blocking; see instances/ae101--module-set--m4-m5-m6.cross_module.json
- cross_module @d47fb5af: PASS — set=[earn-the-trust,run-the-first-experiment]; 1 pair, 0 blocking; see instances/ae101--module-set--m3-m4.cross_module.json

**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze + Create
- **Pacing:** Runtime is computed — `node scripts/calculate-time.js run-the-first-experiment`. Trainer demos slowly, room copy-pastes concurrently. Send-off is a single prompt paste, not a wait. The compressed 2-day slot still needs a cut beyond the ones the `Transitions` line already models; which one is undecided — the compaction programme in `training-architecture.md` owns the call.
- **Transitions:** connections 10 @start "Connections: candidate tasks" · close and bridge 3 @end "Close + Bridge"
- **Charge:** what-keeps-a-long-running-session-going 0 — the four-slide observational closer rides the active send-off session; it spends the room's attention, not the module's clock.
- **Prep / bridge timing:** Mollick essay 10 min; Uncle Bob supplementary 7 min; Entis/Klaassen interview 30 min; verification-asymmetry supplementary 2 min; Klaassen compound-engineering guide 15–20 min. Block total ~64–69 min across five entries, second instance of the shape `getting-going.md` set at 60 min across four.
- **Deliberate incompleteness:** M4 leaves the un-packaged send-off and the unfilled gaps beyond the top three open. The closer observes where existing boundaries fire, where the session waits, and where nothing pushes back. The trainer does not add packaging or patch the gaps before M5 reads the result.
- **Mood target:** curious readiness — *"I've built enough to try; let's see what the agent does."* Watch for: mood drift toward compliance-feeling (*"did I prepare the right way?"*) or performance-anxiety (*"what if it fails?"*). Diagnostic: student at Phase 2 keeps asking *"is this enough?"* Fix: trainer reframes — *"enough is a question for M5. The experiment is the point."*
- **Lecture wiring (2026-07-02):** `lectures/the-agent-loop.md` promoted from M1 supplementary (Antti-directed), inlined between the far-half opener and Test and learn. Beat rationale: the far half names the country, this names the machine about to walk it; its three introspection prompts run on the live session that will carry the send-off, so the tool list that comes back is the one the long run rides. Promotion record + eyeball questions in the lecture's maintainer block.
- **Closing lecture wiring:** `lectures/what-keeps-a-long-running-session-going.md` is a four-slide observational beat after the send-off. It rides the active session and points at durable state, feedback, and boundaries already present without changing the un-packaged baseline. `lectures/ironies-of-automation.md` closes the module after it (placement 2026-08-25, Antti-directed): the human-touch close, and a beat a trainer can skip cleanly because no exercise depends on it.
- **Delivery architecture:** canonical in training-architecture.md §Working directory model / §Session boundaries. Not restated here. Module-specific: the send-off happens IN the same session the student used for walk + fill + frame + retro — no new session, no scheduled agent, no cloud runner. 15-30 minutes is enough for the clues the M5 read needs; engineers run these for hours at work, ambition grows with practice.

**Push-back moves** (trainer delivers):
- **Connections blocker** — student can't name a task. Trainer runs three-candidate conversation with the size rule; pushes against too-small (Claude will crunch it and learn nothing) and too-large (won't cohere over a long crunch window).
- **Phase 2 audit passivity** — student reads the ranked gap list and moves on without picking three. Trainer push: *"which of these will hurt the agent most given the task? fill those."*
- **Phase 2 over-fill** — student tries to close all five gaps instead of the worst three. Trainer push: *"Three is the budget. Skip the other two — you'll see next module why."*
- **Phase 2 gap deferred as "architectural, not contextual"** — student looks at a thin spot, says *"that's a real code change, I'll skip for tonight."* High-impact failure mode: skipping a contextual gap that looks architectural makes the un-packaged run fail in a *boring* way (wrong DB assumption, stale config) instead of an *interesting* way (agent loses coherence). M5 can't rescue a boring failure. Trainer hard push: *"if the audit calls it context — even if the fill is 'add a rule saying we use X, not Y' — it's still context. M5 needs an interesting failure to diagnose, not a boring one. Fill it."*
- **Send-off pre-empt** — student tries to package the task (add plan.md, build a verifier) before sending off. Trainer push: *"un-packaged is by design. M5 teaches you packaging by diagnosing what breaks here. Don't pre-empt the learning."*
- **Send-off anxiety** — student hesitates at the final prompt (*"what if it runs forever / breaks things / gets nowhere?"*). Trainer push: *"stop it when you've seen enough. Traces are data. A result you can read is enough; you do not need a completed artifact."*
- **Business-rules skipped** — student has no clear business-rules layer and moves on without naming it. Trainer push: *"the gap IS the finding. Write one line in memory naming what's missing."*

**Watch-fors (cross-phase):**
- Task sprawl — student brings the whole epic at Connections. Cap during pick; redirect to a sliceable sub-piece that still needs the two load-bearing properties (requirement-weaving, multi-file reasoning).
- Audit busywork — Claude returns 15 items; student drowns. The prompt asks for top 5; enforce.
- Voice smuggling — the fill beat or the close framed as unleashed leverage (M5 mood) or joyful creation (M1 mood). M4 is curious readiness — stakes without performance, readiness without completion.
- Package-pre-empt — the biggest M4 failure mode. Watch for: *"should I add a plan.md first?"* or *"I'll just build a quick verifier."* Both are correct moves; wrong module.

**Decision points:**
- **Phase 1 runs long (>15 min):** task is too big. Force a slice. Better a smaller task that runs the full arc than a large one the student can't scope in 15 min.
- **Phase 2 runs long (>40 min):** audit surfaced genuinely useful gaps. Let it run; the optional tidy-up at Phase 2's tail is the first thing to drop.
- **Phase 2 finishes early:** the optional tidy-up is where the slack goes. It is quick, and a student who runs it should land the diff before the send-off.
- **Whole-room mood below 7:** curious readiness isn't landing. Check: did the pick conversation produce real tasks (curiosity) or compliance ones (performance)? If compliance, Phase 1 trainer push-back wasn't sharp enough. Task-selection is where this mood starts or dies.

**Plug points (trainer):**
- Student's own task you'd send off rather than nudge bit by bit (Connections pick)
- Rules-file home (Phase 2 rule-sharpening lands here) — `./CLAUDE.local.md`
- Observations / business-rules home (Phase 2 fill destination) — `observations/` by default; wherever the repo already keeps business rules (e.g., `docs/business-rules/`, `wiki/policy/`) if it has a place
- The team's tracker (Phase 1 task surfacing) — Linear / Jira / GitHub Issues; if MCP is wired, Claude can read the tracker for candidates given the criteria first

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Pins a SHA on a fresh branch before dispatching any long-running agent task.** Falsifiable: git log shows a `<prefix>/<slug>` branch with a "starting point" commit message before the agent's first task-execution commit.
2. **Stops a stalled agent run at ≤20 minutes and names the failure mode in writing** rather than waiting for completion. Falsifiable: scrollback of a long-running task shows a manual stop with a one-line note about what wobbled.
3. **Walks `observations/` + ADRs + skills against a real task before sending it off**, picks the worst three gaps to fill, and writes them rather than filling all five. Falsifiable: pre-task observations diff shows two-or-three new observations or rules tied to the task at hand, not a comprehensive sweep.

**Artefact contracts** (per `check_cross_module.md` §5 — every produced artefact with a stable identifier gets a contract row):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| M4 starting-point branch + SHA | `m4/<task-slug>` branch at the short SHA Claude reports after the commit prompt; both written into the protected `Run coordinates` block in `task.md` — the load-bearing stable identifier, not scrollback and not `./CLAUDE.local.md` | "Commit the current state…" prompt (`ae101-m4-commit-starting-point`) in `exercises/set-the-markers-send-it-off.md` § *Pin the starting point* | M5 worktree-setup prompt reads the `Run coordinates` block in `task.md` directly and forks `../<repo>-m5` from the named branch + SHA, so the packaged re-run starts from the same code state as the un-packaged run |
| Filled gap entries | `observations/` (cross-session default) or the repo's existing business-rules home | Phase 2 walk-and-fill prompts — observation written, rule articulated, business-rules pointer wired | M5 packaged re-send (the agent loads the same observations + the new packaging on top); M6 Phase 1 reads the worktree copy as part of the system that produced both runs |
| M4 session transcript | `~/.claude/projects/<project-folder>/<session-id>.jsonl` (Claude Code's default storage) | The Claude Code session running the M4 walk + send-off; persisted by the runtime, not by an explicit prompt | M5 opening — the M5 session reads the M4 transcript directly to ground the *"what came back"* read |

**Per-phase failure mode + escape hatch** (per `check_pedagogy.md` rule 47 — every phase shipping a forcing function names its dominant failure and one recovery move):

| Phase forcing function | Dominant failure mode | Escape hatch |
|---|---|---|
| Connections — *"come with one or two real candidates"* | Connections blocker — student can't name a task, or names a typo-fix / quarter-long epic | Trainer runs three-candidate conversation. Criteria: requirement-weaving, multi-file reasoning. Push against too-small AND too-large. |
| Phase 2 — *"pick the worst three gaps from the audit, fill those"* | Phase 2 over-fill — student tries to close all five gaps | Trainer push: *"Three is the budget. Skip the other two — you'll see next module why."* |
| Phase 2 — *"if the audit calls it context, fill it"* | Phase 2 gap deferred as *"architectural, not contextual"* — student skips a contextual gap that looks architectural; the un-packaged run fails in a boring way M5 can't rescue | Trainer hard push: *"if the audit calls it context — even if the fill is 'add a rule saying we use X, not Y' — it's still context. M5 needs an interesting failure to diagnose, not a boring one. Fill it."* |
| Phase 2 tail — the optional tidy-up (*"propose 5 to 10 ways to make `./observations/` load better"*) | student plans the tidy-up in chat but never lands the diff | Trainer, only for a student who chose to run it: *"land the diff before you paste the send-off, or drop it."* The beat is Optional on the student's page; do not turn it into a gate. |
| Send-off — *"pin the SHA on the named branch before sending off"* | Student notes the SHA but not the branch name, OR closes the session before the commit completes; M5's worktree instruction lands with an ambiguous starting point | Trainer push: *"read me back the branch name and SHA Claude confirmed. Have you noted both somewhere you'll find at M5 start?"* |
| Send-off — *"send un-packaged"* | Send-off pre-empt — student tries to package (add plan.md, build a verifier) before sending off | Trainer push: *"un-packaged is by design. M5 teaches you packaging by diagnosing what breaks here. Don't pre-empt the learning."* |
| Send-off — *"stop the session when you've seen enough; the trace is the result"* | Send-off anxiety — student hesitates at the final prompt or feels they need a completed artifact | Trainer push: *"stop it when you've seen enough. Traces are data. A result you can read is enough; you do not need a completed artifact."* |

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-08-15 result:OK due:2027-01-27]` https://somethingbig.ai/gauntlet-loop — [practitioner direct] Matt Shumer's named method splits an inspectable artifact among builders and fresh critics, compares it with a concrete bar, and repeats. fallback: describe the challenge generically as separate builder-and-critic loops against an external bar.
- `[checked:2026-08-15 result:OK due:2027-02-15]` https://github.com/mattpocock/skills/blob/main/skills/engineering/wayfinder/SKILL.md — [practitioner direct] Matt Pocock's skill maps work too large for one session into linked decision tickets until the route is clear. fallback: ask the student to build the same decision map manually without naming the skill.
- `[checked:2026-08-15 result:OK due:cohort]` https://code.claude.com/docs/en/goal — [platform docs] `/goal` keeps a session working toward a measurable completion condition and supports constraints such as tests staying green. fallback: run a bounded manual loop against the same size and test conditions.
- `[checked:2026-07-02 result:CAVEAT due:2026-08-09]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Klaassen Definitive Guide (Feb 9 2026); core "each unit makes the next easier" thesis verified, explicit plan/work/review/compound naming is convergent-across-appearances not verbatim-on-page. fallback: phrase as "the loop that runs through his work" — never a step count; the loop expanded 2026-05-29 and a count is what dated last time (strategy doc Woven rule #1). Treat any Every.to outcome metric as vendor-self-reported.
- `[checked:2026-07-02 result:OK due:2026-10-22]` https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich — [practitioner analysis] Laura Entis (staff writer, Every) on Klaassen's AI&I appearance, Apr 22 2026; "bread in the sandwich" metaphor. due recomputed from the Apr 22 2026 byline + 6-month window; the prior due:2026-08-22 did not match the byline (byline re-confirmed 2026-07-03). fallback: keep "Laura Entis on Klaassen" attribution; if removed, cite the underlying AI&I episode as the practitioner source.
- Uncle Bob via `supplementary/clean-code-is-steering.md` — internal supplementary, not a URL in scope; its own source references are that file's audit surface. No stamp here.
- `[checked:2026-08-21 result:OK due:none]` https://www.oneusefulthing.org/p/the-bitter-lesson-versus-the-garbage — [practitioner direct] Mollick, *The Bitter Lesson versus The Garbage Can* (2025-07-28). Title, byline, date and both halves of the argument verified live 2026-08-21: the bitter-lesson claim as *"encoding human understanding into an AI tends to be worse than just letting the AI figure out how to solve the problem"*, and the garbage-can model as an organisation where *"problems, solutions, and decision-makers are dumped in together"*. Outside the 6-month window by decision: named framing piece, dated in body, same treatment as the Cherny video exception in `getting-going.md`. It carries no capability claim, so the clock buys less here than on a technique piece. **This is the module that owns the check** — `lectures/evals-as-steering.md` and `trainings/agents-101/evaluations.md` name the same piece for Agents 101 and can delegate here. fallback: drop the pre-read; the block's other four still stand.
- `[checked:2026-07-30 result:OK due:none]` https://www.lucasfcosta.com/blog/backpressure-is-all-you-need — [delegated stamp] da Costa, the `## Prework` echo of the M4 gap read, unconditional across every cut. Dated check owned by `earn-the-trust.md`, which assigns it in the six-module arc; `plan-mode-done-right.md` carries the equivalent `## Pre-reads before Module 4` assignment for cuts that drop M3. `due:none` — a delegation does not expire, the delegate's stamp does, and `source-freshness.sh` walks the delegate. fallback: drop the echo; the pre-read still assigns the piece from whichever file owns this cut's M2/M3 close.
- `[checked:2026-07-31 result:OK due:none]` https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md — [delegated stamp] Horthy, *Why Software Factories Fail*. Freshest dated check is `lectures/when-a-plan-is-good.md`. This module carries the pointer and its thesis, no number, so it delegates rather than keeping a fourth copy of the date. fallback: drop the pointer.

**Frameworks riffed on (attributed in lecture):**
- **Gap analysis** — generic business-analysis framework; no single attribution needed. The Phase 2 audit is this move; `exercises/walk-and-send-off.md` names it once, in Phase 2's opening bullet (moved there from the lecture 2026-08-25).
- **Compound engineering** — Kieran Klaassen. Named on the student surface only as a Module 5 pre-read; this module deliberately runs no compound step, so the loop is carried rather than recited.

**`practice` as a noun (Antti 2026-08-15): OK in AE101 body, sparingly; no earning beat owed (`check_writing.md §2`).** Maintainer prose is exempt (*"ambition grows with practice"* above is fine). If the noun appears in body, sparingly is the bar, not an engineered earning sentence.

**Every in-source cross-doc link uses the bare `trainings/agentic-engineering-101/…` form**, never a depth-counted `../../` prefix, per `module-shape.md`. The renderer rewrites either, so this is lint-level and invisible at delivery, which is exactly why it drifts.
