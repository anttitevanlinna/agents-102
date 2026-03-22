# Business-Domain AI Agent Practitioners — Search Log

**Date:** 2026-03-22
**Purpose:** Find named practitioners deploying AI agents in business domains (NOT coding agents)
**Method:** Web search for specific practitioner names, first-person accounts, and domain-specific deployment stories

---

## Practitioners Found

### 1. Jason Lemkin & Amelia Lerutte — Sales/GTM Agents at Scale

**Jason Lemkin** — Founder & CEO, SaaStr
**Amelia Lerutte** — Chief AI Officer, SaaStr

- **Domain:** Sales, marketing, go-to-market operations
- **Segment:** B (enterprise team — SaaStr is a media/events company with real revenue)
- **What they built:** 20+ AI agents across entire GTM stack, replacing a team of 10 SDRs/AEs with 1.2 humans + 20 agents. Agents book meetings, sell tickets, answer support questions, generate revenue. 70,000 hyper-personalized emails (up from 7,000 human-sent). 15% of SaaStr London revenue from AI-generated emails. $1M+ closed sponsorship revenue with 71% of closed-won deals from agent-qualified leads.
- **Platform:** Salesforce Agentforce as central hub, plus Qualified and other tools
- **Where they publish:** [SaaStr blog](https://www.saastr.com/what-we-actually-learned-deploying-20-ai-agents-across-our-entire-go-to-market-8-months-in/), [Lenny's Newsletter](https://www.lennysnewsletter.com/p/we-replaced-our-sales-team-with-20-ai-agents), SaaStr podcast, X.com (@jasonlk)
- **Evidence level:** Level 2 (single experiment, well-documented). Multiple independent media covered it (Lenny, Yahoo Finance, Slashdot).
- **Source type:** [practitioner direct] — their own blog and podcast
- **Key insight:** "Training is more important than picking the perfect vendor." Every agent required 30+ days of intensive training, then weekly maintenance. They spend 15-20 hours/week managing agents.
- **WATCH:** Are other media/events companies replicating this pattern? If 5+ companies report similar results → Level 3.

### 2. Brandon Gell — Agent-Native Operations

**Brandon Gell** — COO, Every Inc.

- **Domain:** Operations, strategy, business automation
- **Segment:** A/B bridge (small company doing it as practitioners, then consulting enterprises)
- **What they built:** "Agent-native operations" — AI agents embedded in ops workflow. Shared prompt for strategy planning agent used for Every's entire 2026 strategy. Built "Zosia" (personal agent via iMessage for household/business tasks). Previously founded and sold Clyde (insurtech, $50M raised, 100+ employees).
- **Platform:** Claude Code, various agent tools
- **Where they publish:** [X.com/@bran_don_gell](https://x.com/bran_don_gell), [Every.to](https://every.to/@brandon_5263)
- **Evidence level:** Level 2 (single experiment, documented publicly)
- **Source type:** [practitioner direct]
- **Key insight:** "Agent-native apps" where AI operates the software the same way you would — accessing every button, setting, and feature.

### 3. Natalia Quintero — Enterprise AI Adoption Consulting

**Natalia Quintero** — Head of Consulting, Every Inc.

- **Domain:** Cross-domain (finance, media, tech — worked with 100+ companies including NYT, hedge fund Walleye Capital)
- **Segment:** B (enterprise bridge — consulting at scale)
- **What she built:** Seven-figure AI consulting business. Worked with hedge funds managing $100B+ AUM. Methodology: granular workflow mapping → identify automation potential → implement.
- **Where they publish:** [Every.to articles](https://every.to/p/i-talked-to-more-than-100-companies-about-ai-here-s-what-s-actually-working), Every podcast
- **Evidence level:** Level 2-3 (synthesizes patterns across 100+ companies, but evidence is filtered through her lens)
- **Source type:** [practitioner direct]
- **Key insight:** "You're not implementing a tool. You're helping people rethink how they work." Organization's ability to adapt AI is directly correlated with CEO's own AI skills.

### 4. Virat Singh — Financial Research Agents

**Virat Singh** — Founder, Financial Datasets

- **Domain:** Finance / financial research
- **Segment:** A (solo builder, open source)
- **What he built:** "Dexter" — autonomous financial research agent (18.1K GitHub stars). Also "ai-hedge-fund" (49.4K stars) — multi-agent system for trading decisions using 6 specialized agents (market data, quant, fundamentals, sentiment, risk, portfolio). Dexter described as "Claude Code, but for finance."
- **Platform:** LangChain, TypeScript, multiple LLM providers (OpenAI, Anthropic, Ollama)
- **Where they publish:** [X.com/@virattt](https://x.com/virattt), [GitHub/virattt](https://github.com/virattt)
- **Evidence level:** Level 2 (working code, publicly available, community validated — Ethan Mollick played with it)
- **Source type:** [practitioner direct]
- **Stanford background.** Building Financial Datasets toward $100M ARR.
- **Key insight:** Multi-agent architecture with self-validation — agent checks its own outputs and refines until confident.

### 5. Ray Lau & Erik Yao — Finance/Accounting Agent (Luca)

**Ray Lau** — CEO, Leapfin
**Erik Yao** — CTO, Leapfin

- **Domain:** Finance / accounting (revenue recognition, reconciliation)
- **Segment:** B (product company with enterprise customers including Reddit, GoodRx, SeatGeek)
- **What they built:** "Luca" — AI agent for accounting workflows. Uses Claude as core LLM with radical constraints. Custom JavaScript-based DSL for accounting automation. In production automating order-to-cash workflows for companies processing billions of transactions. Compliance reviews in 60 seconds. Self-documenting (SOX-compliant documentation).
- **Platform:** Claude (constrained), custom DSL
- **Where they publish:** [Leapfin blog](https://www.leapfin.com/blog/building-luca-an-ai-agent-for-finance-and-accounting-workflows-that-auditors-actually-trust)
- **Evidence level:** Level 2 (single company, real production deployment with named customers)
- **Source type:** [practitioner direct] — detailed technical blog about architecture decisions
- **Key insight:** "Building AI for accounting isn't about finding a smarter model — it's about building an architecture that forces reliability." They constrain the LLM heavily — it architects, doesn't execute freely.
- **CAVEAT:** Leapfin is a vendor, so their blog is partly marketing. But the technical depth of the "Building Luca" post goes well beyond typical vendor content.

### 6. Tal Raviv — AI Agents for Product Management

**Tal Raviv** — PM, previously at Patreon, AppsFlyer, Riverside

- **Domain:** Product management workflows
- **Segment:** A/B bridge (solo practitioner teaching 20,000+ PM leaders including at Apple, Google, Amazon, Microsoft, Meta)
- **What he built:** Personal AI copilot methodology for PMs. Hands-on playbooks for AI agents in PM workflows. "Build AI product sense by using AI agents for real work" newsletter.
- **Platform:** Claude Code, Cursor
- **Where they publish:** [Substack (talraviv.co)](https://www.talraviv.co/), [Lenny's Newsletter](https://www.lennysnewsletter.com/p/build-your-personal-ai-copilot), [Maven courses](https://maven.com/tal-raviv/product-manager-productivity-system)
- **Evidence level:** Level 2 (personal methodology, teaching at scale)
- **Source type:** [practitioner direct]
- **Key insight:** "We learned more about how AI products work in three months using Cursor for daily tasks than in three years of using ChatGPT." Coding agents expose their reasoning transparently — that's where PM AI fluency comes from.

### 7. Sebastian Siemiatkowski — Enterprise AI Operations (Klarna)

**Sebastian Siemiatkowski** — CEO, Klarna

- **Domain:** Customer service, operations, company-wide workforce transformation
- **Segment:** B (enterprise — Klarna is a major fintech)
- **Nordic:** YES — Klarna is Swedish
- **What they deployed:** AI agent handling 2/3 of customer service chats (equivalent of 850 human agents). Reduced workforce from 5,527 to ~2,907 through attrition + AI. Revenue per employee tripled ($300K → $1.3M). Average resolution time cut from 11 min to under 2 min.
- **Platform:** OpenAI/ChatGPT partnership
- **Where they publish:** Press interviews, conference talks, IPO prospectus
- **Evidence level:** Level 2 (single company, extensively documented in IPO filing + media)
- **Source type:** Mix — [general press] for most coverage (Fortune, CNBC), but IPO prospectus is primary source
- **Key insight:** Admitted aggressive AI cuts went too far — now rehiring humans in "Uber-style" blended model. Quality suffered. "The business knowledge of non-coders is increasingly valuable." Course correction is the most interesting part of the story.
- **WATCH:** The Klarna course correction (from "fire everyone" to "hire back selectively") is potentially more valuable than the initial hype.

### 8. Mikko Alasaarela — Nordic AI Community & Agent Governance

**Mikko Alasaarela** — Founder, Agion & Agentics Finland

- **Domain:** AI agent governance, enterprise AI platforms
- **Segment:** A/B bridge (entrepreneur building governance platform + running community)
- **Nordic:** YES — Helsinki-based
- **What he built:** Agion (agion.dev) — AI agent governance platform for enterprise. Agentics Finland community. Has founded 7 tech startups, 3 exits, $30M+ raised.
- **Where they publish:** [X.com/@alasaarela](https://x.com/alasaarela), SHIFT Business Festival, LinkedIn
- **Evidence level:** Level 1 (opinion/early stage — Agion is pre-revenue/early, community is nascent)
- **Source type:** [practitioner direct]
- **Key insight:** "Companies must recognize the value of their own data and learn to mobilize tacit knowledge for agents." Internal data = most critical competitive advantage for European companies.

### 9. Janne Pulkkinen — AI Agent Governance (Finland)

**Janne Pulkkinen** — Co-founder & CEO, Agion Oy

- **Domain:** AI agent governance for enterprise
- **Segment:** A (startup, early stage)
- **Nordic:** YES — Helsinki-based
- **What he built:** Agion — "full-stack operating system to safely deploy, guide, govern, and audit thousands of AI agents." Claims O(1) governance complexity, 95%+ automated decisions, GDPR & EU AI Act compliance.
- **Where they publish:** [LinkedIn](https://www.linkedin.com/in/janne-pulkkinen-28557619/), Finnish AI events
- **Evidence level:** Level 1 (early stage, claims unverified)
- **Source type:** [practitioner direct]

### 10. Nick Poloni — AI Agent for Recruiting

**Nick Poloni** — President, Cascadia Search Group

- **Domain:** Recruiting / HR
- **Segment:** A (solo/small company practitioner)
- **What he built:** Used Pin.com's AI recruiting agent. Closed $1M+ in billings in final 4 months of 2025, working solo.
- **Platform:** Pin.com
- **Where they publish:** Testimonial on [Pin.com blog](https://www.pin.com/blog/agentic-ai-recruiting/)
- **Evidence level:** Level 2 (single experiment, specific dollar amount)
- **Source type:** [domain trade publication] — Pin's blog (vendor context, but named practitioner with specific outcome)
- **CAVEAT:** This is on a vendor's blog, so it's closer to Level 0. The named person + specific dollar figure gives it slightly more weight than anonymous case studies.

---

## What We Searched For But Did NOT Find

1. **Nordic practitioners deploying agents in business domains (besides Klarna).** The Agentics Finland community exists but no named practitioners with documented business-domain agent deployments surfaced. Agion (Alasaarela/Pulkkinen) is building governance tooling, not deploying business agents. This is the biggest gap.

2. **HR practitioners who built and documented their own agent deployments.** All HR content was vendor marketing or analyst predictions. No "I'm an HR leader and I built this agent" blog posts found.

3. **Compliance/legal practitioners with documented agent deployments.** The compliance space is dominated by vendor content (Thomson Reuters CoCounsel, LexisNexis Protege). No named compliance officers or legal practitioners blogging about their own agent builds.

4. **Finance controller/CFO practitioners blogging about agent deployment.** All finance content was vendor marketing (ChatFin, SafeBooks, Leapfin). Ray Lau is the closest, but he's the vendor CEO, not a customer.

5. **Supply chain/procurement practitioners with documented agent results.** Philip Ideson (Art of Procurement podcast) covers the space extensively but is a journalist/analyst, not a deployer. No named CPOs or procurement leads blogging about their own deployments.

6. **Customer success practitioners (besides Lemkin/Lerutte at SaaStr).** The SaaStr case is well-documented but it's the only first-person GTM agent deployment story with specific metrics.

7. **Solo builders deploying agents for non-coding business tasks on X.com or personal blogs.** The "builder" community on X.com is overwhelmingly focused on coding agents, developer tools, and AI infrastructure. Business-domain agent builders are nearly invisible on the platform.

---

## Emerging Convergence Patterns

### Pattern 1: "Training > Tooling" (Level 2, approaching Level 3)
Multiple independent sources say the same thing: agent quality depends more on training/prompting/context than on platform choice. Lemkin (SaaStr), Quintero (Every), and Leapfin (Luca) all independently arrived at "invest in training the agent, not picking the perfect vendor." If 2-3 more enterprise teams report this, it's Level 3.

### Pattern 2: "1-2 humans + N agents = team of 8-10" (Level 2)
SaaStr: 1.2 humans + 20 agents = 8-10 humans. Klarna: AI agent = 850 human agents in customer service. Every: 15-person company with AI writing 100% of code. The specific ratio varies, but the pattern of "small human core + agent fleet" is appearing across multiple companies.

### Pattern 3: "Agent quality degrades without active management" (Level 2, approaching Level 3)
Klarna admitted quality suffered and started rehiring. Lemkin spends 15-20 hours/week managing agents. Leapfin built architecture to constrain the LLM. Independent signals all point to: agents are not fire-and-forget. Active human oversight is essential. This is a counter-narrative to the vendor hype of "autonomous agents."

### Pattern 4: "Business knowledge > coding skill for agent-era roles" (Level 2)
Siemiatkowski (Klarna): "The business knowledge of non-coders is increasingly valuable." Quintero (Every): "Organization's ability to adapt AI is directly correlated with CEO's own AI skills." Raviv: PM domain knowledge is the bottleneck, not technical skill. Haines (already on roster): marketing domain expertise encoded as Claude Code skills. Same pattern from 4+ independent sources across different domains.

---

## Recommendations for Source Roster Updates

**Add to Segment A (Solo Builders):**
- Virat Singh (@virattt) — financial research agents, open source
- Tal Raviv — PM workflow agents, teaching at scale

**Add to Segment B (Enterprise Teams):**
- Jason Lemkin + Amelia Lerutte — SaaStr GTM agent deployment (20+ agents, documented results)
- Ray Lau — Leapfin/Luca (finance agent in production, with caveats about vendor status)
- Natalia Quintero — Every consulting (cross-domain enterprise AI adoption patterns)
- Brandon Gell — Every operations (agent-native ops)

**Add to Segment C (Nordic):**
- Mikko Alasaarela — Agentics Finland, Agion (governance/community)
- Janne Pulkkinen — Agion (governance platform)
- Sebastian Siemiatkowski — Klarna (enterprise AI transformation, course correction)

**Business-domain practitioners still NOT on any roster:**
- HR deployers (zero found)
- Compliance/legal deployers (zero found)
- Finance controller/CFO deployers (zero found — only vendors)
- Supply chain/procurement deployers (zero found — only analysts)
- Customer success deployers (only SaaStr found)
