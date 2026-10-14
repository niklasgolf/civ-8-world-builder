import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  worlds: defineTable({
    number: v.number(),
    name: v.string(),
    ownerId: v.optional(v.string()),
  }).index('by_number', ['number']),
})