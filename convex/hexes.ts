
import { v } from 'convex/values'
import { internal } from './_generated/api'
import {
  internalMutation,
  mutation,
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

const terrainValidator = v.union(
  v.literal('ocean'),
  v.literal('coast'),
  v.literal('grass'),
  v.literal('plains'),
  v.literal('desert'),
  v.literal('tundra'),
  v.literal('snow'),
)

const reliefValidator = v.union(
  v.literal('flat'),
  v.literal('hills'),
  v.literal('mountain'),
)

function validateCoordinate(x: number, y: number): void {
  if (
    !Number.isSafeInteger(x) ||
    !Number.isSafeInteger(y) ||
    x % 2 !== y % 2
  ) {
    throw new Error('Invalid Midgard coordinate')
  }
}

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
      validateCoordinate(coordinate.x, coordinate.y)

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

export const setTerrain = mutation({
  args: {
    worldId: v.id('worlds'),
    x: v.number(),
    y: v.number(),
    terrain: terrainValidator,
    relief: reliefValidator,
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Authentication required')
    }

    const editor = await ctx.db
      .query('editors')
      .withIndex('by_clerk_user_id', (q) =>
        q.eq('clerkUserId', identity.subject),
      )
      .unique()

    if (!editor) {
      throw new Error('Visitors cannot modify terrain')
    }

    if (
      editor.role !== 'admin' &&
      editor.worldId !== args.worldId
    ) {
      throw new Error(
        'You are not assigned to this world',
      )
    }

    const session = await ctx.db
      .query('editingSessions')
      .withIndex('by_world', (q) =>
        q.eq('worldId', args.worldId),
      )
      .unique()

    if (!session || session.editorId !== editor._id) {
      throw new Error(
        'You must control the active editing session',
      )
    }

    const world = await ctx.db.get(args.worldId)

    if (!world || world.initializationStatus !== 'ready') {
      throw new Error('World is not ready')
    }

    validateCoordinate(args.x, args.y)

    const hex = await ctx.db
      .query('hexes')
      .withIndex('by_world_coordinate', (q) =>
        q
          .eq('worldId', args.worldId)
          .eq('x', args.x)
          .eq('y', args.y),
      )
      .unique()

    if (!hex) {
      throw new Error(
        `Hexagon (${args.x}, ${args.y}) does not exist`,
      )
    }

    await ctx.db.patch(hex._id, {
      terrain: args.terrain,
      relief: args.relief,
    })

    return {
      x: args.x,
      y: args.y,
      terrain: args.terrain,
      relief: args.relief,
    }
  },
})

/**
 * Development-only terrain update for testing reactive subscriptions.
 * Internal mutations cannot be called directly from the browser.
 */
export const testSetTerrain = internalMutation({
  args: {
    worldId: v.id('worlds'),
    x: v.number(),
    y: v.number(),
    terrain: terrainValidator,
    relief: reliefValidator,
  },

  handler: async (ctx, args) => {
    const world = await ctx.db.get(args.worldId)

    if (!world || world.initializationStatus !== 'ready') {
      throw new Error('World is not ready')
    }

    validateCoordinate(args.x, args.y)

    const hex = await ctx.db
      .query('hexes')
      .withIndex('by_world_coordinate', (q) =>
        q
          .eq('worldId', args.worldId)
          .eq('x', args.x)
          .eq('y', args.y),
      )
      .unique()

    if (!hex) {
      throw new Error(
        `Hexagon (${args.x}, ${args.y}) does not exist`,
      )
    }

    await ctx.db.patch(hex._id, {
      terrain: args.terrain,
      relief: args.relief,
    })

    return {
      x: args.x,
      y: args.y,
      terrain: args.terrain,
      relief: args.relief,
    }
  },
})
