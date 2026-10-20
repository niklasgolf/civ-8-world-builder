
import { appendSvg, createSvg } from '../../primitives/svg.ts'

export function createQuarryIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  appendSvg(icon, 'rect', {
    x: '4',
    y: '12',
    width: '7',
    height: '6',
    fill: '#9aa3ad',
  })

  appendSvg(icon, 'rect', {
    x: '12',
    y: '12',
    width: '7',
    height: '6',
    fill: '#b7c0c8',
  })

  appendSvg(icon, 'rect', {
    x: '8',
    y: '6',
    width: '7',
    height: '6',
    fill: '#d0d6dc',
  })

  return icon
}
