---
key: a101-solo-debrief-works-without-me
dest: Builder Claude
runtime: any
origin: agents-101/agents-building-agents-solo
requires:
  - id: m8-built-agent
    source: prompt:extend-your-system-2
  - id: challenge-agent
    source: prompt:build-your-challenge-memory-5
produces:
  - id: challenge-agent
    location: agents/<module-2 agent>.md (rewritten in place)
---
Start with the file path. No plan or preamble.

Review this session and rewrite my Module 2 challenge agent in agents/ so it would work for someone without my memory. Read it beside the agent you built today and module-8/built-agent.md. Look back: which lines in my Module 2 agent assume my memory, how the built agent names what it reads instead, and what the judge caught.

Rewrite the agent in place. Integrate, don't append, and no retro notes section. Where it reads my memory, it names the file and says what to do when that file is missing. Keep every rule the session did not contradict.

Tell me in 3-5 lines what you added, sharpened and removed, quoting the before and after line for each.

<!-- maintainer -->

Approval: new prompt, prompt-ok Antti 2026-11-25 ("prompt-ok for any new prompts"). Canonical Debrief shape (`check_student_facing.md` §35): review, rewrite in place, report. Your agent improves your agent, aimed at the lines that tie the Module 2 agent to the learner's memory.
