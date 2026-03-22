# Platform Watch — OODA Cycle Prompt

This prompt drives each incremental research cycle. Run with `/loop 60m` or manually.

## What This Research Is About

**Business agents** — not coding agents. We track what a sales person, finance analyst, HR manager, compliance officer, or operations lead can do with agent platforms today. These people use SharePoint, Teams, Outlook, Salesforce, Google Workspace. Not Git, not terminals.

**But also: who is doing the work.** Platforms are one axis. Practitioners are the other. A platform with no practitioners using it is vapor. A practitioner building real things on any platform is signal. We track both.

**The framework:** Personal agent → Team agent → Company-wide agent. We track which platforms support each level and whether a promotion path exists between levels.

**The CTO question we answer:** Which platform can do which business use cases? Who is leading? Why? And: who are the practitioners whose trajectory predicts what becomes mainstream 3-6 months later?

**Geographic method: global first, Nordic subset second.** Always start with the global scan — that tells us what's hot and upcoming. Then check for Nordic signal as a subset — that tells us roll-out speed and local adoption patterns. If we start Nordic-first, we miss signals. The Nordic scan is never the primary research — it's the "and where are the Nordics on this?" follow-up.

**Related: Domain practitioner research** (separate system, `../README.md` + `../search-logs/` + `../source-roster.md`). Tracks what practitioners are actually doing per business function (sales, finance, HR, compliance, operations, product). When you find a practitioner doing real agentic work, note which platform they're using — that feeds back into this system. When you find a platform gap, note which business function it blocks — that feeds the domain research.

## Cycle Execution

### Step 1: Read current state and meta-learning

Read `meta-learning.md` first — the research heuristics and recent cycle observations. These tell you what previous cycles learned about how to research effectively. Apply them before choosing your focus.

Then read `synthesis.md` — specifically the Research Priorities section (Tier 1/2/3) and the "What We Did Not Find" section. Read the source roster (`../source-roster.md`) to know who we're tracking. Optionally read a target platform's `state.md` if you're going deep on one platform.

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

**Decision criteria:** What would create the most value for a CTO trying to understand the agent landscape right now? Where is our knowledge thinnest relative to how much is happening? What's time-sensitive (just shipped, deal closing, enforcement deadline)? Remember: the CTO cares equally about "what to adopt" and "how to transform."

**Consult the Research Priorities** in `synthesis.md` for standing questions organized by tier. Tier 1 items are time-sensitive. But you may override if you spot something more valuable.

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

**URL preservation rule:** When synthesizing findings from run files into state.md, keep the URLs. A finding that loses its URL during synthesis becomes unverifiable and therefore untrusted.

### Step 6: Update synthesis (only if cross-platform insight emerges)

Edit `synthesis.md` only when:
- A finding changes the cross-platform comparison
- A new pattern emerges across platforms
- The CTO answer table needs updating
- Something lands in "What We Did Not Find" that we now found

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
git add continuous-research/
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

CONFIRMATION BIAS GUARD: Test the hypothesis, don't confirm it. Search for counter-evidence.

=== END RULES ===
