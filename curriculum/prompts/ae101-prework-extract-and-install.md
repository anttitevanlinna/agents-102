---
key: ae101-prework-extract-and-install
dest: Claude Code
runtime: any
origin: agentic-engineering-101/prework
requires:
  - id: ae101-content-tarball
    source: prompt:ae101-prework-download-tarball
  - id: candidate-bugs
    source: scrollback (student names three trivial-and-visible candidates at Step 4)
produces:
  - id: ae101-content-dir
    location: ~/Documents/ae101-content/ (or sponsor-stated path)
    consumed-by:
      - module:getting-going
  - id: stride-skill
    location: ~/.claude/skills/stride/SKILL.md
    consumed-by:
      - prompt:threat-model-with-stride-1
  - id: access-control-analysis-skill
    location: ~/.claude/skills/access-control-analysis/SKILL.md
    consumed-by:
      - prompt:map-the-access-surface-2
  - id: picked-bug
    location: scrollback (student picks from screened candidates at Step 4-5)
    consumed-by:
      - prompt:fix-tests-first-1
---
I'm starting a six-module training called Agentic Engineering 101. Walk these in order, ask one question at a time if you need to, no preamble.

1. Ensure my AE101 content directory exists. Use ~/Documents/ae101-content unless there is a good reason not to. Create it if necessary.

2. Extract ~/Downloads/ae101-content.tar.gz into that AE101 content directory. Confirm the extracted folder contains lectures/, exercises/, reference/, supplementary/, and content/skills/.

3. Install these as personal Claude Code skills:
   - access-control-analysis
   - stride

   Use the extracted content/skills/ folder as the source. Install them wherever personal Claude Code skills belong on this machine. Confirm each installed skill has a SKILL.md file and tell me the absolute path.

4. Ask me for three trivial-and-visible candidate bugs in this repo. Screen against: under 50 lines changed, visible (wrong error message, date off by a day, wrong total, a log line that lies), mine or co-owned, shippable. Help me pick the most trivial-and-visible one.

5. Once I've picked, confirm the repo is ready for Module 1. Tests run (or name how the repo checks code), git status is clean, I can make a PR. Flag anything that would get in my way.

Report success on each step and tell me what you did.
