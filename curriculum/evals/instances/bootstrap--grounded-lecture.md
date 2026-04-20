# Eval Instance — Bootstrap / Grounded (lecture)

Filled-in instance of `curriculum/evals/lecture.md` for the Module 5 (Output Quality and Hallucination Control) in-room lecture. Reshaped 2026-04-20 from "three techniques you'll use" to "four candidates to measure" to prime the hallucination bake-off.

**Target lecture file:** `curriculum/lectures/grounded.md`

**Module:** M5 — Output Quality and Hallucination Control (`trainings/bootstrap/output-quality.md`)

**Setup contract:** Primes the bake-off exercise by reframing three failure-mode detections into four candidate methods to measure empirically. Lands compound reliability math in BOTH directions — single-pass decay (85%^10 ≈ 20%) AND loop-based rescue (10% → 1% → 0.1% → 0.01%). Bridges to M6 as error-rate-collapse mechanism: *"the 85%-to-20% math is the problem; the 10%-to-0.01% math is the answer."*

**Previous module:** M4 (Security / practice of risk) — epistemic stance continues.
**Next module:** M6 (Evaluations) — the judge becomes self-running infrastructure.
**Exercises primed:** `exercises/hallucination-bakeoff.md`.

## Eval runs

- **2026-04-20 (pass 1 on reshape) — APPROVE.** All 9 judges pass; no auto-fail red flags triggered. Word count ~900 (prework-reading band). Loop-math lands as strategic reframe, not tacked on — the `"flip the math"` paragraph is the hinge, and the closing *"85%-to-20% math is the problem; the 10%-to-0.01% math is the answer"* makes the bridge to M6 explicit. Four candidates are named + failure-mode-tagged but NOT scored — exercise-setup discipline holds. SVP-test: no banned jargon in student-facing body (single "subagent" appearance is in maintainer watch-fors, exempt). LLM tell words: clean ("honest answer" appears once as an adjective modifier, not the "honestly, I think…" pattern — acceptable per prior rulings). One sharpen-candidate noted below (contributory).
- **Overall judge note:** *Reshape works. The four-candidate framing matches the bake-off one-to-one without stealing the exercise's discovery beat. Compound math in both directions is the strongest load-bearing move in the piece — it reframes evals from "quality gate" to "error-rate collapse mechanism," which is the M6 thesis landed a day early, in the right way (named as direction, not taught).*

---

## The judges

### Primary — the leap test

After hearing this lecture, a builder leader can:

- **Run the bake-off without re-reading the exercise prompt for orientation.** The reader knows: four detectors will run in parallel on the same briefing, each catches a different failure mode, a meta-evaluator scores them against a gold standard the student writes. They walk into the exercise curious which detector wins on *their* output — not confused about what a bake-off is.
- **Carry the loop math (10% → 1% → 0.1% → 0.01%) as the mental model for why M6 matters.** The single-pass decay (85%^10 ≈ 20%) and the loop-based rescue are twin halves of the same compounding. A student who leaves with only the decay half walks into M6 asking "how do we make the model better?" — the wrong question. A student who leaves with both halves walks into M6 asking "how do we make the loop run without me?" — the right one.
- **Name why method selection is empirical, not authoritative** — the four candidates are candidates because nobody (vendor, framework, blog) can tell you which catches what matters on *your* output. The bake-off IS the method selection.

If an SVP walks out able to do these three things — they can set up the bake-off, explain why the loop collapses the error rate, and resist the "just pick the best method" shortcut — it's good enough.

### Framing fidelity

Leads with the module's Big Idea: **You don't pick a detection method because someone said so. You run several in parallel on your own output, let a meta-evaluator score them against a gold standard you wrote, and keep the winner. Quality is measured, not assumed.**

Avoids:
- **"Three techniques you should use"** — the previous lecture's framing; replaced. Teaching methods-to-know not methods-to-measure was the failure mode of the prior version.
- **"Better model = problem goes away"** — addressed directly ("Later models will fabricate less; they won't stop").
- **"Prompt-engineering tricks can solve this"** — the lecture positions measurement as the discipline, not incantation.
- **"Certainty is available"** — closing names "not certainty… a grounded choice about grounding."

### Learning goal fit

Enables these Bloom-tagged LGs from `trainings/bootstrap/output-quality.md`:
- **Evaluate** detection methods empirically — the lecture frames the bake-off; the exercise runs it.
- **Synthesize** the winning method into a reusable judge file with a "known limit" — lecture names the concept in "what this buys you"; exercise produces the file.
- **Explain** why method selection is empirical — this is the lecture's central move ("Don't pick a method. Run the candidates.").
- **Identify** what a judge can and can't reach — named in closing ("a grounded judge names what it can't catch").

Enables, does not achieve. The lecture does NOT score the four candidates, does NOT assert a winner, does NOT pre-rank. Empirical discovery is preserved for the exercise.

### Module-to-module arc

Picks up from **M4's "practice of risk"** — epistemic stance (discipline + loop, not certainty) continues. Different discipline (grounding vs. risk), same posture. The mood continues from M4's residual uncertainty; M5's rescue is mechanical, not triumphant.

Hands off to **M6 (Evaluations)** — bridge is sharpened and explicit: *"Today you'll run the test side — a bake-off to find the detector that works on your output. Tomorrow you'll put that detector in a loop that runs the full test-fix-test cycle without you. That's evals. That's Module 6. The 85%-to-20% math is the problem; the 10%-to-0.01% math is the answer."* The loop-math is the arc's load-bearing beam.

### Exercise setup

Primes **Hallucination bake-off** without giving away the discoveries:
- Lecture names the four candidates and the failure mode each catches (invention, overreach, citation cargo-cult, inherited fluency). Exercise spawns them as subagents and has the student watch the meta-evaluator score them.
- Lecture does NOT tell the student which detector wins. Exercise lets the scoreboard do that.
- Lecture does NOT specify precision/recall/coverage — those land experientially in the exercise.
- Lecture names "gold standard you write yourself" as a concept; exercise has the student actually write five claims with verdicts.
- Lecture frames the ensemble outcome ("winner or ensemble of top two") so the student isn't confused when the meta-evaluator proposes a two-method stack.

The reader arrives curious which detector will win on their output — which is the right question for a student about to run a bake-off.

### Mood lands *(target: mechanical rescue — "ahh, this is actually fixable")*

Score: **9/10.** The "flip the math" paragraph is the rescue beat — the same compounding that destroys single-pass reliability *builds* loop-based reliability. That reframe is the mood-delivery mechanism. Closing beat ("not certainty… a grounded choice about grounding") holds the rescue narrow — groundedness-for-this-shape-of-output is what gets solved, not quality-in-general. M3 strategic uncertainty and M4 security residual remain untouched.

No stolen mood. Nothing telegraphs the bake-off's winner. The loop math provides the rescue without collapsing M6's teaching moment — it names the *mechanism* (loop + detector + fix) without running it.

### Voice

Second person throughout. No facilitator script in the body. Rory-reframe in *"That's intuition. The move is empirical."* Risto-honesty in *"Later models will fabricate less; they won't stop."* Seth-warmth in closing *"the difference between a memo that holds up and a memo that detonates."*

LLM-tell check:
- `honest` — appears once in *"The only honest answer is to run several candidate methods in parallel…"* — this is the adjective-use pattern (honest as modifier), not the "honestly, I think…" tell. Acceptable; consistent with prior M4 ruling.
- `delve` — no.
- `landscape` verb — no.
- `importantly` — no.
- `crucial` — no.

### Business-audience language

Student-facing body audit (banned list):
- `embeddings`, `vector`/`vector database`, `RAG`, `retrieval` (tech sense), `pipeline` (tech sense), `orchestration`, `schema`, `architecture`, `frontmatter`, `prompt engineering`, `inference` (tech sense), `fine-tuning` — **none appear in student-facing body.**
- `subagent` — appears in maintainer watch-fors only (exempt per lecture.md rule: trailing sections below `<!-- maintainer -->` are exempt).
- `retrieval-augmented generation` — appears once inside an italicised quoted-advice parody (*"use retrieval-augmented generation"*) showing a common wrong frame the lecture is rejecting. Used illustratively to name bad advice, not as an endorsed term. Acceptable; the surrounding frame does the earning.

Earned plainly:
- `grounded` / `ungrounded` / `fabrication` — earned in opening paragraphs.
- `statistical generator` (implied) / `next likely word` — plain-English explanation.
- `compound reliability math` — earned with worked example (85% × 10 = 20%; 95% × 3 = 86%).
- `gold standard`, `precision/recall/coverage` — named briefly, full experiential earning happens in exercise.
- `judge` (in the eval sense) — earned via "judge file" shorthand; grounded in "a rule you can run."

### Length

Target: **800–1200 words** (prework-reading band) per lecture.md. Current: ~900 words. Time-in-room 10–12 min (names delivery as in-room, consistent with M4 pattern). Pass.

### Specificity

- Named four candidates with a specific failure-mode tag each (invention, overreach, citation cargo-cult, inherited fluency).
- Compound math both directions: 85% × 10 = 20% (decay); 10% → 1% → 0.1% → 0.01% (loop rescue).
- Named three fabrication categories (*"lawyer citing invented case law, medical chatbot inventing medications, finance memo with confident numbers nobody can source"*).
- Named specific artifact (judge file, gold standard of five claims, meta-evaluator).
- Named concrete module linkage (M6 = putting the detector in a loop).
- Named concrete worked contrast: customer service (2–3 steps, 95% each = 86%) vs. "let the agent handle the full workflow" (10 steps, 85% = 20%).

---

## Auto-fail red flags check

- **Violates framing fidelity** — NO; leads with empirical-method-selection, rejects the old "three techniques" framing explicitly.
- **Any LLM-tell word** — NO; `honest` appears only as adjective-modifier, not the tell pattern.
- **Pre-empts an exercise** — NO; four candidates are named and failure-mode-tagged but NOT scored; no winner asserted; precision/recall/coverage land in exercise.
- **Arc break** — NO; M4 pickup ("practice of risk" epistemic stance) and M6 handoff ("the 10%-to-0.01% math is the answer") are both explicit.
- **Over 1500 words** — NO (~900).
- **First / third person** — NO (second person throughout).
- **`---` YAML frontmatter** — NO. (One `---` horizontal rule does NOT appear in body; maintainer section cut is `<!-- maintainer -->` only.)
- **More than one H1** — NO.
- **Unearned tech jargon in student-facing body** — NO. The single `retrieval-augmented generation` instance is inside quoted bad-advice being rejected, not presented as a recommended method.

---

## Deferred (contributory) — sharpen in next pass

- **Sentence-level tighten in "four candidates" paragraphs.** Each candidate description is one paragraph and lands cleanly, but a careful pass could trim 10–15 words per candidate without losing the failure-mode tag. Contributory (Length); not a ship-blocker.
- **Consider one explicit beat naming the student as "the one who writes the gold standard."** Present via implication ("a five-claim gold standard you write yourself") but a single sentence would sharpen the *you are the authority on your material* move. Contributory (Specificity).

## LLM-as-judge prompt

See the prompt at the bottom of `curriculum/evals/lecture.md`. Paste this instance's `## The judges` section + the target lecture file into the `[PASTE]` blocks.
