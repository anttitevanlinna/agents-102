# Source Counts — Batch 1 (Domain Findings Audit)

*Audit date: 2026-02-22*
*Standard: "Agent" = multi-step autonomous work with tool use and decision-making. Chatbot answering questions is NOT an agent. Vendor announcing features is NOT a deployment.*

---

### Finance & Accounting (finance-accounting.md)

- Total findings: 14 (13 company entries + 1 market context section with 8 stats)
- Truly agentic (passes gate): 5
- Vendor fluff: 4
- Chatbot/copilot misclassified: 0
- Market stats / context only: 3 company entries + market context section

**Truly agentic (multi-step autonomous work in production):**
1. **Goldman Sachs** — Agents autonomously review documents, extract entities, assess ownership structures, trigger compliance checks for trade accounting. Anthropic engineers embedded 6 months. $2.5T AUS. Legit multi-step.
2. **HPE "Alfred"** — Transactional finance agent handling AP, AR, payroll, audit, procurement. 40% cycle time cut, 90% manual effort removed. Named customer, real metrics.
3. **Microsoft D365 Account Reconciliation Agent** — Automates matching, identifies exceptions, proposes adjustments. Lifetime Products: 60% month-end cycle time cut. Named non-tech customer with measured results.
4. **HighRadius** — 90% touchless cash application via 11 AI agents. Autonomous payment matching, exception handling, deduction classification. 2,700+ implementations. Genuinely autonomous.
5. **KPMG Workbench** — 50 agents live, multi-agent audit platform. Journal-entry anomaly detection, workpaper drafting, expense vouching. ISO 42001 certified. Production deployment at scale.

**Vendor fluff (vendor announcements, vendor case studies without independent verification, or product GA announcements without deployment evidence):**
1. **SAP Joule** — Product announcement. "Claimed 70% time savings" with no named customer deploying it. ERP vendor shipping features. Zero independent evidence of results.
2. **Basware InvoiceAI** — Product launch. "Claims 200+ hours saved" but no named customer. Forrester/Gartner recognition is analyst, not deployment evidence. Vendor marketing dressed as finding.
3. **Deloitte Zora AI** — Platform announcement. Only named customer is HPE (already counted). "Targets: reduce costs 25%, increase productivity 40%" are aspirational vendor projections.
4. **Trullion "Trulli"** — Product launch. No named customer deploying it. "Purpose-built for accounting" is a product description, not a deployment finding.

**Context / not agentic:**
1. **JPMorgan Chase** — COiN is document processing (extract + classify), not agentic. The 360K hours and $1.5B claims come from a secondary blog (digitaldefynd.com), not primary source. File itself flags this. Mix of RPA, document processing, and broad AI strategy — not a single agentic deployment.
2. **Klarna** — Counted here as partial (customer service agent, not finance agent). The finance/accounting relevance is workforce restructuring and cost savings, not a finance process agent.
3. **Nordea** — "Platform deployed, now what" — no confirmed finance agents. Infrastructure stage only.
4. **Visma** — CTO strategic intent. "Specific agent deployments not yet publicly disclosed." Zero evidence of anything agentic.

---

### Compliance & Legal (compliance-legal.md)

- Total findings: 9
- Truly agentic (passes gate): 5
- Vendor fluff: 1
- Chatbot/copilot misclassified: 0
- Context / infrastructure only: 3

**Truly agentic (multi-step autonomous work in production):**
1. **Harvey AI (CMS + HSBC)** — Autonomously reviews contracts, extracts clauses, flags risks, compares against playbooks. CMS: 7,000+ lawyers, 118 hours saved per lawyer/year. HSBC: global rollout. Two independent enterprise deployments. Strong.
2. **Luminance** — Multi-agent architecture with institutional memory. Compliance module auto-identifies workflows, runs checks against policies + regulations + sanctions. 1,000+ enterprises, revenue doubled twice. Genuine multi-step.
3. **CUBE + 4CRisk** — Agents scan 2,500+ regulatory sources, detect changes, create rulebooks, map obligations to controls. 1,000+ customers. "50x faster" is vendor-ish but the regulatory scanning is genuinely autonomous multi-step work.
4. **Delve** — Agents authenticate into enterprise systems (AWS, GitHub, Slack), take screenshots, capture compliance artifacts, write reports. $32M Series A. Most genuinely agentic finding in the file — the agent navigates real systems autonomously.
5. **Legora (formerly Leya)** — Contract review, legal research, document drafting, compliance checking across public + firm-specific data. $1.8B valuation, 400+ organizations, named Nordic law firm partnerships (Magnusson, Mannheimer Swartling). Production at scale.

**Vendor fluff:**
1. **Ironclad** — Multi-agent architecture described, but "early access announced Nov 2025" — not production. Product announcement positioned as finding. The architecture is interesting but it is a roadmap, not a deployment.

**Context / not clearly agentic / infrastructure stage:**
1. **Leah (ContractPodAI)** — Rebrand + product announcement. "AgenticOS" label but no named customer with measured results. Gartner/IDC recognition is analyst validation, not deployment evidence. Borderline vendor fluff.
2. **Sana Labs** — "Am Law Global 200 firms" but no named firm or measured outcome. No-code agent platform. The product exists but no specific deployment with results is documented. Thin evidence.
3. **Nordic Banks (NKYC)** — Joint KYC infrastructure. "Specific agentic capabilities not yet publicly detailed." File itself rates chasm signal as "weak-to-moderate." Infrastructure without confirmed agentic work.

---

### Customer Service (customer-service.md)

- Total findings: 17 (15 company entries + 2 platform entries that also appear as separate findings)
- Truly agentic (passes gate): 8
- Vendor fluff: 3
- Chatbot/copilot misclassified: 5
- Context only: 1

**Truly agentic (multi-step autonomous work in production):**
1. **Klarna** — Handles 2/3 of chats, processes refunds, manages returns. Genuine transactional authority. The reversal makes the story richer, not weaker. Multi-step, action-taking, production.
2. **Gjensidige (Eva/Sofie/Frank)** — Three-agent system: customer claims, internal coordination, external partner management. Multi-agent orchestration across organizational boundaries. Strongest Nordic agentic finding.
3. **SoFi / Sierra** — Agent resolves login issues, processes cancellations, handles transfers. 61% containment, 50K conversations/week. Takes real actions on financial accounts.
4. **SeatGeek / Zendesk** — Pulls order history, confirms payment, resends tickets, updates preferences. 51.5% auto-resolution, 57K queries autonomous in peak. End-to-end resolution with system actions.
5. **Hertz / Decagon** — Verifies identity, processes payments, escalates with context. 10% to 70% resolution in 6 weeks. Multi-step with real transaction authority.
6. **WeightWatchers / Sierra** — 70% of sessions, 4.6/5 satisfaction. Manages memberships, helps with meal choices. Action-taking, not just Q&A.
7. **Reddit / Agentforce** — 46% case deflection, 84% resolution time cut. Handles complex tasks with on-demand help. Salesforce deployment with action authority.
8. **Intercom Fin** — 66% resolution across 6K customers. Anthropic uses it (50.8% resolution, 1,700 hours saved). Fin takes actions, not just answers.

**Vendor fluff (platform vendor announcements positioned as findings):**
1. **Salesforce Agentforce (platform entry)** — 12K customers, $100M savings reported by Salesforce about itself. "Customer Zero" is vendor self-promotion. The Reddit deployment is the real finding; the platform entry is marketing.
2. **Zendesk Resolution Platform** — "Claims can solve 80% of support issues." Product announcement. "Fully autonomous phone support agents reaching GA in early 2026" is a roadmap item. SeatGeek is the real finding; the platform entry is marketing.
3. **Sierra (platform entry)** — $10B valuation, founder pedigree, outcome-based pricing. This is a company profile, not a deployment finding. SoFi and WeightWatchers are the real findings.

**Chatbot/copilot misclassified (called "agent" but primarily Q&A, routing, or information delivery):**
1. **Nordea Nova** — 12 chatbots, 220K conversations/month, 91% resolution. File correctly flags: "Not confirmed to execute autonomous transactions." Conversational routing, not agent.
2. **DNB Aino** — 50%+ chat automation. File flags: "autonomous actions not confirmed." Chatbot.
3. **Telia** — 30% chat deflection. File flags: "not confirmed as action-taking agent." Chatbot with upselling capability.
4. **NAV Frida** — 270K inquiries, "answered" questions. Government Q&A bot. File acknowledges: "primarily informational/routing rather than transactional."
5. **Kommune-Kari** — 500K conversations. "Answers citizen inquiries." Q&A bot across municipalities.

**Credit to the file authors:** All five chatbots are explicitly labeled as "Classification: Chatbot/conversational AI" in the file. The file is honest about this. They are included as market context, not misclassified as agents.

---

### HR & People Operations (hr-people-ops.md)

- Total findings: 16 (15 company/entity entries + 1 regulatory framework entry)
- Truly agentic (passes gate): 6
- Vendor fluff: 3
- Chatbot/copilot misclassified: 2
- Context / regulatory / not agentic: 5

**Truly agentic (multi-step autonomous work in production):**
1. **Microsoft Employee Self-Service Agent** — Handles leave management, profile updates, device replacement, visitor registration across HR/IT/facilities backends. 400-600K interactions/year target. Deployed internally before GA. Multi-system, multi-step.
2. **Paradox AI "Olivia" (McDonald's)** — Screens applicants, schedules interviews, handles rescheduling, follows up with candidates. 90%+ screening/scheduling automated. Hiring time halved. Genuinely autonomous hiring workflow.
3. **Moveworks / ServiceNow** — Autonomously resolves employee HR/IT/facilities requests across systems. 90% IT resolution, 89% customer support resolution inside ServiceNow. 5.5M+ employees across customers. Multi-step with system actions.
4. **Coca-Cola Vietnam / Leena AI** — Creates accounts across multiple systems during onboarding, initiates background checks, processes approvals. 60% time saved, 34% ticket reduction. Multi-step cross-system actions.
5. **CCEP / Eightfold AI** — Maps skills, identifies gaps, suggests career paths, facilitates internal moves for 30,000+ employees. 2% to 80% talent profile completion, 11% internal mobility rise. Autonomous talent intelligence at scale.
6. **IKEA / ServiceNow** — Streamlined onboarding, HR/IT support, digital self-service workflows. Reskilled 8,500 employees, $1.4B additional revenue. Platform-delivered but multi-step. Borderline — the "DIY internal operations" framing suggests self-service rather than agent autonomy, but the onboarding workflows qualify.

**Vendor fluff:**
1. **Workday Illuminate** — Suite of agents "embedded in Workday HCM." "Recruiter capacity up 54% in early adopters" is the only metric, from a press release. AgentBuilder, ASOR — all product announcements. No named customer with independent results.
2. **SAP SuccessFactors Joule** — Five agents described. Performance Agent is GA, others planned for 2026. No named customer deploying these. SAP blog + Josh Bersin analysis = vendor + analyst, not evidence.
3. **Deutsche Telekom Growth Hub** — "Goal: convert all central HR processes to Growth Hubs by end of 2025." Corporate responsibility report aspiration. No confirmed results or deployment evidence.

**Chatbot/copilot misclassified:**
1. **Nordea internal chatbot** — Scaled from 3K to 10K users. Boost.ai-powered FAQ + routing. File acknowledges: "primarily FAQ/knowledge chatbots, not yet fully autonomous multi-step agents."
2. **Personio AI Assistant** — "Answers questions, does not yet take multi-step actions." File correctly classifies as "pre-chasm for agentic, post-chasm for assistant." This is a chatbot by our definition.

**Context / not agentic:**
1. **Unilever recruitment AI** — Pymetrics games + HireVue video analysis is ML scoring, not agentic. "AI scoring" is a classifier, not a multi-step autonomous agent. Unabot is a Q&A assistant. Neither qualifies.
2. **Siemens / Watson** — "Resolves 55% of employee questions without human intervention." This is a knowledge-base Q&A system. Multi-step described as: understand query, search KB, provide answer, escalate. That is standard chatbot architecture, not agentic.
3. **Klarna** — Duplicate from customer service domain. Counted here for HR/workforce transformation angle, but the finding is the same. File acknowledges overlap.
4. **EU AI Act** — Regulatory framework, not a deployment. Correctly included as context.

---

## Summary Table

| Domain | Total | Truly Agentic | Vendor Fluff | Chatbot/Copilot | Context/Other |
|--------|-------|---------------|--------------|-----------------|---------------|
| Finance & Accounting | 14 | 5 | 4 | 0 | 5 |
| Compliance & Legal | 9 | 5 | 1 | 0 | 3 |
| Customer Service | 17 | 8 | 3 | 5 | 1 |
| HR & People Ops | 16 | 6 | 3 | 2 | 5 |
| **TOTAL** | **56** | **24** | **11** | **7** | **14** |

## Verdict

**24 out of 56 entries (43%) pass the agentic gate.** The rest are vendor announcements, chatbots, market context, infrastructure plays, or regulatory frameworks.

**Compliance & Legal is the cleanest file** — highest signal-to-noise ratio (5/9 = 56% pass rate), fewest vendor announcements.

**Customer Service has the most genuine agents** (8) but also the most chatbot inflation (5). Credit: the file explicitly labels all chatbots as such.

**Finance & Accounting has the most vendor fluff** (4 out of 14) — SAP, Basware, Deloitte, and Trullion are product announcements without independent deployment evidence.

**HR & People Ops is mixed** — 6 genuine agents, but Workday/SAP/Deutsche Telekom entries are vendor roadmaps, and Siemens/Unilever are legacy ML/chatbot systems mislabeled as modern agentic deployments.

**Cross-file duplicates:** Klarna appears in 3 of 4 files (finance, customer service, HR). Nordea appears in 3 files. These should be primary in one file only, with cross-references elsewhere.
