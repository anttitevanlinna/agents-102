A Nordic engineering practitioner published a self-audited count of 490 merged PRs in one
month, worked as "30 to 40 sessions open, of which I actively manage 10 to 15" — and states
that the parallelism, not the code generation, is where the economics change. Another named
practitioner, four months earlier, caps himself at "three to four threads" and argues
cognitive bandwidth does not parallelize. Neither has instrumented anything.

The interesting part is not the 490. It is that the author's own bottleneck sits *downstream
of code review* — colleagues merge his PRs fine; the organisation cannot change its
expectations fast enough to consume what was already merged ("most people go quiet… they just
stop using the thing"). That is one station past the absorption bottleneck as the KB
currently defines it (review queue), and it has no name yet.

**Gap:** the concurrent-session ceiling is a named open disagreement between practitioners
with an order-of-magnitude spread and zero measurement on either side — no study, no
instrument, no defensible number for how many parallel agent sessions one operator can
actually steer. Every source is self-report. Also missing: a station in the
generation → verification → absorption sequence for output that clears review but is never
taken up.
