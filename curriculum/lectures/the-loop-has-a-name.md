# The check you built is an eval

Look at what you have shipped.

## Eval

- The thing you built at M5 reads an agent's work and decides whether it meets a bar. The checks you just ranked against your dominant gap are the same family: some deterministic, some an LLM reading the work, some firing before the session even starts.
- The name for all of it is **eval**: the automated check that says *this agent-produced thing meets our bar*.
- Three names, one thing. *Judge* when the check is itself an LLM reading the work. *Verifier* when the check is deterministic: tests, lint, compile, a shell hook that returns true or false. *Gate* when the same check is placed in CI and a pull request can't merge without it. M5 used *verifier* for the whole family and *judge* for one shape inside it; from here each name is precise, and the family name is the one above.
- On the map they are the checking loop the M2 drawing left dashed, now drawn solid.

## One primitive, placed wherever there's a bar

- The shape fires on any workflow with a quality bar, not only agent sessions. A code-review checklist, a deployment gate, an internal-doc rubric. Anywhere you can describe *meets the bar*, you can write the check.
- Naming it is what lets you reuse it. Once you see the verifier, the judge, and the gate as the same primitive, you can place that primitive in more places. On a pull request. On a nightly run. On the next agent that does the same class of work. On the team's shared kit.

## The eval primitive scales unchanged

- 19.2% of Intercom's pull requests merge with no human reviewer. Darragh Curran runs engineering there; the numbers are Intercom's own, published in his April post *"2x, nine months later"*. Auto-approved PRs merge in 14.6 minutes versus an org median of 75.8 minutes. 86% of them are 20 lines or fewer. The R&D org is around 470 people inside a 1,300-person company.
- Read that as your verifier from M5, scaled. Same primitive, placed in CI, fed by convention, trusted by a human team that set the thresholds.
- The shape doesn't change when the org gets big. Only the number of evals, the number of places they sit, and the number of engineers contributing to the kit.

## The primitive that runs on cadence

- One thing a kit skill can do that you did not try today: run on a schedule. Claude Code ships three scheduling primitives: local routines (from the Routines sidebar) for standing work on your laptop, `/loop` for in-session repetition, `/schedule` for cloud-backed remote Routines. The pattern is the same across all three: a skill from your kit is the thing the scheduled agent invokes.
- Three places this fits naturally. A standing verifier run: a judge reads the most recent long-running send-off and has a summary waiting when you open the laptop. A scheduled codebase sweep: a gap-finder reads the repo for the drift shape you saw at M5 and opens an issue when it finds one. Rule-drift monitoring: a judge reads the root rules file against the recent commit log and names where the rules and the code disagree.
- You do not have to wire it today; you do need to know the eval can run on cadence. The skill defines the check. The runtime supplies the cadence or stopping condition.

## Why the loop survives the model

- The specific Claude you used today will be replaced, probably within months. Each replacement will be better at the work than the current one. None of that changes the move.
- The three pieces (reference, plan, verifier) are not model features. Neither is the encode loop you ran at M6 (diff, name the gaps, map where the lesson lands). They are a stance toward a thing that does not behave deterministically. Reference because the goal drifts. Plan because the window fills. Verifier because plausible-but-wrong is the default failure mode of a statistical machine. Encode because a lesson learned once and not written down gets learned again next week.
- Practitioner fluency lives in the stance, not in the tooling. When the next model ships, you will open the same kit, point it at the same three pieces, and run the same loop. The work gets faster. The method does not.

The loop feeds itself. That is the flywheel, and it starts with what you encoded today.

<!-- maintainer -->

**Lean pass (2026-08-25, Antti-directed M3/M6 shorten, free hands):** cut "Opus 4.7 will be Opus 4.8, then something with a different name." (dates the deck; replacement claim survives as "Each replacement will be better…"); cadence bullet 3 condensed — the "the second you stop thinking of the eval as a one-shot check… your options change" clause folded into "you do need to know the eval can run on cadence" (watch-for already caps this slide at 90 s). Do not restore.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all five slides keep bullets; bold reduced to one handle — **eval** at the naming beat on slide 1 (existing *judge*/*verifier*/*gate* italics kept); every other bolded lead across all slides de-bolded (map-placement, Intercom, cadence, loop-survives-the-model slides now carry zero bold) — per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Lede + kicker untouched. Wording near-verbatim; no claims added or cut.

- Family B judged 2026-07-03: B-star durability PASS — spine + worldview both noteworthy (slide 1 names its map slot, M2-dashed-to-solid; pure recognition-before-naming closer, "Look at what you just shipped" → "That thing has a name").

**Slides-only pass (2026-07-02, unaudited):** ~950-word prose body CONVERTED to lede + four slides. Intro recognition paragraph → slide 1 bullet 1 ("Look at what you just shipped" KEPT as one-line setup lede — the earning moment's cue). *Eval* section → slide 1, six bullets; "the word carries more weight in the vendor literature than it deserves" CUT (`check_writing §13` vendor-in-body + value-prop defense in a teaching beat; the flat definition carries the deflation without the posture). *The shape it grows into* → slide 2, numbers verbatim. *The primitive that runs on cadence* → slide 3 (reference link and capability wording preserved verbatim; platform claims unchanged, no re-verification owed by this pass). *Why the loop survives the model* → slide 4. *Where this goes next* section FOLDED into the closing kicker (load-bearing foreshadow to the next lecture in this module's closer chain; module file carries the sequencing).

**Quality:** compendium-audited 2026-08-27 (writing@a50978f7 story@0e4f7c9e technical@1abb84c6 behavior@1c765f2 pedagogy@1abb84c6 strategy@1c765f2 slides@0e4f7c9e)
- judges @0e4f7c9e: story PASS, technical PASS (drift-recheck), behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS
- judges @a50978f7: writing PASS
**Lecture meta:** *12–15 min closing lecture for AE101 M6 (deck-only trimmed from the 15–18 prose draft). Names evals with full weight from the M5 verifier and the check-menu the module just ranked. Forward-looking register — closes core AE101, bridges to Monday-morning or to M7 depending on the room. M5/M6 refs in body KEPT under the `check_lectures §3` consolidation carve-out: the closer's SUBJECT is naming what M5–M6 built (recognition), not sequencing.*

**Time:** 15 min at presentation pace.

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
- curran-2x `[checked:2026-05-25 result:CAVEAT due:2026-11-25]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran 2026-04-16: 19.2% / 14.6 vs 75.8 min / 86% ≤20 lines, ~473 R&D in 1,305. Metrics are Intercom's own telemetry, and the body carries that scoping ("the numbers are Intercom's own"). "Runs engineering" phrasing avoids the title nit — his title is VP Engineering. fallback: keep the numbers, attribute Intercom's published telemetry, flag self-report.
- cc-scheduling-primitives `[checked:2026-08-01 result:ATTESTED due:cohort]` https://code.claude.com/docs/en/ — [capability, maintainer-attested] The body names three scheduling primitives and distinguishes local Routines from `/schedule`'s cloud-backed remote Routines. **The underlying check exists and is recorded in `story-of-module-6.md`**, which describes the capability sweep that established exactly this split (`/schedule` is Routines, remote, cloud-based; Desktop local tasks are a separate primitive). Maintainer accepted it on 2026-08-01 without a re-test. The defect this stamp fixes is not a missing check, it is that the check lived in a different file and nothing joined them. fallback: teach the pattern (a kit skill is what the scheduled agent invokes) and name only the primitives a re-test confirms.

Frameworks
- eval = judge / verifier / gate · [borrow:none] · law:eval-judge-verifier-gate · ← none — the three-way split is banked as a law and taught as a definition; the words are in real use, the taxonomy is ours
- The value cycle · [borrow:none] · law:the-value-cycle · ← none — the eval's map slot is Verification, the loop M2 left dashed
- Absorption bottleneck · [borrow:none] · law:absorption-bottleneck · ← curran-2x — auto-approval is an org buying back its own evaluation rate

Stance `[stance:2026-08-01 level:L1]`
- holds: that automated checks scale to org level without changing shape. Intercom is one published telemetry set, self-reported, and it is the only number in the lecture. That is L1 evidence carrying an L1 claim, which is fine because the body frames it as one org's numbers rather than as a rate the field converges on.
- contested: the vocabulary. The lecture's central move is naming, and the naming claim is the one thing in it with no source — see Flagged. Whether *judge* / *verifier* / *gate* split this way in practitioner usage has never been checked, and M5 has already taught this corpus what happens when a naming claim goes unaudited.
- decided: **judge / verifier / gate is stated as a definition, not a survey, 2026-08-01.** The bullet read *"Practitioners say judge…"*, attributing a three-way taxonomy to a field nobody had counted. The names are in real use; the split by check-type is ours. Do not restore the survey verb — the standing usage question lives in the OODA below and is worth answering, but the body no longer depends on the answer.
- decided: **the scheduling bullet is stamped `ATTESTED`, 2026-08-01.** It had never carried a stamp of any kind, and the capability check backing it turned out to be recorded in `story-of-module-6.md`, one module over. The maintainer accepted it without a re-test. The finding worth keeping is the shape: a real check existed, in the corpus, and was invisible from the file that depended on it.
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
- `[found:2026-08-02]` `Stance.contested` now reads false. It says the vocabulary split "has never been checked" — it has, as of this cycle, and the answer is that *judge* holds and *verifier* / *gate* are ours. → the stance text needs rewriting to match, which is a conversation rather than an edit this cycle makes.

<!-- /backing -->

**Watch-fors (delivery):**
- Mood stays practitioner-fluency. If the Intercom numbers land as vendor-plug ("here's what the big co does, aspire to that"), the mood slips into compliance-feel. They are anchors of the destination shape, not product placements. Pace accordingly.
- Slide 1 names *eval* across the three shapes already in hand. The beat is three-names-one-thing; the word lands because the thing is in hand.
- Scheduled-agents stays one slide, not a mini-lecture. Three places it fits, one reference-page pointer, move on. If the slide grows past 90 seconds in rehearsal, cut.
- Monday-morning vs. M7 bridge — both are shipped in the lecture. The trainer or the room picks which lands.
- Risto voice on "the specific Claude will be replaced." Flat epistemic candour, no sales varnish. This is the beat that carries the lecture past the current model's expiry date.

**Philosophy callouts:** at most one. The *compounding* theme surfaces naturally in the kit-grows-by-accretion beat; no need to name-tag it. Do not bolt the 19 beliefs onto this lecture.

**Edits (2026-07-02):** slide 1 places eval on the map (one clause: the checking loop the M2 drawing left dashed, now drawn solid) and slide 4's triad attribution is re-hedged from "pieces Ronacher named" to the convergence form ("pieces practitioners converge on"), matching the M5 closer and the source stamp (triad cleanly inferable from Ronacher, not his verbatim naming) — theory-completeness-review finding #1 + the provenance item.

**Self-report scoping, and one orphaned stamp.** Slide 2 scopes the Curran numbers as Intercom's own, woven into the Curran sentence — the Intercom stamp's flag-self-report fallback carried in body, per the zombie-stat guard. The geoffintech stamp above is orphaned: the body carries no Ramp claim. It is kept for provenance.

**Cross-file stamp pointer:** slide 4's triad claim leans on the source stamps in `curriculum/lectures/what-packaging-is.md` § Source verification. Those stamps were re-verified 2026-08-01 and **the convergence framing this slide inherited does not survive them.** Counted strictly — all three pieces present together as artefacts in one practice — the independents number **one** (Huntley's Ralph), against an L3 bar of 10–20. Ronacher is 2-of-3 in practice and 0-of-3 in vocabulary; Klaassen's plan artefact is a pre-work spec, not a document mutated across a run, so it is a different piece wearing the same word. The triad is our synthesis of scattered practice, which is candid work to do and misleading to call convergence. Slide 4 reads *"The three pieces (reference, plan, verifier) are not model features"* — a convergence assertion does no work in a sentence whose argument is that the pieces are a stance rather than a model feature. M5's `what-packaging-is` introduces the triad as our combination, so this file must not assert convergence downstream of it. **Do not restore the phrase.**

**Vocabulary split with `composing-the-workflow.md`.** That lecture is the concrete composition teacher (the passage chart + "a workflow is skills in the right order") and owns compose/workflow; it also sits before this one in the closer chain. This lecture owns reuse and placement — put the primitive on a PR, a nightly run, the next agent, the team kit — so slide 1's bullet lead reads "Naming it is what lets you reuse it", never "…compose", and the spine ties to that lecture's "a named move you reach for". *eval* is this lecture's owned term; "workflow" appears once in body in the generic "any workflow with a quality bar" sense, not the composed-skills sense.

**The closing kicker names no next lecture.** M6's closer chain runs loop-has-a-name → the-map-filled-in → agents-that-build-agents, so a kicker opening on the literal `agents-that-build-agents` title asserts a false adjacency. It reads "The loop feeds itself." — this lecture's own loop-survives-the-model theme, with the flywheel and encode-today close kept verbatim. Do not re-point it at a named next beat; the forward-lean in the note above is thematic, not a tee.
