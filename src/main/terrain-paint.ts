
import type { Id } from '../../convex/_generated/dataModel.ts'

type Terrain = 'ocean' | 'coast' | 'grass' | 'plains' | 'desert' | 'tundra' | 'snow'
type Relief = 'flat' | 'hills' | 'mountain'

type TerrainSelection = {
  terrain: Terrain
  relief: Relief
}

type HexCoordinate = {
  x: number
  y: number
}

type PaintDecision =
  | { kind: 'ignore' }
  | { kind: 'unknown-terrain'; selectedTerrain: string }
  | {
    kind: 'paint'
    args: {
      worldId: Id<'worlds'>
      x: number
      y: number
      terrain: Terrain
      relief: Relief
    }
  }

const TERRAIN_SELECTIONS: Record<string, TerrainSelection> = {
  grass: { terrain: 'grass', relief: 'flat' },
  plains: { terrain: 'plains', relief: 'flat' },
  desert: { terrain: 'desert', relief: 'flat' },
  tundra: { terrain: 'tundra', relief: 'flat' },
  snow: { terrain: 'snow', relief: 'flat' },

  'grass-hills': { terrain: 'grass', relief: 'hills' },
  'plains-hills': { terrain: 'plains', relief: 'hills' },
  'desert-hills': { terrain: 'desert', relief: 'hills' },
  'tundra-hills': { terrain: 'tundra', relief: 'hills' },
  'snow-hills': { terrain: 'snow', relief: 'hills' },

  'grass-mountains': { terrain: 'grass', relief: 'mountain' },
  'plains-mountains': { terrain: 'plains', relief: 'mountain' },
  'desert-mountains': { terrain: 'desert', relief: 'mountain' },
  'tundra-mountains': { terrain: 'tundra', relief: 'mountain' },
  'snow-mountains': { terrain: 'snow', relief: 'mountain' },

  coast: { terrain: 'coast', relief: 'flat' },
  ocean: { terrain: 'ocean', relief: 'flat' },
}

export function decideTerrainPaint(
  isCurrentEditor: boolean,
  worldId: Id<'worlds'> | null,
  selectedTerrain: string,
  coordinate: HexCoordinate,
): PaintDecision {
  if (!isCurrentEditor || !worldId) {
    return { kind: 'ignore' }
  }

  const selection = Object.hasOwn(TERRAIN_SELECTIONS, selectedTerrain)
    ? TERRAIN_SELECTIONS[selectedTerrain]
    : undefined

  if (!selection) {
    return { kind: 'unknown-terrain', selectedTerrain }
  }

  return {
    kind: 'paint',
    args: {
      worldId,
      x: coordinate.x,
      y: coordinate.y,
      terrain: selection.terrain,
      relief: selection.relief,
    },
  }
}
