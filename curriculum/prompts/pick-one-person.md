---
key: pick-one-person
dest: Builder Claude
runtime: any
origin: exercises/build-for-the-gap
requires:
  - id: challenge-agent
    source: prompt:build-your-challenge-memory-5
produces:
  - id: m7-monday
    location: module-7/monday.md
---
Ask me two questions, one at a time, and wait for each answer. First: who is one real person I work with who could use what my system makes? Second: how do they do that job today?

From my answers, pick what they get: the context, a skill, the output, or a way to ask it. Pick it for their job, not for what is easiest to build.

Write module-7/monday.md with exactly three entries:
- The person.
- The one question I will ask them about how they do the job today. Not whether they want my agent.
- What they get, and the one sign that would show it fits their week.

Show me the file before saving.

<!-- maintainer -->

Approval: new prompt, prompt-ok Antti 2026-11-25 ("prompt-ok for any new prompts"). Compresses the M7 interview, pick and next-step prompts into one for a learner without a room. Writes `module-7/monday.md`, the brief's source.
