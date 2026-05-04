# Exercises Library

Canonical exercise files. One file per exercise. Shared across all trainings (Agents 101, Mid-Management, future variants).

## Filename convention

`<slug>.md` — kebab-case. Example: `raw-llm.md`, `add-guardrail.md`, `build-llm-memory.md`.

## File shape

```markdown
# Exercise: [Name]

**What you do:** [clear instruction]
**What happened:** [expected behavior]
**The point:** [why this matters]
**Facilitator note:** [timing, common questions]
```

One H1 per file (the exercise title). See `curriculum/CLAUDE.md` for the full content development rules.

## How modules reference exercises

A module file includes an exercise with a standalone markdown link whose href matches `exercises/<slug>.md`:

```markdown
[Exercise: Raw LLM](exercises/raw-llm.md)
```

The renderer detects standalone include links and inlines the file's content at that position.
