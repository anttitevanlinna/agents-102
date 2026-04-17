---
name: content-creation
description: Create or revise curriculum content for Agents 102 (modules, exercises, lectures). Use when writing a new module/exercise/lecture, reshaping existing content, creating a new training variant, or reviewing whether content follows project rules. Enforces the three-pass build, the one-exercise-per-module principle, include-link conventions, and content-strategy ↔ module file alignment.
---

# Content Creation — Agents 102 Curriculum

Use this when the user asks to write or revise curriculum content: a module, exercise, lecture, a new training variant, or a review pass.

This skill exists because curriculum production has specific conventions that the simple HTML renderer depends on, shareability rules across training variants, and a three-pass build to keep course-correction cheap. Violating any of these creates drift that rots fast.

## Session start — read this first

Before touching anything, read (in this order):

1. **`curriculum/CLAUDE.md`** — rules of the house. Directory structure, content dev rules, prompt design rules, voice rules, Seth×Rory×Risto flavor, alignment duties, 8-step PDCA.
2. **`curriculum/content-strategy.md`** — training-level arc + **State of play** section at the bottom (what's built, what's partial, what's next, open TODOs).
3. **`philosophy.md`** (repo root) — the 19 beliefs. Philosophy is the spine. Callouts are sparing.
4. **`curriculum/lecture-guardrails.md`** — pedagogical rules (Bloom, TBR 4 Cs, emergent knowledge).

Then check `continuous-research/insights.md` and relevant domain findings before writing — per heuristic 11 (consult research before curriculum work).

**Where things live:**

```
curriculum/
  content-strategy.md       arc + state of play
  CLAUDE.md                 rules
  lecture-guardrails.md     pedagogy

  trainings/<name>/         module files (slug-only filenames)
  exercises/<slug>.md       shared library
  lectures/<slug>.md        shared library
  supplementary/<slug>.md   progressive reference docs (sections build up across modules)
  reference/<slug>.md       flat lookup (links to official docs for depth)

  evals/
    lecture.md              reusable lecture eval template
    exercise.md             reusable exercise eval template
    instances/              filled-in evals per artifact with eval-run logs

site/
  curriculum.html           renderer (client-side markdown)
  layouts/curriculum.css    typography + print CSS
```

**Verify locally:** `python3 -m http.server 8000` at repo root, open `http://localhost:8000/site/curriculum.html`.

**When the user asks for new content:** invoke the PDCA loop below.

## The canonical generation pattern (PDCA loop)

Every piece of curriculum content — lecture, exercise, or module — goes through this loop. Do the steps in order. Skipping a step is how sessions drift.

**Plan:**
1. **Antti's input** — what to build, why, any constraints or principles he's adding this turn.
2. **Ensure content strategy** — read the relevant section of `curriculum/content-strategy.md`. If this piece changes the arc, update content-strategy in the same edit. Proactive alignment, not reactive.
3. **Check / agree on evals** — propose the eval judges (contributory ones inferred from patterns; primary "leap test" steered by Antti). Update the eval template (`curriculum/evals/lecture.md` or `exercise.md`) if a missing judge is discovered. Save the filled instance to `curriculum/evals/instances/<training>--<slug>.md`.
4. **Check learning goals** — pull the Bloom-tagged LOs verbatim from the module file into the eval instance. The LOs are the contract; the eval is the measure; the content must satisfy both.

**Do:**
5. **Generate / edit** — write, following the content development rules below. For prompts participants will copy, follow the prompt design rules.

**Test:**
6. **Simulate / test** — before the formal eval, run through the artifact as if you were a student. Role-play a persona (e.g., "SVP of HR at a Nordic software company, comfortable with ChatGPT but has never built an agent"), follow the instructions, make up realistic content, and report where things break. Catches what evals don't: ambiguous instructions, Claude-behavior mismatches, under-scaffolded phases, arc flow problems. See "Simulation protocol" below.

**Check:**
7. **Eval** — run the LLM-as-judge on the draft. Antti does the taste review on top. Three possible verdicts: **APPROVE**, **APPROVE WITH TODOs** (essentials pass, contributory items deferred — good enough, ship), **REVISE**.

**Act:**
8. **Learning + system improvement** — if simulation or eval missed something Antti caught, or a new principle emerged, update the system in the same turn: eval template (new judge), simulation protocol (new persona or failure mode), `content-creation` SKILL.md (new rule), `curriculum/CLAUDE.md` (new rule), `memory/self-review-protocol.md` (new correction + heuristic), `memory/MEMORY.md` (new index entry). The system should be smarter at the end of each cycle than at the start.

## Simulation protocol

Use this to run the simulate/test step (step 6 of the generation loop).

**When to use:** After a first draft of any exercise (required) or lecture (optional — less useful for demo-script lectures; more useful for prework-reading). Before the formal eval. Can be repeated with different personas.

**How to run:** Launch a general-purpose agent with the prompt template below. Give it the target file path(s) and a persona. It role-plays through the exercise, makes up realistic content, and reports.

**Prompt template** (copy this into the agent invocation):

```
You are simulating a student running a curriculum exercise for Agents 102. Role-play a typical participant, follow the exercise instructions end to end, and report where things break. Independent judgment — the author won't see your reasoning.

TARGET EXERCISE: [file path]

PERSONA: [describe — role, seniority, LLM fluency, business context. Example: "SVP of HR at a 500-person Nordic software company. Has used ChatGPT weekly for drafting emails and performance reviews. Never built an agent, never used Claude Code before today. Arrived at this exercise having watched the Context is King lecture 15 minutes ago."]

ASSUME you have completed any prior module/lecture setup the exercise references.

FOR EACH PHASE:
1. Describe what you would paste or do — make up realistic content in your persona's voice (their "LinkedIn profile", "colleague", "strengths", "hate list", etc.)
2. Predict what Claude would likely return — use your knowledge of how Claude behaves with these kinds of prompts
3. Flag any moment you are confused, stuck, or unsure what the exercise wants
4. Flag any moment Claude's likely output wouldn't match what the exercise assumes
5. Record the state after the phase — what artifact you now have, what you'd do next

AT THE END, report:
- **Top 3 places the exercise could break in a real classroom** (specific, with which phase)
- **Top 3 ambiguous instructions** (quote them)
- **Any under-scaffolded phase** (where a real participant would stall)
- **Overall "this is me" rating** 1-10 for the final artifact (with reasoning)
- **Arc flow** — does one phase lead naturally to the next?
- **Claude-behavior mismatches** — places where Claude's usual output style clashes with the exercise's assumption

Be specific. Use your persona's voice. If the exercise has a flaw, you (as the student) will notice it. Under 800 words.
```

**What simulation catches that eval doesn't:**
- **Ambiguous instructions** that seem clear on paper but trip a real participant
- **Claude-behavior mismatches** — e.g., you tell Claude to "ask these questions in turn" but Claude often dumps all five at once unless nudged
- **Under-scaffolded phases** — where the participant has to infer too much
- **Arc flow breaks** — where Phase N doesn't feed Phase N+1 smoothly
- **"This is me" failures** — the final artifact rating shows if the emotional payoff actually lands

**Known Claude-behavior patterns to check during simulation** (living list — add as they surface):
- **File preservation gap** — exercises that say "save this for later" don't work in Claude Code sessions; Claude keeps artifacts in memory but participants don't know that. Fix: either use Claude's memory (ask Claude to look back at its own output) or give explicit instructions for file duplication.
- **Reading burden** — asking participants to read long generated artifacts twice to spot differences is excessive. Fix: ask Claude to do the comparison and surface the specific items.
- **Niceness tax** — Claude's RLHF softens edgy claims during regeneration (hate-flips become generic virtues, anti-positioning becomes collaborative leadership). Fix: prompt explicitly says "keep the edge — don't soften stances."
- **Question dump** — when asked to "ask these questions in turn," Claude sometimes dumps all questions at once. Fix: prompt says "ask one, wait for my answer, then ask the next."
- **Overwrite anxiety** — when regenerating an artifact, Claude may ask "overwrite or create new?" Fix: prompt specifies the default ("overwrite the existing file").
- **Preamble before action** — Claude narrates what it's about to do before doing it; can disrupt a "clean question-by-question rhythm" assumption. Fix: assume it will happen; design around it.
- **Append-vs-integrate default** — when told "add X to context and regenerate," Claude often appends X as a new section rather than rewriting the existing output through X's lens. Simulation tell: the output grows a "What I love" / "How I help" section instead of the whole voice shifting. Fix: prompt must explicitly say "rewrite using X as voice-shaping context" when integration is the goal.

**Prework-specific patterns** (from first prework simulation, 2026-04-17):
- **Install cliff** — "install Claude Code" is a 25-min side quest if you land on the CLI path with no Node. For non-developer audiences, specify **desktop or web** explicitly. "No terminal required" is a real affordance worth stating.
- **Connector admin gate** — Microsoft 365 / Google Workspace connectors often need tenant admin consent. A builder leader can't self-serve through this on a Sunday. Every connector instruction needs a **fallback path** (screenshot-paste, CSV export, manual copy) that works without admin.
- **Ghost file references** — referencing `foo.md` in prework when `foo.md` doesn't exist yet is a hard fail. Either ship the file (write the section, even if minimal) or inline the content. Don't reference files that live in a future pass.

**Multi-persona simulation:** for high-stakes exercises, run 2-3 simulations with different personas (CTO, marketing lead, HR director) to surface persona-specific breakage. Not required for every exercise.

### Student-facing first, facilitator notes later

A lecture or exercise file contains both student-facing content (what the room sees and does) and facilitator notes (timing, watch-fors, decision points, pacing). **Generate the student-facing content first.** Get the demo, the priming, the teaching moment, the transition right. Facilitator notes are a later pass — added when the content stabilizes.

Why: iterating on facilitator pacing while the student content is still in flux is wasted work. The demo changes → the timing estimates are wrong → the watch-fors are wrong. Lock the content; annotate the delivery second.

The exercise eval's "Facilitator briefing complete" judge applies at Pass 3 completion, not at first draft. A first-draft lecture or exercise can ship APPROVE WITH TODOs where the TODO is "add facilitator notes."

**This pattern generalizes beyond curriculum.** Articles, research findings, future trainings all follow the same shape: *input → plan → measure → contract → make → evaluate → improve*. Different artifacts point at different strategy documents, different eval templates, different contracts — but the loop is one.

## Before touching any file

Do all of this. Skipping steps is how sessions drift.

1. **Read the rules of the house:**
   - `curriculum/CLAUDE.md` — content development rules, structure, three-pass build, alignment duties
   - `curriculum/lecture-guardrails.md` — pedagogical rules (Bloom's, TBR 4 Cs, builder style, throughlines)
   - `curriculum/content-strategy.md` — training-level arc and storyline
   - `philosophy.md` (repo root) — 19 beliefs behind the training. Philosophy is the spine. The teacher carries the whole story arc in the room — including parts that are deliberately not written. Written materials are backbone, not script. Content callouts to philosophy are **sparing** (1-2 per lecture/closing/opening max), **never front-loaded** (student experiences the thing, then the belief is named), and land where the student's felt experience makes them obvious.

2. **Consult research before building from first principles.** The research system has 90+ OODA cycles of evidence. Use it.
   - `continuous-research/insights.md` — compressed arguments
   - `continuous-research/synthesis/*.md` — topic synthesis files
   - `continuous-research/findings/by-domain/*.md` — per-domain evidence
   - `continuous-research/findings/by-pattern/*.md` — cross-domain patterns

3. **Copyright fence:** F-Secure delivers their own version of this training. F-Secure IPR. **Never import, reconcile, or paraphrase their materials.** Build from first principles + project research + Antti's practitioner experience. All exercises, examples, instructional language must be original.

## Directory structure

```
curriculum/
  content-strategy.md          — training-level arc (MUST stay aligned with module files)
  lecture-guardrails.md        — universal pedagogy
  CLAUDE.md                    — content development rules
  trainings/<name>/            — one file per module, FLAT (no subdirs)
    <slug>.md                  — slug-only filenames. Sequence is renderer array order.
    ...
  exercises/<slug>.md          — shared library, kebab-case slugs
  lectures/<slug>.md           — shared library, kebab-case slugs
```

Exercises and lectures are **shared across all trainings** (Bootstrap, future Mid-Management, future Executive Briefing, etc.). One canonical file per exercise or lecture. Module files compose them by reference.

**Supplementary materials** are a third student-facing content type at `curriculum/supplementary/<slug>.md`. These are multi-section reference documents that build up progressively across modules — too complex to absorb in one sitting. Unlike lectures and exercises, they're NOT inlined into module pages. Modules reference them as prework or homework; students own the complete document as a standing reference after the training. See `curriculum/supplementary/README.md` for the pattern.

**Content-type decision:**
- Can a single 15-min demo or 10-15 min reading deliver this? → **Lecture**
- Is this a bounded activity the participant does? → **Exercise**
- Does the answer need to grow across multiple modules, and serve as a standing reference? → **Supplementary**

## The three-pass build

Work in passes. Finishing Pass 1 for all modules before starting Pass 2 is how you catch arc-level contradictions before they compound into rework.

### Pass 1 — Module index files

The spine for each module. No exercise/lecture content yet.

```markdown
# [Title]

## Big Idea
[One sentence. One idea per module. If you can't state it in one sentence, the module isn't focused.]

## Meta
- **Primary Bloom's level:** [Remember | Understand | Apply | Analyze | Evaluate | Create]
- **Prework:** [list or "none"]
- **Homework:** [list or "none"]
- **Materials (trainer):** [artifacts the trainer brings — CLAUDE.md guardrails, pre-built skills, fabrication prompts, etc.]
- **Plug points:** [where the org inserts its own context]

## What You'll Learn
After this module, you will be able to:
- **[verb]** [specific thing] — verb-led, at the right Bloom's level

## Lectures
- **[Lecture name]** — [one-line description]

## Exercises
- **[Exercise name]** — [one-paragraph description of the arc in prose, not sub-bullets]

## Key Concepts (Emergent)
- [What emerges from doing the exercises. Concepts don't precede exercises.]

## Plug Points
- **[Specific plug point]** — [what the org inserts, default if we provide one]

## Debrief
[The 4th C — Conclusions. Pattern: ~5-minute personal retro run WITH Claude via a pasted prompt. Three questions: what went well, what was tedious, how to store the learnings as reusable context (guardrails, skills, evals — whatever the module's discipline is). Produces an artifact the student carries forward. Student-facing, conversational-prompt style. See `trainings/bootstrap/getting-going.md` for the reference pattern.]

## Bridge
[One sentence. Sets up the next module's question.]
```

### Pass 2 — Exercise + lecture skeletons

One file per entry in the shared library. These are the canonical files.

**Exercise file shape:**
```markdown
# Exercise: [Name]

**What you do:** [clear instruction — a participant reading this should be able to do exactly what it says]
**What happens:** [expected behavior, with a realistic example of output]
**The point:** [why this matters — one or two sentences]
**Facilitator note:** [timing estimate, common questions, watch-for behaviors, decision points for pacing]
**Time:** [e.g., "8-12 minutes"]
```

**Lecture file shape:**
```markdown
# Lecture: [Name]

[Content — under 10 minutes of facilitator talking per the 10-minute rule. Concepts serve the exercise that follows, not an abstract curriculum. Use participants' language from Connections.]

**Time:** [e.g., "8-10 minutes"]
```

### Pass 3 — Full content

Flesh out each exercise and lecture file to facilitator-runnable prose. Add:
- Exact Claude Code commands / interactions
- Expected outputs with realistic examples
- Named failure modes with diagnostic hints
- Time-box every sub-step within the exercise
- Variant markers where audience-specific framing diverges
- Plug point defaults

## Content rules (enforced always)

**Structural:**
- **One exercise = one bounded activity.** Internal arc (do → observe → adjust → observe again) is ONE exercise, not four. Never enumerate E1.1/E1.2/E1.3. Phases of an exercise are prose inside its description, not sub-bullets.
- **No L1.1/L2.1 lecture numbering.** If a module has one lecture, name it. If multiple, name each.
- **One H1 per file** (the title). The print CSS page-breaks before every H1; multiple H1s = awkward empty space.
- **No YAML frontmatter** in module/exercise/lecture files. The renderer passes content straight to `marked.parse()`; any `---` block renders as a horizontal rule.
- **Basic markdown only.** Paragraphs, headings, lists, tables, fenced code, blockquotes, inline emphasis, links. No raw HTML blocks, no Mermaid, no admonition plugins, no MDX.
- **Kebab-case filenames** with no numbers. Example: `raw-llm.md`, `context-is-king.md`. Sequence comes from the renderer array; reordering is a one-line change.
- **Include-links** use the exact form `[Text](exercises/slug.md)` or `[Text](lectures/slug.md)` on their own paragraph. Anything else is a regular link.
- **Cross-module links** use `curriculum.html?training=<name>&module=<slug>`. Relative markdown paths break because they resolve from the HTML page, not the markdown file.
- **All pages link (renderer-enforced).** When a module page inlines an exercise or lecture via include-link, the renderer linkifies the inlined H1 to the standalone view. Module pages get prev/next/all-modules navigation at the bottom. Standalone files get a "back to curriculum" link. Authors don't write these links — the renderer adds them. Don't fight the renderer.
- **No images** in this pass. If a module needs an image, flag it and the renderer gets a path-rewriting step.
- **Short blockquotes.** The print CSS applies `page-break-inside: avoid`; a 40-line blockquote leaves a huge PDF gap.

**Pedagogical:**
- **Claude Code specific.** Exact interactions, expected outputs, troubleshooting. Not tool-agnostic.
- **Exercise-led, not lecture-led.** Concepts emerge from doing. Never explain before the exercise demonstrates.
- **Real data, not toy data.** Participant's own profile, policies, domains.
- **Failure is the teaching moment.** Design exercises that fail in instructive ways (Module 1 fabrication, Module 4 compliance violation, Module 5 hallucination).
- **Don't assume craft. Provide scaffolds.** If an exercise asks the participant to produce an artifact type they haven't built before (LLM-as-judge prompts, skills files, eval criteria, handoff formats), include an inline scaffold, OR a worked example from an adjacent domain they can adapt, OR an explicit pointer to the earlier exercise that built the same artifact. Participants don't create patterns from thin air. Any exercise that expects them to do so fails on the "Scaffold / worked example provided" judge.
- **Riff on recognized business frameworks.** Exercises anchor new LLM skills on frameworks participants already know (StoryBrand, strategy-as-assumptions, Toyota Kata, Voice of Customer, Jobs-to-be-Done, Double Diamond, principle of least privilege, etc.). Three reasons: (1) **cognitive economy** — participants don't learn two new things at once; LLM behavior hangs on a familiar hook. (2) **Transferability** — they carry both the AI skill and the framework back to work. (3) **Engagement** — best-in-class frameworks beat generic toy exercises. Examples currently in the curriculum: Module 1 riffs on StoryBrand's buyer-guide + mirror positioning. Module 6 riffs on strategy-as-assumptions + LLM-as-judge as steering instrument. Future modules should name their framework at design time.

### Prompt design rules (for any prompt participants copy into Claude Code)

- **No placeholders mid-prompt.** Don't write `[BRACKETS]` inline that the participant must find-and-replace. Not `[paste or attach]`, not `[your content]`, not `[DIMENSION NAME]` — none of these belong inside a prompt block the student is supposed to copy. Inline editing in Claude Code is tedious. **Every placeholder inside a code fence is a rule violation; check every prompt block you ship.** Handle variable content one of three ways:
  1. **Conversation before** — Claude asks for the values, then assembles the prompt internally
  2. **Conversation after (preferred for simple input)** — the prompt instructs Claude to ask the participant for the values in turn
  3. **Copy-paste right after the prompt** — user copies the prompt, then pastes the data (or attaches a file) as a separate step. The prompt references "the X I just shared" or "the X I'll paste next."
- **Long prompts OK** up to ~1 page. Paragraph structure mandatory for readability.
- **Prefer questions over slots.** If the agent needs simple input, it asks. Don't make the participant edit the prompt.
- **"Add X and regenerate" is a trap.** When X should shape the OUTPUT (voice, stance, framing), "add X" reads as "append X as a new section." Claude will grow a bullet list and call it done. Instead say: "rewrite using X as voice-shaping context" or "let X change how the output SOUNDS." Be explicit: is X getting APPENDED (a new section) or INTEGRATED (the whole thing gets rewritten through X's lens)? Name it.
- **Vary closings deliberately.** Each mechanic has different strengths; pick per exercise:
  - **Claude-as-cold-critic** — reproducible, structured, produces an artifact. Use when feedback quality matters. Foreshadows LLM-as-judge.
  - **Pair exchange** — social energy, quick, unexpected angles. Use for bonding or when individual domain expertise matters. Variable quality.
  - **Group discussion** — collective pattern-finding. Use when the room sees what no one alone can (multi-agent, cross-pollination exercises).
  - **Solo retro with Claude** — private learning extraction. Good for module debriefs.
  - **Show-your-work to the room** — public ownership moment. Use for artifact-producing exercises where the reveal matters.

  Don't default to any one. When designing a close, ask: *what does this exercise actually need — structured feedback, social bonding, collective insight, private extraction, or public ownership?* Then pick. "Talk to your neighbor" is not a free pass; neither is "ask Claude for feedback."
- Reference pattern: the "Help me build a steering eval judge" prompt in `curriculum/exercises/steering-eval.md`.
- **Incremental complexity.** Each exercise adds one thing. Never two new concepts in one exercise.
- **Four pillars woven through**, not bolted on: LLM-based, secure, lifecycle, reliable.

**Voice and style:**
- **Main body writes TO the student about their journey.** The reader of a lecture or exercise file is the student — not the facilitator. No facilitator instructions in the body (*"To the room,"* *"Have pairs discuss,"* *"Hear one or two out loud"*). Those are script directions and belong in facilitator notes (deferred artifact). The student-facing text speaks directly: *"You'll see…"*, *"Take a guess."*, *"Paste this prompt."*
- **Trailing sections below a `---` horizontal rule are fine.** That space holds editorial metadata (TODOs, iteration log) AND facilitator notes (watch-fors, timings, decision points) for now. Facilitator notes will be extracted to a dedicated artifact later — don't mix them into the student-facing body. The `---` separator is the boundary between "for the student" and "for the production/delivery system."
- **Flavor: Seth × Rory × Risto, not dry textbook.** Builder voice ≠ dry voice. Target:
  - **Seth Godin** — gifts-first warmth, kindness as the goal. Short sentences that don't talk down.
  - **Rory Sutherland** — counterintuitive reframes, wit, sideways looks. If the obvious take is obvious, find the weird one.
  - **Risto Siilasmaa** — epistemic honesty. *"We don't know where this is going. Nobody does."* Naming uncertainty is the source of trust.
  - **Questions to the reader are welcome** — sprinkled, not flooded. *What changed? Where does this break? Ever noticed that...?*
  - **Dryness is a failure mode.** A sentence that makes the reader smile lands harder than three that explain.
- **Second person.** "You" not "the participant" and not "the room."
- **Builder style.** Confident, direct, punchy. "Let's build. You build." See `memory/copy-taste.md`.
- **General facts stated as facts.** "Claude reads the whole conversation every time." Not "the facilitator will explain that Claude..."
- **No jargon without earning it.** Every technical term introduced through an exercise that makes it obvious.
- **No motivational padding.** "AI is transforming the world" — everyone knows. Start with what they're about to do.
- **No overview or summary sections.** TBR 4 Cs (Connections, Concepts, Concrete Practice, Conclusions) handle opening and closing.
- **No further-reading lists.** If it matters, it's in the module.

## Alignment duties (proactive, not reactive)

When editing a module file, check and update in the same edit:

1. **`curriculum/content-strategy.md`** — the Exercise bullet in the matching module section must have the same name and description as the module file. Drift between these two is a process bug, not an aesthetic choice.

2. **`site/curriculum.html`** — the TRAININGS array. If a module is renamed, added, removed, or reordered, update the corresponding entry. Reorder = move one line in the array, nothing else.

3. **`memory/MEMORY.md`** — if a module title is referenced there (search for the old title), update it.

4. **`curriculum/CLAUDE.md`** — if you change a structural rule (three-pass build, include-link convention, filename format), update the docs in the same edit.

Before closing any significant edit, run a grep for known sibling references:

```bash
grep -rn "<old thing>" curriculum/ site/curriculum.html memory/MEMORY.md
```

## Variant framing (audience-specific content)

80% of content is shared across training variants. The other 20% — Connections questions, Conclusions prompts, "What This Unlocks" framing — adapts to the audience. Mark variant-specific content explicitly:

```markdown
> VARIANT: [audience] — [what changes here]
> Default (Bootstrap): [the default version]
> Mid-Management: [the variant version]
```

Exercises themselves are universal — same tech, same mechanics. Reflections are audience-specific — a builder asks "will this agent work?" while a mid-manager asks "will my team adopt this?"

**Never fork files per variant.** Variants live inside the file with VARIANT markers. Forking = guaranteed drift.

## Adding a new training variant

1. Create `curriculum/trainings/<name>/` directory.
2. Add a TRAININGS entry in `site/curriculum.html`:
   ```js
   <name>: {
     label: '<Display Name>',
     lede: '<one-line description>',
     modules: [
       { slug: '<slug>', title: '<Title>' },
       ...
     ]
   }
   ```
3. Create module files that compose from the shared library via include-links.
4. Audience-specific framing via VARIANT markers.
5. Update `curriculum/CLAUDE.md` if the variant introduces new structural patterns.

## Verification after writing

### Structural checks (every file)

1. Start the local server: `python3 -m http.server 8000` from repo root.
2. Browser check: `http://localhost:8000/site/curriculum.html?module=<slug>` — renders cleanly.
3. Print check: Cmd+P → Save as PDF — clean pagination, no chrome.
4. Include-link resolution: if you added include-links, verify the referenced files exist in the library. Missing files render as plain links (no error), but that's rarely intended.
5. Cross-module spot-check: open 2-3 other modules to make sure the edit didn't break anything.

### Eval-driven quality (lectures and prework)

Lectures must pass the lecture eval before going to Antti:

1. Read `curriculum/evals/lecture.md` — the reusable eval system.
2. Fill in the module-specific slots (Big Idea, learning goals, previous/next module, exercises to set up, primary leap test). Save the instance at `curriculum/evals/instances/<training>--<module-slug>.md`.
3. Run the LLM-as-judge prompt at the bottom of that file. Give it the filled eval + the lecture draft.
4. Three verdicts:
   - **APPROVE** — all judges pass. Done.
   - **APPROVE WITH TODOs** — essential judges pass; contributory judges (Voice, Length, Specificity) may fail. Append a TODO section to the lecture file listing the deferred items. **Good enough. Ship.**
   - **REVISE** — essential judges fail or auto-fail red flag triggered. Fix and re-run.
5. Show to Antti for taste review. Antti catches what evals can't.
6. Antti may flag something not caught — that means the eval is missing a judge. Add it, re-run.

**Good enough > polished.** Per the 2026-04-17 rule: content serves a purpose. If essential judges pass and only contributory judges fail, mark the TODOs and move on. Don't polish past "good enough" unless the content's purpose demands it — expand elsewhere instead.

**The eval is part of the pedagogy, not a formality.** Using steering evals to build a steering-evals lecture is the Module 8 flywheel.

Exercise evals (for Pass 2/3 exercise files) are a future extension of this system — same pattern, different judges (does the exercise work, does it reliably produce the teaching moment, is the facilitator briefing complete).

### TODO / ERROR markers in content

Per the same rule: both the generation system (lecture / exercise files) and the eval system (eval instance files) can leave explicit TODO or ERROR markers for later pickup. These are first-class artifacts, not shameful debt.

Conventions:
- Append a `**TODO (from eval pass YYYY-MM-DD — ...):**` section at the bottom of a lecture file when it ships with deferred items.
- Log the eval run result at the top of the instance file (`**Eval runs:**` section).
- Visible during internal iteration; clean up before customer-facing delivery.

## Red flags (stop and rethink)

- You wrote more than one bullet under `## Exercises` for phases of a single activity
- Your exercise has sub-bullets labeled E1.a, E1.b, step-1, step-2 …
- Your module file has a `---` YAML block at the top
- Your exercise file references "Module N" internally — exercises are training-agnostic; use slugs or narrative references
- You used underscores or numbers in a slug
- You copied language or structure from F-Secure materials, competitor materials, or any vendor training
- You changed an exercise name but not its mirror in `content-strategy.md`
- You added images without a plan to add path rewriting to the renderer
- You used `![image](./foo.png)` — not supported yet
- Your module has more than one H1

## When the rules feel restrictive

That's a signal to upgrade the renderer or the conventions — not to bend the rule with a workaround that only some files follow. If you reach for frontmatter, Mermaid, images, multiple H1s, or anything the renderer doesn't handle — flag it. Don't silently add it.

## Summary in one sentence

Write curriculum as a shared library (`exercises/` + `lectures/` + `trainings/<name>/`), in three passes (index → skeleton → full), following the structural and pedagogical rules, and update every sibling file in the same edit.
