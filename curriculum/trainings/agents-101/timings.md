# Agents 101 — slot caps and rhythm

Machine-read by `scripts/calculate-time.js`. This file holds only what nothing can derive: the slot each module is sold into, and the day's rhythm constants. Every duration inside a module comes from the leaf that owns it (`**Time:**` on the exercise or lecture file) plus that module's `- **Transitions:**` line. Nothing here restates a beat.

## Rhythm

- **Break:** 15

## Caps

| Module | sitting-1h45 |
|---|---|
| getting-going |  |
| building-agent-systems |  |
| multi-agent-systems |  |
| security | 105 |
| output-quality |  |
| evaluations |  |
| personal-to-team |  |
| agents-building-agents |  |

<!-- maintainer -->

**Cap provenance.** One cell is filled because exactly one is attested. `security.md`'s own maintainer block has said "Fits 1h45 with tight transitions" since before this file existed, and the computed runtime now lands at 105 — the note and the arithmetic agree, which is the only reason to trust either.

The other seven are deliberately blank, and blank means NO CAP rather than a guess. Nothing in `training-architecture.md`, `trainer-guide.md`, or any module block states a slot length for them; a made-up 105 across the board would have produced seven FITS/OVER verdicts carrying no information, and the one that would have read OVER (`building-agent-systems`, 123) would have been an artifact of the invention rather than a finding. Fill a cell when a cohort actually sells that module into a slot.

**What the computed totals say today**, for whoever fills them: getting-going 81 · building-agent-systems 123 · multi-agent-systems 94 · security 105 · output-quality 98 · evaluations 84 · personal-to-team 90 · agents-building-agents 98. The outlier is building-agent-systems, and it is real rather than a rounding artifact: it carries `personal-agent-homework` at 35 in-room minutes on top of a full memory build. If that setup is meant to happen between sittings the way the module-N-prework pages do, charge it 0 and the module lands at 88 with the rest.

**Rhythm is one line because one line is what is known.** AE101 carries day-start and lunch constants because it is sold as a two-day cohort; A101 runs as separate sittings and has no authored day shape. Nothing in the script reads `rhythm` back today, so an invented day start would be decoration that later reads as fact.
