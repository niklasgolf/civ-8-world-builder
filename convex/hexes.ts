
import { v } from 'convex/values'
import { internal } from './_generated/api'
import {
  internalMutation,
  query,
} from './_generated/server'

const DEFAULT_TERRAIN = 'ocean' as const
const DEFAULT_RELIEF = 'flat' as const

const EXPECTED_HEX_COUNT = 1174
const BATCH_SIZE = 100

const coordinateValidator = v.object({
  x: v.number(),
  y: v.number(),
})

export const initializeWorld = internalMutation({
  args: {
    worldId: v.id('worlds'),
    coordinates: v.array(coordinateValidator),
  },

  handler: async (ctx, args) => {
    const world = await ctx.db.get(args.worldId)

    if (!world) {
      throw new Error('World does not exist')
    }

    if (world.initializationStatus === 'initializing') {
      throw new Error('World initialization is already in progress')
    }

    if (world.initializationStatus === 'ready') {
      return {
        initialized: false,
        message: 'World is already initialized',
      }
    }

    const existingHex = await ctx.db
      .query('hexes')
      .withIndex('by_world', (q) =>
        q.eq('worldId', args.worldId),
      )
      .first()

    if (existingHex) {
      throw new Error(
        'World already contains hexagons but is not marked ready',
      )
    }

    if (args.coordinates.length !== EXPECTED_HEX_COUNT) {
      throw new Error(
        `Expected ${EXPECTED_HEX_COUNT} coordinates, received ${args.coordinates.length}`,
      )
    }

    const coordinateKeys = new Set<string>()

    for (const coordinate of args.coordinates) {
      if (
        !Number.isSafeInteger(coordinate.x) ||
        !Number.isSafeInteger(coordinate.y) ||
        coordinate.x % 2 !== coordinate.y % 2
      ) {
        throw new Error(
          `Invalid Midgard coordinate (${coordinate.x}, ${coordinate.y})`,
        )
      }

      const key = `${coordinate.x},${coordinate.y}`

      if (coordinateKeys.has(key)) {
        throw new Error(`Duplicate coordinate: ${key}`)
      }

      coordinateKeys.add(key)
    }

    await ctx.db.patch(args.worldId, {
      initializationStatus: 'initializing',
    })

    await ctx.scheduler.runAfter(0, internal.hexes.insertBatch, {
      worldId: args.worldId,
      coordinates: args.coordinates,
      start: 0,
    })

    return {
      initialized: true,
      message: 'World initialization scheduled',
    }
  },
})

export const insertBatch = internalMutation({
  args: {
    worldId: v.id('worlds'),
    coordinates: v.array(coordinateValidator),
    start: v.number(),
  },

  handler: async (ctx, args) => {
    const world = await ctx.db.get(args.worldId)

    if (!world || world.initializationStatus !== 'initializing') {
      return
    }

    const end = Math.min(
      args.start + BATCH_SIZE,
      args.coordinates.length,
    )

    for (let index = args.start; index < end; index++) {
      const coordinate = args.coordinates[index]

      const existingHex = await ctx.db
        .query('hexes')
        .withIndex('by_world_coordinate', (q) =>
          q
            .eq('worldId', args.worldId)
            .eq('x', coordinate.x)
            .eq('y', coordinate.y),
        )
        .first()

      if (!existingHex) {
        await ctx.db.insert('hexes', {
          worldId: args.worldId,
          x: coordinate.x,
          y: coordinate.y,
          terrain: DEFAULT_TERRAIN,
          relief: DEFAULT_RELIEF,
        })
      }
    }

    if (end < args.coordinates.length) {
      await ctx.scheduler.runAfter(0, internal.hexes.insertBatch, {
        worldId: args.worldId,
        coordinates: args.coordinates,
        start: end,
      })

      return
    }

    await ctx.db.patch(args.worldId, {
      initializationStatus: 'ready',
    })
  },
})

export const listByWorld = query({
  args: {
    worldId: v.id('worlds'),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query('hexes')
      .withIndex('by_world', (q) =>
        q.eq('worldId', args.worldId),
      )
      .collect()
  },
})
