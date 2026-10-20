
import { createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createTempleIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  stroke(
    icon,
    'M3.5 9.5 12 3.5l8.5 6',
  )

  stroke(
    icon,
    'M4.5 9.5h15',
  )

  stroke(
    icon,
    'M7 9.5v9M10.5 9.5v9M13.5 9.5v9M17 9.5v9',
  )

  stroke(
    icon,
    'M4.5 18.8h15',
  )

  return icon
}
