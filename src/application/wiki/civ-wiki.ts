
import { createIcon, type IconName } from '../../library-svg-graphics/icons/icons.ts'
import { createCoast } from '../../library-svg-graphics/terrain/coast.ts'
import { createGrassFlat } from '../../library-svg-graphics/terrain/grass.ts'
import { createGrassHills } from '../../library-svg-graphics/terrain/grass-hills.ts'
import { createGrassMountains } from '../../library-svg-graphics/terrain/grass-mountains.ts'
import { createOcean } from '../../library-svg-graphics/terrain/ocean.ts'
import {
  DEFAULT_CATEGORY,
  WIKI_GROUPS,
  iconsFor,
  iconTitle,
  type WikiCategory,
  type WikiCategoryId,
} from './catalog.ts'

type TerrainEntry = {
  readonly name: string
  readonly description: string
  readonly createGraphic: () => SVGSVGElement
}

const BASE_TERRAINS: readonly TerrainEntry[] = [
  {
    name: 'Ocean',
    description: 'Deep water terrain.',
    createGraphic: createOcean,
  },
  {
    name: 'Coast',
    description: 'Shallow coastal water.',
    createGraphic: createCoast,
  },
  {
    name: 'Grass — Flat',
    description: 'Open grassland with gentle green variations and scattered grass tufts.',
    createGraphic: createGrassFlat,
  },
  {
    name: 'Grass — Hills',
    description: 'Rolling green hills rising from the grassland.',
    createGraphic: createGrassHills,
  },
  {
    name: 'Grass — Mountains',
    description: 'Rocky mountain peaks with snow-covered summits rising above green grassland.',
    createGraphic: createGrassMountains,
  },
]

export class CivWiki {
  readonly element: HTMLElement

  private readonly buttons = new Map<WikiCategoryId, HTMLButtonElement>()
  private readonly panels = new Map<WikiCategoryId, HTMLElement>()

  constructor() {
    const wiki = document.createElement('section')
    wiki.className = 'civ-wiki'
    wiki.setAttribute('aria-label', 'Civilization of Wonders Wiki')

    const page = document.createElement('article')
    page.className = 'civ-wiki__page'

    const layout = document.createElement('div')
    layout.className = 'civ-wiki__layout'
    layout.append(this.createNavigation(), this.createContent())

    page.append(this.createIntro(), layout)
    wiki.append(page)
    this.element = wiki
    this.showCategory(DEFAULT_CATEGORY)
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

  private createNavigation(): HTMLElement {
    const nav = document.createElement('nav')
    nav.className = 'civ-wiki__nav'
    nav.setAttribute('aria-label', 'Encyclopedia')

    for (const group of WIKI_GROUPS) {
      const section = document.createElement('div')
      section.className = 'civ-wiki__nav-group'

      const label = document.createElement('p')
      label.className = 'civ-wiki__nav-label'
      label.textContent = group.label

      const list = document.createElement('div')
      list.className = 'civ-wiki__nav-list'

      for (const category of group.categories) {
        list.append(this.createNavButton(category))
      }

      section.append(label, list)
      nav.append(section)
    }

    return nav
  }

  private createNavButton(category: WikiCategory): HTMLButtonElement {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'civ-wiki__nav-button'
    button.textContent = category.label
    button.addEventListener('click', () => {
      this.showCategory(category.id)
    })
    this.buttons.set(category.id, button)
    return button
  }

  private createContent(): HTMLElement {
    const content = document.createElement('div')
    content.className = 'civ-wiki__content'

    for (const group of WIKI_GROUPS) {
      for (const category of group.categories) {
        const panel = this.createPanel(category)
        this.panels.set(category.id, panel)
        content.append(panel)
      }
    }

    return content
  }

  private createPanel(category: WikiCategory): HTMLElement {
    if (category.id === 'base-terrains') {
      return this.createBaseTerrainsPanel()
    }

    const panel = document.createElement('section')
    panel.className = 'civ-wiki__panel'

    const heading = document.createElement('h2')
    heading.className = 'civ-wiki__heading'
    heading.id = `civ-wiki-${category.id}`
    heading.textContent = category.label
    panel.setAttribute('aria-labelledby', heading.id)
    panel.append(heading, this.createIconGrid(iconsFor(category.id)))
    return panel
  }

  private createBaseTerrainsPanel(): HTMLElement {
    const panel = document.createElement('div')
    panel.className = 'civ-wiki__panel'
    panel.append(this.createTerrains(), this.createTerrainIcons())
    return panel
  }

  private createTerrains(): HTMLElement {
    const section = document.createElement('section')
    section.className = 'civ-wiki__section'

    const heading = document.createElement('h2')
    heading.className = 'civ-wiki__heading'
    heading.id = 'civ-wiki-base-terrains'
    heading.textContent = 'Base terrains'
    section.setAttribute('aria-labelledby', heading.id)

    const table = document.createElement('table')
    table.className = 'civ-wiki__table'

    const head = document.createElement('thead')
    const headRow = document.createElement('tr')
    for (const label of ['Terrain', 'Graphic', 'Description']) {
      const cell = document.createElement('th')
      cell.scope = 'col'
      cell.textContent = label
      headRow.append(cell)
    }
    head.append(headRow)

    const body = document.createElement('tbody')
    for (const terrain of BASE_TERRAINS) {
      body.append(this.createTerrainRow(terrain))
    }

    table.append(head, body)
    section.append(heading, table)
    return section
  }

  private createTerrainRow(terrain: TerrainEntry): HTMLTableRowElement {
    const row = document.createElement('tr')

    const name = document.createElement('th')
    name.scope = 'row'
    name.className = 'civ-wiki__name'
    name.textContent = terrain.name

    const graphicCell = document.createElement('td')
    graphicCell.append(this.createGraphic(terrain.createGraphic))

    const description = document.createElement('td')
    description.textContent = terrain.description

    row.append(name, graphicCell, description)
    return row
  }

  private createGraphic(createGraphic: () => SVGSVGElement): SVGSVGElement {
    const graphic = createGraphic()
    graphic.classList.add('civ-wiki__graphic')

    const viewBox = graphic.getAttribute('viewBox')
    if (viewBox) {
      const parts = viewBox.split(/[\s,]+/).map(Number)
      const width = parts[2]
      const height = parts[3]
      if (width && height) {
        graphic.style.aspectRatio = `${width} / ${height}`
      }
    }

    return graphic
  }

  private createTerrainIcons(): HTMLElement {
    const section = document.createElement('section')
    section.className = 'civ-wiki__icon-section'
    section.setAttribute('aria-labelledby', 'civ-wiki-terrain-icons')

    const heading = document.createElement('h3')
    heading.className = 'civ-wiki__subheading'
    heading.id = 'civ-wiki-terrain-icons'
    heading.textContent = 'Terrain toolbar icons'

    const note = document.createElement('p')
    note.className = 'civ-wiki__note'
    note.textContent =
      'These are the original 24 × 24 toolbar icons, not the full-sized terrain graphics above.'

    section.append(heading, note, this.createIconGrid(iconsFor('base-terrains')))
    return section
  }

  private createIconGrid(names: readonly IconName[]): HTMLElement {
    const grid = document.createElement('div')
    grid.className = 'civ-wiki__grid'

    for (const name of names) {
      grid.append(this.createIconCard(name))
    }

    return grid
  }

  private createIconCard(name: IconName): HTMLElement {
    const card = document.createElement('article')
    card.className = 'civ-wiki__card'

    const art = document.createElement('div')
    art.className = 'civ-wiki__card-art'
    const icon = createIcon(name)
    icon.classList.add('civ-wiki__icon')
    art.append(icon)

    const title = document.createElement('h3')
    title.className = 'civ-wiki__card-name'
    title.textContent = iconTitle(name)

    const identifier = document.createElement('p')
    identifier.className = 'civ-wiki__card-id'
    identifier.textContent = name

    card.append(art, title, identifier)
    return card
  }

  private showCategory(category: WikiCategoryId): void {
    for (const [id, button] of this.buttons) {
      const selected = id === category
      button.classList.toggle('is-selected', selected)
      button.setAttribute('aria-pressed', selected ? 'true' : 'false')
    }

    for (const [id, panel] of this.panels) {
      panel.hidden = id !== category
    }

    this.element.scrollTop = 0
  }
}
