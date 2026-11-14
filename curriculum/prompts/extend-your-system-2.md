---
key: extend-your-system-2
dest: Builder Claude
runtime: any
origin: exercises/extend-your-system
requires:
  - id: m8-extension-agent
    source: prompt:extend-your-system-1
produces:
  - id: m8-built-agent
    location: module-8/built-agent.md
---
Run my Module 5 judge, `judges/groundedness-judge.md`, on the new agent's output, with the files the new agent read as its evidence and nothing else. Do not change the judge. Where the output fails, rebuild the agent you built so it passes, then run it and judge it again. Write `module-8/built-agent.md`: my four-line description, the judge result before and after the rebuild, what you changed in the agent, and the minutes from description to a passing agent.
