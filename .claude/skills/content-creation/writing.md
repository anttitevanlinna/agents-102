# Writing content — generation-time companion to SKILL.md

Generation-time companion to `SKILL.md` for writing-specific work. **The compendiums in `memory/check_*.md` are the firing-moment authority** — load them at the moment they apply, not after.

This file holds only writing.md-unique content: Bootstrap module runtime, the three-pass build operational mechanics, the four sharing strategies, the M2+ Debrief shape, the scaffold-vs-prompt rule, and pointers to compendium homes for everything else.

## Pointers — where the rules live

- **Voice (AE101):** `check_writing.md` #4 + `compounded/2026-04-25-writing-ae101-voice-quartet.md` (Boris × Martin × Godin × Rory × Risto quintet).
- **Voice (Bootstrap):** `check_writing.md` #4 + `compounded/2026-04-26-writing-bootstrap-voice-trio.md` (Godin × Sutherland × Siilasmaa).
- **Banned words, ritual / practice / ceremony ban, register, em-dash on site:** `check_writing.md`.
- **Business-audience jargon ban, earn-every-term, second-person, memory vs context, Q1/Q2/Q3 retro ban, equals-not-pupils, no-time-of-day-anchors, reflection-beats-stay-invisible, LLM-vs-agent-vs-Claude vocabulary:** `check_student_facing.md`.
- **Prompt-block design (placeholders, lead-in, presentation shape, skill-by-name, chain hygiene, multi-sample enforcement, runtime-fork divs):** `check_prompts.md`.
- **Lecture placement & dosage (closer vs opener vs mid-module, contrast-mood minimal-lecturing):** `check_lectures.md`.
- **Big Idea, Mood contract, Key Concepts, themes, strategy-fidelity:** `check_strategy_tie_in.md`.
- **Module architecture, exercise design, walk-away test, magic rule, delegation boundaries, forcing-functions, classroom concurrency, host-skill optionality, eval-as-fixed-yardstick:** `check_pedagogy.md`.
- **Module file shape, Plug Points syntax, VARIANT markers, cross-doc bare paths, include-link rules, copyright fence, classroom-as-default-mode, training-dir conventions:** `curriculum/CLAUDE.md`.
- **Sales / site copy, em-dash ban, "What research says" callout ban:** `check_sales_copy.md`.
- **Research claims, evidence ladder, source-type labels, freshness, zombie stats:** `check_research_claims.md` + `.claude/rules/research-rules.md`.
- **Claude Code capability claims, skill-invocation-by-name, cloud/Git scope:** `check_platform_and_boundaries.md`.

When multiple surfaces apply (most student-facing files trip several), load all matching compendiums. The split is by firing moment, not by exclusion.

## Bootstrap module runtime — 1h45 target

Every Bootstrap module session targets **1h45 of facilitated content** (Connections → Lecture → Exercise → Debrief → Bridge). Fits a 2-hour calendar invite with ~15 minutes of buffer.

| Phase | Target | Role |
|---|---|---|
| Connections | 8–12 min | Warm-up question, room banter, pulls threads from prior module |
| Lecture | 10–15 min | Concepts primed, foreshadowing the exercise, compound math / frames landed |
| Exercise | 55–70 min | The substance — multi-phase, banter-inclusive, artifact-producing |
| Debrief | 12–18 min | Retro-with-Claude + show-and-tell across the room; named artifact saved |
| Bridge | 3–5 min | One-sentence handoff to next module, question lingers |

**Do not compress to fit a shorter slot.** A 45-minute variant is a different exercise design (single-loop, less banter, no Debrief), not the Bootstrap module trimmed. Mid-Management and Executive-Briefing variants have their own runtime contracts.

**Exercises in the shared library carry a 55–70 min target inside a full Bootstrap module slot.** Shorter exercises (20–30 min) are drop-in / warmup with different eval criteria.

**Lectures stay compact (10–15 min).** A longer lecture usually means the exercise isn't carrying its own weight — move concepts into the exercise's teaching moments.

AE101 and other trainings pin their own runtime contracts in their content-strategy doc.

## The four sharing strategies (Bootstrap M7 canonical)

1. **Share the context.** Teammates get your `memory/`, `sources/`, `CLAUDE.md`, `style.md` and build their own agents on top.
2. **Share a skill.** Extract one scoped capability as a skill file; teammates plug it into their agents.
3. **Share the output (push).** Deploy on a schedule; output lands where the team sees it.
4. **Share an interface (pull).** Wrap the agent in a Slack bot / Teams @mention / web form / endpoint; teammates invoke on demand.

**"Share the whole agent" is not on the list.** It's the vendor pitch that doesn't hold up in practice. Any student-facing text that frames the M7 goal as "package your agent for others" violates strategy; replace with the four-strategy framing.

## Trust the prompt over the scaffold

For exercises where the student is already working in Claude Code with a populated working directory, **prefer a well-crafted prompt over a pre-built scaffold file**. Students should *produce* agent files, rules files, and structure through the exercise — not unzip them. Scaffolds earn their keep when a module needs a trainer-authored artifact the student wouldn't produce themselves (Bootstrap M4 compliance skills, M2 initial empty `sources/memory/agents/` folders). Outside those cases, a one-page prompt does the job better.

**Rule of thumb:** if the scaffold contains text the student should have written in their own voice, it's wrong. Convert to a prompt that produces it.

## Bootstrap M2+ Debrief — canonical shape

Debriefs ALWAYS self-compound. The Q1/Q2/Q3 retro-interview is forbidden across all new content (rule lives in `check_student_facing.md` #7). Bootstrap M1 ships the Q1/Q2/Q3 shape — live content, named exception, NOT ported.

Canonical M2+ Debrief prompt shape:

```
Review this session and update [rules file]. Read [rules file] at [path], then scan [relevant artifact folders]. Look back over our conversation: which rules did we lean on, which did we work around, which never came up, where did the output wobble?

Then rewrite [rules file]. Integrate, don't append. Sharpen weak rules, add what's missing, remove what turned out wrong. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why — grounded in specific moments from the session.
```

Per-module variation: which rules file (`CLAUDE.md` root / a specific skill / an agent file / an eval judge); which artifact folders to scan; which failure modes to look for. Shape holds: *review → rewrite in place → report*. Per-module variation discipline lives in `check_student_facing.md` #7 + `compounded/2026-04-25-pedagogy-compound-shape-varies-per-module.md`.

## The three-pass build

Work in passes. Finishing Pass 1 for all modules before Pass 2 catches arc-level contradictions before they compound into rework.

**Pass 1 — Module index files.** Spine for each module. No exercise/lecture content yet. Use the canonical template in `curriculum/CLAUDE.md` § *Module File Shape*. Pass-1-specific guidance:
- **Big Idea:** one sentence, one idea per module.
- **What You'll Learn:** LO verbs lead; phrased at the right Bloom's level.
- **Lectures / Exercises (Pass 1 form):** bullet list with one-line description for lectures, one-paragraph prose description for exercises. Include-links arrive in Pass 2.
- **Debrief:** three retro questions shift to the module's discipline (Bootstrap M4 "what should be a skill," M6 "what should be an eval").

**Pass 2 — Exercise + lecture skeletons.** One file per entry in the shared library. Canonical files.

Exercise file shape:
```markdown
# Exercise: [Name]

**What you do:** [clear instruction]
**What happens:** [expected behavior, with a realistic example]
**The point:** [one or two sentences]
**Facilitator note:** [timing estimate, common questions, watch-for behaviors, decision points]
**Time:** [e.g., "55-70 minutes" for Bootstrap module slot]
```

Lecture file shape:
```markdown
# Lecture: [Name]

[Content — 10-15 minutes of facilitator talking, inside a 1h45 Bootstrap module.]

**Time:** [e.g., "10-15 minutes"]
```

**Pass 3 — Full content.** Flesh out each exercise and lecture file to facilitator-runnable prose. Add: exact Claude Code commands / interactions, expected outputs with realistic examples, named failure modes with diagnostic hints, time-box every sub-step, variant markers where audience-specific framing diverges, plug point defaults.

## Verification after writing

`curriculum-pre-ship-audit` skill is the composite gate (compendium audit + three-persona sim + LLM-as-judge + source verification + Claude Code capability check + Quality-state tag check). Invoke it before declaring done. Per-layer rules live in `check_pedagogy.md` #15 (auto-fire after significant rewrite), #21 (verification layers sample different errors), #21b (cheap-before-expensive).

Structural smoke-test (every file): start `python3 -m http.server 8000` from repo root, browser-check `http://localhost:8000/site/curriculum.html?module=<slug>`, print-check Cmd+P, verify include-link resolution, spot-check 2–3 other modules.

**Good enough > polished.** If essential judges pass and only contributory judges fail, mark TODOs and move on.
