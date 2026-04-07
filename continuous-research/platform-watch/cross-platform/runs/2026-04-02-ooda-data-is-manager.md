# OODA Cycle: "Data Is the Manager" — Trajectory-Based Management of AI-Augmented Organizations

**Date:** 2026-04-02
**Research question:** Is anyone building the "flight director dashboard" for AI-augmented organizations — where management's job is monitoring trajectory and intervening on divergence, rather than reviewing output and approving work?
**Searches conducted:** 14 web searches across agent observability, organizational management, trajectory monitoring, flight director metaphors, agent fleet management, counter-evidence on agent sprawl

---

## ORIENT: What the Landscape Actually Looks Like

The core question asks about a specific management paradigm shift: from **review-and-approve** to **monitor-and-intervene**. The real answer is that the field is converging on this direction from three separate angles, but nobody has built the unified "flight director dashboard" yet. What exists is a patchwork of technical monitoring tools, emerging organizational roles, and academic frameworks — all pointing at the same destination without anyone having arrived.

The maturity gradient runs roughly:

1. **Technical agent observability** — mature and commercializing fast (Fiddler, Arize, Datadog, LangSmith)
2. **Organizational role emergence** — early but real (Salesforce's "agent manager" role, McKinsey's "M-shaped supervisor")
3. **Unified trajectory-based management** — aspirational, articulated in frameworks but not yet implemented as a coherent practice

---

## FINDINGS

### Finding 1: Salesforce's "Agent Manager" Role — The Closest Thing to a Flight Director

**What:** Zach Stauber, a support agent manager at Salesforce, manages a fleet of AI agents on Agentforce. His daily routine: "Data, Data, Data. I start and end my day in dashboards, scorecards, and agent observability monitoring." He monitors how agents are working, learning, and adapting — like a traditional manager checking in with employees, except the "employees" are AI agents resolving 74% of support cases autonomously.

**Why it matters:** This is the most concrete practitioner example of the paradigm shift. Stauber isn't reviewing individual agent outputs. He's monitoring trajectory — performance trends, learning curves, adaptation patterns. His intervention is on divergence (agent drift, quality drops), not on approval of individual work items. This IS the flight director pattern, even if nobody calls it that.

**Results cited:** Sales development reps went from 12-15 prospects/day to 350+ meetings/week. $60M annualized pipeline. 300+ new clients in 4 months.

**URL:** https://hbr.org/2026/02/to-thrive-in-the-ai-era-companies-need-agent-managers
**Source type:** [general press — HBR] — Note: HBR is not a practitioner source, but it's reporting on a named practitioner's actual work. The practitioner (Stauber) is real and named. Evidence level: **Level 2 — single experiment.** Salesforce is both the practitioner and the vendor here, which creates a conflict of interest. The pattern is real; the specific numbers should be treated with appropriate skepticism.

---

### Finding 2: McKinsey's "Unified Human-Agent Dashboard" — One Client Actually Built It

**What:** One McKinsey client (unnamed) built a dashboard where "the business manager, the VP, and the SVP evaluate the joint performance of both their workforces" — human and agentic — in a single view. McKinsey describes the emerging management archetype as the "M-shaped supervisor" — a broad generalist fluent in AI who orchestrates agents and the hybrid workforce across domains.

**Why it matters:** This is the only reference to someone actually building the integrated human+agent performance dashboard. The fact that even McKinsey could only name one client doing this tells you how early this is.

**URL:** https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-future-of-work-is-agentic
**Source type:** [vendor press release — consultancy framework] — Level 0 as evidence for what works. Level 1 as opinion on direction. The unnamed client is interesting but unverifiable.

---

### Finding 3: Fiddler AI's "Control Plane" — Technical Infrastructure for the Flight Director

**What:** Fiddler AI (Series C, 2026) positions its product as "the control plane for AI agents" — combining observability, guardrails, and governance in a single layer. They define a control plane as "standardized telemetry, reliable evaluation, continuous monitoring, enforceable policy, and auditable governance." 100+ out-of-box metrics including hallucination, toxicity, PII/PHI, drift, and business KPIs. Real-time guardrails that prevent violations before they occur.

**Why it matters:** This is the technical infrastructure that would underpin a "flight director dashboard." The control plane metaphor (borrowed from networking/Kubernetes) is structurally identical to what a flight director does — monitor telemetry, detect divergence from acceptable parameters, intervene when thresholds are crossed. But Fiddler is selling to platform engineers, not to business managers. The organizational layer on top doesn't exist yet.

**URL:** https://www.fiddler.ai/control-plane
**Source type:** [vendor press release] — Level 0 as evidence. But the product category is real and well-funded.

---

### Finding 4: OpenAI Frontier — "Agents Are Digital Co-Workers, Not Scripts"

**What:** OpenAI launched Frontier, a platform for building, deploying, and managing AI agents "with the same structure and oversight companies give human workers." Agents have defined roles, credentials, permissions, access controls, lifecycle management (provisioned, tested, deployed, monitored, evaluated, retrained, versioned, retired), shared context ("semantic layer" for institutional memory), and orchestration layers for handoffs.

**Why it matters:** OpenAI is explicitly framing agent management as analogous to human workforce management — not just technical monitoring. The five-component framework (identity, lifecycle, context, orchestration, governance) maps to what HR does for employees. This is the vendor pushing the "manage agents like workers" paradigm most aggressively.

**URL:** https://www.pymnts.com/artificial-intelligence-2/2026/openai-says-ai-agents-need-to-be-managed-like-humans
**Source type:** [general press] reporting vendor announcement — effectively Level 0. OpenAI is selling a product. But the framing is notable because it moves past "monitoring" into "management."

---

### Finding 5: HBR March 2026 — "Think of Agents Like Team Members"

**What:** Telang, Hydari, and Iqbal (HBR, March 2026) argue that every AI agent should have: a job description specifying responsibilities and authority boundaries, defined escalation points ("when it must ask for human input"), structure/feedback/evaluations like human employees, audit trails making decisions explainable. They frame the risk as: when agents can update records, issue refunds, route approvals, they introduce operational risks including "unpredictable behavior and unclear responsibility."

**Why it matters:** This is the academic/practitioner argument for treating agent management as a management discipline, not just a technical one. The "job description for agents" concept is the organizational analog of the technical "agent identity" that Fiddler/OpenAI implement.

**URL:** https://hbr.org/2026/03/to-scale-ai-agents-successfully-think-of-them-like-team-members
**Source type:** [academic/research via general press] — Level 1 (opinion/framework). No specific deployment evidence.

---

### Finding 6: California Management Review — "Agentic Operating Model" Framework

**What:** CMR (March 2026) proposes the Agentic Operating Model (AOM) with four layers: cognitive specialization, coordination architecture, real-time control, and organizational governance. Key insight: "failures in agentic systems typically arise from misalignment across these layers rather than from deficiencies in model performance." They argue autonomous AI is "an institutional shift, not merely a technological one."

**Why it matters:** This is the most rigorous academic framework for what an "agentic operating model" looks like. The four-layer model is conceptually close to the "flight director" question — it positions real-time control as one layer of a broader governance architecture. But it's a framework, not a deployment report.

**URL:** https://cmr.berkeley.edu/2026/03/governing-the-agentic-enterprise-a-new-operating-model-for-autonomous-ai-at-scale/
**Source type:** [academic/research] — Level 1 (framework/opinion). Strong conceptual contribution but no empirical validation cited.

---

### Finding 7: ServiceNow AI Control Tower — The Vendor Implementation

**What:** ServiceNow's AI Control Tower provides centralized governance: monitoring which agents are running, what they're doing, detecting dormant or overprivileged agents, system-wide risk scoring dashboards. March 2026 release added MCP server catalog integration and Microsoft partnership. Positioned as turning "Black Box AI into a transparent, governed asset."

**Why it matters:** This is the closest vendor product to the "flight director dashboard" concept — a centralized view of all AI agent activity with intervention capabilities. But it's governance-focused (compliance, risk, audit), not management-focused (performance, trajectory, optimization). The metaphor is "control tower," not "flight director." Control towers prevent collisions; flight directors optimize trajectories. Different job.

**URL:** https://www.servicenow.com/products/ai-control-tower.html
**Source type:** [vendor press release] — Level 0. Product exists and is shipping, but no independent deployment evidence found.

---

### Finding 8: The Counter-Evidence — Agent Sprawl and the Visibility Crisis

**What:** Gravitee's 2026 State of AI Agent Security Report: only 47.1% of enterprise AI agents are actively monitored or secured. Only 24.4% of organizations have full visibility into agent-to-agent communication. 88% reported confirmed or suspected security incidents. The governance-containment gap: 58-59% have monitoring/oversight, but only 37-40% have containment controls (kill-switch capability). 82% of executives feel confident their policies protect against unauthorized agent actions, but over half of deployed agents operate without security oversight or logging.

**Why it matters critically:** This is the devastating counter-evidence. You can't have a "flight director dashboard" when more than half your agents aren't even on radar. The executive confidence gap (82% confident, 53% unmonitored) is the organizational equivalent of believing you have air traffic control when half your planes are flying dark. The "data is the manager" thesis requires data. Most organizations don't have it.

**URL:** https://www.gravitee.io/blog/state-of-ai-agent-security-2026-report-when-adoption-outpaces-control
**Source type:** [vendor report — Gravitee sells agent security] — treat specific numbers as Level 0 (vendor survey to sell product). But the directional finding (adoption outpacing oversight) is confirmed across multiple independent sources.

---

### Finding 9: Deloitte — "Only 1 in 5 Has Mature Governance"

**What:** Deloitte's State of AI in the Enterprise 2026: two-thirds of organizations are piloting or deploying AI agents, but only 1 in 5 has a mature governance model for autonomous agents. They recommend "graduated autonomy levels" with "human oversight triggers" and "agent supervisors" who enter workflows at "intentionally designed points."

**Why it matters:** Confirms the maturity gap. The "graduated autonomy levels" concept is interesting — it's the organizational analog of flight envelope protection in aviation (the plane can do more than the pilot is allowed to ask for in normal operations). But again: framework, not deployment report.

**URL:** https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html
**Source type:** [vendor press release — consultancy] — Level 0 as evidence. Directionally consistent with other sources.

---

## WHAT WE DID NOT FIND

1. **No "flight director dashboard" product or practice.** Nobody is building a unified management interface where managers monitor organizational trajectory (human + agent work combined) and intervene on divergence. The closest is the unnamed McKinsey client's unified dashboard (Finding 2) and Salesforce's agent manager role (Finding 1). Everything else is either technical monitoring (for engineers) or governance (for compliance).

2. **No Tesla "data is the manager" formalization.** Musk's management philosophy (shortest path for information, data-driven decisions) has not been codified into an AI-era organizational model by anyone. Multiple searches found no practitioner or academic who has taken the Tesla management model and applied it to AI-augmented organizations. The phrase "data is the manager" does not appear in any recent literature found.

3. **No practitioner blog posts about replacing status meetings with agent dashboards.** This was specifically searched and not found. The "dashboards replacing meetings" pattern exists in DevOps/SRE culture (status pages replacing status meetings), but nobody has written about extending this to AI agent management.

4. **No convergence on trajectory-based management.** We found exactly two practitioner-level examples (Salesforce, unnamed McKinsey client), several vendor products, and multiple academic frameworks. This is Level 1-2 on the evidence ladder — opinions and single experiments. Not Level 3 convergence.

5. **No named practitioners beyond Zach Stauber.** For a topic this broadly discussed, the absence of named practitioners actually doing trajectory-based management is striking. Everybody writes frameworks. Almost nobody reports doing it.

6. **No Nordic signal whatsoever.** Zero Nordic companies or practitioners found in any search related to this topic.

---

## MATURITY ASSESSMENT

**Is trajectory-based management real or aspirational?**

**Mostly aspirational, with one concrete precedent.**

The field is in a strange state: the *technical infrastructure* for trajectory-based management is maturing rapidly (Fiddler, Arize, Datadog, ServiceNow all shipping observability products). The *organizational frameworks* are proliferating (McKinsey, HBR, CMR, Deloitte all publishing). But the *actual organizational practice* of managing by trajectory — monitoring divergence rather than approving output — has exactly one named practitioner (Salesforce's Stauber) and one unnamed example (McKinsey's client).

**The structural problem:** Agent observability tools are built for platform engineers, not business managers. ServiceNow's AI Control Tower is built for compliance, not management. Nobody has built the layer that translates agent telemetry into management-relevant trajectory information. The question "is this agent drifting from its intended performance?" is different from "is this agent throwing errors?" — and the tools answer the second question, not the first.

**The analogy that fits:** This is roughly where DevOps was in 2012. The infrastructure monitoring tools existed (Nagios, Zabbix). The cultural movement existed (DevOps conferences, manifestos). But the organizational practice of "you build it, you run it" was still rare and mostly at FAANG-scale companies. It took another 5 years for it to become mainstream management practice. Agent management may follow a similar trajectory — tooling first, frameworks second, organizational practice last.

**What would change this assessment:** Finding 10-20 independent managers who describe their daily work as "monitoring agent trajectory and intervening on divergence" — not as a framework they aspire to, but as what they actually do on Tuesday morning.

---

## IMPLICATIONS FOR THE KNOWLEDGE BASE

1. **The "flight director" metaphor is ours to claim.** Nobody is using it. The field uses "control tower" (governance/compliance), "control plane" (technical), and "agent manager" (HR analog). "Flight director" — monitoring trajectory and intervening on divergence — is a distinct concept that isn't being articulated anywhere. This is a content opportunity.

2. **The real bottleneck is the translation layer.** Technical telemetry → management-relevant trajectory information is the missing piece. Tools exist. Frameworks exist. The translation doesn't.

3. **The counter-evidence (53% of agents unmonitored) is the most useful finding.** You can't manage by trajectory when you can't see the trajectory. The governance gap is the prerequisite problem.

4. **Salesforce's Stauber is the key practitioner signal.** Worth deep-diving in a future cycle — his actual daily practice, not the HBR summary.

---

*Research quality note: Most findings are Level 0-1 (vendor/consultancy frameworks and opinions). The only Level 2 finding is Salesforce's agent manager role (single experiment, with vendor conflict of interest). No Level 3 convergence found. The Gravitee survey statistics should be treated as directional, not precise — vendor surveys designed to sell security products systematically overstate risk.*
