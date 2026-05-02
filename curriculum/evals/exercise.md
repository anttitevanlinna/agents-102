# Exercise eval — manifest

This file is a manifest, not a megajudge template. The four class judges (writing / story / technical / behavior) each evaluate exercises against their compendium-class rules; this manifest names which judges run and at what scope.

For the per-judge prompt templates, see `curriculum/evals/judges/{writing,story,technical,prompt-behavior}.md`. To dispatch a single class, use `/eval-fire <class> <file>`. For the full ship-time audit (all four classes in parallel + Quality-state + neighbour-alignment), use `/curriculum-pre-ship-audit <file>`.

## What runs for an exercise

| Class | Scope | Default model | Compendiums (filtered by `eval_classes:` frontmatter) |
|---|---|---|---|
| **writing** | piece | Haiku 4.5 | `check_writing.md`, `check_sales_copy.md`, `check_prompts.md`, `check_student_facing.md` |
| **story** | piece | Sonnet 4.6 | `check_pedagogy.md`, `check_strategy_tie_in.md`, `check_lectures.md` (Class A persona-reader sim trace) |
| **story** | seam | Sonnet 4.6 | (when this exercise sits at a module seam) — runs `curriculum/evals/seams/seam-judge.md` |
| **story** | arc | Sonnet 4.6 | (when this exercise is part of a Bootstrap or AE101 module sequence) — runs `curriculum/evals/arc-pass.md` |
| **technical** | piece | Sonnet 4.6 | `check_platform_and_boundaries.md`, `check_research_claims.md` + technical sub-rules in `check_pedagogy.md` and `check_prompts.md` |
| **behavior** | piece | Sonnet 4.6 | `check_prompts.md` + `check_pedagogy.md` + 15-pattern catalog at `.claude/skills/content-creation/simulation-behavior.md` (Class B prompt-behavior sim trace, per-prompt SHA-keyed) |

## Pass thresholds

- **Mood lands** (story class): 8+/10 at every phase-end + close. 7 = facilitator-premium signature; flag what would take it from 7 to 8. Below 7 = REVISE.
- **Teaching moment lands** (story class): the named teaching moment must reliably trigger across reasonable persona-skill variation. Skippable = REVISE.
- **No high-confidence behavioral risk on a load-bearing prompt** (behavior class): a high-confidence risk fired against a teaching-moment or hand-off prompt = REVISE.
- **All blocking rules PASS** per each class judge's JSON output. Any blocking REVISE → file BLOCK.

## Verdict ladder

- All four class judges PASS (no blocking REVISE) + Quality check PASS → **APPROVE**.
- All four PASS but some non-blocking REVISE rules → **APPROVE WITH TODOs** (TODOs logged in maintainer block).
- Any class judge blocking REVISE → **REVISE** (BLOCK).

## Output location

Per-class JSON output is written to `curriculum/evals/instances/<file-slug>.<class>.json` — overwrite-on-rerun per the no-dated-reports rule. Legacy megajudge .md instances (pre-2026-05-02) are archived at `curriculum/evals/instances/legacy/`.

## Maintenance

This file should stay short — it routes, it doesn't judge. When a new class or scope is added to the eval system, update the table here and link the judge prompt template. Per-rule details live in compendiums; per-class output schema lives in the judge prompt templates. Don't duplicate.
