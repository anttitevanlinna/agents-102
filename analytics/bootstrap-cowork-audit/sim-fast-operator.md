# Bootstrap Cowork — Fast Operator Sim

Speed-read pass, Cowork filter on. I'm a head of product. I skim, I paste, I judge. Verdicts only.

---

## Prework

**Mood under speed:** 8/10. Three tasks + one read, snake game is shamelessly tactile, *"don't debug it, that's the agent's job"* is the right slap for an operator who instinctively opens a terminal. Cowork variant ("your working directory is already connected") is clean.

**Compression:** *"Connect a folder, run snake, summarize my week from calendar, read 2 pages on LLM-vs-chat."* Yes, executable from skim.

**Cowork re-read needed:**
- Task 2 Path A *"click the **+** button next to the prompt, then **Settings → Connectors**"* — under the Cowork filter I'm not 100% sure this is the same UI; at speed I assume yes. Worth one verification line.
- The "start a local web server" prompt — Cowork without terminal making me wonder *will Cowork actually run a background server?* The unwrapped prose doesn't address it. Mild flicker.

**Verdict:** APPROVE-WITH-TODOs. Confirm Cowork can spawn the recap-site server, or move that prompt to the rt-code lane and give Cowork a `python -m http.server` recipe or "open the static files locally" alternative.

---

## M1 Getting Going

**Mood under speed:** 9/10. The TODO at the top about renaming the module is maintainer noise but it's above the title — I scrolled past. Big Idea is sharp. The /clear → "Start a new Cowork session on the same connected folder" swap reads cleanly.

**Compression:** *"Build a personal site from your LinkedIn, layer three frameworks, retro it into a rules file."* Executable.

**Cowork re-read:** none, actually. The Cowork variant matches behavior 1:1.

**Verdict:** APPROVE.

---

## M2 Building Agent Systems

**Mood under speed:** 8/10. Two-debrief move (rules-file write, then crux) is dense for skim but every paragraph earns its place. The Cowork "End your Cowork session and start a fresh one connected to your training-directory root" is one of the cleaner runtime swaps in the arc.

**Compression:** *"Pin a challenge, build memory from sources, make first custom agent, debrief produces the root CLAUDE.md, find the crux."* Yes.

**Cowork re-read:**
- Build-memory exercise Beat 3: *"ask Claude to write a plan first"* — the Cowork variant is shorter than the Code variant, which gets a footer/dropdown explanation. As a fast operator I'd ask "what does asking-for-a-plan look like, mechanically?" The Cowork variant trusts me to know. Probably fine; would benefit from one example sentence ("...try: *'Before you touch any files, write me a plan and wait for approval.'*").

**Verdict:** APPROVE-WITH-TODOs. Add one-line example phrasing for the plan ask in Cowork mode.

---

## M3 Multi-Agent Systems

**Mood under speed:** 7/10. Big Idea ("filesystem is the meeting room") survives. But this is the module the Cowork filter taxes hardest.

**Compression:** *"Open four sessions, three retrievers + one main, then spawn three subagents inside the main. Synthesize."* Executable, but the four-session open is the operator's pain point and Cowork variant says less about it than Code variant.

**Cowork re-read:**
- *"Open four Cowork sessions on this connected folder"* — at speed, I'm not sure if Cowork supports four concurrent sessions on one connected folder cleanly, or whether they're tabs / windows / something else. Code variant gets *"Desktop users: open four app sessions side by side. CLI users: four terminal sessions"* which is concrete. Cowork is one sentence.
- *"Cowork calls them **agents**"* (the subagent rename) — fine in isolation but the prompts switch between *"spawn three agents in parallel"* and the rendered Cowork text. As a fast skimmer I trust it's wired right; on a real cohort day this is where someone gets stuck.

**Verdict:** REVISE. Cowork variant of the four-session open needs the same concreteness Code gets: name the surface (tabs? windows? new-session button?). Highest-friction step in the arc per the maintainer block — Cowork can't be the loose one.

---

## M4 Security

**Mood under speed:** 6/10. The maintainer TODO at the top flags the real problem (Phase 0 plugin-authoring in 3 minutes can't carry first-time plugin authoring against fresh policy reads). I felt that on skim too.

**Compression:** *"Author a security plugin with two lenses, run two reports, mitigate one risk, name the residual."* Executable in shape, not in time.

**Cowork re-read:**
- *"Cowork: click *Save plugin* in the chat — it registers in your library."* — Trusts me a lot. As an operator the first time I author a plugin I want screenshots or one more sentence. The Cowork install is a one-liner against a Code-CLI three-liner. Asymmetric in the wrong direction (Cowork users are more likely to be first-time plugin-authors).
- Phase 0 timing — three minutes is dead on arrival even before the Cowork filter eats anything.

**Verdict:** REVISE. The maintainer TODO already names the reshape. Confirmed from the operator side: Cowork variant under speed loses the Save-plugin moment because it's one breezy sentence; needs the same care the rules file got in M1.

---

## M5 Output Quality

**Mood under speed:** 9/10. The benchmark is a strong piece of design. Five detectors → scoreboard → judge file. I knew exactly what was happening on skim.

**Compression:** *"Generate briefing, write 5-claim benchmark, spawn 5 detectors in parallel, scorer picks winner, save as judge."* Executable.

**Cowork re-read:**
- *"Cowork calls them agents"* terminology swap is consistent throughout. No friction.
- The scorer phase + Phase 1b's regenerator dance is the same in both runtimes. No Cowork-specific gap.

**Verdict:** APPROVE. The exercise is dense (55-70 min) but the density is the value; the Cowork filter doesn't subtract from it.

---

## M6 Evaluations

**Mood under speed:** 8/10. The walk-away is the lesson and the maintainer block knows it. Cowork *"Multi-session + walk-away both work"* (per arch context) means I'm not worried about the runtime.

**Compression:** *"Run judge once by hand, build orchestrator, kick off 3-round loop, walk away, return to dashboard, diff the judge file to confirm the yardstick didn't move."* Executable.

**Cowork re-read:**
- The orchestrator prompt's "Cowork has no per-file ACL" phrasing is fine but blink-and-miss; an operator who skips that line might not realize the SHA check is the only enforcement. (Both runtimes, same problem — not Cowork-specific.)
- The `claude --continue` recovery move in the maintainer block is CLI-specific. If a Cowork session stalls mid-orchestrator, what's the equivalent? Not addressed in maintainer-only — but I'm reading above maintainer, so this is below my filter. Below the line for me.

**Verdict:** APPROVE.

---

## M7 Personal to Team

**Mood under speed:** 8/10. The lecture-inline framing (no separate lecture file) reads fast. JTBD interview → 4 strategies → crux → both plans → assumption-test → pre-mortem. The *"share the whole agent is not on the list"* line is the right Sutherland-shaped jab for an operator.

**Compression:** *"Interview for the teammate's job using your memory, pick a sharing pattern that moves the outcome (not infra), draft tech + people plans, assumption-test the switch, pre-mortem the firing."* Executable.

**Cowork re-read:**
- Phase 1 references the **AskUserQuestion** tool ("ask-questions tool"). As fast operator on Cowork I'm not sure whether Cowork surfaces this tool the same way as Code. Maintainer block says "confirm Claude Code's AskUserQuestion tool is available in the student's environment" — capability check owed, runtime-agnostic. Possible Cowork-specific gap.
- No `<span class="rt-cowork">` differentiation in this whole exercise. The exercise reads as runtime-neutral, which is fine because the work is conceptual; but if Phase 1's interaction primitive depends on Code-specific tooling, the Cowork student hits a wall the prose doesn't warn about.

**Verdict:** APPROVE-WITH-TODOs. Verify AskUserQuestion in Cowork before first cohort, and if absent, add the fallback (numbered options, manual selection) to the student-facing prose.

---

## M8 Agents Building Agents

**Mood under speed:** 9/10. Two exercises (Extend = 25 min mundane, Joint Diamond = 55 min meta). The "you do not graduate, you have a flywheel" close is correct. The "Tentative: Live Deliberation" maintainer block is below my filter line.

**Compression:** *"Describe an agent, watch coding-agent build it. Then run crux + assumption-test + pre-mortem at room scale to produce a strategy kernel."* Executable.

**Cowork re-read:** none of substance. Cowork-vs-Code rt-spans are absent in both M8 exercises — they read runtime-neutral, and the work is about composition, not surface. Holds up.

**Verdict:** APPROVE.

---

## Arc-level verdict

**Cowork edition flows under fast read for 6 of 8 modules.** The two that need slowing-down-only-because-Cowork-lost-guidance are M3 (four-session open) and M4 (Save-plugin moment). Both are runtime-mechanics cliffs, not pedagogy cliffs — the teaching survives, the *"how do I literally do this in Cowork?"* line gets thinner than the Code-mode equivalent.

**The pattern:** Cowork variants are tightest where the move is conceptual (M1, M5, M6, M7, M8) and thinnest where the move is runtime-mechanical (M3 multi-session, M4 plugin install, M2's plan-mode-as-ask). The asymmetry is the wrong way around — Cowork is the no-terminal audience, who needs *more* mechanical scaffolding, not less. Code-mode users will fall back on terminal-fluency; Cowork users won't.

**Recommended reshape priority:**
1. M3 four-session open in Cowork (REVISE — names the surface concretely).
2. M4 Save-plugin in Cowork (REVISE — separate session per the maintainer TODO is the right move; the Cowork install moment specifically needs more than one sentence).
3. M2 Beat 3 plan-as-ask phrasing example (APPROVE-WITH-TODOs).
4. Prework recap-site server question for Cowork (APPROVE-WITH-TODOs).
5. M7 AskUserQuestion fallback for Cowork (APPROVE-WITH-TODOs).

**Sutherland-shaped reframe:** The Cowork edition reads like Code's prose with the terminal lines hidden — but a no-terminal user is not a terminal user with the terminal hidden. They reach for different scaffolding. The fix is not more rt-cowork spans inside Code-shaped paragraphs; it's a couple of Cowork-native paragraphs in the spots where the runtime-mechanics differ most. Two paragraphs across the arc, not twenty.

The arc holds. The two cliffs are addressable in one /content-creation session each.

WROTE: /Users/anttitevanlinna/Projects/agents-102/analytics/bootstrap-cowork-audit/sim-fast-operator.md
