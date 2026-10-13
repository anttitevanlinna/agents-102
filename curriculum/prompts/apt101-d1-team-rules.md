---
key: apt101-d1-team-rules
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/our-product-our-system
requires:
  - id: root-claude-md
    source: prompt:a101-m2-debrief-claude-md
produces:
  - id: team-rules
    location: "team/team-rules.md"
    note: "read at Day 2 close"
---
Read each team/<name>/CLAUDE.md in our team folder. Three rules files, written from three seats.

Write team/team-rules.md in two parts:
- Rules all three of us arrived at, in any wording, each with whose files it came from.
- Open questions for Day 2: the rules only one or two of us wrote, each under its author's name, worded as a question for the team.

Don't merge a disagreement into a compromise. Then tell me how many rules landed in each part, and the open question you think will be hardest.
