---
name: eval-fire
description: Run a single eval class (writing | story | technical) against one or more curriculum files. Dispatches a class-judge subagent with the relevant compendiums (filtered by `eval_classes:` frontmatter) and the matching judge prompt template. Returns a structured per-rule verdict. Mirrors `/research-review`'s parallel-launch pattern but scoped to one class per invocation. The full three-class audit lives in `/curriculum-pre-ship-audit`; this skill is the single-class on-demand fire.
argument-hint: <class:writing|story|technical> <file-path> [<file-path> ...]
---

# /eval-fire — single-class judge dispatch

Fires one eval class against one or more curriculum files. The class determines which compendiums load (all `memory/check_*.md` whose `eval_classes:` includes the class), which judge prompt template is used (`curriculum/evals/judges/<class>.md`), and which model the subagent runs on.

## When to invoke

- **Iterating on a single file** during authoring — fastest signal, cheapest token cost.
- **Triaging a queued class** from `/tmp/claude-eval-queue-<sid>` (the eval-class-router hook writes per-class entries on every curriculum edit).
- **Comparing class-judge against megajudge** during the 30-day side-by-side validation window (Step 7 of the eval refactor).
- **NOT** for a full ship-time audit — that's `/curriculum-pre-ship-audit`, which dispatches all three classes in parallel and adds source-verify + capability-check + Quality-tag check on top.

## What it does NOT do

- Edit the target file. Verdicts only.
- Run more than one class. Use `/curriculum-pre-ship-audit` for the full sweep.
- Run sim-trace generation for the storytelling class — that's the storytelling judge's responsibility (it reads cached trace if SHA matches, else regenerates).

## Class table

| Class | Default model | Judge prompt | Compendiums (read at runtime) |
|---|---|---|---|
| `writing` | `haiku` | `curriculum/evals/judges/writing.md` | every `memory/check_*.md` with `eval_classes:` containing `writing` |
| `story` | `sonnet` | `curriculum/evals/judges/story.md` | every `memory/check_*.md` with `eval_classes:` containing `storytelling` |
| `technical` | `sonnet` | `curriculum/evals/judges/technical.md` | every `memory/check_*.md` with `eval_classes:` containing `technical` |

The orchestrator (you) does NOT inline compendium content into the prompt — the judge subagent reads them on demand. This keeps the orchestrator's context clean and lets the subagent quote line numbers accurately.

## The flow

### Step 1 — Parse arguments

`$ARGUMENTS[0]` is the class. Validate it's one of `writing`, `story`, `technical`. If invalid or missing, stop and ask.

`$ARGUMENTS[1..]` are file paths. At least one is required. If missing, stop and ask.

### Step 2 — Identify in-scope compendiums

Glob `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/check_*.md`. For each, read the frontmatter and check whether `eval_classes:` contains the requested class. Collect the matching paths.

For the storytelling class, the class name in compendium frontmatter is `storytelling` (full word). For the args, accept `story` as shorthand and translate.

### Step 3 — Read the judge prompt template

`curriculum/evals/judges/<class>.md` is the prompt template. Read it once. Substitute `{{file_path}}`, `{{compendium_paths}}`, and (for story class) `{{trace_path}}` into the template.

### Step 4 — Dispatch the subagent

Use the `Agent` tool with:
- `subagent_type: "general-purpose"`
- `model:` matching the class (haiku for writing, sonnet for story / technical)
- `description:` `"<class>-class judge: <basename>"` per file
- `prompt:` the substituted judge template, with `.claude/rules/content-rules.md` prepended verbatim (per the subagent rule-injection convention in project CLAUDE.md)

If multiple file paths were passed, dispatch one subagent per file, all in a single message (parallel).

### Step 5 — Aggregate

Each subagent returns structured JSON (see `curriculum/evals/judges/<class>.md` for the exact schema). Collect all returns. Don't dedupe across files — each file gets its own verdict.

### Step 6 — Present

```
## /eval-fire <class> — <date>

### <file-1>
- Verdict: PASS | REVISE
- Blocking findings: K
- TODOs: J
- (Per-rule lines if REVISE — quoted from JSON `rules_evaluated[]` where `verdict: REVISE`)

### <file-2>
- ...

### Summary
N files, K total blocking, J total TODOs.
```

Do NOT inline the entire JSON — extract REVISE rules and quote evidence. The full JSON is logged to `curriculum/evals/instances/<file-slug>.<class>.json` (overwrite per-class per-file per the no-dated-reports rule in `check_writing.md`).

### Step 7 — Decision gate

If any file has a REVISE verdict, ask Antti: *apply fixes? log overrides? re-run after fix?* If overrides happen, log to `memory/compounded/` as `type: decision`.

## Caching / sim-trace coordination

For the `story` class, the judge prompt template names the cache path (`curriculum/evals/sim-cache/<file-slug>.json`). The judge subagent decides whether to use the cached trace or regenerate. Step 4 of the eval refactor wires that cache; this skill is the entry point.

## Real-world test

After 30 days of `/eval-fire` use side-by-side with `/curriculum-pre-ship-audit`'s legacy megajudge path, compare verdict agreement on a sample of 10 files. If class-path verdicts catch findings the megajudge missed (and vice versa is rare), the refactor earned its keep — retire the megajudge fallback per the rollout plan.
