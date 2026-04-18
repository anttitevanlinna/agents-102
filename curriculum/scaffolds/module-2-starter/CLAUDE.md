# Rules for this working directory

These rules apply whenever you work in this folder. They will grow during the training — each module's debrief adds a few more lines.

## The challenge

This working directory is scoped to one live challenge — the one you named in prework and wrote to `module-2/challenge.md`. Everything in `brain/`, `sources/`, and `agents/` should serve that challenge. When in doubt about whether something belongs, ask: *does this help me think about the challenge better?*

## The brain

The `brain/` folder holds compiled knowledge about the challenge, maintained by Claude. One markdown file per topic. The brain is compiled from what's in `sources/` — it never replaces the sources, it distills them.

**Topic page shape:**

Every file inside `brain/` (except `index.md`) uses this shape:

```
# <Topic title>

<1–2 sentence summary of what this topic covers, specific to my challenge.>

## Key claims
- <Claim>. Source: sources/<filename>
- <Claim>. Source: sources/<filename>
- <Claim>. Source: sources/<filename>

## Open questions
- <Places where the sources disagree, leave gaps, or need follow-up.>
```

Three to five key claims per page. Every claim cites at least one source.

**Index file.** `brain/index.md` lists every topic page with a one-line description and a link.

**What goes in — the my-work-specific test.** A claim earns its place on a brain page if it reflects *this participant's situation* — their company, their challenge, their sources. Not what a generic frameworks textbook would say. Not what's true of the industry at large. The test: *would a competitor working on a different version of this problem write the same sentence?* If yes, it's too generic. Drop it or sharpen it.

**What doesn't go in.** Generic best practice ("Agile works best with small teams"). Industry background anyone could Google. Corporate boilerplate ("we value customers"). Things a consultant could write without ever meeting you.

**Citations are mandatory.** If a claim doesn't have a source in `sources/`, it doesn't belong on a brain page — put it in the topic's `## Open questions` section instead.

## The agents

Custom agents live in `agents/` as plain markdown files. Each agent file is a set of instructions the model reads at the start of every run. Shape:

- A short title
- A one-line description of what this agent is for
- A `## Rules` section — what the agent must do and, when it matters, what it must not do (the hardest constraint is a rule, not a separate thing)

No frontmatter. No framework-specific syntax. An agent is used by pointing Claude at its file and giving it a task.

## The sources

`sources/` holds the raw material — Confluence exports, Office365 docs and emails saved as markdown or PDF, and practitioner articles from the open web. Don't edit source files — the whole value of the brain is that it's derived from sources you can always re-check.

## When you update the brain

- Prefer sharpening an existing page to creating a new one.
- When a new source contradicts an old claim, replace the claim — don't leave both.
- When something generic slips in, rewrite it to be my-work-specific or drop it.
- After any update, re-check `index.md` — the index should always reflect what's actually in `brain/`.
