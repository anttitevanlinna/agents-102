---
key: build-for-the-gap-2
dest: Builder Claude
runtime: any
origin: exercises/build-for-the-gap
requires:
  - id: solo-built-agent-file
    source: prompt:build-for-the-gap-1
produces:
  - id: solo-built-agent
    location: module-7/built-agent.md
---
Run my Module 5 judge, `judges/groundedness-judge.md`, on the new agent's output, with the files the new agent read as its evidence and nothing else. Do not change the judge. Where the output fails, rebuild the agent you built so it passes, then run it and judge it again.

If the judge flags nothing, say so. Then check three claims you doubt against the input files yourself, and rebuild for what you find.

Write `module-7/built-agent.md`: my four-line description, the judge result before and after the rebuild, what you changed in the agent, and the minutes from description to a passing agent.
