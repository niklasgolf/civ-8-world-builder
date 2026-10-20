
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { hex } from '../shared.ts'

export function createTundraIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  hex(icon, '#8d9a78')

  appendSvg(icon, 'circle', {
    cx: '9',
    cy: '12',
    r: '1',
    fill: '#4d5a40',
  })

  appendSvg(icon, 'circle', {
    cx: '13',
    cy: '14.5',
    r: '1.1',
    fill: '#4d5a40',
  })

  appendSvg(icon, 'circle', {
    cx: '15.5',
    cy: '10.5',
    r: '0.8',
    fill: '#4d5a40',
  })

  return icon
}
