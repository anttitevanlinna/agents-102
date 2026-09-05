# Judge dispatch preamble — appended to EVERY class judge, every dispatch

**This file is the contract. It is canonical, and it is the only copy.**

These clauses were first written in `.claude/skills/eval-fire/SKILL.md` Step 4
and lived in both places under a keep-in-sync note. Two copies of a contract is
one contract and one rumour: the workflow path grew a §Mechanics the skill path
never heard of, so the same file judged by the same class got a different
protocol depending on which door the dispatch came through. Both dispatchers now
emit a short parameter header — file, class, slug, pin — and point here. Edit
this file; edit nothing downstream.

Each clause records an incident that produced a wrong verdict; none is advisory.

**Judges: read this file in full and obey every clause below, alongside your
class template.**

---

**Judges read the full `memory/check_*.md` (T3). Never the `_index/` files.** The index carries rule leads only, for the generator writing prose; it deliberately drops the carve-outs, the boundary clauses and the precedents. A verdict taken against a lead is a verdict taken against the half of the rule that states the prohibition, with the half that states the exception missing — which is precisely the failure the clause below is written to prevent. If a rule number in your verdict does not resolve in the compendium, say so in `notes`; do not resolve it from the index.

Before marking any rule REVISE, state in the `evidence` field, in one line, WHAT HARM that rule exists to prevent and whether that harm is actually present here. A rule firing is not the harm arriving: rules encode cheap proxies (a count, a string, a location) for expensive concerns (credential-collecting, dialect-smuggling, body clutter), and a proxy matches on shape while the harm lives in purpose. Read the whole rule including any boundary or exception clause before scoring — exceptions are often stated after the prohibition, and a judge that pattern-matches the ban will stop early. If the harm is absent, or if the obvious fix would degrade the artefact (falsify a verbatim quote, delete a rescue the student needs, break a deliberate repetition), do NOT file a REVISE: report it as a rule question for the maintainer, and say what the rule would have to say to be right. Check the file's maintainer block for an existing accept-note on the passage before flagging it at all.

If your evidence names a script, command, or exit code, you must have RUN it in this session. Paste the exact command and its real output or exit status into the `evidence` field. Never write that a checker "confirms" something, or report an exit code, from inference about what the checker probably does. If you did not run it, say what you observed directly and say the mechanical claim is unverified.

**A PASS owes evidence too — this is the half the rules above did not cover, and it failed on 2026-08-15.** One writing sweep returned 702 rule verdicts across 13 files, all PASS, all `evidence: null`, in 7 tool calls; the summary table was indistinguishable from a real clean sweep. So: a mechanically-checkable rule marked PASS carries the command result in `evidence` (`grep -c '—' → 0 in body`); a judgement rule marked PASS quotes the line that comes CLOSEST to violating it, with line number, and says why it stays inside; a rule that does not apply to this file is `N/A` with a one-clause reason. **Nothing is PASS by default.** Validate your own greps against a planted test string before trusting a zero. **Orchestrator side:** before believing any sweep, run `node curriculum/evals/scripts/check-instance-evidence.js <instance>...` over what it wrote, and compare tool-call count to file count — a skim is visible in both numbers and in neither summary. The raw `grep -c '"evidence": *null'` this clause used to name stopped meaning what it was written to mean: under the mechanics below an N/A row carries null evidence BY DESIGN, so the count now mixes the healthy population with the sick one and one judge honestly reported 67. The script counts only what was ever ungrounded — a finding with no quote or harm, a REVISE with no evidence, a judgement PASS with no evidence, an N/A with no reason at all — and exits 1.

Evaluate ONLY the compendiums your template puts in scope. Reaching into a sibling class's rules feels thorough and is the opposite: a verdict outside your lane is not extra coverage, it is an unowned claim that outranks nothing and can contradict something. If you notice a problem belonging to another class, put it in `notes`, never in `rules_evaluated`.

---

## Two more requirements Step 4 states outside a blockquote

**Record `body_sha`.** Every judge records `body_sha` at the top level of its instance JSON — `shasum -a 256 <file>` on the raw source, taken when it starts reading. A verdict is a claim about the body the judge READ; in a multi-session repo the file moves under running judges, and a verdict stamped at current HEAD then describes text that no longer exists. `update-quality.sh` REFUSES to stamp when a recorded `body_sha` doesn't match the file.

**Read the expanded view — when there is something to expand.** `node scripts/expand-md.js <file_path>` resolves `{{prompt:<key>}}` and `{{figure:<key>}}` markers into the shape the judges' regex / line-count logic was written for. Run it only when the body view's `signals` report `has_prompt_blocks` or `has_figures`; on a file with neither, expanding produces the source back and costs a read. `{{file_path}}` stays the raw source path — only the read view shifts. Line numbers you cite must be verified against the raw source, per your template's evidence check.

**Write the instance.** `curriculum/evals/instances/<training>--<surface-type>--<file-slug>.<class>.json`, overwriting any existing file for that (file, class). `<surface-type>` is derived from the parent directory — `curriculum/trainings/<t>/` → `module`, `curriculum/exercises/` → `exercise`, `curriculum/lectures/` → `lecture`, `.../supplementary/` → `supplementary`, `.../reference/` → `reference` — never from the basename, so a module and an exercise sharing a slug never collide.

**How a `rules_evaluated` row cites its rule — the four things the auditor now checks.** `scripts/audit-eval-coverage.js` decides which compendium rules actually got a verdict, and it keys on `(compendium, rule_index)`. A row it cannot key credits nothing, and the rule you really judged reads as an uncovered hole in the coverage report.

1. **`compendium` is a real `check_*.md` filename, with the suffix.** `"check_writing.md"`, never `"check_writing"`, never `"story.md owns"`, `"judge-owned"`, `"judges/story.md"`, `"MOOD_ARC"` or any other invented home.
2. **`rule_index` is the rule's number as the compendium writes it.** Bare integer (`17`), sub-lettered (`"9b"`), or sub-pointed (`6.2`) — all three are read as citations of the same parent rule. Never `0`, never a negative, never a word (`"scope"`, `"trigger"`, `"all"`, `"pre-1"`, `"n/a"`).
3. **`rule_lead` quotes the rule's bolded lead VERBATIM.** The lead is the rule's identity and the auditor uses it to catch a drifted number — but only when it matches. Paraphrasing or truncating the lead disarms that check. Appending a parenthetical of your own is fine; rewriting the sentence is not.
4. **One row per rule.** Two rows on the same `(compendium, rule_index)` means two judgements collapsed onto one key: the second credits no rule of its own, and the rule it should have carried reads as a hole. If you are judging a sub-rule, cite the sub-rule (`"4b"`), do not stack four rows on `4`.

**A judgement with no numbered rule behind it — say so in the row.** Whole-compendium scope calls (*"check_workshop does not apply: no beat's output belongs to the group"*), mood and Big-Idea criteria your template owns, any check that is yours rather than a compendium's: emit `"rule_index": null, "judge_owned": true` alongside the real `compendium` (or your template's name). Such a row credits no rule, warns about nothing, and stays on the record with its evidence. What it must never do is borrow a rule number to sit on — `rule_index: 0`, `"scope"`, or a nearby integer buries a real rule under your note. A null index WITHOUT `judge_owned: true` is a judge that never said what it judged, and the auditor flags it.

**`rules_evaluated` is an array of OBJECTS.** A row returned as a string (`"check_writing.md § 1"`, `"1. Banned words — grep zero-tolerance."`) has no field the coverage model can read: the whole instance credits nothing, silently. If you cannot produce the object shape, say so in `notes` rather than degrading the row — a visible gap beats an invisible zero.

**A cached trace is a claim about a body that may no longer exist.** Before carrying ANY quote forward from a sim-trace, a prior instance, or a recorded `chunk_map`, grep it against the live file. A `content_sha` that does not match the current body means REGENERATE, not proceed — judging on against a stale trace launders invented text into evidence. On 2026-08-19 six cached artefacts were caught asserting text no file contained: two misquoted a practitioner, one presented a paraphrase as verbatim, one named `##` headers that had been renamed, one quoted a sentence deleted three commits earlier, and one claimed an entire `##` section that no longer exists. Every one was caught only because the judge re-read the body. A finding whose evidence traces to a cache and not to the file is not a finding.

---

## Mechanics — how to fetch, in what order, and what not to re-derive

These are not a relaxation of anything above. They change how a judge FETCHES; they never change what it is accountable for. Measured serially on a planted-defect fixture: 398s / 66 rows before, 196s / 21 rows after, both scoring full recall on mechanical AND judgement defects.

**Issue the template read, the rulebook and the body view in ONE turn.** They have no dependency on each other. Three sequential round-trips for three independent reads is the single largest avoidable cost in a judge run.

**1. Your geometry is already computed. Do not re-derive it.**

```
node curriculum/evals/scripts/derive-body-view.js <file>
```

Cached by source sha, named by slug, written to `curriculum/evals/body-views/<slug>.view.json`. It carries:

- `maintainer_cut`, `fence_ranges`, `body_regions` — 1-indexed against the RAW source, which is what a citation means.
- `projections.body_numbered` — the body at its raw line numbers, fences and maintainer tail removed. **Grep that file.** A hit is in-region by construction, so the "verify the cited line is inside the body region" step your template describes is structural here rather than performed.
- `greps` — the mechanical patterns, each with a `planted_proof`. `status: CLEAN` means the pattern was proven against a planted violation and then returned zero on this body: a real zero, citable. `UNPROVEN` decides nothing — check it yourself.
- `accept_notes` — every dated line in the maintainer block, extracted.
- `rule_inventory` — numbered-rule count per compendium, moved-stubs excluded. Use it for the completeness count instead of counting by hand.
- `signals` — structural facts (`has_prompt_blocks`, `has_urls`, `group_beat_markers`, …). A rule that can only fire on a shape this file does not have is N/A, and the signal is the reason.

Do not write your own body projection and do not plant your own test string. Both are done above, and the unnamespaced scratch files judges used to write collided across concurrent files on 2026-08-25.

**2. Your rulebook is assembled for you — rules verbatim, not summarised.**

```
node curriculum/evals/scripts/derive-class-brief.js <file> <class>
```

Every in-scope rule at its full T3 wording, every carve-out, every boundary clause — minus the rules the prefill already resolved. Nothing is condensed: rule text is 92.8% of a compendium's bytes, so a "digest" that keeps the wording IS the compendium, and one that does not is the T1-vs-T3 failure this preamble opens by forbidding. If the brief cannot build, read the compendiums in full and say so in `notes`.

Paths inside rule text are repo-root relative. `scripts/check-slide-size.js` is `<repo>/scripts/check-slide-size.js`, not a file under `curriculum/evals/scripts/`; two story judges in a row reported it missing after looking only there and hand-counted instead.

**3. Rows that turn on SHAPE rather than prose are resolved before you start.**

```
node curriculum/evals/scripts/prefill-instance.js <file> <class> --write    # before you judge
node curriculum/evals/scripts/prefill-instance.js <file> <class> --merge    # after you write your instance
```

`--write` parks the resolved rows — N/A rows carried from a prior instance whose shape hash proves the structural inventory is unchanged, plus mechanical PASSes from proven greps — in a sidecar. It does NOT touch your instance: the prior instance is a real verdict until you replace it, and a judge that dies mid-run must not leave a stub where a verdict used to be.

`--merge` splices any parked row you did not write into the instance after you write it. A row you wrote yourself always wins — you read the body, the sidecar read a hash.

**Running `--merge` is not optional when the brief dropped rules.** The brief drops exactly the rules the sidecar holds; skip the merge and the ledger loses them, which is a coverage hole that reads as a clean run. Record `shape_hash` at the top level of your instance exactly as the prefill reports it, or the next run carries nothing and pays this cost again.

If the prefill reports `no prior instance`, `shape changed` or `predates shape_hash`, nothing was parked and every row is yours. That is the fail-closed path, not an error.

**4. Verdict discipline under a prefilled ledger.** The ledger stays complete — one row per numbered rule, a missing `rule_index` is an unproven coverage hole. What is scoped is the PROSE, not the reading:

- A rule the prefill resolved is in the sidecar, and it is absent from your brief. **A rule that is not in your brief gets no row from you.** Leave it, do not re-derive it, do not rewrite its evidence. This is the one instruction here a judge can disobey without anything looking wrong afterwards — the merged ledger is identical either way, and only the clock knows.
- A rule you mark **N/A** carries `evidence: null` and a `na_reason` of at most one clause, ideally naming the signal (`"no prompt blocks"`). Not a paragraph.
- A rule you mark **PASS on a mechanical check** cites the view's grep result — the pattern and its count — and nothing more.
- A rule you mark **PASS on judgement** still quotes the line closest to violating it, with line number, and says why it stays inside. This is where the class earns its keep and it is not abbreviated.
- A **finding** carries full evidence, always. Nothing here relaxes that.
- Non-blocking observations go in `todos` and the verdict is `PASS_WITH_TODOS`. Do not report REVISE to make an observation visible: REVISE means a gate, and a TODO escalated to a gate costs a maintainer decision that was never owed.

Reading is unchanged and total. Do not skim the compendium because your output is shorter.
