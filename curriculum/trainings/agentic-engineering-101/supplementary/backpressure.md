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

**STATUS:** proper-length slide pass. Five slides; one `##` = one slide. Wired as an M5→M6 pre-read from `learn-from-the-test.md` § *Pre-reads before Module 6*. Audited — see the Quality line below. *(Corrected 2026-07-31: this block twice denied its own audit while the file carried a 2026-07-12 all-PASS one. Keep it present-tense state, not a changelog — `check_writing.md §3`.)* The far-half story lecture per `theory-plan.md` § Placement (Tier 0) + `theory-audit.md` § Tier 0. Reconciliation (eyeball-queue #2): this page teaches 4 laws + a governor, which exceeds the in-room ≤3-new-laws cap — but it is a reference/take-home supplementary (durable body, read at the student's pace, not delivered live), so it is exempt from the in-room cap, the same exemption already written into the `the-map-filled-in` and `the-loop-half-filled` dose verdicts.

**Proper-length pass verdicts (2026-07-02):** all skeleton bullets THICKENED to bolded-claim + mechanism (Family B durability-without-voice per bullet) · *What counts as a gate* section MERGED into *Checks compound the other way* (the gate list is the reset law's concrete instantiation, not its own law) · governor slide grown to three bullets on the shape of `the-loop-half-filled.md` § *The governor you carry forward* (the question itself · answer-sets-the-reach · repeated-answer-names-the-next-gate; both new bullets recombine in-file laws — session reach, position change — no new claims) · seam formulation (near half = you are the feedback; far half = engineer your replacement in the hot path, keep the judgment) landed in *The position change* slide 2nd bullet; map-position vocabulary only, no M-refs above the fence.

**Placement:** supplementary, linked from the M5 module file's pre-reads block into the M5→M6 gap (named-after: the student felt being-the-backpressure at M4's un-packaged send-off; M5's verifier work IS the first gate build). NOT linked from the M4 opener (would steal the felt-failure beat, `check_lectures §2`). The far-half map lecture stays container-only; this page is the story it points to once earned.

**Laws carried:** backpressure (frame) · chain-length + gates-reset-the-chain (the Family-A-fixed 0.85ⁿ: constant used as labeled arithmetic illustration only, subjunctive "if one step were", body now also names it "an illustration, not a measurement") · session-reach (house coinage, defined at first use) · position-change (durable replacement of hybrid-beats-autonomous per audit). Governor: first-check-that-isn't-me.

**Siblings:** `lectures/why-mostly-right-fails.md` (Claude Basics, same checks-compound-too mechanism, business-voiced) · Agents 101 `lectures/new-human-role-in-the-loop.md` (position-change story, M6 closer) · groundwork `design-the-filter` (business mat, Absorption).

<!-- backing -->

Claims
- `run-outproduces-your-review` · vision · "The agent generates faster than any human reads" ← none-owed
- `backpressure-named-in-flow-engineering` · borrowed · "**Backpressure**: the downstream stage signals upstream that it cannot take more" ← costa-backpressure
- `the-backpressure-is-you` · detail · "Any system that relies on a human to catch the problem is a system with a bottleneck" ← costa-backpressure
- `errors-compound-over-unverified-length` · detail · "If one step were 85 percent reliable" ← compound-arithmetic
- `a-gate-resets-the-chain` · vision · "**A gate resets the chain.**" ← none-owed
- `gates-go-inside-the-loop` · vision · "One big review at the end reads a chain that has already compounded." ← none-owed
- `a-gate-is-anything-that-pushes-back-without-you` · vision · "A failing test, a type error, a lint rule, a judge agent reading the diff" ← none-owed
- `tests-were-backpressure-before-agents` · vision · "The work is not inventing checks from nothing; it is pointing the existing ones at the agent" ← none-owed
- `session-reach` · vision · "**Session reach**: how far a run gets before it must stop and wait for you." ← none-owed
- `reach-is-the-lower-of-two-ceilings` · vision · "A frontier model behind thin gates still has short reach" ← none-owed

Sources
- costa-backpressure `[checked:2026-07-02 result:OK due:none]` https://www.lucasfcosta.com/blog/backpressure-is-all-you-need — [practitioner direct] Lucas F. da Costa, 2026-05-23. Byline, date and the quoted sentence verified verbatim. Durable account of an argument made once, so `due:none` rather than a calendar re-open. fallback: paraphrase as "practitioners now frame the human as the bottleneck stage" and drop the name.
- compound-arithmetic `[checked:2026-08-01 result:ATTESTED due:none]` (no URL — arithmetic) — [house canonical] 0.85 over ten unverified steps ≈ 0.20. **An illustration, not a measurement, and the body says so in those words.** The subjunctive framing in body ("if one step *were* 85 percent reliable") is deliberate and load-bearing — it is what stops a reader carrying 85% away as a per-step reliability constant for real systems. **Do NOT let an edit promote it to a measured figure** (zombie-stat guard, `theory-audit.md` § Family A). fallback: none; the arithmetic is checkable and the caveat is the claim.

Frameworks
- Backpressure · [borrow:flow engineering] · law:bandwidth-limited-channel · ← costa-backpressure
- Compound-reliability floor · [borrow:none] · law:compound-reliability-floor-0-85 · ← compound-arithmetic
- Absorption bottleneck · [borrow:none] · law:absorption-bottleneck · ← none — the human as the downstream stage that cannot take more
- Session reach · [borrow:none] · law:calibrated-delegation-frontier · ← none — house naming; reach as the lower of model ceiling and gate ceiling

Stance `[stance:2026-08-01 level:L1]`
- holds: that the human review stage is the binding constraint on a long run, and that gates inside the loop beat one review at the end. Costa is one named practitioner making the argument in print; the rest is arithmetic and design.
- contested: **the 85% premise, permanently.** No defensible per-step reliability figure exists for agentic chains at this generality, which is exactly why the body keeps it subjunctive. This is the page most at risk from a well-meaning edit that "firms up" a number, and the stamp exists to make that edit visibly wrong.
- would-move-it: real per-step reliability measurement, which would let the illustration become an example. A second practitioner naming the human-as-bottleneck stage would take the framing to L2.

OODA
- question: has anyone measured per-step reliability for agentic chains, and is backpressure catching on as agent vocabulary beyond Costa?
- roster: Lucas F. da Costa, METR, Hamel Husain, Dex Horthy, Simon Willison
- last-run: 2026-08-01

<!-- /backing -->
**Quality:** compendium-audited 2026-07-12 (writing@b3143a4 story@b3143a4 technical@b3143a4 behavior@b3143a4 pedagogy@b3143a4 strategy@b3143a4 slides@b3143a4)
- judges @b3143a4: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
