import { internalMutation, query } from './_generated/server'

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
    return await ctx.db.query('worlds').withIndex('by_number').collect()
  },
})