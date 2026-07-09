# The check you built is an eval

Look at what you just shipped.

## Eval

- The thing you built reads an agent's work and decides whether it meets a bar. For most of you it came out as a sharpened verifier, for some as a fresh judge, for a few as a gap-finder that reads the next agent-produced artefact for the failure shape you saw at M5. Different shapes, same move.
- The name you met at M5 covers all of it: **eval**. Your verifier is an eval. Your judge is an eval. Your gate is an eval.
- Three names, one thing. Practitioners say *judge* when the check is itself an LLM reading the work. *Verifier* when the check is deterministic: tests, lint, compile, a shell hook that returns true or false. *Gate* when the same check is placed in CI and a pull request can't merge without it.
- An eval is the automated check that says *this agent-produced thing meets our bar*. That's it. In practice it's the verifier you built at M5 and the skill you just shipped at M6. You have been doing evals for two modules, and on the map they are the checking loop the M2 drawing left dashed, now drawn solid.

## One primitive, placed wherever there's a bar

- The shape fires on any workflow with a quality bar, not only agent runs. A code-review checklist, a deployment gate, an internal-doc rubric. Anywhere you can describe *meets the bar*, you can write the check.
- Naming it is what lets you reuse it. Once you see the verifier, the judge, the gate, and the skill as the same primitive, you can place that primitive in more places. On a pull request. On a nightly run. On the next agent that does the same class of work. On the team's shared kit.

## The eval primitive scales unchanged

- 19.2% of Intercom's pull requests merge with no human reviewer. Darragh Curran runs engineering there; the numbers are Intercom's own, published in his April post *"2x, nine months later"*. Auto-approved PRs merge in 14.6 minutes versus an org median of 75.8 minutes. 86% of them are 20 lines or fewer. The R&D org is around 470 people inside a 1,300-person company.
- Read that as your verifier from M5, scaled. Same primitive: an automated check that says *this meets the bar*, placed in CI, fed by convention, trusted by a human team that set the thresholds.
- The shape doesn't change when the org gets big. Only the number of evals, the number of places they sit, and the number of engineers contributing to the kit.

## The primitive that runs on cadence

- One thing your skill can do that you did not try today: run on a schedule. Claude Code ships three scheduling primitives: local routines (from the Routines sidebar) for standing work on your laptop, `/loop` for in-session repetition, `/schedule` for cloud-backed remote Routines. The pattern is the same across all three: the skill you just wrote is the thing the scheduled agent invokes.
- Three places this fits naturally. A standing verifier run: the judge reads the most recent long-running send-off and has a summary waiting when you open the laptop. A scheduled codebase sweep: the gap-finder reads the repo for the drift shape you saw at M5 and opens an issue when it finds one. Rule-drift monitoring: a judge reads the root rules file against the recent commit log and names where the rules and the code disagree.
- You do not have to wire it today. You do need to know it exists, because the second you stop thinking of the eval as a one-shot check and start thinking of it as a thing that runs on cadence, your options change. The [Long-running shapes section in Claude Code for engineers](../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md) walks through the four primitives, when each fits, and how a skill plugs into each.

## Why the loop survives the model

- The specific Claude you used today will be replaced, probably within months. Opus 4.7 will be Opus 4.8, then something with a different name. Every one of those models will be better at the work than the current one. None of that changes the move.
- The three pieces practitioners converge on (reference, plan, verifier) are not model features. Neither is the encode loop you ran at M6 (diff, name the gaps, package the learning). They are a stance toward a thing that does not behave deterministically. Reference because the agent forgets. Plan because the window fills. Verifier because plausible-but-wrong is the default failure mode of a statistical machine. Encode because a lesson learned once and not written down gets learned again next week.
- Practitioner fluency lives in the stance, not in the tooling. When the next model ships, you will open the same kit, point it at the same three pieces, and run the same loop. The work gets faster. The method does not.

The loop feeds itself. That is the flywheel, and it starts with what you encoded today.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** all five slides keep bullets; bold reduced to one handle — **eval** at the naming beat on slide 1 (existing *judge*/*verifier*/*gate* italics kept); every other bolded lead across all slides de-bolded (map-placement, Intercom, cadence, loop-survives-the-model slides now carry zero bold) — per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Lede + kicker untouched. Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

- Family B judged 2026-07-03: B-star durability PASS — spine + worldview both noteworthy (slide 1 names its map slot, M2-dashed-to-solid; pure recognition-before-naming closer, "Look at what you just shipped" → "That thing has a name").

**Slides-only pass (2026-07-02, unaudited):** ~950-word prose body CONVERTED to lede + four slides. Intro recognition paragraph → slide 1 bullet 1 ("Look at what you just shipped" KEPT as one-line setup lede — the earning moment's cue). *Eval* section → slide 1, six bullets; "the word carries more weight in the vendor literature than it deserves" CUT (`check_writing §13` vendor-in-body + value-prop defense in a teaching beat; the flat definition carries the deflation without the posture). *The shape it grows into* → slide 2, numbers verbatim. *The primitive that runs on cadence* → slide 3 (reference link and capability wording preserved verbatim; platform claims unchanged, no re-verification owed by this pass). *Why the loop survives the model* → slide 4. *Where this goes next* section FOLDED into the closing kicker (load-bearing foreshadow to the next lecture in this module's closer chain; module file carries the sequencing).

**Quality:** compendium-audited 2026-07-08 (writing@1ff6f8a story@1ff6f8a technical@1ff6f8a behavior@1ff6f8a pedagogy@1ff6f8a strategy@1ff6f8a slides@47f3357) — predates the slide rework; re-audit before ship.
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Lecture meta:** *12–15 min closing lecture for AE101 M6 (deck-only trimmed from the 15–18 prose draft). Names evals with full weight from the skill you just authored. Forward-looking register — closes core AE101, bridges to Monday-morning or to M7 depending on the room. M5/M6 refs in body KEPT under the `check_lectures §3` consolidation carve-out: the closer's SUBJECT is naming what M5–M6 built (recognition), not sequencing.*

**Time:** 12–15 min at presentation pace.

**Delivery mode:** In-room close after Debrief.

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**

- `[checked:2026-05-25 result:CAVEAT due:2026-11-25]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran 2026-04-16: 19.2%/14.6 vs 75.8/86% ≤20 lines, ~473 R&D in 1,305. "Runs engineering" phrasing avoids the title nit. fallback: keep numbers, attribute Intercom's published telemetry, flag self-report.
- `[checked:2026-05-25 result:CAVEAT due:2026-11-25]` https://x.com/geoffintech/status/2042002590758572377 — [practitioner direct] Charles CPO; author + date (April 8 2026) verified via X oEmbed 2026-05-25, but that status is a link-only post — the "models were good enough, the harness wasn't" quote + 350+ Dojo live in the thread/linked piece, confirmed via observations/ramp.md. fallback: attribute the verbatim Charles line from the observation file; if number contested, use "hundreds of skills." (orphaned — body claim removed in slides-only pass; stamp retained for provenance)

**Watch-fors (delivery):**
- Mood stays practitioner-fluency. If the Intercom numbers land as vendor-plug ("here's what the big co does, aspire to that"), the mood slips into compliance-feel. They are anchors of the destination shape, not product placements. Pace accordingly.
- Slide 1 consolidates *eval*, it doesn't reveal it — M5 already named the verifier one. The beat is three-names-one-thing; the word lands because the thing is in hand, not because it's new.
- Scheduled-agents stays one slide, not a mini-lecture. Three places it fits, one reference-page pointer, move on. If the slide grows past 90 seconds in rehearsal, cut.
- Monday-morning vs. M7 bridge — both are shipped in the lecture. The trainer or the room picks which lands.
- Risto voice on "the specific Claude will be replaced." Flat epistemic honesty, no sales varnish. This is the beat that carries the lecture past the current model's expiry date.

**Philosophy callouts:** at most one. The *compounding* theme surfaces naturally in the kit-grows-by-accretion beat; no need to name-tag it. Do not bolt the 19 beliefs onto this lecture.

**Vision vs. detail:**
- Vision layer: the one-word naming, the stance-survives-the-model argument, the flywheel kicker.
- Detail layer: every URL above, every number, the `/schedule` and `/loop` primitive names, the reference-page pointer.

**Edits (2026-07-02):** slide 1 places eval on the map (one clause: the checking loop the M2 drawing left dashed, now drawn solid) and slide 4's triad attribution is re-hedged from "pieces Ronacher named" to the convergence form ("pieces practitioners converge on"), matching the M5 closer and the source stamp (triad cleanly inferable from Ronacher, not his verbatim naming) — theory-completeness-review finding #1 + the provenance item.

**Edits (2026-07-03):** slide 2 gains the self-report scoping ("the numbers are Intercom's own") woven into the Curran sentence — implements the Intercom stamp's flag-self-report fallback in body per the zombie-stat guard; numbers unchanged, no re-verification owed. The geoffintech stamp above is annotated orphaned (body's Ramp claim was cut in the slides-only pass; stamp kept for provenance).

**Cross-file stamp pointer (2026-07-03):** slide 4's triad claim ("pieces practitioners converge on") leans on the source stamps in `curriculum/lectures/what-packaging-is.md` § Source verification (Ronacher MiniJinja stamp — three pieces cleanly inferable; plus the M5 closer's convergence hedge). Not re-stamped here; a per-file stamp audit resolves that claim there.

**Coherence retune (2026-07-05):** slide-1 bullet lead "Naming it is what lets you compose" → "Naming it is what lets you reuse it". `composing-the-workflow.md` was reworked this run into the concrete composition teacher (the passage chart + "a workflow is skills in the right order"), so it now OWNS compose/workflow; this bullet's actual content is reuse/placement (place the primitive on a PR, a nightly run, the next agent, the team kit), not composition. Retune frees "compose" for the sibling and ties the spine to that lecture's "a named move you reach for". Also resolves the closer-chain order seam (composing-the-workflow sits before this lecture; it no longer reads as composition-introduced-after-it-was-taught). eval remains this lecture's owned term; "workflow" survives once in body in the generic "any workflow with a quality bar" sense (not the composed-skills sense), left as-is.

**Re-sequence seam (2026-07-03):** M6 closer chain re-sequenced to loop-has-a-name → the-map-filled-in → agents-that-build-agents (last). Judged the closing kicker a broken coming-up-next tee: its first sentence was the literal `agents-that-build-agents` title, and that lecture no longer follows immediately (the-map-filled-in now sits between). Softened to "The loop feeds itself." — closes on this lecture's own loop-survives-the-model theme, keeps the flywheel + encode-today close verbatim, no specific next-lecture title pre-announced. False adjacency removed; flywheel kept close. The line 36 note's "foreshadow to the next lecture" phrasing now reads as general thematic forward-lean, not a named next beat.
