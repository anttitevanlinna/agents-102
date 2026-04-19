# Eval Instance — Bootstrap / Groundedness eval exercise

Filled-in instance of `curriculum/evals/exercise.md` for the "Groundedness eval" exercise in Module 6 (Evaluations) of the Bootstrap training.

**Target exercise file:** `curriculum/exercises/groundedness-eval.md`

**Eval runs:**
- 2026-04-19 (pass 1) — pending.

---

## The judges

### Primary — the leap test

After completing this exercise, the participant can:
- **Build an LLM-as-judge** that reproduces Module 5's five-category claim classification on any briefing, saving the judgment to disk as a durable artifact.
- **Run the convergence loop** — judge → regenerate → judge — on their own Module 5 briefing until the output clears a stated threshold, and articulate why convergence is a loop, not a fix.
- **Catch the judge being wrong** on at least one row (too lenient, too strict, or about right) and adjust the criterion in their own words — the "the eval is itself an assumption" landing.

If a builder leader walks out able to do these three things, it's good enough.

### Framing fidelity

The exercise leads with: **Evals are strategic steering — and convergence is the floor. A groundedness judge industrialises the hand-check from Module 5.**

It avoids:
- Framing evals as "tests" or "validation checks"
- Framing the judge as a truth — it's an assumption that iterates
- Treating convergence as sufficient (ceiling lives in the Steering eval exercise)
- Making the exercise feel like setup for a later module (M6 mood is leverage, not preparation)

### Learning goal fit

Enables these LOs from `trainings/bootstrap/evaluations.md`:
- **Build** an eval that automates the Module 5 manual quality check
- **Iterate** the eval itself as an assumption to be tested
- **Distinguish** convergence evals (looping to a desired outcome) from steering evals (encoding preference)

(The Design LO — custom criterion that encodes what matters to YOU — is covered by the Steering eval exercise.)

### Module-to-module arc

Picks up from **Module 5's Ground your output exercise — the five-category hand-classification and the `still-uncertain.md` line.**
Subtly hands off to **the Steering eval exercise — convergence is the floor, steering is the ceiling.**

### The teaching moment lands

The exercise is designed to reliably produce these ahas:
- **"The machine just did what my eye did yesterday — and it'll do it tomorrow while I sleep."** Leverage as a felt experience, not a concept.
- **"The judge was wrong about this row."** The eval-as-assumption beat — the loop runs on the output AND on the criterion.

If either aha can be missed under reasonable participant variation, the exercise is fragile.

### Failure modes named

What can go wrong and how the facilitator diagnoses:
- Participant runs the judge once, gets a pass/fail, and stops → *"You built the loop, not a single run. Re-run on v2 and see the shape shift."*
- Briefing-v1 is so ungrounded the convergence loop churns for 4+ passes → name it as outline-level rewrite, not line-edit (different failure mode).
- Participant trusts GROUNDED calls uncritically → Phase 3 is the inoculation; enforce it.
- Threshold paralysis (*"is 80% right?"*) → *"The threshold is a dial, not a truth. Pick a default, the loop picks it up."*
- Judge prompt skips read-from-disk and asks for paste → correct; paste-and-classify hides the leverage.

### Time-boxed

**Target: 25–30 minutes.** Shares the Module 6 exercise slot with the Steering eval exercise (two exercises fit because both reuse the same M5 target material and loop shape). Phase 1 8–10 min, Phase 2 8–10 min, Phase 3 8–10 min. Banter welcomed.

### Facilitator briefing complete

Must include:
- **Watch-for** notes (one-pass stoppers, judge-trusting readers, threshold paralysis)
- **Decision points** (stuck in Phase 1 past 10 min → hand reference prompt; clean pass at 15 min → push to Phase 3 and insist on criterion adjustment)
- **Plug points** (student's own M5 briefings, student's own threshold calibration, student's own criterion adjustment)
- **Pacing** per phase

### Riffs on a recognized framework

The exercise anchors on:
- **LLM-as-judge** — canonical evals pattern
- **Convergence loop** — iterative optimisation shape (PID / gradient descent without the math) — the student feels the delta shrink each pass
- **Eval-as-hypothesis** — strategy-as-assumptions (Roger Martin) extended to the eval itself; carries forward to Module 8's "what would have to be true for these evals to be the right ones?"
- **Citation cargo-culting** — named failure mode from M5 that Phase 3 re-surfaces

### Scaffold / worked example provided

Participants have never written an LLM-as-judge prompt before. The exercise provides:
- An **inline copy-pasteable Phase 1 prompt** that builds the judge conversationally (asks for briefing path, source directories, and threshold; no mid-prompt placeholders)
- An **inline copy-pasteable Phase 2 prompt** that closes the convergence loop (takes the judgment file, regenerates only failing rows, re-runs the judge)
- **Explicit reuse** of Module 5's five-category frame — the classification discipline was built yesterday; today is automation, not new vocabulary

### Prompt design

Both inline prompts follow the rules:
- **Conversational** — the judge prompt instructs Claude to ask for paths and threshold
- **No mid-prompt placeholders** — nothing for the participant to edit inline
- **Paragraph structure** preserved
- **Under 1 page each**
- **Read-from-disk** — avoids paste-size brittleness

### Plug points real

Participant uses:
- Their own `module-5/briefing-v1.md` and `module-5/briefing-v2.md` (from the M5 exercise)
- Their own source files from Module 2–3 curation
- Their own threshold calibration
- Their own criterion adjustment in Phase 3

Nothing pre-built by the trainer for the participant's specific initiative.

### Business-audience language

Read the student-facing body as an SVP marketing lead with zero technical background. No unearned tech jargon — `LLM-as-judge` is introduced in the lecture and named here as the mechanic; `convergence loop` earns its keep through the lived experience of Phase 2.

### Voice

Second person, builder style, Seth × Rory × Risto flavor. No LLM-tell words.

### Length

**Target: 400–700 words for the student-facing body** (above the `<!-- maintainer -->` cut). The maintainer section is unbounded.

### Specificity

Named mechanics (five-category frame, threshold 80%+ GROUNDED with zero MISREPRESENTS, `module-6/eval-runs/run-<timestamp>.md` save path, three-pass normal shape), named artifacts from prior modules (M5 briefings, M2–M3 sources), concrete criterion-adjustment examples in Phase 3.

---

## Auto-fail red flags

- Exercise framed as "testing" or "validating" the output
- The participant's criterion is pre-built or picked for them
- No time estimate
- Uses toy data instead of the participant's own M5 briefings
- Any LLM-tell word
- Exercise can plausibly run to completion without producing either teaching moment
- First person or third person (must be second)
- Contains `---` YAML frontmatter
- More than one H1
- Copy-paste prompt with inline `[BRACKET]` placeholders

---

## LLM-as-judge prompt

See the prompt at the bottom of `curriculum/evals/exercise.md`. Paste this file's judges section + the target exercise file into the `[PASTE]` blocks.
