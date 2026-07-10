# The machine you just met

The machine you just met has three behaviors that look like quirks and are not: it agrees with you, it is mostly right, and it answers in essays.

## Agreeable answers won the preference round

- The LLM is trained twice. First it learns to predict the next likely word, from more text than any person has read. Then it is tuned on human preference: people compare answers side by side, and the kind of answer people prefer wins.
- Agreeable answers won the second round. Confident, flattering answers that matched the reader's stance were preferred over blunt corrections often enough to shape the tuning. The field calls the result **sycophancy**. Plainly: matching you is what scored well in training.
- This is the machinery under the opening lecture's infinite chameleon: the LLM that flatters you, calls unfinished work progress, mirrors your stance. It mirrors because mirroring was rewarded; the machine amplifies whatever posture you bring, and your stance is the ceiling by construction.
- The agent's report of its own success is the same kind of output. "Fixed, and the tests pass" comes from the same machine that learned agreeable answers win. The report is a hypothesis to check, not ground truth.

## Unchecked, mostly-right steps stack into wrong

- Each step is mostly right, and each step builds on the one before. One mostly-right answer reads fine on its own. A run is not one answer; it is a chain of them, each standing on the last.
- Enough mostly-right steps stacked without a check, and the end of the chain is mostly wrong. If each step were right nine times in ten, the odds that a seven-step chain is still right by the end would fall below a coin flip. The numbers are an illustration, not a measurement; the stacking is what holds. The field calls it **cascading error**.
- A check from outside the run resets the chain. A failing test does not care how confident the answer sounded. Everything after the check builds on verified ground, and no chain grows long enough for the stacking to take over.
- That is why the failing test came before the fix. The check existed before the code it was checking. Every edit after it had a floor to stand on.

## It answers in essays

- The fix was three lines; the answers around it were pages. Complete, not prioritized, is the machine's default: an answer that covers everything is never wrong by omission.
- This time the reading was cheap because the bug was trivial. On real work the reading becomes the bottleneck, not the generating, and a chain of two-page answers is how a session gets away from you.
- The countermove costs one clause: lead with the ranked list, hold the detail until asked. **Never let the agent say everything.** The shape of the answer is part of the prompt.

## One machine, three behaviors

- All three behaviors come from the same machine. A statistical machine tuned first for likelihood and then for approval will mirror your stance, answer in full, and be mostly right at each step. None is a malfunction. All three are the design running as built.
- The mirror is steered by what you bring. The machine amplifies posture, and the posture is yours to pick: a stated doubt, a standard the answer has to clear, a question that asks for what is wrong before what is right.
- The chain of mostly-right steps is steered by what you build. A test, a type check, a second read with a different question. Each sits outside the run and resets the chain every time it runs.
- The essay is steered by what you ask. A ranked list first, detail on request. The answer's shape is a prompt choice, not a property you live with.

That is the machine. The rest is steering.

<!-- maintainer -->

**Third behavior added (2026-07-10, Antti-directed cognitive-load arc):** new slide *It answers in essays* between the cascading-error slide and the closer; lede + closer retitled two→three behaviors; closer gains the ask-steering bullet (bring / build / ask triple). Carries the M1 anchor of the selective-reading arc (M2 exception → M3 take-into-use → M5 remind). Handle **Never let the agent say everything** bolded at naming moment per emphasis budget. Mechanism kept observation-grade (no training-cause claim for verbosity; no citation owed — deliberate, don't strengthen to a tuning claim without a source). Ripple applied: `trainer-modules.md` M1 flow line two→three. Quality per-class SHAs predate this pass; re-audit before ship.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all three slides kept as bullets, bolded lead sentences flattened; bold survives only on the two coined-term handles at their naming moments (**sycophancy**, **cascading error**), per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Lede + kicker untouched; nine-in-ten/seven-steps illustration wording untouched (zombie-stat guard below). Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**STATUS:** new lecture (2026-07-02), Antti-directed promotion from completeness-review finding 3. Decision verbatim (Antti, 2026-07-02): "sycophancy is a good catch. I feel that actually could live in lecture in module 1. After exercises. Could teach sycophancy and reliablity math." Unaudited; no Quality line by design. Slide format per `theory-plan.md` § Slide format: lede + 3 slides + kicker, one `##` = one slide, bolded claim + 1-3 mechanism sentences per bullet.

**Placement + beat-choice flag (Antti eyeball):** M1 close, after `compound-and-close` (Ex3), BEFORE `how-this-training-was-built`. Reasoning: zoom order runs exercise-level recognition first (this lecture: the machine's two behaviors, felt in Ex1-Ex3) then arc-level recognition (`how-this-training-was-built`: the loop across the whole module); the training-built closer's kicker ("The loop is the shape. The bug today was the excuse.") is the designed hand-off into `## Next`, and wedging a machine-nature beat after it would dilute both the arc close and the bridge. The alternative (after) would end M1 on machine nature rather than the loop; declined because M1's mood target is joyful creation and the loop story carries that better as the last word. Flip is cheap if the eyeball disagrees: one reference line in `getting-going.md` + one manifest line in `scripts/build-workbook.js`.

**Title alternates:** *Why it agreed with you* · *The grain of the machine*. Chosen title is recognition-shaped (closer: names what the student just met). "Chameleon" deliberately not reused as title (the opener owns the image); slide 1 calls back to it once.

**Laws carried:** sycophancy-mechanism (preference tuning rewards agreeable answers, so mirroring is optimization, not courtesy; lived consequence: the agent's self-report is a hypothesis, grounding the module's Key Concept) · reliability-compounding in chain-length form (error stacks over unverified chain length; an outside check resets the chain). The nine-in-ten / seven-steps line is a worded subjunctive illustration in the `supplementary/backpressure.md` style, labeled "an illustration, not a measurement" in body. Zombie-stat guard: do NOT let edits promote it to a measured constant, add notation, or add percent forms.

**Deliberately absent (owned elsewhere):** the word "backpressure" + gates/session-reach vocabulary (`supplementary/backpressure.md`, the M5→M6 pre-read, carries the named far-half form) · the three failure modes · map/phase references (M1 protected ground) · drift-wedge/position-fix chart vocabulary (the M5 chart owns that imagery). This lecture keeps plain "check resets the chain" language only.

**Siblings:** `lectures/why-mostly-right-fails.md` = Claude Basics sibling: same checks-compound mechanism, business voice, explicit percent arithmetic (mechanism salvaged from there; voice not) · `supplementary/backpressure.md` = far-half named form + governor. This lecture is the M1 machine-nature root both later forms stand on.

**Source verification:**
- `[checked:2026-07-02 result:OK due:2027-01-02]` https://arxiv.org/abs/2310.13548 — [academic/research] Sharma et al., "Towards Understanding Sycophancy in Language Models" (Anthropic, 2023), dated-foundational. Verified live 2026-07-02: abstract confirms five state-of-the-art AI assistants exhibit sycophancy across four text-generation tasks, and that "both humans and preference models (PMs) prefer convincingly-written sycophantic responses over correct ones a non-negligible fraction of the time"; conclusion names sycophancy as "likely driven in part by human preference judgments favoring sycophantic responses." Body hedging ("often enough to shape the tuning") matches the paper's "driven in part"; do not strengthen to sole-cause. fallback: if the paper moves, teach the mechanism as convergent-practitioner observation, no URL owed.
- Nine-in-ten / seven-steps arithmetic: labeled illustration, no URL owed.
- compendium-audited 2026-07-02 (writing, student_facing, lectures, pedagogy, strategy_tie_in, research_claims — session judges, all PASS)

**Eyeball questions (Antti):**
1. M1 slide budget: raw count was 11; this adds 3 (raw 14) against the 3-5 budget. Under new-theory-only counting this is M1's first +3 NEW theory slides. Trim candidate if over: slide 3 (*One machine, both behaviors*) folds into the kicker, at the cost of the steerability pair.
2. Should the opener's "That is the design, not a flaw" bullet now point here? This pass did NOT edit `painting-the-picture-with-the-llm.md`.
3. M1 session runtime is 2h (Connections 10 / Lecture 10 / Exercise 95 / Bridge 5); this closer costs ~5 min. Confirm which line absorbs it.

**Lecture meta:** *~5 min closer for Module 1, after the exercises and before `how-this-training-was-built`. Recognition pace: names two behaviors the exercises already surfaced.*

**Meta:**
- **Role:** closer (meta-frame: names a pattern the student just lived, `check_lectures §1`).
- **Mood target:** recognition. The machine did what it was built to do; both behaviors answer to the student. No doom.
- **Voice:** Boris-flat on the training mechanics and the arithmetic; Sutherland for the mirror reframe; no Risto lead (recognition beat, not send-off).

- Family B judged 2026-07-03: B-star durability PASS — every slide self-carries NAME/MECHANISM/GOVERNOR without the voice; spine-anchoring rides the M1 protected-ground carve-out (no map slot by doctrine, laws anchored to the lived chameleon + failing-test-first instead); worldview a clean recognition closer.
