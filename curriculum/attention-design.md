# Attention design

Not student-facing. How much text a learner's moment can carry, and where it sits on the page. `writing-style.md` governs how a sentence reads; this file governs how much of the learner's attention the page spends.

**Frame (Antti 2026-11-27).** *"The handbook is not the thing. the promtps and cowork usage is the thing. How much text can we really have? Consider this as UX matter."* *"the point is really about mental capacity. Ease of navigation and how much can a student really read."* *"I did not say "cut". I said consider."* This file informs design. It licenses no cut.

## The model

A self-study learner works in two windows: the handbook beside the agent, half a laptop screen each. Three kinds of text compete for the same module time:

| stream | where | who sets its length |
|---|---|---|
| handbook text | the page, outside prompt boxes | the writer |
| prompt text | the page, shown in full | the prompt |
| the agent's replies | the agent's window | the prompt, when it states a length |

The handbook is the only stream that is not about the learner's own work. Working assumption: it is the first one skipped.

A module is one cycle per prompt: find the place, read the text in front of the prompt, copy, wait, read the reply, come back. Capacity differs at each point of the cycle.

| moment | what the learner can take | working limit |
|---|---|---|
| leaving for the agent (text before a prompt) | one thought, carried across the window switch | one sentence, up to 25 words |
| coming back (text after a prompt) | attention is in the reply | nothing, or one sentence the reply cannot give |
| an idea slide (a `##` without a prompt) | one glance | one idea, about 60 words |
| a stretch without a prompt | about three minutes | six slides or 600 words |
| names to hold | a handful | a file name only when the learner acts on that file |
| a module | the time the prompts leave | about 2,000 words |

Module arithmetic: one prompt cycle takes about five minutes (estimate). 8 to 16 prompts take 40 to 80 of 90 minutes. About 10 minutes remain for handbook text, 2,000 words at 200 words a minute.

**Status of the limits.** Working values, the author's judgment from the measures below. Not maintainer rulings, not research findings, not gates.

## Tests

- **Added value.** A body sentence earns its place when it tells the learner something neither the prompt nor the agent's reply will. Antti on four eval-loop lines: *"NO ADDED VALUE"*, *"what is the real added value for added text?"*, *"not needed. less is better often"*.
- **In view at Copy.** An instruction the learner needs while the agent works sits before the prompt, or close enough below it to be on screen when the learner presses Copy. Text under a prompt box taller than the screen is out of sight at that moment.
- **Place-finding.** A learner returning from the agent after minutes away finds the next step by a landmark, not by reading.

## Earlier calls, same principle

Each of these reads alone as "use fewer words". Together they say one thing: the learner's attention is the budget, and words, screens, names and the agent's replies all spend it.

- *"the information / word count is quite wordy still. ae101 has been compacted, compacted. This is quite important as training slides need to be able to be glanced."* (Antti 2026-11-01, `language/rewrite-rules.md` § Glance budget)
- *"A has too long a paragraph to easily glance"*, *"Good test: does the paragraph / sentence help student execute the learning on their own?"* (same file)
- *"Shorter, or nothing"*, *"longer and not enough value"* (`writing-style.md` § Editing a shipped slide)
- *"too long sentence formats. KISS"* (Antti 2026-11-18, on learning goals)
- *"never ask students to read .md files"* (Antti 2026-11-26): the agent reads the file, the learner reads the result.

## Measures

Open edition, Modules 1 to 6, Cowork profile, 720 by 800 pixels. Measured 2026-11-27 on main `3a89989`.

`node curriculum/evals/scripts/attention-load.js --modules getting-going,building-agent-systems,multi-agent-systems,security,output-quality,evaluations`

| module | stated min | handbook words | min at 200 wpm | prompts | prompt words | screens | file names in text |
|---|---|---|---|---|---|---|---|
| 1 Getting Going | 80 | 2,102 | 11 | 8 | 818 | 16.9 | 6 |
| 2 Building Agent Systems | 90 | 3,276 | 16 | 16 | 1,903 | 26.9 | 16 |
| 3 Multi-Agent Systems | 90 | 1,622 | 8 | 13 | 1,768 | 18.1 | 13 |
| 4 Security | 105 | 2,895 | 14 | 12 | 1,427 | 23.4 | 10 |
| 5 Catching Hallucinations | 85 | 1,878 | 9 | 10 | 1,485 | 18.2 | 4 |
| 6 Evaluations | 90 | 2,199 | 11 | 9 | 1,432 | 18.8 | 7 |
| all six | 540 | 13,972 | 70 | 68 | 8,833 | 122 | |

- Words in front of a prompt: 32 of 68 prompts have 30 or fewer, 29 have 31 to 60, 7 have more.
- 17 prompt boxes are taller than three quarters of the screen. The tallest is 1.7 screens.
- 9 of 68 prompts state a length for the reply (pattern count, approximate).
- Idea slides: 174, of which 26 are over 80 words. Longest stretch without a prompt, per module: 468, 730, 342, 810, 865, 651 words.
- Source counts for scale, same method on both trainings: Agents 101 has 12,830 body words and 9,399 prompt words in six modules; Agentic Engineering 101 has 23,702 and 5,638. Agents 101 slides are the smaller ones; its prompts are the longer ones.

What the measures say: handbook text in total is near the module limit in four of six modules (2 and 4 are over). The heavier loads are the prompt text on the page and the distance a learner scrolls to find the next step.

**With long prompts in short** (self-study handbook, measured 2026-11-28 on one build of main `a1ec2dbc`; `--full-prompts` gives the first column):

| | every prompt open | long prompts in short, with callouts |
|---|---|---|
| prompt words in view | 8,833 | 4,940 |
| prompts shown in short | 0 | 36 of 68 |
| prompt boxes taller than three quarters of the screen | 17 | 4 |
| screens, six modules | 125.1 | 117.0 |
| screens per module | 17.2 / 27.8 / 18.7 / 23.8 / 18.5 / 19.1 | 16.6 / 26.2 / 17.2 / 22.5 / 16.8 / 17.7 |
| handbook words outside prompts | 14,145 | 14,652, of which callouts 507 |

The short prompts save 10.9 screens and the 42 callouts take 2.8. Lead-ins, idea slides, stretches without a prompt and file names measure the same in both columns.

## Navigation

A module is 17 to 26 screens beside the agent in the self-study handbook, 17 to 28 with every prompt open.

In the self-study handbook each prompt box carries its place in the module (*Prompt 4 of 9*) and a filled *Copy prompt* button, and a long prompt shows in short, as below. Module 6, Phase 2 goes from 2.5 screens to 2.0 with four callouts on the prompt; the prompt box goes from 1.5 screens to 1.0. Trainer-led editions and the Slides layout show prompts in full.

Code: `curriculum/delivery/agents-101-mvp/shell/prompt-short.js` (rules, numbering, toggles), styles in `curriculum/delivery/agents-101-mvp/shell/deskpad.css`, switched on by `promptsInShort` in `scripts/build-a101-mvp.js`, tests in `scripts/prompt-short.test.js`. The full prompt stays in the page, so Copy, the tests and the simulations read all of it.

Page with the measures and the step shown both ways: https://claude.ai/artifact/AvNMCXwk1wg17ScN1rx6on

## Glancing at a prompt

*"I need to find a way to tell solo students they don't need to read the prompts word-to-word. Or find some UX for that."* (Antti 2026-11-27)

**The stance** (Antti 2026-11-28): *"glance at it. check what seems pertinent in more detail. No need to study all detail."* The learner reads a prompt the way a manager reads a brief someone else wrote. A prompt box that shows 50 lines in code type asks to be studied; in a room the trainer says "just copy it"; for a solo learner the box has to make glancing possible.

**The split** (Antti 2026-11-28): *"handbook kind of gives squint of the prompt with key callouts. The cowork then has the full text as is. I think this introduces the big prompts right."* The handbook introduces a prompt; Cowork holds it.

Three layers. The first two are in the self-study handbook; the prework sentence is not placed.

- **Squint, automatic.** A prompt longer than eight lines shows in short when that saves four lines or more: 36 of 68 prompts. The box shows the first sentence of each part (each paragraph, each top-level list item) in the prompt's code type on grey; a run of five or more short bullets shows its first two. *Copy prompt* is the main button and takes the whole prompt. One link shows all lines in the handbook; no control per part, the full text is one paste away in Cowork. No authoring. A prompt's closing label (*My hate list:*, *Question:*) is a part of its own and stays in view, so the learner sees where their own text goes.
- **Callouts, written, only where there is a why.** *"Each prompt splits into areas. Each area might be commented in few words to call out what and why of the shape / instruction."* (Antti 2026-11-28) A callout sits between the areas as a card laid on the box: white, body type, one marker, narrower than the box, so the grey runs unbroken around it. Two ways it fails (Antti 2026-11-28). Set in the box's own type in a second colour, it reads as prompt text: *"They now feel like part of the prompt to me"*. Set as a white band across the full width, it cuts the prompt in pieces: *"I'm kind of now seeing the "prompt breaks up" which is does not really do."* Working limits, the author's judgment: a callout says why a part is there, never what it says (the line says what); one or two a prompt (the Module 6 loop prompt carries four); about twelve words each; an area with no why gets none; no callout where the sentence above the prompt, the line under the card or the agent's reply says the same. Modules 1 to 6 carry 42 callouts on 28 of the 36 prompts shown in short. Callouts are not copied. Source: `callouts:` in the prompt's frontmatter, `at` = the first words of the part, `say` = the callout. Frontmatter sits outside the prompt gate; a callout is student-facing body text and runs under the writing canon. `scripts/compile-prompts.js` fails when an `at` matches no line of the prompt body, so a callout cannot outlive its part unnoticed. Example, the Module 6 loop prompt: *The judge stays fixed, so a better score means better work.* · *The writer and the judge are separate agents. The judge sees only the briefing.* · *This is what you read when you come back.* · *The loop keeps running while you are away.* Its two areas of file paths and folders carry none.
- **Said once in the prework:** *Glance at each prompt. Check what seems pertinent in more detail. No need to study all the detail.*

**Callouts replace text.** A passage that explains a prompt from outside the prompt sits a screen away from the line it explains. Modules 1 to 6 hold three: the Module 3 Debrief (*"The prompt asks the agent for a harsh review…"*), the Module 5 slide *Notice what the prompt insists on*, and *How the loop works* in the Module 6 exercise, about 160 words together. As callouts they sit next to their lines. The Module 3 and Module 5 debrief prompts carry no callout while their passages stand: said twice costs more than said a screen away. Removing a passage is the maintainer's call, and it applies to the self-study handbook only; trainer-led editions show prompts in full and need the passages.

**Named moves stay out of Agents 101.** `trainings/agentic-engineering-101/reference/prompt-anatomy.md` names 33 prompt moves; the renderer can open one in a popup from an `anchors:` entry in a prompt's frontmatter. No Agents 101 prompt carries anchors. A name for a move is one more thing to hold; a plain callout next to the line does the job for this audience.

The sentence above the prompt carries the ask. 34 of 68 prompts open with a sentence that says what is asked (one reader's count); the others open with background, a role, a file to read or a control line. A first sentence that states the ask is a prompt change and goes through the prompt gate.

## Open

- Length of the agent's replies: not measured. Needs a recorded walk through the course.
- What real learners read and where they lose their place: no data read yet. The page sends `copy-prompt` for every copy and `prompt-open` when a learner opens a prompt in full (`site/layouts/track.js`); the time between copies and the share of prompts opened would show it.
- Reading speed for this audience: 200 words a minute is assumed.
- Whether idea slides belong in the waits, when the agent works and the learner has attention to spare.
- Prompt length as a load in itself, and how much of a prompt a learner reads before copying.
- How many new names a module can introduce.
