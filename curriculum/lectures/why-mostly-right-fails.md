# Why mostly right fails

Claude can sound the same when it is right, wrong, or guessing. Fluency is not evidence. Confidence is not correctness. That is why the team does not ask *"does this look good?"* The team asks *"which claims can we ground, and which ones stay open?"*

## Fifty claims is enough

A two-page answer can carry fifty factual claims without feeling long. If ten percent are wrong or unsupported, that is five bad claims inside a document that still feels mostly useful.

Five bad claims is enough. One wrong licensing statement. One stale connector capability. One confident data-handling line that the contract does not support. One rollout recommendation based on a source nobody can find. One user instruction that sounds helpful and sends people the wrong way.

The problem is not that the whole answer is bad. The problem is that the bad parts hide inside the useful parts.

## Steps compound

Now stretch the same idea across a workflow.

If a single step were 85 percent reliable, that would sound acceptable. But ten unverified steps in a row at 85 percent each would land near 20 percent end-to-end. The numbers are an illustration, not a measurement; the compounding is what holds.

Retrieval, summary, synthesis, rewrite, citation, policy interpretation, recommendation, formatting, handoff, user action. Ten steps is not exotic. It is a normal day once agents start doing real work.

Mostly right at each step can become unreliable by the end.

## Checks compound too

The answer is not panic. The answer is a check.

If a check catches 90 percent of the bad claims, the remaining error shrinks fast:

- 10 percent wrong becomes 1 percent
- 1 percent becomes 0.1 percent
- 0.1 percent becomes 0.01 percent

The same compounding that hurts unchecked workflows helps checked workflows. That is the move: do not trust the first pass, and do not ask humans to hold all fifty claims in their heads. Turn the check into a system.

## Today's two checks

You will use two methods.

**Source support** asks: does a source actually support this claim?

**Counter-evidence** asks: is there evidence that contradicts, weakens, dates, or narrows this claim?

One finds claims floating with no ground. The other finds claims that look grounded until a second source pushes back.

The team is not trying to prove Claude safe or unsafe. The team is learning which checks catch useful wrongness, then writing that method into the system so future sessions use it again.

<!-- maintainer -->

**Lecture meta:** *6-minute mini-lecture for Claude Basics Module 2. Short concept beat before the M2 exercise. Borrowed from Agents 101 M5's groundedness lecture, compressed for Claude Basics. Do not expand into the full four-detector benchmark frame.*

**Family-A alignment (2026-07-02):** the compounding passage is a worded subjunctive illustration labeled "an illustration, not a measurement"; the `0.85^10 ≈ 0.20` notation line was dropped (`theory-audit.md` § Family A). Zombie-stat guard: do not re-promote the constant to a measured figure or re-add notation.

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Homework: build and verify*
