# Quality is grounding

## Five moves, one quality discipline

- **The quality arc ran the whole training.** M1 opened with tests-first. M2 added plan push-back: quality applied to the agent's intent before any code runs. M3 authored the test-strategy skill from this codebase's conventions. M5 built the verifier, shaped against the failures the un-packaged run actually showed.
- **Today adds the fifth move.** A second skill, packaged from what two runs taught, in the shape the dominant gap calls for.
- **Five moves, one discipline.** Tests-first, plan push-back, skill, verifier, loop. That's the quality kit you walk out with. Not one move learned in one module; the discipline, threaded through the whole training.

## From spec-and-tests to grounding

- **Nobody reviews 500K lines by hand.** Some of the early agentic engineering demos were single devs shipping 500K lines of code in weeks; the first Agentics Helsinki meetup, fall 2025, had a few of them. The recurring theme: every generated line had to correspond to a spec, every feature had to be tested. Without that, no way to know the system works.
- **The discipline has gone deeper since: grounding.** Beyond spec-and-tests, toward human signal. Every push-back, every correction, every *"no, like this"* is signal of something: what's true, what's valuable, what works, what's broken.
- **The agentic engineer maxes that signal out.** You ship a million lines of new stuff. How do you know it's right?

<!-- maintainer -->

**Slides-only pass (2026-07-02, unaudited):** two prose paragraphs CONVERTED to two slides, near-verbatim. Paragraph 1 (quality arc) → slide 1, module-as-subject phrasing kept (Sutherland-flip off the student, per `check_student_facing` rule 3); paragraph 2 (500K → grounding) → slide 2 with the closing question as the final bullet (don't answer it, per watch-fors). Stray post-H1 `---` divider CUT (formatting residue). M1/M2/M3/M5 refs KEPT under the `check_lectures §3` consolidation carve-out — the quality ARC is this lecture's subject, the refs are its material, not sequencing. No Quality line predates this pass (file was unaudited).

- section-3 sweep 2026-07-02: 5 refs judged (M1/M2/M3/M5 in slide 1 + "whole training" arc line), 0 fixed, 5 carve-out — consolidation arc-lecture, the quality arc IS the subject; all refs backward-looking material, no forward sequencing in body (M7 mention is below the fence).

**Lecture meta:** *3–5 min stakes-setter for AE101 M6 (deck-only trimmed from the 4–6 min prose draft), placed early between `story-of-module-6.md` and the main exercise. Names the quality arc threaded across the whole training (M1 tests-first → M2 plan push-back → M3 skill → M5 verifier → M6 second skill) and the reframe under it (spec-and-tests → grounding). Pairs with [The loop has a name](the-loop-has-a-name.md) as M6's closer — quality-is-grounding sets the WHY going in, the-loop-has-a-name names the WHAT (eval) coming out.*

**Time:** 3–5 min at presentation pace.

**Delivery mode:** Read in-room early in M6, between Story of Module 6 and the main exercise. Sets the quality-arc stakes before the build move.

**Source verification — freshness stamps. `source-freshness.sh` reads these; format + result vocab in `curriculum/source-freshness-format.md`.**

- `[checked:2025-09-02 result:ATTESTED due:none]` attested:Antti 2025-09-02 Agentics-Helsinki-meetup — [maintainer-attested] single dev shipping ~500K lines in weeks, demoed at the first Agentics Helsinki meetup; spec-and-tests was the recurring discipline. The maintainer was in the room — primary evidence, the best on the ladder. The number stands on his word: no public URL required and none owed. A "hundreds of thousands" phrasing is available as a style option, not a sourcing fix. Correct the body figure only if his own recall was off, never to chase a citation.
- `[checked:2026-05-25 result:OK due:none]` https://luma.com/bjg7smsc — [practitioner direct] first Agentics Helsinki meetup, Sep 2 2025 at Sitra. Event verified live. Body uses month-band phrasing ("fall 2025") on purpose, matching the recall mood. Dated-historical: body frames it as "the early agentic engineering demos" (allowed under `check_research_claims.md §2` — do NOT auto-flag freshness).
- `[checked:2026-05-25 result:OK due:none]` (no URL — directional rhetorical close) — [convergent] the million-line close is paired with the 500K opener, not a single-source citation. fallback: keep directional; swap to a named documented million-line run only if one lands.

**Frameworks attributed:**
- **500K lines / spec-and-tests discipline** — maintainer-attested, stamped above. [practitioner direct, maintainer first-hand].
- **Grounding as the deeper quality move** — curriculum framing; no single-practitioner attribution. The phrase *"grounding to truth"* is Antti's. Push-back / correction / "no, like this" as signal traces back to recurring theme #5 in the AE101 strategy doc (*the agent is trying — hard — to capture your world*).

**Watch-fors (delivery):**
- Voice lead is Rory on the reframe (*"How do you know it's right?"*), Boris-flat on the factual lines (*"Nobody reviews 500K lines by hand"*), Risto on the forward-optimism (*"the agentic engineer maxes that signal out"*). Read aloud before first cohort; if any line lands as L&D-coach or vendor-pitch, swap.
- Slide 1 is recognition (the student just shipped these artefacts). Don't let it land as recap. The beat is *"all five are the same discipline"*, not *"here's what you did."*
- Slide 2's pivot from spec-and-tests to grounding is the load-bearing reframe. If the room hears it as *"tests don't matter any more"*, the framing has slipped. Tests are still inside the kit — grounding extends, doesn't replace.
- The closing question (*"How do you know it's right?"*) is the hand-off to whatever comes next (M7 deliberation, Monday morning, scheduled agents). Let it sit. Don't answer it for the room.

**Philosophy callouts:** at most one. *Capture* (theme #5 — the agent is trying to capture your world) is the implicit anchor under "grounding"; don't name-tag it. Do not bolt the 19 beliefs onto this lecture.

**Vision vs. detail:**
- Vision layer: the five-move-one-arc framing, the spec-and-tests → grounding reframe, the closing question.
- Detail layer: the 500K number, the Agentics Helsinki venue, the *"no, like this"* phrasing.
