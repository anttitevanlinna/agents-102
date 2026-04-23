# Plan mode, done right

## Big Idea
Reading a plan is finite. Your own read catches some of it, a second agent walking the decision tree catches the rest. Push back with what you see; run a second-pass read for what you can't. Paired, they give a complete read; neither alone does.

## Meta
- **Primary Bloom's level:** Apply + Analyze + Evaluate (the push-back is the Evaluate beat)
- **Prework:** about 10 min. Surface one multi-file backlog task in conversation with Claude. Criteria: ~30–60 min agent work, touching wrong file matters, you'd ship it today if you had the hour.
- **Homework:** none. M3 opens on a fresh pair of compact exercises.
- **Materials (trainer):** content folder already on student's machine from M1. No new scaffolds.

## What You'll Learn
After this module, you will be able to:
- **Run** plan mode on a real multi-file task and read the plan for its file list, verification steps, and named assumptions: the three things that separate a plan from a draft
- **Push back** twice via *keep planning with feedback* (a soft item plus either an assumption or a committed change) so the plan reflects what you can see
- **Run** a second-pass read that walks down unresolved branches you didn't think to check, one question at a time, with a recommended answer per branch
- **Recognize** the pairing as a repeatable design pattern: human read → push-back → agent walk-down → approve
- **Name** plan-mode approval inflation as the thing the pairing defeats, not a moralistic warning
- **Write** one named pattern into your personal `CLAUDE.local.md` (gitignored) that captures how plans get read in this codebase. If it's team-worthy, flag it for a separate PR against team `CLAUDE.md` (see [the four CLAUDE.md layers](../reference/claude-code-for-engineers.md))

## Connections

**The question, to you:** when was the last time Claude wrote a plan you approved without really reading? We all do it. What made you approve? Was it that the plan looked right, or that you were in a hurry, or that pushing back felt like work? Write one line, or paste it in chat if you're remote. The room harvests everyone's before the lecture names the pattern.

## Lectures

[Lecture: When a plan is good](lectures/when-a-plan-is-good.md)

## Exercises

[Exercise: Push back on the plan](exercises/push-back-on-the-plan.md)

## Key Concepts (Emergent)
- A plan with a specific file list has made decisions; a plan with "the relevant files" hasn't
- Verification steps that could actually fail are gates; verification steps that always pass are decoration
- Assumption-silent isn't assumption-free. Every plan assumes something, and the good ones say what. **Remember: push-backs ship into memory.**
- Structure is persuasive. A 7-item plan with headers looks like a decision even when it's a draft. **Remember: assume 90% on first pass.**
- One kind of scrutiny catches one kind of miss; a human read and an agent's walk-down of unresolved branches catch different things, and the gap between them is the plan-reading skill you're building
- You don't have to execute a plan to know it's good. The work of making it good is the exercise
- Plan mode is a permission state, not a mood. It's what makes the read possible, not the read itself

## Debrief

15 minutes. Claude reviews the session, writes one named pattern into your personal `CLAUDE.local.md` (gitignored), reports what it added and why. You push back on the summary. If the pattern is team-worthy, Claude flags it so you can decide whether to open a separate PR against team `CLAUDE.md`.

Ask Claude to review the session and write one named pattern into your personal `CLAUDE.local.md`, flagging it if it's team-worthy.

**Prompt** *(copy → Claude Code)*

```
Review this session. We took a real backlog task through plan mode, I pushed back twice via keep-planning-with-feedback (a soft item, then an assumption check or a committed change), and then ran a second-pass read that walked down the unresolved branches one question at a time. We approved the sharpened plan and stopped; didn't execute.

Read the original plan, the plan after my two push-backs, and the plan after the second-pass read. Scan the scrollback for the branches the second read surfaced and how I answered. What's the DESIGN PATTERN I just ran?

Then integrate one named pattern into my personal `CLAUDE.local.md` (create it at the repo root and add to `.gitignore` if it doesn't exist; this is my personal file, not team `CLAUDE.md`). **Name the branch, not the rule.** Quote the specific branch the second read surfaced or the specific line my push-back sharpened. Something like *"plans touching the webhook ingress layer need a second-pass walk on cache-invalidation before approval; the router's 60-second memoization is invisible from a first read."* Not *"always pair push-back with a second read"* (generic rubric). Integrate, don't append. If a plan-reading rule exists, sharpen it with this session's specific branch.

If the pattern is team-worthy (useful to every engineer shipping this codebase) flag it in your summary below, don't PR it. I'll decide whether to open a separate PR against team `CLAUDE.md`.

When you're done, tell me in 3–5 lines: what pattern you named, where it landed, which moment in the session made you pick that one over others, and whether the second-pass read surfaced anything my push-back would have caught on a slower day. I shouldn't have to open the file to know.
```

*(end of prompt)*

Read the summary. Push back where it's wrong. Quote the session moment, tell Claude what it misread. One named pattern per session; don't let the rules file grow a generic-rubric section.

## Bridge

You built a plan you trust without running it, and you ran a second-pass walk-down on something small enough that the pairing *felt* worth the 15 minutes. M3 takes the same move into durable infrastructure: the judges and gates you ship to your team kit catch exactly the kind of branch the second read surfaced today, before a teammate needs to ask. And the move itself turns out to be packageable as a skill; M3 reveals that and has you author your first one.

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze + Evaluate (the compare-the-two-reads beat is the Evaluate beat)
- **Session runtime:** 1h45 (Connections 10 / Lecture 10 / Exercise 60 / Debrief 15 / Bridge 5 + buffer)
- **Mood target:** grounded competence — *"I can feel when a plan is good before approving it, and I know the move is two reads, not one."* Watch for: mood drift toward *"the second read did everything; my push-back was pointless."* Diagnostic: student at P5 reports the second-pass read caught the interesting stuff. Fix: Nerd surfaces the contrast — *"your push-back caught the soft item the second read re-softened; your voice-of-experience beats the agent's breadth on that axis."*
- **Delivery architecture** (strategy doc §"Delivery architecture"): content folder already unzipped from M1; all compounding artifacts in the student's real repo (`CLAUDE.local.md` for session compounds, team `CLAUDE.md` only on PR, plan files in Claude Code's default location, diffs/PRs in the repo itself). No training-dir state. See `reference/claude-code-for-engineers.md § 1` for the four-layer hierarchy.

**Agentic Nerd logic (TODO — skill not yet created):**
- **P1 blocker** — student can't surface a fitting task. Nerd runs three-candidate conversation. Criteria: multi-file, 30–60 min agent work, touching wrong file matters.
- **P3 rubber-stamp** — student approves under 60s with no push-back messages. Nerd: *"pick keep planning with feedback — send one soft item before approving."*
- **P3 generic push-back** — messages lack step numbers or specific concerns. Nerd: *"which step, which words? say the thing you'd want a senior reviewer to catch."*
- **P3 softening on regeneration** — Claude acknowledges the push-back but re-softens the flagged step in the revised plan. Nerd: *"did Claude actually sharpen it, or did it acknowledge and re-soften? push back again."*
- **P4 walk-skip** — student calls the second read done after 2–3 questions. Nerd: *"let the walk-down run until it's out of branches; you don't decide when it's finished."*
- **P4 auto-accept** — student accepts every recommended answer without correcting any. Nerd: *"reject at least one recommended answer if it's wrong for your codebase — the second read's recommendations are defaults, not prescriptions."*
- **P5 deflection** — student reports *"the second read did all the work, my push-back was pointless."* Nerd: *"quote one thing your push-back caught that the second read would have missed. You're reading differently; different isn't worse."*
- **P5 naming** — if Claude frames the pattern as *"use plan mode carefully,"* Nerd pushes for structural naming: *"the pattern is human read → push-back → agent walk-down → approve. Name the pairing, not the moral."*
- **Debrief** — self-compounding. If Claude writes a generic rubric, Nerd: *"name a pattern specific to THIS codebase, from THIS session's evidence — what branch did grill surface that a first read would miss on this repo?"*

**Watch-fors (cross-phase):**
- Lecture over-runs to 15+ min. Cut the three-pressures section to 60 seconds if tight; the exercise teaches them.
- Connections drifts into war-stories about bad agent behavior. Cap at 10 min, let the stories be short.
- Student reaches for the Ctrl+G plan-file edit flow (a real practitioner primitive). Fine to acknowledge at Debrief as a next-tier move; not this exercise's path.
- Student asks *"why don't we execute?"* near P5. Answer: you've done the work of making the plan good; recognising a good plan is the skill this module installs. Execution is M3's concern.

**Decision points:**
- **Exercise runs to 70 min:** the second read went deep (common on real codebases). Compress Debrief to 10 min, keep the pattern-naming step.
- **Exercise finishes under 45 min:** the second read ran out of branches fast — small task or thin design tree. Use spare time to rerun a second-pass read on another plan in the scrollback, just for the contrast.
- **Whole room mood below 7:** something is stealing grounded competence. Check: was the student's push-back still active when the second read ran (order matters — push-back first keeps the student's read in the driver's seat)? Was the walk-down taken one question at a time (not dumped and skimmed)? Was "stop, don't execute" named early enough to land as intentional rather than anticlimactic?

**Plug points (trainer):**
- Student's own repo (carried from M1)
- Student's own backlog task (surfaced in M2 prework)
- Sponsor-stated rules home for the Compound step
- Agentic Nerd push-back moves at P3

**Frameworks riffed on (attributed in-exercise or at Debrief):**
- **Plan mode** (Anthropic Claude Code). Activation Shift+Tab; push-back via *keep planning with feedback* at the approval prompt (chat-based, the exercise's path). In-place plan-file editing via Ctrl+G / Ctrl+X Ctrl+E is a practitioner primitive mentioned at Debrief, not the exercise's move — chat-based push-back keeps the student in conversation with the agent. Reference: https://code.claude.com/docs/en/permission-modes.md `[practitioner direct]`, current as of 2026-04-22.
- **Compound engineering** — Kieran Klaassen (Every Inc.). M2 is the Plan step at depth, continuation from M1. Source: `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`. URL: `every.to/source-code/compound-engineering-the-definitive-guide` `[practitioner direct]`.
- **"What would have to be true" / strategic-choice assumption-testing** — Roger Martin (HBR, *Playing to Win*). Vision-layer attribution, optional at Debrief; most engineers have seen this in strategy readings.

**Open questions surfaced for later passes:**
- Plan-mode + subagents: known gap per GitHub issue #43777 (plan-mode constraint doesn't propagate to spawned subagents). Not an M2 issue — M2 works at main-session scope. Flag for M5 (long-running) where subagent behavior matters more.
- Community plan-critique skills — none found in shipped Claude Code as of 2026-04-22. If a practitioner-authored skill emerges, surface it at the Nerd's P3 blocker.
- Lecture worked-example decision: add a 30-sec plan-snippet example between "three things" and "three pressures"? Defer to first cohort sim feedback.

**TODO (Pass 3 / pre-first-cohort):**
- Three-persona simulation sweep — mid-competent engineer, opinionated senior, fast operator. Mandatory for AE101 modules per content-creation SKILL.md.
- Wizard-demo choice for M2 opener — does the trainer demo plan-mode push-back on a volunteer repo? If so, what's the demo pattern? Menu of 2–3 options for cohort flexibility.
- Confirm *keep planning with feedback* UX is stable across Claude Code versions before first cohort. Capability check pulled the flow from v2.1.110 changelog; verify on the cohort's version. Also verify whether softening-on-regeneration (Claude accepts push-back verbally but re-softens the step in the revised plan) is a reliable pattern — if yes, it's a named failure mode; if not, can remove from watch-fors.
