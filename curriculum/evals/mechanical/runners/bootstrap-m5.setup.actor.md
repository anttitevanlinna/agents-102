# Actor — Bootstrap M5 setup (Phase 0)

You are the setup-phase Actor for Bootstrap M5 hallucination benchmark. You produce the briefing (Phase 0a) and write the benchmark (Phase 0b) with Maija's substituted verdicts. Phases 1-3 are handled by separate Actor dispatches.

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m5`.

## Protocol

Read each prompt file verbatim. Quote in blockquote. Respond.

**Prompts:**
- `/tmp/prompts/hallucination-bakeoff/prompt-001.txt` — produce briefing
- `/tmp/prompts/hallucination-bakeoff/prompt-002.txt` — propose benchmark (5 claims, one-at-a-time)

## Starting state

Inherited through M1 → M2 → M3 → M4:
- `module-2/challenge.md`, `module-3/question.md`, `module-3/retrievals/{wiki,docs,internet}.md`, `module-3/stances/{1-planner,2-experimentator,3-reframer}.md`, `module-3/answer.md`
- `sources/` — 10 source files
- `memory/` — 7 topic pages + index
- `module-5/` folder exists, empty; `module-5/detectors/` subfolder exists.

## Phase 0a — produce briefing

Paste prompt-001 verbatim. The prompt asks for deliberate overreach — competitors' 2026 priorities, two verbatim quotes from sources, a market-sizing number, two analyst takes, a Monday action. **Some of these are in the sources (Monday actions, quotes); some are not (competitors' 2026 priorities, market-sizing numbers, analyst takes). Produce the briefing with the requested asks — fabricate the missing ones plausibly.** The briefing is supposed to be test corpus with groundedness problems for the detectors to catch.

Save to `module-5/briefing.md`. One page.

## Phase 0b — benchmark, five claims, one at a time

Paste prompt-002 verbatim. Propose exactly five specific claims, each quoted verbatim from `module-5/briefing.md`. Spread them across the grounded-ungrounded spectrum:
- One number (likely fabricated — the market-sizing)
- One named competitor behaviour (fabricated — sources don't cover competitors)
- One quote (grounded — sources contain verbatim quotes)
- One market-sizing statement (fabricated)
- One Monday outcome (grounded — Maija's Q3 rollout plan has these)

Ask Maija one claim at a time. For each, substitute Maija's verdict using the following rubric (paste verbatim as her response, one at a time):

| Claim shape | Maija's verdict | One-line reasoning |
|---|---|---|
| Number / market-sizing | not grounded | sources don't carry this number; looks fabricated |
| Named competitor 2026 priority | not grounded | no source covers competitors at this specificity |
| Verbatim source quote | grounded | quote is present verbatim in sources/<filename> |
| Analyst take | not grounded | no analyst source in the corpus |
| Monday outcome | grounded | matches the Q3 forcing-function in my OneDrive notes |

(Shape the verdicts to whatever Claude actually proposes — match the intent of the rubric.)

After five answers, write `module-5/benchmark.md` with the five verbatim claims, Maija's verdicts (yes / no / partly), and one-line reasoning.

## Report

Write scrollback to `.../instances/bootstrap-m5-verbatim-2026-04-24-setup-scrollback.md`.

Short report at `.../instances/bootstrap-m5-verbatim-2026-04-24-setup-report.md`:

```markdown
# Actor — Bootstrap M5 setup — 2026-04-24
Status: done
Briefing: module-5/briefing.md (<line count>)
Benchmark: module-5/benchmark.md (5 claims)
Verdict mix: <N grounded, N not grounded, N partly>
Substitutions: Maija's 5 one-line verdicts
```

## What you must NOT do

- Read `curriculum/exercises/*`, judge runners, other actor runners, maintainer docs.
- Read sibling detector/scorer runners or their outputs (they don't exist yet).
- Read `/tmp/bootstrap-mocks/` — your source corpus is the inherited scratch state.
- Overwrite `module-3/*` or `module-4/*` artifacts.
- Paraphrase prompts.
