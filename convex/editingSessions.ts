
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import type { MutationCtx } from './_generated/server'

async function getAuthenticatedEditor(ctx: MutationCtx) {
  const identity = await ctx.auth.getUserIdentity()

  if (!identity) {
    throw new Error('You must sign in to edit a world')
  }

  const editor = await ctx.db
    .query('editors')
    .withIndex('by_clerk_user_id', (q) =>
      q.eq('clerkUserId', identity.subject),
    )
    .unique()

  if (!editor) {
    throw new Error('Visitors cannot edit worlds')
  }

  return editor
}

export const getActiveSession = query({
  args: {
    worldId: v.id('worlds'),
  },

  handler: async (ctx, args) => {
    const session = await ctx.db
      .query('editingSessions')
      .withIndex('by_world', (q) =>
        q.eq('worldId', args.worldId),
      )
      .unique()

    if (!session) {
      return null
    }

    const editor = await ctx.db.get(session.editorId)

    return {
      worldId: session.worldId,
      fantasyName: editor?.fantasyName ?? 'Unknown',
      role: editor?.role ?? 'editor',
      startedAt: session.startedAt,
    }
  },
})

export const startEditing = mutation({
  args: {
    worldId: v.id('worlds'),
    takeover: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    const editor = await getAuthenticatedEditor(ctx)

    const world = await ctx.db.get(args.worldId)

    if (!world || world.initializationStatus !== 'ready') {
      throw new Error('World is not ready')
    }

    if (
      editor.role !== 'admin' &&
      editor.worldId !== args.worldId
    ) {
      throw new Error(
        'You can only edit your assigned world',
      )
    }

    const session = await ctx.db
      .query('editingSessions')
      .withIndex('by_world', (q) =>
        q.eq('worldId', args.worldId),
      )
      .unique()

    if (session) {
      if (session.editorId === editor._id) {
        return {
          started: true,
          alreadyActive: true,
        }
      }

      if (editor.role !== 'admin' || !args.takeover) {
        throw new Error(
          'Another editor currently controls this world',
        )
      }

      await ctx.db.patch(session._id, {
        editorId: editor._id,
        startedAt: Date.now(),
      })

      return {
        started: true,
        takeover: true,
      }
    }

    await ctx.db.insert('editingSessions', {
      worldId: args.worldId,
      editorId: editor._id,
      startedAt: Date.now(),
    })

    return {
      started: true,
      takeover: false,
    }
  },
})

export const stopEditing = mutation({
  args: {
    worldId: v.id('worlds'),
  },

  handler: async (ctx, args) => {
    const editor = await getAuthenticatedEditor(ctx)

    const session = await ctx.db
      .query('editingSessions')
      .withIndex('by_world', (q) =>
        q.eq('worldId', args.worldId),
      )
      .unique()

    if (!session) {
      return {
        stopped: false,
      }
    }

    if (session.editorId !== editor._id) {
      throw new Error(
        'Only the active editor can stop this session',
      )
    }

    await ctx.db.delete(session._id)

    return {
      stopped: true,
    }
  },
})
