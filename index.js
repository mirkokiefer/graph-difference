
var findAncestor = require('ancestor')
var async = require('async')

var findAncestors = function(from, to, readParents, cb) {
  var ancestors = []
  async.each(from, function(each, cb) {
    findAncestor([each, to], readParents, function(err, res) {
      if (res) ancestors.push(res)
      cb()
    })
  }, function() {
    cb(null, ancestors)
  })
}

// this really has to be rewritten to be tail recursive or stack-based
// I also want the result to be analog to a breadth-first walk
var graphDiff = function(from, to, readParents, cb) {
  findAncestors(from, to, readParents, function(err, ancestors) {
    var nodeDiff = []
    var parents = [to]
    var whileCondition = function() {
      return parents.length == 1 && ancestors.indexOf(parents[0]) == -1
    }
    async.whilst(whileCondition, function(cb) {
      nodeDiff.push(parents[0])
      readParents(parents[0], function(err, newParents) {
        parents = newParents || []
        cb()
      })
    }, function() {
      if (parents.length == 1) {
        return cb(null, nodeDiff)
      }
      var filteredParents = parents.filter(function(each) {
        return ancestors.indexOf(each) == -1
      })
      findAncestor(filteredParents, readParents, function(err, parentsAncestor) {
        var reduce = function(state, each, cb) {
          var newFrom = state.length ? from.concat(parentsAncestor) : from
          graphDiff(newFrom, each, readParents, function(err, res) {
            cb(null, state.concat(res))
          })
        }
        async.reduce(filteredParents, [], reduce, function(err, res) {
          cb(null, nodeDiff.concat(res))
        })
      })
    })
  })
}

module.exports = function(from, to, readParents, cb) {
  graphDiff([from], to, readParents, cb)
}
