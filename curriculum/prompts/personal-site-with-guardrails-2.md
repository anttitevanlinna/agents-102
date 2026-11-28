---
key: personal-site-with-guardrails-2
dest: Claude Code
runtime: any
origin: exercises/personal-site-with-guardrails
requires:
  - id: m1-site
    source: prompt:personal-site-with-guardrails-1
produces:
  - id: m1-site
    location: module-1/site.html
    note: StoryBrand-tuned revision in place
---
Rework the section of my site about how I help colleagues, using Donald Miller's StoryBrand. The page stays about me: my name in the headline, my current work up front. Only this one section changes. A colleague who reads it should think: this is the person I want to work with more, on the things they're great at.

Use five beats: Character (the colleague), Problem (the work they're stuck on or want more of), Guide (why I'm their natural ally), Plan (what working with me is like), Success (what has changed for them a year from now). Leave out Stakes and Call to Action. Nobody is buying anything.

Ask me one beat at a time and wait for each answer. After the fifth, regenerate `module-1/site.html`, with the section written as prose in my voice, as sharp as my answers.
