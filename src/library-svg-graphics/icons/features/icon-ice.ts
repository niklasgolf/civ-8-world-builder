
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createIceIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'path', {
    d: 'M12 3.2 20 12 12 20.8 4 12Z',
    fill: '#d7f0f8',
    stroke: '#7eb4cc',
    'stroke-width': '1.2',
    'stroke-linejoin': 'round',
  })

  stroke(
    icon,
    'M12 7.2 16 12 12 16.8 8 12Z',
    '#7eb4cc',
    '1.1',
  )

  return icon
}
