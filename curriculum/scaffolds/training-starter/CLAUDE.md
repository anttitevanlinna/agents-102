# Brain Rules

Rules Claude follows when writing to `brain/` and `agents/` in this folder. Used from Module 2 onward.

## Brain pages (in `brain/`)

Each topic page has the same shape:

- **Title.** One line. Names what the page is about.
- **Claims.** Three to five. Each claim is one sentence. Every claim ends with a citation in the form `[sources/<filename>]` pointing to the file in `sources/` that backs it.
- **Open questions.** A short list of things the sources disagree on, leave unclear, or don't cover. Not a placeholder — this section is load-bearing.

`brain/index.md` lists every topic page with a one-line description. Keep it in sync when pages are added or renamed.

## Distinctive, not descriptive

Every claim must be specific to this challenge. *"Pricing strategy is important"* is descriptive — any brain on any pricing challenge would say it. *"Our competitors are still charging per-seat, which means a usage-based switch is a short-lived differentiator"* is distinctive.

If a claim could appear verbatim in a competitor's brain on the same kind of challenge, it's descriptive. Rewrite it or cut it.

## Sources are immutable

Files in `sources/` are the originals. Read them; never modify them. If a source contradicts an existing brain claim, update the brain — not the source.

## Don't invent

If a claim can't be sourced, don't make one. Put the gap in the open questions section. *"We think X"* without a source is worse than *"open question: does X hold in our context?"*

## When updating the brain

Integrate. Don't append. If new sources land and a topic page already exists, rewrite the top of the page to reflect the sharper view. Don't preserve stale claims above new ones — replace them.

## Agents (in `agents/`)

Each agent is a markdown file. Top of the file: one sentence naming what the agent is for. Then its rules — what it cites, what it never does, what voice it uses. The rules on this page (citation, distinctive, don't invent) apply to every agent by default; the agent file names exceptions or additions.
