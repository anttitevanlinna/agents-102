# Claude Basics — Training-specific rules

This CLAUDE.md governs the **Claude Basics** training surface: a 3 × 45-minute IT-team Claude rollout training. Strategic spine lives in `bosser-strategy:content-strategy-claude-basics.md`. Universal pedagogy in `curriculum/lecture-guardrails.md`. Universal architecture in `curriculum/CLAUDE.md`. This file names the deliberate exceptions.

## Audience

IT team — 10 to 14 admins, info-management, architects — going from chat-level Claude usage to running an organisational rollout. Medium-to-light chat experience is the primary persona. Plus the IT Director as active participant (buyer-as-participant rule, non-negotiable, see strategy doc).

## Runtime — Cowork only

Single runtime. Cowork (the Cowork tab in Claude Desktop, connected to a SharePoint-synced folder). Claude Code is named in passing as the next move; the room never opens it.

**Consequence:** no dual-runtime forks (`<div class="rt-code">` / `<div class="rt-cowork">`) anywhere in claude-basics surfaces. Bootstrap's runtime-fork rules from `memory/check_prompts.md` rule 10 do not fire here. All prompt blocks render in their plain canonical shape.

## Delivery architecture — SharePoint personal folders + OneDrive sync

Third architecture model after Bootstrap (local training-dir + zips) and AE101 (student's real repo). Different from both.

- **One personal folder per participant**, hosted in a shared SharePoint site, synced to each participant's machine via OneDrive. Working sessions write only into the participant's own folder. No two agents touch the same file at the same time.
- **The folder CLAUDE.md tells Cowork it is on OneDrive.** Every working CLAUDE.md a participant writes opens with a runtime-naming line: *"You are working in a OneDrive-synced folder. File writes propagate across the team via OneDrive sync; assume eventual consistency on cross-folder reads."* Cowork handles sync semantics natively when it knows; the failures happen when an agent assumes a local POSIX filesystem and is surprised by sync.
- **Group folders surface at Module 3** for the multi-agent group exercise. Each group's agent reads from group members' personal folders (read-only) and writes a group synthesis file into the group folder. The IT Director's session reads across all group folders.
- **Post-training legacy** — the SharePoint structure survives the day. The team takes their working systems, hardened CLAUDE.md files, and the IT Director's rollout strategy back to their daily work.

The classic *"don't put your training-dir in OneDrive"* warning from Bootstrap does not apply here: in Claude Basics, the OneDrive substrate IS the architecture, and the folder CLAUDE.md is what makes it work.

## File location — shared library (renderer-mandated)

Per `curriculum/CLAUDE.md` § *Directory Structure*: one canonical file per exercise or lecture in the shared library, reused by slug across trainings.

- **Exercises** at `curriculum/exercises/<slug>.md`
- **Lectures** at `curriculum/lectures/<slug>.md`

The renderer's `rewriteCrossDocLinks` regex normalizes bare paths like `[Exercise: title](exercises/<slug>.md)` to the shared library at render time. Training-scoped paths (e.g., `curriculum/trainings/claude-basics/exercises/`) don't render — the SPA looks for files at the shared location only. The original 2026-04-27 plan tried to keep claude-basics exercises training-scoped to prevent cross-training reuse; the renderer's path normalization made that infeasible without renderer changes. Reverted 2026-04-28.

Slug-naming discipline prevents accidental cross-training reuse: claude-basics exercise slugs (`build-your-system`, `the-it-directors-prompt`, `find-the-crux`) are deliberately specific enough that another training authoring an exercise wouldn't pick the same slug. If a future training wants the same exercise, the design conversation happens explicitly, not by accidental file-reuse.

## Language — English

English is the canonical curriculum language for claude-basics, matching Bootstrap and AE101. The first cohort (`ium`) ships with a Finnish-delivery overlay — trainer notes, in-room language, and email comms in Finnish. The English module files stay the source of truth; the FI overlay lives in the cohort-private surface (`site/clients/<slug>/`), not in `curriculum/`.

## Module list

1. `stop-chatting-build-a-system.md` — Big idea: with a CLAUDE.md and a real task, you build a system in 45 minutes. Mood: confident creation.
2. `can-you-be-trusted-to-run-this.md` — TODO. Mood: sober alert.
3. `where-is-this-all-going.md` — TODO. Mood: expanded horizon.

Slug filenames only, no `module-N-` prefix (per `curriculum/CLAUDE.md`).

## Content boundaries — claude-basics specific

- **No magic-beat menu** like Bootstrap. Claude Basics promises one well-placed *"oh, that's what this is"* moment, in Module 3, when the room realises after the fact that they built a multi-agent system.
- **No agentic walk-away exercises** in Module 1 or Module 2. The training builds agentic awareness; the participant doesn't yet author multi-step autonomous workflows. Walk-away is named in Module 3, lived sketchily by the IT Director during the break, and pointed at as the next move.
- **Practitioner weaving stays light.** None in Module 1. Modules 2 and 3 may name one practitioner each, max — the audience is chat-level, not builder-leader; performative authority lands wrong.
- **Plain prompt files, not installed skills.** Claude Basics ships authored moves as plain `.md` files at `curriculum/trainings/claude-basics/prompts/` — the participant pastes them or asks Claude to read them. No installed skills (Claude Code's `~/.claude/skills/`, Cowork's plugin loader). The IT-team audience is chat-level; install-affordance machinery is overkill on Day 1 and adds the wrong kind of friction. The four moves the original skeleton named as skills (`prework-tour`, `morning-planner`, `module3-divergence`, `module3-synthesizer`) become plain prompt files. Skills-as-concept lands in Bootstrap Module 4, not here.

## Eval template

Reuses `curriculum/evals/exercise.md`. The leap test gets steered for the IT-team / chat-level audience inside each filled instance. Instances live at `curriculum/evals/instances/claude-basics--<slug>.md`.

## Reference

- `bosser-strategy:content-strategy-claude-basics.md` — strategic spine, mood arc, per-module Big Idea + Mood (deliberate)
- `bosser-strategy:content-strategy.md` (Bootstrap) — sibling for format reference
- `curriculum/CLAUDE.md` — universal architecture
- `curriculum/lecture-guardrails.md` — universal pedagogy
- `~/Projects/claude-basics/` — original skeleton, retained until migration completes
