# Prework

Keep everything you make in one folder on your computer. Start by making a game in it.

<div class="a101-os-picker" role="group" aria-label="Setup for your computer">Setup for: <button type="button" data-a101-os="mac" aria-pressed="false">Mac</button> <button type="button" data-a101-os="windows" aria-pressed="false">Windows</button></div>

## 1. Create a folder called agents-101

<span id="1-set-up-your-agent-runtime-5-min"></span>
<span id="1-choose-your-training-folder"></span>

<div class="a101-video-placeholder rt-profile rt-profile-cowork">Assume there is a short <span data-a101-os-only="mac">Mac</span><span data-a101-os-only="windows">Windows</span> video here: create the training folder in Documents, select it in a new Cowork task, paste the game request below, and open the finished game in a browser.</div>

<span data-a101-os-only="mac">In Finder, open Documents.</span> <span data-a101-os-only="windows">In File Explorer, open Documents.</span> Inside Documents, create an empty folder called `agents-101`.

**Session** *(new, "Prework")*

<span class="rt-cowork">Open **Claude Desktop** and start a new conversation. If you see a choice between Chat and Cowork, pick **Cowork**. From the message box, add a folder and select `agents-101` in Documents.</span><span class="rt-code">Start a new session in your selected interface with the `agents-101` folder you created in Documents as the working folder.</span>

<p class="rt-profile rt-profile-cowork">Once you see <code>agents-101</code> attached, you’re ready to send the game request. If Claude asks for approval, check that it’s asking to make the game in that folder.</p>

## 2. Build a snake game

<span id="4-build-a-snake-game-10-min"></span>

Click **Copy**, paste the request into your task, and send it. The agent will make the `prework` folder and save the game inside it.

{{prompt:a101-prework-snake-game}}

When the agent says the game is saved, open `agents-101`, then `prework`. Double-click `snake.html` to play in your browser.

Try a change of your own: ask for different colours, a slower snake, or whatever would make it more fun. Play again, then return here. Keep this task open for the next step.

## 3. Add the course files

<span id="3-install-the-training-folder-3-min"></span>
<span id="3-install-the-starter-and-set-the-folder-instruction"></span>

Once you’ve played your game, [download the course files](<CONTENT_URL>). Move `agents-101-starter.tar.gz` into `agents-101`, next to the `prework` folder. Copy and send this request in the same task to unpack the download.

{{prompt:a101-prework-extract-tarball}}

<div class="a101-video-placeholder rt-profile rt-profile-cowork">Assume there is a <span data-a101-os-only="mac">Mac</span><span data-a101-os-only="windows">Windows</span> video here showing how to download the starter into the training folder and where to add the folder reading instruction below.</div>

<p class="rt-profile rt-profile-cowork a101-folder-instruction">To help a new task pick up where you left off, open <strong>Customize</strong> in Claude Desktop. Add <code>Read CLAUDE.md before working in this folder.</code> to the folder instructions for <code>agents-101</code>. Select that same folder when you start a new task.</p>

You can now use [Pause learning](#pause-learning) and [Resume learning](#resume-learning) to save and find your place. Keep revising the current work for as long as you want before continuing.

## 4. Summarize your week in meetings

<span id="2-connect-your-work-apps-5-min"></span>
<span id="5-summarize-your-week-in-meetings-10-min"></span>

Take a screenshot of your calendar week view.

<div class="rt-cli">

Save it in the training folder, then copy this request:

{{prompt:a101-prework-meetings-screenshot-cli}}

</div>
<div class="rt-desktop">

Attach it to your task, then copy this request:

{{prompt:a101-prework-meetings-screenshot-desktop}}

</div>
<div class="rt-cowork">

Attach it to your task, then copy this request:

{{prompt:a101-prework-meetings-screenshot-cowork}}

</div>

The summary is saved as `prework/meetings.md`. Ask for any changes you want, then return here.

<details>
<summary>Use a calendar connector instead (optional)</summary>

A connector lets the agent read a work app directly. If you already have a Microsoft 365 or Google Workspace calendar connector enabled, use this request instead of the screenshot:

{{prompt:a101-prework-meetings-connector}}

Connecting work apps is optional. If you want to set one up, use the connector settings in your selected interface and your company's access policy. You can continue with the screenshot without setting up a connector.

</details>

## 5. See what makes this an agent

<span id="6-read-the-mental-frame-10-min"></span>
<span id="5-read-the-mental-frame"></span>

Read [What is an Agent, LLM vs chat](trainings/agents-101/supplementary/what-is-an-agent.md#llm-vs-chat). It explains what changes when your agent can work with files and tools instead of only answering in a chat.

## Continue to Module 1

<span id="bring-to-module-1"></span>

Keep your snake game, meetings summary, and installed starter in the training folder. End this task when you are ready. Module 1 starts with a fresh task in the same `agents-101` folder.

<!-- maintainer -->

## Source verification

- `[checked:2026-11-19 result:OK due:cohort]` https://academy.claude.com/tutorials/get-started-in-claude-cowork-in-three-steps — [official product tutorial] Desktop conversation/mode selection; add a local folder from the message box. fallback: verify the current desktop entry and folder picker before delivery.
- `[checked:2026-11-19 result:OK due:cohort]` https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork — [official product documentation] Approval behaviour varies by mode and organization; learner reviews the actual request. fallback: verify the approval flow without prescribing a mode or blanket permission.
- `[checked:2026-11-19 result:OK due:cohort]` https://claude.com/resources/guides/claude-cowork-product-guide/getting-started — [official product guide] Folder instructions live in Customize in Claude Desktop. fallback: verify the current location for the folder instruction before delivery.
