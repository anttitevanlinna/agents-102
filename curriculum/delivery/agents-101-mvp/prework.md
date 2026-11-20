# First steps

<h2 id="make-my-first-game">1. Make and play Snake</h2>

<span id="4-build-a-snake-game-10-min"></span>
<span id="2-build-a-snake-game"></span>
<span id="2-make-the-game"></span>

<div class="rt-cowork">
<div class="a101-game-start">

Click **Copy request** below. In Claude Desktop, click **New**, then **Cowork**. Paste into the empty message box and click the **Send** arrow on its right.

<div class="a101-video-placeholder">Assume there is a short video here. In Claude Desktop, watch someone choose <strong>New → Cowork</strong>, click the message box, paste “Build me a snake game” and press <strong>Send</strong>. The video cuts to the finished board and shows the first click dropping an apple.</div>

<div data-copy-label="Copy request">

**Prompt** Cowork

```text
Build me a snake game as one HTML file I can play here. Let me click an empty square to drop an apple. For the first 30 seconds, steer the snake for me so I can’t lose. Chase each apple I drop. Show “Click to drop an apple” on the board from the start.

Then offer me the arrow keys if I want to steer. Keep a [back to the handbook](https://agents102.bosser.consulting/clients/acme-mvp/agents-101/#open-cowork-and-add-a-folder) link on the board and in your reply.
```

<p class="a101-copy-status" data-copy-status role="status" data-copy-message="Copied. Paste into Cowork and press Send."></p>
</div>

Give Claude about a minute. When the board says **Click to drop an apple**, click an empty square. Watch your snake turn toward it. Drop another apple wherever you like.

Only see Claude’s reply? Click the Snake game in the reply. If it downloads, double-click the HTML file to play.

Want to change a rule? Tell Claude. When you’re ready to keep your game, choose **Back to the handbook** on the board.

</div>

<details>
<summary>If the preview doesn’t open</summary>
<p>If the reply contains the finished HTML file, download it and double-click it to play in your browser. Keep the Claude conversation open so you can still save the game in step 2.</p>

If there’s no playable file in the reply, [make and add your course folder](#open-cowork-and-add-a-folder). Then copy and send this request in the conversation with that folder.

{{prompt:a101-prework-snake-game}}

Open `prework/snake.html` inside your course folder to play. You can then [add the course files](#3-download-the-course-files).

</details>

</div>

<div class="rt-code">

[Make a folder for your game](#open-cowork-and-add-a-folder), then send the request below in a session using that folder.

{{prompt:a101-prework-snake-game}}

Double-click `prework/snake.html` inside your folder to play in your browser.

</div>

<span id="3-play-your-game"></span>

<h2 id="open-cowork-and-add-a-folder">2. Keep the version you made</h2>

<div class="a101-os-picker" role="group" aria-label="Setup for your computer">Your computer <button type="button" data-a101-os="mac" aria-pressed="false">Mac</button> <button type="button" data-a101-os="windows" aria-pressed="false">Windows</button></div>

<span id="1-set-up-your-agent-runtime-5-min"></span>
<span id="1-choose-your-training-folder"></span>
<span id="1-create-a-folder-called-agents-101"></span>

<div class="rt-cowork">

Right now your game is in the conversation. Give it a home on your computer so you can open it again. The folder will hold the work you do here, including your calendar briefing.

<div class="a101-video-placeholder rt-profile rt-profile-cowork">Assume there is a short <span data-a101-os-only="mac">Mac</span><span data-a101-os-only="windows">Windows</span> video here showing the clicks from <strong>Add folder</strong> until you see <code>agents-101</code> below the message box.</div>

<ol>
<li data-a101-os-only="windows">In File Explorer, open <strong>Documents</strong>. Click <strong>New</strong>, then <strong>Folder</strong>. Name it <code>agents-101</code>.</li>
<li>Below the message box, click <strong>Project or folder</strong>, then <strong>Add folder</strong>. You can also find <strong>Add folder</strong> under <strong>+</strong>.</li>
<li data-a101-os-only="mac">In the picker, click <strong>Documents</strong> in the sidebar, then <strong>New Folder</strong>. Name it <code>agents-101</code> and click <strong>Create</strong>, then <strong>Open</strong>. If you have the folder already, select it and click <strong>Open</strong>.</li>
<li data-a101-os-only="windows">In the picker, open <strong>Documents</strong>, select <code>agents-101</code>, and confirm your selection.</li>
</ol>

If Claude asks for permission, click **Allow** after checking that it names `agents-101`. When **agents-101** appears below the message box, copy and send this in the same conversation.

**Prompt** Cowork

```text
Save the game we just made as `prework/snake.html` in the folder I added.
```

Wait for Claude to say it saved the game. **Documents → agents-101 → prework** is where you can find it again.

</div>

<div class="rt-code">
<p><span data-a101-os-only="mac">In Finder, open <strong>Documents</strong> and click <strong>File</strong>, then <strong>New Folder</strong>.</span><span data-a101-os-only="windows">In File Explorer, open <strong>Documents</strong> and click <strong>New</strong>, then <strong>Folder</strong>.</span> Name it <code>agents-101</code>. Start a new session with the <code>agents-101</code> folder you created in Documents as the working folder.</p>
</div>


<div class="rt-code">Ask Claude for a change you’d like to try. Play another round.</div>

## 3. Download the course files

<span id="3-install-the-training-folder-3-min"></span>
<span id="3-install-the-starter-and-set-the-folder-instruction"></span>
<span id="3-add-the-course-files"></span>
<span id="4-download-the-course-files"></span>

The course files include a copy of the handbook and let Claude help you find your place when you come back.

[Download the course files](<CONTENT_URL>). Find `agents-101-starter.tar.gz` in your browser’s downloads and move it into `agents-101` alongside the `prework` folder. Claude will unpack it when you copy and send the request below in the same conversation.

{{prompt:a101-prework-extract-tarball}}

<div class="a101-video-placeholder rt-profile rt-profile-cowork">Assume there is a <span data-a101-os-only="mac">Mac</span><span data-a101-os-only="windows">Windows</span> video here showing how to move the download into <code>agents-101</code> and ask Claude to unpack it.</div>

When Claude says the files are ready, keep this conversation open for the calendar exercise.

## 4. Summarize your week in meetings

<span id="2-connect-your-work-apps-5-min"></span>
<span id="5-summarize-your-week-in-meetings-10-min"></span>
<span id="5-summarize-your-week-in-meetings"></span>

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
<span id="6-see-what-makes-this-an-agent"></span>

Read [What is an Agent, LLM vs chat](trainings/agents-101/supplementary/what-is-an-agent.md#llm-vs-chat). It explains what changes when your agent can work with files and tools instead of only answering in a chat.

## Continue to Module 1

<span id="bring-to-module-1"></span>

Go to [Module 1: Getting Going](#getting-going). Start a new conversation for it and select the same `agents-101` folder. Your game and meeting summary stay there.

<!-- maintainer -->

## Source verification

- `[checked:2026-11-19 result:OK due:cohort]` https://academy.claude.com/tutorials/get-started-in-claude-cowork-in-three-steps — [official product tutorial] Desktop conversation/mode selection; add a local folder from the message box. fallback: verify the current desktop entry and folder picker before delivery.
- `[checked:2026-11-19 result:OK due:cohort]` https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork — [official product documentation] Approval behaviour varies by mode and organization; learner reviews the actual request. fallback: verify the approval flow without prescribing a mode or blanket permission.
- `[checked:2026-11-19 result:OK due:cohort]` https://academy.claude.com/tutorials/getting-started-with-claude — [official product tutorial] The plus menu offers file uploads and Add folder. The local Mac setup recording shows New, Project or folder, Add folder, Documents, New Folder, Create, Open and Allow. A native Mac run also confirmed the plus menu and a separate folder-access confirmation after Send. fallback: match the current app labels before delivery.
- `[checked:2026-11-19 result:OK due:cohort]` https://support.apple.com/guide/mac-help/organize-your-files-in-the-finder-mchle9f0a1b2/mac — [official product guide] Finder File menu includes New Folder. fallback: verify the current menu.
- `[checked:2026-11-19 result:OK due:cohort]` https://support.microsoft.com/en-gb/word/create-a-new-folder — [official product guide] File Explorer New menu includes Folder. fallback: verify the current menu.
