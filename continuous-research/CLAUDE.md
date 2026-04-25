# Continuous Research — System Guide

Auto-loads when editing files under `continuous-research/`. Loads alongside the project root `CLAUDE.md` (which carries permanent goals, copyright, subagent rule injection, orchestrator pattern). This file carries research-specific navigation, methodology, and quality rules.

## Start here

- **Synthesis index (read first):** `synthesis/index.md` — routes to the right topic file in one read
- **User signals:** `user-signals/index.md` — what users are asking, Tier 0 priority

**Synthesis topic files** (in `synthesis/`):
- `cto-answer.md` — which platform for what? The executive summary.
- `platform-trajectories.md` — where each platform is headed
- `domain-convergence.md` — which domains crossed the agent threshold and why
- `enterprise-reality.md` — can any platform pass the multi-tool/multi-turn/security test?
- `patterns.md` — 47 cross-platform patterns, evidence-leveled
- `nordic-landscape.md` — what's happening in the Nordics

**Domain findings** (`findings/by-domain/`): one file per domain (CS, finance, compliance, operations, HR, sales, coding), evidence-leveled with counter-evidence and Nordic signal.

**Cross-domain patterns** (`findings/by-pattern/`): hybrid-beats-autonomous, competence-first, rules-verification-scarcity (L4 meta-pattern), promotion-path-gap, conditions-creator, absorption-bottleneck, experience-first-adoption.

**Company observations** (`observations/`): practitioner-level case files on AI-native companies and teams. One file per company. See `observations/README.md` for the watch list and guidelines. Covers born-AI-native, transform-in-place, and mid-transition cases across scales from 3 to 182,000 people.

**Research directions:** `research-directions-from-framework.md` — priority-ranked investigation topics from internal practitioner research (compound triggers, verification infrastructure, conditions creator role, experience-first adoption).

**Per-platform detail (12 categories):** `platform-watch/{microsoft-365,openai,google-workspace,claude-anthropic,aws-bedrock,vertical-saas,open-source-frameworks,rpa-to-agent,collaboration-platforms,agent-infrastructure,ai-native-startups,coding-agents}/state.md`

**Operational:**
- Cycle prompt: `platform-watch/cycle-prompt.md` — self-contained researcher instructions
- Research priorities (Tier 1/2/3): `platform-watch/synthesis.md`
- Meta-learning: `platform-watch/meta-learning.md`
- Source roster: `source-roster.md`
- Research insights: `insights.md`
- Evals: `../evals/` — Theme A-E, 10 retrieval quality questions

## Three systems

1. **Domain research** (`README.md`) — what's becoming possible in agentic practices across operations, finance, HR, compliance, customer service, sales, product, AND coding. Tracks innovators and early adopters. Translates chasm-crossing patterns for early majority buyers. All findings tagged Global vs. Nordic. Coding research is a peer track to business-process research (not an exclusion); needed to keep Agentic Engineering 101 current on L3 practice, factory patterns, multi-agent deliberation, MCP server ecosystems, and what lands in Claude Code / Codex / Cursor monthly.

2. **Platform watch** (`platform-watch/`) — which platform can do which use cases for business users. Semi-autonomous hourly OODA cycles tracking Microsoft, Google, OpenAI, Anthropic, vertical SaaS, AWS Bedrock, and RPA-to-agent platforms (UiPath, Automation Anywhere, Power Automate). Answers the CTO question with evidence-based assessment. Uses personal→team→company agent framework and enterprise reality test (multi-tool, multi-turn, security, promotion path).

3. **User signals** (`user-signals/`) — what users ask and comment. Automatically captured during conversations. User questions reveal demand gaps. User comments reveal corrections, validations, and insights. Signals steer research as Tier 0 priority (above time-sensitive and eval-driven priorities). The 20% peer premium — the network's signal is higher value than any researcher's intuition.

**How they connect:** Domain research finds practitioners doing agentic work → platform watch asks: on which platform, how? Platform watch finds gaps → domain research asks: so how ARE people in that function doing it? User signals reveal what CTOs actually need → research prioritizes those gaps. Research insights (`insights.md`) captures nuggets from all three systems for content, training, and advisory.

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

**Format:** One file per signal in `user-signals/questions/` or `user-signals/comments/`. Filename: `YYYY-MM-DD-{slug}.md`. Content: just the essence in 1-3 lines, plus a `**Gap:**` line if there's a research gap.

**Obfuscation rule:** Strip company names, person names, and identifying details. Keep only the generalizable question or insight. *"Should we at Nordea build on Copilot given our AWS stack?"* becomes *"Can an AWS-native company use Microsoft's agent stack?"* The essence transfers to other CTOs; the specific company is irrelevant to research steering.

After creating a signal, add a one-line entry to `user-signals/index.md`.

Do this silently — never ask *"should I capture this?"*

## Research Guidelines

- **Scope: agentic practices across business AND engineering.** Business-process research (operations, finance, HR, compliance, customer service, sales, product) is the primary body of work. Coding research is a peer track — coding agents are the meta-platform; practitioner-grounded evidence on factory patterns (Intercom, Ramp), multi-agent engineering deliberation, MCP server ecosystems, skills marketplaces, eval-as-infrastructure at PR scale, and monthly Claude Code / Codex / Cursor deltas is needed to keep AE101 current.
- **Editorial standard:** Practitioner-grounded, specific, verifiable. Every claim needs a named company + specific practice + measurable outcome. *"Deployment is happening"* is not an insight — the secrets are in the *how* and *what really works*.
- **Framework-integrative, not framework-driven.** Frameworks serve the situation, not the other way around.
- **OODA loops for research.** See `platform-watch/cycle-prompt.md` for self-contained researcher instructions.
- **Obfuscation rule for user signals and practitioner observations:** Strip company names, person names, and identifying details from user-contributed content. Keep only the generalizable insight.

## Research Method: People-First

**Follow people, not topics.** Google search surfaces the mainstream layer (analyst reports, vendor blogs). The real frontier signal comes from tracking specific practitioners over time. A person's trajectory IS the story — Karpathy going from *"agents don't work"* to *"coding agents actually work"* in 6 months tells you more than any Gartner report.

**Three research modes (in priority order):**

1. **Person-deep-dive.** Pick a practitioner from the source roster. Fetch their actual public output: X.com posts, blog posts, LinkedIn, GitHub repos, YouTube talks, podcast appearances. Read what THEY wrote, not what others wrote about them. Map their thinking and trajectory over time. Primary research mode.

2. **Community observation.** Meetup-style events (Agentics Helsinki, AI Engineer Summit, local AI meetups). Read the conversations — who presented what, what questions were asked, what demos were shown. Antti has direct access to Agentics Helsinki.

3. **Code analysis.** Clone repos, read SDKs, analyze what tools actually do vs. what their marketing claims. The code doesn't lie.

**What we do NOT do:** Broad Google topic searches (*"AI agent enterprise 2026"*) that return analyst reports and vendor blogs. Banned as a primary research method. Google search is only used to find a specific person's output (e.g., *"Mikko Alasaarela agentics blog"*) — never to survey a topic.

**The signal flow — how adoption actually works:**
```
Solo builders → publish openly → enterprises don't believe →
first teams in proper firms report success → CREDIBILITY SIGNAL →
enterprises start moving
```
The vibe and future is always with single builders and small companies. They publish. They share what works. Enterprises ignore them. Then one team inside a proper firm tries it, reports success — and THAT is the credibility signal. Not because the enterprise team did anything the solo builder didn't. Because a CTO trusts *"our team tried it"* over *"some builder on X.com did it."*

**Two segments to watch:**
1. **Solo builders / small companies** — where the future lives. They show what's POSSIBLE. Follow them for direction.
2. **First enterprise teams reporting success** — where credibility lives. They show what's VIABLE for organizations. Follow them for timing.

The article moment is when segment 2 starts confirming what segment 1 has been saying for 3–6 months. That's the chasm-crossing signal.

**Operationalizing in subagents:** When launching research agents, provide named people to investigate, specific thread URLs to fetch, or specific repos to analyze — not broad topic searches. *"What has Simon Willison written about agents in the last 3 months?"* beats *"AI agent reality 2026."*

## Research Quality Protocol

Research rules (evidence ladder L0–L4, source-type labels, freshness, zombie-stat guard, three admission gates) live at **`.claude/rules/research-rules.md`** — canonical. Main-thread work routes there via `memory/check_research_claims.md`; subagents read the rules file prepended to their prompt.

The strategic frame — the *why* behind the rules — stays here:

**Three sources CTOs don't trust:**
- **Vendor claims are marketing until independently verified.** *"SAP says 70% time savings"* is not a finding — it's an ad. If the only source is the vendor's press release, file it as *"Vendor claim"* with that label visible.
- **Announcement ≠ deployment.** *"Oracle announced 40+ agents"* tells us nothing. How many are being used, by whom, with what results? The announcement-to-deployment gap IS the story.
- **Single early-adopter propeller heads.** One builder on X.com saying *"I built an agent that does X"* is a curiosity, not evidence. Could be genius. Could be survivorship bias.

**What CTOs DO trust: convergence.** When 10–20 independent practitioners make the same leap — different people, different companies, same outcome — that's signal. One person shipping with Claude was a curiosity; 10–20 developers independently shipping real things was the pattern that made it real. Editorial threshold: convergence, not single experiments.

**Operational:**
- **Finding categories per domain file:** (1) Production Agentic Deployments (meets all three gates); (2) Platform / Vendor Announcements; (3) Context.
- **Deduplication:** each company appears as a primary finding in one domain; others reference with a 2-line summary.
- **Nordic label precision:** *Nordic-origin deployment* (Nordic company, Nordic context) ≠ *Nordic-available platform* (global platform used by Nordic companies) ≠ *Nordic-relevant pattern* (global deployment whose pattern transfers).
- **Every domain file includes a "What We Did Not Find" section.** Absence of evidence is often more valuable than the findings.
- **Sequencing:** domain tracks in parallel → quality review → cross-cuts synthesize across domains.
- **Master research log** at `nordic-agentic-practices-prompts.md` after each track completes.

## Antti's practitioner credentials

Author of Agents 101 (7 modules including multi-agent workflows, evals, agents building agents). Trained 200+ people at F-Secure, Neste, Posti. Member of Agentics Helsinki (Mikko Alasaarela's community). Not a journalist or analyst — a practitioner who builds what he writes about.

**Bosser identity:** *"The best strategies emerge from action, not analysis."* Framework-integrative, not framework-driven. See bosser.consulting.
