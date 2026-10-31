import type { CodeWikiMain } from './code-wiki-main.ts'

type CodeWikiModule = typeof import('./code-wiki-main.ts')

export class CodeWiki {
  readonly element: HTMLElement

  #module: Promise<CodeWikiModule> | null = null
  #wiki: CodeWikiMain | null = null
  #request = 0
  #desiredHash: string | null = null

  constructor() {
    const wiki = document.createElement('section')
    wiki.className = 'civ-wiki code-wiki'
    wiki.setAttribute('aria-label', 'Civilization of Wonders Code Wiki')
    this.element = wiki
  }

  async reveal(hash: string | null): Promise<void> {
    const existing = this.#wiki
    if (existing) {
      if (!hash) return

      const request = ++this.#request
      const loaded = await this.#loadModule()
      if (!this.#isCurrent(request)) return

      const target = loaded.targetFromHash(hash)
      if (!target || !this.#isCurrent(request)) return
      existing.showTarget(target)
      return
    }

    this.#showStatus('Loading Code Wiki…')
    if (hash) this.#desiredHash = hash

    const request = ++this.#request

    try {
      const loaded = await this.#loadModule()
      if (request !== this.#request) return
      if (!this.element.classList.contains('is-active')) {
        this.#desiredHash = null
        return
      }
      if (this.#wiki) return

      const target = this.#desiredHash
        ? loaded.targetFromHash(this.#desiredHash)
        : null
      if (!this.#isCurrent(request)) return

      this.#wiki = new loaded.CodeWikiMain(this.element, target)
      this.#desiredHash = null
      this.element.removeAttribute('aria-busy')
    } catch (error: unknown) {
      console.error('Failed to load Code Wiki:', error)
      if (request !== this.#request) return
      if (!this.element.classList.contains('is-active')) return
      this.#showStatus('Code Wiki could not be loaded.')
    }
  }

  #isCurrent(request: number): boolean {
    return request === this.#request && this.element.classList.contains('is-active')
  }

  #loadModule(): Promise<CodeWikiModule> {
    this.#module ??= import('./code-wiki-main.ts').catch((error: unknown) => {
      this.#module = null
      throw error
    })
    return this.#module
  }

  #showStatus(message: string): void {
    const page = document.createElement('article')
    page.className = 'civ-wiki__page'

    const intro = document.createElement('header')
    intro.className = 'civ-wiki__intro'

    const title = document.createElement('h1')
    title.className = 'civ-wiki__title'
    title.textContent = 'Civilization of Wonders Code Wiki'

    const subtitle = document.createElement('p')
    subtitle.className = 'civ-wiki__subtitle'
    subtitle.textContent = 'Application architecture and function reference'

    const status = document.createElement('p')
    status.className = 'civ-wiki__note'
    status.textContent = message

    intro.append(title, subtitle)
    page.append(intro, status)
    this.element.replaceChildren(page)
    this.element.setAttribute('aria-busy', message.startsWith('Loading') ? 'true' : 'false')
  }
}
