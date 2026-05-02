# Actor — Bootstrap M5 setup (Phase 0)

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to produce the briefing (Phase 0a) and benchmark (Phase 0b) with substituted verdicts so files land on disk for the Judge's scripts to inspect. You are NOT trying to write a great briefing or a sophisticated benchmark. The briefing should contain a mix of grounded and ungrounded claims (test corpus); content quality is not graded.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m5`.

## Protocol

**Hard rule (forcing-function):** invoke the **Read tool** on each prompt file BEFORE blockquote-pasting it. The Judge greps the transcript for Read tool_use of every prompt-NNN.txt; pasting from memory or inlining without a Read fails the verbatim check.

**Prompts:**
- `/tmp/prompts/hallucination-bakeoff/prompt-001.txt` — produce briefing
- `/tmp/prompts/hallucination-bakeoff/prompt-002.txt` — propose benchmark (5 claims, one-at-a-time)

## Starting state

Inherited through M1 → M4: `./challenge.md`, `module-3/{question,retrievals,stances,answer,wonder}`, `sources/`, `memory/`, `module-5/` empty with `module-5/detectors/` subfolder.

## Phase 0a — briefing

Paste prompt-001 verbatim. Produce briefing with deliberate overreach — competitors' 2026 priorities, two verbatim quotes from sources, a market-sizing number, two analyst takes, a Monday action. **Some grounded (Monday actions, quotes); some not (competitors' priorities, market-sizing, analyst takes) — fabricate the missing ones plausibly.** This is test corpus.

Save to `module-5/briefing.md`. One page (skeleton 20-60 lines OK).

## Phase 0b — benchmark, five claims, one at a time

Paste prompt-002 verbatim. Propose exactly five specific claims, each quoted verbatim from `module-5/briefing.md`. Spread across grounded-ungrounded:
- One number (likely fabricated)
- One named competitor behaviour (fabricated)
- One quote (grounded)
- One market-sizing statement (fabricated)
- One Monday outcome (grounded)

Ask Maija one claim at a time. Substitute her verdict per rubric (paste verbatim, one at a time):

| Claim shape | Verdict | Reasoning |
|---|---|---|
| Number / market-sizing | not grounded | sources don't carry this number |
| Named competitor 2026 priority | not grounded | no source covers competitors at this specificity |
| Verbatim source quote | grounded | quote present verbatim in sources/<filename> |
| Analyst take | not grounded | no analyst source in the corpus |
| Monday outcome | grounded | matches Q3 forcing-function in OneDrive notes |

After five answers, write `module-5/benchmark.md` with the five verbatim claims, verdicts, one-line reasoning.

## Report

Scrollback: `.../instances/bootstrap-m5-verbatim-setup-scrollback.md`.

Report: `.../instances/bootstrap-m5-verbatim-setup-report.md`:

```markdown
# Actor — Bootstrap M5 setup
Status: done
Briefing: module-5/briefing.md (<line count>)
Benchmark: module-5/benchmark.md (5 claims)
Verdict mix: <N grounded, N not grounded, N partly>
Substitutions: Maija's 5 verdicts
```

## What you must NOT do

- Read `curriculum/exercises/*`, judge runners, other actor runners, maintainer docs.
- Read sibling detector/scorer runners.
- Read `/tmp/bootstrap-mocks/`.
- Overwrite `module-3/*` or `module-4/*`.
- Paraphrase prompts.
