
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createFishingIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'path', {
    d: 'M4 15h14l-2 4H6Z',
    fill: 'currentColor',
  })

  stroke(
    icon,
    'M11 15 V7',
    'currentColor',
    '1.4',
  )

  stroke(
    icon,
    'M11 8h5',
    '#e2c27a',
    '1.3',
  )

  return icon
}
