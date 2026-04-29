# Exercise: Find the crux

**Time:** 32 minutes. Three phases.

Module 1 and Module 2 ran solo. Module 3 is collaborative. Four groups of three or four people each. Each participant runs their own Cowork session. Outputs land in shared SharePoint group folders. The IT Director runs a separate session that reads across all four groups. The architecture that produces the answer is the one the room is already inside of; the work just routes through it.

Before Phase 1: confirm with the trainer which group folder you write to. Each group has a folder named `group-1/`, `group-2/`, `group-3/`, `group-4/` inside the cohort SharePoint workspace. Your Phase 1 output saves there.

## Phase 1. Divergence (10 minutes)

Each participant runs an interview with Claude, alone. Claude asks; you answer. The point isn't to write a polished list. The point is to surface the rollout difficulties YOU actually see, in the words YOU actually use, with Claude pushing back when your first answer is too tidy.

Ask Claude to interview you about your team's top three Claude-rollout difficulties and save the divergent thinking to the group folder.

**Prompt** *(Claude Code)*

```
Interview me about the top three difficulties I see in our team's Claude rollout. Ask one question at a time. Don't show me the next question until I've answered the current one.

Start with: "What's the first difficulty you see?" After my answer, push back once — ask for a specific example, or ask whether that's the actual difficulty or a symptom of something deeper. Then ask the second question, same shape. Then the third.

When I've answered all three with push-back, save the conversation as a divergence file named after me (use my first name, lowercase, no spaces) in the group folder I'll name after the colon. Include the three difficulties and the push-back answers, in my voice. Don't summarize them into your own register.

The group folder:
```

Type your group folder name (`group-1/`, `group-2/`, etc.) after the colon. Answer Claude's questions in plain language. When the file saves, you're done with Phase 1.

## Phase 2. Group synthesis (12 minutes)

Each group of three or four picks ONE participant to be the group synthesizer for this phase. The other two or three participants are done writing. Their divergence files are already in the group folder.

The synthesizer participant opens a fresh Cowork session connected to the group's SharePoint folder (Cowork's connected-folder model, same as Module 1 and Module 2, just pointed at the group folder rather than a personal one). Claude in that session sees every file in the folder.

Ask Claude to read all divergence files in the group folder, find the cross-cutting crux, and save it.

**Prompt** *(Claude Code)*

```
Read every file in this group folder that starts with "divergence-". You should find three or four files, one per group member.

Across the files, find the ONE difficulty that, if our team got it right, would make the others follow. That's the crux. Not the most-mentioned difficulty. Not the average. The one that, when named, makes the other difficulties downstream of it.

Show me the crux candidate in chat first, in two sentences. Don't save yet. I want to push back if you missed something the files were actually saying.

After I push back, save the final crux as a group-crux file named after our group number in this folder. Include: the named crux (one paragraph), and one quote from each divergence file that supports it.
```

Before the synthesizer asks Claude to save: each non-driver in the group names ONE thing in the candidate crux that's wrong or missing. One sentence each, said to the synthesizer. The synthesizer types those points back to Claude as a single push-back ("These three didn't land for the team. Fix them."). Then Claude rewrites and saves.

This forcing function is the design. Without it, the synthesizer drives alone and the group disengages. The crux belongs to the group, not to whoever held the keyboard.

## Phase 3. Cross-group synthesis (10 minutes)

The IT Director runs this phase in a single Cowork session, on screen, in front of the room. They're reading across all four group-crux files and producing the actual rollout strategy.

The room watches. The IT Director thinks out loud. They've rehearsed the prompt with the trainer one day pre-cohort, so this isn't a cold start.

Ask Claude (the IT Director's session) to read all four group cruxes and produce the rollout strategy.

**Prompt** *(Claude Code, IT Director's session)*

```
Read all four group-crux files: group-1/group-crux-1.md, group-2/group-crux-2.md, group-3/group-crux-3.md, group-4/group-crux-4.md.

The four cruxes are four different angles on the same rollout. Find what's shared across them, what's contested, and what one or two cruxes are downstream of others.

Then propose a rollout strategy in three sections:
1. The two or three top priorities for the next 90 days (the cruxes that, if got right, make the others follow)
2. The two or three deferrals (real difficulties that aren't actually the crux right now — name them and explain why they wait)
3. The single named question I (the IT Director) need to answer myself before the strategy can land

Show me the strategy in chat first. I'll push back, edit live, and add what's missing. Then save as rollout-strategy.md in my personal folder. Save my edits, not your first draft.
```

The IT Director reads the proposed strategy, pushes back live, narrates what they're changing and why. The room hears the thinking. When the strategy reads as theirs, they ask Claude to save.

The trainer holds silence through Phase 3. After the strategy file saves, the trainer steps in for the reveal.

<!-- maintainer -->

**Meta (trainer):**
- **Length:** 32 minutes. 10 + 12 + 10 = 32 phase budget. Module budget 45 min: 4 Connections + 3 concept + 32 exercise + 4 reveal/reflection + 2 Debrief
- **The reveal — script for the trainer at Phase 3 close:** *"You just built a multi-agent system. Four groups of individual divergent agents fed into four group synthesizers, which fed into the IT Director's cross-group synthesizer. Nobody taught you that architecture. The work needed that shape, so you built it."* Land it once. Don't repeat. Don't elaborate. The room felt it; naming it is enough
- **The reflection follows the reveal (~3 min):** *"What did the synthesizer get right that no one person had said? What did it miss that one person could have caught?"* Open question to the room. Trainer collects two or three responses, doesn't synthesize them; lets the question stand
- **Phase 1 watch-fors:** participant whose divergence file is too short (less than 200 words) — Claude didn't push back hard enough. Trainer pivot if noticed: *"Ask Claude to push back harder on your second answer."* Participant who froze on the first question (uncertain about rollout difficulties): trainer can suggest a Phase-1-only seed: *"What's the most awkward conversation about Claude you've had at work in the last two weeks?"*
- **Phase 2 synthesizer designation.** Don't pre-assign. Each group decides at Phase 2 start. The participant most fluent with Cowork is usually the right pick. Groups with no fluent person get the trainer's quiet help on the prompt copy-paste, not on the work itself
- **Phase 3 IT Director rehearsal.** ONE day pre-cohort. Trainer fakes four sample group-crux files (use difficulties from a previous cohort or invent plausible ones for the customer's industry). IT Director runs the synthesizer prompt against them, produces a rollout-strategy.md, and the trainer reviews. The IT Director isn't inventing the prompt cold on cohort day — they've done the move once already
- **Phase 3 fallback if rehearsal didn't happen.** The magic-or-disaster binary is real if the IT Director walks in cold. Two fallbacks ranked by preference. (a) **Co-drive:** trainer sits beside the IT Director at the keyboard; trainer pastes the prompt and handles Cowork mechanics; IT Director does the live thinking-out-loud and the push-backs. The room sees a senior person doing strategic work, just not also doing CLI/Cowork work. (b) **Trainer drives, IT Director steers:** trainer at the keyboard, IT Director narrating priorities/deferrals/what-to-edit. Loses some of the *"sponsor as participant"* signal; preserves the magic beat. Skip Phase 3 entirely is NOT an option — the cross-group synthesis IS the reveal's evidence
- **The trainer's silent-presence stance through Phase 1 and Phase 2.** Don't hint at the multi-agent architecture. Don't name *"this is going to feed into the IT Director's synthesis."* The participants have to live the structure to be surprised by it at the reveal. If a participant asks *"how does this connect to the next phase?"* — *"keep going, you'll see"* is the answer
- **Group count vs. participant count.** 8 or fewer: 2-3 groups. 9-12: 3 groups. 13-16: 4 groups. Adjust phase 3's prompt to read across the actual group folders that exist, not always four

**Quality:** mechanical-tested 2026-04-28
- compendium-audited 2026-04-28 (check_writing v2026-04-27, check_student_facing v2026-04-28 incl. hard-grep phrase list + rule 12 + rule #3 + § 2(b) never-abbreviate-modules, check_prompts v2026-04-27, check_pedagogy v2026-04-27 incl. rules 12, 26, 35)
- sim-passed 2026-04-28 (IT-admin-medium-light-chat persona post-sweep re-sim returned APPROVE; all six beats ≥8/10)
- mechanical-tested 2026-04-28 (`curriculum/evals/mechanical/instances/claude-basics-m3-verbatim-judge-report.md` @ c25d7c4) PASS 13/13 — verbatim round-trip on all 3 prompts; pre-staged teammate divergence + other-group cruxes untouched; Phase 1 one-question-at-a-time; Phase 2 group-synthesis push-back; Phase 3 cross-group push-back integrated as voice-shaping

**Plug points (trainer):**
- The break verdict from M2 — already named in the module file Connections
- Group folder topology — pre-cohort setup
- The IT Director's actual rollout strategy on the IT Director's actual challenges
- Group composition — trainer scales by participant count

**Strategy reference:** `bosser-strategy:content-strategy-claude-basics.md` § *Where is this all going?*

**Eval instance:** `curriculum/evals/instances/claude-basics--find-the-crux.md`
