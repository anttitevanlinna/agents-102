# Exercise: Read the *digest*

**Time:** 15 minutes.

**Session** *(new, "Day 2 - What came back")*

<span class="rt-code">Start a new Claude Code session in your training folder, `~/Documents/apt101/`.</span><span class="rt-cowork">Start a new Cowork task with `~/Documents/apt101/` as the working folder.</span>

```
/rename apt101-day-2
```

**What you do:**

Your agent ran overnight on the material your team agreed on Day 1. Before anyone reads the digest itself, find out what actually ran: which job, on which files, and what it wrote. Then each of you reads the lines that came from your own material, the part you know better than anyone in the room, and marks the one line you trust least.

If your agent did not run, the trainer has a fallback digest built from the same kind of material. Drop it into `module-2/morning-agent/latest.html` and carry on.

## Phase 1: See what ran

*5 min*

Ask Claude to report what ran overnight, on which material, and what it wrote, as a ranked list with the source of each line.

**Prompt** · `apt101-d2-what-ran-overnight`, reads `module-2/morning-agent/morning.md`, the run's `module-2/morning-agent/latest.html` and `team/what-goes-in.md`; reports which job ran, which files it read (and any it read that sit outside what your team agreed), and lists every claim in the digest ranked by how much a decision would rest on it, each with the source file it came from or "no source"

Push back if the list comes back as a summary of the digest. You want lines and sources, not a second essay about the first one.

## Phase 2: Mark the line you trust least

*5 min*

Each of you, on your own laptop. Read only the lines whose source is your own material: the product owner's tickets and numbers, the designer's interviews, the team lead's retro notes. You know these sources. The agent read them once.

Pick the one line you trust least. Not the one that is plainly wrong; the one you would least want a priority call to rest on. Ask Claude to write it down with your reason.

**Prompt** · `apt101-d2-mark-the-doubt`, appends the line I quote, its source, and my reason in my words to `team/<your-name>/doubts.md`, then checks the source and tells me what it actually says next to the digest's line

One pattern to watch: the line you trust least is often the one that agrees most with what your team already believed. If your doubt lands on a typo, look again at the headline.

## Phase 3: Pick the doubt that matters most

*5 min*

Laptops half shut. Each of you reads your doubt and its reason to the other two. Together, pick the one doubt that matters most for the bet in `team/bet.md`: the one that would change what you build if it turned out true.

That is a team call, not a vote, and nobody's agent makes it. The product owner writes the chosen doubt at the top of `team/doubts.md`, with whose line it was.

## Take stock

You have three doubts, one chosen, each tied to a line and a source. The digest read more than any of you could. Each of you still knew one source well enough to catch where it went past what was there.

<!-- maintainer -->

**Role in Day 2:** opening exercise, beat 1. Turns the overnight digest from Day 1 into one doubt the team chose, which the outcome pick and the evidence run read next.

**Reuse:** new. Return leg of Agents 101 `personal-agent-homework` (same `module-2/morning-agent/` paths; no keys reused, since homework-1–3 set the agent up rather than read it back).

**Frameworks:** none named in body. Read-where-you-know-most and the agreeable-summary point are taught in `apt101-the-digest-is-back`, placed before this exercise.

**Artefacts:**
- Consumes: `module-2/morning-agent/morning.md`, `module-2/morning-agent/latest.html` (Day 1, send it off); `team/what-goes-in.md` (Day 1, the door); `team/bet.md` (Day 1, write the bet).
- Produces: `team/<name>/doubts.md` (each person); `team/doubts.md` (product owner drives, the chosen doubt with its owner).
- Trainer-built: a fallback digest per group, for an agent that did not run.

**Room:** each person solo for phases 1–2; phase 3 is a trio decision, product owner writes the file. The decision is human (workshop §11).

**View summary:** You find out what your overnight agent actually ran on, read only the lines that came from your own material, and mark the one you trust least. The team picks the doubt that matters most for the bet.
