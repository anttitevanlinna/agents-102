# Composing the workflow

You have a kit: a test-strategy skill, a verifier, a second skill. How kits like this compose into workflows is a conversation the field is having right now, so there is no prompt to drill here; the move is to read.

## Five composition approaches and a counter-voice

- **Klaassen ships Compound Engineering as a named framework.** File paths between subagents, with hard gates at every seam.
- **Cherny publishes scattered composition primitives on X.** Subagents, slash commands, hooks, MCP, verifier discipline. He has not unified them under a framework label.
- **Pocock ships a public kit of small named skills.** The human invokes them one at a time as the task calls for them.
- **Cognition argues for a single writer surrounded by advisor agents.** The advisors contribute intelligence, not actions.
- **Amp ships composition features and methodologies inside its own product runtime.** The composition story lives in the product.
- **Ronacher is the counter-voice.** Review bandwidth is the constraint composition cannot relax, and he keeps his own skills disposable.

They disagree about what *subagent* even means, where memory closes, and whether the human should be doing the chaining or the chain should be doing the human.

## How to read the field

- **A sample, not the universe.** Five approaches plus a counter-position is what's in active use among the practitioners this curriculum surveys. The field is larger, and the conversation will keep moving.
- **Two or three practitioners is enough to track.** The reading walks each approach with what's distinctive, the canonical URL, and where a practitioner running it actually starts. Pick across the approaches whose shape resembles your day.
- **The slower-moving signal is the shape of work each approach handles.** Which approach is loudest changes monthly; which kind of work it fits does not.
- **A worked example rides in the supplementary.** A complete skill stack from AE101 trainer Dino demonstrates all four composition mechanisms in one place, primary doc plus three diagrams.
- **One level higher in abstraction, and the call is yours.** Compound engineering already ships as a plugin you can install; your Claude Code can build the kit you need once it finds the right thread to pull. Choice in the world is approaching infinite. This is one of those places that calls for intuition and taste. Your intuition.

[Workflow composition lineages](trainings/agentic-engineering-101/supplementary/workflow-composition-lineages.md)

<!-- maintainer -->

**Slides-only pass (2026-07-02, unaudited):** four prose paragraphs → lede + two slides. P1 SPLIT: kit-recap + register-shift ("no prompt to drill; the move is to read") KEPT as the setup lede; the five-approaches scoping CONVERTED to slide 2's *sample, not the universe* bullet (preserves the sample-not-universe watch-for as body text, not just trainer note). P2 CONVERTED to slide 1, one bullet per approach — the one-sentence-per-approach floor from Antti's 2026-05-20 redirect holds; the root-disagreement sentence rides as slide 1's kicker. P3 CONVERTED to slide 2 (reading guidance + Dino worked-example pointer, 2026-05-24 carve-out intact). P4 CONVERTED to slide 2's closing bullet, near-verbatim (Risto close kept, "Your intuition" verbatim). Supplementary link KEPT below slides. No cuts; no covered regions. No Quality line predates this pass (file was unaudited).

**Lecture meta:** *3–4 min M6 mini-lecture, placed in the closer area between Human close and the closing lecture pair. Names the shift from cohort-pedagogy to practitioner-mode, walks the five composition approaches + Ronacher counter-position one bullet each, points at a trainer's worked-example case study in the supplementary, and closes on a Risto-flavoured lead-out. Lede is explicit ("no prompt to drill") so the student knows the register has changed.*

**Time:** 3–4 min at presentation pace, or a 4-min student read on their own.

**Length discipline (do not grow):** M6's closer area is already lecture-dense (Human close → Composing the workflow → The loop has a name → Agents that build agents). This lecture works as a short pointer with named approaches; if it grows into a mini-survey, it competes with the supplementary instead of pointing at it. Ceiling: the lede + two slides as currently shipped. New approach discoveries land in the supplementary; the lecture body adjusts only if an approach gets dropped or renamed at the field level. Slide 1 is the minimum that preserves variety per Antti's 2026-05-20 redirect; cutting below one bullet per approach would re-collapse the complexity. **2026-05-24 carve-out:** the worked-example case-study bullet in slide 2 is the deliberate exception — Dino's stack is the worked example of the lecture's framework, not another field-practitioner shape, so it lands as a pointer in slide 2 rather than a new entry in slide 1's list. Slide 1 stays at five practitioner shapes + Ronacher counter.

**Attribution-cap exception (per `check_writing.md` rule 11):** The body names seven practitioners (Klaassen / Cherny / Pocock / Cognition / Amp / Ronacher in slide 1 + Dino in slide 2 as the worked-example pointer), each once. Rule 11 caps repetition of one practitioner; this lecture's content IS the lineage walk + worked-example pointer, so each named once is the artefact's shape. Future judges should not re-flag.

**Delivery mode:** Read aloud in-room at the closer area, or skipped if cohort is tight on time (the supplementary is the load-bearing piece; the lecture is the pointer).

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-05-25 result:OK due:2026-11-25]` <delegates to workflow-composition-lineages.md> — pointer lecture, evidence verified in supplementary (B6-B17). fallback: if lecture ever asserts the 80/20 directly, inherit B1's plugin-README fix; fix the broken Dino link per B18.

**Frameworks attributed (by reference, not name in body):**
- All five approaches + Ronacher counter-position attributed in the supplementary, not in the lecture body. Preserves the lecture as a pointer rather than a citation-laden read.

**Watch-fors:**
- Don't let the lecture become a deep walk in itself. Lede + two slides + a link. If the lecture grows past 4 min in rehearsal, the depth belongs in the supplementary.
- Mood is practitioner fluency, with a beat of *the curriculum is stepping back here*. Risto-flavoured forward-look at the close (the slower-moving signal). Don't drift into sales-copy (*"you're a master now"*) or coach-warmth (*"trust your taste"*).
- **Sample-not-universe.** Now carried in body (slide 2, first bullet). Do not let a trainer slip into *"there are five approaches in the field"* — that's a field-totality claim the curriculum does not back. The supplementary intro carries the same caveat for the reader.
