# Evals as Steering

Ethan Mollick's *The Bitter Lesson versus The Garbage Can* asks a question.

The bitter lesson may apply to companies: define the outcome, give the agent examples and feedback, and let it find its own path.

Or the garbage can wins, and the path carries the organisation.

Humans will not cope with all the detail for long. You can stay inside one loop. You cannot stay inside all of them.

Evals write down what good means so the system keeps applying it when you are not in the chair.

Evals turn checks into a loop: the model generates, the judge checks, the tactic changes, the next session starts sharper.

## Module 5 turned judgment into a judge

You set up a benchmark: one briefing, thirty claims, four detectors, one scorer. The same claim pool went through the same evidence, and the scoreboard named which method caught the misses.

You saved the winner as `judges/groundedness-judge.md`: measured judgment, made runnable. That is the first kind of eval.

[Groundedness protects the floor](slides/groundedness-protects-the-floor.md)

[Steering raises the ceiling](slides/steering-raises-the-ceiling.md)

## A yardstick you rewrite is not a yardstick

You put the judge from Module 5 into a loop. The judge stays fixed. The generator changes.

Round 1 produces a briefing. The judge scores it and writes per-claim feedback. The main session reads the feedback and rewrites `./generation-tactic.md`. Rounds 2 and 3 run under the same judge with the sharper tactic.

You walk away. When you come back, the notes list which claims were flagged, which tactic rules were added, whether the score improved, and whether the judge file stayed byte-identical.

If the judge moved, the score means nothing. If the generator improved under the same judge, the loop worked.

## The answer is never "the eval passed"

**What would have to be true for this eval to be the right one?**

The answer is never "the eval passed."

The eval checks the thing that matters, at the moment where the mistake would hurt, against a standard you would defend.

You decide which details the system must never miss.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Time:** 12 minutes.

**Placement:** Opening lecture for Agents 101 Module 6, after the Bitter Lesson / Garbage Can Connections question and before `eval-loop.md`.

**Strategic role:** Leads with the exact M6 frame: humans will not cope with all the detail very soon, so evals become the way human judgment stays in the loop without the human inspecting every output.

**Story blend, M6 headers (2026-09-23).** The slide headers are the ones in `module-design/a101-story-proposals/blend.md` § Titles, M6, with two points that bind. The floor and ceiling beats are one slide each, which is what the pair costs when both halves are named. The closing slide is `## The answer is never "the eval passed"` and not the blend's *Will the bitter lesson apply here?*: the bitter-lesson question is the lecture's opening, the closer holds a different question, and a header asserts what its own body supports (`check_lectures.md` §4). Shared file: `trainings/agentic-engineering-101/run-the-first-experiment.md` names this lecture only inside a source stamp that delegates the Mollick check, so nothing on the AE101 side reads these headers.

**Mood target:** Module 6's lift. The student should feel the loop as relief plus expanded responsibility: the machine can crunch, but the human must choose the yardstick.
