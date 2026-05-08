---
key: a101-m3-debrief-handoff-rules
dest: Claude Code
runtime: any
origin: agents-101/multi-agent-systems
---
Start by reading the files. No plan or preamble.

Review this session and update the rules. Read CLAUDE.md at the root, then scan what we just produced: agents/, sources/, module-3/. Audit harshly. Diplomatic summaries are a failing grade here. Look back over the session: where did agents step on each other, where did context get dropped at a handoff, where did one retriever's dialect leak into the synthesizer, where did the three stances collapse into a single voice, where did one agent need to be two (or two to be one)?

Then rewrite CLAUDE.md. Integrate, don't append. Sharpen the rules that govern division of work and handoff shape: what each agent is for, what it writes to, what it does NOT do. Add what's missing, remove what turned out wrong. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3-5 lines: what you added, what you sharpened, what you removed, and why. Name at least TWO handoff seams where the rules wobbled, with specific evidence: name the file, the pass, and what was lost. Name one thing you would have missed without the "audit harshly" instruction. A seam without evidence doesn't count.
