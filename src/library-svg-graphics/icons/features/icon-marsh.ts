
import { createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createMarshIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  stroke(
    icon,
    'M4 16c2 1 3 1 5 0s3-1 5 0 3 1 5 0',
    '#67b4cf',
    '1.3',
  )

  stroke(
    icon,
    'M5 19c2 1 3 1 5 0s3-1 5 0 3 1 4 0',
    '#67b4cf',
    '1.3',
  )

  stroke(
    icon,
    'M8 15c.2-4 .3-6-.4-9',
    '#6d9148',
    '1.3',
  )

  stroke(
    icon,
    'M12 16c.2-5 .4-7-.2-10',
    '#6d9148',
    '1.3',
  )

  stroke(
    icon,
    'M16 15.5c.2-3.5.3-5-.3-8',
    '#6d9148',
    '1.3',
  )

  return icon
}
