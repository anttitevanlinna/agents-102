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

**The staleness scanner routed a §52c fix away from the class that owns §52c.** `scan-stale-classes.js` tagged only `**Time` in the lead-in trio, so editing `**What you do:` / `**What you build:` / `**The point:` / `**What happened:` staled writing, story and slides, and left the pinned pedagogy verdict standing over the prose the pedagogy rule had just moved. Fixed 2026-09-08, test first — the fixture pins all five slots plus the bulleted `- **Time:**` lecture form, and pins that ordinary phase prose stays off pedagogy. The class that owns a rule now re-judges its own fix, which is the whole point of per-class routing.

**And it did the same to source stamps.** A `[checked:…]` stamp lives only in the backing block, which the scanner classes as maintainer region and returns early on — so the routing table's own `[checked: → technical` line was dead code, and editing a stamp's result, due date or URL staled nothing while the pinned technical verdict stood. Fixed 2026-09-08, test first, matching the stamp shape rather than a bare URL so that maintainer prose quoting a link does not bill a re-judge for bookkeeping.

**Both bugs are one bug.** The scanner's job is to notice when a class's own surface moved, and in both cases it was blind to the surface the class exists to check — pedagogy's lead-in trio, technical's source stamps. A staleness scanner that under-reports does not look broken; it looks like a corpus that is up to date. **When a fix here lands, re-read the routing table against the judge rubrics rather than against the diff** — the question is which surface each class owns, and whether an edit there wakes it.

The sharpest instance of the same shape sat in `judges/prompt-behavior.md`, and it is closed. TODO fired on any risk at `confidence: low` while `confidence: low` was also the marker a judge set when it APPLIED a carve-out, so a ruling and owed work wore one label. The `carve_out` marker fixed the ambiguity before this session and was then used 9 times against 75 opportunities, which is what an optional guard always measures — it is now required, and `check-instance-schema.js` counts the unmarked. The label itself is gone: TODO is retired from judge output (2026-09-08), and what used to land there is either a PASS or a row in `suggestions[]`.

## Applied

44 of the 45 landed 2026-09-05, each anchor re-validated after the wave-E stamp and each read in place before the edit. Two sibling judges had filed the identical `pedagogy §47` row against `fix-tests-first.md`; it applies once.

One was held back and is now settled. `klaassen-definitive-guide` on `push-back-on-the-plan.md` was ruled a theory-construct `due:none`; the corpus carried both that and a lapsed publication-anchored `due`, so applying the edit to one file alone would have relocated the contradiction rather than closing it. Antti ruled it 2026-09-05: `due:none` in every body, no expiration date. The ruling is canon at `source-freshness-format.md` § Theory-construct variant, which names the URL, and every stamp on it now agrees.

## The card queue

Antti takes cards **one at a time, highest value first**. Value here means what a room feels: a prompt that misbehaves during the exercise, then a projected header, then a self-contradiction on adjacent slides, then body-prose nits. Ties break toward CUTS — additions and synonym swaps near-auto-reject.

Per-card state lives in the JSON on a `card` object (`outcome`: applied · declined, plus the reason). Cards without one have not been presented.

**Open the card with what the beat is FOR.** Two of the first four were declined because the fix matched the rule's words and missed the sentence's job, and a third needed Antti's own wording. State in one line what the student is doing at that moment and what it builds toward; if that line will not come, the card is not ready. → `compounded/2026-09-05-student_facing-ask-what-the-beat-is-for-before-proposing-wording.md`

**Presented and awaiting a call (2026-09-06):** `compound-and-close.md:7`, `pedagogy §52c`. Current *"a rules file written from session evidence"* → *"a rules file that improves your next session on this repo."* The current tail repeats the What-you-do line above it word for word; the replacement is the file's own maintainer summary. Longer than the line as it stands, shorter than what shipped that morning. **This defect is mine** — an earlier card cut the slot down to a bare artifact name, and the §52c amendment later that day made bare artifact names fail.

**Ruled since the queue opened**, each leaving a durable artefact so the finding stops recurring:

| Card | Call | What it left |
|---|---|---|
| `ae101-m5-rerun-packaged` §43 streaming | declined | `check_prompts §43` UNATTENDED BY DESIGN carve-out |
| `where-the-rule-could-live:9` §8 agency | declined | `vocabulary.md` gained the `judge` row |
| `earn-the-trust:109` §20 count | applied | one cut cleared §20 and the `## Next` cap together |
| `orient-and-introspect:31` §17 header | applied | §17 narrowed to the product name |
| `what-keeps-a-long-running-session-going:37` §9 tell | declined | §9 carve-out: a direct *"you do it"* is acceptable |
| `close-the-ticket:48` §9 actor | declined | same carve-out, plus *the fix is never more words* |
| `set-the-markers-send-it-off:38` §33 | declined | §33 carve-out: a forward reference that motivates the step in hand |
| `close-the-ticket:54` §33 | closed by that carve-out | reversible on request |
| `threat-model-with-stride:37` §27 | applied | three sentences to one; *assess*, not *judge* |
| `compound-and-close:5,7` §52c | applied | both trailing duplicates cut |
| `extract-the-task-shaping-rule:7` §52c | applied | §52c amended: the slot names what the artifact ENABLES |
| `story-of-module-6:29` §15 header | applied | the law slide states its claim; the close line keeps *Taste closes the gap* |
| `agents-that-build-agents:16` §21b noun-run | applied | Antti's noun: *one session at a time* |
| `agents-that-build-agents:7` §27b | declined | keep-note: the border is stated on purpose |
| `composing-the-workflow:10` §27a | declined | keep-note: the sentence says which way is up |
| `composing-the-workflow:33` §27a | declined | keep-note: the tool-independent line outlives the primitive names |
| `story-of-module-6:55` §27d | applied | the close ends on the sim catch, then *Your turn* |
| `story-of-module-6:23` research §1 | applied | Antti's wording: *a keen reader* |
| `walk-and-send-off-2:26` §40 carry-clause | declined | `§40b` carve-out: THE FENCE HAS TWO READERS — run the deletion test twice |
| `extract-the-task-shaping-rule-1` §36 | applied | one blank line before the stop-and-wait; 92 words either side |
| M3 invocation seam, three surfaces | applied | M3 stopped promising a feature-scoped invoke it never performs |
| `learn-from-the-test:31` §1 | applied | *Resume it if it's not still open*; the no-rescue call scoped to `## Start here` |
| `the-whole-map:12` + `the-far-half:12` | applied | `judges` cut from both maps; registry embargo swept, one call |
| `walk-and-send-off-3` §33 | declined | `§33` dosage test, and the **suppression rung** below |
| `earn-the-trust:49` §38 | suppressed | `§38b` carve-out: a pre-paste guard is adjacent by necessity |
| `when-a-plan-is-good-1` §17 | suppressed | §17 retired to advisory everywhere; five plan-mode prompts are not a backlog |
| `getting-going` §4 `## Next` | suppressed | `§4` carve-out: a templated header is not the file's to answer for |
| `compound-and-close-1` §40 labels | suppressed | closed by the same day's `§40b` two-readers carve-out |
| the §2a dangling-colon sweep | applied ×4 | nine AE101 fences end in a colon; five were already right |
| `fix-tests-first:7` §52c | declined | `§52c`: the enablement test never buys abstraction |
| `set-the-markers-send-it-off:11` §52c | withdrawn | same ruling, caught before it cost a decision |
| `push-back-on-the-plan:7` §52c | applied | *a sharpened plan file, ready to generate from* — the artifact, not a third telling of the two reads |
| `compound-and-close:7` §52c | applied | the View summary's own answer, shortened; *from session evidence* was said three times in eleven lines |
| `threat-model-with-stride:9` §52c | applied as a cut | the sweep's premise was wrong — a *decision* is not a bare artifact noun; §52c carved out |
| `author-test-strategy-skill:9` §52c | applied | the opener was the closer minus its parenthetical; a SKILL.md does owe the *for what* |
| `the-gate-is-a-claim:15` §2a | applied | *In 2024, on one product's judge* — Antti vetoed *engagement*, and *test / simulation / case* with it |
| `fork-the-worktree:22` §15 | applied | three readings, not two — the audit's own fix picked a third; landed *the worktree's copies* |
| `getting-going:24-26` §9 | applied | de-bold ×3; §9's own named open case, settled by the sibling slide that carries none |

**A third rung, 2026-09-08: one card = one edit.** Presenting the four §2a lead-ins as a single card was rejected — *"wrongly shown. One card at time with proper card each."* The one exception is edits that are INSEPARABLE: one claim stated on several surfaces, where fixing one alone leaves the corpus contradicting itself, which is why the M3 invocation seam was accepted as a three-surface card the same week. Test: can each edit stand alone without leaving a contradiction? Yes → one card each, in sequence, each with its own full BEFORE / AFTER / WHY / RISK. **And show enough context to judge the beat** — the whole slide in both states, not the changed line alone (Antti, same day: *"Show the whole lead in both before and after including previous paragraph(s)"*). Two cards had to be re-shown for want of it.

**Two rungs landed 2026-09-08 and both cut work off this queue.**

1. **An addition earns its words on dose, not on mechanism.** A correctly-fired rule whose only cure is an addition owes a dose check before it becomes a card: what fraction of the room takes the triggering path, and is the harm recoverable? Flagging the word count on the card was the old rung, it was followed, and it still cost a round trip. **Suppress instead** — write the accept-note, amend the rule, report both as landed. An addition reaches Antti only where the triggering path is the DEFAULT path, or the failure is silent and unrecoverable in its own beat. → `compounded/2026-09-08-pedagogy-an-addition-earns-its-words-on-dose-not-on-mechanism.md`
2. **Test a behaviour-premised rule before carding the edit it demands.** §17 survived a September 3 narrowing on the belief that plan mode still preambles. Four live `claude -p --permission-mode plan` runs, three on the fence itself and one plan-requesting, put substance in the first clause every time. The rule retired instead of five prompts getting carded. Caveat is in the rule body: `-p` is not interactive, so `tmux-runner` gets the final word.

**The §52c sweep of the sixteen AE101 lead-ins is now IN the ledger** (`gate_triage.batch = wyb-52c-2026-09-06`), persisted 2026-09-08 from a session scratchpad that would not have survived. Eight want a rewrite, seven stand, a skeptic overturned three proposed rewrites. Two are suppressed with their reasons recorded on the row — `spot-gaps-build-the-loop` grows the line, `diagnose-and-resend` proposes *"in minutes, not hours"*, a quantified claim with no source. `read-your-stack` STANDS. **The batch is closed. Nothing in `wyb-52c-2026-09-06` is open.**

**Its hit rate is the finding, and the sweep's own wording survived twice.** Of the eight rows marked for rewrite: two landed close to as proposed, two were declined or withdrawn on tangibility, two were suppressed at persistence, and two were applied **against the sweep's stated reason**. Those last two are the instructive pair. `threat-model-with-stride` was filed for a missing enablement clause and never owed one — a *hardening decision* is not a bare artifact noun — so it took a cut instead, and §52c now carves out the judgment-noun case. `author-test-strategy-skill` did owe the clause, a SKILL.md being a container, but the sweep's cure traded `SKILL.md` for *"a skill"*, which the tangibility boundary bans; its real defect was that line 9 was the `What happened:` closer minus its parenthetical, so the exercise opened and closed on one sentence.

**Read together: the sweep found the right lines and gave the wrong reason on a quarter of them.** A file-by-file rewrite from its `after` field would have shipped one abstraction and one addition nobody owed. The rows were worth persisting; the proposed wording was worth re-deriving.

**The queue is ordered but the ladder is flat.** Every open card was value-ranked 1–5 for what a room feels; none reached 4, and the `room_cost` field says *nothing visible* or *almost nothing visible* on most of them. Regenerate the distribution rather than trusting a number written here:

```
node -e 'const d=require("./curriculum/evals/todo-triage.ae101.json");const r=Array.isArray(d)?d:Object.values(d).find(Array.isArray);const o=r.filter(x=>(x.disposition||"").toUpperCase()==="CARD"&&!(x.card&&x.card.outcome));const b={};o.forEach(x=>{const v=(x.gate_triage||x.survivor_disposition||{}).value_rank||"?";b[v]=(b[v]||0)+1});console.log(o.length,b)'
```

One-at-a-time is the right protocol against a gradient. Where the ladder is flat it is pure overhead, and the recommendation on record is: rule individually on the rank-3 cards, then take the rest as one batch.

**The cut-sweep batch is a batch by construction.** Every row whose `gate_triage.batch` is `cut-sweep-2026-09-06` is a sentence-level `check_writing §27` cut on a lecture slide that survived a counterweight refuter (`curriculum/evals/cut-sweep.ae101.md` § *Open*), plus two factual flags from the same readers. Each carries the beat it sits in, the earlier line that already says it, and its anchor cost. AFTER is shorter than BEFORE on all of them. Take the high-confidence, no-anchor-cost rows as one call, then the rows that cost a claim (each names the backing row that moves with it), then the judgement calls. List them with:

```
node -e 'const r=require("./curriculum/evals/todo-triage.ae101.json").filter(x=>(x.gate_triage||{}).batch==="cut-sweep-2026-09-06"&&!(x.card&&x.card.outcome));for(const x of r)console.log(x.confidence,"|",x.target_file.split("/").pop(),"|",x.before.slice(0,90),"|",x.risk.slice(0,60))'
```

**A gate-discharge pass was run and returned nothing.** Every open card was re-tested against the narrower question *has Antti already made this call* — the §17 narrowing, the §43 carve-out, the vocabulary-registry sweep — with a skeptic per proposed discharge arguing the gate still applies. No card discharged. The standing exemptions are narrower than they look from a rule's headline, and a finding that merely touches §17 or §43 is not covered by what he ruled on a different shape.

## The verdict vocabulary changed, and half the queue went with it

`TODO` is retired from judge output (Antti 2026-09-08). `verdict` answers one question — is anything owed — so it carries two live values, PASS and REVISE, plus `N/A`. **`suggestions[]` is a separate channel riding alongside, not a third status**: a PASS may carry suggestions, a REVISE may carry them, most rows carry none, and silence on one is a complete answer. A suggestion states `rule`, `line`, `now`, `proposed`, or it is not emitted — if you cannot write the replacement you have a feeling, not a suggestion. TODO and WATCH stay canonical in `pre-cohort-todos.md`, where a human records follow-up rather than a judge deferring a decision.

**Naming trap worth not repeating.** In the seven rule-row classes the old `todos_count` always meant *REVISE with `blocking: false`* — the open card queue, not optional advice. It is `nonblocking_findings_count`. Renaming it `suggestions_count` would have made the entire backlog disappear by vocabulary; only the behavior class genuinely counts suggestions.

**What this retired.** `check_writing.md` §27 says in its own body that it is *"not a REVISE on its own"* and *"the default move, not the law"*, and had collected 34 REVISE rows across 13 files — half the queue, built from a rule read to its prohibition and not to its end. Those closed without anyone reading a sentence of prose. `check-advisory-verdicts.js` now exits 1 on any REVISE citing a rule whose body calls itself advisory, so the class cannot regenerate. **Antti's bar on §27, recorded because it is not derivable from the rule:** not even a suggestion worth reading unless three things say the same, and not automatically then — he declined the first sampled triple because its middle sentence was the bridge.

**Migration state.** 818 instances migrated; legacy `todos[]` moved to `notes[]` whole, since a suggestion owes a replacement and no legacy row carried one. Rubrics, `check-instance-schema.js`, `stamp-from-reeval.js`, `judge-bench.js`, the three workflow dispatch schemas and 63 `Quality:` lines all speak the new vocabulary. ae101's schema gate exits 0; the other two trainings carry 14 pre-existing count mismatches, down from 25. → `compounded/2026-09-08-platform-a-schema-outranks-a-rulebook.md`

## The finish line, and why the ledger is not it

A todo is a row a judge wrote. **Fixing the prose does not remove the row** — only a re-judge does, and a re-judge of a changed body is owed anyway. So the ledger cannot be driven to zero by editing; it drains in one direction only, and the order is fixed:

1. **Antti rules the open cards.** Everything else waits on this, because a judge fired before a body settles pins a sha that is stale on arrival.
2. **Apply, and adjudicate what was declined.** A declined finding leaves for good only when the reason is written where the next judge reads it — the file's maintainer block, or the rule itself. An argument in a chat window is not a disposition.
3. **Re-judge every owing pair.** `npm run board -- --training ae101` names them; `Workflow({scriptPath: '.claude/workflows/eval-sweep.js', args: {items}})` fires them. Do not hand-write dispatch.
4. **Regenerate the sim traces the board reports as body-moved or unanchored**, before any behavior or story re-fire reuses them.
5. **Stamp** with `stamp-from-reeval.js`, then confirm `--gate` exits 0.

The reachable end state is not an empty ledger. It is: no blocking findings, gates green, and every open row either adjudicated where a judge will read it or sitting on a card in front of Antti. That state is stable. Zero rows is not — a clean judging round still deposits notes, because a todo is by definition a finding the judge chose not to gate on.

## Three sessions on one tree

The lane split with `m6-clear`, agreed 2026-09-06: **this session owns `[mod]` and `[exr]`; they own `[lec]`, `[sup]`, `[ref]` and the three cross-module sets.** A third agent is cleaning M1 and is not reachable from either session.

The collision that matters is not the instance files — judges write their own class and read the body, so two classes on one file are safe. **It is the `Quality:` line**, which one orchestrator stamps and the other overwrites. Whoever holds a file's stamp holds the file.

Held across the boundary right now:

- **`the-context-ceiling` is not released.** Its behavior judge died on a session limit, so the instance still carries a pre-rubric verdict. `m6-clear` is holding six maintainer edits and one body swap on it until the re-fire lands.
- **Four behavior judges owe a re-fire** — `prework`, `earn-the-trust`, `learn-from-the-test`, `the-context-ceiling`. All four died on the same limit and keep their old verdicts.
- **The three cross-module sets are held** by `m6-clear` until this session's module lane stops moving, so they do not re-drift. Their rows land on module Quality lines, which is why they wait.

A stamp re-points every sibling instance's `body_sha` by one line. That is the machinery, not a judge: a Quality line is not body prose, and without the re-point every class on a stamped file reads stale.

**`m6-clear` was `/clear`ed on 2026-09-08 and holds no coordination state beyond what it is told.** Both holds above were re-sent to it, with the five commits this lane landed that day so its staleness scan is not blind. Treat that session as amnesiac across a clear: re-send the lane split and the holds rather than assuming they carried. It confirmed the `judges` cut is at HEAD in its tree with no sweep owed on its side.

## Open

- **One anchor resolves nowhere** — `cross_module §2` against `earn-the-trust.md`, proposing a homework-placement string present in neither the module file nor the strategy doc. Re-derive at apply time or drop the row.
- **The cards.** Listed in the JSON with BEFORE / AFTER / WHY / RISK, each carrying a `gate_triage` or `survivor_disposition` block with its value rank and room cost. None sits on a supplementary or reference page — those are standing-exempt and were applied — so every card is on a module, an exercise, a lecture, or a prompt body a student copies.
- **The findings that came back from REFUTE have been dispositioned.** Those on a non-gated surface landed at `95aa7f57`; those whose named prose was already gone, or already adjudicated in the file's own maintainer block, closed as stale; the rest joined the card queue. The pattern in the stale ones is worth keeping: a finding is not refuted by argument, it is closed by a note written where the next judge reads it.
- **The peer session's M6 closing round deposited fresh non-blocking notes**, its student-facing ones owed to Antti as cards. They are not in this ledger — it was built before that round — so the card queue and the board's queue must both be read to see the whole of it.
- **`compound-and-close` owes two things, to be taken together:** a behavior judge, because `compound-and-close-1` took an Antti-approved copy-edit (`fc8cd9eb`, *"flag it in the summary below"* → *"flag it in your summary"*), and its open `check_prompts §43` row. That row survives the UNATTENDED carve-out — the run is attended, the student is sitting there reviewing — but it was **downgraded from rank 3 to rank 1 on 2026-09-08**. Its room-cost note quotes the body as *"say `continue`"*; the body actually says *"interrupt with `Esc`, **narrow to the orient and introspect phases first**, and say `continue`."* With the narrowing restored, the restart it calls harm is the recovery working as designed. What survives is §43's fence-tail half, worth about seventeen added words on an already four-paragraph fence, for a run the body itself treats as normally under two minutes.
- **The behavior class's TODO rubric is fixed** (`fb797e3b`). `:89` told the judge to record an applied carve-out at `confidence: low` and `:125` minted a TODO for any low-confidence risk, so deciding a risk was harmless is what filed it as owed work. A `carve_out` marker now separates a ruling from a weak signal, and the verdict rule reads it. **The recorded rows do not move on their own** — every behavior verdict on the board was taken under the old rule, so the class owes a re-fire before the ledger reflects the fix. Do not hand-edit the recorded verdicts to drain them; that closes rows nobody decided to close.
- **A TODO now owes a `fix_hint` naming the edit**, guarded by `TODO_WITHOUT_FIX` in `check-instance-schema.js`, reported as debt. It fires on nothing today. Note for anyone re-checking this: the hint lives on the **risk**, not on the finding — a check written against the finding flags every todo in the class and means nothing by any of them.
- **The Amp card**, `diagnose-and-resend.md:119` — drop *"Amp's manual-handoff camp"*, keep Ralph's. `what-packaging-is.md:130`'s source stamp records Amp killing the feature 2026-05-06 (*"So handoff is out. Compaction is in."*) with both Amp citations scoped "never current". Open since before the card queue started.
- **`skills-from-the-frontier.md:112`** trips the writing-class lint on every edit to that file: a `[found:2026-08-02 resolved]` marker in the research-log block. The block uses `[found:…]` as its own convention, so this is a question about whether a resolved entry is deleted or kept, not a stray marker to sweep.
