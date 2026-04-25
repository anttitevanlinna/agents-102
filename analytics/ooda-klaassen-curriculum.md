# Blind OODA — Kieran Klaassen's 6-Module Agentic Engineering Curriculum (as of 2026-04-24)

## Method
Followed the person, not the topic. Pulled Klaassen's own writing (Every.to's Source Code + Chain of Thought), his GitHub (`EveryInc/compound-engineering-plugin`), his recent podcast appearances (This New Way Oct 2025, Behind the Craft Feb 2026, Lenny/Peter Yang Apr 2026), and two independent practitioner analyses (Will Larson at Imprint; Aniket Panjwani). Then inverted what he *emphasises* and *repeats* into module shape. Prior local OODA runs in `continuous-research/platform-watch/coding-agents/` did the citation spadework; this run synthesises into curriculum form.

## The 6 Modules (my read)

### M1: The Four-Step Loop — Plan, Work, Review, Compound
**Big idea:** Engineering is no longer "write code then review" — it's a loop where the agent plans, executes, reviews itself, and writes the lesson back so the next loop starts smarter.
**Evidence:**
- "Each unit of engineering work should make subsequent units easier — not harder." — [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide) [practitioner direct]
- The four-step frame (Plan → Work → Review → Compound) is the through-line of every Klaassen appearance in the last 6 months. [Compound Engineering: How Every Codes With Agents](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents) [practitioner direct]
- Codified as invokable commands: [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) [practitioner direct]

### M2: The 80/20 Inversion — Planning and Review Are the Job
**Big idea:** If you're spending most of your time typing code, you're doing it wrong; Klaassen's ratio is 80% planning and review, 20% execution — the LLM does the middle, you do the ends.
**Evidence:**
- "You're the bread in the AI sandwich" — humans frame and taste-check; the model is the filling. [You're the Bread in the AI Sandwich](https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich) [practitioner direct]
- "LLMs are very good at just following steps, doing deep work, working for hours or days" — humans supply the diagnostic flexibility and point of view. Same source. [practitioner direct]
- The 80/20 ratio is stated verbatim in the Definitive Guide. [practitioner direct]

### M3: Plan-as-Artifact — The Markdown File Is the Contract
**Big idea:** Before any agent writes code, produce a markdown plan detailed enough that a human or another agent could execute it without asking a question; the plan is the shared context, not scratch.
**Evidence:**
- Plan output is "a markdown file with data models, file references, architectural decisions" — Definitive Guide [practitioner direct]
- Parallel sub-agents research codebase, framework versions, and best practices *before* the plan is written. Same source. [practitioner direct]
- Will Larson's Imprint adoption: the plan-as-artifact was the step that survived contact with a real monorepo. [Learning from Every's Compound Engineering](https://lethain.com/everyinc-compound-engineering/) [practitioner analysis]
- Tests are written *from the plan* — testability is a planning output, not a post-hoc add-on. [practitioner direct, Definitive Guide]

### M4: Parallel Reviewer Agents — Fourteen Readers, Not One
**Big idea:** One reviewer is a bottleneck and a single point of taste; fan out specialised reviewers (security, performance, architecture, style, accessibility…) in parallel over every PR, then triage.
**Evidence:**
- "14-agent parallel review" with per-concern specialisation. [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide) [practitioner direct]
- "My AI had already fixed the code before I saw it" — Klaassen walks through iterating prompts until tests pass 10 consecutive runs, treating verifier reliability as a measurable property. [every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) [practitioner direct]
- Per-feedback agents: one dedicated agent per reviewer comment. Ten issues resolved in the time one used to take. [practitioner direct, Definitive Guide]

### M5: The Compound Step — Writing Learnings Back Into CLAUDE.md / AGENTS.md
**Big idea:** The difference between "I used an agent today" and "my codebase compounds" is one file — after every loop, capture the preference, bug-pattern, or architectural rule into CLAUDE.md / AGENTS.md / skill files so the next session starts there.
**Evidence:**
- "The special file Claude pulls in for context before each conversation." [My AI Had Already Fixed the Code](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) [practitioner direct]
- Larson names this as the load-bearing novel step — "the one pattern many practitioners have intuited but have not found a consistent mechanism to implement." [lethain.com](https://lethain.com/everyinc-compound-engineering/) [practitioner analysis]
- Convergent independent naming — self-improving CLAUDE.md (Alderson), learnings.md (MindStudio), Ralph pattern (Huntley), Bugbot learned rules (Cursor). [multiple practitioner direct, see cross-reference OODA run]
- Klaassen on [Behind the Craft, Feb 2026](https://podcasts.apple.com/ky/podcast/how-to-make-claude-code-better-every-time-you-use-it/id1736359687?i=1000748776547): "How to make Claude Code better every time you use it" — the episode title *is* the module. [practitioner direct]

### M6: Shipping at Every's Scale — Two Engineers, Five Products
**Big idea:** The loop isn't theory — it's what lets Every run Cora, Monologue, Sparkle, Spiral, and Every.to with primarily single-person engineering teams; module closes the arc by showing the operational reality and the taste bottleneck that remains.
**Evidence:**
- [How Two Engineers Ship Like a Team of 15 With AI Agents](https://every.to/podcast/how-two-engineers-ship-like-a-team-of-15-with-ai-agents) [practitioner direct]
- Cora MVP shipped solo in 3 months (late 2024) — trajectory context, dated. [practitioner direct]
- "What used to take a week of coding now happens in hours." Definitive Guide. [practitioner direct, Level 2 single case — label as such]
- [This New Way, Oct 2025](https://www.youtube.com/watch?v=srh0zy1MQcI) — Klaassen as GM, not IC: the module is also about role evolution when the loop works. [practitioner direct]

## What he'd DOWNPLAY or leave out
- **Prompt engineering as a standalone skill.** He's moved past "how to phrase things." The artefacts (plan, CLAUDE.md, reviewer skills) carry the prompt quality. Prompting gets absorbed into planning.
- **Model selection tournaments / benchmarks.** Klaassen rarely argues Opus-vs-Sonnet-vs-GPT. He argues loop design. The plugin ports across Codex, Cursor, Gemini CLI, Copilot — model is substitutable, the loop isn't.
- **MCP-server-building as a headline topic.** Mentioned but not central. His factory runs on plans, skills, and review agents, not a menagerie of MCP servers.
- **"Vibes coding" / one-shot prompting.** Explicitly the anti-pattern. A demo, not a practice.
- **Enterprise governance / security theatre.** Absent from his public output. He builds for a tiny team that ships; the governance story is someone else's module.
- **Autonomy maximalism.** He does not argue for unsupervised agents. Human taste is the bread; remove it and you get "generic slop" (his words). This is a meaningful downplay — he's the opposite of the "full autonomy soon" camp.

## What he'd teach that's non-obvious
- **Tests are a planning output, not a coding output.** The plan specifies the tests; the agent writes them first. Inverts the usual "code then test."
- **Run the verifier 10 times before you trust it.** Reliability of the reviewer loop is a measured property, not a vibe. From "My AI had already fixed the code."
- **The Compound step is where most teams fail.** Plan and Review are legible; Compound requires discipline to write the lesson down when the feature already shipped. Larson's emphasis confirms this — it's the novel piece.
- **"Taste" is the non-automatable layer.** Not a romantic claim — a division-of-labour claim. Agents can't tell you which of three correct solutions matches the vision in your head. That's the human's whole job.
- **One plugin, many stacks.** The same loop runs in Claude Code, Codex, Cursor, Gemini CLI, Copilot, Windsurf, Factory Droid. The lesson: factor your practice from your tool.
- **Ship the plan to the repo.** The plan is checked-in artefact, not chat scratch. It survives restarts, onboards teammates, trains the next reviewer agent.

## Sources
- [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide) [practitioner direct]
- [Compound Engineering: How Every Codes With Agents](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents) [practitioner direct]
- [My AI Had Already Fixed the Code Before I Saw It](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it) [practitioner direct]
- [You're the Bread in the AI Sandwich](https://every.to/context-window/you-re-the-bread-in-the-ai-sandwich) [practitioner direct]
- [How Two Engineers Ship Like a Team of 15](https://every.to/podcast/how-two-engineers-ship-like-a-team-of-15-with-ai-agents) [practitioner direct]
- [This New Way podcast, Oct 2025](https://www.youtube.com/watch?v=srh0zy1MQcI) [practitioner direct]
- [Behind the Craft, Feb 2026 — "How to Make Claude Code Better Every Time"](https://podcasts.apple.com/ky/podcast/how-to-make-claude-code-better-every-time-you-use-it/id1736359687?i=1000748776547) [practitioner direct]
- [Klaassen × Peter Yang explainer](https://x.com/kieranklaassen/status/2020638198649811203) [practitioner direct]
- [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) [practitioner direct, open-source]
- [Will Larson — Learning from Every's Compound Engineering](https://lethain.com/everyinc-compound-engineering/) [practitioner analysis]
- [Every.to author page — Kieran Klaassen](https://every.to/@kieran_1355) [practitioner direct, index]

## Confidence
**High on the shape of the 6 modules** — Klaassen's public output is unusually coherent. The same four-step loop appears in every appearance over the last 6 months, and the ordering (loop → ratio → plan → review → compound → scale) follows the natural teaching arc of his own writing.

**Medium on what he'd downplay** — I'm inferring from absence. "He rarely talks about X" is softer evidence than "he argues against X." The autonomy-maximalism downplay is the best-supported (the "bread" framing is explicit); the MCP downplay is inference.

**Caveat per Larson** — the novelty-to-packaging ratio is roughly 1:3. Three of the four steps are well-known practice renamed; the Compound step is the load-bearing new piece. A training built on Klaassen's curriculum shape should be taught honestly as *operationalising what good practitioners were already doing* — not as a new paradigm. That honesty is part of what makes it teachable to CTOs.
