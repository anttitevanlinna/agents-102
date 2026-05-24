# Module file shape + cross-doc links

Canonical template + include/link mechanics. Loaded by `/content-creation` Pass 1 + any session creating a new module file or editing includes/cross-doc links. Pointer from `curriculum/CLAUDE.md`.

## Module File Shape

```markdown
# [Title]

## Big Idea
[One sentence]

## Meta
- Primary Bloom's level: [level]
- Prework: [list or "none"]
- Homework: [list or "none"]
- Materials (trainer): [list]
- Plug points: [list]

## What You'll Learn
After this module, you will be able to:
- **[verb]** [thing]

## Connections
[Training-specific opening question — audience-specific framing lives here]

## Lectures

[Lecture: Context is King](lectures/context-is-king.md)

## Exercises

[Exercise: Raw LLM](exercises/raw-llm.md)

[Exercise: Add the guardrail](exercises/add-guardrail.md)

## Key Concepts (Emergent)
[What emerges from doing the exercises. Concepts don't precede exercises.]

## Plug Points
[Where the organization inserts its own context]

## Debrief
[The 4th C — Conclusions. ~5-min personal retro WITH Claude via pasted prompt. Produces an artifact the student carries forward. Conversational-prompt style. Per-module: debrief questions shift to module's discipline.]

## Bridge
[One sentence to next module]
```

## Module include

Standalone link, href = `exercises/<slug>.md` or `lectures/<slug>.md`:

```markdown
[Exercise: Raw LLM](exercises/raw-llm.md)
```

Requirements:
- Link = entire paragraph, on its own line, no surrounding prose.
- Href is exact `exercises/<slug>.md` or `lectures/<slug>.md` (kebab-case, no subdirs).
- Target file exists.

Missing target → renders as-is (Pass 1 can reference future Pass 2 files).

## Cross-doc links — bare paths in source

Write the slug-bearing path the same way from any depth. `rewriteCrossDocLinks` in `site/layouts/curriculum.js` accepts `(?:\.\.\/)*` prefixes and rewrites:

- `(exercises|lectures)/<slug>.md` → `curriculum.html?file=<kind>/<slug>` (shared library)
- `trainings/<training>/(reference|supplementary)/<slug>.md` → `curriculum.html?file=trainings/<training>/<kind>/<slug>` (training-specific)

Forbidden in source:
- Hardcoded `curriculum.html?file=...` URLs (renderer leak).
- Depth-counted `../` prefixes (bookkeeping the author shouldn't track).

Maintainer-block bare-path text (no markdown link) is exempt from rewrite.

Standalone-include = renderer fetches + inlines file content. Inline body links = URL-rewrite only.

→ `memory/compounded/2026-04-26-platform-bare-paths-renderer-rewrites.md`
