
import { createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createFloodplainsIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  stroke(
    icon,
    'M4 8c2 1.2 3.2 1.2 5.2 0S12.4 6.8 14.4 8s3.2 1.2 5.2 0',
    '#c4a36a',
    '1.3',
  )

  stroke(
    icon,
    'M4 12c2 1.2 3.2 1.2 5.2 0S12.4 10.8 14.4 12s3.2 1.2 5.2 0',
    '#c4a36a',
    '1.3',
  )

  stroke(
    icon,
    'M4 16c2 1.2 3.2 1.2 5.2 0S12.4 14.8 14.4 16s3.2 1.2 5.2 0',
    '#c4a36a',
    '1.3',
  )

  return icon
}
