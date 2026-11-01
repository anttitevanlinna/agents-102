# Lecture: Grounded, and four candidates to measure

[There is truth out there](slides/there-is-truth-out-there.md)

[Mostly right, ten times over, is mostly wrong](slides/mostly-right-ten-times.md)

## A test-and-fix loop collapses the error rate

Say your briefing is 10% fabricated. Say the detector catches 90% of those claims. Fix what it flagged, test again.

Round 1: 10% fabricated → 1% after fix.
Round 2: 1% → 0.1% after fix.
Round 3: 0.1% → 0.01%.

Compounding that destroys single-pass reliability builds loop reliability.

["Are you sure?" is another fluent answer](slides/are-you-sure.md)

## Don't pick a method. Run the candidates.

Somebody tells you *"have the agent read your files before it answers"* or *"do a consistency check."* Each misses things, and you never know which.

Run several methods in parallel on *your* output and *your* strategic question. Measure which one catches what your benchmark says it should.

## Four candidates that fail differently

These four fail in different directions.

**1. Source triangulation.** Does each specific claim appear in at least one file on disk? Catches *invention*: claims with no source.

**2. Entailment.** Does the briefing say more than the sources support? Catches *overreach*.

**3. Citation integrity.** Does each cited source contain the claim? Catches *citation cargo-cult*.

**4. Counter-evidence search.** Look for sources that contradict each claim. Catches claims that crumble under disconfirmation.

## You have done this before

Pick on evidence. The four run as parallel agents on the same 30-claim pool, each writing its own findings file. A scorer measures each: precision, recall, coverage.

On the Mata v. Avianca pre-read, source triangulation caught an unsourced "small firm" and an unsupported "ten minutes" estimate. Entailment caught a too-clean Schwartz timeline. Citation integrity caught a quote absent from the sanctions order. Counter-evidence caught CNBC blurring the $5,000 sanction.

## The judge names its own limit

The winner, or an ensemble of the top two, becomes a reusable judge file. The judge file names the detector that won, why it won, and what it misses.

## In the full agent picture, this is the check

An agent with context, tools, goals and boundaries can still produce fluent, unsupported output: invented case law, invented medications, confident numbers nobody can source.

## A drift signal, never proof

Run the same briefing prompt twice from the same sources, in two sessions. What stays stable, and what drifts? Stable claims can still be unsupported; drift is a warning signal, not proof of fabrication.

Two runs is a demo. The signal firms up at five to ten runs; production wants twenty or thirty.

Create a fresh briefing and extract a 30-claim pool. The main session does not read the claim files until the claims exist.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@4d9c4af2 technical@ab36a5e6 behavior@5fc7188 pedagogy@ab36a5e6 strategy@5fc7188 slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Time:** 12 minutes.

**Placement in module:** After Connections, before the exercise. Primes the empirical-method-selection frame; the exercise runs the benchmark on the student's own M3 material. All four detectors are practised in the exercise. Lecture and exercise are tightly coupled now.

**Family-A alignment (2026-07-02):** the compound-reliability passage is a worded subjunctive illustration labeled "an illustration, not a measurement" in body; the `0.85^10` notation and the derived customer-service percentages (95% each = 86%) were dropped, and the closing shorthand no longer names the constants (`theory-audit.md` § Family A). Zombie-stat guard: do not re-promote the constant to a measured figure or re-add notation. The flip-the-math passage keeps its "Say your briefing has..." illustrative framing.

**Story blend, M5 slides (2026-09-23).** The lecture projects as `##` slides per `module-design/a101-story-proposals/blend.md` § Titles, M5. Four points bind. `## You have done this before` is a backward callback to the three stances and the framework, never a forward pointer. `## A drift signal, never proof` is the module's only self-consistency beat; its two-runs framing sits before the exercise, so it primes what the benchmark is not. `## A test-and-fix loop collapses the error rate` holds the second half of the compound-reliability pair on its own slide, which is what keeps both halves inside the 210-word cap (`check_lectures.md` §5); the blend's list names eight headers and the size gate is why the deck carries more. `## Don't pick a method. Run the candidates.` is the existing lead-in of the same words, and the backing block binds a claim to that string.

<!-- backing -->

Claims
- `single-pass-compound-decay` · detail · "Ten unverified steps in a row at 85% each would land near 20% end-to-end" ← compound-reliability-math
- `first-pass-prior` · detail · "A first pass often lands close to that; treat it as a working prior, not a measurement." ← antti-first-pass-prior
- `loop-collapses-the-error-rate` · detail · "Round 1: 10% fabricated → 1% after fix." ← compound-reliability-math, antti-first-pass-prior
- `mata-detector-first-pass` · detail · "Against the Mata v. Avianca pre-read, source triangulation caught an unsourced 'small firm' descriptor and an unsupported 'ten minutes' estimate" ← mata-detector-passes, mata-court-order, mata-press-account
- `short-chain-example` · vision · "A short customer-service loop shows the difference: look up the order, check the policy, draft the reply" ← none-owed
- `the-word-is-grounded` · vision · "Connected to truth is grounded. Approximating truth without being tied to it is ungrounded." ← none-owed
- `dont-pick-a-method-run-the-candidates` · vision · "Don't pick a method. Run the candidates." ← none-owed
- `source-triangulation` · vision · "For every specific claim, does it appear in at least one file on disk?" ← none-owed
- `entailment` · vision · "Does the briefing say more than the sources actually support?" ← none-owed
- `citation-integrity` · vision · "A citation that doesn't hold is worse than no citation" ← none-owed
- `counter-evidence-search` · vision · "look for sources that contradict it. One contradiction kills the claim" ← none-owed

Sources
- compound-reliability-math `[checked:2026-08-01 result:ATTESTED due:none]` (no URL — arithmetic) — [house canonical] Both directions of the compound-reliability figure. Single-pass: 0.85^10 ≈ 0.197. Loop-based with a 90%-catch detector plus fix: 10% → 1% → 0.1% → 0.01%. **This is arithmetic, not a finding, and the stamp exists to say so** — the numbers are checkable on a calculator and owe no citation. What owes care is the *premise*, and the two halves differ: the 85% per-step figure is illustrative rather than measured; the flip side's 10%/90% pair carries the maintainer's attested working prior (antti-first-pass-prior below), labeled a prior in body. The lecture uses both to motivate a design move rather than to predict a rate. fallback: keep the arithmetic; never present 85% as measured; keep the prior labeled a prior.
- antti-first-pass-prior `[checked:2026-08-02 result:ATTESTED due:none]` attested:Antti 2026-08-02 first-pass error heuristic — [practitioner direct, maintainer-attested] "A first pass gets about one in ten wrong" — standing working prior from the maintainer's own loop practice and trainings (same family as the attested ~10% prior in `orient-and-introspect.md`); the 90% detector figure is the same prior applied to the fix pass. A prior, not a measurement, and the body says so in as many words. fallback: drop to pure stipulation ("say the detector catches 90%") if the attestation needs to soften.
- mata-court-order `[checked:2026-08-23 result:OK due:none]` https://law.justia.com/cases/federal/district-courts/new-york/nysdce/1:2022cv01461/575368/54/ — [primary court record, historical] The sanctions opinion supports the six fabricated opinions and the joint $5,000 sanction. fallback: CourtListener carries docket 54.
- mata-press-account `[checked:2026-08-23 result:OK due:none]` https://www.cnbc.com/2023/06/22/judge-sanctions-lawyers-whose-ai-written-filing-contained-fake-citations.html — [general press, historical] The contemporaneous account is retained specifically as counter-evidence where its sanction wording differs from the primary order. fallback: keep the court-order comparison and drop the press reference.
- mata-detector-passes `[checked:2026-08-03 result:OK due:none]` delegate: `curriculum/lectures/module-5-prework.md` § Factual precision owed — [house canonical] The Mata paragraph under `## You have done this before` narrates a completed detector pass against the two sources above, dated in the delegate's notes: "small firm," "ten minutes" and an unsupported Castel quote are the findings it names, and the delegate carries the per-detector record. fallback: keep "even a careful teaching case benefits from the check" and drop the per-detector detail if the delegate's notes move.

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

**Length:** one deck, every slide inside the cap (`node scripts/check-slide-size.js --file curriculum/lectures/grounded.md --report`). Above the prework-reading band, because it is projected and talked through rather than read cold. Delivered in-room (10-12 min). Four candidates need paragraph-each treatment but each paragraph stays tight because the exercise carries the depth.

**Lecture meta:** *Closer beat is the lead-in to Phase 0 of the Hallucination benchmark exercise. Trainer pivots straight from the "Phase 0 is next" line into the exercise — no separate transition.*
