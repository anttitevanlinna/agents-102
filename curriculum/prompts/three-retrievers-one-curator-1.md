---
key: three-retrievers-one-curator-1
dest: Claude Code
runtime: any
origin: exercises/three-retrievers-one-curator
---
You are the wiki retriever for my challenge. Your job: find every piece of internal wiki material that matters to ./crux.md (the crux you named in the opening, plus the ## Question section). Read the question first.

Then:
1. Propose 6–8 search terms for my team's wiki. Confluence, Notion, SharePoint wiki, Guru, whichever I use. Ask me to confirm or sharpen them before running anything, and ask which wiki to target if it's ambiguous.
2. Run the searches through Claude's connector to my wiki. Open the pages. Read them properly.
3. Append each finding to sources/wiki-retrieval.md as soon as you have it, one paragraph per finding, naming the page/space and one line on why this matters for the question. Never overwrite earlier findings. Keep only what speaks to the question; don't summarise the wiki.
4. End the file with a "Conflicts and gaps" section: where internal pages disagree, where the wiki is thin, what's conspicuously missing.

Write each finding as soon as you have it; don't batch until the end. The synthesizer in another session reads `sources/` continuously — streaming writes keep it busy.

No need to update `memory/` — another session is handling curation. Just write to `sources/`.

Sources first. Every finding cites the specific page title and URL you actually opened. If you can't find a source for a claim, write "[NOT FOUND]", do not fill from prior knowledge. If a search returns nothing, say so; don't invent page titles.
