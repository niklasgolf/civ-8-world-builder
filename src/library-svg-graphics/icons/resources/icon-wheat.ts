
import { createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createWheatIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  stroke(
    icon,
    'M12 20 V6',
    '#d7b15a',
    '1.4',
  )

  stroke(
    icon,
    'M12 9c-2-1.5-3-1.2-3.5.2M12 9c2-1.5 3-1.2 3.5.2',
    '#d7b15a',
    '1.3',
  )

  stroke(
    icon,
    'M12 13c-2-1.5-3-1.2-3.5.2M12 13c2-1.5 3-1.2 3.5.2',
    '#d7b15a',
    '1.3',
  )

  stroke(
    icon,
    'M12 17c-2-1.5-3-1.2-3.5.2M12 17c2-1.5 3-1.2 3.5.2',
    '#d7b15a',
    '1.3',
  )

  return icon
}
