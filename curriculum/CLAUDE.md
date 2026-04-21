# Curriculum Production

This CLAUDE.md governs curriculum work.

**Pointers:**
- **For generation** (three-pass build, PDCA 8-step loop, content development rules, prompt design rules, exercise design rules, philosophy callout rules, plug point syntax, simulation protocol): see `.claude/skills/content-creation/SKILL.md` — invoked via the `/content-creation` skill. Subagents and anyone writing content must read it first.
- **For pedagogy** (Bloom's taxonomy, 4 Cs, emergent knowledge/control/leadership, audience, throughlines, teaching principles): see `curriculum/lecture-guardrails.md`. Read before writing any module.
- **For long-running generation sessions** (plan → walk away → return pattern, applied to generating lectures and exercises): see `curriculum/module-design-long-running-strategy.md`. Use when Antti wants to hand off a full lecture or exercise generation rather than iterate in small turns. The file compounds — every long-running session closes with a Compound step that rewrites its rules.

Current state of what's built vs. what's next lives in `content-strategy.md` → "State of play" section (refreshed at the end of every significant session).

## Scope

**A portfolio of 3-4 trainings.** Bootstrap is the first (for builder leaders making the chat-to-systems leap). Engineering Management is the second (for engineering managers leading agentic change; strategy in `content-strategy-engineering-management.md`). Agentic Engineering 101 is the third (for software engineer ICs, L0 → L3 path; strategy in `content-strategy-agentic-engineering-101.md`). Executive briefing and domain-specific variants will follow. The Engineering Management + Agentic Engineering 101 pair pincer the transformation — managers create conditions, engineers run at capacity. Lectures and exercises are **shareable building blocks** — a single canonical file per exercise or lecture, referenced from whichever trainings use it.

**Source of truth:** `content-strategy.md` defines the Bootstrap arc, storyline, and learning goals. `lecture-guardrails.md` defines pedagogical and design rules (universal across trainings). Module files are compositions that reference the shared library.

See `## Copyright fence` below before importing anything from external training materials.

## Directory Structure

```
curriculum/
  content-strategy.md          # Bootstrap arc + storyline (currently Bootstrap-specific)
  lecture-guardrails.md        # universal pedagogy rules
  CLAUDE.md                    # this file

  trainings/
    bootstrap/                 # Training variant #1 (this is the first)
      getting-going.md         # slug-only filenames — sequence comes from the renderer, not the filename
      building-agent-systems.md
      multi-agent-systems.md
      ...
    engineering-management/    # FUTURE — strategy in content-strategy-engineering-management.md
    agentic-engineering-101/   # FUTURE — strategy in content-strategy-agentic-engineering-101.md
    executive-briefing/        # FUTURE

  exercises/                   # Shared library — one file per exercise
    raw-llm.md
    add-guardrail.md
    build-llm-memory.md
    ...

  lectures/                    # Shared library — one file per lecture
    context-is-king.md
    compounding.md
    why-llms-fabricate.md
    ...

  supplementary/               # Reference documents that build up progressively across modules
    what-is-an-agent.md
    building-guardrails.md
    learning-and-compounding-systems.md
    ...
```

**Four student-facing content types** — lectures, exercises, supplementaries, and quick reference:

- **Lectures:** one-sitting events (15-min demo OR one prework reading). Included inline in module pages.
- **Exercises:** one bounded activity per file. Included inline in module pages.
- **Supplementaries:** multi-section documents that build up progressively across modules. Pedagogical. Too complex to absorb in one sitting. NOT inlined — referenced by modules as prework or homework, stand as reference after training. See `supplementary/README.md`.
- **Quick reference:** flat lookup material (commands, connector setup, skill basics, troubleshooting). No progression. Curriculum content stays concept-focused; links here when a student needs an operational "how do I..." answer. See `reference/README.md`.

**One file per module.** Flat — no per-module subdirectories. **Filenames are slugs only** (no `module-N-` prefix). Sequence comes from the renderer's MODULES array, not from filenames — so modules can be reordered by moving one array entry. A module file is thin: metadata + Bloom-tagged LOs + ordered references to exercises and lectures + training-specific framing (Connections, Conclusions, Bridge).

**One file per exercise or lecture.** Canonical. Reused by slug across trainings.

## Module File Shape

```markdown
# [Title]

## Big Idea
[One sentence]

## Meta
- Primary Bloom's level: [level]
- Prework: [list or "none"]
- Homework: [list or "none"]
- Materials (trainer): [list]
- Plug points: [list]

## What You'll Learn
After this module, you will be able to:
- **[verb]** [thing]

## Connections
[Training-specific opening question — audience-specific framing lives here]

## Lectures

[Lecture: Context is King](lectures/context-is-king.md)

## Exercises

[Exercise: Raw LLM](exercises/raw-llm.md)

[Exercise: Add the guardrail](exercises/add-guardrail.md)

## Key Concepts (Emergent)
[What emerges from doing the exercises. Concepts don't precede exercises.]

## Plug Points
[Where the organization inserts its own context]

## Debrief
[The 4th C — Conclusions. Pattern: ~5-minute personal retro run WITH Claude via a pasted prompt. Three questions: what went well, what was tedious, how to store learnings as guardrails. Produces an artifact — a reusable guardrails file the student carries forward. Student-facing, conversational-prompt style. See `trainings/bootstrap/getting-going.md` for the reference pattern. Per-module adaptation: the three questions shift to the module's discipline (e.g., Module 4 "what should be a skill" instead of "what should be a guardrail").]

## Bridge
[One sentence to next module]
```

## How Modules Reference Exercises and Lectures

A module includes an exercise or lecture with a **standalone markdown link** whose href matches `exercises/<slug>.md` or `lectures/<slug>.md`:

```markdown
[Exercise: Raw LLM](exercises/raw-llm.md)
```

Requirements for the renderer to inline it:
- The link is the **entire paragraph** — on its own line, no surrounding prose
- Href is exactly `exercises/<slug>.md` or `lectures/<slug>.md` (kebab-case slug, no subdirs)
- The target file exists

If the file is missing, the link renders as-is. This means Pass 1 module files can reference future Pass 2 exercise files without breaking.

## Alignment duties

**`content-strategy.md` and module files stay aligned — always.** `content-strategy.md` carries the training-level narrative (Connections, Exercise, Lecture, Reflection, Bridge per module). The module files in `trainings/bootstrap/` carry the canonical spine. **The exercise named in each module section of content-strategy.md must match the exercise in the corresponding module file** — same name, same description. When one changes, the other changes in the same edit. Drift between the two is a process bug, not a matter of taste.

## Copyright fence

**F-Secure delivers their own version of this training. Their materials are F-Secure IPR — off-limits for import, reconciliation, or paraphrase.** All exercises, examples, and instructional language must be original.

## Working with actual Claude Code behavior

Curriculum content describes a real tool that ships on a real cadence. Getting the tool's current behavior wrong is the fastest way to erode trust with a business audience — an SVP who follows the exercise word-for-word and hits a different UI than we described is done listening.

**Rules, enforced on every content pass:**

1. **Verify capabilities BEFORE drafting, not after.** Invoke the `claude-code-guide` agent with specific questions — feature name, GUI click-path in the desktop app, MCP dependencies, Git assumptions for cloud variants, current-as-of-date — before the first draft. Training-data memory of Claude Code goes stale within months; features land mid-year. Do not write from memory of how the tool worked six months ago.

2. **Silence from a lookup isn't absence.** When a check-agent says "I couldn't find this" or "X is not native," press further: *"Did you check specific slash-commands / settings sections / sidebar options, or just search?"* The first capability check of this session missed `/loop` and `/schedule` entirely; the second missed the scheduled-task catch-up behavior. Absence claims need active confirmation, not inferred-from-silence.

3. **Practitioner observation beats docs-based lookup.** When Antti says "I see X happen when I use the product," that's ground truth. Update the material to match; the docs may lag or the lookup may be out-of-date.

4. **Training platform = Claude Code desktop (current) + Cowork (future).** Not Claude.ai (chat). If an exercise draft names `claude.ai` as the place to do the work, or leans on Claude.ai-only features (e.g., the chat-app connector panel, the chat-app schedule UI), it's wrong and must be revised. Describe Claude Code surfaces: the **+** button next to the prompt, **Settings → Connectors**, the **Schedule** sidebar, `/loop`, plan mode via the prompt (*"Enable plan mode"*), the desktop mode dropdown, or Shift+Tab cycle.

5. **Cloud/remote features carry a Git dependency — out of scope.** Remote tasks (Routines) run in Anthropic's cloud, but the runner needs a cloud source for the working directory — typically a cloud Git repo. Our training uses a local training directory (the default path lives in `.claude/skills/self-study/SKILL.md` — source of truth). State cloud features exist; do not present them as a realistic upgrade path inside a business-audience exercise.

6. **When the exercise depends on a tool feature that behaves differently than expected, update the curriculum — not the student's workaround.** If a scheduled task catches up on wake (rather than silently skipping), that's a better teaching moment than a caveat. Write the actual behavior; the student doesn't need to know what we used to think was true.

7. **Skill invocation — inline unless the skill is shipped with this module.** A curriculum artifact that invokes a skill by name (e.g., *"apply the crux skill to my challenge"*) requires the student's Claude Code to have that skill installed — otherwise it dies silently. Rule: inline the skill's move unless the same module's scaffold ships the skill. Module 2's Debrief inlines the crux move + names Rumelt directly; Module 7's scaffold ships the `crux`, `assumption-test`, and `pre-mortem` skills, invoked by name during the sharing exercise; Module 8 re-invokes them at room scale on the strategy problem (already installed). The named-invocation reveal — "that move you did in Module 2 was a skill all along" — lands in Module 7, not out of the blue in Module 8.

If you're about to write a sentence like "Claude Code doesn't have X" or "you'll need to use a different tool for Y," stop and run the capability check first. Those are exactly the sentences that turn out wrong.

## Orchestrator pattern — disjoint file ownership

When dispatching parallel subagents for curriculum work (implementation, not research), follow the orchestrator pattern in the project CLAUDE.md with one addition: **each subagent owns a disjoint set of files.** Two agents editing the same file race and overwrite. Before the second dispatch, check what the first batch is still working on and what it has already completed — if overlap exists, either wait for completion or narrow the second batch's scope. Use `TaskStop` when you catch yourself dispatching duplicate work.

File-ownership examples from a Module 2 pivot:
- Subagent 1: main exercise file + eval instance (exercise-only)
- Subagent 2: prework + scaffold READMEs + scaffold CLAUDE.md (scaffold-only)
- Subagent 3: module file (module-file-only)
- Subagent 4: Module 8 skills + Module 8 module file (Module 8-only)
- Subagent 5 (after 1-4): Module 3, Module 7, content-strategy alignment (ripple-only)

The shape: each agent's spec names every file it will touch; no two specs overlap.

## Material Distribution

How participants receive and work with training material (site + local files). Design rules for any module that ships a scaffold.

**The shapes:**

1. **Site** (curriculum content) — password-protected static URL per customer, co-branded. The same renderer we use locally (`site/curriculum.html`) hosted for the cohort. Prework, lectures, and exercises are read here. Download links for per-module zips live here too. Never ask participants to clone Git.

2. **Working directory on the participant's laptop** — one folder for the whole training, created during prework. The default path (`~/Documents/agents-102-bootstrap/`) is defined in `.claude/skills/self-study/SKILL.md`; everything below refers to it generically as the *training directory*.

   ```
   <training-dir>/                     ← Module 2 onward: open THIS in Claude Code
   ├── CLAUDE.md                      ← NOT shipped; student creates in Module 2 Debrief, grows each module
   ├── memory/                        ← cross-module (Module 2 onward)
   ├── agents/                        ← cross-module, custom agent files
   ├── sources/                       ← cross-module, raw company material
   ├── prework/                       ← open this for prework (snake.html, meetings.txt)
   ├── module-1/                      ← open this for Module 1 — zero context, Debrief lands a CLAUDE.md here
   ├── module-2/                      ← Module 2 prework writes challenge.md here
   ├── ...
   └── module-8/
   ```

   **Session scope changes at three seams: prework → Module 1 → Module 2 onward.** Open `prework/` for prework, `module-1/` for Module 1, the training-directory root for everything Module 2 onward. Within each scope, write to the right subfolder (e.g., at the root during Module 2, the prework brief at `module-2/challenge.md`, the crux at `module-2/crux.md`, etc. — no further reopens). Two folder switches total across the training. The switch between Module 1 and Module 2 is a natural seam — the move from "building one thing" (a site, scoped to Module 1) to "building a system" (a memory + agents + sources that span modules).

   **Module 1 starts with zero context on purpose.** `module-1/` ships empty. No CLAUDE.md, no scaffolded material. The Debrief produces the student's first CLAUDE.md at `module-1/CLAUDE.md` — *their* file, not a trainer handout. That CLAUDE.md is scoped to Module 1 and stays there.

   **Module 2 also starts with zero context at the root.** Training-dir root is empty of rules when Module 2 begins — no `CLAUDE.md`, no READMEs in `memory/` / `sources/` / `agents/`. Rules that matter for the exercise (sources-first, citation, distinctive-not-descriptive, topic-page shape) live in the Phase 1 prompts the student pastes. The Module 2 Debrief produces the wider root `CLAUDE.md` — written by Claude from session evidence, pushed back on by the student. Same pattern as Module 1's scoped rules file, one level up. Do NOT ship a pre-written CLAUDE.md at the root; it violates the "student writes their own rules" principle Module 1 teaches, and prior versions that shipped a 60-line pre-authored file caused agents to auto-execute behavior the student never authorized.

   Cross-module artifacts (`memory/`, `agents/`, `sources/`, root `CLAUDE.md`) live at the root — everything Module 2 onward reads from. Per-module working files live inside `module-N/`.

   **Not inside a synced folder** (OneDrive / Google Drive / Dropbox). Claude writes files faster than sync daemons reconcile — conflict copies will happen. Local only during the training.

3. **Per-module zip — only where needed.** Some modules ship no scaffold (pure continuation on existing state); others ship files that drop into the tree. A zip is a patch, not a project.

**Rules for zip-shipped scaffolds:**

- **Drop-in, idempotent.** Unzipping the same zip twice produces the same tree. Files land at stable paths the exercise text names verbatim.
- **Never clobber student work.** Don't ship a `CLAUDE.md` or agent file with the same name as one the student has been shaping. If a module needs a reference file, ship it as `CLAUDE-module-N-reference.md` or similar, and let the student decide what to integrate.
- **Scoped to its module's artifacts.** Module 2 ships three empty folders only — `memory/`, `sources/`, `agents/` (each with a `.keep` placeholder). No `CLAUDE.md`, no READMEs. Rules arrive through Phase 1 prompts; the root `CLAUDE.md` lands at Debrief, written by Claude from session evidence. Module 4 ships `skills/<skill-name>.md` files (additive). Don't put a module's working files inside another module's folder.
- **Named clearly.** Zip filename encodes module + purpose: `module-2-starter.zip`, `module-2-sources-batch-2.zip`, `module-4-compliance-skills.zip`. The exercise text names the zip.

**The root `CLAUDE.md` is a living file — written by the student, not shipped.** It's *created* in Module 2's Debrief (Claude writes the first version from session evidence, student pushes back) and then *grows* through every subsequent module's Debrief (Claude reviews the session, rewrites in place, integrates-don't-appends; student reads the 2–3 line summary of what changed). No pre-authored CLAUDE.md ever lands in the training-dir root; that violates the "student writes their own rules" principle and causes agents to auto-execute behavior the student never authorized. Module 1's Debrief produces a separate, scoped `module-1/CLAUDE.md` that stays in `module-1/` and doesn't touch the root.

**Trainer side:** scaffolds are maintained in Git inside the Agents 102 repo (`curriculum/scaffolds/<module-slug>/` is the expected location — to be created as scaffolds materialize). Empty folders use `.keep` placeholders so zip/unzip preserves structure; don't ship per-folder README.md files (working-directory instructions belong at the transition points in curriculum content — prework Step 0, the Module 2 Setup line, etc. — not duplicated per folder). Export zips per cohort, host on the customer's site or SharePoint. Participants never see Git.

## Content Boundaries

- **Technical depth:** Enough to build, not enough to become an ML engineer. Understand WHY, not the math of HOW.
- **No slides.** The markdown IS the material.
- **No vendor comparison.** We use Claude Code.
- **COPYRIGHT:** All exercises, examples, and instructional language must be original. Never reproduce or adapt from external sources.
