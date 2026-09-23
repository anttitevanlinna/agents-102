# The New Human Role in the Loop

Think back to the first thing you made in this training.

Claude wrote a snake game. Then it wrote a page that sounded more like you after you gave it better context. In Module 2, it read sources and wrote memory files. In Module 3, four sessions worked through the same folder, and three agents wrote different stances into files. In Module 5, a benchmark produced a judge. In Module 6, that judge started running inside a loop.

Most of that did not feel like dramatic tool use. It looked like files appearing on disk.

That was the point.

Files are the handles. Connectors bring material in. Agents read and write. Judges hold a line. Loops make the next session sharper.

Small pieces. Big shift.

At the start, you were inside every loop. You read the output. You noticed what was wrong. You fixed the prompt. You tried again.

That was necessary. It is not the destination.

The destination is not "the human disappears." That is the lazy story.

The better story is stranger: the human moves one level up.

## Would you let it send the mail?

Here is the concrete question.

Would you allow your agent to send an internal mail related to what you do?

Not a customer mail. Not a legal filing. Not a press release. Just an internal note: a project update, a decision summary, a risk note, a stakeholder nudge. Something you might send without much fuss, except that people will act on it.

What would have to be true before you let the agent hit send?

It would need to sound like it came from your world. That was Module 1.

It would need the relevant sources, the current facts, the open questions, the things your team already knows. That was Module 2.

It would need the right perspectives before it writes. Not one flat summary. The right searches and the right stances. That was Module 3.

It would need boundaries. What can it read? What should it never say? Which risks are still "I can't tell"? That was Module 4.

It would need a groundedness judge. Are the names, numbers, claims, and recommendations attached to evidence? That was Module 5.

## Two evals, two different jobs

And if the mail is not merely supposed to be true, but actually useful, it needs one more thing: a steering eval.

Groundedness protects the floor. Steering raises the ceiling.

A groundedness eval says: do not invent, overreach, or imply more than the evidence supports. Do not lose contact with the ground.

A steering eval says: overperform on this dimension. Be more executive-readable. More commercially sharp. More specific. More useful to the person who has to make a decision. More like the standard this team wants to be known for.

Those are different jobs. Do not collapse them.

If the agent sends an internal mail that is ungrounded, you have a trust problem. If it sends one that is grounded but vague, forgettable, or politically tone-deaf, you have a usefulness problem. Both matter. One protects truth. One pushes excellence.

## Variety in, selection out, memory keeps

You have run this twice now without calling it anything. Something makes more than one candidate. Something else picks. What wins gets written down.

The three stances and the four detectors were the generating half. The floor eval and the ceiling eval are the picking half. The loop runs all three stages while you are out of the room: the generator makes more than you need, the judge throws most of it away, the tactic file keeps what survived.

So the two evals are not two instruments on a shelf. They are one mechanism seen at two zoom levels, and the floor is a stage inside it rather than a tool beside it.

## The human moves one level up

The old role is easy to picture. You sit between the agent and the world. Everything passes through you. The agent drafts; you inspect. The agent revises; you inspect again. The agent proposes; you decide whether it is safe.

That works for one mail.

It does not work for a system.

The new role is to decide the shape of the loop. What can the agent reach? What does it write down? What stays fixed? What is allowed to change? What gets checked every time? What does "better" mean here? Where does the human still belong?

Sometimes the right answer is draft only. Sometimes it is send after review. Sometimes it is send to yourself first. Sometimes it is send automatically if the groundedness judge passes and the goal-nudger scores high. Sometimes the rule is simple: never send this category without a human.

That is not an AI policy slide. That is operational judgment.

The question is no longer: can Claude write the mail?

Of course it can write the mail.

The question is: have you designed the loop that would make sending it responsible?

## Make the goal-nudger

Before you close Module 6, create one steering eval for the kind of internal mail you might actually want an agent to help with.

This one is yours to run. Ask Claude to build it with you:

{{prompt:new-human-role-in-the-loop-1}}

You now have two kinds of judgment on disk.

One keeps the work attached to the ground.

One nudges it toward the standard you actually want.

## The better it gets, the less you watch

Here is the part that does not resolve.

Every clean week is real evidence the loop is working, and real erosion of your ability to tell when it stops working. Those are the same weeks. Design the loop and never run one yourself, and you lose the eye that made you worth putting in charge of it, slowly enough that nothing announces it.

## When did you last read one yourself?

There is no instrument for this one. There is a question, and it has a date on it: when did you last read one of these yourself, start to finish, without the agent summarising it first?

If the answer is a month, put one in your calendar. Not a review of the loop. One piece of the work the loop produced, read the way the person receiving it will read it.

## The full picture, and what it is made of

At this point the full picture is visible: model, context, tools, goal, loop, checks, boundary, interface. None of those pieces is mysterious on its own. The power comes from arranging them so the system can do real work without losing contact with your intent.

You added those parts one at a time, and each one was a single decision: what you give it, and what you keep back.

That is the new human role in the loop.

Not doing every pass.

Not trusting the machine blindly.

Designing the conditions under which the system earns more autonomy, one loop at a time.

<!-- maintainer -->

**§6 carve-out, the answer must be theirs (checked 2026-08-20).** Logged in `pre-cohort-todos.md` as a lecture prompt owing the trainer-demo sweep. It is not: the prompt interviews the student one question at a time about the mail *they* would let an agent send, and the beat closes on *"two kinds of judgment on disk"* — the student's disk. A trainer demo returns the wrong machine's answer. The body now names the student's own run beside the prompt, which is §6's tell. Leave it student-run.


**Story blend, M6 close (2026-09-23).** The slide set is the one in `module-design/a101-story-proposals/blend.md` § Titles, M6, plus `## Make the goal-nudger`, which keeps the prompt. Four points bind. `## Variety in, selection out, memory keeps` names a mechanism the training has already run twice, and closes on one mechanism rather than two instruments. `## The better it gets, the less you watch` and `## When did you last read one yourself?` are a counter-voice inside a leverage mood, so each hands over a move: the second one asks for a date and a single piece of work read end to end. `## The full picture, and what it is made of` is the only place the assembly is named, after the last piece lands, and the refrain line sits there rather than in the opener. The future question belongs to M8; this lecture carries none of it.

**Time:** 12 minutes.

**Placement:** Closing lecture for Agents 101 Module 6, after `eval-loop.md` and before Debrief / Next. Immediately preceded by the recognition beat `when-the-score-stops-moving.md` (added 2026-06-06, C10), which names the judge's blind spot; this closer then defines the human role around it (naming what the judge can't see). Designed to close the six-module arc when M7/M8 are not held.

**Mood target:** empowered builder, not tidy graduation. Lands Module 6's power as a human-role shift: the participant now designs loops, standards, and autonomy boundaries.

**Strategic role:** Turns the grounded eval loop into an operational decision: would you let the agent send an internal mail? Introduces steering eval as a closing artifact (`./goal-nudger-eval.md`) without turning it into a second full exercise.

**Arc recap:** M1 human as evaluator of self; M2 system owner; M3 division architect; M4 boundary-setter; M5 judge-builder; M6 loop designer.

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
