# AE101 Trainer Guide

**What this file is.** Delivery prep for Agentic Engineering 101. Read before your first cohort, then re-skim the relevant module before each session. This is for what happens in the room; authoring rules live in `memory/check_*.md` and `.claude/skills/content-creation/SKILL.md`.

AE101 is for software engineer ICs who already use or have seen Claude Code. Do not teach Claude Code from zero. The job is to turn uneven self-taught usage into an engineering loop that compounds: run the work, read what happened, encode the lesson into repo memory, skills, verifiers, and team kit.

## Operating Contract

You project the workbook page. There are no slides. You demo each exercise prompt slowly on your own Claude Code while the room copy-pastes into theirs. You honor the conversation pauses in the exercise body. When the agent runs, you fill the air with dry-run evidence, tool tips you actually use, or why this module is shaped the way it is.

Your screen is shared most of the session. There is no private trainer pane. Read maintainer blocks during prep only, never while screen-sharing. If a cue is missing from student-visible prose, flag it after the session rather than toggling to a hidden source file.

Every exercise is follow-along. The time budget is `max(trainer, student)`, not trainer time plus student time. You paste and narrate; students paste and run concurrently.

In cohort delivery, you carry the push-backs by default. The Agentic Nerd can support self-study, but the room should not depend on a pre-installed host skill.

## Delivery Architecture

Canonical contract lives in [training-architecture.md](training-architecture.md), read it once before your first cohort. Summary for delivery prep:

AE101 uses a content folder plus the student's real repo. The content folder is reference material. Durable work lands in the repo or in the student's runtime-owned agent materials. There is no training-directory state to preserve between modules. If a student asks where the module folder is, they are importing Agents 101 habits.

AE101 ships today on Claude Code (CLI + Desktop). Cowork is not a supported runtime. Keep the vocabulary clean: `subagent`, CWD, slash commands, plan mode, connectors, skills. If a student uses another agentic coding tool and it works for the exercise, it works; do not turn that into tool policing. The supported delivery path is still Claude Code. Gemini CLI is the planned alternate runtime, see [training-architecture.md §Future TODO](training-architecture.md); not yet active for delivery.

AE101 usually runs weekly. At the start of every non-first session, name last week's state and the artifact the module expects. The module and exercise files are the source of truth for exact handoffs. If state is messy, do not moralize. The artifact is whatever exists; missing state is data the training can read.

**FYI: `.claude/memory/` is a convention, not a Claude Code primitive.** AE101 has students author a three-block memory folder at `.claude/memory/` in their repo (introduced at M4). The path looks Claude-Code-shaped because of the `.claude/` parent and the word "memory," but it is not auto-loaded. The agent reads it when a prompt names the path, the same way it reads ADRs. Claude Code's actual auto-memory lives at `~/.claude/projects/<project>/memory/`, written by the agent for its own recall and surfaced via `/memory`. AE101 deliberately leaves auto-memory out: the point of compounding is that the student steers what gets remembered, and an opaque system-written store works against that. Expect at least one student to ask why their `.claude/memory/` entries aren't showing in `/memory`. The answer is here.

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

**M5 cushion.** The 15 min over budget goes to the worktree setup demo (real engineering call, students often fumble) and the closing lecture (Ronacher's three-pattern earned from felt evidence, the lecture IS the lesson; don't squeeze it).

**Re-entry nudge.** M5's packaged re-send fires at M5 close (~12:20) and runs through lunch (~75 min by re-entry). The 15-min re-entry window is for: nudging the agent if it stalled (the dark-humor "Continue" prompt from M4 still works), settling into email or scrollback reading, and letting the run proceed a few more minutes before M6 reads it. After the nudge, leave the M5 session running if that is the right call and open M6 in a fresh Claude Code session at the same worktree path. M6 starts by reading; before it writes, students choose whether to wait, stop M5, or accept the partial run as the artefact.

**Why M6 is a fresh session.** M5's session may still be autonomously running the packaged re-send. Joining that session interrupts the run. M6 opens fresh and begins by reading both runs from disk (git refs + on-disk transcripts under `~/.claude/projects/`). Same-worktree overlap is an intentional classroom handoff, not the general multi-session rule: read first, then make the engineering call before any M6 write.

### Why not split M4 across Day 1 close and Day 2 open?

1. M4's internal flow is one sequential beat: pick → walk → fill → see-frame → send-off. The send-off is the close. Splitting means the send-off either fires from a half-built setup at Day 1 close (thin evidence, M5 has nothing to diagnose) or fires Day 2 open after overnight re-orientation (loses the walk-then-send-off pedagogy).
2. Day 1 + M4 ≈ 9-hour day. Too much for a Nordic cohort.
3. The legitimate Day 1→Day 2 spillover already exists: the M3 close → M4 task-pick homework. Task is picked overnight; M4 Phase 1 confirms in 2 minutes. That spillover is the right shape; full M4 displacement is not.

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

If a prompt, example, timing move, or fallback improved the session, feed it back into the content loop after class. Capture mechanism is being designed, see `pre-cohort-todos.md`. Until it lands, don't rely on memory.

<!-- maintainer -->

**Quality:** draft 2026-04-30
- draft 2026-04-30 (training-specific trainer guide; delivery material folded in, not yet compendium-audited or sim-passed)
