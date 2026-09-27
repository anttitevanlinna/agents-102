---
key: ae101-m7-tabletop-platform
dest: central synthesizer
context: M7 final platform challenge
runtime: any
origin: exercises/research-and-select-agent-platform
requires:
  - id: m7-selection-board
    source: prompt:ae101-m7-synthesize-platform-plans
  - id: m7-synthesized-architecture
    source: prompt:ae101-m7-synthesize-platform-plans
produces:
  - id: m7-tabletop-traces
    location: docs/agent-platform/tabletop-traces.md
  - id: m7-revised-architecture
    location: docs/agent-platform/architecture.md
---
Read `docs/agent-platform/challenge.md`, `selection-board.md`, and `architecture.md`.

Tabletop two complete executions through the architecture. The first must perform one useful bounded action. The second must encounter a case where the correct result is no action or escalation.

For each execution, write an event table to `docs/agent-platform/tabletop-traces.md`: event and span identifiers, actor identity, trigger, policy version, context references, tool request, authorization decision, credential path, side effect, verifier evidence, state transition, retry or cancellation decision, final outcome, and fields deliberately excluded from the trace.

Try to break the design. If an action cannot be authorized, reconstructed, verified, contained, cancelled, or distinguished from a duplicate, patch `architecture.md` and update `selection-board.md` with the reason. Preserve the strongest rejected alternative.

In chat, return only the useful-action outcome, the no-action or escalation outcome, and the architecture sections changed by the tabletop.
