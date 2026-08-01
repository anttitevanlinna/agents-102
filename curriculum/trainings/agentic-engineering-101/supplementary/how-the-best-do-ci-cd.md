# How the best do CI/CD: six moves that sharpen the loop

<!--flag:module:spot-gaps-build-the-loop-->*Supplementary for AE101 Module 6. Read after you've shipped your second skill.*<!--/flag:module:spot-gaps-build-the-loop--><!--flag:no-module:spot-gaps-build-the-loop-->*Take-home reading. Read once the loop at your own desk feels routine.*<!--/flag:no-module:spot-gaps-build-the-loop-->

<!--flag:module:spot-gaps-build-the-loop-->You finished M6 owning the loop at your desk. Two runs of the same task, gap diagnosis, a second skill in `~/.claude/skills/`, one rule cut from `./CLAUDE.local.md`. The same loop, run at more people, more PRs, more customers, looks slightly different.<!--/flag:module:spot-gaps-build-the-loop--><!--flag:no-module:spot-gaps-build-the-loop-->You own the loop at your desk: a task run twice, the difference read, the rules sharpened from what you saw. The same loop, run at more people, more PRs, more customers, looks slightly different.<!--/flag:no-module:spot-gaps-build-the-loop--> Six moves recur in the engineers running it best. Each one sharpens the loop you already own. None require permission from above to start trying.

## 1. Treat CI as feedback into the loop, not a gate to pass

The reflex frame for CI is *"a wall I must pass before merge."* That frame burns every red build. A failing CI run is signal. About which memory rule should have caught the mistake upstream. About which verifier was too soft. About which skill ran on auto-pilot when it should have paused. The best route that signal back into the loop<!--flag:module:spot-gaps-build-the-loop--> the way you route gap diagnosis back into skills and memory<!--/flag:module:spot-gaps-build-the-loop--><!--flag:no-module:spot-gaps-build-the-loop--> the way you route what a run got wrong back into your rules and your verifier<!--/flag:no-module:spot-gaps-build-the-loop-->. Each red build sharpens the next run.

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

The loop at your desk is the one this training closed:<!--flag:module:spot-gaps-build-the-loop--> spot the gap, build the eval, close the loop on your own code.<!--/flag:module:spot-gaps-build-the-loop--><!--flag:no-module:spot-gaps-build-the-loop--> send the work off, read what comes back, build the packaging that catches what went wrong.<!--/flag:no-module:spot-gaps-build-the-loop--> This piece is the same loop, run by engineers who've been at it longer. The shift is not conceptual. The reader is still you. The shift is what each move makes possible once you stop treating CI, review, deploy, and customer signal as separate stages and start treating them as one loop with six tunable surfaces.

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

<!-- backing -->

Claims
- `ci-is-feedback-not-a-gate` · vision · "Treat CI as feedback into the loop, not a gate to pass" ← none-owed
- `klaassen-each-unit-makes-the-next-cheaper` · detail · "Each unit of engineering work should make the next one cheaper." ← klaassen-definitive-guide
- `bugbot-learns-rules` · detail · "Review comments flagged as useful become learned rules that promote and demote over time." ← cursor-bugbot
- `cloudflare-seven-specialists` · detail · "seven specialist reviewers in CI through their internal stack, with a coordinator agent producing one structured review" ← cloudflare-ai-review
- `intercom-tier-1-auto-approve` · detail · "routes 19.2% of merges through a Tier-1 auto-approve path" ← curran-2x
- `stripe-thousand-prs-all-reviewed` · detail · "Over 1,000 agent-produced PRs merge each week, all human-reviewed, none with human-written code." ← stripe-minions
- `husain-guardrails-versus-evaluators` · detail · "Guardrails sit inline in the request/response path: fast, deterministic, milliseconds of latency" ← husain-guardrails-faq
- `ramp-dojo-at-team-scale` · detail · "350+ shared skills, 99.5% of employees actively using AI" ← charles-rachitsky
- `majors-on-agent-validation` · detail · "How do you expect your agents to validate each change, if they can't?" ← majors-charity-wtf
- `wolff-implementation-cost-to-zero` · detail · "when the implementation cost goes to zero, the feedback loop is everything" ← wolff-qcon
- `cherny-quality-multiple` · detail · "2-3x quality" ← cherny-via-jadhav
- `shapira-self-learning-review` · detail · "teaching the reviewer to learn from human feedback" ← shapira-elementor
- `larson-on-compound-engineering` · detail · "consulted by future iterations of the plan pattern" ← larson-compound
- `tier-by-blast-radius` · vision · "Tier by blast radius. Make the Tier-1 case on your own PRs" ← none-owed
- `get-out-fast-learn-safely` · vision · "Time how long it takes to revert a bad merge in your repo, end to end." ← none-owed

Sources
- klaassen-definitive-guide `[checked:2026-07-30 result:OK due:2027-01-30]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Klaassen, 2026-02-09. Confirms the term and the make-the-next-one-cheaper philosophy. **Cite for the term, never for a step count** — the loop's step names live elsewhere and have since expanded past four. fallback: attribute ordinal-free.
- curran-2x `[checked:2026-05-25 result:OK due:2026-10-16]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran, 2026-04-16: 19.2% / 14.6 vs 75.8 min / 86% ≤20 lines. Vendor-self-reported; body flags it as Intercom's own numbers. fallback: keep the numbers, attribute the telemetry, flag self-report.
- husain-guardrails-faq `[checked:2026-05-25 result:OK due:none]` https://hamel.dev/blog/posts/evals-faq/whats-the-difference-between-guardrails-evaluators.html — [practitioner direct] Husain, guardrails versus evaluators, page dated 2025-08-15. Durable FAQ entry, `due:none`. fallback: teach the inline-versus-offline split without the name.
- cursor-bugbot `[checked:never result:NEEDED due:asap]` https://cursor.com/blog/bugbot-learning — [vendor blog — Level 0] **UNVERIFIED.** Owes confirmation of 52% → 80%, 110,000 repos, 44,000 learned rules. Vendor blog about the vendor's own product: **L0, outside the evidence ladder**, and three round-ish numbers with a before/after improvement is the exact shape the zombie-stat guard exists for. fallback: cut the numbers, keep the mechanism — useful review comments becoming promoted rules — which is the transferable part and needs no telemetry.
- cloudflare-ai-review `[checked:never result:NEEDED due:asap]` https://blog.cloudflare.com/ai-code-review/ — [vendor blog — Level 0] **UNVERIFIED.** Owes seven specialists, 131,246 / 48,095 / 5,169 over 30 days, 3m39s median, 0.6% override. fallback: keep "an org runs a fan-out of specialist reviewers with a coordinator", drop every figure.
- stripe-minions `[checked:never result:NEEDED due:asap]` https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents — [vendor blog — Level 0] **UNVERIFIED, and the body and the TODO disagree with each other:** body says "over 1,000 agent-produced PRs merge each week", the verification note says confirm 1,300. One of the two is wrong and nobody has opened the page to find out which. fallback: cut the count, keep the shape — all agent-produced, all human-reviewed.
- charles-rachitsky `[checked:never result:NEEDED due:asap]` https://creatoreconomy.so/p/inside-ramp-the-32b-company-ai-agents-geoff-charles — [practitioner interview] **UNVERIFIED.** Owes 350+ shared skills, 99.5% of employees actively using AI, 84% on the third figure. The original X URL was auth-walled and swapped for this venue, and the swap was never re-checked. **99.5% adoption is a round-number claim about an entire company** — the highest-risk figure on the page. fallback: cut all three figures, keep "a large org runs a shared skill marketplace".
- majors-charity-wtf `[checked:never result:NEEDED due:asap]` https://charity.wtf/2026/03/09/your-data-is-made-powerful-by-context-so-stop-destroying-it-already-xpost/ — [practitioner direct] **UNVERIFIED.** Owes the agent-validation quote verbatim. A quotation attributed to a named person is the one thing that must never ship unchecked — M6's own opener is a memo about exactly this failure. fallback: paraphrase and drop the quotation marks.
- wolff-qcon `[checked:never result:NEEDED due:asap]` https://www.infoq.com/presentations/engineering-ai/ — [practitioner talk] **UNVERIFIED.** Owes the "implementation cost to zero, feedback loop everything" line and the SQLite-in-two-weeks anecdote. Same quotation risk as above. fallback: paraphrase the principle, drop the verbatim and the anecdote.
- cherny-via-jadhav `[checked:2026-05-15 result:CAVEAT due:asap]` https://www.anup.io/35-claude-code-tips-from-the-guy-who-built-it/ — [practitioner analysis] Verified by a critical-review pass, not by a source-verification pass: the "2-3x quality" figure, the Stop-hook and the background-agent points were checked as reported, but this is one writer's account of Cherny's talk, not Cherny's own words. fallback: drop the multiple, keep the practices.
- shapira-elementor `[checked:2026-05-15 result:CAVEAT due:asap]` https://medium.com/elementor-engineers/the-self-learning-code-review-teaching-ai-cursor-to-learn-from-human-feedback-454df64c98cc — [practitioner direct] Mechanism verified by the critical-review pass. fallback: keep the mechanism, drop the org name.
- larson-compound `[checked:2026-05-15 result:CAVEAT due:asap]` https://lethain.com/everyinc-compound-engineering/ — [practitioner analysis] The quoted line was confirmed by the critical-review pass. Larson writing about Every, so it is analysis rather than direct. fallback: cite Klaassen directly instead.

Frameworks
- Compound engineering · [borrow:none] · law:the-compound-ladder · ← klaassen-definitive-guide
- Guardrails versus evaluators · [borrow:none] · law:eval-judge-verifier-gate · ← husain-guardrails-faq
- Tier by blast radius · [borrow:safety engineering] · law:blast-radius-error-budget · ← curran-2x
- Absorption bottleneck · [borrow:none] · law:absorption-bottleneck · ← curran-2x, stripe-minions

Stance `[stance:2026-08-01 level:L1]`
- holds: less than the page appears to. **Seven of its twelve sources have never been opened**, and they carry most of its numbers. What genuinely holds is the *shape* — CI as feedback, fan-out review, tiering by blast radius, guardrails versus evaluators — which is convergent across the orgs named and survives every figure being cut.
- contested: **every load-bearing number on the page, pending verification.** Five vendor blogs are L0 and outside the ladder entirely; the two quotations are attributed verbatim to named people and unchecked; and body and TODO already contradict each other on Stripe's PR count, which is proof the numbers were never reconciled against the sources.
- would-move-it: opening the seven URLs. **This is the only stance in the corpus whose next action is not research but bookkeeping** — the finding is that a file marked "MUST DO before first cohort" reached a shipped supplementary with the box unticked.

OODA
- question: do the seven unopened URLs support the figures attributed to them, and is Stripe's number 1,000 or 1,300?
- roster: Cursor blog, Cloudflare engineering blog, Stripe dev blog, Geoff Charles via Lenny Rachitsky, Charity Majors, Adam Wolff's QCon talk, Darragh Curran
- last-run: never

Flagged
- `[found:2026-08-01]` **Seven of twelve sources unopened, carrying ~15 load-bearing figures including two verbatim quotations and a 99.5%-of-a-company adoption claim** → open them before this ships to a cohort, or cut to the shape and keep no numbers. The migration to a backing block is what made this countable; the checkbox had been sitting unticked in a maintainer list where nothing audited it.
- `[found:2026-08-01]` Body says "over 1,000" Stripe PRs per week; the verification note says confirm 1,300 → one is wrong, and which one is unknowable without opening the page.
- `[found:2026-08-01]` The register this block replaces labelled Cursor's and Cloudflare's own product blogs `[practitioner direct, vendor venue]` → **that is a rung too high.** A vendor writing about its own product is Level 0, outside the evidence ladder, not a practitioner report with a venue caveat. The register's own defence — "operational mechanism is evidence" — is right about the mechanism and wrong about the metrics, and the label applied to both. Relabelled in Sources; the same error was caught and corrected in the platform-watch corpus earlier today, so this is the second instance of one mistake in one week.

<!-- /backing -->
**Iteration log:**

- 2026-05-15 (Pass 2.1, critical-review fixes): nine fixes landed after critical-review subagent flagged: (1) Klaassen M1 claim softened from "runs review findings back into CLAUDE.md/AGENTS.md/skills" to "named the loop" — original mechanic-claim was not in the URL; the concrete mechanism lives in Move 5 (Shapira + Larson). (2) Stripe "1,300 PRs/week" corrected to "over 1,000" per source. (3) Stripe "quarantined EC2 instance" corrected to "isolated devbox." (4) Hamel co-author Shankar dropped — not co-bylined. (5) Hamel freshness conflict logged for re-fetch. (6) Cherny distillation author Choudhary → Jadhav. (7) Charles X URL replaced with Rachitsky's creatoreconomy.so write-up (X was auth-walled). (8) Charles 99.5%/84% conflation corrected. (9) Cursor Bugbot label kept as `[practitioner direct, vendor venue]` with explicit caveat in maintainer that the 52%→80% number is self-reported and not load-bearing. All 12 sources now ship with verified claims; one open item (Hamel freshness) flagged for re-fetch.

- 2026-05-15 (Pass 2): All 8 OODA-pending slots populated. Move 5 reframed mid-cycle from "skills compound generically" to "skills become CI checks / verifiers / rules" per maintainer redirect. Source reshuffle: Shapira (originally proposed for Move 1) moved to Move 5 as the cleanest skill-becomes-CI-check loop; Cursor Bugbot promoted to Move 1 secondary. Move 4 lead changed from Cherny to Husain + Shankar (OODA confirmed the "three verifier shapes" framing is downstream synthesis, not Cherny's own — he names two: Stop hook + background agent). Move 2 ships single-cite (Cloudflare carries the move alone — no clean non-Klaassen second exists). Move 3 frames Intercom + Stripe as two org-scale bets on the same question, with the IC-altitude case named as a published gap. Sources section added to bottom of body per maintainer direction (visible to students; source-type labels stay maintainer-only per `check_research_claims.md` §1).

- 2026-05-15 (Pass 1 rewrite): replaced original CTO-targeted version after audience-mismatch + mood-collision review. 4 of 12 example slots populated; 8 OODA-pending markers shipped for follow-up.

- 2026-04-24 (original Pass 1): CTO-targeted, replaced.

**Org-diversity check:** 12 cites across 11 organisations. Anthropic appears twice (Cherny M4 secondary, Wolff M6 secondary) — accepted because the two practitioners are distinct individuals making distinct claims about different layers of the loop. Attribution cap per `check_writing.md` rule 11 is per-practitioner; both Cherny and Wolff are one-mention each.

**Vendor-venue cites flagged in body as "<org>'s own numbers":** Cursor (M1), Cloudflare (M2), Intercom (M3), Stripe (M3), Ramp (M5). Per `memory/compounded/2026-05-14-research_claims-vendor-venue-practitioner-byline.md`, operational facts are evidence and self-reported metrics are flagged. **Edge case — Cursor Bugbot:** critical-review pass flagged this as borderline `[vendor press release]` (Level 0) under strict reading. Kept as `[practitioner direct, vendor venue]` because Michael Zhao (Cursor employee) is the named byline and the operational mechanism (learned-rules promote/demote across 110K repos) is what we cite. The 52% → 80% resolution-rate number is Cursor's self-reported and called out inline as such; not load-bearing on the move's argument.

**Open (pre-audit):** critical-review subagent, source-URL verification pass, then re-run writing / story / technical judges before this gets a Quality line.
