---
key: hallucination-bakeoff-9
dest: Claude Code
runtime: any
origin: exercises/hallucination-bakeoff
requires:
  - id: groundedness-judge
    source: prompt:hallucination-bakeoff-8
  - id: m5-adjudication
    source: prompt:hallucination-bakeoff-5
  - id: m3-briefing-baseline
    source: prompt:three-minds-one-synthesis-4
produces:
  - id: m5-baseline-score
    location: module-5/baseline-score.md
    note: adjudicated counts, judge counts and the doubted line for the frozen Module 3 briefing; Module 6 round 0 reads it
---
Run `judges/groundedness-judge.md` on `module-5/briefing.md` with the files in `module-5/evidence-roster.md`. Write `module-5/baseline-score.md` with a section `## Module 3 briefing`: how many claims in `module-5/adjudicated-claims.md` are GROUNDED, PARTLY GROUNDED and UNGROUNDED, out of how many. Add a section `## Judge on the Module 3 briefing` with the number of claims judged and the number flagged.

Then open `module-3/briefing-baseline.md` and show me the line under `## Doubted line`, the judge's verdict on it, and the evidence lines from `module-5/adjudicated-claims.md` that bear on it, or "no support in the roster". Do not tell me whether my doubt was right.

I compare and answer in one line. Append a section `## Doubted line` to `module-5/baseline-score.md` with the line, the judge's verdict, and my answer word for word.
