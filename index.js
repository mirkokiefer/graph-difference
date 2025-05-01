import findAncestor from 'ancestor'
import async from 'async'

function findAncestors(from, to, readParents, cb) {
  const ancestors = []
  async.each(from, (each, next) => {
    findAncestor([each, to], readParents, (err, res) => {
      if (res) ancestors.push(res)
      next()
    })
  }, () => cb(null, ancestors))
}

function graphDiff(from, to, readParents, cb) {
  findAncestors(from, to, readParents, (err, ancestors) => {
    const nodeDiff = []
    let parents = [to]

    function cond() {
      return parents.length === 1 && ancestors.indexOf(parents[0]) === -1
    }

    async.whilst(
      cond,
      next => {
        nodeDiff.push(parents[0])
        readParents(parents[0], (err, newParents) => {
          parents = newParents || []
          next()
        })
      },
      () => {
        if (parents.length === 1) return cb(null, nodeDiff)
        const filtered = parents.filter(p => ancestors.indexOf(p) === -1)
        findAncestor(filtered, readParents, (err, pa) => {
          async.reduce(
            filtered,
            [],
            (acc, each, next) => {
              const base = acc.length ? from.concat(pa) : from
              graphDiff(base, each, readParents, (err, res) => next(null, acc.concat(res)))
            },
            (err, res) => cb(null, nodeDiff.concat(res))
          )
        })
      }
    )
  })
}

export default function(from, to, readParents, cb) {
  graphDiff([from], to, readParents, cb)
}
