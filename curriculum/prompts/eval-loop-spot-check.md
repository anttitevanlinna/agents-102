---
key: eval-loop-spot-check
dest: Claude Code
runtime: any
origin: exercises/eval-loop
requires:
  - id: m6-run-artifacts
    source: prompt:eval-loop-2
  - id: m5-my-marks
    source: prompt:hallucination-bakeoff-marks
produces:
  - id: m5-my-marks
    location: module-5/my-marks.md (three lines appended)
---
Show me three claims from the last round's briefing in module-6/runs/, numbered, without saying which the judge flagged. Wait for my three marks: grounded or not grounded, and one line why.

Then append my three marks to module-5/my-marks.md in its line format, with source round-N and the judge's side: not grounded if that round's judgment.md flags the claim, grounded if not. End with one line: across all my marks, where the judge and I disagree, and what that says the judge cannot see.
