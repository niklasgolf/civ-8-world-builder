
import type { ConvexClient } from 'convex/browser'
import { api } from '../../../convex/_generated/api.js'
import type { Id } from '../../../convex/_generated/dataModel.ts'
import type { MapGrid } from './map-grid.ts'

type Terrain = 'ocean' | 'coast' | 'grass' | 'desert'

const TERRAIN_COLORS: Record<Terrain, string> = {
  ocean: '#0e4664',
  coast: '#3d8eab',
  grass: '#568c46',
  desert: '#c9ad72',
}

export class WorldMapController {
  private readonly client: ConvexClient
  private readonly mapGrid: MapGrid
  private unsubscribe: (() => void) | null = null

  constructor(client: ConvexClient, mapGrid: MapGrid) {
    this.client = client
    this.mapGrid = mapGrid
  }

  selectWorld(worldId: Id<'worlds'>): void {
    this.stop()

    this.unsubscribe = this.client.onUpdate(
      api.hexes.listByWorld,
      { worldId },
      (hexes) => {
        for (const hex of hexes) {
          this.mapGrid.setHexFill(
            { x: hex.x, y: hex.y },
            TERRAIN_COLORS[hex.terrain],
          )
        }
      },
      (error) => {
        console.error('World map subscription failed:', error)
      },
    )
  }

  stop(): void {
    this.unsubscribe?.()
    this.unsubscribe = null
  }
}
