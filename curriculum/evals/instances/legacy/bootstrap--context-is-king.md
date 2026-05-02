# Eval Instance — Bootstrap / Context is King lecture

Filled-in instance of `curriculum/evals/lecture.md` for the "Context is King" lecture in Module 1 (Getting Going) of the Bootstrap training.

**Target lecture file:** `curriculum/lectures/context-is-king.md`

**Format note:** This is a **live demo script**, not a prework reading piece. Length target and judge expectations adapt accordingly — the "body" of the lecture is what the trainer says + does; participants experience it live, not read it.

**Eval runs:**
- 2026-04-17 — **APPROVE WITH TODOs** — 8/8 judges pass, 0 red flags. 386 words (just under 400 floor — eval template updated to 350–600 target for demo-scripts). Two student-facing sharpenings deferred as TODOs; facilitator notes are expected-later per the "student-facing first" principle.

---

## The judges

### Primary — the leap test

After watching this lecture, the participant can:
- **State in their own words** that LLM output is shaped by the entire conversation context, not just the latest prompt
- **Name at least one type of context** beyond a country prime (a role, a preference, a constraint)
- **Anticipate** that the forthcoming CLAUDE.md guardrail is a reusable, written-down version of the same thing they just saw work live

If a basic chat user (has used ChatGPT casually but never built anything) walks out of the 15 minutes able to do these three things, it's good enough.

### Framing fidelity

Leads with the module's Big Idea: **With the right guardrails, you create output that's genuinely yours — not generic.** The lecture establishes context as the mechanism; the exercise (next) lands the personal experience.

Avoids these anti-framings:
- Context as "prompt engineering tricks"
- Context as "what the model was trained on"
- Guardrails as "restrictions" or "safety rails" (negative framing) — they are *preference written down* (empowering framing)

### Learning goal fit

The lecture primes these Bloom-tagged LOs from the module file:
- **Generate** a real personal artifact with an LLM (reader will do this in the exercise, right after)
- **Apply** a structured guardrail and observe the effect (context is the mechanism; guardrail is the reusable instance)
- **Identify** fabrication in LLM output (not yet — Module 5 territory; lecture plants the seed that output is shaped, not retrieved)
- **Adjust** guardrails to fix specific failure modes (not yet — the exercise will)

The lecture **enables** these; it does not **achieve** them.

### Module-to-module arc

This is Module 1 — the entry. Arc pickup = participants' own prior chat experience ("you've chatted with ChatGPT"). Arc hand-off = the Module 1 exercise (Personal site with guardrails), directly via the closing line "That's a guardrail. That's your turn."

### Exercise setup

The lecture primes the **Personal site with guardrails** exercise by setting up:
- Why context matters (makes the guardrail concept land)
- What a CLAUDE.md-style guardrail *does* mechanically (colors all output)
- Hunger for the personal experience (the lecture shows it working on Italian/Finnish dinners; the exercise gives them their OWN stakes)

It does NOT spoil:
- That guardrails make *average become great*
- That the LLM will start fabricating when pushed
- That tightening rules trades off good output too

### Voice

Second person. Demo-driven. Short sentences. No consultant-speak. No LLM-tell words.

### Length

**Target for demo-script lectures: 350–600 words of live script.** Shorter than the 800–1200 prework-reading target — the screen carries most of the content, the script is beats + prompts + naming.

Time in the room: 15 minutes. Current word count: 386.

### Specificity

Named places (Rome, Saimaa), named cuisines (pasta, salmon, rye bread), named role (cardiologist). Exact prompt texts. Concrete enough that any facilitator can reproduce the demo without guessing.

---

## Auto-fail red flags

- Violates framing fidelity (context as "prompt tricks," guardrails as "restrictions")
- Any LLM-tell word (`honest`, `delve`, `landscape` as verb, `importantly`, `crucial` as padding)
- Spoils the exercise's discoveries (output quality transformation, fabrication, tradeoff of tight rules)
- No priming question / audience-prediction beat (this is a live demo — the room must engage, not receive)
- Wall-of-text (paragraph structure mandatory)
- First person or third person (must be second)
- Contains `---` YAML frontmatter
- More than one H1

---

## LLM-as-judge prompt

See the prompt at the bottom of `curriculum/evals/lecture.md`. Paste this file's judges section + the target lecture file into the `[PASTE]` blocks. Note that this is a demo script — apply length judge against the 400–700 word target for demo scripts, not the 800–1200 target for prework reading.
