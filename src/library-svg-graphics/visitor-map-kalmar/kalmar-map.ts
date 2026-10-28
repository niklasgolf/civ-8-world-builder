import kalmarMapSource from './kalmar-map.svg?raw'

// Bounds and viewBox from kalmar-map.svg. Longitude is scaled by
// cos(center latitude) through the viewBox aspect, so x is linear in
// longitude across this window.
const KALMAR_MAP_WEST = 15.953952
const KALMAR_MAP_EAST = 16.771604
const KALMAR_MAP_SOUTH = 56.589524
const KALMAR_MAP_NORTH = 56.769186
const KALMAR_MAP_WIDTH = 2500
const KALMAR_MAP_HEIGHT = 1000

export function projectVisitorOnKalmarMap(
  latitude: number,
  longitude: number,
): { x: number, y: number } | null {
  if (
    longitude < KALMAR_MAP_WEST ||
    longitude > KALMAR_MAP_EAST ||
    latitude < KALMAR_MAP_SOUTH ||
    latitude > KALMAR_MAP_NORTH
  ) {
    return null
  }

  return {
    x: ((longitude - KALMAR_MAP_WEST) / (KALMAR_MAP_EAST - KALMAR_MAP_WEST)) * KALMAR_MAP_WIDTH,
    y: ((KALMAR_MAP_NORTH - latitude) / (KALMAR_MAP_NORTH - KALMAR_MAP_SOUTH)) * KALMAR_MAP_HEIGHT,
  }
}

export function createVisitorKalmarMap(): SVGSVGElement {
  const parsed = new DOMParser().parseFromString(
    kalmarMapSource,
    'image/svg+xml',
  )

  const svg = parsed.documentElement

  if (!(svg instanceof SVGSVGElement)) {
    throw new Error('Kalmar map SVG could not be created')
  }

  svg.removeAttribute('width')
  svg.removeAttribute('height')

  svg.style.setProperty('--map-ocean', '#061827')
  svg.style.setProperty('--map-land', '#193F30')
  svg.style.setProperty('--map-coast', '#39705C')

  return svg
}