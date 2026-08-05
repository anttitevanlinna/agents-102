# How this training was built

What follows is Antti's story of building this training, in his own words.

## Thirty bullets were not the training

At first, this training was a strategy document: seven headings and thirty bulletpoints. It looked complete in the way a good list can look complete. Then the bulletpoints became module prototypes, and the gaps became visible.

The failures were specific. A phrase brought consultancy voice into an engineering lecture. An exercise asked an experienced engineer to perform a scripted reaction. A module tried to feel tidy where the student should have felt uncertainty. Each correction became a reusable rule. One now says *“Forcing functions stay, scripted reactions go.”* Another requires every Claude Code capability claim to be checked before each cohort.

The rules were corrected too. Some were too broad. Some fired in the wrong place. Each time a rule failed, the failure sharpened the rule instead of disappearing into one edit.

The system behind this training currently has 279 active rules and subrules across 12 checklists. The count is not a claim that more rules make better work. It shows how much specific judgment had to be written down before another session could reuse it.

## Then we tested the training

Rules shape a draft, but they still leak. Major changes therefore go through automated quality judges, each reading through a focused lens: writing, story, technical accuracy, agent behavior, pedagogy, strategy, cross-module fit, and slide design.

Simulated engineers read the result as a competent builder, a skeptical senior, and a fast operator. A separate simulation asks what the LLM is likely to do when each prompt is pasted. Those reads catch ambiguity, condescension, weak handoffs, and prompts whose wording invites the wrong behavior.

Then a tmux runner drives real Claude Code sessions through Modules 1–6 against working codebases. It catches a different class of failure: a session that stalls, an artifact that never lands, or a handoff that breaks the next module.

None of these checks replaces another. Rules catch mistakes already understood. Judges and simulations challenge the written material. The tmux runs test whether the training actually executes.

## You just ran the same loop

This build story is the shape you just ran on your own repo. Claude's first read was partly wrong. You found the useful wrongness, corrected it, and wrote what the session taught you into `./CLAUDE.local.md` for the next session.

Kieran Klaassen calls this **compound engineering**: work produces evidence; evidence improves the system that does the next work. Before you ran it, that was a name. Now it is a loop you have run yourself.

The loop is the shape. The bug today was the excuse.

<!-- maintainer -->

**Standing constraints:**
- **The opening narrator-frame line names Antti — deliberate rule-6 exception (maintainer call 2026-08-01).** The lecture is a first-hand account; the frame line converts a non-author trainer from witness to narrator. The creator-name lint will flag it; do not strip.
- **Zero map references and no cross-module sequencing.** M1 is map-protected, and the module file's `## Next` carries the bridge.
- **Narrative slides stay prose paragraphs.** The only bold student-side handle is **compound engineering**.
- **“Automated quality judges” is deliberate M1 language.** It describes the testing machinery without pre-planting the M6 word *eval*.
- **The rule count is a repository snapshot.** Before a cohort, re-run `find <canonical-memory-dir> -maxdepth 1 -type f -name 'check_*.md' | wc -l` and `rg --no-filename '^[0-9]+[a-z]?\.[[:space:]]+\*\*' <canonical-memory-dir>/check_*.md | wc -l`; update both body and backing if the result is no longer 12 / 279. The active-rule regex deliberately excludes italic “Moved to…” redirects.
- **The tmux claim is bounded.** The runner has driven real Claude Code sessions through M1–M6 on working codebases. The full M1–M6 wrapper is documented on Lemmings; later-module variants exist for Codesearch and Picoshare. Do not turn this into “three codebases passed end to end.”
- **Klaassen is named twice on the student surface across M1, deliberately.** `compound-and-close` prints the loop; this closer connects the student's work to the name. A third M1 mention would still breach the cap.
- **The quoted forcing-function rule is a specimen, not introduced vocabulary.** It is verbatim `check_pedagogy.md §16` and makes the correction-to-rule move concrete.
- **File is size-gate exempt** (story lecture).

**Quality:** sim-passed 2026-08-05 (writing@148c7ea story@148c7ea technical@148c7ea behavior@148c7ea pedagogy@148c7ea strategy@148c7ea slides@148c7ea)
- judges @148c7ea: writing PASS (codex-audit), story PASS (three-persona-codex-audit), technical PASS (codex-audit), behavior PASS (no-prompts), pedagogy PASS (codex-audit), strategy PASS (codex-audit), slides PASS (codex-audit)
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)

**Meta (trainer):**
- **Primary Bloom's level:** Understand — recognise the compound loop in the training's construction after running it.
- **Time band:** 3–4 min closer inside M1's 2h slot.
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
- `prototype-failures-were-specific` · detail · the three failure examples on *Thirty bullets were not the training* ← training-construction
- `corrections-became-rules` · detail · “Each correction became a reusable rule” ← compendium-rules
- `rules-were-corrected` · detail · “The rules were corrected too” ← training-construction
- `rule-compendium-snapshot` · detail · “279 active rules and subrules across 12 checklists” ← compendium-snapshot
- `rules-leak` · detail · “Rules shape a draft, but they still leak” ← training-construction
- `automated-quality-judges` · detail · the eight focused lenses on *Then we tested the training* ← quality-judges
- `persona-simulation` · detail · the competent-builder, skeptical-senior, and fast-operator reads ← simulation-stack
- `prompt-behavior-simulation` · detail · “what the LLM is likely to do when each prompt is pasted” ← simulation-stack
- `tmux-system-test` · detail · “a tmux runner drives real Claude Code sessions through Modules 1–6 against working codebases” ← tmux-runner
- `claude-local-md-carries-session-learning` · detail · what the session taught is written into `./CLAUDE.local.md` for the next session ← claude-local-md-autoload
- `klaassen-names-it` · borrowed · “Kieran Klaassen calls this **compound engineering**” ← klaassen-definitive-guide
- `compound-work-improves-next-work` · borrowed · “work produces evidence; evidence improves the system that does the next work” ← klaassen-definitive-guide
- `loop-is-the-shape` · vision · “The loop is the shape. The bug today was the excuse.” ← none-owed

**Sources**
- training-construction `[checked:2026-08-05 result:ATTESTED due:none]` attested:Antti 2026-04→2026-08 building-AE101 — [maintainer-attested] First-hand account of the bulletpoint origin, the prototype failures, the rules being corrected, and loaded rules still leaking. fallback: none needed; this is the author's build story.
- compendium-rules `[checked:2026-08-05 result:OK due:cohort]` `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/check_*.md` — [maintainer-attested] The forcing-function sentence is verbatim `check_pedagogy.md §16`; the Claude Code capability requirement resolves to `check_research_claims.md §11a`. fallback: replace either example with a current rule and update the body.
- compendium-snapshot `[checked:2026-08-05 result:OK due:cohort]` `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/check_*.md` — [maintainer-attested] `find ... -name 'check_*.md' | wc -l` returned 12; `rg --no-filename '^[0-9]+[a-z]?\.[[:space:]]+\*\*' .../check_*.md | wc -l` returned 279. A broader numbered-entry count returns 286 because it includes seven italic “Moved to…” redirects; those are not active rules. fallback: re-run and replace both numbers.
- quality-judges `[checked:2026-08-05 result:OK due:cohort]` `.claude/skills/eval-fire/SKILL.md`, `curriculum/evals/judges/` — [maintainer-attested] The class table defines writing, story, technical, behavior, pedagogy, strategy, cross-module, and slides as separate focused reads. fallback: name only the classes still exposed by the current eval machinery.
- simulation-stack `[checked:2026-08-05 result:OK due:cohort]` `.claude/skills/content-creation/simulation.md`, `.claude/skills/content-creation/simulation-behavior.md` — [maintainer-attested] Class A defines the three engineer-reader perspectives; Class B separately reasons over likely prompt behavior. fallback: describe only the currently configured simulation classes.
- tmux-runner `[checked:2026-08-05 result:OK due:cohort]` `curriculum/evals/mechanical/tmux-runner/README.md`, `curriculum/evals/mechanical/tmux-runner/lemmings-chain-runbook.md` — [maintainer-attested] The runner preserves the real Claude Code TTY surface. The Lemmings M1–M6 chain was validated through the wrapper; Codesearch and Picoshare carry later-module variants. fallback: narrow the body to the latest live-validated span.
- claude-local-md-autoload `[checked:2026-07-30 result:CAVEAT due:cohort]` https://code.claude.com/docs/en/memory.md — [capability] `CLAUDE.local.md` is a first-class personal project instruction file loaded in later sessions. The M1 prompt adds it to `.gitignore`; Claude Code does not do that automatically. fallback: if auto-load changes, rewrite the final slide's mechanism.
- klaassen-definitive-guide `[checked:2026-07-30 result:OK due:2027-01-30]` https://every.to/source-code/compound-engineering-the-definitive-guide — [practitioner direct, vendor venue] Kieran Klaassen, Feb 9 2026. First-person account and sole byline. The core mechanism is that each unit of engineering work makes subsequent units easier. fallback: keep the loop description and drop the attribution if the name changes.

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
