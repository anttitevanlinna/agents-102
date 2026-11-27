---
key: a101-m6-debrief-tactic-sharpen
dest: Claude Code
runtime: any
origin: agents-101/evaluations
requires:
  - id: generation-tactic
    source: prompt:eval-loop-2
  - id: m6-run-artifacts
    source: prompt:eval-loop-2
  - id: groundedness-judge
    source: prompt:hallucination-bakeoff-8
produces:
  - id: generation-tactic
    location: ./generation-tactic.md (overwrite in place)
    note: integrates the tactic rule the loop never reached; judge file untouched
  - id: root-instructions
    location: "./{{artifact:root-instructions}} (one line: later briefings go through the tactic and the judge)"
---
Read ./generation-tactic.md, then module-6/runs/ and module-6/eval-notes.md. The judge file at judges/groundedness-judge.md did not change during the loop; check that no judge subagent was given rules beyond it. If the flag counts stayed in single digits, say whether the changes between rounds are bigger than the judge's noise before you credit any tactic change.

Then go through the rounds: which tactic change helped, which did not, what the generator kept missing round after round, what the judge flagged that the tactic never took in, and which case the loop never tested.

Rewrite ./generation-tactic.md in place. Add the rule the loop never reached, sharpen the rules that stayed vague, and remove the rule module-6/eval-notes.md names as the rule to cut, or say why it stays. Remove any rule that fired on the wrong thing too. Removed means gone from the file. Each rule names the kind of miss it prevents.

Last, add one line to the root instructions file: every briefing asked for in this folder is written from ./generation-tactic.md and scored by judges/groundedness-judge.md before it reaches me. If such a line exists, keep it as one line.

When you're done, tell me in 3-5 lines what you added, sharpened and removed, and the round that showed each. Name one case the next run should test.
