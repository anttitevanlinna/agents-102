---
key: eval-loop-2
dest: Claude Code
runtime: any
origin: exercises/eval-loop
requires:
  - id: m6-round-0
    source: prompt:eval-loop-1
  - id: generation-tactic
    source: prompt:eval-loop-1
  - id: groundedness-judge
    source: prompt:hallucination-bakeoff-8
  - id: crux-md
    source: prompt:name-your-crux-2
  - id: m3-curated-memory
    source: prompt:three-retrievers-one-curator-5
produces:
  - id: m6-run-artifacts
    location: module-6/eval-notes.md, module-6/runs/round-1/
  - id: generation-tactic
    location: ./generation-tactic.md
callouts:
  - at: Run an eval loop
    say: The judge stays fixed, so a better score means better work.
  - at: For each round
    say: The writer and the judge are separate agents. The judge sees only the briefing.
  - at: When the loop stops
    say: This is what you read when you come back.
  - at: After round 1, stop
    say: Round 1 is where your own read joins the loop. After it, the loop runs while you are away.
---
Run an eval loop using my fixed judge. Never edit judges/groundedness-judge.md.

Starting generation tactic:
- Read ./generation-tactic.md and module-6/runs/round-0/judgment.md from round 0. If either is missing, stop and tell me round 0 has not run.
- Create module-6/runs/round-1/, module-6/runs/round-2/, and module-6/runs/round-3/. If the loop continues, keep the same numbering pattern with round-4/, round-5/, and so on.

Run at least 3 rounds. After round 3, keep going until there is no longer significant improvement from the previous round.

For each round:
1. Dispatch a generator subagent. It reads ./generation-tactic.md, ./crux.md without its ## Answer section, and memory/. It writes the briefing for that round:
   - briefing.md in that round's folder
2. Dispatch a separate judge subagent. It reads judges/groundedness-judge.md, ./crux.md without its ## Answer section, memory/, and the briefing for that round, and nothing else. Give it no extra rules, checks or instructions beyond the judge file. It writes the judgment for that round:
   - judgment.md in that round's folder
3. The main session, not a subagent, reads the judgment for that round and any new lines in ./remarks.md, and rewrites ./generation-tactic.md for the next round. Integrate the lesson; do not append retro notes. `remarks.md` holds my own comments on the briefings. Use them when you rewrite the tactic, and never pass them to the judge. If there are none, carry on.
4. Starting after round 3, decide whether the last round improved significantly compared with the previous round. Significant improvement means a drop in flagged claims larger than the judge noise read in round 0, a new failure class resolved, or a clearly sharper generation tactic. When there is no longer significant improvement, stop the loop.

When the loop stops:
- Write module-6/eval-notes.md with:
  - a table of claims flagged out of claims judged, round 0 (the baseline briefing) first and then each loop round
  - the generation-tactic change after each round, naming any remark it came from
  - why the loop stopped
  - whether any judge subagent got instructions beyond the judge file
  - one thing the judge still cannot see
  - one human decision still needed
- In chat, show me the same summary in under 12 lines.

After round 1, stop and ask me for remarks on its briefing. Add them to ./remarks.md, then run the remaining rounds without stopping.
