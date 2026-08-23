# Agents 101 parity and eval completion design

**Status:** Approved by the Agents 101 parity goal and the source-first sequencing decision, 2026-08-23

## Goal

Bring Agents 101 up to the current Agentic Engineering 101 training-making conventions without turning it into AE101, then evaluate the stable Agents 101 sources through every applicable class and fix the content until the training passes.

Parity means shared production conventions, structural contracts, trainer usability, verification machinery, and completion evidence. It does not mean matching module count, audience, subject matter, runtime, or optional teaching devices.

## Canonical evidence

The pass is governed by:

- `curriculum/CLAUDE.md` and `curriculum/module-shape.md` for current curriculum structure and done-done.
- `curriculum/trainings/agents-101/training-architecture.md` for the Agents 101 working-directory and runtime contract.
- `bosser-strategy:content-strategy.md` for the eight-module arc, mood progression, agenticness contract, artefact compound, and intentional A101 choices.
- `curriculum/trainings/agents-101/ae101-parity.md` and `pre-cohort-todos.md` for the first parity pass and its open decisions.
- AE101's current `trainer-modules.md`, maintainer contracts, timing derivation, prompt graph, source-verification stamps, and eval machinery as convention examples rather than content templates.

## Parity work

### 1. One current trainer handbook

Replace the generic `trainer-guide.md` surface with `trainer-modules.md`, the filename required by the current done-done contract and consumed by the current trainer build.

The A101 handbook will have:

- one Start-here section for the shared trainer operating contract;
- one run sheet for each of the eight A101 modules;
- flow, opening state, artefacts, room watch-fors, push-back moves, decision points, recovery moves, and cut order grounded in the live module and exercise files;
- runtime maps produced by the timing machinery rather than hand-copied totals;
- no invented sold-slot caps for modules whose caps remain unknown.

Useful, non-duplicative guidance from `trainer-guide.md` moves into this handbook. Stale claims, notably that there are no slides and that the capture mechanism is TBD, do not survive. The old guide is removed once builds and inbound references point to the handbook.

### 2. Canonical module shape

Keep each module's student wording and teaching order intact while moving `## Key Concepts` after the final teaching/debrief beat and before between-session material and `## Next`. `## Next` remains last above the maintainer fence.

Prework keeps its special shape. A101 remains an eight-module compounding training; no modules or topics are added for parity.

### 3. Maintainer contract normalization

Normalize the eight module maintainer blocks around the information current production and peer trainers actually consume:

- transition timings and charge overrides;
- prework and materials;
- plug points;
- artefact contracts with stable identifiers, producer, and consumers;
- watch-fors and recovery moves;
- push-back moves and decision points;
- source-verification or backing blocks only where a source/claim trigger exists;
- seven-class Quality evidence after the final eval pass.

Do not add empty ceremonial fields or duplicate canonical details from exercises, architecture, or the trainer handbook. Maintainer notes point to their canonical owner.

### 4. Between-session and timing fidelity

The scheduled-agent exercise linked under `Bring to Module 3` is Module 2 homework. Charge it at zero live-session minutes while preserving its authored 35-minute homework duration. Recompute timings and let `timings.md` report the derived state; do not invent caps for the seven modules without sold slots.

Verify every module close/open pair for symmetric pre-read and homework links, explicit working-directory/session boundaries, and stable artefact handoffs.

### 5. Surface and registry hygiene

- Make `ae101-parity.md` unambiguously maintainer-only to the eval and status machinery.
- Preserve `agent-ready-data.md` and `personal-to-company-gap.md` as planning material without shipping or evaluating five-line student stubs. They remain maintainer-only until separately approved and written.
- Keep registered supplementaries and references in arc order.
- Exclude trainer, architecture, timing, parity, and planning files through one consistent surface-classification contract.

### 6. Production machinery

- Backfill meaningful `requires` and `produces` metadata for load-bearing A101 prompts so the prompt graph detects premature and dangling handoffs rather than merely parsing.
- Audit scaffold contents against paths named by modules, exercises, prompts, and artefact contracts.
- Verify runtime-specific instructions against the A101 CLI/Desktop/Cowork architecture and current capability evidence.
- Verify current source URLs and add machine-readable stamps/delegation where the source rules require them.
- Wire the Agents 101 coverage gate only after the real coverage debt is cleared.

## Intentional non-parity

The following remain different by design:

- A101 has eight modules, a six-module core plus two optional extensions; AE101 has six modules.
- A101 supports CLI, Desktop, and Cowork; AE101's runtime contract differs.
- A101 keeps its business-builder audience, catalogue silhouette, mood arc, and compounding working directory.
- AE101's optional challenges are not canonical module shape and are not copied into A101.
- AE101's theory canon/manifest is product-specific and is not copied into A101.
- Unknown A101 delivery caps remain blank rather than inheriting AE101's schedule.
- A101's two exercises in M3/M4 and M8's extension shape remain when pedagogically intentional.

## Eval sequence

Eval evidence is generated only after the parity sources are stable:

1. Run structural, link, prompt-graph, timing, slide, scaffold, source-freshness, and artifact-contract checks.
2. Run the three-persona simulations and resolve content failures.
3. Recompute the applicable file×class queue from current body hashes.
4. Run one Luna worker per eval class: writing, story, technical, behavior, pedagogy, strategy, and slides.
5. Make fixes in an authoring pass, invalidate affected evidence, and rerun only the affected file×class pairs until all applicable judgments pass.
6. Stamp seven current per-class SHAs and `sim-passed` only from current evidence.
7. Run the full eight-module cross-module judge and arc pass; fix and rerun if either revises.
8. Run the repository verification suite and confirm no open parity/eval TODO remains for any A101 surface in scope.

Interrupted pre-parity Luna reports are disposable. They are never treated as proof and are overwritten by the post-parity run.

## Completion evidence

The goal is complete only when current-state evidence proves:

- all eight module bodies conform to canonical shape while preserving the A101 arc;
- `trainer-modules.md` is the single A101 trainer handbook and builds correctly;
- timings, prompt graph, source stamps, links, scaffolds, and artefact contracts pass their checks;
- all applicable A101 file×class reports are PASS or justified N/A against the current body SHA;
- every module's Quality row carries seven current class SHAs and `sim-passed` where required;
- cross-module and arc evaluations pass across the full eight-module set;
- the eval coverage audit reports no real uncovered applicable A101 rules;
- repository tests pass, aside from any independently proven unrelated failure recorded with exact evidence;
- `pre-cohort-todos.md` has no open parity or eval item for a module claimed done-done.

