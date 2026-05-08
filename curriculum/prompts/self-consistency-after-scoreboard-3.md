---
key: self-consistency-after-scoreboard-3
dest: Claude Code
runtime: any
origin: lectures/self-consistency-after-scoreboard
---
I have output I want to quality-control against fabrication. Build me a judge prompt that checks for these failure modes:

- Source triangulation: does every specific claim appear in at least one evidence file?
- Entailment: does the output say more than the evidence supports?
- Citation integrity: when a citation is made, does the evidence file actually contain the claim?
- Counter-evidence search: actively look for sources that contradict each claim, not just ones that support.

Keep the techniques that fit my output; swap any that don't for methods that catch my output's specific failure modes.

Ask me what output I'm checking, where my evidence lives, and what short filename to use under `judges/`. Then write the judge as a markdown file at that path. Short heading, one paragraph naming what it checks and why, then the prompt itself (the thing I'd paste at Claude to run the judge). Keep it under 20 lines. End with a one-line "Known limit:" naming what the judge can't catch.
