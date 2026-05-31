# Curriculum Production

- **Generation** (three-pass, PDCA, prompt + exercise design, simulation): `.claude/skills/content-creation/SKILL.md` via `/content-creation`.
- **Pedagogy** (Bloom, 4 Cs, audience, throughlines): `curriculum/lecture-guardrails.md`.
- **Long-running generation** (plan → walk away → return): `curriculum/module-design-long-running-strategy.md`.

State of play → `bosser-strategy:content-strategy.md` § *State of play*.

## Active focus

**AE101 M1–M3 to done-done first. Then M4–M6.**

"Done-done" = Quality at `cohort-tested` / `battle-tested`, six per-class SHAs current, maintainer-reviewed, trainer-guide present, no open audit TODOs in `pre-cohort-todos.md` for that module.

Don't start M4 substantive work while M1–M3 has open REVISE or grandfathered pins. Cosmetic cross-module edits on M4–M6 fine; new exercises / prompts / lectures wait.

## Quality

Every student-facing artifact carries a Quality line. Ladder: `draft` → `compendium-audited` → `sim-passed` → `mechanical-tested` → `cohort-tested` → `battle-tested`. Orthogonal axis: `maintainer-reviewed`. Six per-class SHAs + cross_module row. Auto-degrade is touch-based, per-class.

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

Each agent owns a **disjoint set of files**. Two on same file = race. Check overlap before second dispatch.

## Classroom delivery — default

- **No slides.** Curriculum site IS the slide; trainer projects it. Projection legibility = design constraint.
- **Follow-along.** Trainer demos; room copy-pastes concurrently. Time budget = slower pace, not the sum.
- **Body teaches; trainer manages room.** No authored conversations or trainer cues in body (hard-grep enforced).

## Content boundaries

- **Technical depth:** WHY, not the math of HOW.
- **No vendor comparison.** We use Claude Code.
