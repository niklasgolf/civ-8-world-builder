
import { createSvg } from '../../primitives/svg.ts'
import { tree } from '../shared.ts'

export function createWoodsIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  tree(icon, 9, 6, 8, 11, '#2f8f49')

  tree(icon, 15.5, 8, 7, 9, '#226c38')

  return icon
}
