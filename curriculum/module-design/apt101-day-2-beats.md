# Agentic Product Teams 101 — Day 2 beat sheet

**Status:** design draft, not student-facing, nothing here is taught yet. Strategy: `bosser-strategy:content-strategy-agentic-product-management.md`. Sketch it refines: `group-work-plan.md` § *Three-day sketch*. Judge records: core `evals/persona-panel/2026-10-05-day2-beats/`.

**Day 2: What's actually true?** Mood: unease, rescue, humility. Spine: Agents 101 M3 → M4 → M5, in Agents 101's own order. The sketch put grounding before the data question; this sheet does not, because M5 opens on M4's risk discipline and the arc still lands: the tree raises the doubt (unease), the data question names what must not go in (unease, sharpened), grounding is the rescue, the pre-mortem is the humility.

## Day assumptions

- **Hours:** 08:30–16:00, lunch 75, two breaks of 15. Planned beats leave the rest as overrun room. Design assumption: no Agents 101 day shape exists; AE101's rhythm (`agentic-engineering-101/timings.md`) shortened to Nordic hours.
- **Room:** groups of three to four on one product, typically product owner, designer, team lead. One shared board per group. Each person in their own Claude.
- **Board agents:** one group member hosts the board-level agents for a beat and the host rotates per beat, so the pen does not quietly stay with one person.
- **Hard prerequisites from Day 1** (the morning fails without them): the shared insight memory with each person's source wired in; the hypotheses on the board; the overnight synthesis that ran; the product box.

## Beats

Pillars: **T** = as a team, **C** = control your AI, **K** = transfer your knowledge into AI practice. Unit: **G** = group beat (the artefact belongs to the group), **S** = solo or co-located work.

| # | Beat | The group does | The agent does | Artefact (owner) | Min | Agents 101 source | Pillar | Unit |
|---|---|---|---|---|---|---|---|---|
| 1 | Read the overnight digest | Each person checks the part of the digest that came from their own source, then marks each line kept or doubted on the board | Wrote the digest overnight from the shared insight memory | Marked digest (group) | 20 | M2 scheduled agent, M3 opener | C, T | G |
| 2 | Name the crux | Picks the one outcome the tree hangs from, out of Day 1's hypotheses | Lists the candidate outcomes the hypotheses already imply | The crux, one line (group) | 10 | M3 *Name your crux* | T | G |
| 3 | Retrievers, one curator | Each person runs a retriever over their own source and briefs it in that source's dialect | Retrievers pull evidence; a curator agent merges it into one evidence file and keeps the conflicts visible | Evidence file (group); retriever brief (each) | 35 | M3 *Three retrievers, one curator* | K | S → G |
| 4 | Opportunity tree, me-we-us | 10 min each person builds a tree in their own chat; 15 min the group edits a consensus map that shows spread, not average; 15 min the three deciders grill and the group answers | A consensus agent keeps the map from the personal trees; three decider agents (evidence, customer voice, delivery) each grill from their lens | Opportunity tree v1 (group) | 40 | M3 *Three minds, one synthesis* | T, C | S → G |
| | Break | | | | 15 | | | |
| 5 | What may go in | Short input: customer data through agents in plain terms, GDPR and the EU AI Act included. Each person runs a "may this go in?" check on their own source and packages it as a skill. The group decides what stays out and names who decides when it is unclear | Runs the check with two lenses: the company's data rules, and customer text that tries to give the agent instructions | Data rule in the shared rules file (group); the check skill (each) | 45 | M4 *Discipline of risk*, *Run and package a security skill* | C, K, T | S → G |
| 6 | Grounded, briefly | Short input: what a groundedness check catches and where it stops | | | 10 | M5 lecture *Grounded* | C | G |
| 7 | Hunt the fabricated opportunity | Each person adjudicates the tree's claims that come from their own source: supported, unsupported, invented. The group compares their calls with two detectors | Pulls a claim pool from the tree; two detectors mark each claim against the evidence file; a scoreboard shows where people and detectors disagree | Scoreboard, and the winning check saved as the group's judge (group) | 35 | M5 *Hallucination benchmark*, compressed | C, K | S → G |
| | Lunch | | | | 75 | | | |
| 8 | Re-cut the tree | Prunes branches with nothing under them, keeps the minority branch visible, picks the one branch Day 3 builds from | Re-runs the judge on the edited tree | Opportunity tree v2 and the chosen branch (group) | 25 | M5 debrief, *Propose, double-check, apply* | T, C | G |
| 9 | Pre-mortem rounds | Ranks failure causes in repeated three-item rounds, then adds what was missing | Serves the rounds as a live voting page, then crunches ranking, spread and the causes people added | Ranked causes with spread (group) | 25 | (product craft; Klein) | T | G |
| 10 | Laptops shut | Plain conversation on the top cause and the most split one. Decides whether the chosen branch survives | None | The decision, said aloud and written on the board by a person (group) | 20 | (product craft) | T | G |
| | Break | | | | 15 | | | |
| 11 | Rules from today | Reads what the agents propose for the shared rules file and pushes back | Proposes rules from the day's evidence: what to doubt in the digest, the data rule, when to run the judge | Shared rules file update (group) | 15 | M3–M5 debriefs | K, C | G |
| 12 | Out the door | Briefs tonight's run | Scheduled run pre-populates Day 3's story map from the box, the hypotheses, the chosen branch and the top pre-mortem cause | Overnight run scheduled (group) | 10 | M2 scheduled agent | K | G |
| 13 | Close | Human round: who said "the agent got this wrong" today, and what we now trust | None | | 15 | (Agents 101 debrief mode) | T, C | G |

Planned: 305 working minutes of the 345 the day holds. The 40 left are where the room's overruns land.

## Per-beat design notes

**1. Digest.** The Day 1 overnight run is what Day 2 opens on: agents worked while people did not. Each person reads only their own source's part first, because they are the one who can tell a true line from a plausible one. *Failure:* the digest is thin or failed. *Recovery:* the trainer's fallback digest from the synthetic material, and the check is the same.

**2. Crux.** *Constraint:* one outcome, not two. The tree has one root. *Failure:* the group splits between two outcomes. *Recovery:* the team lead picks and the other outcome is parked on the board's edge, named as the second tree.

**3. Retrievers.** The Agents 101 move fits the room without bending: Agents 101 gives one person three retrievers; here each person owns one source, so each runs one retriever. The source's owner writes its brief, which is where their knowledge goes in. *Cut from Agents 101:* the demo *Agent that takes action*. *Failure:* one source is empty or unreachable. *Recovery:* that person adjudicates for another source instead; the curator notes the gap.

**4. Tree.** The personal trees come first so the minority branch exists before the consensus agent can average it away. The consensus map shows how many people found each branch. Three deciders, each with one job, carry Agents 101 M3's three-persona synthesis. Jester left out of the base design; candidate for a trainer-hosted variant. *Failure:* four Claudes return the same tree. *Recovery:* each person's own chat leads with their own source, so trees differ by evidence. *Cut from Agents 101:* lectures *When to split an agent* and *Debugging stuck agents* move to reference.

**5. What may go in.** Agents 101 M4's shape, product material: the check is run first and packaged second, and the security risk that matters most for product people is customer text in tickets and interviews that tries to give the agent instructions. The data question opened every Nordic persona's worries on the panel; here it is a decision the team makes, not a policy they are told. *Constraint:* anything unclear stays out until a named person says otherwise. *Group decision is human:* a person states the rule; the agent writes it down. *Cut from Agents 101:* *Audit your agent* compressed into the two-lens check; *Agent loop, raw* demo dropped. *Failure:* the room cannot answer what company policy says. *Recovery:* the open question goes into the rules file with an owner and a date, which is the point of "who decides".

**6–7. Grounding.** Agents 101 M5 runs four detectors over a 30-claim benchmark. Here the claim pool comes from the group's own tree, two detectors, and the people who know each source adjudicate. Human-vs-detector disagreement is the lesson: some of it is the detector wrong, some of it is the person. The saved judge is Day 3's first evaluation criterion. *Failure:* no invented claim turns up. *Recovery:* a good result, said so; the trainer can add planted claims from the synthetic material to show the judge catching one.

**8. Re-cut.** *Constraint:* one branch goes to Day 3. *Nothing written over:* pruned branches move to the board's edge with the reason. *Group decision is human:* the group names the branch; the judge's marks are input, not the vote.

**9–10. Pre-mortem.** Placed where confidence peaks, right after the re-cut, and the last cheap moment to switch branches. The riskiest cause becomes Day 3's slicing rule. **Protected beat:** 10. When the room overruns, 11 folds into 12 and 9 drops to two rounds; 10 keeps its 20 minutes.

**11. Rules.** The three Agents 101 debriefs (M3, M4, M5) become one, since the group shares one rules file. A person reads every proposed rule before it lands.

**12. Out the door.** Day 1's overnight move repeated with heavier material, so Day 3 opens on a story map 80% ready and the group's work is the missing 20%.

**13. Close.** Human round, no prompts. The question practises the control line where people can hear it: it was safe to say the agent got this wrong.

## Monday, for the team lead, product owner and designer

- Opens the scheduled digest on their own backlog and marks what they doubt before anyone acts on it.
- Has a written rule for what customer data goes into the team's agents and whose call it is when unclear.
- Runs the saved groundedness judge on an opportunity or research summary before taking it to a decision.

## Open

- Who hosts the board-level agents: rotating member (this sheet) or trainer.
- The three decider lenses (evidence, customer voice, delivery) are a draft.
- Day-1 failure modes cascade into beat 1; the fallback digest needs authoring with the synthetic material.
