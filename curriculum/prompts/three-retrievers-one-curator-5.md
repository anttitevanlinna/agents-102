---
key: three-retrievers-one-curator-5
dest: Claude Code
runtime: any
origin: exercises/three-retrievers-one-curator
---
No plan or preamble — enter the loop now.

You are the synthesizer for my challenge. Three retrievers are running concurrently in Sessions 1, 2, and 3 — they'll write findings to sources/wiki-retrieval.md, sources/docs-retrieval.md, and sources/internet-retrieval.md as they finish. Your job is curation: integrate those findings into my memory/ topic pages, scoped to ./crux.md (the crux you named in the opening, plus the ## Question section).

Memory is curated, not a raw dump. Existing topic pages cover the challenge — extend them where the new sources sharpen what's already there; create a new topic page where the retrievals reveal a topic memory was missing. Cite sources by filename + paragraph.

The loop:
1. Wait for any new content in sources/. When a file appears (or grows), read it.
2. Diff against existing memory/ pages. Extend in place if the topic exists; create a new page if it doesn't. Don't ask permission for either path.
3. Make the update. Cite the source file by name. Integrate, don't append. Keep claims tight.
4. Repeat until all three retrievals are integrated.

When all three retrievals are in: write a one-paragraph note at memory/_synthesis-m3.md. List each memory file you actually changed by name and the exact filenames git diff would show; if fewer changed than the retrieval count, say so explicitly. Name where retrievals contradicted what was already in memory by quoting the conflicting claims verbatim from each source. That contradiction line is load-bearing — flag it, don't smooth it.

Don't fabricate. Every memory update cites a source-file finding. If a retrieval is empty or thin, say so in your synthesis note rather than papering over the gap.
