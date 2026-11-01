# Exercise: Name your crux

**Time:** 8 minutes.

**Session** *(new, "Module 3 - Multi-agent systems")*

**What you do:**

Ask the agent to read Module 2's `memory/` and name the **crux**, Richard Rumelt's term for the one thing that, if solved, releases pressure on everything else. Push back when the first answer restates the problem.

{{prompt:name-your-crux-1}}

Iterate; save when good enough.

The crux is the obstacle. Ask the agent to name the sharpest decision it blocks, the call you'd stay late to make, and append it to the crux file.

{{prompt:name-your-crux-2}}

Iterate past a topic restatement; save when good enough.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing grandfathered, story grandfathered, technical grandfathered, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

- **Atomic — no phase markers.** One conversation; the second prompt appends to the same `crux.md` in the same session, so there is nothing to cut between them. Line 3 is authored, not generated.

**Role in Module 3:** Opening exercise. Produces `./crux.md` with two sections — the crux (load-bearing obstacle) and the question (sharpest decision the crux blocks). Both are read by the retrievers, stances, and synthesizer in `three-retrievers-three-minds.md`.

**Frameworks:**
- Rumelt's *Good Strategy / Bad Strategy* — the crux concept. The strategy kernel (diagnosis → guiding policy → coherent actions) shows up later in M3's synthesizer prompt and uses the crux as the diagnosis spine.

**View summary:** You turn a memory full of gathered material into the one question worth answering, Rumelt's crux: the thing that, if solved, releases pressure on everything else. The artifact is a crux file that the retrievers and the synthesis read next.
