# Agents 102 — Continuous Research System

Curated knowledge engine for the agentic transformation. **Curate → Connect → Advise.**

- **Research** (OODA, findings, KB, signals) → [`continuous-research/CLAUDE.md`](continuous-research/CLAUDE.md). Auto-loads under `continuous-research/`.
- **Curriculum** → [`curriculum/CLAUDE.md`](curriculum/CLAUDE.md) + `/content-creation`.
- **Strategy** (value prop, buyer, sequence, funnel, IP) → `bosser-strategy` skill.
- **Research results** → `continuous-research/synthesis/index.md`. Don't hardcode findings here.

## Permanent goals

1. **Continuously monitor the landscape.** KB more current than any individual.
2. **Find insights not on page-one Google.** Practitioner-grounded convergence + cross-domain meta + evidence-ladder-tested.
3. **Serve any builder leader, not only Antti.** Output valuable to a CTO who's never heard of Bosser.
4. **Respond to user signals.** Questions / corrections / validations = highest-priority research input.

## Strategic frame (one-liners)

- **Value prop:** competence makes the question askable. Without it, the CTO chooses between marketing stories.
- **Buyer:** the builder leader (CEO / CTO / SVP HR) who wants to own the transformation. Psychographic. Target: large Nordic — software + traditional pursuing high digitalization.
- **Sequence:** competence → discovery → context → platform. Tools commoditize; organisational learning rate is the ceiling.
- **Coding agents = meta-platform.** Claude Code + Codex compound; other platforms can't extend themselves.
- **80/20:** 80% frontier research (OODA) + 20% peer premium (user signals).
- **Funnel:** Newsletter ↔ Survey → DM.

Full strategic context → `bosser-strategy` skill.

## Multi-user hygiene

- **Session start:** `git pull`.
- **During:** commit + push signal files every 30–60 min.
- **Session end:** commit + push uncommitted signals.
- **Branching:** `main` = shared KB. OODA cycle can push directly (quality gates enforced). Users + experimental → branches; Antti merges.
- **Never `git stash` unless Antti asks.** Trunk-based, multi-session. WIP is deliberate. `git pull` complains → `git fetch` or commit; don't manufacture clean state. No rebasing.

## Copyright

Proprietary (`curriculum/`, `content/`, `site/`, `memory/`, `evals/`, `scripts/`, `.claude/`, root docs) → © 2026 Bosser Oy, all rights reserved. Each proprietary top-level folder carries `COPYRIGHT.md`. Public: `continuous-research/` under `continuous-research/LICENSE.md`. In doubt → root [`COPYRIGHT.md`](COPYRIGHT.md).

## Subagent rule injection

Subagents don't read CLAUDE.md. Prepend the canonical rule file to every launch:
- Research → `continuous-research/research-rules.md`
- Content → `.claude/rules/content-rules.md` (routes to `memory/check_*.md`)

## Orchestrator pattern

1. **Main thread = orchestrator only.** Delegate reading + analysis.
2. **3–5 parallel subagents** by file group. Each writes structured output to disk.
3. **Subagents write, not talk.** Main thread reads only summary files.
4. **Synthesize from summaries** → one verdict for user.
5. **One message, all agents.** `run_in_background: true`.
6. **Validate sweep output at apply time** at the Edit's Read-first gate. → `memory/compounded/2026-05-18-platform-explore-sweep-validate-each-at-apply-time.md`

## Self-review

- **Session start:** read `memory/self-review-protocol.md` § *Core heuristics*.
- **End of significant sessions:** run self-review per `memory/self-review-protocol.md`. Recurrence 3+ → hard rule or `check_*.md`.
