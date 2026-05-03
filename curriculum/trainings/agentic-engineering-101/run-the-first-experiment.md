# Run the first experiment

## Big Idea
Walk what you've built against a real task you'd send off rather than nudge bit by bit, fill the worst gaps, send it off un-packaged, and learn from what the agent does with your system as it stands.

## Prework

Bring one or two candidate tasks from your backlog. The kind you'd send off rather than nudge bit by bit, not a typo-fix and not a quarter-long epic.

**Not an epic. Not a typo-fix. A real slice you'd send off rather than nudge bit by bit, with a 'done' you can name in a sentence.**

## What You'll Learn
After this module, you will be able to:
- **Pick** a real task you'd send off rather than nudge bit by bit, demanding sustained coherence, requirement-weaving, and multi-file reasoning. Scope it in conversation with Claude
- **Walk** what you've built (`CLAUDE.md` + `CLAUDE.local.md` + memory + ADRs + Module 3-authored skill + connectors) against that task, using gap analysis: a subagent audit you then push back on
- **Fill** the worst gaps in conversation: new observations written, rules sharpened, business-rules pointer wired wherever your team keeps shared rules (or the gap named explicitly)
- **Recognize** the three-block memory pattern in your own material: Block 1 (observation → hypothesis → rule), Block 2 (decisions + alternatives), Block 3 (quality criteria). Not built-to-spec, arranged from what you've been making for four modules
- **Send off** the task un-packaged in the same Claude Code session (no plan.md, no verifier, no reference artifact) and let it run; traces are data either way

## Start here

Three modules of short loops sit behind today: a bug fix, a plan read, a feature ship with Q+S. Today is the first long one. Multi-hour, sustained, running without you watching. Three modules in, the practice is yours now.

**The question, to you:** come with one or two candidate tasks from your backlog. Multi-hour work you haven't got to yet, or tasks big enough that you'd rather an agent took the first pass. Not a typo-fix, not a quarter-long epic. The room's candidates will differ: migration, gnarly refactor, test-coverage expansion, performance chase, API cutover. That's the point.

*The agent can read your tracker if you've wired one up. Give it your criteria first (sustained coherence, requirement-weaving, multi-file reasoning) or the hunt returns noise. Task-surfacing is still your judgement about what's been sitting. At Phase 1, come with one or two candidates and the agent screens them for fit.*

[Lecture: Test and learn](lectures/test-and-learn.md)

[Exercise: Walk and send off](exercises/walk-and-send-off.md)

## Key Concepts
- Gap analysis is *walk the system you have against the system the task needs*. A move you'll use forever
- Huryn's three blocks aren't a template you fill; they're a frame that names what you've been building for four modules
- Un-packaged is by design. Module 5 teaches packaging by diagnosing what the un-packaged run gets wrong, a lesson no lecture can land
- The rules files you finalise at Debrief (`CLAUDE.md` + `CLAUDE.local.md`) go into the test with the agent. Claude Code loads both at session start (see [Claude Code for engineers, the memory hierarchy](reference/claude-code-for-engineers.md))
- Traces are data. Stop the run when you've seen what you needed to see
- Every send-off is an experiment, not a production run you need to get right first time

## Send the task off

No Debrief. The send-off is the close. Your rules files, memory, ADRs, and skills are what they are; the agent runs against them as they stand. Whatever needs sharpening will surface on the return at Module 5, when you can see what the system actually produced. Compound on evidence, not anticipation.

Before you send: pin a clean starting SHA. Module 5 will worktree from this commit to re-run the same task packaged, so the comparison starts from the same code state. Ask Claude to commit current state on a feature branch and tell you the short SHA. Keep it noted.

**Prompt** *(Claude Code)*

```
Commit the current state of the repo on a fresh feature branch named m4/<short-task-slug>. Stage everything, commit with message "M4 starting point". Tell me the short SHA.
```

Ask Claude to run the scoped task end-to-end in this same session, with your rules files, memory, ADRs, and skills loaded.

**Prompt** *(Claude Code, final move of the module)*

```
I want you to take the task we scoped earlier in this session end to end. Work from the rules I've set up (`CLAUDE.md` team and `CLAUDE.local.md` personal both load automatically), plus the memory at `.claude/memory/`, the ADRs, and the skills available by name in this session. That's everything you have. Go.

I'm leaving the laptop awake and walking away. Work through it. If you get stuck, write what you tried and why it didn't work rather than inventing a way forward. If you finish, tell me what you shipped and what you didn't.
```


The laptop stays awake and plugged in while it runs (power settings → prevent sleep on power). If watching surfaces a wobble that tells you what next module will diagnose, stopping the run is fine; the trace is the result.

Async runs are a face of the work you'll see more of from here on.

Nudging by hand is fine if you're watching. Answer a question, correct a path, push back on visible drift. A handful of manual interventions is the practice. Past ten and you've become the agent; call it and read what's there.

If Claude stalls and you want to see if it picks itself back up, dark-humour nudge, phrased as encouragement, lands as a taunt:

**Prompt** *(Claude Code, optional)*

```
Continue --- you can do it. Can't you?
```

Before you close: read [Reading the return](lectures/reading-the-return.md) (~5 min). It plants the question and the three failure modes you'll use to read what comes back.

## Next

Module 5 opens with what came back, or what you caught before it went further. When the next slot lands, start a fresh Claude Code session in the same repo. Claude Code stores every session transcript under `~/.claude/projects/` in a folder matching this repo, so the new session can find and read your Module 4 session directly. See [Claude Code for engineers, session transcripts](reference/claude-code-for-engineers.md#10-session-transcripts--read-what-actually-happened). Close the session after the run is done if you want; the trace is on disk either way.

## Pre-reads before Module 5

Optional. Skipping any of these does not break Module 5. They sit in the Module 4 to Module 5 gap while your un-packaged run is still going; they prime the 80/20 reframe Module 5 will name from your own felt evidence.

**Read, [Clean Code Is Steering: Insights from Uncle Bob](supplementary/clean-code-is-steering.md) (~7 min).** Uncle Bob's public learning journey with AI coding: early speed, quicksilver unpredictability, then tests, architecture visibility, and formal constraints as steering. Why for Module 5: primes the move from "the agent ran" to "what would have constrained the drift?"

**Watch, Laura Entis on Kieran Klaassen, [You're the Bread in the AI Sandwich](https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich) (~30 min).** Interview video and write-up. The identity metaphor that names your job as framing and taste-checking; the model is the filling. Why for Module 5: primes the 80/20 reframe Module 5 will name from felt evidence rather than introduce as a slogan.

**Read (longer), Kieran Klaassen, [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide) (~15–20 min).** The four-step loop (plan, work, review, compound). Why for Module 5: primes the planning-and-review-heavy posture Module 5 will name from felt evidence.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-03 (technical@f65e3e4)
- judges @f65e3e4: writing grandfathered, story grandfathered, technical PASS, behavior grandfathered
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze + Create
- **Session runtime:** 1h45 (Connections 10 / Lecture 12 / Exercise 55 / Debrief 12 / Send-off 5 / Bridge 3 + buffer). Trainer demos slowly, room copy-pastes concurrently — fits 1h45 in-class. Send-off is a single prompt paste, not a wait. Exercise breakdown: Phase 1 pick 10 / Phase 2 walk-and-fill 35 / Phase 3 see-the-frame 10.
- **Mood target:** curious readiness — *"I've built enough to try; let's see what the agent does."* Watch for: mood drift toward compliance-feeling (*"did I prepare the right way?"*) or performance-anxiety (*"what if it fails?"*). Diagnostic: student at Phase 2 keeps asking *"is this enough?"* Fix: Nerd reframes — *"enough is a question for M5. The experiment is the point."*
- **Delivery architecture** (strategy doc § "Delivery architecture"): AE101 content folder + student's real repo. The send-off at Debrief happens IN the same Claude Code session the student used for walk + fill + frame + retro. No new session, no scheduled agent, no cloud runner — just pass the final prompt to the agent you've been talking to, then leave the laptop awake overnight and walk away.

**Push-back moves** (trainer delivers by default; Nerd in self-study):
- **Connections blocker** — student can't name a task. Nerd runs three-candidate conversation with the size rule; pushes against too-small (Claude will crunch it and learn nothing) and too-large (won't cohere over a long crunch window).
- **Phase 2 audit passivity** — student reads the ranked gap list and moves on without picking three. Nerd: *"which of these will hurt the agent most given the task? fill those."*
- **Phase 2 over-fill** — student tries to close all five gaps instead of the worst three. Nerd: *"Three is the budget. Skip the other two — you'll see next module why."*
- **Phase 2 gap deferred as "architectural, not contextual"** — student looks at a thin spot, says *"that's a real code change, I'll skip for tonight."* High-impact failure mode: skipping a contextual gap that looks architectural makes the un-packaged run fail in a *boring* way (wrong DB assumption, stale config) instead of an *interesting* way (agent loses coherence). M5 can't rescue a boring failure. Nerd hard push: *"if the audit calls it context — even if the fill is 'add a rule saying we use X, not Y' — it's still context. M5 needs an interesting failure to diagnose, not a boring one. Fill it."*
- **Phase 3 Huryn-as-lecture** — Claude names the three-block frame before quoting the student's own ADR as the Block 2 example. Nerd interrupts: *"name the frame only after showing me one of my own ADRs as Block 2 — recognition first."*
- **Debrief pre-empt** — student tries to package the task (add plan.md, build a verifier) before sending off. Nerd: *"un-packaged is by design. M5 teaches you packaging by diagnosing what breaks here. Don't pre-empt the learning."*
- **Send-off anxiety** — student hesitates at the final prompt (*"what if it runs forever / breaks things / gets nowhere?"*). Nerd: *"stop it when you've seen enough. Traces are data. You don't owe the experiment a completed artifact — you owe it a result you can read."*
- **Business-rules skipped** — student has no clear business-rules layer and moves on without naming it. Nerd: *"the gap IS the finding. Write one line in memory naming what's missing."*

**Watch-fors (cross-phase):**
- Task sprawl — student brings the whole epic at Connections. Cap during pick; redirect to a sliceable sub-piece that still needs the three load-bearing properties (sustained coherence, requirement-weaving, multi-file reasoning).
- Audit busywork — Claude returns 15 items; student drowns. The prompt asks for top 5; enforce.
- Voice smuggling — Phase 4 / Debrief framed as unleashed leverage (M5 mood) or joyful creation (M1 mood). M4 is curious readiness — stakes without performance, readiness without completion.
- Package-pre-empt — the biggest M4 failure mode. Watch for: *"should I add a plan.md first?"* or *"I'll just build a quick verifier."* Both are correct moves; wrong module.

**Decision points:**
- **Phase 1 runs long (>15 min):** task is too big. Force a slice. Better a smaller task that runs the full arc than a large one the student can't scope in 15 min.
- **Phase 2 runs long (>40 min):** audit surfaced genuinely useful gaps. Let it run; compress Phase 3 to 10 min if needed (Huryn recognition is quick when materials are rich).
- **Phase 3 runs short (<10 min):** student didn't recognise the frame in their own work. Diagnostic: did Claude quote from their own ADRs? If not, redo the prompt.
- **Whole-room mood below 7:** curious readiness isn't landing. Check: did the pick conversation produce real tasks (curiosity) or compliance ones (performance)? If compliance, Phase 1 Nerd push-back wasn't sharp enough. Task-selection is where this mood starts or dies.

**Plug points (trainer):**
- Student's own task you'd send off rather than nudge bit by bit (Connections pick) — sponsor-stated example tasks by team type (web / back / data / ML) help calibration when the student stalls
- Sponsor-stated rules-file home (Debrief rewrite lands here) — `./CLAUDE.local.md` is the repo-personal default; sponsor's actual convention overrides
- Sponsor-stated memory / business-rules home (Phase 2 fill destination) — `.claude/memory/` is the cross-session default; sponsor's actual convention (e.g., `docs/business-rules/`, `wiki/policy/`) overrides
- Sponsor-stated tracker (Phase 1 task surfacing) — Linear / Jira / GitHub Issues; if MCP is wired, Claude can read the tracker for candidates given the criteria first

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Pins a SHA on a fresh branch before dispatching any long-running agent task** (multi-hour or overnight). Falsifiable: git log shows a `<prefix>/<slug>` branch with a "starting point" commit message before the agent's first task-execution commit.
2. **Stops a stalled agent run at ≤20 minutes and names the failure mode in writing** rather than waiting for completion. Falsifiable: scrollback of a multi-hour task shows a manual stop with a one-line note about what wobbled.
3. **Walks `.claude/memory/` + ADRs + skills against a real task before sending it off**, picks the worst three gaps to fill, and writes them rather than filling all five. Falsifiable: pre-task memory diff shows two-or-three new observations or rules tied to the task at hand, not a comprehensive sweep.

**Artefact contracts** (per `check_pedagogy.md` rule 46 — every produced artefact with a stable identifier gets a contract row):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| M4 starting-point branch + SHA | `m4/<task-slug>` branch at the short SHA Claude reports after the commit prompt; SHA noted in scrollback (or in `./CLAUDE.local.md` if the student writes it down) | "Commit the current state…" prompt in *Send the task off* (line 49) | M5 worktree fork (`../<repo>-m5` checked out from this branch + SHA, so the packaged re-run starts from the same code state as the un-packaged run) |
| Filled gap entries in memory | `.claude/memory/` (cross-session default) or sponsor-stated business-rules home | Phase 2 walk-and-fill prompts — observation written, rule articulated, business-rules pointer wired | M5 packaged re-send (the agent loads the same memory + the new packaging on top); M6 second-skill authoring reads as part of the walked-system context |
| M4 session transcript | `~/.claude/projects/<project-folder>/<session-id>.jsonl` (Claude Code's default storage) | The Claude Code session running the M4 walk + send-off; persisted by the runtime, not by an explicit prompt | M5 opening — the M5 session reads the M4 transcript directly to ground the *"what came back"* read |

**Per-phase failure mode + escape hatch** (per `check_pedagogy.md` rule 47 — every phase shipping a forcing function names its dominant failure and one recovery move):

| Phase forcing function | Dominant failure mode | Escape hatch |
|---|---|---|
| Connections — *"come with one or two real candidates"* | Connections blocker — student can't name a task, or names a typo-fix / quarter-long epic | Trainer / Nerd runs three-candidate conversation. Criteria: sustained coherence, requirement-weaving, multi-file reasoning. Push against too-small AND too-large. |
| Phase 2 — *"pick the worst three gaps from the audit, fill those"* | Phase 2 over-fill — student tries to close all five gaps | Trainer / Nerd: *"Three is the budget. Skip the other two — you'll see next module why."* |
| Phase 2 — *"if the audit calls it context, fill it"* | Phase 2 gap deferred as *"architectural, not contextual"* — student skips a contextual gap that looks architectural; the un-packaged run fails in a boring way M5 can't rescue | Trainer / Nerd hard push: *"if the audit calls it context — even if the fill is 'add a rule saying we use X, not Y' — it's still context. M5 needs an interesting failure to diagnose, not a boring one. Fill it."* |
| Phase 3 — *"Claude quotes one of your own ADRs as the Block 2 example BEFORE naming the three-block frame"* | Phase 3 Huryn-as-lecture — Claude names the three-block frame before showing the student's own ADR | Trainer / Nerd interrupts: *"name the frame only after showing me one of my own ADRs as Block 2 — recognition first."* |
| Send-off — *"pin the SHA on the named branch before sending off"* | Student notes the SHA but not the branch name, OR closes the session before the commit completes; M5's worktree instruction lands with an ambiguous starting point | Trainer / Nerd: *"read me back the branch name and SHA Claude confirmed. Have you noted both somewhere you'll find at M5 start?"* |
| Send-off — *"send un-packaged"* | Debrief pre-empt — student tries to package (add plan.md, build a verifier) before sending off | Trainer / Nerd: *"un-packaged is by design. M5 teaches you packaging by diagnosing what breaks here. Don't pre-empt the learning."* |
| Send-off — *"stop the run when you've seen enough; the trace is the result"* | Send-off anxiety — student hesitates at the final prompt or feels they owe the experiment a completed artifact | Trainer / Nerd: *"stop it when you've seen enough. Traces are data. You don't owe the experiment a completed artifact — you owe it a result you can read."* |

**Source verification — MUST DO before first cohort** (per `check_research_claims.md` § 11):
- Boris Cherny / Klaassen / Entis / Uncle Bob references appear only in pre-reads (M5-bound, lines 87–91). All three Klaassen / Entis URLs and the Uncle Bob supplementary need URL-resolves checks before first cohort. Klaassen / Entis on `every.to` [practitioner direct] and [practitioner analysis] respectively per byline. Uncle Bob via `supplementary/clean-code-is-steering.md` — verify that file's source references stay current.

**Frameworks riffed on (attributed in lecture):**
- **Huryn's three-block memory** — Paweł Huryn. Frame earns its name at Phase 3 through recognition in the student's own material.
- **Gap analysis** — generic business-analysis framework; no single attribution needed. Named in Phase 2 as *"walk the system you have against the system the task needs."*
- **Compound engineering** — Kieran Klaassen. Debrief self-compound pattern is Klaassen's Review + Compound step, now in its fourth rep for the student.
