## Test with five users, fix, then test five more
<!--slide:watch-them-use-it-->

When an agent can change the slice between sessions, the fix between test rounds stops being the slow part. So run small rounds, and many of them.

That is Jakob Nielsen's rule in full (2000): "The best results come from testing no more than 5 users and running as many small tests as you can afford." Each extra user in the same round mostly repeats what the earlier ones showed, so fix the design and test five more.

The five hold only for comparable users. Two distinct groups means testing each.

<!-- maintainer -->

**Quality:** compendium-audited 2026-10-08 (writing@0ba99eb1 technical@0ba99eb1 slides@0ba99eb1)
- judges @0ba99eb1: writing PASS, technical PASS, slides PASS

**STATUS:** composed from the squint (2026-10-07), opens `apt101-bet-meets-five-users`. APT101 gap G:watch-them-use-it from `apt101-source-pack-2.md` §8. Opens on the training's position (cheap fixes make small, many rounds the right size), then Nielsen's full sentence as the one fact used; Krug's watching method (think-aloud, observers, debrief) is on `a-morning-a-month`, which this lecture does not include. Scoped to usability testing (pack Drift 3). The 85% figure is left out: it rests on L = 31%, an average across Nielsen's projects (pack Drift 2). Not taught (simulation training).

<!-- backing -->

**Claims**
- `five-and-many-small-tests` · borrowed · "The best results come from testing no more than 5 users and running as many small tests as you can afford." ← nielsen-5-users-2000
- `fix-and-test-five-more` · borrowed · "Each extra user in the same round mostly repeats what the earlier ones showed, so fix the design and test five more." ← nielsen-5-users-2000
- `comparable-users` · borrowed · "The five hold only for comparable users" ← nielsen-5-users-2000
- `fix-not-the-slow-part` · vision · "the fix between test rounds stops being the slow part" ← none-owed — APT101 stance: what cheap building changes about Nielsen's iteration.

**Sources**
- nielsen-5-users-2000 `[checked:2026-10-06 result:OK due:none]` https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/ — [practitioner direct] test no more than 5 users and run many small tests; 15 users' budget as 3 studies of 5 with fixes between; comparable-users caveat.

**Frameworks**
- Five-user usability testing · [borrow:practitioner-coined] · law:none · ← nielsen-5-users-2000

<!-- /backing -->
