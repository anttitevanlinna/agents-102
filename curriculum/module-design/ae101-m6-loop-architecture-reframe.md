# AE101 M6 — the loop-architecture reframe

**Status: proposal, not a decision.** Antti raised it 2026-08-28: frame M6 around quality, feedback
and loop architectures — closing the loop, reading past runs, double-loop compounding, the end-to-end
loop of the whole system — rather than around personal workflow discovery and skill-stacking.
Nothing student-facing is changed by this note. One decision (below) has to land before anything is.

---

## What M6 is today

Big Idea: *Every gap you found belongs somewhere durable, or you will find it again next week.*

Exercise Phase 1 diffs the un-packaged M4 run against the packaged M5 re-send, ranks the gaps, routes
each to memory / sharper verifier / new skill, and cuts one stale rule. Phase 2 scans
`~/.claude/projects/` across the stack, groups the work that recurs, and draws the top shapes as
mermaid. The close (`agents-that-build-agents`) turns the shapes into a handoff prompt that authors a
skill per shape. Product: a workflow inventory plus a kit-builder prompt.

## The reframe is mostly already shipped — in the lectures

The quality/feedback/loop material is in the module already, carried by the lecture chain:

- `quality-is-grounding` — the five-move quality arc (tests-first, plan push-back, skill, verifier,
  loop); *decay clears the gate* (costs that land in weeks, no check fires); grounding as human signal.
- `the-loop-has-a-name` — verifier / judge / gate as one eval primitive, placed anywhere there is a
  bar, scaling unchanged, running on cadence, surviving the model.
- `the-map-filled-in` — *you drew a control loop*; feedback control around a non-deterministic agent;
  verification is the sensor; a loop with no way to read its own result runs open.
- `composing-the-workflow` — checks and stop conditions at the seams; chaining generation without
  checks only moves work into the review queue faster.
- `agents-that-build-agents-handoff` already asks for *the check that fits* per shape.

So the frame is not new IP to invent. **The mismatch is that the lectures teach a control loop while
the exercise builds a workflow inventory.** The reframe's real content is bringing the exercise and
the module's Big Idea up to where the lecture chain already stands. That is a promotion of audited
material, not a rewrite — which is what makes it cheap.

## What the reframe genuinely adds

1. **Double-loop learning, named in body.** It currently exists only as `law:double-loop-learning` in
   the exercise's backing block. First loop = correct the run (M5: build a verifier, re-send). Second
   loop = correct the system that produced the run (M6: rules, checks, skills). Naming it earns the
   rule-cut beat: subtraction currently reads as hygiene (*rules files have a half-life*); under a
   double-loop frame it is a change to a governing variable, which is a different and better claim.
2. **Feedback sources, plural.** M6 today reads exactly one signal: two sessions of one task.
   `quality-is-grounding` asserts that every push-back and every correction is signal, then the module
   harvests none of it. The wider set the engineer already owns and never reads back — test failures,
   CI history, review comments, review latency, incidents, their own scrollback push-backs — is the
   highest-value addition here, and it is the part that is actually missing rather than mis-placed.
3. **Latency and placement as the design axis.** *Decay clears the gate* is already a feedback-latency
   argument; the module never turns it into a design move. Mapping each check by how fast it can say
   no, and where it sits relative to the producer, converts that lecture beat into something the
   student does.
4. **An artefact with a failure reading.** A workflow inventory cannot be wrong. A loop can: a leg with
   no check is open-loop, a check inside the producer's window is not independent (KC bullet 4 already
   says this), a lesson with no durable home is a loop that does not close. That gives Phase 2 a
   diagnosis where today it has a drawing.

## What it costs

- **Paperwork risk, and it is the serious one.** The mood target is practitioner fluency, with
  compliance-feel and paperwork-feel named as the mood-stealers. *Map your end-to-end quality loop* is
  one bad draft away from a box-filling diagram exercise, and it would take the module's ending with
  it. The defence is that every leg must come off the student's own disk evidence, never off a
  template — which is exactly what Phase 1 already does and must therefore keep doing.
- **The close is already overbooked.** Four closer lectures; the 2026-07-05 cut pass removed two beats
  to free ~20 min. Any loop-architecture beat replaces something. It does not append.
- **Arc collision on the word "quality."** M3 owns *trust is verification you can run without being
  there*; M5 owns the verifier build. A third quality-headline module blurs all three. M6's distinct
  property is the **second loop** — changing the system rather than the run. Frame on loop and
  feedback; let quality be the material, not the headline.
- **Slug stays.** `spot-gaps-build-the-loop` is referenced from ~28 files (scripts, manifests, flag
  names in `training-architecture.md` and `trainer-modules.md`, site MODULES, cross-module pointers in
  M5, `ironies-of-automation`, `the-map-filled-in`, the supplementaries). Rename the frame, not the
  identifier; the tab title is cheap, the slug is not.

## Recommended shape

Promotion plus one phase swap, not a rewrite.

- **Big Idea** moves from *gaps belong somewhere durable* to the second loop — the student has been
  building one loop the whole training and today sees all of it and finds where it does not close.
  Wording is Antti's; the line is the module's spine and should not arrive pre-written.
- **Phase 1 unchanged.** The two-run diff *is* the double-loop beat; it needs its name, not new work.
  It is also the empirical anchor that keeps the module off the whiteboard.
- **Phase 2 swaps its product.** Keep the stack scan as the input — it is how the legs are found — but
  the drawn artefact becomes the student's loop with its open legs marked, rather than an inventory of
  recurring shapes. Fold in the wider feedback sources here (item 2 above): what already tells this
  engineer they were wrong, and how late.
- **Close survives with one edit.** `agents-that-build-agents-handoff` reads *the shapes we just
  named*; it would read *the open legs we just found*, and author a check where the loop is open. That
  is arguably a stronger seed than a skill per recurring shape, and the prompt already asks for the
  check that fits.
- **Lecture chain unchanged.** `the-map-filled-in`'s control-loop slide becomes a payoff for the frame
  instead of a late reveal; watch it for duplication with a promoted Big Idea, but it does not need
  rewriting.

## The decision that has to land first

**Does M6 leave the student with a kit-builder (a skill per recurring shape) or a diagnosed loop (a
check per open leg)?** Both are defensible and they produce different Monday behaviour. The current
leap test, artefact contracts, and closing prompt are all built around the kit-builder. The reframe
points at the diagnosed loop. Everything else in this note is downstream of that call.

Secondary, once that lands: whether the wider feedback sources are a body beat or a prompt, given the
close's time budget.

## Blast radius if adopted

Module file (Big Idea, What You'll Learn, Key Concepts, leap test, artefact contracts, mood note),
`exercises/spot-gaps-build-the-loop.md` Phase 2, prompts `-study` / `-shapes` / `-primitives` /
`agents-that-build-agents-handoff`, the M6 tab in `trainer-modules.md`, the strategy doc's *M6 in
detail*, and a re-audit pass since every touched file is student-facing.

**Not yet run against the rule indices.** `memory/_index/` and the `check_*.md` compendiums live
outside this repo and were unavailable in the session that drafted this note, so the
`check_student_facing` / `check_pedagogy` / `check_lectures` load that advising on this surface owes
has not happened. Re-read this against them before any of it reaches student-facing body.
