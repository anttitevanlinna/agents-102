---
key: apt101-d2-judge-a-real-summary
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-catch-it-making-things-up
requires:
  - id: real-summary
    source: prompt:apt101-d2-ready-a-real-summary
  - id: groundedness-judge
    source: prompt:hallucination-bakeoff-8
produces:
  - id: judge-run
    location: "team/<my-name>/judge-run.md"
    note: "read by apt101-d2-team-rules"
---
Run judges/groundedness-judge.md on my real summary, against its sources. The summary and its sources are in team/<my-name>/real-summary.md if I readied one. If not, use the summary file I name below and the files it cites or was built from.

For each claim the judge flags, give me the sentence from the source that supports it, or "not found".

If there's a claim under ## My bet, set the judge's result beside it.

Save it all to team/<my-name>/judge-run.md. End with the one flagged claim most likely to have reached a decision unchecked.
