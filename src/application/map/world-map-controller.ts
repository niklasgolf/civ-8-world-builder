import type { ConvexClient } from 'convex/browser'
import { api } from '../../../convex/_generated/api.js'
import type { Id } from '../../../convex/_generated/dataModel.ts'

import { createGrassFlat } from '../../library-svg-graphics/terrain/grass.ts'
import { createGrassHills } from '../../library-svg-graphics/terrain/grass-hills.ts'
import { createGrassMountains } from '../../library-svg-graphics/terrain/grass-mountains.ts'

import { createPlainsFlat } from '../../library-svg-graphics/terrain/plains.ts'
import { createPlainsHills } from '../../library-svg-graphics/terrain/plains-hills.ts'
import { createPlainsMountains } from '../../library-svg-graphics/terrain/plains-mountains.ts'

import { createDesertFlat } from '../../library-svg-graphics/terrain/desert.ts'
import { createDesertHills } from '../../library-svg-graphics/terrain/desert-hills.ts'
import { createDesertMountains } from '../../library-svg-graphics/terrain/desert-mountains.ts'

import { createTundraFlat } from '../../library-svg-graphics/terrain/tundra.ts'
import { createTundraHills } from '../../library-svg-graphics/terrain/tundra-hills.ts'
import { createTundraMountains } from '../../library-svg-graphics/terrain/tundra-mountains.ts'

import { createSnowFlat } from '../../library-svg-graphics/terrain/snow.ts'
import { createSnowHills } from '../../library-svg-graphics/terrain/snow-hills.ts'
import { createSnowMountains } from '../../library-svg-graphics/terrain/snow-mountains.ts'

import { createCoast } from '../../library-svg-graphics/terrain/coast.ts'
import { createOcean } from '../../library-svg-graphics/terrain/ocean.ts'

import type { MapGrid } from './map-grid.ts'

type TerrainGraphicFactory = () => SVGSVGElement

const TERRAIN_GRAPHICS: Record<string, TerrainGraphicFactory> = {
  'grass-flat': createGrassFlat,
  'grass-hills': createGrassHills,
  'grass-mountain': createGrassMountains,

  'plains-flat': createPlainsFlat,
  'plains-hills': createPlainsHills,
  'plains-mountain': createPlainsMountains,

  'desert-flat': createDesertFlat,
  'desert-hills': createDesertHills,
  'desert-mountain': createDesertMountains,

  'tundra-flat': createTundraFlat,
  'tundra-hills': createTundraHills,
  'tundra-mountain': createTundraMountains,

  'snow-flat': createSnowFlat,
  'snow-hills': createSnowHills,
  'snow-mountain': createSnowMountains,

  'coast-flat': createCoast,
  'ocean-flat': createOcean,
}

export class WorldMapController {
  readonly #client: ConvexClient
  readonly #mapGrid: MapGrid
  #unsubscribe: (() => void) | null = null

  constructor(client: ConvexClient, mapGrid: MapGrid) {
    this.#client = client
    this.#mapGrid = mapGrid
  }

  selectWorld(worldId: Id<'worlds'>): void {
    this.stop()

    this.#unsubscribe = this.#client.onUpdate(
      api.hexes.listByWorld,
      { worldId },
      (hexes) => {
        for (const hex of hexes) {
          const coordinate = { x: hex.x, y: hex.y }
          const terrainKey = `${hex.terrain}-${hex.relief}`
          const createGraphic = TERRAIN_GRAPHICS[terrainKey]

          if (!createGraphic) {
            console.error(
              `Unsupported terrain: ${terrainKey}`,
              coordinate,
            )
            continue
          }

          this.#mapGrid.setHexGraphic(
            coordinate,
            createGraphic(),
          )
        }
      },
      (error) => {
        console.error('World map subscription failed:', error)
      },
    )
  }

  stop(): void {
    this.#unsubscribe?.()
    this.#unsubscribe = null
  }
}