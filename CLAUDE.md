# Agents 102 — Continuous Research System

Curated knowledge engine for the agentic transformation. Multi-user research system that answers the CTO question with evidence, not vendor stories. **Curate → Connect → Advise.**

## Where to look next

- **Doing research (OODA cycles, writing findings, querying the KB, capturing user signals) → read [`continuous-research/CLAUDE.md`](continuous-research/CLAUDE.md).** File map, methodology, research quality rules, user-signal capture live there. Auto-loads when editing files under `continuous-research/`.
- **Doing curriculum work → read [`curriculum/CLAUDE.md`](curriculum/CLAUDE.md)** + invoke `/content-creation`.
- **Business model / strategy → `strategy/` directory.**
- **Research results live in synthesis files, not here.** Read `continuous-research/synthesis/index.md` for current state. Do not hardcode findings in this CLAUDE.md — they go stale.

## Permanent Goals

Standing objectives for every session, every agent, every cycle. Not milestones — these never complete.

1. **Continuously monitor the landscape.** Run the research loop. Track platforms, practitioners, deployments, failures. The knowledge base must be more current than any individual person can maintain. If the research system stops, the entire value proposition decays.

2. **Find insights and answers not available with simple internet search.** Google returns vendor press releases, analyst predictions, and rewritten announcements. We produce practitioner-grounded convergence patterns, cross-domain meta-findings, and evidence-ladder-tested claims. If a finding could be assembled from the first page of Google results, it's not worth publishing.

3. **Serve agentic industry leaders — not only Antti.** The knowledge base, insights, and training serve any builder leader navigating the agentic transformation. Antti is the practitioner and curator, not the sole customer. Every output should be valuable to a CTO who has never heard of Bosser.

4. **Respond to what users actually need.** User signals (questions, corrections, validations) are the highest-priority research input. The system gets smarter because users steer it — not because researchers guess what matters.

## Strategic frame

**Value prop:** The hardest problem isn't choosing an agent platform — it's knowing what questions to ask. Without agent competence, a CTO is choosing between marketing stories, not between real capabilities. We build the competence that makes the question askable. Teach everyone to think. Scale for future. With your own structure.

**Buyer:** The builder leader — CEO/CTO/SVP HR who wants to own the transformation, not outsource it. Psychographic, not a title. Target: large Nordic companies in two segments: (1) software companies, (2) traditional companies striving for high digitalization.

**Core insight:** The agentic transformation is different from digital/agile/cloud. Without agent competence, there is no vision — just governance of an abstraction. We are the prerequisite, not the complement. The sequence matters: **Competence → discovery → context → platform.** Skip to platform selection and you're choosing between vendor narratives. Every company runs 200 processes — vendors will sell you automation for the one process they own. The other 199 are yours, and you need agent competence to even know which 5 to try first. **Tools and connectors commoditize — the real ceiling is organizational learning rate.** Training raises the ceiling. Everything else raises the floor.

**Coding agents are the meta-platform.** Claude Code and Codex are structurally different from every other agent platform because they compound. Copilot Studio can't build another Copilot Studio agent. Agentforce can't extend Agentforce. Coding agents build the MCP server, the agent that uses it, the eval that tests it, and the next agent. Each cycle makes the next cycle faster. They also destroy every alternative at information retrieval and context creation in real enterprise environments — reading repos, crawling docs, querying databases, analyzing APIs, synthesizing across sources, then outputting the structured artifacts that encode context for other agents. The human provides judgment; the coding agent provides speed. Together they raise the ceiling faster than any other combination.

**80/20 curation model:** 80% frontier research (continuous OODA cycles) + 20% peer premium (user signals, patterns across engagements). The knowledge base compounds. Competitive moat is not any single finding, but the live, structured, practitioner-grounded system that stays current.

**Marketing funnel:** Newsletter ("Deploying Agents") ↔ Survey (Agentic Readiness Check) → DM. Both entry points cross-feed each other. Full plan in the private `bosser-strategy` skill.

## Multi-User Hygiene

This is a shared, multi-user repository. Research runs continuously on remote branches.

- **At session start:** `git pull` to get the latest research. Other users and research agents may have committed since last session.
- **During session:** Commit and push user signal files every 30–60 minutes of active work, or whenever a meaningful signal is captured.
- **At session end:** Always commit any uncommitted signal files and push. A user's questions and comments are lost to the research system if they stay local.
- **Branching model:** `main` is the shared knowledge base — the source of truth. Research agents running the OODA cycle prompt can push directly to main (cycle prompt enforces quality gates). Users and experimental work should use branches; Antti reviews and merges those.

## Copyright — two-tier rule

- **Proprietary scope:** `curriculum/`, `content/`, `site/`, `memory/`, `evals/`, `scripts/`, `.claude/`, and root docs (`content-style-guide.md`, `README.md`, `CLAUDE.md`, `PROMPT.md`) are **© 2026 Bosser Oy, all rights reserved.** Any new module, exercise, lecture, article, site asset, memory page, eval, script, or Claude Code skill under those paths is automatically covered. Do NOT reuse without written permission. Do NOT reproduce training content from external sources into those paths.
- **Public scope:** `continuous-research/` is the open knowledge base. Read, quote, fork, and contribute under `continuous-research/LICENSE.md`. Contributions grant Bosser Oy and the community a perpetual, non-exclusive license.
- **Per-folder notices:** Each proprietary top-level folder carries a short `COPYRIGHT.md` pointing back to the root `COPYRIGHT.md`. When creating a new proprietary folder, add one. Do NOT add one to `continuous-research/`.
- **When in doubt, the root [`COPYRIGHT.md`](COPYRIGHT.md) is the source of truth.**

## Subagent rule injection

**Canonical sources:** `.claude/rules/research-rules.md` (research subagents) and `.claude/rules/content-rules.md` (content subagents — routes to the matching `memory/check_*.md` compendium).

Every research and content subagent launch MUST read the relevant rule file and prepend its full contents verbatim to the subagent prompt. Subagents do not read CLAUDE.md. One edit to the rule file propagates to every future subagent; no copy-paste drift.

## Orchestrator Pattern for Multi-File Work

When a task spans many files (audits, research runs, bulk edits), preserve main-thread context:

1. **Main thread = orchestrator only.** Do not read or process target files yourself. Delegate all file-reading and analysis to subagents.
2. **Split work into 3–5 parallel subagents** by file group. Each agent reads its files, does the analysis, writes results to a dedicated output file (e.g., `analytics/audit-batch-{N}.md`).
3. **Subagents write, not talk.** Structured output to disk. Main thread reads only summary files, not source files.
4. **Synthesize from summaries.** After agents complete, main thread reads small structured output files and synthesizes a single verdict for the user.
5. **Launch all agents in one message** to maximize parallelism. Use `run_in_background: true` so the main thread stays responsive.

## Self-Review Protocol

At the **start of each session**, read `memory/self-review-protocol.md` § *Core heuristics* (top). Apply them before doing any work.

At the **end of significant sessions**, run a self-review:
1. Identify corrections Antti made (where my approach was redirected)
2. Classify each correction (style, strategy, decision, process, persona)
3. Update the correction log and heuristics in `memory/self-review-protocol.md`
4. Recurring patterns — if the same correction appears 3+ times, escalate to a hard rule (Hard rules section) or a `check_*.md` compendium where it'll fire at generation time

Goal: Antti's steering diminishes over time because I learn from each session. If I'm still making the same framing errors after 5 sessions, the protocol isn't working.
