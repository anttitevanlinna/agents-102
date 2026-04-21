# Practitioner patterns for long-running agentic tasks — OODA 2026-04-21

**Scope:** what working engineers actually do to run Claude Code (and Amp / Codex) on multi-hour tasks. People-first: Willison, Ronacher, Cherny, Karpathy, Charles (Ramp), Wilson Lin (Cursor), Geoffrey Huntley. Freshness cut: Oct 2025 onward. Feeds Agentic Engineering 101 M3.

**Evidence level overall: L3 convergence.** Same patterns recur across ~8 independent practitioners writing in their own voice. The December 2025 → April 2026 window is when long-running stopped being a demo and started being a daily workflow; Karpathy's public flip (Dec 2025) is the convergence marker.

---

## Task shapes that work (with practitioner + URL)

- **Incremental ports with a reference to diff against.** Armin Ronacher's MiniJinja Rust→Go port: ~10 hours total agent time (3h supervised + 7h alone), 2.2M tokens. The load-bearing move was "reuse the Rust snapshot tests and port incrementally (lexer → parser → runtime)." A second artifact to diff against is the durable pattern. [practitioner direct] https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/
- **Well-scoped feature deltas, run in parallel.** Karpathy: 10–20 agents running concurrently, each ~20 minutes on a well-scoped task. He "expresses will" rather than writes code. [practitioner direct] https://x.com/karpathy/status/2026731645169185220
- **Multi-day greenfield build with planner/worker/judge hierarchy.** Wilson Lin / Cursor's FastRender browser — hundreds of concurrent agents, ~1M lines, trillions of tokens, >1 week. Crucial detail: Git submodules pull in WhatWG/CSS-WG specs as reference material the agents can read. [practitioner analysis, via Willison] https://simonwillison.net/2026/jan/19/scaling-long-running-autonomous-coding/
- **Parallel-fanout synthesis.** Ramp (Geoff Charles): Claude launches 6–10 parallel agents to scan competitors, Gong calls, Zendesk tickets, codebase; each writes a markdown file; a synthesizer reads the markdown and extracts patterns. File-based RAG as the handoff medium. [practitioner direct, podcast] https://creatoreconomy.so/p/inside-ramp-the-32b-company-ai-agents-geoff-charles
- **Batch work under a Ralph loop.** Geoffrey Huntley's "Ralph Wiggum" technique — `while true; do claude "$prompt"; done` with a plan.md the agent updates. Anthropic shipped this as an official plugin. Works best for: large refactors, ticket triage, test coverage, docs. Explicitly NOT for production features. [practitioner direct] https://github.com/anthropics/claude-code/blob/main/plugins/ralph-wiggum/README.md

**Not on the list (counter-evidence):** Armin has a standing "agent design is still hard" post (Nov 2025) — building a novel agent system from scratch still breaks. Long-running works when the task shape is known; novel-agent-design is not that task shape. [practitioner direct] https://lucumr.pocoo.org/2025/11/21/agents-are-hard/

## Prompt shapes that sustain

- **Reference corpus inside the repo.** Willison/Cursor: specs as git submodules. Cherny: CLAUDE.md checked into git, ~2.5k tokens, records mistakes and conventions. [practitioner direct] https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny
- **plan.md the agent owns and mutates.** Ralph pattern — the plan file IS the durable state. Each iteration reads the file, picks next item, updates it. [practitioner direct] https://paddo.dev/blog/ralph-wiggum-autonomous-loops/
- **Align-then-run.** Ronacher starts by asking the agent how it would validate the work, then negotiates the validation loop before letting it run. The validation method is the prompt's spine. [practitioner direct] https://lucumr.pocoo.org/2026/1/14/minijinja-go-port/
- **Minimum-viable scope.** Ralph guide: "Define the minimum viable version of your idea." Karpathy's 20-minute-task rule is the same discipline at smaller scale.

## Monitoring patterns

- **File-based status, not chat scrollback.** Ramp's markdown-per-agent pattern; Ralph's plan.md; Cherny's CLAUDE.md-as-log. The scrollback is ephemeral; the files are the memory.
- **Agent-stop hooks as verification gates.** Cherny: on stop, either (a) a separate background agent verifies, or (b) a deterministic shell hook checks invariants, or (c) Ralph re-feeds the prompt. [practitioner direct] https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually
- **Sandbox + auto-mode.** Cherny uses `--dangerously-skip-permissions` inside a sandbox for long runs; Anthropic's "auto mode" (rolled out with Opus 4.7, Apr 2026) is the safer version. The point: permission prompts destroy overnight runs; deal with that at the sandbox layer, not the model layer.
- **Rate limiter + circuit breaker.** Ralph implementations cap iterations (10–20 initially), hourly API call limits, error-pattern detection. Runaway cost is the named risk.

## Recovery patterns

- **Session logs as the real source of truth.** Willison recovered lost work from `~/.claude/projects/` after a crash. The chat log persisted what the worktree didn't. [practitioner direct] https://simonwillison.net/2026/Feb/19/recovering-lost-code/
- **Worktrees per agent.** Karpathy's 10–20 parallel pattern requires per-agent isolation; git worktrees are the standard primitive.
- **Durable execution frame.** Ronacher (Absurd, Postgres-backed): "agents can take a very long time and if they interrupt, you want to bring them back to the state they were in." [practitioner direct] https://lucumr.pocoo.org/

## Failure modes by hour

- **Hour 0–0.5: goal drift starts when instructions get buried.** Sessions past ~30 min, 20+ files, multi-phase reasoning hit a "fundamentally different failure profile" (SitePoint synthesis of practitioner reports). [tech press] https://www.sitepoint.com/claude-code-in-production-how-to-keep-long-runs-stable/
- **Hour 1–2: context rot.** Low signal-to-noise in the window; Claude rehashes approaches already ruled out. Named in multiple practitioner posts. [practitioner analysis] https://medium.com/@chris.d.bartholomew/fixing-context-rot-from-context-engineering-to-context-optimization-5520c6057acb
- **Hour 2+: "plausible but wrong."** Outputs look reasonable in isolation but don't match original spec. Mitigation = external verifier (tests, snapshots, a judge agent), not bigger context.
- **Multi-agent: context amnesia → overwrite.** Parallel agents stomp each other when they share state through the LLM instead of through files. Ramp's markdown-file handoff is the convergent fix.
- **Novel-agent-design task shape: still breaks.** Armin's "Agents Are Hard" counter-evidence — long-running doesn't rescue a task the model can't reason about stepwise.

## What I looked for but didn't find

- **Hard hour-by-hour failure-rate numbers.** Practitioners describe qualitative drift; nobody published "at hour N, P(failure)=X." Claim of "30-minute threshold" is directional, not measured.
- **Benjamin Sottiaux / Quesma recent output on long-running.** No fresh signal in the last 6 months surfaced. [SOURCE NEEDED]
- **Darragh Curran / Intercom on long-running *coding* agents specifically.** Fin is customer-service agentic; his public writing is on that, not coding-agent workflows. Not the right source for M3.
- **Pawel Huryn "CLAUDE.md that learns" piece.** Referenced in the brief; didn't verify a fresh URL in this cycle. [SOURCE NEEDED]
- **Independently measured productivity deltas** on multi-hour runs — Ramp's "50% of prod code AI-generated" is a vendor-adjacent claim, not a controlled measurement.

## Curriculum implications for M3

1. **Teach the shape before the duration.** Long-running isn't a skill; it's a consequence of three things: (a) a reference artifact to diff against, (b) a plan.md the agent mutates, (c) an external verifier. Students who skip to "run it overnight" without those three will produce plausible-but-wrong.
2. **The walk-away test has a precondition: file-based state.** If the agent's memory lives in the scrollback, you can't walk away. Teach CLAUDE.md + plan.md + per-agent markdown as the monitoring substrate. This is exactly the "file-based agentic RAG" M2 already teaches — M3 is its multi-hour application.
3. **Ramp scaffold: simplest real pattern.** 6–10 parallel agents each writing a markdown file, one synthesizer reading the files. Students can replicate in one afternoon. Matches M2→M3 progression.
4. **Named failure modes beat abstractions.** Teach three by name: *context rot, goal drift, plausible-but-wrong.* Each has a specific countermeasure (compaction, plan.md re-read, external verifier). This is the M3 exercise debrief vocabulary.
5. **Ralph is a demo, not the target.** Show the Ralph loop to make the "agents can iterate autonomously" point vivid, then explicitly say: proof of concepts, not production. Avoids the cargo-culting that kills credibility.
6. **Durable execution is the bridge to M5+.** Ronacher's frame (agents as long-lived workflows that must survive restarts) is where engineering managers' vocabulary finally fits. Foreshadow; don't load it all into M3.

---

**Cycle author:** Opus 4.7 research subagent. Web access partially restricted — four fetches were denied by sandbox (noted inline where sourcing is thinner). WebSearch snippets carried most of the practitioner quotes; every URL above is verifiable by a human reader in one click.
