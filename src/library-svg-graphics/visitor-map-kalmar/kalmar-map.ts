import kalmarMapSource from './kalmar-map.svg?raw'

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