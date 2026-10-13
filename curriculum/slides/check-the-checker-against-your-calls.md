## Compare the scoring agent with your own calls
<!--slide:check-the-checker-against-your-calls-->

A second agent with a different brief, scoring the work, is one more thing nobody has tested. Until you compare its verdicts with your own, you do not know how often it approves work you would have sent back.

Take a handful of real cases, judge them yourselves, and put your calls next to its verdicts. Where you disagree, add the reason to its brief, and run it again. In 2024, Hamel Husain, who writes on evaluating AI products, reported reaching better than ninety percent agreement on one product after three rounds of exactly this.

Start from real work, not imagined failures. Read what actually came back, sort what went wrong into piles, and write the first check for the biggest pile.

<!-- maintainer -->

**STATUS:** round 3 fixes applied (2026-10-06), Agentic Product Teams 101 rewrite for product people of AE101 `the-gate-is-a-claim` § The judge needs calibrating against your own judgement. Not taught (simulation training).

**Guard:** Husain's figure is one product, 2024, his own report; keep it dated in spirit and scoped to "on one product". Do not generalise to a typical agreement rate.

<!-- backing -->

**Claims**
- `untested-component` · vision · "A second agent with a different brief, scoring the work, is one more thing nobody has tested" ← none-owed
- `husain-ninety` · detail · "reported reaching better than ninety percent agreement on one product after three rounds" ← husain-llm-judge
- `real-traces-first` · borrowed · "Start from real work, not imagined failures" ← husain-field-guide

**Sources**
- husain-llm-judge `[checked:2026-09-08 result:OK due:none]` https://hamel.dev/blog/posts/llm-judge/ — [practitioner direct] published 2024-10-29; calibration loop; >90% agreement after three iterations on one product. Stamp inherited from `the-gate-is-a-claim`.
- husain-field-guide `[checked:2026-07-02 result:OK due:none]` https://hamel.dev/blog/posts/field-guide/ — [practitioner direct] error analysis first: read real traces, bucket failures. Stamp inherited from `the-gate-is-a-claim`.

**Frameworks**
- LLM-as-judge calibration · [borrow:practitioner-coined] · law:none · ← husain-llm-judge

<!-- /backing -->
