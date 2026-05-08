---
key: eval-loop-6
dest: Builder Claude
runtime: any
origin: exercises/eval-loop
---
Set up a fixed-judge loop for one of my outputs.

Run the loop end to end:
1. Write a generation prompt file that a generator subagent can read.
2. Dispatch a generator subagent to produce the output from that prompt.
3. Dispatch a separate judge subagent to run the fixed judge and write per-claim or per-item feedback alongside the score.
4. The main session reads the judgment and rewrites the generation prompt file before the next round.

Run at least three rounds. After round 3, keep going until improvement is no longer significant.

Never edit the judge file. At the end, write notes with the score trajectory, the generation-prompt changes, the judge-integrity check, why the loop stopped, and the next boundary case to test.

Use these inputs:
