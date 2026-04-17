# Claude Quick Reference

Lookup material for the hands-on parts of the training. Curriculum content stays conceptual; when you need a specific command or "how do I do X," this is where X lives.

Scan, find what you need, copy the prompt. For deep feature documentation, each section points to the official Anthropic docs.

**Root docs:** [docs.anthropic.com](https://docs.anthropic.com) — the source of truth for Claude Code features. This reference is a shortcut; the docs are the full answer.

## Claude Code — install and open

- **Desktop app** — download from claude.ai. macOS or Windows. No terminal needed.
- **Web** — claude.ai/code. Nothing to install.
- **Account tier** — Claude Pro or Team (for the training; your sponsor confirms the license).

**Start a new project:** click *New Project*. Give it a name (e.g., `agents-102`). Claude Code opens with that project as its working directory — everything you do happens in that folder.

*Official docs: [docs.anthropic.com → Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) — install paths for macOS, Windows, and the web version.*

## Working with files

Claude Code can read and write files in your project directory. Ending a prompt with "save as X" or "save in this project" writes the file.

**Save output to a file:**

```
[your task]. Save the result as filename.ext in this project.
```

**Have Claude read a file:**

```
Read the file filename.ext in this project. Summarize it in 3 lines.
```

**Have Claude edit a file:**

```
Open filename.ext. Change the heading to "New heading." Save.
```

*Official docs: Claude Code's file tools (Read / Write / Edit) and project scope.*

## Connectors

Connectors let Claude read data from other systems (your calendar, your inbox, your docs) without copy-paste.

**Microsoft 365 (M365).** Your org's IT enables this at the tenant level. Once enabled, it appears in Claude's Connectors panel. Ask Claude naturally: *"List my meetings this week."* Claude uses the connector.

**Google Workspace.** Similar — enabled at your Google org level. Once available, Claude has access to Calendar / Gmail / Drive depending on what was enabled.

**No connector, no admin rights — the screenshot fallback.** Take a screenshot of whatever you want Claude to read (calendar week view, email list, whatever). Attach it to the chat. Write your prompt as if Claude is reading "the screenshot I just shared." Less automation, same result. Use this until IT enables the connector.

*Official docs: Anthropic's Connectors & Integrations documentation — what's available, what each connector can read/write, and the admin steps your IT needs to enable them at tenant level.*

## Skills

Skills are scoped capabilities — bundles of instructions and permissions that make Claude better at a specific task (e.g., *"check this against our security policy"*) without handing over the keys.

You'll build skills in Module 4. For now, know that they exist, they're files, and they scope what Claude can do when the skill is active.

*Official docs: Claude Code Skills — file format, install location, permissions model, and examples.*

## Subagents — when one Claude isn't enough

For tasks that need specialized agents working on different parts of a problem, Claude can launch subagents. You tell Claude: *"use three subagents — one for X, one for Y, one for Z — then synthesize."* Claude delegates to itself in parallel and returns the combined result.

You'll use this in Module 3. For now, know that Claude can delegate.

*Official docs: Claude Code Subagents — invocation patterns, parallelism, and passing context.*

## New conversation, new project — context hygiene

Starting a new project, or a new conversation inside a project, resets the context. Sometimes you want that (fresh take). Sometimes you don't (losing the last 30 minutes of thinking).

Rule of thumb: if the current conversation is producing confused output, start a new one and paste the relevant files back in. Context that's too long degrades — Claude starts forgetting what matters.

## Troubleshooting

**Claude won't write files to my project.** Is Claude Code open on a real folder (not a default/blank chat)? File-write access is project-scoped. Start a new project at a specific path.

**The connector isn't in my Claude.** Your IT admin hasn't enabled it at the tenant level. Use the screenshot fallback. Ask IT to enable it — this is a useful signal for the whole training, not just you.

**Claude is inventing things about my data.** Your context is thin. Give Claude more of the source (paste the whole file, not a summary). Module 5 is where you learn to catch this.

**I want to start over on this exercise.** New project. The current project stays where it is; the new one starts clean.

*Troubleshooting deeper than this: [docs.anthropic.com support section](https://docs.anthropic.com) + Anthropic's status page for platform issues.*

---

**This document grows.** If you hit something during the training that belongs here and isn't, flag it — the reference gets updated. For anything feature-specific, the [official Anthropic docs](https://docs.anthropic.com) are the source of truth.
