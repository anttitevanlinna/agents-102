# Lecture eval — manifest

This file routes; it does not judge. A lecture gets every per-file class whose compendiums reach it, the way every file does: the class table (judge template, trace cache, inputs) is in `/eval-fire`, and routing is each compendium's `eval_classes:` frontmatter. Dispatch one class with `/eval-fire <class> <file>`, all of them with `/curriculum-pre-ship-audit <file>`, a queue with the `eval-sweep` workflow. The dispatch contract, verdict vocabulary and output record are `curriculum/evals/judges/_dispatch-preamble.md` and `node curriculum/evals/scripts/instance-contract.js <class>`; pass thresholds are in each judge template.

## What a lecture adds

- **Seam** (story): when the lecture sits at a module seam, also run `curriculum/evals/seams/seam-judge.md`.
- **Arc** (story): when it is part of an Agents 101 or AE101 module sequence, it is read in the sequential arc pass, `curriculum/evals/arc-pass.md`.
- **Behavior** is N/A unless the body carries prompt blocks a student would copy; most lectures don't.
