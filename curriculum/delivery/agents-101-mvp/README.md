# Agents 101 MVP delivery

Codename `acme-mvp`; display identity ACME. Eight canonical Agents 101 modules with edition-specific startup, Cowork default, starter download, navigation through every module, and a local pause/resume note. The workbook holds the teaching; the learner supplies context and decides when to continue. There is no separate Teacher task.

Build from repository root:

```sh
node scripts/build-a101-mvp.js
```

Output: `site/clients/acme-mvp/`. Workbook URL: https://agents102.bosser.consulting/clients/acme-mvp/agents-101/

Open edition (free self-study, personal-use licence): `node scripts/build-a101-mvp.js --edition open` → `site/agents-101/`, URL https://agents102.bosser.consulting/agents-101/. Modules 1 to 6 plus `agents-building-agents-solo` once that file exists; Modules 7 and 8 are the licensed team edition, so the open starter drops their offline theory, pattern file and team-only prompts. Footer licence line, minutes per module (computed), paid-plan note on M1, Pro usage-limit notes on M3, M5, M6. The folder video ships as files under `media/` (preload none); the offline handbook inlines it. Umami and step feedback via `site/analytics.json` output `open/agents-101`.

`onboarding.md` owns the welcome and Pause/Resume. Learners type a one-sentence Snake request in a new Claude Desktop conversation. The welcome has links to the game, the folder step and the calendar briefing. The first walkthrough includes a real message-box still and a placeholder for the request-to-result clip. Receiving the requested game file completes the first activity. Trying or changing it is optional. The learner switches back to the open handbook and follows “Keep my game.” The page displays the Mac or Windows app-switch shortcut. `prework.md` walks through making the game, creating a folder to save it, adding the course files, summarizing meetings and reading the agent introduction. The course index follows Prework. Pause, Resume and alternate tools appear at the end of the workbook. The calendar exercise defaults to a screenshot. The public workbook and packaged handbook share this Prework. Saved links still resolve.

A Mac/Windows setup picker appears before the first folder step. It detects the OS, allows an override and keeps that preference in browser-local storage. It selects the matching folder directions and video captions without changing the runtime. The offline companion carries the same control.

Two text-only video placeholders cover folder selection and adding the course files. The captions identify the steps each planned video will show.

`course-navigation.md` ships at `prework/course-navigation.md`; the builder appends one return row per distinct task in `checkpoints.json`. The four calendar variants share one row; Modules 2 to 8 each return on their debrief. A row tagged `module` is dropped by an edition that leaves that module out. The guide owns navigation, completion distinctions and local position recovery. Canonical exercise prompts remain unchanged except for the edition's starter-extraction overlay.

In Cowork, the learner receives the game in the conversation. The learner looks for the file or game board in the reply. The next activity saves the same game to `prework/snake.html` in the learner’s folder. CLI and other local runtimes use the canonical local-file request. Until starter setup is complete, the learner bookmarks their workbook section to resume manually. Extracting the starter preserves the game.

After extraction, the request adds the course-only reading cue `Read prework/course-navigation.md before helping with Agents 101 work.` to `CLAUDE.md`, preserving existing instructions. It reads the guide and returns the learner to the calendar exercise. Pause and Resume explicitly name the guide once it is available.

This is an explicitly authorized ACME-edition exception to the canonical empty-root start. It changes the delivery architecture; it does not relax the evidence required by the onboarding outcomes. The learner still authors actual working rules in the Module 2 debrief and preserves the navigation cue there.

Return contract: finish the learner's current request; show the guide's relevant workbook link; save current/next position locally; stop before the next activity. A written file does not mean the learner has played, compared, inspected or accepted it. Navigation sends no reports and supplies no learner context.

The public edition uses the existing Pages pipeline. Its paths are separate from the password-gated customer edition. Generated output includes the full workbook and starter; teacher material is excluded. Fonts use local fallbacks to avoid Google Fonts requests.

Release checks cover the build, guide links, versioned download, preserved learner files and instructions, and copied requests. Learner acceptance requires observing a first start in Cowork and a return to the workbook from a fresh conversation using the same folder.

The onboarding instrument is documented in [the eval protocol](../../evals/onboarding/agents-101/README.md). Its CLI adapter records any root reading cue supplied as harness-loaded context; that is filesystem/model evidence, not proof of native Cowork instruction loading. Native Cowork startup and automatic loading require observation in Cowork. Anonymous report submission remains outside this MVP.
