# Multi-Agent Systems

## Big Idea
Hire three agents to search. Three more to decide. The filesystem is the meeting room.

## Prework

[Before Module 3](exercises/module-3-prework.md). Five practitioners automating their life with Claude Code and OpenClaw (pick three, read one piece each). Plus a plain-language primer on how Claude Code launches helper agents (sometimes called <span class="rt-code">subagents</span><span class="rt-cowork">agents</span>): what they are, how to start one, what you'll see.

## What You'll Learn
After this module, you will be able to:
- **Design** a multi-agent setup in two shapes: parallel sessions on shared files (retrieval) and subagents inside one session (synthesis)
- **Build** three retrieval agents, each speaking its own source's dialect, and a synthesizer that coordinates three <span class="rt-code">subagent</span><span class="rt-cowork">agent</span> personas
- **Analyze** handoff failure modes (where conflicts get papered over, dialects clash, the synthesizer averages to beige)
- **Create** a framework-guided answer to a real strategic question about your own challenge
- **Evaluate** when splitting earns its keep, when separate sessions beat subagents, and when one good agent with a good prompt wins

## Start here
Last module you were the librarian. You searched Confluence, pulled from OneDrive, chased down practitioner articles (by hand). Today you hire three agents to do that search, and three more to decide what it means. What do you expect will get lost between them?

[Exercise: Name your crux](exercises/name-your-crux.md)

[Exercise: Three retrievers, three minds](exercises/three-retrievers-three-minds.md)

[Lecture: When to split an agent (and how)](lectures/when-to-split-an-agent.md)

## Key Concepts
- **Two multi-agent shapes in Claude Code.** Separate sessions on shared files (Phase 1: long-running, independent, visible). <span class="rt-code">Subagents</span><span class="rt-cowork">Agents</span> inside one session (Phase 2: quick parallel thinking, bounded return). Different shapes, different territories — the lecture draws the line.
- **Splitting earns its keep when the agents genuinely can't be one.** Different source access, different dialect, different stance. Faking multi-agent with one prompt is the tell that you didn't need to split.
- **Seams are where it fails.** Conflicts get dropped, dialects clash, the synthesizer averages everything into beige. Where the pieces meet is where the lesson lives.
- **Three stances beat one summarizer.** Three <span class="rt-code">subagents</span><span class="rt-cowork">agents</span> (a backward-from-end planner, a *what-would-have-to-be-true* experimenter, and a counterintuitive reframer, the Rory seat) each interrogate the retrieved material from a different angle — harder to do well in one head, in one pass. A fourth <span class="rt-code">subagent</span><span class="rt-cowork">agent</span>, the synthesizer, combines them.
- **Frameworks are the synthesizer's spine.** Without one, it tends to summarise. With a framework (a strategy kernel by default), it picks.

## Debrief

Five minutes. Claude reviews the session and sharpens the rules that govern how your agents divide the work. The evidence is what you just produced: the four agent prompts, the retrieval files, the synthesizer's briefing, the conversation. Claude reviews, rewrites the training-dir root rules file (`./CLAUDE.md`) in place, reports what changed. You push back on anything that's off.

**Prompt** *(Claude Code)*

```
Review this session and update the rules. Read CLAUDE.md at the root, then scan what we just produced: agents/, sources/, module-3/. Look back over the session: where did agents step on each other, where did context get dropped at a handoff, where did one retriever's dialect leak into the synthesizer, where did the three stances collapse into a single voice, where did one agent need to be two (or two to be one)?

Then rewrite CLAUDE.md. Integrate, don't append. Sharpen the rules that govern division of work and handoff shape: what each agent is for, what it writes to, what it does NOT do. Add what's missing, remove what turned out wrong. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why, grounded in specific moments from the session. Name at least one handoff seam where the rules wobbled.
```


Read Claude's summary. Push back where it's wrong. *"No, the planner and the reframer really did need to be separate."* *"You missed where the Confluence retriever kept normalising before writing."* The unease you feel about the synthesized briefing is not something to close today. It stays. The artifact lands at `module-3/wonder.md`: one line naming what feels off. Not a fix. A held question.

## Next
You just built something that works across three systems. Which means it just gained access to three systems. What's the worst thing it could do with that?

## Homework after Module 3

**Reading.** Selected sections from [What is an Agent](supplementary/what-is-an-agent.md) (multi-agent coordination).

**Optional move: pressure-test the memory.** If you've added much to `sources/` this module, run this between modules to let the new evidence pressure-test the memory's shape. Skip if memory's still serving you.

**Prompt** *(Claude Code)*

```
Look at memory/ and sources/ against this module's fresh retrievals. Check overall health: coverage gaps the retrievers exposed, pages now stale, structure still serving the challenge. Restructure if deemed needed (rename, merge, split, drop). Show me what you'd do before changing files.
```

Memory is a working artefact, sharpened by what it bumps into.

<!-- maintainer -->

**Quality:** draft 2026-04-29 (compendium audit run 2026-04-29 returned APPROVE-WITH-TODOS — runtime-fork pass applied; mood/LO/banned-word pass; not yet sim-passed or mechanical-tested)

**Module time (trainer):** ≈ 70 min total. Setup + Crux opener ~6 min, three-retrievers main exercise 50 min, *When to split* lecture 8–10 min, Debrief ~5 min. The exercise's own "50 min" label is exercise-only; don't schedule the whole module against that number.

**Plug Points (trainer):**

> PLUG POINT: The three source zones the retrievers cover.
> Default: wiki / docs / curated internet — the retrievers ask the student inline which specific tools they use (Confluence / Notion / SharePoint wiki / Guru for wiki; OneDrive / SharePoint / Google Drive for docs). Prompt language is permissive by design — no trainer swap required; the pattern holds across toolchains.

> PLUG POINT: The framework the synthesizer uses.
> Default: Rumelt's strategy kernel (diagnosis → guiding policy → coherent actions). Alternatives by challenge type: StoryBrand for positioning challenges, Jobs-to-be-Done for product/feature decisions, principle of least privilege for security/access decisions.

> PLUG POINT: The three synthesizer stances.
> Default: backward-from-end planner, Martin's *what-would-have-to-be-true* experimenter, counterintuitive reframer (the Rory seat). Students can swap the Rory seat for another sharp stance if one fits their challenge better — e.g., a premortem voice (Kahneman/Klein) for risk-heavy challenges, a JTBD interviewer voice for customer-facing ones. Keep three; keep them genuinely different.

**Capability check status:** confirmed (per `three-retrievers-three-minds.md` § *Capability notes (confirmed)*). Multi-window / multi-session on the same working directory works on CLI (four terminal windows) and desktop (four sessions); 3 concurrent Cowork tasks on the same connected folder confirmed running 2026-04-29 (Antti); subagent launch phrasing in Phase 2 (*"spawn three subagents in parallel"*) confirmed working in current Claude Code. Re-verify only if Claude Code's session-isolation or subagent-spawn semantics change.

**Frameworks riffed on:**
- Rumelt's strategy kernel (default synthesizer spine) — M3's opening *Name your crux* exercise produces the diagnosis seed; the synthesizer's Rumelt prompt builds the policy and actions on top of it
- Roger Martin's *what-would-have-to-be-true* assumption test (the experimenter stance) — also threaded through the curriculum's throughlines (see lecture-guardrails → Strategy as assumptions)
- Rory Sutherland's behavioural-economics counterintuitive reframe (the reframer stance) — named explicitly; the Rory seat
- One-agent-per-recurring-workflow (Bosser stance) — many agents across workflows, usually one within. M3 deliberately puts the student inside the rare within-workflow case where access + dialect + stance force splitting; the lecture closes with the across-workflow rule

**Watch-fors (deferred to facilitator notes pass):**
- Phase 1: starting 3+1 Claude Code sessions on the same directory is the single highest-friction step — pre-flight check with the room before turning them loose; name which session is which
- Retrievers return non-comparable outputs by design; student may try to "normalise" them — that's exactly what the synthesizer is for
- Synthesizer left un-prompted will average to beige; prompt must force "show me where these disagree" before the summary
- Phase 2: subagent invocation is new for most participants; demo once, then let them drive
- Rory seat is a live moral hazard — easy for the student to write a "be witty" prompt that produces dad jokes. Coach toward Sutherland's actual move: *reframe the problem, question the obvious take, steal an analogy from an unrelated field.* Wit is a byproduct, not the instruction.
