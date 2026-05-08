---
key: new-human-role-in-the-loop-1
dest: Claude Code
runtime: any
origin: lectures/new-human-role-in-the-loop
---
Help me create a steering eval for internal mail I might let an agent draft or send.

The eval is not a groundedness check. Assume groundedness is handled by `judges/groundedness-judge.md`. This eval should create positive pressure to overperform on one dimension that matters for my work.

Ask me one question at a time, wait for my answer, and do not show the list. Keep asking until the dimension is judgeable. Start by offering examples I can choose from or adapt:

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

Then save the eval as `./goal-nudger-eval.md`. Show me what you wrote and ask for one final correction before saving.
