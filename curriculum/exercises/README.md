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

One H1 per file (the exercise title).

The semantics of the three lead-ins, the optional `**What happened:**` block, and the length budget are rules, not shape: `check_pedagogy.md` §52c and §52d, and `check_writing.md` §16. They fire at generation time; this file does not, so it carries the template and nothing that could drift out of step with them. Full content development rules: `curriculum/CLAUDE.md`.

## How modules reference exercises

A module file includes an exercise with a standalone markdown link whose href matches `exercises/<slug>.md`:

```markdown
[Exercise: Raw LLM](exercises/raw-llm.md)
```

The renderer detects standalone include links and inlines the file's content at that position.
