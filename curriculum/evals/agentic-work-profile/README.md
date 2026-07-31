# Agentic Work Profile — public measurement protocol

Canonical public package for AE101's day-30 (optional day-91) outcome measurement. The published protocol is the validity claim: a skeptical buyer can reproduce the method, walk backward from any score to the arithmetic and the transcript evidence behind it, or dispute a specific scoring decision.

**Status: specified, not yet built.** The full design lives in the private spec — `bosser-strategy:content-strategy-agentic-engineering-101.md` § *Outcome measurement* and § *Measurement model — the calibrated delegation frontier* — covering the self-report instrument (behaviour pairs, confidence, quality/security change ratings), the four episode states, the calibrated delegation frontier, blinded transcript judging, collection modes, and the GitHub-native collection reference implementation. This package is the public, runnable expression of that spec.

Target contents:

- `README.md` — construct definition, intended uses, prohibited claims, known confounders
- `rubric.md` — need/action matrix, four episode states, reach + calibration axes, frontier rule, six evidence dimensions, observable subcriteria, scoring anchors, weights, 1–100 mapping
- `protocol.md` — work-episode selection, eligibility, sample size, blinding, missing-data handling, judging, aggregation, suppression, privacy
- `judges/` — exact extraction, scoring, challenge, and synthesis prompts
- `schema.json` — machine-readable input and output contract
- `fixtures/` — synthetic or consented/redacted examples with expected score ranges
- `scripts/` — one command runs the published protocol and emits the full evidence trail; trainer-side harvest + aggregation
- `CHANGELOG.md` — protocol and rubric changes with version boundaries

Constraints already fixed by the spec: self-report is primary and locked before transcript evidence runs; every comparison scores all windows in one run under one protocol version; the five-step scales are ordinal (distributions and transition matrices, never means); first cohorts calibrate the rubric — they do not establish a benchmark.
