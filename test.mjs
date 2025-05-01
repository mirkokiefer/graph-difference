import assert from 'assert'
import graphDiff from './index.js'

const nodes = {
  1: [],
  2: [1],
  3: [2],
  4: [2],
  5: [4],
  6: [3, 5],
  7: [6],
  8: [5],
  9: [8],
  10: [7, 9],
  11: [10],
  12: [11],
  13: [10],
  14: [13],
  15: [12, 14],
  16: [15],
  17: [],
  18: [],
  19: [17, 18],
  20: [19]
}

const readParents = (id, cb) =>
  process.nextTick(() => cb(null, nodes[id] || []))

const tests = [
  {from: 8, to: 9, expected: [9]},
  {from: 7, to: 9, expected: [9, 8]},
  {from: 6, to: 7, expected: [7]},
  {from: 5, to: 7, expected: [7, 6, 3]},
  {from: 4, to: 7, expected: [7, 6, 3, 5]},
  {from: 1, to: 7, expected: [7, 6, 3, 2, 5, 4]},
  {from: 1, to: 9, expected: [9, 8, 5, 4, 2]},
  {from: 9, to: 16, expected: [16,15,12,11,10,7,6,3,14,13]},
  {from: 1, to: 16, expected: [16,15,12,11,10,7,6,3,2,5,4,9,8,14,13]},
  {from: null, to: 16, expected: [16,15,12,11,10,7,6,3,2,1,5,4,9,8,14,13]},
  {from: 7, to: 20, expected: [20,19,17,18]}
]

describe('graph-difference', () => {
  tests.forEach(({from, to, expected}, i) =>
    it(`diff from ${from} to ${to} (#${i})`, done =>
      graphDiff(from, to, readParents, (err, res) => {
        assert.deepEqual(res, expected)
        done()
      })
    )
  )
})