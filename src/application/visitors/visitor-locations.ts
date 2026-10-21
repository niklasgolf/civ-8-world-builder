import type { ConvexClient } from 'convex/browser'
import { api } from '../../../convex/_generated/api.js'
import { addVisitorMarker } from './visitor-marker.ts'

let locationsRequested = false

export function loadVisitorLocations(
  client: ConvexClient,
  map: SVGSVGElement,
): void {
  if (locationsRequested) {
    return
  }

  locationsRequested = true
  void requestVisitorLocations(client, map)
}

async function requestVisitorLocations(
  client: ConvexClient,
  map: SVGSVGElement,
): Promise<void> {
  try {
    const locations = await client.query(
      api.visitors.getVisitorLocations,
      {},
    )

    for (const location of locations) {
      addVisitorMarker(
        map,
        location.latitude,
        location.longitude,
        location.deviceType,
      )
    }
  } catch (error: unknown) {
    console.error('Failed to load visitor locations:', error)
  }
}
