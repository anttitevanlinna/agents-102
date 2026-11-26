---
key: a101-m3-debrief-handoff-rules
dest: Claude Code
runtime: any
origin: agents-101/multi-agent-systems
requires:
  - id: root-instructions
    source: prompt:a101-m2-debrief-claude-md
  - id: m3-agent-work
    source: artifact:m3-agent-work
produces:
  - id: root-instructions
    location: "./{{artifact:root-instructions}} (integrate in place)"
    note: sharpens division-of-work + handoff rules on the M2 file
---
Start by reading the files. No plan or preamble.

Read {{artifact:root-instructions}} at the root, then what this session produced in agents/, sources/ and module-3/. Look at how the agents worked together: where one agent redid or overwrote another's work, where something a retriever found never reached the briefing, and where the three stances ended up saying the same thing.

Rewrite {{artifact:root-instructions}} so the next session avoids those. Say what each agent is for, where it writes, and what it leaves to the others. Change the rules that turned out wrong, and work the new ones into the file where they belong.

Then tell me in three to five lines what you added, sharpened and removed, and for each the handoff that showed it: the file, and what was lost there.
