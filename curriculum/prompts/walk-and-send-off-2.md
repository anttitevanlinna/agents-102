---
key: walk-and-send-off-2
dest: Claude Code
runtime: any
origin: exercises/walk-and-send-off
---
Audit my system against the task we just scoped. Read both `CLAUDE.md` (team, if it exists) and `CLAUDE.local.md` (personal, gitignored), everything at `.claude/memory/` (the three-block memory home; if my team kit pins a different path, use that), the ADRs in this repo, the skills at both `.claude/skills/` (repo-level) AND `~/.claude/skills/` (personal, including any test-strategy or workflow skills already authored), and the connectors I've wired.

Run this audit in a fresh context: spawn a sub-task via the Task tool so you read my setup without this conversation colouring it. Keep this session's scrollback intact — we'll need it for later phases. Return a structured report.

Return a ranked top-5: thin spots, missing context, wrong assumptions, or unwired tools that will hurt the agent if it tries this task un-packaged. Rank by how much damage each will do during a send-off run.

For each item, say: (a) what's thin, (b) what a properly-prepared agent would need instead, (c) the cheapest way to close the gap today: add an observation, sharpen a rule, wire a connector, or name it as a business-rules gap.
