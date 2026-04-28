# Building Agent Systems

## Big Idea
A system remembers, grows, and compounds. Chat doesn't. Your next big challenge is the foundation.

## Prework

**Setup:** <span class="rt-code">Continue at your training-directory root. Start a new Claude Code session if you want fresh context.</span><span class="rt-cowork">Continue at your training-directory root. Start a new Cowork task with the same working folder if you want fresh context.</span> The empty `memory/`, `sources/`, and `agents/` folders are already there from prework, ready to fill. Your Module 1 rules file at `module-1/CLAUDE.md` stays scoped to Module 1. The wider root `CLAUDE.md` doesn't exist yet. You'll write your first version at the end of this module (Debrief), grounded in what actually happens during the exercise.

[Module 2 prework](exercises/module-2-prework.md). (1) Bring a live challenge on your mind. The challenge gets pinned down in the first 15 minutes of class. (2) Verify your Confluence and OneDrive connectors. (3) <span class="rt-code">Plan-mode primer (15 min).</span><span class="rt-cowork">Plan-first primer (15 min).</span> (4) Karpathy's LLM Wiki post. (5) Candidate: Lindenberg on Claude Code memory architecture.

## What You'll Learn
After this module, you will be able to:
- **Build** an LLM memory on your next big challenge, curated from internal wikis, recent work, and practitioner best practice
- **Construct** your first custom agent (a plain markdown file with instructions: what it's for, and the rules it follows) that does real work against that challenge using the memory
<span class="rt-code">- **Use** Claude Code's plan mode to review multi-step agent actions before they run</span><span class="rt-cowork">- **Ask** Claude to write a plan first, and review multi-step agent actions before they run</span>
- **Analyze** the three layers of the system (raw sources, the memory, the rules file) and explain why plain text beats a database here
- **Evaluate** whether the memory is compounding or merely growing

## Start here
Module 1 was the rehearsal. A site, a voice sharpened, fabrication caught by the only person in the room who could catch it. Now the training turns to work. The rest of it builds on the challenge you actually get paid to move, because that's where the system has to stand up.

You saw Karpathy's LLM Wiki post in the prework. What's the difference between asking an LLM a question and having an LLM maintain a knowledge base for you? We'll build one shortly.

Then the real one: what's the challenge you're carrying right now that isn't solved yet? The thing that's been open in your head for weeks, maybe longer. Not a task. A challenge. Hold it. We're going to build a memory around it.

And one more: if everything you've read, drafted, and half-figured-out on that challenge moved into a memory an agent could read and sharpen, what changes back at work?

[Exercise: Name your next big challenge](exercises/name-your-challenge.md)

[Exercise: Build your challenge memory](exercises/build-your-challenge-memory.md)

[Lecture: Compounding](lectures/compounding.md)

## Key Concepts
- **Three layers**: raw sources (the originals, untouched) → the memory (maintained by the agent, sharpens over time) → the rules file (`CLAUDE.md`) that keeps the shape consistent
- **Plain text beats databases here** because language models are strongest at reading and writing text. No setup, no extra tools.
- **Persistence + automation = system.** Neither alone is enough.

## Debrief

Five minutes. A retro, **and the first `./CLAUDE.md` at this directory.** Module 2 opened on an empty training-dir root: no rules file. The memory flow ran end to end (curate → ingest → build → update → maintain), and the rules that actually matter for YOUR agent are now visible — visible in what worked, what rubbed, what got repeated. Claude writes the rules file from the session. You push back on anything off.

**Prompt** *(Claude Code)*

```
Review this session and write the first version of CLAUDE.md at the training-directory root. The evidence: ./challenge.md, every file in sources/ (scan titles + first lines), every file in memory/, and our conversation.

The rules file governs how agents behave in this directory from now on — how memory gets compiled, how sources are treated, what claims require citations, what counts as "specific to my challenge" vs. generic. Don't invent — extract. Every rule you write should be traceable to a specific moment in the session where the rule either helped or would have helped.

Structure however makes sense for how we actually worked today — section headers, short paragraphs, bullets where a list is clearest. No retro-notes framing; write the rules as if they'd always been the rules. Cover at minimum: the memory (when and how pages get written, what grounds them), the sources (what they are, whether they're editable), the agents (how they relate to the memory), and whatever else earned its place.

When you're done, tell me in 3–5 lines: the rules you wrote, which session moments grounded each one, and what you chose NOT to include and why. I shouldn't have to open the file to know what's in it.
```


Read Claude's summary. Push back on anything that doesn't match your sense of the work. *"No, that rule's too strict."* *"You missed the bit where we had to regenerate three times because of X."* Same move Module 1 landed on your guardrails file: do the work, let the agent capture the rules, push back where the agent got it wrong. Module 2 lands your first wider rules file at the training-dir root (`./CLAUDE.md`), the one every subsequent module extends.

One more move before you close.

**Prompt** *(Claude Code)*

```
Look at my challenge memory. Find the load-bearing obstacle — the one thing that, if solved, unlocks the others. Richard Rumelt calls this the "crux."

Rules:
- Not a problem restatement. "We need to build credibility" is a goal, not a crux. "Prospects won't meet us until someone they trust vouches" IS a crux — it names the mechanism that blocks everything else.
- Not a category. "Positioning is unclear" is a category. "Buyers can't tell in 30 seconds whether we sell training or consulting" is specific enough to act on.
- Test it: if this obstacle moved, would at least three other stuck things release? If not, keep looking — it isn't the crux.

One sentence. Save it to ./crux.md and show me before saving.
```


**Push back on the first crux.** Claude's first answer is usually too abstract: a tidy restatement of the problem, not the mechanism underneath. Read what it writes. If the sentence reads like something you'd put on a slide titled *"The Challenge,"* it's a problem statement, not a crux. Push: *"that's a restatement. What's the specific obstacle that, if it moved, would release pressure on the rest? Name the mechanism, not the goal."* Second try is usually sharper. Third try is usually right. The crux is worth the three rounds. It's the seed Module 8 cashes in.

> Your agent is "right" when it works. Every miss is context you haven't written yet. Sharpen the memory, tighten a rule, rewrite the prompt. You won't spot the next mistakes by re-reading the files you already have. You spot them by running the system and watching where it bends.
>
> Antti

Watching where it bends is continuous improvement, done by hand. Every miss turns into a line of context that stops the next miss. Later in the training you'll learn the move that bends the curve: the agent spots its own misses and proposes its own fixes. You stop being the only pair of eyes.

## Next
You have an agent doing real work on your challenge. But the job is getting too big for one agent. What do you split?

Before the next module, try making a few more agents you actually need. Pick by pain, not ambition: the task you keep doing manually that would feel lighter if someone else did it. Meeting prep, competitive watching, drafting replies are all fine starters. You only learn by doing. Go build.

## Homework after Module 2 — between-module reading

[Schedule your personal agent](exercises/personal-agent-homework.md). Schedule a daily agent that reads your challenge memory (one week of observation). Plus selected sections from [What is an Agent](supplementary/what-is-an-agent.md) (tools, memory, context).

<!-- maintainer -->

**Meta (trainer):**
- **Primary Bloom's level:** Apply → Analyze
- **Materials (trainer):** Module 2 zip that unpacks into the student's working directory — empty `sources/` (participant fills via curation on class day — no pre-load), empty `memory/`, empty `agents/`, and a root `CLAUDE.md` with starter rules. Phase 3's second batch comes from the participant themselves — they find another piece of material mid-exercise. No trainer injection; the three-minute "go find more" loop is part of the lesson.
- **Plug points:** Each participant's own live challenge + curated sources from their Confluence / Office365 / internet. Sponsor pre-agreement: Confluence & Office365 connector access for the cohort; acceptance that the shape (not the substance) of challenges may be shared in the room.

**Plug Points (trainer):**
- **Each participant's own live challenge.** The exercises are structurally the same across people. What changes is what's inside the memory.
- **Sources must be readable by agents** (text, markdown, PDF, structured data) — Confluence and Office365 connector access arranged with the sponsor before training day.
