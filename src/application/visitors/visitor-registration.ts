import { ConvexClient } from 'convex/browser'
import { api } from '../../../convex/_generated/api.js'
import {
  detectVisitorDevice,
  detectVisitorLocation,
} from './visitor-tracking.ts'

let registrationStarted = false

export function registerAnonymousVisit(client: ConvexClient): void {
  if (registrationStarted) {
    return
  }

  registrationStarted = true
  void sendAnonymousVisit(client)
}

async function sendAnonymousVisit(client: ConvexClient): Promise<void> {
  try {
    const deviceType = detectVisitorDevice()
    const location = await detectVisitorLocation()

    await client.mutation(api.visitors.registerVisit, {
      deviceType,
      ...(location ? { location } : {}),
    })
  } catch (error: unknown) {
    console.error('Failed to register anonymous visit:', error)
  }
}
