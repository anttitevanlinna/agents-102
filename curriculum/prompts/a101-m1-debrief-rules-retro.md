---
key: a101-m1-debrief-rules-retro
dest: Claude Code
runtime: any
origin: agents-101/getting-going
requires:
  - id: m1-brand-rules
    source: prompt:personal-site-with-guardrails-6
  - id: m1-context-trace
    source: prompt:personal-site-with-guardrails-5
produces:
  - id: m1-brand-rules
    location: module-1/personal-brand-generation.md (overwrite in place)
    note: retro applied in place; module-scoped, not read by later modules
callouts:
  - at: Assume the rules file
    say: With a number to find, the agent looks for faults instead of agreeing.
  - at: Then overwrite
    say: Rewriting in place keeps one current file. Appended notes pile up.
---
Run a retro on `module-1/personal-brand-generation.md`. Hold it against what we did building the site and against `module-1/context-trace.md`. Which moves worked, which fell flat, where did my context break through, where did the output stay generic? Sort each rule into keep, sharpen or drop. Name what the rules missed.

Assume the rules file is at least 30% wrong or thin. Find that 30%.

Then overwrite `module-1/personal-brand-generation.md` with the retro applied. Rewrite the file in place; don't append retro notes.

When you're done, list what you dropped and why, what you sharpened (before and after), what you added and why the session needed it, and what you want me to decide.
