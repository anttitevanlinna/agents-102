# Bootstrap Cowork-edition audit — mid-competent practitioner sim

Reading filter: Cowork. `.rt-code` content skipped; `.rt-cowork` and unwrapped prose only. Prompt chip read as **Cowork**. SVP/director, agentic-curious, follows instructions, takes notes.

---

## Prework — mood 7

The Cowork swap reads cleanly. *"your working directory is already connected in Cowork"* lands; *"Cowork enabled in your Claude Desktop app — the Cowork tab next to Chat"* is plain. Snake game and meetings tasks are runtime-agnostic — both work as written.

**Cowork-specific gaps.** None severe. One small odd note: the prompt chip says *(Claude Code)* in the source — the brief says it auto-renders as Cowork, so I trust it, but as a reader I'd appreciate seeing it spelled "Cowork" once in the prework prose itself (the chip is the only place "Cowork" reads as the runtime name; everywhere else it's "your session" or "your working directory").

**What worked:** *"You ask, the agent does."* — first agentic move framed as a sentence I'd remember.
**What slowed me:** *"in Claude Code, click the **+** button next to the prompt, then **Settings → Connectors**."* I'm in Cowork, not Claude Code. Is the path the same? The prose forgot the runtime here.

**Verdict:** APPROVE-WITH-TODOs. Fix the one *"in Claude Code"* setting-path leak.

---

## M1 — Getting Going + personal-site-with-guardrails — mood 9

Joyful creation. Site got progressively more "me" through five framework moves, packaged in a rules file. The Cowork swap on the Debrief's `/clear` move is excellent — *"Start a new Cowork session on the same connected folder"* is exactly the right concept.

**Cowork-specific gaps.** Phase 1 paste step 3: clean Cowork variant. No orphan sentences. The whole exercise reads runtime-agnostic except step 3, which is correctly forked.

**What worked:** *"name the framework, tune it, ask Claude to run it. The model already knows StoryBrand."* — the move I'll use Tuesday.
**What slowed me:** *"Run /clear in your session"* is hidden under `.rt-code` so I don't see it, but the Cowork variant says *"Start a new Cowork session on the same connected folder."* Wait — does that lose my generated `site.html`? The connected-folder model means files persist; I figured it out, but a single sentence reassuring "the file stays; the conversation context resets" would have saved 30 seconds of doubt.

**Verdict:** APPROVE.

---

## M2 — Building Agent Systems + name-your-challenge + build-your-challenge-memory — mood 8

Satisfied compounding. Memory built, agent runs against it, Phase 3 sharpens the thinnest page. Plan-mode swap to *"ask Claude to write a plan first"* in the Cowork variant is one of the cleaner runtime divergences in the file.

**Cowork-specific gaps.**

1. The module file's What-You'll-Learn line: `.rt-code` says "Use Claude Code's plan mode"; `.rt-cowork` says "Ask Claude to write a plan first." Good.
2. **Prework reference inside the module file leaks Code-mode language.** The Meta says "*Plan-mode primer (15 min)*" — I don't have plan mode, I have prompt phrasing. The prework link target probably forks correctly, but the *label* in the module file does not. As a Cowork reader hitting that bullet, I read "plan-mode primer" and think the whole prework was authored for the other runtime.
3. Beat 3 paragraph reads cleanly in Cowork — *"Before you do anything, ask Claude to write a plan first"* is well-constructed.
4. **Tiny:** the *"What asking for a plan just did for you"* paragraph is excellent in Cowork.

**What worked:** *"A library without a librarian is a cost. Give it one."*
**What slowed me:** the Module 2 Meta bullet *"Plan-mode primer (15 min)"* — Cowork doesn't have a plan mode. The prework label survived from the Code edition.

**Verdict:** APPROVE-WITH-TODOs. Re-label the prework bullet so it reads runtime-neutrally (e.g., "*Plan-first primer*" or fork the label).

---

## M3 — Multi-Agent Systems + three-retrievers-three-minds — mood 6

Unsettled competence — landed as designed. The wonder.md line is honest. But the Cowork edition has the most surface area of any module and the joins are not all flush.

**Cowork-specific gaps.**

1. Phase 1 setup: *"Open four Cowork sessions on this connected folder."* OK — but I read the `.rt-cowork` block carefully: *"Self-study: Teacher Claude walks you through this if you get stuck; it's the highest-friction step in the module."* That's reassuring, but as a mid-competent reader I had a moment of *"can I really run four Cowork sessions on the same connected folder simultaneously?"* The maintainer block says yes, capability-confirmed for Code. Cowork concurrency on one connected folder is **not** explicitly confirmed in the maintainer notes — and the Cowork swap is recent. A one-line "yes, four Cowork tabs on the same connected folder works" in the body would calm me.
2. Subagent → agent vocabulary swap is consistent throughout the body. Good.
3. **Stray:** "Same shape as the agent files you built in Module 2, but spawned inside this session instead of saved as files." Fine.
4. The plug-point block says retrievers use the **+** button. In Cowork this should also be valid (Cowork has connectors and attachment); not flagged as a problem, just noted.

**What worked:** *"The filesystem is the meeting room in both."* and *"The seams are where the work fails, not where the work lands."*
**What slowed me:** *"Four Cowork sessions on this connected folder."* I want a sentence saying it's been verified in Cowork. As written, this is the highest-friction step the file admits to, and the Cowork variant has the least testing.

**Verdict:** APPROVE-WITH-TODOs. Capability-confirm Cowork four-session concurrency in the maintainer notes (and one-line reassurance in body).

---

## M4 — Security + module-4-prework + audit-your-agent — mood 5

Deepened unease, as designed. The plugin-authoring framing is the heaviest lift in Bootstrap, and the file admits this in its own todo at top — Phase 0 timing (3 min) doesn't carry first-time plugin authoring.

**Cowork-specific gaps.**

1. Plugin install: *"Cowork: click *Save plugin* in the chat — it registers in your library."* Clean Cowork-specific install instruction. Good.
2. Phase 0 prompt is runtime-neutral — the plugin description is identical regardless of runtime. Good.
3. *"Start a new session — plugins load at session start, not into the current one."* Reads fine in Cowork (I open a new Cowork tab on the same connected folder).
4. **One concern:** the prework reading 1 says *"the plugin is then installed in your runtime so the skills become invocable by name in any new session."* For Cowork, "your runtime" means "your Cowork library." I follow it, but a Cowork reader new to plugins benefits from one sentence: *"In Cowork, your authored plugin lives in your plugin library and loads in any future Cowork session on this folder."*

**What worked:** *"'I can't tell' is a real answer."* Whole exercise hangs on this one rule and it lands.
**What slowed me:** Phase 0 says 3 minutes. I'm authoring my first plugin ever, against four policy reference files I'm reading for the first time. Three minutes is fantasy. The maintainer todo at top of the security.md file flags exactly this. Cowork doesn't change the math.

**Verdict:** APPROVE-WITH-TODOs (existing maintainer todo covers it).

---

## M5 — Output Quality + hallucination-bakeoff — mood 7

Mechanical rescue lands. The scoreboard moment is real even in Cowork — the mood depends on watching agents work in parallel, not on which runtime label they carry.

**Cowork-specific gaps.**

1. Phase 1a / Phase 1b each have a `.rt-code` and `.rt-cowork` block with the prompts. The Cowork blocks read cleanly; subagent → agent swap is consistent.
2. *"Watch the four agent lines scroll past."* Reads correctly in Cowork.
3. *"Five files in a minute or two."* — does Cowork dispatch four agents in parallel? Same concurrency question as M3. Maintainer notes say three-subagent version is confirmed in Code; *"five should behave identically."* Cowork concurrency: untested in the file. Same gap as M3.
4. **Self-consistency Phase 1b** — the spawn-then-brief-then-collate flow is ambitious and depends on the runtime supporting genuinely concurrent dispatch. Cowork variant doesn't get a special note about this. If Cowork's agent dispatch is sequential rather than concurrent, the "watch them work in parallel" mood is replaced by a wait.

**What worked:** *"The scoreboard IS the explanation."*
**What slowed me:** *"Spawn all four in parallel."* I've never spawned four agents in Cowork. Will I see them on screen the way the prose implies? No screenshot, no reassurance. The runtime label says Cowork; the experience-promise reads like Code Desktop.

**Verdict:** APPROVE-WITH-TODOs. Confirm Cowork four-agent parallel dispatch behaviour and add one line about what the student actually sees in the Cowork tab.

---

## M6 — Evaluations + eval-loop — mood 9

Unleashed leverage. Walk-away worked even reading the file — I felt the trick. The judge-immutability check via SHA diff is the kind of disciplined detail that earns trust.

**Cowork-specific gaps.**

1. The big `<div class="rt-cowork">` block carrying the orchestrator prompt is intact and well-edited — every "subagent" → "agent" swap landed, and *"Cowork has no per-file ACL"* replaces the Code-side language correctly.
2. Maintainer notes flag *"long-running single session AMBIGUOUS as of 2026-04-24"* for Code. Cowork has a verified walk-away per the project CLAUDE.md (*"Multi-session and walk-away both verified working"*) — this is a place where Cowork is **stronger** than Code, but the body doesn't say so. Missed marketing.
3. Phase 2b *"open module-6/runs/round-1/judgment.md once it lands"* — Cowork's connected-folder model handles this, but a Cowork reader may not know whether they need to open the file in Cowork or in Finder. Minor.

**What worked:** *"A yardstick you can rewrite is not a yardstick."* Best sentence in the training.
**What slowed me:** *"Step away from the session."* In Cowork, do I close the tab? Leave it open? The walk-away mechanic is more familiar in Code (terminal running). Cowork-specific reassurance — "leave the tab open; come back to it; the orchestrator continues" — would help.

**Verdict:** APPROVE.

---

## M7 — From Personal to Team + share-your-work — mood 8

Generous impulse. The JTBD reframe is the strongest single move in the back half of Bootstrap. Cowork-neutral content — almost nothing in this exercise turns on runtime, because the work is human strategy, not agent plumbing.

**Cowork-specific gaps.**

1. The prompt chip reads *(Builder Claude)* throughout this exercise — not *(Claude Code)*. That's the AE101 host-skill convention. In a Cowork-mode read, *(Builder Claude)* renders literally — I think *"who is Builder Claude?"* The other modules use *(Claude Code)* which auto-renders as Cowork. M7 doesn't get the auto-rename treatment because the chip name is different.
2. *"In self-study, ask Teacher Claude to read all your module-7 files."* Teacher Claude is also an AE101 / self-study skill convention. A Cowork-trained-and-ready buyer hitting this exercise without prior context wonders if Teacher Claude is a thing they're supposed to have installed.
3. Branch A mentions Cowork as a cloud agent platform option (alongside N8N, Power Automate). Slightly recursive — I'm already running in Cowork. Reads fine, but interesting.

**What worked:** *"A candidate picked because it fits the infrastructure is shopping. A candidate picked because it moves the outcome is design."*
**What slowed me:** *(Builder Claude)* prompt chip on every Phase prompt. I had to mentally translate it to "Cowork."

**Verdict:** APPROVE-WITH-TODOs. Decide whether *(Builder Claude)* renders to Cowork in Cowork mode like *(Claude Code)* does, or rename the chip.

---

## M8 — Agents Building Agents + extend-your-system + joint-double-diamond — mood 9

Awe + curiosity. The flywheel beat lands. Identity-naming close is restrained — no graduation, just a name. Worked.

**Cowork-specific gaps.**

1. Same *(Builder Claude)* chip issue as M7 throughout both exercises.
2. *"Cowork-native for Cowork — both real now"* in the maintainer notes for M8 module file. Body of the joint-double-diamond exercise mentions *"Cowork-native variant is the future shape; either is acceptable."* Reads as still-aspirational even though the project CLAUDE.md says Cowork is current. Tense mismatch.
3. The exercise reads runtime-light — the work is humans + agents at room scale, the orchestration assumes shared filesystem (or Cowork-native). For a Cowork reader, "shared filesystem" via the connected folder is the natural answer. Body doesn't make this explicit.

**What worked:** *"You do not graduate. You have a flywheel."*
**What slowed me:** *"Twenty agents (or in self-study, one student's M1–M7 stack...) are about to read each other's memory folders."* — in Cowork, is each student's memory folder reachable by other students' agents? The connected-folder model is per-user, not shared by default. The exercise assumes this works without explaining how.

**Verdict:** APPROVE-WITH-TODOs. Spell out the cohort-level shared-context mechanism in Cowork — is it a shared connected folder, a shared library, a per-cohort runtime?

---

## Arc-level verdict

**APPROVE-WITH-TODOs.**

**Mood arc holds.** 7 → 9 → 8 → 6 → 5 → 7 → 9 → 8 → 9. M3's unease and M4's deepened unease land; M5's mechanical rescue lands; M6's leverage moment is the biggest peak; M7 generosity and M8 awe both work. The Cowork filter does not dilute the mood — the work is the same work whether you're in Code or Cowork.

**Where Cowork dilutes:**
1. **Concurrency reassurance.** M3 and M5 both depend on watching agents run in parallel. The Cowork variant promises this without confirming it. Code-side has capability checks in maintainer notes; Cowork doesn't. The mood beat depends on the parallel actually happening on screen.
2. **Prompt chip inconsistency.** *(Claude Code)* auto-renders as **Cowork**. *(Builder Claude)* does not — and M7 + M8 use it throughout. A Cowork reader hits an unexplained name twice in the back half.
3. **Plan-mode label leak in M2 prework reference.** The label survived from the Code edition.
4. **Setting-path leak in prework.** *"In Claude Code, click the **+** button"* — should fork.

**Where Cowork is stronger and the file misses the point:**
- M6 walk-away. Code's long-running single session is flagged AMBIGUOUS in maintainer notes. Cowork's walk-away is verified. Body doesn't claim Cowork is more reliable here, but it is.

**One persistent thing.** *"Open Claude Code"* / *"start a new session in Claude Code"* survives in a few places (prework, M1 Debrief instruction in unwrapped text, scattered prompt chip context). Each instance is small. Aggregated, they signal that Cowork was retrofitted onto a Code-first body rather than co-authored.

**Net.** Strong training. Cowork edition is good enough to ship to a friendly cohort. Not yet good enough to ship cold to a Cowork-only buyer who reads carefully.

WROTE: /Users/anttitevanlinna/Projects/agents-102/analytics/bootstrap-cowork-audit/sim-mid-competent.md
