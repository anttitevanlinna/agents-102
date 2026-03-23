# Claude Agent SDK & Anthropic Infrastructure Update — March 2026

**Date:** 2026-03-21
**Scope:** Changes since the February 2026 agent-platforms-research.md
**Method:** Web search targeting release notes, practitioner blogs, changelogs, security advisories
**Evidence standard:** Per project research quality protocol. Source type labels on every URL.

---

## 1. Claude Code SDK → Claude Agent SDK (Rename)

**What changed:** The Claude Code SDK was formally renamed to the "Claude Agent SDK" to reflect its broader scope beyond coding. Available in Python (`claude-agent-sdk` on PyPI, v0.1.48+) and TypeScript (`@anthropic-ai/claude-agent-sdk` on npm, v0.2.81+). The Claude Code CLI is bundled automatically.

**Evidence level:** Level 0 (vendor documentation) for the rename; Level 2 for practitioner adoption.

**Sources:**
- [Agent SDK overview — Anthropic docs](https://platform.claude.com/docs/en/agent-sdk/overview) [vendor documentation]
- [PyPI: claude-agent-sdk](https://pypi.org/project/claude-agent-sdk/) [package registry]
- [npm: @anthropic-ai/claude-agent-sdk](https://www.npmjs.com/package/@anthropic-ai/claude-agent-sdk) [package registry]

---

## 2. Agent Teams (Multi-Agent Orchestration)

**What changed:** Shipped alongside Opus 4.6 on February 6, 2026. Enabled via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. A lead agent coordinates teammates that work independently in their own context windows. Unlike subagents, teammates can message each other directly and claim tasks from shared lists. Users can interact with individual teammates without going through the lead. Claims of 3-5x wall-clock speedup on parallelizable work.

**Key insight:** Community had already built similar patterns (claude-flow, ccswarm) before Anthropic absorbed the idea. The convergence of community-built multi-agent tools validating the pattern is real signal.

**Evidence level:** Level 2-3. Multiple independent practitioners writing about and porting the pattern.

**Sources:**
- [Agent Teams docs](https://code.claude.com/docs/en/agent-teams) [vendor documentation]
- [Claude Code Agent Teams guide — claudefast](https://claudefa.st/blog/guide/agents/agent-teams) [practitioner analysis]
- [Porting Agent Teams to OpenCode — DEV Community](https://dev.to/uenyioha/porting-claude-codes-agent-teams-to-opencode-4hol) [practitioner direct]
- [Claude Code's Hidden Multi-Agent System — paddo.dev](https://paddo.dev/blog/claude-code-hidden-swarm/) [practitioner analysis]

---

## 3. Compaction API (Context Management for Long-Running Agents)

**What changed:** Server-side compaction API launched in beta (header `compact-2026-01-12`). Automatically summarizes older context when approaching token limits (default trigger: 150K tokens). Client-side compaction also added to both Python and TypeScript SDKs via `tool_runner`.

**Critical implementation detail:** You must append `response.content` (not just text) back to messages — compaction blocks must be preserved or state is silently lost. Recent fixes addressed memory growth from progress messages surviving compaction, and deferred tools losing schemas after compaction.

**Evidence level:** Level 2. Vendor feature, but practitioners hitting real edge cases indicates actual production use.

**Sources:**
- [Anthropic release notes](https://platform.claude.com/docs/en/release-notes/overview) [vendor documentation]
- [Releasebot changelog](https://releasebot.io/updates/anthropic) [aggregator]

---

## 4. Programmatic Tool Calling (Now GA)

**What changed:** Now generally available (no beta header required). Claude writes Python code that calls multiple tools within a sandboxed execution environment, processes outputs, and controls what enters the context window. Replaces individual API round-trips with code-orchestrated multi-tool workflows. Anthropic manages the container, execution, and secure tool invocation.

**Example:** Claude for Excel uses this to read/modify spreadsheets with thousands of rows without overloading context.

**Evidence level:** Level 0-2. Vendor feature, but the architecture pattern is technically substantive.

**Sources:**
- [Programmatic tool calling docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling) [vendor documentation]
- [Advanced tool use — Anthropic engineering](https://www.anthropic.com/engineering/advanced-tool-use) [vendor documentation]

---

## 5. Hosting: Still No Managed Service

**What changed:** Anthropic published detailed hosting guidance with four deployment patterns:
1. **Ephemeral containers** — one task, then destroy
2. **Long-running/persistent sessions** — proactive agents, high-frequency bots
3. **Hybrid sessions** — hydrated from DB/session history, spin down between interactions
4. **Single containers running multiple SDK processes**

Listed sandbox providers: Modal, Cloudflare Sandboxes, Daytona, E2B, Fly Machines, Vercel Sandbox. Minimum container cost: ~$0.05/hour. Dominant cost remains tokens, not compute.

**There is no Anthropic-managed hosting.** You bring your own containers. This remains a significant gap for non-DevOps teams.

**Evidence level:** Level 0 (vendor docs). Useful architectural reference regardless.

**Sources:**
- [Hosting the Agent SDK](https://platform.claude.com/docs/en/agent-sdk/hosting) [vendor documentation]
- [Secure deployment](https://platform.claude.com/docs/en/agent-sdk/secure-deployment) [vendor documentation]

---

## 6. Claude Cowork: Agent SDK for Non-Developers

**What changed:** Launched January 12, 2026 (Mac), then Windows on February 10, 2026. "Claude Code for everyone else" — same Agent SDK underneath, wrapped in a desktop GUI. Features: local file access (sandboxed folder), multi-step autonomous execution, parallel sub-agents, plugins, scheduled tasks (`/schedule`), MCP connectors. Requires Claude Max subscription.

**Relevance to agents-102:** This is how non-developers interact with the Agent SDK. Significant for the "other 90% of the company" focus.

**Evidence level:** Level 0 for vendor announcement; Level 2 for market impact.

**Sources:**
- [VentureBeat: Cowork launch](https://venturebeat.com/technology/anthropic-launches-cowork-a-claude-desktop-agent-that-works-in-your-files-no) [general press — bare fact]
- [Claude Help Center: Cowork](https://support.claude.com/en/articles/13345190-get-started-with-cowork) [vendor documentation]

---

## 7. Security: CVE-2026-21852

**What changed:** Critical information disclosure vulnerability (CVSS 5.3) in Claude Code's project-load flow allowed malicious repositories to exfiltrate API keys. Simply opening a crafted repo was enough to steal the developer's active API key. Fixed in Claude Code v2.0.65 (January 2026).

**Evidence level:** Level 2 (independently verified security finding).

**Sources:**
- [The Hacker News: Claude Code Flaws](https://thehackernews.com/2026/02/claude-code-flaws-allow-remote-code.html) [domain trade publication]

---

## 8. Practitioner Production Experiences

Multiple independent practitioners converging on similar patterns:

**Vincent Quigley (Sanity, staff engineer, 6 weeks):** AI writes 80% of initial implementations. Established the "three-attempt pattern" — first attempt is 95% garbage, third is workable. Budget $1,000-1,500/month for a senior engineer going all-in. Engineers become "orchestrators, not typists." Multiple parallel agents work if they don't overlap on files.

**Robert Mill (AI Engineer at KPMG):** The SDK is "opinionated" — its patterns emerged from real deployment of Claude Code to millions of users, not theory. The SDK's harness packages hard-won lessons.

**Hugo Lu (Orchestra):** Advocates cautious approach — AI should automate processes people already know and follow. "You don't run before you can walk."

**Evidence level:** Level 2-3. Multiple independent practitioners converging on: orchestrator mental model, high cost but high ROI, context management as the key challenge.

**Sources:**
- [Sanity blog: staff engineer's journey](https://www.sanity.io/blog/first-attempt-will-be-95-garbage) [practitioner direct]
- [Robert Mill: SDK best practices](https://bertomill.medium.com/claude-agents-sdk-best-practices-from-the-team-that-built-it-63580d1a0c3b) [practitioner direct]
- [Hugo Lu: Claude Agents in production](https://medium.com/@hugolu87/how-to-run-claude-agents-in-production-using-the-claude-sdk-756f9d3c93d8) [practitioner direct]
- [HN discussion](https://news.ycombinator.com/item?id=45107962) [practitioner community]

---

## 9. Other Notable Updates

- **Opus 4.6:** Most capable model for complex agentic tasks. Effort parameter now GA.
- **Sonnet 4.6:** Better agentic search, fewer tokens, 1M context (beta).
- **Tool Search (beta):** Claude dynamically discovers and loads tools from large catalogs at runtime.
- **Data residency:** `inference_geo` parameter for controlling where inference runs.
- **Azure AI Foundry support:** `CLAUDE_CODE_USE_FOUNDRY=1` — third cloud provider alongside Bedrock and Vertex.
- **Claude Code on GitHub Copilot:** Available for Copilot Business, Pro, Pro+, and Enterprise since February 2026.
- **Hooks expansion:** PostCompact hook added. WorktreeCreate/WorktreeRemove hook events.
- **`--bare` flag:** For scripted `-p` calls, skips hooks/LSP/plugins for clean automation.
- **Apple Xcode 26.3:** Native Claude Agent SDK support in Xcode.

**Sources:**
- [Anthropic: Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6) [vendor press release]
- [Claude Code changelog](https://code.claude.com/docs/en/changelog) [vendor documentation]

---

## What We Did Not Find

1. **No Anthropic-managed hosting for agents.** You must bring your own containers. Significant barrier for non-DevOps organizations.
2. **No substantial non-coding agent deployments using the Agent SDK.** All practitioner evidence is coding-focused. The "other 90% of the company" use case exists only in Cowork (desktop/file tasks), not in production business-process agents.
3. **No convergence-level evidence (Level 3+) for Agent SDK in production beyond coding.** Individual experiments exist, but systematic business-process agents built on this SDK are not yet visible.
4. **No pricing changes for the SDK itself.** Free; you pay for API tokens and your own compute.
5. **Limited counter-evidence or failure reports.** The CVE is the only substantial negative signal. This may reflect survivorship bias.
