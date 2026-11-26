# Evals as Steering

Ethan Mollick's *The Bitter Lesson versus The Garbage Can* asks a question. The bitter lesson may apply to companies: define the outcome, give the agent examples and feedback, and let it find its own path. Or the garbage can wins, and the path carries the organisation.

You can stay inside one loop. You cannot stay inside all of them. Evals write down what good means so the system keeps applying it when you are not in the chair.

Evals turn checks into a loop: the model generates, the judge checks, the tactic changes, the next session starts sharper.

## Module 5 turned judgment into a judge

One briefing, thirty claims, four detectors, one scorer: the scoreboard named which method caught the misses. The winner is saved as `judges/groundedness-judge.md`, measured judgment made runnable. That is the first kind of eval.

[Groundedness protects the floor](slides/groundedness-protects-the-floor.md)

[Steering raises the ceiling](slides/steering-raises-the-ceiling.md)

## Three rounds, nobody editing

The Module 5 judge goes into a loop.

Round 1 produces a briefing. The judge scores it and writes per-claim feedback. The main session rewrites `./generation-tactic.md` from the feedback. Rounds 2 and 3 run with the sharper tactic, and the score rises with nobody editing.

Walk away. On return, the notes show each round's score and what changed. The judge stayed fixed, so the rise is the work getting better.

## The answer is never "the eval passed"

**What would have to be true for this eval to be the right one?**

The eval checks the thing that matters, at the moment where the mistake would hurt, against a standard you would defend. You decide which details the system must never miss.

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (writing@78d17fc9 story@78d17fc9 technical@78d17fc9 behavior@725101ec pedagogy@78d17fc9 strategy@78d17fc9 slides@78d17fc9)
- judges @78d17fc9: writing PASS, story PASS (1 finding see instances/agents-101--lecture--evals-as-steering.story.json), technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Time:** 12 minutes.

**Placement:** Opening lecture for Agents 101 Module 6, after the Bitter Lesson / Garbage Can Connections question and before `eval-loop.md`.

**Strategic role:** Leads with the exact M6 frame: humans will not cope with all the detail very soon, so evals become the way human judgment stays in the loop without the human inspecting every output.

**Story blend, M6 headers (2026-09-23).** The slide headers are the ones in `module-design/a101-story-proposals/blend.md` § Titles, M6, with two points that bind. The floor and ceiling beats are one slide each, which is what the pair costs when both halves are named. The closing slide is `## The answer is never "the eval passed"` and not the blend's *Will the bitter lesson apply here?*: the bitter-lesson question is the lecture's opening, the closer holds a different question, and a header asserts what its own body supports (`check_lectures.md` §4). Shared file: `trainings/agentic-engineering-101/run-the-first-experiment.md` names this lecture only inside a source stamp that delegates the Mollick check, so nothing on the AE101 side reads these headers.

**Mood target:** Module 6's lift. The student should feel the loop as relief plus expanded responsibility: the machine can crunch, but the human must choose the yardstick.
