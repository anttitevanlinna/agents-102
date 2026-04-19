# Agent-Ready Data

How leading companies make their data and systems available to agents. Not an architecture doctrine — a progression of approaches, each with different effort, blast radius, and payoff. The student's mental model of "what we'd have to put in place" matures as the training goes: files in Module 2, tools and permissions in Module 4, team-wide access in Module 7, organisational substrate in Module 8.

The frame: **agents get data through five shapes — files, MCP, CLIs, headless SaaS, and semantic models.** Each shape is a real answer; the right answer depends on who the agent serves and what the data already looks like. A company that understands all five can place each of its 200 processes on the right rung. A company that only knows one (usually "build a custom integration") ships one agent a year.

<!-- maintainer -->
**Pass 1 skeleton, 2026-04-19.** Each section is a stub with framing + intended examples. Pass 2 fills in named-practitioner examples as the relevant modules get built.

Module touchpoints:
- M2 — Files as the default (Section 1). Primes the "sources/ first, integrations later" instinct.
- M4 — MCP + CLIs + permissions (Sections 2, 3). Scoped trust is the teaching.
- M7 — Headless SaaS + semantic skills (Sections 4, 5). Sharing at the data layer, not the agent layer.
- M8 — Semantic models as org-level investment (Section 6). The substrate that makes agents compound.

Voice check: the supplementary is business-audience. Earn every technical term. MCP, CLI, API, semantic model — each introduced through a plain analogy before the initials.

Named-company examples to seed Pass 2: Stripe (headless SaaS archetype), Shopify (GraphQL + headless), Block/Cash App (early MCP adopter), Anthropic (MCP authors), dbt Labs + Cube + Looker (semantic layer), Snowflake Cortex, Salesforce Data Cloud, ServiceNow Now Assist data fabric. Research check required before citing — see `continuous-research/` for which are practitioner-verified vs. vendor-claimed.
<!-- end maintainer -->

## Files first — the layer you already have

*Referenced from: Module 2 (building-agent-systems).*

The cheapest way to make data available to an agent is to put it in a folder the agent can read. Markdown, text, PDF, spreadsheets — a well-curated `sources/` folder answers 60-70% of what a business agent needs on day one. No integration project. No vendor conversation. No admin consent. You build the brain first; you wire the systems second.

Why this works: the model's strongest skill is reading text. The model's *weakest* skill is picking the right tool out of fifteen badly-named ones. A team that starts with files and graduates to integrations ships faster than a team that starts with a platform selection.

What this section will cover in Pass 2:
- The `sources/` pattern (raw company material) + `brain/` pattern (curated, indexed) from Module 2
- What goes in files (policies, documentation, meeting notes, strategy docs, FAQs, brand guidelines) vs. what needs a live connection (current inventory, open tickets, today's pipeline)
- The practitioner observation: teams over-integrate and under-curate. The file layer is almost always more valuable than the next integration.
- Named examples (to fill in): practitioner teams publishing their own file-first playbooks — Karpathy's personal wiki pattern, Boris Cherny on `CLAUDE.md`, enterprise teams with `brain/` conventions.

## MCP — the agent's standard plug

*Referenced from: Module 4 (security).*

MCP (Model Context Protocol) is a standard way for an agent to talk to a system — like a universal plug. One side: the agent. Other side: a server that exposes a few named operations on some data. The agent says "list open tickets"; the server returns them. The agent doesn't know the server is Zendesk or Jira or a homegrown thing. The server doesn't know which agent is asking. The protocol in the middle means neither has to know.

Why this matters: before MCP, every agent-to-system connection was a custom integration. MCP turns integrations into plugs. The first company to ship an MCP server for their internal systems gets their agents talking to everything. The second company copies the pattern.

What this section will cover in Pass 2:
- What an MCP server is (a small program that exposes a few operations, runs somewhere the agent can reach)
- Where MCP sits next to older patterns (REST APIs, SDKs) — not a replacement, a thinner layer the agent actually uses well
- The permission story (tools the agent can call, data the tool can see, user whose credentials are in play) — ties directly to Module 4's skills-as-scoped-trust
- Named examples (to fill in, research-verified): Anthropic's reference MCP servers, early enterprise adopters, the pattern of "one MCP server per system" that's emerging
- When NOT to use MCP: one-off scripts, internal CLIs already present, things the file layer solves

## CLIs — the handle agents already grip

*Referenced from: Module 4 (security).*

A CLI is a command-line interface — a text handle on a system. `gh pr create`. `aws s3 ls`. `stripe payments list`. Agents use CLIs exceptionally well because CLIs are *text in, text out*: exactly what the model is best at.

The overlooked insight: most modern SaaS products already ship a CLI. Stripe, GitHub, AWS, Vercel, Cloudflare, Linear, Notion. The agent calls the CLI; the CLI calls the system. No new integration to build. The company's job is to give the agent the credentials and the guidance on which commands to use for what.

What this section will cover in Pass 2:
- The spectrum from "model writes code that calls the CLI" → "model calls the CLI directly" → "model calls an MCP server that wraps the CLI"
- Internal CLIs as a high-leverage, low-cost agent readiness move — far cheaper than new APIs
- Practitioner pattern: wrap the sharpest, safest CLI commands in a skill file so the agent learns them; don't leave the full command surface exposed
- Why a well-crafted CLI beats a poorly-crafted MCP server for the first few agents
- Named examples (to fill in): `gh` as the archetype, internal platform CLIs at named companies

## Headless SaaS — the UI was never the product

*Referenced from: Module 7 (from-personal-to-team).*

Headless SaaS means the product is the API — the UI is one frontend, not the whole thing. Stripe is the archetype: you never *had* to use the Stripe dashboard. You could do everything from the API. That's why agents can drive Stripe on day one.

The trend across the SaaS stack: vendors that treated the UI as the product are scrambling to expose their underlying operations; vendors that were always API-first simply flip the label on their existing surface. The agent-era winners will be the SaaS products whose APIs were already comprehensive and clean.

What this section will cover in Pass 2:
- The API-first vs. UI-first divide (and why it predicts which SaaS products will be agent-friendly)
- The pattern: headless SaaS + MCP wrapper + company's own guardrails = a sharable surface a whole team's agents can use
- Module 7 connection: "share an interface (pull)" is almost always easier to ship if the underlying system is headless — you're wrapping, not rebuilding
- Named examples (to fill in, research-verified): Stripe, Shopify (GraphQL Admin API), Twilio, Segment, modern Linear, Notion. Named anti-patterns: products that still require screen-scraping.
- The internal corollary: treat your company's internal platform like headless SaaS — API first, UI optional — so agents can serve teams that don't yet have their own UI.

## Semantic skills — scoped meaning an agent can invoke

*Referenced from: Module 7 (from-personal-to-team).*

A semantic skill is a bounded capability wrapped around a specific slice of the company's meaning. Not just "call the CRM API" but "find customers matching our definition of *segment* using our definition of *active*." The skill carries the company's language; the agent just invokes it.

Why this matters for sharing: when one person writes the "customer segmentation" skill, everyone else's agent gets it right — for free. The skill travels further than the agent. Module 7's "share a skill" strategy reaches its highest leverage here: one person's careful thinking becomes the whole team's baseline.

What this section will cover in Pass 2:
- Semantic skill = capability + shared definitions + scoped permissions
- How semantic skills differ from generic tool calls (a semantic skill knows what "customer," "active," "revenue" mean in your company)
- The build pattern: start from one person's repeated question, extract the definitions, ship the skill
- Connection to Module 4: scoping a semantic skill = defining a trust boundary around a slice of company meaning
- Named examples (to fill in): practitioner reports of semantic-skill ecosystems at F-Secure-style cohorts, emerging patterns in analytics-adjacent work

## Semantic models — the company's shared meaning, made agent-readable

*Referenced from: Module 8 (agents-building-agents).*

A semantic model is the company's shared understanding of its own entities — customer, order, product, employee, revenue, segment, risk — written down somewhere agents can read. Most companies' semantic models live scattered: a data catalog, a dbt repo, slide decks from the CFO, tribal knowledge. Leading companies are consolidating: one place that defines what "revenue" means, and every agent reads from it.

Why this is the organisational substrate: without a semantic model, every agent invents its own interpretation of "customer." With one, every agent speaks the same language. The compounding that M8 teaches (agents building agents) only works if the agents share meaning — otherwise each new agent reintroduces definitional drift.

What this section will cover in Pass 2:
- The layer stack: raw data → semantic layer → semantic skills → agents
- Practitioner investments: dbt semantic layer, Cube, Looker LookML, Snowflake Cortex, internal data products
- The cost/payoff shape: semantic models are the highest-upfront, highest-compounding investment on this page. Arc 1 companies already have one; Arc 2 companies will build one during the first year post-training.
- The link to Module 8's strategy deliverable: "invest in the semantic layer" is one of the three enablers a CTO walks out recommending
- Named examples (to fill in, research-verified): companies shipping production semantic layers, the gap between vendor pitches and real deployments, practitioner patterns for building one without a two-year project.

## The progression, summarised

| Layer | Effort | Reach | Module |
|---|---|---|---|
| Files | Low | Personal agent | M2 |
| MCP | Medium | Agent ↔ one system | M4 |
| CLIs | Low-Medium | Agent ↔ one system | M4 |
| Headless SaaS | Depends on vendor | Team agents | M7 |
| Semantic skills | Medium-High | Whole team's agents | M7 |
| Semantic model | High | Whole company's agents | M8 |

Start at the top. Each rung unlocks a new set of agents and a new set of people. Most companies are still at "files" — which is fine, and also a lot better than where they were a year ago.
