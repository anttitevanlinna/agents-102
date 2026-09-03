# The context ceiling and token efficiency: the craft and the folklore

Token efficiency sounds like a cost problem. Use fewer words, pay a smaller bill. That framing is mostly wrong, and the wrong framing is what makes the topic confusing.

The real story is about quality. An agent works inside a context window: the running set of tokens it can see at once. Your system prompt, your `./CLAUDE.md`, the files it read, every tool result, the whole conversation. The window is finite. As it fills, the model gets worse at using what is in it. Chroma named this context rot in 2025, testing it across 18 models and finding the slide happens even on easy tasks, and even far below the window's limit.

So token efficiency is not thrift. It is signal-to-noise. The goal is the smallest set of high-signal tokens that gets the work done. Anthropic's engineering team later folded the finding into their own guidance, and calls the skill context engineering. The cost savings are real, but they are a side effect. A cleaner window is cheaper and smarter at the same time.

The counterintuitive part: a fuller window can produce a worse answer, not just a slower or pricier one. A 2026 study trimmed an agent's context by 23 to 54 percent on a coding benchmark, and its success rate went up.

## What "efficient" actually measures

There is no agreed metric, and you should know that going in. Some people count tokens per task. Some watch cache-hit-rate. Some track cost per pull request. Almost nobody publishes their numbers, so most figures you will read are guesses wearing a lab coat.

What you can read is your own window. `/context` already gives you the breakdown: system prompt, tools, memory files, messages, and free space. The number that matters is not the total. It is the gap between what you loaded and what you actually needed. That gap is the inefficiency, and the rest of this page is about closing it.

## Put a number on it

It helps to see the cost once, in dollars, and then stop worrying about it. In an agent session the whole context is re-sent as input on every turn, so anything you carry is paid again and again across the session.

Ask Claude to price the bloat from current Opus pricing: 100K extra tokens over 20 turns, then what caching does to it.

**Prompt** *(Claude Code)*

```
Use current Opus pricing from the Anthropic pricing page. In an agent session the full context is re-sent as input on every turn.

Work out the dollar cost of carrying an extra 100,000 tokens of context across 20 turns. Then do the same for 20,000 tokens. Show the per-turn cost, the 20-turn total, and the difference.

Then factor in prompt caching and tell me how much the difference shrinks.
```

On Opus, carrying an extra 100K tokens across 20 turns runs about 10 dollars with no caching, against 2 dollars for a lean 20K. That looks like a reason to trim. Then caching lands: turn one pays to write the cache, the next nineteen read it at a tenth of the price, and the gap between fat and lean collapses to a bit over a dollar.

So the dollar cost is the cheapest line on the bill. That is the point. People price the tokens and miss the real tax, which is the model getting worse at a stuffed window. Trim context for the quality, and the money takes care of itself.

## The craft: keep the window clean

Treat these as your defaults. The first two are about what you let in.

**Start clean.** One task per session. When you switch to something unrelated, run `/clear` instead of carrying the old conversation into the new problem. A fresh window is the cheapest quality upgrade there is, and the most skipped. People hoard one long session as if starting another were expensive. It is not.

**Pass paths, not paste.** Do not paste a wall of code into the chat. Point the agent at the files and let it read what it chooses. Kieran Klaassen frames this as "the folder is the agent." Claude Code leans on the same idea: its search is plain grep and glob driven by the model, and Boris Cherny has said that beat a vector index. Pasted text sits in your window forever. A file the agent reads on demand can leave again. The same caution runs the other way: a tool that pulls a whole file or dumps a full log lands in the window and rides every later turn too, so prefer narrow reads and quiet commands.

## The craft: spend and route wisely

The rest are about what you do with the work once it's in front of you.

**Subagent as a firewall.** A noisy investigation (read twenty files, run a few commands, trace a config) doesn't have to land in your own window at all. There is a way to hand it off and get back only the answer, at a price worth knowing before you reach for it.

**Route by complexity, not price.** A mechanical sub-task (rename across files, pull a list, format some output) does not need your strongest model. Send it to a smaller, faster one and keep the heavy model for the reasoning. A cheap model on a hard task is the expensive mistake.

**Keep what you carry lean.** Everything in `./CLAUDE.md` is paid on every turn of every session, because that file (the team-level, PR-reviewed one) loads at the top of each window. Keep it short. Move the rules you only sometimes need into skills, so only their full instructions cost tokens once they fire.

## More rules, worse edits

A rules file has a quality ceiling of its own, and it arrives earlier than the token count suggests. Every rule is a background check the model runs while it works, billed against the same attention that does the work. And rules are checkable where quality is not, so a big enough file quietly turns the goal into rule-passing: edits that would survive an audit and still miss the point.

Neither is fixed by writing better rules. The fix is where the rules live. Keep the always-loaded file down to principles with the why attached (a rule that carries its reason gets absorbed as taste and stops costing attention; a bare prohibition never does). The positive form is also the short one: saying what good looks like usually takes fewer words than the cage of no-statements built around everything you don't, and it steers where no prohibition anticipated. Move the sometimes-rules into skills that load when their work shows up. And put the long checklist where checklists work: in a review pass over the finished work, not in the window while it writes. Checking against fifty rules is what a review is for. Writing against fifty rules is how you get compliance prose.

## The folklore: numbers that don't survive a second look

Token-efficiency advice arrives with confident, round numbers. Most do not hold. Reading them critically is part of the skill.

**"Caching saves you 90 percent."** Prompt caching is real, and the discount on cached input is large. But the headline savings figures almost always trace back to one company's own page or a single run, not a measured bill. Treat any round percentage about cost as folklore until you have seen the method behind it.

**"Compaction is always lossy, so always hand off."** This one was true in 2025. When you compact, the model replaces the conversation with a summary, and summaries lose detail. Sourcegraph's Amp built a feature on that argument, Handoff, and shipped it as the fix. In May 2026 Amp reversed: Handoff was retired, automatic compaction took its place, and the reasoning flipped to the opposite conclusion. The advice did not just soften. It reversed, in months.

That reversal is the real lesson of this whole topic. Every number and rule here has a date. Window sizes grow, models get better at long context, costs move. A move that was craft last quarter can be folklore this quarter. So when you read a tip (including this page), check it against your own `/context` before you trust it.

## Drivers of inefficient context: the durable ones

Carried context is the driver you can watch in `/context`. It is not the only one. The rest fall into two kinds: durable problems you engineer around, and loud problems whose fix already shipped. Telling the two apart saves you from chasing a cure that landed three releases ago. Start with the durable ones.

**The codebase the agent reads.** A messy repo makes the agent hunt for things, and a short map at the root (an `AGENTS.md`, or a lean `./CLAUDE.md`) cuts the hunting. The one controlled test of this in 2026 found that adding the map dropped the agent's output tokens by about a sixth and its wall-clock time by almost a third. The surprise is that input tokens barely moved: the real tax was never the reading, it was the thrashing and the time.

**Thin memory, both directions.** With no written memory, the agent re-derives each session what it already worked out in the last one; Steve Yegge calls it living through Memento. With too much, a bloated `./CLAUDE.md` is paid on every turn, so the file meant to save effort starts charging for it. The 2026 move is not "write it down," it is "watch what you write down."

## Drivers of inefficient context: the loud ones

The other kind is loud but shrinking: it announces itself, and its fix usually already shipped. Check before you chase it.

**The tool and MCP surface.** Every connected tool adds its description to the window every turn, used or not. One popular server was once quoted at tens of thousands of tokens of overhead; lazy tool-loading and caching shrank that so far that Simon Willison, who first raised the alarm, now calls it largely solved. Prune what you never call; let the harness defer the rest.

**Cache invalidation.** Editing something early in the context, or resuming a session, can bust the prompt cache: you re-pay full input price for tokens that were nearly free a moment ago. On a bad day that's been measured at a large multiple of normal cost, but the worst cases are usually version-specific defects a later release patches, so check your version before rebuilding your workflow around it.

## Drivers of inefficient context: fanning out is its own bill

**Fanning out too wide.** A single subagent doing your noisy reading is craft; running many in parallel is a different bill. One widely quoted figure puts multi-agent systems at around fifteen times a plain chat's tokens, but it's a year old, single-source, and its own authors say fan-out is the wrong shape for most coding. Treat it as a ceiling for research-style work, not a default for yours.

## One lever, two payoffs

Token efficiency is one lever with two payoffs: a cleaner window thinks better and costs less. You do not need a dashboard to start. You need `/context`, a habit of starting clean, and a subagent doing your noisy reading. The rest is noticing what you loaded and never used.

## Now go clean your window

*Here is how this page got made, since the making is the lesson. Two research sweeps, eight parallel searches, a pile of fetched sources, and a long stretch of writing and re-writing. Even with subagents doing the noisy reading in their own windows, the first session crossed 242,000 tokens. A guide to travelling light, written from an overpacked car.*

*A second pass came back to extend the drivers section and write the evals. It bloated past 300,000 tokens and started crawling, so it got compacted too. Twice over, on a page about not letting this happen.*

*Which is the point, not the exception. Discipline shrinks the bloat. It does not abolish it. So the session ends the way yours should when it gets heavy: time to compact, or start clean. The cheapest context is the one you just let go of.*

## Sources: quality and craft

- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (Anthropic, 2025)
- [Context rot](https://research.trychroma.com/context-rot) (Chroma, 2025)
- [Self-adaptive context pruning for coding agents](https://arxiv.org/abs/2601.16746) (SWE-Pruner, 2026)
- [Building Claude Code with Boris Cherny](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) (The Pragmatic Engineer, 2026)
- [The folder is the agent](https://every.to/source-code) (Kieran Klaassen, Every, 2026)
- [Compaction and handoff](https://ampcode.com/news/handoff) (Amp, 2025), and [its 2026 reversal](https://ampcode.com/news/neo)

## Sources: cost and other drivers

- [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing) (Anthropic)
- [On the impact of AGENTS.md files on coding-agent efficiency](https://arxiv.org/abs/2601.20404) (2026)
- [Introducing Beads: a coding-agent memory system](https://steve-yegge.medium.com/introducing-beads-a-coding-agent-memory-system-637d7d92514a) (Steve Yegge, 2025)
- [CLAUDE.md: helpful, or expensive noise?](https://thomas-wiegold.com/blog/claude-md-helpful-or-expensive-noise/) (Thomas Wiegold, 2026)
- [Simon Willison on MCP tool overhead](https://x.com/simonw/status/2011570719856214153) (2026)
- [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) (Anthropic, 2025)

<!-- maintainer -->

**Folklore handles are quotes, and quotes do not get trimmed to a word budget.** `check_slides.md` §9 caps a bold handle at roughly five words. The two handles in `## The folklore` are quoted claims being debunked, not labels: shortening *"Compaction is always lossy, so always hand off."* either misquotes the folklore or deletes the very advice the paragraph goes on to show reversing. §9's harm is an emphasis budget spent on decoration; a claim under examination is not decoration. Future judges should score §9 N/A on that section rather than propose a trim.

**Meta:** *Supplementary for AE101. Audience: software-engineer ICs (L0 to L3); Claude Code is floor, so primitives (`/context`, `/clear`, subagents) are used without re-teaching. Answers a customer request for a practitioner treatment of token efficiency: (1) what it is, (2) how to define and measure it, (3) basic moves and shortcuts, (4) the other drivers beyond carried context. ~7 minutes. Reference register: declarative section headers, verb-led move lead-ins.*

**Role:** reframes token efficiency from a cost-thrift topic to a context-quality one (the cost follows). Teaches the craft moves that have independent convergence, and teaches the engineer to distrust the round-number folklore. The "More rules, worse edits" section carries the rule-load ceiling (theory-plan.md §3, candidate law): rule-count degrades generation via attention tax + rule-passing-as-target, and the architectural cure is routing — principles always-on, sometimes-rules in skills, the long checklist in a review pass. Deliberately number-free and vision-grade; the external instruction-count research is unverified, so no figure ships until it passes `check_research_claims §11`. The compaction reversal is the load-bearing lesson: advice here has a shelf life, so re-check against live `/context`. The "Drivers of inefficient context" section adds a second axis the rest of the page lacks: durable drivers you engineer around (codebase legibility, memory in both directions) versus loud-but-mitigable ones whose fix already shipped (tool/MCP surface, cache invalidation, fan-out). Same craft-vs-folklore spine, one layer down.

**Voice:** Boris-flat for the mechanism, one Rory reframe at the open (cost is a disguise for quality). No Risto over-lift at the close; this is reference, not a high-arc module.

**Closing italic aside is deliberate — do not strip as session-biography.** Framed authorial wink, same device-family as `lectures/story-of-module-6.md`. The "242,000" / "300,000 tokens" figures are jokes about the page's own two authoring sessions, not research claims: no source stamp, freshness/citation audits skip them. Keep any such figure round, large, self-referential; don't chase precision.

**Placement:**
- In the AE101 SPA supplementaries registry (`CR.TRAININGS[agentic-engineering-101].supplementaries` in `site/layouts/curriculum.js`), between "The agent loop" and "How the best do CI/CD." It renders on the index and is in audit scope.
- Entry points: M2 close (final slide of `how-instructions-grow.md`), M3 module close (`earn-the-trust.md`), M4 prework (`run-the-first-experiment.md`).
- Carries additive calc/exploration prompts (the "price the bloat" cost calc), not primitive demonstrations. `/context` is treated as already-known (it lands in M1 and recurs through the exercises); the page reads it as the instrument the engineer holds, not a move to teach. Do not reintroduce "run `/context`" demonstrations here. Prompts are inline `**Prompt**` blocks (draft form); migrate to registry prompts (`curriculum/prompts/<key>.md`) on wiring, the way `the-agent-loop.md` uses `{{prompt:...}}` includes. Approved-prompt key so far: `ae101-token-efficiency-bloat-cost`.

**Quality:** compendium-audited 2026-09-03 (writing@43e6cae1 story@e11bbeb4 technical@8cc00874 behavior@b3143a4 pedagogy@b55cd28b strategy@aa1f7826 slides@43e6cae1)
- judges @aa1f7826: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS (1 todo see instances/ae101--supplementary--the-context-ceiling.strategy.json), slides PASS

**Visible "Sources" list is deliberate.** Linked titles + venue + year (no source-type labels, no ladder vocabulary) = student-facing end-matter, not a "What research says" callout; the no-callout rule bans audit framing inside the prose, not a reading list. Curated to verified URLs only — every entry opened against its byline. Keep the list and the maintainer stamps in sync.

<!-- backing -->

Claims
- `context-rot-and-attention-budget` · detail · "a fuller window can produce a worse answer, not just a slower or pricier one" ← anthropic-context-engineering, chroma-context-rot
- `pricing-arithmetic` · detail · "carrying an extra 100K tokens across 20 turns runs about 10 dollars with no caching, against 2 dollars for a lean 20K" ← anthropic-pricing
- `start-clean-one-task-per-session` · vision · "**Start clean.** One task per session." ← none-owed
- `pass-paths-not-paste` · detail · "Point the agent at the files and let it read what it chooses." ← klaassen-folder-is-the-agent, orosz-cherny
- `subagent-as-a-firewall` · vision · "A noisy investigation … doesn't have to land in your own window at all." ← none-owed
- `route-by-complexity-not-price` · vision · "A mechanical sub-task … does not need your strongest model." ← none-owed
- `keep-what-you-carry-lean` · detail · "Everything in `./CLAUDE.md` is paid on every turn of every session" ← wiegold-claude-md, lulla-agents-md
- `rules-become-the-target` · vision · "rules are checkable where quality is not, so a big enough file quietly turns the goal into rule-passing" ← none-owed
- `rulebook-lives-in-review` · vision · "put the long checklist where checklists work: in a review pass over the finished work, not in the window while it writes" ← none-owed
- `caching-savings-folklore` · detail · "**\"Caching saves you 90 percent.\"**" ← anthropic-pricing
- `compaction-folklore-reversed` · detail · "**\"Compaction is always lossy, so always hand off.\"** This one was true in 2025." ← amp-handoff-neo
- `messy-repo-costs-tokens` · detail · "a short map at the root (an `AGENTS.md`, or a lean `./CLAUDE.md`)" ← lulla-agents-md
- `thin-memory-both-directions` · detail · "Steve Yegge calls it living through Memento" ← yegge-beads, wiegold-claude-md
- `mcp-surface-costs-every-turn` · detail · "Every connected tool adds its description to the window every turn, used or not." ← willison-mcp-overhead
- `cache-invalidation-costs-real-money` · detail · "Editing something early in the context, or resuming a session, can bust the prompt cache" ← cc-cache-bust-issues
- `fanning-out-is-its-own-bill` · detail · "running many in parallel is a different bill" ← anthropic-multi-agent
- `pruning-can-improve-results` · detail · "trimmed an agent's context by 23 to 54 percent on a coding benchmark, and its success rate went up" ← swe-pruner

Sources
- anthropic-context-engineering `[checked:2026-06-03 result:CAVEAT due:none]` https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents — [practitioner direct, vendor venue] *"context rot"*, *"attention budget"*, *"smallest possible set of high-signal tokens."* CAVEAT twice over: pub 2025-09-29, outside the window, and the model vendor writing about its own models — authoritative that the terms are in use, worthless as independent corroboration. `due:none` for the origin-of-a-phrasing job only — a published sentence does not expire: **cite as the durable definition and origin, never as fresh evidence.** fallback: keep "recall drops as the window fills" as the plain mechanism, drop the coined terms.
- chroma-context-rot `[checked:2026-06-03 result:OK due:2026-01-14]` https://research.trychroma.com/context-rot — [academic/research] 18 models; recall degrades as input grows, and models did better on shuffled than coherent haystacks. Pub 2025-07-14; due is publication+6mo and is past — outside the window, so **cite as the dated study, for DIRECTION, not magnitude** — imperfect coding proxy, with NoLiMa corroborating the direction. fallback: "longer context tends to hurt recall" with no number.
- swe-pruner `[checked:2026-06-03 result:OK due:2026-07-23]` https://arxiv.org/abs/2601.16746 *Self-Adaptive Context Pruning for Coding Agents* (SWE-Pruner) — [academic/research] *"23–54% token reduction on agent tasks like SWE-Bench Verified while even improving success rates."* **The 23–54% is the SWE-Bench range; do NOT conflate it with the 14.84x single-turn LongCodeQA figure.** Single study, authors' own method. due = arxiv v1 (2026-01-23)+6mo. fallback: "trimming context can improve results, not just cut cost" without the range.
- orosz-cherny `[checked:2026-06-03 result:OK due:2026-09-04]` https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny — [practitioner analysis] Orosz on Cherny, pub 2026-03-04 (due is publication+6mo; label and due inherited from the continuous-research stamp): *"Plain glob and grep, driven by the model, beat everything."* Attribute as Orosz-on-Cherny if quoted directly; body keeps it as Cherny's stated position. fallback: state the capability — Claude Code's search is grep and glob, not a vector index — which is verifiable live.
- klaassen-folder-is-the-agent `[checked:2026-06-03 result:OK due:2026-09-03]` https://every.to/source-code — [practitioner direct] Klaassen, *The Folder Is the Agent*, 2026-04-13. Confirm the exact slug on open. fallback: drop the quote, keep "point the agent at files, not pasted text."
- amp-handoff-neo `[checked:2026-06-03 result:OK due:none]` https://ampcode.com/news/handoff (2025-10-23) + https://ampcode.com/news/neo (2026-05-06) — [practitioner direct, vendor venue] The compaction-is-lossy stance and its 2026 reversal. **This pair IS the dated-reversal lesson and both dates are load-bearing** — the section teaches folklore by showing a belief that was true and stopped being true, so a stamp that quietly updated to the current position would delete the lesson. Durable account, `due:none` (`source-freshness-format.md` § Durable-account variant): two dated completed events cited as history, never current behaviour — matches `what-packaging-is.md` amp-handoff/amp-neo. fallback: keep the reversal as the lesson even if a specific post moves; the shape is what matters.
- anthropic-pricing `[checked:2026-06-03 result:OK due:cohort]` https://platform.claude.com/docs/en/about-claude/pricing — [vendor docs, structural] Opus 4.x pricing behind the "Put a number on it" figures: $5/MTok input, $0.50/MTok cache read (0.1x), $6.25/MTok five-minute cache write (1.25x). Drives the ~$10 versus ~$2 naive comparison and the ~$1.26 cached difference over 20 turns. Pricing moves, hence `due:cohort`. fallback: if prices shift, re-run the calculation and update the two prose figures; the lesson survives the numbers.
- lulla-agents-md `[checked:2026-06-03 result:OK due:2026-07-28]` https://arxiv.org/abs/2601.20404 *On the Impact of AGENTS.md Files on the Efficiency of AI Coding Agents* (Lulla et al., ICSE JAWs 2026) — [academic/research] Paired same-task A/B, 10 repos and 124 PRs: with AGENTS.md versus removed, output tokens −16.58% median, wall-clock −28.64% median, both p<0.05; **input and total tokens FLAT, not significant.** Body rounds to "about a sixth" and "almost a third" plus "input barely moved." **The flat-input result is load-bearing** — it is why the section says what it says, and dropping it would turn a precise finding into a vague endorsement of context files. due = arxiv v1 (2026-01-28)+6mo. fallback: keep the direction, drop the percentages.
- yegge-beads `[checked:2026-06-03 result:OK due:none]` https://steve-yegge.medium.com/introducing-beads-a-coding-agent-memory-system-637d7d92514a — [practitioner direct] Yegge, 2025-10-13: *"they have no memory between sessions… It's the movie Memento in real life, or Fifty First Dates."* **Cited as an evergreen analogy and conceptual anchor, never as fresh evidence** — the body credit ("Steve Yegge calls it living through Memento") attributes a framing, not a time-sensitive claim, which is why `due:none` is right rather than the old `due:cohort`. fallback: keep the amnesia point, drop the name.
- wiegold-claude-md `[checked:2026-06-03 result:OK due:2026-09-03]` https://thomas-wiegold.com/blog/claude-md-helpful-or-expensive-noise/ — [practitioner direct] Wiegold, 2026-03-09: *"A bloated 300-line CLAUDE.md can actually make Claude worse at following its own built-in instructions"* — the too-much-memory half. **The "150-200 instructions" budget figure in the same post is Wiegold relaying HumanLayer; label it [practitioner analysis, second-hand] if it is ever cited. Not used in body, and it should stay that way.** fallback: keep "an always-loaded memory file is paid every turn", drop the line count.
- willison-mcp-overhead `[checked:2026-06-03 result:OK due:cohort]` https://x.com/simonw/status/2011570719856214153 — [practitioner direct] Willison, 2026-01-14; x.com 402s the fetcher, corroborated across two search corpora. MCP token overhead "now that it's solved." **Origin and band: Huntley 2025-08-24 (76K of 100K usable) and Esler/Atlassian 2026-03-29 (94 tools / 17.6K). The "93 tools / 55K" figure is Willison RELAYING, not a single measurement; the real band is roughly 18K–76K.** Body keeps it number-free ("tens of thousands", "contested"), which is the correct treatment of a range this wide. fallback: keep it number-free.
- cc-cache-bust-issues `[checked:2026-06-03 result:OK due:cohort]` Claude Code GitHub issue #27048 (plus #42338, #51218) — [practitioner direct] Cache bust on edit and resume; measured cache hit 99% → 17%, roughly 91K re-write. **Root-caused and patched in v2.1.69, so this is a version-specific defect rather than a permanent law, and the body says exactly that.** Do NOT cite the "20x on resume" repo headline — unmethodized. fallback: keep "a cache bust makes you re-pay input", drop the multiple.
- anthropic-multi-agent `[checked:2026-07-02 result:CAVEAT due:2025-12-13]` https://www.anthropic.com/engineering/multi-agent-research-system — [practitioner direct, vendor venue] 2025-06-13 (due = pub+6mo, past — dated roughly twelve months, outside the window, effectively single-source): *"multi-agent systems use about 15× more tokens than chats."* Re-verified live 2026-07-02, both the 15× quote and *"fewer truly parallelizable tasks than research"* verbatim on page. Dated roughly twelve months, outside the window, and effectively single-source. **The same post says fan-out is wrong for most coding work, which is why the body cites it against enthusiasm rather than for it** — the strongest version of a source is the one that argues against the reader's instinct. fallback: keep "fanning out costs multiples", drop the 15×.

Frameworks
- Context as a bandwidth-limited channel · [borrow:information theory] · law:bandwidth-limited-channel · ← anthropic-context-engineering, chroma-context-rot
- Attention budget · [borrow:none] · law:none · ← anthropic-context-engineering — Anthropic's coinage, credited
- Memento as the amnesia analogy · [borrow:none] · law:none · ← yegge-beads
- Absorption bottleneck · [borrow:none] · law:absorption-bottleneck · ← none — the craft half is buying back your own window

Stance `[stance:2026-08-01 level:L2]`
- holds: that recall degrades as the window fills, that a lean always-loaded memory file is cheaper than a fat one, and that fan-out multiplies cost. Two academic studies and several named practitioners, which is L2 and is what the page claims.
- contested: **almost every number, and the page is built around saying so.** Its second half is a folklore section that exists to kill numbers rather than repeat them: the 90%-caching headline, the always-hand-off rule that reversed, the MCP overhead figure that turns out to be a relay across an 18K–76K band. **This is the most epistemically careful file in the corpus, and it got that way by treating its own citations as suspects.**
- would-move-it: replication of the AGENTS.md result on other agents, which would move the flat-input finding from one study to a pattern. New pricing invalidates the arithmetic and nothing else.

OODA
- question: has the AGENTS.md flat-input result replicated, has the MCP overhead band narrowed to a real measurement, and does the 15× fan-out figure have a non-vendor equivalent?
- roster: Chroma research, the SWE-Pruner and ICSE JAWs authors, Simon Willison, Geoffrey Huntley, Thomas Wiegold, Steve Yegge, the Claude Code issue tracker
- last-run: 2026-08-01

<!-- /backing -->
