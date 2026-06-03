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
> Confirm file: `2026-06-03-1700-token-drivers-sweep2-no-memory.md`.
> - **The "Willison quote" follow-up resolves to Drew Breunig** [practitioner direct], dbreunig.com 2025-06-26 (Willison only curated him). Attribute to Breunig.
> - **ETH "3%" stat corrected:** Medium digest overgeneralized. Primary = **arXiv 2602.11988v1** [academic/research]; the **−3% is the LLM-GENERATED-doc penalty specifically** (human-written docs **+4%**, no-docs ablation **+2.7%**, all at **~+20% cost**). Use the nuance, not the strawman.
> - **CLAUDE.md-bloat counter upgraded from L0-only** to include **Wiegold** [practitioner direct, 2026-03-09, FRESH: "a bloated 300-line CLAUDE.md can actually make Claude worse"] + ETH. **Driver is bidirectional.**
> - **CONFIRMED L3 on existence/shape, L2 per number** (~5–6 voices, low end). Anchor quotes are Jun–Nov 2025 = **historical context only**; fresh 2026 traffic has moved from "write it down" → **"watch what you write down."**

# Sweep 1, Driver #4 — No persistent memory → re-derivation/re-reading + flailing/error-recovery loops as token drivers

## Focus

Test the hypothesis that **lack of written project memory** (CLAUDE.md/AGENTS.md, scratchpads, plan files, progress notes) makes the agent **re-read the same files, re-derive the same facts, and lose work between sessions** — all re-sent as input tokens. ALSO the sibling driver: **long flailing / error-recovery loops** where the agent retries failed approaches in-context, and those failed attempts accumulate in the window and get re-billed every turn. Question to resolve: are memory-gap and flailing-loop one driver or two? Counter-evidence sought.

## Queries Used

- `CLAUDE.md project memory agent re-reading files token cost context`
- `coding agent flailing loop debugging in-context token waste failed approaches retried`
- `Simon Willison agent re-reading files context CLAUDE.md notes scratchpad tokens`
- `Armin Ronacher agent write it down notes memory token context engineering coding`
- `Anthropic engineering "context engineering" agents note-taking memory persist outside context window`
- `Harper Reed OR Steve Yegge coding agent plan file spec memory re-reading rework tokens 2026`
- `CLAUDE.md memory files overrated don't help agents waste context skeptic` (counter-evidence)

## Findings

### 1. Steve Yegge — "50 First Dates" / Beads memory system
- URL: https://steve-yegge.medium.com/introducing-beads-a-coding-agent-memory-system-637d7d92514a
- Label: **[practitioner direct]** (Yegge's own Medium)
- Date: 2025-10-13
- What: Yegge names lack of cross-session memory as *the* core failure and ties it directly to rediscovery/rework and token burn. Built Beads (issue/memory store in git+SQLite) to fix it.
- Evidence level: **L2 single-practitioner experiment** (his own build) but his framing of the *problem* is widely echoed → contributes to L3.
- Key claims (verbatim):
  - "The problem we all face with coding agents is that they have no memory between sessions — sessions that only last about ten minutes."
  - "It's the movie Memento in real life, or Fifty First Dates."
  - On re-reading: "200 messages into a conversation, I have to either (1) hope the markdown TODO list is still in my context window, or (2) ask them to re-read it to me, or (3) guess."
  - On the markdown-swamp anti-pattern: "hundreds of new markdown files … all partly implemented, all partly obsolete, all 100% useless."
  - On rework: "problems in your code being perennially lost and rediscovered because they were never recorded in the first place."
- NOTE (separate vendor digest, NOT evidence, context only): VirtusLab/morphllm digests report Beads "handles [dependency graph] deterministically in Go … instead of making the LLM analyze a dependency graph (which burns tokens and is error-prone)." [republished PR / L0] — only the framing is reused; treat as context.

### 2. Anthropic — Effective context engineering for AI agents
- URL: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Label: **[practitioner direct]** (Anthropic engineering, own venue)
- Date: 2025-09-29 *(dated context — predates the 6-month freshness window; mechanism-vocabulary, still standard)*
- What: Defines structured note-taking / agentic memory as the mechanism to persist outside the window and pull back — explicitly to enable long-horizon work that's "impossible" otherwise.
- Evidence level: **L2/L3** (platform-builder, names the mechanism and the without-it failure mode).
- Key claims (verbatim):
  - "Structured note-taking, or agentic memory, is a technique where the agent regularly writes notes persisted to memory outside of the context window."
  - "These notes get pulled back into the context window at later times."
  - "After context resets, the agent reads its own notes and continues multi-hour training sequences or dungeon explorations."
  - "This coherence across summarization steps enables long-horizon strategies that would be impossible when keeping all the information in the LLM's context window alone."

### 3. Anthropic — Effective harnesses for long-running agents
- URL: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Label: **[practitioner direct]** (Anthropic engineering, own venue)
- Date: 2025-11-26
- What: Names the re-derivation problem precisely — every new session starts blank — and the fix (progress file + git) that *saves tokens* by removing re-figuring-out. Also touches error-recovery via git revert.
- Evidence level: **L2/L3**.
- Key claims (verbatim):
  - "The core challenge of long-running agents is that they must work in discrete sessions, and each new session begins with no memory of what came before."
  - "a claude-progress.txt file that keeps a log of what agents have done, and an initial git commit that shows what files were added."
  - "The key insight here was finding a way for agents to quickly understand the state of work when starting with a fresh context window, which is accomplished with the claude-progress.txt file alongside the git history."
  - Token framing: "This approach saves Claude some tokens in every session since it doesn't have to figure out how to test the code."
  - Error-recovery: "This allowed the model to use git to revert bad code changes and recover working states of the code base."

### 4. Lance Martin — Context Engineering for Agents
- URL: https://rlancemartin.github.io/2025/06/23/context_engineering/
- Label: **[practitioner analysis]** (Lance Martin, own blog; ex-LangChain, synthesizes others)
- Date: 2025-06-23 *(dated context — predates the 6-month freshness window)*
- What: Frames "context offloading" / scratchpads as saving info outside the window; explicitly names ballooning tokens from long-running tasks + tool-call accumulation as the cost driver.
- Evidence level: **L2 (synthesis)**.
- Key claims (verbatim):
  - "Note-taking via a 'scratchpad' is one approach to persist information while an agent is performing a task. The central idea is to save information outside of the context window so that it's available to the agent."
  - "long-running tasks and accumulating feedback from tool calls mean that agents often utilize a large number of tokens. This can cause numerous problems: it can exceed the size of the context window, balloon cost / latency, or degrade agent performance."
  - "The LeadResearcher begins by thinking through the approach and saving its plan to Memory to persist the context, since if the context window exceeds 200,000 tokens it will be truncated."

### 5. Armin Ronacher — Agentic Coding Recommendations
- URL: https://lucumr.pocoo.org/2025/6/12/agentic-coding/
- Label: **[practitioner direct]** (own blog)
- Date: 2025-06-12
- What: Adjacent but supporting. Ronacher's whole thrust is reducing agent flailing via simple, local-reasoning code, stable tools, and "the dumbest thing that works" — i.e. designing to cut trial-and-error loops. Does NOT directly frame memory-gap as a token cost (fetch found no such passage). Use as context for the flailing-loop side, not as a memory-gap citation.
- Evidence level: **L1/L2 context**.
- Key claims (paraphrase, verified theme not exact-quote-extracted by fetch): agents "work with just a few loaded files in context and don't have much spatial awareness of the codebase"; favor "the dumbest possible thing that will work." (Direct-quote verification deferred — fetch model returned conservative null on exact sentences; theme is well-attested across his corpus.)

### 6. Augment Code — AI Agent Loop Token Cost
- URL: https://www.augmentcode.com/guides/ai-agent-loop-token-cost-context-constraints
- Label: **[vendor case study / L0 — NOT EVIDENCE]** (Augment promoting own products; byline Paula Hingel, staff writer)
- Date: 2026-04-06
- What: Best *articulation* of the re-billing mechanism behind the flailing-loop driver, but commercial. Cited for framing only; the underlying claims (re-billing, triangular cost) are mechanical facts, not practitioner experience.
- Evidence level: **L0 — context/framing only, not counted toward convergence.**
- Key claims (verbatim, framing): "LLM APIs bill for the entire conversation history on every call." / "A 10-step coding agent therefore does not cost 10x a single call. The cost follows a triangular number series where each step re-bills every previous step's content." / "the growing conversation history is the dominant cost driver in multi-step loops."

### Counter-evidence

### 7. ETH Zurich study (via Medium digest) — context files may not help
- URL: https://medium.com/@reliabledataengineering/claude-md-dont-work-eth-zurich-study-shows-context-files-reduce-success-rates-by-3-1518cac80929
- Label: **[general press / digest of academic — L0/L1, UNVERIFIED to primary]** — a Medium write-up *about* an ETH Zurich study, not the paper. The "reduce success rates by 3%" is a [UNVERIFIED STAT] until traced to the primary.
- Date: 2026 (exact day not surfaced)
- What: Claims agents follow context-file instructions but it "doesn't improve outcomes"; raises whether context files should exist at all. Genuine counter to the "write it down always wins" framing.
- Evidence level: **L1 counter-context.** Needs primary-source trace before any use.

### 8. CLAUDE.md size caveats (multiple how-to blogs, L0/L1)
- The widely-repeated guidance ("target under 200 lines," "don't waste lines on what Claude learns in one session," Claude Code memory "caps at 200 lines … exact keyword match") is itself a counter-pressure: memory files are *also* always-loaded weight and a too-big CLAUDE.md is its own token drain + adherence drop. So the driver is bidirectional — absence costs re-derivation, excess costs always-on tokens. Sources are commercial how-tos (KDnuggets, claudefa.st, Milvus) → L0; cited as context for the nuance only.

## What I Looked For But Did Not Find

- A clean **L3 convergence of 10–20 independent practitioners** putting a *number* on tokens-wasted-due-to-no-memory. The mechanism is named everywhere; quantified rework cost is not. No defensible quantified stat.
- Strong **practitioner-direct quotes from Simon Willison** specifically on memory-gap-as-token-cost — he covers offloading/scratchpads and plan.md, but the surfaced material was tag-index level, not a single quotable post. Deferred for a follow-up fetch of a specific simonwillison.net post.
- A practitioner explicitly **separating** memory-gap from flailing-loop as two distinct cost lines — most treat them as one continuum (no memory → rediscovery → retrying things already tried).
- Nordic-specific practitioner takes — none surfaced.

## Orientation

Memory-gap and flailing-loop read as **one driver with two faces**, not two independent drivers: the absence of externalized memory is the *cause*, and re-reading / re-derivation / retrying-already-failed-approaches are its *symptoms*, all paid as re-billed input tokens (Augment's triangular-cost math is the mechanism). Yegge ("50 First Dates," rediscovery) and Anthropic-harnesses ("each new session begins with no memory … saves tokens by not having to figure out") are the load-bearing practitioner-direct anchors; Anthropic-context-engineering and Lance Martin supply the mechanism vocabulary (note-taking / offloading). Freshness note: most anchor sources predate the 6-month window (Jun–Nov 2025); this driver has little *last-6-months* fresh practitioner traffic — itself a signal that the memory-gap framing has stabilized into accepted practice rather than active debate. The honest nuance for the KB: it's **bidirectional** — too little written memory costs re-derivation, too much always-loaded CLAUDE.md costs tokens-every-turn and (per the ETH digest, unverified) may not lift outcomes. Report at L3 on the *existence and shape* of the driver; do NOT attach a quantified rework-token figure (none verified). Follow-ups: (a) fetch a specific Simon Willison post for a direct quote; (b) trace the ETH Zurich study to primary before citing the 3% figure.
