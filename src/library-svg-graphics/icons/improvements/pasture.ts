
import { createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createPastureIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  stroke(
    icon,
    'M4 10h16M4 15h16',
    'currentColor',
    '1.5',
  )

  stroke(
    icon,
    'M7 7.5v12M12 7.5v12M17 7.5v12',
    'currentColor',
    '1.5',
  )

  return icon
}
