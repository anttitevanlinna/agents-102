# Edit summary — in-class beats (4 files)

## File 1: curriculum/lectures/what-packaging-is.md (M5 closing lecture)

Three additions, placed late, after Ronacher three-pattern and Intercom scale section, before counter-camp:

- **Lines 39–43 (new "The 80/20 ratio" section).** ~110-word paragraph naming the 80% planning + review / 20% execution ratio from felt evidence. Opens with "You just felt the shape of it" and ties directly to the un-packaged vs. packaged contrast the student just lived. Klaassen attributed verbatim with the quote *"Claude writes the test. The test fails — the natural first step in test-driven development (TDD)"*. Two links, titles not filenames: `[My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it)` and `[Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide)`. Landing: *"The packaging you just built IS the 80% side. The re-send was the 20%."*
- **Lines 45–47 (new "What the run cost" section).** ~85-word CTO-legible cost/latency callout. Frames agent hours as real org cost and packaging as the move that converts those hours into reliable output instead of reliably wrong output. No specific number; names the shape only.
- **Line 57 (forward pointer).** Appended sentence to the close: *"Next you will measure the reliability of the verifier you just built. The number is the gap."*

No banned words. Em-dash appears only inside the Klaassen verbatim quote (legitimate per quotation). Second person throughout.

## File 2: curriculum/exercises/diagnose-and-resend.md (M5 exercise)

Two changes:

- **Hooks vocab line (Phase 3, line 76).** Under the three-shape menu, the Deterministic shell-hook bullet gains: *"The shell-hook shape IS a Claude Code stop-hook; you will meet the word again if you extend the verifier to fire automatically between runs."* Adds the vocab without renaming the shape or adding a new phase.
- **Em-dash sweep, body prose only.** 4 em-dashes replaced outside code fences and outside maintainer block:
  - Line 15 (Phase 1 body): 1 em-dash replaced with a period, split into two sentences.
  - Lines 75, 76, 77 (Phase 3 menu bullets): 3 em-dashes replaced with periods (converted *"X — Y"* to *"X. Y."* at each bullet).

Code-fence content (prompts at lines 21–35, 51–65, 83–95, 113–131) preserved as-is per rule (em-dash ban is body only). Maintainer block (line 139 onward) untouched. Final body em-dash count: 0.

## File 3: curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md (M4 module)

One line added at line 83, in the send-off section right after the "stop the run when you've seen enough" beat:

*"The laptop running while you step away is your first async move. You will want more later."*

Permission-giving. Names the move and moves on; no explanation. Phrasing avoids the banned time-of-day anchors (*overnight / tomorrow / tonight* per compendium rule 22) by using the session-relative phrase *"while you step away"*, which is already the body's framing for this beat.

## File 4: curriculum/lectures/when-a-plan-is-good.md (M2 lecture)

M2 module file `plan-mode-done-right.md` inlines `lectures/when-a-plan-is-good.md`, so this is the M2 lecture per spec.

One line added after the "read-only is load-bearing" paragraph where the lecture names what plan mode actually is:

*"You will notice that you are waiting while Claude thinks. Other sessions could be making progress elsewhere. Not today, but soon."*

Same permission-giving voice as the M4 async beat. Plants the multisession idea without pre-empting the M4+ arc.

## Em-dash count summary

- File 1 (lecture): 0 added to body; 1 em-dash exists inside a verbatim quotation (allowed).
- File 2 (exercise): 4 replaced in body; 0 remaining in body.
- File 3 (module): 0 added; 0 touched (no body em-dashes in the lines edited).
- File 4 (lecture): 0 added; 0 touched.
