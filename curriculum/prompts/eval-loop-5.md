---
key: eval-loop-5
dest: Claude Code
runtime: any
origin: exercises/eval-loop
requires:
  - id: m6-run-artifacts
    source: prompt:eval-loop-2
  - id: generation-tactic
    source: prompt:eval-loop-2
---
Show me module-6/eval-notes.md and ./generation-tactic.md.

Then answer in five bullets:
- Did the judge file stay byte-identical?
- What was the score trajectory?
- Which generation-tactic change most clearly improved the next round?
- Which failure did the generation tactic still not absorb?
- What would you test in the next run?
