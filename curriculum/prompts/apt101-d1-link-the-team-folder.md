---
key: apt101-d1-link-the-team-folder
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-paint-the-product-box
requires:
  - id: working-tree-scaffold
    source: prompt:apt101-d1-make-the-folders
produces:
  - id: team-folder
    location: "team/ (link to the shared team folder)"
    note: "every later team/ path"
---
Our team shares one folder for this training. I'll paste its path after this. Make it reachable from my training folder as team/, as a link to the shared folder, not a copy.

Then check you can write to it: create team/<my-name>/, write a short test file there, read it back, and delete the test file. Ask me my first name if you don't know it.

Tell me in one line the path team/ now points to, and whether the write worked.

The team folder is at:
