---
key: a101-m1-debrief-cold-critic
dest: Claude Code
runtime: any
origin: agents-101/getting-going
requires:
  - id: m1-site
    source: prompt:personal-site-with-guardrails-1
produces:
  - id: m1-site-cold-read
    location: scrollback
    note: chat-only diagnostic (subagent cold read); not persisted
---
{{#capability:claude}}Spawn a subagent{{/capability:claude}}{{#capability:codex}}Launch a fresh agent{{/capability:codex}} to give an unbiased read on `module-1/site.html`. The agent should read it cold, with no memory of building it.

Have the agent answer:
1. Quote the one line that feels most uniquely this person (not the best line, the most UNIQUELY them).
2. Quote the most generic line that could be copy-pasted from anyone's site.
