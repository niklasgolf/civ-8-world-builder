import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

const VISITOR_LIMIT = 1000

const deviceTypeValidator = v.union(
  v.literal('windows'),
  v.literal('mac'),
  v.literal('mobile'),
  v.literal('other'),
)

const emptyVisitorStats = {
  total: 0,
  windows: 0,
  mac: 0,
  mobile: 0,
  other: 0,
  stored: 0,
}

const visitorStatsValidator = v.object({
  total: v.number(),
  windows: v.number(),
  mac: v.number(),
  mobile: v.number(),
  other: v.number(),
  stored: v.number(),
})

function hasValidLocation(location: {
  latitude: number
  longitude: number
} | undefined): location is { latitude: number, longitude: number } {
  if (location === undefined) {
    return false
  }

  return (
    Number.isFinite(location.latitude) &&
    Number.isFinite(location.longitude) &&
    location.latitude >= -90 &&
    location.latitude <= 90 &&
    location.longitude >= -180 &&
    location.longitude <= 180
  )
}

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
    const stored = stats?.stored ?? 0
    const atLimit = stored >= VISITOR_LIMIT

    if (atLimit) {
      const oldest = await ctx.db
        .query('visitors')
        .order('asc')
        .first()

      if (oldest === null) {
        throw new Error('Stored visitor count does not match the visitors table')
      }

      await ctx.db.delete(oldest._id)
    }

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
      stored: atLimit ? stored : stored + 1,
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

export const getVisitorLocations = query({
  args: {},
  returns: v.array(v.object({
    latitude: v.number(),
    longitude: v.number(),
    deviceType: deviceTypeValidator,
  })),
  handler: async (ctx) => {
    const visits = await ctx.db
      .query('visitors')
      .withIndex('by_creation_time')
      .order('desc')
      .take(VISITOR_LIMIT)

    const locations = []

    for (const visit of visits) {
      if (!hasValidLocation(visit.location)) {
        continue
      }

      locations.push({
        latitude: visit.location.latitude,
        longitude: visit.location.longitude,
        deviceType: visit.deviceType,
      })
    }

    return locations
  },
})

export const getVisitorStats = query({
  args: {},
  returns: visitorStatsValidator,
  handler: async (ctx) => {
    const stats = await ctx.db.query('visitorStats').unique()

    if (stats === null) {
      return emptyVisitorStats
    }

    return {
      total: stats.total,
      windows: stats.windows,
      mac: stats.mac,
      mobile: stats.mobile,
      other: stats.other,
      stored: stats.stored,
    }
  },
})
