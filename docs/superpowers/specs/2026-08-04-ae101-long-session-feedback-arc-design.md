# AE101 long-session feedback arc

## Frame to land

> While the initial long run is going, then start already explaining what keeps a long run going. (backpressure as one element)

The curriculum term remains **long-running session**. The quoted frame records the design intent verbatim.

## Decision

Backpressure becomes an earned field term inside the M4 closing lecture. It is not the lecture title and not a standalone theory page.

The M4 close explains the conditions that let a long-running session continue while the first un-packaged session is already working. M5 turns those conditions into checks and tests their reliability. M6 places those checks at workflow seams and closes the far-half story.

The teaching progression is:

**notice the constraint → build checks → calibrate their reach → compose them into workflows**

## Learning contract

### M4: notice and name

Replace the company-memory coda with a three-slide lecture titled **What keeps a long-running session going?** It runs after the send-off prompt, while the session is working.

1. **Durable state keeps the place.** Memory is what survives the live context: rules, notes, task coordinates, files, and the transcript. The personal/team/company taxonomy compresses to the useful distinction: durable state needs a home and an owner. The company-layer debate is not a separate lecture thesis.
2. **Feedback keeps the direction.** When production outruns what the next stage can judge, the next stage pushes back. Flow engineering calls this **backpressure**. If no check can push back, the downstream constraint is the person watching.
3. **A boundary decides whether to continue.** Tests, types, lint, existing repo checks, permission boundaries, and explicit stop/ask conditions can interrupt a wrong step. The lecture asks what will notice first if the session goes wrong.

The close remains observational. It tells you not to add packaging to this first session. You watch which checks already exist, where the session waits for you, and where nothing pushes back. M4 still produces the un-packaged baseline M5 needs.

The lecture does not name the reference artefact, `plan.md`, the verifier, the three-pattern, session-reach ceilings, or workflow wiring. Those remain earned later.

### M5: build and calibrate

`What packaging is` owns the mechanism that checks interrupt accumulating drift. Its passage chart and the line **a check is a position fix** already teach this better than the standalone supplementary. Add only the smallest seam needed to connect the M4 observation: a standing check pushes back before the next wrong step builds on the last one.

`The gate is a claim too` owns reach and calibration. Its delegation-frontier close receives the surviving two-ceiling idea: the model sets one limit on reach and verified gates set the other; usable reach is bounded by the lower one. This stays subordinate to the lecture's main claim that green is only as trustworthy as the gate.

The optional M5→M6 reading keeps Lucas F. da Costa's primary essay. Remove the internal Backpressure supplementary from the reading list. The essay becomes recognition and extension after the field term has been earned in M4.

### M6: compose

`Composing the workflow` receives the identity and wiring move:

- A workflow is not only skills in sequence. A seam contains the check or stop condition that decides whether the next step may begin.
- Chaining generation without checks only moves work into the review queue faster.
- The role moves from reading every intermediate output to designing the checks, routes, and exceptions that deserve human judgment.

`The map, filled in` remains the consolidation surface. Its existing Absorption slide already owns the generation-versus-review speed gap, review bandwidth, and the claim that each eval standing without you buys capacity back. Reconcile its vocabulary and callbacks, but do not add another backpressure recap.

## Source material disposition

| Existing Backpressure section | Destination |
|---|---|
| The session outproduces your review | M4 closer: feedback and human downstream constraint |
| Checks compound the other way | M5 `What packaging is`: standing check interrupts drift |
| Session reach | M5 `The gate is a claim too`: delegation frontier and two ceilings |
| From inline inspector to gate designer | M6 `Composing the workflow`: workflow seams and role change |
| The first check that is not you | M4 closer: observation question; paid off by M6 composition |

Delete `supplementary/backpressure.md` after these ideas have homes. Do not retain a summary page that repeats the arc.

## Navigation and file changes

### Student-facing curriculum

- Add `curriculum/lectures/what-keeps-a-long-running-session-going.md`.
- Replace the M4 lecture include in `run-the-first-experiment.md` and update its close, runtime, mood notes, and lecture wiring.
- Remove `curriculum/lectures/will-company-memory-emerge.md` after its durable-state idea has moved.
- Update `what-packaging-is.md`, `the-gate-is-a-claim.md`, `composing-the-workflow.md`, and only the affected callbacks in `the-map-filled-in.md`.
- Remove the internal supplementary links from `learn-from-the-test.md` and `spot-gaps-build-the-loop.md`; keep the da Costa primary-source reading and its cross-module echo.
- Delete `curriculum/trainings/agentic-engineering-101/supplementary/backpressure.md`.
- Remove Backpressure from the supplementary registry in `site/layouts/curriculum.js`.

### Vocabulary and strategy

- Change the `backpressure` row in `curriculum/vocabulary.md`: the term is earned once in the M4 closer; later lectures use the curriculum's operational vocabulary of checks, gates, review bandwidth, reach, and workflow seams.
- Update `bosser-strategy:content-strategy-agentic-engineering-101.md` in the same curriculum edit. M4 now experiences and names the mechanism after launch; M5 builds and calibrates it; M6 composes it. Remove claims that the named form belongs only to the supplementary or first appears in M5.
- Update `theory-plan.md` where it still records the old felt-M4/named-M5 placement and supplementary-only word rule. Preserve the passage-chart rule: the chart itself uses checks, fixes, rails, and drift rather than placing the word on the visual.
- Update `training-architecture.md` so it no longer delegates the company-layer question to the removed lecture. Keep the architecture's actual personal/team knowledge-home contract.

### Delivery, builds, and records

- Replace the lecture slug in `scripts/build-workbook.js` and remove the supplementary slug.
- Update `trainer-modules.md` to teach the new M4 closing beat and its timing.
- Remove the closed Backpressure reachability item from `pre-cohort-todos.md`; retain any broader supplementary-navigation decision that still stands without this example.
- Remove or replace tests that use Backpressure as a hard-coded supplementary fixture. Keep the generic guarantee that linked supplementaries render in slides and workbooks.
- Remove eval instances belonging to the deleted lecture and supplementary. Generate fresh instances for the new lecture and re-evaluate every substantively changed lecture or module surface.
- Update source ledgers and backing blocks so the da Costa citation has one authoritative student-facing placement plus the required cross-module echo.

## Mood and dosage

M4 leaves you in curious readiness: the session is moving, you can see the machinery that may keep it moving, and you do not yet have the package that would fix its weak points. The lecture must not turn the baseline into a repair exercise.

The M4 closer introduces at most three handles: durable state, backpressure, and a continuation boundary. Backpressure is defined once in one breath. The later arc prefers concrete words over repeating the field term.

M5 keeps mechanical rescue: the concepts become buildable checks only after the first return has supplied evidence. M6 keeps practitioner fluency: workflow composition turns isolated checks into a system that can continue without placing every intermediate output in the human review path.

## Verification

Before completion:

1. Run the content lint and test battery with `npm test`.
2. Run `node scripts/check-slide-size.js --training agentic-engineering-101` and inspect the new M4 closer slide by slide.
3. Run `npm run audit:backing` and the source-freshness check for the da Costa URL.
4. Build the AE101 workbook and theory handbook; confirm the new lecture is present, the deleted pages are absent, and every include resolves.
5. Open the rendered M4, M5, and M6 pages in long-read and Slides views. Verify the post-launch order and the M4→M5→M6 navigation at the rendered layer.
6. Run the stale-class scanner and the required curriculum evaluation/simulation pass for every changed student-facing file. Re-fire any class that returns REVISE until it passes.
7. Grep the student-facing corpus for `backpressure`, `will-company-memory-emerge`, and `supplementary/backpressure`. Every surviving hit must match the new vocabulary contract or an external URL slug.

## Acceptance criteria

- M4 teaches what keeps a long-running session going only after the first send-off starts.
- The word **backpressure** is earned in M4 but is not a lecture title or a repeated slogan.
- M4 does not prescribe M5's reference artefact, `plan.md`, verifier, or workflow wiring.
- M5 owns check mechanics and gate calibration.
- M6 makes checks part of workflow composition rather than presenting composition as a chain of generators.
- The standalone Backpressure supplementary and company-memory lecture no longer appear in navigation, builds, tests, or live eval coverage.
- The M4→M6 story reads as notice → build → calibrate → compose in both long-read and Slides views.
