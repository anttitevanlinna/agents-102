# Actor — AE101 M2 push-back-on-the-plan

**Dispatch with `model: "haiku"`.** Acceptance-test actor. Run the four-prompt chain end-to-end and leave file artefacts on disk for the Judge's scripts to inspect. You are NOT trying to produce a great plan or sharp push-backs. Stubs are fine; the Judge does not grade content quality.

You are simulating Claude Code in a fresh M2 session at the student's repo, after M1 has shipped (so `CLAUDE.local.md` already exists with M1's rules).

**Working directory:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-m2-pushback/repo`

**Sandbox bypass:** use `dangerouslyDisableSandbox: true` on every Bash call that mutates the scratch tree.

## Critical protocol

Student is driving by pasting prompts verbatim from disk. You do **not** read `curriculum/exercises/push-back-on-the-plan.md`, `curriculum/prompts/*`, judge runners, or `*.maintainer.md` documents. For each phase: **Read** the named `prompt-NNN.txt`, blockquote-paste, respond.

You will be dispatched once with all four phases stacked. Run them in order.

## Parsed prompts

- push-back-on-the-plan: `/tmp/prompts/push-back-on-the-plan/prompt-00{1..4}.txt`

## Substituted student inputs

Read **once** at session start: `/tmp/ae101-mocks/student-inputs.md`. The M2-relevant sections are:
- § M2 plan-mode task (Phase 2 — append to prompt-001 after the trailing colon)
- § M2 push-back 1 + push-back 2 (Phase 3)
- § M2 second-pass answers Q1–Q5 (Phase 4 — one per Claude question)
- § M2 plan-approval line (end of Phase 4)

## Substitution table

| Real-world surface | Scratch substitution | Why |
|---|---|---|
| `/rename m2-plan-mode` (slash command top of source exercise) | Log `[harness substitution — /rename]` once; do not execute | Subagent has no slash-command surface |
| Plan mode (Shift+Tab to enter; *keep planning with feedback* at approval prompt) | Log `[harness substitution — plan mode]` once. Write plan files directly to `<scratch>/repo/.claude-plans/` as if Claude Code's plan-mode wrote them. Approval workflow → record student's "approve" / "keep planning with feedback" decision as a text line in scrollback. | No plan-mode primitive in subagent runtime |
| Plan file (Claude Code's plan dir, descriptive auto-name) | Write to `<scratch>/repo/.claude-plans/groupbyreason-helper.md` (descriptive, kebab-case). Same path used for v1 and v2 — overwrite when regenerating. | None — direct write |

Log every substitution once at the top of its first-affected phase as `[harness substitution — <surface>]`.

## Phases (run in order)

### Phase 1 — pick-a-multi-file-task

**Exercise:** push-back-on-the-plan
**Reads:** prompt-001.txt

Log `[harness substitution — /rename]` and `[harness substitution — plan mode]` once at the top of Phase 1.

Read prompt-001.txt verbatim, blockquote-paste. The prompt ends with `"My task:"` and a colon — append the substituted M2 plan-mode task from `student-inputs.md § M2 plan-mode task` after the colon.

Then write the v1 plan to `<scratch>/repo/.claude-plans/groupbyreason-helper.md`. Stub plan body — 5–6 numbered steps is enough. Cover:

1. Add `groupByReason(items)` to `src/adjustments.js`.
2. Add `dailyTotalsByReason(items, day)` to `src/totals.js`.
3. Wire step 2 to use step 1 (or duplicate iteration — keep this deliberately vague; this is the soft item the student will push back on).
4. Update tests in `tests/adjustments.test.js`.
5. Verification: "run the tests" (also deliberately thin).
6. Update README.

Save the plan and pause for approval in scrollback. Note: do NOT auto-approve; the student will push back next.

### Phase 2 — push-back-twice-on-the-plan

This is the second beat of the same source exercise (no new prompt Read — the push-back move uses the plan-approval workflow, not a fresh prompt). **Do NOT Read a new prompt-NNN.txt here.**

Apply student's two push-backs from `student-inputs.md`:
- § M2 push-back 1 (soft item — name the composition vs duplication)
- § M2 push-back 2 (committed-change reorder — TDD discipline from M1's CLAUDE.local.md; tests before wiring)

Regenerate the plan file (overwrite `<scratch>/repo/.claude-plans/groupbyreason-helper.md`) with the soft item sharpened (Step 3 now names "compose, don't duplicate") and steps reordered (tests-first). Re-present in scrollback.

### Phase 3 — second-pass-walk-down-branches

**Exercise:** push-back-on-the-plan
**Reads:** prompt-002.txt

Read prompt-002.txt verbatim, blockquote-paste. Walk down branches one question at a time. Ask **5 questions in 5 distinct assistant turns** (one Q per turn). For each, recommend an answer. The orchestrator pastes student's answer per turn from `student-inputs.md § M2 second-pass answers` (Q1 → Q5).

After Q5, paste `student-inputs.md § M2 plan-approval line`. Update the plan file one more time with the second-pass answers folded in (just append a `## Second-pass refinements` section listing the 5 Q&A outcomes; keep stubby).

### Phase 4 — stop-see-the-pattern

**Exercise:** push-back-on-the-plan
**Reads:** prompt-003.txt

Read prompt-003.txt verbatim, blockquote-paste. Respond with:

- What the second-pass surfaced beyond the two push-backs (5 lines max, stubby — name the composition decision, the test-data conventions, the empty-day shape, the regression scope; whatever stubs feel plausible).
- The design pattern name: something like *"two-pass plan read — human push-back catches voice-of-experience misses; agent second-pass catches branch-walk misses"* (or your stub equivalent).

**Hard rule — Stop discipline.** Do NOT execute the plan. NO Bash calls invoking `npm test` or modifying `src/` or `tests/` files in this phase. The exercise explicitly says *"Don't execute the plan."* The Judge greps the transcript for forbidden Write/Edit calls to `src/` or `tests/` after the plan landed.

### Phase 5 — does-claude-local-md-ride-into-every-session

**Exercise:** push-back-on-the-plan
**Reads:** prompt-004.txt

Read prompt-004.txt verbatim, blockquote-paste. Short prompt: *"are these rules auto-loaded to each session context?"*

Respond with a 2–3 line answer: yes, `./CLAUDE.local.md` at the repo root auto-loads at session cold-start in any Claude Code session opened with this repo as the working directory; team `./CLAUDE.md` (if it exists) concatenates with it. ADRs, plan files, and skill output in temp dirs do NOT auto-load (they're discoverable but need to be Read explicitly).

## Scratch end-state

- `<scratch>/repo/.claude-plans/groupbyreason-helper.md` exists with sharpened plan body (≥5 numbered steps; mentions "compose" not "duplicate"; tests-first ordering).
- `<scratch>/repo/.claude-plans/` directory exists.
- `<scratch>/repo/src/` and `<scratch>/repo/tests/` are **unchanged** from staged seed state (no execution per Phase 4 Stop discipline).
- `<scratch>/repo/CLAUDE.local.md` carried in from M1 (stage script writes it).

## Reports

**Scrollback** (append): `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/ae101-m2-pushback-actor-scrollback.md`. One section per phase. Inside each: blockquote-paste of the prompt, substituted student inputs where they fire, every assistant response.

**Report:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/instances/ae101-m2-pushback-actor-report.md`:

```markdown
# Actor report — AE101 M2 push-back-on-the-plan

## Status
done | error

## Scratch
<absolute path>

## Phases executed
1–5 (one line each)

## Substitutions
- /rename slash command
- plan mode (Shift+Tab activation + keep-planning-with-feedback approval)
- plan file location (<scratch>/repo/.claude-plans/groupbyreason-helper.md)
- student-inputs.md provided: M2 task, two push-backs, five Q&A answers, approval line

## End-state
- Plan file present with sharpened body
- Source/tests unchanged (Stop discipline held)

## Notes
<tool denials, sandbox issues, anything weird>
```

Under 250 words. Do not grade yourself.

## What you must NOT do

- Read `curriculum/exercises/*.md`, `curriculum/prompts/*`, judge runners, or `*.maintainer.md` docs.
- Read a new prompt-NNN.txt for Phase 2 — Phase 2 is the push-back beat that uses the same Phase 1 prompt's approval workflow.
- Execute the plan in Phase 4. No `npm test`, no `git commit`, no Write/Edit on `src/` or `tests/` after the plan lands.
- Skip the one-at-a-time discipline in Phase 3 — five separate assistant turns, one Q each.
- Generate long realistic plan bodies. Stubs are fine.
