export default function graphDiff<T>(
  from: T | null,
  to: T,
  readParents: (id: T | null, cb: (err: Error | null, parents?: (T | null)[]) => void) => void,
  cb: (err: Error | null, res?: (T | null)[]) => void
): void