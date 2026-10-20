
import { appendSvg, createSvg } from '../../primitives/svg.ts'

export function createStoneIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'path', {
    d: 'M5 16.5 7.2 11h4.2l1.4 5.5Z',
    fill: '#9aa3ad',
  })

  appendSvg(icon, 'path', {
    d: 'M11 17.5 13 10.5h5.2L20 17.5Z',
    fill: '#b7c0c8',
  })

  appendSvg(icon, 'path', {
    d: 'M8 18.8 10.2 14h4.4l1.6 4.8Z',
    fill: '#7e888f',
  })

  return icon
}
