# Exercise: Name your crux

**Time:** 8 minutes.

**Session** *(new, "Module 3 - Multi-agent systems")*

<span class="rt-code">Start a new Claude Code session at your training-directory root.</span><span class="rt-cowork">Start a new Cowork task with your training-directory root as the working folder.</span>

```
/rename m3-multi-agent-systems
```

**What you do:**

Module 2 produced a memory full of what you've gathered about your challenge. Module 3 turns it into an answer you can act on, starting with the question worth answering. Richard Rumelt calls it the **crux**: the one thing that, if solved, releases pressure on everything else.

Module 3 opens cold. Module 2's `memory/` is on disk; this exercise reads from it. The retrievers in the next exercise go to connectors and the open web, Module 2's curation becomes the thing you'll compare their fresh findings against during synthesis.

Ask Claude to read the memory and name the crux. Push back hard when the first answer is a problem restatement.

{{prompt:name-your-crux-1}}


Revise by iterating; save when good enough.

The crux is the obstacle. Now name the decision the crux blocks, the call you'd stay late to make. Cruxes describe; decisions act.

Ask Claude to name the sharpest decision the crux blocks and append it to the same file.

{{prompt:name-your-crux-2}}


Same move: iterate if it's a topic restatement instead of a real call; save when good enough.

<!-- maintainer -->

**Quality:** compendium-audited 2026-05-09 (behavior@56f9332)
- judges @56f9332: writing grandfathered, story grandfathered, technical grandfathered, behavior PASS
- maintainer-reviewed @60b1b6c: PASS — M3 manual walkthrough

**Role in Module 3:** Opening exercise. Produces `./crux.md` with two sections — the crux (load-bearing obstacle) and the question (sharpest decision the crux blocks). Both are read by the retrievers, stances, and synthesizer in `three-retrievers-three-minds.md`.

**Frameworks:**
- Rumelt's *Good Strategy / Bad Strategy* — the crux concept. The strategy kernel (diagnosis → guiding policy → coherent actions) shows up later in M3's synthesizer prompt and uses the crux as the diagnosis spine.
