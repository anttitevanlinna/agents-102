---
key: apt101-d2-tonights-question
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-keep-and-run-tonight
requires:
  - id: morning-agent-brief
    source: prompt:personal-agent-homework-2
  - id: chosen-bet
    source: prompt:apt101-d2-write-the-chosen-bet
  - id: premortem
    source: prompt:apt101-d2-the-failure-we-missed
produces:
  - id: morning-agent-brief
    location: "module-2/morning-agent/morning.md (Day 2 edit)"
    note: "read by tonight’s scheduled run"
---
Edit module-2/morning-agent/morning.md for tonight's run:
- It reads chosen-bet.md and premortem.md from our team folder, by the full path team/ points to. A scheduled run starts fresh, so write the full path, not team/.
- It reports the evidence for the bet and the evidence against it, with how many customers said each.
- It watches for the early warning signs in premortem.md.
- It runs judges/groundedness-judge.md on its own digest before writing it.

Show me the diff before saving.
