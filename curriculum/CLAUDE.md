# Curriculum Production

This CLAUDE.md governs curriculum work.

**Pointers:**
- **For generation** (three-pass build, PDCA 8-step loop, content development rules, prompt design rules, exercise design rules, philosophy callout rules, plug point syntax, simulation protocol): see `.claude/skills/content-creation/SKILL.md` — invoked via the `/content-creation` skill. Subagents and anyone writing content must read it first.
- **For pedagogy** (Bloom's taxonomy, 4 Cs, emergent knowledge/control/leadership, audience, throughlines, teaching principles): see `curriculum/lecture-guardrails.md`. Read before writing any module.
- **For long-running generation sessions** (plan → walk away → return pattern, applied to generating lectures and exercises): see `curriculum/module-design-long-running-strategy.md`. Use when Antti wants to hand off a full lecture or exercise generation rather than iterate in small turns. The file compounds — every long-running session closes with a Compound step that rewrites its rules.

Current state of what's built vs. what's next lives in `bosser-strategy:content-strategy.md` → "State of play" section (refreshed at the end of every significant session).

## Quality-state tagging

Every student-facing artifact (module, exercise, lecture, prework) carries a Quality line in its maintainer block. The tag is the contract between sessions.

**LLM-checks ladder (cheap → expensive; each tier earns the right to spend the next):**
`draft` → `compendium-audited` → `sim-passed` → `mechanical-tested` → `cohort-tested` → `battle-tested`.

**Orthogonal axis:** `maintainer-reviewed` — Antti read end-to-end + ran prompts manually. Its own dimension-log row, never folded into LLM provenance.

**Format** (top-state line + dimension log in maintainer block):
```
**Quality:** <top-state> <YYYY-MM-DD>
- compendium-audited <YYYY-MM-DD> (<compendium-versions-and-audits>)
- maintainer-reviewed <YYYY-MM-DD> (<one-line note>)
- sim-passed <YYYY-MM-DD> (<persona names + scores>)
- mechanical-tested <YYYY-MM-DD> (<judge-report-path> @ <short-sha> PASS)
- cohorts: <none yet | cohort-name + date + post-cohort changes>
```

**Key rules:**
- **Auto-degrade is touch-based, not time-based.** File touched after audit date → that tier and higher degrade. Cosmetic edits below `<!-- maintainer -->` don't degrade.
- **SHA pin on `mechanical-tested`** is mandatory — instance reports overwrite on rerun, SHA is the only drift detector.
- **Reference files (`curriculum/reference/`) are exempt** — flat lookup material, no mood contract or sim surface.

Full ladder definitions, error-class rationale, audit-cost reasoning: `memory/compounded/2026-04-25-content_creation-quality-state-tagging.md` and the `maintainer-reviewed` orthogonality entry at `memory/compounded/2026-04-28-content_creation-maintainer-reviewed-orthogonal-dimension.md`.

## Scope

**A portfolio of 3-4 trainings.** Bootstrap is the first (for builder leaders making the chat-to-systems leap). Engineering Management is the second (for engineering managers leading agentic change; strategy in `bosser-strategy:content-strategy-engineering-management.md`). Agentic Engineering 101 is the third (for software engineer ICs, L0 → L3 path; strategy in `bosser-strategy:content-strategy-agentic-engineering-101.md`). Executive briefing and domain-specific variants will follow. The Engineering Management + Agentic Engineering 101 pair pincer the transformation — managers create conditions, engineers run at capacity. Lectures and exercises are **shareable building blocks** — a single canonical file per exercise or lecture, referenced from whichever trainings use it.

**Source of truth:** `bosser-strategy:content-strategy.md` defines the Bootstrap arc, storyline, and learning goals. `lecture-guardrails.md` defines pedagogical and design rules (universal across trainings). Module files are compositions that reference the shared library.

See `## Copyright fence` below before importing anything from external training materials.

## Directory Structure

```
curriculum/
  # content-strategy.md (PRIVATE — see `bosser-strategy` skill)
  lecture-guardrails.md        # universal pedagogy rules
  CLAUDE.md                    # this file

  trainings/
    bootstrap/                 # Training variant #1 (this is the first)
      getting-going.md         # slug-only filenames — sequence comes from the renderer, not the filename
      building-agent-systems.md
      multi-agent-systems.md
      ...
    engineering-management/    # FUTURE — strategy in `bosser-strategy:content-strategy-engineering-management.md`
    agentic-engineering-101/   # FUTURE — strategy in `bosser-strategy:content-strategy-agentic-engineering-101.md`
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

## Cross-doc links — bare paths in source

Source `.md` files use **bare paths** for cross-doc inline links from any source-file depth:

```markdown
[Reading the return](lectures/reading-the-return.md)
[MCP and connectors](reference/mcp-and-connectors.md)
[Schedule your personal agent](exercises/personal-agent-homework.md)
[The four CLAUDE.md layers](reference/claude-code-for-engineers.md)
```

Authors don't count `../` — write the kind/slug.md path the same way from a module file (depth 2), an exercise (depth 1), or a lecture (depth 1). The renderer's `rewriteCrossDocLinks` function (`site/curriculum.html`) accepts a regex with `(?:\.\.\/)*` (zero-or-more `../` prefixes) and rewrites the link to `curriculum.html?file=<kind>/<slug>` at render time.

Forbidden in source:
- **Hardcoded `curriculum.html?file=...` URLs.** Renderer leak — ties content to one rendering pipeline.
- **Depth-counted `../` and `../../` prefixes.** The renderer accepts them, but they read as bookkeeping the author shouldn't have to track.

The standalone-include mechanism (link is the entire paragraph) catches a different shape — the renderer fetches and inlines the file's content. Bare-path inline links inside body sentences just get URL-rewritten without inlining. Maintainer-block bare-path text references (no markdown link) are exempt from rewrite.

Canonical source: `memory/compounded/2026-04-26-platform-bare-paths-renderer-rewrites.md`.

## Alignment duties

**`bosser-strategy:content-strategy.md` and module files stay aligned — always.** `bosser-strategy:content-strategy.md` carries the training-level narrative (Connections, Exercise, Lecture, Reflection, Bridge per module). The module files in `trainings/bootstrap/` carry the canonical spine. **The exercise named in each module section of `bosser-strategy:content-strategy.md` must match the exercise in the corresponding module file** — same name, same description. When one changes, the other changes in the same edit. Drift between the two is a process bug, not a matter of taste.

## Copyright fence

**F-Secure delivers their own version of this training. Their materials are F-Secure IPR — off-limits for import, reconciliation, or paraphrase.** All exercises, examples, and instructional language must be original.

## Working with actual Claude Code behavior

Curriculum content describes a real tool that ships on a real cadence. Getting the tool's current behavior wrong is the fastest way to erode trust with a business audience — an SVP who follows the exercise word-for-word and hits a different UI than we described is done listening.

**Generation-time rules** (verify before assert; silence isn't absence; practitioner observation beats docs; behavioral surprises update curriculum) live in `memory/check_*platform_and_boundaries.md` — load before any content pass that makes a platform claim. If you're about to write a sentence like "Claude Code doesn't have X" or "you'll need to use a different tool for Y," stop and run the capability check first.

**Architectural rules — canonical home is here:**

1. **Training platform = Claude Code (CLI + Desktop) + Cowork — both current as of 2026-04-29.** Not Claude.ai (chat). Bootstrap is dual-runtime: same prompts, same artifacts, runtime-specific skill install surfaces. Differences live in (a) install-step UI language and (b) terminology (*subagent* in Code, *agent* in Cowork). For the runtime split, see `curriculum/reference/claude-code-for-engineers.md` § *Claude Cowork — same engine, different surface*. Describe Claude Code surfaces: the **+** button next to the prompt, **Settings → Connectors**, the **Schedule** sidebar, `/loop`, plan mode via the prompt (*"Enable plan mode"*), the desktop mode dropdown, or Shift+Tab cycle. For Cowork: the *Cowork* tab in Claude Desktop, *Customize → Skills → New → Create with Claude*, and the connected-folder model in place of CWD.

2. **Cloud/remote features carry a Git dependency — out of scope.** Remote tasks (Routines) run in Anthropic's cloud, but the runner needs a cloud source for the working directory — typically a cloud Git repo. Our training uses a local training directory (the default path lives in `.claude/skills/self-study/SKILL.md` — source of truth). State cloud features exist; do not present them as a realistic upgrade path inside a business-audience exercise.

3. **Skill invocation — inline unless the skill is shipped with this module.** A curriculum artifact that invokes a skill by name (e.g., *"apply the crux skill to my challenge"*) requires the student's Claude Code to have that skill installed — otherwise it dies silently. Rule: inline the skill's move unless the same module's scaffold ships the skill. Module 2's Debrief inlines the crux move + names Rumelt directly; Module 7's scaffold ships the `crux`, `assumption-test`, and `pre-mortem` skills, invoked by name during the sharing exercise; Module 8 re-invokes them at room scale on the strategy problem (already installed). The named-invocation reveal — "that move you did in Module 2 was a skill all along" — lands in Module 7, not out of the blue in Module 8.

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

**Bootstrap conventions are documented here. Agentic Engineering 101 uses a different delivery model** — content folder unzipped by student, all compounding artifacts land in the student's real repo (no training-dir state, no `module-N/` folders). See `bosser-strategy:content-strategy-agentic-engineering-101.md` § "Delivery architecture" for canonical AE101 rules. Future trainings choose one model per audience; don't mix.

**The shapes:**

1. **Site** (curriculum content) — password-protected static URL per customer, co-branded. The same renderer we use locally (`site/curriculum.html`) hosted for the cohort. Prework, lectures, and exercises are read here. The one Bootstrap starter download lives here too. Never ask participants to clone Git.

2. **Working directory on the participant's laptop** — one folder for the whole training, created during prework. The default path (`~/Documents/agents-102-bootstrap/`) is defined in `.claude/skills/self-study/SKILL.md`; everything below refers to it generically as the *training directory*.

   ```
   <training-dir>/                     ← Module 2 onward: open THIS in Claude Code
   ├── CLAUDE.md                      ← NOT shipped; student creates in Module 2 Debrief, grows each module
   ├── memory/                        ← cross-module (Module 2 onward)
   ├── agents/                        ← cross-module, custom agent files
   ├── sources/                       ← cross-module, raw company material
   ├── outputs/                       ← cross-module audit / report results; first appears at Module 4
   ├── prework/                       ← open this for prework (snake.html, meetings.txt)
   ├── module-1/                      ← created when Module 1 writes outputs
   ├── module-2/                      ← created when Module 2 writes outputs
   ├── ...
   ├── module-4/policies/             ← policy reference files installed in prework
   └── module-8/
   ```

   **Session scope changes at three seams: prework → Module 1 → Module 2 onward.** Open `prework/` for prework, `module-1/` for Module 1, the training-directory root for everything Module 2 onward. Within each scope, write to the right subfolder (e.g., at the root during Module 2, the prework brief at `module-2/challenge.md`, the crux at `module-2/crux.md`, etc. — no further reopens). Two folder switches total across the training. The switch between Module 1 and Module 2 is a natural seam — the move from "building one thing" (a site, scoped to Module 1) to "building a system" (a memory + agents + sources that span modules).

   **Module 1 starts with zero context on purpose.** `module-1/` ships empty. No CLAUDE.md, no scaffolded material. The Debrief produces the student's first CLAUDE.md at `module-1/CLAUDE.md` — *their* file, not a trainer handout. That CLAUDE.md is scoped to Module 1 and stays there.

   **Module 2 also starts with zero context at the root.** Training-dir root is empty of rules when Module 2 begins — no `CLAUDE.md`, no READMEs in `memory/` / `sources/` / `agents/`. Rules that matter for the exercise (sources-first, citation, distinctive-not-descriptive, topic-page shape) live in the Phase 1 prompts the student pastes. The Module 2 Debrief produces the wider root `CLAUDE.md` — written by Claude from session evidence, pushed back on by the student. Same pattern as Module 1's scoped rules file, one level up. Do NOT ship a pre-written CLAUDE.md at the root; it violates the "student writes their own rules" principle Module 1 teaches, and prior versions that shipped a 60-line pre-authored file caused agents to auto-execute behavior the student never authorized.

   Cross-module artifacts (`memory/`, `agents/`, `sources/`, `outputs/`, root `CLAUDE.md`) live at the root — everything Module 2 onward reads from. Per-module working files live inside `module-N/`.

   **The `outputs/` convention** (introduced at Module 4): when a prompt produces a result that describes the cross-module system rather than the current module's work product, write it to `outputs/<name>.md`. M4's audit reports are the canonical case (`outputs/policy-report.md`, `outputs/security-report.md`); M5 / M6 follow the same shape if a prompt produces a system-wide artifact. Per-module evidence and inputs (e.g. `module-4/policies/` reference files, `module-4/skills/security-audit/` skill source, `module-3/stances/` per-run output) stay in `module-N/`. Latest-only — re-runs overwrite, git tracks history. The diagnostic at prompt-write time: *does this artifact describe the cross-module system or the current module's working state?* If cross-module, `outputs/`. If module-specific, `module-N/`.

   **Not inside a synced folder** (OneDrive / Google Drive / Dropbox). Claude writes files faster than sync daemons reconcile — conflict copies will happen. Local only during the training.

3. **One prework starter, no per-module packs.** Bootstrap installs all trainer-provided working material during prework. Do not design module-day downloads or zip patches. If a future module needs trainer-provided reference material, add it to the prework starter at the stable path the exercise will use. Empty future module folders are optional; ship only folders/files that introduce material or reduce real student friction.

**Rules for the prework starter:**

- **Installed once, idempotent.** Extracting the starter twice produces the same tree. Files land at stable paths the exercise text names verbatim.
- **Never clobber student work.** Don't ship a `CLAUDE.md`, agent file, judge file, report, or other artifact the student is meant to create or compound.
- **Reference material only.** Module 4 can ship `module-4/policies/*.md` because those files are source material the student runs raw. Module 4 must not ship a prebuilt security skill; the student authors it during the exercise.
- **No empty-folder theater.** Keep the starter small. Include `prework/`, `.claude/skills/self-study/`, and cross-module homes (`memory/`, `sources/`, `agents/`) because the student uses them early. Include module folders only when they contain shipped reference material, such as `module-4/policies/`.

**The root `CLAUDE.md` is a living file — written by the student, not shipped.** It's *created* in Module 2's Debrief (Claude writes the first version from session evidence, student pushes back) and then *grows* through every subsequent module's Debrief (Claude reviews the session, rewrites in place, integrates-don't-appends; student reads the 2–3 line summary of what changed). No pre-authored CLAUDE.md ever lands in the training-dir root; that violates the "student writes their own rules" principle and causes agents to auto-execute behavior the student never authorized. Module 1's Debrief produces a separate, scoped `module-1/CLAUDE.md` that stays in `module-1/` and doesn't touch the root.

**Trainer side:** the Bootstrap starter is maintained in Git at `curriculum/scaffolds/training-starter/`. Policy reference source material can also have maintainer copies under module-specific scaffold folders, but participant delivery still happens through the single prework starter. Empty folders use `.keep` placeholders only when the empty folder itself is part of the prework promise. Working-directory instructions belong at transition points in curriculum content — prework Step 0, the Module 2 Setup line, etc. — not duplicated per folder. Export the starter per cohort, host on the customer's site or SharePoint. Participants never see Git.

## Classroom delivery — default mode

Classroom (cohort + trainer) is the primary delivery mode. Self-study is bonus / beta. Author for classroom first.

**The default classroom shape:**

1. **Trainer projects the recap site.** No slides — the curriculum site IS the slide. Modules, exercises, lectures, prompts, all rendered as the student will later see them in their own browser. Prompt-block chrome (header chip + Copy button) is part of the projected surface; legibility at projection distance is a design constraint, not a polish step.
2. **Every exercise is follow-along by default.** Trainer demos slowly on the projected screen — types or pastes the prompt, sends, narrates as the response streams. The room copy-pastes the same prompt into their own laptop session concurrently and watches their own agent execute. Per `check_pedagogy.md` #24, the time budget is the slower of the two paces (usually the trainer's), not their sum.
3. **Frequent designed conversation pauses.** Every exercise is broken by short stop-and-talk beats so stragglers catch up and the room digests what they just saw. Conversation pauses are a structural feature of the exercise, not improvisation between phases — author them in. A 25-minute exercise without a single designed pause is a draft, not a finished exercise.

**What trainers actually do (and don't):**

- **Trainer's screen is shared most of the session.** Whatever is on the trainer's screen is visible to the room. There is no private trainer-only pane during delivery. Anything the trainer needs to read in private has to happen before screen-share starts, or live on a separate physical surface (printed sheet, phone, second device) — never in a window the trainer would have to toggle.
- **Trainers do NOT read maintainer blocks during the session.** Cognitive load of running the room + projecting + operating their own Claude Code is already maxed; there is no spare attention to context-switch to a maintainer-only document mid-flow. Pretending maintainer blocks are runtime scripts is a design mistake. Two consequences:
  - **Run-time cues live in student-visible prose.** A pause beat written as *"Take 90 seconds and compare what your session printed with the person next to you"* reads as instruction to the room AND as cue to the trainer — the same sentence does both jobs. This is the only run-time surface that doesn't require a context switch.
  - **Pre-rehearsal trainer material is its own artifact.** Failure modes, why each phase teaches what it teaches, what to listen for in the room, when to compress vs. linger — these belong in a per-module trainer guide read once before delivery, not in a maintainer block pretending to be a script. Maintainer blocks stay narrow: source citations, eval logs, design history, customisation notes. (Format of the per-module trainer guide is TBD; the principle is "read in prep, not during.")

**What this means for authors:**

- **No megaprompts in classroom-target exercises.** A 30-line prompt the trainer types live is dead air for the room. Split into smaller prompts at natural pause points; if the prompt genuinely needs to be long, the trainer pastes it from the recap site (Copy button) and uses the wait for one of the designed conversation pauses.
- **Phase boundaries should land at conversation-pause beats.** Not "here's a transition sentence to Phase 2" but "here's where the trainer asks the room what they noticed and then everyone moves on together."
- **Long agent waits (multi-minute send-offs, multi-file audits) are the natural pause anchors.** While the agent runs, the trainer talks. Design those waits in deliberately rather than apologising for them.
- **Trainer-only material lives in maintainer blocks** below `<!-- maintainer -->`. Per-phase: what to demo, what to skip, where the room usually gets stuck, what conversation prompt fills a 90-second agent wait. The block is a script, not a footnote — write it that way.

**What this DOESN'T mean:**

- Self-study isn't second-class — it just inherits the same structure with the host-skill (Teacher Claude / Agentic Nerd, per `check_pedagogy.md` #25) playing the trainer's role. Designing for classroom-first usually produces self-study material that works without modification.
- Conversation pauses aren't "stop and reflect on your feelings" beats. They're "the room compares notes on what their session just produced" beats — concrete, exercise-anchored, short.

## Content Boundaries

- **Technical depth:** Enough to build, not enough to become an ML engineer. Understand WHY, not the math of HOW.
- **No slides.** The markdown IS the material.
- **No vendor comparison.** We use Claude Code.
- **COPYRIGHT:** All exercises, examples, and instructional language must be original. Never reproduce or adapt from external sources.
