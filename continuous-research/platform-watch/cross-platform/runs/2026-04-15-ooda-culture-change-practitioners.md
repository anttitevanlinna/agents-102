# OODA Cycle: AI-Era Organizational Culture Change — Practitioner Accounts

**Date:** 2026-04-15
**Method:** People-first research — searched for named individuals' direct output, not topic searches
**Focus:** Who actually wrote about living through AI culture change at their org?

---

## 1. Yoav Lax — AI Solutions Architect, Varonis

**Evidence level:** Level 2 (single experiment, practitioner reporting own results)
**Source type:** [vendor blog — but written by the practitioner, not marketing]

**What he wrote:** "From Hype to Culture: How We Turned AI Adoption into Everyday Impact" (March 3, 2026)
**URL:** https://www.varonis.com/blog/impact-of-ai-adoption-engineering

**What actually happened:**
- Lax spent two years moving AI from experimentation to everyday engineering practice at Varonis
- Created an **AI Guild** — "an exclusive hub of practitioners who shape standards, share patterns, and unblock teams"
- Appointed **AI Champions** across teams as "field agents" for enablement
- Ran hands-on workshops lifting people from basic to advanced usage in a single day
- Ran internal **gen AI hackathons** focused on real day-to-day problems (not blue-sky projects) — described as "dry runs" before touching core product code
- Built an **internal AI Hub** — a web app centralizing how teams discover, use, and measure AI
- **Result:** 100% engineering team adoption by 2025, faster delivery cycles, fewer production bugs

**Assessment: Genuine culture change or just tool adoption?**
This is genuine culture change — the guild/champions structure, the measurement obsession, and the hackathon-as-safe-space approach all show deliberate organizational design, not just "we gave everyone Copilot." The AI Hub as organizational infrastructure (not just a tool) is the telling detail. However, this is a company blog post, so the failure modes and resistance are likely understated. We don't hear about who pushed back or what didn't work.

**Limitation:** Published on Varonis corporate blog. While written by the practitioner (not marketing), it's still a company blog — the incentive structure skews toward success narrative. No counter-evidence about what failed.

---

## 2. Farhan Thawar — VP & Head of Engineering, Shopify

**Evidence level:** Level 2 (single experiment, practitioner reporting own results — but unusually detailed across multiple interviews)
**Source type:** [practitioner direct] via multiple channels

**What he said/wrote:**

### First Round Capital interview: "From Memo to Movement: Shopify's Cultural Adoption of AI" (2026)
**URL:** https://www.firstround.com/ai/shopify
- Thawar brought GitHub Copilot into Shopify "so early he couldn't even pay for the product yet"
- Achieved **80% Copilot adoption a year before ChatGPT's release** — the culture was already there before Tobi's memo
- AI reflexiveness is now part of **biannual performance reviews** — "how quickly they turn to AI when encountering problems"
- Shopify scaled interns from 25 to potentially 1,000 because "they're using AI in interesting ways and have a beginner's mindset"
- Internal **prompt library** for reusing workflows
- Warning: "If you don't figure out how to harness the agents in 2026, you'll be behind"

### Pragmatic Engineer podcast (July 2, 2025, live at LDX3 London)
**URL:** https://newsletter.pragmaticengineer.com/p/how-ai-is-changing-software-engineering
- Shopify's internal LLM proxy routes all AI requests through a single platform layer
- **Unlimited token usage** policy — uses an internal leaderboard of who's spending the most on Cursor tokens as a proxy for value
- Every engineering director and above hire must pass a **coding interview** — "still deeply in love with technology"
- Candidates who use copilot in interviews typically outperform those who don't

### Bessemer Venture Partners interview (2026)
**URL:** https://www.bvp.com/atlas/inside-shopifys-ai-first-engineering-playbook
- Estimates team is **20% more productive**
- 2026 move: agentic harnesses — 10 agents working simultaneously with human review and merge, or sequential critique loops (45+ minute thinking sessions)
- "Infrastructure must make experimentation cheap and safe, culture must encourage engineers to reach for AI by default, and guardrails must ensure that teams move faster without sacrificing quality"

**Assessment: Genuine culture change or just tool adoption?**
This is the strongest practitioner account in the set. Thawar is a named VP speaking on the record across multiple venues with specific details — token leaderboards, performance review criteria, intern scaling, infrastructure decisions. The critical insight: Shopify's culture shift predated the famous memo by years. The memo accelerated something already underway. This is genuine culture change because it changed hiring criteria, performance evaluation, org structure (more interns, fewer seniors per project), and infrastructure.

**Counter-evidence:** Glassdoor reviews paint a different picture. Employees report "the wonderful people focused culture Shopify once had is dead" and "morale and engagement is extremely low." The Logic (Canadian outlet) reported that "constant layoffs have left employees exhausted and afraid." The AI mandate occurred alongside 14% headcount cuts (2022), 20% cuts (2023), and a further 2.5% by December 2024. The culture story from leadership and the culture story from the floor may be very different stories.

---

## 3. Sebastian Siemiatkowski — CEO, Klarna (the counter-case)

**Evidence level:** Level 2 (single experiment — but the failure is the finding)
**Source type:** [general press] — Bloomberg, Fortune, CNBC interviews with the CEO himself

**What happened:**
- Klarna deployed OpenAI chatbot across 23 markets in January 2024, handled 2.3M conversations in first month
- Claimed AI was "doing the work of 700 customer service agents"
- Company shrank from ~5,000 to ~3,000 employees (40% reduction)
- **The reversal (May 2025):** Siemiatkowski told Bloomberg: "As cost unfortunately seems to have been a too predominant evaluation factor when organizing this, what you end up having is lower quality"
- By spring 2025, began rebuilding human customer service with an "Uber-style" flexible workforce model
- **October 2025:** Siemiatkowski warned that other "tech bros" are "sugarcoating just how badly" AI will impact jobs — a remarkable pivot from AI-cheerleader to doomsayer

**What went wrong culturally:**
- No practitioner voice from inside Klarna has surfaced — the only voice is the CEO's
- External analysis (Chad Bockius, "When the Metrics Lie"): Klarna optimized for resolution speed and cost per ticket. "What it didn't measure was trust erosion, brand promise abandonment, and customer frustration accumulating invisibly"
- Employees "were notified via pre-recorded videos and blanket emails, leaving many feeling discarded and devalued"
- No evidence that displaced people were consulted, involved in testing, or empowered to influence AI workflows
- Gary Marcus dubbed this "The Klarna Effect" — the arc from premature AI triumph declaration to quiet human rehiring

**Assessment: Culture change or just cost-cutting dressed as transformation?**
This was cost-cutting dressed as culture change. The culture change was imposed top-down with no practitioner involvement, no quality feedback loop, and no hybrid model. The cultural lesson is what DIDN'T happen: no guild, no champions, no measurement of what matters (customer trust), no safe space for experimentation. Klarna skipped straight to replacement. The reversal proves the pattern: you can't skip the competence-building step.

**Key URLs:**
- Fortune (May 2025): https://fortune.com/2025/05/09/klarna-ai-humans-return-on-investment/
- Fortune (Oct 2025): https://fortune.com/2025/10/10/klarna-ceo-sebastian-siemiatkowski-halved-workforce-says-tech-ceos-sugarcoating-ai-impact-on-jobs-mass-unemployment-warning/
- Chad Bockius analysis: https://chadbockius.com/case-studies/klarna/
- Gary Marcus "The Klarna Effect": https://garymarcus.substack.com/p/ai-layoffs-productivity-and-the-klarna

---

## 4. Tracey Franklin — Chief People and Digital Technology Officer, Moderna

**Evidence level:** Level 2 (single experiment) — but almost entirely mediated through press interviews, not direct practitioner writing
**Source type:** [domain trade publication] — UNLEASH, BioPharma Dive interviews

**What happened:**
- Moderna merged HR and IT under Franklin's title: "Chief People and Digital Technology Officer"
- Deployed 3,000+ GPT agents across all business units by mid-2025
- 80% employee adoption of mChat (internal ChatGPT) within months of launch
- Shifted from "workforce planning" to **"work planning"** — managers assess tasks based on whether they should be automated, augmented, or performed by a person
- Created "Generative AI Champions" network — ran AI prompt contests to find top 100 power users who became internal champions
- Set up local office hours and internal AI forum on Slack
- AI discussions integrated into three-day in-person onboarding from day one

**Assessment: Genuine culture change or tool adoption?**
The HR+IT merger is structurally interesting — it signals that Moderna views people and digital technology as inseparable, not parallel tracks. The "work planning vs. workforce planning" reframe is genuine conceptual change. The champions network mirrors Varonis's guild approach. However, we're getting this entirely through Franklin's interviews with trade publications and through the OpenAI partnership narrative. No rank-and-file Moderna employee has written publicly about what this actually felt like. The 3,000 GPTs stat comes from Moderna's partnership with OpenAI — it's partially a vendor co-marketing story.

**Limitation:** Brad Miller (former CIO who built mChat) left Moderna in June 2025 to become President of CoreAI at Keystone.ai. His departure may tell a story about what's working vs. what's claimed, but he hasn't written publicly about it.

**Key URLs:**
- UNLEASH interview: https://www.unleash.ai/artificial-intelligence/why-moderna-merged-hr-and-it-to-better-architect-the-flow-of-work/
- Flexos analysis: https://www.flexos.work/learn/moderna-merges-hr-it-new-chief-manages-3000-ai-and-5800-humans
- Moderna blog: https://www.modernatx.com/en-US/media-center/all-media/blogs/moderna-powered-AI

---

## 5. Mike Fisher — CEO MyFitnessPal, former CTO Etsy

**Evidence level:** Not found for AI culture change specifically
**Source type:** N/A

**What I found:**
- Fisher runs "Fish Food for Thought" substack (7,000+ subscribers) on leadership, culture, and scaling
- Posts on "Culture Debt," "Challenge Network," "Speed Is Never Just Speed," "Frameworks"
- One mention of using AI as part of a "challenge network" (having AI question your strategy documents)
- **No specific "Build the Right Thing" book or article found** as of April 15, 2026
- No dedicated post on AI culture transformation at an organization level

**Assessment:** Fisher writes about engineering culture broadly but hasn't (yet) published a practitioner account of AI culture change. The "Build the Right Thing" reference from the research brief may be premature or unpublished. Worth monitoring his substack — he has the experience and platform to write this piece.

**URL:** https://mikefisher.substack.com/

---

## 6. Bonus: Chris Roth — "Building An Elite AI Engineering Culture In 2026"

**Evidence level:** Level 1-2 (practitioner analysis drawing on data from 250K+ developers)
**Source type:** [practitioner analysis]

**What he wrote:** Blog post (February 18, 2026) drawing on Opsera's 2026 AI Coding Impact Benchmark and case studies from Linear, Cursor, Vercel, Stripe, Resend.
**URL:** https://cjroth.com/blog/2026-02-18-building-an-elite-engineering-culture

**Key findings:**
- Senior engineers realize **5x the productivity gains** of junior engineers from AI tools
- The dissolution of the design-engineering boundary is the most consequential organizational change in 2025-2026
- Structured context (AGENTS.md, architectural guardrails, spec-driven development) separates culture change from tool adoption
- Three-person engineering units becoming standard at frontier companies
- "Stacked PRs" moved from Meta/Google internal to startup standard

**Assessment:** This is practitioner analysis, not practitioner experience — Roth is synthesizing what others are doing, not reporting on his own org. But the synthesis is grounded in specific companies and measurable practices, not frameworks. Useful as a convergence indicator.

---

## Convergence Assessment

**Pattern emerging (approaching Level 3):**

Three independent practitioners (Lax/Varonis, Thawar/Shopify, Franklin/Moderna) describe the same playbook for genuine AI culture change:
1. **Champions/Guild structure** — not top-down mandate, but distributed enablement through identified power users
2. **Safe experimentation space** — hackathons, prompt contests, internal forums before production use
3. **Measurement of adoption** — token leaderboards (Shopify), adoption percentages (Varonis), GPT counts (Moderna)
4. **Infrastructure, not just tools** — internal LLM proxy (Shopify), AI Hub (Varonis), mChat platform (Moderna)
5. **Performance review integration** — making AI usage a formal evaluation criterion

And one counter-case (Klarna) that shows what happens when you skip all five: cost-cutting dressed as culture change, quality collapse, public reversal.

**The convergence signal:** Culture change that sticks requires organizational infrastructure (guilds, hubs, proxies), not just CEO memos. Shopify's story is instructive — the memo accelerated adoption, but the culture was already 80% Copilot-adopted before the memo existed. The infrastructure preceded the mandate.

**The Klarna inversion:** Klarna had the CEO mandate but none of the infrastructure. The result was replacement, not transformation. The "Klarna Effect" (Gary Marcus's term) may become the canonical cautionary tale of the AI era.

---

## What I Did NOT Find

1. **No rank-and-file Moderna employee** has written publicly about what AI culture change feels like from the inside. We only have C-suite interviews and vendor co-marketing materials. The 3,000 GPTs claim is unverifiable from outside.

2. **No Shopify employee below VP level** has written publicly about the culture change experience. Glassdoor reviews suggest the floor-level story may contradict the leadership narrative. The "prove AI can't do it" hiring policy has no public account of how it's actually applied in practice.

3. **No former Klarna employee** has written a detailed insider account of what the AI transition felt like. The entire narrative comes from the CEO and external analysts. The displaced customer service agents are voiceless.

4. **Mike Fisher** hasn't published on AI culture change despite having the credibility and platform.

5. **No Nordic practitioner accounts** of AI culture change emerged. Klarna is Swedish but the story is a CEO narrative, not a practitioner one. The Nordic gap remains.

6. **No HR/operations/finance practitioner** has written about culture change for AI in their function. All accounts are from engineering/technology leaders. The business function side of AI culture change has no practitioner voice.

7. **No "it failed and here's why" practitioner account** from inside a company (as opposed to external analysis of Klarna). The failure stories are all told by outsiders or by the CEO doing damage control. Nobody who lived through a failed AI culture change has written about it.

---

## Research Quality Notes

- **Confirmation bias check:** The Klarna counter-case and the Shopify Glassdoor counter-evidence were actively sought, not stumbled upon. The gap between leadership narratives and employee experience is real and underreported.
- **Freshness:** All sources from October 2024 to April 2026. The Varonis (March 2026), Shopify/Bessemer (2026), and Shopify/First Round (2026) pieces are fresh.
- **Source quality:** Thawar/Shopify is the strongest source — practitioner speaking on record across three independent channels with specific details. Lax/Varonis is second but limited by corporate blog format. Franklin/Moderna is weakest — mediated through trade press and entangled with OpenAI co-marketing.
- **What would upgrade this:** (a) A rank-and-file employee at any of these companies blogging about their experience, (b) a practitioner who led a *failed* AI culture change writing about it honestly, (c) a Nordic company practitioner account.
