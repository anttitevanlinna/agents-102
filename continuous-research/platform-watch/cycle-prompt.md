# Platform Watch — OODA Cycle Prompt

This prompt drives each incremental research cycle. Run with `/loop 60m` or manually.

## What This Research Is About

**Business agents** — not coding agents. We track what a sales person, finance analyst, HR manager, compliance officer, or operations lead can do with agent platforms today. These people use SharePoint, Teams, Outlook, Salesforce, Google Workspace. Not Git, not terminals.

**The framework:** Personal agent → Team agent → Company-wide agent. We track which platforms support each level and whether a promotion path exists between levels.

**The CTO question we answer:** Which platform can do which business use cases? Who is leading? Why?

## Cycle Execution

### Step 1: Read current state

Read the target platform's `state.md` to know what we already know. Read `synthesis.md` for cross-platform context.

### Step 2: Determine focus

**Default rotation** (use unless you have a better idea):
- Cycle % 3 == 0 → **Microsoft 365 / Copilot Studio / Azure** (`microsoft-365/`)
- Cycle % 3 == 1 → **Google Workspace / Gemini Enterprise** (`google-workspace/`)
- Cycle % 3 == 2 → **OpenAI ChatGPT / Custom GPTs** (`openai/`)

Anthropic/Claude is tracked opportunistically when it surfaces in other platform research.

**But you are semi-autonomous.** After reading the current state files and synthesis, you may make a DIVERGENT choice if you judge it adds more value:
- **New platform:** If you spot a platform we're not tracking that matters (e.g., a vertical SaaS agent platform like ServiceNow, Zendesk AI, or a new entrant), create a new folder and start tracking it.
- **Adjacent research question:** If the state files surface a question that cuts across platforms (e.g., "has anyone solved agent memory?", "what does the MCP enterprise governance roadmap look like?", "are there open-source agent platforms for business users?"), pursue it instead of the default rotation.
- **Depth over breadth:** If one platform has a major new development (e.g., a Preview feature goes GA, a named enterprise reports real deployment), go deep on that instead of rotating.
- **Follow practitioners:** If you find a practitioner writing about real business agent deployment experience, follow that thread wherever it leads.

**Log your reasoning** in the run file: why you chose this focus, what you considered, what you deprioritized. This helps the human dispatcher understand your thinking and steer future cycles.

### Step 3: OODA Loop

**Observe:** Search for the latest on this cycle's platform, focused on BUSINESS USER experience. Apply THREE lenses:

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

Search queries should target business users AND integration reality:
- "[platform] multi-system agent workflow enterprise"
- "[platform] Salesforce Snowflake integration agent"
- "[platform] agent memory learning across sessions"
- "[platform] business user experience 2026"
- "[platform] agent limitations enterprise integration"
- "[platform] agent not ready enterprise"

**Orient:** Compare findings against current state.md. Apply all three lenses:
1. Personal→team→company — which level does this serve?
2. Integration reality — does this pass the multi-tool/multi-turn test?
3. Demo vs production — is this real or marketing?

**Decide:** Pick 1-3 findings worth adding. Quality gates:
- From the last 6 months?
- Source is practitioner-level or better? (Not vendor press release)
- Tells us something about business user experience or enterprise integration reality?
- Adds something we don't already have?

**Act:** Write findings.

### Step 4: Write cycle log

Create file in the platform's `runs/` directory: `YYYY-MM-DD-HHMM.md`

```markdown
# [Platform] OODA Cycle — [timestamp]

**Focus area:** [specific aspect researched this cycle]
**Agent level focus:** [personal / team / company / promotion path]

## Queries Used
- [list each search query]

## Findings

### [Finding title]
**Source:** [FULL CLICKABLE URL — MANDATORY, no finding without it] — [source type label]
**Date:** [source date]
**Agent level:** [personal / team / company]
**What:** [2-3 sentences — what specifically did we learn about business user experience?]
**Evidence level:** [Level 1-4]
**Key claims:** [list the specific verifiable claims this source supports — each must be re-checkable at the URL]

## What I Looked For But Did Not Find
[This is often the most valuable output]

## Orientation
[1-2 sentences — how does this change the picture for the CTO question?]
```

### Step 5: Update platform state

Edit the platform's `state.md`:
1. Update timestamp and cycle count
2. Add new findings to the relevant section — **every claim in state.md must include its source URL inline or in a Sources section.** Never write a claim in state.md without a traceable URL. If the URL is only in the run file, add a reference: `(source: runs/YYYY-MM-DD-HHMM.md)`
3. Update the personal→team→company progression table if evidence changes
4. Check off or add items in "What We Need To Learn"

**URL preservation rule:** When synthesizing findings from run files into state.md, keep the URLs. A finding that loses its URL during synthesis becomes unverifiable and therefore untrusted.

### Step 6: Update synthesis (only if cross-platform insight emerges)

Edit `synthesis.md` only when:
- A finding changes the cross-platform comparison
- A new pattern emerges across platforms
- The CTO answer table needs updating
- Something lands in "What We Did Not Find" that we now found

### Step 7: Commit and push

```
git add continuous-research/platform-watch/
git commit -m "platform-watch: [platform] — [one-line finding summary]"
git push -u origin main
```

## Quality Rules (MANDATORY — copy-paste for subagents)

=== MANDATORY RESEARCH RULES ===

FOCUS: BUSINESS AGENTS, NOT CODING AGENTS. We track what sales people, finance analysts, HR managers, and operations leads can do with agent platforms. If a finding is about coding/development, it goes in the developer-focused section only.

FRAMEWORK: Personal agent → Team agent → Company agent. Every finding should be tagged with which level it applies to.

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
