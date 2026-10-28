import type { ConvexClient } from 'convex/browser'
import { api } from '../../../convex/_generated/api.js'
import { projectVisitorOnKalmarMap } from '../../library-svg-graphics/visitor-map-kalmar/kalmar-map.ts'
import { projectVisitorOnSverigeMap } from '../../library-svg-graphics/visitor-map-sverige/sverige-map.ts'
import {
  addVisitorMarker,
  type VisitorMarkerPlacement,
} from './visitor-marker.ts'

let locationsRequested = false

const WORLD_VIEW_HEIGHT = 2880
const WORLD_MARKER_RADIUS = 16

// The inset heights are 0.58 and 0.29 of the world map height. These radii
// keep a marker the same size on screen as a world marker of radius 16.
const sverigePlacement: VisitorMarkerPlacement = {
  project: projectVisitorOnSverigeMap,
  radius: insetMarkerRadius(1000, 0.58),
}

const kalmarPlacement: VisitorMarkerPlacement = {
  project: projectVisitorOnKalmarMap,
  radius: insetMarkerRadius(1000, 0.29),
}

export type VisitorLocationMaps = {
  world: SVGSVGElement
  sverige: SVGSVGElement
  kalmar: SVGSVGElement
}

export function loadVisitorLocations(
  client: ConvexClient,
  maps: VisitorLocationMaps,
): void {
  if (locationsRequested) {
    return
  }

  locationsRequested = true
  void requestVisitorLocations(client, maps)
}

function insetMarkerRadius(
  viewBoxHeight: number,
  shareOfWorldHeight: number,
): number {
  const radius = WORLD_MARKER_RADIUS * viewBoxHeight / (WORLD_VIEW_HEIGHT * shareOfWorldHeight)
  return Math.round(radius * 100) / 100
}

async function requestVisitorLocations(
  client: ConvexClient,
  maps: VisitorLocationMaps,
): Promise<void> {
  try {
    const locations = await client.query(
      api.visitors.getVisitorLocations,
      {},
    )

    for (const location of locations) {
      addVisitorMarker(
        maps.world,
        location.latitude,
        location.longitude,
        location.deviceType,
      )
      addVisitorMarker(
        maps.sverige,
        location.latitude,
        location.longitude,
        location.deviceType,
        sverigePlacement,
      )
      addVisitorMarker(
        maps.kalmar,
        location.latitude,
        location.longitude,
        location.deviceType,
        kalmarPlacement,
      )
    }
  } catch (error: unknown) {
    console.error('Failed to load visitor locations:', error)
  }
}
