# Prework

Land at Module 1 with <span class="rt-code">Claude Code</span><span class="rt-cowork">Cowork</span> working, a snake game, a meetings summary, and a 2-page read. About 45 minutes.

## 0. Set up <span class="rt-code">Claude Code</span><span class="rt-cowork">Cowork</span> (5 min)

You need a Claude account at claude.ai. Then create an empty folder at `~/Documents/agents-102-bootstrap/` (right-click in Finder or File Explorer → *New Folder*). This is your training directory; everything you produce over the eight modules lands here.

<span class="rt-code">Install Claude Code (CLI or Desktop). Pick whichever fits your habits; all the exercises work in both. Start a new session at `~/Documents/agents-102-bootstrap/`.</span><span class="rt-cowork">Open the *Cowork* tab next to *Chat* in your Claude Desktop app. Click *New task* and select `~/Documents/agents-102-bootstrap/` as the working folder. No terminal required.</span>

## 1. Install the training folder (3 min)

Get the starter file set into your training directory. The starter file set ships an empty skeleton (eight module folders, plus `memory/`, `sources/`, `agents/`) and a self-study companion you can use while doing self-study of the modules.

[Download the starter file set](<CONTENT_URL>) and save it directly into `~/Documents/agents-102-bootstrap/`. You should see `starter.tar.gz` land there in Finder or File Explorer. Then ask Claude to unpack it.

**Prompt** *(Claude Code)*

```
Extract the starter tarball in the working folder. Use the shell:

  tar xzf starter.tar.gz
  rm starter.tar.gz

Then list what's in the working directory and confirm these folders exist:
prework/, module-1/ through module-8/, memory/, sources/, agents/, .claude/.
If tar is not available, tell me what error you got.
```

*Proof: you placed the file; Claude unpacked it. Two visible steps, no magic.*

## 2. Build a snake game (10 min)

Why a snake game? Because you can tell if it works. No ambiguity (either the snake moves or it doesn't). Also: a working snake game is a small, permanent, perfectly useless thing to own, which makes it more interesting than most of what you produce at work.

**Prompt** *(Claude Code)*

```
Build me a snake game as a single HTML file. Save it as snake.html.
```

Claude writes the file. Open `snake.html` in your browser. On macOS, double-click it in Finder; on Windows, right-click → Open with → your browser. Play.

Keep the file. It's yours.

*Proof: Claude Code can write code and save files on your machine.*

## 3. Summarize your week in meetings (10 min)

Quick concept first. **A *connector* is a way for Claude to talk directly to one of your work apps (your calendar, your email, your files).** When a connector is on, Claude can fetch your real data ("list my meetings this week") instead of you having to copy-paste it. Connectors are turned on by your IT (not something you install yourself). **How to check:** <span class="rt-code">in Claude Code, click the **+** button next to the prompt, then **Settings → Connectors**.</span><span class="rt-cowork">in Claude Desktop, open **Customize → Connectors** (the connector list is shared across the Desktop app).</span> If you see Microsoft 365 or Google Workspace enabled, you have one. If not, you don't, and that's fine.

Two paths. Pick the one that matches what you saw.

**Path A. You have a calendar connector enabled** (Microsoft 365 or Google Workspace).

**Prompt** *(Claude Code)*

```
List my main meetings this week. Summarize the shape of the week in 5 lines. Save the summary as meetings.txt.
```

**Path B (no connector, or you're not sure).** Default to this one if in doubt.

Take a screenshot of your calendar week view<span class="rt-cowork"> and attach it to your next message via the **(+)** button</span>, then:

<div class="rt-code">

**Prompt** *(Claude Code)*

```
I just took a screenshot of my calendar week view. Find the most recent screenshot on my machine (ask me where it saved if you can't locate it). Read it, list my main meetings this week, and summarize the shape of the week in 5 lines. Save the summary as meetings.txt.
```

</div>
<div class="rt-cowork">

**Prompt** *(Claude Code)*

```
I just attached a screenshot of my calendar week view to this message. Read it, list my main meetings this week, and summarize the shape of the week in 5 lines. Save the summary as meetings.txt.
```

</div>

*Proof: Claude can read your real work data (in whichever shape you can provide it) and produce a useful summary.*

Stuck on the connector or want specific click-paths? See [Claude quick reference](curriculum.html?file=reference/claude-quick-reference).

## 4. Read the mental frame (10 min)

If you only do one thing from this prework, do this. The rest builds on it.

Open [What is an Agent, section 1](curriculum.html?file=supplementary/what-is-an-agent). Two pages on LLM vs chat (what changes when you start building systems instead of having conversations). You'll meet the rest of that document section by section as the training goes.

*Proof: you arrive with a rough mental frame, not a blank one.*

## Bring to Module 1

You walk into Module 1 with <span class="rt-code">Claude Code</span><span class="rt-cowork">Cowork</span> working, a snake game, a meetings summary, and a 2-page read. Four things. Not nothing. Module 1 just gets going.


