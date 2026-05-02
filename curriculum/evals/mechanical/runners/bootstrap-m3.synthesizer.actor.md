# Actor — Bootstrap M3 synthesizer (main session)

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the synthesizer prompt and leave file artefacts (stances, answer, wonder) on disk for the Judge's scripts to inspect. You are NOT trying to produce a great strategic answer. Stub the stances and answer; the Judge does not grade quality.

The three retrievers have finished. Files at `module-3/retrievals/{wiki,docs,internet}.md`. Question at `module-3/question.md`.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m3`.

## Protocol

Read the prompt file verbatim. Quote in blockquote. Respond.

**Prompt:** `/tmp/prompts/three-retrievers-three-minds/prompt-004.txt`.

## Subagent substitution

Nested Task dispatch unavailable. Substitute: produce three stances INLINE, each as a separate numbered block in scrollback AND written to its own file.

Log at top of response: `[harness substitution — subagents spawned inline; nested Task unavailable; three stances produced sequentially and written to module-3/stances/*.md]`.

## Stances (write each to its own file)

- **Stance 1 — Backward-from-end planner.** `module-3/stances/1-planner.md`. Skeleton sequence: 12-month outcome → month 9 → month 6 → month 3 → next week → Monday. ≤ 200 words.
- **Stance 2 — Assumption experimentator.** `module-3/stances/2-experimentator.md`. Skeleton: pick an option from the question; list 2-3 load-bearing assumptions, each with a kill-in-a-week test. ≤ 200 words.
- **Stance 3 — Counterintuitive reframer.** `module-3/stances/3-reframer.md`. Skeleton: obvious answer / reframe / one analogy / one bias / invert-it move. ≤ 200 words.

## Conflict-naming before the answer

In scrollback, name where retrievals had conflicts or gaps. Explicit, before the combined answer.

## Combined answer

Write `module-3/answer.md` with three sections:
- **Diagnosis**
- **Guiding policy**
- **Coherent actions**

Cite retrieval files (`retrievals/wiki.md`, `retrievals/docs.md`, `retrievals/internet.md`) and stance files for load-bearing claims. Skeleton paragraphs OK.

## Wonder.md

Write `module-3/wonder.md`: one line naming what feels off about the answer.

## Truncations

Do NOT execute Debrief. No rewrite of root `CLAUDE.md`. No "session update" prompt.

## Report

Write `.../instances/bootstrap-m3-verbatim-synthesizer-report.md`:

```markdown
# Actor — synthesizer (main session)
Status: done
Retrievals read: 3
Stances produced: 3 (inline substitution)
Answer: module-3/answer.md
Wonder: module-3/wonder.md
Substitutions: subagent spawning → inline; Debrief truncated
```

## What you must NOT do

- Read `curriculum/exercises/*`, judge files, retriever runners, maintainer docs.
- Read mock-library files directly (`/tmp/bootstrap-mocks/*`).
- Paraphrase the prompt.
- Execute Debrief or crux prompts.
- Skip the conflict-naming step.
