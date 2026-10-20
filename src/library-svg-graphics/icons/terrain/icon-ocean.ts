
import { createSvg } from '../../primitives/svg.ts'
import { hex, stroke } from '../shared.ts'

export function createOceanIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  hex(icon, '#1d6284')

  stroke(
    icon,
    'M6.5 10.5c1.6 1.2 2.8 1.2 4.4 0s2.8-1.2 4.4 0 2.8 1.2 2.2 0',
    '#9ad4ea',
    '1.1',
  )

  stroke(
    icon,
    'M6.5 14.2c1.6 1.2 2.8 1.2 4.4 0s2.8-1.2 4.4 0 2.8 1.2 2.2 0',
    '#9ad4ea',
    '1.1',
  )

  return icon
}
