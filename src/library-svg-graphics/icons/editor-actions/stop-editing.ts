
import { appendSvg, createSvg } from '../../primitives/svg.ts'

export function createStopEditingIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'rect', {
    x: '5',
    y: '5',
    width: '14',
    height: '14',
    rx: '1.5',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.6',
  })

  appendSvg(icon, 'rect', {
    x: '9',
    y: '9',
    width: '6',
    height: '6',
    rx: '0.5',
    fill: 'currentColor',
  })

  return icon
}
