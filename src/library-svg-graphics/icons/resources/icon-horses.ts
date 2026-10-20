
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createHorsesIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'path', {
    d: 'M4.5 14.5c.4-3 2.4-5 5-5 0-2.2 1.4-3.6 3.2-3.2-.6 1.4-.2 2.2 1.3 2.4 1.8.2 3.2-1.2 4.2-2.2-.2 2.4 1.2 3.6.2 5.6-.8 1.6-2.2 2.4-3.6 2.4H8.2c-2.2 0-3.8-.6-3.7 0Z',
    fill: '#6e4b32',
  })

  stroke(
    icon,
    'M7 16.8v3.2M10.5 16.8v3.2M14.2 16.6v3.4M17.2 16.2v3.4',
    '#6e4b32',
    '1.3',
  )

  appendSvg(icon, 'circle', {
    cx: '15.6',
    cy: '10.2',
    r: '0.45',
    fill: '#f3ead7',
  })

  return icon
}
