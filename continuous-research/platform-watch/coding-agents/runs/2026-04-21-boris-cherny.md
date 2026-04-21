# Boris Cherny — public output on agentic coding — OODA 2026-04-21

## Who he is
Creator and Head of Claude Code at Anthropic. Ex-Meta Principal Engineer (5 years), author of *Programming TypeScript* (O'Reilly). Writes as an individual builder on X (@bcherny) and Threads (@boris_cherny); personal domain borischerny.com. His public voice is unusual for a platform lead: he posts raw configs, admits "vanilla" setups, and describes his own workflow throughput in PRs/day rather than marketing language. Treat X/podcast-interview Boris as [practitioner direct]; treat Anthropic blog/product announcements co-authored by him as [vendor blog].

## Key sources (his own channels)
- X: https://x.com/bcherny — [practitioner direct]
- Threads: https://www.threads.com/@boris_cherny — [practitioner direct]
- Setup thread (Jan 2026): https://x.com/bcherny/status/2007179832300581177 — [practitioner direct]
- Team tips thread: https://x.com/bcherny/status/2017742741636321619 — [practitioner direct]
- Subagents thread: https://www.threads.com/@boris_cherny/post/DUMZy85EoFj — [practitioner direct]
- RAG-vs-agentic-search reply: https://x.com/bcherny/status/2017824286489383315 — [practitioner direct]
- Claude Code launch post: https://x.com/bcherny/status/1894114714009190463 — [vendor announcement, personal channel]
- Code Review launch: https://x.com/bcherny/status/2031089411820228645 — [vendor announcement, personal channel]
- Lenny's Podcast (Feb 2026): https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens — [practitioner interview]
- Pragmatic Engineer (Gergely Orosz): https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny — [practitioner interview]
- Every / Dan Shipper + Cat Wu: https://every.to/podcast/how-to-use-claude-code-like-the-people-who-built-it — [practitioner interview]
- Peterman Pod: https://www.developing.dev/p/boris-cherny-creator-of-claude-code — [practitioner interview]
- Community mirror of setup tips (not primary): https://howborisusesclaudecode.com — [practitioner analysis]

## His framings on agentic coding (direct quotes + URLs)
- On retrieval architecture: *"Early versions of Claude Code used RAG + a local vector db, but we found pretty quickly that agentic search generally works better. It is also simpler and doesn't have the same issues around security, privacy, staleness, and reliability."* — https://x.com/bcherny/status/2017824286489383315 [practitioner direct]
- On product design philosophy (Every podcast): *"You build a product in a way that's hackable, that's open-ended enough that people can 'abuse it' for other use cases it wasn't really designed for… then you see how people 'abuse it' and then you build for that because you kind of know there's demand for it."* — https://every.to/podcast/how-to-use-claude-code-like-the-people-who-built-it [practitioner interview]
- On the identity shift (Lenny): *"The title software engineer is going to start to go away… it's just going to be replaced by 'builder,' and it's going to be painful for a lot of people."* — https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens [practitioner interview]
- On his own work: 100% of his code authored by Claude Code since Nov 2025; ships 20–30 PRs/day running ~5 parallel instances — same Lenny episode [practitioner interview]

## Long-running / memory / compounding specifically
- Runs ~10–15 concurrent sessions: 5 terminal tabs (each a separate git checkout/worktree), 5–10 browser, plus mobile sessions started in the morning and checked later (Lenny + setup thread).
- Reframes deep work: *"It's not so much about deep work, it's about how good I am at context switching and jumping across multiple different contexts very quickly."* — Lenny interview.
- On CLAUDE.md as live memory: recommends adding to CLAUDE.md *every time* Claude does something incorrectly, so the mistake doesn't repeat — setup thread https://x.com/bcherny/status/2007179832300581177. The Claude Code team checks a single CLAUDE.md into the Claude Code repo with multiple contributions/week.
- Announced built-in git worktree support Feb 20 2026 so parallel agents don't interfere — https://x.com/bcherny/status/2031089411820228645-era posts [vendor announcement].
- Notably: Boris does **not** publicly promote vector memory, long-term memory stores, or graph-RAG for agents. His memory story is files + agentic search. Silence is data.

## Design rationale for Claude Code features
- **Plan mode**: start every complex task in plan mode (shift+tab twice); iterate until the plan is right, then let Claude one-shot the implementation. Rationale: vague prompts force Claude to assume, corrections burn context (setup thread + Lenny).
- **Subagents**: *"Append 'use subagents' to any request where you want Claude to throw more compute at the problem… offload individual tasks to subagents to keep your main agent's context window clean and focused."* — https://www.threads.com/@boris_cherny/post/DUMZy85EoFj. Frames context as *the* fundamental constraint.
- **Vanilla-by-default**: *"My setup might be surprisingly vanilla. Claude Code works great out of the box, so I personally don't customize it much."* — setup thread. Design intent: hackable, not prescriptive.
- **Code Review (multi-agent PR review)**: *"A team of agents runs a deep review on every PR. We built it for ourselves first. Code output per Anthropic engineer is up 200% this year and reviews were the bottleneck."* — https://x.com/bcherny/status/2031089411820228645 [vendor announcement in personal voice].

## What he acknowledges doesn't work / failure modes
- RAG + vector DB for code — abandoned internally (RAG reply above). Rare case of a platform lead publicly killing a pattern the rest of the industry still sells.
- The "40 unwanted changes" failure: without plan mode the agent over-helps and corrections cost context (Lenny + setup thread).
- Honest note on impact: *"painful for a lot of people"* — he does not sugar-coat labor displacement (Lenny).
- **What he's notably silent on**: long-term persistent memory as a feature, multi-agent deliberation/debate runtimes, Cursor/Codex comparisons (he almost never names competitors publicly), enterprise deployment friction, evals/verification infrastructure beyond hooks. The silence on evals is striking given how much his throughput depends on verification loops.

## Curriculum implications — held loose
- **File-based agentic RAG stays canonical for Agents 102.** Boris's own RAG-reply quote is the cleanest public corroboration of the Module 2 "LLM Wiki / files beat retrieval" pattern.
- **Parallel sessions + plan mode = the builder throughput story.** Useful for Engineering Management and Agentic Engineering 101: the leverage is context-switching discipline, not IDE polish.
- **CLAUDE.md as live memory, updated on every correction.** Reinforces M1–M2 framing: the memory design surface is a file, not a vector store.
- **"Builder" identity.** Cherny's language ("builder, not software engineer") converges with Agents 102's "Agent builder" graduate identity — outside corroboration from the platform lead, not marketing.
- **Agentic design over scaffolds.** His "hackable, abuse it, then build for that" maps cleanly onto "trust the agentic design" rule.
- **Silence caveat**: he does not publicly validate multi-agent deliberation (M8 peak) or long-term memory. We are not downstream of his roadmap on those; we teach them because practitioners need them, not because Anthropic has said so.
