# Home page to Module 1: rubric and simulations

Scope: a solo learner opens the public home page, starts the course, makes the first game, sets up the folder and course files, makes the meeting summary, and arrives at Module 1 knowing the first thing to do there. Nobody helps. Two instruments, kept separate, like the full training's student system and its rubric.

| Instrument | Answers | Runner |
|---|---|---|
| Path read (simulation) | How far solo learners get toward Module 1, where they slow down, and what they carry away cold: the course promise, the licence, the first step of Module 1. | `path-read.js` |
| Visual rubric | Whether the rendered pages show the route at 1440 × 900 and in a 421 × 698 pane beside Claude. Mechanical gates plus a critic's scores. | `path-visual.js` |

Neither instrument judges language. A good score never means the text reads well. Language is checked by a person and the voice gates.

## Path read

Ten fixed personas (`journey-personas.json`) read the home page and the handbook up to the first activity of Module 1, cold, once or twice each (20 reads by default, Sonnet). The question (`path-question.txt`) walks six stages and asks for three take-homes from memory. A blind scorer grades the take-homes against `path-targets.json`; the Module 1 target is read live from the handbook.

| Stage | Reached when the learner |
|---|---|
| arrive | understands from the home page what this is and whether it is for them |
| start | finds the way from the home page into the first activity |
| first-result | sends the first request and recognizes what Claude made |
| setup | gives the course a folder and gets the course files into it |
| briefing | makes the meeting summary and reads what makes this an agent |
| module-1 | finds Module 1 and knows its first step |

Scores are 0 to 100, on the same scale as the module scores: a stage's score is the share of readers through it (yes counts 1, uncertain 0.5, no 0), and the headline **score** is the mean of the six stages, as a module's number is a mean over its students. Every report also names the **lowest stage**, and keeps **strict reach** (the headline until 2026-11-28: each reader counted at their weakest stage, so a reader unsure at setup counts 0.5 even if they find Module 1 later). Stars per stage and the quoted friction are the steering evidence.

**Release goal:** score at least 90 with no stage under 80, licence at least 80, Module 1 first step at least 70, no persona quits before Module 1 in both reads.

**Noise.** At 20 reads one reader moves a stage by 2.5 to 5 points. Between reads of near-identical builds a stage moved 10 to 15 points (setup 80 to 93, Module 1 75 to 88) and the score about 3 (control page 90 and 90, placebo 90; main builds 92 to 95). Four stages sit at 100 on every build since the new home page, so a break at one stage moves the score by a sixth of its size: removing Continue to Module 1 took that stage from 95 to 55 and the score from 90 to 83. So read the score for breaks across the path and the stage row for a break at one place; on a stage, as in the full-training system, only moves of 20 points or more steer. For a smaller change, read the quotes. The calibration below is the check that the instrument sees damage at all.

**Calibration** (`node path-read.js --calibrate --workbook <handbook>`): a fixed control home page (`path-controls/home-control.html`) in front of the handbook, then four copies. Removing the start link must drop the score by 20 or more. Removing the licence line must drop licence by 20 or more. Removing Continue to Module 1 and its links must drop the score, the Module 1 stage or the Module 1 step by 20 or more. A neutral added sentence must stay within 20 on every score. Run it after any change to the question, personas, targets or view extraction.

## Visual rubric

Fixed states: home first viewport; handbook entry; step 1, the first request; step 2, keep my game (folder); step 3, course files; Continue to Module 1; Module 1 start. Each at 1440 × 900 and 421 × 698.

**Gates** (mechanical, pass or fail, from `path-visual.js`):

1. No horizontal scroll in any state.
2. Each anchor lands with its heading visible and not covered by fixed chrome.
3. Home has a start link that opens the handbook, and a visible licence line.
4. The first Copy button copies the request text.
5. Body text in view reaches 4.5:1 contrast. Keyboard focus is visible on the first ten Tab stops.

**Scores** (critic, 0 to 4 each, 24 in total). 0 absent or broken, 1 needs searching or guessing, 2 usable with a material ambiguity, 3 fluent with one local flaw, 4 exemplary in every state.

| Dimension | What earns 4 |
|---|---|
| Promise | The home page's first viewport says what the learner will be able to do and who it is for, in the learner's terms. |
| Licence | Free for your own learning, and teaching it needs a licence, both visible on home without scrolling far, with a route to ask. |
| Start | One start action stands out on home and lands on the first activity, not on a cover or contents list. |
| Action and result | The sentence to type, the instruction, an optional video and the result to look for each have a distinct look, in both widths. |
| Route to Module 1 | The learner can see where they are in the five steps, and Continue to Module 1 leads to a Module 1 start with one clear first step. |
| Layout | Recognizable character, clear type scale, comfortable line length; home and handbook feel like one product in both widths. |

**AAA** = all gates pass, 23 or more, every dimension at least 3. **AA** = all gates pass, 20 or more. **A** = all gates pass, 16 or more. Reports also give the total on 0 to 100 (points × 100 / 24) to read beside the other scores: A starts at 67, AA at 83, AAA at 96. Record the state, the visible element and what it costs the learner for every deduction. Keep these criteria fixed while iterating. The critic is Sonnet, and its verdict is a second opinion, not proof; the proto's earlier AAA came from an independent critic and is not comparable with these scores.

## Results

Newest first in `path-results.md`.
