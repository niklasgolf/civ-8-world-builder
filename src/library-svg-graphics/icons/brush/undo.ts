
import { createSvg } from '../../primitives/svg.ts'
import { drawUndo } from '../shared.ts'

export function createUndoIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  drawUndo(icon)

  return icon
}
