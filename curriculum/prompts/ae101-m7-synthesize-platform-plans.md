---
key: ae101-m7-synthesize-platform-plans
dest: central synthesizer
context: M7 cohort synthesis
runtime: any
origin: exercises/research-and-select-agent-platform
requires:
  - id: m7-shared-challenge
    source: external
  - id: m7-candidate-packets
    source: external
  - id: m7-peer-reviews
    source: prompt:ae101-m7-cross-evaluate-platform-plan
produces:
  - id: m7-selection-board
    location: docs/agent-platform/selection-board.md
  - id: m7-synthesized-architecture
    location: docs/agent-platform/architecture.md
---
Read `docs/agent-platform/challenge.md`, `docs/agent-platform/exchange-manifest.md`, exactly the four required files in every candidate packet named there, and every assigned peer review. Publication manifests and unlisted candidate files are logistics, not evidence; do not use them to judge a design.

Before comparison, verify each candidate's four working-tree files byte for byte against the revision named in the exchange manifest, or verify all four against checksums recorded there. Record the verification result in the selection board. Refuse any packet that does not match.

Optimize for the shared objective and hard constraints, not popularity. Do not average incompatible designs. Select the strongest coherent whole-plan candidate first, then import a component from another plan only when it fits the selected plan's assumptions and authority model.

Write `docs/agent-platform/selection-board.md` with the selected whole-plan candidate, the strongest component choices from other plans, incompatible choices that must not be combined, the best objection, the strongest rejected alternative, open evidence gaps, and the evidence that would overturn the selection. Cite the candidate, review, and source behind every consequential choice.

Write `docs/agent-platform/architecture.md` as one coherent design. Cover the complete controlled execution from trigger to result or escalation, every custom tool contract, trust and credential boundaries, verification, trace schema, permitted and excluded trace fields, retry and idempotency, incident handling, the concrete AWS mapping, and the correct no-action path.

Call this the best available cohort plan within the candidate set, evidence, objective, and constraints. Do not claim a universal optimum.

In chat, return only the selected candidate, the two imported decisions that changed it most, and the strongest surviving objection.
