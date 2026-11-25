# Prework takes — what to record

Session plan, 2026-11-20. Delete when the takes ship.

Target = the two video slots the ACME Prework already has: `a101-video-placeholder` in `codex/acme-mvp` `curriculum/delivery/agents-101-mvp/prework.md` §2 and §3. Everything else on that page is text, a still image, or a step the student can see happen without help. The start screen (Open in Claude, Send cue) is skipped: its layout is still changing every few minutes on that branch.

## Takes

| # | Take | Slot | Status | Start state → end state |
|---|---|---|---|---|
| T1 | `a101-prework-add-folder` (Mac) | §2 "from Add folder until you see agents-101 below the message box" | chain passed the student-reviewer, round 6 | new empty chat → chip reads `agents-101` |
| T1b | same, in the ACME start state | §2 | **verify first** | snake conversation open, preview beside it → chip reads `agents-101` |
| T2 | `a101-prework-course-files` (Mac) | §3 "move the download into agents-101 and ask Claude to unpack it" | not recorded; feasibility below | T1b end state + starter in Downloads → course folders in `agents-101` |
| T3 | `a101-prework-calendar-upload` | none (§4 is text) | optional, only if a reviewer says §4 is unclear | needs a synthetic calendar PNG fixture — never the real calendar |

**T1b.** In the ACME flow the student adds the folder mid-conversation, after the game, with the preview open. Run one dry take from that state:
- Chip in the same place and looking the same: reuse hints 2–6 (picker, name, Open, Allow); re-record only 1a/1b and 7, which show the message box.
- Otherwise: a new take with the snake conversation as its start state.
- The picker, name, Open and Allow hints never depend on the chat state.

**Caption in the box (maintainer idea, 2026-11-20).** Opening hint of T1/T1b: `say_in_box` types a one-line note into Claude's message box, then the pointer moves to the chip. The words are the maintainer's ("You can store your recurring work in folder or project…"; full line pending). It must read as a note, never as a prompt to type. `clear_box` before the take ends. Same device for any scene: say what to look at, in the app's own voice.

**T2 feasibility (decide before writing it).**
- **Downloads.** The Downloads folder and the browser's download list show private filenames. Route: drag from the browser's download bubble straight onto a Finder window open on `agents-101`. That window shows only `prework/` and the starter file, all course names. The Downloads folder never appears on screen.
- **Unpack.** Show the request being sent in Cowork (allowlisted text), then the result as the `agents-101` Finder window filling with the starter's folders (`agents`, `memory`, `module-4`, `patterns`, `prompts`, `sources`, the handbook). The model's reply is never cut raw: free text fails the raw guard by design. Cut the reply from the redacted video, or leave it out ("cut to the hint").
- **Open call.** `main` (cb424798) has the agent curl the starter. ACME has the student download it in the browser. Which wins decides whether T2 has a browser half at all.

## Per-take fixtures and teardown

- T1/T1b: `~/Documents/agents-101` must not exist (the take's guard). Teardown: remove it after the clip passes (`rm -rf` only that path, created by the take). Each take leaves a chat in Cowork Recents, which the maintainer clears by hand.
- T2: starts from T1b's end. Fixture: the published `agents-101-starter.tar.gz` in `~/Downloads` (downloaded by the take, not a leftover). Per-take allow lines: the starter's top-level names.
- T3: fixture `fixtures/calendar-week.png`, synthetic (made-up meetings, no real names).

## Gaps for the maintainer

- **Windows.** Both slots are per-OS (`data-a101-os-only`). This Mac cannot record Windows. Options: a Windows machine or VM running the same driver idea (OCR + clicks need a Windows port), or text-only Windows steps.
- **Which flow wins** (main's canonical Prework vs ACME's play-first): decides T1b, T2's browser half, and whether main's step 1 text gets carded. Do not card `prework.md` §1 until then.
- Placement: ACME's placeholder divs are the slots. No video widget exists on `main` (`curriculum/widgets.md`).

## Definition of done per take

Dry run passes → record → `clip.sh` CLEAN → `review.sh` loop until a fresh reviewer says `great and clear` → commit the take file (never `out/`).
