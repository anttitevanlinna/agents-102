---
key: personal-site-with-guardrails-6
dest: Claude Code
runtime: any
origin: exercises/personal-site-with-guardrails
requires:
  - id: m1-site
    source: prompt:personal-site-with-guardrails-4
produces:
  - id: m1-brand-rules
    location: module-1/personal-brand-generation.md
    note: portable generation rules distilled from the decisions made across this exercise
callouts:
  - at: Write a rules file
    say: The rules come from your session. Left alone, the agent writes general advice.
---
Write a rules file at `module-1/personal-brand-generation.md` that I can give an agent for the next personal-brand job: a colleague's bio, a team page, a client one-pager. Cover what it is for, the core rule (distinctive, not descriptive), what never to generate, what always to do, the moves we used (the hate list turned positive for the voice, Godin's "for people who believe" for who the page is for, a borrowed look if we used one) and the voice rules. Take all of it from what we did in this session, the decisions and the reversals, not from general advice.

When you're done, show me the three strongest rules and tell me what you weren't sure about.
