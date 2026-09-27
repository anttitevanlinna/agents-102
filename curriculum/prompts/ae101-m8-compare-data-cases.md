---
key: ae101-m8-compare-data-cases
dest: Claude Code
context: M8 cross-case decision record
runtime: any
origin: exercises/decide-agent-data-boundary
requires:
  - id: m8-ticket-data-map
    source: prompt:ae101-m8-map-ticket-data
  - id: m8-recommendation-data-map
    source: prompt:ae101-m8-map-recommendation-data
produces:
  - id: m8-data-handling-decision
    location: docs/agent-platform/data-handling-decision.md
---
Read the two case files under `docs/agent-platform/data-cases/` and `docs/agent-platform/architecture.md`.

Write `docs/agent-platform/data-handling-decision.md`. Compare the cases rather than merging them. Include purpose and necessity, minimization, access, retention and deletion, processors and transfers, rights operations, security controls, profiling and automated-decision screen, DPIA screen, human-review design, unresolved legal calls, and named decision owners.

Give each case a provisional engineering launch state: `pilot`, `hold`, or `allow within boundary`. This is not a legal verdict. For each state name the technical and product boundary it assumes, the human owner who must decide the unresolved legal questions, and the evidence that would change the state.

End with a ranked list of changes the shared platform architecture needs before it can host either case. Distinguish common controls from case-specific controls. In chat, return only the shared controls, the controls that must stay different, and the highest-priority unresolved owner decision.
