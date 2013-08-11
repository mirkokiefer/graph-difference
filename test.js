
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
  9: [8]
}

/* the graph:

    4-5-8-9   
   /   \
1-2-3---6-7

*/

var readParents = function(id, cb) {
  cb(null, nodes[id])
}

var tests = [
  {from: 7, to: 9, expected: [9, 8]},
  {from: 6, to: 7, expected: [7]}
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
