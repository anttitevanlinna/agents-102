# Plan mode, done right

> Run this module on medium thinking effort. High and xhigh may feel sluggish on a tight slot like this one.

## Big Idea
Reading a plan is finite. Your own read catches some of it, a second agent walking the decision tree catches the rest. Push back with what you see; run a second-pass read for what you can't. Paired, they give a complete read; neither alone does.

## Prework

Surface one multi-file backlog task in the repo you used for Module 1. Criteria: non-trivial agent work, touching wrong file matters, you'd ship it today if you had the hour. From your tracker, your head, or in conversation with Claude, your choice.

**Just a simple task that spans a few files. Not an epic.**

Come to Module 2 without a surfaced task and you'll be scrambling to find one while the room is already in plan mode. Your call.

Optional reading in the Module 1 to Module 2 gap: Boris Cherny, [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=6eBSHbLKuN0); [Multi-session and Git: survival guide](../../trainings/agentic-engineering-101/reference/multi-session-git.md). If you like a lookup page nearby, [plan mode at depth in the reference](../../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md#5-plan-mode-at-depth) has the approval paths in one table.

## What You'll Learn
After this module, you will be able to:
- **Run** plan mode on a real multi-file task and read the plan for its file list, verification steps, and named assumptions
- **Push back** twice on the plan via *keep planning with feedback*, surfacing what the agent didn't see
- **Walk down** unresolved branches one question at a time, with a recommended answer per branch
- **Pair** human read with agent walk-down: read → push-back → walk-down → approve
- **Spot** approval inflation in your own past plans
- **Extract** task-shaping rules from your session into a `.md` file, sharpening at least one before saving
- **Name** three shapes for turning a rules file into automation: Slack triage, issue webhook, scheduled read

## Start here

**The question, to you:** when was the last time Claude wrote a plan you approved without really reading? We all do it. What made you approve? Was it that the plan looked right, or that you were in a hurry, or that pushing back felt like work?

Before the plan-reading move, one orientation. Here is the whole territory this training covers, and where the first three modules sit in it.

[Lecture: The whole map](lectures/the-whole-map.md)

Everyone names a moment first; *When a plan is good* names the pattern.

[Lecture: When a plan is good](lectures/when-a-plan-is-good.md)

[Exercise: Push back on the plan](exercises/push-back-on-the-plan.md)

[Exercise: Extract the task-shaping rule](exercises/extract-the-task-shaping-rule.md)

[Lecture: Where the rule could live](lectures/where-the-rule-could-live.md)

## Save the rule if it earned itself

The full compound move ran at M1. M2's is opportunistic. Before saving, ask Claude whether anything from this session has made it to auto-load yet.

{{prompt:push-back-on-the-plan-4}}

If a branch from the second-pass read sharpened how plans get made in this codebase, ask Claude to integrate that one branch into your personal `./CLAUDE.local.md`. If no branch changed how you'd read the next plan, ask Claude to say so and stop.

{{prompt:ae101-m2-integrate-branch}}

> Read the prompt closely. It's fair to read it as replacing the file with only this rule, which would nuke the old rules. Watch the diff: integrating should add the new rule, not overwrite `./CLAUDE.local.md`. Precise prompting is harder than it looks.

> LLM self-charity may creep in. If the saved rule reads generic, ask for one specific to this session.

Feel free to jump direct at the diff in `./CLAUDE.local.md`; Claude's preamble is optional reading.

## Key Concepts
- Structure is persuasive. A 7-item plan with headers looks like a decision even when it's a draft. At least 10% wrong.
- One kind of scrutiny catches one kind of miss; a human read and an agent's walk-down of unresolved branches catch different things, and the gap between them is where the plan-reading skill lives
- Assumption-silent isn't assumption-free. Every plan assumes something, and the good ones say what. Push-backs ship into memory.
- A plan with a specific file list has made decisions; a plan without one hasn't
- Verification steps that could actually fail are gates; verification steps that always pass are decoration
- You don't have to execute a plan to know it's good. Making it good IS the work.
- Plan mode makes the read possible; it isn't the read

## Homework
Read the conventions your tracker already encodes: [Read the rules hiding in a ticket](exercises/read-the-ticket-rules.md). Paste one real ticket, let Claude infer how your team uses the fields, and fold a few of those rules into the task-shaping file you saved here.

## Next

At M3, the same move goes into durable infrastructure: the judges and gates you ship to your team kit catch exactly the kind of branch a second read surfaces, before a teammate needs to ask. And the move itself turns out to be packageable as a skill; you author your first one there.

Ask Claude where it wrote the plan file, note the path; M3 reads it. Close this session when the second read lands. M3 opens fresh and runs security skills against the M2 feature; if it doesn't have an external or user-facing surface, swap to something from your backlog that does.

## Pre-reads before Module 3

Optional. Lands the modern agentic-security frame before STRIDE and access-control.

**Read:** Simon Willison, [The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) (June 2025, the piece that named the threat class). Names the modern threat class that combines private data, untrusted content, and external communication into a compromise surface.

**Optional deeper scan:** [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/). Broader checklist covering prompt injection, insecure output handling, data leakage, and the rest of the surface. The full menu beyond the trifecta, for engineers who want the wider picture before the exercise lands.

<!-- maintainer -->


**Ticketing → homework (this pass):** the optional ticket-inference step split from `extract-the-task-shaping-rule` into the `read-the-ticket-rules` homework exercise; this module gained a `## Homework` link to it. Per-class Quality SHAs below predate the addition — re-audit before ship.

**Quality:** compendium-audited 2026-07-08 (writing@0ef2ca6 story@1a9e10b technical@0ef2ca6 behavior@1a9e10b pedagogy@1a9e10b strategy@1a9e10b slides@47f3357)
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- cross_module @0ef2ca6: PASS — set=[run-the-first-experiment,learn-from-the-test,spot-gaps-build-the-loop,plan-mode-done-right]
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze + Evaluate (the compare-the-two-reads beat is the Evaluate beat)
- **Session runtime:** 1h45 (Connections 10 / Lecture 10 / Exercise 60 / Debrief 15 / Bridge 5 + buffer). Trainer demos slowly, room copy-pastes concurrently — fits 1h45 in-class. Self-study follow-along runs comparably; simple-prompting beats are quick.
- **Prep timing:** backlog-task surfacing 10 min; optional Cherny video 30 min; optional multi-session reference 10 min; Module 3 pre-read 10–15 min; optional OWASP scan 20 min.
- **Mood target:** grounded competence — *"I can feel when a plan is good before approving it, and I know the move is two reads, not one."* Watch for: mood drift toward *"the second read did everything; my push-back was pointless."* Diagnostic: student at P5 reports the second-pass read caught the interesting stuff. Fix: trainer surfaces the contrast — *"your push-back caught the soft item the second read re-softened; your voice-of-experience beats the agent's breadth on that axis."*
- **Delivery architecture** (working-dir model, compounding-artifact split, no training-dir state): canonical in `training-architecture.md` §Working directory model / §Rule files. Not restated here. Plan files land in Claude Code's default location; the four-layer rule-file hierarchy is in `reference/claude-code-for-engineers.md § 1`.
- **Wizard demo:** intentionally none — engineer audience, the lecture carries push-back calibration.

**Push-back moves:**
- **P1 blocker** — student can't surface a fitting task. Trainer runs three-candidate conversation. Criteria: multi-file, 30–60 min agent work, touching wrong file matters.
- **P3 rubber-stamp** — student approves under 60s with no push-back messages. Trainer: *"pick keep planning with feedback — send one soft item before approving."*
- **P3 generic push-back** — messages lack step numbers or specific concerns. Trainer: *"which step, which words? say the thing you'd want a senior reviewer to catch."*
- **P3 softening on regeneration** — Claude acknowledges the push-back but re-softens the flagged step in the revised plan. Trainer: *"did Claude actually sharpen it, or did it acknowledge and re-soften? push back again."*
- **P4 walk-skip** — student calls the second read done after 2–3 questions. Trainer: *"let the walk-down run until it's out of branches; you don't decide when it's finished."*
- **P4 auto-accept** — student accepts every recommended answer without correcting any. Trainer: *"reject at least one recommended answer if it's wrong for your codebase — the second read's recommendations are defaults, not prescriptions."*
- **P5 deflection** — student reports *"the second read did all the work, my push-back was pointless."* Trainer: *"quote one thing your push-back caught that the second read would have missed. You're reading differently; different isn't worse."*
- **P5 naming** — if Claude frames the pattern as *"use plan mode carefully,"* trainer pushes for structural naming: *"the pattern is human read → push-back → agent walk-down → approve. Name the pairing, not the moral."*
- **Debrief** — self-compounding. If Claude writes a generic rubric, trainer: *"name a pattern specific to THIS codebase, from THIS session's evidence — what branch did grill surface that a first read would miss on this repo?"*

**Watch-fors (cross-phase):**
- Lecture over-runs to 15+ min. Cut the three-pressures section to 60 seconds if tight; the exercise teaches them.
- Connections drifts into war-stories about bad agent behavior. Cap at 10 min, let the stories be short.
- Student reaches for the Ctrl+G plan-file edit flow (a real practitioner primitive). Fine to acknowledge at Debrief as a next-tier move; not this exercise's path.
- Student asks *"why don't we execute?"* near P5. Answer: making the plan good IS the work; recognising a good plan is the skill this module installs.

**Decision points:**
- **Exercise runs to 70 min:** the second read went deep (common on real codebases). Compress Debrief to 10 min, keep the pattern-naming step.
- **Exercise finishes under 45 min:** the second read ran out of branches fast — small task or thin design tree. Use spare time to rerun a second-pass read on another plan in the scrollback, just for the contrast.
- **Whole room mood below 7:** something is stealing grounded competence. Check: was the student's push-back still active when the second read ran (order matters — push-back first keeps the student's read in the driver's seat)? Was the walk-down taken one question at a time (not dumped and skimmed)? Was "stop, don't execute" named early enough to land as intentional rather than anticlimactic?

**Plug points (trainer):**
- Student's own repo (carried from M1) — sponsor-stated example repos by team type if a student arrives without one suitable
- Student's own backlog task (surfaced in M2 prework) — sponsor-stated tracker (Linear / Jira / GitHub Issues) seeded the surfacing prompt
- Sponsor-stated rules home for the Compound step — auto-loaded options are `./CLAUDE.local.md` (repo-personal) and `~/.claude/CLAUDE.md` (cross-repo); anything else, including `~/.claude/memory/<file>.md` or a notes folder, only loads when a prompt names the path or an `@import` line inside an auto-loaded `CLAUDE.md` pulls it in; sponsor's preferred notes location overrides if different
- Push-back moves at P3

**Leap test** (per `check_pedagogy.md` rule 45 — three observable Monday-morning outcomes the engineer exhibits on their own codebase by the next working day):
1. **Enters plan mode (Shift+Tab cycle) on a non-trivial multi-file task before approving** anything Claude writes. Falsifiable: scrollback of a working session shows the mode-cycle move on a task that touches two or more files.
2. **Sends at least one *keep planning with feedback* push-back referencing a specific step number and a specific word from the plan**, before approving. Falsifiable: the push-back message quotes the plan's own step text rather than naming a generic concern.
3. **Asks Claude to walk down unresolved branches one question at a time** when the plan touches a design tree they don't fully see. Falsifiable: the scrollback shows a Q-and-A sequence, not a prompt that returned a list of branches in one shot.

**Artefact contracts** (per `check_pedagogy.md` rule 46 — every produced artefact with a stable identifier gets a contract row):

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Task-shaping rule file | Student-picked location. Auto-loaded: `./CLAUDE.local.md` (repo-personal) or `~/.claude/CLAUDE.md` (cross-repo). Not auto-loaded but legal: a notes folder, `~/.claude/memory/<file>.md`, or any sponsor-stated path — read only when a prompt names the path or when an `@import` line inside an auto-loaded `CLAUDE.md` pulls it in. | Exercise 2 (extract-the-task-shaping-rule) — Claude reads M2 scrollback, proposes 3–5 rules, student rewrites or rejects at least one. If the picked path doesn't auto-load, Claude should also propose the `@import` wire-up so the rule fires next session. | M4 walk-and-fill Phase 1 (audit subagent reads `CLAUDE.md` / `CLAUDE.local.md` / `observations/` repo-level / ADRs / skills; user-level `~/.claude/memory/` is silent unless `@import`-wired from `~/.claude/CLAUDE.md`). Any future task-shaping conversation in the same loading scope. |
| Personal rules update (optional, opportunistic) | `./CLAUDE.local.md` (repo-personal, gitignored) | "Save the rule if it earned itself" prompt at module close — Claude integrates one branch from the second-pass read, only if one earned itself | Every future session in this repo (auto-loads at session-cold start); M3 sharpens further with security/skill-authoring rules |
| Plan file (from plan mode) | Student-noted path. Plan mode displays the file path inline when it writes; student notes it at module close for M3 reference. Deliberate student-pick design — plan mode does not auto-write to a fixed convention. | Exercise Phase 3 (`push-back-on-the-plan`) — plan mode writes the file when the student approves the plan after the push-back loop. | M3 prework / Ex1 input (earn-the-trust.md L12: "The plan file Claude Code wrote during plan mode is what M3 reads — you noted the path at M2 close."). |

**Per-phase failure mode + escape hatch** (per `check_pedagogy.md` rule 47 — every phase shipping a forcing function names its dominant failure and one recovery move):

| Phase forcing function | Dominant failure mode | Escape hatch |
|---|---|---|
| P1 — *"surface a multi-file task that fits the criteria"* | P1 blocker — student can't find a fitting task | Trainer runs three-candidate conversation. Criteria: multi-file, 30–60 min agent work, touching wrong file matters. |
| P3 — *"push back twice via keep-planning-with-feedback"* | P3 rubber-stamp — student approves under 60s with no push-back | Trainer push: *"pick keep-planning-with-feedback — send one soft item before approving."* |
| P3 — *"the push-back names a step number AND a specific word"* | P3 generic push-back — messages lack specifics | Trainer push: *"which step, which words? say the thing you'd want a senior reviewer to catch."* |
| P3 — *"verify the push-back actually sharpened the plan, not re-softened"* | P3 softening on regeneration — Claude acknowledges and re-softens | Trainer push: *"did Claude actually sharpen it, or did it acknowledge and re-soften? push back again."* |
| P4 — *"let the walk-down run until it's out of branches"* | P4 walk-skip — student calls the second read done after 2–3 questions | Trainer push: *"let the walk-down run until it's out of branches; you don't decide when it's finished."* |
| P4 — *"reject at least one recommended answer"* | P4 auto-accept — student accepts every recommended answer | Trainer push: *"reject at least one recommended answer if it's wrong for your codebase — the second read's recommendations are defaults, not prescriptions."* |
| P5 — *"approve, stop, do not execute"* | P5 execution-creep — student executes the plan anyway | Trainer push: *"making the plan good IS the work; recognising a good plan is the skill this module installs."* |
| P5 — *"name the pattern: human read → push-back → agent walk-down → approve"* | P5 deflection — student reports *"the second read did all the work"* | Trainer push: *"quote one thing your push-back caught that the second read would have missed."* |
| Compound — *"save the rule only if one earned itself"* | Compound skip — student skips the compound when one DID earn itself | Trainer push: *"did any branch from the second read change how you'd read the next plan? if yes, integrate it now; if no, the Bridge is next."* |

**Frameworks riffed on (attributed in-exercise or at Debrief):**
- **Plan mode** (Anthropic Claude Code). Activation: Shift+Tab cycle (CLI) or the mode dropdown (Desktop). Push-back via *keep planning with feedback* at the approval prompt — chat-based, the exercise's path. Reference: https://code.claude.com/docs/en/permission-modes.md `[practitioner direct]`.
- **Compound engineering** — Kieran Klaassen (Every Inc.). M2 is the Plan step at depth, continuation from M1. Source: `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`. URL: `https://every.to/source-code/compound-engineering-the-definitive-guide` `[practitioner direct, vendor venue]`.
- **"What would have to be true" / strategic-choice assumption-testing** — Roger Martin (HBR, *Playing to Win*). Vision-layer attribution, optional at Debrief; most engineers have seen this in strategy readings.
