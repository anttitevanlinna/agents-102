# The transition carries its data

## Extend the controlled transition
<!--tier:1-->

The controlled transition still wraps every phase of the engineering loop. It names who may change state, what evidence justifies the change, and how the system can stop or recover. A data boundary adds four annotations to that same transition: the data used, the purpose, the decision owner, and the retention or deletion rule.

This exposes two tensions instead of hiding them. Proof needs observation, but observation creates exposure. Useful autonomy needs authority, but safe autonomy limits authority.

Before approving a transition, ask: **who may cause it, what data may it use and retain for this purpose, what bounded evidence would justify it, and how can the system stop or recover?**

<!-- maintainer -->

**Review status:** static review only (2026-10-13 PR review), real audit pending. No judge run has scored this file.

**Time:** 2 minutes.

**Role:** M8 closer. A meta-frame after the debrief: names the controlled-transition extension the room just applied to two cases. Split out of `legality-needs-an-evidence-package` on 2026-10-13 so that lecture's teaching slides land before the exercise (`check_lectures.md` §1).

**Mood:** accountable humility.

<!-- backing -->

Claims
- `controlled-transition-data-extension` · vision · "A data boundary adds four annotations to that same transition" ← none-owed
- `two-tensions` · vision · "Proof needs observation, but observation creates exposure." ← none-owed

Frameworks
- Controlled transition with data boundary · [borrow:none] · law:none · ← none

Stance `[stance:2026-10-13 level:L2]`
- holds: the controlled transition that governs agent actions also has to carry the data each transition uses, its purpose, its owner, and its retention or deletion rule.
- contested: how much observation a transition needs before its proof outweighs the exposure it creates is workload-specific.
- would-move-it: a worked case where annotating transitions with data, purpose, owner, and retention fails to surface a copy that a separate data inventory catches.

OODA
- question: does a per-transition data annotation catch the same hidden copies that a standalone data inventory catches?
- roster: privacy-engineering practitioners, European Data Protection Board
- last-run: 2026-10-13

<!-- /backing -->
