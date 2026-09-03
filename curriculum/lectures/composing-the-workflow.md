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
- Three places this fits naturally. A standing verifier run: a judge reads the most recent long-running send-off and has a summary waiting when you open the laptop. A scheduled codebase sweep: a gap-finder reads the repo for the drift shape you diagnosed in your two sessions and opens an issue when it finds one. Rule-drift monitoring: a judge reads the root rules file against the recent commit log and names where the rules and the code disagree.
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

**Control-loop slide is header + figure only (Antti 2026-09-02, "not sure if bullets really needed if the pic is good").** The drawing carries every term the slide needs (spec, gap, you·Claude·rules, session, change, drift, tests·diff·eval, the two brackets, the autopilot caption, *the sensor:* on the measurement block). The accumulation idea (same model, two different agents, only the surround differed) belongs to the second-loop slide, without module numbers. Do not add bullets.

**Dino's skill stack / Pocock's skill system are figures only (Antti 2026-09-02: *"I will give concrete examples rather than try bulletpoint this into clarity"*; *"just pic, no bullets"*).** No bodies owed, no trainer talk track owed (a good agentic engineer can explain them). `figures/dino-skill-stack.md` redraws the supplementary's `skill-stacking/01-meta-model.svg` (mermaid) in the house palette: five lifecycle columns, the three routed gates in rust, `/ship` as the one orchestrator with its sequenced chain, OPS looping back to BUILD. Source of truth for the skill list is `supplementary/skill-stacking.md`; regenerate the figure when that catalog changes. `figures/pocock-skill-system.md` is drawn from `mattpocock/skills` @ `6654f6b` (2026-08-24), reading `skills/engineering/ask-matt/SKILL.md` for the flow: one main flow (grill-with-docs → to-spec → to-tickets → implement, which drives tdd and code-review inside it), a prototype detour bridged by handoff, on-ramps (improve-codebase-architecture, wayfinder, triage, diagnosing-bugs), two vocabulary skills underneath, ask-matt as router. Skill count deliberately not stated. `ask-matt` routes; nothing in the repo runs the flow, so the *pocock-by-hand* claim on the T3 slide holds. Both figures render at 1200×560 with all labels ≥ 9px; checked by headless-Chrome screenshot. The two supplementaries behind them, [Dino's skill stacking system](trainings/agentic-engineering-101/supplementary/skill-stacking.md) and [Workflow composition lineages](trainings/agentic-engineering-101/supplementary/workflow-composition-lineages.md), sit in the training index and are not linked from the deck.

**Lean pass (2026-08-25):** cut *"Same passage, same drift, same fixes and guardrails."* from the footprint slide; the figure shows it. Do not restore.

**Emphasis budget (Antti-directed "go very lightly on the bold"):** bold = handles only: **eval** on the Eval slide, **skill** on the footprint slide; *pilot* stays plain as the chart-to-field bridge; everything else plain, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`.

**Quality:** compendium-audited 2026-09-03 (writing@289b45a3 story@289b45a3 technical@4e0370bc behavior@1c765f2 pedagogy@4e0370bc strategy@4e0370bc slides@289b45a3)
- judges @289b45a3: writing PASS (2 todos see instances/ae101--lecture--composing-the-workflow.writing.json), story PASS (2 todos see instances/ae101--lecture--composing-the-workflow.story.json), technical PASS, behavior PASS, pedagogy PASS (1 todo see instances/ae101--lecture--composing-the-workflow.pedagogy.json), strategy PASS, slides PASS

**Framing (5-framing / 3-judge panel, 2026-07-04):** *footprint follows the job*: a skill's footprint is wherever its job lands (one turning point, one leg, the whole trip), never sized in advance. One rule instead of a fixed per-feature mapping (the `fix = verifier` trap), and phases stay out of the chart spine (`leg = phase = skill` re-commits the fixed-mapping error one level up, and a linear chain cannot seat the loop). Load-bearing in chart and body: not every workflow has an orchestrator; the oxblood hand-off arrow, the Pocock sentence and the *many do not* clause inoculate against the orchestrator-always error.

**Figure.** `figures/skill-sea-passage.md` derives from `protos/m6-skill-passage-01-footprint.html` (Antti chose 01 of three; 02 phase-backdrop and 03 phase-spine stay in `protos/` as alternates). Base geometry is the M5 passage chart from `what-packaging-is.md` (same cream/teal/oxblood palette, drift cones, fixes, guardrails, lighthouse, ghost, spot); only the label layer differs (the mapped next move at the pier, test-strategy across a leg, verifier at the orange-ring fix) plus the under-drawn pilot and the weighted hand-off. Single id `sk-reefhatch`, `sk-` prefixed against collision when the theory handbook renders several charts on one page.

**Vocabulary bridge (earned once).** move = skill (the footprint slide's first bullet; the skills-to-workflow slide then speaks *skill* throughout, and the noun *move* stays on the footprint slide where the chart defines it, avoiding the moves-verb/move-noun collision); pilot = orchestrator (the skills-to-workflow slide's pilot clause). The chart speaks nautical (pilot); the supplementaries speak Dino (orchestrator, leaf); the slide bridges them so chart, slide, and reads are one system. Do not re-earn in the supplementaries. Session/task/run vocabulary per `check_student_facing.md §21b`.

**§3 disposition (no cross-module sequencing in body).** Backward recognition only, no forward sequencing; no `M[0-9]` tags in body. The chart callback (the passage the student already sailed) is spine-anchoring on the shared M5 image, not a cross-module ref.

**Length discipline.** Concrete-teacher-plus-pointer, not survey-pointer. The variety sentences on the skills-to-workflow slide (Pocock by hand, Klaassen through files, one documented kit) are the ceiling for in-body field coverage; do NOT re-import the full lineages walk, it lives in `workflow-composition-lineages.md`. New composition discoveries land in the supplementary; the lecture body changes only if a mechanism is renamed at the field level, a wiring shape gains or loses currency, or the student's kit shape changes.

**Headers (squint + truth, `check_lectures §4`).** *A skill's footprint is where its job lands* (thesis-claim, matches the chart's own bottom caption); *From skills to a workflow* (names the composition concept the slide teaches in its variety). No orphan-mystery, no empty container.

**Lecture meta:** *The M6 loop lecture: control loop (T1, figure) → Eval (T1) → The second loop (T1, figure) → Dino's skill stack and Pocock's skill system (figures) → The checking loop, drawn solid (T2, figure) → the T3 tail: cadence, footprint, skills-to-workflow. The title stays *Composing the workflow* (Antti 2026-09-02: both words earn their place); do not re-propose a rename.*

**Time:** 11 min at presentation pace.

**Delivery mode:** In-room, chart projected. Barebones drops the three T3 slides and keeps the control loop.

**`## Eval` (from `the-loop-has-a-name.md`; measurement-first rewrite Antti-directed, 2026-09-02):** right after the control-loop slide, before the second loop. An eval is a measurement across runs against a fixed yardstick; the checks are the instruments inside it; verifier / judge / gate are stated as a definition, not a survey (see Stance). Keep the **eval** bold as the slide's one handle.

**The latency axis stays off the slides (2026-08-23, Antti, `0a56ebd9`):** no bullet placing checks by latency (seconds inline, minutes in the background, expensive judgement at a named gate); students realise the axis through their own practice, and a closing lecture is recognition, not instruction. Do not add one without a new call; the deep treatment stays in `supplementary/how-the-best-do-ci-cd.md` § *Eval latency is part of the loop*.

**`## The checking loop, drawn solid` (from `the-map-filled-in.md`, Antti 2026-09-02):** the engine map re-shown with the checking loop solid, figure only, T2, after the Dino / Pocock slides.

**SVG:** `figures/map-engine-filled.md` derives from `the-whole-map.md`'s engine canvas with four differences: the checking-loop ellipse is solid (stroke 2.6, opacity 0.9), the tag is un-ghosted (teal, no `◌`), the sub reads `by your evals now`, the aria-label matches. Ids carry the `mf-` prefix (the theory handbook renders both copies on one page; duplicate ids break defs and markers). If the M2 map changes, re-derive this copy.

**Soil line (2026-08-15):** the strip rides this figure visually (bottom-center italic, paints last); its one spoken home is `agents-that-build-agents.md` § *You make agentic happen* (Antti-directed: the orders belong at the launch beat, not the consolidation). Do not add a spoken bullet here; the strip is on all four `map-engine*` figures.

**Control-loop naming (2026-07-03, Antti + external read):** *You drew a control loop* names the whole map as a feedback control loop (near half feedforward · far half feedback · verification as the sensor layer), recognition-after-living, jargon-free by design: NO setpoint / plant / gain; "feedback control" and "control loop" are the accessible names. No new law coined: the single-loop closed-loop-controller law (`theory-plan.md` §1, `[borrow:control theory]`) lives in-room from `the-agent-loop` at M4, and this slide widens it to the whole map. Antti's dosage call (Option B): ONE clean naming reaches students; the canonical mapping (reference / controller / plant / output / measurement / error / disturbance / integral-memory → AE101) stays design-side in `theory-plan.md` § The Field Map. Source: the canonical closed-loop diagram (Wikimedia Commons *Simple feedback control loop*; Wikipedia *Closed-loop controller*), textbook origin, no freshness stamp owed.

**Control-loop diagram (2026-07-04):** proto A (`protos/control-loop-01-closed-loop.html`, the canonical closed-loop block diagram relabeled in student words) from a 3-proto set (B = open-vs-closed contrast and C = map-as-loop stay in `protos/` as alternates), inlined as `{{figure:student-closed-loop}}`. No SVG ids, so no collision with the engine map's `mf-` ids on the theory-handbook page. The caption carries "robotics and autopilots have run on for decades" once.

**Accumulation claim (2026-08-09, Antti-directed; buried-gold item):** carried by the second-loop figure, not a bullet: what a session gets right unattended is set by the accumulated surround (same model, same harness, only the surround differed, so by the M4 four-part definition "two different agents" is literal). Guards: (a) NOT a new law, no coined name, no bold; (b) claim altitude only, the four artifact classes stay bare; (c) it is the system-side twin of the closer's frontier slide (engineer-side), the twins lean on each other by deck order and neither restates the other; (d) `the-agent-loop.md` ("Out of the box, nothing new takes over") stays the setup, the payoff lands here. Design-side name *Accumulated, not enabled* (`theory-plan.md` §3) stays off slides. Trainer line: *asking the product for more autonomy adds nothing the surround has not already earned.*

**Cadence slide (from `the-loop-has-a-name.md`, Antti 2026-09-02, header his):** *Loop instead of you starting* opens the T3 tail after the filled map (low value sits at the end): a check on cadence is the loop closing with nobody pressing start.

**Watch-for (delivery):**
- Scheduled-agents stays one slide, not a mini-lecture. Three places it fits, one reference-page pointer, move on. If the slide grows past 90 seconds in rehearsal, cut.

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
- cc-scheduling-primitives `[checked:2026-04-24 result:OK due:cohort]` https://code.claude.com/docs/en/ — [capability] The body names three scheduling primitives and distinguishes local Routines from `/schedule`'s cloud-backed remote Routines. The check ran 2026-04-24 against the current documentation and is recorded here: `/schedule` is Routines, remote and cloud-backed; Desktop local tasks are a separate primitive. **A capability stamp records its own check.** A pointer at a paragraph in another file is only as durable as that file's next edit. fallback: teach the pattern (a kit skill is what the scheduled agent invokes) and name only the primitives a re-test confirms.
- skill-stacking-supp `[checked:2026-07-05 result:OK due:none]` kb:none — [delegated stamp] `curriculum/trainings/agentic-engineering-101/supplementary/skill-stacking.md` carries the primary stamps for the four composition mechanisms and the `/ship`-as-pilot worked example (Dino's in-repo stack). A worked example of a shipped kit does not expire. **`/ship` is Dino's own skill, NOT a Claude Code built-in** — the chart keeps the orchestrator generic ("the pilot") and the named example stays in the supplementary, which is the whole reason this body carries no product name. fallback: re-verify in that doc if its own stamps age out.
- pocock-skills-repo `[checked:2026-09-02 result:OK due:cohort]` https://github.com/mattpocock/skills — [practitioner direct, primary repo] @ `6654f6b` (2026-08-24). Backs the Pocock figure's flow and skill names; `ask-matt/SKILL.md` is the page that describes the main flow and on-ramps. Re-check before each cohort: the kit churns monthly. fallback: redraw from the README's Reference section.
- lineages-supp `[checked:2026-08-01 result:CAVEAT due:none]` kb:none — [delegated stamp] `curriculum/trainings/agentic-engineering-101/supplementary/workflow-composition-lineages.md` carries the field-survey lineages and their per-source stamps. **`due:none` is the delegated variant** (`backing-format.md` § Delegated): the delegation does not expire, the delegate's own stamps do, and `source-freshness.sh` already walks that file. `checked:` still means what it says here: the date this pointer was last confirmed to aim at the right file. fallback: this lecture asserts no dated specific of its own; if the supplementary's lineages change, only `field-wires-more-ways-than-one` is affected, and that claim gets *stronger* when the field moves.

Frameworks
- eval = judge / verifier / gate · [borrow:none] · law:eval-judge-verifier-gate · ← none — the three-way split is banked as a law and taught as a definition; the words are in real use, the taxonomy is ours
- Footprint follows the job · [borrow:none] · law:none · ← none — house framing; phases-as-legs is the rejected alternative
- Orchestrator / leaf · [borrow:distributed systems] · law:none · ← skill-stacking-supp — Dino's vocabulary, bridged once to the chart's nautical *pilot*
- The value cycle · [borrow:none] · law:the-value-cycle · ← none — the lifecycle columns on the Dino figure are the cycle in run-local form

Stance `[stance:2026-08-01 level:L1]`
- holds: that composition comes in recorded variety — called by hand (Pocock), chained through files (Klaassen), the orchestrated kit the Dino figure draws — and that no way has won, which the lineages' own stance supports at L2. Every named specific delegates to the two supplementaries.
- contested: whether the four wirings are the complete set. Nobody has enumerated composition mechanisms across kits (the delegate's stance says so in as many words); the body states no count and teaches the variety.
- decided: **delegated stamps take `due:none`, 2026-08-02.** The pointer is legitimate; a computed date on it is a second copy of the delegate's freshness that nothing in the toolchain compares. Rule: `backing-format.md` § Delegated.
- contested (eval naming): the vocabulary — checked 2026-08-02 (see Flagged), and the answer splits: *judge* is genuinely shared across the LLM-eval lineage (Husain, Shankar, Yan, Willison, Braintrust, LangSmith); *verifier* and *gate* are ours — the field says `code-based eval` / `assertion` / `grader` / `scorer` for the one and ships the behaviour without a shared word for the other. The body's define-rather-than-survey framing is therefore right, and the live question is only whether the Eval slide earns one bridging clause naming the field's words (Flagged, first row).
- decided: **judge / verifier / gate is stated as a definition, not a survey, 2026-08-01.** The names are in real use; the split by check-type is ours. Do not restore a survey verb (*"Practitioners say…"*); the standing usage question lives in the OODA below.
- would-move-it: a mechanism renamed at field level, or convergence on one composition shape, which would turn the variety sentence into a recommendation; either edits the skills-to-workflow slide and the two example figures.

OODA
- question: have the four wiring mechanisms held their names, and has a fifth appeared? And do practitioners actually use *judge*, *verifier* and *gate* with the Eval slide's three distinctions?
- roster: Dino (skill-stacking), Kieran Klaassen, Simon Willison, Geoffrey Huntley, Hamel Husain, Shreya Shankar, Eugene Yan, the Anthropic eval cookbook, Braintrust and LangSmith docs for vendor usage, the Amp Chronicle, Anthropic's skills documentation
- last-run: 2026-08-01

Flagged
- `[found:2026-08-02]` The usage question is answered, and it answers in three different registers rather than one. *Judge* is genuinely shared: Husain, Shankar, Yan, Willison, Braintrust and LangSmith all use it for an LLM reading the work, unchanged across 2024–2026. *Verifier* is attested nowhere in that sense — the field's words for the deterministic half are `code-based eval` (Husain and Shankar's joint course), `assertion` (Shankar's EvalGen paper), `grader` (Yan 2026-06, and the Anthropic cookbook throughout), `scorer` (Braintrust) and `code evaluator` (LangSmith). *Gate* is weakest: Braintrust alone uses the word for the CI-blocks-merge behaviour, LangSmith ships the identical behaviour as "promote to production if all pass", and Yan's *guardrail* names a runtime production filter rather than a merge blocker, so it is a near-miss on the word and not a match on the concept. **This now joins the M5 finding from the other direction.** `what-packaging-is.md`'s `ronacher-minijinja` stamp records a 14-post sweep of Ronacher's full archive returning zero uses of *verifier*; this cycle sweeps a different population — the LLM-eval lineage rather than the agentic-coding one — and returns the same zero. Two independent sweeps, two disjoint rosters, one answer, which is a firmer footing for the body's framing than either sweep alone. → the body already says so — it defines rather than surveys — but a student who reads Husain next meets `code-based eval` and has no way to know it is our `verifier`. Does the Eval slide earn one bridging clause naming the field's words, or does that clutter the beat the naming move depends on?
- `[found:2026-08-02]` No source anywhere assembles the three into a taxonomy. Where three-way splits do exist — Anthropic's code-based / model-based / human graders, LangSmith's human / code rules / LLM-as-judge / pairwise — the axis is *who performs the check*, never *where the check sits*. The CI-placement axis is structurally absent from every taxonomy found. → no body change owed; this is the evidence the 2026-08-01 decision was right.

<!-- /backing -->
