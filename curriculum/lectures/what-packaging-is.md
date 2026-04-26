# What packaging is


---

Pause for a second. You walked into M5 with an un-packaged run that underdelivered. You read it through three lenses. You named the failures. For each failure, you built the thing that would have caught it. Then you re-sent the same task, packaged this time. The laptop is closed again.

Now the names.

## Ronacher's three-pattern

Armin Ronacher's posts on long-running coding agents over the last six months keep coming back to the same three pieces. Practitioners running multi-hour work converge on the same shape with different vocabulary. Ronacher's vocabulary is the one that stuck.

**Reference artefact.** A spec the agent reads and re-reads. Holds the success criteria, points at the relevant memory, names the constraints. The thing the agent diffs its work against. In Ronacher's MiniJinja port, the original Rust snapshot tests played this role. In your re-send, the reference you assembled at Phase 4 plays it.

**plan.md the agent owns and mutates.** A working document that holds durable state across the run. The agent reads it at every session boot, updates it as it makes decisions, references it when the working window fills. Geoffrey Huntley's Ralph technique builds entire ticket-triage systems on this single primitive.

**External verifier.** An automated check that decides whether a piece of agent-produced work meets a quality bar. Tests, lint, compile, a deterministic shell hook, or a separate background agent that reads the work and judges it. The verifier is the move that catches plausible-but-wrong before you trust it.

Each piece exists because of one of the failure modes you read at the start of M5. Reference artefact catches goal drift (the spec stays readable mid-run). plan.md catches context rot (durable state survives the window). Verifier catches plausible-but-wrong (you don't have to be the one to spot it).

## Three shapes the verifier takes

Boris Cherny (the engineer who built Claude Code) names three shapes practitioners use, cleanly. You picked one at Phase 3 against your dominant failure. The other two are alongside the three-pattern for next time.

**Background-agent verifier.** Separate Claude session reads the produced work and judges it. Right when failures are qualitative ("does this answer the question," "does this match house style").

**Deterministic shell hook.** Tests, lint, type-check, compile, a custom invariant. Right when the failure has a true-false answer ("did it break the build," "did it touch the wrong directory").

**Ralph re-feed.** Loop the prompt with a check baked in; the agent re-runs against its own output until the check passes. Right when drift is the dominant failure and re-anchoring catches it.

## At org scale: Intercom's Tier 1/2/3

Darragh Curran (CTO, Intercom) published a post in April 2026 called "2x — nine months later." His R&D org runs a tiered review structure with auto-approval at the lowest tier. The numbers are concrete. 19.2% of pull requests are auto-approved (no human reviewer). Auto-approved PRs merge in 14.6 minutes versus an org median of 75.8 minutes. 86% of auto-approved PRs are 20 lines or fewer.

That is your verifier from Phase 3, scaled to a 500-person engineering org. Same shape, scaled.

## The 80/20 ratio

You just felt the shape of it. The un-packaged run underdelivered; the packaged re-send of the same task landed. Most of the work that made it land happened before you pressed send. Diagnosing failure modes, mapping validations, building the verifier, assembling reference and plan.md. The run itself was short. Kieran Klaassen names the ratio directly: 80% planning and review, 20% execution. In his words: *"Claude writes the test. The test fails — the natural first step in test-driven development (TDD)"* ([My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it)). The ratio itself is named in [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide). The packaging you just built IS the 80% side. The re-send was the 20%.

## What the run cost

Name it plainly. The re-send consumed some number of hours of Opus time, and those hours are real money on the org's bill. That is the CTO-legible answer to *why bother packaging*. Agent hours are cost to the org the same way engineer hours are. Packaging converts those hours into reliable output instead of reliably wrong output. Without it, you paid for a run that missed the goal; with it, you paid for a run that landed. The ROI calculation is the one you just ran on yourself.

## The counter-camp

Not everyone agrees that the right move is to extend session length. Sourcegraph's Amp (their coding-agent product) explicitly rejects auto-compaction and bets on short focused sessions plus manual handoff between them. The argument: the cleanest context is a fresh one, and the engineer's job is to package the handoff, not to keep one session running.

Two camps, both real. M5 teaches the extend camp because your task wanted it. The handoff camp is also a serious answer. Worth knowing it exists.

## Bridge to M6

The verifier is an eval. If you didn't already call it that, M6 will. An automated check that says *this agent-produced thing meets our bar.*

M6 is where this move scales. Same shape, different question. M5 asks: did my run pass? M6 asks: do all our runs pass, do they pass faster, who reviewed what? Your verifier becomes a judge in the team kit. The kit grows by accretion, one engineer at a time, until the team has the infrastructure Curran's R&D org runs on.

That's M6. The laptop is closed now and the second run is going. Next you will measure the reliability of the verifier you just built. The number is the gap.

<!-- maintainer -->


**Quality:** draft 2026-04-25 (REVISE: pre-cohort source verification on every URL + number per maintainer; confirm Cherny three-shape framing is his vs synthesis; pin Sourcegraph Amp counter-camp to specific practitioner URL)
**Lecture meta:** *10–15 min closing lecture for M5. Names Ronacher's three-pattern after you have built each piece. Earns the name from felt evidence, not from a slide. Bridges to M6's evals-as-team-infrastructure move.*
**Word count:** ~770 words body.

**Time:** 12–15 min at presentation pace.

**Delivery mode:** In-room close after Debrief. Self-study Nerd reads the same content as the M5 Conclusions.

**Source verification — MUST DO before first cohort. Every URL and number below is currently sourced from internal OODA runs and observation files; each must be opened against the original and confirmed.**

URLs to verify:
- `https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/` — Ronacher MiniJinja port. Confirm: the three pieces (reference / plan.md-equivalent / verifier) are explicitly named or cleanly inferable; 10h, 2.2M tokens; Rust snapshot test reuse. *(Source: 2026-04-21 long-running practitioner OODA, `continuous-research/platform-watch/coding-agents/runs/2026-04-21-practitioner-long-running.md` line 11.)*
- Boris Cherny three stop-hook shapes — currently sourced via the same OODA citing `getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually` and `newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny`. Verify: Cherny actually frames three shapes (background agent / shell hook / Ralph re-feed) in the cited interview, NOT paraphrased into existence. If the three-shape framing is our synthesis rather than Cherny's, reframe as "three shapes practitioners use" without single attribution. Verify date is within 6-month window at delivery.
- `https://ideas.fin.ai/p/2x-nine-months-later` — Curran "2x nine months later." Confirm: 19.2% auto-approved, 14.6 min vs 75.8 min, 86% ≤20 lines, 500-person R&D scale. *(Source: `continuous-research/observations/intercom.md`.)*
- Geoffrey Huntley Ralph reference — verify the ticket-triage framing is accurate to his writing, not ours.
- Sourcegraph Amp counter-philosophy — currently sourced via `2026-04-23-scaling-session-length-2-platform-mechanics.md`. Pin a specific Quinn Slack / Beyang Liu / Amp engineering post URL before lecture goes live. If no specific source surfaces, drop the named-product framing and reframe as "a counter-camp argues for short sessions plus manual handoff."
- Subagents-for-isolation + /compact-at-60% — convergent practitioner pattern from `2026-04-23-scaling-session-length-2-platform-mechanics.md`. "Three independent practitioners" claim must be backable when the OODA file is finalised. If the count drifts under post-fix review, reword.

**Numbers to triple-check before delivery:** 10h MiniJinja, 2.2M tokens, 19.2% auto-approve, 14.6 min vs 75.8 min, 86% ≤20 lines, 500-person R&D org.

**Frameworks attributed:**
- **Ronacher's three-pattern** — Armin Ronacher [practitioner direct].
- **Cherny's three stop-hook shapes** — Boris Cherny [practitioner direct]. Verify the shape-count is his framing.
- **Intercom 2x numbers** — Darragh Curran [practitioner direct, April 2026].
- **Ralph technique** — Geoffrey Huntley [practitioner direct].
- **Subagents-for-isolation + /compact-at-60%** — convergent practitioner pattern; no single attribution.
- **Sourcegraph Amp counter-philosophy** — Sourcegraph (vendor); pin a specific practitioner post before delivery.

**Watch-fors (delivery):**
- The opening pause is load-bearing. You just built each piece; this is the moment of recognition. Don't rush it.
- The three-pattern earns its name HERE, not in the pre-read. If a sim shows the closing landing as repetition rather than naming, the pre-read leaked.
- "What you didn't build today" is one beat, not three. Don't expand it; the kit's bigger than the lecture.
- The counter-camp section can land soft. Amp is a real product with real engineers behind a real bet. Don't dunk on it.
- Bridge to M6 is foreshadowing, not summary. Let it linger.

**Philosophy callouts:** none. The naming is the beat; further philosophy tagging dilutes.

**Vision vs. detail:**
- Vision layer: three-pattern as Ronacher's frame, two-camp framing, kit-grows-by-accretion bridge.
- Detail layer: every URL above, every number, the Cherny three-shape claim, the Amp counter-philosophy.

**TODO (pre-first-cohort):**
- Full source verification per the URL list above.
- Three-persona sim including the Greg-persona check: does *"the verifier you built today is the seed of this"* read as condescending or earned?
- Re-check freshness on Cherny interview at delivery time.
- If Sourcegraph Amp counter-philosophy doesn't pin to a specific practitioner post, reframe without the named-product attribution.
