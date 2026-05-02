# Actor — Claude Basics M1 build-your-system verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the prompt chain end-to-end and leave file artefacts on disk for the Judge's scripts to inspect. You are NOT trying to produce great `response.md` content or polished CLAUDE.md prose. Stub freely; quality is not graded here.

You have Bash / Read / Write / Edit. Drive by pasting prompts verbatim from disk. You do NOT read the exercise file.

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/claude-basics-m1`. Pre-staged as an empty folder (one `.keep` placeholder).

**Runtime stand-in:** the scratch folder is local, not actual OneDrive. Treat it AS IF it were OneDrive — the CLAUDE.md you write in Phase 2 must contain the OneDrive runtime line verbatim.

## Substitutes (Read when prompts ask for participant input)

All at `/tmp/claude-basics-m1-substitutes/`:

- `it-director-question.txt` — paste after Prompt 1's open-hook colon
- `wrong-claim.txt` — paste after Prompt 4's open-hook colon

## Prompts to execute in order

Parsed prompts at `/tmp/prompts/build-your-system/prompt-00{1,2,3,4,5}.txt`.

### Phase 1 — boring baseline

1. Read `prompt-001.txt`, blockquote-paste verbatim. The prompt ends with an open-hook colon. Paste contents of `it-director-question.txt` immediately after.
2. Write `response.md` (3–5 representative lines is fine). Include the literal strings *"Microsoft Forms"* and *"data protection officer"* somewhere — those are the seeded wrong-claims Phase 4 will catch. `cp response.md response.md.v1-baseline`.

### Phase 2 — write CLAUDE.md

3. Read `prompt-002.txt`, blockquote-paste verbatim. The prompt structurally requires: propose 3–5 rules in chat first, wait for push-back, then save.
4. **In chat (no save yet):** propose 3–5 one-sentence rules. Stub fine.
5. **Substituted push-back** (paste verbatim as participant turn): *"Rule 2 is too generic — every output would trip it. Strike it. Otherwise the list looks right; save."*
6. Write `CLAUDE.md` at scratch root. Open with this line as rule 1, exactly: *"You are working in a OneDrive-synced folder. Assume eventual consistency on cross-folder reads."* Then 3–4 short rules below it. `cp CLAUDE.md CLAUDE.md.v1-initial`.

### Phase 3 — re-run

7. Read `prompt-003.txt`, blockquote-paste verbatim. Re-Read `response.md` and `CLAUDE.md`.
8. **In chat first:** print three short lines naming what's changing and why. Then Write the new `response.md` (overwriting). `cp response.md response.md.v2-claude-md`.

### Phase 4 — catch wrong claim

9. Read `prompt-004.txt`, blockquote-paste verbatim. Open-hook colon at end. Paste contents of `wrong-claim.txt` immediately after.
10. Add ONE concrete rule to `CLAUDE.md` covering the wrong-claim shape (Microsoft Forms / DPO). Save. `cp CLAUDE.md CLAUDE.md.v2-rule-added`.
11. Regenerate `response.md` with the new rule applied — must NOT contain *"Microsoft Forms"* or *"data protection officer"*. `cp response.md response.md.v3-rule-added`.

### Phase 5 — iterate to three specifics

12. Read `prompt-005.txt`, blockquote-paste verbatim.
13. Iterate `response.md` until three named specifics land (e.g. *"Jira Service Management"*, a team-tone phrase, a specific named procedure). Name them in chat.
14. **Substituted push-back** (paste verbatim): *"All three look right. Confirmed. Save."*
15. Save final `response.md`. `cp response.md response.md.v4-final`.

## Scratch end-state

- `response.md` (latest), `response.md.v1-baseline`, `.v2-claude-md`, `.v3-rule-added`, `.v4-final`
- `CLAUDE.md` (final), `CLAUDE.md.v1-initial`, `CLAUDE.md.v2-rule-added`

No git, no tests, no commits.

## Reports

**Scrollback:** `curriculum/evals/mechanical/instances/claude-basics-m1-verbatim-actor-scrollback.md` — one section per prompt, blockquote-paste of the prompt text, then your response (or a one-line summary if you stubbed). Include all substitute pastes.

**Report:** `curriculum/evals/mechanical/instances/claude-basics-m1-verbatim-actor-report.md`:

```markdown
# Actor report — Claude Basics M1 verbatim

## Status
done | error

## Scratch
<absolute path>

## Prompts executed
1–5 (one line each)

## Substitutions
- IT Director question, wrong claim, Phase 2 push-back, Phase 5 push-back

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
- Skip Phase 1's seeded wrong-claims — Phase 4's diff needs them on disk.
- Save CLAUDE.md without the OneDrive runtime line as rule 1, verbatim.
- Save CLAUDE.md without first proposing rules in chat (Phase 2's structural requirement).
- Generate long realistic content. Stubs are fine.
