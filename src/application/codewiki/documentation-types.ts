export type CodeWikiProseBlock = {
  kind: 'prose'
  text: string
}

export type CodeWikiFunctionBlock = {
  kind: 'function'
  name: string
  identifier: string
  anchor: string
  line: number
  text: string
}

export type CodeWikiBlock = CodeWikiProseBlock | CodeWikiFunctionBlock

export type CodeWikiFile = {
  path: string
  blocks: CodeWikiBlock[]
  notes: string[]
}

export type CodeWikiNote = {
  title: string
  text: string
}

export type CodeWikiDocument = {
  files: CodeWikiFile[]
  concepts: CodeWikiNote[]
  homeNotes: CodeWikiNote[]
  partGuides: string[]
}

export type CodeWikiSelection = 'home' | string

export type CodeWikiTarget = {
  path: CodeWikiSelection
  anchor: string | null
}
