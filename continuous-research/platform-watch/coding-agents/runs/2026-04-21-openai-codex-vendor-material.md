# OpenAI / Codex — official material on agentic coding — OODA 2026-04-21

**Scope:** OpenAI's own positioning of Codex. Every source below is Level 0 vendor material. This maps what OpenAI SAYS, not what is independently verified. Use to understand the surface area students may encounter in their day jobs, not to ground claims about what works.

## What's officially shipped (bare facts only)

- **Codex CLI** — open-source Rust-based coding agent that runs locally in the terminal. [vendor docs — developers.openai.com/codex/cli] and [vendor GitHub — github.com/openai/codex]
- **Codex IDE extension** — shares config with the CLI via `~/.codex/config.toml`. [vendor docs — developers.openai.com/codex/mcp]
- **Codex app / Codex Cloud** — hosted long-running jobs. [vendor blog — openai.com/index/introducing-the-codex-app/]
- **Models:** GPT-5.1-Codex-Max (Nov 2025), GPT-5.2-Codex, GPT-5.3-Codex (Feb 5, 2026 — "new industry high on SWE-Bench Pro and Terminal-Bench"), GPT-5.3-Codex-Spark (faster variant). [vendor blog — openai.com/index/introducing-gpt-5-3-codex/]
- **Agents SDK integration** — Codex CLI can expose itself as an MCP server with `codex()` / `codex-reply()` tools for SDK agents. [vendor docs — developers.openai.com/codex/guides/agents-sdk]
- **Skills + Plugins** — SKILL.md format, plugins bundle skills + MCP servers + app integrations. [vendor docs — developers.openai.com/codex/skills, /codex/plugins]
- **AGENTS.md** — per-repo + global instruction files (override chain, 32 KiB default cap). [vendor docs — developers.openai.com/codex/guides/agents-md]
- **Codex Plugin for Claude Code** — OpenAI shipped a plugin making Codex callable *from* Claude Code. [vendor community — community.openai.com/t/introducing-codex-plugin-for-claude-code]

## OpenAI's positioning on long-running / agentic coding

- **"Harness engineering" is the named discipline.** OpenAI frames the job as "designing environments, specifying intent, and building feedback loops." Depth-first decomposition: design → code → review → test as reusable building blocks. [vendor blog — openai.com/index/harness-engineering/, Feb 11, 2026]
- **25-hour demo is the flagship claim:** one Codex run, ~13M tokens, ~30k lines of code to build a design tool. Recommended technique: "durable project memory" — spec, plan, constraints, status written to markdown files Codex revisits. [vendor blog — developers.openai.com/blog/run-long-horizon-tasks-with-codex, Feb 23, 2026]
- **Compaction** is OpenAI's named long-context mechanism: GPT-5.1-Codex-Max is "natively trained to operate across multiple context windows" by pruning history while preserving important context. [vendor blog — openai.com/index/gpt-5-1-codex-max/]
- **"Zero lines manually written" internal beta** — OpenAI says they built an internal product where every line (app, tests, CI, docs, observability) came from Codex. [vendor blog — openai.com/index/harness-engineering/]

## Memory, tool use, MCP support

- **MCP: fully supported.** Codex CLI and IDE extension both consume MCP servers. Two transports: STDIO and Streamable HTTP. Bearer token + OAuth for HTTP. [vendor docs — developers.openai.com/codex/mcp]
- **Codex as MCP server:** stdio mode, usable from Agents SDK or any MCP client. [vendor GitHub — github.com/openai/codex/blob/main/codex-rs/docs/codex_mcp_interface.md]
- **Memory primitive is markdown files** — AGENTS.md for persistent instructions; the long-horizon guide explicitly recommends markdown spec/plan/status files (not a proprietary memory store). [vendor blog — long-horizon guide]
- **Skills** are the reusable unit: SKILL.md + scripts + references, discovered by scanning `.agents/skills` from cwd up to repo root. [vendor docs — developers.openai.com/codex/skills]

## Multi-agent guidance

- **Subagents are manual, not automatic.** "Codex doesn't spawn subagents automatically — only when you explicitly ask." Trigger phrases cited: "spawn two agents," "delegate this in parallel," "use one agent per point." [vendor docs — developers.openai.com/codex/concepts/subagents]
- **Read-heavy parallel is safe; write-heavy is warned against** — "agents editing code at once can create conflicts and increase coordination overhead." Recommended parallel work: exploration, tests, triage, summarization. [vendor docs — subagents]
- **Agents SDK** is the recommended orchestrator for "deterministic, reviewable workflows" scaling "from a single agent to a complete software delivery pipeline." [vendor docs — agents-sdk guide]

## Failure modes OpenAI publicly acknowledges

- **"If each iteration changes too many things at once, Codex cannot tell which idea improved the score."** [vendor docs — developers.openai.com/codex/use-cases/iterate-on-difficult-problems]
- **Codex Cloud jobs killed for resource limits** — acknowledged in troubleshooting; specific limits not published. [vendor docs — app/troubleshooting]
- **Run-control issues** where stop + new instruction allows old plan to resume — acknowledged on developer community, not in core docs. [vendor community]
- **macOS sandbox directories** (Music/Downloads/Desktop/home) need explicit approval.

## Comparison to Claude Code (where they address it)

- **OpenAI does NOT position Codex against Claude Code in its marketing blog posts.** Named competitors: absent. Benchmarks are against other OpenAI models and abstract benchmarks (SWE-Bench Pro, Terminal-Bench 2.0), not head-to-head with Claude.
- **Implicit acknowledgment of Claude Code ecosystem:** OpenAI shipped a "Codex Plugin for Claude Code" (community announcement) and a "Claude-to-Codex" bridge that auto-converts Claude skills. OpenAI publicly notes Claude Code skills "don't work in Codex CLI out of the box because tool references are different, frontmatter is stricter, and CLAUDE.md becomes AGENTS.md." [vendor community posts]
- **Silence is data:** no OpenAI blog post claims Codex is better than Claude Code for agentic coding. The comparison they fight on is model benchmarks, not harness quality.

## What I looked for but didn't find

- **No published guidance** on when NOT to use Codex / when to reach for a different tool.
- **No numbers** on Codex Cloud resource limits (CPU/RAM/runtime) despite acknowledged timeouts.
- **No OpenAI-published practitioner case studies** of non-OpenAI enterprises running Codex for multi-hour agentic work beyond internal demos.
- **No direct comparison** to Claude Code's Skills, Agent SDK, or subagent model — despite clear format borrowing (SKILL.md, AGENTS.md ≈ CLAUDE.md).
- **No failure rate / abandonment metrics** for the 25-hour long-horizon demo (how many attempts? success rate? was one successful run cherry-picked?).
- **No memory model beyond markdown files** — no proprietary persistent memory, no "agent memory" product. Same primitive as Claude Code.

## Curriculum implications — held loose (all claims are vendor-labeled)

- **Codex converges on Claude Code's architecture.** AGENTS.md ≈ CLAUDE.md. SKILL.md is directly ported. MCP supported natively. Subagents are manual. Memory is markdown files. The two tools are shape-compatible — which validates Agents 102's platform-agnostic bet: students learning on Claude Code can carry patterns to Codex.
- **"Harness engineering" is OpenAI's name for what Module 7 teaches.** Worth noting the term exists — it's useful shared vocabulary with engineering audiences who work in Codex.
- **Long-running claims are vendor demos, not evidence.** 25-hour / 13M tokens is a single cherry-picked run from OpenAI. Do not cite as what students can expect. Cite only as "what OpenAI advertises is possible."
- **Codex teaches the same primitives we teach** — markdown memory, skills, subagents on demand, MCP tools. Good news for transferability, bad news for anyone hoping Codex's official docs would reveal a genuinely different paradigm.
- **Silence on failure modes is loud.** OpenAI's own material ducks abandonment rates, cost-per-successful-run, and when to stop. A curriculum that teaches students to measure these is teaching something the vendors won't.

Sources (all vendor material):
- [vendor blog] openai.com/index/harness-engineering/
- [vendor blog] openai.com/index/introducing-gpt-5-3-codex/
- [vendor blog] openai.com/index/gpt-5-1-codex-max/
- [vendor blog] openai.com/index/unlocking-the-codex-harness/
- [vendor blog] openai.com/index/unrolling-the-codex-agent-loop/
- [vendor blog] developers.openai.com/blog/run-long-horizon-tasks-with-codex
- [vendor docs] developers.openai.com/codex, /codex/cli, /codex/mcp, /codex/skills, /codex/plugins, /codex/subagents, /codex/guides/agents-md, /codex/guides/agents-sdk, /codex/learn/best-practices
- [vendor cookbook] developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide
- [vendor GitHub] github.com/openai/codex
- [vendor community] community.openai.com/t/introducing-codex-plugin-for-claude-code, /claude-to-codex-bring-claude-skills-to-codex-automatically
