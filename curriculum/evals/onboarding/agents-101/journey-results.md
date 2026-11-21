# First-result journey results

The first rating ends when the learner can recognize a file or preview Claude made from their own message. The return rating asks whether they can find the immediate next course activity. Playing is optional.

| Workbook | Mean stars | Expect to recognize their result | Clear return | Uncertain return | Missing return |
| --- | ---: | ---: | ---: | ---: | ---: |
| Prior public workbook | 4.527 | 30/30 | 27 | 3 | 0 |
| Offer to rename the game | 4.460 | 30/30 | 29 | 1 | 0 |
| Recognize the file in the reply | 4.497 | 30/30 | 28 | 2 | 0 |
| Recognize the file and return to the open tab | 4.550 | 30/30 | 29 | 1 | 0 |
| Teacher shows the finished game | 4.437 | 30/30 | 30 | 0 | 0 |
| Learner can use their own words | 4.587 | 30/30 | 22 | 8 | 0 |
| File and handbook link in order | 4.593 | 30/30 | 30 | 0 | 0 |
| Own words plus ordered links | 4.533 | 30/30 | 29 | 1 | 0 |
| Single request with return only in handbook | 4.553 | 30/30 | 20 | 10 | 0 |
| Instructor makes a briefing before learner makes Snake | 4.323 | 30/30 | 30 | 0 | 0 |
| Start with the first exchange before the course cover | 4.533 | 30/30 | 30 | 0 | 0 |
| Recognize the game card or file link | 4.563 | 30/30 | 29 | 1 | 0 |
| Copy first, then open Claude Desktop | 4.533 | 30/30 | 30 | 0 | 0 |
| Try a calendar briefing before folder setup | 4.503 | 30/30 | 30 | 0 | 0 |
| Give the link a learner-facing game title | 4.577 | 30/30 | 29 | 1 | 0 |
| Choose between classic and space Snake | 4.533 | 30/30 | 29 | 1 | 0 |
| Release build after source integration (current release) | 4.550 | 30/30 | 30 | 0 | 0 |

Each workbook received 30 fresh reads, three per persona. All used the same question, model, personas, OS assignments and video assumption. Each condition used a fresh copy of the rendered first-session HTML. Stars describe simulated ease. These reads do not establish human completion rates or elapsed time. The earlier 4.593 rating for the prior public workbook measured a different endpoint, opening and trying the game.

## Three scores per persona

| Persona | Previous release | Current release |
| --- | --- | --- |
| novice-leader | 4.6 / 4.6 / 4.4 | 4.6 / 4.4 / 4.6 |
| product-ops | 4.7 / 4.7 / 4.6 | 4.7 / 4.6 / 4.6 |
| technical-builder | 4.7 / 4.8 / 4.8 | 4.6 / 4.7 / 4.7 |
| hr-leader | 4.6 / 4.4 / 4.4 | 4.6 / 4.6 / 4.6 |
| finance-sceptic | 4.3 / 4.4 / 4.3 | 4.5 / 4.3 / 4.4 |
| solo-consultant | 4.6 / 4.6 / 4.6 | 4.5 / 4.5 / 4.4 |
| marketing-browser-user | 4.6 / 4.6 / 4.6 | 4.7 / 4.4 / 4.6 |
| cowork-regular | 4.5 / 4.6 / 4.6 | 4.6 / 4.4 / 4.7 |
| windows-office-user | 4.6 / 4.6 / 4.5 | 4.6 / 4.5 / 4.4 |
| impatient-skimmer | 4.4 / 4.4 / 4.4 | 4.6 / 4.5 / 4.6 |

## Rubric checks

Three matched personas read four short control lessons. The named artifact and its creation instructions were identical in the three positive cases. The optional action and the return instructions were varied separately.

| Persona | Instructor example | Make a file | Add optional interaction | Add a return path |
| --- | ---: | ---: | ---: | ---: |
| novice-leader | 1.2 | 4.2 | 4.2 | 4.4 |
| cowork-regular | 1.2 | 4.6 | 4.4 | 4.5 |
| windows-office-user | 1.0 | 4.2 | 4.4 | 4.3 |

All three rejected the instructor-only example as a result of their own work. All three recognized the result in the creation control. All three identified the explicit next lesson and none invented a route in the control without one. Optional interaction changed individual scores by 0.0, −0.2 and +0.2 stars for the novice, Cowork regular and Windows learner respectively. The stable mean conceals that variation. The single uncertain return in the 4.550 batch named the correct next activity but raised a concern about coming back another day. Its original rating is included. The controls test these specific contrasts with one model. They cannot establish the absence of bias across all learners or desktop layouts.

During calibration, an early return fixture mentioned saving a file but gave an ambiguous next lesson. Some readers also marked a return uncertain after correctly naming the immediate activity, or discounted an assumed video. The final question defines the endpoint for each rating, the final positive-return control names a concrete next lesson, and the reader view presents the supplied video caption under the approved assumption. The matched release comparisons above were rerun with that frozen question.

## Evidence

Model `claude-sonnet-5-5`. Question SHA-256 `53cd726f74ed3a820281d098c531d373a49e2b342318c9e74e2f528baa5a05e7`. Release workbook SHA-256 `332b900a68e46038fc5f58978eb17dd3ff817fc45cb385da61b16428857d5c11`. The controls and per-reader responses are under the ignored `out/` directory.

- Prior public workbook — `journey-58bbbbbf-e63d-43c0-bcd8-d991ac1c5c2b`
- Offer to rename the game — `journey-c491520a-bee7-4ed1-a994-2b7772eb166f`
- Recognize the file in the reply — `journey-a9295329-7857-440f-be09-c26ad7a31fd7`
- Recognize the file and return to the open tab — `journey-7cc60b13-3baf-4c9a-9576-bb93523091a4`
- Teacher shows the finished game — `journey-b5f0fb5c-74b0-4928-8276-f2e365ac9c57`
- Learner can use their own words — `journey-7a15b6a7-3536-4880-aea7-b143c2c3db52`
- File and handbook link in order — `journey-c97803d0-6f0e-4518-8c27-3a2600efcbc9`
- Own words plus ordered links — `journey-acbf9855-c898-43ac-8ad9-afa632562ea1`
- Single request with return only in handbook — `journey-a0548662-d6c2-49ff-b4f5-f25500574db5`
- Instructor makes a briefing before learner makes Snake — `journey-7f856246-d454-4dbe-a496-96ca1c7c6d36`
- Start with the first exchange before the course cover — `journey-9ecbafe7-00e3-434a-8d12-ed77bd352dcc`
- Recognize the game card or file link — `journey-cd960558-52f4-473f-a105-d8c7e0a08680`
- Copy first, then open Claude Desktop — `journey-dd886c21-2090-4634-9587-3ae0d5595858`
- Try a calendar briefing before folder setup — `journey-61ced02e-9463-403c-b171-e493785d729c`
- Give the link a learner-facing game title — `journey-d3e33076-f333-4adc-899a-5e129361dda8`
- Choose between classic and space Snake — `journey-21bbc8b6-900b-40d6-af76-db82183628e9`
- Release build after source integration — `journey-736362a0-26ac-47ad-b970-c8d608124ca8`
- Control checks — `journey-7de2653b-4191-41c8-ba61-20017f128dcf`

A separate Claude run used the copied release request. It wrote `snake.html`, linked to the file, and supplied the link to the handbook’s save section beneath it. The first walkthrough uses a video placeholder. The calendar-before-folder candidate was a reading prototype. Its later file operations were outside that test.
