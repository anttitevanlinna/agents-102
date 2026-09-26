# Exercise eval — manifest

This file routes; it does not judge. An exercise gets every per-file class whose compendiums reach it, the way every file does: the class table (judge template, trace cache, inputs) is in `/eval-fire`, and routing is each compendium's `eval_classes:` frontmatter. Dispatch one class with `/eval-fire <class> <file>`, all of them with `/curriculum-pre-ship-audit <file>`, a queue with the `eval-sweep` workflow. The dispatch contract, verdict vocabulary and output record are `curriculum/evals/judges/_dispatch-preamble.md` and `node curriculum/evals/scripts/instance-contract.js <class>`; pass thresholds are in each judge template.

## What an exercise adds

- **Seam** (story): when the exercise sits at a module seam, also run `curriculum/evals/seams/seam-judge.md`.
- **Arc** (story): when it is part of an Agents 101 or AE101 module sequence, it is read in the sequential arc pass, `curriculum/evals/arc-pass.md`.
- **Behavior** always applies: an exercise carries prompts a student copies.
