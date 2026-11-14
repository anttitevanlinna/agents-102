# Red yarn: method for aligning Agents 101 on a yarn

Start here for any yarn thread (context, compounding, control, agents building agents). Strategy source: `../agents-102-core/strategy/content-strategy.md`, sections "The red thread" and "The four yarns" (per-module grid). Read the whole strategy file first.

## Antti's rules (2026-11-13, verbatim)
- "It is not to add sentences. IT IS TO ALIGN on common theme."
- "say it in different ways without adding more content"
- "if you don't know how to do red yarn -> sample ae101 verification theme" → `ae101-yarn.md` here.
- "assume you can't write well. Use the writing evals to critique yourself until you get compact to the point"
- "LLM just can't make it good from bit context" / "fixer subagents may sometimes help to sharpen with small context"
- "terrible language. Just bad. See ae101 for how to write"

## What failed (removed same evening, 206a42ff)
Openers, "four ideas" slides, own-agent callouts, a rewritten M2 Start here. All were added sentences. Language judge scored them 89-93; Antti called them "even worse". Judge scores do not certify language.

## Fixer brief (small context, one module per fixer)
- Reword existing sentences only. Never add a sentence, slide, label, recap or callout. Cutting is fine. After may not have more sentences than before.
- No course talk ("this module", "from here on"), no pointers ("above"), no narrating what the student did.
- Voice: AE101. Read `curriculum/lectures/painting-the-picture-with-the-llm.md` first. Short declaratives, named actor, plain words, no kicker after the point.
- Leave alone: prompt fences, `{{prompt:...}}` lines (need Antti's prompt-ok), link lines, anything below `<!-- maintainer -->`, the Big Idea line.
- Banned: muscle, lands, agent file, "actually read", Monday, ship, leverage, hire; no em-dashes.
- Gate every round: write `[{"id","before","after"}]` and run `node curriculum/evals/teaching/red-yarn/critique.js in.json out.json` (one Sonnet call: check_writing + taste rules/examples + AE101 sample + `ae101-yarn.md`). Take its rewrite when better; drop what can't pass in 3 rounds.
- Output edits as `[{"file","old","new"}]`; the thread applies them, then runs all checks.

## M2 sample (compounding/agents-building-agents, 3 critique rounds), `m2-sample-edits.json`
Antti on depth: "quite close". Passing edits were word-level, on sentences already doing another job:
- "asking an LLM a question" → "asking an agent a question" (Start here question).
- "build a few more agents you need" → "have the agent build a few more agents you need".
- compounding.md: "sharpen it" → "have the agent sharpen it". Conflicts with the maintainer-note quote at compounding.md:69; resolve before applying.
Failed: "Your agent builds a memory around it" (from "You'll build"). Judge: makes the student passive, overstates agent autonomy at M2, "your agent" not yet earned. Better: "You'll have your agent build a memory around it." Lesson: hand the work to the agent, keep the student directing it.
None applied yet.

## Done = every check, reported one by one
Teaching number (`loops/loop.sh`, n=24 when the gap is close), calibrated taste judge (EVAL_LEAN=0, both orders), voice gate, AE101 drift (`check-judge.sh`, anchor ≥90%), rubric at end of pass (Opus). Report each as passed / failed / not run.
- `thread.js` same_name/callout checks reward added callouts; revise before using its numbers.
- Never edit `loop.sh` while a loop runs.
