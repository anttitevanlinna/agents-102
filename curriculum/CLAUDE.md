# Curriculum Production

This CLAUDE.md governs curriculum work. Read `lecture-guardrails.md` before writing any module.

## Scope

**A portfolio of 3-4 trainings.** Bootstrap is the first. Mid-management, executive briefing, and domain-specific variants will follow. Lectures and exercises are **shareable building blocks** — a single canonical file per exercise or lecture, referenced from whichever trainings use it.

**Source of truth:** `content-strategy.md` defines the Bootstrap arc, storyline, and learning goals. `lecture-guardrails.md` defines pedagogical and design rules (universal across trainings). Module files are compositions that reference the shared library.

**F-Secure delivers their own version of this training. Their materials are F-Secure IPR — off-limits for import, reconciliation, or paraphrase. Build from first principles + this project's research + Antti's practitioner experience.**

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
    mid-management/            # FUTURE
    executive-briefing/        # FUTURE

  exercises/                   # Shared library — one file per exercise
    raw-llm.md
    add-guardrail.md
    build-llm-brain.md
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

## Three-Pass Build

1. **Pass 1 — Module index files.** The spine for each module: metadata, LOs, ordered references to (not-yet-existing) exercises and lectures, framing sections. Tests the arc.
2. **Pass 2 — Exercise + lecture skeletons.** One file per shared-library entry. Title, what the participant does, what happens, the point, facilitator notes, time estimate. Written into `exercises/` and `lectures/` — they belong to the library, not to any single training.
3. **Pass 3 — Full content.** Flesh out each exercise and lecture file to the level a facilitator can run live.

**Trainer artifacts.** Some exercises reference artifacts the trainer brings (the Module 1 guardrail `CLAUDE.md`, Module 2 LLM brain scaffold, Module 4 compliance skills). These are real files — build them alongside the exercise text, not after. The exercise describes what happens when participants use the artifact. The artifact has to exist first.

## Exercise Design Rules

- **Claude Code specific.** Exact commands, expected outputs, troubleshooting. Not tool-agnostic.
- **Exercise-led, not lecture-led.** Concepts emerge from doing. Never explain before the exercise demonstrates it.
- **Real data, not toy data.** Participants use their own profiles, policies, domains.
- **Fabrication is the teaching moment.** Module 1 deliberately pushes until the agent fabricates.
- **Incremental complexity.** Each exercise adds one thing. Never two new concepts in one exercise.
- **One exercise = one bounded activity.** An exercise has an internal arc (do → observe → adjust → observe again) but that's one exercise, not four. Do NOT enumerate the arc as sub-exercises (E1.1, E1.2, E1.3 …). The description names the exercise and sketches the arc in one paragraph. The facilitator walks the participant through the rhythm; the participant doesn't tick off five boxes.
- **Riff on a recognized business framework.** Every business-skill exercise anchors the new LLM skill on a framework participants already know — StoryBrand, strategy-as-assumptions, Voice of Customer, Jobs-to-be-Done, Toyota Kata, principle of least privilege, Double Diamond, etc. Three reasons: cognitive economy (LLM work is new; the framework is a familiar hook), transferability (they carry both skills back to work), engagement (best-in-class frameworks beat toy exercises). Name the framework at design time; the exercise eval enforces it.
- **Content-strategy and module files stay aligned — always.** `content-strategy.md` carries the training-level narrative (Connections, Exercise, Lecture, Reflection, Bridge per module). The module files in `trainings/bootstrap/` carry the canonical spine. **The exercise named in each module section of content-strategy.md must match the exercise in the corresponding module file** — same name, same description. When one changes, the other changes in the same edit. Drift between the two is a process bug, not a matter of taste.
- **Show the failure mode.** For every capability, show what goes wrong without the discipline.
- **The four pillars (LLM-based, secure, lifecycle, reliable) are woven through, not bolted on.**

## Plug Points Framework

Plug points are where the organization's own reality replaces generic content:

```
> PLUG POINT: [What the org inserts here]
> Default: [What we provide if they don't have their own]
```

Examples: security policies, data classification rules, compliance requirements, domain-specific evaluation criteria, org structure for agent ownership.

## Philosophy — the spine

`philosophy.md` (repo root) holds the 19 beliefs behind the training. Two clusters matter most for the story arc:
- **Fundamental questions about the future** (where is this going, what's real vs. hype, who creates it, what do you do about it, where does the real transformation happen)
- **Student's stance** (practice or theorize, tool or fundamentals, go first or wait, share or hoard, consumer or teacher, move without a map)

The philosophy threads through the training — in lectures, openings, closings. **The teacher carries the whole story arc in the room, including parts that are deliberately not written down.** Written materials are the backbone, not the script. Some parts remain human and just spoken in the right places.

**Rule for content:**
- **Callouts are sparing.** One or two per lecture / closing / opening — where a philosophy beat lands naturally from what the student just did. Not every module hammers every belief.
- **Never front-load the belief.** The student experiences the thing, then the belief is named. "What just happened, named" — not "here's what we believe, now do the exercise."
- **Reference the file when relevant.** Content authors should read `philosophy.md` before a writing pass. Callouts can reference specific beliefs by number or name; students reading later can follow the thread.

## Canonical Generation Pattern (PDCA)

Every piece of curriculum content follows this 8-step loop. Full detail in the `content-creation` skill.

1. **Antti's input** — what to build, why
2. **Ensure content strategy** — read and update `content-strategy.md` if this piece changes the arc
3. **Check / agree on evals** — propose judges; update template if a missing judge is discovered; save instance
4. **Check learning goals** — pull Bloom-tagged LOs into the eval instance (the contract)
5. **Generate / edit** — write, following the content development rules below
6. **Simulate / test** — role-play a student running the exercise; report where things break (ambiguous instructions, Claude-behavior mismatches, under-scaffolded phases, arc flow problems). See `content-creation` SKILL.md "Simulation protocol."
7. **Eval** — LLM-as-judge + Antti's taste. APPROVE / APPROVE-WITH-TODOs / REVISE
8. **Learning + system improvement** — update eval template, simulation protocol, skill, rules, memory with anything learned

The system should be smarter at the end of each cycle than at the start. This pattern generalizes beyond curriculum.

## Content Development Rules (for the simple HTML renderer)

The curriculum HTML renderer (`site/curriculum.html` + `site/layouts/curriculum.css`) is deliberately minimal. No build step, no frontmatter parser, no plugin system. To keep it that way, module and exercise/lecture files follow these rules:

- **No YAML frontmatter.** The renderer passes the file straight to `marked.parse()`. Any `---` block at the top renders as a horizontal rule. Module metadata lives in the body under a `## Meta` heading.
- **One H1 per file — it's the title.** The print CSS puts a page break before every H1. Multiple H1s in one file = awkward empty space in the PDF. Use H2/H3 for sections below.
- **Basic markdown only.** Paragraphs, headings, lists, tables, fenced code, blockquotes, inline emphasis, links. No raw HTML blocks, no Mermaid, no admonition plugins, no MDX. If you reach for something exotic, the renderer won't handle it.
- **Kebab-case filenames.** `raw-llm.md`, `context-is-king.md`. Slugs are short and descriptive — they appear in include links across multiple trainings.
- **Cross-module links** use `curriculum.html?training=bootstrap&module=<slug>`, not relative markdown paths. Relative markdown links resolve from the HTML page, not from the markdown file, and will break.
- **Include links** use the exact form `[Text](exercises/slug.md)` or `[Text](lectures/slug.md)` on their own paragraph. Anything else is a regular link. Don't point include links at subdirectories, relative paths, or files outside the two libraries.
- **All pages link.** The renderer auto-links included content: when a module page inlines an exercise or lecture via an include-link, the inlined H1 becomes a hyperlink to the standalone view of that file. Module pages also show prev/next/all-modules navigation at the bottom. Standalone exercise/lecture pages link back to the curriculum index. Authors don't add these links manually — the renderer does it. Don't remove it when revising module files.

## Prompt Design Rules (for any prompt participants copy into Claude Code)

- **No placeholders mid-prompt.** Don't use `[BRACKETS]` inline that the participant must find-and-replace. Not `[paste or attach]`, not `[your content]`, not `[NAME]`. **Every placeholder inside a code fence is a rule violation; check every prompt block you ship.** Handle variable content one of three ways:
  1. **Conversation before** — Claude asks for the values, then assembles the prompt internally
  2. **Conversation after (preferred for simple input)** — the prompt instructs Claude to ask the participant for the values in turn
  3. **Copy-paste right after the prompt** — the user copies the prompt, then pastes the data (or attaches a file) as a separate step. The prompt references "the X I just shared" or "the X I'll paste next."
- **Long prompts OK** up to ~1 page. Paragraph structure is mandatory for human readability — no wall-of-text prompts.
- **Prefer asking questions over filling slots.** If the agent needs simple input, it asks. Don't make the participant edit the prompt.
- **"Add X and regenerate" is a trap.** When X should shape the OUTPUT (voice, stance, framing), "add X" reads as "append X as a new section." Claude grows a bullet list and calls it done. Instead say: "rewrite using X as voice-shaping context" or "let X change how the output SOUNDS." Be explicit: is X getting APPENDED or INTEGRATED? Name it.
- **Vary closings deliberately.** Each closing mechanic has different strengths; choose case by case:
  - **Claude-as-cold-critic** (fresh window, no context, structured prompt): reproducible, artifact-producing. Good when feedback quality matters AND the participant needs an artifact they can act on. Foreshadows LLM-as-judge moves.
  - **Pair exchange** ("show your neighbor"): social energy, unexpected angles, quick. Good for early bonding or when each person's domain expertise adds a unique angle. Variable quality — not for high-stakes feedback.
  - **Group discussion**: room-wide pattern-finding. Good when collective observation surfaces what no individual sees (e.g., Module 3 cross-agent synthesis, Module 8 Double Diamond).
  - **Solo reflection / retro with Claude**: private processing + learning extraction. Good for end-of-module debriefs (see Module 1 pattern).
  - **Self-demo / "show your work" to the room**: claim ownership. Good when the artifact is sharable and the moment needs a small spotlight.

  Don't default to any one of these. When designing a close, ask: *what does this exercise actually need — structured feedback, social bonding, collective insight, private extraction, or public ownership?* Then pick.

The Steering eval exercise's "Help me build a steering eval judge" prompt is the reference pattern.
- **Images are deferred.** If a module needs images, flag it and we'll add path rewriting to the renderer. Don't silently add `![...](./foo.png)` — it won't resolve correctly.
- **Keep blockquotes moderate in length.** The print CSS applies `page-break-inside: avoid` to blockquotes; a 40-line blockquote leaves a huge whitespace gap in the PDF.
- **Prefer short paragraphs and list items.** Builder style anyway, but the print layout amplifies the win.
- **Write TO the student.** Lecture and exercise files are read by the student, not the facilitator. No facilitator instructions (*"To the room,"* *"Pairs trade guesses,"* *"Hear one or two out loud"*) in the main body — those are script directions and belong in facilitator notes (deferred artifact). Address the student directly: *"You'll see..."*, *"Take a guess."*, *"Paste this prompt."* State general facts as facts. **Trailing sections below a `---` horizontal rule are allowed** — that space holds editorial metadata (TODOs, iteration log) AND facilitator notes (watch-fors, timings, decision points) for now. Facilitator notes will be extracted to a dedicated artifact later.
- **Flavor: Seth × Rory × Risto.** Builder voice isn't dry voice. The target tone:
  - **Seth Godin** — gifts-first warmth, direct, short. *"Here, I made this for you."* Kindness is the goal.
  - **Rory Sutherland** — counterintuitive reframes, wit, sideways looks. If the obvious answer is obvious, look at the weird one. Behavioral-economics analogies welcome where they fit.
  - **Risto Siilasmaa** — epistemic honesty. *We don't know where this is going. Nobody does.* Naming what we don't know is the source of trust, not a sign of weakness.
  - **Questions to the reader are welcome** — sprinkled, not flooded. *What changed? Where does this break? Ever noticed that...?* Questions invite thinking; statements alone close it down.
  - **Dryness is a failure mode, not a sign of discipline.** The goal is reading pleasure alongside clarity. A sentence that makes the reader smile lands harder than three that explain.

If a rule starts feeling restrictive, that's a signal to upgrade the renderer — not to bend the rule with a workaround that only some files follow.

## Content Boundaries

- **Technical depth:** Enough to build, not enough to become an ML engineer. Understand WHY, not the math of HOW.
- **No slides.** The markdown IS the material.
- **No vendor comparison.** We use Claude Code.
- **COPYRIGHT:** All exercises, examples, and instructional language must be original. Never reproduce or adapt from external sources.
