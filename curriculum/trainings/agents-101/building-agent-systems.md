# Building Agent Systems

## Big Idea
A system remembers, grows, and compounds. Chat doesn't. Your next big challenge is the foundation.

## Prework

[Module 2 prework](lectures/module-2-prework.md). (1) Bring a live challenge on your mind. The challenge gets pinned down in the first 15 minutes of class. (2) Verify your Confluence and OneDrive connectors. (3) <span class="rt-code">Plan-mode primer (15 min).</span><span class="rt-cowork">Plan-first primer (15 min).</span> (4) Karpathy's LLM Wiki post.

## What You'll Learn
After this module, you will be able to:
- **Build** an LLM memory on your next big challenge, curated from internal wikis, recent work, and practitioner best practice
- **Construct** your first custom agent (a plain markdown file with instructions: what it's for, and the rules it follows) that does real work against that challenge using the memory
<span class="rt-code">- **Use** Claude Code's plan mode to review multi-step agent actions before they run</span><span class="rt-cowork">- **Ask** Claude to write a plan first, and review multi-step agent actions before they run</span>
- **Analyze** the three layers of the system (raw sources, the memory, the rules file) and explain why plain text beats a database here
- **Evaluate** whether the memory is compounding or merely growing

## Start here
Module 2 turns to your real challenge. A fresh session keeps Module 1's personal-site scrollback out of the way. The empty `memory/`, `sources/`, and `agents/` folders are already there from prework, ready to fill. Your Module 1 generation-rules file stays scoped to `module-1/`. The wider root `CLAUDE.md` doesn't exist yet. You'll write your first version at the end of this module (Debrief), grounded in what actually happens during the exercise.

Module 1 was the rehearsal. A site, a voice sharpened, fabrication caught by the only person in the room who could catch it. Now the training turns to work. The rest of it builds on the challenge you actually get paid to move, because that's where the system has to stand up.

You saw Karpathy's LLM Wiki post in the prework. What's the difference between asking an LLM a question and having an LLM maintain a knowledge base for you? We'll build one shortly.

Then the real one: what's the challenge you're carrying right now that isn't solved yet? The thing that's been open in your head for weeks, maybe longer. Not a task. A challenge. Hold it. We're going to build a memory around it.

And one more: if everything you've read, drafted, and half-figured-out on that challenge moved into a memory an agent could read and sharpen, what changes back at work?

Connectors let the agent combine clues that normally live apart: a wiki page, a document, a meeting note, an email thread, and a useful source from the open web. The useful answer is often between systems.

[Demo: 1st scheduled agent](lectures/first-scheduled-agent.md)

[Exercise: Name your next big challenge](exercises/name-your-challenge.md)

Keep the same <span class="rt-code">session</span><span class="rt-cowork">task</span> running for the next exercise. Claude already has your challenge in scrollback; no need to re-read.

[Exercise: Build your challenge memory](exercises/build-your-challenge-memory.md)

[Lecture: Compounding](lectures/compounding.md)

## Key Concepts
- **Three layers**: raw sources (the originals, untouched) → the memory (maintained by the agent, sharpens over time) → the rules file (`CLAUDE.md`) that keeps the shape consistent
- **Plain text beats databases here** because language models are strongest at reading and writing text. No setup, no extra tools.
- **Persistence + automation = system.** Neither alone is enough.

## Debrief

Five minutes. A retro, **and the first `./CLAUDE.md` at this directory.** Module 2 opened on an empty training-dir root: no rules file. The memory flow ran end to end (curate → ingest → build → update → maintain), and the rules that actually matter for YOUR agent are now visible, visible in what worked, what rubbed, what got repeated. Claude writes the rules file from the session. You push back on anything off.

**Prompt** *(Claude Code)*

```
Review this session and write the first version of CLAUDE.md at the training-directory root. The evidence: ./challenge.md, every file in sources/ (scan titles + first lines), every file in memory/, and our conversation.

The rules file governs how agents behave in this directory from now on — how memory gets compiled, how sources are treated, what claims require citations, what counts as "specific to my challenge" vs. generic. Don't invent — extract. Every rule you write should be traceable to a specific moment in the session where the rule either helped or would have helped.

Structure however makes sense for how we actually worked today — section headers, short paragraphs, bullets where a list is clearest. No retro-notes framing; write the rules as if they'd always been the rules. Cover at minimum: the memory (when and how pages get written, what grounds them), the sources (what they are, whether they're editable), the agents (how they relate to the memory), and whatever else earned its place.

When you're done, tell me in 3–5 lines: the rules you wrote, which session moments grounded each one, and what you chose NOT to include and why. Be specific on the omissions: name at least one session moment where you considered a rule and skipped it, and the reason. I shouldn't have to open the file to know what's in it.
```


Read Claude's summary. Push back on anything that doesn't match your sense of the work. *"No, that rule's too strict."* *"You missed the bit where we had to regenerate three times because of X."* Same move Module 1 landed on your guardrails file: do the work, let the agent capture the rules, push back where the agent got it wrong. Module 2 lands your first wider rules file at the training-dir root (`./CLAUDE.md`), the one every subsequent module extends.

What Claude leaves out is often the signal. A clean summary that names three rules and skips the messy fourth, the one where the work bent and you re-prompted twice, is the tell. Compounding rules files are not tidy.

> Your agent is "right" when it works. Every miss is context you haven't written yet. Sharpen the memory, tighten a rule, rewrite the prompt. You won't spot the next mistakes by re-reading the files you already have. You spot them by running the system and watching where it bends.

Watching where it bends is continuous improvement, done by hand. Every miss turns into a line of context that stops the next miss. Later in the training you'll learn the move that bends the curve: the agent spots its own misses and proposes its own fixes. You stop being the only pair of eyes.

## Next
You have an agent doing real work on your challenge. But the job is getting too big for one agent. What do you split?

Before the next module, try making a few more agents you actually need. Pick by pain, not ambition: the task you keep doing manually that would feel lighter if someone else did it. Meeting prep, calendar triage, competitive watching, and draft-reply triage are all fine starters. Keep the first version proposal-only: the agent drafts, ranks, or prepares; you decide what leaves the system. You only learn by doing. Go build.

## Homework after Module 2, between-module reading

[Schedule your personal agent](exercises/personal-agent-homework.md). Schedule a daily agent that reads your challenge memory for one week of observation. Read [Agent Trigger List, After Module 2](supplementary/agent-trigger-list.md#after-module-2--start-noticing-trigger-moments) and start noticing when real work should call the agent. Read selected sections from [What is an Agent](supplementary/what-is-an-agent.md) on tools, memory, and context. Then do [Before Module 3](exercises/module-3-prework.md): pick three practitioner pieces, and read the plain-language primer on helper agents.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-02 (behavior@9ddfac3)
- judges @9ddfac3: writing grandfathered, story grandfathered, technical grandfathered, behavior PASS
- maintainer-reviewed 2026-04-29 (Antti, M2 manual cohort-prep run; read end-to-end, prompts run manually under Cowork lens)

**Opening connector demo (trainer, 5 min):** Place after the opening questions and before `Name your next big challenge`. Use non-sensitive trainer material. Ask Claude to answer one small work question by checking two connected systems and the open web: for example, a wiki page, a recent document or meeting note, and one outside source. The point is not the answer. The point is the moment where Claude combines clues that normally live in separate places.

**Meta (trainer):**
- **Primary Bloom's level:** Apply → Analyze
- **Materials (trainer):** Module 2 zip that unpacks into the student's working directory — empty `sources/` (participant fills via curation on class day — no pre-load), empty `memory/`, and empty `agents/`. No root `CLAUDE.md` ships; the student creates it in the Debrief. Five-minute connector demo uses non-sensitive trainer material across two connected systems plus one outside source. Phase 3's second batch comes from the participant themselves — they find another piece of material mid-exercise. No trainer injection; the three-minute "go find more" loop is part of the lesson.
- **Plug points:** Each participant's own live challenge + curated sources from their Confluence / Office365 / internet. Sponsor pre-agreement: Confluence & Office365 connector access for the cohort; acceptance that the shape (not the substance) of challenges may be shared in the room.

**Plug Points (trainer):**
- **Each participant's own live challenge.** The exercises are structurally the same across people. What changes is what's inside the memory.
- **Sources must be readable by agents** (text, markdown, PDF, structured data) — Confluence and Office365 connector access arranged with the sponsor before training day.
