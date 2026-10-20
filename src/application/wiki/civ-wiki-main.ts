
import {
  WIKI_GROUPS,
  iconsFor,
  type WikiCategory,
} from './catalog.ts'
import { CivWikiHome } from './civ-wiki-home.ts'
import { CivWikiIcons } from './civ-wiki-icons.ts'
import {
  CivWikiNavigation,
  type WikiPageId,
} from './civ-wiki-navigation.ts'
import { CivWikiTerrain } from './civ-wiki-terrains.ts'

export class CivWikiMain {
  readonly element: HTMLElement

  private readonly navigation: CivWikiNavigation
  private readonly panels = new Map<WikiPageId, HTMLElement>()
  private readonly home = new CivWikiHome()
  private readonly icons = new CivWikiIcons()
  private readonly terrain = new CivWikiTerrain()

  constructor() {
    const wiki = document.createElement('section')
    wiki.className = 'civ-wiki'
    wiki.setAttribute('aria-label', 'Civilization of Wonders Wiki')

    const page = document.createElement('article')
    page.className = 'civ-wiki__page'

    const layout = document.createElement('div')
    layout.className = 'civ-wiki__layout'

    this.navigation = new CivWikiNavigation((pageId) => {
      this.showPage(pageId)
    })

    layout.append(
      this.navigation.element,
      this.createContent(),
    )

    page.append(
      this.createIntro(),
      layout,
    )

    wiki.append(page)
    this.element = wiki

    this.showPage('home')
  }

  private createIntro(): HTMLElement {
    const intro = document.createElement('header')
    intro.className = 'civ-wiki__intro'

    const title = document.createElement('h1')
    title.className = 'civ-wiki__title'
    title.textContent = 'Civilization of Wonders Wiki'

    const subtitle = document.createElement('p')
    subtitle.className = 'civ-wiki__subtitle'
    subtitle.textContent = 'Terrain encyclopedia and SVG graphics gallery'

    intro.append(title, subtitle)

    return intro
  }

  private createContent(): HTMLElement {
    const content = document.createElement('div')
    content.className = 'civ-wiki__content'

    const homePanel = document.createElement('div')
    homePanel.className = 'civ-wiki__panel'
    homePanel.append(this.home.createElement())

    this.panels.set('home', homePanel)
    content.append(homePanel)

    for (const group of WIKI_GROUPS) {
      for (const category of group.categories) {
        const panel = category.id === 'base-terrains'
          ? this.createTerrainPanel()
          : this.createCategoryPanel(category)

        this.panels.set(category.id, panel)
        content.append(panel)
      }
    }

    return content
  }

  private createTerrainPanel(): HTMLElement {
    const panel = document.createElement('div')
    panel.className = 'civ-wiki__panel'

    panel.append(
      this.terrain.createElement(),
      this.icons.createTerrainIcons(),
    )

    return panel
  }

  private createCategoryPanel(category: WikiCategory): HTMLElement {
    const panel = document.createElement('section')
    panel.className = 'civ-wiki__panel'

    const heading = document.createElement('h2')
    heading.className = 'civ-wiki__heading'
    heading.id = `civ-wiki-${category.id}`
    heading.textContent = category.label

    panel.setAttribute('aria-labelledby', heading.id)

    panel.append(
      heading,
      this.icons.createGrid(iconsFor(category.id)),
    )

    return panel
  }

  private showPage(pageId: WikiPageId): void {
    this.navigation.setSelected(pageId)

    for (const [id, panel] of this.panels) {
      panel.hidden = id !== pageId
    }

    this.element.scrollTop = 0
  }
}
