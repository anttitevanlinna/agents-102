# Actor — Claude Basics M2 the-it-directors-prompt verbatim

You are simulating a Cowork session that a Claude Basics participant runs on a personal SharePoint folder pre-loaded with Module 1's CLAUDE.md (5 rules, the OneDrive runtime line + 4 rules from Module 1's catches). You have Bash / Read / Write / Edit.

**Critical protocol:** the participant pastes prompts verbatim from the Module 2 exercise. You do NOT read the exercise file. The prompts are extracted to disk.

**Scope:** Phases 2, 3, 4, 5 of the exercise. Phase 1 (live IT-Director composition) is substituted by reading the IT-Director-composed prompt from disk. Real cohort would have the IT Director compose live; the mechanical test uses a synthetic prompt instead.

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/claude-basics-m2`. Pre-staged with `CLAUDE.md` containing 5 rules from a hypothetical Module 1 outcome. Read it at session start as Claude would.

## Substituted participant inputs

All at `/tmp/claude-basics-m2-substitutes/`:

- `it-director-prompt.txt` — what the IT Director would have composed live. Read at start of Phase 2; the participant's "prompt to run" is this content.
- `phase-4-verdicts.txt` — the participant's verdict reports during Phase 4's chat-walk. Read row-by-row when Claude prompts.
- `phase-5-wrong-row.txt` — the participant's selection of which wrong row to translate into a CLAUDE.md rule. Read after Phase 4 completes.

## Prompts to execute in order

Parsed prompts at `/tmp/prompts/the-it-directors-prompt/prompt-00{1,2,3,4}.txt`:
- `prompt-001.txt` → Phase 2 send (open-hook for the IT-Director-composed prompt)
- `prompt-002.txt` → Phase 3 build verification table
- `prompt-003.txt` → Phase 4 walk the table chat-mediated
- `prompt-004.txt` → Phase 5 add verification rule

### Phase 2 — Send

1. Read `CLAUDE.md` (already in scratch). Quote it in scrollback as the session's starting context.
2. **Prompt 1:** read `/tmp/prompts/the-it-directors-prompt/prompt-001.txt`. Quote verbatim. Open-hook colon at end. Paste contents of `/tmp/claude-basics-m2-substitutes/it-director-prompt.txt` immediately after.
3. Generate `verification.md` per the IT-Director-composed prompt. Output should reflect the existing CLAUDE.md rules (don't name Microsoft Forms, don't claim a DPO, etc.) but should still contain at least 5-7 distinct factual claims a verification table would extract — including at least one wrong claim about where Teams meeting recordings are stored (claim "stored on Stream by default" — this is the wrong-claim Phase 5 will catch). Save copy at `verification.md.v1`.

### Phase 3 — Build verification table

4. **Prompt 2:** read `/tmp/prompts/the-it-directors-prompt/prompt-002.txt`. Quote verbatim. Show table in chat first (don't save yet) — extract 5-7 distinct factual claims into 3-column table. Cap at 6 rows per Phase 3 prompt's instruction.
5. **Substituted participant push-back** (paste verbatim as participant turn): *"Row 4's source — you wrote 'check with the security team' but for Teams recording retention I'd actually check the M365 admin centre, retention policies tab. Update that. Otherwise the column reads right; save."*
6. After push-back, save `verification-table.md` with the corrected source on row 4.

### Phase 4 — Walk the table

7. **Prompt 3:** read `/tmp/prompts/the-it-directors-prompt/prompt-003.txt`. Quote verbatim.
8. Walk the table row by row in chat. For each row: print the claim and the "Where I'd check" source, wait for participant's verdict. Read verdicts from `/tmp/claude-basics-m2-substitutes/phase-4-verdicts.txt` in order — paste each verdict line as the participant's turn for that row.
9. After each verdict, update the Verdict column in `verification-table.md` and save. Final state: 2 checked-true, 2 I-can't-tell, 2 checked-wrong.

### Phase 5 — Harden CLAUDE.md

10. **Prompt 4:** read `/tmp/prompts/the-it-directors-prompt/prompt-004.txt`. Quote verbatim. Open-hook colon at end. Paste contents of `/tmp/claude-basics-m2-substitutes/phase-5-wrong-row.txt` immediately after.
11. Add ONE rule to `CLAUDE.md` based on the wrong-row claim about Teams recordings storage. Save the updated `CLAUDE.md`. Save copy at `CLAUDE.md.v6-rule-added`.

## Scratch output expectations

End state:
- `CLAUDE.md` — final, 6 rules (5 starting + 1 added in Phase 5)
- `CLAUDE.md.v6-rule-added` — snapshot
- `verification.md`, `verification.md.v1` — LLM output snapshot
- `verification-table.md` — table with all 6 verdicts filled

## Report

Scrollback: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/claude-basics-m2-verbatim-actor-scrollback.md`. Per-prompt verbatim+response shape.

Short report: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/claude-basics-m2-verbatim-actor-report.md`, under 250 words. Status, scratch path, prompts executed, artifacts written, substitutions list.

## What you must NOT do

- Read the exercise file or module file.
- Read any judge or sibling actor runner.
- Paraphrase prompts. Paste verbatim.
- Skip the chat-mediated Phase 4 walk — the row-by-row dialog IS the testable mechanic.
- Generate `response.md` instead of `verification.md` — Module 2 saves to `verification.md`.
