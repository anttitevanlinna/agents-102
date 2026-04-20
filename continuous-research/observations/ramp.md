# Ramp — Whole-Company AI Transformation (Platform + Spokes)

**Type:** Whole-company adoption (engineering + every function) | **Size:** Mid-size (estimated mid-hundreds to ~1,000 based on "800+ different builders" claim) | **Evidence:** Deep case (practitioner-direct, CPO)
**Key sources:** Geoff Charles (CPO), *"How to get your company AI pilled"* — [x.com/geoffintech/status/2042002590758572377](https://x.com/geoffintech/status/2042002590758572377) [practitioner direct, 2026-04-09]

---

## Why This Matters

The first documented case of an **established non-AI-native company driving AI adoption across every function**, not just R&D. Ramp is a B2B fintech (corporate cards + spend management); engineering is not the whole company. Geoff Charles's thesis: the CS-restructuring story (Intercom's Fin side) and the R&D-factory story (Intercom's 2x side, Ramp's own engineering) are *the same playbook applied to different functions*, and most companies are overthinking their AI strategy by trying to plan it rather than seed and compound it.

Darragh Curran (Intercom) explicitly cited this post as a peer reference in his 2x memo. The two pieces, published within a week of each other, converge on the same core moves — which makes Ramp + Intercom a **Level 3 convergence signal** (two independent practitioners, same pattern, different companies).

## Scale Claims

| Claim | Number |
|---|---|
| AI usage YoY increase | **6,300%** |
| Team active on AI tools | **99.5%** |
| Team using coding agents weekly | **84%** |
| Apps shipped on internal platform | **1,500+ in 6 weeks** |
| Distinct builders on internal platform | **800+** |
| Non-engineer share of human-initiated PRs on production codebase | **12%** (thousands/month) |
| Skills marketplace (internal) | **350+ skills shared** |
| Peak participants in internal AI hackathon | **700** (coached by 100 engineering/product staff) |
| Weekly AI office hours attendance | **40–50+** |
| Members of #ramp-uses-ai Slack channel | **1,000+** |
| Team-specific AI Slack channels | **40+** (collectively 20,000 messages/month) |

## The Internal Tool: Glass

- **What:** Ramp's own build of Claude Code's Cowork, built on Anthropic's Claude Agent SDK.
- **Team size / timeline:** **4 people, <3 months to ship.**
- **Adoption:** 700 DAU within one month of launch.
- **Setup friction:** **auto-configures on install. One Okta SSO, 30+ tools live** (Salesforce, Snowflake, Gong, Slack, Notion, Google Workspace, Figma). "If the user has to debug, we've already lost."
- **The pedagogical insight:** *"Despite hitting 90%+ adoption of AI tools across the company, most people were stuck on a basic chat interface. The models were good enough. The harness wasn't."* Terminal, npm, MCP config were too high a bar. The harness was the bottleneck; building their own unblocked the company.

Also: **Dojo**, an internal skills marketplace (350+ skills), lets any employee package a workflow and share. "A sales rep figures out the best way to analyze Gong calls and draft battlecards — packages it as a skill, and now every rep has that superpower."

Also: **Ramp Inspect**, home-built coding agent used by non-engineers to open production PRs.

## The L0 → L3 Proficiency Ladder (named by Charles)

Canonical, worth lifting verbatim:

- **L0:** Sometimes uses ChatGPT. Has not changed workflows. *"If you're still here and not self-starting, you will most likely not be at the company."*
- **L1:** Custom GPTs, Notion agents, dabbled in Claude Code. Starting to see what's possible but hasn't compounded.
- **L2:** Built an app that automates part of their job. Committed code or contributed feedback to others' work. **"This is where things get real."**
- **L3:** Systems builders. They don't just use AI — they build the infrastructure that levels up everyone else. Force multipliers.

Three moves to climb the ladder (Charles's words, paraphrased):
1. **Build tools that meet people where they are.** Shift the whole company to Claude + Notion AI connected to workplace tools — low bar, universal participation. Gets people L0 → L1.
2. **Raise expectations as tools mature.** AI proficiency in hiring screens, onboarding, performance framing. Pushes L1 → L2.
3. **Match the mandate to the tooling.** *"If you raise expectations before the tools can deliver, you burn credibility and people stop listening."*

## The Operating Model: "Build from the center, drive from the spokes"

- **Tried centralized first** → one team builds tools for all. Demand outstripped capacity immediately.
- **Then decentralized** → every team builds their own. Redundant relearning.
- **Resolved: hybrid.** A small central team builds the **platforms, connectors, and plumbing** across LLMs, data, knowledge, workflows — AND manages training, enablement, change management. **Functional teams build on top** and drive the central team's roadmap via feedback.

Results cited from the spokes (all non-engineers):
- Risk analyst: automated **16 hours/month** of financial modeling.
- Sales ops lead: replaced spreadsheet-based comp model across **3 orgs in 48 hours**.
- L&D lead: training simulator in **15 minutes**.
- Finance: contract reviewer saving **45 min/contract**.

*"None of them are engineers. They didn't file a ticket. They found their own pain, prototyped a fix, and pulled engineering in when it was time to go to production — when that was even necessary."*

## Cultural Mechanics (the 8 moves, named)

1. **The second best time to start is today.** No formal change management program. Leadership clarity, AI "guild" Slack, mandated usage + tracking.
2. **AI proficiency is a learning curve, not a light switch.** L0–L3 ladder + matching mandates to tooling maturity.
3. **Embrace creative destruction.** Internal tools have a shelf life of weeks. *"If your internal tools from three months ago still feel state-of-the-art, you're not moving boldly enough."*
4. **Build from the center, drive from the spokes.** Hybrid platform model.
5. **Give people a stage, not just a mandate.** All-hands demo slots from CEO to first-line operator. Make early converts visible.
6. **Get people to the "Aha" moment as fast as possible.** Glass + day-one result. *"Training doesn't work. The world's best teacher is AI itself."*
7. **Make it a competition.** Visible leaderboard (sessions, skills, apps, tools connected). Three dynamics: peer pressure, manager accountability, discovery through emulation. **Top AI users = often highest performers.**
8. **Remove every constraint between your people and AI.** Infinite learning budget. No token caps. No role-based tiering. Pre-connected 30+ tools before anyone asked. *"If your people have to file a ticket and wait two weeks for IT to approve a Salesforce connection, they'll lose momentum and never come back."*

## Hiring and Performance

- AI proficiency is **an absolute hiring requirement**, no exceptions.
- PM interview: *"build me a product, show me how you built it, walk me through how it works."* Full prototype, not a slide deck. Demonstrated internalization = the bar.
- Leaderboard tiering made its way into **performance conversations**: *"If your team is in the bottom quartile, that's a conversation you're going to have."*

## Cost Philosophy (the CFO reframe)

Canonical quote worth lifting:

> *"We pay our employees a lot of money. Token consumption per employee today isn't even close to double-digit percentages of their salary. But if someone is 2x more productive with AI, you should be willing to spend their entire salary again in tokens. If you have agents that can do 10x more work than a person, why would you not pay them twice as much as that person?"*

This pairs with Intercom's *"way more expensive in the long run to hold back spend"* — same posture, two companies.

## The Counterintuitive Stance

Charles explicitly rejects the planning-first instinct:

> *"Most companies are still debating their AI strategy. They are overthinking it."*

And on strategy itself: *"We didn't have a plan. All we had was a culture and talent, and we kept doubling down on the things that were working... Each track compounded separately. As they reinforced each other, the curve went vertical."*

The metaphor: *"light as many small fires as possible and see which ones grew."*

## Cross-Reference with Our Research

- **`absorption-bottleneck`** — Ramp's L0–L3 ladder names the bottleneck and defines the climb. The leaderboard makes the distribution visible; the platform moves the distribution.
- **`conditions-creator`** — central platform team IS a conditions-creator team. Remove-every-constraint section is a conditions-creator manifesto.
- **`experience-first-adoption`** — the whole "Aha moment on day one" section. *"You can only lead a horse to water."* Training explicitly named as inferior to experience.
- **`coding-agent-as-general-platform`** — Glass (built on Claude Agent SDK) is the meta-platform thesis made concrete for non-engineers. Ramp Inspect extends it — non-engineers shipping production PRs.
- **`experience-first-adoption`** + **`hybrid-beats-autonomous`** — AI doesn't replace; it amplifies. Spokes find their own pain, prototype a fix, pull engineering only when shipping to production.
- **Convergence with Intercom (2x side):** The shape of the playbook matches — dedicated platform team (Intercom: team-2x / Ramp: central team), internal Claude Code derivative (Intercom's plugin marketplace / Ramp's Glass + Dojo), uneven distribution made visible (Intercom: top 5% = 6x median / Ramp: L0–L3 ladder), cost-posture (both: don't optimize spend, optimize leverage), public accountability (both: declared goal + transparency memo). **Two independent practitioners, same pattern.** When paired, this hits Level 3 convergence on the "how to AI-pill a mid-size established company" pattern.

## For Curriculum (Engineering Management training)

Ramp is the **non-software-engineering-team-lens companion case** to Intercom. Where Intercom shows the eng-manager-of-software-engineers view (PR throughput, plugin marketplace, auto-approval), Ramp shows the eng-manager-adjacent view — software managers whose teams ship tools that non-engineers use, and the cultural infrastructure around it.

- **M1 (diagnose):** L0–L3 ladder is the ADKAR/Chasm lens made legible to managers. Arguably the cleanest classifier in the entire research base for where a team member sits.
- **M2 (first move):** "Match the mandate to the tooling" + "The second best time to start is today" = the M2 posture.
- **M3 (coalition):** "Early converts" = the coalition. "Give people a stage" = how to make them visible. Spotlight + pairing mechanics are M3 moves.
- **M4 (vision):** "We will become the most productive company in the world" (Jan 2025 kickoff) + "All technical work is agent-first" (Intercom) = two canonical vision statements with teeth.
- **M5 (conditions + ritual):** Leaderboard IS the verification ritual at org scale. All-hands demo slots are the ritual at team scale. "Remove every constraint" = the negative-space conditions (what the manager removes, not adds).
- **M6 (signals + plan):** The 8 moves themselves map to signals a manager can watch in their own team. Ramp's measurement set (sessions, skills, apps, tools connected) is a candidate dashboard.

## Caveats

- Ramp has a **velocity-biased culture** as starting condition; Charles is explicit about this. "We might have had better starting conditions." Not every company can adopt this playbook without accepting that some of the culture work is upstream of the AI work.
- Ramp is a **fintech B2B platform with a large product/engineering share of headcount** — easier to get non-engineers into a coding-agent workflow when the whole company works in a software product. Nordic traditional companies (manufacturing, retail, logistics) may not transfer this 1:1.
- The **"if you're L0 you will most likely not be at the company"** line is culturally aggressive for Nordic employers — context-dependent transfer.

---

*Last updated: 2026-04-20*
