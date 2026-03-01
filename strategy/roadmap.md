# Roadmap

Three milestones. Each defined by a CTO action, not a score.

## Milestone 1: Site Ready for CTO Sharing

**CTO action:** Visits the site, understands the value in 30 seconds, takes the quiz, shares the link internally, contacts Antti.

**What "ready" means — the CTO journey:**
1. **30 seconds:** Understand the problem and who this is for (landing page hero + gap)
2. **2 minutes:** Believe this person is credible and has real experience (practitioner proof, not marketing)
3. **Share trigger:** Find something worth sending to their team ("take this quiz, see where you land")
4. **Contact trigger:** See thinking they want access to (research article demonstrates depth)
5. **Next step:** Know exactly how to reach Antti (obvious CTA)

**Quality gates (evals catch epistemic problems that would make a CTO dismiss the content):**
- [x] `site/index.html` passes Theme C (Epistemic): 0.725 PASS (2026-02-28, iteration 1)
- [x] `site/check/quiz.js` passes Theme C: 0.760 PASS (2026-02-28, with request context)
- [x] `site/readiness/quiz.js` passes Theme C: 0.748 PASS (2026-02-28, iteration 1)
- [x] `content/spillover.md` passes Theme C: 0.792 PASS (2026-02-28, iteration 2)
- [x] Site deploys via GitHub Actions (done 2026-02-28)
- [x] All internal links work (check/, readiness/, article.html, curriculum/) — verified 2026-02-28, deployment fix: workflow copies content/ into site/ before upload

**Current scores (2026-02-28, after iteration 1):**
| File | Theme C | Status |
|------|---------|--------|
| site/index.html | 0.725 | PASS |
| site/check/quiz.js | 0.760 | PASS |
| site/readiness/quiz.js | 0.748 | PASS |
| content/spillover.md | 0.792 | PASS |

## Milestone 2: Detailed Curriculum on Site

**CTO action:** Sees what Agents 102 covers, forwards to their team with "let's discuss this."

**What "ready" means:**
1. Curriculum overview page exists on site (client-side rendered from .md)
2. Each module has enough detail for a CTO to assess fit — not a full syllabus
3. Navigation from landing page to curriculum is obvious
4. The curriculum page reinforces the "practitioner, not consultant" positioning

**Quality gates:**
- [x] Curriculum pages exist on site (client-side rendered from .md): site/curriculum/index.html renders content/curriculum-overview.md (2026-02-28)
- [x] Curriculum content passes Theme D (Pedagogy): 0.890 PASS (2026-02-28)
- [x] Module descriptions pass Theme C (Epistemic): 0.785 PASS (2026-02-28)
- [x] Navigation from landing page to curriculum works: "See the curriculum →" link in Bootstrap step + curriculum card in For Leaders (2026-02-28)
- [x] Curriculum page works as standalone landing page with CTA, credibility section, cross-nav (2026-02-28)

## Milestone 3: Newsletter Launch

**CTO action:** Subscribes to "Deploying Agents," receives weekly research they forward to their leadership team.

**What "ready" means:**
1. Signup mechanism on site (email capture)
2. First issue demonstrates the kind of thinking CTOs want recurring access to
3. Distribution configured (LinkedIn + email)

**Quality gates:**
- [ ] Newsletter signup mechanism on site
- [ ] First issue drafted from research findings
- [ ] Issue passes Theme B (Editorial) >= 0.7
- [ ] Issue passes Theme C (Epistemic) >= 0.7
- [ ] Distribution channel configured (LinkedIn + email)
