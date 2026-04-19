# Multi-Agent Systems

## Big Idea
Hire three agents to search. Three more to decide. The filesystem is the meeting room.

## Meta
- **Primary Bloom's level:** Create
- **Prework:** [Before Module 3](exercises/module-3-prework.md) — five practitioners automating their life with Claude Code and OpenClaw (pick three, read one piece each); a plain-language primer on Claude Code's subagent architecture (what it is, how to launch one, what you'll see)
- **Homework:** selected "What is an Agent" sections (multi-agent coordination)
- **Materials (trainer):** no scaffold zip. The module runs on the Module 2 state (brain, sources, working directory). All agent files are produced by prompts the student pastes — same pattern as Module 2's custom-agent move. Trainer brings: the four prompts (three retrievers + synthesizer) and the framework-prompted strategic question, visible on the site.
- **Plug points:** the participant's three source zones (Confluence or equivalent wiki, Office365 or equivalent collab suite, curated internet); the framework the synthesizer uses; any fourth subagent persona the student wants to add

## What You'll Learn
After this module, you will be able to:
- **Design** a multi-agent pipeline in two shapes: parallel sessions on shared files (retrieval) and subagents inside one session (synthesis)
- **Build** three retrieval agents, each speaking its own source's dialect, and a synthesizer that orchestrates three subagent personas
- **Analyze** handoff failure modes — where conflicts get papered over, dialects clash, the synthesizer averages to beige
- **Create** a framework-guided answer to a real strategic question about the student's own challenge
- **Evaluate** when splitting earns its keep, when separate sessions beat subagents, and when one good agent with a good prompt wins

## Connections
Last module you were the librarian. You searched Confluence, pulled from OneDrive, chased down practitioner articles — by hand. Today you hire three agents to do that search, and three more to decide what it means. One of them is Rory. What do you expect will get lost between them?

## Lectures

[Lecture: When to split an agent (and how)](lectures/when-to-split-an-agent.md)

## Exercises

[Exercise: Three retrievers, three minds](exercises/three-retrievers-three-minds.md)

## Key Concepts (Emergent)
- **Two multi-agent shapes in Claude Code.** Separate sessions on shared files (what you feel in Phase 1 — three windows churning, artifacts landing in shared folders). Subagents inside one session (what you build in Phase 2 — the native Claude Code primitive). Same idea, different surfaces. The filesystem is the meeting room in both.
- **Splitting earns its keep when the agents genuinely can't be one.** Different source access, different dialect, different stance. Faking multi-agent with one prompt is the tell that you didn't need to split.
- **Seams are where it fails.** Conflicts get dropped, dialects clash, the synthesizer averages everything into beige. Where the pieces meet is where the lesson lives.
- **Three stances beat one summarizer.** The synthesizer's three subagents — a backward-from-end planner, a *what-would-have-to-be-true* experimentator (Roger Martin), and a counterintuitive reframer (the Rory seat) — each interrogate the retrieved material from a stance one agent won't hold at once. The main session makes the call.
- **Frameworks are the synthesizer's spine.** Without one it summarises. With Rumelt's kernel / strategy-as-assumptions / JTBD / principle-of-least-privilege, it decides.

## Plug Points

> PLUG POINT: The three source zones the retrievers cover.
> Default: Confluence / Office365 / curated internet (the same three the student curated in Module 2). Swap Confluence for Notion/SharePoint wiki/Guru; swap Office365 for Google Workspace. The pattern holds; the tools vary.

> PLUG POINT: The framework the synthesizer uses.
> Default: Rumelt's strategy kernel (diagnosis → guiding policy → coherent actions). Alternatives by challenge type: StoryBrand for positioning challenges, Jobs-to-be-Done for product/feature decisions, principle of least privilege for security/access decisions.

> PLUG POINT: The three synthesizer stances.
> Default: backward-from-end planner, Martin's *what-would-have-to-be-true* experimentator, counterintuitive reframer (the Rory seat). Students can swap the Rory seat for another sharp stance if one fits their challenge better — e.g., a premortem voice (Kahneman/Klein) for risk-heavy challenges, a JTBD interviewer voice for customer-facing ones. Keep three; keep them genuinely different.

## Debrief
Five-minute retro with Claude. Three questions, tuned to this module's deliberate unease:
1. Where does the synthesized answer feel *almost* right but not quite? Name the shape of the doubt, not a specific fix.
2. Which of the three stances (planner / experimentator / reframer) are you most tempted to trust — and is that trust earned, or just the one that sounded the most confident?
3. If you had to hand this answer to your CEO tomorrow, which one sentence would you rewrite first, and which would you leave exactly as it is?

The artifact: `module-3/wonder.md` — the student's honest note of what feels off in their own synthesized answer. Not a fix, not a coordination rule yet. A held question. Module 5 picks it up.

## Bridge
You just built something that works across three systems. Which means it just gained access to three systems. What's the worst thing it could do with that?

<!-- maintainer -->

**TODO:** Pass 2 exercise + lecture drafts. **No scaffold zip** — agent files emerge from the student's prompts during the exercise (same pattern as Module 2's custom-agent move). The four prompts (three retrievers + synthesizer with three subagent stances) are the artifacts to get right in Pass 2. Shared handoff file shape can be established inside the prompt text (e.g., "write your findings to `module-3/retrievals/<source>.md`"); doesn't need to be pre-created.

**Capability check owed:** verify (via `claude-code-guide`) (a) how subagents are invoked in current Claude Code desktop — slash command, inline prompt, agent definition file; (b) whether multiple concurrent Claude Code sessions on the same working directory behave as expected (each session reads the same `CLAUDE.md`, writes land in the shared filesystem, no lock contention on small markdown files). Both are structural to the exercise; stale assumptions = broken training day.

**Frameworks riffed on:**
- Rumelt's strategy kernel (default synthesizer spine) — the crux skill in Module 2's Debrief previews this
- Roger Martin's *what-would-have-to-be-true* assumption test (the experimentator stance) — also threaded through the curriculum's throughlines (see lecture-guardrails → Strategy as assumptions)
- Rory Sutherland's behavioural-economics counterintuitive reframe (the reframer stance) — named explicitly; the Rory seat
- Anthropic's multi-agent warning — only a few situations where splitting wins; this exercise is engineered to be one of them

**Watch-fors (deferred to facilitator notes pass):**
- Phase 1: opening 3+1 Claude Code sessions on the same directory is the single highest-friction step — pre-flight check with the room before turning them loose; name which window is which
- Retrievers return non-comparable outputs by design; student may try to "normalise" them — that's exactly what the synthesizer is for
- Synthesizer left un-prompted will average to beige; prompt must force "show me where these disagree" before the summary
- Phase 2: subagent invocation is new for most participants; demo once, then let them drive
- Rory seat is a live moral hazard — easy for the student to write a "be witty" prompt that produces dad jokes. Coach toward Sutherland's actual move: *reframe the problem, question the obvious take, steal an analogy from an unrelated field.* Wit is a byproduct, not the instruction.
