---
key: joint-double-diamond-8
dest: central synthesizer
runtime: any
origin: exercises/joint-double-diamond
requires:
  - id: m8-sponsor-challenge
    source: prompt:joint-double-diamond-1
  - id: m8-selection-board
    source: external
  - id: m8-proposals
    source: prompt:joint-double-diamond-5
  - id: m8-critiques
    source: prompt:joint-double-diamond-7
produces:
  - id: m8-deliberation
    location: shared folder root — strategy-kernel.md and the synthesis files
    note: final synthesis over every proposal.md / critique.md in the deliberation
---
Read challenge.md, selection-board.md, every proposal.md, every critique.md, and any pushback.md files. Update selection-board.md if a critique changed the best idea.

Then write two files at the shared folder root:

1. strategy-kernel.md
Four sections: diagnosis, guiding policy, experiments, risks. Cite every claim against its source file. Keep the kernel under one page. Don't smooth the disagreements; where the selected idea beat a strong alternative, name the alternative in one line.

2. agent-set.md
Suggest the set of agents the company should build or assign next. For each agent: job, owner, input files/systems, output, first evaluation or judge, and why this agent belongs in the set. Keep it to the smallest set that can carry out the guiding policy, and no more agents than there are participants.

