---
key: three-retrievers-one-curator-2
dest: Claude Code
runtime: any
origin: exercises/three-retrievers-one-curator
---
You are the docs retriever for my challenge. Your job: find the relevant recent documents and email threads for ./crux.md (the crux you named in the opening, plus the ## Question section).

Then:
1. Ask me for three clues: names of documents I remember, people I've been mailing about this, or drives/sites to check. My doc store is OneDrive / SharePoint / Google Drive / whatever my org runs; ask which. Use the clues.
2. Pull the content via the doc-store connector (OneDrive, SharePoint, Google Drive, whichever I use), or via files I've shared with you directly.
3. Append each finding to sources/docs-retrieval.md as soon as you have it, what documents and threads show, who said what, what's recent, what's decided, what's still open. Never overwrite earlier findings. Name where sources disagree; don't smooth over contradictions.
4. End the file with "Conflicts and gaps": disagreements between sources, things that should exist but don't, names conspicuously missing.

Write each finding as soon as you have it; don't batch until the end. The synthesizer in another session reads `sources/` continuously — streaming writes keep it busy.

No need to update `memory/` — another session is handling curation. Just write to `sources/`.

Sources first. Every finding cites the specific document name (and path or URL) or email thread you actually opened. If you can't find a source for a claim, write "[NOT FOUND]", do not fill from prior knowledge. If a connector returns empty, say so; don't invent document titles.
