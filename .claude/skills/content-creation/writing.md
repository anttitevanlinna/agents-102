# Writing content — voice, structure, pedagogy, verification

Loaded when actually writing student-facing content (any module / exercise / lecture / prework body). The compendiums in `memory/check_*.md` are the ship-time mirrors; this is the generation-time source.

## Module session runtime — 1h45 target

Every Bootstrap module session targets **1h45 of facilitated content** (Connections → Lecture → Exercise → Debrief → Bridge). Fits a 2-hour calendar invite with ~15 minutes of buffer.

| Phase | Target | Role |
|---|---|---|
| Connections | 8–12 min | Warm-up question, room banter, pulls threads from prior module |
| Lecture | 10–15 min | Concepts primed, foreshadowing the exercise, compound math / frames landed |
| Exercise | 55–70 min | The substance — multi-phase, banter-inclusive, artifact-producing |
| Debrief | 12–18 min | Retro-with-Claude + show-and-tell across the room; named artifact saved |
| Bridge | 3–5 min | One-sentence handoff to next module, question lingers |

**Do not compress to fit a shorter slot.** If a customer wants 45-minute sessions, that's a variant with different exercise design (single-loop, less banter, no Debrief) — not the Bootstrap module trimmed. Mid-Management and Executive-Briefing variants have their own runtime contracts.

**Exercises in the shared library carry a 55–70 min target** inside a full Bootstrap module slot. Shorter exercises (20–30 min) are for drop-in use or warmups; different eval criteria (faster-to-insight, single artifact).

**Lectures stay compact (10–15 min).** A longer lecture usually means the exercise isn't carrying its own weight — move concepts into the exercise's teaching moments, not into more lecture minutes.

## The four sharing strategies (Module 7 canonical)

1. **Share the context.** Teammates get your `memory/`, `sources/`, `CLAUDE.md`, `style.md` and build their own agents on top.
2. **Share a skill.** Extract one scoped capability as a skill file; teammates plug it into their agents.
3. **Share the output (push).** Deploy on a schedule; output lands where the team sees it.
4. **Share an interface (pull).** Wrap the agent in a Slack bot / Teams @mention / web form / endpoint; teammates invoke on demand.

**"Share the whole agent" is not on the list.** It's the vendor pitch that doesn't hold up in practice. Any student-facing text that frames the M7 goal as "package your agent for others" violates strategy; replace with the four-strategy framing.

## Trust the prompt over scaffolds

For exercises where the student is already working in Claude Code with a populated working directory, **prefer a well-crafted prompt over a pre-built scaffold file**. Students should *produce* agent files, rules files, and structure through the exercise — not unzip them. Scaffolds earn their keep when a module needs a trainer-authored artifact the student wouldn't produce themselves (Module 4's compliance skills, Module 2's initial empty `sources/memory/agents/` folders). Outside those cases, a one-page prompt does the job better: the student experiences the creation move, the artifact inherits their voice, and the training ships lighter.

**Rule of thumb:** if the scaffold file contains text the student should have written in their own voice, it's wrong. Convert to a prompt that produces it.

## Debrief pattern — Claude self-compounds. Always.

**Debriefs ALWAYS self-compound. Never ask the student three questions and propose rules to paste.** The Q1/Q2/Q3 retro-interview is forbidden — at every module, across every training. The session itself is the evidence; Claude reviews the artifacts, rewrites the rules file in place, reports in 3–5 lines what it added / sharpened / removed and why. The student pushes back on the summary. That push-back IS the reflection move.

**Why:** A three-question interview makes the student do the agent's job. The artifacts are there, the session is captured, Claude can read both. Asking the student to narrate what they just did costs scrollback and attention, teaches the wrong move (student-as-summarizer instead of agent-as-reviewer), and trains a pattern that contradicts the whole arc of the training.

**Bootstrap exception.** Bootstrap M1 (`trainings/bootstrap/getting-going.md` + `exercises/personal-site-with-guardrails.md`) ships a Q1/Q2/Q3 Debrief. Live content; stays as-is, NOT ported. The rule forbids the interview pattern for all *new* content and trainings. Bootstrap M1 is the sole named exception. Do not "fix" it.

**Canonical M2+ Debrief prompt shape:**

```
Review this session and update [rules file]. Read [rules file] at [path], then scan [relevant artifact folders]. Look back over our conversation: which rules did we lean on, which did we work around, which never came up, where did the output wobble?

Then rewrite [rules file]. Integrate, don't append. Sharpen weak rules, add what's missing, remove what turned out wrong. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why — grounded in specific moments from the session.
```

Per-module variation: which rules file (`CLAUDE.md` root / a specific skill / an agent file / an eval judge); which artifact folders to scan; which failure modes to look for. Shape holds: *review → rewrite in place → report*.

## The three-pass build

Work in passes. Finishing Pass 1 for all modules before Pass 2 catches arc-level contradictions before they compound into rework.

**Pass 1 — Module index files.** The spine for each module. No exercise/lecture content yet. Use the canonical template in `curriculum/CLAUDE.md` → **Module File Shape**. Pass-1-specific guidance:
- **Big Idea:** one sentence, one idea per module.
- **What You'll Learn:** LO verbs lead; phrased at the right Bloom's level.
- **Lectures / Exercises (Pass 1 form):** bullet list with one-line description for lectures, one-paragraph prose description for exercises. Include-links arrive in Pass 2.
- **Debrief:** three retro questions shift to the module's discipline (Module 4 "what should be a skill," Module 6 "what should be an eval").

**Pass 2 — Exercise + lecture skeletons.** One file per entry in the shared library. Canonical files.

**Exercise file shape:**
```markdown
# Exercise: [Name]

**What you do:** [clear instruction]
**What happens:** [expected behavior, with a realistic example]
**The point:** [one or two sentences]
**Facilitator note:** [timing estimate, common questions, watch-for behaviors, decision points]
**Time:** [e.g., "55-70 minutes" for Bootstrap module slot]
```

**Lecture file shape:**
```markdown
# Lecture: [Name]

[Content — 10-15 minutes of facilitator talking, inside a 1h45 Bootstrap module.]

**Time:** [e.g., "10-15 minutes"]
```

**Pass 3 — Full content.** Flesh out each exercise and lecture file to facilitator-runnable prose. Add:
- Exact Claude Code commands / interactions
- Expected outputs with realistic examples
- Named failure modes with diagnostic hints
- Time-box every sub-step within the exercise
- Variant markers where audience-specific framing diverges
- Plug point defaults

## Content rules — structural

- **One exercise = one bounded activity.** Internal arc (do → observe → adjust → observe again) is ONE exercise. Never enumerate E1.1/E1.2/E1.3. Phases are prose inside the description, not sub-bullets.
- **No L1.1/L2.1 lecture numbering.** If a module has one lecture, name it. If multiple, name each.
- **One H1 per file** (the title). The print CSS page-breaks before every H1.
- **No YAML frontmatter** in module/exercise/lecture files. The renderer passes content straight to `marked.parse()`; any `---` block renders as a horizontal rule.
- **Basic markdown only.** Paragraphs, headings, lists, tables, fenced code, blockquotes, inline emphasis, links. No raw HTML, Mermaid, admonition plugins, MDX.
- **Kebab-case filenames** with no numbers. Sequence comes from the renderer array.
- **Include-links** use the exact form `[Text](exercises/slug.md)` or `[Text](lectures/slug.md)` on their own paragraph. Anything else is a regular link.
- **Cross-module links** use `curriculum.html?training=<name>&module=<slug>`. Relative markdown paths break.
- **All pages link** (renderer-enforced). Don't fight the renderer.
- **No images** in this pass.
- **Short blockquotes.** The print CSS applies `page-break-inside: avoid`; a 40-line blockquote leaves a huge PDF gap.

## Content rules — pedagogical

- **Claude Code specific.** Exact interactions, expected outputs, troubleshooting. Not tool-agnostic.
- **Exercise-led, not lecture-led.** Concepts emerge from doing. Never explain before the exercise demonstrates.
- **Real data, not toy data.** Participant's own profile, policies, domains.
- **Failure is the teaching moment — in training.** Design exercises that fail instructively (Module 1 fabrication, Module 4 compliance violation, Module 5 hallucination). **But design failure OUT of prework and setup.** Training-day failures are witnessed by a facilitator, debugged in the room, and land as learning. Prework failures happen on a Sunday with no recovery. Different domain, opposite rule: training = productive failure; prework/setup = smooth path with fallbacks named.
- **Don't assume craft. Provide scaffolds.** If an exercise asks the participant to produce an artifact type they haven't built before (LLM-as-judge prompts, skills files, eval criteria), include an inline scaffold, a worked example from an adjacent domain, or an explicit pointer to the earlier exercise that built the same artifact.
- **Riff on recognized business frameworks.** Exercises anchor new LLM skills on frameworks participants already know (StoryBrand, strategy-as-assumptions, Toyota Kata, Voice of Customer, JTBD, Double Diamond, principle of least privilege). Three reasons: cognitive economy, transferability, engagement. Name the framework at design time.
- **Every transformation prompt names its framework — even informal ones.** The move *"name the framework, tune it, ask Claude to run it"* is one of the most transferable patterns in Bootstrap. Only lands if the student sees it modeled in EVERY transformation prompt. *"Hey Claude, apply X to Y, tuned for Z"* — that exact construction. If the move is informal or you invented it, give it a name and pair with a recognized hook. Unnamed framework moves teach passive reception; named ones teach the student to wield the pattern.
- **Tune the framework, scope it.** A framework left to default will try to take over the artifact. StoryBrand makes the customer the hero of the entire site; OKRs want to restructure the whole roadmap. When a prompt names a framework, name (a) what to **tune** (the goal it's serving in this specific case) and (b) what to **scope** (which part of the artifact it shapes).
- **Prework-skipped survivability — 30-second shoutouts in the exercise.** A student who skipped prework must still be able to complete the exercise. Any concept introduced in prework and used in the exercise gets a 30-second shoutout inline, at first use, before the student has to do anything with it. The shoutout is a *just-enough* primer — what it is, how it behaves, what to expect. Short. Functional.
- **Incremental complexity.** Each exercise adds one thing. Never two new concepts in one exercise.
- **Four pillars woven through**, not bolted on: LLM-based, secure, lifecycle, reliable.
- **Ask the agent, don't type in a terminal.** When writing any student-facing "do X" instruction, default-check: *could Claude Code do this inside the session the student is already in?* If yes, write it as a prompt the student pastes, not a shell command. Telling a business-audience student to *"open Terminal and run `python3 -m http.server 8000`"* fails three tests at once: developer-native for a non-developer audience; contradicts "no terminal required"; teaches the anti-pedagogy (type-don't-ask) at exactly the moment the student should be learning ask-don't-type.
- **Don't pre-fabricate state the student could generate in conversation.** Sibling to *ask-the-agent*. If the exercise needs the student to arrive with a candidate bug, a list of terms, a draft artifact — DON'T tell them to *"create `prework/bug.md` with two sentences."* Tell them to *"ask Claude to surface three candidates; pick one in conversation."* The first move of an agentic training cannot be file-ceremony. Prework should create as few files as possible; the student's substrate (their real repo, their real scrollback) is the persistence layer.
- **Match delivery architecture to audience.** Bootstrap ships content via a cohort-hosted site + training-dir with per-module scaffolds; AE101 ships a content folder unzipped to disk + all compounding artifacts in the student's real repo. Pick the model at strategy time; document it in the training's strategy doc; don't mix models within a single training. If you're writing for a training whose delivery architecture isn't pinned, stop and pin it first.

## Voice and style

For the fuller emergent-knowledge / emergent-control / emergent-leadership stance and audience framing, see `curriculum/lecture-guardrails.md`. One-paragraph summary: write like a practitioner for a business leader making the chat-to-systems leap. Confident, direct, builder's voice. Concepts emerge from doing, never from a pre-explanation. Vocabulary arrives late. The student builds first; the name comes after.

At the sentence level:
- **Second person.** "You" — not "the participant," not "the room."
- **Builder style.** Confident, direct, punchy. "Let's build. You build." See `memory/copy-taste.md`.
- **General facts stated as facts.** "Claude reads the whole conversation every time."
- **No jargon without earning it.** Every technical term introduced through an exercise that makes it obvious.
- **No motivational padding.** Start with what they're about to do.
- **No overview or summary sections.** TBR 4 Cs handle opening and closing.
- **No further-reading lists.** If it matters, it's in the module.
- **Flavor: Seth × Rory × Risto, not dry textbook.**
  - **Seth Godin** — gifts-first warmth, kindness as the goal. Short sentences that don't talk down.
  - **Rory Sutherland** — counterintuitive reframes, wit, sideways looks. If the obvious take is obvious, find the weird one.
  - **Risto Siilasmaa** — epistemic honesty. *"We don't know where this is going. Nobody does."* Naming uncertainty is the source of trust.
  - **Questions to the reader are welcome** — sprinkled, not flooded.
  - **Dryness is a failure mode.** A sentence that makes the reader smile lands harder than three that explain.

### Business-audience jargon ban

The reader is a business leader (SVP marketing, SVP ops, sales manager), not a developer. These words **cannot appear in student-facing text until a lecture or exercise earns them with a plain definition tied to what the student just did**: `embeddings`, `vector`/`vector database`, `RAG`/`retrieval-augmented generation`, `retrieval` (technical sense), `pipeline` (technical sense), `orchestration`/`orchestrator`, `schema` (use "rules"), `architecture` (use "layers"/"shape"), `subagent`, `frontmatter`, `prompt engineering`, `inference` (technical sense), `fine-tuning`. "Framework" is fine for recognized business frameworks — banned in tech senses like "RAG framework." Maintainer sections below `<!-- maintainer -->` are exempt. **SVP test before shipping:** read as if you were an SVP marketing lead with zero technical background. Any flinch = replace or earn.

**The agent-capabilities triple — connectors, actions, tools.** When introducing the concept of capabilities the model can call, **name all three**. Don't lead with "tools" alone — it's the agent-builder umbrella term and unfamiliar to a business-leader audience. Connector = wires into work apps; action = verb with effect in the world; tool = umbrella for anything the model can call. Establish the triple once at first introduction; after that, "tools" alone is acceptable.

**Hard ban — "ritual" (and its cousins).** Never use `ritual`, `practice` (as a noun for an activity), or `ceremony` for what students do in this training. They are **exercises**. Always. Applies to ALL surfaces — student-facing curriculum, strategy docs, SKILL.md prose. Substitute: `exercise`. (Also acceptable when truly different: `move`, `step`, `phase`, `debrief`.)

### Write TO the student; maintainer cut

- **Main body writes TO the student about their journey.** No facilitator instructions in the body (*"To the room,"* *"Have pairs discuss,"* *"Hear one or two out loud"*). Those belong in facilitator notes. The student-facing text speaks directly: *"You'll see…"*, *"Take a guess."*, *"Paste this prompt."*
- **Cohort-only beats — write TO the student, in cohort voice.** Some moments only happen in in-room cohort delivery (sponsor opens, pair exchange, room shares back). These belong in the body so cohort participants read them, but they still speak TO the student, in second person. Wrap each cohort-only beat in the **skippable-block convention**: a labeled blockquote opening with a self-study skip line. Self-study Teacher Claude skips the blockquote silently; cohort trainers and readers read it.
- **Trailing sections below a `<!-- maintainer -->` HTML comment are maintainer-only.** The renderer strips everything after `<!-- maintainer -->`. **Do not use `---` as the cut marker** — a plain horizontal rule is legitimate body content. Only `<!-- maintainer -->` triggers the cut.

### Philosophy callouts

Philosophy is the spine (`philosophy.md`, 19 beliefs). Callouts in content are **sparing** — one or two per lecture / closing / opening max, where a philosophy beat lands naturally from what the student just did. **Never front-loaded** — the student experiences the thing, then the belief is named. Session-level budget: within a day with multiple lectures, avoid repeating the same belief number across lectures unless the repetition is deliberate and named.

### Plug Points syntax

```
> PLUG POINT: [What the org inserts here]
> Default: [What we provide if they don't have their own]
```

- **Make them specific.** Not *"insert your organization's policy here."* Instead: *"Open your company's data classification policy. Find the section on PII. Your agent's instructions need to reference this classification. If you don't have one, use this default: [default]."*
- **Defaults must work.** Every plug point has a default that a participant without org-specific materials can use.
- **Plug points are learning moments.** When a participant discovers their org doesn't have a policy for X — that's a finding.

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
2. Add a TRAININGS entry in `site/curriculum.html`.
3. Create module files that compose from the shared library via include-links.
4. Audience-specific framing via VARIANT markers.
5. Update `curriculum/CLAUDE.md` if the variant introduces new structural patterns.

## Verification after writing

**Structural checks (every file):**
1. Start the local server: `python3 -m http.server 8000` from repo root.
2. Browser check: `http://localhost:8000/site/curriculum.html?module=<slug>` — renders cleanly.
3. Print check: Cmd+P → Save as PDF — clean pagination, no chrome.
4. Include-link resolution: verify referenced files exist.
5. Cross-module spot-check: open 2-3 other modules to make sure the edit didn't break anything.

**Eval-driven quality (lectures and prework):**
1. Read `curriculum/evals/lecture.md` — reusable eval system.
2. Fill module-specific slots; save to `curriculum/evals/instances/<training>--<module-slug>.md`.
3. Run the LLM-as-judge. Three verdicts: **APPROVE**, **APPROVE WITH TODOs** (good enough, ship), **REVISE**.
4. Show to Antti for taste review.
5. If Antti flags something not caught → the eval is missing a judge. Add it, re-run.

**Good enough > polished.** If essential judges pass and only contributory judges fail, mark TODOs and move on. Don't polish past "good enough" unless the content's purpose demands it.

**TODO / ERROR markers:** both generation and eval can leave explicit markers for later pickup. Append a `**TODO (from eval pass — ...):**` section at the bottom of a lecture file when it ships with deferred items. Log eval runs at the top of the instance file. Clean up before customer-facing delivery.

## Copyright

Every new asset under `curriculum/`, `content/`, `strategy/`, `site/`, `memory/`, `evals/`, `scripts/`, or `.claude/` is **© 2026 Bosser Oy, all rights reserved**. Do not write curriculum/content/strategy output into `continuous-research/` (open knowledge base). Do not reproduce training content from external sources into the proprietary scope. See root `CLAUDE.md` § "COPYRIGHT — two-tier rule" for full wording.

## Red flags (stop and rethink)

- You wrote more than one bullet under `## Exercises` for phases of a single activity
- Your exercise has sub-bullets labeled E1.a, E1.b, step-1, step-2
- Your module file has a `---` YAML block at the top
- Your exercise file references "Module N" internally — exercises are training-agnostic
- You used underscores or numbers in a slug
- You copied language or structure from F-Secure materials, competitor materials, or any vendor training
- You changed an exercise name but not its mirror in `bosser-strategy:content-strategy.md`
- You added images without a plan to add path rewriting to the renderer
- Your module has more than one H1

**When the rules feel restrictive** — signal to upgrade the renderer or the conventions, not to bend the rule with a workaround that only some files follow. If you reach for frontmatter, Mermaid, images, multiple H1s, or anything the renderer doesn't handle — flag it.
