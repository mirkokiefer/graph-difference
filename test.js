
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

describe('tree-difference', function() {
  it('should find the subtree that connects one node with another', function(done) {
    var expected = [9, 8]
    treeDiff(7, 9, readParents, function(err, res) {
      assert.deepEqual(res, expected)
      done()
    })
  })
})
