# Exercise: Read the *digest*

**Time:** 20 minutes.

**Session** *(new, "Day 2 - What came back")*

<span class="rt-code">Start a new Claude Code session in your training folder, `~/Documents/apt101/`.</span><span class="rt-cowork">Start a new Cowork task with `~/Documents/apt101/` as the working folder.</span>

```
/rename apt101-day-2
```

First, open the **Overnight digest** task in the Schedule sidebar. If its last run is from before Day 1 ended, click **Run now**, or paste its prompt into this session. It takes about five minutes; start Phase 1 when `module-2/morning-agent/latest.html` lands.

{{prompt:personal-agent-homework-3}}

Only a laptop that cannot run the brief at all takes the trainer's fallback digest.

**What you do:**

Each of your agents ran overnight on your own material, through the door your team agreed on Day 1. Before you read your digest, find out what actually ran: which job, on which files, and what it wrote. Then read it, mark the one line you trust least. Together you pick the doubt that matters most.

## Phase 1: See what ran

*5 min*

Each of you, on your own laptop. Ask Claude to keep a copy of the digest and of the two lines you wrote into the brief on Day 1, what to look for and what you expected, because tonight's run overwrites them. Then have it put four lines side by side, the digest's headline, your expectation, your look-for line and your bet, and report what ran overnight, on which material, as a ranked list with the source of each line.

{{prompt:apt101-d2-what-ran-overnight}}

Push back if the list comes back as a summary of the digest. You want lines and sources, not a second essay about the first one. Push back too if any of the four lines comes back paraphrased.

If the run read any file outside what your team agreed, read its name aloud to the other two and say what let it through: the door in `team/what-goes-in.md`, or your brief.

## Phase 2: Mark the line you trust least

*4 min*

Read your own digest. Every line in it came from your material. You know these sources. The agent read them once.

Pick the one line you trust least. Not the one that is plainly wrong; the one you would least want a priority call to rest on. Ask Claude to write it down with your reason.

{{prompt:apt101-d2-mark-the-doubt}}

If your doubt lands on a typo, look again.

## Phase 3: Read your lines aloud

*4 min*

Laptops half shut. Each of you reads your four lines to the other two: the headline, what you expected, your look-for line, your bet. Then ask, of each person's digest in turn:

- Is the headline the one you expected?
- Did it find what your line asked for?

## Phase 4: Ask it the other way round

*5 min*

Each of you, on your own laptop. Ask Claude to run your digest once more from the same brief, with only your look-for line turned round, and to set the two headlines side by side. Your Day 1 digest and brief stay as they are.

{{prompt:apt101-d2-ask-the-other-way}}

Each of you reads your two headlines aloud, the first and the one that came back the other way round.

## Phase 5: Pick the doubt

*2 min*

Each of you reads your doubt and its reason. Together, pick the one doubt that matters most for the bet in `team/bet.md`: the one that would change what you build if it turned out true.

That is a team call, not a vote, and nobody's agent makes it. The product owner writes the chosen doubt at the top of `team/doubts.md`, with whose line it was.

## Take stock

You have three doubts, one chosen, each tied to a line and a source. Each of you has two headlines from the same material, one for the line you wrote and one for its reverse, and the expectation you wrote before either. The digest read more than any of you could. Each of you still knew one source well enough to catch where it went past what was there.

<!-- maintainer -->

**Quality:** compendium-audited 2026-10-07 (behavior@0ac6010f pedagogy@761a20a3)
- judges @761a20a3: behavior PASS, pedagogy PASS (4 findings see instances/agentic-product-teams-101--exercise--apt101-read-the-digest.pedagogy.json)

**Role in Day 2:** opening exercise, beat 1. Turns the overnight digest from Day 1 into one doubt the team chose, which the outcome pick and the evidence run read next.

**Reuse:** return leg of Agents 101 `personal-agent-homework` (same `module-2/morning-agent/` paths). `personal-agent-homework-3` unchanged, for a run that did not fire. New: `apt101-d2-what-ran-overnight`, `apt101-d2-mark-the-doubt`, `apt101-d2-ask-the-other-way`.

**Frameworks:** none named in body. Read-where-you-know-most is named in `apt101-the-digest-is-back`, after this exercise. Hidden-spine thread 1 is lived here for every seat, whatever the Day 1 line asked: phase 3 sets the headline beside the expectation and the look-for line and asks only whether it is the expected one and whether it found what the line asked; phase 4 turns the line round on the same material (support → against; a test or both ways → support only), so every seat gets its own second headline. Nothing before the rerun names what kind of line it was. `apt101-why-it-agreed` names it after beat 3. The body states no mechanism. Phase 1 tests the door: a file read outside `team/what-goes-in.md` is read aloud with what let it through, the door or the brief.

**Artefacts:**
- Consumes: `module-2/morning-agent/morning.md` (its per-person `## Look for` line, written by `apt101-d1-your-look-for-line`, ), `team/<name>/expect.md` (Day 1's send it off), `module-2/morning-agent/latest.html` (Day 1, send it off); `team/what-goes-in.md` (Day 1, the door); `team/bet.md` (Day 1, write the bet; read in phase 1 beside the headline, and in phase 3).
- Produces: `team/<name>/digest-day1.html` (each person; the Day 1 digest kept before tonight's run overwrites `latest.html`; read by Day 3 what good means); `team/<name>/doubts.md` (each person; its head carries the Day 1 look-for and expect lines word for word, kept because tonight's brief replaces `morning.md`; available to Day 3's `caught.md` beat); `team/<name>/digest-against.html` (each person, phase 4; the same brief with the look-for line reversed; available to Day 3); `team/doubts.md` (product owner drives, the chosen doubt with its owner).
- Trainer-built: a fallback digest per group, only for a laptop that cannot run its own brief. A run that did not fire is rerun from the person's own brief (`personal-agent-homework-3`, about five minutes, from the morning float), so every seat reads a digest built from its own look-for line.

**Room:** each person solo for phases 1, 2 and 4; phases 3 and 5 are the trio, phase 5 a decision, product owner writes the file.

**Failure modes:** phase 1, the run did not fire (rerun from the person's own brief, five minutes); phase 2, the lines are read as confirmation (ask which line its source does not support); phase 3, a headline read as proof (ask what your line asked for); phase 4's rerun is slower than five minutes on a large memory (read the two headlines aloud when it lands, during phase 5); a turned-round run that finds nothing is a result, and its headline still says so. Phase 5, the doubt picked by seniority (each person says what would change if their doubt were true). The decision is human (workshop §11).

**Leap test:** on Monday each person (1) reads a research summary and marks the line they trust least, with its source; (2) asks the next digest for what argues against the bet as well as for it; (3) can say which sentence of their own brief chose their Day 1 headline.

**Open (maintainer):** the fallback digest for a laptop that cannot run the brief is a stand-in written from someone else's material, so that seat cannot mark a doubt on sources it knows. Alternatives: pair that seat with a neighbour's own run, or run the brief on that person's memory from a spare laptop.

**View summary:** You find out what your overnight agent actually ran on, keep a copy of its digest, read it where you know the material best, and mark the line you trust least. Each of you sets the headline beside what you expected and the look-for line you wrote, then runs the same brief with the line turned round. The team picks the doubt that matters most for the bet.
