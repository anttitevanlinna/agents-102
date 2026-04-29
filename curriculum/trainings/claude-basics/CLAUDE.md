# Claude Basics — Training-specific rules

This CLAUDE.md governs the **Claude Basics** training surface: a 3 × 45-minute IT-team Claude rollout training. Strategic spine lives in `bosser-strategy:content-strategy-claude-basics.md`. Universal pedagogy in `curriculum/lecture-guardrails.md`. Universal architecture in `curriculum/CLAUDE.md`. This file names the deliberate exceptions.

## Audience

IT team — 10 to 14 admins, info-management, architects — going from chat-level Claude usage to running an organisational rollout. Medium-to-light chat experience is the primary persona. Plus the organisers as active participant (buyer-as-participant rule, non-negotiable, see strategy doc).

## Runtime — Cowork only

Single runtime. Cowork (the Cowork tab in Claude Desktop, connected to a SharePoint-synced folder). Claude Code is named in passing as the next move; the room never opens it.

**Consequence:** no dual-runtime forks (`<div class="rt-code">` / `<div class="rt-cowork">`) anywhere in claude-basics surfaces. Bootstrap's runtime-fork rules from `memory/check_prompts.md` rule 10 do not fire here. All prompt blocks render in their plain canonical shape.

## Delivery architecture — SharePoint shared folder + personal folders

Third architecture model after Bootstrap (local training-dir + zips) and AE101 (student's real repo). Different from both.

- **One `shared/` folder for cohort materials**, prepared by the organisers before the workshop. This folder holds customer-owned inputs and outputs such as `shared/m1-task.md`, `shared/m2-verification-output.md`, `shared/group-*-verification.md`, `shared/m2-verification-synthesis.md`, `shared/group-N-rollout-synthesis.md`, and `shared/m3-organisers-rollout-readout.md`. Bosser/Codex/Claude never needs to see these customer materials; the public repo only carries the file contract and prompts.
- **One personal folder per participant**, hosted in the same shared SharePoint site, synced to each participant's machine via OneDrive. Working sessions write only into the participant's own folder. Participants read from `shared/` and write to their own folder unless explicitly acting as a nominated group driver.
- **The participant CLAUDE.md tells Cowork it is on OneDrive.** Every working CLAUDE.md a participant writes opens with a runtime-naming line: *"You are working in a OneDrive-synced folder. File writes propagate across the team via OneDrive sync; assume eventual consistency on cross-folder reads."* During the workshop, prompts explicitly read the participant's CLAUDE.md from their folder. After the workshop, opening that folder directly makes it the folder rules file. Cowork handles sync semantics natively when it knows; the failures happen when an agent assumes a local POSIX filesystem and is surprised by sync.
- **Module 3 uses nominated drivers, not everyone switching folders.** Most participants keep working in their personal folders. Each group nominates one driver to write the group's rollout synthesis into `shared/`; organisers may optionally write a readout after group files exist.
- **Post-training legacy** — the SharePoint structure survives the day. The team takes their working systems, hardened CLAUDE.md files, group syntheses, and optional organisers' readout back to their daily work.

The classic *"don't put your training-dir in OneDrive"* warning from Bootstrap does not apply here: in Claude Basics, the OneDrive substrate IS the architecture, and the folder CLAUDE.md is what makes it work.

## Remote-resilient delivery contract

Claude Basics may run with organisers remote. The customer-side runtime must therefore be proven before the workshop, not debugged live.

- **Local ownership:** the organisers own content and room mechanics. Organisers help participants find folders, confirm sync, and keep the session moving while facilitation happens remotely.
- **Hard preflight:** before the workshop, the organisers prove that every participant can sync/open their personal folder, start Cowork on it, read a file from `shared/`, and save a test `.md` file in their own folder. If this fails, the workshop does not start as designed.
- **Customer privacy by design:** all real customer material lives only in the customer's SharePoint/Cowork environment. The public curriculum names paths and artifact shapes, never customer content. Bosser tooling must not ingest customer files for this workshop.
- **Pre-staged shared materials:** `shared/m1-task.md` and `shared/m2-verification-output.md` are prepared and tested by the organisers before the session. M3 starts fresh from participant interviews. Live improvisation is allowed as narration, not as a dependency.
- **Shared writes are limited:** participants write to personal folders. Group and cohort-level files in `shared/` are written only by nominated group drivers or the organisers.

## File location — shared library (renderer-mandated)

Per `curriculum/CLAUDE.md` § *Directory Structure*: one canonical file per exercise or lecture in the shared library, reused by slug across trainings.

- **Exercises** at `curriculum/exercises/<slug>.md`
- **Lectures** at `curriculum/lectures/<slug>.md`

The renderer's `rewriteCrossDocLinks` regex normalizes bare paths like `[Exercise: title](exercises/<slug>.md)` to the shared library at render time. Training-scoped paths (e.g., `curriculum/trainings/claude-basics/exercises/`) don't render — the SPA looks for files at the shared location only. The original 2026-04-27 plan tried to keep claude-basics exercises training-scoped to prevent cross-training reuse; the renderer's path normalization made that infeasible without renderer changes. Reverted 2026-04-28.

Slug-naming discipline prevents accidental cross-training reuse: claude-basics exercise slugs (`build-your-system`, `the-it-directors-prompt`, `find-the-crux`) are deliberately specific enough that another training authoring an exercise wouldn't pick the same slug. If a future training wants the same exercise, the design conversation happens explicitly, not by accidental file-reuse.

## Language — English

English is the canonical curriculum language for claude-basics, matching Bootstrap and AE101. The first cohort (`ium`) ships with a Finnish-delivery overlay — notes for organisers, in-room language, and email comms in Finnish. The English module files stay the source of truth; the FI overlay lives in the cohort-private surface (`site/clients/<slug>/`), not in `curriculum/`.

## Module list

1. `stop-chatting-build-a-system.md` — Big idea: with a CLAUDE.md and a real task, you build a system in 45 minutes. Mood: confident creation.
2. `can-you-be-trusted-to-run-this.md` — Big idea: trust is a checking system you can run on plausible output. Mood: sober alert.
3. `where-is-this-all-going.md` — Big idea: the hard part is finding the rollout crux. Mood: expanded horizon.

Slug filenames only, no `module-N-` prefix (per `curriculum/CLAUDE.md`).

## Content boundaries — claude-basics specific

- **No magic-beat menu** like Bootstrap. Claude Basics promises one well-placed *"oh, that's what this is"* moment, in Module 3, when the room realises after the fact that they built a multi-agent system.
- **No agentic walk-away exercises** in Module 1 or Module 2. The training builds agentic awareness; the participant doesn't yet author multi-step autonomous workflows. Walk-away is named in Module 3, lived sketchily by the organisers during the break, and pointed at as the next move.
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
