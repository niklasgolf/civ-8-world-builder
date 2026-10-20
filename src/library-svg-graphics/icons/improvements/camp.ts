
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createCampIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'path', {
    d: 'M3.5 19 12 5.5 20.5 19Z',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.6',
    'stroke-linejoin': 'round',
  })

  stroke(
    icon,
    'M12 19 V11',
    'currentColor',
    '1.4',
  )

  stroke(
    icon,
    'M9.2 19 12 13.5 14.8 19',
    'currentColor',
    '1.2',
  )

  return icon
}
