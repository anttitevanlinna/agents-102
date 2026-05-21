# Steering the wiring

At M5 you forked the M4 starting SHA into a worktree. A real engineering call lived in that fork: gitignored files (`CLAUDE.local.md`, `.claude/memory/`) don't ride into a worktree because git doesn't see them. AE101's default chose `cp` at fork time, your M1/M3 evidence rode forward, M5/M6 compounding diverged in the worktree, and post-M6 you decide what to merge back.

That's one wiring. It's not the only one.

## Four moves in the space

- **`cp` at fork time.** Copy the gitignored evidence across by hand after the worktree opens. UNIX pragmatism, no infrastructure invented.
- **Promote to user-level.** Move the rules that should ride everywhere up to `~/.claude/CLAUDE.md`. Auto-loads in every working directory, including worktrees. The cost is that they ride everywhere, including projects where they don't fit.
- **Rules as part of the reference artefact.** If a rule from M1/M3 matters for THIS task, it lands in the reference Claude reads explicitly. Selective inclusion per task, context economy stays explicit, no blanket auto-load.
- **Worktree as fresh compound loop.** M5/M6 produces its own rules from this run's evidence. Post-loop, you manually integrate worktree-rules back. The integration is itself a compound move.

## You steer

Four moves, four wirings, no canonical answer. You've now run an arc that touched the underlying mechanics, worktrees, reference + plan + verifier, compound loops, three-block memory. Pick the wiring that fits how you work.

At the start of this training, you might have asked someone what the right wiring is. The engineer you are at the close of M6 picks.

<!-- maintainer -->


**Quality:** draft 2026-05-21 (writing@TOUCHED story@TOUCHED technical@1ff6f8a behavior@1ff6f8a pedagogy@TOUCHED strategy@1ff6f8a)
- prior audit @1ff6f8a (2026-05-15): writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS — invalidated 2026-05-21 by section restructure (cut speculative-practitioner section after Antti flagged it as anti-practice: putting words in living practitioners' mouths who hadn't written this up).
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass), partial re-review 2026-05-21 (Antti flagged + approved restructure direction)

**Meta:**
- **Time:** 3–4 min, closer-shaped, lands inside M6 module after Spot-gaps exercise + before Arc-retrospective exercise.
- **Mood target:** the awe-shaped graduation move, "I'm the practitioner now." Lands the M6 closer mood (AE101 closes at M6). Watch for: mood drift toward "but which move is the right one?" (treating the four-move catalogue as a multiple-choice quiz). Diagnostic: student asks "but which one is right?" Fix: name that there's no canonical answer; the student's pick is the artefact this lecture produces.
- **Frameworks riffed on:** the four practitioner postures already named in M2 (Cherny worktrees), M5 (Ronacher three-pattern; Klaassen compound), M4 (Huryn three blocks). No re-attribution here; the four moves stand on their own, the student can map them back to the postures if they want.
- **Voice quartet:** Rory-leading (the counterintuitive reframe, there's no canonical answer). Boris-grounding (the `cp` move named, not narrated). Godin-warming ("you steer"). Martin-spare (no strategic-deck vocabulary).
- **Pedagogical bet:** the wiring question is an opportunity to name the practitioner-judgement move. M6 is where the student earns the call; this lecture frames the call as a real one with no canonical answer, then hands it to them. The 2026-05-21 restructure removed the named-practitioner speculation that was undercutting the bet (presenting four authority-shaped answers before saying "you steer").

**Open for next pass:**
- Re-audit all six classes once the body settles (writing + story + pedagogy classes flagged TOUCHED above).
