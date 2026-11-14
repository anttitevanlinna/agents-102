---
key: eval-loop-1
dest: Claude Code
runtime: any
origin: exercises/eval-loop
requires:
  - id: crux-md
    source: prompt:name-your-crux-2
  - id: m3-curated-memory
    source: prompt:three-retrievers-one-curator-5
  - id: groundedness-judge
    source: prompt:hallucination-bakeoff-8
  - id: m3-briefing-baseline
    source: prompt:three-minds-one-synthesis-4
  - id: m5-baseline-score
    source: prompt:hallucination-bakeoff-9
produces:
  - id: generation-tactic
    location: ./generation-tactic.md
  - id: m6-round-0
    location: module-6/runs/round-0/judgment.md
---
Three things, in sequence:

1. Dispatch a judge subagent, as the loop will. It reads judges/groundedness-judge.md, ./crux.md without its ## Answer section, memory/, and the ## Answer section of module-3/briefing-baseline.md, your Module 3 briefing as you froze it, and nothing else. It writes module-6/runs/round-0/judgment.md, with claims judged and claims flagged on the top line.

2. If module-5/baseline-score.md exists, put its "Claims judged: N. Claims flagged: F." line beside today's count. Any difference on the same briefing is a first read of the judge's own noise; say how big it is.

3. Write ./generation-tactic.md from that judgment, as the generator instruction: produce a fresh one-page briefing on the question in ./crux.md, from ./crux.md without its ## Answer section and from memory/. One rule for each kind of miss the judge flagged, each rule naming the miss it prevents. Keep it short enough that a generator will follow it.

Then tell me in five lines: claims judged and flagged in the Module 3 briefing, the Module 5 count beside it, whether the line I doubted in Module 3 was flagged, the rule the judgment most clearly asks for, and one claim the judge could not check from the files.
