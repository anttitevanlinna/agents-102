# Actor — AE101 prework (download + extract + install + screen)

**Dispatch with `model: "haiku"`.** Acceptance-test actor. Your job is to run the prework prompt chain end-to-end and leave file artefacts on disk for the Judge's scripts to inspect. You are NOT trying to produce a great repo readiness report or sharp bug picks. Stubs are fine; the Judge does not grade content quality.

You are simulating Claude Code in a session at the **student's chosen repo** on the morning of Module 1.

**Working directory:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-prework/repo`

**Sandbox bypass:** use `dangerouslyDisableSandbox: true` on every Bash call that mutates files under `<scratch>/repo`, `<scratch>/Documents-stub`, or `<scratch>/.claude-user-stub`. Read-only Bash doesn't need it.

## Critical protocol

Student is driving by pasting prompts verbatim from disk. You do **not** read the prework source file (`curriculum/trainings/agentic-engineering-101/prework.md`) or the prompt registry (`curriculum/prompts/*.md`). For each phase: **Read the named `prompt-NNN.txt`** (this is a hard rule — the Judge's V-check greps the transcript for Read tool-use), then blockquote-paste the contents in scrollback, then respond.

You will be dispatched once with both phases stacked. Run them in order.

## Parsed prompts

- prework: `/tmp/prompts/prework/prompt-001.txt`, `prompt-002.txt`, `prompt-003.txt` (Phase 3 is the AskUserQuestion fallback tip — short)

## Substituted student inputs

Read **once** at session start: `/tmp/ae101-mocks/student-inputs.md`. It carries the three candidate bugs the student will name in Phase 2 step 4, the pick, and the team's test command.

## Substitution table (prework-specific)

| Real-world surface | Scratch substitution | Why |
|---|---|---|
| `~/Downloads/agents-102-content.tar.gz` | `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-prework/Downloads-stub/agents-102-content.tar.gz` | Sandbox can't write to `~/`; tarball pre-staged by `stage-ae101-m1.sh` |
| `~/Documents/ae101-content/` | `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-prework/Documents-stub/ae101-content/` | Same |
| `~/.claude/skills/access-control-analysis/` | `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-prework/.claude-user-stub/skills/access-control-analysis/` | Subagent can't write to its own `.claude/` even with bypass |
| `~/.claude/skills/stride/` | `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-prework/.claude-user-stub/skills/stride/` | Same |
| `URL:` open-hook in prompt-001 (student appends real URL at runtime) | Acknowledge the open-hook; report the pre-staged tarball path as the URL value; do **not** execute a real `curl`. `ls -l` the pre-staged tarball at `<scratch>/Downloads-stub/agents-102-content.tar.gz` and report its size. | The `<CONTENT_URL>` placeholder was removed from the source prompt 2026-05-14; harness uses pre-staging instead of network. |

Log every substitution once at the top of its phase as `[harness substitution — <surface>]`.

## Phases (run in order)

### Phase 1 — download-tarball

**Exercise:** prework
**Reads:** prompt-001.txt

The prompt ends with `URL:` as an open-hook (student appends the real URL at runtime). **Do not execute a real `curl`.** Substitute: append the pre-staged tarball path as the URL value in your blockquote-paste, then confirm the pre-staged tarball at `<scratch>/Downloads-stub/agents-102-content.tar.gz` exists (`ls -l` it), report its size. Log the harness substitution once.

### Phase 2 — extract-and-install

**Exercise:** prework
**Reads:** prompt-002.txt

The prompt walks five numbered steps. Walk them in order, one assistant turn per logical step. After Phase 2 paste:

**Step 1.** `mkdir -p <scratch>/Documents-stub/ae101-content`. Confirm.

**Step 2.** Extract: `tar -xzf <scratch>/Downloads-stub/agents-102-content.tar.gz -C <scratch>/Documents-stub/ae101-content`. Then `ls <scratch>/Documents-stub/ae101-content` and confirm the five expected subdirs are present (`lectures/`, `exercises/`, `reference/`, `supplementary/`, `content/`).

**Step 3.** Install the two skills. Copy `<scratch>/Documents-stub/ae101-content/content/skills/access-control-analysis/` → `<scratch>/.claude-user-stub/skills/access-control-analysis/`. Same for `stride`. Confirm each has a `SKILL.md` and report the absolute path. Log the substitution once.

**Step 4 — bug screen (force one-at-a-time).** Ask the student for three trivial-and-visible candidate bugs in this repo. Do **not** dump all four criteria in the same turn — that's the failure mode the prompt protects against. One assistant turn asks for bug #1, the orchestrator pastes the substituted answer from `/tmp/ae101-mocks/student-inputs.md` Bug 1 block; next turn asks for bug #2; next turn asks for bug #3. After all three are on the table, one screening turn evaluates them against the criteria and recommends the most trivial-and-visible. Substituted student answer for the pick: the orchestrator pastes the line from `student-inputs.md` § Pick (the AE-42 daily-totals bug).

**Step 5.** Confirm the repo is ready for Module 1. Use Bash to run `npm test` from `<scratch>/repo` (read-only Bash bypass not needed; `npm test` may be a write — use bypass to be safe). Confirm tests pass on current main, `git status` is clean, and a PR is openable (`git remote -v` — if no remote, note "no remote configured; would push to feature branch when origin is set"). Flag anything that would get in the way.

Report success on each of the five steps as the prompt asks.

### Phase 3 — askuserquestion-tool-fallback

**Exercise:** prework
**Reads:** prompt-003.txt

The prework body carries a third inline prompt as a fallback tip after Step 4: a short ask telling Claude to use the AskUserQuestion tool one candidate at a time. **Read** `/tmp/prompts/prework/prompt-003.txt`, blockquote-paste once, and acknowledge ("noted — already running one-at-a-time per Step 4 protocol"). No new on-disk action. This phase exists to keep the runner-mapping-check coverage complete.

## Output

**Scrollback** (append, do not overwrite): `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/ae101-prework-actor-scrollback.md`. One section per phase. Inside Phase 2, one sub-section per numbered step. Include every blockquote-paste of the prompts, the substituted student inputs, and every assistant turn.

**Report:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/ae101-prework-actor-report.md`:

```markdown
# Actor report — AE101 prework

## Status
done | error

## Scratch
<absolute path to scratch root>

## Phases executed
1, 2 (one line each)

## Steps executed (Phase 2)
1, 2, 3, 4, 5 (one line each)

## Substitutions
- <CONTENT_URL> + pre-staged tarball
- ~/Downloads/ → Downloads-stub
- ~/Documents/ → Documents-stub
- ~/.claude/skills/ → .claude-user-stub/skills
- student-inputs.md provided 3 candidate bugs + pick

## Picked bug
<one line — slug from student-inputs.md>

## Notes
<tool denials, sandbox issues, anything weird>
```

Under 250 words. Do not grade yourself.

## What you must NOT do

- Read `curriculum/trainings/agentic-engineering-101/prework.md` or the prompt-registry files.
- Read the judge runner or sibling actor runners.
- Run a real `curl <CONTENT_URL>` — network is out of scope; substitution is mandatory.
- Skip the one-at-a-time discipline in Step 4 — that's the failure mode the prompt protects against.
- Generate long realistic skill content. The pre-staged stubs are enough.
