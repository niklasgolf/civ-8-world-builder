import { codeWikiDocument } from './documentation-data.ts'
import type { CodeWikiTarget } from './documentation-types.ts'

const HASH_PREFIX = '#code-wiki/'

export function codeWikiHash(path: string, anchor: string | null): string {
  const target = anchor ? `${path}/${anchor}` : path
  return `${HASH_PREFIX}${encodeURI(target)}`
}

export function targetFromHash(hash: string): CodeWikiTarget | null {
  if (!hash.startsWith(HASH_PREFIX)) return null

  let rest = ''

  try {
    rest = decodeURIComponent(hash.slice(HASH_PREFIX.length))
  } catch {
    return null
  }

  if (rest === '' || rest === 'home') {
    return { path: 'home', anchor: null }
  }

  const matches = codeWikiDocument.files.filter(
    (file) => rest === file.path || rest.startsWith(`${file.path}/`),
  )

  matches.sort((left, right) => right.path.length - left.path.length)

  const file = matches[0]
  if (!file) return null

  if (rest === file.path) {
    return { path: file.path, anchor: null }
  }

  return {
    path: file.path,
    anchor: rest.slice(file.path.length + 1),
  }
}
