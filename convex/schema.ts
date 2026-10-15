
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  worlds: defineTable({
    number: v.number(),
    name: v.string(),
    ownerId: v.optional(v.string()),
  }).index('by_number', ['number']),

  hexes: defineTable({
    worldId: v.id('worlds'),
    x: v.number(),
    y: v.number(),
    terrain: v.union(
      v.literal('ocean'),
      v.literal('coast'),
      v.literal('grass'),
      v.literal('desert'),
    ),
    relief: v.union(
      v.literal('flat'),
      v.literal('hills'),
      v.literal('mountain'),
    ),
  })
    .index('by_world', ['worldId'])
    .index('by_world_coordinate', ['worldId', 'x', 'y']),
})
