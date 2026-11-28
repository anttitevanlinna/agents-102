---
key: a101-m2-debrief-claude-md
dest: Claude Code
runtime: any
origin: agents-101/building-agent-systems
requires:
  - id: challenge-md
    source: prompt:name-your-challenge-1
  - id: working-tree-scaffold
    source: prompt:a101-prework-extract-tarball
produces:
  - id: root-instructions
    location: "./{{artifact:root-instructions}}"
    consumed-by:
      - prompt:a101-m3-debrief-handoff-rules
      - prompt:a101-m4-debrief-security-rules
      - prompt:a101-m5-debrief-groundedness-rules
      - module:agents-building-agents
callouts:
  - at: The rules file governs
    say: Each rule traces to a moment in your session, so none is generic advice.
  - at: Write them as standing rules
    say: Standing rules stay useful. The story of one session goes stale.
---
Review this session and write the first version of {{artifact:root-instructions}} at the training-directory root. The evidence: ./challenge.md, every file in sources/ (scan titles + first lines), every file in memory/, and our conversation.

The rules file governs how agents behave in this directory from now on: how memory gets compiled, how sources are treated, what claims require citations, what counts as "specific to my challenge" vs. generic. Every rule you write should be traceable to a specific moment in the session where the rule either helped or would have helped.

Write them as standing rules, not as the story of this session. Cover at minimum: the memory (when and how pages get written, what grounds them), the sources (what they are, whether they're editable), the agents (how they relate to the memory), and anything else the session showed we need.

When you're done, tell me in 3–5 lines: the rules you wrote and which session moments grounded each one. If you left a rule out on purpose, say which and why. I shouldn't have to open the file to know what's in it.
