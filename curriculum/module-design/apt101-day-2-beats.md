# Agentic Product Teams 101 — Day 2 beat sheet

**Status:** design draft v2, not student-facing, nothing here is taught yet. Strategy: `bosser-strategy:content-strategy-agentic-product-management.md`. Sketch it refines: `group-work-plan.md` § *Three-day sketch*. Judge and persona records: core `evals/persona-panel/2026-10-05-day2-beats/`.

**Day 2: What's actually true?** Mood: unease, rescue, humility. Spine: Agents 101 M3 → M4 → M5, in Agents 101's own order. The tree raises a doubt and holds it (unease), the data audit finds what should not have gone in (unease, sharpened), grounding is the rescue with its limit written on it, the pre-mortem is the humility.

## Day assumptions

- **Hours:** 08:30–16:00, lunch 75, two breaks of 15. Design assumption: no Agents 101 day shape exists; AE101's rhythm (`agentic-engineering-101/timings.md`) shortened to Nordic hours.
- **Room:** groups of three to four on one product, typically product owner, designer, team lead. One shared board per group. Each person in their own Claude.
- **Board agents:** one group member hosts the board-level agents for a beat; the host rotates per beat, starting with the most fluent Claude user, so the pen does not quietly stay with one person.
- **Hard prerequisites from Day 1** (the morning fails without them): the shared insight memory with each person's source wired in; the hypotheses on the board; the overnight synthesis that ran; the product box.
- **Trainer-built material:** two planted claims per group for beat 6, one planted instruction-giving customer text per group for beat 5, detector prompts for beat 6, the voting page for beat 8, a fallback digest from the synthetic material.
- **Booked ahead, optional:** the customer's data protection contact for 15 minutes in beat 5. When they come, "who decides" gets a real answer in the room.

## Beats

Pillars: **T** = as a team, **C** = control your AI, **K** = transfer your knowledge into AI practice. Unit: **G** = group beat (the artefact belongs to the group), **S** = solo or co-located work, **I** = input.

| # | Beat | The group does | The agent does | Artefact (owner) | Min | Agents 101 source | Pillar | Unit |
|---|---|---|---|---|---|---|---|---|
| 1 | Read the overnight digest | Each person finds the one line from their own source they would least trust and says why; the group places those doubts on the board | Wrote the digest overnight from the shared insight memory | Digest with the group's doubts (group) | 15 | M2 scheduled agent, M3 opener | C, T | S → G |
| 2 | Name the crux | Picks the one outcome the tree hangs from, out of Day 1's hypotheses | Lists the candidate outcomes the hypotheses already imply | The crux, one line (group) | 10 | M3 *Name your crux* | T | G |
| 3 | Retrievers, one curator | Each person runs a retriever over their own source and briefs it in that source's dialect. The group reads the curator's conflict list and picks the conflict that matters for the crux | Retrievers pull evidence; a curator agent merges it into one evidence file and keeps the conflicts visible | Evidence file and the chosen conflict (group); retriever brief (each) | 35 | M3 *Three retrievers, one curator* | K, T | S → G |
| 4 | Opportunity tree, me-we-us | 10 min each person builds a tree in their own chat. 15 min the group edits a consensus map that shows who found each branch. 15 min each person grills the map from their own role's lens and brings the sharpest question. 5 min the group writes on the board the branch it would stake least on, and leaves it there | A consensus agent keeps the map from the personal trees; each person's own Claude sharpens their lens's question | Opportunity tree v1 and the held doubt (group) | 45 | M3 *Three minds, one synthesis* | T, K | S → G |
| | Break | | | | 15 | | | |
| 5 | What went in | Short input: customer data through agents in plain terms, GDPR and the EU AI Act included, using the group's own interview consent wording and tickets as the example. The check runs over what went into the shared memory yesterday; the group sorts each flagged item into in, out or can't tell, writes a proposed rule with a named owner for the can't-tells, and names the one risk the rule leaves open. The host packages the check as the group's skill while the others sort | Runs the check with two lenses over the shared memory: the company's data rules, and customer text that tries to give the agent instructions | Proposed data rule with owner and named open risk (group); the check skill (group) | 60 | M4 *Discipline of risk*, *Run and package a security skill*, *Audit your agent* | C, T, K | G |
| 6 | Hunt the fabricated opportunity | Short input on what a groundedness check catches. The group adjudicates a capped claim pool from the tree, claim by claim: supported, unsupported, invented. Each person speaks for the claims from their own source; the team lead takes the delivery claims across all sources. The group compares its calls with two detectors, sees which caught the planted claims, names the judge it keeps, and writes the one thing the judge cannot check | Pulls the claim pool from the tree, with this morning's doubts marked; two detectors mark each claim; a scoreboard shows group against detectors | Scoreboard, and the named judge with its known limit, frozen (group) | 50 | M5 *Grounded*, *Hallucination benchmark*, compressed | C, K, T | G |
| | Lunch | | | | 75 | | | |
| 7 | Re-cut the tree | Prunes branches with nothing under them, keeps the minority branch visible, picks the branch Day 3 builds from | Re-runs the frozen judge on the edited tree | Opportunity tree v2 and the chosen branch (group) | 25 | M5 debrief | T, C | G |
| 8 | Pre-mortem rounds | Ranks failure causes in repeated three-item rounds, then adds what was missing | Serves the rounds on a live voting page, shows who ranked what, and lists the causes people added | Ranked causes and where the group disagreed (group) | 25 | (product craft; Klein) | T | G |
| 9 | Laptops shut | Plain conversation on the top cause and the one the group split on. Decides whether the chosen branch survives | None | The decision, said aloud and written on the board by a person (group) | 20 | (product craft) | T | G |
| | Break | | | | 15 | | | |
| 10 | Rules from today | Reads what the agents propose for the shared rules file, pushes back, and applies only what the group agrees | Proposes rules from the day's evidence: what to doubt in the digest, the proposed data rule, when to run the judge | Shared rules file update (group) | 15 | M3–M5 debriefs, M5 *Propose, double-check, apply* | K, C | G |
| 11 | Out the door | Briefs tonight's run | Scheduled run pre-populates Day 3's story map from the box, the hypotheses, the chosen branch and the top pre-mortem cause | Overnight run scheduled (group) | 10 | M2 scheduled agent | K | G |
| 12 | Close | Human round: where the agent got it wrong today, what we now trust, and the doubt from beat 4 that still stands | None | | 15 | (Agents 101 debrief mode) | T, C | G |

Planned: 325 working minutes of the 345 the day holds. The 20 left sit before lunch, where the morning overruns.

## Per-beat design notes

**1. Digest.** The Day 1 overnight run is what Day 2 opens on: agents worked while people did not. One line each, not a full read: the person who owns a source is the one who can tell a true line from a plausible one. The doubts travel to beat 6's scoreboard. *Failure:* the digest is thin or failed. *Recovery:* the fallback digest; the move is the same.

**2. Crux.** *Constraint:* one outcome. The tree has one root. *Failure:* the group splits between two outcomes. *Recovery:* the team lead picks and the other outcome is parked on the board's edge as the second tree.

**3. Retrievers.** Agents 101 gives one person three retrievers; here each person owns one source, so each runs one retriever. The source's owner writes its brief, which is where their knowledge goes in. *Cut from Agents 101:* the demo *Agent that takes action*. *Failure:* one source is empty or unreachable, or someone missed Day 1. *Recovery:* that person pairs on the strongest source holder's retriever; the curator notes the gap.

**4. Tree.** Personal trees come first so the minority branch exists before the consensus agent can average it away. People hold the lenses (the designer, customer voice; the product owner, outcome and evidence; the team lead, delivery), and each person's Claude sharpens the question, so no agent plays anyone's role. The held doubt is Agents 101 M3's ending: the uneasy part stays named, not settled. *Room size:* a fourth person takes the evidence lens; with two people, the lenses double up. *Cut from Agents 101:* lectures *When to split an agent* and *Debugging stuck agents* move to reference. *Failure:* four Claudes return the same tree. *Recovery:* each person's chat leads with their own source, so trees differ by evidence.

**5. What went in.** Agents 101 M4's shape on product material: audit first, then package. The data went into the shared memory on Day 1; this beat checks what should not have. The designer's interview consent is the worked example, because that is where the question is sharpest. Every planted instruction-giving text gets caught or missed in the open. *Proposal, not decision:* the group writes a proposed rule for its team and data owner, so the change can go through the team's own process. *Constraint:* anything in can't-tell stays out until its named owner says otherwise. *Group decision is human:* a person states each sort; the agent writes it down. *Failure:* the room cannot answer what company policy says. *Recovery:* the open question goes into the rule with an owner and a date, which is what "who decides" means.

**6. Hunt.** Agents 101 M5 runs four detectors over a 30-claim benchmark. Here the claim pool comes from the group's own tree, two detectors, and the planted claims are the ground truth that lets the group tell a good judge from a confident one. The scoreboard compares the group's call with the detectors, never person with person: agents get checked, people don't get watched. The judge is frozen at the end of the beat, and its known limit travels with it into Day 3's evaluation criteria. *Failure:* the detectors disagree everywhere. *Recovery:* the planted claims decide which detector the group keeps.

**7. Re-cut.** *Constraint:* one branch goes to Day 3. *Nothing written over:* pruned branches move to the board's edge with the reason. *Group decision is human:* the judge's marks are input, not the vote. *Failure:* deadlock between two branches, or the judge empties the branch the group loves. *Recovery:* both go into beat 8 and beat 9 chooses.

**8–9. Pre-mortem.** Placed where confidence peaks, right after the re-cut, the last cheap moment to switch branches. With three or four voters, the useful signal is who ranked what, not a spread. The riskiest cause becomes Day 3's slicing rule. **Protected beat:** 9. When the room overruns, 10 folds into 11 and 8 drops to two rounds; 9 keeps its 20 minutes. *Failure:* a polite "it survives". *Recovery:* the trainer asks what would make the top cause true by spring. If the branch dies, the minority branch from beat 7 replaces it, so beat 11 has an input.

**10. Rules.** The three Agents 101 debriefs (M3, M4, M5) become one, since the group shares one rules file. *Failure:* the agent proposes a pile of rules. *Recovery:* the group keeps the ones it can say aloud.

**11. Out the door.** Day 1's overnight move repeated with heavier material, so Day 3 opens on a story map 80% ready and the group's work is the missing 20%. *Failure:* the run fails overnight. *Recovery:* the trainer runs it at Day 3's start while the evals beat begins.

**12. Close.** Human round, no prompts. The question checks the agent, not the people in the room.

## Monday, for the team lead, product owner and designer

- Opens the scheduled digest on their own backlog and marks the line they trust least before anyone acts on it.
- Takes a proposed rule for what customer data goes into the team's agents, with an owner for each open question, to their team and data owner.
- Runs the saved groundedness judge on an opportunity or research summary before taking it to a decision, knowing what it cannot check.

## Open

- Who hosts the board-level agents: rotating member (this sheet) or trainer.
- Day 1 wires sources before the data audit. Whether Day 1 should carry a minimal "what may go in" line first is a Day 1 question.
