# What keeps a long-running session going?

The session is working. Watch what already helps it continue, and where it still waits for you.

## Durable state keeps the place
<!--tier:2-->

- A long-running session needs a place it can recover its position from. The live context moves and eventually fills; files on disk survive.
- Compaction makes room by summarising that live context. An unattended session relies on automatic compaction and whatever it can re-read from disk.
- Your rules, observations, task coordinates, current files, and transcript are the durable state this session has today. They do different jobs, but they all outlast a turn in the conversation.
- Durable state needs a home and an owner. A file that loads everywhere and belongs to nobody is not memory the system can trust.

> **Subagents isolate context.** A bounded search or noisy investigation can run in a separate context and return only its summary to the main session.

## Feedback keeps the direction
<!--tier:2-->

- The session can produce changes faster than you can judge them. Every unread diff joins a queue downstream of the agent.
- Flow engineering calls the push from a slower downstream stage **backpressure**: slow down, stop, or redirect when the next stage cannot safely accept more.
- During the handoff, feedback has to come from the system itself. You judge the result when you return.

## A boundary decides whether to continue
<!--tier:2-->

- Some boundaries already stand without you: tests, types, lint, permission limits, and explicit stop or ask conditions. Each can catch a problem and send the work back for correction before later steps build on it.
- The question is not how many checks the repo has. It is what notices first when this particular session goes wrong.
- Watch what catches problems, where the session waits for you, and where nothing pushes back. That is part of the result you bring back.

## What stops a long run before done-done
<!--tier:2-->

- It stops and waits. Sometimes on you: a decision it will not take alone, posed as a question, with nobody there to answer. Sometimes on the world: a ticket it cannot open, a credential it does not have, information it decides is out of reach, so it stops rather than guesses. Whether that information was truly unreachable is your call on return, not its.
- It declares done on the part it managed. Tests pass, the summary is confident, and the piece it quietly dropped goes unmentioned. You find this one on return, not during.
- It blocks on something that never returns. A dev server started in the foreground, a test suite waiting on a keypress. Not stuck on the problem, stuck on the terminal, and from the outside that looks the same as hard thinking.
- It spends the whole run on one obstacle. The same failing fix, re-attempted with variations, while the rest of the task goes untouched. This one never stopped at all.

When your agent stops for missing information, check whether there was a way for it to uncover that. Usually there was.

<!-- maintainer -->

**Lecture meta:** *~5 min, four slides. M4 closer after the send-off, read while the un-packaged session remains active. The session is the specimen: each slide turns attention toward durable state, downstream feedback, and boundaries already present.*

**Placement:** The observational close rides the active session after `ironies-of-automation` and before `reading-the-return`. It keeps curious readiness open. The trainer does not alter or package the active experiment.

**Time:** ~5 min at presentation pace. One slide per question: what keeps the place, what keeps the direction, what decides whether the session continues, and what stops it early.

**The fourth slide (2026-08-14, Antti-directed) inverts the lecture's own frame, and its roster is a maintainer call.** Three slides answer *what keeps a run going*; this one asks what ends it **ahead of done-done**, which is the question a student can act on while their own send-off is in flight. Roster: stops-and-waits (Antti's own — the agent concludes information is out of reach and stops rather than guesses; the belief is the stopper, not the reachability, and re-judging it is the student's move on return) · declares-done-on-the-part-it-managed · blocks-on-a-non-returning-command · spends-the-run-on-one-obstacle. *The environment ends it* (sleeping laptop, dropped network) stays out as obvious to a working engineer and already covered operationally by `set-the-markers-send-it-off`'s While-it-runs bullet. Context-window management belongs only on `## Durable state keeps the place`; do not turn it into another failure on this roster. **The kicker is the slide's one move, and it belongs to bullet 1 (2026-08-14, Antti-worded).** *"When your agent stops for missing information, check whether there was a way for it to uncover that. Usually there was."* Kicker shape rather than a `**Note**` widget on purpose: a Note box would out-weigh the bullet it comments on, and this is a trainer's aside, not a hazard. It turns the whole slide from a taxonomy into something the student does on return — the agent's belief that information was out of reach is the stopper, and the check is whether a connector, a file, a command or a question to a colleague would have dissolved it. Placement is fixed to this slide: moved anywhere else it reads as generic advice.

**The last bullet's closing line is load-bearing** — the retry-churn case never stopped at all, so a slide titled *what stops a run* closing on the one that did not is the point, not an inconsistency to tidy. It reads as a bare observation on purpose (2026-08-14): the *most expensive of the four* tail that first shipped with it was cut as NVA, since ranking the four changes nothing the student does and the bullet already shows the cost.

<!-- backing -->

**Claims**
- `run-stops-and-waits` · vision · "It stops and waits." ← none-owed
- `declares-done-on-the-part-it-managed` · vision · "It declares done on the part it managed." ← none-owed
- `blocks-on-something-that-never-returns` · vision · "It blocks on something that never returns." ← none-owed
- `spends-the-whole-run-on-one-obstacle` · vision · "It spends the whole run on one obstacle." ← none-owed
- `missing-info-was-usually-reachable` · vision · "When your agent stops for missing information, check whether there was a way for it to uncover that. Usually there was." ← none-owed — Antti's own frame, near-verbatim. *Usually* is the hedge doing the work: it is a maintainer's field observation, not a measured rate. Do not quantify it, and do not soften it to *sometimes* — the claim is that the reachable case is the common one, which is what makes checking worth the student's time.
- `durable-state-keeps-the-place` · vision · "files on disk survive" ← none-owed
- `auto-compaction-and-reread` · detail · "Compaction makes room by summarising that live context. An unattended session relies on automatic compaction and whatever it can re-read from disk." ← cc-context-window-docs
- `subagents-isolate-context` · detail · "A bounded search or noisy investigation can run in a separate context and return only its summary to the main session." ← cc-subagents-docs
- `backpressure-named-in-flow-engineering` · borrowed · "Flow engineering calls the push from a slower downstream stage **backpressure**" ← costa-backpressure
- `handoff-feedback-is-in-system` · vision · "During the handoff, feedback has to come from the system itself. You judge the result when you return." ← none-owed
- `boundaries-return-work-for-correction` · vision · "Each can catch a problem and send the work back for correction before later steps build on it." ← none-owed

**Sources**
- cc-context-window-docs `[checked:2026-08-14 result:OK due:cohort]` https://code.claude.com/docs/en/context-window — [vendor docs, capability] Claude Code automatically compacts when the context window fills; project-root `CLAUDE.md` and auto memory are re-injected from disk after compaction, while other files can be re-read as needed. fallback: say only that the live context is summarised and durable files can be read again.
- cc-subagents-docs `[checked:2026-08-14 result:OK due:cohort]` https://code.claude.com/docs/en/sub-agents — [vendor docs, capability] A subagent runs in its own context and returns relevant information to the main conversation. fallback: describe subagents only as separate-context workers that report back.
- costa-backpressure `[checked:2026-07-02 result:OK due:none]` https://www.lucasfcosta.com/blog/backpressure-is-all-you-need — [practitioner direct] Lucas F. da Costa, 2026-05-23. Byline, date and the quoted sentence verified verbatim. Durable account of an argument made once, so `due:none` rather than a calendar re-open. fallback: paraphrase as "human review can become the bottleneck stage" and drop the name.

**Frameworks**
- Backpressure · [borrow:flow engineering] · law:bandwidth-limited-channel · ← costa-backpressure

**Stance** `[stance:2026-08-01 level:L1]`
- holds: a slower downstream review stage can constrain a faster producer, and feedback can slow, stop, or redirect production. Da Costa is one named practitioner applying the flow-engineering frame to human review.
- contested: whether backpressure has become shared agent-engineering vocabulary beyond this source. The lecture defines the term and does not claim convergence.
- would-move-it: a second independent practitioner naming the same human-as-downstream mechanism in long-running agent work.

<!-- /backing -->

**Quality:** compendium-audited 2026-08-24 (writing@1abb84c6 story@1abb84c6 technical@1abb84c6 behavior@93bb807 pedagogy@1abb84c6 strategy@93bb807 slides@1abb84c6)
- judges @1abb84c6: writing PASS (drift-recheck), story PASS (drift-recheck), technical PASS (drift-recheck), behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS (drift-recheck)
