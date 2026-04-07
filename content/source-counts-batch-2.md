# Source Quality Audit — Batch 2

**Date:** 2026-02-22
**Auditor criteria:** "Agent" = multi-step autonomous work with tool use and decision-making. A chatbot answering questions is NOT an agent. A vendor announcing "agentic features" is NOT a deployment.

---

### Operations & Supply Chain (operations-supply-chain.md)
- Total findings: 21
- Truly agentic (passes gate): 12
- Vendor fluff: 4
- Chatbot/copilot misclassified: 5
- Key genuine findings:
  - **Walmart** — multi-agent orchestration across routing, driver assignment, inventory correction; production at 4,600+ stores
  - **Pactum AI / Walmart / Maersk** — autonomous multi-round procurement negotiation; 2.8-6.8% profitability gain per deal; Harvard case study
  - **DHL / HappyRobot** — autonomous scheduling, driver follow-up, warehouse coordination across voice and email
  - **Amazon Project Eluna** — agentic model that reasons through fulfillment operations and recommends actions (still pilot, but agentic architecture)
  - **FourKites Tracy** — autonomous shipment monitoring, proactive carrier nudging across 3.2M shipments/day
  - **Ocado** — AI swarm robotics picking 100K+ orders weekly at 99.99% accuracy with fleet-wide learning
  - **Maersk** — AI agents for route optimization, automated customs processing, smart warehousing (tripled sorting speed)
  - **Scania** — driverless autonomous mining trucks in production 2026
  - **Boliden** — autonomous haulage at Aitik mine with Komatsu/Ericsson/Volvo ecosystem
  - **Stora Enso** — multi-agent system with orchestrator, guardian layer, AI sales negotiator (10-20 proactive scenarios vs 1-2 reactive); pilot stage
  - **Wartsila** — predictive maintenance fleet operations + autonomous auto-docking tested on Norwegian vessel
  - **P&G** — autonomous supply chain platform reacting to demand signals across the full chain

**Vendor fluff (4):**
  - **SAP Joule** — vendor announcement of procurement agents; no independent deployment evidence; "GA Q4 2025" timeline but no customer results
  - **Coupa Navi** — vendor platform launch; "powered by $8T in spend data" is marketing; no named customer outcomes
  - **Microsoft Dynamics 365 Supplier Communications Agent** — product documentation, still in "production-ready preview"; no customer deployment evidence
  - **Siemens Industrial AI Agents** — press release + conference announcement; "claims up to 50% productivity increase" is vendor language; no independent verification

**Chatbot/copilot misclassified (5):**
  - **Equinor** — $330M savings impressive but the "copilots and agentic AI tools available to employees" and "100 new use cases identified" is copilot/dashboard language; the predictive maintenance (sensor monitoring) is ML/automation, not agentic; the well planning AI is an optimization tool, not an agent
  - **IKEA Demand Sensing** — "98% accepted forecasts with only 2% manual correction" is a forecasting tool/ML model, not an agent; the Locus acquisition is logistics optimization, not multi-step agentic work
  - **ABB Genix** — "scanning QR codes triggers agents that pull real-time data" is tool-assisted lookup, not autonomous multi-step work; "60-80% reduction in troubleshooting time" is copilot territory; source is Microsoft customer story (vendor)
  - **Unilever digital twin** — computer vision quality detection and predictive maintenance are ML models, not agents; autonomous drones for inventory are robotics; source is a barcode software company blog (not credible)
  - **IKEA/Ingka Locus** — "AI agents plan, track, and optimize deliveries" is route optimization software rebranded as "agents"; no evidence of multi-step autonomous decision-making beyond algorithmic optimization

---

### Sales & Marketing (sales-marketing.md)
- Total findings: 13
- Truly agentic (passes gate): 7
- Vendor fluff: 3
- Chatbot/copilot misclassified: 3
- Key genuine findings:
  - **Salesforce internal Agentforce SDR** — autonomous re-engagement of 43,000+ dormant leads, generated $1.7M pipeline; multi-step email sequences with qualification and routing
  - **VTT Finland Agentforce** — autonomous inbound lead qualification and engagement 24/7; Finnish government research institution (not a startup)
  - **Qualified / Piper** — multi-stage autonomous SDR (capture, nurture, convert); 500+ companies; Greenhouse generated $27M pipeline; multi-modal (text, voice, video)
  - **Klarna marketing ops** — AI agents generating creatives, cutting image development from 6 weeks to 7 days, $10M annualized savings; genuinely autonomous content production pipeline
  - **Crayon** — autonomous monitoring of competitor websites, pricing, job postings; change detection, relevance scoring, digest generation without human input
  - **Aprimo** — multi-agent content operations lifecycle (planning, metadata, quality check, transformation); in production since 2023; regulated industries
  - **SitecoreAI** — 20 agents for campaign planning, content creation, migration; named customers (Regal Rexnord, Hexagon); Danish HQ

**Vendor fluff (3):**
  - **Thalamus AI** — vendor claims of "5x faster" and "2x win rate"; source is vendor's own blog and website; no independent customer verification
  - **HubSpot Breeze** — vendor product announcement; "Content Hub attachment rates surged from 13% to 54%" is vendor metric; no independent deployment evidence with customer names and outcomes
  - **Demandbase ABM** — "78.7% of organizations now use AI in ABM" is industry survey noise; the "autonomous campaign orchestration" is described as "mostly vendor vision"; product documentation as sole source

**Chatbot/copilot misclassified (3):**
  - **Sendoso / Gem-E** — intent signal detection + CRM research + message crafting is a sophisticated copilot workflow, not autonomous multi-step work; human still decides to send; source is a UserGems blog (competitor/interested party)
  - **Gong revenue agents** — "Deal Reviewer agent suggests deal updates" and "generates summaries and suggests personalized follow-ups" is copilot behavior (suggest, summarize); auto-updating CRM fields from calls is automation, not agentic; the "Agent Studio" is a platform feature, not a deployed agent
  - **Realm Helsinki** — "answer customer questions in seconds, fill RFP questionnaires" is RAG/search, not agentic; early startup (EUR 1.7M funding); source is funding announcement, not deployment evidence
  - **Klarna Agentic Commerce Protocol** — listed separately but this is infrastructure/protocol, not a deployed agent; pre-chasm by the file's own admission (correctly categorized in file as "innovator experiment")

*Note: Klarna appears twice — marketing ops (genuinely agentic) and agentic commerce protocol (infrastructure, not an agent deployment). Counted the protocol as the 13th finding but not as agentic, chatbot, or vendor fluff — it is a different category (infrastructure/standard).*

---

### Product & Strategy (product-strategy.md)
- Total findings: 12
- Truly agentic (passes gate): 4
- Vendor fluff: 3
- Chatbot/copilot misclassified: 5
- Key genuine findings:
  - **Crayon** — autonomous competitive intelligence monitoring, intent prediction from signal patterns, dynamic battlecard generation; MCP server for agent integration; 22% increase in competitive win rates (but duplicate from sales-marketing file)
  - **Klue** — autonomous competitive research, daily auto-updating battlecards from multiple signal sources; production deployment
  - **AlphaSense** — workflow agents automating full strategic analysis arcs (company primers, market landscapes, SWOT); 85% of S&P 100; AWS Marketplace listing as agent tool
  - **Amplitude** — 5 specialized product agents: dashboard monitoring, session replay analysis, experiment design/launch, feedback mapping; genuinely multi-step autonomous work

**Vendor fluff (3):**
  - **Anaplan CoModeler** — vendor announcement; "limited customer availability since November 2025"; "GA expected Q1 2026"; autonomous agents "debuting in first half of 2026" is roadmap, not deployment
  - **Klarna Agentic Product Protocol** — duplicate from sales-marketing; infrastructure/standard, not a product strategy agent; correctly noted in the file but still counted as a finding
  - **Microsoft Researcher/Analyst** — vendor product announcement; "GA since June 2025" but no independent evidence of strategic use; "early adopters used Researcher to assess tariff impacts" is vendor marketing language; source is Microsoft blog

**Chatbot/copilot misclassified (5):**
  - **Quantum Metric Felix AI** — "monitor, analyze, and alert product teams" is dashboard alerting with AI summarization; "25% adoption among largest customers" doesn't establish agentic behavior; the file itself asks "do product teams actually change roadmaps based on Felix AI recommendations?"
  - **Dovetail** — "structure customer feedback signals into product requirements" is sophisticated NLP/categorization, not multi-step autonomous work; the file correctly notes "whether product teams trust agent-generated requirements enough to act on them without heavy review is the chasm question"
  - **Enterpret** — "alert teams to emerging issues" is notification/monitoring; "natural-language interface" for questions is a search tool/chatbot; the file itself notes "the natural-language query interface is closer to a research assistant than an autonomous agent"
  - **Gong voice-of-customer** — "AI Theme Spotter" and "AI Tracker" are analytics features, not agents; "AI Ask Anything" is a search/query interface; duplicate from sales-marketing file
  - **Nordea Enterprise Agent** — the file itself calls this a "general-purpose tool, not a product strategy agent"; "ChatGPT-like tool" for document analysis; the "12 production agents" are customer-facing chatbots (Nova)

---

### Agentic Coding — Nordic Reference (agentic-coding-nordic-reference.md)
- Total findings: 10
- Truly agentic (passes gate): 3
- Vendor fluff: 0
- Chatbot/copilot misclassified: 3
- Key genuine findings:
  - **Spotify "Honk"** — 1,500+ agent-generated PRs merged, 650+/month; autonomous code migrations across ~50 migration types; agents run formatters, linting, builds, tests before opening PRs; Level 3 convergence evidence (3-part engineering blog + CEO statement + independent press)
  - **Lovable / Anton Osika** — $300M+ ARR, ~8M users, 100K products/day; autonomous app generation from natural language; HBS case study; genuinely agentic (multi-step: understand intent, generate code, deploy); different use case from professional coding
  - **Raine Virta** — built workmux for parallel agent development; documented autonomous agent architecture with git worktrees; Level 2 single practitioner but genuine agentic tooling contribution

**Vendor fluff (0):**
  - File is notably clean of vendor fluff; vendor sources (Anthropic, Klarna press releases) are explicitly labeled as "Level 0 — context only" in the sources section

**Chatbot/copilot misclassified (3):**
  - **Supercell AI Innovation Lab** — "give our people superpowers" is aspiration; "code gen and CI/CD acceleration" is copilot; file correctly notes "no public evidence of production agentic coding deployment"
  - **Klarna (in this context)** — 90% AI daily usage is copilot/tool adoption; customer service agent "doing work of 700 humans" is a chatbot; file correctly notes "no public evidence of production agentic coding deployment" for coding specifically
  - **Agion / Mikko Alasaarela** — community building and governance focus; "not coding agents specifically"; no deployment evidence

**Not classified (remaining 4):**
  - **Reaktor + University of Helsinki** — research study, not a deployment; results not yet published; valuable future signal but not a finding
  - **F-Secure** — first-party training evidence, not a deployment finding; correctly noted as "not citable as an independent finding"
  - **METR study** — counter-evidence/research; not a deployment
  - **Structural pattern analysis** (5 ingredients) — analytical framework, not a deployment finding

---

## Summary Table

| Domain | Total | Truly Agentic | Vendor Fluff | Chatbot/Copilot | Agentic Rate |
|--------|-------|---------------|--------------|-----------------|--------------|
| Operations & Supply Chain | 21 | 12 | 4 | 5 | 57% |
| Sales & Marketing | 13 | 7 | 3 | 3 | 54% |
| Product & Strategy | 12 | 4 | 3 | 5 | 33% |
| Agentic Coding (Nordic) | 10 | 3 | 0 | 3 | 30% |
| **TOTAL** | **56** | **26** | **10** | **16** | **46%** |

## Cross-File Duplicates Detected

- **Crayon** appears as a full finding in both sales-marketing.md AND product-strategy.md (should be primary in one)
- **Klarna** appears as a full finding in both sales-marketing.md AND product-strategy.md (agentic commerce protocol duplicated)
- **Gong** appears as a full finding in both sales-marketing.md AND product-strategy.md (revenue agents duplicated)
- **Klarna** appears again in agentic-coding-nordic-reference.md (but correctly noted as non-finding)

Per CLAUDE.md deduplication rule: each company should appear as a primary finding in exactly one domain.

## Editorial Notes

1. **Operations & Supply Chain is the strongest file.** 12 genuinely agentic findings with specific outcomes. The Nordic angle is real (Maersk, Scania, Boliden, Stora Enso, Wartsila). The procurement agent sub-domain has the most actionable training content potential.

2. **Sales & Marketing has a vendor contamination problem.** HubSpot, Thalamus, and Demandbase are vendor product announcements dressed as findings. The AI SDR category (Salesforce, VTT, Qualified) is genuinely agentic. The content operations category (Aprimo, Sitecore) is genuinely agentic.

3. **Product & Strategy is thin — and the file knows it.** The orientation summary and "What We Did Not Find" section are the most valuable parts. Only 4 genuinely agentic findings, and one (Crayon) is a duplicate. The file correctly identifies this as the least mature domain.

4. **Agentic Coding is the cleanest file editorially.** Explicit source tiering, direct "What We Did Not Find," correct self-labeling of vendor sources as Level 0. Only 3 genuine findings but all are strong. The structural analysis (5 ingredients) is the most valuable content for the comparative article.

5. **Overall: 26 out of 56 findings (46%) pass the agentic gate.** The rest are vendor announcements, copilots, chatbots, dashboards, or ML models rebranded as "agents." This is consistent with the project's earlier finding that ~30 of ~95 across all domains are genuinely agentic.
