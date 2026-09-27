#!/usr/bin/env node
// instance-file.js — the judged-file path an eval instance records, repo-relative.
//
// Instances are shared history: an absolute path names one person's checkout
// and points nowhere on anyone else's. `repoRel` reads every form a judge can
// write (relative; absolute in this checkout; absolute in another one) and
// returns the repo-relative path. instance-paths.test.js fails on any
// whole-value absolute path in the corpus.
'use strict'
const path = require('node:path')

function repoRel(repo, f) {
  if (!f) return null
  const s = String(f)
  if (!path.isAbsolute(s)) return s.split(path.sep).join('/')
  const r = path.relative(repo, s)
  if (!r.startsWith('..')) return r.split(path.sep).join('/')
  const i = s.lastIndexOf('/agents-102/')
  return i >= 0 ? s.slice(i + '/agents-102/'.length) : s
}

module.exports = { repoRel }
