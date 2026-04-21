---
type: finding
domain: hr-people-ops
evidence_level: 2
platforms: [workday-illuminate, sap-successfactors, servicenow, microsoft-365-copilot, paradox-ai]
practitioners: [Microsoft, Unilever, Siemens, CCEP, McDonald's/Paradox, IKEA, Klarna, Nordea]
nordic: true
updated: 2026-03-28
answers:
  - "which HR processes have production agents?"
  - "what does the EU AI Act mean for HR AI?"
  - "is autonomous hiring working?"
  - "how are Nordic companies deploying HR agents?"
  - "what's the Klarna vs IKEA contrast?"
---

# HR & People Operations — Agentic Deployment Findings

**Evidence level:** Level 2 (multiple single experiments, no convergence yet) | **Last updated:** 2026-03-28

HR is the weakest domain for truly agentic deployments. The incremental research (March 2026) found "no truly agentic HR deployments anywhere." The maturity ladder: FAQ chatbots (table stakes) → multi-step employee service agents (early adopter) → autonomous hiring agents (most advanced). The EU AI Act (Aug 2026 deadline) classifies all recruitment and HR decision-making AI as "high-risk" — creating a hard compliance boundary. Nordic companies are overwhelmingly consumers of global platforms (Workday, SAP, ServiceNow), not builders of HR agents. The Klarna vs IKEA contrast is the defining Nordic teaching case.

## Level 2 Findings

### Microsoft — Employee Self-Service Agent (internal)
Centralized agent for HR, IT, and facilities: leave management, profile updates, device replacement, visitor registration, support tickets. Expects 400K-600K interactions/year. Target: 44% reduction in monthly HR tickets by mid-2026. 50K hours/year saved on visitor registration alone. GA for all M365 Copilot customers. Source: [Microsoft Inside Track](https://www.microsoft.com/insidetrack/blog/accelerating-employee-services-at-microsoft-with-the-employee-self-service-agent/) [practitioner direct — internal deployment]

### Moveworks / ServiceNow — AI employee service agent
Autonomously resolves HR, IT, facilities requests across systems. 5.5M+ employees across customers. ServiceNow acquired Moveworks (Dec 2025). Inside ServiceNow: 90% IT, 89% CS requests resolved autonomously. Nearly 90% of customers deployed to entire workforce — unusual for AI tools. Source: [Moveworks/ServiceNow](https://www.moveworks.com/us/en/company/news/press-releases/servicenow-completes-acquisition-of-moveworks) [vendor announcement]

### Paradox AI (Olivia) — Autonomous hiring agent
Autonomous multi-step recruitment at McDonald's and high-volume employers: screens applicants → schedules interviews → handles rescheduling → follows up → coordinates across hiring managers. 90%+ screening/scheduling automated. McDonald's cut hiring time in half. 75%+ time-to-hire reductions. Source: [Paradox](https://www.paradox.ai/) [vendor]

### CCEP / Eightfold — Talent intelligence platform
AI Career Hub for 30K+ employees. Maps skills, identifies gaps, suggests career paths, facilitates internal moves. Talent profile completion: 2% to 80%. 68% adoption rate, 16-point increase in growth perception, 11% rise in internal mobility, 2% reduction in voluntary attrition. Source: [Eightfold](https://eightfold.ai/blog/ccep-global-talent-transformation/) [vendor case study]

### Unilever — AI recruitment + Unabot onboarding
Recruitment: 250K resumes screened via Pymetrics + HireVue. Saved GBP 1M/year and 50K hours. **BUT:** increasingly controversial under EU AI Act (high-risk employment AI). Unabot assistant for onboarding is the more transferable pattern. Source: [Bernard Marr](https://bernardmarr.com/the-amazing-ways-how-unilever-uses-artificial-intelligence-to-recruit-train-thousands-of-employees/) [domain trade]

### Siemens — Watson HR/IT virtual assistant
55% of employee questions resolved without human intervention. 40% reduction in support tickets, 30% satisfaction uplift. 300K+ employee company. Pattern: start with FAQ, expand to multi-step. Source: [Cubeo.ai](https://www.cubeo.ai/10-use-cases-of-ai-in-hr-with-real-world-case-studies/) [secondary source]

### Coca-Cola Vietnam / Leena AI — HR autonomous service agent
"AskMi" agent: creates accounts across multiple systems during onboarding, initiates background checks, processes requests/approvals. 60% time saved on employee requests, 50% decrease in time-to-information, 34% ticket reduction in first year. Source: [Leena AI](https://leena.ai/cocacola-hr-digital-transformation) [vendor case study]

## Level 1 (Context Only)

### Platform vendors building chasm-crossing infrastructure
- **Workday Illuminate:** Recruiter Agent (54% capacity increase in early adopters), Onboarding Agent, Performance Agent, Workforce Planning Agent. Agent System of Record (ASOR) manages AI agents as "digital employees." Low-code AgentBuilder. **Workday acquired Sana for $1.1B (March 2026)** — 7 new agents. Source: [Workday](https://www.prnewswire.com/news-releases/workday-illuminate-expands-with-new-ai-agents-for-hr-finance-and-industry-302557725.html), [Josh Bersin](https://joshbersin.com/2026/03/workday-and-sana-unveil-a-bold-new-strategy-for-ai/) — BUT no customer case studies in Bersin's analysis.
- **SAP SuccessFactors / Joule:** Performance and Goals Agent (GA Nov 2025), HR Service Agent, Payroll Agent, Career/Talent Agent (GA May 2026). Source: [SAP blog](https://community.sap.com/t5/human-capital-management-blog-posts-by-sap/what-s-new-with-sap-business-ai-joule-and-joule-agents-in-the-sap/ba-p/14257508) [vendor]
- **Personio (European SME):** AI assistant for employees and HR teams. GA 2025 for Q&A, autonomous actions planned later. 12K+ customers, $8.5B valuation. Source: [Personio](https://www.personio.com/whats-new-q4-25/) [vendor]

### Klarna vs IKEA — The Nordic contrast case
- **Klarna:** Replaced ~700 CS agents with AI, cut workforce 5,500 to 3,400. Then reversed in 2025 when quality dropped. CEO admitted "it went too far." Source: [Fast Company](https://www.fastcompany.com/91468582/klarna-tried-to-replace-its-workforce-with-ai) [general press]
- **IKEA:** Deployed AI through ServiceNow + Workday platforms. Reskilled 8,500 employees displaced by AI, generating $1.4B additional revenue. "DIY for the internal organization." Source: [ServiceNow Knowledge 2025](https://www.servicenow.com/events/knowledge/2025/sessions/how-service-management-and-operations-at-inter-ikea-is-using-ai-to-bring-diy-for-the-internal-organization.html) [conference presentation]
- The contrast: Klarna = replace, IKEA = reskill. IKEA's approach resonates with Nordic consensus culture.

### Nordea — Internal chatbot, not yet agentic
Scaled from 3K to 10K users. Part of 12-chatbot "chat-first" strategy. Boost.ai NLU. Customer-facing: 91-95% resolution. Internal HR-specific details limited. Source: [Hyperight](https://hyperight.com/banking-on-ai-nordea-poc-to-10000-users/) [conference talk]

### EU AI Act — High-risk classification for all HR AI
All AI used in recruitment or HR decision-making is "high-risk" under EU AI Act. Requirements: risk management, data governance, human oversight, bias testing, CE marking, EU database registration. Penalties from 2027: up to EUR 35M or 7% global turnover. Emotion recognition in workplaces banned. This creates a compliance moat favoring structured platform deployments (Workday, SAP) over homebrew solutions. Source: [Hunton](https://www.hunton.com/insights/legal/the-impact-of-the-eu-ai-act-on-human-resources-activities) [domain trade — legal analysis]

### Deutsche Telekom — AI Growth Hub
AI platform bundling recruiting, skill management, talent management, resource management. Goal: convert all central HR processes to Growth Hubs by end 2025. Source: [Telekom CR Report](https://report.telekom.com/cr-report/2024/social/employee-development.html) [corporate report]

### Johnson Controls — AI HR assistant, 100K employees (April 2026 update)
Deployed "Omni" (Moveworks platform) in Microsoft Teams integrated with Workday. Deployed for 100K+ global employees. Cut HR call volume by 30-40%. Handles routine inquiries about onboarding, policy, payroll. **SOURCE CAVEAT:** The 30-40% metric appears in secondary HR process guides (Assembly Industries, Apr 2026), not independently verified. Original source is a Moveworks vendor case study on their blog — featuring Johnson Controls CHRO Marlon Sullivan in a webinar format (Deloitte-Moveworks co-produced). The call volume reduction metric lacks a defined baseline measurement. **Evidence level: Level 2, partially vendor-sourced.** ([Moveworks case study](https://www.moveworks.com/us/en/resources/blog/johnson-controls-reshaped-hr-with-ai) — vendor; corroborated by [Assembly Industries blog](https://assembly-industries.com/feeds/blog/automating-repetitive-hr-tasks-scale) — secondary, Apr 2026)

### Josh Bersin — HR 2030 Agentic HR Vision (April 6, 2026)
Leading HR analyst published "Introducing HR 2030: A Vision For Agentic Human Resources." Key framing: Systemic HR + AI Agent Cloud. Claims tech companies (Microsoft, Roblox, Google, Mastercard, ServiceNow) moving quickly; "most other industries are still struggling." 30-40% smaller HR teams predicted by 2030 (no source cited for this stat). Managers will interact with "AI Agent Cloud" for hiring, pay, promotion, hourly scheduling, training. Key challenge: coexisting with billions invested in transactional systems of record. **Evidence assessment: Level 1 (opinion/vision). No named deployment evidence or measurable results.** Bersin is signaling market direction, not reporting current deployment reality. ([Josh Bersin](https://joshbersin.com/2026/04/introducing-hr-2030-a-vision-for-agentic-human-resources/) — [practitioner analysis/opinion], Apr 6, 2026)

## Cycle 100 Gap Confirmation (April 15, 2026)

**Focused search for HR practitioners publishing about autonomous multi-step agent deployments returned zero qualifying results.** Search methodology: targeted queries for HR directors, CHROs, HR ops leaders who published first-person accounts of autonomous agent workflows (not chatbots, not "AI in HR" broadly). Sources checked: LinkedIn practitioner posts, Lenny's Newsletter archives, Every.to, HRWINS, HRZone, Josh Bersin's blog, Asanify digest.

**What was found instead:**
- Vendor-produced guides and "top 10 HR agents" roundups (Level 0 — not evidence)
- Josh Bersin's "HR 2030" vision post (Level 1 opinion, no named deployments — already in KB)
- CHRO Association 2026 survey: 91% rank AI as top concern, 42% say teams not ready (Level 0 — survey, no deployment data)
- Asanify digest (Apr 14): "agentic HR workflows" framing, all content vendor-sourced
- MindStudio unnamed "200-person company" onboarding agent (vendor case study, no named company or practitioner — Level 0)

**Confirmed gap (cycle 100):** 95+ research cycles, zero named non-vendor HR practitioners documenting autonomous agent deployments with their own names attached. This is now a strong negative signal, not a research gap. HR remains structurally the weakest domain for independent practitioner publishing — a combination of: (1) EU AI Act high-risk classification creating legal caution, (2) HR as a function being less likely to publish technical work publicly, (3) actual deployment immaturity.

**What "agentic HR" actually means in practice (2026):** Employee service agents (Moveworks/ServiceNow tier — multi-step but pre-configured, not autonomous in the general sense), recruitment scheduling automation (Paradox/Olivia tier — high-volume, narrow), and benefits/policy Q&A chatbots. No evidence of CHRO or HR director building a general-purpose autonomous agent for HR workflows from scratch.

## Counter-Evidence

- **HR is the weakest agentic domain.** March 2026 incremental research found "no truly agentic HR deployments anywhere."
- **AI hiring bias is measured and real.** Stanford: AI systematically favored older males. Hybrid models produce 45% fewer biased decisions than AI-only.
- **EU AI Act creates a hard deadline.** August 2, 2026 — all high-risk HR AI must comply. This blocks fast-and-loose deployments.
- **Klarna's reversal** is the most visible Nordic failure case — demonstrates that wholesale human replacement doesn't work.
- **Nordic companies are consumers, not builders** of HR agents. No Nordic HR agent startups found.

## Named Practitioners

- **Microsoft** — Internal "customer zero" deployment, strongest evidence of genuine agentic HR at scale
- **Paradox AI** — Furthest past the chasm for high-volume hiring automation
- **CCEP / Eightfold** — Best evidence of measurable talent mobility outcomes
- **IKEA** — Nordic exemplar for reskilling approach (vs. Klarna's replacement approach)

## Nordic Signal

**Weak to moderate.** Nordea has strong internal chatbot but not truly agentic. IKEA's ServiceNow deployment is the strongest Nordic HR signal — but it's a platform deployment, not a custom build. Klarna's reversal is the cautionary tale. No Nordic HR agent startups found. The Nordics' competitive advantage is in governance and employee-centric deployment philosophy, not in building the technology. The EU AI Act high-risk classification creates August 2026 deadline that especially affects Nordic companies with strong compliance culture.

## What We Did Not Find

1. **No truly agentic HR deployment anywhere** — the weakest domain globally, not just Nordic
2. **No Nordic HR agent startups** — the Nordics are platform consumers in this domain
3. **No autonomous performance management agents in production** — roadmap only (Workday, SAP)
4. **No Nordic evidence of AI-powered internal mobility** comparable to CCEP/Eightfold
5. **No evidence of EU AI Act compliance tools specifically for HR AI** — the gap between regulation and tooling
