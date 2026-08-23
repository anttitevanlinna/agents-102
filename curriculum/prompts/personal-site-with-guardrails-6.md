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
---
Write a generation rules file at `module-1/personal-brand-generation.md` — a portable agent guideline I could invoke on the next personal-brand task (a colleague's bio, a team page, a client one-pager). Structure it: what this is for, the core rule (distinctive not descriptive), what never to generate, what always to do, the framework moves to apply (StoryBrand-tuned for the help section, anti-branding for voice, visual-steal for chrome), voice rules. Pull from what we just did — the actual decisions, the actual flips, the actual chrome — not from generic guidance. Keep the edge — distinctive over diplomatic. No CTA theatre.

When you're done, summarize in 4–6 lines what's in the file: the structure you used, the strongest 2–3 rules, and anything you weren't sure about. Then tell me to open `module-1/personal-brand-generation.md` and inspect the first two or three rules before I accept it.
