# Output Quality and Hallucination Control

## Big Idea
LLMs will always fabricate. The skill is spotting it, adjusting the rules, and seeing the improvement.

## Meta
- **Primary Bloom's level:** Evaluate
- **Prework:** 10 famous agent failures in real life (curated reading — TODO: build this list)
- **Homework:** Chip Huyen *AI Engineering* (O'Reilly 2025) — selected sections (candidate)
- **Materials (trainer):** a prompt pattern that reliably produces fabrications from the participant's own Module 2-3 output. Optional blend with internet search material when the source alone is too sparse to fabricate from. No separate pre-built failing agent — the prompt IS the controlled example.
- **Plug points:** the participant's own Module 2-3 output is the material — no extra data needed

## What You'll Learn
After this module, you will be able to:
- **Explain** why LLMs fabricate as a property, not a bug
- **Identify** fabrication in your own system's output using domain expertise
- **Adjust** generation rules to tighten fabrication and observe the tradeoff
- **Evaluate** the quality loop as a continuous discipline

## Lectures
- **Why LLMs Will Always Fabricate** — statistical nature of generation. Confidence and correctness are unrelated. Includes **compound reliability math**: 85% per-step × 10 steps = 20% end-to-end. The single most useful number a CTO can take away.

## Exercises
- **Find and tighten fabrication** — Apply the trainer's prompt pattern to your Module 2-3 output. Optionally blend with internet search. The system will fabricate — that's designed. Spot what it got wrong, what it invented, what looks plausible but isn't supported. You are the domain expert — use that. Tighten the rules (add constraints, require citations, restrict claims). Regenerate. Compare. See what you gained. See what you lost — tighter rules kill good output too.

## Key Concepts (Emergent)
- **The quality loop**: generate → evaluate → adjust rules → regenerate. Continuous practice, not a one-time fix.
- **Demo-to-production gap.** Works once ≠ works reliably. Non-deterministic failure means you can't just "fix the bug."
- **Why customer service works and complex processes don't** — the compound math explains it directly.

## Plug Points
- **Your initiative's output format** — whatever the Module 2-3 system produces.

## Bridge
You can spot fabrication by eye. But you won't always be there. What if you could automate what you just did — turn your judgment into rules a machine can run? That's evals.
