
import { createCoast } from '../../library-svg-graphics/terrain/coast.ts'
import { createDesertFlat } from '../../library-svg-graphics/terrain/desert.ts'
import { createDesertHills } from '../../library-svg-graphics/terrain/desert-hills.ts'
import { createDesertMountains } from '../../library-svg-graphics/terrain/desert-mountains.ts'
import { createGrassFlat } from '../../library-svg-graphics/terrain/grass.ts'
import { createGrassHills } from '../../library-svg-graphics/terrain/grass-hills.ts'
import { createGrassMountains } from '../../library-svg-graphics/terrain/grass-mountains.ts'
import { createOcean } from '../../library-svg-graphics/terrain/ocean.ts'
import { createPlainsFlat } from '../../library-svg-graphics/terrain/plains.ts'
import { createPlainsHills } from '../../library-svg-graphics/terrain/plains-hills.ts'
import { createPlainsMountains } from '../../library-svg-graphics/terrain/plains-mountains.ts'
import { createTundraFlat } from '../../library-svg-graphics/terrain/tundra.ts'
import { createTundraHills } from '../../library-svg-graphics/terrain/tundra-hills.ts'
import { createTundraMountains } from '../../library-svg-graphics/terrain/tundra-mountains.ts'

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
  {
    name: 'Plains — Flat',
    description: 'Golden-yellow grassland with scattered dry grasses and subtle variations in the ground.',
    createGraphic: createPlainsFlat,
  },
  {
    name: 'Plains — Hills',
    description: 'Five low, rounded golden hills with sunlit slopes and darker grassy shadows.',
    createGraphic: createPlainsHills,
  },
  {
    name: 'Plains — Mountains',
    description: 'Rocky mountain peaks with snow-covered summits rising above golden plains.',
    createGraphic: createPlainsMountains,
  },
  {
    name: 'Desert — Flat',
    description: 'Warm golden sand with diagonal windblown patterns and scattered fine grains.',
    createGraphic: createDesertFlat,
  },
  {
    name: 'Desert — Hills',
    description: 'Five softly rounded golden sand dunes with sunlit crests and warm amber shadows.',
    createGraphic: createDesertHills,
  },
  {
    name: 'Desert — Mountains',
    description: 'Rocky mountain peaks with snow-covered summits rising above golden desert sands.',
    createGraphic: createDesertMountains,
  },
  {
    name: 'Tundra — Flat',
    description: 'Cold, weathered grey-brown rock with subtle ridges, branching fractures and tiny remnants of snow.',
    createGraphic: createTundraFlat,
  },
  {
    name: 'Tundra — Hills',
    description: 'Five rounded rocky hills with cold grey-brown slopes, fine fractures and traces of snow.',
    createGraphic: createTundraHills,
  },
  {
    name: 'Tundra — Mountains',
    description: 'Snow-capped mountain peaks with cool slate-grey rock, muted brown slopes and weathered tundra foothills.',
    createGraphic: createTundraMountains,
  },
]

export class CivWikiTerrain {
  createElement(): HTMLElement {
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
