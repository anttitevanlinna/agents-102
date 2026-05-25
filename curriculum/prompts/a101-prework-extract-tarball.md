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
    location: working dir (prework/, memory/, sources/, agents/, .claude/, module-4/policies/)
    consumed-by:
      - module:getting-going
      - module:building-agent-systems
      - module:multi-agent-systems
      - module:security
---
Extract the starter tarball in the working folder. Use the shell:

  tar xzf agents-101-starter.tar.gz

(Leave `agents-101-starter.tar.gz` behind; Cowork's sandbox can't always delete host-dropped files. Harmless.)

Then list what's in the working directory and confirm these folders exist:
prework/, memory/, sources/, agents/, .claude/, and module-4/policies/.
If tar is not available, tell me what error you got.
