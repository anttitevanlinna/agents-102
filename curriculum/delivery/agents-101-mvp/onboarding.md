# Start learning

Keep this workbook open beside Cowork. Read the next step here, copy its prompt into Cowork, and return here when the work is ready. The workbook holds the instructions; you supply your own material and judge the results.

## Start once

[Begin with Prework](#prework). It walks you through creating your training folder, downloading the starter, and making your first working files. Cowork is selected by default in the runtime picker above. Keep the same folder throughout the course.

Some prompts include a short return link. When Cowork finishes that request, it points you back to the relevant workbook section and saves a local position note. You can keep revising the current work before moving on.

Use the same Cowork task within a module. Start a fresh task where the workbook asks for one. Your files carry the work forward.

Your position note stays in your training folder. There is no course account to create. Modules 1 to 6 form the core course; Modules 7 and 8 extend it. The Module 8 proposal forum is a group activity.

[Start Prework](#prework)

## Pause learning

Before closing a task, ask the agent to save where you stopped.

**Prompt** Cowork

```text
Help me pause Agents 101 so I can resume later.

Write a short note at `prework/learning-position.md` with the workbook section I reached, its exact link if already known in this conversation, what I finished, anything still in progress, and my next action. Keep the note local. Do not include my name, company, or the contents of my source documents.

Do not mark unfinished work complete. If you do not know the exact workbook link, save the section title rather than inventing a link. Do not change my exercise outputs or root instructions.

Then tell me the note is saved and link to https://agents102.bosser.consulting/clients/acme-mvp/agents-101/#resume-learning for when I return.
```

## Resume learning

Open a Cowork task with your existing training folder. Copy this request to find your place in the workbook.

**Prompt** Cowork

```text
Help me resume Agents 101.

Read `prework/course-navigation.md` and `prework/learning-position.md` if they exist. Check only the exercise files named in the position note. Briefly tell me what I finished, what is still in progress, and the next action recorded in the note.

Give me the current workbook link when work remains. Give me the next link only when the note records the current activity complete. Do not infer that a whole exercise is complete just because an output file exists. If the note is unclear, ask me one question about where I stopped and wait for my answer.

If the note has a section title but no exact link, give me https://agents102.bosser.consulting/clients/acme-mvp/agents-101/ and the saved section title. Ask me to find that title in the workbook.

If there is no position note, send me to https://agents102.bosser.consulting/clients/acme-mvp/agents-101/#prework and ask which section I reached.

Do not run an exercise, regenerate any output, or create or edit root instructions. I will continue from the workbook.
```
