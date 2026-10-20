
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createIronIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'path', {
    d: 'M4.5 14.5 8 10h10l3.5 4.5V18H4.5Z',
    fill: '#8d98a3',
  })

  stroke(
    icon,
    'M8 10 9.2 14.5M18 10l-1.2 4.5M4.5 14.5h15',
    '#d5dde4',
    '1',
  )

  return icon
}
