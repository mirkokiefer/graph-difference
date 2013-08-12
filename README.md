#graph-difference
[![Build Status](https://travis-ci.org/mirkokiefer/graph-difference.png?branch=master)](https://travis-ci.org/mirkokiefer/graph-difference)

[![NPM](https://nodei.co/npm/graph-difference.png)](https://nodei.co/npm/graph-difference/)

Find the subgraph difference between two nodes in a directed acyclic graph.

Given a `node A` the algorithm finds all nodes that are ancestors of `node B` but are not ancestors from `node A`.

##Example

The graph:

```
    4-5-8-9    11-12
   /   \   \  /     \
1-2-3---6-7-10-13-14-15-16
```

``` js
var graphDiff = require('graph-difference')

var nodes = {
  1: [],
  2: [1],
  ...
  15: [12, 14],
  16: [15]
}

var readParents = function(id, cb) {
  cb(null, nodes[id])
}

graphDiff(5, 7, readParents, function(err, result) {
  // result should be [7, 6, 3]
})
```

