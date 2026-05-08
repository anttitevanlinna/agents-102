---
key: ae101-prework-extract-and-install
dest: Claude Code
runtime: any
origin: agentic-engineering-101/prework
---
I'm starting a six-module training called Agentic Engineering 101. Walk these in order, ask one question at a time if you need to, no preamble.

1. Ensure my AE101 content directory exists. Use ~/Documents/ae101-content unless there is a good reason not to. Create it if necessary.

2. Extract ~/Downloads/agents-102-content.tar.gz into that AE101 content directory. Confirm the extracted folder contains lectures/, exercises/, reference/, supplementary/, and content/skills/.

3. Install these as personal Claude Code skills:
   - access-control-analysis
   - stride

   Use the extracted content/skills/ folder as the source. Install them wherever personal Claude Code skills belong on this machine. Confirm each installed skill has a SKILL.md file and tell me the absolute path.

4. Ask me for three trivial-and-visible candidate bugs in this repo. Screen against: under 50 lines changed, visible (wrong error message, date off by a day, wrong total, a log line that lies), mine or co-owned, shippable. Help me pick the most trivial-and-visible one.

5. Once I've picked, confirm the repo is ready for Module 1. Tests run (or name how the repo checks code), git status is clean, I can make a PR. Flag anything that would get in my way.

Report success on each step and tell me what you did.
