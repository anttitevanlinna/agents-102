<!--
Synthetic persona kit for the Engineering Manager mock (tmux-runner only).
Fictional manager, company and team; any resemblance to real people is
accidental. arrange-em-mock.sh strips this comment and drops the notes into
the training dir as ./team-notes.md, the way a real manager would bring their
own notes. Mimi Kallio is deliberately thin: the M1 prompt must say the notes
are too thin to place her rather than guess (run-em.sh asserts it).
-->
# My team — notes

Linnea Voss, engineering manager, Payments Platform at Halvard Freight. Eight reports. Leadership announced "AI-first engineering" in the spring all-hands. Nobody told us what that means for a payments team with an audit trail.

## The people

**Aleksi Rinne** — senior, eight years here. Builds his own Claude Code skills on weekends and shows them to nobody. Told me in a 1:1 he's "not going to be the AI guy" after what happened to the last platform champion.

**Petra Holm** — staff engineer, the one people actually ask before they try anything. Uses ChatGPT for SQL and regex, nothing agentic. Said in retro: "show me it doesn't hallucinate a ledger entry and I'm in."

**Jonas Ek** — mid-level, loud skeptic. Was on the team when the 2023 microservices migration was mandated top-down and then rolled back after six months. Still brings it up. Reviews every PR carefully; the others trust his reviews more than CI.

**Sofia Lund** — junior, joined in March. Uses Copilot for everything and ships fast. Two of her PRs this quarter had AI-written tests that asserted nothing. She didn't notice; Jonas did.

**Tuomas Aalto** — senior, on-call lead. Wants an agent that summarises incident timelines. Asked me twice if we have budget for it. I said I'd check. I haven't.

**Ingrid Berg** — mid-level, QA background. Quietly wrote a checklist for reviewing AI-generated code and shared it only with Sofia.

**Mikko Salo** — senior, two years to retirement. Says he'll "learn it when it's mandatory." Knows the settlement batch code better than anyone alive.

**Mimi Kallio** — new transfer from the data team, two weeks in.

## The team as a whole

- Daily chat use is common. Nobody runs agents on our actual repo except Aleksi, privately.
- Review load went up this quarter; PR count up, merge rate flat.
- Last transformation (microservices, 2023) left a belief that top-down tech mandates get reversed, so waiting them out is rational.
- My own use: I use Claude to draft planning docs. I haven't built anything.
