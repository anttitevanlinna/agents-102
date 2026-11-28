---
key: new-human-role-in-the-loop-1
dest: Claude Code
runtime: any
origin: lectures/new-human-role-in-the-loop
produces:
  - id: goal-nudger
    location: ./goal-nudger-eval.md
callouts:
  - at: If I choose a vague word
    say: A quality can be scored once it is something you can observe.
  - at: Once the dimension is clear
    say: Examples at 5, 3 and 1 anchor the scale better than a definition.
---
Help me create a goal-nudger for my briefing. A goal-nudger is an eval that does not look for errors. It scores one quality I care about and pushes the agent toward it.

Groundedness is already checked by `judges/groundedness-judge.md`. This eval is for something else. It should push the agent to be better than it has to be on one quality that matters for my work.

Ask me at most three questions at a time and wait for my answers. For each round, recommend the answer you infer from my context so I can accept or correct it. Stop after two rounds: if we still cannot say how to score it, propose the narrowest version we can score and say what is left open. Start by offering examples I can choose from or adapt:

- executive crispness
- commercial sharpness
- specificity
- risk awareness
- actionability
- reader empathy
- strategic usefulness
- sounds like our team

If I choose a vague word, use the remaining question rounds to make it observable. For example, "strategic usefulness" might become: names the tradeoff, states a point of view, and gives the decision-maker a next move.

Once the dimension is clear, show me:

1. The dimension name.
2. A one-sentence definition.
3. Three examples: a 5/5 briefing excerpt, a 3/5 briefing excerpt, and a 1/5 briefing excerpt.
4. The scoring rubric from 1 to 5.
5. What the eval should ask the agent to improve when the score is 3 or lower.

Then save the eval as `./goal-nudger-eval.md`. Show me what you wrote and ask for one final correction before saving.
