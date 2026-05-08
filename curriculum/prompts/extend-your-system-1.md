---
key: extend-your-system-1
dest: Builder Claude
runtime: any
origin: exercises/extend-your-system
---
Read module-8/extension-brief.md. Build the agent described in it. Write the agent file to agents/<slug>.md — the slug comes from the job, not the technology.

The agent file must include:
- Role (one sentence) — what job this agent is hired for
- Rules — carry forward the rules my existing agents follow (cite the memory file for every claim, never invent, ask when a source is thin). Add rules specific to this agent's job.
- Inputs — the exact files or folders this agent reads. Paths, not descriptions.
- Output — the exact file or shape this agent writes. If it's a report, name the filename. If it's a response, describe the shape.
- Hard lines — things this agent must not do even if asked.

Show me the file before saving. After I approve, save it to agents/<slug>.md, then run it once end-to-end on real input from my system. Report what it produced, where it hesitated, and where a source was thin.
