# Exercise: Read the *digest*

**Time:** 15 minutes.

**Session** *(new, "Day 2 - What came back")*

<span class="rt-code">Start a new Claude Code session in your training folder, `~/Documents/apt101/`.</span><span class="rt-cowork">Start a new Cowork task with `~/Documents/apt101/` as the working folder.</span>

```
/rename apt101-day-2
```

**What you do:**

Each of your agents ran overnight on your own material, through the door your team agreed on Day 1. Before you read your digest, find out what actually ran: which job, on which files, and what it wrote. Then read it and mark the one line you trust least. Together you pick the doubt that matters most.

If your agent did not run, the trainer has a fallback digest built from the same kind of material. Drop it into `module-2/morning-agent/latest.html` and carry on.

## Phase 1: See what ran

*5 min*

Each of you, on your own laptop. Ask Claude to keep a copy of the digest first, because tonight's run overwrites it, then report what ran overnight, on which material, and what it wrote, as a ranked list with the source of each line.

**Prompt** · `apt101-d2-what-ran-overnight`, first copies `module-2/morning-agent/latest.html` to `team/<your-name>/digest-day1.html` unchanged; then reads `module-2/morning-agent/morning.md`, the run's `module-2/morning-agent/latest.html` and `team/what-goes-in.md`; reports which job ran, which files it read (and any it read that sit outside what your team agreed), and lists every claim in the digest ranked by how much a decision would rest on it, each with the source file it came from or "no source"

Push back if the list comes back as a summary of the digest. You want lines and sources, not a second essay about the first one.

## Phase 2: Mark the line you trust least

*5 min*

Read your own digest. Every line in it came from your material. You know these sources. The agent read them once.

Pick the one line you trust least. Not the one that is plainly wrong; the one you would least want a priority call to rest on. Ask Claude to write it down with your reason.

**Prompt** · `apt101-d2-mark-the-doubt`, appends the line I quote, its source, and my reason in my words to `team/<your-name>/doubts.md`, then checks the source and tells me what it actually says next to the digest's line

If your doubt lands on a typo, look again.

## Phase 3: Pick the doubt that matters most

*5 min*

Laptops half shut. Each of you reads your doubt and its reason to the other two. Together, pick the one doubt that matters most for the bet in `team/bet.md`: the one that would change what you build if it turned out true.

That is a team call, not a vote, and nobody's agent makes it. The product owner writes the chosen doubt at the top of `team/doubts.md`, with whose line it was.

## Take stock

You have three doubts, one chosen, each tied to a line and a source. The digest read more than any of you could. Each of you still knew one source well enough to catch where it went past what was there.

<!-- maintainer -->

**Role in Day 2:** opening exercise, beat 1. Turns the overnight digest from Day 1 into one doubt the team chose, which the outcome pick and the evidence run read next.

**Reuse:** new. Return leg of Agents 101 `personal-agent-homework` (same `module-2/morning-agent/` paths; no keys reused, since homework-1–3 set the agent up rather than read it back).

**Frameworks:** none named in body. Read-where-you-know-most and the agreeable-summary point are named in `apt101-the-digest-is-back`, placed after this exercise so it names what the trio just found.

**Artefacts:**
- Consumes: `module-2/morning-agent/morning.md`, `module-2/morning-agent/latest.html` (Day 1, send it off); `team/what-goes-in.md` (Day 1, the door); `team/bet.md` (Day 1, write the bet).
- Produces: `team/<name>/digest-day1.html` (each person; the Day 1 digest kept before tonight's run overwrites `latest.html`; read by Day 3 what good means); `team/<name>/doubts.md` (each person); `team/doubts.md` (product owner drives, the chosen doubt with its owner).
- Trainer-built: a fallback digest per group, for an agent that did not run.

**Room:** each person solo for phases 1–2; phase 3 is a trio decision, product owner writes the file. The decision is human (workshop §11).

**View summary:** You find out what your overnight agent actually ran on, keep a copy of its digest, read it where you know the material best, and mark the line you trust least. The team picks the doubt that matters most for the bet.
