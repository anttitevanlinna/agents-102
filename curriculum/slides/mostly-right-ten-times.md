## Mostly right, ten times over, is mostly wrong
<!--slide:mostly-right-ten-times-->

If an agent is 85% correct on a single step (an illustrative number), that sounds forgivable.

Ten unverified steps in a row (retrieval, synthesis, formatting, writing, checking, rewriting, summarising, publishing) at 85% each come to about 20% end-to-end: one task in five correct, four in five with a defect, usually where you won't see it.

A short loop (look up the order, check the policy, draft the reply) stacks little. A full workflow with no check compounds every miss.

The number doesn't tell you what will go wrong, only that something will. Design for that.

<!-- maintainer -->

**Quality:** compendium-audited 2026-11-26 (writing@78d17fc9 technical@cf4fd816 slides@78d17fc9)
- judges @cf4fd816: writing PASS, technical PASS, slides PASS

<!-- backing -->

**Claims**
- `single-pass-compound-decay` · detail · "at 85% each come to about 20% end-to-end" ← compound-reliability-math — arithmetic on an illustrative premise; never present 85% as measured.
- `short-chain-example` · vision · "A short loop (look up the order, check the policy, draft the reply) stacks little." ← none-owed

**Sources**
- compound-reliability-math `[checked:2026-08-01 result:ATTESTED due:none]` (no URL — arithmetic) — [house canonical] Both directions of the compound-reliability figure. Single-pass: 0.85^10 ≈ 0.197. Loop-based with a 90%-catch detector plus fix: 10% → 1% → 0.1% → 0.01%. **This is arithmetic, not a finding, and the stamp exists to say so** — the numbers are checkable on a calculator and owe no citation. What owes care is the *premise*, and the two halves differ: the 85% per-step figure is illustrative rather than measured; the flip side's 10%/90% pair carries the maintainer's attested working prior (antti-first-pass-prior below), labeled a prior in body. The lecture uses both to motivate a design move rather than to predict a rate. fallback: keep the arithmetic; never present 85% as measured; keep the prior labeled a prior.

<!-- /backing -->
