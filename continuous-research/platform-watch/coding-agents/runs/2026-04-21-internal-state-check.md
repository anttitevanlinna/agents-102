# Internal state check — long-running agentic tasks — 2026-04-21

## What we already know

**Opus 4.7 specifics — NOTHING DOCUMENTED YET.** The latest model tracked is Opus 4.6 (Feb 2026). No Opus 4.7 mention in platform watch as of April 21. Critical gap for M3.

**Long-running capabilities shipped (Opus 4.6 era):**
- **METR task horizon:** Opus 4.6 measured at 50%-time 14h30m, 80%-time 1h3m — longest horizon of any model tested (continuous-research/platform-watch/claude-anthropic/runs/2026-03-21-run03.md:METR). This is task-completion time, not session persistence.
- **Claude Routines (April 14, GA research preview):** Scheduled automations on Anthropic infrastructure. Triggers: schedule or GitHub event. Usage limits: Pro 5/day, Max 15/day, Team/Enterprise 25/day (continuous-research/platform-watch/coding-agents/state.md:38-42). First persistent autonomous business workflow capability.
- **Cowork scheduled tasks:** Daily, weekly, hourly, on-demand. Each task spins up its own session (continuous-research/platform-watch/claude-anthropic/runs/2026-04-02-anthropic-platform-deep-dive.md:95-98).
- **Session resumption (Antspace BYOC):** `resume-cached` default mode, smart git handling, session context API. Allows picking up from checkpoints (continuous-research/platform-watch/claude-anthropic/state.md:280).
- **No persistent memory across sessions documented.** Both Willison and Józefiak (independent reviews) converge: Cowork/Claude Code sessions are "mostly fresh" — no cross-session learning or state carried forward (continuous-research/platform-watch/claude-anthropic/state.md, Paweł Józefiak March 24).

**What FAILS in long-running scenarios:**
- **Managed Agents missing features:** Multi-agent coordination + self-evaluation still in research preview. Persistent agent memory and scheduled recurring tasks missing (continuous-research/platform-watch/claude-anthropic/state.md, Medium analysis). Lock-in risk (Claude-only, no model flexibility).
- **No documented failure modes or recovery patterns.** Research has NOT captured practitioner-reported failures in multi-hour runs, timeout recovery, session loss, or walk-away-and-come-back success patterns.

---

## Named practitioners already tracked

**Who specifically mentions long-running work:**
- **Intercom R&D (Darragh Curran, April 16, 2026):** "2x factory" runs 2,539 CI jobs/day with Claude Code agents. 93.6% of PRs agent-driven. 497 fully autonomous PRs (Claude wrote + reviewed + approved + shipped) in 4 weeks. No explicit mention of multi-hour runs; emphasis is on high-throughput, not long-duration (continuous-research/observations/intercom.md).
- **Paweł Józefiak (March 24, 2026):** Built custom Mac-based agent with 25 background processes. Tested Computer Use (~50% success), MCP connectors. Assessment: Cowork is "stripped and limited" due to session-freshness problem (continuous-research/platform-watch/claude-anthropic/state.md).
- **Every Inc. (compound engineering methodology):** First named methodology for agent-compounding work. Plan (80%) → Work (20%) → Review (parallel subagents). Learnings feed CLAUDE.md for next cycle. No explicit long-running evidence; emphasis is on iterative work loops and context compounding (continuous-research/platform-watch/coding-agents/state.md:173-191).

**NOT tracked with long-running specifics:**
- No named practitioners reported sustained multi-hour agent tasks
- No documented cases of agents "walking away" for 8+ hours and resuming
- No practitioner reports on Opus 4.6/4.7 timeout recovery or session resilience

---

## Patterns already documented

**Relevant cross-cutting patterns (from findings/by-pattern/):**
1. **`coding-agent-as-general-platform`:** Claude Code as substrate for building other agents and business tools. Intercom's plugin-based workflow is evidence. No explicit long-running signal.
2. **`conditions-creator`:** Infrastructure that enables repeated compounding (Intercom's team-2x + auto-updating plugin repo). Enables scaled, sustained work — but not explicitly about task duration.
3. **`rules-verification-scarcity`:** Verification infrastructure load-bearing to agent reliability. Relevant to recovery patterns, but no long-running specifics documented.
4. **`hybrid-beats-autonomous`:** Counter-evidence pattern. Autonomous agents fail on complex/ambiguous tasks. Devin 85% failure rate on complex work (continuous-research/platform-watch/coding-agents/state.md:151-154). Relevant for understanding failure modes but not recovery patterns.
5. **`absorption-bottleneck`:** Top 5% of users = 6x median throughput (Intercom data). Suggests sustained use requires expertise + infrastructure investment. Not about task duration.

**Synthesis finding Level 3 (approaching):**
- Finance/accounting = third domain with convergence on autonomous agents (continuous-research/insights.md:89-105). Autonomous with human oversight for material decisions. NOT about duration — about rules-based, verifiable, talent-constrained processes.

---

## Gaps for M3

**Critical unknowns:**
1. **Opus 4.7 long-running behavior:** Has it shipped? Are there documented changes vs 4.6 for task horizon, context compaction, or session persistence? M3 curriculum needs concrete model-specific guidance, and we have zero data.
2. **Multi-hour task failure modes:** Practitioners haven't documented what breaks in 4-8 hour runs. Timeout signatures? Token-limit edge cases? Hallucination drift? Session state corruption?
3. **Recovery patterns:** When a long-running agent fails at hour 3 of 8, what recovery mechanism exists? Checkpoint/resume? Retry? State loss = restart from scratch?
4. **Walk-away pattern evidence:** Can a developer hand off a task to Claude Code/Claude Agent SDK and _leave for 8 hours_, then check status the next morning? Any named practitioners doing this?
5. **Scale evidence:** Intercom runs thousands of autonomous PRs, but they're short-duration. What's the longest-duration agent task documented in production?
6. **Infrastructure resilience for long-running:** Antspace is staging. BYOC session resumption works, but at what scale? Anthropic infrastructure outage during a 6-hour agent run — what happens?

---

## Counter-signals / failure modes captured

**Already documented in research:**
- **Infrastructure fragility (Level 3):** Anthropic: 109 incidents in 90 days (Mar 2026). API uptime 99.34% = ~6 hours downtime/month. Two major outages (Mar 2-9, Feb 27-Mar 5) with ChatGPT influx caused 300% API spike, 14 incidents. This is relevant to long-running task reliability — a 6+ hour task has 60%+ chance of hitting an infrastructure incident (continuous-research/platform-watch/claude-anthropic/state.md:206, synthesis.md:60).
- **Session freshness problem:** Cowork/Claude Code have no persistent learning across sessions. Each resumption is "mostly fresh" (Józefiak, Willison). This breaks the compound-learning pattern M3 might depend on.
- **Governance missing in long-running context:** Okta identity governance ships April 30, but action governance (what agents can do after authorization) is still absent. For long-running autonomous agents, the governance gap is critical — an 8-hour agent could legitimately execute actions it shouldn't (continuous-research/platform-watch/cross-platform/runs/2026-04-20-cycle106.md:41-48).
- **No deployment evidence for multi-hour autonomous work:** Zero named practitioners report sustained agent deployments. Intercom's 497 fully autonomous PRs are fast (PR approval 14.6 min median). Every Inc.'s compound methodology is iterative but not single-task-duration-focused.

**NOT counter-evidenced (absence of signal):**
- Devin 85% failure on complex/ambiguous tasks — but Devin is "fully autonomous." Hybrid approaches (with checkpoints/reviews) aren't characterized.
- METR: experienced developers 19% slower with AI tools — but METR used early-2025 tools, current tools are "meaningfully different," and follow-up study was unreliable.

---

## Format summary for M3 writers

**What M3 curriculum can assume exists:**
- Opus 4.6 (14.5h task horizon documented)
- Session resumption API + BYOC Kubernetes integration (in staging)
- Scheduled task primitives (Routines, Cowork tasks)
- Auto-approval system for low-risk PRs (Intercom precedent)
- Checkpoint/resume across context windows (named in agent SDK, not extensively documented)

**What M3 curriculum CANNOT assume:**
- Opus 4.7 characteristics (unknown)
- Practitioner playbooks for multi-hour walk-away tasks (none documented)
- Recovery patterns from mid-task failures (no evidence)
- Long-running agent memory/learning (explicitly NOT supported)
- Infrastructure SLA guarantees during multi-hour runs (fragility documented, uptime gaps visible)

**What M3 needs from external OODA:**
- Opus 4.7 task horizon + recovery behavior (if available)
- Named practitioners running 4-8 hour agent tasks with documented outcomes
- Failure case studies from long-running autonomous work
- Recovery patterns from infrastructure incidents during agent execution
- Governance recommendations for unsupervised multi-hour agents

---

*Synthesis prepared for Module 3 research handoff. Internal research cycles 94-106 merged from scheduled-research branch.*
