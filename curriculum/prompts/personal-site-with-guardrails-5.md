---
key: personal-site-with-guardrails-5
dest: Claude Code
runtime: any
origin: exercises/personal-site-with-guardrails
requires:
  - id: m1-site
    source: prompt:personal-site-with-guardrails-1
produces:
  - id: m1-context-trace
    location: module-1/context-trace.md
---
Look at the very first site you generated from just my LinkedIn profile, before I added any differentiation context. Find three specific claims you made in that version that turned out to be generic, empty, or wrong about me once we added real context. Name them and say why each one was a statistical default rather than something true of me.

Then pick three lines from the current site that are most specifically me. For each, name the piece of context that produced it: my LinkedIn, the colleague-guide frame, my strengths, the mirror-list, or a call I made on a draft. Write both lists to `module-1/context-trace.md` and leave a last line for me: what I gave you that changed the page most.
