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

## Grounding — the big learnings AE101 develops (read 2026-09-22)

The unit of storytelling is a **big learning that develops across the arc**, felt from the
student's seat. AE101 carries five, braided. Read them as *the kind of thing* the creative pass
must invent for A101's leader, never as content to port.

1. **"How do I trust work I didn't watch?"** — the spine. M1: the agent's success report is a
   hypothesis, not ground truth (agreeable answers won the preference round). M3: control is
   interrogation, not reading; the branch is the permission, the merge is where control lives.
   M4 asks it plainly as the far half opens. M5 turns the scrutiny on the checks themselves
   (`the-gate-is-a-claim.md`: green is a claim; gates decay under Goodhart). M6 pays off as the
   delegation frontier: calibrated agency and reckless autonomy look identical from outside; the
   frontier moves outward only as fast as the gates behind it. Bainbridge's ironies run as the
   counter-voice: the trust is deserved AND it erodes your vigilance.
2. **"Your frontier is what you have expressed."** M1: the machine amplifies the posture you
   bring, your stance is the ceiling. Develops into: every push-back becomes a rule, every "not
   like that" becomes a check. Final lecture: the agent stops where your judgement begins, and the
   line never goes away.
3. **"The kit compounds; the model rotates."** M1: the correction went to disk, not scrollback.
   M3: the compound ladder fix → memory → skill → system, double-loop learning. M5: packaging.
   M6: skills compose, evals prove the kit improves, and the bitter lesson says your procedures
   get superseded — which is why you compound the durable half.
4. **"Nobody has this figured out — that is your opening."** The model has read the whole field
   and gives you a forecast, not a measurement; every playbook is a candidate until tested here;
   the missing evidence is local. Closes as the two frontiers, deliberately unanswered
   (`the-2-frontiers.md`; its backing block guards against anyone answering it).
5. **The credo, planted and harvested.** *Act under uncertainty · competence sets the ceiling ·
   cross personal → team* rides silently on every map copy, then is spoken once as the final
   teaching beat.

The braid is the craft: 1 and 3 fuse at the delegation frontier (the gates you compound buy the
trust); 4 explains why 3 matters; the two frontiers collapse 2 and 4 into one open question. The
map figure that fills in module by module is the stage these play on, not a story itself.

A101 today: per-module Big Ideas, good *local* narrative (M1 rehearsal → M2 real work), one
forward tease in M2 ("the move that bends the curve"). Whether any learning develops across
modules is what step 0 measures — do not assert the answer here.

## Measurement — the rubric

**Unit = a big learning, never a module or a file.** The judge reads one training end-to-end in
student order and first **names its big learnings** from a cold read: which ideas the student
leaves carrying, and where each one was planted, complicated, and paid off. A training whose
judge can only recite per-module headline ideas has its gap measured right there.

Each named learning is then held against five factors (Antti's four, 2026-09-22, plus the fifth):

- **Depth** — the learning *develops*; it is not stated. Trace planted → complicated → paid off.
  Count only beats that change the idea's meaning; restatements score zero. A headline idea that
  never returns has depth one.
- **Forward-looking** — the training says where this is going and keeps it honestly open. The
  student leaves carrying a *question* about the future, not a *prediction*; vendor futurism
  ("agents will X by 2027") scores negative. Tell: does it prepare the student for the model
  changing underneath them?
- **Applicable in practice** — the learning has a governor: a one-sentence pre-action move that
  fires on a Tuesday ("name the uncertainty before you move", "when did you last do this by
  hand?"). A learning with no move is theory theatre.
- **Self-challenging** — the training doubts its own tools on the student surface: each learning
  carries its own failure mode or counter-voice, and somewhere the training says *this might be
  wrong, here is how you would know*.
- **Earned, not announced** — the name arrives *after* the student did the move (recognition
  before naming). Without this the other four can hold for a lecture nobody felt.

**How it is scored.** Paired, not absolute: for each factor the judge rules `A101 | AE101 | even`
across the two trainings' learning-sets, with quoted evidence from both corpora; a verdict without
lines from both is invalid. Majority of three independent judges. Plus one per-arc gate, not a
comparison: **audience fit** — the learnings belong to this training's buyer (builder leader vs
engineer IC); a ported AE101 learning scores negative, not neutral.

**Definition of done:** parity = no factor where AE101 leads. Betterness = A101 leads on at least
one, trails on none. Audience fit passes throughout.

**Step 0 — calibrate on AE101 alone, before any content moves (Antti, 2026-09-22: A101's
modules are not developed enough for a comparison to say anything new).** Run three judges on
AE101 only. They must recover the learning-set in § Grounding — the trust arc, expression as
the frontier, kit-compounds-model-rotates, the open future, the credo — with correct locations,
and rate the five factors strong or present. A judge that returns per-module headlines, or
misses the trust arc, is broken; fix the rubric, not the content. This is the `judge-hillclimb`
recall principle applied to a content measure. The comparative run (both trainings, paired
rulings) starts only once A101 has a learning-set to compare; until then A101 is judged in the
same single-training mode and its report IS the gap statement.

Rubric = `curriculum/evals/story-depth-rubric.md` (the judge prompt, verbatim); runs record like
the other standing reports (`curriculum/evals/story-depth.md`, one `## Run` section per run).
Wiring into the quality ladder / board is a later call — first make the instrument, then decide
what it gates.

## Dispatch shapes

Both halves of the loop run on subagents; the main thread orchestrates and synthesises only.

- **Judges** — three per run, one message, `run_in_background: true`, Sonnet. Prompt =
  `curriculum/evals/story-depth-rubric.md` with the module lists pasted in registry order.
  Each writes `curriculum/evals/story-depth/<run-label>.judge-<n>.md`; the orchestrator takes
  the majority per factor into the standing report `curriculum/evals/story-depth.md`.
- **Creative diverge** — three to four per brief, one message, background, on the strongest
  model available (this is the one place breadth is not the job; taste is). Each agent gets the
  step-0 report, the five AE101 learnings from § Grounding as the *shape* to match, the
  constraints below, and a distinct opening bias so the spread is real — e.g. one starts from
  the leader's fears, one from the organisation's learning rate, one from what the leader will
  be asked to decide in 2027, one from A101's existing Big Ideas and weaves outward. Each writes
  `curriculum/module-design/a101-story-proposals/<bias-slug>.md`: the learning-set in the
  rubric's own shape (question carried · planted / complicated / paid off across the seven
  modules · governor · counter-voice · what it says about the future), plus which existing A101
  beats it keeps and which it would cut. Proposals do not edit curriculum.
- **Implementation** — per module, one agent per module file group after Antti's pick, on a
  branch; the judge re-runs after each tranche.

## Loop contract

The iteration the goal-loop runs, in order; each pass through 4–5 is one iteration.

1. **Step 0** calibration run (above), once. Its evidence output doubles as the gap statement the
   creative pass works against. Judge fails to see the gap → iterate the RUBRIC, not the content.
2. **Diverge**, once per brief. Parallel creative agents (3-ish), each proposing one complete
   set of big learnings for A101 (a handful, braided): for each, the one-line question the
   student carries, where it is planted, complicated and paid off across the eight modules, its
   governor, its counter-voice, and what it says about the future. Written to disk, one file per
   proposal, per the orchestrator pattern. Constraints below travel with the dispatch.
3. **STOP: Antti picks** (or blends, or rejects the lot; rejection = sharpen the brief and
   redispatch). Nothing student-facing moves before this call.
4. **Implement** the chosen set module by module, on a branch (`main` is the shared KB; Antti
   merges). Approval gate per root CLAUDE.md §Approval gate: student-facing body text carrying a
   decision Antti has not made = card; the picked story-set counts as his called direction, so
   edits that execute it apply directly.
5. **Re-run the judge** after each implemented tranche. Verdict worsens on any factor → revert
   that tranche before proceeding; the judge's evidence quotes are the next iteration's punch list.

**Stop conditions:** definition of done holds (§ Measurement) → wind down and report. Blocked on
step 3 or an Open decision → card it and idle, do not route around the gate. Two consecutive
iterations with no factor movement → stop and report the stall rather than thrashing prose.

## Constraints for the creative pass (travel with the dispatch)

- Audience is the builder leader (CEO/CTO/SVP), psychographic per root CLAUDE.md. Their future
  story is organisational — learning rate, owning the transformation — not the engineer's inner
  loop. AE101's spine question is "how do I trust work I didn't watch"; A101's learnings must
  carry that leader's questions, whatever the creative pass decides they are.
- Do not port AE101's learnings, figures, or axioms. The audience-fit gate punishes it.
- Vocabulary per `curriculum/vocabulary.md`; content rules load at generation time as usual;
  `check_strategy_tie_in.md` surface applies (Big Idea / mood contract per module).
- Runtime contract differs (Cowork + training directory, per A101's `training-architecture.md`) —
  a story beat that assumes a real repo or worktrees is wrong here.
- Proposals state where existing A101 beats survive: the current Big Ideas are assets to weave,
  not debris to clear (`feedback_curriculum_default_move_is_cut.md` still binds at implementation).

## Open decisions (Antti)

- Does the future-thread need sourced witnesses like AE101's (backing blocks land in A101 as part
  of this effort), or is the leader-facing future told house-voice only? This decides whether
  *self-challenging* gates A101 at AE101's bar or a deliberately lighter one.
- Whether the judge, once stable, wires into the board/gates or stays an on-demand instrument.

<!-- /maintainer -->
