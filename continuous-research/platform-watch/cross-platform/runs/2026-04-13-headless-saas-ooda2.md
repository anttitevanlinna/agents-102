---
type: run-log
domain: cross-domain
evidence_level: 2-3
platforms: [enterprise-saas, mcp, coding-agents, commerce]
nordic: false
updated: 2026-04-13
cycle: 97-supplement-2
---

# Enterprise SaaS Architecture Shift — OODA Cycle 2, April 13, 2026

**Research question:** The first cycle found Level 1 opinion on "headless SaaS." This cycle asks: what's actually happening — and is it headless? Three SaaS vendors showed three completely different architectures in the last 2 months. None went headless. Each found their native role in an agent-first world. Is there a taxonomy? Who else is doing this? What is the counter-evidence?

**Key insight from cycle 1 + user session:** Snowflake built a domain-expert subagent. Figma built a bidirectional canvas. Linear declared issue tracking dead and became an agent dispatch hub. The MCP interface is evolving from API wrapper to intent-native domain expert. The word "headless" misses what's actually happening.

## Queries Used

**Round 1:**
1. `Snowflake "Cortex Code" subagent architecture Claude Code 2026`
2. `Karri Saarinen Linear "issue tracking is dead" agent architecture 2026`
3. `Figma "Code to Canvas" Claude Code bidirectional 2026`
4. `"agent-native SaaS" OR "agent-first SaaS" architecture practitioner 2026`
5. `"per-seat pricing" death AI agents SaaS 2026`
6. `Jens Eriksvik medium post-SaaS enterprise AI 2026`

**Round 2:**
7. `Notion OR Asana OR Monday.com agent integration architecture 2026`
8. `Stripe OR Shopify agent-native architecture MCP 2026`
9. `"SaaS UI still matters" OR "headless SaaS won't work" enterprise complexity 2026`
10. `SaaS vendor "agent-native" OR "agent dispatch" OR "domain expert" architecture taxonomy 2026`
11. `Atlassian seat count decline agents 2026`

**Round 3:**
12. `Linear agent skills "coding agents" "75 percent" enterprise workspaces dispatch hub 2026`
13. `SaaS "domain subagent" OR "domain expert agent" architecture Claude Code integration vendor 2026`
14. `"intent-native" OR "intent-based interface" SaaS post-app era 2026`
15. `Google "Universal Commerce Protocol" UCP agentic commerce Shopify 2026`
16. `SaaS companies NOT adopting agent architecture resistance 2026 Oracle SAP Workday`
17. `Jens Eriksvik "dark side of vibe coding" medium 2026`

## Findings

### Finding 1: Snowflake's subagent architecture is official and specific — domain-expert delegation with security envelopes

**Evidence level:** 2 (single vendor, but practitioner-documented with working code)

Snowflake Labs (official org, not community) published a subagent integration where Claude Code acts as orchestrator and Cortex Code runs as a specialized executor in headless mode. The key technical details:

- **Semantic routing:** LLM-based analysis determines whether a request is Snowflake-specific. "ONLY Snowflake operations -> Cortex Code. Everything else -> Claude Code."
- **Headless mode:** Cortex Code executes via `--input-format stream-json` — programmatic mode, no interactive prompts.
- **Security envelopes:** Operations are classified as RO, RW, RESEARCH, DEPLOY, or NONE, controlling what the subagent can do. This is governance built into the delegation layer.
- **Context enrichment:** Requests are enriched with conversation history before delegation, so Cortex Code makes informed decisions.
- **Shared skills:** Skills created for Claude Code are immediately available in Cortex Code and vice versa — "just structured markdown files stored locally."

Kelly Kohlleffel (practitioner) documented a 7-phase orchestrator builder skill that coordinates sub-agents using multiple Cortex Analyst tools. Two integration patterns exist: multi-tool (SQL visibility, faster response, simpler debugging) and A2A REST (true isolation via Python UDFs calling Cortex Agent REST API).

**Sources:**
- https://github.com/Snowflake-Labs/subagent-cortex-code [practitioner direct — official Snowflake Labs repository]
- https://medium.com/@kelly.kohlleffel/one-skill-two-ai-coding-assistants-snowflake-cortex-code-and-claude-code-92e0de8dfed2 [practitioner direct — detailed implementation walkthrough]

**Assessment:** This is not a wrapper. The subagent pattern means Snowflake becomes a domain expert that coding agents delegate to — the SaaS product's value shifts from "screens you click" to "domain expertise you invoke." The security envelope model is particularly significant: it solves the governance problem that Hightower raised in cycle 1 (who controls what the agent can do?) at the delegation layer itself.

---

### Finding 2: Linear's pivot is backed by extraordinary adoption data — 75% enterprise workspace penetration, 5x agent work growth, 25% of issues now agent-created

**Evidence level:** 2–3 (single vendor reporting its own data, but corroborated by multiple independent tech press interviews)

Karri Saarinen (Linear CEO) declared "issue tracking is dead" on March 25, 2026, coinciding with the launch of Linear Agent + Skills + Automations. The specific data points:

- **75% of Linear enterprise workspaces** already have coding agents installed
- Agent work volume grew **5x in three months**
- **25% of all new issues** in enterprise workspaces are now created by agents, not humans
- Linear Agent works as a plug-in across Slack, Teams, and Zendesk — it reads context from these channels and creates/assigns issues
- **Skills** = reusable workflows encoded as capabilities, triggered manually via slash commands or activated automatically when context warrants
- Roadmap includes Code Intelligence, Code Diffs, and a Linear Coding Agent that will write code directly

Saarinen's framing: the legacy approach was the "handoff model" (human decides what to do, creates ticket, another human picks it up). In the agent era, Linear becomes the orchestration layer — feeding continuous context to autonomous agents, not tracking humans' progress on tasks.

**Sources:**
- https://www.theregister.com/2026/03/26/linear_agent [tech press — direct quotes from Saarinen]
- https://www.devclass.com/development/2026/03/27/linear-moves-sideways-to-agentic-ai-as-ceo-declares-issue-tracking-dead/5211661 [tech press — additional interview details]
- https://linear.app/changelog/2026-03-24-introducing-linear-agent [vendor changelog — bare fact: features shipped]
- https://linear.app/next [vendor product page — bare fact: roadmap announced]
- https://buttondown.com/verified/archive/the-death-of-the-ticket-why-linear-is-pivoting/ [practitioner analysis — independent analysis of the pivot]
- https://x.com/karrisaarinen/status/2036504061583770036 [practitioner direct — Saarinen's own framing]

**Assessment:** The 75%/25% numbers — if accurate — represent something beyond opinion. Three-quarters of enterprise workspaces having coding agents installed, and a quarter of new issues being agent-created, is deployment evidence at scale. The vendor is reporting its own data (so Level 0 for the numbers themselves), but the structural shift — from issue tracker to agent dispatch hub — is independently corroborated by multiple analyses. The question for cycle 3: are other project management tools seeing the same pattern? If Asana and Monday.com report similar numbers, this is convergence.

---

### Finding 3: Figma's bidirectional canvas — the design tool becomes an agent's sketchpad

**Evidence level:** 2 (deployed feature, practitioner-documented, multiple independent analyses)

Figma and Anthropic shipped "Code to Canvas" on February 17, 2026 — a bidirectional integration via MCP:

- **Design to Code:** Figma's MCP server lets Claude Code read design data and generate code accurately
- **Code to Canvas:** Claude Code screenshots a running UI, then AI reconstructs the layout as native Figma layers, components, and auto-layout groups
- **The loop:** UI rendered from code -> canvas for alignment -> back to code for implementation

The technical detail that matters: captured frames become standard Figma design layers. Designers can organize, duplicate, rearrange, refine copy, and annotate. This is not a screenshot — it's a reconstruction into Figma's native primitives.

Multiple independent practitioners analyzed the pattern. One critical voice (Ketan Damle on Medium) argued it "solves the wrong problem" — the right problem isn't code-to-canvas roundtripping but maintaining design systems across agent-generated code. The critique is itself evidence that the pattern is being tested in practice.

**Sources:**
- https://www.figma.com/blog/introducing-claude-code-to-figma/ [vendor blog — bare fact: feature shipped]
- https://developers.figma.com/docs/figma-mcp-server/code-to-canvas/ [vendor documentation — technical details]
- https://www.railly.dev/blog/figma-claude-code-bidirectional [practitioner analysis — detailed technical explanation]
- https://medium.com/design-bootcamp/claude-code-figma-just-flipped-the-script-ebcf36568c82 [practitioner analysis — Kritika Vishnoi, independent]
- https://medium.com/@koriigami/claude-code-to-figma-solves-the-wrong-problem-heres-the-right-one-c5878fe9b1ec [practitioner direct — counter-argument, also evidence of real usage]

**Assessment:** Figma didn't go headless. It didn't become a subagent. It became a bidirectional canvas — a shared workspace where humans and agents collaborate on the same artifact in their native formats. The SaaS product's value shifts from "where designers work" to "where design decisions get recorded and refined, regardless of who made them." This is a third architectural pattern, distinct from Snowflake's delegation model and Linear's dispatch hub.

---

### Finding 4: Shopify went furthest — four MCP surfaces + co-developed the Universal Commerce Protocol with Google

**Evidence level:** 2–3 (deployed features, multi-vendor protocol, 20+ industry endorsements, but usage data absent)

Shopify shipped four distinct MCP servers by March 2026:
- **Dev MCP:** Developer tooling for building Hydrogen storefronts
- **Storefront MCP:** Merchant-specific product search, policies, FAQs
- **Catalog MCP:** Global product discovery across Shopify merchants
- **Checkout MCP:** Creating, updating, and completing checkouts programmatically

The architectural detail: every Hydrogen storefront can now expose an MCP endpoint at `/api/mcp` with zero custom setup when `proxyStandardRoutes` is enabled. Storefronts are becoming AI-agent-ready commerce endpoints by default.

Beyond MCP, Shopify co-developed the **Universal Commerce Protocol (UCP)** with Google, announced at NRF January 2026. UCP standardizes the full commerce journey — discovery, consideration, purchase, order management — through a single abstraction layer. It supports REST, MCP, Agent Payments Protocol (AP2), and Agent2Agent (A2A). Endorsed by 20+ partners including Etsy, Wayfair, Target, Walmart, Stripe, Visa, Mastercard, American Express, Best Buy, Zalando. By March 2026, UCP added Cart, Catalog, and Identity Linking capabilities. Currently US-only.

**Sources:**
- https://shopify.tenten.co/shopify-ai-dev-ecosystem-mcp-server-the-cto-s-guide-to-agentic-commerce-architecture-in-2026 [practitioner analysis — CTO-level architecture guide]
- https://developers.googleblog.com/under-the-hood-universal-commerce-protocol-ucp/ [vendor documentation — Google's technical explanation]
- https://www.shopify.com/news/ai-commerce-at-scale [vendor press release — bare fact: features announced]
- https://www.infoq.com/news/2026/01/google-agentic-commerce-ucp/ [domain trade publication — InfoQ, substantive technical coverage]
- https://dev.to/davide_conte_12a899361ed1/i-built-an-mcp-server-for-shopify-and-stripe-write-operations-the-gap-nobody-filled-n6 [practitioner direct — independent builder filling gaps in official MCP servers]
- https://shopify.engineering/ucp [vendor documentation — Shopify engineering on UCP implementation]

**Assessment:** Shopify represents a FOURTH architecture pattern: commerce protocol layer. They didn't go headless, become a subagent, or build a dispatch hub. They defined a domain-specific protocol (UCP) that lets agents transact natively. The significance of 20+ industry partners endorsing UCP (including competitors like Target and Walmart) suggests this isn't a vendor play — it's an emerging industry standard for agent-native commerce. Shopify's position: "ecommerce platform" -> "commerce infrastructure for the AI web."

---

### Finding 5: The "SaaSpocalypse" — $285B wiped, Atlassian's first seat count decline, per-seat pricing structurally broken

**Evidence level:** 2–3 (multiple independent reports of the same financial event, but the event is market reaction to a thesis, not deployment evidence of agent replacement)

In February 2026, approximately $285 billion vanished from SaaS company valuations in roughly 48 hours. The trigger: Anthropic launched Claude Cowork and the market concluded AI agents could replace entire categories of knowledge work that SaaS companies charged per-seat to support.

Specific data points:
- Atlassian reported its **first-ever decline in enterprise seat counts** in March 2026
- Atlassian stock fell **36% in a single month, 50%+ for the year**
- Atlassian laid off ~10% of workforce (1,600 people) to pivot to AI and enterprise sales
- Enterprises cutting human seat requirements at roughly **1:5 ratio** per autonomous agent deployed
- IDC predicts 70% of software vendors will move away from pure per-seat models by 2028

Eriksvik's analysis of Salesforce Agentforce pricing reveals the vendor counter-strategy: Salesforce introduced the "Agentic Enterprise License Agreement" at ~$125 PUPM, marketed as "unmetered" but actually containing base seat pricing + fair use policies + flex credits once usage thresholds are exceeded. Eriksvik calls it "a carefully managed illusion" of abundance that's actually metered. The fundamental conflict: agentic AI reduces the number of humans needing seats, which cannibalizes the vendor's own revenue model.

**Sources:**
- https://www.taskade.com/blog/saaspocalypse-explained [practitioner analysis — detailed timeline and data]
- https://newclawtimes.com/articles/saaspocalypse-ai-agents-b2b-software-repricing-atlassian-seat-compression/ [tech press — Atlassian-specific data]
- https://letsdatascience.com/blog/atlassian-fired-1-600-people-on-a-wednesday-the-ceo-called-it-an-ai-investment [tech press — layoff details]
- https://medium.com/@jens.eriksvik/salesforce-agentforce-and-the-magical-return-of-the-seat-license-945a669c6f9b [practitioner direct — Eriksvik's pricing analysis]
- https://hickamsdictum.com/the-ai-pricing-pivot-why-per-seat-alone-is-dying-in-2026-172e69620867 [practitioner analysis — Ben Hinson]
- https://seatpricing.rip/ [practitioner direct — entire site dedicated to the thesis]

**Assessment:** The SaaSpocalypse is real as a market event and real as a pricing disruption. But the causal claim — "agents replace seats therefore seat pricing dies" — is running ahead of deployment evidence. Atlassian's seat count decline could reflect many factors (consolidation, competition, recession, over-buying during COVID). The 1:5 ratio is widely cited but [SOURCE NEEDED] for the original data. Treat the pricing disruption as confirmed (Level 3 — multiple independent signals), but the specific agent-causes-seat-decline mechanism as Level 1–2 (thesis, not proven).

---

### Finding 6: Jens Eriksvik deep-dive — three CIO strategy archetypes that explain why vendors diverge

**Evidence level:** 1–2 (practitioner opinion grounded in enterprise consulting experience, no deployment data)

Eriksvik's Medium archive reveals a consistent and increasingly sharp thesis across six articles (April 2025 – April 2026). The trajectory:

1. **"Enterprise software is dead(ish)"** (April 2025) — the opening argument
2. **"Predictions for 2026: the post-SaaS reality"** (December 2025) — enterprises pulling agent logic OUT of SaaS products for control
3. **"Why foundational models are coming for your product"** (February 2026) — SaaS UI layer structurally vulnerable
4. **"The 2026 CIO strategy: resolving the contradictions"** (2026) — three archetypes
5. **"Salesforce Agentforce and the magical return of the seat license"** (2026) — pricing critique
6. **"The dark side of vibe-coding"** (2026) — counter-argument on quality risks

The three CIO archetypes are particularly relevant to the architecture taxonomy:

- **IP Fortress:** Build everything internally. Treat AI/data as proprietary IP. "Trade speed for ownership." Example: legacy banks building custom core-banking.
- **Ecosystem Maximizer:** Bet on hyperscaler/Tier-1 vendor ecosystems. "Trade autonomy for scale." Example: automotive companies coupling deeply with platform partners.
- **Agile Assembler:** Build pluggable architecture with swappable components. "Trade simplicity for flexibility." Buy individual capabilities but build the proprietary connective tissue.

The warning: organizations pursuing all three simultaneously create "the mushy middle" — "too expensive to be agile, too dependent to be proprietary, and too complex to be stable."

The connection to SaaS architecture shift: each archetype implies a different relationship with SaaS vendors in the agent era. Fortress enterprises will want Snowflake-style subagents they control. Maximizers will want Linear-style dispatch hubs within their vendor ecosystem. Assemblers will want Shopify-style protocols they can plug into and swap.

**Sources:**
- https://medium.com/@jens.eriksvik/the-2026-cio-strategy-resolving-the-contradictions-836f986de564 [practitioner direct]
- https://medium.com/@jens.eriksvik/salesforce-agentforce-and-the-magical-return-of-the-seat-license-945a669c6f9b [practitioner direct]
- https://medium.com/@jens.eriksvik/the-dark-side-of-vibe-coding-who-is-sarah-johnson-at-techstart-inc-718b338fde9e [practitioner direct]
- https://medium.com/@jens.eriksvik/enterprise-software-is-dead-ish-time-to-move-on-da640e15c373 [practitioner direct — historical context, April 2025]

**Assessment:** Eriksvik is the sharpest practitioner voice on this topic. His trajectory from "enterprise software is dead-ish" (tentative) to specific pricing critiques and CIO strategy frameworks (actionable) in 12 months shows a thinker who's updating his model based on real enterprise engagements. The three-archetype framework is especially useful because it explains WHY vendors are diverging architecturally — they're serving different enterprise buyer types. Not Level 3 (no convergence of independent practitioners saying the same thing), but the highest-quality Level 1–2 signal in this scan.

---

### Finding 7: Notion and Monday.com are taking the "AI overlay" approach — agents ON TOP of the product, not replacing it

**Evidence level:** 2 (deployed features, but thin independent analysis)

Notion (February 2026, v3.3) shipped Custom Agents that can access Notion, Slack, Mail, Calendar, and MCP integrations. The Notion Agent acts as a query router — determining which connected tool contains requested data and synthesizing answers across sources. It searches Asana tasks via AI Connector with no manual syncing.

Monday.com shipped AI Blocks (drag-and-drop smart capabilities into workflows) and a "Digital Workforce" — autonomous agents handling routine work 24/7. Integration across Slack, Teams, Discord, WhatsApp, Salesforce, HubSpot, and any system with API/webhooks.

**Sources:**
- https://www.notion.com/releases/2026-02-24 [vendor changelog — bare fact: features shipped]
- https://www.adwaitx.com/notion-agent-asana-search-ai-connector/ [practitioner analysis — connector architecture]
- https://monday.com/blog/project-management/notion-vs-asana-vs-monday-work-management/ [vendor comparison — bare fact: feature descriptions]

**Assessment:** This is the FIFTH pattern and the most conservative: the SaaS UI remains primary, agents are layered on top as assistants/automations. No architecture change — the product adds an AI layer without rethinking what it is. Compare to Linear's radical pivot ("issue tracking is dead") — Notion and Monday.com are saying "issue tracking is alive, now with AI helpers." The question: is this the dominant SaaS response, or the dead-end that Linear is betting against?

---

### Finding 8: The "interface-to-intent" framing is emerging from multiple independent sources

**Evidence level:** 1–2 (multiple independent opinion pieces converging on the same language, but no deployment evidence for intent-based interfaces)

Several independent writers are converging on a specific reframing:

- **Prasoon Mukherjee** (FinExtra): "From Interface to Intent: Beyond SaaS — The Age of Autonomous Execution." The fundamental shift: SaaS requires users to translate intentions into structured interface actions; agents allow users to express intent directly.
- **Namish Saxena** (Medium/GenAIUs): "The Post-SaaS Manifesto: Why Your Dashboard is a Liability in 2026." Proposes "stop building destinations and start becoming protocols" — generative UI assembled for specific intents.
- **CIO Influence**: "The Post-App Era: Are Intent-Based Interfaces the End of SaaS UI?" Intent-based computing arriving in the enterprise.
- **Cycle 1** practitioners (Eriksvik, King-Kloepping, Ibbaka) were already pointing this direction.

The shared thesis: we move from an "interface of procedure" (how to do it) to an "interface of intention" (what to get). The SaaS product's job changes from "provide the interface" to "understand the intent and execute."

**Sources:**
- https://www.finextra.com/blogposting/30901/from-interface-to-intent-beyond-saas---the-age-of-autonomous-execution [practitioner direct — Prasoon Mukherjee]
- https://medium.com/genaius/the-post-saas-manifesto-why-your-dashboard-is-a-liability-in-2026-7f8e9b5a5cce [practitioner analysis — Namish Saxena]
- https://cioinfluence.com/featured/the-post-app-era-are-intent-based-interfaces-the-end-of-saas-ui/ [tech press — CIO Influence]

**Assessment:** The "interface to intent" language is more precise than "headless." It captures what Snowflake, Linear, Figma, and Shopify are actually doing — they're not removing the UI (headless), they're redefining who or what expresses intent to the system. The UI is optional when the agent can express intent directly. But this is still opinion converging, not deployment. The gap: nobody has published "we switched from interface-based to intent-based and here's what happened."

---

### Finding 9: Stripe's agent architecture — the API-native company barely had to change

**Evidence level:** 2 (deployed, documented, but Stripe was API-first from birth)

Stripe hosts a remote MCP server at `https://mcp.stripe.com` with OAuth-secured access. The `@stripe/agent-toolkit` integrates Stripe APIs with popular agent frameworks through function calling (Python and TypeScript). Stripe also hosts its agent integration resources at `github.com/stripe/ai`.

**Source:**
- https://github.com/stripe/ai [practitioner direct — official Stripe repository]

**Assessment:** Stripe is the control case. Because Stripe was always API-first, the agent transition required almost no architectural change — just add an MCP server on top of existing APIs. This supports Hightower's critique from cycle 1: for API-first companies, "going agent-native" is just a protocol adapter. The real architectural disruption happens to companies where the UI WAS the product (Linear, Figma, Notion) — they had to rethink their identity. Stripe just added a connector.

---

### Finding 10: Counter-evidence — the "SaaS isn't dead, it's hybrid" argument

**Evidence level:** 1 (analyst/practitioner opinion)

CIO.com published "SaaS isn't dead, the market is just becoming more hybrid." The core counter-arguments:

1. **Enterprise software encodes institutional architecture** — deep domain knowledge, compliance frameworks, workflow logic, years of organizational customization. Agents can't replace this overnight.
2. **The hybrid model is winning:** orchestration layers on top of systems of record, not replacement. Enterprises are building agent capabilities on top of existing SaaS, not ripping out SaaS.
3. **Established B2B SaaS companies with strong Systems of Record and deep domain expertise are "among the most natural beneficiaries" of the agentic shift** — if they choose to transform pricing, product, and culture.
4. **Two-tier split emerging:** "AI-enabled SaaS" (traditional + AI features) vs. "Native-AI SaaS" (built for agents from scratch). Most of the market will be AI-enabled, not native-AI.

**Sources:**
- https://www.cio.com/article/4131904/saas-isnt-dead-the-market-is-just-becoming-more-hybrid.html [tech press — CIO.com]
- https://www.cathaycapital.com/agentic-ai-is-a-massive-opportunity-for-b2b-software/ [analyst — Cathay Capital, investor perspective]
- https://charterglobal.com/how-saas-companies-can-transform-in-the-era-of-agentic-ai/ [practitioner analysis — transformation framework]

**Assessment:** This is important counter-evidence. The "hybrid" argument has merit: most SaaS won't go through the identity crisis that Linear did. They'll add AI on top (like Notion and Monday.com) and call it a day. The radical architecture shifts (Snowflake subagent, Linear dispatch hub, Figma bidirectional canvas, Shopify commerce protocol) may be the exception, not the rule — the companies that had the strategic clarity (or existential pressure) to rethink from first principles. For the majority, the answer is "add a chatbot, add an MCP server, keep the UI."

## What We Looked For But Did Not Find

1. **A practitioner-coined taxonomy for agent-native SaaS architectures.** Nobody has named the patterns we're seeing (subagent, dispatch hub, bidirectional canvas, commerce protocol, AI overlay). The taxonomy is ours to create.

2. **Deployment evidence for the "interface-to-intent" shift.** Multiple writers describe it. Zero practitioners say "we made this switch and here's what happened." The gap between opinion and deployment is still wide.

3. **Oracle, SAP, or Workday making radical agent-native architecture shifts.** Search returned nothing specific. These incumbent ERP/HCM vendors appear to be taking the conservative "AI overlay" path — adding agents on top, not rethinking architecture.

4. **Usage data for any of the new MCP-based integrations.** Shopify has four MCP servers. Snowflake has the subagent. Stripe has the MCP endpoint. Zero public data on how many teams are actually using them vs. the traditional UI. The features shipped. Nobody knows if anyone uses them.

5. **Nordic signal.** Nothing. No Nordic SaaS vendor or enterprise team reporting on agent-native architecture shifts.

6. **Counter-examples: SaaS vendors that tried agent-native and it failed.** No failures found. Could mean it's too early for failures, or could mean the search didn't surface them.

7. **Asana's agent architecture response.** Asana announced "AI teammates" in Fall 2025 beta but no 2026 update found. Conspicuous silence next to Linear's aggressive pivot and Monday.com's Digital Workforce.

## Orientation: An Emerging Taxonomy of Agent-Native SaaS Architectures

### The Five Patterns

Based on cycles 1 and 2, five distinct architectural responses are emerging. Each represents a different answer to "what is this SaaS product's native role in an agent-first world?"

| Pattern | Example | SaaS Product Becomes | UI Role | Agent Relationship |
|---------|---------|---------------------|---------|-------------------|
| **1. Domain-Expert Subagent** | Snowflake Cortex Code | Specialist that coding agents delegate to | Optional (headless mode) | Agent-to-agent delegation |
| **2. Agent Dispatch Hub** | Linear | Orchestration layer assigning work to agents | Context dashboard for humans | Agent work manager |
| **3. Bidirectional Canvas** | Figma Code-to-Canvas | Shared workspace for human-agent collaboration | Essential (collaboration surface) | Agent contributes, human refines |
| **4. Commerce Protocol Layer** | Shopify MCP + UCP | Infrastructure agents transact through | Optional (agents transact directly) | Agent as customer |
| **5. AI Overlay** | Notion, Monday.com | Same product + AI assistants layered on top | Primary (unchanged) | Agent as feature inside product |

### What determines which pattern a vendor chooses?

Three factors seem to drive the choice:

1. **Was the UI the product's identity?** If yes (Figma = visual design tool), the vendor must preserve the UI but make it bidirectional. If no (Snowflake = data infrastructure), the vendor can go headless.

2. **Is the product a system of work or a system of record?** Systems of work (Linear, Figma) are vulnerable — agents can do the work. Systems of record (Snowflake, Shopify) are durable — agents need the data. Work systems must reinvent; record systems must expose.

3. **How existential is the threat?** Linear saw 75% of workspaces already running coding agents — existential pressure drove a radical pivot. Notion faces less immediate pressure and chose the conservative overlay.

### Eriksvik's CIO archetypes map to the patterns

- **IP Fortress** enterprises want Pattern 1 (subagents they control) or reject all patterns
- **Ecosystem Maximizers** want Pattern 5 (AI overlay within their vendor stack) or Pattern 2 (dispatch hub)
- **Agile Assemblers** want Pattern 4 (protocols they can plug/unplug) or Pattern 1 (domain experts they can swap)

### Evidence Level

The taxonomy itself is **Level 1–2** — grounded in real shipped products but not yet validated by enterprise deployment data. The individual patterns vary:

- **Pattern 1 (Subagent):** Level 2 — working code, single vendor
- **Pattern 2 (Dispatch Hub):** Level 2 — deployed with adoption data, single vendor
- **Pattern 3 (Canvas):** Level 2 — deployed, multiple practitioner analyses
- **Pattern 4 (Protocol):** Level 2–3 — deployed with multi-vendor protocol endorsement (20+ companies)
- **Pattern 5 (Overlay):** Level 3 — this is the dominant response, multiple vendors independently doing it

### The naming opportunity

"Headless" is wrong — only Pattern 1 is truly headless. "Agent-native" is closer but vague. The user session's insight was sharper: **the MCP interface is evolving from API wrapper to intent-native domain expert.** The right framing might be "intent-native architecture" — each vendor finding how their product natively receives and executes intent from agents, not just wrapping existing APIs.

### What Cycle 3 Should Investigate

1. **Validate the taxonomy with more vendors.** Do GitHub (Copilot Workspace), Vercel, Supabase, Datadog, PagerDuty fit into one of the five patterns? Or do we need a sixth?
2. **Hunt for Pattern 2 convergence.** If Asana and Monday.com start reporting agent-created issue percentages similar to Linear's 25%, the dispatch hub pattern reaches Level 3.
3. **Usage data for MCP-based integrations.** GitHub stars/forks as proxy? npm downloads for `@stripe/agent-toolkit`? Any proxy for actual adoption.
4. **Enterprise buyer interviews/reports on which pattern they're adopting.** The CIO perspective on "we chose Pattern X because..." would be the strongest validation.
5. **The pricing resolution.** UCP defines a transaction protocol. Snowflake can meter API calls. Linear can charge per agent seat. Each pattern implies a different pricing model — map pricing to architecture.
6. **The "protocol wars" angle.** UCP (commerce), MCP (general), A2A (agent-to-agent) — are these converging or competing? Do vertical protocols (UCP for commerce, something for HR, something for finance) become the standard?
7. **Person-deep-dive: Karri Saarinen.** His thinking trajectory from design tool builder (Airbnb design system) to "issue tracking is dead" is worth mapping. What made a designer-CEO see the agent-first future before most SaaS CEOs?
