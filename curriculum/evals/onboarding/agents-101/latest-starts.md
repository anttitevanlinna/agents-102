# Agents 101 first-start impressions

The single-screen ACME workbook averaged **4.61/5** over 30 simulated starts, up from **4.54/5**. The target is **4.70/5**. All 30 readers expected to play the game.

Each of ten synthetic personas read the actual workbook HTML three times. Versions used the same question, score anchors, and Mac or Windows assignments. Cowork access and the demonstrations described in captions were assumed.

| Version | Mean stars |
| --- | ---: |
| Prior workbook, play first | 4.54 |
| Initial one-screen layout | 4.58 |
| Copy-first opening with the real game still (release) | 4.61 |
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

The welcome, game request, and example board appear together. Copy displays the instruction to paste and send in Claude. The OS picker appears when the learner saves the game. The desktop launch link and the Copy-first release scored within 0.01 of each other. The release uses the verified browser Copy action.

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

The live score is **4.61/5**. The visual trials use the same HTML-reading rubric. Their scores describe the imagined route to the learner’s own game.

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

All three Windows reads rated the numbered Copy-first route 4.7. That route named the location of New and placed the Cowork choice before Send. Its overall mean was 4.607, compared with 4.61 for the release.

The [structured results](latest-starts.json) include every judgement and the scored HTML hashes. The [release verification](release-verification.json) records the artifact checks.
