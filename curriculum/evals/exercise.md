# Exercise Eval — Curriculum Content

Reusable eval system for curriculum exercise files across all trainings. Exercises are evaluated on whether they reliably produce the intended teaching moment when facilitated.

**This eval, like the lecture eval, is a steering eval.** Same flywheel point.

## How to use

For any exercise being written or revised:

1. **Read the target module file** to pull: Big Idea, learning goals, previous/next exercise, the specific teaching moment this exercise must engineer.
2. **Fill in the eval** below — replace every `[BRACKET]`.
3. **Run the eval** — LLM-as-judge prompt at bottom of this file.
4. **Iterate** — fix anything flagged. Re-run.
5. **Antti approves.** Evals catch epistemic problems; Antti catches taste.

---

## The judges

### Primary — the leap test  *(Antti steers)*

After completing this exercise, the participant can:
- [SPECIFIC OUTCOME 1 — observable behavior grounded in the exercise's teaching moment]
- [SPECIFIC OUTCOME 2]
- [SPECIFIC OUTCOME 3 — ideally tying to their own work]

If a builder leader (not a dev) walks out of this exercise able to do these three things, it's good enough.

### Framing fidelity *(universal)*

The exercise leads with the module's Big Idea: **[BIG IDEA FROM MODULE FILE]**.

It avoids these anti-framings:
- [ANTI-FRAMING 1 — wrong default mental model]
- [ANTI-FRAMING 2]

### Learning goal fit *(universal)*

Enables these Bloom-tagged learning goals from the module file (the exercise that covers the other LOs in the module may differ):
- [LG 1 — verbatim]
- [LG 2]

### Module-to-module arc *(universal)*

Picks up from **[PREVIOUS EXERCISE OR MODULE — one-phrase hook]**.
Subtly hands off to **[NEXT EXERCISE OR NEXT MODULE — one-phrase hook]**.

### The teaching moment lands *(exercise-specific — essential)*

The exercise is designed to reliably produce this aha:
- **[NAMED TEACHING MOMENT — e.g., "my criterion caught something my convergence eval couldn't"]**

If reasonable variation in participant skill can skip the moment, the exercise is fragile.

### Failure modes named *(exercise-specific)*

What could go wrong when a participant runs the exercise, and how the facilitator diagnoses and corrects:
- [Common failure 1 → diagnostic → fix]
- [Common failure 2 → diagnostic → fix]

### Time-boxed *(exercise-specific)*

Realistic time estimate. Target: **20–30 minutes.** Banter and peer conversation are part of the design — don't try to compress the conversation out. Over 45 = too big. Under 10 = too shallow.

### Facilitator briefing complete *(exercise-specific — essential)*

- **Watch-for** notes for participant confusion
- **Decision points** for pacing (extend vs. skip vs. push-harder)
- **Plug points** (what each participant brings)
- **What to do if a participant stalls past [N] minutes**

### Riffs on a recognized framework *(exercise-specific — essential for business-skill exercises)*

The exercise anchors the new LLM skill on a framework or concept participants likely already know (or have at least heard of) from their business context. Examples: StoryBrand's buyer-guide, strategy-as-assumptions (Roger Martin), Voice of Customer, Toyota Kata, principle of least privilege, Jobs-to-be-Done, Double Diamond, compound reliability math.

Why: participants are busy professionals; LLM work is new. A recognized framework gives the new thing a familiar hook. Three benefits stack:
- **Cognitive economy** — they don't learn two new things at once; the LLM behavior hangs on the framework they already have
- **Transferability** — they carry BOTH the AI skill AND the framework back to work
- **Engagement** — riffing on known best-in-class concepts beats generic toy exercises

Check:
- **Named framework / concept** — the exercise can point at one or two recognized frameworks it riffs on
- **Integrated, not decorative** — the framework is pedagogically central, not just mentioned in passing
- **Best-in-class** — not vendor fluff, not outdated consultancy theatre

Rare exception: purely technical drills where no business framework naturally applies. Default: business-skill exercises riff on frameworks.

### Scaffold / worked example provided *(exercise-specific — essential)*

If the exercise asks the participant to produce an artifact type they haven't built before (LLM-as-judge prompts, skills files, eval criteria, multi-agent handoff formats, etc.), the exercise must provide ONE of:

- An inline **template/scaffold** (copy-pasteable prompt with no mid-prompt placeholders — see Prompt design)
- A **worked example** from an adjacent domain they can adapt
- An **earlier exercise** that built the same artifact type (with an explicit pointer)

Participants don't create patterns from thin air. Don't assume craft. Check: is every artifact in this exercise either familiar from a prior module or scaffolded here?

### Prompt design *(exercise-specific — essential when the exercise includes any prompt the participant copies into Claude Code)*

- **No placeholders mid-prompt.** No `[BRACKETS]` the participant must find-and-replace inline. Editing inline in Claude Code is tedious.
- **Handle variable content** via: (1) conversation before (Claude asks, then assembles the prompt), (2) conversation after — preferred for simple input (the prompt instructs Claude to ask questions in turn), or (3) copy-paste right after the prompt (user copies prompt, then pastes data as follow-up message).
- **Paragraph structure** for human readability if the prompt is longer than a few lines. No wall-of-text prompts.
- **Under ~1 page.** Long is fine if it earns its keep; wall of text is not.

### Plug points real *(exercise-specific — essential)*

Participant brings their own initiative's data, criterion, output. Never generic. Never pre-built for them (unless that's the explicit design — e.g., trainer-provided compliance skills in Module 4).

### Voice *(universal)*

- **Main body writes TO the student about their journey.** No facilitator instructions (*"Have the room do X"*, *"Tell participants Y"*) in the body. Those belong in facilitator notes (deferred artifact). The reader is the student. Speak to them directly: *"You'll paste…"*, *"Ask Claude…"*, *"Pair up and show your neighbor…"*
- **Trailing sections below a `---` horizontal rule are allowed.** That space holds editorial metadata (TODOs, iteration log) AND facilitator notes (watch-fors, timings, decision points) for now. Facilitator notes will be extracted to a dedicated artifact later — don't mix them into the student-facing body.
- Second person (`you`, not `the participant`, not `the room`)
- **Seth × Rory × Risto flavor, not dry textbook.** Builder voice ≠ dry voice. Seth-warmth, Rory-reframes, Risto-honesty. Questions to the reader welcome (sprinkled). Dryness is a failure mode.
- No consultant-speak
- No LLM-tell words: `honest`/`honestly`, `delve`, `landscape` (as verb), `importantly`, `crucial` (padding)

### Length *(universal)*

**Target: 400–700 words.** Exercises are instructions + facilitator notes, not prose.

### Specificity *(universal)*

Named mechanics (exact prompts, score scales, expected output shapes), named artifacts from earlier modules, realistic participant dimensions.

---

## Essential vs contributory (what can TODO, what can't)

**Essential (must pass):**
- Primary leap test
- Framing fidelity
- Learning goal fit
- Module-to-module arc
- Teaching moment lands
- Riffs on a recognized framework (when applicable — business-skill exercises)
- Facilitator briefing complete
- Scaffold / worked example provided
- Prompt design (when applicable — exercise includes copy-paste prompts)
- Plug points real
- Auto-fail red flags (none triggered)

**Contributory (can TODO):**
- Failure modes fully named
- Time estimate precision
- Voice polish
- Length
- Specificity depth

## Auto-fail red flags

- Framed as "test" or "validation check"
- Participant's criterion / artifact pre-built for them (unless explicit design)
- No time estimate
- LLM-tell words
- Uses toy data instead of participant's own initiative
- Exercise could plausibly run without producing the teaching moment
- **Asks participant to produce an unfamiliar artifact type from thin air** — no scaffold, no template, no worked example, no prior exercise that built the same pattern
- **Copy-paste prompt with inline `[BRACKET]` placeholders** the participant must find-and-replace — the exercise must use conversational or copy-paste-after patterns instead
- More than one H1
- Contains `---` YAML frontmatter

---

## LLM-as-judge prompt

Copy-paste into a Claude agent. Replace the `[PASTE]` blocks.

````
You are evaluating a curriculum exercise for Agents 102. Score it against the filled-in eval below. Be strict.

THE FILLED-IN EVAL:
---
[PASTE: the filled-in `## The judges` section]
---

THE EXERCISE:
---
[PASTE: complete exercise markdown]
---

Return:

**Auto-fail red flags triggered:**
- [List with quote, or "None."]

**Per-judge scoring:**

| Judge | Pass / Fail | Evidence |
|---|---|---|
| Primary — leap test | | |
| Framing fidelity | | |
| Learning goal fit | | |
| Module-to-module arc | | |
| Teaching moment lands | | |
| Riffs on a recognized framework | | |
| Failure modes named | | |
| Time-boxed | | |
| Facilitator briefing complete | | |
| Scaffold / worked example provided | | |
| Prompt design (if applicable) | | |
| Plug points real | | |
| Voice | | |
| Length | | |
| Specificity | | |

**Verdict:** [APPROVE | APPROVE WITH TODOs | REVISE]

**Top 3 items to fix / defer / sharpen:**
1.
2.
3.

**One-sentence overall read:**

Be specific. Quote where possible. Don't hedge. Report word count.
````
