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

**Source of truth:** strategy files define each training's arc, storyline, and learning goals. `lecture-guardrails.md` defines pedagogical and design rules (universal across trainings). Module files are compositions that reference the shared library. Bootstrap delivery architecture lives in `curriculum/trainings/bootstrap/training-architecture.md`.

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
[The 4th C — Conclusions. Pattern: ~5-minute personal retro run WITH Claude via a pasted prompt. Produces an artifact the student carries forward. Student-facing, conversational-prompt style. Per-module adaptation: the debrief questions shift to the module's discipline.]

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

## Alignment Duties

**Training strategy and module files stay aligned — always.** Each training's strategy file carries the training-level narrative, exercise sequence, lecture sequence, reflections, and bridges. Module files carry the canonical student-facing spine. The exercise named in a strategy-file module section must match the exercise in the corresponding module file: same name, same description. When one changes, the other changes in the same edit. Drift between the two is a process bug, not a matter of taste.

## Copyright fence

**F-Secure delivers their own version of this training. Their materials are F-Secure IPR — off-limits for import, reconciliation, or paraphrase.** All exercises, examples, and instructional language must be original.

## Working with Actual Claude Behavior

Curriculum content describes a real tool that ships on a real cadence. Getting the tool's current behavior wrong is the fastest way to erode trust with a business audience — an SVP who follows the exercise word-for-word and hits a different UI than we described is done listening.

**Generation-time rules** (verify before assert; silence isn't absence; practitioner observation beats docs; behavioral surprises update curriculum) live in `memory/check_*platform_and_boundaries.md` — load before any content pass that makes a platform claim. If you're about to write a sentence like "Claude Code doesn't have X" or "you'll need to use a different tool for Y," stop and run the capability check first.

**General architectural rules:**

1. **Platform claims must be current.** If writing about Claude Code, Claude Desktop, Cowork, connectors, skills, scheduled work, or cloud/remote work, verify the behavior before asserting it. For Bootstrap's current runtime contract, see `curriculum/trainings/bootstrap/training-architecture.md`.

2. **Skill invocation must be backed by shipped capability.** A curriculum artifact that invokes a skill by name requires that the skill be installed or shipped in the relevant training scaffold. Otherwise inline the method as a prompt move. Training-specific decisions about which skills ship belong in the training architecture or strategy file.

3. **Delivery architecture is training-specific.** Do not encode one training's starter, working-directory, artifact, or module-folder rules here. Put those in that training's architecture or strategy file.

## Orchestrator pattern — disjoint file ownership

When dispatching parallel subagents for curriculum work (implementation, not research), follow the orchestrator pattern in the project CLAUDE.md with one addition: **each subagent owns a disjoint set of files.** Two agents editing the same file race and overwrite. Before the second dispatch, check what the first batch is still working on and what it has already completed — if overlap exists, either wait for completion or narrow the second batch's scope. Use `TaskStop` when you catch yourself dispatching duplicate work.

The shape: each agent's spec names every file it will touch; no two specs overlap.

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
