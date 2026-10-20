
import { createSvg } from '../../primitives/svg.ts'
import { hex, stroke } from '../shared.ts'

export function createDesertIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  hex(icon, '#d2b07a')

  stroke(
    icon,
    'M6 12c2-2 4-2 6 0s4 2 6 0',
    '#8a6840',
    '1.2',
  )

  stroke(
    icon,
    'M7 15.5c1.6-1.4 3.2-1.4 4.8 0s3.2 1.4 4.8 0',
    '#8a6840',
    '1.2',
  )

  return icon
}
