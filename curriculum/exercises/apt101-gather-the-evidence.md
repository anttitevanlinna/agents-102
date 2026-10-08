# Exercise: Gather the *evidence*

**Time:** 35 minutes, the trainer's short demo of the setup included.

**What you do:**

Each of you sends a retriever through one source of evidence, on your own laptop, in your own words. Then each of you runs a curator that folds all three retrievals into your own memory. Then the three of you look together at where the sources disagree.

Your evidence is scattered: interviews in one place, tickets and decisions in another, what other teams learned somewhere else again. Three retrievers at once is how the scatter gets read in half an hour instead of a week.

Every retriever reads `./crux.md` from your own folder: the outcome, the obstacle and the question you agreed in the last exercise.

## Phase 1: Send your retriever

*15 min*

<span class="rt-code">Open a second Claude Code session in your training folder.</span><span class="rt-cowork">Start a second Cowork task on your training folder.</span> Keep your first one open; you come back to it after the break.

Each of you takes the retriever closest to the evidence you know:

- **Team lead: the wiki.** Retro notes, decision pages, the team's own write-ups.
- **Designer: the documents.** Interview notes, research reports, the recordings' summaries on the shared drive.
- **Product owner: the open web.** Practitioners who ran a similar bet, and what they found.

Each retriever proposes search terms, clues or authors first and asks you to keep, swap or sharpen them. This is where your words go in: the term your customers use, the interview you remember, the person who wrote the post-mortem. Confirm quickly.

## Start your retriever

Team lead, ask Claude to act as your wiki retriever and stream findings into `sources/wiki-retrieval.md`.

{{prompt:three-retrievers-one-curator-1}}

Designer, ask Claude to act as your docs retriever and stream findings into `sources/docs-retrieval.md`.

{{prompt:three-retrievers-one-curator-2}}

Product owner, ask Claude to act as your internet retriever and stream findings into `sources/internet-retrieval.md`.

{{prompt:three-retrievers-one-curator-3}}

When your retriever's search terms are confirmed, before it runs, give it two limits. It reads only what your team let in on Day 1, and it brings back at least one finding against the bet.

{{prompt:apt101-d2-carry-the-doubt}}

If a retriever starts reading the world, stop it, steer narrower ("ten sources at most, only the space I named"), then say *"continue"*.

Retrievers tend to wrap up early. A tidy *Conflicts and gaps* section looks finished; usually it isn't. When the first pass lands, push your retriever for another round.

{{prompt:three-retrievers-one-curator-4}}

If you have no connector to your wiki or drive, point the retriever at your own `sources/` from Day 1 instead.

## Phase 2: Curate while they run

*10 min*

When your retriever's second round lands, copy its file to `team/<your-name>/`, and copy the other two into your own `sources/` as they land. Everyone's memory then reads the same raw evidence.

Each of you, <span class="rt-code">open one more Claude Code session</span><span class="rt-cowork">start one more Cowork task</span> and ask Claude to act as the curator, integrating the three retrievals into your own `memory/` as they arrive.

{{prompt:three-retrievers-one-curator-5}}

The retrievers fetch; the curator decides what sharpens memory and what contradicts it.

## Phase 3: Look where the sources disagree

*10 min*

When your curator writes its synthesis note, open it. The line that matters is the one quoting where the sources contradict each other or contradict what memory already held.

Each of you reads the contradictions that touch your own source, then reads them out to the other two. The designer: does an interview say something the tickets don't? The product owner: does the outside evidence cut against the bet? The team lead: did the retro notes record a lesson the other two sources ignore?

Push back if the curator smoothed a disagreement into one clean need. Ask it to quote both sides raw. A disagreement between two sources is not noise to average away. It is often the first branch of your tree.

Then read your retriever's skipped list aloud: the sources it left out because your team kept them out on Day 1. For one of them, say whether it would have changed the outcome you picked. If yours skipped nothing, say so.

## Take stock

Three sources read at once, three memories curated from the same evidence, and a short list of places your evidence does not agree with itself. Keep the list in your heads for the tree after the break.

<!-- maintainer -->

**Quality:** compendium-audited 2026-10-08 (writing@a3f96345 technical@1faabaa8 behavior@21214fc5 pedagogy@a3f96345 strategy@ed634491 slides@a3f96345)
- judges @a3f96345: writing PASS (2 findings see instances/agentic-product-teams-101--exercise--apt101-gather-the-evidence.writing.json), technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS

**Role in Day 2:** beat 3. Fills every `sources/` and `memory/` with fresh evidence scoped to the agreed outcome; surfaces the contradictions the tree grows from. Followed by the lecture *Why it agreed*, which names why the digest agreed after the trio has seen sources disagree.

**Reuse:** Agents 101 `three-retrievers-one-curator`, keys `three-retrievers-one-curator-1` to `-5`, unchanged. New: `apt101-d2-carry-the-doubt`, said after the search terms are confirmed, carries the door (`team/what-goes-in.md`; the team lead's wiki retriever otherwise pulls back pages the door kept out) and the chosen doubt (`## Doubt` in `./crux.md`, from pick the outcome), and requires at least one finding against the bet. Priced inside phase 1's 15 minutes: said at the confirm step. Role mapping is APT101's: team lead wiki, designer docs, product owner internet; each person runs the curator in a further session.

**Topology (deviates from Agents 101's one filesystem):** retrievers run on three laptops, so retrieval files travel by copy through `team/<name>/` into every `sources/`. Each person runs the curator over the same three retrievals, so every laptop holds the curated memory (`m3-curated-memory`) that `three-minds-one-synthesis-1/2`, `hallucination-bakeoff-1` and `eval-loop-1/2` require.

**Frameworks:** none named in body. Multi-agent fan-out is the felt move; the disagreement read is the pedagogical payload.

**Artefacts:**
- Consumes: `./crux.md` (pick the outcome, incl. `## Doubt`); `team/what-goes-in.md` (Day 1, the door); `team/bet.md`; `sources/`, `memory/` (Day 1, product memory).
- Produces: `sources/wiki-retrieval.md`, `sources/docs-retrieval.md`, `sources/internet-retrieval.md` (one per person, copied to `team/<name>/` and into every `sources/`); each person's curated `memory/` and the curator's synthesis note (`memory/_synthesis-m3.md`).

**Room:** solo retrievers and curators in parallel; phase 3 is the trio together, each reading out the contradictions on their own source. Trainer demos the two-session open at the start (beat sheet "short demo").

**Door test:** phase 3's skipped-list read makes the Day 1 door a tested decision, not only an obeyed one: each person says whether one skipped source would have changed the outcome picked in `apt101-pick-the-outcome`.

**Failure modes:** a retriever with no connector (escape: point it at `sources/`); curator batching at the end instead of streaming (coach as Agents 101); the contradiction line smoothed (push back to quote both sides).

**Leap test:** on Monday each person (1) has a memory that carries at least one finding against the bet, marked; (2) can name a source the door kept out and what it might have said; (3) reads a contradiction between two sources with both sides quoted.

**View summary:** Each of you sends a retriever through one source of evidence while a curator folds the findings into memory. Together you read where your sources disagree.
