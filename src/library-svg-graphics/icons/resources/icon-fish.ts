
import { appendSvg, createSvg } from '../../primitives/svg.ts'

export function createFishIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'path', {
    d: 'M3.5 12c3-3 7-3.4 11-1.2L20 7.2v9.6l-5.5-3.6c-4 2.2-8 1.8-11-1.2Z',
    fill: '#5eb0d4',
  })

  appendSvg(icon, 'circle', {
    cx: '8',
    cy: '11.4',
    r: '0.7',
    fill: '#102028',
  })

  return icon
}
