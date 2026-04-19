---
name: content-creation
description: Create or revise curriculum content for Agents 102 (modules, exercises, lectures). Use when writing a new module/exercise/lecture, reshaping existing content, creating a new training variant, or reviewing whether content follows project rules. Enforces the three-pass build, the one-exercise-per-module principle, include-link conventions, and content-strategy ↔ module file alignment.
---

# Content Creation — Agents 102 Curriculum

This skill owns generation-time rules — the "doing" rules. For architecture (directory structure, include-links, material distribution, orchestrator pattern, Claude Code behavior verification), see `curriculum/CLAUDE.md`. For pedagogy (Bloom, 4 Cs, emergent knowledge/control/leadership, audience, throughlines, module reusability), see `curriculum/lecture-guardrails.md` — read before designing a module.

Use this skill when the user asks to write or revise curriculum content: a module, exercise, lecture, a new training variant, or a review pass.

## Strategy-first generation — non-negotiable

**Every piece of content aligns to strategy before you touch words.** Strategy-first is not a step; it is the frame around every step. Before drafting a lecture, exercise, prework, or homework, you must already know:

1. **Which module** this belongs to, and its *big idea* from `content-strategy.md`.
2. **Which mood** this module is engineered to produce — see the "Mood (deliberate)" paragraph at the top of each module's section in `content-strategy.md` and the "mood arc (M1 → M6)" synthesis section. The mood is the contract. An edit that makes M3 feel resolved, M4 feel tidy, M7 feel like governance, or M8 feel like a graduation ceremony is wrong *by strategic design*, not by taste.
3. **Where it sits in the 8-module rhythm** — joy → compound → unease → deeper unease → rescue → leverage → generosity → awe. Each module's mood feeds the next; resolving a mood too early steals the next module's teaching moment.
4. **Which canonical strategic structures** it honours when the module has them. M7 ships the **four sharing strategies** (share the context / a skill / the output-push / an interface-pull). "Share the whole agent" is *not* on the list — it's the vendor pitch, and promoting it in student-facing text violates strategy. When a module's strategy section names a canonical structure, use it verbatim; don't reinvent.

If you can't answer those four questions before writing, stop and read `content-strategy.md` until you can. Strategy isn't the frame you impose on content after drafting; it's the frame that decides what to draft.

## Session start — read this first

Before touching anything, read in this order:

1. **`curriculum/content-strategy.md`** — **start here, not buried at #3 as before.** Training-level arc + mood-arc synthesis (M1 → M8 emotional shape) + per-module "Big idea" and "Mood (deliberate)" + **State of play** at the bottom. This is the strategic contract everything else serves.
2. **`curriculum/CLAUDE.md`** — architectural rules (directory structure, module file shape, include-links, F-Secure fence, material distribution, Claude Code behavior verification).
3. **`curriculum/lecture-guardrails.md`** — pedagogical rules (Bloom, TBR 4 Cs, emergent knowledge/control/leadership, audience, throughlines, module reusability).
4. **`philosophy.md`** (repo root) — the 19 beliefs. Philosophy is the spine. Callouts are sparing.

Then check `continuous-research/insights.md` and relevant domain findings before writing — per heuristic 11 (consult research before curriculum work).

**Verify locally:** `python3 -m http.server 8000` at repo root, open `http://localhost:8000/site/curriculum.html`.

## Module session runtime — 1h45 target

Every Bootstrap module session targets **1h45 of facilitated content** (Connections → Lecture → Exercise → Debrief → Bridge). This fits a 2-hour calendar invite with ~15 minutes of buffer at start and end for joining, transitions, and overrun.

**The 1h45 budget (defaults):**

| Phase | Target | Role |
|---|---|---|
| Connections | 8–12 min | Warm-up question, room banter, pulls threads from prior module |
| Lecture | 10–15 min | Concepts primed, foreshadowing the exercise, compound math / frames landed |
| Exercise | 55–70 min | The substance — multi-phase, banter-inclusive, artifact-producing |
| Debrief | 12–18 min | Retro-with-Claude + show-and-tell across the room; named artifact saved |
| Bridge | 3–5 min | One-sentence handoff to next module, question lingers |
| **Total** | **~105 min** | **= 1h45** |

**What the extra time buys over a 60–75 min module:** richer exercises with multiple loops, room for pair discussion and banter (banter IS part of the learning — *"look at what mine produced"* is where pattern recognition consolidates), longer Debrief for cross-room comparison, and slack when something goes wrong in Claude Code and the facilitator needs to recover without losing the teaching moment.

**Do not compress to fit a shorter slot.** If a customer wants 45-minute sessions, that's a variant with different exercise design (single-loop, less banter, no Debrief) — not the Bootstrap module trimmed. Mid-Management and Executive-Briefing variants will have their own runtime contracts.

**Exercises in the shared library carry a 55–70 min target** when used inside a full Bootstrap module slot. Shorter exercises (20–30 min) are for drop-in use in other training formats or as warmups; they have different eval criteria (faster-to-insight, single artifact).

**Lectures stay compact (10–15 min).** A longer lecture usually means the exercise isn't carrying its own weight — move concepts into the exercise's teaching moments rather than into more lecture minutes.

## The canonical generation pattern (PDCA loop)

Every piece of curriculum content — lecture, exercise, or module — goes through this loop. Do the steps in order. Skipping a step is how sessions drift.

**Plan:**
1. **Antti's input** — what to build, why, any constraints or principles he's adding this turn.
2. **Strategy alignment (mandatory first)** — read the relevant module's section in `curriculum/content-strategy.md`, INCLUDING its *Big idea* and *Mood (deliberate)* paragraphs. If this piece changes the arc, update content-strategy in the same edit. **Mood check:** state in one sentence what emotional state the student should leave this piece in, and how it sets up the next piece. If you can't state it, you haven't read enough strategy yet. Proactive alignment, not reactive — sibling files (module spine, content-strategy, eval instance, state of play) update in the same edit, not later.
3. **Check / agree on evals** — propose the eval judges (contributory ones inferred from patterns; primary "leap test" steered by Antti). Update the eval template (`curriculum/evals/lecture.md` or `exercise.md`) if a missing judge is discovered. Save the filled instance to `curriculum/evals/instances/<training>--<slug>.md`. **Mood-aware eval:** if the module's strategic mood is unease or complexity, the eval's "leap test" should reward the unease, not punish it. A 7/10 artifact in M3 is the target, not a shortfall.
4. **Check learning goals** — pull the Bloom-tagged LOs verbatim from the module file into the eval instance. The LOs are the contract; the eval is the measure; the content must satisfy both.

**Do:**
5. **Generate / edit** — write, following the content rules below. For prompts participants will copy, follow the prompt design rules.

**Test:**
6. **Simulate / test** — before the formal eval, run through the artifact as if you were a student. Role-play a persona, follow the instructions, make up realistic content, and report where things break. See "Simulation protocol" below.

**Check:**
7. **Eval** — run the LLM-as-judge on the draft. Antti does the taste review on top. Three possible verdicts: **APPROVE**, **APPROVE WITH TODOs** (essentials pass, contributory items deferred — good enough, ship), **REVISE**.

**Act:**
8. **Learning + system improvement** — if simulation or eval missed something Antti caught, or a new principle emerged, update the system in the same turn: eval template, simulation protocol, this SKILL.md, `curriculum/CLAUDE.md`, `memory/self-review-protocol.md`, `memory/MEMORY.md`. The system should be smarter at the end of each cycle than at the start.

**This pattern generalizes beyond curriculum.** Articles, research findings, future trainings all follow the same shape: *input → plan → measure → contract → make → evaluate → improve*.

## The mood arc — load-bearing constraint

The 8-module Bootstrap arc has an engineered emotional progression. Authors MUST honour it; resolving a mood early steals the next module's teaching moment.

| Module | Mood | Quote | Failure mode (wrong edit) |
|---|---|---|---|
| M1 | Joyful creation | *"I made this. It's me."* | Making it feel like a technical warm-up |
| M2 | Satisfied compounding | *"It runs while I sleep."* | Making it feel like tool setup |
| M3 | Unsettled competence | *"I wonder if this is right?"* | Resolving the doubt with verification or a clean artifact |
| M4 | Deepened unease | *"Damn, this is complex stuff."* | Making security feel tidy or solved |
| M5 | Mechanical rescue | *"Ahh, this is actually fixable."* | Premature rescue (M3/M4 haven't stewed long enough) |
| M6 | Unleashed leverage | *"We can automate the loop."* | Making evals feel like compliance testing |
| M7 | Generous impulse | *"This is starting to work. I wonder if others could benefit?"* | Making sharing feel like a governance chore |
| M8 | Awe and curiosity | *"Oh shit. Where is this all going?"* | Making it feel like a tidy graduation ceremony |

**One-line rhythm:** joy → compound → unease → deeper unease → rescue → leverage → generosity → awe. Build, doubt, fix, scale, wonder.

**In practice:**
- Before writing a Debrief, Close, or Bridge, check which mood this module must leave the student in, and which mood the next module picks up.
- "Does it feel right to be uncertain here?" is a valid design question when the strategic mood is unease.
- Do not add verification, check-this-URL, or fix-the-bug steps to a module whose mood is sustained doubt. Checking resolves doubt; doubt is the curriculum.
- Do not front-load the rescue. M5 is the rescue module; M3/M4 are not.

## The four sharing strategies (Module 7 canonical)

Module 7 ships with four named strategies that practitioners actually use:

1. **Share the context.** Teammates get your `brain/`, `sources/`, `CLAUDE.md`, `style.md` and build their own agents on top.
2. **Share a skill.** Extract one scoped capability as a skill file; teammates plug it into their agents.
3. **Share the output (push).** Deploy on a schedule; output lands where the team sees it.
4. **Share an interface (pull).** Wrap the agent in a Slack bot / Teams @mention / web form / endpoint; teammates invoke on demand.

**"Share the whole agent" is not on the list.** It's the vendor pitch that doesn't hold up in practice. Any student-facing text that frames the M7 goal as "package your agent for others" violates strategy; replace with the four-strategy framing. Vendors sell agent marketplaces; practitioners share at context, skill, output, or interface layer.

## Trust the prompt over scaffolds

For exercises where the student is already working in Claude Code with a populated working directory, **prefer a well-crafted prompt over a pre-built scaffold file**. Students should *produce* agent files, rules files, and structure through the exercise — not unzip them. Scaffolds earn their keep when a module needs a trainer-authored artifact the student wouldn't produce themselves (Module 4's compliance skills, Module 2's initial empty `sources/brain/agents/` folders). Outside those cases, a one-page prompt does the job better: the student experiences the creation move, the artifact inherits their voice, and the training ships lighter.

**Rule of thumb:** if the scaffold file contains text the student should have written in their own voice, it's wrong. Convert to a prompt that produces it.

## Simulation protocol

Use this to run the simulate/test step (step 6).

**When to use:** After a first draft of any exercise (required) or lecture (optional — less useful for demo-script lectures; more useful for prework-reading). Before the formal eval. Can be repeated with different personas.

**How to run:** Launch a general-purpose agent with the prompt template below. Give it the target file path(s) and a persona. It role-plays through the exercise, makes up realistic content, and reports.

**The persona is never alone.** Bootstrap exercises are facilitated in two modes — *in-room* (human trainer) and *self-study* (Teacher Claude running in a side session, configured by the `/self-study` skill to nudge the student through the 4 Cs). **Default simulations to self-study mode** unless the prompt explicitly names in-room. Teacher Claude covers the facilitator role: it asks *"find me one row the judge got wrong"* when the student rubber-stamps Phase 3, pushes on ambiguous artifacts, runs the Debrief. A simulation that penalises an exercise because *"the solo SVP has no facilitator nudge"* is simulating the wrong setup — the SVP has Teacher Claude. Name Teacher Claude explicitly in the persona block so the simulator accounts for it, and tell the simulator to surface nudges Teacher Claude would make at each phase.

**Mood judge — scored alongside mechanics.** Per the eval rubric, every exercise is scored 1–10 for mood landing at each phase-end and at close (8+/10 required). The simulation must report the mood score per beat and name what steals the mood where it drops below 8. A 7/10 is the facilitator-premium signature — meaning the mood lands in a trainer-facilitated room but frays elsewhere; treat 7 as "find what's stealing the mood," not "good enough."

**Prompt template** (copy this into the agent invocation):

```
You are simulating a student running a curriculum exercise for Agents 102. Role-play a typical participant, follow the exercise instructions end to end, and report where things break. Independent judgment — the author won't see your reasoning.

TARGET EXERCISE: [file path]

PERSONA: [describe — role, seniority, LLM fluency, business context. Example: "SVP of HR at a 500-person Nordic software company. Has used ChatGPT weekly for drafting emails and performance reviews. Never built an agent, never used Claude Code before today. Arrived at this exercise having watched the Context is King lecture 15 minutes ago."]

DELIVERY MODE: self-study. Teacher Claude is running in a side session (configured by the /self-study skill) and plays facilitator — it nudges through the 4 Cs, pushes on ambiguous artifacts, runs the Debrief, and catches rubber-stamping (*"find me one row the judge got wrong"*). Account for Teacher Claude at every phase; the student is NOT alone.

MODULE MOOD CONTRACT: [state the module's deliberate mood — e.g., "Module 6 is unleashed leverage; student should leave feeling 'we can automate the loop.'" Pull from content-strategy.md per-module Mood (deliberate) paragraph.]

ASSUME you have completed any prior module/lecture setup the exercise references.

FOR EACH PHASE:
1. Describe what you would paste or do — make up realistic content in your persona's voice
2. Predict what Claude would likely return — use your knowledge of how Claude behaves
3. Note what Teacher Claude would nudge on in the side session for this phase
4. Flag any moment you're confused, stuck, or unsure what the exercise wants
5. Flag any moment Claude's likely output wouldn't match what the exercise assumes
6. Record the state after the phase — what artifact you now have
7. **Mood score 1–10** at phase-end + one-line note on what the student is feeling (match against the module mood contract; flag drift)

AT THE END, report:
- **Top 3 places the exercise could break** (specific, with phase)
- **Top 3 ambiguous instructions** (quote them)
- **Any under-scaffolded phase** where even Teacher Claude can't recover (distinguish from phases that only need facilitator nudging — those aren't breakage)
- **Overall "this is me" / artifact quality rating** 1–10
- **Mood summary**: score per phase + close, and a one-line *"what's stealing the mood"* note for any beat below 8. 8+/10 at every beat is the bar. 7 = facilitator-premium signature; say what would take it from 7 to 8.
- **Arc flow** — does one phase feed the next?
- **Claude-behavior mismatches** — specific places where Claude's style clashes with exercise assumption

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
- **Reading burden / manual error-catching** — don't ask the student to manually read Claude's output to verify it, spot mistakes, or diff versions. That's busywork for a business audience and it foreshadows exactly the wrong lesson. Fix: ask Claude to audit Claude's work — have the student write the audit prompt, Claude runs it, results land as a list the student acts on. Reading for *emotional payoff* (feeling the citations land, feeling the output sound like your company) is different and stays. The banned pattern is "read this to check if Claude got it right." That job belongs to Module 5 (quality) and Module 6 (evals) methods, which Module 2's verification moments should foreshadow, not pre-empt.
- **Niceness tax** — Claude's RLHF softens edgy claims during regeneration (hate-flips become generic virtues, anti-positioning becomes collaborative leadership). Fix: prompt explicitly says "keep the edge — don't soften stances."
- **Question dump** — when asked to "ask these questions in turn," Claude sometimes dumps all questions at once. Fix: prompt says "ask one, wait for my answer, then ask the next."
- **Overwrite anxiety** — when regenerating an artifact, Claude may ask "overwrite or create new?" Fix: prompt specifies the default ("overwrite the existing file").
- **Preamble before action** — Claude narrates what it's about to do before doing it; can disrupt a "clean question-by-question rhythm" assumption. Fix: assume it will happen; design around it.
- **Append-vs-integrate default** — when told "add X to context and regenerate," Claude often appends X as a new section rather than rewriting the existing output through X's lens. Simulation tell: the output grows a "What I love" / "How I help" section instead of the whole voice shifting. Fix: prompt must explicitly say "rewrite using X as voice-shaping context" when integration is the goal.
- **Plan-mode preamble bloat** — even in plan mode, Claude opens the plan with 2–4 sentences of *"I'll now read your sources and propose…"* scene-setting before the actual plan. Eats participant attention; they skim the plan. Fix: design around it — prime the student to scroll past preamble to the proposed list, or add "go straight to the plan, no preamble" to the prompt.
- **Citation-gap asymmetry** — with an explicit "cite or flag" rule, Claude abides for specific company claims but skirts the rule on conventional-wisdom claims (generic competitive knocks, industry truisms). The model treats "obvious" claims as not needing citation. Simulation tell: sourced claims + one or two uncited generic lines in the same output. Fix: either add "this includes conventional-wisdom claims" to the rule, or design the exercise to notice the gap as the teaching moment.
- **Self-report inflation** — when asked to report what changed, Claude over-claims change. Lists four pages as sharpened when two got longer. The self-report is the LEAST trustworthy part of the output. Fix: never trust Claude's own summary of its work — instruct the participant to verify directly (open the file, read the top paragraph) and give them a literal push-back prompt.
- **Default-acceptance on offered defaults** — when a prompt offers "default rules if you don't have your own," ~90% of participants take the defaults verbatim without customization. Fix: explicitly nudge customization — "Pick at least one you'd change" — or structure so the default is a starting point, not a free pass.
- **Plan-mode approval inflation** — multi-page plans (7+ items) get rubber-stamped because the plan *looks* structured; participants approve without reading. The plan is exactly the moment that deserves close reading, and participants treat it as a form to sign. Fix: design the prompt to force a pushback — "suggest three topic merges you'd recommend" / "mark any page likely to be soft" — before approval. The act of answering back is what creates real reading.
- **Source-type blindness on ingestion** — Claude silently ingests dense slideware (PPTX, PDF exports of decks) and derives claims from slide titles only. The brain ends up shallow on those sources; Claude doesn't report the thinness. Fix: either tell participants to convert slide-heavy sources to text before ingestion, or add an explicit extraction-depth check to the audit prompt ("for each source file, rate how much content you actually extracted — 1-10").
- **Citation cargo-cult** — Claude dutifully cites `brain/x.md` in outputs, but the cited file may not actually contain the specific claim. Citations become performative: the format is right, the substance isn't verified. Especially common on conventional-wisdom claims (pattern #3, citation-gap asymmetry). Fix: periodic integrity check — "for each cited claim in the output, quote the sentence in the brain file that supports it."
- **Self-audit charity** — when Claude is asked to critique its own work, it under-flags problems. "Pick 3 generic pages" returns 2 (with reality being 4). Charitable-by-default is the RLHF legacy. Fix: prompt the audit to over-flag — "be harsher than you think necessary," "flag at least N" — or have the audit run in a fresh session with no memory of having produced the work.

**Prework-specific patterns** (from first prework simulation, 2026-04-17):
- **Install cliff** — "install Claude Code" is a 25-min side quest if you land on the CLI path with no Node. For non-developer audiences, specify **desktop or web** explicitly. "No terminal required" is a real affordance worth stating.
- **Connector admin gate** — Microsoft 365 / Google Workspace connectors often need tenant admin consent. A builder leader can't self-serve through this on a Sunday. Every connector instruction needs a **fallback path** (screenshot-paste, CSV export, manual copy) that works without admin.
- **Ghost file references** — referencing `foo.md` in prework when `foo.md` doesn't exist yet is a hard fail. Either ship the file (write the section, even if minimal) or inline the content. Don't reference files that live in a future pass.

**Multi-persona simulation:** for high-stakes exercises, run 2-3 simulations with different personas (CTO, marketing lead, HR director) to surface persona-specific breakage. Not required for every exercise.

### Student-facing first, facilitator notes later

A lecture or exercise file contains both student-facing content (what the room sees and does) and facilitator notes (timing, watch-fors, decision points, pacing). **Generate the student-facing content first.** Get the demo, the priming, the teaching moment, the transition right. Facilitator notes are a later pass — added when the content stabilizes.

Why: iterating on facilitator pacing while the student content is still in flux is wasted work. The demo changes → the timing estimates are wrong → the watch-fors are wrong. Lock the content; annotate the delivery second.

The exercise eval's "Facilitator briefing complete" judge applies at Pass 3 completion, not at first draft. A first-draft lecture or exercise can ship APPROVE WITH TODOs where the TODO is "add facilitator notes."

## The three-pass build

Work in passes. Finishing Pass 1 for all modules before starting Pass 2 is how you catch arc-level contradictions before they compound into rework.

### Pass 1 — Module index files

The spine for each module. No exercise/lecture content yet.

Use the canonical template in `curriculum/CLAUDE.md` → **Module File Shape** — architectural source of truth. Pass-1-specific guidance that overrides or refines the template:

- **Big Idea:** one sentence, one idea per module. If you can't state it in one sentence, the module isn't focused.
- **What You'll Learn:** LO verbs lead; phrased at the right Bloom's level.
- **Lectures / Exercises (Pass 1 form):** bullet list with one-line description for lectures, one-paragraph prose description for exercises. Include-links arrive in Pass 2 when the referenced files exist.
- **Debrief:** the three retro questions shift to the module's discipline (Module 4 "what should be a skill," Module 6 "what should be an eval," etc.), not universally "guardrails."

### Pass 2 — Exercise + lecture skeletons

One file per entry in the shared library. These are the canonical files.

**Exercise file shape:**
```markdown
# Exercise: [Name]

**What you do:** [clear instruction — a participant reading this should be able to do exactly what it says]
**What happens:** [expected behavior, with a realistic example of output]
**The point:** [why this matters — one or two sentences]
**Facilitator note:** [timing estimate, common questions, watch-for behaviors, decision points for pacing]
**Time:** [e.g., "55-70 minutes" for Bootstrap module slot; "20-30 minutes" for drop-in use]
```

**Lecture file shape:**
```markdown
# Lecture: [Name]

[Content — 10-15 minutes of facilitator talking, inside a 1h45 Bootstrap module. Concepts serve the exercise that follows, not an abstract curriculum. Use participants' language from Connections.]

**Time:** [e.g., "10-15 minutes"]
```

### Pass 3 — Full content

Flesh out each exercise and lecture file to facilitator-runnable prose. Add:
- Exact Claude Code commands / interactions
- Expected outputs with realistic examples
- Named failure modes with diagnostic hints
- Time-box every sub-step within the exercise
- Variant markers where audience-specific framing diverges
- Plug point defaults

## Content rules — structural

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

## Content rules — pedagogical

- **Claude Code specific.** Exact interactions, expected outputs, troubleshooting. Not tool-agnostic.
- **Exercise-led, not lecture-led.** Concepts emerge from doing. Never explain before the exercise demonstrates.
- **Real data, not toy data.** Participant's own profile, policies, domains.
- **Failure is the teaching moment — in training.** Design exercises that fail in instructive ways (Module 1 fabrication, Module 4 compliance violation, Module 5 hallucination). **But design failure OUT of prework and setup.** Training-day failures are witnessed by a facilitator, debugged in the room, and land as learning. Prework failures happen on a Sunday evening with no recovery — the student loses the thread before Module 1 starts. Different domain, opposite rule: training = productive failure; prework/setup = smooth path with fallbacks named.
- **Don't assume craft. Provide scaffolds.** If an exercise asks the participant to produce an artifact type they haven't built before (LLM-as-judge prompts, skills files, eval criteria, handoff formats), include an inline scaffold, OR a worked example from an adjacent domain they can adapt, OR an explicit pointer to the earlier exercise that built the same artifact. Participants don't create patterns from thin air. Any exercise that expects them to do so fails on the "Scaffold / worked example provided" judge.
- **Riff on recognized business frameworks.** Exercises anchor new LLM skills on frameworks participants already know (StoryBrand, strategy-as-assumptions, Toyota Kata, Voice of Customer, Jobs-to-be-Done, Double Diamond, principle of least privilege, etc.). Three reasons: (1) **cognitive economy** — participants don't learn two new things at once; LLM behavior hangs on a familiar hook. (2) **Transferability** — they carry both the AI skill and the framework back to work. (3) **Engagement** — best-in-class frameworks beat generic toy exercises. Name the framework at design time.
- **Incremental complexity.** Each exercise adds one thing. Never two new concepts in one exercise.
- **Four pillars woven through**, not bolted on: LLM-based, secure, lifecycle, reliable.

## Prompt design rules (for any prompt participants copy into Claude Code)

- **No placeholders mid-prompt.** Don't write `[BRACKETS]` inline that the participant must find-and-replace. Not `[paste or attach]`, not `[your content]`, not `[DIMENSION NAME]` — none of these belong inside a prompt block the student is supposed to copy. Inline editing in Claude Code is tedious. **Every placeholder inside a code fence is a rule violation; check every prompt block you ship.** Handle variable content one of three ways:
  1. **Conversation before** — Claude asks for the values, then assembles the prompt internally
  2. **Conversation after (preferred for simple input)** — the prompt instructs Claude to ask the participant for the values in turn
  3. **Copy-paste right after the prompt** — user copies the prompt, then pastes the data (or attaches a file) as a separate step. The prompt references "the X I just shared" or "the X I'll paste next."
- **Long prompts OK** up to ~1 page. Paragraph structure mandatory for readability.
- **Prefer questions over slots.** If the agent needs simple input, it asks. Don't make the participant edit the prompt.
- **Trust Claude's defaults for output shape.** Don't pad prompts with trailing specifications like *"The file should have a clear title, a Rules section, a Never line, plain markdown, no header block."* Claude infers that from the role and the question set. Specify shape ONLY when the teaching moment depends on it (e.g., a specific scoring format for an eval judge). Otherwise end with destination + "show me before saving." Long prompts look intimidating to business readers and train them to over-specify their own prompts — the opposite of what Module 2 teaches.
- **Main body = golden path only. Troubleshooting goes elsewhere.** Don't inline "if sign-in fails with admin approval, ask IT…" or "if Claude fires all questions at once…" or "if you skipped plan mode by accident…" in the student-facing body. Those are defensive pre-emptions that bloat the happy path and tell the reader *this is going to go wrong*. The right homes for them: (1) the trainer's live Slack/Teams support channel during delivery, (2) the trailing facilitator notes below `<!-- maintainer -->` where watch-fors already live, or (3) the quick reference if the failure mode is generic and reusable. When the body reads like a calm, forward-moving narrative — ask, paste, watch what lands — the student stays in the flow. When it reads like a FAQ of edge cases, the student reads it as a minefield. Pick narrative.
- **"Add X and regenerate" is a trap.** When X should shape the OUTPUT (voice, stance, framing), "add X" reads as "append X as a new section." Claude will grow a bullet list and call it done. Instead say: "rewrite using X as voice-shaping context" or "let X change how the output SOUNDS." Be explicit: is X getting APPENDED (a new section) or INTEGRATED (the whole thing gets rewritten through X's lens)? Name it.
- **Vary closings deliberately.** Each mechanic has different strengths; pick per exercise:
  - **Claude-as-cold-critic** — reproducible, structured, produces an artifact. Use when feedback quality matters. Foreshadows LLM-as-judge.
  - **Pair exchange** — social energy, quick, unexpected angles. Use for bonding or when individual domain expertise matters. Variable quality.
  - **Group discussion** — collective pattern-finding. Use when the room sees what no one alone can (multi-agent, cross-pollination exercises).
  - **Solo retro with Claude** — private learning extraction. Good for module debriefs.
  - **Show-your-work to the room** — public ownership moment. Use for artifact-producing exercises where the reveal matters.

  Don't default to any one. When designing a close, ask: *what does this exercise actually need — structured feedback, social bonding, collective insight, private extraction, or public ownership?* Then pick. "Talk to your neighbor" is not a free pass; neither is "ask Claude for feedback."
- Reference pattern: the "Help me build a steering eval judge" prompt in `curriculum/exercises/steering-eval.md`.

## Voice and style (generation-time)

For the fuller emergent-knowledge / emergent-control / emergent-leadership stance and audience framing, see `curriculum/lecture-guardrails.md`. The one-paragraph summary for generation: write like a practitioner for a business leader making the chat-to-systems leap. Confident, direct, builder's voice. Concepts emerge from doing, never from a pre-explanation. Vocabulary arrives late. The student builds first; the name comes after.

At the sentence level:

- **Second person.** "You" — not "the participant," not "the room."
- **Builder style.** Confident, direct, punchy. "Let's build. You build." See `memory/copy-taste.md`.
- **General facts stated as facts.** "Claude reads the whole conversation every time." Not "the facilitator will explain that Claude..."
- **No jargon without earning it.** Every technical term introduced through an exercise that makes it obvious.
- **No motivational padding.** "AI is transforming the world" — everyone knows. Start with what they're about to do.
- **No overview or summary sections.** TBR 4 Cs (Connections, Concepts, Concrete Practice, Conclusions) handle opening and closing.
- **No further-reading lists.** If it matters, it's in the module.
- **Flavor: Seth × Rory × Risto, not dry textbook.** Builder voice ≠ dry voice. Target:
  - **Seth Godin** — gifts-first warmth, kindness as the goal. Short sentences that don't talk down.
  - **Rory Sutherland** — counterintuitive reframes, wit, sideways looks. If the obvious take is obvious, find the weird one.
  - **Risto Siilasmaa** — epistemic honesty. *"We don't know where this is going. Nobody does."* Naming uncertainty is the source of trust.
  - **Questions to the reader are welcome** — sprinkled, not flooded. *What changed? Where does this break? Ever noticed that...?*
  - **Dryness is a failure mode.** A sentence that makes the reader smile lands harder than three that explain.

### Business-audience jargon ban

The reader is a business leader (SVP marketing, SVP ops, sales manager), not a developer. These words **cannot appear in student-facing text until a lecture or exercise earns them with a plain definition tied to what the student just did**: `embeddings`, `vector`/`vector database`, `RAG`/`retrieval-augmented generation`, `retrieval` (technical sense), `pipeline` (technical sense), `orchestration`/`orchestrator`, `schema` (use "rules"), `architecture` (use "layers"/"shape"), `subagent`, `frontmatter`, `prompt engineering`, `inference` (technical sense — "inference cost," "inference latency"), `fine-tuning`. "Framework" is fine for recognized business frameworks (StoryBrand, Toyota Kata, strategy-as-assumptions) — banned in tech senses like "RAG framework." An unearned tech word costs more than clarity: it creates jargon anxiety ("three things I don't know, and the trainer assumed I did"). Maintainer sections below `<!-- maintainer -->` are exempt. **The SVP test before shipping:** read as if you were an SVP marketing lead with zero technical background. Any flinch = replace or earn.

### Write TO the student; maintainer cut

- **Main body writes TO the student about their journey.** The reader of a lecture or exercise file is the student — not the facilitator. No facilitator instructions in the body (*"To the room,"* *"Have pairs discuss,"* *"Hear one or two out loud"*). Those are script directions and belong in facilitator notes (deferred artifact). The student-facing text speaks directly: *"You'll see…"*, *"Take a guess."*, *"Paste this prompt."*
- **Trailing sections below a `<!-- maintainer -->` HTML comment are maintainer-only and hidden from the student.** The renderer strips everything after `<!-- maintainer -->` before rendering — that's where editorial metadata (TODOs, iteration log, frameworks riffed on, eval-run notes) and facilitator notes (watch-fors, timings, decision points) live. **Do not use `---` as the cut marker** — a plain horizontal rule is legitimate body content (prework, quick-reference, supplementary files use `---` as visual dividers) and the renderer will render it normally. Only `<!-- maintainer -->` triggers the cut.

### Philosophy callouts

Philosophy is the spine (`philosophy.md`, 19 beliefs). Callouts in content are **sparing** — one or two per lecture / closing / opening max, where a philosophy beat lands naturally from what the student just did. **Never front-loaded** — the student experiences the thing, then the belief is named. "What just happened, named" — not "here's what we believe, now do the exercise." Not every module hammers every belief. Session-level budget: within a day that has multiple lectures, avoid repeating the same belief number across lectures unless the repetition is deliberate and named (the second lecture explicitly builds on the first's callout). Unintended repetition dilutes the beat.

### Plug Points syntax

```
> PLUG POINT: [What the org inserts here]
> Default: [What we provide if they don't have their own]
```

- **Make them specific.** Not *"insert your organization's policy here."* Instead: *"Open your company's data classification policy. Find the section on PII. Your agent's instructions need to reference this classification. If you don't have one, use this default: [default]."*
- **Defaults must work.** Every plug point has a default that a participant without org-specific materials can use. Nobody gets stuck because their company doesn't have a policy document handy.
- **Plug points are learning moments.** When a participant discovers their org doesn't have a policy for X — that's a finding. *"You just discovered a gap. That's valuable."*

## Variant framing (audience-specific content)

80% of content is shared across training variants. The other 20% — Connections questions, Conclusions prompts, "What This Unlocks" framing — adapts to the audience. Mark variant-specific content explicitly:

```markdown
> VARIANT: [audience] — [what changes here]
> Default (Bootstrap): [the default version]
> Mid-Management: [the variant version]
```

Exercises themselves are universal — same tech, same mechanics. Reflections are audience-specific.

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

Exercise evals (for Pass 2/3 exercise files) are a future extension of this system — same pattern, different judges.

### TODO / ERROR markers in content

Both the generation system (lecture / exercise files) and the eval system (eval instance files) can leave explicit TODO or ERROR markers for later pickup. These are first-class artifacts, not shameful debt.

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
