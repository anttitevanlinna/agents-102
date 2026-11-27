---
key: a101-m5-debrief-groundedness-rules
dest: Claude Code
runtime: any
origin: agents-101/output-quality
requires:
  - id: root-instructions
    source: prompt:a101-m2-debrief-claude-md
    conditional: m2-completed
  - id: m5-evidence-artifacts
    source: prompt:hallucination-bakeoff-8
  - id: groundedness-judge
    source: prompt:hallucination-bakeoff-8
produces:
  - id: root-instructions
    location: "./{{artifact:root-instructions}} (Groundedness checks section)"
    note: adds/sharpens 1-4 groundedness rules in place
---
Read `./{{artifact:root-instructions}}` if it exists, then scan `module-5/evidence-roster.md`, `module-5/claim-pool.md`, `module-5/adjudicated-claims.md`, `module-5/detectors/` (the four detector outputs), `module-5/scoreboard.md`, and `judges/groundedness-judge.md`.

Update `./{{artifact:root-instructions}}` so every later session checks its briefings with that judge. Add up to four short rules under "Groundedness checks": where the judge runs, and where the benchmark showed it cannot check. In those places the agent answers "not enough evidence". If the judge now covers an earlier rule, quote that rule and cut it. Write each rule so an agent that never saw this session can follow it.

Then show me the rules as they now stand in the file, the scoreboard row or claim behind each one, and the kind of claim you are least sure the judge catches.
