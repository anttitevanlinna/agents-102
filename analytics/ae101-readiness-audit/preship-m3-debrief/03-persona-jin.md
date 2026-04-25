# M3 Sim — Jin (fast operator)

L4+, decade in. Claude Code daily. I compress. If a phase reads like reflection-busywork, I skip and keep moving. Honest reporter — if I skip and miss something I'll say so, if I skip and learn anyway I'll say so too.

---

## Walk-through

### Big Idea + Meta — Mood 7
Two curated skills + one I author. Fine. I read it once, didn't re-read. "Team kit accretion" — language I don't normally use but I get the shape.
**Skipped?** Skimmed Meta. Picked up the size rule from Connections, didn't need Meta.

### Connections — Mood 8
"Bring a small feature you're working on right now." Yes. The size rule earned its sentence — "too small and Claude crunches it in thirty seconds." I have a webhook signature-rotation patch sitting half-done. That's the feature.
**Skipped?** No. The "what's the surface you're most nervous about a teammate missing in review" line did its job in one read. I wrote the line.

### Lecture (Skills from the frontier) — Mood 6
Didn't open. I know what a Claude Code skill is. I've authored a few. If the lecture has something I'd miss, I miss it.
**Did I learn anyway?** Probably yes for the curated-vs-authored split — that's already how I think. If the lecture frames the deconstruction of curated skills (why these two, what's actually IN access-control-analysis), I lost that. Acceptable risk for me. Not for someone earlier on the curve.

### Ex1 — Map the access surface — Mood 8
Invoked the access-control skill on the webhook patch as a subagent. It flagged the event-replay path. I'd had it in my head as "idempotent so fine," but the skill named the window where the dedup key wasn't set yet. Genuine catch.
**Skipped?** I almost moved on after reading the output (Nerd's Ex1-passivity push-back is real — I felt the pull). The "name one surface it flagged you'd underweighted" framing in the maintainer block isn't visible to me as a student, but the LO line ("read what it surfaces, name what a first-read missed") nudged me back.

### Ex2 — STRIDE — Mood 8
Picked Tampering on the replay window. Wrote the ADR — three paragraphs, alternatives, the constraint. Felt real, not menu-pick. The "name the worst thing this feature could do" frame would have helped me earlier; I got there myself but slowly.
**Skipped?** Considered skipping the ADR file. Didn't, because the Bridge says it becomes M4 Block-2. So the artifact is load-bearing downstream — that's the right reason to make me write it.

### Ex3 — Author the test-strategy skill — Mood 9
This was the one. One question at a time, codebase-tuned, then the self-critique move ("ask the skill to disclose its weakest part") which I would NEVER have done unprompted. Skill admitted it was light on the contract-test layer for downstream consumers. I pushed back, it sharpened, I re-invoked on the patched feature. The invocation surfaced that my new test for the dedup window was at the wrong layer.
**Skipped?** No. This is the magic-mood beat and it earned the time.

### Debrief — Mood 8
Here's the focused sim.

Read the bullet input list. **The bullets helped.** When the prompt is dense and I'm post-Ex3-tired, scannable bullets > prose paragraph. I confirmed all five inputs existed in scrollback before I sent. If it had been a prose run-on I would have sent without checking.

Sent the prompt. Claude reviewed, wrote to `./CLAUDE.local.md` (correct layer — I noticed and approved silently), sharpened the test-strategy skill, came back with 4 lines:

> *"Pattern in CLAUDE.local.md: webhook handlers with replay paths need access-control mapping of the dedup-window state, not just the handler entry. Team-worthy: yes — every webhook in this repo has the same shape. Skill sharpened: added the contract-test layer for downstream consumers, with the heuristic 'if a downstream service parses your output, the test lives at their boundary not yours.' Picked these because the access-control skill's replay-window flag was the moment Ex2's ADR almost didn't get written, and the skill's self-critique was where the test-strategy gap surfaced."*

Pushed back once on "team-worthy: yes" — asked it to quote the moment. It quoted the scrollback line where I said "all our webhooks do this." Fair.

**The team-worthy flag — did it survive my speed?** Honest answer: barely. Here's what happened.

I read the 4-line summary. The team-worthy clause is in the second sentence. I almost moved past it because by line 4 I'm already thinking about M4. The post-prompt prose ("Any team-worthy flag is your decision; nothing auto-PR'd") I read on the way in but I was prompt-focused, not closer-focused. What caught me was the word "yes" in the report itself — Claude saying "team-worthy: yes" forced me to either accept it (which means I'd own opening a PR later) or push back. The forcing function was Claude's report shape, not the post-prompt prose.

So: the relocation works **because the prompt instructs Claude to report the flag in the summary**, not because the closing prose tells me it's my decision. If the prompt didn't ask for the flag in the report, the post-prompt sentence would have washed past me. As written, the report carries the weight and the closing sentence is the safety net I didn't actually use. That's fine — net is supposed to be unused most of the time.

Where it would fail: if a fast operator skips reading the report carefully (which I almost did), the team-worthy decision gets implicitly deferred. Not the worst failure mode — nothing auto-PRs — but the moment of decision is real and I caught it only because Claude said "yes" out loud.

**Skipped?** I did not open the two changed files to verify. The post-prompt prose says "check both." I didn't. I trusted the summary. Silent failure risk: if Claude wrote a generic rule despite the "name the branch, not the rule" instruction, I wouldn't have caught it. The prompt is good at preventing it (the "billing webhook / event-replay path" example in the prompt is concrete enough that Claude pattern-matches), but I am the kind of student who skips the verification step. Trainer-mode would have caught it; self-study Nerd would too. Solo-fast me wouldn't.

### Bridge — Mood 7
"M4 turns the discipline inward." Good one-liner. I read it, I'm primed.

---

## Close

**End-mood: 8**

Three quoted moments:
1. *"too small and Claude crunches it in thirty seconds with nothing interesting to surface"* — Connections size rule. Earned its sentence.
2. *"ask the skill to disclose its weakest part"* — Ex3 self-critique move. The thing I'd never have done alone.
3. *"name the branch, not the rule"* — Debrief prompt, the line that prevented the boilerplate failure mode.

**Did the training survive my speed?** Yes — 8/10. The forcing functions are in the right places (Connections size rule, Ex3 self-critique, Debrief in-report flag). I skipped the lecture and didn't verify the two changed files; the first is fine for me, the second is a real silent-failure risk for the fast-operator persona.

**Did the team-worthy relocation survive a fast-operator skim?** Yes, because Claude's report says "team-worthy: yes/no" out loud and I had to react. The post-prompt sentence ("Any team-worthy flag is your decision") on its own would have washed past me. The relocation works because it pulled the decision into the report, not just the closing prose. If a future edit weakens the report instruction (the third item in the "tell me in 3-5 lines" list), the flag will start getting missed. Right now it holds.

**Did the bullet input list help?** Yes, decisively. Five bulleted inputs is scannable; the same content as a comma-separated paragraph would have been sent unchecked. I confirmed all five existed in scrollback in maybe four seconds. As prose I'd have skipped the check entirely. Keep the bullets.

---

**One miss to flag for the maintainers:** the post-prompt "Two files changed (`./CLAUDE.local.md` + the test-strategy skill); check both" — I didn't. Not because the instruction is unclear, but because by the time I'm reading post-prompt prose I'm already mentally in M4. If the verification matters (it does — silent-failure risk on generic-rule output), it might want to be in-prompt: ask Claude to quote the rule it wrote, so the verification surface IS the report, not a separate file-open. Same pattern that made the team-worthy flag survive — pull the gate into the report, not the post-prose.
