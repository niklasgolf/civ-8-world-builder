
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  worlds: defineTable({
    number: v.number(),
    name: v.string(),
    ownerId: v.optional(v.string()),
    initializationStatus: v.optional(
      v.union(
        v.literal('empty'),
        v.literal('initializing'),
        v.literal('ready'),
      ),
    ),
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

  editors: defineTable({
    email: v.string(),
    trueName: v.string(),
    fantasyName: v.string(),
    clerkUserId: v.optional(v.string()),
    role: v.union(
      v.literal('admin'),
      v.literal('editor'),
    ),
    worldId: v.optional(v.id('worlds')),
  })
    .index('by_email', ['email'])
    .index('by_clerk_user_id', ['clerkUserId'])
    .index('by_world', ['worldId']),

  editingSessions: defineTable({
    worldId: v.id('worlds'),
    editorId: v.id('editors'),
    startedAt: v.number(),
  }).index('by_world', ['worldId']),
})
