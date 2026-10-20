
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createFortIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'path', {
    d: 'M4 19V10h3V7h3v3h4V7h3v3h3v9Z',
    fill: 'currentColor',
  })

  stroke(
    icon,
    'M4 14.5h16',
    '#102033',
    '1.2',
  )

  return icon
}
