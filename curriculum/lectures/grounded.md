# Lecture: Grounded, and four candidates to measure

There is truth out there. Your sources carry shards of it. Your agent, left to itself, has no model of truth, only a model of what usually comes next in language that looks like yours.

When you ask it for something your sources support, it produces grounded output. When you ask it for something your sources don't support, it still produces something. The difference between those two states is invisible in the tone of the output. That's the whole problem.

PS: today's four detection techniques ran against the Mata v. Avianca pre-read before class. The story mostly held. And still: source triangulation caught an unsourced "small firm" descriptor and an unsupported "ten minutes" estimate. Entailment caught the story making Schwartz's timeline too clean. Citation integrity caught a direct quote that did not appear in the linked sanctions order. Counter-evidence found a source conflict where CNBC blurred the $5,000 sanction and the court order was more precise. That is the point. Even a careful teaching case benefits from the check.

PPS: the story got fixed, and the four detectors ran again. Source triangulation, entailment, and citation integrity came back clean. Counter-evidence still found the CNBC-vs-court-record conflict on the $5,000 sanction, and the revised story followed the primary court record. A re-run months later caught one more smoothing the earlier passes had walked past; it is fixed, and the next pass may catch another. That is the loop: check, tighten, rerun, keep the remaining uncertainty visible.

**Why this happens, in one sentence.**

Large language models generate the next likely word. Not the next true word; the next likely one. They're trained on text where people spoke confidently, cited specifically, wrote fluently, and the models learned to produce language that looks like all of that, whether the underlying material supports it or not. Fluency is not evidence. Confidence is not correctness. The model has no way to tell you which parts of its output are grounded and which are plausible-sounding fill.

This isn't a bug that gets patched in the next release. It's the shape of the technology. Later models will fabricate less; they won't stop.

**The compound reliability math.**

If an agent were 85% correct on a single step (an illustrative number, picked because it sounds forgivable), that would not sound bad. Eighty-five out of a hundred. You'd forgive that in an intern.

Now run ten steps. Retrieval, synthesis, formatting, writing, checking, rewriting, summarising, publishing. Ten is not a lot. Ten unverified steps in a row at 85% each would land near 20% end-to-end: one task in five correct, four in five with a defect somewhere, usually somewhere you won't see. The arithmetic is an illustration, not a measurement; the compounding is what holds.

This is why agentic customer service behaves (a short chain: look up the order, check the policy, draft the reply, with nothing stacking unverified for long). This is why "let the agent handle the full workflow" doesn't (a long chain, no check anywhere in it). The compounding is the difference between a demo that delights and a production system that leaks.

The number doesn't tell you *what* will go wrong. It tells you that something will. Your job is to design for that, not against it.

**Now flip the math.**

Say your briefing has a 10% fabrication rate: ten ungrounded claims in every hundred. In practice a first pass lands close to that; treat it as a working prior, not a measurement. You test. Say the detector catches 90% of them, the same prior run in reverse. You fix what the detector flagged. Test again. The detector catches 90% of what's left. Fix again.

Round 1: 10% fabricated → 1% after fix.
Round 2: 1% → 0.1% after fix.
Round 3: 0.1% → 0.01%.

The same compounding that destroys single-pass reliability *builds* loop-based reliability. One generation pass is a trap; a test-and-fix loop is the escape. Three rounds of the illustration land at parts-per-ten-thousand, a place you don't reach by making one pass better. You reach it by looping.

This is the shape of the rest of the training. Now you'll run the test side: a benchmark to find the detector that works on *your* output. Later the winning detector goes inside a loop that runs the full test-fix-test cycle without you. That's evals. The compounding-error math is the problem; the compounding-check math is the answer.

**The word is grounded.**

Every output your agent produces is either connected to truth (to specific files, specific numbers, specific quotes in specific sources) or it isn't. Connected to truth is grounded. Approximating truth without being tied to it is ungrounded.

The positive discipline is grounding. The failure mode is fabrication. The failure mode is what makes headlines: the lawyer citing invented case law, the medical chatbot inventing medications, the finance memo with confident numbers nobody can source. But the discipline is what keeps you out of those headlines, and the discipline is grounded.

Grounded isn't "accurate." A grounded claim can still be wrong, if the source it's tied to is wrong. Grounded means *traceable to a real piece of evidence*. Accuracy is a harder question, and an agent alone can't answer it. Traceability is a mechanical discipline, and an agent CAN be forced into it. Start with grounded.

In the full agent picture, this is the check. The agent can have context, tools, goals, and boundaries, and still produce something fluent but unsupported. A check is what makes the standard repeatable.

**Don't pick a method. Run the candidates.**

Somebody tells you *"just have the agent read your files before it answers,"* or *"do a consistency check,"* or *"prompt it to cite sources."* A single method, presented as the answer. You try it, catch some things, miss others, never know what you missed, and move on feeling vaguely better.

That's intuition. The move is empirical.

You have a briefing. You don't know which detection method will catch what matters on *your* output, with *your* sources, on *your* strategic question. Nobody does. Not the framework authors, not the blog posts, not the deck on someone's slide. The only plain answer is to run several candidate methods in parallel and measure which one catches what your benchmark says should have been caught.

Four candidates, chosen because they fail in different directions, so the scoreboard gives you real spread:

**1. Source triangulation.** For every specific claim, does it appear in at least one file on disk? Catches *invention*: claims with no source behind them at all.

**2. Entailment.** Does the briefing say more than the sources actually support? A source that says "one customer complained" doesn't support "the market is unhappy." Catches *overreach*: where the claim stretches past what the evidence carries.

**3. Citation integrity.** When the briefing cites a source, does the source actually contain the claim? A citation that doesn't hold is worse than no citation; it manufactures false authority. Catches *citation cargo-cult*: citations that look load-bearing but aren't.

**4. Counter-evidence search.** Instead of looking for sources that support each claim, look for sources that contradict it. One contradiction kills the claim; a hundred supporting files don't prove it. Catches claims that *look* grounded under confirmation but crumble under disconfirmation.

Four candidates, four different failure modes. In the exercise, they run as four parallel agents on the same 30-claim pool, each writing findings to its own file. A scorer adjudicates the claims against the evidence and measures the detectors: precision, recall, coverage. The scoreboard is the mechanism. You don't argue with it; you read it.

The winner (or an ensemble of the top two) becomes a judge file you carry forward, to where the judge stops being something you run and becomes something that runs itself.

**What this buys you.**

Not certainty. Certainty isn't available. What you buy is a *grounded choice about grounding*: you know which detector won on your material, you know why, you know what it misses, and the judge file you save plainly names its own blind spot.

That last clause is the one that matters. Grounded output names what it doesn't know. A grounded judge names what it can't catch. Ungrounded output pretends to know everything; a cargo-cult judge pretends to catch everything. The difference looks small on the page. In a decision room, it's the difference between a memo that holds up and a memo that detonates.

Now you run the benchmark. Well, not by hand. You set up four detectors, a claim pool, and a scorer. The agents do the work. You watch the scoreboard fill in. The winner becomes a judge file you keep, headed for a loop that runs and improves itself.

Phase 0 is next: a fresh briefing, then a 30-claim pool extracted from it. The claim pool is the measuring surface the rest of the exercise turns on. Keep the main session blind until the claims exist.

<!-- maintainer -->

**Time:** 10–12 minutes.

**Placement in module:** After Connections, before the exercise. Primes the empirical-method-selection frame; the exercise runs the benchmark on the student's own M3 material. All four detectors are practised in the exercise. Lecture and exercise are tightly coupled now.

**Family-A alignment (2026-07-02):** the compound-reliability passage is a worded subjunctive illustration labeled "an illustration, not a measurement" in body; the `0.85^10` notation and the derived customer-service percentages (95% each = 86%) were dropped, and the closing shorthand no longer names the constants (`theory-audit.md` § Family A). Zombie-stat guard: do not re-promote the constant to a measured figure or re-add notation. The flip-the-math passage keeps its "Say your briefing has..." illustrative framing.

<!-- backing -->

Claims
- `single-pass-compound-decay` · detail · "Ten unverified steps in a row at 85% each would land near 20% end-to-end" ← compound-reliability-math
- `first-pass-prior` · detail · "In practice a first pass lands close to that; treat it as a working prior, not a measurement." ← antti-first-pass-prior
- `loop-collapses-the-error-rate` · detail · "Round 1: 10% fabricated → 1% after fix." ← compound-reliability-math, antti-first-pass-prior
- `mata-detector-first-pass` · detail · "today's four detection techniques ran against the Mata v. Avianca pre-read before class" ← mata-detector-passes
- `mata-detector-rerun` · detail · "the story got fixed, and the four detectors ran again … A re-run months later caught one more smoothing the earlier passes had walked past" ← mata-detector-passes
- `cs-short-chain-behaves` · detail · "This is why agentic customer service behaves (a short chain: look up the order, check the policy, draft the reply, with nothing stacking unverified for long). This is why \"let the agent handle the full workflow\" doesn't" ← kb-customer-service-chain-length
- `the-word-is-grounded` · vision · "The word is grounded." ← none-owed
- `dont-pick-a-method-run-the-candidates` · vision · "Don't pick a method. Run the candidates." ← none-owed
- `source-triangulation` · vision · "For every specific claim, does it appear in at least one file on disk?" ← none-owed
- `entailment` · vision · "Does the briefing say more than the sources actually support?" ← none-owed
- `citation-integrity` · vision · "A citation that doesn't hold is worse than no citation" ← none-owed
- `counter-evidence-search` · vision · "look for sources that contradict it. One contradiction kills the claim" ← none-owed

Sources
- compound-reliability-math `[checked:2026-08-01 result:ATTESTED due:none]` (no URL — arithmetic) — [house canonical] Both directions of the compound-reliability figure. Single-pass: 0.85^10 ≈ 0.197. Loop-based with a 90%-catch detector plus fix: 10% → 1% → 0.1% → 0.01%. **This is arithmetic, not a finding, and the stamp exists to say so** — the numbers are checkable on a calculator and owe no citation. What owes care is the *premise*, and the two halves differ: the 85% per-step figure is illustrative rather than measured; the flip side's 10%/90% pair carries the maintainer's attested working prior (antti-first-pass-prior below), labeled a prior in body. The lecture uses both to motivate a design move rather than to predict a rate. fallback: keep the arithmetic; never present 85% as measured; keep the prior labeled a prior.
- antti-first-pass-prior `[checked:2026-08-02 result:ATTESTED due:none]` attested:Antti 2026-08-02 first-pass error heuristic — [practitioner direct, maintainer-attested] "A first pass gets about one in ten wrong" — standing working prior from the maintainer's own loop practice and trainings (same family as the attested ~10% prior in `orient-and-introspect.md`); the 90% detector figure is the same prior applied to the fix pass. A prior, not a measurement, and the body says so in as many words. fallback: drop to pure stipulation ("say the detector catches 90%") if the attestation needs to soften.
- mata-detector-passes `[checked:2026-08-03 result:OK due:none]` (no URL — house verification passes; delegate: `curriculum/lectures/module-5-prework.md` § Factual precision owed) — [house canonical] The PS/PPS narrate this file's own completed passes, dated in the delegate's notes. First pass + fix 2026-04-30: "small firm" / "ten minutes" / Castel quote removed, Schwartz timeline softened, $5,000-jointly verified from docket 54. Re-run 2026-08-03, all four techniques against docket 54's full text: one residual triangulation finding caught and fixed the same day (the story counted citations as fabrications), CNBC-vs-order conflict still visible with the story on the order's side, otherwise clean. fallback: the PPS's loop sentence stands on the recorded passes alone; drop the clean-pass clause if the delegate's notes move.
- kb-customer-service-chain-length `[checked:2026-08-02 result:OK due:2026-09-28]` kb:continuous-research/findings/by-domain/customer-service.md — [KB staging; domain file at L3] "Customer service is the only business domain that has crossed the chasm... The compound reliability math (85% per step) works here because CS interactions are 2-3 steps, not 10"; the failing long-chain half sits in the same file's Counter-Evidence section. Counter-weights recorded there: the Klarna reversal, the Qualtrics 4x-failure figure, "No independent verification of any platform's resolution rate claims." due = the KB file's own update + 6mo. fallback: keep the chain-length design point, drop the domain example.

Frameworks
- Compound-reliability floor · [borrow:none] · law:compound-reliability-floor-0-85 · ← compound-reliability-math — naming both halves is what turns the math from despair into design
- Grounded-ness as epistemic stance · [borrow:journalism and legal drafting] · law:none · ← cultural-vocab
- Benchmarking · [borrow:empirical evaluation] · law:eval-judge-verifier-gate · ← cultural-vocab — the lecture names why benchmarking beats intuition; the exercise runs it

Stance `[stance:2026-08-01 level:L1]`
- holds: that chain length rather than single-step quality is what kills autonomy, and that a detect-and-fix loop collapses the error rate. The first is arithmetic given the premise; the second is the design conclusion the whole module turns on.
- contested: **the 85% premise itself, which is illustrative and should never be quoted as measured** — and symmetrically, the flip side's 10%/90% pair, which is an attested working prior and must stay labeled a prior. No published per-step reliability figure for agentic steps is trustworthy at this level of generality, and the lecture is careful to use every number as a lens rather than a rate. That care is the fragile part — a reader in a hurry sees a percentage and remembers a finding.
- would-move-it: nothing about the arithmetic. What would move the teaching is credible measurement of real per-step reliability, which would let the lecture use a real number instead of a round one.

OODA
- question: has anyone published defensible per-step reliability measurements for agentic chains, as opposed to end-to-end task benchmarks?
- roster: METR, Anthropic and OpenAI eval publications, Hamel Husain, Shreya Shankar
- last-run: 2026-08-01

<!-- /backing -->
**Philosophy callout (sparing):**
- Belief — Name what you don't know — lands in the closing. The judge's "Known limit:" line makes the belief operational.
- Belief — Practice beats external proof — continues from M4. Running the benchmark is the discipline; no amount of reasoning about which method *should* win substitutes for measuring.

**Why four, not three, and not ten:**
- Four gives the scoreboard real spread without drowning the student. Three collapses on close races; ten is paralysis.
- Each of the four maps to a distinct failure mode (invention, overreach, citation cargo-cult, confirmation-only grounding). The methods aren't redundant; they're complementary.
- Ensemble of top two is the plain ship — the lecture primes the student to expect that outcome rather than a clean single winner.

**Rejected framings:**
- *"Three techniques you'll use"* (previous version) — taught methods-to-know when the point is methods-to-measure. Empirical selection is the transferable skill; memorising three techniques is not.
- *Named after the vendors who coined them* (RAG-check, self-consistency, etc.) — ties the teaching to current vendor fashion. The methods survive the fashion when they're named by what they catch.
- *Ranking the methods by importance* — the exercise measures importance empirically on the student's own material. Pre-ranking would steal the teaching.

**Capability check owed:**
- None specific to this lecture. Delivery is trainer + screen; no Claude Code interaction during the lecture itself.

**Watch-fors (deferred to facilitator notes pass):**
- **"Just use a better model."** Student hears "fabrication is permanent" and asks whether the next model fixes it. Coach: *"Less, but not zero. The shape of the technology makes some level permanent. Design around it."*
- **"What about RAG / vector databases / fine-tuning?"** Technical student asks. Coach: *"Those help with grounding by giving the agent better raw material. They don't change the detection job. The candidates still apply — they're measuring the output, not the retrieval."*
- **"Can't I just pick the best one and skip the benchmark?"** Impatient student. Coach: *"On what basis? You don't know what your briefing's failure modes are until you measure. The benchmark IS the method selection — skipping it means picking by vibe."*
- **Compound reliability math resistance.** Some students will want to argue the 85% number. Coach: *"The number is illustrative. Whatever YOUR number is, run the math. The compounding is the real point."*

**Length:** ~950 words. Prework-reading band (800-1200) — above demo-script band (350-600). Delivered in-room (10-12 min). Four candidates need paragraph-each treatment but each paragraph stays tight because the exercise carries the depth.

**Lecture meta:** *Closer beat is the lead-in to Phase 0 of the Hallucination benchmark exercise. Trainer pivots straight from the "Phase 0 is next" line into the exercise — no separate transition.*

**Quality:** compendium-audited 2026-08-03 (writing@3d8309c story@3d8309c technical@5fc7188 behavior@5fc7188 pedagogy@5fc7188 strategy@5fc7188 slides@3d8309c)
- judges @3d8309c: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
