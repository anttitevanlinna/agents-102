---
key: build-your-challenge-memory-2
dest: Claude Code
runtime: any
origin: exercises/build-your-challenge-memory
---
For every source in the curation plan we just agreed, create one file in sources/. Use the best method per source:

- Publicly fetchable URL (practitioner blog, public article)? Fetch the page, save the text as sources/<slug>.md with a header naming URL + title + why-it's-relevant.
- Reachable via a connector you have (wiki, docs, drive)? Pull the content through and save the same way.
- Local file on my laptop at a path I named? Save sources/<slug>.md as a reference — absolute path + title + why-it's-relevant, no copied content. You'll read the actual file directly when Beat 3 needs it.
- Behind a connector you can't reach, or in a tool you don't have? Save sources/<slug>.md as a reference too — URL or path + title + why-it's-relevant + "NOT REACHABLE — share with me when you want this included." Don't ask me to paste anything; if I want it included, I'll share the file.

When done, tell me the three lists: (1) fetched and saved as content, (2) linked by local path, (3) not reachable — waiting for me to attach. I'll attach whatever I want to include before we build the memory.
