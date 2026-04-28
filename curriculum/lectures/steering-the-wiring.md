# Steering the wiring

**Time:** 3–4 minutes.

At M5 you forked the M4 starting SHA into a worktree. A real engineering call lived in that fork: gitignored files (`CLAUDE.local.md`, `.claude/memory/`) don't ride into a worktree because git doesn't see them. AE101's default chose `cp` at fork time — your M1/M3 evidence rode forward, M5/M6 compounding diverged in the worktree, and post-M6 you decide what to merge back.

That's one wiring. It's not the only one.

## How four practitioners would probably wire this

(All guesses. None of them have written this up. Read these as readings of their posture, not citations.)

**Boris Cherny (Claude Code, parallel-worktree evangelist).** Probably wouldn't accept a tooling loss because gitignore happens to bite. Either `cp ../<repo>/CLAUDE.local.md .` at fork time, or moves stuff that should ride everywhere up to `~/.claude/CLAUDE.md` (user-level, auto-loads in every working directory). Pragmatic UNIX move; doesn't engineer around the fact for long.

**Armin Ronacher (three-pattern).** Probably says the rules ARE part of the reference artefact. M5 builds reference + plan.md + verifier — if a rule from M1/M3 matters for THIS task, it lands in the reference where Claude reads it explicitly. Selective inclusion, not blanket auto-load. The three-pattern's whole point is making context economy explicit per task; "auto-load everything" is what M5 is teaching against.

**Kieran Klaassen (compound engineering).** Probably treats it as rules-as-session-evidence. M5 worktree starts fresh; M5/M6 compound from THIS run's evidence. Original repo's rules are the M1+M3 baseline kept for reference but not gospel. Each loop produces its own rules; the next loop reviews and integrates. Post-M6, the student manually integrates worktree-rules back into original — the integration IS a compound move.

**Paweł Huryn (three-block memory).** Probably says memory is wherever the agent reads it from. Don't conflate file path with discipline. The three blocks (observations, decisions, quality criteria) are a frame — they live in `.claude/memory/`, in CLAUDE.md, in skills, wherever the engineer puts them. The worktree-fork forces the question: which blocks transfer to the new context? That's a real engineering conversation, not infrastructure to hide.

## You steer

Four practitioners, four reads. You've now run an arc that touched all four moves — Cherny's worktrees, Ronacher's reference + plan + verifier, Klaassen's compound loop, Huryn's three blocks. Their guessed answers above aren't the lesson. The lesson is that you can read the question for yourself now and pick the wiring that fits how YOU work.

The student you started this training as would have asked someone what the right wiring is. The engineer you are at the close of M6 picks.

<!-- maintainer -->


**Quality:** draft 2026-04-28 (new lecture; not yet sim/audited)

**Meta:**
- **Time:** 3–4 min, closer-shaped, lands inside M6 module after Spot-gaps exercise + before Arc-retrospective exercise.
- **Mood target:** the awe-shaped graduation move — "I'm the practitioner now." Lands the M6 → M7/M8-equivalent transition (AE101 closes at M6, so this carries the closer mood). Watch for: mood drift toward "but Claude/Cherny would actually do X" (treating the guess as authority). Diagnostic: student asks "but which one is right?" Fix: name that all four are guesses, none of them have written this; the student's pick is the artefact this lecture produces.
- **Frameworks riffed on:** the four practitioner postures already named in M2 (Cherny worktrees), M5 (Ronacher three-pattern; Klaassen compound), M4 (Huryn three blocks). No new attribution; this lecture composes what's already been named.
- **Voice quartet:** Rory-leading (the counterintuitive reframe — there's no canonical answer). Boris-grounding (the actual `cp` move). Godin-warming ("you steer"). Martin-spare (no strategic-deck vocabulary).
- **Pedagogical bet:** the wiring question is an opportunity to name the practitioner-judgement move. M6 is where the student earns the call; this lecture frames the call as a real one with no canonical answer, then hands it to them.

**Open for next pass:**
- Consider one more practitioner read if a fifth practitioner posture earns its name in M5/M6 evidence (e.g., a Pocock or Willison move on context economy). Three or four is the sweet spot; five risks list-shaped.
- Live-test whether `~/.claude/CLAUDE.md` user-level auto-load is the actual current Cherny default (his own rules-file location). The Boris guess above assumes user-level + worktree `cp` are both in play.
