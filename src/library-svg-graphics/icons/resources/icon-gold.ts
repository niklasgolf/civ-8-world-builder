
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createGoldIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'ellipse', {
    cx: '12',
    cy: '15',
    rx: '6',
    ry: '2.3',
    fill: '#c4962e',
  })

  appendSvg(icon, 'ellipse', {
    cx: '12',
    cy: '12.2',
    rx: '6',
    ry: '2.3',
    fill: '#e6c35c',
  })

  appendSvg(icon, 'ellipse', {
    cx: '12',
    cy: '9.4',
    rx: '6',
    ry: '2.3',
    fill: '#f0d78a',
  })

  stroke(
    icon,
    'M8 9.4c1.2.8 2.6.8 4 0s2.8-.8 4 0',
    '#a8842a',
    '0.8',
  )

  return icon
}
