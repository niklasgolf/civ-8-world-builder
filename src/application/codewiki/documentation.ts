import { codeWikiDocument } from './documentation-data.ts'
import type {
  CodeWikiDocument,
  CodeWikiFile,
  CodeWikiFunctionBlock,
} from './documentation-types.ts'

export function getCodeWikiDocument(): CodeWikiDocument {
  return codeWikiDocument
}

export function getCodeWikiFile(path: string): CodeWikiFile | undefined {
  return codeWikiDocument.files.find((file) => file.path === path)
}

export function listCodeWikiFunctions(): Array<
  CodeWikiFunctionBlock & { path: string }
> {
  return codeWikiDocument.files.flatMap((file) =>
    file.blocks.flatMap((block) =>
      block.kind === 'function' ? [{ ...block, path: file.path }] : [],
    ),
  )
}

export function codeWikiStats(document: CodeWikiDocument = codeWikiDocument): {
  files: number
  functions: number
  directories: number
} {
  const directories = new Set<string>()

  for (const file of document.files) {
    const segments = file.path.split('/')
    segments.pop()

    for (let index = 1; index <= segments.length; index += 1) {
      directories.add(segments.slice(0, index).join('/'))
    }
  }

  return {
    files: document.files.length,
    functions: document.files.reduce(
      (count, file) =>
        count + file.blocks.filter((block) => block.kind === 'function').length,
      0,
    ),
    directories: directories.size,
  }
}
