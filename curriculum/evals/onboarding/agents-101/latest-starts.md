# Agents 101 first-play impressions (historical)

The current instrument scores recognizing the learner’s own result. [First-result journey results](journey-results.md)

The prior copy-first ACME workbook scored **4.593/5** across 30 simulated desktop starts. All 30 expected to reach their own game. The first click now starts the protected round. The initial video-led release scored **4.627/5**. The highest full prototype score remains **4.667/5** against the **4.70/5** target.

## Overview

- Moving folder setup after the first game raised the earlier play-first workbook to **4.54**. Putting Copy and a real game still on the welcome screen raised the released version to **4.61**.
- Separate launch, copy, video, screenshot, and progress cues generally scored near **4.6**. The best prototype combined a prefilled Claude launch, the exact Send screenshot, and a shorter path after play.
- Rock-paper-scissors was playable in **36 seconds** in one native Mac run. The strongest HTML prototype still used Snake.
- Moving Pause and Resume behind **Coming back later** scored **4.63**. Keeping them accessible by direct link scored **4.62**.
- The intermediate build passed **62 automated tests** and **nine workbook checks**. They verified the prefilled request and manual recovery in HTML. The launch into the native app remains unverified.

Each of ten synthetic personas read the actual workbook HTML three times. Versions used the same question, score anchors, and Mac or Windows assignments. Cowork access and the demonstrations described in captions were assumed.

| Version | Mean stars |
| --- | ---: |
| Prior workbook, play first | 4.54 |
| Initial one-screen layout | 4.58 |
| Copy-first opening with the real game still (previous release) | 4.61 |
| Open Claude with the request filled in | 4.62 |
| Open Claude with visible Copy fallback | 4.58 |
| Copy first with the request tucked away | 4.27 |
| Copy first with the request visible above Send and Play | 4.59 |

| Persona | Prior workbook | One-screen workbook |
| --- | --- | --- |
| Novice business leader | 4.6 / 4.6 / 4.6 | 4.6 / 4.6 / 4.6 |
| Product operations leader | 4.6 / 4.6 / 4.6 | 4.6 / 4.6 / 4.6 |
| Technical builder | 4.6 / 4.6 / 4.6 | 4.6 / 4.6 / 4.6 |
| Cautious HR leader | 4.6 / 4.6 / 4.6 | 4.6 / 4.6 / 4.6 |
| Skeptical finance leader | 4.4 / 4.4 / 4.4 | 4.6 / 4.6 / 4.6 |
| Solo consultant | 4.4 / 4.4 / 4.4 | 4.6 / 4.6 / 4.6 |
| Browser-first marketing user | 4.6 / 4.6 / 4.6 | 4.6 / 4.6 / 4.6 |
| Regular Cowork user | 4.6 / 4.6 / 4.6 | 4.7 / 4.7 / 4.7 |
| Windows office user | 4.6 / 4.6 / 4.6 | 4.6 / 4.6 / 4.6 |
| Impatient ten-minute skimmer | 4.4 / 4.5 / 4.4 | 4.6 / 4.6 / 4.6 |

The welcome, game request, and example board appear together. Copy displays the instruction to paste and send in Claude. The OS picker appears when the learner saves the game. The desktop launch link and the Copy-first release scored within 0.01 of each other. That release used the verified browser Copy action.

The score measures perceived clarity from rendered HTML. The browser check verified that Copy and its feedback were visible on the selected build. The earlier native Mac test used the same game and save requests. Windows was represented in the HTML simulations.

## Follow-up trials

| Candidate | Mean stars |
| --- | ---: |
| Focused Start with an explicit return link | 4.49 |
| Observed progress cues and visible browser fallback | 4.51 |
| Prototype request with an explicit Play button | 4.53 |
| Brief instructions with legacy mode help tucked away | 4.43 |
| Progress and Play cues beside the example | 4.61 |

In a fresh Mac run, Claude showed **Creating snake.html** after 32 seconds and the playable board was visible by 48 seconds. The live request produced **Start** in that run and **Play** in an earlier run. A separate prototype request explicitly asked for **Play**. Claude provided that button and the game ran, while the prototype’s HTML score was lower. These are observations from individual runs.

## Visual and interactive trials

| Candidate | Mean stars |
| --- | ---: |
| Expandable Claude screenshots | 4.58 |
| Screenshots with the Cowork choice before paste | 4.56 |
| Direct Claude launch with the screenshot walkthrough | 4.61 |
| Screenshots as the main instructions | 4.55 |
| Prototype request for a tiny Snake game | 4.57 |
| Optional playable example | 4.60 |

The walkthrough uses crops from a fresh Mac conversation. It shows **New**, the pasted request with the **Send** arrow, and a finished Snake board beside the reply. In that run the preview was visible by 46 seconds. The tiny-game request produced a playable preview in a separate Mac run, with an instruction to press any key. The browser example played inside a sandbox. None of the 30 action sequences for that version used the example as their first game.

The earlier Copy-first release scored **4.61/5**. The visual trials use the same HTML-reading rubric. Their scores describe the imagined route to the learner’s own game.

## Desktop handoff trials

| Candidate | Mean stars | Predicted starts |
| --- | ---: | ---: |
| Open Claude and copy the request in one click | 4.59 | 30 of 30 |
| Open Claude with visible manual recovery | 4.59 | 30 of 30 |

The first version linked to a new Cowork conversation with the request prefilled and copied the same request for manual recovery. The second made the manual steps visible beside the link and spelled out how to send the request and open the game. The Windows persona rated both versions 4.4 in all three attempts. Those reads consistently raised uncertainty about whether the browser would open Claude. Automated checks verified the link payload and clipboard behavior. The native launch remains unverified.

## Claude conversation walkthrough trials

| Candidate | Mean stars | Predicted starts |
| --- | ---: | ---: |
| Copy inside the Claude walkthrough | 4.51 | 30 of 30 |
| Explicit instructions for both Claude layouts | 4.48 | 30 of 30 |

The walkthrough showed the request in a real Claude message box next to the Send arrow. Readers still wanted to know what to do if the Cowork switch was absent. The second version showed both message boxes as explicit branches and made board, card, and file recovery visible. Several readers wanted one default route and a clear success cue when Claude finished.

Claude documents both a combined message box and a version with separate Chat and Cowork choices. Its web app can resume the same conversation, but local file access in a regular Cowork task requires starting that task in the desktop app. The course uses one desktop conversation from the game through saving it to the learner’s folder. [Claude Cowork help](https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile)

## One-click game trials

| Candidate | Mean stars | Predicted starts |
| --- | ---: | ---: |
| Rock-paper-scissors with simple Copy-first directions | 4.587 | 30 of 30 |
| Rock-paper-scissors with New and Cowork before Send | 4.607 | 30 of 30 |
| Rock-paper-scissors with a ready cue and recovery link | 4.573 | 30 of 30 |

A disposable Mac conversation produced rock-paper-scissors by 36 seconds. One click played a round. After play, Claude saved the exact HTML in an empty course folder in the same conversation. The downloaded preview and the saved file matched byte for byte. The two earlier Snake runs showed playable previews by 46 and 48 seconds. These timings are individual observations.

All three Windows reads rated the numbered Copy-first route 4.7. That route named the location of New and placed the Cowork choice before Send. Its overall mean was 4.607, compared with 4.61 for the earlier Copy-first release.

## First-game demo

The 16-second demo beside Copy scored **4.537/5**. All 30 readers expected to start. The demo used three crops from a native Mac run showing New, the Send arrow, and the game preview. Readers saw the caption and assumed the demo was available.

The first-start rubric ends at play. It gives no rating for attaching the folder, placing or unpacking the download, or finding the next workbook step in a fresh Cowork task. Native smokes verified play and saving the same file. The separate [onboarding outcomes](README.md) cover the return and recovery behaviors, with evidence from isolated model-runtime cases. The full native journey is still unverified.

## Keep what you made

| Candidate | Mean stars | Predicted starts |
| --- | ---: | ---: |
| One save and setup step, Copy first | 4.64 | 30 of 30 |
| One save and setup step, prefilled Claude launch | 4.63 | 30 of 30 |
| Rock-paper-scissors in the same flow | 4.567 | 30 of 30 |
| Snake with visible progress and play cues | 4.643 | 30 of 30 |

The first task is to make and play the game. After play, the learner attaches a folder in the same conversation and sends one request to save the game and add the course files. Claude returns a link to the calendar exercise. These first-start reads end at play, before the folder step. The prefilled variant was checked for its link payload. Native launch remains unverified.

In one disposable Mac conversation, Claude fetched the released archive, unpacked all 107 files byte for byte, preserved the already saved rock-paper-scissors game, installed the reading cue, and linked to the calendar exercise. A fresh conversation with only the same folder and “Help me resume Agents 101.” returned the exact same link. All 110 file hashes matched before and after resume.

## Pause and Resume visibility

| Candidate | Mean stars | Predicted starts |
| --- | ---: | ---: |
| Pause and Resume under Coming back later | 4.63 | 30 of 30 |
| Pause and Resume accessible by direct link only | 4.62 | 30 of 30 |

Both candidates kept the first game and the calendar hint in the welcome. The first put Pause and Resume inside one closed footer disclosure. The second kept them out of the default page view. Both existing direct anchors opened their instructions in the HTML check.

The best Copy-first prototype scored 4.643. It gives three visible actions after Copy and describes the progress and playable result observed in Claude Desktop. The earlier public Copy-first workbook scored 4.61.

## First-play view

| Candidate | Mean stars | Predicted starts |
| --- | ---: | ---: |
| Opening view dedicated to the first game | 4.617 | 30 of 30 |
| Built workbook with first-game progress and play cues | 4.613 | 30 of 30 |

The dedicated view showed the welcome, game request, expected Claude actions, and a link to save the game. Browser testing confirmed that Copy displayed its next-step cue and that the save link revealed the full workbook. The built-workbook trial kept the normal view and added the cues for opening Claude, sending the request, watching progress, and playing. Its build and navigation suites passed 62 tests. Both scores were below the 4.643 prototype.

## Composer and game cues

| Candidate | Mean stars | Predicted starts |
| --- | ---: | ---: |
| Show the Claude composer cue after Copy | 4.617 | 30 of 30 |
| Show the game Claude made in the welcome | 4.607 | 30 of 30 |

The Copy prototype kept the written first-play route visible. The real composer crop appeared after the browser confirmed a successful clipboard write. The HTML test checked the copied text and verified that the cue stayed hidden when clipboard access failed. The second prototype showed the actual game in the welcome before the learner saw the request. The most frequent request for clearer directions in these reads concerned the Claude mode choice.

## Opening Claude

| Candidate | Mean stars | Predicted starts |
| --- | ---: | ---: |
| Mac and Windows launcher instructions before play | 4.56 | 30 of 30 |
| Identify the Claude window and the New button | 4.537 | 30 of 30 |

The first version moved the OS picker to the game and showed the matching search and paste shortcuts. The HTML check verified both defaults and switching between them. The second used a real Mac crop of New and explained how to recognise the Claude view and the empty message box. Readers still raised the Chat and Cowork choice, and both versions scored below the shorter first-game route. Windows was represented in the HTML reads. [Apple Spotlight shortcuts](https://support.apple.com/en-ie/guide/mac-help/mh26783/mac) · [Microsoft Start menu documentation](https://support.microsoft.com/en-us/windows/experience/personalization/customize-the-windows-start-menu)

## Open in Claude with automatic recovery

| Candidate | Mean stars | Predicted starts |
| --- | ---: | ---: |
| Open in Claude with recovery revealed on click | 4.65 | 30 of 30 |
| Open in Claude with the ready cue and nearby recovery | 4.593 | 30 of 30 |

The 4.65 version showed one launch action and the exact request. It kept the manual steps inside a panel that opened on the same click. The follow-up made the Cowork ready cue and recovery more prominent. That version scored lower.

The HTML check verified that the URL carried the exact request, the click opened the panel, and its Copy button wrote the request to the clipboard. The installed Mac app advertises the Claude URL scheme. The native launch itself remains unverified. [Claude Desktop link documentation](https://support.claude.com/en/articles/14729294-open-claude-desktop-with-a-link)

## Recognising the message in Claude

| Candidate | Mean stars | Predicted starts |
| --- | ---: | ---: |
| Open in Claude with the exact Send screenshot | 4.667 | 30 of 30 |
| Dedicated first-play view with Open in Claude | 4.517 | 30 of 30 |
| Open in Claude with the Send screenshot and direct Copy fallback | 4.60 | 30 of 30 |

The best version put a real crop of the exact request and Send arrow beside the launch sequence. The isolated opening also hid the later workbook controls until learners followed the save or contents link. The inline Copy version offered an immediately usable backup beside the launch. Its clipboard action and feedback worked in the browser.

The 4.667 mean is 140.0 total stars over 30 simulated starts. The target of 4.70 would require 141.0 stars. The launch URL and fallback behaviour were checked in HTML. Native launch remains unverified.

## Timing, welcome and workbook integration

| Candidate | Mean stars | Predicted starts |
| --- | ---: | ---: |
| Open in Claude with the observed preview wait | 4.657 | 30 of 30 |
| Open in Claude with the one-message welcome | 4.59 | 30 of 30 |
| Built workbook with Open in Claude and the Send screenshot | 4.597 | 30 of 30 |
| Built workbook with later folder and download details folded | 4.577 | 30 of 30 |

The built workbook used the launch and Send screenshot with the existing save and course-file steps. All 62 build and navigation tests passed, including exact prompt parity, opening the recovery panel, copying the request, and embedding the image offline. The native launch remains unverified. A separate HTML prototype folded the later instructions and verified that existing links still opened the right section.

The 4.667 result belongs to its exact prototype, which also used a different welcome and combined save and setup. The built trial supplies the 4.597 score for the intermediate release.

## One request after play

| Candidate | Mean stars | Predicted starts |
| --- | ---: | ---: |
| One save-and-setup request with the next step in the handbook | 4.637 | 30 of 30 |
| One save-and-setup request with the Cowork destination labelled | 4.577 | 30 of 30 |

Both prototypes kept the launch and Send screenshot. They used one request to save the game and add the course files. The handbook linked to the calendar exercise. The isolated model test supplied the original game and the already downloaded archive. It reproduced the game byte for byte, matched all 107 archive files, and left an unrelated learner note intact. The Mac was locked during this trial, so a fresh desktop test of the new wording is outstanding.

## The draft and the finished game

| Candidate | Mean stars | Predicted starts |
| --- | ---: | ---: |
| Explicit draft-and-send cue | 4.607 | 30 of 30 |
| Reply, game card and playable board together | 4.657 | 30 of 30 |
| Copy and open in Claude with the Send screenshot | 4.613 | 30 of 30 |

The draft version said who sends the request and revealed the next action on click. The second showed the actual Claude reply, Snake card, and Start button at the play step. The HTML check verified the added cue and the Copy recovery panel. Both kept the exact launch request. The 4.667 prototype with the Send screenshot remains the highest score.

The [structured results](latest-starts.json) include every judgement and the scored HTML hashes. The [release verification](release-verification.json) records the artifact checks.

## Local game-return prototype

One visible game request supports Open in Claude Desktop and Copy. It asks Snake to wait for the first arrow key and to offer **Play again** and **Back to the handbook** at the end of a round. The same handbook link goes in the conversation reply. It points to **Keep the version you made**.

The one-request prototype scored **4.647/5** across 30 cold desktop starts. All 30 predicted they could play. The generated edition has the same first-game text, link destinations and copy payload on Mac and Windows. An earlier version that displayed only part of the request scored **4.517/5**. The readers rated the route to first play. A separate headless Claude generation produced a game and reply with the correct return link. Exercising that game verified the waiting state, movement on the right arrow, the game-over choices and replay. Returning from a live Cowork preview remains unverified.

Reader batches: `decimal-read-6d9a98c1-d48a-4164-9484-7b1f03016ff6` and `decimal-read-4fdd7736-33df-45c3-9c1b-910583cf27d4` under `out/`.

### Safe first round

The 30-second self-steering build scored **4.57/5** on the fixed 30-start benchmark (batch `decimal-read-a54557b9-9488-4f52-b6fa-d035d86ba3b3`). In a separate headless generation, the resulting game moved autonomously for 300 ticks of 100 ms without a loss, paused at the handoff, accepted the right-arrow key, showed the handbook link at game over and reset on replay. Headless Chrome also displayed the handoff after advancing its clock by 31 seconds. This is one generated game.

The board-cue version scored **4.627/5** on the generated workbook (30/30 predicted first play, batch `decimal-read-b01d19df-4ea2-4878-a456-391a33c16d4d`). One generated game displayed “I’ll drive first” during autonomous movement, then “Your turn. Click the board and press →.” at the pause. The game accepted the arrow after the board was clicked. The reply and game shared the same return destination.

## Playing from the first click

| Candidate | Mean stars | Expected to play |
| --- | ---: | ---: |
| Launch and Copy together | 4.633 | 30/30 |
| Open a file named Play Snake | 4.533 | 30/30 |
| Automatic help and a named backup file | 4.413 | 30/30 |
| Choose the food before sending | 4.567 | 30/30 |
| Drop an apple during autopilot | 4.627 | 30/30 |

Each row used the existing ten personas, three fresh reads per persona and the same desktop-start question. In a separate file-generating run, the first click placed an apple, the snake ate it, the game reached the 30-second handoff safely, and pressing an arrow transferred steering to the learner. The board linked directly to the save step. The file ran with a simulated browser clock. The native launch was not exercised in this round.

## Copy the request into Cowork

The first video-led candidate scored **4.627/5** across 30 simulated starts. All 30 expected to play. The simulation assumed the demonstration described in the placeholder was available. The page also gives the complete written route. The workbook and offline handbook no longer launch Claude. The evidence batch is `decimal-read-53618e59-2624-4ab3-99b7-e572fcd2d348`.

The release with a learner-started clock and optional message-box still scored **4.593/5**, with 30 of 30 expecting to play (batch `decimal-read-b1ab8b83-4951-4439-bb32-ed145bd70600`). It covers both the combined message box and the separate Chat/Cowork selector. One Claude-generated file made from the exact release request stayed asleep for 90 seconds in a browser simulation. The first click started its full 30-second countdown, an apple was eaten, and the game reached its arrow-key handoff.

The same fixed benchmark scored the click-to-wake version with the selector assumed at 4.623, the first combined-layout directions at 4.603, and a permanently visible message-box still at 4.550. Four-reader design probes were used for screening only.
