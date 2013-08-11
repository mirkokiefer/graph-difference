
var findAncestor = require('ancestor')
var async = require('async')

var treeDiff = function(from, to, readParents, cb) {
  findAncestor([from, to], readParents, function(err, ancestor) {
    var nodeDiff = []
    var parents = [to]
    var whileCondition = function() {
      return (parents.length == 1) && (parents[0] != ancestor)
    }
    async.whilst(whileCondition, function(cb) {
      nodeDiff.push(parents[0])
      readParents(parents[0], function(err, newParents) {
        parents = newParents
        cb()
      })
    }, function() {
      if (parents.length == 1) {
        return cb(null, nodeDiff)
      }
      var recurse = function(each, cb) { treeDiff(from, each, readParents, cb) }
      async.map(parents, recurse, function(err, res) {
        res.forEach(function(each) {
          nodeDiff = nodeDiff.concat(each)
        })
        cb(null, nodeDiff)
      })
    })
  })
}

module.exports = treeDiff
