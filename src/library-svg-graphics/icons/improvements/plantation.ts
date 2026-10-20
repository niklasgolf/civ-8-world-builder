
import { createSvg } from '../../primitives/svg.ts'
import { tree } from '../shared.ts'

export function createPlantationIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  tree(
    icon,
    7,
    8,
    5,
    8,
    '#2f8f49',
  )

  tree(
    icon,
    12,
    6,
    5.5,
    10,
    '#226c38',
  )

  tree(
    icon,
    17,
    8.5,
    5,
    7.5,
    '#2f8f49',
  )

  return icon
}
