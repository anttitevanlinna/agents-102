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

The cycle focuses on ONE platform. Rotate based on cycle count:
- Cycle % 3 == 0 → **Microsoft 365 / Copilot Studio / Azure** (`microsoft-365/`)
- Cycle % 3 == 1 → **Google Workspace / Gemini Enterprise** (`google-workspace/`)
- Cycle % 3 == 2 → **OpenAI ChatGPT / Custom GPTs** (`openai/`)

Anthropic/Claude is tracked opportunistically (when it surfaces in other platform research) rather than as primary — because Claude has no business user surface of its own. Update `claude-anthropic/state.md` when relevant findings appear.

### Step 3: OODA Loop

**Observe:** Search for the latest on this cycle's platform, focused on BUSINESS USER experience:
- What can a non-developer actually build or use?
- Real user reports — business analysts, sales people, managers using agents
- Team/shared agent capabilities — governance, sharing, permissions
- Integration with business tools (CRM, ERP, SharePoint, email, calendar)
- The personal→team→company promotion path — does any evidence exist?

Search queries should target business users, not developers:
- "Copilot Studio business user experience 2026"
- "ChatGPT enterprise sales team workflow"
- "Gemini Enterprise business analyst review"
- "[platform] [business function] agent real experience"
- "[platform] team agent sharing governance"

Also search for the ABSENCE of things:
- "[platform] agent limitations business users"
- "[platform] agent not ready enterprise"

**Orient:** Compare findings against current state.md. What's genuinely new? What changes the picture? Apply the personal→team→company framework — does this finding tell us something about which level the platform serves?

**Decide:** Pick 1-3 findings worth adding. Quality gates:
- From the last 6 months?
- Source is practitioner-level or better? (Not vendor press release)
- Tells us something about business user experience, not just developer experience?
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
**Source:** [URL] — [source type]
**Date:** [source date]
**Agent level:** [personal / team / company]
**What:** [2-3 sentences — what specifically did we learn about business user experience?]
**Evidence level:** [Level 1-4]

## What I Looked For But Did Not Find
[This is often the most valuable output]

## Orientation
[1-2 sentences — how does this change the picture for the CTO question?]
```

### Step 5: Update platform state

Edit the platform's `state.md`:
1. Update timestamp and cycle count
2. Add new findings to the relevant section
3. Update the personal→team→company progression table if evidence changes
4. Check off or add items in "What We Need To Learn"

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

FRESHNESS: Only cite evidence from last 6 months.
EVERY CLAIM must have: (1) a specific URL, (2) a source type label.
CONFIRMATION BIAS GUARD: Test the hypothesis, don't confirm it. Search for counter-evidence.

=== END RULES ===
