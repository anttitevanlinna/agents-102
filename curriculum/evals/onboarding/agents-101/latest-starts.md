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

The [structured results](latest-starts.json) include every judgement and the scored HTML hashes. The [release verification](release-verification.json) records the artifact checks.
