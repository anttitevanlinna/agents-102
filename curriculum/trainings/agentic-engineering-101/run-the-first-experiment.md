# Run the first experiment

## Big Idea
Walk what you've built against a real task you'd send off rather than nudge bit by bit, fill the worst gaps, send it off un-packaged, and learn from what the agent does with your system as it stands.

## Prework

The scoped task you picked as homework.

**A real slice you'd send off rather than nudge bit by bit, with a 'done' you can name in a sentence. Bigger than a typo-fix, smaller than an epic.**

Come to Module 4 without having picked the task and you'll be scrambling for one while the room is already running theirs. Your call.

## What You'll Learn
After this module, you will be able to:
- **Scope** a real send-off task in conversation with Claude, multi-file reasoning, sustained coherence, not step-by-step nudging
- **Walk** what you've built (`CLAUDE.md` + `CLAUDE.local.md` + memory + ADRs + any skills you've authored + connectors) against the task as a subagent audit, then push back on the audit
- **Fill** the worst gaps in conversation: new observations written, rules sharpened, business-rules pointer wired wherever your team keeps shared rules (or the gap named explicitly)
- **Name** the three blocks in your own material: Block 1 (observation → hypothesis → rule), Block 2 (decisions + alternatives), Block 3 (quality criteria)
- **Send off** the task un-packaged in the same Claude Code session, no plan.md, no verifier, no reference artifact, and let it run

## Start here

Short loops sit behind you so far: a bug fix, a plan read. This is the first long one. Multi-hour, sustained, running without you watching. The practice is yours now.

**The question, to you:** come with one or two candidate tasks from your backlog. Multi-hour work you haven't got to yet, or tasks big enough that you'd rather an agent took the first pass. Bigger than a typo-fix, smaller than a quarter-long epic. The room's candidates will differ: migration, gnarly refactor, test-coverage expansion, performance chase, API cutover. That's the point.

*The agent can read your tracker if you've wired one up. Give it your criteria first (sustained coherence, requirement-weaving, multi-file reasoning) or the hunt returns noise. Finding the task is still your judgement about what's been sitting. Bring one or two candidates to the exercise's first step and the agent screens them for fit.*

The map has a far side. Before the first long run, see the country you are entering.

[Lecture: The far half of the map](lectures/the-far-half.md)

The country has a trap built into it. See its shape before you send the run off.

[Lecture: The ironies of automation](lectures/ironies-of-automation.md)

Next, the thing you are sending: an LLM in a loop, calling tools.

[Lecture: The agent loop](lectures/the-agent-loop.md)

[Lecture: Test and learn](lectures/test-and-learn.md)

[Exercise: Walk and send off](exercises/walk-and-send-off.md)

## Key Concepts
- Gap analysis is *walk the system you have against the system the task needs*. The system you have is what gets tested.
- Huryn's three blocks aren't a template you fill; they're a frame that names what you've already built
- Un-packaged is by design. The packaging move only lands once you've seen what un-packaged gets wrong
- Traces are data. Stop the run when you've seen what you needed to see. Stopping is reading, not failing.
- Every send-off is an experiment, not a production run you need to get right first time

## Send the task off

No compound pass at the close. The send-off is the close of the work. Your rules files, memory, ADRs, and skills are what they are; the agent runs against them as they stand. Whatever needs sharpening will surface on the return at Module 5, when you can see what the system actually produced. Compound on evidence, not anticipation.

Before you send, set up the two markers you'll return to in Module 5.

First, the record of this run. Claude Code keeps a full transcript of every session on disk, the complete scrollback, written live and automatically. Find yours now; at Module 5 you'll point a fresh session straight at it.

Ask Claude where the record of this session lives.

{{prompt:ae101-m4-locate-transcript}}

Now pin the starting point. Whatever's in your working tree right now lands in this commit, so if you have unrelated WIP, stash or scope it out before pasting the prompt. The commit also writes the branch name and that transcript path into `task.md`, so a later session recovers this run from disk instead of hunting for it.

Ask Claude to commit current state on a feature branch, record the coordinates, and tell you the short SHA.

{{prompt:ae101-m4-commit-starting-point}}

The starting-point commit is local, and that's the default. This experiment is throwaway work you can reset away. Module 5 forks from the local commit, so nothing later needs a push.

Optional: if you want the run to outlast your laptop or to hand it to someone, ask Claude to push the branch and set its upstream.

{{prompt:ae101-m4-push-starting-point}}

One more check before the send, the same three questions from Module 3's close, now pointed at this run: does the agent hold private data, does untrusted content reach its context window, is there a channel out? All three at once is the opening prompt injection needs, and a run this long reads far more than you'll watch. All three present here, cut one leg before you paste: read-only where write isn't needed, hold the push until you've read the return, an allowlist where the run needs the web. The frame is [The lethal trifecta](trainings/agentic-engineering-101/supplementary/the-lethal-trifecta.md): three legs, cut one.

Ask Claude to run the scoped task end-to-end in this same session, with your rules files, memory, ADRs, and skills loaded.

{{prompt:ae101-m4-take-task-end-to-end}}


The laptop stays awake and plugged in while it runs (power settings → prevent sleep on power). If watching surfaces a wobble that tells you what next module will diagnose, stop the run; the trace is the result.

You'll run more work async from here on.

Nudge by hand while you're watching. Answer a question, correct a path, push back on visible drift. A handful of manual interventions is the move. Past ten and you've become the agent; call it and read what's there.

If Claude stalls and you want to see whether it picks itself back up, this nudge is phrased as encouragement and lands as a taunt:

{{prompt:ae101-m4-nudge-continue}}

The task is running. One open question while it works.

[Lecture: Will company memory emerge?](lectures/will-company-memory-emerge.md)

Before you close: read [Reading the return](lectures/reading-the-return.md). It plants the question and the three failure modes you'll use to read what comes back.

## Next

Module 5 opens with what came back, or what you caught before it went further. You pinned the starting point and recorded where this run lives, so when the next slot lands a fresh session reads it straight from `task.md`, no hunting through past sessions. Transcripts persist on disk regardless; see [Claude Code for engineers, session transcripts](../../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md#10-session-transcripts--read-what-actually-happened) for what they hold. Close the session once the run is done; the trace is on disk.

## Bring to Module 5

A run that produced something. Read the agent's scrollback or commits from the send-off; check the agent didn't just stall in the first minute. A stopped run counts; the trace is the artefact. Bring the three failure modes from [Reading the return](lectures/reading-the-return.md) as your reading lens.

Come to Module 5 without a run and you'll be scrambling for material while the room is already reading theirs. Your call.

## Pre-reads before Module 5

Optional. They sit in the Module 4 to Module 5 gap while your un-packaged run is still going. All four point at the same surprise: the effort in agent work sits in the framing and the checking, not the typing. Module 5 picks this up from your own run.

**Read, [Clean Code Is Steering: Insights from Uncle Bob](trainings/agentic-engineering-101/supplementary/clean-code-is-steering.md).** Uncle Bob's public learning journey with AI coding: early speed, mercury-like unpredictability, then tests, architecture visibility, and formal constraints as steering. It moves the question from "the agent ran" to "what would have constrained the drift?", the question Module 5 asks of your run.

**Watch, Laura Entis on Kieran Klaassen, [You're the Bread in the AI Sandwich](https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich).** Interview video and write-up. The identity metaphor that names your job as framing and taste-checking; the model is the filling. Module 5 shows you the same split in your own run.

**Read, [Verification asymmetry](trainings/agentic-engineering-101/supplementary/verification-asymmetry.md).** Some tasks are far cheaper to check than to do, and delegation pays exactly there. The verifier built next is often worth more than the run it checks.

**Read (longer), Kieran Klaassen, [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide).** The four-step loop (plan, work, review, compound). The weight sits on planning and review, and that is where Module 5 spends its hour.

<!-- maintainer -->


**Quality:** compendium-audited 2026-07-08 (writing@0ef2ca6 story@4c539ba technical@0ef2ca6 behavior@ab4b0bd pedagogy@0ef2ca6 strategy@4c539ba slides@47f3357)
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @0ef2ca6: PASS — set=[run-the-first-experiment,learn-from-the-test,spot-gaps-build-the-loop,plan-mode-done-right]
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze + Create
- **Session runtime:** 1h45 (Connections 10 / Lecture 12 / Exercise 55 / Debrief 12 / Send-off 5 / Bridge 3 + buffer). Trainer demos slowly, room copy-pastes concurrently — fits 1h45 in-class. Send-off is a single prompt paste, not a wait. Exercise breakdown: Phase 1 pick 10 / Phase 2 walk-and-fill 35 / Phase 3 see-the-frame 10.
- **Prep / bridge timing:** `reading-the-return.md` 5 min at M4 close; Uncle Bob supplementary 7 min; Entis/Klaassen interview 30 min; Klaassen compound-engineering guide 15–20 min.
- **Mood target:** curious readiness — *"I've built enough to try; let's see what the agent does."* Watch for: mood drift toward compliance-feeling (*"did I prepare the right way?"*) or performance-anxiety (*"what if it fails?"*). Diagnostic: student at Phase 2 keeps asking *"is this enough?"* Fix: trainer reframes — *"enough is a question for M5. The experiment is the point."*
- **Lecture wiring (2026-07-02):** `lectures/the-agent-loop.md` promoted from M1 supplementary (Antti-directed), inlined between the far-half opener and Test and learn. Beat rationale: the far half names the country, this names the machine about to walk it; its three introspection prompts run on the live session that will carry the send-off, so the tool list that comes back is the one the long run rides. Adds ~5 min to the Lecture beat (budget above says 12 — eyeball). Promotion record + eyeball questions in the lecture's maintainer block.
- **Delivery architecture:** canonical in training-architecture.md §Working directory model / §Session boundaries. Not restated here. Module-specific: the send-off happens IN the same session the student used for walk + fill + frame + retro — no new session, no scheduled agent, no cloud runner. 15-30 minutes is enough for the clues the M5 read needs; engineers run these for hours at work, ambition grows with practice.

**Push-back moves** (trainer delivers):
- **Connections blocker** — student can't name a task. Trainer runs three-candidate conversation with the size rule; pushes against too-small (Claude will crunch it and learn nothing) and too-large (won't cohere over a long crunch window).
- **Phase 2 audit passivity** — student reads the ranked gap list and moves on without picking three. Trainer push: *"which of these will hurt the agent most given the task? fill those."*
- **Phase 2 over-fill** — student tries to close all five gaps instead of the worst three. Trainer push: *"Three is the budget. Skip the other two — you'll see next module why."*
- **Phase 2 gap deferred as "architectural, not contextual"** — student looks at a thin spot, says *"that's a real code change, I'll skip for tonight."* High-impact failure mode: skipping a contextual gap that looks architectural makes the un-packaged run fail in a *boring* way (wrong DB assumption, stale config) instead of an *interesting* way (agent loses coherence). M5 can't rescue a boring failure. Trainer hard push: *"if the audit calls it context — even if the fill is 'add a rule saying we use X, not Y' — it's still context. M5 needs an interesting failure to diagnose, not a boring one. Fill it."*
- **Phase 3 Huryn-as-lecture** — Claude names the three-block frame before quoting the student's own decision as the Block 2 example. Trainer interrupts: *"name the frame only after showing me one of my own decisions (ADR if I have one, otherwise the most concrete recorded choice) as Block 2 — recognition first."*
- **Debrief pre-empt** — student tries to package the task (add plan.md, build a verifier) before sending off. Trainer push: *"un-packaged is by design. M5 teaches you packaging by diagnosing what breaks here. Don't pre-empt the learning."*
- **Send-off anxiety** — student hesitates at the final prompt (*"what if it runs forever / breaks things / gets nowhere?"*). Trainer push: *"stop it when you've seen enough. Traces are data. You don't owe the experiment a completed artifact — you owe it a result you can read."*
- **Business-rules skipped** — student has no clear business-rules layer and moves on without naming it. Trainer push: *"the gap IS the finding. Write one line in memory naming what's missing."*

**Watch-fors (cross-phase):**
- Task sprawl — student brings the whole epic at Connections. Cap during pick; redirect to a sliceable sub-piece that still needs the three load-bearing properties (sustained coherence, requirement-weaving, multi-file reasoning).
- Audit busywork — Claude returns 15 items; student drowns. The prompt asks for top 5; enforce.
- Voice smuggling — Phase 4 / Debrief framed as unleashed leverage (M5 mood) or joyful creation (M1 mood). M4 is curious readiness — stakes without performance, readiness without completion.
- Package-pre-empt — the biggest M4 failure mode. Watch for: *"should I add a plan.md first?"* or *"I'll just build a quick verifier."* Both are correct moves; wrong module.

**Decision points:**
- **Phase 1 runs long (>15 min):** task is too big. Force a slice. Better a smaller task that runs the full arc than a large one the student can't scope in 15 min.
- **Phase 2 runs long (>40 min):** audit surfaced genuinely useful gaps. Let it run; compress Phase 3 to 10 min if needed (Huryn recognition is quick when materials are rich).
- **Phase 3 runs short (<10 min):** student didn't recognise the frame in their own work. Diagnostic: did Claude quote from their own ADRs or recorded decisions? If not, redo the prompt.
- **Whole-room mood below 7:** curious readiness isn't landing. Check: did the pick conversation produce real tasks (curiosity) or compliance ones (performance)? If compliance, Phase 1 trainer push-back wasn't sharp enough. Task-selection is where this mood starts or dies.

**Plug points (trainer):**
- Student's own task you'd send off rather than nudge bit by bit (Connections pick) — sponsor-stated example tasks by team type (web / back / data / ML) help calibration when the student stalls
- Sponsor-stated rules-file home (Debrief rewrite lands here) — `./CLAUDE.local.md` is the repo-personal default; sponsor's actual convention overrides
- Sponsor-stated observations / business-rules home (Phase 2 fill destination) — `observations/` is the cross-session default; sponsor's actual convention (e.g., `docs/business-rules/`, `wiki/policy/`) overrides
- Sponsor-stated tracker (Phase 1 task surfacing) — Linear / Jira / GitHub Issues; if MCP is wired, Claude can read the tracker for candidates given the criteria first

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Pins a SHA on a fresh branch before dispatching any long-running agent task.** Falsifiable: git log shows a `<prefix>/<slug>` branch with a "starting point" commit message before the agent's first task-execution commit.
2. **Stops a stalled agent run at ≤20 minutes and names the failure mode in writing** rather than waiting for completion. Falsifiable: scrollback of a long-running task shows a manual stop with a one-line note about what wobbled.
3. **Walks `observations/` + ADRs + skills against a real task before sending it off**, picks the worst three gaps to fill, and writes them rather than filling all five. Falsifiable: pre-task observations diff shows two-or-three new observations or rules tied to the task at hand, not a comprehensive sweep.

**Artefact contracts** (per `check_pedagogy.md` rule 46 — every produced artefact with a stable identifier gets a contract row):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| M4 starting-point branch + SHA | `m4/<task-slug>` branch at the short SHA Claude reports after the commit prompt; SHA noted in scrollback (or in `./CLAUDE.local.md` if the student writes it down) | "Commit the current state…" prompt in *Send the task off* (line 49) | M5 worktree fork (`../<repo>-m5` checked out from this branch + SHA, so the packaged re-run starts from the same code state as the un-packaged run) |
| Filled gap entries | `observations/` (cross-session default) or sponsor-stated business-rules home | Phase 2 walk-and-fill prompts — observation written, rule articulated, business-rules pointer wired | M5 packaged re-send (the agent loads the same observations + the new packaging on top); M6 second-skill authoring reads as part of the walked-system context |
| M4 session transcript | `~/.claude/projects/<project-folder>/<session-id>.jsonl` (Claude Code's default storage) | The Claude Code session running the M4 walk + send-off; persisted by the runtime, not by an explicit prompt | M5 opening — the M5 session reads the M4 transcript directly to ground the *"what came back"* read |

**Per-phase failure mode + escape hatch** (per `check_pedagogy.md` rule 47 — every phase shipping a forcing function names its dominant failure and one recovery move):

| Phase forcing function | Dominant failure mode | Escape hatch |
|---|---|---|
| Connections — *"come with one or two real candidates"* | Connections blocker — student can't name a task, or names a typo-fix / quarter-long epic | Trainer runs three-candidate conversation. Criteria: sustained coherence, requirement-weaving, multi-file reasoning. Push against too-small AND too-large. |
| Phase 2 — *"pick the worst three gaps from the audit, fill those"* | Phase 2 over-fill — student tries to close all five gaps | Trainer push: *"Three is the budget. Skip the other two — you'll see next module why."* |
| Phase 2 — *"if the audit calls it context, fill it"* | Phase 2 gap deferred as *"architectural, not contextual"* — student skips a contextual gap that looks architectural; the un-packaged run fails in a boring way M5 can't rescue | Trainer hard push: *"if the audit calls it context — even if the fill is 'add a rule saying we use X, not Y' — it's still context. M5 needs an interesting failure to diagnose, not a boring one. Fill it."* |
| Phase 3 — *"Claude quotes one of your own recorded decisions (ADR or otherwise) as the Block 2 example BEFORE naming the three-block frame"* | Phase 3 Huryn-as-lecture — Claude names the three-block frame before showing the student's own decision | Trainer interrupts: *"name the frame only after showing me one of my own decisions (ADR if I have one, otherwise the most concrete recorded choice) as Block 2 — recognition first."* |
| Send-off — *"pin the SHA on the named branch before sending off"* | Student notes the SHA but not the branch name, OR closes the session before the commit completes; M5's worktree instruction lands with an ambiguous starting point | Trainer push: *"read me back the branch name and SHA Claude confirmed. Have you noted both somewhere you'll find at M5 start?"* |
| Send-off — *"send un-packaged"* | Debrief pre-empt — student tries to package (add plan.md, build a verifier) before sending off | Trainer push: *"un-packaged is by design. M5 teaches you packaging by diagnosing what breaks here. Don't pre-empt the learning."* |
| Send-off — *"stop the run when you've seen enough; the trace is the result"* | Send-off anxiety — student hesitates at the final prompt or feels they owe the experiment a completed artifact | Trainer push: *"stop it when you've seen enough. Traces are data. You don't owe the experiment a completed artifact — you owe it a result you can read."* |

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-07-02 result:CAVEAT due:2026-08-09]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Klaassen Definitive Guide (Feb 9 2026); core "each unit makes the next easier" thesis verified, explicit plan/work/review/compound naming is convergent-across-appearances not verbatim-on-page. fallback: phrase as "the four-step loop that runs through his work"; treat any Every.to outcome metric as vendor-self-reported.
- `[checked:2026-07-02 result:OK due:2026-10-22]` https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich — [practitioner analysis] Laura Entis (staff writer, Every) on Klaassen's AI&I appearance, Apr 22 2026; "bread in the sandwich" metaphor. due recomputed from the Apr 22 2026 byline + 6-month window; the prior due:2026-08-22 did not match the byline (byline re-confirmed 2026-07-03). fallback: keep "Laura Entis on Klaassen" attribution; if removed, cite the underlying AI&I episode as the practitioner source.
- Uncle Bob via `supplementary/clean-code-is-steering.md` — internal supplementary, not a URL in scope; its own source references are that file's audit surface. No stamp here.

**Frameworks riffed on (attributed in lecture):**
- **Huryn's three-block memory** — Paweł Huryn. Frame earns its name at Phase 3 through recognition in the student's own material.
- **Gap analysis** — generic business-analysis framework; no single attribution needed. Named in Phase 2 as *"walk the system you have against the system the task needs."*
- **Compound engineering** — Kieran Klaassen. Debrief self-compound pattern is Klaassen's Review + Compound step, now in its fourth rep for the student.

**2026-07-02** — trifecta send-off check added to `## Send the task off` (three-question check + "prompt injection" named once + supplementary pointer, last mandatory beat before the send-off prompt), wired per completeness review finding #2; second firing of the M3 pre-leash beat. Same pass: *"is the practice"* → *"is the move"* in the nudge paragraph (practice-as-noun; the M4 carve-out covers only the opener's engineered sentence at line 24).

**2026-07-03** — source-freshness stamps re-verified live 2026-07-02 and applied verbatim from the stamp queue: Klaassen Definitive Guide `checked` advanced to 2026-07-02 (still `result:CAVEAT` — thesis holds, plan/work/review/compound naming still convergent-across-appearances, not verbatim-on-page); Entis "bread in the sandwich" advanced to 2026-07-02 with `due` recomputed to 2026-10-22 from the Apr 22 2026 byline + 6-month window (byline re-confirmed via WebFetch 2026-07-03; the prior `due:2026-08-22` did not match the byline — a miscompute, not a real earlier expiry). Same pass, per refuter cross-doc-link finding: the `## Send the task off` trifecta-beat link dropped its depth-counted `../../` prefix for the bare `trainings/agentic-engineering-101/supplementary/…` form `module-shape.md` requires in source (lint-level — the renderer rewrites either prefix, so no rendered-behaviour change). Not swept: the `../../` links under `## Next`, `## Bring to Module 5`, and `## Pre-reads before Module 5` carry the same banned prefix — identical one-line fix, left for a link-hygiene sweep to avoid scope-creeping this batch.

**2026-07-03** — link-hygiene sweep (eyeball-queue #14): dropped the depth-counted `../../` prefix from the two `## Pre-reads before Module 5` supplementary links (`clean-code-is-steering.md`, `verification-asymmetry.md`) for the bare `trainings/agentic-engineering-101/supplementary/…` form `module-shape.md` requires; renderer rewrites either prefix, so zero rendered change. `## Next` / `## Bring to Module 5` carry no `../../` supplementary link (the `## Next` `../../` link is a `/reference/` path, outside this supplementary-scoped sweep — left as-is).
