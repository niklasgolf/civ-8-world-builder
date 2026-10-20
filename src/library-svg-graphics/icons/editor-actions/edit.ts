
import { appendSvg, createSvg } from '../../primitives/svg.ts'

export function createEditIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'path', {
    d: 'M5 19l4.2-.9L19 8.3 15.7 5 5.9 14.8 5 19Z',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.6',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  })

  appendSvg(icon, 'path', {
    d: 'M13.8 6.9l3.3 3.3',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.6',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  })

  appendSvg(icon, 'path', {
    d: 'M5.9 14.8l3.3 3.3',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.6',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  })

  return icon
}
