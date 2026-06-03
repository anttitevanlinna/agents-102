---
type: run-log
domain: coding
evidence_level: L3
platforms: [coding-agents]
nordic: false
updated: 2026-06-03
cycle: token-drivers-sweep1
---

> **⟳ SWEEP 2 CORRECTIONS (2026-06-03-1700, applied) — read before trusting claims below.**
> Confirm file: `2026-06-03-1700-token-drivers-sweep2-context-tax.md`.
> - **The "93 tools / 55,000 tokens" figure is Willison's RELAY, not Huntley's own measurement.** Huntley's own post says **76K / 100K usable** (2025-08-24). Atlassian's Esler measures the *same* GitHub MCP at **94 tools / 17.6K** (2026-03-29). → Report as a **band (~18K–76K), not a point.**
> - **[SOURCE NEEDED] flags resolved:** Willison's Jan-2026 "now that it's solved" = `https://x.com/simonw/status/2011570719856214153` (2026-01-14, [practitioner direct]; x.com 402s the fetcher, corroborated across two corpora). It **concedes the tax existed** — lazy-load cuts window-occupancy, caching cuts cost.
> - **CONFIRMED L3** for the per-turn paid-whether-used tax (~6 practitioners + SEP-1576), BUT it is **mitigable / shrinking**, not a fixed law. Selection-accuracy degradation numbers stay **vendor-reported only.**
> - **The "85% reduction" (191,300 vs 122,800 preserved-context tokens) is Anthropic's own benchmark = vendor self-reported, NOT independently verified.** Same status as the 80%/98% savings numbers. Do not cite as established.

# Token Drivers — Sweep 1, Driver #3: Bloated tool / MCP surface

## Focus

Hypothesis: every connected MCP server and tool injects its schema/description into context every turn whether called or not. A large unused tool surface is a fixed per-turn tax, and too many tools also degrade selection accuracy. Fixes: prune MCP servers, lazy/deferred tool loading (tool-search), scope tools per task. Looking for practitioner takes that quantify or name tool/MCP-schema overhead as a context/token cost, complaints about too many tools, deliberate pruning, and the existence of deferred/lazy tool-loading features. Counter-evidence too.

## Queries Used

- MCP tool schemas token cost context every turn unused tools overhead
- too many MCP servers context bloat tool descriptions tokens Simon Willison
- Geoffrey Huntley MCP tools tokens context window GitHub 93 tools 55000
- Anthropic Claude Code tool search deferred tool loading MCP 85% token reduction docs
- Armin Ronacher OR Peter Steinberger MCP tools context overhead too many tools agent
- MCP tool overhead negligible not a problem context window prefix cache tools cheap counter

## Findings

### 1. Geoffrey Huntley — original "too many MCPs eat the context window" claim
- URL: https://ghuntley.com/agent/ (the source Simon Willison link-posts) ; relayed at https://simonwillison.net/2025/Aug/22/too-many-mcps/
- Label: [practitioner direct] (Huntley, own venue ghuntley.com)
- Date: 2025-08 (Simon's relay 2025-08-22; older = dated context but the mechanism is the origin claim everyone cites)
- What: Names the per-turn schema tax. Sonnet's advertised 200K window minus system-prompt allocation leaves "approximately 176k tokens usable"; adding MCP tools costs "an additional 76K of tokens just for MCP tools," so "you only have 100K usable." Simon's relay pins the canonical example: "Adding just the popular GitHub MCP defines 93 additional tools and swallows another 55,000 of those valuable tokens!"
- Evidence level: L2→L3 (single practitioner experiment, but it is the headwater claim the convergence cites)
- Key claims: tool definitions are a fixed up-front context cost independent of use; GitHub MCP alone ≈ 93 tools / ≈ 55K tokens; usable window collapses from ~176K to ~100K.

### 2. Simon Willison — endorses the cost, recommends CLIs over MCP; later: tool-search "solves" it
- URL: https://simonwillison.net/2025/Aug/22/too-many-mcps/
- Label: [practitioner analysis] (Willison summarizing Huntley on his own venue — link-post, not original measurement)
- Date: 2025-08-22; follow-up stance ~2026-01
- What: "If your coding agent can run terminal commands and you give it access to GitHub's `gh` tool it gains all of that functionality for a token cost close to zero." Later (post Anthropic tool-search, Jan 2026): "context pollution is why I rarely used MCP, now that it's solved there's no reason not to hook up dozens or even hundreds of MCPs to Claude Code." (Jan-2026 quote is relayed via secondary coverage — [SOURCE NEEDED] for the exact primary URL of that follow-up.)
- Evidence level: L1/L2 (named opinion + the CLI-as-zero-token-cost workaround)
- Key claims: tool/MCP schema cost is the reason a heavy MCP user avoided MCP; CLIs cost ~0 tokens because the model already knows them; deferred tool loading removes the objection.

### 3. Armin Ronacher — "the more tools you have, the more you're contributing to context rot"
- URL: https://lucumr.pocoo.org/2025/8/18/code-mcps/ (also https://lucumr.pocoo.org/2025/12/13/skills-vs-mcp/ , https://lucumr.pocoo.org/2025/7/3/tools/)
- Label: [practitioner direct] (own venue)
- Date: 2025-08-18 (dated context); reinforced 2025-12-13
- What: Argues against fragmenting capability across 30+ tool definitions; proposes a single code-executing "ubertool." "Your MCP Doesn't Need 30 Tools: It Needs Code." Frames it as both a token cost and an attention/quality cost.
- Evidence level: L1/L2 (named opinion + design argument)
- Key claims: every additional tool definition contributes to context rot (selection degradation), not just token count; consolidation to code reduces definition surface area.

### 4. Anthropic — Tool Search Tool / deferred loading ([vendor docs]: feature exists + own benchmarks)
- URL: https://www.anthropic.com/engineering/advanced-tool-use ; mechanism: https://www.anthropic.com/engineering/code-execution-with-mcp
- Label: [vendor docs] — treat figures as "feature exists" + vendor self-benchmark (NOT independent evidence of impact)
- Date: late 2025 / 2026
- What: `defer_loading: true` keeps tool defs out of initial context; a Tool Search Tool (~500 tokens overhead) discovers them on demand. Per-tool examples: GitHub 35 tools ≈26K; Slack 11 tools ≈21K; Sentry 5 ≈3K; Grafana 5 ≈3K; Splunk 2 ≈2K. Five-server setup = 58 tools ≈55K tokens "before the conversation even starts." Claimed "85% reduction" (191,300 vs 122,800 tokens of preserved context). Self-reported accuracy lift: Opus 4 49%→74%, Opus 4.5 79.5%→88.1% on MCP eval with tool search on.
- Evidence level: L0 for impact CLAIMS; L-fact for "deferred/lazy tool loading exists." Confirms BOTH halves of the hypothesis (fixed per-turn tax AND selection-accuracy degradation) — but the accuracy numbers are vendor-run, so report as "vendor reports," not as established.
- Key claims: tool defs are a per-turn, paid-whether-used tax; too many tools measurably hurt selection accuracy; deferred loading + search is the shipped fix.

### 5. Atlassian (Tim Esler, Sr Principal ML Engineer) — mcp-compressor, named token figures
- URL: https://www.atlassian.com/blog/development/mcp-compression-preventing-tool-bloat-in-ai-agents
- Label: [practitioner direct] (engineer on company eng blog; some vendor-tool-promotion flavor → lean [practitioner analysis] for the compression-product results)
- Date: 2026-03-29 (current)
- What: GitHub MCP "94 tools and consuming roughly 17.6k tokens"; Atlassian MCP ≈10K; multi-server "30k+ tokens on tool descriptions in every request." "tool metadata is no longer a small overhead – it becomes a meaningful product and UX constraint." Open-sourced mcp-compressor (proxy: list_tools / get_tool_schema / invoke_tool), 70–97% reduction (17.6K → as low as 500 tokens).
- Evidence level: L2 (single-org measurement + tool), corroborates the magnitude band.
- Key claims: tool metadata shipped every request is a meaningful constraint; lazy schema fetch via a proxy cuts it 70–97%.

### 6. Peter Steinberger — "free the CLI from its MCP shackles"
- URL: https://steipete.me/posts/2025/peekaboo-2-freeing-the-cli-from-its-mcp-shackles ; https://steipete.me/posts/2025/essential-reading
- Label: [practitioner direct] (own venue)
- Date: 2025 (dated context)
- What: Community shift toward "most MCPs are actually better if they're just CLIs" — agents call CLIs easily and CLIs load on-demand "without cluttering the context." Deliberate pruning / re-platforming MCP → CLI to escape the fixed context tax.
- Evidence level: L1/L2 (named opinion + shipped migration)
- Key claims: CLIs avoid the always-loaded tool-schema tax; pruning MCP in favor of CLIs is a deliberate practice.

### Magnitude corroboration (supporting, lower-tier venues)
- getunblocked.com "MCP Token Cost 2026: line-item autopsy": 43 tool defs injected every conversation, agent uses 1–2; repo-language check = 1,365 tokens via CLI vs 44,026 via MCP. Label: [practitioner analysis], L2, 2026 — useful magnitude anecdote.
- myclaw.ai "MCP costs 35x more than CLI"; thenewstack.io "10 strategies to reduce MCP token bloat"; layered.dev "hidden token tax." Label: mostly [practitioner analysis]/L0 marketing — corroborate the band (15K–60K typical, 100K+ at scale), not used as primary evidence.
- MCP spec issue SEP-1576 "Mitigating Token Bloat in MCP" (github.com/modelcontextprotocol issue #1576): the protocol maintainers themselves treat schema-redundancy / tool-selection token bloat as a problem worth a spec change. Label: [practitioner direct] (protocol authors), strong signal that this is named at the standard level.

## What I Looked For But Did Not Find

- **Genuine counter-evidence ("overhead is negligible").** Searched directly for it; found none. The closest is the prefix-cache nuance: a fully lazy-loaded 2026 deployment drops GitHub MCP from ~55K to ~1K tokens at init — i.e. the cost is real but increasingly *mitigable*, not negligible. Several sources note caching doesn't fully help because tool availability is re-presented to the model each step. So the honest counter is "it's solvable," not "it doesn't exist."
- **Independent (non-vendor) reproduction of the accuracy-degradation numbers.** Only Anthropic's own benchmark gives the 49%→74% / 79.5%→88.1% figures. The "too many tools hurts selection" claim is widely *asserted* by practitioners (Ronacher's context rot) but the hard numbers are vendor-run.
- **Nordic-specific practitioner take.** None surfaced.
- **A clean primary URL for Simon's Jan-2026 "now that it's solved" quote** — relayed via secondary coverage only. [SOURCE NEEDED] for the exact post.

## Orientation

This is a **real, practitioner-named token driver** — arguably the best-evidenced of the sweep. It has a named origin claim (Huntley), an independent design critique (Ronacher's "context rot"), independent magnitude corroboration (Atlassian/Esler, getunblocked), a protocol-level acknowledgement (MCP SEP-1576), and a shipped vendor fix that confirms the mechanism (Anthropic deferred loading + tool search). 6+ independent practitioners converge → L3 reportable. The mechanism is uncontested: tool/MCP schemas are a per-turn, paid-whether-used context tax (typical 15K–60K, 100K+ at scale), and the secondary claim — too many tools degrades selection accuracy — is asserted broadly and supported by Anthropic's own eval (label that figure as vendor-reported). The only nuance to honor: 2026 lazy-loading/caching makes the tax *mitigable*, so frame the curriculum claim as "fixed tax unless you prune / defer / move to CLI," not "unavoidable."
