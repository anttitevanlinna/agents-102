# Evaluations

## Big Idea
The eval that ran once in M5 now runs on every output, and sharpens itself. Two loops compound: generation tightens under eval pressure, and the eval tightens from watching what slipped past. You walk away. You come back to a sharper judge than the one you left.

## Meta
- **Prework:** Ethan Mollick, "Garbage Can and Bitter Lesson". Also read the still-uncertain line you wrote in M5 (the thing you flagged a grounded briefing still couldn't reach). That's M6's starting point.
- **Homework:** Chip Huyen *AI Engineering*, evals chapter (candidate)

## What You'll Learn
After this module, you will be able to:
- **Construct** a self-improving eval loop: one Claude session directs the work, two generation tracks run in parallel, the judge from M5 scores each, a second agent watches for what the judge missed and rewrites the judge's rules between rounds
- **Evaluate** how a judge changes across rounds by reading the rule diffs and meta-agent reasoning
- **Create** eval infrastructure that keeps learning from its own misses: on disk, re-runnable, sharper each cycle
- **Distinguish** the one-off judge you picked in M5 from one that runs on every output and gets sharper over time

## Connections
In Module 5 you picked a winner out of five detectors. You watched it work. You trusted it. Good. That judge sits in your judges folder. The thing you'll feed it now is the thing that changes.

The question shifts at M6. What if the judge kept getting better, not because you edited it, but because it watched itself miss things? What if *you weren't in the room* while that happened?

[Lecture: Evals as steering](lectures/evals-as-steering.md)

[Exercise: The eval loop runs itself](exercises/eval-loop.md)

## Key Concepts (Emergent)
- **Eval as infrastructure.** The judge moves from object to live machinery. It's not inspected, it's watched.
- **Two loops compounding.** One loop scores output; the other loop scores the scorer. Each round, both sides tighten.
- **Walk-away autonomy.** The first true leave-the-chair moment. The system runs; you come back to a dashboard.
- **The eval gets smarter by watching what slipped past.** Not by being edited. By observing its own misses and proposing rule changes the meta-agent applies.
- **Orchestrator pattern.** One session directs parallel tracks. The shape the student recognizes from Module 3's fan-out, now running a quality discipline instead of a content discipline.

## Debrief

Five minutes. Claude reviews the eval loop's run and sharpens the judge's prompt (the same judge the meta-agent has been editing all module). The evidence is the round-by-round diff trail: what the meta-agent changed, what it under-flagged, what it missed. Claude reviews, rewrites the groundedness judge file in place, reports what changed. You push back on anything that's off.

**Prompt** *(Claude Code)*

```
Review this session and sharpen the judge beyond what the meta-agent reached. Read judges/groundedness-judge.md in its current state, then scan module-6/rounds/ (every round's generation + judge output + rule diffs) and the meta-agent's reasoning trail. Look back over the session: which rule change did the meta-agent get right, which one made the judge worse and got reverted (or should have), what specific boundary case did the loop never test, where did the judge mis-rate in the same way across multiple rounds (a stuck bias the meta-agent kept missing), what did the judge under-flag that you caught by eye?

Then rewrite judges/groundedness-judge.md. Integrate, don't append. Add the rule the loop never reached, sharpen a rule the meta-agent softened, remove a rule that turned out to fire on the wrong thing. The judge is infrastructure now. Every rule should name the failure class it catches. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why, grounded in specific rounds. Name one boundary case the next run should test.
```


Read Claude's summary. Push back where it's wrong. *"The meta-agent was right to soften that rule, put it back"* / *"you added a rule the loop already had in round 2."* The artifact: the sharpened groundedness judge file plus one line added to the M6 eval-notes file naming the first always-on eval you'll run when work resumes. This is the module's thesis made literal. The judge got sharper across rounds by watching itself; you just did another pass, and the next run the meta-agent will keep going without you.

## Bridge
You just built an eval that improves itself. Who else on your team would want any of this?

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Create
- **Materials (trainer):** `judges/groundedness-judge.md` handoff from Module 5's benchmark winner. Loop-coordinator reference prompt. Pre-flight capability check on long-running session + parallel tracks + meta-agent edit-and-apply.
- **Plug points:** the topic for the two generation tracks (defaults to the Module 3 system's primary output); convergence threshold (default 90% claim-level agreement).

**Plug Points (trainer):**
- **Topic for the two generation tracks.** Default: the Module 3 system's primary output. The student has been working this memory all week; the eval loop bites on real material.
- **Convergence threshold.** Default 90% claim-level agreement between the two tracks. Regulated-industry cohorts push to 95%+.
- **Walk-away duration.** Default 25-30 min. Compressed variants trim to 15 min + 2 rounds; note this costs some of the mood.

**Mood contract:** unleashed leverage — *"we can automate the loop."* The walk-away window + dashboard-on-return are load-bearing. Do not let the student sit through the whole run.

**Supersedes:** the previous M6 split across `groundedness-eval.md` (manual convergence loop) and `steering-eval.md` (preference encoding). The manual convergence loop violated the "agents do the heavy lifting" rule from M2 onward — fed judge output back to generator by hand. The new exercise automates both loops.

**Disposition of old exercise files:**
- `curriculum/exercises/groundedness-eval.md` — superseded. Not referenced from any Bootstrap module. Kept on disk as historical reference; add a one-line header redirect to `eval-loop.md` on next pass.
- `curriculum/exercises/steering-eval.md` — kept as supplementary. Useful for mid-management variants, executive-briefing demos, or a second-day deep-dive. The steering dimension (encoding preference, not correctness) is still a real move; facilitators can fold a 5-minute framing into Debrief question 1 ("what should be an eval that runs every time?") when the room wants to go there without running a second full exercise.

**Why one exercise, not two:** M6 is one of Bootstrap's three magic beats (M3, M6, M8). Splitting focus across two exercises dilutes the magic. The eval loop exercise carries both disciplines — convergence happens in the scoring, steering happens in what the judge's rules come to encode across rounds. The student ends with an infrastructure-grade judge that's both groundedness-aware AND reflects the kinds of misses that matter to their own material.

**Capability checks owed (before first delivery):** see `exercises/eval-loop.md` maintainer section — long-running single session, parallel subagent dispatch, file-write reliability, meta-agent actually applying edits, walk-away duration realism.

**Source-verification owed (pre-first-cohort):**
- Ethan Mollick, "Garbage Can and Bitter Lesson" — add URL to the One Useful Thing post.
- Chip Huyen *AI Engineering* evals chapter — add publisher URL once chapter selection is finalised.
- LLM-as-judge canonical reference (Zheng et al., MT-Bench 2023) — maintainer-only cite for facilitator prep if asked in-room where the term comes from.

**Dependency on M5:** hard. `judges/groundedness-judge.md` must exist on disk as the benchmark winner before this module runs. M5's facilitator closing must name the handoff: *"That judge you just picked — tomorrow it becomes infrastructure."*
