---
key: a101-m6-debrief-tactic-sharpen
dest: Claude Code
runtime: any
origin: agents-101/evaluations
---
Start by reading the files. No plan or preamble.

Review this session and sharpen the generator's tactic beyond what the loop reached. Read ./generation-tactic.md in its current state, then scan module-6/runs/ and module-6/eval-notes.md. The judge file at judges/groundedness-judge.md did not move; that is the integrity of the loop. Look back over the session: which tactic change helped, which one did not help and should be removed or rewritten, what specific boundary case did the loop never test, where did the generator keep missing the same thing across multiple rounds, and what did the judge flag that the tactic never absorbed?

Be harsher than feels comfortable. If a rule is vague, say so by name. If a rule fired on the wrong thing, name what it fired on.

Then overwrite ./generation-tactic.md in place. Do not create a new version. Integrate, don't append. Add the tactic rule the loop never reached, sharpen a rule that stayed too vague, remove a rule that fired on the wrong thing. A removal means the rule is gone from the file, not renamed or scoped; if you scoped it instead, say so and why. The tactic file is infrastructure now. Every rule should name the failure class it pre-empts. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3-5 lines: what you added, what you sharpened, what you removed, and why, grounded in specific rounds. Name one boundary case the next run should test.
