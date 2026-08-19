# “How this training was built” Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 870-word M1 closing lecture with a roughly 400–450-word, three-slide build story grounded in the training's actual rule, judge, simulation, and tmux testing machinery.

**Architecture:** Make one cohesive rewrite in the canonical lecture file. The student-facing body becomes origin → quality stack → student's loop; the maintainer and backing regions are then reduced and realigned to the surviving claims.

**Tech Stack:** Markdown curriculum source, backing validator, slide-size and numbering checks, Node test suite, curriculum simulation and judge machinery.

## Global Constraints

- Use “automated quality judges,” not “evals,” on the M1 student surface.
- State the repository snapshot as “279 active rules and subrules across 12 checklists.”
- Do not claim that all three test codebases passed the full M1–M6 chain.
- Keep the lecture in Antti's first-person build-story frame.
- Keep **compound engineering** as the only coined-term emphasis in the close.
- Preserve unrelated untracked `.superpowers/` content.

---

### Task 1: Rewrite and verify the M1 closer

**Files:**
- Modify: `curriculum/lectures/how-this-training-was-built.md`
- Reference: `docs/superpowers/specs/2026-08-05-how-this-training-was-built-design.md`

**Interfaces:**
- Consumes: the M1 exercise's `./CLAUDE.local.md` artifact and the existing Klaassen attribution.
- Produces: a three-slide lecture whose body claims resolve to an updated maintainer/backing block.

- [ ] **Step 1: Re-derive the repository snapshot before drafting**

Run:

```bash
rule_dir=/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory
find "$rule_dir" -maxdepth 1 -type f -name 'check_*.md' | wc -l
rg --no-filename '^[0-9]+[a-z]?\.[[:space:]]+\*\*' "$rule_dir"/check_*.md | wc -l
```

Expected: `12` checklist files and `279` active rule/subrule lines. The active-rule regex excludes italic “Moved to…” redirects. If either changes, use the fresh values in body and backing.

- [ ] **Step 2: Replace the student-facing body with the approved three-slide draft**

Use this body above `<!-- maintainer -->`:

```markdown
# How this training was built

What follows is Antti's story of building this training, in his own words.

## Thirty bullets were not the training

At first, this training was a strategy document: seven headings and thirty bulletpoints. It looked complete in the way a good list can look complete. Then the bulletpoints became module prototypes, and the gaps became visible.

The failures were specific. A phrase brought consultancy voice into an engineering lecture. An exercise asked an experienced engineer to perform a scripted reaction. A module tried to feel tidy where the student should have felt uncertainty. Each correction became a reusable rule: *“Forcing functions stay, scripted reactions go.”* *“Every claim about Claude Code gets re-checked before each cohort.”*

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
```

- [ ] **Step 3: Confirm the body meets the structural target**

Run:

```bash
awk 'BEGIN{keep=1} /<!-- maintainer -->/{keep=0} keep' curriculum/lectures/how-this-training-was-built.md | wc -w
awk 'BEGIN{keep=1} /<!-- maintainer -->/{keep=0} keep' curriculum/lectures/how-this-training-was-built.md | rg '^## '
```

Expected: roughly 400–450 words and exactly these three headings:

```text
## Thirty bullets were not the training
## Then we tested the training
## You just ran the same loop
```

- [ ] **Step 4: Realign the maintainer block**

Keep and update only constraints that still govern the new body:

```markdown
- The opening narrator frame naming Antti remains deliberate.
- M1 remains map-protected and carries no cross-module sequencing.
- “Automated quality judges” deliberately describes the testing machinery without pre-planting the M6 word “eval.”
- The rule count is a repository snapshot and must be re-derived before a cohort.
- The tmux claim is bounded to real Claude Code sessions through M1–M6 against working codebases; it does not claim three complete end-to-end codebase passes.
- Klaassen's second M1 mention remains deliberate reinforcement.
- The file remains slide-size exempt if the narrative slide gate still requires it.
```

Delete constraints tied only to removed material: “Built to forgive,” plan mode, subagent explanation, five-agent fan-out, week-to-afternoon scaling, the three-rule specimen set, and the full Klaassen stage sequence. Change the trainer time band from `5–7 min` to `3–4 min` and update the watch-fors to guard against tooling-inventory and achievement-story drift.

- [ ] **Step 5: Realign backing claims and sources**

Keep or add claims for:

```text
training-began-as-bulletpoints
first-drafts-were-wrong
corrections-became-rules
rules-were-corrected
rule-compendium-snapshot
rules-leak
automated-quality-judges
persona-simulation
prompt-behavior-simulation
tmux-system-test
claude-local-md-is-yours
klaassen-names-it
loop-is-the-shape
```

Remove body claims that no longer exist: session/subagent inheritance, five-agent parallel audit, week-became-afternoon, artifacts-are-rebuildable, understanding-is-the-artifact, and the printed eight-stage Klaassen loop. Back repository-internal testing claims with the canonical compendiums and eval/tmux files; retain the existing source stamps for Claude Code capability and Klaassen attribution where their body claims survive.

- [ ] **Step 6: Run deterministic validation**

Run:

```bash
node scripts/validate-backing.js curriculum/lectures/how-this-training-was-built.md
node scripts/check-slide-size.js --file curriculum/lectures/how-this-training-was-built.md
node scripts/check-slide-numbering.js --file curriculum/lectures/how-this-training-was-built.md
npm test
git diff --check
```

Expected: all commands exit `0`. If slide size reports only the documented story-lecture exemption, retain that constraint and record the exact result in the handoff.

- [ ] **Step 7: Run the significant-rewrite quality pass**

Run the repository's Class A persona simulation, Class B prompt-behavior read, and focused writing/story/technical/pedagogy/strategy/slides judges against `curriculum/lectures/how-this-training-was-built.md`. Treat verdicts as read-only evidence; reconcile any valid finding in the content-creation workflow, then re-run affected checks.

Expected: no unresolved blocking finding and a Quality block whose SHAs match the final body.

- [ ] **Step 8: Review and commit the lecture**

Run:

```bash
git diff -- curriculum/lectures/how-this-training-was-built.md
git status --short
git add curriculum/lectures/how-this-training-was-built.md
git diff --cached --check
git commit -m "Cut and ground the training build story"
```

Expected: the commit contains only the lecture rewrite; `.superpowers/` remains untracked and untouched.
