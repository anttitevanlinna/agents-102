# Long-running agentic coding — broader scan — OODA 2026-04-21

Scope: industry-wide signal on multi-hour coding agents, beyond the practitioners we already tracked (Ronacher, Cherny, Huryn, Ramp/Intercom, Karpathy). Freshness window: Oct 2025 – Apr 2026.

## New practitioners beyond earlier scan

- **Geoffrey Huntley** — "Ralph Wiggum" loop: same prompt fed to coding agent in infinite loop, progress persists in files + git, not in context window. Applied to whole-codebase language porting via subagent loops (Mar 2026 writeup). [practitioner direct] https://ghuntley.com/ ; context writeup [practitioner analysis] https://agent-wars.com/news/2026-03-15-ralph-autonomous-subagent-codebase-porting
- **Ivan Velichko (iximiuz)** — "A grounded take on agentic coding for production environments." Task-chunking is the core skill: too-large assignments yield unusable results, too-small create overhead. [practitioner direct] https://iximiuz.com/en/posts/grounded-take-on-agentic-coding/
- **Maxim Saplin** — "Long-Horizon Agents Are Here. Full Autopilot Isn't" (DEV Community) and OpenCode + GPT-5.2 Codex experiments. Emphasis on auditable tool-call logs, not hands-off runs. [practitioner direct] https://dev.to/maximsaplin/long-horizon-agents-are-here-full-autopilot-isnt-5bo7
- **Addy Osmani** — "The 80% Problem in Agentic Coding" (successor to 2024 "70% problem"). Last-mile (edge cases, integration, security, API keys) still human work; agents also introduce abstraction bloat. [practitioner direct] https://addyo.substack.com/p/the-80-problem-in-agentic-coding
- **Alberto Varela** — "Programming with AI, Without the Hype" (Feb 2026). Skeptic-pragmatist; manual faster than explaining to agent in many cases. [practitioner direct] https://albertovarela.net/blog/2026/02/programming-with-ai/
- **ClickHouse engineering** (team blog, multiple authors) — concrete C++ codebase practice. [practitioner direct] https://clickhouse.com/blog/agentic-coding
- **Mitchell Hashimoto** — "AI must operate tools, not just extend chat" adoption journey. [practitioner direct via] https://simonwillison.net/tags/mitchell-hashimoto/

Non-English: did not surface German/Japanese/Nordic practitioner blogs in English-language search. Gap; would need local-language search.

## Task shapes — what works / what doesn't

**Works (practitioner-reported):**
- **Whole-codebase ports / migrations** — Ralph loop pattern; progress in git, not context (Huntley).
- **Large refactors in mature test-covered codebases** — 1h17m, 6.2M tokens Express.js refactor where agent caught a race condition humans missed (search snippet, tech-press tier).
- **Scaffolded feature-from-spec** when chunked correctly (iximiuz).

**Breaks:**
- **C++ codebases** — ClickHouse: corrections needed "every ten minutes"; agents refactor things not asked to touch. [practitioner direct]
- **Last 20–30%** — edge cases, production integration, security, auth (Osmani).
- **Small, precise changes** — overhead dominates; manual is faster (Varela; Cyfrin "expensive and slow for small changes"). https://www.cyfrin.io/blog/expensive-and-slow-for-small-changes-why-ai-coding-agents-can-be-overkill
- **Stuck loops on unsolvable errors** — "overnight surprise" where stuck agent burns $thousands on formatting errors (Mindra, practitioner-adjacent).

## Concrete numbers

- **Cursor long-running agents**: 25–52+ hour autonomous runs, PRs with 151,000+ lines; hundreds of concurrent agents producing >1M LOC on single project. [vendor — Cursor blog, label as Level 0 marketing unless practitioner replicates] https://cursor.com/blog/scaling-agents
- **ClickHouse**: intervention cadence ~every 10 minutes on C++ codebase. [practitioner direct]
- **Token economics**: typical 50-turn agentic session ≈1M input + 40k output tokens; ~$6 on Opus vs ~$0.60 on cheaper model. One developer: 10B tokens over 8 months ≈ $15k at API pricing. [practitioner/research] https://openreview.net/forum?id=1bUeVB3fov
- **Stack Overflow 2025 Survey** (N=49,000): only 31% use agents, 38% have no plans; among users, 70% report task-time reduction, 17% report collab improvement; 87% concerned about accuracy. [academic/research — survey] https://survey.stackoverflow.co/2025/ai
- **Ronacher poll (referenced via Osmani)**: 44% of 5,000 devs now write <10% of code manually. [practitioner, secondary cite — needs original URL] [SOURCE NEEDED for original poll]

## Counter-evidence and sceptics

- **Addy Osmani** — 80% problem persists; problems shifted, didn't disappear; abstraction bloat is new failure mode. [practitioner direct]
- **Alberto Varela** — manual often faster and more precise than explaining to agent. [practitioner direct]
- **Maxim Saplin** — explicit "full autopilot isn't" thesis; only auditable logs, not autonomy. [practitioner direct]
- **Stack Overflow 2025** — trust at all-time low; 52% of devs don't use agents or stick to simpler tools. [academic/research]
- **Cyfrin** — agents overkill for small changes; cost/latency dominates. [practitioner adjacent]
- **GitHub Engineering** (Feb 2026) — multi-agent workflows fail in subtle ways (agent A closes issue agent B opened; silent downstream-check breakage). [tech press / vendor-adjacent — treat cautiously] https://github.blog/ai-and-ml/generative-ai/multi-agent-workflows-often-fail-heres-how-to-engineer-ones-that-dont/

## Convergence level assessment

**Level 3 convergence (report-able):**
- **Task-chunking is the skill** — iximiuz, Osmani, ClickHouse, Saplin all independently: size tasks to agent capability; checkpoint architecture beats one-big-prompt.
- **Last-mile still human** — Osmani, Varela, ClickHouse, Stack Overflow survey all converge.
- **Language/codebase maturity matters** — C++ painful (ClickHouse), mature test-covered refactors work (Express.js case, Cursor claims).

**Level 2 (single-case, not yet convergence):**
- Ralph-loop pattern — mostly Huntley + followers; viral but not yet independently replicated at scale in enterprise.
- 25–52 hour Cursor runs — single vendor claim, not independently reproduced with outcome data.

**Level 1 only:**
- "Full autopilot" — multiple practitioners converge on *rejecting* this, i.e., convergence against the claim.

## What I looked for but didn't find

- Non-English-language practitioner writeups (German/Japanese/Nordic).
- Independent replication of Cursor's 52-hour runs with outcome data (bug density, revert rate, production survival).
- Quantified intervention rate per hour across practitioners — ClickHouse's "every 10 min" is a rare concrete number.
- "I ran an overnight agent and it wasted X hours" postmortems from named practitioners — found vendor-framed failure posts, not personal retros.
- Long-running coding agents in non-code domains (compliance, data pipeline migrations) with named practitioners.

## Curriculum implications — held loose

- **M3 send-off framing holds**: task-chunking skill IS the skill. Four independent practitioners converge.
- **M4 return framing**: teach students to expect 20% last-mile + abstraction bloat. Don't sell "walk away for 4h, come back to finished work." Sell "walk away for 2h, come back to review a PR that's 80% there."
- **Teach the skeptic cases first**: ClickHouse C++ 10-min cadence, Varela "manual faster" cases. Without this, students over-trust.
- **Ralph loop is demo-worthy but not yet Level 3.** Mention as pattern; don't hinge exercise on it.
- **Cursor 52h runs: do NOT cite as practitioner evidence.** Vendor marketing until independently replicated.
- **Trust gap is the real story** — 52% of devs still don't use agents (Stack Overflow 2025). Our training addresses a minority-but-growing practice. Frame accordingly.
