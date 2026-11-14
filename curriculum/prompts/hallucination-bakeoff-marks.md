---
key: hallucination-bakeoff-marks
dest: Claude Code
runtime: any
origin: exercises/hallucination-bakeoff
requires:
  - id: m5-claim-pool
    source: prompt:hallucination-bakeoff-2
produces:
  - id: m5-my-marks
    location: module-5/my-marks.md
    note: the student's own verdicts on five claims; the scorer and Module 6's spot-check read it
---
Show me five claims from `module-5/claim-pool.md` with their numbers: a mix of shapes, at least one you would expect to be hard. Do not tell me your view of any of them.

For each, I answer grounded or not grounded, with one line on why. Write my answers to `module-5/my-marks.md`, one line per claim, in this form with my words kept:

- module-5 #N | grounded or not grounded | why | judge: -
