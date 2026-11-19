# Prework

Claude will save your game and your calendar summary as files. Give it a place to save them so you can open them again.

<div class="a101-os-picker" role="group" aria-label="Setup for your computer">Setup for: <button type="button" data-a101-os="mac" aria-pressed="false">Mac</button> <button type="button" data-a101-os="windows" aria-pressed="false">Windows</button></div>

## 1. Create a folder called agents-101

<span id="1-set-up-your-agent-runtime-5-min"></span>
<span id="1-choose-your-training-folder"></span>

<div class="a101-video-placeholder rt-profile rt-profile-cowork">Assume there is a short <span data-a101-os-only="mac">Mac</span><span data-a101-os-only="windows">Windows</span> video here showing how to create <code>agents-101</code> and where to look for its name in Claude Desktop once you’ve added it.</div>

<span data-a101-os-only="mac">In Finder, open <strong>Documents</strong>. In the menu bar, click <strong>File</strong>, then <strong>New Folder</strong>.</span> <span data-a101-os-only="windows">In File Explorer, open <strong>Documents</strong>. Click <strong>New</strong>, then <strong>Folder</strong>.</span> Name it `agents-101`.

**Session** *(new, "Prework")*

<span class="rt-cowork">Open **Claude Desktop** and start a new conversation. If you see a choice between Chat and Cowork, pick **Cowork**.</span><span class="rt-code">Start a new session in your selected interface with the `agents-101` folder you created in Documents as the working folder.</span>

<ol class="rt-profile rt-profile-cowork">
<li>Below the box where you type, click <strong>Project or folder</strong>, then <strong>Add folder</strong>. If you see a <strong>+</strong> button instead, click it and choose <strong>Add folder</strong>.</li>
<li>In the window that opens, go to <strong>Documents</strong> and select <code>agents-101</code>. <span data-a101-os-only="mac">Click <strong>Open</strong>.</span><span data-a101-os-only="windows">Confirm your selection.</span> If Claude asks to change files in that folder, check that it names <code>agents-101</code> and click <strong>Allow</strong>.</li>
<li>Look for <code>agents-101</code> next to the message box. When you see it, you can send the game request.</li>
</ol>

## 2. Build a snake game

<span id="4-build-a-snake-game-10-min"></span>

Click **Copy** below. Paste the request into your conversation and send it. Claude will make a folder called `prework` inside `agents-101` and save the game there.

{{prompt:a101-prework-snake-game}}

When the agent says the game is saved, open `agents-101`, then `prework`. Double-click `snake.html` to play in your browser.

Ask for one change you’d like, such as a slower snake. Open the game again to try it. Keep the conversation open and come back here.

## 3. Download the course files

<span id="3-install-the-training-folder-3-min"></span>
<span id="3-install-the-starter-and-set-the-folder-instruction"></span>
<span id="3-add-the-course-files"></span>

The course files include a copy of the handbook and let Claude help you find your place when you come back.

[Download the course files](<CONTENT_URL>). Find `agents-101-starter.tar.gz` in your browser’s downloads and move it into `agents-101` alongside the `prework` folder. Claude will unpack it when you copy and send the request below in the same conversation.

{{prompt:a101-prework-extract-tarball}}

<div class="a101-video-placeholder rt-profile rt-profile-cowork">Assume there is a <span data-a101-os-only="mac">Mac</span><span data-a101-os-only="windows">Windows</span> video here showing how to move the download into <code>agents-101</code> and ask Claude to unpack it.</div>

When Claude says the files are ready, keep this conversation open for the calendar exercise.

## 4. Summarize your week in meetings

<span id="2-connect-your-work-apps-5-min"></span>
<span id="5-summarize-your-week-in-meetings-10-min"></span>

Open your calendar in week view and take a screenshot of the week you want Claude to summarize.

<div class="rt-cli">

Save the screenshot in `agents-101`. Copy the request below, paste it into the same session, and send it.

{{prompt:a101-prework-meetings-screenshot-cli}}

</div>
<div class="rt-desktop">

Attach the screenshot to your message. Copy the request below, paste it into the same message, and send both together.

{{prompt:a101-prework-meetings-screenshot-desktop}}

</div>
<div class="rt-cowork">

Click **+** by the Claude message box and upload the screenshot. Copy the request below, paste it into the same message, and send both together.

{{prompt:a101-prework-meetings-screenshot-cowork}}

</div>

Read the five lines Claude writes. Ask for any changes you want. You’ll find the saved summary under `prework` in `agents-101`. Come back here when you’re ready to go on.

<details>
<summary>Use a calendar connector instead (optional)</summary>

If Claude is already connected to your Microsoft 365 or Google calendar, you can copy and send this request to read it directly.

{{prompt:a101-prework-meetings-connector}}

The screenshot works without connecting your calendar.

</details>

## 5. See what makes this an agent

<span id="6-read-the-mental-frame-10-min"></span>
<span id="5-read-the-mental-frame"></span>

Read [What is an Agent, LLM vs chat](trainings/agents-101/supplementary/what-is-an-agent.md#llm-vs-chat). It explains what changes when your agent can work with files and tools instead of only answering in a chat.

## Continue to Module 1

<span id="bring-to-module-1"></span>

Go to [Module 1: Getting Going](#getting-going). Start a new conversation for it and select the same `agents-101` folder. Your game and meeting summary stay there.

<!-- maintainer -->

## Source verification

- `[checked:2026-11-19 result:OK due:cohort]` https://academy.claude.com/tutorials/get-started-in-claude-cowork-in-three-steps — [official product tutorial] Desktop conversation/mode selection; add a local folder from the message box. fallback: verify the current desktop entry and folder picker before delivery.
- `[checked:2026-11-19 result:OK due:cohort]` https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork — [official product documentation] Approval behaviour varies by mode and organization; learner reviews the actual request. fallback: verify the approval flow without prescribing a mode or blanket permission.
- `[checked:2026-11-19 result:OK due:cohort]` https://academy.claude.com/tutorials/getting-started-with-claude — [official product tutorial] The plus menu offers file uploads and Add folder. The Project or folder route and the Allow confirmation were observed in the local Mac setup recording. fallback: match the current app labels before delivery.
- `[checked:2026-11-19 result:OK due:cohort]` https://support.apple.com/guide/mac-help/organize-your-files-in-the-finder-mchle9f0a1b2/mac — [official product guide] Finder File menu includes New Folder. fallback: verify the current menu.
- `[checked:2026-11-19 result:OK due:cohort]` https://support.microsoft.com/en-gb/word/create-a-new-folder — [official product guide] File Explorer New menu includes Folder. fallback: verify the current menu.
