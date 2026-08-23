# Exercises Library

Canonical exercise files. One file per exercise. Shared across all trainings (Agents 101, Mid-Management, future variants).

## Filename convention

`<slug>.md`, kebab-case. Example: `raw-llm.md`, `add-guardrail.md`, `build-llm-memory.md`.

## File shape

```markdown
# Exercise: [Name]

**What you do:** [the action, one sentence]
**What you build:** [the artifact that outlives the beat]
**The point:** [what this exercise is for, one sentence; see `check_pedagogy.md` §52c]
```

**`**What happened:**` is OPTIONAL, and the default is to leave it out.** It is not part of the shape above. Include it only where the exercise leaves behind a durable artifact whose value is not already obvious from the last slide, and then write it as `[count + noun, one qualifier, land on the destination]`, never as a step-by-step recap of the phases the student just ran.

Two things go wrong with it, and both are why it is no longer mandatory. It **drifts**: a recap re-derives the instructions in prose, so every later edit to a phase silently falsifies it, and the drift is invisible because the sentence still reads fine. And it **answers questions the module holds open**, `extract-the-task-shaping-rule`'s recap asserted the rules file would auto-load, two beats before M2 has the student put exactly that question to Claude. A slot that must be re-verified against every phase on every edit has to earn its place; most exercises end better on their last real move.

One H1 per file (the exercise title). See `curriculum/CLAUDE.md` for the full content development rules.

### What the three lead-ins mean

Canonical home is `memory/check_pedagogy.md` §52c (the trio, the four look-alikes, the survive-deleting-the-artifact test, the length budget) and §52d (how to find the point). Read those, not a copy here. A spec kept in two places drifts, and the copy without the firing hook is the one that goes stale: §52c fires at generation time on the pedagogy surface, this file does not.

One line worth carrying at the point of use: **punch outranks form.** The point says what the exercise is for. A reframe or a contrast is one good shape, not the required one, and a plain statement of purpose wins when it is shorter and lands harder.

**The AE101 files are compliant; the Agents 101 files use a different shape, and that is not yet decided (2026-08-15).** Re-measured on that date, every AE101 exercise sits inside budget, the 2026-08-12 audit at `docs/archive/curriculum-evals/scratch/exercise-lead-in-audit-2026-08-12.md` has already been applied on that half and its recorded figures for AE101 files are stale. What remains is not a length defect. Seventeen Agents 101 exercises put `**What you do:**` at the top as a heading over multi-paragraph prose, and carry `**What happened:**` and `**The point:**` at the BOTTOM as closing sections; fifteen have no `**What you build:**` at all. That is a consistent training-level architecture across every file in the training, not seventeen independent oversights, and the point landing last is plausibly the design. **Maintainer call 2026-08-15: leave Agents 101 alone for now.** So do not read those files as violations of the shape above, and do not "fix" them file-by-file, the open question is whether Agents 101 adopts the trio or this README grows a second sanctioned shape, and it is one decision for the whole training. Applying the audit's proposed replacements verbatim would also delete instruction that exists nowhere else (`build-your-challenge-memory`'s challenge-scoping examples and its *narrow enough that 5–8 topic pages cover it* bound), because those proposals were written against the slot's word count, not against what the prose was carrying.

## How modules reference exercises

A module file includes an exercise with a standalone markdown link whose href matches `exercises/<slug>.md`:

```markdown
[Exercise: Raw LLM](exercises/raw-llm.md)
```

The renderer detects standalone include links and inlines the file's content at that position.
