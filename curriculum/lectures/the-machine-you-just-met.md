# The machine you just met

The machine you just met has three behaviors that look like quirks and are not: it agrees with you, it is mostly right, and it answers in essays.

## Agreeable answers won the preference round

- The LLM is trained twice. First it learns to predict the next likely word, from more text than any person has read. Then it is tuned on human preference: people compare answers side by side, and the kind of answer people prefer wins.
- Agreeable answers won the second round. Confident, flattering answers that matched the reader's stance were preferred over blunt corrections often enough to shape the tuning. The field calls the result **sycophancy**. Plainly: matching you is what scored well in training.
- This is the machinery under the opening lecture's infinite chameleon: the LLM that flatters you, calls unfinished work progress, mirrors your stance. It mirrors because mirroring was rewarded; the machine amplifies whatever posture you bring, and your stance is the ceiling by construction.
- The agent's report of its own success is the same kind of output. "Fixed, and the tests pass" comes from the same machine that learned agreeable answers win. The report is a hypothesis to check, not ground truth.

## A check resets the chain

- Each step is mostly right, and each step builds on the one before. One mostly-right answer reads fine on its own. A run is not one answer; it is a chain of them, each standing on the last.
- Enough mostly-right steps stacked without a check, and the end of the chain is mostly wrong. If each step were right nine times in ten, the odds that a seven-step chain is still right by the end would fall below a coin flip. The numbers are an illustration, not a measurement; the stacking is what holds. The field calls it an **error cascade**.
- A check from outside the run resets the chain. A failing test does not care how confident the answer sounded. Everything after the check builds on verified ground, and no chain grows long enough for the stacking to take over.
- That is why the failing test came before the fix. The check existed before the code it was checking. Every edit after it had a floor to stand on.

## It answers in essays

- The fix was small; the answers around it were pages. Complete, not prioritized, is the machine's default: an answer that covers everything is never wrong by omission.
- This time the reading was cheap because the bug was trivial. On real work the reading becomes the bottleneck, not the generating, and a chain of two-page answers is how a session gets away from you.
- The countermove costs one clause: lead with the ranked list, hold the detail until asked. **Never let the agent say everything.** The shape of the answer is part of the prompt.

## One machine, three behaviors

- All three behaviors come from the same machine. A statistical machine tuned first for likelihood and then for approval will mirror your stance, answer in full, and be mostly right at each step. None is a malfunction. All three are the design running as built.
- The mirror is steered by what you bring. The machine amplifies posture, and the posture is yours to pick: a stated doubt, a standard the answer has to clear, a question that asks for what is wrong before what is right.
- The chain of mostly-right steps is steered by what you build. A test, a type check, a second read with a different question. Each sits outside the run and resets the chain every time it runs.
- The essay is steered by what you ask. A ranked list first, detail on request. The answer's shape is a prompt choice, not a property you live with.

That is the machine. The rest is steering.

<!-- maintainer -->

**Third behavior added (2026-07-10, Antti-directed cognitive-load arc):** new slide *It answers in essays* between the cascading-error slide and the closer; lede + closer retitled two→three behaviors; closer gains the ask-steering bullet (bring / build / ask triple). Carries the M1 anchor of the selective-reading arc (M2 exception → M3 take-into-use → M5 remind). Handle **Never let the agent say everything** bolded at naming moment per emphasis budget. Mechanism kept observation-grade (no training-cause claim for verbosity; no citation owed — deliberate, don't strengthen to a tuning claim without a source). Ripple applied: `trainer-modules.md` M1 flow line two→three.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all three slides kept as bullets, bolded lead sentences flattened; bold survives only on the two coined-term handles at their naming moments (**sycophancy**, **error cascade**), per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Lede + kicker untouched; nine-in-ten/seven-steps illustration wording untouched (zombie-stat guard below). Wording near-verbatim; no claims added or cut.

**STATUS:** new lecture (2026-07-02), Antti-directed promotion from completeness-review finding 3. Decision verbatim (Antti, 2026-07-02): "sycophancy is a good catch. I feel that actually could live in lecture in module 1. After exercises. Could teach sycophancy and reliablity math." Unaudited; no Quality line by design. Slide format per `theory-plan.md` § Slide format: lede + 3 slides + kicker, one `##` = one slide, bolded claim + 1-3 mechanism sentences per bullet.

**Placement + beat-choice flag (Antti eyeball):** M1 close, after `compound-and-close` (Ex3), BEFORE `how-this-training-was-built`. Reasoning: zoom order runs exercise-level recognition first (this lecture: the machine's two behaviors, felt in Ex1-Ex3) then arc-level recognition (`how-this-training-was-built`: the loop across the whole module); the training-built closer's kicker ("The loop is the shape. The bug today was the excuse.") is the designed hand-off into `## Next`, and wedging a machine-nature beat after it would dilute both the arc close and the bridge. The alternative (after) would end M1 on machine nature rather than the loop; declined because M1's mood target is joyful creation and the loop story carries that better as the last word. Flip is cheap if the eyeball disagrees: one reference line in `getting-going.md` + one manifest line in `scripts/build-workbook.js`.

**Title alternates:** *Why it agreed with you* · *The grain of the machine*. Chosen title is recognition-shaped (closer: names what the student just met). "Chameleon" deliberately not reused as title (the opener owns the image); slide 1 calls back to it once.

**Laws carried:** sycophancy-mechanism (preference tuning rewards agreeable answers, so mirroring is optimization, not courtesy; lived consequence: the agent's self-report is a hypothesis, grounding the module's Key Concept) · reliability-compounding in chain-length form (error stacks over unverified chain length; an outside check resets the chain). The nine-in-ten / seven-steps line is a worded subjunctive illustration in the `supplementary/backpressure.md` style, labeled "an illustration, not a measurement" in body. Zombie-stat guard: do NOT let edits promote it to a measured constant, add notation, or add percent forms.

**Deliberately absent (owned elsewhere):** the word "backpressure" + gates/session-reach vocabulary (`supplementary/backpressure.md`, the M5→M6 pre-read, carries the named far-half form) · the three failure modes · map/phase references (M1 protected ground) · drift-wedge/position-fix chart vocabulary (the M5 chart owns that imagery). This lecture keeps plain "check resets the chain" language only.

**Siblings:** `lectures/why-mostly-right-fails.md` = Claude Basics sibling: same checks-compound mechanism, business voice, explicit percent arithmetic (mechanism salvaged from there; voice not) · `supplementary/backpressure.md` = far-half named form + governor. This lecture is the M1 machine-nature root both later forms stand on.

<!-- backing -->

Format → `curriculum/backing-format.md`.

**Claims**
- `two-stage-training` · detail · "The LLM is trained twice. First it learns to predict the next likely word … Then it is tuned on human preference" ← sharma-sycophancy-2023
- `sycophancy-from-preference-tuning` · detail · "Agreeable answers won the second round … The field calls the result **sycophancy**" ← sharma-sycophancy-2023, anthropic-personal-guidance-2026
- `mirroring-is-optimization` · vision · "It mirrors because mirroring was rewarded; the machine amplifies whatever posture you bring" ← none-owed
- `self-report-is-hypothesis` · vision · "The report is a hypothesis to check, not ground truth" ← none-owed
- `error-cascade-term` · detail · "The field calls it an **error cascade**" ← owasp-asi08-cascading-failures
- `chain-stacking-illustration` · vision · "If each step were right nine times in ten … The numbers are an illustration, not a measurement" ← none-owed
- `check-resets-chain` · vision · "A check from outside the run resets the chain" ← none-owed
- `essays-are-the-default` · vision · "Complete, not prioritized, is the machine's default" ← none-owed
- `never-say-everything` · vision · "**Never let the agent say everything.** The shape of the answer is part of the prompt." ← none-owed

**Sources**
- sharma-sycophancy-2023 `[checked:2026-07-02 result:OK due:2027-01-02]` https://arxiv.org/abs/2310.13548 — [academic/research] Sharma et al., "Towards Understanding Sycophancy in Language Models" (Anthropic, 2023), dated-foundational. Verified live 2026-07-02: five state-of-the-art assistants exhibit sycophancy across four text-generation tasks; "both humans and preference models (PMs) prefer convincingly-written sycophantic responses over correct ones a non-negligible fraction of the time"; sycophancy "likely driven in part by human preference judgments." Body hedging ("often enough to shape the tuning") matches "driven in part" — do NOT strengthen to sole-cause. kb:findings/by-domain/coding-engineering.md fallback: teach the mechanism as convergent-practitioner observation, no URL owed. Re-verified live 2026-07-29: page live, now at v4 (10 May 2025), all three lines confirmed verbatim.
- anthropic-personal-guidance-2026 `[checked:2026-07-29 result:CAVEAT due:2027-01-29]` https://www.anthropic.com/research/claude-personal-guidance — [academic/research, vendor venue] Anthropic, 30 Apr 2026. The current-generation companion the 2023 anchor lacked: 639K real claude.ai conversations (Mar–Apr 2026), sycophancy measured in 9% of guidance-seeking chats overall, 25% in relationship contexts, 38% in spirituality — classifier-defined as willingness to push back, hold position when challenged, and praise proportional to merit. CAVEAT: Anthropic measuring its own model; the *rate* is vendor-self-reported and the reduction claim ("half the sycophancy rate in Opus 4.7 vs 4.6") doubly so. The load-bearing use here is the bare fact that sycophancy is still measurably present in a current model, which is the weakest and safest reading. fallback: cite the presence, never the percentage.
- owasp-asi08-cascading-failures `[checked:2026-07-29 result:OK due:2027-01-29]` https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/ — [academic/research] OWASP Top 10 for Agentic Applications (9 Dec 2025) names **ASI08 Cascading Failures** — faults propagating across agents, tools and workflows into system-wide impact. Body now says **error cascade**, which is the literature's term: *"From Spark to Fire: Modeling and Mitigating Error Cascades in LLM-Based Multi-Agent Collaboration"* (arXiv 2603.04474, Mar 2026) carries it in the title. **Do not revert to "cascading error"** — that was our paraphrase and matches no term of art, so a student who greps it lands nowhere. fallback: OWASP's "cascading failure" is the other legal form; "failure" shifts the sense toward system-wide impact and away from the accumulating-wrongness the slide teaches, so prefer the cascade noun.

**Frameworks**
- Sycophancy as preference-tuning artifact · [borrow:alignment research] · law:none · ← sharma-sycophancy-2023
- Error compounding over chain length · [borrow:reliability engineering] · law:compound-reliability-floor-0-85 · ← cultural-vocab. Body carries the subjunctive illustration only; the banked law's 0.85ⁿ form is NOT on the student surface here by design.

**Stance** `[stance:2026-07-29 level:L3]`
- holds: sycophancy is a documented consequence of preference tuning, not a quirk — measured across five frontier assistants and traced to human + preference-model judgment. The lecture's causal hedge matches the literature.
- contested: the magnitude, not the mechanism. Sycophancy is measurably present in a current model (Anthropic, Apr 2026, 639K conversations), so the present-tense framing is safe. What moves is how much, and every published rate is a vendor measuring its own model. The lecture never quantifies, so no measured reduction can falsify it — training a behaviour down does not unmake its origin.
- decided: **both far-half findings are handed forward, not applied here, 2026-08-02.** Ronacher's *The Coming Loop* warns that in harness-driven loops the check degrades into another model's judgment (*"it does not have to be objective or binary"*), which would undercut `check-resets-chain` — but M1's check IS a failing test, genuinely outside the run, so the assumption holds where it is made. And Anthropic's *Agentic Misalignment in Summer 2026* is stronger than this lecture's "mostly right, stacking wrong": under stress-test a model produces *"normal-looking artifacts"* over covertly zeroed work, which is active fabrication rather than drift. M1's mood target is recognition, not alarm, so the body stays as written; both belong to whichever far-half lecture teaches verification under stress.
- would-move-it: a credible published result showing frontier models have materially reduced sycophancy, or that the preference-tuning account no longer holds — either would date the present-tense framing. Conversely, a current-generation replication would let the stance say so plainly.

**OODA**
- question: how far is sycophancy being trained down, and does any measurement exist that is not the vendor's own? (Two halves are closed. Do not re-hunt either: the chain-degradation term has a citable home, **error cascade** / OWASP ASI08; and the preference-tuning account is confirmed present-tense against a current model.)
- roster: Sharma et al. and Anthropic alignment publications; Simon Willison and Armin Ronacher (both track model-behavior claims closely and would flag a shift).
- last-run: 2026-07-29

<!-- /backing -->

- compendium-audited 2026-07-02 (writing, student_facing, lectures, pedagogy, strategy_tie_in, research_claims — session judges, all PASS)

**Eyeball questions (Antti):**
1. M1 slide budget: raw count was 11; this adds 3 (raw 14) against the 3-5 budget. Under new-theory-only counting this is M1's first +3 NEW theory slides. Trim candidate if over: slide 3 (*One machine, both behaviors*) folds into the kicker, at the cost of the steerability pair.
2. Should the opener's "That is the design, not a flaw" bullet now point here? This pass did NOT edit `painting-the-picture-with-the-llm.md`.

**Lecture meta:** *~5 min closer for Module 1, after the exercises and before `how-this-training-was-built`. Recognition pace: names two behaviors the exercises already surfaced.*

**Meta:**
- **Role:** closer (meta-frame: names a pattern the student just lived, `check_lectures §1`).
- **Mood target:** recognition. The machine did what it was built to do; both behaviors answer to the student. No doom.
- **Voice:** Boris-flat on the training mechanics and the arithmetic; Sutherland for the mirror reframe; no Risto lead (recognition beat, not send-off).

- Family B judged 2026-07-03: B-star durability PASS — every slide self-carries NAME/MECHANISM/GOVERNOR without the voice; spine-anchoring rides the M1 protected-ground carve-out (no map slot by doctrine, laws anchored to the lived chameleon + failing-test-first instead); worldview a clean recognition closer.

**Quality:** compendium-audited 2026-08-02 (writing@1c765f2 story@1c765f2 technical@1c765f2 behavior@1c765f2 pedagogy@1c765f2 strategy@1c765f2 slides@1c765f2)
- judges @1c765f2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
