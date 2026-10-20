
import { createSvg } from '../../primitives/svg.ts'
import { hex, stroke } from '../shared.ts'

export function createSnowIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  hex(icon, '#e7eef3')

  stroke(
    icon,
    'M12 8v8M8.5 10l7 4M8.5 14l7-4',
    '#8aa4b8',
    '1.1',
  )

  return icon
}
