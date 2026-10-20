
import { createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createMineIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  stroke(
    icon,
    'M5 19 16 8',
    'currentColor',
    '1.8',
  )

  stroke(
    icon,
    'M14 6.2 19.2 8.4 16.2 11.2Z',
    'currentColor',
    '1.4',
  )

  stroke(
    icon,
    'M13.2 9.2 17.6 6',
    '#e2c27a',
    '1.6',
  )

  return icon
}
