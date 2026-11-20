# Agents 101 MVP delivery

Codename `acme-mvp`; display identity ACME. Eight canonical Agents 101 modules with edition-specific startup, Cowork default, starter download, navigation through Prework and Module 1, and a local pause/resume note. The workbook holds the teaching; the learner supplies context and decides when to continue. There is no separate Teacher task.

Build from repository root:

```sh
node scripts/build-a101-mvp.js
```

Output: `site/clients/acme-mvp/`. Workbook URL: https://agents102.bosser.consulting/clients/acme-mvp/agents-101/

`onboarding.md` owns the welcome and Pause/Resume. The opening shows the first request, Open in Claude, and screenshots of the Send arrow and the game. Clicking Open in Claude also reveals the manual Copy instructions. `prework.md` walks through playing the game, creating a folder to save it, adding the course files, summarizing meetings and reading the agent introduction. The course index follows Prework. Pause, Resume and alternate tools appear at the end of the workbook. The calendar exercise defaults to a screenshot. The public workbook and packaged handbook share this Prework. Saved links still resolve.

A Mac/Windows setup picker appears before the first folder step. It detects the OS, allows an override and keeps that preference in browser-local storage. It selects the matching folder directions and video captions without changing the runtime. The offline companion carries the same control.

Two text-only video placeholders cover folder selection and adding the course files. The captions identify the steps each planned video will show.

`course-navigation.md` ships at `prework/course-navigation.md`; the builder appends six return rows derived from the nine prompt keys in `checkpoints.json`. The four calendar variants share one return row. The guide owns navigation, completion distinctions and local position recovery. Canonical exercise prompts remain unchanged except for the edition's starter-extraction overlay.

In Cowork, the learner plays in the conversation preview before attaching a folder, then saves the same game to `prework/snake.html` in that conversation. The workbook offers a browser fallback and keeps the canonical local-file request for CLI and other local runtimes. Until starter setup is complete, the learner bookmarks their workbook section to resume manually. Extracting the starter preserves the game.

After extraction, the request adds the course-only reading cue `Read prework/course-navigation.md before helping with Agents 101 work.` to `CLAUDE.md`, preserving existing instructions. It reads the guide and returns the learner to the calendar exercise. Pause and Resume explicitly name the guide once it is available.

This is an explicitly authorized ACME-edition exception to the canonical empty-root start. It changes the delivery architecture; it does not relax the evidence required by the onboarding outcomes. The learner still authors actual working rules in the Module 2 debrief and preserves the navigation cue there.

Return contract: finish the learner's current request; show the guide's relevant workbook link; save current/next position locally; stop before the next activity. A written file does not mean the learner has played, compared, inspected or accepted it. Navigation sends no reports and supplies no learner context.

The public edition uses the existing Pages pipeline. Its paths are separate from the password-gated customer edition. Generated output includes the full workbook and starter; teacher material is excluded. Fonts use local fallbacks to avoid Google Fonts requests.

Release checks cover the build, guide links, versioned download, preserved learner files and instructions, and copied requests. Learner acceptance requires observing a first start in Cowork and a return to the workbook from a fresh conversation using the same folder.

The onboarding instrument is documented in [the eval protocol](../../evals/onboarding/agents-101/README.md). Its CLI adapter records any root reading cue supplied as harness-loaded context; that is filesystem/model evidence, not proof of native Cowork instruction loading. Native Cowork startup and automatic loading require observation in Cowork. Anonymous report submission remains outside this MVP.
