---
key: a101-m4-debrief-security-rules
dest: Claude Code
runtime: any
origin: agents-101/security
requires:
  - id: root-instructions
    source: prompt:a101-m2-debrief-claude-md
    conditional: m2-completed
  - id: security-reports
    source: prompt:audit-your-agent-3
produces:
  - id: root-instructions
    location: "./{{artifact:root-instructions}} (Security operating rules section)"
    note: adds/sharpens 1-5 security rules in place
---
Read ./{{artifact:root-instructions}} if it exists, then outputs/policy-report-raw.md if it exists, outputs/policy-report.md and outputs/security-report.md. From this session, pick out what a later session has to remember: the rows that matter, the "I can't tell" rows that need a standing check, where the mitigation reduced one risk and moved another, and the risk that is still open.

Add up to five short security rules to ./{{artifact:root-instructions}}, under "Security operating rules". Write a rule only where no check or mitigation covers the risk: what not to touch, and which residual risks from outputs/security-report.md must stay visible. Each rule names its trigger, file or report row, so an agent that never saw this session can follow it. Cut any earlier rule that the mitigation or the security skill now covers.

Then show me the rules as they now stand in the file, and tell me in up to five lines which report row or residual risk is behind each one and what risk remains after the mitigation.
