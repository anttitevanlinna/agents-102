# The check you built is an eval

Look at what you have shipped.

## Eval

- The thing you built at M5 reads an agent's work and decides whether it meets a bar. The checks you just ranked against your dominant gap are the same family: some deterministic, some an LLM reading the work, some firing before the session even starts.
- The name for all of it is **eval**: the automated check that says *this agent-produced thing meets our bar*.
- Three names, one thing. *Judge* when the check is itself an LLM reading the work. *Verifier* when the check is deterministic: tests, lint, compile, a shell hook that returns true or false. *Gate* when the same check is placed in CI and a pull request can't merge without it. M5 used *verifier* for the whole family and *judge* for one shape inside it; from here each name is precise, and *eval* is the family name.
- On the map they are the checking loop the M2 drawing left dashed, now drawn solid.

## One primitive, placed wherever there's a bar
<!--tier:3-->

- The shape fires on any workflow with a quality bar, not only agent sessions. A code-review checklist, a deployment gate, an internal-doc rubric. Anywhere you can describe *meets the bar*, you can write the check.
- Naming it is what lets you reuse it. Once you see the verifier, the judge, and the gate as the same primitive, you can place that primitive in more places. On a pull request. On a nightly run. On the next agent that does the same class of work. On the team's shared kit.

## The eval primitive scales unchanged
<!--tier:3-->

- 19.2% of Intercom's pull requests merge with no human reviewer. Darragh Curran runs engineering there; the numbers are Intercom's own, published in his April post *"2x, nine months later"*. Auto-approved PRs merge in 14.6 minutes versus an org median of 75.8 minutes. 86% of them are 20 lines or fewer. The R&D org is around 470 people inside a 1,300-person company.
- Read that as your verifier from M5, scaled. Same primitive, placed in CI, fed by convention, trusted by a human team that set the thresholds.
- The shape doesn't change when the org gets big. Only the number of evals, the number of places they sit, and the number of engineers contributing to the kit.

## The primitive that runs on cadence
<!--tier:3-->

- One thing a kit skill can do that you did not try today: run on a schedule. Claude Code ships three scheduling primitives: local routines (from the Routines sidebar) for standing work on your laptop, `/loop` for in-session repetition, `/schedule` for cloud-backed remote Routines. The pattern is the same across all three: a skill from your kit is the thing the scheduled agent invokes.
- Three places this fits naturally. A standing verifier run: a judge reads the most recent long-running send-off and has a summary waiting when you open the laptop. A scheduled codebase sweep: a gap-finder reads the repo for the drift shape you saw at M5 and opens an issue when it finds one. Rule-drift monitoring: a judge reads the root rules file against the recent commit log and names where the rules and the code disagree.
- You do not have to wire it today; you do need to know the eval can run on cadence. The skill defines the check. The runtime supplies the cadence or stopping condition.

<!-- maintainer -->

**Lean pass (2026-08-25, Antti-directed M3/M6 shorten, free hands):** cut "Opus 4.7 will be Opus 4.8, then something with a different name." (dates the deck; replacement claim survives as "Each replacement will be better…"); cadence bullet 3 condensed — the "the second you stop thinking of the eval as a one-shot check… your options change" clause folded into "you do need to know the eval can run on cadence" (watch-for already caps this slide at 90 s). Do not restore.

**The latency axis stays off the naming slide (2026-08-23, Antti, `0a56ebd9`):** a bullet placing checks by latency (seconds inline, minutes in the background, expensive judgement at a named gate) was tried on `## One primitive, placed wherever there's a bar` and reverted — students realise the latency axis through their own practice, and a closing lecture is recognition, not instruction. Do not re-add without a new call; the deep treatment stays in `supplementary/how-the-best-do-ci-cd.md` § *Eval latency is part of the loop*.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all five slides keep bullets; bold reduced to one handle — **eval** at the naming beat on slide 1 (existing *judge*/*verifier*/*gate* italics kept); every other bolded lead across all slides de-bolded (map-placement, Intercom, cadence, loop-survives-the-model slides now carry zero bold) — per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Lede + kicker untouched. Wording near-verbatim; no claims added or cut.

- Family B judged 2026-07-03: B-star durability PASS — spine + worldview both noteworthy (slide 1 names its map slot, M2-dashed-to-solid; pure recognition-before-naming closer, "Look at what you just shipped" → "That thing has a name").

**Slides-only pass (2026-07-02, unaudited):** ~950-word prose body CONVERTED to lede + four slides. Intro recognition paragraph → slide 1 bullet 1 ("Look at what you just shipped" KEPT as one-line setup lede — the earning moment's cue). *Eval* section → slide 1, six bullets; "the word carries more weight in the vendor literature than it deserves" CUT (`check_writing §13` vendor-in-body + value-prop defense in a teaching beat; the flat definition carries the deflation without the posture). *The shape it grows into* → slide 2, numbers verbatim. *The primitive that runs on cadence* → slide 3 (reference link and capability wording preserved verbatim; platform claims unchanged, no re-verification owed by this pass). *Why the loop survives the model* → slide 4. *Where this goes next* section FOLDED into the closing kicker (load-bearing foreshadow to the next lecture in this module's closer chain; module file carries the sequencing).

**Quality:** compendium-audited 2026-08-30 (writing@4197d503 story@4197d503 technical@4197d503 strategy@4197d503 slides@4197d503 behavior@1c765f2 pedagogy@1abb84c6)
- judges @4197d503: writing PASS, story PASS, technical PASS, strategy PASS, slides PASS — re-judged after the cc-scheduling-primitives restamp. The prior §11a finding (borrowed `ATTESTED` on a documentation read) no longer fires; the stamp now records its own check.
- judges @4a722813: behavior PASS, pedagogy PASS (drift-recheck)
**Lecture meta:** *Names evals with full weight from the M5 verifier and the check-menu the module just ranked, directly after the exercise debrief. Three tail slides are T3. M5/M6 refs in body KEPT under the `check_lectures §3` consolidation carve-out: the SUBJECT is naming what M5–M6 built (recognition), not sequencing.*

**Time:** 12 min at presentation pace.

**Delivery mode:** In-room close after Debrief.

<!-- backing -->

Claims
- `checks-are-one-family` · vision · "The checks you just ranked against your dominant gap are the same family" ← none-owed
- `the-name-is-eval` · vision · "The name for all of it is **eval**" ← none-owed
- `judge-verifier-gate-three-names` · vision · "Three names, one thing. *Judge* when the check is itself an LLM reading the work." ← none-owed
- `eval-definition` · vision · "the automated check that says *this agent-produced thing meets our bar*" ← none-owed
- `map-placement-checking-loop` · vision · "the checking loop the M2 drawing left dashed, now drawn solid" ← none-owed
- `fires-on-any-quality-bar` · vision · "The shape fires on any workflow with a quality bar, not only agent sessions." ← none-owed
- `naming-enables-reuse` · vision · "Naming it is what lets you reuse it." ← none-owed
- `intercom-auto-approval-numbers` · detail · "19.2% of Intercom's pull requests merge with no human reviewer" ← curran-2x
- `intercom-timing-and-size` · detail · "Auto-approved PRs merge in 14.6 minutes versus an org median of 75.8 minutes. 86% of them are 20 lines or fewer." ← curran-2x
- `intercom-org-size` · detail · "The R&D org is around 470 people inside a 1,300-person company." ← curran-2x
- `verifier-scaled-same-primitive` · vision · "Read that as your verifier from M5, scaled." ← none-owed
- `shape-survives-org-size` · vision · "The shape doesn't change when the org gets big." ← none-owed
- `three-scheduling-primitives` · detail · "Claude Code ships three scheduling primitives: local routines (from the Routines sidebar) for standing work on your laptop, `/loop` for in-session repetition, `/schedule` for cloud-backed remote Routines." ← cc-scheduling-primitives
- `three-places-cadence-fits` · vision · "A standing verifier run … A scheduled codebase sweep … Rule-drift monitoring" ← none-owed
- `skill-defines-check-runtime-supplies-cadence` · vision · "The skill defines the check. The runtime supplies the cadence or stopping condition." ← none-owed
- `model-will-be-replaced` · vision · "The specific Claude you used today will be replaced, probably within months." ← none-owed
- `three-pieces-are-not-model-features` · vision · "The three pieces (reference, plan, verifier) are not model features." ← none-owed
- `fluency-lives-in-the-stance` · vision · "Practitioner fluency lives in the stance, not in the tooling." ← none-owed
- `method-does-not-get-faster` · vision · "The work gets faster. The method does not." ← none-owed

Sources
- curran-2x `[checked:2026-05-25 result:CAVEAT due:2026-10-16]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran 2026-04-16: 19.2% / 14.6 vs 75.8 min / 86% ≤20 lines, ~473 R&D in 1,305. CAVEAT ×2: metrics are Intercom's own telemetry, and the body carries that scoping ("the numbers are Intercom's own"); and the company renamed to Fin on 2026-05-12 (Salesforce acquisition since signed) — the memo predates the rename, accurate for April 2026; do not silently swap the name (record: kb:observations/intercom.md). "Runs engineering" phrasing avoids the title nit — his title is VP Engineering. fallback: keep the numbers, attribute Intercom's published telemetry, flag self-report.
- cc-scheduling-primitives `[checked:2026-04-24 result:OK due:cohort]` https://code.claude.com/docs/en/ — [capability] The body names three scheduling primitives and distinguishes local Routines from `/schedule`'s cloud-backed remote Routines. The check ran 2026-04-24 against the current documentation and is recorded here: `/schedule` is Routines, remote and cloud-backed; Desktop local tasks are a separate primitive. **A capability stamp records its own check.** Pointing at a paragraph in another file makes the stamp only as durable as that file's next edit, which is how this one nearly lost its evidence. fallback: teach the pattern (a kit skill is what the scheduled agent invokes) and name only the primitives a re-test confirms.

Frameworks
- eval = judge / verifier / gate · [borrow:none] · law:eval-judge-verifier-gate · ← none — the three-way split is banked as a law and taught as a definition; the words are in real use, the taxonomy is ours
- The value cycle · [borrow:none] · law:the-value-cycle · ← none — the eval's map slot is Verification, the loop M2 left dashed
- Absorption bottleneck · [borrow:none] · law:absorption-bottleneck · ← curran-2x — auto-approval is an org buying back its own evaluation rate

Stance `[stance:2026-08-01 level:L1]`
- holds: that automated checks scale to org level without changing shape. Intercom is one published telemetry set, self-reported, and it is the only number in the lecture. That is L1 evidence carrying an L1 claim, which is fine because the body frames it as one org's numbers rather than as a rate the field converges on.
- contested: the vocabulary — checked 2026-08-02 (see Flagged), and the answer splits: *judge* is genuinely shared across the LLM-eval lineage (Husain, Shankar, Yan, Willison, Braintrust, LangSmith); *verifier* and *gate* are ours — the field says `code-based eval` / `assertion` / `grader` / `scorer` for the one and ships the behaviour without a shared word for the other. The body's define-rather-than-survey framing is therefore right, and the live question is only whether slide 1 earns one bridging clause naming the field's words (Flagged, first row).
- decided: **judge / verifier / gate is stated as a definition, not a survey, 2026-08-01.** The bullet read *"Practitioners say judge…"*, attributing a three-way taxonomy to a field nobody had counted. The names are in real use; the split by check-type is ours. Do not restore the survey verb — the standing usage question lives in the OODA below and is worth answering, but the body no longer depends on the answer.
- decided: **the scheduling bullet carries its own check, not a pointer at one.** The capability check backing it was recorded in `story-of-module-6.md`, one module over, and this file's stamp merely cited it — invisible from the file that depended on it, and dependent on prose the other lecture was free to cut. The check lives here now, stamped `result:OK` from its own 2026-04-24 date. `ATTESTED` was never the right label: that vocabulary is for a maintainer's first-hand witness, not a documentation read.
- would-move-it: a usage sweep showing practitioners do not split the three words this way, which would turn slide 1 from recognition into invention and require the same "these are our names" candour M5's closer carries. A second org publishing auto-approval telemetry would move the Intercom slide from anecdote to pattern.

OODA
- question: do practitioners actually use *judge*, *verifier* and *gate* with these three distinctions, and has any org besides Intercom published auto-approval rates?
- roster: Hamel Husain, Shreya Shankar, Eugene Yan, Darragh Curran and the Intercom engineering blog, Simon Willison, the Anthropic eval cookbook, Braintrust and LangSmith docs for vendor usage
- last-run: 2026-08-02

Flagged
- `[found:2026-08-02]` The usage question is answered, and it answers in three different registers rather than one. *Judge* is genuinely shared: Husain, Shankar, Yan, Willison, Braintrust and LangSmith all use it for an LLM reading the work, unchanged across 2024–2026. *Verifier* is attested nowhere in that sense — the field's words for the deterministic half are `code-based eval` (Husain and Shankar's joint course), `assertion` (Shankar's EvalGen paper), `grader` (Yan 2026-06, and the Anthropic cookbook throughout), `scorer` (Braintrust) and `code evaluator` (LangSmith). *Gate* is weakest: Braintrust alone uses the word for the CI-blocks-merge behaviour, LangSmith ships the identical behaviour as "promote to production if all pass", and Yan's *guardrail* names a runtime production filter rather than a merge blocker, so it is a near-miss on the word and not a match on the concept. **This now joins the M5 finding from the other direction.** `what-packaging-is.md`'s `ronacher-minijinja` stamp records a 14-post sweep of Ronacher's full archive returning zero uses of *verifier*; this cycle sweeps a different population — the LLM-eval lineage rather than the agentic-coding one — and returns the same zero. Two independent sweeps, two disjoint rosters, one answer, which is a firmer footing for the body's framing than either sweep alone. → the body already says so — it defines rather than surveys — but a student who reads Husain next meets `code-based eval` and has no way to know it is our `verifier`. Does slide 1 earn one bridging clause naming the field's words, or does that clutter the beat the naming move depends on?
- `[found:2026-08-02]` No source anywhere assembles the three into a taxonomy. Where three-way splits do exist — Anthropic's code-based / model-based / human graders, LangSmith's human / code rules / LLM-as-judge / pairwise — the axis is *who performs the check*, never *where the check sits*. The CI-placement axis is structurally absent from every taxonomy found. → no body change owed; this is the evidence the 2026-08-01 decision was right, and it retires the risk M5's naming audit raised. Worth recording that the audit ran and came back clean.
- `[found:2026-08-02]` Still one org. Fifteen engineering blogs, one vendor blog and two developer-survey instruments opened; no second published auto-approval rate. The two near-misses both fail on inspection and are worth naming because they look like hits: Spotify's 2.5M auto-merged PRs are deterministic pre-AI maintenance migrations with no percentage given, and Stripe's 1,000+ weekly fully-AI-authored PRs are explicitly *all* human-reviewed, which is the inverse of the claim. → both are one clarifying post away from qualifying (Spotify breaking out its agent's own merge rate; Stripe reporting what fraction of those PRs get substantive review). Do they go on a named watchlist so the next cycle checks two specific blogs rather than re-sweeping fifteen?
- `[found:2026-08-02]` The Intercom numbers are unrevised. The newest post at the venue is 2026-07-15 and does not touch the topic; the original re-reads consistent, and adds two figures the lecture does not use (497 PRs fully autonomous in the first four weeks, ~60% of all PRs evaluated). One gap: Curran's own X account returned 402 and the documented workarounds are degraded, so that is an unopened source rather than a checked-clean one.
- `[found:2026-08-02 resolved]` `Stance.contested` matches the sweep: *judge* holds, *verifier* / *gate* are ours, and the row carries the field's own vocabulary for the deterministic half.

<!-- /backing -->

**Watch-fors (delivery):**
- Mood stays practitioner-fluency. If the Intercom numbers land as vendor-plug ("here's what the big co does, aspire to that"), the mood slips into compliance-feel. They are anchors of the destination shape, not product placements. Pace accordingly.
- Slide 1 names *eval* across the three shapes already in hand. The beat is three-names-one-thing; the word lands because the thing is in hand.
- Scheduled-agents stays one slide, not a mini-lecture. Three places it fits, one reference-page pointer, move on. If the slide grows past 90 seconds in rehearsal, cut.
- Monday-morning vs. M7 bridge — both are shipped in the lecture. The trainer or the room picks which lands.
- Risto voice on "the specific Claude will be replaced." Flat epistemic candour, no sales varnish. This is the beat that carries the lecture past the current model's expiry date.

**Philosophy callouts:** at most one. The *compounding* theme surfaces naturally in the kit-grows-by-accretion beat; no need to name-tag it. Do not bolt the 19 beliefs onto this lecture.

**Self-report scoping.** Slide 2 scopes the Curran numbers as Intercom's own, woven into the Curran sentence — the Intercom stamp's flag-self-report fallback carried in body, per the zombie-stat guard. The lecture is Intercom-only by design (Antti 2026-08-30): no Ramp claim, no Ramp stamp — Ramp Dojo anchors in the exercise's checking-primitives menu and in `skills-from-the-frontier.md`, not here. Do not re-add a Ramp anchor.

**Cross-file stamp pointer:** slide 4's triad claim leans on the source stamps in `curriculum/lectures/what-packaging-is.md` § Source verification. Those stamps were re-verified 2026-08-01 and **the convergence framing this slide inherited does not survive them.** Counted strictly — all three pieces present together as artefacts in one practice — the independents number **one** (Huntley's Ralph), against an L3 bar of 10–20. Ronacher is 2-of-3 in practice and 0-of-3 in vocabulary; Klaassen's plan artefact is a pre-work spec, not a document mutated across a run, so it is a different piece wearing the same word. The triad is our synthesis of scattered practice, which is candid work to do and misleading to call convergence. Slide 4 reads *"The three pieces (reference, plan, verifier) are not model features"* — a convergence assertion does no work in a sentence whose argument is that the pieces are a stance rather than a model feature. M5's `what-packaging-is` introduces the triad as our combination, so this file must not assert convergence downstream of it. **Do not restore the phrase.**

**Vocabulary split with `composing-the-workflow.md`.** That lecture is the concrete composition teacher (the passage chart + "a workflow is skills in the right order") and owns compose/workflow; it follows this one in deck order. This lecture owns reuse and placement — put the primitive on a PR, a nightly run, the next agent, the team kit — so slide 1's bullet lead reads "Naming it is what lets you reuse it", never "…compose". *eval* is this lecture's owned term; "workflow" appears once in body in the generic "any workflow with a quality bar" sense.

**Placement:** M6 deck order (2026-09-02, three-beat re-cut, slides moved and re-tiered, body text untouched pending cards): the-2-frontiers → exercise `spot-gaps-build-the-loop` (diff + rule cut) → the-loop-has-a-name → `## The loop you drew` → composing-the-workflow (opens on the control-loop slide) → exercise `read-your-stack` → the-handoff-prompt (titled *Agents that build agents*) → story-of-module-6 → the-map-filled-in → quality-is-grounding → Human close → agents-that-build-agents (titled *There is no last turn*, last). The survives-the-model slide and its flywheel kicker moved to `agents-that-build-agents.md`; this file now ends on the cadence slide.
