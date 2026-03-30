# Agents 102 — Continuous Research System

Curated knowledge engine for the agentic transformation. Multi-user research system that answers the CTO question with evidence, not vendor stories. **Curate → Connect → Advise.**

## Permanent Goals

These are the standing objectives for every session, every agent, every cycle. Not milestones — these never complete.

1. **Continuously monitor the landscape.** Run the research loop. Track platforms, practitioners, deployments, failures. The knowledge base must be more current than any individual person can maintain. If the research system stops, the entire value proposition decays.

2. **Find insights and answers not available with simple internet search.** Google returns vendor press releases, analyst predictions, and rewritten announcements. We produce practitioner-grounded convergence patterns, cross-domain meta-findings, and evidence-ladder-tested claims. If a finding could be assembled from the first page of Google results, it's not worth publishing.

3. **Serve agentic industry leaders — not only Antti.** The knowledge base, insights, and training serve any builder leader navigating the agentic transformation. Antti is the practitioner and curator, not the sole customer. Every research output, every article, every training module should be valuable to a CTO who has never heard of Bosser.

4. **Respond to what users actually need.** User signals (questions, corrections, validations) are the highest-priority research input. The system gets smarter because users steer it — not because researchers guess what matters.

**Value prop:** The hardest problem isn't choosing an agent platform — it's knowing what questions to ask. Without agent competence, a CTO is choosing between marketing stories, not between real capabilities. We build the competence that makes the question askable. Teach everyone to think. Scale for future. With your own structure.

**Buyer:** The builder leader — CEO/CTO/SVP HR who wants to own the transformation, not outsource it. Psychographic, not a title. Target: large Nordic companies in two segments: (1) software companies, (2) traditional companies striving for high digitalization.

**Core insight:** The agentic transformation is different from digital/agile/cloud. Without agent competence, there is no vision — just governance of an abstraction. We are the prerequisite, not the complement. The sequence matters: **Competence → discovery → context → platform.** Skip to platform selection and you're choosing between vendor narratives. Every company runs 200 processes — vendors will sell you automation for the one process they own. The other 199 are yours to figure out, and you need agent competence to even know which 5 to try first. **Tools and connectors commoditize — the real ceiling is organizational learning rate.** How fast can the org learn to create the right context for agents to run? Which processes benefit, what success looks like, what data matters, how to describe the work. That's a human learning rate, not a technical one. Training raises the ceiling. Everything else raises the floor.

**Coding agents are the meta-platform.** Claude Code and Codex are structurally different from every other agent platform because they compound. Copilot Studio can't build another Copilot Studio agent. Agentforce can't extend Agentforce. Coding agents build the MCP server, the agent that uses it, the eval that tests it, and the next agent. Each cycle makes the next cycle faster. They also destroy every alternative at information retrieval and context creation in real enterprise environments — reading repos, crawling docs, querying databases, analyzing APIs, synthesizing across sources, then outputting the structured artifacts (MCP servers, system prompts, eval criteria) that encode context for other agents. Manual curation can't keep up because enterprise context changes continuously and the coding agent re-derives it on demand. The human provides judgment (which processes, what success looks like). The coding agent provides speed. Together they raise the ceiling faster than any other combination.

**80/20 curation model:** 80% frontier research (continuous OODA cycles) + 20% peer premium (user signals, patterns across engagements). The knowledge base compounds: each cycle builds on previous findings, each user signal steers the next cycle. This is the competitive moat — not any single finding, but the live, structured, practitioner-grounded system that stays current.

**Research results live in the synthesis files, not here.** Read `continuous-research/synthesis/index.md` for the current state. Do not hardcode findings in CLAUDE.md — they go stale. The synthesis files are the source of truth.

**Business model and strategy:** See `strategy/` directory. Not repeated here.

**Start here:**
- **Synthesis index (read first):** `continuous-research/synthesis/index.md` — routes to the right topic file in one read
- **User signals:** `continuous-research/user-signals/index.md` — what users are asking, Tier 0 priority

**Synthesis topic files** (in `continuous-research/synthesis/`):
- `cto-answer.md` — which platform for what? The executive summary.
- `platform-trajectories.md` — where each platform is headed
- `domain-convergence.md` — which domains crossed the agent threshold and why
- `enterprise-reality.md` — can any platform pass the multi-tool/multi-turn/security test?
- `patterns.md` — 47 cross-platform patterns, evidence-leveled
- `nordic-landscape.md` — what's happening in the Nordics

**Domain findings** (in `continuous-research/findings/by-domain/`): one file per domain (CS, finance, compliance, operations, HR, sales, coding), evidence-leveled with counter-evidence and Nordic signal.

**Cross-domain patterns** (in `continuous-research/findings/by-pattern/`): hybrid-beats-autonomous, competence-first, rules-verification-scarcity (L4 meta-pattern), promotion-path-gap, conditions-creator.

**Company observations** (in `continuous-research/observations/`): practitioner-level case files on AI-native companies and teams. One file per company. See `observations/README.md` for the watch list and observation guidelines. Covers born-AI-native, transform-in-place, and mid-transition cases across scales from 3 to 182,000 people.

**Research directions:** `continuous-research/research-directions-from-framework.md` — priority-ranked investigation topics from internal practitioner research (compound triggers, verification infrastructure, conditions creator role, experience-first adoption).

**Per-platform detail:** `continuous-research/platform-watch/{microsoft-365,openai,google-workspace,claude-anthropic,vertical-saas}/state.md`

**Operational:**
- Cycle prompt: `continuous-research/platform-watch/cycle-prompt.md` — self-contained researcher instructions
- Research priorities (Tier 1/2/3): `continuous-research/platform-watch/synthesis.md`
- Meta-learning: `continuous-research/platform-watch/meta-learning.md`
- Source roster: `continuous-research/source-roster.md`
- Research insights: `continuous-research/insights.md`
- Evals: `evals/` — Theme A-E, 10 retrieval quality questions

**Strategy (internal):** `strategy/` — business model, assumptions, marketing. Not research output.

**Continuous research — two systems:**

1. **Domain research** (`continuous-research/README.md`) — what's becoming possible in agentic business practices, beyond coding. Tracks innovators and early adopters across operations, finance, HR, compliance, customer service, sales, product. Translates chasm-crossing patterns for early majority buyers. All findings tagged Global vs. Nordic.

2. **Platform watch** (`continuous-research/platform-watch/`) — which platform can do which use cases for business users. Semi-autonomous hourly OODA cycles tracking Microsoft, Google, OpenAI, Anthropic, and vertical SaaS. Answers the CTO question with honest evidence-based assessment. Uses personal→team→company agent framework and enterprise reality test (multi-tool, multi-turn, security, promotion path).

3. **User signals** (`continuous-research/user-signals/`) — what users ask and comment. Automatically captured during conversations. User questions reveal demand gaps. User comments reveal corrections, validations, and insights. Signals steer research as Tier 0 priority (above time-sensitive and eval-driven priorities). This is the 20% peer premium — the network's signal is higher value than any researcher's intuition.

**How they connect:** Domain research finds practitioners doing agentic work → platform watch asks: on which platform, how? Platform watch finds gaps → domain research asks: so how ARE people in that function doing it? User signals reveal what CTOs actually need → research prioritizes those gaps. Research insights (`continuous-research/insights.md`) captures nuggets from all three systems for content, training, and advisory.

## User Signal Capture (automatic)

When a user interacts with the research knowledge base, silently capture signals. No YAML, no templates — just plain text.

**Capture a QUESTION when:**
- The KB can't answer well (5+ files needed, or "we don't have evidence")
- The user asks about something no `answers:` frontmatter covers
- Evidence is thin for what they're asking about

**Capture a COMMENT when:**
- User pushes back ("that's not right", "in our experience...")
- User validates ("yes, we saw this too")
- User adds context that changes a finding's interpretation
- User is surprised by an absence ("you don't have anything on X?")

**Format:** One file per signal in `continuous-research/user-signals/questions/` or `comments/`. Filename: `YYYY-MM-DD-{slug}.md`. Content: just the essence in 1-3 lines, plus a `**Gap:**` line if there's a research gap.

**Obfuscation rule:** Strip company names, person names, and identifying details. Keep only the generalizable question or insight. "Should we at Nordea build on Copilot given our AWS stack?" becomes "Can an AWS-native company use Microsoft's agent stack?" The essence transfers to other CTOs. The specific company is irrelevant to research steering.

After creating a signal, add a one-line entry to `continuous-research/user-signals/index.md`.

Do this silently — never ask "should I capture this?"

**Antti's practitioner credentials:** Author of Agents 101 (7 modules including multi-agent workflows, evals, agents building agents). Trained 200+ people at F-Secure, Neste, Posti. Member of Agentics Helsinki (Mikko Alasaarela's community). Not a journalist or analyst — a practitioner who builds what he writes about.

**Bosser identity:** "The best strategies emerge from action, not analysis." Framework-integrative, not framework-driven. See bosser.consulting.

## Multi-User Hygiene

This is a shared, multi-user repository. Research runs continuously on remote branches.

**At session start:** Run `git pull` to get the latest research. Other users and research agents may have committed findings since the last session. Mention this naturally: "Let me grab the latest research first."

**During session:** Commit and push user signal files every 30-60 minutes of active work, or whenever a meaningful signal is captured. Frame it as saving contributions for the research system, not git housekeeping.

**At session end:** Always commit any uncommitted signal files and push. A user's questions and comments are lost to the research system if they stay local.

**Branching model:** `main` is the shared knowledge base — the source of truth all users read from. Research agents running the OODA cycle prompt system can push directly to main — the cycle prompt enforces quality gates. Users and experimental work should use branches; Antti reviews and merges those.

**Marketing funnel:** Newsletter ("Deploying Agents") ↔ Survey (Agentic Readiness Check) → DM. Both entry points cross-feed each other. See `strategy/marketing-plan.md`.

## Research Guidelines

- **Research focus: business processes, not coding.** Agentic coding is a red ocean. Track agents in operations, finance, HR, compliance, customer service, sales, product — the blue ocean where nobody is systematically curating what's possible.
- **Editorial standard:** Practitioner-grounded, specific, verifiable. Every claim needs a named company + specific practice + measurable outcome. "Deployment is happening" is not an insight — the secrets are in the "how" and "what really works."
- **Framework-integrative, not framework-driven.** Frameworks serve the situation, not the other way around.
- **OODA loops for research.** See `continuous-research/platform-watch/cycle-prompt.md` for the self-contained researcher instructions.
- **Obfuscation rule for user signals and practitioner observations:** Strip company names, person names, and identifying details from user-contributed content. Keep only the generalizable insight.
- **COPYRIGHT:** Never reproduce training content from external sources. Research extracts positioning and market insights only.

## Research Method: People-First

**The method is: follow people, not topics.** Google search surfaces the mainstream layer (analyst reports, vendor blogs). The real frontier signal comes from tracking specific practitioners over time. A person's trajectory IS the story — Karpathy going from "agents don't work" to "coding agents actually work" in 6 months tells you more than any Gartner report.

**Three research modes (in priority order):**

1. **Person-deep-dive.** Pick a practitioner from the source roster. Fetch their actual public output: X.com posts, blog posts, LinkedIn, GitHub repos, YouTube talks, podcast appearances. Read what THEY wrote, not what others wrote about them. Map their thinking and trajectory over time. This is the primary research mode.

2. **Community observation.** Go to meetup-style events (Agentics Helsinki, AI Engineer Summit, local AI meetups). Read the conversations — who presented what, what questions were asked, what demos were shown. Antti has direct access to Agentics Helsinki.

3. **Code analysis.** Clone repos, read SDKs, analyze what tools actually do vs. what their marketing claims. The code doesn't lie.

**What we do NOT do:** Broad Google topic searches ("AI agent enterprise 2026") that return analyst reports and vendor blogs. This is banned as a primary research method. Google search is only used to find a specific person's output (e.g., "Mikko Alasaarela agentics blog") — never to survey a topic.

**The signal flow — how adoption actually works:**
```
Solo builders → publish openly → enterprises don't believe →
first teams in proper firms report success → CREDIBILITY SIGNAL →
enterprises start moving
```
The vibe and future is always with single builders and small companies. They publish. They share what works. Enterprises ignore them. But then one team inside a proper firm tries it, reports success — and THAT is the credibility signal. Not because the enterprise team did anything the solo builder didn't. Because a CTO trusts "our team tried it" over "some builder on X.com did it."

**For research, this means two segments to watch:**
1. **Solo builders / small companies** — where the future lives. They show what's POSSIBLE. Follow them for direction.
2. **First enterprise teams reporting success** — where credibility lives. They show what's VIABLE for organizations. Follow them for timing.

The article moment is when segment 2 starts confirming what segment 1 has been saying for 3-6 months. That's the chasm-crossing signal.

**What this replaces:** "Google search → summarize top results" is structurally biased toward Level 0 content. It always finds Gartner first. People-first research finds the practitioner layer that Google ranks below the fold.

**Operationalizing in subagents:** When launching research agents, provide named people to investigate, specific thread URLs to fetch, or specific repos to analyze — not broad topic searches. "What has Simon Willison written about agents in the last 3 months?" beats "AI agent reality 2026."

## Research Quality Protocol

When running OODA research agents, enforce these quality gates:

**Source URL rule — MANDATORY:**
Every claim, statistic, and finding MUST include a specific, verifiable URL. Not "Gartner says X" — include the URL to the Gartner page. Not "Web search synthesis" — find the actual source and link it. If a URL cannot be found, the claim must be explicitly marked as `[SOURCE NEEDED]`. Unsourced statistics destroy credibility faster than no statistics at all.

**Source type classification — MANDATORY:**
Every URL must be classified at write time. No exceptions.

**Sources that understand agents (use these):**
- **Practitioner direct** (person's own blog, X.com thread, conference talk, podcast, GitHub) = **best evidence.** The person built it or deployed it. They know what it actually does.
- **Practitioner-to-practitioner analysis** (one builder analyzing another's work, code review, technical teardown) = **strong evidence.** They understand enough to evaluate.
- **Domain-specific trade publication** (Artificial Lawyer for legal tech, FFNews interviewing a compliance officer about their work) = **acceptable** — IF the journalist specializes in the domain and the interview adds substance beyond the announcement.
- **Academic/research** (Princeton, CMU benchmarks, peer-reviewed) = **strong evidence** for patterns and frameworks.

**Sources that do NOT understand agents (use only for bare facts):**
- **General press** (CNBC, Bloomberg, Reuters, TechCrunch, The Verge) = **useful only for "this happened" facts** (funding rounds, partnerships, personnel changes). NOT useful for "how it works," "what it means," or "is it real." A CNBC journalist writing about Goldman Sachs using Claude for trade accounting does not understand what that means technically. They are reporting the announcement with extra quotes. Treat general press as confirming that something was announced — not that it works.
- **Tech press** (Wired, Ars Technica, VentureBeat) = same problem. Even tech journalists rarely understand the difference between a chatbot and an agent. Their articles compress nuance into headlines.

**Sources that are not evidence at all (Level 0):**
- **Vendor press release** (BusinessWire, company blog about own product, company newsroom) = **NOT EVIDENCE.** Marketing.
- **Press release republished as news** (news site reprinting vendor announcement verbatim, even with a journalist byline) = **still Level 0.** The publication name doesn't upgrade it.
- **Vendor case study** (customer success story on vendor's website) = curated advertising. Level 0.
- **Analyst predictions** (Gartner, Forrester, IDC) = paid opinion. Level 0.

**The test:** Does the author understand what an agent is — multi-step autonomous work with tool use, not a chatbot? If they use "AI agent" to mean "chatbot with a personality," the source doesn't understand the domain. Discard for insight, keep only for bare facts.

**Freshness rule — MANDATORY:**
Only cite evidence from the last 6 months. AI capability moves so fast that even expert opinions (Karpathy, Altman, Amodei) go stale within months. A benchmark from Sonnet 3.5 says nothing about Opus 4.6. A study from 2024 is archaeology, not evidence. If a source is older than 6 months, it can only be used as historical context, explicitly dated and never as a current finding.

**Subagent injection rule — MANDATORY:**
Subagents do NOT read CLAUDE.md. Every research AND content subagent prompt MUST include ALL of these rules inline (copy-paste, not "follow project standards"):
1. The evidence ladder (levels 0-4) with the rule that analyst predictions and vendor claims are Level 0
2. The source hierarchy (practitioner > third-party > independent journalism > vendor press release)
3. The source type classification (see above — vendor press releases, company blogs about own products, and press releases republished as news are ALL Level 0)
4. The freshness rule (last 6 months only)
5. The source URL rule (every claim needs a clickable URL)
6. The source type label (every URL must be labeled: independent journalism / practitioner direct / trade interview / vendor press release / republished PR)
7. The confirmation bias guard: "Test the hypothesis, don't confirm it. Actively search for counter-evidence."
Without these rules inline, subagents will cite Gartner, use stale benchmarks, accept vendor press releases as evidence, and confirm whatever thesis they're given.

**Content pipeline verification gate — MANDATORY:**
Before any article is drafted, every source must be verified:
1. Open each URL (or fetch via WebFetch)
2. Classify its source type using the rules above
3. Any Level 0 source must be replaced or the claim dropped
4. This gate applies to the orchestrator, not delegated to the drafting agent
No article goes to draft with unverified sources. The research may contain Level 0 sources (labeled as "vendor claim") — the article may not.

**Three admission gates per finding:**
1. **Is it truly agentic?** Multi-step autonomous work, not a chatbot/copilot/dashboard. Chatbots go in "Context" section, not "Findings."
2. **Is the evidence independent?** At least one non-vendor source. Vendor-only sources get flagged as "Vendor claim — unverified."
3. **Is there a specific outcome?** Named company + specific practice + measurable result + **source URL**. "AI is being used in X" is not a finding.

**Three sources CTOs don't trust — and what they DO trust:**
- **Vendor claims are marketing until independently verified.** "SAP says 70% time savings" is not a finding — it's an ad. Who verified it? What baseline? Which customer? If the only source is the vendor's press release, file it as "Vendor claim" with that label visible.
- **Track the gap between announcement and deployment.** "Oracle announced 40+ agents" tells us nothing. How many are being used, by whom, with what results? The announcement-to-deployment gap IS the story. We report the gap, not the announcement.
- **Source hierarchy:** (1) Practitioner speaking/writing about their own work > (2) Practitioner analyzing another practitioner's work > (3) Domain trade publication interview > (4) Academic research > (5) General press (bare facts only) > (6) Vendor press release (Level 0). Only levels 1-4 count as evidence. Level 5 confirms announcements. Level 6 is marketing.
- **Single early adopter "propeller heads" are also not trusted.** One builder on X.com saying "I built an agent that does X" is a curiosity, not evidence. Could be genius. Could be survivorship bias. CTOs don't trust individual early adopters any more than they trust vendors.
- **What CTOs DO trust: convergence.** When 10-20 independent practitioners are making the same leap — different people, different companies, same outcome — that's signal. Think of agentic coding in early 2025: one person shipping with Claude was a curiosity. When 10-20 developers were independently shipping real things, CTOs started believing. The pattern made it real, not the individual claim.
- **Our editorial threshold:** We don't report a single experiment as a finding. We report convergence — when multiple independent signals point the same direction. A finding becomes "this is becoming possible" when we can show the pattern across practitioners, not when one propeller head demos it.
- **In content:** actively contrast vendor claims with deployment reality, and synthesize individual signals into convergence patterns. "One company tried X" is a blog post. "Here are 10 companies independently doing X — here's the pattern" is the insight CTOs will share.

**Evidence ladder (modeled on scientific knowledge accumulation):**
We don't do science, but we follow the same credibility process. Knowledge accumulates through levels — each level is more trustworthy than the last:

1. **Opinion** — builder/analyst says "I think X will happen" → context only, never report as finding
2. **Single experiment** — one company deployed and reports results → supporting evidence, clearly labeled as single case
3. **Convergence** — 10-20 independent practitioners report the same pattern → **this is where we report.** This is signal.
4. **Cross-domain meta-pattern** — the same pattern holds across multiple domains → **premium insight.** The strongest claim we can make.

**Commercial content sits outside the ladder entirely:**
- Vendor press releases = advertising (not level 1, not even opinion — it's marketing)
- Vendor case studies = curated advertising
- Analyst predictions = paid opinion
- Consultancy frameworks = opinion dressed as methodology
None of these are evidence. They can be referenced for context but never presented as findings and never climb the ladder. A SAP press release is not an experiment. A Gartner prediction is not a survey. Mixing advertising with knowledge is what destroys credibility.

**Finding categories in each domain file:**
1. **Production Agentic Deployments** — meets all three gates
2. **Platform / Vendor Announcements** — agents shipping in SaaS platforms
3. **Context** — chatbots, market statistics, regulatory background, vendor claims

**Deduplication:** Each company appears as a primary finding in exactly one domain. Other domains reference with a 2-line summary.

**Nordic label precision:**
- **Nordic-origin deployment** — Nordic company deploying agents in Nordic context
- **Nordic-available platform** — global platform used by Nordic companies (different from a Nordic deployment)
- **Nordic-relevant pattern** — global deployment whose pattern transfers to Nordic conditions

**Every domain file must include a "What We Did Not Find" section.** Absence of evidence is often more valuable than the findings.

**Orchestration sequencing:** Run domain tracks in parallel, then cross-cuts after domain tracks complete (cross-cuts synthesize across domains). Run a quality review step before synthesis.

**Fill the master research log** in `continuous-research/nordic-agentic-practices-prompts.md` after each track completes.

## Subagent Injectable Rules Block

**Copy-paste this entire block into every research and content subagent prompt.** Do not paraphrase or abbreviate. Subagents do not read CLAUDE.md — this is their only source of quality rules.

```
=== MANDATORY RESEARCH RULES (copy-pasted from project rules) ===

EVIDENCE LADDER:
- Level 0: Commercial content (vendor press releases, vendor blogs, vendor case studies, analyst predictions, consultancy frameworks). NOT EVIDENCE. Outside the ladder entirely.
- Level 1: Opinion (practitioner says "I think X"). Context only.
- Level 2: Single experiment (one company deployed, reports results). Supporting evidence, labeled as single case.
- Level 3: Convergence (10-20 independent practitioners report same pattern). THIS IS WHERE WE REPORT.
- Level 4: Cross-domain meta-pattern. Premium insight.

SOURCE TYPE CLASSIFICATION — label every URL with one of:

Sources that UNDERSTAND agents (use these):
- [practitioner direct] — person's own blog, X.com, conference talk, GitHub. BEST EVIDENCE. They built it.
- [practitioner analysis] — one builder analyzing another's work, technical teardown. STRONG.
- [domain trade publication] — specialist journalist interviewing practitioner about their work. ACCEPTABLE if substantive.
- [academic/research] — university research, benchmarks, peer-reviewed. STRONG for patterns.

Sources that DO NOT understand agents (bare facts only):
- [general press] — CNBC, Bloomberg, TechCrunch etc. Journalists don't understand agents. Useful ONLY for "this happened" facts (funding, partnerships). NOT useful for "how it works" or "is it real." A CNBC article about Goldman using Claude = confirms announcement, not that it works.
- [tech press] — same problem. Even tech journalists conflate chatbots with agents.

NOT EVIDENCE (Level 0):
- [vendor press release] — BusinessWire, company blog about OWN product. Marketing.
- [republished PR] — news site reprinting vendor announcement, even with journalist byline. Still Level 0.
- [vendor case study] — customer success on vendor's website. Curated advertising.
- [analyst prediction] — Gartner, Forrester, IDC. Paid opinion.

THE TEST: Does the author understand what an agent is (multi-step autonomous with tool use, NOT a chatbot)? If they use "AI agent" to mean chatbot, the source doesn't understand the domain.

FRESHNESS: Only cite evidence from last 6 months. Older sources = historical context only, explicitly dated.

EVERY CLAIM must have: (1) a specific URL, (2) a source type label from the list above. No URL = mark [SOURCE NEEDED].

CONFIRMATION BIAS GUARD: Test the hypothesis, don't confirm it. Actively search for counter-evidence.

THREE GATES per finding:
1. Truly agentic? (multi-step autonomous, not chatbot/copilot)
2. Independent evidence? (at least one non-vendor source)
3. Specific outcome? (named company + practice + measurable result + URL)

=== END RULES ===
```

## Orchestrator Pattern for Multi-File Work

When a task spans many files (audits, research runs, bulk edits), use this pattern to preserve main thread context:

1. **Main thread = orchestrator only.** Do not read or process the target files yourself. Delegate all file-reading and analysis to subagents.
2. **Split work into 3-5 parallel subagents** by file group. Each agent reads its files, does the analysis, and writes results to a dedicated output file (e.g., `analytics/audit-batch-{N}.md`).
3. **Subagents write, not talk.** Each agent writes structured output to disk. Main thread reads only the summary files, not the source files.
4. **Synthesize from summaries.** After agents complete, main thread reads the output files (small, structured) and synthesizes a single verdict for the user.
5. **Launch all agents in one message** to maximize parallelism. Use `run_in_background: true` so the main thread stays responsive.

This keeps the main context window free for user interaction and synthesis instead of burning it on raw file content.

**Marketing funnel:** Newsletter ("Deploying Agents") ↔ Survey (Agentic Readiness Check) → DM. Both entry points cross-feed each other. See `strategy/marketing-plan.md`.
- This is independent intellectual property — see COPYRIGHT.md for details

## Self-Review Protocol

At the **start of each session**, read `memory/self-review-protocol.md` — specifically the heuristics and next-session predictions. Apply them before doing any work.

At the **end of significant sessions**, run a self-review:
1. Identify corrections Antti made (where my approach was redirected)
2. Classify each correction (style, strategy, decision, process, persona)
3. Update the correction log and heuristics in `memory/self-review-protocol.md`
4. Update next-session predictions
5. Check for recurring patterns — if the same correction appears 3+ times, escalate it to a hard rule in the heuristics

The goal: Antti's steering should diminish over time because I learn from each session. If I'm still asking the same kind of questions or making the same framing errors after 5 sessions, the protocol isn't working.
