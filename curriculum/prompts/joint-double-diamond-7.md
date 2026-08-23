---
key: joint-double-diamond-7
dest: Builder Claude
runtime: any
origin: exercises/joint-double-diamond
requires:
  - id: m8-selection-board
    source: external
  - id: m8-midway-instructions
    source: prompt:joint-double-diamond-6
produces:
  - id: m8-critiques
    location: shared-folder/<participant>/critique.md
---
Read midway-instructions.md and selection-board.md at the shared folder root. Follow the injected instructions before writing.

Write `critique.md` in the exact participant subfolder where you wrote `context-manifest.md`.

If midway-instructions.md tells me to cross-pollinate, first read the required participant folders and name which files changed my critique.

First, criticize the current selection:
- What did the synthesizer choose well?
- What did it miss?
- Which selected idea is under-cited or overconfident?
- Which rejected idea deserves another look?

Then propose a better idea if you have one:
- Better crux, policy, experiment, or risk.
- Why it beats the current selection.
- What would have to be true for it to work.
- One pre-mortem failure story if the room adopts it.

Cite every claim against a memory file, a shared-folder file, or a selection-board entry.
