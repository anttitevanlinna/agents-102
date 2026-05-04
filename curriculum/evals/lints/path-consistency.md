# Lint — Path Consistency

**Catches:** scaffold ↔ exercise / module file path drift. Every file path an exercise names must exist in the scaffold the student has at that moment. Every `curriculum.html?...` link must use the correct query params the renderer accepts. Every `[Text](exercises/slug.md)` include-link must point to a real file.

**Antti's note:** file name failures have been a real source of training-day breakage. This lint is explicitly to prevent them.

## Run

Fresh Claude session at repo root. Paste:

```
You are running the path-consistency lint on Agents 102 curriculum files.

TARGET (default: all Agents 101 modules + their inlined exercises/lectures; narrow if user specifies):
- curriculum/trainings/agents-101/*.md
- Every exercise and lecture inlined via include-link

For each target file, do all four checks below and report ONLY violations. No summary for files that pass.

=== CHECK 1 — Include-link targets exist ===
Find every paragraph of the exact form `[Text](exercises/<slug>.md)`, `[Text](lectures/<slug>.md)`, `[Text](supplementary/<slug>.md)`. For each:
- Does curriculum/<folder>/<slug>.md exist?
- If not, report: file + line + broken link.

=== CHECK 2 — Cross-page links use correct query params ===
Find every link of form `curriculum.html?...`. For each:
- Module pages: href must be `curriculum.html?training=<name>&module=<slug>` (see curriculum/CLAUDE.md).
- Other `?file=...` or `?page=...` links: verify the renderer supports the param. Read site/curriculum.html to confirm what query params are actually handled. Report any href that uses an unsupported param.

=== CHECK 3 — Literal file paths referenced in prompts exist in the scaffold ===
Find every file path pattern in student-facing prompts or instructions: `prework/foo`, `module-N/bar`, `memory/`, `sources/`, `agents/`, `skills/`, `CLAUDE.md`, etc.
- At the point in the curriculum where this path is first written TO: does the scaffold (see curriculum/scaffolds/training-starter/ and per-module scaffolds) create the parent directory? If the write lands in a nonexistent dir, Claude Code will either error or succeed in creating it — different modes produce different student experience. Report: (a) paths written TO that do not have a seeded parent directory, (b) paths READ FROM that are not guaranteed to exist at that phase.

=== CHECK 4 — Filename conventions ===
- All exercise / lecture / supplementary filenames kebab-case, no numbers, no underscores. Flag violators.
- No spaces, no non-ASCII in any path named in a prompt the student pastes. Flag violators.

=== OUTPUT ===
For each violation:
- File + line
- What it says
- Why it breaks (which check, which expectation)
- Proposed fix

If zero violations, output "PASS — 0 violations." No elaboration.

Be literal. Do not paper over ambiguity ("probably fine"); flag it.
```

## What this has caught historically

Seed as the lint runs find real violations; each becomes a known-pattern entry.

- [2026-04-20 first run] TBD — will populate from findings.

## Upgrade path

When a real path-consistency bug slips past in a cohort (a student hits a file-not-found), add a new check to this lint. The lint should only grow when a real failure proves it was under-powered.
