
import { createSvg } from '../../primitives/svg.ts'
import { brush } from '../shared.ts'

export function createBrushMediumIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  brush(icon, 3.4)

  return icon
}
