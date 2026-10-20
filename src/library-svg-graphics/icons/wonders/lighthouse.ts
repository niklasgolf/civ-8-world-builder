
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createLighthouseIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  stroke(
    icon,
    'M12 6.5 5 3.2M12 6.5 19 3.2',
    '#e2c27a',
    '1.3',
  )

  appendSvg(icon, 'path', {
    d: 'M10.2 8h3.6l.8 11H9.4Z',
    fill: 'currentColor',
  })

  appendSvg(icon, 'path', {
    d: 'M9.2 8 12 4.2 14.8 8Z',
    fill: '#e2c27a',
  })

  stroke(
    icon,
    'M8 19.8h8',
    'currentColor',
    '1.6',
  )

  return icon
}
