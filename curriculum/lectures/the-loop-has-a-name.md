# The loop has a name


---

Close the laptop for a second. Look at what you just shipped.

Your second authored skill. Shape decided by what two runs of the same task actually taught. Not by a template. For most of you it came out as a sharpened verifier. For some as a fresh judge. For a few as a gap-finder that reads the next agent-produced artefact for the shape of failure you saw at M5. Different shapes, same move. The thing you built reads an agent's work and decides whether it meets a bar.

That thing has a name.

## One word

Your verifier is an eval. Your judge is an eval. Your gate is an eval.

Practitioners call them judges when the check is itself an LLM reading the work. Verifiers when the check is deterministic: tests, lint, compile, a shell hook that returns true or false. Gates when the same check is placed in CI and a pull request can't merge without it. Three names, one thing. All three are evals.

An eval is the automated check that says *this agent-produced thing meets our bar*. That's it. The word carries more weight in the vendor literature than it deserves. In practice it's the verifier you built at M5 and the skill you just shipped at M6. You have been doing evals for two modules.

Naming it matters because the word is what lets you compose. Once you see the verifier, the judge, the gate, and the skill as the same primitive, you can place that primitive in more places. On a pull request. On a nightly run. On the next agent that does the same class of work. On the team's shared kit.

## The shape it grows into

Darragh Curran runs engineering at Intercom. In April he published a post called *"2x — nine months later."* The numbers are concrete. 19.2% of pull requests are auto-approved with no human reviewer. Those PRs merge in 14.6 minutes versus an org median of 75.8 minutes. 86% of the auto-approved PRs are 20 lines or fewer. The org is 500 people.

Read that as your verifier from M5, scaled. Same primitive. An automated check that says *this meets the bar.* Placed in CI, fed by convention, trusted by a human team that set the thresholds. The shape doesn't change when the org gets big. Only the number of evals, the number of places they sit, and the number of engineers contributing to the kit.

That is not an aspirational vendor story. That is a post from the person running the org, with numbers.

## The primitive that runs on cadence

One thing your skill can do that you did not try today: run on a schedule.

Claude Code ships three scheduling primitives. Desktop local tasks (invoked from the Schedule sidebar) for standing work on your laptop. `/loop` for in-session repetition. `/schedule` for cloud-backed Routines. The choice depends on what you want watched. The pattern is the same: the skill you just wrote is the thing the scheduled agent invokes.

Three places this fits naturally. A standing verifier run: the judge reads the most recent long-running send-off and has a summary waiting when you open the laptop. A scheduled codebase sweep: the gap-finder reads the repo for the drift shape you saw at M5 and opens an issue when it finds one. Rule-drift monitoring: a judge reads the root rules file against the recent commit log and names where the rules and the code disagree.

Keep the primitive in the kit. You do not have to wire it today. You do need to know it exists, because the second you stop thinking of the eval as a one-shot check and start thinking of it as a thing that runs on cadence, your options change. The scheduled-agents reference page in the content folder walks through the specifics. ([Scheduled agents](../reference/scheduled-agents.md).)

## Why the loop survives the model

The specific Claude you used today will be replaced. Probably within months. Opus 4.7 will be Opus 4.8, then something with a different name. Every one of those models will be better at the work than the current one. None of that changes the move.

The three pieces Ronacher named (reference, plan, verifier) are not model features. The encode loop you ran at M6 (diff, name the gaps, package the learning) is not a model feature. They are a stance toward a thing that does not behave deterministically. Reference because the agent forgets. Plan because the window fills. Verifier because plausible-but-wrong is the default failure mode of a statistical machine. Encode because a lesson learned once and not written down gets learned again next week.

That stance survives every model change. Practitioner fluency lives in the stance, not in the tooling. When the next model ships, you will open the same kit, point it at the same three pieces, and run the same loop. The work gets faster. The method does not.

## Where this goes next

Two bridges. The room picks one.

**Core close.** You walk out of M6 holding the move. Monday morning, pick one multi-hour task from your real backlog. The one you have been avoiding because it is too big to hold in your head. Assemble the reference. Open a `plan.md` the agent owns. Point a verifier at the output. Run. Read the artefact. Name the gap. Encode. That is the training continuing without a trainer in the room.

**Into M7.** If the cohort continues to deliberation, the agent you built across six modules is about to meet other agents. Each engineer brings their stack: their rules, their memory, their skills, their kit. The room deliberates live on a real engineering problem the CTO is actually sitting on. What makes that deliberation work is what you raised together over six modules. The kit is already in the room.

Either way, the loop has a name. Close the laptop. Monday's task is waiting.

<!-- maintainer -->


**Quality:** compendium-audited 2026-04-26 (check_writing — em-dashes cleared L9/L37/L45/L55 + L36 list-introducers swapped to colons; check_student_facing, check_lectures meta-frame closer, check_strategy_tie_in. **check_research_claims:** Curran 19.2%/14.6/75.8/86%/500-people VERIFIED against `https://ideas.fin.ai/p/2x-nine-months-later` 2026-04-16 [practitioner direct] (see `curriculum/evals/instances/ae101-m5-m6-source-verification.md`). **check_platform_and_boundaries:** `/schedule` + `/loop` + Desktop local task primitives confirmed against Claude Code docs 2026-04-26; L34 phrasing tightened to *"Desktop local tasks (invoked from the Schedule sidebar)"* per claude-code-guide verdict.)
**Lecture meta:** *15–18 min closing lecture for AE101 M6. Names evals with full weight from the skill you just authored. Forward-looking register — closes core AE101, bridges to Monday-morning or to M7 depending on the room.*
**Word count:** ~950 words body.

**Time:** 15–18 min at presentation pace.

**Delivery mode:** In-room close after Debrief. Self-study Nerd reads the same content as the M6 closing beat, invites the Monday-morning OR M7 bridge in conversation based on whether the student is continuing.

**Source verification — MUST DO before first cohort. Every URL and number below is currently sourced from internal OODA runs and observation files; each must be opened against the original and confirmed.**

URLs and numbers to verify:
- **Ramp plugin marketplace — "hundreds of skills."** Current strategy doc names 350. Verify against `continuous-research/observations/ramp.md` or a primary Ramp engineering post before delivery. If a specific number holds up cleanly, restore it ("350-skill marketplace"). If no specific post surfaces, keep the generic "hundreds" phrasing used here. Do NOT assert the exact number without a primary source.
- **Ramp "harness was the bottleneck" framing.** Verify the phrasing against a Ramp practitioner post (engineering blog, conference talk, X.com thread). If the exact framing is our synthesis and not theirs, reword as "their engineers' framing converges on: the kit matters more than the model."
- `https://ideas.fin.ai/p/2x-nine-months-later` — Curran *"2x — nine months later."* Confirm: 19.2% auto-approved, 14.6 min vs 75.8 min, 86% ≤20 lines, 500-person R&D scale. Cross-check against `continuous-research/observations/intercom.md`. Freshness check at delivery — must be within six months of cohort date.
- **Scheduled-agents primitives — `/schedule`, `/loop`.** Confirm current Claude Code desktop behaviour via the `claude-code-guide` agent before delivery. Do NOT assert from memory; features land mid-year and training-data recall goes stale. If either primitive has been renamed or the invocation path has changed, update the lecture and the reference page together.

**Frameworks attributed:**
- **Ramp plugin marketplace + "harness was the bottleneck" framing** — Ramp engineering [practitioner direct]. Pin a specific engineer post before delivery.
- **Intercom 2x numbers** — Darragh Curran [practitioner direct, April 2026].
- **Scheduled-agents primitives** — Claude Code platform facts; verify current behaviour.
- **Ronacher's three-pattern (reference, plan, verifier)** — Armin Ronacher [practitioner direct]; named in M5 closer, re-invoked by shorthand here.

**Watch-fors (delivery):**
- Mood stays practitioner-fluency. If the Ramp and Intercom numbers land as vendor-plug ("here's what the big co does, aspire to that"), the mood slips into compliance-feel. They are anchors of the destination shape, not product placements. Pace accordingly.
- "One word" beat is the earning moment for *eval*. Don't rush it. The student has just built the thing; the word lands because the thing is already in hand.
- Scheduled-agents stays a callout, not a mini-lecture. Three places it fits, one reference-page pointer, move on. If the section grows past 90 seconds in rehearsal, cut.
- Monday-morning vs. M7 bridge — both are shipped in the lecture. The trainer or the room picks which lands. For self-study, the Nerd asks which path the student is on and reads only the matching bridge.
- Risto voice on "the specific Claude will be replaced." Flat epistemic honesty, no sales varnish. This is the beat that carries the lecture past the current model's expiry date.

**Philosophy callouts:** at most one. The *compounding* theme (Klaassen's review-and-compound move, visible in the kit-grows-by-accretion beat) surfaces naturally in the Ramp section; no need to name-tag it. Do not bolt the 19 beliefs onto this lecture.

**Vision vs. detail:**
- Vision layer: the one-word naming, the stance-survives-the-model argument, the two-bridge close.
- Detail layer: every URL above, every number, the `/schedule` and `/loop` primitive names, the reference-page pointer.

**TODO (pre-first-cohort):**
- Full source verification per the URL list above.
- Three-persona sim: CTO (does the Ramp/Intercom anchoring read as earned or as vendor-plug?), senior engineer who has used Claude Code for six months (does the "one word" beat land as recognition or as remedial?), engineer who has not used Claude Code beyond M1–M6 of this training (does the scheduled-agents callout stay callout-sized, or grow a need-to-try-now itch that steals the close?).
- Freshness recheck: Intercom post date must be within six months of cohort delivery date; if it ages past the window, promote a newer practitioner-direct source or reframe the org-scale anchor.
- Capability recheck on `/schedule` and `/loop` via `claude-code-guide` within two weeks of any cohort date. Features land mid-year; do not ship the lecture on stale assumptions.
