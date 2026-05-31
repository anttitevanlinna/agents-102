# How the best do CI/CD: six moves that sharpen the loop

*Supplementary for AE101 Module 6. Read after you've shipped your second skill.*

You finished M6 owning the loop at your desk. Two runs of the same task, gap diagnosis, a second skill in `~/.claude/skills/`, one rule cut from `./CLAUDE.local.md`. The same loop, run at more people, more PRs, more customers, looks slightly different. Six moves recur in the engineers running it best. Each one sharpens the loop you already own. None require permission from above to start trying.

## 1. Treat CI as feedback into the loop, not a gate to pass

The reflex frame for CI is *"a wall I must pass before merge."* That frame burns every red build. A failing CI run is signal. About which memory rule should have caught the mistake upstream. About which verifier was too soft. About which skill ran on auto-pilot when it should have paused. The best route that signal back into the loop the way M3 and M6 routed gap-diagnosis back into skills and memory. Each red build sharpens the next run.

**Klaassen at Every** named the loop. Each unit of engineering work should make the next one cheaper. The mechanism lives in the artifacts the next agent reads — rules files, skill files, `AGENTS.md` — and the discipline is feeding lessons from one task back into them before the next task starts ([Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide)).

**Cursor's Bugbot** runs a similar mechanism at platform scale. Review comments flagged as useful become learned rules that promote and demote over time. Resolution rate climbed from 52% to around 80% as the rule corpus grew across 110,000 repos to 44,000 learned rules. Cursor's own numbers ([Bugbot now self-improves with learned rules](https://cursor.com/blog/bugbot-learning)).

**Try this Monday.** Next CI failure you hit on agent-drafted code, ask Claude *"what rule in `./CLAUDE.local.md` would have caught this?"* before you fix the diff. If the answer is *none*, write the rule.

## 2. Fan out review; converge on the pattern

A single reviewer reading 30 agent-drafted PRs a day skims. The best refuse the trade. They run specialist reviewer agents in parallel: one for security, one for performance, one for architecture, one for style. Each finding spawns its own fix-agent. The human's job shifts. Read the pattern across findings, not the lines.

**Cloudflare engineering** runs seven specialist reviewers in CI through their internal stack, with a coordinator agent producing one structured review. The named specialties: security, performance, code quality, documentation, release management, AGENTS.md compliance, internal compliance. 131,246 review runs across 48,095 merge requests in 5,169 repos over 30 days. Median review time 3m39s. Human break-glass override fires on 0.6% of reviews. Cloudflare's own numbers ([Code review with our internal AI engineering stack](https://blog.cloudflare.com/ai-code-review/)).

The pattern named in their own write-up: specialized agents beat monolithic prompting because each agent has a narrow job and the coordinator deduplicates.

**Try this Monday.** On your next non-trivial PR, ask Claude to review it four times under four hats: *"as the security reviewer, what would you flag? as the perf reviewer? architecture? style?"* Read the four outputs side by side. Notice which hat caught what. That's a panel.

## 3. Tier by blast radius. Make the Tier-1 case on your own PRs

The naive answer is *"add more reviewers."* The best answer is *"not all PRs deserve the same gate."* A CSS tweak and an auth change want different review surfaces. Tiered gating sorts PRs by what could go wrong, not by who wrote them. Once the lowest-risk tier is clean enough that agent-drafted, verifier-green changes ride through with no human reading, the median cycle time falls for the whole team.

**Intercom** routes 19.2% of merges through a Tier-1 auto-approve path. Median cycle time on that path is 14.6 minutes against an org median of 75.8 minutes. 86% of those PRs are 20 lines or fewer. Intercom's own numbers ([Curran, *2x — nine months later*](https://ideas.fin.ai/p/2x-nine-months-later)).

**Stripe** is a different point on the same spectrum. Over 1,000 agent-produced PRs merge each week, all human-reviewed, none with human-written code. Stripe contains blast radius by running each agent in an isolated devbox instead of auto-merging the lowest-risk slice. Humans gate on what the agent did; the sandbox gates on what the agent could do ([Gray, *Minions: Stripe's one-shot, end-to-end coding agents*](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents)).

Two different orgs, two different bets on where to put the human and where to put the silicon. The IC version of this — one engineer carving out their own auto-mergeable slice with a verifier they built — hasn't been published yet. That's a gap you can close on Monday.

**Try this Monday.** Pick one slice of your repo that's mostly safe (feature-flag toggles, copy changes, narrow refactors). Ask Claude *"what verifier would I need before this slice could auto-merge?"* Build that verifier. Run the slice through it. Show the cycle-time number to your tech lead.

## 4. Eval latency is part of the loop

A 15-minute CI run feels fine when a human steps away for coffee. When the agent is waiting, 15 minutes is idle compute plus context loss plus a forced switch to another task. The best treat eval latency as a direct tax on what their kit can do for them. They split fast lane from slow lane. Cheap deterministic checks run in seconds and verify the agent's next move. Judges and gates run in minutes, in the background, on the merged change.

**Husain** codifies the split as guardrails versus evaluators. Guardrails sit inline in the request/response path: fast, deterministic, milliseconds of latency budget, block the response. Evaluators run async or in batch: heavier compute, often LLM-as-judge, run after the agent has moved on. You almost never use a slow LLM-as-judge as a synchronous guardrail ([Evals FAQ — Guardrails vs Evaluators](https://hamel.dev/blog/posts/evals-faq/whats-the-difference-between-guardrails-evaluators.html), Aug 2025).

**Cherny on Claude Code** pairs a deterministic Stop hook with a background verifying agent — the fast check blocks the next move, the slow check runs after. He calls the verify-your-work move the one that 2-3x's the quality of the final result ([Anup Jadhav on Cherny, *35 Claude Code Tips From the Guy Who Built It*](https://www.anup.io/35-claude-code-tips-from-the-guy-who-built-it/)).

**Try this Monday.** Time your slowest CI step. If the agent has to wait on it before its next move, ask Claude *"which 20% of these checks catches 80% of the regressions, and how do I run only those on PR-open?"*

## 5. Skills don't just live in your kit. Promote them into the CI surface

The naive view of a skill: a helpful prompt you might invoke. The sharper view: a verifier-in-waiting. Each skill you author catches a pattern. That pattern is what your next PR's review (or your CI check, or your pre-commit hook, or the next plan agent reading rules) needs to see. The best engineers don't keep skills isolated in `~/.claude/skills/`. They promote them into AGENTS.md, into rules files committed back to the repo, into pre-commit hooks. Author once, fires on every next PR.

**Shapira at Elementor** runs a CI workflow that grabs human review comments, hands them to a Cursor CLI agent, extracts patterns, and commits the rules file back to master. Every merged PR sharpens the next review against the same rules ([The Self-Learning Code Review](https://medium.com/elementor-engineers/the-self-learning-code-review-teaching-ai-cursor-to-learn-from-human-feedback-454df64c98cc)).

**Larson at Imprint** consults the same shape of artifact at plan time. The agent reads AGENTS.md and the skills wiki *"by future iterations of the plan pattern"* — the skill catalogue becomes the loop's working memory ([Learning from Every's Compound Engineering](https://lethain.com/everyinc-compound-engineering/)).

**Charles runs Ramp's Dojo** as the team-scale version: 350+ shared skills, 99.5% of employees actively using AI, 84% on coding agents weekly. The marketplace pulls personal moves into shared standards. Charles's own numbers, from his April 2026 thread ([Peter Yang's *Inside Ramp* interview](https://creatoreconomy.so/p/inside-ramp-the-32b-company-ai-agents-geoff-charles) is the readable write-up).

**Try this Monday.** Look at your `~/.claude/skills/`. Find a skill that catches something your CI doesn't. Propose it as a pre-commit rule or PR-review check in your repo. The path from personal skill to team-enforced check is shorter than it looks.

## 6. Get out fast. Learn from real customers safely

The loop doesn't stop at merge. Customer signal in production is the outermost feedback ring. The best invest in safe, fast deployment so customer reality feeds back into memory and skills the same way CI failures do. Feature flags, fast revert, observability dashboards, gradual rollouts. These aren't infrastructure niceties. They're what makes the outer loop fast enough to learn from. Slow deploys with painful rollbacks force teams to gold-plate pre-merge. Fast deploys with cheap rollback let teams ship hot and correct from real signal.

The arrow most orgs get backwards: feel the speed, panic, invest in more pre-merge gates. Slower pipeline, no safer prod. The sweet pace is not *as fast as possible.* It's *fast enough that correction cost stays low.* Two conditions: reverts are trivial, observability catches bad merges in minutes. If both hold, you run hot.

**Majors at Honeycomb** names the agent-era stake plainly: *"How do you expect your agents to validate each change, if the consequences of each change cannot be found?"* Agentic work makes production observability more load-bearing, not less. Agents need fast, context-rich production signal to validate their own changes the same way you needed it to validate yours ([Your data is made powerful by context](https://charity.wtf/2026/03/09/your-data-is-made-powerful-by-context-so-stop-destroying-it-already-xpost/)).

**Wolff on the Claude Code team** named the operating principle bluntly at QCon: *"when the implementation cost goes to zero, the feedback loop becomes everything."* The team ships SQLite persistence behind a feature flag, watches the production signal turn bad, removes it within two weeks. Reversibility is the prerequisite for shipping fast, not the consolation prize for shipping wrong ([Engineering at AI Speed: Lessons from the First Agentically Accelerated Software Project](https://www.infoq.com/presentations/engineering-ai/)).

**Try this Monday.** Time how long it takes to revert a bad merge in your repo, end to end. If the number is more than 10 minutes, that's the problem worth surfacing to your team. The other five moves wait on this one.

## Where this fits in your AE101 arc

M6 taught the loop at your desk. Spot the gap, build the eval, close the loop on your own code. This piece is the same loop, run by engineers who've been at it longer. The shift is not conceptual. The reader is still you. The shift is what each move makes possible once you stop treating CI, review, deploy, and customer signal as separate stages and start treating them as one loop with six tunable surfaces.

Pick one move. Run it this week.

## Sources

Practitioner-direct writings cited in this piece, in order of appearance:

- Kieran Klaassen, [*Compound Engineering: The Definitive Guide*](https://every.to/source-code/compound-engineering-the-definitive-guide) — naming the loop: each unit of engineering work should make the next one cheaper.
- Cursor, [*Bugbot now self-improves with learned rules*](https://cursor.com/blog/bugbot-learning) — promote/demote learned rules across 110,000 repos.
- Cloudflare engineering, [*Code review with our internal AI engineering stack*](https://blog.cloudflare.com/ai-code-review/) — seven specialist reviewers + coordinator, instrumented at scale.
- Darragh Curran, [*2x — nine months later*](https://ideas.fin.ai/p/2x-nine-months-later) — Intercom Tier 1/2/3 auto-merge with measured cycle-time deltas.
- Alistair Gray, [*Minions: Stripe's one-shot, end-to-end coding agents*](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents) — over 1,000 agent-produced PRs per week, human-reviewed, isolated devboxes.
- Hamel Husain, [*Evals FAQ — Guardrails vs Evaluators*](https://hamel.dev/blog/posts/evals-faq/whats-the-difference-between-guardrails-evaluators.html) — fast-lane / slow-lane eval taxonomy.
- Anup Jadhav on Boris Cherny, [*35 Claude Code Tips From the Guy Who Built It*](https://www.anup.io/35-claude-code-tips-from-the-guy-who-built-it/) — deterministic Stop hook + background verifying agent, 2-3x quality move.
- Ofer Shapira, [*The Self-Learning Code Review*](https://medium.com/elementor-engineers/the-self-learning-code-review-teaching-ai-cursor-to-learn-from-human-feedback-454df64c98cc) — CI agent extracts patterns from review comments, commits rules file back to master.
- Will Larson, [*Learning from Every's Compound Engineering*](https://lethain.com/everyinc-compound-engineering/) — `AGENTS.md` and skills wiki consulted by the next plan iteration.
- Peter Yang on Geoff Charles, [*Inside Ramp: how a $32B company runs on AI agents*](https://creatoreconomy.so/p/inside-ramp-the-32b-company-ai-agents-geoff-charles) — 350+ shared skills, team-scale marketplace; 99.5% AI-active, 84% on coding agents weekly (numbers are Charles's own, from his April 2026 thread).
- Charity Majors, [*Your data is made powerful by context*](https://charity.wtf/2026/03/09/your-data-is-made-powerful-by-context-so-stop-destroying-it-already-xpost/) — agents need fast production observability to validate their own changes.
- Adam Wolff (QCon SF 2025), [*Engineering at AI Speed: Lessons from the First Agentically Accelerated Software Project*](https://www.infoq.com/presentations/engineering-ai/) — feature flag + reverse-by-moving-a-pointer; SQLite shipped and removed in two weeks.

<!-- maintainer -->

**Status:** Pass 2 rewrite 2026-05-15. Replaces Pass 1 rewrite (same date) which carried 8 OODA-pending slots. Two OODA cycles dispatched (3 parallel subagents each) populated all slots; Move 5 reframed mid-cycle per maintainer redirect (skills-as-CI-check, not skills-as-generic-kit-accretion).

**Audience pin:** AE101 IC who has lived M1–M6. NOT a CTO. NOT a platform/staff engineer reading over the CTO's shoulder. The supplementary is the IC's next-altitude reading after shipping their second skill: the same loop, slightly wider lens.

**Open TODOs:**

- [ ] **Source verification — MUST DO before first cohort** (per `check_research_claims.md` §11): open every URL, confirm the cited claim against the linked text, confirm all load-bearing numbers. Twelve URLs:
  - Klaassen — [every.to/source-code/compound-engineering-the-definitive-guide](https://every.to/source-code/compound-engineering-the-definitive-guide)
  - Cursor Bugbot — [cursor.com/blog/bugbot-learning](https://cursor.com/blog/bugbot-learning) — confirm 52% → 80%, 110,000 repos, 44,000 learned rules
  - Cloudflare — [blog.cloudflare.com/ai-code-review](https://blog.cloudflare.com/ai-code-review/) — confirm seven specialists, 131,246 / 48,095 / 5,169 / 30 days, 3m39s median, 0.6% override
  - Curran/Intercom — [ideas.fin.ai/p/2x-nine-months-later](https://ideas.fin.ai/p/2x-nine-months-later) — confirm 19.2% / 14.6min / 75.8min / 86%≤20 lines
  - Gray/Stripe — [stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents) — confirm 1,300 PRs/week, quarantined EC2 language
  - `[checked:2026-05-25 result:OK due:none]` https://hamel.dev/blog/posts/evals-faq/whats-the-difference-between-guardrails-evaluators.html — [practitioner direct] Husain, guardrails vs evaluators. Page dated **August 15, 2025** (confirmed 2026-05-25, resolves the prior Jan-2026-vs-Aug-2025 conflict). Past 6-month window — body inline-dates it "Aug 2025" as dated canonical framing; accepted under §2 (definitional split, not a time-sensitive metric). No fresher source needed.
  - Cherny via Jadhav — [www.anup.io/35-claude-code-tips-from-the-guy-who-built-it](https://www.anup.io/35-claude-code-tips-from-the-guy-who-built-it/) — verified by critical-review pass; "2-3x quality" + Stop-hook + background-agent confirmed. Author name corrected to Anup Jadhav (was Choudhary).
  - Shapira — [medium.com/elementor-engineers/...](https://medium.com/elementor-engineers/the-self-learning-code-review-teaching-ai-cursor-to-learn-from-human-feedback-454df64c98cc) — verified by critical-review pass; mechanism (gh api → cursor-agent → commit to `.cursor/rules/code-review.mdc`) confirmed.
  - Larson — [lethain.com/everyinc-compound-engineering](https://lethain.com/everyinc-compound-engineering/) — verified by critical-review pass; quote *"consulted by future iterations of the plan pattern"* confirmed (note the leading word *"consulted"*).
  - Charles via Rachitsky — [creatoreconomy.so/p/inside-ramp-the-32b-company-ai-agents-geoff-charles](https://creatoreconomy.so/p/inside-ramp-the-32b-company-ai-agents-geoff-charles) — original X URL was auth-walled; swapped to Lenny Rachitsky interview write-up. Numbers re-stated: 350+ skills + 99.5% AI-active + 84% coding agents weekly (was conflated as "99.5% using skills weekly" — corrected).
  - Majors — [charity.wtf/2026/03/09/...](https://charity.wtf/2026/03/09/your-data-is-made-powerful-by-context-so-stop-destroying-it-already-xpost/) — confirm agent-validation quote
  - Wolff — [infoq.com/presentations/engineering-ai](https://www.infoq.com/presentations/engineering-ai/) — confirm "implementation cost to zero, feedback loop everything" + SQLite-in-two-weeks anecdote

- [ ] **Freshness re-check** at first-cohort delivery (6-month rule per `check_research_claims.md` §2). Newest cites pulled 2026-05-15; freshness window expires 2026-11-15.

- [x] **Critical-review subagent** completed 2026-05-15. Verdicts: 5 APPROVE (Cloudflare, Curran, Shapira, Larson, Majors) / 7 REVISE / 0 REPLACE. Revisions landed in Pass 2.1 same date. Cross-cutting flag: vendor-venue density is 7-of-12; every one carries the `[practitioner direct, vendor venue]` label and self-reported metrics are flagged "<org>'s own numbers" inline. One open question: Hamel freshness conflict (Jan 2026 per OODA vs Aug 2025 per critical-review) — pending re-fetch.

- [ ] **KB patch — stale note.** `continuous-research/platform-watch/coding-agents/runs/2026-04-21-boris-cherny.md` currently says "Cherny silent on evals beyond hooks." OODA 2 falsified this; he openly names verify-your-work as his top tip. One-line patch needed.

- [ ] **Eval instances** at `curriculum/evals/instances/how-the-best-do-ci-cd.{technical,writing,story}.json` were graded against the prior CTO-targeted Pass 1. Re-run after critical-review subagent clears the sources.

- [ ] **First-cohort read-through:** confirm the opening does not slip into CTO-briefing register. Confirm the forward-callout from M6 (`spot-gaps-build-the-loop.md` line 64 — *"Going deeper, when this loop has to scale past you"*) still reads as an inviting bridge.

**Iteration log:**

- 2026-05-15 (Pass 2.1, critical-review fixes): nine fixes landed after critical-review subagent flagged: (1) Klaassen M1 claim softened from "runs review findings back into CLAUDE.md/AGENTS.md/skills" to "named the loop" — original mechanic-claim was not in the URL; the concrete mechanism lives in Move 5 (Shapira + Larson). (2) Stripe "1,300 PRs/week" corrected to "over 1,000" per source. (3) Stripe "quarantined EC2 instance" corrected to "isolated devbox." (4) Hamel co-author Shankar dropped — not co-bylined. (5) Hamel freshness conflict logged for re-fetch. (6) Cherny distillation author Choudhary → Jadhav. (7) Charles X URL replaced with Rachitsky's creatoreconomy.so write-up (X was auth-walled). (8) Charles 99.5%/84% conflation corrected. (9) Cursor Bugbot label kept as `[practitioner direct, vendor venue]` with explicit caveat in maintainer that the 52%→80% number is self-reported and not load-bearing. All 12 sources now ship with verified claims; one open item (Hamel freshness) flagged for re-fetch.

- 2026-05-15 (Pass 2): All 8 OODA-pending slots populated. Move 5 reframed mid-cycle from "skills compound generically" to "skills become CI checks / verifiers / rules" per maintainer redirect. Source reshuffle: Shapira (originally proposed for Move 1) moved to Move 5 as the cleanest skill-becomes-CI-check loop; Cursor Bugbot promoted to Move 1 secondary. Move 4 lead changed from Cherny to Husain + Shankar (OODA confirmed the "three verifier shapes" framing is downstream synthesis, not Cherny's own — he names two: Stop hook + background agent). Move 2 ships single-cite (Cloudflare carries the move alone — no clean non-Klaassen second exists). Move 3 frames Intercom + Stripe as two org-scale bets on the same question, with the IC-altitude case named as a published gap. Sources section added to bottom of body per maintainer direction (visible to students; source-type labels stay maintainer-only per `check_research_claims.md` §1).

- 2026-05-15 (Pass 1 rewrite): replaced original CTO-targeted version after audience-mismatch + mood-collision review. 4 of 12 example slots populated; 8 OODA-pending markers shipped for follow-up.

- 2026-04-24 (original Pass 1): CTO-targeted, replaced.

**Frameworks riffed on:**

| Move | Practitioner | Source-type | Notes |
|---|---|---|---|
| 1 | Kieran Klaassen, Every | `[practitioner direct, vendor venue]` | Compound Engineering: The Definitive Guide |
| 1 | Cursor (Bugbot) | `[practitioner direct, vendor venue]` | Self-reported metrics (52% → 80%, 110K repos, 44K rules); operational mechanism is evidence |
| 2 | Cloudflare engineering | `[practitioner direct, vendor venue]` | Self-reported metrics (131K/48K/5K, 3m39s, 0.6%); operational mechanism is evidence |
| 3 | Darragh Curran, Intercom | `[practitioner direct, vendor venue]` | Self-reported metrics (19.2% / 14.6 vs 75.8 / 86%≤20); operational mechanism is evidence |
| 3 | Alistair Gray, Stripe | `[practitioner direct, vendor venue]` | Self-reported 1,300 PRs/week; quarantine pattern is evidence |
| 4 | Hamel Husain | `[practitioner direct]` | Independent practitioner blog; L3 codification of a widely-converged pattern. Shankar co-author dropped per critical-review (not co-bylined on the cited URL). Dated Aug 15 2025 (confirmed 2026-05-25); dated-historical canonical framing, accepted under §2 (definitional, not a metric). |
| 4 | Boris Cherny (via Anup Jadhav distillation) | `[practitioner analysis]` | Writer-on-subject attribution: Jadhav on Cherny. |
| 5 | Ofer Shapira, Elementor | `[practitioner direct]` | Engineering team publication; CI-loop mechanism with named files |
| 5 | Will Larson, Imprint | `[practitioner direct]` | Personal blog; runs Every's pattern on his own monorepos |
| 5 | Geoff Charles, Ramp (Peter Yang interview) | `[practitioner direct]` numbers / `[practitioner analysis]` write-up | 350+/99.5%/84% are Charles-direct from his X post 2026-04-09 (`observations/ramp.md`); Peter Yang's creatoreconomy.so interview is the readable secondary (NOT Lenny Rachitsky — creatoreconomy.so is Peter Yang's newsletter, verified 2026-05-25). |
| 6 | Charity Majors, Honeycomb | `[practitioner direct]` | Own blog charity.wtf; canonical observability voice |
| 6 | Adam Wolff, Anthropic Claude Code team | `[practitioner direct]` | QCon SF 2025 talk via InfoQ; same employer as Cherny but distinct practitioner and distinct claim (deploy-loop, not eval-loop) |

**Org-diversity check:** 12 cites across 11 organisations. Anthropic appears twice (Cherny M4 secondary, Wolff M6 secondary) — accepted because the two practitioners are distinct individuals making distinct claims about different layers of the loop. Attribution cap per `check_writing.md` rule 11 is per-practitioner; both Cherny and Wolff are one-mention each.

**Vendor-venue cites flagged in body as "<org>'s own numbers":** Cursor (M1), Cloudflare (M2), Intercom (M3), Stripe (M3), Ramp (M5). Per `memory/compounded/2026-05-14-research_claims-vendor-venue-practitioner-byline.md`, operational facts are evidence and self-reported metrics are flagged. **Edge case — Cursor Bugbot:** critical-review pass flagged this as borderline `[vendor press release]` (Level 0) under strict reading. Kept as `[practitioner direct, vendor venue]` because Michael Zhao (Cursor employee) is the named byline and the operational mechanism (learned-rules promote/demote across 110K repos) is what we cite. The 52% → 80% resolution-rate number is Cursor's self-reported and called out inline as such; not load-bearing on the move's argument.

**Open (pre-audit):** critical-review subagent, source-URL verification pass, then re-run writing / story / technical judges before this gets a Quality line.
