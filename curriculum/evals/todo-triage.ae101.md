# AE101 todo triage — every open eval todo, with a disposition

Standing report, overwritten on rerun. Companion ledger: `todo-triage.ae101.json`, one object per todo, carrying the exact strings an apply pass needs. Triaged 2026-09-05 by a 10-agent read-only fan-out (Workflow `wf_8034abe9-a0d`), one agent per disjoint file group, each reading the rule body at T2 (`rule.js <surface> <N>`) before ruling.

## The ledger has three shapes, and one of them was invisible

A todo is a finding a judge chose not to gate on. AE101 records them three ways:

| Shape | Where | Count |
|---|---|---|
| Rule row, `verdict: REVISE` + `blocking: false` | `rules_evaluated[]` | 155 |
| Older thin list | `todos[]` | 31, on 18 instances whose rule array holds none |
| Prompt finding, `verdict: TODO` | `prompts_findings[]` | 50, the whole behavior class |

**206 open todos, not the 156 the tooling reported.** `derivedTodos` knew only the first shape, so all 106 behavior instances read as *"declares N todo(s) and records none"* while recording every one. The mapping was never ambiguous: across those 106, `count(REVISE)` equals the declared blocking count on all 106 and `count(TODO)` equals `todos_count` on 103. `COUNT_WITHOUT_LIST` falls 20 to 1 with the third ledger counted (`d438afaa`).

## Dispositions

165 rulings over the 155 rule-row todos (agents found 10 the census missed).

| Disposition | N | Gate |
|---|---|---|
| REFUTE | 48 | Accept-note into the maintainer block. **Verified: only 8 survive.** |
| MAINTAINER | 45 | Maintainer block, source stamp, Quality line, or a mechanical body swap. |
| STALE | 28 | The named prose is already gone. Nothing to apply; clears when the class is re-judged. |
| EXEMPT_BODY | 10 | Supplementary or reference body, standing-exempt from the gate. Lands directly. |
| CARD | 34 | Student-facing body on a module, exercise or lecture, carrying a call Antti has not made. |

Anchor validation before any apply: 55 proposed `old_string` edits, 50 unique in their target file, 4 unique in the strategy doc (`strategy_tie_in §8` binds the doc, and those four name the curriculum file as target because that is the file that was judged), 1 resolving nowhere.

## The refutations do not survive contact with a skeptic

Eight adversarial agents re-read the rule bodies and the files, each told to argue the original judge was right (`wf_2c49bbbf-588`). Of 48 refutations:

| | N |
|---|---|
| FINDING_SURVIVES — the refutation rests on a claim that does not check out | 26 |
| ACCEPT_NOTE_OVERREACHES — refutation sound, note drafted broader than what it adjudicates | 14 |
| REFUTE_STANDS | 8 |

**One in six.** The failures are not close calls: refutations cited carve-outs from the wrong clause of a rule, attributed reasoning to sibling instances that say something else, and in one case argued a stamp could never be re-verified while a sibling file carried that same source re-verified a week earlier. The verifiers checked the citations; the triage agents had not.

The cause is in the triage prompt, which told each agent that REFUTE was the most valuable answer it could give. A judge asked to find over-firing finds over-firing. Any rerun of this pass must state the asymmetry instead: a mistaken direct edit is visible and revertable, a mistaken accept-note is a rule switched off with nobody watching.

Every ruling carries its `verification` block in the JSON. Apply only the 8, and the 14 with the narrowed `note_fix`; the 26 return to the ledger as real work needing a MAINTAINER or CARD disposition.

## Where the direct edits actually land

The 55 `old_string` edits, classified by the surface each anchor sits on rather than by what the agent called it:

| Surface | N | Gate |
|---|---|---|
| maintainer block | 30 | lands directly |
| supplementary / reference page | 10 | standing §26 exemption, lands directly |
| student-facing body | 8 | card unless genuinely mechanical |
| prompt registry body | 2 | card-shaped, and `check_prompts §22` gates the commit besides |
| anchor not found in that file | 5 | 4 belong to the strategy doc, 1 nowhere |

Of the 8 body edits, 4 are `student_facing §21` vocabulary swaps whose direction the rule's own contextual split already fixes (autonomous work takes *the agent*) and 1 is a `§13` layer locator (`CLAUDE.md` to `./CLAUDE.md`). Those 5 are the sweep the vocabulary registry mandates, not a wording call. The other 3 are synonym choices and a cut, and belong in the card queue.

## Why re-judging never drains this

Wave E re-judged 22 of the 98 todo-carrying instances. All 22 came back carrying todos. A finding leaves for good on one of two events: the prose changes, or the adjudication is written where the next judge reads it. That second path is why REFUTE owes an accept-note and not an argument in a chat window.

The sharpest instance of the same shape sits in `judges/prompt-behavior.md:125`: **TODO** fires on any risk at `confidence: low`, *regardless* — and `:89` makes `confidence: low` the marker a judge uses when it applies a carve-out. So an applied carve-out is filed under the same label as owed work. 41 of the behavior class's 54 TODO findings fire only low-confidence risks; 32 say in their own `fix_hint` that no edit is warranted. Reserving TODO for `confidence: med` and recording low-confidence risks as PASS-with-carve-out drops 41 rows without touching a word of curriculum. Maintainer call, open.

## Applied

44 of the 45 landed 2026-09-05, each anchor re-validated after the wave-E stamp and each read in place before the edit. Two sibling judges had filed the identical `pedagogy §47` row against `fix-tests-first.md`; it applies once.

One was held back and is now settled. `klaassen-definitive-guide` on `push-back-on-the-plan.md` was ruled a theory-construct `due:none`; the corpus carried both that and a lapsed publication-anchored `due`, so applying the edit to one file alone would have relocated the contradiction rather than closing it. Antti ruled it 2026-09-05: `due:none` in every body, no expiration date. The ruling is canon at `source-freshness-format.md` § Theory-construct variant, which names the URL, and every stamp on it now agrees.

## The card queue

Antti takes cards **one at a time, highest value first**. Value here means what a room feels: a prompt that misbehaves during the exercise, then a projected header, then a self-contradiction on adjacent slides, then body-prose nits. Ties break toward CUTS — additions and synonym swaps near-auto-reject.

Per-card state lives in the JSON on a `card` object (`outcome`: applied · declined, plus the reason). Cards without one have not been presented.

**Open the card with what the beat is FOR.** Two of the first four were declined because the fix matched the rule's words and missed the sentence's job, and a third needed Antti's own wording. State in one line what the student is doing at that moment and what it builds toward; if that line will not come, the card is not ready. → `compounded/2026-09-05-student_facing-ask-what-the-beat-is-for-before-proposing-wording.md`

Settled so far, each leaving a durable artefact behind it:

| Card | Call | What it left |
|---|---|---|
| `ae101-m5-rerun-packaged` §43 streaming | declined | `check_prompts §43` UNATTENDED BY DESIGN carve-out |
| `where-the-rule-could-live:9` §8 agency | declined | `vocabulary.md` gained the `judge` row, embargoed before the M5 closer |
| `earn-the-trust:109` §20 count | applied | cut cleared §20 and the `## Next` sentence cap together |
| `orient-and-introspect:31` §17 header | applied | §17 narrowed to the product name; every AE101 header swept |

Next up, unpresented: `close-the-ticket.md:54` (`student_facing §33`, *"The next exercise sweeps this whole session."* — cartography, pure cut).

**Standing question, unanswered:** batch the remaining pure-cut `§33` cartography cards into one card, since they are the same call, or keep one at a time?

## Open

- **One anchor resolves nowhere** — `cross_module §2` against `earn-the-trust.md`, proposing a homework-placement string present in neither the module file nor the strategy doc. Re-derive at apply time or drop the row.
- **The behavior class's 50 todos are untriaged.** The fan-out read rule rows only. Their disposition depends on the `:125` call above, so triaging them first would be work done against a rule that may move.
- **The cards**, plus three promoted from the direct-edit pile (two prompt-registry paragraph splits, one mixed cut). Listed in the JSON with BEFORE / AFTER / WHY / RISK. None sits on a supplementary or reference page — those are standing-exempt and were applied, so every card is on a module, an exercise, a lecture, or a prompt body a student copies.
- **26 findings returned from REFUTE** need a disposition that is not an accept-note.
- **`compound-and-close` owes two things, to be taken together:** a behavior judge, because `compound-and-close-1` took an Antti-approved copy-edit (`fc8cd9eb`, *"flag it in the summary below"* → *"flag it in your summary"*), and its open `check_prompts §43` row, which **survives** the new carve-out — that run is attended, the student is sitting there reviewing, so §43 fires legitimately.
- **The behavior class's TODO rubric** (`judges/prompt-behavior.md:125`) mints a TODO for every low-confidence risk, and `:89` makes low confidence the marker for an *applied carve-out*, so most behavior todos record that a judge considered something and dismissed it. Reserving TODO for med-confidence would drop them without touching curriculum. Maintainer call, open.
- **The Amp card**, `diagnose-and-resend.md:119` — drop *"Amp's manual-handoff camp"*, keep Ralph's. `what-packaging-is.md:130`'s source stamp records Amp killing the feature 2026-05-06 (*"So handoff is out. Compaction is in."*) with both Amp citations scoped "never current". Open since before the card queue started.
- **`skills-from-the-frontier.md:112`** trips the writing-class lint on every edit to that file: a `[found:2026-08-02 resolved]` marker in the research-log block. The block uses `[found:…]` as its own convention, so this is a question about whether a resolved entry is deleted or kept, not a stray marker to sweep.
