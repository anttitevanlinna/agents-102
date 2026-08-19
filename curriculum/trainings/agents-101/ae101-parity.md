# A101 ↔ AE101 parity — goal reference

Maintainer doc. Not student-facing. Working reference for the parity effort; check every proposed change against § *Goal* and § *Out of scope* before doing it.

## Goal

Apply the latest-and-greatest AE101 patterns + machinery onto Agents 101. A101 has not been maintained while AE101 moved on (A101 quality stamps date to 2026-05; AE101 to 2026-08). Parity = **the patterns and machinery match**.

## What "parity" means here

Parity is about **machinery and pattern**, not about content equivalence. The two trainings have different audiences, different modules, different moods. A101 does not become AE101.

**In scope — the machinery must match:**
1. Every gate that guards AE101 also runs against A101, wired into `npm test` / `test:gates`, not just theoretically `--training`-capable.
2. Quality state: A101 stamped across the current 7-class set (writing / story / technical / behavior / pedagogy / strategy / slides), not the retired 4-class set.
3. Eval instances follow the current `<training>--<surface>--<slug>.<class>.json` convention; legacy unprefixed instances migrated or retired.
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

| Gate | AE101 | A101 target |
|---|---|---|
| `check-slide-size` | in `test` | add A101 invocation |
| `check-slide-deixis` | in `test` | add A101 invocation |
| `check-slide-numbering` | in `test` | add A101 invocation |
| `check-emphasis-balance` | in `test` | verify scoping, wire |
| `check-cross-doc-anchors` | in `test` | verify scoping, wire |
| `check-doc-paths` | AE101-hardcoded | de-hardcode, wire |
| `validate-prompt-graph` | via `compile-prompts` | run clean, wire |
| `lint-prompt-bodies` | manual | run clean |
| `audit-eval-coverage --gate` | AE101 slug tables | extend or generalise |
| `validate-backing` | `audit:backing` | confirm scope |
| `source-freshness.sh` | AE101 stamps | stamp A101 claims |
| `calculate-time --check` | `timings.md` | A101 has no timings file |

## Evidence

Parity inventory produced by four read-only scouts, 2026-08-19:
- prompts → `parity-prompts.md`
- evals + quality → `parity-evals.md`
- content patterns → `parity-content.md`
- build + delivery → `parity-build.md`

(Scratchpad reports; findings promoted into § *Punch list* below as they are confirmed.)

## Punch list

Filled from the scout reports. Each item: `[ ] [S/M/L] <gap> → <fix>`. Done items are deleted, not annotated (punch list, not changelog).

_pending scout reports_

## Log

- 2026-08-19 — parity effort opened; four scouts dispatched; this doc created.
- 2026-08-19 — **canon rot closed before the A101 sweep, because A101 would have been stamped against the wrong spec.** `slides` has been a first-class eval class in the machinery for weeks (`scan-stale-classes.js:33` CLASSES, `update-quality.sh` state/pin loops, `/curriculum-pre-ship-audit`'s seven judges, AE101's own `slides@<sha>` pins) but the canonical spec never learned it. Fixed: `quality-format.md` (format line, judges row, class table, degrade mapping, grandfather rule), `curriculum/CLAUDE.md` § Quality + Done-done, `eval-fire` skill description, `update-quality.sh:209` comment. Retired the settled open decision in `evals/slide-sweep.md` (slides IS in the set). `npm test` green.
