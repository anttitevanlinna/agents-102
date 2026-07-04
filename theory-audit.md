# Theory Audit — coverage matrix + canon gap check (2026-07-02)

**What this is.** Empirical results of the research pass step 1 (per `theory-plan.md` § Working pipeline): (a) every banked law graded against where it is actually DELIVERED in AE101 student-facing body (above the `<!-- maintainer -->` fence; trainer-guide = the lossy verbal channel, excluded by design); (b) outside-in canon check through 4 lenses (control-systems/reliability · econ/org-learning · practitioner canon 2024–26 · syllabus comparison vs Berkeley CS294 / DeepLearning.AI / HF / Anthropic Academy / Maven evals); (c) adversarial grep-verification of every claimed gap (8/8 confirmed, 0 overturned). Method: 12-subagent workflow `theory-coverage-inventory` (run `wf_ef4c48bd-254`), 2026-07-02.

**⚠ Source status.** Canon candidate URLs are AS-REPORTED BY LENS AGENTS — unverified by maintainer. Per `check_research_claims §11`: open every URL before any claim lands in student-facing body; single-lens candidates are one agent's judgment (§4 — hold loose); convergence is marked where ≥2 independent lenses proposed the same piece.

## Verdict (one paragraph)

"Most theory exists already" — confirmed, and understated. 25/37 banked laws are already NAMED with mechanism in student body; only 8 confirmed delivery gaps, and several of those are org/CTO-layer laws that may not belong in AE101 at all. The real findings are: (1) the course teaches **64 home-grown theory pieces the bank never recorded** — the bank lags the course, not vice versa; (2) several home-grown laws ARE classic laws under local names (you-can't-steer-what-you-can't-see = observability-precedes-control [Kalman]; find-is-easier-than-judge = verification asymmetry [Wei]; craft-has-a-date ≈ METR re-test cadence) — naming the lineage is cheap Family-A groundedness; (3) `lectures/why-mostly-right-fails.md` (the 0.85ⁿ lecture) is **fully orphaned — written, wired nowhere**. The theory wasn't missing; a load-bearing piece of it was unshipped. (4) Family A adversarial critique converged hard on 4 bank pieces (0.85ⁿ, good-regulator, hybrid-beats-autonomous, meta-platform) — fix before anchoring them in lectures.

## Coverage matrix

Status legend: **named** = law + mechanism in student body (recoverable from page alone) · **mentioned** = label without why · **enacted** = student does it, never named · **absent**. Per-module codes n·m·e·a. Totals: 25 named / 4 mentioned / 6 enacted-only / 2 absent.

| law | phase | best | M1·M2·M3·M4·M5·M6 | gap verdict |
|---|---|---|---|---|
| action-under-uncertainty | Soil | **named** | m·m·a·n·e·e | |
| competence-is-the-gate | Soil | **named** | a·m·e·a·m·n | |
| cross-the-wall | Soil | **named** | e·m·n·m·m·n | |
| agent-loop-closed-loop-controller | Work | **named** | m·m·n·n·n·m | |
| good-regulator | Context | **named** | n·e·n·e·m·m | |
| requisite-variety | Context | **named** | a·a·a·a·e·n | |
| context-bandwidth-and-rot | Context | **named** | m·m·n·n·n·m | |
| three-failure-modes | Work | **named** | m·e·e·n·n·n | |
| local-success-global-drift | Work | **named** | e·e·n·n·n·e | |
| steering-executable-constraint | Work | **named** | n·e·e·n·n·n | |
| ooda-act-collapsed | Work | **named** | e·e·n·m·n·m | |
| reliability-floor-085n | Verification | **mentioned** | m·m·a·m·e·a | |
| hybrid-beats-autonomous | Verification | **named** | e·e·e·m·e·n | |
| convergence-triad | Verification | **enacted** | a·a·a·a·a·e | confirmed-gap|
| absorption-bottleneck | Absorption | **named** | a·m·a·m·e·n | |
| blast-radius-error-budget | Verification | **named** | a·m·a·e·e·n | |
| principal-agent | Verification | **named** | e·e·a·e·n·e | |
| eval-judge-verifier-gate | Verification | **named** | m·m·e·m·n·n | |
| jidoka-stop-the-line | Verification | **named** | e·e·a·e·n·e | |
| feedback-latency-dominates | Outcome | **named** | a·a·a·e·n·n | |
| compound-ladder | Outcome | **named** | n·e·n·m·m·n | |
| double-loop-learning | Outcome | **named** | n·e·n·e·n·n | |
| variation-selection-retention | Outcome | **mentioned** | m·e·a·a·e·a | |
| dont-tamper | Absorption | **enacted** | a·e·e·a·a·e | confirmed-gap|
| amplification | Absorption | **mentioned** | m·a·a·a·a·a | |
| individual-not-institutional | Outcome | **enacted** | a·a·a·e·a·a | confirmed-gap|
| competence-first-sequence | Outcome | **enacted** | a·e·a·a·a·a | confirmed-gap|
| the-wall | Outcome | **mentioned** | a·m·a·m·a·a | |
| access-trust-gap | Outcome | **absent** | a·a·a·a·a·a | confirmed-gap|
| trust-observed-competence | Outcome | **named** | m·e·n·e·n·e | |
| value-cycle | Spine | **named** | e·n·m·m·a·a | |
| three-block-memory | Context | **named** | e·a·m·n·e·m | |
| l0-l3-ladder | Spine | **enacted** | e·a·a·a·a·a | confirmed-gap|
| pattern-layer-ontology | Spine | **absent** | a·a·a·a·a·a | confirmed-gap|
| coding-agents-meta-platform | Outcome | **named** | e·n·e·e·e·n | |
| name-the-uncertainty | Intent | **named** | e·m·n·e·e·e | |
| comparative-advantage | Intent | **enacted** | a·e·e·e·a·e | confirmed-gap|

## The 8 confirmed delivery gaps — triage (proposal, Antti decides)

| law | best | proposed home | why |
|---|---|---|---|
| convergence-triad | enacted | **AE101 M4/M5 far-half anchor** | banked ★, the go/no-go trust gate; earns after felt M4 failure. Candidate durable form: verification-asymmetry framing (see canon) |
| comparative-advantage | enacted | **AE101 M4 (Intent)** — but FIX MECHANISM first | econ lens: Ricardo mechanism is analogy-theatre for zero-marginal-cost agents; real mechanism = human opportunity cost + transaction costs (Coase delegation boundary). Intent phase is thin (groundwork flags it too: `name-the-done` ⚠GAP) |
| dont-tamper | enacted | **AE101 M6 (Absorption)** | pairs with evaluate-the-distribution / n=1-is-a-sample; the recurrence-vs-noise governor for rule-writing (M6 already routes gaps) |
| l0-l3-ladder | enacted | **AE101 spine** (map lecture or M6 close) | the engineer's own progression; students climb it without a name for it |
| access-trust-gap | absent | **not AE101 body** — CTO/org layer | groundwork FOUNDATION already carries it (F1); zombie-stat risk on ">35pts" (2 lenses). Trainer-voice / groundwork card territory |
| individual-not-institutional | enacted | **borderline** — M6 crossing beat carries it implicitly | groundwork F3; the wall's mechanism. If named in AE101, one line in the M6 closer, not a lecture |
| competence-first-sequence | enacted | **not AE101 body** — org-sequencing law | Agents-101/groundwork mat; AE101 students are already past the gate |
| pattern-layer-ontology | absent | **not AE101** — groundwork's ontology | lives in mapping-rules layer routing; AE101 doesn't need it |

## The 4 mentioned-only (label without why) — the cheapest upgrades

- **reliability-floor-085n** — students get "at least 10% wrong" (per-step rate) 3×, never the COMPOUNDING mechanism. The mechanism lecture EXISTS (`lectures/why-mostly-right-fails.md`) and is wired nowhere. But fix the law per Family A first (see critiques): durable form = *unverified chain length is the enemy; verification gates reset the chain* — no 0.85 constant in the name.
- **variation-selection-retention** — M1 mentions side-by-side approaches; selection/retention never named. Candidate: fold into compound-ladder mechanism (eval selects → memory retains) rather than a separate law.
- **amplification** — one glancing M1 metaphor ("the smart ones stay smart"). Family A: 2 lenses flag the claim itself as contested (Brynjolfsson et al. found least-experienced gained most at task level). Demote to hypothesis or split legs before teaching.
- **the-wall** — named in the map lectures now, but as phenomenon without mechanism. Econ lens: add J-curve / complementary-investment (David 1990) and it becomes actionable instead of fatalistic.


## Canon adoption shortlist (convergence-ranked; proposals)

**Tier 0 — user-signal (maintainer-proposed frame, 2026-07-02): backpressure as the far-half story.**

**backpressure** · Spine (far half) · half-life: durable · Src: Lucas F. da Costa, "Backpressure is all you need", lucasfcosta.com/blog/backpressure-is-all-you-need (2026-05-23) [practitioner direct] — **URL verified 2026-07-02** (fetched, byline + date confirmed). Underlying mechanism = [borrow:flow control] (TCP, reactive streams, queueing) — the essay's framing is one practitioner's, the mechanism is classic, and the PRACTICE it names (automated gates the agent iterates against before human review) is convergent across Karpathy (verification-speed loop), Wei (asymmetry), Husain (calibrated judges), Ronacher (verifier), Cherny (hooks), Anthropic BEA.
- MECH: downstream signals upstream that it can't accept more work, forcing the producer to slow, buffer, or shed. Today the human is the default backpressure in the agent loop — "any system that relies on a human to catch the machine's mistakes will be limited by the human, not the machine." The move: install automated gates (tests, types, linters, judge agents, plan review, post-merge monitors) that push back INSIDE the loop, each iteration, so the human shifts from inline inspector to gate designer + exception handler.
- ROLE: not one more law — the FRAME that composes the far half. Verification = the backpressure surface · absorption = the consumer capacity it protects (Jevons/Baumol say it tightens) · gates-reset-the-chain = backpressure placement per iteration · session reach = min(model horizon, your gate infrastructure) · Goodhart = gate decay · calibrate-the-judge = gate validity · asymmetry = where gates are buildable cheap · autonomy-dial = how much reach current gates support. Gives hybrid-beats-autonomous its durable replacement (the human moves position, doesn't leave). Seam formulation: near half = you ARE the feedback; far half = engineer your replacement in the loop's hot path, keep the judgment.
- MOVE (governor candidate): *what is the first check this run will hit that isn't me?*
- CAVEATS: metaphor integrity — hold one polarity (signal flows consumer→producer); the gates also bounce work for rework (rejection/retry, still flow-control). Disanalogy to keep visible: classic backpressure protects the system, ours protects the scarce human — which IS the absorption story, so it works for us. Placement per doctrine: felt at M4 (you were the backpressure), named M5 (verifier = the kit), infrastructure + compounding at M6. NOT front-loaded at the M4 opener.
- Cross-links: groundwork business mat already carries `design-the-filter` (reviewer → system-designer, absorption) — same law, other mat. Costa ships a `backpressured` skill (npx) — possible M5/M6 exercise tie-in, unevaluated.

**Tier 1 — ≥2 independent lenses, or already enacted in-course (adopt into bank; wire during edit pass):**

1. **verification-asymmetry / verifier's law** (practitioner + syllabus, both high; ALREADY IN M2 BODY as "Find is easier than judge", push-back-on-the-plan.md:39). The economic engine of the whole far half — why delegation pays where verification is cheap. Sharpens convergence-triad's "independently verifiable" leg into a cost ratio. Src: Jason Wei, jasonwei.net (July 2025) [practitioner direct] — VERIFY URL.
2. **lethal trifecta** (practitioner + syllabus, both high/missing). The agentic adversary model — private data + untrusted content + outbound channel; M3 does classic STRIDE but nothing on the agent AS attack surface / instructions-vs-data inseparability. Src: simonwillison.net/2025/Jun/16 [practitioner direct] — VERIFY URL. Natural home: M3 (earn-the-trust already does security) or M4 send-off gate.
3. **Goodhart / eval-gate-decay** (3 lenses: control, econ, syllabus). Gates are perishable; the optimizer games the measure; hold-out + integrity-check countermoves. Bank has principal-agent naming reward-hacking but not the decay mechanism. Natural home: M6 (`when-the-score-stops-moving.md` may already carry part — check during edit).
4. **autonomy-is-a-dial / workflows-vs-agents** (practitioner + syllabus, both high/partial). The canon's founding distinction (Anthropic BEA): who owns control flow, agency-as-cost. Bank's hybrid-beats-autonomous is the labor split, not the control-flow spectrum — and 3 lenses flag hybrid's half-life. Durable replacement: dial indexed to verification cost.
5. **calibrate-the-judge + error-analysis-first** (syllabus high/missing + practitioner medium; one discipline). A judge is a claim requiring verification against human labels; evals come from reading real traces, not armchair taxonomy. Direct upgrade to eval-judge-verifier-gate's missing validity condition. Src: hamel.dev [practitioner direct] — VERIFY.
6. **observability-precedes-control** (control lens high/missing; ALREADY IN M1 as "You can't steer what you can't see"). Name the lineage (Kalman duality — controllability needs observability), wire to the leash-length decision at M4. Cheap: the course already teaches it.

**Tier 2 — single-lens high, strong fit (adopt selectively):**

7. **ironies-of-automation + trust-calibration-complacency** (control lens; Bainbridge 1983 + Parasuraman–Riley 1997). The far half's HUMAN side: automation removes the practice that monitoring requires; earned trust breeds miss-rate collapse. Also the Family-A fix for trust-observed-competence (currently trains overtrust). Natural home: M4 far-half opener territory / M6.
8. **delegation-boundary (Coase)** (econ lens high/missing). Fixes comparative-advantage's broken mechanism AND fills the thin Intent phase: delegate where spec+verification costs are low, not where the agent is "better."
9. **jevons-review-rebound** (econ lens high/partial). Cheaper generation ⇒ MORE total review load, not less — the mechanism that predicts absorption-bottleneck TIGHTENS as models improve. Counterintuitive, durable, CTO-legible.
10. **evaluate-the-distribution / n=1-is-a-sample** (control + syllabus, medium/partial in both = convergent). A single green run is a sample, not a measurement; pass@k vs pass^k. Pairs with dont-tamper as the measurement policy it lacks.
11. **absorptive-capacity (Cohen & Levinthal 1990)** (econ lens). Not new teaching — the academic grounding under competence-is-the-gate. Family-A groundedness upgrade only.

**Tier 3 — noted, not proposed for AE101 body:** MTTR-over-MTBF (SRE reframe of recovery-path investment), practical-drift (Rasmussen), diverse-redundancy (Knight–Leveson — grounds same-context-self-audit-under-flags which M3 already teaches), SECI externalization (grounds cross-the-wall), dynamo/J-curve (grounds the-wall), time-horizon-doubling (METR — grounds craft-has-a-date; medium half-life), context-continuity (Cognition), ACI/tool-ergonomics, progressive-disclosure, jagged-frontier, plan-as-cheapest-gate (Boehm — grounds M2's existing plan-gate economics), Rogers five levers, Baumol judgment premium, residual-rights-of-the-prompt, Wright's law of cycles.

## Family A verdicts — bank pieces to fix BEFORE anchoring in lectures

**Convergent (≥2 lenses) — must fix:**

- **reliability-floor-085n (ALL 4 lenses).** (a) Independence assumption false — self-correcting loops break i.i.d. compounding, CONTRADICTS the bank's own agent-loop-closed-loop-controller; (b) 0.85 = zombie-stat-by-construction (round constant baked into the name, will be quoted after per-step reliability moves); (c) durable content = error compounds over UNVERIFIED chain length + gates RESET the chain (connect to jidoka); (d) empirical replacement for the capability claim = METR horizon curve. → Reframe the law; retire the constant from the name.
- **good-regulator (3 lenses).** Conant–Ashby is a narrow formal theorem; "the theorem proves CLAUDE.md works" is analogy-theatre. Honest form: intuition pump ("model-based control beats model-free under variety"); actual mechanism = relevance conditioning, already carried by context-bandwidth-and-rot. ⚠ **the-loop-half-filled.md currently ships this law in its strong form — edit pass must downgrade.**
- **hybrid-beats-autonomous (3 lenses).** Time-indexed snapshot banked as durable law; rots on the METR curve. Durable conditional: *hybrid wins where verification is expensive; autonomous already wins where it's cheap* — which merges it into the triad/asymmetry frame.
- **coding-agents-meta-platform (3 lenses).** House strategic thesis presented as theory; "vendors cannot extend themselves" is falsifiable-and-being-falsified. Keep in strategy layer; if taught, teach the Bitter-Lesson economics (general tool riding the model curve beats bespoke scaffolding) and label the rest thesis.
- **access-trust-gap (2 lenses).** ">35pts always" = zombie-stat formation. Keep qualitative mechanism (trust lags access because trust needs accumulated observations), pin the number to survey+date+N at every use or drop it.
- **amplification (2 lenses).** Slogan neater than evidence; task-level studies point opposite for the "weak fail faster" leg. Demote to hypothesis; pin each leg separately.
- **requisite-variety (2 lenses).** "Fan-out splits variety" misuses Ashby — copies of the same model are correlated channels (Knight–Leveson), and write-heavy work anti-parallelizes (Cognition). Add the boundary condition: parallelize reads, serialize writes; variety = genuinely diverse channels only.
- **eval-judge-verifier-gate (2 lenses).** Missing validity condition (calibrate the judge) + conflates verification (against spec) with validation (against need). One-sentence fixes.

**Single-lens — hold loose, judge during edit:**

- **agent-loop-closed-loop-controller** (control): necessary-but-not-sufficient — loop QUALITY (observability, sensor noise, delay) decides convergence; a flaky test suite is a closed loop that still diverges. Guards against "I added tests, therefore controlled" theatre. *Worth adopting: it's the honest version and it generates the M5 move.*
- **principal-agent** (econ): opportunism leg doesn't transfer (model has no interests); what transfers = information asymmetry + costly monitoring + objective mis-specification. Unflagged, students import carrot/stick intuitions.
- **trust-observed-competence** (control): monotone-acquisition story trains overtrust; needs the complacency half (see ironies/complacency adoption).
- **feedback-latency-dominates** (control): DORA = self-report survey correlation, weakest leg; stronger ground = delay bounds achievable autonomy (control theory).
- **comparative-advantage** (econ): see delegation-boundary adoption.
- **the-wall** (econ): phenomenon without mechanism; add J-curve.
- **three-block-memory** (practitioner): label house-convention, not field theory.


## Home-grown theory the bank never recorded (64 pieces, per module)

The course's own laws — named generalizations in student body that are NOT in the bank. Bank-absorption candidates ★ marked where a piece is load-bearing across modules or matches a classic law.

**getting-going** (9):
- **The wizard is dead (skill migration)** — Syntax-level mastery has been absorbed by the LLM; the differentiating engineering skill migrates to stance, priming, and context.
- **Two frontiers (open questions)** — Two named unsettled questions — learning-rate and learning-the-right-things — that frame the whole training's arc as an inquiry rather than a toolkit.
- **Compound engineering (Klaassen)** — An attributed four-step practitioner loop (also named at the closer lecture: 'The pattern has a name. Kieran Klaassen at Every calls it compound engineering'); a distinct named framework beside the checklist's compound-ladder.
- **Wrong is how steering gets in** — First-pass wrongness is the input channel for steering; each namable wrongness converts into a rule — a generative claim about where rules come from.
- **You can't steer what you can't see** — Observability precedes control — orient and inspect the window before any code action, in every session.
- **Rules grow from evidence, not blank pages** — Evidence-born rules beat blank-page rules — durable rules are extracted from how you actually worked, not authored a priori.
- **Parallelism has coordination costs** — Predicts when multi-session pays: parallel gain must beat coordination plus conflict-recovery overhead; also excludes ordering-dependent chains and still-learning operators.
- **Human owns the merge boundary** — Semantic conflict resolution is never delegated: intent lives with the human, syntax with Git — a boundary rule with a stated mechanism.
- **The vehicle and the cargo** — The transferable asset of any exercise is the loop/pattern, not the instance fixed — pattern-over-instance as a general claim about agentic work.
**learn-from-the-test** (10):
- **Ronacher's three-pattern (reference / plan.md / verifier)** — The module's central named framework: three packaging pieces, each indexed to exactly one of the three failure modes, presented as practitioner convergence.
- **Three verifier shapes (Cherny menu)** — A generative taxonomy — background-agent / deterministic shell-hook / Ralph re-feed — with per-shape applicability conditions for matching check mechanism to failure type.
- **Must→hook / should→prompt partition** — Enforcement-placement rule grounded in a mechanism ('the LLM is forgetful... Hooks don't forget'): certainty-demanding constraints go in the runtime, taste stays in the prompt.
- **Two camps: extend-session vs fresh-handoff** — A named field-level dichotomy (Amp's handoff camp vs the extend camp M5 teaches) that generates session-management choices beyond this exercise.
- **Single-variable contrast experiment** — Controlled-experiment method stated as the learning design: hold the task constant, change one variable, read the diff.
- **Test → learn → encode arc** — Internal three-beat learning-cycle model spanning M4–M6; the module's meta-structure named to the student.
- **Clean Code as stability under machine-speed change** — Codebase-quality-amplifies-agent-power law ('The more powerful the coding agent, the more important the steering system') — the codebase-scale analogue of the amplification law, which itself is absent.
- **Modularity shrinks the agent's search space** — Structural-constraint theory: tests and small decoupled units reduce the agent's degrees of freedom for collateral damage — mechanism for why code structure steers agents.
- **Abstraction-ladder analogy (assembler → compiler → AI)** — Historical model predicting the engineer's role shift up the abstraction stack rather than disappearance.
- **Agent hours are org cost** — Economic framing that makes packaging ROI CTO-legible: unverified autonomy is paid waste, packaging converts spend into reliable output.
**run-the-first-experiment** (11):
- **Gap analysis** — Named, attributed-as-generic transferable move for every future agent hand-off; sharpened in the module Key Concepts as 'the system you have is what gets tested.'
- **Cancel is legitimate / traces are data** — Practitioner rule: a stopped run with a readable trace is a valid experimental result — stopping is reading, not failing.
- **Two-run contrast arc** — Same task run twice (un-packaged then packaged); felt failure is the mechanism by which packaging theory lands — stated to the student as a generalization about how this learning works.
- **Ronacher's three-pattern (packaging triad)** — The reference-artifact + plan.md + verifier packaging triad, forward-named here and enumerable via its deliberate absence ('no plan.md, no verifier, no reference artifact'); teaching owned by M5.
- **Compound engineering four-step loop (Klaassen)** — Klaassen's plan/work/review/compound cycle named in the pre-reads blurb; the Debrief self-rewrite enacts its Review+Compound step (4th rep).
- **Bread in the AI sandwich** — Klaassen/Entis identity model: human bookends (framing, taste-checking) around the model's generation — the module's mentioned carrier for the hybrid frame.
- **Agentic Clean Code reframe** — The old discipline's purpose shifts: tests/modularity/metrics stop being hygiene and become the steering system for machine-speed change.
- **Abstraction-shift ladder** — Historical-analogy model predicting the human job moves up the stack to 'deciding what must remain true' rather than vanishing.
- **Memory vs context + three-layer memory** — Precise memory/context distinction plus the personal/team/company layering governed by two generative questions: where does it live, and who is allowed to change it.
- **Intervention-budget heuristic** — A threshold rule for when watching-and-nudging has collapsed into manual driving — stop and read the trace instead.
- **Git-vs-transcript two-layer read** — Two-evidence-layer model for post-run reads (in §10 of the reference the module links); also carries the 'recording, not searching' durable-move principle.
**earn-the-trust** (10):
- **Invoke, don't re-derive (curated skills compress upstream judgment)** — Frontier expertise arrives compressed as invocable capability; re-deriving it locally is waste — a generative rule for when to curate vs build.
- **Don't make general what you don't practice yourself** — Authoring rights follow practice: only encode into shared/general artifacts what you actually do — the governor behind the two-curated/one-authored proportion.
- **Authoring without invocation is theatre** — An authored agent capability is unverified until invoked on real work — verification-by-use as a law of skill authoring.
- **Same-context self-audit under-flags (self-charity + RLHF softening)** — A model judging its own in-window output systematically under-flags weaknesses; predicts the counter-moves taught (over-flag instruction, fresh-session subagent, two-prompt split, ask-for-weakest-part mirror).
- **The agent reasons forward from the conversation, not from the filesystem** — Scrollback framing dominates ground truth in agent reasoning — a mechanism that predicts a whole class of plausible-but-wrong placement/assumption errors.
- **Threat modeling is only useful if it produces a decision (structured rejection)** — Breadth frameworks earn their keep by making the single decision defensible through explicit rejection of the rest — reject-most, pick-one as a general analysis-to-decision law.
- **Disk outlives the session (scrollback is ephemeral)** — Knowledge that stays in the session dies with it; only on-disk artifacts participate in team-level value — the write-it-down governor behind the ADR and skill moves.
- **Your codebase teaches the skill, not the manual** — Local specificity beats generic perfection for agent capabilities — the value of an encoded skill comes from system-specific truth no outsider holds.
- **Craft has a date (advice shelf-life / the compaction reversal)** — Agentic best-practice claims are dated artifacts that can fully reverse within months; re-verify against your own instruments (/context) before trusting — taught via the 2025→2026 compaction reversal.
- **Agentic engineering is the discipline of noticing (mutual learning loop)** — A two-way learning-loop model of the practice: steering trains the agent, drift trains the engineer, and the loop compounds — telegraphic, reader-fills-the-rest by design.
**plan-mode-done-right** (10):
- **Three pressures that make bad plans look good** — Three named psychological mechanisms (persuasive structure; reasonableness passing for rightness; prior agreement) that inflate approval of unread plans — the module's own home-grown theory.
- **Three things a good plan has** — A transferable three-part rubric (specific file list, verification step that could actually fail, named assumptions) operationalizing plan quality as decidedness.
- **Two reads, paired (complementary scrutiny)** — Human read and agent walk-down are complementary scrutiny classes; completeness comes from the pairing, not from either read — also carries the mode-is-not-the-discipline distinction ('Plan mode makes the read possible; it isn't the read').
- **Plan-mode approval inflation** — Named failure pattern (rubber-stamping structured plans) that the two-read pairing is explicitly framed as defeating.
- **Vagueness marks undecided branches** — Soft plan language is a reliable pointer to unmade decisions — predicts where to aim a push-back.
- **Softening-on-regeneration (RLHF niceness)** — Behavioral law of agent sycophancy with a stated mechanism: accepted feedback can silently regress in the revision, so push-back includes checking the revision.
- **Find is easier than judge** — Generation/evaluation asymmetry used as a move — let the agent locate candidates while the human keeps judgment.
- **The steady part vs the moving part** — Invest improvement in the durable artifact, not the agent — the file carries the system's learning across triggers and runtimes ('The file travels').
- **Wait isn't dead time** — Overlap human absorption with agent latency — named as a repeating cross-module scheduling pattern.
- **Agents are confident at merge boundaries** — Behavioral generalization predicting agent failure at semantic merge boundaries; generates the human-stays-in-the-driver-seat-at-conflicts rule.
**spot-gaps-build-the-loop** (14):
- **Ronacher three-pattern as a stance toward non-determinism** — Packaging model: each artifact counters one specific LLM failure mode, which is why the method survives every model replacement.
- **Gap-routing triage (three homes)** — An ontology routing each diagnosed gap to the artifact layer (prevention / mid-run check / packaged move) where it stops recurrence.
- **Three skill shapes (sharpened verifier / LLM-judge / gap-finder)** — A generative typology mapping gap type (deterministic miss / qualitative miss / pre-run context miss) to the check shape to author.
- **Rules-files have a half-life (compound by subtraction)** — Encoded memory decays; deleting stale rules is as much a compounding move as adding new ones.
- **Same-context self-audit under-flags (LLM self-critique charity)** — An LLM reviewing its own in-context output is systematically lenient; fresh-context dispatch or forced over-flagging sharpens the read.
- **Invocation-as-test** — An authored artifact is unverified until invoked on real work — verification of the encoder, not just the code.
- **Quality-as-grounding reframe** — At agentic volume, quality discipline extends from spec-and-tests to maximizing human grounding signal — 'you ship a million lines, how do you know it's right?'
- **Guardrails vs evaluators (fast lane / slow lane)** — Husain's taxonomy: split checks by latency budget — inline deterministic blockers vs async judges; never a slow judge as a synchronous gate.
- **Single writer with advisor agents** — Yan/Cognition: parallel writers collide on implicit choices; parallelize advice, serialize writes.
- **Normalization of deviance (composition erodes review)** — Ronacher/Willison: fluency in a move silently degrades the discipline that justified it — teach composition without the counter and you teach its decay.
- **CLAUDE.md as dispatcher, skills as handlers** — Dino's architecture model: predicate-routing composes a skill kit, and the same primitive scales from within-repo to cross-repo.
- **Practitioners see levers first** — Innovation appears in practitioner hacks before it ships as platform features — watch practice, not roadmaps (Ralph → /goal).
- **Transcript vs git two-layer evidence** — Post-run reading needs both the outcome layer (diffs) and the process layer (transcript); each sees what the other misses.
- **Workflow-composition lineage map** — A curated field-map (Klaassen / Pocock / Cognition / Amp / Cherny + Ronacher counter) with three selection filters: shape of your work, orchestration load you'll maintain, review bandwidth you actually have.

## Full canon candidate detail (per lens, as reported — URLs unverified)

### Lens: control-systems

**ironies-of-automation** · high · missing · Absorption · half-life:durable
- MECH: Automating the reliable middle of a task leaves the human exactly two jobs: monitoring for the rare failure, and taking over when it happens. Both jobs demand the hands-on skill the automation just removed the daily practice for — manual and diagnostic skill decays without exercise, and the takeover arrives under the worst possible conditions (a situation the automation already couldn't handle). The better the agent, the fewer practice reps the human gets, so the human is weakest precisely when finally needed. This is the canonical theorem of supervising automation and the course does not carry it.
- MOVE: Treat code-reading and debugging fluency as perishable: schedule deliberate manual reps (periodically write/debug by hand what you normally delegate), run takeover drills the way SRE runs game days, and design review as active engagement (trace a path, explain it back) rather than passive watching.
- SRC: [borrow:human-factors] Lisanne Bainbridge, "Ironies of Automation," Automatica 19(6), 1983
- BANK: absorption-bottleneck

**diverse-redundancy** · high · missing · Verification · half-life:durable
- MECH: Redundancy multiplies reliability only when failures are independent. Knight & Leveson showed empirically that independently developed program versions fail on the SAME hard inputs far more than independence predicts — shared blind spots come from the shared problem, not shared code. LLM-generates-plus-LLM-judges shares training distribution and priors: plausible-but-wrong output is plausible to the judge for the same reason it was generated. Fan-out of similar agents therefore adds copies, not variety.
- MOVE: Count only mechanically diverse channels — compiler, real execution, property-based tests, human read — as independent verification; never book model-judging-model as a second nine of reliability; when fanning out, diversify models/prompts/tools, not just seeds.
- SRC: [borrow:software-reliability] Knight & Leveson, "An Experimental Evaluation of the Assumption of Independence in Multiversion Programming," IEEE Trans. Software Engineering, 1986
- BANK: variation-selection-retention

**trust-calibration-complacency** · high · partial · Verification · half-life:durable
- MECH: The human-factors result is not that trust grows from observed competence — it's what earned trust does to the supervisor. Highly-but-imperfectly reliable automation produces complacency: the monitor's detection rate on the residual failures collapses (vigilance decrement on rare-signal watchkeeping onsets within ~30 minutes, Mackworth 1948). Misuse (overtrust from a good track record) and disuse (abandonment after one salient failure) are both mis-calibrations; the target is trust matched to measured per-task reliability, not maximal trust. The 95%-reliable agent is the most dangerous one, because the human stops looking exactly when 1-in-20 outputs is wrong.
- MOVE: Measure your own miss rate: periodically seed known defects into agent output and check you catch them; recalibrate trust per task class instead of carrying it across domains; when the agent's track record improves, tighten sampling discipline rather than relaxing it.
- SRC: [borrow:human-factors] Parasuraman & Riley, "Humans and Automation: Use, Misuse, Disuse, Abuse," Human Factors 39(2), 1997; Mackworth 1948 (vigilance decrement)
- BANK: trust-observed-competence

**observability-precedes-control** · high · missing · Verification · half-life:durable
- MECH: Control theory splits regulability into two structural preconditions: controllability (inputs can move the state) and observability (the state can be reconstructed from outputs). No feedback law, however fast, can regulate a state dimension the sensors cannot see. Tests observe behavior on exercised paths; architecture erosion, security posture, and cross-module coherence are state dimensions with no sensor in the default loop — which is the missing mechanism under local-success-global-drift: the drift lives exactly in the unobserved dimensions. Autonomy must be budgeted by what your instrumentation can see, not by what the agent can do.
- MOVE: Before granting a longer leash, engineer the observation channel first: demand legible intermediate artifacts (plan, small diffs, run-notes, test output), add sensors for the states you actually care about (arch/lint rules, invariant asserts, property checks), and refuse autonomy on work whose failure mode would be invisible to the current sensors.
- SRC: [borrow:control-theory] R. E. Kalman, "On the General Theory of Control Systems," 1960 (controllability–observability duality)
- BANK: local-success-global-drift

**goodhart-proxy-collapse** · high · partial · Verification · half-life:durable
- MECH: A feedback loop regulates the measured signal, not the intended quantity. When the plant is an adaptive optimizer, any gap between proxy and objective gets found and exploited — the sensor becomes part of the attack surface (Goodhart/Campbell; reward hacking is the RL name, sensor spoofing the control name). A fixed eval the agent can observe is a specification it will satisfy in the letter: 'make the test pass' quietly replaces 'make the code right' (weakened asserts, deleted tests, special-cased inputs). The bank gestures at reward-hacking inside principal-agent but never states the law that every visible gate degrades into a target.
- MOVE: Keep some verification signals outside the agent's observable context (hold-out evals); after a pass, check the gate's integrity, not just its verdict (did asserts weaken? did a test disappear?); rotate evals when they saturate; treat a suspiciously clean pass as a trigger to inspect the gate itself.
- SRC: [borrow:economics/measurement] Goodhart 1975; Donald T. Campbell, "Assessing the Impact of Planned Social Change," 1979
- BANK: principal-agent

**gate-roc-alarm-fatigue** · medium · missing · Verification · half-life:durable
- MECH: Every gate is a detector with an ROC operating point: miss rate trades against false-alarm rate; you cannot tune one without moving the other. Signal detection theory plus the alarm-systems literature adds the human coupling: a high false-alarm channel doesn't just waste time, it retrains the supervisor to discount that channel entirely (the cry-wolf effect), so a flaky gate silently zeroes the value of its true alarms and poisons trust in adjacent gates. With stochastic generators upstream and stochastic LLM judges inside the gate, the false-alarm budget is as load-bearing as coverage.
- MOVE: Track false-alarm rate per gate as a first-class metric; fix or delete flaky checks ruthlessly (a flaky gate is worse than no gate); calibrate LLM-judge thresholds against a small labeled sample before trusting their verdicts in a pipeline.
- SRC: [borrow:human-factors] Green & Swets, Signal Detection Theory and Psychophysics, 1966; Breznitz, Cry Wolf: The Psychology of False Alarms, 1984
- BANK: eval-judge-verifier-gate

**mttr-over-mtbf** · medium · partial · Work · half-life:durable
- MECH: Availability = MTBF/(MTBF+MTTR): when the component is stochastic and failure is inevitable, shrinking time-to-recover usually buys more than stretching time-between-failures, and it's cheaper. The correct reliability model for an agent chain with checkpoints and verifiers is not a series system (where 0.85^n rules) but a repairable system: effective reliability is governed by detection latency and rollback cost, not raw step accuracy. This is WHY agents are usable at all despite the compounding floor — and the bank carries the floor without the repair term that beats it.
- MOVE: Invest in the recovery path before prompt-perfection: small reviewable diffs, git checkpoints, sandboxes, cheap revert, bisectable history; measure time-to-detect and time-to-revert as the first-class metrics of your agent practice.
- SRC: [borrow:SRE] Google SRE Book, ch. 3 "Embracing Risk" (MTTR/MTBF, error budgets); classic repairable-systems reliability theory
- BANK: reliability-floor-085n

**stochastic-measurement-passk** · medium · partial · Verification · half-life:durable
- MECH: A single run of a stochastic generator is a sample, not a measurement. Capability and reliability are different statistics: pass@k (succeeds at least once in k tries) measures what is reachable; pass^k (succeeds all k times) measures what is dependable — and pass^k collapses fast even for tasks with high pass@1. Any prompt/context change judged on n=1 confounds the change with run-to-run variance, and regression to the mean makes post-failure tweaks look effective when they did nothing.
- MOVE: Never conclude from n=1: evaluate CLAUDE.md/prompt changes with repeated runs before crediting them; grant autonomy on pass^k-style reliability evidence, not best-of-k demos; classify every impressive demo as pass@k evidence only.
- SRC: [academic/research] Yao et al., "τ-bench" (defines pass^k for agent reliability), https://arxiv.org/abs/2406.12045 (June 2024; cited as metric definition, not time-bound evidence) + [borrow:statistics] sampling theory/SPC
- BANK: dont-tamper

**practical-drift** · medium · missing · Absorption · half-life:durable
- MECH: Rasmussen's dynamic-safety model: under efficiency pressure, work practice migrates toward the boundary of acceptable risk; each individual relaxation is locally rational and empirically safe, and the accumulated migration is invisible from inside until the boundary is crossed. Applied to agent supervision: 'it's been fine for weeks, skip the second read' is exactly this gradient. This is drift of the supervising SYSTEM — distinct from the agent's within-task drift the bank already names — and because it is invisible from inside, the boundary must be marked externally.
- MOVE: Define non-negotiable invariants that never relax regardless of track record (e.g., security-touching diffs always get a full read); schedule periodic full-depth audits of a sample of agent output even at high trust; alarm on review-depth metrics decaying over weeks.
- SRC: [borrow:safety-science] Jens Rasmussen, "Risk Management in a Dynamic Society," Safety Science 27(2–3), 1997; Scott Snook, Friendly Fire (practical drift), 2000
- BANK: local-success-global-drift

**automation-levels-per-function** · medium · partial · Spine · half-life:medium
- MECH: Automation is not one dial. The Parasuraman–Sheridan–Wickens model decomposes a task into four stages — information acquisition, information analysis, decision selection, action implementation — and assigns each stage its own automation level on the Sheridan–Verplank 10-point scale. Blanket labels like 'hybrid' hide the real design space: the right configuration is per-stage (high automation on gathering and executing, low on deciding), and most supervision failures are a level set too high on exactly one stage.
- MOVE: When packaging a delegation, set the dial per stage and write it down: agent explores and drafts (high), human selects the approach (low), agent implements (high), gates verify (mid) — instead of assigning one global trust level to the whole task.
- SRC: [borrow:human-factors] Sheridan & Verplank 1978; Parasuraman, Sheridan & Wickens, "A Model for Types and Levels of Human Interaction with Automation," IEEE Trans. SMC-A 30(3), 2000
- BANK: hybrid-beats-autonomous

### Lens: econ-org

**the-delegation-boundary** · high · missing · Intent · half-life:durable
- MECH: Coase/Williamson: the boundary between do-it-yourself and delegate is set by transaction costs, not by who is better at the task. Delegating to an agent carries three transaction costs: specification (writing the intent and context), monitoring (verification), and rework (failure probability times blast radius). Work is delegable where those costs are lower than doing it yourself; tacit, hard-to-specify work (high asset specificity) stays in-house. Crucially, the boundary is movable: every CLAUDE.md line, skill, and eval is capital investment that lowers specification and monitoring cost — the compound ladder is literally the mechanism by which the delegable frontier expands.
- MOVE: Before delegating, price the transaction: spec cost + verification cost + rework risk vs. doing it yourself — delegate where specification and verification are cheap, keep tacit work. Treat context/skill/eval authoring as deliberate investment to move the boundary, and re-price the boundary every model generation instead of relitigating each task from scratch.
- SRC: [borrow:economics] Coase, 'The Nature of the Firm' (1937); Williamson, 'The Economic Institutions of Capitalism' (1985)
- BANK: comparative-advantage

**jevons-review-rebound** · high · partial · Absorption · half-life:durable
- MECH: Jevons: when the efficiency of using a resource improves, total consumption rises rather than falls, because demand is elastic — cheaper coal meant more coal burned, not less. Cheaper generation means more generation attempted: more branches, more variants, more speculative work. Total verification demand therefore RISES with every model improvement, even as per-unit generation cost falls. The absorption bottleneck is not a temporary constraint that better models relieve; the rebound mechanism predicts it tightens as models improve.
- MOVE: Treat every generation-efficiency gain as a forecast of increased review load, not decreased. Cap generation WIP to the team's measured absorption rate (subordinate the line to the bottleneck), and budget verification capacity BEFORE scaling agent count or model capability.
- SRC: [borrow:economics] W.S. Jevons, 'The Coal Question' (1865); Khazzoom–Brookes postulate; subordination move: [borrow:operations] Goldratt, 'The Goal' (1984)
- BANK: absorption-bottleneck

**goodhart-eval-decay** · high · partial · Verification · half-life:durable
- MECH: Goodhart: when a measure becomes a target, it ceases to be a good measure, because the optimizer finds the cheapest path to the measure rather than the goal it proxied. An agent is a literal optimizer pointed at whatever gate you install; reward hacking is Goodhart with an RL-trained optimizer. Every eval is therefore a depreciating asset: the moment it becomes the target of the loop, optimization pressure decouples it from intent. This is a different mechanism from principal-agent misalignment — no hidden action needed; the gate decays even with full observability.
- MOVE: Hold out eval cases the agent never sees; treat 'passes the test, misses the intent' as a Goodhart signature demanding an eval refresh, not bad luck; pair every proxy metric with an intent-level check (the second read); rotate and adversarially maintain gates on recurrence.
- SRC: [borrow:economics] Goodhart (1975), Strathern's formulation; Campbell's law (1979)
- BANK: eval-judge-verifier-gate

**absorptive-capacity** · high · partial · Absorption · half-life:durable
- MECH: Cohen & Levinthal: an organisation's ability to recognize, assimilate, and exploit external capability is a function of its PRIOR RELATED KNOWLEDGE, and it is built by doing the work in-house, not by buying the output. You cannot absorb agentic capability from a vendor, a platform, or a hire if nobody inside has walked the loops — the practice is the absorption organ. This is the mechanism underneath the bank's 'competence is the gate' axiom: it explains WHY competence can't be outsourced and adds a predictor (prior related knowledge) and a role (gatekeepers who translate the external frontier inward).
- MOVE: Sequence practice before platform even when vendors sell the finished thing — the 'redundant' in-house practice is what makes future purchases absorbable. Assign explicit gatekeeper/bridge roles who track the external frontier and translate it into the org's language.
- SRC: [borrow:org-economics] Cohen & Levinthal, 'Absorptive Capacity: A New Perspective on Learning and Innovation', ASQ (1990)
- BANK: competence-is-the-gate

**dynamo-lag-j-curve** · high · partial · Outcome · half-life:durable
- MECH: Paul David: general-purpose technologies pay off only after complementary organisational reinvestment — factories captured electricity's gains only when they abandoned the steam-shaft layout and redesigned around distributed motors, a multi-decade lag. Brynjolfsson's productivity J-curve adds the accounting: during the complementary-investment phase, measured productivity is flat or negative because the org is building intangible capital (process redesign, skills, context) that no ledger counts. This is the mechanism under 'the wall': individual gains don't aggregate because the complementary org redesign hasn't happened, and the theory prescribes the escape rather than just naming the paradox.
- MOVE: Budget complementary process redesign (review flow, roles, team memory) alongside tool spend, not after it. Expect the measured-productivity dip and don't kill the program at the bottom of the J — instrument intangible-capital proxies (evals shipped, skills packaged, cycles run) as the leading indicators instead.
- SRC: [borrow:economics] Paul David, 'The Dynamo and the Computer' (1990); Brynjolfsson, Rock & Syverson, 'The Productivity J-Curve' (AEJ: Macro, 2021)
- BANK: the-wall

**seci-externalization** · high · partial · Outcome · half-life:durable
- MECH: Nonaka: organisational knowledge is created in a spiral — tacit-to-tacit (socialization), tacit-to-EXPLICIT (externalization), explicit-to-explicit (combination), explicit-to-tacit (internalization). Crossing the wall is the externalization step: personal agent-craft is tacit, and tacit knowledge cannot combine across a team until it is articulated into explicit artifacts (CLAUDE.md, skills, evals). The theory predicts exactly WHAT fails to cross: whatever was never externalized. The compound ladder (fix→memory→skill→system) is a SECI spiral, but without the tacit/explicit distinction the course can't diagnose why a competent individual's gains stay stuck.
- MOVE: Schedule externalization rituals — show-your-prompts reviews, pairing on agent sessions, protected skill-writing time. Judge a context file or skill by one bar: can a colleague re-internalize it without you in the room? Treat 'it works for me but I can't say why' as capability that has not crossed and will not.
- SRC: [borrow:org-theory] Nonaka & Takeuchi, 'The Knowledge-Creating Company' (1995); Polanyi, 'The Tacit Dimension' (1966)
- BANK: cross-the-wall

**baumol-judgment-premium** · medium · partial · Absorption · half-life:durable
- MECH: Baumol's cost disease: when one component of a production process gets radically cheaper and another (bound to human time) does not, the human-bound component's SHARE of total cost inexorably rises — string quartets cost more each decade because manufacturing got cheap, not because musicians got worse. As generation cost collapses, review, judgment, and alignment become the dominant cost line of software work. This is the economic engine behind 'Orient is the ceiling': not a slogan but a predictable cost-share shift.
- MOVE: Plan for review and judgment to dominate the cost structure and price senior attention as the scarce input. Aim automation investment at the rising-cost component — verification, eval infrastructure, diff-shrinking — rather than at more generation, which only worsens the disease.
- SRC: [borrow:economics] Baumol & Bowen, 'Performing Arts: The Economic Dilemma' (1966)
- BANK: ooda-act-collapsed

**residual-rights-of-the-prompt** · medium · partial · Context · half-life:durable
- MECH: Incomplete-contract theory (Grossman-Hart-Moore): no contract can specify every state of the world, so what matters is who holds RESIDUAL control rights — who decides in the states the contract is silent on. Every prompt and spec is an incomplete contract; the agent will hit unspecified states on every nontrivial task, and there it falls back to its defaults (training priors plus context files). CLAUDE.md is therefore not documentation — it is the allocation of residual control: it decides what the agent does where the prompt is silent.
- MOVE: Stop chasing the complete prompt — it doesn't exist. Shape defaults instead: put house rules for unspecified states into standing context, and reserve residual decision rights on irreversible actions to the human. When the agent surprises you in an unspecified state, fix the default (the standing context), not just that prompt.
- SRC: [borrow:economics] Grossman & Hart (1986); Hart & Moore (1990); Simon, 'A Formal Theory of the Employment Relationship' (1951)
- BANK: good-regulator

**rogers-five-levers** · medium · partial · Outcome · half-life:durable
- MECH: Rogers: adoption of an innovation spreads through a social system via peer channels, at a rate governed by five perceived attributes — relative advantage, compatibility, complexity, trialability, and observability. The access-trust gap is what a diffusion curve looks like mid-flight; the theory names the levers that move it. Observability (visible wins) and trialability (bounded low-risk first tasks) are the two levers a practitioner controls directly, and mandates are not on the list — adoption is a communication process, not a compliance one.
- MOVE: Engineer observability and trialability instead of mandating: demo wins in shared channels, package bounded starter tasks with small blast radius, and recruit named early adopters as the peer channel. Before a rollout, score it against the five attributes and fix the worst one first.
- SRC: [borrow:sociology] Rogers, 'Diffusion of Innovations' (1962; 5th ed. 2003)
- BANK: trust-observed-competence

**wrights-law-of-cycles** · medium · partial · Soil · half-life:durable
- MECH: Wright/Arrow: unit cost falls a roughly constant percentage with each DOUBLING of cumulative production — learning-by-doing is a function of cumulative volume, not calendar time or headcount. Applied to agentic capability: the team that runs more agent cycles compounds down its cost curve on a power law, so a modest difference in cycles-per-week becomes a multiplicative capability gap. This gives 'the org learning rate is the ceiling' a measurable form: the learning rate IS the slope of the curve, and cumulative cycle count is the x-axis you can actually move.
- MOVE: Instrument cycles-per-week as the leading metric of team learning rate. Prefer many small delegations over few large ones — cumulative reps drive the curve — and treat a week of low cycle count as a leading indicator of falling behind, months before output shows it.
- SRC: [borrow:economics] Wright, 'Factors Affecting the Cost of Airplanes' (1936); Arrow, 'The Economic Implications of Learning by Doing' (1962)
- BANK: action-under-uncertainty

### Lens: practitioner-canon

**verifiers-law** · high · partial · Intent · half-life:durable
- MECH: Some tasks are far cheaper to verify than to solve (sudoku, compiling code); others are the reverse (a fact-dense essay). Wei's law: how fast AI gets good at a task is proportional to its verifiability, because a cheap verifier is exactly the reward signal RL training and eval loops need. Software fell to agents early precisely because tests, compilers and typecheckers make verification near-free. The asymmetry — not raw difficulty — predicts where agent capability arrives next.
- MOVE: Select and shape delegations by verification cost, not task difficulty. Before delegating, ask 'what is my cheap verifier?' — and where none exists, spend effort building one (test, oracle, checklist) instead of prompting harder. Predict whether a new domain is agent-tractable by asking how cheap its verification can be made.
- SRC: https://www.jasonwei.net/blog/asymmetry-of-verification-and-verifiers-law [practitioner direct] (Jason Wei, July 2025). Bank has 'correctness independently verifiable' as one static leg of a go/no-go diagnostic; missing the dynamic law (verifiability predicts the RATE of capability arrival) and the constructive move (engineer the verifier to make a task tractable).
- BANK: convergence-triad

**lethal-trifecta** · high · missing · Context · half-life:durable
- MECH: An LLM cannot reliably distinguish instructions from data — anything the agent reads can steer it. Willison's frame: when one agent combines (1) access to private data, (2) exposure to untrusted content, and (3) an exfiltration channel, data theft is a structural property, not a bug to patch, because prompt injection needs only one success and guardrails are probabilistic. Security therefore lives in capability architecture — which leg you remove — not in model behavior.
- MOVE: Audit every agent deployment for the three legs and cut at least one: read-only sandboxes, no-network mode, allowlisted domains, human gate on outbound actions. Treat every web page, issue, email or dependency README the agent reads as potentially adversarial instructions. The course currently has NO adversarial-input theory — an agentic engineering course without prompt injection is teaching driving without brakes.
- SRC: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/ [practitioner direct] (Simon Willison, June 2025; now the field's shared security vocabulary — cited across security trade coverage through 2026)
- BANK: blast-radius-error-budget

**bitter-lesson-scaffolding-half-life** · high · missing · Soil · half-life:durable
- MECH: Sutton's 70-year observation: general methods riding compute beat human-engineered domain structure, eventually, every time. The agentic corollary the canon treats as law: elaborate scaffolding — hand-built workflow graphs, prompt chains encoding today's model weaknesses — is a depreciating asset, because the next model absorbs the workaround and your scaffold becomes drag. Anthropic's own guidance ('simplest pattern that works', unopinionated harness) is this lesson operationalized.
- MOVE: Before building agent infrastructure, ask: does this compensate for a current model weakness, or express a durable business constraint? Build the second, rent the first. Re-audit scaffolding every model generation and delete what the model now does natively. Invest preferentially in evals, context and verifiers (durable assets) over orchestration logic (rots).
- SRC: [borrow:AI research] Sutton, 'The Bitter Lesson' (2019), incompleteideas.net/IncIdeas/BitterLesson.html — framework, explicitly dated; operationalized in Anthropic 'Building Effective Agents' (Schluntz & Zhang, Dec 2024) https://www.anthropic.com/research/building-effective-agents [practitioner direct — vendor-authored canon text, cited as framework not evidence]
- BANK: coding-agents-meta-platform

**workflows-vs-agents** · high · partial · Intent · half-life:durable
- MECH: The canon's founding distinction (Anthropic BEA): workflows orchestrate LLMs through predefined code paths; agents dynamically direct their own process and tool use. Agency is a COST — latency, tokens, compounding error — that pays only when the path cannot be known in advance. The canonical escalation ladder: single call → workflow patterns (chaining, routing, parallelization, evaluator-optimizer) → open-loop agent, each step taken only when task variety demands it.
- MOVE: Make 'how much agency does this task need?' an explicit design decision before delegating. When the path is knowable, script it and use the model only at judgment points. Diagnose a flaky agent by first asking whether the task wanted a workflow. The bank explains HOW the loop works but never WHEN to use one — the single most-cited design decision in the practitioner corpus.
- SRC: https://www.anthropic.com/research/building-effective-agents [practitioner direct — vendor-authored canon text] (Schluntz & Zhang, Dec 2024; dated, framework not evidence)
- BANK: agent-loop-closed-loop-controller

**time-horizon-doubling** · high · partial · Intent · half-life:medium
- MECH: METR measures capability as the human-time length of tasks an agent completes at 50% success; that horizon has doubled roughly every 7 months since 2019, with post-2024 data suggesting acceleration (Jan 2026 update holds the trend on an expanded task suite). This converts 'can agents do X?' from opinion into a dated, re-measurable coordinate — and makes every static judgment about delegation scope perishable by construction. Reliability is a curve, not a property.
- MOVE: Timestamp every 'the agent can't do this' judgment and re-test on a calendar (quarterly): the six-months-ago failure is the cheapest capability discovery available. Plan team adoption scope on the curve, not on last cohort's experience. Turns the bank's static chain-length limit into a moving frontier with a re-benchmarking cadence.
- SRC: https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/ (Kwa et al., arXiv 2503.14499) + fresh update https://metr.org/blog/2026-1-29-time-horizon-1-1/ [academic/research] (Jan 2026)
- BANK: reliability-floor-085n

**context-continuity** · medium · partial · Work · half-life:medium
- MECH: Actions carry implicit decisions; when parallel subagents act on fragments of context, their implicit decisions conflict and the merge is incoherent (Cognition/Walden Yan: 'actions carry implicit decisions, and conflicting decisions carry bad results'). Anthropic's multi-agent research system found the same boundary from the winning side: fan-out paid off on read-heavy, parallelizable research — and they note coding parallelizes poorly. Fan-out has a sign condition: parallelize reads, serialize writes on one continuous context.
- MOVE: Before spawning subagents ask: do the branches make decisions that must cohere? If yes, use a single-threaded linear agent with the full trace. Reserve fan-out for gather-and-report work whose outputs a single writer integrates. The bank's requisite-variety piece endorses fan-out unconditionally — half the canon is about when that fails.
- SRC: https://cognition.ai/blog/dont-build-multi-agents [practitioner direct] (Walden Yan, June 2025); boundary condition from https://www.anthropic.com/engineering/built-multi-agent-research-system [practitioner direct — vendor-authored canon text] (June 2025)
- BANK: requisite-variety

**agent-computer-interface** · medium · missing · Context · half-life:medium
- MECH: Agent performance is a joint property of model AND interface. The SWE-agent result: the same model solved dramatically more real GitHub issues when the tool surface was redesigned for a model's needs — compact observations, guardrail feedback, few coherent tools. The ACI is to agents what the GUI was to humans; tools that dump noise, fail silently, or overlap degrade the policy, and error messages are steering signal at runtime.
- MOVE: Treat the tool layer as UX for the model: few orthogonal tools, descriptions written like onboarding docs for a new hire, error returns that say what to do next. When an agent fails, debug the interface before blaming the model. The bank theorizes context tokens thoroughly but says nothing about the action surface.
- SRC: Yang et al., 'SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering', https://arxiv.org/abs/2405.15793 [academic/research] (2024 — dated, framework); https://www.anthropic.com/engineering/writing-tools-for-agents [practitioner direct — vendor-authored canon text] (2025)
- BANK: 

**error-analysis-first** · medium · partial · Verification · half-life:durable
- MECH: The eval canon's methodological core (Husain): generic metrics and off-the-shelf evals fail because failure modes are domain-specific; you find them only by reading real transcripts and hand-taxonomizing failures ('look at your data'), then writing evals that target the observed clusters. The economic complement: the eval suite — not prompts, not scaffold — is the durable asset; it transfers intact across model swaps and is the only way to know an upgrade helped.
- MOVE: Before writing any eval, read 20–50 real traces and cluster the failures; write evals against the clusters, not against imagined failure modes. Budget eval-building as capital expenditure that outlives the current model; on every model swap, rerun the suite before trusting anything.
- SRC: https://hamel.dev/blog/posts/evals/ + https://hamel.dev/blog/posts/revenge/ [practitioner direct] (Hamel Husain, 2024–2025 — dated, methodology/framework). Bank has the primitive's three faces; missing the derivation methodology (error analysis) and the evals-as-durable-asset economics.
- BANK: eval-judge-verifier-gate

**jagged-frontier** · medium · missing · Intent · half-life:medium
- MECH: Model capability is not a smooth surface but a jagged one: superhuman on some tasks, broken on adjacent tasks of equal apparent difficulty. Dell'Acqua et al. measured consultants gaining ~40% quality inside the frontier and LOSING accuracy outside it; Karpathy names the same phenomenon 'jagged intelligence'. The danger is inference from a spike: one dazzling success licenses delegating a neighboring task that silently fails — while the human, calibrated by the success, stops checking.
- MOVE: Map the frontier empirically per task family before delegating: small probe tasks with known answers. Never generalize trust across a jag; re-map after model upgrades because the jags move. Complements the bank's failure-mode mechanics with the topology of WHERE they strike.
- SRC: Dell'Acqua et al., 'Navigating the Jagged Technological Frontier', HBS working paper 24-013 (Sept 2023 — dated, pre-agent-era study used as framework, not fresh evidence) [academic/research]; Karpathy on 'jagged intelligence' [practitioner direct, X]
- BANK: three-failure-modes

**autonomy-slider** · medium · partial · Verification · half-life:medium
- MECH: Karpathy's design frame: useful agent products are partial-autonomy products with a slider — from tab-complete to full send-off — tuned per task, and the binding loop is human verification speed. The highest-leverage engineering therefore goes into making the human's verify step fast (rendered diffs, visual surfaces, small verifiable chunks), not the agent's generate step. 'Keep the AI on a leash': autonomy is granted in increments earned by verification throughput.
- MOVE: Set the slider deliberately per recurring task and invest in the verification surface (diffs, before/after views, checkpoints) that lets you raise it. When reviews back up, shrink chunk size instead of trusting more. Upgrades the bank's static hybrid split into a tunable gradient with a named investment target.
- SRC: Karpathy, 'Software Is Changing (Again)' (YC AI Startup School, June 2025) https://www.youtube.com/watch?v=LCEmiRjPEtQ [practitioner direct] (dated 2025, framework)
- BANK: hybrid-beats-autonomous

**progressive-disclosure** · medium · partial · Context · half-life:medium
- MECH: Attention is a depleting budget: every preloaded token pays rent whether used or not, and recall degrades as the window fills. The canon's answer is just-in-time context: keep lightweight identifiers and indexes in the window and let the agent fetch bodies on demand, so effective knowledge scales far beyond the window without paying its cost up front. This is the design law behind skills-with-metadata, agentic search over RAG-preloading, and compaction.
- MOVE: Structure agent knowledge as index + on-demand bodies: skill name/description always loaded, body fetched when triggered. Audit always-loaded context files byte by byte and evict anything not paying rent every session. The bank teaches the cost mechanism (rot) but not the canonical retrieval shape that answers it.
- SRC: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents [practitioner direct — vendor-authored canon text] (2025); skills pattern: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills (Oct 2025)
- BANK: context-bandwidth-and-rot

### Lens: syllabus-comparison

**generation-verification-asymmetry** · high · partial · Verification (Soil-adjacent: it is why the whole cycle pays) · half-life:durable
- MECH: For many tasks, checking a candidate answer is far cheaper than producing one (verifying a proof vs finding it, reviewing a diff vs writing it). Wherever that asymmetry holds, generate-many-verify-cheap beats generate-once-carefully, which is the engine underneath test-time compute scaling, BVSR, evals, and agent delegation itself. Where the asymmetry does NOT hold — verifying is as hard as doing — delegation buys nothing, because the human pays full cost anyway at review time. This is the single deepest theory piece the bank uses everywhere but never names; Berkeley SP25 (verifiers, inference-time scaling) and Stanford CS329A build whole lecture arcs on it.
- MOVE: Before delegating a task, ask: can I verify the output at a fraction of the cost of producing it? If yes, delegate and invest in the verifier; if no, either build a cheaper verification surface (tests, types, invariants) first, or keep the task.
- SRC: Jason Wei, 'Asymmetry of verification and verifier's law' https://www.jasonwei.net/blog/asymmetry-of-verification-and-verifiers-law [practitioner direct]; taught via verifier/test-time-compute lectures at Berkeley SP25 https://rdi.berkeley.edu/adv-llm-agents/sp25 [academic/research] and Stanford CS329A https://cs329a.stanford.edu/ [academic/research]; [borrow:complexity theory] the P-vs-NP verify-cheaper-than-solve intuition
- BANK: convergence-triad (names 'independently verifiable' as a go/no-go criterion but not the cost asymmetry that makes delegation economic); eval-judge-verifier-gate and variation-selection-retention both presuppose it silently

**lethal-trifecta-capability-confinement** · high · missing · Work (autonomy-granting decision) · half-life:medium
- MECH: An agent that simultaneously (a) reads untrusted input, (b) has access to private data, and (c) can communicate externally is structurally exfiltratable, because prompt injection remains unsolved: instructions and data share one channel, so any content the agent reads can steer it. Security therefore cannot live in the model; it must live in capability confinement — never grant all three legs of the trifecta to one agent context. This is an adversary model, which is categorically different from the bank's accident model (blast-radius): blast-radius bounds what the agent can break by mistake, the trifecta bounds what an attacker can make it do on purpose. Every academic course in the survey closes with exactly this lecture (Dawn Song, three semesters running); a CTO comparing syllabi will notice ours has no security theory at all.
- MOVE: Before wiring a tool or MCP server into an agent, run the trifecta check: untrusted content + private data + outbound channel — if all three are present, remove one (sandbox the network, scope the credentials, or quarantine untrusted input into a separate context).
- SRC: Simon Willison, 'The lethal trifecta' https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/ [practitioner direct] (June 2025 — canonical framing, older than 6mo, cited as framework not fresh evidence); Berkeley F25 'Agentic AI Safety & Security' https://rdi.berkeley.edu/agentic-ai/f25 [academic/research]; [borrow:security] least-privilege principle, Saltzer & Schroeder 1975
- BANK: blast-radius-error-budget (accident model only — bounded/reversible downside — no adversary, no injection)

**error-analysis-before-evals** · high · partial · Verification -> Absorption seam · half-life:durable
- MECH: An agent system's real failure modes are empirical, not predictable from the armchair — you discover them only by reading traces of actual runs and coding failures into categories (open/axial coding), then fixing the biggest bucket. Evals written before error analysis measure imagined failures and miss the Pareto head; Ng's course names disciplined error analysis 'the single biggest predictor of success,' and the top practitioner eval course (Husain/Shankar) is built entirely on this workflow. The bank has the eval primitive and the reaction policy (dont-tamper) but not the discovery discipline that decides WHICH eval to build.
- MOVE: Before writing any eval or judge, read 20-50 real traces, tag each failure with a category, count the buckets, and build the first eval for the biggest bucket — never for the failure you guessed at design time.
- SRC: Maven 'AI Evals for Engineers & PMs' syllabus https://maven.com/parlance-labs/evals [practitioner direct]; DeepLearning.AI Agentic AI Module 4 (evals + error analysis) https://www.deeplearning.ai/courses/agentic-ai [practitioner direct — Ng's own curriculum]
- BANK: eval-judge-verifier-gate (has the primitive, not the trace-reading discipline that targets it); dont-tamper (when to react, not how to discover)

**autonomy-is-a-dial** · high · partial · Intent · half-life:durable
- MECH: 'Workflow vs agent' is a spectrum of who owns control flow: predefined code paths (chain, router, parallel fan-out) at one end, model-directed looping at the other. The architectural law taught across Anthropic, Ng ('degrees of autonomy'), and HF: choose the LEAST autonomous design that solves the task, and escalate autonomy only where the number of steps is genuinely unpredictable, because every notch of autonomy trades predictability, cost, and debuggability for flexibility. The bank's hybrid-beats-autonomous divides labor between human and agent but says nothing about this prior architectural choice — how much control flow to surrender to the model at all — which is the first design decision every other course teaches.
- MOVE: When designing any agentic system, start from a fixed workflow (chain/route/fan-out) and justify each step you hand to model-directed control by pointing at genuine step-count unpredictability; if you can write the flowchart, write the flowchart.
- SRC: Anthropic, 'Building Effective Agents' https://www.anthropic.com/research/building-effective-agents [practitioner analysis — vendor-authored engineering canon, treated as the field's reference]; DeepLearning.AI Agentic AI Module 1 'Degrees of autonomy' https://www.deeplearning.ai/courses/agentic-ai [practitioner direct]
- BANK: hybrid-beats-autonomous (human-vs-agent labor split, not the workflow-vs-agent control-flow spectrum); pattern-layer-ontology (own typology, different axis)

**calibrate-the-judge** · high · missing · Verification · half-life:durable
- MECH: An LLM-as-judge is itself a claim that must be verified: until you measure its agreement against human labels on a sample (true-positive/true-negative rates), a judge-gated pipeline has an unknown floor and 'passing evals' is unfalsifiable comfort. The trust chain must ground out in a human-labeled sample; judges then extend that ground truth cheaply, they never replace it. This is the load-bearing lesson of the leading practitioner eval course, and its absence is dangerous specifically for a course like ours that makes evals the center of Verification — an uncalibrated gate is worse than no gate because it manufactures false confidence.
- MOVE: Before letting any LLM judge gate anything, hand-label 30-100 outputs yourself, measure judge-human agreement per failure mode, and re-check agreement whenever the judge prompt or model changes; report gate results with the judge's measured error rate attached.
- SRC: Hamel Husain, 'Creating a LLM-as-a-Judge that drives business results' https://hamel.dev/blog/posts/llm-judge/ [practitioner direct]; Maven AI Evals syllabus ('building trustworthy LLM-as-judge') https://maven.com/parlance-labs/evals [practitioner direct]
- BANK: eval-judge-verifier-gate (names judge as one face of the primitive; no validity condition)

**plan-as-cheapest-gate** · medium · partial · Intent · half-life:durable
- MECH: A plan is a verification surface that exists before any expensive artifact does: reviewing intent costs minutes, reviewing a 2,000-line diff costs hours, and un-shipping a wrong system costs weeks — the classic cost-of-change curve, now applied to agent delegation. Planning also converts one long unreliable chain into short segments with a human gate between them, resetting compound error. The course PRACTICES plan-first everywhere but the bank carries no theory piece saying why the plan gate is the highest-leverage review of the whole cycle; Ng (task decomposition, planning patterns), Anthropic (Explore-Plan-Code-Commit), and Berkeley (planning/world-model lectures) all teach planning as first-class theory.
- MOVE: Put your scarcest resource — human review attention — at the plan gate, not the diff gate: reject or reshape at intent level, and treat any plan you couldn't verify ('how would I know step 3 worked?') as an unverifiable delegation to be re-scoped.
- SRC: [borrow:software engineering economics] Boehm, Software Engineering Economics (1981) — defect cost grows with discovery distance; Anthropic Claude Code 101 Explore-Plan-Code-Commit https://anthropic.skilljar.com/ [practitioner analysis — vendor-authored]; DeepLearning.AI Agentic AI Modules 1 & 5 https://www.deeplearning.ai/courses/agentic-ai [practitioner direct]
- BANK: reliability-floor-085n (chain-length math, no gate-placement economics); name-the-uncertainty (aims work, doesn't price the plan gate)

**multi-agent-coordination-cost** · medium · partial · Work · half-life:medium
- MECH: Fan-out is not free: parallel agents that WRITE to shared state diverge because each holds a stale, partial view of the others' decisions, while parallel agents that only READ compound cleanly — so the parallelization boundary runs between read-dominant tasks (research, review, exploration) and write-dominant ones (coherent codebase edits). Context-sharing is the actual cost center; the field's two flagship practitioner essays (Cognition arguing don't, Anthropic showing when yes) are two sides of exactly this line. The bank's requisite-variety motivates fan-out but carries no counterweight saying when fan-out destroys coherence.
- MOVE: Parallelize reads, serialize writes: fan out subagents for research/review/exploration, but route all state-mutating work through one context (or partition writes by file ownership) — and when a multi-agent design fails, look for hidden write-contention before blaming the agents.
- SRC: Cognition, 'Don't Build Multi-Agents' https://cognition.ai/blog/dont-build-multi-agents [practitioner analysis — vendor-authored, June 2025]; Anthropic, 'How we built our multi-agent research system' https://www.anthropic.com/engineering/built-multi-agent-research-system [practitioner analysis — vendor-authored, June 2025]; multi-agent lectures at Berkeley F25 (Brown, Vinyals) https://rdi.berkeley.edu/agentic-ai/f25 [academic/research]
- BANK: requisite-variety ('fan-out splits variety into channels' — no coordination-cost counterweight)

**evaluate-the-distribution** · medium · partial · Verification · half-life:durable
- MECH: An agent's behavior is a probability distribution, not a property: one successful run is a sample, and a demo is an anecdote with survivorship bias. Competence claims therefore require repeated trials — pass@k / pass^k, variance across runs — and comparing two prompts or models on single runs is statistically void. Berkeley F25 dedicates a lecture to this ('Predictable Noise in LLM': statistical approaches to evaluation) and HumanEval's pass@k has been the field's standard since 2021; the bank's dont-tamper governs how to REACT to stochastic misses but not how to MEASURE stochastic systems in the first place.
- MOVE: Never accept a single green run as evidence: run the same eval N times (even N=5), report a pass rate with spread, and require any 'improvement' to beat the baseline distribution, not one lucky sample.
- SRC: Berkeley F25 Week 8 'Predictable Noise in LLM' (Sida Wang, Meta) https://rdi.berkeley.edu/agentic-ai/f25 [academic/research]; [borrow:statistics] pass@k estimator, Chen et al. 2021 'Evaluating Large Language Models Trained on Code' https://arxiv.org/abs/2107.03374 [academic/research — historical, framework]
- BANK: dont-tamper (reaction policy for stochastic misses; missing the measurement policy); three-failure-modes (names the statistical machine, doesn't operationalize measurement)

**tool-ergonomics-aci** · medium · missing · Work · half-life:medium
- MECH: An agent's effective capability is bounded by the affordances of its tool interface, not just by model quality: the same model succeeds or fails on the same task depending on how tools are named, documented, and error-messaged — the SWE-agent result that motivated 'agent-computer interface' as a design discipline. The corollary is poka-yoke for agents: design tools so the wrong call is hard to express (typed arguments, absolute-path requirements, explicit examples, informative errors), because every ambiguity in the interface is consumed as error probability. Anthropic teaches this as a first-class appendix of its agent canon; Neubig teaches it at CMU/Berkeley.
- MOVE: When an agent fails the same way twice, debug the interface before the model: rewrite the tool description, add the edge-case example, make the error message state what to do instead — treat tool definitions as a prompt-engineering surface with its own review.
- SRC: Yang et al., 'SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering' https://arxiv.org/abs/2405.15793 [academic/research] (2024 — framework, dated); Anthropic, 'Writing effective tools for agents' https://www.anthropic.com/engineering/writing-tools-for-agents [practitioner analysis — vendor-authored]; [borrow:HCI] Norman, The Design of Everyday Things (affordances); [borrow:TPS] Shingo, poka-yoke
- BANK: context-bandwidth-and-rot (information channel; says nothing about action-interface affordances)

**goodhart-on-gates** · low · partial · Verification · half-life:durable
- MECH: When a measure becomes a target it ceases to be a good measure — and agents are relentless optimizers of whatever gate you install, so eval gates decay by being gamed: tests get special-cased, judges get keyword-stuffed, benchmarks get memorized (the reason SWE-bench had to be re-issued as 'Verified'). A static eval suite is therefore a depreciating asset; validity requires held-out checks, rotation, and occasional human re-grounding. The bank's principal-agent piece names reward-hacking as behavior but not the measurement-decay law that dooms every unrotated gate.
- MOVE: Treat every eval gate as perishable: keep a held-out set the agent never sees, periodically hand-audit a sample of 'passing' outputs for gaming patterns, and when a gate's pass rate jumps suspiciously, suspect the gate before celebrating the agent.
- SRC: [borrow:economics] Goodhart's law, Strathern formulation ('when a measure becomes a target...'); benchmark-validity thread in Berkeley F24 (Percy Liang lecture) https://rdi.berkeley.edu/llm-agents/f24 [academic/research] and F25 Week 4 (SWE-bench Verified) https://rdi.berkeley.edu/agentic-ai/f25 [academic/research]
- BANK: principal-agent (names reward-hacking; missing the measurement-decay mechanism and the rotation/hold-out countermove)


## Full bank-critique detail (per lens, as reported)

### control-systems

- **reliability-floor-085n**: The series-system math assumes step-failure independence (false: agent step errors are correlated through shared context and model priors — runs fail in bursts, so 0.85^n can be both optimistic and pessimistic) and assumes no repair (false: any loop with checkpoints + a verifier is a repairable system whose effective reliability is set by detection latency and rollback cost, not raw step accuracy). Also zombie-stat risk: 0.85 is a round illustrative constant carried as a '★ backbone' measured floor — cite methodology or label it illustrative. The durable claim is 'unverified chain length kills reliability'; the formula as banked overclaims.

- **good-regulator**: Analogy-theatre risk: Conant–Ashby is a narrow formal theorem (optimal regulators of a deterministic system must be homomorphic to the plant, under restrictive assumptions). 'The theorem proves CLAUDE.md works' is not a theorem application; the honest borrow is 'model-based control beats model-free under high variety' — inspiration, not proof. Keep the piece, downgrade the epistemic claim.

- **trust-observed-competence**: Banked as a monotone acquisition story (more observed competence → more trust), but the human-factors canon says observed competence is precisely what breeds complacency and miss-rate collapse at high-but-imperfect reliability. As written it trains overtrust — the piece needs its calibration/complacency half (Parasuraman–Riley) or it is a hazard, not a law. Already flagged [rsch:L1, thin] in theory-plan.md; the fix is to re-ground it in the 1997 literature, which is strong.

- **agent-loop-closed-loop-controller**: Necessary-but-not-sufficient as banked: presence of 'a feedback signal' is not control. Loop QUALITY decides convergence — observability of the states that matter, sensor noise (flaky tests), and delay. A flaky test suite is a closed loop that still diverges. Without the loop-quality clause the piece invites 'I added tests, therefore controlled' theatre.

- **requisite-variety**: 'Fan-out splits variety into channels' misuses Ashby: fan-out of similar agents adds copies, not regulatory variety, because their failures are correlated (Knight–Leveson common-mode result). Variety counts only across genuinely diverse channels — different models, tools, or verification mechanisms.

- **feedback-latency-dominates**: Grounded in DORA, which is self-report survey correlation (Level 2–3 with known methodology critiques). The stronger and more durable version of the same claim is control-theoretic: delay in the loop bounds achievable stability and autonomy — you cannot grant a longer leash than your detection latency supports. Re-ground the piece; the DORA citation is the weakest leg it could stand on.

- **hybrid-beats-autonomous**: Short half-life presented as a law: '(today)' concedes it is a snapshot, and convergence-triad already supersedes it with actual conditions. Either fold it into the triad or restate as the durable conditional (supervision required where state is unobservable, blast radius unbounded, or no independent verifier exists) — the snapshot will rot as models improve and take credibility with it.

- **eval-judge-verifier-gate**: Treats the gate as an oracle: gates have their own error rates (ROC: misses vs false alarms) and integrity failure modes (the agent edits the test), and the primitive conflates verification (against spec) with validation (against need) — an agent can pass every gate and still be wrong because the Intent was wrong. V&V theory keeps those separate for a reason; the one-primitive framing erases the distinction the Intent phase depends on.

### econ-org

- **comparative-advantage**: Analogy-theatre risk: Ricardo's mechanism requires two capacity-constrained producers trading under relative opportunity costs, but agent capacity is elastic at near-zero marginal cost — the only scarce party is the human. The move it generates ('delegate even where you're better') is right, but the justifying mechanism is the human's opportunity cost plus transaction costs of delegation (Coase/Williamson), not two-party comparative advantage. Taught as Ricardo, it can't answer the obvious student objection 'but the agent's output isn't good enough' — quality/verification cost is the crux, and Ricardo doesn't model it; TCE does.

- **reliability-floor-085n**: Zombie-stat-by-construction: 0.85 is a round, task- and model-dependent constant baked into the piece's NAME, so it will be quoted verbatim long after per-step reliability moved — the durable content is the compounding-failure-over-chain-length math plus the corollary that verification gates between steps RESET the chain (which the bank's own jidoka piece supplies but this piece doesn't reference). Rename around the mechanism (compound reliability decays geometrically in unverified chain length) and demote the constant to a dated illustration, or the canon ships a perishable number as a law.

- **amplification**: Confirmation-bias flag the theory-plan itself asks for: 'strong pull away, weak fail faster, median flat' is a distributional claim stated as durable at L3, while the best field-experimental evidence at the individual-task level points the OPPOSITE way — Brynjolfsson, Li & Raymond, 'Generative AI at Work' (NBER WP 31161, 2023; QJE 2025) found the least-experienced workers gained most. The claim may well hold at the team/system level (where complementary org capital binds), but the bank states it without the level-of-analysis distinction, and it flatters the house thesis (competence is the gate). Restate as level-specific or it's a house-thesis overreach.

- **absorption-bottleneck**: Two weaknesses: the '80%-digestible beats 95%-at-volume' round-number pair is a heuristic dressed as an L4 law ([SOURCE NEEDED] for those specific numbers), and the piece lacks the economic mechanism — Jevons rebound plus Baumol cost-share shift — that predicts the bottleneck TIGHTENS as models improve. Without the mechanism, students will reasonably expect better models to relieve review load; the theory predicts the opposite, and that prediction is the teachable part.

- **principal-agent**: The frame transfers only partially and the non-transferring half generates wrong moves: Williamsonian opportunism ('self-interest seeking with guile') has no referent in a model without interests — what actually transfers is information asymmetry + costly monitoring + objective mis-specification. Unflagged, students import incentive-design intuitions (carrots, sticks, reputational stakes) that generate nothing for agents. Also this single piece is asked to carry alignment, verification gates, AND reward hacking; Goodhart (gate decay) and incomplete contracts (residual defaults) each do a slice of that work with a cleaner, move-generating mechanism.

- **coding-agents-meta-platform**: House strategy positioned inside the theory canon: 'vendor platforms cannot extend themselves' is an empirical, short-half-life claim about current vendor roadmaps (vendors are actively shipping self-extension), not a durable law, and it is Level-0-adjacent — it is Bosser's own commercial thesis. It fails the canon's stated half-life axis and belongs in the strategy layer, not the theory spine; keeping it in the bank invites the exact theory-theatre the plan warns against.

- **the-wall**: A phenomenon labeled, not a theory: 'the wall is real' names the productivity paradox without the mechanism that both explains it and prescribes the escape — complementary investment and the J-curve (David 1990; Brynjolfsson et al. 2021). As banked, it is a negative law with no move attached beyond 'expect disappointment'; with the mechanism it becomes actionable (budget the complementary redesign, hold through the dip, instrument intangible capital).

### practitioner-canon

- **reliability-floor-085n**: The 0.85^n multiplication assumes independent per-step failure with no recovery — which contradicts the bank's OWN agent-loop-closed-loop-controller piece: a loop with a feedback signal retries and self-corrects, making step failures non-independent. The canon's empirical replacement is METR's measured horizon (50%-success task length doubling ~7 months). Also '0.85' reads as an empirical constant but is an illustrative number — zombie-stat shape; teach the FORM (errors compound absent verification gates) and drop the false-precision constant, or students will quote it as data.

- **hybrid-beats-autonomous**: Short half-life presented as durable law. The 'today' clause rots on the METR curve — the autonomous boundary has moved every 7 months for six years. The canon's durable form is Karpathy's autonomy slider indexed to verification cost, not a standing verdict about hybrid superiority. Teach the gradient and the re-test cadence, or the course ships with an expiry date it doesn't disclose.

- **good-regulator**: Analogy-theatre risk. Conant–Ashby is a theorem about regulators homomorphic to the plant under specific formal conditions; CLAUDE.md works for the mundane reason that task-relevant tokens condition attention (plain context-engineering mechanics). The theorem does not transfer as proof — keep it as an intuition pump, but don't let students believe cybernetics has certified their context files.

- **requisite-variety**: Endorses fan-out as variety-splitting without the canon's boundary condition: Anthropic's own multi-agent system won only on read-heavy parallelizable research (and they flag coding as poorly parallelizable), while Cognition's 'Don't Build Multi-Agents' argues dispersed context produces conflicting implicit decisions on write-heavy work. As banked, the piece teaches students to fan out exactly where the field says not to.

- **three-block-memory**: House typology not in the field's shared vocabulary, with short-to-medium half-life risk: the canon converged on hierarchical context files + progressive-disclosure skills + compaction, and harness-dependent block schemes rot as harnesses change. Fine as a teaching scaffold if labeled house-convention; a problem if presented as field theory alongside Boyd and Deming.

- **coding-agents-meta-platform**: 'Vendor platforms cannot extend themselves' is an impossibility claim doing marketing work — house-thesis confirmation risk. The defensible canon form is Bitter-Lesson economics: a general tool riding the model curve beats bespoke platform scaffolding. State it as an economic tendency with a mechanism, not a law about what competitors can't do.

- **access-trust-gap**: 'Gap >35pts' generalizes point-in-time survey numbers into a standing law ('always rare', 'always widespread') — zombie-stat formation in progress. The qualitative claim (trust lags access) is well supported; the quantified floor needs a named survey, date, and N attached at every use, or it will circulate exactly like '95% fail'.

### syllabus-comparison

- **reliability-floor-085n**: The 0.85 constant is illustrative, not measured — zombie-stat pattern (round number, no methodology, no sample). Worse, the independence assumption is false for closed-loop agents: self-correction on observed failure breaks i.i.d. compounding, which is the entire point of the bank's own agent-loop-closed-loop-controller piece — the two pieces contradict each other. Keep the shape (error compounds with chain length, mitigated by feedback gates), kill the number, or it rots into next year's '95% fail'.

- **good-regulator**: Analogy-theatre risk: Conant-Ashby is a formal theorem about optimal regulators under narrow assumptions (every good regulator IS a model, an isomorphism claim), and 'CLAUDE.md works because good regulator' borrows the theorem's prestige without its mechanism. The actual mechanism — relevance conditioning of a statistical model — is already carried by context-bandwidth-and-rot. No surveyed course reaches for cybernetics here; fine as poetry, weak as load-bearing theory.

- **hybrid-beats-autonomous**: A time-indexed empirical claim ('today') banked as durable theory. Berkeley F25's whole verifiable-agents arc plus expanding verified-autonomy domains (theorem proving, benchmarked coding) erode it monotonically. It needs its boundary condition made explicit — 'hybrid wins where verification is expensive; autonomous already wins where verification is cheap' — which would also connect it to the missing generation-verification-asymmetry piece. As stated, short half-life presented as durable.

- **access-trust-gap**: 'Always >35pts' is a survey artifact promoted to a law — suspiciously specific constant, unstated methodology, classic zombie-stat trajectory. The mechanism (trust lags access because trust requires accumulated observed instances, which the bank's trust-observed-competence already carries) is sound; the universal quantifier plus the number is the liability. [UNVERIFIED STAT] until the original survey and sample are pinned.

- **amplification**: House-thesis-shaped symmetry ('strong pull away, weak fail faster, median flat') that is neater than any evidence base — three empirical claims wearing one slogan. Under a syllabus-comparison lens no other course asserts this as law; it reads as positioning. Either pin each leg to a source with methodology or demote to hypothesis.

- **coding-agents-meta-platform**: A falsifiable strategic bet presented as theory: 'vendor platforms cannot extend themselves' is contested by the vendors themselves (agent-buildable workflow platforms, self-extending toolchains are exactly what several are shipping). No surveyed syllabus would teach this as a law. Valuable as the house worldview — label it as thesis, not theory, and give it a falsification condition.

- **eval-judge-verifier-gate**: Names the primitive but omits the validity condition that the leading practitioner eval curriculum leads with: a judge is only evidence after its agreement with human labels is measured. As banked, it licenses uncalibrated LLM judges as gates — a false floor that manufactures confidence. One sentence ('a judge is itself a claim requiring verification against human labels') would close the hole.

