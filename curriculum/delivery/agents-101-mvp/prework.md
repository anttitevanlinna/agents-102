# Prework

Make a game you can play, then set up the files you will use throughout the course.

<div class="a101-os-picker" role="group" aria-label="Setup for your computer">Setup for: <button type="button" data-a101-os="mac" aria-pressed="false">Mac</button> <button type="button" data-a101-os="windows" aria-pressed="false">Windows</button></div>

## 1. Choose your training folder

<span id="1-set-up-your-agent-runtime-5-min"></span>

<span data-a101-os-only="mac">On Mac, open Documents in Finder.</span> <span data-a101-os-only="windows">On Windows, open Documents in File Explorer.</span> Create a new folder named `agents-101`. This is your training folder. Keep it for everything you build in the course.

<div class="a101-video-placeholder rt-profile rt-profile-cowork">Assume there is a <span data-a101-os-only="mac">Mac</span><span data-a101-os-only="windows">Windows</span> video here showing how to create the training folder in Documents and start a Cowork task with it.</div>

**Session** *(new, "Prework")*

<span class="rt-cowork">In Cowork, click **New task** and select the `agents-101` folder you just created.</span><span class="rt-code">Start a new session in your selected interface with the `agents-101` folder you created in Documents as the working folder.</span>

## 2. Build a snake game

<span id="4-build-a-snake-game-10-min"></span>

A snake game gives you something you can try yourself. Copy this request into your task:

{{prompt:a101-prework-snake-game}}

The agent creates a `prework` folder inside your training folder and saves `snake.html` there. When it finishes, open your training folder, open `prework`, then double-click `snake.html` to play in your browser. You can ask for changes and try it again. Keep the file. It's yours.

Return to this workbook when you are ready to continue.

## 3. Install the starter and set the folder instruction

<span id="3-install-the-training-folder-3-min"></span>

[Download the starter file set](<CONTENT_URL>), then move `agents-101-starter.tar.gz` into your `agents-101` training folder, beside the `prework` folder your game created. Stay in the same task and ask the agent to unpack it:

{{prompt:a101-prework-extract-tarball}}

Installation adds reference material and course navigation. The training-folder `CLAUDE.md` points the agent to that navigation file so it can save your place and link you back to the workbook.

<div class="a101-video-placeholder rt-profile rt-profile-cowork">Assume there is a <span data-a101-os-only="mac">Mac</span><span data-a101-os-only="windows">Windows</span> video here showing how to download the starter into the training folder and where to add the folder reading instruction below.</div>

<p class="rt-profile rt-profile-cowork a101-folder-instruction">Set the instructions for your Cowork training folder to: <code>Read CLAUDE.md before working in this folder.</code> Use this same folder when you start a fresh task.</p>

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

## 5. Read the mental frame

<span id="6-read-the-mental-frame-10-min"></span>

Read [What is an Agent, LLM vs chat](trainings/agents-101/supplementary/what-is-an-agent.md#llm-vs-chat). It explains what changes when your agent can work with files and tools instead of only answering in a chat.

## Continue to Module 1

<span id="bring-to-module-1"></span>

Keep your snake game, meetings summary, and installed starter in the training folder. End this task when you are ready. Module 1 starts with a fresh task in the same `agents-101` folder.
