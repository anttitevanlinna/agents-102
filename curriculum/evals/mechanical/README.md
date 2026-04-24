# Mechanical execution tests

Unit-layer tests that **run an exercise's prompt chain against a real scratch repo** and assert on the file-system artifacts it produces. Complements the existing lint and simulation evals at `curriculum/evals/`.

## What this catches (and what it doesn't)

**Catches** — the class of bug that only shows up when the prompts actually run:
- Path duplication and scope drift inside prompt blocks.
- Cross-exercise state transfer (does Ex2 read what Ex1 left; does Ex3 read Ex1+Ex2's session).
- Placeholder leaks into output files.
- Skill / MCP invocation shape mismatches.
- Append-vs-integrate default drift in file writes.
- Question-dump behavior when a prompt says *"one at a time."*

**Does not catch** — these belong to other layers:
- Claude Code UI specifics (plan mode, skill auto-discovery, connector installer) — capability checks.
- Room mood and register drift — three-persona sims.
- Student-in-the-loop reactions — acceptance layer.

The runner subagent uses Bash / Read / Write / Edit. It does not have plan-mode UI or slash-command primitives. Wherever a prompt leans on those, the runner simulates the observable effect (e.g., `/add-dir` → edit `.claude/settings.local.json` directly) and the runner report notes the simulation.

## Layout

```
mechanical/
├── README.md                      (this file)
├── playgrounds/
│   └── lemmings-seed/             clean seed, committed; source: ~/Projects/lemmings
├── runners/
│   └── m1-chain.md                runner prompt: Arrange + Act + Assert for M1 Ex1→Ex2→Ex3
├── scratch/                       gitignored; per-run working copy
└── instances/                     runner reports; scratch-*.md are gitignored
```

## How to run a runner

From the repo root, dispatch a general-purpose subagent with the runner file as its prompt. The runner owns its scratch directory and writes its report to `instances/<runner-slug>-<date>.md`.

Skeleton:

```
I need you to execute a mechanical-execution test for an AE101 exercise chain.
Read curriculum/evals/mechanical/runners/<slug>.md end-to-end and follow it.
Write your report to curriculum/evals/mechanical/instances/<slug>-<YYYY-MM-DD>.md.
Under 600 words in the report; every assertion line is PASS / FAIL with
one quoted piece of evidence.
```

Dispatch multiple runners in parallel when they use separate scratch directories.

## Arrange → Act → Assert

Every runner follows this shape:

1. **Arrange.** Copy seed → scratch. `git init` the scratch. Apply a known-state patch (a planted bug for M1; a target feature for M3; an un-packaged task for M4). Set up prework-assumed state outside the scratch (`.claude/settings.local.json`, `~/.claude/skills/<skill>/` when relevant, content-folder pin).
2. **Act.** Execute each prompt block in the exercise file, in order, against the scratch. Record Claude's response and the file-system diff per prompt.
3. **Assert.** Binary pass/fail on pre-declared assertions. Every fail quotes evidence.
4. **Report.** Write the instance file. Short. One line per assertion. Diff summary at the top.

## Seed provenance

`playgrounds/lemmings-seed/` is a clean copy of a vanilla-JS lemmings prototype. No tests, no build, no framework — deliberate. A runner that needs tests adds them as part of the Arrange step. Source copied 2026-04-24.
