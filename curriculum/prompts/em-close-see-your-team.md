---
key: em-close-see-your-team
dest: Claude Code
context: final move of the module
runtime: cli
origin: engineering-management/see-your-team
note: EM M1 close. Asks the calibration question (did you make progress? did you lay ground for progress?) against this module's evidence (placements, thin spots, first diagnostic) and writes the answer into the Decision Journal. Lives in the module file's Did you make progress? section.
requires:
  - id: em-leadership-memory
    source: prompt:em-install-leadership-memory
  - id: em-diagnostic
    source: prompt:em-run-weekly-diagnostic
produces:
  - id: em-leadership-memory
    location: team-leadership.md
    note: Decision Journal gains the M1 calibration entry
    consumed-by:
      - prompt:em-close-ask-before-you-move
---
Read `team-leadership.md` and the newest file in `diagnostics/`, and put two questions to me in plain chat, one at a time. Did I make progress in this module? Did I lay ground for progress later?

Before each question, give me the evidence from the files in three lines or fewer: who is placed, who is still a gap, what the first diagnostic proposed. Then wait for my answer.

After I answer both, add a dated entry to the Decision Journal with my answers in my own words and the evidence you showed me. Tell me what you wrote.
