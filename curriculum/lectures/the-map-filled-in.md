# The map, filled in

The map is back, one last time.

## The checking loop, drawn solid

{{figure:map-engine-filled}}

- This is the M2 map, one loop changed. The checking loop ran dashed across Verification and Absorption for four modules: read, judge, gate what ships, by hand for now. Dashed meant not built yet.
- What fills it is what got built. The verifier from the M5 packaging and the test-strategy skill authored at M3 are checks that stand without you. A loop made of checks that stand without you gets drawn solid; the stack-map you drew names where the next ones land.
- Nothing else moved. Same six phases, same loops, same wall at the team's edge. The far half kept its shape and gained its names, the way the near half did at the M3 close.

## You drew a control loop

{{figure:student-closed-loop}}

- You drew a control loop. Shape the session before it moves, watch what comes back, correct, encode. That is **feedback control** around a non-deterministic agent, and it is the shape the whole map has had from the start.
- The near half shapes; the far half corrects. Intent, context, and the plan set the target before the session starts; the far half reads what came back, takes up what passed, and encodes what the session taught, changing the system so the next session starts better.
- Verification is the sensor. A loop with no way to read its own result runs open: send the work off and hope. The checks you built are how this loop reads what came back. They are the part that lets the system catch its own error before it ships.
- The harness makes continuing possible. What a session gets right without you is set by what has accumulated around it: rules, durable state, checks, encoded corrections. The M4 send-off and the M5 re-send: same model, same harness, two different agents.

## Verification, named

- **Find is easier than judge.** (Verification) The agent finds; you judge. The split was named at M2 over a plan, and out here it becomes a whole phase: on a long-running session the finding happened without you, so the judging is the cost that is left.
- **The three-pattern** stands in for you at Verification. (Verification) Reference against goal drift, plan.md against context rot, verifier against plausible-but-wrong. The first two hold the session on course while it moves; the verifier is the piece that does your checking when the result comes back.
- **Verifier, judge, gate: every one an eval.** (Verification) A deterministic check, an LLM reading the work, the same check placed in CI. One automated thing that says this meets the bar your work requires, and it is what the checking loop now runs on.

## Absorption, named

- **Generation is fast; reading, judging, and merging are not.** (Absorption) The gap between those two speeds decides real throughput. The M5 re-send ran with the laptop closed; what was left when it came back was all reading.
- **Review bandwidth is the constraint** composition cannot relax. (Absorption) Chain workflows end to end and every output still lands on the same reading budget. Each eval that stands without you buys a piece of that budget back.
- **The ratio runs near 80/20.** (Absorption) Roughly 80 percent planning and review, 20 percent execution: compound engineering's posture. The session is the cheap part; the reading and shaping around it are where the hours live.

## Outcome, named

- **A rule in context is not a rule in the output.** (Outcome) Rules leak, and the loop exists because they leak. That is why the lesson gets encoded into something that fires (a verifier, a hook, a skill) instead of stopping as one more sentence in `./CLAUDE.local.md`.
- **Test → learn → encode.** (Outcome) M4 tested, M5 learned, M6 encoded: diff the sessions, name the gaps, package the learning. The loop closes when the lesson ships, the oldest search shape there is: the sessions generate variants, the eval selects, the memory retains.
- **Cross personal → team.** (Outcome) What survives the session is the fix, the rule it taught, and the skill it became; what compounds is the part a team takes up. Review infrastructure grows by accretion, one trusted check at a time, and it starts at the size of the one just shipped. Your own sessions speed up before the team's numbers move, because the team's way of reviewing and sharing has to be rebuilt around the new speed first; the checks and skills you hand over are that rebuild.

## The question you carry forward

- The far half has one question, and it arrived at the M4 send-off. *When the agent takes a hundred steps alone, what makes you trust the result at the end?* It fires before the session, costs one sentence, and decides what gets packaged.
- Its answer turned into a build list. At M4 the answer was nothing yet, watch. By M6 the answer names checks: which verifier, which hook, which judge stands at the end of this session. A session the question has no answer for is a session not ready to send.
- It travels. It prices the next send-off and picks which check to author first, and it pairs with the near half's question: name the uncertainty before you move, then name what earns your trust at the end. Two questions, one sentence each, before any work moves.

## The map, filled in

- Six modules, six phases, one loop. The first fix landed in Work, the plan push-back in Intent and Context, the send-off and the packaged re-send across Verification and Absorption, the encoded skill in Outcome. Every move in this training has a place on this map, and a move with a place is a move you can find again.
- The moves came first; the names came after. Each law got its name at the moment the move was already yours, and a name is a handle.
- Dashed is a state, not a place. The checking loop spent four modules marked by hand for now. Whatever runs by hand for now in your own work is the same kind of line: a loop waiting for a check that stands without you.
- The M5 close left the delegation frontier as a warning: reach grows only as fast as the gates behind it. Every check that stands without you moves the frontier outward. Compounding, read from the frontier: reach grows and trust keeps up.

*The next dashed loop is yours to draw solid.*

<!-- maintainer -->

**Lean pass (2026-08-25, Antti-directed M3/M6 shorten, free hands):** control-loop bullet 2 merged 4→2 sentences — the "That is why the map has two halves…" restatement folded into the shapes/corrects pair; the 2026-07-03 adversarial-verify fix's phase distribution (verification=read · absorption=take-up · outcome=encode + "changes the system") is intact in the merged wording. Bullet 3 cut "That is why they were never paperwork." Closing slide bullet 2 cut "Nothing on this map arrived as theory to apply later." + the handle triple ("findable on Tuesday, transferable…") — `the-loop-half-filled` owns that recitation at the M3 close; here "a name is a handle" suffices. Do not restore.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** law-consolidation file, keeps the most bold — one handle per law: Verification slide **Find is easier than judge** / **The three-pattern** (trimmed to sub-span) / **Verifier, judge, gate: every one an eval**; Absorption slide **Generation is fast; reading, judging, and merging are not** / **Review bandwidth is the constraint** (trimmed) / **The ratio runs near 80/20**; Outcome slide keeps its three law handles; control-loop slide bolds **feedback control** at its naming. Checking-loop re-show, governor, and closing slides de-bolded fully (governor question set italic, never bold); kicker + map-position tags + both SVGs untouched — per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Frontier payoff bullet (2026-07-27, Antti call: "one bullet, closing slide"):** fourth bullet on *The map, filled in* slide pays off ONE of the two doubts the M5 close leaves open. `the-gate-is-a-claim`'s final slide ends on a reach-outruns-calibration warning AND a bitter-lesson bullet putting a shelf life on the gates themselves; this bullet answers the first only. The second is deliberately unpaid: a procedure that keeps needing edits is the arc's ending, not a loose thread, and M6's own subtraction beat is where it lands operationally. Do not widen this bullet to cover both. Reach grows only as fast as the gates; solid loops are what move the frontier. No new slide (M6 dose already at 7 with open eyeball Qs). Vocabulary is arc-earned at the M5 close per `check_slides.md §1` carve-out; the M5 back-reference is the §3 arc carve-out (this lecture's subject IS the arc). Payoff-optimism is in-contract here (consolidation/recognition mood, not the M5 doubt-holder).

**STATUS:** slide-format, proper-length bullets per `theory-plan.md` § Slide format. Audited — see the Quality line below. *(Corrected 2026-07-31: denied its own audit and called the Family B eval pending, while carrying a 2026-07-27 all-PASS audit. Present-tense state, not a changelog — `check_writing.md §3`. Family B: if a verdict for this file exists, record it here; if it genuinely has not run, say so directly rather than denying the audit that did.)*

**Commissioned:** 2026-07-02 — theory-completeness-review finding #1 (far half never closes) + Antti ("let's complete the theory addition", 2026-07-02). Far-half twin of `the-loop-half-filled` (M3's near-half consolidation closer).

**Placement / wiring (amended 2026-07-03):** M6 close — the PENULTIMATE beat, between `the-loop-has-a-name` and `[Agents that build agents]` in `spot-gaps-build-the-loop.md`. This lecture closes the THEORY (the far-half consolidation) as penultimate; `agents-that-build-agents` closes the TRAINING as its final forward-launch beat. The kicker "The next dashed loop is yours to draw solid" now hands into `agents-that-build-agents` — that consolidation→launch handoff is load-bearing. (Antti re-sequence 2026-07-03; supersedes the prior "must be last include, after `agents-that-build-agents`; do NOT wedge between `the-loop-has-a-name` and `agents-that-build-agents`" note, which assumed the two beats were adjacent.) The module file carries the bridge sentence into the final beat ("One move is left, and it runs past the edge of this room."). Also listed in `THEORY_HANDBOOK_MANIFEST` M6 group (`scripts/build-workbook.js`). Consolidation and recognition, NOT new teaching (`check_lectures §1`). Module refs in body (M1–M6 ranges) are the §3 arc carve-out — the lecture's subject IS the arc.

**Artifact contract (Family B):** per named law → {NAME · MAP-POSITION · MECHANISM · GOVERNOR}; the governor gets its own slide (one for the whole half), same shape as the twin. Judge against `theory-evals.md` B★ (durability-without-voice) and B2 (dose — flag the verdict below).

**Dose verdict (argued, mirrors the twin's kept-5):** 9 law bullets + 1 governor across three phase slides — above the ≤3-per-module cap by design (three-phase, three-module close; no empty phase: Verification = find-vs-judge / three-pattern / eval-triple, Absorption = generation-vs-absorption / review-bandwidth / 80-20, Outcome = rules-leak / test-learn-encode / crossing-the-wall). Every law was named in-room before this lecture; ZERO new laws coined. Naming choices: "find is easier than judge" (the M2 in-room form), NOT "verification asymmetry" (supplementary-resident name); "backpressure" is earned at M4 but gets no new section here because the Absorption slide already carries its generation-speed, review-bandwidth, and eval-capacity mechanism; three-pattern carried WITHOUT flat Ronacher attribution (the M5 convergence hedge is canonical; the module's attribution budget is also spent in its other closers).

**Governor promotion:** the far-half governor slot was unfilled in-room (completeness-review risk list). Promoted, not minted: the M4 carry-in question from `the-far-half` ("when the agent takes a hundred steps alone, what makes you trust the result at the end?") already fires pre-run and costs one sentence — the twin's binding governor shape.

**SVG:** derived from `the-whole-map.md`'s engine canvas — same drawing, four edits: checking-loop ellipse solidified (dasharray dropped, stroke 1.8→2.6, opacity 0.45→0.9), tag un-ghosted (`◌` dropped, grey→teal), sub reworded `by hand for now` → `by your evals now` (fill now inherits the body ink), aria-label updated. ALL ids re-prefixed `wm-` → `mf-` (the theory handbook renders both copies on one page; duplicate ids break defs and markers). The figure block is blank-line-free ON PURPOSE — a blank line inside terminates the raw-HTML block in marked and spills markup (verified failure mode in this repo). The parent M2 SVG is itself an unreviewed draft with open eyeball questions (incl. whether the checking ghost survives at all); if the M2 map changes, re-derive this copy.

**Time:** 10 min target at recognition pace (the twin's budget). M6's closer slot is budgeted 15 min and already carries three lectures — see eyeball Q1.

**Delivery mode:** In-room close, projected. The re-shown map with the solid checking loop IS the slide.

**Completeness-review minors closed (2026-07-03):**
- **Minor 9** — the wall-crossing bullet (**Cross personal → team**) now carries a worded, no-math dip-before-climb mechanism (your own sessions speed up before the team's numbers move; the team's reviewing/sharing has to be rebuilt around the new speed, and the handed-over checks and skills are that rebuild). This is the J-curve / complementary-investment borrow the theory audit assigns to the-wall: [borrow:economics] Paul David, "The Dynamo and the Computer" (1990, AEA P&P); Brynjolfsson, Rock and Syverson, "The Productivity J-Curve" (AEJ: Macroeconomics, 2021). Both verified live 2026-07-03 — stamps below. Body stays unnamed and number-free by design (no laws coined, no math on slides).
- **Minor 10** — the test-learn-encode bullet now carries the unnamed variation-selection-retention clause (sessions generate variants, the eval selects, the memory retains); "eval" is earned earlier in this lecture on the Verification slide. Attribution stays maintainer-side: Donald Campbell's blind-variation-and-selective-retention (BVSR) is the shape; body names zero new laws, per the dose verdict above.

<!-- backing -->

Claims
- `soil-line` · vision · "act under uncertainty · competence sets the ceiling · cross personal → team" ← none-owed
- `checking-loop-drawn-solid` · vision · "A loop made of checks that stand without you gets drawn solid" ← none-owed
- `nothing-else-moved` · vision · "Nothing else moved. Same six phases, same loops, same wall at the team's edge." ← none-owed
- `you-drew-a-control-loop` · borrowed · "That is **feedback control** around a non-deterministic agent" ← cultural-vocab
- `near-half-shapes-far-half-corrects` · vision · "The near half shapes; the far half corrects." ← none-owed
- `verification-is-the-sensor` · vision · "A loop with no way to read its own result runs open: send the work off and hope." ← none-owed
- `find-is-easier-than-judge` · vision · "**Find is easier than judge.**" ← none-owed
- `three-pattern-stands-in-at-verification` · vision · "**The three-pattern** stands in for you at Verification." ← none-owed
- `verifier-judge-gate-every-one-an-eval` · vision · "**Verifier, judge, gate: every one an eval.**" ← none-owed
- `generation-fast-absorption-slow` · vision · "**Generation is fast; reading, judging, and merging are not.**" ← none-owed
- `review-bandwidth-is-the-constraint` · vision · "**Review bandwidth is the constraint** composition cannot relax." ← none-owed
- `ratio-runs-near-80-20` · detail · "Roughly 80 percent planning and review, 20 percent execution: compound engineering's posture" ← every-compound-80-20 — body attributes the ratio to the posture's one named shop, which is what the CAVEAT stamp licenses; not a field rate.
- `rule-in-context-is-not-rule-in-output` · vision · "**A rule in context is not a rule in the output.**" ← none-owed
- `test-learn-encode-is-variation-selection-retention` · borrowed · "the sessions generate variants, the eval selects, the memory retains" ← cultural-vocab
- `cross-personal-to-team` · vision · "**Cross personal → team.**" ← none-owed
- `dip-before-climb` · detail · "Your own sessions speed up before the team's numbers move, because the team's way of reviewing and sharing has to be rebuilt around the new speed first" ← david-dynamo-1990, brynjolfsson-j-curve
- `harness-enables-surround-decides` · vision · "What a session gets right without you is set by what has accumulated around it" ← none-owed
- `same-model-same-harness-two-agents` · vision · "The M4 send-off and the M5 re-send: same model, same harness, two different agents." ← none-owed
- `far-half-question` · vision · "*When the agent takes a hundred steps alone, what makes you trust the result at the end?*" ← none-owed
- `question-answer-became-a-build-list` · vision · "A session the question has no answer for is a session not ready to send." ← none-owed
- `moves-first-names-after` · vision · "The moves came first; the names came after." ← none-owed
- `dashed-is-a-state-not-a-place` · vision · "Dashed is a state, not a place." ← none-owed
- `every-check-moves-the-frontier` · vision · "Every check that stands without you moves the frontier outward." ← none-owed

Sources
- david-dynamo-1990 `[checked:2026-07-03 result:OK due:none]` https://ideas.repec.org/a/aea/aecrev/v80y1990i2p355-61.html — [academic/research] Paul A. David, *The Dynamo and the Computer: An Historical Perspective on the Modern Productivity Paradox*, AER Papers & Proceedings 80(2), 1990, 355–361. Backs the crossing-the-wall bullet's dip-before-climb clause — the complementary-investment mechanism, a historical borrow rather than current evidence, and the body carries no date or number from it. **Foundational-literature variant, `due:none`** (`backing-format.md` § Foundational): a 1990 paper's claim is fixed by publication, and the previous `due:2027-01-03` would have flagged it STALE as an artifact of the rule rather than a defect in the material. The JSTOR stable page (jstor.org/stable/2006600) 403s automated fetches; the RePEc landing page is the live record. fallback: cut the "Your own sessions speed up before the team's numbers move…" sentence; the bullet stands without it.
- brynjolfsson-j-curve `[checked:2026-07-03 result:OK due:none]` https://www.nber.org/papers/w25148 — [academic/research] Brynjolfsson, Rock and Syverson, *The Productivity J-Curve: How Intangibles Complement General Purpose Technologies*, published AEJ: Macroeconomics 13(1), 2021, 333–372. Same claim-anchor as the David 1990 line, four decades later and on the same mechanism, which is what makes the pairing worth keeping. Foundational variant, `due:none`, same reasoning. fallback: same — drop the dip-before-climb sentence.
- every-compound-80-20 `[checked:2026-07-30 result:CAVEAT due:2027-01-30]` https://every.to/source-code/compound-engineering-how-every-codes-with-agents — [practitioner direct, vendor venue] Shipper & Klaassen (Dec 2025): *"Roughly 80 percent of compound engineering is in the plan and review parts, while 20 percent is in the work and compound."* **Added 2026-08-01 — this file restated the ratio in body while carrying no stamp for it,** relying on `what-packaging-is` having stamped it two lectures earlier. A claim owes its backing in the file that makes it; a reader auditing this lecture alone would have found a bare number. Dec 2025, outside the 6-month window: framework origin, not fresh evidence. **This stamp is the ratio's only home: `what-packaging-is` carries no ratio slide, so the body here credits the posture without claiming M5 taught the number.** fallback: drop the number and keep the posture — the session is the cheap part, the reading and shaping around it are where the hours live.

Frameworks
- Feedback control · [borrow:control theory] · law:is-a-closed-loop-controller · ← cultural-vocab — named in body at the control-loop slide, the one place the whole map is stated as one mechanism
- The value cycle · [borrow:none] · law:the-value-cycle · ← none — the six phases; this lecture is its far-half consolidation
- Absorption bottleneck · [borrow:none] · law:absorption-bottleneck · ← none — the generation-vs-reading gap and the review-bandwidth bullet are this law twice
- Crosses the wall · [borrow:economics] · law:crosses-the-wall · ← david-dynamo-1990, brynjolfsson-j-curve — the J-curve borrow the theory audit assigns here; body stays unnamed and number-free by design
- Variation, selection, retention · [borrow:evolutionary theory] · law:variation-selection-retention · ← cultural-vocab — Campbell's blind-variation-and-selective-retention; attribution stays maintainer-side, body names zero new laws
- Calibrated delegation frontier · [borrow:none] · law:calibrated-delegation-frontier · ← none — paid off from the M5 close as one closing bullet
- Double-loop learning · [borrow:Argyris & Schön] · law:double-loop-learning · ← cultural-vocab — encode-what-fires rather than one more sentence in a rules file

Stance `[stance:2026-08-01 level:L2]`
- holds: the laws, not new findings. This is a consolidation lecture that coins nothing — every law was named in-room before it, and its job is placement rather than assertion. **That is why almost every claim here is `vision` and why that is correct rather than lazy:** a consolidation file restating the training's own framing owes recognition, not citation. The two academic sources back the one mechanism the body borrows from outside.
- contested: nothing in the laws. The open questions on this file are dose and slot timing, which are delivery decisions rather than evidence ones, and they sit in the eyeball queue where they belong.
- decided: **restatement sweep run 2026-08-02, and it found something else.** The 80/20 ratio was the only body restatement carrying no local stamp; every other `detail` claim here is locally stamped and the remaining eighteen are `vision` or `borrowed`, which is correct for a consolidation that coins nothing. The sweep's real catch was one layer down: the `absorption-bottleneck` law was attributed five different ways across five files, `[borrow:none]` in three and `[borrow:research-house]` in two, with three different source sets. Fixed corpus-wide and now machine-checked, so this class of drift cannot recur silently.
- would-move-it: a law being renamed or retired upstream, which would strand a bullet here — this file is downstream of every other AE101 lecture, so its real risk is drift rather than falsification. The J-curve pairing would move if a study found the dip does not appear for agentic tooling specifically.

OODA
- question: has any law on this map been renamed, retired, or re-hedged in its home lecture without this consolidation following?
- roster: none external — this file's OODA is a diff against the eight lectures whose laws it restates, plus `theory-plan.md`'s inventory.
- last-run: 2026-08-01

<!-- /backing -->

**EYEBALL questions (2026-07-02, for Antti):**
1. Slot timing: this adds 8–10 min as a fourth closer beat. Trim a neighbour, or deliver this as the bridge beat? (M6's slot went to 2h; `node scripts/calculate-time.js spot-gaps-build-the-loop` says it now fits with float, so this may already be answered.)
2. Slide budget: six slides (re-show · three phase slides · governor · close). Trim candidate: fold the governor slide into the close?
3. Does the final line land — the kicker "The next dashed loop is yours to draw solid" as the training's last word on the map?
4. SVG dependency: the M2 map's own eyeball queue is open (incl. whether the checking ghost survives at all). If that ghost dies upstream, this re-show loses its payoff — resolve the M2 questions first?
5. `the-far-half`'s maintainer contract assigns per-law consolidation to "the M5/M6 closer job"; this lecture covers all three far-half phases alone at M6. OK, or does M5 owe a Verification-only half-beat?

- Family B judged 2026-07-03: B-star durability PASS, spine-anchored, worldview-fit; dose recorded as consolidation (zero new laws), cap question stays with the maintainer

**Control-loop naming beat (2026-07-03, Antti + external read):** new slide *The shape you drew* inserted between *The ghost, drawn solid* and *Verification, named*. Names the whole map as a feedback control loop (near half feedforward · far half feedback · verification as the sensor layer) — recognition-after-living, jargon-free BY DESIGN. NO setpoint/plant/gain; "feedback control" + "control loop" are the accessible names, earned in-breath by the mechanism sentence that precedes each. Zero new laws coined: the single-loop closed-loop-controller law (`theory-plan.md` §1, `[borrow:control theory]`) already lived in-room via `the-agent-loop` at M4 — this widens that law to the whole map at consolidation, and re-explains why the map has a near/far seam (feedforward/feedback). Antti's dosage call (Option B): ONE clean naming reaches students; the full canonical mapping (reference/controller/plant/output/measurement/error/disturbance/integral-memory → AE101) stays design-side in `theory-plan.md` § The Field Map. Slide count now 7 (was 6) — interacts with EYEBALL Q2 (slide budget); added knowingly. Source: canonical closed-loop negative-feedback diagram (Wikimedia Commons *Simple feedback control loop*; *Closed-loop controller*, Wikipedia) — textbook/foundational, cited design-side as origin not current evidence; the student line ("robotics and autopilots have run on for decades") is common knowledge, no freshness stamp owed.

**Adversarial verify (2026-07-03, 3-lens workflow `wf_e85f4a9a-ff2`):** durability+recognition PASS · strategy+worldview PASS · jargon+dose+consistency REVISE→FIXED. One BLOCKING catch (two lenses converged): bullet 2 originally enumerated the far half as "verification and absorption" and handed those phases "changes the system" — but Outcome (encode/cross-the-wall) is the system-changing phase per this lecture's own Outcome slide + bullet 1's "shape·watch·correct·encode" split. FIXED: bullet 2 now reads "the far half reads what came back, takes up what passed, and encodes what the session taught … changes the system so the next session starts better" (verification=read/sensor · absorption=take-up · outcome=encode, distributed correctly, "changes the system" anchored to encode). Also applied: "non-deterministic actor"→"agent" (§21 acting-register; was Antti's word — revertable) · bullet 3 de-listed the verifier/judge/gate triad to "the checks you built" so the "Verification, named" slide owns the full recitation (triad was echoing 4× across the M6 closer chain). Confirmed clean: no setpoint/plant/gain on student surface, "feedback control"/"control loop" earned in-breath, zero new laws (widens the M4 closed-loop-controller law), no em-dash/banned/math. Dose (7 slides) unchanged — stands with EYEBALL Q2.

**Diagram woven in (2026-07-04):** Antti chose proto A (`protos/control-loop-01-closed-loop.html` — the canonical closed-loop block diagram, relabeled in student words) from a 3-proto set (A=canonical form · B=open-vs-closed contrast · C=map-as-loop; B+C stay in `protos/` as alternates, PNG renders in session scratchpad). Inlined as this slide's `<figure class="diagram">`, SVG byte-identical to the proto minus blank/comment lines (marked's raw-HTML block terminates on any interior blank line — same rule as the engine SVG above). Bullet 1 de-duplicated: dropped "the shape robotics and autopilots have run on for decades" (now carried once, in the diagram caption). No SVG ids, so no collision with the engine map's mf- ids on the theory-handbook page. Slide is figure + 4 bullets (the fourth is the accumulation claim — see the accept-note below).

**Accumulation bullet (2026-08-09, Antti-directed; buried-gold item):** fourth bullet on *You drew a control loop* states the join the gold list named as un-homed: the harness enables continuation; what a session gets right unattended is set by the accumulated surround; M4/M5 is the lived proof (same model, same harness, only the surround differed — by the M4 four-part definition, the context differed, so "two different agents" is literal). Guards: (a) NOT a new law — no coined name, no bold; the dose verdict's "zero new laws" stands. (b) Claim altitude only — the four artifact classes stay bare; their mechanisms live on the Verification and Outcome slides. Do not expand the list. (c) Bearer split is the design: this is the system-side twin of the closing slide's frontier bullet (engineer-side, reach-and-gates). The twins lean on each other by deck order; neither restates the other. (d) Deliberate silences, all load-bearing: `the-agent-loop.md` untouched (its "Out of the box, nothing new takes over" scope is this bullet's setup — the payoff lands here, not there); `story-of-module-6.md` taste line untouched (no conflict: taste governs in-session quality, accumulation governs unattended capacity across sessions — encoding is how taste attends sessions the author is not in); `the-loop-has-a-name.md` untouched (its "not model features" slide argues the engineer-side stance, wrong bearer for this claim); the progression supplement untouched (engineer-subject by design); M6 module Key Concepts untouched (they enact the inventory; a second in-module statement would be repetition, not dosage). Design-side name: *Accumulated, not enabled* (`theory-plan.md` §3); the name stays off slides. Trainer line: *asking the product for more autonomy adds nothing the surround has not already earned.*

**Soil line (2026-08-15):** the strip rides this figure visually (bottom-center italic, paints last); its one spoken home is `agents-that-build-agents.md` § *You make agentic happen* (Antti-directed — the orders belong at the launch beat, not the consolidation). Do not add a spoken bullet here: the first slide stays three bullets, and *Nothing else moved* is literally true of the strip, which is on all four `map-engine*` figures.

**Quality:** compendium-audited 2026-08-29 (writing@4a722813 story@0e4f7c9e technical@8cc00874 behavior@1c765f2 pedagogy@1abb84c6 strategy@1c765f2 slides@0e4f7c9e)
- judges @4a722813: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS
