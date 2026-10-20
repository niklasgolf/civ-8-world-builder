
import {
  WIKI_GROUPS,
  type WikiCategory,
  type WikiCategoryId,
} from './catalog.ts'

export type WikiPageId = 'home' | WikiCategoryId

export class CivWikiNavigation {
  readonly element: HTMLElement

  private readonly buttons = new Map<WikiPageId, HTMLButtonElement>()
  private readonly onSelect: (page: WikiPageId) => void

  constructor(onSelect: (page: WikiPageId) => void) {
    this.onSelect = onSelect

    const nav = document.createElement('nav')
    nav.className = 'civ-wiki__nav'
    nav.setAttribute('aria-label', 'Encyclopedia')

    const homeSection = document.createElement('div')
    homeSection.className = 'civ-wiki__nav-group'

    const homeList = document.createElement('div')
    homeList.className = 'civ-wiki__nav-list'

    homeList.append(this.createButton('home', 'Home'))
    homeSection.append(homeList)
    nav.append(homeSection)

    for (const group of WIKI_GROUPS) {
      const section = document.createElement('div')
      section.className = 'civ-wiki__nav-group'

      const label = document.createElement('p')
      label.className = 'civ-wiki__nav-label'
      label.textContent = group.label

      const list = document.createElement('div')
      list.className = 'civ-wiki__nav-list'

      for (const category of group.categories) {
        list.append(this.createCategoryButton(category))
      }

      section.append(label, list)
      nav.append(section)
    }

    this.element = nav
  }

  setSelected(page: WikiPageId): void {
    for (const [id, button] of this.buttons) {
      const selected = id === page

      button.classList.toggle('is-selected', selected)
      button.setAttribute('aria-pressed', selected ? 'true' : 'false')
    }
  }

  private createCategoryButton(category: WikiCategory): HTMLButtonElement {
    return this.createButton(category.id, category.label)
  }

  private createButton(
    id: WikiPageId,
    label: string,
  ): HTMLButtonElement {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'civ-wiki__nav-button'
    button.textContent = label

    button.addEventListener('click', () => {
      this.onSelect(id)
    })

    this.buttons.set(id, button)

    return button
  }
}
