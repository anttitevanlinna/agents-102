---
key: a101-m1-debrief-cold-critic
dest: Claude Code
runtime: any
origin: agents-101/getting-going
requires:
  - id: m1-site
    source: prompt:personal-site-with-guardrails-1
produces:
  - id: m1-site-cold-read
    location: scrollback
    note: chat-only diagnostic (subagent cold read beside the learner's own picks); not persisted
callouts:
  - at: First ask me
    say: Your pick comes first, so the critic's cannot steer it.
your-call: true
---
First ask me which line on my site is most me, and which is the most generic. Wait for my answer.

Then start a fresh subagent to read `module-1/site.html` cold. It gets the page and nothing from this session. Have it quote two lines: the one most uniquely this person (not the best line, the one nobody else could have written), and the most generic one, which could sit on anyone's site. Show its picks beside mine.
