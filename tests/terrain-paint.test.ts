
import { describe, expect, it } from 'vitest'
import type { Id } from '../convex/_generated/dataModel.ts'
import { decideTerrainPaint } from '../src/main/terrain-paint.ts'

const worldId = 'world_1' as Id<'worlds'>
const coordinate = { x: 12, y: 4 }

const terrainCases = [
  ['grass', 'grass', 'flat'],
  ['plains', 'plains', 'flat'],
  ['desert', 'desert', 'flat'],
  ['tundra', 'tundra', 'flat'],
  ['snow', 'snow', 'flat'],

  ['grass-hills', 'grass', 'hills'],
  ['plains-hills', 'plains', 'hills'],
  ['desert-hills', 'desert', 'hills'],
  ['tundra-hills', 'tundra', 'hills'],
  ['snow-hills', 'snow', 'hills'],

  ['grass-mountains', 'grass', 'mountain'],
  ['plains-mountains', 'plains', 'mountain'],
  ['desert-mountains', 'desert', 'mountain'],
  ['tundra-mountains', 'tundra', 'mountain'],
  ['snow-mountains', 'snow', 'mountain'],

  ['coast', 'coast', 'flat'],
  ['ocean', 'ocean', 'flat'],
] as const

describe('TerrainPaint — existing behavior', () => {
  it.each(terrainCases)(
    'maps %s to terrain %s and relief %s',
    (selectedTerrain, terrain, relief) => {
      expect(decideTerrainPaint(
        true,
        worldId,
        selectedTerrain,
        coordinate,
      )).toEqual({
        kind: 'paint',
        args: {
          worldId,
          x: 12,
          y: 4,
          terrain,
          relief,
        },
      })
    },
  )

  it('does not paint without the current editing session', () => {
    expect(decideTerrainPaint(
      false,
      worldId,
      'grass',
      coordinate,
    )).toEqual({ kind: 'ignore' })
  })

  it('does not paint without a selected world', () => {
    expect(decideTerrainPaint(
      true,
      null,
      'grass',
      coordinate,
    )).toEqual({ kind: 'ignore' })
  })

  it('does not paint an unknown terrain', () => {
    expect(decideTerrainPaint(
      true,
      worldId,
      'unknown-terrain',
      coordinate,
    )).toEqual({
      kind: 'unknown-terrain',
      selectedTerrain: 'unknown-terrain',
    })
  })

  it('does not accept inherited object properties as terrain', () => {
    expect(decideTerrainPaint(
      true,
      worldId,
      'toString',
      coordinate,
    )).toEqual({
      kind: 'unknown-terrain',
      selectedTerrain: 'toString',
    })
  })

  it('prioritizes editing permissions over invalid terrain', () => {
    expect(decideTerrainPaint(
      false,
      worldId,
      'unknown-terrain',
      coordinate,
    )).toEqual({ kind: 'ignore' })
  })
})
