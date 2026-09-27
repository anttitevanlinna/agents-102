---
key: ae101-m7-research-boundary-decision
dest: Claude Code
context: M7 bounded architecture research
runtime: any
origin: exercises/build-and-prove-agent-platform
requires:
  - id: m7-responsibility-contract
    source: prompt:ae101-m7-frame-unattended-responsibility
  - id: m7-tool-contract
    source: prompt:ae101-m7-frame-unattended-responsibility
  - id: m7-draft-architecture
    source: prompt:ae101-m7-frame-unattended-responsibility
produces:
  - id: m7-research-decision
    location: docs/agent-platform/architecture.md
  - id: m7-researched-architecture
    location: docs/agent-platform/architecture.md
---
Resolve one consequential uncertainty in `docs/agent-platform/architecture.md` with bounded internet research.

Read `docs/agent-platform/architecture.md`. Identify the two unresolved decisions most likely to widen authority, weaken isolation, or make the outcome hard to verify. Recommend one and ask me which decision to research.

Then ask me for exactly three rules that should govern this search. Ask for one rule at a time. Preserve my wording and ask what each rule should reject, prefer, or force you to do. Save the decision, the three rules, and their interpretations under `Research decision` in `architecture.md` before searching.

Use at most five search queries and open at most eight sources. Research only the selected decision. Distinguish official capability documentation, primary security or regulator guidance, independent testing, operator experience, analysis, and vendor marketing. Record each query, source opened, source date, source type, accepted or rejected status, the rule that caused that decision, contradictions, and the stopping reason. For every accepted factual claim, include its URL and a supporting passage of at most 25 words. Mark unsupported claims `UNVERIFIED`.

As you work, report when the research policy is saved and when enough evidence exists to make or defer the decision.

End the `Research decision` section with one decision, the strongest rejected alternative, the evidence that would reverse the decision, and remaining uncertainty. Patch only the affected architecture sections. AWS services implement the responsibility and trust boundaries; do not let the service list replace them.

Do not provision resources. In chat, return only the decision, the weakest surviving evidence, the stopping reason, and the architecture sections changed.
