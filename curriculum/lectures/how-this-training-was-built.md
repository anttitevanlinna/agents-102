# How this training was built

What follows is Antti's story of building this training, in his own words.

## Everything starts as a few bulletpoints somewhere

At first, this training was a strategy document: seven headings and thirty bulletpoints. It looked complete in the way a good list can look complete. Then the bulletpoints became module prototypes, and the gaps became visible.

The failures were specific. A phrase brought consultancy voice into an engineering lecture. An exercise asked an experienced engineer to perform a scripted reaction. A module tried to feel tidy where the student should have felt uncertainty. Each correction became a reusable rule. One now says *“Forcing functions stay, scripted reactions go.”* Another requires every Claude Code capability claim to be checked before each cohort.

The rules were corrected too. Some were too broad. Some fired in the wrong place. Each time a rule failed, the failure sharpened the rule instead of disappearing into one edit.

The system behind this training currently has 302 active rules and subrules across 12 checklists, written over 1,447 commits. Neither count is a claim that more rules make better work. They show how much specific judgment had to be written down, and how many passes it took, to reach control over the training's style.

## Then we tested the training

Rules shape a draft, but they still leak. Major changes therefore go through automated quality judges, each reading through a focused lens: writing, story, technical accuracy, agent behavior, pedagogy, strategy, cross-module fit, and slide design.

Simulated engineers read the result as a competent builder, a skeptical senior, and a fast operator. A separate simulation asks what the LLM is likely to do when each prompt is pasted. Those reads catch ambiguity, condescension, weak handoffs, and prompts whose wording invites the wrong behavior.

Then a tmux runner drives real Claude Code sessions through Modules 1–6 against working codebases. It catches a different class of failure: a session that stalls, an artifact that never lands, or a handoff that breaks the next module.

None of these checks replaces another, as they catch differing failure modes. You build similar scaffolding for your own repo throughout the training. The rules file you just wrote is the first piece.

## You just ran the same loop

This build story is the shape you just ran on your own repo. Claude's first read was partly wrong. You found the useful wrongness, corrected it, and wrote what the session taught you into `./CLAUDE.local.md` for the next session.

Kieran Klaassen calls this **compound engineering**: work produces evidence; evidence improves the system that does the next work.

## What compounds

Klaassen's definition: each unit of engineering work should make subsequent units easier, not harder. What that looks like, in his words:

- Features teach the system new capabilities instead of adding fragility.
- Bug fixes eliminate entire categories of future bugs.
- Patterns, once codified, become tools for future work.
- Over time the codebase becomes easier to understand, modify, and trust.

Nothing on that list is a rules file. The file you wrote today is the smallest unit that qualifies: a pattern, codified, that the next session reads. A test that proves the bug is the same move in a different file. So is a doc that stops lying.

The loop is the shape. The bug today was the excuse.

<!-- maintainer -->

**Standing constraints:**
- **The opening narrator-frame line names Antti — deliberate rule-6 exception (maintainer call 2026-08-01).** The lecture is a first-hand account; the frame line converts a non-author trainer from witness to narrator. The creator-name lint will flag it; do not strip.
- **Zero map references and no cross-module sequencing.** M1 is map-protected, and the module file's `## Next` carries the bridge.
- **Narrative slides stay prose paragraphs.** The only bold student-side handle is **compound engineering**.
- **`## What compounds` is the definitional slide (Antti-directed 2026-08-23).** Opens Klaassen's four bullets after the attribution line and before the closer. Exists because the term was coined at Ex4 as *write the rules file* and the wide definition arrived only as a one-liner here; the slide says the file is an instance, not the class. The one bulleted slide in a prose lecture, accepted: a quoted definition is a list. Keep the closer line last.
- **“Automated quality judges” is deliberate M1 language.** It describes the testing machinery without pre-planting the M6 word *eval*.
- **The rule and commit counts are repository snapshots.** Before a cohort, re-run `find <canonical-memory-dir> -maxdepth 1 -type f -name 'check_*.md' | wc -l`, `rg --no-filename '^[0-9]+[a-z]?\.[[:space:]]+\*\*' <canonical-memory-dir>/check_*.md | wc -l`, and `git rev-list --count HEAD`; update both body and backing if the results are no longer 12 / 302 / 1,447. The active-rule regex deliberately excludes italic “Moved to…” redirects. The commit count is this repo's whole history, curriculum and research and tooling alike, and the body claims only that it took that many passes, never that each one touched a module.
- **The tmux claim is bounded.** The runner has driven real Claude Code sessions through M1–M6 on working codebases. The full M1–M6 wrapper is documented on Lemmings; later-module variants exist for Codesearch and Picoshare. Do not turn this into “three codebases passed end to end.”
- **Klaassen is named twice on the student surface across M1, and both are on this page.** Line 29 connects the student's work to the name; the definitional slide attributes the quoted definition. `compound-and-close` prints the loop but names the practice rather than the person, so it carries neither of the two. Two is the cap; a third M1 mention breaches it.
- **The quoted forcing-function rule is a specimen, not introduced vocabulary.** It is verbatim `check_pedagogy.md §16` and makes the correction-to-rule move concrete.
- **File is size-gate exempt** (story lecture).

**Quality:** sim-passed 2026-08-23 (writing@a1ddfae2 story@a1ddfae2 technical@a1ddfae2 behavior@1480362 pedagogy@a1ddfae2 strategy@1480362 slides@a1ddfae2)
- judges @a1ddfae2: writing PASS, story PASS (verify-refuted), technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Meta (trainer):**
- **Primary Bloom's level:** Understand — recognise the compound loop in the training's construction after running it.
- **Time:** 4 min closer inside M1's 2h slot.
- **Arc position:** closes M1, after `compound-and-close` and before the Bridge to M2. The exercises did the teaching; this lecture names the pattern and shows the testing stack behind the material.

**Themes planted** (content-strategy § “Recurring themes”):
- **Theme 2 (compounding builds the system)** — specific corrections become reusable rules and checks.
- **Theme 3 (mirror)** — Claude's partly wrong read gives the student something useful to correct.
- **Theme 4 (self-aware, grain of salt)** — the rules themselves improve through use.

**Watch-fors:**
- **The middle slide turns into a tooling inventory.** Each mechanism earns one sentence by naming the different failure it catches.
- **The story reads as achievement theatre.** Keep the emphasis on corrections and test layers, not scale or speed.
- **The rule count reads as a quality score.** The following sentence must keep explaining what the count does and does not show.

**Register check:**
- No em-dashes (`check_student_facing.md §14`).
- No banned words (`check_writing.md`).
- Engineer-audience terms (`tmux`, automated quality judges, prompt behavior) are used only where their mechanics add value.

<!-- backing -->

Format → `curriculum/backing-format.md`.

**Claims**
- `training-began-as-bulletpoints` · detail · “At first, this training was a strategy document: seven headings and thirty bulletpoints” ← training-construction
- `prototype-failures-were-specific` · detail · "The failures were specific." ← training-construction
- `corrections-became-rules` · detail · “Each correction became a reusable rule” ← compendium-rules
- `rules-were-corrected` · detail · “The rules were corrected too” ← training-construction
- `rule-compendium-snapshot` · detail · “302 active rules and subrules across 12 checklists, written over 1,447 commits” ← compendium-snapshot
- `rules-leak` · detail · “Rules shape a draft, but they still leak” ← training-construction
- `automated-quality-judges` · detail · "Major changes therefore go through automated quality judges, each reading through a focused lens" ← quality-judges
- `persona-simulation` · detail · "Simulated engineers read the result as a competent builder, a skeptical senior, and a fast operator." ← simulation-stack
- `prompt-behavior-simulation` · detail · “what the LLM is likely to do when each prompt is pasted” ← simulation-stack
- `tmux-system-test` · detail · “a tmux runner drives real Claude Code sessions through Modules 1–6 against working codebases” ← tmux-runner
- `claude-local-md-carries-session-learning` · detail · "wrote what the session taught you into `./CLAUDE.local.md` for the next session" ← claude-local-md-autoload
- `klaassen-names-it` · borrowed · “Kieran Klaassen calls this **compound engineering**” ← klaassen-definitive-guide
- `compound-work-improves-next-work` · borrowed · “work produces evidence; evidence improves the system that does the next work” ← klaassen-definitive-guide
- `claudes-first-read-partly-wrong` · vision · “Claude's first read was partly wrong.” ← none-owed — design-stance about the just-run exercise, not a measured claim: the orient read always leaves a skipped slice, and the introspection prior (“about 10% … made up”, hedged there) makes findable wrongness the expected case. “Partly” carries the same hedge; do not strengthen to a rate.
- `klaassen-definition-bullets` · borrowed · "each unit of engineering work should make subsequent units easier, not harder" ← klaassen-definitive-guide — close paraphrase of the source's core-philosophy paragraph and its four bullets, verified live 2026-08-23; wording registered in `vocabulary.md` § compound engineering
- `rules-file-is-an-instance` · vision · "The file you wrote today is the smallest unit that qualifies" ← none-owed
- `loop-is-the-shape` · vision · “The loop is the shape. The bug today was the excuse.” ← none-owed

**Sources**
- training-construction `[checked:2026-08-05 result:ATTESTED due:none]` attested:Antti 2026-04→2026-08 building-AE101 — [maintainer-attested] First-hand account of the bulletpoint origin, the prototype failures, the rules being corrected, and loaded rules still leaking. fallback: none needed; this is the author's build story.
- compendium-rules `[checked:2026-08-05 result:OK due:cohort]` `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/check_*.md` — [maintainer-attested] The forcing-function sentence is verbatim `check_pedagogy.md §16`; the Claude Code capability requirement resolves to `check_research_claims.md §11a`. fallback: replace either example with a current rule and update the body.
- compendium-snapshot `[checked:2026-08-18 result:OK due:cohort]` `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/check_*.md` — [maintainer-attested] `find ... -name 'check_*.md' | wc -l` returned 12; `rg --no-filename '^[0-9]+[a-z]?\.[[:space:]]+\*\*' .../check_*.md | wc -l` returned 302; `git rev-list --count HEAD` returned 1447. A broader numbered-entry count returns 309 because it includes seven italic “Moved to…” redirects; those are not active rules. fallback: re-run and replace all three numbers.
- quality-judges `[checked:2026-08-05 result:OK due:cohort]` `.claude/skills/eval-fire/SKILL.md`, `curriculum/evals/judges/` — [maintainer-attested] The class table defines writing, story, technical, behavior, pedagogy, strategy, cross-module, and slides as separate focused reads. fallback: name only the classes still exposed by the current eval machinery.
- simulation-stack `[checked:2026-08-05 result:OK due:cohort]` `curriculum/evals/simulation.md`, `curriculum/evals/simulation-behavior.md` — [maintainer-attested] Class A defines the three engineer-reader perspectives; Class B separately reasons over likely prompt behavior. fallback: describe only the currently configured simulation classes.
- tmux-runner `[checked:2026-08-05 result:OK due:cohort]` `curriculum/evals/mechanical/tmux-runner/README.md`, `curriculum/evals/mechanical/tmux-runner/lemmings-chain-runbook.md` — [maintainer-attested] The runner preserves the real Claude Code TTY surface. The Lemmings M1–M6 chain was validated through the wrapper; Codesearch and Picoshare carry later-module variants. fallback: narrow the body to the latest live-validated span.
- claude-local-md-autoload `[checked:2026-07-30 result:CAVEAT due:cohort]` https://code.claude.com/docs/en/memory.md — [capability] `CLAUDE.local.md` is a first-class personal project instruction file loaded in later sessions. The M1 prompt adds it to `.gitignore`; Claude Code does not do that automatically. fallback: if auto-load changes, rewrite the final slide's mechanism.
- klaassen-definitive-guide `[checked:2026-08-23 result:OK due:2027-02-23]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Kieran Klaassen, Feb 9 2026. First-person account and sole byline. The core mechanism is that each unit of engineering work makes subsequent units easier. fallback: keep the loop description and drop the attribution if the name changes.

**Frameworks**
- Compound engineering · [borrow:practitioner-coined] · law:the-compound-ladder · ← klaassen-definitive-guide
- Double-loop learning · [borrow:Argyris & Schön] · law:double-loop-learning · ← cultural-vocab. The rules themselves are corrected; Argyris is not named on the student surface.

**Stance** `[stance:2026-08-05 level:L2]`
- holds: the lecture's mechanism is a first-hand account backed by the repository's current rule and verification machinery; Klaassen independently names the compounding mechanism.
- contested: the exact rule and check counts will change as the system compounds. They are a dated repository snapshot, not evidence that volume equals quality.
- would-move-it: a current repository count that differs from the body, or a live tmux run showing the stated M1–M6 span no longer executes.

**OODA**
- question: do the rule snapshot, testing layers, and compound-engineering attribution still match the system students are being shown?
- roster: canonical `check_*.md` compendiums, eval-fire class table, simulation specs, tmux runner runbook, and Klaassen's current writing.
- last-run: 2026-08-05

<!-- /backing -->
