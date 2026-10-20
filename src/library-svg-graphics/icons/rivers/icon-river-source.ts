
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createRiverSourceIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'circle', {
    cx: '8',
    cy: '8',
    r: '2.3',
    fill: '#7ec8e3',
  })

  stroke(
    icon,
    'M10 9.2C12 12 13 14 12 19',
    '#7ec8e3',
    '2',
  )

  return icon
}
