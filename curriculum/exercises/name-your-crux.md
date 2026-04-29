# Exercise: Name your crux

**What you do:**

Module 2 produced a memory full of what you've gathered about your challenge. Module 3 turns it into an answer you can act on — starting with the question worth answering. Richard Rumelt calls it the **crux**: the one thing that, if solved, releases pressure on everything else.

**Setup:** <span class="rt-code">Start a new Claude Code session at your training-directory root.</span><span class="rt-cowork">Start a new Cowork task with your training-directory root as the working folder.</span> Module 3 opens cold. Module 2's `memory/` is on disk; this exercise reads from it. The retrievers in the next exercise go to connectors and the open web — Module 2's curation becomes the thing you'll compare their fresh findings against during synthesis.

Ask Claude to read the memory and name the crux. Push back hard when the first answer is a problem restatement.

**Prompt** *(Claude Code)*

```
Look at my challenge memory. Find the load-bearing obstacle: the one thing that, if solved, unlocks the others. Richard Rumelt calls this the "crux."

Rules:
- Not a problem restatement. "We need to build credibility" is a goal, not a crux. "Prospects won't meet us until someone they trust vouches" IS a crux: it names the mechanism that blocks everything else.
- Not a category. "Positioning is unclear" is a category. "Buyers can't tell in 30 seconds whether we sell training or consulting" is specific enough to act on.
- Test it: if this obstacle moved, would at least three other stuck things release? If not, keep looking. It isn't the crux.

One sentence. Save it to ./crux.md and show me before saving.
```


**Push back on the first crux.** Claude's first answer is usually too abstract: a tidy restatement of the problem, not the mechanism underneath. Read what it writes. If the sentence reads like something you'd put on a slide titled *"The Challenge,"* it's a problem statement, not a crux. Push: *"that's a restatement. What's the specific obstacle that, if it moved, would release pressure on the rest? Name the mechanism, not the goal."* Second try is usually sharper. Third try is usually right. The crux is worth the three rounds.

**Time:** 5 minutes.

<!-- maintainer -->

**Quality:** draft 2026-04-29

**Role in Module 3:** Opening exercise. Produces `./crux.md`, the seed the next exercise's strategic question derives from. Also the seed Module 8 cashes in.

**Frameworks:**
- Rumelt's *Good Strategy / Bad Strategy* — the crux concept. The strategy kernel (diagnosis → guiding policy → coherent actions) shows up later in M3's synthesizer prompt and uses the crux as the diagnosis spine.
