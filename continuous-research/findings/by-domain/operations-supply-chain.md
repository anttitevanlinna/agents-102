---
type: finding
domain: operations-supply-chain
evidence_level: 3
platforms: [sap-joule, microsoft-dynamics-365, pactum-ai, fourkites, siemens-xcelerator, abb-genix]
practitioners: [Walmart, Maersk, Equinor, DHL, IKEA, Scania, Boliden, ABB, Stora Enso, Wartsila]
nordic: true
updated: 2026-03-28
answers:
  - "which operations have production multi-agent systems?"
  - "what does autonomous procurement look like?"
  - "which Nordic industrials deploy agentic operations?"
  - "why do 95% of operations AI pilots fail?"
  - "what's the procurement agent landscape?"
---

# Operations & Supply Chain — Agentic Deployment Findings

**Evidence level:** Level 3 (convergence) | **Last updated:** 2026-03-28

Operations/supply chain is the most mature domain for agentic AI after coding. Large global enterprises (Walmart, Amazon, DHL, Maersk, Siemens) run multi-agent systems in production. The shift: from single-purpose AI (demand forecasting, route optimization) to orchestrated multi-agent architectures where specialized agents handle procurement negotiation, inventory rebalancing, warehouse coordination, and logistics routing. Nordic angle is strong: Equinor ($330M cumulative savings), Maersk, IKEA, Scania, Boliden, ABB, Stora Enso, Wartsila all have significant deployments.

The chasm is real: 49% of procurement teams run AI pilots, only 4% reach meaningful deployment. 95% of enterprise AI pilots deliver zero measurable return (MIT NANDA). The gap is governance, data readiness, and decision ownership — not technology.

## Level 3+ Convergence Findings

### Multi-agent supply chain orchestration at global scale
- **Walmart:** Multi-agent architecture with specialized agents making autonomous micro-decisions about routing, driver assignment, order density, timing. AI detects, diagnoses, and corrects inventory issues without manual intervention. Scaling from 500 stores to 4,600+ locations in 2026. Source: [Supply Chain Dive](https://www.supplychaindive.com/news/4-walmart-supply-chain-ai-uses/760891/) [domain trade]
- **DHL / HappyRobot:** AI agents handle appointment scheduling, driver follow-up calls, high-priority warehouse coordination. Targets hundreds of thousands of emails and millions of voice minutes annually. Robust.AI robots in Mexico: 60%+ productivity improvement. Source: [DHL press release](https://group.dhl.com/en/media-relations/press-releases/2025/dhl-boosts-operational-efficiency-and-customer-communications-with-happyrobots-ai-agents.html) [vendor announcement]
- **FourKites / Coca-Cola ("Tracy"):** Agent autonomously monitors 3.2M shipments daily, 200+ countries, 1.1M carriers. "Where's my truck" response time: 90 min to seconds. Proactively nudges carriers for updates. Source: [FourKites](https://www.fourkites.com/fourkites-ai/agentic-ai/) [vendor announcement]
- **Siemens:** Multi-agent with orchestrator: Planning Copilot (production planning), Operations Copilot (shop floor natural language queries), Engineering Copilot (automation code from NL). Claims 50% productivity increase. Source: [Siemens](https://press.siemens.com/global/en/pressrelease/siemens-introduces-ai-agents-industrial-automation) [vendor announcement]

### Autonomous procurement negotiation is in production
- **Pactum AI / Walmart / Maersk:** AI agent autonomously negotiates supplier contracts. At Walmart: 2.8-6.8% profitability gain per deal, $42K net value per $1M spend. At Maersk: negotiates freight agreements, improves over successive rounds. 90%+ suppliers accept/prefer AI negotiations. Harvard Business School case study. Source: [HBS case](https://store.hbr.org/product/pactum-s-ai-in-contract-negotiations-walmart-and-maersk/TB0756) [academic], [IEEE Spectrum](https://spectrum.ieee.org/ai-contracts) [domain trade]

### Platform-embedded procurement agents are shipping
- **SAP Joule / Ariba:** Bid analysis agent, intelligent contracting (GA Q4 2025), guided buying agent (autonomous low-value purchases). Source: [SAP analysis](https://www.klover.ai/sap-uses-ai-agents-10-ways-to-use-ai-in-depth-analysis-2025/) [domain trade]
- **Microsoft D365 Supplier Communications Agent:** Autonomous vendor follow-up emails on POs, processes incoming vendor emails. Automates work consuming 50% of purchasing personnel's day. Source: [Microsoft Learn](https://learn.microsoft.com/en-us/dynamics365/supply-chain/procurement/supplier-com-agent-overview) [vendor docs]
- **Coupa Navi:** Multi-agent spend management powered by $8T anonymized spend data. Natural language to cost/scoring formulas. Source: [Digital Commerce 360](https://www.digitalcommerce360.com/2025/12/01/coupa-agentic-ai-features-procurement-platform/) [domain trade]

## Level 2 Findings

### Equinor (Norway) — $330M cumulative AI savings
Predictive maintenance: 700+ rotating machines, 24K sensors, $120M value since 2020. AI-driven well planning: Johan Sverdrup phase 3, AI found a solution humans hadn't considered ($12M saved). Seismic interpretation: 10x capacity increase. 100+ new use cases identified. Source: [Equinor](https://www.equinor.com/news/20260107-artificial-intelligence-saved-equinor-usd-130-million) [corporate announcement]

### Maersk (Denmark) — Production across route, customs, warehousing
AI for route optimization (speed/fuel), automated customs processing (cross-referencing trade regulations), smart warehousing UK (tripled sorting speed, +33% inventory pickup). Reduced disruption impacts 28%. Vision: AI handles 80% of logistics tasks within 5-7 years. Source: [AI Magazine](https://aimagazine.com/news/maersk-coca-cola-optimising-the-supply-chain-using-ai) [domain trade]

### IKEA / Ingka — AI-powered last-mile logistics
Acquired Locus AI platform (Oct 2025) for real-time delivery planning. Expected ~EUR 100M/year savings. Demand Sensing: 98% accepted forecasts, 2% manual correction — largest AI deployment in IKEA supply chain. Source: [Logistics Viewpoints](https://logisticsviewpoints.com/2025/10/09/ingka-group-acquires-locus-to-enhance-ikeas-home-delivery-operations-with-ai-powered-logistics/) [domain trade]

### Scania (Sweden) — Autonomous mining trucks
Driverless autonomous mining trucks at Rio Tinto (Western Australia). Full-scale driverless operations beginning 2026. Partnership with Regroup. Hub-to-hub autonomous expected ~2030 in Europe. Source: [Scania](https://www.scania.com/group/en/home/innovation/autonomous-solutions.html) [corporate]

### Boliden (Sweden) — Autonomous haulage at Aitik mine
Komatsu FrontRunner AHS with Ericsson private 5G. Partnership with Volvo Autonomous Solutions. Increases productivity, decreases cost/ton. Source: [Boliden investors](https://investors.boliden.com/en/press/boliden-and-volvo-autonomous-solutions-vas-establishes-long-term-collaboration-around) [corporate]

### ABB (Sweden/Switzerland) — Genix industrial AI platform
Agentic Automation framework: real-time monitoring, contextual interpretation, autonomous action with human-in-the-loop. 60-80% reduction in troubleshooting time. Up to 20% improvement in asset reliability, 60% reduction in unplanned downtime. Verdantix Leader in Industrial AI Analytics 2025. Source: [Microsoft/ABB customer story](https://www.microsoft.com/en/customers/story/25697-abb-azure) [vendor case study]

### Stora Enso (Finland) — Multi-agent sales intelligence
Multi-agent system with customized orchestrator, guardian layer for policy compliance. AI Sales Negotiator: from 1-2 reactive scenarios to 10-20 proactive scenarios. Also seeking AI-powered sourcing co-pilot via Combient Foundry. Source: [Combient Foundry](https://combientfoundry.com/opportunities/ai-powered-sourcing-co-pilot-with-stora-enso/) [domain trade]

### Wartsila (Finland) — Maritime predictive maintenance + autonomous docking
Expert Insight: AI predictive maintenance monitoring dozens of ships in real time. Smart Ships: sensor data + weather + navigational inputs, up to 10% fuel reduction. Successfully tested autonomous auto-docking on Norwegian ro-ro vessel Folgefonn. Source: [Wartsila](https://www.wartsila.com/insights/article/artificial-intelligence-and-the-marine-industry) [corporate]

### Ericsson (Sweden) — Agentic rApp as a Service
Launched at MWC 2026 on AWS. Agentic AI for network optimization: 100M+ AI inferences daily across 11M cells serving 2B+ subscribers. Q2 2026 broad availability. Source: [Telecom Lead](https://telecomlead.com/telecom-equipment/mwc-2026-ericsson-launches-agentic-rapp-as-a-service-on-aws-to-accelerate-ai-driven-autonomous-networks-124593) [domain trade]

## Level 1 (Context Only)

### Failure rates are the real story
- 49% of procurement teams running AI pilots, only 4% at meaningful deployment (EY Global CPO Survey)
- 95% of enterprise AI pilots deliver zero measurable return (MIT NANDA, July 2025)
- 40%+ of agentic AI projects will be canceled by end of 2027 (Gartner)
- Companies using specialized vendors succeed 67% vs. 22% for in-house builds
- Decision design, not model accuracy, is the primary failure cause

## Counter-Evidence

- **95% pilot failure rate (MIT NANDA)** is the dominant reality despite headline deployments at Walmart/DHL/Maersk scale
- **Homegrown builds fail 78% of the time** — only specialized vendor tools have viable success rates
- **Data fragmentation blocks most deployments** — sophisticated algorithms can't compensate for fragmented data and unstandardized processes
- **Amazon Project Eluna is still a pilot** — even Amazon's internal agentic operations tool is recommending, not executing autonomously

## Named Practitioners

- **Equinor** — Largest documented AI savings in the Nordics ($330M cumulative)
- **Maersk** — Broadest deployment across route, customs, warehousing
- **Pactum AI** — Autonomous procurement negotiation (HBS case study validates)
- **ABB** — Platform provider for early majority industrial AI
- **IKEA** — Acquisition strategy (Locus) signals build-vs-buy maturity

## Nordic Signal

**Very strong.** Five Nordic companies with significant deployments: Equinor (Norway, $330M), Maersk (Denmark, multi-domain), IKEA (Sweden, last-mile + demand sensing), Scania (Sweden, autonomous mining), Boliden (Sweden, autonomous haulage). ABB is a platform provider. Stora Enso and Wartsila represent Finnish industrial adoption. Ericsson's agentic telecom network optimization is a new Nordic signal. This is the strongest Nordic domain by quantity and quality of evidence.

## What We Did Not Find

1. **No Nordic mid-market operations AI deployments** — all evidence from large enterprises
2. **No evidence of agentic procurement at Nordic companies** beyond Stora Enso's early pilot — despite SAP/D365 being dominant
3. **No Nordic warehouse robotics deployments** comparable to Ocado or Amazon
4. **No public data from Neste, SSAB, or other Finnish/Swedish industrials** on operations AI
