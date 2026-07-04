# Steering the wiring

The worktree fork at M5 (the second working copy git checked out so the packaged re-run could start clean) ran on one wiring. It's not the only one.

## Four wirings for evidence across a worktree fork

- **Gitignored files don't ride into a worktree.** Git doesn't see `CLAUDE.local.md` or `observations/`, so the M5 fork of the M4 starting SHA forced a real engineering call. AE101's default chose `cp`: your M1/M3 evidence rode forward, M5/M6 compounding diverged in the worktree, and post-M6 you decide what merges back.
- **`cp` at fork time.** Copy the gitignored evidence across by hand after the worktree opens. UNIX pragmatism: no infrastructure invented, nothing new to maintain.
- **Promote to user-level.** Move the rules that should ride everywhere up to `~/.claude/CLAUDE.md`. Auto-loads in every working directory, including worktrees. The cost is that they ride everywhere, including projects where they don't fit.
- **Rules inside the reference artefact.** If a rule from M1/M3 matters for THIS task, it lands in the reference Claude reads explicitly. Selective inclusion per task; context economy stays explicit; no blanket auto-load.
- **Worktree as fresh compound loop.** M5/M6 produces its own rules from this run's evidence, and post-loop you integrate the worktree rules back by hand. The integration is itself a compound move.

## You steer

- **Four moves, four wirings, no canonical answer.** You've now run an arc that touched the underlying mechanics: worktrees, reference + plan + verifier, compound loops, three-block memory (observations, decisions, quality criteria). Pick the wiring that fits how you work.
- **The pick is the graduation.** At the start of this training, you might have asked someone what the right wiring is. The engineer you are at the close of M6 picks.

<!-- maintainer -->

**Slides-only pass (2026-07-02, unaudited):** intro paragraph REDUCED to a one-line lede; its fork mechanism (gitignored files don't ride worktrees, `cp` default, M5/M6 divergence, merge-back call) FOLDED into *Four moves in the space* as the opening bullet. *Four moves in the space* CONVERTED in place: bullets thickened to proper length (each already had a bolded claim; mechanism sentences completed); five bullets with the mechanism opener, inside the 3–6 range. *You steer* CONVERTED from prose to two bullets; below the 3-bullet floor by design — the graduation beat is two claims, and padding it would be restatement-as-progress. "The engineer you are at the close of M6 picks" kept verbatim (approved frame). M1/M3/M4/M5/M6 refs KEPT under the `check_lectures §3` consolidation carve-out: the lecture's SUBJECT is the wiring call threaded through the lived arc (where the fork happened, which evidence rode, where compounding diverged) — recognition, not sequencing.

- completeness-review minor 2 fix 2026-07-03: two exercise-only vocabulary glosses added for handbook readers — lede glosses "worktree fork" with a parenthetical (second working copy for a clean packaged re-run), *You steer* bullet 1 glosses "three-block memory" with the three block names per training-architecture.md. Huryn attribution deliberately NOT re-added — earned at the M4 exercise; the *Frameworks riffed on* meta below already declines re-attribution.
- section-3 sweep 2026-07-02: 13 module-number refs across 5 body sites judged, 0 fixed, all carve-out (M6 consolidation closer whose subject is the lived arc; every ref is backward recognition — where the fork happened, which evidence rode — and none is a forward bridge; "post-M6" is the graduation handoff, AE101 closes at M6).

**Quality:** compendium-audited 2026-05-26 (writing@0ef2ca6 story@0ef2ca6 technical@0ef2ca6 behavior@1ff6f8a pedagogy@TOUCHED strategy@1ff6f8a) — predates the slide rework; re-audit before ship.
- judges @0ef2ca6: writing PASS, story PASS, technical PASS, behavior grandfathered, pedagogy grandfathered, strategy grandfathered
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass), partial re-review 2026-05-21 (Antti flagged + approved restructure direction)

**Meta:**
- **Time:** 3–4 min, closer-shaped, lands inside M6 module after Spot-gaps exercise + before Arc-retrospective exercise.
- **Mood target:** the awe-shaped graduation move, "I'm the practitioner now." Lands the M6 closer mood (AE101 closes at M6). Watch for: mood drift toward "but which move is the right one?" (treating the four-move catalogue as a multiple-choice quiz). Diagnostic: student asks "but which one is right?" Fix: name that there's no canonical answer; the student's pick is the artefact this lecture produces.
- **Frameworks riffed on:** the four practitioner postures already named in M2 (Cherny worktrees), M5 (Ronacher three-pattern; Klaassen compound), M4 (Huryn three blocks). No re-attribution here; the four moves stand on their own, the student can map them back to the postures if they want.
- **Voice quartet:** Rory-leading (the counterintuitive reframe, there's no canonical answer). Boris-grounding (the `cp` move named, not narrated). Godin-warming ("you steer"). Martin-spare (no strategic-deck vocabulary).
- **Pedagogical bet:** the wiring question is an opportunity to name the practitioner-judgement move. M6 is where the student earns the call; this lecture frames the call as a real one with no canonical answer, then hands it to them. The 2026-05-21 restructure removed the named-practitioner speculation that was undercutting the bet (presenting four authority-shaped answers before saying "you steer").

**Open for next pass:**
- Re-audit all six classes once the body settles (writing + story + pedagogy classes flagged TOUCHED above; slide rework touches all).
