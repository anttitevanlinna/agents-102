# Kieran Klaasen — compounding engineering — OODA lookup 2026-04-21

**Name correction:** Kieran **Klaassen** (two s's). The term he uses most consistently is **"compound engineering"** (not "compounding") — Every's GitHub repo, the definitive guide, and the plugin all use "compound engineering." "Compounding engineering" appears as a near-synonym in community writeups but Klaassen's canonical term is "compound."

## Who he is

General Manager of **Cora**, Every Inc.'s AI email assistant. Built the Cora MVP end-to-end in three months using Cursor + o1 (late 2024), now runs it as GM. Practitioner — he ships the product he writes about. Dutch, Ruby/Rails background, active on X (@kieranklaassen) and GitHub (kieranklaassen). Trajectory: 12 months ago he was writing "How I 10x My Engineering With AI" [practitioner direct]; by 2026 he has codified the practice into a 10k+ star open plugin used across Every's 5 products with primarily single-person engineering teams (Cora, Monologue, Sparkle, Spiral, Every.to). [every.to/@kieran_1355](https://every.to/@kieran_1355) [practitioner direct]

## Compound engineering — his framing

**Core claim (his words, via definitive guide):** "Each unit of engineering work should make subsequent units easier — not harder." Traditional codebases accumulate technical debt; compound engineering inverts this — features *teach the system capabilities*, bug fixes *eliminate categories of future bugs*, patterns *become tools*. The codebase gets easier to modify over time, not harder.

**The four-step loop: Plan → Work → Review → Compound.**
- **Plan:** sub-agents research the codebase, framework versions, best practices in parallel. Output = markdown file with data models, file references, architectural decisions. Specific enough that a human or agent can execute without asking questions.
- **Work:** agent asks clarifying questions, then builds the feature *and writes tests from the plan*.
- **Review:** parallel specialized agents check security, performance, architecture, style. Triage findings by priority.
- **Compound:** capture learnings (new preferences, bug patterns, architectural decisions) into files future sessions read — `CLAUDE.md`, `AGENTS.md`, skill files.

**The load-bearing ratio:** "80% planning and review, 20% execution." The opposite of how most engineers work.

Sources: [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide) [practitioner direct], [Compound Engineering: How Every Codes With Agents](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents) [practitioner direct], [EveryInc/compound-engineering-plugin README](https://github.com/EveryInc/compound-engineering-plugin) [practitioner direct, open-source].

## Concrete practices he names

1. **Parallel sub-agents for planning** — not one plan, many specialists researching simultaneously.
2. **Plan-as-artifact** — markdown file checked into repo; the plan is the shared context agents and humans read.
3. **14-agent parallel review** — security, performance, architecture, style, etc., each its own reviewer agent run in parallel over the PR.
4. **Per-feedback agents** — create a dedicated agent for each reviewer comment; resolve 10 issues in the time one used to take.
5. **`CLAUDE.md` / `AGENTS.md` as memory** — every learning gets written back. Preferences, bug-patterns-to-avoid, architectural decisions. Next session starts smarter.
6. **Slash commands (`/workflow:plan`, `/workflow:review`)** — the plugin packages the loop as invokable commands.
7. **Skills/sub-agents with "your taste"** — review skills encode the team's editorial voice for code.
8. **Tests written from the plan, not after the code** — testability is a planning output.

## Outcomes he's reported

- **"What used to take a week of coding now happens in hours."** (Klaassen, via definitive guide commentary) [practitioner direct, Level 2 single case].
- **Every runs 5 products with primarily single-person engineering teams** (Cora, Monologue, Sparkle, Spiral, Every.to). [practitioner direct, Level 2].
- **Cora MVP in 3 months solo** (2024, pre-compound-engineering formalization). [practitioner direct].
- **Plugin 10k+ GitHub stars, used inside Google and Amazon engineers' workflows** (per the guide's claim — not independently verified, labeled accordingly). [practitioner claim, Level 2].

## Who else is using "compound engineering"

Convergence signal present but the term itself is still mostly Every-originated. Independent adopters:

- **Will Larson (ex-Carta CTO, now Imprint), Jan 2026:** "[Learning from Every's Compound Engineering](https://lethain.com/everyinc-compound-engineering/)" [practitioner direct / practitioner analysis]. Adopted the plugin in Imprint's monorepos (~1 hour setup). His frame: Compound Engineering is "two extremely well-known patterns, one moderately well-known pattern, and one pattern that many practitioners have intuited but have not found a consistent mechanism to implement." Larson's critique is the closest thing to counter-evidence — he argues **the novelty is packaging, not the ideas.** Plan/work/review are standard; the "compound" step is the one that was intuited-but-not-operationalized.
- **Agentic Patterns catalog** lists "Compounding Engineering Pattern" as a named pattern. [practitioner analysis].
- **Kevin Rose** did a joint piece with Klaassen ("Vibe Code Camp Distilled"). [practitioner direct].
- **Hans Scharler blog**, **Alvin Crespo on LinkedIn**, **cc.deeptoai.com guide** — independent writeups, all within last 6 months.

**Confirmation-bias guard:** The term is **Every's term traveling outward**, not a widely-converged community vocabulary. Lethain/Larson's piece is the strongest independent voice and he's gently skeptical of the originality claim while endorsing the operational value. No strong takedowns surfaced.

## Curriculum implications for M1/M2 anchor

**Use Klaassen — but honestly.** The framing fits M1→M2 precisely: M1 is warm-up with guardrails; M2 is "the system leap" — the move from *using Claude* to *building a system that compounds*. Klaassen's four-step loop (Plan → Work → Review → **Compound**) is the cleanest articulation in the wild of what M2 is teaching. The "compound" step — write learnings back to `CLAUDE.md` / skill files — **is literally what Agents 102 already does** (see project `memory/` directory, skill files, self-review protocol).

**Three anchor moves for M1/M2:**
1. **Quote Klaassen's "each unit makes the next easier"** as the opening frame of M2. It's memorable and practitioner-grounded.
2. **The 80/20 inversion (plan+review vs. execution)** is a Rory-style reframe — counterintuitive, load-bearing. Use it.
3. **`CLAUDE.md` as memory** is Klaassen's concrete artifact. Agents 102 already teaches this; naming it "compound" gives students vocabulary that travels (Larson, Google/Amazon engineers use it too).

**Honesty guardrail:** Flag Larson's point — compound engineering is *packaging*, not new ideas. For builder-leaders this is a feature, not a bug: the vocabulary makes the practice teachable. Don't oversell it as a new paradigm; sell it as the first clean name for what good practitioners were already doing.

**Counter-evidence to watch:** Single-person teams at Every are a selection effect — Every hires unusually strong engineers writing for an audience of engineers. The practice may not port directly to traditional enterprise teams where "taste" encoded in review agents is contested. M2 should teach the *loop*, not promise Every's outcomes.

---
**Freshness:** All primary sources within last 6 months (definitive guide late 2025/early 2026, Larson Jan 2026, plugin active). Cora-MVP-in-3-months is late 2024 — used as trajectory context, explicitly dated.
