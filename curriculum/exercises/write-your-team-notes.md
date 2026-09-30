# Exercise: Write your *team notes*

**Time:** 15 minutes.

**What you do:** Write a few plain lines about each person you lead, with no agent in the loop.
**What you build:** `team-notes.md`, the page every agent in this training reads before it says anything about your team.
**The point:** An agent can reason about your people only as well as you describe them.

## Rate your confidence first

Open a plain text file in your `leading-agentic-engineering` folder and save it as `team-notes.md`. Any editor will do.

Line one is a number. How confident are you, from 1 to 10, in leading your organisation to an AI-first and agentic world? Write the number and one sentence on why it is that number and not one higher.

This rating stays in your folder. You will rate again later in the training, against this one.

## Write a few lines per person

Then one short block per person you lead. Use a role or first name, whatever you would say out loud. Four things each:

- **What they do.** Their work, in a line.
- **How they use AI now.** What you have actually seen, not what you assume.
- **What they have said about it.** A remark, a complaint, a question. Their words if you remember them.
- **What the last change left them believing.** The reorg, the new tool, the process that came and went. What did they take from it?

Plain lines are enough. *"Senior backend. Uses Copilot for tests, nothing else I've seen. Said in retro that agents 'write code nobody can review'. Came out of the platform migration tired and sceptical of anything announced from above."*

If something else matters, add it: who they trust, who they teach, who they would follow. Nobody else can write these lines.

## Mark where you are guessing

Some blocks will be thin. You know what someone does and not much more. Leave them thin and add a line at the bottom of the file: the two or three people you know least about.

Those are the first gaps the memory will show you, and it is better that you saw them first.

<!-- maintainer -->

## Design (EM proving run 2026-09-30)

- **Atomic — no phase markers.** one continuous writing beat in one file; the three sections are the file's own order, not separately timed steps.
- **No agent in this exercise, by design.** The manager types `team-notes.md` in any editor. It is the irreducible input (strategy § The correlation at the heart of the training); an agent drafting it would replace the one variable only the manager holds. This is the training's single non-agentic beat and it is deliberate: the next exercise is the agent's first read. The "every exercise is agentic" rule (strategy § Six modules) is met at module level; if a judge files it, this is the answer.
- **Confidence baseline** is line one of `team-notes.md` so `em-install-leadership-memory` can copy it into the Decision Journal, where `em-close-declare-your-intent` reads it for the second rating (strategy § Self-assessment). "You will rate again later in the training" is deliberately unnumbered: the proving run stops at four modules and the full training at six.
- **Per-person fields** mirror the mock (`em-mock-diagnose-your-team`) and the strategy's *You bring* list. The example block is fictional and role-only.
- **Roles or first names:** the notes stay in the manager's folder; the M3 peer export carries roles or pseudonyms only (cross-module decision 4). The module's *How we work* line carries the privacy promise; this exercise does not repeat it.
- **Thin spots named by the manager** feed the install prompt's "thin notes are named, not guessed" instruction, and seed the week's observation targets (Bring to Module 2).
- **Watch-for:** managers with 30+ reports stall on the per-person block. Trainer move: direct reports first, then one block per sub-team for the rest; the install prompt handles either.
- **Leap test (3 Monday outcomes):**
  1. Has a `team-notes.md` with a line for every direct report and a 1–10 confidence rating on top.
  2. Can say, unprompted, which two or three people they know least about and what they would ask each.
  3. Adds a new line to `team-notes.md` (or an observation) after a one-to-one, without being told.
