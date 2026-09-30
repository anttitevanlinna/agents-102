# Ask before you move

## Big Idea

Your team shows you who wants to move when your questions give them room to show it.

## What You'll Learn

After this module, you will be able to:

- **Draft** starter questions grounded in what your memory knows about each person
- **Send** the first questions to your team before this session ends
- **Build** a response reader that sorts answers into move candidates and coalition candidates
- **Log** which questions go first, and what else was on the table, in the Decision Journal

## Start here

This module runs in a new Claude Code session in `~/Documents/leading-agentic-engineering/`, the folder your memory lives in.

What did the weekly diagnostic tell you that you did not already know?

## Search before you pick

[Lecture: The coalition picks itself](lectures/the-coalition-picks-itself.md)

[Exercise: Draft your starter questions](exercises/draft-your-starter-questions.md)

## Ask for real

[Exercise: Send the first three](exercises/send-the-first-three.md)

## Let the answers sort themselves

[Exercise: Build the response reader](exercises/build-the-response-reader.md)

## Did you make progress?

Your questions are out and a reader is sorting what comes back. Put the Quality Gate's top question to this module.

{{prompt:em-close-ask-before-you-move}}

## Key Concepts

- The question you ask decides who can show you they want to move.
- Colleagues move each other; your part is making the room where that happens.
- Your coalition shows itself by engagement, not by title or seniority.
- An answer is evidence in the person's own words, and silence is evidence too.
- Every pick goes in the Decision Journal with what it beat.

## Bring to Module 3

**The week's answers in `responses/`, and the reader's latest `shortlists.md`.** Module 3 picks your first move from them. With no answers in, you pick from your own guesses again.

## Next

You asked before you moved. Next you pick the first move from your team's own answers, and find the two obstacles that, once moved, make the rest movable.

<!-- maintainer -->

- **Transitions:** start here 5 @start "Start here" · close 10 @end "Did you make progress?"

## Design (EM proving run 2026-09-30)

- **Mood:** earned clarity after unease. The unease is sending your own team questions whose answers you cannot predict; the clarity is two shortlists built from their words. The module does not resolve which move comes first: that belongs to M3.
- **The coalition picks itself (lecture):** search, don't pick. The lecture scopes the Microsoft/HBR finding to leadership communication once peer influence is controlled for (not mandates).
- **Draft your starter questions:** `em-draft-starter-questions` drafts five to ten questions from Team Knowledge and the latest diagnostic, screened by the Quality Gate, and recommends three; `em-log-first-three` logs the manager's pick with alternatives and adds one Quality Gate check readable against `responses/`.
- **Send the first three:** `em-draft-first-three-messages` drafts the messages into `outbox.md` in the manager's voice; the manager edits and sends by their own channel. The agent never sends. Answers land verbatim in `responses/<first-name>.md`.
- **Build the response reader:** `em-build-response-reader` writes `agents/response-reader.md` and runs it once; `em-response-reader-task` is the daily scheduled task. Two lists in `shortlists.md`, each entry quoting its answer, proposes only. M1's weekly diagnostic also reads `responses/`, so Team Knowledge learns from answers there.
- **Did you make progress?:** `em-close-ask-before-you-move`, evidence = questions sent, first answers, shortlists, who has not answered; one in-chat question on what surprised the manager; verdict into the Decision Journal.
- **Graph ids:** produces `em-starter-questions` (questions.md), `em-outbox` (outbox.md), `em-response-reader`, `em-shortlists`; `em-responses` enters as student-input. Reads `em-leadership-memory`, `em-diagnostic`, `em-observations`, `em-team-notes` from M1.
- **Timing:** 88 min (start here 5, lecture 8, draft 20, send 15, reader 30, close 10). Leaves own their minutes; Transitions price only the beats with no file.
