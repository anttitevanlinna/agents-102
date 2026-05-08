---
key: hallucination-bakeoff-8
dest: Claude Code
runtime: any
origin: exercises/hallucination-bakeoff
---
Take the winning detector (or the ensemble) from module-5/scoreboard.md. Rewrite it as a portable judge prompt. The judge should:

1. Take any output file and the relevant evidence files as inputs.
2. Flag ungrounded claims using the method(s) that won the benchmark.
3. Return a short structured list — claim flagged, category, one-line reasoning.
4. Not classify claims I didn't ask about. Stay narrow. A judge that tries to do everything does nothing well.

Write the judge as a markdown file to judges/groundedness-judge.md — a short heading, one paragraph describing what it checks and why, then the prompt itself (the thing I'd paste at Claude to run the judge). Keep the judge prompt under 20 lines. Prompts that sprawl get ignored.

At the end of the file, add a one-line "Known limit:" — the failure mode this judge doesn't catch, based on what lost the benchmark.
