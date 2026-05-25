# Three-persona sim — `agents-that-build-agents.md` (Ralph→/goal beat)

Run date: 2026-05-25 · Module 6 closer · audience L0→L3 ICs post-M1–M6

## VERDICT: PASS

Carve-out reads load-bearing, not hedging. Prompt block is runnable and the back-reference is resolved (names `session-shaper` + path). Vendor-warmth line stays practitioner-shaped. No mood beat below 8.

---

## Persona 1 — Opinionated senior engineer

Quotes:
- "Claude can read the artefacts the loop produced. It cannot read the codebase knowledge in your head, the political situation around the team kit, the next quarter's roadmap, the bug your tech lead lost three days to last sprint."
- "Build a flywheel that lets the agent run as far as it can on its own evidence, and stops at the moment your judgement is the input that matters."
- "He called it Ralph, after the Simpsons. One line, no scaffolding. Hacky, simple, powerful."

Read: The carve-out is REAL, not back-covering. The test a senior applies — does it name the *specific* thing the agent lacks, or does it wave at "human oversight"? — passes. It enumerates concrete blind spots (roadmap, team politics, the bug a tech lead lost three days to). That is an engineering boundary, not a legal disclaimer. "Claude proposes, you steer" earns its place because the paragraph under it does the work. Ralph lands as a genuine lever: the actual shell loop is on the page, framed as a practitioner reaching for something already in the toolbox, and explicitly tied back to the named verifier vocabulary ("Ralph re-feed entered the practitioner vocabulary"). The Simpsons reference is one clause, not the joke the section rests on. A senior respects this.

## Persona 2 — Engineer mid-training

Quotes:
- "the SKILL.md of the `session-shaper` skill you authored, in `~/.claude/skills/`"
- "1. What gap in the kit would the next run want closed? Name it as a memory rule, a sharper verifier, or a third skill. Pick the home; do not split."
- "Return a plan with the three answers. No preamble."

Read: RUNNABLE. The prompt has explicit file paths, three numbered constraints, and anti-narration guardrails ("No preamble", "Do not invent", "Pick the home; do not split"). I could paste this tonight and get a real plan back. On the back-reference: the prompt block itself already names the skill — `session-shaper` — AND gives the path `~/.claude/skills/`, so the worry the brief flagged is already fixed *inside the prompt*. No scrollback dependency at the point of execution. The prose lead-ins ("the second skill you just shipped", "the two runs and the second skill") stay looser, but by the time I'm running anything the prompt resolves it concretely. Minor, not blocking.

## Persona 3 — CTO observer

Quotes:
- "Practitioners see levers first. The lever was sitting there in plain shell. Huntley reached for it. The platform watched, and shipped the move native."
- "Months later, Claude Code shipped `/goal`. The runtime version of the same move."
- "That's the M6 leap. The next Ralph is yours."

Read: STAYS PRACTITIONER-SHAPED. "The platform watched, and shipped the move native" is light anthropomorphism but it is pointed *against* vendor-warmth, not toward it — the sentence credits the practitioner (Huntley saw it first) and casts the platform as the follower. The arc is "humans find levers, products catch up," which is the opposite of a vendor pitch. Naming `/goal` is in-bounds (Claude-Code-canonical) and reads as a factual product note, not warmth. The close returns agency: "The next Ralph is yours." No triumphal tilt.

---

## Mood scores (8+ bar)

| Persona | Close score | Notes |
|---|---|---|
| Senior | 9 | Carve-out is the spine; leverage lands as a move |
| Mid-training | 8 | Runnable prompt; prose back-ref slightly looser than prompt block, but prompt resolves it |
| CTO | 9 | Practitioner-shaped throughout; "platform watched" deflects warmth rather than courting it |

No beat below 8. "Unleashed leverage" lands as a runnable move (the prompt + "The next Ralph is yours"), not a slogan. The load-bearing "What this is not" beat holds.

## Sharpest recommendation (optional polish, not a REVISE)

Tighten the *prose* back-reference to match the prompt block's precision: in "The move" and "A prompt to try", "the second skill you just shipped" could read "the `session-shaper` skill you authored at Module 6". The prompt already does this; aligning the prose removes the one place a slower reader has to reconstruct which skill is meant. Cosmetic — the lecture passes as-is.
