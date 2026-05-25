# The loop has a name


---

Look at what you just shipped.

The session-shaper you authored. Shape decided by what two runs of the same task actually taught. Not by a template. For most of you it came out as a sharpened verifier. For some as a fresh judge. For a few as a gap-finder that reads the next agent-produced artefact for the shape of failure you saw at M5. Different shapes, same move. The thing you built reads an agent's work and decides whether it meets a bar.

That thing has a name.

## Eval

Your verifier is an eval. Your judge is an eval. Your gate is an eval.

Practitioners call them judges when the check is itself an LLM reading the work. Verifiers when the check is deterministic: tests, lint, compile, a shell hook that returns true or false. Gates when the same check is placed in CI and a pull request can't merge without it. Three names, one thing. All three are evals.

An eval is the automated check that says *this agent-produced thing meets our bar*. That's it. The word carries more weight in the vendor literature than it deserves. In practice it's the verifier you built at M5 and the skill you just shipped at M6. You have been doing evals for two modules.

The same shape fires on any workflow with a quality bar, not only agent runs. A code-review checklist, a deployment gate, an internal-doc rubric. Anywhere you can describe *meets the bar*, you can write the check.

Naming it matters because the word is what lets you compose. Once you see the verifier, the judge, the gate, and the skill as the same primitive, you can place that primitive in more places. On a pull request. On a nightly run. On the next agent that does the same class of work. On the team's shared kit.

## The shape it grows into

Darragh Curran runs engineering at Intercom. In April he published a post called *"2x, nine months later."* The numbers are concrete. 19.2% of pull requests are auto-approved with no human reviewer. Those PRs merge in 14.6 minutes versus an org median of 75.8 minutes. 86% of the auto-approved PRs are 20 lines or fewer. The R&D org is around 470 people inside a 1,300-person company.

Read that as your verifier from M5, scaled. Same primitive. An automated check that says *this meets the bar.* Placed in CI, fed by convention, trusted by a human team that set the thresholds. The shape doesn't change when the org gets big. Only the number of evals, the number of places they sit, and the number of engineers contributing to the kit.

## The primitive that runs on cadence

One thing your skill can do that you did not try today: run on a schedule.

Claude Code ships three scheduling primitives. Local routines (from the Routines sidebar) for standing work on your laptop. `/loop` for in-session repetition. `/schedule` for cloud-backed remote Routines. The choice depends on what you want watched. The pattern is the same: the skill you just wrote is the thing the scheduled agent invokes.

Three places this fits naturally. A standing verifier run: the judge reads the most recent long-running send-off and has a summary waiting when you open the laptop. A scheduled codebase sweep: the gap-finder reads the repo for the drift shape you saw at M5 and opens an issue when it finds one. Rule-drift monitoring: a judge reads the root rules file against the recent commit log and names where the rules and the code disagree.

Keep the primitive in the kit. You do not have to wire it today. You do need to know it exists, because the second you stop thinking of the eval as a one-shot check and start thinking of it as a thing that runs on cadence, your options change. The [Long-running shapes section in Claude Code for engineers](../trainings/agentic-engineering-101/reference/claude-code-for-engineers.md) walks through the four primitives, when each fits, and how a skill plugs into each.

## Why the loop survives the model

The specific Claude you used today will be replaced. Probably within months. Opus 4.7 will be Opus 4.8, then something with a different name. Every one of those models will be better at the work than the current one. None of that changes the move.

The three pieces Ronacher named (reference, plan, verifier) are not model features. The encode loop you ran at M6 (diff, name the gaps, package the learning) is not a model feature. They are a stance toward a thing that does not behave deterministically. Reference because the agent forgets. Plan because the window fills. Verifier because plausible-but-wrong is the default failure mode of a statistical machine. Encode because a lesson learned once and not written down gets learned again next week.

That stance survives every model change. Practitioner fluency lives in the stance, not in the tooling. When the next model ships, you will open the same kit, point it at the same three pieces, and run the same loop. The work gets faster. The method does not.

## Where this goes next

**Agents that build agents.** That is the flywheel. It starts with what you encoded today.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-15 (writing@1ff6f8a story@1ff6f8a technical@1ff6f8a behavior@1ff6f8a pedagogy@1ff6f8a strategy@1ff6f8a)
- judges @1ff6f8a: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Lecture meta:** *15–18 min closing lecture for AE101 M6. Names evals with full weight from the skill you just authored. Forward-looking register — closes core AE101, bridges to Monday-morning or to M7 depending on the room.*
**Word count:** ~950 words body.

**Time:** 15–18 min at presentation pace.

**Delivery mode:** In-room close after Debrief.

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**

- `[checked:2026-05-25 result:CAVEAT due:2026-11-25]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran 2026-04-16: 19.2%/14.6 vs 75.8/86% ≤20 lines, ~473 R&D in 1,305. "Runs engineering" phrasing avoids the title nit. fallback: keep numbers, attribute Intercom's published telemetry, flag self-report.
- `[checked:2026-05-25 result:CAVEAT due:2026-11-25]` https://x.com/geoffintech/status/2042002590758572377 — [practitioner direct] Charles CPO; author + date (April 8 2026) verified via X oEmbed 2026-05-25, but that status is a link-only post — the "models were good enough, the harness wasn't" quote + 350+ Dojo live in the thread/linked piece, confirmed via observations/ramp.md. fallback: attribute the verbatim Charles line from the observation file; if number contested, use "hundreds of skills."

**Watch-fors (delivery):**
- Mood stays practitioner-fluency. If the Ramp and Intercom numbers land as vendor-plug ("here's what the big co does, aspire to that"), the mood slips into compliance-feel. They are anchors of the destination shape, not product placements. Pace accordingly.
- "One word" beat is the earning moment for *eval*. Don't rush it. The student has just built the thing; the word lands because the thing is already in hand.
- Scheduled-agents stays a callout, not a mini-lecture. Three places it fits, one reference-page pointer, move on. If the section grows past 90 seconds in rehearsal, cut.
- Monday-morning vs. M7 bridge — both are shipped in the lecture. The trainer or the room picks which lands.
- Risto voice on "the specific Claude will be replaced." Flat epistemic honesty, no sales varnish. This is the beat that carries the lecture past the current model's expiry date.

**Philosophy callouts:** at most one. The *compounding* theme (Klaassen's review-and-compound move, visible in the kit-grows-by-accretion beat) surfaces naturally in the Ramp section; no need to name-tag it. Do not bolt the 19 beliefs onto this lecture.

**Vision vs. detail:**
- Vision layer: the one-word naming, the stance-survives-the-model argument, the two-bridge close.
- Detail layer: every URL above, every number, the `/schedule` and `/loop` primitive names, the reference-page pointer.
