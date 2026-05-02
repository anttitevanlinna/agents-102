# Eval Instance — Bootstrap / Personal site with guardrails exercise

Filled-in instance of `curriculum/evals/exercise.md` for the Module 1 (Getting Going) exercise in the Bootstrap training.

**Target exercise file:** `curriculum/exercises/personal-site-with-guardrails.md`

**Eval runs:**
- 2026-04-17 (pass 1) — **APPROVE WITH TODOs** — 12/14 pass (Facilitator briefing deferred, Prompt design N/A). 472 words. Antti caught: prompts were inline-or-missing; Phase 5 "optional" hedging.
- 2026-04-17 (pass 2) — **APPROVE** — 14/14 judges pass. 540 words. Prompts promoted to first-class copy-paste blocks (conversation-after in Phase 2, copy-paste-data-after in Phases 3/5). Phase 5 "optional" removed — required phase. Prompt design judge now applies and passes.
- 2026-04-17 (pass 3) — **APPROVE** — 14/14 judges pass. 450 words. Four simulation-caught fixes applied (Phase 1 save drop, Phase 4 Claude-driven comparison, Phase 2 Q3 fallback, Phase 5 "keep the edge"). Judge note: "Pass 3 tightened three rough edges without touching the arc — stronger than pass 2, same 14/14."
- 2026-04-17 (pass 4) — Antti caught: "add X to context and regenerate" language in Phases 3 and 5 prompts reads as APPEND, producing a bullet list rather than voice rewrite. Updated both prompts to direct Claude to REWRITE using X as voice-shaping context. New prompt-design rule captured in CLAUDE.md + SKILL.md; "append-vs-integrate default" added to simulation protocol's known Claude-behavior patterns. Eval not re-run — content change is additive clarification, no judge criterion affected.

**Simulations:**
- 2026-04-17 — SVP-HR persona (Marja, Nordic software company, weekly ChatGPT user, never built an agent). Arc flow strong; Phase 2 colleague-guide was the big leap; Phase 5 mirror landed emotionally. "This is me" score 7/10. Surfaced four issues the judge missed: (1) Phase 1 "save this output" undefined in Claude Code; (2) Phase 4 "read it. read the current version." excessive cognitive load — also flagged directly by Antti; (3) Phase 2 Q3 story ask stalls participants without a crisp example; (4) Claude's niceness tax softens Phase 5 flips into generic virtues. All four fixed in pass 3 of the exercise file. Simulation protocol updated with these as known Claude-behavior patterns to check.

---

## The judges

### Primary — the leap test

After completing this exercise, the participant can:
- **Describe in their own words** how layered context shapes LLM output — not in abstract, but pointing to specific moments in the six phases where adding context changed what Claude produced
- **Articulate their own colleague-guide value prop** (a specific role, a specific problem, how they help) — reusable beyond the exercise
- **Point to at least one thing** their Phase 1 site claimed that was empty or wrong, recognizing it as statistical filling-in, not a Claude bug

If a basic chat user (never built anything with an LLM) walks out able to do these three things AND says "this is me" about their final site, it's good enough.

### Framing fidelity

Leads with Module 1's Big Idea: **With the right guardrails, you create output that's genuinely yours — not generic.** The colleague-guide frame is StoryBrand-for-work-life (buyer-as-hero, you-as-guide). The mirror technique uses hate-list → flip as a diagnostic for what you're great at.

Avoids:
- Framing guardrails as "restrictions" (they're preference written down)
- Framing differentiation as "what I'm not" without the "who I serve" frame (anti-positioning without buyer = just venting)
- Framing the site as marketing-for-clients only (this is colleague-facing too)

### Learning goal fit

Enables these LOs from `trainings/bootstrap/getting-going.md`:
- **Generate** a real personal artifact — Phase 1 and every regenerate
- **Apply** a structured guardrail — each phase adds context as guardrail
- **Identify** fabrication in LLM output — Phase 4 (three things Phase 1 claimed that are empty/wrong)
- **Adjust** guardrails to fix specific failure modes — the whole iterative arc

### Module-to-module arc

Picks up from **the Context is King lecture** (same mechanism: context shapes output, shown live).
Hands off to **Module 2 (Building Agent Systems)** via the closing "The same mechanism scales" line — context scaled into a system that remembers.

### The teaching moment lands

The exercise reliably produces these ahas:
- **"My Phase 6 version is specifically me."** — through six layered context additions, the site moves from generic to personal.
- **"Phase 1 had empty claims I didn't notice until I saw the contrast."** — the look-back in Phase 4 forces fabrication recognition.
- **"The LLM didn't get better; I did."** — the Point section names this directly; the six-phase progression earns it.

### Riffs on a recognized framework

The exercise riffs on two best-in-class business concepts:
- **StoryBrand (Donald Miller) — buyer-as-hero / you-as-guide.** Phase 2's five questions are a work-life translation: colleagues are the hero, the participant is the guide.
- **Mirror positioning / via negativa.** Phase 5 inverts the hate-list — what you hate points at what you love and are great at. Named in Nassim Taleb's work as a diagnostic; also the Bosser anti-positioning stance ("action, not analysis" is a flip).

Both are integrated, not decorative — the exercise IS the application of these frames.

### Failure modes named

What can go wrong, and how facilitator can diagnose (deferred to facilitator-notes pass):
- Phase 2 answers that are still generic → ask for a real recent situation with a named colleague
- Phase 3 strengths that don't serve anyone specific → push back to Phase 2's buyer
- Phase 5 hate-list that doesn't flip cleanly ("I hate long meetings" → "I love short meetings" is weak) → push to name what SHAPE of meeting they love instead

### Time-boxed

**Target: 45 minutes.** Banter welcomed. This is Module 1's centerpiece and it should breathe. Under 35 = rushed; over 55 = losing energy.

### Facilitator briefing complete

**Deferred per student-facing-first principle.** Will include watch-fors for the failure modes above, per-phase timings, Claude Code setup notes.

### Scaffold / worked example provided

Participants haven't written a colleague-guide frame or done the mirror technique before. The exercise provides:
- Five concrete questions for the colleague-guide frame (Phase 2) — each with an example answer shape
- Explicit flip example in Phase 5 ("vague strategy → concrete action plans") demonstrating the mirror move
- A working expectation ("add this to context, regenerate, notice") at each phase that removes ambiguity about what Claude interaction looks like

No LLM-as-judge prompts — nothing to copy-paste, so the Prompt design judge doesn't apply.

### Plug points real

Participant uses:
- Their own LinkedIn profile
- A real colleague situation they've been in
- Real work hates
- Their actual taste in styling

Nothing pre-built for any specific participant.

### Voice

Second person, builder, no consultant-speak, no LLM-tell words.

### Length

**Target: 400–700 words.**

### Specificity

Named phases (1–6), concrete examples ("40-page platform doc," "vague strategy → concrete action plans"), explicit actions per phase, real participant artifacts.

---

## Auto-fail red flags

- Framed as a "personal brand quiz" or "exercise in self-promotion"
- Colleague-guide frame pre-filled for the participant
- No time estimate
- Uses a fake LinkedIn / toy profile
- Any LLM-tell word
- Participant could plausibly finish Phase 6 without feeling "this is me"
- First or third person
- Frontmatter YAML block
- More than one H1
- Copy-paste prompt with inline `[BRACKET]` placeholders

---

## LLM-as-judge prompt

See the prompt at the bottom of `curriculum/evals/exercise.md`. Paste this instance's judges section + the target exercise file into the `[PASTE]` blocks.
