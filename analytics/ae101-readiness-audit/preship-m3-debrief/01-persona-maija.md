# Maija — M3 Debrief Sim

L2/L3 engineer, ~5 years experience. Comfortable in Claude Code but no deep instincts. Reads instructions carefully and trusts the curriculum to guide me. Today's focus: the M3 Debrief, but I walk the whole module first so the Debrief lands in context.

---

## Beat 1 — Big Idea + Meta

**Mood: 9/10.** "Earn your staff engineer's and CISO's trust on a small piece you're shipping this week" — I instantly know who this is for. That's me. Two curated security skills + one I author = clean shape, three concrete things I'll do. The team-kit-via-human-conversation framing already tells me nothing weird is going to auto-PR behind my back, which I appreciate.

> "Team kit accretion starts here: the skill you author this hour ships personal first, with a clear path to team promotion through a human conversation later."

Solid contract.

---

## Beat 2 — What You'll Learn

**Mood: 9/10.** Seven verbs, all Bloom-tagged in the way an engineer thinks: invoke, apply, discriminate, author, evaluate, invoke, ship. The "Discriminate when a job belongs in a subagent versus the main thread" line is the one I'm most curious about — that's the kind of heuristic I actually need and don't have.

> "**Author** a test-strategy skill through conversation with Claude (one question at a time) tuned to your codebase's actual testing conventions, not a generic pyramid"

That sentence sells the module. Generic pyramid is exactly what I'd produce alone.

---

## Beat 3 — Connections

**Mood: 9/10.** Honest framing: too small = nothing surfaces, too large = bell rings before you finish. I know my codebase well enough to pick a feature in 90 seconds. I write down: the new webhook signature verification path on the billing service. One line, done.

> "You've watched Claude work for two modules. Pick the size that fits the rhythm you've seen."

That's a respectful sentence. Trusts me to know what I've seen.

---

## Beat 4 — Lecture (Skills from the frontier)

**Mood: 8/10.** Haven't read the lecture file but the title earns the move. I'd want this short — maybe 12 minutes — so I can get to invoking the skills. Rating 8 because the lecture is opaque to me from the module file alone and I can't audit it from here. Trust the structure.

---

## Beat 5 — Exercise 1 (Map the access surface)

**Mood: 9/10.** I invoke the access-control-analysis skill on my webhook feature. Subagent runs, fresh context. It surfaces the event-replay path I hadn't thought about. Good — that's why I did this. I name what I'd missed.

The push-back move I expect from the trainer: "which surface did it flag that you'd underweighted?" Direct, useful.

---

## Beat 6 — Exercise 2 (STRIDE + ADR)

**Mood: 9/10.** STRIDE skill on the now-mapped surface. I pick tampering on the replay path — that's the worst thing this feature could do. Write the ADR in `docs/adr/0001-webhook-replay-protection.md`. Real architectural call I'd defend in review.

---

## Beat 7 — Exercise 3 (Author test-strategy skill)

**Mood: 9/10.** Conversation, one question at a time. Self-critique move at the end ("disclose your weakest part"), then invoke on the security-tested feature. This is the part I've never done — authoring through conversation, not typing. Slight nervousness about whether Claude will dump all five questions at once (the maintainer block flags this as a known failure mode), but the trainer push-back is named.

---

## Beat 8 — Key Concepts (Emergent)

**Mood: 9/10.** These read as tactical, not slogan-y. "Authoring without invocation is theatre" — yes. "One skill shipped beats three skills drafted" — yes.

Theme callouts (4, 3, 1) tied to specific exercise moves. I notice the structure (themes recur in concepts) without being lectured about it.

---

## Beat 9 — Debrief opening + prompt setup

This is the focused beat. I read it carefully.

**Mood: 9/10.**

> "Ask Claude to review the session, integrate one codebase-specific pattern into `CLAUDE.local.md`, and sharpen the authored test-strategy skill from session evidence."

Action lead-in does the job in one sentence. Three verbs (review, integrate, sharpen). I know what I'm about to ask Claude to do before I read the prompt. Good.

---

## Beat 10 — The prompt itself

**Mood: 9/10.**

The five-bullet input list is the change I notice most, and it works for me. When I read prose like *"the access-control output, the STRIDE output, the ADR, the skill file, the invocation output, and the scrollback"* in one breath, I lose track by item three. The bullets let me confirm at a glance that Claude has the whole picture.

> "Read these inputs:
> - the access-control skill's output
> - the STRIDE output + the ADR I wrote
> - the test-strategy skill file I authored
> - the invocation output when I ran the skill on the feature
> - the scrollback for decisions I made and push-backs I pushed"

Clean. I can also imagine, as a student, that if Claude misses one input I can point at the bullet and say "you didn't read this one."

The two numbered jobs that follow are also clean. Job 1 is concrete enough that the example pattern ("features touching the billing webhook need access-control mapping before STRIDE; the event-replay path is invisible from a first read") pretty much tells me the shape Claude should produce. That's the right amount of demonstration — it's not putting words in my mouth, it's calibrating what "specific" means.

The example actually maps very close to my own webhook feature, which is a happy coincidence but also tells me the example was written by someone who ships real code, not someone composing rubric examples. Trust earned.

`./CLAUDE.local.md` form is everywhere — clear which layer I'm writing to. The parenthetical "create it + add to `.gitignore` if it doesn't exist; personal file, not team `./CLAUDE.md`" is exactly the disambiguation I'd want on first authored write to a layer I might not have used before.

---

## Beat 11 — The reporting requirement (with the relocated team-worthy flag)

**Mood: 8/10.**

> "Tell me in 3–5 lines: the pattern you named in `./CLAUDE.local.md` and whether it's team-worthy (one every engineer on this codebase would benefit from), what you sharpened in the skill, and which moment in the session made you pick those over others. I shouldn't have to open the files to know."

The team-worthy flag landed inside the report request, which makes sense to me as a reader: "tell me X, and label X with Y." The parenthetical definition — "one every engineer on this codebase would benefit from" — is the WHEN I needed. Without that gloss I'd have wondered: team-worthy in what sense? Worth shipping? Worth telling someone? Worth a PR? The gloss answers it: codebase-wide applicability.

So: did I understand WHEN to flag and WHAT it means by the time I got to the reporting requirement?

**Yes.** The definition is right next to the ask. I don't have to scroll back. The closing prose ("Any team-worthy flag is your decision; nothing auto-PR'd") confirms my agency over what happens next.

The 8 (not 9) is a facilitator-premium gap, not breakage: the reporting requirement is now doing two things — surfacing the work AND making me classify it. Light cognitive load that a trainer would absorb with a one-liner ("flag it; you decide later if it leaves your laptop"). On my own at 9pm I might miss the agency point because the flag-as-classification feels procedural.

---

## Beat 12 — Closing prose

**Mood: 9/10.**

> "12–15 minutes. Push back on the summary; quote the session moment when something's wrong. Two files changed (`./CLAUDE.local.md` + the test-strategy skill); check both. Any team-worthy flag is your decision; nothing auto-PR'd."

Tight. Time budget, push-back move, what to verify, agency confirmation. Four sentences, four jobs. I'd remember all four after one read.

---

## Beat 13 — Bridge

**Mood: 9/10.** Names the M3→M4 handoff in concrete terms — quality criteria become Block 3, access-surface facts become Block 1, hardening decision is already a Block 2 entry. I now know what the three-block memory IS without it being lectured at me. Good closer.

---

## Close

**End mood: 9/10.**

**High moment:**
> "Authoring without invocation is theatre"

**Low moment (the relative dip, still 8):**
> "Tell me in 3–5 lines: the pattern you named in `./CLAUDE.local.md` and whether it's team-worthy (one every engineer on this codebase would benefit from), what you sharpened in the skill, and which moment in the session made you pick those over others."

Not a bug, just the only beat where I'd want a trainer's one-liner.

**Medium moment:**
> "You've watched Claude work for two modules. Pick the size that fits the rhythm you've seen."

Solid trust-the-student framing.

**Recommend?** Yes, without hesitation. This is the rare module where I'd come away with a real ADR, a real authored skill living in my actual repo, and a `./CLAUDE.local.md` line I'd actually keep. The 12–15 minute Debrief feels honest — not 5 (theatre) and not 30 (over-engineered).

**Specific failure mode I noticed:** One only — the team-worthy classification asks me to make a judgement call inside the same breath as the report. In a self-study session at the end of a 1h45 module, I might over-flag (call everything team-worthy because the example sounded broadly applicable) or under-flag (call nothing team-worthy because I haven't gotten anyone else's read). The closing prose's "your decision" softens this, but a single nudge in the prompt itself — *"flag liberally; nothing leaves your laptop without a PR you write later"* — would let me classify without anxiety. Small gap. The trainer covers it in cohort delivery; the self-study Nerd would need to cover it.

**On the relocation specifically — help or hurt?**

**Help.** Mid-Job-1 prose was the wrong place for the flag because Job 1 is about writing the pattern; the flag is about classifying it for someone else's eyes. The reporting requirement is the right home — that's where I'm summarising for an audience (myself, later, deciding what to PR). The five-bullet input list also benefits the report read because I now know exactly what evidence Claude drew on when it suggests the team-worthy label. Net: the reorg makes the WHEN obvious (at report time) and the WHAT clearer (codebase-wide applicability, parenthetical-defined). Worth shipping.
