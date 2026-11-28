---
key: personal-site-with-guardrails-5
dest: Claude Code
runtime: any
origin: exercises/personal-site-with-guardrails
requires:
  - id: m1-first-site
    source: prompt:personal-site-with-guardrails-1
  - id: m1-site
    source: prompt:personal-site-with-guardrails-4
produces:
  - id: m1-look-back
    location: module-1/look-back.html
    note: first site beside the current one with the agent's picks marked; the learner judges from it
  - id: m1-context-trace
    location: module-1/context-trace.md
---
Build `module-1/look-back.html`, one self-contained page: my first site, `module-1/first-site.html`, beside the site as it is now. On the first site, mark three claims that turned out generic, empty or wrong about me once I gave you more, and say why for each. On the current site, mark the three lines that are most specifically me, and name the context that produced each: my LinkedIn, my hate list, my belief, my strengths, or a call I made on a draft.

Then ask me what I gave you that changed the page most. Wait for my answer. Write the two lists to `module-1/context-trace.md`, with my answer in my words as the last line.
