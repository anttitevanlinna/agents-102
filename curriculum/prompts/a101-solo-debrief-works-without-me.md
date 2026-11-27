---
key: a101-solo-debrief-works-without-me
dest: Builder Claude
runtime: any
origin: agents-101/agents-building-agents-solo
requires:
  - id: solo-built-agent
    source: prompt:build-for-the-gap-2
  - id: challenge-agent
    source: prompt:build-your-challenge-memory-5
produces:
  - id: challenge-agent
    location: agents/<module-2 agent>.md (rewritten in place)
---
Review this session and rewrite my Module 2 challenge agent in agents/ so it would work for someone without my memory. Read it beside the agent you built today and module-7/built-agent.md. Look back: which lines in my Module 2 agent assume my memory, how the built agent names what it reads instead, and what the judge caught.

Rewrite the agent in place. Integrate, don't append. Where it reads my memory, it names the file and says what to do when that file is missing. Keep every rule the session did not contradict.

Tell me in 3-5 lines what you added, sharpened and removed, quoting the before and after line for each.
