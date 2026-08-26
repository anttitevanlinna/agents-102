---
name: eval-fire
description: Run a single eval class (writing | story | technical | behavior | pedagogy | strategy | cross_module | slides | voice_panel) against one or more curriculum files. Dispatches a class-judge subagent with the relevant compendiums (filtered by `eval_classes:` frontmatter) and the matching judge prompt template. Returns a structured per-rule verdict. Mirrors `/research-review`'s parallel-launch pattern but scoped to one class per invocation. The full per-file audit lives in `/curriculum-pre-ship-audit` (seven per-file classes + cross_module at module-set scope); this skill is the single-class on-demand fire.
argument-hint: <class:writing|story|technical|behavior|pedagogy|strategy|cross_module|voice_panel> [--personas N] <file-path> [<file-path> ...]
---

# /eval-fire — single-class judge dispatch

Fires one eval class against one or more curriculum files. The class determines which compendiums load (all `memory/check_*.md` whose `eval_classes:` includes the class), which judge prompt template is used (`curriculum/evals/judges/<class>.md`), and which model the subagent runs on.

## When to invoke

- **Iterating on a single file** during authoring — fastest signal, cheapest token cost.
- **Triaging what still owes a judge** — `npm run evals:queue` (`curriculum/evals/scripts/eval-queue.js`) walks the universe and derives every (file, class) pair still owing, from each file's own Quality pins.
- **High-stakes story sweep:** `/eval-fire story --personas 3` runs the audience triangle (mid-layer / opinionated senior / fast operator). Default is single canonical persona; the flag is opt-in for cohort-imminent or sponsor-critical files.
- **NOT** for a full ship-time audit — that's `/curriculum-pre-ship-audit`, which dispatches all four classes in parallel and adds source-verify + capability-check + Quality-tag check on top.
- **NOT for clearing the queue.** More than a handful of (file, class) pairs → `.claude/workflows/eval-sweep.js`, below.

## Clearing a queue: use the workflow, do not hand-write the dispatch

`Workflow({scriptPath: '.claude/workflows/eval-sweep.js', args: {items, confirm, sets}})`, where `items` is `eval-queue.js --training <t> --json` with a per-class `pins` map attached. It fires one judge per pair, adversarially verifies every **blocking** finding with two lenses, and returns what survived plus what died, named, so a re-fire targets the deaths rather than the set.

**Do not write a fresh dispatch script per sweep.** Six were hand-built in one 2026-08-24 session and every copy drifted from the one before it: one lost the read-only clause and five verdicts died to a sibling write-race; one crashed on a refuter that returned null and lost a whole pipeline's adjudication; one forced a binary `PASS|REVISE` schema, so a judge with a non-blocking observation had to report REVISE and the orchestrator read a TODO as a gate. Agent-written dispatch drifts exactly the way agent-written prose does, and the remedy is the same one: a single artefact, edited in place. The workflow carries the read-only clause, the null-refuter guard, the `PASS_WITH_TODOS` rung, and the bullet-safe diff warning; a copy carries whichever of those the copier remembered.

**Judges are read-only, no exceptions** (project `curriculum/CLAUDE.md` § *Parallel subagents*). The orchestrator applies findings after every class on a file has returned, then stamps — Step 6.5's ordering, which the workflow does not do for you.

## What it does NOT do

- Edit the target file. Verdicts only.
- Run more than one class. Use `/curriculum-pre-ship-audit` for the full sweep.
- Run sim-trace generation directly — that's the judge subagent's responsibility (it reads cached trace if per-phase / per-prompt SHA matches, else regenerates only the stale slices).

## Class table

| Class | Default model | Judge prompt | Trace cache | Primary inputs |
|---|---|---|---|---|
| `writing` | `sonnet` | `curriculum/evals/judges/writing.md` | none | every `memory/check_*.md` with `eval_classes:` containing `writing` |
| `story` | `sonnet` | `curriculum/evals/judges/story.md` | `sim-cache/<training>--<surface-type>--<slug>.persona.json` (Class A persona-reader, per-phase SHA) | every `memory/check_*.md` with `eval_classes:` containing `storytelling`; strategy doc per training |
| `technical` | `sonnet` | `curriculum/evals/judges/technical.md` | none | every `memory/check_*.md` with `eval_classes:` containing `technical` |
| `behavior` | `sonnet` | `curriculum/evals/judges/prompt-behavior.md` | `sim-cache/<training>--<surface-type>--<slug>.behavior.json` (Class B prompt-behavior, per-prompt SHA) | `curriculum/evals/simulation-behavior.md` catalog; `check_prompts.md` + `check_pedagogy.md` |
| `pedagogy` | `sonnet` | `curriculum/evals/judges/pedagogy.md` | none | every `memory/check_*.md` with `eval_classes:` containing `pedagogy` (primarily `check_pedagogy.md`) |
| `strategy` | `sonnet` | `curriculum/evals/judges/strategy.md` | none | every `memory/check_*.md` with `eval_classes:` containing `strategy` (primarily `check_strategy_tie_in.md`); strategy doc per training |
| `cross_module` | `sonnet` | `curriculum/evals/judges/cross-module.md` | none | `check_cross_module.md`; supplied module-set paths (≥2) |
| `slides` | `sonnet` | `curriculum/evals/judges/slides.md` | none | every `memory/check_*.md` with `eval_classes:` containing `slides` (primarily `check_slides.md`) |
| `voice_panel` | `sonnet` | `curriculum/evals/judges/voice-panel.md` | none | the persona cards in the template; `check_writing.md` §4; `compounded/2026-04-25-writing-ae101-voice-quartet.md`; the module's `Mood target` line |

The orchestrator (you) does NOT inline compendium content into the prompt — the judge subagent reads them on demand. This keeps the orchestrator's context clean and lets the subagent quote line numbers accurately.

## The flow

### Step 1 — Parse arguments

`$ARGUMENTS[0]` is the class. Validate it's one of `writing`, `story`, `technical`, `behavior`, `pedagogy`, `strategy`, `cross_module`, `slides`, `voice_panel`. If invalid or missing, stop and ask.

**Slides class fires per-chunk.** The judge splits the body at `##` headings (one slide per chunk, matching `site/layouts/slides.js`) and evaluates every rule against every chunk in isolation. Any slide-rendered file is a valid target: lectures, exercises, module files.

**Cross_module class is module-set-scoped.** It requires ≥2 file paths and ALL must be module files (`curriculum/trainings/<training>/<slug>.md` shape) from the SAME training. Passing 1 file or files from different trainings: stop and ask.

**Voice_panel is a panel, not a judge, and it is not a gate.** It fires six subagents per file — five author personas plus Sami, the cautious reader whose flinch vetoes a unanimous author panel. Scope is AE101 student-facing surfaces (modules, exercises, lectures, prework); reference lookup pages are out. Fire it AFTER the writing class passes: compliance first, taste second, since panel-reading a file with banned words in it wastes six agents. Its findings are taste — they route to `pre-cohort-todos.md` or a card, never auto-applied, and nothing else waits on them. Full when-to-fire, synthesis rule and the maintainer-guard check live in the template.

Optional `--personas N` (only valid for `story`): N is 1, 2, or 3. Default 1. If N > 1, the storytelling judge will run the audience triangle.

`$ARGUMENTS[remaining]` are file paths. At least one is required. If missing, stop and ask.

### Step 2 — Identify in-scope compendiums

Glob `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/check_*.md`. For each, read the frontmatter and check whether `eval_classes:` contains the requested class. Collect the matching paths.

**Full compendiums (T3), never `memory/_index/`.** The index is the generator's tier — leads without carve-outs. Judges cite rule numbers and adjudicate boundary cases, so they need the file. `metadata.tiers.diamond` in the frontmatter is index bookkeeping and has no bearing on which rules a judge evaluates: every rule is in scope, diamond or not.

For the storytelling class, the class name in compendium frontmatter is `storytelling` (full word). For the args, accept `story` as shorthand and translate.

For the behavior class, the compendium set is fixed: `check_prompts.md` + `check_pedagogy.md`. The catalog at `curriculum/evals/simulation-behavior.md` is the primary input — pass its path as `{{catalog_path}}`.

For the **pedagogy** class, the primary compendium is `check_pedagogy.md` (frontmatter `eval_classes:` contains `pedagogy`). Cross-module rules that moved to `check_cross_module.md` are stub redirects in `check_pedagogy.md` — the judge returns N/A on those numbers. No sim trace.

For the **strategy** class, the primary compendium is `check_strategy_tie_in.md` (frontmatter `eval_classes:` contains `strategy`). Pass `{{strategy_doc_paths}}` per the file's training (`bosser-strategy:content-strategy.md` for Agents 101 and shared; `bosser-strategy:content-strategy-agentic-engineering-101.md` for AE101; `bosser-strategy:content-strategy-claude-basics.md` for Claude Basics). For shared exercise/lecture files (`curriculum/exercises/<slug>.md`, `curriculum/lectures/<slug>.md`), determine training by slug-matching against the per-training module lists in `site/layouts/curriculum.js` TRAININGS registry. No sim trace.

For the **cross_module** class, the compendium is fixed: `check_cross_module.md`. Substitute `{{module_set_paths}}` with the list of file paths passed as args (joined by newline). No sim trace.

For the **voice_panel** class, there is no `eval_classes:` glob — the calibration set is fixed by the template: `check_writing.md` §4, `compounded/2026-04-25-writing-ae101-voice-quartet.md`, and the `Mood target` line from the maintainer block of the module the file belongs to. A persona cannot judge a beat without knowing which mood it was engineered for, so resolve the mood target before dispatch and pass it in the prompt. No sim trace.

### Step 3 — Build the dispatch prompt

**There is one dispatch contract and you do not retype it.** `curriculum/evals/judges/_dispatch-preamble.md` carries every clause a judge must obey — the T3-not-index rule, harm-before-REVISE, no-citing-a-tool-you-did-not-run, a-PASS-owes-evidence, stay-in-your-class, `body_sha`, the four things a `rules_evaluated` row must get right, and §Mechanics (what is precomputed and must not be re-derived). It used to be duplicated into this step under a keep-in-sync note; the copies diverged, and the same file judged by the same class got a different protocol depending on whether the dispatch came through this skill or through `eval-sweep.js`.

So the prompt you dispatch is a short parameter header over that contract. Substitute and send verbatim:

```
You are the **<class>** eval judge for `<file_path>`. Repo root `/Users/anttitevanlinna/Projects/agents-102` — cd there first.

## Read

1. `curriculum/evals/judges/_dispatch-preamble.md` IN FULL — the dispatch contract, including §Mechanics, which tells you what not to re-derive.
2. `curriculum/evals/judges/<template>`
3. Your rulebook:
```
node curriculum/evals/scripts/derive-class-brief.js <file_path> <class>
```
Every in-scope rule VERBATIM — full lead, full body, every carve-out — minus the rules the prefill resolved. If it cannot build, read these in full instead and say so in `notes`:
  - <compendium_paths>

Judges cite rule numbers and adjudicate boundary cases, so the `_index/` leads are never enough.

**Issue the template read, the rulebook and the body view in ONE turn** — they have no dependency on each other.

## The read view

The body view's `signals` tell you whether there is anything to expand. Run `node scripts/expand-md.js <file_path>` only if `has_prompt_blocks` or `has_figures` is true. Cite line numbers against the RAW source either way.

## Your geometry is already computed

```
node curriculum/evals/scripts/derive-body-view.js <file_path>
```

## Rows resolved before you started — park them, then splice them

```
node curriculum/evals/scripts/prefill-instance.js <file_path> <class> --write
```

**Emit rows ONLY for the rules your brief contains.** A rule the brief omitted is parked and answered; writing your own row for it is the whole cost this mechanism removes, and it is invisible afterwards because the finished ledger looks identical either way.

After you write your instance, and before you reply:

```
node curriculum/evals/scripts/prefill-instance.js <file_path> <class> --merge
```

Skipping `--merge` loses exactly the rules the brief dropped — a coverage hole that reads as a clean run. Report both integers: the rows you wrote yourself, and the number `--merge` spliced in. A judge that re-derives the parked rows produces an instance byte-comparable to one that did not — the two integers are the only place it shows.

## Before filing anything

Read the `<!-- maintainer -->` block for dated accept-notes; the body view has already extracted them. A finding against a documented accept-note is a false positive that costs real attention.

## You are READ-ONLY on the target file

Not the body, not the maintainer block, not a backing block, not a source stamp. Other judges are reading this same file right now. Anything you would have fixed goes in `findings` (blocking) or `todos` (not). The only file you write is your own instance JSON.

## Write the instance

Overwrite `curriculum/evals/instances/<slug>.<class>.json`, with `body_sha` and `shape_hash` at top level. Then run and report the real integer:

```
node curriculum/evals/scripts/check-instance-evidence.js curriculum/evals/instances/<slug>.<class>.json
```

Return the structured verdict.
```

Template file per class is the Class table's `Judge prompt` column (`behavior` → `prompt-behavior.md`). `<slug>` is `<training>--<surface-type>--<file-slug>`, surface-type derived from the parent directory — `curriculum/trainings/<t>/` → `module`, `curriculum/exercises/` → `exercise`, `curriculum/lectures/` → `lecture`, `.../supplementary/` → `supplementary`, `.../reference/` → `reference`. Directory-derived, never basename-keyed, so a module and an exercise sharing a slug (`spot-gaps-build-the-loop` is both) never collide. `derive-body-view.js` prints the slug it resolved — use that rather than assembling it by hand.

Trace path resolution, for the two classes that have one:
- `story`: `curriculum/evals/sim-cache/<training>--<surface-type>--<file-slug>.persona.json`
- `behavior`: `curriculum/evals/sim-cache/<training>--<surface-type>--<file-slug>.behavior.json`

Pass the trace path as `{{trace_path}}` and, for `behavior` only, `curriculum/evals/simulation-behavior.md` as `{{catalog_path}}`. A cached trace is a claim about a body that may no longer exist — the contract's last clause governs it.

**When the target is stale against a pin**, add the diff block the workflow adds:

```
## Run your own diff

Pin `<pin>`, staleness reason **<reason>**.

git diff <pin>..HEAD -- <file_path>

Do not filter with `grep -E '^[-+][^-+]'` — it drops every markdown bullet line. Do not scope your read to the diff: findings are routinely pre-existing lines every diff-scoped pass skipped.
```

### Step 4 — Dispatch the subagent

Use the `Agent` tool with:
- `subagent_type: "general-purpose"`
- `model:` **sonnet for every judge class.** Writing ran on haiku until 2026-08-19; it passed the schema gate and failed on judgement (out-of-lane rules, cross-file false positives), which no JSON validation catches. A 2026-08-26 hillclimb re-confirmed it on a planted-defect bench: haiku held mechanical recall at 5/5 and fell to 3/5 on judgement, dropping exactly the unearned term of art and the slogan shipped without its carve-out. Haiku belongs on the mechanical batteries (`check_platform_and_boundaries.md` §16/§17), where a wrong answer shows in the output's shape. → `check_platform_and_boundaries.md` §21a
- `description:` `"<class>-class judge: <basename>"` per file
- `prompt:` the Step 3 header, with `.claude/rules/content-rules.md` prepended verbatim (per the subagent rule-injection convention in project CLAUDE.md)

For `story --personas N > 1`, append a single line `personas: N` — the judge interprets it.

If multiple file paths were passed, dispatch one subagent per file, all in a single message (parallel).

**Voice_panel dispatches six per file, not one.** Each gets one persona card from the template plus the calibration set, and each returns its own JSON object (`persona`, `pleased`, `delight`, `misses`, `weakest_passage`, `would_sign`). Give each subagent ONLY its own card: a panel where every seat has read every other seat's brief is one judge with six voices, which is the failure the panel exists to avoid. The contract still applies, except that a persona's job IS to name the weakest passage — a persona reporting nothing amiss and no weakest passage has not read the file, and that is a broken run, not a clean one. Synthesize after all six return, per the template's synthesis section.

**Orchestrator side, before believing anything that comes back:**

```
node curriculum/evals/scripts/check-instance-evidence.js curriculum/evals/instances/<slug>.<class>.json
```

Exits 1 on an ungrounded verdict — a finding with no quote or harm, a REVISE or judgement PASS with no evidence, an N/A with no reason at all. A terse N/A is healthy and is not counted; the raw `grep -c '"evidence": *null'` this step used to prescribe now mixes the two populations and means nothing. Compare tool-call count to file count as well: a skim is visible in both numbers and in neither summary.

**Re-run any tool result a judge cites before acting on the finding.** A cited command is the one claim in a verdict you can check in three seconds. On 2026-08-12 a story judge filed a blocking finding reading *"`scripts/check-slide-size.js` confirms, gate exits 1"* — the script exits 0. Its bullet count was true; only the corroboration was invented, and acting on the verdict as written would have edited a student-facing slide to satisfy a check that was already passing. When a judge's own observation and its mechanical corroboration disagree, the disagreement IS the finding: one of the two instruments is broken, and it is often not the one you suspect. → `memory/compounded/2026-08-08-platform-verification-tooling-must-fail-closed.md` §4

**When two classes report on the same rule, the one whose template OWNS it wins**, and the other verdict is a defect in the losing judge's scope, not a tie to adjudicate on evidence. Caught 2026-08-13: a writing judge scored `check_slides.md` 14/14 PASS on `run-the-first-experiment.md` while the slides judge — which had grepped both loci and run three checkers — filed a rule-9 finding on the identical body. Two instance files then disagreed about one rule and neither recorded that a disagreement existed.

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

After Step 6 (Present), the orchestrator MUST shell out to `update-quality.sh` for EVERY verdict — both PASS and REVISE. **Wait until every class dispatched against a file has returned, then stamp that file once, carrying all its axes.** The script writes into the file it hashes, so a stamp landing while another judge still has the file open strands that judge's verdict behind the guard and costs a re-fire (2026-08-19). Batching is also one write instead of seven. → `check_platform_and_boundaries.md` §35 The Quality block is the canonical state surface; if REVISE doesn't get stamped, a successor agent sees `grandfathered` and can't tell whether the class is "pre-refactor PASS still valid", "run-and-REVISE", or "never run". Stamping REVISE with a JSON pointer disambiguates.

```
# PASS:
curriculum/evals/scripts/update-quality.sh <file_path> --<class> PASS

# REVISE (note is mandatory, point to the instance JSON for the per-rule findings):
curriculum/evals/scripts/update-quality.sh <file_path> --<class> REVISE:<NB>/<NT>-see-instances/ae101--<surface-type>--<slug>.<class>.json

# Scope axes take their own flags, and cross_module stamps EVERY module in the set:
curriculum/evals/scripts/update-quality.sh <module> --cross-module PASS:set=[<m1>,<m2>,...]
curriculum/evals/scripts/update-quality.sh <file_path> --voice-panel PASS:6/6-signatures
```

Both scope rows carry `@<sha>` and are read back by `scan-stale-classes.js`, so the `set=[...]` note is load-bearing, not decoration: it is the list the scanner diffs to decide the row has gone stale. A cross_module row stamped without it reports `no-set` — unverifiable, which the queue treats as owing rather than clean. Slugs in the set are basenames without `.md`, resolved against the stamped module's own directory.

The script is deterministic, touches ONLY the maintainer-block Quality state, and is the only sanctioned writer of that block. Free-form Quality edits drift; the script keeps the format consistent. This is the **script-ratchet endpoint** for the judge classes — a verdict in, a consistent Quality row out.

REVISE-stamped files still route through Step 7 for the actual fixes. The cycle-close re-fire of `/eval-fire` overwrites the REVISE row with PASS once the cycle closes (or with a tighter REVISE if blockers remain).

**Stamp AFTER the body settles, never before applying findings.** A fix is itself a body edit, and the router does not care which class asked for it: every class whose diff region covers the edited line goes stale, including the ones that just passed. Order is judge every class → apply the findings → re-judge every class the edit re-stales (`scan-stale-classes.js --files <f>`, do not guess) → stamp once. 2026-08-23: 25 classes stamped, then 3 findings applied, then only the filing class re-judged — 11 classes were owing again immediately, 4 of them stamped clean against a body that no longer existed. A stamp taken before a pending edit is worse than no stamp: the queue reports the class as green.

**A REVISE row is a claim about the CURRENT body — re-fire in the same pass as the fix.** Fixing the finding and moving on leaves the row asserting a defect that no longer exists, and a successor cannot tell stale-REVISE from live-REVISE without re-deriving the finding by hand. One judge now beats a stamp that lies for months. Corpus survey 2026-08-02: 15 files carried REVISE; 9 were already fixed.

**Inheriting a REVISE of unknown age — cheap triage, do this before dispatching anything.** Each instance JSON stores the finding's own quoted evidence. Pull the longest quoted span from `rules_evaluated[].evidence` and grep the current body for it: GONE → fix landed, re-fire the class; STILL-PRESENT → the string survived, which says NOTHING about whether the finding was ever true. **A surviving string is evidence about history, not about the claim** — run the harm-vs-shape test before it becomes an authoring task, and treat any verdict predating the dispatch preamble as unaudited, because nothing forced its author to ask. Only a finding that survives re-derivation is work. On the 2026-08-19 sweep 3 of 11 inherited REVISEs dissolved with no fix ever applied, and each would have produced a defensible-looking edit degrading student-facing prose to satisfy a rule that was never violated. → `memory/compounded/2026-08-19-content_creation-an-inherited-revise-is-a-hypothesis-not-a-work-item.md` Brief every such re-fire with **"do not pass because the old string vanished — re-derive every rule"**; on the 2026-08-02 sweep that instruction is what caught a violation of the same rule three lines above the repaired sentence, a second over-budget bold a prior run missed, and one re-fire premise that was itself wrong (flagged sentence still present, no longer a violation because the rule had gained a carve-out).

**Scope a lint-driven re-read to the unit the check reads, never to the sentence you edited.** Slides = the `##` chunk; writing = the section. `how-this-training-was-built.md` chunk 1 took three cycles for one rule (`surface`, then `fired`, then `forcing function` three lines up) because each cycle re-read only its own repair. Canonical source: `memory/compounded/2026-05-03-platform-todos-route-to-training-tracking-surface-not-maintainer-blocks.md` (related — the Quality block is the per-class state surface; `pre-cohort-todos.md` is the cross-file TODO surface; the two are not redundant).

### Step 7 — Hard boundary: eval is read-only for content; metadata only via update-quality.sh

This skill NEVER modifies curriculum body or maintainer-content. Verdicts are evidence, not edits. The judge's `fix_hint` field is a one-line suggestion from a single narrow lens; it is not a recipe and frequently collides with what other lenses see (mood, Key Concepts, maintainer-review provenance) — none of which the running judge has loaded.

The single exception: Step 6.5's call to `update-quality.sh` to stamp a PASS verdict. That script is bounded — it touches only the **Quality:** block, never content.

If any file has a REVISE verdict and the author wants fixes:

1. **Exit this skill.** Do not edit inside the eval cycle.
2. **Pick a dispatch shape, then route.** Two legal shapes:

   **(a) Single-file authoring turn** (default for one or two files). Load the bosser-strategy preflight, mood contract, Big Idea, and today's compendiums; run PDCA; re-fire `/eval-fire` at cycle close. Slower but inside the canonical boundary.

   **(b) Parallel fan-out via subagents** (when 3+ files have disjoint surgical fixes — see `curriculum/CLAUDE.md` § Orchestrator pattern). Subagents cannot invoke skills, so each subagent's brief MUST include the output of `curriculum/evals/scripts/content-creation-brief.sh <file>` (training, voice contract, Big Idea, mood contract, compendiums, hard rules) — that script extracts what `/content-creation`'s preflight would have loaded. The brief output is appended verbatim into each subagent's prompt alongside the per-finding fix-hint. Strategy-loaded subagents make mood-honest edits; strategy-unloaded subagents pass compendium rules but can drift mood. **Default to including the brief; omit only when fix is purely mechanical (em-dash, banned word, single-line credit add).**

3. **Override decisions** (deliberately accepting a flagged risk) get logged to `memory/compounded/` as `type: decision`. Overrides are authoring-turn output, not eval-fire output.

Diagnostic for the orchestrator: if you (the running agent) are about to call `Edit` or `Write` on a curriculum file inside this skill's invocation, STOP. The boundary collapsed. Surface the verdict, return control to the user, let them open an authoring turn if they want fixes.

Canonical source: `memory/compounded/2026-05-02-platform-sim-eval-verdicts-are-read-only.md`.

## Caching / sim-trace coordination

For the `story` class, the judge prompt template names the cache path (`curriculum/evals/sim-cache/<training>--<file-slug>.persona.json`). The judge subagent decides whether to use the cached trace or regenerate.
