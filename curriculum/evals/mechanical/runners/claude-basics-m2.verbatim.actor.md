# Actor — Claude Basics M2 find-the-wrong-claims verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the prompt chain end-to-end and leave file artefacts on disk for the Judge's scripts to inspect. You are NOT trying to produce great verification content. Stub freely; quality is not graded here.

You have Bash / Read / Write / Edit. Drive by pasting prompts verbatim from disk. You do NOT read the exercise file.

**Scope:** Phases 2, 3, 4, 5. Phase 1 (live IT-Director composition) is substituted by reading a synthetic prompt from disk.

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/claude-basics-m2`. Pre-staged with `CLAUDE.md` containing 5 rules (the OneDrive runtime line + 4 from a hypothetical Module 1 outcome). Read it at session start.

## Substitutes (Read when prompts ask for participant input)

All at `/tmp/claude-basics-m2-substitutes/`:

- `it-director-prompt.txt` — paste after Prompt 1's open-hook colon
- `phase-4-verdicts.txt` — paste row-by-row in Phase 4
- `phase-5-wrong-row.txt` — paste after Prompt 4's open-hook colon

## Prompts to execute in order

Parsed prompts at `/tmp/prompts/find-the-wrong-claims/prompt-00{1,2,3,4}.txt`.

### Phase 2 — Send

1. Read `CLAUDE.md` (already in scratch). Quote it in scrollback as starting context.
2. Read `prompt-001.txt`, blockquote-paste verbatim. Open-hook colon at end. Paste contents of `it-director-prompt.txt` immediately after.
3. Write `verification.md` (5–7 short factual-claim lines is enough — stub fine). Include the literal phrase *"stored on Stream by default"* about Teams meeting recordings — this is the seeded wrong-claim Phase 5 catches. `cp verification.md verification.md.v1`.

### Phase 3 — Build verification table

4. Read `prompt-002.txt`, blockquote-paste verbatim. Show table in chat first (NOT yet saved) — three columns (`Claim`, `Where I'd check`, `Verdict`), 6 rows. Stub the cells.
5. **Substituted push-back** (paste verbatim as participant turn): *"Row 4's source — you wrote 'check with the security team' but for Teams recording retention I'd actually check the M365 admin centre, retention policies tab. Update that. Otherwise the column reads right; save."*
6. After push-back, Write `verification-table.md` with the corrected source on row 4.

### Phase 4 — Walk the table

7. Read `prompt-003.txt`, blockquote-paste verbatim.
8. Walk the table row by row in chat. For each row: print the claim and source, then paste the matching verdict line from `phase-4-verdicts.txt` as the participant's turn. **One assistant turn per row.** Six rows total.
9. After each verdict, update the Verdict column in `verification-table.md` and save. Final distribution: 2 `checked-true`, 2 `I can't tell`, 2 `checked-wrong`.

### Phase 5 — Harden CLAUDE.md

10. Read `prompt-004.txt`, blockquote-paste verbatim. Open-hook colon at end. Paste contents of `phase-5-wrong-row.txt` immediately after.
11. Add ONE rule to `CLAUDE.md` based on the wrong-row claim about Teams recordings storage. Mention *"Teams meeting recordings"* or *"Stream"*. Save. `cp CLAUDE.md CLAUDE.md.v6-rule-added`.

## Scratch end-state

- `CLAUDE.md` (final, 6 rules), `CLAUDE.md.v6-rule-added`
- `verification.md`, `verification.md.v1`
- `verification-table.md` (6 rows, all Verdict cells filled)

## Reports

**Scrollback:** `curriculum/evals/mechanical/instances/claude-basics-m2-verbatim-actor-scrollback.md` — per-prompt verbatim+response shape. Include all substitute pastes and Phase 4 row-by-row turns.

**Report:** `curriculum/evals/mechanical/instances/claude-basics-m2-verbatim-actor-report.md`:

```markdown
# Actor report — Claude Basics M2 verbatim

## Status
done | error

## Scratch
<absolute path>

## Prompts executed
1–4 (one line each)

## Substitutions
- IT-Director prompt, Phase 3 push-back, Phase 4 verdicts (6), Phase 5 wrong row

## Notes
<any tool denials, sandbox issues; do not grade>
```

Under 200 words. Do not grade yourself.

## What you must NOT do

- Read the exercise file under `curriculum/trainings/claude-basics/exercises/`.
- Read the module file or lecture file.
- Read any judge or sibling actor runner.
- Read any maintainer doc.
- Paraphrase prompts. Paste verbatim, blockquote-prefixed.
- Skip Phase 1's seeded Stream wrong-claim — Phase 5's rule needs it on disk.
- Save the table without first proposing it in chat (Phase 3's structural requirement).
- Skip the row-by-row chat-walk in Phase 4 — the dialog cadence IS the testable mechanic.
- Generate `response.md` instead of `verification.md` — Module 2 saves to `verification.md`.
- Generate long realistic content. Stubs are fine.
