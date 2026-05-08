---
key: eval-loop-2
dest: Claude Code
runtime: any
origin: exercises/eval-loop
---
Run an eval loop using my fixed judge.

Fixed judge:
- Never edit judges/groundedness-judge.md.
- Before round 1, compute and record the starting SHA of judges/groundedness-judge.md.
- When the loop stops, compute the ending SHA and report whether the judge stayed byte-identical.

Starting generation prompt:
- Read ./generation-prompt.md from Phase 0. If it is missing, stop and tell me Phase 0 has not been completed.
- Create module-6/runs/round-1/, module-6/runs/round-2/, and module-6/runs/round-3/. If the loop continues, keep the same numbering pattern with round-4/, round-5/, and so on.

Run at least 3 rounds. After round 3, keep going until there is no longer significant improvement from the previous round.

For each round:
1. Dispatch a generator subagent. It must read ./generation-prompt.md, ./crux.md, and memory/. It writes the briefing for that round:
   - briefing.md in that round's folder
2. Dispatch a separate judge subagent. It must read judges/groundedness-judge.md, ./crux.md, memory/, and the briefing for that round. It writes the judgment for that round:
   - judgment.md in that round's folder
   Each judgment includes verdicts, one-sentence grounding feedback per factual claim, one generation-prompt rule for each flagged failure class, plus a top-line count of flagged claims.
3. The main session, not a subagent, reads the judgment for that round and rewrites ./generation-prompt.md for the next round. Integrate the lesson; do not append retro notes.
4. Starting after round 3, decide whether the last round improved significantly compared with the previous round. Significant improvement means fewer flagged claims, a new failure class resolved, or a clearly sharper generation prompt. When there is no longer significant improvement, stop the loop.

When the loop stops:
- Write module-6/eval-notes.md with the score trajectory, the generation-prompt change after each round, why the loop stopped, the judge SHA check, one thing the judge still cannot see, and one human decision still needed.
- In chat, show me the same summary in under 12 lines.

Do not stop for confirmation between rounds.
