# Lectures Library

Canonical lecture files. One file per lecture. Shared across all trainings.

## Filename convention

`<slug>.md` — kebab-case. Example: `context-is-king.md`, `compounding.md`, `why-llms-fabricate.md`.

## File shape

```markdown
# Lecture: [Name]

[Content — under 10 minutes of facilitator talking per the 10-minute rule in lecture-guardrails.md.]
```

One H1 per file (the lecture title). See `curriculum/CLAUDE.md` for the full content development rules.

## How modules reference lectures

A module file includes a lecture with a standalone markdown link whose href matches `lectures/<slug>.md`:

```markdown
[Lecture: Context is King](lectures/context-is-king.md)
```

The renderer detects standalone include links and inlines the file's content at that position.
