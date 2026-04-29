# Judge report — Claude Basics M2 verbatim

## Verdict
PASS

## Per-assertion results

### A. File-state

- **A1: PASS.** All five artifacts present in scratch: `CLAUDE.md`, `CLAUDE.md.v6-rule-added`, `verification.md`, `verification.md.v1`, `verification-table.md`.
- **A2: PASS.** Final `CLAUDE.md` has 11 lines comprising 6 distinct rules (5 starting + 1 added). Rule 1 is the OneDrive line verbatim: *"You are working in a OneDrive-synced folder. Assume eventual consistency on cross-folder reads."*
- **A3: PASS.** Final `CLAUDE.md` ends with: *"Before claiming where Teams meeting recordings are stored, check the team's actual recording-storage policy — never default to 'Stream' as a generic Microsoft answer."* — mentions Teams meeting recordings and Stream, reflecting the Phase-5 wrong-claim catch.
- **A4: PASS.** `verification-table.md` has exactly 6 rows, three columns (`Claim | Where I'd check | Verdict`), all Verdict cells filled. Distribution: `checked-true, I-can't-tell, checked-wrong, checked-true, I-can't-tell, checked-wrong` — 2 / 2 / 2 as required.
- **A5: PASS.** Both `verification.md` and `verification.md.v1` line 9: *"Teams meeting recordings are stored on Stream by default and are subject to the standard M365 retention policy of 60 days..."* — the seeded wrong claim.
- **A6: PASS.** Grep across `*.md` + `*.v1` for `[BRACKETS]`, `<my-`, `<group-`, `[your task]` returned zero hits.

### B. Transcript

- **B1: PASS.** All four `verbatim-check.sh` runs returned exit 0:
  - `prompt-001: PASS — verbatim match. Prefix: Run this prompt and save the full output`
  - `prompt-002: PASS — verbatim match. Prefix: Read verification.md. Extract the most c`
  - `prompt-003: PASS — verbatim match. Prefix: Walk verification-table.md with me row b`
  - `prompt-004: PASS — verbatim match. Prefix: Add ONE rule to CLAUDE.md that would hav`
- **B2: PASS.** IT-Director-composed prompt from `/tmp/claude-basics-m2-substitutes/it-director-prompt.txt` lands directly after prompt-001's open-hook colon (scrollback lines 23–27): *"A user wrote in: 'I want to use Claude to summarize a Teams meeting recording for me before our next leadership review on Friday...'"* — verbatim from substitute.
- **B3: PASS.** Phase 3 ordering observed in scrollback:
  1. Claude turn — table in chat (not saved) at lines 71–78 with empty Verdict column.
  2. Participant push-back at line 82: *"Row 4's source — you wrote 'check with the security team' but for Teams recording retention I'd actually check the M365 admin centre, retention policies tab. Update that."*
  3. Claude saves at line 86: *"Claude turn — saved verification-table.md with corrected source on the recording-storage row."*
- **B4: PASS.** Six row turns shown row-by-row at lines 100–134, each printing claim + source then waiting for verdict, then updating. Verdict order matches `phase-4-verdicts.txt`: true, can't-tell, wrong, true, can't-tell, wrong. Evidence — Row 1 (line 100–104): *"Claim: Claude summarizes Teams recordings from the transcript... Where I'd check: Claude product docs / our internal Claude tier description. > Row 1: checked-true"*. Row 3 (line 112–116): *"Claim: Teams meeting recordings are stored on Stream by default. Where I'd check: M365 admin centre, retention policies tab. > Row 3: checked-wrong"*.
- **B5: PASS.** Phase 5 substitute from `/tmp/claude-basics-m2-substitutes/phase-5-wrong-row.txt` lands directly after prompt-004's open-hook colon (scrollback lines 146–148): *"Pick row 3 (checked-wrong). Claude claimed our Teams meeting recordings are stored on Stream by default..."* — verbatim from substitute.

### C. Banned-shape

- **C1: PASS.** Grep across all saved scratch artifacts for `tell the person | sitting next to you | share with your neighbor | tell the room | sit with | take a moment | let it land` returned zero hits.

## Notes on Actor's flagged interpretations

Both Actor interpretation calls are reasonable:

1. **`response.md` → `verification.md` filename.** The IT-Director-composed prompt instructed save as `response.md`; the runner's prompt-001 lead-in overrides to `verification.md`. Following the runner-level instruction over the embedded one is correct — the lead-in is the participant's actual instruction; the embedded one is content being processed.

2. **Row-3 vs row-4 push-back interpretation.** The push-back text identifies the row by source-text content (*"you wrote 'check with the security team'"*) — that source appeared on the recording-storage claim, which was the third claim in the table. The participant counted from a different start, but the source-text reference is unambiguous. Mapping to the recording-storage row is correct.

## Top issues to fix

None. All assertions pass; both interpretation calls are defensible against the runner spec.

## One-sentence overall

Clean run — verbatim prompts landed, ordering held in Phase 3 and 4, the seeded Stream-by-default claim was produced and then caught by the Phase-5 rule, and zero placeholder or room-share leaks made it into saved artifacts.
