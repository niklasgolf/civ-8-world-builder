import sverigeMapSource from './sverige-map.svg?raw'

// Bounds and viewBox from sverige-map.svg. The viewBox width already
// applies cos(center latitude), so x is linear in longitude across the window.
const SVERIGE_MAP_WEST = 10.881534
const SVERIGE_MAP_EAST = 19.448291
const SVERIGE_MAP_SOUTH = 55.283466
const SVERIGE_MAP_NORTH = 60.826406
const SVERIGE_MAP_WIDTH = 817.1
const SVERIGE_MAP_HEIGHT = 1000

const sverigeLandRings = readLandRings(sverigeMapSource)

export function projectVisitorOnSverigeMap(
  latitude: number,
  longitude: number,
): { x: number, y: number } | null {
  if (
    longitude < SVERIGE_MAP_WEST ||
    longitude > SVERIGE_MAP_EAST ||
    latitude < SVERIGE_MAP_SOUTH ||
    latitude > SVERIGE_MAP_NORTH
  ) {
    return null
  }

  const point = {
    x: ((longitude - SVERIGE_MAP_WEST) / (SVERIGE_MAP_EAST - SVERIGE_MAP_WEST)) * SVERIGE_MAP_WIDTH,
    y: ((SVERIGE_MAP_NORTH - latitude) / (SVERIGE_MAP_NORTH - SVERIGE_MAP_SOUTH)) * SVERIGE_MAP_HEIGHT,
  }

  if (!pointInLand(point.x, point.y)) {
    return null
  }

  return point
}

function readLandRings(source: string): ReadonlyArray<ReadonlyArray<readonly [number, number]>> {
  const match = source.match(/\sd="([^"]+)"/)
  if (!match) {
    throw new Error('Sweden map land path could not be read')
  }

  const rings: Array<Array<[number, number]>> = []
  let ring: Array<[number, number]> = []

  for (const command of match[1].match(/[MLZ][^MLZ]*/g) ?? []) {
    const type = command[0]
    if (type === 'Z') {
      if (ring.length > 0) {
        rings.push(ring)
        ring = []
      }
      continue
    }

    const [x, y] = command.slice(1).split(',').map(Number)
    ring.push([x, y])
  }

  if (ring.length > 0) {
    rings.push(ring)
  }

  return rings
}

function pointInLand(x: number, y: number): boolean {
  let inside = false

  for (const ring of sverigeLandRings) {
    if (pointInRing(x, y, ring)) {
      inside = !inside
    }
  }

  return inside
}

function pointInRing(
  x: number,
  y: number,
  ring: ReadonlyArray<readonly [number, number]>,
): boolean {
  let inside = false

  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
    const [currentX, currentY] = ring[index]
    const [previousX, previousY] = ring[previous]
    const crossesY = (currentY > y) !== (previousY > y)
    if (!crossesY) {
      continue
    }

    const intersectionX = ((previousX - currentX) * (y - currentY)) / (previousY - currentY) + currentX
    if (x < intersectionX) {
      inside = !inside
    }
  }

  return inside
}

export function createVisitorSverigeMap(): SVGSVGElement {
  const parsed = new DOMParser().parseFromString(
    sverigeMapSource,
    'image/svg+xml',
  )

  const svg = parsed.documentElement

  if (!(svg instanceof SVGSVGElement)) {
    throw new Error('Sweden map SVG could not be created')
  }

  svg.removeAttribute('width')
  svg.removeAttribute('height')

  svg.style.setProperty('--map-ocean', '#061827')
  svg.style.setProperty('--map-land', '#193F30')
  svg.style.setProperty('--map-coast', '#39705C')

  return svg
}
