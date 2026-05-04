# Agents 101 Trainer Guide

**What this file is.** Delivery prep for Agents 101. Read before your first cohort, then re-skim the relevant module before each session. This is for what happens in the room; authoring rules live in `memory/check_*.md` and `.claude/skills/content-creation/SKILL.md`.

Agents 101 is the chat-to-systems leap for builder leaders. The student starts with ordinary LLM use and leaves with a compounding working directory: memory, sources, agents, skills, judges, outputs, and a root `CLAUDE.md` earned through work.

## Operating Contract

You project the workbook page. There are no slides. You demo each exercise prompt slowly while the room copy-pastes into their own runtime. You honor the conversation pauses in the exercise body. When the agent runs, you fill the air with dry-run evidence, tool tips you actually use, or why this module is shaped the way it is.

Your screen is shared most of the session. There is no private trainer pane. Read maintainer blocks during prep only, never while screen-sharing. If a cue is missing from student-visible prose, flag it after the session rather than toggling to a hidden source file.

Every exercise is follow-along. The time budget is `max(trainer, student)`, not trainer time plus student time. You paste and narrate; students paste and run concurrently.

In cohort delivery, you carry the push-backs by default. Teacher Claude or an Agentic Nerd can support self-study, but the room should not depend on a pre-installed host skill.

## Delivery Architecture

Agents 101 uses a local training directory that compounds over time. Early work is scoped; later work adds durable system artifacts. The exercise files are the source of truth for exact working directory, paths, and handoffs.

Root rules are earned from session evidence. Do not ship or improvise a prewritten root rules file before the exercise asks students to create it.

Agents 101 is dual-runtime: Claude Code CLI/Desktop and Cowork. Confirm the cohort surface before the session and keep vocabulary clean. Claude Code uses `subagent`, CWD, slash commands, plan mode, connectors, and local skills. Cowork uses `agent`, connected folder, Cowork tab, and the Customize skill surface.

The sponsor is a participant, not an observer. Their opening presence gives the room permission to not-know. If the sponsor is absent, name the delivery risk before the cohort starts.

## Prep Before Each Session

- Read the module page on the workbook site, including inlined exercises, lectures, Debrief, Bridge, and references.
- Check Quality tags in maintainer blocks during prep. `draft` means rehearse harder; `mechanical-tested` means the prompt chain has actually run.
- Dry-run every exercise end to end in the runtime the cohort uses.
- Rehearse the prompt progression, not just individual prompts. Know what each prompt depends on, which folder it assumes, and what evidence it should leave for the next one.
- Know the lecture material well enough to deliver the point without reading it verbatim.
- Note two or three dry-run moments you can talk through during agent waits.
- Confirm the starter package extracted once into the intended local training directory.
- Confirm module-specific assets named by the module or exercise before class. Do not mirror that checklist here.

## Patterns To Call Out

**Folder is state.** Agents 101 teaches a compounding working directory. The folder is not housekeeping; it is the system boundary. Earlier outputs become later inputs. Correct folder drift early.

**Evidence before memory.** Memory, rules, agents, judges, and skills are created from session evidence. Do not let students write generic operating rules because they sound plausible. Ask what run, source, miss, or artifact earned the rule.

**Scoped first, root later.** Early rules stay scoped until the exercises earn wider operating memory. If the room wants global rules too early, name the impulse and hold the boundary.

**Unease is a valid outcome.** Some Agents 101 exercises should not feel fully tidy. Multi-agent synthesis creates disagreement; security creates residual risk. The trainer's job is not to reassure the room out of the lesson.

**The filesystem is the meeting room.** Agents coordinate through files, folders, outputs, judges, and rewritten rules. When a student asks where the system is, point to the directory, not the chat transcript alone.

**Sharing is a design choice.** "Ship the whole agent" is usually the wrong abstraction. Students choose a shareable surface, then sketch the people plan that would let someone absorb it. Give examples, require the artifact, and do not pretend Agents 101 can decide the company's actual governance.

**Leave the chair.** When the exercise is about automation, the student should not watch every token. If everyone spectates the whole loop, the autonomy lesson weakens.

**Open questions can stay open.** Agents 101 should not resolve every uncertainty into a tidy ending. Some questions should leave the room sharper, not closed.

## Prompt And Runtime Rules To Notice Live

**Prompts serve intent.** Teach the shipped prompt by default so the room has a shared reference. If there is a better way to reach the same teaching point, show it and use it. Name what changed, why it better serves the exercise, and compare the result against the intended teaching point.

**Read the lead-in.** The sentence before the fenced prompt is part of the instruction. It tells the student what the prompt is about to do and gives you the clean narration beat before everyone pastes.

**Paths depend on runtime position.** In Agents 101, prompt paths are not decorative. The exercise files define the working position and output scope. If Claude writes to the wrong folder, correct the working directory before continuing.

**Back-references beat aliases.** Good prompts say "the challenge we just named," "the file you just created," or give a deterministic path. If Claude loses the chain, recover with the path and the relevant scrollback moment rather than inventing a new nickname.

**Use the cohort runtime vocabulary.** Claude Code and Cowork teach the same system through different surfaces. Translate `subagent` / `agent`, CWD / connected folder, local skill / Customize skill when needed, but do not make the session a tool comparison.

**Preserve scrollback inside a phase.** Do not clear or restart in the middle of a chain that depends on what just happened. Use a helper agent, subagent, or fresh task for breadth and critique, then bring the finding back to the main thread.

**Ask for critique, not defense.** Wording matters. "What is weakest?" or "what is still surface-level?" usually produces usable evidence. "Justify this" often produces confident prose.

**Push back on question dumps.** If Claude asks five discovery questions after a one-question-at-a-time prompt, stop and correct it. That moment teaches steering better than explaining steering abstractly.

**After a side effect, ask what changed.** Prefer "tell me what you wrote" after saves, edits, generated files, or rule updates. Add show-before-save only when the operation is hard to reverse or the exercise explicitly needs pre-approval.

## Live Triage

Protect the core live run. Each session has one main exercise, sometimes two medium ones before the midpoint. If time slips, compress framing, run the prompt, and move polish or extended comparison to homework. Do not try to "cover" the module at the cost of the exercise. Agents 101 teaches through artifacts and traces, not explanation.

Do not script the cut order too tightly. The trainer is also an adult professional reading the room. The default bias is to preserve the live run and the trace it produces; after that, framing, debrief, comparison, and polish can flex.

Vary the teaching move. Sometimes name the concept before the prompt, sometimes run first and name it afterward, sometimes explain from a student's output. Use whichever route suits the room and the moment. A forced pattern makes sessions dull.

Bring your own examples, stories, and tooling tips. They give you credibility and make the room feel live. Keep them short, concrete, and tied to what students are about to run or just produced. A story earns its time when it helps students read the artifact in front of them.

When students ask for an example, show one from your demo directory or prompt for a starting snippet live. It does not need to be a perfect sample artifact. One can prompt for anything; use the generated snippet to unblock the room and point back to the exercise.

When a student asks for the "right" way, answer in context. Right means the move that gives the best result for this runtime, folder, team, risk, task, and review path. Teachers know the word is tricky; do not dodge it. Give your judgment, name the conditions behind it, and let the student map it to their situation.

You are a practitioner, not an oracle. If a student has a plausible alternative, there is little value in arguing from authority. Compare the approaches against the module intent, and when it matters, test both.

If a student shows a better workflow, steal with pride and celebrate it. The workbook is not threatened by useful practitioner knowledge in the room. Compare the move against the exercise intent, let others learn from it, and keep the session moving.

You have authority to steer the room. If a question helps the room, answer briefly. If it would pull the cohort away from the protected exercise, park it with respect, name where it fits later, and keep moving.

If one laptop breaks, triage for 30 seconds. Fix quick auth or network issues; defer corporate laptop problems to a buddy or the customer's escalation path. Do not stop the room for one machine.

Assume the exercises are done. That is the mutual respect contract of Agents 101: the trainer prepares a real live run, and students spend the session actually running it. Still, students are adult professionals choosing what to do with their time. Do not become the grader. Help them see what the artifact is based on: quoted evidence, run trace, source material, folder state, judge behavior, or agent output. You can name risks and tradeoffs, then the student decides whether the artifact is good enough for their context.

With ten-plus students working concurrently, you cannot inspect every run. Intervene to protect agency at room scale: when the agent is hiding evidence, flattening a decision, or pushing students into accidental approval, name the pattern to the room and hand the decision back to each student. Spot-assist one or two people only when the fix unblocks the protected exercise.

If a student's output differs from yours, use it. Variation is expected. Ask what their version surfaced and compare the evidence, not the polish: which run quoted a source, found a real risk, preserved the student's decision, exposed the teaching point, or changed the folder state. Do not normalize everyone toward your demo output.

If an exercise produces a weak or failed result, use it. A weak run is useful when it produces evidence: what failed, what the agent assumed, and what artifact would change next time. Do not rescue too early where imperfect traces are part of the learning. Help students separate one-off bad luck from a system gap such as missing context, weak task shape, wrong folder, or absent judge.

If the training directory is locked down, synced strangely, or unusable, simulate the key behavior in another local folder. Any writable local folder is enough if it lets the student run the move, create evidence, and understand what would change in the intended directory. Give tips for rewiring the lesson at the level of scope and loading behavior, then let the student figure out the right adaptation.

Expect speed spread. Fast students will have time for side chat or deeper inspection; slow students will struggle; the middle will usually be fine. Keep the main discussion going so fast students stay engaged and slow students get catch-up time without stopping the cohort.

In a Nordic room, do not mistake a quiet first beat for no signal. Use low-friction checks, quick hands, and your demo output as the comparison surface. In experience, people often do want to comment once the opening is easy and the question is concrete.

Most Agents 101 runs are not long. In the few places where the agent may run for five minutes, use the wait to re-explain the concept and narrate what is actually happening: tool use, files touched, assumptions forming, or why the prompt is shaping the behavior you expect.

If the room is slow, compress optional asides rather than sprinting. If the room is fast, do not pad. Spend the time on a deeper comparison or let people breathe.

The most common Agents 101 failure is folder drift. If artifacts land in the wrong place, stop early and correct the working directory. Wrong folder now becomes broken memory later.

## What Not To Do

- Do not read maintainer blocks during the session.
- Do not lecture from slides.
- Do not fix every install issue from the front of the room.
- Do not pre-summarize a lecture before its slot lands.
- Do not apologize for agent waits.
- Do not smooth useful unease into reassurance.
- Do not let sharing become governance theatre. Sharing starts from a teammate's job.

## Feedback Loop

After delivery, capture friction where editors will see it. Cohort-specific notes belong in the customer surface. Structural fixes belong in this file or the module files. Delete closed TODOs; git is the history.

If a prompt, example, timing move, or fallback improved the session, feed it back into the content loop after class. The exact capture mechanism is still TBD; do not rely on memory.

<!-- maintainer -->

**Quality:** draft 2026-04-30
- draft 2026-04-30 (training-specific trainer guide; delivery material folded in, not yet compendium-audited or sim-passed)
