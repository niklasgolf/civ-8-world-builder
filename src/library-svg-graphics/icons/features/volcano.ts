
import { appendSvg, createSvg } from '../../primitives/svg.ts'

export function createVolcanoIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'path', {
    d: 'M3.5 19.5 12 6l8.5 13.5Z',
    fill: '#6d5344',
  })

  appendSvg(icon, 'path', {
    d: 'M9.8 19.5 12 13l2.2 6.5Z',
    fill: '#d4543c',
  })

  appendSvg(icon, 'circle', {
    cx: '10',
    cy: '5.5',
    r: '1.3',
    fill: '#c9d3dc',
    opacity: '0.85',
  })

  appendSvg(icon, 'circle', {
    cx: '13.5',
    cy: '4',
    r: '1.7',
    fill: '#d5dee6',
    opacity: '0.9',
  })

  return icon
}
