# Every Inc — Compound Engineering at Scale of 10

**Type:** Born AI-native | **Size:** ~10 people, 5 products | **Evidence:** Signal → moderate
**Key sources:** [current Compound Engineering implementation](https://github.com/EveryInc/compound-engineering-plugin), [Dan Shipper and Kieran Klaassen](https://every.to/source-code/compound-engineering-how-every-codes-with-agents), [Will Larson's Imprint implementation](https://lethain.com/everyinc-compound-engineering/)

---

## How They Work

- **~10 people, 5 products.** Each product run by approximately 1 person.
- **Compound engineering methodology:** completed work returns durable, non-obvious reasoning to a store that later planning reads. The current plugin writes qualifying learnings to `docs/solutions/`; instruction files provide discoverability rather than holding every learning.
- **Claim:** 1 developer ≈ 5 developers output.
- **Will Larson (Imprint):** Independently validated compound engineering as "not shocking but extremely effective."

## The Compound Step

What distinguishes this from "person uses AI to code faster":
- `ce-compound` can inspect current and selected historical coding sessions, then capture one verified learning into `docs/solutions/` when the final code, tests, or existing docs do not already preserve it.
- Later ideation and planning read that store; the return edge is invocation-driven, not ambient memory in every arbitrary session.
- `ce-compound-refresh` now maintains the store through Keep, Update, Consolidate, Replace, Delete, and stale-marking outcomes. Ambiguous cases keep a human judgment path.
- Contradictions outrank ordinary drift. If independently supported guidance conflicts with current code, the refresh skill preserves the guidance and reports a possible product regression; it does not silently make the implementation the truth. Ambiguous unattended conflicts become explicitly stale.
- Non-interactive capture may write the solution store, but does not silently edit `AGENTS.md` or `CLAUDE.md`.

## The Role Blur

When AI handles implementation, the remaining human work blurs PM + UX + Engineering into a generalist **"Product Engineer"** role. One person holds product vision, user experience sense, and technical oversight — because AI handles the execution of all three.

## What Transfers

- **Compound engineering** as a named, repeatable pattern
- The **product engineer** role as what happens when full-stack becomes real
- Evidence that **1-person-per-product** is viable at small scale with AI

## Limitations

- Extremely small company — scaling dynamics don't apply
- Media/software products (well-scoped, specification-friendly)
- Survivorship bias risk (successful founder writing about his success)
- No evidence for teams >5 people using this approach
- No controlled evidence that a captured learning improves a comparable later task without regressions

## Key Insight

**The return edge is the contribution, and ambiguity is a retained state.** Every has operationalized capture, historical-session search, later retrieval, knowledge retirement, and conservative conflict handling. That proves a maintainable learning substrate can be built from files and Git; it does not yet prove that each captured item improves later behavior or solve multi-team policy arbitration.

---

*Last updated: September 2026*
