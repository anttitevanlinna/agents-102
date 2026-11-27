# The New Human Role in the Loop

Files hold what the agents know. Connectors bring material in. Agents read and write. Judges check. Loops make the next session better.

You do not disappear from this system. You move one level up: you design the loop and own the yardstick.

## Which check would let the agent send the mail without you?

Would you allow your agent to send an internal mail related to what you do: a project update, a decision summary, a risk note, a stakeholder nudge?

What would have to be true before you let the agent hit send?

- The mail sounds like it came from your world (Module 1).
- The agent has the sources, the current facts and the open questions (Module 2).
- The agent ran the right searches and weighed different views before writing (Module 3).
- The agent has boundaries: what it can read, what it never says, which risks stay open (Module 4).
- A groundedness judge ties names, numbers, claims and recommendations to evidence (Module 5).

## Make many, pick the best, keep what won

In a loop that improves, something makes several candidates, something else picks, and what wins is kept.

The three stances in Module 3 and the four detectors in Module 5 made candidates. The groundedness judge and the goal-nudger pick. While you are away, the loop does both, and `./generation-tactic.md` holds what won.

## The human moves one level up

Today you stand between the agent and the world: the agent drafts, you inspect. That does not scale to many agents.

The new role is to design the loop: what the agent can reach, what it keeps, what stays fixed, what may change, what gets checked every time, what "better" means, and where a person still belongs.

For the internal mail, your answer may be draft only, review first, send to yourself first, or send automatically once the mail passes the groundedness judge and scores high on the goal-nudger. Some kinds of mail never go without a person.

## Make a goal-nudger

Ask the agent to build one goal-nudger with you, for internal mail an agent could draft. A goal-nudger is an eval that scores one quality you care about and pushes the agent toward it. The agent saves it as `./goal-nudger-eval.md`.

{{prompt:new-human-role-in-the-loop-1}}

## I drifted too

When I built a module of this course with an agent, the rules sat in its context the whole time. In one session: five reversals from me on the agent's confident recommendations, four leaks of a banned word across three helper agents, and several times a "done" that was not done.

A check loop caught what the helpers missed. I caught what the loop missed. That is why the loop still has a person in it.

## The better it gets, the less you watch

Every clean week is evidence that the loop works. Every clean week also gives you less practice at noticing when the loop stops working. If you design loops and never do the work inside one, you lose your eye for the work.

## When did you last read one yourself?

No judge runs this check. Ask yourself: when did you last read one of the loop's outputs start to finish, without the agent summarising it first?

If that was a month ago, put a reading in your calendar. Read one output the way the person receiving it will.

## The full picture, and what it is made of

The full picture is model, context, tools, goal, loop, checks, boundary and interface. For each part you decided what to give the agent and what to keep back.

{{figure:agent-picture}}

Your role in the loop is to set the conditions for giving the system more autonomy, one loop at a time.

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (writing@78d17fc9 story@78d17fc9 technical@78d17fc9 behavior@cf4fd816 pedagogy@78d17fc9 strategy@78d17fc9 slides@78d17fc9)
- judges @cf4fd816: writing PASS (2 findings see instances/agents-101--lecture--new-human-role-in-the-loop.writing.json), story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Decision note 2026-11-13 (point-of-view pass).** `## I drifted too` condenses Antti's signed AE101 `story-of-module-6.md` § The numbers (five reversals, four banned-word leaks across three helpers, premature "done"); his facts, not new ones. Big Idea stated cold 79 → 92 (lean scorer, n=12 each).

**The full agent picture, drawn (2026-09-24, Antti-directed).** `{{figure:agent-picture}}` on `## The full picture, and what it is made of`: the loop as the runtime runs it, model in the cloud, the turn in five steps, checks deliberately absent from the figure (Antti: no such gate inside the loop). Shown once, here; the refrain across the modules points at it. Source `curriculum/figures/agent-picture.md`; protos and the rejected shapes in `protos/a101-agent-picture-*.html`.


**§6 carve-out, the answer must be theirs (checked 2026-08-20).** Logged in `pre-cohort-todos.md` as a lecture prompt owing the trainer-demo sweep. It is not: the prompt interviews the student one question at a time about the mail *they* would let an agent send, and the beat closes on *"two kinds of judgment on disk"* — the student's disk. A trainer demo returns the wrong machine's answer. The body now names the student's own run beside the prompt, which is §6's tell. Leave it student-run.


**Story blend, M6 close (2026-09-23).** The slide set is the one in `module-design/a101-story-proposals/blend.md` § Titles, M6, plus `## Make a goal-nudger`, which keeps the prompt. Four points bind. `## Make many, pick the best, keep what won` names a mechanism the training has already run twice, and closes on one mechanism rather than two instruments. `## The better it gets, the less you watch` and `## When did you last read one yourself?` are a counter-voice inside a leverage mood, so each hands over a move: the second one asks for a date and a single piece of work read end to end. `## The full picture, and what it is made of` is the only place the assembly is named, after the last piece lands, and the refrain line sits there rather than in the opener. The future question belongs to M8; this lecture carries none of it.

**Time:** 12 minutes.

**Placement:** Closing lecture for Agents 101 Module 6, after `eval-loop.md` and before Debrief / Next. Immediately preceded by the recognition beat `when-the-score-stops-moving.md` (added 2026-06-06, C10), which names the judge's blind spot; this closer then defines the human role around it (naming what the judge can't see). Designed to close the six-module arc when M7/M8 are not held.

**Mood target:** empowered builder, not tidy graduation. Lands Module 6's power as a human-role shift: the participant now designs loops, standards, and autonomy boundaries.

**Strategic role:** Turns the grounded eval loop into an operational decision: would you let the agent send an internal mail? Introduces the goal-nudger as a closing artifact (`./goal-nudger-eval.md`) without turning it into a second full exercise.

**Arc recap:** M1 human as evaluator of self; M2 system owner; M3 division architect; M4 boundary-setter; M5 judge-builder; M6 loop designer.
