
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
      var filteredParents = parents.filter(function(each) { return each != ancestor })
      var reduce = function(state, each, cb) {
        treeDiff(from, each, readParents, function(err, res) {
          cb(null, state.concat(res))
        })
      }
      async.reduce(filteredParents, [], reduce, function(err, res) {
        cb(null, nodeDiff.concat(res))
      })
    })
  })
}

module.exports = treeDiff
