# The gate is a claim too

## Passing is not proof
<!--tier:2-->

- A gate only means what the gate can see. Green is a claim about the check, not a fact about the work. A result passes for three different reasons that look identical from outside: the judge is miscalibrated, the gate got gamed, or the session was a lucky sample.
- The check you built is itself a claim that wants verifying. The same scrutiny you point at the agent's work points at the thing that judges the work. A gate nobody has verified is a gate trusted on vibes.
- Those three failure modes have different countermoves: compare the judge with your own judgements, keep a separate check the agent never sees, or repeat the task across several sessions. You do not need to build these today; ask your agent to walk you through the relevant one when you need it.
- The three countermoves share one property: independence. Each rests the verdict on something the system under test does not control: judgements the judge never produced, a check the agent never sees, sessions beyond this one. A same-window double-check has none of it; the second read inherits the first one's framing: shared framing, shared blind spots.

## The judge needs calibrating against your own judgement
<!--tier:2-->

- An LLM judge is another untested component. Until you compare its verdicts with your own review, you do not know its false-pass rate, how often it approves work you would reject.
- The move: compare a handful of your own judgements with the judge's verdicts, and teach the judge until you converge. You are looking for disagreement patterns, not a significance test. Re-check when the model or the task shifts. Hamel Husain reports better than 90% agreement after three iterations of exactly this loop.
- A good gate starts from real traces, not imagined failures. Read sessions that actually happened, sort the real failures into buckets, and write the first check for the biggest bucket. A gate built from the armchair catches the failures you pictured and misses the ones you have.

## Gates decay
<!--tier:2-->

- **Goodhart's law:** when a measure becomes a target, it ceases to be a good measure. The agent is an optimizer aimed straight at your gate: it may special-case tests, keyword-stuff work for the judge, or edit assertions until they pass. No malice needed: optimization pressure finds the cheapest path to green.
- Passing while missing the intent is a signature, not bad luck. When work clears the gate and still is not what you meant, the gate has decayed into a target. That is a reason to refresh the gate, not to shrug.
- The countermoves are a hold-out and an integrity check. Keep a check the agent never sees, so nothing can optimize against it. After a suspicious pass, inspect the gate itself (the test file, the judge prompt, the asserts), not only its verdict.

## One session is a sample
<!--tier:3-->

- The agent's behavior is a distribution, not a property. Reachable and dependable are different claims: passing once shows the task is reachable, passing again and again shows it is dependable.
- Before crediting an improvement, run it repeatedly. A new rule, a new prompt, a new gate: judge it on pass rates across several sessions, not on the one session that followed the change.

## Change on recurrence, not on noise
<!--tier:3-->

- One stochastic miss is not a process failure. A system with session-to-session variance produces the odd miss even when nothing is wrong. W. Edwards Deming called this **tampering**: chasing ordinary variance case by case adds noise of its own.
- React on recurrence. The same failure shape returning is signal. That is when the rule changes, the gate refreshes, or the skill ships.
- Watch the regression-to-the-mean trap. After a bad session, the next session is usually better with no change at all. A tweak made right after a failure looks effective even when it did nothing.

## The delegation frontier
<!--tier:2-->

{{figure:delegation-frontier}}

- Every task you hand off sits on two axes. Reach is how much you delegated: the size of the task, the distance between checks. Calibration is whether your trust in what came back was earned by a check you have verified.
- Four states fall out. Low reach is chat-shaped work or controlled assistance: you read everything, so trust is not the question yet. High reach splits on calibration alone. Calibrated agency when the gates behind the green are ones you have measured, reckless autonomy when they are not. From outside, the two look identical.
- The model limits the difficulty of the challenge you can delegate; the gates limit whether you can trust the result. Useful delegation stops at whichever limit comes first. A stronger model behind an unverified gate still leaves you with work you cannot safely accept.
- The frontier moves outward only as fast as the gates behind it. Push reach past your calibration and you are not delegating more. You are checking less.
- Sutton's **bitter lesson**: built-in human knowledge wins today and loses to the next model. Today's right procedure, your gates and workflow, yours or the agent's, is superseded too. Retire what the next model outgrows, add what it needs.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all five law slides kept bullets; every bolded lead de-bolded. Two handles kept, at their naming sub-spans: **Goodhart's law** (Gates decay slide) and **tampering** (Deming, Change-on-recurrence slide); slides 1, 2, and 4 carry zero bold (headers carry the laws). Lede + closing line untouched. Per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Mood:** gate-skepticism after the build. The verifier just landed the packaged re-send; this names why a green gate can still lie. Register is Boris-precise plus a Rory reframe (green is a claim, not proof), NOT reassurance and NOT resolved optimism. The closer opens doubt about the gate; it does not close it.

**Promoted** from `supplementary/the-gate-is-a-claim.md` to a proper M5-close lecture in slide format. Audited — see the Quality line below. *(Corrected 2026-07-31: this line denied its own audit while the file carried a 2026-07-27 all-PASS one. Present-tense state, not a changelog — `check_writing.md §3`.)*

**Placement:** M5 close, final lecture, immediately after `what-packaging-is.md`. Recognition-after-building (`check_lectures §1`): the student built a verifier and re-sent the packaged run before this page names the gate's own fallibility. No cross-module sequencing in the body (`check_lectures §3`); any onward pointer lives in the module file's `## Next`.

**Frontier slide added 2026-07-26 (Antti placement call: "M5 closer"):** *The delegation frontier* as the deck's closing zoom-out — reach × calibration, four states (chat-shaped work · controlled assistance · reckless autonomy · calibrated agency), frontier moves only as fast as the gates. Home-grown, L0, no citation owed; doubles as the model behind the AE101 day-30 measurement design (transcript states + PR-layer rework as calibration's outcome anchor — measurement stays maintainer-side, unpiloted, NOT a body claim). Mood-checked: the slide's fourth bullet holds the reckless-autonomy warning ("you are checking less") and the fifth puts a shelf life on the calibration itself (see the bitter-lesson note below); neither resolves the closer's open doubt. The optimistic twin beat (compounding moves the frontier outward) is deliberately withheld here — PLACED 2026-07-27 as one payoff bullet on `the-map-filled-in`'s closing slide. "Calibration" is earned two slides up (the judge-calibration slide); zero bold (header carries the handle). **Three files render this canvas, each through the same `{{figure:delegation-frontier}}` marker; the source is `curriculum/figures/delegation-frontier.md`, so it changes in one place.** `when-a-plan-is-good.md` renders it at M2 under `## What you can test and check sets your complexity ceiling`, teaching the two axes against the plan read while leaving the four states as figure furniture; `supplementary/agentic-engineering-progression.md` renders it in the M1→M2 gap. The M2 slide holds the name back so this one keeps the naming beat, and its closing bullet plants that the ceiling moves — which does not soften the doubt held open here, since this closer's doubt is about whether a gate tells the truth, not about whether ceilings move. The model therefore appears twice in-room by design (`check_pedagogy.md §9b`) — this slide is the second in-room encounter, plugging the same axes into the verifier the student just built, so read it as recognition rather than introduction. Learners may also have met the model in the optional M1→M2 reading and again in M4 Prework.

**Antti decisions (2026-07-27):** six slides confirmed as THE M5 closer; all five laws kept (no error-analysis trim, no don't-tamper cut; combined close packaging ~12–15 + gate 7–9 accepted against the 1h45 runtime); the slide-5 kicker ("A gate is one more claim…") stays as the laws' summary line so the deck ends on the frontier slide; 2×2 figure added to the frontier slide in the house SVG style (blank-line-free figure block per the engine-SVG rule; the frontier-definition sentence is carried once, in the figure caption, and dropped from bullet 3). Six slides is the runtime call, so anything new lands as a bullet inside an existing slide, never as a seventh.

**Bitter-lesson bullet, fifth on the frontier slide (2026-08-21, Antti-directed: "mention bitter lesson on the end"; "write for software engineers, but write it so that procedure has to be ever-evolving").** Bullet 4 warns against reach outrunning calibration; this one says the calibration itself has a shelf life. Sutton's pattern read for engineers, both halves kept: built-in knowledge is genuinely right today and is still superseded by the next model, and the gates, rules and workflow are the built-in part. *Today's right procedure* is not a concession, it is the lesson: the procedure being correct is what makes its replacement bitter. **The built-in part includes what the agent authored (Antti: "it is not only about the hand-built. It is also what we built with current agents").** A verifier Claude wrote in M5 is calibrated to the failures of the model that wrote it, as surely as a rule the student typed; *"yours or the agent's"* carries that and is load-bearing, do not cut it to buy words. The bullet's job is the imperative at its end, *retire / add per model*, so the procedure reads as something you keep editing, not something you finish. Not written as a bet that gates are futile, and not as reassurance. **Guards.** (a) Sutton is named, Mollick is not: the term is Sutton's, and Mollick's garbage-can counterweight is the M4→M5 gap read (`run-the-first-experiment.md § Pre-reads before Module 5`), which the student may or may not have taken. The bullet earns the term in its own breath for the one who did not. (b) **Slide is at 209w/5b against a 210w/6b cap** (`check-slide-size.js`) — one word of headroom, so anything added here buys its space from an existing bullet. (c) `**bitter lesson**` is the third naming handle on this deck, same class and same treatment as **Goodhart's law** and **tampering** under the 2026-07-09 emphasis pass: bold on the naming sub-span only. (d) No half-life is claimed; *"the next model"* keys the edit to model generations, not to a calendar. Do not add a number.

**Independence bullet (2026-08-09, Antti-directed; buried-gold item):** fourth bullet on *Passing is not proof* — the unifier of the three countermoves; the closing law-kicker (*a second call is a second opinion only when something changed*) was cut 2026-08-25 (Antti-approved, sentence-count pass) with the survivorship-bias and rule-churn sentences on their slides — in each case the neighbouring sentence carries the content. Slide now under the blessed cap. Guards: (a) NOT a sixth law — it unifies law 1's countermoves; the deck's enumerable content is slide 1's three failure modes, and no lede count re-promises them. (b) *"has none of it"* is scoped to independence — a same-window re-read still catches typos; do not strengthen to "catches nothing," do not soften into a mitigation list. (c) **The mechanism is priming, not politeness.** The generator's framing produced the errors and still governs any judge sharing its state — framing-borne errors are invisible from inside the frame (perception). RLHF charity is the separate, smaller half: it tilts what gets said about flaws the model can already see (reporting). A harsher ask lowers the reporting threshold; it does not move the blind spot. Question-variation (over-flag, role-mask) is therefore deliberately absent from the countermove list — do not "improve" the bullet into ask-harder advice, and do not add over-flag as a fourth anchor; the three anchors are all state-external on purpose. (d) Zero bold on this slide upheld (2026-07-09 emphasis pass); the header carries the law. (e) `check_pedagogy §9b` second encounter: the felt first is M3's *same-window self-charity* (`author-test-strategy-skill.md`); this is the varied naming — modules un-named per `check_lectures §3`. Downstream joins stay un-cited on purpose: the verifier graded in its authoring window (diagnose-and-resend Phase 3), the fresh re-send session's cache rationale (learn-from-the-test), the background-agent shape's separateness, Ralph re-feed as the least independent shape on the menu. Trainer line: *"asking harder changes what gets reported, not what gets seen."*

**Laws carried (5 + closing frame):** green-is-a-claim (passing is not proof) · calibrate-the-judge · Goodhart/gate-decay · one-run-is-a-sample · don't-tamper (change on recurrence). Slide 1 additionally carries the independence unifier (second-call law) — a property of law 1's countermoves, not a sixth law. Trimmed from the reference-dose supplementary: hold-out and integrity-check folded into the gate-decay slide; the error-analysis-first bullet kept tight on the calibrate slide (cut candidate — see eyeball). The demo-is-pass-once bullet was cut as a restatement; the regression-to-the-mean trap remains.

**Lecture meta:** *7–9 min M5 closer, deck-shaped, six slides: five gate laws plus the delegation-frontier zoom-out. Names the fallibility of the verifier the student just built, then the shorter shelf life of every gate that passes. Earns each law from the gate in front of them, not cold.*

**Delivery mode:** In-room close, projected, after `what-packaging-is.md`.

**Time:** 9 min at presentation pace (recognition; the student built the gate this module).

<!-- backing -->

Claims
- `gate-is-a-claim-too` · vision · "The check you built is itself a claim that wants verifying." ← none-owed — re-anchored 2026-08-25 when the pre-slide preamble was cut; the H1's thesis now rests on this slide-1 bullet
- `green-is-a-claim-not-proof` · vision · "Green is a claim about the check, not a fact about the work." ← none-owed
- `three-reasons-a-pass-looks-identical` · vision · "the judge is miscalibrated, the gate got gamed, or the session was a lucky sample" ← none-owed
- `three-failures-have-different-countermoves` · vision · "compare the judge with your own judgements, keep a separate check the agent never sees, or repeat the task across several sessions" ← none-owed
- `countermoves-share-independence` · vision · "The three countermoves share one property: independence." ← none-owed
- `judge-has-unknown-false-pass-rate` · vision · "Until you compare its verdicts with your own review, you do not know its false-pass rate" ← none-owed
- `handful-teach-until-convergence` · vision · "compare a handful of your own judgements with the judge's verdicts, and teach the judge until you converge" ← none-owed
- `husain-ninety-percent-three-iterations` · detail · "Hamel Husain reports better than 90% agreement after three iterations of exactly this loop." ← husain-llm-judge
- `error-analysis-before-armchair` · detail · "A good gate starts from real traces, not imagined failures." ← husain-field-guide, husain-evals
- `goodhart-gates-decay` · borrowed · "**Goodhart's law:** when a measure becomes a target, it ceases to be a good measure. The agent is an optimizer aimed straight at your gate" ← cultural-vocab
- `passing-while-missing-intent-is-a-signature` · vision · "When work clears the gate and still is not what you meant, the gate has decayed into a target." ← none-owed
- `holdout-and-integrity-check` · vision · "Keep a check the agent never sees, so nothing can optimize against it." ← none-owed
- `behaviour-is-a-distribution` · vision · "The agent's behavior is a distribution, not a property." ← none-owed
- `reachable-is-not-dependable` · vision · "passing once shows the task is reachable, passing again and again shows it is dependable" ← none-owed
- `deming-tampering` · borrowed · "W. Edwards Deming called this **tampering**" ← cultural-vocab
- `react-on-recurrence` · vision · "The same failure shape returning is signal." ← none-owed
- `regression-to-the-mean-trap` · borrowed · "After a bad session, the next session is usually better with no change at all." ← cultural-vocab
- `two-axes-reach-and-calibration` · vision · "Every task you hand off sits on two axes." ← none-owed
- `four-states-fall-out` · vision · "Calibrated agency when the gates behind the green are ones you have measured, reckless autonomy when they are not." ← none-owed
- `useful-delegation-stops-at-the-first-limit` · vision · "The model limits the difficulty of the challenge you can delegate; the gates limit whether you can trust the result. Useful delegation stops at whichever limit comes first." ← none-owed
- `frontier-moves-with-the-gates` · vision · "The frontier moves outward only as fast as the gates behind it." ← none-owed
- `bitter-lesson-wins-today-loses-next` · borrowed · "Sutton's **bitter lesson**: built-in human knowledge wins today and loses to the next model." ← cultural-vocab
- `todays-procedure-is-superseded-too` · vision · "Today's right procedure, your gates and workflow, yours or the agent's, is superseded too." ← none-owed
- `retire-and-add-per-model` · vision · "Retire what the next model outgrows, add what it needs." ← none-owed

Sources
- husain-llm-judge `[checked:2026-07-02 result:OK due:2027-01-02]` https://hamel.dev/blog/posts/llm-judge/ — [practitioner direct] Hamel Husain (first-person byline confirmed), judge validated against a domain expert's labels, agreement tracked, *">90% agreement"* in *"three iterations"* verbatim; *"You cannot write a good judge prompt until you've seen the data."* Anchors the calibrate-the-judge slide including the 90%/three-iterations number. fallback: drop the number, keep the move — measure agreement against your own labels, iterate until you converge.
- husain-field-guide `[checked:2026-07-02 result:OK due:2027-01-02]` https://hamel.dev/blog/posts/field-guide/ — [practitioner direct] Hamel Husain: *"Error analysis - the single most valuable activity in AI development and consistently the highest-ROI activity"*; bottom-up from actual data versus top-down assumed metrics. Anchors the error-analysis-first bullet. fallback: drop the name, teach as the eval-building discipline practitioners converge on.
- husain-evals `[checked:2026-07-02 result:CAVEAT due:2027-01-02]` https://hamel.dev/blog/posts/evals/ — [practitioner direct] Husain byline confirmed, judge-versus-human agreement loop confirmed (*"iterate on the prompt of the critique model to make it sufficiently aligned"*), BUT this post leads with synthetic test cases, not error-analysis-first — an earlier single-URL attribution was imprecise, and the two URLs above carry the body claims. Supporting only. fallback: drop this URL and the body loses nothing.

Frameworks
- Goodhart's law · [borrow:economics] · law:none · ← cultural-vocab — name-only, no URL owed
- Tampering · [borrow:statistical process control] · law:dont-tamper · ← cultural-vocab — Deming, name-only, no URL owed
- Regression to the mean · [borrow:statistics] · law:none · ← cultural-vocab — statistics commons, deliberately un-attributed in body
- Judge calibration against your own labels · [borrow:none] · law:eval-judge-verifier-gate · ← husain-llm-judge
- The bitter lesson · [borrow:ML research] · law:none · ← cultural-vocab — Sutton, name-only, no URL owed
- The delegation frontier · [borrow:none] · law:calibrated-delegation-frontier · ← none — home-grown 2×2, L0, no citation owed; also the model behind the AE101 day-30 measurement design, which stays maintainer-side

Stance `[stance:2026-08-01 level:L2]`
- holds: that a judge must be measured against human labels before it is trusted. Husain is the clearest published practitioner statement of the loop and carries the only number in the lecture. The failure modes themselves — miscalibration, gaming, sampling — are textbook rather than contested, which is why four of the five laws sit on borrowed frames rather than on practitioner counts.
- contested: nothing material in the five laws. What is unsettled is dosage: whether a room this early can act on judge-calibration at all, or only recognise it. That is a pedagogy question, not an evidence one.
- decided: **no starting sample size is claimed, 2026-08-19 (Antti; supersedes the 2026-08-01 few-dozen range).** The bullet names the move — a handful of your own judgements, teach the judge until convergence — and a handful is a floor, not a threshold. Husain backs the loop and the >90%-after-three-iterations figure; he backs no starting sample size, and neither do we. Do not restore a number or a range in this slot.
- would-move-it: a published agreement-rate loop that lands somewhere other than Husain's ">90% after three iterations" — a materially different convergence rate, or a practitioner reporting that judge calibration failed to transfer. One more independent number would take this to L3 and let the body say "practitioners report" instead of naming one person.

OODA
- question: has anyone besides Husain published a measured judge-versus-human agreement loop with numbers, and does 30 samples hold up as the starting sample size anywhere in print?
- roster: Hamel Husain, Shreya Shankar, Eugene Yan, Jason Liu, the Anthropic and OpenAI eval cookbooks
- last-run: 2026-08-01

<!-- /backing -->

**"Labels" swapped out of body (2026-08-25, Antti-directed):** eval jargon the deck never earns; header now reads *against your own judgement*, both bullet uses read *judgements*. The word survives only in the ledger, where it is Husain's own. In the same pass, *One session is a sample* lost its two trailing mechanism sentences (*"The second collapses far faster"*, *"cannot separate the change from ordinary variance"*) — the recurrence slide next door owns variance.

**Closing aphorism cut (2026-08-25, Antti-approved):** *"A gate is one more claim in the system. Build it, then hold it to the same bar it holds the work to."* — hanging line restating the H1 (`check_slides.md` §16 class c). The deck now runs straight from the tampering slide into the delegation frontier. Do not restore.

**Quality:** compendium-audited 2026-08-26 (writing@a197cc46 story@a197cc46 technical@a1ddfae2 behavior@1c765f2 pedagogy@a197cc46 strategy@1c765f2 slides@a197cc46)
- judges @a197cc46: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
