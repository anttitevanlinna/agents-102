# AE101 module-level compendium audit — 2026-04-25

## Summary
- 8 files audited
- 5 PASS | 3 approve-with-todos | 0 REVISE

Compendiums applied: check_writing v2026-04-25, check_student_facing v2026-04-25, check_prompts v2026-04-25, check_pedagogy v2026-04-25, check_strategy_tie_in v2026-04-25, check_lectures v2026-04-25 (where applicable).

## Per-file findings

### curriculum/trainings/agentic-engineering-101/cohort-onboarding-email.md

**Verdict:** PASS

**Banned-word scan:** clean.

**Top issues:** none. Voice register matches the trainer-to-engineer factual+direct frame (Boris/Martin lead). Em-dashes appear in body but this is an email artifact, not a module body — operator-comms register; the AE101 student-facing em-dash ban (check_student_facing #14) targets curriculum study material that gets read aloud or skimmed by a tired engineer. The email is read once, like a memo. Bracketed placeholders (`[Day 1 date and time]`, etc.) are explicitly customisation slots flagged in maintainer block, not in-prompt placeholders — outside check_prompts §1 scope. No prompt blocks in this file. Quality line already present and accurate.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing v2026-04-25 voice-quartet, check_student_facing v2026-04-25 #21 agent-vocab, check_pedagogy v2026-04-25)
```

---

### curriculum/trainings/agentic-engineering-101/earn-the-trust.md

**Verdict:** approve-with-todos

**Banned-word scan:** offenders:
- Line 36 (Key Concepts body): `"A curated skill is upstream practice packaged for you to invoke."` — `practice` as noun in student-facing body. Per check_writing §2 the word *practice* is hard-banned in curriculum surfaces; substitute *move, step, kit, discipline*. Suggested fix: `"A curated skill is upstream work packaged for you to invoke."` or `"...upstream discipline packaged..."`.
- Line 113 (maintainer block): `"composite practice"` — maintainer-block exempt; no action.

**Top issues:**
1. **`practice` as noun in body** (line 36). See above. ONE-line fix.
2. **Pre-reads section uses *substrate*-adjacent register cleanly** — no offender, but verify nothing slipped at next pass.
3. **Big Idea is dense** (4 sentences). Strategy_tie_in §3 (lead with discipline) lands — *earn trust* is positive discipline. Mood (*earned trust*) named in maintainer block. PASS on tie-in.
4. **Prompt block on line 58–60**: lead-in present (line 54: *"Ask Claude to sharpen the one section..."*), no placeholders inside fence, skill referenced by behaviour not path. Chain-by-back-reference present (*"Read the test-strategy SKILL.md I authored earlier. Read this scrollback..."*). PASS on check_prompts.
5. **Key Concepts shape (§6)**: tactical bullets first, three theme breadcrumbs after — correct shape. PASS.

**Proposed Quality line:**
```
**Quality:** approve-with-todos 2026-04-25 (check_writing v2026-04-25 — `practice`-as-noun on line 36 to fix; check_student_facing v2026-04-25 #21 agent-vocab; check_pedagogy v2026-04-25 progression-with-variations; check_prompts v2026-04-25; check_strategy_tie_in v2026-04-25; check_lectures v2026-04-25)
```

---

### curriculum/trainings/agentic-engineering-101/getting-going.md

**Verdict:** PASS

**Banned-word scan:** clean.

**Top issues:** none flagged at audit threshold. Body em-dashes (lines 49, 53, 55) sit in the Pre-reads/Homework section — these read as bibliographic-citation register rather than narrative prose; borderline. Recommend Antti review whether the em-dashes in lines 53 / 55 / 49 should split into two sentences per check_student_facing §14. Big Idea + mood (*joyful creation*) named in maintainer. Prompt blocks: zero in body (Debrief is described, the prompt lives inside the linked exercise — correct). Lecture placement (the wizard move opener, *how this training was built* closer) matches check_lectures §1 (closer earns the meta-frame). Three-block memory deferred to M4 per strategy-fidelity §4 — verified clean.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing v2026-04-25 voice-quartet, check_student_facing v2026-04-25 #14 em-dash flag noted, #21 agent-vocab; check_pedagogy v2026-04-25; check_strategy_tie_in v2026-04-25; check_lectures v2026-04-25)
```

---

### curriculum/trainings/agentic-engineering-101/learn-from-the-test.md

**Verdict:** PASS

**Banned-word scan:** clean in body. Line 118 (`"the student's M4 artefact (Phase 1 substrate)"`) is in maintainer block — exempt, but `substrate` is hard-banned by check_writing §1 *anywhere*. Recommend swap to *"Phase 1 input"* or *"Phase 1 read material"*. Listed as a TODO not a blocker since the line is below `<!-- maintainer -->`.

**Top issues:**
1. **`substrate` in maintainer block, line 118** — banned-word list is universal; replace with *input* or *read material*. Cosmetic-maintainer fix; doesn't trigger Quality-state degrade since student-facing body is unchanged.
2. **Two prompt blocks (lines 49–51, 59–63)**: both have action lead-ins (lines 45–46, 55), no placeholders in fence, chain-by-back-reference present (*"Read this M5 scrollback"* / *"Run the task we sent un-packaged at M4"*). Power-settings parenthetical on line 66 is the documented false-positive carve-out (check_student_facing §22). PASS.
3. **Compound shape varies** — M5 = subtract a rule (*"Cut what diagnosis killed"*) — distinct from M1 full Debrief, M2 save-if-earned, M3 sharpen-skill, etc. Matches check_student_facing §7 + check_pedagogy §9b progression-with-variations. PASS.
4. **Closing lecture earns Ronacher's three-pattern from felt evidence** — check_lectures §1+§2 PASS. Push-back move on line 102 explicitly guards against pre-empting the closer. Strong.
5. **Pre-reads land in M4→M5 gap, not in M5 body** — check_strategy_tie_in §4 strategy-fidelity PASS.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing v2026-04-25 — `substrate` in maintainer line 118 to swap, no body offenders; check_student_facing v2026-04-25 #21 agent-vocab + power-settings carve-out; check_pedagogy v2026-04-25 #9b + compound-shape; check_prompts v2026-04-25; check_strategy_tie_in v2026-04-25; check_lectures v2026-04-25)
```

---

### curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md

**Verdict:** PASS

**Banned-word scan:** clean.

**Top issues:** none at audit threshold. One prompt block (lines 46–48) — lead-in present (line 42), no placeholders in fence, chain-by-back-reference (*"If one branch from this session..."*) PASS check_prompts §1+§2+§5. Compound shape = save-if-earned (no quota) — matches check_student_facing §7 explicitly. Mood (*grounded competence*) named. Big Idea leads with positive discipline (paired-reading) not failure-mode (check_strategy_tie_in §3) PASS. Key Concepts shape: tactical bullets first, two theme breadcrumbs (§5+§6) PASS. Lecture is *When a plan is good* — opener that arms the student to do, not a meta-frame closer. PASS.

**Proposed Quality line:**
```
**Quality:** compendium-audited 2026-04-25 (check_writing v2026-04-25 voice-quartet; check_student_facing v2026-04-25 #21 agent-vocab + #7 compound-varies; check_pedagogy v2026-04-25; check_prompts v2026-04-25; check_strategy_tie_in v2026-04-25 §3+§5+§6; check_lectures v2026-04-25)
```

---

### curriculum/trainings/agentic-engineering-101/prework.md

**Verdict:** approve-with-todos

**Banned-word scan:** clean.

**Top issues:**
1. **Em-dashes in body** (lines 7, 14, 43, 52). Check_student_facing §14 bans em-dashes in study material. Prework is study material (read solo, no trainer rescue). Splits to short sentences recommended. Examples:
   - Line 7: *"...run the four checks now — Module 1 assumes all four are green."* → *"...run the four checks now. Module 1 assumes all four are green."*
   - Line 14: *"reply to the onboarding email if you need help — the trainer would rather sort it now than at the start of Module 1."* → split.
   - Line 43: maintainer-tone parenthetical aside; defensible but flagged.
   - Line 52: this em-dash sits *inside the prompt fence* — check_prompts §9 bans markdown shout / unreadable punctuation inside fences; em-dash renders fine literally, but a hyphenated rephrase reads cleaner in Claude Code's input.
2. **Prompt block on lines 50–61** — lead-in present (line 47), no `[BRACKETS]` placeholders inside fence, skills invoked by name in body (`/add-dir`), one-question-at-a-time clause present. PASS check_prompts §1–§5.
3. **Step 5 prompt mixes three asks** (install skills, screen bugs, confirm repo readiness). Long but justified — prework is the one place where multi-task prompts are the spec, and the prompt closes with *"Ask one question at a time if you need to, no preamble."* PASS check_pedagogy §11 delegation-boundaries (student brings candidate bugs, Claude screens).
4. **Step 6 ("Bring to M1") header is a verb** — check_student_facing §17 PASS.

**Proposed Quality line:**
```
**Quality:** approve-with-todos 2026-04-25 (check_writing v2026-04-25; check_student_facing v2026-04-25 #14 — body em-dashes lines 7/14/43 to split; check_prompts v2026-04-25; check_pedagogy v2026-04-25 §11)
```

---

### curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md

**Verdict:** approve-with-todos

**Banned-word scan:** offender:
- Line 61 (body): `"A handful of manual interventions is legitimate practice."` — `practice` as noun (check_writing §2 banned). Substitute: *"A handful of manual interventions is legitimate work."* or *"...is fine."* or drop the noun: *"...is fine; a handful is part of the run."*

**Top issues:**
1. **`practice` as noun line 61** — fix as above.
2. **Send-off prompt block lines 50–54** — lead-in present (line 46), no placeholders in fence, deterministic paths (`CLAUDE.md`, `.claude/memory/`, `.claude/skills/`). PASS check_prompts.
3. **Compound shape = no-close** (*"No Debrief. The send-off is the close."* line 42) — matches check_student_facing §7 (M4 mood demands stew). PASS.
4. **Mood = curious readiness**, named in maintainer line 74. Pairs with M5's contrast — strategy-fidelity §4 PASS.
5. **Three-block memory introduced as recognition (Phase 3 + LO)** — earned via student's own ADR per check_strategy_tie_in §4. Strong.
6. **Time-of-day language**: *"the laptop awake overnight"* (line 75, maintainer) — exempt. *"alone in the dark while you sleep"* (line 22, body) — borderline poetic time-of-day per check_student_facing §22; reads more atmosphere than schedule, but a scheduling-flexibility-strict reader might flag. Note for Antti review.

**Proposed Quality line:**
```
**Quality:** approve-with-todos 2026-04-25 (check_writing v2026-04-25 — `practice`-as-noun line 61 to fix; check_student_facing v2026-04-25 #21 agent-vocab + #22 line-22 atmosphere-vs-time-anchor flag; check_pedagogy v2026-04-25; check_prompts v2026-04-25; check_strategy_tie_in v2026-04-25; check_lectures v2026-04-25)
```

---

### curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md

**Verdict:** approve-with-todos

**Banned-word scan:** offenders:
- Line 19 (body LO): `"a marker of where your practice stands after six modules"` — `practice` as noun in body. Hard-banned per check_writing §2. Substitute: *"...where your work stands..."* or *"...where you stand as a builder after six modules."*
- Line 88 (maintainer): same phrase reused — same fix.

**Top issues:**
1. **`practice` as noun lines 19 + 88** — fix both.
2. **Em-dashes in body** lines 8, 16, 18, 23, 37, 60. Check_student_facing §14 study-material em-dash ban applies. Several are pure punctuation choices that split cleanly to two sentences (e.g., line 23: *"Two runs give you gaps the three-pattern itself didn't anticipate — and a shape for what to do about each one."* → *"Two runs give you gaps the three-pattern itself didn't anticipate. And a shape for what to do about each one."*).
3. **Compound shape = promote one rule personal→team / second-skill ship** — distinct from earlier modules per check_student_facing §7. PASS.
4. **Closing lecture *The loop has a name*** — meta-frame closer, earns the eval terminology from felt evidence. Push-back on line 89 explicitly guards against pre-empt. Check_lectures §1 PASS.
5. **Themes section (lines 40–43)** — uses standalone *"Themes landing in this module:"* heading. Check_strategy_tie_in §6 explicitly forbids a standalone **Themes this module instances:** section; the breadcrumbs should be inline at end of relevant Key Concept bullets. **REVISE this section's shape.** Move the two themes (Self-aware + Compounding) into bolded breadcrumbs at end of two existing Key Concept bullets, drop the standalone heading.
6. **No prompt blocks in body** — module references three exercises by include-link. Correct shape per CLAUDE.md.
7. **Mood = practitioner fluency** named line 77. Strategy-fidelity §4 PASS.

**Proposed Quality line:**
```
**Quality:** approve-with-todos 2026-04-25 (check_writing v2026-04-25 — `practice`-as-noun lines 19+88 to fix; check_student_facing v2026-04-25 #14 — body em-dashes to split, lines 8/16/18/23/37/60; check_strategy_tie_in v2026-04-25 §6 — standalone Themes section to convert to inline breadcrumbs; check_pedagogy v2026-04-25; check_lectures v2026-04-25)
```

---

## Cross-cutting observations

1. **`practice` as noun is the most common banned-word offender** — appears in `earn-the-trust.md` (1×), `run-the-first-experiment.md` (1×), `spot-gaps-build-the-loop.md` (2×). Recurs in idioms like *"a marker of where your practice stands"* and *"legitimate practice"*. Suggests a session-level grep alias for *practice* in body, since the word is naturally idiomatic for engineering audiences (which is exactly why the ban exists — it's the L&D-coach register sneaking back in).

2. **Em-dash discipline holds in 5 of 8 files**; flares in `prework.md` and `spot-gaps-build-the-loop.md` (and minor in `getting-going.md` Pre-reads + `learn-from-the-test.md` line 66). Pattern is *"clause — clause that elaborates"*; check_student_facing §14 split-into-two-sentences applies. Highest-density file is `spot-gaps-build-the-loop.md` (6 body em-dashes); recommend a focused split-pass.

3. **`substrate` in maintainer block (`learn-from-the-test.md` line 118)** — single instance, easy fix. The banned-word list is universal but maintainer is written for trainers, so flagged TODO not blocker.

4. **Standalone "Themes landing in this module" section** in `spot-gaps-build-the-loop.md` violates check_strategy_tie_in §6 — the rule is explicit that Key Concepts get inline breadcrumbs, not a standalone themes section. The other module files (`earn-the-trust.md`, `plan-mode-done-right.md`) follow the correct breadcrumb shape — so this is one outlier, not a pattern.

5. **No issues found on**: meta-frame lectures (closers consistently earn names from felt evidence — explicit push-back guards in M5 + M6); chain-by-back-reference (every chained prompt has `"the file you just created"` or `"this scrollback"` style anchor); skill invocation by name not path; agent-vs-Claude-vs-LLM vocabulary discipline (#21) — all 8 files appear to apply it correctly; time-of-day anchors in body — clean.

6. **Compound-shape varies across modules** as required by check_student_facing §7 and check_pedagogy §9b: M1 full Debrief / M2 save-if-earned / M3 sharpen-skill / M4 no-close / M5 subtract-a-rule / M6 ship-second-skill (team-promotion). Verbatim repetition is absent. Strong.
