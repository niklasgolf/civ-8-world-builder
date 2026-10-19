
import { query } from './_generated/server'

export const currentUser = query({
  args: {},

  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      return null
    }

    const clerkUserId = identity.subject

    const editor = await ctx.db
      .query('editors')
      .withIndex('by_clerk_user_id', (q) =>
        q.eq('clerkUserId', clerkUserId),
      )
      .unique()

    if (!editor) {
      return {
        authenticated: true,
        role: 'visitor' as const,
        fantasyName: null,
        worldId: null,
      }
    }

    return {
      authenticated: true,
      role: editor.role,
      fantasyName: editor.fantasyName,
      worldId: editor.worldId ?? null,
    }
  },
})
