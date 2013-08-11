
var assert = require('assert')
var treeDiff = require('./index')

var nodes = {
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
  16: [15]
}

/* the graph:

    4-5-8-9    11-12
   /   \   \  /     \
1-2-3---6-7-10-13-14-15-16

*/

var readParents = function(id, cb) {
  cb(null, nodes[id])
}

var tests = [
  {from: 8, to: 9, expected: [9]},
  {from: 7, to: 9, expected: [9, 8]},
  {from: 6, to: 7, expected: [7]},
  {from: 5, to: 7, expected: [7, 6, 3]},
  {from: 4, to: 7, expected: [7, 6, 3, 5]},
  {from: 1, to: 7, expected: [7, 6, 3, 2, 5, 4]},
  {from: 1, to: 9, expected: [9, 8, 5, 4, 2]},
  {from: 9, to: 16, expected: [16,15,12,11,10,7,6,3,14,13]},
  {from: 1, to: 16, expected: [16,15,12,11,10,7,6,3,2,5,4,9,8,14,13]}
]

describe('tree-difference', function() {
  tests.forEach(function(each, i) {
    it('should run test ' + i, function(done) {
      treeDiff(each.from, each.to, readParents, function(err, res) {
        assert.deepEqual(res, each.expected)
        done()
      })
    })
  })
})
