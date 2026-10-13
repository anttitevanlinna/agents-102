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
Read `docs/agent-platform/architecture.md` and the two case files in `docs/agent-platform/data-cases/`.

Write `docs/agent-platform/data-handling-decision.md`. Compare the cases rather than merging them. Include purpose and necessity, minimization, access, retention and deletion, processors and transfers, rights operations, security controls, profiling and automated-decision screen, DPIA screen, human-review design, unresolved legal calls, and named decision owners. Use the same owner roles as the case files.

Give each case a provisional engineering launch state: `pilot`, `hold`, or `allow within boundary`. This is not a legal verdict. For each state name the technical and product boundary it assumes, the human owner who must decide the unresolved legal questions, whether the state can take effect before that owner decides, and the evidence that would change the state. A state that touches real personal data cannot take effect before the owner decides the open lawful-basis and DPIA questions.

End with a ranked list of changes the shared platform architecture needs before it can host either case. Distinguish common controls from case-specific controls. In chat, return only the shared controls, the controls that must stay different, and the highest-priority unresolved owner decision.
