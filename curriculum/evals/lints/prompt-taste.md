# Lint — Prompt Taste

**Catches:** prompts a student pastes that no person would say out loud to an agent. Capitals, orders to do the obvious, course talk, coined words, harshness by order.

**Two steps.** The script ranks. A reader judges. The script never decides that a prompt is good.

## Run

```
node scripts/prompt-taste.js --training <key>             # summary and the 12 prompts to read first
node scripts/prompt-taste.js --training <key> --read 5    # full text of the top 5 with their tells
node scripts/prompt-taste.js --training <key> --check     # gate, runs in npm run test:gates
node scripts/prompt-taste.js --training <key> --update-baseline
```

`<key>` is any training in `site/layouts/curriculum.js`. Prompts are read from the registry in page order.

## The gate

`--check` fails when a training's scored tells exceed its number in `prompt-taste.baseline.json`. A training with no baseline passes. To hold a new training to the check, clean it once and run `--update-baseline`. When the gate fails: read the listed prompts, fix them, or update the baseline if they pass the reading step.

## The reading step

Take the top of the ranking and hold every sentence to one test:

> Would a proficient agentic business person say this out loud to an agent?

Rules behind the test live in `check_prompts.md` §50. In short:

- "You" is the agent, "I" is the student. Questions the agent is told to ask the student are the exception.
- Open with the goal or the role. Role names are ordinary words.
- No capitals, for emphasis or for labels.
- Do not tell the agent what it does anyway ("start by reading the files", "read them properly").
- "No plan or preamble" only where a plan up front would get in the way.
- A "do not" stays only where the miss is serious. Small extras are fine.
- A limit that comes with a specific, true reason stays. A generic proverb goes.
- Short fragments are good when each adds an instruction.
- Naming a concept so the agent says it back in more words is good teaching.
- Keywords from agent practice stay ("distinctive, not descriptive", "sources first", `[NOT FOUND]`).
- Coined course words go ("handoff seams").
- A long prompt opens with one line that says what it is about.

## Asking the maintainer

When the rules pull two ways, do not guess. Put up to ten prompts on one page, each with one question, your lean, and the full prompt with the span marked. One sample per pattern; the answer settles the lookalikes. Write each verdict back into §50.

## Tells

| Tell | Scored | What it matches |
|---|---|---|
| caps | 1 | words in capitals outside code spans, acronyms excepted |
| obvious | 1 | "Start by reading", "Read them properly", "don't skim" |
| preamble | 1 | "No plan or preamble" |
| absolute | 1 | "non-negotiable" |
| harsh | 2 | "harshly", "failing grade" |
| dontRun | 2 | three or more "do not" sentences in a row |
| meta | 2 | "this prompt", "durable operating memory" |
| youFlip | 2 | "you" that means the student |
| coined | 2 | "seam", "wobbled", "dialect leak" |
| quota, fragments, module, wording | 0 | counted for the reader, never scored. `module` = a sentence that names a module number |

## Limits

Blind to dense sentences, lost referents and non-native turns. Counts are a floor. A prompt with a score of zero can still read badly; a prompt with a "preamble" hit can be right.

<!-- maintainer -->

Baselines 2026-11-27: agents-101 27 scored tells in 96 prompts (2.0 per 1,000 words), left in Modules 7 and 8 and the two lens names in the Module 4 skill prompt. agentic-engineering-101 16 in 72 (2.7 per 1,000 words), mostly capitals for emphasis. Other trainings have no baseline.
