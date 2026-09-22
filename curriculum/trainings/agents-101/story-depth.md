# A101 story & depth, goal spec

<!-- maintainer -->

Maintainer doc. Not student-facing. Companion to `ae101-parity.md`, which deliberately scoped
content OUT ("different training, different mood"). This file is the deliberate widening: bring
A101's storytelling and depth up to the bar AE101 set, without making A101 into AE101.

**Intended driver: an autonomous goal-loop session (Fable + /goal), not a babysat plan.** The
rubric below is the loop's fitness function; § Loop contract says what the loop may do alone and
where it must stop for Antti. A session picking this file up cold needs nothing outside it plus
the repo's own always-loaded rules.

## Goal

A101 tells its own interwoven stories — including stories about the future — with the same craft
AE101 does, and a judge can verify it. Two deliverables:

1. **A measurement** that detects the current gap and can re-run after every content change.
2. **A creative pass, delegated to an LLM**, that proposes A101-native story-sets for Antti to
   pick from. The stories themselves are NOT decided in this file. Anything below that reads like
   a story idea is grounding observation, not a decision.

## Grounding — what AE101 actually does (observations, 2026-09-22)

Read these as *the kind of thing* the creative pass must invent for A101, never as content to port.

- **A recurring picture that accrues.** One map figure, single-sourced, re-derived per module,
  progressively lit: near half M1, far half opens M4 (`the-far-half.md`), checking loop drawn
  solid M6 (`composing-the-workflow.md`). The student watches their own territory expand.
- **A horizon question, seeded and echoed, deliberately unanswered.** `the-2-frontiers.md`: the
  model's frontier moves without you; yours moves when you write. Opens M1, returns verbatim-shaped
  at the M6 capstone. Its backing block *guards against a future editor answering it* — the open
  future is a designed beat, not an omission.
- **A credo strip repeated at every recurrence.** Three axioms (act under uncertainty · competence
  sets the ceiling · cross personal → team) ride on every map copy. Standing orders, not observations.
- **The future held as genuinely contested, with named witnesses.** Whether a human stays in
  Absorption is taught as live: Osmani for, Ronacher worried, stance recorded with
  `would-move-it` conditions. Depth = the training knows what would change its mind.
- **Machinery carrying it:** backing blocks (claims typed vision/detail, sources stamped, stance
  levels), per-lecture mood targets and voices, recurrence-as-pedagogy ("the recurrence is the
  point"), seeded beats that pay off modules later, a reading-contract arc with per-module beats.

A101 today: strong per-module Big Ideas and good *local* narrative (M1 rehearsal → M2 real work),
one forward tease in M2 ("the move that bends the curve"). No recurring picture, no horizon
question, no capstone echo, no backing blocks (`ae101-parity.md` gates table), no sourced
future-of-the-field thread.

## Measurement — comparative arc judge

Absolute scores from an LLM judge are noise; paired comparisons are signal. The measure is a
**comparative arc read**: one judge reads BOTH trainings end-to-end in student order (A101's seven
modules, AE101's six), then renders per-dimension verdicts of the form *"X does this better,
because <quoted evidence from both>"*. Evidence quotes mandatory — a verdict without lines from
both corpora is invalid.

Dimensions (v0, expect to revise after calibration):

1. **Backbone** — is there a picture/model that accrues across modules, and does each recurrence
   add rather than repeat?
2. **Horizon** — is the future genuinely open on the page: questions seeded early, echoed late,
   not answered by assertion?
3. **Payoff density** — setups that pay off modules later; count the seeded-and-paid beats each
   arc actually lands, with locations.
4. **Depth honesty** — are claims about the field backed, stances contested where the field
   contests them, and does the training know what would change its mind?
5. **Audience fit** — do the stories belong to THIS training's buyer (builder leader vs engineer
   IC)? A ported story scores negative here, not neutral.

**Definition of done:** parity = the judge, on dimensions 1–4, finds no dimension where AE101 is
clearly ahead. Betterness = A101 ahead on at least one, behind on none. Dimension 5 is a per-arc
gate, not a comparison.

**Step 0 — calibrate before any content moves.** Run the judge now, against today's corpora. It
must report AE101 clearly ahead on dimensions 1–4 with correct evidence (the gap this file's
grounding section describes is the planted defect). A judge that reports parity today is broken;
fix the rubric, not the content. This is the `judge-hillclimb` recall principle applied to a
content measure.

Rubric lives at `curriculum/evals/judges/` once step 0 stabilises it; runs record like the other
standing reports (one file per scope, overwritten on rerun). Wiring into the quality ladder /
board is a later call — first make the instrument, then decide what it gates.

## Loop contract

The iteration the goal-loop runs, in order; each pass through 4–5 is one iteration.

1. **Step 0** calibration run (above), once. Its evidence output doubles as the gap statement the
   creative pass works against. Judge fails to see the gap → iterate the RUBRIC, not the content.
2. **Diverge**, once per brief. Parallel creative agents (3-ish), each proposing one complete
   story-set for A101: the backbone picture, the horizon question, the echo structure, where each
   beat lands across the seven modules, and what depth-machinery it needs. Written to disk, one
   file per proposal, per the orchestrator pattern. Constraints below travel with the dispatch.
3. **STOP: Antti picks** (or blends, or rejects the lot; rejection = sharpen the brief and
   redispatch). Nothing student-facing moves before this call.
4. **Implement** the chosen set module by module, on a branch (`main` is the shared KB; Antti
   merges). Approval gate per root CLAUDE.md §Approval gate: student-facing body text carrying a
   decision Antti has not made = card; the picked story-set counts as his called direction, so
   edits that execute it apply directly.
5. **Re-run the judge** after each implemented tranche. Verdict worsens on any dimension → revert
   that tranche before proceeding; the judge's evidence quotes are the next iteration's punch list.

**Stop conditions:** definition of done holds (§ Measurement) → wind down and report. Blocked on
step 3 or an Open decision → card it and idle, do not route around the gate. Two consecutive
iterations with no dimension movement → stop and report the stall rather than thrashing prose.

## Constraints for the creative pass (travel with the dispatch)

- Audience is the builder leader (CEO/CTO/SVP), psychographic per root CLAUDE.md. Their future
  story is organisational — learning rate, owning the transformation — not the engineer's inner
  loop. AE101's map answers "where am I in the work"; A101's backbone must answer that leader's
  question, whatever the creative pass decides that question is.
- Do not port AE101's stories, figures, or axioms. Dimension 5 punishes it.
- Vocabulary per `curriculum/vocabulary.md`; content rules load at generation time as usual;
  `check_strategy_tie_in.md` surface applies (Big Idea / mood contract per module).
- Runtime contract differs (Cowork + training directory, per A101's `training-architecture.md`) —
  a story beat that assumes a real repo or worktrees is wrong here.
- Proposals state where existing A101 beats survive: the current Big Ideas are assets to weave,
  not debris to clear (`feedback_curriculum_default_move_is_cut.md` still binds at implementation).

## Open decisions (Antti)

- Does the future-thread need sourced witnesses like AE101's (backing blocks land in A101 as part
  of this effort), or is the leader-facing future told house-voice only? This decides whether
  dimension 4 gates A101 at AE101's bar or a deliberately lighter one.
- Whether the judge, once stable, wires into the board/gates or stays an on-demand instrument.

<!-- /maintainer -->
