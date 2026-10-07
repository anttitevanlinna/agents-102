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

Each of you, on your own laptop. Ask Claude to keep a copy of the digest and of the look-for line you wrote into the brief, because tonight's run overwrites both. Then have it put three lines side by side, the digest's headline, your bet and your own look-for line, and report what ran overnight, on which material, as a ranked list with the source of each line.

**Prompt** · `apt101-d2-what-ran-overnight`, first copies `module-2/morning-agent/latest.html` to `team/<your-name>/digest-day1.html` unchanged, and writes the look-for line I wrote on Day 1 in `module-2/morning-agent/morning.md`, word for word, at the head of `team/<your-name>/doubts.md`; then reads `morning.md`, the run's `latest.html`, `team/what-goes-in.md` and `team/bet.md`; shows three lines side by side, quoted exactly: the digest's headline, the hypothesis in `team/bet.md` it speaks to, and my look-for line; then reports which job ran, which files it read (and any it read that sit outside what your team agreed), and lists every claim in the digest ranked by how much a decision would rest on it, each with the source file it came from or "no source"

Push back if the list comes back as a summary of the digest. You want lines and sources, not a second essay about the first one. Push back too if any of the three lines comes back paraphrased.

## Phase 2: Mark the line you trust least

*4 min*

Read your own digest. Every line in it came from your material. You know these sources. The agent read them once.

Pick the one line you trust least. Not the one that is plainly wrong; the one you would least want a priority call to rest on. Ask Claude to write it down with your reason.

**Prompt** · `apt101-d2-mark-the-doubt`, appends the line I quote, its source, and my reason in my words to `team/<your-name>/doubts.md`, then checks the source and tells me what it actually says next to the digest's line

If your doubt lands on a typo, look again.

## Phase 3: Read the three lines aloud, pick the doubt

*6 min*

Laptops half shut. Each of you reads your three lines to the other two: the headline, the bet, your look-for line. Then ask, of each person's digest in turn:

- Does the headline say what your bet says?
- Which sentence of yours asked for it?

Then each of you reads your doubt and its reason. Together, pick the one doubt that matters most for the bet in `team/bet.md`: the one that would change what you build if it turned out true.

That is a team call, not a vote, and nobody's agent makes it. The product owner writes the chosen doubt at the top of `team/doubts.md`, with whose line it was.

## Take stock

You have three doubts, one chosen, each tied to a line and a source, and each of you has your own look-for line kept beside the headline it got back. The digest read more than any of you could. Each of you still knew one source well enough to catch where it went past what was there.

<!-- maintainer -->

**Role in Day 2:** opening exercise, beat 1. Turns the overnight digest from Day 1 into one doubt the team chose, which the outcome pick and the evidence run read next.

**Reuse:** new. Return leg of Agents 101 `personal-agent-homework` (same `module-2/morning-agent/` paths; no keys reused, since homework-1–3 set the agent up rather than read it back).

**Frameworks:** none named in body. Read-where-you-know-most and the agreeable-summary point are named in `apt101-the-digest-is-back`, placed after this exercise so it names what the trio just found. Phase 3's second question is the find of hidden-spine thread 1: the trio traces the agreement to its own look-for line here; `apt101-why-it-agreed` names it after beat 3. The body states no mechanism.

**Artefacts:**
- Consumes: `module-2/morning-agent/morning.md` (its per-person look-for line, written by `apt101-d1-your-look-for-line`), `module-2/morning-agent/latest.html` (Day 1, send it off); `team/what-goes-in.md` (Day 1, the door); `team/bet.md` (Day 1, write the bet; read in phase 1 beside the headline, and in phase 3).
- Produces: `team/<name>/digest-day1.html` (each person; the Day 1 digest kept before tonight's run overwrites `latest.html`; read by Day 3 what good means); `team/<name>/doubts.md` (each person; its head carries the Day 1 look-for line word for word, kept because tonight's brief replaces `morning.md`; available to Day 3's `caught.md` beat); `team/doubts.md` (product owner drives, the chosen doubt with its owner).
- Trainer-built: a fallback digest per group, for an agent that did not run.

**Room:** each person solo for phases 1–2; phase 3 is a trio decision, product owner writes the file. The decision is human (workshop §11).

**View summary:** You find out what your overnight agent actually ran on, keep a copy of its digest, read it where you know the material best, and mark the line you trust least. Each of you sets the headline beside your bet and the look-for line you wrote. The team picks the doubt that matters most for the bet.
