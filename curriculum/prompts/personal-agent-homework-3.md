---
key: personal-agent-homework-3
dest: Claude Desktop
runtime: any
origin: exercises/personal-agent-homework
requires:
  - id: morning-agent-brief
    source: prompt:personal-agent-homework-2
produces:
  - id: morning-agent-output
    location: module-2/morning-agent/latest.html
---
Read module-2/morning-agent/morning.md and run the job. Read the current state of memory/ as context. Follow the rules in that file and in the root CLAUDE.md. Write the output to module-2/morning-agent/latest.html.
