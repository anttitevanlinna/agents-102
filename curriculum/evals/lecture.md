# Lecture Eval — Curriculum Content

Reusable eval system for curriculum lecture / prework pieces across all trainings. Lectures are evaluated as steering artifacts: does the reader leap, do they arrive at the in-class exercises ready to build on top (not already answered), does the piece hold the module-to-module arc.

**This eval IS a steering eval.** The very concept taught in Module 6 of Bootstrap. Using the system to build the system is the flywheel.

## How to use

For any lecture being written or revised:

1. **Read the target module file** (`curriculum/trainings/<training>/<module-slug>.md`). Pull:
   - The module's **Big Idea** (one sentence)
   - **Learning goals** from `## What You'll Learn` — verb-tagged per Bloom's
   - The **exercises the lecture sets up** (from `## Exercises`)
   - The **previous module** (for arc pickup) and **next module** (for arc hand-off)
   - The **primary Bloom's level** for the module

2. **Fill in the eval** below — replace every `[BRACKET]` with module-specific content. The Primary leap test is the only judge Antti steers directly; the rest are universal across lectures.

3. **Run the eval** — use the LLM-as-judge prompt at the bottom of this file. Give the filled eval + the lecture draft to a Claude agent; get a pass/fail table back.

4. **Iterate** — fix anything flagged. Re-run. When all judges pass and no auto-fail red flags trigger, show to Antti.

5. **Antti approves** — the eval catches epistemic problems; Antti catches the taste problems evals can't name. If Antti flags something the eval didn't catch, the eval itself is missing a judge — add it.

---

## The judges

### Primary — the leap test  *(Antti steers this per lecture)*

After reading this lecture, the reader can:

- [VERB 1 — specific observable behavior grounded in the module's topic]
- [VERB 2 — specific observable behavior]
- [VERB 3 — specific observable behavior, ideally tying to the reader's own context]

If a CTO/builder leader reads the piece and can do these three things, it's good enough. If not, no amount of elegant prose saves it.

### Framing fidelity *(universal)*

The piece leads with the module's Big Idea: **[BIG IDEA FROM MODULE FILE]**.

It avoids the common anti-framings for this topic:
- [ANTI-FRAMING 1 — the wrong default mental model that must be displaced]
- [ANTI-FRAMING 2]
- [ANTI-FRAMING 3 — optional]

### Learning goal fit *(universal)*

The piece equips the reader to achieve these Bloom-tagged learning goals:
- [LG 1 — paste verbatim from module file]
- [LG 2]
- [LG 3]
- [LG 4 — as many as the module has]

Crucially: the lecture **enables** the goals; it does not **achieve** them. The reader comes into class ready to do, not already-done. Pre-empting the exercises = fail.

### Module-to-module arc *(universal)*

Picks up the thread from **[PREVIOUS MODULE — name + one-phrase hook]**.
Subtly hands off to **[NEXT MODULE — name + one-phrase hook]**.

Continuity without spoilers. The reader should feel the sequence — "I just learned X, now I see why Y is the question, and I sense Z is coming next."

### Exercise setup *(universal)*

The piece primes these exercises without giving away the discoveries:
- [EXERCISE 1 — name from module file — what the reader should NOT already know after reading]
- [EXERCISE 2 — same]

The reader arrives curious, not pre-answered. If reading the lecture answers the exercise's question, the lecture over-teaches.

### Mood lands *(universal — essential)*

Every Bootstrap module is engineered to produce a specific emotion by lecture's end — joy, compound, unease, deeper unease, rescue, leverage, generosity, or awe (see `content-strategy.md` → "Mood arc" + the per-module "Mood (deliberate)" paragraph). The mood is the strategic contract.

Score 1–10 for mood landing at close of lecture. **Pass threshold: 8+/10.** Below 8, something is stealing the mood — over-reassurance on a stewing mood (M3/M4 tidied up prematurely), tonal jolt, epistemic beat that reads as "homework" rather than the intended state, a close that resolves what the next module needs to pick up, or an opening that telegraphs the teaching moment and collapses the exercise ahead.

Report must include: mood score + a one-line *"what's stealing the mood here"* note if below 8.

### Voice *(universal)*

- **Main body writes TO the student (the reader), about their journey.** No facilitator instructions in the body. Phrases like *"To the room:"*, *"Pairs trade guesses"*, *"Hear one or two out loud"* are facilitator script and belong in facilitator notes (deferred artifact), not in the student-facing lecture. The student reading this file should feel addressed directly: *"You'll see..."*, *"Take a guess."*, *"Before you watch..."*
- **Trailing sections below a `<!-- maintainer -->` HTML comment are maintainer-only.** That space holds editorial metadata (TODOs, iteration log, frameworks riffed on, eval-run notes) AND facilitator notes (watch-fors, timings, decision points). The curriculum renderer strips everything after `<!-- maintainer -->` before rendering; it never reaches the student. **`---` is NOT the cut marker** — it's a legitimate horizontal rule that can appear in body prose. Use the HTML comment only.
- Second person (`you`, not `the participant`, not `the room`)
- **Seth × Rory × Risto flavor, not dry textbook.** Builder voice ≠ dry voice. Seth-warmth, Rory-reframes, Risto-directness about what we don't know. Questions to the reader welcome (sprinkled, not flooded). Dryness is a failure mode.
- No consultant-speak
- No jargon without earning it
- No LLM-tell words: `honest`/`honestly`, `delve`, `landscape` (as verb), `importantly`, `crucial` (as padding)

### Business-audience language *(universal — essential)*

The reader is a business leader (SVP marketing, SVP operations, sales manager) — not a developer. These words **cannot appear in student-facing text unless this lecture (or a prior earned lecture/exercise in the arc) defines them plainly, tied to something the reader just experienced**:

`embeddings`, `vector`/`vector database`, `RAG`/`retrieval-augmented generation`, `retrieval` (technical sense), `pipeline` (technical sense), `orchestration`/`orchestrator`, `schema` (use "rules"), `architecture` (use "layers"/"shape"), `subagent`, `frontmatter`, `prompt engineering` (use "prompting"), `framework` in technical senses like "RAG framework" (recognized business frameworks like StoryBrand/Toyota Kata are fine).

An unearned tech word creates jargon anxiety — the reader takes the signal "three things I don't know, and the trainer assumed I did," not the signal the lecture intended. Check every paragraph by reading as an SVP marketing lead with zero technical background. Any flinch = replace or earn.

Trailing sections below `<!-- maintainer -->` (facilitator notes, editorial metadata) are exempt.
- Match the voice in `memory/copy-taste.md` and existing articles (`strategy/article-*.md`)

### Length *(universal, tune per lecture)*

Two flavors — tune the target in the instance:

- **Prework-reading lectures** (participants read before class): **800–1200 words**, 10–15 minute read.
- **Demo-script lectures** (trainer performs live, ~15 min on screen): **350–600 words** of script — the screen carries most of the content, the script is beats + prompts + naming.

If this lecture's format isn't clear, default to prework-reading target. If it's longer, it's probably over-teaching.

### Specificity *(universal)*

Named examples, specific mechanics, concrete artifacts. Never generic:
- Refer to specific exercises by name (from earlier modules)
- Use named artifacts participants have seen (their LLM memory, their Module N output, their CLAUDE.md)
- Include specific numbers where relevant (compound reliability math, convergence thresholds)
- Avoid "organizations often…" / "many teams have found…" / "in practice, you might…"

### Research-backed claims *(universal — essential)*

Every factual claim in the lecture — about practitioner behavior, tool capability, industry pattern, convergence, failure mode, number, or named company practice — must have support in the research KB.

**What counts as support:**
- A specific file in `continuous-research/` that captures the claim (observations, insights, platform-watch runs, user-signals)
- A direct link to practitioner-direct source (blog post, GitHub repo, conference talk, podcast) labeled per the evidence-ladder source-type rules in project CLAUDE.md
- Convergence already documented in `continuous-research/synthesis/` or `continuous-research/findings/by-pattern/`

**What doesn't count:**
- Vendor press releases dressed up as claims
- Round-number zombie stats ("95% of AI agents fail") without methodology trace
- "Analysts say" / "Gartner predicts" / generic industry framings
- Claims inferred from single demos without practitioner convergence
- Anything older than 6 months presented without explicit dating

**The vision-detail rule.** Antti supplies the vision (framing, arc, governing rule). Research supplies the detail (practitioners, numbers, shipped practices). If a claim is detail-layer and unsourced, it fails this judge. If a claim is vision-layer (a framing Antti owns, like "compounding is the side-product of smart process"), it doesn't need KB backing — but such claims are labeled as framing, not as empirical finding.

**The chasm-crossing filter.** The detail we cite should sit in the "just-hitting-beyond-early-adopters" zone: stuff that works, proven by solo builders 3-6 months ago, now being picked up by first enterprise teams. Bleeding-edge toys not yet replicated = held loose. Commodity patterns = not curriculum-worthy.

When the judge fires: list every unsourced detail-layer claim in the lecture and either (a) add the source, (b) run an OODA to capture one, or (c) cut the claim.

---

## Essential vs contributory judges (what can TODO, what can't)

**Essential judges** — must pass before the lecture is "good enough." If any fails, the content doesn't serve its purpose; revise before moving on.

- Primary leap test
- Framing fidelity
- Learning goal fit
- Module-to-module arc
- Exercise setup
- Mood lands (8+/10)
- Business-audience language (no unearned tech jargon)
- Auto-fail red flags (none triggered)

**Contributory judges** — can fail with a noted TODO. The content ships; the deferred polish is logged and picked up later.

- Voice (if mostly right)
- Length (too short or too long is a TODO, not a block)
- Specificity (missing examples can be added in a later pass)

## Auto-fail red flags

Any of these = the lecture fails regardless of everything else. Fix before re-running.

- **Violates framing fidelity** — uses one of the anti-framings as the main frame
- **Any LLM-tell word** from the ban list appears anywhere
- **Pre-empts an exercise** — the reader learns something they were supposed to discover in class
- **Arc break** — no pickup from the previous module, no hand-off to the next
- **Over 1500 words**
- **First person** (`I`, `we the trainers`) or third person (`the participant`) — must be second person
- **Contains `---` YAML frontmatter** — the renderer doesn't parse it, renders as a horizontal rule
- **More than one H1**
- **Unearned tech jargon in student-facing text** — any of `embeddings`, `vector`/`vector database`, `RAG`, `retrieval` (tech sense), `pipeline` (tech sense), `orchestration`, `orchestrator`, `schema`, `architecture` (in the "software architecture" sense), `subagent`, `frontmatter`, `RAG framework`, `prompt engineering` appears without having been plainly earned in this or a prior lecture/exercise in the arc

---

## LLM-as-judge prompt

Copy-paste this into a Claude agent. Replace the two `[PASTE]` blocks.

````
You are evaluating a curriculum lecture for Agents 102. Score it against the filled-in eval below. Be strict — this is a steering eval, not a participation trophy.

THE FILLED-IN EVAL:
---
[PASTE: the filled-in `## The judges` section of lecture.md]
---

THE LECTURE:
---
[PASTE: the complete lecture markdown]
---

Return your assessment as:

**Auto-fail red flags triggered:**
- [List any red flag triggered, with a short quote as evidence. If none, say "None."]

**Per-judge scoring:**

| Judge | Pass / Fail | Evidence (one sentence) |
|---|---|---|
| Primary — leap test | | |
| Framing fidelity | | |
| Learning goal fit | | |
| Module-to-module arc | | |
| Exercise setup | | |
| Business-audience language | | |
| Voice | | |
| Length | | |
| Specificity | | |

**Verdict:** [APPROVE | APPROVE WITH TODOs | REVISE]
- **APPROVE** — all judges pass, no TODOs.
- **APPROVE WITH TODOs** — essential judges pass; contributory judges (Voice, Length, Specificity) may fail. List deferred items below.
- **REVISE** — essential judges fail or auto-fail red flag triggered.

**Top 3 items to fix (REVISE) / defer as TODO (APPROVE WITH TODOs) / sharpen (APPROVE):**

**Top 3 things to fix if REVISE:**
1.
2.
3.

Be specific. Quote the lecture where possible. Don't hedge.
````

---

## The eval is also an assumption

If a lecture passes every judge but still feels wrong, the eval is missing a judge. Don't force the lecture to fit the eval — name the missing judge, add it, re-run.

This meta-loop IS the pedagogy of Module 6. Build the system, test with it, learn what was wrong about the test, refine both the work and the test.
