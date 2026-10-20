
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createCattleIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'ellipse', {
    cx: '12',
    cy: '14',
    rx: '6.2',
    ry: '3.6',
    fill: '#8b5a38',
  })

  appendSvg(icon, 'circle', {
    cx: '7.2',
    cy: '12.2',
    r: '2.3',
    fill: '#8b5a38',
  })

  stroke(
    icon,
    'M5.4 11 4 8.2M7.6 10.4 8.4 7.6',
    '#8b5a38',
    '1.2',
  )

  appendSvg(icon, 'circle', {
    cx: '6.4',
    cy: '12',
    r: '0.45',
    fill: '#1b120c',
  })

  stroke(
    icon,
    'M8 17.2v3M11 17.4v3M14 17.4v3M17 17v3',
    '#8b5a38',
    '1.3',
  )

  return icon
}
