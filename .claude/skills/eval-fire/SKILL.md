---
name: eval-fire
description: Run a single eval class (writing | story | technical | behavior) against one or more curriculum files. Dispatches a class-judge subagent with the relevant compendiums (filtered by `eval_classes:` frontmatter) and the matching judge prompt template. Returns a structured per-rule verdict. Mirrors `/research-review`'s parallel-launch pattern but scoped to one class per invocation. The full four-class audit lives in `/curriculum-pre-ship-audit`; this skill is the single-class on-demand fire.
argument-hint: <class:writing|story|technical|behavior> [--personas N] <file-path> [<file-path> ...]
---

# /eval-fire — single-class judge dispatch

Fires one eval class against one or more curriculum files. The class determines which compendiums load (all `memory/check_*.md` whose `eval_classes:` includes the class), which judge prompt template is used (`curriculum/evals/judges/<class>.md`), and which model the subagent runs on.

## When to invoke

- **Iterating on a single file** during authoring — fastest signal, cheapest token cost.
- **Triaging a queued class** from `/tmp/claude-eval-queue-<sid>` (the eval-class-router hook writes per-class entries on every curriculum edit).
- **Comparing class-judge against megajudge** during the 30-day side-by-side validation window (Step 7 of the eval refactor).
- **High-stakes story sweep:** `/eval-fire story --personas 3` runs the audience triangle (mid-layer / opinionated senior / fast operator). Default is single canonical persona; the flag is opt-in for cohort-imminent or sponsor-critical files.
- **NOT** for a full ship-time audit — that's `/curriculum-pre-ship-audit`, which dispatches all four classes in parallel and adds source-verify + capability-check + Quality-tag check on top.

## What it does NOT do

- Edit the target file. Verdicts only.
- Run more than one class. Use `/curriculum-pre-ship-audit` for the full sweep.
- Run sim-trace generation directly — that's the judge subagent's responsibility (it reads cached trace if per-phase / per-prompt SHA matches, else regenerates only the stale slices).

## Class table

| Class | Default model | Judge prompt | Trace cache | Primary inputs |
|---|---|---|---|---|
| `writing` | `haiku` | `curriculum/evals/judges/writing.md` | none | every `memory/check_*.md` with `eval_classes:` containing `writing` |
| `story` | `sonnet` | `curriculum/evals/judges/story.md` | `sim-cache/<slug>.persona.json` (Class A persona-reader, per-phase SHA) | every `memory/check_*.md` with `eval_classes:` containing `storytelling`; strategy doc per training |
| `technical` | `sonnet` | `curriculum/evals/judges/technical.md` | none | every `memory/check_*.md` with `eval_classes:` containing `technical` |
| `behavior` | `sonnet` | `curriculum/evals/judges/prompt-behavior.md` | `sim-cache/<slug>.behavior.json` (Class B prompt-behavior, per-prompt SHA) | `.claude/skills/content-creation/simulation-behavior.md` catalog; `check_prompts.md` + `check_pedagogy.md` |

The orchestrator (you) does NOT inline compendium content into the prompt — the judge subagent reads them on demand. This keeps the orchestrator's context clean and lets the subagent quote line numbers accurately.

## The flow

### Step 1 — Parse arguments

`$ARGUMENTS[0]` is the class. Validate it's one of `writing`, `story`, `technical`, `behavior`. If invalid or missing, stop and ask.

Optional `--personas N` (only valid for `story`): N is 1, 2, or 3. Default 1. If N > 1, the storytelling judge will run the audience triangle.

`$ARGUMENTS[remaining]` are file paths. At least one is required. If missing, stop and ask.

### Step 2 — Identify in-scope compendiums

Glob `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/check_*.md`. For each, read the frontmatter and check whether `eval_classes:` contains the requested class. Collect the matching paths.

For the storytelling class, the class name in compendium frontmatter is `storytelling` (full word). For the args, accept `story` as shorthand and translate.

For the behavior class, the compendium set is fixed: `check_prompts.md` + `check_pedagogy.md`. The catalog at `.claude/skills/content-creation/simulation-behavior.md` is the primary input — pass its path as `{{catalog_path}}`.

### Step 3 — Read the judge prompt template

`curriculum/evals/judges/<class>.md` is the prompt template (for `behavior`, the file is `prompt-behavior.md`). Read it once. Substitute `{{file_path}}`, `{{compendium_paths}}`, `{{trace_path}}` (for `story` and `behavior`), and `{{catalog_path}}` (for `behavior` only) into the template.

Trace path resolution:
- `story`: `curriculum/evals/sim-cache/<file-slug>.persona.json`
- `behavior`: `curriculum/evals/sim-cache/<file-slug>.behavior.json`

`<file-slug>` is the basename without `.md`.

### Step 4 — Dispatch the subagent

Use the `Agent` tool with:
- `subagent_type: "general-purpose"`
- `model:` matching the class (haiku for writing; sonnet for story / technical / behavior)
- `description:` `"<class>-class judge: <basename>"` per file
- `prompt:` the substituted judge template, with `.claude/rules/content-rules.md` prepended verbatim (per the subagent rule-injection convention in project CLAUDE.md). For `story --personas N > 1`, append a single line `personas: N` to the substituted prompt — the judge interprets it.

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

### Step 6.5 — Record verdict to Quality block (PASS AND REVISE)

After Step 6 (Present), the orchestrator MUST shell out to `update-quality.sh` for EVERY verdict — both PASS and REVISE. The Quality block is the canonical state surface; if REVISE doesn't get stamped, a successor agent sees `grandfathered` and can't tell whether the class is "pre-refactor PASS still valid", "run-and-REVISE", or "never run". Stamping REVISE with a JSON pointer disambiguates.

```
# PASS:
curriculum/evals/scripts/update-quality.sh <file_path> --<class> PASS

# REVISE (note is mandatory, point to the instance JSON for the per-rule findings):
curriculum/evals/scripts/update-quality.sh <file_path> --<class> REVISE:<NB>/<NT>-see-instances/ae101--<slug>.<class>.json
```

The script is deterministic, touches ONLY the maintainer-block Quality state, and is the only sanctioned writer of that block. Free-form Quality edits drift; the script keeps the format consistent. This is the **script-ratchet endpoint** for the four-class judges — same shape as `bin/judge.sh` calling it on mechanical PASS.

REVISE-stamped files still route through `/content-creation` per Step 7 for the actual fixes. The cycle-close re-fire of `/eval-fire` overwrites the REVISE row with PASS once the cycle closes (or with a tighter REVISE if blockers remain). Canonical source: `memory/compounded/2026-05-03-platform-todos-route-to-training-tracking-surface-not-maintainer-blocks.md` (related — the Quality block is the per-class state surface; `pre-cohort-todos.md` is the cross-file TODO surface; the two are not redundant).

### Step 7 — Hard boundary: eval is read-only for content; metadata only via update-quality.sh

This skill NEVER modifies curriculum body or maintainer-content. Verdicts are evidence, not edits. The judge's `fix_hint` field is a one-line suggestion from a single narrow lens; it is not a recipe and frequently collides with what other lenses see (mood, Key Concepts, maintainer-review provenance) — none of which the running judge has loaded.

The single exception: Step 6.5's call to `update-quality.sh` to stamp a PASS verdict. That script is bounded — it touches only the **Quality:** block, never content.

If any file has a REVISE verdict and the author wants fixes:

1. **Exit this skill.** Do not edit inside the eval cycle.
2. **Pick a dispatch shape, then route.** Two legal shapes:

   **(a) Single-file `/content-creation` invocation** (default for one or two files). The skill loads bosser-strategy preflight, mood contract, Big Idea, compendiums, runs PDCA, and re-fires `/eval-fire` at cycle close. Slower but inside the canonical boundary.

   **(b) Parallel fan-out via subagents** (when 3+ files have disjoint surgical fixes — see `curriculum/CLAUDE.md` § Orchestrator pattern). Subagents cannot invoke skills, so each subagent's brief MUST include the output of `curriculum/evals/scripts/content-creation-brief.sh <file>` (training, voice contract, Big Idea, mood contract, compendiums, hard rules) — that script extracts what `/content-creation`'s preflight would have loaded. The brief output is appended verbatim into each subagent's prompt alongside the per-finding fix-hint. Strategy-loaded subagents make mood-honest edits; strategy-unloaded subagents pass compendium rules but can drift mood. **Default to including the brief; omit only when fix is purely mechanical (em-dash, banned word, single-line credit add).**

3. **Override decisions** (deliberately accepting a flagged risk) get logged to `memory/compounded/` as `type: decision`. Overrides are content-creation-skill output, not eval-fire output.

Diagnostic for the orchestrator: if you (the running agent) are about to call `Edit` or `Write` on a curriculum file inside this skill's invocation, STOP. The boundary collapsed. Surface the verdict, return control to the user, let them invoke `/content-creation` if they want fixes.

Canonical source: `memory/compounded/2026-05-02-platform-sim-eval-verdicts-are-read-only.md`.

## Caching / sim-trace coordination

For the `story` class, the judge prompt template names the cache path (`curriculum/evals/sim-cache/<file-slug>.json`). The judge subagent decides whether to use the cached trace or regenerate. Step 4 of the eval refactor wires that cache; this skill is the entry point.

## Real-world test

After 30 days of `/eval-fire` use side-by-side with `/curriculum-pre-ship-audit`'s legacy megajudge path, compare verdict agreement on a sample of 10 files. If class-path verdicts catch findings the megajudge missed (and vice versa is rare), the refactor earned its keep — retire the megajudge fallback per the rollout plan.
