# Run the first experiment

## Big Idea
Walk what you've built against a real multi-hour task, fill the worst gaps, send it off un-packaged, and learn from what the agent does with your system as it stands.

## Meta
- **Primary Bloom's level:** Apply + Analyze + Create (walk, fill, launch the experiment)
- **Prework:** none beyond the last three modules; bring a multi-hour task you've been avoiding (see Connections).
- **Homework:** none for M4. The task runs between M4 and M5, and M5 opens with the return.
- **Materials (trainer):** none. Everything the student needs lives in their repo or in conversation.

## What You'll Learn
After this module, you will be able to:
- **Pick** a multi-hour real task from your backlog that demands sustained coherence, requirement-weaving, and multi-file reasoning. Scope it in conversation with Claude, not typed into a form
- **Walk** what you've built (`CLAUDE.md` + `CLAUDE.local.md` + memory + ADRs + M3-authored skill + connectors) against that task, using gap analysis: a subagent audit you then push back on
- **Fill** the worst gaps in conversation: new observations written, rules sharpened, business-rules pointer wired at the sponsor-stated home (or the gap named explicitly)
- **Recognize** Huryn's three-block memory in your own material: Block 1 (observation → hypothesis → rule), Block 2 (decisions + alternatives), Block 3 (quality criteria). Not built-to-spec, arranged from what you've been making for four modules
- **Compound** the session into your personal `CLAUDE.local.md`. Claude rewrites in place from evidence, you push back on the summary. Team-worthy rules get flagged for a separate PR against team `CLAUDE.md`; they don't auto-ship.
- **Send off** the task un-packaged in the same Claude Code session (no plan.md, no verifier, no reference artifact) and close the laptop, or stop the run mid-flight when you've seen enough; traces are data either way

## Connections

You've watched Claude work for three modules on short loops: a bug fix, a plan read, a feature ship with Q+S. Today is the first long one. Multi-hour, sustained, alone in the dark while you close the laptop.

**The question, to you:** come with one or two candidate tasks from your backlog. Multi-hour work you haven't got to yet, or tasks big enough that you'd rather an agent took the first pass. Not a typo-fix, not a quarter-long epic. Write them on a sticky or paste them in chat when you sit down. The room's candidates will differ: migration, gnarly refactor, test-coverage expansion, performance chase, API cutover. That's the point.

*You do the surfacing. Claude doesn't read your roadmap or your Jira, and we don't want it to. At Phase 1, Claude screens your candidates against the three criteria (sustained coherence, requirement-weaving, multi-file reasoning) and gives you a fit read. The picking is yours; the screening is the agent's.*

## Lectures

[Lecture: Test and learn](lectures/test-and-learn.md)

## Exercises

[Exercise: Walk and send off](exercises/walk-and-send-off.md)

## Key Concepts (Emergent)
- Gap analysis is *walk the system you have against the system the task needs*. A move you'll use forever
- Huryn's three blocks aren't a template you fill; they're a frame that names what you've been building for four modules
- Un-packaged is by design. M5 teaches packaging by diagnosing what the un-packaged run gets wrong, a lesson no lecture can land
- The rules files you finalise at Debrief (`CLAUDE.md` + `CLAUDE.local.md`) go into the test with the agent. Claude loads both at session start (see [reference § 1](../reference/claude-code-for-engineers.md))
- Traces are data. Stop the run when you've seen what you needed to see
- Every send-off is an experiment, not a production run you need to get right first time. This is the operator's posture

## Debrief

12–15 minutes. Claude self-compounds your personal `CLAUDE.local.md` from the session (not team `CLAUDE.md`, which is PR-gated); the send-off then launches with both rules files going into the test (Claude loads them together at session start).

**Prompt** *(copy → Claude Code)*

```
Review this session. I walked my system against the task we just scoped; filled gaps in memory and my rules files; saw my ADRs and test-strategy skill rearrange into Huryn's three blocks.

Read `CLAUDE.md` (team), `CLAUDE.local.md` (personal, mine; create it at repo root + add to `.gitignore` if it doesn't exist), the memory files, the ADRs, and this scrollback. Then rewrite `CLAUDE.local.md` in place (not team `CLAUDE.md`, which is PR-gated). Integrate what I learned about this codebase today, sharpen what turned out thin under the walk, remove what turned out wrong. Don't append "session notes"; rewrite the file as the better version.

If any rule is team-worthy (one every engineer shipping this codebase should know) flag it in your summary, don't PR it. I'll decide separately whether to open a PR against team `CLAUDE.md`.

Tell me in 3–5 lines: what you added to `CLAUDE.local.md`, what you sharpened, what you removed, which team-rule flags you noted, and which moment in the session made you pick those over others.
```

*(end of prompt)*

Read the summary. Push back where it's wrong; quote the session moment. When `CLAUDE.local.md` is the best version of itself it's going to be tonight, compose and paste the send-off prompt to the same session:

**Prompt** *(copy → Claude Code, final move of the module)*

```
I want you to take the task we scoped earlier in this session end to end. Work from the rules I've set up (`CLAUDE.md` team and `CLAUDE.local.md` personal both load automatically) plus the memory in `.claude/memory/` (or wherever my memory lives), the ADRs, and the skills in `.claude/skills/`. That's everything you have. Go.

I'm going to close the laptop. Work through it. If you get stuck, write what you tried and why it didn't work rather than inventing a way forward. If you finish, tell me what you shipped and what you didn't.
```

*(end of prompt)*

Let it run. Leave the laptop awake and plugged in. On macOS that means `caffeinate` in a side terminal, or System Settings → Battery → prevent sleep on power; on Linux, disable screen/session lock for the night; on Windows, power plan set to never-sleep. If you watch for a bit and see the agent wobbling in a way that already tells you what M5 will diagnose, stop the run. Traces are data. You don't owe the experiment a completed artifact; you owe it a result you can read.

## Bridge

M5 opens with what came back, or what you caught before it went further. We read it together.

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze + Create
- **Session runtime:** 2h (Connections 10 / Lecture 12 / Exercise 60 / Debrief 15 / Send-off 10 / Bridge 3 + buffer)
- **Mood target:** curious readiness — *"I've built enough to try; let's see what the agent does."* Watch for: mood drift toward compliance-feeling (*"did I prepare the right way?"*) or performance-anxiety (*"what if it fails?"*). Diagnostic: student at Phase 2 keeps asking *"is this enough?"* Fix: Nerd reframes — *"enough is a question for M5. The experiment is the point."*
- **Delivery architecture** (strategy doc § "Delivery architecture"): AE101 content folder + student's real repo. The send-off at Debrief happens IN the same Claude Code session the student used for walk + fill + frame + retro. No new session, no scheduled agent, no cloud runner — just pass the final prompt to the agent you've been talking to, then close the laptop.

**Agentic Nerd logic (TODO — skill not yet created):**
- **Connections blocker** — student can't name a task. Nerd runs three-candidate conversation with the size rule; pushes against too-small (Claude will crunch it and learn nothing) and too-large (won't cohere over multi-hour).
- **Phase 2 audit passivity** — student reads the ranked gap list and moves on without picking three. Nerd: *"which of these will hurt the agent most given the task? fill those."*
- **Phase 2 over-fill** — student tries to close all five gaps instead of the worst three. Nerd: *"the un-packaged run needs a sponge, not a rock. M5 teaches you what the other two were for."*
- **Phase 2 gap deferred as "architectural, not contextual"** — student looks at a thin spot, says *"that's a real code change, I'll skip for tonight."* High-impact failure mode (per fast-operator sim, 2026-04-23): skipping a contextual gap that looks architectural makes the un-packaged run fail in a *boring* way (wrong DB assumption, stale config) instead of an *interesting* way (agent loses coherence). M5 can't rescue a boring failure. Nerd hard push: *"if the audit calls it context — even if the fill is 'add a rule saying we use X, not Y' — it's still context. M5 needs an interesting failure to diagnose, not a boring one. Fill it."*
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
- Student's own multi-hour task (Connections pick)
- Sponsor-stated rules-file home (Debrief rewrite lands here)
- Sponsor-stated memory / business-rules home (Phase 2 fill destination)

**Frameworks riffed on (attributed in lecture):**
- **Huryn's three-block memory** — Paweł Huryn. Frame earns its name at Phase 3 through recognition in the student's own material.
- **Gap analysis** — generic business-analysis framework; no single attribution needed. Named in Phase 2 as *"walk the system you have against the system the task needs."*
- **Compound engineering** — Kieran Klaassen. Debrief self-compound pattern is Klaassen's Review + Compound step, now in its fourth rep for the student.

**Open questions surfaced for later passes:**
- Task-size calibration guide — current Nerd logic names the constraint (sustained coherence, requirement-weaving, multi-file) but doesn't give worked examples. Worth a short reference file like `curriculum/reference/picking-a-first-long-task.md` with 3–4 shape-examples by engineer archetype (backend / frontend / platform / data).
- M5 capability-check handoff — M4's send-off mechanism (continue the current session) assumes the laptop can be left running or the session can be safely terminated mid-run. Capability-check resolves overnight-execution behaviour before M5 Pass 2.
- Agentic Nerd skill — Nerd logic in this maintainer block is the module-specific piece; the running companion is still TODO at portfolio level.

**TODO (Pass 3):**
- Three-persona simulation sweep (mid-competent / opinionated-senior / fast-operator). Mandatory for AE101 modules.
- Task-size calibration reference (as above).
- Eval instance fill + LLM-judge run (`curriculum/evals/instances/agentic-engineering-101--run-the-first-experiment.md`).
- Capability check: Claude Code behaviour when a session is left running overnight vs. terminated mid-run — what's preserved, what's lost. Verify before first cohort.
