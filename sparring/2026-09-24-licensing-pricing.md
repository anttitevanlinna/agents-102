# Sparring: licensing the generation system + trainings — pricing & model

Session 2026-09-24/25, Antti ↔ Claude. Throwaway sparring; ideas under discussion, NOT decisions of record. Written from session context (condensed; Antti's turns paraphrased close to his words, Claude's condensed to substance).

## Setup

- Future customer: ~200-person tech org, transformation office (smart, AI-transformation background, no material, not deep enough to curate). One full-time internal person likely. Friendly, knows Antti years back, knows his business plan + SAFe pricing → pricing can be transparent/co-designed.
- Antti rate €200/h. DIY estimate given to customer: 1 month base infra + 1 month per 6-module training ≈ 4 person-months + ~10 days Antti.
- Antti keeps main consultancy (AI transformation leadership/advisory) ~3 days/week; licensing = side income stream; consultancy ≈ €200k/yr at full time. Target: 10–20 companies paying.
- Mid-game reference: Scaled Agile / SAFe (central body curates, partner network scales). Difference: Antti WANTS to license creation tools — every company builds own trainings now that AI makes it possible.

## Findings from repo (grounded)

- Crown jewels (check_*.md compendiums, `_index/`, memory) NOT in repo — live in Antti's ~/.claude on Mac / Google Drive. 835 files in repo reference `/Users/anttitevanlinna/...` → system not portable yet; productization = real work.
- COPYRIGHT.md Student Usage License forbids teaching material as training "internal to your company or external" → internal delivery needs a paid licence (good). BUT README "simple test" line ("…teammates inside my own company? If yes, you're inside the license") could be read as allowing free internal training → tighten before selling delivery licences.
- `self-study` skill = Claude-facilitated delivery; only fully passive delivery mode.
- `curriculum/trainings/engineering-management` = idea stage.

## Arc of the conversation

1. **First pricing pass.** Anchors: customer DIY ≈ €50–55k + 4-month delay (generous to them); Antti DIY income ≈ €16k. Per-student alone (200×€100 = €20k) prices content, not the system. Split: content licence / system licence / update subscription / hours. Update stream = moat (content decays in 9–12 mo). Partner terms: licence-back of generic improvements, internal-use only, no exclusivity, reference rights, partner price locked.
2. **Give away the factory, charge for canon + rules + network.** Antti's own frame: "tools commoditize". Moat = standard trainings (canon), rules/judges (taste), curator network (corrections flow upstream → compounding across customers; SAFe partners only delivered, never improved product). Customer content must be an overlay on base, not a fork. Per-student taxes adoption → drop in favour of size-banded membership.
3. **Monthly subscription.** ~€30k/yr value for 200 people; €3k/mo removes upfront risk, sits under signing thresholds, 12×3k = 36k (normal monthly premium). Weak points: snapshot-and-leave (contract: base rights end on termination; their own content stays theirs); setup doesn't fit 3k/mo (separate setup or waived with 6-mo commitment); monthly visible release needed. Antti's hours outside subscription always.
4. **Two subscriptions.** Content €1k/mo; Content+Platform €3k/mo (platform never sold without content). 9–12-month rollout = "transformation year". Content-only needs a delivery path (self-study / facilitator kit / train-the-trainer) or it's shelfware. Stable (quarterly) vs latest release channels. Passive-income math: canon upkeep ≈ 45 days/yr; 5 customers ≈ €1.3k/day (below consulting €1.6k/day), break-even ~7, 20 customers ≈ €5.3k/day.
5. **Stop/restart + stickiness.** Modes: subscription / per-student fallback (~€100/learner; sub pays off at ~10 learners/mo) / paused. Price the catalog, grandfather founders. Platform stickiness from method (curator habits, rules, network), not trapped content. Company's own rules in their layer = durable value. Stay authoring layer, NOT an LMS/intranet vendor.
6. **Antti: core = capability + content, not a platform play.** Size scaling ~€1k/200 people (taper above ~500; 1000 people ≈ €4k not €5k). Platform priced per curator/authoring team, not headcount. Train-the-trainer (TTT) priced separately; in a capability play TTT is where capability transfers.
7. **Customer play-through (start Feb 2027; Oct–Jan build).** TTT market refs per Antti: €3–5k per person (Prosci/SAFe) — too much for target buyers; €5k/cohort too little (a week of Antti ≈ €8k). → **€12k per cohort, up to 6 trainers, per training** (Antti: fair, good money). Antti corrected: Claude overshot trainer prep/babysitting — keep TTT light (3 room days, light follow-up). ~4–6 trainers per training for 200 people (groups ~16, pairs). Champions = the real schedule risk.
8. **Partner network needed to scale.** Start with ONE partner (Helsinki freelancer with strong AI skills). Partners do setup, TTT, pilots, local support; Antti keeps canon, rules, partner certification, subscriptions. Partner pays membership + ~€2.5k licence per cohort (higher ~€3.5k if Antti sourced the customer). Math, 3 customers (200/350/500): partner yr1 ≈ €117k / ~80 days (~€1.45k/day); yr2 without new customers ≈ €50k / 25 days; Antti ≈ €144k/yr from subs + cohort fees. Suits freelancer, not full-time employee (weekday room days). Single partner = single point of failure; Antti stays certified.
9. **Consultancy as R&D lab + sales channel.** Advisory work funds canon upkeep. Two fixes: stop giving material free to consulting clients (bundle as named line item or time-limited licence); consulting contracts must keep Bosser pre-existing IP + improvements with Bosser, client-specific deliverables with client, anonymised reuse allowed. Capacity: ~80–90 days/yr for this → partner not optional.
10. **Copyright/licensing structure (get Finnish IP lawyer to draft template).** Three layers: base (Bosser always) / customer additions (customer always) / combined (each owns own part, usable during licence). Modification never transfers ownership. Improvements: licence-back (non-exclusive, perpetual, royalty-free), not assignment. Termination relief valve: after 24 paid months → perpetual internal-use licence to last snapshot. Own template first; separate licence agreement vs services agreement; git provenance + copyright line in trainer notes; contract > copyright (AI-assisted authorship unsettled); confidentiality for rules. Cap liability at 12 months' fees.
11. **One-off snapshot licence for customer #1.** Do NOT assign copyright — perpetual, irrevocable, unlimited internal-use licence with full modification rights, group-company scope, no resale; they own their changes. Trigger payment objectively (go-live / date), not "if good enough". Platform materials deleted at separation; keep licence-back. Keep founding price confidential; later customers €25–40k snapshot or subscription. No exclusivity.
12. **Per-training split.** €5–6k perpetual materials licence per training, paid at start of that training's TTT cohort → go-live package ≈ €17–18k/training (licence + €12k cohort). Frame vs months of curator work, not "3 days of my time". Customer yr1 ≈ €55k (platform ~4 mo × €2k + 2 packages + hours). "~€25k unlimited capability for all engineers" — show list price + founding discount on paper (for their CFO/steering group); sell on capability not price; say "unlimited delivery rights".
13. **Management track → customer-built layer.** Agents 101 is the right start for managers (competence makes the question askable). Customer's instinct "managers first" = sequencing, not topic. → Managers take Agents 101 first + a thin management layer (extra day) **built by their curator on the platform**, Antti as advisor/reviewer at €200/h. Antti: "genius — puts 1+1 together; that's why they need the platform; capability born organically; avoids dependence fear." Practice: separate extra day first (interweave later); judges first, Antti reviews second; Antti's corrections → rules in THEIR layer; milestone e.g. curator ships management day mid-Jan, 2 reviews, pilot with first manager cohort before Feb. Open: managers in own cohorts vs mixed with teams.
14. **Technical release of the generation system.** Antti: move crown jewels from Google Drive to private GitHub repo; this repo stays public (copyright notice deemed enough). Claude: never put customers in one shared repo (customers see each other's branches; their IT won't allow content in supplier's repo). Use GitHub **organization** (personal-account collaborators always get write; Read role needs org), one team per customer with Read role, seats = team members, disable private-repo forking; removing access stops updates, local clones governed by contract only. Portability work: relativise 835 absolute paths, two-layer rule loading (base → customer). Consider packaging as Claude Code plugin from private marketplace (verify what plugins can carry, esp. rule files). Customer IT will security-review hooks/scripts; customers need own Claude licences. Free first month OK but licence signed day one at €0.
15. **Final architecture (Antti).** Three repos: **rules/secret sauce (private, base of everything)** → **standard trainings (Antti's)** → **customer's own repo**. Claude: never use GitHub fork button on a public repo (forks of public repos are public) — private copy + `upstream` remote. Trainings may be copied/edited freely; agent-assisted upstream merges make fork cost low; keep new material in new files + `CUSTOMIZATIONS.md` log; merge tagged stable releases. Rules consumed read-only (plugin/submodule), customer overrides in own layer. Antti has already done republish + light customisation of Agents 101 for one customer → check how updates went; paper it with a retroactive written licence (COPYRIGHT requires written permission).

## Working price sheet (200-person org, founding customer)

| Piece | Price |
|---|---|
| Platform during build | ~€2k/mo per curator (first month free, agreement signed day one) |
| Materials licence, per training (perpetual snapshot, full modification) | €5–6k |
| TTT cohort, per training (3 days, ≤6 trainers) | €12k |
| Antti advisory/review | €200/h |
| Later option: content subscription | ~€1k/mo per ~200 people |
| Later option: platform subscription | ~€2k/mo per curator team |
| Future customers' snapshot | €10–15k per training, or subscription |

## Open items

- Tighten README "simple test" line re internal delivery.
- Private system repo needs its own LICENSE pointing to customer agreement.
- Finnish IP lawyer: template licence agreement + services agreement.
- Portability pass (paths, rule layering, plugin packaging check).
- Retroactive licence letter for the earlier customer customisation.
- Decide manager cohort composition.
- Partner #1 profile + economics sheet.
