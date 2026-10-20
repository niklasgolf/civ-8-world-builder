
import { appendSvg, createSvg } from '../../primitives/svg.ts'

export function createLikeIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'path', {
    d: 'M7 10l4.5-6c.6-.8 1.8-.4 1.8.6V9h5.1c1.2 0 2.1 1.1 1.8 2.3l-1.6 7c-.2.9-1 1.5-1.9 1.5H7V10Z',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.6',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  })

  appendSvg(icon, 'rect', {
    x: '3',
    y: '10',
    width: '4',
    height: '10',
    rx: '1',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.6',
  })

  return icon
}
