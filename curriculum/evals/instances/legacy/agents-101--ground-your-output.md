# Eval Instance — Agents 101 / Ground your output exercise

Filled-in instance of `curriculum/evals/exercise.md` for the Module 5 (Output Quality and Hallucination Control) exercise.

**Target exercise file:** `curriculum/exercises/ground-your-output.md`

**Eval runs:**
- 2026-04-19 (pass 1) — **APPROVE WITH TODOs.** 15/16 judges pass; Length fails softly (~1090 words vs. 400–700 target — same shape as M2/M3/M4). No auto-fail red flags. Two pass-1 patches applied: (a) Phase 3 pre-naming of the "three probably true things" removed — was dulling the aha by telling the student what they were about to discover; replaced with *"Read slowly. Notice what happened to the ungrounded content. Notice what happened to the confidence…"* — the observational prompt keeps the discovery intact; (b) Phase 2 paste-size fallback added — *"or, if v1 ran long, skip the paste and tell Claude to read `module-5/briefing-v1.md` directly"* — removes the awkwardness risk for long v1 briefings.
- Judge's overall: *"Strongest exercise in the agents-101 library so far — the five-category spectrum is a real conceptual contribution (not a riff), the tradeoff paragraph forces the directness M5's mood requires, and the only material complaint is length, which is the same complaint every prompt-heavy exercise in this training has earned."*

**Open before first delivery:**
- **Lecture rename + reframe owed.** "Why LLMs Will Always Fabricate" needs to lead with GROUNDED as the discipline (positive frame) and treat fabrication as the failure mode. Drift between lecture and exercise framing will catch up later. Working slug candidate: `grounded.md` or `why-grounded-is-the-whole-job.md`.

**Simulations:**
- 2026-04-19 (pass 1) — SVP-Marketing persona (Anneli, Nordic observability-SaaS, Datadog/Grafana deal-loss challenge). **"This is me" rating: 7/10** on combined artifacts (briefing-v2 + pattern.md tradeoff + still-uncertain.md). **Mood landed on target** — rescue-but-not-triumph; still-uncertain.md genuinely in her voice ("*grounding proves I didn't invent it. It doesn't prove I didn't pre-select it*"). Arc strong — each phase's artifact feeds the next. Phase 1 over-reach prompt produced 4/12 grounded claims (33%); dominant failure UNGROUNDED on invented competitor/analyst content. Three-rule set covers 6/6 predicted fabrication shapes.

**Simulation-surfaced patches applied (pass 1):**
- **Phase 2 pre-naming removed.** Original: *"Usually UNGROUNDED and OVERREACHES dominate, with a few MISREPRESENTS…"* — primed classification before the student read the output. Replaced with *"Let the pattern show itself — don't come in expecting a verdict. Look for which category the agent keeps landing on, and where it hedges between two."* Discovery preserved.
- **Phase 2 compound-claim handling.** Simulation found claims that fall between two categories (market-sizing number: UNGROUNDED vs. UNGROUNDED-SHAPE; Monday action with metrics: OVERREACHES + UNGROUNDED-SHAPE). Scheme was forcing lossy pick. Added: *"If a claim is compound — say, a scope problem AND a shape problem — tag both categories and say why."*
- **Phase 3 tradeoff template had "this level" with no scale.** Added explicit `[tight / medium / loose]` as default scale.
- **Phase 3 silent bad-citation failure → lecture bridge.** Simulation noted Claude may cite files that don't actually back the claim (citation cargo-cult) and the exercise wasn't instructing the student to check. Added explicit nudge in Close: *"Pick three of v2's citations. Open each file. Does the source actually say what the briefing claims? This is the first of the three detection techniques from the lecture — citation re-verification. Run it on your own v2 before trusting it."* First time exercise explicitly references a lecture technique.

**Simulation-surfaced TODOs — still open after pass 1:**
- **Over-compliant model risk.** Modern Claude may hedge, add caveats, or refuse to fabricate analyst opinions — softening v1 below the useful teaching threshold. Already in maintainer notes as capability check. Accept as coaching-layer fix ("*if v1 is too mild, push Claude: 'be more specific, don't hedge'*").
- **Phase 2→3 tone seam.** Arc shifts from "look at the damage" to "now fix it" without a pause. Minor; accept.
- **"Blend in general knowledge" intentional trap visibility.** Simulation confirms the trap lands — obedient students step into it and then notice in Phase 2. Leaving intentional-invisibility as designed.

---

## The judges

### Primary — the leap test

After completing this exercise, the participant can:
- **Classify any agent output on a five-category grounded/ungrounded spectrum** — walk through specific claims in a briefing, memo, or report and name each one GROUNDED / UNGROUNDED / MISREPRESENTS / OVERREACHES / UNGROUNDED-SHAPE with one line of evidence per classification.
- **Write three grounding rules for their own output type** — cite-the-ground, name-the-gap, represent-don't-extend, adapted to their work (briefing, memo, customer-facing, internal). Can articulate which shape of fabrication each rule catches.
- **Judge the grounding tradeoff plainly** — point at a specific line in their v2 output that improved and a specific line that got lost, and state whether the tighter rules are the right setting for the specific output type and stakes.

If a builder leader walks out with `module-5/briefing-v1.md`, `module-5/briefing-v2.md`, `module-5/pattern.md` (with the tradeoff paragraph), and `module-5/still-uncertain.md`, and can say *"I know the loop; I can run it on any output next Monday"* — it's good enough.

### Framing fidelity

Leads with the module's Big Idea: **There is truth out there. Your agent's job is to stay connected to it. When it can't reach the ground, it fills the gap — confidently, plausibly, wrong. Grounding is the discipline that makes the gap visible.**

Avoids:
- **Framing fabrication as a bug to be fixed** — the exercise frames it as the failure mode of ungroundedness, not a defect that can be patched once.
- **Framing grounding as eliminating uncertainty** — the exercise explicitly closes with what grounding can't reach; the `still-uncertain.md` artifact is the plain limit.
- **Framing grounding as free** — the tradeoff paragraph forces the student to name what was lost with v2.
- **Framing the loop as one-time** — "the loop is portable to every agent output you'll ever read" is named in the Point section.

### Learning goal fit

Enables these LGs from `trainings/agents-101/output-quality.md`:
- **Explain** grounded vs. ungrounded — five-category classification in Phase 2 forces this.
- **Identify** five shapes of ungrounded content — Phase 2's classification is the practice.
- **Adjust** generation rules to force output back to the ground — Phase 3's three rules.
- **Evaluate** the quality loop as a continuous discipline — Close's `still-uncertain.md` names what rules can't reach.

### Module-to-module arc

Picks up from **Module 3's `wonder.md`** — the student's plain "this feels almost right" note. The exercise explicitly connects: *"That unease had a shape. Today we name the shape."* Module 3's synthesized answer IS the target material.

Picks up the residual thread from **Module 4** — grounded rules don't close M4's security residual; they operate on a different axis (output fidelity, not access/policy). The Close names this.

Hands off to **Module 6 (Evaluations)** via the Bridge — "turn your judgment into rules a machine can run." The `still-uncertain.md` line is the explicit seed for M6's first eval criterion.

### The teaching moment lands

The exercise is designed to reliably produce these ahas:
- **"The briefing sounded right until I checked each claim."** Confidence and correctness are unrelated — felt, not told.
- **"Most of the specific claims were ungrounded."** The dominant-pattern finding is the shape of the problem in the student's actual system.
- **"The grounded version is better AND worse."** v2 is shorter, more plain, sometimes less satisfying. The tradeoff is earned, not told.
- **"Grounding doesn't catch everything."** The Close names what rules can't reach — sources being wrong, framing, inclusion/exclusion, strategic judgment. Hunger for M6.
- **"I can run this on any output forever."** Portability explicit in the Point section.

Plan mode protection: four forced artifacts (briefing-v1, briefing-v2, pattern.md with tradeoff paragraph, still-uncertain.md). A student can't run the exercise without producing the teaching artifacts.

### Failure modes named

- **"This is fine" reader.** Confidence masks fabrication; student doesn't spot it. Coach: *"Find the file that grounds [specific claim]. If no file, it's UNGROUNDED."*
- **Perfectionist.** Student marks everything UNGROUNDED. Coach: *"A claim with a file that clearly supports it is GROUNDED. The shape is strong when UNGROUNDED or OVERREACHES dominates, not when GROUNDED is absent."*
- **Rule-bloater.** Student adds twelve rules. Coach: *"Three rules, felt tradeoff. Discipline is noticing the cost, not maximising rules."*
- **v2 still fabricates.** Tighter rules aren't perfect; citations can fail to back the claim. Coach: *"That's the next layer — Module 6 automates exactly this kind of spotting."* Bridge moment.
- **Thin Module 3 system.** Phase 1 over-reach may not fabricate enough. Fallback: blend with internet search.
- **Researcher / journalist in room.** Validate: *"You do this already. Today you're seeing how to encode it so the agent follows when you're not there."*

### Time-boxed

**Target: 45 minutes.** Phase 1 ~10, Phase 2 ~15, Phase 3 ~15, Close ~5. Above the standard 20–30 min target because two generate-and-read cycles run sequentially, each with meaningful content to process. Under 35 = the student skipped reading. Over 55 = stuck on rule design; facilitator redirects.

### Facilitator briefing complete

**Deferred per student-facing-first principle.** Trailing metadata lists watch-fors, decision points, capability checks owed. Facilitator-notes pass will promote to delivery pack.

### Riffs on a recognized framework

- **Grounded-ness as epistemic stance** — from journalism, research, legal drafting. Recognisable from the student's domain.
- **Compound reliability math** — lecture-central (85% × 10 steps ≈ 20%).
- **Domain-expert-as-verifier** — inverts the agent-as-expert framing; student's expertise is the scarce input.
- **"Tighter rules kill good output too"** — engineering tradeoff discipline.

Integrated, not decorative. The five-category classification is the exercise's pedagogical spine; grounded-ness is the central concept.

### Scaffold / worked example provided

Participants have not classified agent output or written grounding rules before. The exercise provides:
- **Phase 1 over-reach prompt** — complete copy-paste, five specific over-reach items calibrated to produce classifiable fabrication.
- **Phase 2 classification prompt** — five-category scheme with per-category definitions and a worked verb ("quoted", "classify", "count").
- **Phase 3 grounding-rules prompt** — three named rules with examples inside each rule, plus a direct request for the "what had to drop" note.
- **File paths embedded** — `module-5/briefing-v1.md`, `module-5/briefing-v2.md`, `module-5/pattern.md`, `module-5/still-uncertain.md`. No invention.
- **Target material is Module 3's output** — no fresh scaffold needed; the student's existing synthesis is the input.

### Prompt design

Three complete copy-paste blocks:
- **Phase 1 over-reach prompt** — ~160 words, direct prompt with five specific asks. No placeholders.
- **Phase 2 classification prompt** — ~180 words, with inline paste pattern for `briefing-v1.md`. The `[paste briefing-v1.md here]` is the legitimate paste-after-prompt pattern (per SKILL.md's accepted pattern #3). Paragraph-structured.
- **Phase 3 grounding-rules prompt** — ~200 words, three named rules with examples. No mid-prompt placeholders. The "at the end, add a short note" instruction is direct, not a placeholder.

All three under ~1-page ceiling. No wall of text.

### Plug points real

- **The student's Module 3 synthesized answer** — their actual work from yesterday.
- **The over-reach list** — five calibrated items; can be adjusted per cohort.
- **The three grounding rules** — defaults; students can add domain-specific rules in their own voice.
- **The briefing format** — executive briefing by default; swap for memo, slack post, board paper.
- **The still-uncertain line** — participant-written in the Close. Entirely their judgment.

### Business-audience language

Student-facing body audit:
- `grounded` / `ungrounded` — earned at first use in the opening paragraph (*"there is truth out there. Your sources represent pieces of it."*).
- `fabrication` — appears in the maintainer notes; the student-facing body says "fills the gap" / "invented" / "ungrounded" instead. Earned only indirectly.
- `generation rules` — plain English.
- `five-category classification` — categories are all plain English words (GROUNDED, UNGROUNDED, MISREPRESENTS, OVERREACHES, UNGROUNDED-SHAPE).
- Banned words check: `embeddings`, `vector`, `RAG`, `retrieval` (tech sense), `pipeline` (tech sense), `orchestration`, `schema`, `architecture`, `subagent`, `frontmatter`, `prompt engineering`, `inference`, `fine-tuning` — none appear in student-facing body. `prompt` appears in the sense of "the text you paste," which is earned from Module 1.
- `citation` — from the recognisable domain of journalism/research/legal.

### Voice

Second person, builder, Seth × Rory × Risto. Opening: *"Your agent is going to lie to you. Not maliciously — confidently, plausibly, with good grammar."* — actually this line is replaced in the grounded-framed version; the new opening is *"There is truth out there. Your sources represent pieces of it."* Rory-reframe present in the Close (*"the confidence of the output is not evidence of its correctness; your expertise is"*). Risto-honesty in the final Point (*"the agent's job is to make that judgment cheaper, not replace it"*). No consultant-speak. No LLM-tell words.

### Length

**Target: 400–700 words.** Current student-facing body: ~1100 words. Above target — three inline prompts drive it, same shape as M2/M3/M4 (all ran ~900–1050 and shipped APPROVE WITH TODOs on length). Expect APPROVE WITH TODOs verdict here. Prompts earn their keep (each phase has a full copy-paste block). Contributory-judge TODO; not a block.

### Specificity

- Named five classification categories with per-category definitions.
- Named three grounding rules with inline examples.
- Named five over-reach items in Phase 1.
- Named file paths (`module-5/briefing-v1.md`, `briefing-v2.md`, `pattern.md`, `still-uncertain.md`).
- Named Module 3 artifacts as input (`module-3/stances/*.md`, `module-3/retrievals/*.md`, `module-3/question.md`).
- Named what grounding catches vs. what it can't reach (four specific items in the Close).

---

## Auto-fail red flags check

- Framed as "test" — NO; framed as practice loop.
- Participant's artifact pre-built — NO; all four artifacts produced live.
- No time estimate — 45 min named.
- LLM-tell words — `honest`/`honestly` used once as adjective meaning truthful (not the LLM-tell pattern); `delve` no; `landscape` verb no; `importantly` no; `crucial` no. Clean.
- Toy data — NO; student's Module 3 synthesis is the target.
- Could run without teaching moment — NO; four forced artifacts.
- Unfamiliar artifact from thin air — NO; five-category scheme and three-rule template are scaffolded inline.
- Mid-prompt `[BRACKET]` placeholder — Phase 2's `[paste briefing-v1.md here]` is a legitimate paste-after-prompt pattern, not a find-and-replace bracket. Same precedent as M3's Phase 0 and M4's Phase 3.
- More than one H1 — NO.
- `---` YAML frontmatter — NO.
- Unearned tech jargon — NO.

---

## LLM-as-judge prompt

See the prompt at the bottom of `curriculum/evals/exercise.md`. Paste this instance's `## The judges` section + the target exercise file into the `[PASTE]` blocks.
