# First steps

Make a folder, send one request, and open your game. You’ll add the course files after you’ve played.

<h2 id="open-cowork-and-add-a-folder">1. Make the agents-101 folder</h2>

<span id="1-set-up-your-agent-runtime-5-min"></span>
<span id="1-choose-your-training-folder"></span>
<span id="1-create-a-folder-called-agents-101"></span>

<div class="a101-os-picker" role="group" aria-label="Setup for your computer">Your computer <button type="button" data-a101-os="mac" aria-pressed="false">Mac</button> <button type="button" data-a101-os="windows" aria-pressed="false">Windows</button></div>

<div class="a101-video-placeholder rt-profile rt-profile-cowork">Assume there is a short <span data-a101-os-only="mac">Mac</span><span data-a101-os-only="windows">Windows</span> video here showing the clicks from <strong>Add folder</strong> until you see <code>agents-101</code> below the message box.</div>

<div class="rt-cowork">
<ol>
<li data-a101-os-only="windows">In File Explorer, open <strong>Documents</strong>. Click <strong>New</strong>, then <strong>Folder</strong>. Name it <code>agents-101</code>.</li>
<li>Open <strong>Claude Desktop</strong>. Click <strong>New</strong> in the sidebar. If the message box shows both <strong>Chat</strong> and <strong>Cowork</strong>, click <strong>Cowork</strong>. If there’s just a message box, continue there.</li>
<li>Below the message box, click <strong>Project or folder</strong>, then <strong>Add folder</strong>. You can also find <strong>Add folder</strong> under <strong>+</strong>.</li>
<li data-a101-os-only="mac">In the picker, click <strong>Documents</strong> in the sidebar, then <strong>New Folder</strong>. Name it <code>agents-101</code> and click <strong>Create</strong>, then <strong>Open</strong>. If you have the folder already, select it and click <strong>Open</strong>.</li>
<li data-a101-os-only="windows">In the picker, open <strong>Documents</strong>, select <code>agents-101</code>, and confirm your selection.</li>
</ol>
<p>If Claude asks for permission here or after you send the request, check that it names <code>agents-101</code> and click <strong>Allow</strong>.</p>
<p>When you see <strong>agents-101</strong> below the message box, you’re ready to make the game. If it’s missing, go back to <strong>Add folder</strong> and select it again.</p>
</div>

<div class="rt-code">
<p><span data-a101-os-only="mac">In Finder, open <strong>Documents</strong> and click <strong>File</strong>, then <strong>New Folder</strong>.</span><span data-a101-os-only="windows">In File Explorer, open <strong>Documents</strong> and click <strong>New</strong>, then <strong>Folder</strong>.</span> Name it <code>agents-101</code>. Start a new session with the <code>agents-101</code> folder you created in Documents as the working folder.</p>
</div>

## 2. Make and play Snake

<span id="4-build-a-snake-game-10-min"></span>
<span id="2-build-a-snake-game"></span>
<span id="2-make-the-game"></span>

<p class="rt-cowork">Click <strong>Copy</strong> below. Paste into the same message box in Claude and click <strong>Send</strong>.</p>

<p class="rt-code">Click <strong>Copy</strong> below, paste into the session you just opened, and send the request.</p>

{{prompt:a101-prework-snake-game}}

<span id="3-play-your-game"></span>

Wait for Claude to say it saved the game in `prework/snake.html`. Claude makes the `prework` folder for you.

<p><span data-a101-os-only="mac">In Finder,</span><span data-a101-os-only="windows">In File Explorer,</span> open <strong>Documents → agents-101 → prework</strong>. Double-click <strong>snake.html</strong>. The game opens in your browser. If it opens in an editor, right-click the file and use <strong>Open With</strong> to choose your browser.</p>

After you’ve played, ask Claude for one change, such as a slower snake. Try it, then come back here for the next step. Keep the conversation open.

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
