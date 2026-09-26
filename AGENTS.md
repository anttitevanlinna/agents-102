# Codex Loader for Agents 102

This repository is primarily a Claude Code project. For Codex sessions, treat this file as the auto-loaded shim that points you to the canonical Claude instructions.

## Private Core Resolution

Resolve the private core repository once at session start: use `$AGENTS_CORE_DIR` when it is set; otherwise use the sibling checkout `../agents-102-core`. References to `<core>` below mean that resolved directory. Do not fall back to maintainer-specific paths under `~/.claude`.

## Load Order

At session start, read:

1. `CLAUDE.md` at the repository root.
2. `<core>/memory/self-review-protocol.md` section `Core heuristics`, if present. If the core repository or file is unavailable, note it and continue with the other loaded rules.
3. The nearest work-area `CLAUDE.md` for the files you will touch:
   - `continuous-research/CLAUDE.md` for research, OODA cycles, findings, synthesis, observations, source rosters, and user-signal capture.
   - `curriculum/CLAUDE.md` for curriculum, exercises, lectures, training modules, scaffolds, evals, and site curriculum rendering.
   - `curriculum/trainings/claude-basics/CLAUDE.md` when working specifically inside the Claude Basics training.

If an instruction here conflicts with a `CLAUDE.md`, the `CLAUDE.md` is the project source of truth unless the active Codex system/developer instructions require otherwise.

## Content Creation Rules

Claude loads content rules through hooks; Codex does not, so reproduce the current tiered loading protocol manually. Before writing, revising, reviewing, or advising on curriculum or other prose:

1. Read `.claude/rules/content-rules.md` and follow its current surface mapping.
2. Read `<core>/memory/_index/diamond.md` (T0) at session start.
3. Read each applicable `<core>/memory/_index/<surface>.leads.md` file (T1) before acting on that surface. Multiple surfaces can apply to one file.
4. For every applicable lead marked `⚠`, read that rule's full body (T2) with `node curriculum/evals/scripts/rule.js <surface> <N>` before acting.
5. Read a full `<core>/memory/check_<surface>.md` compendium (T3) only when acting as an eval judge or editing rules. Do not bulk-load T3 to generate prose.

Prompt blocks, student-facing prose, lectures, strategy tie-ins, research claims, slides, buyer-facing copy, pedagogy, workshops, and platform/IP claims each activate the surfaces mapped in `.claude/rules/content-rules.md`. Simulation, testing, or PDCA Test/Check work also requires `curriculum/evals/simulation.md`.

When editing any fenced prompt block that students copy, run a final prompt-shape pass before answering. Check at minimum: no placeholders inside the fence; any student-supplied input uses the open-hook pattern with the colon line last; file paths match the student's working folder; save/read artifacts are coherent for downstream phases; the prompt starts from the normal LLM work request before adding orchestration. Do this even if the relevant rule was just loaded into context.

When asked for a session retro, do not leave it as chat-only reflection. Select the one improvement that should change future behavior, persist it in the appropriate rule or memory surface, and report the path where it was saved.

Generation work requires the private `bosser-strategy` skill. Read its instructions from the tracked project link `.claude/skills/bosser-strategy/SKILL.md`; if that link is unavailable because core is in a custom location, read `<core>/skills/bosser-strategy/SKILL.md` directly. If neither is readable, do not generate curriculum; explain that the private core or strategic context is missing. Never require or fall back to `~/.claude/skills`. Use the skill to resolve `bosser-strategy:<filename>` references on demand.

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
