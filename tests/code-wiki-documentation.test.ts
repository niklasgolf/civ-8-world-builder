import { describe, expect, it } from 'vitest'
import { buildCodeWikiTree, type CodeWikiTreeNode } from '../src/application/codewiki/code-wiki-tree.ts'
import { codeWikiHash, targetFromHash } from '../src/application/codewiki/code-wiki-target.ts'
import {
  codeWikiStats,
  getCodeWikiFile,
  listCodeWikiFunctions,
} from '../src/application/codewiki/documentation.ts'
import { codeWikiDocument } from '../src/application/codewiki/documentation-data.ts'

describe('Code Wiki documentation', () => {
  const functions = listCodeWikiFunctions()

  it('keeps the current documentation baseline', () => {
    expect(codeWikiStats()).toEqual({
      files: 133,
      functions: 346,
      directories: 31,
    })
    expect(codeWikiDocument.files).toHaveLength(133)
    expect(functions).toHaveLength(346)
  })

  it('places every function on a valid source-file page', () => {
    const paths = codeWikiDocument.files.map((file) => file.path)

    expect(new Set(paths).size).toBe(paths.length)

    for (const file of codeWikiDocument.files) {
      expect(isSourcePath(file.path)).toBe(true)
      expect(getCodeWikiFile(file.path)).toBe(file)
      expect(file.blocks.length).toBeGreaterThan(0)
    }

    for (const entry of functions) {
      const file = getCodeWikiFile(entry.path)
      expect(file).toBeDefined()
      expect(file?.blocks).toContainEqual(expect.objectContaining({
        kind: 'function',
        anchor: entry.anchor,
        name: entry.name,
      }))
    }
  })

  it('gives every function a name, explanation, line, and a stable anchor', () => {
    for (const file of codeWikiDocument.files) {
      const anchors = new Set<string>()

      for (const block of file.blocks) {
        if (block.kind !== 'function') continue

        expect(block.name.trim()).not.toBe('')
        expect(block.identifier.trim()).not.toBe('')
        expect(block.text.trim()).not.toBe('')
        expect(block.line).toBeGreaterThan(0)
        expect(block.anchor).toMatch(/^[\p{L}\p{N}-]+$/u)
        expect(block.anchor).not.toBe(String(block.line))
        expect(anchors.has(block.anchor)).toBe(false)
        anchors.add(block.anchor)
      }
    }
  })

  it('builds a directory tree that contains each documented file once', () => {
    const tree = buildCodeWikiTree(codeWikiDocument.files)
    const treeFiles = collectFiles(tree)

    expect(new Set(treeFiles)).toEqual(new Set(codeWikiDocument.files.map((file) => file.path)))
    expect(treeFiles).toHaveLength(codeWikiDocument.files.length)
    expectSorted(tree)

    for (const file of codeWikiDocument.files) {
      const segments = file.path.split('/')
      segments.pop()

      let path = ''
      for (const segment of segments) {
        path = path ? `${path}/${segment}` : segment
        expect(findDirectory(tree, path)).toBeDefined()
      }
    }
  })

  it('resolves deep links to the documented file and function', () => {
    expect(targetFromHash('#code-wiki/home')).toEqual({
      path: 'home',
      anchor: null,
    })
    expect(targetFromHash('#map-gallery')).toBeNull()

    for (const entry of functions) {
      expect(targetFromHash(codeWikiHash(entry.path, entry.anchor))).toEqual({
        path: entry.path,
        anchor: entry.anchor,
      })
    }

    expect(targetFromHash(codeWikiHash('scripts/initialize-world.mjs', 'waitForWorld'))).toEqual({
      path: 'scripts/initialize-world.mjs',
      anchor: 'waitForWorld',
    })
  })

  it('keeps file explanations, notes, concepts, and area summaries', () => {
    const prose = codeWikiDocument.files.flatMap((file) =>
      file.blocks.filter((block) => block.kind === 'prose'),
    )
    const notes = codeWikiDocument.files.flatMap((file) => file.notes)

    expect(prose.length).toBeGreaterThan(0)
    expect(prose.every((block) => block.text.trim().length > 0)).toBe(true)
    expect(notes.length).toBeGreaterThan(0)
    expect(notes.every((note) => note.trim().length > 0)).toBe(true)
    expect(codeWikiDocument.concepts.length).toBeGreaterThan(0)
    expect(codeWikiDocument.concepts.every((note) =>
      note.title.trim().length > 0 && note.text.trim().length > 0,
    )).toBe(true)
    expect(codeWikiDocument.homeNotes.length).toBeGreaterThan(0)
    expect(codeWikiDocument.homeNotes.every((note) => note.text.trim().length > 0)).toBe(true)
    expect(codeWikiDocument.partGuides.length).toBeGreaterThan(0)
    expect(codeWikiDocument.partGuides.every((guide) => guide.trim().length > 0)).toBe(true)
  })

  it('keeps MapGrid section headings ahead of their functions', () => {
    const file = getCodeWikiFile('src/application/map/map-grid.ts')
    expect(file).toBeDefined()

    const labels = file?.blocks.map((block) =>
      block.kind === 'function' ? block.name : block.text,
    ) ?? []

    expect(labels.indexOf('## **📍 2\\. Kartans koordinater och aktuella vy**'))
      .toBe(labels.indexOf('MapGrid.getCoordinates()') - 1)
    expect(labels.indexOf('## **🔍 3\\. Zoomning och centrering**'))
      .toBe(labels.indexOf('MapGrid.setZoomLevel()') - 1)
    expect(labels.indexOf('## **🎨 4\\. Uppdatering av hexagonernas grafik**'))
      .toBe(labels.indexOf('MapGrid.setHexFill()') - 1)
    expect(labels.indexOf('## **⚙️ 5\\. Intern beräkning av kartvyn**'))
      .toBe(labels.indexOf('MapGrid.#applyView()') - 1)

    for (const name of [
      'ResizeObserver-callback',
      'MapGrid.getView()',
      'MapGrid.onHexClick()',
      'MapGrid.setHexGraphic()',
    ]) {
      const block = file?.blocks.find((entry) =>
        entry.kind === 'function' && entry.name === name,
      )
      expect(block?.kind === 'function' ? block.text.includes('## **') : true).toBe(false)
    }
  })

  it('keeps the visitor-map directory note on the home page', () => {
    expect(codeWikiDocument.homeNotes.some((note) =>
      note.text.includes(
        'Katalogerna `kalmar-map/` och `world-map/` finns inte i det aktuella arbetsträdet. Motsvarande besökskartor ligger i katalogerna `visitor-map-*`.',
      ),
    )).toBe(true)
  })

  it('keeps same-named functions in different files distinct', () => {
    const hills = functions.filter((entry) => entry.name === 'addHill()')
    const identities = new Set(hills.map((entry) => `${entry.path}/${entry.anchor}`))

    expect(hills.length).toBeGreaterThan(1)
    expect(identities.size).toBe(hills.length)
  })
})

function isSourcePath(path: string): boolean {
  if (path.startsWith('/') || path.endsWith('/') || path.includes('\\')) return false

  const segments = path.split('/')
  if (segments.some((segment) => segment === '' || segment === '.' || segment === '..')) {
    return false
  }

  return /\.[A-Za-z0-9]+$/.test(segments.at(-1) ?? '')
}

function collectFiles(nodes: CodeWikiTreeNode[]): string[] {
  const paths: string[] = []

  for (const node of nodes) {
    if (node.kind === 'directory') {
      expect(node.name).not.toBe('')
      expect(node.children.length).toBeGreaterThan(0)
      paths.push(...collectFiles(node.children))
      continue
    }

    paths.push(node.path)
  }

  return paths
}

function findDirectory(
  nodes: CodeWikiTreeNode[],
  path: string,
): Extract<CodeWikiTreeNode, { kind: 'directory' }> | undefined {
  for (const node of nodes) {
    if (node.kind !== 'directory') continue
    if (node.path === path) return node

    const nested = findDirectory(node.children, path)
    if (nested) return nested
  }

  return undefined
}

function expectSorted(nodes: CodeWikiTreeNode[]): void {
  const sorted = [...nodes].sort((left, right) => {
    if (left.kind !== right.kind) return left.kind === 'directory' ? -1 : 1
    return left.name.localeCompare(right.name, 'en', { numeric: true })
  })

  expect(nodes.map((node) => node.path)).toEqual(sorted.map((node) => node.path))

  for (const node of nodes) {
    if (node.kind === 'directory') expectSorted(node.children)
  }
}
