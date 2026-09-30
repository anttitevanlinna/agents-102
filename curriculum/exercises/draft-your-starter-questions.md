# Exercise: Draft your starter *questions*

**Time:** 20 minutes.

**Session** *(new, "Module 2 - Ask before you move")*

```
/rename m2-ask-before-you-move
```

**What you do:** Draft questions for your team from what your memory knows about each person.

**What you build:** `questions.md`, questions only your team could be asked, and a logged pick of the first three.

**The point:** The question you ask decides who can show you they want to move.

## Draft the questions from your memory

Your memory already places each person, and it marks where your notes were too thin to place them. Ask Claude to draft five to ten starter questions from it.

{{prompt:em-draft-starter-questions}}

Claude runs every question past your Quality Gate before saving it. A question that trips a check comes back rewritten, with the check it tripped named. Push back on any question you would not send in your own voice.

## Pick the three that go first

Claude recommends three. You know things the memory does not: who is on leave, who just had a hard review, who would read a question from you as a test. Keep its three or swap any of them, and tell Claude which three you are sending and why.

Then log the pick in your Decision Journal, with what else was on the table.

{{prompt:em-log-first-three}}

The check it adds to the Quality Gate is the one you read when the answers come in: it says in advance what a yes and a no would look like.

<!-- maintainer -->

**Atomic — no phase markers.** Two prompts, one sitting: draft, then pick and log. The pick depends on the draft being on screen, so the beats do not split.

## Design (EM proving run 2026-09-30)

- **Role in M2:** opens the module's session and turns the M1 memory into the week's search instrument. Reads `team-leadership.md` (Team Knowledge, Quality Gate) and the latest `diagnostics/<date>.md`.
- **Two prompts, not one.** `em-draft-starter-questions` drafts and recommends; `em-log-first-three` logs the manager's pick. The pick stays the manager's (`check_pedagogy` §10) and has to happen between the two. Headless: `em-log-first-three` takes Claude's recommendation and marks it as Claude's, not the manager's.
- **Quality Gate runs before anything is saved.** M1 installed the three backfire checks. *"How many hours a week do you use AI?"* should trip the mandate/performance check. The gate catches it in the fence; the body does not warn about it.
- **Question shape lives in the fence:** open, tied to a named Team Knowledge entry, thin entries asked about rather than guessed, and at least one question that asks the network (*who do you go to…*), from the lecture's Citi/PwC slide.
- **Failure mode + escape hatch (§47):** the diagnostic has not run (the M1 week was skipped). The prompt reads the latest diagnostic *if there is one*; Team Knowledge alone is enough to draft from.
- **Watch-fors:** managers who send ten questions to everyone. The pick is three on purpose: three answers can be read, ten become a survey. Managers who pick only their enthusiasts: the trainer asks who on the list would surprise them by answering.

**Leap test** (`check_pedagogy` §45, three observable outcomes by the next working day):
1. **`questions.md` holds five to ten questions, each naming the Team Knowledge entry it rests on.** Falsifiable: a question with no named entry is a generic survey item.
2. **The Decision Journal carries the pick: the three that went first, the alternatives, what waiting on the others costs.** Falsifiable: the entry names at least two questions not chosen.
3. **The Quality Gate carries one new check that says what a yes and a no would look like in `responses/`.** Falsifiable: the check names an observable in the answers, not a feeling.
