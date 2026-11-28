# First steps

<h2 id="make-my-first-game"><span class="heading-step">1</span> Ask Claude to make a game</h2>

<span id="4-build-a-snake-game-10-min"></span>
<span id="2-build-a-snake-game"></span>
<span id="2-make-the-game"></span>

<div class="rt-cowork">
<div class="a101-game-start">
<p>Start a new Cowork session in Claude Desktop.</p>
<div class="request-sheet">
<div class="request-text"><span>Prompt</span><blockquote>Make me a Snake game and link to the file here.</blockquote></div></div>
<p><strong class="result-lead">In Claude’s reply</strong> The link opens your game. If you only get a description, ask <em>“Can you attach the game?”</em></p>
<figure class="walkthrough-media"><figcaption>Where the prompt goes</figcaption><img src="ACME_COWORK_MESSAGE_BOX" width="670" height="113" style="max-width:100%;height:auto" alt="A pasted prompt in Claude Desktop, with the Send arrow at the lower right.">
<p>Video coming here: send the prompt, find the game in Claude’s reply, then return to this handbook.</p></figure>
<p>Play a round, then <a href="#open-cowork-and-add-a-folder">keep your game</a>.</p>
</div></div>

<div class="rt-code">

Make a folder called `agents-101` in Documents and start a session in it.

{{prompt:a101-prework-snake-game}}

Open `prework/snake.html` and play a round.

</div>

<span id="3-play-your-game"></span>

<h2 id="open-cowork-and-add-a-folder"><span class="heading-step">2</span> Keep my game</h2>

<span id="1-set-up-your-agent-runtime-5-min"></span>
<span id="1-choose-your-training-folder"></span>
<span id="1-create-a-folder-called-agents-101"></span>

<div class="rt-cowork">

<div class="folder-intro">
<p>Right now your game is in the session. To keep a copy on your computer, make a folder called <code>agents-101</code> in Documents and add that folder to the session.</p>
<figure class="folder-path" aria-label="Saved game location in Documents"><figcaption>Documents</figcaption><span>agents-101</span><span>prework</span><span>snake.html</span></figure></div>
<div class="a101-os-picker" role="group" aria-label="Setup for your computer">Your computer <button type="button" data-a101-os="mac" aria-pressed="false">Mac</button> <button type="button" data-a101-os="windows" aria-pressed="false">Windows</button></div>

<div class="walkthrough-media rt-profile rt-profile-cowork">
<div data-a101-os-only="mac">
<figure><figcaption>Adding the folder on a Mac</figcaption>
<video controls playsinline preload="none" poster="media/mac-folder-picker.jpg" aria-label="Create the agents-101 folder in Documents on Mac"><source src="media/mac-folder-picker.mp4" type="video/mp4"></video></figure></div>
<div data-a101-os-only="windows"><strong>Adding the folder on Windows</strong>
<p>Video coming here.</p></div></div>

**Prompt** Cowork

```text
Save the game we just made as `prework/snake.html` in the folder I added.
```

</div>

<div class="rt-code">

Your game is already saved in `agents-101`.

</div>

<h2 id="3-download-the-course-files"><span class="heading-step">3</span> Download the course files</h2>

<span id="3-install-the-training-folder-3-min"></span>
<span id="3-install-the-starter-and-set-the-folder-instruction"></span>
<span id="3-add-the-course-files"></span>
<span id="4-download-the-course-files"></span>

The course files are a copy of this handbook and the folders your agents work in. Stay in the same session.

Glance at each prompt. Check what seems pertinent in more detail. No need to study all the detail.

{{prompt:a101-prework-extract-tarball}}

If the download fails, [download the course files](<CONTENT_URL>) in your browser, put them in `agents-101` and tell the agent.

<div class="walkthrough-media rt-profile rt-profile-cowork"><strong>Course files walkthrough</strong>
<p>Video coming here: send the prompt and watch the course folders appear in <code>agents-101</code>.</p></div>

<h2 id="make-your-calendar-briefing"><span class="heading-step">4</span> Make your calendar briefing</h2>

<span id="4-summarize-your-week-in-meetings"></span>
<span id="2-connect-your-work-apps-5-min"></span>
<span id="5-summarize-your-week-in-meetings-10-min"></span>
<span id="5-summarize-your-week-in-meetings"></span>

<div class="rt-cli">

Take a screenshot of your calendar week.

{{prompt:a101-prework-meetings-screenshot-cli}}

</div>
<div class="rt-desktop">

Attach a screenshot of your calendar week to this prompt.

{{prompt:a101-prework-meetings-screenshot-desktop}}

</div>
<div class="rt-cowork">

Attach a screenshot of your calendar week to this prompt.

{{prompt:a101-prework-meetings-screenshot-cowork}}

</div>

Ask for any changes you want.

<details>
<summary>Use a calendar connector instead (optional)</summary>

If Claude is connected to your Microsoft 365 or Google calendar, skip the screenshot.

{{prompt:a101-prework-meetings-connector}}

</details>

<h2 id="5-see-what-makes-this-an-agent"><span class="heading-step">5</span> See what makes an agent</h2>

<span id="6-read-the-mental-frame-10-min"></span>
<span id="5-read-the-mental-frame"></span>
<span id="6-see-what-makes-this-an-agent"></span>

Your game and your calendar briefing were agent work. The agent took your prompt, used tools and saved files in your folder. The short version of [What is an Agent](trainings/agents-101/supplementary/what-is-an-agent.md#the-short-version) lists the five parts of an agent.

## Continue to Module 1

<span id="bring-to-module-1"></span>

Go to [Module 1: Getting Going](#getting-going).

<!-- maintainer -->

## Source verification

- `[checked:2026-11-20 result:OK due:cohort]` https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile — Desktop uses one message box. Choose Cowork when the Chat/Cowork selector is present. In the unified interface the task goes straight into the new conversation. Fallback: verify both layouts before filming.

- `[checked:2026-11-19 result:OK due:cohort]` https://academy.claude.com/tutorials/get-started-in-claude-cowork-in-three-steps — [official product tutorial] Desktop conversation/mode selection; add a local folder from the message box. fallback: verify the current desktop entry and folder picker before delivery.
- `[checked:2026-11-19 result:OK due:cohort]` https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork — [official product documentation] Approval behaviour varies by mode and organization; learner reviews the actual request. fallback: verify the approval flow without prescribing a mode or blanket permission.
- `[checked:2026-11-19 result:OK due:cohort]` https://academy.claude.com/tutorials/getting-started-with-claude — [official product tutorial] The plus menu offers file uploads and Add folder. The local Mac setup recording shows New, Project or folder, Add folder, Documents, New Folder, Create, Open and Allow. A native Mac run also confirmed the plus menu and a separate folder-access confirmation after Send. fallback: match the current app labels before delivery.

## Page text

The page names outcomes, not clicks (`check_student_facing.md §40`): the learner adds `agents-101` to the session and the agent does the rest. The Mac video and the message-box still show where things are; the Windows video and real screenshots are still to come. The stamps above back what those media show and the folder-access step, which the page leaves to the app.
