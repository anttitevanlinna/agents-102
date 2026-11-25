---
key: a101-prework-extract-tarball
dest: Claude Code
runtime: any
origin: agents-101/prework
requires:
  - id: starter-tarball
    source: external
produces:
  - id: working-tree-scaffold
    location: working dir (prework/, memory/, sources/, agents/, module-4/policies/)
    consumed-by:
      - module:getting-going
      - module:building-agent-systems
      - module:multi-agent-systems
      - module:security
---

Download the course files into this folder and unpack them. Use the shell:

  curl -fLO <CONTENT_URL>
  tar xzf agents-101-starter.tar.gz

If `agents-101-starter.tar.gz` is already in the folder, skip the download. If the download fails, say why in one line and wait: I will download it in my browser and drag it into this folder.

(Leave `agents-101-starter.tar.gz` behind after unpacking. It is harmless.)

Then list what's in the folder and confirm these folders exist:
prework/, memory/, sources/, agents/, and module-4/policies/.
If tar is not available, tell me what error you got.

<!-- maintainer -->

Approval: prompt-ok Antti 2026-11-25 (home-to-M1 card batch). Body = his curl version of 2026-11-18 without the username and password line, which the free edition has no use for.
