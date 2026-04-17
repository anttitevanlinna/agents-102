# Eval Instance — Bootstrap / Steering eval exercise

Filled-in instance of `curriculum/evals/exercise.md` for the "Steering eval" exercise in Module 6 (Evaluations) of the Bootstrap training.

**Target exercise file:** `curriculum/exercises/steering-eval.md`

**Eval runs:**
- 2026-04-17 (pass 1) — **APPROVE** — 12/12 judges pass. But Antti caught a real gap the eval missed: exercise assumed participants could write LLM-as-judge prompts from thin air. New "Scaffold / worked example provided" judge added to the eval template as a result.
- 2026-04-17 (pass 2) — **APPROVE** — 13/13 judges pass (including new Scaffold judge) after revising exercise to add inline scaffold, explicit "Phase 1 IS the template" framing, and closing artifact prompt. Three optional sharpenings logged as TODOs.

---

## The judges

### Primary — the leap test

After completing this exercise, the participant can:
- **Name their own steering criterion in their own words**, anchored to something specific in their initiative — not a borrowed or generic criterion
- **Show a concrete before/after** where that criterion changed the output in a way they can articulate
- **Point to at least one thing their criterion did NOT catch that matters** — the "my eval is also an assumption" landing

If a builder leader walks out able to do these three things, it's good enough.

### Framing fidelity

The exercise leads with: **Evals are strategic steering, not testing. You're encoding preference, not checking correctness.**

It avoids:
- Framing as "tests" or "validation checks"
- Framing as "quality gates"
- Framing as "just for engineers"
- Treating the criterion as a fixed truth (it's an assumption to be tested)

### Learning goal fit

Enables these LOs from `trainings/bootstrap/evaluations.md`:
- **Design** a custom eval criterion that encodes what matters to YOU
- **Iterate** the eval itself as an assumption to be tested
- **Distinguish** convergence evals (correctness) from steering evals (preference)

(The Convergence eval exercise covers the Build LO.)

### Module-to-module arc

Picks up from **the Convergence eval exercise (reliability ≠ differentiation)**.
Subtly hands off to **the "iterate the criterion" realization — which primes Module 7's question: what happens when your eval becomes your team's eval? Trust at scale.**

### The teaching moment lands

The exercise is designed to reliably produce these ahas:
- **"My steering criterion caught something my convergence eval couldn't"** — the gap between correctness and preference becomes lived experience, not a concept from a lecture
- **"The criterion is an assumption"** — participants see the judge rate something 5 they'd rate 3, or vice versa, forcing them to refine the criterion

If either aha can be missed under reasonable participant variation, the exercise is fragile.

### Failure modes named

What can go wrong and how the facilitator diagnoses:
- Participant picks a dimension too close to correctness ("accurate citations") → ask: "What makes YOUR brand's accurate citation different from a competitor's?"
- Reference examples are all 5s (can't articulate the bad) → ask for an example they'd reject from a vendor, and why
- Criterion is too vague to rate consistently → push for a measurable dimension with a clear anchor
- Participant stalls past 8 minutes on picking the dimension → offer three starters (brand voice, depth of insight, strategic differentiation) and adapt

### Time-boxed

**Target: 25–30 minutes.** Banter and pair conversation are part of the design — the exercise is a vehicle for peer learning, not a race to completion.

### Facilitator briefing complete

Must include:
- **Watch-for** notes (at least 2 common participant behaviors)
- **Decision points** (what to do if ahead of schedule, behind, stuck)
- **Plug points** (what each participant brings: their agent's output, their initiative context, their taste)
- **Pacing** (rough time per phase)

### Scaffold / worked example provided

Participants have never written an LLM-as-judge prompt before. The exercise must provide:
- An **inline copy-pasteable prompt** that handles variable content conversationally (no mid-prompt placeholders)
- The **trainer's shared customer-case criterion** framed explicitly as the worked example — Phase 1 isn't just a warmup, it's the pattern demonstration. The exercise should make this explicit: "this is the template you'll adapt."

Without both, the design phase collapses for anyone who hasn't written a judge prompt before — which is every builder leader in the room.

### Prompt design

The inline judge prompt in Phase 2 is the reference pattern:
- **Conversational** — it instructs Claude to ask the participant for the four pieces it needs, in turn
- **No mid-prompt placeholders** — nothing for the participant to edit inline
- **Paragraph structure** preserved for readability
- **Short** — well under a page

### Plug points real

Participant uses:
- Their own agent's output (from Module 2-3 work, not demo data)
- Their own taste / brand voice / domain knowledge
- Their own reference examples (5/3/1 scores — self-authored)

Nothing pre-built by the trainer for the participant's specific criterion.

### Voice

Second person, builder style, no LLM-tell words.

### Length

**Target: 400–700 words.**

### Specificity

Named mechanics (LLM-as-judge, 5/3/1 reference scoring, rerun-on-same-outputs comparison), named dimensions as examples (brand voice, depth of insight, strategic differentiation), concrete starter prompts for stuck participants.

---

## Auto-fail red flags

- Exercise framed as "testing" or "validating" the output
- The participant's criterion is pre-built or picked for them
- No time estimate
- Uses toy data instead of the participant's own initiative
- Any LLM-tell word
- Exercise can plausibly run to completion without producing either teaching moment
- First person or third person (must be second)
- Contains `---` YAML frontmatter
- More than one H1

---

## LLM-as-judge prompt

See the prompt at the bottom of `curriculum/evals/exercise.md`. Paste this file's judges section + the target exercise file into the `[PASTE]` blocks.
