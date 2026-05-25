# What packaging is


---

Pause for a second. You walked into M5 with an un-packaged run that underdelivered. You read it through three lenses. You named the failures. For each failure, you built the thing that would have caught it. Then you re-sent the same task, packaged this time. The laptop is closed again.

Now the names.

## Ronacher's three-pattern

Practitioners running multi-hour coding agents over the last six months converge on the same three pieces. Different posts, different vocabulary, same shape. Armin Ronacher names *reference* and *verifier* in his work; *plan.md* lands harder in Geoffrey Huntley's Ralph practice and Kieran Klaassen's plan-as-artifact. The three-pattern below is what the convergence looks like assembled.

**Reference artefact.** A spec the agent reads and re-reads. Holds the success criteria, points at the relevant memory, names the constraints. The thing the agent diffs its work against. In Ronacher's MiniJinja port, the original Rust snapshot tests played this role. In your re-send, the reference you assembled at Phase 4 plays it.

**plan.md the agent owns and mutates.** A working document that holds durable state across the run. The agent reads it at every session boot, updates it as it makes decisions, references it when the working window fills. Geoffrey Huntley's Ralph technique bootstraps entire greenfield projects on this single primitive.

**External verifier.** An automated check that decides whether a piece of agent-produced work meets a quality bar. Tests, lint, compile, a deterministic shell hook, or a separate background agent that reads the work and judges it. The verifier is the move that catches plausible-but-wrong before you trust it.

Each piece exists because of one of the failure modes you read at the start of M5. Reference artefact catches goal drift (the spec stays readable mid-run). plan.md catches context rot (durable state survives the window). Verifier catches plausible-but-wrong (you don't have to be the one to spot it).

## Three shapes the verifier takes

Three shapes practitioners use. Boris Cherny (who built Claude Code) reaches for all three in his long-running practice; the menu form is the synthesis. You picked one at Phase 3 against your dominant failure. The other two are alongside the three-pattern for next time.

**Background-agent verifier.** Separate Claude session reads the produced work and judges it. Right when failures are qualitative ("does this answer the question," "does this match house style").

**Deterministic shell hook.** Tests, lint, type-check, compile, a custom invariant. Right when the failure has a true-false answer ("did it break the build," "did it touch the wrong directory").

**Ralph re-feed.** Loop the prompt with a check baked in; the agent re-runs against its own output until the check passes. Right when drift is the dominant failure and re-anchoring catches it.

## Hooks always fire

The deterministic shell hook from the menu above is one shape of a runtime primitive worth naming. A hook in Claude Code's hook system fires on a named event: session start, prompt submit, before each tool call, after each tool call, on stop, plus a few more. The runtime fires the script; the agent has no say in whether it runs.

That matters because the LLM is forgetful. Drift, half-remembered rules, the longer the session runs the less you can trust the agent to hit a step that "should" happen every time. Hooks don't forget.

Practitioner convention. Must happen → hook. Recommended → prompt or rule. Anything that breaks the work if it skips belongs in a hook (the verifier you just wrote; a pre-commit guard; a session-start context loader). Anything taste-shaped or context-dependent stays in a prompt where the LLM weighs it. Hooks are the runtime's "I will not forget." Bought at the cost of flexibility, given to the work that demands certainty.

The canonical examples carry the shape. Your repo has its own demands that don't show up in someone else's article. The verifier you built was one hook against one failure; the same primitive maps to more.

Open the session where you built the verifier. Ask Claude to propose five hooks tied to this repo and the work you just did, beyond formatting and linting.

{{prompt:what-packaging-is-1}}

Read what comes back. The ones worth keeping are tied to a specific file, convention, or failure mode in this repo, not a generic team-could-want-this.

## What you didn't build today

**Subagents for isolation.** When a phase of a long task wants a sandbox, exploring a third-party API, reading untrusted code, doing a search you'd rather not pollute the main session with, spin a subagent and let it return only what matters. The main session stays clean; the subagent's context is discarded after it reports. Adjacent move to the verifier; same instinct: keep the long-running thread coherent by routing the noisy work elsewhere.

**Context for long runs is one of the murkier places.** Some practitioners suggest manual `/compact` at around 60%. Some go the full subagent route to keep the main session clean. Some rely on the 1M context window and don't compact at all. The original Ralph reconstructs fresh sessions continuously, letting each one give up and rebuilding from the durable state. Some split plan-mode from execute-mode entirely, planning in one session and running a fresh one against the written plan. Different shapes for different jobs; the field hasn't converged.

## At org scale: Intercom's Tier 1/2/3

Darragh Curran (CTO, Intercom) published a post in April 2026 called "2x, nine months later." His R&D org runs a tiered review structure with auto-approval at the lowest tier. The numbers are concrete. 19.2% of pull requests are auto-approved (no human reviewer). Auto-approved PRs merge in 14.6 minutes versus an org median of 75.8 minutes. 86% of auto-approved PRs are 20 lines or fewer.

That is your verifier from Phase 3, scaled to a 500-person engineering org. Same shape, scaled.

## The 80/20 ratio

You just felt the shape of it. The un-packaged run underdelivered; the packaged re-send of the same task landed. Most of the work that made it land happened before you pressed send. Diagnosing failure modes, mapping validations, building the verifier, assembling reference and plan.md. The run itself was short. The ratio practitioners take from Kieran Klaassen's compound-engineering posture: roughly 80% planning and review, 20% execution. The TDD shape carries it, Klaassen (August 2025): *"Claude writes the test. The test fails, the natural first step in test-driven development (TDD)"* ([My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it)). The packaging you just built IS the 80% side. The re-send was the 20%.

## What the run cost

Name it plainly. The re-send consumed some number of hours of Opus time, and those hours are real money on the org's bill. That is the CTO-legible answer to *why bother packaging*. Agent hours are cost to the org the same way engineer hours are. Packaging converts those hours into reliable output instead of reliably wrong output. Without it, you paid for a run that missed the goal; with it, you paid for a run that landed. The ROI calculation is the one you just ran on yourself.

## The counter-camp

Not everyone agrees that the right move is to extend session length. Sourcegraph's Amp (their coding-agent product, October 2025) explicitly rejects auto-compaction and bets on short focused sessions plus manual handoff between them. The argument: the cleanest context is a fresh one, and the engineer's job is to package the handoff, not to keep one session running.

Two camps, both real. M5 teaches the extend camp because your task wanted it. The handoff camp is also a serious answer. Worth knowing it exists.

## Bridge to M6

The verifier is an eval. If you didn't already call it that, M6 will. An automated check that says *this agent-produced thing meets our bar.*

M6 is where this move scales. Same shape, different question. M5 asks: did my run pass? M6 asks: do all our runs pass, do they pass faster, who reviewed what? Your verifier becomes a judge in the team kit. The kit grows by accretion, one engineer at a time, until the team has the infrastructure Curran's R&D org runs on.

That's M6. The laptop is closed now and the second run is going. Next you will measure the reliability of the verifier you just built. The number is the gap.

<!-- maintainer -->


**Quality:** compendium-audited 2026-05-21 (writing@2b5ae1b story@2b5ae1b technical@2b5ae1b behavior@2b5ae1b pedagogy@2b5ae1b strategy@2b5ae1b)
- judges @2b5ae1b: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
- source-freshness stamped 2026-05-25 (stamps in Source verification block; run `source-freshness.sh --target <cohort-date>`).
**Lecture meta:** *10–15 min closing lecture for M5. Names Ronacher's three-pattern after you have built each piece. Earns the name from felt evidence, not from a slide. Bridges to M6's evals-as-team-infrastructure move.*
**Word count:** ~770 words body.

**Time:** 12–15 min at presentation pace.

**Delivery mode:** In-room close after Debrief.

**Source verification — freshness stamps. `source-freshness.sh --target <cohort-date>` reads these; grammar + result vocab in `curriculum/source-freshness-format.md`. due = re-open-by date (source ages out of the 6-month window, or `none` for dated-historical, `cohort` for capability, `asap` for open gaps).**

- `[checked:2026-05-25 result:OK due:2026-07-14]` https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/ — [practitioner direct] Ronacher MiniJinja Rust→Go port (2026-01-14): snapshot tests as verifier, 10h / 2.2M tokens, three pieces cleanly inferable. fallback: cite as named-practitioner long-run with reused test-suite-as-verifier, drop the exact numbers.
- `[checked:2026-05-25 result:OK due:2026-08-21]` https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually — [practitioner analysis] Kim on Cherny (2026-02-21): Kim's "13 tips" writeup lists Cherny reaching for background-agent / agent-stop hook / Ralph re-feed. The three-shape taxonomy is KIM'S synthesis, NOT Cherny's own, and is ABSENT from the Orosz/Pragmatic Engineer interview. Body credits Cherny as a practitioner who uses all three, not as the taxonomy's author. fallback: present the three shapes as a practitioner-convergent menu, no single attribution.
- `[checked:2026-05-25 result:OK due:2026-10-16]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran (2026-04-16): 19.2% auto-approved, 14.6 vs 75.8 min, 86% ≤20 lines, ~473 R&D / 1,305 total. Metrics vendor-self-reported. Body L56 says "CTO" — his title is VP Engineering; soften at delivery. fallback: keep the numbers, attribute "Intercom's published telemetry," flag self-report.
- `[checked:2026-05-25 result:OK due:none]` https://ghuntley.com/ralph/ — [practitioner direct] Huntley (2025-07-14): Ralph is greenfield-only ("no way in heck would I use Ralph in an existing code base"), a Bash loop over durable markdown; NO ticket-triage. Dated-historical (body cites as technique-origin). Body L16 corrected to "greenfield projects." fallback: cite as origin of the loop-prompt-over-durable-state technique, drop any application claim.
- `[checked:2026-05-25 result:OK due:none]` https://ampcode.com/news/handoff — [practitioner direct, vendor] Amp (2025-10-23): rejects auto-compaction, bets on focused threads + manual handoff. Dated-historical (body inline-dates Oct 2025). fallback: name the handoff camp generically, drop the product name; escalate to a fresher Amp post if the stance shifts.
- `[checked:2026-05-25 result:OK due:none]` https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it — [practitioner direct, vendor venue] Klaassen (2025-08-18): TDD "the test fails—the natural first step in test-driven development (TDD)" verbatim; 10-consecutive-runs + parallel feedback agents confirmed. Dated-historical (body inline-dates Aug 2025). fallback: paraphrase the TDD-first move, drop the verbatim.
- `[checked:2026-05-25 result:OK due:2026-07-30]` https://every.to/source-code/compound-engineering-how-every-codes-with-agents — [practitioner direct] Shipper & Klaassen (Jan 2026): "Roughly 80 percent of compound engineering is in the plan and review parts, while 20 percent is in the work and compound." THIS is the 80/20 primary — NOT the Definitive Guide, which lacks it. Body L62 hedges as "the ratio practitioners take from Klaassen's posture"; defensible, this URL backs it. fallback: keep the posture hedge.
- `[checked:2026-05-25 result:OK due:cohort]` (no URL — convergent practitioner pattern; internal OODA `2026-04-23-scaling-session-length-2-platform-mechanics.md`) — [convergent] /compact-at-~60% + subagent isolation. Body L52 hedges "some practitioners" with no count claim — supportable. fallback: keep "some practitioners."
- `[checked:2026-05-15 result:OK due:cohort]` https://code.claude.com/docs/en/hooks — [capability] hook events (SessionStart / UserPromptSubmit / PreToolUse / PostToolUse / Stop) fire on every named event; live-tested vs this repo's `.claude/settings.json` + Claude Code 2.1.142. fallback: inline the event list from a re-test.

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
