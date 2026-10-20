
import { createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createRiverIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  stroke(
    icon,
    'M5 19C8 15 8 13 12 12s5-3 7-8',
    '#7ec8e3',
    '2.2',
  )

  return icon
}
