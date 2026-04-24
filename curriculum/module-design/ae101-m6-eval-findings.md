# AE101 M6 — eval findings (LLM-as-judge + source-verify)

Run date: 2026-04-24. Scored against `ae101-m6-verifier.md` contributory judges + exercise/lecture templates. Source-verify per reference TODO.

## Summary

- **Files scored:** 4 (2 exercises, 2 lectures).
- **Verdicts:** 4 approve-with-todos, 0 revise.
- **Essential judges (J1–J7 + template essentials):** all pass across all four files.
- **Contributory judges at 2–3 (TODO-worthy):** 3 total (em-dash discipline on the closer; length overshoot on the closer; minor link-format on story-of-module-6).
- **Source claims:** 3 load-bearing numeric/framing claims in the closer. **2 HOLD** (Intercom 19.2% / 14.6 vs 75.8 / 86% ≤20 / 500 R&D; Ramp 350-skill marketplace). **1 REVISE** (Ramp "harness was the bottleneck, not the model" is close paraphrase of Geoff Charles's framing — attribution is correct, phrasing should acknowledge it's a paraphrase or lift the exact quote).

---

## TASK 1 — LLM-as-judge verdicts

### FILE: `curriculum/exercises/spot-gaps-build-the-loop.md`

Judges (per exercise template + M6 verifier):
- **Primary leap test:** pass — three moves (diagnose, name gaps, author skill) each tied to observable outcomes; authoring ships to `~/.claude/skills/` and invocation-as-test is mandated.
- **Framing fidelity:** pass — leads with diff-two-runs, refuses compliance/credibility-performance framings explicitly in maintainer watch-fors.
- **Learning goal fit:** pass — Analyze (Phase 1), Create + Evaluate (Phase 2 author + self-critique), Understand (closer handoff). All five LOs covered across exercise + closer.
- **Module-to-module arc:** pass — picks up M5 packaged run; hands off to closer (evals-with-full-weight) and to arc-retrospective.
- **Mood lands:** 8/10 at phase ends, 9/10 at close. Phase 1 carries risk of compliance-feel but prompt's push-back rule corrects; Phase 2 invocation-as-test is the mood earner.
- **Teaching moment lands:** pass — "the skill fires on the packaged run or it's documentation" is the load-bearing test and it's named.
- **Riffs on recognized framework:** pass — Klaassen review+compound credited in maintainer; three skill shapes convergent across practitioners.
- **Facilitator briefing:** pass — watch-fors, decision points, pacing, plug points all present.
- **Scaffold / worked example:** pass — M3 test-strategy skill explicitly referenced as prior exercise producing the same artifact shape.
- **Prompt design:** pass — no `[BRACKETS]` inside fenced blocks; prompts instruct Claude to ask questions conversationally.
- **Plug points real:** pass — student's own M4/M5 artefacts + team code-review conventions.
- **Business-audience language:** pass (AE101 = engineer audience; all tech terms earned in prior AE101 modules).
- **Voice:** pass — second-person throughout body; `<!-- maintainer -->` cut line clean.
- **Length:** ~830 words, slightly over target but exercise carries phase weight — contributory.
- **J5 placeholder-in-fence:** clean. **J6 skill-invocation:** clean (skill invoked by name, not path; the `~/.claude/skills/<skill-name>/SKILL.md` instance is a ship-destination, not an invocation target). **J7 delivery-architecture:** clean.

**VERDICT: approve-with-todos**
**TODOs:** None blocking. Three-persona sim deferred per maintainer block.

---

### FILE: `curriculum/exercises/arc-retrospective.md`

Judges:
- **Primary leap test:** pass — agent reads artefacts, writes arc-note, student push-back is the evaluate move.
- **Framing fidelity:** pass — refuses trainer-monologue retrospective and changelog framing.
- **Learning goal fit:** pass — Evaluate (student pushes back on arc-reading against own sense).
- **Module-to-module arc:** pass — picks up both M4 and M5 artefacts plus both skills; hands off to Debrief.
- **Mood lands:** 8/10. Practitioner fluency forward-looking. Watch-for: trainer-monologue drift named in maintainer.
- **Teaching moment lands:** pass — "everything is scaling of learning" throughline landed through student's own evidence, not trainer voice.
- **Riffs on framework:** pass — scaling-of-learning throughline + agent-as-mirror (M4 audit-as-subagent extension).
- **Facilitator briefing:** pass — failure modes, pacing decisions, plug points.
- **Scaffold:** pass — `orient-and-introspect.md` shape reference; bounded-activity pattern reused.
- **Prompt design:** pass — one prompt, no placeholders, Task-tool sub-task enforced.
- **Plug points real:** pass — student's actual artefacts.
- **Business-audience language:** pass.
- **Voice:** pass — second-person; single `<!-- maintainer -->` cut.
- **Length:** ~320 words body, within bounded-activity target.
- **J3 banned-word:** clean. **J4 student-POV:** clean. **J5/J6/J7:** clean.

**VERDICT: approve-with-todos**
**TODOs:** Confirm Task-tool sub-task read reliability before first cohort (already named in maintainer block).

---

### FILE: `curriculum/lectures/story-of-module-6.md`

Judges (lecture template):
- **Primary leap test:** pass — reader can articulate the non-determinism condition, recognize rules-loaded-but-bypassed pattern, accept permission-giving framing.
- **Framing fidelity:** pass — explicitly cut credibility-performance in turn 7 per maintainer; lands on non-determinism.
- **Learning goal fit:** pass — sets up Phase 1 diagnosis without pre-empting it (names meta-level drift, not student-run drift).
- **Module-to-module arc:** pass — picks up M5 (packaged re-run), primes M6 exercise.
- **Exercise setup:** pass — names the condition (non-determinism, rule-leak) without spoiling specific failure modes student will hit.
- **Mood lands:** 9/10. Permission-giving voice carries; not credibility-performance.
- **Voice:** pass — first-person past, signed, Risto-direct. Per maintainer: Antti reshapes in final voice.
- **Business-audience language:** pass (AE101 engineer audience).
- **Length:** ~720 words, within 800-1200 prework target but this is an opener so shorter is correct.
- **Specificity:** pass — named dates, model, turn counts, specific fails.
- **J3 banned-word:** clean. **J10 em-dash discipline:** acceptable — em-dashes used sparingly, most for parenthetical clarification (model, origin).
- **J11 link format:** N/A — no inline curriculum links in body.

**VERDICT: approve-with-todos**
**TODOs:** Antti voice pass (maintainer TODO); three-persona sim on opinionated-senior register.

---

### FILE: `curriculum/lectures/the-loop-has-a-name.md`

Judges:
- **Primary leap test:** pass — reader can name evals with full weight (verifier=judge=gate=eval), articulate stance-survives-model-change, recognize scheduled-agents primitive.
- **Framing fidelity:** pass — one-word naming, not vendor-plug.
- **Learning goal fit:** pass — Understand (name evals) + forward-looking encoding stance.
- **Module-to-module arc:** pass — picks up second-skill from exercise; bridges to M7 or Monday-morning explicitly.
- **Exercise setup:** N/A (closer).
- **Mood lands:** 8/10. Watch-for named: Ramp/Intercom numbers as vendor-plug risk; stance-survives-model beat is the earner.
- **Voice:** pass — second-person, Risto epistemic directness on "the specific Claude will be replaced."
- **Business-audience language:** pass.
- **Length:** ~950 words body — above the 250-350 line-budget set in reference artefact for closer (`what-packaging-is.md` shape = ~770). Contributory overshoot.
- **Specificity:** pass — named companies, named numbers, named primitives, reference-page pointer.
- **J3 banned-word:** clean. **J10 em-dash discipline:** 3/5 — moderate em-dash use in body; a few split what could be two sentences. Approve-with-todos. **J11 link format:** pass — `[Scheduled agents](../reference/scheduled-agents.md)` uses title.

**VERDICT: approve-with-todos**
**TODOs:** (1) source-verify per Task 2 below; (2) trim toward 770-word `what-packaging-is.md` shape if time; (3) em-dash sweep — split 3-5 into short sentences; (4) three-persona sim (CTO / senior engineer / M1–M6-only engineer).

---

## TASK 2 — Source verification

| Claim | Status | Evidence | Source-type label |
|---|---|---|---|
| Ramp "plugin-style marketplace, hundreds of skills" | **REVISE to specific: 350** | `observations/ramp.md`: "Skills marketplace (internal): **350+ skills shared**" and "**Dojo**, an internal skills marketplace (350+ skills)". Primary source: Geoff Charles [practitioner direct, 2026-04-09] x.com/geoffintech/status/2042002590758572377. | [practitioner direct] |
| Ramp "harness was the bottleneck, not the model" | **REVISE — paraphrase, not verbatim** | `observations/ramp.md` quotes Charles directly: *"The models were good enough. The harness wasn't."* The closer's line is a close paraphrase, not Charles's exact words. Attribution to Ramp engineers is accurate in substance. Reword to either (a) quote Charles verbatim or (b) explicitly frame as paraphrase. | [practitioner direct] |
| Intercom 19.2% auto-approved | **HOLDS** | `observations/intercom.md`: "**19.2% of PRs auto-approved by AI**, no human reviewer." Source: Darragh Curran, *"2x — nine months later"*, 2026-04-16, ideas.fin.ai/p/2x-nine-months-later. | [practitioner direct] |
| Intercom 14.6 min vs 75.8 min org median | **HOLDS** | `observations/intercom.md`: "Auto-approved PRs merge in 14.6 min (vs 75.8 min org median)." Same source. | [practitioner direct] |
| Intercom 86% ≤20 lines | **HOLDS** | `observations/intercom.md`: "86% of auto-approved PRs are ≤20 lines." Same source. | [practitioner direct] |
| Intercom 500-person R&D | **HOLDS** | `observations/intercom.md`: "~500 R&D people across four offices on two continents." Same source. | [practitioner direct] |
| Intercom freshness | **HOLDS** | Post dated 2026-04-16; today 2026-04-24. Within 6-month window by a wide margin. | — |

### Proposed edit text (closer body)

**Current:**
> Ramp's engineering org runs a plugin-style marketplace — an internal catalogue of skills their engineers author and share. Last public count put it in the hundreds. The framing from Ramp's own engineers is worth sitting with: *the harness was the bottleneck, not the model.*

**Proposed:**
> Ramp's engineering org runs a plugin-style marketplace — an internal catalogue of skills their engineers author and share. Geoff Charles, Ramp's CPO, put the count at 350 in April 2026. The framing from Charles himself is worth sitting with: *"the models were good enough. The harness wasn't."*

Maintainer block updates: the source-verification TODO for Ramp can be closed with the 350 number now backed, and the "harness" framing can be upgraded from our-synthesis to verbatim-quote.

---

## Populating the eval instance

Contributory judges for the eval instance (`agentic-engineering-101--spot-gaps-build-the-loop.md`) — scores below feed the stub section "Contributory judges":

- **J1 Mood match:** 4 (across all four files; closer most at risk on vendor-plug read).
- **J2 LO match:** 5 (every LO covered; no orphans).
- **J3 Banned-word clean:** clean across all four.
- **J4 Student-POV clean:** clean across all four.
- **J5 Placeholder-in-fence clean:** clean.
- **J6 Skill-invocation clean:** clean.
- **J7 AE101 delivery-architecture clean:** clean.
- **J8 Earn tech terms:** 4 (eval/judge/verifier/gate earned load-bearing at closer; skill/memory/agent primed upstream).
- **J9 Prompt action lead-in:** 5 (all fenced prompts preceded by verb-led lead-in).
- **J10 Em-dash discipline:** 3 on closer (sweep recommended); 4+ elsewhere.
- **J11 Link format:** 5 (titles not filenames; one scheduled-agents link correctly titled).
- **J12 LLM-vs-agent-vs-Claude discipline:** 4 (minor blurring in story-of-module-6 where *Claude* is used for both product and LLM-behaviour in adjacent sentences; acceptable in first-person memo voice).
- **J13 Action-header discipline:** 5.

**Overall verdict for eval instance:** approve-with-todos. Blockers: source-verify edit on Ramp (one sentence), em-dash sweep on closer. Non-blockers: three-persona sim and Antti voice pass per existing maintainer TODOs.
