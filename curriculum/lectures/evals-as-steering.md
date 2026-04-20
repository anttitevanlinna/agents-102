# Evals as Steering

**Time:** 10–12 minutes.

Module 5 was you as the eval.

You read your system's output. A name appeared that shouldn't have. A number was plausible but unsupported. A claim sounded right but had no source. Your domain knowledge did the work — you knew where the truth lived, and where the LLM was guessing. You tightened the guardrails. You regenerated. Most of the improvements held. Some tightened too much — you lost good output along with the bad.

That's a loop. With you as the judge.

Evals are that judgment written down so a machine can apply it. Or a colleague. Or future-you on Tuesday when you don't remember today's instinct.

So far, so familiar: *evals = tests for LLM output.* It's the framing you'll hear from most engineering blogs.

It's also a trap. If that's all evals are, they're quality control at best. A gate that catches broken things. Useful. Unambitious. And, for anyone trying to build something that stands out — *completely insufficient.*

## Two kinds of eval, one loop

The simple use: automate the Module 5 catch. Build a criterion that flags the fabrication patterns you found by hand. Maybe it's: every named person or company must appear in your source materials. Every number must trace to a file you loaded. Every claim must point to a citation. The criteria are whatever your eye caught. The eval just runs them for you.

Run: generate → eval → adjust → regenerate → ... until the output passes. The system converges on "correct enough."

This is a **convergence eval**. It gets you reliability. It doesn't get you differentiation.

The more interesting use: your agent produces content. Most of it is fine. Some of it is forgettable. A small fraction is actually worth sharing. What distinguishes the three?

Not correctness — all three might be correct. It's some other dimension. Brand voice. Strategic differentiation. Depth of insight. That dimension lives in your head as tacit preference.

Write it down.

An example: your brand voice is direct, not consultant-speak. The criterion is a judge that rates each paragraph against three reference sentences — one direct, one hedged, one McKinsey. Score 1-5. Regenerate anything below 3. Over a few iterations the system stops producing hedged middle-of-the-road copy. Not because the LLM changed. Because the system now has a criterion for the opposite.

That's a **steering eval**. It doesn't fix mistakes. It pushes output toward what matters.

Both kinds are loops. Both are criteria written down. The difference is what they steer TOWARD — correctness or preference.

Most first-time encounters assume evals are only the first kind. Module 6 is where you meet the second.

## The reliability floor, the differentiation ceiling

One number from Module 5 makes the case: 85% accuracy per step, ten steps, 20% end-to-end. Multi-step agents decay fast. Convergence evals earn their keep — they keep each step above the threshold.

But no amount of convergence work produces differentiation. A competitor running the same LLM with the same convergence criteria gets the same kind of correct-and-forgettable output. The differentiation comes from steering evals — the criteria that are specifically YOURS. Your brand. Your standard. Your taste.

Convergence = the floor. Steering = the ceiling.

## What you'll do in class

Three exercises, in this order.

First, you'll automate your Module 5 catch. Build a convergence eval. Run the loop. See what shakes out.

Second, you'll run a shared customer-case eval — one criterion, agreed with the sponsor, drawn from a real strategic concern of the company. One criterion. Many agents' outputs.

Third, you'll design your own steering eval. Not correctness. What matters to YOU. Brand voice. Differentiation. Depth. Whatever makes your initiative's output worth sharing rather than forgettable.

Then you'll run that criterion. And think hard about what it catches and what it misses.

## One question to hold

As you work through the exercises, hold this question:

**What would have to be true for these evals to be the right ones?**

Your criterion encodes a theory of what "good" means. The theory is a bet. Nobody (not us, not the AI labs, not your competitors) has the finished answer to what "good" looks like in your domain — the answer is being invented by whoever sits down and tries. Module 6 is the discipline of not just building the system, but thinking hard about whether the steering instrument is pointed the right way.

---

*Module 7 takes this further: your eval works for you. When your eval becomes your team's eval, what changes? That's trust at scale.*

<!-- maintainer -->

**TODO (from eval pass 2026-04-17 — APPROVE WITH TODOs, length judge failed):**
- Length undercooked (~520 vs 800–1200 target). Expansion candidates: (1) a worked micro-example of a convergence eval running once — what the judge output actually looks like; (2) a second steering-eval example from a different dimension (depth of insight or strategic differentiation, not just brand voice); (3) a paragraph on the LLM-as-judge mechanic — evals are usually run by other LLMs, and the lecture currently doesn't name this.
- "Reliability floor, differentiation ceiling" section is the best line in the piece and gets only six sentences — expand; tie more explicitly to Module 5's compound-reliability math so the math does double duty.
- Shared customer-case exercise setup: "one criterion, many outputs" divergence is the punchline but currently too weak — sharpen without spoiling the discovery.
