import { CodeWikiHome } from './code-wiki-home.ts'
import { renderCodeWikiFile } from './code-wiki-page.ts'
import { CodeWikiNavigation } from './code-wiki-navigation.ts'
import { codeWikiHash, targetFromHash } from './code-wiki-target.ts'
import { getCodeWikiFile } from './documentation.ts'
import type { CodeWikiSelection, CodeWikiTarget } from './documentation-types.ts'

export { targetFromHash }

export class CodeWikiMain {
  readonly element: HTMLElement

  readonly #navigation: CodeWikiNavigation
  readonly #content: HTMLElement
  #page: CodeWikiSelection = 'home'

  constructor(
    root?: HTMLElement,
    initialTarget: CodeWikiTarget | null = null,
  ) {
    const wiki = root ?? document.createElement('section')
    if (!root) {
      wiki.className = 'civ-wiki code-wiki'
      wiki.setAttribute('aria-label', 'Civilization of Wonders Code Wiki')
    }
    wiki.replaceChildren()

    const page = document.createElement('article')
    page.className = 'civ-wiki__page'

    const layout = document.createElement('div')
    layout.className = 'civ-wiki__layout'

    this.#navigation = new CodeWikiNavigation((pageId) => {
      this.#show(pageId, null, true)
    })

    this.#content = document.createElement('div')
    this.#content.className = 'civ-wiki__content'
    this.#content.tabIndex = -1

    layout.append(this.#navigation.element, this.#content)
    page.append(this.#createIntro(), layout)
    wiki.append(page)
    this.element = wiki

    this.#show(initialTarget?.path ?? 'home', initialTarget?.anchor ?? null, false)
  }

  targetFromHash(hash: string): CodeWikiTarget | null {
    return targetFromHash(hash)
  }

  showTarget(target: CodeWikiTarget): void {
    this.#show(target.path, target.anchor, false)
  }

  #show(
    path: CodeWikiSelection,
    anchor: string | null,
    updateHash: boolean,
  ): void {
    this.#page = path
    this.#navigation.setSelected(path)
    this.#content.replaceChildren(this.#createPage(path))
    this.#content.scrollTop = 0

    if (anchor) this.#scrollToAnchor(anchor)

    if (updateHash) {
      const nextHash = codeWikiHash(path, null)
      if (location.hash !== nextHash) {
        history.replaceState(null, '', nextHash)
      }
    }
  }

  #createPage(path: CodeWikiSelection): HTMLElement {
    if (path === 'home') return new CodeWikiHome().createElement()

    const file = getCodeWikiFile(path)
    if (!file) {
      const missing = document.createElement('p')
      missing.textContent = 'This source file is not documented in Code Wiki.'
      return missing
    }

    return renderCodeWikiFile(file, (anchor) => {
      this.#openAnchor(anchor)
    })
  }

  #openAnchor(anchor: string): void {
    if (this.#page === 'home') return

    const nextHash = codeWikiHash(this.#page, anchor)
    if (location.hash !== nextHash) {
      history.pushState(null, '', nextHash)
    }

    this.#scrollToAnchor(anchor)
  }

  #scrollToAnchor(anchor: string): void {
    const align = () => {
      const heading = this.#content.querySelector<HTMLElement>(
        `[data-anchor="${CSS.escape(anchor)}"]`,
      )
      if (!heading) return
      this.#content.scrollTop = heading.offsetTop
    }

    align()
    requestAnimationFrame(align)
  }

  #createIntro(): HTMLElement {
    const intro = document.createElement('header')
    intro.className = 'civ-wiki__intro'

    const title = document.createElement('h1')
    title.className = 'civ-wiki__title'
    title.textContent = 'Civilization of Wonders Code Wiki'

    const subtitle = document.createElement('p')
    subtitle.className = 'civ-wiki__subtitle'
    subtitle.textContent = 'Application architecture and function reference'

    intro.append(title, subtitle)
    return intro
  }
}
