# The ironies of automation

## The better the automation, the worse the operator

- **This is a 1983 result, not an AI take.** Lisanne Bainbridge, studying industrial automation: automate the reliable middle of a task, and the human keeps exactly two jobs. Monitor for the rare failure. Take over when it happens.
- **Both jobs demand hands-on fluency.** Monitoring only works if you can tell wrong from right at a glance. Takeover only works if the manual skill is still there. Both ride on the reps of doing the task yourself.
- **The irony: daily automation quietly removes those reps.** Skills deteriorate when they are not used. The better the automation, the less you do the task by hand, and the worse you are at the moment you are needed most. Bainbridge's phrasing: a formerly experienced operator who has been monitoring an automated process "may now be an inexperienced one."

## Earned trust breeds the miss

- **Earned trust is exactly what breeds the miss.** Watch a system that is highly but imperfectly reliable, and your own detection performance degrades. The automation-studies literature named this overreliance: trusting the machine past the point where you still catch its errors (Parasuraman and Riley's use, misuse, disuse).
- **The more runs the agent lands cleanly, the worse you get at catching the one that doesn't.** Each clean run is real evidence of competence and real erosion of your vigilance, at the same time. A longer leash quietly makes a worse watcher.
- **Trust and vigilance move in opposite directions.** The same observed competence that earns the agent a longer leash degrades the attention you bring to the next run. The trust is deserved. The watching still has to be engineered. So when the next run lands clean, ask the plain question first: when did you last do this kind of work by hand?

<!-- maintainer -->

**Promotion (2026-07-03, Antti-directed):** supplementary → M4 lecture, wired into `run-the-first-experiment.md § Start here` after `[Lecture: The far half of the map]` and before `[Lecture: The agent loop]`. Same operation that promoted `the-agent-loop` and `the-gate-is-a-claim` earlier this run. Slide-format pass per `theory-plan.md` § Slide format + dosage: two slides (the Bainbridge paradox · the complacency half). Bullets carried from the supplementary body, which was already slide-shaped.

**Scope held (framing-level only).** This is the OPENER version: it names the SHAPE of the trap (vigilance erodes exactly as trust is earned) and stops there. The supplementary's third section — *The moves* (keep manual reps · calibrate your own miss rate · let the gates carry the vigilance) — was dropped: those are fix-moves, closer/consolidation material, not an opener's job, and the third one tied back to `supplementary/backpressure.md`. Felt-before-named held: no goal-drift / context-rot / plausible-but-wrong named here (M4 lets the student FEEL those; M5 names them). The application bullet stays generic ("the one that doesn't" land cleanly) so it primes without spoiling the felt failure.

**Placement rationale:** the far-half names the country (feedback goes quiet, the result arrives all at once); this names the trap built INTO that country (the better you trust the long run, the worse you watch it); the agent-loop then names the machine that keeps stepping. Framing opener, not a teaching lecture — it arms a lens, it does not hand the fixes.

**Unwiring (promotion = relocation):** the M6 back-pointer was already removed this run (`spot-gaps-build-the-loop.md § Next`, see that file's 2026-07-03 wiring-cleanup note). Still open for the cleanup pass: the `ironies-of-automation` row in `TRAININGS['agentic-engineering-101'].supplementaries` (`site/layouts/curriculum.js`) and the `'supplementary/ironies-of-automation'` whitelist line in `scripts/build-workbook.js` — a promoted-to-lecture slug is inlined, not a registered supplementary, so both need the row dropped (mirror the `the-agent-loop` deregistration). Reversibility: git carries the supplementary + its registration. Only the module wiring edited in this pass.

**EYEBALL questions (Antti):**
1. **Opening position.** Placed after the far-half container, before the agent-loop. Right slot, or later — right before the send-off prompts, where the "you are the watcher now" beat bites hardest? The supplementary's own note warned *"Do NOT open M4 with it (doom before the felt experience inverts the mood contract)"*; scoping to the framing level is the mitigation, but the position is yours to confirm.
2. **Second opening lecture vs "M4 stays light."** M4's open now carries three lecture includes before the exercise (far-half · ironies · agent-loop). `check_lectures §2` wants minimal lecturing before a contrast-mood module. Does the far half survive a second framing opener, or should ironies move to the send-off beat / M4 close so the open stays a single container?
3. **Slide budget.** +2 slides onto M4's already-flagged raw count (the-agent-loop's eyeball #3 put M4 at ~15 vs the ~6 budget; these two are re-chunked supplementary content, no new teaching load). Cut to one slide (fold the paradox and the complacency half together), or accept two?
4. **Mood contract.** The paradox is meant to land as a live tension to watch for, not a prediction of failure. If in rehearsal it reads as *"you will miss the bad run,"* it has tipped the module's curious-readiness mood toward doom — pull it to the close or thin it to one slide.

**Quality:** no 2026-07-08 (slides@47f3357)**Quality:** no Quality line by design (new lecture, unaudited — the promotion re-shaped placement and dropped a section; re-audit before ship). The two sources below were verified live on the supplementary and carry over verbatim.
- judges @47f3357: writing grandfathered, story grandfathered, technical grandfathered, behavior grandfathered, pedagogy grandfathered, strategy grandfathered, slides PASS

**Mood target:** curious readiness held (the module's target), with the earned-trust paradox as a named tension. Primes rather than consolidates.

**Time:** 2–3 min target (framing opener, projected). Past 3 in rehearsal = it has started teaching the fixes, which belong to the far half's closers, not here.

**Voice:** Rory-reframe on the counterintuitive turn (trust and vigilance moving opposite ways), Boris-flat on the mechanism. Risto does NOT lead — forward-optimism would resolve the unease the opener means to open.

**Laws carried:** ironies-of-automation (skill atrophy under supervision) · trust-calibration / complacency (the missing half of trust-observed-competence).

**Source verification — freshness stamps (`source-freshness.sh`; format `curriculum/source-freshness-format.md`).**
- `[checked:2026-07-02 result:OK due:2027-01-02]` https://www.complexcognition.co.uk/2021/06/ironies-of-automation.html — [academic/research] Bainbridge, "Ironies of Automation," Automatica 19(6), 1983 — full text on the author's own site, verified live. Two-jobs framing confirmed (monitor + take over, §1.1) and skill-atrophy confirmed verbatim ("physical skills deteriorate when they are not used ... a formerly experienced operator who has been monitoring an automated process may now be an inexperienced one"). fallback: none needed.
- `[checked:2026-07-02 result:OK due:2027-01-02]` https://journals.sagepub.com/doi/10.1518/001872097778543886 — [academic/research] Parasuraman & Riley, "Humans and Automation: Use, Misuse, Disuse, Abuse," Human Factors 39(2), 1997. Abstract-level verification: "misuse refers to overreliance on automation, which can result in failures of monitoring or decision biases" — the exact claim the body leans on. The "detection performance degrades" line stays qualitative, matched to abstract-level evidence (the quantified complacency finding is the constant-reliability studies P&R review, e.g. Parasuraman, Molloy & Singh 1993); do not add a number or harden back to "collapses" without opening that primary. fallback: attribute the taxonomy only.
