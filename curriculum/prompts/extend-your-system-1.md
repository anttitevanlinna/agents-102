---
key: extend-your-system-1
dest: Builder Claude
runtime: any
origin: exercises/extend-your-system
requires:
  - id: m8-extension-brief
    source: student-input
  - id: challenge-agent
    source: prompt:build-your-challenge-memory-5
produces:
  - id: m8-extension-agent
    location: agents/<slug>.md
---
Read module-8/extension-brief.md. Build the agent described in it. Choose a lowercase hyphenated filename from the job, not the technology. State the exact path under `agents/`, then draft the agent file at that path.

The agent file must include:
- Role (one sentence) — what job this agent is hired for
- Rules — carry forward the rules my existing agents follow (cite the memory file for every claim, never invent, ask when a source is thin). Add rules specific to this agent's job.
- Inputs — the exact files or folders this agent reads. Paths, not descriptions. For PDFs or slide exports, include an extraction-depth check and flag any file whose body text was not actually extracted.
- Output — the exact file or shape this agent writes. If it's a report, name the filename. If it's a response, describe the shape.
- Hard lines — things this agent must not do even if asked.

Show me the file before saving. After I approve, save it to the exact path you stated, then run it once end-to-end on real input from my system. Report what it produced, where it hesitated, and where a source was thin.
