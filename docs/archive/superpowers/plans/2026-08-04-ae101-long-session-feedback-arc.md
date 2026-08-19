# AE101 Long-Session Feedback Arc Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the standalone Backpressure supplementary and M4 company-memory coda with one post-send-off M4 lecture, then distribute the remaining check, reach, and workflow-composition theory across M5 and M6.

**Architecture:** M4 experiences and names the mechanism after the un-packaged session starts. M5 builds checks and calibrates the delegation frontier. M6 places checks at workflow seams and consolidates review bandwidth without repeating a Backpressure lecture. Navigation, manifests, strategy, vocabulary, trainer material, eval records, and renderer tests follow the same source-of-truth change.

**Tech Stack:** Markdown curriculum, Node.js curriculum renderer and tests, JSON evaluation ledgers, private Bosser strategy through `bosser-strategy:` references.

## Global Constraints

- Use **long-running session** in curriculum prose; noun `run` remains reserved by `curriculum/vocabulary.md`.
- Teach **backpressure** once in the M4 closer after the send-off starts; it is not a lecture title or repeated slogan.
- M4 stays observational and does not name the reference artefact, `plan.md`, verifier, three-pattern, reach ceilings, or workflow wiring.
- Preserve the un-packaged M4 baseline. Do not tell the learner to alter the active session.
- M5 owns check mechanics and gate calibration. M6 owns workflow seams and the inline-inspector-to-designer shift.
- Delete the standalone Backpressure supplementary and the company-memory lecture after their retained ideas have new homes.
- Keep the da Costa primary essay as the optional M5→M6 reading and M6 echo.
- Update `bosser-strategy:content-strategy-agentic-engineering-101.md` in the same implementation cycle without placing a private filesystem path in the public repo.
- Run student-facing prose through the content-creation rules, slide dosage rules, source backing, simulation, and eval gates before completion.

---

### Task 1: Replace the M4 closing lecture

**Files:**
- Create: `curriculum/lectures/what-keeps-a-long-running-session-going.md`
- Modify: `curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md:98-102`
- Modify: `curriculum/vocabulary.md:54-65`
- Modify: `scripts/build-workbook.js:139-158`
- Modify: `scripts/curriculum.test.js:143-160,292-307,350-378`
- Delete: `curriculum/lectures/will-company-memory-emerge.md`

**Interfaces:**
- Consumes: the M4 post-send-off slot, M4 curious-readiness mood, current memory/context distinction, and the un-packaged baseline contract.
- Produces: lecture slug `what-keeps-a-long-running-session-going`, an M4-earned `backpressure` vocabulary entry, and a theory-manifest entry used by renderer and eval-coverage tests.

- [ ] **Step 1: Add the failing manifest and render assertions**

In `scripts/curriculum.test.js`, make the manifest sanity check require the new lecture and make the theory-handbook test require the new lecture while rejecting the two deleted surfaces:

```js
assert.ok(
  manifestLectures.includes('what-keeps-a-long-running-session-going'),
  'manifest parse sanity failed: M4 long-session closer not extracted'
);

assert.match(handbook, /id="lectures-what-keeps-a-long-running-session-going"/);
assert.doesNotMatch(handbook, /id="lectures-will-company-memory-emerge"/);
assert.doesNotMatch(handbook, /id="supplementary-backpressure"/);
```

Add `id="lectures-what-keeps-a-long-running-session-going"` after `id="lectures-ironies-of-automation"` in the theory-handbook marker order.

- [ ] **Step 2: Run the focused test and confirm the new contract fails**

Run: `node --test scripts/curriculum.test.js`

Expected: FAIL because `build-workbook.js` and the M4 module still reference `will-company-memory-emerge` and the new lecture does not exist.

- [ ] **Step 3: Write the three-slide M4 closer**

Create `what-keeps-a-long-running-session-going.md` with exactly these student-facing sections:

```markdown
# What keeps a long-running session going?

The session is working. Do not change this first experiment while it runs. Watch what already helps it continue, and where it still waits for you.

## Durable state keeps the place

- A long-running session needs a place it can recover its position from. The live context moves and eventually fills; files on disk survive.
- Your rules, observations, task coordinates, current files, and transcript are the durable state this session has today. They do different jobs, but they all outlast a turn in the conversation.
- Durable state needs a home and an owner. A file that loads everywhere and belongs to nobody is not memory the system can trust.

## Feedback keeps the direction

- The session can produce changes faster than you can judge them. Every unread diff joins a queue downstream of the agent.
- Flow engineering calls the push from a slower downstream stage **backpressure**: slow down, stop, or redirect when the next stage cannot safely accept more.
- In this experiment, you are part of that feedback. Wherever no check can push back, your attention is the only thing that can move the session safely.

## A boundary decides whether to continue

- Some boundaries already stand without you: tests, types, lint, permission limits, and explicit stop or ask conditions. Each can interrupt a wrong step before the next step builds on it.
- The question is not how many checks the repo has. It is what notices first when this particular session goes wrong.
- Do not add packaging mid-experiment. Watch where an existing boundary fires, where the session waits for you, and where nothing pushes back. That is part of the result you bring back.
```

Use the da Costa source and existing source-verification record from `supplementary/backpressure.md` in the new maintainer/backing block. Carry no 85-percent arithmetic, no session-reach definition, and no gate-designer identity line.

- [ ] **Step 4: Wire M4 and retire the old lecture**

Replace the M4 include with:

```markdown
The task is running. One question while it works: what lets a long-running session continue without you holding every step?

[Lecture: What keeps a long-running session going?](lectures/what-keeps-a-long-running-session-going.md)
```

Update the M4 maintainer runtime and lecture-wiring notes so the closer is a three-slide observational beat riding the active session. Remove the dedicated company-memory debate from M4 notes. Delete `will-company-memory-emerge.md` only after the durable-state material is present in the new lecture.

- [ ] **Step 5: Move the vocabulary earning point**

Replace the Backpressure row in `curriculum/vocabulary.md` with:

```markdown
| **backpressure** | downstream feedback that slows, stops, or redirects production when the next stage cannot safely accept more | earned once after the M4 send-off; later lectures prefer checks, gates, review bandwidth, reach, and workflow seams | `what-keeps-a-long-running-session-going` |
```

- [ ] **Step 6: Update the theory manifest and run the focused tests**

Replace `'lectures/will-company-memory-emerge'` with `'lectures/what-keeps-a-long-running-session-going'` in the M4 manifest block. Leave supplementary removal for Task 3 so this task tests the M4 replacement independently.

Run:

```bash
node --test scripts/curriculum.test.js
node scripts/check-slide-size.js --file curriculum/lectures/what-keeps-a-long-running-session-going.md
```

Expected: the new lecture assertions pass; the test may still fail only on the explicit supplementary-absence assertion until Task 3. The slide-size check reports no oversized slide.

- [ ] **Step 7: Commit the M4 replacement**

```bash
git add curriculum/lectures/what-keeps-a-long-running-session-going.md curriculum/lectures/will-company-memory-emerge.md curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md curriculum/vocabulary.md scripts/build-workbook.js scripts/curriculum.test.js
git commit -m "Teach long-session feedback at the M4 close"
```

### Task 2: Distribute the remaining theory through M5 and M6

**Files:**
- Modify: `curriculum/lectures/what-packaging-is.md:199-204`
- Modify: `curriculum/lectures/the-gate-is-a-claim.md:37-43`
- Modify: `curriculum/lectures/composing-the-workflow.md:160-171`
- Modify: `curriculum/lectures/the-map-filled-in.md:173-197`
- Modify: `curriculum/trainings/agentic-engineering-101/learn-from-the-test.md:132-163,220-230`
- Modify: `curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md:6-9,66-84,155-163`

**Interfaces:**
- Consumes: M4's earned word and observation question.
- Produces: M5 check-reset and two-ceiling mechanisms, M6 seam composition and role shift, and a primary-source-only M5→M6 reading path.

- [ ] **Step 1: Add the M5 check-reset callback**

In `What packaging is`, keep the passage chart and four existing bullets. Add one sentence after `Packaging is choosing which of these fixes stand without you.`:

```markdown
A standing check pushes back before the next wrong step builds on the last one. That is the difference between a final review and feedback inside the passage.
```

Do not add a new section or repeat the word `backpressure` here.

- [ ] **Step 2: Add the two-ceiling reach mechanism to the delegation frontier**

In `The gate is a claim too`, add one bullet under `## The delegation frontier`:

```markdown
- The model sets one limit on reach; the gates behind it set another. Useful reach stops at the lower one. A stronger model behind an unverified gate still leaves you with work you cannot safely accept.
```

Keep the last bullet's warning as the lecture close. Do not turn the two-ceiling line into a new named framework.

- [ ] **Step 3: Make checks part of workflow composition**

In `Composing the workflow`, expand `## From skills to a workflow` with these ideas in the existing slide budget:

```markdown
- A workflow is not only steps in order. At a seam, a check or stop condition decides whether the next step may begin.
- Chaining generation without checks only moves work into the review queue faster.
- Your job moves from reading every intermediate output to designing the checks, routes, and exceptions that deserve your judgment.
```

Preserve the existing variety-first account of explicit load, orchestrator, routing, and hand-off. Cut redundant sentences before adding a seventh bullet.

- [ ] **Step 4: Reconcile the M6 consolidation callback**

Keep `The map, filled in` body free of a new Backpressure section. Update its maintainer dose/vocabulary note so it no longer claims the word is supplementary-only. Confirm the Absorption slide remains the sole M6 recap of generation speed, review bandwidth, and evals buying capacity back.

- [ ] **Step 5: Remove the internal supplementary from the M5→M6 reading path**

Delete the `Checks that push back` internal supplementary item from `learn-from-the-test.md`. Keep the da Costa item, but make it self-contained:

```markdown
**Read, Lucas F. da Costa, [Backpressure Is All You Need](https://www.lucasfcosta.com/blog/backpressure-is-all-you-need)** (May 2026). Da Costa follows the word from flow systems into agent work: when generation outruns judgment, the human becomes the limiting stage. Module 6 picks up the design question — which checks belong inside the workflow so the session does not wait for your read at every seam?
```

Remove the old URL-only banned-word carve-out and update the source stamp so it no longer points at the deleted supplementary.

- [ ] **Step 6: Simplify M6 prework and close**

In `spot-gaps-build-the-loop.md`, remove both internal supplementary links. Keep the da Costa essay echo in Prework. Remove the `Checks that hold the line` Next pointer. Update its maintainer note and source stamp to describe an M4-earned term plus M5 primary reading, not a supplementary-only word.

- [ ] **Step 7: Run content shape and link checks**

Run:

```bash
node scripts/check-slide-size.js --file curriculum/lectures/what-packaging-is.md
node scripts/check-slide-size.js --file curriculum/lectures/the-gate-is-a-claim.md
node scripts/check-slide-size.js --file curriculum/lectures/composing-the-workflow.md
node scripts/check-slide-size.js --file curriculum/lectures/the-map-filled-in.md
node scripts/validate-backing.js
```

Expected: no oversized new slide, no broken backing anchors, and no internal link to `supplementary/backpressure.md` from M5 or M6.

- [ ] **Step 8: Commit the M5/M6 distribution**

```bash
git add curriculum/lectures/what-packaging-is.md curriculum/lectures/the-gate-is-a-claim.md curriculum/lectures/composing-the-workflow.md curriculum/lectures/the-map-filled-in.md curriculum/trainings/agentic-engineering-101/learn-from-the-test.md curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md
git commit -m "Carry feedback checks through M5 and M6"
```

### Task 3: Remove the supplementary from navigation, builds, and tests

**Files:**
- Delete: `curriculum/trainings/agentic-engineering-101/supplementary/backpressure.md`
- Modify: `site/layouts/curriculum.js:62-69`
- Modify: `scripts/build-workbook.js:150-158`
- Modify: `scripts/slides.test.js:70-112`
- Modify: `scripts/curriculum.test.js:292-307`
- Delete: `curriculum/evals/instances/ae101--backpressure.*.json`
- Delete: `curriculum/evals/instances/ae101--lecture--will-company-memory-emerge.*.json`

**Interfaces:**
- Consumes: new lecture slug and primary-source-only reading path from Tasks 1–2.
- Produces: no live registry, build, test, or eval surface for the deleted pages; generic supplementary-render coverage remains.

- [ ] **Step 1: Generalize the supplementary renderer fixture**

In `scripts/slides.test.js`, replace the hard-coded Backpressure fixture with a neutral surviving supplementary:

```html
<section class="module" id="supplementary-verification-asymmetry">
  <div class="phase-kicker">Supplementary</div>
  <h1>Verification asymmetry</h1>
  <h2>Checking can be cheaper than doing</h2><p>body</p>
</section>
```

Update assertions to match `Verification asymmetry` and `Checking can be cheaper than doing`. This preserves generic supplementary rendering without keeping a deleted content slug alive as test vocabulary.

- [ ] **Step 2: Remove the supplementary registry and manifest entries**

Delete the `backpressure` item from `TRAININGS['agentic-engineering-101'].supplementaries` in `site/layouts/curriculum.js`. Delete `'supplementary/backpressure'` from `THEORY_HANDBOOK_MANIFEST` in `scripts/build-workbook.js`.

- [ ] **Step 3: Delete the old source and eval instances**

Delete the supplementary file and every eval instance whose target is `ae101--backpressure` or `ae101--lecture--will-company-memory-emerge`. Do not edit historical aggregate reports solely to erase past references; live coverage and current target lists must contain no deleted slug.

- [ ] **Step 4: Run renderer and workbook tests**

Run:

```bash
node --test scripts/slides.test.js
node --test scripts/curriculum.test.js
```

Expected: PASS, including the new M4 lecture, deleted-page absence, theory-manifest order, and generic supplementary rendering.

- [ ] **Step 5: Commit the navigation cleanup**

```bash
git add site/layouts/curriculum.js scripts/build-workbook.js scripts/slides.test.js scripts/curriculum.test.js curriculum/trainings/agentic-engineering-101/supplementary/backpressure.md curriculum/evals/instances
git commit -m "Retire the Backpressure supplementary surface"
```

### Task 4: Align strategy, delivery, and maintainer surfaces

**Files:**
- Modify: `bosser-strategy:content-strategy-agentic-engineering-101.md`
- Modify: `theory-plan.md:146-150,343-358`
- Modify: `curriculum/trainings/agentic-engineering-101/training-architecture.md:53-64`
- Modify: `curriculum/trainings/agentic-engineering-101/trainer-modules.md:327-385`
- Modify: `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md:41-54`

**Interfaces:**
- Consumes: the implemented M4→M6 curriculum path.
- Produces: one aligned strategic account, an accurate trainer run sheet, and no open punchlist item for the resolved reachability decision.

- [ ] **Step 1: Update the private AE101 strategy**

In the M4–M6 arc and M4/M5/M6 detail sections, replace the old placement with:

```markdown
M4 experiences and names the feedback constraint after the un-packaged session starts. M5 builds the checks and calibrates how far their verdicts deserve trust. M6 composes those checks into workflow seams. The progression is notice → build → calibrate → compose.
```

Remove claims that the named form belongs to an M5→M6 supplementary or first appears in M5. Keep M5's three-pattern reveal intact and keep M4 free of the artifact recipe.

- [ ] **Step 2: Update the public theory plan**

Change the far-half placement from `felt at M4, named M5, infrastructure at M6` to `felt and named after launch in M4, built and calibrated in M5, composed in M6`. Record that the word may appear in the new M4 lecture, while the passage chart still uses checks, fixes, rails, and drift. Remove `supplementary/backpressure.md` from the supplementary inventory and dose queue.

- [ ] **Step 3: Remove the company-lecture dependency from training architecture**

Replace the lecture delegation with present-tense architecture:

```markdown
AE101 ships two defined rule layers: personal and team. It does not prescribe a company-wide rules file. Company-wide conventions still need an owner and a review path before they qualify as durable state; the training keeps that boundary open without giving it a separate lecture.
```

- [ ] **Step 4: Update the M4 trainer run sheet**

Replace the lecture anchor and timing row with `What keeps a long-running session going?`. Trainer cues must enforce: session already active, three conditions only, observation rather than repair, and no M5 artifact names. Replace the three company-memory seed questions with one observation question:

```markdown
What is the first thing in this session that can notice a wrong step without you?
```

- [ ] **Step 5: Close the punchlist decision**

Delete the Backpressure reachability item from `pre-cohort-todos.md`. Rewrite the broader supplementary-navigation observation so it no longer depends on Backpressure as its example, or delete it if no concrete open decision remains.

- [ ] **Step 6: Sweep active references and commit public alignment**

Run:

```bash
rg -n -i "supplementary/backpressure|will-company-memory-emerge|named M5|supplementary-only" theory-plan.md curriculum site scripts --glob '*.md' --glob '*.js'
```

Classify every hit. Remove active-contract hits; leave dated eval reports or historical research records only when they are not live instructions, manifests, navigation, or target lists.

Commit public files:

```bash
git add theory-plan.md curriculum/trainings/agentic-engineering-101/training-architecture.md curriculum/trainings/agentic-engineering-101/trainer-modules.md curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md
git commit -m "Align AE101 strategy and delivery to the feedback arc"
```

### Task 5: Re-evaluate and verify the rendered arc

**Files:**
- Create/modify: current eval instances for every changed student-facing lecture and module
- Modify: Quality lines only from actual audit/eval results
- Inspect: generated workbook and theory handbook under a disposable customer slug

**Interfaces:**
- Consumes: all curriculum, strategy, registry, and test changes from Tasks 1–4.
- Produces: tested source, current eval ledgers, rendered proof, and a final clean worktree.

- [ ] **Step 1: Run the static test and lint floor**

Run:

```bash
npm test
npm run audit:backing
node scripts/check-slide-size.js --training agentic-engineering-101
node scripts/validate-prompt-graph.js
```

Expected: all commands PASS and report non-empty input counts where provided.

- [ ] **Step 2: Run source freshness for the current delivery horizon**

Run:

```bash
bash curriculum/evals/scripts/source-freshness.sh --target 2026-08-04 curriculum/lectures/what-keeps-a-long-running-session-going.md curriculum/trainings/agentic-engineering-101/learn-from-the-test.md curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md
```

Confirm the command finds real stamps in all three files and does not read the deleted supplementary.

- [ ] **Step 3: Run stale-class routing and curriculum evaluation**

Run:

```bash
node curriculum/evals/scripts/scan-stale-classes.js --files \
  curriculum/lectures/what-keeps-a-long-running-session-going.md \
  curriculum/lectures/what-packaging-is.md \
  curriculum/lectures/the-gate-is-a-claim.md \
  curriculum/lectures/composing-the-workflow.md \
  curriculum/lectures/the-map-filled-in.md \
  curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md \
  curriculum/trainings/agentic-engineering-101/learn-from-the-test.md \
  curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md
```

Use the emitted class list as the exact audit scope. Re-fire each listed writing, story, technical, behavior, pedagogy, strategy, slides, and cross-module class. If any verdict is REVISE, apply the finding and re-fire the same class until PASS.

- [ ] **Step 4: Build the real workbook surfaces**

Use a disposable customer slug:

```bash
node scripts/build-workbook.js codex-feedback-arc agentic-engineering-101
node scripts/build-workbook.js codex-feedback-arc agentic-engineering-101 --theory
```

Confirm the build reports successful reads and produces both the main workbook and theory handbook.

- [ ] **Step 5: Inspect long-read and Slides output**

Serve the repo root, open the AE101 M4, M5, and M6 pages, and verify:

```text
M4: send-off → What keeps a long-running session going? → Reading the return
M5: diagnose/package → What packaging is → The gate is a claim too → da Costa pre-read
M6: Composing the workflow → The map, filled in, with no internal Backpressure pointer
```

Check the painted slide headings, section order, link targets, and absence of deleted pages. Do not infer render correctness from the source tree alone.

- [ ] **Step 6: Run the final vocabulary and dead-link sweep**

Run:

```bash
rg -n -i "backpressure|will-company-memory-emerge|supplementary/backpressure" curriculum site scripts theory-plan.md --glob '*.md' --glob '*.js'
git diff --check
git status --short
```

Expected: `backpressure` survives in the M4 earned definition, the da Costa title/URL and relevant maintainer/source records; both deleted slugs are absent from live navigation, builds, tests, target lists, and module links.

- [ ] **Step 7: Commit audit and evaluation records**

```bash
git add curriculum/evals curriculum/lectures curriculum/trainings/agentic-engineering-101
git commit -m "Verify the AE101 long-session feedback arc"
```

- [ ] **Step 8: Run final verification from HEAD**

Run `npm test`, `npm run audit:backing`, and the focused workbook build once more after the final commit. Record the exact commands and results in the handoff.
