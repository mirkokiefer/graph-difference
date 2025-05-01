[![npm version](https://img.shields.io/npm/v/graph-difference.svg)](https://www.npmjs.com/package/graph-difference)
[![tests](https://github.com/mirkokiefer/graph-difference.js/actions/workflows/test.yml/badge.svg)](https://github.com/mirkokiefer/graph-difference.js/actions)

# graph-difference.js

Minimal JavaScript/TypeScript library for directed acyclic graphs (DAGs).  
Finds the _subgraph difference_ between two nodes: all ancestors of `to` that are not ancestors of `from`.

## Install

```bash
npm install graph-difference
```

## Usage

For an example graph:

```
    4-5-8-9    11-12
   /   \   \  /     \
1-2-3---6-7-10-13-14-15-16
```

### ES Module (JavaScript / TypeScript)

```js
import graphDiff from 'graph-difference'

const nodes = {
  1: [],
  2: [1],
  /* ... */
  20: [19]
}

const readParents = (id, cb) => {
  // async fetch of parent IDs
  cb(null, nodes[id] || [])
}

graphDiff(5, 7, readParents, (err, result) => {
  console.log(result) // [7, 6, 3]
})
```

### CommonJS

```js
const graphDiff = require('graph-difference')
```

## API

```ts
function graphDiff<T>(
  from: T | null,
  to: T,
  readParents: (
    id: T | null,
    cb: (err: Error | null, parents?: (T | null)[]) => void
  ) => void,
  cb: (err: Error | null, res?: (T | null)[]) => void
): void

export default graphDiff
```

- **from**: starting node ID (or `null`)  
- **to**: target node ID  
- **readParents**: callback to fetch parent IDs of a node  
- **cb**: callback with error or array of node IDs in difference

## Testing

Run the suite with:

```bash
npm test
```

## TypeScript Support

Built with an included `index.d.ts` — no extra typings needed.  

## License

MIT
