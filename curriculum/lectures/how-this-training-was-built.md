# How this training was built

## You just ran the same loop
<!--tier:2-->

The way this training was built is the shape you just ran on your own repo. Claude's first read was partly wrong. You found the useful wrongness, corrected it, and wrote what the session taught you into `./CLAUDE.local.md` for the next session.

Kieran Klaassen calls this **compound engineering**: work produces evidence; evidence improves the system that does the next work.

## What compounds
<!--tier:2-->

Klaassen's definition: each unit of engineering work should make subsequent units easier, not harder. What that looks like, in his words:

- Features teach the system new capabilities instead of adding fragility.
- Bug fixes eliminate entire categories of future bugs.
- Patterns, once codified, become tools for future work.
- Over time the codebase becomes easier to understand, modify, and trust.

Nothing on that list is a rules file. The file you wrote today is the smallest unit that qualifies: a pattern, codified, that the next session reads. A test that proves the bug is the same move in a different file. So is a doc that stops lying.

The loop is the shape. The bug today was the excuse.

<!-- maintainer -->

**Standing constraints:**
- **Two slides (Antti-called cut, 2026-08-25): the build-story slides are gone — do not restore them.** The bulletpoint origin, the rule-count snapshot, the judge/simulation/tmux testing-stack tour and the Antti narrator lede were the cut; the recognition beat and the definitional slide are the lecture. With the story gone the file is no longer a first-hand account, so no creator-name exception applies and no pre-cohort count re-run is owed. Candidate relocation of the two survivors into another lecture is open (maintainer question, not yet decided).
- **Zero map references and no cross-module sequencing.** M1 is map-protected, and the module file's `## Next` carries the bridge.
- **Narrative slides stay prose paragraphs.** The only bold student-side handle is **compound engineering**.
- **`## What compounds` is the definitional slide (Antti-directed 2026-08-23).** Opens Klaassen's four bullets after the attribution line and before the closer. Exists because the term was coined at Ex4 as *write the rules file* and the wide definition arrived only as a one-liner here; the slide says the file is an instance, not the class. The one bulleted slide in a prose lecture, accepted: a quoted definition is a list. Keep the closer line last.
- **Klaassen is named twice on the student surface across M1, and both are on this page.** The same-loop slide connects the student's work to the name; the definitional slide attributes the quoted definition. `compound-and-close` prints the loop but names the practice rather than the person, so it carries neither of the two. Two is the cap; a third M1 mention breaches it.

**Quality:** sim-passed 2026-08-23 (writing@a1ddfae2 story@a1ddfae2 technical@a1ddfae2 behavior@1480362 pedagogy@a1ddfae2 strategy@1480362 slides@a1ddfae2)
- judges @a1ddfae2: writing PASS, story PASS (verify-refuted), technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Meta (trainer):**
- **Primary Bloom's level:** Understand — recognise the compound loop in the training's construction after running it.
- **Time:** 2 min closer inside M1's 2h slot.
- **Arc position:** closes M1, after `compound-and-close` and before the Bridge to M2. The exercises did the teaching; this lecture names the pattern.

**Themes planted** (content-strategy § “Recurring themes”):
- **Theme 2 (compounding builds the system)** — the student's own rules file named as the smallest compounding unit.
- **Theme 3 (mirror)** — Claude's partly wrong read gives the student something useful to correct.

**Register check:**
- No em-dashes (`check_student_facing.md §14`).
- No banned words (`check_writing.md`).

<!-- backing -->

Format → `curriculum/backing-format.md`.

**Claims**
- `built-by-the-same-loop` · detail · "The way this training was built is the shape you just ran on your own repo." ← training-construction
- `claude-local-md-carries-session-learning` · detail · "wrote what the session taught you into `./CLAUDE.local.md` for the next session" ← claude-local-md-autoload
- `klaassen-names-it` · borrowed · “Kieran Klaassen calls this **compound engineering**” ← klaassen-definitive-guide
- `compound-work-improves-next-work` · borrowed · “work produces evidence; evidence improves the system that does the next work” ← klaassen-definitive-guide
- `claudes-first-read-partly-wrong` · vision · “Claude's first read was partly wrong.” ← none-owed — design-stance about the just-run exercise, not a measured claim: the orient read always leaves a skipped slice, and the introspection prior (“about 10% … made up”, hedged there) makes findable wrongness the expected case. “Partly” carries the same hedge; do not strengthen to a rate.
- `klaassen-definition-bullets` · borrowed · "each unit of engineering work should make subsequent units easier, not harder" ← klaassen-definitive-guide — close paraphrase of the source's core-philosophy paragraph and its four bullets, verified live 2026-08-23; wording registered in `vocabulary.md` § compound engineering
- `rules-file-is-an-instance` · vision · "The file you wrote today is the smallest unit that qualifies" ← none-owed
- `loop-is-the-shape` · vision · “The loop is the shape. The bug today was the excuse.” ← none-owed

**Sources**
- training-construction `[checked:2026-08-05 result:ATTESTED due:none]` attested:Antti 2026-04→2026-08 building-AE101 — [maintainer-attested] The training was built by the correct-and-compound loop the student just ran: prototype failures became reusable rules, and the rules were corrected through use. fallback: none needed; this is the author's own account.
- claude-local-md-autoload `[checked:2026-07-30 result:CAVEAT due:cohort]` https://code.claude.com/docs/en/memory.md — [capability] `CLAUDE.local.md` is a first-class personal project instruction file loaded in later sessions. The M1 prompt adds it to `.gitignore`; Claude Code does not do that automatically. fallback: if auto-load changes, rewrite the final slide's mechanism.
- klaassen-definitive-guide `[checked:2026-08-23 result:OK due:2027-02-23]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Kieran Klaassen, Feb 9 2026. First-person account and sole byline. The core mechanism is that each unit of engineering work makes subsequent units easier. fallback: keep the loop description and drop the attribution if the name changes.

**Frameworks**
- Compound engineering · [borrow:practitioner-coined] · law:the-compound-ladder · ← klaassen-definitive-guide
- Double-loop learning · [borrow:Argyris & Schön] · law:double-loop-learning · ← cultural-vocab. The rules themselves are corrected; Argyris is not named on the student surface.

**Stance** `[stance:2026-08-05 level:L2]`
- holds: the same-loop claim is the author's first-hand account; Klaassen independently names the compounding mechanism, and his definition is quoted close.
- contested: nothing material in the two slides.
- would-move-it: Klaassen revising the definition, or the compound-engineering coinage being superseded in the field.

**OODA**
- question: does the compound-engineering attribution and quoted definition still match Klaassen's current writing?
- roster: Klaassen's current writing; `vocabulary.md` § compound engineering.
- last-run: 2026-08-05

<!-- /backing -->
