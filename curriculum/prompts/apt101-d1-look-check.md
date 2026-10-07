---
key: apt101-d1-look-check
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-send-it-off
requires:
  - id: morning-agent-output
    source: prompt:personal-agent-homework-3
produces:
  - id: look-check
    location: "module-2/morning-agent/look-check.html"
    note: "opened for the look; latest.html stays unread until Day 2"
---
Copy module-2/morning-agent/latest.html to module-2/morning-agent/look-check.html. In the copy, replace every line of text with placeholder text of about the same length. Keep the layout, colours, type and images exactly as they are.

Then open look-check.html in my browser.

Don't quote, summarise or describe what latest.html says, in the chat or anywhere else. Reply only with the path of the copy.
