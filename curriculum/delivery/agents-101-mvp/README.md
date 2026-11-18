# Agents 101 MVP delivery

Codename `acme-mvp`; display identity ACME. Full canonical Agents 101 workbook, Cowork default, starter download, navigation through Prework and Module 1, and a local pause/resume note. The workbook holds the teaching; the learner supplies context and decides when to continue. There is no separate Teacher task.

Build from repository root:

```sh
node scripts/build-a101-mvp.js
```

Output: `site/clients/acme-mvp/`. Workbook URL: https://agents102.bosser.consulting/clients/acme-mvp/agents-101/

`onboarding.md` owns the Start/Pause/Resume section. `course-navigation.md` ships at `prework/course-navigation.md`; the builder appends six return rows derived from the nine prompt keys in `checkpoints.json`. The four calendar variants share one return row. The guide owns navigation, completion distinctions and local position recovery. Canonical exercise prompts remain unchanged except for the edition's starter-extraction overlay.

The archive contains no root `CLAUDE.md`. After extraction, the installation request creates or augments that file with the course-only reading cue `Read prework/course-navigation.md before helping with Agents 101 work.` It preserves existing instructions, avoids duplicate cues, and reads the guide. The learner then sets the Cowork training-folder instruction to `Read CLAUDE.md before working in this folder.` No personal context, generation rules or teacher persona is installed.

This is an explicitly authorized ACME-edition exception to the canonical empty-root start. It changes the delivery architecture; it does not relax the evidence required by the onboarding outcomes. The learner still authors actual working rules in the Module 2 debrief and preserves the navigation cue there.

Return contract: finish the learner's current request; show the guide's relevant workbook link; save current/next position locally; stop before the next activity. A written file does not mean the learner has played, compared, inspected or accepted it. Navigation sends no reports and supplies no learner context.

The public edition uses the existing Pages pipeline. Its paths are separate from the password-gated customer edition. Generated output includes the full workbook and starter; teacher material is excluded. Fonts use local fallbacks to avoid Google Fonts requests.

Release checks: build from current source; verify the six guide rows, their anchors and the download URL; confirm the archive excludes facilitator material and root instructions; test installation into an empty folder and one with existing instructions. Verify the installed cue, preserved learner instructions, guide read, rendered runtime selector, Copy controls and pause/resume prompts. Learner acceptance: start in Cowork, set its folder reading instruction, complete Module 1, close the task, and find the correct workbook section from a new task without facilitator help.

The onboarding instrument is documented in [the eval protocol](../../evals/onboarding/agents-101/README.md). Its CLI adapter records any root reading cue supplied as harness-loaded context; that is filesystem/model evidence, not proof of native Cowork instruction loading. Native Cowork startup and automatic loading require observation in Cowork. Anonymous report submission remains outside this MVP.
