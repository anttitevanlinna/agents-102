# Verification asymmetry

## Checking can cost far less than doing

- **Some tasks are far cheaper to check than to do.** Reviewing a diff against a failing test versus writing the feature. Checking a sudoku versus solving it. The gap between doing-cost and checking-cost is the asymmetry.
- **Some are the reverse.** A fact-dense report reads clean whether it is true or not; checking it costs as much as writing it. No asymmetry, no discount.
- **Jason Wei named the pattern: "some tasks are much easier to verify than to solve."** His corollary, the verifier's law: the ease of training AI to solve a task is proportional to how verifiable the task is, because a cheap check is exactly the feedback signal training and eval loops run on. His own example is code: tedious to read for correctness, fast to check when the test coverage is there.

## Why this decides what to delegate

- **Delegation pays where the check is cheap.** You hand over the making, keep the cheap checking, and the loop runs fast. The agent generates; you gate.
- **Where the check is expensive, delegation is a trap.** You saved the writing and bought a harder review. The full cost comes back to you at read time.
- **M2 used this without naming it: find is easier than judge.** The agent finds candidates; you judge them. That was the asymmetry in its smallest form, and it runs through the whole far half of the map.

## Every send-off needs a named cheap verifier

- **Before a send-off, ask: what is my cheap verifier here?** A failing test, a compiler, a diffable reference, a checklist a fresh session can run. If you can name one, the task is a delegation candidate.
- **No cheap verifier? Two options.** Keep the task, or build the verifier first and then delegate. Building the verifier is often the more valuable half of the work: it outlives the run it checks.
- **Every verifier you write converts one more task family from delegation-trap to delegation-win.** That is why gates are worth authoring at all.

<!-- maintainer -->

**STATUS:** slide-format draft (proper-length bullets per `theory-plan.md` § Slide format, grown from the 2026-07-02 skeleton same day), UNWIRED as in-room slot; linked as optional pre-read from `run-the-first-experiment.md § Pre-reads before Module 5`. No Quality line by design (unaudited). Tier-1 canon adoption per `theory-audit.md` (practitioner + syllabus lenses convergent; already enacted in M2 body as "find is easier than judge", `exercises/push-back-on-the-plan.md:39` — the body's M2 back-reference is deliberate lineage-naming, kept per the audit's cheap-groundedness call; supplementary surface, not a lecture body, so `check_lectures §3` sequencing ban doesn't bind, and the ref is backward-naming of a lived moment, not sequencing).

**Placement (proposed):** supplementary, linked from M4 (the send-off decision is where the asymmetry becomes a governor) or M5. Cross-links forward to `supplementary/backpressure.md` (gates) — the two pages are one economics: asymmetry says where gates are cheap, backpressure says what they buy.

**Laws carried:** verification-asymmetry / verifier's law · the delegation governor (cheap-verifier question). Sharpens convergence-triad's "independently verifiable" leg into a cost ratio (see audit — triad itself still owed a durable home). The triad, 0.85ⁿ, and principal–agent stay OUT of this page (M4-adjacent surface; packaging laws earn at M5).

**Source verification — MUST DO before first cohort:**
- `[checked:2026-07-02 result:OK due:2027-01-02]` https://www.jasonwei.net/blog/asymmetry-of-verification-and-verifiers-law — [practitioner direct] (Jason Wei, 2025-07-15; dated framework piece, not a freshness-bound evidence claim). Byline + both quoted formulations verified verbatim 2026-07-02; re-fetched 2026-07-02 during the proper-length pass to also confirm the coding example ("if you have test cases with ample coverage, you can quickly check any given solution") — the body's "his own example is code" bullet is scoped to exactly that; the post does NOT claim "coding fell to AI early", so the body doesn't either. fallback: teach the asymmetry unattributed as a field observation; drop "verifier's law" naming.
