---
key: apt101-d1-pin-the-bet
dest: Claude Code
runtime: any
origin: agentic-product-teams-101/apt101-what-goes-in
requires:
  - id: team-bet
    source: prompt:apt101-d1-bet-gather
produces:
  - id: challenge-md
    location: ./challenge.md
    note: the bet seen from one seat; read by build-your-challenge-memory-* and a101-m2-debrief-claude-md
---
Read team/bet.md. Under the outcome there are three hypotheses, each under the name of the person who wrote it. Mine is the one under my name.

Then ask me three questions, one at a time. Wait for my answer before the next one. Don't show me the list.

1. What does my hypothesis try, in plain words, as I'd say it to a colleague?
2. What do I already know about it from my own material: what I've seen, read or heard, and what is already ruled out?
3. Where am I stuck: the part I can't get past, or the question I keep asking and not landing?

Use my words in the brief, not the bet file's. Where my answer is vague, ask once for the example behind it.

Then write a half-page brief to ./challenge.md. Head it with the outcome and my hypothesis, quoted word for word from team/bet.md. Under them, my three answers as short paragraphs. Tell me in two lines what you wrote and which of my answers you had to ask about twice.
