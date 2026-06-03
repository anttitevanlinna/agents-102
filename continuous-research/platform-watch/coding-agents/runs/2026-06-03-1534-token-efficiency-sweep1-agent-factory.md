---
type: run-log
domain: coding
evidence_level: L3
platforms: [anthropic, coding-agents]
nordic: false
updated: 2026-06-03
cycle: token-eff-s1
---

# Token / context efficiency — agent-factory & compound-engineering lens (sweep 1)

Lens: context-as-filesystem, subagent context isolation, lossy-compaction-vs-handoff, and the counter-evidence on when multi-agent COSTS more tokens than it saves. People-first; primary sources read where reachable.

---

## FINDINGS

### F1 — Amp retires lossy compaction for "handoff" (the lossy-compaction critique, stated plainly)
- **Who:** Amp team (Sourcegraph). Explainer video credited to Nicolay and Quinn; no individual byline on post.
- **URL:** https://ampcode.com/news/handoff — **[practitioner direct]** (vendor's own product blog, but it is the builder describing their own engineering decision; treat the *engineering observation* as practitioner-direct, the product pitch as L0).
- **Date:** 2025-10-23.
- **What:** Amp removed compaction in favor of "handoff" — extracting only what matters for the next task into a fresh thread, rather than summarizing in place. The post is the cleanest articulation of *why* compaction degrades quality.
- **Evidence level:** L2/L3 (single-vendor experiment, but converges with badlogic's cross-tool study F5 and Cognition F4).
- **Exact quotes:**
  - "It's lossy, for one. Every time you compact a thread, what's in the context window gets replaced with a summary."
  - "compaction, we found, encourages long, meandering threads, in which you just compact once you run out of context window, **stacking summary on top of summary**."
  - Mechanism: Amp "analyzes the current thread and generates a prompt plus a list of relevant files for the new thread" — i.e. **file-mediated handoff** (pass paths, not the whole transcript). Example invocations: `/handoff execute phase one of the created plan`.

### F2 — Amp REVERSES: handoff retired, auto-compaction returns (the counter-evidence to F1)
- **Who:** Amp team (Sourcegraph).
- **URL:** https://ampcode.com/news/neo — **[practitioner direct]** (same caveat as F1).
- **Date:** 2026-05-06.
- **What:** Seven months after killing compaction, Amp brought back automatic compaction and **retired handoff**. The stated reason: frontier models in 2026 are good enough at summarization that manual handoff is no longer worth the friction. This is important counter-evidence: the "compaction is lossy → always handoff" conclusion was model-capability-dependent, not a permanent law.
- **Evidence level:** L2 (single vendor reversing its own prior position — high-signal because it's a builder publicly contradicting their own 7-month-old design).
- **Exact quotes:**
  - "Compaction now runs automatically when the context window is 90% full."
  - "When the context window fills up, Amp now compacts the thread: it summarizes the current context, starts a fresh window with that summary, and keeps going."
  - Handoff "made obsolete" because "compaction made it obsolete"; design principle: "build for what the frontier models can do now, in 2026, and what they will be able to do in the future."
  - Beta user (named only as beta user): "I love having auto-compaction. NOT missing handoff…"
- **NB the arc:** lossy-compaction-bad (Oct 2025) → handoff → compaction-fine-again (May 2026). The durable lesson is "focused threads beat meandering ones," not "never compact."

### F3 — Boris Cherny: Claude Code dropped vector RAG for agentic (grep/glob) search
- **Who:** Boris Cherny (creator of Claude Code, Anthropic).
- **URLs:**
  - https://x.com/bcherny/status/2017824286489383315 — **[practitioner direct]** (his own X post). *NB: x.com returned HTTP 402 to automated fetch; tweet text below is as quoted by two independent secondary captures, not re-verified byte-for-byte at the canonical URL.*
  - https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny — **[practitioner analysis]** (Gergely Orosz interviewing Cherny), 2026-03-04.
- **Date:** tweet ~late 2025/early 2026; interview 2026-03-04.
- **What:** Early Claude Code used RAG + a local vector DB; Anthropic found agentic search (just glob + grep, model-driven) "overwhelmingly better." Relevance to *token/context efficiency*: agentic search loads only the files the model chooses to read on demand, instead of stuffing retrieved chunks into context up front — context stays clean, no stale index, no embedding pipeline.
- **Evidence level:** L2/L3 (single-org decision, but widely copied — Cursor, Windsurf, Cline, Devin, Amp reportedly followed; that convergence pushes toward L3).
- **Exact quotes:**
  - Cherny (tweet, as quoted): "Early versions of Claude Code used RAG + a local vector db, but we found pretty quickly that agentic search generally works better. It is also simpler and doesn't have the same issues around security, privacy, staleness, and reliability."
  - Pragmatic Engineer summary: "The team tried several approaches to make agentic search better: local vector databases, recursive model-based indexing, and other fancy approaches. All had downsides (stale indexes, permission complexity). Plain glob and grep, driven by the model, beat everything." Inspired by "how Boris observed engineers at Instagram searched code when click-to-definition… was broken."

### F4 — Cognition (Walden Yan): "Don't Build Multi-Agents" — context-sharing failure, not token cost, is the killer
- **Who:** Walden Yan (Cognition / Devin).
- **URL:** https://cognition.ai/blog/dont-build-multi-agents — **[practitioner direct]** (Cognition's own engineering essay).
- **Date:** 2025-06-12.
- **What:** Core counter-evidence to naive multi-agent fan-out. Yan argues parallel subagents fail because they don't share full context — each makes implicit decisions that conflict at merge time. His prescription: single-threaded linear agents, and where context gets long, a *dedicated context-compression model* (the "smart friend" / full-context fork idea) rather than parallel delegation.
- **Evidence level:** L2 (single builder's argued position + the Flappy Bird demo), but it's the canonical anchor of the "don't delegate" side.
- **Exact quotes / principles:**
  - "Running multiple agents in collaboration only results in fragile systems. The decision-making ends up being too dispersed and context isn't able to be shared thoroughly enough."
  - Principle 1: "Share context, and share full agent traces, not just individual messages."
  - Principle 2: "Actions carry implicit decisions, and conflicting decisions carry bad results."
  - **Flappy Bird example:** one subagent builds a Super Mario–style background while another builds a mismatched bird, because neither shares the other's implicit design context — the final agent can't reconcile them.
  - On long-context compression: proposes a dedicated LLM to compress agent history into "key details and decisions," called out as "hard to get right" and needing domain-specific investment.
- **NB tension with F1's file-handoff:** Cognition's "share FULL traces, not summaries" is in direct tension with Amp-handoff's "extract only relevant files." Both are reacting to the same lossy-summary problem; they diverge on the fix (full context vs. curated subset).

### F5 — Anthropic's own multi-agent post: the token-multiplier numbers (the cost side, from the pro-multi-agent camp)
- **Who:** Anthropic engineering team; quoted by Simon Willison.
- **URLs:**
  - https://simonwillison.net/2025/Jun/14/multi-agent-research-system/ — **[practitioner analysis]** (Willison quoting Anthropic's primary post).
  - Primary: Anthropic "How we built our multi-agent research system" engineering blog.
- **Date:** 2025-06-14 (one day after Cognition F4 — the public clash).
- **What:** Anthropic, *defending* multi-agent for research, still concedes the brutal token math. This is the load-bearing cost number for the whole topic.
- **Evidence level:** L2 (vendor's own measurement of their own system — self-reported, but a self-reported COST against their own product, so low confirmation-bias risk on the number itself).
- **Exact quotes:**
  - "agents typically use about **4× more tokens** than chat interactions, and multi-agent systems use about **15× more tokens** than chats."
  - "multi-agent systems require tasks where the value of the task is high enough to pay for the increased performance."
  - Use-fit: multi-agent wins on "valuable tasks that involve heavy parallelization, information that exceeds single context windows, and interfacing with numerous complex tools." (Implication: NOT routine coding.)
- **Zombie-stat note:** "15x" is a clean round number but traces to Anthropic's OWN primary post, not a re-circulated third-party stat — it is the original. The companion "4x for single agents" is the under-cited half; report both together. The often-paired "~80% of performance variance explained by token usage" claim could NOT be verified in the Willison excerpt — mark **[UNVERIFIED STAT]** until traced to the primary post.

### F6 — Kieran Klaassen: "The Folder Is the Agent" — context = filesystem, made literal
- **Who:** Kieran Klaassen (GM of Cora, compound-engineering originator).
- **URLs:**
  - https://every.to/source-code/the-folder-is-the-agent — **[practitioner direct]** (his own essay on Every), 2026-04-13.
  - https://every.to/guides/compound-engineering — **[practitioner direct]**, updated 2026-05.
- **Date:** 2026-04-13 (folder essay); compound-engineering guide updated May 2026.
- **What:** Klaassen's framing that an agent *is* a folder of context (CLAUDE.md/AGENT.md + conventions + runbooks), not a separate runtime. The token-efficiency payoff is implicit: point the model at a folder, it reads only what it needs (paths, not pasted paragraphs), and learnings get codified to files so they don't re-enter context every session.
- **Evidence level:** L1/L2 (one builder's well-argued philosophy + his Cora practice; not multi-practitioner convergence on its own).
- **Exact quotes:**
  - "a folder with a CLAUDE.md/AGENT.md…that's an agent."
  - "Just by pointing the model at this folder, which contains some of my personality, knowledge, and taste, the model can be a specialist."
  - "an agent is much simpler: a model with enough context so you don't have to re-explain everything."
  - Compound-engineering guide on findability (avoiding context re-bloat): "Add YAML frontmatter to make sure it is tagged with the right metadata, tags, and categories for retrieval"; loop = "Capture the solution… Make it findable… Update the system."
- **Caveat:** The specific slogans "pass paths not paragraphs" and "context is a filesystem" attributed in the tasking were NOT found verbatim in his writing. The *concept* is clearly present ("point the model at this folder"); the exact phrasings appear to be paraphrase, not quotable Klaassen lines. Do not quote them as his.

### F7 — badlogic (Mario Zechner): cross-tool compaction study (the convergence layer)
- **Who:** Mario Zechner ("badlogic").
- **URL:** https://gist.github.com/badlogic/cd2ef65b0697c4dbe2d13fbecb0a0a5f — **[practitioner direct]** (his own GitHub gist comparing four tools).
- **Date:** 2025-12-02.
- **What:** Independent comparison of how Claude Code, Codex CLI, OpenCode, and Amp handle compaction — converges with F1/F2 that multiple compactions degrade quality, and documents the concrete token thresholds each tool uses.
- **Evidence level:** L3-supporting (one practitioner, but surveying four independent tools' real behavior).
- **Exact findings / numbers:**
  - Claude Code: auto-compaction at ~95% capacity; "can go off the rails if auto-compact happens mid-task"; quality degrades cumulatively with multiple compactions.
  - Codex CLI: token thresholds 180k–244k (model-dependent); preserves ~20k of recent user messages alongside the summary; explicit in-product warning: "Long conversations and multiple compactions can cause the model to be less accurate."
  - OpenCode: separate "prune" mechanism; protects last 40k tokens of tool output; `OPENCODE_DISABLE_AUTOCOMPACT` escape hatch.
  - Amp (at time of writing): manual-only, "For best results, keep conversations short & focused"; secondary model extracts relevant info on handoff.

---

## SYNTHESIS (the spicy version)

The field is having an argument with itself, and the argument is the finding. Two camps, same enemy (lossy summary):

- **Curate-the-subset camp** (Amp-handoff F1, Klaassen's folder F6, Cherny's grep-on-demand F3): keep context small by passing *pointers* — file paths, folders, grep results — and let the model pull only what it needs. Token-cheap because nothing enters context speculatively.
- **Share-everything camp** (Cognition F4): the failure mode isn't too many tokens, it's too few *shared* tokens; don't fragment context across subagents at all, run single-threaded and share full traces.

The counter-evidence the tasking asked for is unusually clean:
1. **Multi-agent's price is measured and admitted by its own vendor:** 4× (single agent) / 15× (multi-agent) tokens vs. chat — Anthropic's own number (F5). Multi-agent is a *high-value-task* tool, not a default.
2. **Compaction-is-always-lossy was a 2025 truth that 2026 models partly dissolved:** Amp killed compaction (Oct 2025, F1) then un-killed it (May 2026, F2). The durable lesson survives ("focused threads > meandering ones"); the specific tactic didn't.
3. **The cheapest context is the context you never loaded:** agentic grep/glob (F3) beat RAG partly by *not* pre-stuffing retrieved chunks — the token saving is in what you decline to retrieve.

Reframe for a builder leader: the question is never "how do I compress context?" but "what did I load that I never needed?" Compaction is firefighting; the discipline is not starting the fire. Pass paths, not paragraphs — even if Klaassen didn't say it in those exact words, his folder did.

---

## WHAT I LOOKED FOR BUT DID NOT FIND

- **Klaassen's exact slogans** "pass paths not paragraphs" / "context is a filesystem" — concept present, verbatim phrasing not found. Treated as paraphrase, not quoted.
- **Boris Cherny on subagents / context-isolation as a token-saving mechanism specifically** — found his RAG-vs-agentic-search position (F3), but no primary-source quote from him tying subagent isolation to token savings. The Pragmatic Engineer interview summary explicitly notes it does NOT cover his views on context windows/tokens/subagents re: search. Gap.
- **Cognition's token-multiplier number** — the "Don't Build Multi-Agents" essay argues from *context-sharing fragility*, NOT from token cost. The 15× figure is Anthropic's (F5), not Cognition's. Several secondary write-ups conflate the two; corrected here.
- **The "~80% of performance variance explained by token usage" claim** — circulated in secondary coverage of Anthropic's post; NOT verifiable in the Willison excerpt. Marked [UNVERIFIED STAT] pending trace to the Anthropic primary.
- **Boris Cherny's canonical tweet byte-for-byte** — x.com returned HTTP 402 to automated fetch; oEmbed and TwStalker workarounds both blocked (402/403) this run. Tweet text is from two converging secondary captures; flag for re-verification at the canonical URL via the documented X workaround.
- **A clean head-to-head token measurement of file-mediated handoff vs in-context handoff** — nobody has published "handoff saved X tokens vs compaction" with numbers. The case for handoff is quality-framed (lossiness), not token-framed. Open research gap; would be a high-value original measurement for Bosser.
- **Nordic practitioners** on this specific topic — none surfaced. nordic: false stands.
