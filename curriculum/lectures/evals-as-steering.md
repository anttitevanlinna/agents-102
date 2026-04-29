# Evals as Steering

**Time:** 10-12 minutes.

Ethan Mollick asks a useful question in *The Bitter Lesson versus The Garbage Can*.

Maybe the bitter lesson applies to companies too. Maybe we should stop trying to map every messy process and define the outcome instead. Give the agent enough examples of good work, enough feedback, enough compute, and let it find its own path through the mess.

Or maybe the garbage can wins. Maybe companies are too tangled: politics, half-written rules, old systems, local exceptions, informal trust, workarounds nobody remembers choosing. Maybe the path matters because the path carries the organisation.

We are about to find out.

But one thing is already clear: humans will not cope with all the detail for very long.

Not at the current pace. Not with every briefing, every source, every claim, every update, every generated mail, every agent action. You can stay inside one loop. You cannot stay inside all of them.

That is why evals matter.

Not because evals are tests for AI output. That is too small.

Evals are how you write down what good means so the system can keep applying it when you are not in the chair.

## Module 5 was you as the eval

You read your system's output. A name appeared that should not have. A number was plausible but unsupported. A claim sounded right but had no source.

Your domain knowledge did the work. You knew where the truth lived and where Claude was guessing.

Then you built the first version of a machine-readable version of that judgment. The benchmark produced a groundedness judge. It was not magic. It was your standard, made runnable.

That is the first kind of eval.

A groundedness eval protects the floor. Every named person or company must appear in the source material. Every number must trace to a file. Every claim must point to evidence or admit the gap.

It answers: is this attached to the ground?

Useful. Necessary. Not enough.

## The second kind

Imagine two internal mails.

Both are true. Both cite the right sources. Both avoid overclaiming.

One is forgettable. The other makes the reader act.

What changed?

Not groundedness. Something else.

Maybe the second mail is more executive-readable. Maybe it names the tradeoff. Maybe it is commercially sharper. Maybe it gives the decision-maker a clean next move. Maybe it sounds like your team instead of like a generic assistant trying to be helpful.

That dimension lives in your head right now. Or in the head of the best operator on your team. Or in the taste of the leader who keeps rewriting everyone else's drafts.

Write it down.

That is a steering eval.

It does not ask only whether the output avoided failure. It asks whether the output overperformed on the dimension that matters.

Groundedness protects the floor. Steering raises the ceiling.

Do not collapse them. A grounded mail can still be useless. A useful mail can still be ungrounded. You need both kinds of judgment if the system is going to earn more autonomy.

## What you build now

One exercise.

You take the judge from Module 5 and put it into a loop. The judge stays fixed. The generator changes.

Round 1 produces a briefing. The judge scores it and writes per-claim feedback. The orchestrator reads the feedback and rewrites the generator's strategy file. Round 2 runs under the same judge, with the sharper strategy. Then Round 3.

You walk away.

When you come back, the dashboard tells you what changed: which claims were flagged, which strategy rules were added, whether the score improved, and whether the judge file stayed byte-identical.

That last line matters. If the judge moved, the score means nothing. A yardstick you rewrite is not a yardstick.

If the generator improved under the same judge, the loop worked.

That is the bitter lesson made practical for one small slice of work: define the outcome, hold the yardstick still, let the system search for a better path.

And the garbage can is still there. Your sources may be thin. Your memory may be wrong. Your policy may block a file. Your organisation may care about dimensions your judge does not see yet.

Good. That is not a reason to avoid the loop. That is what the loop is for.

## The question to hold

As the loop runs, hold one question:

**What would have to be true for this eval to be the right one?**

The answer is never "the eval passed."

The answer is: the eval checks the thing that matters, at the moment where the mistake would hurt, against a standard you would defend.

Module 6 is not about making a better checker.

It is about the human role changing.

You stop being the person who catches every detail.

You become the person who decides which details the system must never miss.

<!-- maintainer -->

**Quality:** draft 2026-04-29

**Placement:** Opening lecture for Bootstrap Module 6, after the Bitter Lesson / Garbage Can Connections question and before `eval-loop.md`.

**Strategic role:** Leads with the exact M6 frame: humans will not cope with all the detail very soon, so evals become the way human judgment stays in the loop without the human inspecting every output.

**Mood target:** Module 6's lift. The student should feel the loop as relief plus expanded responsibility: the machine can crunch, but the human must choose the yardstick.
