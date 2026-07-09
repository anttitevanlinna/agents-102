# Backpressure

## The run outproduces your review

- A longer run produces more than you can inspect. The agent generates faster than any human reads, and every extra hour of run time widens the gap between what was produced and what has been judged.
- Flow engineering has a name for the fix. **Backpressure**: the downstream stage signals upstream that it cannot take more, and the producer slows down, buffers, or sheds load. TCP does it. Message queues do it.
- In the agent loop today, the backpressure is you. Every unread diff is a queue backing up in your review pile. "Any system that relies on a human to catch the machine's mistakes will be limited by the human, not the machine" (Lucas F. da Costa).

## Checks compound the other way

- Errors compound over unverified chain length. Enough mostly-right steps in a row and the end of the chain is mostly wrong. If one step were 85 percent reliable, ten unverified steps in a row would land near 20. The arithmetic is an illustration, not a measurement; the mechanism is what holds.
- **A gate resets the chain.** A check inside the loop catches the bad step before the next step builds on it, so everything after the check builds on verified ground. The same compounding that ruins unchecked runs works for checked ones.
- So the gates go inside the loop, at every iteration. One big review at the end reads a chain that has already compounded. A check per step keeps every chain short.
- A gate is anything that pushes back without you. A failing test, a type error, a lint rule, a judge agent reading the diff, a plan review before code, a monitor watching the merged PR.
- Tests and types were backpressure for humans long before agents. The work is not inventing checks from nothing; it is pointing the existing ones at the agent, and adding the gates that are still missing.

## Session reach

- **Session reach**: how far a run gets before it must stop and wait for you. The useful distance between a send-off and the first moment where your judgment is the only thing that can move the work forward.
- The model sets one ceiling; your gates set the other. Reach is the lower of the two. A frontier model behind thin gates still has short reach: every step past the last check is unverified chain, and the compounding above takes over.
- The two ceilings move differently. The model ceiling moves on its own, every few months, whether you do anything or not. The gate ceiling moves only when you build. Waiting for a better model raises one ceiling and leaves the other exactly where it is.

## From inline inspector to gate designer

- With gates in place, the job moves. Less inline inspector, more gate designer. You read the exceptions the gates raise, not the stream of everything produced.
- On the near half of the map, you were the feedback. Plans pushed back on, diffs read, tests watched: your judgment sat inline, in the loop's hot path. On the far half, you engineer your replacement in that path and keep the judgment.
- You never leave the loop. You move to the one place in it where human judgment is the only thing that belongs: deciding what the gates hold, and what happens when one fires.

## The first check that isn't you

- Before a send-off: *what is the first check this run will hit that is not me?* If the answer is nothing, you are the gate infrastructure, and the run reaches exactly as far as you can watch.
- The answer sets the reach you grant. A run that hits a real gate within its first few steps can be sent far. A run whose first check is your read at the end stays short, no matter how good the model is.
- The same answer twice is a gate worth building. When one class of work keeps arriving with nothing but you in its path, the question has found a missing gate. Build it once, and every later run of that shape reaches further.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** handles kept bold: **Backpressure** (term at its definition), **A gate resets the chain** (the law), **Session reach** (house coinage at its definition); governor question set plain-italic, all other bullet leads de-bolded, da Costa quote plain, per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut; 0.85/ten-steps illustration untouched (zombie-stat guard below still holds). Re-audit before ship.

**STATUS:** proper-length slide pass (2026-07-02, slides-only pass, unaudited). Five slides; one `##` = one slide. WIRED as an M5→M6 pre-read from `learn-from-the-test.md` § *Pre-reads before Module 6* (the earlier UNWIRED note was stale). No Quality line by design (unaudited). The far-half story lecture per `theory-plan.md` § Placement (Tier 0) + `theory-audit.md` § Tier 0. Reconciliation (eyeball-queue #2): this page teaches 4 laws + a governor, which exceeds the in-room ≤3-new-laws cap — but it is a reference/take-home supplementary (durable body, read at the student's pace, not delivered live), so it is exempt from the in-room cap, the same exemption already written into the `the-map-filled-in` and `the-loop-half-filled` dose verdicts.

**Proper-length pass verdicts (2026-07-02):** all skeleton bullets THICKENED to bolded-claim + mechanism (Family B durability-without-voice per bullet) · *What counts as a gate* section MERGED into *Checks compound the other way* (the gate list is the reset law's concrete instantiation, not its own law) · governor slide grown to three bullets on the shape of `the-loop-half-filled.md` § *The governor you carry forward* (the question itself · answer-sets-the-reach · repeated-answer-names-the-next-gate; both new bullets recombine in-file laws — session reach, position change — no new claims) · seam formulation (near half = you are the feedback; far half = engineer your replacement in the hot path, keep the judgment) landed in *The position change* slide 2nd bullet; map-position vocabulary only, no M-refs above the fence.

**Placement:** supplementary, linked from the M5 module file's pre-reads block into the M5→M6 gap (named-after: the student felt being-the-backpressure at M4's un-packaged send-off; M5's verifier work IS the first gate build). NOT linked from the M4 opener (would steal the felt-failure beat, `check_lectures §2`). The far-half map lecture stays container-only; this page is the story it points to once earned.

**Laws carried:** backpressure (frame) · chain-length + gates-reset-the-chain (the Family-A-fixed 0.85ⁿ: constant used as labeled arithmetic illustration only, subjunctive "if one step were", body now also names it "an illustration, not a measurement") · session-reach (house coinage, defined at first use) · position-change (durable replacement of hybrid-beats-autonomous per audit). Governor: first-check-that-isn't-me.

**Siblings:** `lectures/why-mostly-right-fails.md` (Claude Basics, same checks-compound-too mechanism, business-voiced) · Agents 101 `lectures/new-human-role-in-the-loop.md` (position-change story, M6 closer) · groundwork `design-the-filter` (business mat, Absorption).

**Source verification — MUST DO before first cohort:**
- `[checked:2026-07-02 result:OK due:2027-01-02]` https://www.lucasfcosta.com/blog/backpressure-is-all-you-need — [practitioner direct] (Lucas F. da Costa, 2026-05-23). Byline, date, and the quoted sentence verified verbatim 2026-07-02. fallback: paraphrase as "practitioners now frame the human as the default backpressure" without quote.
- The 0.85/ten-steps arithmetic is an illustration, not an empirical claim (subjunctive framing in body is deliberate — keep it; the body labels it "an illustration, not a measurement"). Do NOT let edits promote it to a measured constant (zombie-stat guard, `theory-audit.md` § Family A).
