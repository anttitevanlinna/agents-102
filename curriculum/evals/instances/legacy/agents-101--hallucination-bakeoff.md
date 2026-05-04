# Eval Instance — Agents 101 / Hallucination bake-off exercise

Filled-in instance of `curriculum/evals/exercise.md` for the Module 5 (Output Quality and Hallucination Control) exercise in the Agents 101 training.

**Target exercise file:** `curriculum/exercises/hallucination-bakeoff.md`
**Module file:** `curriculum/trainings/agents-101/output-quality.md`
**Lecture that sets this up:** `curriculum/lectures/grounded.md`

**Eval runs:**
- 2026-04-19 (pass 1, PDCA test+check) — **APPROVE WITH TODOs.** 14/16 judges pass clean; Length fails softly (~1,150 words vs. 400–700 target — four inline prompts and a multi-beat Close drive it; same shape as M2/M3 exercises). Mood lands (rescue-not-triumph honored by the still-uncertain line and the known-limit line). One contributory ambiguity on **what counts as a "specific claim"** in Phase 0 vs. Phase 1 — detectors and gold standard may tokenize the briefing differently, which can null-out the scoreboard. Three simulation-surfaced fixes below. No auto-fail red flags triggered. The exercise is a genuine magic beat — four detectors, a meta-eval, a measured winner — and the understandable-magic bar is met by the scoreboard + the judge's known-limit line.
- Judge's overall: *"Strong rescue-beat exercise; the bake-off pattern lands, the gold-standard-size rule is plain, and the Close refuses triumph. Two watch-items: (1) claim-tokenization alignment between gold standard and detectors, which can produce zero overlap; (2) the 'don't read the briefing' gate is load-bearing for the gold-standard integrity but currently only one sentence."*

**Simulations:**
- 2026-04-19 (pass 1) — SVP-Strategy persona, 300-person Nordic industrial-software company, weekly Claude user for a year, completed M1–M4 yesterday. Delivery mode: self-study, Teacher Claude in a side session. **"This is me" rating: 8/10** on the scoreboard + judge file. Scoreboard moment is the strongest beat of the module so far — *"I didn't guess which detector was best. I watched the table fill in and it told me."* Mood scores below. Three specific fixes, three ambiguities, two Claude-behavior mismatches, and one strategic-question flag surfaced.

**Mood summary (per phase + close):**
| Beat | Score | Mood | What's stealing it (if <8) |
|---|---|---|---|
| End Phase 0 (gold standard written) | 8 | curious + slightly uncertain — "did I pick the right five?" | — |
| End Phase 1 (four detectors spawned) | 8 | anticipatory — watching four agents fight on my output | — |
| End Phase 2 (scoreboard read) | 9 | mechanical rescue — the beat lands | — |
| End Phase 3 (judge saved) | 8 | earned-confidence — "I have a judge I can defend" | — |
| Close (still-uncertain line written) | 9 | rescue-not-triumph — known limit named, M3/M4 unease preserved, hunger for M6 | — |

All beats at 8+/10. Module mood contract (rescue-not-triumph) honored. M3 strategic uncertainty and M4 security residual preserved — the still-uncertain line does the work explicitly.

---

## The judges

### Primary — the leap test

After completing this exercise, the participant can:
- **Explain the bake-off mechanism unprompted** — "four detectors ran in parallel on the same briefing, a meta-evaluator scored them against a five-claim gold standard I wrote myself, detector X won because it caught Y, now I have a judge file I trust for this shape of output." No black-box moves anywhere; the student can point at every step.
- **Defend the winning judge's scope** — name what the judge catches, name its "known limit," and say where in their own work they'd trust it first and where they wouldn't.
- **Transfer the pattern** — describe where else they'd run a bake-off (tone, compliance, brand voice, pricing claims) and what they'd put on the five-claim gold standard for that domain.

If an SVP walks out of this exercise able to do those three things — understandable magic, defensible scope, portable pattern — it's good enough.

### Framing fidelity

Leads with Module 5's Big Idea: **You don't pick a detection method because someone said so. You run several in parallel on your own output, let a meta-evaluator score them against a gold standard you wrote, and keep the winner.**

Avoids:
- Framing the exercise as "test the agent" or "validate your briefing" (would trigger auto-fail; the exercise is method selection, not QA)
- Framing groundedness as "solved" (resolves M3's strategic uncertainty too early — breaks mood arc)
- Framing the bake-off as a framework-to-learn rather than a pattern-to-run (memorising four detectors is not the transferable skill)
- Framing precision/recall/coverage as vocabulary to master (they earn themselves through measurement)

### Learning goal fit

Enables these Bloom-tagged learning goals from `output-quality.md` verbatim:
- **Evaluate** detection methods empirically — set up a bake-off, compare methods against a gold standard you wrote, pick the winner with measured reasoning rather than intuition
- **Synthesize** the winning method into a reusable judge file with a stated scope and a named "known limit" — a judge you can defend in production
- **Explain** why method selection for agent quality work is empirical, not authoritative — and why the scoreboard IS the explanation
- **Identify** what a judge can and can't reach — the difference between a narrow tool that works and a broad tool that pretends

All four LOs hit directly in the exercise flow (Evaluate in Phase 2, Synthesize in Phase 3, Explain in the Close, Identify in the "Known limit:" line).

### Module-to-module arc

Picks up from **M3's wonder.md + M4's security residual** — the unease that has been stewing for two modules finds a bounded home. M5 does not resolve M3/M4; it rescues the groundedness sub-problem only, for this shape of output.

Subtly hands off to **M6 (Evaluations)** — the still-uncertain.md line and the "five claims → hundreds on every build" seam are explicit. The judge file at `judges/groundedness-judge.md` is the literal artifact M6 picks up.

### Mood lands — rescue-not-triumph

Per the rubric (8+/10 at every beat, per-phase + close):
- **Phase 0 close:** 8 — student has a gold standard that feels slightly nervous ("are these the right five?") — the nervousness is the point; they're about to measure their own judgment.
- **Phase 1 close:** 8 — four subagents spawning in parallel on the student's own briefing lands as anticipatory, not overwhelming. The "don't read ahead" gate preserves the measurement.
- **Phase 2 close:** 9 — the scoreboard reveal IS the rescue. Measured winner, measured reasoning. The mechanical-rescue beat lands cleanly.
- **Phase 3 close:** 8 — the judge file feels like a defensible artifact, not a trophy. "Known limit:" line does the anti-triumph work.
- **Exercise close:** 9 — still-uncertain.md line names the scope of the rescue and hands off to M6 as hunger, not closure. M3/M4 residuals intact.

### Teaching moment lands

The exercise is engineered to reliably produce this aha:
- **"Four methods ran in parallel, meta-eval picked the winner empirically, the winning judge has a named blind spot — understandable magic."**

The moment is gated by the meta-evaluator (not the student) naming the winner. Reasonable variation in student skill does not skip the moment: the measurement is the mechanism. If the student rubber-stamps Phase 2, Teacher Claude's prompt — *"look at row 2; what did that detector catch that the others didn't?"* — restores the beat.

### Failure modes named

In maintainer-space (watch-fors):
- Reading briefing before writing gold standard → biases gold standard → fix via coaching ("don't open it")
- Gold standard over-delivers (7+ claims) → precision/recall noise → fix via coaching (stay at 5)
- Meta-evaluator hedges → no clean winner → fix via re-prompting ("force a pick")
- Scoreboard skipped → mood beat stolen → fix via coaching ("look at row 2")
- Judge file sprawls → broad tool that does nothing → fix via 20-line cap

All five have diagnostic + fix. Coverage is strong.

### Time-boxed

55–70 min, broken down: Phase 0 ~12, Phase 1 ~15, Phase 2 ~20, Phase 3 ~10, Close ~5. Hits the 1h45 module slot cleanly. Watch-time (Phases 1+2 combined ~20 min) is explicitly named as the "visceral moment" — the exercise owns its own runtime plainly.

### Facilitator briefing complete

Maintainer-space covers watch-fors, pattern rationale, mood contract, understandable-magic bar, walk-away calibration, gold-standard sizing rule, banned patterns (no manual classification), frameworks, philosophy callouts, plug points, and capability checks owed before first delivery. Thorough. Pass 3 facilitator-notes polish is the only deferred item.

### Riffs on a recognized framework

- **Bake-off / method tournament** — ML-practice pattern; empirical method selection beats authority. Anchoring the LLM work on a concept practitioners recognize.
- **Precision / recall / coverage** — standard eval vocabulary introduced experientially.
- **Gold standard** — earned by writing one in two minutes and seeing what it's worth.

Integrated, not decorative. Best-in-class (not vendor fluff). Strong pass.

### Scaffold / worked example provided

Every artifact is either scaffolded inline or familiar from a prior module:
- Gold standard: inline prompt scaffolds the claim-by-claim questioning.
- Four detectors: inline prompt specifies each detector's method and output path.
- Meta-evaluator: inline prompt specifies precision/recall/coverage computation + scoreboard table shape.
- Judge file: inline prompt specifies 20-line cap + "Known limit:" line + file path.
- Subagent-parallel spawn: familiar from Module 3 (three stances in parallel); four is the scale-up.

No unfamiliar artifact left unsupported.

### Prompt design

Four student-copy prompts. Each passes the design rules:
- No `[BRACKET]` placeholders mid-prompt (all variable content handled via conversation-after pattern — Claude asks the five claim questions in turn; file paths are fixed defaults).
- Paragraph structure on the longer two prompts (detectors + meta-evaluator) — readable.
- Each under ~1 page.
- No walls of text.

One watch-item: the four-detector prompt specifies each detector inline (paragraph each). That's intentional here — the lecture names them, the exercise prompt specifies them so the subagents get a clean brief. Length is earned.

### Plug points real

All three plug points are participant-specific:
- Briefing target = student's own Module 3 synthesized briefing (or any over-reaching output they already care about)
- Four detector methods = calibrated default; domain cohorts can swap/add one (regulatory-claim for compliance, pricing-claim for commercial)
- Gold standard size = 5 default, 7 for long outputs, never below 5

Defaults work. Customization is earned, not forced.

### Voice

Second person throughout. Builder voice ("Four detectors, same briefing, one scoreboard"). No consultant-speak. No "the participant" / "the room." Seth-warmth + Rory-reframes present ("Four detectors fought on the same input...the winner got promoted to a reusable judge file. No intuition."). Risto-directness in the still-uncertain line.

LLM-tell words: none found on scan. No `honest`/`honestly`, `delve`, `landscape`, `importantly`, `crucial`.

### Business-audience language

Scan for banned tech jargon in student-facing body:
- `subagent` — appears 3x in student-facing body ("Claude Code runs them as subagents inside one session", "Spawn all four in parallel", "Watch the four subagent lines scroll past"). **Earned in Module 3** (three-retrievers exercise), so acceptable here — but the word is technical enough that a quick reread should confirm M3 plainly earns it for this audience.
- `meta-evaluator` — technical but explicitly built up through the exercise (gold standard → four detectors → fifth agent scores them). Earned in-exercise.
- `precision / recall / coverage` — earned experientially via the scoreboard; lecture does not pre-lecture them, which is correct.
- No `embeddings`, `vector`, `RAG`, `retrieval` (tech sense), `pipeline`, `orchestration`, `schema`, `architecture`, `frontmatter`, `prompt engineering`. Clean.

`judge` / `judge file` are domain-correct (evals vocabulary) and the exercise earns them.

### Length

~1,150 words (above 400–700 target). Same shape as M2/M3 exercises that shipped APPROVE WITH TODOs on length. The four inline prompts drive it — each prompt is load-bearing and can't compress without losing the detector specifications or the meta-evaluator's computation spec. Contributory judge; does not block ship.

### Specificity

Named mechanics throughout: exact file paths (`module-5/briefing.md`, `module-5/gold-standard.md`, `module-5/detectors/<name>.md`, `module-5/scoreboard.md`, `judges/groundedness-judge.md`), exact score columns (Precision | Recall | Coverage | Hits | False positives | Misses | Notes), realistic claim types (number / competitor behaviour / quote / market-sizing / Monday outcome), exact 5-claim size, exact 20-line judge cap. Strong.

---

## Verdict

**APPROVE WITH TODOs.** All essential judges pass; mood lands 8+/10 at every beat; no auto-fail red flags. Length deferred. Three simulation-surfaced fixes for main thread below (not applied here).

### Top 3 fixes for main thread (ranked)

1. **Phase 0 / Phase 1 — claim tokenization alignment.** The gold standard says "pick exactly five specific claims"; the four detectors are told to evaluate "every specific claim in the briefing." The two runs tokenize the briefing independently and may not overlap — if the meta-evaluator is checking "did detector flag the gold-standard claim?" and the detector's flagged claim is phrased differently, the scoreboard can null out. **Fix:** add one line to the gold-standard prompt (end of Phase 0): *"Quote each claim verbatim from the briefing — the exact sentence or phrase — so the detectors and the meta-evaluator can match on string."* And one line to the meta-evaluator prompt: *"Match detector findings to gold-standard claims by substring overlap, not exact match — a detector flag that names the same claim in different words still counts."*

2. **Phase 0 — "don't read the briefing" gate is load-bearing but underweight.** One sentence (*"Save it and don't read it yet. Reading it biases your gold standard."*) carries the integrity of the entire exercise. For a self-study SVP with Teacher Claude on a side session, the temptation to scan is strong. **Fix:** promote the gate to its own short paragraph, explain the bias mechanism in one more line (*"your gut verdicts are the measuring stick — if you read the briefing first, you'll unconsciously grade toward what's there, not what should be"*), and add a Teacher-Claude nudge hook in the maintainer notes (*"if student asks 'can I scan it?' — no, trust the gut pass"*).

3. **Phase 2 — force-a-pick defense against meta-evaluator hedging.** Current prompt says *"Don't hedge — pick."* Claude's RLHF default on "score these four candidates" is diplomatic ("all four contribute"). **Fix:** strengthen to *"Name one winner. If the top two are within 10% precision/recall, name the winner AND propose a two-method ensemble — but still name the single winner first. Do not return 'all four are useful' or equivalent."* This foreshadows the niceness-tax pattern from the SKILL.md known-behavior list.

### Top 3 ambiguities (exact quotes)

1. *"Pick exactly five specific claims — a number, a named competitor behaviour, a quote, a market-sizing statement, a Monday outcome."* — ambiguous on whether Claude picks the five or the student picks the five. Prompt reads as instructing Claude to pick; the module's teaching move is that the *student* writes the gold standard. Simulation predicts Claude will pick five claims and ask the student to verdict each — which is the intended behavior — but a careful reader hesitates. Tighten to: *"Claude, scan the briefing and propose five claims spanning the spectrum from clearly-grounded to clearly-ungrounded; I'll verdict each one."*

2. *"Each reads the briefing and the sources in module-3/retrievals/, module-3/stances/, and sources/."* — ambiguous on path. Student's Module 3 wrote to `module-3/retrievals/` and `module-3/stances/`, but the `sources/` path is at the training-directory root. A student following this literally may get a "no such file" on `sources/` if their working directory is scoped to something else. Either confirm root-scope or use the explicit relative path.

3. *"If two detectors are close, propose an ensemble (two methods stacked) and say what each catches that the other doesn't. Don't hedge — pick."* — "pick" is ambiguous here: pick a single winner, or pick the ensemble? The maintainer notes say "ensemble cap at two"; the prompt doesn't. Student may end up with an unclear artifact. See fix #3 above.

### Under-scaffolded phases

None requiring rewrite. Phases 1 and 2 are watch-phases where Teacher Claude's job is to keep the student IN the chair (not reading ahead, not skipping the scoreboard). Those are nudge-gaps, not scaffold-gaps. Pass 3 facilitator notes will cover them.

### Claude-behavior mismatches

1. **Question dump on Phase 0 gold-standard prompt.** Exercise says "Ask one question, wait for my answer, then the next." Per SKILL.md known-behavior list, Claude sometimes dumps all five at once. Current prompt addresses this correctly ("Ask one question, wait for my answer, then the next.") — matches the guardrail in the known-behavior list. Leave as-is.

2. **Subagent serialization risk on Phase 1.** Four subagents in parallel is the scale-up from M3's three. Maintainer notes flag the capability-check owed. If four-parallel degrades to sequential, the "felt concurrency" beat weakens — but the pedagogical claim (four files written, measured by meta-eval) survives. Confirm before first delivery.

3. **Meta-evaluator arithmetic drift.** Maintainer notes flag this: *"if the numbers swing wildly run-to-run, tighten the prompt to specify the computation explicitly."* Simulation predicts stable numbers on a 5-claim gold standard but this is worth dry-running before first cohort delivery.

### Strategic question flags

One. **What if the briefing's five gold-standard claims all happen to be grounded?** (The student picked from "clearly grounded to clearly ungrounded" — if their gut calls four grounded + one partly, the scoreboard's recall column is weird and the "winner" call is shakier.) The exercise's gold-standard prompt explicitly instructs *"mix, don't cherry-pick"* — which mitigates — but the student's verdicts are what they are. This is not a break; it's a genuine teaching moment (the scoreboard is plain about its own input quality). Worth naming in Pass 3 facilitator notes as: *"if the gold standard ends up 4:1 grounded-to-ungrounded, the scoreboard still works — the qualitative 'what this detector caught that others missed' column carries the teaching moment when precision/recall are thin."*

---

<!-- maintainer -->

**TODO (from this eval pass):**
1. Apply the three fixes above to `curriculum/exercises/hallucination-bakeoff.md` (main thread).
2. Pass 3 facilitator notes polish — promote the five watch-fors from maintainer-space to structured facilitator-note block, add the "4:1 gold-standard" edge case.
3. Capability dry-runs before first cohort delivery: (a) four-subagent parallel spawn stability, (b) meta-evaluator precision/recall numerical stability across re-runs, (c) `judges/groundedness-judge.md` path handoff to M6 first exercise.

**Simulation — phase-by-phase (compressed):**
- *Phase 0.* Persona opens Claude Code in `~/Documents/agents-101/`. Pastes briefing prompt; Claude asks whether to overwrite if `module-5/briefing.md` exists (overwrite-anxiety pattern from SKILL.md). Says "overwrite." Briefing lands. Does NOT open it (the rule holds, barely). Pastes gold-standard prompt. Claude proposes five claims, asks one at a time. Persona verdicts them gut-first. `gold-standard.md` lands. Mood 8 — "did I get those right?" is the *correct* feeling.
- *Phase 1.* Pastes four-detector prompt. Four subagent lines scroll past (assuming capability check passes). Four files land in `module-5/detectors/`. Resists reading them. Teacher Claude nudges: *"Phase 2 does the comparing — trust the meta-evaluator."* Mood 8.
- *Phase 2.* Pastes meta-evaluator prompt. Scoreboard lands as a markdown table. Reads it. The "detector X won because Y" beat lands. Persona says out loud: *"okay — that's the row."* Mood 9. THIS is the module's rescue moment.
- *Phase 3.* Pastes judge prompt. `judges/groundedness-judge.md` lands, 18 lines, "Known limit:" line reads like the plain-epistemic closer it should. Mood 8.
- *Close.* Writes the still-uncertain line. Teacher Claude runs the 3-question retro. Persona leaves with: *"I can defend this judge. I know what it doesn't catch. And M6 is where it starts running itself."* Mood 9.

**Judge of the eval:** the bake-off exercise is the strongest magic beat on the M3–M8 ramp so far. The scoreboard moment earns the rescue without stealing M6's leverage moment. Ship with the three fixes; the length debt is accepted.
