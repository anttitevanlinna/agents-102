# Composing the workflow


---

By now you've shipped enough on your own that the next question stops being one a prompt can answer for you. You have a kit: a test-strategy skill, a verifier, a second skill. How practitioners compose kits like this into workflows is a conversation the field is having right now. Not one converged shape. At least five approaches in active use among the practitioners this curriculum surveys, plus a counter-position arguing the human reviewer is the constraint, not the composition. There is no prompt to drill at this point. The move is to read.

Klaassen ships Compound Engineering as a named framework: file paths between subagents, with hard gates at every seam. Cherny publishes scattered composition primitives on X: subagents, slash commands, hooks, MCP, verifier discipline. He has not unified them under a framework label. Pocock ships a public kit of small named skills the human invokes one at a time as the task calls for them. Cognition argues for a single writer surrounded by advisor agents that contribute intelligence, not actions. Amp ships composition features and methodologies inside its own product runtime. Ronacher, the counter-voice, argues review bandwidth is the constraint composition cannot relax, and keeps his own skills disposable. These approaches disagree about what *subagent* even means, where memory closes, and whether the human should be doing the chaining or the chain should be doing the human.

The reading walks each approach with what's distinctive, the canonical URL, and where a practitioner running it actually starts. Two or three practitioners is enough to track. Pick across the approaches whose shape resembles your day. The conversation will keep moving. The slower-moving signal is the shape of work each approach handles. The supplementary also carries a worked example from AE101 trainer Dino: a complete skill stack that demonstrates all four composition mechanisms in one place, primary doc plus three diagrams.

This is one level higher in abstraction and composition. Compound engineering already ships as a plugin you can install. Your Claude Code can build the kit you need once it finds the right thread to pull. Choice in the world is approaching infinite. This is one of those places that calls for intuition and taste. Your intuition.

[Workflow composition lineages](trainings/agentic-engineering-101/supplementary/workflow-composition-lineages.md)

<!-- maintainer -->


**Quality:** draft 2026-05-21 (rewritten 2026-05-21 after fact-check: five-approaches framing replaced earlier "five live lineages" claim; per-practitioner lines tightened against verified primary sources; supersedes 2026-05-20 draft. 2026-05-24: P3 gained one sentence pointing at Dino's worked-example case study in the supplementary; no re-balancing of the P2 practitioner list.)

**Lecture meta:** *3–4 min M6 mini-lecture (≈350 words body), placed in the closer area between Human close and the closing lecture pair. Names the shift from cohort-pedagogy to practitioner-mode, walks the five composition approaches + Ronacher counter-position in one line each, points at a trainer's worked-example case study in the supplementary, and closes on a Risto-flavoured lead-out (one level higher in abstraction; Claude Code can build the kit; choice is approaching infinite; intuition and taste; *your* intuition). Points at the workflow-composition-lineages supplementary for depth. Lead-in is explicit ("there is no prompt to drill at this point") so the student knows the register has changed. Variety preserved in body: the approach-naming paragraph keeps the complexity visible at lecture-listening time, not deferred to the supplementary.*

**Time:** 3–4 min at presentation pace, or a 4-min student read on their own.

**Length discipline (do not grow):** M6's closer area is already lecture-dense (Human close → Composing the workflow → The loop has a name → Agents that build agents). This lecture works as a short pointer with named approaches; if it grows into a mini-survey, it competes with the supplementary instead of pointing at it. Ceiling: the four paragraphs as currently shipped. New approach discoveries land in the supplementary; the lecture body adjusts only if an approach gets dropped or renamed at the field level. The approach walk in P2 is the minimum that preserves variety per Antti's 2026-05-20 redirect; cutting below one sentence per approach would re-collapse the complexity. **2026-05-24 carve-out:** the worked-example case-study sentence in P3 is the deliberate exception — Dino's stack is the worked example of the lecture's framework, not another field-practitioner shape, so it lands as a pointer in P3 rather than a new entry in P2's list. P2 stays at five practitioner shapes + Ronacher counter.

**Attribution-cap exception (per `check_writing.md` rule 11):** The lecture body names seven practitioners (Klaassen / Cherny / Pocock / Cognition / Amp / Ronacher in P2's field walk + Dino in P3 as the worked-example pointer), each once. Rule 11 caps repetition of one practitioner; this lecture's content IS the lineage walk + worked-example pointer, so each named once is the artefact's shape. Future judges should not re-flag.

**Delivery mode:** Read aloud in-room at the closer area, or skipped if cohort is tight on time (the supplementary is the load-bearing piece; the lecture is the pointer).

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-05-25 result:OK due:2026-11-25]` <delegates to workflow-composition-lineages.md> — pointer lecture, evidence verified in supplementary (B6-B17). fallback: if lecture ever asserts the 80/20 directly, inherit B1's plugin-README fix; fix the broken Dino link per B18.

**Frameworks attributed (by reference, not name in body):**
- All five approaches + Ronacher counter-position attributed in the supplementary, not in the lecture body. Preserves the lecture as a pointer rather than a citation-laden read.

**Watch-fors:**
- Don't let the lecture become a deep walk in itself. Four paragraphs + a link. If the lecture grows past 4 min in rehearsal, the depth belongs in the supplementary.
- Mood is practitioner fluency, with a beat of *the curriculum is stepping back here*. Risto-flavoured forward-look at the close (the slower-moving signal). Don't drift into sales-copy (*"you're a master now"*) or coach-warmth (*"trust your taste"*).
- **Sample-not-universe.** P1's *"five approaches in active use among the practitioners this curriculum surveys"* is deliberate scoping. Do not let a trainer slip into *"there are five approaches in the field"* — that's a field-totality claim the curriculum does not back. The supplementary intro carries the same caveat for the reader.
