# Simulation — Class A (persona-reader)

PDCA step 6. Reader's lens; agent's lens = `simulation-behavior.md` (Class B). Run parallel, separate trace caches, separate judges.

**Scope:** persona walks artefact phase by phase, records what they'd paste, what confused them, how mood lands. Predicting Claude's responses = Class B (moved 2026-05-02 — mechanical is ground truth, Class B reasons over distribution).

**When:** after first draft of any exercise (required) or prework/reading lecture (optional). Before formal eval. Repeat with multiple personas via `/eval-fire story --personas N`.

**Auto-fire:** storytelling judge invokes when cached trace missing or per-phase SHA stale. Manual = launch general-purpose agent with template below.

**Delivery mode = classroom (in-room).** Cohort + human trainer. Author the persona walking through with the room around them.

**Mood judged alongside mechanics.** 1–10 per phase-end + close, 8+/10 bar. 7/10 = facilitator-premium signature; treat as "what's stealing mood," not "good enough." Full rubric: `curriculum/evals/exercise.md` / `lecture.md`.

## Prompt template

```
You are simulating a student running a curriculum exercise for Agents 102. Role-play a typical participant, follow the exercise instructions end to end, and report where things break. Independent judgment — the author won't see your reasoning.

TARGET EXERCISE: [file path]

HOW TO READ THE TARGET FILE: source `.md` files use `{{prompt:<key>}}` markers in place of inline `**Prompt**` fenced blocks (the curriculum-prompts registry refactor). Run `node /Users/anttitevanlinna/Projects/agents-102/scripts/expand-md.js [file path]` and use the EXPANDED output as the exercise under simulation — that's what students and the workbook see post-render. Files with inline blocks pass through unchanged.

PERSONA: [describe — role, seniority, LLM fluency, business context. Example: "SVP of HR at a 500-person Nordic software company. Has used ChatGPT weekly for drafting emails and performance reviews. Never built an agent, never used Claude Code before today. Arrived at this exercise having watched the Context is King lecture 15 minutes ago."]

DELIVERY MODE: in-room (cohort + human trainer). The trainer demos on a projected screen; the room copy-pastes the same prompt concurrently. The trainer reads the room, nudges on ambiguous artifacts, runs the Debrief.

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
- **Any under-scaffolded phase** where even the trainer can't recover
- **Overall "this is me" / artifact quality rating** 1–10
- **Mood summary**: score per phase + close, and a one-line *"what's stealing the mood"* note for any beat below 8. 8+/10 at every beat is the bar. 7 = facilitator-premium signature; say what would take it from 7 to 8.
- **Arc flow** — does one phase feed the next?

Be specific. Use your persona's voice. If the exercise has a flaw a *reader* would feel, you'll notice it. Behavioral failures of the *prompt* belong to Class B. Under 600 words.
```

## What Class A uniquely catches

- Ambiguous instructions that read clear, trip real participant
- Under-scaffolded phases (participant infers too much)
- Arc flow breaks (Phase N → N+1 jarring)
- "This is me" failures (artefact rating shows emotional payoff)
- Mood landings per beat (only measured here)

Claude-behaviour risks → Class B's 15-pattern catalog.

## Prework-specific

- **Install cliff** — "install Claude Code" = 25-min side quest on CLI path without Node. Non-developer audiences: specify desktop or web. "No terminal required" is a real affordance.
- **Connector admin gate** — M365 / Workspace often need tenant admin consent. Builder leader can't self-serve Sunday. Every connector instruction needs fallback (screenshot-paste, CSV export, manual copy) that works without admin.
- **Ghost file references** — referencing `foo.md` that doesn't exist yet = hard fail. Ship file (even minimal) or inline.

## Multi-persona

High-stakes exercises: 2–3 personas (CTO, marketing lead, HR director) surface persona-specific breakage.

Strong-audience trainings (engineers, senior ICs, CTOs): three-persona default. Cover triangle: (a) mid-layer competent — follows, catches structural gaps; (b) opinionated senior — rejects scripted moves, catches register smell, quotes lines they'd argue with; (c) fast operator — reads for value-add vs remediation, catches condescension. Single-persona over-indexes; three surfaces scripted-vs-skill framing + register smell that mid-layer misses.

## Student-facing first

Generate student-facing content first; facilitator notes (timing, watch-fors, decision points, pacing) are a later pass when content stabilises. "Facilitator briefing complete" judge applies Pass 3, not first draft. First-draft can ship APPROVE WITH TODOs where TODO = "add facilitator notes."
