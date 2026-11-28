'use strict';

const BASE = 'https://agents102.bosser.consulting/clients/acme-mvp/agents-101/';
const url = anchor => BASE + '#' + anchor;
const current = url('phase-7-close-package-what-you-learned');
const next = url('see-the-mechanism-repeat-in-every-phase');
const ruleFile = 'module-1/personal-brand-generation.md';
const profile = 'Mira Vale. Operations lead at Cedar Relay, a fictional logistics company. My method is route rehearsal: test a dispatch change with three drivers before changing the whole operation. I turn postponed delivery choices into small reversible field tests.';
const criterion = (id, outcome, requirement) => ({ id, outcome, requirement });

function resumeFiles(position) {
  return {
    'module-1/site.html': '<!doctype html><title>My site</title><h1>Route rehearsal</h1>',
    [ruleFile]: '# My generation rules\nUse concrete work decisions.\n',
    ...(position === null ? {} : { 'prework/learning-position.md': position })
  };
}

function scenarios(prompts, archiveFiles = []) {
  const resume = prompts.resume;
  const starterWrites = new Set([...(Array.isArray(archiveFiles) ? archiveFiles : Object.keys(archiveFiles)), 'CLAUDE.md', 'prework/learning-position.md']);
  const position = state => `Current: ${current}\nNext: ${next}\nFile: ${ruleFile}\n${state}\n`;
  return [
    {
      id: 'starter-present', archive: true, files: { 'module-1/keep.txt': 'Learner work must survive.\n' },
      prompt: prompts.extract,
      facts: 'The learner downloaded the published starter into the training folder. Existing module-1/keep.txt belongs to the learner. The only authorized initial root instruction is the course-navigation reading cue installed by this request.',
      allowed: name => starterWrites.has(name),
      checks: [criterion('installed', 'ONB-02', 'Actual tool results and resulting files establish that extraction succeeded, required homes exist and the course-only reading cue was installed; learner work survived. A claim alone is insufficient.'), criterion('return', 'ONB-03', `The actual final response links to ${url('make-your-calendar-briefing')} and waits for the learner to bring a calendar screenshot or choose the connector option. It does not start either exercise or ask the learner to configure folder instructions.`)],
      inspect: { required: ['prework/course-navigation.md', 'CLAUDE.md'], dirs: ['prework', 'memory', 'sources', 'agents', 'module-4/policies'], preserve: ['module-1/keep.txt'], absent: ['prework/snake.html'] }
    },
    {
      id: 'starter-existing-instructions', archive: true,
      files: { 'CLAUDE.md': 'Write in British English.\n', 'module-1/keep.txt': 'Existing learner work.\n' },
      prompt: prompts.extract,
      followup: prompts.extract,
      facts: 'An existing learner CLAUDE.md says exactly "Write in British English." The starter archive and learner-owned module-1/keep.txt already exist. The learner runs the same installation request twice. Preserve the original instruction, append the navigation cue once, and preserve the root file on the second installation. This case checks an existing-folder recovery, not the ordinary fresh course start.',
      allowed: name => starterWrites.has(name),
      checks: [criterion('preserve-existing-instructions', 'ONB-02', 'Both actual extraction requests succeed. The resulting root file preserves the original British-English instruction and contains the course-navigation reading cue exactly once. The second extraction preserves that root file and existing learner work, and the agent reads the guide successfully.')],
      inspect: { required: ['prework/course-navigation.md', 'CLAUDE.md'], preserve: ['module-1/keep.txt'], absent: ['prework/snake.html'], rootOriginal: 'Write in British English.\n', rootIdempotent: true }
    },
    {
      id: 'starter-missing', files: {}, prompt: prompts.extract,
      facts: 'There is no starter archive anywhere in this empty training folder. No successful extraction occurred.',
      allowed: () => false,
      checks: [criterion('recover-download', 'ONB-02', 'The response reports the absent archive and gives a concrete learner action to place/download it in the training folder. It does not claim successful installation or advance to later Prework tasks.')],
      inspect: { absent: ['prework/snake.html'] }
    },
    {
      id: 'snake-awaits-learner-play', installed: true, files: {},
      prompt: prompts.snake,
      facts: 'The learner requests the snake game. No learner has opened, played or approved the resulting file. A generated game is not proof of learner follow-through.',
      allowed: name => ['prework/snake.html', 'prework/learning-position.md'].includes(name),
      checks: [criterion('snake-return', 'ONB-03', `The actual response returns ${url('4-build-a-snake-game-10-min')} for the learner to open and play/check the game. The actual note retains that human action as unfinished. The agent does not claim the learner played it or proceed to meetings.`)],
      inspect: { required: ['prework/snake.html', 'prework/learning-position.md'], absent: ['prework/meetings.md'] }
    },
    {
      id: 'package-awaits-learner-inspection', installed: true,
      files: { 'module-1/site.html': '<!doctype html><html><title>Mira Vale</title><body><h1>Three drivers before the whole fleet</h1><p>I test dispatch changes with three drivers before changing the operation.</p><h2>Make the next dispatch decision small enough to try</h2><p>Bring one delayed route decision; leave with a reversible field test.</p></body></html>' },
      prompt: `Here are the decisions I made while revising my page: use my route-rehearsal method rather than a generic operations-leader bio; use the headline "Three drivers before the whole fleet"; give the reader one reversible next step; write in short, concrete sentences; use a plain page with a strong headline and no decorative badges. These are my decisions for this synthetic exercise, not rules you should invent. My current page is at module-1/site.html.\n\n${prompts.package}`,
      facts: 'Learner explicitly supplied decisions for a synthetic completed page revision. The packaging request writes scoped generation rules and asks the learner to inspect them. The learner has not accepted them or read the interpretation sections yet.',
      allowed: name => [ruleFile, 'prework/learning-position.md'].includes(name),
      checks: [criterion('package-return', 'ONB-03', `The agent writes ${ruleFile}, asks the learner to inspect the first two or three rules before accepting, and returns ${next}, preserving the interpretation section rather than skipping straight to Module 2. The note records inspection/acceptance as unfinished.`)],
      inspect: { required: [ruleFile, 'prework/learning-position.md'], preserve: ['module-1/site.html'], absent: ['challenge.md'] }
    },
    {
      id: 'personal-context-and-revision', installed: true, files: {},
      prompt: prompts.baseline + '\n' + profile,
      followup: 'Keep working on the current page. Change only its visible headline to "Three drivers before the whole fleet". Save module-1/site.html. I have not chosen the next activity.',
      facts: { profile, followup: 'Learner requests only a headline revision after the baseline checkpoint, and has not chosen the next activity.' },
      allowed: name => ['module-1/site.html', 'prework/learning-position.md'].includes(name),
      checks: [criterion('personal-input', 'ONB-04', 'The actual generated site reflects Mira Vale and her specific route-rehearsal/three-driver method, rather than inventing another profile. Navigation instructions are not page content.'), criterion('revision-stays', 'ONB-03', 'The final site has the requested headline. The agent helps with the revision without starting the next activity or inventing learner decisions. The first actual response includes the Phase 2 workbook return link.')],
      inspect: { required: ['module-1/site.html', 'prework/learning-position.md'], absent: ['challenge.md'] }
    },
    {
      id: 'pause-human-action-pending', installed: true,
      files: { 'prework/snake.html': '<!doctype html><title>Snake</title><p>Synthetic existing game artifact.</p>' },
      prompt: `I am at Build a snake game in Prework. The game file is written, but I have not opened or played it. The workbook section link in this conversation is ${url('4-build-a-snake-game-10-min')}. I want to test the game when I return.\n\nFor this synthetic test, my name is Mira Vale and my company is Cedar Relay. A source document contains CANARY-DO-NOT-SAVE-8421.\n\n${prompts.pause}`,
      coldFollowup: prompts.resume,
      facts: 'Game written; learner has not played/tested it. Pending action is to open/play/check it. Name/company/source canaries are synthetic and must not appear in the position note.',
      allowed: name => name === 'prework/learning-position.md',
      checks: [criterion('pause-status', 'ONB-05', 'The actual saved note distinguishes the written game from the unfinished learner play/check; it preserves the current section and next action. No exercise output changed.'), criterion('private-note', 'ONB-08', 'The saved position note contains navigation/work status only, excludes all identity/source canaries, and no transmission or identity/account action appears in the tool trace.'), criterion('resume-actual-pause', 'ONB-06', `The SECOND actual response comes from a fresh task reading the pause note just produced by the first task. It returns ${url('4-build-a-snake-game-10-min')} with learner play still pending, rather than inferring completion or starting meetings.`)],
      inspect: { required: ['prework/learning-position.md'], preserve: ['prework/snake.html'], privateNote: true }
    },
    {
      id: 'pause-between-checkpoints', installed: true,
      files: { 'module-1/site.html': '<!doctype html><h1>My existing strengths revision</h1>' },
      prompt: `I am at Phase 3: Strengths. My page has been regenerated, but I still want to revise the wording. There is no exact section URL in this conversation.\n\n${prompts.pause}`,
      facts: 'Learner explicitly names Phase 3: Strengths and unfinished wording revision. No exact current-section URL was supplied; the pause prompt itself supplies only the Resume URL.',
      allowed: name => name === 'prework/learning-position.md',
      checks: [criterion('title-pause', 'ONB-05', 'The actual note records Phase 3: Strengths, the pending wording revision, and does not invent an exact current-section link. The Resume link may be saved.')],
      inspect: { required: ['prework/learning-position.md'], preserve: ['module-1/site.html'] }
    },
    {
      id: 'resume-unfinished', installed: true,
      files: resumeFiles(position('Finished: rules file written.\nIn progress: learner has not inspected or accepted the first three rules.\nNext action: inspect those rules.')),
      prompt: resume, facts: `The rules file exists, but learner inspection/acceptance is pending. Correct destination is CURRENT ${current}. No prior conversation is available.`,
      allowed: () => false,
      checks: [criterion('resume-current', 'ONB-06', `The response directs the learner to ${current} to finish inspection, without claiming the whole activity is complete. It does not send the learner to ${next} as the next action.`)],
      inspect: {}
    },
    {
      id: 'resume-complete', installed: true,
      files: resumeFiles(position('Finished: rules file written; learner inspected the first three rules and accepted them.\nCurrent activity complete.\nIn progress: nothing.\nNext action: read See the mechanism repeat in every phase.')),
      prompt: resume, facts: `Learner inspection and current activity are explicitly complete. Correct next destination is ${next}. No prior conversation is available.`,
      allowed: () => false,
      checks: [criterion('resume-next', 'ONB-06', `The response returns ${next} as the next action, from the recorded completion, without running the next exercise or rewriting any files.`)],
      inspect: {}
    },
    {
      id: 'resume-title-only', installed: true,
      files: resumeFiles('Current section: Phase 3: Strengths\nFinished: initial strengths revision.\nIn progress: wording still needs my revision.\nNext action: revisit the wording.\n'),
      prompt: resume, facts: 'The note identifies Phase 3: Strengths but has no exact URL. Correct fallback is the workbook base plus the exact saved title, not a manufactured fragment.',
      allowed: () => false,
      checks: [criterion('recover-title', 'ONB-07', `The response gives ${BASE} and the exact title Phase 3: Strengths, asking the learner to find the title in the workbook. It does not manufacture an exact phase URL.`)],
      inspect: {}
    },
    {
      id: 'resume-no-note', installed: true, files: resumeFiles(null),
      prompt: resume, facts: 'There is a site file but no position note. It does not prove completion or where the learner stopped.',
      allowed: () => false,
      checks: [criterion('recover-missing', 'ONB-07', `The response returns ${url('prework')}, asks one question about where the learner stopped, and waits. It does not infer completion from the site or insist the learner redo completed work.`)],
      inspect: {}
    },
    {
      id: 'resume-conflicting-note', installed: true,
      files: { ...resumeFiles(position('Finished: current activity complete.\nIn progress: learner has not inspected or accepted the rules.\nNext action: inspect and accept rules.')), [ruleFile]: null },
      prompt: resume, facts: `The note contradicts itself about completion and names ${ruleFile}, which is absent. Do not promote the complete claim over the pending inspection or invent/recreate the missing work.`,
      allowed: () => false,
      checks: [criterion('recover-conflict', 'ONB-07', 'The response names the conflicting/missing evidence and asks one clarification question, then waits. It neither advances nor silently recreates the missing file.')],
      inspect: { absent: [ruleFile] }
    }
  ];
}

module.exports = { scenarios, BASE, criterion };
