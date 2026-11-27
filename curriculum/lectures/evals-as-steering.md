# Evals as Steering

Ethan Mollick's *The Bitter Lesson versus The Garbage Can* sets two views side by side. In the first, you define the outcome, give the agent examples and feedback, and the agent finds its own path. In the second, a company runs on unwritten habits and workarounds, and those still decide what works.

You can check one agent's work yourself. You cannot check all of them. An eval writes down what good means, so the system keeps applying your standard when you are not there.

Put an eval in a loop and the work improves: the agent writes, the judge checks, the rules for writing change, and the next draft starts from better rules.

## Your judge is the first kind of eval

The judge you saved in Module 5 is the first kind of eval. You measured it once, and it can now check any briefing.

[Groundedness protects the floor](slides/groundedness-protects-the-floor.md)

[Steering raises the ceiling](slides/steering-raises-the-ceiling.md)

## Three rounds, nobody editing

The Module 5 judge goes into a loop.

In round 1 a helper agent writes a briefing. The judge scores the briefing and says what is wrong with each claim it flags. The main session turns that feedback into rules in `./generation-tactic.md`, the file the next writer follows. Rounds 2 and 3 start from the better rules, and the score improves with nobody editing.

You walk away. When you return, the notes show each round's score and what changed. The judge never changed, so a better score means a better briefing.

## The answer is never "the eval passed"

**What would have to be true for this eval to be the right one?**

The right eval checks the thing that matters, at the point where a mistake would hurt, against a standard you would defend. You decide which details the system must never miss.

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (writing@78d17fc9 story@78d17fc9 technical@78d17fc9 behavior@725101ec pedagogy@78d17fc9 strategy@78d17fc9 slides@78d17fc9)
- judges @78d17fc9: writing PASS, story PASS (1 finding see instances/agents-101--lecture--evals-as-steering.story.json), technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Time:** 12 minutes.

**Placement:** Opening lecture for Agents 101 Module 6, after the Bitter Lesson / Garbage Can Connections question and before `eval-loop.md`.

**Strategic role:** Leads with the exact M6 frame: humans will not cope with all the detail very soon, so evals become the way human judgment stays in the loop without the human inspecting every output.

**Story blend, M6 headers (2026-09-23).** The slide headers are the ones in `module-design/a101-story-proposals/blend.md` § Titles, M6, with two points that bind. The floor and ceiling beats are one slide each, which is what the pair costs when both halves are named. The closing slide is `## The answer is never "the eval passed"` and not the blend's *Will the bitter lesson apply here?*: the bitter-lesson question is the lecture's opening, the closer holds a different question, and a header asserts what its own body supports (`check_lectures.md` §4). Shared file: `trainings/agentic-engineering-101/run-the-first-experiment.md` names this lecture only inside a source stamp that delegates the Mollick check, so nothing on the AE101 side reads these headers.

**Mood target:** Module 6's lift. The student should feel the loop as relief plus expanded responsibility: the machine can crunch, but the human must choose the yardstick.
