
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createRiverMouthIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  stroke(
    icon,
    'M6 6c2 4 3 6 3 9',
    '#7ec8e3',
    '2',
  )

  appendSvg(icon, 'path', {
    d: 'M9 15c2 2 4 3 8 3-3 1.2-5 2.4-8 3.2.8-2 1-4 0-6.2Z',
    fill: '#7ec8e3',
  })

  return icon
}
