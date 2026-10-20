
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { tree } from '../shared.ts'

export function createGardensIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'rect', {
    x: '3.5',
    y: '7',
    width: '17',
    height: '12',
    rx: '1.5',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.5',
  })

  tree(icon, 12, 8.5, 6, 7, '#2f8f49')

  return icon
}
