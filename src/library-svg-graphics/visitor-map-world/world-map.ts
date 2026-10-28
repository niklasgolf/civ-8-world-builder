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

  svg.style.setProperty('--map-ocean', '#061827')
  svg.style.setProperty('--map-land', '#193748')
  svg.style.setProperty('--map-coast', '#3C6578')

  return svg
}
