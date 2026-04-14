---
title: SaaS Is Going Headless — But Not Like You Think
slug: saas-is-not-going-headless
date: 2026-04-13
status: draft
target: linkedin
---

**Antti Tevanlinna, Bosser**

# SaaS Is Going Headless — But Not Like You Think

Everyone predicted enterprise SaaS would go headless. Strip the UI, expose the endpoints, let agents use the raw business logic. The 2015 headless CMS playbook, rerun for the agent era.

That's not what's happening.

The first wave of agent integrations were just API wrappers with a new hat. REST endpoints repackaged. The agent still had to know your data model, your query language, your edge cases. That was the old "headless" — same pipes, different label.

That was three months ago. What's shipping now is fundamentally different.

The question is no longer whether SaaS tools will talk to agents. It's *how* they delegate, at what granularity, and who does the thinking. That's up for grabs right now. The protocol debate — MCP, CLI, API — is premature. The delegation pattern is what matters.

## What it replaces

Think about what connects your SaaS tools today.

If you're sophisticated: integration platforms. Zapier, Workato, MuleSoft, Power Automate. Entire teams maintaining connector configs, mapping fields, handling auth tokens.

If you're everyone else: people. Copy-paste between tabs. Export CSV, massage it, import to the next system. Have meetings so that the person who knows what's in one system can tell the person who needs it in another.

The human is the middleware.

Both of these — the integration platform and the person shuttling data between tabs — are the same problem at different price points. SaaS tools don't talk to each other, so something has to sit in between.

Four companies just showed four different ways to make that layer disappear.

## Pattern 1: The Domain Brain

Snowflake didn't expose an API wrapper. They shipped a specialist AI agent — Cortex Code — trained on their entire technical stack. Metadata views, dynamic tables, Cortex Search semantics.

When Claude Code hits a Snowflake problem, it doesn't call an API. It delegates to a colleague who knows Snowflake better than it does. Two specialists, one conversation.

The SaaS vendor shipped a *colleague*, not a connector.

## Pattern 2: The Shared Canvas

Figma built Code to Canvas. Claude Code builds UI, pushes to Figma as editable native layers. Designer refines. Pull changes back to code. Keep iterating.

Not read-only. Not write-only. A two-way loop where agent and human are peers on the same surface.

The SaaS vendor became a *collaboration surface*, not a data source.

## Pattern 3: The Dispatch Hub

Linear's CEO declared issue tracking dead. Coding agents are in 75% of their enterprise workspaces. Agent-driven work up 5x in three months.

Linear doesn't track what humans do anymore. It assigns work to Cursor, Devin, Claude Code — and monitors execution. The project management tool became an agent orchestrator.

The SaaS vendor became the *control plane*, not the tracking layer.

## Pattern 4: The Transaction Protocol

Shopify shipped four MCP servers — dev, storefront, catalog, checkout. Every Hydrogen storefront can now expose an agent-ready endpoint with zero custom setup.

Then they went further. Shopify and Google co-developed the Universal Commerce Protocol — a standard for the full commerce journey from discovery to purchase to order management. Endorsed by Etsy, Walmart, Target, Stripe, Visa, Mastercard, Zalando. Twenty-plus companies agreed on how agents buy things.

The SaaS vendor became *infrastructure agents transact through*, not a storefront humans browse.

## What a CTO should take from this

None of these companies went "headless" in the old sense. None stripped the UI and exposed endpoints. Each one found a different answer to the same question: what is our product's role when the primary user is an agent, not a person?

- Snowflake: the domain expert you delegate to
- Figma: the workspace where human and agent iterate together
- Linear: the dispatcher that assigns work to agents
- Shopify: the protocol agents transact through

The delegation style and granularity are different in each case. There is no single "right" architecture. But there is a clear wrong one: doing nothing and hoping the API wrapper is enough.

Three tiers are forming fast:

1. **Redefined their role** — Snowflake, Figma, Linear, Shopify. Agent as peer, not consumer.
2. **Shipping wrappers** — API in MCP clothing. Functional. Agent does all the thinking.
3. **Will be dragged** — Legacy UI-first SaaS. Computer Use as the ugly bridge.

The gap between tier 1 and tier 2 is where the meetings disappear. A wrapper still needs someone — human or agent — who understands both systems. A domain brain, a shared canvas, a dispatch hub — these understand themselves.

Your integration team, your Zapier configs, your Monday morning sync where finance explains the numbers to product — all of it exists because your tools can't participate. When they can, that layer dissolves.

The vendors will get there. The question is whether you're learning what to connect while they build, or waiting until they ship to start.

---

*Antti Tevanlinna builds agent competence for companies navigating the agentic transformation. Trained 200+ people at F-Secure, Neste, and Posti.*

*agents102.bosser.consulting*
