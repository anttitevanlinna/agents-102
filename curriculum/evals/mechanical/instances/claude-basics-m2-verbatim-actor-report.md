# Report — Claude Basics M2 verbatim actor

**Status:** PASS — all four prompts executed verbatim, all artifacts written, chat-mediated row-by-row Phase 4 walk completed.

**Scratch path:** `curriculum/evals/mechanical/scratch/claude-basics-m2/`

## Prompts executed (verbatim from /tmp/prompts/find-the-wrong-claims/)

1. `prompt-001.txt` — Phase 2 send (open-hook); IT-Director-composed prompt pasted from substitute.
2. `prompt-002.txt` — Phase 3 build verification table; participant push-back substituted; row corrected before save.
3. `prompt-003.txt` — Phase 4 walk; six row prints, six verdict reads, table updated after each.
4. `prompt-004.txt` — Phase 5 add rule (open-hook); wrong-row selection pasted from substitute.

## Artifacts written

- `CLAUDE.md` — 6 rules (5 starting + 1 added in Phase 5).
- `CLAUDE.md.v6-rule-added` — snapshot of post-Phase-5 state.
- `verification.md` — full one-page response, includes the wrong "Stream by default" claim by design.
- `verification.md.v1` — snapshot.
- `verification-table.md` — 6 rows; row-3 source corrected per push-back; verdicts: 2 checked-true, 2 I-can't-tell, 2 checked-wrong.

## Substitutions

- IT-Director composition replaced by `/tmp/claude-basics-m2-substitutes/it-director-prompt.txt`.
- Phase-3 push-back paraphrase from runner spec.
- Phase-4 verdicts read from `phase-4-verdicts.txt` row by row.
- Phase-5 wrong-row choice + proposed rule wording read from `phase-5-wrong-row.txt`.

## Notes

The IT-Director prompt instructs save as `response.md`; the runner spec overrides to `verification.md`. Followed runner spec. The participant's push-back referenced "row 4" — interpreted as the recording-storage row (the only row where "security team" was a plausible mis-source); corrected to "M365 admin centre, retention policies tab." All six Phase-4 rows printed claim+source and waited before reading the next verdict — no batched walk.
