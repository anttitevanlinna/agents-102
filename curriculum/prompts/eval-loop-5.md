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
- What happened to the Module 3 briefing: flagged claims in round 0 against the last round, and is the drop bigger than the judge noise from round 0?
- Which generation-tactic change most clearly improved the next round?
- Which rule's named miss kept coming back in later rounds, or was followed by a new kind of miss? Write it into module-6/eval-notes.md with the rounds that show it, as the rule to cut. If no rule qualifies, say so.
- What would you test in the next run?
