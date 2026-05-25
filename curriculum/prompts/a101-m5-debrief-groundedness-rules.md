---
key: a101-m5-debrief-groundedness-rules
dest: Claude Code
runtime: any
origin: agents-101/output-quality
requires:
  - id: root-claude-md
    source: prompt:a101-m2-debrief-claude-md
    conditional: m2-completed
  - id: m5-evidence-artifacts
    source: module:output-quality
  - id: groundedness-judge
    source: module:output-quality
produces:
  - id: root-claude-md
    location: ./CLAUDE.md (Groundedness checks section)
    note: adds/sharpens 1-4 groundedness rules in place
---
Start by reading the files. No plan or preamble.

Review this session and update the root `./CLAUDE.md` with groundedness operating rules. Read `./CLAUDE.md` if it exists, then scan `module-5/evidence-roster.md`, `module-5/claim-pool.md`, `module-5/adjudicated-claims.md`, `module-5/detectors/` (the four detector outputs), `module-5/scoreboard.md`, and `judges/groundedness-judge.md`.

Look back over the session: when did ungroundedness matter, which claim-shapes needed checking, where did citations look present but not load-bearing, and what should future agents know before they turn a briefing, memo, recommendation, or proposed action into something people rely on?

Then update `./CLAUDE.md` as the durable operating memory for this agent system. Add or sharpen 1-4 short rules that tell future sessions when and how to run groundedness checks: what kinds of output need checking, which evidence surface to use, when to run `judges/groundedness-judge.md`, and when to say "not enough evidence" instead of smoothing over the gap. If a Groundedness checks section already exists, edit the rules in that section in place; do not add a new subheading or parallel list. Otherwise create a short section named "Groundedness checks". Touch ONLY that section; preserve every other section verbatim. Do not paste a benchmark summary. Do not add a retro section. Each rule should be usable by a future agent that never saw this session.

When you're done, read back the Groundedness checks section you just wrote and confirm each rule is in the file. Copy the exact rule text, one line per rule. Then tell me in 1-5 lines: what changed in `./CLAUDE.md`, which scoreboard row or adjudicated claim drove it, what future agents must do differently, and which claim shape you are LEAST confident you caught correctly. Then name the two patterns this prompt enforced: one about which boundary you were allowed to touch, one about checking what landed after you wrote it.
