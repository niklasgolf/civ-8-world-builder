import type { CodeWikiFile } from './documentation-types.ts'

export type CodeWikiTreeNode =
  | {
      kind: 'directory'
      name: string
      path: string
      children: CodeWikiTreeNode[]
    }
  | {
      kind: 'file'
      name: string
      path: string
    }

export function buildCodeWikiTree(files: CodeWikiFile[]): CodeWikiTreeNode[] {
  const roots: CodeWikiTreeNode[] = []

  for (const file of files) {
    const segments = file.path.split('/')
    let siblings = roots
    let path = ''

    segments.forEach((segment, index) => {
      path = path ? `${path}/${segment}` : segment
      const isFile = index === segments.length - 1

      if (isFile) {
        siblings.push({
          kind: 'file',
          name: segment,
          path: file.path,
        })
        return
      }

      let directory = siblings.find(
        (node): node is Extract<CodeWikiTreeNode, { kind: 'directory' }> =>
          node.kind === 'directory' && node.name === segment,
      )

      if (!directory) {
        directory = {
          kind: 'directory',
          name: segment,
          path,
          children: [],
        }
        siblings.push(directory)
      }

      siblings = directory.children
    })
  }

  sortTree(roots)
  return roots
}

function sortTree(nodes: CodeWikiTreeNode[]): void {
  nodes.sort((left, right) => {
    if (left.kind !== right.kind) {
      return left.kind === 'directory' ? -1 : 1
    }

    return left.name.localeCompare(right.name, 'en', { numeric: true })
  })

  for (const node of nodes) {
    if (node.kind === 'directory') sortTree(node.children)
  }
}
