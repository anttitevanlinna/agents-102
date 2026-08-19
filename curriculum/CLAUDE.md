# Curriculum Production

## Canon

Docs with authority over generation. Anything not listed is session material: read it, never cite it as a rule. Spent session docs move to `docs/archive/`; `node scripts/find-session-docs.js` lists candidates.

**All trainings**

- **Generation** (three-pass, PDCA, prompt + exercise design): the `memory/check_*.md` compendiums, autoloaded per `.claude/rules/content-rules.md`.
- **Pedagogy** (Bloom, 4 Cs, audience, throughlines): `curriculum/lecture-guardrails.md`.
- **Vocabulary** (controlled terms: session/task/run, kit terms, register splits): `curriculum/vocabulary.md`. Term change = amend the registry first, then one sweep pass, never a local synonym.
- **Module file shape**: `curriculum/module-shape.md`. **Widgets**: `curriculum/widgets.md`. **Quality line**: `curriculum/quality-format.md`.
- **Backing blocks**: `curriculum/backing-format.md`. **Source stamps**: `curriculum/source-freshness-format.md`.
- **Eval procedure**: `curriculum/evals/` top level (`curriculum/evals/README.md` = the testing pyramid; `simulation.md` Class A + `simulation-behavior.md` Class B; `exercise.md` / `lecture.md` manifests; `arc-pass.md`, `post-run-judge.md`, `pre-flight-checklist.md`, `manual-run-observation.md`, `slide-sweep.md` runbooks; `delivery-incidents.md` append-only; `IMPROVEMENTS.md` open machinery work). Rubrics: `curriculum/evals/judges/`. Lints: `curriculum/evals/lints/`.

**Agentic Engineering 101**

- **Delivery + runtime**: `curriculum/trainings/agentic-engineering-101/training-architecture.md`.
- **Arc / storyline / LOs**: `bosser-strategy:content-strategy-agentic-engineering-101.md`.
- **Theory** (spine, placement, doctrine): `theory-plan.md`, backed by `theory-audit.md` (coverage matrix) and `theory-evals.md` (soundness + landing specs).
- **Open work**: `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.
- **Standing reports**, one per scope, overwritten on rerun: `curriculum/evals/arc-read.ae101.md` (sequential arc), `voice-hunt.ae101.md` (per-file voice), `eval-coverage.ae101.md` (rule coverage).

State of play → `bosser-strategy:content-strategy.md` § *State of play*.

## Quality

Every student-facing artifact is either audited or carries no Quality line — there is no `draft` rung (removed 2026-05-31). Ladder: `compendium-audited` → `sim-passed`. Mechanical is not a rung (removed 2026-06-01) — the `tmux-runner` battery is a pre-ship system test (run-and-fix, unrecorded). There is no `maintainer-reviewed` axis (removed 2026-08-15, Antti: it goes stale the moment a body moves and nobody re-marks it — maintainer direction shows up in dated maintainer-block decision notes instead; the stamper strips any stray row it meets). Delivery reality → `- cohorts:` log row (not a rung). Six per-class SHAs + cross_module row. Auto-degrade is touch-based, per-class — executable: `curriculum/evals/scripts/scan-stale-classes.js` (diff-region → class routing since each pin; incl. consumed-prompt registry drift → behavior). Sweep planning uses the scanner, never any-body-edit-stales-all-classes.

**Done-done** (a module's finish line; the bar the `done-done`-citing files reference) = Quality at `sim-passed`, six per-class SHAs current, trainer handbook (trainer-modules.md) present, the `tmux-runner` system test run clean pre-ship (run-and-fix, not a recorded rung), no open audit TODOs in `pre-cohort-todos.md` for that module. (Delivery reality logs on the `- cohorts:` row, not a ladder rung to reach.) *No cross-module sequencing: the first cohort has run, so all six AE101 modules are open for substantive work (the former "M1–M3 done-done first" gate was removed 2026-07-01).*

Format + key rules → `curriculum/quality-format.md`.

## Scope

- **Agents 101** — builder leaders.
- **Engineering Management** — managers leading agentic change (`bosser-strategy:content-strategy-engineering-management.md`).
- **Agentic Engineering 101** — software-engineer ICs L0 → L3 (`bosser-strategy:content-strategy-agentic-engineering-101.md`).
- **Future:** executive briefing + domain variants.

Strategy files = each training's arc / storyline / LOs. `lecture-guardrails.md` = universal design rules. Module files compose the shared library. Per-training delivery: `curriculum/trainings/<training>/training-architecture.md`.

## Directory

```
curriculum/
  lecture-guardrails.md
  CLAUDE.md
  trainings/
    agents-101/
    agentic-engineering-101/
    engineering-management/    # FUTURE
    executive-briefing/        # FUTURE
      <slug>.md                # one file per module, no module-N- prefix
      reference/               # training-specific lookup
      supplementary/           # training-specific progressive reading
  exercises/                   # shared library, one file per exercise
  lectures/                    # shared library, one file per lecture
```

**Four student-facing types:**
- **Lectures** — one-sitting (15-min demo OR one prework reading). Inlined.
- **Exercises** — one bounded activity per file. Inlined.
- **Supplementaries** — multi-section, progressive across modules. Not inlined.
- **Quick reference** — flat lookup. No progression.

Module files: flat, slug-only filenames, sequence from renderer's MODULES array. Thin: metadata + Bloom LOs + ordered refs + training framing.

## Module file shape

Template + module include + bare-path cross-doc rules → `curriculum/module-shape.md`.

## Figures

Inline SVG diagrams are single-sourced in `curriculum/figures/<key>.md` (one blank-line-free `<figure class="diagram">…</figure>` per file) and referenced from body prose as `{{figure:<key>}}` on its own line — same registry pattern as prompts (`scripts/compile-figures.js` → `site/figures.json`; build expands strict). One drawing, many slides; never paste an SVG inline.

## Widgets

Author-typed widget palette (Session / HOX / Note / Prompt / runtime-fork) + when-to-use + add-a-widget procedure → `curriculum/widgets.md`. Generation-time check → `check_pedagogy.md` §52b.

## Alignment

Strategy and module file change in the same edit. Drift = process bug.

## Copyright fence

**F-Secure delivers their own version. Their materials = F-Secure IPR — off-limits.** All exercises / examples / language original.

## Platform claims

`check_platform_and_boundaries.md` autoloads on platform-claim surface.

1. **Platform claims must be current.** Runtime contracts: `curriculum/trainings/agents-101/training-architecture.md` (CLI + Desktop + Cowork); `curriculum/trainings/agentic-engineering-101/training-architecture.md` (CLI + Desktop today; no Cowork; Gemini CLI planned, §Future TODO).
2. **Skill invocation backed by shipped capability.** Otherwise inline the method.
3. **Delivery architecture training-specific.** Don't encode one training's starter / working-dir / artifact rules here.

## Parallel subagents

Each agent owns a **disjoint set of files**. Two on same file = race. Check overlap before second dispatch. Read-race too: don't Edit a file while a dispatched judge/reader subagent has it in scope — quoted evidence + line numbers bind to the snapshot. Sequence: collect verdicts → edit → re-fire.

## Classroom delivery — default

- **Two layouts.** Curriculum renders long-read (scroll) OR Slides (deck) — reader's toggle; one `##` = one slide. Trainer projects either. Projection legibility = design constraint. → `site/layouts/slides.js`
- **Follow-along.** Trainer demos; room copy-pastes concurrently. Time budget = slower pace, not the sum.
- **Body teaches; trainer manages room.** No mandated performance on cue — a specified utterance, at a scheduled beat, reported back (hard-grep enforced). **The wider ban on acknowledging the room is lifted (2026-08-12, Antti-directed), sparingly:** body may name that other people are there and that talking to them is worth doing. Four tells + a one-line-per-file ceiling in `check_student_facing.md` §2. Do not sweep the corpus adding these.

## Content boundaries

- **Technical depth:** WHY, not the math of HOW.
- **No vendor comparison.** We use Claude Code.
