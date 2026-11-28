---
key: personal-site-with-guardrails-3
dest: Claude Code
runtime: any
origin: exercises/personal-site-with-guardrails
requires:
  - id: m1-site
    source: prompt:personal-site-with-guardrails-2
produces:
  - id: m1-site
    location: module-1/site.html
    note: positioned by the learner's belief, rewritten in place
callouts:
  - at: Position my site
    say: Naming a known method gives the agent the whole method in a few words.
  - at: First help me say X
    say: A rough try is enough. The agent offers sharper versions and you choose.
---
Position my site with Seth Godin's line: this is for people who believe X.

First help me say X. My rough try is below. Push it until it is uniquely me: offer three sharper versions, built from my hate list and my profile, and wait for my answer.

Then let the belief decide what the page leads with and what it leaves out. A colleague who believes it too should read the page and think: this is the person I want to work with more. Everyone else can walk past. Don't add a section for the belief. Rewrite `module-1/site.html`.

My rough try:
