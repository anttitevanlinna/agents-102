# The ironies of automation

## Monitoring and takeover run on the same reps

- This is a 1983 result, not an AI take. Lisanne Bainbridge, studying industrial automation: automate the reliable middle of a task, and the human keeps exactly two jobs. Monitor for the rare failure. Take over when it happens.
- Both jobs demand hands-on fluency. Monitoring only works if you can tell wrong from right at a glance. Takeover only works if the manual skill is still there. Both ride on the reps of doing the task yourself.
- The irony: daily automation quietly removes those reps. Skills deteriorate when they are not used. The better the automation, the less you do the task by hand, and the worse you are at the moment you are needed most. Bainbridge's phrasing: a formerly experienced operator who has been monitoring an automated process "may now be an inexperienced one."

## Trust and vigilance move in opposite directions

- Earned trust is exactly what breeds the miss. Watch a system that is highly but imperfectly reliable, and your own detection performance degrades. The automation-studies literature named this **overreliance**: trusting the machine past the point where you still catch its errors (Parasuraman and Riley's use, misuse, disuse).
- The more runs the agent lands cleanly, the worse you get at catching the one that doesn't. Each clean run is real evidence of competence and real erosion of your vigilance, at the same time. The more autonomy the agent earns, the worse a watcher you quietly become.
- Trust and vigilance move in opposite directions. The same observed competence that earns the agent more autonomy degrades the attention you bring to the next run. The trust is deserved. The watching still has to be engineered. So when the next run lands clean, ask the plain question first: when did you last do this kind of work by hand?

<!-- maintainer -->

**Title restored (2026-07-27, Antti call):** H1 back to *The ironies of automation* — a named canonical result (Bainbridge 1983) whose title is the searchable handle, same carve-out as `the-lethal-trifecta`. The 2026-07-12 strategy finding (§3 lead-with-discipline) is answered at header level: both slide headers keep their fe18297 mechanism-led rewrites. The interim H1 *Calibrated vigilance* overshot the fix two ways: it named a discipline this opener deliberately does not teach (scope held to naming the trap; the fix-moves were dropped as closer material — see Scope held below), and it planted "calibrated" one module before M5 earns calibration (judge-vs-labels, calibrated agency, the frontier), giving the modifier a second meaning. Strategy judges: do not re-flag the title; discipline-lead is satisfied by the headers, and the failure-named canonical handle is kept by design.

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** both slides are narrative; bullets kept, all leads de-bolded. One handle survives: **overreliance**, at the Parasuraman-and-Riley naming beat on slide 2. Bainbridge quote and all wording intact. Per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. No claims added or cut.

**Promotion (2026-07-03, Antti-directed):** supplementary → M4 lecture, wired into `run-the-first-experiment.md` (placement since moved — see Placement rationale). Same operation that promoted `the-agent-loop` and `the-gate-is-a-claim` earlier this run. Slide-format pass per `theory-plan.md` § Slide format + dosage: two slides (the Bainbridge paradox · the complacency half). Bullets carried from the supplementary body, which was already slide-shaped.

**Scope held (framing-level only).** This is the OPENER version: it names the SHAPE of the trap (vigilance erodes exactly as trust is earned) and stops there. The supplementary's third section — *The moves* (keep manual reps · calibrate your own miss rate · let the gates carry the vigilance) — was dropped: those are fix-moves, closer/consolidation material, not an opener's job, and the third one tied back to `supplementary/backpressure.md`. Felt-before-named held: no goal-drift / context-rot / plausible-but-wrong named here (M4 lets the student FEEL those; M5 names them). The application bullet stays generic ("the one that doesn't" land cleanly) so it primes without spoiling the felt failure.

**Placement rationale:** sits at `run-the-first-experiment.md § Send the task off`, immediately before the send-off mechanics — the "you are the watcher now" beat, where the trap (the better you trust the long run, the worse you watch it) bites hardest. Moved from the opening stack (arc-read finding: four lectures before the exercise was M4's biggest pacing drag; `check_lectures §2` wants a light open before a contrast-mood module). Framing lecture, not a teaching lecture — it arms a lens, it does not hand the fixes.

**Unwiring (promotion = relocation):** the M6 back-pointer was already removed this run (`spot-gaps-build-the-loop.md § Next`, see that file's 2026-07-03 wiring-cleanup note). Still open for the cleanup pass: the `ironies-of-automation` row in `TRAININGS['agentic-engineering-101'].supplementaries` (`site/layouts/curriculum.js`) and the `'supplementary/ironies-of-automation'` whitelist line in `scripts/build-workbook.js` — a promoted-to-lecture slug is inlined, not a registered supplementary, so both need the row dropped (mirror the `the-agent-loop` deregistration). Reversibility: git carries the supplementary + its registration. Only the module wiring edited in this pass.

**EYEBALL questions (Antti):**
1. **Slide budget.** +2 slides onto M4's already-flagged raw count (the-agent-loop's eyeball #3 put M4 at ~15 vs the ~6 budget; these two are re-chunked supplementary content, no new teaching load). Cut to one slide (fold the paradox and the complacency half together), or accept two?
2. **Mood contract.** The paradox is meant to land as a live tension to watch for, not a prediction of failure. Send-off placement is the remedy already applied; if in rehearsal it still reads as *"you will miss the bad run,"* thin it to one slide.

**Quality:** compendium-audited 2026-07-27 (writing@c202a8d story@c202a8d technical@c202a8d behavior@c202a8d pedagogy@c202a8d strategy@c202a8d slides@c202a8d)
- judges @c202a8d: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Mood target:** curious readiness held (the module's target), with the earned-trust paradox as a named tension. Primes rather than consolidates.

**Time:** 2–3 min target (framing opener, projected). Past 3 in rehearsal = it has started teaching the fixes, which belong to the far half's closers, not here.

**Voice:** Rory-reframe on the counterintuitive turn (trust and vigilance moving opposite ways), Boris-flat on the mechanism. Risto does NOT lead — forward-optimism would resolve the unease the opener means to open.

<!-- backing -->

Format → `curriculum/backing-format.md`. Absorbed 2026-08-01 from the legacy `**Source verification — freshness stamps**` block and the `**Laws carried:**` line — those are gone, this is the only copy. Both stamps moved to the foundational-literature variant (`due:none`): Bainbridge 1983 and Parasuraman & Riley 1997 are canonical papers, and the 6-month window would flag them STALE as an artifact of the rule, not a defect in the material.

**The structural note this block exists to surface.** Every sourced claim here is about *industrial process control in 1983 and 1997*. Every claim the student acts on is about *a coding agent in 2026*. The two are joined by an analogy the file never argues for and no source in it covers. That step is the lecture's real load-bearing move, it is currently `vision`, and it is what the OODA question below hunts.

**Claims**
- `is-a-1983-result` · detail · "This is a 1983 result, not an AI take." ← bainbridge-ironies
- `two-jobs` · borrowed · "automate the reliable middle of a task, and the human keeps exactly two jobs. Monitor for the rare failure. Take over when it happens." ← bainbridge-ironies
- `both-jobs-ride-on-reps` · detail · "Both jobs demand hands-on fluency... Both ride on the reps of doing the task yourself." ← bainbridge-ironies
- `skills-deteriorate` · detail · "Skills deteriorate when they are not used" / "may now be an inexperienced one." ← bainbridge-ironies. Verified verbatim on the author's own site; the strongest-backed line in the file.
- `overreliance-named` · borrowed · "The automation-studies literature named this **overreliance**: trusting the machine past the point where you still catch its errors (Parasuraman and Riley's use, misuse, disuse)." ← parasuraman-riley
- `detection-degrades` · detail · "Watch a system that is highly but imperfectly reliable, and your own detection performance degrades." ← parasuraman-riley. **Abstract-level only.** The quantified complacency result lives in the constant-reliability primaries P&R review (Parasuraman, Molloy & Singh 1993), which **has not been opened by anyone on this file**. The line is deliberately qualitative for that reason. Do not add a number, and do not harden back to "collapses", without opening that primary first.
- `transfer-to-agents` · vision · "The more runs the agent lands cleanly, the worse you get at catching the one that doesn't." ← none-owed — **and this is the claim to watch.** The analogical step from supervising a chemical plant to supervising a coding agent is the maintainer's framing, not a finding either cited paper supports. Marked `vision` honestly rather than borrowing the 1983 paper's authority for a 2026 claim it does not make. If in-window practitioner evidence of engineer skill atrophy under coding agents turns up, this graduates to `detail` and gets a real stamp. See OODA.
- `each-clean-run-cuts-both-ways` · vision · "Each clean run is real evidence of competence and real erosion of your vigilance, at the same time." ← none-owed
- `trust-vigilance-opposite` · vision · "Trust and vigilance move in opposite directions." ← none-owed — the lecture's own synthesis, and the sentence the title is built on.
- `watching-must-be-engineered` · vision · "The trust is deserved. The watching still has to be engineered." ← none-owed
- `ask-when-by-hand` · vision · "when did you last do this kind of work by hand?" ← none-owed — the design's own move, and deliberately the only thing the opener asks the student to do.

**Sources**
- bainbridge-ironies `[checked:2026-07-02 result:OK due:none]` https://www.complexcognition.co.uk/2021/06/ironies-of-automation.html — [academic/research] Bainbridge, *Ironies of Automation*, Automatica 19(6), 1983. Foundational, `due:none` (was `due:2027-01-02`; converted 2026-08-01 per `backing-format.md` § Foundational-literature variant). Full text on the author's own site, verified live 2026-07-02. Two-jobs framing confirmed (monitor + take over, §1.1); skill-atrophy confirmed verbatim: *"physical skills deteriorate when they are not used ... a formerly experienced operator who has been monitoring an automated process may now be an inexperienced one."* **Population, stated because it is the whole question (§12):** human operators of automated industrial process-control systems. Not knowledge work, not software authorship, not agents. fallback: none needed for what it backs; it cannot be stretched to cover `transfer-to-agents`.
- parasuraman-riley `[checked:2026-07-02 result:OK due:none]` https://journals.sagepub.com/doi/10.1518/001872097778543886 — [academic/research] Parasuraman & Riley, *Humans and Automation: Use, Misuse, Disuse, Abuse*, Human Factors 39(2), 1997. Foundational, `due:none` (converted 2026-08-01, same reason). **Abstract-level verification only — the full text has not been opened**, so nothing beyond the abstract may be quoted. Abstract carries the exact line the body leans on: *"misuse refers to overreliance on automation, which can result in failures of monitoring or decision biases."* fallback: attribute the taxonomy only.

**Frameworks**
- Ironies of automation · [borrow:human factors / automation studies] · law:trust-is-earned-through-observed-competence · ← bainbridge-ironies. Named in the body by author and year, which is the point — `check_writing.md §6` wants the canonical handle kept, and the 2026-07-27 title restoration made the same call at H1 level.
- Use / misuse / disuse (overreliance) · [borrow:human factors] · law:trust-is-earned-through-observed-competence · ← parasuraman-riley. This lecture is the *overtrust* half of that law; `theory-plan.md:352` records it as the Family-A fix for exactly that gap.

**Stance** `[stance:2026-08-01 level:L1]`
- holds: the two borrowed results themselves are not in doubt — they are canonical, replicated, and verified verbatim against the primary in Bainbridge's case. Nothing about the 1983 or 1997 material needs defending.
- contested: **the transfer, which is the only part the student uses.** The lecture asserts that supervising a coding agent erodes the engineer's own skill and vigilance the way supervising a process plant eroded an operator's. That is a plausible and widely-repeated analogy and it is, on this file's current evidence, *only* an analogy. L1 reflects the transfer step, not the source papers; grading the file at the sources' level would be exactly the L0-plus-L1-averages-to-L2 error, in the direction where old authority laundering a new claim is hardest to see.
- would-move-it: named practitioners reporting first-hand that reviewing agent output degraded their own ability to write or read that code — which would graduate `transfer-to-agents` to `detail`. In the other direction: credible accounts that reviewing agent output *maintains* the skill (it is still reading code, unlike watching a dial), which would make the analogy load-bearing in the wrong direction and turn a two-slide opener into a claim the room can rebut from experience.

**OODA**
- question: does the Bainbridge transfer hold for coding agents specifically — is there in-window, named-practitioner evidence that engineers supervising agents lose the hands-on fluency the lecture says monitoring and takeover both ride on? And has anyone credibly argued the opposite, that code review keeps the reps alive in a way dial-watching never did?
- roster: Armin Ronacher, Simon Willison, Addy Osmani, Birgitta Böckeler (martinfowler.com), Kent Beck, Thorsten Ball, Gergely Orosz; plus `platform-watch/coding-agents/state.md`.
- last-run: never

<!-- /backing -->
