# Prework

Before Module 1. Three tasks and one read. About 45 minutes.

Your facilitator (self-study skill or trainer) walks you through these. You don't need to set anything up first — by the time you read this, Claude Code is already open at your working directory. Files land there.

## Before you start (5 min setup check)

- **A Claude account** at claude.ai. The training runs on Claude Pro or Team tier — your sponsor confirms the license.
- **Claude Code installed** — desktop or web, no terminal required. Pick whichever fits your habits; all the exercises work in both.
- **About 45 minutes.** More than it sounds like. Less than it feels like.

### One small thing for lectures — ask Claude to start the lecture server

Lectures render from markdown files via a small local web page. Nothing gets uploaded. You don't run the server; Claude does, inside the session you're already in. This is also your first agentic move of the training — you ask, the agent does.

Paste this prompt into Claude Code:

```
Start a local web server on port 8000 serving the training repo root, running in the background so I can read lectures in my browser. Tell me the URL to open and remind me how to stop the server at end of day.
```

Claude starts the server and hands back a URL — something like `http://localhost:8000/site/curriculum.html`. Open it. You should see the curriculum home page. Bookmark it.

If the URL doesn't load or Claude reports a port conflict, tell Claude — it'll pick a different port and try again. Don't debug it yourself; that's the agent's job.

## Task 1 — Snake game (10 min)

Why a snake game? Because you can tell if it works. No ambiguity — either the snake moves or it doesn't. Also: a working snake game is a small, permanent, perfectly useless thing to own, which makes it more interesting than most of what you produce at work.

In your open Claude Code session, paste this prompt:

```
Build me a snake game as a single HTML file. Save it as snake.html.
```

Claude writes the file. Open `snake.html` in your browser — on macOS, double-click it in Finder; on Windows, right-click → Open with → your browser. Play.

Keep the file. It's yours.

*Proof: Claude Code can write code and save files on your machine.*

## Task 2 — Your week in meetings (10 min)

Two paths. Pick whichever matches your setup.

**Path A — you have a calendar connector** (Microsoft 365 or Google Workspace, enabled for Claude by your IT).

Paste this prompt:

```
List my main meetings this week. Summarize the shape of the week in 5 lines. Save the summary as meetings.txt.
```

**Path B — no connector, or you don't have admin rights to enable one.**

Take a screenshot of your calendar week view. Then paste this prompt:

```
I just took a screenshot of my calendar week view. Find the most recent screenshot on my machine — ask me where it saved if you can't locate it. Read it, list my main meetings this week, and summarize the shape of the week in 5 lines. Save the summary as meetings.txt.
```

*Proof: Claude can read your real work data — in whichever shape you can provide it — and produce a useful summary.*

Stuck on the connector or need specific commands? See [Claude quick reference](curriculum.html?file=reference/claude-quick-reference).

## Task 3 — Read the mental frame (10 min)

If you only do one thing from this prework, do this — the rest builds on it.

Open [What is an Agent, section 1](curriculum.html?file=supplementary/what-is-an-agent). Two pages on LLM vs chat — what changes when you start building systems instead of having conversations. You'll meet the rest of that document section by section as the training goes.

*Proof: you arrive with a rough mental frame, not a blank one.*

---

You walk into Module 1 with Claude Code working, a snake game, a meetings summary, and a 2-page read. Four things. Not nothing. Module 1 just gets going.
