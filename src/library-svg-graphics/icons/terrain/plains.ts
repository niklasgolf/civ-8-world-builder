
import { createSvg } from '../../primitives/svg.ts'
import { hex, stroke } from '../shared.ts'

export function createPlainsIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  hex(icon, '#c6a15a')

  stroke(
    icon,
    'M7 10.5h10M7.5 13h9M8 15.5h8',
    '#7a5b28',
    '1.1',
  )

  return icon
}
