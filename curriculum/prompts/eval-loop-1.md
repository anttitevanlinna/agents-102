---
key: eval-loop-1
dest: Claude Code
runtime: any
origin: exercises/eval-loop
---
Three things, in sequence:

1. Write ./generation-prompt.md as the generator instruction: produce a fresh one-page briefing on the question in ./crux.md, use ./crux.md and memory/ as the ground, and mark anything that relies on anything outside those files. Keep it short enough that a generator will follow it.

2. Run ./generation-prompt.md once and save the briefing to module-6/fresh-briefing.md.

3. Run the judge at judges/groundedness-judge.md against module-6/fresh-briefing.md, using ./crux.md and memory/ as the evidence input. In chat, for every factual claim, show:
- the claim
- the judge's verdict
- one sentence naming the grounding problem, if any
- one generation-prompt rule that would prevent this kind of miss in the next briefing

Then summarize in three lines: what the judge caught, the one generation-prompt rule the judgment most clearly surfaces, and one claim or question the judge could not verify from ./crux.md or memory/.

Do not update ./generation-prompt.md from this feedback yet. Phase 0 is calibration; the loop rewrites the prompt later.
