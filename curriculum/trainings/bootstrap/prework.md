# Prework

Before Module 1. Three tasks and one read. About 45 minutes.

Your facilitator (self-study skill or trainer) walks you through these. You don't need to set anything up first. By the time you read this, <span class="rt-code">Claude Code is already open at your working directory</span><span class="rt-cowork">your working directory is already connected in Cowork</span>. Files land there.

## Before you start (5 min setup check)

- **A Claude account** at claude.ai. The training runs on Claude Pro or Team tier (your sponsor confirms the license).
<span class="rt-code">- **Claude Code installed** (CLI or Desktop). Pick whichever fits your habits; all the exercises work in both.</span><span class="rt-cowork">- **Cowork enabled** in your Claude Desktop app (the *Cowork* tab next to *Chat*). No terminal required.</span>
- **About 45 minutes.** More than it sounds like. Less than it feels like.

### One small thing for the recap site

The training has a recap site (every lecture, exercise, and module page rendered clean). You won't read it during teaching (your facilitator teaches inline). You'll come back to it after each lecture or exercise to see what you just lived through, on the official material.

<div class="rt-code">

The site runs locally from markdown files. Nothing uploaded. You don't run the server; Claude does, inside the session you're already in. This is also your first agentic move of the training. You ask, the agent does.

**Prompt** *(Claude Code)*

```
Start a local web server on port 8000 serving the training repo root, running in the background so I can use it as a recap site for the training. Tell me the URL to open and remind me how to stop the server at end of day.
```

Claude starts the server and hands back a URL (something like `http://localhost:8000/site/curriculum.html`). Open it. You should see the curriculum home page. Bookmark it.

If anything goes wrong, tell Claude and let it sort it out. Don't debug it yourself; that's the agent's job.

</div>
<div class="rt-cowork">

The site renders from the markdown in your connected folder. Two paths to reach it, depending on what your trainer set up:

1. **Customer-hosted recap site (default for cohorts).** Your trainer or sponsor shares a password-protected URL: the same curriculum, hosted for your cohort. Open the link in your browser and bookmark it. That's the recap site for the training.
2. **Local file fallback.** If you're running self-study or want a local view, open `site/curriculum.html` from your connected folder directly in your browser. On macOS: in Finder, navigate to the training directory, right-click `site/curriculum.html`, *Open With → your browser*. On Windows: same move from File Explorer. The page loads from `file://` and reads the markdown next to it. No server, no port. Bookmark the resulting tab.

Cowork runs in an isolated environment, so the *Code*-style "ask Claude to start a port-8000 server" move doesn't reach your browser the same way. The hosted URL or the `file://` open does the job without it.

</div>

## Task 1. Snake game (10 min)

Why a snake game? Because you can tell if it works. No ambiguity (either the snake moves or it doesn't). Also: a working snake game is a small, permanent, perfectly useless thing to own, which makes it more interesting than most of what you produce at work.

**Prompt** *(Claude Code)*

```
Build me a snake game as a single HTML file. Save it as snake.html.
```

Claude writes the file. Open `snake.html` in your browser. On macOS, double-click it in Finder; on Windows, right-click → Open with → your browser. Play.

Keep the file. It's yours.

*Proof: Claude Code can write code and save files on your machine.*

## Task 2. Your week in meetings (10 min)

Quick concept first. **A *connector* is a way for Claude to talk directly to one of your work apps (your calendar, your email, your files).** When a connector is on, Claude can fetch your real data ("list my meetings this week") instead of you having to copy-paste it. Connectors are turned on by your IT (not something you install yourself). **How to check:** in Claude Code, click the **+** button next to the prompt, then **Settings → Connectors**. If you see Microsoft 365 or Google Workspace enabled, you have one. If not, you don't, and that's fine.

Two paths. Pick the one that matches what you saw.

**Path A. You have a calendar connector enabled** (Microsoft 365 or Google Workspace).

**Prompt** *(Claude Code)*

```
List my main meetings this week. Summarize the shape of the week in 5 lines. Save the summary as meetings.txt.
```

**Path B (no connector, or you're not sure).** Default to this one if in doubt.

Take a screenshot of your calendar week view, then:

**Prompt** *(Claude Code)*

```
I just took a screenshot of my calendar week view. Find the most recent screenshot on my machine (ask me where it saved if you can't locate it). Read it, list my main meetings this week, and summarize the shape of the week in 5 lines. Save the summary as meetings.txt.
```

*Proof: Claude can read your real work data (in whichever shape you can provide it) and produce a useful summary.*

Stuck on the connector or want specific click-paths? See [Claude quick reference](curriculum.html?file=reference/claude-quick-reference).

## Task 3. Read the mental frame (10 min)

If you only do one thing from this prework, do this. The rest builds on it.

Open [What is an Agent, section 1](curriculum.html?file=supplementary/what-is-an-agent). Two pages on LLM vs chat (what changes when you start building systems instead of having conversations). You'll meet the rest of that document section by section as the training goes.

*Proof: you arrive with a rough mental frame, not a blank one.*

---

You walk into Module 1 with Claude Code working, a snake game, a meetings summary, and a 2-page read. Four things. Not nothing. Module 1 just gets going.


