import { buildCodeWikiTree, type CodeWikiTreeNode } from './code-wiki-tree.ts'
import { getCodeWikiDocument } from './documentation.ts'
import type { CodeWikiSelection } from './documentation-types.ts'

export class CodeWikiNavigation {
  readonly element: HTMLElement

  readonly #buttons = new Map<CodeWikiSelection, HTMLButtonElement>()
  readonly #onSelect: (page: CodeWikiSelection) => void
  #pointerScroll: number | null = null

  constructor(onSelect: (page: CodeWikiSelection) => void) {
    this.#onSelect = onSelect

    const nav = document.createElement('nav')
    nav.className = 'civ-wiki__nav code-wiki__nav'
    nav.setAttribute('aria-label', 'Code Wiki')

    const home = document.createElement('div')
    home.className = 'code-wiki__home'
    home.append(this.#createButton('home', 'Home', 'civ-wiki__nav-button'))

    const tree = document.createElement('div')
    tree.className = 'code-wiki__tree'
    tree.append(this.#createTree(buildCodeWikiTree(getCodeWikiDocument().files), 0))

    nav.append(home, tree)
    this.element = nav
  }

  setSelected(page: CodeWikiSelection): void {
    for (const [id, button] of this.#buttons) {
      const selected = id === page
      button.classList.toggle('is-selected', selected)
      button.setAttribute('aria-pressed', selected ? 'true' : 'false')
    }
  }

  #createTree(nodes: CodeWikiTreeNode[], depth: number): HTMLUListElement {
    const list = document.createElement('ul')
    list.className = 'code-wiki__tree-list'

    for (const node of nodes) {
      const item = document.createElement('li')

      if (node.kind === 'directory') {
        const label = document.createElement('div')
        label.className = 'code-wiki__folder'
        label.style.paddingLeft = `${8 + depth * 14}px`
        label.append(folderIcon(), document.createTextNode(node.name))
        item.append(label, this.#createTree(node.children, depth + 1))
      } else {
        const button = this.#createButton(
          node.path,
          node.name,
          'civ-wiki__nav-button code-wiki__file',
        )
        button.style.paddingLeft = `${8 + depth * 14}px`
        button.prepend(fileIcon())
        item.append(button)
      }

      list.append(item)
    }

    return list
  }

  #createButton(
    id: CodeWikiSelection,
    label: string,
    className: string,
  ): HTMLButtonElement {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = className
    button.textContent = label
    button.dataset.page = id

    button.addEventListener('mousedown', () => {
      this.#pointerScroll = this.element.scrollTop
    })

    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        this.#pointerScroll = this.element.scrollTop
      }
    })

    button.addEventListener('click', () => {
      const scrollTop = this.#pointerScroll ?? this.element.scrollTop
      this.#pointerScroll = null
      this.#onSelect(id)
      this.element.scrollTop = scrollTop
    })

    this.#buttons.set(id, button)
    return button
  }
}

function folderIcon(): SVGElement {
  return glyph('M1.5 3.2h4.1l1.3 1.4h7.6v8.2H1.5V3.2z')
}

function fileIcon(): SVGElement {
  return glyph('M3 1.5h6.2L13 5.3V14.5H3V1.5zm6 1.2V5h2.4')
}

function glyph(pathData: string): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 16 16')
  svg.setAttribute('aria-hidden', 'true')
  svg.classList.add('code-wiki__glyph')

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', pathData)
  path.setAttribute('fill', 'none')
  path.setAttribute('stroke', 'currentColor')
  path.setAttribute('stroke-width', '1.2')
  path.setAttribute('stroke-linejoin', 'round')
  svg.append(path)

  return svg
}
