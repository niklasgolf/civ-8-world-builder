import worldMapSource from './world-map.svg?raw'

export function createVisitorWorldMap(): SVGSVGElement {
  const parsed = new DOMParser().parseFromString(
    worldMapSource,
    'image/svg+xml',
  )

  const svg = parsed.documentElement

  if (!(svg instanceof SVGSVGElement)) {
    throw new Error('World map SVG could not be created')
  }

  svg.removeAttribute('width')
  svg.removeAttribute('height')

  return svg
}
