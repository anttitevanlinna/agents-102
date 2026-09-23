# Compounding

You just did something a chat can't do.

Not the ingestion, a long enough prompt ingests. Not the task, a good prompt does tasks. The thing you did that a chat can't do is **Phase 3**. You dropped new sources into the folder, asked Claude to update the memory, and three topic pages *got sharper instead of longer*. The second batch made the first batch better. That's compounding. And you can't picture it from a description, you had to see it.

## Two words, held together

A system is two things stacked:

- **Persistence.** It remembers. Files on disk, not a thread that resets.
- **Automation.** It runs on its own. Not because you retyped the prompt. The instructions are in a file the agent reads every time.

Either one alone is a toy. A saved document with no agent is just a document. An agent with no files is a chat. Put them together and you get something that *keeps getting better the more you feed it*. That's the whole claim.

In the full agent picture, Module 2 adds shelf life. Context stops being something trapped in one conversation. It becomes memory the agent can re-read, update, and carry into the next session.

## Why the sharpening happens

When you added the second batch, Claude didn't start over. It read the existing topic pages first, as *context*, then read the new sources, then integrated. The existing memory was part of the prompt for updating the memory. That's why pages got sharper: the old claims and the new claims met each other, and the ones that couldn't survive the meeting got cut.

This is the same mechanism from Module 1: context shapes output, run at system scale. The context for this work is what the previous work produced. The context for the next session will be what this work produced. The loop is the product.

## It gets better by being edited

Keep the rules small, keep them boring, and let the compounding do the work. Not "clever prompts." Plain rules, applied consistently across thousands of small updates. The discipline is in refusing to get fancy.

## A folder of text, and that is the point

The memory is a folder of markdown files. That's it. No database. No special tool. No paid tier. No setup. And the agent you just built, the one sitting in `agents/`, is also a markdown file. Instructions the model reads at the start of every session. Same plain-text form for the knowledge, same plain-text form for the capability, same plain-text form as the guardrail you wrote in Module 1. One kind of object, three jobs. Which means it also travels, paste the agent file into any LLM tool and it still works.

That might look like a limitation. It isn't. Language models are strongest at reading and writing text, that is what they do. When you store knowledge as text, reading it is reading, and updating it is writing. Nothing sits between the model and what it's best at. Every fancier setup that promised to "fix" this added a layer that the model had to work *around*.

The point is simple: the simplest possible setup beats the fancy ones, because it respects what the model actually does well. Fundamentals outlast tools. Platforms will churn. But *text that an agent can read and write* isn't going anywhere.

## What this unlocks

Your memory is specific to your challenge. The question you just ran through it came back with claims cited to your files, reasoning shaped by your context, a voice that isn't a generic industry take. The answer belongs to the memory you built, not to the LLM behind it. That's the point the whole training turns on: *generic AI becomes your AI when you shape the context that surrounds it.* Guardrails did this at the prompt level in Module 1. A memory does it at the knowledge level now. The mechanism is the same; only the shelf life changed.

Every module after this leans on the memory you just built. Multi-agent systems reads from it. Security reviews it. Quality evals run against it. The flywheel in Module 8 feeds it. You didn't build a training exercise. You built the material the rest of the training runs on.

## Could a competitor claim this?

Back in Phase 1 you asked Claude to flag pages a competitor could write about themselves. Phase 3 sharpened them. That's the discipline: if the answer to *"could a competitor claim this?"* is ever yes, the memory is growing but not compounding.

Spot what's still generic and sharpen it.

{{prompt:compounding-1}}

Claude comes back with three pointed requests. Answer one. Let it update the page. The memory just got a fourth round of compounding. You steer; the system maintains; the loop runs.

## It can only use what someone wrote down

One limit worth seeing while the memory is fresh in front of you.

The agent can only work from what somebody wrote down. Most of what you know about your own company, nobody has. It sits in heads, in corridors, in the judgement of the person who has been there long enough to stop noticing they have it.

That is not a fault in the memory you built. It is why the memory you built is worth something. Every round of this moves one more piece of what you know out of your head and into something the system can read next time.

<!-- maintainer -->

**Story blend, M2 slides (2026-09-23).** Headers per `module-design/a101-story-proposals/blend.md` § Titles, M2. Seven slides: `Two words, held together`, `Why the sharpening happens`, `It gets better by being edited`, `A folder of text, and that is the point`, `What this unlocks`, `Could a competitor claim this?`, `It can only use what someone wrote down`. The split between the third and the second is mechanism (why pages sharpen) against discipline (what keeps them sharpening); no prose moved to make it. The last slide carries the blend's plant for the access-is-not-absorption learning, verbatim: *the agent can only work from what somebody wrote down; most of what you know about your own company, nobody has*. The slide closes on what the memory is worth, because M2's mood is satisfied compounding; the word for the gap is not planted here.

The blend lists `It gets better by being edited` after `A folder of text, and that is the point`. It sits before it instead, so the paragraph stays where it was written and the two refuse-to-get-fancy beats do not both move.

**Pre-prompt lead-in trimmed to the action (2026-08-29, Antti-directed).** *"Ask Claude to spot the still-generic pages in the memory you built and propose what would sharpen each"* previewed `compounding-1` clause for clause (*pick the three topic pages that are still the most generic* / *what specific source would sharpen it most*). Now `Spot what's still generic and sharpen it.` **The test a lead-in has to pass: does it tell you to run the prompt, or tell you what the prompt says?** The first is a speech act aimed at the human and the prompt cannot perform it; the second is the prompt's own text, addressed to the only reader who acts on it. Keep the verb, drop the preview. Do not restore the detail — the prompt carries it, and the paragraph below carries what to do with the answer.

**§6 carve-out, the answer must be theirs (checked 2026-08-20).** Logged in `pre-cohort-todos.md` as a lecture prompt owing the trainer-demo sweep. It is not: the prompt reads *"Look at the memory I just built"* and *"pull the missing insight out of my head"* — the student's own memory pages and the student's own head. A trainer demo returns the wrong machine's answer. The body now names the student's own memory beside the prompt, which is §6's tell. Leave it student-run.


**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Time:** 10 minutes.

**Philosophy callouts used (per the sparing rule):**
- **#3 Mental models only come from doing** — named implicitly in the opening ("you can't picture it from a description — you had to see it"). The whole Phase 3 debrief is this belief landed.
- **Fundamentals outlast tools** — named in "A folder of text, and that is the point." Frameworks churn; text-that-Claude-reads-and-writes is the durable material.

Not used (deliberate): #2 (act on the future), #10 (competence precedes vision), #18 (flywheel) — the first two are Module 8's weight, #18 belongs to the closing module. Keeping the budget to two.

**Deferred per student-facing-first rule:**
- Facilitator notes: timing within the 10 minutes (the "two words" section is the pivot — don't rush past it); watch-for on the "one question before you close" moment (a room of mostly-generic answers tells you the sources are thin, not that the pattern didn't land); pacing decision if the exercise ran long and lecture time is short (cut "Why the sharpening happens" — the other sections survive alone).
