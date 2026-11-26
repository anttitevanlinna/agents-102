<!-- parent: building-agent-systems -->

# Before the Memory

**What you do:**

Bring one live challenge, check what the agent can read about it, use a plan-first control, and leave yourself a three-line readiness note.

Module 2 works on real history: meetings, notes, decisions, half-written documents.

## Bring one live challenge

Module 2 builds a **memory**: a folder of notes and source material the agent reads before answering. Bring a real challenge: a decision you're making, a bet you're placing, or work whose direction is still unclear.

Pick one open enough to need thought, narrow enough for 5-8 topic pages.

If stuck, scan your next two weeks of calendar; the biggest unresolved item is usually your challenge.

## Check what the agent can read

Module 2 works best when the agent can read a source connected to your challenge. If your work lives in a wiki or document system, check that the agent can reach it. Your own files work too.

**Connectors** link the agent to places where your work lives: a wiki, a shared drive, or whatever you use. Look for them in your runtime's connector settings.

Without a connector, the memory can start from files and pasted excerpts in your training directory.

## Put a plan before action

Module 2 has the agent create and update multiple files. Ask it for a plan first, then approve or revise it. Runtimes offer this as a mode or via the prompt.

Use it when the next step may write several files or edit anything you care about. Skip it for quick one-turn work.

Pick one:

- **Ask** the agent which planning control your runtime offers, then try it on a harmless file change.
- **Watch** Matt Pocock's [video about planning before execution](https://www.youtube.com/watch?v=WNx-s-RxVxk).

---

## Start the Module 2 handoff

Create `prework/module-2-start.md` in your training directory. Add:

- the live challenge you are bringing;
- the first source the agent can read about it, or your fallback;
- the planning control you will use before the agent writes files.

Module 2 builds `./challenge.md` from these lines. If a line is blank, name a fallback; do not fill it with a plausible answer.

---

## Read the memory frame

Read Karpathy's [LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) for the mental model: a useful system is a living pile of text the agent can read, maintain, and improve. Your memory starts as plain text, which the agent reads and rewrites easily.

**Bring to Module 2:** `prework/module-2-start.md`.

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (writing@78d17fc9 story@78d17fc9 pedagogy@78d17fc9 strategy@78d17fc9 slides@78d17fc9)
- judges @78d17fc9: writing PASS, story PASS (2 findings see instances/agents-101--lecture--module-2-prework.story.json), technical grandfathered, behavior grandfathered, pedagogy PASS (verify-refuted, 2 findings see instances/agents-101--lecture--module-2-prework.pedagogy.json), strategy PASS, slides PASS

**Time:** 37 minutes. 5 to choose the challenge, 5 to check connectors, 15 for the plan-mode primer, 2 for the readiness note, 10 for Karpathy.

**Role in Module 2:** Lightweight prework designed to survive being skipped. The challenge-naming lives in the main session, not prework (`name-your-challenge.md`, first 15 min of Module 2): students skip prework, and Module 2 Phase 1 stalls for anyone who arrives without a pinned challenge. Connector verification and plan-mode primer stay in prework — they're *useful* before class but not load-bearing if missed (fallback: facilitator triages connector issues live, Code gets a 60-second plan-mode primer and Cowork gets the prompt-level simulation in Phase 1).

**Dependencies:**
- Claude Code installed, training directory created (training prework Step 0).

**Watch-fors:**
- A student who arrives without any challenge in mind — fallback in `name-your-challenge.md` maintainer notes (assign a teammate's challenge, or a live org-wide decision).
- A student whose connectors didn't sign in — facilitator triages in the first five minutes of Module 2.
