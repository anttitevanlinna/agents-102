---
key: ae101-m8-revise-platform-boundary
dest: Claude Code
context: M8 architecture revision
runtime: any
origin: exercises/decide-agent-data-boundary
requires:
  - id: m7-proven-architecture
    source: prompt:ae101-m7-prove-control-plane
  - id: m8-data-handling-decision
    source: prompt:ae101-m8-compare-data-cases
produces:
  - id: m8-revised-platform-architecture
    location: docs/agent-platform/architecture.md
---
Read `docs/agent-platform/architecture.md` and `docs/agent-platform/data-handling-decision.md`.

Build a ranked change list for the architecture. Keep only the three most consequential changes. Ask me about one change at a time and wait for my decision. Do not show the remaining list until I answer. For each change state the data-flow evidence, the control being changed, the case or cases affected, and what remains a privacy or legal decision outside engineering authority.

After I accept, reject, or revise every consequential change, patch only the affected sections of `architecture.md` in place and preserve unrelated controls and prior decisions. Narrow tool permissions, context assembly, trace fields, retention, deletion propagation, processors, rights-operation paths, and human-review placement where the evidence requires it. Keep unresolved legal calls explicit and assigned; do not convert them into engineering conclusions.

Then update only the references in `data-handling-decision.md` that the accepted changes invalidate. Preserve its prior decision history. In chat, return only the changed architecture sections, rejected changes, and decisions still awaiting a named owner.
