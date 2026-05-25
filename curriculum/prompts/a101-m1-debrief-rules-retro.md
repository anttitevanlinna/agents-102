---
key: a101-m1-debrief-rules-retro
dest: Claude Code
runtime: any
origin: agents-101/getting-going
requires:
  - id: m1-brand-rules
    source: module:getting-going
produces:
  - id: m1-brand-rules
    location: module-1/personal-brand-generation.md (overwrite in place)
    note: retro applied in place; module-scoped, not read by later modules
---
Start by reading the file. No plan or preamble.

Read `module-1/personal-brand-generation.md`. Then re-read what we did building the site. Run a retro: which moves landed, which fell flat, where context broke through, where the output stayed generic. Compare the rules file to the actual work. Sort each rule into keep, sharpen, or drop. What's missing the rules should have caught? Find what's still surface; don't defend the file as-is.

Assume the rules file is at least 30% wrong or thin. Find that 30%. If fewer than two rules get dropped or substantially rewritten, say why before you proceed.

Then overwrite `module-1/personal-brand-generation.md` with the retro applied. Sharpen what's weak. Add what's missing. Drop what's wrong. Rewrite the file in place; don't append a "retro notes" section.

When you're done, list:
- dropped: rule text + reason
- sharpened: before -> after
- added: rule text + why the session needed it
- still uncertain: anything the rules should cover but you want me to weigh in on first
