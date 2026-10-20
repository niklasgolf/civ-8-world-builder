
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createColossusIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'circle', {
    cx: '11',
    cy: '5.5',
    r: '2.1',
    fill: 'currentColor',
  })

  appendSvg(icon, 'path', {
    d: 'M8 11.2 7.2 20h7.6l-.8-8.8Z',
    fill: 'currentColor',
  })

  stroke(
    icon,
    'M13 12.5 18.5 7.5',
    'currentColor',
    '1.7',
  )

  appendSvg(icon, 'circle', {
    cx: '19.2',
    cy: '6.4',
    r: '1.2',
    fill: '#e2c27a',
  })

  stroke(
    icon,
    'M6 20.5h12',
    'currentColor',
    '1.4',
  )

  return icon
}
