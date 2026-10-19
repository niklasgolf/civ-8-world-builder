
import { internalMutation, query } from './_generated/server'
import { v } from 'convex/values'

export const initialize = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existingWorlds = await ctx.db.query('worlds').collect()

    if (existingWorlds.length > 0) {
      throw new Error('World initialization requires an empty worlds table')
    }

    for (let number = 1; number <= 12; number++) {
      await ctx.db.insert('worlds', {
        number,
        name: `World ${number}`,
      })
    }

    return { created: 12 }
  },
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    const worlds = await ctx.db
      .query('worlds')
      .withIndex('by_number')
      .collect()

    return await Promise.all(
      worlds.map(async (world) => {
        const editor = await ctx.db
          .query('editors')
          .withIndex('by_world', (q) =>
            q.eq('worldId', world._id)
          )
          .first()

        return {
          ...world,
          fantasyName: editor?.fantasyName ?? null,
        }
      }),
    )
  },
})

export const getAssignedEditor = query({
  args: {
    worldId: v.id('worlds'),
  },
  handler: async (ctx, args) => {
    const world = await ctx.db.get(args.worldId)

    if (!world) {
      return null
    }

    const editor = await ctx.db
      .query('editors')
      .withIndex('by_world', (q) =>
        q.eq('worldId', args.worldId)
      )
      .first()

    if (!editor) {
      return null
    }

    return {
      fantasyName: editor.fantasyName,
      role: editor.role,
    }
  },
})
