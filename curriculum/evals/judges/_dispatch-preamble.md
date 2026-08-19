# Judge dispatch preamble — appended to EVERY class judge, every dispatch

Extracted verbatim from `.claude/skills/eval-fire/SKILL.md` Step 4, which is
where these clauses were written and where they still belong as procedure. They
live here as well so a dispatch prompt can cite one path instead of re-inlining
2 KB of contract into every one of N judge prompts — a sweep of 70 pairs was
what made the re-inlining cost obvious. Each clause records an incident that
produced a wrong verdict; none is advisory.

**Judges: read this file in full and obey every clause below, alongside your
class template.** Orchestrators: keep this file and SKILL.md Step 4 in sync —
edit Step 4 first, then re-extract.

---

Before marking any rule REVISE, state in the `evidence` field, in one line, WHAT HARM that rule exists to prevent and whether that harm is actually present here. A rule firing is not the harm arriving: rules encode cheap proxies (a count, a string, a location) for expensive concerns (credential-collecting, dialect-smuggling, body clutter), and a proxy matches on shape while the harm lives in purpose. Read the whole rule including any boundary or exception clause before scoring — exceptions are often stated after the prohibition, and a judge that pattern-matches the ban will stop early. If the harm is absent, or if the obvious fix would degrade the artefact (falsify a verbatim quote, delete a rescue the student needs, break a deliberate repetition), do NOT file a REVISE: report it as a rule question for the maintainer, and say what the rule would have to say to be right. Check the file's maintainer block for an existing accept-note on the passage before flagging it at all.

If your evidence names a script, command, or exit code, you must have RUN it in this session. Paste the exact command and its real output or exit status into the `evidence` field. Never write that a checker "confirms" something, or report an exit code, from inference about what the checker probably does. If you did not run it, say what you observed directly and say the mechanical claim is unverified.

**A PASS owes evidence too — this is the half the rules above did not cover, and it failed on 2026-08-15.** One writing sweep returned 702 rule verdicts across 13 files, all PASS, all `evidence: null`, in 7 tool calls; the summary table was indistinguishable from a real clean sweep. So: a mechanically-checkable rule marked PASS carries the command result in `evidence` (`grep -c '—' → 0 in body`); a judgement rule marked PASS quotes the line that comes CLOSEST to violating it, with line number, and says why it stays inside; a rule that does not apply to this file is `N/A` with a one-clause reason. **Nothing is PASS by default.** Validate your own greps against a planted test string before trusting a zero. **Orchestrator side:** before believing any sweep, run `grep -c '"evidence": *null'` over the instances it wrote and compare tool-call count to file count — a skim is visible in both numbers and in neither summary.

Evaluate ONLY the compendiums your template puts in scope. Reaching into a sibling class's rules feels thorough and is the opposite: a verdict outside your lane is not extra coverage, it is an unowned claim that outranks nothing and can contradict something. If you notice a problem belonging to another class, put it in `notes`, never in `rules_evaluated`.

---

## Two more requirements Step 4 states outside a blockquote

**Record `body_sha`.** Every judge records `body_sha` at the top level of its instance JSON — `shasum -a 256 <file>` on the raw source, taken when it starts reading. A verdict is a claim about the body the judge READ; in a multi-session repo the file moves under running judges, and a verdict stamped at current HEAD then describes text that no longer exists. `update-quality.sh` REFUSES to stamp when a recorded `body_sha` doesn't match the file.

**Read the expanded view.** Run `node scripts/expand-md.js <file_path>` before scanning, so `{{prompt:<key>}}` and `{{figure:<key>}}` markers resolve into the shape the judges' regex / line-count logic was written for. `{{file_path}}` stays the raw source path — only the read view shifts. Line numbers you cite must be verified against the raw source, per your template's evidence check.

**Write the instance.** `curriculum/evals/instances/<training>--<surface-type>--<file-slug>.<class>.json`, overwriting any existing file for that (file, class). `<surface-type>` is derived from the parent directory — `curriculum/trainings/<t>/` → `module`, `curriculum/exercises/` → `exercise`, `curriculum/lectures/` → `lecture`, `.../supplementary/` → `supplementary`, `.../reference/` → `reference` — never from the basename, so a module and an exercise sharing a slug never collide.

**How a `rules_evaluated` row cites its rule — the four things the auditor now checks.** `scripts/audit-eval-coverage.js` decides which compendium rules actually got a verdict, and it keys on `(compendium, rule_index)`. A row it cannot key credits nothing, and the rule you really judged reads as an uncovered hole in the coverage report.

1. **`compendium` is a real `check_*.md` filename, with the suffix.** `"check_writing.md"`, never `"check_writing"`, never `"story.md owns"`, `"judge-owned"`, `"judges/story.md"`, `"MOOD_ARC"` or any other invented home.
2. **`rule_index` is the rule's number as the compendium writes it.** Bare integer (`17`), sub-lettered (`"9b"`), or sub-pointed (`6.2`) — all three are read as citations of the same parent rule. Never `0`, never a negative, never a word (`"scope"`, `"trigger"`, `"all"`, `"pre-1"`, `"n/a"`).
3. **`rule_lead` quotes the rule's bolded lead VERBATIM.** The lead is the rule's identity and the auditor uses it to catch a drifted number — but only when it matches. Paraphrasing or truncating the lead disarms that check. Appending a parenthetical of your own is fine; rewriting the sentence is not.
4. **One row per rule.** Two rows on the same `(compendium, rule_index)` means two judgements collapsed onto one key: the second credits no rule of its own, and the rule it should have carried reads as a hole. If you are judging a sub-rule, cite the sub-rule (`"4b"`), do not stack four rows on `4`.

**A judgement with no numbered rule behind it — say so in the row.** Whole-compendium scope calls (*"check_workshop does not apply: no beat's output belongs to the group"*), mood and Big-Idea criteria your template owns, any check that is yours rather than a compendium's: emit `"rule_index": null, "judge_owned": true` alongside the real `compendium` (or your template's name). Such a row credits no rule, warns about nothing, and stays on the record with its evidence. What it must never do is borrow a rule number to sit on — `rule_index: 0`, `"scope"`, or a nearby integer buries a real rule under your note. A null index WITHOUT `judge_owned: true` is a judge that never said what it judged, and the auditor flags it.

**`rules_evaluated` is an array of OBJECTS.** A row returned as a string (`"check_writing.md § 1"`, `"1. Banned words — grep zero-tolerance."`) has no field the coverage model can read: the whole instance credits nothing, silently. If you cannot produce the object shape, say so in `notes` rather than degrading the row — a visible gap beats an invisible zero.
