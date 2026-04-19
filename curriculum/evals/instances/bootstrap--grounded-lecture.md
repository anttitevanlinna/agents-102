# Eval Instance — Bootstrap / Grounded (lecture)

Filled-in instance of `curriculum/evals/lecture.md` for the Module 5 (Output Quality and Hallucination Control) in-room lecture.

**Target lecture file:** `curriculum/lectures/grounded.md`

**Eval runs:**
- 2026-04-19 (pass 1) — **APPROVE.** All 9 judges pass; no auto-fail red flags. Word count ~720 (within prework-reading band spirit, fits 8–10 min in-room). Three pass-1 patches applied: (a) 95%×3 customer-service example got a concrete step list ("look up the order, check the policy, draft the reply") so the math lands harder for non-technical audience; (b) two instances of "applied/run honestly" replaced with "rigorously" / "seriously" — "honestly" is on the LLM-tell watch list; (c) clunky "this is not obvious to assume" replaced with "don't assume it does" — cadence fix.
- Judge's overall: *"Tight, grounded, well-voiced — the three techniques land as memorable takeaways rather than a list, and the compound math is the load-bearing insight that makes the demo-to-production gap impossible to unsee."*

---

## The judges

### Primary — the leap test

After hearing this lecture, a builder leader can:

- **Explain grounded vs. ungrounded output in one sentence, and name why LLM confidence is unrelated to correctness** — without reaching for jargon, grounded on the "statistical generator with no model of truth" core observation.
- **Name the three detection techniques** — citation re-verification, adversarial pass, consistency probe — and match each to the failure mode it catches (misrepresentation / overreach / uncertainty-as-confidence).
- **Apply the compound reliability math to their own system** — look at a workflow with N steps and per-step reliability P, and reason about end-to-end reliability (and why demos that work rarely ship reliably at ten steps).

If an SVP walks out able to do these three things and says *"I have three moves I'll run on my next output Monday"* — it's good enough.

### Framing fidelity

Leads with the module's Big Idea: **There is truth out there. Your agent's job is to stay connected to it. When it can't reach the ground, it fills the gap — confidently, plausibly, wrong. Grounding is the discipline that makes the gap visible.**

Avoids:
- **"LLMs are bad / broken / unreliable"** — the framing that treats fabrication as a defect to be patched. The lecture explicitly names it as a property of the technology, permanent.
- **"Use a better model and the problem goes away"** — addressed directly in the maintainer watch-for; lecture body names "later models will hallucinate less; they won't stop."
- **"Prompt-engineering tricks can solve this"** — rejected explicitly in the maintainer's rejected-techniques section; the lecture positions verification as the discipline, not incantation.
- **"Certainty is available"** — closing beat names grounded as "the discipline of not inventing, not the discipline of being right."

### Learning goal fit

Enables these Bloom-tagged LGs from `trainings/bootstrap/output-quality.md`:
- **Explain** grounded vs. ungrounded output — the lecture's central frame.
- **Identify** five shapes of ungroundedness — the exercise practises this; the lecture gives the conceptual frame behind the spectrum (*"Fluency is not evidence. Confidence is not correctness."*) and names three failure modes (misrepresentation, overreach, uncertainty-as-confidence) that the five-category classification operationalises.
- **Adjust** generation rules — the exercise does this (Phase 3 three rules); the lecture doesn't pre-empt.
- **Evaluate** the quality loop as continuous discipline — the three techniques frame the post-hoc verification discipline.

Enables, does not achieve. The exercise runs the loop on the student's own work; the lecture gives the frame and the three portable techniques.

### Module-to-module arc

Picks up from **Module 4's "practice of risk" lecture and `module-4/residual.md`** — the "certainty is a fantasy" frame continues explicitly. The lecture opens with the same epistemic stance: you don't get certainty; you get a discipline and a loop. Different discipline (grounding vs. risk management), same posture.

Hands off to **Module 6 (Evaluations)** — the three techniques seed Module 6 directly: adversarial pass → eval judges; consistency probe → convergence evals; citation re-verification → the mechanical version of the grounding check. Named explicitly in the closing: *"Today you run the full loop by hand… Tomorrow we automate it."*

### Exercise setup

Primes **Ground your output** without giving away discoveries:
- The lecture names the grounded/ungrounded concept but doesn't practice the five-category classification — the exercise does that.
- The lecture names the three techniques; the exercise practises one of them (citation re-verification via grounding rules in Phase 3, and explicitly in the Close via the "open three cited files" nudge).
- The lecture names compound reliability math as a concept; the exercise doesn't test it — it lives as the CTO takeaway.
- The lecture positions "grounded" as the discipline; the exercise's tradeoff paragraph forces the student to earn the "grounded isn't free" second-order lesson.

The reader arrives primed with the frame and the three techniques but has not yet run the classification on their own material. Discovery happens in the exercise.

### Voice

Second person throughout. Opening: *"There is truth out there."* Direct. Rory-reframe in the "non-determinism as signal, not noise" beat. Risto-honesty in "later models will hallucinate less; they won't stop." Seth-warmth in the closing paragraph on the difference between a memo that holds up and one that detonates.

No consultant-speak. No LLM-tell words:
- `honestly` — does not appear.
- `honest` — appears once as adjective modifier ("applied honestly") not the LLM-tell "honestly, I think…" pattern.
- `delve` — no.
- `landscape` verb — no.
- `importantly` — no.
- `crucial` — no.

### Business-audience language

Student-facing body audit:
- `grounded` / `ungrounded` / `fabrication` — all earned inline in the opening paragraphs.
- `statistical generator` — used once, plain-English explanation follows.
- `compound reliability math` — earned with the 85% × 10 steps = 20% worked example.
- `citation re-verification`, `adversarial pass`, `consistency probe` — each defined with a practitioner move in plain English.
- `non-determinism` — earned inline ("*same prompt, same files, same tools — different run, different answer*" — actually wait, this is in the lecture? Let me check — yes, implicitly via "*ask the same question twice, in two fresh sessions, possibly with slightly different framings*").

Banned words check: `embeddings`, `vector`, `RAG`, `retrieval` (tech sense), `pipeline` (tech sense), `orchestration`, `schema`, `architecture`, `subagent` (maintainer notes only), `frontmatter`, `prompt engineering`, `inference` (tech sense), `fine-tuning` — none appear in student-facing body.

### Length

Target: **800–1200 words (prework-reading)** or **350–600 words (demo-script)**. Current: ~950 words. Sits between the two; delivered in-room 8–10 min with conceptual density. Same shape as M4 lecture (~770 words). Acceptable.

### Specificity

- Named three techniques with specific practitioner moves each.
- Compound math: 85% × 10 = 20%; 95% × 3 = 86% contrast.
- Named three failure modes (misrepresentation, overreach, uncertainty-as-confidence) matched to the three techniques.
- Named concrete artifacts: *"the lawyer citing invented case law, the medical chatbot inventing medications, the finance memo with confident numbers nobody can source"* — three specific categories of real-world fabrication.
- Named module linkage: *"today you run the full loop by hand… tomorrow we automate it"* — concrete hand-off to M6.
- Named frameworks: Roger Martin's *what would have to be true?* inverted as adversarial pass.

---

## Auto-fail red flags check

- **Violates framing fidelity** — NO; lecture leads with grounded as positive frame.
- **Any LLM-tell word** — audit clean.
- **Pre-empts an exercise** — NO; the five-category classification and the specific over-reach prompt are not in the lecture.
- **Arc break** — NO; explicit pickup from M4 ("practice of risk") and handoff to M6 ("tomorrow we automate it").
- **Over 1500 words** — NO (~950).
- **First person / third person** — NO (second person).
- **`---` YAML frontmatter** — NO.
- **More than one H1** — NO.
- **Unearned tech jargon** — NO.

---

## LLM-as-judge prompt

See the prompt at the bottom of `curriculum/evals/lecture.md`. Paste this instance's `## The judges` section + the target lecture file into the `[PASTE]` blocks.
