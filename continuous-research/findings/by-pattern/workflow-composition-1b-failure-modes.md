# Workflow composition — Cycle 1B failure modes + counter-evidence

Research question: How do the best practitioners currently compose workflows? (counter-scan)
Date: 2026-05-20
Cycle: 1B (failure modes + absence-of-evidence)
Freshness window: since 2025-11-20

This is the counter-scan to the practitioner sweep. The picture that emerges is not "composition is bad" — it's "composition has well-known sharp edges, and the dominant 2026 pattern is *constrained* composition (one orchestrator, ephemeral isolated children, structured handoffs), not free-form chain-building."

---

## Composition failure modes (practitioner-documented)

### 1. Stop-hook / hook-loop deadlock
**What goes wrong:** A hook fires on an event the agent cannot satisfy (e.g. Stop hook returning `{"ok": false}` while Claude is idle-waiting on a background subagent), and the agent burns the full session in an infinite loop. The composition pattern that triggers it: user-defined hook + async skill that forbids tool use during wait + slow background agent.
**Practitioner evidence:**
- Anthropics/claude-code Issue #55754 — Stop hook returning `{"ok": false}` causes ~50-minute infinite loop, consumes full session quota — https://github.com/anthropics/claude-code/issues/55754 [practitioner direct] (2026-05-03)
- Anthropics/claude-code Issue #27281 — agent stuck in "let me write the document" loop, never calls Write — https://github.com/anthropics/claude-code/issues/27281 [practitioner direct] (2026)
- Anthropics/claude-code Issue #25442 — process deadlock on macOS 26.2, ignores SIGTERM, needs SIGKILL — https://github.com/anthropics/claude-code/issues/25442 [practitioner direct] (2026)
**Three-gates:** Agentic? Y · Independent evidence? Y (multiple distinct issues) · Specific outcome? Y (named bug, reproduction steps, token cost)
**Notes:** This is the most pedagogically relevant failure for a composition module — it requires three primitives interacting (hook + skill + async subagent). Single-primitive use doesn't expose it.

### 2. Skill collision / silent override
**What goes wrong:** Two skills with overlapping descriptions, or a built-in skill shipped in a Claude Code update silently shadowing a user's custom skill of the same name. No mechanism to disable the override.
**Practitioner evidence:**
- Anthropics/claude-code Issue #33080 — Built-in skills silently introduced by updates conflict with existing custom skills, no way to disable — https://github.com/anthropics/claude-code/issues/33080 [practitioner direct] (2026-03-11)
- Anthropics/claude-code Issue #35585 — Built-in `/btw` conflicts with superpowers skill resolution — https://github.com/anthropics/claude-code/issues/35585 [practitioner direct] (2026-03-18)
- Anthropics/claude-code Issue #56710 — 122 skill descriptions dropped due to context budget; only most-used keep full descriptions — https://github.com/anthropics/claude-code/issues/56710 [practitioner direct] (2026-05-06)
**Three-gates:** Agentic? Y · Independent evidence? Y · Specific outcome? Y (named version, named skill, named collision)
**Notes:** The truncation issue (#56710, #56966) is structural: as a user's skill library grows past ~50, descriptions are silently dropped, so the agent can't even see the skill to fire it. Composition has a quiet ceiling that scales as 1/N with library size.

### 3. Lethal trifecta in chained tools (prompt-injection)
**What goes wrong:** Composing primitives that together give an agent (a) private-data access, (b) untrusted-content exposure, and (c) external-communication ability creates an exploitable execution path even when no single primitive is dangerous on its own.
**Practitioner evidence:**
- Simon Willison, *The lethal trifecta for AI agents* — https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/ [practitioner direct] (2025-06-16 — origin/historical, outside 6-month window; current confirmation is the 2026-05-19 piece below)
- Simon Willison, *The last six months in LLMs in five minutes* — https://simonwillison.net/2026/may/19/5-minute-llms/ [practitioner direct] (2026-05-19) — still naming the trifecta as the dominant security frame
- Breached.Company, *The Lethal Trifecta Strikes: Four Major AI Agent Vulnerabilities in Five Days* — https://breached.company/the-lethal-trifecta-strikes-four-major-ai-agent-vulnerabilities-in-five-days/ [domain trade publication] (2026-01) — disclosure window 2026-01-07 → 2026-01-15 covering four productivity tools
**Three-gates:** Agentic? Y · Independent evidence? Y (Willison + Rehberger + 4 disclosed exploits) · Specific outcome? Y (named tools, named CVE-window)
**Notes:** Willison: "MCP's mix-and-match story" — composition is the attack surface. Curriculum implication: any composition exercise needs the trifecta as a named hazard, not a footnote.

### 4. Subagent telephone-game / context degradation at handoff
**What goes wrong:** Inter-agent handoffs lose the "why" behind decisions. The parent encodes state into a prompt; the subagent reprocesses from scratch; downstream agents start reasoning from incomplete snapshots. Empirically: multi-agent implementations use 3–10× more tokens than single-agent for equivalent tasks [single-source claim — Cognition + Anthropic own posts, no published methodology or sample size, not independently replicated; see "What I did not find"].
**Practitioner evidence:**
- Cognition, *Don't Build Multi-Agents* — https://cognition.ai/blog/dont-build-multi-agents [practitioner direct, vendor venue] (2025-06-12 — prior position, outside window; evolved 2026 stance in the next bullet) — two principles: "Share context, and share full agent traces, not just individual messages" and "Actions carry implicit decisions, and conflicting decisions carry bad results"
- Cognition, *Multi-Agents: What's Actually Working* — https://cognition.ai/blog/multi-agents-working [practitioner direct, vendor venue] (2026) — evolved position: map-reduce-and-manage, not peer-to-peer
- Anthropic, *When to use multi-agent systems (and when not to)* — https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them [practitioner direct, vendor venue] (2026) — sequential/shared-state work "not recommended" for multi-agent
- Jason Liu, *Why Cognition does not use multi-agent systems* — https://jxnl.co/writing/2025/09/11/why-cognition-does-not-use-multi-agent-systems/ [practitioner analysis] (2025-09-11 — outside 6-month window, historical context)
**Three-gates:** Agentic? Y · Independent evidence? Y (two vendors converged, plus independent commentary) · Specific outcome? Y (Devin team's measured token overhead, Cognition's named architecture)
**Notes:** This is now consensus, not contrarian. Anthropic and Cognition — who started opposed in mid-2025 — both ship "one orchestrator owns context, spawns ephemeral isolated children that return compressed summaries" by 2026. The "multi-agent peer-to-peer" composition camp has emptied.

### 5. SDK abstraction leakage when composing provider tools
**What goes wrong:** Higher-level SDK abstractions (e.g. Vercel AI SDK) don't survive contact with provider-native tools. Composing them corrupts message history.
**Practitioner evidence:**
- Armin Ronacher, *Agent Design Is Still Hard* — https://lucumr.pocoo.org/2025/11/21/agents-are-hard/ [practitioner direct] (2025-11-21) — "SDK abstractions break once you hit real tool use"; "the web search tool from Anthropic routinely destroys the message history with the Vercel SDK"
**Three-gates:** Agentic? Y · Independent evidence? N (single practitioner — Level 2) · Specific outcome? Y (named SDK, named tool, named symptom)
**Notes:** Level 2 single-case. Worth citing because Ronacher names the specific failure (web-search tool × Vercel SDK = message-history corruption) and the broader pattern (output tooling "surprisingly hard to steer").

### 6. Context pollution / memory bloat from over-saving
**What goes wrong:** Agents that save aggressively to memory (or hooks that auto-commit, or skills that load everything upfront) hit a threshold where additional context stops helping and starts competing for attention. One team "stored every variable name they'd ever used" and search returned thousands of irrelevant hits.
**Practitioner evidence:**
- Jayanand, *AI's Next Bottleneck: Context Pollution Over Time* — https://medium.com/@jakrom/ais-next-bottleneck-context-pollution-over-time-780619eae8ef [practitioner analysis] (2026-03)
- Boringbot, *Claude Code: Skills, Subagents, Hooks, Plugins, and Harnesses for Production Multi-Agent Workflows* — https://boringbot.substack.com/p/claude-code-skills-subagents-hooks [practitioner analysis] (2026) — names "over-aggressive memory writes, parallel-agent fanout for trivial tasks, hook-driven auto-commits" as setups that "cost more than they returned"
**Three-gates:** Agentic? Y · Independent evidence? Y · Specific outcome? Partial — symptoms named, no measured threshold
**Notes:** Convergence point with Cognition's "share full agent traces" principle: the cure for handoff loss (more context) is the cause of pollution. Composition has to find the middle.

### 7. Agent psychosis / unstructured-loop token waste
**What goes wrong:** Composing primitives into a "Ralph"-style restart-the-loop-from-scratch harness forfeits cached-token advantages and creates dopamine-driven workflows with no critical thinking. Asymmetry: "a minute to generate, an hour to review."
**Practitioner evidence:**
- Armin Ronacher, *Agent Psychosis: Are We Going Insane?* — https://lucumr.pocoo.org/2026/1/18/agent-psychosis/ [practitioner direct] (2026-01-18)
**Three-gates:** Agentic? Y · Independent evidence? N (single practitioner) · Specific outcome? Partial (named pattern, no metrics)
**Notes:** Level 1–2. Useful as a cultural-vocabulary anchor for the "composition without discipline" failure mode. Ronacher is also the only practitioner publicly naming current pricing as "subsidized" — making the economics of unstructured composition explicitly fragile.

---

## Explicit anti-composition camps

- **Cognition (original 2025 stance, softened 2026):** single-threaded only. Subagents are ephemeral compute, not collaborators. The 2026 update keeps the spine — one context-owner, isolated children — but admits map-reduce-and-manage. https://cognition.ai/blog/dont-build-multi-agents [practitioner direct, vendor venue]
- **Anthropic (when-and-when-not):** explicitly carves out "tightly coupled work, sequential tasks, shared-state work" as anti-patterns for multi-agent. https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them [practitioner direct, vendor venue]
- **Armin Ronacher:** not anti-composition per se, but anti-unstructured-loop. Names Ralph-style harnesses as cache-forfeiting and dopamine-trapping. https://lucumr.pocoo.org/2026/1/18/agent-psychosis/ [practitioner direct]
- **Simon Willison (security frame):** composition increases the trifecta surface; metadata tagging (`reads_private_data` / `sees_untrusted_content` / `can_exfiltrate`) should gate any chained-tool path. https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/ [practitioner direct] (2025-06 origin)

No practitioner found arguing "don't compose at all" in the last 6 months. The argument has shifted to *how* to compose — with constraint, not without it.

---

## Whitespace — where composition isn't being discussed

- **"Verifier cascade" / "judge cascade" brittleness:** searched, returned generic LLM-as-judge content. Not finding practitioner posts on what happens when you chain multiple LLM judges into one workflow. This is whitespace, not consensus — the literature is on single-judge calibration, not stacked-judge cascades.
- **Skill × hook × scheduled-agent composition:** abundant content on each primitive individually; almost nothing on three-way composition failure modes other than the Stop-hook deadlock above. Practitioners are running these but not yet writing about cross-primitive failures at depth.
- **Eval-of-composed-workflow:** discussion of evaluating single agents is dense; evaluating an N-primitive workflow as a unit (not per-primitive) is sparse. The eval surface for composition itself has not crystallised.
- **Subagent-to-subagent (peer) composition:** the 2026 consensus killed peer-to-peer. Discussion is one-directional manager→child. No fresh practitioner content arguing for or against peer subagents in the last 6 months.

---

## What I did not find

- Direct GitHub-issue traffic on `anthropics/claude-code` for *plan*-primitive composition failures (i.e. plan + skill + subagent). Plan-mode failure stories exist for Cursor (forum post on "PLAN mode utterly broken"), but specific to Claude Code, the issues read as primitive-isolation bugs, not composition bugs.
- Independent academic / benchmark work on multi-primitive workflow reliability in the last 6 months. The 3–10× token-overhead figure traces back to Anthropic and Cognition's own posts — single-vendor source, not independently replicated. Mark as **single-source claim**, not Level 3 convergence.
- Zombie-stat watch: the "60–80% reduction in errors with structured workflows" and "3–5× more manual intervention with single-shot" numbers from generic-press orchestration write-ups have no traceable methodology. Treat as [UNVERIFIED STAT] — vendor-marketing-adjacent.

---

## Curriculum implication (Cycle 1B verdict)

Composition is not optional in 2026 — every serious practitioner is doing it. But the *shape* of composition has narrowed sharply: orchestrator-owns-context, ephemeral-isolated-children, structured handoffs, metadata-gated tool chains, explicit hazard awareness (lethal trifecta, hook-loop deadlock, skill-collision, context-pollution).

A Module 6 composition exercise that ships without naming at least 2–3 of these failure modes would be teaching the 2025 picture, not the 2026 one. The strongest pedagogical play: pick ONE failure mode (Stop-hook deadlock is the most teachable — three named primitives interact, the bug reproduces in <50 lines, the fix is one line) and build the composition exercise around recovering from it, not around shipping a clean workflow.
