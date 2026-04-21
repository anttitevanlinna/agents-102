# OODA synthesis #2 — research backing for Agentic Engineering 101 curriculum — 2026-04-21

Six parallel OODAs run to validate what the AE101 strategy claims. Each scan wrote to its own file under `runs/`. This synthesis reports findings at evidence level, held loose per `memory/feedback_hold_ooda_loose.md`.

**Context:** Antti's principle — *"The research system was always built thinking of this moment. I have a high-level vision. The detail is the real shit happening by real people. Stuff that works. Stuff that is just hitting beyond early adopters."* Curriculum ships claims; research verifies them. This synthesis maps which AE101 claims survive verification, which are thin, and where the chasm-crossing signal lives right now.

## Source files
- `2026-04-21-long-running-broader-scan.md` — long-running beyond the earlier Opus-specific OODA
- `2026-04-21-compound-engineering-broader.md` — compound engineering beyond Klaassen
- `2026-04-21-software-factory-pattern.md` — team-scale factory beyond Intercom/Ramp
- `2026-04-21-boris-cherny.md` — Cherny's own public voice
- `2026-04-21-anthropic-agentic-vendor-material.md` — Anthropic's own positioning (vendor-labeled)
- `2026-04-21-openai-codex-vendor-material.md` — OpenAI's Codex positioning (vendor-labeled)

## Headline verdict per topic

### 1. Long-running agentic coding — Level 3 convergence on core patterns

Four independent practitioners (iximiuz/Velichko, Osmani, ClickHouse, Saplin) converge without citing each other on three things: (a) task-chunking is the skill, (b) last 20-30% is still human, (c) codebase maturity + test coverage determine feasibility. Counter-evidence is strong and named (Osmani's "80% problem"; Varela's "manual is faster"; Saplin's "full autopilot isn't"; ClickHouse's "corrections every 10 min on C++"). **What fails curriculum verification:** Cursor's 25-52h autonomous runs = vendor marketing, not practitioner-replicated. Don't anchor M3/M4 on that. Anchor on ClickHouse's honest "10-minute intervention cadence" and Osmani's 80/20 split.

### 2. Compound engineering — Level 2 bordering 3; term still Every-house, concept broader

~7-10 named non-Every practitioners writing under the label in ~4 months (Larson/Imprint, Panjwani, Spletzer, Vinci Rufus, Caparas, Shukla, snarktank). The underlying mechanism (agent writes files that sharpen next session) is more widely convergent under different names: Martin Alderson's "self-improving CLAUDE.md," `learnings.md` pattern, Huntley's Ralph, Cursor Bugbot's learned rules (52%→80% improvement). Cross-stack: Every's plugin converter targets Codex, Cursor, Windsurf, Gemini CLI, Copilot, Kiro, Qwen. **Counter-evidence thin** — Larson: 3 of 4 patterns are "well-known," ~25% novelty. No "vendor packaging" takedowns yet. Held loose: backlash may be 3-6 months out.

### 3. Software factory pattern — Level 2 overall, Level 3 on components

Packaged factory pattern = still 3-5 vendor-adjacent cases (Intercom, Ramp, Every, plus Spotify Honk, Sanity). Components are separately converging with stronger signal: **AGENTS.md has 60k+ OSS repos and Linux Foundation stewardship** (Level 3 alone); sub-agent-for-context-isolation, SKILL.md libraries, generator-critic separation all converging. Strong new signals: **Spotify's Honk (Nordic, 650+ agent PRs/month on Claude Agent SDK)** — closest real parallel to Intercom; **Vincent Quigley at Sanity (Norway)** — staff-engineer individual version. Named scale failure mode (Osmani's "Factory Model"): *"flaky environments become systemic blockers when forty agents hit the same flaky test simultaneously. The factory stalls."* **Critical absence:** no "we tried the factory and backed off" post; no non-AI-native mid-size org (Klarna, Wolt, Maersk, Equinor) has published factory numbers. Europeans audit; Americans sell.

### 4. Boris Cherny — personal voice confirmed, CLAUDE.md-as-design-surface is whitespace

RAG-vs-agentic-search quote confirmed at source: https://x.com/bcherny/status/2017824286489383315 — canonical [practitioner direct] URL for Module 2's file-based agentic RAG thesis. Cherny publicly kills RAG — rare case of platform lead abandoning an industry-sold pattern. His throughput model: parallel sessions + plan mode + CLAUDE.md as live memory updated on every correction. Direct reinforcement of Module 1-2 framing. **Notable silences (confirmation-bias guard):** Cherny does NOT publicly promote vector/long-term memory, multi-agent deliberation, evals infrastructure, or competitor comparisons. **Where we lead Cherny's roadmap:** M6 live deliberation, M4 evals loop. We teach these because practitioners need them, not because Cherny said to.

### 5. Anthropic — vocabulary aligned, CLAUDE.md-as-design-surface is genuine whitespace

Shipped April 2026: Opus 4.7 (cross-session memory, multi-day projects), Managed Agents API GA April 10 ($0.08/session-hour), Cowork GA with enterprise controls, Agent Skills with SKILL.md convention, subagents in Agent SDK. Anthropic's long-running story is "effective harnesses for long-running agents" — three named techniques: compaction, structured notes, multi-agent. **They frame memory as a *model capability* (Opus 4.7 carries sessions), not a *file discipline* (CLAUDE.md).** CLAUDE.md-as-design-surface is where our curriculum has genuine whitespace — Anthropic tilts to model-layer memory, we own file-layer. **Anthropic's eval guidance is thin** ("Start with 20-50 real-failure tasks" — no judge architecture). M4 evals loop is differentiation. **Failure modes Anthropic publicly names:** "mistakes propagate," cross-context data leakage, scheming, sycophancy, "spiraling out of control." Argue-loops / judge-stalemate NOT named — our M3 failure-mode primer extends them.

### 6. OpenAI / Codex — architectural convergence with Claude Code, curriculum transfers

**Codex has converged architecturally on Claude Code.** AGENTS.md ≈ CLAUDE.md. SKILL.md format ported. MCP natively supported. Subagents manual-trigger only. Memory = markdown files. The two tools are shape-compatible — a student trained on Claude Code recognises every Codex primitive by a different name. OpenAI's term for what Module 7 teaches: "**harness engineering**" — shared vocabulary. **Flagship long-horizon claim:** 25 hours, 13M tokens, 30k LoC one run. Single cherry-picked demo, no abandonment/success-rate data. Vendor theater. **OpenAI refuses to compare Codex to Claude Code** in blog posts; they fight on benchmarks, not harness quality. But they shipped a Codex-plugin-for-Claude-Code and a Claude-to-Codex skill converter — tacit acknowledgment that Claude Code owns the harness narrative. **Curriculum bet validated:** platform-agnostic patterns (markdown memory, skills, manual subagents, MCP) transfer directly.

## Cross-cutting findings for curriculum

**What's backed at Level 3 convergence (safe to ship in curriculum):**
- Task-chunking as the long-running skill
- Last 20-30% is still human
- AGENTS.md / CLAUDE.md as design surface (60k+ OSS repos)
- Self-improving memory files (cross-stack, multiple names for the same concept)
- Sub-agent for context isolation
- Generator-critic separation

**What's backed at Level 2 (ship with "single case" or "emerging" labeling):**
- Intercom 93.6% / 19.2% — one case, well-documented, vendor-adjacent
- Spotify Honk 650+ PRs/month — one case, good practitioner visibility
- Compound engineering four-step loop — Klaassen authoritative, broader adoption still thin
- Opus 4.7 long-running specifics — 5 days old at synthesis time, no convergence

**What fails verification (don't ship or reframe):**
- Cursor's 25-52h autonomous runs (vendor theater)
- Codex's 25h / 13M tokens / 30k LoC (vendor theater)
- Any claim that a specific model version "just works" for long-running without intervention
- "X% of engineering orgs now use agents" without methodology trace

**Where the curriculum leads the industry (whitespace — differentiation):**
- CLAUDE.md-as-design-surface at depth (Anthropic tilts model-layer)
- M4 evals-loop / judge infrastructure (Anthropic and OpenAI both thin)
- M5 multi-agent live deliberation (neither vendor promotes)
- Failure-mode pre-teaching — argue-loops, hallucinated hashes (Anthropic doesn't name)
- Nordic practitioner layer (Spotify Honk, Sanity, Vincent Quigley) — different cultural frame vs. US

**Chasm-crossing zone right now (2026-04-21):**
- Long-running agentic coding — mainstreaming from solo builders to first teams
- AGENTS.md / CLAUDE.md as shared design surface — enterprise uptake beginning
- Self-improving memory files — convergent across tool stacks
- Sub-agent patterns — shipping in both vendor SDKs

**What's still too early:**
- Opus 4.7 specifics (5 days old)
- Managed Agents multi-hour reliability (marketing only)
- Packaged factory pattern at non-AI-native companies (no data yet)

## Gaps worth future OODAs

- **Failure-mode literature for compound engineering** — does the Compound step accumulate noise? No systematic study found.
- **Nordic practitioner uptake of compound engineering** — zero signal this cycle. Spotify Honk is the closest; no writeups on CLAUDE.md-that-learns from Finnish/Swedish/Norwegian builders.
- **Enterprise-team reports beyond Imprint** for compound engineering adoption.
- **"We tried the factory and backed off"** — critical absence. Either the pattern works universally (unlikely) or the failure stories haven't published yet.
- **Announcement-vs-production gap on Managed Agents at multi-hour horizons** — Anthropic has no public content.
- **Original Ronacher poll URL** — [SOURCE NEEDED]; quoted through the long-running-broader-scan but not verified.
- **Non-English practitioner layer** — search bias across all 6 OODAs was English-dominant.

## Curriculum implications — held loose

Not prescribing changes. Naming what the OODAs open as questions:

1. **M3 / M4 anchor:** ClickHouse's 10-minute intervention cadence + Osmani's 80/20 split are stronger anchors than Cursor's 25h demo.
2. **M5 factory:** frame as "emerging shape," not established practice. Cite Spotify Honk + Vincent Quigley alongside Intercom/Ramp. Name the "factory stalls under flaky environments" failure mode.
3. **Module 2:** Cherny's RAG-is-dead X post is the canonical [practitioner direct] URL. Use it.
4. **Module 6:** our live-deliberation differentiation is confirmed — neither Anthropic nor OpenAI promotes this. Whitespace.
5. **Compound engineering:** safe to anchor M1 on Klaassen's four-step loop; note that the broader mechanism (memory-that-learns) is convergent under multiple names.
6. **Platform transferability:** the OpenAI/Codex scan validates the "learn Claude Code, transfer to Codex" claim. Patterns travel; vocabulary doesn't. Worth naming explicitly for students concerned about tool lock-in.

---

**Synthesis held loose.** Individual claims in this file carry source URLs in the underlying OODA files. Before any curriculum claim ships citing this synthesis, re-verify against the source file.
