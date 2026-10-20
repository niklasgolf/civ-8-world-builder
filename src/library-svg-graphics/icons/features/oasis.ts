
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createOasisIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'ellipse', {
    cx: '12',
    cy: '16.5',
    rx: '6.5',
    ry: '2.6',
    fill: '#3d93b8',
  })

  stroke(
    icon,
    'M12 16c.4-3 .2-6 .8-9',
    '#8a5a34',
    '1.5',
  )

  stroke(
    icon,
    'M12.6 8C10 6.5 8 7.5 6.5 6.2',
    '#2f8f49',
    '1.4',
  )

  stroke(
    icon,
    'M12.6 8C15 5.8 17.5 6.5 19 5.2',
    '#2f8f49',
    '1.4',
  )

  stroke(
    icon,
    'M12.6 8.4C12 5.5 13.5 4 15.5 3.2',
    '#2f8f49',
    '1.4',
  )

  return icon
}
