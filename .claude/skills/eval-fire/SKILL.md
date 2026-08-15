---
name: eval-fire
description: Run a single eval class (writing | story | technical | behavior | pedagogy | strategy | cross_module | slides) against one or more curriculum files. Dispatches a class-judge subagent with the relevant compendiums (filtered by `eval_classes:` frontmatter) and the matching judge prompt template. Returns a structured per-rule verdict. Mirrors `/research-review`'s parallel-launch pattern but scoped to one class per invocation. The full per-file audit lives in `/curriculum-pre-ship-audit` (six per-file classes + cross_module at module-set scope); this skill is the single-class on-demand fire.
argument-hint: <class:writing|story|technical|behavior|pedagogy|strategy|cross_module> [--personas N] <file-path> [<file-path> ...]
---

# /eval-fire — single-class judge dispatch

Fires one eval class against one or more curriculum files. The class determines which compendiums load (all `memory/check_*.md` whose `eval_classes:` includes the class), which judge prompt template is used (`curriculum/evals/judges/<class>.md`), and which model the subagent runs on.

## When to invoke

- **Iterating on a single file** during authoring — fastest signal, cheapest token cost.
- **Triaging a queued class** from `/tmp/claude-eval-queue-<sid>` (the eval-class-router hook writes per-class entries on every curriculum edit).
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
| `story` | `sonnet` | `curriculum/evals/judges/story.md` | `sim-cache/<training>--<surface-type>--<slug>.persona.json` (Class A persona-reader, per-phase SHA) | every `memory/check_*.md` with `eval_classes:` containing `storytelling`; strategy doc per training |
| `technical` | `sonnet` | `curriculum/evals/judges/technical.md` | none | every `memory/check_*.md` with `eval_classes:` containing `technical` |
| `behavior` | `sonnet` | `curriculum/evals/judges/prompt-behavior.md` | `sim-cache/<training>--<surface-type>--<slug>.behavior.json` (Class B prompt-behavior, per-prompt SHA) | `.claude/skills/content-creation/simulation-behavior.md` catalog; `check_prompts.md` + `check_pedagogy.md` |
| `pedagogy` | `sonnet` | `curriculum/evals/judges/pedagogy.md` | none | every `memory/check_*.md` with `eval_classes:` containing `pedagogy` (primarily `check_pedagogy.md`) |
| `strategy` | `sonnet` | `curriculum/evals/judges/strategy.md` | none | every `memory/check_*.md` with `eval_classes:` containing `strategy` (primarily `check_strategy_tie_in.md`); strategy doc per training |
| `cross_module` | `sonnet` | `curriculum/evals/judges/cross-module.md` | none | `check_cross_module.md`; supplied module-set paths (≥2) |
| `slides` | `sonnet` | `curriculum/evals/judges/slides.md` | none | every `memory/check_*.md` with `eval_classes:` containing `slides` (primarily `check_slides.md`) |

The orchestrator (you) does NOT inline compendium content into the prompt — the judge subagent reads them on demand. This keeps the orchestrator's context clean and lets the subagent quote line numbers accurately.

## The flow

### Step 1 — Parse arguments

`$ARGUMENTS[0]` is the class. Validate it's one of `writing`, `story`, `technical`, `behavior`, `pedagogy`, `strategy`, `cross_module`, `slides`. If invalid or missing, stop and ask.

**Slides class fires per-chunk.** The judge splits the body at `##` headings (one slide per chunk, matching `site/layouts/slides.js`) and evaluates every rule against every chunk in isolation. Any slide-rendered file is a valid target: lectures, exercises, module files.

**Cross_module class is module-set-scoped.** It requires ≥2 file paths and ALL must be module files (`curriculum/trainings/<training>/<slug>.md` shape) from the SAME training. Passing 1 file or files from different trainings: stop and ask.

Optional `--personas N` (only valid for `story`): N is 1, 2, or 3. Default 1. If N > 1, the storytelling judge will run the audience triangle.

`$ARGUMENTS[remaining]` are file paths. At least one is required. If missing, stop and ask.

### Step 2 — Identify in-scope compendiums

Glob `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/check_*.md`. For each, read the frontmatter and check whether `eval_classes:` contains the requested class. Collect the matching paths.

For the storytelling class, the class name in compendium frontmatter is `storytelling` (full word). For the args, accept `story` as shorthand and translate.

For the behavior class, the compendium set is fixed: `check_prompts.md` + `check_pedagogy.md`. The catalog at `.claude/skills/content-creation/simulation-behavior.md` is the primary input — pass its path as `{{catalog_path}}`.

For the **pedagogy** class, the primary compendium is `check_pedagogy.md` (frontmatter `eval_classes:` contains `pedagogy`). Cross-module rules that moved to `check_cross_module.md` are stub redirects in `check_pedagogy.md` — the judge returns N/A on those numbers. No sim trace.

For the **strategy** class, the primary compendium is `check_strategy_tie_in.md` (frontmatter `eval_classes:` contains `strategy`). Pass `{{strategy_doc_paths}}` per the file's training (`bosser-strategy:content-strategy.md` for Agents 101 and shared; `bosser-strategy:content-strategy-agentic-engineering-101.md` for AE101; `bosser-strategy:content-strategy-claude-basics.md` for Claude Basics). For shared exercise/lecture files (`curriculum/exercises/<slug>.md`, `curriculum/lectures/<slug>.md`), determine training by slug-matching against the per-training module lists in `site/layouts/curriculum.js` TRAININGS registry. No sim trace.

For the **cross_module** class, the compendium is fixed: `check_cross_module.md`. Substitute `{{module_set_paths}}` with the list of file paths passed as args (joined by newline). No sim trace.

### Step 3 — Read the judge prompt template

`curriculum/evals/judges/<class>.md` is the prompt template (for `behavior`, the file is `prompt-behavior.md`). Read it once. Substitute `{{file_path}}`, `{{compendium_paths}}`, `{{trace_path}}` (for `story` and `behavior`), and `{{catalog_path}}` (for `behavior` only) into the template.

**Marker-aware reading (post-prompts-registry refactor).** The judge templates now instruct subagents to run `node scripts/expand-md.js {{file_path}}` before scanning, so `{{prompt:<key>}}` markers resolve into the canonical `**Prompt** + fenced block` shape the judges' regex / line-count logic was written for. `{{file_path}}` stays the raw source path — only the read view shifts. If a judge template predates this refactor and still reads the raw file directly, expand-md.js is the helper to wire in (see `prompt-behavior.md` for the canonical shape).

Trace path resolution:
- `story`: `curriculum/evals/sim-cache/<training>--<surface-type>--<file-slug>.persona.json`
- `behavior`: `curriculum/evals/sim-cache/<training>--<surface-type>--<file-slug>.behavior.json`

`<file-slug>` is the basename without `.md`; `<training>` is the short training key (`ae101` / `agents-101` / `claude-basics`) that prefixes the instance filenames, resolved the same way as `{{strategy_doc_paths}}` in Step 2 (file path `curriculum/trainings/<dir>/...`, or slug-match against the TRAININGS registry for shared exercise/lecture files). The prefix disambiguates same-slug files across trainings — `getting-going` exists in both Agents 101 and AE101, and a bare slug would feed the wrong training's trace to the judge. `<surface-type>` is derived from the file's parent directory (`curriculum/trainings/<t>/` → `module`, `curriculum/exercises/` → `exercise`, `curriculum/lectures/` → `lecture`, `curriculum/trainings/<t>/supplementary/` → `supplementary`, `curriculum/trainings/<t>/reference/` → `reference`) — directory-derived, not basename-keyed, so a module and an exercise sharing a slug (`spot-gaps-build-the-loop` is both) never collide.

### Step 4 — Dispatch the subagent

Use the `Agent` tool with:
- `subagent_type: "general-purpose"`
- `model:` matching the class (haiku for writing; sonnet for story / technical / behavior)
- `description:` `"<class>-class judge: <basename>"` per file
- `prompt:` the substituted judge template, with `.claude/rules/content-rules.md` prepended verbatim (per the subagent rule-injection convention in project CLAUDE.md). For `story --personas N > 1`, append a single line `personas: N` to the substituted prompt — the judge interprets it.
- **Append this clause verbatim to every dispatched judge prompt, every class:**

  > Before marking any rule REVISE, state in the `evidence` field, in one line, WHAT HARM that rule exists to prevent and whether that harm is actually present here. A rule firing is not the harm arriving: rules encode cheap proxies (a count, a string, a location) for expensive concerns (credential-collecting, dialect-smuggling, body clutter), and a proxy matches on shape while the harm lives in purpose. Read the whole rule including any boundary or exception clause before scoring — exceptions are often stated after the prohibition, and a judge that pattern-matches the ban will stop early. If the harm is absent, or if the obvious fix would degrade the artefact (falsify a verbatim quote, delete a rescue the student needs, break a deliberate repetition), do NOT file a REVISE: report it as a rule question for the maintainer, and say what the rule would have to say to be right. Check the file's maintainer block for an existing accept-note on the passage before flagging it at all.

  Three maintainer rejections on 2026-08-02 — all of correctly-fired checks whose proposed fixes made the material worse — are why this is mandatory rather than advisory. → `memory/compounded/2026-08-02-content_creation-a-rule-firing-is-not-the-harm-arriving.md`
- **Append this verbatim too — no citing a tool you did not run:**

  > If your evidence names a script, command, or exit code, you must have RUN it in this session. Paste the exact command and its real output or exit status into the `evidence` field. Never write that a checker "confirms" something, or report an exit code, from inference about what the checker probably does. If you did not run it, say what you observed directly and say the mechanical claim is unverified.


  > **A PASS owes evidence too — this is the half the rules above did not cover, and it failed on 2026-08-15.** One writing sweep returned 702 rule verdicts across 13 files, all PASS, all `evidence: null`, in 7 tool calls; the summary table was indistinguishable from a real clean sweep. So: a mechanically-checkable rule marked PASS carries the command result in `evidence` (`grep -c '—' → 0 in body`); a judgement rule marked PASS quotes the line that comes CLOSEST to violating it, with line number, and says why it stays inside; a rule that does not apply to this file is `N/A` with a one-clause reason. **Nothing is PASS by default.** Validate your own greps against a planted test string before trusting a zero. **Orchestrator side:** before believing any sweep, run `grep -c '"evidence": *null'` over the instances it wrote and compare tool-call count to file count — a skim is visible in both numbers and in neither summary.
  **Orchestrator side of the same rule: re-run any tool result a judge cites before acting on the finding.** A cited command is the one claim in a verdict you can check in three seconds. On 2026-08-12 a story judge filed a blocking finding reading *"`scripts/check-slide-size.js` confirms, gate exits 1"* — the script exits 0. Its bullet count was true; only the corroboration was invented, and acting on the verdict as written would have edited a student-facing slide to satisfy a check that was already passing. When a judge's own observation and its mechanical corroboration disagree, the disagreement IS the finding: one of the two instruments is broken, and it is often not the one you suspect. That chase is what surfaced a gate which had never opened a module file. → `memory/compounded/2026-08-08-platform-verification-tooling-must-fail-closed.md` §4
- **Append this verbatim too — stay in your class:**

  > Evaluate ONLY the compendiums your template puts in scope. Reaching into a sibling class's rules feels thorough and is the opposite: a verdict outside your lane is not extra coverage, it is an unowned claim that outranks nothing and can contradict something. If you notice a problem belonging to another class, put it in `notes`, never in `rules_evaluated`.

  Caught 2026-08-13: a writing judge scored `check_slides.md` 14/14 PASS on `run-the-first-experiment.md` while the slides judge — which had grepped both loci and run three checkers — filed a rule-9 finding on the identical body. Two instance files then disagreed about one rule and neither recorded that a disagreement existed, so whichever a successor read first became the truth. **Orchestrator side:** when two classes report on the same rule, the one whose template OWNS it wins, and the other verdict is a defect in the losing judge's scope, not a tie to adjudicate on evidence.

- **Every judge records `body_sha` at the top level of its instance JSON** — `shasum -a 256 <file>` on the raw source, taken when it starts reading. A verdict is a claim about the body the judge READ; in a multi-session repo the file moves under running judges, and a verdict stamped at current HEAD then describes text that no longer exists. `update-quality.sh` REFUSES to stamp when a recorded `body_sha` doesn't match the file (instances without the field predate the guard and stamp as before). Caught live on 2026-08-02: a concurrent session's pedagogy verdict quoted a clause cut one minute before it was written, and read as a clean PASS.

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

Do NOT inline the entire JSON — extract REVISE rules and quote evidence. The full JSON is logged to `curriculum/evals/instances/<training>--<surface-type>--<file-slug>.<class>.json`, where `<surface-type>` is derived from the file's parent directory (`curriculum/trainings/<t>/` → `module`, `curriculum/exercises/` → `exercise`, `curriculum/lectures/` → `lecture`, `curriculum/trainings/<t>/supplementary/` → `supplementary`, `curriculum/trainings/<t>/reference/` → `reference`) — e.g. `ae101--module--getting-going.pedagogy.json` (overwrite per-class per-file per the no-dated-reports rule in `check_writing.md`). Directory-derived, not basename-keyed, so a module and an exercise that share a slug (`spot-gaps-build-the-loop` is both) never collide.

### Step 6.5 — Record verdict to Quality block (PASS AND REVISE)

After Step 6 (Present), the orchestrator MUST shell out to `update-quality.sh` for EVERY verdict — both PASS and REVISE. The Quality block is the canonical state surface; if REVISE doesn't get stamped, a successor agent sees `grandfathered` and can't tell whether the class is "pre-refactor PASS still valid", "run-and-REVISE", or "never run". Stamping REVISE with a JSON pointer disambiguates.

```
# PASS:
curriculum/evals/scripts/update-quality.sh <file_path> --<class> PASS

# REVISE (note is mandatory, point to the instance JSON for the per-rule findings):
curriculum/evals/scripts/update-quality.sh <file_path> --<class> REVISE:<NB>/<NT>-see-instances/ae101--<surface-type>--<slug>.<class>.json
```

The script is deterministic, touches ONLY the maintainer-block Quality state, and is the only sanctioned writer of that block. Free-form Quality edits drift; the script keeps the format consistent. This is the **script-ratchet endpoint** for the judge classes — a verdict in, a consistent Quality row out.

REVISE-stamped files still route through `/content-creation` per Step 7 for the actual fixes. The cycle-close re-fire of `/eval-fire` overwrites the REVISE row with PASS once the cycle closes (or with a tighter REVISE if blockers remain).

**A REVISE row is a claim about the CURRENT body — re-fire in the same pass as the fix.** Fixing the finding and moving on leaves the row asserting a defect that no longer exists, and a successor cannot tell stale-REVISE from live-REVISE without re-deriving the finding by hand. One judge now beats a stamp that lies for months. Corpus survey 2026-08-02: 15 files carried REVISE; 9 were already fixed.

**Inheriting a REVISE of unknown age — cheap triage, do this before dispatching anything.** Each instance JSON stores the finding's own quoted evidence. Pull the longest quoted span from `rules_evaluated[].evidence` and grep the current body for it: GONE → fix landed, re-fire the class; STILL-PRESENT → finding is live, route to `/content-creation`. Brief every such re-fire with **"do not pass because the old string vanished — re-derive every rule"**; on the 2026-08-02 sweep that instruction is what caught a violation of the same rule three lines above the repaired sentence, a second over-budget bold a prior run missed, and one re-fire premise that was itself wrong (flagged sentence still present, no longer a violation because the rule had gained a carve-out).

**Scope a lint-driven re-read to the unit the check reads, never to the sentence you edited.** Slides = the `##` chunk; writing = the section. `how-this-training-was-built.md` chunk 1 took three cycles for one rule (`surface`, then `fired`, then `forcing function` three lines up) because each cycle re-read only its own repair. Canonical source: `memory/compounded/2026-05-03-platform-todos-route-to-training-tracking-surface-not-maintainer-blocks.md` (related — the Quality block is the per-class state surface; `pre-cohort-todos.md` is the cross-file TODO surface; the two are not redundant).

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

For the `story` class, the judge prompt template names the cache path (`curriculum/evals/sim-cache/<training>--<file-slug>.persona.json`). The judge subagent decides whether to use the cached trace or regenerate.
