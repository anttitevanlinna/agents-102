# Squint test — baseline (judge 2)

Source: `curriculum/evals/story-depth/a101-skeleton.md` only.

## 1. Big learnings

- Context is the lever that changes what an agent produces, and it's bigger than you think — "Context is King" / "Context isn't only about countries" / "The move you're about to make"
- Retros/iteration are a deliberate, teachable move, not an afterthought — "Iterate and Learn"
- Memory and compounding are a mechanism with an internal logic, not just "more data" — "Compounding" / "Two words, held together" / "Why the sharpening happens" / "What this unlocks"
- Multi-agent systems are a design choice with a rule for when to make it — "When to split an agent (and how)"
- Agents get stuck and debugging them is its own skill — "Debugging Stuck Agents"
- Security/risk work is a discipline you practice, not a checklist you run once — "The discipline of risk"
- LLMs fabricate, and grounding doesn't trivially fix it — "The Missing Check" / "Why the LLM fabricates" / "Why grounding fails even when the facts are in context"
- Evals turn subjective judgment into something that steers the system — "Evals as Steering" / "Module 5 turned judgment into a judge"
- The human's role changes but doesn't disappear as agents take more action — "The New Human Role in the Loop" / "The human does not disappear" / "Would you let it send the mail?"
- Going from personal use to team use requires solving an adoption/absorption problem, not just sharing files — "From Personal to Team" / "Find the absorption bottleneck"
- Agents can build agents, and this compounds into a flywheel — "Agents Building Agents (The Flywheel)" / "Watch an agent build an agent" / "Take stock of the compound"

## 2. Governors

- Watch your reading load when building memory systems — "Keep the heavy reads under control" (M2)
- Escalate to a person once judgment runs out — "Escalate to a person when judgment runs out" (M4)
- Keep prototype and production separate — "Separate prototype from production" (M4)
- Before letting an agent act, ask whether you'd trust it with the risky version of that action — "Would you let it send the mail?" (M6)
- Name the likely failure mode and your Monday-morning move before you rely on something — "Name the likely failure and Monday move" (M7)

## 3. The future

"The question to hold" (M6, under Evals as Steering) — titled as an open question but the skeleton doesn't state what it is. No other title poses a forward-looking question explicitly.

## 4. Self-doubt

Yes — clustered in M3–M6:
- "Debugging Stuck Agents" (M3) — agents fail/stall
- "Lecture: The discipline of risk" and "Demo: Agent loop, raw" (M4) — the raw/unmanaged loop is presented before the discipline that reins it in
- "Why the LLM fabricates" / "Why grounding fails even when the facts are in context" (M5) — doubts the model's own reliability, and doubts the fix
- "When the score stops moving" (M6) — evals plateau

## 5. Blank stretches

- M1: "Iterate and Learn" (lecture) — no headings
- M2: "Demo: 1st scheduled agent" (lecture) — no headings
- M3: "Demo: Agent that takes action" — no headings
- M3: "Exercise: Name your crux" — no headings
- M3: "Exercise: Three retrievers, one curator" — no headings
- M3: "Exercise: Three minds, one synthesis" — no headings
- M3: "Lecture: When to split an agent (and how)" — no headings
- M3: "Debugging Stuck Agents" — no headings
- M3: "Reading: Before Module 4" — no headings
- M4: "Demo: Agent loop, raw" — no headings
- M4: "Lecture: The discipline of risk" — no headings
- M5: "Lecture: Grounded, and four candidates to measure" — no headings
- M5: "Lecture: Self-consistency after the scoreboard" — no headings
- M6: "When the score stops moving" — no headings
- M7: "Interview for the job" / "Pick the sharing shape" (module-level headings, no lecture/exercise content beneath them at that point) — bare
- M8: "Watch an agent build an agent" — bare module-level heading, no content beneath
