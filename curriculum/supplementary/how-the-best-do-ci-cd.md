# How the best do CI/CD at agent scale

*Supplementary reference for AE101. Referenced from Module 6. Audience: CTOs and platform/staff engineers at orgs scaling agentic coding. Assumes you have lived M6.*

## If you think this is a tooling decision, you are in the wrong room

Most CTOs walking into the agent era treat CI/CD as a tooling question. Which pipeline runner, which deployment tool, which test framework. That is the 2019 conversation. The 2026 conversation is a systems-throughput question: can your review + merge + deploy + observe loop keep up with engineers who ship 20 to 30 agent-drafted PRs per day?

For most orgs, the straight answer is no. Not because the pipes are wrong. Because the humans-in-the-loop assumptions baked into every pre-merge gate were written for a world where a senior engineer read every diff. That world is gone. An engineer at Intercom's pace cannot read 93.6% of their own output line-by-line ([Darragh Curran / practitioner direct](https://ideas.fin.ai/p/2x-nine-months-later)). A reviewer cannot, either. Something has to give.

The gap between agent throughput and review/merge/deploy capacity is where this piece lives. The answer is not *faster CI*. The answer is *rethinking what humans are for, what gates are for, and what post-merge infrastructure now has to catch*. You will pay for this somewhere. Better to pay on purpose than by accident.

## The six forces at play

Six forces bend an agent-scale CI/CD loop in ways a pre-agent loop never had to handle. Get any one of these wrong and the others start compensating badly.

**Throughput decouples from merge rate.** Agents ship code fast. Your review queue grows at the same rate. If merge capacity is flat, the queue is where agent productivity gets destroyed and morale follows. Intercom's 19.2% auto-approval rate on the smallest, lowest-risk PRs is a direct response to this: the smallest slice of the queue, automated, pulls the median down for everyone ([Curran / practitioner direct](https://ideas.fin.ai/p/2x-nine-months-later)).

**Blast-radius stratification.** A CSS tweak and an auth change do not deserve the same gate. One gate for both means either the tweak takes too long or the auth change ships too loose. Tiered gating sorts PRs by what could go wrong, not by who wrote them.

**Eval-latency as throughput tax.** A 15-minute CI run feels fine when a human is stepping away for coffee. When an agent is waiting, 15 minutes is idle compute plus context loss plus a forced switch to another task. Eval latency is now a direct tax on agent leverage. Fast evals are not a nice-to-have; they are the pipeline's throughput floor.

**The eval-of-evals problem.** Judges drift. Verifiers rot. A test suite that passed everything last quarter may have been silently relaxing its assertions. Someone has to check the checker, and the someone has to be another agent, because no human has time. You are now running evals on your evals, and the recursion has to end somewhere the CTO signs off on.

**Drift across local → CI → prod.** Agent writes code that passes on its laptop. CI sees a different truth. Prod sees a third. Each environment carries its own assumptions, and agents are less forgiving of drift than humans because they do not know to ask *"wait, does this even run in staging?"* Environmental parity stops being a hygiene concern and becomes a safety concern.

**Attribution and ownership of agent-drafted merges.** Who owns the 3am page when a Claude-drafted change breaks prod? The engineer who approved it? The team that owns the service? The platform team that built the verifier? An answer has to exist on Monday, not be argued about at 3am on Saturday.

## Human review, but not the naive version

The reflex response is *"add more reviewers, add more rigor."* Wrong instinct. You cannot out-review agent throughput with more humans. You can only out-design it with tiered gates.

Intercom's shape is the clearest public version. PRs are stratified by blast radius. The lowest-risk tier (feature-flag cleanups, small bug fixes, narrow changes) goes through agent-drafted, agent-reviewed, tests-passed, verifier-green, and auto-merges with no human. 19.2% of merges now go this path. The cycle time is 14.6 minutes, against a 75.8-minute org median. 86% of these PRs are 20 lines or fewer ([Curran / practitioner direct](https://ideas.fin.ai/p/2x-nine-months-later)).

The higher tiers still involve humans. But the human role changes. You are not reading 30 diffs a day line-by-line. You are reading *patterns*. You approve architectural deltas, override when instinct fires, reject when something smells wrong. This is design review, not line review. A different skill than what most senior engineers trained for, and a different skill than most review checklists assume.

Name the move clearly: *"I am not pretending to have read every diff. I am approving the pattern and the blast radius."* If the team cannot say that out loud, the gate is theatre. Theatre gates slow throughput without catching anything.

## Pace: fast forward requires fast reverse

Most orgs get this arrow backwards. They feel the speed, panic, and invest in more pre-merge gates (more tests, more reviewers, more steps before the merge button). This makes the pipeline slower without making prod safer, because the bugs agents ship are rarely the bugs pre-merge gates catch.

The sweet pace is not *as fast as possible*. It is *fast enough that correction cost stays low*. Two conditions make correction cheap: reverts are trivial and observability catches bad merges in minutes. If both hold, you can run hot. Ship fast, revert faster, sleep fine. If either breaks, you cannot, and the answer is to fix revert-speed and observability first, then open the throttle.

This flips the investment priority. Most teams are over-invested pre-merge and under-invested post-merge. Reallocate. The post-merge loop is where agent-scale velocity actually gets paid for.

There is also a social pace gap the CTO should watch. An engineer running hot for a week while the rest of the team runs cold will find their PRs piling up and the team resenting the velocity. That is a culture problem, not a CI problem. But it shows up as a CI problem first (review queues lengthening, merges slowing, morale dropping) and gets misdiagnosed as a tooling issue. If the whole team is not shifting pace together, the fastest engineer becomes the bottleneck for everyone else's goodwill.

## Anchor cases

Three named operations to study. Each answers a different question.

**Intercom: Tier 1/2/3 review as auto-merge gate.** 93.6% of PRs are agent-drafted; 19.2% auto-approve at the lowest tier; auto-approved PRs merge in 14.6 min against a 75.8-min org median; 86% of auto-approved PRs are 20 lines or fewer ([Curran, *2x nine months later* / practitioner direct](https://ideas.fin.ai/p/2x-nine-months-later)). The move to study: how the criteria for each tier get defined and evolved, and how auto-approval scope expanded methodically from the safest slice outward.

**Ramp: Dojo as skill marketplace.** 350+ skills shared across 99.5% AI-active team, 84% using coding agents weekly, 12% of production PRs opened by non-engineers ([Geoff Charles / practitioner direct](https://x.com/geoffintech/status/2042002590758572377)). Dojo matters for CI/CD because the skills that earn their way into the marketplace are the skills that then show up in PRs. The merge gate becomes a filter on which skills can ride into production, not just which lines of code. If your CI cannot reason about skills-as-artifacts, your agents are shipping without traceable authorship.

**Every Inc / Kieran Klaassen: 14-agent parallel review.** Klaassen runs 14 specialised reviewer agents in parallel over each PR (security, performance, architecture, style, and so on). Each finding spawns a dedicated per-comment agent that resolves it. Learnings back-feed into `CLAUDE.md` / `AGENTS.md` and skill files so the next PR starts smarter ([*Compound Engineering: The Definitive Guide* / practitioner direct](https://every.to/source-code/compound-engineering-the-definitive-guide)). This is the clearest public version of the fan-out reviewer pattern and the compounding memory loop on top of it. The company is small (10 people, 5 products), which means the operating model transfers as a pattern, not as a turnkey system. The pattern is the point.

A fourth candidate worth tracking: Cursor's own internal engineering CI story, if a citable practitioner-direct account surfaces. Flagged in the maintainer block.

## What a CTO should ask on Monday

Seven questions. If you cannot answer six of them, the conversation is not about agents yet. It is about instrumentation.

1. What is our median PR merge time for agent-drafted PRs, and how does it compare to the lowest-risk tier?
2. What percentage of merges are revertible in under 10 minutes without engineer intervention?
3. Who owns the 3am page when an agent-drafted change breaks prod: the approver, the service team, or the platform team?
4. Do we gate by blast radius, or by file count? (File count is a lazy proxy.)
5. How stale are our eval judges, and when was the last time a human sampled their verdicts against ground truth?
6. What is the false-positive and false-negative rate on our verifiers, and which direction are we biased?
7. If we raised the auto-merge threshold by one tier, what would break first: review coverage, revert speed, or observability?

## Where this fits in the AE101 arc

M6 taught you the loop at IC scale: spot the gap, build the eval, close the loop on your own code. This supplementary is the org-scale version. Evals as CI infrastructure at PR-gate scale, which is the question M6 pointed toward at its close. The shift is not conceptual. The shift is who is reading the output and what the blast radius is when the loop fails. Once you own the loop at your own desk, the next gate up is the one where your agent-drafted PR meets the rest of the org.

<!-- maintainer -->

**Status:** Pass 1 authored 2026-04-24. Source spec: `curriculum/content-strategy-agentic-engineering-101.md` § "Supplementary material (planned)" item #5.

**Source verification — MUST DO before first cohort:**

1. **Open against original** — verify every URL loads and says what we claim it says:
   - Curran, *"2× — nine months later"* — [ideas.fin.ai/p/2x-nine-months-later](https://ideas.fin.ai/p/2x-nine-months-later) [practitioner direct]
   - Charles, Ramp post — [x.com/geoffintech/status/2042002590758572377](https://x.com/geoffintech/status/2042002590758572377) [practitioner direct]
   - Klaassen / Every, *Compound Engineering: The Definitive Guide* — [every.to/source-code/compound-engineering-the-definitive-guide](https://every.to/source-code/compound-engineering-the-definitive-guide) [practitioner direct]

2. **Triple-check every load-bearing number:**
   - Intercom: 93.6% agent-drafted, 19.2% auto-approved, 14.6 min vs 75.8 min median, 86% of auto-approved are ≤20 lines — all from Curran's post, single source. Re-verify.
   - Ramp: 350+ skills in Dojo, 99.5% AI-active, 84% using coding agents weekly, 12% non-engineer PRs — all from Charles's post, single source. Re-verify.
   - Every/Klaassen: "14-agent parallel review" — language used in `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md` citing the Every definitive guide. Open the guide and confirm the count is 14 and not a paraphrase.

3. **Freshness re-check** — 6-month rule per `check_research_claims.md` § 2. All three sources were last pulled 2026-04-09 through 2026-04-21. Re-check at first-cohort delivery; if any source is older than 6 months at delivery, mark as dated or find a newer practitioner-direct replacement.

4. **Fallback framing if a source does not hold at verification:**
   - If the Klaassen "14" number is not in the primary source, reframe as *"a fan-out reviewer panel (Klaassen at Every reports around a dozen specialist reviewer agents)"* without the exact count.
   - If Intercom tier percentages have shifted since the Curran post, cite them with the post date and the *"as of April 2026"* qualifier.
   - If Charles's Ramp Dojo number has moved, cite it as *"350+ at time of writing (Charles, April 2026)"*.

**Open TODOs:**

- [ ] Confirm Cursor-the-company's own internal engineering CI story has a usable practitioner-direct URL. If yes, add as a fourth anchor case. If not, leave the current three.
- [ ] Freshness check on Intercom (Curran) and Ramp (Charles) numbers before first cohort delivery — these are single-source claims from April 2026 that may move before delivery.
- [ ] First-cohort read-through: confirm the opening frame lands for a CTO audience and does not read as lecture. Skeletal sections (the CTO Monday checklist) likely want sharpening from first-cohort pushback.
- [ ] Confirm `[practitioner direct]` is the right label on the Ramp X.com post vs. `[practitioner direct / social post]` if we later formalise that distinction.

**Iteration log:**

- 2026-04-24: Pass 1 authored. Structure follows source spec in `content-strategy-agentic-engineering-101.md` § "Supplementary material (planned)" item #5 verbatim in intent. Six forces named, three anchor cases cited, seven-question CTO checklist landed. All source claims carry URL + practitioner-direct label. No [SOURCE NEEDED] flags at write time — all anchor-case numbers trace to existing observations/ or platform-watch/ files. Open TODOs logged for ship-time verification.
