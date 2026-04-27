# Curriculum Evals — Testing Pyramid

Four layers, cheapest to most expensive. The higher you are, the rarer the run and the more it costs when a bug slips past.

```
                     ┌───────────────────────┐
                     │ Acceptance (manual)   │  ← rare, human-in-loop
                     └───────────────────────┘
                  ┌───────────────────────────┐
                  │ Integration (seam judges) │  ← per-module-pair
                  └───────────────────────────┘
              ┌──────────────────────────────────┐
              │ Unit (per-artifact lints + evals) │  ← every edit
              └──────────────────────────────────┘
         ┌─────────────────────────────────────────┐
         │ Environment (delivery friction)          │  ← per cohort / pre-flight
         └─────────────────────────────────────────┘
```

**Rule:** catch a risk at the lowest layer that can catch it. A zip-extract failure caught by a pre-flight volunteer costs 30 minutes. The same failure in a live cohort costs an hour of room time and erodes trust.

## The four layers

### Environment (delivery friction)

What can break because of the student's laptop, OS, network, or default apps — nothing to do with curriculum quality. Zip handling, file paths with spaces, default-app roulette, download amnesia, auth admin gates, sync-folder conflicts.

- `delivery-incidents.md` — append-only log of every failure we've seen
- `pre-flight-checklist.md` — derived checklist, run by a fresh-laptop volunteer before each cohort

Cheapest catches. **Run before every cohort.** New incidents always land here same day.

### Unit (per-artifact)

Static checks on single files or small groups. Run on every content edit.

- `lecture.md` — reusable lecture judge (exists, per-lecture instance in `instances/`)
- `exercise.md` — reusable exercise judge (exists, per-exercise instance in `instances/`)
- `lints/path-consistency.md` — every file path an exercise names must exist in the scaffold
- `lints/time-budget.md` — phase times sum ≤ 1h45
- `lints/jargon-ban.md` — banned-word lint, cumulative across arc order
- `lints/callout-collisions.md` *(stub)* — philosophy callouts repeated across adjacent lectures
- `lints/capability-freshness.md` *(stub)* — Claude Code UI claims dated, not older than 3 months

**Simulation evals** also live at this layer — running `/content-creation`'s simulation protocol on a single exercise with a persona. That's a deeper unit check, costs more per run, catches what static lints can't.

### Integration (seam judges)

Checks between adjacent artifacts. Run when either side of the seam changes.

- `seams/seam-judge.md` — template for "does Mn close state match Mn+1 open assumption"
- `seams/scaffold-handoff.md` *(stub)* — does module N's scaffold match module N+1's opening expectations
- `seams/skill-regression.md` *(stub)* — does `self-study/SKILL.md` still match each module's phase shape

Per-seam instances live in `seams/instances/`.

### Acceptance (manual end-to-end)

The full arc run, live, with a real human. Rare, expensive, highest signal for facilitator-premium gaps and persona-energy collapse.

- `arc-pass.md` — single-session static full-arc judge (a short-cut acceptance; redundant once integration seams run regularly)
- `manual-run-observation.md` — sheet the human fills live during the run
- `post-run-judge.md` — transcript-grounded judge that converts one run into reusable signal
- `instances/manual-run--<scope>.md` — filled observation sheets, latest only, overwrite on re-run

**Don't automate the acceptance layer.** Live humans catch things no transcript captures — persona fatigue, patronizing nudges, jump-cut seams that read fine on paper. That's the slot the manual run fills.

**Triggers to run acceptance:**
1. Unit + integration + arc-pass all clean on the module(s) in scope.
2. A cohort is imminent (first-of-kind delivery, major customer, new variant).
3. A deferred risk (persona-energy collapse, Teacher Claude facilitation quality, live Claude-behavior drift) needs direct observation.

**How to run when triggered:** use `manual-run-observation.md` as the live sheet; tailor to the module range. After the run, fire `post-run-judge.md` against the auto-captured JSONL transcripts.

**Do NOT auto-build more acceptance-layer infrastructure.** Acceptance catches what it catches; no amount of automation removes the human-in-the-loop value proposition at this layer.

## How to use (authoring edit flow)

1. Edit a module, exercise, lecture, or scaffold file.
2. Run the relevant **unit lints** on touched files.
3. If the edit crosses a seam, run the **integration judge** for that seam.
4. Periodic: **Arc Pass** monthly or before major releases.
5. Before a cohort: **pre-flight checklist** on a clean laptop.
6. First cohort of a new training: **manual run** with observation sheet + post-run judge.

## Running the full battery (repeatable)

When you want wide coverage fast — after a meaningful content pass, before a cohort, monthly — run everything except acceptance in parallel. Four subagents, disjoint outputs, main thread synthesizes. Orchestrator pattern from the project CLAUDE.md.

**Orchestrator plan** (paste into a fresh session):

> I want to run the full curriculum testing battery (unit + integration + static arc) on Bootstrap. Use the orchestrator pattern: launch 4 parallel subagents with `run_in_background: true`, each owning disjoint output files. Then synthesize.
>
> **Subagent 1 — Unit lints across all Bootstrap.** Run `curriculum/evals/lints/path-consistency.md`, `time-budget.md`, `jargon-ban.md` across prework + M1-M8 + all included exercises/lectures/supplementaries. Write output to `curriculum/evals/instances/lints-full-bootstrap.md` (overwrite). Reply with a 5-line summary.
>
> **Subagent 2 — Seam judges 1-4.** Apply `curriculum/evals/seams/seam-judge.md` to seams prework→M1, M1→M2, M2→M3, M3→M4. Pull mood contracts from `bosser-strategy:content-strategy.md` "Mood (deliberate)" paragraphs per module. Write to `curriculum/evals/seams/instances/seams-1-to-4.md` (overwrite). Reply with a 5-line summary.
>
> **Subagent 3 — Seam judges 5-8.** Same, for seams M4→M5, M5→M6, M6→M7, M7→M8. Write to `curriculum/evals/seams/instances/seams-5-to-8.md` (overwrite). Reply with a 5-line summary.
>
> **Subagent 4 — Arc-pass.** Apply `curriculum/evals/arc-pass.md` to all 8 modules. Write to `curriculum/evals/instances/arc-pass.md` (overwrite). Reply with top 3 findings.
>
> When all 4 complete, read the output files and synthesize a prioritized fix list.

**Subagent prompt rules:**
- Subagents do NOT read CLAUDE.md. Use the rule-injection model: prepend `.claude/rules/content-rules.md` (or `research-rules.md` for research surfaces) plus the matching `memory/check_*.md` compendium verbatim. One edit to the rule file propagates to every future subagent; no copy-paste drift. Surface-specific extras (mood contracts for seam judges, Builder scoping for path-consistency, etc.) get inlined alongside the rule injection. See prior runs in `instances/` for prompt patterns.
- Each subagent OWNS its output file. No overlap.
- Subagents reply with short summaries; the full report is on disk. Main thread reads outputs, not raw files.

**Cost/time:** ~10-20 min wall clock for 4 parallel subagents. Orchestrator can do other work during the wait.

**When to run the battery:**
- After any cross-module content pass (mood or framing work touches seams).
- Before a cohort (paired with pre-flight checklist on a fresh laptop).
- Monthly regardless — content drift is quiet until it isn't.

## Running a single test

For targeted edits, run one lint / one seam / one eval rather than the full battery:

- **Lint a single file:** paste the lint prompt from `lints/<name>.md`, point at the one file, get structured findings back.
- **One seam judge:** copy `seams/seam-judge.md`, fill the LEFT/RIGHT slots for the seam, run it. Save the instance to `seams/instances/<seam>.md` (overwrite the previous one).
- **Arc-pass:** always full-arc by design; don't subset.

## What lives where (map)

```
curriculum/evals/
├── README.md                          (this file)
├── delivery-incidents.md              ENV: incident log
├── pre-flight-checklist.md            ENV: cohort pre-flight
├── lecture.md                         UNIT: per-lecture judge template
├── exercise.md                        UNIT: per-exercise judge template
├── lints/
│   ├── path-consistency.md            UNIT: scaffold ↔ exercise path check
│   ├── time-budget.md                 UNIT: phase time sum
│   ├── jargon-ban.md                  UNIT: banned-word cumulative check
│   ├── callout-collisions.md          UNIT (stub)
│   └── capability-freshness.md        UNIT (stub)
├── seams/
│   ├── seam-judge.md                  INTEGRATION: per-seam template
│   ├── scaffold-handoff.md            INTEGRATION (stub)
│   ├── skill-regression.md            INTEGRATION (stub)
│   └── instances/                     filled seam evals
├── arc-pass.md                        ACCEPTANCE: static full-arc
├── manual-run-observation.md          ACCEPTANCE: live observation sheet
├── post-run-judge.md                  ACCEPTANCE: transcript judge
└── instances/
    ├── <training>--<slug>.md          per-artifact unit evals (one file per module/exercise/lecture)
    ├── lints-full-<training>.md       latest full-arc lint sweep (overwrite)
    ├── arc-pass.md                    latest arc-pass (overwrite)
    └── manual-run--<scope>.md         latest acceptance run per scope (overwrite)
```

**Naming rule:** instance filenames carry no dates. One latest report per artifact (module / exercise / lecture / seam / scope). Re-runs overwrite. History is in git. Dated filenames pile up; the latest report is the only one that says what's true now.

## The economy of the pyramid

The four layers exist because the cost profile differs by 10× per step:

- Environment check: minutes to write, 30 minutes to run. Catches embarrassing-but-not-pedagogical bugs.
- Unit check: minutes to write, seconds to run, runs on every edit. Catches the most bugs.
- Integration check: one judge per seam, runs when either side changes. Catches arc-coherence bugs.
- Acceptance run: hours to run, rare. Catches only what a live human sees.

Adding 20 unit and integration checks costs less than one manual end-to-end run. And every bug caught low frees the manual run to catch what only it can.
