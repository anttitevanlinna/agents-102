'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const os = require('node:os');
const { JSDOM, VirtualConsole } = require('jsdom');
const { callModel } = require('./model');

const question = fs.readFileSync(path.join(__dirname, 'journey-question.txt'), 'utf8');
const personas = require('./journey-personas.json');
const fingerprint = value => crypto.createHash('sha256').update(value).digest('hex');

function learnerView(html, platform) {
  const dom = new JSDOM(html, {
    url: 'https://agents102.bosser.consulting/clients/acme-mvp/agents-101/',
    runScripts: 'dangerously',
    virtualConsole: new VirtualConsole(),
    beforeParse(window) {
      Object.defineProperty(window.navigator, 'platform', { value: platform });
      window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
      window.HTMLElement.prototype.scrollIntoView = function () {};
    },
  });
  try {
    dom.window.A101Runtimes.applyRuntime('cowork');
    const document = dom.window.document;
    const sections = document.querySelectorAll('.workbook-topnav,.workbook-cover,.a101-onboarding,.workbook-toc,section.module#prework');
    const chunks = Array.from(sections, section => {
      const copy = section.cloneNode(true);
      const elements = section.querySelectorAll('*');
      const copies = copy.querySelectorAll('*');
      for (let i = elements.length - 1; i >= 0; i--) {
        const style = dom.window.getComputedStyle(elements[i]);
        if (elements[i].hidden || style.display === 'none' || style.visibility === 'hidden') copies[i].remove();
      }
      for (const details of copy.querySelectorAll('details:not([open])')) {
        for (const child of [...details.childNodes]) if (child.nodeName !== 'SUMMARY') child.remove();
      }
      for (const video of copy.querySelectorAll('.a101-video-placeholder')) {
        // Readers get the same caption in both conditions. Describe the video as
        // available under the declared study assumption; add no visual detail.
        video.classList.remove('a101-video-placeholder');
        const walker = document.createTreeWalker(video, dom.window.NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          walker.currentNode.textContent = walker.currentNode.textContent.replace(/Assume there is a short /g, 'This lesson includes a short ');
        }
      }
      return copy.outerHTML;
    });
    if (!document.querySelector('section#prework .a101-game-start')) throw Error('Missing first lesson');
    return '<html><body>' + chunks.join('\n') + '</body></html>';
  } finally {
    dom.window.close();
  }
}

// Fixed counterfactuals. The positive cases share the same request and output.
const make = '<p>Open Claude Desktop and click New. Select Cowork if the box has a Chat/Cowork switch. With a single box, continue there. Paste the sentence below and click Send. No folder is needed.</p>' +
  '<blockquote>Make me a packing list for a rainy weekend in one HTML file called weekend.html. Show me the finished list here.</blockquote>' +
  '<p>Look in the reply to the request you just sent. The preview shows your packing list with rain gear, or the reply contains the file weekend.html. Either is the finished list. If only a description appears, ask Claude to attach weekend.html.</p>';
const back = '<p>Keep this handbook tab open while you use Cowork. To continue, switch back to this tab and click <a href="#compare">Lesson 2 · Compare two lists</a>.</p>' +
  '<h2 id="compare">Lesson 2 · Compare two lists</h2><p>Read these two packing lists. Which one would you take in the rain?</p>' +
  '<p>List A: sunglasses and sandals. List B: raincoat and boots.</p>';
const controls = {
  example: '<p>This screenshot shows the packing list our instructor made earlier. The instructor will give you your own request in the next class.</p>',
  made: make,
  optional: make + '<p>If you like, open the list and tick an item.</p>',
  return: make + back,
};

function meanStars(rows) {
  return rows.reduce((sum, row) => sum + Math.round(row.answer.stars * 10), 0) / (10 * rows.length);
}

function checkControls(rows) {
  const group = view => rows.filter(row => row.view === view);
  const example = group('example'), made = group('made'), optional = group('optional'), back = group('return');
  return {
    allResponses: [example, made, optional, back].every(group => group.length === 3),
    exampleIsInsufficient: example.every(r => r.answer.wouldRecognize !== 'yes') && meanStars(example) < meanStars(made),
    ownResultRecognized: made.every(r => r.answer.wouldRecognize === 'yes'),
    optionalActionIndependent: Math.abs(meanStars(made) - meanStars(optional)) <= 0.300001,
    returnIndependent: Math.abs(meanStars(made) - meanStars(back)) <= 0.300001,
    noInventedReturn: made.every(r => r.answer.returnClarity !== 'clear'),
    explicitReturnIdentified: back.every(r => r.answer.returnClarity === 'clear'),
  };
}

async function main() {
  const input = process.argv[2];
  if (!input) throw Error('Pass a workbook HTML path or --controls');
  const controlRun = input === '--controls';
  const html = controlRun ? null : fs.readFileSync(input, 'utf8');
  const views = controlRun ? controls : { mac: learnerView(html, 'MacIntel'), windows: learnerView(html, 'Win32') };
  const out = path.join(__dirname, 'out', 'journey-' + crypto.randomUUID());
  fs.mkdirSync(out, { recursive: true });
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'a101-journey-'));
  const jobs = [];
  for (const [id, persona] of personas) {
    if (controlRun && !['novice-leader', 'windows-office-user', 'cowork-regular'].includes(id)) continue;
    const cases = controlRun ? Object.keys(controls) : Array(3).fill(id === 'windows-office-user' ? 'windows' : 'mac');
    cases.forEach((view, index) => jobs.push({ id, persona, view, attempt: controlRun ? 1 : index + 1 }));
  }
  fs.writeFileSync(path.join(out, 'scope.json'), JSON.stringify({
    question: fingerprint(question), personas: fingerprint(JSON.stringify(personas)), input,
    source: html && fingerprint(html), views: Object.fromEntries(Object.entries(views).map(([k,v]) => [k, fingerprint(v)])), count: jobs.length,
  }, null, 2));
  for (const [key, value] of Object.entries(views)) fs.writeFileSync(path.join(out, key + '.html'), value);
  console.log(out);
  let next = 0;
  const rows = [];
  async function reader() {
    while (next < jobs.length) {
      const job = jobs[next++];
      const tag = [job.id, job.view, job.attempt].join('-');
      const response = await callModel({ cwd: scratch, outputDir: out, tag, timeoutMs: 120000,
        prompt: [job.persona, question, 'BEGIN HANDBOOK HTML', views[job.view], 'END HANDBOOK HTML'].join('\n\n') });
      const answer = JSON.parse(response.text.trim().replace(/^```(?:json)?\s*/,'').replace(/\s*```$/,''));
      if (!Number.isFinite(answer.stars) || answer.stars < 1 || answer.stars > 5 ||
          Math.abs(Math.round(answer.stars * 10) - answer.stars * 10) > 1e-8 ||
          !['yes','uncertain','no'].includes(answer.wouldRecognize) || !['clear','uncertain','missing'].includes(answer.returnClarity) ||
          !['firstAction','recognitionCue','hesitation','nextStep','returnClue'].every(key => typeof answer[key] === 'string')) throw Error('Invalid reader response: ' + tag);
      rows.push({ ...job, model: response.model, answer });
      fs.writeFileSync(path.join(out,'results.json'), JSON.stringify(rows,null,2));
    }
  }
  const readers = await Promise.allSettled(Array.from({length:4}, reader));
  fs.rmSync(scratch, { recursive:true, force:true });
  for (const result of readers) if (result.status === 'rejected') throw result.reason;
  if (controlRun) {
    const checks = checkControls(rows);
    fs.writeFileSync(path.join(out, 'checks.json'), JSON.stringify(checks, null, 2));
    if (Object.values(checks).includes(false)) throw Error('Calibration failed: ' + JSON.stringify(checks));
  } else {
    console.log(rows.length, meanStars(rows).toFixed(3));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
