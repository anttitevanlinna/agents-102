# Simulation protocol — Class A (persona-reader)

Loaded when running step 6 (simulate/test) of the PDCA loop in `SKILL.md`. **Persona-reader sim** — the reader's lens. For the agent's lens (per-prompt behavior + risk catalog), see `simulation-behavior.md` (Class B). The two classes run in parallel, each with its own trace cache and judge consumer.

**Scope of this file (Class A):** persona walks the artefact phase by phase and records what they'd paste, what confused them, and how the mood lands. **Out of scope here:** predicting Claude's responses or flagging behavioral risks the prompt invites — that's Class B. Class A used to do both; the prediction surface moved to Class B in 2026-05-02 because mechanical execution is the ground truth on what Claude actually does, while Class B reasons over the *distribution* of Claude responses for files that have no mechanical runner.

**When to use:** After a first draft of any exercise (required) or lecture (optional — less useful for demo-script lectures; more useful for prework-reading). Before the formal eval. Can be repeated with different personas via `/eval-fire story --personas N`.

**How to run:** the storytelling judge invokes Class A automatically when its cached trace is missing or per-phase SHA stale. Manual invocation is rare; if needed, launch a general-purpose agent with the prompt template below.

**The persona is never alone.** Bootstrap exercises are facilitated in two modes — *in-room* (human trainer) and *self-study* (Teacher Claude running in a side session, configured by the `/self-study` skill to nudge the student through the 4 Cs). **Default simulations to self-study mode** unless the prompt explicitly names in-room. Teacher Claude covers the facilitator role: it asks *"find me one row the judge got wrong"* when the student rubber-stamps Phase 3, pushes on ambiguous artifacts, runs the Debrief. A simulation that penalises an exercise because *"the solo SVP has no facilitator nudge"* is simulating the wrong setup — the SVP has Teacher Claude. Name Teacher Claude explicitly in the persona block so the simulator accounts for it, and tell the simulator to surface nudges Teacher Claude would make at each phase.

**Mood judge — scored alongside mechanics.** Per the eval rubric, every exercise is scored 1–10 for mood landing at each phase-end and at close (8+/10 required). The simulation must report the mood score per beat and name what steals the mood where it drops below 8. A 7/10 is the facilitator-premium signature — meaning the mood lands in a trainer-facilitated room but frays elsewhere; treat 7 as "find what's stealing the mood," not "good enough."

**Prompt template** (copy this into the agent invocation):

```
You are simulating a student running a curriculum exercise for Agents 102. Role-play a typical participant, follow the exercise instructions end to end, and report where things break. Independent judgment — the author won't see your reasoning.

TARGET EXERCISE: [file path]

PERSONA: [describe — role, seniority, LLM fluency, business context. Example: "SVP of HR at a 500-person Nordic software company. Has used ChatGPT weekly for drafting emails and performance reviews. Never built an agent, never used Claude Code before today. Arrived at this exercise having watched the Context is King lecture 15 minutes ago."]

DELIVERY MODE: self-study. Teacher Claude is running in a side session (configured by the /self-study skill) and plays facilitator — it nudges through the 4 Cs, pushes on ambiguous artifacts, runs the Debrief, and catches rubber-stamping (*"find me one row the judge got wrong"*). Account for Teacher Claude at every phase; the student is NOT alone.

MODULE MOOD CONTRACT: [state the module's deliberate mood — e.g., "Module 6 is unleashed leverage; student should leave feeling 'we can automate the loop.'" Pull from `bosser-strategy:content-strategy.md` per-module Mood (deliberate) paragraph.]

ASSUME you have completed any prior module/lecture setup the exercise references.

FOR EACH PHASE:
1. Describe what you would paste or do — make up realistic content in your persona's voice (`persona_action`)
2. Flag any moment you're confused, stuck, or unsure what the exercise wants (`confusion_flags`)
3. Record the state after the phase — what artifact you now have (`artifact_state`)
4. **Mood score 1–10** at phase-end + one-line note on what the student is feeling (match against the module mood contract; flag drift) (`mood_score`, `mood_note`)

DO NOT predict what Claude would return. DO NOT flag Claude-behavior mismatches. Both moved to Class B (`simulation-behavior.md`) and are owned by the prompt-behavior judge. If a mechanical-tested transcript exists for this file (named in the file's Quality line as `mechanical-tested @ <sha>`), read it for ground-truth `artifact_state` instead of guessing.

AT THE END, report:
- **Top 3 ambiguous instructions** (quote them) — confusion the prompt creates by being unclear, not Claude misbehaving
- **Any under-scaffolded phase** where even Teacher Claude can't recover
- **Overall "this is me" / artifact quality rating** 1–10
- **Mood summary**: score per phase + close, and a one-line *"what's stealing the mood"* note for any beat below 8. 8+/10 at every beat is the bar. 7 = facilitator-premium signature; say what would take it from 7 to 8.
- **Arc flow** — does one phase feed the next?

Be specific. Use your persona's voice. If the exercise has a flaw a *reader* would feel, you'll notice it. Behavioral failures of the *prompt* belong to Class B. Under 600 words.
```

**What Class A persona-sim catches that nothing else does:**
- **Ambiguous instructions** that seem clear on paper but trip a real participant
- **Under-scaffolded phases** — where the participant has to infer too much
- **Arc flow breaks** — where Phase N doesn't feed Phase N+1 smoothly
- **"This is me" failures** — the final artifact rating shows if the emotional payoff actually lands
- **Mood landings per beat** — the only place this is measured

**Claude-behavior risks now live in Class B** (`simulation-behavior.md`). The 15-pattern catalog (niceness tax, question dump, overwrite anxiety, etc.) is consumed by the prompt-behavior judge, which reasons over the *distribution* of Claude responses per prompt. Class A doesn't predict Claude — that prediction surface was the largest token cost and the most hallucination-prone field, and it's now owned by Class B with a structured per-prompt schema.

**Prework-specific patterns:**
- **Install cliff** — "install Claude Code" is a 25-min side quest if you land on the CLI path with no Node. For non-developer audiences, specify **desktop or web** explicitly. "No terminal required" is a real affordance worth stating.
- **Connector admin gate** — Microsoft 365 / Google Workspace connectors often need tenant admin consent. A builder leader can't self-serve through this on a Sunday. Every connector instruction needs a **fallback path** (screenshot-paste, CSV export, manual copy) that works without admin.
- **Ghost file references** — referencing `foo.md` in prework when `foo.md` doesn't exist yet is a hard fail. Either ship the file (write the section, even if minimal) or inline the content. Don't reference files that live in a future pass.

**Multi-persona simulation:** for high-stakes exercises, run 2-3 simulations with different personas (CTO, marketing lead, HR director) to surface persona-specific breakage. Not required for every exercise.

**For strong-audience trainings (engineers, senior ICs, CTOs), three-persona sweep is the default.** Cover the audience triangle: (a) mid-layer competent — follows instructions, catches structural gaps; (b) opinionated senior — rejects scripted moves, catches register smell, quotes lines they'd argue with; (c) fast operator — reads for value-add vs. remediation, catches where content condescends to already-competent practice. Single-persona sim over-indexes on the persona's failure mode; three-persona sim surfaces **two failure modes a mid-layer sim misses**: scripted-vs-skill framing (senior refuses performance) and register smell (senior hallucinates pep-talk lines when the prose is too warm even where specific sentences are clean).

## Student-facing first, facilitator notes later

A lecture or exercise file contains both student-facing content (what the room sees and does) and facilitator notes (timing, watch-fors, decision points, pacing). **Generate the student-facing content first.** Get the demo, the priming, the teaching moment, the transition right. Facilitator notes are a later pass — added when the content stabilizes.

Why: iterating on facilitator pacing while the student content is still in flux is wasted work. The demo changes → the timing estimates are wrong → the watch-fors are wrong. Lock the content; annotate the delivery second.

The exercise eval's "Facilitator briefing complete" judge applies at Pass 3 completion, not at first draft. A first-draft lecture or exercise can ship APPROVE WITH TODOs where the TODO is "add facilitator notes."
