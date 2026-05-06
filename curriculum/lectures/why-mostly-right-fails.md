# Why mostly right fails

**Time:** 6 minutes. Mini-lecture for Claude Basics Module 2.

Claude can sound the same when it is right, wrong, or guessing. Fluency is not evidence. Confidence is not correctness. That is why the team does not ask *"does this look good?"* The team asks *"which claims can we ground, and which ones stay open?"*

## Fifty claims is enough

A two-page answer can carry fifty factual claims without feeling long. If ten percent are wrong or unsupported, that is five bad claims inside a document that still feels mostly useful.

Five bad claims is enough. One wrong licensing statement. One stale connector capability. One confident data-handling line that the contract does not support. One rollout recommendation based on a source nobody can find. One user instruction that sounds helpful and sends people the wrong way.

The problem is not that the whole answer is bad. The problem is that the bad parts hide inside the useful parts.

## Steps compound

Now stretch the same idea across a workflow.

If a single step is 85 percent reliable, it sounds acceptable. But ten steps at 85 percent each is about 20 percent end-to-end reliability:

`0.85^10 ≈ 0.20`

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

**Time:** 6 minutes.

<!-- maintainer -->

**Quality:** draft 2026-04-29
- draft 2026-04-29 (new mini-lecture borrowing Agents 101 M5 reliability math for Claude Basics M2; sim/eval not run)

**Lecture meta:** *Short concept beat before the M2 exercise. Borrowed from Agents 101 M5's groundedness lecture, compressed for Claude Basics. Do not expand into the full four-detector benchmark frame.*

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Homework: build and verify*
