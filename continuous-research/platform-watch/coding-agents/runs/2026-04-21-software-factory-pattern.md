# Software factory pattern — team-scale agentic infrastructure — OODA 2026-04-21

**Question:** Beyond Intercom / Ramp / Every, is "team-scale agent infrastructure" a real convergent pattern (L3) or still a handful of vendor-adjacent cases with a nice label?

**Selection-bias flag up front:** Intercom, Ramp, and Every all sell AI-adjacent products. So does Sanity, Spotify, HumanLayer, Anthropic itself. Every practitioner voice found below is either AI-native or builds developer tools. The "normal mid-size engineering org" voice is still missing from the public record.

## New companies/practitioners beyond Intercom / Ramp / Every

- **Spotify — "Honk" on top of Fleet Management.** Internal agent platform built on Claude Agent SDK, merging **650+ agent-generated PRs/month into production**, sits on Fleet Management infra Spotify has run since 2022. Senior engineers "haven't written code since December." [general press] Storyboard18 / ppc.land reporting around Spotify Engineering blog post https://engineering.atspotify.com/2026/4/anthropic-agentic-development — need direct read; treat numbers as single-source until confirmed. Non-US (Swedish origin). Closest true parallel to Intercom's 93.6%.
- **Sanity — Vincent Quigley, Staff Engineer, 6-week journey.** [practitioner direct] https://www.sanity.io/blog/first-attempt-will-be-95-garbage — "AI writes 80% of my initial implementations"; runs multiple Claudes in parallel; Sanity policy: engineer is responsible for shipped code even if AI-generated. Norwegian-origin company. **Single-practitioner** report, not org-level metrics — L2.
- **HumanLayer — "Skill Issue: Harness Engineering for Coding Agents."** [practitioner direct] https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents (Mar 2026). Names the components: skills, MCP servers, sub-agents, hooks, back-pressure. Introduces "idiot zone" (context decay). Sub-agents framed as primary context-control primitive. Vendor-adjacent (they sell a harness product) — L1/L2.
- **Martin Fowler / Thoughtworks — "Harness engineering for coding agent users."** [practitioner analysis] https://martinfowler.com/articles/harness-engineering.html. Birgitta Böckeler at QCon London 2026: two load-bearing concerns — cost (~$91K/eng/year at 2026 usage rates) and the security wall ("you cannot and maybe never will be able to give it everything"). Counter-weight to the factory boosters. [tech press] https://www.theregister.com/2026/03/18/ai_for_software_developers_qcon/
- **Addy Osmani — "The Factory Model"** [practitioner direct] https://addyosmani.com/blog/factory-model/. Google engineer, names the pattern and also names its failure modes (see critique section).
- **Every Inc. is already the anchor**, but note: Klaassen's "Compound Engineering" writeup https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents is still the most-cited artifact — 8 months old and being recycled by a dozen secondary posts. Signal that the practitioner base hasn't grown much; the commentariat has.
- **OpenAI Codex team — AGENTS.md.** [practitioner direct] https://openai.com/index/harness-engineering/ — team-portable agent instructions format. Over 60k OSS repos using AGENTS.md per GitHub search. Format standardization is the strongest convergence signal in this whole run.

## Common components across teams (with evidence of convergence)

Ranked by how often they appear across the practitioner sources above:

1. **Skill libraries (SKILL.md / plugins)** — Intercom 267, Sanity publishes "Sanity Agent Skills," Vercel/Stripe/Cloudflare/Netlify publish official skills, Supabase "Postgres Best Practices" as skills. **Strong convergence.**
2. **Sub-agents for context isolation** — HumanLayer, Addy Osmani, Anthropic harness design, Spring AI patterns. Every serious practitioner names this. **Strong convergence.**
3. **Judge/evaluator agent (generator–critic separation)** — Anthropic demystifying-evals, Epsilla's "GAN-style" framing, Every's compound-engineering. Universally advocated, less frequently shown in production numbers. **Medium convergence, mostly opinion-level.**
4. **AGENTS.md / portable machine-readable repo instructions** — OpenAI, Cursor, Google Jules, Factory co-signed; Linux Foundation steward as of Nov 2025. **Standard-level convergence.**
5. **MCP servers as the data-access layer** — everywhere, but as infrastructure, not as a team-factory differentiator.
6. **Meta-agents / orchestrators that spawn sub-agents** — named at Ramp (Dojo), Every, Spotify (Honk). Language is still unstable: "orchestra," "factory," "harness," "swarm."

Weaker than expected: **shared evals as a first-class artifact.** Everyone nods; few publish numbers.

## Counter-evidence and critique

- **Addy Osmani on factory failure modes** [practitioner direct] https://addyosmani.com/blog/factory-model/: context-window limits mean agents miss constraints outside their window; **"flaky environments … become systemic blockers when forty agents hit the same flaky test simultaneously. The factory stalls."** Strongest concrete critique of scale.
- **Böckeler / Thoughtworks on cost and security** — the cost curve (~12¢/100 LOC in 2024 → ~$380/eng/day in 2026) may be the real ceiling, not capability. [practitioner analysis] https://martinfowler.com/articles/harness-engineering.html
- **Hacker News thread on Sanity's piece** https://news.ycombinator.com/item?id=45107962 — worth mining for dissent (not read this cycle).
- **No one has published "we tried the factory pattern and backed off."** That absence is itself a signal — either it's too early, or the survivors are quiet. Worth targeted search next cycle.

## Non-US / Nordic / European signal

- **Spotify (Sweden)** — Honk, 650+ PRs/month. Strongest Nordic signal in this space.
- **Sanity (Norway)** — Quigley's piece is individual, not org-wide, but it's a named Nordic staff engineer on the public record.
- **Thoughtworks / Böckeler (Germany-based)** — the critical-European voice.
- **QCon London 2026** — the critique came from the European conference circuit, not US podcast circuit. Note the cultural gap: US practitioners sell the pattern, Europeans audit it.
- Klarna, Wolt, Supercell, Nokia, Ericsson, Maersk, Equinor: **silent.** No published team-scale agentic-engineering reports found. Gap.

## What I looked for but didn't find

- A **non-AI-native mid-size eng org** (50-500 engineers, not selling AI) publishing factory-pattern numbers. Closest was Spotify, which is very large and AI-adjacent.
- A practitioner who tried compound/factory and **reverted**. Should exist; not surfacing yet. Possibly blocked by career risk of publishing a "we gave up" post.
- Numbers on **shared eval libraries** as an artifact class. Everyone talks judges; few show the library.
- **Finnish/Danish practitioners** beyond Supabase-via-connector announcements.

## Convergence level assessment

**L2 with L3 components, not yet L3 overall.**

- **AGENTS.md format adoption** is genuinely L3 — standardization across OpenAI, Cursor, Jules, Factory, 60k+ repos, LF stewardship.
- **Sub-agent-for-context-isolation as a practice** is approaching L3 — named by 5+ independent practitioners with the same diagnosis (context rot) and same fix.
- **Skill libraries** are L2-climbing-to-L3 — lots of publication, uneven evidence that they're the load-bearing component vs. just the visible one.
- **"Factory pattern" as a coherent package** (skills + sub-agents + judges + meta-agent + shared evals, measurably moving team throughput) is still **3–5 documented cases**, nearly all vendor-adjacent. Intercom, Ramp, Every, Spotify (if the self-reported numbers hold), and arguably Sanity's individual version. That's L2 with selection bias.

**Editorial recommendation for M5 curriculum:** teach the *components* as converged (skills, sub-agents, AGENTS.md, judge separation) — those are real. Teach the *packaged factory pattern* as "emerging shape, watch this space" — not as established practice. The gap between "Intercom numbers" and "your team's numbers" is the honest curriculum.

**Next cycle:** hunt specifically for (a) a non-AI-native mid-size org publishing numbers, (b) a reverted-the-pattern practitioner, (c) Nordic beyond Spotify/Sanity.
