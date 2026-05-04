# AE101 lectures compendium audit — 2026-04-25

Audit of 10 AE101 lecture files against `check_writing.md`, `check_student_facing.md`, `check_lectures.md`, `check_strategy_tie_in.md`, `check_research_claims.md` (where citations apply).

## Summary

- 10 files audited
- 4 PASS | 0 approve-with-todos | 6 REVISE

PASS: how-this-training-was-built, learning-through-contrast, reading-the-return, when-a-plan-is-good.
REVISE: skills-from-the-frontier, story-of-module-6 (minor — signature em-dash + maintainer archaeology), test-and-learn, the-loop-has-a-name, the-wizard-move, what-packaging-is (source-verification debt only; body em-dashes are inside cited titles/quotes).

Dominant issue: em-dash usage in body prose. `check_student_facing.md § 14` extends the site em-dash ban to all student-facing curriculum (study material gets read aloud and skimmed; em-dashes slow both). 6 of 10 lectures contain free body em-dashes; the rest are cited-title/quote em-dashes which are sacrosanct. Banned-word grep clean across all body text.

## Per-file findings

### curriculum/lectures/how-this-training-was-built.md

**Verdict:** REVISE (em-dashes? Re-check — actually clean.) → **PASS**

**Banned-word scan:** clean

**Em-dash scan:** clean in body. (Hyphens used; no `—`.)

**Voice quartet:** Boris-Martin lead with Godin warmth in the bullet list. "Wrong is how steering gets in" is a clean Rory reframe. Doesn't drift into L&D-coach. Peer voice carries.

**Practitioner attributions:** Klaassen's compound engineering credited at the close (lecture body), with maintainer block confirming attribution and one-cite-per-module discipline.

**Lecture placement:** closer (M1 close, after `compound-and-close`). Meta-frame lecture correctly placed AS A CLOSER — recognition after the loop has been lived. Per `check_lectures.md § 1`.

**Strategy tie-in:** Themes 2/3/4 named in maintainer block; Theme 2 (compounding) is the lecture's spine, told as story. Aligns with M1 mood.

**Top issues:** none.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_lectures, check_strategy_tie_in)
```

---

### curriculum/lectures/learning-through-contrast.md

**Verdict:** PASS

**Banned-word scan:** clean

**Em-dash scan:** clean in body.

**Voice quartet:** Boris factual + Rory reframe ("Read first. Fix later. It cuts against most engineering instinct"). Clean. Not L&D-coachy.

**Practitioner attributions:** None claimed in body (correctly — opener defers to pre-read for Ronacher; convergent vocab for three failure modes is correctly framed as practitioner convergence). Maintainer block fully sourced.

**Lecture placement:** opener (M5 in-room opener). Pedagogically correct: arms the student to do (`check_lectures.md § 2`), keeps practitioner names + the three-pattern in the closer. Dosage ~5 min — minimal, per contrast-mood-opener requirement.

**Strategy tie-in:** Names M5 spirit (read first, fix later) and the test→learn→encode arc. Defers naming the three-pattern to the closer — preserves contrast.

**Top issues:** none.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_lectures, check_strategy_tie_in, check_research_claims)
```

---

### curriculum/lectures/reading-the-return.md

**Verdict:** PASS

**Banned-word scan:** clean

**Em-dash scan:** clean in body.

**Voice quartet:** Boris-led factual sentences ("Practitioners running multi-hour coding agents in the last six months name the same three failure modes"). Diagnostic framing matches the question-as-beat.

**Practitioner attributions:** Ronacher cited as `[practitioner direct]`; URL pinned with delivery-time freshness check in maintainer block. Three failure modes correctly framed as convergent practitioner vocabulary, no single attribution.

**Lecture placement:** pre-read for M5 (closes M4 Debrief). Correctly defers fixes to exercise; primes failure modes only.

**Strategy tie-in:** Plants the M5 question without front-running M5's contrast. Strategy-fidelity OK.

**Top issues:** none.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_lectures, check_strategy_tie_in, check_research_claims)
```

---

### curriculum/lectures/skills-from-the-frontier.md

**Verdict:** REVISE

**Banned-word scan:** clean

**Em-dash scan:** **6 em-dashes in body**. Lines 7, 19, 23, 25, 27, 31, 45, 48. Every em-dash creates a sub-clause that violates `check_student_facing.md § 14` (no em-dashes; simple sentences). Examples:
- L7: *"INVOKE two skills this module — one for access-control..."*
- L19: *"yes, that old — threat modeling predates..."*
- L23: *"on what you already know — which framework you use..."*
- L27: *"Intercom's 267-skill plugin repo (31% of R&D contributing) was born the same way — one engineer's contribution..."*
- L31: *"Flipped the other way — three authored skills — and you'd be reinventing STRIDE..."*
- L48: *"installed as personal skills at prework, so Claude Code auto-discovers them by name — you don't point at a path."*

**Voice quartet:** Boris-Martin lead is good (factual + strategic). The historical-practitioners voice section drifts into book-rec register (*"if you buy one security book this year, it's that"*) — borderline Godin warmth, acceptable but watch for sales-pitch tone. The "voice one / voice two / voice three" device is on the border between strategic framing (Martin) and pedagogy theatre.

**Practitioner attributions:** STRIDE → Kohnfelder & Garg (1999), Shostack (2014), Saltzer & Schroeder (1975). Correctly attributed. `check_writing.md § 11` cap of 1 student-side practitioner mention per module — this lecture cites multiple practitioners. The lecture is the M3 closer/opener, so concentrating attributions here is the right placement, but Klaassen + Intercom 267-skill claim + Pocock's `grill-me` (paraphrased in body) push the cite-count high. Verify Intercom 267-skill / 31%-contributing numbers against `continuous-research/observations/intercom.md` before first cohort.

**Lecture placement:** opener for M3 Exercises 1–3. Vocabulary lecture (introduces *skill* primitive) — appropriate as opener since it earns the term. Per `check_lectures.md § 1`, vocabulary openers are acceptable.

**Strategy tie-in:** Two-curated-one-authored ratio is the strategic anchor; aligns with content-strategy "we curate the best practitioner moves; you build what you know best." Mood target (earned trust before the earning) named in maintainer.

**Top issues:**
- 6+ em-dashes in body — cut by splitting sentences or using parentheses.
- Verify Intercom 267-skill / 31% numbers before delivery (maintainer flags as TODO; ensure pinned URL).
- "if you buy one security book this year, it's that" reads as recommendation copy — fine in peer voice, but flag for register check during sim.

**Proposed Quality line:**
```
**Quality:** draft 2026-04-25
REVISE: cut em-dashes (lines 7, 19, 23, 25, 27, 31, 45, 48); verify Intercom numbers against observation file before re-tagging.
```

---

### curriculum/lectures/story-of-module-6.md

**Verdict:** REVISE (minor)

**Banned-word scan:** clean

**Em-dash scan:** body is clean. Line 63 is `— Antti` (signature em-dash). This is conventional for a memo signature; `check_student_facing.md § 14` parenthetical exception arguably covers it (signature attribution). Acceptable, but note for delivery decision.

**Voice quartet:** First-person Antti memo. Risto epistemic directness leads (correct per maintainer's voice note). Boris-precise on the numbers ("Twenty-odd planning turns. Five taste reversals from me on Claude's confident recommendations. Three subagents in parallel"). Rory reframe in the generalisation ("A rule in context is not a rule in the output. Taste closes the gap. Nothing else does."). Clean. Not preening.

**Practitioner attributions:** None of the standard set (Cherny, Klaassen, Huryn, Ronacher) cited in body — appropriate, this is a personal session memo. Geoff Charles / Ramp paraphrase issue is *narrated* as a process failure (the lesson IS that Claude shipped paraphrase as quote). Strong move.

**Lecture placement:** M6 opener, first-person past. Permission-giving, not credibility-performance. Correctly placed before exercise.

**Strategy tie-in:** Big idea = "the LLM is not a deterministic machine; struggle is universal." Mood = permission-giving. Aligns with M6 "the loop has a name" closer (which the maintainer flags must NOT contradict). Cross-check with `the-loop-has-a-name.md` — closing tricolon was cut per maintainer note. Verify the closer in fact does not contain the cut benediction line. (Confirmed clean — no *"You know how to test"* tricolon survives.)

**Top issues:**
- Signature em-dash on L63 — keep or convert to plain "Antti" line break per delivery preference. Minor.
- Maintainer "Round 1 / Round 2" rewrite history block (lines 69–71) violates `check_writing.md § 3` ("rules are rules; history is git"). Edit-archaeology in maintainer body. Recommend: cut the round-by-round narrative; trust git log.

**Proposed Quality line:**
```
**Quality:** draft 2026-04-25
REVISE: decide on signature em-dash convention (L63); strip rewrite-archaeology block from maintainer (lines 69–71) per "rules are rules, history is git."
```

---

### curriculum/lectures/test-and-learn.md

**Verdict:** REVISE

**Banned-word scan:** clean

**Em-dash scan:** **5 em-dashes in body**. Lines 23, 25, 31, 33, 39:
- L23: *"Run one — today, un-packaged."*
- L25: *"Run two — M5, packaged."*
- L31: *"Not a template — a question..."*
- L33: *"Paweł Huryn's frame for how a practitioner's memory organises itself — Block 1..."*
- L39: *"missing a requirement you now realise wasn't in the prompt — stop it."*

**Voice quartet:** Boris-Martin clean. "What separates a practitioner from a tourist" — Rory-leaning, lands. "Cancel is legitimate. Traces are data." — strong Boris epistemic directness. No L&D-coach drift.

**Practitioner attributions:** Huryn cited correctly `[practitioner direct]`. Ronacher's three-pattern named-only-as-forward-reference (correct deferral to M5 closer). Klaassen referenced implicitly in maintainer.

**Lecture placement:** M4 opener (sets up walk-and-send-off). Vocabulary opener (introduces gap-analysis lens + Huryn three-block + experimental stance). Acceptable per `check_lectures.md § 1` — vocabulary mid-flow.

**Strategy tie-in:** Spirit ("you are testing, you are learning") names M4's mood. test→learn→encode arc lined up with M4–M5–M6. Aligns with strategy doc. "Cancel is legitimate" rule is good practitioner-stance, not safety-net (per maintainer watch-fors).

**Top issues:**
- 5 em-dashes — split or parens.
- "Run one — today" / "Run two — M5" pattern is the easiest fix (use "Run one. Today, un-packaged.").

**Proposed Quality line:**
```
**Quality:** draft 2026-04-25
REVISE: cut em-dashes on L23, L25, L31, L33, L39.
```

---

### curriculum/lectures/the-loop-has-a-name.md

**Verdict:** REVISE

**Banned-word scan:** clean

**Em-dash scan:** **4+ em-dashes in body**. Lines 9, 25, 37, 45, 55:
- L9: *"by what two runs of the same task actually taught — not by a template."*
- L25: *"a post called *2x — nine months later.*"* (this one is **in the cited title** — leave; titles are sacrosanct)
- L37: *"A standing verifier run — the judge reads..."*
- L45: *"The three pieces Ronacher named — reference, plan, verifier — are not model features. The encode loop you ran at M6 — diff, name the gaps, package the learning — is not a model feature."* (4 em-dashes in this sentence alone)
- L55: *"Each engineer brings their stack — their rules, their memory, their skills, their kit."*

**Voice quartet:** Risto epistemic directness on "the specific Claude will be replaced" — correct per maintainer. Boris-precise on the Intercom numbers. Rory-reframe on "the loop has a name" — closes well. Mood stays practitioner-fluency.

**Practitioner attributions:** Ronacher (named in body), Curran (Intercom, body, with URL flagged for verification), Cherny (implicit via "the engineer who built Claude Code" framing in `what-packaging-is`, not re-cited here). Multiple cites per `check_writing.md § 11` cap — but this is the M6 closing lecture, and concentration of credits at module-end is the right placement. Acceptable.

**Lecture placement:** M6 closer. Meta-frame lecture (names the pattern *eval* after the student built it). Correctly placed AS A CLOSER per `check_lectures.md § 1`. Earning moment ("One word") lands because the thing is in hand.

**Strategy tie-in:** Names *eval* with full weight — earns the term per `check_student_facing.md § 2`. Two-bridge close (Monday-morning vs M7) aligns with content-strategy's M7 optionality. Stance-survives-the-model is the durable-skills frame. Aligns.

**Top issues:**
- L45 has 4 em-dashes in one sentence — biggest single offender across the whole audit. Split into three short sentences.
- L9, L37, L55 each carry one em-dash — cut.
- L25 em-dash is inside Curran's post title; leave.
- Verify Intercom numbers + Ramp framing per maintainer TODO before first cohort.
- Capability check on `/schedule` and `/loop` — confirm desktop behaviour current as of cohort date. (`/schedule` is Routines / cloud per project CLAUDE.md note.)

**Proposed Quality line:**
```
**Quality:** draft 2026-04-25
REVISE: cut em-dashes on L9, L37, L55; rewrite L45 (4 em-dashes in one sentence) into 3 short sentences. Pre-cohort source verification per maintainer block. Capability recheck on `/schedule` and `/loop` before delivery.
```

---

### curriculum/lectures/the-wizard-move.md

**Verdict:** REVISE

**Banned-word scan:** clean

**Em-dash scan:** **6 em-dashes in body**. Lines 15, 17, 21, 23 (×2), 29, 37:
- L15: *"something Italian — pasta, osso buco, risotto."*
- L17: *"something Finnish — salmon, rye bread, meatballs."*
- L21: *"what you already know about how this works — and what you're about to learn."*
- L23: *"Heart-healthy. Low-sodium. Vegetable-forward. Not because Claude knows medicine better than Italian cooking — because you told it who you are..."*
- L29: *"You'll watch what's *possible* — not what's missing."*
- L37: *"In the Connections question you just answered — the trick you brought — the room gets its first leveling move."* (2 em-dashes)

**Voice quartet:** Seth × Rory × Risto per maintainer voice note. Lands well — warm + counterintuitive + direct-about-refusals. *"There's no certificate at the end. The builder CTO who funded this training doesn't buy certification theater"* is good Rory + Boris. *"You become the Claude wizard by running the loop on real work and letting the habit sharpen"* — clean closer.

**Practitioner attributions:** None in body (Context-is-King demo is universal/not-attributed; correctly stolen-verbatim-from-Agents 101 per maintainer note). Acceptable.

**Lecture placement:** M1 opener (after Connections, before exercise). Demo-style lecture showing the ceiling. Per `check_lectures.md § 1`, demo-openers are correctly placed at the beginning. Pairs with the closer `how-this-training-was-built` (per that file's maintainer block) — opener shows ceiling, closer names the pattern. Correct.

**Strategy tie-in:** "Context is whatever you tell it" plants the most foundational AE101 theme. Refusals (no remediate, no grade, no winner-vendor) align with strategic stance.

**Top issues:**
- 6 em-dashes — most are the *list-introducer* shape (*"something Italian — pasta..."*). Trivial to fix with a colon: *"something Italian: pasta, osso buco, risotto."*
- L37 has 2 em-dashes in one sentence (parenthetical via dash-pair) — convert to parens.

**Proposed Quality line:**
```
**Quality:** draft 2026-04-25
REVISE: cut em-dashes on L15, L17, L21, L23, L29, L37 (mostly list-introducers; replace with colons).
```

---

### curriculum/lectures/what-packaging-is.md

**Verdict:** REVISE

**Banned-word scan:** clean

**Em-dash scan:** body em-dash count is low (visible matches are inside cited titles or quote contexts). But L41 contains an em-dash inside Klaassen's quote (*"The test fails — the natural first step..."*) — quote sacrosanct, leave. L35 uses no em-dash. Need re-grep:

Body em-dashes: L41 only and that's a quote inside a citation — acceptable.

Wait — re-checking: the original grep showed only L35 and L41 as containing `—`, and both are inside quotation/title contexts. Body proper appears clean of free em-dashes. **Body is clean** of `check_student_facing.md § 14` violations.

**Voice quartet:** Boris-precise on the three-pattern names. Risto on the cost-of-the-run section. Rory reframe on "Two camps, both real." Clean. The 80/20 ratio paragraph is dense with citation; survives.

**Practitioner attributions:** Ronacher (three-pattern, body, MUST verify URL), Cherny (three shapes, body, MUST verify the framing is his not synthesis), Curran (Intercom, body), Huntley (Ralph, body), Klaassen (80/20, body, with two URLs), Sourcegraph Amp (counter-camp, body). High-density attribution, but this is the M5 closer where naming earns its weight.

**Cite-count check (`check_writing.md § 11`):** practitioner mentions per module M5 = Ronacher in pre-read + Ronacher (named) + Cherny + Curran + Huntley + Klaassen + Amp in closer. Pre-read Ronacher is the only M5 student-side mention before this; the closer concentrates the rest at the right place (recognition moment). Defensible, but on the boundary. The closer is the natural home — keep.

**Lecture placement:** M5 closer. Names Ronacher's three-pattern AFTER the student built each piece. Correct meta-frame-as-closer per `check_lectures.md § 1`. Earning moment ("Pause for a second...") is load-bearing.

**Strategy tie-in:** Spirit and arc match content-strategy. Bridge to M6 ("the verifier is an eval") foreshadows without spoiling. Counter-camp (Sourcegraph Amp) is the epistemic-honesty beat — aligns with two-camp framing.

**Top issues:**
- Pre-cohort source verification is the dominant TODO (every URL + number + Cherny three-shape framing). Maintainer flags this.
- Cherny "three shapes" framing — verify it's his, not synthesis. If synthesis, reframe as "three shapes practitioners use" without single attribution.
- Sourcegraph Amp counter-camp must pin to specific practitioner post.
- Cite-count is on the boundary — acceptable but watch.

**Proposed Quality line:**
```
**Quality:** draft 2026-04-25
REVISE: pre-cohort source verification on every URL + number per maintainer block. Confirm Cherny three-shape framing is his (not paraphrased into existence). Pin Sourcegraph Amp counter-camp to a specific practitioner URL or reframe.
```

(Note: body em-dash discipline holds; the visible em-dashes are inside cited titles/quotes which are sacrosanct. If the cited Klaassen quote is reformatted at delivery, the em-dash there would still be defensible per `check_student_facing.md § 14` parenthetical exception for quoted content.)

---

### curriculum/lectures/when-a-plan-is-good.md

**Verdict:** PASS

**Banned-word scan:** clean in body. ("Ritual" appears once in maintainer block as discussion of the word's pedagogical handling — body itself uses *"is cosmetic"* per the maintainer's own resolution. Confirmed clean.)

**Em-dash scan:** clean in body.

**Voice quartet:** Boris-Martin clean. *"Plan mode in Claude Code is a permission state, not a feature"* — Boris precision + Rory reframe (the counterintuitive correction). *"Agreement is cheap; the read is what matters"* — Rory closer to the three-pressures section. Strong. Not L&D-coach.

**Practitioner attributions:** Plan mode cited as Claude Code platform fact with URL `[practitioner direct]` (Anthropic docs). No external practitioner cite in body — appropriate, this is a tool-mechanic lecture.

**Lecture placement:** M2 opener (primer-before-exercise). Names three-things / three-pressures that Phase 3 forces, but does NOT name "plan-mode approval inflation" (label lands retroactively at exercise P5). Correct vocabulary-opener handling per `check_lectures.md § 2`.

**Strategy tie-in:** Mood target (anticipation toward grounded competence) named. Aligns with M2's spine. Optional "ask plan mode directly" sub-section is a clean student-agency move (skippable, no dead-end).

**Top issues:** none in body. Maintainer block contains a "Voice check" passage that is pre-emptive bookkeeping; the file is otherwise clean.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing, check_student_facing, check_lectures, check_strategy_tie_in, check_research_claims)
```

---

## Cross-cutting observations

1. **Em-dashes are the dominant violation.** 6 of 10 lectures contain body em-dashes. The most common shape is the *list-introducer* (*"something X — items, items, items"*) which fixes trivially with a colon. The second is the *parenthetical-pair* (*"thing — clause — continues"*) which fixes with parentheses or sentence-split. `the-loop-has-a-name.md L45` is the worst single offender (4 em-dashes in one sentence). `learning-through-contrast.md`, `reading-the-return.md`, `how-this-training-was-built.md`, `when-a-plan-is-good.md` are clean — they ARE possible.

2. **Banned-word grep is clean.** Zero hits across body prose for `honest / delve / landscape / importantly / crucial / substrate / ritual / ceremony`. The compendium-audit discipline has held. (One mention of "ritual" survives in `when-a-plan-is-good.md`'s maintainer block as historical voice-check note — body uses "is cosmetic.")

3. **Lecture placement is correct across all 10.** Meta-frame lectures (`how-this-training-was-built`, `the-loop-has-a-name`, `what-packaging-is`) are placed as closers. Vocabulary openers (`when-a-plan-is-good`, `test-and-learn`) and demo-openers (`the-wizard-move`) are placed at module starts. Pre-reads (`reading-the-return`) and contrast-mood openers (`learning-through-contrast`) defer naming to the closers correctly. Per `check_lectures.md § 1` & § 2, pedagogical placement holds throughout.

4. **Practitioner attribution discipline is on the boundary.** `check_writing.md § 11` caps attribution at one student-side mention per module. M5 (`reading-the-return` pre-read + `learning-through-contrast` opener + `what-packaging-is` closer) cites Ronacher across two surfaces; the closer additionally names Cherny / Curran / Huntley / Klaassen / Amp. Each has an earning moment, but the density is high. M3 (`skills-from-the-frontier`) names Kohnfelder, Garg, Shostack, Saltzer, Schroeder, Klaassen, Intercom in one lecture — high but defensible since this is the dedicated "skills + curated practitioners" beat.

5. **Source-verification debt is the M5 / M6 risk.** `the-loop-has-a-name`, `what-packaging-is`, `reading-the-return`, `the-wizard-move` (no), `skills-from-the-frontier` all flag pre-cohort source verification as MUST-DO in maintainer blocks. Until those are resolved, the lectures cannot promote past `compendium-audited`. The verification list (URLs + numbers + Cherny three-shape framing + Amp counter-camp pin + Intercom 267-skill / 31% / 19.2% / 14.6 vs 75.8 / 86% / 500-person / `/schedule` capability) is concentrated and should be batched in one verification pass.

6. **Capability check on Claude Code primitives** — `/schedule` (Routines / cloud) and `/loop` (in-session) need a current-as-of-cohort verification per the project CLAUDE.md "verify capabilities BEFORE asserting" rule. `the-loop-has-a-name.md` makes a load-bearing claim that should not ship from training-data memory.

7. **Edit-archaeology leak in `story-of-module-6.md` maintainer block.** Lines 69–71 narrate "Round 1 / Round 2" rewrites in prose. `check_writing.md § 3` ("rules are rules; history is git") ban extends to maintainer body too. Cut.

8. **No L&D-coach register drift detected.** No "pause and reflect" / "sit with this" / "step back" headers or sentence-prefixes in body across the 10 files. `check_student_facing.md § 23` (reflection beats stay invisible) holds throughout. The voice quartet is in good shape.

9. **No time-of-day anchors detected** in body across all 10 files. `check_student_facing.md § 22` holds. (One reference in `learning-through-contrast.md` to *"Today is the learn"* uses "today" as session-relative phrasing per the rule's allowed substitutes — acceptable.)

10. **Path-leak / filename-link discipline.** Inline links in body use titles or sentence-case phrases. `the-loop-has-a-name.md` has *([Scheduled agents](../reference/scheduled-agents.md))* — title-style, correct. `what-packaging-is.md` cites Klaassen URLs by article title — correct. No filename-paths in student-facing prose detected.
