# Eval Instance — Agents 101 / Three retrievers, three minds exercise (HISTORICAL — split 2026-04-29)

> **Status:** This instance evaluated the combined `three-retrievers-three-minds.md` exercise. On 2026-04-29 that exercise was split into two:
> - `curriculum/exercises/three-retrievers-one-curator.md` (Phase 1 — retrieval + curation)
> - `curriculum/exercises/three-minds-one-synthesis.md` (Phase 2 + Close — three minds + synthesis)
>
> This file is retained as historical evidence of the prior eval runs (Apr 18–19, 2026-04-25 sim). Future sim/eval runs against the split form should produce two new instance files at the canonical paths. Findings below still inform the split files where relevant — particularly the pass-3 mood correction (unease, not quality), which holds for the *Three minds, one synthesis* Close beat.

Filled-in instance of `curriculum/evals/exercise.md` for the (pre-split) Module 3 exercise in the Agents 101 training.

**Target exercise file (historical):** `curriculum/exercises/three-retrievers-three-minds.md` *(deleted 2026-04-29 — see split files above)*

**Eval runs:**
- 2026-04-19 (pass 3 — mood correction) — strategic reframe from Antti: Module 3's teaching moment is *unease*, not quality. The 7.5/10 synthesized-answer feeling is the *target*, not a shortfall; Module 5 picks up the doubt as its own curriculum. Edits applied: (a) Phase 1 URL spot-check instruction (added in pass 2) **reverted** — checking resolves doubt; Module 3 is about sustaining it; (b) Close rewritten from "where did it paper over?" + coordination-rule.md fix to "does this feel right?" + wonder.md note — questions whether the output is 100% right, explicitly does not resolve, names Module 5 as the return. Artifact renamed `coordination-rule.md` → `wonder.md`. This pivots the exercise's ending mood from diagnostic-and-fix to plain-uncertainty-held. Any future eval on Module 3 must evaluate against this mood; an exercise that feels "clean" is failing the new contract.
- 2026-04-19 (pass 2 simulation, whole-module) — Anneli simulation across prework → exercise → Close. 7.5/10 "this is me" rating on the synthesized answer — reframed by pass 3 as the correct target.
- 2026-04-18 (pass 1) — **APPROVE WITH TODOs.** 15/16 judges pass; Length fails softly (~900 words vs. 400–700 target — four inline prompts drive it; same shape and verdict as Module 2's exercise). No auto-fail red flags. Three pass-2 patches applied from simulation findings: (a) Phase 1 rhythm clarified — "paste all three prompts first, confirm all three, then watch files land" — to recover felt-concurrency; (b) Office365 retriever pushed against niceness tax — "name where sources disagree; don't smooth"; (c) Close given a concrete rule-shape example without pre-building the student's rule.
- Judge's overall: *"Strong exercise that engineers both felt-concurrency and the pattern-unifier moment on the student's real challenge, with the Phase 2 subagent invocation as the one remaining technical risk and length the one stylistic debt."*

**Simulations:**
- 2026-04-18 (pass 1) — SVP-Marketing persona (Anneli Rantanen, Nordic observability-SaaS, 600 people, challenge: Datadog/Grafana late-stage deal loss, 90-day move). **"This is me" rating: 7/10** on the synthesized artifact — "something I'd bring to Monday's exec meeting as a starting draft; the assumption-experimentator's load-bearing-assumption list is genuinely useful, and the reframe is sharper than what I'd get alone." Surfaced two structural blockers (both capability-check-gated, not applied yet), three ambiguous instructions (two patched in pass 2, one still blocked on capability check), and three predicted Claude-behavior risks (one patched, two deferred).

**Simulation-surfaced TODOs — still open after pass 2:**
- **Multi-window setup recipe.** "Open your training directory in four Claude Code windows" is invisible knowledge for a non-developer; simulation stalled 5 minutes at this step. Don't guess the UI — capability check owed (see below). Once verified, add a three-line recipe to Phase 1.
- **Subagent invocation reliability.** "Spawn three subagents in parallel" may degrade to sequential stance-running labelled as subagents in current Claude Code desktop. The pedagogical claim survives either way (three files land in `module-3/stances/`), but the "native shape" lesson is weaker if the plumbing is sequential. Capability check owed.
- **Felt-concurrency partial.** With the pass-2 rhythm clarification, the concurrency moment is better framed but still gentler than the exercise promises. Accept unless the capability check opens a cleaner path (e.g., retrievers run without confirmation, student corrects after the fact).
- **Rory seat dad-joke risk.** Partially addressed by "Be sharp, not glib" in the prompt. Simulation predicts the sharp version works; coach in facilitator notes if a student slips to glib.

**Capability checks — resolved (2026-04-19):**
1. Multi-session on shared working directory: confirmed by Antti. CLI users open four terminal windows; desktop users open four sessions. Trainer demos both live in Phase 1. Exercise body updated. Self-study variant owes a recipe file (deferred).
2. Subagent invocation in current Claude Code: confirmed by Antti as working. "Launch three subagents in parallel" dispatches reliably. No rewrite needed.

---

## The judges

### Primary — the leap test

After completing this exercise, the participant can:
- **Design a multi-agent pipeline on their own work** — point at the Module 3 setup and say "I'd hire a retriever for X, Y, Z, then use a synthesizer with these three stances for the call I'm making." Done without trainer prompting, for a challenge other than the one used in class.
- **Name the two shapes** — explain in one sentence what was different between Phase 1 (separate sessions on shared files) and Phase 2 (subagents in one session), and pick which shape fits a given task back at work.
- **Show the seam** — point at one specific place in their own synthesized answer where the synthesizer papered over a conflict the retrievers surfaced, and articulate why the coordination rule they wrote to `CLAUDE.md` addresses it.

If an SVP walks out able to do these three things and says "this is how I'd run the [strategic decision] my team has been circling for weeks" — it's good enough.

### Framing fidelity

Leads with Module 3's Big Idea: **Hire three agents to search. Three more to decide. The filesystem is the meeting room.**

Avoids:
- Framing multi-agent as "orchestration" or "agent framework" (tech jargon that erases the felt experience)
- Framing the three retrievers as "analytical lenses" (the superseded shape — they are *retrievers* with different source access, not three takes on the same data)
- Framing the synthesizer as a summarizer (it decides, guardrailed by a framework — it does not summarise)
- Framing subagents as a separate advanced feature the student needs to "graduate" to (they're the native pattern in Claude Code; this exercise earns the word)

### Learning goal fit

Enables these LOs from `trainings/agents-101/multi-agent-systems.md`:
- **Design** a multi-agent pipeline in two shapes — Phase 1 embodies the sessions-on-shared-files shape; Phase 2 embodies the subagents-in-one-session shape. The Close's coordination rule turns the design into a personal heuristic.
- **Build** three retrieval agents, each speaking its source's dialect, and a synthesizer orchestrating three subagent personas — directly in the four prompts.
- **Analyze** handoff failure modes — the Close forces the student to name one specific seam failure in their own run.
- **Create** a framework-guided answer to a real strategic question about the student's own challenge — Phase 2 produces the Rumelt-spined answer.
- **Evaluate** when splitting earns its keep — handled in part; the companion lecture "When to split an agent (and how)" carries most of this LO.

### Module-to-module arc

Picks up from **Build your challenge memory** (Module 2) — the same three source zones (wiki / collab suite / internet) that the student curated by hand last module are now the source zones the three retrievers work. The root `CLAUDE.md` from Module 2 is what each window reads; the `agents/` folder is already populated with the librarian agent from Module 2. The crux skill from the Module 2 Debrief previews Rumelt's kernel, which the Phase 2 synthesizer spine names out loud.

Hands off to **Module 4 (Security)** via the Bridge — the system just gained access to three systems at once, and three of its minds hold stances an SVP might not want on the record. Module 4 opens with the blast radius Phase 1 just created. Also feeds Module 5 — the Close's named seam failure is exactly the fabrication and gloss pattern Module 5 comes back for with better tooling than eyeball.

### The teaching moment lands

The exercise reliably produces these ahas:
- **"Three windows are working for me at once."** — the felt-concurrency moment. Can't be faked with one prompt. Phase 1's whole design is to make this visceral.
- **"Subagents are the same idea, running inside one session."** — the pattern-unifier moment. Two shapes, one idea (the filesystem is the meeting room). Earned by running both in sequence.
- **"The synthesizer dropped a conflict I can point at."** — the seam moment. The Close forces this.
- **"The three stances produced something no single agent would have."** — the genuinely-different-questions moment. Rory reframe catching what the planner missed, or Martin's assumption test exposing where the internet retriever was wishful. The three must read as genuinely different minds, not three paraphrases.

Plan mode protection for these moments: Phase 0 makes the question real and personal (a thin question hollows out all four). Phase 2's "return the three stances to me first, unsummarised" forces the student to read the three minds before the combined answer smooths them into beige. The Close's "write one line to `coordination-rule.md`" turns the seam observation into a keepable artifact.

### Riffs on a recognized framework

- **Rumelt's strategy kernel** (diagnosis / guiding policy / coherent actions) — named explicitly as the synthesizer's spine. The crux skill in Module 2's Debrief deposited this; now the student runs it inside an agent.
- **Roger Martin's *what would have to be true?*** — named explicitly as Subagent 2's stance. Also a running throughline in the curriculum (strategy as assumptions).
- **Rory Sutherland's counterintuitive reframe** — named explicitly as Subagent 3's stance. Behavioural economics / advertising-theory flavour. The Rory seat.
- **One-agent-per-recurring-workflow (Bosser stance)** — referenced in the companion lecture; addressed by engineering the exercise to be one of the rare within-workflow cases where access + dialect + stance force splitting. Cross-workflow framing (build many, one each, no mega-agent, no proliferation) lands at lecture close.
- **Anthropic / Boris Cherny: file-based agentic coordination** — "the filesystem is the meeting room" — emerges experientially from Phase 1, named in the companion lecture.

Integrated, not decorative. Three frameworks named in the student-facing body; all three do real work.

### Failure modes named

- **Thin Phase 0 question.** "Tell me about our market position" — topic, not decision. Fix: Phase 0 line already pushes back ("a decision you'd stay late to make"); facilitator reinforces in room — "what's the question you'd answer for your CEO?"
- **Windows open on wrong directory.** Student opens Window 2 on Desktop instead of the training directory; retrievers write to the wrong place. Fix: facilitator pre-flight — everyone opens all four on the training directory before any prompts get pasted.
- **Retrievers block on clarification.** Each retriever asks its 1–3 questions at the start; if the student switches windows before answering, retrievers stall. Fix: the body already names the switching rhythm ("answer each retriever's questions as they come in"). Facilitator watches the room for stalled windows.
- **Synthesizer returns the combined answer without the three stances.** Student pastes Phase 2 prompt, synthesizer smooths immediately. Fix: the prompt specifies "return the three stances to me first, unsummarised" — but Claude can still over-compress. If it does, student pastes: "Stop. Show me each subagent's stance in full before you combine."
- **Rory seat produces dad jokes.** Student writes a "be witty" variation. Fix: the prompt frames the Rory seat as reframing / analogy-stealing / bias-inversion, not wit-for-wit's-sake. Line in body: "Be sharp, not glib." Facilitator catches glib output: "That's a joke. What's the reframe?"
- **Internal wiki access patchy.** A cohort with broken connectors can't run Window 1 meaningfully. Fix: the decision point in maintainer notes collapses Window 1 and Window 2 into one retriever; Phase 1 runs with two retrievers + main session + internet, the lesson survives.

### Time-boxed

**Target: 50 minutes.** Phase 0 ~3 min, Phase 1 ~25 min (windows open, prompts paste, retrievers run, student watches & answers), Phase 2 ~15 min, Close ~7 min. Under 40 = Phase 1 didn't produce the felt moment; over 60 = retrievers sprawled or the subagents went sideways. Banter is part of the design — the "three windows running" moment is literally supposed to prompt *"look at this"* to a neighbor.

### Facilitator briefing complete

**Deferred per student-facing-first principle.** Trailing metadata in the exercise file lists watch-fors, decision points for cohorts with patchy connectors, time budget per phase, and two capability checks owed before delivery. Facilitator-notes pass will promote these to a real briefing artifact.

### Scaffold / worked example provided

Participants haven't built multi-window retrieval or multi-subagent synthesis before. The exercise provides:
- **The question artifact** (`module-3/question.md`) — one sentence, explicit shape, default template ("what's the right next move on [my challenge] over the next 90 days?").
- **Four complete copy-paste prompts** — three retriever prompts + one synthesizer prompt. Each is a fully-formed instruction set; the student adjusts nothing inline.
- **File-path shapes embedded in the prompts** — `module-3/retrievals/{confluence,o365,internet}.md`, `module-3/stances/`, `module-3/question.md`, `module-3/coordination-rule.md`. The student never invents a path.
- **Stance definitions named in Phase 2** — each subagent stance is defined in the prompt itself (backward-from-end, Martin's *what would have to be true?*, Sutherland-style reframe). No blank-page moment.
- **Rumelt's kernel explicit in the synthesizer prompt** — diagnosis / guiding policy / coherent actions spelled out, not left to the student to recall.
- **The Module 2 state is the starting scaffold** — memory, sources, root `CLAUDE.md`, one agent file already exist. Module 3 extends it; nothing fresh-out-of-zip.

### Prompt design

Every prompt is a complete copy-paste block with no mid-prompt `[BRACKET]` placeholders. Patterns used:
- **Retriever prompts (×3)** — conversation-after (each retriever first asks for search terms / clues / author names, then runs). Question list is 1–3 items per retriever.
- **Synthesizer prompt** — direct prompt with embedded references to files on disk (`module-3/retrievals/*.md`, `module-3/question.md`). Instruction to return stances first, combine after. Rumelt framework spelled out inline.
- All four prompts paragraph-structured; longest (synthesizer) is ~250 words — under the ~1-page ceiling.
- No wall-of-text; each prompt has explicit numbered steps where the process has >2 stages.

### Plug points real

- **The strategic question** — participant-written in Phase 0, lives in `module-3/question.md`, keys every prompt.
- **The three source zones** — participant's own Confluence / Office365 / internet curated material. Swap per tech stack (Notion, Google Workspace) via one-line prompt edits.
- **The three clues in the O365 retriever** — participant supplies document names, people, SharePoint sites from their actual work.
- **The internet author list** — participant confirms or replaces the retriever's proposed authors.
- **The framework** — Rumelt by default; swap per challenge type (StoryBrand, JTBD, principle of least privilege) via one line in the synthesizer prompt.
- **The coordination rule** — participant writes their own, from what they just observed.

Nothing pre-built for any specific participant.

### Business-audience language

Student-facing body audit:
- `retrievers` — earned in the opening (*"hire three agents to do the searching"*); no tech-sense bleed.
- `subagents` — earned at first use in Phase 2 (*"Claude Code calls them subagents — same idea as the agent files you built in Module 2, but running inside this conversation, in parallel"*). Ties explicitly to the Module 2 custom agent concept.
- `synthesizer` — plain English, not tech jargon; no framework-speak.
- `filesystem` — appears in Big Idea and Close. Business-audience-safe; everyone uses a file browser. No `schema`, `pipeline`, `orchestration`, `architecture`, `embeddings`, `vector`, `RAG`, `retrieval` (tech sense), `prompt engineering` appear in student-facing body.
- `framework` — used only for recognised business frameworks (Rumelt, Martin, Sutherland); not in tech sense.

Trailing metadata below `<!-- maintainer -->` is exempt.

### Voice

Second person, builder, Seth × Rory × Risto. Opening "One mind won't do." Rumelt / Martin / Sutherland names welcome — business readers recognise them. Rory seat is self-aware. No consultant-speak, no LLM-tell words. Audit clean.

### Length

**Target: 400–700 words.** Current student-facing body (above `<!-- maintainer -->` cut): ~900 words — four prompts inline push the total up. Plain. Module 2 exercise ran ~900 and shipped APPROVE WITH TODOs on length. Expect the same verdict here; the prompts earn their keep.

### Specificity

Named phases, concrete prompts, real file paths (`module-3/question.md`, `module-3/retrievals/{confluence,o365,internet}.md`, `module-3/stances/`, `module-3/coordination-rule.md`), named mechanics (the `+` button for OneDrive/SharePoint attach, four Claude Code windows on the same training directory), realistic stance definitions (Rumelt, Martin, Sutherland).

---

## Auto-fail red flags check

- Framed as "test" or "validation check" — NO; framed as hire-a-team, run-it, name-the-seam
- Participant's artifact pre-built — NO; question, retrievals, stances, synthesis, coordination rule all produced live
- No time estimate — 50 min named
- LLM-tell word — audit clean (scan for "honestly", "delve", "landscape" verb, "importantly", "crucial")
- Toy data instead of own initiative — uses their live challenge from Module 2
- Could run without teaching moment — Phase 0 forces a real question, Phase 1 forces concurrency, Phase 2 forces three stances before combination, Close forces seam naming
- Unfamiliar artifact from thin air — four complete prompts scaffolded; file paths named; stance definitions embedded
- Mid-prompt `[BRACKET]` placeholder — audit clean across all four prompts
- More than one H1 — one (the title)
- `---` YAML frontmatter — no
- Unearned tech jargon — `subagents` is earned at first use with a Module 2 callback; `retrievers` is earned in the opening; no other tech jargon

---

## LLM-as-judge prompt

See the prompt at the bottom of `curriculum/evals/exercise.md`. Paste this instance's `## The judges` section + the target exercise file into the `[PASTE]` blocks.
