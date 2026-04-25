# AE101 prework + M1 first-impression UX — findings

Audited 2026-04-25 against:
- `curriculum/trainings/agentic-engineering-101/prework.md`
- `curriculum/trainings/agentic-engineering-101/getting-going.md`
- `curriculum/exercises/orient-and-introspect.md`
- `curriculum/exercises/fix-tests-first.md`
- `curriculum/lectures/the-wizard-move.md`

Cross-checked against `curriculum/content-strategy-agentic-engineering-101.md` (M1 mood = joyful creation; M1 starts in chat with Claude Code already open; M1 promise = wizard, not onboarding).

## TL;DR

The first 90 minutes leak at the seam BEFORE prework Step 1, not inside it. Prework opens with *"Land at Module 1 with Claude Code open in the repo you're going to grow"* — assumes install, auth, and license activation are already done. There is no JTBD-zero email or pointer that gets the engineer from *"got the cohort link"* to *"Claude Code is alive on my laptop."* That is the silent-failure cliff: a busy L0–L3 IC who hit a corp proxy or didn't notice the license email will discover the problem at Step 2 (*"send a prompt, read a file. If Claude Code isn't working, this is the moment to fix it"*) — alone, on prework time, with no trainer in the room. After that gap, the prework itself is tight, the M1 opener earns its wizard framing cleanly via the Context-is-King demo, and M1 actually uses every prework artifact in the right order. Step 5's megaprompt does carry four jobs but the first one (read the wizard-move lecture) is misplaced and would land harder as a prework Step 0 read — splitting it earns an early win in the student's first ten minutes and removes one job from Step 5.

## JTBD walk — beat by beat

### Beat 1 — Email arrives with cohort link + zip download

**Student's job:** *"Tell me what to install before I show up."*

**Friction / cliff:** No file in the curriculum tree describes what this email says. The `prework.md` *Delivery* maintainer note ("classroom cohorts get the zip link via email + Slack/Teams ahead of Day 1") describes the channel, not the contents. If the email just contains the cohort site link + zip + "do prework before session 1," the student lands on prework.md with **no guarantee Claude Code is installed, authenticated, or licensed**. The Pro/Team license is assumed — fine — but activation in the desktop client (or `claude login` in CLI) is not nothing on a corp laptop.

**Silent-failure cliff:** the engineer reads "open a new Claude Code session in your repo," tries, gets an auth wall or a proxy timeout, and either (a) abandons the prework till "later" (see Drop-off risk #1) or (b) burns 25 minutes troubleshooting a problem the cohort onboarding could have pre-empted. Trainer cannot rescue — prework runs solo, asynchronously, possibly days before session 1.

**Severity:** **1 BLOCKING.** First-cohort risk; no recovery path inside the existing prework file.

### Beat 2 — Student opens prework.md, reads opener

**Student's job:** *"Read the contract. What's the next 30 minutes?"*

**Friction:** The opener is excellent — names the four artifacts (Claude Code open, content folder visible, bug picked, framing in head) and the timebox. The wizard frame appears as *"the wizard-move framing in your head"* with no hint at this point that the framing is a curated lecture they'll meet later. A skim-read student doesn't yet know *"wizard-move framing"* is a noun phrase pointing at a real artifact.

**Severity:** **3 POLISH.** Sub-second confusion, recovers immediately at Step 5.

### Beat 3 — Step 1: Pick THE repo

**Student's job:** *"Make the repo decision. Don't pick the wrong one."*

Tight. Four criteria, one decision, no friction. *"The Hello World you cloned to try Claude Code isn't it"* is the right tone — peer voice, not pedagogy. **No issue.**

### Beat 4 — Step 2: Start a Claude Code session in THAT repo

**Student's job:** *"Confirm the tool runs against this repo."*

**Friction / cliff:** Two minutes is allocated, but the failure case (*"if Claude Code isn't working, this is the moment to fix it"*) has no support path named in-body. Where does the student go? The maintainer block mentions *"one-line help prompt in the cohort Slack for classroom; self-study fallback TBD"* but the body doesn't tell the student that. A blocked student stares at the page.

This is where the missing JTBD-zero (Beat 1) cashes out. If install + auth was confirmed in cohort onboarding, this beat is 30 seconds. If it wasn't, this beat eats 25 minutes and the student is still on Step 2 of 6.

**Severity:** **1 BLOCKING** (depends on Beat 1 fix). If Beat 1 is fixed, drop to **3 POLISH** (just add a "stuck? post in #ae101-help" line to the body).

### Beat 5 — Step 3: Unzip the content folder

**Student's job:** *"Get the curriculum onto disk at the canonical path."*

Crisp. Two minutes. The phrase *"Stick to that path; the next step assumes it"* is doing real work — it tells the student *why* path discipline matters before the consequence lands. **No issue.**

### Beat 6 — Step 4: `/add-dir` to point Claude at the content folder

**Student's job:** *"Make Claude see the content folder this session."*

This is the first prompt block the student encounters. Markup check (rendered):

- Action lead-in present: *"In the Claude Code session you just opened, run this slash command. No edits needed."* — passes `check_prompts.md` §2 (one sentence, command verb, semantic).
- Destination chip: missing. The fenced block is bare with no `**Prompt** *(Claude Code)*` label. Inconsistent with Step 5's block (which has the label) and inconsistent with the new Copy-button-plus-destination-chip rendered chrome the rest of the curriculum uses.
- The path is hardcoded (good — placeholder fix landed).
- Parenthetical caveat (*"if you unzipped somewhere else, swap the path"*) is correct golden-path-only handling — recovery branch lives outside the prompt block.

**Friction:** the bare fenced block on first encounter looks slightly different from the labelled block at Step 5 — a tired student notices the inconsistency before they notice anything else, and may wonder if this one isn't a "real" prompt to copy.

**Severity:** **2 ANNOYING.** Easy fix: add `**Prompt** *(Claude Code, slash command)*` label above the fence so the rendered Copy-button + destination chip lights up the same way the next block does.

### Beat 7 — Step 5: The megaprompt

**Student's job:** *"Hand the rest of prework to Claude and follow along."*

Job count inside one fenced block:

1. Read `lectures/the-wizard-move.md` and report the framing back in <2 min.
2. Install curated skills (`content/skills/*`) to `~/.claude/skills/`.
3. Surface three candidate bugs from the student, screen them, help pick one.
4. Confirm the repo is ready for M1 (tests run, git clean, can PR).

That is **four jobs in one prompt** — but they are sequenced, named, and the lead-in tells Claude to *"ask one question at a time."* The 15-min budget is realistic.

**Specific concerns:**

- **Job 1 (read the wizard-move lecture and recite it back) is the weakest fit.** The lecture is 10 minutes of human-voiced prose designed to be *delivered* (5–7 min lecture + 3 min live demo per the lecture's maintainer block). Asking Claude to summarise it back to the student in <2 min strips the demo (the Context-is-King two-window contrast) — which is the whole pedagogy. The student gets an executive-summary-of-a-lecture instead of the lecture itself, then meets the lecture again at M1 opening and either (a) tunes out *"already heard this"* or (b) realises the prework summary missed the demo and now distrusts the prework summary. Both cases damage the wizard-move first impression.
- **Jobs 2–4 are coherent: install, screen bugs, sanity-check.** That's the actual prework job — set up the working state and pick the bug. Splitting the lecture-read off would leave a clean three-job prompt, lower cognitive load, and let the student read the lecture themselves (~5 min) as Step 0 or as part of Step 5's wait while Claude installs skills.
- **Job 2 (skill install) names paths inside the fenced block** — the prompt instructs Claude to copy folders and confirm `~/.claude/skills/<name>/SKILL.md`. This is correct (it's an install instruction, not a skill invocation), but the student-facing *result* (two skills installed personally) is named only in the maintainer block at the bottom. The body never tells the student *which* skills they're getting (`access-control-analysis` and `stride`). They will discover this later — which is fine for now, but flags as a curiosity gap a peer-voice page could close in one line ("you'll end up with two security-flavoured skills installed personally; you'll meet them at M3").
- **Job 4 (repo readiness check)** asks Claude to confirm tests run, git status is clean, can PR. Good — this is exactly the kind of cliff that would silently fail M1 Ex2 ("fix tests-first") if a student arrives at session 1 with a dirty branch and no test runner. Worth keeping.

**Severity:** **2 ANNOYING** for the Job 1 misfit. Lecture-summary-via-Claude is a design smell, not a blocker.

### Beat 8 — Step 6: Bring to M1 — *"no trick? bring a frustration instead"*

**Student's job:** *"Show up to session 1 with one thing in hand."*

The framing — *"what's one trick you figured out with Claude Code that nobody taught you?"* — is exactly aligned with the wizard-move strategy: every engineer is self-taught, the room pools partial knowledge, gift-first then climb (strategy doc lines 9–11, 196–198).

The fallback — *"no trick? Bring a frustration instead"* — does double duty. It defuses the impostor reflex (good), but it also waters down the wizard mood: *"come with magic OR come with pain"* lets a no-trick engineer show up with pain and the room's first 10 minutes becomes a complaint round. Strategy doc is explicit: *"a demonstration of what's *possible*, not an exposure of what's missing"* (line 11) and *"You'll watch what's *possible* — not what's missing. That's the posture of this training"* (wizard-move lecture line 29).

The frustration fallback is humane prework copy, but the room-opening dynamic risks pivoting on the first person who admits they don't have a trick. M1 *Connections* in `getting-going.md` doesn't pre-empt this — it just asks the trick question. The trainer will need to handle the first *"I have a frustration"* response live, which is a trainer-cannot-rescue moment for the prework's framing.

**Severity:** **2 ANNOYING.** Fix is small: the prework can keep the fallback (don't lose the impostor-reflex defuser), but M1's `getting-going.md` Connections section should add a one-line trainer note: *"if a student opens with a frustration, name it as a wish — what would the trick have been?"* — so the room's first move stays aspirational. Right now that note doesn't exist.

### Beat 9 — Days/weeks pass; session 1 begins

**Student's job:** *"Walk in. Sit down. Sync to the room."*

No friction in scope. The trainer projects the recap site (curriculum/CLAUDE.md classroom convention).

### Beat 10 — M1 Connections (10 min): trick exchange

**Student's job:** *"Share my trick. Hear the room's."*

`getting-going.md` Connections is a clean restatement of the prework question with a sticky/paste affordance. Good.

**Friction:** see Beat 8. If a student opens with a frustration and the trainer doesn't reframe live, the wizard mood stalls before the lecture even starts.

**Severity:** **2 ANNOYING** (same finding as Beat 8, surfaces here in execution).

### Beat 11 — M1 Lecture: The wizard move (10 min)

**Student's job:** *"Watch the demo. Get the framing."*

The lecture earns the wizard mood structurally:
- *"You've already done the hard part"* (line 5) — aspirational destination, not corrective gap. Passes `check_student_facing.md` §1.
- The Context-is-King two-window demo (Italy/Finland, then cardiologist) is the load-bearing pedagogy — same words, different answer, *because you told it who you are*. Strong.
- *"What this training refuses to do"* section is direct: no remediation, no certificate, no vendor pick. Earns trust with the L0–L3 audience.
- *"You become the Claude wizard by running the loop on real work"* (line 51) — names the wizard-as-promise and pivots to the bug-fix exercise.

**Verdict:** lecture delivers the wizard mood **on its own**. The demo is the moment the wizard frame goes from word to felt experience.

**However:** if Step 5's prompt has Claude pre-summarise the lecture in prework, the student arrives having heard "context is king, here's the abstract idea" without the two-window contrast. The demo's punchline (*"same words, different answer"*) lands as recognition rather than surprise. That is the prework-Step-5-Job-1 leak cashing out at the moment of highest pedagogical importance.

**Severity:** **2 ANNOYING** — but the cause is upstream at Beat 7.

### Beat 12 — M1 Ex1: Orient and introspect (15–20 min) — first exercise

**Student's job:** *"Run the orient + introspect move on my repo."*

The exercise is structurally sound:
- Three prompt blocks, each with action lead-in, each with `**Prompt** *(Claude Code)*` label + destination chip.
- The third "prompt" (`/context`) is a slash command, presented in a bare fenced block with the lead-in *"In the Claude Code chat, type:"* — this is correct treatment for a UI primitive (matches Step 4's `/add-dir` pattern, which inherits the same inconsistency flagged at Beat 6).
- The teaching beat — *"the self-report is a hypothesis, not ground truth"* + verify against `/context` — is the wizard move at instrument level. Earns Theme 4 (self-aware, grain of salt) experientially.

**First-impression promise check:** does this feel like a wizard move on first encounter? It feels like a **calm orientation move**, not a wow-mood move. The strategy doc names M1's mood as *"joyful creation — 'it works, on my repo'"* (line 221, line 240). Joyful creation is the **session-level** mood, not the per-exercise mood. Ex1 is the warm-up; the joy lands at Ex2 (PR ships) and Ex3 (rule-file written, ticket closed). That sequencing is correct — Ex1 is supposed to map the window, not deliver the bang. **Verdict: Ex1 fits its place; the wizard mood is delivered by the lecture demo + Ex2's PR-ships beat, not by Ex1.**

**Friction:** none significant. The transition *"You've seen the window. Hand off to the fix"* is clean.

**Severity:** none.

### Beat 13 — M1 Ex2: Fix tests-first (35–40 min) — second exercise

**Student's job:** *"Ship the PR on my own bug, tests-first."*

This is the wizard-mood payoff beat. PR ships, on the student's real repo, on the bug they brought from prework. The strategy doc's *"it works, on my repo"* mood lands here.

**Friction:** *"Bring the bug back. In prework, Claude surfaced three candidates and you picked one. Paste the bug (a sentence or two) back into the conversation. If prework's scrollback is still open, tell Claude to look back."* — this is the prework-to-M1 handoff seam and it works **only if the student is on the same Claude Code session as prework**. If the student opened a fresh Claude Code session for M1 (which a careful engineer might do — "fresh session for the live exercise"), the prework scrollback is gone, the bug must be re-stated, and the *"tell Claude to look back"* phrase confuses. The exercise body covers both cases (paste a sentence OR look back) but the two paths aren't named — they're collapsed into one sentence.

**Severity:** **3 POLISH.** Add a one-line clarifier: *"Same session as prework? Tell Claude to look back. Fresh session? Paste the bug in a sentence."*

## Severity-ordered fix list

### S1 BLOCKING

**S1.1 — Add a JTBD-zero cohort onboarding email (or prework Step 0).**
Spec: a one-page note that lands in the student's inbox alongside the cohort link, covering: (a) Claude Pro/Team license activation (where to click in desktop, or `claude login` in CLI), (b) install path verification (`claude --version` or equivalent), (c) corp-proxy escape hatches the customer's IT has cleared (named per cohort), (d) one-line "stuck? post in #ae101-help" path. File location: `curriculum/trainings/agentic-engineering-101/cohort-onboarding-email.md` (new), or as a "Step 0: Before prework" section at the top of `prework.md`. Trainer-side template lives in maintainer block; per-cohort customisation by ops team.

**Why blocking:** every other fix in this list assumes Claude Code runs. If it doesn't, none of them matter. First-cohort risk is high — corp-laptop variance is the single biggest source of prework abandonment in any tools-based training.

### S2 ANNOYING

**S2.1 — Split prework Step 5: lift Job 1 (wizard-move lecture read) out of the megaprompt.**
Spec: rename Step 5 to *"Let Claude set you up for M1 (15 min)"* with three jobs in the prompt body (install skills, screen bugs, sanity-check repo). Add a new Step 0 or Step 5a: *"Read [The wizard move](../../lectures/the-wizard-move.md) — 5 min."* No prompt block; just a direct read link. Reasoning: the lecture is human-voiced prose with a load-bearing two-window demo; Claude paraphrasing it strips the pedagogy. Side benefit: when Claude installs skills (Job 2 in the trimmed prompt) the student has 60–90 seconds of dead time — perfect window to read the lecture if not done as Step 0.

**S2.2 — Add `**Prompt** *(Claude Code, slash command)*` label to Step 4's `/add-dir` block.**
Spec: match the canonical presentation shape (`check_prompts.md` §3) so the rendered Copy-button + destination chip lights up consistently. One-line edit. Same fix on Ex1's `/context` block (line 35–37 of `orient-and-introspect.md`). Treating slash commands as bare fences is inconsistent with the rest of the curriculum and breaks the "every prompt block looks the same" affordance the new chrome was built for.

**S2.3 — Pre-empt the "I brought a frustration" room-dynamic in M1 Connections.**
Spec: in `getting-going.md` Connections section, add a one-line trainer note inside the maintainer block: *"if a student opens with a frustration, name it as a wish — 'what would the trick have been?' Keeps the room aspirational, not corrective."* Optionally, soften the prework fallback from *"no trick? Bring a frustration instead"* to *"no trick yet? Bring the move you wish you had — the thing you keep hitting that should have a trick."* Reframes the fallback as a forward-looking wish rather than a backward-looking complaint. Maintains the impostor-reflex defuser.

**S2.4 — Name the two installed skills in prework body, not just maintainer block.**
Spec: at end of Step 5 body, add one line: *"You'll end up with two skills installed personally — `access-control-analysis` and `stride`. You'll meet them at M3."* Closes the curiosity gap; signals forward arc; reinforces the personal-vs-team install pattern.

### S3 POLISH

**S3.1 — Step 2 add the support path to body.**
Spec: replace *"if Claude Code isn't working, this is the moment to fix it"* with *"if Claude Code isn't working, this is the moment to fix it. Stuck? Post in your cohort Slack channel."* The cohort-specific channel name lives in the cohort onboarding email; this line is the bridge.

**S3.2 — Ex2 disambiguate the bug-recovery sentence.**
Spec: in `fix-tests-first.md`, change *"If prework's scrollback is still open, tell Claude to look back"* to *"Same session as prework? Tell Claude to look back. Fresh session? Paste the bug in a sentence."*

**S3.3 — Beat 2 polish: name the wizard-move artifact.**
Spec: in prework opener (line 3), change *"the wizard-move framing in your head"* to *"the wizard-move framing in your head (you'll read the lecture in Step 5a)"* — only if S2.1 lands and Step 5a exists. Otherwise leave alone.

## Wizard-move first-impression check

**Verdict: M1 delivers the wizard mood IF prework Step 5's lecture-summary job is removed.** As currently written, prework asks Claude to give the student a 2-minute paraphrase of the wizard-move lecture, which strips the demo (the load-bearing two-window contrast) and pre-spoils the lecture's punchline before the trainer delivers it.

**Quoted lines that earn the mood (lecture, line 5 + line 29):**
> *"You've already done the hard part. You found this training because you use Claude Code regularly and you want to get further with it. That's who we built this for. Nobody here needs the 'agents can write code' setup."*
> *"You'll watch what's *possible* — not what's missing. That's the posture of this training."*

These are aspirational-destination, not corrective-gap. They pass `check_student_facing.md` §1 cleanly.

**Quoted lines that risk leaking the mood:**
- Prework Step 5 prompt (line 43): *"Read lectures/the-wizard-move.md from the content folder and tell me the framing in your own words, in under two minutes. I want it landed before Module 1 starts."* — This pre-summarises the lecture. The two-window demo is the framing, and Claude can't deliver a two-window demo as a summary.
- Prework Step 6 (line 57): *"No trick? Bring a frustration instead."* — Acceptable as impostor defuser, risky as room-opener. See S2.3.

**Demo-move check:** the lecture's maintainer block (line 65) names the live demo: *"3 min live two-session demo on the volunteer's codebase."* The trainer projects this. The first time the trainer projects the site live is at this moment, in M1 Connections (sticky/paste affordance) and the lecture demo. **No earlier live-projection moment exists in the curriculum** — first-cohort trainer should rehearse the demo on a real volunteer codebase before session 1 (this is a pre-cohort-todos concern, flagged for the separate audit but worth naming here).

**Aspirational vs corrective rendering:** clean throughout the lecture and Ex1. Ex2's *"diff rubber-stamp"* push-back (in maintainer block, not body — correct placement) is the only corrective beat in M1 and lives in the trainer's playbook, not the student's reading material.

## Prework → M1 handoff matrix

| Prework artifact | M1 use point | Verdict |
|---|---|---|
| Chosen repo (Claude Code open in it) | Ex1 prompt 1 reads the repo; Ex2 ships PR against it; Ex3 writes `./CLAUDE.local.md` in it | **USED IMMEDIATELY** — every exercise lives in this repo |
| Content folder added via `/add-dir` | Ex1+Ex2+Ex3 prompts assume Claude can read `lectures/`, `exercises/`, `content/skills/`, `reference/` from the content folder; M1 Ex3 compound step promotes the path to `.claude/settings.local.json` | **USED IMMEDIATELY** + promoted to permanent in Ex3 |
| Picked bug (in scrollback) | Ex2 opens with *"Bring the bug back… paste the bug back into the conversation"* | **USED IMMEDIATELY** — Ex2 is the bug fix |
| Two skills installed at `~/.claude/skills/` (`access-control-analysis`, `stride`) | M1 does NOT invoke either skill. Strategy doc line 497: *"M1: None — `/context` is a slash command, MCP is a connector. First Skill use lands at M3"* | **USED LATER (M3)** — installed at M1 prework, first invoked at M3, three weeks later in a six-week cadence |
| Wizard-move framing read by Claude (Step 5 Job 1) | Lecture is re-delivered live at M1 opening | **REDUNDANT** — pre-summary then live re-delivery; the pre-summary either spoils or under-delivers the demo |
| Repo readiness confirmation (tests run, git clean, can PR) | Ex2 needs all three to ship | **USED IMMEDIATELY** — gates the PR ship |

**Flags:**

- **Two skills installed three weeks before first use.** Not "wasted" — installing during prework is correct (avoids classroom-time install); but the prework body doesn't tell the student why or when they'll meet the skills (S2.4). A skim-reader sees an opaque copy-skills-to-folder step and may wonder if it's load-bearing.
- **Wizard-move pre-summary is the only true REDUNDANT entry.** The lecture is delivered twice — once as a Claude paraphrase in prework (without the demo), once live by the trainer with the demo. Drop the first; keep the second. (S2.1.)

## Drop-off risk map

Where would a busy L0–L3 IC say *"I'll do this later"* mid-prework and never come back? Three candidates ranked.

### #1 — Step 2 ("send a prompt, read a file"), if Claude Code isn't installed/auth'd

**Trigger:** auth wall, corp proxy timeout, unclear license activation step. The student hits a hard error 90 seconds into prework, Slack is silent (it's evening), and *"I'll deal with this tomorrow"* is the rational move. Tomorrow becomes session 1, where they're now visibly behind. **Mitigation:** S1.1 (cohort onboarding email).

### #2 — Step 5 megaprompt at the "screen three bugs" beat

**Trigger:** the engineer doesn't have three bug candidates in their head. Surfacing three takes 15 minutes of repo scrolling and Linear/Jira hunting. The 15-min Step 5 budget blows out to 30+. *"I'll pick the bug at the start of session 1"* feels reasonable. But session 1 doesn't have time for bug-surfacing — Ex2 assumes the bug is already chosen. **Mitigation:** the prompt's lead-in is good (*"Ask me for three bugs"*) but the prework opener could foreshadow this earlier — e.g., a one-line "have your tracker tab open" hint at Step 1 so the student arrives at Step 5 with bug candidates loosely in mind.

### #3 — Step 3 ("unzip the content folder"), if the student hits a corp file-extraction policy

**Trigger:** some EDR/MDM tools quarantine zips downloaded from non-allowlisted domains. Engineer downloads zip, unzip fails, no error message, abandons. Lower probability than #1 but higher than zero. **Mitigation:** in cohort onboarding email (S1.1), name the canonical hosting domain so IT can pre-allowlist. Per-cohort customisation by ops.

---

**Out of scope for this audit (flagged for the separate agents):**
- Maintainer-block readiness for first-cohort trainer (separate agent).
- Context-decay across multi-week cadence (separate agent).
- M2+ modules (this audit is prework + M1 only).
- Step 5 prompt audit at depth beyond the four-jobs-in-one-block finding (a separate prompt-audit agent owns that surface).
