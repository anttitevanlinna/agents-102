---
key: a101-m4-debrief-security-rules
dest: Claude Code
runtime: any
origin: agents-101/security
---
Start by reading the files. No plan or preamble.

Review this session and compound 1-5 security operating rules into the agent system. Read the root ./CLAUDE.md if it exists. Read outputs/policy-report-raw.md if it exists, outputs/policy-report.md, and outputs/security-report.md. Look back over the session: which rows should future sessions remember, which "I can't tell" rows need standing evidence checks, where did the mitigation reduce one risk but shift another, and what residuals should future sessions not forget?

Be harsher than feels right. Security rules that sound generally wise but do not name a concrete trigger, file, report row, or residual do not count.

Then update ./CLAUDE.md as the durable operating memory for this agent system. Add or sharpen 1-5 short security rules that future sessions should load before working with this system: what to check, what not to touch, when to run the reusable security check, or which residuals from outputs/security-report.md must stay visible. Integrate them into the right section if one exists; otherwise create a short section named "Security operating rules". Do not edit the skill files. Do not paste an audit summary. Do not add a retro section. Do not remove or restructure any existing sections outside Security operating rules. Each rule should be usable by a future agent that never saw this session.

When you're done, read back the Security operating rules section and copy the exact rule text you changed or added. Then tell me in 1-5 lines: which report row or residual drove each rule, what future agents must do differently, and what risk remains even after the mitigation.
