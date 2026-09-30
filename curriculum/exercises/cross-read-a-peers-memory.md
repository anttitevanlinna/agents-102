# Exercise: Cross-read a peer's memory

**Time:** 25 minutes.

**What you do:**

Other managers in your company are running the same memory on their own teams. Each of you sees one team from the inside. Swap exports with one of them and let your memory read theirs against yours.

## Export what you are willing to share

Write an export of your memory that another manager can read, with your people as roles, not names.

{{prompt:em-export-peer-memory}}

Read `peer-export.md` before it goes anywhere. This is your team, described to a colleague. If a line would surprise the person it describes, cut it.

## Swap with a peer

Pair up with another manager. Send them `peer-export.md` by the channel your company already uses for internal documents. Save theirs in `peers/`, named after them, for example `peers/maria.md`.

Working without a partner? Save the sample peer export that comes with the training as `peers/sample.md`.

## Read their memory against yours

A manager in your company shared their memory export. Have Claude read it against yours.

{{prompt:em-cross-read-peer-memory}}

What they see lands in Team Knowledge as observations tagged with their name. One outside report is one sighting; your own team's evidence is what promotes it. Tell your partner which of their lines surprised you most.

<!-- maintainer -->

## Design (EM proving run 2026-09-30)

- **Atomic — no phase markers.** one sitting with a partner; export, swap and read are short beats of one exchange, too small to budget apart.
- **Role in M3:** outside view before the crux. Mood = co-creation through cross-pollination; this beat earns it.
- **Prompts:** `em-export-peer-memory` writes `peer-export.md` at the training-folder root (outside `peers/`, so the crux reader never takes your own export for a peer's). `em-cross-read-peer-memory` reads `peers/`, writes `peer:`-tagged observations (never hypotheses or rules) + one outside-view Quality Gate check (strategy M3 Block 3).
- **Privacy (decision 2026-09-30):** colleagues appear as roles or pseudonyms, never names; no quotes from `responses/`; borderline lines left out and listed. The owner reads the export before swapping. That read is consent, not error-catching; student_facing §9 does not reach it.
- **Swap:** single-company cohort; person-to-person, no prompt (pedagogy §18). One room acknowledgement in this file ("Tell your partner…"), within student_facing §2's one-line ceiling.
- **Without a partner:** `curriculum/trainings/engineering-management/sample-peer-export.md` → `peers/sample.md`. Delivery path for that file (starter or workbook link) is owed by the training build; body names it without the word self-study (student_facing §39).
- **Consumed by:** `em-find-two-crux` reads `peers/`.
- **Leap test (§45), by next working day:**
  1. Has a `peers/<name>.md` from a named peer manager in the same company.
  2. Has at least one Team Knowledge observation tagged to that peer that was not in the memory before.
  3. Has one outside-view check in the Quality Gate and can name the peer pattern it came from.

**View summary:** You swap a privacy-stripped export of your leadership memory with another manager in your company and let your memory read theirs: shared patterns, blind spots, and one outside-view check for your Quality Gate.
