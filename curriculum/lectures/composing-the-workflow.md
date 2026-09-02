# Composing the workflow

## You drew a control loop

{{figure:student-closed-loop}}

## Eval

- An **eval** is a measurement. You hold agent-produced work against a fixed yardstick, across enough runs to get a number: a pass rate, a score, how often one drift shape shows up. One run tells you what happened. The measurement tells you what the system does.
- The yardstick stays put and the system learns against it. Add a rule, cut a rule, sharpen a check, and the number moves or it does not. That is how you know a change to the system was a change for the better.
- The checks you built are the instruments inside it. *Verifier* when deterministic: tests, lint, a hook that returns true or false. *Judge* when an LLM reads the work. *Gate* when the same check sits in CI and blocks the merge.

## The second loop

{{figure:double-loop-m6}}

## Dino's skill stack

{{figure:dino-skill-stack}}

## Pocock's skill system

{{figure:pocock-skill-system}}

## The checking loop, drawn solid
<!--tier:2-->

{{figure:map-engine-filled}}

## Loop instead of you starting
<!--tier:3-->

- A kit skill can run on a schedule. Claude Code ships three ways to do it: local routines (from the Routines sidebar) for standing work on your laptop, `/loop` for in-session repetition, `/schedule` for cloud-backed remote Routines. The pattern is the same across all three: a skill from your kit is the thing the scheduled agent invokes.
- Three places this fits naturally. A standing verifier run: a judge reads the most recent long-running send-off and has a summary waiting when you open the laptop. A scheduled codebase sweep: a gap-finder reads the repo for the drift shape you saw at M5 and opens an issue when it finds one. Rule-drift monitoring: a judge reads the root rules file against the recent commit log and names where the rules and the code disagree.
- The skill defines the check. The runtime supplies the cadence or stopping condition.

## A skill's footprint is where its job lands
<!--tier:3-->

{{figure:skill-sea-passage}}

- A **skill** is a named move you reach for. Single purpose, reusable, invoked by name.
- One move takes a single fix at a turning point. Another carries a whole leg. A third runs at the pier, before the first leg. You never size a skill in advance. The job sizes it.

## From skills to a workflow
<!--tier:3-->

- The field wires kits more ways than one; no way has won. Pocock ships a public kit with no orchestrator: you call each skill by hand. Klaassen ships one slash command per stage, and the last one writes the lesson to disk for the next agent. Some workflows have a pilot; many do not.
- A workflow is not only steps in order. At a seam, a check or stop condition decides whether the next step may begin.
- Your job moves from reading every intermediate output to designing the checks, routes, and exceptions that deserve your judgment.

<!-- maintainer -->

**Control-loop slide is header + figure only (Antti 2026-09-02, "not sure if bullets really needed if the pic is good").** The four bullets went; the drawing carries every term they had (spec, gap, you·Claude·rules, session, change, drift, tests·diff·eval, the two brackets, the autopilot caption), and the measurement block's sub-label gained *the sensor:* so the one idea only the bullets held is on the figure. The old bullet 4 (accumulated surround; same model, two different agents) is the second-loop slide's content and belongs there, without module numbers. Do not restore the bullets.

**Two example figures (2026-09-02, Antti: "just pic, no bullets").** `figures/dino-skill-stack.md` redraws the supplementary's `skill-stacking/01-meta-model.svg` (mermaid) in the house palette: five lifecycle columns, the three routed gates in rust, `/ship` as the one orchestrator with its sequenced chain, OPS looping back to BUILD. Source of truth for the skill list is `supplementary/skill-stacking.md`; regenerate the figure when that catalog changes. `figures/pocock-skill-system.md` is drawn from `mattpocock/skills` @ `6654f6b` (2026-08-24), reading `skills/engineering/ask-matt/SKILL.md` for the flow: one main flow (grill-with-docs → to-spec → to-tickets → implement, which drives tdd and code-review inside it), a prototype detour bridged by handoff, on-ramps (improve-codebase-architecture, wayfinder, triage, diagnosing-bugs), two vocabulary skills underneath, ask-matt as router. Skill count deliberately not stated. `ask-matt` routes; nothing in the repo runs the flow, so the *pocock-by-hand* claim on the T3 slide still holds. Both figures render at 1200×560 with all labels ≥ 9px; checked by headless-Chrome screenshot.

**Lean pass (2026-08-25):** cut "Same passage, same drift, same fixes and guardrails." from slide-1 bullet 3 — the figure shows it. Do not restore.

**Emphasis budget (Antti-directed "go very lightly on the bold"):** bold = handles only — slide 1: **skill** sub-span (the **footprint** span left with its sentence, 2026-09-02); slide 2: no bold left (the wiring-taxonomy bullet was cut 2026-09-02, Antti — the Dino / Pocock example slides will carry those mechanisms by name); *pilot* stays plain as the chart-to-field bridge; all other bullets plain (the chart caption already carries "the value is the order, not the count") — per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Lede, SVG, and the two supplementary links carry no bold.

**Quality:** compendium-audited 2026-08-29 (writing@4a722813 story@0e4f7c9e technical@8cc00874 behavior@1c765f2 pedagogy@1abb84c6 strategy@1c765f2 slides@0e4f7c9e)
- judges @4a722813: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS

**Framing provenance (5-framing / 3-judge panel, 2026-07-04).** The skills-on-the-passage concept was stress-tested. Winner: *footprint follows the job* — a skill's footprint is wherever its job lands (one turning point, one leg, or the whole trip), never sized in advance. This dissolves the granularity question into one rule instead of a fixed per-feature mapping (the rejected `fix = verifier` trap). Retired: *phases-as-legs* as the chart spine (Antti's steer) — `leg = phase = skill` re-commits the same fixed-mapping error one level up, and a linear phase chain cannot seat the loop (re-invocation has to arc back across the chart). The phase vocabulary survives in slide-2 bullet 1 as prose, teaching scope is NOT phase-bound (a move spans what its job spans), rather than as a chart spine. Load-bearing correction carried in BOTH chart and body: not every workflow has an orchestrator. The bold oxblood hand-off arrow + the Pocock bullet (a whole public kit with no orchestrator at all) + the pilot bullet ("many do not") inoculate against the orchestrator-always error the bracket/leaf framings quietly teach.

**Figure.** Derived from `protos/m6-skill-passage-01-footprint.html` (Antti chose proto 01 of a 3-proto set: 01 footprint / 02 phase-backdrop / 03 phase-spine; 02 + 03 stay in `protos/` as alternates, PNGs in session scratchpad). Base geometry is the M5 passage chart from `what-packaging-is.md`, byte-unchanged (same cream/teal/oxblood palette, same drift cones, fixes, guardrails, lighthouse, ghost, spot); only the label layer swapped to the kit (the mapped next move at the pier, test-strategy across a leg, verifier at the orange-ring fix) plus the under-drawn pilot and the weighted hand-off. SVG inlined byte-clean: comments and interior blank lines stripped (marked terminates the raw-HTML block on ANY interior blank line, same failure mode as `the-whole-map.md` / `the-map-filled-in.md`). Single id `sk-reefhatch`, `sk-` prefixed against collision if the theory handbook renders multiple charts on one page.

**Vocabulary bridge (earned once).** move = skill (slide-1 bullet 1; slide 2 then speaks *skill* throughout — the noun *move* stays on slide 1 where the chart defines it, avoiding the moves-verb/move-noun collision); pilot = orchestrator (slide-2 pilot bullet); leaf = a skill that does one job and calls nothing (same bullet). The chart speaks nautical (pilot); the supplementaries speak Dino (orchestrator, leaf); the slide bridges them so chart, slide, and reads are one system. Do not re-earn in the supplementaries. Session/task/run vocabulary per `check_student_facing.md §21b`.

**§3 disposition (no cross-module sequencing in body).** The kit is named by what it is ("test-strategy skill, verifier, and a freshly drawn map of the moves worth packaging next") — backward recognition, not forward sequencing. No `M[0-9]` tags in body. The chart callback ("the passage you already sailed") is spine-anchoring on the shared M5 image, not a cross-module ref.

**Length discipline.** The lecture is concrete-teacher-plus-pointer, not survey-pointer. Ceiling: lede + the figure slide + one mechanics slide + the two reads. The variety sentences on slide 2 (Pocock by hand, Klaassen through files, one documented kit) are the ceiling for in-body field coverage; do NOT re-import the full lineages walk — it lives in `workflow-composition-lineages.md`. New composition discoveries land in the supplementary; the lecture body changes only if a mechanism is renamed at the field level, a wiring shape gains or loses currency, or the student's kit shape changes.

**Headers (squint + truth, `check_lectures §4`).** *A skill's footprint is where its job lands* (slide 1, thesis-claim, matches the chart's own bottom caption); *From skills to a workflow* (slide 2, names the composition concept the slide teaches in its variety). No orphan-mystery, no empty container.

**Lecture meta:** *The M6 loop lecture (2026-09-02 shape): control loop (T1) → Eval (T1) → cadence (T3) → footprint (T3) → skills-to-workflow (T3) → Dino's skill stack and Pocock's skill system (bodies owed by Antti) → the filled-in map figure (T2). Title awaits a card now that the file opens on the loop and ends on the map.*

**Time:** 11 min at presentation pace.

**Delivery mode:** In-room, chart projected. Barebones drops the three T3 slides and keeps the control loop.

**`## Eval` moved in from `the-loop-has-a-name.md` (Antti 2026-09-02), that file removed.** Sits right after the control-loop slide; the naming beat lands inside the loop lecture. Body verbatim; its claims, the eval law line, the vocabulary stance rows and the 2026-08-02 usage sweep (Flagged) travelled here. The beat is three-names-one-thing: the word lands because the thing is in hand. Keep the *eval* bold as the slide's one handle. The definition itself is owed a measurement-shaped rewrite (`pre-cohort-todos.md`).

**The latency axis stays off the naming slide (2026-08-23, Antti, `0a56ebd9`):** a bullet placing checks by latency (seconds inline, minutes in the background, expensive judgement at a named gate) was tried on the placement slide (itself cut 2026-09-02) and reverted — students realise the latency axis through their own practice, and a closing lecture is recognition, not instruction. Do not re-add without a new call; the deep treatment stays in `supplementary/how-the-best-do-ci-cd.md` § *Eval latency is part of the loop*.

**`## The checking loop, drawn solid` moved in from `the-map-filled-in.md` (Antti 2026-09-02), that file removed.** The re-shown engine map with the solid checking loop, figure only, T2, after the Dino / Pocock example slides. The control-loop slide's provenance notes came along with it below.

**SVG:** derived from `the-whole-map.md`'s engine canvas — same drawing, four edits: checking-loop ellipse solidified (dasharray dropped, stroke 1.8→2.6, opacity 0.45→0.9), tag un-ghosted (`◌` dropped, grey→teal), sub reworded `by hand for now` → `by your evals now` (fill now inherits the body ink), aria-label updated. ALL ids re-prefixed `wm-` → `mf-` (the theory handbook renders both copies on one page; duplicate ids break defs and markers). The figure block is blank-line-free ON PURPOSE — a blank line inside terminates the raw-HTML block in marked and spills markup (verified failure mode in this repo). The parent M2 SVG is itself an unreviewed draft with open eyeball questions (incl. whether the checking ghost survives at all); if the M2 map changes, re-derive this copy.

**Soil line (2026-08-15):** the strip rides this figure visually (bottom-center italic, paints last); its one spoken home is `agents-that-build-agents.md` § *You make agentic happen* (Antti-directed — the orders belong at the launch beat, not the consolidation). Do not add a spoken bullet here: the first slide stays three bullets, and *Nothing else moved* is literally true of the strip, which is on all four `map-engine*` figures.

**Control-loop naming beat (2026-07-03, Antti + external read):** new slide *The shape you drew* inserted between *The ghost, drawn solid* and *Verification, named*. Names the whole map as a feedback control loop (near half feedforward · far half feedback · verification as the sensor layer) — recognition-after-living, jargon-free BY DESIGN. NO setpoint/plant/gain; "feedback control" + "control loop" are the accessible names, earned in-breath by the mechanism sentence that precedes each. Zero new laws coined: the single-loop closed-loop-controller law (`theory-plan.md` §1, `[borrow:control theory]`) already lived in-room via `the-agent-loop` at M4 — this widens that law to the whole map at consolidation, and re-explains why the map has a near/far seam (feedforward/feedback). Antti's dosage call (Option B): ONE clean naming reaches students; the full canonical mapping (reference/controller/plant/output/measurement/error/disturbance/integral-memory → AE101) stays design-side in `theory-plan.md` § The Field Map. Slide count now 7 (was 6) — interacts with EYEBALL Q2 (slide budget); added knowingly. Source: canonical closed-loop negative-feedback diagram (Wikimedia Commons *Simple feedback control loop*; *Closed-loop controller*, Wikipedia) — textbook/foundational, cited design-side as origin not current evidence; the student line ("robotics and autopilots have run on for decades") is common knowledge, no freshness stamp owed.

**Diagram woven in (2026-07-04):** Antti chose proto A (`protos/control-loop-01-closed-loop.html` — the canonical closed-loop block diagram, relabeled in student words) from a 3-proto set (A=canonical form · B=open-vs-closed contrast · C=map-as-loop; B+C stay in `protos/` as alternates, PNG renders in session scratchpad). Inlined as this slide's `<figure class="diagram">`, SVG byte-identical to the proto minus blank/comment lines (marked's raw-HTML block terminates on any interior blank line — same rule as the engine SVG above). Bullet 1 de-duplicated: dropped "the shape robotics and autopilots have run on for decades" (now carried once, in the diagram caption). No SVG ids, so no collision with the engine map's mf- ids on the theory-handbook page. Slide is figure + 4 bullets (the fourth is the accumulation claim — see the accept-note below).

**Accumulation bullet (2026-08-09, Antti-directed; buried-gold item):** fourth bullet on *You drew a control loop* states the join the gold list named as un-homed: the harness enables continuation; what a session gets right unattended is set by the accumulated surround; M4/M5 is the lived proof (same model, same harness, only the surround differed — by the M4 four-part definition, the context differed, so "two different agents" is literal). Guards: (a) NOT a new law — no coined name, no bold; the dose verdict's "zero new laws" stands. (b) Claim altitude only — the four artifact classes stay bare; their mechanisms live on the Verification and Outcome slides. Do not expand the list. (c) Bearer split is the design: this is the system-side twin of the closing slide's frontier bullet (engineer-side, reach-and-gates). The twins lean on each other by deck order; neither restates the other. (d) Deliberate silences, all load-bearing: `the-agent-loop.md` untouched (its "Out of the box, nothing new takes over" scope is this bullet's setup — the payoff lands here, not there); `story-of-module-6.md` taste line untouched (no conflict: taste governs in-session quality, accumulation governs unattended capacity across sessions — encoding is how taste attends sessions the author is not in); `agents-that-build-agents.md` untouched (its "not model features" slide, moved there from the removed `the-loop-has-a-name.md` argues the engineer-side stance, wrong bearer for this claim); the progression supplement untouched (engineer-subject by design); M6 module Key Concepts untouched (they enact the inventory; a second in-module statement would be repetition, not dosage). Design-side name: *Accumulated, not enabled* (`theory-plan.md` §3); the name stays off slides. Trainer line: *asking the product for more autonomy adds nothing the surround has not already earned.*

**Cadence slide (from `the-loop-has-a-name.md`, Antti 2026-09-02, header his):** *Loop instead of you starting* opens the T3 tail after the filled map (moved 2026-09-02 evening; low value sits at the end): a check on cadence is the loop closing with nobody pressing start. Body verbatim from its old home; T3.

**Watch-for (delivery):**
- Scheduled-agents stays one slide, not a mini-lecture. Three places it fits, one reference-page pointer, move on. If the slide grows past 90 seconds in rehearsal, cut.

**`## Composition is a live argument, so you read` → two empty slides, *Dino's skill stack* and *Pocock's skill system* (Antti 2026-09-02: *"I will give concrete examples rather than try bulletpoint this into clarity"*).** Bodies owed by Antti. The two reading links the old slide carried — [Dino's skill stacking system](trainings/agentic-engineering-101/supplementary/skill-stacking.md) and [Workflow composition lineages](trainings/agentic-engineering-101/supplementary/workflow-composition-lineages.md) — have no student-facing home until those bodies land; `workflow-composition-lineages.md`'s delivery note still says it is linked from this lecture.

<!-- backing -->

Claims
- `eval-is-a-measurement` · vision · "An **eval** is a measurement." ← none-owed
- `yardstick-fixed-system-learns` · vision · "The yardstick stays put and the system learns against it." ← none-owed
- `checks-are-instruments-inside-the-eval` · vision · "The checks you built are the instruments inside it." ← none-owed
- `judge-verifier-gate-three-names` · vision · "*Verifier* when deterministic: tests, lint, a hook that returns true or false. *Judge* when an LLM reads the work." ← none-owed
- `three-scheduling-primitives` · detail · "Claude Code ships three ways to do it: local routines (from the Routines sidebar) for standing work on your laptop, `/loop` for in-session repetition, `/schedule` for cloud-backed remote Routines." ← cc-scheduling-primitives
- `three-places-cadence-fits` · vision · "A standing verifier run … A scheduled codebase sweep … Rule-drift monitoring" ← none-owed
- `skill-defines-check-runtime-supplies-cadence` · vision · "The skill defines the check. The runtime supplies the cadence or stopping condition." ← none-owed
- `skill-is-a-named-move` · vision · "A **skill** is a named move you reach for. Single purpose, reusable, invoked by name." ← none-owed
- `never-size-a-skill-in-advance` · vision · "You never size a skill in advance. The job sizes it." ← none-owed
- `field-wires-more-ways-than-one` · detail · "The field wires kits more ways than one; no way has won." ← lineages-supp
- `pocock-by-hand` · detail · "Pocock ships a public kit with no orchestrator: you call each skill by hand." ← lineages-supp, pocock-skills-repo
- `klaassen-one-command-per-stage` · detail · "Klaassen ships one slash command per stage, and the last one writes the lesson to disk for the next agent." ← lineages-supp
- `many-kits-keep-zero-pilots` · detail · "Some workflows have a pilot; many do not." ← skill-stacking-supp, lineages-supp
- `seam-check-decides-whether-next-step-begins` · vision · "At a seam, a check or stop condition decides whether the next step may begin." ← none-owed
- `workflow-designer-owns-checks-routes-exceptions` · vision · "Your job moves from reading every intermediate output to designing the checks, routes, and exceptions that deserve your judgment." ← none-owed

Sources
- cc-scheduling-primitives `[checked:2026-04-24 result:OK due:cohort]` https://code.claude.com/docs/en/ — [capability] The body names three scheduling primitives and distinguishes local Routines from `/schedule`'s cloud-backed remote Routines. The check ran 2026-04-24 against the current documentation and is recorded here: `/schedule` is Routines, remote and cloud-backed; Desktop local tasks are a separate primitive. **A capability stamp records its own check.** Pointing at a paragraph in another file makes the stamp only as durable as that file's next edit, which is how this one nearly lost its evidence. fallback: teach the pattern (a kit skill is what the scheduled agent invokes) and name only the primitives a re-test confirms.
- skill-stacking-supp `[checked:2026-07-05 result:OK due:none]` kb:none — [delegated stamp] `curriculum/trainings/agentic-engineering-101/supplementary/skill-stacking.md` carries the primary stamps for the four composition mechanisms and the `/ship`-as-pilot worked example (Dino's in-repo stack). A worked example of a shipped kit does not expire. **`/ship` is Dino's own skill, NOT a Claude Code built-in** — the chart keeps the orchestrator generic ("the pilot") and the named example stays in the supplementary, which is the whole reason this body carries no product name. fallback: re-verify in that doc if its own stamps age out.
- pocock-skills-repo `[checked:2026-09-02 result:OK due:cohort]` https://github.com/mattpocock/skills — [practitioner direct, primary repo] @ `6654f6b` (2026-08-24). Backs the Pocock figure's flow and skill names; `ask-matt/SKILL.md` is the page that describes the main flow and on-ramps. Re-check before each cohort: the kit churns monthly. fallback: redraw from the README's Reference section.
- lineages-supp `[checked:2026-08-01 result:CAVEAT due:none]` kb:none — [delegated stamp] `curriculum/trainings/agentic-engineering-101/supplementary/workflow-composition-lineages.md` carries the field-survey lineages and their per-source stamps. **`due:none` is the delegated variant** (`backing-format.md` § Delegated): the delegation does not expire, the delegate's own stamps do, and `source-freshness.sh` already walks that file. `checked:` still means what it says here: the date this pointer was last confirmed to aim at the right file. fallback: this lecture asserts no dated specific of its own; if the supplementary's lineages change, only the "live argument" claim here is affected, and that claim gets *stronger* when the field moves.

Frameworks
- eval = judge / verifier / gate · [borrow:none] · law:eval-judge-verifier-gate · ← none — the three-way split is banked as a law and taught as a definition; the words are in real use, the taxonomy is ours
- Footprint follows the job · [borrow:none] · law:none · ← none — house framing, chosen over phases-as-legs in a 5-framing / 3-judge panel (2026-07-04); the rejected alternative re-committed the fixed-mapping error one level up
- Orchestrator / leaf · [borrow:distributed systems] · law:none · ← skill-stacking-supp — Dino's vocabulary, bridged once to the chart's nautical *pilot*
- The value cycle · [borrow:none] · law:the-value-cycle · ← none — the phase chain (context, plan, build, verify, ship) is the cycle in run-local form

Stance `[stance:2026-08-01 level:L1]`
- holds: that composition comes in recorded variety — called by hand (Pocock), chained through files (Klaassen), authored wiring in the one fully documented kit — and that the four wirings are scoped in-body to that kit, not taught as a field taxonomy. Every named specific delegates to the two supplementaries; the one field-level assertion is that no way has won, which the lineages' own stance supports at L2.
- contested: whether the four wirings are the complete set. Nobody has enumerated composition mechanisms across kits (the delegate's stance says so in as many words), which is exactly why the body scopes the count to one kit and teaches the variety first.
- decided: **delegated stamps take `due:none`, 2026-08-02.** This file's `due:2026-11-25` pointed at a delegate checked 2026-05-25 that had since been corrected and re-stamped, so the pointer aged against a fact it did not own. The pointer is legitimate; a computed date on it is a second copy of the delegate's freshness that nothing in the toolchain compares. Rule now in `backing-format.md` § Delegated.
- decided: **the scheduling bullet carries its own check, not a pointer at one.** The capability check backing it was recorded in `story-of-module-6.md`, one module over, and this file's stamp merely cited it — invisible from the file that depended on it, and dependent on prose the other lecture was free to cut. The check lives here now, stamped `result:OK` from its own 2026-04-24 date. `ATTESTED` was never the right label: that vocabulary is for a maintainer's first-hand witness, not a documentation read.
- contested (eval naming): the vocabulary — checked 2026-08-02 (see Flagged), and the answer splits: *judge* is genuinely shared across the LLM-eval lineage (Husain, Shankar, Yan, Willison, Braintrust, LangSmith); *verifier* and *gate* are ours — the field says `code-based eval` / `assertion` / `grader` / `scorer` for the one and ships the behaviour without a shared word for the other. The body's define-rather-than-survey framing is therefore right, and the live question is only whether slide 1 earns one bridging clause naming the field's words (Flagged, first row).
- decided: **judge / verifier / gate is stated as a definition, not a survey, 2026-08-01.** The bullet read *"Practitioners say judge…"*, attributing a three-way taxonomy to a field nobody had counted. The names are in real use; the split by check-type is ours. Do not restore the survey verb — the standing usage question lives in the OODA below and is worth answering, but the body no longer depends on the answer.
- would-move-it (eval naming): a usage sweep showing practitioners do not split the three words this way, which would turn slide 1 from recognition into invention and require the same "these are our names" candour M5's closer carries.
- would-move-it: a second fully documented kit (takes the wirings claim from L1 toward L2), a mechanism renamed at field level, or a fifth wiring gaining currency — each edits slide 2. Convergence on one composition shape would break the "live argument" framing and turn the variety bullet into a recommendation.

OODA
- question: have the four wiring mechanisms held their names, and has a fifth appeared? And do practitioners actually use *judge*, *verifier* and *gate* with the Eval slide's three distinctions?
- roster: Dino (skill-stacking), Kieran Klaassen, Simon Willison, Geoffrey Huntley, Hamel Husain, Shreya Shankar, Eugene Yan, the Anthropic eval cookbook, Braintrust and LangSmith docs for vendor usage, the Amp Chronicle, Anthropic's skills documentation
- last-run: 2026-08-01

Flagged
- `[found:2026-08-02]` The usage question is answered, and it answers in three different registers rather than one. *Judge* is genuinely shared: Husain, Shankar, Yan, Willison, Braintrust and LangSmith all use it for an LLM reading the work, unchanged across 2024–2026. *Verifier* is attested nowhere in that sense — the field's words for the deterministic half are `code-based eval` (Husain and Shankar's joint course), `assertion` (Shankar's EvalGen paper), `grader` (Yan 2026-06, and the Anthropic cookbook throughout), `scorer` (Braintrust) and `code evaluator` (LangSmith). *Gate* is weakest: Braintrust alone uses the word for the CI-blocks-merge behaviour, LangSmith ships the identical behaviour as "promote to production if all pass", and Yan's *guardrail* names a runtime production filter rather than a merge blocker, so it is a near-miss on the word and not a match on the concept. **This now joins the M5 finding from the other direction.** `what-packaging-is.md`'s `ronacher-minijinja` stamp records a 14-post sweep of Ronacher's full archive returning zero uses of *verifier*; this cycle sweeps a different population — the LLM-eval lineage rather than the agentic-coding one — and returns the same zero. Two independent sweeps, two disjoint rosters, one answer, which is a firmer footing for the body's framing than either sweep alone. → the body already says so — it defines rather than surveys — but a student who reads Husain next meets `code-based eval` and has no way to know it is our `verifier`. Does slide 1 earn one bridging clause naming the field's words, or does that clutter the beat the naming move depends on?
- `[found:2026-08-02]` No source anywhere assembles the three into a taxonomy. Where three-way splits do exist — Anthropic's code-based / model-based / human graders, LangSmith's human / code rules / LLM-as-judge / pairwise — the axis is *who performs the check*, never *where the check sits*. The CI-placement axis is structurally absent from every taxonomy found. → no body change owed; this is the evidence the 2026-08-01 decision was right, and it retires the risk M5's naming audit raised. Worth recording that the audit ran and came back clean.
- `[found:2026-08-02 resolved]` `Stance.contested` matches the sweep: *judge* holds, *verifier* / *gate* are ours, and the row carries the field's own vocabulary for the deterministic half.

<!-- /backing -->
