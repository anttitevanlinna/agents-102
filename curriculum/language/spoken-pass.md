# Spoken pass (Agents 101 → AE101 bar)

Not student-facing. Sentence-level wording pass for Modules 1-6. Runs UNDER the taste canon, never beside it.

**Load first, every time.** `rewrite-rules.md` (this folder) · `evals/mechanical/persona-student/taste-rules.md` · `writing-style.md` · `taste-notes.md` newest entries · T1 leads `writing` + `student_facing`. Maintainer 2026-11-27, mid-pass: "did you load the compendiums?", "have you read the taste eval / rubriks?" A pass run without them repeats defects those files already name.

**Length.** Shorter or nothing (`writing-style.md` § Editing a shipped slide). Added words are allowed only to name the actor or to make a claim true. A fragment gets its verb; pay for it by cutting the restatement next to it. Measure changed text before/after per module and say the number.

**Test per sentence.** Would a proficient agentic business person say it out loud to a colleague? Then the literal read:

1. Can the subject do the verb? Instructions don't send, workarounds don't decide, an eval doesn't write, a module doesn't use or add. Give the verb to the agent, the judge, the LLM or you.
2. Every pronoun has its noun in the same sentence ("all of them" → "every agent you run").
3. No pen verbs for the student ("write that quality down", "write down five moments"). The student tells the agent; the agent writes.
4. Platform word wins: `CLAUDE.md` / `AGENTS.md` by runtime span, never a house name ("root instructions file"). No house noun for a file either ("the tactic") → "the rules in" + the file name.
5. Every sentence has a verb; a bold noun stack opening a Bring block is not a sentence.
6. A paragraph that restates its own heading, the Debrief above it, or what the student now holds → cut.
7. No count beside the list it counts. No "do not skip". No UI steps, no "read the .md", no "look at".
8. Body agrees with the prompt it leads into: read the prompt body first; lead-in = the ask + what the student does with the answer.

**Keep**
- Maintainer's first-person lines verbatim. Locked sentences (`locked-sentences.json`).
- Prompt vocabulary matched until the prompt changes (the eval that scores a chosen quality has one name, goal-nudger).
- Trainer-to-room lines ("That is expected.").
- Unease stays open, never declared.

**Procedure per module**
1. `node scripts/read-training.js agents-101 --modules <slug>`; read as the stranger.
2. Skim each `prompts/<key>.md` body the page leads into.
3. Edit student body only; update maintainer notes that name a renamed header.
4. `node scripts/gates.js`; `node scripts/check-new-sentences.js --update`; `node scripts/build-a101-mvp.js --edition open` + `node --test scripts/build-a101-mvp.test.js` (loader-framing anchors); commit with the index.
5. Before/after pairs for the maintainer: project files `language-pass/pairs.py <repo> <base> <head> <files>` → review page. Never report the pass as good from scores; show pairs.

**Not covered here.** Prompt bodies (gated, `prompt-ok`), step order and structure, Prework / Bring / Next blocks, supplementaries, Modules 7-8.
