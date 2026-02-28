# Sales & Marketing — Research Findings

## Orientation Summary

The sales/marketing domain is one of the most active areas for agentic AI deployment, but with a critical lesson baked in: **85% of "fully autonomous AI SDR" deployments from 2024-2025 were shut down within six months** [SOURCE NEEDED -- ANCHOR CLAIM: no primary source found for this statistic; the UserGems blog is the only proximate reference and is an interested party]. The survivors are hybrid models where agents handle qualification, research, and initial outreach, but humans take over for complex conversations. Intent-signal triggering (vs. spray-and-pray) is the pattern that survived.

**Four distinct agent categories are emerging:** (1) **AI SDR agents** for inbound lead qualification and outbound prospecting — the most mature category with hundreds of production deployments. (2) **RFP/proposal generation agents** — multi-agent systems that analyze requirements, pull from content libraries, and generate compliant first drafts in minutes. (3) **Competitive intelligence agents** — autonomous monitoring of competitor moves with real-time alerting. (4) **Agentic commerce protocols** — a nascent but potentially transformative category where AI agents act as autonomous buyers/sellers (Klarna, Stripe/OpenAI, Visa, Google all launching protocols in late 2025).

**The chasm signal is clear:** The technology works for high-volume, low-complexity qualification. It breaks down when leads require nuanced understanding of enterprise buying committees or complex technical requirements. The companies crossing the chasm are wrapping agents in governance — human escalation rules, brand voice guardrails, and clear handoff protocols. Platform vendors (Salesforce with 18,500 use cases, HubSpot targeting SMBs, Qualified with 500+ companies) are the channel pushing agents from early adopter to early majority.

**Nordic angle:** VTT Technical Research Centre of Finland is a confirmed Agentforce deployment. Klarna (Sweden) is the most aggressive Nordic company — not just using AI agents for marketing cost reduction (37% savings, $10M annualized), but building the infrastructure layer for agentic commerce (Agentic Product Protocol making 100M+ products discoverable by AI agents). Realm (Helsinki) is building AI agents specifically for revenue teams and RFP responses, backed by Lifeline Ventures. The Nordic B2B market (smaller deal volumes, relationship-heavy sales culture) may actually be better suited to hybrid agent models than the US high-volume approach.

## Findings

### Salesforce (Internal) — Agentforce SDR on Dormant Leads

| Field | Value |
|-------|-------|
| Company | Salesforce |
| Country | USA (Global) |
| Process domain | Sales & Marketing |
| What the agent does | SDR agent works dormant leads that human reps deprioritized. Autonomously re-engages cold leads, qualifies them through multi-step email sequences, and routes hot leads to human reps. Processed 43,000+ leads and generated $1.7M in new pipeline from leads that would otherwise have been abandoned. |
| Adoption stage | Production deployment |
| Evidence quality | Public statement (Salesforce "Customer Zero" reporting) |
| Source | https://www.salesforce.com/news/stories/first-year-agentforce-customer-zero/ |
| Origin tag | Global |
| Nordic applicability | Direct — dormant lead reactivation is universal |
| Chasm signal | Strong. Salesforce eating its own cooking at scale. 18,500 Agentforce use cases across customers, 9,500 paid deals. Agentforce ARR grew 330% YoY. This is the platform vendor pushing the category into early majority. |

### VTT Technical Research Centre of Finland — Agentforce Inbound Lead Qualification

| Field | Value |
|-------|-------|
| Company | VTT Technical Research Centre of Finland |
| Country | Finland |
| Process domain | Sales & Marketing |
| What the agent does | Uses Agentforce SDR agent to automatically qualify and engage inbound leads from web pages, digital events, and in-person events. Agent handles all initial outreach, answers questions with up-to-date information, and works 24/7 to ensure every lead receives a response. Previously, human SDR team took hours or days to respond — now nearly every lead is contacted. |
| Adoption stage | Production deployment |
| Evidence quality | Public case study (Salesforce customer story) |
| Source | https://www.salesforce.com/sales/ai-sales-agent/ai-sdr/ |
| Origin tag | Nordic (Finland) |
| Nordic applicability | Direct — this IS a Nordic deployment |
| Chasm signal | Strong. Government research institution (not a startup) deploying AI SDR for real lead qualification. Shows the pattern is moving beyond tech companies into institutional buyers in Finland. |

### Qualified / Piper — AI SDR Superagent (500+ Companies)

| Field | Value |
|-------|-------|
| Company | Qualified (platform); customers include Asana, Greenhouse, Litmus, Demandbase |
| Country | USA (Global) |
| Process domain | Sales & Marketing |
| What the agent does | Multi-stage autonomous SDR: captures new inbound leads, nurtures warm prospects, converts hot leads. Multi-modal (text, voice, video). Researches target accounts, personalizes outreach, books qualified meetings. Greenhouse generated $27M in pipeline and 2,000 qualified meetings. Asana increased pipeline 22%. Litmus doubled monthly booked meetings within 40 days, generating $220K pipeline. |
| Adoption stage | Production deployment / Scaling |
| Evidence quality | Public statements, press releases, customer testimonials |
| Source | https://www.qualified.com/ai-sdr, https://www.qualified.com/newsroom/qualified-unveils-piperx |
| Origin tag | Global |
| Nordic applicability | Requires adaptation — Piper is optimized for US high-volume inbound; Nordic B2B markets have lower volume but higher relationship complexity |
| Chasm signal | Very strong. 500+ companies deployed. The move from single-stage (chat) to multi-stage (capture → nurture → convert) shows maturation. Multi-modal (voice, video) signals crossing from text-only automation into richer engagement. |

### HubSpot Breeze — Prospecting and Content Agents

| Field | Value |
|-------|-------|
| Company | HubSpot |
| Country | USA (Global) |
| Process domain | Sales & Marketing |
| What the agent does | Breeze Prospecting Agent: researches target accounts using selling profiles, personalizes outreach by product/persona/market, engages prospects in Smart CRM. Breeze Content Agent: creates and scales content across channels (blogs, podcasts, case studies). Breeze Customer Agent: resolves 50%+ of support tickets. Content Hub attachment rates surged from 13% to 54% during 2024. |
| Adoption stage | Production deployment |
| Evidence quality | Public product announcement, investor relations disclosure |
| Source | https://www.hubspot.com/products/artificial-intelligence/breeze-ai-agents, https://ir.hubspot.com/news-releases/news-release-details/hubspot-launches-new-and-enhanced-ai-agents-plus-over-200 |
| Origin tag | Global |
| Nordic applicability | Direct — HubSpot widely used by Nordic SMBs and mid-market |
| Chasm signal | Strong. HubSpot targeting SMBs means they're pushing agents into early majority directly. Migration to GPT-5 (Jan 2026) shows continuous platform investment. |

### Sendoso / Gem-E — Intent-Driven Outbound Agent

| Field | Value |
|-------|-------|
| Company | Sendoso (platform); specific customers deploying |
| Country | USA (Global) |
| Process domain | Sales & Marketing |
| What the agent does | Detects buying intent signals (job changes, website visits), scans Salesforce data for relationship history, writes personalized outreach sequences autonomously. Multi-step: signal detection → CRM research → message crafting → sequence execution. Customer results: 20% reply rates, 47 opportunities created, ROI positive in 30 days. |
| Adoption stage | Early adopter pilot / Production deployment |
| Evidence quality | Customer testimonial, vendor case study |
| Source | https://www.usergems.com/blog/ai-sdrs-for-managing-inbound-leads |
| Origin tag | Global |
| Nordic applicability | Requires adaptation — intent signal quality depends on US data sources; Nordic equivalents may need different signal providers |
| Chasm signal | Moderate. Intent-based triggering (vs. spray-and-pray) is the pattern that survived the AI SDR shakeout. 85% of "fully autonomous AI SDRs" shut down within 6 months [SOURCE NEEDED] — the survivors use intent signals. |

### Klarna — AI-Driven Marketing Cost Reduction + Agentic Commerce Protocol

| Field | Value |
|-------|-------|
| Company | Klarna |
| Country | Sweden |
| Process domain | Sales & Marketing |
| What the agent does | Two distinct agentic practices: (1) **Marketing operations:** AI agents generate marketing creatives (Midjourney, DALL-E, Firefly), reducing image development from 6 weeks to 7 days, saving $1.5M in Q1 alone. Cut marketing agency spend by 25%. Total AI-driven marketing/sales savings: $10M annualized (37% of department savings). (2) **Agentic Commerce Protocol:** Launched open standard making 100M+ products across 400M prices in 12 markets discoverable by AI agents. Complements Stripe/OpenAI Agentic Commerce Protocol. This is infrastructure for a future where AI agents autonomously shop on behalf of consumers. |
| Adoption stage | Production deployment (marketing ops) / Innovator experiment (agentic commerce protocol) |
| Evidence quality | Public earnings reports, press releases, CEO statements |
| Source | https://www.klarna.com/international/press/ai-helps-klarna-cut-marketing-agency-spend-by-25-and-run-more-campaigns/, https://investors.klarna.com/News--Events/news/news-details/2025/Klarna-Launches-Agentic-Product-Protocol-The-Open-Standard-That-Makes-100M-Products-Instantly-Discoverable-by-AI-Agents/ |
| Origin tag | Nordic (Sweden) |
| Nordic applicability | Direct — this IS a Nordic deployment. Agentic Product Protocol designed for multi-market (12 markets including Nordics) |
| Chasm signal | Very strong for marketing ops (production, measurable ROI). The Agentic Commerce Protocol is pre-chasm but category-defining — Klarna, Stripe/OpenAI, Visa, and Google all launched agent commerce protocols in late 2025. If AI agents become autonomous shoppers, this rewrites B2C sales entirely. |

### Thalamus AI — Multi-Agent RFP/Proposal Generation

| Field | Value |
|-------|-------|
| Company | Thalamus AI (platform vendor) |
| Country | USA (Global) |
| Process domain | Sales & Marketing (proposal/bid management) |
| What the agent does | 20+ specialized AI agents orchestrate the entire RFP lifecycle: intake → requirement analysis → compliance matrix creation → content library search → first draft generation → SME routing → submission. Agents analyze complex RFPs, tag requirements, auto-create compliance matrices, and generate "winnable first drafts" in under 5 minutes. Pre-fills 70-80% of responses from centralized content libraries. Claims 5x faster response times and 2x win rate improvement. |
| Adoption stage | Production deployment |
| Evidence quality | Vendor claims, product documentation (ISO 27001 & SOC 2 Type 2 certified) |
| Source | https://thalamushq.ai/, https://blogs.thalamushq.ai/rise-of-ai-agents-in-rfp-response-process-what-is-thalamus-ai/ |
| Origin tag | Global |
| Nordic applicability | Direct — RFP processes are universal; enterprise compliance requirements (ISO, SOC 2) align with Nordic governance expectations |
| Chasm signal | Moderate. Multi-agent RFP generation is maturing but vendor claims need independent validation. The pattern of "pre-fill 70-80% + human review" is the hybrid model that works. Enterprise security certifications show awareness of buyer governance requirements. |

### Realm — AI Agents for Revenue Teams and RFP Responses (Helsinki)

| Field | Value |
|-------|-------|
| Company | Realm |
| Country | Finland (Helsinki) |
| Process domain | Sales & Marketing (revenue enablement, RFP responses) |
| What the agent does | Turns sales collateral, product docs, and CRM data into AI agents that answer customer questions in seconds, fill RFP/security questionnaires in minutes, and surface insights to help win and retain customers. Multi-step: knowledge ingestion → query understanding → content retrieval → response generation → human review. |
| Adoption stage | Early adopter pilot |
| Evidence quality | Funding announcement (€1.7M), product description |
| Source | https://www.withrealm.com/, https://tech.eu/2024/06/04/ex-slush-leaders-startup-realm-secures-eur17m-for-ai-knowledge-search/ |
| Origin tag | Nordic (Finland) |
| Nordic applicability | Direct — Finnish startup, backed by Lifeline Ventures, founders from Wolt/Supercell/Zalando ecosystem |
| Chasm signal | Early. Startup stage, but notable that the Finnish deep-tech ecosystem (Slush, Lifeline Ventures) is producing sales-focused AI agent companies. The RFP use case is high-value and enterprise-friendly. |

### Gong — AI Revenue Agents for Deal Management

| Field | Value |
|-------|-------|
| Company | Gong |
| Country | USA (Global) |
| Process domain | Sales & Marketing (revenue intelligence) |
| What the agent does | Over a dozen AI agents embedded in revenue platform. Key agents: (1) Deal Reviewer agent suggests deal updates, improves seller productivity and manager feedback. (2) AI auto-updates CRM fields from call analysis, eliminating manual data entry. (3) Generates summaries and suggests personalized follow-ups. (4) Agent Studio lets business users configure agents with drag-and-drop (inputs, outputs, autonomy levels). Multi-step: call recording → transcription → analysis → insight extraction → CRM update → next-action recommendation. |
| Adoption stage | Production deployment (core platform) / Early adopter (newer agents) |
| Evidence quality | Public product announcement (April 2025), product documentation |
| Source | https://www.gong.io/press/gong-redefines-ai-agents-to-deliver-real-revenue-impact |
| Origin tag | Global |
| Nordic applicability | Direct — Gong used by Nordic enterprise sales teams; conversation intelligence is language-agnostic in principle but may need Nordic language support |
| Chasm signal | Strong. Gong's Agent Studio (no-code agent configuration by business users) is a chasm-crossing feature — it democratizes agent creation beyond engineering teams. Some agents still rolling out, which suggests caution on full delivery. |

### Crayon — Autonomous Competitive Intelligence Monitoring

| Field | Value |
|-------|-------|
| Company | Crayon (acquired by SoftwareOne, July 2025) |
| Country | USA (Global) |
| Process domain | Sales & Marketing (competitive intelligence) |
| What the agent does | Autonomous monitoring agents track competitor websites, pricing changes, job postings, release notes, support docs, customer reviews, SEC filings, and press releases. AI surfaces most relevant insights ("Crayon Picks"), generates daily intelligence digests, and alerts teams to significant competitive moves in real-time. Multi-step: source monitoring → change detection → relevance scoring → insight surfacing → digest generation → team notification. |
| Adoption stage | Production deployment |
| Evidence quality | Product documentation, acquisition by SoftwareOne (validates market) |
| Source | https://www.crayon.co/, https://www.crayon.co/product/analyze |
| Origin tag | Global |
| Nordic applicability | Requires adaptation — primarily monitors English-language sources; Nordic-language competitor monitoring may have gaps |
| Chasm signal | Moderate. Competitive intelligence is a mature category; AI adds autonomous monitoring and summarization. Acquisition by SoftwareOne (CHF 11M run-rate synergies) validates enterprise demand. The pattern: continuous monitoring + AI-curated alerts is more useful than periodic manual analysis. |

### Aprimo — AI Agents for Content Operations (Production Since 2023)

| Field | Value |
|-------|-------|
| Company | Aprimo |
| Country | USA (Global) |
| Process domain | Sales & Marketing (content operations) |
| What the agent does | Specialized AI agents automate the full content operations lifecycle: (1) **Planning Agents** build campaign briefs aligned with brand standards. (2) **Librarian Agents** automate metadata creation using predictive metadata, smart captions, OCR, facial recognition, brand-trained tagging. (3) **Critic Agents** evaluate creative content for quality issues and brand compliance. (4) **Transformation Agents** adapt content across channels and formats. Multi-step orchestration: brief creation → content production → metadata enrichment → quality/brand check → distribution. Customers report 80%+ content creation scaling, up to 30% increase in content engagement, reduced time-to-market. |
| Adoption stage | Production deployment / Scaling (in production since late 2023) |
| Evidence quality | Gartner Magic Quadrant Leader (2025), press releases, vendor metrics |
| Source | https://www.aprimo.com/platform/ai-agents, https://www.businesswire.com/news/home/20250522432375/en/Aprimo-Launches-AI-Agents-to-Transform-Content-Operations-with-Scalable-Automation |
| Origin tag | Global |
| Nordic applicability | Direct — content operations challenges are universal; multi-language content adaptation is relevant for Nordic multi-market companies |
| Chasm signal | Strong. In production since 2023 in regulated industries (financial services, healthcare, consumer goods). The "Planning → Production → QA → Distribution" agent chain is a mature pattern. Gartner Leader status validates enterprise readiness. |

### SitecoreAI — 20 AI Agents for Campaign and Content Management

| Field | Value |
|-------|-------|
| Company | Sitecore (platform); customers include Regal Rexnord, Hexagon, Berkeley Homes, AFL |
| Country | Denmark (HQ) / Global |
| Process domain | Sales & Marketing (content management, campaign execution) |
| What the agent does | 20+ out-of-box AI agents spanning campaign planning, content creation, migration, and testing. Key agent types: (1) **Migration Tooling Agents** automate content and schema conversion when consolidating legacy properties — Regal Rexnord and Hexagon cutting migration timelines from months to weeks. (2) **Contextually Aware Content Agents** generate targeted content by audience and channel — Berkeley Homes and AFL use these for audience targeting. (3) **Campaign Planning Agents** enable launching campaigns in days not weeks. Multi-step: brief → content generation → personalization → testing → deployment. |
| Adoption stage | Production deployment (launched October 2025) |
| Evidence quality | Public product announcement, named customer case studies |
| Source | https://www.sitecore.com/company/newsroom/press-releases/2025/10/sitecore-unveils-sitecoreai-ushering-in-the-ai-first-era-of-digital-experience |
| Origin tag | Both (Sitecore HQ is in Denmark, customers global) |
| Nordic applicability | Direct — Sitecore is a Danish company widely used in Nordic enterprises. The platform's multi-language and multi-market capabilities are designed for Nordic-type markets. |
| Chasm signal | Strong. 20 agents at no extra cost (reducing adoption friction). Named enterprise customers (Hexagon is a Swedish-origin company). Migration agents address a real pain point — legacy CMS consolidation. Sitecore's Nordic roots make this a natural fit for the region. |

### Demandbase — AI-Powered ABM Orchestration

| Field | Value |
|-------|-------|
| Company | Demandbase |
| Country | USA (Global) |
| Process domain | Sales & Marketing (account-based marketing) |
| What the agent does | AI agents for account-based marketing orchestration: (1) AI-optimized bidder autonomously manages ad campaign performance across platforms. (2) Intent monitoring agents detect buying signals and prioritize accounts. (3) Orchestration agents dynamically adjust campaigns based on real-time signals — reallocating budgets across ad platforms, creatives, and audiences based on ROI. Multi-step: intent detection → account scoring → campaign orchestration → budget optimization → performance analysis. 78.7% of organizations now use AI in ABM programs (industry-wide). |
| Adoption stage | Production deployment |
| Evidence quality | Product documentation, industry survey data |
| Source | https://www.demandbase.com/blog/ai-agents-for-marketing/ |
| Origin tag | Global |
| Nordic applicability | Requires adaptation — ABM is less established in Nordic markets than US; smaller target account pools may limit value |
| Chasm signal | Moderate. ABM AI agents are maturing but the "autonomous campaign orchestration" is still mostly vendor vision. The AI-optimized bidder (autonomous budget management) is the most concrete deployed capability. |

## Research Log

| Round | Searches | Findings | Orientation |
|-------|----------|----------|-------------|
| 1 | "AI agent sales automation enterprise B2B 2025 2026", "agentic lead qualification proposal generation 2025 2026", "Salesforce Agentforce sales deployment results case study", "AI SDR agent deployed company results lead qualification", "VTT Finland Agentforce", "Qualified Piper AI SDR", "HubSpot Breeze AI agent" | Salesforce internal ($1.7M pipeline from dormant leads), VTT Finland (Agentforce SDR), Qualified/Piper (500+ companies, $27M pipeline at Greenhouse), HubSpot Breeze (prospecting + content agents), Sendoso/Gem-E (intent-driven outbound) | AI SDR is the dominant pattern. 85% failure rate for fully autonomous SDRs — survivors use hybrid models with intent signals. Nordic: VTT is a confirmed Finnish deployment. Platform vendors (Salesforce, HubSpot, Qualified) are the channel pushing agents into early majority. Next: look at proposal/RFP generation, competitive intelligence, and Nordic-specific deployments. |
| 2 | "AI agent RFP proposal generation automated enterprise 2025 2026", "AI agent competitive intelligence sales autonomous monitoring 2025", "Nordic B2B sales AI agent Klarna Spotify Ericsson marketing 2025", "Klarna AI agent marketing internal results 2025 2026", "agentic commerce Klarna shopping agent protocol OpenAI 2025", "Thalamus AI RFP agent enterprise", "Realm AI Helsinki revenue agent", "Crayon competitive intelligence AI agent", "Gong AI agent sales call" | Klarna (37% marketing savings, agentic commerce protocol), Thalamus AI (multi-agent RFP generation), Realm Helsinki (revenue team agents), Gong (12+ revenue agents), Crayon (autonomous CI monitoring) | Three new categories beyond AI SDR: (1) RFP/proposal agents are multi-agent systems with real enterprise traction. (2) Competitive intelligence agents do continuous autonomous monitoring. (3) Agentic commerce protocols (Klarna, Stripe/OpenAI, Visa, Google) are nascent but category-defining. Klarna is the standout Nordic story — both user and infrastructure builder. Realm is a Finnish startup to watch. Next: content workflow automation, ABM agents, and any remaining Nordic angles. |
| 3 | "AI agent content workflow automation multi-step campaign creation enterprise 2025 2026", "account based marketing ABM AI agent autonomous personalization enterprise 2025", "Sitecore AI agent content marketing campaign automation 20 agents", "Aprimo AI agent content operations marketing workflow automation 2025", "Demandbase 6sense AI agent autonomous ABM", "Nordic company AI sales agent Sweden Denmark Norway Finland 2025 2026 case study" | Aprimo (content ops agents since 2023, 80% scaling), SitecoreAI (20 agents, Danish HQ, Hexagon customer), Demandbase (ABM orchestration agents) | Content operations agents are the most mature sub-category after AI SDR — Aprimo has been in production since 2023. SitecoreAI is a significant Nordic angle (Danish HQ). The ABM agent space is mostly vision/roadmap, not yet fully autonomous. The 85% AI SDR failure rate is the most important finding for training curriculum — it teaches the difference between agentic automation and agentic value. |
