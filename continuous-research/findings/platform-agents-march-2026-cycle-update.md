# Platform Agents — March 2026 Cycle Update

*Cycle update building on platform-agents-march-2026.md. Research date: March 23, 2026.*

---

## Summary of New Signals Since Last Cycle

**Three significant developments found:**
1. **Claude Cowork — practitioner reviews now exist.** Previous assessment "zero practitioner reviews after 4 weeks" is outdated. Hackceleration 6-week test, comparative review, and security practitioner review all published.
2. **Microsoft D365 Release Wave 1 — details published March 18.** GA from April 1, 2026. Agent Mode in Word/Excel/PowerPoint. MCP integration in finance/operations.
3. **Salesforce Agentforce — Adecco Group unlimited deployment.** First "unlimited Agentforce license" deal. Adecco aims 50% of revenue driven by agents by end of 2026.

**One persistent gap narrowing:**
- A2A v0.3 released with Google Cloud tooling and AI Agent Marketplace. Still no independent enterprise deployment evidence, but infrastructure maturing.

---

## Platform Updates

### 1. Claude Cowork — ASSESSMENT CHANGED: Practitioner Reviews Now Exist

**Previous assessment:** "Zero practitioner reviews found after 4 weeks" (as of March 23).

**Updated assessment:** Multiple practitioner reviews now published. Previous "zero reviews" finding is outdated.

#### Hackceleration — 6-Week Production Test
- Tested on real projects: autonomous file organization, spreadsheet generation, Google Workspace integration, multi-step task execution
- **Result:** 6-8 hours saved weekly. "Largely delivers on the promise" of genuinely autonomous AI assistant
- Praised depth of integrations and ability to delegate complex multi-step tasks
- **Recommendation:** "Without hesitation" for teams needing real automation
- Source: https://hackceleration.com/claude-cowork-review/ [domain trade publication]
- Evidence level: Level 2 (single detailed test, but with specific measurable outcomes)

#### Comparative Review (AI Blew My Mind)
- Side-by-side: Perplexity Computer vs Claude Code vs Cowork vs Manus
- **Result:** Cowork ranked "distant second" behind Perplexity Computer — "competent in structure but lacking deep intelligence and verification"
- Better design output than Perplexity Computer and Manus
- Source: https://aiblewmymind.substack.com/p/perplexity-computer-vs-claude-code-cowork-manus-comparison [practitioner analysis]
- Evidence level: Level 2 (comparative test)

#### Security Practitioner Review (Harmonic Security)
- **Critical finding:** Cowork access cannot be limited by user or role during research preview — organization-wide only
- Known supply chain CVEs: CVE-2025-59536, CVE-2026-21852
- **Cowork activity NOT captured in Audit Logs, Compliance API, or Data Exports**
- Anthropic advises not to use for regulated workloads
- Source: https://www.harmonic.security/resources/securing-claude-cowork-a-security-practitioners-guide [practitioner analysis — security focused]
- Evidence level: Level 2 (specific security assessment with named CVEs)

#### Enterprise Partnerships
- **Deloitte:** Deploy Claude to 470,000+ employees globally. 15,000 already certified on Anthropic models.
- **PwC:** Collaboration on Cowork plugins within compliant governance frameworks (announced Feb 24).
- Source: Various — Level 0-1 (partnership announcements, no deployment outcomes)

#### February Update — Plugin Categories
Anthropic built 10 new plugin categories with domain practitioners: HR (offer letters, onboarding, performance reviews), design, engineering. Addressed three enterprise friction points: non-technical deployment, plugin access control, job-specific tools.

**Updated assessment:** Cowork moves from "zero evidence" to **Level 1-2** (multiple reviews exist, one with measurable outcomes, but still early days for enterprise deployment). The security gaps (no audit logging, no role-based access, known CVEs) are significant for enterprise buyers.

**Finding category:** Context → early Production Agentic signals emerging.

---

### 2. Microsoft D365 Release Wave 1 — GA April 1, 2026

**Previous assessment:** "Release Wave 1 shipping April 2026."

**Updated assessment:** Full details published March 18, 2026. Broader than expected — agentic AI across all D365 modules.

#### Key Agentic Features:
- **Agent Mode in Office:** Word, Excel, PowerPoint — iterative workflow, not single-prompt. Agent makes edits, adjusts structure, refines while human stays in control
- **D365 Sales Agent:** Auto-generates structured opportunity summaries combining CRM + email + meeting + collaboration signals. Surfaces next steps, risks, blockers
- **D365 Customer Service Shadow Mode:** AI-generated insights with predicted responses WITHOUT sending customer-facing communication. Evaluation mode before full deployment
- **D365 Business Central:** AI-powered agents automate sales and purchase scenarios
- **MCP integration:** Finance and operations cross-app capabilities include "improvements to Model Context Protocol servers" — first major enterprise platform explicitly integrating MCP
- **Role-based Copilot agents:** Finance agents as "daily command center" with finance data-grounded insights in Copilot chat

#### Rollout:
- No Early Access stage — straight to GA from April 1, 2026
- UK deployment: April 3-6, 2026
- Moving to "lighter, more frequent" updates (away from bi-annual launches)

- Source: https://www.microsoft.com/en-us/dynamics-365/blog/business-leader/2026/03/18/2026-release-wave-1-plans-for-microsoft-dynamics-365-microsoft-power-platform-and-copilot-studio-offerings/ [vendor blog — Level 0 for claims, factual for product roadmap]
- Source: https://learn.microsoft.com/en-us/dynamics365/release-plan/2026wave1/ [vendor documentation]
- Source: https://www.strategy365.co.uk/dynamics-365-power-platform-copilot-2026-release-wave-1-overview/ [domain trade publication]

**Evidence level:** Level 0 (vendor announcement). No practitioner deployment results yet — features ship April 1.

**Significance:** The MCP integration in D365 finance/operations is notable — this is the first signal of MCP moving beyond coding tools into enterprise business processes. Watch for practitioner adoption stories in April-May.

**Finding category:** Platform Announcement.

---

### 3. Salesforce Agentforce — Adecco Unlimited Deal + Spring '26 Release

**Previous assessment:** "18,500 customers, real but polarizing."

**New evidence:**

#### Adecco Group — Unlimited Agentforce License (March 12, 2026)
- Multi-year agreement through 2027 for unlimited global access to Agentforce 360
- Already deployed in UK recruitment process: "AI agents deployed in key elements of the recruitment process to free up time for quality human-human interaction"
- **Target:** 50% of revenue driven by agents by end of 2026
- Source: https://www.salesforce.com/news/linked-content/the-adecco-group-to-scale-agentic-ai-at-speed-with-unlimited-agentforce-license-agreement/ [vendor press release — Level 0]
- Evidence level: Level 0-1 (vendor announcement with unverified targets, but Adecco is a named customer with stated deployment)
- **Nordic relevance:** Adecco operates across the Nordics. This is a Nordic-available platform deployment in HR/recruitment.

#### Salesforce 2026 Connectivity Report
- Organizations currently use **average of 12 agents**
- **83% of organizations** report most/all teams have adopted AI agents
- **50% of agents operate in isolated silos** — disconnected workflows, redundant automations, shadow AI risk
- Source: https://www.salesforce.com/news/stories/connectivity-report-announcement-2026/ [vendor report — Level 0]
- **Caveat:** This is Salesforce's own survey of its customers. Self-selection bias. The "83% adoption" claim contradicts most independent research (Mollick: "remarkably little has changed").

#### Spring '26 Release — Agentforce 360
- Agentforce Builder (faster agent development)
- Agent Script (greater control of agent behavior)
- Agentforce Voice (natural conversations)
- Intelligent Context (ground agents in unstructured data)
- Agentforce Nonprofit (fundraising, volunteer coordination, donor support)
- Open for ISVs to build and commercially distribute agents
- Source: https://www.salesforce.com/news/stories/spring-2026-product-release-announcement/ [vendor press release — Level 0]

**Updated assessment:** Agentforce continues to be the most deployed enterprise agent platform. The Adecco deal is notable as first "unlimited" license — signals Salesforce's confidence and Adecco's commitment. But measurable deployment outcomes remain thin outside Finnair, Reddit, OpenTable examples from earlier cycle.

---

### 4. Google Agent Builder — Governance and Observability Focus

**Previous assessment:** "PwC 120+ agents claimed, no details on outcomes."

**New evidence:**

#### Enhanced Tool Governance (March 2026)
- Cloud API Registry integration for managing available tools across organization
- Agent identity (Preview) using IAM for security and access management
- Agent Engine Threat Detection (Preview) via Security Command Center
- Private VPC deployment for data privacy and compliance
- Source: https://cloud.google.com/blog/products/ai-machine-learning/new-enhanced-tool-governance-in-vertex-ai-agent-builder [vendor blog — Level 0]

#### Observability Dashboard
- Token usage, latency, error rate tracking within Agent Engine runtime
- Single-command deployment to production via ADK
- Source: https://www.infoworld.com/article/4085736/google-boosts-vertex-ai-agent-builder-with-new-observability-and-deployment-tools.html [domain trade publication]

#### Pricing GA
- Sessions, Memory Bank, Code Execution now GA with pricing (Feb 11, 2026)
- Gemini 3.1 Pro available in preview

**Updated assessment:** Google is investing heavily in governance/security infrastructure (IAM, VPC, threat detection) — the right play for enterprise. But still **zero independent customer deployment stories with measurable outcomes**. The PwC "120+ agents" claim remains unverified. Google is building the platform; we need to see who's using it.

**Evidence level:** Level 0 (vendor announcements).

---

### 5. A2A Protocol — v0.3 Released, Still Zero Deployments

**Previous assessment:** "150+ organizations, zero production deployment evidence."

**New evidence:**

#### v0.3 Release + AI Agent Marketplace
- Google announced v0.3 with "more stable interface critical to accelerating enterprise adoption"
- AI Agent Marketplace: partners can sell A2A agents to Google Cloud customers
- Source: https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade [vendor blog — Level 0]

#### Named Partners Committing
- **Salesforce:** Extending Agentforce to orchestrate via A2A
- **ServiceNow:** AI Agent Fabric as multi-agent communication layer
- **Adobe:** Making distributed agents interoperable via A2A
- **S&P Global:** Adopted A2A for inter-agent communication
- Source: Various vendor announcements — Level 0

#### ACP (Agent Communication Protocol) — New Competitor
- Three major protocols now: MCP (agent-to-tool), A2A (agent coordination), ACP (lightweight messaging)
- Organizations combining MCP + A2A for comprehensive coverage
- Source: https://www.ruh.ai/blogs/ai-agent-protocols-2026-complete-guide [domain trade publication]

**Updated assessment:** A2A infrastructure is maturing (v0.3, marketplace, major vendors committing). But the gap persists: **still zero independent evidence of A2A being used in production between real enterprise agents.** Institutional backing continues to outpace deployment. The S&P Global "adoption" claim is the closest to a specific deployment but lacks details.

**Evidence level:** Level 0 (vendor ecosystem announcements).

---

## What We Did Not Find

1. **No independent Agentforce deployment stories with measurable outcomes beyond those already tracked** (Finnair, Reddit, OpenTable). Adecco is new but results are aspirational ("50% of revenue by end 2026"), not demonstrated.

2. **No Google Agent Builder customer deployment stories with specifics.** PwC "120+ agents" still unverified. No named customer with measurable outcomes.

3. **No A2A production deployment evidence.** Protocol maturing, deployments absent.

4. **No MCP enterprise business process deployments.** The D365 MCP integration is the first business-process signal — watch for April adoption.

5. **No Oracle Fusion practitioner evidence.** Oracle remains the most announcement-heavy, evidence-free platform.

---

## Platform Assessment Update (March 2026 Cycle)

| Platform | Previous | Current | Direction |
|----------|----------|---------|-----------|
| Claude Cowork | Zero reviews | Multiple reviews (6-8hr/week savings, security gaps noted) | ↑↑ Significant |
| Microsoft D365 | "Release Wave 1 shipping April" | Full details published. MCP integration. GA April 1. | ↑ Imminent |
| Salesforce Agentforce | 18,500 customers, real but polarizing | Adecco unlimited deal. Spring '26 release. Still polarizing. | ↑ Moderate |
| Google Agent Builder | PwC 120+ agents, no details | Governance/observability tools shipping. Still no customer evidence. | → Stable |
| A2A Protocol | 150+ orgs, zero deployments | v0.3, marketplace, major vendor commitments. Still zero deployments. | → Infrastructure up, adoption flat |
| SAP Joule | Early GA, no evidence | No new evidence found this cycle | → Unchanged |
| ServiceNow | Autonomous Workforce launched | No new deployment evidence this cycle | → Unchanged |
| Workday/Sana | Launched March 2026 | No customer adoption evidence yet | → Too early |
