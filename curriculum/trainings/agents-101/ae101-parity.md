# A101 ↔ AE101 parity — goal reference

Maintainer doc. Not student-facing. Working reference for the parity effort; check every proposed change against § *Goal* and § *Out of scope* before doing it.

## Goal

Apply the latest-and-greatest AE101 patterns + machinery onto Agents 101. A101 has not been maintained while AE101 moved on (A101 quality stamps date to 2026-05; AE101 to 2026-08). Parity = **the patterns and machinery match**.

## What "parity" means here

Parity is about **machinery and pattern**, not about content equivalence. The two trainings have different audiences, different modules, different moods. A101 does not become AE101.

**In scope — the machinery must match:**
1. Every gate that guards AE101 also runs against A101, wired into `npm test` / `test:gates`, not just theoretically `--training`-capable.
2. Quality state: A101 stamped across the current 7-class set (writing / story / technical / behavior / pedagogy / strategy / slides), not the retired 4-class set.
3. Eval instances follow the current `<training>--<surface>--<slug>.<class>.json` convention; legacy unprefixed instances migrated or retired. **Done 2026-08-19** — 203 renamed, 44 superseded duplicates dropped, and `check-instance-names.js` now gates the convention so it cannot drift back.
4. Prompt layer: registry-migrated, `requires:` / `produces:` graph closes clean, lint clean, covered by the approval + rule-coverage harness.
5. Authoring patterns AE101 has since adopted (backing blocks, source-verification stamps, maintainer-block shape, module shape) present where their own trigger rule fires on A101.
6. Doc-path / cross-link integrity checked, not assumed.
7. Vocabulary matches `curriculum/vocabulary.md` — the brain is the brain in every variant.

**Out of scope — do NOT do these under this goal:**
- Rewriting A101 curriculum content to be more like AE101's. Different training, different mood.
- Adding modules, exercises, or supplementary topics A101 does not have.
- Re-teaching AE101's engineering framing to A101's non-engineer audience.
- Any change that widens the diff beyond "the machinery now matches."

Test before any edit: *does this make the machinery match, or does it make the training different?* Second answer → stop.

## Standing gates (target state)

Each must run green against `--training agents-101` AND be wired into `package.json`:

| Gate | A101 state (2026-08-19) |
|---|---|
| `check-slide-size` | **green, wired** in `test` + `test:gates`. Runtime-fork double-count fixed; 16 slides split |
| `check-slide-deixis` | **green, wired** |
| `check-slide-numbering` | **green, wired** |
| `check-emphasis-balance` | green; corpus-wide, no `--training` needed |
| `check-cross-doc-anchors` | green; corpus-wide |
| `check-doc-paths` | **green, wired**; de-hardcoded, 151 module includes newly inside the gate |
| `validate-prompt-graph` | **green, wired** via `compile-prompts` for both trainings |
| `lint-prompt-bodies` | one Sev-2 open (`name-your-crux-2`, §9 markdown italic) |
| `audit-eval-coverage --gate` | **runs** via `--training agents-101`; deliberately NOT wired — see punch list |
| `validate-backing` | green; A101 has no backing blocks yet to validate |
| `source-freshness.sh` | A101 carries no stamps — see punch list |
| `calculate-time --check` | **green, wired** in `test` + `test:gates` + `audit:timings`; `timings.md` created |
| `check-instance-names` | **green, wired** in `test` + `test:gates`; corpus-wide, no `--training` needed |

## Evidence

Four read-only scouts ran 2026-08-19; every finding is promoted into § *Punch list*, so the reports are no longer needed to continue. They live in this session's scratchpad (`parity-prompts.md`, `parity-evals.md`, `parity-content.md`, `parity-build.md`) and will not survive the machine. Treat the punch list as authoritative.

**Standing warning: this repo has concurrent sessions.** During this pass another session held `scripts/audit-eval-coverage.js`, `scripts/audit-eval-coverage.test.js` and 13 files under `curriculum/evals/instances/` continuously. Run `git status --short` before starting anything, stage explicit paths only, and never revert a file you did not write.

## Confirmed non-gaps

- **A101 puts `## Key Concepts` ABOVE `## Debrief`**, where `module-shape.md` wants the recap after the last teaching section. Consistent across all A101 modules, and predates this pass. Reordering is a training change, not a machinery match — out of scope here. Raise it with Antti separately if it is worth raising at all.

- `.claude/skills/self-study/` paths: all resolve. `curriculum/self-study-signals/`, `.../friction/`, `curriculum/scaffolds/agents-101-starter/` all exist; `~/.claude/agents-102-self-study.json` is a runtime state file in the user's home, correctly absent until a first self-study session writes it. Earlier "two stale paths" flag was wrong.

Verified present for A101 — do not re-investigate, do not "fix":

- **Hook layer is already training-agnostic.** `eval-class-router.sh:90` matches `curriculum/(trainings/[^/]+|exercises|lectures|supplementary)/*.md` — A101 module edits route eval classes exactly as AE101's do. `prompt-edit-gate.sh:43` matches all of `curriculum/prompts/**`, so `a101-*` prompt bodies carry the same approval gate. `surface-detector.sh:36` names `agents-101` in its keyword regex.
- **`check-slide-deixis --training agents-101`** — clean, 46 files, no page-geometry pointers.

## Punch list — moved out 2026-08-19

**Open items live in `pre-cohort-todos.md`, not here.** That file declares itself the canonical home for A101 open work, and two punch lists for one training is how they drift apart. Everything this doc still owed was folded into its existing sections rather than bolted on as a parity annex, because the work is the same work whatever prompted it:

| Was here | Now |
|---|---|
| Source-verification blocks / `checked:` stamps | § 3 Source verification |
| `<!-- backing -->` blocks, `cross_module` row, Quality-line position | § 4 Maintainer contract normalization |
| The two Pass-1 supplementaries; `agent-trigger-list` paths | § 7 Scaffold and reference disposition |
| The 7-class re-judge bill, `audit-eval-coverage` wiring, 159 legacy instances | § 8 Eval instances to fill |
| The sparse prompt graph | § 12 Prompt-registry catch-up audit |
| Optional challenges, trainer run-sheets, Key Concepts placement, the theory handbook | § 6 Unclear / design-choice flags |

This doc keeps what `pre-cohort-todos.md` has no room for: the goal, the scope test, what parity was taken to mean, the gates table, and the log of what was found and why. Read it to understand the effort; read the punchlist to do the next piece of work.

## Decided

- **Next-last, 2026-08-19 (Antti):** split into the canonical pair. Done across all 7 modules. Residual, worth a read before a cohort: several `## Next` paragraphs still carry a build-ask of their own that now sits below the `## Bring to` section making the same ask — M2's *"try making a few more agents you actually need"* and M3's *"keep working on your real problem"* are the two clearest. AE101's own note on this move applies: those paragraphs were written as bridges and now have to carry the close.
- **Judging, 2026-08-19 (Antti):** machinery first, judges later. Do NOT fire the 7-class re-audit in a machinery session. Every body edit landed here degrades pins by touch; `scan-stale-classes.js` derives what is owed, so nothing needs hand-marking in the meantime.

## Landed

`git log --oneline` from `1e821ec` carries the detail; this is the index.

1. **Canon caught up to the seventh eval class.** `slides` was live in the machinery and missing from `quality-format.md`, `curriculum/CLAUDE.md`, the `eval-fire` skill and `update-quality.sh`'s comment. Fixed before touching A101, so a re-stamp could not mint blocks against the wrong spec.
2. **`check-doc-paths.js` started reading module includes.** The student-surface roots pre-filter skipped every bare `exercises/<slug>.md` — 151 of them, across every training — so the gate reported clean without opening the pointer class that decides what renders. Also replaced the single hardcoded AE101 resolution root with one per training. No rot found; the gate was the defect.
3. **Two slide gates wired for A101** (`check-slide-deixis`, `check-slide-numbering`) into `test` + `test:gates`. Prework renumbered 1-indexed to satisfy the numbering contract.
4. **A body primitive can be scoped per training.** `BODY_PRIMITIVES` entries take `trainings: [...]`; `./observations/` and `CLAUDE.local.md` are AE101-only conventions and were failing A101 with two CONFIG-STALE errors naming the validator rather than the content.
5. **A101's prompt graph closed, 15 errors → 0**, and `compile-prompts.js` now validates every training rather than AE101 alone. Seven real producers backfilled (`name-your-challenge-1`, `three-minds-one-synthesis-1`, `audit-your-agent-3`, `hallucination-bakeoff-8`, `eval-loop-2`, `share-your-work-6`, `joint-double-diamond-8`), each confirmed against the prompt body that does the writing.
6. **Next-last across seven modules**, split into the canonical `## Bring to` / `## Pre-reads` pair per Antti's call.
7. **Ten un-rewritable links fixed + guarded.** A bare `supplementary/<slug>.md` is rewritten by neither renderer pattern and reaches the SPA as a dead relative href, while every existence checker reports it clean because the file is real. Five in A101 module bodies, five in AE101's todos. Invariant test in `scripts/curriculum.test.js`.

## Log

**2026-08-19 — the session's own summary.** Every deterministic gate AE101 has now runs green against A101 and is wired into `npm test` / `test:gates`, except `audit-eval-coverage`, which runs but is deliberately unwired pending the parked judging. Two checker defects were found and fixed rather than worked around: `check-slide-size` glued all three A101 runtime branches together (and counted an inline fork at zero), and `audit-eval-coverage` could not name a training that was not AE101. The largest single finding was that no A101 exercise had ever carried a `##` heading, so fifteen files were invisible to both the clock and the deck; the slide gate had been measuring 14 files and is now measuring 24.

**The pattern worth remembering:** parity here was much less about porting AE101 machinery onto A101 than about pointing machinery we already owned at the half of the corpus it had never been aimed at. Four punch items dissolved on inspection (theory handbook, self-study paths, supplementary fences, unregistered-page "dead links") — a scout reading a tree quickly will over-report, and every finding wants a second look before it becomes work.

**2026-08-19 — a directory-wide `git add` swept up a neighbour's staged work.** Commit `e716f7a` carries nine `curriculum/evals/instances/ae101--*.cross_module.json` DELETIONS that are not mine. They were already in the shared index, staged deliberately by a concurrent session; `git add curriculum/exercises curriculum/trainings/agents-101` did not touch them, but the plain `git commit` that followed committed the whole index. Content is recoverable (`git show e716f7a^:<path>`), and the deletions look like that session's intent rather than an accident — so they are left alone rather than reverted, which would undo someone else's live work. What is wrong is the label: those nine files have nothing to do with A101 timings. This is exactly what `feedback_stage_explicit_files_multisession.md` exists to prevent, and the rule is: stage explicit files, then `git show --stat` before believing the commit is yours.

- 2026-08-19 — **canon rot closed before the A101 sweep, because A101 would have been stamped against the wrong spec.** `slides` has been a first-class eval class in the machinery for weeks (`scan-stale-classes.js:33` CLASSES, `update-quality.sh` state/pin loops, `/curriculum-pre-ship-audit`'s seven judges, AE101's own `slides@<sha>` pins) but the canonical spec never learned it. Fixed: `quality-format.md` (format line, judges row, class table, degrade mapping, grandfather rule), `curriculum/CLAUDE.md` § Quality + Done-done, `eval-fire` skill description, `update-quality.sh:209` comment. Retired the settled open decision in `evals/slide-sweep.md` (slides IS in the set). `npm test` green.
