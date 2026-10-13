import { createCoast } from '../../library-svg-graphics/terrain/coast.ts'
import { createOcean } from '../../library-svg-graphics/terrain/ocean.ts'

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
]

export class CivWiki {
  readonly element: HTMLElement

  constructor() {
    const wiki = document.createElement('section')
    wiki.className = 'civ-wiki'
    wiki.setAttribute('aria-label', 'Civilization 8 Wiki')

    const page = document.createElement('article')
    page.className = 'civ-wiki__page'
    page.append(this.createIntro(), this.createTerrains())

    wiki.append(page)
    this.element = wiki
  }

  private createIntro(): HTMLElement {
    const intro = document.createElement('header')
    intro.className = 'civ-wiki__intro'

    const title = document.createElement('h1')
    title.className = 'civ-wiki__title'
    title.textContent = 'Civilization 8 Wiki'

    const subtitle = document.createElement('p')
    subtitle.className = 'civ-wiki__subtitle'
    subtitle.textContent = 'Terrain encyclopedia and SVG graphics gallery'

    intro.append(title, subtitle)
    return intro
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
}
