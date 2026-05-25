# Dual-mode M5 sim — pre-read → in-room opener

Persona: mid-level SWE (L1–L2), through M1–M4, mildly impatient with filler. Reads `reading-the-return.md` solo the night before; sits in the room next morning for `learning-through-contrast.md`. Same human, ~12h apart.

Both files expanded clean — no `{{prompt:}}` markers, pass-through.

---

## VERDICT: PASS (one facilitator-premium beat at 7, one cross-file note)

The pre-read → opener sequence reinforces. The opener lands as a warm anchor, not redundancy, because it does work the pre-read deliberately didn't: it adds the *stance* ("diagnose first, fix later"), the *arc* (test→learn→encode), and an *operational move* (`/compact` at 60%). The three-lens restatement is the only repetition, and it's explicitly flagged as restatement ("One sentence each in case you skimmed") — which converts the redundancy risk into permission.

---

## PART 1 — Pre-read, solo (night before)

**Opening / the driving question** — Absorbs: "the artefact is what M5 starts from, and the question is *what would have caught this earlier?*" The minute-10-not-25 rescale to IC clock lands well — persona thinks *"good, they're not pretending I ran this for six hours."* No confusion. **Mood 9** — sharp, respects my time.

**Three failure modes** — Absorbs cleanly; the names are concrete and each has a tell. "Plausible-but-wrong... most expensive to find" sticks. Persona files all three as a lens. No confusion. **Mood 9** — this is the part I'll actually remember tomorrow.

**Ronacher anchor** — Absorbs: someone ran a 10h / 2.2M-token port and "had something specific in place." Persona feels the deliberate withhold and is mildly intrigued rather than annoyed — *"okay, they're dangling the fix, fine."* **Mood 8** — works as a hook; a hair of "just tell me" but the curiosity holds.

**What to bring to M5** — Absorbs the contract: bring the artefact + three lenses. Clear. **Mood 9.**

Pre-read close score: **9.** Short, plants a question, doesn't over-deliver. Exactly a 5-min read.

---

## PART 2 — Opener, in-room (next morning, as the same person)

**Opening ("you have something to read now... data either way")** — Reinforces. Persona: *"yes, this is the thing — and good, my stopped run still counts."* Warm anchor. **Mood 9.**

**"Diagnose first. Fix later."** — NEW, and the best beat. The pre-read never named this stance; it only planted the question. Persona feels the click: *"oh — that's why the pre-read asked a diagnostic question instead of a fix-it checklist."* The opener retroactively explains the pre-read's shape. Pure reinforcement, zero redundancy. **Mood 9.**

**test → learn → encode** — NEW. M4 was test, today is learn, M6 encode. Persona gets a map they didn't have last night. **Mood 9.**

**Three lenses (restated)** — The redundancy-risk beat. But "One sentence each in case you skimmed" defuses it — persona reads it as a deliberate re-mount, not a repeat, and the one-line versions are genuinely tighter. Trainer reading three sentences off a screen is ~20 seconds. **Mood 8** — borderline, saved by the framing line. Without that line it'd be a 6.

**`/compact` at 60% operational move** — NEW and useful. Persona: *"concrete, I can do this today."* The ccstatusline / "`/context` is oldskool" aside is the one wobble — feels like an opinion drop mid-flow, and the maintainer block itself flags a technical REVISE on a `/context` UI-location claim. Persona doesn't stumble hard, just a flicker of *"is this load-bearing or trivia?"* **Mood 7** — facilitator-premium: a trainer saying "you don't need this, but if you like a clean status line, ccstatusline" recovers it to 8+; on the page alone it reads as a tangent.

**Hands-off FAQ ("what if I'm not there to compact?")** — Strong. Anticipates the exact question the persona was forming after the 60%-manual move (*"but the re-send runs while I'm away"*). The two options use descriptive paraphrases ("a working document the agent owns," "a reference it diffs against," "an automated check") — persona feels the shape of the fix without being handed the names. **Mood 9** — this is the contrast engine working.

**Phases 1–4 + "Open your repo"** — Clear handoff. Quote-don't-generalise is a good forcing instruction. **Mood 9.**

Opener close score: **9.** Leaves the persona feeling *"I can feel what packaging would add now"* — the mood contract. No correction-feeling (the un-packaged run is framed as data, not failure) and no compliance-feeling (no three-pattern handed over to adopt).

---

## PART 3 — Cross-file alignment audit

### (a) Contradictions — CLEAN

Three failure-mode definitions are consistent across files:
- Goal drift: pre-read "solving an adjacent problem with confidence" / opener "solved an adjacent problem with confidence." Same.
- Context rot: pre-read "rehashes approaches it already ruled out two hours ago" / opener "rehashed approaches it ruled out an hour ago." Timeframe shifts two hours → an hour, but both are illustrative ("around hour one to two" in the pre-read), not a stated fact. Not a contradiction; not worth a fix.
- Plausible-but-wrong: pre-read "look reasonable in isolation... don't match the original spec" / opener "look reasonable in isolation, don't match the spec." Same.

test→learn→encode arc: only the opener states it; the pre-read doesn't contradict it. The diagnostic stance is consistent (pre-read plants the question, opener names the stance). Clean.

### (b) Vocabulary drift — CLEAN, one micro-note

- "failure modes" (pre-read) vs "lenses" (opener) — the opener bridges this itself: "Three lenses... The pre-read introduced these." Persona maps them without stumbling. Not drift.
- "the artefact" used identically in both. Good.
- Micro-note (not blocking): pre-read frames the bring-list as "the three failure modes above as your reading lens"; opener calls them "lenses." Because the opener explicitly names the handoff, this reads as intentional, not drift.

### (c) Deliberate-deferral check — ONE FINDING (against the brief), files internally consistent

- **Three-pattern (reference artifact / plan.md / verifier):** NEITHER file names these. The opener's FAQ uses paraphrases only. Withhold intact. Clean.
- **Ronacher attribution:** The brief states the opener should withhold the Ronacher *attribution*, deferring it to the closer — and the opener indeed never mentions Ronacher. **BUT the pre-read names him outright:** "Armin Ronacher ran a port between two languages in roughly ten hours of agent time, two and a bit million tokens." 

  This is consistent with the pre-read's own maintainer intent (its block lists Ronacher as the deliberate anchor and the opener's block cedes the *names* of the three-pattern to the closer, not the Ronacher name). So this is NOT a front-run leak inside the opener, and the two files are internally aligned. It IS a divergence from this sim's brief, which asserted the opener "is supposed to withhold... the Ronacher attribution, deferring [it] to the M5 closer." Flagging for the author to reconcile: if the design is "Ronacher named in pre-read, fix-pattern names withheld to closer," the brief's phrasing is what's stale, not the files. If the design truly wants Ronacher held to the closer, the pre-read front-runs it. **Author call — the files don't break either way.**

---

## Mood summary

| Beat | File | Score |
|---|---|---|
| Driving question | pre-read | 9 |
| Three failure modes | pre-read | 9 |
| Ronacher anchor | pre-read | 8 |
| What to bring | pre-read | 9 |
| Opening | opener | 9 |
| Diagnose first / fix later | opener | 9 |
| test→learn→encode | opener | 9 |
| Three lenses restated | opener | 8 |
| `/compact` 60% + ccstatusline aside | opener | **7** |
| Hands-off FAQ | opener | 9 |
| Phases + "open your repo" | opener | 9 |
| Pre-read close | | 9 |
| Opener close | | 9 |

Only beat below 8: the **ccstatusline / "`/context` is oldskool" aside** (7). What steals it: reads as an opinion-drop tangent on the page, and its underlying `/context` UI claim already carries a technical-REVISE in the maintainer block. What takes it to 8+: a trainer framing it as optional ("nice-to-have, not load-bearing") — facilitator-premium, present in-room, absent on the page.

---

## Does the dual-mode work?

Yes — it reinforces. The pre-read deliberately *under-delivers* (a question + three names + a dangled anchor), so the opener has real new territory: the stance, the arc, the operational move, the hands-off FAQ. The single repeated element (three lenses) is pre-disclosed as a re-mount. The persona arrives in the room with the question loaded and gets the *answer to why it was a question* — that's the click that earns the M5 mood contract. No mood-stealing redundancy.
