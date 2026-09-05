---
key: eval-loop-6
dest: Builder Claude
runtime: any
origin: exercises/eval-loop
requires:
  - id: eval-loop-inputs
    source: student-input
produces:
  - id: reusable-eval-loop
    location: student-selected working folder
---
Set up a fixed-judge loop for one of my outputs.

Run the loop end to end:
1. In the working folder, write `generation-tactic.md` for a generator subagent to read.
2. Create one numbered subfolder for each round: `round-1/`, `round-2/`, `round-3/`, then the next sequential number for any additional round. Dispatch a generator subagent to read the shared tactic and write its output inside the current round folder, keeping the same output filename across rounds.
3. Dispatch a separate judge subagent to run the fixed judge and write the score and per-claim or per-item feedback to `judgment.md` inside the current round folder.
4. The main session reads that judgment and rewrites the working folder's `generation-tactic.md` in place before the next round. Do not create versioned tactic copies.

Run at least three rounds. After round 3, keep going until improvement is no longer significant.

Never edit the judge file. At the end, write `notes.md` in the working folder with the score trajectory, the generation-tactic changes, the judge-integrity check, why the loop stopped, and the next boundary case to test.

Use these inputs; no preamble, start by writing the first generation tactic file:
