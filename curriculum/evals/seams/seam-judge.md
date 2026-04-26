# Seam Judge — Template

**Catches:** arc-level breaks between adjacent modules. Does Mn's close state (artifacts, mood, vocabulary introduced) match what Mn+1 opens assuming? Per CLAUDE.md content-strategy: mood handoff, state compound, vocabulary continuity.

**Per-seam instance:** fill this template for one seam (e.g., M1→M2), save to `seams/instances/m1-to-m2.md`. Re-run when either module (or their inlined files) changes.

## How to use

1. Copy this file to `seams/instances/m<n>-to-m<n+1>.md`.
2. Fill the bracketed slots with the two modules' specific expected handoff.
3. Run the Judge prompt at the bottom.
4. Fix anything flagged. Re-run until clean.

## Seam spec (fill per instance)

**Seam:** M<n> → M<n+1>
**Files on the left (Mn close state):**
- [module file path]
- [inlined exercise / lecture paths]

**Files on the right (Mn+1 open state):**
- [module file path]
- [inlined exercise / lecture paths]

**Mood handoff:**
- Mn deliberate mood (from `bosser-strategy:content-strategy.md`): [paste]
- Mn+1 deliberate mood (from `bosser-strategy:content-strategy.md`): [paste]
- The right transition: [one sentence]

**Artifact handoff:**
- What Mn's Debrief / Bridge produces that Mn+1 expects: [list named files, shapes, concepts]
- Mn+1 assumes the student has: [list]

**Vocabulary handoff:**
- Terms Mn introduces that Mn+1 uses without re-definition: [list]
- Frameworks Mn riffs on that Mn+1 extends: [list]

## Judge prompt (fill targets, then run)

```
You are running the seam judge for Agents 102 Bootstrap M<n> → M<n+1>.

READ:
LEFT (Mn close state):
- [files]

RIGHT (Mn+1 open state):
- [files]

SEAM SPEC:
[paste the filled spec above into the prompt]

Report on:

=== MOOD HANDOFF ===
Does Mn end in its deliberate mood? Quote closing passage as evidence. Score 1-10.
Does Mn+1 open assuming the Mn mood? Quote opening passage. Does the transition feel earned, or does Mn+1 reset / contradict the mood?
Failure modes to specifically check:
- Premature resolution (Mn resolves a mood it was meant to sustain)
- Unearned rescue (Mn+1 relieves a mood that hadn't stewed)
- Mood contradiction (Mn+1 opens in a completely different emotional register without bridging)

=== ARTIFACT HANDOFF ===
For each artifact Mn is supposed to produce (see spec), does Mn actually produce it at its stated path / shape?
For each artifact Mn+1 opens assuming exists, is it on disk after Mn closes?
Flag:
- Files named by Mn+1 but never written by Mn
- Shapes / conventions Mn+1 assumes but Mn doesn't enforce
- Re-introductions: Mn+1 creating what Mn already created (compound failure)

=== VOCABULARY HANDOFF ===
Does Mn+1 use any term assuming it was introduced? Verify the introduction actually happened in Mn (or earlier).
Flag:
- Terms used unexplained (vocabulary leak)
- Terms re-introduced in Mn+1 when Mn already introduced them (redundancy)

=== FRAMING CONTINUITY ===
Does Mn's Bridge sentence cleanly set up Mn+1's opening?
Does Mn+1's Connections pick up where Mn left off?

=== OUTPUT ===
- Mood: PASS / FRAY / BREAK + evidence
- Artifact: PASS / FRAY / BREAK + list of issues
- Vocabulary: PASS / FRAY / BREAK + list
- Framing: PASS / FRAY / BREAK + evidence
- Overall verdict: ARC HOLDS AT THIS SEAM / FRAYS / BREAKS
- Top 3 specific edits to make, grouped by file

Quote passages. Do not generalize.
```

## Seams to maintain

| Seam | Status | Last run |
|------|--------|----------|
| prework → M1 | (stub) | — |
| M1 → M2 | (stub) | — |
| M2 → M3 | (stub) | — |
| M3 → M4 | (stub) | — |
| M4 → M5 | (stub) | — |
| M5 → M6 | (stub) | — |
| M6 → M7 | (stub) | — |
| M7 → M8 | (stub) | — |
