// The shared runtime (site/layouts/curriculum.js) as one built page inlines it.
//
// The source holds the whole TRAININGS registry: every training, every cut, and
// comments naming the customers those cuts were made for. A page built for one
// training needs its own entry, plus its parent's when it is a `contentKey`
// cut (module numbering reads the parent's module list). scopedRuntime swaps
// the registry literal for exactly those entries, serialised from the registry
// the build read, so the comments inside the literal go with it.
'use strict'

const OPEN = '    var TRAININGS = {'
const CLOSE = '\n    };\n'

function scopedRuntime(src, trainings, trainingKey) {
  const entry = trainings[trainingKey]
  if (!entry) throw new Error(`scopedRuntime: unknown training "${trainingKey}"`)
  const start = src.indexOf(OPEN)
  const end = start < 0 ? -1 : src.indexOf(CLOSE, start)
  if (start < 0 || end < 0) throw new Error('scopedRuntime: TRAININGS registry literal not found in the runtime source')

  const keep = { [trainingKey]: entry }
  if (entry.contentKey) {
    if (!trainings[entry.contentKey]) throw new Error(`scopedRuntime: "${trainingKey}" names unknown contentKey "${entry.contentKey}"`)
    keep[entry.contentKey] = trainings[entry.contentKey]
  }
  const literal = JSON.stringify(keep, null, 4).replace(/<\//g, '<\\/').replace(/\n/g, '\n    ')
  return src.slice(0, start) + '    var TRAININGS = ' + literal + ';\n' + src.slice(end + CLOSE.length)
}

module.exports = { scopedRuntime }
