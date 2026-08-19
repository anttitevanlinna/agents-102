# Archive

Finished internal working material — plans, specs, status files, sweep reports — kept
because the *why* outlives the *how*, moved out of the live tree because a worklist for
work that already shipped reads as work still owed.

**Not** research (`continuous-research/`) and **not** curriculum (`curriculum/`). Nothing
here is student-facing. Nothing here is a live instruction to anyone.

Layout mirrors the origin path: a file archived from `docs/superpowers/plans/x.md` lands at
`docs/archive/superpowers/plans/x.md`. Moves are `git mv`, so history follows.
Internal path references inside archived files point at the pre-move locations; that is
expected and not worth repairing.

**Before archiving:** confirm the work actually landed in the tree (check the artifact, not
the checkboxes — plans here shipped with boxes unticked) and confirm nothing live links to
the file.

## superpowers/ — archived 2026-08-19

Superpowers implementation plans and their design specs. All verified landed:

| File | Shipped as |
|---|---|
| `plans/2026-07-29-…-theory-handbook-exercise-cards.md` + spec | `View summary` card machinery in `scripts/build-workbook.js` |
| `plans/2026-08-04-…-long-session-feedback-arc.md` + spec | `curriculum/lectures/what-keeps-a-long-running-session-going.md`; Backpressure supplementary retired |
| `plans/2026-08-05-…-m1-room-agreement.md` + spec | agreement slides in `…/agentic-engineering-101/getting-going.md` |
| `plans/2026-08-05-how-this-training-was-built.md` + spec | lecture cut to 448 student-facing words |
| `plans/2026-08-15-…-optional-challenges.md` | `## Optional challenges` in all six AE101 modules |
| `specs/2026-08-09-…-m2-material-plan-reading-design.md` | good-enough stopping rule across the M2 surfaces |

Left live in `docs/superpowers/specs/`: `2026-08-05-ae101-theory-canon-rewrite-design.md` —
`theory-plan.md` is still the mixed changelog that spec exists to replace.

## theory/ — archived 2026-08-19

`theory-completeness-review-2026-07-02.md` + `.results.json`. The 2026-07-02 completeness
review over the theory handbook (4 confirmed / 11 downgraded / 6 refuted / 10 minors).
Its verdicts are already absorbed into `theory-plan.md`, which remains AE101 theory canon
and points here for the underlying run.

## curriculum-evals/ — archived 2026-08-19

Two dated AE101 eval reports. `check_writing §3` bans dated report filenames in tracked
git (one latest report per scope, overwritten on rerun); the maintained standing reports
are `curriculum/evals/arc-read.ae101.md`, `voice-hunt.ae101.md`, `eval-coverage.ae101.md`.

| Old path | Now |
|---|---|
| `curriculum/evals/ae101-full-reeval-2026-07-12.md` | `docs/archive/curriculum-evals/ae101-full-reeval-2026-07-12.md` |
| `curriculum/evals/ae101-fix-pass-2026-07-26.md` | `docs/archive/curriculum-evals/ae101-fix-pass-2026-07-26.md` |

Dated records elsewhere (eval instances, compounded entries, maintainer naming
corrections) still cite the old paths with line numbers. Those are the record of what a
judge saw, not pointers to follow, so they are left as written; this table is the redirect.

## evals-legacy/ — archived 2026-08-19

The Feb–Jun 2026 root `evals/` directory: five LLM-judge themes (CTO prompting, editorial,
epistemic, curriculum, retrieval) plus their test cases, results and iteration log. The
Scorable API it was built against expired, and its last consumer was the `goalcheck` skill,
now retired. Curriculum judging lives in `curriculum/evals/`; article judging has no
successor here.

## eval-instances-legacy/ — archived 2026-08-19

Twenty-nine megajudge audit reports from the eval system that predates the per-class split
(writing / story / technical). Superseded by the per-class JSON under
`curriculum/evals/instances/`; kept to trace what each file had previously cleared.

## curriculum-evals/ (scratch, tmux-runner) + module-design/ — archived 2026-08-19

- `scratch/source-sweep-2026-05-25/`, `scratch/sim-precohort/` — completed sweep and
  simulation working files.
- `scratch/m4`–`m6-defect-sweep`, `scratch/exercise-lead-in-audit` — findings reports with
  no open items; the lead-in audit declares itself stale on its AE101 half.
- `tmux-runner/FIX-PLAN`, `RESUME-a101-runner`, `SPECS-m4-m6`, `a101-runner-findings` —
  compaction handoffs and worklists for the Agents 101 runner build.
- `_punch-list-writing.md`, `module-design/ae101-m6-plan.md` — live-state files for runs
  that finished.

`scratch/buried-gold-proposals-2026-08-15.md` was not archived: its twenty-one adjudicated
verdicts fold into `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`
§ *Hunt for buried gold*, and the file is deleted.

## Root docs — archived 2026-08-19

- `PROMPT.md` — completed research-track table; the tracks it lists live under
  `continuous-research/archive/`.
- `quiz-spec.md` — spec for the shipped `site/readiness/` and `site/check/` quizzes.

## curriculum/ — archived 2026-08-19

`module-design-long-running-strategy.md`. The plan-walk-away-return method for
long-running generation, with a Run history that stops at 2026-04-23 and a "Rules the
file has learned" section it was supposed to rewrite at the close of every such cycle.
Four months of AE101 generation happened without either. A doc that claims to be
maintained and is not is worse than no doc: it invites a reader to treat a spring
snapshot as current method. The method itself is preserved here; what the compendiums
carry is what binds.

Dropped with it: its `curriculum/CLAUDE.md` canon entry, its row in `MEMORY.md`'s
canonical files and skill-trigger tables, and the bullet in `/compound`'s "what this
skill does NOT do" that disambiguated against a compound step that no longer runs.
