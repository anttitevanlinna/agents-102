# Kieran Klaassen — Compound Engineering as Operational Practice

**Type:** Practitioner observation (Every Inc, GM of Cora) | **Evidence:** L2 with one independent analyst corroboration; convergence pending
**Key sources:** Klaassen's own essays on Every (Source Code, Context Window, Chain of Thought), the open-source `compound-engineering-plugin`, podcast appearances (host + guest format), Will Larson's independent practitioner analysis

Companion file: `every-inc.md` (the company shape — 10 people, 5 products). This file is the practitioner read on what Klaassen specifically argues for.

---

## The four-step loop

The through-line of every Klaassen appearance over the last 6 months: **Plan → Work → Review → Compound.** The agent plans, executes, reviews itself, and writes the lesson back so the next loop starts smarter.

- "Each unit of engineering work should make subsequent units easier — not harder." — Klaassen, *Compound Engineering: The Definitive Guide* (Every / Source Code, Feb 2026) — https://every.to/source-code/compound-engineering-the-definitive-guide
- The plugin codifies the loop as invokable commands — `EveryInc/compound-engineering-plugin` — https://github.com/EveryInc/compound-engineering-plugin

## The 80/20 inversion — planning and review are the job

If you spend most of your time typing code, you're doing it wrong. Klaassen's stated ratio is 80% planning and review, 20% execution. Humans frame and taste-check; the model does the middle.

- Klaassen, *My AI Had Already Fixed the Code Before I Saw It* (Source Code, Aug 2025, updated Apr 2026) — https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it
- Laura Entis on Klaassen, *You're the Bread in the AI Sandwich* (Every / Context Window, Apr 2026) — https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich. Entis is the byline; Klaassen was the AI & I podcast guest she wrote up.

## Plan-as-artifact — the markdown file is the contract

Before any agent writes code, produce a markdown plan with data models, file references, architectural decisions — detailed enough that a human or another agent could execute it without asking a question. Tests are written *from the plan*; testability is a planning output, not a post-hoc add-on.

- Dan Shipper on Klaassen, *Compound Engineering: How Every Codes With Agents* (Every / Chain of Thought, Dec 2025, updated Apr 2026) — [practitioner analysis] — https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents
- Will Larson on Klaassen, *Learning from Every's Compound Engineering* (Apr 2026) — https://lethain.com/everyinc-compound-engineering/. Larson reports the plan-as-artifact step survived contact with a real monorepo at Imprint.

## Parallel reviewer agents — fan-out instead of one bottleneck

Specialised reviewer agents (security, performance, architecture, style, accessibility) running in parallel. Klaassen describes a "14-agent parallel review" pattern — **[L2 single case]**.

- Klaassen, *Compound Engineering: The Definitive Guide* — link above
- Klaassen, *My AI Had Already Fixed the Code Before I Saw It* — iterating verifier prompts until tests pass 10 consecutive runs; verifier reliability treated as a measurable property

## The compound step — writing learnings back into CLAUDE.md

The difference between "I used an agent today" and "my codebase compounds" is one file. After every loop, capture the preference, bug-pattern, or architectural rule into CLAUDE.md / AGENTS.md / skill files. The next session starts there.

- Klaassen, *My AI Had Already Fixed the Code Before I Saw It* (single case, L2 — labelled below) — link above
- Larson (L1 analyst) characterises the compound step as "the one pattern many practitioners have intuited but have not found a consistent mechanism to implement" — single analyst opinion, not independent practitioner replication — https://lethain.com/everyinc-compound-engineering/
- Peter Yang on Klaassen, *How to Make Claude Code Better Every Time You Use It* (Behind the Craft podcast, Feb 2026) — [domain trade publication] — https://podcasts.apple.com/ky/podcast/how-to-make-claude-code-better-every-time-you-use-it/id1736359687?i=1000748776547. The episode title is the module.

## Operational scale — two engineers, five products

Cora, Monologue, Sparkle, Spiral, and Every.to run with primarily single-person engineering teams. The loop isn't theory; it's what makes that ratio work.

- Dan Shipper on Klaassen + Nityesh Agarwal, *How Two Engineers Ship Like a Team of 15 With AI Agents* (AI & I podcast, Jun 2025, updated Feb 2026) — https://every.to/podcast/how-two-engineers-ship-like-a-team-of-15-with-ai-agents. Shipper is the host; Klaassen and Agarwal are the guests.
- Cora MVP shipped solo in 3 months (late 2024) — trajectory context, dated; pre-6-month window
- "What used to take a week of coding now happens in hours" — Klaassen, *Definitive Guide* — **[L2 single case]** — outcome claim from a single team's self-report

## What he downplays

- **Prompt engineering as a standalone skill.** Absorbed into planning. Plan, CLAUDE.md, and reviewer skills carry the prompt quality.
- **Model selection tournaments.** He argues loop design, not Opus-vs-Sonnet-vs-GPT. The plugin ports across Codex, Cursor, Gemini CLI, Copilot — the model is substitutable.
- **MCP-server-building as a headline topic.** Mentioned, not central. The factory runs on plans, skills, and review agents.
- **"Vibes coding" / one-shot prompting.** Explicitly the anti-pattern.
- **Autonomy maximalism.** "You're the bread in the AI sandwich" — remove human taste and you get "generic slop." This is a meaningful downplay; Klaassen is the opposite of the full-autonomy camp.

## What's non-obvious

- **Tests are a planning output, not a coding output.** The plan specifies the tests; the agent writes them first.
- **Run the verifier 10 times before you trust it.** Reliability of the reviewer loop is measured, not assumed.
- **The compound step is where most teams fail.** Plan and Review are legible; Compound requires writing the lesson down when the feature already shipped. Larson confirms this is the load-bearing novel piece.
- **Taste is the non-automatable layer.** Not romantic — division-of-labour. Agents can't tell which of three correct solutions matches the vision in your head.
- **One plugin, many stacks.** Same loop in Claude Code, Codex, Cursor, Gemini CLI, Copilot. Factor practice from tool.

## Caveat — novelty-to-packaging ratio

Per Larson: roughly 1:3. Three of the four steps are well-known practice renamed; the compound step is the load-bearing new piece. A training built on this curriculum shape should be honest about that — *operationalising what good practitioners were already doing*, not a new paradigm. That honesty is what makes it teachable to CTOs.

---

<!-- maintainer -->

**Last updated:** 2026-05-03

**Source verification — MUST DO before first cohort:**

1. Re-open every URL against the original. Byline-checked URLs in this file:
   - *Compound Engineering: The Definitive Guide* — Klaassen byline confirmed (Source Code, Feb 2026, updated Mar 2026). [practitioner direct].
   - *Compound Engineering: How Every Codes With Agents* — Shipper + Klaassen joint byline confirmed (Chain of Thought, Dec 2025, updated Apr 2026). [practitioner direct].
   - *My AI Had Already Fixed the Code Before I Saw It* — Klaassen byline confirmed (Aug 2025, updated Apr 2026). [practitioner direct]. The Aug 2025 original date is outside the 6-month window; the Apr 2026 update brings it in. Treat as practitioner-direct, dated current via the update.
   - *You're the Bread in the AI Sandwich* — **byline is Laura Entis, not Klaassen.** Entis is a staff writer at Every who wrote the piece *about* Klaassen's appearance on the AI & I podcast. Re-attributed in body as "Laura Entis on Klaassen" per the writer-on-subject rule. [practitioner analysis], not [practitioner direct].
   - *How Two Engineers Ship Like a Team of 15* — **podcast episode page**, Dan Shipper hosting Klaassen + Nityesh Agarwal. Re-attributed as "Shipper on Klaassen + Agarwal." [practitioner analysis] (host writing up the episode); the underlying conversation is practitioner voice but the page framing is the host's.
   - *Behind the Craft* (Apple Podcasts) — Peter Yang hosting Klaassen, Feb 2026. Yang is a specialist host. Re-attributed as "Yang on Klaassen." [domain trade publication].
   - *This New Way* (YouTube) — Klaassen as guest, Oct 2025. **Outside the 6-month freshness window.** Removed from this file's primary evidence; if needed, treat as historical context with the Oct 2025 date explicitly stated.
   - Klaassen × Peter Yang explainer X post (status 2020638198649811203) — could not verify (request returned 402); **[UNVERIFIED]**. Drop unless reproducible at delivery.
   - `EveryInc/compound-engineering-plugin` GitHub — [practitioner direct].
   - Larson, *Learning from Every's Compound Engineering* — [practitioner analysis] confirmed.

2. Numbers to triple-check at delivery: "80/20 ratio" (Klaassen's own framing, single source); "14-agent parallel review" (Klaassen, single source); "tests pass 10 consecutive runs" (single source); "What used to take a week of coding now happens in hours" — keep `[L2 single case]` label, attribute to Every team self-report.

3. Freshness re-check at delivery: 6-month window. Aug 2025 originals only stay in if their Every update timestamp falls inside the window at the cohort date.

**Provenance — source-type labels:**

- Klaassen's Every essays where he is the sole byline — [practitioner direct]
- Klaassen + Shipper joint byline — [practitioner direct]
- Entis writing about Klaassen — [practitioner analysis]
- Shipper podcast episode pages featuring Klaassen — [practitioner analysis] (host framing) / underlying audio is practitioner voice
- Yang podcast episode featuring Klaassen — [domain trade publication]
- Larson on Klaassen — [practitioner analysis]
- `EveryInc/compound-engineering-plugin` repo — [practitioner direct]

**Companion files:** `every-inc.md` (the company shape — Compound Engineering at scale of 10), `boris-cherny.md` (Claude Code lead's coherent practice — partner case for the convergence read).
