# Plan mode, done right

## Big Idea
Reading a plan is finite. Your own read catches some of it, a second agent walking the decision tree catches the rest. Push back with what you see; run a second-pass read for what you can't. Paired, they give a complete read; neither alone does.

## Prework

About 10 min. Surface one multi-file backlog task in conversation with Claude. Criteria: ~30–60 min agent work, touching wrong file matters, you'd ship it today if you had the hour.

Optional reading in the M1-to-M2 gap: Boris Cherny, [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=6eBSHbLKuN0) (~30 min); [Multi-session and Git: survival guide](reference/multi-session-git.md) (~10 min).

## What You'll Learn
After this module, you will be able to:
- **Run** plan mode on a real multi-file task and read the plan for its file list, verification steps, and named assumptions: the three things that separate a plan from a draft
- **Push back** twice via *keep planning with feedback* (a soft item plus either an assumption or a committed change) so the plan reflects what you can see
- **Run** a second-pass read that walks down unresolved branches you didn't think to check, one question at a time, with a recommended answer per branch
- **Recognize** the pairing as a repeatable design pattern: human read → push-back → agent walk-down → approve
- **Name** plan-mode approval inflation as the thing the pairing defeats, not a moralistic warning
- **Write** one named pattern into your personal `CLAUDE.local.md` (gitignored) that captures how plans get read in this codebase. If it's team-worthy, flag it for a separate PR against team `CLAUDE.md` (see [the four CLAUDE.md layers](reference/claude-code-for-engineers.md))

## Start here

**The question, to you:** when was the last time Claude wrote a plan you approved without really reading? We all do it. What made you approve? Was it that the plan looked right, or that you were in a hurry, or that pushing back felt like work? The room harvests everyone's before the lecture names the pattern.

[Lecture: When a plan is good](lectures/when-a-plan-is-good.md)

[Exercise: Push back on the plan](exercises/push-back-on-the-plan.md)

## Key Concepts
- A plan with a specific file list has made decisions; a plan with "the relevant files" hasn't
- Verification steps that could actually fail are gates; verification steps that always pass are decoration
- Assumption-silent isn't assumption-free. Every plan assumes something, and the good ones say what. **Remember: push-backs ship into memory.**
- Structure is persuasive. A 7-item plan with headers looks like a decision even when it's a draft. **Remember: assume 90% on first pass.**
- One kind of scrutiny catches one kind of miss; a human read and an agent's walk-down of unresolved branches catch different things, and the gap between them is the plan-reading skill you're building
- You don't have to execute a plan to know it's good. The work of making it good is the exercise
- Plan mode is a permission state, not a mood. It's what makes the read possible, not the read itself

## Save the rule if it earned itself

The full compound move ran at M1. M2's compound is opportunistic. If a plan-reading rule earned itself this session (a specific branch the second read surfaced, a push-back that sharpened a real assumption) save it now. If nothing earned itself, the Bridge is next.

Ask Claude to integrate the one branch that earned itself into your personal `./CLAUDE.local.md`, or to say so and stop if nothing did.

**Prompt** *(Claude Code, only if something earned itself)*

```
If one branch from this session sharpened how plans get read in this codebase, integrate it into ./CLAUDE.local.md (create + gitignore if missing; personal file, not team ./CLAUDE.md). Name the branch, not the rule. Quote the specific moment. If the rule is team-worthy, flag it in your summary so I can open a separate PR against ./CLAUDE.md later. If nothing earned itself, say so and stop.
```

## Next

You built a plan you trust without running it, and you ran a second-pass walk-down on something small enough that the pairing *felt* worth the 15 minutes. M3 takes the same move into durable infrastructure: the judges and gates you ship to your team kit catch exactly the kind of branch the second read surfaced today, before a teammate needs to ask. And the move itself turns out to be packageable as a skill; M3 reveals that and has you author your first one.

## Pre-reads before M3

Optional. Skipping either piece does not break M3. The point is to land STRIDE and access-control inside the wider modern agentic-security picture rather than as a substitute for it.

**Read:** Simon Willison, [The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) (~10–15 min). Names the modern threat class that combines private data, untrusted content, and external communication into a compromise surface. Why for M3: gives you the modern agentic-security frame before you run the STRIDE and access-control exercises, so classic AppSec sits inside a wider picture rather than standing alone.

**Optional deeper scan:** [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (~20 min). Broader checklist covering prompt injection, insecure output handling, data leakage, and the rest of the surface. Why for M3: the full menu beyond the trifecta, for engineers who want the wider picture before the exercise lands.

<!-- maintainer -->


**Quality:** compendium-audited 2026-04-25 (check_writing voice-quartet; check_student_facing #21 + #7 compound-varies; check_pedagogy; check_prompts; check_strategy_tie_in §3+§5+§6; check_lectures)
**Meta (trainer):**
- **Primary Bloom's level:** Apply + Analyze + Evaluate (the compare-the-two-reads beat is the Evaluate beat)
- **Session runtime:** 1h45 (Connections 10 / Lecture 10 / Exercise 60 / Debrief 15 / Bridge 5 + buffer). Trainer demos slowly, room copy-pastes concurrently — fits 1h45 in-class. Self-study follow-along runs comparably; simple-prompting beats are quick.
- **Mood target:** grounded competence — *"I can feel when a plan is good before approving it, and I know the move is two reads, not one."* Watch for: mood drift toward *"the second read did everything; my push-back was pointless."* Diagnostic: student at P5 reports the second-pass read caught the interesting stuff. Fix: Nerd surfaces the contrast — *"your push-back caught the soft item the second read re-softened; your voice-of-experience beats the agent's breadth on that axis."*
- **Delivery architecture** (strategy doc §"Delivery architecture"): content folder already unzipped from M1; all compounding artifacts in the student's real repo (`CLAUDE.local.md` for session compounds, team `CLAUDE.md` only on PR, plan files in Claude Code's default location, diffs/PRs in the repo itself). No training-dir state. See `reference/claude-code-for-engineers.md § 1` for the four-layer hierarchy.
- **Quality:** sim-passed 2026-04-25 (check_writing v2026-04-25 voice-quartet, check_student_facing v2026-04-25 agent-vocab + #21 sharpened, check_pedagogy v2026-04-25 progression-with-variations, check_prompts; three-persona sim 2026-04-25 — Debrief redesign)

**Push-back moves** (trainer delivers by default; Nerd in self-study):
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
- Push-back moves at P3 (trainer covers by default; Nerd covers when enabled)

**Frameworks riffed on (attributed in-exercise or at Debrief):**
- **Plan mode** (Anthropic Claude Code). Activation Shift+Tab; push-back via *keep planning with feedback* at the approval prompt (chat-based, the exercise's path). In-place plan-file editing via Ctrl+G / Ctrl+X Ctrl+E is a practitioner primitive mentioned at Debrief, not the exercise's move — chat-based push-back keeps the student in conversation with the agent. Reference: https://code.claude.com/docs/en/permission-modes.md `[practitioner direct]`, current as of 2026-04-22.
- **Compound engineering** — Kieran Klaassen (Every Inc.). M2 is the Plan step at depth, continuation from M1. Source: `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`. URL: `every.to/source-code/compound-engineering-the-definitive-guide` `[practitioner direct]`.
- **"What would have to be true" / strategic-choice assumption-testing** — Roger Martin (HBR, *Playing to Win*). Vision-layer attribution, optional at Debrief; most engineers have seen this in strategy readings.

