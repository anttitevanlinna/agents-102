# Scaling session length, part 2 — platform-side mechanics shipped Oct 2025–Apr 2026

## Question + scope

What did Claude Code, Codex, Cursor, Amp, and adjacent harnesses ship in the last 6 months that materially extends how long a single agent session can run coherently? Current tool capability, not last year's product. Vendor framing is bare-fact only; the test of whether a feature matters is whether practitioners are visibly using it.

## Feature-by-feature

### 1. Claude Code auto mode (shipped 2026-03-24, extended to Opus 4.7 Apr 2026)

**What shipped.** A new `--permission-mode auto` that delegates per-tool-call approval to a Sonnet 4.6 classifier instead of asking the human or skipping checks entirely. Positioned as the middle ground between manual review and `--dangerously-skip-permissions` (which still exists as `bypassPermissions` mode but is now the explicitly nuclear option).
- https://www.anthropic.com/engineering/claude-code-auto-mode [vendor press release — bare fact of ship date]
- https://code.claude.com/docs/en/permission-modes [vendor docs — bare fact]

**Practitioner use.** Simon Willison, 2026-03-24: skeptical analysis. Calls out that the classifier is non-deterministic, that the default allowlist permits `pip install -r requirements.txt` (supply-chain hole), and prefers a deterministic sandbox.
- https://simonwillison.net/2026/mar/24/auto-mode-for-claude-code/ [practitioner direct]

**Counter-evidence.** Willison's piece is critical analysis, not "I ran it for six hours and it worked." No convergence-level practitioner adoption of auto mode visible yet — too new (one month old as of this run). The strongest consensus practitioners are making is "still run inside a Docker sandbox; the flag is not the safety, the container is."
- https://www.morphllm.com/claude-code-dangerously-skip-permissions [vendor press release — Level 0] **Relabelled 2026-08-01.** morphllm.com is Morph's own commercial site; the same domain is labelled `[vendor case study — Level 0]` in § 8. Calling it "tech press" laundered vendor content into independent journalism and then used it as evidence of a "consensus practitioners are making". Bare facts only; never counts toward convergence.

### 2. Auto-compact / `/compact` (matured Oct 2025 → Feb 2026)

**What shipped — figures below are superseded; re-verified against official docs 2026-08-01 (Claude Code v2.1.220).** The "~83.5% trigger / ~33k buffer" pair came from an unattributed third-party page and no longer describes the product. **There is no single auto-compaction threshold.** It varies by model and venue: Sonnet 5 on the Anthropic API auto-compacts *"at about 967K tokens by default"* of its 1M window; Sonnet 4.6 and Opus 4.6 without extended context, plus cloud sessions, *"compact at the 200K boundary by default"*; and for other local sessions *"auto-compaction triggers when the conversation reaches the model's context limit"* (https://code.claude.com/docs/en/env-vars.md, https://code.claude.com/docs/en/model-config.md [vendor docs — bare fact]). A *"compaction buffer"* is real but is never quantified in any docs page or in Anthropic's own engineering write-up. A percentage override does exist and can only lower the trigger: `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`, range 1–100, *"The override can only lower the threshold, so values above the default have no effect."* Auto-compaction can be disabled outright via `DISABLE_AUTO_COMPACT`. Manual `/compact` accepts focus instructions. Claude Code v2.0.64 (Feb 2026) made compaction "instant" — the previous version blocked the session for tens of seconds.

**Do not reintroduce a single auto-compaction percentage.** A sweep already struck the 83.5%/33K pair from downstream teaching material on the grounds that docs give only "approaching context limits"; that correction never reached this file, which is why the dead figure survived here for three months and kept being cited as current.
- https://claudefa.st/blog/guide/mechanics/context-buffer-management [vendor press release — Level 0] no byline, no date, product-marketing register; superseded on the figures. (An earlier note here read `[unattributed analysis]`, which is not a label in the § 1 taxonomy. Ad hoc labels defeat the taxonomy's whole purpose: pick the nearest real one and say why.)
- https://platform.claude.com/cookbook/tool-use-automatic-context-compaction [vendor — bare fact]

**Practitioner use [L0 — one vendor post; corrected 2026-08-01, level fixed 2026-08-01 after audit].** L0, not L1: the ladder puts vendor content *outside* it entirely ("NOT EVIDENCE"), and L1 requires a practitioner opinion. The first correction under-corrected by one rung, which is its own lesson — a fix that lands on the wrong rung still reads as rigour. This block previously read *"L2-strong, 3 signals"* on the strength of three posts said to converge on manual `/compact` at ~60%. A direct re-fetch of all three on 2026-08-01 does not support that:

- https://www.mindstudio.ai/blog/claude-code-compact-command-context-management [vendor press release — Level 0] — does carry *"around 60% context utilization"*, but the byline is "MindStudio Team" (2026-04-02), an unsigned corporate post from an AI-app-building platform vendor writing about an adjacent tool. Not a practitioner account; the earlier `[practitioner analysis]` label was wrong.
- https://claudefa.st/blog/guide/mechanics/context-buffer-management [vendor press release — Level 0] — carries **no 60% figure at all**. It covers auto-compact mechanics (83.5% trigger, 33K buffer) and a 50% figure for proactive clearing, a different move. No byline, no date on the page.
- https://claudelog.com/faqs/what-is-claude-code-auto-compact/ — **no source-type label assigned, deliberately: the page has never been opened.** Returns HTTP 403 to direct fetch and the archive is unreachable from here. Unverifiable, not disproved. Backs nothing that survives; do not count it toward any tally.

So the count is one, and its type is vendor. The percentage has no practitioner backing. The only named practitioner attaching a number to context utilisation is Dex Horthy — *"keeping utilization in the 40%-60% range"* (https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md, [practitioner direct, vendor venue], last substantively edited 2025-12-03, outside the window) — and his is a band held continuously as a workflow discipline, not a threshold to wait for. Reading 60% as a trigger inverts him.

What survives is the qualitative habit, and it comes from Anthropic rather than from practitioners: *"run `/compact` at a natural break in your work, such as between tasks, instead of waiting for auto-compaction to trigger mid-task"* (https://code.claude.com/docs/en/prompt-caching [vendor docs — bare fact], checked 2026-08-01). Anthropic gives no percentage on any docs page checked.

**Counter-evidence.** Cross-tool comparison (badlogic gist, Mar 2026) finds Amp explicitly rejects auto-compaction — Sourcegraph's stance is "keep conversations short and focused, use manual handoff." Counter-signal that auto-compact is a workaround for sessions that should have been shorter.
- https://gist.github.com/badlogic/cd2ef65b0697c4dbe2d13fbecb0a0a5f [practitioner analysis]

### 3. Background tasks / `run_in_background` (shipped mid-2025, matured 2026)

**What shipped.** Bash tool now accepts `run_in_background: true`; Ctrl-B from the UI flips a foreground command to background; tasks return a task ID and persist across the session. Boris Cherny demoed it on Threads as the headline workflow change.
- https://www.threads.com/@boris_cherny/post/DNGzVZCziB1/ [practitioner direct — Anthropic engineer, but personal account]
- https://code.claude.com/docs/en/interactive-mode [vendor — bare fact]

**Practitioner use.** Convergent on dev-server-and-tests pattern: start the dev server in background, keep iterating in foreground, watch logs on demand. Less convergent on "agent uses background to extend its own session" — most posts describe humans pushing tasks to background, not the agent self-orchestrating long runs.
- https://claudefa.st/blog/guide/agents/async-workflows [vendor press release — Level 0] **Relabelled 2026-08-01.** No byline, product-marketing register, same domain this file already documents as unattributed two sections above. The demotion applied to one page of a domain must apply to every page of it.

### 4. Session checkpointing + resume (incremental through 2026)

**What shipped.** `~/.claude/projects/<encoded-cwd>/*.jsonl` durable transcripts (already existed). New in 2026: `claude --resume`, `/resume` picker, `codex resume --all`. File-snapshot checkpoints for undo-before-edit (separate from git, local to session).
- https://code.claude.com/docs/en/how-claude-code-works [vendor — bare fact]
- https://stevekinney.com/courses/ai-development/claude-code-session-management [practitioner analysis]

**Counter-evidence — important.** Open GitHub issues report `--continue` and `--resume` "do not restore prior conversation context" reliably (issue #43696), and `/resume` regressions in v2.1.101 (#46445). Resume is shipped but flaky. Practitioners building tooling around it (e.g. `clauhist`, `claude-checkpoint`) are filling a gap, not extending a solid base.
- https://github.com/anthropics/claude-code/issues/43696 [practitioner direct — bug report]
- https://dev.to/lef237/clauhist-browse-full-claude-code-history-and-resume-sessions-across-projects-1c1o [practitioner direct]

### 5. Subagent / Agent tool as session extender

**What shipped.** Each subagent runs in its own context window, returns only the final message to the parent. This is the recommended primitive for "serious, long-running engineering work" per the official guide and multiple practitioner write-ups in 2026.
- https://claude.com/blog/subagents-in-claude-code [vendor — bare fact]
- https://techtaek.com/claude-code-context-discipline-memory-mcp-subagents-2026/ [practitioner analysis]

**Convergent practitioner adoption.** The 2026 guidance has hardened: "context isolation is the trigger for spawning a subagent, not importance." Use subagents for verbose-output tasks (audits, large reads) so the parent context stays clean. This is the single most-recommended session-length-extending primitive across the practitioner posts in this scan.

### 6. Hooks (SessionStart, Stop, PostToolUse) as long-run guardrails

**What shipped.** Hooks have been GA through 2026. Practitioner pattern that emerged: SessionStart for context injection, PostToolUse for auto-format and test-after-edit, Stop to push to a staging branch — i.e. the loop closes itself.
- https://code.claude.com/docs/en/hooks [vendor — bare fact]
- https://paddo.dev/blog/claude-code-hooks-guardrails/ [practitioner analysis]
- https://dev.to/rajeshroyal/hooks-how-to-put-guardrails-on-your-ai-coding-assistant-4gak [practitioner direct]

**Convergence:** PreToolUse + PostToolUse are the two most-cited hook events, SessionStart third. ~~cover ~80% of practitioner hook use~~ **[SOURCE NEEDED — figure retired 2026-08-01].** No sample, no named posts, no URL backed that number anywhere in this file: a round percentage attached to an unnamed plural, which is the same shape as the 60% claim retired above. Nobody in this scan claims hooks "extend session length" directly — they enforce policy across the session, which is adjacent.

### 7. Codex equivalents (AGENTS.md, resume)

**What shipped.** Codex CLI reads `AGENTS.md` (or `AGENTS.override.md` in `~/.codex/`) once per session. Token-based compaction thresholds (180k–244k by model) with ~20k recent-message preservation. `codex resume --all` for cross-cwd session reopen.
- https://developers.openai.com/codex/guides/agents-md [vendor — bare fact]
- https://gist.github.com/badlogic/cd2ef65b0697c4dbe2d13fbecb0a0a5f [practitioner analysis]

**Counter-evidence.** Codex's own docs warn: "long conversations and multiple compactions can cause the model to be less accurate." Vendor self-disclosure that the long-run primitive degrades.

### 8. Cursor / Cline / Amp / Aider

**Cursor 2.0 (Feb 2026).** Background agents on cloud VMs, up to 8 in parallel via git worktree isolation; subagents can spawn subagents; remote trigger via Slack/GitHub/mobile.
- https://cursor.com/changelog/cli-jan-16-2026 [vendor — bare fact]

**Cline CLI 2.0 (Feb 2026).** Headless mode for CI/CD without an open IDE.
- https://github.com/cline/cline/issues/9174 [practitioner direct — community thread]

**Amp.** As of this run: rejected auto-compaction, bet on short focused sessions plus manual handoff (https://ampcode.com/news/handoff, 2025-10-23, [practitioner direct, vendor venue]; cross-tool corroboration in the badlogic gist cited in § 2). **Superseded — Amp reversed on 2026-05-06** (https://ampcode.com/news/neo): *"So handoff is out. Compaction is in"*, and compaction now runs automatically at 90% fill. Do not cite the counter-philosophy as current.

**Aider.** Token-efficiency play (~4.2× fewer tokens than Claude Code on a 47-file benchmark per MorphLLM); switch models mid-session. Not a session-length play directly, but cheaper sessions = longer affordable sessions.
- https://www.morphllm.com/comparisons/morph-vs-aider-diff [vendor case study — Level 0 for the benchmark itself]

### 9. Sandbox / permission-mode advances

Auto mode (covered above) is the headline. Beyond that: practitioner consensus is unchanged from late 2025 — run `bypassPermissions` only inside Docker with firewall rules and git-as-rollback. The "Safe YOLO" pattern is the convergent practitioner answer; auto mode is being evaluated against it, not replacing it.

## Practitioner adoption signals (L2-strong; below L3 convergence threshold of 10–20 independents)

Project rule: L3 convergence requires 10–20 independent practitioners. **Every count below was re-audited 2026-08-01 and every one was inflated.** The recurring mechanism: a name was counted as an independent practitioner signal without a citation anywhere in this file, and in two cases the same commercial vendor was counted twice.

1. **Manual `/compact` at ~60% at a natural breakpoint** — ~~[L2, 3 signals]~~ **[L0 — RETIRED 2026-08-01, do not cite].** The count is one, and it is vendor content. MindStudio is an unsigned corporate post; ClaudeFA's cited page carries no 60% figure at all; ClaudeLog 403s and is unverifiable rather than disproved. See § 2 above for the full re-fetch. **No practitioner backs this number.**
2. **Subagents for context isolation, not parallelism** — ~~[L2, 3 named + long-tail]~~ **[L2, 1 verifiable]**. Only techtaek carries a URL in this file. Builder.io appears nowhere else; Morph is labelled `[vendor case study — Level 0]` in § 8 and cannot also count as an independent practitioner. The pattern is real and independently attested elsewhere in the corpus; this file's count was not.
3. **Background tasks for dev-server-and-tests** — ~~[L2, 3 signals]~~ **[L2, 2 verifiable]**. Cherny `[practitioner direct]` and ClaudeFA, which is `[vendor press release — Level 0]` (no byline, no date) rather than the `[practitioner analysis]` it was labelled elsewhere in this file, so the true independent count here is one. "apidog" is cited nowhere.
4. **Safe YOLO = container, not flag** — ~~[L2, 4 signals]~~ **[UNVERIFIABLE in this document]**. None of Wiegold, ksred, truefoundry or Morph carries a citation anywhere here, and Morph is the same Level 0 vendor counted in item 2. The practice may well be convergent; this file does not evidence it.

**Guardrail from the audit that found this:** a named source counted toward convergence must be citable from the file that counts it. A name in a tally with no URL is not a signal, it is a memory. And one vendor appearing in two tallies is one voice, not two.

## Shipped with fanfare, no convergent practitioner adoption visible

- **Auto mode (1 month old).** Willison's critical post is the only substantive practitioner write-up surfaced. Too early for convergence; current signal is "interesting, still sandbox it."
- **`claude --resume` / `/resume`.** Multiple open bug reports about state restoration, regressions in v2.1.101. Practitioners are building third-party tooling (clauhist, claude-checkpoint) — gap-filling, not feature-confirming.
- **Cursor 2.0 cloud-VM background agents.** Announced Feb 2026; this scan didn't find a single named-practitioner blog post showing them running in production. Either too early or marketing-led.

## Curriculum implications for M5

**Read this section as of April 2026, not as of today.** Every "today", "one month old" and "too new" below is computed from the April vantage and none of it was recomputed when § 2 and the adoption tallies were corrected on 2026-08-01. Auto mode is now over four months old, not one. Re-derive before teaching from this.

A student on Claude Code in April 2026 could rely on:

1. **Subagents for context isolation.** Stable, well-understood, the recommended primitive for long work. Teach this first.
2. ~~**Manual `/compact` at ~60%.** Three independent practitioner posts converge on the same number.~~ **RETIRED 2026-08-01 — do not teach.** No practitioner posts converge on that number; the count is one unsigned vendor post (§ 2). What survives is the qualitative habit from Anthropic's own docs, *"run `/compact` at a natural break in your work… instead of waiting for auto-compaction to trigger mid-task"*, plus `/compact <instructions>` to choose what the summary keeps. **Teach no percentage:** the auto-compact trigger varies by model and venue, and HumanLayer retired its own 40%-of-window warning for a flat token count because *"For opus 1m this is only 10% of the context window"* (https://www.humanlayer.dev/blog/long-context-isnt-the-answer, [practitioner direct, vendor venue], 2026-03-23). A percentage is the wrong unit, not the wrong number.
3. **Background tasks for dev-server-and-tests.** Dependable. Frame it as "push the long-running thing to background so the agent loop stays interactive," not "background tasks make the agent run longer."
4. **Hooks for closing the loop (PostToolUse for tests, Stop for staging push).** GA, convergent practitioner pattern. Adjacent to session length, but the right discipline.
5. **`bypassPermissions` only inside a Docker sandbox.** Convergent practitioner consensus; auto mode is a softer alternative but too new to teach as default.

What NOT to teach as load-bearing in M5:
- **Auto mode as the new default.** One month old, single substantive practitioner review (skeptical). Mention as "shipping March 2026, evaluate it against your own sandbox setup."
- **`--resume` as durable session continuation.** Bug reports active; practitioners route around it. Mention as "the file is on disk, the resume command is improving."
- **Cursor 2.0 cloud agents as the path.** No practitioner evidence of production use yet.

The honest framing, **revised 2026-08-01**: the platform mechanics that extend session length are (a) subagents for context, and (c) hooks for policy enforcement. **(b) "manual compaction discipline" is withdrawn** — it rested entirely on the retired 60% claim, and a four-lane practitioner sweep on 2026-08-01 found no convergence on compaction practice in either direction: some build compaction in as first-class, one team reversed *to* automatic compaction, others restart fresh or isolate into subagents. What replaces it is not a different discipline but a premise every camp shares: a long run cannot trust its window, so durable state outside the context is what makes the run survivable. Auto mode and resume were both headed somewhere useful as of April; neither was re-checked in the August pass.
