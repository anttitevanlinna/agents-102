# Lecture: Grounded — and three ways to check

There is truth out there. Your sources carry shards of it. Your agent, left to itself, has no model of truth — only a model of what usually comes next in language that looks like yours.

When you ask it for something your sources support, it produces grounded output. When you ask it for something your sources don't support, it still produces something. The difference between those two states is invisible in the tone of the output. That's the whole problem.

**Why this happens, in one sentence.**

Large language models generate the next likely word. Not the next true word — the next likely one. They're trained on text where people spoke confidently, cited specifically, wrote fluently — and the models learned to produce language that looks like all of that, whether the underlying material supports it or not. Fluency is not evidence. Confidence is not correctness. The model has no way to tell you which parts of its output are grounded and which are plausible-sounding fill.

This isn't a bug that gets patched in the next release. It's the shape of the technology. Later models will hallucinate less; they won't stop.

**The compound reliability math.**

If an agent is 85% correct on a single step, that's not bad. Eighty-five out of a hundred. You'd forgive that in an intern.

Now run ten steps. Retrieval, synthesis, formatting, writing, checking, rewriting, summarising, publishing — ten is not a lot. 85% per step, ten steps: 0.85^10 = about **20%.** One in five runs is end-to-end correct. Four in five have a defect somewhere, usually somewhere you won't see.

This is why agentic customer service works (2–3 steps — look up the order, check the policy, draft the reply — at 95% each = 86% end-to-end). This is why "let the agent handle the full workflow" doesn't (10 steps, 85% each = 20%). The math is the difference between a demo that delights and a production system that leaks.

The number doesn't tell you *what* will go wrong. It tells you that something will. Your job is to design for that, not against it.

**The word is grounded.**

Every output your agent produces is either connected to truth — to specific files, specific numbers, specific quotes in specific sources — or it isn't. "Connected to truth" is what we mean by grounded. "Approximating truth without being tied to it" is what we mean by ungrounded.

The positive discipline is grounding. The failure mode is fabrication. The failure mode is what makes headlines — the lawyer citing invented case law, the medical chatbot inventing medications, the finance memo with confident numbers nobody can source. But the discipline is what keeps you out of those headlines, and the discipline is grounded.

Grounded isn't "accurate." A grounded claim can still be wrong, if the source it's tied to is wrong. Grounded means *traceable to a real piece of evidence*. Accuracy is a harder question, and an agent alone can't answer it. Traceability is a mechanical discipline, and an agent CAN be forced into it. Start with grounded.

**Three techniques you'll actually use.**

These are the three strongest detection mechanisms in practitioner use. Any one of them, applied rigorously, catches a majority of fabrication. All three together are the hygiene routine.

**1. Citation re-verification.**

Your agent cited a source for a claim. Good. Now: does the source actually back the claim?

Don't assume it does. A well-known pattern — call it *citation cargo-cult* — is that models have learned to cite, because citations look good, but the cited file doesn't always support the specific claim attached to it. The citation is the ritual; the grounding is what you're actually checking.

Practitioner move: for each cited claim, open the file. Read the sentence. Does the claim match? If yes, grounded. If no — the agent has produced something worse than an uncited claim. It has produced a claim with false authority. Fix is easy, catch is essential.

**2. Adversarial pass — find the counter-evidence.**

The default generation is a confirmation engine. Ask the agent *"is this claim supported?"* and it will usually say yes. Ask the agent *"what would make this claim wrong?"* — different prompt, different agent — and you get the skeptic you need.

Practitioner move: after producing output, run a fresh pass with an adversarial brief. *"Read this briefing. For each specific claim, find one piece of evidence in the sources or your general knowledge that would contradict it, or name what evidence would be needed to disprove it."* The agent gets uncomfortable, because the default stance is to support. The discomfort is the work.

This is what Roger Martin called *what would have to be true?* turned around. Not testing the assumption; testing its opposite.

**3. Consistency across runs or framings.**

Non-determinism is usually treated as a bug. Flip it: non-determinism is a signal.

Ask the same question twice, in two fresh sessions, possibly with slightly different framings. If you get two different answers, the agent isn't sure. The divergence tells you where the ground is thin. Where the answers converge, the agent is likely pulling from the same grounding across runs — more trustworthy. Where they diverge, you need the human.

Practitioner move: for any output you're about to act on, run it twice. Three times if the stakes are high. Don't average. Compare. The place the runs disagree is the place to question.

**The three used together.**

Citation re-verification catches *misrepresentation* — claims cited to files that don't back them. Adversarial pass catches *overreach* — claims the evidence supports narrowly presented as broader. Consistency probe catches *uncertainty-as-confidence* — the places the agent is guessing and the tone doesn't betray it.

You don't run all three on every output. You run the one that matches the risk. A weekly briefing you'll read and adjust — citation re-verify the top three claims, move on. A customer-facing proposal — all three, full pass. A board paper — all three, plus a human with domain expertise on the specific numbers.

**What this buys you.**

Not certainty. Certainty isn't available. What you buy is a practice that takes you from *"this output is confident and I don't know how much to trust it"* to *"I know what I've grounded, I know what I've pressured, I know where the runs disagreed — and here's what I still can't settle."*

That last clause is the one that matters. Grounded output names what it doesn't know. Ungrounded output pretends to know everything. The difference looks small on the page. In a decision room, it's the difference between a memo that holds up and a memo that detonates.

Today you run the full loop by hand, on your own Module 3 material. Tomorrow we automate it.

**Time:** 8–10 minutes.

<!-- maintainer -->

**Placement in module:** After Connections, before the exercise. Primes the frame; the exercise runs the human loop with one of the three techniques (citation re-verification via the grounding rules in Phase 3). The other two techniques (adversarial pass, consistency probe) are named in the lecture but not practised in the Module 5 exercise — they land as takeaway tools the student can use in their own work starting Monday, and they seed Module 6 (evals) where adversarial passes become eval judges and consistency probes become convergence evals.

**Frameworks riffed on:**
- **Compound reliability math** — the single most useful number. Centred in the lecture; makes the demo-to-production gap concrete.
- **Grounded-ness as epistemic stance** — journalism/research/legal drafting recognisable move.
- **Roger Martin's "what would have to be true?" inverted** — adversarial pass is the flip ("what would make this wrong?").
- **Non-determinism as signal, not noise** — practitioner reframe of the usual LLM complaint.

**Philosophy callout (sparing):**
- Belief #8 — name what you don't know — lands in the closing "grounded output names what it doesn't know; ungrounded pretends to know everything." Not announced; the lecture arc earns it.
- Belief #14 — practice beats proof — continues from M4. The three techniques ARE the practice.

**Why three techniques, not five or ten:**
- Memorable number. Three fits in a coffee conversation on Monday.
- Three maps to three common failure modes: misrepresentation, overreach, uncertainty-as-confidence. The techniques are matched to the modes, not orphaned tools.
- Any one of them run seriously catches a majority of fabrication — so the student can start with one and add the others. Ten techniques invite paralysis; three invite practice.

**Why these three specifically (selection reasoning):**
- **Citation re-verification** — the cheapest, highest-leverage catch. Catches citation cargo-cult which is the most embarrassing fabrication pattern.
- **Adversarial pass** — catches the failure that generation rules can't: claims that ARE grounded but the evidence is narrower than the claim. The generation-side rules (cite-the-ground, etc.) won't catch this because the agent IS citing — it's just overreaching from what the citation supports.
- **Consistency probe** — catches what both of the above miss: the places the agent is guessing consistently-confidently across different parts of the same output. Non-determinism across runs exposes this where a single-pass audit won't.

**Rejected techniques (and why):**
- *Hallucination-detection models / classifiers* — rely on external infrastructure, not in scope for a business-audience training, and they don't outperform these three when applied rigorously.
- *Fact-checking against a knowledge base* — depends on having an authoritative knowledge base, which most students don't, and conflates "grounded" with "accurate" (the lecture deliberately separates them).
- *Prompt-engineering tricks* (system prompts that say "don't hallucinate") — empirically weak and teach the wrong lesson. The discipline is verification, not incantation.
- *Temperature-0 settings* — misses the point. The issue isn't randomness; it's ungrounded confidence.

**Capability check owed:**
- None specific to this lecture. Delivery is trainer + screen; no Claude Code interaction during the lecture itself.

**Watch-fors (deferred to facilitator notes pass):**
- **"Just use a better model."** Security-adjacent student hears "fabrication is permanent" and asks whether the next model fixes it. Coach: *"Less, but not zero. The shape of the technology makes some level permanent. Design around it."*
- **"What about RAG / vector databases / fine-tuning?"** Technical student asks. Coach: *"Those help with grounding by giving the agent better raw material. They don't change the detection job. Citation re-verification still applies; adversarial pass still applies; consistency probe still applies."*
- **"This feels like I'm doing the work myself."** Business-audience student notices the three techniques are human effort. Coach: *"You are — today. Module 6 automates all three. The techniques are the things evals eventually do at scale."*
- **Compound reliability math resistance.** Some students will want to argue the 85% number. Coach: *"The number is illustrative. Whatever YOUR number is, run the math. The compounding is the real point."*

**Length:** ~950 words. Prework-reading band (800-1200) — above demo-script band (350-600). Delivered in-room (8-10 min), sits between. The three techniques need space to land; trimming risks losing the "why each one" reasoning that makes them memorable.

**Why this lecture exists (Pass 1 reasoning):**
- Original plan was "Why LLMs Will Always Fabricate" — correct at the failure-mode level, wrong as the frame. Reframed to lead with GROUNDED as the positive discipline, fabrication as the failure mode.
- Three techniques as the lecture's spine is Antti's addition (2026-04-19) — the student's takeaway after M5 should be three portable detection moves, not just the concept of grounded.
- Exercise teaches one of the three experientially (citation re-verification via the grounding rules); lecture names all three. Adversarial pass and consistency probe are named but not practised in M5 — they seed M6 (adversarial pass → eval judges; consistency probe → convergence evals) and are immediately usable in the student's own work.
