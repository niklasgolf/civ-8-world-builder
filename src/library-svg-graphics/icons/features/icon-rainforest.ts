
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { tree } from '../shared.ts'

export function createRainforestIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  tree(icon, 7.5, 8, 6.5, 9, '#1d6a3c')

  tree(icon, 12, 5, 8, 12, '#145232')

  tree(icon, 17, 9, 6, 8, '#1d6a3c')

  appendSvg(icon, 'circle', {
    cx: '19',
    cy: '6',
    r: '1',
    fill: '#7ec8e8',
  })

  return icon
}
