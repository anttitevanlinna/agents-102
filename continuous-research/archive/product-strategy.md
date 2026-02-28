# Product & Strategy — Research Findings

## Orientation Summary

**Status after Round 2:** Product & Strategy is the least mature domain for agentic AI deployment among all the business process areas surveyed. This is a genuine finding, not a research gap. While every other domain (sales, customer service, finance, HR, operations) has multiple production deployments with measurable outcomes, product management and strategic analysis remain largely in the "tools with agentic features" stage rather than "autonomous agents performing multi-step work." The dominant pattern is platform vendors (Amplitude, Quantum Metric, Dovetail, AlphaSense) adding agentic capabilities to existing analytics and intelligence products -- not standalone agents performing strategic work.

**The surprise:** The most advanced agentic deployments in this space are in competitive intelligence (Crayon, Klue) and product analytics (Amplitude, Quantum Metric), not in strategic planning or roadmap prioritization. Agents that monitor competitors, detect signals, and generate battlecards have crossed into production use at scale. Agents that synthesize customer feedback into product insights are in early production (Dovetail, Enterpret). But agents that do genuine strategic analysis -- scenario planning, market entry decisions, portfolio prioritization -- remain almost entirely at the pilot/announcement stage (Anaplan, Microsoft Researcher/Analyst). The human-in-the-loop requirement is strongest here: organizations trust agents to observe and report, but not yet to recommend strategy.

**Nordic signal:** Klarna is the standout Nordic case -- not as a user of product/strategy agents, but as a company building agentic infrastructure (Agentic Product Protocol) that reshapes how product discovery works. Nordea is developing agentic experiences internally but these are customer-facing chatbots, not product strategy tools. IKEA's AI investments are in logistics and design tools, not product strategy agents. The honest assessment: Nordic companies are not visibly ahead (or behind) in deploying agents for product/strategy work. This domain is thin globally, and thin in the Nordics.

**Chasm status:** Pre-chasm. The competitive intelligence sub-domain is closest to crossing (Crayon/Klue have hundreds of enterprise customers). Product analytics agents (Amplitude, Quantum Metric) are at early adopter stage with measurable adoption. Strategic planning agents (Anaplan CoModeler) are still in limited availability. The pattern suggests agents will enter product/strategy work bottom-up: first monitoring and alerting, then analysis and synthesis, last recommendation and decision support.

## Findings

### Amplitude — Agentic AI Analytics Platform with Specialized Product Agents

| Field | Value |
|-------|-------|
| Company | Amplitude |
| Country | USA (Global) |
| Process domain | Product & Strategy |
| What the agent does | Suite of five specialized agents for product teams: (1) **Global Agent** answers complex product questions in natural language, analyzing data across funnels, experiments, segments, and journeys; (2) **Dashboard Monitoring Agent** detects meaningful metric changes within hours, investigates root causes, and delivers insights via Slack/email; (3) **Session Replay Agent** reviews hundreds of user sessions continuously, spots hidden friction, quantifies revenue impact, and recommends fixes; (4) **Web Experimentation Agent** designs experiments, launches them, analyzes results, and makes rollout/iteration decisions with human-in-the-loop; (5) **AI Feedback Agent** maps unstructured feedback themes to actual user behavior. These are autonomous, multi-step agents -- not just dashboards. |
| Adoption stage | Production deployment (launched Feb 2026, building on 2025 GA features) |
| Evidence quality | Public product announcement, press release, investor communications |
| Source | https://investors.amplitude.com/news-releases/news-release-details/amplitude-introduces-agentic-ai-analytics-next-era-product |
| Origin tag | Global |
| Nordic applicability | Direct -- Amplitude is used by Nordic product teams; agents work on any behavioral data |
| Chasm signal | Strong. Amplitude claims "first fully autonomous analytics agent." The Dashboard Monitoring Agent is the strongest chasm signal -- it continuously watches metrics and alerts humans, which is low-risk autonomous work that product teams can trust quickly. Experimentation Agent designing and launching A/B tests autonomously is higher risk and will likely see slower adoption. |

### Quantum Metric (Felix AI) — Agentic Digital Analytics for Enterprise Product Teams

| Field | Value |
|-------|-------|
| Company | Quantum Metric |
| Country | USA (Global) |
| Process domain | Product & Strategy |
| What the agent does | Felix AI agents automatically monitor, analyze, and alert product teams to changes and opportunities in digital customer experience. Agents find insights that matter most, explain reasoning, and route them directly to teams who can take action. Unlike traditional dashboards, Felix AI performs multi-step autonomous work: monitoring digital sessions, diagnosing friction points, quantifying business impact, and recommending specific product changes. Built on Google Gemini. |
| Adoption stage | Early adopter pilot transitioning to production -- Felix AI adoption reached 25% of Quantum Metric's largest enterprise customers by end of 2025, "transitioning from pilot to core operations" |
| Evidence quality | Public press release, company reporting |
| Source | https://www.quantummetric.com/press-releases/quantum-metric-reports-record-2025-enterprise-expansion-and-agentic-ai-momentum-for-2026 |
| Origin tag | Global |
| Nordic applicability | Direct -- digital analytics is industry-agnostic |
| Chasm signal | Moderate. 25% adoption among largest customers is meaningful but not yet majority. The "pilot to core operations" language signals early adopters are committing. Key question: do product teams actually change roadmaps based on Felix AI recommendations, or just use it for monitoring? |

### Crayon — Autonomous Competitive Intelligence Agent

| Field | Value |
|-------|-------|
| Company | Crayon |
| Country | USA (Global) |
| Process domain | Product & Strategy |
| What the agent does | AI agents continuously monitor competitor websites, marketing materials, pricing, job postings, and hiring data. Goes beyond tracking changes to analyzing intent -- e.g., predicting a product launch based on job postings and subtle website messaging shifts. Generates dynamic battlecards and delivers real-time alerts. Launched MCP server enabling integration with external AI agents (e.g., ZoomInfo connected Crayon's API to internal AI agents so sellers get competitive intelligence in Slack tailored to specific deals). Clients report 22% increase in competitive win rates in first year. |
| Adoption stage | Production deployment / Scaling |
| Evidence quality | Public case studies, customer testimonials, product announcements |
| Source | https://www.crayon.co/, https://www.crayon.co/blog/crayon-launches-first-competitive-intelligence-mcp-server |
| Origin tag | Global |
| Nordic applicability | Requires adaptation -- most competitor data is English-language and US-market focused; Nordic language competitors would need additional coverage |
| Chasm signal | Strong. MCP server launch is a chasm-crossing signal: Crayon is becoming infrastructure that other agents can query, not just a standalone tool. The shift from "track changes" to "predict intent" is the agentic leap. Enterprise-grade (used by large sales teams with dedicated CI functions). |

### Klue — Compete Agent for Real-Time Competitive Deal Intelligence

| Field | Value |
|-------|-------|
| Company | Klue |
| Country | Canada (Global) |
| Process domain | Product & Strategy |
| What the agent does | Compete Agent autonomously eliminates manual competitive research work. Pulls intel from multiple sources (competitor websites, win-loss interviews, sales call transcripts, review sites), analyzes what messaging actually wins deals, generates dynamic battlecard content that updates daily, and personalizes battlecards based on specific deal contexts. Multi-step autonomous workflow: ingest signals, synthesize, generate content, distribute to sellers. |
| Adoption stage | Production deployment |
| Evidence quality | Public product announcement, customer testimonials |
| Source | https://klue.com/, https://klue.com/ai |
| Origin tag | Global |
| Nordic applicability | Requires adaptation -- same language/market coverage consideration as Crayon |
| Chasm signal | Moderate-strong. The "Compete Agent" branding signals confidence in autonomous operation. Daily automatic updates to battlecards is genuine agentic behavior. The question is whether product/strategy teams (not just sales) use these competitive insights for roadmap decisions. |

### AlphaSense — Workflow Agents for Strategic Market Intelligence

| Field | Value |
|-------|-------|
| Company | AlphaSense |
| Country | USA (Global) |
| Process domain | Product & Strategy |
| What the agent does | Workflow agents automate entire arcs of strategic analysis: building company primers, market landscapes, competitive analysis, and SWOT analysis. Agents access premium content (broker reports, regulatory filings, expert call transcripts) and organizational internal data. Used for market sizing, trend analysis, and competitive moves. Compresses "weeks' worth of analysis into minutes." Used by 85% of the S&P 100. Available in AWS AI Marketplace as agent-queryable tool. |
| Adoption stage | Production deployment / Scaling |
| Evidence quality | Public statements, press releases, AWS Marketplace listing |
| Source | https://www.alpha-sense.com/press/alphasense-innovations-in-end-to-end-ai-workflows/ |
| Origin tag | Global |
| Nordic applicability | Direct -- many Nordic enterprises already use AlphaSense for financial and market research |
| Chasm signal | Strong. 85% of S&P 100 is deep enterprise penetration. The "workflow agents" (not just search) that automate full analysis arcs is the agentic leap. AWS Marketplace listing as agent tool signals infrastructure-level adoption. This is the closest to "strategy agent" in production. |

### Klarna — Agentic Product Protocol (Product Discovery Infrastructure)

| Field | Value |
|-------|-------|
| Company | Klarna |
| Country | Sweden (Nordic) |
| Process domain | Product & Strategy |
| What the agent does | Built the Agentic Product Protocol (APP), an open standard that makes 100M+ products across 12 markets instantly discoverable by AI agents. Provides structured, live feeds of product data (existence, price, availability) so external agents can autonomously discover, compare, and recommend products. This is not a product management agent -- it is agentic infrastructure that transforms how product discovery and commerce strategy works. Complements Stripe/OpenAI's Agentic Commerce Protocol. Also: 96% of Klarna employees use AI daily, 152% increase in revenue per employee since Q1'23, 40% cost reduction in customer service per transaction. |
| Adoption stage | Production deployment (launched December 2025) |
| Evidence quality | Public press release, investor communications, IPO filings |
| Source | https://investors.klarna.com/News--Events/news/news-details/2025/Klarna-Launches-Agentic-Product-Protocol-The-Open-Standard-That-Makes-100M-Products-Instantly-Discoverable-by-AI-Agents/ |
| Origin tag | Nordic (Sweden) |
| Nordic applicability | Direct -- this IS a Nordic deployment and open standard |
| Chasm signal | Very strong. Klarna is not just using agents, it is building the infrastructure layer for agentic commerce. Open standard approach (vs. closed ecosystem) signals maturity and ecosystem thinking. The strategic bet: "structured data that underpins agents will determine who wins in the next generation of commerce." This is a Nordic company defining agentic product strategy at a global level. |

### Dovetail — AI-First Customer Intelligence Platform with Agentic Feedback Processing

| Field | Value |
|-------|-------|
| Company | Dovetail |
| Country | Australia (Global) |
| Process domain | Product & Strategy |
| What the agent does | AI agents structure customer feedback signals (from support tickets, NPS, sales calls, app reviews, social media) into product requirements, and deliver them directly into prototyping and coding environments. Multi-step autonomous workflow: ingest feedback from multiple sources, cluster themes, track sentiment, surface patterns, generate structured requirements, route to product teams. Integrates with Salesforce, Linear, Gong, and Alloy. Launched Fall 2025. |
| Adoption stage | Early adopter pilot / Production deployment |
| Evidence quality | Public product announcement (BusinessWire) |
| Source | https://www.businesswire.com/news/home/20251008485339/en/Dovetail-Launches-AI-First-Customer-Intelligence-Platform-to-Power-Customer-Led-Product-Development |
| Origin tag | Global |
| Nordic applicability | Direct -- customer feedback analysis is process-agnostic |
| Chasm signal | Moderate. The leap from "feedback repository" to "autonomous insight generator that writes requirements" is significant. Whether product teams trust agent-generated requirements enough to act on them without heavy review is the chasm question. |

### Enterpret — First Agentic Feedback System with Action Agents

| Field | Value |
|-------|-------|
| Company | Enterpret |
| Country | USA (Global) |
| Process domain | Product & Strategy |
| What the agent does | Agentic feedback system that unifies and acts on customer signals across 50+ data sources. "Action agents" autonomously alert teams to emerging issues or customer complaints as they happen. Natural-language interface allows questions like "Why are signups stalling in Europe?" and provides contextual responses from live customer data. Identifies bugs, account-level churn risks, and routes alerts accordingly. The system ingests, structures, and acts on feedback independently -- not just analysis, but autonomous triage and routing. |
| Adoption stage | Early adopter pilot / Production deployment (launched October 2025) |
| Evidence quality | Public product announcement (SiliconANGLE exclusive) |
| Source | https://siliconangle.com/2025/10/27/exclusive-enterpret-adds-agents-customer-feedback-analysis-platform/ |
| Origin tag | Global |
| Nordic applicability | Direct -- feedback analysis is process-agnostic |
| Chasm signal | Moderate. The "action agent" that routes alerts and identifies churn risks autonomously is agentic. But the real test is whether product teams change prioritization based on agent-surfaced signals. The natural-language query interface ("Why are signups stalling in Europe?") is closer to a research assistant than an autonomous agent. |

### Microsoft 365 Copilot — Researcher and Analyst Agents for Strategic Work

| Field | Value |
|-------|-------|
| Company | Microsoft |
| Country | USA (Global) |
| Process domain | Product & Strategy |
| What the agent does | **Researcher** agent performs multi-step strategic research: builds go-to-market strategies using work data + competitive web data, identifies whitespace opportunities based on emerging trends and internal data, creates comprehensive quarterly reports. Uses OpenAI's deep research model with Microsoft 365 orchestration. **Analyst** agent does advanced data analysis: turns raw spreadsheets into demand forecasts, customer purchasing pattern visualizations, revenue projections. Uses o3-mini reasoning model with Python execution. Both access work data (SharePoint, emails, documents) and web data. Early adopters used Researcher to assess tariff impacts, prepare vendor negotiations, gather client insights. |
| Adoption stage | Production deployment (GA since June 2025, available to all Microsoft 365 Copilot license holders) |
| Evidence quality | Public product announcement, Microsoft blog, GA confirmation |
| Source | https://www.microsoft.com/en-us/microsoft-365/blog/2025/06/02/researcher-and-analyst-are-now-generally-available-in-microsoft-365-copilot/ |
| Origin tag | Global |
| Nordic applicability | Direct -- Microsoft 365 is ubiquitous in Nordic enterprises |
| Chasm signal | Very strong. GA availability to all Copilot licensees (90%+ of Fortune 500) means massive distribution. The question is adoption depth: are teams using Researcher for real strategic analysis, or occasional queries? The "assess tariff impacts on business lines" use case suggests real strategic work. This is the horizontal platform play that could normalize agents in strategy work. |

### Anaplan — CoModeler Agent for Scenario Planning

| Field | Value |
|-------|-------|
| Company | Anaplan |
| Country | USA (Global) |
| Process domain | Product & Strategy |
| What the agent does | CoModeler is a role-based AI agent that builds, extends, and optimizes planning models. Turns natural-language requests into structured models, logic, and calculations. Business users generate and refine planning scenarios in minutes vs. days. New scenarios can be created and tested instantly for market shifts, talent shortages, supply chain disruptions, and financial risks. First half of 2026: Anaplan will debut autonomous AI agents that identify anomalies, recommend next steps, and trigger actions across teams and systems (with human oversight). |
| Adoption stage | Innovator experiment / Early adopter pilot (limited customer availability since November 2025, GA expected Q1 2026) |
| Evidence quality | Public press release, product announcement |
| Source | https://www.anaplan.com/news/anaplan-introduces-new-suite-role-based-ai-agents/ |
| Origin tag | Global |
| Nordic applicability | Direct -- Anaplan is used by Nordic enterprises for financial and operational planning |
| Chasm signal | Pre-chasm. Limited availability signals early testing. The promise of autonomous agents that "trigger actions across teams and systems" is the strongest strategic planning agent claim found in this research, but it is forward-looking (H1 2026). The natural-language-to-planning-model capability is genuinely new. |

### Gong — Voice-of-Customer Theme Detection and Revenue Signal Agents

| Field | Value |
|-------|-------|
| Company | Gong |
| Country | USA (Global) |
| Process domain | Product & Strategy |
| What the agent does | AI agents that surface product/strategy insights from sales conversations: **AI Theme Spotter** autonomously digs into customer data to uncover recurring voice-of-customer themes (common pain points, objections, business goals). **AI Tracker** detects and tracks key themes across all rep conversations. **AI Ask Anything** enables natural-language questioning across entire customer base for strategic business decisions. Configurable via no-code Agent Studio. MCP support enables external agents to query Gong's revenue data. Used by 5,000+ companies. |
| Adoption stage | Production deployment |
| Evidence quality | Public product announcements, Gartner Magic Quadrant Leader recognition |
| Source | https://www.gong.io/blog/new-product-announcements-gong-revenue-ai-operating-system |
| Origin tag | Global |
| Nordic applicability | Direct -- conversation intelligence is language-dependent but Gong supports multiple languages |
| Chasm signal | Moderate. The product/strategy relevance is indirect: Gong's agents surface customer signals that product teams should use for roadmap decisions, but the primary user is sales leadership. The MCP integration is a chasm signal -- it means other agents (product analytics, strategy tools) can query Gong data programmatically, enabling multi-agent product strategy workflows. |

### Nordea — Enterprise AI Agent for Internal Strategic Analysis

| Field | Value |
|-------|-------|
| Company | Nordea |
| Country | Finland / Nordics |
| Process domain | Product & Strategy |
| What the agent does | Internally built "Enterprise Agent" (ChatGPT-like tool) that enables employees to generate text, get insights from documents, compare/relate multiple documents, and use as a strategic sparring partner. Also developing next-generation agentic experiences with 12 AI agents in production across four Nordic markets. The Enterprise Agent is used for document analysis and strategic thinking support, though primary production agents are customer-facing (Nova chatbot). Hiring for Conversational AI Product Manager to drive agentic product roadmap. |
| Adoption stage | Early adopter pilot (Enterprise Agent) / Production deployment (customer-facing bots) |
| Evidence quality | Public statements, job postings, case studies (boost.ai) |
| Source | https://www.nordea.com/en/news/three-ways-we-use-ai-to-accelerate-efficiency-and-growth |
| Origin tag | Nordic (Finland, Sweden, Denmark, Norway) |
| Nordic applicability | Direct -- this IS a Nordic deployment |
| Chasm signal | Weak for product/strategy specifically. The Enterprise Agent is a general-purpose tool, not a product strategy agent. But the fact that Nordea built an internal agent that employees use for document analysis and strategic sparring shows the organizational readiness for more specialized strategy agents. The 12 production agents across four markets shows operational maturity. |

## What We Did NOT Find

The following areas had no confirmed real deployments found:

1. **Autonomous roadmap prioritization agents** -- No company found where an AI agent autonomously prioritizes product features or makes roadmap decisions. Closest is Dovetail generating requirements from feedback, but humans still prioritize.

2. **Strategy scenario planning agents in production** -- Anaplan CoModeler is the closest, but still in limited availability. No confirmed case of an agent autonomously running scenario analysis and presenting strategic options to leadership.

3. **Nordic product/strategy agent deployments beyond Klarna** -- No Finnish, Swedish, Norwegian, or Danish company found deploying agents specifically for product management or strategic analysis. IKEA's AI investments are in logistics and design tools. Nordea's agents are customer-facing or general-purpose.

4. **Multi-agent product strategy workflows** -- No confirmed case of multiple agents collaborating on a product strategy task (e.g., one agent monitoring competitors, another analyzing customer feedback, a third synthesizing into roadmap recommendations). The MCP integrations from Crayon and Gong suggest this is the next step, but nobody is doing it yet.

5. **Agents that challenge or debate strategy** -- No "red team" agent that pushes back on product decisions or identifies blind spots in strategy. The Nordea Enterprise Agent as "sparring partner" is the closest concept, but it is a general-purpose LLM, not a specialized strategy challenger.

## Research Log

| Round | Searches | Findings | Orientation |
|-------|----------|----------|-------------|
| 1 | "AI agent product management market research enterprise 2025 2026"; "agentic customer feedback analysis roadmap strategy 2025 2026"; "AI agent competitor monitoring product intelligence deployed company case study 2025"; "Quantum Metric agentic AI product analytics enterprise deployment"; "'AI agent' 'product management' autonomous market research synthesis real deployment" | Quantum Metric (Felix AI), Crayon, Amplitude market stats, Klarna APP, general market data | Domain is thinner than sales/CS. Platform vendors adding agentic features to existing products. Competitive intelligence is furthest ahead. Need to dig for specific company deployments vs. vendor announcements. |
| 2 | "Klarna agentic product protocol"; "Productboard Amplitude AI agent autonomous product insights 2025 2026"; "Nordic company AI agent product management strategy deployed"; "AlphaSense Perplexity enterprise AI agent competitive analysis"; "Dovetail Enterpret UserTesting AI agent customer feedback"; "Nordea Posti Wolt Finnish company AI agent"; "Microsoft Copilot agent Researcher Analyst"; "scenario planning AI agent autonomous strategy enterprise"; "Gong customer voice insights product roadmap AI agent"; "Crayon Klue competitive intelligence AI agent autonomous battlecard"; "IKEA AI agent product strategy" | Amplitude (5 specialized agents), AlphaSense (workflow agents), Klue (Compete Agent), Dovetail (customer intelligence platform), Enterpret (agentic feedback), Microsoft Researcher/Analyst, Anaplan CoModeler, Gong (theme detection agents), Nordea (Enterprise Agent), Klarna (APP detail), IKEA (logistics/design, not strategy) | Confirmed: product/strategy is pre-chasm globally. Sub-domains at different stages: competitive intelligence (production), product analytics (early adopter), customer feedback synthesis (early adopter), strategic planning (innovator). Nordic signal weak except Klarna. The "what we didn't find" is as important as what we found. |
