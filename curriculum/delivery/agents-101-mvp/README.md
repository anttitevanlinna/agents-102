# Agents 101 MVP delivery

Codename `acme-mvp`; display identity ACME. Full canonical Agents 101 workbook, Cowork default, starter download, sparse return checkpoints through prework and Module 1, local pause/resume note. No standalone Teacher task or prewritten learner root instructions.

Build from repository root:

```sh
node scripts/build-a101-mvp.js
```

Output: `site/clients/acme-mvp/`. Workbook URL: https://agents102.bosser.consulting/clients/acme-mvp/agents-101/

`onboarding.md` owns the Start/Pause/Resume section. `course-navigation.md` ships at `prework/course-navigation.md`. `checkpoints.json` maps canonical prompt keys to current and next workbook anchors. The builder derives a temporary prompt overlay; canonical exercises and prompts remain single-sourced. The starter contains the same checkpoint prompts as the workbook.

Checkpoint contract: complete the learner's current request; show an exact workbook link; save current/next position locally; stop before the next activity. Preserve input hooks as the last prompt line. Navigation never installs root rules, supplies learner context, or sends reports.

The public edition uses the existing Pages pipeline. Its paths are separate from the password-gated customer edition. Generated output includes the full workbook and starter; teacher material is excluded. Fonts use local fallbacks to avoid Google Fonts requests.

Release checks: build from current source; verify all checkpoint anchors and the download URL; extract the starter; confirm no old facilitator or root rules; exercise the rendered runtime selector, Copy controls and pause/resume prompts. Learner acceptance: start in Cowork, complete Module 1, close the task, and find the correct workbook section from a new task without facilitator help.

Anonymous report submission and persistent context-file checkpoint loading belong to a later iteration. This MVP uses return cues in the copied prompts.
