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
Write a rules file at `module-1/personal-brand-generation.md` that I can give an agent for the next personal-brand job: a colleague's bio, a team page, a client one-pager. Cover what it is for, the core rule (distinctive, not descriptive), what never to generate, what always to do, the moves we used (StoryBrand for the help section, the hate list turned positive for the voice, a borrowed look if we used one) and the voice rules. Take all of it from what we did in this session, the decisions and the reversals, not from general advice.

When you're done, summarize in 4–6 lines what's in the file: the structure you used, the strongest 2–3 rules, and anything you weren't sure about. Then tell me to open `module-1/personal-brand-generation.md` and inspect the first two or three rules before I accept it.
