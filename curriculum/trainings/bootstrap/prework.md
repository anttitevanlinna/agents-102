# Prework

Land at Module 1 with <span class="rt-code">Claude Code</span><span class="rt-cowork">Cowork</span> working, your work calendar connected or ready as a screenshot, a snake game, a meetings summary, and a 2-page read. About 50 minutes.

## 0. Set up <span class="rt-code">Claude Code</span><span class="rt-cowork">Cowork</span> (5 min)

You need a Claude account at claude.ai. Then create an empty folder at `~/Documents/agents-102-bootstrap/` (right-click in Finder or File Explorer → *New Folder*). This is your training directory; everything you produce over the eight modules lands here.

<span class="rt-code">Install Claude Code (CLI or Desktop). Pick whichever fits your habits; all the exercises work in both. Start a new session at `~/Documents/agents-102-bootstrap/`.</span><span class="rt-cowork">Open the *Cowork* tab next to *Chat* in your Claude Desktop app. Click *New task* and select `~/Documents/agents-102-bootstrap/` as the working folder. No terminal required.</span>

## 1. Connect your work apps (5 min)

Connect either Microsoft 365 or Google Workspace before the first module if your company allows it. Calendar access is enough for the prework. Email, Google Drive, and OneDrive access are useful too, but not required.

Other connectors are optional. If your company uses a wiki, Confluence, Jira, Linear, SharePoint, Google Drive, or a similar shared knowledge base, connect it if you already have access. Those sources become useful later when your agent starts reading company material instead of only the files in the training directory.

<span class="rt-code">In Claude Code, click the **+** button next to the prompt, then **Settings → Connectors**.</span><span class="rt-cowork">In Claude Desktop, open **Customize → Connectors**. The connector list is shared across Claude Desktop and Cowork.</span> Sign in with your work account and enable Microsoft 365 or Google Workspace if it appears.

If your IT admin has not approved the connector yet, keep going. The calendar screenshot path in Task 4 gives you the same teaching moment with less automation. For click-paths and troubleshooting, see [Claude quick reference](reference/claude-quick-reference.md).

## 2. Install the training folder (3 min)

Get the starter file set into your training directory. The starter file set ships the folders and reference material used later in the training: `memory/`, `sources/`, `agents/`, Module 4 policy files, and a self-study companion you can use while doing self-study of the modules.

[Download the starter file set](<CONTENT_URL>) and save it directly into `~/Documents/agents-102-bootstrap/`. You should see `starter.tar.gz` land there in Finder or File Explorer. Then ask Claude to unpack it.

**Prompt** *(Claude Code)*

```
Extract the starter tarball in the working folder. Use the shell:

  tar xzf starter.tar.gz

(Leave `starter.tar.gz` behind — Cowork's sandbox can't always delete host-dropped files. Harmless.)

Then list what's in the working directory and confirm these folders exist:
prework/, memory/, sources/, agents/, .claude/, and module-4/policies/.
If tar is not available, tell me what error you got.
```

*Proof: you placed the file; Claude unpacked it. Two visible steps, no magic.*

## 3. Build a snake game (10 min)

Why a snake game? Because you can tell if it works. No ambiguity (either the snake moves or it doesn't). Also: a working snake game is a small, permanent, perfectly useless thing to own, which makes it more interesting than most of what you produce at work.

**Prompt** *(Claude Code)*

```
Build me a snake game as a single HTML file. Save it as `prework/snake.html`.
```

Claude writes the file. Open `prework/snake.html` in your browser. On macOS, double-click it in Finder; on Windows, right-click → Open with → your browser. Play.

Keep the file. It's yours.

*Proof: Claude can create a working file and save it on your machine.*

## 4. Summarize your week in meetings (10 min)

Quick concept first. **A *connector* is a way for Claude to talk directly to one of your work apps (your calendar, your email, your files).** When a connector is on, Claude can fetch your real data ("list my meetings this week") instead of you having to copy-paste it.

Two paths. Pick the one that matches what you saw.

**Path A. You have a calendar connector enabled** (Microsoft 365 or Google Workspace).

**Prompt** *(Claude Code)*

```
List my main meetings this week. Summarize the shape of the week in 5 lines. Save the summary as `prework/meetings.md`.
```

**Path B (no connector, or you're not sure).** Default to this one if in doubt.

Take a screenshot of your calendar week view, then:

<div class="rt-cli">

**Prompt** *(Claude Code)*

```
I just took a screenshot of my calendar week view. Find the most recent screenshot on my machine (ask me where it saved if you can't locate it). Read it, list my main meetings this week, and summarize the shape of the week in 5 lines. Save the summary as `prework/meetings.md`.
```

</div>
<div class="rt-desktop">

**Prompt** *(Claude Code)*

```
I just attached a screenshot of my calendar week view to this message. Read it, list my main meetings this week, and summarize the shape of the week in 5 lines. Save the summary as `prework/meetings.md`.
```

</div>
<div class="rt-cowork">

**Prompt** *(Claude Code)*

```
I just attached a screenshot of my calendar week view to this message. Read it, list my main meetings this week, and summarize the shape of the week in 5 lines. Save the summary as `prework/meetings.md`.
```

</div>

*Proof: Claude can read your real work data and save a useful summary on your machine.*

Stuck on the connector or want specific click-paths? See [Claude quick reference](reference/claude-quick-reference.md).

## 5. Read the mental frame (10 min)

If you only do one thing from this prework, do this. The rest builds on it.

Open [What is an Agent — LLM vs chat](supplementary/what-is-an-agent.md#llm-vs-chat). Two pages on LLM vs chat (what changes when you start building systems instead of having conversations). You'll meet the rest of that document section by section as the training goes.

*Proof: you arrive with a rough mental frame, not a blank one.*

## Bring to Module 1

You walk into Module 1 with <span class="rt-code">Claude Code</span><span class="rt-cowork">Cowork</span> working, calendar access checked, a snake game, a meetings summary, and a 2-page read. Five things. Not nothing. Module 1 just gets going.

<!-- maintainer -->

**Quality:** draft 2026-04-30
- draft 2026-04-30 (connector setup step added after maintainer review; needs re-review)
- maintainer-reviewed 2026-04-29 (Antti, Bootstrap prework manual cohort-prep run; install path tested end-to-end under Cowork lens, snake + meetings + read all verified)

**TODO (Claude Code Desktop edition review 2026-04-29):**
- Prompt 1 includes Cowork-specific wording: "Leave `starter.tar.gz` behind — Cowork's sandbox can't always delete host-dropped files." Harmless, but odd in the Desktop edition. Prompt-block change is gated: propose before/after before editing. Likely fix is a runtime fork or neutral sentence.
