# Home page to Module 1: results

Newest first. Rubric and method in [path-rubric.md](path-rubric.md). All reads Sonnet, 20 per row (10 personas × 2) unless noted. Raw reads stay under ignored `out/`. None of these scores says anything about the quality of the language.

## 2026-11-25: live-prompt entry (branch claude/project-thread-pb7ywr e70e248)

| Version | Reach | arrive | start | first result | setup | briefing | Module 1 | promise | licence |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Old home (main 21adf75), same handbook | 73 | 100 | 100 | 100 | 88 | 98 | 75 | 100 | 100 |
| New entry: "what's stuck at work?" with the seven rows | 68 | 100 | 100 | 100 | 83 | 100 | 75 | 100 | 100 |
| After the design review (187bad9): rows above the fold, How it works cut, travelling arrow | 70 | 100 | 100 | 100 | 90 | 100 | 78 | 100 | 100 |
| Header is the brand only, real input box, quiet examples (66c993e) | 80 | 100 | 100 | 100 | 85 | 98 | 90 | 100 | 100 |

No drop past the 20-point bar. Every stage the home page drives scores the same; the 5-point gap sits in the handbook's setup stage, which both runs read from the same file.

## 2026-11-25: cards 1 to 3 on main 6aca3ce

Sim: reach 68 (setup 80, briefing 100, Module 1 75). Visual: **18/24, grade A, all gates pass** (licence 4). Across five reads of near-identical builds since 45cd329, reach sat between 65 and 80, which is this instrument's noise; the release goal of 85 is not met. What still holds readers: the course-files prompt looks technical (curl, tar, CLAUDE.md), and in Module 1 readers want a concrete action that sits in the exercise, past where the reading stops. The second is partly the instrument's cut at the first activity's title. Cards 4 (admin line) and 5 (policy and quiet-week line) were not applied: Antti called these known issues.

## 2026-11-25: visual re-score on main fe9a013

**18/24, grade A, all gates pass.** Route to Module 1 rose to 3 (plain contents list, empty panels hidden). The critic labelled it AA; the rubric needs 20 for AA, so `path-visual.js` now computes the grade itself. Left: home promise and chart; licence line easy to skim; the step 1 still shows a different request (media asset, passed to the videos owner); the course files prompt is long shell text (Card 1 pending); Module 1 Start here below the first viewport (Card 3 pending).

## 2026-11-25: re-score on main 0184e87 (handbook shell fixes)

Sim: reach 65 (setup 80, briefing 98, Module 1 80); the path text did not change since 78, so the drop is noise. Visual: **17/24, grade A, all gates pass.** Action rose to 3 (the "In Claude's reply" card). Still deducted: the contents descriptions under Continue to Module 1 are still underlined italic in the built page; the "Where to type and send" screenshot shows a different request ("Build me a snake game as a single HTML file…") from the one to type; the course files walkthrough panel is empty; Module 1 Start here is below the first viewport with no single first action (Card 3 pending); the home chart and its empty column.

## 2026-11-25: visual re-score on main c720e63

**17/24, grade A, all gates pass.** Promise 3, licence 4, start 3, action and result 2, route to Module 1 2, layout 3. The video focus gate was a false alarm: Tab moves into the player's own controls, which draw the browser's ring while `document.activeElement` stays on the video; `path-visual.js` now passes that case. Contents heading contrast passes after c26e40d. Deductions left: no "step N of 5" marker and a truncated section name at 421 px; "In Claude's reply" is a small label on plain text; the course files walkthrough shows a title with no media; Continue to Module 1 competes with a contents list in underlined italic; Module 1 "Start here" is below the first viewport at both widths; the home chart's ramp has no module names.

## 2026-11-25: content fixes in the first steps

| Version | Reach | setup | briefing | Module 1 | setup stars | Module 1 stars |
|---|---:|---:|---:|---:|---:|---:|
| Before (af58829) | 53 | 90 | 60 | 85 | 3.52 | 3.48 |
| **On main 45cd329:** step 5 links the short version of What is an Agent; Module 1 opens on Start here (its old Prework list dropped in the editions) | **78** | 85 | 98 | 85 | 3.45 | 3.42 |
| Draft A, not on main: the agent downloads the course files (Antti's curl prompt of 11-18 as written) | 65 | 75 | 100 | 80 | 3.32 | 3.33 |
| Draft B, not on main: Draft A without the username and password line, plain CLAUDE.md sentence in the body | 80 | 93 | 100 | 88 | 3.64 | 3.43 |
| Draft C, not on main: Draft B plus one line in Module 1 Start here naming the opening and the exercise | 80 | 83 | 100 | 98 | 3.59 | 3.69 |

The step 5 fix is the one move past the 20-point bar: briefing 60 to 98, reach 53 to 78. In Draft A, 8 of the first 10 readers named "If curl gets a 401, ask me for the username and password", since the open edition gives no credentials. Draft B's setup gain (85 to 93) and Draft C's Module 1 gain (85 to 98, the first action named) are inside the noise and shown by the quotes, not by the number. Drafts B and C wait for Antti's prompt-ok. The promise scorer gave 0.5 to answers it scored 1 on earlier runs (98 to 58 on unchanged home text), so it is not usable as a measure yet.

## 2026-11-25: re-score after the home page fixes (main af58829)

| Version | Reach Module 1 | arrive | start | first result | setup | briefing | Module 1 | Licence | Module 1 step |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Home fixes, same handbook | **53** | 100 | 100 | 100 | 90 | 60 | 85 | 100 | 100 |

Home stages stay at 100; start stars 4.25 to 4.45 (the Start button now lands on step 1). Reach 58 to 53 is noise: the handbook did not change. Visual: **17/24** (licence 1 to 3), same two handbook gate failures, so no grade until they are fixed. Remaining home deductions: the headline says what to bring, not what you can do afterwards; at 421 px the licence line is cut at the bottom of the first viewport, small and grey, and "see the team edition" does not read as a way to ask; home hero and handbook welcome still differ in scale.

## 2026-11-25: first run on main (new home page 0653e8a, open edition site/agents-101/)

| Version | Reach Module 1 | arrive | start | first result | setup | briefing | Module 1 | Licence | Module 1 step |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| New home + open edition (main) | **58** | 100 | 100 | 100 | 85 | 70 | 80 | 100 | 100 |
| Today's live landing (bosser.consulting/training) + ACME handbook | **33** | 55 | 38 | 65 | 63 | 38 | 63 | 15 | 65 |
| Control home page + ACME handbook (calibration v0) | 58 | 100 | 100 | 100 | 73 | 75 | 95 | 100 | 100 |

Release goal (reach 85, every stage 80, licence 80, Module 1 step 70) is **not met**: setup and briefing hold every reader who is unsure there, which caps reach at 58. The home page itself does its job: all 20 readers understood it, found the start and kept the licence. Against today's live landing, reach moved from 33 to 58 and licence from 15 to 100.

What slowed readers (count of 20 reads naming it):

- **Setup:** download the .tar.gz, find it, move it into the folder by hand (19); the copied prompt talks about shell commands and CLAUDE.md (17); the walkthrough is "Video coming here" (17). Windows readers note the only real video is Mac.
- **Briefing:** the step promises the reading "explains what changes when your agent can work with files and tools", but the LLM vs chat reading covers model versus chat and never says what makes this an agent (18). Cautious readers note a calendar screenshot is company data (2).
- **Module 1:** the module opens by repeating the prework list, then a reflective question with no instruction; readers are unsure whether to redo prework and what to do first (repeat 16, question only 19).
- **Start:** "Start with prework" lands on the welcome and a long contents list before step 1 (17). The handbook cover says "Six modules" while the home page lists seven (11).
- **Arrive:** "You need a paid Claude plan", and readers are unsure their plan counts (16 mention the plan line). Nothing says plainly the course works without connecting work apps (2).

Visual rubric, same build (`path-visual.js`, Sonnet critic): **15/24, A, gates fail.** Promise 3, licence 1, start 3, action and result 3, route to Module 1 2, layout 3.

- Gate: the Contents heading under Continue to Module 1 is 3.98:1 contrast (needs 4.5), both widths.
- Gate: the two video players take keyboard focus with no visible focus ring. Check in a real browser before fixing.
- Licence 1: the first viewport says "Free self-study course" and "You need a paid Claude plan", but not that teaching it needs a licence, and the "For teams" link is gone at 421 px. The licence line exists further down; the sim readers found it.
- Route 2: no five-step tracker; Continue to Module 1 competes with a full contents list and a "Use this workbook with another tool" link; the Prework contents row shows an empty "–"; Module 1 start puts "Start here" below the fold under a repeated Prework paragraph.
- Layout 3: home (wide, two columns, chart) and handbook (narrow column, different header) read as two products; the chart has no caption.

The ACME handbook alone, no home page: 8/24 (no home page scores 0 on three dimensions), same two gate failures.

## Calibration, 2026-11-25

Control home page (`path-controls/home-control.html`) in front of the ACME handbook (main 9612377), 20 reads per copy.

| Copy | Reach | start stage | Module 1 stage | Licence | Check |
|---|---:|---:|---:|---:|---|
| v0 | 58 | 100 | 95 | 100 | |
| Start link removed | 0 | 0 | 0 | 100 | detected (−58) |
| Licence line removed | 58 | 100 | 90 | 3 | detected (−97) |
| Continue to Module 1 and its links removed | 53 | 100 | 55 | 100 | detected on the Module 1 stage (−40) |
| One neutral sentence added | 63 | 100 | 93 | 100 | quiet (+5) |

Limits found: the headline reach cannot see a break late in the path while an earlier stage already caps readers (the bridge removal moved reach by only 5), so read the stage row too. The promise take-home scored 100 on every version, including today's landing, so it does not discriminate yet. The Module 1 step scorer gives full marks to readers who name the Start here question even when they are unsure what to do; it is lenient.
