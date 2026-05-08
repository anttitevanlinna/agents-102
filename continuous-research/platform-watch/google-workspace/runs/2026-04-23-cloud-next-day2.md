---
type: run-log
domain: platform
platform: google-workspace
date: 2026-04-23
focus: Google Cloud Next 2026 — Day 1/2 recap (April 22-23)
evidence-levels: 0-2
searches: 4
fetches: 5
---

# Google Cloud Next 2026 — Day 1/2 Research Log (April 22-23)

**Researcher note:** This log covers what was publicly announced and/or reported on April 22-23, 2026 at Google Cloud Next in Las Vegas. Day 2 sessions (April 23) had not yet been fully recapped in press at time of research. Most findings below are from Day 1 keynote and vendor blog posts.

---

## Findings

### 1. Keynote: Gemini Enterprise Agent Platform announced

- **What:** Google announced the "Gemini Enterprise Agent Platform" — described as full-stack infrastructure to build, scale, govern, and optimize agents. The new Gemini Enterprise app includes an Agent Designer, Inbox (for managing agent activity), long-running agents, Skills, and Projects.
- **URL:** https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/cloud-next-2026-sundar-pichai/ [vendor press release]
- **URL:** https://cloud.google.com/blog/topics/google-cloud-next/welcome-to-google-cloud-next26 [vendor press release]
- **Evidence level:** Level 0 — vendor announcement. No independent deployment evidence yet.
- **Notable internal metric:** Google claims 75% of all new code at Google is AI-generated (approved by engineers). Security agents reduced threat mitigation time by "more than 90%." These are self-reported by Google about Google — treat as Level 1 at best until independently verified.

### 2. Gemini 3.1 Pro — GA status unclear

- **What:** The keynote search results reference "Gemini 3.1 Pro" as one of the models launched/featured at the event alongside "Nano Banana 2" image model. However, no fetched page explicitly confirmed GA (General Availability) status vs. preview.
- **Source:** https://oplexa.com/google-cloud-next-2026/ [general press, bare facts]
- **Source:** https://www.techradar.com/pro/live/google-cloud-next-2026 [general press, bare facts]
- **Evidence level:** Level 0/1 — mentioned in general press summaries. No official product page or GA announcement URL retrieved. **Treat as [SOURCE NEEDED] for GA confirmation.**

### 3. AG-UI / A2UI: Google launched A2UI v0.9 spec; AG-UI protocol also featured

- **What:** Google launched A2UI v0.9 — their open protocol for Generative UI — at Cloud Next. It ships prompt-first generation, bidirectional messaging, modular schemas, and a new Agent SDK. A session (BRK2-094 "Generative UI for any agent, anywhere — A2UI, AG-UI, MCP apps and more") covered both Google's A2UI spec and the AG-UI open protocol from CopilotKit.
- **Session page URL:** https://www.googlecloudevents.com/next-vegas/session/3913158/generative-ui-for-any-agent-anywhere-a2ui-ag-ui-mcp-apps-and-more [vendor event page]
- **Google Developers Blog URL:** https://developers.googleblog.com/a2ui-v0-9-generative-ui/ [vendor press release]
- **CopilotKit analysis URL:** https://www.copilotkit.ai/blog/a2ui-whats-new-in-google-generative-ui-spec [practitioner analysis — CopilotKit built AG-UI]
- **Evidence level:** Level 0-1. The A2UI spec is a vendor announcement. AG-UI is an open protocol with independent adoption (CopilotKit), giving it slightly more independent signal. Session content not yet published post-event.
- **Key detail from session description:** AG-UI "connects all frontends and agent backends" with adaptive interfaces that customize UIs per context. Design system as "trust catalog." No independent post-session practitioner writeups retrieved yet.

### 4. A2A Protocol: v1.2 at Linux Foundation, 150+ orgs, production deployments confirmed

- **What:** A2A protocol has reached 150+ organizations in production (not pilot), is governed by the Linux Foundation's Agentic AI Foundation, and has reached v1.2 with cryptographic agent card signing. The Google Cloud blog confirmed A2A v0.3 specifics: gRPC support, security card signing, extended Python SDK.
- **URL:** https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade [vendor press release]
- **URL:** https://thenextweb.com/news/google-cloud-next-ai-agents-agentic-era [general press]
- **URL:** https://www.prnewswire.com/news-releases/a2a-protocol-surpasses-150-organizations-302737641.html [vendor press release]
- **Evidence level:** Level 1-2. The Linux Foundation handoff is independently verifiable (Linux Foundation is an independent standards body). The 150-org count comes from a PR Newswire release — treat as vendor claim. **Production deployments with named companies (see below) push this toward Level 2.**
- **Named production deployments:** Tyson Foods and Gordon Food Service using A2A for real-time supply chain agent-to-agent coordination — product data sharing and lead routing. Source: Google Cloud blog (vendor).
- **Platform integration:** Microsoft integrated A2A into Azure AI Foundry and Copilot Studio. AWS added support in Amazon Bedrock AgentCore Runtime. Native support in ADK, LangGraph, CrewAI, LlamaIndex, Semantic Kernel, AutoGen.
- **New extension — Agent Payments Protocol (AP2):** A2A expanded into economic coordination for agent-driven transactions; 60+ organizations in payments/financial services. Source: vendor release only. [SOURCE NEEDED for independent confirmation]

### 5. Enterprise customer deployments announced — 10 named companies

- **URL:** https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/cloud-next-2026-customer-round-up/ [vendor press release]
- **Evidence level:** Level 0 — all sourced from Google's own blog. No independent practitioner confirmation yet.
- **Companies featured:**
  - **Capcom** — AI agents for game testing
  - **Citi Wealth** — "Citi Sky" financial advisor agent
  - **Citadel Securities** — Research acceleration with TPUs
  - **Home Depot** — "Magic Apron" + AI phone agents
  - **Merck** — $1B agentic platform deployment (self-reported scale)
  - **Mars** — Gemini Enterprise as "primary OS"
  - **Tata Steel** — 300+ specialized AI agents
  - **Unilever** — Multi-agentic procurement solutions
  - **Virgin Voyages** — "Rovey" personal concierge agent
  - **Vodafone** — AI Concierge and security services
- **Capital One, Intuit, Compass, Avery Dennison:** Not found in any fetched page. Pre-listed as presenters; may appear in Day 2-3 breakout sessions not yet recapped.

### 6. Workspace Studio: skills feature added, no new named customer beyond Kärcher confirmed

- **What:** Workspace announced 10 updates at Cloud Next, including "Skills for agentic automation in Workspace Studio" and a new Workspace MCP Server for developers. No named enterprise customers announced in the Workspace blog — generic "Fortune 500" reference only.
- **URL:** https://workspace.google.com/blog/product-announcements/10-more-announcements-workspace-at-next-2026 [vendor press release]
- **Evidence level:** Level 0.
- **Kärcher follow-on:** Not mentioned in any fetched or searched content. Kärcher was the one named Workspace Studio customer from prior research; no second named customer confirmed at this event.

### 7. BRK3-024 governance session — not found

- No content retrieved for session BRK3-024. The event session catalog was not fully indexed by press at time of research. Governance tooling was addressed in the keynote (Agent Gateway, Agent Observability, simplified agent governance controls in Workspace), but the specific BRK3-024 content was not found.

### 8. Infrastructure: 8th-gen TPUs, $750M partner fund

- **TPU 8t (training):** Scales to 9,600 TPUs, 3x more processing power than prior generation, 2 petabytes shared high-bandwidth memory in a single superpod.
- **TPU 8i (inference):** Optimized for running millions of agents concurrently.
- **Partner fund:** $750M committed to the 120,000-member partner ecosystem for agentic AI development.
- **URL:** https://www.googlecloudpresscorner.com/2026-04-22-Google-Cloud-Commits-750-Million-to-Accelerate-Partners-Agentic-AI-Development [vendor press release]
- **Evidence level:** Level 0.

### 9. Apple partnership

- Google named as Apple's "preferred cloud provider" for Apple Foundation Models. Gemini technology to power future Apple Intelligence features including a more personalized Siri in 2026.
- **URL:** https://9to5mac.com/2026/04/22/google-teases-gemini-powered-siri-upgrade-during-cloud-next-keynote/ [general press]
- **Evidence level:** Level 1 (announced at keynote, reported independently). No deployment date confirmed.

---

## What I Looked For But Did Not Find

- **Gemini 3.1 Pro GA confirmation with official product page URL** — mentioned in general press summaries but no GA announcement URL retrieved. May be in a separate Vertex AI blog post not yet indexed.
- **BRK3-024 governance session content** — session catalog not recapped in press by Day 2. No independent writeup found.
- **Second named Workspace Studio customer beyond Kärcher** — not confirmed at this event. Workspace blog referenced "Fortune 500" generically.
- **Capital One, Intuit, Compass, Avery Dennison breakout content** — pre-listed as session presenters but no post-session writeups retrieved. These may surface on April 23-24.
- **Independent practitioner reactions to announcements** — too early (same-day). No X.com threads, blog posts, or GitHub activity from practitioners responding to Cloud Next announcements found yet.
- **AG-UI / A2UI session post-mortem** — BRK2-094 was confirmed on the session schedule but no post-session writeup or slides found.
- **A2A formal IETF or W3C ratification** — Linux Foundation handoff confirmed, but no formal IETF/W3C standards track ratification announced.

---

## Orientation

Google Cloud Next 2026 is positioning Google Cloud as the "operating system for the agentic enterprise" — the keynote centered on managing thousands of agents (not just building one), with new governance, observability, and cross-agent coordination infrastructure. The A2A protocol reaching 150+ organizations and Linux Foundation governance is the most independently verifiable signal; everything else is Level 0 vendor announcement pending independent practitioner confirmation in the coming weeks.
