import { mutation } from './_generated/server'
import { v } from 'convex/values'

const deviceTypeValidator = v.union(
  v.literal('windows'),
  v.literal('mac'),
  v.literal('mobile'),
  v.literal('other'),
)

function validateLocation(latitude: number, longitude: number): void {
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error('Invalid visitor location')
  }
}

export const registerVisit = mutation({
  args: {
    location: v.optional(v.object({
      latitude: v.number(),
      longitude: v.number(),
    })),
    deviceType: deviceTypeValidator,
  },

  handler: async (ctx, args) => {
    if (args.location) {
      validateLocation(
        args.location.latitude,
        args.location.longitude,
      )
    }

    const stats = await ctx.db.query('visitorStats').unique()

    await ctx.db.insert('visitors', {
      visitedAt: Date.now(),
      deviceType: args.deviceType,
      ...(args.location ? { location: args.location } : {}),
    })

    const counters = {
      total: (stats?.total ?? 0) + 1,
      windows: stats?.windows ?? 0,
      mac: stats?.mac ?? 0,
      mobile: stats?.mobile ?? 0,
      other: stats?.other ?? 0,
    }

    counters[args.deviceType] += 1

    if (stats === null) {
      await ctx.db.insert('visitorStats', counters)
    } else {
      await ctx.db.patch(stats._id, counters)
    }

    return null
  },
})
