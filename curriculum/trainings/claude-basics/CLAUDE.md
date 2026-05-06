# Claude Basics, Training-specific rules

This CLAUDE.md governs the **Claude Basics** training surface: a 3-hour Claude rollout training. Strategic spine lives in `bosser-strategy:content-strategy-claude-basics.md`. Universal pedagogy in `curriculum/lecture-guardrails.md`. Universal architecture in `curriculum/CLAUDE.md`. This file names the deliberate exceptions.

## Audience

People asked to help their organisation make Claude useful, safe, and repeatable: admins, information-management people, architects, enablement leads, team leads, and other rollout custodians. Medium-to-light chat experience is the primary persona. The lead customer cohort is IT-heavy, but student-facing language stays general so the asset travels beyond that first buyer. Plus the organisers as active participant (buyer-as-participant rule, non-negotiable, see strategy doc).

## Runtime, Cowork only

Single participant runtime. Cowork is where participants run the live crux exercise and the homework. Claude Code appears only in the trainer's agentic system demo as the next-level system surface; participants do not open it.

**Consequence:** no dual-runtime forks (`<div class="rt-code">` / `<div class="rt-cowork">`) anywhere in claude-basics surfaces. Agents 101's runtime-fork rules from `memory/check_prompts.md` rule 10 do not fire here. All prompt blocks render in their plain canonical shape.

## Delivery architecture, live synthesis + personal homework

Third architecture model after Agents 101 (local training-dir + zips) and AE101 (student's real repo). Different from both.

- **Live session starts with the agentic system demo.** The trainer shows the agents-102 repo and deployed workbook as the concrete system. This is not a participant runtime requirement.
- **Live crux work needs only narrow shared writes.** Participants save rollout notes in their own first-name folders in the live workshop SharePoint folder. Each group has one driver who writes one rollout synthesis file into `shared/`. Organisers may optionally write `shared/organisers-rollout-readout.md` after group files exist.
- **Homework happens in local folders.** Build-your-system and verification homework run after the live session in an empty local folder on the participant's computer. No cohort `shared/`, no `participants/`, no group-driver dependency.
- **CLAUDE.md stays focused on the work.** Homework folders do not need runtime or sync rules.
- **Post-training legacy**, the group rollout syntheses, optional organisers' readout, and personal homework systems are reusable inputs for daily work. Do not promise a fixed post-training cadence unless that cadence has been contracted for the cohort.

Claude Basics homework uses a normal local folder.

## Default room format, 10-person IT cohort

For an IT-heavy cohort of about 10 people who already know chat and are now taking on Cowork, the live session needs a stronger operating model than the module list alone.

- **Three groups by default:** 3 / 3 / 4. Each group needs one Cowork-confident driver. For a room new to Cowork, organisers identify drivers before the workshop instead of letting the room discover access gaps live.
- **Three-hour live shape:** agentic system demo, 10-minute break, short Cowork threshold check, 60-minute rollout-crux work, 15-minute break, group readout, trainer homework launch, organiser close. The build-and-verify exercises remain homework.
- **Cowork threshold check:** before the crux exercise, every participant confirms they can open the SharePoint workshop folder root that was synced with OneDrive before the workshop and see their first-name folder. If one or two people cannot, pair them with someone who can for Phase 1 so their notes still enter the exercise. Keep the room moving; access can be fixed at the break or after the workshop.
- **Agentic system demo translation rule:** every demo stop must translate back to the participant's Cowork world: rules file, prompt file, saved output, check, repeatable folder. No code-tour digressions.
- **Customer-side operation:** customer organisers operate SharePoint/Cowork. The trainer operates the Bosser agentic system demo and public workbook only.

## Remote-resilient delivery contract

Claude Basics may run with organisers remote. The live synthesis path must therefore be proven before the workshop, not debugged live.

- **Local ownership:** the organisers own content and room mechanics. Organisers make sure the workshop folder has synced with OneDrive before the workshop, help participants find folders, and keep the session moving while facilitation happens remotely.
- **Required test before the workshop:** organisers prove that the workshop folder is synced with OneDrive, the group-driver path can save to `shared/`, and organisers can read those files for the optional readout. If this fails, the workshop does not start as designed.
- **Customer privacy by design:** all real customer material lives only in the customer's SharePoint/Cowork environment. The public curriculum names paths and artifact shapes, never customer content. Bosser tooling must not ingest customer files for this workshop.
- **Bosser machine boundary:** the trainer's computer may show the Bosser repo, public workbook, and demo build output. It must not connect to the customer's SharePoint workspace, Cowork folders, or real workshop files. Customer organisers prove and operate the customer-side workspace.
- **No live M1/M2 shared materials:** `m1-task.md`, `m2-verification-output.md`, group verification files, and answer keys are no longer live-session dependencies. The build-and-verify path is homework.
- **Shared writes are limited:** group-level files are written only by group drivers or the organisers.

## File location, shared library (renderer-mandated)

Per `curriculum/CLAUDE.md` § *Directory Structure*: one canonical file per exercise or lecture in the shared library, reused by slug across trainings.

- **Exercises** at `curriculum/exercises/<slug>.md`
- **Lectures** at `curriculum/lectures/<slug>.md`

The renderer's `rewriteCrossDocLinks` regex normalizes bare paths like `[Exercise: title](exercises/<slug>.md)` to the shared library at render time. Training-scoped paths (e.g., `curriculum/trainings/claude-basics/exercises/`) don't render, the SPA looks for files at the shared location only. The original 2026-04-27 plan tried to keep claude-basics exercises training-scoped to prevent cross-training reuse; the renderer's path normalization made that infeasible without renderer changes. Reverted 2026-04-28.

Slug-naming discipline prevents accidental cross-training reuse: claude-basics exercise slugs (`build-your-system`, `find-the-wrong-claims`, `find-the-crux`) are deliberately specific enough that another training authoring an exercise wouldn't pick the same slug. If a future training wants the same exercise, the design conversation happens explicitly, not by accidental file-reuse.

## Language, English

English is the canonical curriculum language for claude-basics, matching Agents 101 and AE101. The first cohort (`ium`) ships with a Finnish-delivery overlay, notes for organisers, in-room language, and email comms in Finnish. The English module files stay the source of truth; the FI overlay lives in the cohort-private surface (`site/clients/<slug>/`), not in `curriculum/`.

## Module list

1. `agentic-systems-repo-demo.md`, Big idea: agentic systems are visible when you know where to look. Mood: concrete awe.
2. `where-is-this-all-going.md`, Big idea: the hard part is finding the rollout crux. Mood: expanded horizon.
3. `homework-build-and-verify.md`, Big idea: live shape becomes personal muscle memory through homework. Mood: capable next step.
4. `organisers-run-the-workshop.md`, Big idea: organiser setup and synthesis stay in the customer workbook but outside the participant flow. Mood: operational clarity.

Slug filenames only, no `module-N-` prefix (per `curriculum/CLAUDE.md`).

## Content boundaries, claude-basics specific

- **No magic-beat menu** like Agents 101. Claude Basics promises one well-placed *"oh, that's what this is"* moment, in the live crux exercise, when the room realises after the fact that it ran a useful divergence-to-synthesis system.
- **No agentic walk-away exercises** in the live room. The training builds agentic awareness; the participant doesn't yet author multi-step autonomous workflows. Personal build-and-verify happens as homework.
- **Practitioner weaving stays light.** Module 2 may name one practitioner max, the audience is chat-level, not builder-leader; performative authority lands wrong.
- **Inlined prompts, no installed skills.** Claude Basics ships authored moves inlined directly inside the exercise files (`## Prompt` fenced blocks the participant copies). No installed skills (Claude Code's `~/.claude/skills/`, Cowork's plugin loader), no separate `prompts/` directory. This rollout-custodian audience is chat-level; install-affordance machinery is overkill on Day 1 and adds the wrong kind of friction. Skills-as-concept lands in Agents 101 Module 4, not here.

## Eval template

Reuses `curriculum/evals/exercise.md`. The leap test gets steered for the rollout-custodian / chat-level audience inside each filled instance. Instances live at `curriculum/evals/instances/claude-basics--<slug>.md`.

## Reference

- `bosser-strategy:content-strategy-claude-basics.md`, strategic spine, mood arc, per-module Big Idea + Mood (deliberate)
- `bosser-strategy:content-strategy.md` (Agents 101), sibling for format reference
- `curriculum/CLAUDE.md`, universal architecture
- `curriculum/lecture-guardrails.md`, universal pedagogy
- `~/Projects/claude-basics/`, original skeleton, retained until migration completes
