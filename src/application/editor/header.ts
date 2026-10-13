import { createHeaderMark } from '../../library-svg-graphics/icons/header-mark.ts'

export type AppView = 'world-builder' | 'civ-wiki'

const APP_VIEWS: ReadonlyArray<readonly [AppView, string]> = [
  ['world-builder', 'World Builder'],
  ['civ-wiki', 'Civ Wiki'],
]

export class Header {
  readonly element: HTMLElement

  private readonly onChange: (view: AppView) => void
  private readonly buttons = new Map<AppView, HTMLButtonElement>()

  constructor(onChange: (view: AppView) => void) {
    this.onChange = onChange

    const header = document.createElement('header')
    header.className = 'editor-header'
    header.append(createHeaderMark(), this.createTitle(), this.createModes())

    this.element = header
    this.setView('world-builder')
  }

  setView(view: AppView): void {
    for (const [candidate, button] of this.buttons) {
      const selected = candidate === view
      button.classList.toggle('is-selected', selected)
      button.setAttribute('aria-pressed', selected ? 'true' : 'false')
    }
  }

  private createTitle(): HTMLParagraphElement {
    const title = document.createElement('p')
    title.className = 'editor-header__title'

    const name = document.createElement('span')
    name.className = 'editor-header__name'
    name.textContent = 'Civilization 8'

    const dash = document.createElement('span')
    dash.className = 'editor-header__dash'
    dash.textContent = '—'

    const mode = document.createElement('span')
    mode.className = 'editor-header__mode'
    mode.textContent = 'World Builder'

    title.append(name, dash, mode)
    return title
  }

  private createModes(): HTMLElement {
    const nav = document.createElement('nav')
    nav.className = 'editor-header__modes'
    nav.setAttribute('aria-label', 'Application views')

    for (const [view, label] of APP_VIEWS) {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'mode-button'
      button.textContent = label
      button.addEventListener('click', () => {
        this.onChange(view)
      })
      this.buttons.set(view, button)
      nav.append(button)
    }

    return nav
  }
}
