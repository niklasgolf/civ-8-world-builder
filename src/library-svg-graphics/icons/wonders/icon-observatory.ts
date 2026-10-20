
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createObservatoryIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  stroke(
    icon,
    'M5 14a7 7 0 0 1 14 0',
  )

  appendSvg(icon, 'rect', {
    x: '7',
    y: '14',
    width: '10',
    height: '5.5',
    fill: 'currentColor',
  })

  appendSvg(icon, 'circle', {
    cx: '12',
    cy: '11.2',
    r: '1.1',
    fill: '#e2c27a',
  })

  return icon
}
