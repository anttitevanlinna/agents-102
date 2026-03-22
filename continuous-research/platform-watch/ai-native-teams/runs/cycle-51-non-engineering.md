# Cycle 51: AI-Native Teams Beyond Engineering

**Date:** 2026-03-22
**Focus:** Non-engineering AI-native teams — marketing, finance, operations, HR, legal, customer service
**Prior finding (cycle 49):** Zero non-engineering AI-native teams found

## Executive Summary

Cycle 49's finding stands largely confirmed: **there are still zero documented cases of a non-engineering team that has fully reorganized around AI as co-worker in the way engineering teams have.** However, this cycle found two significant partial signals and one major counter-signal that together tell a more nuanced story.

The gap is real but the reason is becoming clearer: non-engineering AI-nativeness looks structurally different from engineering AI-nativeness. Engineering teams can reorganize because AI can write and verify code end-to-end. Non-engineering functions lack this clean "AI produces, human reviews" loop — the work is more ambiguous, harder to evaluate, and harder to delegate fully.

## Findings

### Finding 1: Intercom's Customer Support Team — Closest to AI-Native Outside Engineering

**Evidence level:** Level 2 (single company, practitioner direct)
**What:** Intercom restructured their entire customer support operation around their AI agent (Fin), which now resolves 81% of all support volume. This is not just deploying a chatbot — they created new roles, restructured job families, and fundamentally changed how support staff spend their time.

**Specific changes to daily work:**
- Created new roles: AI Operations Lead ("air-traffic controller" for Fin), Knowledge Manager (evolved from Help Center Manager), Conversation Designer (brand new role), Support Operations expansion
- Restructured human roles into "Technical Support Specialist" and "Technical Support Engineer" to reflect increasingly complex remaining work
- Reset expectations: staff time explicitly split between "supporting customers" and "improving AI"
- Allocated dedicated "out of the inbox" time for content improvement and AI optimization
- Implemented skills-based routing for human-handled cases

**Measurable outcomes:**
- 81% automation rate (up from 25% initial deployment)
- Absorbed 300%+ increase in customer demand since 2022 without proportional headcount growth
- Avoided ~100 additional CS hires = $7.5M-$9M annual savings
- 6,000+ customers using Fin with average 66% resolution rate, 20% achieving 80%+

**Why it matters:** This is the closest thing to a non-engineering AI-native team found anywhere. The human role genuinely changed from "answer questions" to "improve and direct AI." However, it's also the vendor eating their own dog food — Intercom sells this product, so their internal deployment has unique advantages (early access, internal expertise, motivation to demonstrate success).

**Source:** [Intercom blog — Transformation in action](https://www.intercom.com/blog/automate-customer-service-while-improving-customer-experience/) by Declan Ivory, VP Customer Support — [practitioner direct / vendor case study hybrid]
**Source:** [Inside the AI-First Support Team](https://www.intercom.com/blog/inside-the-ai-first-support-team/) — Dec 2, 2025 — [practitioner direct / vendor case study hybrid]

**Caveat:** Source classification is tricky. Declan Ivory is a practitioner describing his team's real experience (Level 2). But it's also published on Intercom's company blog to sell Fin (Level 0). We classify this as Level 2 with a vendor-interest caveat. The specific operational details (new roles, restructured job families, dedicated AI improvement time) are too granular to be marketing fiction.

---

### Finding 2: Klarna Customer Service — The AI-Native Reversal (Counter-Signal)

**Evidence level:** Level 3 (convergence — multiple independent sources confirm)
**What:** Klarna replaced ~700 CS agents with an AI chatbot (OpenAI partnership), claimed 75% of customer chats handled by AI (2.3M conversations). Then reversed course in early 2026, admitting quality dropped and rehiring humans.

**The reversal:**
- CEO Sebastian Siemiatkowski: "We focused too much on efficiency and cost. The result was lower quality, and that's not sustainable."
- Chatbot struggled with nuanced tasks (refund negotiations, multilingual edge cases), creating "Kafkaesque loops" where customers repeated issues to humans after bot failed
- Now piloting "Uber-style" blended model — hiring remote agents (students, rural populations) with flexible schedules
- Klarna's official counter: "We are not reversing on AI... AI assistant now performs work of over 800 full-time roles... The pilot reflects a dual-track approach"

**Why it matters as counter-signal:** Klarna is the highest-profile attempt at making a non-engineering function (customer service) AI-native, and it partially failed. The failure mode is instructive: CS work requires empathy, nuance, and judgment that current AI handles poorly at scale. This aligns with the Forrester/Orgvue finding that **55% of companies that made AI-driven layoffs already regret it** (survey of 1,163 C-suite leaders, Feb-Mar 2025).

**Sources:**
- [FinTech Weekly — Klarna reverses](https://www.fintechweekly.com/magazine/articles/klarna-hires-customer-service-after-ai-pivot) — [domain trade publication]
- [Reworked — Klarna rehiring](https://www.reworked.co/employee-experience/klarna-claimed-ai-was-doing-the-work-of-700-people-now-its-rehiring/) — May 2025 / updated Feb 2026 — [domain trade publication]
- [Orgvue — 55% regret study](https://www.orgvue.com/news/55-of-businesses-admit-wrong-decisions-in-making-employees-redundant-when-bringing-ai-into-the-workforce/) — [academic/research survey]
- [HR Executive — AI layoff trap](https://hrexecutive.com/the-ai-layoff-trap-why-half-will-be-quietly-rehired/) — [domain trade publication]

---

### Finding 3: Goldman Sachs — Finance/Compliance Agents (Early Stage, Not Yet AI-Native)

**Evidence level:** Level 2 (single company, general press reporting)
**What:** Goldman Sachs deployed Anthropic's Claude for trade accounting, transaction reconciliation, client vetting/onboarding (KYC/AML compliance). Anthropic engineers embedded at Goldman for 6 months co-developing agents. CIO Marco Argenti described agents as "digital colleagues."

**What specifically changed:**
- Agents review documents, extract entities, make "micro decisions within boundaries"
- Handle KYC determinations (e.g., whether co-ownership requires separate filing)
- Process exceptions in daily transaction flow (hundreds of millions of transactions, 1% = thousands of manual cases)
- Humans retain final decision authority

**What did NOT change (yet):**
- No specific measurable results disclosed beyond "could handle 5-10x the cases" (theoretical)
- No evidence of team restructuring or daily practice redesign
- No headcount changes — Argenti frames it as "shifts" not reductions
- This is still "AI as powerful tool" not "AI as co-worker that changed how we organize"

**Why it matters:** Goldman is the most prominent example of a financial institution deploying agentic AI in non-engineering functions. But it's early stage — tool deployment, not team transformation. The team hasn't reorganized around the agents; the agents are being added to existing workflows.

**Source:** [PYMNTS — Goldman Sachs lets AI agents do accounting](https://www.pymnts.com/artificial-intelligence-2/2026/goldman-sachs-lets-ai-agents-do-accounting-and-compliance-work/) — Feb 2026 — [general press]
**Source:** [American Banker — Goldman equips AI agents](https://www.americanbanker.com/news/goldman-equips-ai-agents-do-trade-accounting-onboarding) — Feb 2026 — [domain trade publication]
**Source:** [CNBC — Goldman taps Anthropic's Claude](https://www.cnbc.com/2026/02/06/anthropic-goldman-sachs-ai-model-accounting.html) — Feb 6, 2026 — [general press]

---

### Finding 4: P&G "Cybernetic Teammate" Experiment — Academic Evidence for Non-Engineering AI Impact

**Evidence level:** Level 2 (single large experiment, academic/research)
**What:** Harvard/Wharton/P&G field experiment with 776 P&G professionals in product development (not engineering). Professionals worked on real product innovation challenges — product ideas, packaging, retail strategies for their actual business units. Randomly assigned to work with/without AI, individually or in teams.

**Key results:**
- AI improved individual performance by 37%, team performance by 39%
- Individuals + AI matched performance of two-person teams without AI
- Teams + AI were 3x more likely to produce top-10% quality solutions
- Effect strongest for employees LESS familiar with product development — AI bridged functional knowledge gaps
- AI broke down silos: R&D people with AI produced more commercially balanced solutions, and vice versa
- Positive emotions increased, negative emotions decreased with AI use

**Why it matters:** This is the strongest academic evidence that AI can transform non-engineering work. But it's a one-day experiment, not a sustained team practice. It proves AI CAN enable non-engineering AI-nativeness but doesn't show anyone SUSTAINING it day-to-day. The gap between "one-day workshop shows 37% improvement" and "team reorganized around AI" remains unproven.

**Source:** [One Useful Thing — The Cybernetic Teammate](https://www.oneusefulthing.org/p/the-cybernetic-teammate) by Ethan Mollick — [practitioner direct / academic]
**Source:** [HBS Working Paper 25-043](https://www.hbs.edu/faculty/Pages/item.aspx?num=67197) — March 2025 — [academic/research]

---

### Finding 5: Unilever + Google Cloud — Announced, Not Yet Deployed

**Evidence level:** Level 0 (vendor press release / partnership announcement)
**What:** Five-year partnership announced Feb 17, 2026 to build "agentic commerce and marketing intelligence" across brand discovery, conversion, and measurement. Willem Uijen (Chief Supply Chain and Operations Officer): "Technology has moved to the core of value creation at Unilever."

**Why it's Level 0:** This is a partnership announcement. No deployment results, no team restructuring, no measurable outcomes. 23,000 Unilever employees trained on generative AI tools and 500+ AI projects globally — but training and projects are not the same as AI-native team transformation. Filing as "announcement to watch" not as evidence.

**Source:** [Unilever press release](https://www.unilever.com/news/press-and-media/press-releases/2026/google-cloud-partnership-pioneers-next-generation-of-consumer-goods-technologies/) — Feb 17, 2026 — [vendor press release]

---

### Finding 6: Ethan Mollick — "Management as AI Superpower" Framework

**Evidence level:** Level 1 (practitioner opinion, strongly informed)
**What:** Mollick argues (Jan 27, 2026) that management skills are the key capability for working with AI agents — not technical skills. "If you can explain what you need, give effective feedback, and design ways of evaluating work, you are going to be able to work with agents." He observes that even elite software developers at AI labs now describe their jobs as "mostly management of AI agents."

**Key insight for non-engineering teams:** The skills required for AI-native work are management skills (clear delegation, evaluation, feedback) — skills that non-engineering teams already have. The barrier is not skill but workflow redesign and organizational permission.

**Source:** [One Useful Thing — Management as AI superpower](https://www.oneusefulthing.org/p/management-as-ai-superpower) — Jan 27, 2026 — [practitioner direct]

---

## What We Searched and Did Not Find

1. **A specific marketing team that reorganized around AI.** Searched Jasper (AI marketing company), HubSpot, Gutenberg. Found: 91% of marketers use AI, many vendor tools exist, thought leadership about future "AI-native marketing teams." Did NOT find: a single named marketing team that described how their daily work actually changed, what roles were created/eliminated, what measurable outcomes resulted. The marketing domain is drowning in vendor content (Jasper, HubSpot, Salesforce) but starving for practitioner accounts.

2. **A specific HR team operating AI-natively.** Found: predictions (Korn Ferry: 50%+ talent leaders plan autonomous agents, Josh Bersin: HR "superagents"), statistics (only 17% have fully embedded AI), warnings (30% headcount reduction possible). Did NOT find: a single HR team describing their actual transformed practice.

3. **A specific legal team operating AI-natively.** Found: adoption statistics (in-house legal AI adoption doubled from 23% to 52%), tool announcements (CoCounsel, Protege), predictions ("small firms will leapfrog BigLaw"). Did NOT find: a named legal team describing daily AI-native practice. The legal domain explicitly emphasizes AI will NOT operate autonomously — "structured workflows" and "human oversight" are the design paradigm, which structurally resists AI-nativeness.

4. **A specific finance/accounting team (beyond Goldman announcement) operating AI-natively.** Found: PwC framework, ChatFin vendor platform, Deloitte statistics (47% deployed at least one agent). Did NOT find: a named finance team (CFO, controller, FP&A lead) describing how their team's daily work actually changed. The closest is Goldman Sachs, but that's tool deployment, not team transformation.

5. **A specific operations team operating AI-natively.** Found: general frameworks (PwC, Deloitte), vendor platforms (ServiceNow Autonomous Workforce). Did NOT find: a named operations team describing restructured daily work.

6. **Dan Shipper / Every Inc non-coding team practices.** Every runs with ~15-20 people and uses AI pervasively, but all published content focuses on their engineering/coding practices (compound engineering). No published account of how their marketing, editorial, or business operations teams work differently with AI. The "AI operations lead" role is mentioned but not described in detail for non-coding functions.

## Synthesis: Why the Gap Persists

Three structural reasons explain why non-engineering AI-native teams haven't emerged (or haven't been documented):

### 1. The Verification Problem
Engineering has a clean verification loop: code either works or it doesn't. AI writes code, tests verify it, human reviews edge cases. Non-engineering work (marketing copy, legal analysis, financial judgment, HR decisions) lacks this clean verification. You can't `pytest` a marketing campaign. Without clean verification, you can't trust AI to produce and human to review — the "AI produces, human steers" model doesn't transfer cleanly.

### 2. The Ambiguity Problem
Engineering tasks can be precisely specified. "Build an API endpoint that does X" is unambiguous. "Write marketing copy that resonates with Nordic CFOs" is inherently ambiguous. AI-native work requires clear delegation — Mollick's "management as AI superpower" insight. But most non-engineering work hasn't been decomposed into clearly delegable units.

### 3. The Documentation Bias
Engineering teams blog about their practices. Marketing teams, finance teams, HR teams do not (or at least not about AI transformation). The absence of evidence may partly reflect documentation culture, not actual practice. The "secret cyborg" phenomenon (Mollick: 40% of workers use AI privately, only 20% use official tools) suggests more is happening than is being published.

## Signals to Watch

| Signal | Why it matters | Next check |
|--------|---------------|------------|
| Intercom CS team evolution | Closest non-engineering AI-native team. Will they publish more detailed operational data? | Cycle 53 |
| Klarna blended model results | Does the "Uber-style" hybrid model work? This is the test case for CS AI-nativeness | Cycle 55 |
| Goldman Sachs accounting agents | Will tool deployment lead to team restructuring? | Cycle 55 |
| Mollick follow-up research | Will the P&G one-day experiment lead to sustained team-level studies? | Cycle 53 |
| Every Inc non-coding practices | Will Dan Shipper publish about non-engineering team practices? | Cycle 53 |
| Forrester "55% regret" tracking | Does the regret rate increase or do companies figure it out? | Cycle 55 |

## Updated Assessment

**Cycle 49 said:** "Non-engineering AI-native teams = ZERO."

**Cycle 51 says:** Still essentially zero, with one notable partial exception (Intercom CS) and one high-profile failure (Klarna). The absence is not random — it reflects structural differences between engineering and non-engineering work that make the "AI produces, human reviews" model harder to implement. The next frontier is not full AI-nativeness for non-engineering teams but rather the emergence of new hybrid models where AI handles 60-80% of volume while humans handle the remaining complex/judgment-heavy work. Customer service is the leading edge of this transformation because it has the clearest volume/complexity split.

**Confidence in "zero" finding:** Moderate-high. We searched 10+ specific angles, verified sources, and found consistent absence. The documentation bias caveat means some teams may be transforming silently, but the signal-to-noise ratio strongly suggests this transformation is pre-chasm for non-engineering functions.
