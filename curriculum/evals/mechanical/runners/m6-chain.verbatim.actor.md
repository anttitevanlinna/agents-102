# Actor — M6 chain verbatim (spot-gaps-build-the-loop + arc-retrospective)

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the prompt chain end-to-end and leave file artefacts on disk for the Judge's scripts to inspect. You are NOT trying to produce a great gap analysis, skill, invocation, or arc note. Stub generated content; a few lines is enough.

You are simulating Claude Code in the repo from M3 → M4 → M5. Two run branches present: `send-off/auth-ux` (M4 un-packaged) and `send-off/auth-ux-packaged` (M5 packaged). You have Bash / Read / Write / Edit.

**Sandbox bypass:** use `dangerouslyDisableSandbox: true` on every Bash call that mutates the scratch tree. Read-only Bash doesn't need it. Without bypass, mutations get permission-denied silently and the run grades as harness-FAIL.

**Critical protocol:** student pastes prompts verbatim from disk. You do NOT read exercise files. Five prompts:

- Ex1 (spot-gaps-build-the-loop): `/tmp/prompts/spot-gaps-build-the-loop/prompt-00{1,2,3,4}.txt`
- Ex2 (arc-retrospective): `/tmp/prompts/arc-retrospective/prompt-001.txt`

For each: Read, quote verbatim in `> `-prefixed blockquote, respond, record.

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m6`. Inherited from M3 → M4 → M5:

- ADR at `docs/adr/0001-strip-email-from-leaderboard.md`.
- `.claude/memory/observations.md` with JWT observation + business-rules gap.
- `CLAUDE.local.md` with testing rules.
- `.gitignore` covering both.
- M5 package step: `docs/tasks/auth-ux-wiring/reference.md`, `plan.md`, `.claude/verifier/done-means.md`, `scripts/run-verifier.sh`.
- Personal skills at `~/.claude/skills/test-strategy/`, `access-control-analysis`, `stride`.
- Two run branches: `send-off/auth-ux` (4 drift commits) and `send-off/auth-ux-packaged` (4 packaged commits).

Currently on `send-off/auth-ux-packaged`.

## Key substitutions — transcripts

Prompt 1 tells you to walk both `~/.claude/projects/<project>/<session>/*.jsonl` transcripts. Substitute:

- M4 un-packaged → `/tmp/m5-substitute-transcript.md`.
- M5 packaged → `/tmp/m6-m5-rerun-transcript.md`.

Log both substitutions. Do NOT walk `~/.claude/projects/`.

## The task both runs targeted

> Wire the full registration + login UX into the Lemmings frontend against the existing `/auth/register` and `/auth/login` endpoints. Done when a new user can register, log in, score a run, and see their handle on the leaderboard without the app ever trusting a client-supplied `user_id`.

## Prompts to execute in order

### Ex1 — spot-gaps-build-the-loop

- **Prompt 1:** `/tmp/prompts/spot-gaps-build-the-loop/prompt-001.txt` — diff both runs across four dimensions (caught / missed / introduced / where-fix-belongs). Quote moments from both. End with ranked gap list + dominant gap.
- **Prompt 2:** `/tmp/prompts/spot-gaps-build-the-loop/prompt-002.txt` — author second skill. Substitute student answer:
  > **Shape:** LLM-judge. The packaging-missed beats had the same shape: verifier's deterministic presence check passed, but "does the shipped code actually meet 'done means'" was qualitative. A judge reading produced code against the reference's "done means" line catches this.
  - Walk one-question-at-a-time through encoding details. Paste each answer verbatim ONLY when Claude asks the matching question:
    > **Fires on:** agent-produced work at Phase completion (end of plan.md phase). Input: reference.md's "done means" + current diff against HEAD.
    > **Quality bar:** each "done means" clause must have a concrete code path. Prose explanation triggers FAIL.
    > **Flag vs let through:** FAIL on (1) any done-means clause satisfied only by prose, (2) any TODO-as-completion, (3) new runtime paths with no test. Let through partial phases noted in plan.md as "in progress."
    > **Output shape:** ranked findings with quoted evidence.
    > **Failure shape when wrong:** judge becomes a pedant — FAILs partial work scoped to the phase. Calibrate against plan.md "current phase."
  - Skill name: propose. Write to `~/.claude/skills/done-means-judge/SKILL.md`. Show before saving.
- **Prompt 3:** `/tmp/prompts/spot-gaps-build-the-loop/prompt-003.txt` — self-critique.
- **Prompt 4:** `/tmp/prompts/spot-gaps-build-the-loop/prompt-004.txt` — invoke skill on M5 packaged re-run. Read reference.md + `send-off/auth-ux-packaged` branch state.

### Ex2 — arc-retrospective

- **Prompt 5:** `/tmp/prompts/arc-retrospective/prompt-001.txt` — read across the training, write a one-page arc note. Dispatch via Task; if unavailable, run inline and note "Task tool unavailable — inline substitution." Show before saving.
- Substitute student approval (verbatim):
  > Save to `.claude/memory/arc-note.md` — session-derived reflection, fits observations/hypotheses/rules block.

## Scratch output expectations

- SKILL.md at `~/.claude/skills/<name>/SKILL.md` (personal; not committed).
- Arc note at `<scratch>/.claude/memory/arc-note.md`.
- No file moves beyond what prompts require.

## Reports

**Scrollback:** `curriculum/evals/mechanical/instances/m6-chain-verbatim-actor-scrollback.md` — verbatim blockquote + response per prompt.

**Report:** `curriculum/evals/mechanical/instances/m6-chain-verbatim-actor-report.md`:

```markdown
# Actor report — M6 chain verbatim

## Status
done | error

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m6

## Prompts executed
1–5

## Skill authored
- Path: ~/.claude/skills/<name>/SKILL.md

## Arc note
Path: .claude/memory/arc-note.md

## Substitutions
- M4 transcript walk → /tmp/m5-substitute-transcript.md
- M5 transcript walk → /tmp/m6-m5-rerun-transcript.md
- <any others>
```

Under 200 words. Do not grade yourself.

## What you must NOT do

- Read any file under `curriculum/exercises/`.
- Read any judge or sibling actor runner.
- Read maintainer docs.
- Paraphrase prompts. Paste verbatim, blockquote-prefixed.
- Try to walk `~/.claude/projects/` — use the two substitutes.
- Generate long realistic content. Stubs are fine.
