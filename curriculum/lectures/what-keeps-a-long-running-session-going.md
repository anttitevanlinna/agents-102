# What keeps a long-running session going?

The session is working. Do not change this first experiment while it runs. Watch what already helps it continue, and where it still waits for you.

## Durable state keeps the place

- A long-running session needs a place it can recover its position from. The live context moves and eventually fills; files on disk survive.
- Your rules, observations, task coordinates, current files, and transcript are the durable state this session has today. They do different jobs, but they all outlast a turn in the conversation.
- Durable state needs a home and an owner. A file that loads everywhere and belongs to nobody is not memory the system can trust.

## Feedback keeps the direction

- The session can produce changes faster than you can judge them. Every unread diff joins a queue downstream of the agent.
- Flow engineering calls the push from a slower downstream stage **backpressure**: slow down, stop, or redirect when the next stage cannot safely accept more.
- In this experiment, you are part of that feedback. Wherever no check can push back, your attention is the only thing that can move the session safely.

## A boundary decides whether to continue

- Some boundaries already stand without you: tests, types, lint, permission limits, and explicit stop or ask conditions. Each can interrupt a wrong step before the next step builds on it.
- The question is not how many checks the repo has. It is what notices first when this particular session goes wrong.
- Do not add packaging mid-experiment. Watch where an existing boundary fires, where the session waits for you, and where nothing pushes back. That is part of the result you bring back.

<!-- maintainer -->

**Lecture meta:** *~4 min, three slides. M4 closer after the send-off, read while the un-packaged session remains active. The session is the specimen: each slide turns attention toward durable state, downstream feedback, and boundaries already present.*

**Placement:** The observational close rides the active session after `ironies-of-automation` and before `reading-the-return`. It keeps curious readiness open. The trainer does not alter or package the active experiment.

**Time budget total:** ~4 min at presentation pace. One slide per question: what keeps the place, what keeps the direction, what decides whether the session continues.

<!-- backing -->

**Claims**
- `durable-state-keeps-the-place` · vision · "files on disk survive" ← none-owed
- `backpressure-named-in-flow-engineering` · borrowed · "Flow engineering calls the push from a slower downstream stage **backpressure**" ← costa-backpressure
- `human-is-downstream-feedback` · detail · "Wherever no check can push back, your attention is the only thing that can move the session safely." ← costa-backpressure
- `boundaries-interrupt-wrong-steps` · vision · "Each can interrupt a wrong step before the next step builds on it." ← none-owed

**Sources**
- costa-backpressure `[checked:2026-07-02 result:OK due:none]` https://www.lucasfcosta.com/blog/backpressure-is-all-you-need — [practitioner direct] Lucas F. da Costa, 2026-05-23. Byline, date and the quoted sentence verified verbatim. Durable account of an argument made once, so `due:none` rather than a calendar re-open. fallback: paraphrase as "human review can become the bottleneck stage" and drop the name.

**Frameworks**
- Backpressure · [borrow:flow engineering] · law:bandwidth-limited-channel · ← costa-backpressure

**Stance** `[stance:2026-08-01 level:L1]`
- holds: a slower downstream review stage can constrain a faster producer, and feedback can slow, stop, or redirect production. Da Costa is one named practitioner applying the flow-engineering frame to human review.
- contested: whether backpressure has become shared agent-engineering vocabulary beyond this source. The lecture defines the term and does not claim convergence.
- would-move-it: a second independent practitioner naming the same human-as-downstream mechanism in long-running agent work.

<!-- /backing -->
