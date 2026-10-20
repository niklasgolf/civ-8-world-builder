
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { drawUndo } from '../shared.ts'

export function createRedoIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  const mirrored = appendSvg(icon, 'g', {
    transform: 'translate(24 0) scale(-1 1)',
  })

  drawUndo(mirrored)

  return icon
}
