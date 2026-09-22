# Squint test — baseline (skeleton only)

Source: `curriculum/evals/story-depth/a101-skeleton.md`. Titles only; no body text read.

## 1. Big learnings

- **Context is the lever, not a detail.** — "Context is King", "Context isn't only about countries", "The move you're about to make" (M1)
- **Iteration beats a single pass.** — "Iterate and Learn", "Debrief" (M1)
- **Memory turns a one-off into a system.** — "Before the Memory", "Read the memory frame", "Build your challenge memory" (M1→M2)
- **Compounding is a mechanism, not a metaphor.** — "Compounding", "Two words, held together", "Why the sharpening happens", "What this unlocks" (M2)
- **Multi-agent work is a design choice with a seam.** — "When to split an agent (and how)", "Three retrievers, one curator", "Three minds, one synthesis" (M3)
- **Agents fail in ways that need debugging discipline.** — "Debugging Stuck Agents" (M3)
- **Security is a discipline you author, not a checklist you're handed.** — "The discipline of risk", "Run and package a security skill", "Audit your agent" (M4)
- **Grounding is measurable, and hallucination has named detectors.** — "Grounded, and four candidates to measure", "Hallucination benchmark", "Run the four detectors" (M5)
- **Judgment can be turned into a judge, then the judge becomes a yardstick.** — "Module 5 turned judgment into a judge", "Take the judge from object to yardstick" (M6)
- **Evals steer the system rather than just scoring it.** — "Evals as Steering", "The eval loop runs itself" (M6)
- **The human's role shifts but doesn't vanish.** — "The New Human Role in the Loop", "The human does not disappear" (M6)
- **Sharing work to a team is itself a designed, testable plan.** — "Design the sharing plan", "Test the sharing plan" (M7)
- **The system can extend and build itself (the flywheel).** — "Agents Building Agents (The Flywheel)", "Watch an agent build an agent", "Extend your system" (M8)

## 2. Governors

- "Check what Claude can read" (M1, Before the Memory) — check access before you start building on it.
- "Keep the heavy reads under control" (M2, Build your challenge memory) — bound ingestion before it runs away.
- "Keep the main session blind" (M5, Hallucination benchmark) — isolate the benchmark from the session you're testing.
- "Escalate to a person when judgment runs out" (M4, Audit your agent) — name the handoff point before autonomy exceeds judgment.
- "Separate prototype from production" (M4, Audit your agent) — don't let a prototype's risk profile leak into production.
- "Would you let it send the mail?" (M6, The New Human Role in the Loop) — a concrete pre-action test for how much autonomy to grant.
- "Find the absorption bottleneck" (M7, Design the sharing plan) — locate the constraint before designing the handoff.

## 3. The future

"The question to hold" — M6, LECTURE "Evals as Steering". It's the only title that explicitly frames something the student carries forward unresolved rather than a closed take-away; the skeleton gives no hint what the question itself is.

## 4. Self-doubt

- M5 prework, LECTURE "The Missing Check": "Why the LLM fabricates" and "Why grounding fails even when the facts are in context" — doubts the tool's basic reliability, and specifically doubts that giving it the right context is sufficient.
- M6, "The New Human Role in the Loop": "The human does not disappear" — pushes back against a full-automation reading of the training's own tools.

## 5. Blank stretches

Lectures with no `##` beneath them (nothing to squint at beyond the title):
- M2 "Demo: 1st scheduled agent"
- M3 "Demo: Agent that takes action", "Lecture: When to split an agent (and how)", "Debugging Stuck Agents"
- M4 "Demo: Agent loop, raw", "Lecture: The discipline of risk"
- M5 "Lecture: Self-consistency after the scoreboard"
- M6 "When the score stops moving"
- M8 "Watch an agent build an agent" (this is a module-level bullet, not even a lecture)

Exercises whose headings are recipe steps only (Phase 1 / Phase 2 / ... with no reflective or naming heading among them):
- M8 "Extend your system" — Describe / Generate / Run and judge / Take stock of the compound (three of four are pure steps; only the close has any reflective framing)
- M1 "Paint by agent with guardrails" phases 1–7 are step-labelled, though several carry named reflective beats (Name the framework, Keep yourself the protagonist, List what you hate then invert it) that do give a squint

M7 has two ungated stub headings with nothing under them: "Interview for the job" and "Pick the sharing shape" (module-level, before the exercise of near-identical name).
