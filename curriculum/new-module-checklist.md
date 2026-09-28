# New module integration checklist

Use this after the three-pass content build whenever a training gains a module. It is the end-to-end hookup check: authoring a good module file is necessary, but it is not the same as shipping a module.

Canonical detail stays in the linked rules and training architecture. This page names the surfaces that must not disappear between them.

## Working rule

- Give every applicable item a checked box in the change's completion receipt.
- Mark a conditional item `N/A — <reason>`. A blank item is not an N/A.
- Keep the curriculum repo and its paired private strategy/eval repo on aligned branches or commits. Record both SHAs.
- A module is not done-done until it also meets the finish line in `curriculum/CLAUDE.md`.

## 1. Establish the contract

- [ ] **Strategy:** add the module's Big Idea, audience move, learning outcomes, mood, place in the arc, and relationship to adjacent modules in the training's strategy file.
- [ ] **Module identity:** choose one stable slug, title, sequence number, and optional/required status; use them consistently.
- [ ] **Delivery architecture:** update the training architecture when the module changes runtime, working directories, tools, skills, handoffs, shipped material, or session boundaries.
- [ ] **Module registry:** register the module in `site/layouts/curriculum.js`, including `optionalModules` behavior where applicable.
- [ ] **Boundary contracts:** state what the learner arrives with, what evidence they produce, and what the next module may rely on.

Check the strategy and module change together. A module without its strategy change is drift; a strategy promise with no delivered module is also drift.

## 2. Build the learner experience

- [ ] **Module file:** create the thin module file using `curriculum/module-shape.md`.
- [ ] **Learning outcomes:** use observable verbs and make every outcome visible in an activity or produced artifact.
- [ ] **Lectures and exercises:** create or reuse canonical shared files, then include them with standalone links in the intended order.
- [ ] **Prompts:** add every copied prompt to the prompt source, compile it, and verify all referenced prompt keys resolve.
- [ ] **Figures and widgets:** add only when they improve the learning move; compile figures and verify render behavior in both long-read and slides.
- [ ] **References and supplementaries:** add the minimum durable lookup or progressive reading material the module needs. Check citations, backing blocks, and source freshness where claims require them.
- [ ] **Artifacts and paths:** verify that every read/write path matches the learner's actual working directory and that downstream steps consume the artifacts upstream steps create.
- [ ] **Scaffold or lab:** create it when the learner needs runnable starting state; test from a fresh extraction rather than the authoring checkout.
- [ ] **Opening and close:** make prework/arrival evidence explicit, and leave `## Next` as the final student-facing section.
- [ ] **Optional path:** if the module can be omitted, verify the remaining arc still works and no later module silently depends on its artifacts.

## 3. Make the theory decision explicit

For a training with a formal theory layer, these are required. Otherwise mark the section N/A once, with the training-level reason; do not silently omit individual modules.

- [ ] **Theory plan:** place the module's theory using the training's schema. For AE101, name the pattern, where it lands, the mechanism that explains it, and the governor that constrains it.
- [ ] **Conceptual compression:** give the learner a durable model that explains more than the local procedure: a map, schema, decision rule, causal model, or repeated contrast.
- [ ] **Pair-wide development:** explain how the idea changes across adjacent modules, rather than giving each module an isolated list of concepts.
- [ ] **Theory audit:** add the module to the coverage matrix and resolve gaps, duplicates, overloaded sections, and unsupported doctrine.
- [ ] **Theory evals:** add soundness and landing specs, or record why an existing spec covers the new material.
- [ ] **Theory handbook:** add the learner-facing theory files to `THEORY_HANDBOOK_MANIFEST` in `scripts/build-workbook.js` and verify the handbook output.

## 4. Hook up delivery

- [ ] **Site:** verify the module appears in the correct order, its route opens, includes expand, prompt buttons resolve, and both reading modes render.
- [ ] **Timings:** add the module to the training timing table and make the calculated total agree with the published duration.
- [ ] **Trainer handbook:** add the module tab/run sheet, setup, room beats, failure recovery, and close to `trainer-modules.md`.
- [ ] **Workbook:** verify normal, barebones, trainer, and optional-module cuts that the training supports.
- [ ] **Content package:** make every required file reachable from the module or explicitly include it in the training tarball. Check labs, skills, references, prompts, and figures in the extracted package.
- [ ] **Customer build:** run at least one configured customer build so branding, flags, and overrides exercise the new module rather than only the default build.
- [ ] **Environment:** update pre-flight checks if the module introduces a new binary, service, credential, permission, port, or network dependency.

## 5. Add evidence, not just coverage

- [ ] **Story trace:** simulate the learner journey through the new module and its handoffs with the adjacent modules.
- [ ] **Behavior trace:** run the copied prompts and consequential tool paths against representative learner state.
- [ ] **Persona spread:** test with the learner range named by strategy, including at least one likely struggler and one learner who may finish early.
- [ ] **Per-file evals:** run every class required by the eval manifests; for a module file this normally means writing, story, technical, behavior, pedagogy, strategy, and slides.
- [ ] **Eval inventory:** confirm the coverage report names the new module and every included lecture/exercise. A green report that never listed the surface is not evidence.
- [ ] **Scope evals:** update or rerun the affected cross-module set and voice panel.
- [ ] **Quality stamps:** apply stamps only after fixes settle, then verify each recorded body SHA matches the committed file it evaluated.
- [ ] **Open findings:** move every accepted but unfinished finding into the training's `pre-cohort-todos.md`; do not leave completion-critical work only in a chat or simulation report.

## 6. Prove the shipped path

Run the relevant commands from the repository root. Add training-specific commands from its architecture file.

```sh
node scripts/compile-prompts.js
node scripts/compile-figures.js
npm run check:doc-paths
npm run audit:backing
npm run audit:timings
npm run audit:eval-coverage:gate
npm test
```

- [ ] **Workbook build:** build the complete workbook and inspect the generated learner and trainer artifacts.
- [ ] **Package build:** build the content archive, extract it into a temporary directory, and inspect its contents.
- [ ] **Runnable lab:** execute the scaffold/lab tests from the extracted package.
- [ ] **System test:** run the training's tmux-runner battery clean before shipping.
- [ ] **Manual acceptance:** run a clean-laptop or equivalent pre-flight whenever delivery mechanics, runtime assumptions, or scaffolds changed.
- [ ] **Repository hygiene:** no generated debris, accidental customer content, stale eval artifacts, or unrelated changes remain in the diff.

Passing `npm test` proves the checks it contains. It does not prove that an unregistered theory file, trainer beat, package asset, or optional-cut dependency was remembered; that is why the completion receipt exists.

## Completion receipt

Copy this into the PR description or the module's tracked completion note. Keep evidence compact and link to durable artifacts.

```markdown
### New module completion receipt

- Training / module / slug:
- Curriculum commit:
- Strategy/eval commit:
- Required or optional:
- Strategy + architecture updated:
- Student surfaces:
- Theory decision and surfaces:
- Site / timing / trainer surfaces:
- Workbook cuts built:
- Package extracted and lab run:
- Eval board / traces:
- Commands run:
- Manual acceptance, or N/A reason:
- Open findings moved to:
- Known limits:
```

The receipt is an index, not a second source of truth. Put enduring requirements in strategy, architecture, curriculum, or eval canon; use the receipt to prove they were all connected for this module.
