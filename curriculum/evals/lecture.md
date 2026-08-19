# Lecture eval — manifest

This file is a manifest, not a megajudge template. The four class judges (writing / story / technical / behavior) each evaluate lectures against their compendium-class rules; this manifest names which judges run and at what scope.

For the per-judge prompt templates, see `curriculum/evals/judges/{writing,story,technical,prompt-behavior}.md`. To dispatch a single class, use `/eval-fire <class> <file>`. For the full ship-time audit, use `/curriculum-pre-ship-audit <file>`.

## What runs for a lecture

| Class | Scope | Default model | Compendiums (filtered by `eval_classes:` frontmatter) |
|---|---|---|---|
| **writing** | piece | Haiku 4.5 | `check_writing.md`, `check_sales_copy.md`, `check_student_facing.md` |
| **story** | piece | Sonnet 4.6 | `check_pedagogy.md`, `check_strategy_tie_in.md`, `check_lectures.md` (Class A persona-reader sim trace) |
| **story** | seam | Sonnet 4.6 | (when this lecture sits at a module seam) — `curriculum/evals/seams/seam-judge.md` |
| **story** | arc | Sonnet 4.6 | (when this lecture is part of a Agents 101 or AE101 module sequence) — `curriculum/evals/arc-pass.md` |
| **technical** | piece | Sonnet 4.6 | `check_platform_and_boundaries.md`, `check_research_claims.md` + technical sub-rules in `check_pedagogy.md` and `check_prompts.md` |
| **behavior** | piece | Sonnet 4.6 | (only when the lecture body contains `**Prompt**` blocks a student would copy — most lectures don't) `check_prompts.md` + 15-pattern catalog at `curriculum/evals/simulation-behavior.md` |

## Pass thresholds

- **Leap test** (story class): a CTO / builder leader can do the named outcomes after reading. Otherwise REVISE.
- **Mood lands** (story class): 8+/10 at close. Below 7 at close = REVISE. Scale anchors: `curriculum/evals/simulation.md` §Mood scale (canonical).
- **Lecture placement** (story class, via `check_lectures.md`): meta-frame lectures are closers, not openers. Minimal lecturing before contrast-mood exercises.
- **All blocking rules PASS** per each class judge's JSON output. Any blocking REVISE → file BLOCK.

## Verdict ladder

- All applicable class judges PASS + Quality check PASS → **APPROVE**. (Behavior class is N/A for prompt-less lectures.)
- All applicable PASS but some non-blocking REVISE rules → **APPROVE WITH TODOs**.
- Any class judge blocking REVISE → **REVISE** (BLOCK).

## Output location

Per-class JSON output is written to `curriculum/evals/instances/<training>--<surface-type>--<slug>.<class>.json`. Surface type comes from the judged file's parent directory, never its basename; `check-instance-names.js` gates it.

## Maintenance

Stay short. When a new class or scope is added, update the table and link the judge prompt template. Per-rule details live in compendiums; per-class output schema lives in the judge prompt templates.
