# Exercises Library

Canonical exercise files. One file per exercise. Shared across all trainings (Agents 101, Mid-Management, future variants).

## Filename convention

`<slug>.md`, kebab-case. Example: `raw-llm.md`, `add-guardrail.md`, `build-llm-memory.md`.

## File shape

```markdown
# Exercise: [Name]

**What you do:** [the action, one sentence]
**What you build:** [the artifact that outlives the beat]
**The point:** [the claim this exercise earns — a reframe, not a motivation]
```

**`**What happened:**` is OPTIONAL, and the default is to leave it out.** It is not part of the shape above. Include it only where the exercise leaves behind a durable artifact whose value is not already obvious from the last slide, and then write it as `[count + noun, one qualifier, land on the destination]`, never as a step-by-step recap of the phases the student just ran.

Two things go wrong with it, and both are why it is no longer mandatory. It **drifts**: a recap re-derives the instructions in prose, so every later edit to a phase silently falsifies it, and the drift is invisible because the sentence still reads fine. And it **answers questions the module holds open**, `extract-the-task-shaping-rule`'s recap asserted the rules file would auto-load, two beats before M2 has the student put exactly that question to Claude. A slot that must be re-verified against every phase on every edit has to earn its place; most exercises end better on their last real move.

One H1 per file (the exercise title). See `curriculum/CLAUDE.md` for the full content development rules.

### What the three lead-ins mean

Three slots, three tenses. Fill each with its own job and nothing else, a slot filled past its label is the most common defect in this corpus, because every addition is individually true and on-topic, so review waves it through.

- **What you do**, *now*. The action the student takes with the agent. No artifact, no rationale.
- **What you build**, *after*. The thing that exists when the beat ends: a file, a record, a picture of something. Name it; do not summarise the exercise back. A trailing "together they..." sentence is the tell.
- **The point**, *still*. The claim the exercise earns: one sentence a student could repeat to a colleague next month, usually a reframe and often a contrast. *"You can't steer what you can't see."* *"Test strategy authored generically is a pyramid diagram."*

 **The point is not four things it keeps getting confused with.** Not the *learning objective* (that is a capability, it is assessable, and it lives in the module file). Not *why this matters* (motivation, which reads salesy on this audience, and which the old placeholder here asked for by name). Not *arc-positioning* (*"this is the first experiment of a two-session arc"* is a fine answer to why-it-matters and a bad point). Not a *recipe* (*"load deliberately, watch the budget, dig into the self-report"* restates the section headers below it).

 **Test: does it survive deleting the artifact?** A claim does. A recipe, a motivation and a position in the arc do not.

**Length: one sentence each, ~15 words, no colon-list.** The reference shape is `orient-and-introspect.md` at 9 / 12 / 7 words. Measured 2026-08-12 the corpus median ran 39 / 31 / 37, so the median exercise spent about 107 words before the work began. Over-length is never one bad sentence; it is the slot answering a question next to it (do → build), or replaying the section headers below. If it needs a colon and a list, the list is the exercise and it is already on the page.

## How modules reference exercises

A module file includes an exercise with a standalone markdown link whose href matches `exercises/<slug>.md`:

```markdown
[Exercise: Raw LLM](exercises/raw-llm.md)
```

The renderer detects standalone include links and inlines the file's content at that position.
