<!-- parent: building-agent-systems -->

# Module 2 Prework

Three small items before Module 2. Not a workbook. Twenty minutes total, plus a 15-minute <span class="rt-code">plan-mode primer</span><span class="rt-cowork">plan-first primer</span> (you'll thank yourself for it).

## 1. Bring a live challenge on your mind

Module 2 builds you a **memory**. A folder of your own notes and source material that Claude reads before answering, so it's grounded in *your* world, not the open internet. For that to work, you need to walk in with a real, live challenge in mind: a decision you're making, a bet you're placing, a piece of work where you don't yet see the shape.

**Don't write anything yet.** Module 2 pins it down in the first 15 minutes, with Claude asking you three questions and landing a brief in `./challenge.md`. If you arrive without one, the opening stalls. So think about which challenge before class. One that's on your mind often this month. Narrow enough that 5–8 topic pages could cover it.

If you're drawing a blank, scan your calendar for the next two weeks: the biggest open thing on it is usually the challenge.

## 2. Verify your connectors (2 min, worth doing now, not when class starts)

Module 2 Phase 1 relies on your Confluence (or similar wiki) connector and your OneDrive/SharePoint connector. If either needs admin approval, it can take days. You don't want to find out when class starts and the exercise is waiting.

In Claude Code desktop, click the **+** next to the prompt (or open **Settings → Connectors**). Enable the Confluence and OneDrive connectors. Sign in with your work account.

If either asks for IT admin approval you don't have, reply to the training coordinator now. They'll route it. If it signs in cleanly, you're done. When Module 2 starts you won't think about this again.

<span class="rt-code">## 3. Plan-mode primer (15 min)</span><span class="rt-cowork">## 3. Plan-first primer (15 min)</span>

<span class="rt-code">Module 2 turns on Claude Code's **plan mode** in Phase 1. Claude proposes what it's about to do before touching any files, and you approve. You'll want to recognize it before the exercise hits it rather than learn two things at once.</span><span class="rt-cowork">Module 2 asks Claude to **write a plan first** in Phase 1. Claude proposes what it's about to do before touching any files, and you approve. Cowork doesn't have a plan-mode toggle the way Code does; you get the same discipline by asking for a plan in the prompt. You'll want to recognize the move before the exercise hits it rather than learn two things at once.</span>

**Why <span class="rt-code">plan mode</span><span class="rt-cowork">a plan-first ask</span> exists.** Two reasons to reach for it:

1. **When the work is complex enough to touch more than one file or run more than one step.** A memory build writes 5–8 topic pages at once; a big refactor edits twenty files; an agent setup creates a file, schedules a run, edits rules. A plan-first move gives you a chance to review the whole shape before anything lands. The alternative is catching mistakes after they've been written.
2. **To make Claude think before it makes extensive output.** Writing a plan forces Claude to work out what it's actually going to do. Often the plan itself exposes a split that's wrong or a topic that's missing. Better to catch it as a bullet in the plan than as a bad file on disk. It's the same move as a human doing an outline before writing the essay.

Rule of thumb: reach for it whenever the next prompt is likely to write many files, edit anything you care about, or compound its output over multiple steps. Skip it for quick single-turn work where you'd just re-run the prompt if it went wrong.

Fifteen minutes. Pick one:

<div class="rt-code">

- **Read** the [Claude quick reference](curriculum.html?file=reference/claude-quick-reference). Start with *"Plan mode, look before you leap,"* then skim the rest. The reading itself is short; the extra time is for actually toggling plan mode in your own Claude Code and feeling how the footer changes. Doing beats reading.
- **Watch** Matt Pocock's [*"I was an AI skeptic. Then I tried plan mode"*](https://www.youtube.com/watch?v=WNx-s-RxVxk) on YouTube. A working practitioner showing how it feels in the hands, not a doc page.

Either way: know where the toggle is, what the footer says when it's on, and why you'd reach for it.

</div>
<div class="rt-cowork">

- **Read** the [Claude quick reference](curriculum.html?file=reference/claude-quick-reference). Skim the planning section. Cowork has no plan-mode toggle; the move is in the prompt. A line like *"Before you write any files, lay out a plan as a numbered list and ask me to approve it"* gives you the same discipline.
- **Watch** Matt Pocock's [*"I was an AI skeptic. Then I tried plan mode"*](https://www.youtube.com/watch?v=WNx-s-RxVxk) on YouTube. The demo is in Code, but the move is the same one you'll ask for in Cowork.

Either way: know what a plan-first prompt looks like, and why you'd reach for it before anything that writes more than one file.

</div>

---

**Also:** Karpathy's [LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) (short read). Optional but highly recommended. It's the named pattern Module 2 operationalizes on your own challenge.

**Time:** ~20 min active + 15 min plan-mode primer. Do what you can; the challenge-naming gets pinned in class, so prework can't actually "finish." You can only arrive ready.

<!-- maintainer -->

**Quality:** maintainer-reviewed 2026-04-29
- maintainer-reviewed 2026-04-29 (Antti, M2 prework manual read)

**Role in Module 2:** Lightweight prework designed to survive being skipped. The challenge-naming moved from prework into the main session (`name-your-challenge.md`, first 15 min of Module 2) because students skip prework and Module 2 Phase 1 stalls for anyone who arrives without a pinned challenge. Connector verification and plan-mode primer stay in prework — they're *useful* before class but not load-bearing if missed (fallback: facilitator triages connector issues live, plan mode gets a 60-second primer in Phase 1).

**Dependencies:**
- Claude Code installed, training directory created (training prework Step 0).

**Watch-fors:**
- A student who arrives without any challenge in mind — fallback in `name-your-challenge.md` maintainer notes (assign a teammate's challenge, or a live org-wide decision).
- A student whose connectors didn't sign in — facilitator triages in the first five minutes of Module 2.
