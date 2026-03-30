---
type: finding
domain: cross-domain
evidence_level: 2
platforms: [multiple]
practitioners: [Citi, PwC Netherlands, Varonis, Microsoft/HBR, Mollick/Wharton, Amazon (counter)]
nordic: false
updated: 2026-03-30
answers:
  - "how do you actually drive AI adoption at scale?"
  - "what role makes transformation work?"
  - "does top-down mandate work for AI adoption?"
  - "what's the conditions creator?"
  - "peer influence vs mandates for AI?"
  - "how did Citi get 70% AI adoption?"
---

# Conditions Creator — The Role That Makes Transformation Work

**Evidence level:** Level 2 (approaching convergence — 5 positive signals + 1 counter-signal, not yet 10-20 independent) | **Last updated:** 2026-03-30 | **Source:** Cycle 72

**Pattern:** The most effective AI transformation approach is NOT project management, change management, or executive mandates. It's someone (person or team) who sets up the conditions — tools, boundaries, peer networks, training, psychological safety — then steps back. People self-organise around capability once they have it.

**Nobody has formally named this role.** "Conditions Creator" is our label. The pattern is consistent across every successful case and conspicuously absent in every failure.

## The Evidence Stack

### Signal 1: Microsoft/HBR — Peer Influence Quantified

Peer influence (+8.9pp) beats facilitating conditions (+8.5pp) beats leadership communication (0pp after controlling for peers). For AI agent adoption specifically: peer influence = +10.4pp vs. 6.1pp for tools/training/IT support. Teaching others amplifies further: +13.7pp.

**The headline:** Leadership communication has ZERO direct effect on AI adoption after you control for peer influence. Leaders don't drive adoption. Peers do. The leader's job is to create the conditions for peer influence to happen.

Source: [HBR, March 2026](https://hbr.org/2026/03/peer-influence-can-make-or-break-your-ai-rollout) — [academic/research], N=557 US information workers, Microsoft researchers (Baym, Dillon, Jaffe)

### Signal 2: Citi — 4,000 Peer Champions at 182K Scale

4,000 "AI Accelerators" across 182,000 employees in 84 countries. Volunteers, not appointed. 30-60 min/week. Embedded in own teams — peer trust, not authority. Result: 70% adoption of firm-approved AI tools, 21M+ interactions. Built over two years.

The 1:45 ratio (champions:employees) is a transferable design parameter.

Source: [Lead With AI guide](https://www.leadwithai.co/guides/ai-champion-programs) — [practitioner analysis]; [Fortune](https://fortune.com/2025/10/01/citi-ai-prompt-training-mandate-employees-reskilling-workforce-business/) — [general press]

### Signal 3: PwC Netherlands — Network Analysis to Find Natural Influencers

Scaled from 300 pilot users to 6,000 employees in under one year. Key innovation: used organizational network analysis (ONA) to identify the most naturally connected people — not the loudest AI fans, not volunteers, but the actual network hubs. Led by Marlene de Koning (Director, HR Tech & Digital).

Sustained through: rotating virtual office hours, public recognition, progressive challenges, prompt library sharing across territories.

**This is the most operationally detailed Conditions Creator implementation found.** They didn't manage adoption — they identified the right people through data, gave them infrastructure, and let peer influence do the work.

Source: [Flexos](https://www.flexos.work/learn/beyond-ai-pilot-pwc-scaled-adoption-6000-employees) — [practitioner analysis]

### Signal 4: Varonis AI Guild — Engineering Conditions Creation

100% AI adoption across engineering. AI Guild = "exclusive hub of practitioners who shape standards." Started small: licenses to influential engineers + all leaders from day one. Weekly feedback loops. Knowledge base and indexed guild sessions. Workshops and hackathons.

The guild creates conditions; engineers self-adopt. Not mandated — shaped through standards and peer practice.

Source: [Varonis blog](https://www.varonis.com/blog/impact-of-ai-adoption-engineering) — [practitioner direct] (vendor blog about own internal engineering practice)

### Signal 5: Mollick's Leader-Lab-Crowd Framework

Individual AI gains: 2-3x. Organizational gains: only 10-20%. The gap is explained by organizational structure, not technology. Three pillars required: Leader (vision + policy), Lab (turns ideas into tested workflows), Crowd (scales what works).

**The "Lab" IS the Conditions Creator function.** It's the team that creates infrastructure for the Crowd to self-adopt. Missing the Lab and individual gains never scale.

Source: [Wharton Knowledge](https://knowledge.wharton.upenn.edu/podcast/this-week-in-business/where-artificial-intelligence-stands-heading-into-2026/) — [academic/research]

### Signal 6 (Counter-Evidence): Amazon Kiro — Top-Down Mandate Catastrophe

Amazon SVPs mandated 80% weekly usage of Kiro (internal AI coding tool). ~1,500 engineers signed internal petition protesting, preferring Claude Code for complex tasks. Management ignored them. Within 3 months: Kiro agent deleted a production environment (13-hour AWS outage), then a faulty deployment caused a 6-hour Amazon.com outage costing 6.3 million lost orders. Amazon then required senior engineer sign-off for all AI-assisted code and launched a 90-day safety reset across 335 critical systems.

**The anti-pattern.** Mandated tool, ignored practitioner judgment, removed choice. The catastrophic outcome validates conditions creation by showing what happens without it.

Source: [Medium / That Infrastructure Guy](https://medium.com/that-infrastructure-guy/amazon-forced-engineers-to-use-ai-coding-tools-then-it-lost-6-3-million-orders-256a7343b01d) — [practitioner analysis]

## The Pattern Distilled

**What the Conditions Creator does:**

1. **Picks the tools and sets the boundaries** — approved tools, data policies, clear use cases
2. **Identifies natural influencers** — through network analysis (PwC) or by finding seed practitioners (Varonis), NOT through volunteers or management appointment
3. **Gives influencers infrastructure** — time (30-60 min/week), recognition, knowledge sharing systems, office hours, prompt libraries
4. **Steps back** — lets peer influence drive adoption. Measures peer spread, not training completion.

**What the Conditions Creator is NOT:**
- Not a project manager (no Gantt charts, no milestones, no stakeholder management)
- Not a change manager (no communication plans, no resistance management)
- Not an executive sponsor (no mandates, no performance review pressure)

**The mechanism:** Peer influence is the primary driver of AI adoption (+8.9pp per Microsoft/HBR). Leadership communication has zero direct effect. The Conditions Creator's job is to maximise peer influence by creating the infrastructure for it — then getting out of the way.

## Supporting Evidence

- **Infosys/MIT (Dec 2025):** 83% of 500 business leaders say psychological safety measurably impacts AI initiative success. Only 39% rate their org's safety as "very high." Psychological safety is one of the conditions. Source: [MIT Technology Review](https://www.technologyreview.com/2025/12/16/1125899/creating-psychological-safety-in-the-ai-era/) — [domain trade publication]
- **HBR/Harvard Business School (Nov 2025):** "Most AI initiatives fail for organizational, not technical reasons. Technology enables progress, but without aligned incentives, redesigned decision processes, and an AI-ready culture, even the most advanced pilots won't become durable capabilities." Source: [HBR](https://hbr.org/2025/11/most-ai-initiatives-fail-this-5-part-framework-can-help) — [academic/research]
- **McChrystal Group (Sep 2025):** "Gardener" leadership model — leaders create conditions that enable teams to thrive rather than controlling every action. Not AI-specific but maps directly. Source: [McChrystal Group](https://www.mcchrystalgroup.com/insights/detail/2025/09/26/leading-like-a-gardener--cultivating-adaptive-leadership) — [practitioner analysis]
- **Platform engineering as structural analogue:** Platform teams create conditions (tools, self-service, templates) then step back. The Conditions Creator for AI transformation is the organizational equivalent. Source: [Growin](https://www.growin.com/blog/platform-engineering-2026/) — [general press]
- **Tanya Reilly "Being Glue" (2019, historical):** Coined "glue work" — essential but non-promotable work that holds teams together. The Conditions Creator is essentially the role that makes glue work its primary job with organizational authority. Surfaces the key risk: conditions creation as non-promotable work. Source: [noidea.dog/glue](https://www.noidea.dog/glue) — [practitioner direct]

## Connection to Other Patterns

- **Competence-first:** The Conditions Creator is HOW competence-first gets operationalised. Competence-first says "build competence before choosing platforms." The Conditions Creator is the person who actually does it.
- **Hybrid-beats-autonomous:** The Conditions Creator creates the human infrastructure that makes hybrid work. Without someone setting up the peer networks and psychological safety, teams default to either full autonomy (fails) or no adoption.
- **Experience-first adoption sequence:** WOW → competence → person sees own future → acts. The Conditions Creator creates the WOW moment (through training, tools, first experiences) and the competence infrastructure that sustains it.

## What We Did Not Find

1. **No one has formally named this pattern.** Available naming opportunity.
2. **No first-person practitioner narrative** — "I created the conditions, then stepped back." The pattern is observable across companies but nobody has written the reflective post.
3. **No Nordic signal.** Zero company-level champion/enablement programs documented in Finland, Sweden, Norway, or Denmark. Either not happening or not published.
4. **No formal comparison** of conditions creation vs. traditional change management for AI adoption. The Microsoft/HBR study comes closest but doesn't frame it this way.
5. **No non-engineering evidence** beyond PwC Netherlands (which is cross-functional). Can the pattern work for AI adoption in finance, HR, legal, marketing specifically?
6. **No evidence of the pattern failing** when properly implemented. This is suspicious — either it always works (unlikely) or failures aren't being published.

## CTO Advice

Don't hire a change manager for AI transformation. Appoint (or hire) a Conditions Creator:

1. **Pick tools, set boundaries** — approved tools, data policies, clear use cases
2. **Find your 2%** — use network analysis to identify natural influencers. Not volunteers. Not managers. The people others actually listen to.
3. **Give them infrastructure** — dedicated time (30-60 min/week minimum), recognition, knowledge sharing systems, peer forums
4. **Measure peer spread, not training completion** — adoption propagates through proximity and peer influence, not through course completion rates
5. **Step back** — your job is done when the network self-sustains. The 1:45 ratio (Citi) suggests the champion density needed.
