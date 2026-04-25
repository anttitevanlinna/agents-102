# Source audit — "tests-written-from-plan" attribution to Klaassen

**Verdict: PARTIALLY VERIFIED — adjustment needed on framing, not on crediting.**

## What the curriculum currently claims

Three surfaces carry the attribution, with varying directness:

1. **`content-strategy-agentic-engineering-101.md` line 341** — *"carries Klaassen's 'tests are a planning output, not a post-hoc add-on' into the M5 re-send."* The quoted phrase is rendered as if Klaassen's own words.
2. **`push-back-on-the-plan.md`** (M2) — body teaches "a good plan names the tests before any code"; Klaassen is credited for **compound engineering** (plan-step-at-depth), not specifically for the tests-in-plan move.
3. **`diagnose-and-resend.md`** (M5) — teaches "Tests are a first-class part of the task spec… the plan makes this ordering explicit." No explicit Klaassen credit in the body (credit flows through the M4→M5 pre-reads and M5 closer lecture, which do cite him).

## What Klaassen actually says (verified)

**Source 1: *My AI Had Already Fixed the Code Before I Saw It*** [practitioner direct] — https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it

Verbatim relevant lines (fetched 2026-04-24):
- *"Write a test that checks if our tool catches it."*
- *"Claude writes the test. The test fails — the natural first step in test-driven development (TDD)."*
- *"I tell Claude to iterate on the frustration detection prompt until the test passes."*

This demonstrates test-first ordering in a concrete workflow and he names it as TDD himself. Freshness: within 6 months. Label: **[practitioner direct]**.

**Source 2: *Compound Engineering: The Definitive Guide*** [practitioner direct] — https://every.to/source-code/compound-engineering-the-definitive-guide

WebFetch found **no verbatim sentence** about tests-as-planning-output or tests-written-from-the-plan in this piece. The article teaches plan-as-markdown-artifact and the four-step loop; it does not specifically state that the plan specifies the tests.

**Source 3: Will Larson, *Learning from Every's Compound Engineering*** [practitioner analysis] — https://lethain.com/everyinc-compound-engineering/

Not re-fetched this pass; cited in OODA as corroborating plan-as-artifact, not the test-specification move specifically.

## The gap

The phrase **"tests are a planning output, not a post-hoc add-on"** is a clean, crisp formulation — but it is **Bosser's compression**, not Klaassen's sentence. What Klaassen demonstrably does:

- Practices TDD in a live agent workflow (named as TDD by him).
- Teaches plan-as-markdown-artifact that an agent or human can execute.

What he does **not** explicitly say in the checked sources: that the plan file is where the tests get specified. That connection — plan specifies the tests → agent writes tests first → then code — is a reasonable **synthesis** of two Klaassen moves, but it's synthesis, not citation.

Evidence level: **L2 single-case** for test-first-in-agent-loop (one concrete Cora example). Not L3 convergence on this specific combination. The broader TDD-with-agents pattern has other practitioners (Cherny, Ronacher on long-running) but the curriculum credits Klaassen as if he's the origin.

## Three gates check

1. Truly agentic? Yes — Klaassen's example is multi-step agent writing tests + iterating.
2. Independent evidence? L2 single case (Cora). Supporting, not convergent.
3. Specific outcome + URL? Yes, fresh, labeled.

## Adjustment (one-line change)

**`content-strategy-agentic-engineering-101.md` line 341 — replace the quoted attribution.**

Current:
> carries Klaassen's *"tests are a planning output, not a post-hoc add-on"* into the M5 re-send.

Proposed:
> carries forward Klaassen's test-first-in-agent-loop move (*"Claude writes the test. The test fails — the natural first step in test-driven development (TDD)"* — *[My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it)* [practitioner direct]) — reframed in our curriculum as "tests belong in the plan, not after the code."

This preserves credit, uses his actual verbatim, and signals clearly that the crisp aphorism is our reframing of his demonstrated practice — not a fabricated quote.

## Exercise-level status

- **`push-back-on-the-plan.md`** — no change needed. The body teaches the move generically; the Klaassen credit in the maintainer block is for compound engineering, which is correctly sourced. The tests-before-code sentence in the prompt is non-attributed pedagogy, fine.
- **`diagnose-and-resend.md`** — no change needed in the body. If any future Debrief or maintainer block quotes the "planning output" phrase, apply the same fix: attribute to Klaassen's TDD demonstration, not to a fabricated quote.

## Confirmation-bias guard

Actively looked for counter-evidence: searched the Definitive Guide for any test-planning language; found none. This argues AGAINST presenting the crisp phrase as Klaassen's. The fix is not to drop the attribution — he genuinely practices and demonstrates the move — but to stop putting our compression in his mouth.

## Sources
- [My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) [practitioner direct] — verifies TDD-in-agent-loop
- [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide) [practitioner direct] — does NOT verify tests-as-planning-output phrase
- Local OODA: `analytics/ooda-klaassen-curriculum.md` line 28 — also makes the plan→tests synthesis without direct quote
