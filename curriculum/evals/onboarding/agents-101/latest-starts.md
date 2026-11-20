# Agents 101 first-start impressions

The play-first ACME workbook with a browser fallback averaged **4.54/5 stars** across 30 simulated starts, up from **4.43/5**. It meets the **4.50/5** target.

30 of 30 readers expected to reach the game. Ten synthetic personas each read the actual workbook HTML in three fresh calls. The versions used the same question, 1.0–5.0 anchors, and Mac or Windows assignments. Readers assumed Cowork access and the demonstrations described in the video captions.

| Version | Mean stars |
| --- | ---: |
| Prior workbook, folder first | 4.43 |
| Folder first, then play in Claude | 4.38 |
| Folder first, visible browser option | 4.42 |
| Play first, then save to the local folder | 4.61 |
| Play first with a browser fallback | 4.54 |

| Persona | Prior workbook | Play-first workbook |
| --- | --- | --- |
| Novice business leader | 4.6 / 4.6 / 4.6 | 4.6 / 4.6 / 4.6 |
| Product operations leader | 4.4 / 4.4 / 4.4 | 4.6 / 4.6 / 4.6 |
| Technical builder | 4.5 / 4.6 / 4.5 | 4.6 / 4.6 / 4.6 |
| Cautious HR leader | 4.4 / 4.3 / 4.3 | 4.6 / 4.6 / 4.6 |
| Skeptical finance leader | 4.4 / 4.3 / 4.4 | 4.4 / 4.4 / 4.4 |
| Solo consultant | 4.4 / 4.4 / 4.4 | 4.4 / 4.4 / 4.4 |
| Browser-first marketing user | 4.5 / 4.4 / 4.4 | 4.6 / 4.6 / 4.6 |
| Regular Cowork user | 4.4 / 4.4 / 4.5 | 4.6 / 4.6 / 4.6 |
| Windows office user | 4.5 / 4.6 / 4.5 | 4.6 / 4.6 / 4.6 |
| Impatient ten-minute skimmer | 4.3 / 4.3 / 4.2 | 4.4 / 4.5 / 4.4 |

Learners request a game and play before creating the course folder. Afterward, they attach one folder and ask Claude to save the same game there. The fallback explains how to open a downloaded game or use the proven local-file request.

In a fresh native Mac session, the game opened in Claude before any folder was attached. After playing, the tester attached an empty folder and sent the save request in the same conversation. The saved HTML matched the original game byte for byte.

Scores measure perceived clarity across 30 simulated HTML reads with Cowork access assumed. A separate Claude Desktop run on macOS exercised the play-first flow and compared the saved file with the original game. Elapsed time, actual learner completion, and native Windows behavior remain unmeasured.

The [structured results](latest-starts.json) include the 30 judgements, HTML hashes, test status, and evidence locations. The [release verification](release-verification.json) records the build and native checks.
