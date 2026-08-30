# Quality is grounding

## Five moves, one quality discipline
<!--tier:2-->

The quality arc ran the whole training. M1 opened with tests-first. M2 added plan push-back: quality applied to the agent's intent before any code runs. M3 authored the test-strategy skill from this codebase's conventions. M5 built the verifier, shaped against the failures the un-packaged session actually showed.

Today adds the fifth move: the eval read. Two sessions diffed, every gap routed to the check that would have caught it, and a map of where the next checks belong.

Tests-first, plan push-back, skill, verifier, loop. That's the quality kit you walk out with.

## Decay clears the gate
<!--tier:3-->

Tests answer in seconds; the verifier advises the agent. The costs that make a codebase hard to change land weeks later: the shortcut cast, the try-catch that swallows an error, the module that grew a second job. No gate fires on any of them, so a session can come back green and still leave the code worse than it found it.

Coding models share the blind spot, Dex Horthy argues in [Why software factories fail](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md): they learned against checks that answer fast, and a cost that lands in weeks never reached them. The countermoves are the old discipline with a new job. [Clean Code Is Steering: Reading Uncle Bob's Agent Experiments](trainings/agentic-engineering-101/supplementary/clean-code-is-steering.md) carries that story: modularity, architecture visibility, metrics that make decay readable.

## From spec-and-tests to grounding

Nobody reviews 500K lines by hand. Some of the early agentic engineering demos were single devs shipping 500K lines of code in weeks; the first Agentics Helsinki meetup, fall 2025, had two of them. The recurring theme: every generated line had to correspond to a spec, every feature had to be tested. Without that, no way to know the system works.

The discipline has gone deeper since: **grounding**. Beyond spec-and-tests, toward human signal. Every push-back, every correction, every *"no, like this"* is signal of something: what's true, what's valuable, what works, what's broken.

The agentic engineer maxes that signal out. You ship a million lines of new stuff. How do you know it's right?

<!-- maintainer -->

**Pre-exercise T2 accepted:** "Five moves, one quality discipline" — the slide recognises the quality kit built across M1-M5 (tests-first, plan push-back, the skill, the verifier), all of it done by the time a student reaches M6. `check-slide-tiers.js` bars a T2 before a module's first exercise because recognition needs something to recognise; that constraint is module-local and this recognition is not. Tagged in the 2026-08-30 tier audit, which flagged the distinction rather than tagging around it. Do not remove the tag to quiet the gate — the attestation IS the answer.

**Lean pass (2026-08-29):** cut "Five moves, one discipline." — the header above it already reads `## Five moves, one quality discipline`. See the claim row.

**Lean pass (2026-08-25):** cut "Not one move learned in one module; the discipline, threaded through the whole training." — restated "Five moves, one discipline" in the same paragraph; claim row `discipline-not-one-move-per-module` deleted with it. Do not restore.

**Decay slide added (2026-07-29, Antti-directed, from Horthy's wsff.md maintainability-decay gap):** new middle slide *Decay clears the gate* between the five-moves slide and the grounding slide. Placement deliberate: names what the kit's fast checks can't see, so slide 3's pivot to grounding arrives as the answer and the closing question still closes the deck. Avoids the word "grounding" (earned next slide). Runtime now ~5 min. Zero bold on the new slide.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** both slides recast from bolded-claim bullets to prose paragraphs (narrative stakes-setter; bullets already read as consecutive sentences) per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. One bold survives: **grounding** at its naming beat; the closing question stays plain. Wording near-verbatim; no claims added or cut.

**Slides-only pass (2026-07-02, unaudited):** two prose paragraphs CONVERTED to two slides, near-verbatim. Paragraph 1 (quality arc) → slide 1, module-as-subject phrasing kept (Sutherland-flip off the student, per `check_student_facing` rule 3); paragraph 2 (500K → grounding) → slide 2 with the closing question as the final bullet (don't answer it, per watch-fors). Stray post-H1 `---` divider CUT (formatting residue). M1/M2/M3/M5 refs KEPT under the `check_lectures §3` consolidation carve-out — the quality ARC is this lecture's subject, the refs are its material, not sequencing. No Quality line predates this pass (file was unaudited).

- section-3 sweep 2026-07-02: 5 refs judged (M1/M2/M3/M5 in slide 1 + "whole training" arc line), 0 fixed, 5 carve-out — consolidation arc-lecture, the quality arc IS the subject; all refs backward-looking material, no forward sequencing in body (M7 mention is below the fence).

**Lecture meta:** *3–5 min stakes-setter for AE101 M6 (deck-only trimmed from the 4–6 min prose draft), placed early between `story-of-module-6.md` and the main exercise. Names the quality arc threaded across the whole training (M1 tests-first → M2 plan push-back → M3 skill → M5 verifier → M6 eval read) and the reframe under it (spec-and-tests → grounding). Pairs with [The loop has a name](the-loop-has-a-name.md) as M6's closer — quality-is-grounding sets the WHY going in, the-loop-has-a-name names the WHAT (eval) coming out.*

**Time:** 5 min at presentation pace.

**Delivery mode:** Read in-room early in M6, between Story of Module 6 and the main exercise. Sets the quality-arc stakes before the build move.

<!-- backing -->

Claims
- `quality-arc-ran-the-whole-training` · vision · "The quality arc ran the whole training." ← none-owed
- `five-moves-one-discipline` · vision · "Tests-first, plan push-back, skill, verifier, loop. That's the quality kit you walk out with." ← none-owed — **header echo cut 2026-08-29 (Antti).** *"Five moves, one discipline"* opened the paragraph under a header reading `## Five moves, one quality discipline`. Second growth of the same shape: the 2026-08-25 lean pass cut *"Not one move learned in one module; the discipline, threaded through the whole training"* from this paragraph for the same reason. The header carries the summary; the paragraph carries the list. Do not restore a summary sentence here.
- `fast-checks-miss-slow-costs` · vision · "Tests answer in seconds; the verifier advises the agent." ← none-owed
- `decay-clears-the-gate` · vision · "a session can come back green and still leave the code worse than it found it" ← none-owed
- `horthy-models-share-the-blind-spot` · detail · "they learned against checks that answer fast, and a cost that lands in weeks never reached them" ← horthy-wsff
- `countermoves-are-old-discipline-new-job` · vision · "The countermoves are the old discipline with a new job." ← none-owed
- `nobody-reviews-500k-by-hand` · vision · "Nobody reviews 500K lines by hand." ← none-owed
- `500k-lines-in-weeks` · detail · "Some of the early agentic engineering demos were single devs shipping 500K lines of code in weeks" ← antti-agentics-helsinki, luma-agentics-helsinki
- `spec-and-tests-was-the-theme` · detail · "every generated line had to correspond to a spec, every feature had to be tested" ← antti-agentics-helsinki
- `grounding-goes-deeper` · vision · "The discipline has gone deeper since: **grounding**." ← none-owed
- `human-signal-is-the-grounding` · vision · "Every push-back, every correction, every *\"no, like this\"* is signal of something" ← none-owed
- `million-line-close` · vision · "You ship a million lines of new stuff. How do you know it's right?" ← none-owed

Sources
- antti-agentics-helsinki `[checked:2026-08-03 result:ATTESTED due:none]` attested:Antti 2025-09-02 Agentics-Helsinki-meetup, count re-attested Antti 2026-08-03 — [maintainer-attested] two single-dev ~500K-lines-in-weeks demos at the first Agentics Helsinki meetup; spec-and-tests was the recurring discipline. The maintainer was in the room — primary evidence, the best rung on the ladder. The number stands on his word: no public URL required and none owed (`check_research_claims.md §1`, maintainer-attested carve-out). A "hundreds of thousands" phrasing is a style option, not a sourcing fix. Correct the body figure only if his own recall was off, never to chase a citation.
- luma-agentics-helsinki `[checked:2026-05-25 result:OK due:none]` https://luma.com/bjg7smsc — [practitioner direct] first Agentics Helsinki meetup, 2 Sep 2025 at Sitra. Event verified live. Body uses month-band phrasing ("fall 2025") on purpose, matching the recall mood. Dated-historical: the body frames it as "the early agentic engineering demos", allowed under `check_research_claims.md §2` — do NOT auto-flag freshness.
- horthy-wsff `[checked:2026-07-29 result:OK due:2027-01-29]` https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md — [practitioner direct, vendor venue] Dex Horthy (HumanLayer), *Why Software Factories Fail*, July 2026 (repo commits by dexhorthy through 2026-07-27). Horthy argues his own thesis on his own company's org repo, so the label is practitioner-direct with the venue flagged — not `[practitioner analysis]`, which means one builder teardown-ing *another's* work. Kept in step with `getting-going.md`, which carries the same URL. Cited for the argument that models trained against fast verifiers carry no signal for maintainability costs landing weeks later. **Do NOT import its Faros AI incident statistics** — vendor telemetry, zombie-stat risk, unvetted. fallback: drop the name, keep the blind-spot claim as convergent practitioner observation.

Frameworks
- Grounding as the deeper quality move · [borrow:none] · law:none · ← none — curriculum framing, no single-practitioner attribution; the phrase *"grounding to truth"* is Antti's, and push-back-as-signal traces to recurring theme #5 in the AE101 strategy doc (the agent is trying, hard, to capture your world)
- Feedback latency dominates · [borrow:control theory] · law:feedback-latency-dominates · ← horthy-wsff — the decay slide is this law: a cost that lands in weeks never reaches a check that answers in seconds
- The value cycle · [borrow:none] · law:the-value-cycle · ← none — the five moves are one arc across Work and Verification

Stance `[stance:2026-08-01 level:L1]`
- holds: that fast automated checks systematically miss maintainability costs. Horthy is one named practitioner arguing it in print, on his own company's repo, which is L1 and is what the body's *"Dex Horthy argues"* attribution correctly conveys. The 500K demos (two, at the first meetup) are maintainer-attested first-hand — the strongest rung available, and unusually the *least* contestable claim on the page.
- contested: nothing in the body, but the neighbouring evidence is a minefield the file deliberately stays out of. Horthy's own piece carries vendor incident telemetry this lecture refuses to import, and that refusal is load-bearing, not fastidious.
- decided: **the million-line close carries no stamp and should not.** *"you ship a million lines of new stuff"* is a rhetorical figure rather than a claim — the setup for a question, not a report of anything — so no source is owed and the grade is `vision`. The 500K opener carries the only real number. Do not add a `[convergent]` stamp as a fix.
- would-move-it: a second named practitioner publishing the maintainability-blind-spot argument would take it to L2 and let the body drop the single attribution. Published evidence that verifier-trained models *do* carry maintainability signal would break the decay slide outright.

OODA
- question: is anyone besides Horthy arguing in print that coding models are blind to slow-landing maintainability costs, and has anyone published non-vendor measurements of it?
- roster: Dex Horthy and the HumanLayer repos, Kent Beck, Martin Fowler, Adam Tornhill and CodeScene, Gergely Orosz
- last-run: 2026-08-01

<!-- /backing -->

**Watch-fors (delivery):**
- Voice lead is Rory on the reframe (*"How do you know it's right?"*), Boris-flat on the factual lines (*"Nobody reviews 500K lines by hand"*), Risto on the forward-optimism (*"the agentic engineer maxes that signal out"*). Read aloud before first cohort; if any line lands as L&D-coach or vendor-pitch, swap.
- Slide 1 is recognition (the student just shipped these artefacts). Don't let it land as recap. The beat is *"all five are the same discipline"*, not *"here's what you did."*
- Slide 2's pivot from spec-and-tests to grounding is the load-bearing reframe. If the room hears it as *"tests don't matter any more"*, the framing has slipped. Tests are still inside the kit — grounding extends, doesn't replace.
- The closing question (*"How do you know it's right?"*) is the hand-off to whatever comes next (M7 deliberation, Monday morning, scheduled agents). Let it sit. Don't answer it for the room.

**Philosophy callouts:** at most one. *Capture* (theme #5 — the agent is trying to capture your world) is the implicit anchor under "grounding"; don't name-tag it. Do not bolt the 19 beliefs onto this lecture.

**Quality:** compendium-audited 2026-08-29 (writing@4a722813 story@0e4f7c9e technical@8cc00874 behavior@1c765f2 pedagogy@1abb84c6 strategy@1c765f2 slides@4a722813)
- judges @4a722813: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS
