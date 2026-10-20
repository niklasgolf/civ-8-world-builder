
import { createSvg } from '../../primitives/svg.ts'
import { hex, stroke } from '../shared.ts'

export function createGrassIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  hex(icon, '#3e8f46')

  stroke(
    icon,
    'M9 16.5c.2-3 .4-4.2-.2-7',
    '#173d22',
    '1.2',
  )

  stroke(
    icon,
    'M12 17.2c.2-3.4.6-5-.1-8.2',
    '#173d22',
    '1.2',
  )

  stroke(
    icon,
    'M15 16.4c.1-2.6.5-3.8-.1-6.4',
    '#173d22',
    '1.2',
  )

  return icon
}
