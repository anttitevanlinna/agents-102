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

## Confirmed non-gaps

Verified present for A101 — do not re-investigate, do not "fix":

- **Hook layer is already training-agnostic.** `eval-class-router.sh:90` matches `curriculum/(trainings/[^/]+|exercises|lectures|supplementary)/*.md` — A101 module edits route eval classes exactly as AE101's do. `prompt-edit-gate.sh:43` matches all of `curriculum/prompts/**`, so `a101-*` prompt bodies carry the same approval gate. `surface-detector.sh:36` names `agents-101` in its keyword regex.
- **`check-slide-deixis --training agents-101`** — clean, 46 files, no page-geometry pointers.

## Punch list

Each item: `[ ] [S/M/L] <gap> → <fix>`. Done items are deleted, not annotated (punch list, not changelog).

**Machinery — gates that do not guard A101**

- [ ] [M] `audit-eval-coverage.js` has no `--training` flag; `SURFACES` 100% AE101-hardcoded → the coverage gate silently ignores A101. **BLOCKED 2026-08-19: a concurrent session is live in this file (and `.test.js`). Do not touch. Re-check `git status` before starting.**
- [ ] [L] Timings. `calculate-time.js --training agents-101 --check` already runs and returns ~40 findings: 30 leaf files with no phase markers and no atomic declaration, 16 modules with no `- **Transitions:**` line, 32 durations written as a range where the contract is a single ceiling. A101 also has no `timings.md`, so caps and rhythm are unpriced. Fix the leaves, add `timings.md`, then pass `--training` in the `time` / `audit:timings` scripts.
- [ ] [M] `check-slide-size --training agents-101` fails: 12 oversized slides across 7 files. AE101's precedent is to SPLIT at a conceptual seam with zero wording changes and a command-verb header (`learn-from-the-test.md:115`), not to declare the overflow; the per-slide `**Slide size accepted:**` escape exists but AE101 barely uses it. Split, then wire the A101 invocation into `test` + `test:gates` beside the other two.
- [ ] [S] `build-workbook.js` `THEORY_HANDBOOK_MANIFEST` has no `agents-101` entry → `--theory` hard-aborts for A101.

**Prompt graph**

- [ ] [M] Systemic: most A101 exercise prompts still carry no graph fields at all. The graph now validates clean, but it validates a sparse graph — only the artefacts a debrief happens to require are declared. AE101 declares roughly half its prompts. Backfilling the rest is what makes PREMATURE catchable, not just DANGLING.
- [ ] [S] `curriculum/exercises/personal-agent-homework.md` is the last un-migrated file — 3 inline `**Prompt**` blocks, 0 registry markers.
- [ ] [S] `lint-prompt-bodies` Sev-2 on `name-your-crux-2` (§9 markdown italic).

**Quality state**

- [ ] [L] No pedagogy / strategy / slides / cross_module judge has EVER run against A101. Stamps carry the retired 4-class set, dated 2026-05-02..04, and never reached `sim-passed`. Re-audit + re-stamp on the 7-class set.
- [ ] [M] Maintainer-block shape drift: Quality line positioned first instead of last, no `cross_module` row anywhere.
- [ ] [S] 159 legacy-unprefixed instance JSONs sit outside the documented `instances/legacy/` archive; `evals/README.md` still documents the old unprefixed convention while the tooling uses `<training>--<type>--<slug>.<class>.json`.

**Content patterns**

- [ ] [L] Zero `Source verification` blocks / `checked:` stamps across all 9 module files despite live claims: Mollick citations, an 82%/24% stat, Mata v. Avianca, a Deloitte/DEWR report, an 85%×10 reliability stat.
- [ ] [L] Zero `<!-- backing -->` blocks in A101 (AE101 has 9). Priority: `output-quality.md`'s reliability math, the shared 82%/24% stat.
- [ ] [M] A101 supplementaries + the reference page carry no `<!-- maintainer -->` fence at all — so Pass-1 maintainer notes ("Pass 1 skeleton", "Module touchpoints", "Voice check", "Named-company examples to seed Pass 2") sit UNFENCED in student-facing body. This is the real defect behind the two `substrate` banned-word hits; fence the notes rather than swapping the word.
- [ ] [M] Noun-run for the agent sitting in `supplementary/cookbook-for-agent-system-design.md`: `### The Run` heading + 3 body uses → session / task per `vocabulary.md` § The work.
- [ ] [M] Em-dash ban unenforced: `reference/claude-quick-reference.md` (35 body hits) + `learning-and-compounding-systems.md` (4). These files never passed through the auto-rewrite hook.
- [ ] [S] 3 supplementaries on disk (`agent-ready-data`, `personal-to-company-gap`, `agent-trigger-list`) are unregistered in `curriculum.js` yet carry 3 / 3 / 6 inbound body links. Settle whether an unregistered slug 404s on click before deciding register-vs-delete.
- [ ] [S] One malformed backtick link + two stale self-study-signal paths (build report §6/§7).

**Deliberate non-goals** (recorded so they are not re-proposed)

- `## Optional challenges` is in all 7 AE101 modules and 0 of 9 A101 modules — but it is NOT in `module-shape.md`. Authoring nine of them is curriculum expansion, not parity. Maintainer call, not sweep work.
- A101's `trainer-guide.md` vs AE101's per-module `trainer-modules.md` run-sheets: a deliberate decide, not a build.

## Decided

- **Next-last, 2026-08-19 (Antti):** split into the canonical pair. Done across all 7 modules. Residual, worth a read before a cohort: several `## Next` paragraphs still carry a build-ask of their own that now sits below the `## Bring to` section making the same ask — M2's *"try making a few more agents you actually need"* and M3's *"keep working on your real problem"* are the two clearest. AE101's own note on this move applies: those paragraphs were written as bridges and now have to carry the close.
- **Judging, 2026-08-19 (Antti):** machinery first, judges later. Do NOT fire the 7-class re-audit in a machinery session. Every body edit landed here degrades pins by touch; `scan-stale-classes.js` derives what is owed, so nothing needs hand-marking in the meantime.

## Log

- 2026-08-19 — parity effort opened; four scouts dispatched; this doc created.
- 2026-08-19 — **canon rot closed before the A101 sweep, because A101 would have been stamped against the wrong spec.** `slides` has been a first-class eval class in the machinery for weeks (`scan-stale-classes.js:33` CLASSES, `update-quality.sh` state/pin loops, `/curriculum-pre-ship-audit`'s seven judges, AE101's own `slides@<sha>` pins) but the canonical spec never learned it. Fixed: `quality-format.md` (format line, judges row, class table, degrade mapping, grandfather rule), `curriculum/CLAUDE.md` § Quality + Done-done, `eval-fire` skill description, `update-quality.sh:209` comment. Retired the settled open decision in `evals/slide-sweep.md` (slides IS in the set). `npm test` green.
