# Lecture: Grounded, and five candidates to measure

There is truth out there. Your sources carry shards of it. Your agent, left to itself, has no model of truth, only a model of what usually comes next in language that looks like yours.

When you ask it for something your sources support, it produces grounded output. When you ask it for something your sources don't support, it still produces something. The difference between those two states is invisible in the tone of the output. That's the whole problem.

**Why this happens, in one sentence.**

Large language models generate the next likely word. Not the next true word; the next likely one. They're trained on text where people spoke confidently, cited specifically, wrote fluently, and the models learned to produce language that looks like all of that, whether the underlying material supports it or not. Fluency is not evidence. Confidence is not correctness. The model has no way to tell you which parts of its output are grounded and which are plausible-sounding fill.

This isn't a bug that gets patched in the next release. It's the shape of the technology. Later models will fabricate less; they won't stop.

**The compound reliability math.**

If an agent is 85% correct on a single step (an illustrative number, picked because it sounds forgivable), that's not bad. Eighty-five out of a hundred. You'd forgive that in an intern.

Now run ten steps. Retrieval, synthesis, formatting, writing, checking, rewriting, summarising, publishing. Ten is not a lot. 85% per step, ten steps: 0.85^10 = about **20%.** One in five runs is end-to-end correct. Four in five have a defect somewhere, usually somewhere you won't see.

This is why agentic customer service works (2–3 steps: look up the order, check the policy, draft the reply, at 95% each = 86% end-to-end). This is why "let the agent handle the full workflow" doesn't (10 steps, 85% each = 20%). The math is the difference between a demo that delights and a production system that leaks.

The number doesn't tell you *what* will go wrong. It tells you that something will. Your job is to design for that, not against it.

**Now flip the math.**

Say your briefing has a 10% fabrication rate: ten ungrounded claims in every hundred. You test. A decent detector catches 90% of them; it's that easy, because fabrication leaves fingerprints. You fix what the detector flagged. Test again. The detector catches 90% of what's left. Fix again.

Round 1: 10% fabricated → 1% after fix.
Round 2: 1% → 0.1% after fix.
Round 3: 0.1% → 0.01%.

The same compounding that destroys single-pass reliability *builds* loop-based reliability. One generation pass is a trap; a test-and-fix loop is the escape. Three rounds and you're at parts-per-ten-thousand, a place single-pass generation cannot reach, no matter how good the model gets.

This is the shape of the rest of the training. Now you'll run the test side: a benchmark to find the detector that works on *your* output. Module 6 puts that detector in a loop that runs the full test-fix-test cycle without you. That's evals. The 85%-to-20% math is the problem; the 10%-to-0.01% math is the answer.

**The word is grounded.**

Every output your agent produces is either connected to truth (to specific files, specific numbers, specific quotes in specific sources) or it isn't. Connected to truth is grounded. Approximating truth without being tied to it is ungrounded.

The positive discipline is grounding. The failure mode is fabrication. The failure mode is what makes headlines: the lawyer citing invented case law, the medical chatbot inventing medications, the finance memo with confident numbers nobody can source. But the discipline is what keeps you out of those headlines, and the discipline is grounded.

Grounded isn't "accurate." A grounded claim can still be wrong, if the source it's tied to is wrong. Grounded means *traceable to a real piece of evidence*. Accuracy is a harder question, and an agent alone can't answer it. Traceability is a mechanical discipline, and an agent CAN be forced into it. Start with grounded.

**Don't pick a method. Run the candidates.**

Somebody tells you *"just have the agent read your files before it answers,"* or *"do a consistency check,"* or *"prompt it to cite sources."* A single method, presented as the answer. You try it, catch some things, miss others, never know what you missed, and move on feeling vaguely better.

That's intuition. The move is empirical.

You have a briefing. You don't know which detection method will catch what matters on *your* output, with *your* sources, on *your* strategic question. Nobody does. Not the framework authors, not the blog posts, not the deck on someone's slide. The only plain answer is to run several candidate methods in parallel and measure which one catches what your benchmark says should have been caught.

Five candidates, chosen because they fail in different directions, so the scoreboard gives you real spread:

**1. Source triangulation.** For every specific claim, does it appear in at least one file on disk? Catches *invention*: claims with no source behind them at all.

**2. Entailment.** Does the briefing say more than the sources actually support? A source that says "one customer complained" doesn't support "the market is unhappy." Catches *overreach*: where the claim stretches past what the evidence carries.

**3. Citation integrity.** When the briefing cites a source, does the source actually contain the claim? A citation that doesn't hold is worse than no citation; it manufactures false authority. Catches *citation cargo-cult*: citations that look load-bearing but aren't.

**4. Self-consistency.** Regenerate the briefing and diff the versions. Claims that hold steady across regenerations are defended by the sources; claims that drift or disappear are fabrications the model couldn't stand behind twice. Catches *unstable invention*: output the model couldn't defend on a second try.

**5. Counter-evidence search.** Instead of looking for sources that support each claim, look for sources that contradict it. One contradiction kills the claim; a hundred supporting files don't prove it. Catches claims that *look* grounded under confirmation but crumble under disconfirmation.

Five candidates, five different failure modes. In the exercise, they run as five parallel agents on your briefing, each writing findings to its own file. A scorer measures them against a five-claim benchmark you write yourself: precision, recall, coverage. The scoreboard is the mechanism. You don't argue with it; you read it.

The winner (or an ensemble of the top two) becomes a judge file you carry into Module 6, where the judge stops being something you run and becomes something that runs itself.

**What this buys you.**

Not certainty. Certainty isn't available. What you buy is a *grounded choice about grounding*: you know which detector won on your material, you know why, you know what it misses, and the judge file you save plainly names its own blind spot.

That last clause is the one that matters. Grounded output names what it doesn't know. A grounded judge names what it can't catch. Ungrounded output pretends to know everything; a cargo-cult judge pretends to catch everything. The difference looks small on the page. In a decision room, it's the difference between a memo that holds up and a memo that detonates.

Now you run the benchmark. Well, not by hand. You set up five detectors, a scorer, and a five-claim benchmark. The agents do the work. You watch the scoreboard fill in. The winner becomes a judge file you'll carry into Module 6, where it goes inside a loop that runs and improves itself.

Phase 0 is next: a fresh briefing, then five claims you write in two minutes. The benchmark you're about to author is the measuring stick the rest of the exercise turns on. Write it from your gut, not from the briefing.

**Time:** 10–12 minutes.

<!-- maintainer -->

**Placement in module:** After Connections, before the exercise. Primes the empirical-method-selection frame; the exercise runs the benchmark on the student's own M3 material. All five detectors are practised in the exercise (unlike the earlier three-technique version where only citation re-verification was practised hands-on). Lecture and exercise are tightly coupled now.

**Frameworks riffed on:**
- **Compound reliability math — both directions.** Single-pass: 85%^10 = 20% (the trap). Loop-based: 10% → 1% → 0.1% → 0.01% with 90%-catch detector + fix (the escape). Naming both halves is what converts the math from despair to design. The second half is the strategic bridge to M6 — evals aren't a quality gate, they're the mechanism that collapses the error rate.
- **Grounded-ness as epistemic stance** — journalism/research/legal drafting recognisable move.
- **Benchmarking** — the empirical-selection pattern lifted from serious evals work (Antti's own, among others). Lecture names WHY benchmarking beats intuition; exercise runs the benchmark.
- **Benchmark as the measuring stick** — tiny (5 claims), plain, enough to measure against. No vendor reference; your own judgment is the judge of the judges.

**Philosophy callout (sparing):**
- Belief #21 — name what you don't know — lands in the closing. The judge's "Known limit:" line IS #8 made operational.
- Belief #14 — practice beats external proof — continues from M4. Running the benchmark is the discipline; no amount of reasoning about which method *should* win substitutes for measuring.

**Why five, not three, and not ten:**
- Five gives the scoreboard real spread without drowning the student. Three collapses on close races; ten is paralysis.
- Each of the five maps to a distinct failure mode (invention, overreach, citation cargo-cult, unstable invention, confirmation-only grounding). The methods aren't redundant; they're complementary.
- Ensemble of top two is the plain ship — the lecture primes the student to expect that outcome rather than a clean single winner.

**Rejected framings:**
- *"Three techniques you'll use"* (previous version) — taught methods-to-know when the point is methods-to-measure. Empirical selection is the transferable skill; memorising three techniques is not.
- *Named after the vendors who coined them* (RAG-check, self-consistency, etc.) — ties the teaching to current vendor fashion. The methods survive the fashion when they're named by what they catch.
- *Ranking the five by importance* — the exercise measures importance empirically on the student's own material. Pre-ranking would steal the teaching.

**Capability check owed:**
- None specific to this lecture. Delivery is trainer + screen; no Claude Code interaction during the lecture itself.

**Watch-fors (deferred to facilitator notes pass):**
- **"Just use a better model."** Student hears "fabrication is permanent" and asks whether the next model fixes it. Coach: *"Less, but not zero. The shape of the technology makes some level permanent. Design around it."*
- **"What about RAG / vector databases / fine-tuning?"** Technical student asks. Coach: *"Those help with grounding by giving the agent better raw material. They don't change the detection job. All five candidates still apply — they're measuring the output, not the retrieval."*
- **"Can't I just pick the best one and skip the benchmark?"** Impatient student. Coach: *"On what basis? You don't know what your briefing's failure modes are until you measure. The benchmark IS the method selection — skipping it means picking by vibe."*
- **Compound reliability math resistance.** Some students will want to argue the 85% number. Coach: *"The number is illustrative. Whatever YOUR number is, run the math. The compounding is the real point."*

**Length:** ~950 words. Prework-reading band (800-1200) — above demo-script band (350-600). Delivered in-room (10-12 min). Five candidates need paragraph-each treatment but each paragraph stays tight because the exercise carries the depth.

**Lecture meta:** *Closer beat is the lead-in to Phase 0 of the Hallucination benchmark exercise. Trainer pivots straight from the "Phase 0 is next" line into the exercise — no separate transition.*

**Quality:** draft 2026-04-28 (Pass 3 polish — sim/eval not yet run)
- compendium-audited 2026-04-28 (check_writing, check_student_facing, check_lectures, check_pedagogy, check_prompts)
