---
key: ae101-m7-cross-evaluate-platform-plan
dest: Claude Code
context: M7 assigned peer evaluation
runtime: any
origin: exercises/research-and-select-agent-platform
requires:
  - id: m7-peer-candidate-packets
    source: external
  - id: m7-review-assignments
    source: external
produces:
  - id: m7-peer-reviews
    location: docs/agent-platform/reviews/<reviewer-slug>--<candidate-slug>.md
---
Ask for my name, create the same lowercase slug pattern used for candidate directories, and find that reviewer row in `docs/agent-platform/review-assignments.md`. Before opening any candidate file, state the two assigned candidate slugs and verify that neither equals my reviewer slug. If the row is missing, duplicated, or assigns my own packet, stop.

Read only `research-policy.md`, `search-trace.md`, `evidence-ledger.md`, and `plan.md` from those two assigned candidate directories. Do not read any other candidate file, any `publication-manifest.md`, or any existing review.

For each assigned candidate, first test the research against the author's own three criteria. Quote evidence from `research-policy.md`, `search-trace.md`, and `evidence-ledger.md` rather than guessing whether a rule fired.

Then test the plan against the common architecture contract: task boundary, success and correct no-action conditions, isolation, tool authority, credentials, verification, trace, masking, retry and idempotency, output, escalation, and AWS coherence.

Write one review file per candidate under `docs/agent-platform/reviews/`. Name each file `<my-reviewer-slug>--<candidate-slug>.md`. Before writing, verify that the exact output path does not exist. If it exists, stop and report the collision; do not overwrite it or invent a versioned filename. Each review must name one decision that survives challenge, one source or inference that fails, one missing alternative, one incompatible pair of choices if present, and the single change that would strengthen the whole plan most.

Do not score style. Do not rewrite the candidate. Do not select a winner. In chat, return only the two review paths and the most consequential disagreement between them.
