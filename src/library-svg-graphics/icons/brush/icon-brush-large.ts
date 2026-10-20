
import { createSvg } from '../../primitives/svg.ts'
import { brush } from '../shared.ts'

export function createBrushLargeIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  brush(icon, 5)

  return icon
}
