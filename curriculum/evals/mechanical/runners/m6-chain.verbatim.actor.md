# Actor — M6 chain verbatim (spot-gaps-build-the-loop + arc-retrospective)

You are simulating a Claude Code session the student started in the repo they ran M3 → M4 → M5 in. Two runs of the same multi-hour task are on disk now — the M4 un-packaged run on branch `send-off/auth-ux`, the M5 packaged re-run on branch `send-off/auth-ux-packaged`. You have Bash / Read / Write / Edit.

**Critical protocol:** the student pastes prompts verbatim from the M6 exercises. You do NOT read the exercise files. Five prompts total:

- Ex1 (spot-gaps-build-the-loop): `/tmp/prompts/spot-gaps-build-the-loop/prompt-00{1,2,3,4}.txt`
- Ex2 (arc-retrospective): `/tmp/prompts/arc-retrospective/prompt-001.txt`

For each: read, quote verbatim in blockquote, respond, record.

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m6`. Inherited from M3 → M4 → M5:

- ADR at `docs/adr/0001-strip-email-from-leaderboard.md`.
- `.claude/memory/observations.md` with JWT observation + business-rules gap.
- `CLAUDE.local.md` with testing rules (supertest-with-real-SQLite, etc.).
- `.gitignore` covering CLAUDE.local.md + .claude/memory/.
- From M5 package step: `docs/tasks/auth-ux-wiring/reference.md`, `docs/tasks/auth-ux-wiring/plan.md`, `.claude/verifier/done-means.md`, `scripts/run-verifier.sh`.
- Personal skills at `~/.claude/skills/test-strategy/`, plus `access-control-analysis` and `stride`.
- Two branches representing the two task runs:
  - `send-off/auth-ux` — M4 un-packaged run, 4 drift commits (goal drift dominant).
  - `send-off/auth-ux-packaged` — M5 packaged re-run, 4 commits showing better outcome but with new gaps.

Currently on `send-off/auth-ux-packaged`.

## Key substitutions — transcripts

The exercise Prompt 1 (spot-gaps) tells you to walk both `~/.claude/projects/<project>/<session>/*.jsonl` transcripts. You can't access those from a subagent; substitute:

- M4 un-packaged run transcript → `/tmp/m5-substitute-transcript.md`.
- M5 packaged re-run transcript → `/tmp/m6-m5-rerun-transcript.md`.

Log both substitutions.

## The task that both runs targeted

> Wire the full registration + login UX into the Lemmings frontend against the existing `/auth/register` and `/auth/login` endpoints. Done when a new user can register, log in, score a run, and see their handle on the leaderboard without the app ever trusting a client-supplied `user_id`.

## Prompts to execute in order

### Ex1 — spot-gaps-build-the-loop

- **Prompt 1:** `/tmp/prompts/spot-gaps-build-the-loop/prompt-001.txt` — diff both runs across four dimensions (caught / missed / introduced / where-fix-belongs). Quote moments from BOTH runs. End with a ranked gap list + dominant gap.
- **Prompt 2:** `/tmp/prompts/spot-gaps-build-the-loop/prompt-002.txt` — author second skill. Asks which shape first (sharpened-verifier / LLM-judge / gap-finder). Substitute student answer:
  > **Shape:** LLM-judge. The packaging-missed beats all have the same shape: verifier's deterministic presence check passed (submitScore called, no separate page, no /me test), but "does the shipped code actually meet 'done means'" was a qualitative question the verifier couldn't see. A judge that reads the produced code against the reference's "done means" line and pushes back on prose hand-waving ("register can be a separate concern") would have caught the missing register path and the empty-leaderboard crash.
  - Actor then walks one-question-at-a-time through encoding details. Substitute codebase-specific answers (paste each verbatim when Claude asks):
    > **Fires on:** agent-produced work at Phase completion (end of a plan.md phase), not every commit. Input: the reference.md's "done means" + the current diff against HEAD.
    > **Quality bar:** each "done means" clause must have a concrete code path (function call, route handler, test, or UI element) the judge can point at. Prose explanation ("X can be a separate concern") triggers FAIL.
    > **Flag vs let through:** FAIL on (1) any done-means clause satisfied only by prose, (2) any TODO-as-completion, (3) new runtime paths with no test. Let through: partial phase completion explicitly noted in plan.md as "in progress."
    > **Output shape:** ranked findings with quoted evidence. Top finding names the clause most likely to break the task's intent; others are ordered by impact.
    > **Failure shape when wrong:** the judge becomes a pedant — FAILs partial work that was genuinely scoped to the phase. Calibrate against the plan.md "current phase" marker.
  - Skill name: propose from encoded material. Write to `~/.claude/skills/done-means-judge/SKILL.md` (or similar). Show before saving.
- **Prompt 3:** `/tmp/prompts/spot-gaps-build-the-loop/prompt-003.txt` — self-critique. Name real weak parts, not reassurance.
- **Prompt 4:** `/tmp/prompts/spot-gaps-build-the-loop/prompt-004.txt` — invoke the skill on the M5 packaged re-run. Read the reference.md + the `send-off/auth-ux-packaged` branch state. Produce ranked findings. Then self-grade: would this have caught the dominant gap from Phase 1?

### Ex2 — arc-retrospective

- **Prompt 5:** `/tmp/prompts/arc-retrospective/prompt-001.txt` — asks you to read everything across the training and write a one-page note on the arc. The prompt specifies "Run this audit in a fresh sub-task via the Task tool, so the read isn't colored by this conversation." Substitute: if Task is unavailable, run the read inline and note "Task tool unavailable — inline substitution" as a harness note. Propose where the note should live (ADR, memo in `.claude/memory/`, or standalone). Show the note before saving.
- Substitute student approval on the save (paste verbatim):
  > Save to `.claude/memory/arc-note.md` — it's session-derived reflection, fits the observations/hypotheses/rules block, not a load-bearing decision so not an ADR.

## Scratch output expectations

- SKILL.md at `~/.claude/skills/<skill-name>/SKILL.md` (personal; not committed to scratch).
- Arc note at `<scratch>/.claude/memory/arc-note.md`.
- No file moves in scratch beyond what the prompts require.

## Report

Write scrollback to `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m6-chain-verbatim-2026-04-24-actor-scrollback.md` per standard shape.

Short report at `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/m6-chain-verbatim-2026-04-24-actor-report.md`:

```markdown
# Actor report — M6 chain verbatim — 2026-04-24

## Status
<done / error>

## Scratch
/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/m6

## Prompts executed
1. Ex1 prompt-001 — diff two runs
2. Ex1 prompt-002 — author skill
3. Ex1 prompt-003 — self-critique
4. Ex1 prompt-004 — invoke + self-grade
5. Ex2 prompt-001 — arc retrospective

## Phase 1 diff summary
- Packaging caught: <one quoted moment>
- Packaging missed: <one quoted moment>
- Packaging introduced: <one quoted moment>
- Dominant gap: <name>

## Skill authored
- Shape: LLM-judge
- Path: ~/.claude/skills/<name>/SKILL.md

## Arc note
Path: .claude/memory/arc-note.md

## Substitutions
- M4 transcript walk → /tmp/m5-substitute-transcript.md
- M5 transcript walk → /tmp/m6-m5-rerun-transcript.md
- Task tool for arc-retrospective fresh sub-task → inline substitution (if unavailable)
```

Under 300 words. Do not grade yourself.

## What you must NOT do

- Read any file under `curriculum/exercises/`.
- Read any judge or sibling actor runner.
- Read the maintainer doc.
- Paraphrase prompts. Paste verbatim.
- Try to walk `~/.claude/projects/` — use the two substitute transcripts.
