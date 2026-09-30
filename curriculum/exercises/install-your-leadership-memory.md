# Exercise: Install your *leadership memory*

**Time:** 25 minutes.

**Session** *(new, "Module 1 - See your team")*

Start a new Claude Code session in your `leading-agentic-engineering` folder.

```
/rename m1-see-your-team
```

**What you do:** Have Claude read your notes and build a three-block memory around them.
**What you build:** `team-leadership.md`, a page that places every person with the evidence behind each call.
**The point:** A placement you can trace to a line you wrote is one you can argue with.

## Install the three blocks

The memory is one file with three blocks. **Team Knowledge** holds what you know about your people, each entry marked by how sure you are: an *observation* you saw once, a *hypothesis* you have seen enough to suspect, a *rule* confirmed over weeks. **Decision Journal** holds why you decided what you decided, with what else was on the table. **Quality Gate** holds the checks a move has to pass before you call it progress.

Ask Claude to read your notes and set up the memory.

{{prompt:em-install-leadership-memory}}

Claude writes the file and tells you what it placed, where it is least sure, and what it would want you to find out this week.

## Argue with the placements

Open `team-leadership.md`. Go to the people you know best first. For each, ask one question: is that true of them?

Where it is wrong, tell Claude which person, what it got wrong, and what you know that the notes did not say. Claude updates the entry and quotes your correction as its new evidence. One or two corrections are plenty in the room; the rest can wait for the week.

A placement you disagree with is not a failed exercise. It is the first thing your memory learned that it could not have read anywhere.

## Keep the gaps visible

Look at the people Claude declined to place. Those gaps are not Claude's failure to guess well. They are the things you do not yet know about your own team, now written down where you will see them again.

<!-- maintainer -->

## Design (EM proving run 2026-09-30)

- **Atomic — no phase markers.** one prompt and the conversation that follows it; the sections are reading order, not separately timed steps.
- **Session opens here** (`check_pedagogy.md` §52 pattern a: first agentic exercise carries the widget). Training folder = `~/Documents/leading-agentic-engineering/` (cross-module decision 2); the module's Start here creates it.
- **Three-block primer in body before the prompt**, because the student meets *observation / hypothesis / rule* here first and the rest of the training uses the tier words bare (`check_student_facing.md` §2). Huryn's three blocks is the shape (strategy § The Backbone); attribution lives in this block, not the body (one practitioner slot per module goes to Ramp in the theory lecture).
- **One prompt, `em-install-leadership-memory`.** Builds `team-leadership.md`: ADKAR per person (furthest stage clearly reached + what they need next), adoption-curve tier for the team (chatting → custom assistants → agentic workflows → compounding engineering), every entry tagged and quoting its line; nothing starts as a rule unless the notes say it has been seen repeatedly; thin notes named, not guessed. Decision Journal opens with one dated entry (placements, alternatives for the least certain, confidence baseline). Quality Gate opens with the calibration question as its top gate. Tail = post-action report (`check_prompts.md` §21) + one thing to find out this week, which seeds Bring to Module 2. No-AUQ guard for the tmux runner (§42).
- **Argue with the placements is judgement, not error-catching** (`check_student_facing.md` §9 carve-out): the manager is the only authority on whether a placement is true of a person. The correction goes to Claude in conversation (no fence: the utterance is the manager's own words about their own people, and a scripted prompt would put words in their mouth). This is the module's belief beat: *my knowledge of my people is my irreducible edge*.
- **Frameworks:** ADKAR (Hiatt / Prosci); Moore's adoption curve with Ramp's L0–L3 ladder as its operationalisation (`case-library.md` § Ramp, M1); Fin's 5-dimension per-person tiering as the diagnostic precedent (`case-library.md` § Fin). Huryn, *Three Blocks That Make Claude Get Smarter Every Session* (strategy § The Backbone; `continuous-research/insights.md` → "CLAUDE.md That Learns").
- **Failure mode + escape hatch (§47):** notes too thin for any placement → Claude writes mostly gaps. Expected for a manager of a large team; the body's *Keep the gaps visible* covers it. Trainer move: have them add three lines to the thinnest block and ask Claude to rerun the placement for that person only.
- **Leap test (3 Monday outcomes):**
  1. Opens `team-leadership.md` before a one-to-one and reads that person's placement and evidence.
  2. Disagrees with one placement and changes it, citing what they know that the notes did not say.
  3. Books a conversation with one person the memory flagged as too thin to place.
