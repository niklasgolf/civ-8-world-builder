
import { appendSvg, createSvg } from '../../primitives/svg.ts'

export function createTakeOverIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'path', {
    d: 'M12 3l8 3v5.5c0 5-3.3 8-8 9.5-4.7-1.5-8-4.5-8-9.5V6l8-3Z',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.6',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  })

  appendSvg(icon, 'path', {
    d: 'M8.5 12l2.4 2.4 4.8-5',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.6',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  })

  return icon
}
