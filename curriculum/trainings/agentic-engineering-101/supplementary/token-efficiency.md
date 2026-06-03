# Token efficiency: the craft and the folklore

Token efficiency sounds like a cost problem. Use fewer words, pay a smaller bill. That framing is mostly wrong, and the wrong framing is what makes the topic confusing.

The real story is about quality. An agent works inside a context window: the running set of tokens it can see at once. Your system prompt, your `./CLAUDE.md`, the files it read, every tool result, the whole conversation. The window is finite. As it fills, the model gets worse at using what is in it. Anthropic's engineering team named this context rot: recall drops as the window grows. Chroma tested it across 18 models in 2025 and found the slide happens even on easy tasks, and even far below the window's limit.

So token efficiency is not thrift. It is signal-to-noise. The goal is the smallest set of high-signal tokens that gets the work done. Anthropic calls the skill context engineering. The cost savings are real, but they are a side effect. A cleaner window is cheaper and smarter at the same time, which is why this is one lever, not two.

Hold onto the counterintuitive part: a fuller window can produce a worse answer, not just a slower or pricier one. A 2026 study trimmed an agent's context by 23 to 54 percent on a coding benchmark, and its success rate went up.

## What "efficient" actually measures

There is no agreed metric, and you should know that going in. Some people count tokens per task. Some watch cache-hit-rate. Some track cost per pull request. Almost nobody publishes their numbers, so most figures you will read are guesses wearing a lab coat.

What you can read is your own window. `/context` already gives you the breakdown: system prompt, tools, memory files, messages, and free space. The number that matters is not the total. It is the gap between what you loaded and what you actually needed. That gap is the inefficiency, and everything below is about closing it.

## Put a number on it

It helps to see the cost once, in dollars, and then stop worrying about it. In an agent session the whole context is re-sent as input on every turn, so anything you carry is paid again and again across the session.

Ask Claude to price the bloat: 100K extra tokens over 20 turns on Opus, then what caching does to it.

**Prompt** *(Claude Code)*

```
Use current Opus pricing from the Anthropic pricing page. In an agent session the full context is re-sent as input on every turn.

Work out the dollar cost of carrying an extra 100,000 tokens of context across 20 turns. Then do the same for 20,000 tokens. Show the per-turn cost, the 20-turn total, and the difference.

Then factor in prompt caching and tell me how much the difference shrinks.
```

On Opus, carrying an extra 100K tokens across 20 turns runs about 10 dollars with no caching, against 2 dollars for a lean 20K. That looks like a reason to trim. Then caching lands: turn one pays to write the cache, the next nineteen read it at a tenth of the price, and the gap between fat and lean collapses to a bit over a dollar.

So the dollar cost is the cheapest line on the bill. That is the point. People price the tokens and miss the real tax, which is the model getting worse at a stuffed window. Trim context for the quality, and the money takes care of itself.

## The craft: moves that hold up

These are the moves that show up again and again, across many builders working independently. Treat them as defaults.

**Start clean.** One task per session. When you switch to something unrelated, run `/clear` instead of carrying the old conversation into the new problem. A fresh window is the cheapest quality upgrade there is, and the most skipped. People hoard one long session as if starting another were expensive. It is not.

**Pass paths, not paste.** Do not paste a wall of code into the chat. Point the agent at the files and let it read what it chooses. Kieran Klaassen frames this as "the folder is the agent." Claude Code leans on the same idea: its search is plain grep and glob driven by the model, and Boris Cherny has said that beat a vector index. Pasted text sits in your window forever. A file the agent reads on demand can leave again. The same caution runs the other way: a tool that pulls a whole file or dumps a full log lands in the window and rides every later turn too, so prefer narrow reads and quiet commands.

**Use a subagent as a firewall.** When a job needs a noisy investigation (read twenty files, run a few commands, trace a config), hand it to a subagent. The subagent works in its own separate window and returns only its summary. It can read a dozen files while your own window barely moves. You see the answer, not the search.

There is a trade. A subagent spends its own tokens, so delegation costs more total tokens than doing the work inline. You are buying a clean window with a slightly larger bill. For anything exploratory, that trade is worth it.

**Route by complexity, not price.** A mechanical sub-task (rename across files, pull a list, format some output) does not need your strongest model. Send it to a smaller, faster one and keep the heavy model for the reasoning. Route by how hard the thinking is, not by what looks cheap. A cheap model on a hard task is the expensive mistake.

**Keep what you carry lean.** Everything in `./CLAUDE.md` is paid on every turn of every session, because that file (the team-level, PR-reviewed one) loads at the top of each window. Keep it short. Move the rules you only sometimes need into skills the agent loads on demand, so they cost nothing until they fire.

## The folklore: numbers that don't survive a second look

Token-efficiency advice arrives with confident, round numbers. Most do not hold. Reading them critically is part of the skill.

**"Caching saves you 90 percent."** Prompt caching is real, and the discount on cached input is large. But the headline savings figures almost always trace back to one company's own page or a single run, not a measured bill. Treat any round percentage about cost as folklore until you have seen the method behind it.

**"Compaction is always lossy, so always hand off."** This one was true in 2025. When you compact, the model replaces the conversation with a summary, and summaries lose detail. So builders moved to handing off a fresh prompt instead. Then in 2026 the models got good enough at summarizing that some of those same builders switched back. The advice did not just soften. It reversed, in months.

That reversal is the real lesson of this whole topic. Every number and rule here has a date. Window sizes grow, models get better at long context, costs move. A move that was craft last quarter can be folklore this quarter. So when you read a tip (including this page), check it against your own `/context` before you trust it.

## Drivers of inefficient context

Carried context is the driver you can watch in `/context`. It is not the only one. The rest fall into two kinds: durable problems you engineer around, and loud problems whose fix already shipped. Telling the two apart saves you from chasing a cure that landed three releases ago.

**Durable, so engineer around these.**

**The codebase the agent reads.** A messy repo makes the agent hunt for things, and a short map at the root (an `AGENTS.md`, or a lean `./CLAUDE.md`) cuts the hunting. The one controlled test of this in 2026 found that adding the map dropped the agent's output tokens by about a sixth and its wall-clock time by almost a third. The surprise is that input tokens barely moved: the real tax was never the reading, it was the thrashing and the time.

**Thin memory, both directions.** With no written memory, the agent re-derives each session what it already worked out in the last one; Steve Yegge calls it living through Memento. With too much, a bloated `./CLAUDE.md` is paid on every turn, so the file meant to save effort starts charging for it. The 2026 move is not "write it down," it is "watch what you write down."

**Loud but shrinking, so check before you chase.**

**The tool and MCP surface.** Every tool you connect adds its description to the window on every turn, used or not, and one popular server was once quoted at tens of thousands of tokens of overhead. Then lazy tool-loading and caching shrank it so far that Simon Willison, who first raised the alarm, now calls it largely solved. Prune what you never call and let the harness defer the rest.

**Cache invalidation.** Editing something early in the context, or resuming a session, can bust the prompt cache, and then you re-pay full input price for tokens that were nearly free a moment ago. It is real, and on a bad day it has been measured at a large multiple of the normal cost. But the worst cases tend to be version-specific defects that get patched in a release, so check your version before you rebuild your workflow around it.

**Fanning out too wide.** A single subagent doing your noisy reading is craft, as above; spinning up many parallel agents is a different bill. One widely quoted figure puts multi-agent runs at around fifteen times the tokens of a plain chat. That number is a year old and comes from a single source whose own authors say fan-out is the wrong shape for most coding, so read it as a ceiling for research-style work, not a default for yours.

## Where this leaves you

Token efficiency is one lever with two payoffs: a cleaner window thinks better and costs less. You do not need a dashboard to start. You need `/context`, a habit of starting clean, and a subagent doing your noisy reading. The rest is noticing what you loaded and never used.

## Now go clean your window

*Full disclosure on how this page got made. It took two research sweeps, eight parallel searches, a pile of fetched sources, and a long stretch of writing and re-writing. Even with subagents doing the noisy reading in their own windows, the session that produced it crossed 242,000 tokens. A guide to travelling light, written from an overpacked car.*

*Which is the point, not the exception. Discipline shrinks the bloat. It does not abolish it. So the session ends the way yours should when it gets heavy: time to compact, or start clean. The cheapest context is the one you just let go of.*

## Sources

- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (Anthropic, 2025)
- [Context rot](https://research.trychroma.com/context-rot) (Chroma, 2025)
- [Self-adaptive context pruning for coding agents](https://arxiv.org/abs/2601.16746) (SWE-Pruner, 2026)
- [On the impact of AGENTS.md files on coding-agent efficiency](https://arxiv.org/abs/2601.20404) (2026)
- [Building Claude Code with Boris Cherny](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) (The Pragmatic Engineer, 2026)
- [The folder is the agent](https://every.to/source-code) (Kieran Klaassen, Every, 2026)
- [Compaction and handoff](https://ampcode.com/news/handoff) (Amp, 2025), and [its 2026 reversal](https://ampcode.com/news/neo)
- [Introducing Beads: a coding-agent memory system](https://steve-yegge.medium.com/introducing-beads-a-coding-agent-memory-system-637d7d92514a) (Steve Yegge, 2025)
- [CLAUDE.md: helpful, or expensive noise?](https://thomas-wiegold.com/blog/claude-md-helpful-or-expensive-noise/) (Thomas Wiegold, 2026)
- [Simon Willison on MCP tool overhead](https://x.com/simonw/status/2011570719856214153) (2026)
- [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) (Anthropic, 2025)
- [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing) (Anthropic)

<!-- maintainer -->

**Meta:** *Supplementary for AE101. Audience: software-engineer ICs (L0 to L3); Claude Code is floor, so primitives (`/context`, `/clear`, subagents) are used without re-teaching. Answers a customer request for a practitioner treatment of token efficiency: (1) what it is, (2) how to define and measure it, (3) basic moves and shortcuts, (4) the other drivers beyond carried context. ~7 minutes. Reference register: declarative section headers, verb-led move lead-ins.*

**Role:** reframes token efficiency from a cost-thrift topic to a context-quality one (the cost follows). Teaches the craft moves that have independent convergence, and teaches the engineer to distrust the round-number folklore. The compaction reversal is the load-bearing lesson: advice here has a shelf life, so re-check against live `/context`. The "Drivers of inefficient context" section adds a second axis the rest of the page lacks: durable drivers you engineer around (codebase legibility, memory in both directions) versus loud-but-mitigable ones whose fix already shipped (tool/MCP surface, cache invalidation, fan-out). Same craft-vs-folklore spine, one layer down.

**Voice:** Boris-flat for the mechanism, one Rory reframe at the open (cost is a disguise for quality). No Risto over-lift at the close; this is reference, not a high-arc module.

**Closing italic aside is deliberate — do not strip as session-biography.** "Now go clean your window" is a framed authorial wink (the page confessing its own making), same device-family as `lectures/story-of-module-6.md`. The "242,000 tokens" figure is an authorial joke about the page's own authoring session, not a research claim — it owes no source stamp, and the freshness/citation audits should leave it alone. Its job is to make the reader compact or start clean, which is the lesson. If a number must move, keep it a round, large, plainly-self-referential figure; do not chase precision.

**Placement:**
- In the AE101 SPA supplementaries registry (`CR.TRAININGS[agentic-engineering-101].supplementaries` in `site/layouts/curriculum.js`), between "The agent loop" and "How the best do CI/CD." It renders on the index and is in audit scope.
- Still owed before first cohort: a module-side entry point. No module links to it yet. Candidate home: an "if time allows" callout in an M2/M3 module where context discipline first bites.
- Carries additive calc/exploration prompts (the "price the bloat" cost calc), not primitive demonstrations. `/context` is treated as already-known (it lands in M1 and recurs through the exercises); the page reads it as the instrument the engineer holds, not a move to teach. Do not reintroduce "run `/context`" demonstrations here. Prompts are inline `**Prompt**` blocks (draft form); migrate to registry prompts (`curriculum/prompts/<key>.md`) on wiring, the way `the-agent-loop.md` uses `{{prompt:...}}` includes. Approved-prompt key so far: `ae101-token-efficiency-bloat-cost`.

**Quality:** compendium-audited 2026-06-03 (writing@a821067 story@a821067 technical@a821067 behavior@a821067)
- judges @a821067: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy N/A (supplementary reference — no module architecture), strategy N/A (supplementary reference — strategy_tie_in N/A per story judge)

**Visible "Sources" list is deliberate.** A plain end-of-article reading list (linked titles + venue + year, no source-type labels, no evidence-ladder vocabulary) is student-facing end-matter, not a "What research says" callout — it does not violate the no-callout rule, which bans interrupting the prose with audit framing. The `[label]` / L-level taxonomy stays below this divider. Curated to verified URLs only; every entry has a real URL opened against its byline. Do not add a list entry without one. The list and the maintainer stamps must stay in sync.

**Source verification — MUST DO before first cohort.** Evidence base: the token-efficiency OODA sweeps + the token-drivers OODA sweeps (June 2026); run files in `continuous-research/platform-watch/coding-agents/runs/2026-06-03-*token-efficiency*` and `2026-06-03-*token-drivers*` (sweep-1 files carry Sweep-2 correction headers; trust the headers). Numbers and quotes re-verified in Sweep 2; the stamps below marked `due:cohort` are capability claims whose check is a live test, not a URL read.

URLs to open against the original:
- `[checked:2026-06-03 result:OK due:cohort]` https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents — [practitioner direct, vendor venue] — "context rot," "attention budget," "smallest possible set of high-signal tokens." Dated 2025-09-29 (>6mo): cite as the durable definition/origin, not as fresh evidence. fallback: keep "recall drops as the window fills" as the plain mechanism, drop the coined terms.
- `[checked:2026-06-03 result:OK due:2026-12-03]` https://research.trychroma.com/context-rot — [academic/research] — 18 models, recall degrades as input grows, models did better on shuffled than coherent haystacks. Dated 2025-07-14 (>6mo): cite for DIRECTION, not magnitude (imperfect coding proxy; NoLiMa corroborates the direction). fallback: "longer context tends to hurt recall" with no number.
- `[checked:2026-06-03 result:OK due:2026-12-03]` arXiv 2601.16746 "Self-Adaptive Context Pruning for Coding Agents" (SWE-Pruner) — [academic/research] — "23–54% token reduction on agent tasks like SWE-Bench Verified while even improving success rates." The 23–54% is the SWE-Bench range; do NOT conflate with the 14.84x single-turn LongCodeQA figure. Single study, authors' own method. fallback: "trimming context can improve results, not just cut cost" without the range.
- `[checked:2026-06-03 result:OK due:2026-09-03]` https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny — [domain trade publication] — Orosz on Cherny: "Plain glob and grep, driven by the model, beat everything." Attribute as Orosz-on-Cherny if quoted directly; body keeps it as Cherny's stated position. fallback: state the capability ("Claude Code's search is grep and glob, not a vector index"), verifiable live.
- `[checked:2026-06-03 result:OK due:2026-09-03]` https://every.to/source-code (Klaassen, "The Folder Is the Agent," 2026-04-13) — [practitioner direct] — "the folder is the agent." Confirm exact slug/URL on open. fallback: drop the quote, keep "point the agent at files, not pasted text."
- `[checked:2026-06-03 result:OK due:cohort]` https://ampcode.com/news/handoff (2025-10-23) + https://ampcode.com/news/neo (2026-05-06) — [practitioner direct] — the compaction-is-lossy stance and its 2026 reversal. This pair IS the dated-reversal lesson; both dates are load-bearing. fallback: keep the reversal as the lesson even if a specific post moves; it is the shape that matters.
- `[checked:2026-06-03 result:OK due:cohort]` https://platform.claude.com/docs/en/about-claude/pricing — [vendor docs, structural] — Opus 4.x pricing behind the "Put a number on it" figures: $5/MTok input, $0.50/MTok cache read (0.1x), $6.25/MTok 5-min cache write (1.25x). Drives the ~$10 vs ~$2 naive and the ~$1.26 cached difference over 20 turns. Pricing moves, so `due:cohort`. fallback: if prices shift, re-run the calc and update the two prose figures; the lesson (re-sent every turn; caching collapses the gap; dollars are the cheapest line) survives any reprice.

Added for the "Drivers of inefficient context" section (token-drivers sweeps):
- `[checked:2026-06-03 result:OK due:2026-12-03]` arXiv 2601.20404 "On the Impact of AGENTS.md Files on the Efficiency of AI Coding Agents" (Lulla et al., ICSE JAWs 2026) — [academic/research] — paired same-task A/B, 10 repos / 124 PRs: AGENTS.md present vs removed → output tokens −16.58% median, wall-clock −28.64% median, both p<0.05; INPUT/total tokens FLAT (not significant). Body rounds to "about a sixth" / "almost a third" + "input barely moved." This flat-input result is load-bearing — it is why the section says the tax is thrashing+time, NOT reading. fallback: keep "a root map cuts the agent's thrashing and time, not its reading"; drop the fractions.
- `[checked:2026-06-03 result:OK due:cohort]` https://steve-yegge.medium.com/introducing-beads-a-coding-agent-memory-system-637d7d92514a (Yegge, 2025-10-13) — [practitioner direct] — "they have no memory between sessions... It's the movie Memento in real life, or Fifty First Dates." Date is ~8mo (outside the 6-month window): cite as an EVERGREEN ANALOGY / conceptual anchor, not as fresh evidence. The body credit ("Steve Yegge calls it living through Memento") is attribution of a framing, not a time-sensitive claim, so it holds. fallback: drop the Yegge/Memento credit, keep "the agent re-derives each session what it worked out in the last one."
- `[checked:2026-06-03 result:OK due:2026-09-03]` https://thomas-wiegold.com/blog/claude-md-helpful-or-expensive-noise/ (Wiegold, 2026-03-09) — [practitioner direct] — "A bloated 300-line CLAUDE.md can actually make Claude worse at following its own built-in instructions"; the too-much-memory half. (The "150-200 instructions" budget figure in the same post is Wiegold relaying HumanLayer — label [practitioner analysis, second-hand] if ever cited; not used in body.) fallback: keep "an always-loaded memory file is paid every turn"; drop the line count.
- `[checked:2026-06-03 result:OK due:cohort]` https://x.com/simonw/status/2011570719856214153 (Willison, 2026-01-14; x.com 402s the fetcher — corroborated across two search corpora) — [practitioner direct] — MCP token overhead "now that it's solved." Origin/band: Geoffrey Huntley 2025-08-24 (76K/100K usable) and Tim Esler/Atlassian 2026-03-29 (94 tools / 17.6K) — the "93 tools / 55K" figure is Willison RELAYING, not a single measurement; real band ~18K–76K. Body keeps it number-free ("tens of thousands," "contested band"). fallback: "connected tools add per-turn overhead; prune and let the harness defer the rest."
- `[checked:2026-06-03 result:OK due:cohort]` Claude Code GitHub issue #27048 (+ #42338, #51218) — [practitioner direct] — cache bust on edit/resume; measured cache hit 99%→17%, ~91K re-write. ROOT-CAUSED + patched (v2.1.69), so it is a version-specific defect, not a permanent law — body says exactly that. Do NOT cite the "20x on resume" repo headline (unmethodized). fallback: keep "a cache bust makes you re-pay input"; drop the multiple.
- `[checked:2026-06-03 result:CAVEAT due:asap]` https://www.anthropic.com/engineering/multi-agent-research-system (2025-06-13) — [practitioner direct, vendor venue] — "multi-agent systems use about 15× more tokens than chats." DATED (~12mo, outside 6-mo window) + effectively single-source + the SAME post says fan-out is wrong for most coding ("fewer truly parallelizable tasks than research"). Body frames 15x as a research-style ceiling, not a coding default, and flags it as a year old. The "×10x → 150x compounding" is NOT in the primary — do not use. fallback: drop the 15x figure, keep "many parallel agents multiply the bill, and fan-out is the wrong shape for most coding."

Numbers to triple-check: "23 to 54 percent" + "success rate went up" (SWE-Pruner range, not the 14.84x figure); "18 models" (Chroma); "90 percent" (presented AS folklore on purpose, not asserted); "about 10 dollars / 2 dollars / a bit over a dollar" (the bloat-cost calc — re-derive from current Opus pricing; arithmetic: 100K=0.1MTok x $5 x 20 = $10 naive, cached = 1 write at $6.25/MTok + 19 reads at $0.50/MTok). New section: "about a sixth" + "almost a third" (AGENTS.md A/B = −16.58% output / −28.64% wall-clock, input flat); "around fifteen times" (Anthropic multi-agent, dated ~12mo, research-not-coding ceiling).

Do NOT reintroduce two numbers that failed Sweep-2 re-verification: the "caching saves ~81%" figure (vendor blog, arithmetic on a single task) and any specific auto-compaction trigger threshold (e.g. "83.5% / 33K") — Anthropic docs give no number, only "approaching context limits."

Live-test before cohort (capability claims, `due:cohort`): `/context` category breakdown; `/clear` wipes vs `/compact` summarizes; subagent runs in its own window and returns only its summary; `./CLAUDE.md` loads every session; skills load on demand; WebFetch reaches the Anthropic pricing page (live-fetched 2026-06-03, Opus 4.5–4.8 all $5/$25), so the cost-calc prompt's "use the pricing page" instruction is fulfillable, not a phantom fetch. A behavior-class eval flagged "no browser" here; that was a judge hallucination, overturned by the live fetch (see the prompt's behavior instance `risks_overturned`).
