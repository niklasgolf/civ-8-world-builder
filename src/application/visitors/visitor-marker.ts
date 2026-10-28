import { appendSvg } from '../../library-svg-graphics/primitives/svg.ts'

const MAP_WIDTH = 5760
const MAP_HEIGHT = 2880

export const VISITOR_COLORS = {
  windows: '#FF4545',
  mac: '#39D96A',
  mobile: '#38A9FF',
  other: '#FFD447',
} as const

export type VisitorMarkerDevice = keyof typeof VISITOR_COLORS

export function projectVisitorLocation(
  latitude: number,
  longitude: number,
): { x: number, y: number } {
  return {
    x: ((longitude + 180) / 360) * MAP_WIDTH,
    y: ((90 - latitude) / 180) * MAP_HEIGHT,
  }
}

const WORLD_MARKER_RADIUS = 16

export type VisitorMarkerPlacement = {
  project: (
    latitude: number,
    longitude: number,
  ) => { x: number, y: number } | null
  radius: number
}

export function addVisitorMarker(
  map: SVGSVGElement,
  latitude: number,
  longitude: number,
  deviceType: VisitorMarkerDevice,
  placement?: VisitorMarkerPlacement,
): SVGCircleElement | null {
  const point = placement
    ? placement.project(latitude, longitude)
    : projectVisitorLocation(latitude, longitude)

  if (!point) {
    return null
  }

  const marker = appendSvg(map, 'circle', {
    cx: String(point.x),
    cy: String(point.y),
    r: String(placement ? placement.radius : WORLD_MARKER_RADIUS),
    fill: VISITOR_COLORS[deviceType],
    stroke: '#0B2941',
    'stroke-width': '0.5',
    'vector-effect': 'non-scaling-stroke',
  })

  marker.classList.add('visitors-layout__visitor-marker')

  return marker
}
