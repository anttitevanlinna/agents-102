# Agents 102

Training program for building AI agents. Four things: **Train → Curate → Connect → Advise.**

**Value prop:** Teach everyone to think. Scale for future. With your own structure.

**Buyer:** The builder leader — CEO/CTO/SVP HR who wants to own the transformation, not outsource it. Psychographic, not a title. Target: large Nordic companies in two segments: (1) software companies, (2) traditional companies striving for high digitalization.

**Core insight:** The agentic transformation is different from digital/agile/cloud. Without agent competence, there is no vision — just governance of an abstraction. We are the prerequisite, not the complement.

**Five-step customer journey:** Bootstrap (€500/person, 2 days) → Make Your Own (change strategy lab, 4-6 weeks, €25-40K/org) → Champions (train-the-trainer, €3-5K/person) → Scale (champions run internally, €0) → Drive into Value Chains (agentic rework + peer network).

**Model:** Framework + plug points. Co-branded, co-copyright — the org co-owns all materials for further development. 80/20 curation: 80% frontier research + 20% peer premium. We are curator + researcher, not the authority.

**Agent Platform Advisory** (separate offering, sold independently alongside the 5-step journey):
Agent platform context building, selection, and deployment — done the agentic way, because no other way works. No person has comparative experience across agent platforms — the field moves too fast. The comparative analysis is the agent's job. Context is everything — only the org's people know their requirements, systems, and constraints. People drive, agents do the heavy lifting. Bosser builds the agentic system that synthesizes people's thinking into structured context, evaluates platforms against that context, deploys, and generates training materials. Co-owned: deployed on customer's side, customer keeps it, can re-run as context evolves. Bosser retains the right to learn and extract patterns across engagements (the peer premium). No real players in Helsinki (Feb 2026 scan). Timing: typically ~1 month after Bootstrap.

**Key files:**
- Business model canvas: `strategy/business-model-canvas.md`
- Assumption map: `strategy/assumption-map.md`
- Marketing plan: `strategy/marketing-plan.md`
- Content strategy: `content-strategy.md`
- Training outline: `training-outline.md`
- Learning goals: `learning-goals.md`
- Nordic digital leaders: `research/nordic-digital-leaders-findings.md`
- All competitor/market research: `research/` directory (see MEMORY.md for index)
- Continuous research system: `continuous-research/README.md`
- Nordic agentic practices research: `continuous-research/nordic-agentic-practices-prompts.md`
- Nordic agentic practices map (Q1 2026 synthesis): `continuous-research/nordic-agentic-practices-map.md`
- Domain findings: `continuous-research/findings/` (7 domain files + 3 cross-cut files)

**Continuous research:** We run a forward-looking research program tracking what's just now becoming possible in agentic business practices — **beyond coding**. Agentic coding is a red ocean. Our focus is the other 90% of the company: operations, finance, HR, compliance, customer service, sales, product. We watch innovators and early adopters (Moore's adoption curve / Crossing the Chasm), then translate chasm-crossing patterns for our early majority buyers. All findings tagged Global vs. Nordic. See `continuous-research/` for the full system, source tiers, and OODA research prompts.

**Antti's practitioner credentials:** Author of Agents 101 (7 modules including multi-agent workflows, evals, agents building agents). Trained 200+ people at F-Secure, Neste, Posti. Member of Agentics Helsinki (Mikko Alasaarela's community). Not a journalist or analyst — a practitioner who builds what he writes about.

**Bosser identity:** "The best strategies emerge from action, not analysis." Framework-integrative, not framework-driven. See Bosser site at `/Users/anttitevanlinna/Projects/bosser/docs/index.html`.

## Existing training

A working version of this training already exists and is being delivered at F-Secure. The existing curriculum has not yet been incorporated into this project's materials. It is a key input for future curriculum development. Curriculum production proceeds independently — F-Secure materials will be incorporated later.

## Curriculum Production

**Scope:** Bootstrap (Step 1) — the 2-day intensive. Eight modules, each a single markdown file in `curriculum/`.

**Source of truth:** `training-outline.md` defines the arc. `learning-goals.md` defines what graduates can do. `content-strategy.md` defines the storyline and positioning. Curriculum modules are the executable version of these three documents.

**Modules:**
1. `curriculum/module-01-getting-going.md` — Getting Going
2. `curriculum/module-02-building-agent-systems.md` — Building Agent Systems
3. `curriculum/module-03-multi-agent-systems.md` — Multi-Agent Systems
4. `curriculum/module-04-security.md` — Security
5. `curriculum/module-05-output-quality.md` — Output Quality and Hallucination Control
6. `curriculum/module-06-evals.md` — Evaluations
7. `curriculum/module-07-agent-platforms.md` — Agent Platforms
8. `curriculum/module-08-agents-building-agents.md` — Agents Building Agents (The Flywheel)

**Arc logic:**
- **Modules 1-3** build incrementally: get started → grow the project → coordinate multiple agents. Each module's project grows from the previous one — not throwaway exercises but a single system that gets more sophisticated.
- **Modules 4-6** add the disciplines that separate toys from production: security, output quality, evals. These retrofit onto what was built in 1-3 — participants experience "I built something that works but I can't trust yet."
- **Module 7** zooms out: where do agents live in the real world? Platforms, deployment, the landscape.
- **Module 8** is the flywheel insight: agents that build agents. Code-generating agents as the meta-tool. This is the "ramp to stars" — the insight that changes how participants think about scaling.

**Guardrails:** `curriculum/lecture-guardrails.md` defines the pedagogical rules every module must pass. Read it before writing any module.

### Module Format

Each module is a single markdown file with this structure:

```
# Module N: [Title]

## Meta
- Duration: [estimated time]
- Prerequisites: [what participants need — prior modules, tools, accounts]
- Materials: [what facilitator prepares — sample data, repos, API keys]
- Pillar focus: [which of the four pillars this module emphasizes]

## Learning Objectives
[3-5 specific things participants will be able to do after this module]

## Setup
[Exact steps to get ready — Claude Code installed, project initialized, etc.]

## Exercises
[The core. Numbered steps. Each step has:]
### Exercise N.1: [Name]
**What you do:** [Clear instruction — what to type, what to create]
**What happens:** [Expected behavior — what the agent produces]
**The point:** [Why this matters — the insight this exercise creates]
**Facilitator note:** [Timing, common questions, what to watch for]

## Key Concepts
[Concepts that EMERGE from the exercises — never presented before doing]

## Plug Points
[Where organizations insert their own context — policies, data, systems]

## Reflection
[Discussion prompts for the group — what surprised you, what worried you]

## Bridge
[How this connects to the next module — the natural "what's next" question]
```

### Exercise Design Rules

- **Claude Code specific.** Exercises use Claude Code — exact commands, expected outputs, troubleshooting. Not tool-agnostic.
- **Exercise-led, not lecture-led.** Concepts emerge from doing. Never explain a concept before the exercise that demonstrates it. The exercise IS the explanation.
- **Real data, not toy data.** Participants use their own LinkedIn profiles, their own org's policies, their own domain. Not sample_data.csv.
- **Fabrication is the teaching moment.** Module 1 deliberately pushes until the agent fabricates. Every subsequent module builds on "useful AND unreliable."
- **Incremental complexity.** Each exercise adds one thing. Never two new concepts in one exercise.
- **Show the failure mode.** For every capability, show what goes wrong without the discipline. Security: show the injection. Evals: show the undetected fabrication. Lifecycle: show the stale agent.
- **The four pillars (LLM-based, secure, lifecycle, reliable) are woven through, not bolted on.** Every module touches reliability. Security is not just Module 4.

### Plug Points Framework

Plug points are where the organization's own reality replaces our generic content. Mark them clearly in exercises:

```
> **🔌 PLUG POINT:** [What the org inserts here]
> Default: [What we provide if they don't have their own]
```

Examples: security policies, data classification rules, compliance requirements, domain-specific evaluation criteria, org structure for agent ownership.

### Content Boundaries

- **Technical depth:** Enough to build, not enough to become an ML engineer. Participants should understand WHY things work, not the math of HOW.
- **No slides.** The markdown IS the material. Facilitator works from the same document.
- **No vendor comparison.** We use Claude Code. We don't compare it to alternatives in the curriculum.
- **COPYRIGHT:** All exercises, examples, and instructional language must be original. Never reproduce or adapt exercises from competitors, courses, or external training materials.

## Project guidelines

- **COPYRIGHT: Do not reproduce, paraphrase, or closely adapt training content from any external source.** All curriculum content must be original. When researching competitors or benchmarks, extract insights about positioning and market gaps — never copy exercises, module structures, or instructional language.
- This is an educational project, not a software product
- Prioritize clarity and accessibility over technical depth
- Explain concepts in plain language first, then add technical detail where needed
- Use practical, real-world examples that resonate with business contexts
- Keep exercises hands-on and achievable without prior coding experience
- Framework-integrative, not framework-driven — frameworks serve the situation
- Research uses OODA loops — see `research/competitor-research-prompts.md` for competitor methodology and `continuous-research/nordic-agentic-practices-prompts.md` for ongoing agentic practices research
- **Research focus: business processes, not coding.** Agentic coding is a red ocean. Track agents in operations, finance, HR, compliance, customer service, sales, product — the blue ocean where nobody is systematically curating what's possible
- **Research editorial standard:** Practitioner-grounded, specific, verifiable. Not generic tech news or consultancy clickbait. Every claim needs a named company + specific practice + measurable outcome. "Deployment is happening" is not an insight — the secrets are in the "how" and "what really works." See research quality protocol below.

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
