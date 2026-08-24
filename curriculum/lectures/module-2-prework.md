<!-- parent: building-agent-systems -->

# Before the Memory

**What you do:**

Bring one live challenge, check what Claude can read about it, learn plan mode, and leave yourself a three-line readiness note. In Cowork, learn the prompt-level version that simulates the same control point.

Module 1 was a contained creation. Module 2 turns toward work that already has history: meetings, notes, decisions, half-written documents, wiki pages, people, constraints. The point is not to prepare a perfect brief. The point is to arrive with enough real material that the memory can start from your world instead of generic internet shape.

## Bring one live challenge

Module 2 builds a **memory**: a folder of notes and source material the agent reads before answering. For that to work, the challenge has to be real. Bring a decision you're making, a bet you're placing, or a piece of work where the shape is still unclear.

Do not write the brief yet. Module 2 pins it down in class, with Claude asking three questions and turning your rough challenge into a short brief. For now, just know the challenge you want to use. Good candidates are open enough to need thought, narrow enough that 5-8 topic pages could cover them, and present enough that your calendar or recent files already contain clues.

If nothing comes to mind, scan the next two weeks of your calendar. The biggest unresolved thing on it is usually the challenge.

## Check what Claude can read

Module 2 works best when Claude can read at least one source connected to your challenge: a calendar, a document store, a wiki, or a shared drive. You already checked Microsoft 365 or Google Workspace in the main prework. Now check whether your company wiki or document system is available too.

**Connectors** are connections to places where your work lives, Microsoft 365, Google Workspace, Confluence, SharePoint, OneDrive, Google Drive, or whatever your company actually uses.

In Claude Code Desktop, click the **+** next to the prompt, then **Settings → Connectors**. In Cowork, open **Customize → Connectors**. Look for Microsoft 365, Google Workspace, Confluence, SharePoint, OneDrive, Google Drive, or the system your company actually uses.

If a connector asks for admin approval, tell the training coordinator. Keep going even if it is not ready. A connector makes Module 2 richer, but the memory can still start from files, pasted excerpts, and the sources you bring into the training directory.

## Learn plan mode

Module 2 asks the agent to create and update multiple files. Before it does that, you want to see the shape of the work.

<span class="rt-code">In Claude Code, that control point is **plan mode**. You turn it on, Claude writes a plan instead of touching files, and you approve or revise the plan before it runs.</span><span class="rt-cowork">Cowork does not have a plan-mode toggle. Module 2 simulates the same control point in the prompt: ask Claude to write the plan first and wait for approval before it touches files.</span>

Reach for this when the next step may write several files, edit anything you care about, or compound its output over multiple steps. Skip it for quick one-turn work where you would simply re-run the prompt.

Pick one route through the primer:

<div class="rt-code">

- **Read** the [Claude quick reference](../trainings/agents-101/reference/claude-quick-reference.md). Start with *"Plan mode, look before you leap,"* then try the toggle in Claude Code and notice how the footer changes.
- **Watch** Matt Pocock's [*"I was an AI skeptic. Then I tried plan mode"*](https://www.youtube.com/watch?v=WNx-s-RxVxk) on YouTube. A working practitioner showing how it feels in the hands, not a doc page.

Either way: know where the toggle is, what the footer says when it's on, and why you'd reach for it.

</div>
<div class="rt-cowork">

- **Read** the [Claude quick reference](../trainings/agents-101/reference/claude-quick-reference.md). Skim the planning section. Cowork has no plan-mode toggle, so Module 2 uses a prompt-level simulation. A line like *"Before you write any files, lay out a plan as a numbered list and ask me to approve it"* creates the review point.
- **Watch** Matt Pocock's [*"I was an AI skeptic. Then I tried plan mode"*](https://www.youtube.com/watch?v=WNx-s-RxVxk) on YouTube. The demo is in Code, but the move is the same one you'll ask for in Cowork.

Either way: know what the plan-mode simulation looks like, and why you'd reach for it before anything that writes more than one file.

</div>

---

## Start the Module 2 handoff

Create `prework/module-2-start.md` in your training directory. Add:

- the live challenge you are bringing;
- the first source Claude can read about it, or the fallback you will use (identify it here; Module 2 handles the content);
- the planning control you will use before Claude writes files: plan mode in Claude Code, or a plan-first request in Cowork.

This file is the first handoff into your system. Module 2 will build `./challenge.md` from the challenge line, start its memory from the source line, and use the planning-control line before its first multi-file write. The note is not a spare checklist: each line has a named consumer, and the file stays behind as the record of where the system started.

If one line is still blank, you now know exactly what to resolve before class. Do not fill the gap with a plausible answer. Name the fallback instead.

---

## Read the memory frame

Karpathy's [LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) is short. Read it for the mental model: the useful system is not a single answer, but a living pile of text the agent can read, maintain, and improve.

Module 2 takes that idea and applies it to your challenge. The memory will be smaller than a wiki and more personal than a knowledge base. It starts as plain text because plain text is the easiest thing for the agent to read and rewrite.

**Bring to Module 2:** `prework/module-2-start.md` and Karpathy's memory frame in your head. You have not built the brief or memory early; you have created the small artifact both of them will consume.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-24 (writing@05ca65cf story@05ca65cf pedagogy@05ca65cf strategy@725101ec slides@05ca65cf)
- judges @05ca65cf: writing PASS, story PASS, technical grandfathered, behavior grandfathered, pedagogy PASS, strategy PASS, slides PASS

**Time:** 37 minutes. 5 to choose the challenge, 5 to check connectors, 15 for the plan-mode primer, 2 for the readiness note, 10 for Karpathy.

**Role in Module 2:** Lightweight prework designed to survive being skipped. The challenge-naming moved from prework into the main session (`name-your-challenge.md`, first 15 min of Module 2) because students skip prework and Module 2 Phase 1 stalls for anyone who arrives without a pinned challenge. Connector verification and plan-mode primer stay in prework — they're *useful* before class but not load-bearing if missed (fallback: facilitator triages connector issues live, Code gets a 60-second plan-mode primer and Cowork gets the prompt-level simulation in Phase 1).

**Dependencies:**
- Claude Code installed, training directory created (training prework Step 0).

**Watch-fors:**
- A student who arrives without any challenge in mind — fallback in `name-your-challenge.md` maintainer notes (assign a teammate's challenge, or a live org-wide decision).
- A student whose connectors didn't sign in — facilitator triages in the first five minutes of Module 2.
