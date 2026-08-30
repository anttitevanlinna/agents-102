# How the best do CI/CD: six moves that sharpen the loop

<!--flag:module:spot-gaps-build-the-loop-->*Supplementary for AE101 Module 6. Read after you've shipped your second skill.*<!--/flag:module:spot-gaps-build-the-loop--><!--flag:no-module:spot-gaps-build-the-loop-->*Take-home reading. Read once the loop at your own desk feels routine.*<!--/flag:no-module:spot-gaps-build-the-loop-->

<!--flag:module:spot-gaps-build-the-loop-->You finished M6 owning the loop at your desk. Two sessions of the same task, gap diagnosis, a second skill in `~/.claude/skills/`, one rule cut from `./CLAUDE.local.md`. The same loop, run at more people, more PRs, more customers, looks slightly different.<!--/flag:module:spot-gaps-build-the-loop--><!--flag:no-module:spot-gaps-build-the-loop-->You own the loop at your desk: a task run twice, the difference read, the rules sharpened from what you saw. The same loop, run at more people, more PRs, more customers, looks slightly different.<!--/flag:no-module:spot-gaps-build-the-loop--> Six moves recur in the engineers running it best. Each one sharpens the loop you already own. None require permission from above to start trying.

## 1. Treat CI as feedback into the loop, not a gate to pass

A failing CI run is signal. About which memory rule should have caught the mistake upstream. About which verifier was too soft. About which skill ran on auto-pilot when it should have paused. The best route that signal back into the loop<!--flag:module:spot-gaps-build-the-loop--> the way you route gap diagnosis back into skills and memory<!--/flag:module:spot-gaps-build-the-loop--><!--flag:no-module:spot-gaps-build-the-loop--> the way you route what a session got wrong back into your rules and your verifier<!--/flag:no-module:spot-gaps-build-the-loop-->. Each red build sharpens the next session.

## Two proofs the loop compounds

**Klaassen at Every** named the loop. Each unit of engineering work should make the next one cheaper. The mechanism lives in the artifacts the next agent reads: rules files, skill files, `AGENTS.md`. The discipline is feeding lessons from one task back into them before the next task starts ([Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide)).

**Cursor's Bugbot** runs a similar mechanism at platform scale. Review comments flagged as useful become learned rules that promote and demote over time. Resolution rate climbed from 52% to around 80% as the rule corpus grew across 110,000 repos to 44,000 learned rules. Cursor's own numbers ([Bugbot now self-improves with learned rules](https://cursor.com/blog/bugbot-learning)).

**Try this Monday.** Next CI failure you hit on agent-drafted code, ask Claude *"what rule in `./CLAUDE.local.md` would have caught this?"* before you fix the diff. If the answer is *none*, write the rule.

## 2. Fan out review; converge on the pattern

A single reviewer reading 30 agent-drafted PRs a day skims. The best refuse the trade. They run specialist reviewer agents in parallel: one for security, one for performance, one for architecture, one for style. Each finding spawns its own fix-agent. The human's job shifts. Read the pattern across findings, not the lines.

**Cloudflare engineering** runs seven specialist reviewers in CI through their internal stack, with a coordinator agent producing one structured review. The named specialties: security, performance, code quality, documentation, release management, AGENTS.md compliance, internal compliance. 131,246 review runs across 48,095 merge requests in 5,169 repos over 30 days. Median review time 3m39s. Human break-glass override fires on 0.6% of reviews. Cloudflare's own numbers ([Code review with our internal AI engineering stack](https://blog.cloudflare.com/ai-code-review/)).

The pattern named in their own write-up: specialized agents beat monolithic prompting because each agent has a narrow job and the coordinator deduplicates.

**Try this Monday.** On your next non-trivial PR, ask Claude to review it four times under four hats: *"as the security reviewer, what would you flag? as the perf reviewer? architecture? style?"* Read the four outputs side by side. Notice which hat caught what. That's a panel.

## 3. Tier by blast radius

Not all PRs deserve the same gate. A CSS tweak and an auth change want different review surfaces. Tiered gating sorts PRs by what could go wrong, not by who wrote them. Once the lowest-risk tier is clean enough that agent-drafted, verifier-green changes ride through with no human reading, the median cycle time falls for the whole team.

**Intercom** routes 19.2% of merges through a Tier-1 auto-approve path. Median cycle time on that path is 14.6 minutes against an org median of 75.8 minutes. 86% of those PRs are 20 lines or fewer. Intercom's own numbers ([Curran, *2x: nine months later*](https://ideas.fin.ai/p/2x-nine-months-later)).

## Stripe bets on the sandbox, not the slice

**Stripe** is a different point on the same spectrum. Over 1,000 agent-produced PRs merge each week, all human-reviewed, none with human-written code. Stripe's own numbers ([Gray, *Minions: Stripe's one-shot, end-to-end coding agents*](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents)). Stripe contains blast radius by running each agent in an isolated devbox instead of auto-merging the lowest-risk slice. Humans gate on what the agent did; the sandbox gates on what the agent could do.

Two different orgs, two different bets on where to put the human and where to put the silicon. The IC version of this, one engineer carving out their own auto-mergeable slice with a verifier they built, hasn't been published yet. That's a gap you can close on Monday.

**Try this Monday.** Pick one slice of your repo that's mostly safe (feature-flag toggles, copy changes, narrow refactors). Ask Claude *"what verifier would I need before this slice could auto-merge?"* Build that verifier. Run the slice through it. Show the cycle-time number to your tech lead.

## 4. Eval latency is part of the loop

A 15-minute CI run feels fine when a human steps away for coffee. When the agent is waiting, 15 minutes is idle compute plus context loss plus a forced switch to another task. The best treat eval latency as a direct tax on what their kit can do for them. They split fast lane from slow lane. Cheap deterministic checks run in seconds and verify the agent's next move. Judges and gates run in minutes, in the background, on the merged change.

**Husain** names the two halves: guardrails sit inline and block the response, evaluators run async on heavier compute. You almost never use a slow LLM-as-judge as a synchronous guardrail ([Evals FAQ: Guardrails vs Evaluators](https://hamel.dev/blog/posts/evals-faq/whats-the-difference-between-guardrails-evaluators.html), Aug 2025).

## Cherny pairs a fast check with a slow one

**Cherny on Claude Code** pairs a deterministic Stop hook with a background verifying agent. The fast check blocks the next move, the slow check runs after. He calls the verify-your-work move the one that 2-3x's the quality of the final result ([Anup Jadhav on Cherny, Feb 2026: *35 Claude Code Tips From the Guy Who Built It*](https://www.anup.io/35-claude-code-tips-from-the-guy-who-built-it/)).

**Try this Monday.** Time your slowest CI step. If the agent has to wait on it before its next move, ask Claude *"which 20% of these checks catches 80% of the regressions, and how do I run only those on PR-open?"*

## 5. Skills don't just live in your kit. Promote them into the CI surface

A skill is a verifier-in-waiting. Each skill you author catches a pattern. That pattern is what your next PR's review (or your CI check, or your pre-commit hook, or the next plan agent reading rules) needs to see. The best engineers don't keep skills isolated in `~/.claude/skills/`. They promote them into AGENTS.md, into rules files committed back to the repo, into pre-commit hooks. Author once, fires on every next PR.

**Shapira at Elementor** runs a CI workflow that grabs human review comments, hands them to a Cursor CLI agent, extracts patterns, and commits the rules file back to master. Every merged PR sharpens the next review against the same rules ([The Self-Learning Code Review](https://medium.com/elementor-engineers/the-self-learning-code-review-teaching-ai-cursor-to-learn-from-human-feedback-454df64c98cc), Jan 2026).

## The skill catalogue scales: plan time to company-wide

**Larson at Imprint** consults the same shape of artifact at plan time. The agent reads AGENTS.md and the skills wiki *"by future iterations of the plan pattern"*. The skill catalogue becomes the loop's working memory ([Learning from Every's Compound Engineering](https://lethain.com/everyinc-compound-engineering/), Jan 2026).

**Charles runs Ramp's Dojo** as the team-scale version: a shared marketplace of skills that any engineer can publish to and any engineer can pull from. The marketplace pulls personal moves into shared standards, which is the same accretion you get on one team, run at company scale ([Simon Taylor's *Ramp Cracked Enterprise AI*](https://www.fintechbrainfood.com/p/ramp-cracked-ai)).

**Try this Monday.** Look at your `~/.claude/skills/`. Find a skill that catches something your CI doesn't. Propose it as a pre-commit rule or PR-review check in your repo. The path from personal skill to team-enforced check is shorter than it looks.

## 6. Get out fast. Learn from real customers safely

The loop doesn't stop at merge. Customer signal in production is the outermost feedback ring. The best invest in safe, fast deployment so customer reality feeds back into memory and skills the same way CI failures do. Feature flags, fast revert, observability dashboards, gradual rollouts. They're what makes the outer loop fast enough to learn from. Slow deploys with painful rollbacks force teams to gold-plate pre-merge. Fast deploys with cheap rollback let teams ship hot and correct from real signal.

The arrow most orgs get backwards: feel the speed, panic, invest in more pre-merge gates. Slower pipeline, no safer prod. The sweet pace is not *as fast as possible.* It's *fast enough that correction cost stays low.* Two conditions: reverts are trivial, observability catches bad merges in minutes. If both hold, you run hot.

## Agents need the outer loop's signal too

**Majors at Honeycomb** names the agent-era stake plainly: an agent cannot validate a change whose consequences nobody can find. Agentic work makes production observability more load-bearing, not less. Agents need fast, context-rich production signal to validate their own changes the same way you needed it to validate yours ([Your data is made powerful by context](https://charity.wtf/p/your-data-is-made-powerful-by-context)).

**Wolff on the Claude Code team** named the operating principle bluntly at QCon SF 2025: *"when the implementation cost goes to zero, the feedback loop becomes everything."* At that talk, the team ships SQLite persistence behind a feature flag, watches the production signal turn bad, removes it within two weeks. Reversibility is the prerequisite for shipping fast, not the consolation prize for shipping wrong ([Engineering at AI Speed: Lessons from the First Agentically Accelerated Software Project](https://www.infoq.com/presentations/engineering-ai/)).

**Try this Monday.** Time how long it takes to revert a bad merge in your repo, end to end. If the number is more than 10 minutes, that's the problem worth surfacing to your team. The other five moves wait on this one.

## Where this fits in your AE101 arc

The loop at your desk is the one this training closed:<!--flag:module:spot-gaps-build-the-loop--> spot the gap, build the eval, close the loop on your own code.<!--/flag:module:spot-gaps-build-the-loop--><!--flag:no-module:spot-gaps-build-the-loop--> send the work off, read what comes back, build the packaging that catches what went wrong.<!--/flag:no-module:spot-gaps-build-the-loop--> These engineers run the same loop; they've been at it longer. The shift is not conceptual. The reader is still you. The shift is what each move makes possible once you stop treating CI, review, deploy, and customer signal as separate stages and start treating them as one loop with six tunable surfaces.

Pick one move. Run it this week.

## Sources: moves 1 and 2

- Kieran Klaassen, [*Compound Engineering: The Definitive Guide*](https://every.to/source-code/compound-engineering-the-definitive-guide)
- Cursor, [*Bugbot now self-improves with learned rules*](https://cursor.com/blog/bugbot-learning)
- Cloudflare engineering, [*Code review with our internal AI engineering stack*](https://blog.cloudflare.com/ai-code-review/)

## Sources: moves 3 and 4

- Darragh Curran, [*2x: nine months later*](https://ideas.fin.ai/p/2x-nine-months-later)
- Alistair Gray, [*Minions: Stripe's one-shot, end-to-end coding agents*](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents)
- Hamel Husain, [*Evals FAQ: Guardrails vs Evaluators*](https://hamel.dev/blog/posts/evals-faq/whats-the-difference-between-guardrails-evaluators.html)
- Anup Jadhav on Boris Cherny, [*35 Claude Code Tips From the Guy Who Built It*](https://www.anup.io/35-claude-code-tips-from-the-guy-who-built-it/)

## Sources: moves 5 and 6

- Ofer Shapira, [*The Self-Learning Code Review*](https://medium.com/elementor-engineers/the-self-learning-code-review-teaching-ai-cursor-to-learn-from-human-feedback-454df64c98cc)
- Will Larson, [*Learning from Every's Compound Engineering*](https://lethain.com/everyinc-compound-engineering/)
- Simon Taylor, [*Ramp Cracked Enterprise AI. Here's The Playbook*](https://www.fintechbrainfood.com/p/ramp-cracked-ai)
- Charity Majors, [*Your Data Is Made Powerful By Context (so stop destroying it already)*](https://charity.wtf/p/your-data-is-made-powerful-by-context)
- Adam Wolff (QCon SF 2025), [*Engineering at AI Speed: Lessons from the First Agentically Accelerated Software Project*](https://www.infoq.com/presentations/engineering-ai/)

<!-- maintainer -->

**Move 5 is skills-as-CI-check, not skills-as-generic-kit-accretion.** A skill earns its place here by becoming a check, a verifier or a rule the loop runs — not by accreting into a general-purpose kit. Maintainer redirect, and the distinction the move is built on; do not broaden it back.

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
- `husain-guardrails-versus-evaluators` · detail · "guardrails sit inline and block the response, evaluators run async on heavier compute" ← husain-guardrails-faq
- `ramp-dojo-at-team-scale` · detail · "a shared marketplace of skills that any engineer can publish to and any engineer can pull from" ← taylor-fintechbrainfood
- `majors-on-agent-validation` · detail · "an agent cannot validate a change whose consequences nobody can find" ← majors-charity-wtf
- `wolff-implementation-cost-to-zero` · detail · "when the implementation cost goes to zero, the feedback loop becomes everything." ← wolff-qcon
- `cherny-quality-multiple` · detail · "the one that 2-3x's the quality of the final result" ← cherny-via-jadhav
- `shapira-self-learning-review` · detail · "grabs human review comments, hands them to a Cursor CLI agent, extracts patterns, and commits the rules file back to master" ← shapira-elementor
- `larson-on-compound-engineering` · detail · "by future iterations of the plan pattern" ← larson-compound
- `tier-by-blast-radius` · vision · "Tier by blast radius" ← none-owed
- `get-out-fast-learn-safely` · vision · "Time how long it takes to revert a bad merge in your repo, end to end." ← none-owed

Sources
- klaassen-definitive-guide `[checked:2026-07-30 result:OK due:2027-01-30]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Klaassen, 2026-02-09. Confirms the term and the make-the-next-one-cheaper philosophy. **Cite for the term, never for a step count** — the loop's step names live elsewhere and have since expanded past four. fallback: attribute ordinal-free.
- curran-2x `[checked:2026-05-25 result:OK due:2026-10-16]` https://ideas.fin.ai/p/2x-nine-months-later — [practitioner direct, vendor venue] Curran, 2026-04-16: 19.2% / 14.6 vs 75.8 min / 86% ≤20 lines. Vendor-self-reported; body flags it as Intercom's own numbers. fallback: keep the numbers, attribute the telemetry, flag self-report.
- husain-guardrails-faq `[checked:2026-05-25 result:OK due:none]` https://hamel.dev/blog/posts/evals-faq/whats-the-difference-between-guardrails-evaluators.html — [practitioner direct] Husain, guardrails versus evaluators, page dated 2025-08-15. Durable FAQ entry, `due:none`. fallback: teach the inline-versus-offline split without the name.
- cursor-bugbot `[checked:2026-08-01 result:OK due:2027-02-01]` https://cursor.com/blog/bugbot-learning — [vendor blog — Level 0] **Verified live 2026-08-01.** Michael Zhao, 2026-04-08. All three figures hold verbatim: *"When we launched Bugbot out of beta in July 2025, 52% of the bugs it identified were resolved"*, *"Today, the resolution rate is nearing 80%"*, and *"more than 110,000 repos have enabled learning, generating more than 44,000 learned rules."* **Still L0 and outside the ladder** — verified does not mean promoted, and these are the vendor's own product metrics. The page also carries a competitor comparison table (78.13% across 50,310 PRs versus Greptile's 63.49%) which is marketing and must not be imported. fallback: cut the numbers, keep the mechanism (useful review comments becoming promoted rules), which is the transferable part and needs no telemetry.
- cloudflare-ai-review `[checked:2026-08-01 result:OK due:2027-02-01]` https://blog.cloudflare.com/ai-code-review/ — [vendor blog — Level 0] **Verified live 2026-08-01.** Ryan Skidmore, 2026-04-20. Every figure holds: 131,246 review runs, 48,095 merge requests, 5,169 repositories, median 3m39s, and the override rate stated as *"engineers have only needed to 'break glass' 288 times (0.6% of merge requests)"*. The 30-day window is 2026-03-10 to 2026-04-09; body says "30 days" without dating it, which is fine for a supplementary and would not be for a claim about now. **Still L0** — the vendor's own instrumentation of its own stack. fallback: keep "an org runs a fan-out of specialist reviewers with a coordinator", drop every figure.
- stripe-minions `[checked:2026-08-01 result:OK due:2027-02-01]` https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents — [vendor blog — Level 0] **Verified live 2026-08-01.** Alistair Gray, 2026-02-09. *"Over a thousand pull requests merged each week at Stripe are completely minion-produced"* and *"while they're human-reviewed, they contain no human-written code"* — **the body was right and the TODO was wrong.** The note said confirm 1,300; the page says a thousand, which is what body already carried. The isolation mechanism is devboxes, *"isolated from production resources and the internet"*, not quarantined EC2 as the retired note claimed; body already says devbox. fallback: cut the count, keep the shape.
- taylor-fintechbrainfood `[checked:2026-08-29 result:OK due:asap]` https://www.fintechbrainfood.com/p/ramp-cracked-ai — [practitioner analysis] Simon Taylor, *Ramp Cracked Enterprise AI. Here's The Playbook*, 2026-04-19. Analysis of Geoff Charles's April 2026 X thread, not Charles's own words — same caveat as cherny-via-jadhav. Carries the Dojo/marketplace shape verbatim ("Ramp then built a marketplace of over 350 reusable skills"; "anyone in the company can now use AI as well as the best person"), independently corroborated by Patrick Wheeler, Tuck Center for Digital Strategies, 2026-04-22 ("350+ shared workflows"). The primary (x.com/geoffintech/status/2042002590758572377, snowflake-decodes to 2026-04-08) is 402 direct and via oEmbed as of 2026-08-29. The body cites the marketplace shape only — the 350+ figure stays out of body as vendor self-report. The Yang/creatoreconomy interview is no longer cited: verified 2026-08-29 that it never mentions Dojo, a marketplace, or skill-sharing. due:asap — secondary standing in for an unreachable primary; re-check when the X thread becomes reachable. fallback: drop the Dojo sentence and let Larson's skill-catalogue point carry §5 alone.
- majors-charity-wtf `[checked:2026-08-29 result:OK due:none]` https://charity.wtf/p/your-data-is-made-powerful-by-context — [practitioner direct] Site migrated (Substack-backed); the 2026-03-09 post is live at this shorter permalink (the original dated /xpost URL still 404s). Same author, same date, confirmed by direct fetch: "How do you expect your agents to validate each change, if the consequences of each change cannot be found?" — near-verbatim match for the paraphrase the body carries. Durable argument essay, not a decaying metric — due:none. fallback: the paraphrase carries the point; quotation marks may be restored against this live URL if ever wanted.
- wolff-qcon `[checked:2026-08-01 result:OK due:none]` https://www.infoq.com/presentations/engineering-ai/ — [practitioner talk] **Verified live 2026-08-01.** Adam Wolff, *Engineering at AI Speed: Lessons from the First Agentically Accelerated Software Project*, page dated 2026-05-07. **Two dates, two fields, do not conflate them (re-verified live 2026-08-07):** the talk is **QCon San Francisco 2025** (the conference the page is branded to, and the year the body cites); InfoQ's `Recorded at:` field reads *May 07, 2026*, which is its posting date, not the conference date. A 2026-08-07 technical re-judge BLOCKed the body's "QCon SF 2025" against this page date; that was a false positive from reading the posting field as the talk date. Body year is correct. Leave it. The quote holds verbatim: *"when the implementation cost goes to zero, the feedback loop becomes everything"* — note **becomes**, not *is*, and body already carries the correct form. The SQLite passage is a **failure story, not a build story**: *"This is a story of 15 days that I'm never getting back… We're now just over two weeks taking this feature out that we just shipped."* Body already tells it as shipped-then-removed, which is right; the retired TODO described it as a build-in-two-weeks anecdote, which would have inverted it. Durable talk recording, so `due:none`. fallback: paraphrase the principle, keep the reversal story.
- cherny-via-jadhav `[checked:2026-08-30 result:CAVEAT due:none]` https://www.anup.io/35-claude-code-tips-from-the-guy-who-built-it/ — [practitioner analysis] Jadhav's compilation (pub 2026-02-15) of Cherny's three tip threads (Jan–Feb 2026), not Cherny's own words — the durable caveat this stamp records. Verified live: *"If Claude has a feedback loop to verify its own work, it 2-3x the quality of the final result"* — the multiple belongs to the verify-your-work tip, which is exactly what body cites it for (not plan mode, which the page leaves multiplier-free); Stop-hook and background-agent tips also on the page verbatim. due:none — cite as what the threads said, dated in body, never as current practice. fallback: drop the multiple, keep the practices.
- shapira-elementor `[checked:2026-08-30 result:OK due:none]` https://medium.com/elementor-engineers/the-self-learning-code-review-teaching-ai-cursor-to-learn-from-human-feedback-454df64c98cc — [practitioner direct] Shapira, Elementor AI team lead, pub 2026-01-11, first-hand ("We built a simple CI workflow"). All four mechanism steps hold verbatim as a numbered list: *"Grabs all human comments from the PR"* / *"Feeds them to Cursor's CLI agent"* / *"The agent extracts patterns and updates a shared rules file"* / *"That file gets committed back to master"*. Medium 403s a direct fetch; page reachable via reader proxy (r.jina.ai). due:none — durable account of a built system, dated in body. fallback: keep the mechanism, drop the org name.
- larson-compound `[checked:2026-08-30 result:OK due:none]` https://lethain.com/everyinc-compound-engineering/ — [practitioner analysis] Larson on Every's pattern, pub 2026-01-19. The quote holds verbatim: *"…a well-defined, structured format (basically a wiki) which is consulted by future iterations of the plan pattern."* Body's Imprint half is first-hand on the same page: *"Implementing within Imprint's frontend and backend monorepos was straightforward, taking about an hour."* due:none — durable account, dated in body. fallback: cite Klaassen directly instead.

Frameworks
- Compound engineering · [borrow:none] · law:the-compound-ladder · ← klaassen-definitive-guide
- Guardrails versus evaluators · [borrow:none] · law:eval-judge-verifier-gate · ← husain-guardrails-faq
- Tier by blast radius · [borrow:safety engineering] · law:blast-radius-error-budget · ← curran-2x
- Absorption bottleneck · [borrow:none] · law:absorption-bottleneck · ← curran-2x, stripe-minions

Stance `[stance:2026-08-01 level:L2]`
- holds: the shape, and now most of the numbers too. All twelve sources were opened on 2026-08-01. **Nine verified clean, two failed, one was right all along** — Stripe's count was correct in body and wrong in the TODO that doubted it. The shape (CI as feedback, fan-out review, tiering by blast radius, guardrails versus evaluators) was never in doubt and survives every figure being cut.
- contested: the evidence *level*, not the figures. Four verified sources are vendor blogs reporting their own product metrics: **L0, outside the ladder, and verifying one does not promote it.** The body already flags each as the org's own numbers, which is the correct treatment. The two sources that failed have had their claims cut rather than hedged.
- decided: **all twelve sources opened 2026-08-01. Nine held, two failed, one was right all along.** The two failures carry the lesson. Ramp's three figures are not on the page that cited them: the numbers came from Charles's April 2026 X thread, the thread was auth-walled, an accessible write-up was substituted as the citation, and nobody checked whether the substitute carried the numbers. It did not, for four months, including a 99.5%-of-a-whole-company adoption claim. **A swapped URL is a new citation and owes a fresh check** — the swap is the moment a claim silently loses its source. Majors' URL returns 404, so a verbatim quotation attributed to a named person sat behind a dead link in a shipped file; quotation marks removed, argument kept as a paraphrase, and the words can return if a live URL turns up. The one that was right all along was Stripe: the body said *over a thousand* and the TODO doubting it was the error.
- decided: **Ramp is unverified, not disproven, and this session cannot close it, 2026-08-02.** All three X routes are now exhausted: direct 402, oEmbed 402 (both recorded in `memory/reference_x_content_fetch_workaround.md`), and the search-index title route was attempted on 2026-08-02 and blocked by a spent search budget rather than by the route failing. Cutting the figures from body was still right — an unverifiable figure does not ship, whatever the reason it could not be checked. A later session with search budget should try route 0 before concluding they are unrecoverable.
- would-move-it: a live primary for either failed source. Ramp's figures need Charles's own April 2026 thread, which has one untried route left (search-index title, `reference_x_content_fetch_workaround.md` route 0); Majors' quote needs a working URL. **Both are restorable the moment a route works, and neither before that.**

OODA
- question: has a live URL appeared for the Majors post, and is Charles's Ramp thread reachable again by any route?
- roster: Cursor blog, Cloudflare engineering blog, Stripe dev blog, Geoff Charles, Charity Majors, Adam Wolff, Darragh Curran
- last-run: 2026-08-01

<!-- /backing -->
**Org-diversity check:** 12 cites across 11 organisations. Anthropic appears twice (Cherny M4 secondary, Wolff M6 secondary) — accepted because the two practitioners are distinct individuals making distinct claims about different layers of the loop. Attribution cap per `check_writing.md` rule 11 is per-practitioner; both Cherny and Wolff are one-mention each.

**Vendor-venue cites flagged in body as "<org>'s own numbers":** Cursor (M1), Cloudflare (M2), Intercom (M3), Stripe (M3). Per `memory/compounded/2026-05-14-research_claims-vendor-venue-practitioner-byline.md`, operational facts are evidence and self-reported metrics are flagged. **Edge case — Cursor Bugbot:** stamped `[vendor blog — Level 0]`, deliberately conservative although Michael Zhao (Cursor employee) is the named byline. The body cites the operational mechanism (learned-rules promote/demote across 110K repos); the stamp is authoritative over this note. The 52% → 80% resolution-rate number is Cursor's self-reported and called out inline as such; not load-bearing on the move's argument.

**Quality:** compendium-audited 2026-08-29 (writing@4a722813 story@4a722813 technical@4a722813 behavior@da65157 pedagogy@1abb84c6 strategy@da65157 slides@4a722813)
- judges @4a722813: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS
