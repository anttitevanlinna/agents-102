---
type: run-log
domain: coding
evidence_level: L3
platforms: [coding-agents]
nordic: false
updated: 2026-06-03
cycle: 2
---

# Token Drivers — Sweep 2 (Confirmation): Per-turn context tax family

Confirms / downgrades two Sweep-1 drivers in the per-turn context-tax family:
- Driver #2 "Fat tool outputs" (sweep1 file: `2026-06-03-1610-token-drivers-sweep1-tool-output.md`)
- Driver #3 "Bloated MCP/tool surface" (sweep1 file: `2026-06-03-1610-token-drivers-sweep1-tool-surface.md`)

## Focus

Verify, not discover. Re-open every load-bearing URL (byline + date). Count DISTINCT independent practitioners per driver — is it true L3 (10–20) or fewer? Hunt counter-evidence deliberately. Resolve two open Sweep-1 flags: (a) Simon Willison's Jan-2026 primary URL for the "MCP solved by lazy loading" stance, left [SOURCE NEEDED]; (b) the "55,000 tokens / 93 tools" GitHub-MCP number — trace to whose primary post.

## Queries Used

- Simon Willison MCP tool search "no reason not to" / "now that it's solved" dozens MCPs Claude Code 2026
- MCP tool schema token overhead negligible prompt caching tools cheap not a problem practitioner counter
- reading whole files agent context window fine not a problem big context overstated practitioner 2026
- "prompt caching" tool definitions cached cheap MCP overhead overblown cache_control tools first message only
- agent should just read the whole file offset limit premature optimization context window large enough contrarian
- (direct re-fetch of every load-bearing URL in both sweep-1 files)

## Confirmation results — Driver #2 (Fat tool outputs)

**VERDICT: CONFIRMED-L3 for existence + mechanism. Real distinct-practitioner count: ~6–7 (lower bound of L3). Honest read: the *driver* clears L3; the *savings percentages* (80%, 98%) do NOT and must stay labelled illustrative.**

Distinct independent practitioners naming verbose tool output / whole-file reads as a context driver:
1. @spilist — CC Issue #22699 "Size-aware file reading", 2026-02-03. [practitioner direct]. Byline + date RE-VERIFIED by opening the issue. Size-tier proposal (≤500 read / 500–2000 advise / >2000 block) and "discovers the file is too large only _after_ the tokens are already spent" quoted verbatim — confirmed.
2. @wishacloud — CC Issue #44703 (TaskOutput → 87,286-char .output dump vs 4,087-char summarized return = 21x; "autocompact thrashing... 3 turns... 3 times in a row"), 2026-04-07. [practitioner direct]. RE-VERIFIED: figures and autocompact quote exact. **NOTE: sweep-1 attributed #44703 to "@spilist" in line 46 — WRONG. Author is @wishacloud. @spilist is #22699. See back-sweep.**
3. Jake Nesler — Medium, building CartoGopher, 2026-02-28. [practitioner direct], tool-author self-interest on the numbers. Not re-fetched this sweep (byline/date already established sweep-1, no contradiction surfaced); the 60–80% / 70–95% figures remain tool-author estimates, illustrative only.
4. Semble submitter "bibabomas" + independent HN testers "freakynit" & "aadishv" — HN #48169874. submitter [practitioner direct] w/ self-interest; two testers [practitioner analysis]. The independent testers' run-to-run variance (95k/2.9k → 37k/4.0k) is the honest magnitude caveat: savings real, noisy, NOT a clean 98%.
5. Arize — context-management-in-agent-harnesses, 2026. [practitioner analysis]. Names truncate-oversized-outputs / offload-bulk-to-files-return-compact-references.
6. Anthropic Engineering — effective-context-engineering + writing-tools-for-agents. [practitioner direct] but vendor self-interest; the 25K-token response cap + 256KB byte cap + 1–2K sub-agent summary are shipped-guardrail facts (design-evidence, not outcome-evidence).
7. **NEW this sweep — CC Issue #34304 "Structural File Reading — AST-aware Read tool for large files (80% context reduction measured)"**. [practitioner direct], 2026. URL: https://github.com/anthropics/claude-code/issues/34304 — independent feature request naming whole-file reads as the waste, proposing AST-scoped reads. Adds a 7th voice for the DRIVER's existence, but its "80% context reduction measured" is an issue-TITLE claim with no methodology in the issue body — flag [UNVERIFIED — issue-title only], do NOT treat it as a measured figure beside #44703's measured 21x. The count firms toward the floor of L3 on the driver, not on this number.

Honest count statement: 6 strong distinct practitioners in sweep-1 + 1 new = ~7. That is the floor of L3, not the fat middle. The convergence is on the **mechanism** (grep/ls→read-whole-file loop + sub-agent/log dumps ride along every turn) — that is uncontested and well-attested. Sweep-1's "best-attested of the sweep" framing is defensible for the mechanism; do not over-read it as 10–20.

## Confirmation results — Driver #3 (Bloated MCP/tool surface)

**VERDICT: CONFIRMED-L3 for existence + mechanism (per-turn paid-whether-used tax). Real distinct-practitioner count: ~6. The SECONDARY claim (too-many-tools degrades selection accuracy) stays vendor-reported, NOT independently L3.**

Distinct independent practitioners:
1. Geoffrey Huntley — ghuntley.com/agent/, **2025-08-24** (sweep-1 said "2025-08"; exact date is 24 Aug 2025). [practitioner direct], own venue. RE-VERIFIED by opening the post. **CRITICAL: Huntley's post says "76K of tokens just for MCP tools... you only have 100K usable" and "~176k usable" after system prompt. It does NOT contain "93 tools" or "55,000 tokens." Those figures are NOT Huntley's.** See back-sweep + resolved flag (b).
2. Simon Willison — simonwillison.net/2025/Aug/22/too-many-mcps/, **2025-08-22 5:30pm**, link-post. [practitioner analysis] (summarizing Huntley on own venue). RE-VERIFIED. **The "Adding just the popular GitHub MCP defines 93 additional tools and swallows another 55,000 of those valuable tokens!" line is SIMON's, in his relay — origin of flag (b).** Also confirmed verbatim: gh CLI "token cost close to zero - because every frontier LLM knows how to use that tool already."
3. Armin Ronacher — lucumr.pocoo.org, 2025-08-18 / reinforced 2025-12-13. [practitioner direct]. "context rot" / "Your MCP Doesn't Need 30 Tools: It Needs Code." Not re-fetched (no contradiction); stands as named design opinion (L1/L2 individually).
4. Tim Esler (Atlassian, Sr Principal ML Engineer) — atlassian.com/blog, **2026-03-29**. [practitioner direct] w/ tool-promotion flavor. RE-VERIFIED by opening: GitHub MCP **"94 tools and consuming roughly 17.6k tokens"**; Atlassian MCP ~10K; multi-server "30k+ tokens... in every request"; mcp-compressor 70–97% reduction (17.6K→500). **NOTE the figure tension: Esler measures GitHub MCP at 94 tools / 17.6K tokens — materially LOWER than the Huntley-relay 93/55K. Both are real measurements at different dates/configs; report as a band, never as one canonical number.**
5. Peter Steinberger — steipete.me, 2025. [practitioner direct]. CLI-over-MCP migration to escape always-loaded schema tax. Stands.
6. MCP SEP-1576 "Mitigating Token Bloat in MCP" (modelcontextprotocol issue #1576) — [practitioner direct] (protocol authors). Standard-level acknowledgement. Stands.

Supporting/lower-tier (not counted as primary): getunblocked, thenewstack, layered.dev, myclaw, MindStudio, BSWEN, Fazm — all [practitioner analysis]/L0 marketing, corroborate the 15K–60K band (100K+ at scale).

Anthropic Tool Search / deferred-loading = [vendor docs]: confirms the FEATURE exists and the mechanism; its 85%-reduction + 49%→74% / 79.5%→88.1% accuracy figures are vendor-run → report as "vendor reports," NOT established.

Count statement: 6 distinct practitioners + protocol-level + vendor-confirmed mechanism = solid L3 for the per-turn-tax existence. The accuracy-degradation secondary claim is asserted broadly (Ronacher) but hard-numbered only by Anthropic → keep vendor-labelled.

## Counter-evidence found

Hunted deliberately. **No practitioner argues either driver is unreal or negligible.** The genuine dissent is three flavours, all of which REFINE rather than disprove:

1. **"It's solved / mitigable, not gone" (strongest, and now sourced).** Simon Willison, Jan 2026: *"This is great — context pollution is why I rarely used MCP, now that it's solved there's no reason not to hook up dozens or even hundreds of MCPs to Claude Code."* — a tool-surface practitioner declaring the *tax* defused by deferred loading. This is the closest thing to counter-evidence on Driver #3, and it CONCEDES the tax existed (he avoided MCP because of it). Frame curriculum claim as "fixed tax UNLESS you prune / defer / move to CLI."
2. **Prompt-caching cost nuance (a real qualifier, mostly cost not window).** Tool definitions ARE cacheable (cache_control on the last tool in the array; cached input 10x cheaper, latency −85%). BUT: (a) caching cuts the *dollar* cost of re-sending, not the *context-window occupancy* — the tokens still sit in the window every turn, so the attention/selection-degradation half of the driver survives caching entirely; (b) adding one MCP tool mid-session invalidates the whole prefix cache, which is precisely why Claude Code locks the tool list at startup. So caching is a cost-mitigation, NOT a refutation of the per-turn tax. Net: reinforces the driver on the window/attention axis.
3. **Magnitude is inflated/noisy (Driver #2 specifically).** Semble's independent HN testers show run-to-run variance; the 98% / 80% headline numbers are tool-author marketing. This attacks the *percentage*, not the *existence* — already captured sweep-1, re-confirmed.

Contrarian-but-aligned: multiple sources ("a full window isn't automatically a rotted one; the problem is signal-to-noise," "less but more relevant context beats huge noisy context") argue bigger windows don't fix this — which *supports* the per-turn-drag thesis, not undercuts it. No true "throw it all in, context is cheap" practitioner voice surfaced. Verified absence.

## Back-sweep corrections

BACK-SWEEP NEEDED: tool-output sweep-1 file, line 46 — issue #44703 author is **@wishacloud**, NOT "@spilist". @spilist is the author of #22699 (line 38). Fix the #44703 attribution; #22699 attribution is correct.

BACK-SWEEP NEEDED: tool-surface sweep-1 file, line 32 + line 28/34 — the "93 additional tools / 55,000 tokens" GitHub-MCP figure is **Simon Willison's (in his 2025-08-22 relay)**, NOT in Huntley's own post. Huntley's primary post (ghuntley.com/agent/, 2025-08-24) states "76K... just for MCP tools... only 100K usable" and "~176k usable" — no 93/55K. Re-attribute the 93/55K example to Willison's relay; keep Huntley's 76K/100K as Huntley's. (Currently finding #1 blends both under Huntley.)

BACK-SWEEP NEEDED: tool-surface sweep-1 file, lines 40 & 86 — the Jan-2026 Simon Willison "now that it's solved" quote is no longer [SOURCE NEEDED]. Primary URL: **https://x.com/simonw/status/2011570719856214153** (Simon Willison, 2026-01-14). Exact text: "This is great - context pollution is why I rarely used MCP, now that it's solved there's no reason not to hook up dozens or even hundreds of MCPs to Claude Code." Label [practitioner direct] (own X account). NOTE: x.com returns HTTP 402 to WebFetch (paywall-block on the fetcher, not a dead link); tweet text + date corroborated across two independent search corpora; treat the x.com status URL as the primary citation.

OPTIONAL (not a correction, a labeling refinement): tool-surface file finding #4 date "late 2025 / 2026" and Huntley date "2025-08" → tighten to Huntley 2025-08-24, Atlassian 2026-03-29. And add a one-line "figures span a band: GitHub MCP measured at 93/55K (Willison Aug-2025) to 94 tools/17.6K (Esler Mar-2026) — cite the band, not a point."

OPTIONAL ADD (tool-output file): new independent voice CC Issue #34304 (AST-aware Read, "80% context reduction measured"), https://github.com/anthropics/claude-code/issues/34304 — adds a 7th distinct practitioner, firms up L3.

## Orientation

Both drivers survive a confirmation sweep whose explicit job was to disprove them. Neither is downgraded. The per-turn context-tax family is real, mechanism-uncontested, and practitioner-named at the floor of L3 (~6–7 distinct voices each, not 10–20 — do not over-claim the *count*; the strength is mechanism-convergence + protocol/vendor acknowledgement, not headcount). The only honest hedges for curriculum: (1) cite token figures as a BAND not a point — the canonical "93 tools / 55K" is one 2025 measurement (Willison's, not Huntley's) and is already contradicted by Esler's 94/17.6K in 2026; (2) savings percentages (80% / 98% / 85%) are tool-author or vendor numbers — illustrative, not verified; (3) the tax is mitigable (deferred loading, pruning, CLI-over-MCP, offset/limit reads) — frame as "fixed UNLESS you act," and note prompt-caching cuts cost but not window-occupancy/attention drag. Two factual attributions in the sweep-1 files are wrong (issue author, and the 93/55K provenance) and must be fixed in the same edit as the [SOURCE NEEDED] resolution.
