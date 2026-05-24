# Writing — generation-time companion

`memory/check_*.md` compendiums autoload via surface-detector hook. This file holds writing.md-unique mechanics.

## Voice references (compounded, not autoloaded)

- **AE101 quintet:** Boris × Martin × Godin × Rory × Risto → `compounded/2026-04-25-writing-ae101-voice-quartet.md`
- **Agents 101 trio:** Godin × Sutherland × Siilasmaa → `compounded/2026-04-26-writing-agents-101-voice-trio.md`

Module file shape + cross-doc link mechanics → `curriculum/module-shape.md`.

## Agents 101 module runtime — 1h45

| Phase | Target | Role |
|---|---|---|
| Connections | 8–12 min | Warm-up + thread from prior module |
| Lecture | 10–15 min | Concepts primed, foreshadow exercise |
| Exercise | 55–70 min | Substance — multi-phase, artefact-producing |
| Debrief | 12–18 min | Retro-with-Claude + show-and-tell |
| Bridge | 3–5 min | One-sentence handoff, question lingers |

Shorter slot = different design, not compression. AE101 / Mid-Mgmt / Exec variants pin own contracts in content-strategy.

Shared-library exercises: 55–70 min in Agents 101 slot. 20–30 min drop-ins = different eval criteria. Lecture >15 min usually = exercise underweight.

## Four sharing strategies (Agents 101 M7 canonical)

1. **Share the context** — teammates get your `memory/`, `sources/`, `CLAUDE.md`; build their own agents on top.
2. **Share a skill** — one scoped capability extracted.
3. **Share the output (push)** — schedule deploy; output lands where team sees it.
4. **Share an interface (pull)** — Slack bot / Teams @mention / web form / endpoint; teammates invoke on demand.

"Share the whole agent" = vendor pitch. Not on the list. Text framing M7 as "package your agent for others" violates strategy.

## Trust the prompt over the scaffold

Working in Claude Code with populated dir → prefer well-crafted prompt over pre-built scaffold. Students *produce* agent / rules / structure through the exercise, not unzip. Scaffold earns keep only when trainer-authored artefact student wouldn't produce (M4 compliance skills, M2 initial empty `sources/memory/agents/` folders).

Rule of thumb: scaffold contains text student should write in own voice → wrong. Convert to prompt.

## Agents 101 M2+ Debrief — canonical shape

Q1/Q2/Q3 retro forbidden in new content (`check_student_facing.md` #7). M1 ships Q1/Q2/Q3 = named exception, not ported.

Canonical M2+ shape:

```
Review this session and update [rules file]. Read [rules file] at [path], then scan [relevant artifact folders]. Look back over our conversation: which rules did we lean on, which did we work around, which never came up, where did the output wobble?

Then rewrite [rules file]. Integrate, don't append. Sharpen weak rules, add what's missing, remove what turned out wrong. Don't add a "retro notes" section; rewrite the file as the better version.

When you're done, tell me in 3–5 lines: what you added, what you sharpened, what you removed, and why — grounded in specific moments from the session.
```

Per-module variation: rules file, artefact folders, failure modes to look for. Shape holds: review → rewrite in place → report. → `check_student_facing.md` #7 + `compounded/2026-04-25-pedagogy-compound-shape-varies-per-module.md`.

## Three-pass build

Finish Pass 1 across all modules before Pass 2 → catches arc-level contradictions before rework compounds.

**Pass 1 — Module index files.** Spine only. Template: `curriculum/module-shape.md`.
- Big Idea: one sentence, one idea.
- What You'll Learn: LO verbs lead, right Bloom level.
- Lectures/Exercises: bullet-list one-liner (lectures) / one-paragraph (exercises). Include-links arrive Pass 2.
- Debrief: three retro questions shift to module's discipline (M4 "what should be a skill," M6 "what should be an eval").

**Pass 2 — Exercise + lecture skeletons.** One file per shared-library entry. File shapes per `curriculum/CLAUDE.md`.

**Pass 3 — Full content.** Facilitator-runnable prose: exact Claude Code commands, expected outputs with realistic examples, named failure modes + diagnostic hints, time-box every sub-step, variant markers, plug-point defaults.

## Verification

`curriculum-pre-ship-audit` = composite gate. Invoke before declaring done. Per-layer rules: `check_pedagogy.md` #15 / #21 / #21b.

Smoke-test: serve repo root → `?module=<slug>` + print preview + include-link resolution + 2–3 other modules.

Good enough > polished. Essentials pass + contributory fail = TODOs, ship.
