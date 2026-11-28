---
key: pick-one-person
dest: Builder Claude
runtime: any
origin: exercises/build-for-the-gap
requires:
  - id: challenge-agent
    source: prompt:build-your-challenge-memory-5
produces:
  - id: solo-person
    location: module-7/person.md
your-call: true
---
Read module-6/trigger.md if it exists. Then ask me two questions, one at a time, and wait for each answer. First: who is one real person I work with who could use what my system makes? Second: how do they do that job today?

From my answers, pick what they get: the context, a skill, the output, or a way to ask it. Pick it for their job, not for what is easiest to build.

Write module-7/person.md with exactly three entries:
- The person.
- The one question I will ask them about how they do the job today. Not whether they want my agent.
- What they get, and the one sign that would show it fits their week.

Show me the file before saving.
