# The machine you just met

The machine you just met can be steered. What you bring, what you build, and what you ask for all change the work.

## Agreeable answers won the preference round
<!--tier:2-->

- The LLM is trained twice. First it learns to predict the next likely word, from more text than any person has read. Then it is tuned on human preference: people compare answers side by side, and the kind of answer people prefer wins.
- Agreeable answers won the second round. Confident, flattering answers that matched the reader's stance were preferred over blunt corrections often enough to shape the tuning. The field calls the result **sycophancy**. Plainly: matching you is what scored well in training.
- This is the machinery under the opening lecture's mirror: the LLM that flatters you, calls unfinished work progress, mirrors your stance. It mirrors because mirroring was rewarded; the machine amplifies whatever posture you bring, and your stance is the ceiling by construction.
- The agent's report of its own success is the same kind of output. "Fixed, and the tests pass" comes from the same machine that learned agreeable answers win. The report is a hypothesis to check, not ground truth.

## The scrollback is not the work
<!--tier:2-->

- The agent's chat is an abstraction of the work, necessarily. Something has to be left out; otherwise the agent would be printing the code back, narrated.
- It is the session's architecture diagram: what was meant, not what runs. The machine's reflection of the work, and the reflection drifts.
- Current state lives on disk, and the agent reads it on request. A state question (where a file landed, what the code does now) is answered from a fresh read, not from recall: *read x, y, z*, then ask.

## A check resets the chain
<!--tier:2-->

- Each step is mostly right, and each step builds on the one before. One mostly-right answer reads fine on its own. A session is not one answer; it is a chain of them, each standing on the last.
- Enough mostly-right steps stacked without a check, and the end of the chain is mostly wrong. If each step were right nine times in ten, the odds that a seven-step chain is still right by the end would fall below a coin flip. The numbers are an illustration, not a measurement; the stacking is what holds. The multi-agent literature's term is **error cascade**, coined for errors crossing chains of agents; a chain of steps stacks the same way.
- A check from outside the session resets the chain. A failing test does not care how confident the answer sounded. Everything after the check builds on verified ground, and no chain grows long enough for the stacking to take over.
- That is why the failing test came before the fix. The check existed before the code it was checking. Every edit after it had a floor to stand on.

## The LLM answers in essays
<!--tier:2-->

- The fix was small; the answers around it were pages. Complete, not prioritized, is the machine's default: an answer that covers everything is never wrong by omission.
- This time the reading was cheap because the bug was trivial. On real work the reading becomes the bottleneck, not the generating, and a chain of two-page answers is how a session gets away from you.
- Tell the LLM what output you want: a ranked list first, detail on request. Changing the shape costs virtually nothing.

## The machine is steerable
<!--tier:2-->

- The mirror is steered by what you bring. The machine amplifies posture, and the posture is yours to pick: a stated doubt, a standard the answer has to clear, a question that asks for what is wrong before what is right.
- The chain of mostly-right steps is steered by what you build. A test, a type check, a second read with a different question. Each sits outside the session and resets the chain every time it runs.
- The output is steered by what you ask for. Tell the LLM what you want.

That is the machine. The rest is steering.

## You just ran the same loop
<!--tier:2-->

The way this training was built is the shape you just ran on your own repo. Claude's first read was partly wrong. You found the useful wrongness, corrected it, and wrote what the session taught you into `./CLAUDE.local.md` for the next session.

Kieran Klaassen calls this **compound engineering**: work produces evidence; evidence improves the system that does the next work.

## What compounds
<!--tier:2-->

Klaassen's definition: each unit of engineering work should make subsequent units easier, not harder. What that looks like, in his words:

- Features teach the system new capabilities instead of adding fragility.
- Bug fixes eliminate entire categories of future bugs.
- Patterns, once codified, become tools for future work.
- Over time the codebase becomes easier to understand, modify, and trust.

Nothing on that list is a rules file. The file you wrote today is the smallest unit that qualifies: a pattern, codified, that the next session reads. A test that proves the bug is the same move in a different file. So is a doc that stops lying.

The loop is the shape. The bug today was the excuse.

<!-- maintainer -->

**Scrollback slide (2026-08-08, Antti-directed):** *The scrollback is not the work* is the second slide and the fifth overall — the M1 slide budget spent deliberately by the maintainer on his own frame, near-verbatim in all three beats: necessity (the chat has to leave things out or it would print the code back, narrated), the architecture-vs-code analog, and disk-as-current-state with the fresh-read move (*read x, y, z*, then ask). Guards for judges: do not soften *not the work*; do not strengthen to everything-in-the-scrollback-is-false (the claim is which surface answers a state question, and the fresh-read bullet shows conversation CAN answer it once grounded); the analog owes no attribution (architecture-drifts-from-code is common engineering knowledge, `check_writing.md` §6 counter-rule); claims are observation-grade by construction (a lossless narration would reproduce the artifact), no citation owed. The closer's bring/build/ask triad deliberately does NOT gain a fourth leg — the disk rule is a reading discipline, not a steering knob. Downstream joins: `orient-and-introspect`'s spot-check is the lived M1 instance (the check quotes a file, not the account); M3's `threat-model-with-stride` ADR catch (*"reasoned forward from the conversation, not from the filesystem"*) is the exercise-level payoff and stays un-cited there on purpose. Trainer line available, not on the slide: *more conversation is more reflection* — the fresh read is the exception that proves it.

**Output-shape slide added (2026-07-10, Antti-directed cognitive-load arc):** *The LLM answers in essays* sits between the cascading-error slide and the closer; the closer gains the ask-steering bullet (bring / build / ask). Carries the M1 anchor of the selective-reading arc (M2 exception → M3 take-into-use → M5 remind). Mechanism kept observation-grade (no training-cause claim for verbosity; no citation owed — deliberate, don't strengthen to a tuning claim without a source). The M1 trainer flow names the mirror, chain, and output without a behavior count.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all three slides kept as bullets, bolded lead sentences flattened; bold survives only on the two coined-term handles at their naming moments (**sycophancy**, **error cascade**), per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Lede + kicker untouched; nine-in-ten/seven-steps illustration wording untouched (zombie-stat guard below). Wording near-verbatim; no claims added or cut.

**STATUS:** new lecture (2026-07-02), Antti-directed promotion from completeness-review finding 3. Decision verbatim (Antti, 2026-07-02): "sycophancy is a good catch. I feel that actually could live in lecture in module 1. After exercises. Could teach sycophancy and reliablity math." Unaudited; no Quality line by design. Slide format per `theory-plan.md` § Slide format: lede + 5 slides + kicker, one `##` = one slide, bolded claim + 1-3 mechanism sentences per bullet.

**Placement:** M1's final lecture, after `compound-and-close` (Ex3). Zoom order runs exercise-level recognition first (the machine tendencies felt in Ex1-Ex3) then arc-level recognition (the two loop slides, absorbed 2026-08-25 from the dissolved `how-this-training-was-built` — Antti-called; that file's build-story slides were cut and its two survivors moved here rather than staying a 2-min standalone). The loop kicker ("The loop is the shape. The bug today was the excuse.") stays the lecture's last line and the designed hand-off into `## Next`: M1's mood target is joyful creation and the loop carries that as the last word. **Do not restore a separate training-built lecture or its build-story slides** (the bulletpoint origin, rule-count snapshot, testing-stack tour and Antti narrator lede were the cut; git carries them).

**Loop-slide constraints (carried over with the slides):**
- **`## What compounds` is the definitional slide (Antti-directed 2026-08-23).** Opens Klaassen's four bullets after the attribution line and before the closer; the slide says the file is an instance, not the class. The one bulleted-definition slide in the pair, accepted: a quoted definition is a list. Keep the closer line last.
- **Klaassen is named twice on the student surface across M1, and both are on this page.** The same-loop slide connects the student's work to the name; the definitional slide attributes the quoted definition. `compound-and-close` prints the loop but names the practice rather than the person. Two is the cap; a third M1 mention breaches it.
- **Loop slides stay prose paragraphs**; the only bold handle on them is **compound engineering** at its naming.

**Title alternates:** *Why it agreed with you* · *The grain of the machine*. Chosen title is recognition-shaped (closer: names what the student just met). The first slide calls back to the opener's mirror.

**Laws carried:** sycophancy-mechanism (preference tuning rewards agreeable answers, so mirroring is optimization, not courtesy; lived consequence: the agent's self-report is a hypothesis, grounding the module's Key Concept) · reliability-compounding in chain-length form (error stacks over unverified chain length; an outside check resets the chain) · scrollback-is-abstraction (the chat necessarily omits, so it drifts from disk like architecture drifts from code; lived consequence: state questions get a fresh read, which is the mechanism under the spot-check and under M3's ADR-placement catch). The nine-in-ten / seven-steps line is a worded subjunctive illustration, labeled "an illustration, not a measurement" in body. Zombie-stat guard: do NOT let edits promote it to a measured constant, add notation, or add percent forms.

**Deliberately absent (owned elsewhere):** the word "backpressure" + gates/session-reach vocabulary (the post-launch M4 closer names the feedback constraint; M5 builds and calibrates the checks; M6 composes them) · the three failure modes · map/phase references (M1 protected ground) · drift-wedge/position-fix chart vocabulary (the M5 chart owns that imagery). This lecture keeps plain "check resets the chain" language only.

**Siblings:** `lectures/why-mostly-right-fails.md` = Claude Basics sibling: same checks-compound mechanism, business voice, explicit percent arithmetic (mechanism salvaged from there; voice not) · `lectures/what-keeps-a-long-running-session-going.md` = the post-launch M4 naming beat and governor. This lecture is the M1 machine-nature root both later forms stand on.

<!-- backing -->

Format → `curriculum/backing-format.md`.

**Claims**
- `two-stage-training` · detail · "The LLM is trained twice. First it learns to predict the next likely word … Then it is tuned on human preference" ← sharma-sycophancy-2023
- `sycophancy-from-preference-tuning` · detail · "Agreeable answers won the second round … The field calls the result **sycophancy**" ← sharma-sycophancy-2023, anthropic-personal-guidance-2026
- `mirroring-is-optimization` · vision · "It mirrors because mirroring was rewarded; the machine amplifies whatever posture you bring" ← none-owed
- `self-report-is-hypothesis` · vision · "The report is a hypothesis to check, not ground truth" ← none-owed
- `chat-is-necessary-abstraction` · vision · "The agent's chat is an abstraction of the work, necessarily. Something has to be left out; otherwise the agent would be printing the code back, narrated." ← none-owed — true by construction; maintainer frame near-verbatim.
- `scrollback-is-architecture-diagram` · vision · "It is the session's architecture diagram: what was meant, not what runs." ← none-owed — maintainer's own analog; architecture-drifts-from-code is common engineering knowledge, no attribution owed.
- `state-questions-get-fresh-read` · vision · "A state question (where a file landed, what the code does now) is answered from a fresh read, not from recall" ← none-owed
- `error-cascade-term` · detail · "The multi-agent literature's term is **error cascade**, coined for errors crossing chains of agents; a chain of steps stacks the same way" ← owasp-asi08-cascading-failures — the attribution names the term's home scope (cross-agent: OWASP ASI08, arXiv 2603.04474) and states the single-session application as our analogy, which is what both sources warrant.
- `chain-stacking-illustration` · vision · "If each step were right nine times in ten … The numbers are an illustration, not a measurement" ← none-owed
- `check-resets-chain` · vision · "A check from outside the session resets the chain" ← none-owed
- `essays-are-the-default` · vision · "Complete, not prioritized, is the machine's default" ← none-owed
- `answer-shape-is-prompt` · vision · "Tell the LLM what output you want … Changing the shape costs virtually nothing." ← none-owed
- `built-by-the-same-loop` · detail · "The way this training was built is the shape you just ran on your own repo." ← training-construction
- `claude-local-md-carries-session-learning` · detail · "wrote what the session taught you into `./CLAUDE.local.md` for the next session" ← claude-local-md-autoload
- `klaassen-names-it` · borrowed · "Kieran Klaassen calls this **compound engineering**" ← klaassen-definitive-guide
- `compound-work-improves-next-work` · borrowed · "work produces evidence; evidence improves the system that does the next work" ← klaassen-definitive-guide
- `claudes-first-read-partly-wrong` · vision · "Claude's first read was partly wrong." ← none-owed — design-stance about the just-run exercise, not a measured claim: the orient read always leaves a skipped slice, and the introspection prior ("about 10% … made up", hedged there) makes findable wrongness the expected case. "Partly" carries the same hedge; do not strengthen to a rate.
- `klaassen-definition-bullets` · borrowed · "each unit of engineering work should make subsequent units easier, not harder" ← klaassen-definitive-guide — close paraphrase of the source's core-philosophy paragraph and its four bullets, verified live 2026-08-23; wording registered in `vocabulary.md` § compound engineering
- `rules-file-is-an-instance` · vision · "The file you wrote today is the smallest unit that qualifies" ← none-owed
- `loop-is-the-shape` · vision · "The loop is the shape. The bug today was the excuse." ← none-owed

**Sources**
- sharma-sycophancy-2023 `[checked:2026-07-02 result:OK due:2027-01-02]` https://arxiv.org/abs/2310.13548 — [academic/research] Sharma et al., "Towards Understanding Sycophancy in Language Models" (Anthropic, 2023), dated-foundational. Verified live 2026-07-02: five state-of-the-art assistants exhibit sycophancy across four text-generation tasks; "both humans and preference models (PMs) prefer convincingly-written sycophantic responses over correct ones a non-negligible fraction of the time"; sycophancy "likely driven in part by human preference judgments." Body hedging ("often enough to shape the tuning") matches "driven in part" — do NOT strengthen to sole-cause. kb:findings/by-domain/coding-engineering.md fallback: teach the mechanism as convergent-practitioner observation, no URL owed. Re-verified live 2026-07-29: page live, now at v4 (10 May 2025), all three lines confirmed verbatim.
- anthropic-personal-guidance-2026 `[checked:2026-07-29 result:CAVEAT due:2027-01-29]` https://www.anthropic.com/research/claude-personal-guidance — [academic/research, vendor venue] Anthropic, 30 Apr 2026. The current-generation companion the 2023 anchor lacked: 639K real claude.ai conversations (Mar–Apr 2026), sycophancy measured in 9% of guidance-seeking chats overall, 25% in relationship contexts, 38% in spirituality — classifier-defined as willingness to push back, hold position when challenged, and praise proportional to merit. CAVEAT: Anthropic measuring its own model; the *rate* is vendor-self-reported and the reduction claim ("half the sycophancy rate in Opus 4.7 vs 4.6") doubly so. The load-bearing use here is the bare fact that sycophancy is still measurably present in a current model, which is the weakest and safest reading. fallback: cite the presence, never the percentage.
- training-construction `[checked:2026-08-05 result:ATTESTED due:none]` attested:Antti 2026-04→2026-08 building-AE101 — [maintainer-attested] The training was built by the correct-and-compound loop the student just ran: prototype failures became reusable rules, and the rules were corrected through use. fallback: none needed; this is the author's own account.
- claude-local-md-autoload `[checked:2026-07-30 result:CAVEAT due:cohort]` https://code.claude.com/docs/en/memory.md — [capability] `CLAUDE.local.md` is a first-class personal project instruction file loaded in later sessions. The M1 prompt adds it to `.gitignore`; Claude Code does not do that automatically. fallback: if auto-load changes, rewrite the loop slide's mechanism.
- klaassen-definitive-guide `[checked:2026-08-23 result:OK due:2027-02-23]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Kieran Klaassen, Feb 9 2026. First-person account and sole byline. The core mechanism is that each unit of engineering work makes subsequent units easier. fallback: keep the loop description and drop the attribution if the name changes.
- owasp-asi08-cascading-failures `[checked:2026-07-29 result:OK due:2027-01-29]` https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/ — [academic/research] OWASP Top 10 for Agentic Applications (9 Dec 2025) names **ASI08 Cascading Failures** — faults propagating across agents, tools and workflows into system-wide impact. Body now says **error cascade**, which is the literature's term: *"From Spark to Fire: Modeling and Mitigating Error Cascades in LLM-Based Multi-Agent Collaboration"* (arXiv 2603.04474, Mar 2026) carries it in the title. **Do not revert to "cascading error"** — that was our paraphrase and matches no term of art, so a student who greps it lands nowhere. fallback: OWASP's "cascading failure" is the other legal form; "failure" shifts the sense toward system-wide impact and away from the accumulating-wrongness the slide teaches, so prefer the cascade noun.

**Frameworks**
- Compound engineering · [borrow:practitioner-coined] · law:the-compound-ladder · ← klaassen-definitive-guide
- Sycophancy as preference-tuning artifact · [borrow:alignment research] · law:none · ← sharma-sycophancy-2023
- Error compounding over chain length · [borrow:reliability engineering] · law:compound-reliability-floor-0-85 · ← cultural-vocab. Body carries the subjunctive illustration only; the banked law's 0.85ⁿ form is NOT on the student surface here by design.
- Architecture-vs-code drift · [borrow:software engineering] · law:none · ← cultural-vocab — the diagram describes intention and ages; the application to the scrollback is the maintainer's own.

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
1. M1 slide budget: raw count was 11; this adds 3 (raw 14) against the 3-5 budget. Under new-theory-only counting this is M1's first +3 NEW theory slides. Trim candidate if over: *The machine is steerable* folds into the kicker, at the cost of the steerability synthesis.
2. Should the opener's "That is the design, not a flaw" bullet now point here? This pass did NOT edit `painting-the-picture-with-the-llm.md`.

**Lecture meta:** *~7 min closer for Module 1, after the exercises; ends the module. Recognition pace: names the machine tendencies the exercises already surfaced, then the loop the whole module ran.*

**Meta:**
- **Time:** ~7 minutes.
- **Role:** closer (meta-frame: names a pattern the student just lived, `check_lectures §1`).
- **Mood target:** recognition. The machine did what it was built to do, and the session can steer it. No doom.
- **Voice:** Boris-flat on the training mechanics and the arithmetic; Sutherland for the mirror reframe; no Risto lead (recognition beat, not send-off).

- Family B judged 2026-07-03: B-star durability PASS — every slide self-carries NAME/MECHANISM/GOVERNOR without the voice; spine-anchoring rides the M1 protected-ground carve-out (no map slot by doctrine, laws anchored to the lived mirror + failing-test-first instead); worldview a clean recognition closer.

**Quality:** compendium-audited 2026-08-28 (writing@d065f8bc story@d065f8bc technical@8cc00874 behavior@1480362 pedagogy@d065f8bc strategy@1480362 slides@d065f8bc)
- judges @8cc00874: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
