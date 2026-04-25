# Exercise: *Steering* eval

**What you do:**

**Phase 1 — the worked example.** You start with a shared customer-case criterion — one eval, agreed with your sponsor, drawn from a real strategic concern of the company. Read it carefully. **This IS the template you'll adapt.** Notice the shape: named dimension, one-sentence definition, three reference examples (gold/present-but-weak/bad), clear scoring output.

Apply the criterion to your agent's output. Compare scores with your neighbor. Same criterion. Different output. Different scores. The divergence IS the data — one eval, many reads. That's the part most people miss about evals the first time they meet them: the eval doesn't tell you what's true. It tells you what's true *through a particular lens.* Change the lens, change the verdict.

**Phase 2 — design your own.** Open a recent piece of output from your agent — one that's correct but forgettable. Look at it. What's *missing*? Not what's wrong — what's missing. Those are different questions. Wrong is easy (citations, facts, typos). Missing is hard (brand voice, depth of insight, a specific framing you'd use, a stance). Missing is where differentiation lives.

Pick ONE dimension. Write it in a sentence.

Now adapt the template you just used. Copy the prompt below into Claude Code. It asks you for the four pieces it needs, then becomes your judge — no in-prompt editing.

```
Help me build a steering eval judge.

Ask me these things in turn:
1. The dimension I want to steer toward — one name.
2. What that dimension means — one sentence.
3. Three reference examples from my domain: one that scores 5 (gold), one that scores 3 (present but weak), one that scores 1 (what I don't want).

Once you have my answers, you are now a judge for that dimension. When I paste a paragraph from my agent's output, score it against the references. Return:
- Score 1-5
- One-sentence reason
- If 3 or lower: what's missing, in one sentence

Keep using the same criterion for every paragraph I paste after. Don't re-ask the setup questions.
```

Answer Claude's four questions. Then paste one of your agent's outputs. Get a score. Paste another. Paste five to ten.

Look at what it rates high, what it rates low.

**Phase 3 — iterate.** What did the judge PASS that you don't like? Your criterion is missing a dimension — add one. What did it FAIL that you liked? Your criterion is too strict or wrong-shaped — adjust. Rerun on the same outputs. See what changed.

Pair discussion: show your criterion and three reference examples to your neighbor. Can they understand what you're steering toward without further explanation? If they can't, your criterion isn't clear yet.

Before you close the exercise, write down one thing your current criterion MISSES that still matters. That's tomorrow's iteration.

**What happens:**

In the shared phase, scores diverge across different outputs. You learn the eval isn't "is this true?" — it's "is this the flavor?" Flavor reads differently across contexts.

In the design phase, your judge starts producing scores that align with your intuition — partially. Then you notice a gap: the judge scores something 5 that you'd score 3, or vice versa. That gap is the interesting data. The criterion is an assumption encoded; the iteration tests the assumption.

**The point:**

Evals don't check correctness. They encode preference. You just built a preference machine — yours. A competitor running the same LLM can't replicate it without knowing your taste in detail.

And: the criterion is an assumption. You'll adjust it tomorrow when you notice something today's version missed. That's the work. Not building evals once — running the loop on the evals themselves.

**Facilitator note:**

Watch for participants who pick a dimension too close to correctness ("accurate citations" is convergence, not steering). Ask: "What makes YOUR brand's accurate citation DIFFERENT from a competitor's? That's the steering dimension."

Watch for reference examples that are all 5s — the participant is describing the gold but can't articulate the bad. Ask for an example they'd reject from a vendor, and why. The "why" is the criterion.

Watch for criteria too vague to rate consistently — "insightful" without an anchor. Push for a measurable dimension with a clear reference point.

Decision points: if a participant is stuck past 8 minutes picking a dimension, offer four starters (brand voice, depth of insight, strategic differentiation, customer-oriented) and let them adapt one. If a participant has a working judge at 15 minutes, push them to iterate twice.

Pacing: 5–7 min shared-case warmup; 10–12 min design; 8–10 min iterate + pair discuss. Leave room for banter — the conversation is where the learning consolidates.

**Time:** 25–30 minutes. Banter welcomed and expected.

<!-- maintainer -->

**TODO (sharpening suggestions, APPROVE verdict — 2026-04-17):**
- "Divergence IS the data — one eval, many reads" is strong but buried in Phase 1 prose — isolate as its own beat.
- "Write down one thing your criterion MISSES" is present in Phase 3's flow — promote to a labeled closing beat to harden the third leap-test outcome.

**Applied in pass 3:**
- Scaffold rewritten as conversational prompt (no mid-prompt placeholders) per new prompt-design rules in `curriculum/CLAUDE.md`.
- Score 3 label now "present but weak" (was "OK — acceptable but forgettable") — generalizes to non-brand-voice dimensions.
