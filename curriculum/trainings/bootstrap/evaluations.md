# Evaluations

## Big Idea
The eval is infrastructure, not an artifact. Two loops compound: generation sharpens under eval pressure, and the eval sharpens from watching what slipped past.

## Meta
- **Primary Bloom's level:** Create
- **Prework:** Ethan Mollick — "Garbage Can and Bitter Lesson". Also read your `module-5/still-uncertain.md` line from yesterday — the thing you flagged a grounded briefing still couldn't reach. That's today's starting point.
- **Homework:** Chip Huyen *AI Engineering*, evals chapter (candidate)
- **Materials (trainer):** `judges/groundedness-judge.md` handoff from Module 5's bake-off winner. Loop-coordinator reference prompt. Pre-flight capability check on long-running session + parallel tracks + meta-agent edit-and-apply.
- **Plug points:** the topic for the two generation tracks (defaults to the Module 3 system's primary output); convergence threshold (default 90% claim-level agreement).

## What You'll Learn
After this module, you will be able to:
- **Construct** a self-improving eval loop — a coordinator Claude, parallel generation, a judge, a meta-agent, applied rule edits
- **Evaluate** how a judge changes across rounds by reading the rule diffs and meta-agent reasoning
- **Create** eval infrastructure that keeps learning from its own misses — on disk, re-runnable, sharper each cycle
- **Distinguish** an eval-as-artifact (Module 5) from an eval-as-infrastructure (Module 6)

## Connections
In Module 5 you picked a winner out of four judges. You watched it work. You trusted it. Good. That judge sits at `judges/groundedness-judge.md` — the thing you'll feed it, today, is the thing that changes.

Today the question shifts. What if the judge kept getting better — not because you edited it, but because it watched itself miss things? What if *you weren't in the room* while that happened?

## Lectures

[Lecture: Evals as steering](lectures/evals-as-steering.md)

## Exercises

[Exercise: The eval loop runs itself](exercises/eval-loop.md)

## Key Concepts (Emergent)
- **Eval as infrastructure.** The judge moves from object to live machinery — it's not inspected, it's watched.
- **Two loops compounding.** One loop scores output; the other loop scores the scorer. Each round, both sides tighten.
- **Walk-away autonomy.** The first true leave-the-chair moment. The system runs; you come back to a dashboard.
- **The eval gets smarter by watching what slipped past.** Not by being edited — by observing its own misses and proposing rule changes the meta-agent applies.
- **Orchestrator pattern.** One session directs parallel tracks. The shape the student recognizes from Module 3's fan-out, now running a quality discipline instead of a content discipline.

## Plug Points
- **Topic for the two generation tracks.** Default: the Module 3 system's primary output. The student has been working this brain all week; the eval loop bites on real material.
- **Convergence threshold.** Default 90% claim-level agreement between the two tracks. Regulated-industry cohorts push to 95%+.
- **Walk-away duration.** Default 25-30 min. Compressed variants trim to 15 min + 2 rounds; note this costs some of the mood.

## Debrief

~5-minute personal retro run WITH Claude via a pasted prompt. Three questions, shifted to this module's discipline:

1. **What should be an eval that runs every time?** — Name one quality check you've been running manually that belongs on the loop. The whole training has been training your eye; which judgment is ready to leave your eye?
2. **Where did the judge improve most?** — Open the judge-diff files. Which rule change did the meta-agent get right, and which one do you disagree with? The disagreement is the next iteration.
3. **What's Monday's first always-on eval?** — Not the most important one. The first one. Smallest thing you'd put on a loop tomorrow. Where is it, what does it score, who needs to see the output?

Produces a one-line addition to `module-6/eval-notes.md` naming the Monday loop.

## Bridge
You just built an eval that improves itself. Who else on your team would want any of this?

<!-- maintainer -->

**Mood contract:** unleashed leverage — *"we can automate the loop."* The walk-away window + dashboard-on-return are load-bearing. Do not let the student sit through the whole run.

**Supersedes:** the previous M6 split across `groundedness-eval.md` (manual convergence loop) and `steering-eval.md` (preference encoding). The manual convergence loop violated the "agents do the heavy lifting" rule from M2 onward — fed judge output back to generator by hand. The new exercise automates both loops.

**Disposition of old exercise files:**
- `curriculum/exercises/groundedness-eval.md` — superseded. Not referenced from any Bootstrap module. Kept on disk as historical reference; add a one-line header redirect to `eval-loop.md` on next pass.
- `curriculum/exercises/steering-eval.md` — kept as supplementary. Useful for mid-management variants, executive-briefing demos, or a second-day deep-dive. The steering dimension (encoding preference, not correctness) is still a real move; facilitators can fold a 5-minute framing into Debrief question 1 ("what should be an eval that runs every time?") when the room wants to go there without running a second full exercise.

**Why one exercise, not two:** M6 is one of Bootstrap's three magic beats (M3, M6, M8). Splitting focus across two exercises dilutes the magic. The eval loop exercise carries both disciplines — convergence happens in the scoring, steering happens in what the judge's rules come to encode across rounds. The student ends with an infrastructure-grade judge that's both groundedness-aware AND reflects the kinds of misses that matter to their own material.

**Capability checks owed (before first delivery):** see `exercises/eval-loop.md` maintainer section — long-running single session, parallel subagent dispatch, file-write reliability, meta-agent actually applying edits, walk-away duration realism.

**Dependency on M5:** hard. `judges/groundedness-judge.md` must exist on disk as the bake-off winner before this module runs. M5's facilitator closing must name the handoff: *"That judge you just picked — tomorrow it becomes infrastructure."*
