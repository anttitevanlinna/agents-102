# Real-learner golden set: protocol

Goal: 5 real learners, one module, their own words to the cold question. It answers two things the simulation cannot: do simulated students state the target more or less often than real ones, and does the scorer agree with the trainer on real answers.

## Module

**Module 1, Getting going.** It needs no earlier module, so anyone with Claude Code can take it cold. Simulated students state its target in only 1 of 6 runs (they take home "don't trust the agent's self-review" instead), so real learners settle whether that is the module or the simulation.

## Learners

5 people who match the buyer (leaders who will build their own agent), not trainers or the curriculum's authors. They run the module as written, self-paced or in a room. No pre-briefing on what the module is about.

## Two questions, same wording, material closed

1. **End of module**, before any debrief: *"A colleague missed this module. In one or two sentences, what is the one idea from it they should not miss?"* Optional second line: one moment that stuck.
2. **2 to 3 days later**, by message, same question. No reminder of the content.

Collect the answers any way that suits the room (paper, chat, voice note). Copy them word for word. Do not correct spelling or tidy them.

## Capture

Trainer's page: https://claude.ai/artifact/Twon4CZwhamdzGmDHn6Pdz (private to the owner; learners never open it). Per answer: learner code (L1 to L5), module, end or later, the answer, the optional moment. After both rounds, mark each answer *states the target / does not / unsure*. The target sentence is shown next to each card.

## Scoring

Ask Claude in this project to "score the golden set". It reads the page's `answers` collection, writes JSONL in the `score.js` format, and runs:

```
node curriculum/evals/teaching/score.js --in golden.jsonl --out golden.scored.jsonl
```

The output gives the real target-stated rate per round (`real-end`, `real-later`) and the scorer's agreement with the trainer's marks, with each disagreement listed.

## What the numbers decide

| Result | Meaning |
|---|---|
| Scorer agrees with trainer on 9 of 10 or better | Trust the scorer on simulated answers |
| Real end-of-module rate within 1 learner of the simulated rate | Simulated students are a usable proxy for this module |
| Real rate much higher than simulated | Simulation under-reads; treat sim drops as soft |
| Real rate much lower | Simulation is generous; require a bigger sim lift before calling a variant better |
| Later rate drops sharply from end | The idea is heard but not kept; the module needs a beat that makes the student use it |

Effort: about 10 minutes of trainer time per learner, mostly copying two answers and marking them.
