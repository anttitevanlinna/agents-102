---
type: prompt
domain: cross-domain
evidence_level: null
platforms: [microsoft, google, openai, anthropic, aws, vertical-saas, open-source-frameworks, rpa-to-agent, collaboration-platforms, agent-infrastructure, ai-native-startups, coding-agents]
nordic: false
updated: 2026-04-02
answers:
  - "how does the platform watch research cycle work?"
  - "what are the research rules and priorities?"
---

# Platform Watch — OODA Cycle Prompt

This prompt drives each incremental research cycle. Run with `/loop 60m` or manually.

## What This Research Is About

**Business agents** — not coding agents. We track what a sales person, finance analyst, HR manager, compliance officer, or operations lead can do with agent platforms today. These people use SharePoint, Teams, Outlook, Salesforce, Google Workspace. Not Git, not terminals.

**But also: who is doing the work.** Platforms are one axis. Practitioners are the other. A platform with no practitioners using it is vapor. A practitioner building real things on any platform is signal. We track both.

**The framework:** Personal agent → Team agent → Company-wide agent. We track which platforms support each level and whether a promotion path exists between levels.

**The CTO question we answer:** Which platform can do which business use cases? Who is leading? Why? And: who are the practitioners whose trajectory predicts what becomes mainstream 3-6 months later?

**12 platform categories tracked (expanded April 2026):**

| Category | Platforms | State file |
|----------|-----------|-----------|
| Horizontal AI (4) | Microsoft 365, Google Workspace, OpenAI, Anthropic | `{microsoft-365,google-workspace,openai,claude-anthropic}/state.md` |
| Infrastructure (2) | AWS Bedrock/AgentCore, Agent governance/identity layer | `{aws-bedrock,agent-infrastructure}/state.md` |
| Vertical/Domain (2) | Enterprise SaaS (Salesforce, ServiceNow, SAP), AI-native startups (Harvey, Sierra, Sana.ai) | `{vertical-saas,ai-native-startups}/state.md` |
| Build-your-own (2) | Open-source frameworks (LangGraph, CrewAI, Mastra), Coding agents (Claude Code, Copilot, Cursor) | `{open-source-frameworks,coding-agents}/state.md` |
| Adjacent (2) | Collaboration (Atlassian Rovo, Slack, Notion, Zoom), RPA-to-agent (UiPath, Automation Anywhere) | `{collaboration-platforms,rpa-to-agent}/state.md` |

**Geographic method: global first, Nordic subset second.** Always start with the global scan — that tells us what's hot and upcoming. Then check for Nordic signal as a subset — that tells us roll-out speed and local adoption patterns. If we start Nordic-first, we miss signals. The Nordic scan is never the primary research — it's the "and where are the Nordics on this?" follow-up.

**Related: Domain practitioner research** (separate system, `../README.md` + `../search-logs/` + `../source-roster.md`). Tracks what practitioners are actually doing per business function (sales, finance, HR, compliance, operations, product). Domain findings live in `../findings/by-domain/` (one file per domain, evidence-leveled). Cross-domain patterns live in `../findings/by-pattern/`. When you find a practitioner doing real agentic work, note which platform they're using — that feeds back into this system. When you find a platform gap, note which business function it blocks — that feeds the domain research.

## Cycle Execution

### Step 1: Read current state and meta-learning

Read `../user-signals/index.md` first — user questions and comments are the highest-priority steering input (Tier 0). If there are open signals, they take priority over everything except active Tier 1 deadlines.

Then read `meta-learning.md` — the research heuristics and recent cycle observations. These tell you what previous cycles learned about how to research effectively. Apply them before choosing your focus.

Then read the synthesis index (`../synthesis/index.md`) — it routes you to the right topic file in one read. For research priorities, read `synthesis.md` (the Tier 1/2/3 section). For domain gaps, read `../synthesis/domain-convergence.md`. For platform status, read `../synthesis/platform-trajectories.md`. Read the source roster (`../source-roster.md`) to know who we're tracking. Read the company observations index (`../observations/README.md`) to know which companies we're already tracking — avoid duplicating existing cases, and look for updates to existing ones. Optionally read a target platform's `state.md` if you're going deep on one platform.

### Step 2: Determine focus

**You are semi-autonomous. Choose the research bet that creates the most value this cycle.** There is no default rotation. Read the current state, assess where the biggest gap or freshest signal is, and go there.

**Valid research modes** (pick one per cycle):

1. **Platform deep-dive.** Go deep on one platform — especially when something just shipped (GA, new feature, first deployment evidence). Update the platform's state.md.

2. **Cross-platform pattern.** Pursue a question that cuts across platforms (e.g., "has anyone solved agent memory?", "what does governance adoption look like across platforms?", "is the compound reliability problem being addressed anywhere?").

3. **Practitioner discovery.** Hunt for named practitioners doing business-domain agent work. Not coding agents — business domain: operations, finance, HR, compliance, customer service, sales, product. Search for people who built something, deployed it, and published about results. When you find someone, add them to `../source-roster.md` with their trajectory. **This is as valuable as platform research.** The source roster currently has zero Nordic practitioners and almost no business-domain practitioners globally.

4. **Practitioner deep-dive.** Pick someone from the source roster. Fetch their recent output (X.com posts, blog, LinkedIn, GitHub, YouTube, podcast). Map their trajectory: what do they think now vs. 3-6 months ago? The shift IS the story. Karpathy going from "agents don't work" to "coding agents work" in 6 months told us more than any platform analysis.

5. **Vertical SaaS update.** Check deployment reality for Salesforce Agentforce, ServiceNow, Zendesk, SAP Joule, HubSpot. Practitioner reports, not vendor announcements.

6. **Transformation methods.** How are organizations actually adopting agents? Not the technology — the organizational change. What works: competence-first vs. platform-first? Top-down mandate vs. bottom-up pull? Big vendor assessment vs. lightweight experiments? Who is writing about the HOW of agent transformation, not just the WHAT? This is the other half of the CTO question: "which platform" is one axis, "how to get there" is the other. Track: change management approaches, training-first models, governance-first models, failure patterns in adoption, successful adoption patterns. Our F-Secure evidence (competence creates pull) is Level 2 — look for convergence evidence from other organizations.

7. **Follow a thread.** If you find a practitioner writing about real business agent deployment, follow that thread wherever it leads — across platforms, across domains.

8. **AI-native teams.** How do teams that deeply integrate AI into daily work actually operate? Not "teams using AI tools" — teams where AI is the co-worker, not the tool. Track: team characteristics (size, roles, skill profiles), daily practices (human/AI work division, review processes, context management), tool stacks (what they actually use, what they abandoned), working style (async vs. sync, communication patterns, pace), and failure modes. **Platform signal:** people describe tools when describing how they work — capture every tool mention, it feeds back into platform watch. Three-phase expansion: (1) AI-native teams → (2) AI-native product programs → (3) AI-native companies and their structure. State file: `ai-native-teams/state.md`. Seed signals: compound engineering (Every, Imprint, Autodesk), but the scope is broader than any single methodology.

9. **RPA-to-agent transition.** Track UiPath Agent Builder, Automation Anywhere AI Agent Studio, and Power Automate's agent capabilities. The CTO question: "Should we extend our RPA investment to agents?" Most large Nordic companies have 3-7 year RPA investments. Track: what's genuinely agentic vs. rebranded RPA, practitioner deployment experiences, migration paths. State file: `rpa-to-agent/state.md`.

10. **Collaboration platform agents.** Track agents arriving inside tools people already use: Atlassian Rovo, Slack (Agentforce integration), Notion AI agents, Zoom AI Companion. The "Trojan horse" thesis: do agents bypass platform selection by arriving through collaboration tools? Track: adoption evidence, capability boundaries, cross-system limitations. State file: `collaboration-platforms/state.md`.

11. **Agent infrastructure & governance.** Track the meta-layer: Okta for AI Agents, NVIDIA OpenShell, ConductorOne, Entro, Stacklok, CSA CSAI Foundation. 25+ tools exist, zero deployed outcomes. The question: "Who governs agents across ALL platforms?" Track: first real deployments, standards convergence, survey data on agent security incidents. State file: `agent-infrastructure/state.md`.

12. **AI-native startups.** Track AI-native companies disrupting enterprise SaaS: Harvey (legal), Sierra/Decagon (CS), Pilot/Basis (finance), Sana.ai/Workday (knowledge/HR, Nordic origin). The question: "Are AI-natives eating my vendors' lunch?" Track: revenue, churn, independent deployment evidence, failure modes (the 11x pattern). State file: `ai-native-startups/state.md`.

13. **Coding agents (meta-platform).** Track Claude Code, GitHub Copilot, Cursor, Codex, Replit Agent. Not for coding productivity — for the meta-platform thesis: coding agents BUILD other agents, MCP servers, evals, and integrations. They're the factory that makes the factories. Track: compound engineering methodology, non-coding use cases, enterprise adoption. State file: `coding-agents/state.md`.

14. **Open-source agent frameworks.** Track LangGraph, CrewAI, Mastra, Microsoft Agent Framework, Google ADK, Ruflo. The "build instead of buy" path. Track: enterprise deployments (currently near-zero for business agents), RBAC/governance features, framework consolidation. State file: `open-source-frameworks/state.md`.

**Decision criteria:** What would create the most value for a CTO trying to understand the agent landscape right now? Where is our knowledge thinnest relative to how much is happening? What's time-sensitive (just shipped, deal closing, enforcement deadline)? Remember: the CTO cares equally about "what to adopt," "how to transform," and "what does the target state look like" (AI-native teams).

**Priority tiers:**
```
Tier 0: User signals (open questions, corrections) — ../user-signals/index.md
Tier 1: Time-sensitive (enforcement deadlines, product launches, deal closings)
Tier 2: Eval-driven gaps (failed retrieval quality evals) — ../../evals/test-cases/retrieval-quality-questions.md
Tier 3: Researcher judgment (biggest gap, freshest signal)
```

Tier 0 always wins unless there's an active Tier 1 deadline. The evals tell you where the knowledge base has gaps — fill those first. User signals tell you what real CTOs actually need — fill those before everything.

**Consult the Research Priorities** in `synthesis.md` (Tier 1/2/3 section — still lives there) for standing questions. Tier 1 items are time-sensitive. But you may override if you spot something more valuable.

**Log your reasoning** in the run file: why you chose this focus, what you considered, what you deprioritized.

### Step 3: OODA Loop

**Observe:** Search with the appropriate lens for your chosen focus.

**For platform research, apply these lenses:**

**Lens 1: Business user experience**
- What can a non-developer actually build or use?
- Real user reports — business analysts, sales people, managers using agents
- Team/shared agent capabilities — governance, sharing, permissions
- The personal→team→company promotion path — does any evidence exist?

**Lens 2: Enterprise integration reality (the killer test)**
Real enterprises run 10-15+ systems: Salesforce, Snowflake, Redshift, Slack, Office 365, SharePoint, Jira, Confluence, Canva, Braze, Hightouch, etc. Test each platform against:
- **Multi-tool:** Can the agent connect to 5+ systems in one workflow? Not just read — write back, trigger actions, move data.
- **Multi-turn:** Does the agent remember across sessions? Can it learn from corrections? Does it build knowledge over time?
- **Multi-system orchestration:** Can it coordinate actions across CRM + data warehouse + communication + documents in one task?

**Lens 3: Enterprise security reality**
Real enterprise agents must handle:
- **RBAC:** Agent sees only what the user is authorized to see. Sales rep's agent ≠ finance director's agent.
- **Agent identity:** Who IS the agent when it writes to Jira or Salesforce? User delegation or service account?
- **Connector/tool SSO:** Can the agent authenticate to 10 systems via the user's SSO? Or does each connector need separate credentials?
- **Skill-level permissions:** "Can read Salesforce contacts but cannot modify pipeline data" — granular, not all-or-nothing.
- **Cross-system audit trails:** Every agent action traceable across all systems it touches.
- **Data residency:** When agent pulls PII from Snowflake and synthesizes in LLM context, where does data transit?

**Lens 4: The gap between demo and production**
- Search for what DOESN'T work, not just what's announced
- Connector count ≠ orchestration capability. 1,400 connectors means nothing if you can't chain 5 of them in one workflow.
- SSO/auth across connectors is where most enterprise agent projects die.

**For practitioner research, apply these lenses:**

**Lens 5: Practitioner trajectory**
- What are they building? On which platform? With what results?
- What did they think 3-6 months ago vs. now? The shift is the story.
- Are they a solo builder (Segment A — shows what's possible) or an enterprise team (Segment B — shows what's viable)?
- Is their work crossing the chasm? (i.e., are enterprise people starting to replicate it?)

**Lens 6: Nordic subset**
- After finding a global pattern or practitioner: is anyone in the Nordics doing the same thing?
- Nordic signal confirms roll-out speed. Nordic absence confirms the gap.
- Don't search "Nordic AI agents" as primary query — search for the global pattern, then check "[pattern] Nordic" or "[pattern] Finland/Sweden/Norway/Denmark."

**Lens 7: Adoption lifecycle**
We track early adopters → chasm → wide adoption. Every finding should be assessed against these four sub-questions:
- **Transition trigger:** What tipped this domain/company from experimentation to production? Was it pricing innovation (Zendesk outcome-based), role creation (Intercom AI Ops Lead), a specific failure that forced learning (Klarna reversal), regulatory pressure, or something else? Name the mechanism, not just the state.
- **Sub-niche beachhead:** Within the domain, which specific use case crossed first? "Finance crossed" is too broad — was it AP automation? Reconciliation? FP&A? The bowling alley is specific: one narrow use case proves the pattern, then adjacent use cases follow.
- **Early majority signals:** Are pragmatists (not just enthusiasts) adopting? Pragmatists buy references, not vision. They ask "who else in my industry did this?" They evaluate risk, not upside. If a finding shows a non-innovator company adopting because a peer succeeded, that's an early majority signal — flag it explicitly.
- **Whole product readiness:** For this domain/use case, does the full ecosystem exist? Technology alone doesn't cross the chasm. Check: (1) proven technology, (2) training/enablement available, (3) integration support, (4) governance framework, (5) reference customers willing to talk. Rate as: missing / partial / ready. A domain with strong technology but no training or governance is stuck at the chasm regardless of capability.

Search queries should target business users AND integration reality:
- "[platform] multi-system agent workflow enterprise"
- "[platform] Salesforce Snowflake integration agent"
- "[platform] agent memory learning across sessions"
- "[platform] business user experience 2026"
- "[platform] agent limitations enterprise integration"
- "[platform] agent not ready enterprise"
- "[practitioner name] agent blog/post/talk 2026"
- "[business function] AI agent deployment results"

**Orient:** Compare findings against current state. Apply relevant lenses:
1. Personal→team→company — which level does this serve?
2. Integration reality — does this pass the multi-tool/multi-turn test?
3. Demo vs production — is this real or marketing?
4. Practitioner trajectory — does this person's evolution predict what becomes mainstream?

**Decide:** Pick 1-3 findings worth adding. Quality gates:
- From the last 6 months?
- Source is practitioner-level or better? (Not vendor press release)
- Tells us something about business user experience, enterprise integration reality, or practitioner trajectory?
- Adds something we don't already have?

**Act:** Write findings.

### Step 4: Write cycle log

Create file in the appropriate `runs/` directory: `YYYY-MM-DD-HHMM.md`

For platform research, use the platform's runs/ directory. For cross-platform or practitioner research, use `cross-platform/runs/`.

```markdown
---
type: run-log
domain: [platform | finance | customer-service | compliance | operations | hr | sales | coding | cross-domain]
evidence_level: [highest level found this cycle, 0-4]
platforms: [platforms researched]
nordic: [true if Nordic signal found]
updated: [YYYY-MM-DD]
cycle: [N]
---

# [Focus] OODA Cycle — [timestamp]

**Focus area:** [specific aspect researched this cycle]
**Research mode:** [platform deep-dive / cross-platform pattern / practitioner discovery / practitioner deep-dive / vertical SaaS / follow thread]
**Why this focus:** [1-2 sentences on why you chose this over alternatives]

## Queries Used
- [list each search query]

## Findings

### [Finding title]
**Source:** [FULL CLICKABLE URL — MANDATORY, no finding without it] — [source type label]
**Date:** [source date]
**Agent level:** [personal / team / company]
**What:** [2-3 sentences — what specifically did we learn?]
**Evidence level:** [Level 1-4]
**Key claims:** [list the specific verifiable claims this source supports — each must be re-checkable at the URL]

## What I Looked For But Did Not Find
[This is often the most valuable output]

## Orientation
[1-2 sentences — how does this change the picture?]
```

### Step 5: Update state files

**Platform research:** Edit the platform's `state.md`:
1. Update timestamp and cycle count
2. Add new findings to the relevant section — **every claim in state.md must include its source URL inline or in a Sources section.** Never write a claim in state.md without a traceable URL.
3. Update the personal→team→company progression table if evidence changes
4. Check off or add items in "What We Need To Learn"

**Practitioner discovery:** Edit `../source-roster.md`:
1. Add the person to the correct segment (A: solo builders, B: enterprise teams, C: Nordic)
2. Include: name, role, where to follow, why they matter, current position with date
3. If they're doing business-domain agent work (not coding), note the domain

**Company observations:** When a cycle surfaces company-level evidence of AI-native practices, team transformation, or organizational change:
1. Check `../observations/README.md` — does the company already have a file?
2. **Existing company:** Update its observation file with new evidence. Keep the standard structure (formation story, practices, what transfers, limitations, key insight).
3. **New company:** Create `../observations/{company-slug}.md` following the structure in existing files. Add a row to the watch list table in `../observations/README.md`.
4. Only create observation files for companies with operational detail — not announcements. The bar: we know HOW they work, not just THAT they use AI.

**URL preservation rule:** When synthesizing findings from run files into state.md, keep the URLs. A finding that loses its URL during synthesis becomes unverifiable and therefore untrusted.

### Step 6: Update synthesis (only if cross-platform insight emerges)

The synthesis is split into topic files in `../synthesis/`. Edit the **specific topic file**, not the monolith:
- Platform comparison changed → `../synthesis/platform-trajectories.md`
- Domain convergence evidence → `../synthesis/domain-convergence.md`
- Enterprise reality test updated → `../synthesis/enterprise-reality.md`
- New cross-platform pattern → `../synthesis/patterns.md`
- CTO answer changed → `../synthesis/cto-answer.md`
- Nordic signal → `../synthesis/nordic-landscape.md`
- New practitioner mapped → `../synthesis/practitioner-map.md`

Also update `../synthesis/index.md` if a topic file's summary line changed.

Research priorities and run log still live in `synthesis.md` (the original file).

### Step 7: Update insights (only if a compressed argument emerges)

Edit `../insights.md` only when a finding produces a thesis that's usable in training, advisory, or newsletter. Most cycles won't produce an insight — that's fine. An insight is a compressed argument, not a finding.

### Step 8: Meta-learning reflection

Before committing, append 2-3 sentences to the **Cycle Observations** section in `meta-learning.md`. Reflect on what you learned about **how to research**, not what you learned about the domain. Examples:

- "Searching [query] on [source] produced high/zero signal because..."
- "This practitioner's X.com thread was more valuable than 5 vendor blog posts because..."
- "I expected to find [X] but found nothing — next cycle I should try [Y] instead"
- "The [source type] was unreliable because [reason] — avoid in future"
- "Following [person]'s thread led to 3 new sources I wouldn't have found via topic search"
- "Absence of evidence after N cycles is becoming a finding — [specific absence]"

Format:
```
### Cycle [N] — [date]
[2-3 sentences about research method learning]
```

If an observation matches an existing heuristic pattern 3+ times, promote it: move it from Cycle Observations to the appropriate Research Heuristics section.

### Step 9: Commit and push

```
git add continuous-research/platform-watch/ continuous-research/synthesis/ continuous-research/findings/ continuous-research/observations/ continuous-research/source-roster.md continuous-research/insights.md
git commit -m "platform-watch: [focus] — [one-line finding summary]"
git push -u origin main
```

## Quality Rules (MANDATORY — copy-paste for subagents)

=== MANDATORY RESEARCH RULES ===

FOCUS: BUSINESS AGENTS, NOT CODING AGENTS. We track what sales people, finance analysts, HR managers, and operations leads can do with agent platforms. If a finding is about coding/development, it goes in the developer-focused section only.

FRAMEWORK: Personal agent → Team agent → Company agent. Every finding should be tagged with which level it applies to.

GEOGRAPHIC METHOD: Global first, Nordic subset second. Always start with the global scan. Then check for Nordic signal. Never search Nordic-first — you'll miss the global pattern.

EVIDENCE LADDER:
- Level 0: Commercial content (vendor press releases, blogs, case studies, analyst predictions). NOT EVIDENCE.
- Level 1: Opinion (practitioner says "I think X"). Context only.
- Level 2: Single experiment (one company/person reports results). Supporting evidence.
- Level 3: Convergence (10-20 independent reports of same pattern). THIS IS WHERE WE REPORT.
- Level 4: Cross-domain meta-pattern. Premium insight.

SOURCE TYPE CLASSIFICATION — label every URL:
- [practitioner direct] — person's own blog, X.com, GitHub. BEST.
- [practitioner analysis] — one builder analyzing another's work. STRONG.
- [domain trade publication] — specialist journalist interviewing practitioner. ACCEPTABLE.
- [general press] — CNBC, TechCrunch. Bare facts only.
- [vendor press release] — NOT EVIDENCE. Level 0.

FRESHNESS — MANDATORY:
- Only cite evidence from the last 6 months. Older = historical context only, explicitly dated.
- Platforms move fast. A claim from October 2025 about Copilot Studio may be obsolete by March 2026.
- EVERY source must include its publication date. No date = treat as unverifiable.
- In state.md, dates travel WITH claims. Format: "claim text (Source, Mon YYYY)" — so staleness is visible.
- When reviewing state.md, flag any claim older than 6 months for re-verification or removal.
- A finding's expiry date = publication date + 6 months. After that, it needs re-verification or gets marked [STALE].

URL RULE — THE MOST IMPORTANT RULE:
Assume LLMs fabricate 10% of claims. The ONLY defense is re-verifiable sources.
- EVERY claim, statistic, and finding MUST have a specific, clickable URL.
- No URL = the claim does not exist. Do not write it.
- Do not guess or reconstruct URLs. If you cannot find the source URL, mark the claim [UNVERIFIED — NO URL] and do not include it in state.md.
- When updating state.md, NEVER strip URLs from findings. Every claim in state.md must trace back to a URL in a run file.
- A finding without a URL is worse than no finding — it creates false confidence.

SOURCE TYPE LABEL: Every URL must also have a source type label (see classification above).

ZOMBIE STAT RULE — MANDATORY:
Round-number failure/success rates (e.g., "95% of AI pilots fail," "85% of ML projects never reach production," "80% of AI projects fail") are almost always zombie stats — small qualitative studies or analyst predictions stripped of caveats and weaponized by vendors. Before citing ANY round-number percentage about AI success/failure rates:
1. Find the ORIGINAL source (not someone citing it). Who published it? What methodology? What sample size?
2. Check the definition. "Fail" how? "Success" defined as what? Narrow definitions inflate failure rates by design.
3. Check for conflict of interest. Does the source sell a product that solves the problem they're quantifying?
4. Check the citation chain. If everyone cites a Fortune article that cites someone else, trace it back.
5. If you can't find the original source with methodology after 2 searches, mark it: "[UNVERIFIED STAT — original source not found, do not cite as evidence]"
6. If you find the original and it's a small qualitative study (N<200) or an analyst prediction, cite it WITH the caveats: sample size, methodology, definition of success/failure.
Known zombie stats to NEVER cite without caveats: "95% fail" (MIT NANDA, N=52, custom tools only), "85% fail" (Gartner, analyst prediction), "80% fail" (RAND, specific to ambitious multi-step agents), "87% fail" (VentureBeat, methodology unclear).

CONFIRMATION BIAS GUARD: Test the hypothesis, don't confirm it. Search for counter-evidence.

=== END RULES ===
