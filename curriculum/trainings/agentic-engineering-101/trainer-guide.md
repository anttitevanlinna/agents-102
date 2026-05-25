# AE101 Trainer Guide

**What this file is.** Delivery prep for Agentic Engineering 101. Read before your first cohort, then re-skim the relevant module before each session. This is for what happens in the room; authoring rules live in `memory/check_*.md` and `.claude/skills/content-creation/SKILL.md`.

AE101 is for software engineer ICs who already use or have seen Claude Code. Do not teach Claude Code from zero. The job is to turn uneven self-taught usage into an engineering loop that compounds: run the work, read what happened, encode the lesson into repo memory, skills, verifiers, and team kit.

## Operating Contract

You project the workbook page. There are no slides. You demo each exercise prompt slowly on your own Claude Code while the room copy-pastes into theirs. You honor the conversation pauses in the exercise body. When the agent runs, you fill the air with dry-run evidence, tool tips you actually use, or why this module is shaped the way it is.

Your screen is shared most of the session. There is no private trainer pane. Read maintainer blocks during prep only, never while screen-sharing. If a cue is missing from student-visible prose, flag it after the session rather than toggling to a hidden source file.

Every exercise is follow-along. The time budget is `max(trainer, student)`, not trainer time plus student time. You paste and narrate; students paste and run concurrently.

In cohort delivery, you carry the push-backs.

## Delivery Architecture

Canonical contract lives in [training-architecture.md](training-architecture.md), read it once before your first cohort. Summary for delivery prep:

AE101 uses a content folder plus the student's real repo. The content folder is reference material. Durable work lands in the repo or in the student's runtime-owned agent materials. There is no training-directory state to preserve between modules. If a student asks where the module folder is, they are importing Agents 101 habits.

AE101 ships today on Claude Code (CLI + Desktop). Cowork is not a supported runtime. Keep the vocabulary clean: `subagent`, CWD, slash commands, plan mode, connectors, skills. If a student uses another agentic coding tool and it works for the exercise, it works; do not turn that into tool policing. The supported delivery path is still Claude Code. Gemini CLI is the planned alternate runtime, see [training-architecture.md §Future TODO](training-architecture.md); not yet active for delivery.

AE101 usually runs weekly. At the start of every non-first session, name last week's state and the artifact the module expects. The module and exercise files are the source of truth for exact handoffs. If state is messy, do not moralize. The artifact is whatever exists; missing state is data the training can read.

**FYI: `.claude/memory/` is a convention, not a Claude Code primitive.** AE101 has students author a three-block memory folder at `.claude/memory/` in their repo (introduced at M4). The path looks Claude-Code-shaped because of the `.claude/` parent and the word "memory," but it is not auto-loaded. The agent reads it when a prompt names the path, the same way it reads ADRs. Claude Code's actual auto-memory lives at `~/.claude/projects/<project>/memory/`, written by the agent for its own recall and surfaced via `/memory`. AE101 deliberately leaves auto-memory out: the point of compounding is that the student steers what gets remembered, and an opaque system-written store works against that. Expect at least one student to ask why their `.claude/memory/` entries aren't showing in `/memory`. The answer is here.

**When a student bashes "memory."** Some engineers react strongly to the word: they read it as opaque, agentic, untrustworthy storage. Usually they're reacting to Claude Code's auto-memory (the `/memory` one), which has invited criticism for those exact reasons. AE101's `.claude/memory/` is something different: files the student authored, gitignored, prompted-read; mechanically the same as `CLAUDE.md` + context files in a subdirectory. The body now names this parallel inline (see `walk-and-send-off.md` Phase 2 memory-path note), but if the trigger fires anyway, acknowledge the criticism (it's legitimate against auto-memory) and point at the disambiguation. Don't argue the trigger; offer the alternate framing.

## Two-Day Cohort Schedule

Default rhythm for a two-day Nordic cohort: 08:30 start, 1h15 lunch, 20-min breaks. Adjust to your sponsor's cadence. The architectural commitments are: M1–M3 on Day 1, M4–M6 on Day 2; lunch between M5 and M6 on Day 2 so both async runs have time to produce something M6 can read.

### Day 1, M1, M2, M3

Lunch at 12:00 sharp lands mid-M2, between Exercise Phase 4 (Second-pass read) and Phase 5 (Stop. See the design pattern). The pause IS Phase 5's "stop." Post-lunch the room returns to name the pattern.

| Time | Block |
|---|---|
| 08:30 – 10:30 | M1 (2h) |
| 10:30 – 10:50 | Break (20 min) |
| 10:50 – 12:00 | M2 part 1: Connections + Lecture + Exercise Phases 1–4 (1h10) |
| 12:00 – 13:15 | Lunch (1h15) |
| 13:15 – 13:45 | M2 part 2: Exercise Phase 5 + Debrief + Bridge (30 min) |
| 13:45 – 14:05 | Break (20 min) |
| 14:05 – 15:55 | M3 (1h50) |
| 15:55 – 16:10 | Closing Day 1 (15 min) |

Day total ~7h40.

**M3 closes with the M4 task-pick homework.** The "Bring to Module 4" section instructs students to scope the task overnight. M4 Phase 1 then becomes a 2-minute confirm instead of a 10-minute scope. That reclaimed time is what makes M4 fit in 90 minutes on Day 2.

### Day 2, M4, M5, M6

| Time | Block |
|---|---|
| 08:30 – 10:00 | M4 (1h30, compressed from 1h45) |
| 10:00 – 10:20 | Break (20 min) |
| 10:20 – 12:20 | M5 (2h, 15-min cushion over budget) |
| 12:20 – 13:35 | Lunch (1h15) |
| 13:35 – 13:50 | Re-entry (15 min) |
| 13:50 – 15:35 | M6 (1h45) |
| 15:35 – 15:50 | Closing Day 2 (15 min) |

Day total ~7h20.

**M4 compression specifics.** Drop Connections from 10 to 5 (cohort is warmed up from Day 1); cut Bridge (the 20-min break absorbs the transition); compress the Phase 2→3 time-check banter to ~5 minutes if the slot runs tight. Phase 1 task-pick is a 2-minute confirm because the task came in as homework.

**M4 closing lecture, company memory ([Will company memory emerge?](../../lectures/will-company-memory-emerge.md)).** Fires after the send-off, while the agent runs, the reflective coda over the launched run. It does NOT resolve the run (that stays open for M5), so the M4 to M5 cliffhanger holds. It opens on the naming terrain (memory / context / rules) and then the company-layer question, both left unsettled. Your move: lay out how the terms fit together (context = the live window that empties at session end; memory = what persists; rules or files = what some practitioners call it instead) and run the disagreement, landing nothing. Expect the "memory is overrated, we should have a company brain" objection here; this is where it lands. The company layer is a real direction with the shape still unsolved. Run it as an open question, not a settled answer.

**M5 cushion.** The 15 min over budget goes to the worktree setup demo (real engineering call, students often fumble) and the closing lecture (Ronacher's three-pattern earned from felt evidence, the lecture IS the lesson; don't squeeze it).

**Re-entry nudge.** M5's packaged re-send fires at M5 close (~12:20) and runs through lunch (~75 min by re-entry). The 15-min re-entry window is for: nudging the agent if it stalled (the dark-humor "Continue" prompt from M4 still works), settling into email or scrollback reading, and letting the run proceed a few more minutes before M6 reads it. After the nudge, leave the M5 session running if that is the right call and open M6 in a fresh Claude Code session at the same worktree path. M6 starts by reading; before it writes, students choose whether to wait, stop M5, or accept the partial run as the artefact.

**Why M6 is a fresh session.** M5's session may still be autonomously running the packaged re-send. Joining that session interrupts the run. M6 opens fresh and begins by reading both runs from disk (git refs + on-disk transcripts under `~/.claude/projects/`). Same-worktree overlap is an intentional classroom handoff, not the general multi-session rule: read first, then make the engineering call before any M6 write.

### Why not split M4 across Day 1 close and Day 2 open?

1. M4's internal flow is one sequential beat: pick → walk → fill → see-frame → send-off. The send-off is the close. Splitting means the send-off either fires from a half-built setup at Day 1 close (thin evidence, M5 has nothing to diagnose) or fires Day 2 open after overnight re-orientation (loses the walk-then-send-off pedagogy).
2. Day 1 + M4 ≈ 9-hour day. Too much for a Nordic cohort.
3. The legitimate Day 1→Day 2 spillover already exists: the M3 close → M4 task-pick homework. Task is picked overnight; M4 Phase 1 confirms in 2 minutes. That spillover is the right shape; full M4 displacement is not.

### Alternative 2-day shape: M1, M2, M4 / M5, M3, M6

The default 2-day above keeps M3 on Day 1 so its Q+S discipline is in hand before M4's send-off. A cohort can also run the reorder **M1, M2, M4 / M5, M3, M6** when it wants the M4-overnight-M5 hinge instead. Same 3+3 day shape; different pedagogical bet.

What it buys you:
- M4 ends Day 1; the un-packaged send-off runs overnight; M5 opens Day 2 morning with the return. The mirror moment lands when the room is fresh, not at the end of Day 2.
- M3's Q+S discipline lands AFTER students have just read the un-packaged failure. Earn-the-trust reads as response to felt-need rather than prophylactic. Engineers respond to diagnosis, not prescription, the reorder applies that frame to M3 itself.

What it costs:
- M4 Phase 2 / Phase 3 reference the M3 test-strategy skill and ADRs as audit targets. Conditional phrasing (`any skills you've authored`, `any ADRs`) covers the gap, but Block 3 of Huryn's three-block frame anchors on existing test conventions rather than an authored skill. Block 2 leans on whatever recorded decisions the repo already has.
- M4 task-pick homework moves from the M3 close to the M2 close (or prework). M4 Phase 1 still compresses to a 2-minute confirm, but the homework hand-off lives one module earlier.
- The "discipline before you need it" framing flips to "discipline once you've felt the failure." Defensible either way; pick the one that fits your cohort.

When to choose which:
- Default 3+3 (M1-M3 / M4-M6), broadest fit, no overnight gap, Q+S installed before any long-running send-off.
- Reorder 3+3 (M1-M2-M4 / M5-M3-M6), when the sponsor wants the M4-overnight-M5 mirror and the cohort is comfortable with M3 landing after the felt failure.

If you run the reorder, dry-run M4's Phase 2 / Phase 3 prompts (`walk-and-send-off-2`, `walk-and-send-off-4`) against a fresh repo with no authored skill and no ADR convention, the conditional phrasings should resolve cleanly, but verify before the cohort.

## M3, the security-tools surprise

Prework installs a curated bundle of skills. One is called `security-tools`. M3's first STRIDE prompt opens by invoking it as a "pre-flight verifier." That invocation runs a small bundled script that performs a few legitimate-looking checks (first line: *"owning you............ ok"*), then prints an ASCII rick-rolled face and a short note: every link in the chain, tarball, SKILL.md, Bash authorization, was trusted without reading.

**The stunt is the lesson.** External skills are a supply-chain vector. A colleague's Slack-shared skill could have done the same, except pointed at AWS credentials. M3's surface (access-control + STRIDE) is the same shape one level up: trust boundaries and authorization checkpoints, applied to AI tooling instead of application features.

**Don't spoil it in prework.** The install prompt frames `security-tools` as a generic security-utility check. If a student asks what it does before M3, deflect: *"a pre-flight check; you'll see it run during M3."* The point is they trusted the chain without verifying.

**When it lands.** The first time `threat-model-with-stride-1` fires. The trainer's terminal shows the script output verbatim (the SKILL.md instructs Claude to print without paraphrasing). Pause two beats after the ASCII face appears, let the room react before saying anything.

**Framing after the reaction.** Two minutes, not more. Three beats to land:

- Every link got trusted: the tarball link, the SKILL.md you didn't read, the Bash authorization Claude asked for.
- One layer up from this module's exercise: the same access-surface and authorization logic, applied to AI tooling rather than features.
- This is exactly why curated > random; why "fork + read LICENSE + vet + adapt" beats "install from a Discord link"; why `access-control-analysis` and `stride` were vetted before they reached you, and `security-tools` is what skipping that step looks like.

Back to the STRIDE pass.

**Students who already noticed.** Some engineers read `check.sh` during prework. Acknowledge them: *"some of you read the script, that's the lesson, you noticed."* Make them feel sharp, not show-offy.

**If the stunt doesn't fire.** Rare, but possible if the skill failed to install during prework, or if Claude paraphrases instead of printing verbatim. Press on. The SKILL.md body carries the supply-chain lesson text; even paraphrased, the beat lands. If install actually broke, fix after the session, don't stop the room.

**Skill survival default.** `security-tools` stays installed past M3. The fake checks are short; the rick-roll body is information the engineer benefits from re-reading; the SKILL.md's own header comment carries the "DO NOT REMOVE the easter egg" framing for any future cleanup pass. If a sponsor pushes to extract it, leave the slot empty rather than substituting a serious-but-thin pre-flight skill, the stunt earns its keep precisely because it isn't serious.

## M6, lecture-dense by design

M6 carries more lecture surface than the other modules. By Module 6 the student is a practitioner, and some moves at this point in the training are read about rather than prompt-drilled. The closer area runs lecture-after-lecture (Human close → Composing the workflow → The loop has a name → Agents that build agents). Manage transitions, and **invite student reflections and opinion across the lectures** by design. The mood is practitioner fluency, not lecture-hall: a room of engineers reading the field together, with the trainer as one voice among several.

**The full M6 lecture stack:**

- **[The 2 frontiers](lectures/the-2-frontiers.md)**, opener.
- **[Story of Module 6](lectures/story-of-module-6.md)**, opener; permission-giving memo from this module's own generation.
- **[Quality is grounding](lectures/quality-is-grounding.md)**, opener-bridge. Read between Story of Module 6 and the main exercise. ~4–6 min. Names the quality arc threaded across the whole training (M1 tests-first → M2 plan push-back → M3 test-strategy skill → M5 verifier → M6 second skill), then reframes quality's evolution from spec-and-tests to grounding and human signal. Stakes-setter before the build move. Cites Agentics Helsinki's first meetup (fall 2025) as historical anchor for the 500K-lines-in-weeks demos. The 500K figure is maintainer-attested (first-hand at the meetup); the lecture's source stamps live in its maintainer block.
- **[Steering the wiring](lectures/steering-the-wiring.md)**, mid-module.
- **[Composing the workflow](lectures/composing-the-workflow.md)**, closer-area pointer. Read after Human close, before The loop has a name. ~3–4 min. Names the practitioner-mode shift (*"there is no prompt to drill at this point"*) and walks five live lineages of workflow composition in one line each: Klaassen (file paths between subagents, hard gates), Cherny (parallel subagents in worktrees), Pocock (weakly-coupled toolkit), Cognition (single writer with advisor agents), Amp (composition primitives shipped inside the product). Plus Ronacher's counter-voice (composition is throttling, not multiplication). Closes by pointing at a worked-example case study from AE101 trainer Dino: a complete composed skill stack with the four composition mechanisms in one place, demonstrating what the framework looks like instantiated. Points at the [workflow-composition-lineages supplementary](supplementary/workflow-composition-lineages.md) for depth, and to Dino's [skill-stacking system primary doc](supplementary/skill-stacking.md) + three diagrams for the worked example.
- **[The loop has a name](lectures/the-loop-has-a-name.md)**, closer; names *eval* from the just-built second skill.
- **[Agents that build agents](lectures/agents-that-build-agents.md)**, forward closer.

**How to invite reflection.** Between lectures, ask the room: which lineage resembles their day? What did the quality arc actually feel like across the five moves? What's their review bandwidth, and what does Ronacher's counter-voice land as? After Dino's worked example, the natural question is the transfer one: looking at the second skill they just shipped at M6, is it a route, a leaf, an orchestrator, or a hand-off? Open prompts, not Q&A. Two beats of silence is fine; engineers think before they speak.

**Pacing the close.** Lecture density means reading the room sharply. If energy is high, give the lineage conversation room. If energy is low, name fewer lineages in delivery, point at the supplementary, move to the closer pair faster. The supplementary carries the depth regardless; the lecture body is the pointer, not the survey.

**Composition is a reading move at M6.** If a student asks where the composition exercise is, point them at the [workflow-composition-lineages supplementary](supplementary/workflow-composition-lineages.md). The lecture walks the lineages; the supplementary carries the depth. *Your intuition* is the close of composing-the-workflow and the register the section asks the room to land in.

## Prep Before Each Session

- Read the module page on the workbook site, including inlined exercises, lectures, Debrief, Bridge, and references.
- Check Quality tags in maintainer blocks during prep. `draft` means rehearse harder; `mechanical-tested` means the prompt chain has actually run.
- Dry-run every exercise end to end on your demo repo. Not skim. Run it.
- Rehearse the prompt progression, not just individual prompts. Know what each prompt depends on and what evidence it should leave for the next one.
- Know the lecture material well enough to deliver the point without reading it verbatim.
- Note two or three dry-run moments you can talk through during agent waits.
- Confirm sponsor-stated homes: ADRs, rules file, ticket tracker, team kit, memory.
- Keep your demo repo clean, on the right branch, with the expected starting state.

## Patterns To Call Out

**Quote before summary.** This is the strongest AE101 trainer move. Many exercises fail the same way when Claude summarizes smoothly without evidence. Ask for the quoted file line, diff line, commit, transcript moment, or skill sentence. If it cannot quote, the claim does not carry.

**Self-report is a hypothesis.** Claude can tell you what it read, why it skipped files, what changed, and what is weakest. Useful, not authoritative. The student verifies against `/context`, the diff, the file, the ADR, the skill output, or the run trace.

**Author through conversation, then invoke.** Catch the editor drift every time: the student should not hand-craft skill files in a file tab. Claude interviews, drafts, self-critiques, revises, then invokes the skill on the real feature or real run. Authoring without invocation is theatre.

**Personal first, team later.** `CLAUDE.local.md` is personal. Authored skills ship personal first. Team-worthy findings get flagged, not auto-PRed. You can give examples for how a team might adopt a rule, skill, or verifier, but AE101 is not a training about team process. The team figures out its own sharing path.

**Fresh context for breadth, main thread for steering.** Use subagents or fresh sessions for audits, broad reads, and cold critiques. Keep one-question-at-a-time authoring, decisions, and push-back in the main session. If the room confuses the two, name the split.

**Task size is pedagogy.** Too small gives no signal. Too large gives mush. Protect the task size at Connections, because downstream prompts cannot rescue the wrong task.

**Do not front-run the next move.** The move may be correct in real life and still be wrong before the curriculum earns it. If a student wants to jump ahead, name the move and park it.

**Absence is data.** No tests on the bug path, no ADR convention, no team-kit home, no business-rules layer, missing transcript, thin memory: these are not side quests to solve live. Name the gap, write the smallest durable note, keep the room moving.

## Prompt Rules To Notice Live

**Prompt blocks serve intent.** Teach the shipped prompt by default so the room has a shared reference. If there is a better way to reach the same teaching point, show it and use it. Name what changed, why it better serves the exercise, and compare the result against the intended teaching point.

**Read the lead-in.** The sentence before the fenced prompt is part of the instruction. It tells the student what the prompt is about to do and gives you the clean narration beat before everyone pastes.

**Open hooks mean student input.** When a prompt ends with a colon, the student supplies the bug, task, feature, or concern. Do not turn every prompt into a fill-in-the-blank form; when Claude can infer the referent from scrollback, let the back-reference do the work.

**Back-references beat aliases.** Good AE101 prompts say "the task we just scoped," "the file you just created," or give a deterministic path. If Claude loses the chain, recover with the path and the relevant scrollback moment rather than inventing a new nickname.

**Invoke skills by name.** Students should use the installed skill name, not paste paths to the skill source. The path is authoring evidence; the skill name is the runtime interface.

**Preserve scrollback inside a phase.** Do not clear the session in the middle of a chain that depends on what just happened. Use a subagent or fresh context for breadth and critique, then bring the finding back to the parent thread.

**Ask for critique, not defense.** Wording matters. "What is weakest?" or "what is still surface-level?" usually produces usable evidence. "Justify this" often produces confident prose.

**Minimal send-off is intentional.** Some send-off prompts rely on the surrounding artifact trail. Do not over-engineer them live with every possible instruction; the contrast between un-packaged and packaged work is the point.

**Push back on question dumps.** If Claude asks five discovery questions after a one-question-at-a-time prompt, stop and correct it. That moment teaches steering better than explaining steering abstractly.

**After a side effect, ask what changed.** Prefer "tell me what you wrote" after saves, edits, or generated files. Add show-before-save only when the operation is hard to reverse or the exercise explicitly needs pre-approval.

## Live Triage

Protect the core live run. Each session has one main exercise, sometimes two medium ones before the midpoint. If time slips, compress framing, run the prompt, and move polish or extended comparison to homework. Do not try to "cover" the module at the cost of the exercise. AE101 teaches through artifacts and traces, not explanation.

Do not script the cut order too tightly. The trainer is also an adult professional reading the room. The default bias is to preserve the live run and the trace it produces; after that, framing, debrief, comparison, and polish can flex.

Vary the teaching move. Sometimes name the concept before the prompt, sometimes run first and name it afterward, sometimes explain from a student's output. Use whichever route suits the room and the moment. A forced pattern makes sessions dull.

Bring your own examples, stories, and tooling tips. They give you credibility and make the room feel live. Keep them short, concrete, and tied to what students are about to run or just produced. A story earns its time when it helps students read the artifact in front of them.

When students ask for an example, show one from your demo repo or prompt for a starting snippet live. It does not need to be a perfect sample artifact. One can prompt for anything; use the generated snippet to unblock the room and point back to the exercise.

When a student asks for the "right" way, answer in context. Right means the move that gives the best result for this repo, team, risk, task, and review path. Teachers know the word is tricky; do not dodge it. Give your judgment, name the conditions behind it, and let the student map it to their situation.

You are a practitioner, not an oracle. If a student has a plausible alternative, there is little value in arguing from authority. Compare the approaches against the module intent, and when it matters, test both.

If a student shows a better workflow, steal with pride and celebrate it. The workbook is not threatened by useful practitioner knowledge in the room. Compare the move against the exercise intent, let others learn from it, and keep the session moving.

You have authority to steer the room. If a question helps the room, answer briefly. If it would pull the cohort away from the protected exercise, park it with respect, name where it fits later, and keep moving.

If one laptop breaks, triage for 30 seconds. Fix quick auth or network issues; defer corporate laptop problems to a buddy or the customer's escalation path. Do not stop the room for one machine.

Assume the exercises are done. That is the mutual respect contract of AE101: the trainer prepares a real live run, and students spend the session actually running it. Still, students are adult professionals working in their own repos and choosing what to do with their time. Do not become the grader. Help them see what the artifact is based on: quoted evidence, run trace, diff, plan risk, or skill behavior. You can name risks and tradeoffs, then the student decides whether the artifact is good enough for their real team, repo, or review process.

With ten-plus students working concurrently, you cannot inspect every run. Intervene to protect agency at room scale: when the agent is hiding evidence, flattening a decision, or pushing students into accidental approval, name the pattern to the room and hand the decision back to each student. Spot-assist one or two people only when the fix unblocks the protected exercise.

If a student's output differs from yours, use it. Variation is expected. Ask what their version surfaced and compare the evidence, not the polish: which run quoted a file, found a real risk, preserved the student's decision, or exposed the teaching point. Do not normalize everyone toward your demo output.

If an exercise produces a weak or failed result, use it. A weak run is useful when it produces evidence: what failed, what the agent assumed, and what artifact would change next time. Do not rescue too early when imperfect traces are part of the learning. Help students separate one-off bad luck from a system gap such as missing context, weak task shape, or an absent verifier.

If a real repo is locked down, unsuitable, or too strange for the exercise, simulate the key behavior outside the repo. Any writable local folder is enough if it lets the student run the move, create evidence, and understand what would change in the real environment. Give tips for rewiring the lesson at the level of scope and loading behavior, then let the student figure out the right adaptation.

Expect speed spread. Fast students will have time for side chat or deeper inspection; slow students will struggle; the middle will usually be fine. Keep the main discussion going so fast students stay engaged and slow students get catch-up time without stopping the cohort.

In a Nordic room, do not mistake a quiet first beat for no signal. Use low-friction checks, quick hands, and your demo output as the comparison surface. In experience, people often do want to comment once the opening is easy and the question is concrete.

Most AE101 runs are not long. In the few places where the agent may run for five minutes, use the wait to re-explain the concept and narrate what is actually happening: tool use, files touched, assumptions forming, or why the prompt is shaping the behavior you expect.

If the room is slow, compress optional asides rather than sprinting. If the room is fast, do not pad. Spend the time on a deeper comparison or leave the room to its own rhythm.

The most common AE101 failure is oversized task selection. Push early. "Not a typo-fix, not an epic" is the condition that lets the long-running loop produce evidence the next module can read.

## What Not To Do

- Do not read maintainer blocks during the session.
- Do not lecture from slides.
- Do not fix every install issue from the front of the room.
- Do not pre-summarize a lecture before its slot lands.
- Do not apologize for agent waits.
- Do not auto-promote personal learnings to team PRs.
- Do not let a contrast exercise collapse because the trainer rescued the first run too early.

## Feedback Loop

After delivery, capture friction where editors will see it. Cohort-specific notes belong in the customer surface. Structural fixes belong in this file or the module files. Delete closed TODOs; git is the history.

If a prompt, example, timing move, or fallback improved the session, feed it back into the content loop after class. Capture flows through the delivery partner (ArcticRex) and routes back as the run-summary + per-module raw files pattern (see existing punchlist entries under *"From 2026-05-19 cohort run"* in `pre-cohort-todos.md` for the shape). Don't rely on memory.

<!-- maintainer -->

**Delivery architecture canonical home:** training-architecture.md (§Platform, §Material distribution, §Working directory model, §Session boundaries, §Rule files, §Skills, §Prework, §Replay, §Local-only work). This guide's body restates the delivery contract for in-room prep by design; the architecture doc is the source of truth when the two diverge.

**Quality:** draft 2026-04-30
- draft 2026-04-30 (training-specific trainer guide; delivery material folded in, not yet compendium-audited or sim-passed)
