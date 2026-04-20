# What Should a Software Engineering Team Lead Do NOW — Research-Grounded Playbook

Companion reference for `content-strategy-engineering-management.md`. Not a module. A synthesis across the KB that the training's six modules draw from. Keep this file synced with the research as it evolves.

Audience: software engineering manager, 5–50 reports, leadership has declared an AI transformation, team is unevenly distributed (some shipping agents, some on ChatGPT weekly, some sceptical), manager has agent competence themselves.

**Stance:** not a vision, a sequence of concrete moves grounded in practitioner evidence (Intercom, Ramp, F-Secure, Spotify, Anthropic). The difference between success and stall is whether you run competence-first or fall back to platform-selection paralysis.

---

## This week (1–5 moves)

1. **Schedule a 2-hour hands-on session where your team builds something real with Claude Code.** Non-demo. Everyone builds, including you. Finish something working in 90 minutes. Examples: standup summary automation, Jira-to-dashboard, meeting notes → action items.
   *Why:* Experience-first adoption beats vision decks because agents are structurally unlike previous transformations — people can't envision what they haven't used. 5-hour competence threshold: 79% of people who cross it become regular users; below, 67% don't.
   *Source:* [experience-first-adoption.md], [competence-first.md]

2. **Ask "what can't you do right now that you'd do if you had it?" — one-on-one with each sceptic.** Listen for infrastructure gaps, not capability gaps. F-Secure's three walls post-competence: data access, runtime platform, discoverability.
   *Why:* Competence creates pull — people find their own high-value processes unprompted. Your job is to hear the walls and know what to unblock.
   *Source:* [competence-first.md → F-Secure evidence], [synthesis/cto-answer.md]

3. **Set up `#team-uses-ai` Slack channel. Mandate one weekly share: "What I shipped." Leader posts first.**
   *Why:* Microsoft/HBR data: leadership communication has ZERO direct effect on AI adoption; peer influence is +8.9pp (+10.4pp for agents specifically). Leaders create conditions; peers move each other.
   *Source:* [conditions-creator.md], [experience-first-adoption.md]

4. **Identify your 2% natural influencers (not volunteers, not managers).** Ask: "Who do people actually listen to about new tools?" Give them 30–60 min/week dedicated experiment time and explicit permission to help peers.
   *Why:* Adoption cascades through peer trust, not hierarchy or formal champions. Citi ran this at 1:45 ratio across 182K employees.
   *Source:* [conditions-creator.md → Citi, PwC Netherlands]

5. **Pick ONE process that's clearly broken. Say out loud: "We're going to 3× this in 8 weeks with agents."** Named, measurable, imperfect. Intercom's CTO: *"be at peace with potentially imperfect measures."*
   *Why:* Public accountability is the forcing function. Imperfect metric creates pressure; pressure exposes bottlenecks.
   *Source:* [observations/intercom.md → 2x memo], [observations/ramp.md → "most productive company in the world"]

## This month (5–10 moves)

6. **Run an internal skills marketplace for Claude Code (or equivalent).** One person writes an agent that does X well; package as a reusable skill for the team. Intercom's plugin repo: 31% of R&D contributing in 3 months. Ramp's Dojo: 350+ skills in 6 weeks.
   *Source:* [coding-agent-as-general-platform.md], [observations/intercom.md], [observations/ramp.md]

7. **Implement a tiered verification ritual for AI-generated output.** Low-risk → auto-approve via agent review. Mid-tier → human spot-check. High-stakes → full human validation.
   *Why:* Absorption bottleneck: 59% more PRs generated YoY, 7% throughput decline, 3.4× compound review burden. "Review harder" doesn't scale; agents reviewing agents does (80–85% parity with humans at 500× cost reduction).
   *Source:* [absorption-bottleneck.md → CircleCI 2026, Faros AI 10K devs], [hybrid-beats-autonomous.md]

8. **Build a non-engineer cohort on your engineering team.** PMs, designers, ops spend 3 afternoons with Claude Code building things they need.
   *Why:* Coding-agent-as-general-platform is proven in production. Intercom: 600 non-R&D people on Claude Code. Ramp: 12% of production PRs from non-engineers.
   *Source:* [coding-agent-as-general-platform.md], [observations/intercom.md], [observations/ramp.md]

9. **Measure the uneven distribution and don't hide it.** Show the Pareto curve: who's shipping what, who's stuck where. Intercom: top 5% = 6× median. Ramp: L0–L3 ladder.
   *Why:* Visible distribution moves distribution.
   *Source:* [observations/intercom.md], [observations/ramp.md], [absorption-bottleneck.md]

10. **Stop planning "AI adoption." Seed small bets, remove constraints.** Ramp's 8-move framework #8: "remove every constraint between your people and AI." No token caps. No role-based tiering. Pre-connect tools before anyone asks.
    *Why:* Adoption follows conditions, not plans. Ramp: *"We didn't have a plan. All we had was a culture and talent, and we kept doubling down on what was working."*
    *Source:* [observations/ramp.md], [conditions-creator.md]

## This quarter (3–5 structural moves)

11. **Redefine one person or small team's role around conditions creation** — not project management, not change management. Pick tools, set boundaries, identify influencers, build infrastructure, then step back. Done when peer influence sustains itself.
    *Source:* [conditions-creator.md → Citi 1:45 ratio, PwC, Amazon Kiro counter-evidence]

12. **Reframe your PM's job around Intent + Trajectory** (not status meetings or approval queues). Anthropic runs one PM per ~50 engineers via Intent Taktik: write readable-by-humans-and-agents specs, let execution run autonomously, monitor via real-time metrics, intervene on divergence.
    *Source:* [observations/anthropic.md → 50:1 PM-to-eng], [insights.md → Intent Taktik]

13. **Build your internal Claude Code derivative with 30+ pre-connected tools.** Intercom's team-2x shipped this in months. Ramp's Glass: 4 people, <3 months, 700 DAU in a month. The bottleneck isn't capability — it's harness.
    *Source:* [observations/ramp.md → Glass], [observations/intercom.md → plugin repo], [coding-agent-as-general-platform.md]

14. **Spend on leverage, not tokens.** Intercom and Ramp both named this explicitly: *"If someone is 2× more productive with AI, spend their entire salary again in tokens."* Don't cap cost — cap leverage: if output isn't worth 3–5× the spend, you're not using the tool right.
    *Source:* [observations/intercom.md → CFO reframe], [observations/ramp.md → token spend vs salary math]

15. **Run a competence-building program for non-technical leaders** (PMs, ops, finance, recruiting). F-Secure: 200+ people, 2 modules, unprompted building started after.
    *Why:* 78% of executives say AI moves too fast for their training; 82% of early-maturity companies have no talent strategy. If execs can't reason about agents, they over-invest in platforms and under-invest in competence.
    *Source:* [competence-first.md → F-Secure, quantified gap], [synthesis/cto-answer.md]

## This year (2–3 strategic bets)

16. **Bet that coding agents ARE the meta-platform for the next 2 years.** Default all internal-tools / agent-platform work to Claude Agent SDK or OpenAI Codex. Don't pick Agentforce, Copilot Studio, or custom builds yet.
    *Why:* Platform consolidation moves toward the simplest substrate with highest compounding. Coding agents build everything else — agents, MCP servers, evals, the next agent. Anthropic's SDK rename signals this.
    *Counter-evidence:* compound error math is real (0.85^10 = 20%). Most non-engineering domains lack the executable-verification infrastructure that makes coding agents work. Use coding agents; don't expect them to solve non-engineering process automation directly.
    *Source:* [coding-agent-as-general-platform.md], [hybrid-beats-autonomous.md], [synthesis/cto-answer.md]

17. **Bet your org transformation looks like Intercom + Ramp, not vendor roadmaps.** Don't wait for "Copilot Studio for your domain" — those announcements ship 12–18 months late with less capability. Run the known-to-work playbook: public target, imperfect pressure-creating metric, dedicated platform team, internal derivative tool, visible distribution, leverage-over-cost, extend beyond engineering.
    *Counter-evidence:* both Intercom and Ramp are AI vendors with motivated stories; both are velocity-cultured; both are post-chasm (had PMF before starting). The playbook scales agents you've decided to build; it doesn't answer "which 5 processes first."
    *Source:* [observations/intercom.md], [observations/ramp.md], [insights.md → convergence, Bet A/B tension]

18. **Bet the playbook evolves toward Intent Taktik (Auftragstaktik + real-time trajectory) within 18–24 months.** Instrument for what you can measure today. Anthropic's 50:1 PM ratio is the trajectory marker. Managers freed to do pure leadership: intent, trajectory, intervention.
    *Counter-evidence:* 47% of enterprise agents aren't monitored at all — trajectory monitoring fails when half the fleet is dark. Intent Taktik can tempt leaders into over-centralization (panopticon risk). Klarna's reversal shows what happens without competence as precondition.
    *Source:* [insights.md → Intent Taktik], [observations/anthropic.md], [synthesis/patterns.md]

---

## Three things NOT to do

1. **Don't select a horizontal platform before running competence-first.** Pattern convergence: zero named enterprises in production on horizontal platforms (Salesforce, Microsoft, OpenAI). Competence creates pull; platform selection without competence is choosing between vendor narratives. Intercom tried this; it took 9 months and still isn't done. *Do instead:* competence → discovery → infrastructure needs → platform questions.

2. **Don't mandate tool usage or put AI in performance reviews.** Amazon Kiro: SVPs mandated 80% weekly usage, engineers protested, tool deleted production environment (6.3M lost orders). Microsoft/HBR: mandates have ZERO direct effect on adoption; peer influence is +8.9pp. Mandates without competence create compliance, not capability. *Do instead:* create conditions for peer influence (2–4 influencers per 100, office hours, knowledge base, early wins highlighted).

3. **Don't treat full autonomy as the target state.** 15 independent signals (Klarna, McDonald's, Zillow, Air Canada, SaaStr, Qualtrics...) show autonomous agents at scale fail. Gartner: 50% of companies that cut CS staff for AI will rehire by 2027. Compound reliability: 85% per step × 10 steps = 20% end-to-end. Agents work for 2–3 step interactions; fail on 10+ step multi-system processes. *Do instead:* hybrid from day one. AI generates → human validates → AI executes → human monitors. Measure augmentation, not replacement.

## Two things the research honestly doesn't know yet

1. **How this transfers to non-velocity-biased organizations.** Intercom and Ramp both operated in velocity cultures and chose aggressive stances (*"if you're L0 you won't be here"*). Nordic labor norms, manufacturing, retail, logistics likely require different operating models. F-Secure evidence exists internally but isn't independently verified. Material gap for Nordic context — name it in training, don't paper over it.

2. **What competence-first looks like 18 months post-chasm.** Moderna, F-Secure, Wharton MBA evidence is pre-chasm. No research has tracked the sequence when competence is widespread. Do you still need a Conditions Creator? Does competence create its own momentum? Absorption bottleneck research suggests the challenge shifts from "getting adoption" to "handling volume," but mechanisms aren't proven.

---

## Brass tacks

Week 1: 2-hour hands-on, listening conversations, `#team-uses-ai`, influencers, one metric. By month-end you know who's pulling toward agents and where infrastructure walls are. By quarter-end you have visible measured distribution and a platform team working on the internal derivative. By year-end: not "should we adopt agents?" but "how fast can we scale what's working?"

The research says the playbook works. It doesn't say it's easy. The bottleneck is human — how the organization learns together, not how good the tools are. Competence → conditions → public measurement → extend beyond engineering. Everything else flows.

---

*Last updated: 2026-04-20. Source: broad KB synthesis. Keep in sync with `observations/`, `findings/by-pattern/`, `insights.md` as they evolve.*
