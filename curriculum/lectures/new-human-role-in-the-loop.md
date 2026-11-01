# The New Human Role in the Loop

Think back to the first thing you made in this training.

The agent wrote a snake game. In Module 2, it read sources and wrote memory files. In Module 5, a benchmark produced a judge. In Module 6, that judge started running inside a loop.

Files are the handles. Connectors bring material in. Agents read and write. Judges hold a line. Loops make the next session sharper.

At the start, you sat inside every loop, reading the output and fixing the prompt.

The destination is not "the human disappears." You move one level up: you design the loop and own the yardstick.

## Would you let it send the mail?

Would you allow your agent to send an internal mail related to what you do?

An internal note: a project update, a decision summary, a risk note, a stakeholder nudge.

What would have to be true before you let the agent hit send?

- Sounds like it came from your world (Module 1).
- The sources, current facts and open questions (Module 2).
- The right searches and stances before it writes (Module 3).
- Boundaries: what it can read, what it never says, which risks it can't tell (Module 4).
- A groundedness judge ties names, numbers, claims and recommendations to evidence (Module 5).

## Two evals, two different jobs

A useful mail needs one more eval: a steering eval.

Groundedness protects the floor. Steering raises the ceiling.

A groundedness eval says: do not invent, overreach, or imply more than the evidence supports.

A steering eval says: overperform on one dimension. Be more executive-readable, commercially sharp, specific, and useful to the decision-maker.

An ungrounded mail is a trust problem. A grounded but vague or tone-deaf mail is a usefulness problem.

## Variety in, selection out, memory keeps

You have run this twice: something makes several candidates, something else picks, and what wins gets written down.

The three stances and four detectors are the generating half. The floor and ceiling evals are the picking half.

While you are away, the generator makes more than you need, the judge discards most of it, and the tactic file keeps what survived.

## The human moves one level up

The old role sits between agent and world: the agent drafts, you inspect. That does not work for a system.

The new role is to design the loop: what the agent can reach, what it writes down, what stays fixed, what may change, what gets checked every time, what "better" means, where the human still belongs.

The answer may be draft only, review first, send to yourself first, or automatic when the groundedness judge passes and the goal-nudger scores high. Some categories never go without a human.

Ask whether you have designed the loop that makes sending responsible.

## Make the goal-nudger

Create one steering eval for internal mail an agent could help with. Ask the agent to build it with you:

{{prompt:new-human-role-in-the-loop-1}}

Two judges now sit on disk: one keeps the work grounded, one steers it toward your standard.

## The better it gets, the less you watch

Every clean week is evidence the loop works, and it erodes your ability to tell when it stops. Design the loop and never run one yourself, and you lose the eye that made you worth putting in charge of it.

## When did you last read one yourself?

This check has no instrument, only a date: when did you last read one of these start to finish, without the agent summarising it first?

If the answer is a month, put one in your calendar. Read one piece of the work the loop produced, the way the person receiving it will.

## The full picture, and what it is made of

You now have the full picture: model, context, tools, goal, loop, checks, boundary, interface. Each was one decision about what you give the agent and what you keep back.

{{figure:agent-picture}}

Your role in the loop is to design the conditions under which the system earns more autonomy, one loop at a time.

<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@d3ff749e story@5755beb6 technical@725101ec behavior@725101ec pedagogy@725101ec strategy@725101ec slides@4d9c4af2)
- judges @4d9c4af2: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**The full agent picture, drawn (2026-09-24, Antti-directed).** `{{figure:agent-picture}}` on `## The full picture, and what it is made of`: the loop as the runtime runs it, model in the cloud, the turn in five steps, checks deliberately absent from the figure (Antti: no such gate inside the loop). Shown once, here; the refrain across the modules points at it. Source `curriculum/figures/agent-picture.md`; protos and the rejected shapes in `protos/a101-agent-picture-*.html`.


**§6 carve-out, the answer must be theirs (checked 2026-08-20).** Logged in `pre-cohort-todos.md` as a lecture prompt owing the trainer-demo sweep. It is not: the prompt interviews the student one question at a time about the mail *they* would let an agent send, and the beat closes on *"two kinds of judgment on disk"* — the student's disk. A trainer demo returns the wrong machine's answer. The body now names the student's own run beside the prompt, which is §6's tell. Leave it student-run.


**Story blend, M6 close (2026-09-23).** The slide set is the one in `module-design/a101-story-proposals/blend.md` § Titles, M6, plus `## Make the goal-nudger`, which keeps the prompt. Four points bind. `## Variety in, selection out, memory keeps` names a mechanism the training has already run twice, and closes on one mechanism rather than two instruments. `## The better it gets, the less you watch` and `## When did you last read one yourself?` are a counter-voice inside a leverage mood, so each hands over a move: the second one asks for a date and a single piece of work read end to end. `## The full picture, and what it is made of` is the only place the assembly is named, after the last piece lands, and the refrain line sits there rather than in the opener. The future question belongs to M8; this lecture carries none of it.

**Time:** 12 minutes.

**Placement:** Closing lecture for Agents 101 Module 6, after `eval-loop.md` and before Debrief / Next. Immediately preceded by the recognition beat `when-the-score-stops-moving.md` (added 2026-06-06, C10), which names the judge's blind spot; this closer then defines the human role around it (naming what the judge can't see). Designed to close the six-module arc when M7/M8 are not held.

**Mood target:** empowered builder, not tidy graduation. Lands Module 6's power as a human-role shift: the participant now designs loops, standards, and autonomy boundaries.

**Strategic role:** Turns the grounded eval loop into an operational decision: would you let the agent send an internal mail? Introduces steering eval as a closing artifact (`./goal-nudger-eval.md`) without turning it into a second full exercise.

**Arc recap:** M1 human as evaluator of self; M2 system owner; M3 division architect; M4 boundary-setter; M5 judge-builder; M6 loop designer.
