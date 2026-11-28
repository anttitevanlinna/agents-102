---
key: eval-loop-6
dest: Claude Code
runtime: any
origin: lectures/new-human-role-in-the-loop
requires:
  - id: goal-nudger
    source: prompt:new-human-role-in-the-loop-1
  - id: generation-tactic
    source: prompt:eval-loop-2
  - id: m6-run-artifacts
    source: prompt:eval-loop-2
  - id: groundedness-judge
    source: prompt:hallucination-bakeoff-8
  - id: crux-md
    source: prompt:name-your-crux-2
  - id: m3-curated-memory
    source: prompt:three-retrievers-one-curator-5
produces:
  - id: goal-loop
    location: module-6/goal-loop/
  - id: generation-tactic
    location: ./generation-tactic.md (overwrite in place)
    note: the second loop keeps sharpening the rules the first loop won
callouts:
  - at: Score the newest briefing
    say: Round 0 is where the first loop stopped, so you see what the second loop adds.
  - at: The main session reads both
    say: Both loops sharpen one rules file, so your next briefing starts from everything they learned.
---
Run the same loop on my briefing again, with my goal-nudger as a second judge. Put the rounds and the notes in module-6/goal-loop/. Never edit ./goal-nudger-eval.md or judges/groundedness-judge.md.

Run the loop end to end:
1. Score the newest briefing in module-6/runs/ with both judges first, as `round-0/`. Then create one numbered subfolder for each round: `round-1/`, `round-2/`, `round-3/`, then the next sequential number for any additional round.
2. Each round, dispatch a generator subagent. It reads ./generation-tactic.md, ./crux.md without its ## Answer section, and memory/, and writes `briefing.md` inside the current round folder.
3. Dispatch two separate judge subagents. One runs ./goal-nudger-eval.md on the briefing and writes the score and its feedback to `judgment.md` inside the current round folder. The other runs judges/groundedness-judge.md on the briefing, with ./crux.md without its ## Answer section and memory/ as evidence, and writes `grounded.md` beside it.
4. The main session reads both and rewrites ./generation-tactic.md in place before the next round. Never trade a flagged claim for a higher goal-nudger score.

Run at least three rounds. After round 3, keep going until improvement is no longer significant.

At the end, write `notes.md` in module-6/goal-loop/ with the goal-nudger score and the flagged claims for each round, round 0 first, the generation-tactic changes, and why the loop stopped.
