# First-result journey results

The first rating ends when the learner can recognize a file or preview Claude made from their own message. The return rating asks whether they can find the immediate next course activity. Playing is optional.

| Workbook | Mean stars | Expect to recognize their result | Clear return | Uncertain return | Missing return |
| --- | ---: | ---: | ---: | ---: | ---: |
| Prior public workbook | 4.527 | 30/30 | 27 | 3 | 0 |
| Offer to rename the game | 4.460 | 30/30 | 29 | 1 | 0 |
| Recognize the file in the reply | 4.497 | 30/30 | 28 | 2 | 0 |
| Recognize the file and return to the open tab | 4.550 | 30/30 | 29 | 1 | 0 |

Each workbook received 30 fresh reads, three per persona. All used the same question, model, personas, OS assignments and video assumption. Each condition used a fresh copy of the rendered first-session HTML. Stars describe simulated ease. These reads do not establish human completion rates or elapsed time. The earlier 4.593 rating for the prior public workbook measured a different endpoint, opening and trying the game.

## Three scores per persona

| Persona | Prior public workbook | Current release |
| --- | --- | --- |
| novice-leader | 4.5 / 4.6 / 4.6 | 4.6 / 4.6 / 4.4 |
| product-ops | 4.6 / 4.6 / 4.6 | 4.7 / 4.7 / 4.6 |
| technical-builder | 4.7 / 4.6 / 4.6 | 4.7 / 4.8 / 4.8 |
| hr-leader | 4.5 / 4.5 / 4.5 | 4.6 / 4.4 / 4.4 |
| finance-sceptic | 4.3 / 4.4 / 4.3 | 4.3 / 4.4 / 4.3 |
| solo-consultant | 4.4 / 4.5 / 4.6 | 4.6 / 4.6 / 4.6 |
| marketing-browser-user | 4.6 / 4.6 / 4.6 | 4.6 / 4.6 / 4.6 |
| cowork-regular | 4.6 / 4.6 / 4.6 | 4.5 / 4.6 / 4.6 |
| windows-office-user | 4.4 / 4.4 / 4.4 | 4.6 / 4.6 / 4.5 |
| impatient-skimmer | 4.5 / 4.5 / 4.6 | 4.4 / 4.4 / 4.4 |

## Rubric checks

Three matched personas read four short control lessons. The named artifact and its creation instructions were identical in the three positive cases. The optional action and the return instructions were varied separately.

| Persona | Instructor example | Make a file | Add optional interaction | Add a return path |
| --- | ---: | ---: | ---: | ---: |
| novice-leader | 1.2 | 4.2 | 4.2 | 4.4 |
| cowork-regular | 1.2 | 4.6 | 4.4 | 4.5 |
| windows-office-user | 1.0 | 4.2 | 4.4 | 4.3 |

All three rejected the instructor-only example as a result of their own work. All three recognized the result in the creation control. All three identified the explicit next lesson and none invented a route in the control without one. Optional interaction changed individual scores by 0.0, −0.2 and +0.2 stars for the novice, Cowork regular and Windows learner respectively. The stable mean conceals that variation. The single uncertain return in the release batch named the correct next activity but raised a concern about coming back another day. Its original rating is included. The controls test these specific contrasts with one model. They cannot establish the absence of bias across all learners or desktop layouts.

During calibration, an early return fixture mentioned saving a file but gave an ambiguous next lesson. Some readers also marked a return uncertain after correctly naming the immediate activity, or discounted an assumed video. The final question defines the endpoint for each rating, the final positive-return control names a concrete next lesson, and the reader view presents the supplied video caption under the approved assumption. The matched release comparisons above were rerun with that frozen question.

## Evidence

Model `claude-sonnet-5-5`. Question SHA-256 `53cd726f74ed3a820281d098c531d373a49e2b342318c9e74e2f528baa5a05e7`. Release workbook SHA-256 `5650ed47880f547f38990d1d585048a3397cac0ee123f313a71dfc469df03682`. The controls and per-reader responses are under the ignored `out/` directory.

- Prior public workbook — `journey-58bbbbbf-e63d-43c0-bcd8-d991ac1c5c2b`
- Offer to rename the game — `journey-c491520a-bee7-4ed1-a994-2b7772eb166f`
- Recognize the file in the reply — `journey-a9295329-7857-440f-be09-c26ad7a31fd7`
- Recognize the file and return to the open tab — `journey-7cc60b13-3baf-4c9a-9576-bb93523091a4`
- Control checks — `journey-7de2653b-4191-41c8-ba61-20017f128dcf`

A separate isolated Claude run with the exact release request wrote `snake.html` and identified it in the reply with a link to the save section. This verifies one generated result outside the reader simulation. The walkthrough still uses a video placeholder.
