---
key: apt101-d2-team-rules
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-keep-and-run-tonight
requires:
  - id: team-rules
    source: prompt:apt101-d1-team-rules
produces:
  - id: team-rules
    location: "team/team-rules.md (Day 2)"
    note: "read on Day 3"
---
Read team/team-rules.md, the three team/<name>/rules.md files, team/doubts.md, team/tree.md, each team/<name>/judge-run.md and team/premortem.md.

Propose changes to team/team-rules.md, only for mistakes that showed up in at least two places today. Give each one where it showed up.

Add at least one example of good the agents should copy: a line that kept two sources' disagreement visible, or a quote with its interview and minute. A rules file that is all don'ts teaches only what to avoid.

Show me the proposed team/team-rules.md before saving.
