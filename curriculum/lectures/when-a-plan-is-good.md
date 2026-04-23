# When a plan is good

**Time:** 10–12 minutes.

Three things a good plan has. Three pressures that quietly make bad plans look good. That's the lecture. Then you go and push back on one.

## What plan mode actually is

Plan mode in Claude Code is a permission state, not a feature. You press Shift+Tab until the status bar reads **plan**. The agent is now read-only. It reads files, runs shell commands to explore, writes a plan file, but it can't edit or execute until you approve. The plan file has a descriptive name now (`migrate-auth-hash-calm-otter.md`, not random words). That's a small quality-of-life thing that matters more than it sounds: the plan has an identity you can come back to.

The read-only part is load-bearing. Plan mode isn't "Claude thinks before doing." It's "Claude writes a thing you can read, edit, and push back on before anything changes."

### Optional: ask plan mode directly

A 30-second move before we name the three things. Enter plan mode in your own session right now and ask Claude what shifted from its side.

Ask Claude to describe what changed in its behaviour when plan mode turned on.

**Prompt** *(copy → Claude Code)*

```
How did your behaviour change now that we are in plan mode? Did your base prompt change, or what?
```

*(end of prompt)*

Watch what comes back. Sometimes Claude names the read-only state directly, sometimes the specific instructions it is following. Skip if you trust the framing. The exercise will show you either way.

## Three things a good plan has

- **A specific file list.** Not "update the config." *Which* config, *which* keys. A plan that names three files has made three decisions. A plan that says "the relevant files" has made zero.
- **A verification step that could actually fail.** *"Run the tests"* is cosmetic; *"run `pytest tests/auth/ -k hash` and expect 14 passing, 0 failing"* is a gate. The test is whether, reading the step alone, you could tell Claude it failed and Claude would know what to fix.
- **Named assumptions.** Good plans flag what they're assuming (library versions, schema shapes, whether a teammate's migration ran last week). A plan without assumptions isn't assumption-free; it's just assumption-silent.

Three things. That's the read.

## Three pressures that make bad plans look good

- **Structure is persuasive.** A 7-item plan with section headers and bold text looks like a decision. It often isn't. It's a draft formatted like a decision. The formatting is the trap.
- **Reasonableness passes for rightness.** Each step sounds reasonable, so the plan sounds right. But three reasonable steps in the wrong order still ship a bug. Read the sequence, not the steps.
- **You already agree with it.** The plan matches what you'd have written, which feels like alignment. But Claude wrote it from a partial read of the codebase and your instinct isn't a substitute for the read. Agreement is cheap; the read is what matters.

## What you do with this

In the exercise, you push back twice with what you can see (one soft item, then either an assumption check or a committed change) via *keep planning with feedback* at the approval prompt. Claude regenerates. Then you ask Claude for a second-pass read that walks down every unresolved branch of the decision tree, one question at a time, suggesting answers. You confirm or correct each. The plan sharpens again. You approve.

Then you stop. No execution. You've done the work; that's the exercise.

The discipline isn't the mode. It's two reads, paired: yours, then the agent's walk-down. One kind of scrutiny catches one kind of miss. Paired, they usually give the complete read.

After you've done it once, you'll feel when a plan needs the second read and when your own read was enough. That's the whole thing.

<!-- maintainer -->

**Meta:**
- **Time:** 10–12 min, inside M2's 1h45 slot (Connections 10 / Lecture 10–12 / Exercise 55–70 / Debrief 15 / Bridge 5).
- **Pedagogy:** primer-before-exercise. Names the three moves (merges / soft items / assumptions) that Phase 3 forces. Does NOT name "plan-mode approval inflation" — that label lands retroactively at exercise P5.
- **Mood target:** anticipation toward grounded competence. Student leaves the lecture with "I know what to look for" — the payoff of *actually feeling it* lands in the exercise.
- **Voice check:** no banned words (`honest`, `delve`, `landscape`-verb, `importantly`, `crucial`, `ritual`, `ceremony`, `practice` as noun). "Ritual" appears once as a *bad* example — *"'Run the tests' is a ritual"* — used to name what a good plan isn't. Pedagogically earns the word; the hard-ban is on framing student activity as ritual, not on discussing it as an anti-pattern. Keep an eye on this at next Compound — if it reads as smuggling, revise to *"is cosmetic"* or *"is book-keeping"*.
- **Frameworks riffed on:**
  - Plan mode (Anthropic Claude Code) — capability reference, current as of 2026-04-22. Source: https://code.claude.com/docs/en/permission-modes.md `[practitioner direct]`.
  - The three-things / three-pressures shape is exercise-scaffold, not a cited framework.
- **Philosophy callout budget:** zero. The lecture is short and operational. The philosophy beat (*memory is my edge, not my keystrokes*; *mastery is structural practice*) lands naturally in the M2 Debrief when `CLAUDE.md` grows.

**Open for Pass 3:**
- Consider a 30-second worked example between *"three things a good plan has"* and *"three pressures"* — show a real plan snippet and point at the file list / verification / assumption. Current draft assumes the engineer can picture it; adding an example adds ~2 min to runtime but may sharpen the beat for less-experienced students. Decide after first cohort sim.
