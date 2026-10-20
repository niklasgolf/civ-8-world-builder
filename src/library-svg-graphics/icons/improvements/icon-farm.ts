
import { createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createFarmIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  stroke(
    icon,
    'M4 18h16',
    '#8a6234',
    '1.4',
  )

  stroke(
    icon,
    'M7 18V8M12 18V6M17 18V9',
    '#d7b15a',
    '1.3',
  )

  stroke(
    icon,
    'M7 11c-1.6-1-2.2-.6-2.4.6M7 11c1.6-1 2.2-.6 2.4.6',
    '#d7b15a',
    '1.1',
  )

  stroke(
    icon,
    'M12 10c-1.6-1-2.2-.6-2.4.6M12 10c1.6-1 2.2-.6 2.4.6',
    '#d7b15a',
    '1.1',
  )

  stroke(
    icon,
    'M17 12c-1.6-1-2.2-.6-2.4.6M17 12c1.6-1 2.2-.6 2.4.6',
    '#d7b15a',
    '1.1',
  )

  return icon
}
