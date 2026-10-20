
import { createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createPyramidIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  stroke(
    icon,
    'M12 4.5 21 19.5H3Z',
    'currentColor',
    '1.5',
  )

  stroke(
    icon,
    'M7.2 13.2h9.6M9.4 16.4h5.2M12 4.5v15',
    'currentColor',
    '1.2',
  )

  return icon
}
