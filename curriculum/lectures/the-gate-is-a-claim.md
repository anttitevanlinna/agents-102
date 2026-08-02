# The gate is a claim too

Say the re-send comes back green. The verifier you built reads the work and passes it. That green is worth exactly as much as the gate behind it, and the gate is a claim too. On the map it sits in the far half, the last check before the work ships. It can lie in five ways.

## Passing is not proof

- A gate only means what the gate can see. Green is a claim about the check, not a fact about the work. A result passes for three different reasons that look identical from outside: the judge is miscalibrated, the gate got gamed, or the run was a lucky sample.
- The check you built is itself a claim that wants verifying. The same scrutiny you point at the agent's work points at the thing that judges the work. A gate nobody has verified is a gate trusted on vibes.
- Each way a gate lies has its own countermove, and each is cheap. Hand-labels for the miscalibrated judge, a hold-out for the gamed gate, repeated runs for the lucky sample. All three cost less than the failure they hide.

## The judge needs calibrating against your labels

- A judge has an unknown floor until you measure it. A judge is a claim that its bar and your bar agree. Until that is checked against your own labels, a judge-gated pipeline passes work at an agreement rate no one has ever seen.
- The move is hand-label a sample, measure agreement, sharpen, repeat. A few dozen outputs is enough to start; you are looking for disagreement patterns, not a significance test. Grade them yourself, compare against the judge's verdicts, sharpen the judge prompt until the two converge, and re-check when the model or the task shifts. Hamel Husain reports better than 90% agreement after three iterations of exactly this loop.
- A good gate starts from real traces, not imagined failures. Read runs that actually happened, sort the real failures into buckets, and write the first check for the biggest bucket. A gate built from the armchair catches the failures you pictured and misses the ones you have.

## Gates decay

- A measure that becomes a target stops measuring. **Goodhart's law**, and the agent is an optimizer aimed straight at your gate. Tests get special-cased, judge prompts get keyword-stuffed, asserts get edited into agreement. No malice needed: optimization pressure finds the cheapest path to green.
- Passing while missing the intent is a signature, not bad luck. When work clears the gate and still is not what you meant, the gate has decayed into a target. That is a reason to refresh the gate, not to shrug.
- The countermoves are a hold-out and an integrity check. Keep a check the agent never sees, so nothing can optimize against it. After a suspicious pass, inspect the gate itself (the test file, the judge prompt, the asserts), not only its verdict.

## One run is a sample

- The agent's behavior is a distribution, not a property. One green run is an anecdote with survivorship bias. Reachable and dependable are different claims: passing once shows the task is reachable, passing again and again shows it is dependable. The second collapses far faster than the first.
- Before crediting an improvement, run it repeatedly. A new rule, a new prompt, a new gate: judge it on pass rates across several runs, not on the one run that followed the change. On a single run you cannot separate the change from ordinary run-to-run variance.
- A demo is pass-once evidence. An impressive run someone shows you proves the task is reachable, not that it is dependable. File it there.

## Change on recurrence, not on noise

- One stochastic miss is not a process failure. A system with run-to-run variance produces the odd miss even when nothing is wrong. Rewriting a rule after every single miss does not tighten the process, it churns it. W. Edwards Deming called this **tampering**: chasing ordinary variance case by case adds noise of its own.
- React on recurrence. The same failure shape returning is signal. That is when the rule changes, the gate refreshes, or the skill ships.
- Watch the regression-to-the-mean trap. After a bad run, the next run is usually better with no change at all. A tweak made right after a failure looks effective even when it did nothing.

A gate is one more claim in the system. Build it, then hold it to the same bar it holds the work to.

## The delegation frontier

<figure class="diagram">
<svg viewBox="0 0 1200 560" role="img" aria-label="A two-by-two map of delegated work. Horizontal axis: reach, how much you hand off. Vertical axis: calibration, whether trust was earned by a measured gate. Four states: chat-shaped work bottom-left, controlled assistance top-left, reckless autonomy bottom-right, calibrated agency top-right. A dashed ochre curve labelled the frontier rises from low reach at low calibration to high reach at high calibration, and moves outward as fast as the gates behind it." style="display:block;width:100%;height:auto;background:#efe6d2;border:1px solid #c5b68d;border-radius:7px;">
<rect x="0.5" y="0.5" width="1199" height="559" rx="7" fill="#efe6d2"/>
<rect x="12" y="12" width="1176" height="536" fill="none" stroke="#d6c8a3" stroke-width="1" opacity="0.9"/>
<rect x="650" y="270" width="500" height="200" fill="rgba(138,58,42,0.05)"/>
<g stroke="#d6c8a3" stroke-width="1" stroke-dasharray="2 8" opacity="0.8">
<line x1="650" y1="70" x2="650" y2="470"/>
<line x1="150" y1="270" x2="1150" y2="270"/>
</g>
<g stroke="#786c56" stroke-width="1.6" stroke-linecap="round">
<line x1="150" y1="470" x2="1140" y2="470"/>
<line x1="150" y1="470" x2="150" y2="80"/>
</g>
<g fill="#786c56">
<polygon points="1150,470 1138,464 1138,476"/>
<polygon points="150,70 144,82 156,82"/>
</g>
<text x="650" y="505" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="10.5" letter-spacing="2.5" fill="#786c56">REACH · HOW MUCH YOU HAND OFF →</text>
<text x="125" y="270" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="10.5" letter-spacing="2.5" fill="#786c56" transform="rotate(-90 125 270)">CALIBRATION · TRUST, MEASURED ↑</text>
<g text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="12.5" letter-spacing="2">
<text x="400" y="150" fill="#2f6b6b">CONTROLLED ASSISTANCE</text>
<text x="400" y="400" fill="#2f6b6b">CHAT-SHAPED WORK</text>
<text x="800" y="150" fill="#2f6b6b">CALIBRATED AGENCY</text>
<text x="960" y="400" fill="#8a3a2a">RECKLESS AUTONOMY</text>
</g>
<g text-anchor="middle" font-family="Inter, -apple-system, sans-serif" font-size="11" fill="#4a4234">
<text x="400" y="168">small handoffs, tight review</text>
<text x="400" y="418">you read everything</text>
<text x="800" y="168">long leash, measured gates</text>
<text x="960" y="418">long leash, unmeasured green</text>
</g>
<path d="M 480,470 C 640,420 760,330 850,240 S 980,120 1020,70" fill="none" stroke="#a05a2c" stroke-width="2.4" stroke-dasharray="7 7" opacity="0.85"/>
<text x="935" y="205" text-anchor="middle" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="11" letter-spacing="2.5" fill="#a05a2c" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">THE FRONTIER</text>
<text x="935" y="221" text-anchor="middle" font-family="Inter, -apple-system, sans-serif" font-size="11" fill="#4a4234" paint-order="stroke" stroke="#efe6d2" stroke-width="3" stroke-linejoin="round">moves as fast as the gates behind it</text>
<line x1="880" y1="250" x2="945" y2="250" stroke="#a05a2c" stroke-width="1.8" stroke-linecap="round"/>
<polygon points="955,250 943,244 943,256" fill="#a05a2c"/>
<text x="650" y="533" text-anchor="middle" font-family="EB Garamond, Georgia, serif" font-style="italic" font-size="15.5" fill="#4a4234">The frontier: the largest task you can hand off and still trust the result.</text>
<text x="1176" y="36" text-anchor="end" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="9" letter-spacing="2" fill="#8a3a2a">TWO AXES · FOUR STATES</text>
</svg>
</figure>

- Every run you hand off sits on two axes. Reach is how much you delegated: the size of the task, the length of the leash. Calibration is whether your trust in what came back was earned by a check you have verified.
- Four states fall out. Low reach is chat-shaped work or controlled assistance: you read everything, so trust is not the question yet. High reach splits on calibration alone. Calibrated agency when the gates behind the green are ones you have measured, reckless autonomy when they are not. From outside, the two look identical. The five ways a gate lies are the whole difference.
- The frontier moves outward only as fast as the gates behind it. Push reach past your calibration and you are not delegating more. You are checking less.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all five law slides kept bullets; every bolded lead de-bolded. Two handles kept, at their naming sub-spans: **Goodhart's law** (Gates decay slide) and **tampering** (Deming, Change-on-recurrence slide); slides 1, 2, and 4 carry zero bold (headers carry the laws). Lede + closing line untouched. Per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Mood:** gate-skepticism after the build. The verifier just landed the packaged re-send; this names why a green gate can still lie. Register is Boris-precise plus a Rory reframe (green is a claim, not proof), NOT reassurance and NOT resolved optimism. The closer opens doubt about the gate; it does not close it.

**Promoted** from `supplementary/the-gate-is-a-claim.md` to a proper M5-close lecture in slide format. Audited — see the Quality line below. *(Corrected 2026-07-31: this line denied its own audit while the file carried a 2026-07-27 all-PASS one. Present-tense state, not a changelog — `check_writing.md §3`.)*

**Placement:** M5 close, final lecture, immediately after `what-packaging-is.md`. Recognition-after-building (`check_lectures §1`): the student built a verifier and re-sent the packaged run before this page names the gate's own fallibility. No cross-module sequencing in the body (`check_lectures §3`); any onward pointer lives in the module file's `## Next`.

**Frontier slide added 2026-07-26 (Antti placement call: "M5 closer"):** *The delegation frontier* as the deck's closing zoom-out — reach × calibration, four states (chat-shaped work · controlled assistance · reckless autonomy · calibrated agency), frontier moves only as fast as the gates. Home-grown, L0, no citation owed; doubles as the model behind the AE101 day-30 measurement design (transcript states + PR-layer rework as calibration's outcome anchor — measurement stays maintainer-side, unpiloted, NOT a body claim). Mood-checked: ends on the reckless-autonomy warning ("you are checking less"), does NOT resolve the closer's open doubt; the optimistic twin beat (compounding moves the frontier outward) is deliberately withheld here — PLACED 2026-07-27 as one payoff bullet on `the-map-filled-in`'s closing slide. "Calibration" is earned two slides up (the judge-calibration slide); zero bold (header carries the handle).

**Antti decisions (2026-07-27):** six slides confirmed as THE M5 closer; all five laws kept (no error-analysis trim, no don't-tamper cut; combined close packaging ~12–15 + gate 7–9 accepted against the 1h45 runtime); the slide-5 kicker ("A gate is one more claim…") stays as the laws' summary line so the deck ends on the frontier warning; 2×2 figure added to the frontier slide in the house SVG style (blank-line-free figure block per the engine-SVG rule; the frontier-definition sentence is carried once, in the figure caption, and dropped from bullet 3).

**Laws carried (5 + closing frame):** green-is-a-claim (passing is not proof) · calibrate-the-judge · Goodhart/gate-decay · one-run-is-a-sample · don't-tamper (change on recurrence). Trimmed from the reference-dose supplementary: hold-out and integrity-check folded into the gate-decay slide; the error-analysis-first bullet kept tight on the calibrate slide (cut candidate — see eyeball). The demo-is-pass-once and regression-to-the-mean bullets kept as one-line traps.

**Lecture meta:** *7–9 min M5 closer, deck-shaped, six slides: five gate laws plus the delegation-frontier zoom-out. Names the fallibility of the verifier the student just built. Earns each law from the gate in front of them, not cold.*

**Delivery mode:** In-room close, projected, after `what-packaging-is.md`.

**Time:** 7–9 min at presentation pace (recognition; the student built the gate this module).

<!-- backing -->

Claims
- `gate-is-a-claim-too` · vision · "That green is worth exactly as much as the gate behind it, and the gate is a claim too." ← none-owed
- `five-ways-a-gate-lies` · vision · "It can lie in five ways." ← none-owed
- `green-is-a-claim-not-proof` · vision · "Green is a claim about the check, not a fact about the work." ← none-owed
- `three-reasons-a-pass-looks-identical` · vision · "the judge is miscalibrated, the gate got gamed, or the run was a lucky sample" ← none-owed
- `countermoves-cost-less-than-the-failure` · vision · "All three cost less than the failure they hide." ← none-owed
- `judge-has-unknown-floor` · vision · "A judge has an unknown floor until you measure it." ← none-owed
- `hand-label-measure-sharpen-repeat` · vision · "hand-label a sample, measure agreement, sharpen, repeat" ← none-owed
- `a-few-dozen-to-start` · vision · "A few dozen outputs is enough to start; you are looking for disagreement patterns, not a significance test." ← none-owed
- `husain-ninety-percent-three-iterations` · detail · "Hamel Husain reports better than 90% agreement after three iterations of exactly this loop." ← husain-llm-judge
- `error-analysis-before-armchair` · detail · "A good gate starts from real traces, not imagined failures." ← husain-field-guide, husain-evals
- `goodhart-gates-decay` · borrowed · "**Goodhart's law**, and the agent is an optimizer aimed straight at your gate." ← cultural-vocab
- `passing-while-missing-intent-is-a-signature` · vision · "When work clears the gate and still is not what you meant, the gate has decayed into a target." ← none-owed
- `holdout-and-integrity-check` · vision · "Keep a check the agent never sees, so nothing can optimize against it." ← none-owed
- `behaviour-is-a-distribution` · vision · "The agent's behavior is a distribution, not a property." ← none-owed
- `reachable-is-not-dependable` · vision · "passing once shows the task is reachable, passing again and again shows it is dependable" ← none-owed
- `demo-is-pass-once-evidence` · vision · "A demo is pass-once evidence." ← none-owed
- `deming-tampering` · borrowed · "W. Edwards Deming called this **tampering**" ← cultural-vocab
- `react-on-recurrence` · vision · "The same failure shape returning is signal." ← none-owed
- `regression-to-the-mean-trap` · borrowed · "After a bad run, the next run is usually better with no change at all." ← cultural-vocab
- `two-axes-reach-and-calibration` · vision · "Every run you hand off sits on two axes." ← none-owed
- `four-states-fall-out` · vision · "Calibrated agency when the gates behind the green are ones you have measured, reckless autonomy when they are not." ← none-owed
- `frontier-moves-with-the-gates` · vision · "The frontier moves outward only as fast as the gates behind it." ← none-owed

Sources
- husain-llm-judge `[checked:2026-07-02 result:OK due:2027-01-02]` https://hamel.dev/blog/posts/llm-judge/ — [practitioner direct] Hamel Husain (first-person byline confirmed), judge validated against a domain expert's labels, agreement tracked, *">90% agreement"* in *"three iterations"* verbatim; *"You cannot write a good judge prompt until you've seen the data."* Anchors the calibrate-the-judge slide including the 90%/three-iterations number. fallback: drop the number, keep the move — measure agreement against your own labels, iterate until you converge.
- husain-field-guide `[checked:2026-07-02 result:OK due:2027-01-02]` https://hamel.dev/blog/posts/field-guide/ — [practitioner direct] Hamel Husain: *"Error analysis - the single most valuable activity in AI development and consistently the highest-ROI activity"*; bottom-up from actual data versus top-down assumed metrics. Anchors the error-analysis-first bullet. fallback: drop the name, teach as the eval-building discipline practitioners converge on.
- husain-evals `[checked:2026-07-02 result:CAVEAT due:2027-01-02]` https://hamel.dev/blog/posts/evals/ — [practitioner direct] Husain byline confirmed, judge-versus-human agreement loop confirmed (*"iterate on the prompt of the critique model to make it sufficiently aligned"*), BUT this post leads with synthetic test cases, not error-analysis-first — an earlier single-URL attribution was imprecise, and the two URLs above carry the body claims. Supporting only. fallback: drop this URL and the body loses nothing.

Frameworks
- Goodhart's law · [borrow:economics] · law:none · ← cultural-vocab — name-only, no URL owed
- Tampering · [borrow:statistical process control] · law:dont-tamper · ← cultural-vocab — Deming, name-only, no URL owed
- Regression to the mean · [borrow:statistics] · law:none · ← cultural-vocab — statistics commons, deliberately un-attributed in body
- Judge calibration against your own labels · [borrow:none] · law:eval-judge-verifier-gate · ← husain-llm-judge
- The delegation frontier · [borrow:none] · law:calibrated-delegation-frontier · ← none — home-grown 2×2, L0, no citation owed; also the model behind the AE101 day-30 measurement design, which stays maintainer-side

Stance `[stance:2026-08-01 level:L2]`
- holds: that a judge must be measured against human labels before it is trusted. Husain is the clearest published practitioner statement of the loop and carries the only number in the lecture. The failure modes themselves — miscalibration, gaming, sampling — are textbook rather than contested, which is why four of the five laws sit on borrowed frames rather than on practitioner counts.
- contested: nothing material in the five laws. What is unsettled is dosage: whether a room this early can act on judge-calibration at all, or only recognise it. That is a pedagogy question, not an evidence one.
- decided: **the starting sample size is a range with its reasoning attached, 2026-08-01.** The bullet read *"Thirty outputs is enough to start"* — a bare number with nothing behind it, in the shape of a statistical threshold a reader might defend in review. Husain backs the loop and the >90%-after-three-iterations figure; he backs no starting sample size. Precision you cannot source is worse than an honest range, because precision is what gets quoted back at you.
- would-move-it: a published agreement-rate loop that lands somewhere other than Husain's ">90% after three iterations" — a materially different convergence rate, or a practitioner reporting that judge calibration failed to transfer. One more independent number would take this to L3 and let the body say "practitioners report" instead of naming one person.

OODA
- question: has anyone besides Husain published a measured judge-versus-human agreement loop with numbers, and does 30 samples hold up as the starting sample size anywhere in print?
- roster: Hamel Husain, Shreya Shankar, Eugene Yan, Jason Liu, the Anthropic and OpenAI eval cookbooks
- last-run: 2026-08-01

<!-- /backing -->

**Quality:** compendium-audited 2026-08-02 (writing@c202a8d story@c202a8d technical@d1b6f2c behavior@d1b6f2c pedagogy@c202a8d strategy@d1b6f2c slides@c202a8d)
- judges @d1b6f2c: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
