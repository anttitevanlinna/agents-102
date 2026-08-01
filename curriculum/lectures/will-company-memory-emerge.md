# Will company memory emerge?

You just walked your whole system against a real task and sent it off. The persistent part of what you walked, the rules and notes and skills that outlast the session, is what this training calls memory.

## Personal, team, company: memory's three layers

- The word is not settled. Some practitioners say memory, some say context, some just say rules, or the files. The labels collide for a reason worth knowing: *context* already names the live window the agent holds while it works, the part that empties when the session ends. Memory is what survives. Pick whichever word you'll defend.
- The two questions the label hides: where does this stuff live, and who is allowed to change it? Walk them across what you just sent off, and three layers appear.
- **Personal.** `./CLAUDE.local.md` (gitignored), your `observations/`, the skills you authored. Written by you, for you. The layer you've watched compound since your first rule.
- **Team.** `./CLAUDE.md`, changed only through PR review. The rules the team agreed were worth sharing. A clear home and a clear gate.
- **Company.** No obvious file. The security convention every team re-learns on its own, the deployment pattern, the house style. Today it lives in wikis nobody opens and in the heads of whoever has been there longest.

## The third layer is still finding its home

- Does the third layer get a real home, the way the first two already have? The personal layer clearly compounds; the evidence sits in your own `observations/`. The team layer has a home and a gate. The company layer is the one still being worked out, in the places betting on it.
- Some teams are starting to act as if it will. They git-track their rules instead of keeping them on one laptop; they symlink a shared skills folder so the same rules load wherever an engineer works. If a company's conventions live as memory that loads everywhere, every agent in the building starts from the same baseline instead of relearning it one session at a time.

## The hard part is the shape

- The hard part is not whether to build it. It is the shape. A company layer done wrong is a tax: memory loaded everywhere, owned by no one, the `CLAUDE.md` equivalent of the staff handbook nobody reads. The question that matters is the smallest shared layer that survives contact with a real org.
- You'll meet the answers in your own org before any framework hands them to you. The first time a rule you wrote for yourself turns out to be true for the whole company, you decide what to call it and where it goes. That is the open question.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** bullets kept on all three slides; bold reduced to the three layer handles **Personal.** / **Team.** / **Company.** on slide 1. All other leads de-bolded (slide 1 bullets 1–2, slide 2 and slide 3 fully plain); lede untouched. Per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Wording near-verbatim; no claims added or cut.

**Slides-only pass (2026-07-02, unaudited):** prose deleted outright where a slide supersedes it (Path A; git carries it). Per-passage verdicts: opening walked-and-sent paragraph KEPT as the closer's setup lede (two sentences; earns "memory" in one breath before the slides use it) · naming-terrain paragraphs CONVERTED (slide-1 bullets 1–2; "no winner yet" folded into "pick whichever word you'll defend") · three-layer list CONVERTED near-verbatim (slide-1 bullets 3–5); "since Module 1" → "since your first rule" (§3 fix: the lived moment, not the module number) · third-layer question + teams-acting + tax paragraphs CONVERTED (slide 2) · "Nobody has cracked the shape yet, and nobody has settled the word" summary line SUBSUMED (both halves already live in their bullets) · closing you'll-meet-the-answers paragraph CONVERTED as slide-2 final bullet. §3 disposition: 1×"Module 1" ref dead; zero `M[0-9]` above the fence.

**Quality:** compendium-audited 2026-07-12 (writing@b3143a4 story@b3143a4 technical@b3143a4 behavior@b3143a4 pedagogy@b3143a4 strategy@b3143a4 slides@b3143a4)
- judges @b3143a4: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Lecture meta:** *~3-4 min, now deck-shaped (lede + 2 slides). Module 4 closing lecture. Fires AFTER the send-off, while the agent runs, the reflective coda over the launched run. Names the layering the student just walked (personal / team / company) and opens the company-layer question as a live debate. It does NOT resolve the question, and it does NOT touch how the run will go (that is `reading-the-return`'s M5-prep job, so the Module 4 to Module 5 cliffhanger holds). Meta-frame closer per `check_lectures.md` #1: recognition after the walk, not an abstract claim before it. Opens on the naming terrain (memory / context / rules), deliberately unsettled; the trainer lays out how the terms fit and runs the disagreement as a live discussion, landing nothing. Overlaps the send-off wait, so it adds little to the M4 critical path.*

**Why tentative, and where the tentativeness lives.** The company layer is a believed direction, held by practitioners and inside the project, not a fringe dogfood aside. What is NOT yet figured out is the shape: how a company layer stays small enough to be real, who owns it, how it loads. So the open question in body is the HOW, not the WHETHER. Two threads are deliberately left open in body: the company-layer shape, and the word itself; neither is settled here. Claim-discipline still holds: don't assert a settled implementation shape in body as if the field had converged on one. `training-architecture.md` § Rule files remains the authority on what AE101 actually ships today (team `./CLAUDE.md` + personal `./CLAUDE.local.md`, no company layer yet).

**Vocabulary.** Surfaces the naming disagreement openly instead of defending one word. States the memory/context distinction precisely (context = the live runtime window that empties at session end; memory = what persists), per `check_student_facing.md` §4. Does NOT adopt the run feedback's "rename to context" (it would break that split and collide with Claude Code's auto-memory namespace) but does NOT pretend the word is settled either. The student picks the label; the lecture holds the distinction. The training-wide memory→context decision stays parked; this lecture opens the room-level conversation only.

**Voice.** Martin (frame the move and its alternative) leads; Rory carries the reframe (more shared memory is not automatically better). Risto does NOT lead. The Module 4 to Module 5 gap holds the run's unease open, and forward-optimism would resolve the doubt M5 cashes in.

**Does not steal M6.** M6 teaches the kit, second-skill authoring, and evals. This lecture poses a layering question the curriculum has not decided and M6 does not answer either. No pre-teaching.

**Source note.** The observable moves named (teams git-tracking rules, symlinking a shared skills folder) are general practitioner practice, kept deliberately unattributed and uncounted. If a concrete company example is wanted (e.g. a named skill-marketplace pattern), it needs a verified within-6-months source before it lands in body.

<!-- backing -->

Format → `curriculum/backing-format.md`. This is the file's only source ledger; the `**Source note.**` block above is absorbed here.

**The one thing to know about this file.** It is a closing lecture that opens a question and deliberately lands nothing, so almost every line is `vision` and owes nothing. Two lines are not: the three-layer file inventory on slide 1 is a **platform capability claim** that moves, and the teams-are-starting-to-act bullet on slide 2 is a **practitioner claim** currently carrying no attribution. Those two are where the debt is.

**Claims**
- `memory-is-what-persists` · vision · "The persistent part of what you walked, the rules and notes and skills that outlast the session, is what this training calls memory." ← none-owed — the training's own definition, flagged as such by *"what this training calls."*
- `word-not-settled` · vision · "The word is not settled. Some practitioners say memory, some say context, some just say rules, or the files." ← none-owed — the maintainer's read of the terrain, and the lecture's deliberate refusal to pick.
- `context-empties-memory-persists` · detail · "*context* already names the live window the agent holds while it works, the part that empties when the session ends" ← cc-memory-docs. Definitional and correct; `check_student_facing.md §4` requires this split be stated precisely and it is.
- `three-layers` · vision · personal / team / company ← none-owed — the training's own framing, and the spine of the lecture.
- `personal-layer-home` · detail · "`./CLAUDE.local.md` (gitignored), your `observations/`, the skills you authored" ← cc-memory-docs. `observations/` is our convention, not a platform path — correctly named by location rather than by a reserved term.
- `team-layer-home` · detail · "`./CLAUDE.md`, changed only through PR review" ← cc-memory-docs. The file is the platform's; the PR gate is org convention, not enforced by the tool.
- `company-layer-has-no-file` · detail · **"Company. No obvious file."** ← cc-memory-docs, cc-server-managed-settings, local-probe-2026-08-01 — **and the sources CONTRADICT the claim. See Flagged; this is false as written and owes a card.** The live probe is listed alongside the docs deliberately: it is what keeps the correction honest, showing the tier is opt-in and absent on an unmanaged machine rather than something every student already has.
- `teams-are-starting-to-act` · detail · "They git-track their rules instead of keeping them on one laptop; they symlink a shared skills folder so the same rules load wherever an engineer works." ← `[SOURCE NEEDED]` — deliberately unattributed as general practice; an OODA is testing whether it can be named.
- `shape-is-the-hard-part` · vision · "The hard part is not whether to build it. It is the shape." ← none-owed — the file's thesis, and the position `memory/company-context-layer-believed-direction.md` records: doubt on the HOW, not the WHETHER.
- `done-wrong-is-a-tax` · vision · "memory loaded everywhere, owned by no one, the `CLAUDE.md` equivalent of the staff handbook nobody reads" ← none-owed
- `youll-meet-it-in-your-org` · vision · "You'll meet the answers in your own org before any framework hands them to you." ← none-owed — the closing move, and deliberately the only thing the lecture asks of the student.

**Sources**
- cc-memory-docs `[checked:2026-08-01 result:CORRECT due:cohort]` https://code.claude.com/docs/en/memory.md — [vendor documentation, authoritative for capability] Fetched whole and read first-hand, not taken from the capability agent (`check_platform_and_boundaries.md §4`, trust-but-verify). **A managed-policy tier sits ABOVE project `./CLAUDE.md`**, at `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS), `/etc/claude-code/CLAUDE.md` (Linux/WSL), `C:\Program Files\ClaudeCode\CLAUDE.md` (Windows). The docs describe it as *"Organization-wide instructions managed by IT/DevOps"*, scope *"All users in organization"*, and give its example contents as **"Company coding standards, security policies, compliance requirements"** — which is verbatim the list slide 1 says has no home. Also: *"Organizations can deploy a centrally managed CLAUDE.md that applies to all users on a machine. This file cannot be excluded by individual settings."* Deployment is via MDM, Group Policy or Ansible. `result:CORRECT` because it corrects a live body claim.
- cc-server-managed-settings `[checked:2026-08-01 result:OK due:cohort]` https://code.claude.com/docs/en/server-managed-settings.md — [vendor documentation, authoritative for capability] Fetched and read first-hand. A `claudeMd` key carries managed CLAUDE.md content inside managed settings: *"The `claudeMd` key lets you put managed CLAUDE.md content directly inside `managed-settings.json` instead of deploying a separate file."* Precedence *"same as a managed CLAUDE.md file. Loads before user and project CLAUDE.md."* Honored in *"managed and policy settings only."* **Gated: "Claude for Teams or Claude for Enterprise plan."** The file-based managed CLAUDE.md above carries no such licence gate.
- local-probe-2026-08-01 `[checked:2026-08-01 result:ATTESTED due:none]` attested:Claude 2026-08-01 live-probe — [maintainer-attested] `check_platform_and_boundaries.md §5a` live-test. Probed the managed-policy paths on this machine: `/Library/Application Support/ClaudeCode/CLAUDE.md` **absent**, `/etc/claude-code/managed-settings.json` **absent**, `~/.claude/CLAUDE.md` present. Load-bearing nuance and the reason the lecture is not simply wrong: **the tier exists and is opt-in, not default.** An org gets it only if IT deploys it. So *"no obvious file"* is false, while *"today it lives in wikis nobody opens"* may well still be true of most companies — which is a claim about adoption, not about the platform.

**Frameworks**
- Personal / team / company layering · [borrow:none — house framing] · law:none · ← none-owed. Ours. Do not attribute; no external source coined this split for agent memory.

**Stance** `[stance:2026-08-01 level:L1]`
- holds: the platform side is now settled and documented — an org-wide memory tier exists, is auto-loading, cannot be excluded by users, and its documented purpose is exactly the content this lecture says is homeless. That part is `[vendor documentation]`, authoritative for capability and worth nothing for significance.
- contested: **whether anyone actually uses it, which is the question the lecture really cares about.** A shipped mechanism is not an adopted practice, and the file's own thesis — the hard part is the shape, not the whether — is untouched by a docs page. Two OODAs are open on that: can `teams-are-starting-to-act` be attributed to named practitioners, and has anyone published a company-layer shape that works.
- would-move-it: named orgs reporting they run a managed-policy CLAUDE.md and what happened to it — success would close the lecture's open question, and failure (*"it became the handbook nobody reads"*) would confirm the thesis and be more valuable than success.

**OODA**
- question: the lecture asks whether the third layer gets a real home. The platform half is answered — it has one. The live half is whether orgs use it, in what shape, and whether the shared layer rots the way the lecture predicts.
- roster: Simon Willison, Armin Ronacher, Addy Osmani, Kieran Klaassen, Dex Horthy, Birgitta Böckeler, Geoffrey Litt, Steve Yegge; plus `platform-watch/coding-agents/state.md` and public company repos carrying org-level `.claude/` conventions.
- last-run: 2026-08-01

**Flagged**
- `[found:2026-08-01]` **"Company. No obvious file." is false, and it is a platform claim on a projected slide.** A managed-policy CLAUDE.md tier is documented, sits above project level, auto-loads, cannot be excluded by individual settings, and its documented example contents are *"Company coding standards, security policies, compliance requirements"* — the lecture's own list of homeless conventions, item for item. Verified first-hand against `memory.md` and `server-managed-settings.md`, not taken from the capability agent. → **Owes a card.** The fix is not simply deleting the sentence: the tier is opt-in and absent on an unmanaged machine (live-probed), so the honest correction distinguishes *the platform has no file* (false) from *your company has not filled one in* (probably true, and the more interesting claim). Done well this **strengthens** the lecture — the shape question gets sharper when a file already exists and is still empty.

<!-- /backing -->

- section-3 sweep 2026-07-02: 2 refs judged, 0 fixed, 0 carve-out. "since your first rule" (body) = lived-arc phrasing, already the §3-compliant fix of the former "since Module 1" (converted in the slides-only pass); "you just walked... and sent it off" (lede) = within-module closer setup, not cross-module sequencing. Zero `M[0-9]`/module-name hits above the fence.
