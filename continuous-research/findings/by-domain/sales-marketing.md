---
type: finding
domain: sales-marketing
evidence_level: 2
platforms: [salesforce-agentforce, hubspot-breeze, qualified-piper, gong, sitecore, aprimo]
practitioners: [Salesforce, VTT, Klarna, Qualified, Greenhouse, Realm, Sitecore, Aprimo]
nordic: true
updated: 2026-03-28
answers:
  - "do AI SDRs actually work?"
  - "what's the 85% failure rate about?"
  - "which Nordic companies deploy sales/marketing agents?"
  - "what's the RFP agent landscape?"
  - "what's agentic commerce?"
---

# Sales & Marketing — Agentic Deployment Findings

**Evidence level:** Level 2 (multiple experiments, approaching convergence for AI SDR) | **Last updated:** 2026-03-28

Four distinct agent categories: (1) AI SDR agents for inbound qualification and outbound prospecting — most mature, hundreds of deployments. (2) RFP/proposal generation — multi-agent systems that analyze requirements and generate compliant drafts. (3) Competitive intelligence — autonomous monitoring with real-time alerting. (4) Agentic commerce protocols — nascent but category-defining (Klarna, Stripe/OpenAI, Visa, Google). Critical finding: 85% of "fully autonomous AI SDR" deployments from 2024-2025 were shut down within 6 months [SOURCE NEEDED]. Survivors are hybrid models with intent-signal triggering.

## Level 2 Findings

### Salesforce (internal) — Agentforce SDR on dormant leads
SDR agent works leads human reps deprioritized. 43K+ leads processed, $1.7M new pipeline from abandoned leads. 18,500 total Agentforce use cases, 9,500 paid deals. 330% ARR growth YoY. Source: [Salesforce Customer Zero](https://www.salesforce.com/news/stories/first-year-agentforce-customer-zero/) [vendor — internal deployment report]

### VTT Finland — Agentforce inbound lead qualification
Finnish government research institution. Agentforce SDR qualifies/engages inbound leads from web, events. Agent handles all initial outreach 24/7. Previously, human SDR team took hours/days — now nearly every lead gets a response. Source: [Salesforce SDR](https://www.salesforce.com/sales/ai-sales-agent/ai-sdr/) [vendor case study]

### Qualified / Piper — Multi-stage autonomous SDR (500+ companies)
Multi-modal (text, voice, video). Greenhouse: $27M pipeline, 2,000 qualified meetings. Asana: +22% pipeline. Litmus: doubled monthly meetings in 40 days, $220K pipeline. Source: [Qualified](https://www.qualified.com/ai-sdr) [vendor case studies]

### Klarna — Marketing cost reduction + Agentic Commerce Protocol
Two distinct practices: (1) Marketing ops: AI generates creatives (Midjourney, DALL-E, Firefly). Image dev: 6 weeks to 7 days, $1.5M saved Q1. Agency spend -25%. Total AI marketing savings: $10M annualized. (2) Agentic Product Protocol: open standard making 100M+ products across 400M prices in 12 markets discoverable by AI agents. Complements Stripe/OpenAI protocol. Source: [Klarna marketing](https://www.klarna.com/international/press/ai-helps-klarna-cut-marketing-agency-spend-by-25-and-run-more-campaigns/) [vendor], [Klarna APP](https://investors.klarna.com/News--Events/news/news-details/2025/Klarna-Launches-Agentic-Product-Protocol-The-Open-Standard-That-Makes-100M-Products-Instantly-Discoverable-by-AI-Agents/) [vendor — SEC filing validates]

### Thalamus AI — Multi-agent RFP/proposal generation
20+ specialized agents orchestrate RFP lifecycle: intake → requirement analysis → compliance matrix → content search → draft → SME routing → submission. Pre-fills 70-80% of responses. Claims 5x faster, 2x win rate. ISO 27001 & SOC 2. Source: [Thalamus](https://thalamushq.ai/) [vendor]

### Realm (Helsinki) — AI agents for revenue teams
Finnish startup. Turns sales collateral, product docs, CRM data into AI agents that answer customer questions, fill RFP/security questionnaires, surface insights. EUR 1.7M funding. Backed by Lifeline Ventures, founders from Wolt/Supercell/Zalando. Source: [Realm](https://www.withrealm.com/), [Tech.eu](https://tech.eu/2024/06/04/ex-slush-leaders-startup-realm-secures-eur17m-for-ai-knowledge-search/) [domain trade]

### Gong — Revenue agents for deal management
12+ agents. Deal Reviewer suggests updates, AI auto-updates CRM from call analysis. Agent Studio: no-code drag-and-drop agent configuration. MCP support. 5,000+ companies. Source: [Gong](https://www.gong.io/press/gong-redefines-ai-agents-to-deliver-real-revenue-impact) [vendor announcement]

### SitecoreAI (Denmark) — 20 AI agents for campaign/content management
Danish HQ. Migration agents (months to weeks for legacy consolidation), contextual content agents, campaign planning agents. Named customers: Regal Rexnord, Hexagon (Swedish-origin), Berkeley Homes, AFL. No extra cost (reducing adoption friction). Source: [Sitecore](https://www.sitecore.com/company/newsroom/press-releases/2025/10/sitecore-unveils-sitecoreai-ushering-in-the-ai-first-era-of-digital-experience) [vendor announcement]

### Aprimo — Content operations agents (in production since 2023)
Planning Agents (campaign briefs), Librarian Agents (metadata), Critic Agents (quality/brand), Transformation Agents (channel adaptation). 80%+ content creation scaling, 30% engagement increase. Gartner Leader 2025. In production in regulated industries (financial services, healthcare). Source: [Aprimo](https://www.aprimo.com/platform/ai-agents) [vendor], [BusinessWire](https://www.businesswire.com/news/home/20250522432375/en/) [vendor press release]

### Crayon — Autonomous competitive intelligence
Monitors competitor websites, pricing, job postings, releases, reviews, SEC filings. Launched MCP server for integration with external agents. 22% competitive win rate increase in first year. Acquired by SoftwareOne. Source: [Crayon](https://www.crayon.co/) [vendor]

### HubSpot Breeze — Prospecting and content agents
Prospecting Agent researches targets, personalizes outreach. Content Agent scales content across channels (blogs, podcasts, case studies). Customer Agent resolves 50%+ of tickets. Content Hub attachment: 13% to 54%. Source: [HubSpot](https://www.hubspot.com/products/artificial-intelligence/breeze-ai-agents) [vendor]

## Level 1 (Context Only)

### AI SDR industry shakeout
85% of fully autonomous AI SDRs shut down within 6 months [SOURCE NEEDED — UserGems blog is only proximate reference, interested party]. Conversion rates dropped from 1-2% to 0.5-1.5% as volume increased. "Cringe AI outreach" became industry meme. Artisan AI (SDR startup) banned by LinkedIn for data scraping. Survivors: hybrid models using intent signals (job changes, website visits) to trigger outreach. Source: [AISDR Industry Report](https://aisdr.com/ai-sdr-industry-report/) [domain trade], [TechCrunch on Artisan](https://techcrunch.com/2026/01/07/yes-linkedin-banned-ai-agent-startup-artisan-but-now-its-back/) [general press]

### Agentic commerce protocols — nascent but category-defining
Klarna, Stripe/OpenAI, Visa, Google all launched agent commerce protocols in late 2025. If AI agents become autonomous shoppers, this rewrites B2C sales entirely. Pre-chasm.

## Counter-Evidence

- **85% AI SDR failure rate** demonstrates that autonomous outbound without intent signals destroys rather than creates value
- **Arms race dynamic:** As everyone sends AI-generated outreach, response rates collapse. Autonomy optimizes volume; humans optimize relevance.
- **Agentforce adoption challenges:** 77% B2B deployment failure due to data quality; only 6% of Salesforce customers on paid Agentforce
- **Nordic B2B market mismatch:** Nordic sales culture is relationship-heavy with smaller deal volumes — US high-volume AI SDR patterns may not transfer

## Named Practitioners

- **Klarna** — Most aggressive Nordic company: both user (marketing cost reduction) and infrastructure builder (Agentic Product Protocol)
- **VTT Finland** — Only confirmed Nordic enterprise Agentforce deployment
- **Sitecore (Denmark)** — Danish-origin platform with 20 AI agents, Hexagon (Swedish) as customer
- **Realm (Helsinki)** — Finnish startup building revenue team AI agents

## Nordic Signal

**Moderate.** VTT Finland is a confirmed Agentforce deployment. Klarna is the standout — both using agents and building agentic commerce infrastructure. Sitecore (Danish HQ) provides Nordic-origin content platform. Realm (Helsinki) represents the startup ecosystem. The Nordic B2B market (relationship-heavy, smaller volumes) may be better suited to hybrid agent models than the US high-volume approach.

## What We Did Not Find

1. **No Nordic B2B company with documented AI SDR deployment** beyond VTT
2. **No evidence of RFP automation at Nordic companies** — despite the use case being universal
3. **No Nordic-specific competitive intelligence tool** comparable to Crayon/Klue
4. **No evidence of agentic commerce protocol adoption** in Nordic e-commerce beyond Klarna
