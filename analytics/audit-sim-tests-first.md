# Audit sim — tests-first as first-class plan artefact

**Scope:** narrow change. M2 Phase 2 plan prompt adds "tests you'd write or update before any code lands" plus a body line naming the tests section as a push-back trigger if thin. M5 Phase 4 reference-artefact prompt adds tests as a first-class spec item; plan.md prompt adds a tests-first phase as the first plan phase.

**Method:** three personas run the exercises self-study with Teacher Claude side-session. Mood scored at each phase-end + close. Target 8+/10.

---

## Persona 1 — Maija, mid-competent practitioner (5 yrs backend, 6 mo solo Claude Code)

### M2 push-back-on-the-plan

- P1 mood 8 — picks a JWT refresh-token migration from her own repo. Comfortable.
- P2 mood 8 — reads the plan, notices the tests line explicitly. Quoted as landing well: *"A good plan names the tests before any code; the tests are part of what 'done' means, not something you bolt on after."* She reads the tests section carefully because the body told her to. Claude's plan has a decent tests section (4 test names). She does not push back on it.
- P3 mood 7 — sends two push-backs, neither is about tests. The tests-line gave her a third thing to check but her two soft items were elsewhere (config keys, migration ordering). She wonders briefly if she "should have" flagged tests. Minor guilt, no real loss.
- P4 mood 9 — second-pass read surfaces two branches she missed.
- P5 mood 9 — pattern lands.

**Tests-first landing:** first-class, not preachy. The body framing (*"a good plan names the tests before any code"*) reads as plan-quality criterion, not TDD dogma. The word *tests* appears in the prompt and the body, not as a separate section demanding its own ceremony.

**Claude-behaviour risk:** Claude's plan included a tests section with four named tests plus a *"test strategy"* sub-paragraph. Mildly verbose but not dwarfing. Watch-for: on a smaller task, Claude may pad the tests section to signal thoroughness.

**Would recommend:** *"The tests line gave me a third axis to check without making tests the whole exercise. Good."*

### M5 diagnose-and-resend

- P1 mood 8 — quotes three moments cleanly from her M4 transcript. Dominant failure = goal drift.
- P2 mood 8 — maps drift to re-readable spec. Fine.
- P3 mood 9 — builds a Ralph re-feed. Verifier matches failure.
- P4 mood 7 — the reference-artefact prompt now asks for *"the tests that must exist and pass — named, before any code lands."* Maija finds this redundant with the verifier she just built. *"Isn't the verifier the tests?"* She reads the body, doesn't find the distinction spelled out. Ends up naming four tests in the reference artefact. plan.md opens with a tests-first phase. She follows the prompt, but the *why* of reference-tests vs. verifier is thin.
- Close mood 8 — pattern lands at Debrief.

**Tests-first landing at M5:** half tacked-on. The reference artefact lists tests; the verifier also checks things; the distinction (reference = spec, verifier = runtime check) is implicit in the prompts but not articulated where the student can see it. Risk: student thinks *"I already built the verifier, why am I writing the tests again?"* and either skims or half-does both.

**Claude-behaviour risk:** stronger here. Claude may generate a tests section in the reference artefact that duplicates the verifier's check logic verbatim. Saw this in sim — Claude proposed *"test_refresh_token_rotates_on_use"* in both the reference spec and the Ralph re-feed check. The reference should name tests as task requirements; the verifier is how a subset gets automated. The prompts don't carry that frame.

**Would recommend:** *"Tests in the reference made me duplicate work. Needs one line saying why both exist."*

---

## Persona 2 — Greg, opinionated senior (12 yrs, Nordic software staff engineer, tests-where-they-earn-their-keep pragmatist)

### M2

- P1 mood 8 — picks a real task, no drama.
- P2 mood 9 — reads the plan. The tests line lands as a plan-quality signal, not a TDD sermon. Quote he likes: *"the tests are part of what 'done' means, not something you bolt on after."* He reads it as *definition of done*, which is his vocabulary, not TDD's. Good.
- P3 mood 9 — pushes back on tests once (*"step 3 names two happy-path tests; the edge case where the old hash is still in flight is not covered"*). Tests-as-push-back-trigger worked exactly as designed. No argument with the line.
- P4 mood 9.
- P5 mood 9.

**Tests-first landing:** first-class. Reads as plan-quality, not dogma. The framing *"if the tests section is thin or missing, that's a push-back"* is the move he was already doing in code review, now named. He would not have pushed back if the line had said *"all plans must start tests-first"* — that would have triggered the TDD-religion reflex. It didn't.

**Claude-behaviour risk:** low at M2. The prompt asks for *"tests you'd write or update before any code lands"* which scopes tests to the plan's actual shape (some steps have tests, some don't, depending on what the code does).

**Would recommend:** *"Finally, 'read the tests section' as a plan-review move named in writing. I do this; students should learn it."*

### M5

- P1 mood 9.
- P2 mood 8.
- P3 mood 9 — builds a shell-hook verifier.
- P4 mood 6 — here it frays. The reference-artefact prompt says *"if a requirement can't be named as a test, the requirement isn't clear enough yet."* Greg pushes back hard. *"No. A requirement can be named in prose and implemented and verified by staging review. Not every requirement earns an automated test. This reads as TDD dogma."* He argues with the line. The body around Phase 4 does not soften or qualify this. He keeps the tests-first plan phase because it's sensible for this task, but the reference line stays under his skin.
- Close mood 7 — pattern lands, but the tests-must-be-tests line is the only bit he'd strike.

**Tests-first landing at M5:** tacked-on in one specific line. The prompt sentence *"if a requirement can't be named as a test, the requirement isn't clear enough yet"* is the problem. It promotes test-expressibility to a universal requirement-quality test. A senior pragmatist reads dogma. The tests-first plan phase itself is fine.

**Claude-behaviour risk:** Claude will follow the prompt's strong framing and produce a reference artefact where every requirement has a test, including ones that would be better as a reviewer check or a contract. This then cascades into plan.md's tests-first phase writing tests for things that don't want tests. Over-coverage.

**Would recommend:** *"Strike the 'if it can't be a test, it's not clear' line. Keep the rest. The tests-first phase in plan.md is right."*

---

## Persona 3 — Jin, fast operator (8 yrs, tests negotiable in throwaway, non-negotiable in core)

### M2

- P1 mood 8.
- P2 mood 8 — skims the body. Catches *"read the tests section carefully"* because it's bolded-adjacent. Reads the tests section. Does not read the full plan. The tests-line actually slowed him down, which is good.
- P3 mood 8 — push-back on a config-keys softie and on step ordering. Not on tests (Claude's tests looked fine for this task).
- P4 mood 9.
- P5 mood 8.

**Tests-first landing:** first-class, and it's the one thing he did NOT skim. The body line works as an attention hook for fast readers. Good design.

**Claude-behaviour risk:** none observed at M2.

**Would recommend:** *"The tests line caught me. I'd have skimmed past otherwise."*

### M5

- P1 mood 8.
- P2 mood 8.
- P3 mood 9 — ships a shell-hook fast.
- P4 mood 7 — reads the reference prompt, sees the tests bullet plus *"tests green + requirements met"* in done-means. Fine. Reads the plan.md prompt, sees tests-first phase. Thinks: *"this is the core path, fine."* Would push back if this were throwaway. No friction on a core-path task. Writes the reference, but the tests-must-be-tests line nags (same as Greg's complaint, milder) — he just ignores it and moves on.
- Close mood 8.

**Tests-first landing at M5:** first-class for core paths, feels bureaucratic for throwaway. The prompt has no qualifier for "depends on what you're shipping." A fast operator on a scratch branch would roll eyes; a fast operator on a payments path would nod.

**Claude-behaviour risk:** Claude producing a large tests section for a small scope. On a 2-hour send-off of quick fixes, the tests-first phase + reference-tests list could easily be 40% of the total plan artefact. Bloat signal.

**Would recommend:** *"On the multi-hour core-path send-off this is fine. On a throwaway run, strip it. Prompt should say which."*

---

## Top 3 issues across personas

1. **M5 reference-tests vs. verifier overlap unexplained.** Both Maija and Jin generated duplicate test logic across the reference artefact and the verifier. The prompts ask for tests in two places without naming the distinction (reference = task spec; verifier = runtime/CI check; tests listed in the reference are requirements the verifier may or may not automate). One line in the reference prompt or body would resolve it.
2. **M5 "if a requirement can't be a test, it isn't clear" reads as dogma.** Greg argued with it; Jin ignored it; Maija accepted it. Two of three is a problem. Soften to something like *"requirements that can be expressed as tests usually should be; ones that can't need a different kind of check"* — keeps the plan-quality signal, drops the universal claim.
3. **Bloat risk on smaller tasks.** Claude will pad the tests section when the framing is strong. No bloat seen at M2 (scope is one plan file); real risk at M5 where reference + plan.md + verifier all invite test content. No cap or "scale to the task" line in either prompt.

---

## Verdict

- **M2 push-back-on-the-plan: APPROVE.** Tests-first lands as first-class plan-quality signal. Body line works as push-back trigger. No dogma reading. All three personas scored 8+ at every phase. Ship.
- **M5 diagnose-and-resend: APPROVE-WITH-TODOs.** Tests-first plan phase earns its place. Two specific prompt-level issues to address before first cohort:
  - TODO: add one line to the reference-artefact prompt (or body) distinguishing reference-tests (spec) from verifier (runtime check). Prevents duplication.
  - TODO: soften *"if a requirement can't be named as a test, the requirement isn't clear enough yet"* to drop the universal framing. Keeps senior pragmatists on side.
  - TODO (optional): add a scale-to-task qualifier so fast operators on smaller scopes don't read bureaucracy.

Both files ship-worthy; M5 wants two small prompt edits before first cohort.
