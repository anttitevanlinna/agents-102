# Evals as Steering

Ethan Mollick asks a useful question in *The Bitter Lesson versus The Garbage Can*.

Maybe the bitter lesson applies to companies too. Maybe we should stop trying to map every messy process and define the outcome instead. Give the agent enough examples of good work, enough feedback, enough compute, and let it find its own path through the mess.

Or maybe the garbage can wins. Maybe companies are too tangled: politics, half-written rules, old systems, local exceptions, informal trust, workarounds nobody remembers choosing. Maybe the path matters because the path carries the organisation.

We are about to find out.

But one thing is already clear: humans will not cope with all the detail for very long.

At the current pace, people cannot continuously inspect every briefing, source, claim, update, generated mail, and agent action. You can stay inside one loop. You cannot stay inside all of them.

That is why evals matter.

Not because evals are tests for AI output. That is too small.

Evals are how you write down what good means so the system can keep applying it when you are not in the chair.

In the full agent picture, evals turn checks into a loop. The model generates, the judge checks, the tactic changes, and the next session starts from a sharper place.

## Module 5 turned judgment into a judge

You did not hunt for every bad claim by hand.

You set up a benchmark. One briefing. Thirty claims. Four detectors. One scorer.

The point was not that any detector sounded clever. The point was that the same claim pool went through the same evidence set, and the scoreboard named which method actually caught the misses.

Then you saved the winner as `judges/groundedness-judge.md`.

That judge was not magic. It was measured judgment, made runnable.

That is the first kind of eval.

[Groundedness protects the floor](slides/groundedness-protects-the-floor.md)

[Steering raises the ceiling](slides/steering-raises-the-ceiling.md)

## A yardstick you rewrite is not a yardstick

One exercise.

You take the judge from Module 5 and put it into a loop. The judge stays fixed. The generator changes.

Round 1 produces a briefing. The judge scores it and writes per-claim feedback. The main session reads the feedback and rewrites `./generation-tactic.md`. Round 2 runs under the same judge, with the sharper tactic. Then Round 3.

You walk away.

When you come back, the notes tell you what changed: which claims were flagged, which tactic rules were added, whether the score improved, and whether the judge file stayed byte-identical.

That last line matters. If the judge moved, the score means nothing. A yardstick you rewrite is not a yardstick.

If the generator improved under the same judge, the loop worked.

That is the bitter lesson made practical for one small slice of work: define the outcome, hold the yardstick still, let the system search for a better path.

And the garbage can is still there. Your sources may be thin. Your memory may be wrong. Your policy may block a file. Your organisation may care about dimensions your judge does not see yet.

Good. That is not a reason to avoid the loop. That is what the loop is for.

## The answer is never "the eval passed"

As the loop runs, hold one question:

**What would have to be true for this eval to be the right one?**

The answer is never "the eval passed."

The answer is: the eval checks the thing that matters, at the moment where the mistake would hurt, against a standard you would defend.

Module 6 is not about making a better checker.

It is about the human role changing.

You stop being the person who catches every detail.

You become the person who decides which details the system must never miss.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Time:** 12 minutes.

**Placement:** Opening lecture for Agents 101 Module 6, after the Bitter Lesson / Garbage Can Connections question and before `eval-loop.md`.

**Strategic role:** Leads with the exact M6 frame: humans will not cope with all the detail very soon, so evals become the way human judgment stays in the loop without the human inspecting every output.

**Story blend, M6 headers (2026-09-23).** The slide headers are the ones in `module-design/a101-story-proposals/blend.md` § Titles, M6, with two points that bind. The floor and ceiling beats are one slide each, which is what the pair costs when both halves are named. The closing slide is `## The answer is never "the eval passed"` and not the blend's *Will the bitter lesson apply here?*: the bitter-lesson question is the lecture's opening, the closer holds a different question, and a header asserts what its own body supports (`check_lectures.md` §4). Shared file: `trainings/agentic-engineering-101/run-the-first-experiment.md` names this lecture only inside a source stamp that delegates the Mollick check, so nothing on the AE101 side reads these headers.

**Mood target:** Module 6's lift. The student should feel the loop as relief plus expanded responsibility: the machine can crunch, but the human must choose the yardstick.
