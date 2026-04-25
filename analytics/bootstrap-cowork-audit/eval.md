# Bootstrap — Cowork-edition LLM-as-judge audit

**Date:** 2026-04-25
**Mode:** Cowork (`.rt-cowork` + unwrapped visible; `.rt-code` / `.rt-cli` / `.rt-desktop` hidden; `*(Claude Code)*` chip auto-renders as **Cowork**).
**Scope:** 9 Bootstrap modules + 11 exercises, body-only (above `<!-- maintainer -->`).
**Method:** mechanical scan (banned-word / em-dash / placeholder / link-format / Q1Q2Q3 / time-of-day / contemplative-pause / room-share / chip-format / runtime-wrap), plus content sample-reads on the high-em-dash and runtime-wrapped files.

---

## Top-level summary

**Headline:** Bootstrap survives Cowork mode in good shape. The chip mapping (`*(Claude Code)*` → "Cowork") is correctly handled by the renderer (curriculum.html L671), so unwrapped prompts read clean in either runtime. The four exercises that *do* fork (`hallucination-bakeoff`, `eval-loop`, `three-retrievers-three-minds`, `build-your-challenge-memory`) consistently swap **subagent → agent** and **Claude Code session → Cowork session** inside paired `.rt-code` / `.rt-cowork` divs — Cowork-mode flow holds.

**No banned words anywhere.** Zero hits on `honest`, `delve`, `landscape`-as-verb, `importantly`, `crucial`, `substrate`, `ritual`, `ceremony` across all 20 files. Compendium discipline is holding.

**Em-dashes are the dominant violation.** `check_student_facing #14` bans em-dashes in student-facing curriculum. Every exercise except `eval-loop` and the two M7 deliverables (`personal-to-team`, `evaluations`) carries em-dashes — `build-your-challenge-memory` 57, `personal-site-with-guardrails` 55, `share-your-work` 54, `three-retrievers-three-minds` 44, `joint-double-diamond` 41. This is a TODO-class violation across the board, not a REVISE-class one (the prose is otherwise clean), but it's a portfolio-wide debt.

**One Q1/Q2/Q3 hit** — `getting-going.md` Module 1 Debrief. Per `check_student_facing #7`, the full compound move IS taught once at M1 and the canonical example. Acceptable as the M1 instance; would fail anywhere else. M2–M6 vary the shape (sharpen-different-artifact / no-close / etc.) — confirmed clean by sample-read.

**One ceremony/room-share hit** — `joint-double-diamond.md` line 145: *"out loud"* + *"sponsor names what just happened"* and the literal phrase *"No certificate. No ceremony."* The "no ceremony" line is the *naming* of the ban, deliberate and sharp; the *"out loud"* and *"in-room"* commands are facilitator instructions in body, but the file flags them explicitly as the in-room beat with a self-study parallel right under. Borderline but defensible because it's M8's identity-naming close, the one beat in the curriculum that genuinely IS about ceremony-by-its-absence.

**One contemplative-pause hit** — `audit-your-agent.md` line 101: *"the one that bugs you when you sit with the reports for thirty seconds. Feeling is fine here."* This trips `check_student_facing #23` (sentence-form contemplative-pause prefix). Soft hit — *"sit with"* + *"feeling is fine"* is wellness-coach register inside an unease module that should be staying in the unease, not normalising it.

**Three time-of-day anchors** — `name-your-challenge` line 19 (*"Q2"* is a quarter, false positive — it's the pricing-redesign quarter); `three-retrievers-three-minds` line 11 (*"from yesterday"* / *"thing I wrote down yesterday"*); `module-4-prework` line 19 (*"Tomorrow you'll author"*) and line 33 (*"yesterday says nothing about today"* — false positive, technical claim about non-determinism). Two real hits, both `check_student_facing #22` violations.

**Zero placeholder-in-fence violations.** Zero filename-link violations. Zero markdown-shout-in-fence violations.

**Cowork-edition coherence:** strong on the four wrapped exercises; the rest are runtime-agnostic by construction (no UI-specific instructions that would orphan in Cowork mode). The single exception worth flagging: `personal-site-with-guardrails` line 13 wraps Cmd+A/Cmd+C *paste-into-Cowork* correctly, but the Cowork branch loses the desktop-app context that says `+` (paperclip) attachment is the cleaner path — minor TODO.

---

## Per-file verdicts

### Modules

| File | Banned | Mood | LO match | Student-POV | Prompt-block | Em-dash / link | Cowork coherence | Verdict |
|---|---|---|---|---|---|---|---|---|
| `prework.md` | pass | 4/5 (orientation, neutral) | 5/5 | pass | pass | 7 em-dashes / clean | 5/5 | **APPROVE-WITH-TODOs** — em-dashes |
| `getting-going.md` (M1, joyful) | pass | 5/5 (joy lands; *"compound interest on a markdown file"*) | 5/5 | pass (Q1Q2Q3 is canonical M1 instance) | pass | 2 em-dashes / clean | 5/5 | **APPROVE** |
| `building-agent-systems.md` (M2, compound) | pass | 4/5 (compound mood explicit) | 5/5 | pass | pass | 8 em-dashes / clean | 5/5 | **APPROVE-WITH-TODOs** — em-dashes |
| `multi-agent-systems.md` (M3, unease) | pass | 5/5 (uneasy distance named, not resolved) | 5/5 | pass | pass | 3 em-dashes / clean | 5/5 | **APPROVE-WITH-TODOs** — em-dashes |
| `security.md` (M4, deeper unease) | pass | 5/5 (*"unease stays. Nothing today resolves it. That's the curriculum."*) | 5/5 | pass | pass | 1 em-dash / clean | 5/5 | **APPROVE** |
| `output-quality.md` (M5, rescue) | pass | 5/5 (rescue lands via measured benchmark) | 5/5 | pass | pass | 3 em-dashes / clean | 5/5 | **APPROVE-WITH-TODOs** — em-dashes |
| `evaluations.md` (M6, leverage) | pass | 5/5 (self-improving loop = leverage) | 5/5 | pass | pass | 0 em-dashes / clean | 5/5 | **APPROVE** |
| `personal-to-team.md` (M7, generosity) | pass | 5/5 (*"It's a generous one"*; JTBD frame) | 5/5 | pass | pass | 0 em-dashes / clean | 5/5 | **APPROVE** |
| `agents-building-agents.md` (M8, awe) | pass | 5/5 (*"the ceiling moves on its own"*) | 5/5 | pass | pass | 5 em-dashes / clean | 5/5 | **APPROVE-WITH-TODOs** — em-dashes |

### Exercises

| File | Banned | Mood | LO/teaching-moment | Student-POV | Prompt-block | Em-dash / link | Cowork coherence | Verdict |
|---|---|---|---|---|---|---|---|---|
| `personal-site-with-guardrails` (M1) | pass | 5/5 (joy) | 5/5 | pass | pass (chips correct, no placeholders) | 55 em-dashes / clean | 4/5 (`+` attachment path missed in Cowork branch) | **APPROVE-WITH-TODOs** — em-dashes; consider `+` upload in Cowork branch |
| `name-your-challenge` (M2) | pass | 4/5 (compound setup) | 5/5 | pass | pass | 19 em-dashes / clean | 5/5 | **APPROVE-WITH-TODOs** — em-dashes |
| `build-your-challenge-memory` (M2) | pass | 4/5 (compound) | 5/5 | pass | pass | 57 em-dashes / clean | 5/5 (forks subagent→agent) | **APPROVE-WITH-TODOs** — em-dash debt is largest in portfolio here |
| `three-retrievers-three-minds` (M3) | pass | 5/5 (unease via three-minds-divergence) | 5/5 | pass | pass | 44 em-dashes / clean | 5/5 (forks four-Code-sessions → four-Cowork-sessions) | **APPROVE-WITH-TODOs** — em-dashes; *"from yesterday"* time-anchor (line 11) → strip |
| `module-4-prework` | pass | 4/5 (anticipation, deeper unease setup) | 5/5 | pass | pass | 15 em-dashes / clean | 5/5 | **APPROVE-WITH-TODOs** — em-dashes; *"Tomorrow you'll author"* time-anchor (line 19) → strip |
| `audit-your-agent` (M4) | pass | 4/5 (deeper unease lands but soft on line 101) | 5/5 | **borderline** — *"sit with the reports"* + *"Feeling is fine here"* (line 101) trips contemplative-pause sentence-form ban (#23) | pass | 28 em-dashes / clean | 5/5 | **APPROVE-WITH-TODOs** — rewrite line 101 to remove *"sit with"* + *"Feeling is fine"*; em-dashes |
| `hallucination-bakeoff` (M5) | pass | 5/5 (rescue) | 5/5 (teaching moment lands — five detectors against benchmark) | pass | pass (forks well) | 28 em-dashes / clean | 5/5 (forks subagent→agent throughout) | **APPROVE-WITH-TODOs** — em-dashes |
| `eval-loop` (M6) | pass | 5/5 (leverage; self-improving loop) | 5/5 | pass | pass | **0 em-dashes** / clean | 5/5 (forks subagent→agent + ACL note: *"Cowork has no per-file ACL"*) | **APPROVE** — cleanest exercise in the portfolio |
| `share-your-work` (M7) | pass | 5/5 (generosity) | 5/5 | pass | pass | 54 em-dashes / clean | 5/5 (Builder Claude chip — runtime-agnostic) | **APPROVE-WITH-TODOs** — em-dashes |
| `extend-your-system` (M8) | pass | 4/5 (awe-leading) | 5/5 | pass | pass | 16 em-dashes / clean | 5/5 | **APPROVE-WITH-TODOs** — em-dashes |
| `joint-double-diamond` (M8) | pass | 5/5 (awe-close, identity-naming) | 5/5 | **borderline** — line 145 *"out loud"* + sponsor-names-it room-share is in body; flagged with self-study parallel under | pass | 41 em-dashes / clean | 5/5 | **APPROVE-WITH-TODOs** — em-dashes; review line 145 framing (the *"No ceremony"* sentence is deliberate; the *"in-room"* commands could move to maintainer or be rewritten as narration not command) |

---

## Cross-cutting findings

### 1. Em-dash debt is portfolio-wide (TODO-class)

403 em-dashes across 20 files. Every file except `eval-loop`, `evaluations`, `personal-to-team` has a meaningful count. The compendium `#14` ban is being honored in *new* generation (M6 / M7 modules and `eval-loop` exercise are clean) but old material was never swept. **Recommendation:** one mechanical pass across the portfolio — `s/—/. /g` with manual review — would clear it. Not blocking for any single file's ship; blocking as a portfolio quality-state claim.

### 2. Cowork-mode coherence is structurally sound

Two patterns are working:
- **Chip auto-mapping** at the renderer (curriculum.html L671) — `*(Claude Code)*` becomes "Cowork" / "Claude Code Desktop" / "Claude Code CLI" depending on runtime toggle. No author burden; no orphan prompts.
- **Paired runtime divs** (`.rt-code` / `.rt-cowork`) used in the four exercises that genuinely fork — `subagent` → `agent` swap, `/clear` → "start a new Cowork session" swap, ACL caveat re-worded ("Cowork has no per-file ACL"). The fork is consistent and the Cowork branch reads stand-alone.

The single Cowork-coherence concern: `personal-site-with-guardrails` Phase 1 leans on Cmd+A / Cmd+C / paste, which works in Cowork but loses the cleaner *"click `+`, attach LinkedIn export"* path the Cowork desktop affords. Minor TODO in the Cowork branch only.

### 3. Quality-state reality-check

Per `curriculum/CLAUDE.md` quality-state ladder, this audit clears **compendium-audited** with two TODO-class items per most files (em-dash, occasional sentence-form pause). A `compendium-audited` tag is defensible after the em-dash sweep + audit-your-agent line 101 + module-4-prework / three-retrievers time-anchor strips land.

### 4. Mood arc holds end-to-end

M1 joy (compound on a markdown file) → M2 compound (memory + agents + sources stack) → M3 unease (synthesised distance you can't fully stake) → M4 deeper unease (residuals stay named, not solved) → M5 rescue (the benchmark you wrote in two minutes names the winner) → M6 leverage (the loop sharpens itself) → M7 generosity (could this help someone else?) → M8 awe (the ceiling moves on its own + identity-naming). Each module names its mood explicitly in the Connections / Bridge sentences. No tonal jolt between modules. No premature resolution at M3 or M4. The M5 rescue genuinely earns its rescue mood after M3/M4's stew.

---

## Recommended ship-blocking fixes

None. Every file is **APPROVE** or **APPROVE-WITH-TODOs**. Cowork edition is shippable.

## Recommended TODO-pass before next cohort

1. **Em-dash sweep** across 17 files (every exercise except `eval-loop` + 6 modules).
2. **`audit-your-agent` line 101** — rewrite *"the one that bugs you when you sit with the reports for thirty seconds. Feeling is fine here."* to remove the *"sit with"* / *"Feeling is fine"* contemplative-pause register. Suggested: *"Pick the one that bugs you most when you scan the reports. This is about running the loop once, not solving the worst problem on your list."*
3. **Time-of-day strips:** `module-4-prework` line 19 (*"Tomorrow you'll author"* → *"At M4 you'll author"*); `three-retrievers-three-minds` line 11 (*"from yesterday"* → *"from M2"*).
4. **`joint-double-diamond` line 145** — keep the *"No certificate. No ceremony."* (deliberate, lands the meta). Reframe the *"in-room: the sponsor names what just happened"* prose as narration of what the trainer does (third-person facilitator description) rather than command — or move that beat below the maintainer fence and reference it from the in-room cohort note already there.
5. **`personal-site-with-guardrails` Phase 1 Cowork branch** — surface the `+` attachment path as the cleaner Cowork option alongside the paste path.

WROTE: /Users/anttitevanlinna/Projects/agents-102/analytics/bootstrap-cowork-audit/eval.md
