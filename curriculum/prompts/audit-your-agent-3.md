---
key: audit-your-agent-3
dest: Claude Code
runtime: any
origin: exercises/audit-your-agent
requires:
  - id: policy-report
    source: prompt:audit-your-agent-1
  - id: security-report
    source: prompt:audit-your-agent-2
produces:
  - id: security-reports
    location: outputs/policy-report-raw.md, outputs/policy-report.md, outputs/security-report.md
    note: completes the set by appending "Mitigation applied and residual" to the security report
your-call: true
---
Mitigate the risk I name below. Pick the shape that fits it (scope, split, filter, gate or review), make the changes, and tell me what you did and why.

Then run the same check again for this one risk and tell me the new verdict: is the risk reduced, gone, or moved somewhere else?

Add a section "Mitigation applied and residual" to the end of outputs/security-report.md: what changed, the new verdict, and what is still at risk.

The risk:
