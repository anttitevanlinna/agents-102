# Exercise: Send the first *three*

**Time:** 15 minutes, then answers as they come in.

**What you do:** Send three questions to three people on your team, where they already answer you.

**What you build:** A `responses/` folder that fills with your team's own words.

**The point:** A question only starts working once someone can answer it.

## Draft the three messages

The same question reads differently from you than from a form. Ask Claude to draft one short message for each of the three people, in your voice.

{{prompt:em-draft-first-three-messages}}

Claude writes the drafts. Sending them is yours. Change anything that does not sound like you, and cut anything that sounds like a process.

## Send them where your team already answers

Use the channel each person already answers you in: a direct message, the team channel, the one-to-one you already have booked. A new form or a new meeting turns a question into a process.

Send all three before this session ends. If one person is out of reach, send the other two now and put the third on your next one-to-one.

## Keep every answer in responses/

When an answer comes in, paste it into a Claude Code session in your training folder with who sent it and which question it answers, and ask Claude to save it word for word as `responses/<first-name>.md`. An answer you heard out loud goes in the same way, written down as close to their words as you can, the day you heard it.

Keep the words as they came. The reader you build next quotes them, and a tidied answer loses the line that mattered. These files stay in your own folder.

<!-- maintainer -->

**Atomic — no phase markers.** One move: draft, send, and set up where answers go. The send cannot be timed; it is the manager's.

## Design (EM proving run 2026-09-30)

- **Role in M2:** the module's executed leadership move, done in-session. The unease in M2's mood peaks here: questions whose answers the manager cannot predict, sent to their own people.
- **Agentic step, send stays human.** `em-draft-first-three-messages` drafts one message per recipient into `outbox.md` from `questions.md`, the logged pick and Team Knowledge, matching the voice of the manager's own `team-notes.md`. The agent never sends (`check_prompts` §21 carve-out: an external trust line). The body keeps the send as the manager's move.
- **`responses/` shape:** one file per person, `responses/<first-name>.md`, verbatim answer + the question + date. Read by the response reader, M1's weekly diagnostic, and M3 (`em-shortlist-and-first-move`, `em-find-two-crux`). Verbatim because the reader quotes the answer behind every shortlist entry.
- **Privacy:** answers stay in the manager's folder; M3's peer export uses roles or pseudonyms. Said once, at the moment of saving.
- **Room:** some managers stall on sending. That is the trainer's to handle, not the body's. A one-line prompt to the room ("who has sent one?") after five minutes is enough.
- **Failure mode + escape hatch (§47):** no answers by the next module. The silence is data: the reader lists who has not answered without ranking them down, and the M2 close reads it as evidence.

**Leap test** (`check_pedagogy` §45, three observable outcomes by the next working day):
1. **Three questions sent to three named people through a channel the team already uses.** Falsifiable: timestamps in that channel, dated the module day or the next one-to-one.
2. **At least one answer lives in `responses/<name>.md` in the person's own words, with its question.** Falsifiable: the file quotes; it does not paraphrase.
3. **The manager answers one reply with a follow-up question, not a verdict.** Falsifiable: the thread shows a question back.
