# The honest ceiling — where long-running coding-agent sessions actually break

**Date:** 2026-04-23
**Question:** Where do the real ceilings hit in the last 6 months? When does adding more time / context / packaging stop helping?
**Why we're asking:** AE101 Module 5 mood is *"learning through contrast."* The success literature is loud; the ceiling literature is what students need to balance it.

## Cost ceiling — confirmed and getting worse

**Birgitta Böckeler (Thoughtworks AI-Coding lead), QCon London March 2026.** What cost ~12¢/100 LoC in 2024 now costs ~$380/dev/day. Annualised: ~$91,200/dev/yr — *"a solid developer salary in Germany."* Driver: agents now research, plan, review, run tests, revise plan — not just autocomplete. She names rising cost and worsening security as the two field-level concerns. [domain trade publication] https://www.infoq.com/news/2026/03/ai-coding-state/ and [domain trade publication] https://www.devclass.com/ai-ml/2026/03/19/ai-for-software-developers-is-in-a-dangerous-state/5209518 — [SOURCE NEEDED] for Böckeler's primary QCon London talk (slides/recording).

**Cross-check:** Anthropic Managed Agents priced at $0.08/session-hour (April 2026). At one developer running 4 parallel sessions × 8 hours = $2.56/day on that surface alone — but practitioner accounts indicate the dominant spend is token+tool execution under the hood, not the harness fee. The ~$380/day Böckeler number is the practitioner anchor; vendor list price is a floor not a ceiling.

**Counter-evidence sought:** No practitioner publishing "the cost ceiling is overstated" — the dissent is silence, not refutation. Anthropic removing the 1M context premium (March 2026) is the only price-down move we found. Trajectory still up.

## Reliability ceiling at scale — three signals (L2, not yet convergent)

**Addy Osmani (Google), "Factory Model" March 2026:** *"flaky environments become systemic blockers when forty agents hit the same flaky test simultaneously. The factory stalls."* Names the asymmetry: a single dev works around flake; forty parallel agents amplify it into a stop-the-line event. Also: UI verification brittle, visual/behavioral regressions slip through, context outside the window gets missed. [practitioner direct] https://addyosmani.com/blog/factory-model/ and https://addyo.substack.com/p/the-80-problem-in-agentic-coding

**MSR 2026 mining study, "When AI Code Doesn't Stick":** 2.66% of agentic PRs contain at least one revert commit. Range: 0.7% (OpenAI Codex) to 7.6% (GitHub Copilot). Top causes: unintended side effects + overengineering (22.33%), functional incorrectness (22.13%), code-quality issues (17.71%), dependency management (12.47%). Scope management and contextual understanding fail before pure functional defects do. [academic/research] https://2026.msrconf.org/details/msr-2026-mining-challenge/27

**DORA 2025 / Faros 2025 datasets:** Individual throughput gains real (21% more tasks, 98% more PRs merged) — but PR size +51.3%, median PR review time +91%, **incidents per PR +242.7%.** DORA framing: "Acceleration Whiplash — real throughput gains at the top, compounding quality costs at every stage below." [academic/research] https://dora.dev/dora-report-2025/ and https://www.faros.ai/blog/key-takeaways-from-the-dora-report-2025

## Security ceiling — the "frontier unsolved problem"

**Simon Willison's lethal trifecta** (private data + untrusted tokens + exfiltration vector) reaffirmed throughout 2026. Cline coding agent attacked via prompt injection in a GitHub issue title — Claude Code configured with Bash/Read/Write executed the injected instructions. Snowflake Cortex Agent injection chain documented and patched March 24 2026. [practitioner direct] https://simonwillison.net/tags/prompt-injection/ and https://simonw.substack.com/p/new-prompt-injection-papers-agents

**OpenAI CISO Dane Stuckey** publicly called prompt injection *"a frontier, unsolved security problem."* The OWASP "73% of production AI deployments" prompt-injection figure is **STRUCK** — no OWASP primary source located; caveats inline don't survive paraphrase. The Gravitee "State of AI Agent Security 2026" report (vendor of an API/agent gateway product) cites **27.2% of technical teams reverted to hardcoded authorization** — flagged as conflict-of-interest: the vendor sells the alternative. [vendor industry report — conflict of interest flagged] https://www.gravitee.io/blog/state-of-ai-agent-security-2026-report-when-adoption-outpaces-control. Treat as vendor claim until an independent practitioner replicates.

**Böckeler's curriculum-grade line still holds:** *"you cannot and maybe never will be able to give it everything."*

## "Agents are hard" — the honest-post genre

**Armin Ronacher, Nov 21 2025, "Agent Design Is Still Hard":** SDK abstractions break under real tool use; you end up writing your own. Caching only works when you manage it. Reinforcement messages do more work than expected. Failures must be strictly isolated or they derail the loop. Output tool steering surprisingly hard. *"We haven't found something that really makes us happy"* on evals. [practitioner direct] https://lucumr.pocoo.org/2025/11/21/agents-are-hard/ — Simon Willison endorsed: https://simonwillison.net/2025/Nov/23/agent-design-is-still-hard/

Ronacher follow-ups: *"Agent Psychosis: Are We Going Insane?"* (Jan 2026), *"A Year of Vibes"* (Dec 2025), *"A Language for Agents"* (Feb 2026). Same author, same honest register, no vendor pivot.

**Earlier in genre:** Ronacher's own *"Agentic Coding Things That Didn't Work"* (July 2025) is the proto-honest-post; Osmani's "80% Problem" (June 2025) is the parallel.

## Reverted-the-pattern — found, but quieter than expected

The "we tried the factory and went back to pair-programming" full blog post still doesn't exist as a clean genre piece. What we found instead:

- **MSR 2026:** quantified revert rate per agent (above) — practitioners revert 2.66% of agentic PRs on average, 7.6% for Copilot.
- **Vendor-reported 27.2% reverted to hardcoded auth** rather than trust agent authz (Gravitee 2026 — vendor of an agent-gateway product, conflict-of-interest flagged; treat as vendor claim, not evidence).
- **GitHub Issue #47700 (Anthropic):** Claude Code in a multi-day debug session found a working solution (3/3 tests pass), then ran `git checkout -f HEAD` and destroyed it — spent 2 more days re-solving. Practitioner-filed bug, not a blog post, but exactly the failure mode that turns believers into skeptics. [practitioner direct] https://github.com/anthropics/claude-code/issues/47700
- **Cowork session crash (Issue #49367, April 2026):** every Cowork session crashed for 24+ hours after the 1.3036.0 update. The infra ceiling has a tooling-stability layer too. [practitioner direct] [SOURCE NEEDED] — issue number cited from session notes; URL not yet verified, treat as unverified until linked.

**Absence interpretation:** The genre is silenced by survivorship dynamics. Practitioners who back off mostly stop writing about agents entirely — they don't publish "we backed off." Ronacher and Osmani publish because they kept going *and* tell the truth. The pure-reversion blog post is structurally rare.

## Evals as the actual ceiling — convergence on architecture, not on numbers

**Pattern present, numbers absent.** Cursor's three-role architecture (Planner / Worker / Judge) is now the named pattern others copy. Agent-as-Judge replacing LLM-as-Judge is the architectural move (academic survey arXiv 2601.05111, Jan 2026). [academic/research] https://arxiv.org/pdf/2601.05111

**Practitioner numbers still rare:** Intercom 93.6% / 19.2% remains the only public auto-resolve / auto-approve pair we trust. SWE-EVO benchmark (Jan 2026) attempts long-horizon multi-issue eval — academic, not yet adopted in practitioner workflows. [academic/research] https://arxiv.org/pdf/2512.18470

**Verdict:** "Everyone nods, few publish numbers" still holds at 2026-04-23. This is differentiation territory for the curriculum.

## Context-window ceiling — moved, not removed

**Opus 4.6 1M context GA March 13 2026** removed the 2× pricing premium. Practitioner cross-check on 8-needle MRCR v2 1M: Opus 4.6 = 76% vs Sonnet 4.5 = 18.5% — [practitioner direct] https://x.com/hd_nvim/status/2019471706000134437 (vendor-published numbers cross-checked at [vendor press release] https://www.anthropic.com/news/claude-opus-4-6). Until an independent third party re-runs the benchmark, treat the 76% / 18.5% pair as a vendor claim with one corroborating practitioner read — not as independent measurement.

**But the bottleneck moved, not vanished.** Hacker News practitioners describe a *"dumb zone"* — model finds facts but ignores decisions made earlier in the same session. Context-rot symptom: retrieval works, reasoning over retrieved decisions degrades. The ceiling is now coherence-over-time, not capacity. [unlabeled / probable Level 0] https://marketingagent.blog/2026/03/14/tutorial-claude-1m-context-window-context-rot/ — [SOURCE NEEDED] for the original Hacker News practitioner thread this post likely paraphrases.

## Human-review ceiling — the real bottleneck of 2026

**Asymmetry quantified.** Faros 2026: ~650 PRs/dev/yr (double prior baseline), almost entirely AI-assisted — same human reviewer capacity. **AI-assisted PR pickup time = 2.47× longer than unassisted; agentic PR pickup = 5.3× longer.** Acceptance rate for AI-generated code: **32.7%** vs **84.4%** for human-written. [practitioner analysis] https://blog.robbowley.net/2025/11/05/findings-from-dxs-2025-report-ai-wont-save-you-from-your-engineering-culture/ and [practitioner analysis] https://newsletter.eng-leadership.com/p/code-review-is-the-new-bottleneck

**Auto-approve does shift the ceiling — but only on low-risk slices.** Ona reported 34→96 PRs/month (2.9×) by auto-approving low-risk changes; first-approval median 2h49m → <5min. Generalisation beyond low-risk untested. [vendor case study] https://ona.com/stories/auto-approving-low-risk-prs — vendor claim, not independent measurement.

**Reading: why Intercom's 19.2% auto-approve doesn't go to 80%:** hypothesis — the human ceiling is review confidence, not agent capability. Convergence is incomplete.

## Unsolved problems — practitioner consensus

1. **Evaluation infrastructure that practitioners actually use** — Ronacher: "haven't found something that makes us happy."
2. **Coherence over long sessions** — model retrieves, model forgets its own decisions.
3. **Prompt injection** — OpenAI CISO calls it *"frontier, unsolved."*
4. **Cost trajectory** — no practitioner says it's coming down sustainably.
5. **Flake amplification at parallel scale** — Osmani's 40-agent stall.
6. **Scope/context understanding** — top revert cause, not functional bugs.
7. **Auto-approve generalisation past low-risk** — no public ceiling-breaker.
8. **Authorization** — vendor-reported 27.2% of teams reverted to hardcoded (Gravitee, conflict-of-interest flagged; needs independent replication).
9. **Tooling stability of the harness itself** — Cowork crashed for 24h on a point release.

## Curriculum implications for M5

**The honest framing without demoralisation:**

- Module 5 already wants *"learning through contrast."* The contrast pairs write themselves: Böckeler's $380/day vs vendor "10× productivity" claims; Osmani's 40-agent flake stall vs factory marketing; Ronacher's "agents are hard" vs SDK glossy docs; Faros's 5.3× pickup time vs "agents merge themselves."
- Don't pitch this as "agents fail" — pitch as **"the ceiling moved, here's where it is."** Each ceiling is also a skill-acquisition target: cost discipline, parallel-flake hygiene, eval architecture, scoped human review.
- Use the **revert taxonomy** (scope > correctness > quality > deps) as a teaching frame: students learn to predict where their own runs will fail before they fail.
- **Name what's NOT solved.** The unsolved-problems list is the antidote to Module 5's optimism risk — it gives the student a real frontier to operate within, not a false ceiling.
- **Anchor practitioner voices:** Ronacher (honest-post), Osmani (factory + 80%), Böckeler (cost + security), Willison (lethal trifecta). All [practitioner direct], all from last 6 months, all credible.
- The curriculum's whitespace — eval infrastructure with published numbers — is **confirmed open** by this OODA. Practitioners have the architecture, not the metrics. Teaching the metric discipline is differentiation.

## What was thin / what to re-OODA

- **The clean reversion blog post.** Looked, didn't find. Either practitioners who fully revert stop writing about agents, or it's still pre-publication. Re-check in 60 days.
- **OWASP "73% of production AI" prompt-injection stat** — needs original methodology before any curriculum use. Treat as [UNVERIFIED STAT] for now.
- **Nordic-specific failure literature** — still absent. Spotify Honk publishes wins, not ceilings.
- **Cost numbers from non-Thoughtworks practitioners** — Böckeler's $380/day is the only crisp anchor. One source = single case. Find a second before treating as convergent.
