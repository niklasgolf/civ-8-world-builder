
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createDeerIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'ellipse', {
    cx: '12',
    cy: '15',
    rx: '5.5',
    ry: '3',
    fill: '#a67c52',
  })

  appendSvg(icon, 'circle', {
    cx: '16.5',
    cy: '12.5',
    r: '2',
    fill: '#a67c52',
  })

  stroke(
    icon,
    'M15.2 10.8 14 6.5M15.2 10.8 17.5 6.2M14 6.5 12.6 5M17.5 6.2 19 4.6',
    '#a67c52',
    '1.2',
  )

  stroke(
    icon,
    'M8 17.6v2.8M11 17.8v2.8M14 17.6v2.8',
    '#a67c52',
    '1.2',
  )

  return icon
}
