# Codex Loader for Agents 102

This repository is primarily a Claude Code project. For Codex sessions, treat this file as the auto-loaded shim that points you to the canonical Claude instructions.

## Load Order

At session start, read:

1. `CLAUDE.md` at the repository root.
2. `memory/self-review-protocol.md` section `Core heuristics`, if present. If the repo-local file is absent, look for the same file in the private per-project Claude memory directory named by `.claude/rules/content-rules.md` (for this repo: `~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/self-review-protocol.md`). If neither exists, note the missing file and continue with the other loaded rules.
3. The nearest work-area `CLAUDE.md` for the files you will touch:
   - `continuous-research/CLAUDE.md` for research, OODA cycles, findings, synthesis, observations, source rosters, and user-signal capture.
   - `curriculum/CLAUDE.md` for curriculum, exercises, lectures, training modules, scaffolds, evals, and site curriculum rendering.
   - `curriculum/trainings/claude-basics/CLAUDE.md` when working specifically inside the Claude Basics training.

If an instruction here conflicts with a `CLAUDE.md`, the `CLAUDE.md` is the project source of truth unless the active Codex system/developer instructions require otherwise.

## Content Creation Skill

Most curriculum/content editing in this repo is governed by the Claude `content-creation` skill. Codex does not automatically invoke Claude skills, so mimic it manually.

Before writing, revising, or reviewing curriculum content, read the full `.claude/skills/content-creation/SKILL.md`. Then follow its firing-moment router:

- Prompt blocks students copy: also read `.claude/skills/content-creation/prompts.md`.
- Student-facing prose, structure, voice, or body copy: also read `.claude/skills/content-creation/writing.md`.
- Simulation, testing, or PDCA Test/Check work: also read `.claude/skills/content-creation/simulation.md`.
- Any student-, buyer-, or external-facing prose: read `.claude/rules/content-rules.md` and the matching `check_*.md` compendiums before drafting. Use the exact compendium directory named inside `.claude/rules/content-rules.md`; in current Codex checkouts this may be a private per-project Claude memory path rather than repo-local `memory/`.

The `content-creation` skill requires the private `bosser-strategy` skill for generation work. If `~/.claude/skills/bosser-strategy/SKILL.md` is absent, do not generate curriculum; explain that the strategic context is missing. If present, use it to resolve `bosser-strategy:<filename>` references on demand.

For Claude Basics specifically, resolve and read `bosser-strategy:content-strategy-claude-basics.md` before generating or reshaping module, exercise, lecture, prompt, or cohort-facing prose. Do not fall back to the Agents 101 strategy doc for Claude Basics work.

## Working Rule

Mimic Claude Code's project-loading behavior: before editing a path, check whether that path has a closer `CLAUDE.md` and read it. Keep the root `CLAUDE.md` in force for strategy, copyright, multi-user hygiene, subagent rule injection, orchestration, and self-review.

## Agents 101 Orientation

Agents 101 lives at `curriculum/trainings/agents-101/`. Its governing rules are in `curriculum/CLAUDE.md`; the module sequence is defined in `site/layouts/curriculum.js`; shared exercises and lectures live under `curriculum/exercises/` and `curriculum/lectures/`.

Important Agents 101 invariants:

- Agents 101 is a compounding working-directory training, not a collection of standalone readings.
- Module 1 begins deliberately empty and creates scoped rules inside `module-1/`.
- Module 2 creates the training-root `CLAUDE.md` from session evidence; do not ship a prewritten root `CLAUDE.md` in scaffolds.
- Module 2 onward compounds through `memory/`, `sources/`, `agents/`, `outputs/`, `guardrails.md`, `judges/`, and per-module folders.
- Exercises and lectures are canonical shared files; module files include them by standalone links such as `[Exercise: ...](exercises/<slug>.md)`.

When asked to work on Agents 101, read `curriculum/CLAUDE.md` first, then the relevant module, exercise, lecture, scaffold, or eval file.
