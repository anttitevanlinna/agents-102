---
type: run-log
domain: cross-domain
evidence_level: 2
platforms: [claude-code, amplitude, mixpanel, posthog, pendo, notion]
nordic: false
updated: 2026-04-08
---

# PM Strategy & Prioritization with AI — OODA Cycle

**Focus area:** How PMs use AI for strategy, prioritization, and decision-making — NOT prototyping or vibe coding
**Research mode:** Cross-domain practitioner discovery
**Why this focus:** The vibe coding narrative drowns out everything else. What's happening in the actual strategic PM work?

## Executive Summary

**AI is transforming PM execution work (PRDs, summaries, research drafts) at scale, but strategic decision-making with AI is still mostly Level 1-2.** The gap between "AI writes my PRD" (widespread) and "AI helps me make better prioritization decisions" (emerging) is the story.

The most interesting signal is **infrastructure convergence**: analytics platforms (Amplitude, Mixpanel, PostHog, Pendo) are all shipping MCP servers and AI agents. The plumbing for agentic PM strategy work is being built — but practitioners haven't widely adopted these workflows yet.

## Findings

### 1. The PM Bottleneck Thesis (Level 2 — Approaching Level 3)

**Andrew Ng** stated product management is now the bottleneck, not engineering. His teams see PM-to-engineer ratios collapsing from 1:8 to 1:2 or even 1:0.5. If building is faster and cheaper, the real cost is building the wrong thing.

- **Source:** https://x.com/lennysan/status/1943773031459172360 — [practitioner direct]
- **Evidence level:** Level 2

**Lenny Rachitsky** wrote AI will have "the most profound impact on the high-level skills of product management: developing a strategy, crafting a vision, identifying new opportunities, and setting goals." But frames this as future state, not current practice.

- **Source:** https://www.lennysnewsletter.com/p/how-ai-will-impact-product-management — [practitioner direct]
- **Evidence level:** Level 1 (opinion)

### 2. Sachin Rekhi: Claude Code as PM Strategy Platform (Level 2 — Strongest Signal)

Sachin Rekhi (Notejoy founder, Reforge instructor, ex-LinkedIn PM) ran a webinar for 1,500 PMs demonstrating 13 Claude Code skills spanning strategy work: product strategy critique, competitor pricing matrix updates, competitive teardowns, NPS program management, exploratory data analysis without SQL, customer interview synthesis.

- **Source:** https://x.com/sachinrekhi/status/2029620106213621971 and https://www.sachinrekhi.com/p/claude-code-for-product-managers — [practitioner direct]
- **Evidence level:** Level 2

### 3. Dean Peters: Open-Source PM Skills Framework (Level 2)

47 PM skill files for Claude Code/Codex/Cursor covering RICE/ICE/Kano prioritization, Ansoff/BCG/Porter's 5 Forces, pricing strategy, positioning workshops, market sizing.

- **Source:** https://github.com/deanpeters/Product-Manager-Skills — [practitioner direct]
- **Evidence level:** Level 2

### 4. Analytics Platform MCP Server Convergence (Infrastructure Signal)

Every major analytics platform is shipping MCP connectors:

- **Amplitude** (Feb 2026): Global Agent + 4 specialized agents + MCP server. 20+ analysis skills. Source: https://amplitude.com/docs/amplitude-ai/amplitude-mcp [vendor documentation]
- **PostHog**: MCP server, natural language analytics querying, GA status, free. Source: https://posthog.com/docs/product-analytics/build-insights-mcp [vendor documentation]
- **Mixpanel** (Oct 2025): Acquired DoubleLoop, shipped Metric Trees — AI-generated causal metric models from natural language strategy descriptions. Source: https://mixpanel.com/platform/metric-trees/ [vendor press release]
- **Pendo**: MCP server for Claude/ChatGPT/Cursor. Source: https://www.pendo.io/product/mcp/ [vendor press release]

**The pipes are being laid. The water isn't flowing yet.** No practitioner evidence of PMs using these for strategic decisions at scale.

### 5. Shreyas Doshi: AI Strategy Docs Are "Quite Terrible" (Counter-Signal)

"AI generated Product Strategy docs right now are quite terrible *if* you actually read them. But most people get very impressed by AI's formatting & clever jargon."

- **Source:** https://x.com/shreyas/status/1938934124095373347 — [practitioner direct]
- **Evidence level:** Level 1 (expert opinion)

### 6. Claire Vo / ChatPRD (Level 2 — Execution, Not Strategy)

100K+ PM users. Mostly execution-oriented (PRDs, specs, coaching). Strategy angle is thin — "drafting product strategies" via prompts, which is writing assistance, not decision partnership.

- **Source:** https://www.chatprd.ai/ — [practitioner direct / vendor]

### 7. Melissa Perri: AI Decision Partner Vision (Level 1)

Describes future-state AI that synthesizes competitive intelligence, tests roadmap bets against simulated adoption curves and pricing sensitivity. Future tense throughout.

- **Source:** https://www.linkedin.com/posts/melissajeanperri_ai-is-reshaping-product-management-its-activity-7317875597089624064-sDCu — [practitioner direct]
- **Evidence level:** Level 1

### 8. David Haberlah: 638 Practitioner Voices Meta-Analysis (Level 2)

Analyzed 638 pieces from Lenny's Newsletter/Podcast. Key finding: "Operational work automates; strategic judgment appreciates." Found execution automation at scale but no convergence on AI for strategy.

- **Source:** https://medium.com/@haberlah/what-638-practitioner-voices-reveal-about-pms-ai-transformation-7d2fd16be10d — [practitioner analysis]
- **Evidence level:** Level 2

### 9. Productboard Survey (Level 0)

379 enterprise PMs surveyed: 100% use AI tools, 94% daily, 4 hours saved per task. Does not break down strategy vs. execution usage.

- **Source:** https://www.productboard.com/blog/ai-in-product-management-report/ — [vendor press release]
- **Evidence level:** Level 0

## What We Did Not Find

1. **No convergence on AI for PM strategic decision-making.** Zero cases of 10-20 practitioners reporting same strategy workflow.
2. **No named PM reporting "AI changed my prioritization decision."** Lots of "wrote faster." Zero "decided better."
3. **No evidence of AI-assisted pricing/packaging decisions.** Complete absence.
4. **No evidence of AI-assisted OKR setting.** Tool features only, no practice.
5. **No evidence of AI-assisted GTM strategy.** What exists is sales/marketing automation, not product strategy.
6. **Gibson Biddle and John Cutler: silent on AI for strategy.**
7. **No Nordic signal whatsoever.**

## Synthesis: The Execution-Strategy Gap

| PM Work Dimension | Maturity | Evidence Level |
|-------------------|----------|----------------|
| PRD writing, documentation | Converged | Level 3 |
| Customer feedback synthesis | Converged | Level 3 |
| Competitive research drafting | Approaching | Level 2-3 |
| Analytics querying (NL) | Infrastructure ready | Level 2 |
| Roadmap prioritization | Individual experiments | Level 2 |
| Strategic analysis | Individual experiments | Level 1-2 |
| Pricing/packaging decisions | Nothing | Level 0 |
| OKR/goal setting | Vendor features only | Level 0 |
| GTM strategy | Nothing | Level 0 |

**The demand gap:** PMs need AI for decision quality, but are getting AI for documentation speed. The infrastructure (MCP servers from every analytics platform) is arriving. But the practice of AI-assisted strategic PM decision-making has not converged.

**Mixpanel Metric Trees** is the most interesting product signal — natural language strategy description mapped to causal metric trees connected to live data. No practitioner adoption evidence yet.
