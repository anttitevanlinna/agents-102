# Agents 101 parity and eval completion implementation plan

> Implement source stability first. Do not run or stamp final Luna judgments until Tasks 1–8 are complete and the queue has been recomputed.

## Task 1: Lock the authoritative inventory

**Files:** `site/layouts/curriculum.js`, `curriculum/trainings/agents-101/*.md`, registered A101 supplementaries/references, shared exercises/lectures linked by the eight modules.

1. Produce the ordered prework→M8 surface manifest from the registry and include graph.
2. Classify each file as student, trainer, maintainer, scaffold, prompt, or eval-only.
3. Compare module headings, maintainer fields, and trainer coverage with current canonical conventions.
4. Record intentional exceptions from the design; do not turn them into audit findings.

## Task 2: Fix surface classification

**Files:** `curriculum/evals/scripts/eval-queue.js`, `curriculum/evals/scripts/status.sh`, associated tests, `curriculum/trainings/agents-101/ae101-parity.md`, the two outline supplementaries.

1. Add failing tests showing maintainer-only parity/planning pages do not enter the student eval queue or status grid.
2. Implement one consistent classification fix.
3. Make the two outline files maintainer-only without discarding their planning notes.
4. Run the focused queue/status tests and inspect the resulting A101 surface list.

## Task 3: Normalize module shape and timing ownership

**Files:** eight A101 module files, `curriculum/trainings/agents-101/timings.md`, timing tests if needed.

1. Add/extend structural tests for Key Concepts placement and Next-last across A101.
2. Move Key Concepts in all eight modules without rewriting the bullets.
3. Add the `personal-agent-homework` zero-charge override to Module 2.
4. Recompute and update derived timing commentary from the tool's output.
5. Run module-shape, timing, slide-size/deixis/numbering, and cross-document-anchor checks.

## Task 4: Build the trainer handbook

**Files:** new `curriculum/trainings/agents-101/trainer-modules.md`; old `trainer-guide.md`; `scripts/build-workbook.js`, `scripts/README.md`, `curriculum/trainings/agents-101/timings.md`, tests and generated fixture only where tracked by convention.

1. Add focused tests proving A101 builds `trainer-modules.html`, exposes the trainer link, and no longer depends on `trainer-guide.md`.
2. Preserve the useful shared operating contract from the old guide in a Start-here section.
3. Derive eight module run sheets from current module/exercise maintainer contracts and timing placeholders.
4. Remove duplicate/stale guide material and delete the old guide.
5. Update inbound documentation references and run workbook/timing tests plus a real A101 workbook build.

## Task 5: Normalize module maintainer contracts

**Files:** eight A101 modules, linked exercise/lecture maintainer blocks only when they own the missing fact.

1. Build a field/consumer matrix so every added field has an actual production or trainer consumer.
2. Add missing watch-fors, recovery moves, push-back moves, decision points, and stable artefact rows from existing evidence.
3. Point to canonical exercise, architecture, or handbook details rather than copying them.
4. Leave Quality unstamped until final eval evidence exists.
5. Run artifact-contract and timing audits.

## Task 6: Complete prompt-graph metadata

**Files:** `curriculum/prompts/*.md` referenced by A101; registry/validator tests; originating exercises when prompt contracts disagree with body prose.

1. Inventory every A101 prompt's inputs and outputs from the actual prompt text and artifact contracts.
2. Add failing validator fixtures for one representative premature and dangling A101 handoff.
3. Backfill meaningful `requires`/`produces` metadata on load-bearing prompts.
4. Resolve real graph failures at their source; do not lie in metadata to make the graph green.
5. Run the prompt registry and graph validators.

## Task 7: Verify sources and capability claims

**Files:** source-bearing A101 modules/exercises/lectures, source stamps, `pre-cohort-todos.md`.

1. Run source-freshness and identify URLs/claims without current stamps.
2. Re-read primary sources and official product documentation for each current capability claim.
3. Add checked or delegated stamps with the required dates/due policy.
4. Correct stale runtime instructions, including scheduled-task and personal-skill paths, based on evidence.
5. Run source-freshness again and close only the TODOs the evidence proves.

## Task 8: Validate scaffolds, handoffs, and simulations

**Files:** A101 scaffolds, module/exercise/prompt paths, sim instances/cache, `pre-cohort-todos.md`.

1. Build/extract each scaffold in a temporary directory and compare actual paths with the curriculum contract.
2. Run the artifact-contract auditor across the full training.
3. Walk every adjacent module close/open pair for homework, pre-read, session, working-directory, and stable-path symmetry.
4. Run the three required personas through prework and M1–M8 using current sources.
5. Diagnose and fix failures; rerun affected simulations until current.

## Task 9: Run Luna eval classes

**Files:** current A101 student surfaces and `curriculum/evals/instances/`.

1. Recompute the A101 queue after all source edits.
2. Dispatch seven isolated Luna workers, one class each, with the exact full compendium and source body.
3. Require structured evidence, exact current `body_sha`, real command output where applicable, and class-scope discipline.
4. Validate every returned report against the schema and current source hash.
5. Summarize REVISE findings by owning source and class without stamping Quality.

## Task 10: Fix and rerun eval failures

**Files:** only sources owning verified failures, affected reports, sim evidence when behavior changes.

1. Use systematic debugging to group findings by root cause and reject false positives with evidence.
2. Apply the minimum coherent content fix that preserves strategy, mood, artifact, and cross-module contracts.
3. Re-run structural checks and simulations for each changed source.
4. Recompute hashes and rerun every invalidated file×class pair with Luna.
5. Repeat until the applicable queue is fully passing.

## Task 11: Stamp and run whole-arc evaluation

**Files:** A101 Quality blocks, final eval reports, cross-module and arc reports.

1. Run `update-quality` only after all seven current class reports exist for each applicable surface.
2. Stamp `sim-passed` from current simulation evidence.
3. Run the cross-module judge over all eight ordered modules.
4. Run the static arc pass against strategy and all included teaching files.
5. Fix, invalidate, and rerun any affected evidence until both whole-arc judgments pass.

## Task 12: Final verification and completion audit

1. Run focused A101 gates, eval coverage with `--gate`, full `npm test`, `git diff --check`, and the real workbook/scaffold builds.
2. Recompute the eval queue and confirm zero owing applicable A101 file×class pairs.
3. Verify seven current module Quality SHAs, current simulation status, trainer handbook presence, and no open A101 parity/eval TODOs.
4. Inspect the complete diff for accidental AE101 or unrelated changes and preserve other users' work.
5. Report exact evidence. Mark the goal complete only if every completion criterion in the design is proved.

