# The New Human Role in the Loop

**Time:** 8-10 minutes.

Think back to the first thing you made in this training.

Claude wrote a snake game. Then it wrote a page that sounded more like you after you gave it better context. In Module 2, it read sources and wrote memory files. In Module 3, four sessions worked through the same folder, and three agents wrote different stances into files. In Module 5, a benchmark produced a judge. In Module 6, that judge started running inside a loop.

Most of that did not feel like dramatic tool use. It looked like files appearing on disk.

That was the point.

Files are the handles. Connectors bring material in. Agents read and write. Judges hold a line. Loops make the next run sharper.

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

And if the mail is not merely supposed to be true, but actually useful, it needs one more thing: a steering eval.

Groundedness protects the floor. Steering raises the ceiling.

A groundedness eval says: do not invent, overreach, or imply more than the evidence supports. Do not lose contact with the ground.

A steering eval says: overperform on this dimension. Be more executive-readable. More commercially sharp. More specific. More useful to the person who has to make a decision. More like the standard this team wants to be known for.

Those are different jobs. Do not collapse them.

If the agent sends an internal mail that is ungrounded, you have a trust problem. If it sends one that is grounded but vague, forgettable, or politically tone-deaf, you have a usefulness problem. Both matter. One protects truth. One pushes excellence.

## The human does not disappear

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

Ask Claude to build it with you:

**Prompt** *(Claude Code)*

```
Help me create a steering eval for internal mail I might let an agent draft or send.

The eval is not a groundedness check. Assume groundedness is handled by `judges/groundedness-judge.md`. This eval should create positive pressure to overperform on one dimension that matters for my work.

Ask me questions one at a time until the dimension is judgeable. Start by offering examples I can choose from or adapt:

- executive crispness
- commercial sharpness
- specificity
- risk awareness
- actionability
- reader empathy
- strategic usefulness
- sounds like our team

If I choose a vague word, keep asking until it becomes observable. For example, "strategic usefulness" might become: names the tradeoff, states a point of view, and gives the decision-maker a next move.

Once the dimension is clear, show me:

1. The dimension name.
2. A one-sentence definition.
3. Three examples: a 5/5 mail excerpt, a 3/5 mail excerpt, and a 1/5 mail excerpt.
4. The scoring rubric from 1 to 5.
5. What the eval should ask the agent to improve when the score is 3 or lower.

Then save the eval as `goal-nudger-eval.md`. Show me what you wrote and ask for one final correction before saving.
```

You now have two kinds of judgment on disk.

One keeps the work attached to the ground.

One nudges it toward the standard you actually want.

That is the new human role in the loop.

Not doing every pass.

Not trusting the machine blindly.

Designing the conditions under which the system earns more autonomy, one loop at a time.

<!-- maintainer -->

**Quality:** draft 2026-04-29

**Placement:** Closing lecture for Bootstrap Module 6, after `eval-loop.md` and before Debrief / Next. Designed to close the six-module arc when M7/M8 are not held.

**Mood target:** empowered builder, not tidy graduation. Lands Module 6's power as a human-role shift: the participant now designs loops, standards, and autonomy boundaries.

**Strategic role:** Turns the grounded eval loop into an operational decision: would you let the agent send an internal mail? Introduces steering eval as a closing artifact (`goal-nudger-eval.md`) without turning it into a second full exercise.

**Arc recap:** M1 human as evaluator of self; M2 system owner; M3 division architect; M4 boundary-setter; M5 judge-builder; M6 loop designer.
