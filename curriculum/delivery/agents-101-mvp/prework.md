# First steps

<h2 id="make-my-first-game"><span class="heading-step">1</span> Ask Claude to make a game</h2>

<span id="4-build-a-snake-game-10-min"></span>
<span id="2-build-a-snake-game"></span>
<span id="2-make-the-game"></span>

<div class="rt-cowork">
<div class="a101-game-start">
<p>Leave this handbook open. Open Claude Desktop and click <strong>New</strong>. If you see a Chat/Cowork switch, choose <strong>Cowork</strong>. Type this into the message box and press <strong>Send</strong>.</p>
<div class="request-sheet">
<div class="request-text"><span>Type in Claude Desktop</span><blockquote>Make me a Snake game and link to the file here.</blockquote></div></div>
<p><strong class="result-lead">In Claude’s reply</strong> Look under your message. The link to the Snake game is the file Claude made for you. Sometimes Claude opens the game board beside the reply as well. If you only get a description, ask <em>“Can you attach the game?”</em></p>
<figure class="walkthrough-media"><figcaption>Where to type and send</figcaption><img src="ACME_COWORK_MESSAGE_BOX" width="670" height="113" style="max-width:100%;height:auto" alt="A pasted request in Claude Desktop, with the Send arrow at the lower right.">
<p>Video coming here: send the request, find the game in Claude’s reply, then return to this handbook.</p></figure>
<p>Once you see the game, come back to this tab and choose <a href="#open-cowork-and-add-a-folder">Keep my game</a> to save it to your computer.</p>
</div></div>

<div class="rt-code">

[Make a folder for your game](#open-cowork-and-add-a-folder), then send the request below in a session using that folder.

{{prompt:a101-prework-snake-game}}

Double-click `prework/snake.html` inside your folder to play in your browser.

</div>

<span id="3-play-your-game"></span>

<h2 id="open-cowork-and-add-a-folder"><span class="heading-step">2</span> Keep my game</h2>

<span id="1-set-up-your-agent-runtime-5-min"></span>
<span id="1-choose-your-training-folder"></span>
<span id="1-create-a-folder-called-agents-101"></span>

<div class="rt-cowork">

<div class="folder-intro">
<p>Right now your game is in the conversation. Give it a home on your computer so you can open it again. The folder will hold the work you do here, including your calendar briefing.</p>
<figure class="folder-path" aria-label="Saved game location in Documents"><figcaption>Documents</figcaption><span>agents-101</span><span>prework</span><span>snake.html</span></figure></div>
<div class="a101-os-picker" role="group" aria-label="Setup for your computer">Your computer <button type="button" data-a101-os="mac" aria-pressed="false">Mac</button> <button type="button" data-a101-os="windows" aria-pressed="false">Windows</button></div>

<div class="walkthrough-media rt-profile rt-profile-cowork">
<div data-a101-os-only="mac">
<figure><figcaption>Watch the Mac folder picker</figcaption>
<video controls playsinline preload="none" poster="media/mac-folder-picker.jpg" aria-label="Create the agents-101 folder in Documents on Mac"><source src="media/mac-folder-picker.mp4" type="video/mp4"></video>
<p>Choose Documents, create <code>agents-101</code>, then click Open.</p></figure></div>
<div data-a101-os-only="windows"><strong>Windows folder walkthrough</strong>
<p>Video coming here. The steps below show how to choose the folder.</p></div></div>

<ol>
<li data-a101-os-only="windows">In File Explorer, open <strong>Documents</strong>. Click <strong>New</strong>, then <strong>Folder</strong>. Name it <code>agents-101</code>.</li>
<li data-a101-os-only="mac">In your game conversation, click <strong>+</strong> below the message box, then <strong>Add folder</strong>.</li>
<li data-a101-os-only="windows">Below the message box, click <strong>Project or folder</strong>, then <strong>Add folder</strong>. You can also find <strong>Add folder</strong> under&nbsp;<strong>+</strong>.</li>
<li data-a101-os-only="mac">In the picker, click <strong>Documents</strong> in the sidebar, then <strong>New Folder</strong>. Name it <code>agents-101</code> and click <strong>Create</strong>, then <strong>Open</strong>. If you have the folder already, select it and click <strong>Open</strong>.</li>
<li data-a101-os-only="windows">In the picker, open <strong>Documents</strong>, select <code>agents-101</code>, and confirm your selection.</li>
</ol>

If Claude asks for permission, click **Allow** after checking that it names `agents-101`. When you see **agents-101** attached to your message, copy and send this in the same conversation.

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

<h2 id="3-download-the-course-files"><span class="heading-step">3</span> Download the course files</h2>

<span id="3-install-the-training-folder-3-min"></span>
<span id="3-install-the-starter-and-set-the-folder-instruction"></span>
<span id="3-add-the-course-files"></span>
<span id="4-download-the-course-files"></span>

The course files hold a copy of the handbook and the folders you fill in later modules. Copy the request below and send it in the same conversation. The agent downloads the files into `agents-101` and unpacks them. It also adds one line to `CLAUDE.md`, the file in `agents-101` that Claude reads at the start of every conversation there, so it can find your place when you come back.

{{prompt:a101-prework-extract-tarball}}

If the agent says the download failed, [download the course files](<CONTENT_URL>) in your browser, drag the file into `agents-101`, and tell the agent it is there.

<div class="walkthrough-media rt-profile rt-profile-cowork"><strong>Course files walkthrough</strong>
<p>Video coming here: send the request and watch the course folders appear in <code>agents-101</code>.</p></div>

When Claude says the files are ready, keep this conversation open for the calendar exercise.

<h2 id="make-your-calendar-briefing"><span class="heading-step">4</span> Make your calendar briefing</h2>

<span id="4-summarize-your-week-in-meetings"></span>
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

<h2 id="5-see-what-makes-this-an-agent"><span class="heading-step">5</span> See what makes this an agent</h2>

<span id="6-read-the-mental-frame-10-min"></span>
<span id="5-read-the-mental-frame"></span>
<span id="6-see-what-makes-this-an-agent"></span>

Your game and your meeting summary were agent work. The agent took your request, used tools and saved files in your folder. [What is an Agent](trainings/agents-101/supplementary/what-is-an-agent.md#the-short-version) names the five parts behind that in its short version.

## Continue to Module 1

<span id="bring-to-module-1"></span>

Go to [Module 1: Getting Going](#getting-going). Start a new conversation for it and select the same `agents-101` folder. Your game and meeting summary stay there.

<!-- maintainer -->

## Source verification

- `[checked:2026-11-20 result:OK due:cohort]` https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile — Desktop uses one message box. Choose Cowork when the Chat/Cowork selector is present. In the unified interface the task goes straight into the new conversation. Fallback: verify both layouts before filming.

- `[checked:2026-11-19 result:OK due:cohort]` https://academy.claude.com/tutorials/get-started-in-claude-cowork-in-three-steps — [official product tutorial] Desktop conversation/mode selection; add a local folder from the message box. fallback: verify the current desktop entry and folder picker before delivery.
- `[checked:2026-11-19 result:OK due:cohort]` https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork — [official product documentation] Approval behaviour varies by mode and organization; learner reviews the actual request. fallback: verify the approval flow without prescribing a mode or blanket permission.
- `[checked:2026-11-19 result:OK due:cohort]` https://academy.claude.com/tutorials/getting-started-with-claude — [official product tutorial] The plus menu offers file uploads and Add folder. The local Mac setup recording shows New, Project or folder, Add folder, Documents, New Folder, Create, Open and Allow. A native Mac run also confirmed the plus menu and a separate folder-access confirmation after Send. fallback: match the current app labels before delivery.
- `[checked:2026-11-19 result:OK due:cohort]` https://support.apple.com/guide/mac-help/organize-your-files-in-the-finder-mchle9f0a1b2/mac — [official product guide] Finder File menu includes New Folder. fallback: verify the current menu.
- `[checked:2026-11-19 result:OK due:cohort]` https://support.microsoft.com/en-gb/word/create-a-new-folder — [official product guide] File Explorer New menu includes Folder. fallback: verify the current menu.
