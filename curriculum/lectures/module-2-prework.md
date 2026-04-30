<!-- parent: building-agent-systems -->

# Before the Memory

**What you do:**

Bring one live challenge, check what Claude can read about it, and learn plan mode. In Cowork, learn the prompt-level version that simulates the same control point.

Module 1 was a contained creation. Module 2 turns toward work that already has history: meetings, notes, decisions, half-written documents, wiki pages, people, constraints. The point is not to prepare a perfect brief. The point is to arrive with enough real material that the memory can start from your world instead of generic internet shape.

## Bring one live challenge

Module 2 builds a **memory**: a folder of notes and source material the agent reads before answering. For that to work, the challenge has to be real. Bring a decision you're making, a bet you're placing, or a piece of work where the shape is still unclear.

Do not write the brief yet. Module 2 pins it down in the first 15 minutes, with Claude asking three questions and turning your rough challenge into a short brief. For now, just know the challenge you want to use. Good candidates are open enough to need thought, narrow enough that 5-8 topic pages could cover them, and present enough that your calendar or recent files already contain clues.

If nothing comes to mind, scan the next two weeks of your calendar. The biggest unresolved thing on it is usually the challenge.

## Check what Claude can read

Module 2 works best when Claude can read at least one source connected to your challenge: a calendar, a document store, a wiki, or a shared drive. You already checked Microsoft 365 or Google Workspace in the main prework. Now check whether your company wiki or document system is available too.

In Claude Code Desktop, click the **+** next to the prompt, then **Settings → Connectors**. In Cowork, open **Customize → Connectors**. Look for Microsoft 365, Google Workspace, Confluence, SharePoint, OneDrive, Google Drive, or the system your company actually uses.

If a connector asks for admin approval, tell the training coordinator. Keep going even if it is not ready. A connector makes Module 2 richer, but the memory can still start from files, pasted excerpts, and the sources you bring into the training directory.

## Learn plan mode

Module 2 asks the agent to create and update multiple files. Before it does that, you want to see the shape of the work.

<span class="rt-code">In Claude Code, that control point is **plan mode**. You turn it on, Claude writes a plan instead of touching files, and you approve or revise the plan before it runs.</span><span class="rt-cowork">Cowork does not have a plan-mode toggle. Module 2 simulates the same control point in the prompt: ask Claude to write the plan first and wait for approval before it touches files.</span>

Reach for this when the next step may write several files, edit anything you care about, or compound its output over multiple steps. Skip it for quick one-turn work where you would simply re-run the prompt.

Take 15 minutes. Pick one:

<div class="rt-code">

- **Read** the [Claude quick reference](reference/claude-quick-reference.md). Start with *"Plan mode, look before you leap,"* then try the toggle in Claude Code and notice how the footer changes.
- **Watch** Matt Pocock's [*"I was an AI skeptic. Then I tried plan mode"*](https://www.youtube.com/watch?v=WNx-s-RxVxk) on YouTube. A working practitioner showing how it feels in the hands, not a doc page.

Either way: know where the toggle is, what the footer says when it's on, and why you'd reach for it.

</div>
<div class="rt-cowork">

- **Read** the [Claude quick reference](reference/claude-quick-reference.md). Skim the planning section. Cowork has no plan-mode toggle, so Module 2 uses a prompt-level simulation. A line like *"Before you write any files, lay out a plan as a numbered list and ask me to approve it"* creates the review point.
- **Watch** Matt Pocock's [*"I was an AI skeptic. Then I tried plan mode"*](https://www.youtube.com/watch?v=WNx-s-RxVxk) on YouTube. The demo is in Code, but the move is the same one you'll ask for in Cowork.

Either way: know what the plan-mode simulation looks like, and why you'd reach for it before anything that writes more than one file.

</div>

---

## Read the memory frame

Karpathy's [LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) is short. Read it for the mental model: the useful system is not a single answer, but a living pile of text the agent can read, maintain, and improve.

Module 2 takes that idea and applies it to your challenge. The memory will be smaller than a wiki and more personal than a knowledge base. It starts as plain text because plain text is the easiest thing for the agent to read and rewrite.

**Bring to Module 2:** one live challenge, connector status checked, plan mode understood <span class="rt-cowork">(or the Cowork simulation understood)</span>, and Karpathy's memory frame in your head.

**Time:** 30-35 minutes. 5 to choose the challenge, 5 to check connectors, 15 for the plan-mode primer, 5-10 for Karpathy.

<!-- maintainer -->

**Quality:** draft 2026-04-30
- draft 2026-04-30 (rewritten after reclassification from exercise to pre-read; needs maintainer review)
- maintainer-reviewed 2026-04-29 (Antti, M2 prework manual read)

**Role in Module 2:** Lightweight prework designed to survive being skipped. The challenge-naming moved from prework into the main session (`name-your-challenge.md`, first 15 min of Module 2) because students skip prework and Module 2 Phase 1 stalls for anyone who arrives without a pinned challenge. Connector verification and plan-mode primer stay in prework — they're *useful* before class but not load-bearing if missed (fallback: facilitator triages connector issues live, Code gets a 60-second plan-mode primer and Cowork gets the prompt-level simulation in Phase 1).

**Dependencies:**
- Claude Code installed, training directory created (training prework Step 0).

**Watch-fors:**
- A student who arrives without any challenge in mind — fallback in `name-your-challenge.md` maintainer notes (assign a teammate's challenge, or a live org-wide decision).
- A student whose connectors didn't sign in — facilitator triages in the first five minutes of Module 2.
