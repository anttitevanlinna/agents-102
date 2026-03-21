# Hourly Platform Research — Prompt Template

This prompt is executed by `/loop 60m` to run incremental research on agent platforms.

## Execution Instructions

You are running an incremental research cycle on business agent platforms. Each run focuses on ONE platform, rotating through the four in order. Each run should take 3-5 minutes and add genuine new knowledge.

### Step 1: Read current state
Read `continuous-research/platform-watch/synthesis.md` to understand what we already know. Count the total runs to determine which platform to focus on this cycle.

### Step 2: Determine focus
Rotate through platforms based on run count:
- Run % 4 == 0 → **OpenAI (ChatGPT Codex + adjacent)**
- Run % 4 == 1 → **Microsoft (Azure AI Foundry)**
- Run % 4 == 2 → **Google (Gemini agent ecosystem)**
- Run % 4 == 3 → **Anthropic (Claude Code + cloud execution)**

### Step 3: Research (OODA loop)

**Observe:** Search for the latest on this cycle's platform. Focus on:
- New features, releases, announcements (last 30 days)
- Practitioner experiences — what real users report (X.com threads, blog posts, conference talks)
- Limitations, failures, what doesn't work yet
- Pricing/access changes that affect adoption

Search queries should be specific and recent. Examples:
- "[platform] agent features March 2026"
- "[platform] developer experience review 2026"
- "[specific feature] real user experience"

**Orient:** Compare what you found against what's already in synthesis.md. What's genuinely new? What confirms or contradicts existing findings?

**Decide:** Pick 1-3 findings worth adding. Apply quality gates:
- Is this from the last 6 months?
- Is the source practitioner-level or better? (Not vendor press release, not analyst prediction)
- Does it add something we don't already have?

**Act:** Write findings.

### Step 4: Write run log
Create a file in `continuous-research/platform-watch/runs/` named `YYYY-MM-DD-HHMM.md`:

```markdown
# Platform Watch Run — [timestamp]

**Focus:** [platform name]
**Run number:** [N]

## Queries Used
- [search query 1]
- [search query 2]

## Findings

### [Finding title]
**Source:** [URL] — [source type: practitioner direct / domain trade / general press / etc.]
**Date:** [source date]
**What:** [2-3 sentences — what specifically is new or notable]
**Evidence level:** [Level 1-4 per evidence ladder]

## What I Looked For But Did Not Find
[Important — absence of evidence is signal]

## Orientation
[1-2 sentences — how does this change or confirm the picture?]
```

### Step 5: Update synthesis
Edit `continuous-research/platform-watch/synthesis.md`:
1. Update "Last updated" timestamp and increment run count
2. Add new findings under the relevant platform section
3. If you see a cross-platform pattern emerging, add it to Cross-Platform Patterns
4. Add a row to the Run Log table
5. Update "What We Did Not Find" if you searched for something and it wasn't there

### Step 6: Commit and push
```
git add continuous-research/platform-watch/
git commit -m "platform-watch: [platform] — [one-line summary of key finding]"
git push -u origin main
```

## Quality Rules (MANDATORY — subagents don't read CLAUDE.md)

=== MANDATORY RESEARCH RULES ===

EVIDENCE LADDER:
- Level 0: Commercial content (vendor press releases, vendor blogs, vendor case studies, analyst predictions). NOT EVIDENCE.
- Level 1: Opinion (practitioner says "I think X"). Context only.
- Level 2: Single experiment (one company deployed, reports results). Supporting evidence.
- Level 3: Convergence (10-20 independent practitioners report same pattern). THIS IS WHERE WE REPORT.
- Level 4: Cross-domain meta-pattern. Premium insight.

SOURCE TYPE CLASSIFICATION — label every URL:
- [practitioner direct] — person's own blog, X.com, GitHub. BEST.
- [practitioner analysis] — one builder analyzing another's work. STRONG.
- [domain trade publication] — specialist journalist interviewing practitioner. ACCEPTABLE.
- [academic/research] — university research, benchmarks. STRONG for patterns.
- [general press] — CNBC, TechCrunch. Bare facts only (funding, launches).
- [vendor press release] — NOT EVIDENCE. Level 0.
- [republished PR] — Still Level 0.

FRESHNESS: Only cite evidence from last 6 months.
EVERY CLAIM must have: (1) a specific URL, (2) a source type label.
CONFIRMATION BIAS GUARD: Test the hypothesis, don't confirm it. Search for counter-evidence.

=== END RULES ===
